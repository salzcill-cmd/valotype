import { Faq } from "@/components/landing/faq"
import { Footer } from "@/components/landing/footer"
import { GamePreview } from "@/components/landing/game-preview"
import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { LeaderboardPreview } from "@/components/landing/leaderboard-preview"
import { ProgressionPreview } from "@/components/landing/progression-preview"
import { BackToTop, ScrollProgress } from "@/components/landing/scroll-progress"

/** Halaman landing (DESAIN.md §13.1, TODO 6.1). */
export default function IndexRoute() {
  return (
    <main>
      <ScrollProgress />
      <Hero />
      <HowItWorks />
      <GamePreview />
      <LeaderboardPreview />
      <ProgressionPreview />
      <Faq />
      <Footer />
      <BackToTop />
    </main>
  )
}
