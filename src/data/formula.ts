const r = String.raw

/** Formelbladet som delas ut på tentan (inte på duggan). Återgivet från formelbladet i tenta ht25 (sid 4). */
export const FORMULA_SHEET: { heading: string; items: string[] }[] = [
  {
    heading: 'Primitiva funktioner',
    items: [r`$$\int\frac{1}{\sqrt{x^2+a}}\,dx = \ln\left|x + \sqrt{x^2+a}\right| + C$$`],
  },
  {
    heading: 'Massa',
    items: [
      r`1-dim: $m = \rho\ell$ $\quad$ 2-dim: $m = \rho A$ $\quad$ 3-dim: $m = \rho V$`,
      r`($\ell$ är längden, $A$ är arean, $V$ är volymen, $\rho$ är densiteten.)`,
    ],
  },
  {
    heading: 'Tyngdpunkt, x-koordinat',
    items: [r`$$x_T = \frac1m\int_K x\,dm$$`],
  },
  {
    heading: 'Maclaurin-serier',
    items: [
      r`$$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \dots + \frac{x^k}{k!} + \dots$$`,
      r`$$\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} + \dots + (-1)^k\frac{x^{2k+1}}{(2k+1)!} + \dots$$`,
      r`$$\cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} + \dots + (-1)^k\frac{x^{2k}}{(2k)!} + \dots$$`,
      r`$$\ln(1+x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4} + \dots + (-1)^{k-1}\frac{x^k}{k} + \dots$$`,
      r`$$(1+x)^k = 1 + kx + \frac{k(k-1)}{2!}x^2 + \frac{k(k-1)(k-2)}{3!}x^3 + \dots + \frac{k(k-1)\cdots(k-(n-1))}{n!}x^n + \dots$$`,
      r`$$\arctan x = x - \frac{x^3}{3} + \frac{x^5}{5} - \frac{x^7}{7} + \dots + (-1)^{n-1}\frac{x^{2n-1}}{2n-1} + \dots$$`,
    ],
  },
  {
    heading: 'Taylorpolynom av ordning n i x = a',
    items: [r`$$p_n(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \dots + \frac{f^{(n)}(a)}{n!}(x-a)^n$$`],
  },
]

export const NOT_ON_SHEET_NOTE = r`Allt annat – standardprimitiver, partialintegration, partialbråksansatser, $\sin^2/\cos^2$-formlerna, rotationsvolym, komplexa tal, DE-metoderna, geometrisk serie – måste du kunna utantill. Träna med korten "Måste kunna".`
