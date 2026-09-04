import { createBrowserRouter } from "react-router"

import { AppLayout, FocusLayout } from "@/app/layout"
import { AccuracyFortressGame } from "@/features/games/accuracy-fortress/component"
import { ComboCascadeGame } from "@/features/games/combo-cascade/component"
import { EnduranceRunGame } from "@/features/games/endurance-run/component"
import { SpeedBlitzGame } from "@/features/games/speed-blitz/component"
import AchievementsRoute from "@/routes/achievements"
import ChallengeRoute from "@/routes/challenge"
import IndexRoute from "@/routes/index"
import LeaderboardRoute from "@/routes/leaderboard"
import LoginRoute from "@/routes/login"
import PlayRoute from "@/routes/play"
import PlayDailyRoute from "@/routes/play.daily"
import PlayGameRoute from "@/routes/play.game"
import PlayResultRoute from "@/routes/play.result"
import PremiumRoute from "@/routes/premium"
import ProfileRoute from "@/routes/profile"
import SettingsRoute from "@/routes/settings"
import SignupRoute from "@/routes/signup"

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <IndexRoute /> },
      { path: "/play", element: <PlayRoute /> },
      { path: "/play/result", element: <PlayResultRoute /> },
      { path: "/login", element: <LoginRoute /> },
      { path: "/signup", element: <SignupRoute /> },
      { path: "/profile", element: <ProfileRoute /> },
      { path: "/leaderboard", element: <LeaderboardRoute /> },
      { path: "/settings", element: <SettingsRoute /> },
      { path: "/achievements", element: <AchievementsRoute /> },
      { path: "/premium", element: <PremiumRoute /> },
    ],
  },
  {
    // Layar mengetik = focus mode tanpa navigasi (prd.md §22)
    element: <FocusLayout />,
    children: [
      { path: "/play/game", element: <PlayGameRoute /> },
      { path: "/play/blitz", element: <SpeedBlitzGame /> },
      { path: "/play/fortress", element: <AccuracyFortressGame /> },
      { path: "/play/daily", element: <PlayDailyRoute /> },
      { path: "/play/endurance", element: <EnduranceRunGame /> },
      { path: "/play/cascade", element: <ComboCascadeGame /> },
      { path: "/challenge/:contentId", element: <ChallengeRoute /> },
    ],
  },
])
