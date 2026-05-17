import type { NextConfig } from "next";

const rppgApi = process.env.RPPG_API_URL ?? "http://127.0.0.1:8000";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/clinicaltables/:path*",
        destination: "https://clinicaltables.nlm.nih.gov/api/:path*",
      },
      {
        source: "/api/:path*",
        destination: `${rppgApi}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
