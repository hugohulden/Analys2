/** En deluppgift i boken. */
export interface BookPart {
  text: string
  answer?: string
  /** sympy-kontroller (scripts/verify.py). */
  checks?: string[]
}

/** En uppgift i övningsboken (kapitel 6, 11, 12 …). */
export interface BookTask {
  id: string // '6.4'
  intro: string
  parts?: Record<string, BookPart>
  /** Svar för hela uppgiften (om den saknar deluppgifter eller svaret är gemensamt). */
  answer?: string
  checks?: string[]
  /** Bokens tips (från "Tips Kapitel N"). */
  tip?: string
  /** 'bok' = facit ur boken, 'egen' = egen lösning (verifierad med sympy där det går). */
  answerSource: 'bok' | 'egen'
  /** Figur (relativt public/). */
  figure?: string
  /** L/T/TL-markering i boken (lösning/tips finns). */
  mark?: string
}
