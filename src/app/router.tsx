import { createBrowserRouter } from "react-router"

import { AppLayout } from "@/app/layout"
import IndexRoute from "@/routes/index"
import PlayGameRoute from "@/routes/play.game"

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <IndexRoute />,
      },
      {
        path: "/play/game",
        element: <PlayGameRoute />,
      },
    ],
  },
])
