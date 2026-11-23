import type { Problem } from '../types'

const r = String.raw

/*
 * checks: Python-anrop som körs av scripts/verify.py (sympy). Se hjälpfunktionerna där.
 */
export const DUGGA_PROBLEMS: Problem[] = [
  // ---------------- Dugga 1A HT2026 ----------------
  {
    id: 'd1A-1', source: 'dugga1A-26', number: '1', slot: 3, areas: ['int-partiell'], points: 2,
    statement: r`Använd partialintegration för att beräkna $\displaystyle\int_0^2 x e^{-3x}\,dx$.`,
    hint: r`Vilken faktor blir enklare när den deriveras: $x$ eller $e^{-3x}$?`,
    method: r`Produkt av polynom och exponentialfunktion → **partialintegration**. Derivera polynomet ($x \to 1$) och integrera exponentialfunktionen ($e^{-3x}\to -\tfrac13 e^{-3x}$).`,
    steps: [
      r`Partialintegration $\int f'g = fg - \int fg'$ med $f' = e^{-3x}$, $f = -\tfrac13 e^{-3x}$, $g = x$, $g' = 1$:`,
      r`$$\int_0^2 x e^{-3x}\,dx = \Big[-\tfrac{x}{3}e^{-3x}\Big]_0^2 + \frac13\int_0^2 e^{-3x}\,dx.$$`,
      r`Första termen: $-\tfrac{2}{3}e^{-6} - 0 = -\tfrac23 e^{-6}$.`,
      r`Andra termen: $\frac13\Big[-\tfrac13 e^{-3x}\Big]_0^2 = \frac13\left(-\tfrac13 e^{-6} + \tfrac13\right) = \tfrac19 - \tfrac19 e^{-6}$.`,
      r`Summa: $-\tfrac69 e^{-6} + \tfrac19 - \tfrac19 e^{-6} = \tfrac19 - \tfrac79 e^{-6}$.`,
    ],
    answer: r`$\dfrac19 - \dfrac79 e^{-6}$`,
    checks: ["defint('x*exp(-3*x)', 0, 2, '1/9 - 7*exp(-6)/9')"],
  },
  {
    id: 'd1A-2', source: 'dugga1A-26', number: '2', slot: 3, areas: ['int-variabelbyte'], points: 2,
    statement: r`Använd variabelbyte för att bestämma $\displaystyle\int \frac{8x^3}{\sqrt{8+x^4}}\,dx$.`,
    hint: r`Derivatan av $8+x^4$ är $4x^3$ – den syns nästan i täljaren.`,
    method: r`Inre derivata syns → **variabelbyte** $u = 8+x^4$.`,
    steps: [
      r`Sätt $u = 8 + x^4$. Då är $\dfrac{du}{dx} = 4x^3$, dvs. $du = 4x^3\,dx$ och $8x^3\,dx = 2\,du$.`,
      r`$$\int \frac{8x^3}{\sqrt{8+x^4}}\,dx = \int \frac{2}{\sqrt u}\,du = \int 2u^{-1/2}\,du = 2\cdot\frac{u^{1/2}}{1/2} + C = 4\sqrt u + C.$$`,
      r`Byt tillbaka: $4\sqrt{8+x^4} + C$.`,
      r`*Kontroll:* $\frac{d}{dx}4\sqrt{8+x^4} = 4\cdot \frac{4x^3}{2\sqrt{8+x^4}} = \frac{8x^3}{\sqrt{8+x^4}}$ ✓`,
    ],
    answer: r`$4\sqrt{8+x^4} + C$`,
    checks: ["antider('4*sqrt(8+x**4)', '8*x**3/sqrt(8+x**4)')"],
  },
  {
    id: 'd1A-3', source: 'dugga1A-26', number: '3', slot: 3, areas: ['int-partialbrak'], points: 2,
    statement: r`Bestäm $\displaystyle\int \frac{3x-8}{x^3+x}\,dx$.`,
    hint: r`Faktorisera nämnaren: $x^3 + x = x(x^2+1)$. Vilken ansats passar en irreducibel kvadratisk faktor?`,
    method: r`Rationell funktion, gradtal täljare (1) < nämnare (3) → ingen polynomdivision. **Partialbråk** med ansatsen $\frac{A}{x} + \frac{Bx+C}{x^2+1}$.`,
    steps: [
      r`$$\frac{3x-8}{x(x^2+1)} = \frac{A}{x} + \frac{Bx+C}{x^2+1} \;\Rightarrow\; 3x - 8 = A(x^2+1) + (Bx+C)x.$$`,
      r`Identifiera koefficienter: $x^2$: $A + B = 0$; $x$: $C = 3$; konstant: $A = -8$. Alltså $B = 8$.`,
      r`*Kontroll:* $-\frac8x + \frac{8x+3}{x^2+1} = \frac{-8x^2-8+8x^2+3x}{x(x^2+1)} = \frac{3x-8}{x^3+x}$ ✓`,
      r`$$\int\left(-\frac8x + \frac{8x}{x^2+1} + \frac{3}{x^2+1}\right)dx = -8\ln|x| + 4\ln(x^2+1) + 3\arctan x + C.$$`,
      r`($\int \frac{8x}{x^2+1}dx = 4\int\frac{2x}{x^2+1}dx = 4\ln(x^2+1)$ eftersom täljaren är derivatan av nämnaren.)`,
    ],
    answer: r`$4\ln(x^2+1) + 3\arctan x - 8\ln|x| + C$`,
    checks: ["antider('4*log(x**2+1) + 3*atan(x) - 8*log(x)', '(3*x-8)/(x**3+x)')"],
  },
  // ---------------- Dugga 1B HT2026 ----------------
  {
    id: 'd1B-1', source: 'dugga1B-26', number: '1', slot: 3, areas: ['int-partiell'], points: 2,
    statement: r`Använd partialintegration för att beräkna $\displaystyle\int_0^3 x e^{-2x}\,dx$.`,
    hint: r`Samma typ som 1A: derivera $x$, integrera $e^{-2x}$.`,
    method: r`Polynom · exponential → **partialintegration** med $g = x$.`,
    steps: [
      r`$$\int_0^3 x e^{-2x}\,dx = \Big[-\tfrac{x}{2}e^{-2x}\Big]_0^3 + \frac12\int_0^3 e^{-2x}\,dx.$$`,
      r`Första termen: $-\tfrac32 e^{-6}$.`,
      r`Andra termen: $\frac12\Big[-\tfrac12 e^{-2x}\Big]_0^3 = \tfrac14 - \tfrac14 e^{-6}$.`,
      r`Summa: $-\tfrac64 e^{-6} - \tfrac14 e^{-6} + \tfrac14 = \tfrac14 - \tfrac74 e^{-6}$.`,
    ],
    answer: r`$\dfrac14 - \dfrac74 e^{-6}$`,
    checks: ["defint('x*exp(-2*x)', 0, 3, '1/4 - 7*exp(-6)/4')"],
  },
  {
    id: 'd1B-2', source: 'dugga1B-26', number: '2', slot: 3, areas: ['int-variabelbyte'], points: 2,
    statement: r`Använd variabelbyte för att bestämma $\displaystyle\int \frac{9x^2}{\sqrt{9+x^3}}\,dx$.`,
    hint: r`$\frac{d}{dx}(9+x^3) = 3x^2$.`,
    method: r`Inre derivata syns → **variabelbyte** $u = 9 + x^3$.`,
    steps: [
      r`$u = 9+x^3$, $du = 3x^2\,dx$, så $9x^2\,dx = 3\,du$.`,
      r`$$\int \frac{3\,du}{\sqrt u} = 3\cdot\frac{u^{1/2}}{1/2} + C = 6\sqrt u + C = 6\sqrt{9+x^3} + C.$$`,
      r`*Kontroll:* $\frac{d}{dx}6\sqrt{9+x^3} = \frac{6\cdot 3x^2}{2\sqrt{9+x^3}} = \frac{9x^2}{\sqrt{9+x^3}}$ ✓`,
    ],
    answer: r`$6\sqrt{9+x^3} + C$`,
    checks: ["antider('6*sqrt(9+x**3)', '9*x**2/sqrt(9+x**3)')"],
  },
  {
    id: 'd1B-3', source: 'dugga1B-26', number: '3', slot: 3, areas: ['int-partialbrak'], points: 2,
    statement: r`Bestäm $\displaystyle\int \frac{4-5x}{x^3+x}\,dx$.`,
    hint: r`$x^3+x = x(x^2+1)$ – ansats $\frac Ax + \frac{Bx+C}{x^2+1}$.`,
    method: r`**Partialbråk** med irreducibel kvadratisk faktor.`,
    steps: [
      r`$4 - 5x = A(x^2+1) + (Bx+C)x$. Koefficienter: $x^2$: $A+B=0$; $x$: $C=-5$; konstant: $A=4$ ⇒ $B=-4$.`,
      r`$$\frac{4-5x}{x^3+x} = \frac4x - \frac{4x+5}{x^2+1}.$$`,
      r`*Kontroll:* $\frac{4(x^2+1) - 4x^2 - 5x}{x(x^2+1)} = \frac{4-5x}{x^3+x}$ ✓`,
      r`$$\int\left(\frac4x - \frac{4x}{x^2+1} - \frac{5}{x^2+1}\right)dx = 4\ln|x| - 2\ln(x^2+1) - 5\arctan x + C.$$`,
    ],
    answer: r`$4\ln|x| - 2\ln(x^2+1) - 5\arctan x + C$`,
    checks: ["antider('4*log(x) - 2*log(x**2+1) - 5*atan(x)', '(4-5*x)/(x**3+x)')"],
  },
  // ---------------- Dugga 2A HT2024 ----------------
  {
    id: 'd2Aht24-1', source: 'dugga2A-ht24', number: '1', slot: 3, areas: ['int-partiell'], points: 2,
    statement: r`Använd partialintegration för att bestämma $\displaystyle\int 6x e^{2x}\,dx$.`,
    hint: r`Derivera $6x$, integrera $e^{2x}$.`,
    method: r`Polynom · exponential → **partialintegration**.`,
    steps: [
      r`$f' = e^{2x}$, $f = \tfrac12 e^{2x}$, $g = 6x$, $g' = 6$:`,
      r`$$\int 6x e^{2x}\,dx = 3x e^{2x} - \int 3e^{2x}\,dx = 3x e^{2x} - \tfrac32 e^{2x} + C.$$`,
      r`*Kontroll:* $\frac{d}{dx}\left(3xe^{2x} - \tfrac32 e^{2x}\right) = 3e^{2x} + 6xe^{2x} - 3e^{2x} = 6xe^{2x}$ ✓`,
    ],
    answer: r`$3xe^{2x} - \tfrac32 e^{2x} + C = \tfrac32 e^{2x}(2x-1) + C$`,
    checks: ["antider('3*x*exp(2*x) - Rational(3,2)*exp(2*x)', '6*x*exp(2*x)')"],
  },
  {
    id: 'd2Aht24-2', source: 'dugga2A-ht24', number: '2', slot: 3, areas: ['int-variabelbyte', 'int-trig'], points: 2,
    statement: r`Använd variabelbyte för att bestämma $\displaystyle\int \frac{\cos x}{\sin^7 x}\,dx$.`,
    hint: r`$\cos x$ är derivatan av $\sin x$.`,
    method: r`Inre derivata syns → **variabelbyte** $u = \sin x$.`,
    steps: [
      r`$u = \sin x$, $du = \cos x\,dx$:`,
      r`$$\int \frac{du}{u^7} = \int u^{-7}\,du = \frac{u^{-6}}{-6} + C = -\frac{1}{6\sin^6 x} + C.$$`,
    ],
    answer: r`$-\dfrac{1}{6\sin^6 x} + C$`,
    checks: ["antider('-1/(6*sin(x)**6)', 'cos(x)/sin(x)**7')"],
  },
  {
    id: 'd2Aht24-3', source: 'dugga2A-ht24', number: '3', slot: 3, areas: ['int-partialbrak'], points: 2,
    statement: r`Bestäm $\displaystyle\int \frac{5x+12}{x^2+6x+9}\,dx$.`,
    hint: r`$x^2+6x+9 = (x+3)^2$ – en dubbelrot.`,
    method: r`**Partialbråk** med dubbelrot: ansats $\frac{A}{x+3} + \frac{B}{(x+3)^2}$.`,
    steps: [
      r`$5x + 12 = A(x+3) + B$. $x$: $A = 5$; konstant: $3A + B = 12$ ⇒ $B = -3$.`,
      r`$$\int\left(\frac{5}{x+3} - \frac{3}{(x+3)^2}\right)dx = 5\ln|x+3| + \frac{3}{x+3} + C.$$`,
      r`(Observera: $\int (x+3)^{-2}dx = -(x+3)^{-1}$, så $-3\cdot(-(x+3)^{-1}) = +\frac{3}{x+3}$.)`,
    ],
    answer: r`$5\ln|x+3| + \dfrac{3}{x+3} + C$`,
    checks: ["antider('5*log(x+3) + 3/(x+3)', '(5*x+12)/(x**2+6*x+9)')"],
  },
  // ---------------- Dugga 2B HT2024 ----------------
  {
    id: 'd2Bht24-1', source: 'dugga2B-ht24', number: '1', slot: 3, areas: ['int-partiell'], points: 2,
    statement: r`Använd partialintegration för att bestämma $\displaystyle\int 6x e^{3x}\,dx$.`,
    hint: r`Derivera $6x$.`,
    method: r`**Partialintegration** med $f = \tfrac13 e^{3x}$, $g = 6x$.`,
    steps: [
      r`$$\int 6xe^{3x}\,dx = 2xe^{3x} - \int 2e^{3x}\,dx = 2xe^{3x} - \tfrac23 e^{3x} + C.$$`,
      r`*Kontroll:* $2e^{3x} + 6xe^{3x} - 2e^{3x} = 6xe^{3x}$ ✓`,
    ],
    answer: r`$2xe^{3x} - \tfrac23 e^{3x} + C$`,
    checks: ["antider('2*x*exp(3*x) - Rational(2,3)*exp(3*x)', '6*x*exp(3*x)')"],
  },
  {
    id: 'd2Bht24-2', source: 'dugga2B-ht24', number: '2', slot: 3, areas: ['int-variabelbyte'], points: 2,
    statement: r`Använd variabelbyte för att beräkna $\displaystyle\int_{2/\pi}^{4/\pi} \frac{1}{x^2}\sin\frac1x\,dx$.`,
    hint: r`$\frac{d}{dx}\frac1x = -\frac1{x^2}$. Glöm inte att byta gränserna.`,
    method: r`Inre derivata syns → **variabelbyte** $u = 1/x$ i en bestämd integral (byt gränser).`,
    steps: [
      r`$u = \frac1x$, $du = -\frac{1}{x^2}dx$. Gränser: $x = \frac2\pi \Rightarrow u = \frac\pi2$; $x = \frac4\pi \Rightarrow u = \frac\pi4$.`,
      r`$$\int_{2/\pi}^{4/\pi}\frac{1}{x^2}\sin\frac1x\,dx = \int_{\pi/2}^{\pi/4} (-\sin u)\,du = \int_{\pi/4}^{\pi/2}\sin u\,du.$$`,
      r`$$= \Big[-\cos u\Big]_{\pi/4}^{\pi/2} = -0 + \cos\frac\pi4 = \frac{\sqrt2}{2}.$$`,
    ],
    answer: r`$\dfrac{\sqrt2}{2}$`,
    checks: ["defint('sin(1/x)/x**2', '2/pi', '4/pi', 'sqrt(2)/2')"],
  },
  {
    id: 'd2Bht24-3', source: 'dugga2B-ht24', number: '3', slot: 3, areas: ['int-partialbrak'], points: 2,
    statement: r`Bestäm $\displaystyle\int \frac{3x-10}{x^2-8x+16}\,dx$.`,
    hint: r`$x^2 - 8x + 16 = (x-4)^2$.`,
    method: r`**Partialbråk** med dubbelrot: $\frac{A}{x-4} + \frac{B}{(x-4)^2}$.`,
    steps: [
      r`$3x - 10 = A(x-4) + B$ ⇒ $A = 3$, $-4A + B = -10$ ⇒ $B = 2$.`,
      r`$$\int\left(\frac{3}{x-4} + \frac{2}{(x-4)^2}\right)dx = 3\ln|x-4| - \frac{2}{x-4} + C.$$`,
    ],
    answer: r`$3\ln|x-4| - \dfrac{2}{x-4} + C$`,
    checks: ["antider('3*log(x-4) - 2/(x-4)', '(3*x-10)/(x**2-8*x+16)')"],
  },
  // ---------------- Dugga 2A HT2025 ----------------
  {
    id: 'd2Aht25-1', source: 'dugga2A-ht25', number: '1', slot: 3, areas: ['int-partiell'], points: 2,
    statement: r`Använd partialintegration för att bestämma $\displaystyle\int \frac{1}{\sqrt x}\ln x\,dx$.`,
    hint: r`$\ln x$ har ingen enkel primitiv – men en enkel derivata. Derivera $\ln x$!`,
    method: r`Produkt med $\ln x$ → **partialintegration** där $\ln x$ deriveras och $x^{-1/2}$ integreras.`,
    steps: [
      r`$f' = x^{-1/2}$, $f = 2\sqrt x$, $g = \ln x$, $g' = \frac1x$:`,
      r`$$\int x^{-1/2}\ln x\,dx = 2\sqrt x\ln x - \int 2\sqrt x\cdot\frac1x\,dx = 2\sqrt x\ln x - \int 2x^{-1/2}\,dx.$$`,
      r`$$= 2\sqrt x\ln x - 4\sqrt x + C.$$`,
      r`*Kontroll:* $\frac{1}{\sqrt x}\ln x + \frac{2\sqrt x}{x} - \frac{2}{\sqrt x} = \frac{\ln x}{\sqrt x}$ ✓`,
    ],
    answer: r`$2\sqrt x\ln x - 4\sqrt x + C$`,
    checks: ["antider('2*sqrt(x)*log(x) - 4*sqrt(x)', 'log(x)/sqrt(x)')"],
  },
  {
    id: 'd2Aht25-2', source: 'dugga2A-ht25', number: '2', slot: 3, areas: ['int-variabelbyte'], points: 2,
    statement: r`Använd variabelbyte för att beräkna $\displaystyle\int_0^{\pi/2} \frac{\cos x}{(\sin x + 2)^2}\,dx$.`,
    hint: r`$u = \sin x + 2$. Nya gränser?`,
    method: r`**Variabelbyte** i bestämd integral, byt gränser.`,
    steps: [
      r`$u = \sin x + 2$, $du = \cos x\,dx$. $x = 0 \Rightarrow u = 2$; $x = \frac\pi2 \Rightarrow u = 3$.`,
      r`$$\int_2^3 \frac{du}{u^2} = \Big[-\frac1u\Big]_2^3 = -\frac13 + \frac12 = \frac16.$$`,
    ],
    answer: r`$\dfrac16$`,
    checks: ["defint('cos(x)/(sin(x)+2)**2', 0, 'pi/2', '1/6')"],
  },
  {
    id: 'd2Aht25-3', source: 'dugga2A-ht25', number: '3', slot: 3, areas: ['int-partialbrak'], points: 2,
    statement: r`Bestäm $\displaystyle\int \frac{x^2+5}{x^2-25}\,dx$.`,
    hint: r`Gradtal täljare = gradtal nämnare. Vad måste du göra först?`,
    method: r`Gradtal täljare ≥ nämnare → **polynomdivision** först, sedan **partialbråk** på resten.`,
    steps: [
      r`Polynomdivision: $\frac{x^2+5}{x^2-25} = 1 + \frac{30}{x^2-25}$.`,
      r`$\frac{30}{(x-5)(x+5)} = \frac{A}{x-5} + \frac{B}{x+5}$. Handpåläggning: $A = \frac{30}{10} = 3$, $B = \frac{30}{-10} = -3$.`,
      r`$$\int\left(1 + \frac{3}{x-5} - \frac{3}{x+5}\right)dx = x + 3\ln|x-5| - 3\ln|x+5| + C.$$`,
    ],
    answer: r`$x + 3\ln|x-5| - 3\ln|x+5| + C$`,
    checks: ["antider('x + 3*log(x-5) - 3*log(x+5)', '(x**2+5)/(x**2-25)')"],
  },
]
