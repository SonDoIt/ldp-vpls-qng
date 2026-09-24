import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Contact form: 4 MB of attachments (MAX_FILES_BYTES) plus text fields and multipart overhead.
      // Keep nginx `client_max_body_size` at least this large.
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
