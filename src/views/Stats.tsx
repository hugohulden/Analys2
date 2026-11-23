import { useMemo } from 'react'
import { AREAS, EXAM_SLOTS } from '../data/areas'
import { computeMastery, expectedPoints } from '../logic/mastery'
import { useStore } from '../state/store'
import { pct, ProgressBar } from '../components/ui'

export function StatsView() {
  const { progress, update, today } = useStore()
  const m = useMemo(() => computeMastery(progress, today), [progress, today])
  const ep = useMemo(() => expectedPoints(m, progress), [m, progress])
  const best = [...ep.perSlot].sort((a, b) => b.gainPerHour - a.gainPerHour).slice(0, 3)
  const setDugga = (k: 'dugga1' | 'dugga2', v: string) =>
    update((p) => ({ ...p, duggaResults: { ...p.duggaResults, [k]: v === '' ? undefined : Math.max(0, Math.min(6, Number(v))) } }))

  return (
    <div className="page">
      <h1>Var står jag?</h1>
      <section className="card hero">
        <div className="hero-num">{Math.round(ep.total * 10) / 10}</div>
        <div>
          <div>förväntade tentapoäng av 50{ep.bonus ? ` (inkl. ${ep.bonus} bonus)` : ''}</div>
          <div className="big">
            Uppskattat betyg: <strong>{ep.grade === 'U' ? 'U' : ep.grade}</strong>
          </div>
          <div className="small muted">Σ (platsens typiska poäng × behärskning). Gränser 20/30/40.</div>
        </div>
      </section>

      <section className="card">
        <h2>Mest poäng per timme härnäst</h2>
        <ol>
          {best.map((s) => (
            <li key={s.slot}>
              <strong>Plats {s.slot}</strong>: {s.name} <span className="muted small">(≈ {s.gainPerHour.toFixed(1)} p/h, behärskning {pct(s.mastery)})</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="card">
        <h2>Per tentaplats</h2>
        {ep.perSlot.map((s) => (
          <div key={s.slot} className="area-row">
            <div className="row between small">
              <span>
                {s.slot}. {EXAM_SLOTS[s.slot - 1].name}
              </span>
              <span className="muted">
                {s.points.toFixed(1)}/{s.weight.toFixed(1)} p
              </span>
            </div>
            <ProgressBar value={s.mastery} />
          </div>
        ))}
      </section>

      <section className="card">
        <h2>Behärskning per område</h2>
        <p className="small muted">Från självrättningar (vikt 2), simuleringar (3), övningar (0,5) och kort (0,4). Äldre resultat väger mindre.</p>
        {AREAS.map((a) => (
          <div key={a.id} className="area-row">
            <div className="row between small">
              <a href={`#/omraden/${a.id}`}>{a.name}</a>
              <span className="muted">{pct(m[a.id])}</span>
            </div>
            <ProgressBar value={m[a.id]} />
          </div>
        ))}
      </section>

      <section className="card">
        <h2>Duggor (bonus)</h2>
        <p className="small muted">Minst 4 av 6 p ger {progress.settings.bonusPerDugga} bonuspoäng på tentan.</p>
        <label className="field">
          Dugga 1 (18/11), poäng 0–6
          <input type="number" min={0} max={6} step={1} inputMode="numeric" value={progress.duggaResults.dugga1 ?? ''} onChange={(e) => setDugga('dugga1', e.target.value)} />
        </label>
        <label className="field">
          Dugga 2, poäng 0–6
          <input type="number" min={0} max={6} step={1} inputMode="numeric" value={progress.duggaResults.dugga2 ?? ''} onChange={(e) => setDugga('dugga2', e.target.value)} />
        </label>
      </section>
    </div>
  )
}
