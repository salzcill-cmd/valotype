import { useEffect } from "react"

/** Set judul tab browser per halaman (kemudahan navigasi & share link). */
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} · ValoType` : "ValoType"
  }, [title])
}
