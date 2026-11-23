import type { PlanDay } from './types'

/*
 * Den bestämda studieplanen (avsnitt 4). Datum utanför listan behandlas av planeraren
 * (före 23/11: inget, efter tentan: inget). Dugga 2- och tentadatum kan flyttas i
 * inställningarna – planeraren lägger då dugga/tenta-dagen och förberedelsen dit.
 */
export const PLAN_START = '2026-11-23'

export const STUDY_PLAN: PlanDay[] = [
  // ---------- Vecka 48 ----------
  { date: '2026-11-23', kind: 'lecture', title: 'Ö6 + F10: DE ordning 1, integrerande faktor', moments: ['Ö6', 'F10'], problems: ['ht25-6'] },
  { date: '2026-11-24', kind: 'catchup', title: 'Ikapp-dag: area, volym, massa, tyngdpunkt (F8/F9)', catchupMoments: ['F8', 'F9'], problems: ['om-5a', 'om-5b', 'om-5c'],
    note: 'Ingen undervisning. Gör klart kvarvarande F8/F9-övningar.' },
  { date: '2026-11-25', kind: 'lecture', title: 'Ö7 + F11: separabla DE', moments: ['Ö7', 'F11'], problems: ['ht24-3c'] },
  { date: '2026-11-26', kind: 'lecture', title: 'F12: DE-tillämpningar, komplexa tal intro', moments: ['F12'] },
  { date: '2026-11-27', kind: 'exam-practice', title: 'Fredag: tentauppgifter DE ordning 1 + komplexa 1a', problems: ['ht24-7a', 'ht24-7b', 'ht24-7c', 'ht25-7a', 'ht25-7b', 'ht25-7c', 'om-7', 'ht24-1a', 'ht25-1a', 'om-1a'] },
  { date: '2026-11-28', kind: 'review', title: 'Lördag: repetition huvudsats + generaliserade integraler', problems: ['ht25-4a', 'ht25-4b', 'ht25-4c', 'ht25-5', 'om-4a', 'om-4b', 'om-4c', 'ht24-6'] },
  { date: '2026-11-29', kind: 'rest', title: 'Vila (max 30 min flashcards)' },
  // ---------- Vecka 49 ----------
  { date: '2026-11-30', kind: 'lecture', title: 'Ö8 + F13: komplexa tal, polär form', moments: ['Ö8', 'F13'] },
  { date: '2026-12-01', kind: 'lecture', title: 'F14: komplexa polynomekvationer', moments: ['F14'] },
  { date: '2026-12-02', kind: 'lecture', title: 'Ö9 + F15: polynomekvationer, DE ordning 2 intro', moments: ['Ö9', 'F15'] },
  { date: '2026-12-03', kind: 'exam-practice', title: 'Tentauppgifter komplexa tal', problems: ['ht24-1b', 'ht24-2', 'ht24-4a', 'ht25-1b', 'ht25-2a', 'ht25-2b', 'om-1b', 'om-2a', 'om-2b'] },
  { date: '2026-12-04', kind: 'dugga-prep', title: 'Dugga 2-förberedelse' },
  { date: '2026-12-05', kind: 'mini-dugga', title: 'Mini-dugga (1 h, under tidspress) + rättning' },
  { date: '2026-12-06', kind: 'rest', title: 'Vila (max 30 min flashcards)' },
  // ---------- Vecka 50 ----------
  { date: '2026-12-07', kind: 'dugga-prep', title: 'Dugga 2-förberedelse: svaga punkter' },
  { date: '2026-12-08', kind: 'dugga', title: 'Dugga 2', note: 'ANTAGET datum – bekräfta i Inställningar.' },
  { date: '2026-12-09', kind: 'lecture', title: 'Ö10 + F16: DE ordning 2, homogena + partikulärlösning', moments: ['Ö10', 'F16'] },
  { date: '2026-12-10', kind: 'lecture', title: 'F17: partikulärlösning forts.', moments: ['F17'] },
  { date: '2026-12-11', kind: 'exam-practice', title: 'Fredag: tentauppgifter DE ordning 2', problems: ['ht24-8', 'ht25-8', 'om-8'] },
  { date: '2026-12-12', kind: 'review', title: 'Lördag: blandad repetition (integrationsmetoder + komplexa)',
    focusAreas: ['int-partiell', 'int-variabelbyte', 'int-partialbrak', 'komplexa-rakna', 'komplexa-ekvationer'] },
  { date: '2026-12-13', kind: 'rest', title: 'Vila (max 30 min flashcards)' },
  // ---------- Vecka 51 ----------
  { date: '2026-12-14', kind: 'lecture', title: 'Ö11 + F18: Maclaurinutveckling', moments: ['Ö11', 'F18'] },
  { date: '2026-12-15', kind: 'lecture', title: 'F19: gränsvärden, serier, Taylor, ordo', moments: ['F19'] },
  { date: '2026-12-16', kind: 'lecture', title: 'Ö12 + F20: repetition', moments: ['Ö12', 'F20'] },
  { date: '2026-12-17', kind: 'exam-practice', title: 'Tentauppgifter Taylor', problems: ['ht24-9a', 'ht24-9b', 'ht25-9a', 'ht25-9b', 'ht25-9c', 'om-9a', 'om-9b'] },
  { date: '2026-12-18', kind: 'mock-exam', title: 'Diagnostenta: tenta ht24, 4 h under tentaförhållanden', mockExam: 'ht24', note: 'Bara formelbladet.' },
  { date: '2026-12-19', kind: 'grade-mock', title: 'Rätta ht24 → åtgärdslista', mockExam: 'ht24' },
  { date: '2026-12-20', kind: 'rest', title: 'Vila' },
  // ---------- Jul- och tentaperiod ----------
  { date: '2026-12-21', kind: 'weak-areas', title: 'Svagaste områdena enligt diagnosen (1/3)' },
  { date: '2026-12-22', kind: 'weak-areas', title: 'Svagaste områdena enligt diagnosen (2/3)' },
  { date: '2026-12-23', kind: 'weak-areas', title: 'Svagaste områdena enligt diagnosen (3/3)' },
  { date: '2026-12-24', kind: 'free', title: 'Julafton – ledigt' },
  { date: '2026-12-25', kind: 'free', title: 'Juldagen – ledigt' },
  { date: '2026-12-26', kind: 'free', title: 'Annandag jul – ledigt' },
  { date: '2026-12-27', kind: 'topic', title: 'Komplexa tal: alla tentauppgifter + svåra bokuppgifter',
    focusAreas: ['komplexa-rakna', 'komplexa-ekvationer', 'komplexa-geometri'], exercises: ['6.27-6.30', '6.43', '6.46', '6.49'] },
  { date: '2026-12-28', kind: 'topic', title: 'Integrationsmetoder + huvudsatsen (alla duggor + tentauppgift 3 och 4)',
    focusAreas: ['int-partiell', 'int-variabelbyte', 'int-partialbrak', 'int-trig', 'int-teori'] },
  { date: '2026-12-29', kind: 'topic', title: 'DE ordning 1 och 2 (inkl. resonansfall och begynnelsevärden)',
    focusAreas: ['de1-linjar', 'de1-separabel', 'de1-tillampning', 'de2-homogen', 'de2-partikular'] },
  { date: '2026-12-30', kind: 'topic', title: 'Tillämpningar, generaliserade integraler, Taylor',
    focusAreas: ['tillamp-area', 'tillamp-volym', 'tillamp-massa', 'int-generaliserade', 'taylor-utveckling', 'taylor-gransvarde', 'taylor-serier'] },
  { date: '2026-12-31', kind: 'free', title: 'Nyårsafton – ledigt' },
  { date: '2027-01-01', kind: 'free', title: 'Nyårsdagen – ledigt' },
  { date: '2027-01-02', kind: 'mock-exam', title: 'Tenta ht25, 4 h', mockExam: 'ht25' },
  { date: '2027-01-03', kind: 'grade-mock', title: 'Rätta ht25 → åtgärdslista', mockExam: 'ht25' },
  { date: '2027-01-04', kind: 'weak-areas', title: 'Svaga områden + högre nivå + ja/nej-kort', note: 'janej' },
  { date: '2027-01-05', kind: 'weak-areas', title: 'Svaga områden + högre nivå + ja/nej-kort', note: 'janej' },
  { date: '2027-01-06', kind: 'weak-areas', title: 'Svaga områden + högre nivå + ja/nej-kort', note: 'janej' },
  { date: '2027-01-07', kind: 'mock-exam', title: 'Omtenta ht25, 4 h', mockExam: 'omtenta-ht25' },
  { date: '2027-01-08', kind: 'grade-mock', title: 'Rätta omtentan → åtgärdslista', mockExam: 'omtenta-ht25' },
  { date: '2027-01-09', kind: 'mock-exam', title: 'Mixtenta (genererad) eller omkörning av sämsta tentan', note: 'mix' },
  { date: '2027-01-10', kind: 'light', title: 'Formelblad + "måste kunna utantill"-korten, lätt pass' },
  { date: '2027-01-11', kind: 'light', title: 'Max 1 h lätt repetition, sedan vila' },
  { date: '2027-01-12', kind: 'exam', title: 'TENTA', note: 'ANTAGET datum (tidigare år: tis 14/1 2025, tis 13/1 2026) – bekräfta i Inställningar.' },
]

export const PLAN_BY_DATE = Object.fromEntries(STUDY_PLAN.map((d) => [d.date, d])) as Record<string, PlanDay>
