import { useRef, useState } from 'react'
import { emptyProgress } from '../data/defaults'
import { MOMENTS } from '../data/schedule'
import type { Settings } from '../data/types'
import { formatShort } from '../logic/dates'
import { exportProgress, readProgressFile, useStore } from '../state/store'

export function SettingsView() {
  const { progress, update, replace } = useStore()
  const s = progress.settings
  const fileRef = useRef<HTMLInputElement>(null)
  const [msg, setMsg] = useState<string>()
  const [newFree, setNewFree] = useState('')
  const set = (patch: Partial<Settings>) => update((p) => ({ ...p, settings: { ...p.settings, ...patch } }))

  const onImport = async (f: File | undefined) => {
    if (!f) return
    try {
      const p = await readProgressFile(f)
      if (confirm('Ersätta all nuvarande progress med filens innehåll?')) {
        replace(p)
        setMsg('Importerat ✓')
      }
    } catch (e) {
      setMsg(`Kunde inte importera: ${e}`)
    }
  }

  return (
    <div className="page">
      <h1>Inställningar</h1>

      <section className="card">
        <h2>Målbetyg</h2>
        <div className="seg">
          {([3, 4, 5] as const).map((g) => (
            <button key={g} className={s.targetGrade === g ? 'on' : ''} onClick={() => set({ targetGrade: g })}>
              {g}
            </button>
          ))}
        </div>
        <p className="small muted">Betyg 4/5: högre-nivå-uppgifterna ingår i dagens pass.</p>
      </section>

      <section className="card">
        <h2>Datum</h2>
        <label className="field">
          Dugga 2
          <input type="date" value={s.dugga2Date} onChange={(e) => e.target.value && set({ dugga2Date: e.target.value, dugga2Confirmed: false })} />
        </label>
        <label className="toggle">
          <input type="checkbox" checked={s.dugga2Confirmed} onChange={(e) => set({ dugga2Confirmed: e.target.checked })} />
          Datumet för Dugga 2 är bekräftat
        </label>
        <label className="field">
          Tentan
          <input type="date" value={s.examDate} onChange={(e) => e.target.value && set({ examDate: e.target.value, examConfirmed: false })} />
        </label>
        <label className="toggle">
          <input type="checkbox" checked={s.examConfirmed} onChange={(e) => set({ examConfirmed: e.target.checked })} />
          Tentadatumet är bekräftat
        </label>
        <p className="small muted">Förifyllt: Dugga 2 tis 8/12 och tenta tis 12/1 (tidigare år: 14/1 2025, 13/1 2026). Appen varnar tills du bekräftat.</p>
      </section>

      <section className="card">
        <h2>Dugga 2: innehåll</h2>
        <p className="small muted">Okänt för HT2026. Välj moment; förberedelsedagarna och mini-duggan använder dem.</p>
        <div className="chips">
          {MOMENTS.filter((m) => m.kind === 'F').map((m) => {
            const on = s.dugga2Moments.includes(m.id)
            return (
              <button key={m.id} className={`chip ${on ? 'on' : ''}`} title={m.title} onClick={() => set({ dugga2Moments: on ? s.dugga2Moments.filter((x) => x !== m.id) : [...s.dugga2Moments, m.id] })}>
                {m.id}
              </button>
            )
          })}
        </div>
      </section>

      <section className="card">
        <h2>Studietid</h2>
        <label className="field">
          Max per vardag (min)
          <input type="number" min={30} max={480} step={15} value={s.maxMinutesWeekday} onChange={(e) => set({ maxMinutesWeekday: Number(e.target.value) || 180 })} />
        </label>
        <label className="field">
          Max per helgdag (min)
          <input type="number" min={30} max={480} step={15} value={s.maxMinutesWeekend} onChange={(e) => set({ maxMinutesWeekend: Number(e.target.value) || 120 })} />
        </label>
        <label className="field">
          Övningar räknas som "ikapp" från och med
          <input type="date" value={s.trackFrom} onChange={(e) => e.target.value && set({ trackFrom: e.target.value })} />
        </label>
        <h3>Lediga dagar</h3>
        <div className="chips">
          {s.freeDays.map((d) => (
            <button key={d} className="chip on" onClick={() => set({ freeDays: s.freeDays.filter((x) => x !== d) })} title="Ta bort">
              {formatShort(d)} ✕
            </button>
          ))}
        </div>
        <div className="row gap">
          <input type="date" value={newFree} onChange={(e) => setNewFree(e.target.value)} aria-label="Ny ledig dag" />
          <button className="btn" disabled={!newFree} onClick={() => { set({ freeDays: [...new Set([...s.freeDays, newFree])].sort() }); setNewFree('') }}>Lägg till</button>
        </div>
      </section>

      <section className="card">
        <h2>Utseende</h2>
        <div className="seg">
          {(['auto', 'light', 'dark'] as const).map((t) => (
            <button key={t} className={s.theme === t ? 'on' : ''} onClick={() => set({ theme: t })}>
              {t === 'auto' ? 'System' : t === 'light' ? 'Ljust' : 'Mörkt'}
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Progress</h2>
        <p className="small muted">Sparas lokalt i webbläsaren (IndexedDB). Exportera för att flytta mellan mobil och dator.</p>
        <div className="col gap">
          <button className="btn primary" onClick={() => exportProgress(progress)}>Exportera till JSON-fil</button>
          <button className="btn" onClick={() => fileRef.current?.click()}>Importera från JSON-fil</button>
          <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={(e) => onImport(e.target.files?.[0])} />
          <button className="btn bad" onClick={() => confirm('Radera ALL progress? Detta går inte att ångra (exportera först!).') && replace(emptyProgress())}>Återställ progress</button>
        </div>
        {msg && <p className="small">{msg}</p>}
      </section>

      <p className="small muted center">Version {__APP_VERSION__}. Allt innehåll fungerar offline.</p>
    </div>
  )
}
