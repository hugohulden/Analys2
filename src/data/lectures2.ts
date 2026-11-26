import type { Lecture } from './lectures'

const r = String.raw
const D = (f: string, a: string | number, b: string | number, ans: string) => `defint('${f}', '${a}', '${b}', '${ans}')`
const O = (lhs: string, sol: string, v = 'x') => `ode_ok('${lhs}', '${sol}'${v === 't' ? ", var='t'" : ''})`

/** Föreläsning 6–12 (lärarens anteckningar). */
export const LECTURES_2: Record<string, Lecture> = {
  F6: {
    id: 'F6', pages: 8, sections: '§13.5 Beräkning av integraler: insättningsformeln, analysens huvudsats',
    keyPoints: [
      r`$\int_a^bf(x)\,dx=$ "arean över $x$-axeln" $-$ "arean under $x$-axeln".`,
      r`**Insättningsformeln (Sats 13.7):** $\int_a^bf(x)\,dx=\big[F(x)\big]_a^b=F(b)-F(a)$, där $F$ är en primitiv till $f$.`,
      r`**Variabelbyte i bestämd integral:** byt gränserna ($x=1\Rightarrow t=\dots$). Vill du inte byta gränser måste du markera att de gäller $x$ (skriv $x=1$, $x=2$) och byta tillbaka innan insättning.`,
      r`**Partialintegration med gränser:** $\int_a^bf(x)g(x)\,dx=\big[F(x)g(x)\big]_a^b-\int_a^bF(x)g'(x)\,dx$.`,
      r`**Analysens huvudsats (Sats 13.6):** om $f$ är kontinuerlig är $S(x)=\int_a^xf(t)\,dt$ deriverbar och $S'(x)=f(x)$. Med kedjeregeln: $\frac{d}{dx}\int_a^{g(x)}f(t)\,dt=f(g(x))\,g'(x)$.`,
    ],
    notes: [
      { heading: 'Förra gången: integral som signerad area', body: r`Integralen fås genom att "täcka området" mellan grafen och $x$-axeln med rektanglar och summera (Riemannsumma), med så tunna rektanglar som möjligt. Därför är $\int_a^bf\,dx=$ "area över $x$-axeln" (där $f\ge0$) $-$ "area under $x$-axeln" (där $f\le0$).

**Exempel med graf:** om arean mellan $x=1$ och $x=5$ (ovanför axeln) är 2 och arean mellan $x=5$ och $x=9$ (under axeln) är 3, så är $\int_1^5f=2$, $\int_5^9f=-3$ och, med räkneregeln, $\int_1^9f=2+(-3)=-1$.` },
      { heading: 'Insättningsformeln (Sats 13.7)', body: r`Det är oftast jobbigt att bestämma $\int_a^bf\,dx$ geometriskt. Har $f$ en primitiv funktion $F$ använder vi den i stället:
$$\int_a^bf(x)\,dx=\big[F(x)\big]_a^b=F(b)-F(a).$$
Exempel: $\int_1^32x\,dx=\big[x^2\big]_1^3=9-1=8$.` },
      { heading: 'Insättningsformeln och variabelbyte', body: r`**Kom ihåg att ändra gränserna!** I $\int_1^22x(x^2-1)^4dx$ med $t=x^2-1$: $x=1\Rightarrow t=0$ och $x=2\Rightarrow t=3$. Då blir integralen $\int_0^3t^4dt=\frac{3^5}5$.

⚠️ Om du inte vill byta gränser, utan i stället byter tillbaka till $x$ innan du sätter in gränserna, måste du **markera** att gränserna gäller $x$: $\int_{x=1}^{x=2}t^4dt=\left[\frac{t^5}5\right]_{x=1}^{x=2}=\left[\frac{(x^2-1)^5}5\right]_1^2$.` },
      { heading: 'Insättningsformeln och partialintegration', body: r`$$\int_a^bf(x)g(x)\,dx=\big[F(x)g(x)\big]_a^b-\int_a^bF(x)g'(x)\,dx.$$
Gränserna sätts in både i "randtermen" $[F g]$ och i den nya integralen.` },
      { heading: 'Analysens huvudsats (Sats 13.6)', body: r`Tänk på en bestämd integral som en funktion som "samlar area". Exempel: $S(x)=\int_0^x2t\,dt$ är arean av en triangel med bas $x$ och höjd $2x$, alltså $S(x)=x^2$ – en primitiv till integranden $2x$! Ingen tillfällighet:

**Sats 13.6.** Om $f$ är kontinuerlig är $S(x)=\int_a^xf(t)\,dt$ deriverbar och $S'(x)=f(x)$, dvs. $S$ är en primitiv funktion till $f$.

**Bevisskiss:** $S(x+h)-S(x)$ är arean av en smal remsa med bas $h$ och höjd ungefär $f(x)$, alltså $\approx h\cdot f(x)$. Då är $S'(x)=\lim_{h\to0}\frac{S(x+h)-S(x)}h=f(x)$.

**Insättningsformeln följer:** om $F$ är en annan primitiv är $S(x)=F(x)+C$. $x=a$ ger $0=F(a)+C$, alltså $S(b)=F(b)-F(a)$.` },
      { heading: 'Derivera integraler', body: r`- $\frac{d}{dx}\int_1^x2t\,dt=2x$ (huvudsatsen direkt).
- $\frac{d}{dx}\int_{\sqrt\pi}^x\sin(t^2)\,dt=\sin(x^2)$ – den undre gränsen spelar ingen roll.
- **Sammansatt:** $T(x)=\int_3^{\ln x}\sin(t^2)\,dt=S(\ln x)$ med $S(y)=\int_3^y\sin(t^2)dt$. Kedjeregeln: $T'(x)=S'(\ln x)\cdot(\ln x)'=\sin\big((\ln x)^2\big)\cdot\frac1x$.
- **Variabel undre gräns:** $\int_x^12t\,dt=-\int_1^x2t\,dt$, så derivatan är $-2x$.` },
    ],
    examples: [
      { id: 'F6-e1', title: 'Insättningsformeln', q: r`Beräkna $\int_1^32x\,dx$.`, steps: [r`$x^2$ är en primitiv till $2x$: $\big[x^2\big]_1^3=3^2-1^2=8$.`], answer: r`$8$`, checks: [D('2*x', 1, 3, '8')] },
      { id: 'F6-e2', title: 'Variabelbyte – byt gränser', q: r`Beräkna $\int_1^22x(x^2-1)^4dx$.`, steps: [r`$\left[t=x^2-1,\ \frac{dt}{dx}=2x,\ dt=2x\,dx\right]$. Nya gränser: $x=1\Rightarrow t=0$, $x=2\Rightarrow t=3$.`, r`$\int_0^3t^4dt=\left[\frac{t^5}5\right]_0^3=\frac{3^5}5-0=\frac{243}5$.`], answer: r`$\frac{3^5}{5}=\frac{243}{5}$`, checks: [D('2*x*(x**2-1)**4', 1, 2, '243/5')] },
      { id: 'F6-e3', title: 'Partialintegration med gränser', q: r`Beräkna $\int_0^{\pi/2}x\cos x\,dx$.`, steps: [r`$\left[f=\cos x\Rightarrow F=\sin x;\ g=x\Rightarrow g'=1\right]$.`, r`$\big[\sin x\cdot x\big]_0^{\pi/2}-\int_0^{\pi/2}\sin x\,dx=\left(1\cdot\frac\pi2-0\right)-\big[-\cos x\big]_0^{\pi/2}$.`, r`$=\frac\pi2-\big(-\cos\frac\pi2+\cos0\big)=\frac\pi2-1$.`], answer: r`$\frac\pi2-1$`, checks: [D('x*cos(x)', 0, 'pi/2', 'pi/2-1')] },
      { id: 'F6-e4', title: 'Funktionen som samlar area', q: r`Låt $S(x)=\int_0^x2t\,dt$, $x\ge0$. Bestäm $S(3)$ och $S(x)$ geometriskt.`, steps: [r`Området under $y=2t$ från 0 till 3 är en triangel med bas 3 och höjd 6: $S(3)=\frac{3\cdot6}2=9$.`, r`Allmänt: bas $x$, höjd $2x$: $S(x)=\frac{x\cdot2x}2=x^2$ – en primitiv till $2x$.`], answer: r`$S(3)=9$, $S(x)=x^2$`, checks: ["eq('integrate(2*t,(t,0,x))', 'x**2')"] },
      { id: 'F6-e5', title: 'Derivera med kedjeregeln', q: r`Derivera $\int_3^{\ln x}\sin(t^2)\,dt$.`, steps: [r`Skriv $T(x)=S(\ln x)$ där $S(y)=\int_3^y\sin(t^2)\,dt$. Huvudsatsen: $S'(y)=\sin(y^2)$.`, r`Kedjeregeln: $T'(x)=S'(\ln x)\cdot\frac1x=\frac{\sin\big((\ln x)^2\big)}{x}$.`], answer: r`$\frac{\sin((\ln x)^2)}{x}$`, checks: ["eq('diff(Integral(sin(t**2),(t,3,log(x))),x).doit()', 'sin(log(x)**2)/x')"] },
      { id: 'F6-e6', title: 'Variabel undre gräns', q: r`Derivera $\int_x^12t\,dt$.`, steps: [r`Byt ordning på gränserna: $\int_x^12t\,dt=-\int_1^x2t\,dt$.`, r`Huvudsatsen: derivatan är $-2x$.`], answer: r`$-2x$`, checks: ["eq('diff(Integral(2*t,(t,x,1)),x).doit()', '-2*x')"] },
    ],
    quiz: [
      { id: 'F6-q1', area: 'int-teori', q: r`Vad säger insättningsformeln?`, a: r`$\int_a^bf(x)\,dx=F(b)-F(a)$ om $F'=f$.` },
      { id: 'F6-q2', area: 'int-variabelbyte', q: r`Vad måste du göra med gränserna vid variabelbyte i en bestämd integral?`, a: r`Byta dem ($x=a\Rightarrow t=g(a)$), eller markera att de gäller $x$ och byta tillbaka till $x$ innan insättning.` },
      { id: 'F6-q3', area: 'int-teori', q: r`Vad säger analysens huvudsats?`, a: r`Om $f$ är kontinuerlig är $S(x)=\int_a^xf(t)\,dt$ deriverbar och $S'(x)=f(x)$.` },
      { id: 'F6-q4', area: 'int-teori', q: r`$\frac{d}{dx}\int_a^{g(x)}f(t)\,dt=?$`, a: r`$f(g(x))\cdot g'(x)$ (huvudsatsen + kedjeregeln).` },
    ],
  },
  F7: {
    id: 'F7', pages: 12, sections: '§13.6 Generaliserade integraler',
    keyPoints: [
      r`En integral är **generaliserad** om intervallet är obegränsat ($\int_a^\infty$) eller om $f(x)\to\pm\infty$ nära någon punkt i $[a,b]$. Den hanteras med **gränsvärden**.`,
      r`$\int_0^1f\,dx=\lim_{\varepsilon\to0^+}\int_\varepsilon^1f\,dx$ och $\int_a^\infty f\,dx=\lim_{K\to\infty}\int_a^Kf\,dx$. Ändligt gränsvärde: **konvergent**. Saknas gränsvärdet eller blir det $\pm\infty$: **divergent**.`,
      r`**Sats 13.11:** $\int_a^\infty\frac{dx}{x^\alpha}$ konvergent $\iff\alpha>1$ och $\int_0^a\frac{dx}{x^\alpha}$ konvergent $\iff\alpha<1$ ($a>0$).`,
      r`**Jämförelsesatsen (Sats 13.10):** om $0\le f\le g$ gäller: $\int g$ konvergent ⇒ $\int f$ konvergent, och $\int f$ divergent ⇒ $\int g$ divergent. Kräver icke-negativa funktioner!`,
      r`**Sats 13.12:** om $f,g>0$ och $\lim_{x\to\infty}\frac{f(x)}{g(x)}=A$ med $A\ne0,\infty$ är $\int_a^\infty f$ och $\int_a^\infty g$ båda konvergenta eller båda divergenta.`,
      r`⚠️ $\int_{-1}^1\frac{dx}{x^2}\ne\left[-\frac1x\right]_{-1}^1$. Dela upp vid problempunkten!`,
    ],
    notes: [
      { heading: 'Repetition: huvudsatsen och insättningsformeln', body: r`$S(x)=\int_a^xf(t)\,dt$ är en primitiv till $f$, och $\int_a^bf\,dx=\big[F(x)\big]_a^b=F(b)-F(a)$. Exempel: $\int_1^e\frac{dx}x=\big[\ln x\big]_1^e=1$. Men vad blir arean under $\frac1x$ hela vägen ner till 0?` },
      { heading: 'Obegränsad funktion på begränsat intervall', body: r`$\int_0^1\frac{dx}x$: integranden $\to\infty$ då $x\to0$. Flytta $\varepsilon$ ("epsilon" – ett litet positivt tal) närmare och närmare 0 och se vad som händer med arean:
$$\int_0^1\frac{dx}x=\lim_{\varepsilon\to0^+}\big[\ln x\big]_\varepsilon^1=\lim_{\varepsilon\to0^+}(0-\ln\varepsilon)=\infty.$$
"Arean" är oändligt stor – integralen är **divergent**.

Men det blir inte alltid $\infty$: $\int_0^1\frac{dx}{\sqrt x}=\lim_{\varepsilon\to0^+}\big[2\sqrt x\big]_\varepsilon^1=\lim(2-2\sqrt\varepsilon)=2$. **Konvergent** med värdet 2.` },
      { heading: 'Obegränsade intervall', body: r`$\int_a^\infty f\,dx$ betyder $\lim_{K\to\infty}\int_a^Kf\,dx$: flytta $K$ närmare och närmare $\infty$ och kolla vad som händer med arean.
- $\int_1^\infty\frac{dx}x=\lim_{K\to\infty}\big[\ln x\big]_1^K=\lim\ln K=\infty$ – divergent.
- $\int_1^\infty\frac{dx}{x^2}=\lim_{K\to\infty}\left[-\frac1x\right]_1^K=\lim\left(1-\frac1K\right)=1$ – konvergent.

**Sats 13.11** sammanfattar: $\int_a^\infty x^{-\alpha}dx$ konvergerar $\iff\alpha>1$ och $\int_0^ax^{-\alpha}dx$ konvergerar $\iff\alpha<1$. Tänk på graferna: $\frac1{x^2}$ har mycket area mellan 0 och 1 men lite mellan 1 och $\infty$; $\frac1{\sqrt x}$ tvärtom.` },
      { heading: 'Jämförelsesatsen (Sats 13.10)', body: r`Antag att $f$ och $g$ är kontinuerliga på $]a,b[$ och att $0\le f(x)\le g(x)$ ($b=\infty$ är ok). Då gäller $0\le\int_a^bf\le\int_a^bg$, även som generaliserade integraler, och:
- $\int_a^bg$ konvergent ⇒ $\int_a^bf$ konvergent ("om den större är ändlig är den mindre det också")
- $\int_a^bf$ divergent ⇒ $\int_a^bg$ divergent ("om den mindre är oändlig är den större det också")

⚠️ Kräver **icke-negativa** funktioner.

**Exempel:** $x+x^2>x^2$ för $x>0$, så $0<\frac1{x+x^2}<\frac1{x^2}$. Eftersom $\int_1^\infty\frac{dx}{x^2}=1$ är $\int_1^\infty\frac{dx}{x+x^2}$ konvergent (med värde mellan 0 och 1).` },
      { heading: 'När jämförelsen pekar åt fel håll – Sats 13.12', body: r`$\int_4^\infty\frac{dx}{x^2-\sqrt x}$: här är $x^2-\sqrt x<x^2$, så $\frac1{x^2-\sqrt x}>\frac1{x^2}$ – **åt fel håll** för att visa konvergens med Sats 13.10.

Men för stora $x$ borde $\sqrt x$ inte ha så stor inverkan. **Sats 13.12:** om $f,g$ är positiva och kontinuerliga på $[a,\infty[$ och $\lim_{x\to\infty}\frac{f(x)}{g(x)}=A$, $A\ne0$, $A\ne\infty$, så är de båda integralerna antingen konvergenta eller divergenta.

Med $f=\frac1{x^2}$, $g=\frac1{x^2-\sqrt x}$: $\frac fg=\frac{x^2-\sqrt x}{x^2}=1-\frac1{x\sqrt x}\to1$. Eftersom $\int_4^\infty\frac{dx}{x^2}$ konvergerar gör $\int_4^\infty\frac{dx}{x^2-\sqrt x}$ det också.` },
      { heading: 'Generaliserad "på två sätt" – dela upp!', body: r`- $\int_0^\infty\frac{dx}{x^2}$ är generaliserad både vid 0 och vid $\infty$: dela upp i $\int_0^1+\int_1^\infty$. Båda måste konvergera.
- ⚠️ $\int_{-1}^1\frac{dx}{x^2}\ne\left[-\frac1x\right]_{-1}^1$. Integranden är obegränsad i $x=0$ *inne i* intervallet: dela upp i $\int_{-1}^0+\int_0^1$, som båda är generaliserade (och divergenta).` },
    ],
    examples: [
      { id: 'F7-e1', title: 'Divergent nära 0', q: r`Är $\int_0^1\frac{dx}x$ konvergent?`, steps: [r`$=\lim_{\varepsilon\to0^+}\int_\varepsilon^1\frac{dx}x=\lim_{\varepsilon\to0^+}\big[\ln x\big]_\varepsilon^1=\lim_{\varepsilon\to0^+}(0-\ln\varepsilon)$.`, r`$\ln\varepsilon\to-\infty$ då $\varepsilon\to0^+$, så gränsvärdet är $+\infty$.`], answer: r`Divergent` },
      { id: 'F7-e2', title: 'Konvergent nära 0', q: r`Beräkna $\int_0^1\frac{dx}{\sqrt x}$.`, steps: [r`$=\lim_{\varepsilon\to0^+}\big[2\sqrt x\big]_\varepsilon^1=\lim_{\varepsilon\to0^+}(2-2\sqrt\varepsilon)=2$.`], answer: r`Konvergent med värdet $2$`, checks: [D('1/sqrt(x)', 0, 1, '2')] },
      { id: 'F7-e3', title: 'Obegränsat intervall', q: r`Avgör a) $\int_1^\infty\frac{dx}x$, b) $\int_1^\infty\frac{dx}{x^2}$.`, steps: [r`a) $\lim_{K\to\infty}\big[\ln x\big]_1^K=\lim_{K\to\infty}\ln K=\infty$ – divergent.`, r`b) $\lim_{K\to\infty}\left[-\frac1x\right]_1^K=\lim_{K\to\infty}\left(-\frac1K+1\right)=1$ – konvergent.`], answer: r`a) divergent, b) konvergent med värdet $1$`, checks: [D('1/x**2', 1, 'oo', '1')] },
      { id: 'F7-e4', title: 'Jämförelse – divergens', q: r`Är $\int_2^\infty\frac{dx}{x-\sqrt x}$ konvergent eller divergent?`, steps: [r`Vi vet att $\int_2^\infty\frac{dx}x$ är divergent (Sats 13.11, $\alpha=1$).`, r`På $[2,\infty[$ är $0<x-\sqrt x<x$, så $\frac1{x-\sqrt x}>\frac1x>0$.`, r`Jämförelsesatsen: den mindre integralen är divergent, alltså är den större också det.`], answer: r`Divergent` },
      { id: 'F7-e5', title: 'Sats 13.12 – konvergens', q: r`Är $\int_4^\infty\frac{dx}{x^2-\sqrt x}$ konvergent?`, steps: [r`Jämförelse med $\frac1{x^2}$ ger olikheten åt fel håll ($\frac1{x^2-\sqrt x}>\frac1{x^2}$).`, r`Sats 13.12 med $f=\frac1{x^2}$, $g=\frac1{x^2-\sqrt x}$: $\lim_{x\to\infty}\frac fg=\lim\left(1-\frac1{x\sqrt x}\right)=1\ne0,\infty$.`, r`$\int_4^\infty\frac{dx}{x^2}$ konvergerar, alltså gör $\int_4^\infty\frac{dx}{x^2-\sqrt x}$ det också.`], answer: r`Konvergent` },
    ],
    quiz: [
      { id: 'F7-q1', area: 'int-generaliserade', q: r`Hur definieras $\int_a^\infty f(x)\,dx$?`, a: r`$\lim_{K\to\infty}\int_a^Kf(x)\,dx$. Ändligt gränsvärde: konvergent, annars divergent.` },
      { id: 'F7-q2', area: 'int-generaliserade', q: r`För vilka $\alpha$ konvergerar $\int_1^\infty x^{-\alpha}dx$ respektive $\int_0^1x^{-\alpha}dx$?`, a: r`$\alpha>1$ respektive $\alpha<1$ (Sats 13.11).` },
      { id: 'F7-q3', area: 'int-generaliserade', q: r`Vad säger jämförelsesatsen, och vad kräver den?`, a: r`$0\le f\le g$: $\int g$ konvergent ⇒ $\int f$ konvergent; $\int f$ divergent ⇒ $\int g$ divergent. Kräver icke-negativa funktioner.` },
      { id: 'F7-q4', area: 'int-generaliserade', q: r`Varför är $\int_{-1}^1\frac{dx}{x^2}=\left[-\frac1x\right]_{-1}^1=-2$ fel?`, a: r`Integranden är obegränsad i $x=0$, inne i intervallet. Man måste dela upp i två generaliserade integraler, och de är divergenta.` },
    ],
  },
  F8: {
    id: 'F8', pages: 15, sections: '§14.1 Plan area, §14.2 Volym, tillämpningar (ackumulering)',
    keyPoints: [
      r`**Areaelement:** $dA\approx(f(x)-g(x))\,dx$ (en tunn rektangel). Arean mellan kurvorna är $A=\int_a^b(f(x)-g(x))\,dx$ om $f\ge g$ på $[a,b]$.`,
      r`⚠️ **Area är aldrig negativ.** Får du något negativt har du gjort fel. Rita figur!`,
      r`**Volym med tvärsnitt:** $dV\approx A(x)\,dx$ (en tunn skiva), alltså $V=\int_a^bA(x)\,dx$.`,
      r`**Rotationskropp** (rotation av $y=f(x)$ kring $x$-axeln): varje tvärsnitt är en cirkelskiva med radie $f(x)$, alltså $A(x)=\pi(f(x))^2$ och $V=\int_a^b\pi(f(x))^2dx$. **Rörformeln ingår ej.**`,
      r`**Ackumulering:** sträcka $s=\int v(t)\,dt$, hastighet $v=\int a(t)\,dt$, energi $E=\int P(t)\,dt$. Man "samlar på sig" något längs en axel.`,
    ],
    notes: [
      { heading: 'Repetition: generaliserade integraler', body: r`$\int_a^bf\,dx$ där $a=-\infty$, $b=\infty$ eller $f\to\pm\infty$ nära en gräns löses med gränsvärden. Ändligt gränsvärde: konvergent, annars divergent.` },
      { heading: '§14.1 Plan area: areaelement', body: r`Från Riemannsummorna: $\int_a^bf\,dx$ fås från $\sum f(\xi_i)\Delta x_i$, en summa av rektanglar med höjd $f$ och bas $\Delta x$. Tänk på $f(x)\,dx$ som ett **areaelement** $dA\approx f(x)\,dx$ (små bitar area), vilket ger $A=\int_a^bdA=\int_a^bf(x)\,dx$. (Jämför $\int_a^bdx=b-a$, intervallets längd.)

**Arean mellan två kurvor:** täck området med rektanglar med höjd $f(x)-g(x)$ och bas $dx$:
$$A=\int_a^bdA=\int_a^b\big(f(x)-g(x)\big)\,dx,$$
som gäller om $f(x)\ge g(x)$ på $[a,b]$ och båda funktionerna är kontinuerliga.` },
      { heading: '§14.2 Volym: skivor', body: r`Samma idé, men rektanglarna byts mot cylindrar. En cylinder har volymen $A\cdot h$ (tvärsnittsarea gånger höjd). Om tvärsnittsarean inte är konstant, t.ex. för en citron, skivar man upp kroppen i tunna skivor vinkelräta mot $x$-axeln. Varje skiva är nästan en cylinder med volymen $A(x_i)\Delta x$:
$$V\approx\sum A(x_i)\Delta x_i\ \to\ \int_a^bA(x)\,dx.$$
Annat sätt att tänka: integrera **volymelementet** $dV\approx A(x)\,dx$: $V=\int_KdV=\int_a^bA(x)\,dx$.

Formeln fungerar för alla tredimensionella kroppar som kan läggas längs en $x$-axel och "skivas upp" i tvärsnitt vars area beror av $x$.` },
      { heading: 'Rotationskroppar', body: r`Rotera $y=f(x)$, $a\le x\le b$, runt $x$-axeln. Varje punkt $x$ på $x$-axeln blir då medelpunkt i en cirkel med radie $f(x)$, vinkelrät mot $x$-axeln. Tvärsnittsarean är alltså $A(x)=\pi r^2=\pi(f(x))^2$ och
$$V=\int_a^b\pi(f(x))^2\,dx.$$
Liknande formel för rotation kring $y$-axeln finns i boken. **Rörformeln ingår ej.**` },
      { heading: 'Tillämpningar: ackumulering', body: r`$A=\int dA$ och $V=\int dV$ kan ses som **ackumulering**: man samlar på sig area eller volym längs $x$-axeln. Samma idé:

- **Sträcka = ∫ hastighet.** Med konstant hastighet är $s=v\cdot t$. Allmänt är $v(t)=\frac{ds}{dt}$ (ändring i sträcka per tidsenhet), alltså $ds=v(t)\,dt$ och $s(x)=\int_0^xv(t)\,dt$. Rektanglarna $v(t_i)\Delta t$ är hur långt man rör sig på tiden $\Delta t$.
- **Hastighet = ∫ acceleration:** $v(x)=\int_0^xa(t)\,dt$.
- **Energi = ∫ effekt:** effekt är energiåtgång per tidsenhet, $P=\frac{dE}{dt}$, så $E(x)=\int_0^xP(t)\,dt$ (W, Wh).` },
    ],
    examples: [
      { id: 'F8-e1', title: 'Area mellan kurvor', q: r`Beräkna arean av det begränsade området mellan $y=\frac1x$, $y=x$ och $x=2$.`, steps: [r`**Rita figur!** Skärningspunkten fås av $x=\frac1x\iff x^2=1\iff x=\pm1$; vi vill ha den positiva, $x=1$.`, r`På $[1,2]$ ligger $y=x$ överst: $A=\int_1^2\left(x-\frac1x\right)dx=\left[\frac{x^2}2-\ln x\right]_1^2$.`, r`$=\left(2-\ln2\right)-\left(\frac12-0\right)=\frac32-\ln2$.`, r`Rimligt: $\ln2<\ln e=1$, så svaret är positivt.`], answer: r`$\frac32-\ln2$`, checks: [D('x-1/x', 1, 2, '3/2-log(2)')] },
      { id: 'F8-e2', title: 'Rotationskropp: skålen', q: r`Genom att rotera $f(x)=\sqrt{x/\pi}$, $0\le x\le2$, runt $x$-axeln får man en skål. Beräkna volymen ($x$ och $f(x)$ i dm).`, steps: [r`$f(x)$ ger radien av varje tvärsnitt: $A(x)=\pi\left(\sqrt{x/\pi}\right)^2=x$.`, r`$V=\int_0^2\pi(f(x))^2dx=\int_0^2x\,dx=\left[\frac{x^2}2\right]_0^2=2$.`], answer: r`$2$ dm³`, checks: [D('pi*(sqrt(x/pi))**2', 0, 2, '2')] },
      { id: 'F8-e3', title: 'Sträcka = ∫ hastighet', q: r`Ada och Oda tävlar i vem som cyklar längst på 2 timmar. Ada håller 25 km/h, Oda cyklar i $60t-30t^2$ km/h. Vem vinner?`, steps: [r`Ada: $25\cdot2=50$ km (eller $\int_0^225\,dt=50$).`, r`Oda: farten varierar, så vi måste integrera: $\int_0^2(60t-30t^2)dt=\big[30t^2-10t^3\big]_0^2=120-80=40$ km.`], answer: r`Ada vinner ($50$ km mot $40$ km)`, checks: [D('60*x-30*x**2', 0, 2, '40')] },
      { id: 'F8-e4', title: 'Energi = ∫ effekt', q: r`Lampa A har effekten 2 W och kostar 70 kr, lampa B 9 W och kostar 50 kr. Båda håller 10 000 h. Vilken är mest lönsam vid elpriset 0,8 kr/kWh?`, steps: [r`Skillnaden i energiåtgång: $\int_0^{10000}(9-2)\,dt=\big[7t\big]_0^{10000}=70000$ Wh $=70$ kWh.`, r`Det kostar $70\cdot0{,}8=56$ kr mer att välja lampa B, som bara var 20 kr billigare. **Lampa A (2 W) är lönsammast.**`], answer: r`Lampa A (2 W)` },
      { id: 'F8-e5', title: 'Ackumulerad efterfrågan', q: r`Efterfrågan på gummistövlar är $f(t)=1000-500\cos\left(\frac{\pi t}3\right)$ par per månad. Uppskatta den totala efterfrågan under ett år.`, steps: [r`Total efterfrågan $=\int_0^{12}f(t)\,dt=\left[1000t-\frac3\pi\cdot500\sin\frac{\pi t}3\right]_0^{12}$.`, r`$=12000-\frac{1500}\pi(\sin4\pi-\sin0)=12000$.`], answer: r`$12\,000$ par`, checks: [D('1000-500*cos(pi*x/3)', 0, 12, '12000')] },
    ],
    quiz: [
      { id: 'F8-q1', area: 'tillamp-area', q: r`Arean mellan $y=f(x)$ och $y=g(x)$ på $[a,b]$, och vad måste gälla?`, a: r`$A=\int_a^b(f(x)-g(x))\,dx$ om $f\ge g$ på $[a,b]$ och båda är kontinuerliga.` },
      { id: 'F8-q2', area: 'tillamp-area', q: r`Du får en negativ area. Vad har hänt?`, a: r`Du har gjort fel – troligen tagit undre minus övre. Area är aldrig negativ. Rita figur!` },
      { id: 'F8-q3', area: 'tillamp-volym', q: r`Volymformeln för rotation av $y=f(x)$, $a\le x\le b$, kring $x$-axeln, och varför?`, a: r`$V=\int_a^b\pi(f(x))^2dx$. Varje tvärsnitt är en cirkelskiva med radie $f(x)$, alltså $A(x)=\pi(f(x))^2$, och $V=\int A(x)\,dx$.` },
      { id: 'F8-q4', area: 'tillamp-area', q: r`Hur får man sträckan ur hastigheten $v(t)$?`, a: r`$v=\frac{ds}{dt}\Rightarrow ds=v(t)\,dt\Rightarrow s(x)=\int_0^xv(t)\,dt$.` },
    ],
  },
  F9: {
    id: 'F9', pages: 10, sections: '§14.3 Massa och tyngdpunkt',
    keyPoints: [
      r`**Massa = densitet · volym:** $m=\rho V$ (kg = kg/dm³ · dm³). Formelbladet: 1-dim $m=\rho\ell$, 2-dim $m=\rho A$, 3-dim $m=\rho V$.`,
      r`**Masselement:** om densiteten varierar, ta tunna bitar där den är nästan konstant: $dm\approx\rho\,dV$ (3-dim), $\rho\,dA$ (2-dim), $\rho\,dx$ (tråd). Sedan $m=\int_Kdm$.`,
      r`**Tyngdpunkt (formelbladet):** $x_T=\frac1m\int_Kx\,dm$. Rimlighetskontroll: tyngdpunkten ligger närmare den tunga änden.`,
      r`**2-dim, $y_T=\frac1m\int_Ky\,dm$:** summera areaelementen i $y$-led (vågräta remsor $dA(y)=h(y)\,dy$).`,
    ],
    notes: [
      { heading: 'Repetition: area och volym', body: r`$A=\int_a^b(f-g)\,dx$ (areaelement), $V=\int_KdV$ (volymelement). Om kroppen kan skäras upp i skivor med tvärsnittsarea $A(x)$ är $V=\int_a^bA(x)\,dx$. Rotationskropp: $V=\int_a^b\pi(f(x))^2dx$.

**Skålen från förra gången:** $f(x)=\sqrt{x/\pi}$, $0\le x\le2$ (dm) ger $A(x)=x$ (dm²), $dV\approx x\,dx$ och $V=2$ dm³.` },
      { heading: 'Massa och densitet', body: r`Vad väger 1 dm³ vatten? Ungefär 1 kg. Vatten har **densiteten** $\rho\approx1$ kg/dm³ (massa per volymenhet). Så 2 dm³ vatten väger 2 kg.

Generellt: $m=\rho\cdot V$ (jämför $s=v\cdot t$). Sand har $\rho\approx1{,}5$ kg/dm³, så 2 dm³ sand väger 3 kg.

**Vad händer med en blandning av sand och vatten?** Sanden lägger sig i botten, så densiteten beror av höjden $x$, t.ex. $\rho=\frac32-\frac14x$. Precis som med volym räknar man med **masselement**: $dm\approx\rho\,dV$ i tunna skivor där $\rho$ är nästan konstant (⚠️ förväxla inte $dm$ med enheten decimeter).` },
      { heading: 'Massa i 1 dimension: tråd', body: r`En tråd mellan $x=0$ och $x=2$ (m) med densiteten $\rho(x)$ kg/m: $dm=\rho(x)\,dx$ (längdelement, tråden är endimensionell, $m=\rho\cdot\ell$), alltså $m=\int_0^2\rho(x)\,dx$.` },
      { heading: 'Tyngdpunkt', body: r`Var ska vi hålla fingret för att balansera tråden? Om tråden vore **homogen** ($\rho$ konstant) vore tyngdpunkten mitt på. Om den blir tyngre längre bort hamnar tyngdpunkten längre bort.

**Formel (formelbladet):** $x_T=\frac1m\int_Kx\,dm$ ger tyngdpunkten för kroppen $K$ i $x$-led (se boken s. 343 för förklaring).

**I 3 dimensioner** (skålen med sand och vatten): $\rho$ är konstant i varje tvärsnitt, och tvärsnitten är cirkelskivor med medelpunkt på $x$-axeln, så tyngdpunkten ligger på $x$-axeln. Höjden: $x_T=\frac1m\int x\,\rho(x)\,A(x)\,dx$.

**I 2 dimensioner** behövs både $x_T=\frac1m\int x\,dm$ och $y_T=\frac1m\int y\,dm$. För $y_T$ ska areaelementen summeras i $y$-led: vågräta remsor med bredd $h(y)$ och tjocklek $dy$.` },
    ],
    examples: [
      { id: 'F9-e1', title: 'Skålen med sand och vatten', q: r`Skålen ($A(x)=x$ dm², $0\le x\le2$) fylls med en blandning där densiteten är $\rho(x)=\frac32-\frac14x$ kg/dm³. Vad blir massan?`, steps: [r`$m=\int_Kdm=\int\rho\,dV=\int_0^2\rho(x)A(x)\,dx=\int_0^2\left(\frac32-\frac14x\right)x\,dx$.`, r`$=\int_0^2\left(\frac32x-\frac14x^2\right)dx=\left[\frac34x^2-\frac1{12}x^3\right]_0^2=3-\frac23=\frac73$.`, r`Rimligt: fylld med vatten 2 kg, med sand 3 kg – blandningen ska hamna mellan.`], answer: r`$\frac73=2+\frac13$ kg`, checks: [D('(Rational(3,2)-x/4)*x', 0, 2, '7/3')] },
      { id: 'F9-e2', title: 'Trådens massa', q: r`En tråd mellan 0 och 2 (m) har densiteten $\rho(x)=1+x$ kg/m. Beräkna massan.`, steps: [r`$m=\int_Kdm=\int_0^2\rho(x)\,dx=\int_0^2(1+x)\,dx=\left[x+\frac{x^2}2\right]_0^2=4$.`], answer: r`$4$ kg`, checks: [D('1+x', 0, 2, '4')] },
      { id: 'F9-e3', title: 'Trådens tyngdpunkt', q: r`Var är tyngdpunkten för tråden ovan?`, steps: [r`$x_T=\frac1m\int_0^2x\,dm=\frac14\int_0^2x(1+x)\,dx=\frac14\left[\frac{x^2}2+\frac{x^3}3\right]_0^2$.`, r`$=\frac14\left(2+\frac83\right)=\frac14\cdot\frac{14}3=\frac76$.`, r`Rimligt: $x_T>1$ eftersom tråden är tyngre längre bort från $x=0$.`], answer: r`$x_T=\frac76$ m`, checks: ["eq('integrate(x*(1+x),(x,0,2))/integrate(1+x,(x,0,2))', '7/6')"] },
      { id: 'F9-e4', title: 'Skålens tyngdpunkt (3-dim)', q: r`Hur högt ligger tyngdpunkten i skålen med sand och vatten?`, steps: [r`Av symmetri ligger tyngdpunkten på $x$-axeln (centralaxeln).`, r`$x_T=\frac1m\int x\,dm=\frac1{7/3}\int_0^2x\,\rho(x)\,A(x)\,dx=\frac37\int_0^2\left(\frac32x^2-\frac14x^3\right)dx$.`, r`$=\frac37\left[\frac{x^3}2-\frac{x^4}{16}\right]_0^2=\frac37(4-1)=\frac97$.`], answer: r`$\frac97$ dm från botten`, checks: ["eq('integrate(x*(Rational(3,2)-x/4)*x,(x,0,2))/Rational(7,3)', '9/7')"] },
      { id: 'F9-e5', title: '2-dim tyngdpunkt med vågräta remsor', q: r`Bestäm tyngdpunkten för den homogena skivan som begränsas av $y=2-2x$, $x=0$ och $y=0$.`, steps: [r`Homogen ⇒ $\rho$ konstant. $m=\rho\cdot A=\rho\cdot\frac{2\cdot1}2=\rho$ (triangel med bas 1, höjd 2).`, r`$x_T=\frac1\rho\int_0^1x\,\rho\,(2-2x)\,dx=\int_0^1(2x-2x^2)\,dx=\left[x^2-\frac{2x^3}3\right]_0^1=\frac13$. (Lodräta remsor: $dA=(2-2x)\,dx$.)`, r`$y_T$: summera areaelementen i **$y$-led**. En vågrät remsa på höjden $y$ har bredden $h(y)=x$ där $y=2-2x$, alltså $h(y)=1-\frac y2$, och $dA=h(y)\,dy$.`, r`$y_T=\frac1\rho\int_0^2y\,\rho\left(1-\frac y2\right)dy=\left[\frac{y^2}2-\frac{y^3}6\right]_0^2=2-\frac43=\frac23$.`], answer: r`$(x_T,y_T)=\left(\frac13,\frac23\right)$`, checks: ["eq('integrate(x*(2-2*x),(x,0,1))', '1/3')", "eq('integrate(t*(1-t/2),(t,0,2))', '2/3')"] },
    ],
    quiz: [
      { id: 'F9-q1', area: 'tillamp-massa', q: r`Vad är ett masselement $dm$ för en tråd, en skiva och en kropp?`, a: r`$dm=\rho\,dx$ (tråd), $dm=\rho\,dA$ (skiva), $dm=\rho\,dV$ (kropp) – tunna bitar där densiteten är nästan konstant.` },
      { id: 'F9-q2', area: 'tillamp-massa', q: r`Formeln för tyngdpunktens $x$-koordinat (står på formelbladet)?`, a: r`$x_T=\frac1m\int_Kx\,dm$.` },
      { id: 'F9-q3', area: 'tillamp-massa', q: r`Hur räknar man $y_T$ för en plan skiva?`, a: r`$y_T=\frac1m\int y\,dm$ med areaelementen summerade i $y$-led: vågräta remsor $dA=h(y)\,dy$.` },
    ],
  },
  F10: {
    id: 'F10', pages: 9, sections: '§15.1 Differentialekvationer, integrerande faktor',
    keyPoints: [
      r`En **differentialekvation** innehåller en okänd funktion $y$, dess derivator och kända funktioner av en variabel. **Ordningen** är den högsta förekommande derivatan.`,
      r`En **lösning** gör VL = HL. Kontrollera genom att sätta in!`,
      r`**Allmänna lösningen** = alla lösningar (med en godtycklig konstant $C$). Ett **begynnelsevillkor** bestämmer $C$.`,
      r`**Linjär av ordning 1:** $a(x)y'+b(x)y=c(x)$. **Recept:** 0. Skriv som $y'+g(x)y=h(x)$. 1. Hitta en primitiv $G$ till $g$. 2. Multiplicera med $e^{G(x)}$. 3. VL $=\left(e^{G(x)}y\right)'$. 4. Integrera (kom ihåg $C$). 5. Dela med $e^{G(x)}$.`,
    ],
    notes: [
      { heading: 'Grundbegrepp', body: r`En **differentialekvation** är en ekvation som innehåller information om en okänd funktion $y$, i form av en eller flera derivator av $y$ samt kända funktioner av en variabel (ofta $x$).

**Ordningen** är den högsta förekommande derivatan: $y'=3x^2$ har ordning 1, $u''-3\sin t=u$ ordning 2 och $y^{(3)}-y^4=x^6$ ordning 3.

En **lösning** är en funktion som uppfyller ekvationen (gör att VL = HL). Exempel: $y=x\ln x$ löser $xy'=x+y$, eftersom $y'=\ln x+1$ ger VL $=x\ln x+x$ = HL.` },
      { heading: 'Allmän lösning och begynnelsevillkor', body: r`$y'=4x$: vi söker alla primitiver till $4x$, så $y=\int4x\,dx=2x^2+C$.

**Definition.** Mängden av *alla* lösningar kallas den **allmänna lösningen**. Vill man ha en specifik lösning måste man ange **bivillkor**, t.ex. ett **begynnelsevillkor**, vilket ger ett **begynnelsevärdesproblem**.

Funktionen behöver inte heta $y$ och variabeln inte $x$: Edas sträcka $s(t)$ med $s'=10e^{0{,}5t}$, $s(0)=0$ ger $s=20e^{0{,}5t}+C$ och $C=-20$.` },
      { heading: 'Linjära ekvationer – motiverande exempel', body: r`$xy'=x+y$ är **linjär av första ordningen**: den kan skrivas $a(x)y'+b(x)y=c(x)$ (här $xy'-y=x$).

**Motiverande exempel 1:** $xy'+y=x$. VL $=(x\cdot y)'$ (produktregeln!), så $(xy)'=x$ ⇒ $xy=\frac{x^2}2+C$ ⇒ $y=\frac x2+\frac Cx$. Men i $xy'-y=x$ fungerar inte tricket rakt av – $-1$ är inte derivatan av $x$.

**Motiverande exempel 2:** $e^{2x}y'+2e^{2x}y=4e^{2x}$. VL $=(e^{2x}y)'$, så $e^{2x}y=\int4e^{2x}dx=2e^{2x}+C$ ⇒ $y=2+Ce^{-2x}$.

**Viktigt:** detta löser även $y'+2y=4$, eftersom vi kan multiplicera båda leden med den nollskilda funktionen $e^{2x}$. $e^{2x}$ kallas en **integrerande faktor** – den gör att vi kan "integrera ekvationen".` },
      { heading: 'Recept för linjära ekvationer av ordning 1', body: r`0. Skriv om $a(x)y'+b(x)y=c(x)$ som $y'+g(x)y=h(x)$ (dela med $a(x)$).
1. Hitta **en** primitiv funktion $G(x)$ till $g(x)$.
2. Multiplicera VL och HL med den integrerande faktorn $e^{G(x)}$: $e^{G}y'+g\,e^{G}y=e^{G}h$.
3. VL $=\left(e^{G(x)}y\right)'$ (kom ihåg!).
4. Integrera: $e^{G(x)}y=\int e^{G(x)}h(x)\,dx$ – "lös" denna, kom ihåg $C$.
5. Lös ut $y$ genom att dela med $e^{G(x)}$.` },
    ],
    examples: [
      { id: 'F10-e1', title: 'Är det en lösning?', q: r`Är $y=x\ln x$ en lösning till $xy'=x+y$, $x>1$?`, steps: [r`$y'=1\cdot\ln x+x\cdot\frac1x=\ln x+1$.`, r`VL $=x(\ln x+1)=x\ln x+x$. HL $=x+x\ln x$. VL = HL ✓`], answer: r`Ja` },
      { id: 'F10-e2', title: 'Begynnelsevärdesproblem', q: r`Eda cyklar i $10e^{0{,}5t}$ km/h. Bestäm sträckan $s(t)$ om $s(0)=0$, och $s(2)$.`, steps: [r`$s(t)=\int10e^{0{,}5t}dt=\frac{10e^{0{,}5t}}{0{,}5}+C=20e^{0{,}5t}+C$.`, r`$s(0)=20+C=0\iff C=-20$, så $s(t)=20e^{0{,}5t}-20$.`, r`$s(2)=20e-20=20(e-1)\approx34$ km.`], answer: r`$s(t)=20e^{0{,}5t}-20$, $s(2)\approx34$ km`, checks: [O('Derivative(y(t),t)-10*exp(t/2)', '20*exp(t/2)-20', 't')] },
      { id: 'F10-e3', title: 'Receptet', q: r`Lös $y'+4xy=8x$.`, steps: [r`Linjär av ordning 1, $g(x)=4x\Rightarrow G(x)=2x^2$. Integrerande faktor $e^{2x^2}$.`, r`$e^{2x^2}y'+4xe^{2x^2}y=8xe^{2x^2}$, alltså $\left(e^{2x^2}y\right)'=8xe^{2x^2}$.`, r`$e^{2x^2}y=\int8xe^{2x^2}dx=\left[t=2x^2,\ dt=4x\,dx\right]=\int2e^tdt=2e^{2x^2}+C$.`, r`$y=2+Ce^{-2x^2}$. Kontroll: $y'=-4xCe^{-2x^2}$ och $4xy=8x+4xCe^{-2x^2}$, så $y'+4xy=8x$ ✓`], answer: r`$y=2+Ce^{-2x^2}$`, checks: [O('Derivative(y(x),x)+4*x*y(x)-8*x', '2+C1*exp(-2*x**2)')] },
      { id: 'F10-e4', title: 'Det entydiga svaret', q: r`Lös $xy'=x+y$, $x>1$, $y(1)=5$.`, steps: [r`Skriv som $y'-\frac1xy=1$. $g(x)=-\frac1x\Rightarrow G(x)=-\ln x\Rightarrow e^{G(x)}=e^{-\ln x}=\frac1x$.`, r`$\frac1xy'-\frac1{x^2}y=\frac1x\Rightarrow\left(\frac1x\cdot y\right)'=\frac1x$.`, r`$\frac yx=\int\frac{dx}x=\ln x+C\Rightarrow y=x\ln x+Cx$.`, r`$y(1)=0+C=5$, så $y=x\ln x+5x$.`], answer: r`$y=x\ln x+5x$`, checks: [O('x*Derivative(y(x),x)-x-y(x)', 'x*log(x)+5*x'), "eq('(x*log(x)+5*x).subs(x,1)', 5)"] },
    ],
    quiz: [
      { id: 'F10-q1', area: 'de1-linjar', q: r`Vad är ordningen av en differentialekvation?`, a: r`Den högsta förekommande derivatan av den okända funktionen.` },
      { id: 'F10-q2', area: 'de1-linjar', q: r`Hur kontrollerar man att en funktion är en lösning?`, a: r`Sätt in den (och dess derivator) i ekvationen och kontrollera att VL = HL.` },
      { id: 'F10-q3', area: 'de1-linjar', q: r`Receptet för $y'+g(x)y=h(x)$?`, a: r`Hitta $G$ med $G'=g$, multiplicera med $e^{G(x)}$, VL blir $(e^{G}y)'$, integrera (med $C$), dela med $e^{G(x)}$.` },
      { id: 'F10-q4', area: 'de1-linjar', q: r`Varför löser $y=2+Ce^{-2x}$ både $e^{2x}y'+2e^{2x}y=4e^{2x}$ och $y'+2y=4$?`, a: r`Ekvationerna är ekvivalenta – man multiplicerar med den nollskilda funktionen $e^{2x}$ (den integrerande faktorn).` },
    ],
  },
  F11: {
    id: 'F11', pages: 8, sections: '§15.1 forts.: separabla ekvationer, tillämpningar',
    keyPoints: [
      r`Innehåller ekvationen $y\cdot y$, $y'\cdot y'$ eller $y\cdot y'$ är den **inte linjär**.`,
      r`**Separabel:** kan skrivas $g(y)\,y'=h(x)$ (allt med $y$ i VL, allt med $x$ i HL). Med $y'=\frac{dy}{dx}$: $g(y)\,dy=h(x)\,dx$. Integrera: $\int g(y)\,dy=\int h(x)\,dx$, vilket ger en **implicit lösning**.`,
      r`Dra roten ur o.s.v. för en **explicit lösning**. Begynnelsevillkoret avgör t.ex. om man ska välja $+\sqrt{\ }$ eller $-\sqrt{\ }$.`,
      r`⚠️ **Var försiktig med att dela med 0.** Delar du med $y$ måste du kontrollera om $y=0$ också är en lösning.`,
      r`**Tillämpningar:** "ändras med en hastighet som är proportionell mot …" betyder $y'=k\cdot(\dots)$.`,
    ],
    notes: [
      { heading: 'Repetition: linjära ekvationer', body: r`$y'=f(x)$ har den allmänna lösningen $y=\int f(x)\,dx=F(x)+C$. Svårare fall kräver trick. **Linjära** $y'+g(x)y=h(x)$ löses med integrerande faktor $e^{G(x)}$: VL $=(e^{G}y)'$, integrera, dela med $e^{G}$.

**Exempel:** $xy'-y=x$, $x\ge1$, $y(1)=5$ ger $y'-\frac1xy=1$, faktor $\frac1x$, $\left(\frac yx\right)'=\frac1x$, $y=x\ln x+Cx$, $C=5$. Kontroll: $y'=\ln x+6$ och $xy'-y=x$ ✓` },
      { heading: 'Separabla ekvationer', body: r`$2yy'=4x$ är **inte** linjär (den innehåller $y\cdot y'$), men den är **separabel**.

**Definition.** En DE av första ordningen som kan skrivas $g(y)\,y'=h(x)$ kallas separabel: allt med $y$ går att skriva i VL (gånger $y'$), allt med $x$ i HL.

Med skrivsättet $y'=\frac{dy}{dx}$: $g(y)\frac{dy}{dx}=h(x)\iff g(y)\,dy=h(x)\,dx$. **Integrera!** $\int g(y)\,dy=\int h(x)\,dx$ ger en **implicit lösning** ($y$ står inte "fri").

**Exempel:** $2y\,dy=4x\,dx\Rightarrow y^2=2x^2+C$ (implicit). Dra roten ur: $y=\pm\sqrt{2x^2+C}$ (explicit). Ett begynnelsevillkor avgör tecknet: $y(0)=1$ ger $+\sqrt{\ }$ och $C=1$; $y(0)=-4$ ger $-\sqrt{\ }$ och $C=16$.` },
      { heading: 'Var försiktig med att dela med 0', body: r`$y'=2xy$: separera genom att dela med $y$ (kräver $y\ne0$): $\int\frac{dy}y=\int2x\,dx\Rightarrow\ln|y|=x^2+C\Rightarrow|y|=e^{x^2+C}$.

Ta bort absolutbeloppet ($|y|=y$ om $y\ge0$, $-y$ om $y<0$): $y=\pm e^{x^2+C}=\pm e^C\cdot e^{x^2}$. Eftersom $C$ är godtycklig är $\pm e^C$ en godtycklig konstant $\ne0$; kalla den $K$: $y=Ke^{x^2}$, $K\ne0$.

$K=0$ ger $y=0$ – fallet vi plockade bort när vi delade med $y$. Kontroll: VL $=0$, HL $=2x\cdot0=0$ ✓. Så $y=Be^{x^2}$, $B$ godtycklig, är den allmänna lösningen.` },
      { heading: 'Tillämpningar', body: r`**Bakterier i en maträtt:** antalet ändras med en hastighet proportionell mot antalet, konstant $0{,}5$ h$^{-1}$, 100 bakterier från början. Låt $y(t)$ = antalet bakterier vid tiden $t$ (timmar). "Ändringen" är $y'(t)$, "proportionell mot antalet" är $k\cdot y$: $y'=0{,}5y$, $y(0)=100$.

Lös som linjär ekvation: $y'-0{,}5y=0$, $g(t)=-0{,}5$, $G(t)=-0{,}5t$, faktor $e^{-0{,}5t}$: $(e^{-0{,}5t}y)'=0\Rightarrow e^{-0{,}5t}y=C\Rightarrow y=Ce^{0{,}5t}$. $y(0)=C=100$. Efter 2 h: $y(2)=100e\approx272$ bakterier.` },
    ],
    examples: [
      { id: 'F11-e1', title: 'Separabel med tecken', q: r`Lös $2yy'=4x$ med a) $y(0)=1$, b) $y(0)=-4$.`, steps: [r`$2y\,dy=4x\,dx\Rightarrow\int2y\,dy=\int4x\,dx\Rightarrow y^2=2x^2+C$ (implicit).`, r`$y=\pm\sqrt{2x^2+C}$ (explicit).`, r`a) $y(0)=1>0$: välj $+$. $\sqrt C=1\Rightarrow C=1$: $y=\sqrt{2x^2+1}$.`, r`b) $y(0)=-4<0$: välj $-$. $-\sqrt C=-4\Rightarrow C=16$: $y=-\sqrt{2x^2+16}$.`], answer: r`a) $y=\sqrt{2x^2+1}$, b) $y=-\sqrt{2x^2+16}$`, checks: [O('2*y(x)*Derivative(y(x),x)-4*x', 'sqrt(2*x**2+1)'), O('2*y(x)*Derivative(y(x),x)-4*x', '-sqrt(2*x**2+16)')] },
      { id: 'F11-e2', title: 'Dela inte med 0', q: r`Hitta den allmänna lösningen till $y'=2xy$.`, steps: [r`Separabel. För $y\ne0$: $\frac{y'}y=2x\Rightarrow\int\frac{dy}y=\int2x\,dx\Rightarrow\ln|y|=x^2+C$.`, r`$|y|=e^{x^2+C}\Rightarrow y=\pm e^Ce^{x^2}=Ke^{x^2}$, $K\ne0$.`, r`Kontrollera $y=0$ (bortplockat när vi delade med $y$): $0=2x\cdot0$ ✓.`], answer: r`$y=Be^{x^2}$, $B$ godtycklig`, checks: [O('Derivative(y(x),x)-2*x*y(x)', 'C1*exp(x**2)')] },
      { id: 'F11-e3', title: 'Tillämpning: bakterier', q: r`Från början finns 100 bakterier. Antalet ändras med en hastighet proportionell mot antalet, konstant $0{,}5$ h$^{-1}$. a) Ställ upp en DE. b) Lös den. c) Hur många finns efter 2 h?`, steps: [r`a) $y(t)$ = antalet vid tiden $t$ h. $y'=0{,}5y$, $y(0)=100$.`, r`b) $y'-0{,}5y=0$, faktor $e^{-0{,}5t}$: $(e^{-0{,}5t}y)'=0\Rightarrow y=Ce^{0{,}5t}$. $y(0)=C=100$: $y=100e^{0{,}5t}$.`, r`c) $y(2)=100e\approx272$.`], answer: r`$y=100e^{0{,}5t}$; ungefär 272 bakterier`, checks: [O('Derivative(y(t),t)-y(t)/2', '100*exp(t/2)', 't')] },
    ],
    quiz: [
      { id: 'F11-q1', area: 'de1-separabel', q: r`Hur ser man att en ekvation inte är linjär?`, a: r`Den innehåller $y\cdot y$, $y'\cdot y'$, $y\cdot y'$ (eller t.ex. $\sqrt y$, $e^y$).` },
      { id: 'F11-q2', area: 'de1-separabel', q: r`Vad är en separabel ekvation och hur löser man den?`, a: r`Den kan skrivas $g(y)y'=h(x)$. Skriv $g(y)\,dy=h(x)\,dx$ och integrera båda sidor.` },
      { id: 'F11-q3', area: 'de1-separabel', q: r`Vad måste man kontrollera om man delar med $y$?`, a: r`Om $y=0$ (den konstanta funktionen) också är en lösning – den försvinner annars.` },
      { id: 'F11-q4', area: 'de1-tillampning', q: r`Översätt: "antalet ändras med en hastighet som är proportionell mot antalet".`, a: r`$y'=k\cdot y$.` },
    ],
  },
  F12: {
    id: 'F12', pages: 21, sections: '§15.1 Tillämpningar, §6.1–6.2 Komplexa tal: intro',
    keyPoints: [
      r`**Blandproblem:** $y'$ = (in per minut) $-$ (ut per minut). Utflödet har koncentrationen $\frac{y}{\text{volym}}$.`,
      r`**Avsvalning:** "proportionell mot skillnaden mellan kaffets och rummets temperatur" betyder $y'=k(y-20)$. Lös med integrerande faktor, bestäm $C$ och $k$ med bivillkoren.`,
      r`**Komplexa tal:** $i^2=-1$, $z=a+bi$ med $\operatorname{Re}z=a$, $\operatorname{Im}z=b$ (⚠️ $i$ tas inte med i imaginärdelen).`,
      r`**Räkneregler:** likhet (real- och imaginärdelar lika), addition "var för sig", multiplikation (multiplicera ihop, använd $i^2=-1$, samla), division (**förläng med nämnarens konjugat**).`,
      r`$\bar z=a-bi$, $|z|=\sqrt{a^2+b^2}$ (avstånd till origo), $|z-w|$ = avståndet mellan $z$ och $w$, och $z\bar z=|z|^2$.`,
      r`$|z-(1+i)|=2$ är en cirkel med medelpunkt $1+i$ och radie 2. Med $\le$: hela cirkelskivan. Med $<$: streckad rand.`,
    ],
    notes: [
      { heading: 'DE: linjär eller separabel?', body: r`**Linjär:** $a(x)y'+b(x)y=c(x)$ – löses med integrerande faktor. **Separabel:** $g(y)\frac{dy}{dx}=h(x)$ – $\int g(y)\,dy=\int h(x)\,dx$ ger en implicit lösning.` },
      { heading: 'Blandproblem', body: r`Ett akvarium innehåller 100 l rent vatten. Rent vatten pumpas in med 4 l/min, saltvatten med koncentrationen 10 g/l med 6 l/min, och väl blandat vatten töms med 10 l/min. Låt $y$ vara antal gram salt efter $t$ minuter.
- In: $10\ \text{g/l}\cdot6\ \text{l/min}=60$ g/min.
- Ut: $\frac{y}{100}$ g/l $\cdot10$ l/min $=\frac y{10}$ g/min.

$y'=60-\frac y{10}$, alltså $y'+\frac1{10}y=60$ – **linjär**.` },
      { heading: 'Två tillämpningar till', body: r`**Cyklisten:** farten minskar proportionellt mot farten i kvadrat, konstant $-0{,}01$ s$^{-1}$: $y'=-0{,}01y^2$, $y(0)=10$. **Separabel** ($\frac{y'}{y^2}=-0{,}01$), inte linjär eftersom den innehåller $y\cdot y$.

**Kaffet:** svalnar med en hastighet proportionell mot skillnaden mellan kaffets och rummets temperatur (20 °C): $y'=k(y-20)$, alltså $y'-ky=-20k$. Det är en linjär ekvation som löses med integrerande faktor $e^{-kt}$.` },
      { heading: '§6.1–6.2 Komplexa tal', body: r`$x^2=1$ har lösningarna $\pm1$, men $x^2=-1$ saknar reell lösning. Vi **bestämmer** att det finns ett tal $i$ med $i^2=-1$. Då har $x^2=-4$ lösningarna $\pm2i$ (eftersom $-4=i^2\cdot2^2=(2i)^2$), och $x^2-2x+5=0$ har med pq-formeln lösningarna $x=1\pm\sqrt{-4}=1\pm2i$.

**Definition.** Ett **komplext tal** $z=a+bi$, där $a,b$ är reella och $i^2=-1$. $a=\operatorname{Re}z$ är **realdelen**, $b=\operatorname{Im}z$ är **imaginärdelen** (⚠️ utan $i$!). $i$ är den **imaginära enheten**. Om $\operatorname{Re}z=0$ kallas $z$ **imaginärt**. Mängden av alla komplexa tal betecknas $\mathbb C$, och de reella talen $\mathbb R\subset\mathbb C$.` },
      { heading: 'Räkneregler', body: r`Låt $z=a+bi$, $w=c+di$.
1. **Likhet:** $z=w\iff a=c$ och $b=d$.
2. **Addition/subtraktion:** räkna real- och imaginärdelar "var för sig".
3. **Multiplikation:** multiplicera ihop, använd $i^2=-1$, samla ihop och räkna ut real- och imaginärdel ($(ac-bd)+(ad+bc)i$ – memorera ej!).
4. **Division:** förläng med nämnarens konjugat $c-di$, så att nämnaren blir reell: $c^2+d^2$ (memorera ej!).

**Konjugat:** $\bar z=\overline{a+bi}=a-bi$. **Räkneregler:** $\overline{zw}=\bar z\bar w$, $\overline{z/w}=\bar z/\bar w$, $\overline{z+w}=\bar z+\bar w$, $|zw|=|z||w|$, $|z/w|=|z|/|w|$, $|z+w|\le|z|+|w|$ (triangelolikheten), $|\bar z|=|z|$, $z\bar z=|z|^2$.` },
      { heading: 'Det komplexa talplanet', body: r`$z=a+bi$ motsvarar punkten $(a,b)$ (reella axeln Re, imaginära axeln Im).

**Absolutbelopp:** som $|x|$ = avståndet från 0 till $x$ på tallinjen definieras $|z|$ som avståndet mellan $z$ och origo. Pythagoras sats ger $|z|=\sqrt{a^2+b^2}$. (⚠️ Ha inte med $i$: $|3+4i|=\sqrt{3^2+4^2}=5$.)

$|z-w|$ är avståndet mellan $z$ och $w$ i talplanet. Därför är $|z-(1+i)|=2$ en cirkel med radie 2 och medelpunkt $1+i$, och $|z-(1+i)|\le2$ även alla punkter inuti. Med $<$ streckar man cirkeln.` },
    ],
    examples: [
      { id: 'F12-e1', title: 'Kaffet', q: r`Kaffet är 95 °C från början och 70 °C efter 10 min i ett rum med 20 °C. När är det 45 °C?`, steps: [r`$y'=k(y-20)\iff y'-ky=-20k$. $g(t)=-k$, $G(t)=-kt$, faktor $e^{-kt}$: $(ye^{-kt})'=-20ke^{-kt}$.`, r`$ye^{-kt}=\int-20ke^{-kt}dt=20e^{-kt}+C\Rightarrow y=20+Ce^{kt}$.`, r`$y(0)=20+C=95\Rightarrow C=75$. $y(10)=20+75e^{10k}=70\iff e^{10k}=\frac23\iff k=\frac{\ln(2/3)}{10}$.`, r`$45=20+75e^{kt}\iff e^{kt}=\frac13\iff t=\frac{10\ln(1/3)}{\ln(2/3)}=\frac{10\ln3}{\ln3-\ln2}$.`], answer: r`Efter $\frac{10\ln3}{\ln3-\ln2}\approx27$ min`, checks: ["num('10*log(3)/(log(3)-log(2))', 27.1, 0.1)", O('Derivative(y(t),t)-log(Rational(2,3))/10*(y(t)-20)', '20+75*exp(log(Rational(2,3))/10*t)', 't')] },
      { id: 'F12-e2', title: 'Räkna med komplexa tal', q: r`Låt $z=1+2i$, $w=3+4i$. Beräkna a) $z-w$, b) $zw$, c) $\frac zw$.`, steps: [r`a) $(1+2i)-(3+4i)=1-3+2i-4i=-2-2i$.`, r`b) $1\cdot3+1\cdot4i+2i\cdot3+2i\cdot4i=3+4i+6i+8i^2=3-8+10i=-5+10i$.`, r`c) Förläng med $3-4i$: $\frac{(1+2i)(3-4i)}{(3+4i)(3-4i)}=\frac{3-4i+6i-8i^2}{9-16i^2}=\frac{11+2i}{25}=\frac{11}{25}+\frac2{25}i$.`], answer: r`a) $-2-2i$, b) $-5+10i$, c) $\frac{11}{25}+\frac{2}{25}i$`, checks: ["eq('(1+2*I)*(3+4*I)', '-5+10*I')", "eq('(1+2*I)/(3+4*I)', '11/25+2*I/25')"] },
      { id: 'F12-e3', title: 'Konjugat', q: r`$z=1+2i$, $w=3+4i$. Beräkna $\bar z\cdot\bar w$, $\overline{zw}$ och $w\bar w$.`, steps: [r`$\bar z\bar w=(1-2i)(3-4i)=3-4i-6i+8i^2=-5-10i$.`, r`$\overline{zw}=\overline{-5+10i}=-5-10i$ – samma (räkneregel 1).`, r`$w\bar w=(3+4i)(3-4i)=9+16=25=|w|^2$.`], answer: r`$-5-10i$, $-5-10i$, $25$`, checks: ["eq('conjugate(1+2*I)*conjugate(3+4*I)', '-5-10*I')"] },
      { id: 'F12-e4', title: 'Belopp', q: r`$z=3+4i$, $w=-10i$. Bestäm $|z|$, $|w|$, $|zw|$ och $\left|\frac{w^3}{z^4}\right|$.`, steps: [r`$|z|=\sqrt{9+16}=5$, $|w|=\sqrt{0+100}=10$.`, r`$|zw|=|z||w|=50$.`, r`$\left|\frac{w^3}{z^4}\right|=\frac{|w|^3}{|z|^4}=\frac{10^3}{5^4}=\frac{2^3}5=\frac85$.`], answer: r`$5$, $10$, $50$, $\frac85$`, checks: ["eq('Abs((-10*I)**3/(3+4*I)**4)', '8/5')"] },
      { id: 'F12-e5', title: 'Områden i talplanet', q: r`Markera alla $z$ med a) $\operatorname{Re}z=-1$, b) $\operatorname{Im}z\ge2$, c) $|z|=4$, d) $|z-(1+i)|\le2$.`, steps: [r`a) Alla tal med realdel $-1$: den lodräta linjen genom $-1$.`, r`b) Imaginärdel $\ge2$: halvplanet ovanför (och på) linjen $\operatorname{Im}z=2$.`, r`c) Avstånd 4 från origo: cirkeln med radie 4 och medelpunkt i origo.`, r`d) Avstånd högst 2 från $1+i$: cirkelskivan med medelpunkt $(1,1)$ och radie 2, randen inräknad.`], answer: r`Linje, halvplan, cirkel, cirkelskiva` },
    ],
    quiz: [
      { id: 'F12-q1', area: 'de1-tillampning', q: r`Hur ställer man upp ett blandproblem?`, a: r`$y'$ = (mängd in per tidsenhet) $-$ (mängd ut per tidsenhet), där utflödets koncentration är $\frac{y}{\text{volym}}$.` },
      { id: 'F12-q2', area: 'komplexa-rakna', q: r`Vad är $\operatorname{Im}(3-5i)$?`, a: r`$-5$ (inte $-5i$ – $i$ tas inte med i imaginärdelen).` },
      { id: 'F12-q3', area: 'komplexa-rakna', q: r`Hur dividerar man två komplexa tal?`, a: r`Förläng med nämnarens konjugat så att nämnaren blir reell.` },
      { id: 'F12-q4', area: 'komplexa-geometri', q: r`Vad betyder $|z-w|$ geometriskt?`, a: r`Avståndet mellan $z$ och $w$ i det komplexa talplanet.` },
      { id: 'F12-q5', area: 'komplexa-rakna', q: r`$z\bar z=?$`, a: r`$|z|^2=a^2+b^2$.` },
    ],
  },
}
