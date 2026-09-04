import { Outlet } from "react-router"

import { Navbar } from "@/components/layout/navbar"
import { TabBar } from "@/components/layout/tab-bar"

/** Layout utama dengan navbar (desktop) + tab bar (mobile). */
export function AppLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      {/* Skip link: lompat langsung ke konten (aksesibilitas keyboard) */}
      <a
        href="#main-content"
        className="fixed top-2 left-2 z-overlay border-2 border-foreground bg-primary px-4 py-2 font-display text-sm font-bold tracking-widest text-primary-foreground uppercase shadow-lg -translate-y-20 transition-transform focus:translate-y-0"
      >
        Lewati ke konten
      </a>
      <Navbar />
      <div className="flex-1 pb-[calc(var(--tabbar-height)+env(safe-area-inset-bottom))] md:pb-0">
        <div
          id="main-content"
          tabIndex={-1}
          className="flex min-h-full flex-1 flex-col outline-none"
        >
          <Outlet />
        </div>
      </div>
      <TabBar />
    </div>
  )
}

/** Layout fokus untuk layar mengetik — tanpa navigasi (prd.md §22 focus mode). */
export function FocusLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Outlet />
    </div>
  )
}
