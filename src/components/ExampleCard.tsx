import { useState } from 'react'
import type { LectureExample } from '../data/lectures'
import { Rich } from './ui'

/** Lärarens exempel med stegvis avslöjande lösning. */
export function ExampleCard({ e, n }: { e: LectureExample; n: number }) {
  const [shown, setShown] = useState(0) // antal visade steg; steps.length + 1 = svaret visas
  const done = shown > e.steps.length
  return (
    <div className="example">
      <div className="row between">
        <h3>
          Exempel {n}: {e.title}
        </h3>
      </div>
      <Rich text={e.q} />
      {e.note && <p className="small muted">{e.note}</p>}
      {shown > 0 && (
        <ol className="steps">
          {e.steps.slice(0, shown).map((s, i) => (
            <li key={i}>
              <Rich text={s} />
            </li>
          ))}
        </ol>
      )}
      {done && (
        <div className="reveal-part answer">
          <Rich text={`**Svar:** ${e.answer}`} />
        </div>
      )}
      <div className="row gap wrap">
        {!done && (
          <button className="btn small-btn primary" onClick={() => setShown(shown + 1)}>
            {shown === 0 ? 'Visa första steget' : shown < e.steps.length ? 'Nästa steg' : 'Visa svaret'}
          </button>
        )}
        {!done && shown === 0 && (
          <button className="btn small-btn" onClick={() => setShown(e.steps.length + 1)}>
            Visa hela lösningen
          </button>
        )}
        {shown > 0 && (
          <button className="btn small-btn" onClick={() => setShown(0)}>
            Dölj
          </button>
        )}
      </div>
    </div>
  )
}

