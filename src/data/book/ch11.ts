import type { BookTask } from './types'

const r = String.raw
/** sympy: Maclaurinpolynomet av ordning n av f är poly */
const M = (f: string, n: number, poly: string) => `series_ok('${f}', ${n}, '${poly}')`
const L = (f: string, ans: string) => `lim_ok('${f}', 0, '${ans}')`
const T = (f: string, a: string | number, n: number, poly: string) => `taylor_ok('${f}', '${a}', ${n}, '${poly}')`

/** Kapitel 11 – Maclaurin- och Taylorutvecklingar (uppgifter i kursplanen). */
export const CH11: BookTask[] = [
  {
    id: '11.1', answerSource: 'bok', intro: r`Sätt $f(x)=\ln(1+x)$. Låt $p_n(x)$ vara Maclaurinpolynomet av ordning $n$ till $f(x)$.`,
    parts: {
      a: { text: r`Beräkna $p_1(x)$, $p_2(x)$, $p_3(x)$ och $p_4(x)$.`, answer: r`$p_1(x)=x$, $p_2(x)=x-\frac12x^2$, $p_3(x)=x-\frac12x^2+\frac13x^3$, $p_4(x)=x-\frac12x^2+\frac13x^3-\frac14x^4$`, checks: [M('log(1+x)', 4, 'x-x**2/2+x**3/3-x**4/4')] },
      b: { text: r`Beräkna med hjälp av miniräknare $f(0{,}1)$, $p_1(0{,}1)$, $p_2(0{,}1)$, $p_3(0{,}1)$ och $p_4(0{,}1)$. Kommentar?`, answer: r`$f(0{,}1)\approx0{,}095310$, $p_1(0{,}1)=0{,}10$, $p_2(0{,}1)=0{,}0950$, $p_3(0{,}1)\approx0{,}09533$, $p_4(0{,}1)\approx0{,}095308$` },
      c: { text: r`Beräkna med hjälp av miniräknare $f(x)$ och $p_2(x)$, om $x=0{,}1$, $0{,}01$ och $0{,}001$. Kommentar?`, answer: r`$x=0{,}1$: $0{,}0953$ resp. $0{,}0950$. $x=0{,}01$: $0{,}0099503$ resp. $0{,}0099500$. $x=0{,}001$: $0{,}0009995003$ resp. $0{,}0009995000$. Felet krymper snabbt (som $x^3$).` },
    },
  },
  {
    id: '11.2', answerSource: 'bok', intro: r`Låt $p_n(x)$ vara Maclaurinpolynomet av ordning $n$ till $f(x)$. Beräkna`,
    parts: {
      a: { text: r`$p_3(x)$ om $f(x)=e^x$`, answer: r`$p_3(x)=1+x+\frac12x^2+\frac16x^3$`, checks: [M('exp(x)', 3, '1+x+x**2/2+x**3/6')] },
      b: { text: r`$p_3(x)$ om $f(x)=\sin x$`, answer: r`$p_3(x)=x-\frac16x^3$`, checks: [M('sin(x)', 3, 'x-x**3/6')] },
      c: { text: r`$p_4(x)$ om $f(x)=\sin x$`, answer: r`$p_4(x)=x-\frac16x^3$`, checks: [M('sin(x)', 4, 'x-x**3/6')] },
      d: { text: r`$p_2(x)$ om $f(x)=\sqrt{1+x}$`, answer: r`$p_2(x)=1+\frac12x-\frac18x^2$`, checks: [M('sqrt(1+x)', 2, '1+x/2-x**2/8')] },
    },
  },
  {
    id: '11.3', answerSource: 'bok', intro: r`Man kan ibland använda approximationen $\sqrt{1+x}\approx1+\frac12x$, om $x$ är nära 0. Sätt $f(x)=\sqrt{1+x}$. (Observera att delproblemen bygger på varandra.)`,
    parts: {
      a: { text: r`Beräkna Maclaurinpolynomet $p_1(x)$ av ordning 1 till $f(x)$. Jämför $p_1(x)$ med högerledet i approximationen ovan.`, answer: r`$p_1(x)=1+\frac12x$, och det är lika med högerledet i approximationen.`, checks: [M('sqrt(1+x)', 1, '1+x/2')] },
      b: { text: r`Rita i samma figur $y=f(x)$ och $y=p_1(x)$ för $-1\le x\le1$. Är $f(x)\approx p_1(x)$ om $x$ är nära 0?`, answer: r`Det ser ut som om $f(x)\approx p_1(x)$ nära $x=0$ (tangenten i $x=0$).` },
      c: { text: r`Sätt $R_2(x)=f(x)-p_1(x)$. Ange det uttryck för $R_2(x)$ som kallas Lagranges restterm.`, answer: r`$R_2(x)=-\dfrac{1}{8(1+\theta x)^{3/2}}x^2$, $0\le\theta\le1$.` },
      d: { text: r`Visa att $|R_2(x)|\le\frac18x^2$, om $x\ge0$.`, answer: r`Uppskatta $(1+\theta x)$ nedåt med 1.` },
      e: { text: r`Visa att $|R_2(x)|\le5\cdot10^{-3}$, om $0\le x\le0{,}1$. Använd miniräknare för att beräkna $f(0{,}08)$ och $p_1(0{,}08)$.`, answer: r`Uppskatta $\left|\frac18x^2\right|$ med $\frac18\cdot(0{,}1)^2$. Vi får $f(0{,}08)\approx1{,}039$, $p_1(0{,}08)=1{,}04$.` },
      f: { text: r`Antag att vi vill vara säkra på att $\sqrt{1+x}\approx1+\frac12x$ i intervallet $0\le x<a$ med ett fel vars storlek är högst $5\cdot10^{-4}$. Ange något sådant $a$.`, answer: r`Ett sådant $a$ är $a=\sqrt{40}\cdot10^{-2}\approx0{,}06$.` },
      g: { text: r`Beräkna $p_2(x)$, dvs. $f$:s Maclaurinpolynom av ordning 2.`, answer: r`$p_2(x)=1+\frac12x-\frac18x^2$`, checks: [M('sqrt(1+x)', 2, '1+x/2-x**2/8')] },
      h: { text: r`Rita i samma figur kurvorna $y=f(x)$ och $y=p_2(x)$ för $-1\le x\le1$. Är $f(x)\approx p_2(x)$, om $x$ är nära 0?`, answer: r`Det ser ut som om $f(x)\approx p_2(x)$ nära $x=0$ (bättre än $p_1$).` },
      i: { text: r`Sätt $R_3(x)=f(x)-p_2(x)$. Ange det uttryck för $R_3(x)$ som kallas Lagranges restterm.`, answer: r`$R_3(x)=\dfrac{1}{16(1+\theta x)^{5/2}}x^3$, $0\le\theta\le1$.` },
      j: { text: r`Visa att $|R_3(x)|\le\frac{1}{16}x^3$, om $x\ge0$.`, answer: r`Uppskatta som i d).` },
      k: { text: r`Gör en uppskattning av $|R_3(x)|$ om $0\le x\le0{,}1$. Beräkna som jämförelse $f(0{,}08)$ och $p_2(0{,}08)$ med hjälp av miniräknare.`, answer: r`$|R_3(x)|\le\frac{1}{16}\cdot10^{-3}=6{,}25\cdot10^{-5}$. Det gäller att $f(0{,}08)\approx1{,}03923$ och $p_2(0{,}08)=1{,}0392$.` },
    },
  },
  {
    id: '11.4', answerSource: 'bok', intro: r`Man använder ofta approximationen $\sin x\approx x$, om $x$ är nära noll och mäts i radianer. Sätt $f(x)=\sin x$.`,
    parts: {
      a: { text: r`Visa att högerledet i approximationen, dvs. $p_1(x)=x$, är Maclaurinpolynomet av ordning 1 till $f(x)$. Vad blir $p_2(x)$, dvs. Maclaurinpolynomet av ordning 2?`, answer: r`Även $p_2(x)=x$.`, checks: [M('sin(x)', 2, 'x')] },
      b: { text: r`Ange Lagranges resttermer $R_2(x)$ och $R_3(x)$, om $f(x)$ skrivs som $f(x)=p_1(x)+R_2(x)$ respektive $f(x)=p_2(x)+R_3(x)$.`, answer: r`$R_2(x)=\left(-\frac12\sin\theta x\right)x^2$ och $R_3(x)=\left(-\frac16\cos\theta x\right)x^3$. Talet $\theta$ ligger mellan 0 och 1 och är inte samma i de båda svaren.` },
      c: { text: r`Uppskatta $|R_2(x)|$ och $|R_3(x)|$ med lämpliga tal om $|x|<0{,}1$. Vilken uppskattning är minst och därför bäst att använda?`, answer: r`$|R_2(x)|<\frac12(0{,}1)^2=0{,}005$ (eller $<0{,}0005$ med den finare uppskattningen $\sin\theta x<\theta x<0{,}1$) och $|R_3(x)|<\frac16(0{,}1)^3\approx0{,}0002$. Uppenbarligen är uppskattningen av $|R_3(x)|$ minst.` },
    },
  },
  {
    id: '11.5', answerSource: 'bok', intro: r`Låt $p_3(x)$ vara Maclaurinpolynomet av ordning 3 till $f(x)=e^x$. Låt $R_4(x)$ vara definierad genom att $f(x)=p_3(x)+R_4(x)$.`,
    parts: {
      a: { text: r`Ange $p_3(x)$.`, answer: r`$p_3(x)=1+x+\frac12x^2+\frac16x^3$` },
      b: { text: r`Ange $R_4(x)$ som Lagranges restterm.`, answer: r`$R_4(x)=\dfrac{e^{\theta x}}{24}x^4$` },
      c: { text: r`Uppskatta $|R_4(x)|$ med ett lämpligt tal om $|x|\le0{,}1$. Beräkna med miniräknare $e^{0{,}1}$ och $p_3(0{,}1)$.`, answer: r`$|R_4(x)|$ kan uppskattas med t.ex. $\frac18\cdot10^{-4}\approx1{,}3\cdot10^{-5}$. $e^{0{,}1}\approx1{,}105171$ och $p_3(0{,}1)\approx1{,}105167$.` },
      d: { text: r`Gör en uppskattning i intervallet $|x|\le0{,}1$ av typ $|R_4(x)|\le C\cdot x^4$, där $C$ är ett tal.`, answer: r`$|R_4(x)|$ kan uppskattas med $\frac18x^4$ i intervallet $|x|\le0{,}1$ (om vi uppskattar $e$ med 3).` },
    },
  },
  {
    id: '11.6', answerSource: 'egen', mark: 'TL', intro: r`Visa att $\left|e^x-1-x-\frac{x^2}{2}-\frac{x^3}{6}-\frac{x^4}{24}\right|\le\frac{|x|^5}{40}$ om $|x|\le1$.`,
    tip: r`Räkna först ut $p_4(x)$, dvs. Maclaurinpolynomet av ordning 4 till $f(x)=e^x$. Visa sedan att vänsterledet i olikheten kan skrivas $|e^x-p_4(x)|$. Uppskatta till sist Lagranges restterm.`,
    answer: r`Vänsterledet är $|e^x-p_4(x)|=|R_5(x)|=\frac{e^{\theta x}}{120}|x|^5$ med $0\le\theta\le1$. För $|x|\le1$ är $e^{\theta x}\le e<3$, så $|R_5(x)|\le\frac{3|x|^5}{120}=\frac{|x|^5}{40}$.`,
  },
  {
    id: '11.7', answerSource: 'egen', intro: r`Visa att $\left|\ln(1+x)-x+\frac{x^2}{2}\right|\le\frac{8|x|^3}{3}$ om $|x|\le\frac12$.`,
    answer: r`$x-\frac{x^2}{2}=p_2(x)$ för $\ln(1+x)$, så vänsterledet är $|R_3(x)|=\frac{|f'''(\theta x)|}{3!}|x|^3$ med $f'''(t)=\frac{2}{(1+t)^3}$. För $|x|\le\frac12$ är $1+\theta x\ge\frac12$, så $|f'''(\theta x)|\le\frac{2}{(1/2)^3}=16$ och $|R_3(x)|\le\frac{16}{6}|x|^3=\frac{8|x|^3}{3}$.`,
  },
  {
    id: '11.10', answerSource: 'egen', mark: 'T', intro: r`Visa olikheten $|e^x+e^{-x}-2-x^2|\le\frac16x^4$ om $|x|\le1$.`,
    tip: r`Maclaurinutveckla funktionen $f(x)=e^x+e^{-x}$ lagom långt och skriv resttermen på Lagranges form.`,
    answer: r`$f(x)=e^x+e^{-x}$ har $f(0)=2$, $f'(0)=0$, $f''(0)=2$, $f'''(0)=0$, så $p_3(x)=2+x^2$ och vänsterledet är $|R_4(x)|=\frac{f^{(4)}(\theta x)}{24}x^4$ med $f^{(4)}(t)=e^t+e^{-t}$. För $|t|\le1$ är $e^t+e^{-t}\le e+e^{-1}<4$, så $|R_4(x)|\le\frac{4}{24}x^4=\frac16x^4$.`,
    checks: [M('exp(x)+exp(-x)', 3, '2+x**2')],
  },
  {
    id: '11.14', answerSource: 'bok', mark: 'L', intro: r`Finn Maclaurinutvecklingen av ordning 3 av följande funktioner. Ange resttermen som $x^nB(x)$ med lämpligt $n$ och $B(x)$ begränsad i en omgivning av $x=0$:`,
    parts: {
      a: { text: r`$e^{2x}$`, answer: r`$1+2x+2x^2+\frac43x^3+x^4B(x)$`, checks: [M('exp(2*x)', 3, '1+2*x+2*x**2+4*x**3/3')] },
      b: { text: r`$e^{-x}$`, answer: r`$1-x+\frac12x^2-\frac16x^3+x^4B(x)$`, checks: [M('exp(-x)', 3, '1-x+x**2/2-x**3/6')] },
      c: { text: r`$\cos\frac x2$`, answer: r`$1-\frac18x^2+x^4B(x)$`, checks: [M('cos(x/2)', 3, '1-x**2/8')] },
      d: { text: r`$\ln(1+x^2)$`, answer: r`$x^2+x^4B(x)$`, checks: [M('log(1+x**2)', 3, 'x**2')] },
      e: { text: r`$\ln(1-x^2)$`, answer: r`$-x^2+x^4B(x)$`, checks: [M('log(1-x**2)', 3, '-x**2')] },
    },
  },
  {
    id: '11.15', answerSource: 'bok', mark: 'T', intro: r`Finn Maclaurinutvecklingen av ordning 2 av följande funktioner. Ange resttermen som $x^nB(x)$ med lämpligt $n$ och $B(x)$ begränsad i en omgivning av $x=0$:`,
    tip: r`$\sqrt a=a^{1/2}$, $1/a=a^{-1}$.`,
    parts: {
      a: { text: r`$\sqrt{1+x}$`, answer: r`$1+\frac12x-\frac18x^2+x^3B(x)$`, checks: [M('sqrt(1+x)', 2, '1+x/2-x**2/8')] },
      b: { text: r`$\frac{1}{1+x}$`, answer: r`$1-x+x^2+x^3B(x)$`, checks: [M('1/(1+x)', 2, '1-x+x**2')] },
      c: { text: r`$(1+x)^{1/3}$`, answer: r`$1+\frac13x-\frac19x^2+x^3B(x)$`, checks: [M('(1+x)**Rational(1,3)', 2, '1+x/3-x**2/9')] },
      d: { text: r`$\sqrt{1-\frac x2}$`, answer: r`$1-\frac14x-\frac{1}{32}x^2+x^3B(x)$`, checks: [M('sqrt(1-x/2)', 2, '1-x/4-x**2/32')] },
      e: { text: r`$(1+x^2)^{1/3}$`, answer: r`$1+\frac13x^2+x^4B(x)$`, checks: [M('(1+x**2)**Rational(1,3)', 3, '1+x**2/3')] },
    },
  },
  {
    id: '11.16', answerSource: 'bok', mark: 'L', intro: r`Finn Maclaurinutvecklingen av ordning 4 av funktionerna nedan. Ange resttermen som $x^nB(x)$ med lämpligt $n$ och $B(x)$ begränsad i en omgivning av $x=0$:`,
    parts: {
      a: { text: r`$e^x(1-x^2)$`, answer: r`$1+x-\frac12x^2-\frac56x^3-\frac{11}{24}x^4+x^5B(x)$`, checks: [M('exp(x)*(1-x**2)', 4, '1+x-x**2/2-5*x**3/6-11*x**4/24')] },
      b: { text: r`$x\sin x$`, answer: r`$x^2-\frac16x^4+x^6B(x)$`, checks: [M('x*sin(x)', 5, 'x**2-x**4/6')] },
      c: { text: r`$x(\cos x-1)$`, answer: r`$-\frac12x^3+x^5B(x)$`, checks: [M('x*(cos(x)-1)', 4, '-x**3/2')] },
    },
  },
  {
    id: '11.17', answerSource: 'bok', mark: 'TL', intro: r`Finn Maclaurinutvecklingen av ordning 4 av funktionerna nedan. Ange resttermen som $x^nB(x)$ med lämpligt $n$ och $B(x)$ begränsad i en omgivning av $x=0$:`,
    tip: r`a) Utveckla $e^t$ lagom långt och ersätt $t$ med $x^2$. Utveckla $\cos x$ lagom långt. Multiplicera ihop de båda utvecklingarna och samla alla termer som innehåller faktorn $x^6$ i en restterm $x^6B(x)$.`,
    parts: {
      a: { text: r`$e^{x^2}\cos x$`, answer: r`$1+\frac12x^2+\frac{1}{24}x^4+x^6B(x)$`, checks: [M('exp(x**2)*cos(x)', 5, '1+x**2/2+x**4/24')] },
      b: { text: r`$\sin x\arctan x$`, answer: r`$x^2-\frac12x^4+x^6B(x)$`, checks: [M('sin(x)*atan(x)', 5, 'x**2-x**4/2')] },
      c: { text: r`$\ln(1+\cos x)$`, answer: r`$\ln2-\frac14x^2-\frac{1}{96}x^4+x^5B(x)$`, checks: [M('log(1+cos(x))', 4, 'log(2)-x**2/4-x**4/96')] },
    },
  },
  {
    id: '11.18', answerSource: 'bok', intro: r`Finn Maclaurinutvecklingen av ordning 4 av funktionerna nedan (restterm $x^nB(x)$):`,
    parts: {
      a: { text: r`$e^{\sin x}$`, answer: r`$1+x+\frac12x^2-\frac18x^4+x^5B(x)$`, checks: [M('exp(sin(x))', 4, '1+x+x**2/2-x**4/8')] },
      b: { text: r`$e^{\cos x}$`, answer: r`$e-\frac e2x^2+\frac e6x^4+x^6B(x)$`, checks: [M('exp(cos(x))', 5, 'E-E*x**2/2+E*x**4/6')] },
    },
  },
  { id: '11.19', answerSource: 'bok', intro: r`Vilket är Maclaurinpolynomet av ordning tre till $f(x)=x^3-5x^2+x-1$?`, answer: r`$p_3(x)=x^3-5x^2+x-1$ (Observera att $p_3(x)=f(x)$. Varför?)`, checks: [M('x**3-5*x**2+x-1', 3, 'x**3-5*x**2+x-1')] },
  { id: '11.20', answerSource: 'bok', mark: 'L', intro: r`Beräkna gränsvärdet $\displaystyle\lim_{x\to0}\frac{1-\cos x}{\ln(1+x)-x}$.`, answer: r`$-1$`, checks: [L('(1-cos(x))/(log(1+x)-x)', '-1')] },
  {
    id: '11.21', answerSource: 'bok', intro: r`Beräkna gränsvärdena`,
    parts: {
      a: { text: r`$\displaystyle\lim_{x\to0}\frac{e^x-1-x}{x^2}$`, answer: r`$\frac12$`, checks: [L('(exp(x)-1-x)/x**2', '1/2')] },
      b: { text: r`$\displaystyle\lim_{x\to0}\frac{x^3}{\sin2x-2x}$`, answer: r`$-\frac34$`, checks: [L('x**3/(sin(2*x)-2*x)', '-3/4')] },
    },
  },
  {
    id: '11.22', answerSource: 'bok', intro: r`Beräkna gränsvärdena`,
    parts: {
      a: { text: r`$\displaystyle\lim_{x\to0}\frac{\cos x-e^{x^2}}{x\sin x}$`, answer: r`$-\frac32$`, checks: [L('(cos(x)-exp(x**2))/(x*sin(x))', '-3/2')] },
      b: { text: r`$\displaystyle\lim_{x\to0}\frac{x+\ln(1-x)}{1-\sqrt{1-x^2}}$`, answer: r`$-1$`, checks: [L('(x+log(1-x))/(1-sqrt(1-x**2))', '-1')] },
      c: { text: r`$\displaystyle\lim_{x\to0}\frac{\sin x-\arctan x}{x(\cos2x-1)}$`, answer: r`$-\frac{1}{12}$`, checks: [L('(sin(x)-atan(x))/(x*(cos(2*x)-1))', '-1/12')] },
    },
  },
  { id: '11.30', answerSource: 'bok', mark: 'L', intro: r`Ange summan av serien $\displaystyle\sum_{k=0}^\infty\frac{1}{k!}$.`, answer: r`$e$`, checks: ["eq('Sum(1/factorial(k),(k,0,oo)).doit()', 'E')"] },
  {
    id: '11.31', answerSource: 'bok', intro: r`Ange summan av följande serier:`,
    parts: {
      a: { text: r`$\displaystyle\sum_{n=0}^\infty\frac{2^n}{n!}$`, answer: r`$e^2$`, checks: ["eq('Sum(2**k/factorial(k),(k,0,oo)).doit()', 'exp(2)')"] },
      b: { text: r`$\displaystyle\sum_{k=1}^\infty\frac{(-1)^{k-1}}{2k-1}$`, answer: r`$\pi/4$`, checks: ["num('Sum((-1)**(k-1)/(2*k-1),(k,1,oo)).evalf()', 0.785398, 1e-5)"] },
      c: { text: r`$\displaystyle\sum_{k=0}^\infty(-1)^k\frac{\pi^{2k}}{(2k)!}$`, answer: r`$-1$`, checks: ["eq('Sum((-1)**k*pi**(2*k)/factorial(2*k),(k,0,oo)).doit()', -1)"] },
      d: { text: r`$\displaystyle\sum_{k=0}^\infty(-1)^k\frac{\pi^{2k+1}}{6^{2k+1}(2k+1)!}$`, answer: r`$\frac12$`, checks: ["num('Sum((-1)**k*(pi/6)**(2*k+1)/factorial(2*k+1),(k,0,oo)).evalf()', 0.5, 1e-9)"] },
      e: { text: r`$\displaystyle\sum_{k=1}^\infty\frac{(-1)^{k-1}}{k}$`, answer: r`$\ln2$`, checks: ["num('Sum((-1)**(k-1)/k,(k,1,oo)).evalf()', 0.693147, 1e-5)"] },
    },
  },
  {
    id: '11.33', answerSource: 'bok', mark: 'L', intro: r`Bestäm Taylorpolynomet av angiven ordning $n$ till $f$ kring punkten $a$ då`,
    parts: {
      a: { text: r`$n=2$, $a=1$, $f(x)=\sqrt{1+x^2}$`, answer: r`$\sqrt2+\frac{1}{\sqrt2}(x-1)+\frac{1}{4\sqrt2}(x-1)^2$`, checks: [T('sqrt(1+x**2)', 1, 2, 'sqrt(2)+(x-1)/sqrt(2)+(x-1)**2/(4*sqrt(2))')] },
      b: { text: r`$n=3$, $a=1$, $f(x)=e^x$`, answer: r`$e+e(x-1)+\frac e2(x-1)^2+\frac e6(x-1)^3$`, checks: [T('exp(x)', 1, 3, 'E+E*(x-1)+E*(x-1)**2/2+E*(x-1)**3/6')] },
      c: { text: r`$n=2$, $a=2$, $f(x)=\sqrt x$`, answer: r`$\sqrt2+\frac{\sqrt2}{4}(x-2)-\frac{\sqrt2}{32}(x-2)^2$`, checks: [T('sqrt(x)', 2, 2, 'sqrt(2)+sqrt(2)*(x-2)/4-sqrt(2)*(x-2)**2/32')] },
      d: { text: r`$n=2$, $a=0$, $f(x)=\tan x$`, answer: r`$x$`, checks: [M('tan(x)', 2, 'x')] },
      e: { text: r`$n=3$, $a=-1$, $f(x)=\arctan x$`, answer: r`$-\frac\pi4+\frac12(x+1)+\frac14(x+1)^2+\frac{1}{12}(x+1)^3$`, checks: [T('atan(x)', -1, 3, '-pi/4+(x+1)/2+(x+1)**2/4+(x+1)**3/12')] },
    },
  },
  {
    id: '11.43', answerSource: 'bok', intro: r`En funktion $f$ har följande Maclaurinutveckling: $f(x)=1-\frac14x^2-\frac14x^3-\frac{5}{32}x^4-\frac{1}{12}x^5+x^6B(x)$, där $B(x)$ är en begränsad funktion i en omgivning av $x=0$. Vad är $f'(0)$ samt $f^{(5)}(0)$?`,
    answer: r`$f'(0)=0$, $f^{(5)}(0)=-10$`, checks: ["eq('-factorial(5)/12', -10)"],
  },
]
