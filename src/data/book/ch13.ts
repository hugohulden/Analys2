import type { BookTask } from './types'

const r = String.raw
/** sympy-kontroll: ∫_a^b f dx = svar */
const D = (f: string, a: string | number, b: string | number, ans: string) => `defint('${f}', '${a}', '${b}', '${ans}')`

/** Kapitel 13 – Integraler (de uppgifter som ingår i kursplanen). */
export const CH13: BookTask[] = [
  {
    id: '13.4', answerSource: 'bok', intro: r`En student finner vid en skrivning i endimensionell analys att $\displaystyle\int_0^{1/2}(\arcsin x)^2\,dx = 1-\left(\frac\pi3\right)^2$. Varför är svaret orimligt?`,
    answer: r`Integranden är positiv vilket innebär att även integralen måste vara positiv, men $1-(\pi/3)^2<0$.`,
  },
  {
    id: '13.9', answerSource: 'bok', figure: 'figurer/bok-13-9.jpg', intro: r`Den kontinuerliga funktionen $f$ är i figuren ritad för $0\le t\le6$. För vilket $x$ blir $S(x)=\displaystyle\int_0^x f(t)\,dt$ maximal?`,
    answer: r`$x=3$`, tip: r`$S'(x)=f(x)$: $S$ växer så länge $f>0$ och avtar när $f<0$. Jämför också arean under och över axeln.`,
  },
  {
    id: '13.10', answerSource: 'bok', intro: r`Bestäm den punkt i vilken funktionen $f(x)=\displaystyle\int_0^x e^{-t^2}\sin t\,dt$, $0\le x\le2\pi$, antar sitt största värde.`,
    answer: r`$x=\pi$`, tip: r`$f'(x)=e^{-x^2}\sin x$ – teckenstudera.`,
  },
  {
    id: '13.11', answerSource: 'bok', mark: 'L', intro: r`Bestäm derivatan av`,
    parts: {
      a: { text: r`$\displaystyle\int_1^x\cos(t^2)\,dt$`, answer: r`$\cos(x^2)$`, checks: ["eq('diff(Integral(cos(t**2),(t,1,x)),x).doit()', 'cos(x**2)')"] },
      b: { text: r`$\displaystyle\int_1^{\sqrt x}\cos(t^2)\,dt$, $x>0$`, answer: r`$\frac{\cos x}{2\sqrt x}$`, checks: ["eq('diff(Integral(cos(t**2),(t,1,sqrt(x))),x).doit()', 'cos(x)/(2*sqrt(x))')"] },
    },
  },
  {
    id: '13.12', answerSource: 'bok', intro: r`Beräkna derivatan av`,
    parts: {
      a: { text: r`$\displaystyle\int_1^{\arcsin x}\frac{\sin t}{t}\,dt$`, answer: r`$\frac{x}{\sqrt{1-x^2}\arcsin x}$`, checks: ["eq('diff(Integral(sin(t)/t,(t,1,asin(x))),x).doit()', 'x/(sqrt(1-x**2)*asin(x))')"] },
      b: { text: r`$\displaystyle\int_{1/2}^{\ln x}\frac{e^{2t}}{t}\,dt$`, answer: r`$\frac{x}{\ln x}$`, checks: ["eq('diff(Integral(exp(2*t)/t,(t,Rational(1,2),log(x))),x).doit()', 'x/log(x)')"] },
      c: { text: r`$\displaystyle\int_{\cos x}^1\sqrt{1-t^2}\,dt$, $0<x<\pi$`, answer: r`$\sin^2x$`, checks: ["num('diff(Integral(sqrt(1-t**2),(t,cos(x),1)),x).doit().subs(x, 2.5) - sin(2.5)**2', 0, 1e-9)"] },
      d: { text: r`$\displaystyle\int_{\cos x}^{\sin x}\sqrt{1-t^2}\,dt$, $0<x<\frac\pi2$`, answer: r`$1$`, checks: ["num('diff(Integral(sqrt(1-t**2),(t,cos(x),sin(x))),x).doit().subs(x, 0.7)', 1, 1e-9)"] },
    },
  },
  {
    id: '13.13', answerSource: 'egen', intro: r`Visa olikheten $1-x+\displaystyle\int_1^x\frac{\sin t}{t}\,dt<0$, $x>1$.`,
    answer: r`För $t>1$ är $\frac{\sin t}{t}\le\frac1t<1$, så $\int_1^x\frac{\sin t}{t}dt<\int_1^x1\,dt=x-1$ för $x>1$. Alltså är $1-x+\int_1^x\frac{\sin t}{t}dt<1-x+x-1=0$.`,
  },
  { id: '13.14', answerSource: 'bok', mark: 'T', intro: r`Beräkna $\displaystyle\int_0^1\frac{x+1}{x^2+5x+6}\,dx$.`, answer: r`$\ln\frac{32}{27}$`, tip: r`Partialbråksuppdela och använd insättningsformeln.`, checks: [D('(x+1)/(x**2+5*x+6)', 0, 1, 'log(Rational(32,27))')] },
  {
    id: '13.15', answerSource: 'bok', mark: 'L', intro: r`Beräkna integralerna`,
    parts: {
      a: { text: r`$\displaystyle\int_0^1\ln(1+x^2)\,dx$`, answer: r`$\ln2+\frac\pi2-2$`, checks: [D('log(1+x**2)', 0, 1, 'log(2)+pi/2-2')] },
      b: { text: r`$\displaystyle\int_0^1e^x\ln(1+e^x)\,dx$`, answer: r`$(1+e)\ln(1+e)-2\ln2-e+1$`, checks: [D('exp(x)*log(1+exp(x))', 0, 1, '(1+E)*log(1+E)-2*log(2)-E+1')] },
      c: { text: r`$\displaystyle\int_1^e(\ln x)^2\,dx$`, answer: r`$e-2$`, checks: [D('log(x)**2', 1, 'E', 'E-2')] },
      d: { text: r`$\displaystyle\int_0^{\pi/4}\frac{x}{\cos^2x}\,dx$`, answer: r`$\frac\pi4-\frac12\ln2$`, checks: [D('x/cos(x)**2', 0, 'pi/4', 'pi/4-log(2)/2')] },
    },
  },
  {
    id: '13.16', answerSource: 'bok', mark: 'TL', intro: r`Beräkna integralerna`, tip: r`b) Sätt $t=e^x$.`,
    parts: {
      a: { text: r`$\displaystyle\int_0^{10}\frac{40}{100+x^2}\,dx$`, answer: r`$\pi$`, checks: [D('40/(100+x**2)', 0, 10, 'pi')] },
      b: { text: r`$\displaystyle\int_{-1}^1\frac{dx}{\cosh x}$`, answer: r`$2\left(\arctan e-\arctan\frac1e\right)$`, checks: [D('1/cosh(x)', -1, 1, '2*(atan(E)-atan(exp(-1)))')] },
      c: { text: r`$\displaystyle\int_0^1\cos x^{1/3}\,dx$`, answer: r`$6\cos1-3\sin1$`, checks: [D('cos(x**Rational(1,3))', 0, 1, '6*cos(1)-3*sin(1)')] },
      d: { text: r`$\displaystyle\int_0^{\pi/2}e^{\sin x}\sin2x\,dx$`, answer: r`$2$`, checks: [D('exp(sin(x))*sin(2*x)', 0, 'pi/2', '2')] },
    },
  },
  {
    id: '13.17', answerSource: 'bok', intro: r`Beräkna integralerna`,
    parts: {
      a: { text: r`$\displaystyle\int_0^{1/2}(\arcsin x)^2\,dx$`, answer: r`$\frac{\pi^2}{72}+\frac{\pi\sqrt3}{6}-1$`, checks: [D('asin(x)**2', 0, 'Rational(1,2)', 'pi**2/72+pi*sqrt(3)/6-1')] },
      b: { text: r`$\displaystyle\int_0^1\frac{dx}{e^x-e^{-2x}+2}$`, answer: r`$\ln(1+e)-\frac12\ln(e^2+e-1)-\frac{3}{2\sqrt5}\ln\frac{2e+1+\sqrt5}{2e+1-\sqrt5}-\ln2+\frac{3}{2\sqrt5}\ln\frac{3+\sqrt5}{3-\sqrt5}$`, checks: [D('1/(exp(x)-exp(-2*x)+2)', 0, 1, 'log(1+E)-log(E**2+E-1)/2-3/(2*sqrt(5))*log((2*E+1+sqrt(5))/(2*E+1-sqrt(5)))-log(2)+3/(2*sqrt(5))*log((3+sqrt(5))/(3-sqrt(5)))')] },
      c: { text: r`$\displaystyle\int_0^{\pi/4}\frac{\sin^3x}{\cos^5x}\,dx$`, answer: r`$\frac14$`, checks: [D('sin(x)**3/cos(x)**5', 0, 'pi/4', '1/4')] },
    },
  },
  {
    id: '13.18', answerSource: 'bok', mark: 'T', intro: r`Beräkna integralerna`, tip: r`b) Integranden kan skrivas om som $\dfrac{\cos x-\sin x}{\sin x+\cos x}$.`,
    parts: {
      a: { text: r`$\displaystyle\int_1^2\frac{x\ln x}{(1+x^2)^2}\,dx$`, answer: r`$\frac{13}{20}\ln2-\frac14\ln5$`, checks: [D('x*log(x)/(1+x**2)**2', 1, 2, 'Rational(13,20)*log(2)-log(5)/4')] },
      b: { text: r`$\displaystyle\int_0^{\pi/4}\frac{1-\tan x}{1+\tan x}\,dx$`, answer: r`$\frac12\ln2$`, checks: [D('(1-tan(x))/(1+tan(x))', 0, 'pi/4', 'log(2)/2')] },
      c: { text: r`$\displaystyle\int_0^1x\sqrt{1-x^2}\arcsin x\,dx$`, answer: r`$\frac29$`, checks: [D('x*sqrt(1-x**2)*asin(x)', 0, 1, '2/9')] },
    },
  },
  {
    id: '13.19', answerSource: 'bok', mark: 'TL', intro: r`Beräkna integralerna`, tip: r`a) Dela upp integrationsintervallet i delintervallen $[-\frac12,\frac12]$ och $[\frac12,1]$. Vilket tecken har $\frac12-x$ på respektive intervall?`,
    parts: {
      a: { text: r`$\displaystyle\int_{-1/2}^1\left|\tfrac12-x\right|\cos x\,dx$`, answer: r`$\sin\frac12+\frac12\sin1+\cos1-\cos\frac12$`, checks: [D('Abs(Rational(1,2)-x)*cos(x)', '-Rational(1,2)', 1, 'sin(Rational(1,2))+sin(1)/2+cos(1)-cos(Rational(1,2))')] },
      b: { text: r`$\displaystyle\int_0^{2\pi}e^{-x}|\sin x|\,dx$`, answer: r`$\frac12\left(1+2e^{-\pi}+e^{-2\pi}\right)$`, checks: [D('exp(-x)*Abs(sin(x))', 0, '2*pi', '(1+2*exp(-pi)+exp(-2*pi))/2')] },
    },
  },
  {
    id: '13.20', answerSource: 'bok', mark: 'TL', intro: r`Beräkna integralerna`, tip: r`b) Sätt $t=\tan\frac x2$. c) Sätt $t=\tan x$.`,
    parts: {
      a: { text: r`$\displaystyle\int_0^{\pi/4}\frac{dx}{1+\sin x\cos x}$`, answer: r`$\frac{\pi}{3\sqrt3}$`, checks: [D('1/(1+sin(x)*cos(x))', 0, 'pi/4', 'pi/(3*sqrt(3))')] },
      b: { text: r`$\displaystyle\int_0^{\pi/2}\frac{\cos x}{1+\cos x}\,dx$`, answer: r`$\frac\pi2-1$`, checks: [D('cos(x)/(1+cos(x))', 0, 'pi/2', 'pi/2-1')] },
      c: { text: r`$\displaystyle\int_0^{\pi/4}(\tan^3x+\tan^4x)\,dx$`, answer: r`$\frac\pi4-\frac16-\frac12\ln2$`, checks: [D('tan(x)**3+tan(x)**4', 0, 'pi/4', 'pi/4-Rational(1,6)-log(2)/2')] },
    },
  },
  {
    id: '13.21', answerSource: 'bok', intro: r`Beräkna integralerna`,
    parts: {
      a: { text: r`$\displaystyle\int_{-1}^3\frac{x+3}{\sqrt{x^2+2x+10}}\,dx$`, answer: r`$2+2\ln3$`, checks: [D('(x+3)/sqrt(x**2+2*x+10)', -1, 3, '2+2*log(3)')] },
      b: { text: r`$\displaystyle\int_0^\pi\frac{\sin x\,dx}{\sqrt{\cos^2x+2\cos x+3}}$`, answer: r`$\ln(\sqrt2+\sqrt3)$`, checks: [D('sin(x)/sqrt(cos(x)**2+2*cos(x)+3)', 0, 'pi', 'log(sqrt(2)+sqrt(3))')] },
    },
  },
  {
    id: '13.22', answerSource: 'bok', intro: r`a) Låt $X$ vara ett positivt tal. Rita kurvan $y=\frac{1}{x^2+1}$, $0\le x\le X$. b) Beräkna $\int_0^X\frac{dx}{x^2+1}$. c) Beräkna $\lim_{X\to\infty}\int_0^X\frac{dx}{x^2+1}$. d) Är den generaliserade integralen $\int_0^\infty\frac{dx}{x^2+1}$ konvergent?`,
    answer: r`a) Avtagande kurva från 1 mot 0. b) $\arctan X$ c) $\pi/2$ d) Integralen är konvergent med värdet $\pi/2$.`, checks: [D('1/(x**2+1)', 0, 'oo', 'pi/2')],
  },
  {
    id: '13.23', answerSource: 'bok', mark: 'L', intro: r`Beräkna de generaliserade integralerna`,
    parts: {
      a: { text: r`$\displaystyle\int_1^\infty\frac{dx}{e^x-e^{-x}}$`, answer: r`$\frac12\ln\frac{e+1}{e-1}$`, checks: ["num('Integral(1/(exp(x)-exp(-x)),(x,1,oo)).evalf() - log((E+1)/(E-1))/2', 0, 1e-9)"] },
      b: { text: r`$\displaystyle\int_0^\infty\frac{\cos x}{3+\sin x}\,dx$`, answer: r`divergent (primitiven $\ln(3+\sin x)$ saknar gränsvärde)` },
    },
  },
  {
    id: '13.24', answerSource: 'bok', intro: r`Beräkna de generaliserade integralerna`,
    parts: {
      a: { text: r`$\displaystyle\int_0^\infty\frac{x}{1+x^2}\,dx$`, answer: r`divergent`, checks: ["eq('integrate(x/(1+x**2),(x,0,oo))', 'oo')"] },
      b: { text: r`$\displaystyle\int_0^\infty xe^{-x}\,dx$`, answer: r`$1$`, checks: [D('x*exp(-x)', 0, 'oo', '1')] },
      c: { text: r`$\displaystyle\int_1^\infty\frac{\ln(2x-1)}{x^2}\,dx$`, answer: r`$2\ln2$`, checks: [D('log(2*x-1)/x**2', 1, 'oo', '2*log(2)')] },
      d: { text: r`$\displaystyle\int_2^\infty\frac{x}{x^4-1}\,dx$`, answer: r`$\frac14\ln\frac53$`, checks: [D('x/(x**4-1)', 2, 'oo', 'log(Rational(5,3))/4')] },
    },
  },
  {
    id: '13.25', answerSource: 'bok', intro: r`a) Låt $0<\varepsilon\le1$. Rita kurvan $y=\frac{1}{\sqrt x}$, $\varepsilon\le x\le1$. b) Beräkna $\int_\varepsilon^1\frac{dx}{\sqrt x}$. c) Beräkna $\lim_{\varepsilon\to0^+}\int_\varepsilon^1\frac{dx}{\sqrt x}$. d) Är $\int_0^1\frac{dx}{\sqrt x}$ konvergent?`,
    answer: r`a) Avtagande kurva från $1/\sqrt\varepsilon$ till 1. b) $2-2\sqrt\varepsilon$ c) $2$ d) Integralen är konvergent med värdet 2.`, checks: [D('1/sqrt(x)', 0, 1, '2')],
  },
  {
    id: '13.26', answerSource: 'bok', mark: 'L', intro: r`Beräkna de generaliserade integralerna`,
    parts: {
      a: { text: r`$\displaystyle\int_0^1\frac{\ln x}{\sqrt x}\,dx$`, answer: r`$-4$`, checks: [D('log(x)/sqrt(x)', 0, 1, '-4')] },
      b: { text: r`$\displaystyle\int_{1/2}^1\frac{dx}{x\ln x}$`, answer: r`divergent` },
    },
  },
  {
    id: '13.27', answerSource: 'bok', intro: r`Beräkna de generaliserade integralerna`,
    parts: {
      a: { text: r`$\displaystyle\int_0^1\ln x\,dx$`, answer: r`$-1$`, checks: [D('log(x)', 0, 1, '-1')] },
      b: { text: r`$\displaystyle\int_1^2\frac{dx}{x^2-1}$`, answer: r`divergent` },
      c: { text: r`$\displaystyle\int_0^1\frac{\arctan\sqrt x}{\sqrt x}\,dx$`, answer: r`$\frac\pi2-\ln2$`, checks: [D('atan(sqrt(x))/sqrt(x)', 0, 1, 'pi/2-log(2)')] },
      d: { text: r`$\displaystyle\int_1^2\frac{dx}{\sqrt{x^2-1}}$`, answer: r`$\ln(2+\sqrt3)$`, checks: ["num('Integral(1/sqrt(x**2-1),(x,1,2)).evalf() - log(2+sqrt(3))', 0, 1e-9)"] },
    },
  },
  {
    id: '13.28', answerSource: 'bok', mark: 'L', intro: r`Beräkna de generaliserade integralerna`,
    parts: {
      a: { text: r`$\displaystyle\int_1^\infty\frac{dx}{\sqrt x(x+4)}$`, answer: r`$\frac\pi2-\arctan\frac12$`, checks: [D('1/(sqrt(x)*(x+4))', 1, 'oo', 'pi/2-atan(Rational(1,2))')] },
      b: { text: r`$\displaystyle\int_0^1\frac{dx}{\sqrt x(x+4)}$`, answer: r`$\arctan\frac12$`, checks: [D('1/(sqrt(x)*(x+4))', 0, 1, 'atan(Rational(1,2))')] },
      c: { text: r`$\displaystyle\int_0^\infty\frac{dx}{\sqrt x(x+4)}$`, answer: r`$\frac\pi2$`, checks: [D('1/(sqrt(x)*(x+4))', 0, 'oo', 'pi/2')] },
    },
  },
  {
    id: '13.29', answerSource: 'bok', intro: r`Beräkna de generaliserade integralerna`,
    parts: {
      a: { text: r`$\displaystyle\int_{-\infty}^\infty\frac{dx}{1+x^2}$`, answer: r`$\pi$`, checks: [D('1/(1+x**2)', '-oo', 'oo', 'pi')] },
      b: { text: r`$\displaystyle\int_1^\infty\frac{dx}{x^2-1}$`, answer: r`divergent` },
      c: { text: r`$\displaystyle\int_{-1/2}^{1/2}\frac{dx}{\sqrt{1-4x^2}}$`, answer: r`$\frac\pi2$`, checks: [D('1/sqrt(1-4*x**2)', '-Rational(1,2)', 'Rational(1,2)', 'pi/2')] },
      d: { text: r`$\displaystyle\int_0^1\frac{dx}{\sqrt{x(1-x)}}$`, answer: r`$\pi$`, checks: [D('1/sqrt(x*(1-x))', 0, 1, 'pi')] },
    },
  },
  {
    id: '13.30', answerSource: 'bok', mark: 'L', intro: r`Avgör med hjälp av jämförelsesats om följande generaliserade integraler är konvergenta eller divergenta:`,
    parts: {
      a: { text: r`$\displaystyle\int_1^\infty\frac{dx}{x^2+\ln x}$`, answer: r`konvergent` },
      b: { text: r`$\displaystyle\int_1^\infty\frac{dx}{x-\ln x}$`, answer: r`divergent` },
      c: { text: r`$\displaystyle\int_1^\infty\frac{dx}{x^2-\ln x}$`, answer: r`konvergent` },
      d: { text: r`$\displaystyle\int_1^\infty\frac{dx}{x+\ln x}$`, answer: r`divergent` },
    },
  },
  {
    id: '13.31', answerSource: 'bok', intro: r`Avgör med hjälp av jämförelsesats om följande generaliserade integraler är konvergenta eller divergenta:`,
    parts: {
      a: { text: r`$\displaystyle\int_2^\infty\frac{1}{\sqrt{x^3+1}}\,dx$`, answer: r`konvergent` },
      b: { text: r`$\displaystyle\int_2^\infty\frac{1}{\sqrt{x-1}}\,dx$`, answer: r`divergent` },
      c: { text: r`$\displaystyle\int_2^\infty\frac{1}{\sqrt{x^3-1}}\,dx$`, answer: r`konvergent` },
      d: { text: r`$\displaystyle\int_0^1\frac{1}{\sqrt{x+x^5}}\,dx$`, answer: r`konvergent` },
      e: { text: r`$\displaystyle\int_0^1\frac{1}{\sin x}\,dx$`, answer: r`divergent` },
      f: { text: r`$\displaystyle\int_0^\infty\frac{dx}{\sqrt x(e^x+1)}$`, answer: r`konvergent` },
    },
  },
  {
    id: '13.32', answerSource: 'egen', mark: 'L', intro: r`Visa olikheterna`,
    parts: {
      a: { text: r`$\displaystyle\int_0^\infty\frac{1}{e^x+\sin^2x}\,dx\le1$`, answer: r`$e^x+\sin^2x\ge e^x$, så integranden är $\le e^{-x}$ och $\int_0^\infty e^{-x}dx=1$.` },
      b: { text: r`$\displaystyle\int_1^\infty\frac{x}{x^3+\ln x}\,dx\le1$`, answer: r`För $x\ge1$ är $\ln x\ge0$, så $\frac{x}{x^3+\ln x}\le\frac{1}{x^2}$ och $\int_1^\infty x^{-2}dx=1$.` },
    },
  },
  {
    id: '13.50', answerSource: 'bok', intro: r`Är något fel i nedanstående lösning? I så fall vad? $$\int_{-1}^1\frac{2}{(2x+1)^2}\,dx=\left[-\frac{1}{2x+1}\right]_{-1}^1=-\frac13-1=-\frac43.$$`,
    answer: r`Lösningen är felaktig. Funktionen $\frac{2}{(2x+1)^2}$ är ej definierad i $x=-1/2$ och är obegränsad i integrationsintervallet. Integralen är därför generaliserad. (Den generaliserade integralen är divergent.)`,
  },
]
