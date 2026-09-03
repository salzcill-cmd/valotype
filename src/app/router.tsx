import { createBrowserRouter } from "react-router"

import { AppLayout } from "@/app/layout"
import IndexRoute from "@/routes/index"

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <IndexRoute />,
      },
    ],
  },
])
