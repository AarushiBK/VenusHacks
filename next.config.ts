import type { NextConfig } from "next";

const rppgApi = process.env.RPPG_API_URL ?? "http://127.0.0.1:8000";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/carechain",
        destination: "/",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/clinicaltables/:path*",
        destination: "https://clinicaltables.nlm.nih.gov/api/:path*",
      },
      { source: "/api/latest", destination: `${rppgApi}/api/latest` },
      { source: "/api/health", destination: `${rppgApi}/api/health` },
      { source: "/api/history", destination: `${rppgApi}/api/history` },
      { source: "/api/baseline", destination: `${rppgApi}/api/baseline` },
      { source: "/api/profile", destination: `${rppgApi}/api/profile` },
      { source: "/api/scan/:path*", destination: `${rppgApi}/api/scan/:path*` },
      { source: "/api/demo/:path*", destination: `${rppgApi}/api/demo/:path*` },
    ];
  },
};

export default nextConfig;
