import { EXERCISE_SESSION_COVERS, GUIDES } from '../data/guides'
import { MOMENT_BY_ID } from '../data/schedule'
import { Collapsible, Rich } from './ui'
import { LECTURES } from '../data/lectures'
import { ExampleCard } from './ExampleCard'

/** "Läs innan föreläsningen" (F) eller "Inför Ö-passet" (Ö: övningstexterna för de föreläsningar passet bygger på). */
export function PreviewGuide({ momentId, defaultOpen = false }: { momentId: string; defaultOpen?: boolean }) {
  const m = MOMENT_BY_ID[momentId]
  if (!m) return null
  if (m.kind === 'Ö') {
    const covers = (EXERCISE_SESSION_COVERS[momentId] ?? []).filter((id) => GUIDES[id])
    if (!covers.length) return null
    return (
      <div className="guide">
        <Collapsible title={<span>📖 Inför {momentId}: vad passet handlar om</span>} defaultOpen={defaultOpen}>
          <p className="small muted">{momentId} bygger på {covers.join(' och ')}. Försök själv på demo-uppgifterna först, och läs sedan exemplen nedan.</p>
          {covers.map((id) => (
            <div key={id} className="guide-text">
              <h4>{id}: {MOMENT_BY_ID[id].title}</h4>
              <Rich text={GUIDES[id].practice} />
            </div>
          ))}
        </Collapsible>
      </div>
    )
  }
  const g = GUIDES[momentId]
  if (!g) return null
  return (
    <div className="guide">
      <Collapsible title={<span>📖 Läs innan {momentId}: {m.title}</span>} defaultOpen={defaultOpen}>
        <div className="guide-text">
          <Rich text={g.preview} />
        </div>
      </Collapsible>
    </div>
  )
}

/** "Om övningarna": vad de tränar, metod, lösta exempel och vanliga fel. */
export function PracticeGuide({ momentId, defaultOpen = false }: { momentId: string; defaultOpen?: boolean }) {
  const g = GUIDES[momentId]
  const lec = LECTURES[momentId]
  if (!g) return null
  return (
    <div className="guide">
      <Collapsible title={<span>✏️ Om övningarna till {momentId}: lösta exempel{lec ? ' + lärarens exempel' : ''}</span>} defaultOpen={defaultOpen}>
        <div className="guide-text">
          <Rich text={g.practice} />
        </div>
        {lec && (
          <div className="guide-lec">
            <h4>👩‍🏫 Lärarens exempel från {momentId}: räkna själv, visa sedan stegen</h4>
            {lec.examples.map((e, i) => (
              <ExampleCard key={e.id} e={e} n={i + 1} />
            ))}
            <a className="btn small-btn" href={`#/forelasning/${momentId}`}>📓 Hela föreläsningen: anteckningar, kontrollfrågor, originalsidor</a>
          </div>
        )}
      </Collapsible>
    </div>
  )
}
