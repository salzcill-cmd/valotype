import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"

import { Providers } from "@/app/providers"
import { router } from "@/app/router"
import { ErrorBoundary } from "@/components/shared/error-boundary"
import "@/styles/globals.css"

const root = document.getElementById("root")
if (!root) throw new Error("Root element #root tidak ditemukan")

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </ErrorBoundary>
  </StrictMode>,
)
