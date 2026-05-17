import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api/clinicaltables": {
        target: "https://clinicaltables.nlm.nih.gov",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/clinicaltables/, "/api"),
      },
    },
  },
});
