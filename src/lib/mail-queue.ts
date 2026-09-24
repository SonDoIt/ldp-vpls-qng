import { randomUUID } from "node:crypto";
import { mkdir, readdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import nodemailer, { type Transporter } from "nodemailer";
import { office } from "@/content/site";
import { LOGO_CID, contactEmail } from "./contact-email";

/**
 * Durable outbox for consultation mails, so the form can answer the visitor at once while Gmail
 * (about 3 s per message) is dealt with afterwards, with retries.
 *
 * Each request is a folder `<id>/` holding `job.json` plus its attachments as `0`, `1`, … and it
 * moves between state folders under `.data/mail-queue/` with atomic renames:
 *   incoming → pending → sending → (deleted once sent)
 *                 ↑_________|  failed attempt, waits for its next retry
 *                           ↘ failed/  after the last attempt, kept for a manual resend
 * Claiming a job is a rename out of `pending/`, so two drains (dev hot reload, a restart overlap)
 * never send the same job twice. A crash mid-send leaves the job in `sending/`, which
 * `resumeMailQueue` puts back on startup: delivery is at-least-once.
 */
const ROOT = path.join(process.cwd(), ".data", "mail-queue");
type State = "incoming" | "pending" | "sending" | "failed";
const dir = (state: State, id = "") => path.join(ROOT, state, id);

/** Waits between attempts: 8 attempts spread over about a day, then the job moves to failed/. */
const RETRY_DELAYS_MS = [1, 5, 15, 60, 180, 360, 720].map((minutes) => minutes * 60_000);

type Job = {
  name: string;
  phone: string;
  message: string;
  receivedAt: string;
  pageUrl: string | null;
  files: { filename: string; size: number }[];
  attempts: number;
  nextAttemptAt: number;
  lastError?: string;
};

function isJob(value: unknown): value is Job {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.name === "string" &&
    typeof v.phone === "string" &&
    typeof v.message === "string" &&
    typeof v.receivedAt === "string" &&
    (v.pageUrl === null || typeof v.pageUrl === "string") &&
    Array.isArray(v.files) &&
    typeof v.attempts === "number" &&
    typeof v.nextAttemptAt === "number"
  );
}

type MailConfig = { host: string; port: number; user: string; pass: string; to: string };

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable ${name}`);
  return value;
}

/** Reads and checks the SMTP settings; throws on anything that would make every send fail. */
function mailConfig(): MailConfig {
  const user = requireEnv("SMTP_USER");
  const to = process.env.CONTACT_TO?.trim() || user;
  // Nodemailer silently drops malformed addresses and then fails with a vague "No recipients defined".
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) throw new Error(`CONTACT_TO/SMTP_USER is not an email address: "${to}"`);
  return { host: requireEnv("SMTP_HOST"), port: Number(requireEnv("SMTP_PORT")), user, pass: requireEnv("SMTP_PASS"), to };
}

let transport: Transporter | undefined;

/** SMTP_PORT 465 is implicit TLS; 587 upgrades with STARTTLS. */
function mailer(config: MailConfig): Transporter {
  transport ??= nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: { user: config.user, pass: config.pass },
  });
  return transport;
}

async function list(state: State): Promise<string[]> {
  try {
    return (await readdir(dir(state))).sort();
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return [];
    throw error;
  }
}

async function readJob(folder: string): Promise<Job | undefined> {
  try {
    const parsed: unknown = JSON.parse(await readFile(path.join(folder, "job.json"), "utf8"));
    return isJob(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
}

async function moveTo(from: string, state: State, id: string) {
  await mkdir(dir(state), { recursive: true });
  await rename(from, dir(state, id));
}

export type QueuedContact = {
  name: string;
  phone: string;
  message: string;
  receivedAt: Date;
  pageUrl: string | null;
  files: { filename: string; content: Buffer }[];
};

/**
 * Stores one request on disk. Resolves only once the job is safely queued, so a visitor told
 * "sent" never loses their request; throws (and the visitor sees an error) when mail is
 * misconfigured or the disk write fails.
 */
export async function enqueueContactMail(input: QueuedContact): Promise<void> {
  mailConfig();
  // Zero-padded time first, so a plain name sort sends requests in arrival order.
  const id = `${String(input.receivedAt.getTime()).padStart(15, "0")}-${randomUUID().slice(0, 8)}`;
  const staging = dir("incoming", id);
  await mkdir(staging, { recursive: true });
  await Promise.all(input.files.map((file, i) => writeFile(path.join(staging, String(i)), file.content)));
  const job: Job = {
    name: input.name,
    phone: input.phone,
    message: input.message,
    receivedAt: input.receivedAt.toISOString(),
    pageUrl: input.pageUrl,
    files: input.files.map((file) => ({ filename: file.filename, size: file.content.length })),
    attempts: 0,
    nextAttemptAt: 0,
  };
  await writeFile(path.join(staging, "job.json"), JSON.stringify(job));
  await moveTo(staging, "pending", id);
}

async function attempt(id: string, job: Job): Promise<void> {
  const folder = dir("sending", id);
  try {
    const config = mailConfig();
    const attachments = await Promise.all(
      job.files.map(async (file, i) => ({ filename: file.filename, content: await readFile(path.join(folder, String(i))) })),
    );
    const { subject, html, text } = contactEmail({ ...job, receivedAt: new Date(job.receivedAt) });
    await mailer(config).sendMail({
      from: { name: `Website ${office.shortName}`, address: config.user },
      to: config.to,
      subject,
      text,
      html,
      attachments: [
        ...attachments,
        // Inline seal for the mail header; referenced by cid, so clients do not list it as a file.
        { filename: "logo.png", path: path.join(process.cwd(), "public", "email-logo.png"), cid: LOGO_CID },
      ],
    });
    // Sent: the customer's files have no reason to stay on the server.
    await rm(folder, { recursive: true, force: true });
  } catch (error) {
    job.attempts += 1;
    job.lastError = error instanceof Error ? error.message : String(error);
    const delay = RETRY_DELAYS_MS[job.attempts - 1];
    if (delay === undefined) {
      // Reset so moving the folder back to pending/ gives it a fresh set of attempts.
      job.attempts = 0;
      job.nextAttemptAt = 0;
      await writeFile(path.join(folder, "job.json"), JSON.stringify(job));
      await moveTo(folder, "failed", id);
      console.error(`Mail queue: gave up on ${id} after ${RETRY_DELAYS_MS.length + 1} attempts, moved to failed/`, error);
    } else {
      job.nextAttemptAt = Date.now() + delay;
      await writeFile(path.join(folder, "job.json"), JSON.stringify(job));
      await moveTo(folder, "pending", id);
      console.error(`Mail queue: attempt ${job.attempts} for ${id} failed, retrying in ${delay / 60_000} min`, error);
    }
  }
}

/** Sends every due job, oldest first, one at a time; returns once nothing is due. */
async function sendDue(): Promise<void> {
  for (;;) {
    let progressed = false;
    for (const id of await list("pending")) {
      const job = await readJob(dir("pending", id));
      if (!job || job.nextAttemptAt > Date.now()) continue;
      try {
        await mkdir(dir("sending"), { recursive: true });
        await rename(dir("pending", id), dir("sending", id));
      } catch {
        continue; // Claimed by another drain.
      }
      await attempt(id, job);
      progressed = true;
    }
    if (!progressed) return;
  }
}

let running = false;
let again = false;
let retryTimer: NodeJS.Timeout | undefined;

/** Wakes the queue again when the earliest waiting retry falls due. */
async function scheduleRetry(): Promise<void> {
  clearTimeout(retryTimer);
  const jobs = await Promise.all((await list("pending")).map((id) => readJob(dir("pending", id))));
  const next = Math.min(...jobs.map((job) => job?.nextAttemptAt ?? Number.POSITIVE_INFINITY));
  if (next === Number.POSITIVE_INFINITY) return;
  retryTimer = setTimeout(() => void drainMailQueue(), Math.max(0, next - Date.now()));
  retryTimer.unref();
}

/**
 * Sends whatever is due. Safe to call any time: a call during a running drain makes that drain
 * look again instead of starting a second one. Never throws; problems are logged.
 */
export async function drainMailQueue(): Promise<void> {
  if (running) {
    again = true;
    return;
  }
  running = true;
  try {
    do {
      again = false;
      await sendDue();
    } while (again);
    await scheduleRetry();
  } catch (error) {
    console.error("Mail queue: drain failed", error);
  } finally {
    running = false;
  }
}

/** Server start: put back jobs a crash left mid-send, drop half-written ones, then send. */
export async function resumeMailQueue(): Promise<void> {
  try {
    for (const id of await list("sending")) await moveTo(dir("sending", id), "pending", id);
    // Their visitors were shown an error, so nothing was promised for these.
    await rm(dir("incoming"), { recursive: true, force: true });
  } catch (error) {
    console.error("Mail queue: resume failed", error);
  }
  void drainMailQueue();
}
