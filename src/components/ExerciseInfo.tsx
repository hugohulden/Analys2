import { useState } from 'react'
import { lookupExercise } from '../data/book'
import { solutionsFor } from '../data/book/solutions'
import { EXERCISE_BY_ID } from '../data/exercises'
import { EXERCISE_SESSION_COVERS } from '../data/guides'
import { LECTURES } from '../data/lectures'
import { Pill, Rich } from './ui'

/** Bokkapitel → föreläsningar där metoderna gås igenom (om övningen inte finns i schemat). */
const CHAPTER_LECTURES: Record<string, string[]> = { '6': ['F12'], '12': ['F2', 'F3', 'F4'], '13': ['F5', 'F6', 'F7'], '14': ['F8', 'F9'], '15': ['F10', 'F11', 'F12'] }

function lecturesFor(id: string): string[] {
  const ex = EXERCISE_BY_ID[id] ?? EXERCISE_BY_ID[id.replace(/[a-k]$/, '')]
  const ids = ex ? EXERCISE_SESSION_COVERS[ex.momentId] ?? [ex.momentId] : CHAPTER_LECTURES[id.split('.')[0]] ?? []
  return ids.filter((l) => LECTURES[l])
}

/** Uppgiftstext, bokens tips och facit för en övning (t.ex. '12.17d'). */
export function ExerciseInfo({ id }: { id: string }) {
  const [showTip, setShowTip] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [showSol, setShowSol] = useState(false)
  const hit = lookupExercise(id)
  if (!hit) {
    return <p className="small muted ex-info">Uppgiftstexten finns inte inlagd än{id.includes(':') ? ' (uppgifter ur pdf-häften läggs in när du skickar dem)' : ''}. Använd boken.</p>
  }
  const { task, part, letter } = hit
  // Hel uppgift med deluppgifter (t.ex. '6.68' eller '12.35' som "resten"): visa alla delar.
  const parts = part ? [[letter!, part] as const] : Object.entries(task.parts ?? {})
  const tip = task.tip
  const answers = part ? (part.answer ? [[letter!, part.answer] as const] : []) : [...parts.filter(([, p]) => p.answer).map(([l, p]) => [l, p.answer!] as const)]
  const whole = task.answer
  const sols = solutionsFor(task.id, Object.keys(task.parts ?? {}), letter)
  const lecs = lecturesFor(id)
  return (
    <div className="ex-info">
      <div className="row wrap gap small">
        <strong>{task.id}{letter ?? ''}</strong>
        {task.mark && <Pill tone="info" >{task.mark.includes('L') ? 'Lösning i boken' : ''}{task.mark.includes('T') && task.mark.includes('L') ? ' · ' : ''}{task.mark.includes('T') ? 'Tips finns' : ''}</Pill>}
        {task.answerSource === 'egen' && <Pill tone="warn">Eget svar (inte bokens facit)</Pill>}
      </div>
      <Rich text={task.intro} />
      {task.figure && <img className="ex-fig" src={`${import.meta.env.BASE_URL}${task.figure}`} alt={`Figur till ${task.id}`} />}
      {parts.map(([l, p]) => (
        <div key={l} className="ex-part">
          <Rich text={`**${l})** ${p.text}`} />
        </div>
      ))}
      <div className="row wrap gap">
        {tip && <button className="btn small-btn" onClick={() => setShowTip(!showTip)}>{showTip ? 'Dölj tips' : 'Visa tips'}</button>}
        {sols.length > 0 && <button className="btn small-btn" onClick={() => setShowSol(!showSol)}>{showSol ? 'Dölj lösning' : 'Visa lösning'}</button>}
        {(answers.length > 0 || whole) && <button className="btn small-btn" onClick={() => setShowAnswer(!showAnswer)}>{showAnswer ? 'Dölj svar' : 'Visa svar'}</button>}
      </div>
      {showTip && tip && (
        <div className="reveal-part hint">
          <Rich text={tip} />
        </div>
      )}
      {showSol && (
        <div className="reveal-part steps">
          {sols.map(([l, txt]) => (
            <Rich key={l || 'all'} text={l ? `**${l})** ${txt}` : txt} />
          ))}
          {lecs.length > 0 && (
            <p className="small muted">
              Metoderna gås igenom i{' '}
              {lecs.map((l, i) => (
                <span key={l}>{i > 0 && (i === lecs.length - 1 ? ' och ' : ', ')}<a href={`#/forelasning/${l}`}>{l}</a></span>
              ))}{' '}
              – läs där om du kör fast.
            </p>
          )}
        </div>
      )}
      {showAnswer && (
        <div className="reveal-part answer">
          {whole && <Rich text={whole} />}
          {answers.map(([l, a]) => (
            <Rich key={l} text={`**${l})** ${a}`} />
          ))}
        </div>
      )}
    </div>
  )
}
