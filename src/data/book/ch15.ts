import type { BookTask } from './types'

const r = String.raw
/** sympy-kontroll: lösningen satisfierar DE:n (lhs = 0). y(x), y1 = y', y2 = y''. */
const O = (lhs: string, sol: string) => `ode_ok('${lhs.replace(/\by\b/g, 'y(x)').replace(/\by2\b/g, 'Derivative(y(x),x,2)').replace(/\by1\b/g, 'Derivative(y(x),x)')}', '${sol}')`
/** Begynnelsevärde: uttryck (i x) vid x = a */
const V = (expr: string, a: string | number, val: string | number) => `eq('(${expr}).subs(x, ${a})', '${val}')`
const VD = (expr: string, a: string | number, val: string | number) => `eq('diff(${expr}, x).subs(x, ${a})', '${val}')`

/** Kapitel 15 – Differentialekvationer (uppgifter i kursplanen). */
export const CH15: BookTask[] = [
  {
    id: '15.1', answerSource: 'bok', mark: 'L', intro: r`Bestäm den allmänna lösningen till ekvationen $y'=x^2-e^{-x}$. Bestäm också den lösning som uppfyller begynnelsevillkoret $y(0)=1$.`,
    answer: r`$y=\frac13x^3+e^{-x}+C$ respektive $y=\frac13x^3+e^{-x}$`, checks: [O('y1-(x**2-exp(-x))', 'x**3/3+exp(-x)+C1'), V('x**3/3+exp(-x)', 0, 1)],
  },
  { id: '15.2', answerSource: 'bok', intro: r`Lös begynnelsevärdesproblemet $xy'=\ln x$, $y(1)=2$.`, answer: r`$y=\frac12(\ln x)^2+2$`, checks: [O('x*y1-log(x)', 'log(x)**2/2+2'), V('log(x)**2/2+2', 1, 2)] },
  { id: '15.3', answerSource: 'bok', mark: 'L', intro: r`Lös differentialekvationen $y'-2y=3$.`, answer: r`$y=-\frac32+Ce^{2x}$, där $C$ är en godtycklig konstant.`, checks: [O('y1-2*y-3', '-Rational(3,2)+C1*exp(2*x)')] },
  {
    id: '15.4', answerSource: 'bok', intro: r`Lös differentialekvationerna`,
    parts: {
      a: { text: r`$y'+2y=0$`, answer: r`$y=Ce^{-2x}$` },
      b: { text: r`$y'-3y=0$`, answer: r`$y=Ce^{3x}$` },
      c: { text: r`$y'-ky=0$`, answer: r`$y=Ce^{kx}$` },
      d: { text: r`$y'+xy=0$`, answer: r`$y=Ce^{-x^2/2}$`, checks: [O('y1+x*y', 'C1*exp(-x**2/2)')] },
    },
  },
  {
    id: '15.5', answerSource: 'bok', intro: r`Lös differentialekvationerna`,
    parts: {
      a: { text: r`$y'+2y=1$`, answer: r`$y=\frac12+Ce^{-2x}$`, checks: [O('y1+2*y-1', 'Rational(1,2)+C1*exp(-2*x)')] },
      b: { text: r`$y'-3y=1$`, answer: r`$y=-\frac13+Ce^{3x}$`, checks: [O('y1-3*y-1', '-Rational(1,3)+C1*exp(3*x)')] },
      c: { text: r`$y'+(\cos x)y=4\cos x$`, answer: r`$y=4+Ce^{-\sin x}$`, checks: [O('y1+cos(x)*y-4*cos(x)', '4+C1*exp(-sin(x))')] },
      d: { text: r`$y'+xy=x$`, answer: r`$y=1+Ce^{-x^2/2}$`, checks: [O('y1+x*y-x', '1+C1*exp(-x**2/2)')] },
    },
  },
  { id: '15.6', answerSource: 'bok', mark: 'L', intro: r`Lös begynnelsevärdesproblemet $(1+x^2)y'-xy=x$, $y(0)=2$.`, answer: r`$y=-1+3\sqrt{1+x^2}$`, checks: [O('(1+x**2)*y1-x*y-x', '-1+3*sqrt(1+x**2)'), V('-1+3*sqrt(1+x**2)', 0, 2)] },
  {
    id: '15.7', answerSource: 'bok', intro: r`Lös ekvationerna`,
    parts: {
      a: { text: r`$y'+2xy=0$`, answer: r`$y=Ce^{-x^2}$` },
      b: { text: r`$xy'+10y=\ln x$, $x>0$`, answer: r`$y=\frac{1}{10}\ln x-\frac{1}{100}+Cx^{-10}$`, checks: [O('x*y1+10*y-log(x)', 'log(x)/10-Rational(1,100)+C1*x**(-10)')] },
      c: { text: r`$y'+y\cot x=\tan^2x$, $0<x<\frac\pi2$`, answer: r`$y=\frac{2}{\sin2x}+\cot x+\frac{C}{\sin x}$`, checks: [O('y1+y*cot(x)-tan(x)**2', '2/sin(2*x)+cot(x)+C1/sin(x)')] },
    },
  },
  {
    id: '15.8', answerSource: 'bok', intro: r`Lös ekvationerna`,
    parts: {
      a: { text: r`$y'+x^2y=x^2$, $y(0)=2$`, answer: r`$y=1+e^{-x^3/3}$`, checks: [O('y1+x**2*y-x**2', '1+exp(-x**3/3)'), V('1+exp(-x**3/3)', 0, 2)] },
      b: { text: r`$(1-x^2)y'+xy=x$, $y(0)=3$, $|x|<1$`, answer: r`$y=1+2\sqrt{1-x^2}$`, checks: ["ode_ok('(1-x**2)*Derivative(y(x),x)+x*y(x)-x', '1+2*sqrt(1-x**2)', domain=(-0.9, 0.9))", V('1+2*sqrt(1-x**2)', 0, 3)] },
      c: { text: r`$(1+x^2)y'-2xy=(1+x^2)\arctan x$, $y(1)=2$`, answer: r`$y=(1+x^2)\left(\frac12\arctan^2x+1-\frac{\pi^2}{32}\right)$`, checks: [O('(1+x**2)*y1-2*x*y-(1+x**2)*atan(x)', '(1+x**2)*(atan(x)**2/2+1-pi**2/32)'), V('(1+x**2)*(atan(x)**2/2+1-pi**2/32)', 1, 2)] },
      d: { text: r`$(x+1)(x+2)y'-y=1$, $y(0)=2$, $x>-1$`, answer: r`$y=\frac{5x+4}{x+2}$`, checks: [O('(x+1)*(x+2)*y1-y-1', '(5*x+4)/(x+2)'), V('(5*x+4)/(x+2)', 0, 2)] },
    },
  },
  {
    id: '15.10', answerSource: 'bok', mark: 'T', intro: r`I en viss bakteriepopulation ändras antalet bakterier med en hastighet som är proportionell mot antalet bakterier. Proportionalitetskonstanten är $0{,}1$ h$^{-1}$. Antalet bakterier vid tiden noll är 1000. a) Ställ upp en differentialekvation för antalet bakterier vid tiden $t$ och lös den. Beräkna också antalet bakterier vid tiden $t=6$ h. b) Beräkna den tid det tar för bakteriepopulationen att fördubblas.`,
    answer: r`a) $\frac{dy}{dt}=ky$, där $y(t)$ är antalet bakterier vid tiden $t$, och $k=0{,}1$ h$^{-1}$. Lösningen är $y=1000e^{kt}$. Efter 6 timmar finns $1000e^{0{,}6}\approx1800$ bakterier. b) Bakteriepopulationen fördubblas på tiden $10\ln2$ h $\approx6{,}9$ h.`,
    tip: r`Studera Exempel 15.7 på sidan 361 i läroboken.`, checks: ["num('1000*exp(0.6)', 1822, 1)", "num('10*log(2)', 6.93, 0.01)"],
  },
  {
    id: '15.11', answerSource: 'bok', intro: r`Vid ett visst radioaktivt ämnes sönderfall är ändringen av mängden per tidsenhet proportionell mot mängden av ämnet med proportionalitetskonstanten $-\lambda$, där $\lambda=0{,}2$ s$^{-1}$. Vid tiden noll fanns 3 g av ämnet. a) Ställ upp en differentialekvation för mängden av ämnet och beräkna hur mycket av ämnet som finns kvar efter 10 s. b) Bestäm hur lång tid det tar tills hälften av ämnet återstår (den så kallade halveringstiden).`,
    answer: r`a) $\frac{dm}{dt}=-\lambda m$, där $m(t)$ är mängden av ämnet vid tiden $t$. Efter 10 s återstår $3e^{-2}$ g $\approx0{,}4$ g. b) Halveringstiden är $5\ln2$ s $\approx3{,}5$ s.`,
  },
  { id: '15.12', answerSource: 'bok', mark: 'T', intro: r`En kropp med massan $m$ rör sig längs en rät linje med hastigheten $v(t)$, där $t$ är tiden. Kroppen utsätts för en bromsande kraft lika med $-k\cdot v(t)$, där $k$ är en positiv konstant. Enligt kraftekvationen gäller det då att $m\cdot\frac{dv}{dt}=-k\cdot v(t)$. Bestäm hastigheten som funktion av tiden, om $v(0)=v_0$.`, answer: r`Hastigheten vid tiden $t$ är $v(t)=v_0e^{-kt/m}$.`, tip: r`Skriv eventuellt först om differentialekvationen som $v'+\frac kmv=0$.` },
  { id: '15.13', answerSource: 'bok', intro: r`Vid urladdning av en kondensator med kapacitans $C$ över en resistor med resistans $R$ gäller för kondensatorns spänning $u$ vid tiden $t$ att $u=-RC\frac{du}{dt}$. Lös differentialekvationen, om $u(0)=E$, och bestäm hur lång tid det tar tills kondensatorspänningen har gått ner till hälften av sitt startvärde.`, answer: r`Lösningen till differentialekvationen är $u=Ee^{-t/RC}$. Efter tiden $RC\ln2$ har spänningen halverats.` },
  { id: '15.14', answerSource: 'bok', intro: r`Strömmen $i$ i kretsen i figuren (spänningskälla $E$, resistans $R$, induktans $L$) kan beskrivas med differentialekvationen $E=Ri+L\frac{di}{dt}$, när strömbrytaren sluts vid tiden $t=0$. Beräkna $i$, om $i=0$ när $t=0$.`, answer: r`$i(t)=\frac ER\left(1-e^{-\frac{Rt}{L}}\right)$` },
  { id: '15.15', answerSource: 'bok', mark: 'T', intro: r`En bassäng som rymmer 3000 liter är fylld med förorenat vatten. Föroreningens koncentration är 5%. Man börjar tappa ut det förorenade vattnet med en hastighet av 50 ℓ/min. Samtidigt fylls det på rent vatten med samma hastighet. Hur lång tid tar det innan föroreningens koncentration gått ner till 1%? (Under hela förloppet sker omröring i bassängen, varför man kan anta att vätskan är fullständigt blandad.)`, answer: r`$\ln5$ timmar`, tip: r`Studera Exempel 15.9 på sidan 363 i läroboken.`, checks: ["num('60*log(5)/60', 1.609, 0.001)"] },
  { id: '15.16', answerSource: 'bok', intro: r`En fabrik släppte under 40 års tid ut förorening i marken med den konstanta hastigheten 3 ton per år. Samtidigt avdunstade föroreningen med en hastighet som i varje ögonblick var proportionell mot den mängd förorening som fanns i marken. Mätningar visade att avdunstningen var 5% år$^{-1}$. Hur stor mängd förorening fanns enligt denna modell i marken då utsläppen upphörde? Vi förutsätter att inga föroreningar fanns då utsläppen började.`, answer: r`$60(1-e^{-2})$ ton`, checks: ["eq('60*(1-exp(-Rational(5,100)*40))', '60*(1-exp(-2))')"] },
  { id: '15.17', answerSource: 'bok', intro: r`Jultomten har infört en ny modell för lagerhållning av julklappar. Hans lager innehåller alltid $M$ julklappar varav hälften är mjuka och hälften hårda vid säsongsstarten. Därefter är leveranshastigheten av mjuka klappar ut från lagret proportionell mot antalet mjuka klappar i lagret (proportionalitetskonstant $2K$), medan leveranshastigheten av mjuka klappar in till lagret från fabriken är proportionell mot antalet hårda klappar i lagret (proportionalitetskonstant $K$). Ange antalet mjuka klappar i lagret som funktion av tiden och visa utvecklingen med hjälp av en figur.`, answer: r`$M\left(\frac13+\frac16e^{-3Kt}\right)$ – avtar från $M/2$ mot $M/3$.` },
  {
    id: '15.19', answerSource: 'bok', mark: 'L', intro: r`Lös differentialekvationerna nedan. I samtliga fall ska gälla att $y(1)=2$:`,
    parts: {
      a: { text: r`$2y\cdot y'=3x^2$`, answer: r`$y=\sqrt{x^3+3}$`, checks: [O('2*y*y1-3*x**2', 'sqrt(x**3+3)'), V('sqrt(x**3+3)', 1, 2)] },
      b: { text: r`$3y^2\cdot y'=2x$`, answer: r`$y=(x^2+7)^{1/3}$`, checks: [O('3*y**2*y1-2*x', '(x**2+7)**Rational(1,3)'), V('(x**2+7)**Rational(1,3)', 1, 2)] },
      c: { text: r`$y\cdot y'=3x^2$`, answer: r`$y=\sqrt{2x^3+2}$`, checks: [O('y*y1-3*x**2', 'sqrt(2*x**3+2)'), V('sqrt(2*x**3+2)', 1, 2)] },
      d: { text: r`$y^2\cdot y'=2x$`, answer: r`$y=(3x^2+5)^{1/3}$`, checks: [O('y**2*y1-2*x', '(3*x**2+5)**Rational(1,3)'), V('(3*x**2+5)**Rational(1,3)', 1, 2)] },
    },
  },
  {
    id: '15.20', answerSource: 'bok', mark: 'L', intro: r`Lös ekvationerna`,
    parts: {
      a: { text: r`$4xy'y^3=1$, $y(1)=1$`, answer: r`$y=\sqrt[4]{1+\ln x}$, $x>e^{-1}$`, checks: [O('4*x*y1*y**3-1', '(1+log(x))**Rational(1,4)'), V('(1+log(x))**Rational(1,4)', 1, 1)] },
      b: { text: r`$xy'+y^2=1$, $x>0$`, answer: r`$y=\frac{Cx^2-1}{Cx^2+1}$ och $y=1$`, checks: [O('x*y1+y**2-1', '(C1*x**2-1)/(C1*x**2+1)')] },
    },
  },
  {
    id: '15.21', answerSource: 'bok', intro: r`Lös ekvationerna`,
    parts: {
      a: { text: r`$yy'=-x$`, answer: r`$y^2=C-x^2$` },
      b: { text: r`$y'=e^{x+y}$`, answer: r`$y=-\ln(C-e^x)$`, checks: [O('y1-exp(x+y)', '-log(C1-exp(x))')] },
      c: { text: r`$y'=y^2$, $y(1)=1$`, answer: r`$y=\frac{1}{2-x}$`, checks: [O('y1-y**2', '1/(2-x)'), V('1/(2-x)', 1, 1)] },
      d: { text: r`$y'=y^2$, $y(1)=0$`, answer: r`$y=0$` },
      e: { text: r`$x^2y\frac{dy}{dx}=1+x^2$, $y(2)=2$`, answer: r`$y=\sqrt{2\left(x-\frac1x+\frac12\right)}$`, checks: [O('x**2*y*y1-(1+x**2)', 'sqrt(2*(x-1/x+Rational(1,2)))'), V('sqrt(2*(x-1/x+Rational(1,2)))', 2, 2)] },
    },
  },
  {
    id: '15.22', answerSource: 'bok', intro: r`Lös ekvationerna`,
    parts: {
      a: { text: r`$y'=(y^2-1)x$, $y(0)=0$`, answer: r`$y=\frac{1-e^{x^2}}{1+e^{x^2}}$`, checks: [O('y1-(y**2-1)*x', '(1-exp(x**2))/(1+exp(x**2))'), V('(1-exp(x**2))/(1+exp(x**2))', 0, 0)] },
      b: { text: r`$xy'=y^2-2y$, $y(1)=1$, $x\ge0$`, answer: r`$y=\frac{2}{1+x^2}$`, checks: [O('x*y1-(y**2-2*y)', '2/(1+x**2)'), V('2/(1+x**2)', 1, 1)] },
    },
  },
  {
    id: '15.23', answerSource: 'bok', intro: r`Nedanstående differentialekvationer ska inte lösas utan bara "sorteras". Ange för varje ekvation om den är linjär eller inte. Om den inte är linjär, ange då om den är separabel.`,
    parts: {
      a: { text: r`$y'+y=3$`, answer: r`linjär` },
      b: { text: r`$y'\cdot y=3$`, answer: r`ej linjär, separabel` },
      c: { text: r`$y'+x^2y=3$`, answer: r`linjär` },
      d: { text: r`$y'+y^2=3$`, answer: r`ej linjär, separabel` },
      e: { text: r`$xyy'=x^2+y^2$`, answer: r`ej linjär, ej separabel` },
      f: { text: r`$xyy'=e^y\sin x$`, answer: r`ej linjär, separabel` },
    },
  },
  { id: '15.27', answerSource: 'bok', intro: r`Teknologen T. observerade vid sitt julbad att det tog 4 minuter att tömma badkaret med ursprungligt vattendjup 7 dm. Då drog sig T. till minnes Torricellis lag, som i detta fall ger att vattendjupet minskar med en hastighet som i varje ögonblick är proportionell mot kvadratroten ur vattendjupet. Vilket värde skulle proportionalitetskonstanten få i detta fall?`, answer: r`Konstantens värde är $\frac{\sqrt7}{2}\sqrt{\text{dm}}$/min.`, checks: ["eq('2*sqrt(7)/4', 'sqrt(7)/2')"] },
  { id: '15.36', answerSource: 'bok', intro: r`Lös begynnelsevärdesproblemet $y''=4e^{2x}+x^2$, $y(0)=2$, $y'(0)=1$.`, answer: r`$y=e^{2x}+\frac{1}{12}x^4-x+1$`, checks: [O('y2-4*exp(2*x)-x**2', 'exp(2*x)+x**4/12-x+1'), V('exp(2*x)+x**4/12-x+1', 0, 2), VD('exp(2*x)+x**4/12-x+1', 0, 1)] },
  {
    id: '15.37', answerSource: 'bok', mark: 'L', intro: r`Lös ekvationerna`,
    parts: {
      a: { text: r`$y''-3y'+2y=0$`, answer: r`$y=Ae^x+Be^{2x}$`, checks: [O('y2-3*y1+2*y', 'C1*exp(x)+C2*exp(2*x)')] },
      b: { text: r`$y''-4y'+4y=0$`, answer: r`$y=(Ax+B)e^{2x}$`, checks: [O('y2-4*y1+4*y', '(C1*x+C2)*exp(2*x)')] },
      c: { text: r`$y''-6y'+10y=0$`, answer: r`$y=e^{3x}(A\cos x+B\sin x)$`, checks: [O('y2-6*y1+10*y', 'exp(3*x)*(C1*cos(x)+C2*sin(x))')] },
      d: { text: r`$y''-y'-2y=0$`, answer: r`$y=Ae^{-x}+Be^{2x}$`, checks: [O('y2-y1-2*y', 'C1*exp(-x)+C2*exp(2*x)')] },
      e: { text: r`$y''-10y'+61y=0$`, answer: r`$y=e^{5x}(A\cos6x+B\sin6x)$`, checks: [O('y2-10*y1+61*y', 'exp(5*x)*(C1*cos(6*x)+C2*sin(6*x))')] },
      f: { text: r`$y''-2y'+5y=0$`, answer: r`$y=e^x(A\cos2x+B\sin2x)$`, checks: [O('y2-2*y1+5*y', 'exp(x)*(C1*cos(2*x)+C2*sin(2*x))')] },
      g: { text: r`$y''+6y'+9y=0$`, answer: r`$y=(Ax+B)e^{-3x}$`, checks: [O('y2+6*y1+9*y', '(C1*x+C2)*exp(-3*x)')] },
    },
  },
  {
    id: '15.38', answerSource: 'bok', intro: r`Lös begynnelsevärdesproblemen`,
    parts: {
      a: { text: r`$y''-4y=0$, $y(0)=0$, $y'(0)=1$`, answer: r`$y=\frac14(e^{2x}-e^{-2x})$`, checks: [O('y2-4*y', '(exp(2*x)-exp(-2*x))/4'), V('(exp(2*x)-exp(-2*x))/4', 0, 0), VD('(exp(2*x)-exp(-2*x))/4', 0, 1)] },
      b: { text: r`$y''+6y'+9y=0$, $y(0)=-1$, $y'(0)=1$`, answer: r`$y=-(2x+1)e^{-3x}$`, checks: [O('y2+6*y1+9*y', '-(2*x+1)*exp(-3*x)'), V('-(2*x+1)*exp(-3*x)', 0, -1), VD('-(2*x+1)*exp(-3*x)', 0, 1)] },
    },
  },
  {
    id: '15.39', answerSource: 'bok', intro: r`Lös randvärdesproblemen`,
    parts: {
      a: { text: r`$y''+4y=0$, $y(0)=y(\frac\pi2)=0$`, answer: r`$y=A\sin2x$` },
      b: { text: r`$y''+4y=0$, $y'(0)=y'(\frac\pi2)=0$`, answer: r`$y=A\cos2x$` },
    },
  },
  { id: '15.40', answerSource: 'bok', mark: 'L', intro: r`Bestäm alla reella tal $\lambda$ för vilka randvärdesproblemet $y''+\lambda y=0$, $y(0)=y(\ell)=0$, $\ell>0$, har en icke-trivial lösning $y=y(x)$ (dvs. en lösning som inte är identiskt lika med noll). Ange också motsvarande lösningar.`, answer: r`$\lambda=\frac{n^2\pi^2}{\ell^2}$, $n=1,2,\dots$ Motsvarande lösningar är $y=A\sin\frac{n\pi}{\ell}x$.` },
  { id: '15.41', answerSource: 'bok', intro: r`Bestäm alla reella tal $\lambda$ för vilka randvärdesproblemet $y''+\lambda y=0$, $y'(0)=y'(\ell)=0$, $\ell>0$, har en icke-trivial lösning. Ange också motsvarande lösningar.`, answer: r`$\lambda=\frac{n^2\pi^2}{\ell^2}$, $n=0,1,2,\dots$ Motsvarande lösningar är $y=A\cos\frac{n\pi}{\ell}x$.` },
  { id: '15.42', answerSource: 'bok', intro: r`Rörelseekvationen för en plan matematisk pendel (punktformig massa i viktlös tråd av längden $L$ m) är $\frac{d^2\alpha}{dt^2}+\frac gL\sin\alpha=0$. För små utslag görs approximationen $\sin\alpha\approx\alpha$, vilket ger $\frac{d^2\alpha}{dt^2}+\frac gL\alpha=0$. Bestäm pendelns läge efter en sekund om $L=0{,}2$ m och om pendeln vid startögonblicket har utslagsvinkeln 3° och hastigheten 0 m/s.`, answer: r`$\alpha=\frac{\pi}{60}\cos\sqrt{5g}$, som är ungefär $2{,}26°$.` },
  { id: '15.43', answerSource: 'bok', intro: r`Ett fjädrande och dämpat system har rörelseekvationen $y''+\frac cmy'+\frac kmy=0$ om det inte är utsatt för någon yttre kraft ($m$ massa, $c$ dämpningskonstant, $k$ fjäderkonstant). Dämpningen kallas kritisk om karakteristiska polynomet har dubbelrot. Ange relationen mellan $m$, $c$ och $k$ för kritisk dämpning. Lös ekvationen för detta fall och ange hur många extremvärden lösningskurvan har.`, answer: r`Villkoret för kritisk dämpning är $\frac{c}{2m}=\sqrt{\frac km}$. Lösningen blir i detta fall $y=(At+B)e^{-\frac{c}{2m}t}$, som har precis ett extremvärde om $A\ne0$, annars inget.` },
  { id: '15.44', answerSource: 'bok', mark: 'T', intro: r`Betrakta en RLC-krets där $C=0{,}8\ \mu$F och $L=0{,}2$ H. Hur stor skall resistansen $R$ väljas för att dämpningen i kretsen skall bli kritisk?`, answer: r`$R=1$ kΩ`, tip: r`Strömmen $i$ uppfyller differentialekvationen $L\frac{d^2i}{dt^2}+R\frac{di}{dt}+\frac1Ci=0$.`, checks: ["num('2*sqrt(0.2/0.8e-6)', 1000, 1e-6)"] },
  {
    id: '15.45', answerSource: 'bok', mark: 'L', intro: r`a) Bestäm alla reella lösningar till ekvationen $y''+4y=x^2$. b) Bestäm den lösning till ekvationen i a) som uppfyller begynnelsevillkoren $y(0)=y'(0)=0$.`,
    answer: r`a) $y=A\cos2x+B\sin2x+\frac14x^2-\frac18$, $A$ och $B$ reella. b) $y=\frac18\cos2x+\frac14x^2-\frac18$`,
    checks: [O('y2+4*y-x**2', 'C1*cos(2*x)+C2*sin(2*x)+x**2/4-Rational(1,8)'), V('cos(2*x)/8+x**2/4-Rational(1,8)', 0, 0), VD('cos(2*x)/8+x**2/4-Rational(1,8)', 0, 0)],
  },
  { id: '15.46', answerSource: 'bok', mark: 'L', intro: r`Ange alla reella lösningar till differentialekvationen $y''+4y'=x+1$.`, answer: r`$y=A+Be^{-4x}+\frac18x^2+\frac{3}{16}x$, $A$ och $B$ reella.`, checks: [O('y2+4*y1-x-1', 'C1+C2*exp(-4*x)+x**2/8+3*x/16')] },
  {
    id: '15.47', answerSource: 'bok', intro: r`Lös följande ekvationer:`,
    parts: {
      a: { text: r`$y''-3y'+2y=6$`, answer: r`$y=Ae^x+Be^{2x}+3$`, checks: [O('y2-3*y1+2*y-6', 'C1*exp(x)+C2*exp(2*x)+3')] },
      b: { text: r`$y''-3y'+2y=x^2$`, answer: r`$y=Ae^x+Be^{2x}+\frac12x^2+\frac32x+\frac74$`, checks: [O('y2-3*y1+2*y-x**2', 'C1*exp(x)+C2*exp(2*x)+x**2/2+3*x/2+Rational(7,4)')] },
      c: { text: r`$y''+3y'+2y=x^3+x+1$`, answer: r`$y=Ae^{-x}+Be^{-2x}+\frac18(4x^3-18x^2+46x-47)$`, checks: [O('y2+3*y1+2*y-(x**3+x+1)', 'C1*exp(-x)+C2*exp(-2*x)+(4*x**3-18*x**2+46*x-47)/8')] },
      d: { text: r`$y''+2y'=x^2+1$`, answer: r`$y=Ae^{-2x}+B+\frac16x^3-\frac14x^2+\frac34x$`, checks: [O('y2+2*y1-(x**2+1)', 'C1*exp(-2*x)+C2+x**3/6-x**2/4+3*x/4')] },
    },
  },
  { id: '15.48', answerSource: 'bok', mark: 'L', intro: r`Lös differentialekvationen $y''+3y'+2y=(x+1)e^{-3x}$.`, answer: r`$y=Ae^{-x}+Be^{-2x}+e^{-3x}\left(\frac12x+\frac54\right)$`, checks: [O('y2+3*y1+2*y-(x+1)*exp(-3*x)', 'C1*exp(-x)+C2*exp(-2*x)+exp(-3*x)*(x/2+Rational(5,4))')] },
  {
    id: '15.49', answerSource: 'bok', intro: r`Lös följande ekvationer:`,
    parts: {
      a: { text: r`$y''-3y'+2y=e^{5x}$`, answer: r`$y=Ae^x+Be^{2x}+\frac{1}{12}e^{5x}$`, checks: [O('y2-3*y1+2*y-exp(5*x)', 'C1*exp(x)+C2*exp(2*x)+exp(5*x)/12')] },
      b: { text: r`$y''-3y'+2y=e^{2x}$`, answer: r`$y=Ae^x+Be^{2x}+xe^{2x}$`, checks: [O('y2-3*y1+2*y-exp(2*x)', 'C1*exp(x)+C2*exp(2*x)+x*exp(2*x)')] },
      c: { text: r`$y''+6y'+9y=4e^{-x}$, $y(0)=2$, $y'(0)=-2$`, answer: r`$y=(1+2x)e^{-3x}+e^{-x}$`, checks: [O('y2+6*y1+9*y-4*exp(-x)', '(1+2*x)*exp(-3*x)+exp(-x)'), V('(1+2*x)*exp(-3*x)+exp(-x)', 0, 2), VD('(1+2*x)*exp(-3*x)+exp(-x)', 0, -2)] },
      d: { text: r`$y''+2y'+y=xe^{-x}$, $y(0)=1$, $y'(0)=0$`, answer: r`$y=\left(1+x+\frac16x^3\right)e^{-x}$`, checks: [O('y2+2*y1+y-x*exp(-x)', '(1+x+x**3/6)*exp(-x)'), V('(1+x+x**3/6)*exp(-x)', 0, 1), VD('(1+x+x**3/6)*exp(-x)', 0, 0)] },
    },
  },
  { id: '15.50', answerSource: 'bok', mark: 'L', intro: r`Lös ekvationen $y''+2y'+y=e^x+e^{-x}$.`, answer: r`$y=(Ax+B)e^{-x}+\frac14e^x+\frac12x^2e^{-x}$`, checks: [O('y2+2*y1+y-exp(x)-exp(-x)', '(C1*x+C2)*exp(-x)+exp(x)/4+x**2*exp(-x)/2')] },
  { id: '15.51', answerSource: 'bok', intro: r`Lös begynnelsevärdesproblemet $y''-3y'-4y=5e^{-x}+4x$, $y(0)=1$, $y'(0)=-1$.`, answer: r`$y=\frac14(e^{4x}+3)-x(1+e^{-x})$`, checks: [O('y2-3*y1-4*y-5*exp(-x)-4*x', '(exp(4*x)+3)/4-x*(1+exp(-x))'), V('(exp(4*x)+3)/4-x*(1+exp(-x))', 0, 1), VD('(exp(4*x)+3)/4-x*(1+exp(-x))', 0, -1)] },
  { id: '15.52', answerSource: 'bok', intro: r`Lös begynnelsevärdesproblemet $y''+2y'+y=xe^{-x}+1$, $y(0)=y'(0)=0$.`, answer: r`$y=e^{-x}\left(\frac16x^3-x-1\right)+1$`, checks: [O('y2+2*y1+y-x*exp(-x)-1', 'exp(-x)*(x**3/6-x-1)+1'), V('exp(-x)*(x**3/6-x-1)+1', 0, 0), VD('exp(-x)*(x**3/6-x-1)+1', 0, 0)] },
  { id: '15.53', answerSource: 'bok', mark: 'L', intro: r`Lös ekvationen $y''+4y=\sin2x$.`, answer: r`$y=A\cos2x+B\sin2x-\frac14x\cos2x$`, checks: [O('y2+4*y-sin(2*x)', 'C1*cos(2*x)+C2*sin(2*x)-x*cos(2*x)/4')] },
  {
    id: '15.54', answerSource: 'bok', intro: r`Lös ekvationerna`,
    parts: {
      a: { text: r`$y''-2y'-y=\sin3x$`, answer: r`$y=Ae^{(1-\sqrt2)x}+Be^{(1+\sqrt2)x}+\frac{1}{68}(3\cos3x-5\sin3x)$`, checks: [O('y2-2*y1-y-sin(3*x)', 'C1*exp((1-sqrt(2))*x)+C2*exp((1+sqrt(2))*x)+(3*cos(3*x)-5*sin(3*x))/68')] },
      b: { text: r`$y''+4y=2\sin x-\cos x$`, answer: r`$y=A\cos2x+B\sin2x+\frac23\sin x-\frac13\cos x$`, checks: [O('y2+4*y-2*sin(x)+cos(x)', 'C1*cos(2*x)+C2*sin(2*x)+2*sin(x)/3-cos(x)/3')] },
      c: { text: r`$y''-3y'+2y=\cos2x+\sin2x$`, answer: r`$y=Ae^x+Be^{2x}+\frac{1}{10}(\cos2x-2\sin2x)$`, checks: [O('y2-3*y1+2*y-cos(2*x)-sin(2*x)', 'C1*exp(x)+C2*exp(2*x)+(cos(2*x)-2*sin(2*x))/10')] },
      d: { text: r`$y''-2y'+5y=1+\sin x$`, answer: r`$y=(A\cos2x+B\sin2x)e^x+\frac15+\frac{1}{10}(\cos x+2\sin x)$`, checks: [O('y2-2*y1+5*y-1-sin(x)', '(C1*cos(2*x)+C2*sin(2*x))*exp(x)+Rational(1,5)+(cos(x)+2*sin(x))/10')] },
      e: { text: r`$y''+4y=1+\cos2x$`, answer: r`$y=A\cos2x+B\sin2x+\frac14+\frac x4\sin2x$`, checks: [O('y2+4*y-1-cos(2*x)', 'C1*cos(2*x)+C2*sin(2*x)+Rational(1,4)+x*sin(2*x)/4')] },
    },
  },
  {
    id: '15.55', answerSource: 'bok', mark: 'T', intro: r`Lös ekvationen $y''-3y'+2y=e^{3x}\cos x$.`, answer: r`$y=Ae^x+Be^{2x}+\frac{1}{10}e^{3x}(\cos x+3\sin x)$`,
    tip: r`Notera att $e^{3x}\cos x=\operatorname{Re}\left(e^{3x}(\cos x+i\sin x)\right)=\operatorname{Re}(e^{3x}\cdot e^{ix})=\operatorname{Re}(e^{(3+i)x})$. För att hitta en partikulärlösning kan det därför vara lämpligt att först studera hjälpekvationen $y''-3y'+2y=e^{(3+i)x}$.`,
    checks: [O('y2-3*y1+2*y-exp(3*x)*cos(x)', 'C1*exp(x)+C2*exp(2*x)+exp(3*x)*(cos(x)+3*sin(x))/10')],
  },
  {
    id: '15.56', answerSource: 'bok', intro: r`Lös ekvationerna`,
    parts: {
      a: { text: r`$y''-6y'+10y=e^{3x}\cos x$`, answer: r`$(A\cos x+B\sin x)e^{3x}+\frac12xe^{3x}\sin x$`, checks: [O('y2-6*y1+10*y-exp(3*x)*cos(x)', '(C1*cos(x)+C2*sin(x))*exp(3*x)+x*exp(3*x)*sin(x)/2')] },
      b: { text: r`$y''+6y'+8y=e^{-2x}\sin x$`, answer: r`$Ae^{-4x}+Be^{-2x}-\frac15e^{-2x}(2\cos x+\sin x)$`, checks: [O('y2+6*y1+8*y-exp(-2*x)*sin(x)', 'C1*exp(-4*x)+C2*exp(-2*x)-exp(-2*x)*(2*cos(x)+sin(x))/5')] },
    },
  },
  { id: '15.57', answerSource: 'bok', intro: r`I samband med beräkningar på tryckta balkars stabilitet uppkommer differentialekvationer på formen $y''+\frac14y=-\sin x$, $y(0)=y(\pi)=0$. Lös ekvationen.`, answer: r`$y=\frac43\sin x$`, checks: [O('y2+y/4+sin(x)', '4*sin(x)/3')] },
  { id: '15.58', answerSource: 'bok', intro: r`Ett visst tekniskt system beskrivs av differentialekvationen $y''+9y=\sin\alpha x$ (1), där $\alpha$ är en positiv parameter. Bestäm $\alpha$ så att högerledet blir en lösning till den homogena ekvationen. Lös sedan (1) för detta värde på $\alpha$.`, answer: r`$\alpha=3$ och $y=\left(A-\frac x6\right)\cos3x+B\sin3x$`, checks: [O('y2+9*y-sin(3*x)', '(C1-x/6)*cos(3*x)+C2*sin(3*x)')] },
  { id: '15.63', answerSource: 'bok', intro: r`I ett hus där värmesystemet plötsligt upphör att fungera är det rimligt att anta att temperatursänkningen per tidsenhet är proportionell mot skillnaden mellan inner- och yttertemperatur. Antag att yttertemperaturen är konstant $-10\,°$C. Om innertemperaturen var $20\,°$C när värmesystemet upphörde att fungera och $15\,°$C efter 2 timmar, vad är då temperaturen i huset efter ett dygn?`, answer: r`$(30(5/6)^{12}-10)\,°$C $\approx-6{,}6\,°$C`, checks: ["num('30*(5/6)**12-10', -6.64, 0.01)"] },
  { id: '15.71', answerSource: 'bok', intro: r`I en viss stad bor 100 000 människor. Befolkningsökningen är varje år 0,1% på grund av födelser och dödsfall. Varje år är nettoutflyttningen 500 människor. Gör en matematisk modell för befolkningsutvecklingen i form av en differentialekvation. Ange med hjälp av denna modell folkmängden som funktion av tiden. Hur länge dröjer det, enligt denna modell, tills folkmängden minskat med 10 000 människor?`, answer: r`Matematisk modell: $y'(t)=\frac{1}{1000}y(t)-500$, där $y(t)$ är folkmängden och $t$ är tiden mätt i år. Detta ger $y(t)=500000-400000e^{t/1000}$. Efter tiden $1000\ln\frac{41}{40}$ år har folkmängden minskat med 10 000 personer.`, checks: ["ode_ok('Derivative(y(t),t)-y(t)/1000+500', '500000-400000*exp(t/1000)', var='t')", "eq('500000-400000*exp(log(Rational(41,40)))', 90000)"] },
]
