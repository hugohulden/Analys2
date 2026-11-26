/** Hjälpare för lärarens uppställning i lösningsförslagen (F2–F4). */

/** Variabelbyte: [t = …, dt/dx = … ⇒ dt = …] (och ev. nya gränser). */
export const VB = (...lines: string[]) => `$$\\left[\\begin{array}{l}${lines.join('\\\\ ')}\\end{array}\\right]$$`

/** Partialintegration: [f(x) = … ⇒ F(x) = …; g(x) = … ⇒ g'(x) = …]. f integreras, g deriveras. */
export const PI = (f: string, F: string, g: string, gp: string, v = 'x') =>
  `$$\\left[\\begin{array}{ll}f(${v})=${f}&\\Rightarrow F(${v})=${F}\\\\ g(${v})=${g}&\\Rightarrow g'(${v})=${gp}\\end{array}\\right]$$`

/** Formeln som påminnelse. */
export const PI_FORMEL = `$\\int f(x)g(x)\\,dx=F(x)g(x)-\\int F(x)g'(x)\\,dx$`
