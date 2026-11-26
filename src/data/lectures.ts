import type { AreaId } from './types'

const r = String.raw
const A = (F: string, f: string) => `antider('${F}', '${f}')`
const D = (f: string, a: string | number, b: string | number, ans: string) => `defint('${f}', '${a}', '${b}', '${ans}')`

export interface LectureSection {
  heading: string
  body: string
}

export interface LectureExample {
  id: string
  title: string
  q: string
  steps: string[]
  answer: string
  /** Kommentar, t.ex. "inte genomräknat på föreläsningen". */
  note?: string
  checks?: string[]
}

export interface QuizItem {
  id: string
  q: string
  a: string
  area: AreaId
}

export interface Lecture {
  id: string // 'F2'
  /** Antal inskannade sidor i public/forelasningar/<id>-<n>.jpg */
  pages: number
  /** Bokavsnitt enligt anteckningarna. */
  sections: string
  keyPoints: string[]
  notes: LectureSection[]
  examples: LectureExample[]
  quiz: QuizItem[]
  /** Extra bild att visa (t.ex. ansatslistan). */
  extraImages?: { src: string; alt: string }[]
  /** Interaktiv komponent. */
  widget?: 'riemann'
}

export const LECTURES: Record<string, Lecture> = {
  F2: {
    id: 'F2', pages: 9, sections: '§12.3 Beräkning av primitiva funktioner: variabelbyte, partialintegration',
    keyPoints: [
      r`$\int f(x)\,dx=F(x)+C$ betyder *alla* primitiver till $f$, precis som $\frac{dF}{dx}$ betyder derivatan.`,
      r`Integraler löses med standardintegraler (utantill), räkneregler och *kvalificerade gissningar*: gissa → derivera → kontrollera → förbättra.`,
      r`**Variabelbyte** = kedjeregeln baklänges: $\left[t=g(x),\ \frac{dt}{dx}=g'(x)\Rightarrow dt=g'(x)\,dx\right]$. Byt ut *allt* som har med $x$ att göra, och byt tillbaka på slutet.`,
      r`**Partialintegration** = produktregeln baklänges: $\int f(x)g(x)\,dx=F(x)g(x)-\int F(x)g'(x)\,dx$, där $f$ integreras (↑) och $g$ deriveras (↓).`,
      r`Grundidé: "döda" $x^n$ med derivering; $\cos x$, $\sin x$ och $e^x$ är trevliga att integrera. $\ln x=1\cdot\ln x$. För $e^x\cos x$: ekvationstricket.`,
    ],
    notes: [
      {
        heading: 'Primitiv funktion – vad betyder symbolerna?',
        body: r`$F(x)$ är en primitiv funktion till $f(x)$ om $F'(x)=f(x)$. Man skriver $\int f(x)\,dx=F(x)+C$, vilket betyder "hitta *alla* primitiva funktioner".

**Informell förklaring.** $F'(x)=\frac{dF}{dx}$. "Multiplicera upp" $dx$: $dF=F'(x)\,dx$. Tolkning: små ändringar i $F$ kan approximeras med små ändringar i $x$ gånger $F'(x)$, alltså $\Delta F\approx F'(x)\Delta x$. Summerar man alla små ändringar över ett intervall får man $\int dF=\int F'(x)\,dx=F(x)+C$, där $C$ är "vilken höjd vi börjar på".

Exempel: $\int x^3dx=\frac{x^4}4+C$. Olika $C$ ger samma kurva förskjuten uppåt eller nedåt.`,
      },
      {
        heading: 'Hur löser man integraler?',
        body: r`Integraler är kluriga problem! Verktygen är:
- **Standardintegraler utantill** (Sats 12.2).
- **Räkneregler:** $\int kf(x)\,dx=k\int f(x)\,dx$ och $\int(f+g)\,dx=\int f\,dx+\int g\,dx$.
- **Kvalificerade gissningar:** gissa → derivera → kontrollera. Är det fel, använd felet för att förbättra gissningen.
- **Trick:** variabelbyte och partialintegration.
- **Samarbeta!** Att bli bra på integraler kräver mängdträning och tålamod.`,
      },
      {
        heading: 'Saker man inte får göra',
        body: r`I $\int\cos(x^2)\,2x\,dx$ får man **inte**:
- "flytta ut" $2x$ (bara *konstanter* får flyttas ut),
- "flytta ut" $\cos(x^2)$,
- skriva integralen som en produkt $\int\cos x^2\,dx\cdot\int2x\,dx$.

I stället: gissa $F(x)=\sin(x^2)$ och kontrollera med kedjeregeln: $F'(x)=\cos(x^2)\cdot2x$ ✓. Integrationen var alltså kedjeregeln "baklänges". Det är precis vad variabelbyte gör systematiskt.`,
      },
      {
        heading: 'Variabelbyte',
        body: r`Allmänt: $\displaystyle\int F'(g(x))\,g'(x)\,dx=\left[\begin{array}{l}t=g(x)\\ \frac{dt}{dx}=g'(x)\\ dt=g'(x)\,dx\end{array}\right]=\int F'(t)\,dt=F(t)+C=F(g(x))+C.$

$dt=g'(x)\,dx$ förklarar hur små ändringar i $t$ hör ihop med små ändringar i $x$.

⚠️ **Byt ut allt** som har med $x$ att göra mot $t$ när bytet görs, och byt tillbaka på slutet.

**Ibland måste man trixa lite**, t.ex. dela med 2: $dt=2x\,dx\Rightarrow\frac{dt}2=x\,dx$.

**Ibland syns ingen inre derivata**, men bytet fungerar ändå: i $\int e^{2\sqrt x}dx$ sätter man $t=\sqrt x$. Då är $\frac{dt}{dx}=\frac1{2\sqrt x}$, alltså $dx=2\sqrt x\,dt=2t\,dt$.`,
      },
      {
        heading: 'Partialintegration',
        body: r`Kom ihåg produktregeln: $(F\cdot g)'=F'g+Fg'=fg+Fg'$. Integrera båda leden och flytta om:
$$\int f(x)g(x)\,dx=F(x)g(x)-\int F(x)g'(x)\,dx.$$
Här **integreras** $f$ (pil upp ↑) och **deriveras** $g$ (pil ner ↓). Lärarens uppställning: $\left[\begin{array}{ll}f(x)=\dots&\Rightarrow F(x)=\dots\\ g(x)=\dots&\Rightarrow g'(x)=\dots\end{array}\right]$.

**Grundidé:** döda $x^n$ med derivering. $\cos x$, $\sin x$ och $e^x$ är trevliga att integrera.

- Ibland behöver man partialintegrera **flera gånger** ($x^2\cos x$).
- Det fungerar **även utan synlig produkt**: $\ln x=1\cdot\ln x$, där $1$ integreras och $\ln x$ deriveras.
- För $\int e^x\cos x\,dx$ och $\int e^x\sin x\,dx$ spelar det ingen roll vilken faktor man integrerar, *bara man är konsekvent*. Efter två partialintegrationer kommer ursprungsintegralen tillbaka, och man löser ut den.

Kontrollera alltid genom att derivera, t.ex. för att hitta teckenfel.`,
      },
    ],
    examples: [
      {
        id: 'F2-e1', title: 'Kvalificerad gissning', q: r`Bestäm $\int\cos2x\,dx$.`,
        steps: [r`Gissa $F(x)=\sin2x$. Då är $F'(x)=2\cos2x$, vilket är dubbelt för mycket.`, r`Förbättrad gissning: $\frac12\sin2x$. Kontroll: $\left(\frac12\sin2x\right)'=\frac12\cdot2\cos2x=\cos2x$ ✓.`],
        answer: r`$\frac12\sin2x+C$`, checks: [A('sin(2*x)/2', 'cos(2*x)')],
      },
      {
        id: 'F2-e2', title: 'Kedjeregeln baklänges', q: r`Bestäm $\int\cos(x^2)\,2x\,dx$.`,
        steps: [r`$\left[t=x^2,\ \frac{dt}{dx}=2x\Rightarrow dt=2x\,dx\right]$. Den inre funktionen är $x^2$ och dess derivata $2x$ finns med.`, r`$=\int\cos t\,dt=\sin t+C=\sin(x^2)+C$ (byt tillbaka $t=x^2$).`],
        answer: r`$\sin(x^2)+C$`, checks: [A('sin(x**2)', 'cos(x**2)*2*x')],
      },
      {
        id: 'F2-e3', title: 'Inre funktion ln x', q: r`Bestäm $\int(\ln x)^4\cdot\frac1x\,dx$, $x>0$.`,
        steps: [r`Inre funktion $\ln x$ med derivatan $\frac1x$: $\left[t=\ln x,\ dt=\frac1x\,dx\right]$.`, r`$=\int t^4dt=\frac{t^5}5+C=\frac{(\ln x)^5}5+C$.`],
        answer: r`$\frac{(\ln x)^5}{5}+C$`, checks: [A('log(x)**5/5', 'log(x)**4/x')],
      },
      {
        id: 'F2-e4', title: 'Trixa lite', q: r`Bestäm $\int x\sqrt{7+x^2}\,dx$.`,
        steps: [r`$\left[t=7+x^2,\ dt=2x\,dx\Rightarrow\frac{dt}2=x\,dx\right]$.`, r`$=\int\sqrt t\,\frac{dt}2=\frac12\int t^{1/2}dt=\frac12\cdot\frac{t^{3/2}}{3/2}+C=\frac13t\sqrt t+C$.`, r`Byt tillbaka: $\frac13(7+x^2)\sqrt{7+x^2}+C$.`],
        answer: r`$\frac13(7+x^2)\sqrt{7+x^2}+C$`, checks: [A('(7+x**2)*sqrt(7+x**2)/3', 'x*sqrt(7+x**2)')],
      },
      {
        id: 'F2-e5', title: 'Första partialintegrationen', q: r`Bestäm $\int e^{2x}\cdot x\,dx$.`,
        steps: [r`$\left[\begin{array}{ll}f(x)=e^{2x}&\Rightarrow F(x)=\frac{e^{2x}}2\\ g(x)=x&\Rightarrow g'(x)=1\end{array}\right]$. Integrera $e^{2x}$, derivera $x$.`, r`$=\frac{e^{2x}}2x-\int\frac{e^{2x}}2\cdot1\,dx=\frac{xe^{2x}}2-\frac{e^{2x}}4+C$.`, r`Kontroll: $\left(\frac{xe^{2x}}2-\frac{e^{2x}}4\right)'=\frac{e^{2x}}2+xe^{2x}-\frac{e^{2x}}2=xe^{2x}$ ✓.`],
        answer: r`$\frac{xe^{2x}}{2}-\frac{e^{2x}}{4}+C$`, checks: [A('x*exp(2*x)/2-exp(2*x)/4', 'x*exp(2*x)')],
      },
      {
        id: 'F2-e6', title: 'Variabelbyte utan synlig inre derivata', q: r`Bestäm $\int e^{2\sqrt x}\,dx$.`,
        steps: [r`$\left[t=\sqrt x,\ \frac{dt}{dx}=\frac1{2\sqrt x}\Rightarrow dx=2\sqrt x\,dt=2t\,dt\right]$.`, r`$=\int e^{2t}\,2t\,dt=2\int e^{2t}t\,dt$, alltså samma typ som förra exemplet!`, r`$=2\left(\frac{te^{2t}}2-\frac{e^{2t}}4\right)+C=\sqrt x\,e^{2\sqrt x}-\frac{e^{2\sqrt x}}2+C$.`],
        answer: r`$\sqrt x\,e^{2\sqrt x}-\frac{e^{2\sqrt x}}{2}+C$`, checks: [A('sqrt(x)*exp(2*sqrt(x))-exp(2*sqrt(x))/2', 'exp(2*sqrt(x))')],
      },
      {
        id: 'F2-e7', title: 'Partialintegration två gånger', q: r`Bestäm $\int x^2\cos x\,dx$.`,
        steps: [r`$\left[f=\cos x\Rightarrow F=\sin x;\ g=x^2\Rightarrow g'=2x\right]$: $=x^2\sin x-2\int x\sin x\,dx$.`, r`Igen: $\left[f=\sin x\Rightarrow F=-\cos x;\ g=x\Rightarrow g'=1\right]$: $\int x\sin x\,dx=-x\cos x+\int\cos x\,dx=-x\cos x+\sin x$.`, r`Totalt: $x^2\sin x-2(-x\cos x+\sin x)=x^2\sin x+2x\cos x-2\sin x+C$.`],
        answer: r`$x^2\sin x+2x\cos x-2\sin x+C$`, checks: [A('x**2*sin(x)+2*x*cos(x)-2*sin(x)', 'x**2*cos(x)')],
      },
      {
        id: 'F2-e8', title: 'Trick: 1 · ln x', q: r`Bestäm $\int\ln x\,dx$.`,
        steps: [r`Skriv $\ln x=1\cdot\ln x$: $\left[f=1\Rightarrow F=x;\ g=\ln x\Rightarrow g'=\frac1x\right]$.`, r`$=x\ln x-\int x\cdot\frac1x\,dx=x\ln x-x+C$.`, r`Kontroll: $(x\ln x-x)'=\ln x+1-1=\ln x$ ✓. Fantastiskt!`],
        answer: r`$x\ln x-x+C$`, checks: [A('x*log(x)-x', 'log(x)')],
      },
      {
        id: 'F2-e9', title: 'Ekvationstricket', q: r`Bestäm $\int e^x\cos x\,dx$.`,
        steps: [r`$\left[f=e^x\Rightarrow F=e^x;\ g=\cos x\Rightarrow g'=-\sin x\right]$: $=e^x\cos x+\int e^x\sin x\,dx$.`, r`Igen: $\int e^x\sin x\,dx=e^x\sin x-\int e^x\cos x\,dx$. Det är integralen vi började med!`, r`$\int e^x\cos x\,dx=e^x\cos x+e^x\sin x-\int e^x\cos x\,dx$. Flytta över: $2\int e^x\cos x\,dx=e^x(\cos x+\sin x)+C_1$.`],
        answer: r`$\frac{e^x}{2}(\cos x+\sin x)+C$`, checks: [A('exp(x)*(cos(x)+sin(x))/2', 'exp(x)*cos(x)')],
      },
    ],
    quiz: [
      { id: 'F2-q1', area: 'int-primitiva', q: r`Vad betyder $\int f(x)\,dx=F(x)+C$, och varför $+C$?`, a: r`Mängden av *alla* primitiva funktioner till $f$. Konstanter försvinner vid derivering, så alla primitiver skiljer sig med en konstant.` },
      { id: 'F2-q2', area: 'int-variabelbyte', q: r`Varför får man inte "flytta ut" $2x$ i $\int\cos(x^2)\,2x\,dx$?`, a: r`Bara konstanter får flyttas ut ur en integral. $2x$ beror på $x$. Den är i stället inre derivatan, så variabelbyte $t=x^2$ fungerar.` },
      { id: 'F2-q3', area: 'int-variabelbyte', q: r`Vad är det vanligaste misstaget efter ett variabelbyte i en obestämd integral?`, a: r`Att inte byta ut *allt* $x$ mot $t$, eller att glömma byta tillbaka till $x$ på slutet.` },
      { id: 'F2-q4', area: 'int-partiell', q: r`Partialintegrationsformeln med lärarens beteckningar?`, a: r`$\int f(x)g(x)\,dx=F(x)g(x)-\int F(x)g'(x)\,dx$, där $f$ integreras och $g$ deriveras.` },
      { id: 'F2-q5', area: 'int-partiell', q: r`Vilken faktor deriveras i $\int x^2\cos x\,dx$, och hur många gånger måste man partialintegrera?`, a: r`$x^2$ deriveras ("döda $x^n$"). Två gånger, eftersom $x^2\to2x\to2$.` },
      { id: 'F2-q6', area: 'int-partiell', q: r`Hur partialintegrerar man $\int\ln x\,dx$ när ingen produkt syns?`, a: r`Skriv $1\cdot\ln x$, integrera $1$ och derivera $\ln x$: $x\ln x-x+C$.` },
    ],
  },
  F3: {
    id: 'F3', pages: 10, sections: '§12.4 Rationella funktioner – partialbråksuppdelning',
    extraImages: [{ src: 'forelasningar/ansatser.jpg', alt: 'Lista över lämpliga ansatser för partialbråksuppdelning (handout)' }],
    keyPoints: [
      r`$\int f(x)g(x)\,dx\ne\int f(x)\,dx\cdot\int g(x)\,dx$.`,
      r`**Derivering** har regler som *måste* användas. Vid **integrering** måste man oftast testa sig fram, och vissa funktioner (t.ex. $e^{x^2}$) saknar elementär primitiv.`,
      r`$\int\frac{dx}{x\pm a}=\ln|x\pm a|+C$, $\int\frac{2x}{x^2+1}dx=\ln(x^2+1)+C$, $\int\frac{dx}{x^2+1}=\arctan x+C$.`,
      r`**Partialbråksuppdelning** är motsatsen till att skriva på gemensamt bråkstreck: ansats → multiplicera med nämnaren → identifiera koefficienter (eller *handpåläggning*).`,
      r`Fel ansats ger ingen lösning: vid dubbelrot krävs $\frac{A}{x-a}+\frac{B}{(x-a)^2}$.`,
    ],
    notes: [
      {
        heading: 'Repetition och en varning',
        body: r`Variabelsubstitution: $\int f(g(x))g'(x)\,dx=\left[t=g(x),\ dt=g'(x)dx\right]=\int f(t)\,dt=F(g(x))+C$.

Partialintegration: $\int f(x)g(x)\,dx=F(x)g(x)-\int F(x)g'(x)\,dx$.

⚠️ $\int f\cdot g\,dx\ne\int f\,dx\cdot\int g\,dx$. Med $f=2x$, $g=3x^2$: $\int6x^3dx=\frac{6x^4}4+C$, men $\int2x\,dx\cdot\int3x^2dx=(x^2+C_1)(x^3+C_2)=x^5+\dots$. Det är inte samma sak.`,
      },
      {
        heading: 'Enkla rationella funktioner',
        body: r`Med standardintegraler och metoderna ovan:
- $\int\frac{dx}{x-7}=[t=x-7,\ dt=dx]=\ln|x-7|+C$. Generellt: $\int\frac{dx}{x\pm a}=\ln|x\pm a|+C$.
- $\int\frac{2x}{x^2+1}dx=[t=x^2+1,\ dt=2x\,dx]=\ln(x^2+1)+C$.
- $\int\frac{x^2}{x^2+1}dx$: **om graden av täljaren ≥ graden av nämnaren måste man först göra polynomdivision**, med kort division ("lägg till och dra ifrån") eller med liggande stolen: $\frac{x^2+1-1}{x^2+1}=1-\frac1{x^2+1}$, vilket ger $x-\arctan x+C$.`,
      },
      {
        heading: 'Derivering vs. integrering',
        body: r`**Derivering:** regler *måste* användas. En produkt kräver produktregeln och en sammansatt funktion kräver kedjeregeln.

**Integrering:** metoder (trick). Man måste oftast testa sig fram till vilken metod som fungerar. Ibland fungerar variabelsubstitution, ibland partialintegration, ibland båda, ibland ingen. Ibland något helt annat.

Exempel: $f(x)=e^{x^2}$. Ingen metod fungerar, eftersom primitiven inte kan skrivas med elementära funktioner.`,
      },
      {
        heading: 'Två nästan likadana integraler',
        body: r`$\int\frac{2}{x^2+1}dx=2\arctan x+C$, en standardintegral.

$\int\frac2{x^2-1}dx$ är ingen standardintegral, och den är väldigt svår med variabelsubstitution eller partialintegration. Gör i stället så här:
1. **Faktorisera** nämnaren: $x^2-1=(x-1)(x+1)$.
2. **Skriv med "uppdelat bråkstreck"**: $\frac2{(x-1)(x+1)}=\frac1{x-1}-\frac1{x+1}$ (kontrollera genom att sätta på gemensamt bråkstreck).
3. **Integrera:** $\ln|x-1|-\ln|x+1|+C=\ln\left|\frac{x-1}{x+1}\right|+C$. Toppen!`,
      },
      {
        heading: 'Partialbråksuppdelning – metoden',
        body: r`Hur kommer man fram till $\frac2{(x-1)(x+1)}=\frac1{x-1}-\frac1{x+1}$? Med **partialbråksuppdelning**, motsatsen till att skriva på gemensamt bråkstreck.

1. **Ansats** (en "kvalificerad gissning"), t.ex. $\frac{x+4}{(x-2)(x-3)}=\frac A{x-2}+\frac B{x-3}$, där $A$ och $B$ är reella tal.
2. **Multiplicera** båda leden med nämnaren i VL: $x+4=A(x-3)+B(x-2)$ (*).
3. **Identifiera koefficienter** framför $x$ och konstanttermer: $1=A+B$ och $4=-3A-2B$ ger $A=-6$, $B=7$.

**Handpåläggning** (snabbare): (*) gäller för *alla* $x$, särskilt för nämnarens nollställen. $x=3$: $7=B$. $x=2$: $6=-A$. Smidigt!`,
      },
      {
        heading: 'När ansatsen är fel – och lista över ansatser',
        body: r`Prova $\frac{2x}{(x-1)^2}=\frac A{x-1}+\frac B{x-1}$. Multiplicera med $(x-1)^2$ och sätt $x=1$: $2=0$??? **Ansatsen var fel**. Två termer med samma nämnare blir bara $\frac{A+B}{x-1}$, och kan aldrig ge $(x-1)^2$ i nämnaren.

**Lista över lämpliga ansatser** (se även handouten nedan):
- grad $p<2$, $a\ne b$: $\frac{p(x)}{(x-a)(x-b)}=\frac A{x-a}+\frac B{x-b}$,
- dubbelrot: $\frac{p(x)}{(x-a)^2}=\frac A{x-a}+\frac B{(x-a)^2}$,
- grad $p<3$, med en faktor $x^2+bx+d$ utan reella nollställen: $\frac{p(x)}{(x-a)(x^2+bx+d)}=\frac A{x-a}+\frac{Bx+C}{x^2+bx+d}$.

Generalisering: se sidan 291 i läroboken.`,
      },
    ],
    examples: [
      { id: 'F3-e1', title: 'Polynomdivision först', q: r`Bestäm $\int\frac{x^2}{x^2+1}dx$.`, steps: [r`Graden av täljaren ≥ graden av nämnaren, så gör först en kort division: $\frac{x^2}{x^2+1}=\frac{x^2+1-1}{x^2+1}=1-\frac1{x^2+1}$.`, r`$\int1\,dx-\int\frac{dx}{x^2+1}=x-\arctan x+C$ (standardintegral).`], answer: r`$x-\arctan x+C$`, checks: [A('x-atan(x)', 'x**2/(x**2+1)')] },
      { id: 'F3-e2', title: 'Uppdelat bråkstreck', q: r`Bestäm $\int\frac{2}{x^2-1}dx$.`, steps: [r`Faktorisera: $x^2-1=(x-1)(x+1)$, så $\frac2{(x-1)(x+1)}=\frac1{x-1}-\frac1{x+1}$.`, r`Kontroll: $\frac{(x+1)-(x-1)}{(x-1)(x+1)}=\frac2{x^2-1}$ ✓.`, r`$\int\frac{dx}{x-1}-\int\frac{dx}{x+1}=\ln|x-1|-\ln|x+1|+C$.`], answer: r`$\ln\left|\frac{x-1}{x+1}\right|+C$`, checks: [A('log(x-1)-log(x+1)', '2/(x**2-1)')] },
      { id: 'F3-e3', title: 'Partialbråk med identifiering och handpåläggning', q: r`Partialbråksuppdela $\frac{x+4}{(x-2)(x-3)}$ och bestäm $\int\frac{x+4}{(x-2)(x-3)}dx$.`, steps: [r`Ansats: $\frac{x+4}{(x-2)(x-3)}=\frac A{x-2}+\frac B{x-3}$. Multiplicera med nämnaren: $x+4=A(x-3)+B(x-2)$.`, r`Handpåläggning: $x=3$ ger $7=B$. $x=2$ ger $6=-A$, alltså $A=-6$.`, r`Kontroll: $\frac{-6(x-3)+7(x-2)}{(x-2)(x-3)}=\frac{x+4}{(x-2)(x-3)}$ ✓.`, r`$\int\left(\frac{-6}{x-2}+\frac7{x-3}\right)dx=-6\ln|x-2|+7\ln|x-3|+C$.`], answer: r`$-6\ln|x-2|+7\ln|x-3|+C$`, checks: [A('-6*log(x-2)+7*log(x-3)', '(x+4)/((x-2)*(x-3))')] },
      { id: 'F3-e4', title: 'Dubbelrot – rätt ansats', q: r`Bestäm $\int\frac{2x}{(x-1)^2}dx$.`, steps: [r`Rätt ansats: $\frac{2x}{(x-1)^2}=\frac A{x-1}+\frac B{(x-1)^2}$, alltså $2x=A(x-1)+B$.`, r`$x=1$ ger $B=2$. Sätt sedan in t.ex. $x=0$: $0=-A+2$, så $A=2$.`, r`$\int\frac{dx}{(x-1)^2}=[t=x-1]=\int t^{-2}dt=-\frac1{x-1}$.`, r`Totalt: $2\ln|x-1|-\frac2{x-1}+C$.`], answer: r`$2\ln|x-1|-\frac{2}{x-1}+C$`, checks: [A('2*log(x-1)-2/(x-1)', '2*x/(x-1)**2')] },
    ],
    quiz: [
      { id: 'F3-q1', area: 'int-primitiva', q: r`Stämmer $\int f\cdot g\,dx=\int f\,dx\cdot\int g\,dx$?`, a: r`Nej! Motexempel: $f=2x$, $g=3x^2$ ger $\frac{3x^4}2$ respektive $x^5+\dots$.` },
      { id: 'F3-q2', area: 'int-primitiva', q: r`Ge ett exempel på en funktion vars primitiv inte kan skrivas med elementära funktioner.`, a: r`$e^{x^2}$ (även $\frac{\sin x}x$).` },
      { id: 'F3-q3', area: 'int-partialbrak', q: r`Vad är handpåläggning?`, a: r`Efter multiplikation med nämnaren gäller likheten för *alla* $x$. Sätt in nämnarens nollställen så att alla termer utom en försvinner, och läs av konstanten direkt.` },
      { id: 'F3-q4', area: 'int-partialbrak', q: r`Varför fungerar inte $\frac A{x-1}+\frac B{x-1}$ för $\frac{2x}{(x-1)^2}$?`, a: r`Summan blir $\frac{A+B}{x-1}$, alltså bara en nämnare $x-1$. Den kan aldrig ge $(x-1)^2$. Rätt ansats: $\frac A{x-1}+\frac B{(x-1)^2}$.` },
      { id: 'F3-q5', area: 'int-partialbrak', q: r`Ansats för $\frac{p(x)}{(x-a)(x^2+bx+d)}$ där $x^2+bx+d$ saknar reella nollställen?`, a: r`$\frac A{x-a}+\frac{Bx+C}{x^2+bx+d}$.` },
    ],
  },
  F4: {
    id: 'F4', pages: 8, sections: '§12.4 Rationella funktioner forts., §12.5 Trigonometriska funktioner',
    keyPoints: [
      r`Fyra steg för $\int\frac{p(x)}{q(x)}dx$: **1.** polynomdivision om $\deg p\ge\deg q$, **2.** faktorisera $q$, **3.** partialbråksuppdela, **4.** integrera termerna.`,
      r`⚠️ **Skräckexemplet från duggan:** $\int\frac{x^2+3}{x^2-9}dx$ utan polynomdivision. Ansatsen saknar lösning, och handpåläggning ger ett *felaktigt* svar. Kontrollera alltid!`,
      r`$\int\tan x\,dx=-\ln|\cos x|+C$, $\int\frac{dx}{\cos^2x}=\tan x+C$, $\int\frac{dx}{\sin^2x}=-\frac{\cos x}{\sin x}+C$.`,
      r`Trigformler: $\sin2x=2\sin x\cos x$, $\cos^2x=\frac{1+\cos2x}2$, $\sin^2x=\frac{1-\cos2x}2$ (från $\cos2x=2\cos^2x-1=1-2\sin^2x$).`,
    ],
    notes: [
      {
        heading: 'Steg för att lösa ∫ p(x)/q(x) dx',
        body: r`1. **Polynomdivision** om $\deg p(x)\ge\deg q(x)$.
2. **Faktorisera** $q(x)$, t.ex. genom att lösa $q(x)=0$.
3. **Partialbråksuppdela** med listan över lämpliga ansatser från förra föreläsningen.
4. **Integrera** termerna från steg 3.`,
      },
      {
        heading: 'Skräckexemplet från duggan i fjol',
        body: r`$\int\frac{x^2+3}{x^2-9}dx$. Många gjorde direkt ansatsen $\frac{x^2+3}{x^2-9}=\frac A{x+3}+\frac B{x-3}$, alltså $x^2+3=A(x-3)+B(x+3)$.

**Det finns inga reella tal $A$, $B$ som uppfyller detta!** Högerledet har grad ≤ 1 men vänsterledet har en $x^2$-term.

Handpåläggning ger ändå "svar": $x=3$ ger $B=2$ och $x=-3$ ger $A=-2$. Men kontrollen ger $\frac{-2}{x+3}+\frac2{x-3}=\frac{12}{x^2-9}\ne\frac{x^2+3}{x^2-9}$. **Stämmer ej!** Polynomdivisionen är viktig.`,
      },
      {
        heading: '§12.5 Primitiver till trigonometriska funktioner',
        body: r`Standardintegraler: $\int\sin x\,dx=-\cos x+C$, $\int\cos x\,dx=\sin x+C$, $\int\frac{dx}{\cos^2x}=\tan x+C$, $\int\frac{dx}{\sin^2x}=-\frac{\cos x}{\sin x}+C$.

$\int\tan x\,dx=\int\frac{\sin x}{\cos x}dx=[t=\cos x,\ dt=-\sin x\,dx]=-\int\frac{dt}t=-\ln|\cos x|+C$.

**Trigonometriska formler** som behövs:
- $\sin2x=2\sin x\cos x$ (1)
- $\cos^2x+\sin^2x=1$, alltså $\cos^2x=1-\sin^2x$ (2) och $\sin^2x=1-\cos^2x$ (3)
- $\cos2x=\cos^2x-\sin^2x$. Med (3) blir det $2\cos^2x-1$, och med (2) $1-2\sin^2x$.
- Alltså **$\cos^2x=\frac{1+\cos2x}2$** (4) och **$\sin^2x=\frac{1-\cos2x}2$** (5).`,
      },
    ],
    examples: [
      { id: 'F4-e1', title: 'Alla fyra stegen', q: r`Bestäm $\int\frac{x^4+4x^2-2x+1}{x^3+x}dx$.`, steps: [r`**1.** Grad 4 > grad 3, så gör polynomdivision: $\frac{x^4+4x^2-2x+1}{x^3+x}=x+\frac{3x^2-2x+1}{x^3+x}$.`, r`**2.** Faktorisera: $x^3+x=x(x^2+1)$, där $x^2+1$ saknar reella nollställen.`, r`**3.** $\frac{3x^2-2x+1}{x(x^2+1)}=\frac Ax+\frac{Bx+C}{x^2+1}$, alltså $3x^2-2x+1=(A+B)x^2+Cx+A$. Identifiera: $A=1$, $C=-2$, $B=2$.`, r`**4.** $\int\left(x+\frac1x+\frac{2x}{x^2+1}-\frac2{x^2+1}\right)dx=\frac{x^2}2+\ln|x|+\ln(x^2+1)-2\arctan x+C$.`], answer: r`$\frac{x^2}{2}+\ln|x|+\ln(x^2+1)-2\arctan x+C$`, checks: [A('x**2/2+log(x)+log(x**2+1)-2*atan(x)', '(x**4+4*x**2-2*x+1)/(x**3+x)')] },
      { id: 'F4-e2', title: 'Skräckexemplet – gjort rätt', note: 'Fullständig lösning (inte genomräknad på föreläsningen).', q: r`Bestäm $\int\frac{x^2+3}{x^2-9}dx$.`, steps: [r`Polynomdivision (kort division): $\frac{x^2+3}{x^2-9}=\frac{(x^2-9)+12}{x^2-9}=1+\frac{12}{x^2-9}$.`, r`$\frac{12}{(x-3)(x+3)}=\frac A{x-3}+\frac B{x+3}$: $x=3$ ger $A=2$, $x=-3$ ger $B=-2$.`, r`$\int\left(1+\frac2{x-3}-\frac2{x+3}\right)dx=x+2\ln|x-3|-2\ln|x+3|+C$.`], answer: r`$x+2\ln|x-3|-2\ln|x+3|+C$`, checks: [A('x+2*log(x-3)-2*log(x+3)', '(x**2+3)/(x**2-9)')] },
      { id: 'F4-e3', title: 'Variabelbyte t = sin x', q: r`Bestäm $\int\cos x\sin^2x\,dx$.`, steps: [r`$[t=\sin x,\ dt=\cos x\,dx]$: $\int t^2dt=\frac{t^3}3+C$.`], answer: r`$\frac{\sin^3x}{3}+C$`, checks: [A('sin(x)**3/3', 'cos(x)*sin(x)**2')] },
      { id: 'F4-e4', title: 'Formeln för sin 2x', q: r`Bestäm $\int\frac{\sin2x}{\cos x}dx$.`, steps: [r`Med (1): $\frac{2\sin x\cos x}{\cos x}=2\sin x$.`, r`$\int2\sin x\,dx=-2\cos x+C$.`], answer: r`$-2\cos x+C$`, checks: [A('-2*cos(x)', 'sin(2*x)/cos(x)')] },
      { id: 'F4-e5', title: 'Udda potens', q: r`Bestäm $\int\cos^3x\,dx$.`, steps: [r`$\cos^3x=\cos x\cdot\cos^2x=\cos x(1-\sin^2x)$ med (2).`, r`$\int\cos x\,dx-\int\cos x\sin^2x\,dx=\sin x-\frac{\sin^3x}3+C$ (den andra integralen löstes i förra exemplet).`], answer: r`$\sin x-\frac{\sin^3x}{3}+C$`, checks: [A('sin(x)-sin(x)**3/3', 'cos(x)**3')] },
      { id: 'F4-e6', title: 'Jämn potens – dubbla vinkeln', q: r`Bestäm $\int\sin^2x\,dx$.`, steps: [r`Med (5): $\int\frac{1-\cos2x}2dx=\frac12x-\frac12\int\cos2x\,dx$.`, r`$=\frac12x-\frac12\cdot\frac{\sin2x}2+C=\frac x2-\frac{\sin2x}4+C$.`], answer: r`$\frac{x}{2}-\frac{\sin2x}{4}+C$`, checks: [A('x/2-sin(2*x)/4', 'sin(x)**2')] },
    ],
    quiz: [
      { id: 'F4-q1', area: 'int-partialbrak', q: r`Vilka är de fyra stegen för $\int\frac{p(x)}{q(x)}dx$?`, a: r`1. Polynomdivision om $\deg p\ge\deg q$. 2. Faktorisera $q$. 3. Partialbråksuppdela. 4. Integrera termerna.` },
      { id: 'F4-q2', area: 'int-partialbrak', q: r`Varför finns inga $A$, $B$ med $x^2+3=A(x-3)+B(x+3)$?`, a: r`Högerledet har grad ≤ 1 och kan aldrig ge termen $x^2$. Man måste polynomdividera först. Handpåläggning ger ändå siffror, så kontrollera alltid!` },
      { id: 'F4-q3', area: 'int-trig', q: r`Härled $\sin^2x=\frac{1-\cos2x}2$.`, a: r`$\cos2x=\cos^2x-\sin^2x=(1-\sin^2x)-\sin^2x=1-2\sin^2x$. Lös ut $\sin^2x$.` },
      { id: 'F4-q4', area: 'int-trig', q: r`Hur integrerar man en udda potens som $\cos^3x$?`, a: r`Spara en faktor $\cos x$ och skriv resten med $\cos^2x=1-\sin^2x$. Gör sedan variabelbyte $t=\sin x$.` },
    ],
  },
  F5: {
    id: 'F5', pages: 11, sections: '§13.3 Riemannsummor, §13.4 Räknelagar för integraler', widget: 'riemann',
    keyPoints: [
      r`**Obestämd** integral $\int f(x)\,dx$ = mängden av alla primitiver ($F(x)+C$). **Bestämd** integral $\int_a^bf(x)\,dx$ = *ett tal* ($=F(b)-F(a)$, mer om det nästa gång).`,
      r`Om $f\ge0$ är $\int_a^bf(x)\,dx$ arean mellan $x=a$, $x=b$, $y=0$ och $y=f(x)$. Area är alltid ≥ 0, men en integral kan vara < 0: "area över $x$-axeln minus area under".`,
      r`**Riemannsumma:** $\sum_{l=1}^nf(\xi_l)(x_l-x_{l-1})$. När indelningens finhet går mot 0 går summan mot $\int_a^bf(x)\,dx$ (Sats 13.3, $f$ kontinuerlig).`,
      r`Deriverbar ⇒ kontinuerlig ⇒ integrerbar.`,
      r`**Räkneregler (Sats 13.4):** konstanter ut, summor delas upp, $\int_a^b=\int_a^c+\int_c^b$, monotoni, triangelolikheten. Definitioner: $\int_b^a=-\int_a^b$ och $\int_a^a=0$.`,
    ],
    notes: [
      {
        heading: 'Obestämd vs. bestämd integral',
        body: r`$\int f(x)\,dx$ (obestämd integral) är "mängden av alla primitiva funktioner till $f$", alltså $F(x)+C$.

$\int_a^bf(x)\,dx$ (bestämd integral) är "integralen av $f$ över intervallet $[a,b]$", alltså **ett tal** ($=F(b)-F(a)$, mer om det nästa gång).

Vi börjar med att tänka på integraler i termer av **area**, eftersom det tankesättet är viktigt i kommande kurser. Om $f(x)\ge0$ på $[a,b]$ är $\int_a^bf(x)\,dx$ arean av området mellan $x=a$, $x=b$, $y=0$ och $y=f(x)$.`,
      },
      {
        heading: 'Riemannsummor',
        body: r`Hur bestämmer man $\int_a^bf(x)\,dx$ i mer generella fall? **Täck området med rektanglar och summera deras areor.** Fler rektanglar ger en bättre uppskattning.

Dela upp $[a,b]$ i $n$ delintervall $[x_0,x_1],[x_1,x_2],\dots,[x_{n-1},x_n]$ och välj en punkt $\xi_l$ ("ksi") i varje delintervall. Rektangel nr $l$ har basen $x_l-x_{l-1}$ och höjden $f(\xi_l)$:
$$A\approx\sum_{l=1}^nf(\xi_l)(x_l-x_{l-1}).$$
Detta är en **Riemannsumma** till $f$ på $[a,b]$. Längden $\Delta x_l=x_l-x_{l-1}$ kallas indelningens *finhet*.

**Sats 13.3.** Om $f$ är kontinuerlig på $[a,b]$ gäller att Riemannsummorna går mot $\int_a^bf(x)\,dx$ när indelningarnas finhet går mot 0 ($n\to\infty$). Satsen kräver inte $f\ge0$.

**Anm.** Deriverbar ⇒ kontinuerlig ⇒ integrerbar (Riemannsummorna konvergerar när finheten → 0).

Testa själv med reglaget nedan!`,
      },
      {
        heading: 'Negativa funktioner',
        body: r`Om $f(x)\le0$ på $[a,b]$ är $\int_a^bf(x)\,dx=-(\text{arean av området mellan }x=a,\ x=b,\ y=0\text{ och }y=f(x))$.

Exempel: $\int_0^3(-x)\,dx=-(\text{triangelns area})=-\frac{3\cdot3}2=-\frac92$.

**Area är alltid ≥ 0, men värdet av en integral kan vara < 0:**
$$\int_a^bf(x)\,dx=\text{"area över }x\text{-axeln"}-\text{"area under }x\text{-axeln"}.$$`,
      },
      {
        heading: '§13.4 Räkneregler (Sats 13.4)',
        body: r`Om man tänker på integraler som summor av areor är det lätt att övertyga sig om följande. Antag att $f$ och $g$ är integrerbara på $[a,b]$:
1. $\int_a^bk\,f(x)\,dx=k\int_a^bf(x)\,dx$ ($k$ konstant): dubbla höjden ger dubbla arean.
2. $\int_a^b(f+g)\,dx=\int_a^bf\,dx+\int_a^bg\,dx$: rektanglarna staplas på varandra.
3. $\int_a^bf\,dx=\int_a^cf\,dx+\int_c^bf\,dx$ ($a<c<b$): total area $A=A_1+A_2$.
4. Om $f(x)\le g(x)$ för $a\le x\le b$ är $\int_a^bf\,dx\le\int_a^bg\,dx$.

Dessutom gäller **triangelolikheten** $\left|\int_a^bf\,dx\right|\le\int_a^b|f|\,dx$ ($a\le b$), och två **definitioner**: $\int_b^af\,dx=-\int_a^bf\,dx$ och $\int_a^af\,dx=0$.`,
      },
    ],
    examples: [
      { id: 'F5-e1', title: 'Geometriskt: rektangel', q: r`Beräkna $\int_{-1}^13\,dx$ geometriskt.`, steps: [r`Området under $y=3$ från $-1$ till $1$ är en rektangel med bas 2 och höjd 3.`, r`Area $=B\cdot H=2\cdot3=6$.`], answer: r`$6$`, checks: [D('3+0*x', -1, 1, '6')] },
      { id: 'F5-e2', title: 'Geometriskt: triangel', q: r`Beräkna $\int_0^32x\,dx$ geometriskt.`, steps: [r`Området under $y=2x$ är en triangel med bas $b=3$ och höjd $h=2\cdot3=6$.`, r`Area $=\frac{b\cdot h}2=\frac{3\cdot6}2=9$.`], answer: r`$9$`, checks: [D('2*x', 0, 3, '9')] },
      { id: 'F5-e3', title: 'Negativ integral', q: r`Beräkna $\int_0^3(-x)\,dx$.`, steps: [r`$-x\le0$ på $[0,3]$, så integralen är minus triangelns area.`, r`$-\frac{3\cdot3}2=-\frac92$.`], answer: r`$-\frac92$`, checks: [D('-x', 0, 3, '-9/2')] },
      { id: 'F5-e4', title: 'Räkneregler', q: r`Vi vet att $\int_{-1}^2f\,dx=5$, $\int_2^5f\,dx=-2$ och $\int_2^3f\,dx=1$. Beräkna a) $\int_{-1}^22f\,dx$, b) $\int_{-1}^5f\,dx$, c) $\int_3^5f\,dx$.`, steps: [r`a) Regel 1: $2\int_{-1}^2f\,dx=2\cdot5=10$.`, r`b) Regel 3: $\int_{-1}^2f+\int_2^5f=5+(-2)=3$.`, r`c) Regel 3: $\int_2^5f=\int_2^3f+\int_3^5f$, alltså $-2=1+\int_3^5f$ och $\int_3^5f=-3$.`], answer: r`a) $10$, b) $3$, c) $-3$` },
      { id: 'F5-e5', title: 'En vanlig fälla', q: r`Om $\int_2^4f(x)\,dx=6$, är då $\int_2^4\frac{1}{f(x)}dx=\frac16$?`, steps: [r`Nej! Testa $f(x)=3$: $\int_2^43\,dx=2\cdot3=6$ ✓.`, r`Men $\int_2^4\frac13dx=2\cdot\frac13=\frac23\ne\frac16$.`], answer: r`Nej (motexempel $f=3$ ger $\frac23$)` },
    ],
    quiz: [
      { id: 'F5-q1', area: 'int-teori', q: r`Vad är skillnaden mellan $\int f(x)\,dx$ och $\int_a^bf(x)\,dx$?`, a: r`Den obestämda integralen är en mängd funktioner, $F(x)+C$. Den bestämda integralen är ett tal, $F(b)-F(a)$.` },
      { id: 'F5-q2', area: 'int-teori', q: r`Vad är en Riemannsumma?`, a: r`$\sum f(\xi_l)(x_l-x_{l-1})$: summan av rektanglar med bas $x_l-x_{l-1}$ och höjd $f(\xi_l)$, där $\xi_l$ är en punkt i delintervall $l$. Den går mot integralen när finheten → 0.` },
      { id: 'F5-q3', area: 'int-teori', q: r`Kan en bestämd integral vara negativ? Kan en area det?`, a: r`Integralen kan vara negativ: "area över $x$-axeln minus area under". En area är alltid ≥ 0.` },
      { id: 'F5-q4', area: 'int-teori', q: r`Fyll i: deriverbar ⇒ … ⇒ …`, a: r`Deriverbar ⇒ kontinuerlig ⇒ integrerbar.` },
      { id: 'F5-q5', area: 'int-teori', q: r`$\int_b^af\,dx=?$ och $\int_a^af\,dx=?$`, a: r`$-\int_a^bf\,dx$ respektive $0$ (definitioner).` },
    ],
  },
}

/** Alla lärarexempel med kontroller (för scripts/verify.py). */
export const LECTURE_EXAMPLES = Object.values(LECTURES).flatMap((l) => l.examples)
