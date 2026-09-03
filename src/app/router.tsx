import { createBrowserRouter } from "react-router"

import { AppLayout, FocusLayout } from "@/app/layout"
import { AccuracyFortressGame } from "@/features/games/accuracy-fortress/component"
import { SpeedBlitzGame } from "@/features/games/speed-blitz/component"
import IndexRoute from "@/routes/index"
import PlayRoute from "@/routes/play"
import PlayGameRoute from "@/routes/play.game"
import PlayResultRoute from "@/routes/play.result"

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <IndexRoute /> },
      { path: "/play", element: <PlayRoute /> },
      { path: "/play/result", element: <PlayResultRoute /> },
    ],
  },
  {
    // Layar mengetik = focus mode tanpa navigasi (prd.md §22)
    element: <FocusLayout />,
    children: [
      { path: "/play/game", element: <PlayGameRoute /> },
      { path: "/play/blitz", element: <SpeedBlitzGame /> },
      { path: "/play/fortress", element: <AccuracyFortressGame /> },
    ],
  },
])
