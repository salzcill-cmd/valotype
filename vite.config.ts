import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

import { trpcVitePlugin } from "./src/server/vite-plugin-trpc.ts"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), trpcVitePlugin()],
  resolve: {
    alias: {
      "@": `${import.meta.dirname}/src`,
    },
  },
})
