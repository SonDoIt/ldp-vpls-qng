export async function register() {
  // Runs once per server start. Skip the build (it must not send mail) and the edge runtime (no fs).
  if (process.env.NEXT_RUNTIME !== "nodejs" || process.env.NEXT_PHASE === "phase-production-build") return;
  // Dynamic: this file is also bundled for the edge runtime, where node:fs does not exist.
  const { resumeMailQueue } = await import("./lib/mail-queue");
  // Not awaited: sending may take a while and must not delay the server becoming ready.
  void resumeMailQueue();
}
