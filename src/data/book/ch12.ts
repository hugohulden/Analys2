import type { BookTask } from './types'

const r = String.raw
/** sympy-kontroll: F' = f */
const A = (F: string, f: string) => `antider('${F}', '${f}')`

/** Kapitel 12 – Primitiva funktioner. Svar ur bokens facit, tips ur "Tips Kapitel 12". */
export const CH12: BookTask[] = [
  {
    id: '12.1', answerSource: 'bok', intro: r`Bestäm alla primitiva funktioner till`,
    parts: {
      a: { text: r`$x^4$`, answer: r`$\frac15x^5+C$`, checks: [A('x**5/5', 'x**4')] },
      b: { text: r`$\frac1x$`, answer: r`$\ln|x|+C$` },
      c: { text: r`$e^x$`, answer: r`$e^x+C$` },
      d: { text: r`$\cos x$`, answer: r`$\sin x+C$` },
      e: { text: r`$\sin x$`, answer: r`$-\cos x+C$` },
      f: { text: r`$\frac{1}{\cos^2x}$`, answer: r`$\tan x+C$`, checks: [A('tan(x)', '1/cos(x)**2')] },
      g: { text: r`$\frac{1}{\sin^2x}$`, answer: r`$-\cot x+C$`, checks: [A('-cot(x)', '1/sin(x)**2')] },
      h: { text: r`$\frac{1}{1+x^2}$`, answer: r`$\arctan x+C$` },
      i: { text: r`$\frac{1}{\sqrt{1-x^2}}$`, answer: r`$\arcsin x+C$` },
      j: { text: r`$\frac{1}{\sqrt{x^2+\alpha}}$`, answer: r`$\ln\left|x+\sqrt{x^2+\alpha}\right|+C$`, checks: [A('log(x+sqrt(x**2+3))', '1/sqrt(x**2+3)')] },
    },
  },
  {
    id: '12.2', answerSource: 'bok', mark: 'T', intro: r`Bestäm en primitiv funktion till`,
    tip: r`Skriv först om funktionen på potensform, t.ex. $\frac{1}{x^3} = x^{-3}$.`,
    parts: {
      a: { text: r`$x^3$`, answer: r`$\frac{x^4}{4}$` },
      b: { text: r`$\frac{1}{x^3}$`, answer: r`$-\frac{1}{2x^2}$`, checks: [A('-1/(2*x**2)', 'x**-3')] },
      c: { text: r`$\sqrt x$`, answer: r`$\frac23x\sqrt x$`, checks: [A('2*x*sqrt(x)/3', 'sqrt(x)')] },
      d: { text: r`$x\sqrt x$`, answer: r`$\frac25x^2\sqrt x$`, checks: [A('2*x**2*sqrt(x)/5', 'x*sqrt(x)')] },
      e: { text: r`$\frac{1}{\sqrt x}$`, answer: r`$2\sqrt x$` },
      f: { text: r`$\frac{1}{x\sqrt x}$`, answer: r`$-\frac{2}{\sqrt x}$`, checks: [A('-2/sqrt(x)', '1/(x*sqrt(x))')] },
    },
  },
  {
    id: '12.3', answerSource: 'bok', mark: 'T', intro: r`Bestäm en primitiv funktion till`,
    tip: r`Alla funktionerna är sammansättningar av en yttre funktion, $1/z$ respektive $1/z^2$, och en inre funktion av formen $ax+b$. Den inre derivatan är således konstant $= a$. Då får man svaret genom att ta primitiv till den yttre funktionen, och sedan korrigera för den inre derivatan med en konstant faktor.`,
    parts: {
      a: { text: r`$\frac1x$`, answer: r`$\ln|x|$` },
      b: { text: r`$\frac{1}{x-2}$`, answer: r`$\ln|x-2|$` },
      c: { text: r`$\frac{1}{1-x}$`, answer: r`$-\ln|1-x|$`, checks: [A('-log(1-x)', '1/(1-x)')] },
      d: { text: r`$\frac{2}{x+1}$`, answer: r`$2\ln|x+1|$` },
      e: { text: r`$\frac{1}{2x+1}$`, answer: r`$\frac12\ln|2x+1|$`, checks: [A('log(2*x+1)/2', '1/(2*x+1)')] },
      f: { text: r`$\frac{2}{1-3x}$`, answer: r`$-\frac23\ln|1-3x|$`, checks: [A('-2*log(1-3*x)/3', '2/(1-3*x)')] },
      g: { text: r`$\frac{1}{x^2}$`, answer: r`$-\frac1x$` },
      h: { text: r`$\frac{1}{(x-2)^2}$`, answer: r`$-\frac{1}{x-2}$`, checks: [A('-1/(x-2)', '1/(x-2)**2')] },
      i: { text: r`$\frac{1}{(1-x)^2}$`, answer: r`$\frac{1}{1-x}$`, checks: [A('1/(1-x)', '1/(1-x)**2')] },
      j: { text: r`$\frac{2}{(x+1)^2}$`, answer: r`$-\frac{2}{x+1}$`, checks: [A('-2/(x+1)', '2/(x+1)**2')] },
      k: { text: r`$\frac{1}{(2x+1)^2}$`, answer: r`$-\frac{1}{2(2x+1)}$`, checks: [A('-1/(2*(2*x+1))', '1/(2*x+1)**2')] },
      l: { text: r`$\frac{2}{(1-3x)^2}$`, answer: r`$\frac{2}{3(1-3x)}$`, checks: [A('2/(3*(1-3*x))', '2/(1-3*x)**2')] },
    },
  },
  {
    id: '12.4', answerSource: 'bok', intro: r`Bestäm alla primitiva funktioner till`,
    parts: {
      a: { text: r`$x^3+x-2$`, answer: r`$\frac14x^4+\frac12x^2-2x+C$`, checks: [A('x**4/4+x**2/2-2*x', 'x**3+x-2')] },
      b: { text: r`$\frac1x-\frac{1}{x^2}+\frac{1}{x^3}$`, answer: r`$\ln|x|+\frac1x-\frac{1}{2x^2}+C$`, checks: [A('log(x)+1/x-1/(2*x**2)', '1/x-1/x**2+1/x**3')] },
      c: { text: r`$\sqrt x+\frac{1}{\sqrt x}$`, answer: r`$\frac23x\sqrt x+2\sqrt x+C$`, checks: [A('2*x*sqrt(x)/3+2*sqrt(x)', 'sqrt(x)+1/sqrt(x)')] },
      d: { text: r`$\frac{3+5x^{2/3}}{x^3}$`, answer: r`$-\frac{3}{2x^2}-\frac{15}{4}x^{-4/3}+C$`, checks: [A('-3/(2*x**2)-Rational(15,4)*x**Rational(-4,3)', '(3+5*x**Rational(2,3))/x**3')] },
      e: { text: r`$\frac{1}{(1+x)^2}$`, answer: r`$\frac{-1}{1+x}+C$` },
      f: { text: r`$-\frac{1}{1+x^2}$`, answer: r`$\operatorname{arccot}x+C$ eller $-\arctan x+C$` },
    },
  },
  {
    id: '12.5', answerSource: 'bok', mark: 'T', intro: r`Bestäm en primitiv funktion till`, tip: r`Se tipset till 12.3: inre derivatan är en konstant – korrigera med en konstant faktor.`,
    parts: {
      a: { text: r`$\sin2x$`, answer: r`$-\frac12\cos2x$` },
      b: { text: r`$\sin\frac x3$`, answer: r`$-3\cos\frac x3$`, checks: [A('-3*cos(x/3)', 'sin(x/3)')] },
      c: { text: r`$\sin\left(2x+\frac\pi3\right)$`, answer: r`$-\frac12\cos\left(2x+\frac\pi3\right)$`, checks: [A('-cos(2*x+pi/3)/2', 'sin(2*x+pi/3)')] },
      d: { text: r`$\cos(1-x)$`, answer: r`$-\sin(1-x)$`, checks: [A('-sin(1-x)', 'cos(1-x)')] },
      e: { text: r`$\cos\frac{2x}{3}$`, answer: r`$\frac32\sin\frac{2x}{3}$`, checks: [A('3*sin(2*x/3)/2', 'cos(2*x/3)')] },
      f: { text: r`$3e^{2x}$`, answer: r`$\frac32e^{2x}$` },
      g: { text: r`$e^{-x}$`, answer: r`$-e^{-x}$` },
      h: { text: r`$e^{(2x+1)}$`, answer: r`$\frac12e^{(2x+1)}$` },
    },
  },
  {
    id: '12.6', answerSource: 'bok', intro: r`Är $\dfrac{e^{x^2}}{2x}$ en primitiv funktion till $e^{x^2}$? Motivera ditt svar.`,
    answer: r`Nej. Deriverar vi med kvotregeln: $D\dfrac{e^{x^2}}{2x} = \dfrac{4x^2e^{x^2}-2e^{x^2}}{4x^2} = e^{x^2}\left(1-\dfrac{1}{2x^2}\right)$.`,
    checks: ["eq('diff(exp(x**2)/(2*x), x) - exp(x**2)*(1-1/(2*x**2))', 0)"],
  },
  {
    id: '12.7', answerSource: 'bok', mark: 'TL', intro: r`a) Hur kan man, utan några räkningar, direkt bestämma $\int e^{x^2}\cdot2x\,dx$? b) Bestäm $\int e^{x^2}\cdot2x\,dx$ genom att först utföra variabelbytet $t=x^2$.`,
    answer: r`a) och b) $e^{x^2}+C$`, tip: r`a) Tänk på kedjeregeln!`,
  },
  {
    id: '12.8', answerSource: 'bok', mark: 'T', intro: r`Bestäm en primitiv funktion till`,
    tip: r`Alla funktionerna är av typ $f(g(x))\cdot g'(x)$ (eventuellt justerat med en konstant faktor), så därför är ett svar $F(g(x))$, där $F$ är en primitiv funktion till $f$. Enklast är att hela tiden använda huvudräkning, men ett lämpligt variabelbyte fungerar också.`,
    parts: {
      a: { text: r`$e^{x^2}\cdot x$`, answer: r`$\frac12e^{x^2}$`, checks: [A('exp(x**2)/2', 'x*exp(x**2)')] },
      b: { text: r`$\frac x3e^{x^2}$`, answer: r`$\frac16e^{x^2}$`, checks: [A('exp(x**2)/6', 'x*exp(x**2)/3')] },
      c: { text: r`$\cos x^2\cdot2x$`, answer: r`$\sin x^2$` },
      d: { text: r`$x\cos x^2$`, answer: r`$\frac12\sin x^2$`, checks: [A('sin(x**2)/2', 'x*cos(x**2)')] },
      e: { text: r`$x^2\cos x^3$`, answer: r`$\frac13\sin x^3$` },
      f: { text: r`$x^2\sin x^3$`, answer: r`$-\frac13\cos x^3$`, checks: [A('-cos(x**3)/3', 'x**2*sin(x**3)')] },
      g: { text: r`$\frac{1}{x^2}\cos\left(\frac1x\right)$`, answer: r`$-\sin\frac1x$`, checks: [A('-sin(1/x)', 'cos(1/x)/x**2')] },
      h: { text: r`$2x(x^2+5)^8$`, answer: r`$\frac19(x^2+5)^9$`, checks: [A('(x**2+5)**9/9', '2*x*(x**2+5)**8')] },
    },
  },
  {
    id: '12.9', answerSource: 'bok', mark: 'L', intro: r`Bestäm en primitiv funktion till`,
    parts: {
      a: { text: r`$\sin^2x\cos x$`, answer: r`$\frac13\sin^3x$` },
      b: { text: r`$\cos x\sin^3x$`, answer: r`$\frac14\sin^4x$` },
      c: { text: r`$\sin x\cos x$`, answer: r`$\frac12\sin^2x$` },
      d: { text: r`$\cos x\cdot\frac{1}{\sin^2x}$`, answer: r`$-\frac{1}{\sin x}$`, checks: [A('-1/sin(x)', 'cos(x)/sin(x)**2')] },
      e: { text: r`$\cos x\cdot\frac{1}{\sin x}$`, answer: r`$\ln|\sin x|$` },
      f: { text: r`$\frac{\cos x}{\sin x}$`, answer: r`$\ln|\sin x|$` },
      g: { text: r`$\frac{\sin x}{\cos x}$`, answer: r`$-\ln|\cos x|$` },
      h: { text: r`$\tan x$`, answer: r`$-\ln|\cos x|$`, checks: [A('-log(cos(x))', 'tan(x)')] },
    },
  },
  {
    id: '12.10', answerSource: 'bok', mark: 'T', intro: r`Bestäm en primitiv funktion till`,
    tip: r`Alla funktionerna utom den sista är av typ $\frac{1}{f(x)}\cdot f'(x)$. En primitiv blir därför $\ln|f(x)|$ (eventuellt justerat med en konstant faktor). Variabelbyte fungerar också bra i dessa fall.`,
    parts: {
      a: { text: r`$\frac{1}{x^2+1}\cdot2x$`, answer: r`$\ln(x^2+1)$` },
      b: { text: r`$\frac{2x}{x^2+1}$`, answer: r`$\ln(x^2+1)$` },
      c: { text: r`$\frac{x}{x^2+1}$`, answer: r`$\frac12\ln(x^2+1)$` },
      d: { text: r`$\frac{3x^2}{x^3+1}$`, answer: r`$\ln|x^3+1|$` },
      e: { text: r`$\frac{x^2}{x^3+1}$`, answer: r`$\frac13\ln|x^3+1|$`, checks: [A('log(x**3+1)/3', 'x**2/(x**3+1)')] },
      f: { text: r`$\frac{e^x}{e^x+1}$`, answer: r`$\ln(e^x+1)$` },
      g: { text: r`$\frac{e^x-e^{-x}}{e^x+e^{-x}}$`, answer: r`$\ln(e^x+e^{-x})$`, checks: [A('log(exp(x)+exp(-x))', '(exp(x)-exp(-x))/(exp(x)+exp(-x))')] },
      h: { text: r`$\frac{e^x+1}{e^x}$`, answer: r`$x-e^{-x}$`, checks: [A('x-exp(-x)', '(exp(x)+1)/exp(x)')] },
    },
  },
  {
    id: '12.11', answerSource: 'bok', mark: 'T', intro: r`Bestäm en primitiv funktion till`,
    tip: r`Alla funktionerna är av typ $f(\ln x)\cdot\frac1x$. En primitiv blir därför $F(\ln x)$, där $F$ är en primitiv till $f$. Variabelbyte fungerar också bra.`,
    parts: {
      a: { text: r`$\frac1x(\ln x)^2$`, answer: r`$\frac13(\ln x)^3$` },
      b: { text: r`$\frac1x(\ln x)$`, answer: r`$\frac12(\ln x)^2$` },
      c: { text: r`$\frac{(\ln x)^2}{x}$`, answer: r`$\frac13(\ln x)^3$` },
      d: { text: r`$\frac{\ln x}{x}$`, answer: r`$\frac12(\ln x)^2$` },
      e: { text: r`$\frac1x\sin(\ln x)$`, answer: r`$-\cos(\ln x)$`, checks: [A('-cos(log(x))', 'sin(log(x))/x')] },
      f: { text: r`$\frac1x\cdot\frac{1}{\ln x}$`, answer: r`$\ln|\ln x|$`, checks: [A('log(log(x))', '1/(x*log(x))')] },
      g: { text: r`$\frac{1}{x\ln x}$`, answer: r`$\ln|\ln x|$` },
      h: { text: r`$\frac{\sin(\ln x)}{x}$`, answer: r`$-\cos(\ln x)$` },
    },
  },
  {
    id: '12.12', answerSource: 'bok', intro: r`a) Bestäm den funktion $f$ som uppfyller $f'(x)=x\sin x^2$, $f(0)=0$. b) Bestäm den funktion $f$ som uppfyller $f'(x)=\dfrac{1}{(1+x^2)\arctan x}$, $\lim_{x\to\infty}f(x)=0$.`,
    parts: {
      a: { text: r`$f'(x)=x\sin x^2$, $f(0)=0$`, answer: r`$f(x)=\frac12(1-\cos x^2)$`, checks: [A('(1-cos(x**2))/2', 'x*sin(x**2)')] },
      b: { text: r`$f'(x)=\frac{1}{(1+x^2)\arctan x}$, $\lim_{x\to\infty}f(x)=0$`, answer: r`$f(x)=\ln|\arctan x|-\ln\frac\pi2$`, checks: [A('log(atan(x))-log(pi/2)', '1/((1+x**2)*atan(x))'), "eq('limit(log(atan(x))-log(pi/2), x, oo)', 0)"] },
    },
  },
  { id: '12.13', answerSource: 'bok', mark: 'L', intro: r`Bestäm $\int e^x(e^x+5)^8\,dx$ genom att först utföra variabelbytet $t=e^x$.`, answer: r`$\frac19(e^x+5)^9+C$`, checks: [A('(exp(x)+5)**9/9', 'exp(x)*(exp(x)+5)**8')] },
  {
    id: '12.14', answerSource: 'bok', intro: r`Bestäm samtliga primitiva funktioner till`,
    parts: {
      a: { text: r`$\frac{1}{x\ln x}$ genom att först utföra variabelbytet $t=\ln x$.`, answer: r`$\ln|\ln x|+C$` },
      b: { text: r`$\sin x\cos^{-4/3}x$ genom att först utföra variabelbytet $t=\cos x$.`, answer: r`$3\cos^{-1/3}x+C$`, checks: [A('3*cos(x)**Rational(-1,3)', 'sin(x)*cos(x)**Rational(-4,3)')] },
    },
  },
  {
    id: '12.15', answerSource: 'bok', mark: 'TL', intro: r`Bestäm med hjälp av ett lämpligt variabelbyte samtliga primitiver till`,
    tip: r`Alla funktionerna är av typ $f(g(x))\cdot g'(x)$ så när som på en konstant faktor i vissa fall. Det går därför bra att göra variabelbytet $t=g(x)$. Sätt alltså i a) $t=x^2$, b) $t=\sqrt x$, c) $t=x^2$ eller $t=7x^2+5$, d) $t=x^2$ eller $t=x^2+5$.`,
    parts: {
      a: { text: r`$x(1+x^2)^5$`, answer: r`$\frac{1}{12}(1+x^2)^6+C$`, checks: [A('(1+x**2)**6/12', 'x*(1+x**2)**5')] },
      b: { text: r`$\frac{1}{\sqrt x}\sin\sqrt x$`, answer: r`$-2\cos\sqrt x+C$`, checks: [A('-2*cos(sqrt(x))', 'sin(sqrt(x))/sqrt(x)')] },
      c: { text: r`$x\sqrt{7x^2+5}$`, answer: r`$\frac{1}{21}(7x^2+5)^{3/2}+C$`, checks: [A('(7*x**2+5)**Rational(3,2)/21', 'x*sqrt(7*x**2+5)')] },
      d: { text: r`$\frac{x}{\sqrt{x^2+5}}$`, answer: r`$\sqrt{x^2+5}+C$` },
      e: { text: r`Går det att lösa ovanstående deluppgifter "direkt" utan variabelbyte?`, answer: r`Ja, eftersom alla funktionerna är av typen $f(g(x))g'(x)$ (så när som på en konstant faktor) så går det att skriva upp de primitiva funktionerna direkt.` },
    },
  },
  {
    id: '12.16', answerSource: 'bok', mark: 'TL', intro: r`Bestäm med hjälp av ett lämpligt variabelbyte samtliga primitiver till`,
    tip: r`Sätt i a) $t=e^x \Rightarrow x=\ln t$, b) $t=\sqrt{x+1}\Rightarrow x=t^2-1$, c) $t=\sqrt{2x+5}\Rightarrow x=\frac12(t^2-5)$, d) $t=x^{1/3}\Rightarrow x=t^3$.`,
    parts: {
      a: { text: r`$\frac{1}{e^x+e^{-x}}$`, answer: r`$\arctan e^x+C$`, checks: [A('atan(exp(x))', '1/(exp(x)+exp(-x))')] },
      b: { text: r`$x\sqrt{x+1}$`, answer: r`$\frac25(x+1)^{5/2}-\frac23(x+1)^{3/2}+C=\frac{1}{15}(x+1)^{3/2}(6x-4)+C$`, checks: [A('(x+1)**Rational(3,2)*(6*x-4)/15', 'x*sqrt(x+1)')] },
      c: { text: r`$\frac{x}{\sqrt{2x+5}}$`, answer: r`$\frac13(x-5)\sqrt{2x+5}+C$`, checks: [A('(x-5)*sqrt(2*x+5)/3', 'x/sqrt(2*x+5)')] },
      d: { text: r`$\frac{1}{x+x^{1/3}}$`, answer: r`$\frac32\ln(1+x^{2/3})+C$`, checks: [A('3*log(1+x**Rational(2,3))/2', '1/(x+x**Rational(1,3))')] },
    },
  },
  {
    id: '12.17', answerSource: 'bok', mark: 'TL', intro: r`Bestäm med hjälp av partialintegration samtliga primitiver till`,
    tip: r`d) Utnyttja att $\arctan x = 1\cdot\arctan x$. g) Partialintegrera två gånger.`,
    parts: {
      a: { text: r`$x^2\ln x$`, answer: r`$\frac13x^3\ln x-\frac19x^3+C$`, checks: [A('x**3*log(x)/3-x**3/9', 'x**2*log(x)')] },
      b: { text: r`$xe^{-x}$`, answer: r`$-(x+1)e^{-x}+C$`, checks: [A('-(x+1)*exp(-x)', 'x*exp(-x)')] },
      c: { text: r`$\sqrt x\ln x$`, answer: r`$\frac23x^{3/2}\ln x-\frac49x^{3/2}+C$`, checks: [A('2*x**Rational(3,2)*log(x)/3-4*x**Rational(3,2)/9', 'sqrt(x)*log(x)')] },
      d: { text: r`$\arctan x$`, answer: r`$x\arctan x-\frac12\ln(1+x^2)+C$`, checks: [A('x*atan(x)-log(1+x**2)/2', 'atan(x)')] },
      e: { text: r`$x\arctan x$`, answer: r`$\frac12(x^2+1)\arctan x-\frac12x+C$`, checks: [A('(x**2+1)*atan(x)/2-x/2', 'x*atan(x)')] },
      f: { text: r`$\ln(x+1)$`, answer: r`$(x+1)\ln(x+1)-x+C$`, checks: [A('(x+1)*log(x+1)-x', 'log(x+1)')] },
      g: { text: r`$\ln^2x$`, answer: r`$x(\ln x)^2-2x\ln x+2x+C$`, checks: [A('x*log(x)**2-2*x*log(x)+2*x', 'log(x)**2')] },
      h: { text: r`$x^2\sin x$`, answer: r`$(2-x^2)\cos x+2x\sin x+C$`, checks: [A('(2-x**2)*cos(x)+2*x*sin(x)', 'x**2*sin(x)')] },
    },
  },
  {
    id: '12.18', answerSource: 'bok', mark: 'TL', intro: r`Bestäm med hjälp av partialintegration samtliga primitiver till`, tip: r`Partialintegrera två gånger.`,
    parts: {
      a: { text: r`$e^x\sin x$`, answer: r`$\frac12e^x(\sin x-\cos x)+C$`, checks: [A('exp(x)*(sin(x)-cos(x))/2', 'exp(x)*sin(x)')] },
      b: { text: r`$e^{2x}\sin3x$`, answer: r`$\frac{1}{13}e^{2x}(2\sin3x-3\cos3x)+C$`, checks: [A('exp(2*x)*(2*sin(3*x)-3*cos(3*x))/13', 'exp(2*x)*sin(3*x)')] },
    },
  },
  {
    id: '12.19', answerSource: 'bok', intro: r`Bestäm alla primitiva funktioner till 12.16 b) och c) med hjälp av partialintegration.`,
    answer: r`$\frac23x(x+1)^{3/2}-\frac{4}{15}(x+1)^{5/2}+C=\frac{1}{15}(x+1)^{3/2}(6x-4)+C$, respektive $x\sqrt{2x+5}-\frac13(2x+5)^{3/2}+C=\frac13(x-5)\sqrt{2x+5}+C$`,
    checks: [A('2*x*(x+1)**Rational(3,2)/3-4*(x+1)**Rational(5,2)/15', 'x*sqrt(x+1)'), A('x*sqrt(2*x+5)-(2*x+5)**Rational(3,2)/3', 'x/sqrt(2*x+5)')],
  },
  { id: '12.20', answerSource: 'bok', intro: r`Bestäm $\int e^{\sqrt x}\,dx$ genom att först utföra variabelbytet $t=\sqrt x$.`, answer: r`$2\left(\sqrt xe^{\sqrt x}-e^{\sqrt x}\right)+C$`, checks: [A('2*(sqrt(x)*exp(sqrt(x))-exp(sqrt(x)))', 'exp(sqrt(x))')] },
  {
    id: '12.21', answerSource: 'bok', mark: 'T', intro: r`Bestäm samtliga primitiver till`, tip: r`a) Sätt $t=x^2$. b) Sätt $t=1+e^x$.`,
    parts: {
      a: { text: r`$x^3\sin x^2$`, answer: r`$\frac12\left(\sin(x^2)-x^2\cos(x^2)\right)+C$`, checks: [A('(sin(x**2)-x**2*cos(x**2))/2', 'x**3*sin(x**2)')] },
      b: { text: r`$e^x\ln(1+e^x)$`, answer: r`$(1+e^x)\ln(1+e^x)-e^x+C$`, checks: [A('(1+exp(x))*log(1+exp(x))-exp(x)', 'exp(x)*log(1+exp(x))')] },
    },
  },
  {
    id: '12.22', answerSource: 'bok', mark: 'T', intro: r`Bestäm samtliga primitiver till`, tip: r`Utför polynomdivisionen.`,
    parts: {
      a: { text: r`$\frac{x^2+4}{x-1}$`, answer: r`$\frac12x^2+x+5\ln|x-1|+C$`, checks: [A('x**2/2+x+5*log(x-1)', '(x**2+4)/(x-1)')] },
      b: { text: r`$\frac{x^3+5x^2+2x-1}{x+3}$`, answer: r`$\frac13x^3+x^2-4x+11\ln|x+3|+C$`, checks: [A('x**3/3+x**2-4*x+11*log(x+3)', '(x**3+5*x**2+2*x-1)/(x+3)')] },
    },
  },
  {
    id: '12.23', answerSource: 'bok', mark: 'T', intro: r`Bestäm samtliga primitiver till`,
    tip: r`Här är täljarens grad mindre än nämnarens. Nästa steg är då att dela upp nämnaren i faktorer så långt möjligt, och sedan göra partialbråksuppdelning.`,
    parts: {
      a: { text: r`$\frac{1}{x^2-4}$`, answer: r`$\frac14\ln\left|\frac{x-2}{x+2}\right|+C$`, checks: [A('(log(x-2)-log(x+2))/4', '1/(x**2-4)')] },
      b: { text: r`$\frac{x+13}{x^2-4x-5}$`, answer: r`$3\ln|x-5|-2\ln|x+1|+C$`, checks: [A('3*log(x-5)-2*log(x+1)', '(x+13)/(x**2-4*x-5)')] },
      c: { text: r`$\frac{5x^2-7x+13}{x^3-6x^2+11x-6}$`, answer: r`$\frac{11}{2}\ln|x-1|-19\ln|x-2|+\frac{37}{2}\ln|x-3|+C$`, checks: [A('11*log(x-1)/2-19*log(x-2)+37*log(x-3)/2', '(5*x**2-7*x+13)/(x**3-6*x**2+11*x-6)')] },
    },
  },
  {
    id: '12.24', answerSource: 'bok', intro: r`Bestäm samtliga primitiver till`,
    parts: {
      a: { text: r`$\frac{1}{x(x-3)^2}$`, answer: r`$\frac19\left(\ln\left|\frac{x}{x-3}\right|-\frac{3}{x-3}\right)+C$`, checks: [A('(log(x)-log(x-3)-3/(x-3))/9', '1/(x*(x-3)**2)')] },
      b: { text: r`$\frac{3x+11}{(x+2)^2}$`, answer: r`$3\ln|x+2|-\frac{5}{x+2}+C$`, checks: [A('3*log(x+2)-5/(x+2)', '(3*x+11)/(x+2)**2')] },
      c: { text: r`$\frac{1}{x^2(x-1)^3}$`, answer: r`$\frac1x-3\ln|x|-\frac12\cdot\frac{1}{(x-1)^2}+\frac{2}{x-1}+3\ln|x-1|+C$`, checks: [A('1/x-3*log(x)-1/(2*(x-1)**2)+2/(x-1)+3*log(x-1)', '1/(x**2*(x-1)**3)')] },
      d: { text: r`$\frac{1}{x^3+2x^2+x}$`, answer: r`$\ln|x|-\ln|x+1|+\frac{1}{x+1}+C$`, checks: [A('log(x)-log(x+1)+1/(x+1)', '1/(x**3+2*x**2+x)')] },
    },
  },
  {
    id: '12.25', answerSource: 'bok', intro: r`Bestäm samtliga primitiver till`,
    parts: {
      a: { text: r`$\frac{1}{x^2+1}$`, answer: r`$\arctan x+C$` },
      b: { text: r`$\frac{1}{(2x)^2+1}$`, answer: r`$\frac12\arctan(2x)+C$`, checks: [A('atan(2*x)/2', '1/(4*x**2+1)')] },
      c: { text: r`$\frac{1}{\left(\frac x3\right)^2+1}$`, answer: r`$3\arctan\frac x3+C$`, checks: [A('3*atan(x/3)', '1/((x/3)**2+1)')] },
    },
  },
  {
    id: '12.26', answerSource: 'bok', mark: 'T', intro: r`Bestäm samtliga primitiver till`,
    tip: r`a) Skriv nämnaren som en kvadrat plus 1, alltså som $(2x)^2+1$. b) Skriv nämnaren som en kvadrat plus 1. c) Bryt ut $1/4$ ur nämnaren och gör sedan som i a) och b). d) Bryt ut 9 ur nämnaren och gör sedan som i a) och b).`,
    parts: {
      a: { text: r`$\frac{1}{4x^2+1}$`, answer: r`$\frac12\arctan(2x)+C$` },
      b: { text: r`$\frac{1}{\frac{x^2}{9}+1}$`, answer: r`$3\arctan\frac x3+C$` },
      c: { text: r`$\frac{1}{x^2+\frac14}$`, answer: r`$2\arctan(2x)+C$`, checks: [A('2*atan(2*x)', '1/(x**2+Rational(1,4))')] },
      d: { text: r`$\frac{1}{x^2+9}$`, answer: r`$\frac13\arctan\frac x3+C$`, checks: [A('atan(x/3)/3', '1/(x**2+9)')] },
    },
  },
  {
    id: '12.27', answerSource: 'bok', mark: 'T', intro: r`Bestäm samtliga primitiver till`,
    tip: r`Nämnarna saknar reella nollställen, så någon partialbråksuppdelning är inte möjlig. Kvadratkomplettera och byt variabel så att nämnaren blir $t^2+K$, där $K$ är en positiv konstant. Gör sedan som i föregående uppgift.`,
    parts: {
      a: { text: r`$\frac{1}{x^2-2x+2}$`, answer: r`$\arctan(x-1)+C$`, checks: [A('atan(x-1)', '1/(x**2-2*x+2)')] },
      b: { text: r`$\frac{1}{x^2+4x+5}$`, answer: r`$\arctan(x+2)+C$`, checks: [A('atan(x+2)', '1/(x**2+4*x+5)')] },
      c: { text: r`$\frac{1}{x^2-2x+5}$`, answer: r`$\frac12\arctan\frac{x-1}{2}+C$`, checks: [A('atan((x-1)/2)/2', '1/(x**2-2*x+5)')] },
      d: { text: r`$\frac{1}{x^2+4x+6}$`, answer: r`$\frac{1}{\sqrt2}\arctan\frac{x+2}{\sqrt2}+C$`, checks: [A('atan((x+2)/sqrt(2))/sqrt(2)', '1/(x**2+4*x+6)')] },
    },
  },
  {
    id: '12.28', answerSource: 'bok', mark: 'TL', intro: r`Bestäm samtliga primitiver till`,
    tip: r`Nämnarna saknar reella nollställen, så någon partialbråksuppdelning är inte möjlig. Kvadratkomplettera och byt variabel så att nämnaren blir $t^2+K$, där $K$ är en positiv konstant. Täljaren blir då $t+a$, där $a$ är en konstant. Skriv sedan funktionen som en summa av två termer, och ta primitiv till varje term för sig. Observera att mycket av arbetet redan är gjort i föregående uppgift.`,
    parts: {
      a: { text: r`$\frac{x+1}{x^2-2x+2}$`, answer: r`$\frac12\ln(x^2-2x+2)+2\arctan(x-1)+C$`, checks: [A('log(x**2-2*x+2)/2+2*atan(x-1)', '(x+1)/(x**2-2*x+2)')] },
      b: { text: r`$\frac{x+1}{x^2+4x+5}$`, answer: r`$\frac12\ln(x^2+4x+5)-\arctan(x+2)+C$`, checks: [A('log(x**2+4*x+5)/2-atan(x+2)', '(x+1)/(x**2+4*x+5)')] },
      c: { text: r`$\frac{x+1}{x^2-2x+5}$`, answer: r`$\frac12\ln(x^2-2x+5)+\arctan\frac{x-1}{2}+C$`, checks: [A('log(x**2-2*x+5)/2+atan((x-1)/2)', '(x+1)/(x**2-2*x+5)')] },
      d: { text: r`$\frac{x+1}{x^2+4x+6}$`, answer: r`$\frac12\ln(x^2+4x+6)-\frac{1}{\sqrt2}\arctan\frac{x+2}{\sqrt2}+C$`, checks: [A('log(x**2+4*x+6)/2-atan((x+2)/sqrt(2))/sqrt(2)', '(x+1)/(x**2+4*x+6)')] },
    },
  },
  {
    id: '12.29', answerSource: 'bok', mark: 'L', intro: r`Bestäm samtliga primitiver till $\dfrac{x^5-x^4-x^2+2x+1}{x^4-x^3-x+1}$.`,
    answer: r`$\frac12x^2-\frac{2}{3(x-1)}-\frac13\ln|x-1|+\frac16\ln(x^2+x+1)-\frac{1}{3\sqrt3}\arctan\frac{2x+1}{\sqrt3}+C$`,
    checks: [A('x**2/2-2/(3*(x-1))-log(x-1)/3+log(x**2+x+1)/6-atan((2*x+1)/sqrt(3))/(3*sqrt(3))', '(x**5-x**4-x**2+2*x+1)/(x**4-x**3-x+1)')],
  },
  {
    id: '12.30', answerSource: 'bok', mark: 'T', intro: r`Bestäm samtliga primitiver till`,
    tip: r`a) Gör ansatsen $\dfrac{2}{(x^2+1)(x-1)}=\dfrac{A}{x-1}+\dfrac{Bx+C}{x^2+1}$.`,
    parts: {
      a: { text: r`$\frac{2}{(x^2+1)(x-1)}$`, answer: r`$\ln|x-1|-\frac12\ln(x^2+1)-\arctan x+C$`, checks: [A('log(x-1)-log(x**2+1)/2-atan(x)', '2/((x**2+1)*(x-1))')] },
      b: { text: r`$\frac{1}{x^4-1}$`, answer: r`$\frac14\ln\left|\frac{x-1}{x+1}\right|-\frac12\arctan x+C$`, checks: [A('(log(x-1)-log(x+1))/4-atan(x)/2', '1/(x**4-1)')] },
      c: { text: r`$\frac{5x^3+12x^2+12x+10}{(x^2+4)(x^2+2x+1)}$`, answer: r`$2\ln(x^2+4)+\arctan\frac x2+\ln|x+1|-\frac{1}{x+1}+C$`, checks: [A('2*log(x**2+4)+atan(x/2)+log(x+1)-1/(x+1)', '(5*x**3+12*x**2+12*x+10)/((x**2+4)*(x**2+2*x+1))')] },
    },
  },
  {
    id: '12.31', answerSource: 'bok', intro: r`Bestäm samtliga primitiver till`,
    parts: {
      a: { text: r`$\frac{x^5+1}{x^4+x^3+x^2}$`, answer: r`$\frac12x^2-x-\frac1x-\ln|x|+\frac12\ln(x^2+x+1)+\frac{1}{\sqrt3}\arctan\frac{2x+1}{\sqrt3}+C$`, checks: [A('x**2/2-x-1/x-log(x)+log(x**2+x+1)/2+atan((2*x+1)/sqrt(3))/sqrt(3)', '(x**5+1)/(x**4+x**3+x**2)')] },
      b: { text: r`$\frac{x^2+8x+4}{x^2+4x+8}$`, answer: r`$x+2\ln(x^2+4x+8)-6\arctan\frac{x+2}{2}+C$`, checks: [A('x+2*log(x**2+4*x+8)-6*atan((x+2)/2)', '(x**2+8*x+4)/(x**2+4*x+8)')] },
      c: { text: r`$\frac{x^3+4}{x^2+x}$`, answer: r`$\frac12x^2-x+4\ln|x|-3\ln|x+1|+C$`, checks: [A('x**2/2-x+4*log(x)-3*log(x+1)', '(x**3+4)/(x**2+x)')] },
    },
  },
  {
    id: '12.34', answerSource: 'bok', mark: 'TL', intro: r`Bestäm alla primitiva funktioner till`, tip: r`a) Sätt $t=\cos x$. e) Sätt $t=\tan x$.`,
    parts: {
      a: { text: r`$\frac{\sin x}{\sqrt{\cos^2x+2\cos x+3}}$`, answer: r`$-\ln\left(\cos x+1+\sqrt{\cos^2x+2\cos x+3}\right)+C$`, checks: [A('-log(cos(x)+1+sqrt(cos(x)**2+2*cos(x)+3))', 'sin(x)/sqrt(cos(x)**2+2*cos(x)+3)')] },
      b: { text: r`$\frac{\sin2x}{\cos^3x}$`, answer: r`$\frac{2}{\cos x}+C$`, checks: [A('2/cos(x)', 'sin(2*x)/cos(x)**3')] },
      c: { text: r`$\frac{\cos x}{\sin x+\sin^2x}$`, answer: r`$\ln\left|\frac{\sin x}{1+\sin x}\right|+C$`, checks: [A('log(sin(x))-log(1+sin(x))', 'cos(x)/(sin(x)+sin(x)**2)')] },
      d: { text: r`$\cos x\cdot\sin^9x$`, answer: r`$\frac{1}{10}\sin^{10}x+C$` },
      e: { text: r`$\frac{\tan^3x+\tan x}{\tan^3x+3\tan^2x+2\tan x+6}$`, answer: r`$\frac{3}{22}\ln\frac{\tan^2x+2}{(\tan x+3)^2}+\frac{\sqrt2}{11}\arctan\left(\frac{\tan x}{\sqrt2}\right)+C$`, checks: [A('Rational(3,22)*(log(tan(x)**2+2)-2*log(tan(x)+3))+sqrt(2)/11*atan(tan(x)/sqrt(2))', '(tan(x)**3+tan(x))/(tan(x)**3+3*tan(x)**2+2*tan(x)+6)')] },
      f: { text: r`$\frac{1}{\sin^2x+2\cos^2x}$`, answer: r`$\frac{1}{\sqrt2}\arctan\left(\frac{\tan x}{\sqrt2}\right)+C$`, checks: [A('atan(tan(x)/sqrt(2))/sqrt(2)', '1/(sin(x)**2+2*cos(x)**2)')] },
    },
  },
  {
    id: '12.35', answerSource: 'bok', mark: 'TL', intro: r`Bestäm alla primitiva funktioner till`,
    tip: r`Man kan använda Eulers formler i alla deluppgifterna. I några fall är det lättare att använda andra metoder. I d) kan man t.ex. skriva om $\cos^2x$ med hjälp av en formel för dubbla vinkeln.`,
    parts: {
      a: { text: r`$\sin^5x$`, answer: r`$-\cos x+\frac23\cos^3x-\frac15\cos^5x+C$`, checks: [A('-cos(x)+2*cos(x)**3/3-cos(x)**5/5', 'sin(x)**5')] },
      b: { text: r`$\sin^4x$`, answer: r`$\frac{1}{32}\sin4x-\frac14\sin2x+\frac38x+C$`, checks: [A('sin(4*x)/32-sin(2*x)/4+3*x/8', 'sin(x)**4')] },
      c: { text: r`$\sin5x\cdot\cos x$`, answer: r`$-\frac{1}{12}\cos6x-\frac18\cos4x+C$`, checks: [A('-cos(6*x)/12-cos(4*x)/8', 'sin(5*x)*cos(x)')] },
      d: { text: r`$\cos^2x$`, answer: r`$\frac12x+\frac14\sin2x+C$` },
      e: { text: r`$\sin^4x\cos^2x$`, answer: r`$\frac{1}{32}\left(\frac16\sin6x-\frac12\sin4x-\frac12\sin2x+2x\right)+C$`, checks: [A('(sin(6*x)/6-sin(4*x)/2-sin(2*x)/2+2*x)/32', 'sin(x)**4*cos(x)**2')] },
      f: { text: r`$e^{2x}\sin3x$`, answer: r`$\frac{1}{13}e^{2x}(2\sin3x-3\cos3x)+C$ (jämför 12.18 b)` },
    },
  },
]
