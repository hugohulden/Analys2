// Skriver ut alla verifieringsanrop (tentauppgifter + bokens facit) som JSON (läses av scripts/verify.py).
import { PROBLEMS } from '../src/data/problems/index.ts'
import { BOOK } from '../src/data/book/index.ts'

const out: { id: string; answer: string; checks: string[]; optional?: boolean }[] = PROBLEMS.map((p) => ({ id: p.id, answer: p.answer, checks: p.checks }))
for (const t of BOOK) {
  if (t.checks?.length) out.push({ id: `bok ${t.id}`, answer: t.answer ?? '', checks: t.checks, optional: true })
  for (const [l, part] of Object.entries(t.parts ?? {})) if (part.checks?.length) out.push({ id: `bok ${t.id}${l}`, answer: part.answer ?? '', checks: part.checks, optional: true })
}
process.stdout.write(JSON.stringify(out, null, 1))
