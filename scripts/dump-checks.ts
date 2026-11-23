// Skriver ut alla uppgifters verifieringsanrop som JSON (läses av scripts/verify.py).
import { PROBLEMS } from '../src/data/problems/index.ts'

const out = PROBLEMS.map((p) => ({ id: p.id, answer: p.answer, checks: p.checks }))
process.stdout.write(JSON.stringify(out, null, 1))
