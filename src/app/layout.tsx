import { Outlet } from "react-router"

import { Navbar } from "@/components/layout/navbar"
import { TabBar } from "@/components/layout/tab-bar"

/** Layout utama dengan navbar (desktop) + tab bar (mobile). */
export function AppLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <div className="flex-1 pb-[calc(var(--tabbar-height)+env(safe-area-inset-bottom))] md:pb-0">
        <Outlet />
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
