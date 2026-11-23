import { get, set } from 'idb-keyval'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { emptyProgress, normalizeProgress } from '../data/defaults'
import type { Progress } from '../data/types'
import { todayISO } from '../logic/dates'

const KEY = 'analys2-progress-v1'

interface Store {
  progress: Progress
  loaded: boolean
  /** Uppdatera progress med en ren funktion (Progress → Progress). */
  update: (fn: (p: Progress) => Progress) => void
  replace: (p: Progress) => void
  today: string
  saveError?: string
}

const Ctx = createContext<Store | null>(null)

/** Dagens datum. Kan överskridas med ?datum=yyyy-mm-dd i adressen (för att testa andra dagar). */
function resolveToday(): string {
  const m = location.search.match(/datum=(\d{4}-\d{2}-\d{2})/) ?? location.hash.match(/datum=(\d{4}-\d{2}-\d{2})/)
  return m ? m[1] : todayISO()
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(emptyProgress)
  const [loaded, setLoaded] = useState(false)
  const [saveError, setSaveError] = useState<string>()
  const [today, setToday] = useState(resolveToday)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    get(KEY)
      .then((raw) => {
        if (raw) setProgress(normalizeProgress(raw))
      })
      .catch((e) => setSaveError(`Kunde inte läsa sparad progress: ${e}`))
      .finally(() => setLoaded(true))
    navigator.storage?.persist?.().catch(() => {})
    // Byt dag automatiskt om appen ligger öppen över midnatt.
    const iv = window.setInterval(() => setToday(resolveToday()), 60_000)
    return () => window.clearInterval(iv)
  }, [])

  useEffect(() => {
    if (!loaded) return
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      set(KEY, progress).then(
        () => setSaveError(undefined),
        (e) => setSaveError(`Kunde inte spara: ${e}`),
      )
    }, 250)
  }, [progress, loaded])

  // Spara direkt när fliken göms (mobil: appbyte).
  useEffect(() => {
    const flush = () => {
      if (document.visibilityState === 'hidden' && loaded) set(KEY, progress).catch(() => {})
    }
    document.addEventListener('visibilitychange', flush)
    return () => document.removeEventListener('visibilitychange', flush)
  }, [progress, loaded])

  const update = useCallback((fn: (p: Progress) => Progress) => setProgress((p) => fn(p)), [])
  const replace = useCallback((p: Progress) => setProgress(normalizeProgress(p)), [])

  const value = useMemo(() => ({ progress, loaded, update, replace, today, saveError }), [progress, loaded, update, replace, today, saveError])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore(): Store {
  const s = useContext(Ctx)
  if (!s) throw new Error('useStore utanför StoreProvider')
  return s
}

export function exportProgress(p: Progress) {
  const blob = new Blob([JSON.stringify(p, null, 1)], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `analys2-progress-${todayISO()}.json`
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 1000)
}

export async function readProgressFile(file: File): Promise<Progress> {
  const text = await file.text()
  return normalizeProgress(JSON.parse(text))
}
