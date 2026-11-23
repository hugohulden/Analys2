import type { Area, AreaId } from './types'

export const AREAS: Area[] = [
  { id: 'komplexa-rakna', name: 'Komplexa tal: räkna', slot: 1 },
  { id: 'komplexa-ekvationer', name: 'Komplexa ekvationer', slot: 2 },
  { id: 'komplexa-geometri', name: 'Komplexa talplanet (geometri)', slot: 2 },
  { id: 'int-primitiva', name: 'Primitiva funktioner', slot: 3 },
  { id: 'int-variabelbyte', name: 'Variabelbyte', slot: 3 },
  { id: 'int-partiell', name: 'Partialintegration', slot: 3 },
  { id: 'int-partialbrak', name: 'Partialbråksuppdelning', slot: 3 },
  { id: 'int-trig', name: 'Trigonometriska integraler', slot: 3 },
  { id: 'int-teori', name: 'Integralens teori & huvudsatsen', slot: 4 },
  { id: 'int-generaliserade', name: 'Generaliserade integraler', slot: 5 },
  { id: 'tillamp-area', name: 'Area', slot: 6 },
  { id: 'tillamp-volym', name: 'Rotationsvolym', slot: 6 },
  { id: 'tillamp-massa', name: 'Massa & masscentrum', slot: 6 },
  { id: 'de1-linjar', name: 'DE ordn. 1: linjära', slot: 7 },
  { id: 'de1-separabel', name: 'DE ordn. 1: separabla', slot: 7 },
  { id: 'de1-tillampning', name: 'DE ordn. 1: tillämpningar', slot: 7 },
  { id: 'de2-homogen', name: 'DE ordn. 2: homogena', slot: 8 },
  { id: 'de2-partikular', name: 'DE ordn. 2: partikulärlösning', slot: 8 },
  { id: 'taylor-utveckling', name: 'Maclaurin/Taylor-utveckling', slot: 9 },
  { id: 'taylor-gransvarde', name: 'Gränsvärden med Maclaurin', slot: 9 },
  { id: 'taylor-serier', name: 'Serier & ordo', slot: 9 },
]

export const AREA_BY_ID = Object.fromEntries(AREAS.map((a) => [a.id, a])) as Record<AreaId, Area>

export const areaName = (id: AreaId) => AREA_BY_ID[id]?.name ?? id

/** Tentaanalysen (avsnitt 3). */
export interface ExamSlot {
  slot: number
  name: string
  ht24: string
  ht25: string
  omtenta: string
  typical: string
  /** Typisk poäng som används i viktning och förväntad poäng. */
  weight: number
  /** Uppskattad övningstid (h) för att höja behärskningen rejält. */
  hoursToLearn: number
  areas: AreaId[]
}

export const EXAM_SLOTS: ExamSlot[] = [
  { slot: 1, name: 'Komplexa tal: räkna (division, potenser, arg, belopp, polär form)', ht24: '6', ht25: '5', omtenta: '5', typical: '5–6 p', weight: 5.5, hoursToLearn: 2, areas: ['komplexa-rakna'] },
  { slot: 2, name: 'Komplexa ekvationer + geometri i talplanet', ht24: '6 (+2 skiss i 4a)', ht25: '5', omtenta: '5', typical: '5–8 p', weight: 6, hoursToLearn: 3, areas: ['komplexa-ekvationer', 'komplexa-geometri'] },
  { slot: 3, name: 'Integrationsmetoder (partialint., variabelbyte, partialbråk)', ht24: '10', ht25: '10', omtenta: '9', typical: '9–10 p', weight: 10, hoursToLearn: 4, areas: ['int-primitiva', 'int-variabelbyte', 'int-partiell', 'int-partialbrak', 'int-trig'] },
  { slot: 4, name: 'Integralens teori: huvudsatsen, derivera ∫, S(x), räkneregler', ht24: '1', ht25: '5', omtenta: '5', typical: '1–5 p', weight: 3.5, hoursToLearn: 1.5, areas: ['int-teori'] },
  { slot: 5, name: 'Generaliserade integraler', ht24: '(4, volym)', ht25: '5', omtenta: '~2 (ja/nej)', typical: '2–5 p', weight: 3.5, hoursToLearn: 1.5, areas: ['int-generaliserade'] },
  { slot: 6, name: 'Tillämpningar: area, rotationsvolym, massa, masscentrum', ht24: '5+4', ht25: '5', omtenta: '6', typical: '5–9 p', weight: 6.5, hoursToLearn: 3, areas: ['tillamp-area', 'tillamp-volym', 'tillamp-massa'] },
  { slot: 7, name: 'DE ordning 1 med tillämpning', ht24: '5', ht25: '5', omtenta: '5', typical: '5 p', weight: 5, hoursToLearn: 2.5, areas: ['de1-linjar', 'de1-separabel', 'de1-tillampning'] },
  { slot: 8, name: 'DE ordning 2 med konstanta koefficienter', ht24: '6', ht25: '5', omtenta: '5', typical: '5–6 p', weight: 5.5, hoursToLearn: 2.5, areas: ['de2-homogen', 'de2-partikular'] },
  { slot: 9, name: 'Maclaurin/Taylor: utveckling, gränsvärden, serier', ht24: '5', ht25: '5', omtenta: '5', typical: '5 p', weight: 5, hoursToLearn: 2.5, areas: ['taylor-utveckling', 'taylor-gransvarde', 'taylor-serier'] },
]

export const SLOT_BY_NUM = Object.fromEntries(EXAM_SLOTS.map((s) => [s.slot, s])) as Record<number, ExamSlot>

/** Vikt för repetition: tentaplatsens typiska poäng, med extra prioritet för plats 1–3 (strategin). */
export function areaWeight(id: AreaId): number {
  const slot = AREA_BY_ID[id].slot
  const w = SLOT_BY_NUM[slot].weight
  return slot <= 3 ? w * 1.25 : w
}

export const STRATEGY_POINTS: string[] = [
  '**Komplexa tal (~12 p) + integrationsmetoder (~10 p) ≈ 22 p**, vilket räcker till betyg 3 på egen hand. De är de mest förutsägbara uppgifterna och har högst prioritet i repetitionen.',
  '**DE (~10–11 p)** och **Taylor (5 p)** kommer sist i kursen (v. 50–51), så de får egen massiv träning i julperioden.',
  'Omtentan hade en **ja/nej-uppgift (5 p)** som blandar områden → träna de snabba sant/falskt-korten (vanliga fällor: $\\int_{-1}^1 \\frac{1}{x^2}\\,dx$ är generaliserad och divergent, integrerande faktor, cirkelns ekvation $|z-z_0|=r$).',
  'Dugga 1 2026 och Dugga 2 ht24/ht25 testade exakt samma tre saker: **partialintegration, variabelbyte, partialbråk** (2 p vardera, bonus vid ≥ 4 p). Samma typer återkommer som tentauppgift 3.',
  'Strukturen är mycket stabil: 9 uppgifter i nästan samma ordning varje år. Lär dig känna igen platsen → metoden direkt.',
]
