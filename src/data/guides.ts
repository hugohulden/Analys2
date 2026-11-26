const r = String.raw

export interface MomentGuide {
  /** Läs innan föreläsningen. */
  preview: string
  /** Om övningarna: vad de tränar, metod, löst exempel, vanliga fel. */
  practice: string
}

/** Ö-pass → vilka föreläsningar övningstillfället bygger på. */
export const EXERCISE_SESSION_COVERS: Record<string, string[]> = {
  Ö1: ['F1', 'F2'], Ö2: ['F2', 'F3'], Ö3: ['F3', 'F4'], Ö4: ['F5', 'F6'], Ö5: ['F6', 'F7'], Ö6: ['F8', 'F9'],
  Ö7: ['F10'], Ö8: ['F11', 'F12'], Ö9: ['F13', 'F14'], Ö10: ['F14', 'F15'], Ö11: ['F16', 'F17'], Ö12: ['F18', 'F19'],
}

export const GUIDES: Record<string, MomentGuide> = {
  F1: {
    preview: r`**Vad handlar det om?** Integration är derivering baklänges. $F$ är en *primitiv funktion* till $f$ om $F'(x)=f(x)$. Om $F$ är en primitiv så är alla primitiver $F(x)+C$, eftersom konstanter försvinner vid derivering. Därför skriver man alltid $+C$.

**Nyckelidéer.**
- Standardprimitiverna: $\int x^a\,dx=\frac{x^{a+1}}{a+1}$ för $a\ne-1$, $\int\frac{dx}x=\ln|x|$, $\int e^{kx}dx=\frac1ke^{kx}$, $\int\cos x=\sin x$, $\int\sin x=-\cos x$, $\int\frac{dx}{1+x^2}=\arctan x$.
- Linjäritet: $\int(af+bg)=a\int f+b\int g$.
- Kontroll: derivera ditt svar, så ska du få tillbaka integranden.

**Varför?** Allt i kursen bygger på detta: alla integrationsmetoder, areor, volymer och differentialekvationer. Bara en primitiv står på formelbladet, så tabellen måste sitta utantill.

**Efter föreläsningen ska du kunna** ta fram primitiver till summor av potenser, exponential- och trigonometriska funktioner direkt.`,
    practice: r`**Vad övningarna tränar (12.1–12.6).** Att känna igen standardprimitiver och skriva om uttryck så att de passar tabellen.

**Metod.**
1. Skriv om på potensform: $\sqrt x=x^{1/2}$, $\frac1{x^2}=x^{-2}$.
2. Dela upp i termer och ta primitiv till varje term.
3. Är den inre funktionen $ax+b$? Ta primitiv till den yttre funktionen och dela med $a$.
4. Kontrollera genom att derivera.

**Löst exempel.** $\int\left(3\sqrt x-\frac2{x^2}+e^{2x}\right)dx$.

Skriv om: $3x^{1/2}-2x^{-2}+e^{2x}$. Termvis: $3\cdot\frac{x^{3/2}}{3/2}-2\cdot\frac{x^{-1}}{-1}+\frac12e^{2x}=2x^{3/2}+\frac2x+\frac12e^{2x}+C$.

*Kontroll:* $\frac{d}{dx}\left(2x^{3/2}+2x^{-1}+\frac12e^{2x}\right)=3x^{1/2}-2x^{-2}+e^{2x}$ ✓.

**Vanliga fel.** Att glömma $+C$. Att skriva $\int\frac1x=\ln x$ i stället för $\ln|x|$. Att glömma faktorn $\frac1k$ i $\int e^{kx}$. Att tro att $\int f\cdot g=\int f\cdot\int g$.`,
  },
  F2: {
    preview: r`**Vad handlar det om?** Två metoder som är kedjeregeln och produktregeln baklänges.

**Variabelbyte (substitution).** $\int f(g(x))\,g'(x)\,dx=\int f(u)\,du$ med $u=g(x)$. Använd metoden när en *inre funktion och dess derivata* båda finns med, t.ex. $\int x^2\cos x^3\,dx$.

**Partialintegration.** $\int f(x)g(x)\,dx=F(x)g(x)-\int F(x)g'(x)\,dx$ ($f$ integreras, $g$ deriveras – lärarens skrivsätt). Använd metoden för *produkter*, t.ex. $\int xe^x\,dx$ eller $\int x\ln x\,dx$. Välj $g$ som den faktor som blir enklare av att deriveras: polynom, $\ln x$ eller $\arctan x$.

**Varför?** Precis de här metoderna testades på Dugga 1 och återkommer som tentauppgift 3 (cirka 10 p).

**Efter föreläsningen ska du kunna** avgöra vilken metod som passar, och genomföra den med korrekt hantering av $du$, gränser och $+C$.`,
    practice: r`**Vad övningarna tränar (12.7–12.21).** Snabbt igenkännande av "inre derivata" och val av faktorer vid partialintegration.

**Löst exempel 1 (variabelbyte).** $\int x\sqrt{1+x^2}\,dx$. Den inre funktionen är $1+x^2$, med derivata $2x$, och $x$ finns i integranden. Sätt $u=1+x^2$, $du=2x\,dx$, alltså $x\,dx=\frac12du$:
$$\int x\sqrt{1+x^2}\,dx=\frac12\int u^{1/2}du=\frac12\cdot\frac23u^{3/2}+C=\frac13(1+x^2)^{3/2}+C.$$

**Löst exempel 2 (partialintegration).** $\int xe^{2x}\,dx$. Derivera $x$ (blir 1) och integrera $e^{2x}$ (blir $\frac12e^{2x}$):
$$\int xe^{2x}dx=\frac x2e^{2x}-\int\frac12e^{2x}dx=\frac x2e^{2x}-\frac14e^{2x}+C.$$

**Tumregel för partialintegration.** Derivera polynomet, utom när den andra faktorn är $\ln x$ eller $\arctan x$; då deriveras de.

**Vanliga fel.** Att inte byta gränser i bestämda integraler. Att ha kvar $x$ efter bytet (då är $u$ fel valt). Att välja fel faktor så att integralen blir svårare. Teckenfel med $-\frac13e^{-3x}$.`,
  },
  F3: {
    preview: r`**Vad handlar det om?** Integraler av rationella funktioner $\frac{p(x)}{q(x)}$. Knepet är att dela upp bråket i enklare bråk som vart och ett har en känd primitiv.

**Arbetsgång.**
1. **Gradtal:** Är grad $p\ge$ grad $q$? Gör då polynomdivision först.
2. **Faktorisera** nämnaren.
3. **Ansats:** $\frac A{x-a}$ för varje enkel rot, $\frac A{x-a}+\frac B{(x-a)^2}$ för en dubbelrot, $\frac{Bx+C}{x^2+c}$ för en kvadratisk faktor utan reella rötter.
4. **Bestäm konstanterna** med handpåläggning (sätt in rötterna) eller genom att identifiera koefficienter.
5. **Integrera** termvis. Svaret blir $\ln$-termer, $-\frac B{x-a}$ och $\arctan$.

**Varför?** Partialbråk var en av tre uppgifter på varje dugga och finns som 3c på alla tentor.`,
    practice: r`**Vad övningarna tränar (12.22–12.27).** Hela arbetsgången: division, faktorisering, ansats, koefficienter och integration.

**Löst exempel.** $\int\frac{x+5}{x^2+x-2}\,dx$.

Grad 1 < grad 2, så ingen division behövs. Faktorisera: $x^2+x-2=(x-1)(x+2)$.

Ansats: $\frac{x+5}{(x-1)(x+2)}=\frac A{x-1}+\frac B{x+2}$, alltså $x+5=A(x+2)+B(x-1)$.

*Handpåläggning:* $x=1$ ger $6=3A$, så $A=2$. $x=-2$ ger $3=-3B$, så $B=-1$.

*Kontroll:* $2(x+2)-(x-1)=x+5$ ✓.

$$\int\left(\frac2{x-1}-\frac1{x+2}\right)dx=2\ln|x-1|-\ln|x+2|+C.$$

**Vanliga fel.** Att glömma polynomdivision (ht24 #3c). Att bara ta med $\frac B{(x-a)^2}$ vid en dubbelrot. Att skriva $\frac{B}{x^2+1}$ i stället för $\frac{Bx+C}{x^2+1}$.`,
  },
  F4: {
    preview: r`**Vad handlar det om?** Två fortsättningar.

**1. Kvadratiska faktorer utan reella rötter.** Kvadratkomplettera nämnaren, t.ex. $x^2+2x+5=(x+1)^2+4$. Dela upp täljaren i "(konstant) · nämnarens derivata" plus en rest. Den första delen ger $\ln$, resten ger $\arctan$.

**2. Trigonometriska integraler.**
- Jämna potenser: $\sin^2x=\frac{1-\cos2x}2$ och $\cos^2x=\frac{1+\cos2x}2$.
- Udda potens: spara en faktor och byt variabel, $t=\cos x$ eller $t=\sin x$.
- Produkter som $\sin5x\cos x$: produktformler eller Eulers formler.
- $\tan x=\frac{\sin x}{\cos x}$ ger $-\ln|\cos x|$.

**Varför?** Areor under $\sin^2x$ och $\cos^2x$ kom på både ht24 och ht25, och $\int\tan x$ på omtentan.`,
    practice: r`**Vad övningarna tränar (12.28–12.35, häftet).** Kvadratkomplettering med uppdelning i $\ln$ och $\arctan$, samt trigonometriska omskrivningar.

**Löst exempel 1.** $\int\frac{2x+3}{x^2+2x+5}dx$. Nämnarens derivata är $2x+2$, så $2x+3=(2x+2)+1$:
$$\int\frac{2x+2}{x^2+2x+5}dx+\int\frac{dx}{(x+1)^2+4}=\ln(x^2+2x+5)+\frac12\arctan\frac{x+1}2+C.$$
(Den sista integralen: $\int\frac{dt}{t^2+4}=\frac12\arctan\frac t2$.)

**Löst exempel 2.** $\int\sin^3x\,dx=\int\sin x(1-\cos^2x)\,dx$. Sätt $t=\cos x$, $dt=-\sin x\,dx$:
$$-\int(1-t^2)dt=-t+\frac{t^3}3+C=-\cos x+\frac{\cos^3x}3+C.$$

**Vanliga fel.** Att tro att $\int\sin^2x\,dx=\frac{\sin^3x}3$. Att glömma faktorn framför $\arctan$ när nämnaren är $t^2+a^2$ med $a\ne1$.`,
  },
  F5: {
    preview: r`**Vad handlar det om?** Den *bestämda integralen* $\int_a^bf(x)\,dx$. Den definieras som gränsvärdet av Riemannsummor $\sum f(\xi_k)\Delta x_k$, alltså summan av tunna rektanglar.

**Tolkning.** Integralen är *signerad area*: area ovanför $x$-axeln räknas positivt och area under räknas negativt.

**Räkneregler.**
- Linjäritet.
- $\int_a^b=\int_a^c+\int_c^b$.
- $\int_a^b=-\int_b^a$.
- Monotoni: $f\le g\Rightarrow\int f\le\int g$.
- $\left|\int f\right|\le\int|f|$.

**Varför?** Räknereglerna kom som tentauppgift 4a, och den signerade arean som omtentans $S(x)$-uppgift med en graf.`,
    practice: r`**Vad övningarna tränar (13.4, 13.9, integrering.pdf).** Att räkna integraler geometriskt (rektanglar, trianglar), att uppskatta integraler och att känna igen en Riemannsumma.

**Löst exempel.** Beräkna $\lim_{n\to\infty}\sum_{k=1}^n\frac1n\left(\frac kn\right)^2$.

Känn igen strukturen: $\Delta x=\frac1n$ och punkterna $\xi_k=\frac kn$ fyller ut $[0,1]$. Summan är en Riemannsumma för $f(x)=x^2$ på $[0,1]$, så
$$\lim_{n\to\infty}\sum_{k=1}^n\frac1n\left(\frac kn\right)^2=\int_0^1x^2dx=\frac13.$$

**Rimlighetskontroll (13.4).** Är integranden positiv måste integralen vara positiv. Det är ett snabbt sätt att hitta fel.

**Vanliga fel.** Att räkna area under $x$-axeln som positiv i en integral (den är negativ). Att blanda ihop "area" (alltid $\ge0$) med "integral".`,
  },
  F6: {
    preview: r`**Vad handlar det om?** *Analysens huvudsats* kopplar ihop derivata och integral.

1. Om $f$ är kontinuerlig och $S(x)=\int_a^xf(t)\,dt$ så är $S'(x)=f(x)$.
2. *Insättningsformeln:* $\int_a^bf(x)\,dx=F(b)-F(a)$ om $F'=f$.

Med kedjeregeln: $\frac{d}{dx}\int_a^{g(x)}f(t)\,dt=f(g(x))\cdot g'(x)$.

**Varför?** Huvudsatsen förklarar varför primitiver räknar ut areor. Den återkommer på tentan som uppgift 4: att derivera en integral och att hitta max/min av $S(x)$.

**Efter föreläsningen ska du kunna** derivera integraler med variabla gränser och teckenstudera $S'=f$.`,
    practice: r`**Vad övningarna tränar (13.10–13.19, integrering.pdf).** Derivering av integraler, max/min för $S(x)$ och beräkning av bestämda integraler (med partialintegration och variabelbyte där gränserna byts).

**Löst exempel 1.** Derivera $G(x)=\int_x^{x^2}e^{t^2}dt$. Dela vid en fast punkt: $G=\int_0^{x^2}-\int_0^x$. Då är
$$G'(x)=e^{(x^2)^2}\cdot2x-e^{x^2}=2xe^{x^4}-e^{x^2}.$$

**Löst exempel 2.** Var är $S(x)=\int_0^x(t^2-1)\,dt$ minimal för $x\ge0$? $S'(x)=x^2-1$ är negativ på $(0,1)$ och positiv för $x>1$, så minimum ligger i $x=1$. Integralen behöver inte räknas ut!

**Vanliga fel.** Att glömma inre derivatan $g'(x)$. Att glömma att byta gränser vid variabelbyte. Att räkna ut integralen i onödan.`,
  },
  F7: {
    preview: r`**Vad handlar det om?** *Generaliserade integraler*: antingen är intervallet obegränsat ($\int_1^\infty$), eller så är integranden obegränsad (t.ex. $\frac1{\sqrt x}$ nära 0, eller $\frac1{x^2}$ vid $x=0$ *inne i* intervallet).

**Definition.** Ersätt problempunkten med en variabel och ta gränsvärdet: $\int_1^\infty f=\lim_{R\to\infty}\int_1^Rf$. Finns gränsvärdet är integralen *konvergent*, annars *divergent*.

**Referensintegraler.** $\int_1^\infty\frac{dx}{x^p}$ konvergerar $\iff p>1$. $\int_0^1\frac{dx}{x^p}$ konvergerar $\iff p<1$.

**Jämförelsesatsen.** Om $0\le f\le g$ gäller: $\int g$ konvergent ger $\int f$ konvergent, och $\int f$ divergent ger $\int g$ divergent.

**Varför?** Uppgift 5 på tentan, och flera av omtentans ja/nej-fällor.`,
    practice: r`**Vad övningarna tränar (13.22–13.32).** Att beräkna via gränsvärde, samt att avgöra konvergens med jämförelse när primitiven är svår.

**Löst exempel 1.** $\int_1^\infty\frac{\ln x}{x^2}dx$. Partialintegration med $f=x^{-2}$ (integreras), $g=\ln x$ (deriveras) ger primitiven $-\frac{\ln x}x-\frac1x$.
$$\int_1^R\frac{\ln x}{x^2}dx=\left(-\frac{\ln R}R-\frac1R\right)-(0-1)\to0+1=1\quad(R\to\infty).$$
Integralen är konvergent med värdet 1.

**Löst exempel 2 (jämförelse).** $\int_1^\infty\frac{dx}{x^2+\sqrt x}$. Eftersom $x^2+\sqrt x\ge x^2$ är integranden $\le\frac1{x^2}$, och $\int_1^\infty\frac{dx}{x^2}$ konvergerar ($p=2>1$). Alltså är integralen konvergent.

**Vanliga fel.** Att missa en singularitet *inne i* intervallet ($\int_{-1}^1\frac{dx}{x^2}$). Att "sätta in $\infty$" utan att skriva ut gränsvärdet, vilket ger poängavdrag. Att tro att $\int_0^\infty\cos x\,dx$ konvergerar.`,
  },
  F8: {
    preview: r`**Vad handlar det om?** Integralen som "summa av små bidrag".

- **Area mellan kurvor:** $A=\int_a^b(\text{övre}-\text{undre})\,dx$.
- **Volym med tvärsnitt:** $V=\int_a^bA(x)\,dx$, där $A(x)$ är tvärsnittsarean.
- **Rotation kring $x$-axeln (skivor):** $V=\pi\int_a^bf(x)^2dx$.
- **Rotation kring $y$-axeln:** skiva vågrätt. Lös ut $x$ som funktion av $y$; tvärsnittet är en cirkelskiva med $A(y)=\pi x(y)^2$ och $V=\int A(y)\,dy$. (Rörformeln ingår inte – F8.)
- **Ackumulering:** sträcka $=\int v\,dt$, energi $=\int P\,dt$ osv.

**Tänk så här.** Dela upp i tunna bitar, skriv bidraget $dV$ (eller $dA$, $ds$) för en bit och summera med en integral.

**Varför?** Tentauppgift 6 (area eller volym) ger 5–9 p. Volymformlerna står *inte* på formelbladet.`,
    practice: r`**Vad övningarna tränar (14.1–14.10, ackumulering.pdf).** Att hitta skärningspunkter, avgöra vilken kurva som ligger överst och skriva upp tvärsnittsarean $A(x)$ (eller $A(y)$) för en tunn skiva.

**Löst exempel.** Området mellan $y=x^2$ och $y=2x$ roteras kring $x$-axeln.

Skärning: $x^2=2x\iff x=0,2$. På $(0,2)$ är $2x\ge x^2$. Snittet är en ring (en "bricka") med yttre radie $2x$ och inre radie $x^2$:
$$V=\pi\int_0^2\left((2x)^2-(x^2)^2\right)dx=\pi\left(\frac{32}3-\frac{32}5\right)=\frac{64\pi}{15}.$$

**Vanliga fel.** Att räkna $\pi\int(f-g)^2$ i stället för $\pi\int(f^2-g^2)$. Att glömma $\pi$. Att ta undre minus övre, vilket ger negativ area.`,
  },
  F9: {
    preview: r`**Vad handlar det om?** Massa och tyngdpunkt med integraler (formelbladet: $m=\rho\ell$, $\rho A$, $\rho V$ och $x_T=\frac1m\int x\,dm$).

- **Masselement:** $dm=\rho(x)\,dx$ för en tråd, $\rho\,dA$ för en skiva, $\rho\,dV$ för en kropp.
- **Massa:** $m=\int dm$.
- **Tyngdpunkt:** $x_T=\frac1m\int x\,dm$.
- **Homogen yta under $y=f(x)$:** $dA=f(x)\,dx$, $x_T=\frac1A\int xf\,dx$, $y_T=\frac1A\int\frac12f^2dx$.

**Varför?** Omtentans uppgift 5 (6 p) handlade om exakt detta: massa, masscentrum och att bestämma en parameter.`,
    practice: r`**Vad övningarna tränar (14.12–14.20).** Att ställa upp $dm$ korrekt och räkna massa och tyngdpunkt.

**Löst exempel.** En tråd på $0\le x\le1$ har densiteten $\rho(x)=1+x^2$.
$$m=\int_0^1(1+x^2)dx=\frac43,\qquad\int_0^1x(1+x^2)dx=\frac12+\frac14=\frac34,\qquad x_T=\frac{3/4}{4/3}=\frac9{16}.$$
*Rimlighet:* $x_T>\frac12$ eftersom tråden är tyngre till höger ✓.

**Vanliga fel.** Att glömma dela med $m$. Att använda fel radie i en kon (räkna ut radien som funktion av $x$ med likformighet).`,
  },
  F10: {
    preview: r`**Vad handlar det om?** *Differentialekvationer* (DE): ekvationer där den okända är en funktion $y(x)$ och där derivator ingår.

- **Ordning:** högsta derivatans ordning.
- **Allmän lösning:** alla lösningar, med en godtycklig konstant $C$.
- **Begynnelsevillkor** som $y(0)=1$ bestämmer $C$.

**Linjär DE av ordning 1:** $y'+g(x)y=h(x)$. Multiplicera med den *integrerande faktorn* $e^{G(x)}$ där $G'=g$. Då blir vänsterledet en derivata av en produkt:
$$\left(e^{G(x)}y\right)'=e^{G(x)}h(x).$$
Integrera båda leden och lös ut $y$.

**Varför?** DE ordning 1 med tillämpning är tentauppgift 7 (5 p) varje år.`,
    practice: r`**Vad övningarna tränar (15.1–15.11).** Integrerande faktor, steg för steg, och begynnelsevillkor.

**Löst exempel.** $y'-\frac yx=x^2$, $x>0$.
1. $g(x)=-\frac1x$, så $G(x)=-\ln x$ och $e^{G}=\frac1x$.
2. $\left(\frac yx\right)'=\frac1x\cdot x^2=x$.
3. Integrera: $\frac yx=\frac{x^2}2+C$.
4. $y=\frac{x^3}2+Cx$.

*Kontroll:* $y'-\frac yx=\left(\frac{3x^2}2+C\right)-\left(\frac{x^2}2+C\right)=x^2$ ✓.

**Vanliga fel.** Fel tecken i $G$. Att glömma $C$ innan man delar med $e^G$. Att skriva ekvationen på fel standardform ($y'$ måste stå ensamt med koefficient 1).`,
  },
  F11: {
    preview: r`**Vad handlar det om?** *Separabla* DE: $y'=f(x)\,g(y)$. Flytta allt med $y$ till ena sidan och allt med $x$ till den andra, och integrera båda sidor:
$$\int\frac{dy}{g(y)}=\int f(x)\,dx+C.$$
Lös sedan ut $y$ om det går, och bestäm $C$.

**Att tänka på.**
- Konstanta lösningar där $g(y)=0$ kan falla bort när man delar.
- Lösningen kan bara gälla på ett intervall (definitionsmängd).
- En del ekvationer är både linjära och separabla, t.ex. $y'=ky$.

**Varför?** Tillämpningar som Torricellis lag ($h'=-k\sqrt h$, omtentan) leder till separabla ekvationer.`,
    practice: r`**Vad övningarna tränar (15.19–15.23).** Separation, integration och att lösa ut $y$ med begynnelsevillkor.

**Löst exempel.** $y'=2xy^2$, $y(0)=1$.

Separera: $\frac{dy}{y^2}=2x\,dx$. Integrera: $-\frac1y=x^2+C$. Villkoret $y(0)=1$ ger $-1=C$. Alltså
$$y=\frac{1}{1-x^2},\quad|x|<1.$$
*Kontroll:* $y'=\frac{2x}{(1-x^2)^2}=2xy^2$ ✓.

**Vanliga fel.** Teckenfel i $\int y^{-2}dy=-\frac1y$. Att glömma den konstanta lösningen $y=0$. Att bestämma $C$ först efter att ha löst ut $y$ på ett krångligt sätt (gör det tidigt).`,
  },
  F12: {
    preview: r`**Del 1: DE-tillämpningar.** Översätt text till en ekvation.
- "Hastighet" eller "ändring per tidsenhet" är en derivata.
- "Proportionell mot $X$" betyder $kX$.
- "Minskar" ger ett minustecken.

Typexempel: tillväxt $N'=kN$, Newtons avsvalning $T'=k(T-T_{\text{ute}})$, blandning $m'=\text{in}-\text{ut}$.

**Del 2: Komplexa tal.** $i^2=-1$, och $z=a+bi$ har realdel $a$ och imaginärdel $b$. Man räknar som med vanliga tal och byter $i^2$ mot $-1$.
- **Konjugat:** $\bar z=a-bi$.
- **Belopp:** $|z|=\sqrt{a^2+b^2}$ (avståndet till origo i talplanet).
- **Division:** förläng med nämnarens konjugat.

**Varför?** Uppgift 7 (DE-tillämpning) och uppgift 1 (räkna med komplexa tal) på varje tenta.`,
    practice: r`**Vad övningarna tränar (15.10–15.17, 6.1–6.14).** Modellering av DE samt grundräkning med komplexa tal.

**Löst exempel 1 (blandning).** En tank med 100 l vatten innehåller 10 kg salt. Rent vatten rinner in med 5 l/min och blandningen rinner ut med 5 l/min. Utflödets salthalt är $\frac{m}{100}$ kg/l, så
$$m'=-5\cdot\frac m{100}=-\frac m{20},\quad m(0)=10\ \Rightarrow\ m=10e^{-t/20}.$$
Halverat då $e^{-t/20}=\frac12$, alltså $t=20\ln2\approx14$ min.

**Löst exempel 2 (division).** $\frac{2+i}{1-i}=\frac{(2+i)(1+i)}{(1-i)(1+i)}=\frac{2+3i+i^2}{2}=\frac12+\frac32i$.

**Vanliga fel.** Fel tecken på $k$. Att svara med $k$ i stället för det som efterfrågas. Att glömma $i^2=-1$ i täljaren.`,
  },
  F13: {
    preview: r`**Vad handlar det om?** *Polär form*: $z=r(\cos\theta+i\sin\theta)=re^{i\theta}$, där $r=|z|$ och $\theta=\arg z$. Argumentet är bara bestämt så när som på en multipel av $2\pi$.

**Därför är polär form så användbar.** Vid multiplikation *multipliceras beloppen och argumenten adderas*: $re^{i\alpha}\cdot se^{i\beta}=rs\,e^{i(\alpha+\beta)}$. **de Moivre:** $(re^{i\theta})^n=r^ne^{in\theta}$. Potenser blir då lätta.

**Eulers formler:** $\cos\theta=\frac{e^{i\theta}+e^{-i\theta}}2$ och $\sin\theta=\frac{e^{i\theta}-e^{-i\theta}}{2i}$.

**Varför?** Uppgift 1b på tentan ($\arg$, $|u^6/w^4|$, $u^{10}$ på polär form) ger 3–4 p.`,
    practice: r`**Vad övningarna tränar (6.18–6.36).** Att växla mellan rektangulär och polär form, bestämma argument (rätt kvadrant!) och räkna potenser.

**Löst exempel 1.** $(1+i)^8$. $1+i=\sqrt2e^{i\pi/4}$, så $(1+i)^8=(\sqrt2)^8e^{i2\pi}=16$.

**Löst exempel 2.** $\arg\frac{-1+i}{\sqrt3+i}$. Rita: $-1+i$ ligger i andra kvadranten, så $\arg=\frac{3\pi}4$. $\sqrt3+i$ har $\arg=\frac\pi6$. Kvoten har argumentet $\frac{3\pi}4-\frac\pi6=\frac{7\pi}{12}$.

**Vanliga fel.** Att ta $\arctan\frac ba$ utan att kolla kvadranten. Att räkna ut stora potenser rektangulärt. Att inte reducera argumentet till det efterfrågade intervallet.`,
  },
  F14: {
    preview: r`**Vad handlar det om?** Ekvationer med komplexa tal.

- **Binomisk ekvation $z^n=w$.** Skriv $z=re^{i\theta}$ och $w=|w|e^{i\varphi}$. Då är $r^n=|w|$ och $n\theta=\varphi+2\pi k$. Det finns *exakt $n$ rötter*, jämnt fördelade på en cirkel.
- **Andragradsekvationer.** Kvadratkomplettera. Leder det till $w^2=a+bi$ med en "ful" vinkel, sätt $w=x+iy$ och jämför real- och imaginärdel. Använd också $x^2+y^2=|a+bi|$.

**Varför?** Uppgift 2 på tentan (5–8 p): $z^3=27i$, $z^2=3-4i$.`,
    practice: r`**Vad övningarna tränar (6.37–6.41, polynomekvationer.pdf).** Binomiska ekvationer och andragradsekvationer med komplexa tal.

**Löst exempel 1.** $z^3=-8$. $-8=8e^{i\pi}$, så $r=2$ och $\theta=\frac\pi3+\frac{2\pi k}3$. Rötterna är $2e^{i\pi/3}=1+i\sqrt3$, $2e^{i\pi}=-2$ och $2e^{i5\pi/3}=1-i\sqrt3$.

**Löst exempel 2.** $z^2+2z+5=0$. Kvadratkomplettera: $(z+1)^2=-4$, så $z+1=\pm2i$ och $z=-1\pm2i$.

**Vanliga fel.** Att bara ange en rot. Fel teckenkombination när man löser $z^2=a+bi$ med $z=x+iy$ ($xy$ ska ha samma tecken som $b$).`,
  },
  F15: {
    preview: r`**Del 1: Polynomekvationer.**
- *Algebrans fundamentalsats:* ett polynom av grad $n$ har $n$ rötter (räknade med multiplicitet).
- *Faktorsatsen:* $z_0$ är en rot $\iff(z-z_0)$ är en faktor.
- Med *reella koefficienter* kommer icke-reella rötter i konjugerade par.

Har man en rot kan man alltså dividera bort en faktor (polynomdivision).

**Del 2: DE av ordning 2.** $y''+ay'+by=h(x)$. Allmänna lösningen är $y=y_h+y_p$: lösningen till den homogena ekvationen plus en partikulärlösning. Den homogena löses med *karakteristiska ekvationen* $r^2+ar+b=0$.

**Varför?** Omtentans 2b (given rot $2i$) och tentauppgift 8 (5–6 p).`,
    practice: r`**Vad övningarna tränar (6.44–6.68, 15.36).** Faktorsatsen och konjugatregeln, samt enkla DE av ordning 2.

**Löst exempel 1.** $z^3-3z^2+4z-2=0$. Testa små heltal: $z=1$ ger $1-3+4-2=0$, så $(z-1)$ är en faktor. Polynomdivision: $(z-1)(z^2-2z+2)=0$. Sedan $z^2-2z+2=0\iff(z-1)^2=-1\iff z=1\pm i$.

**Löst exempel 2.** $y''=6x$, $y(0)=1$, $y'(0)=0$. Integrera två gånger: $y'=3x^2+C_1$ med $C_1=0$, och sedan $y=x^3+C_2$ med $C_2=1$. Alltså $y=x^3+1$.

**Vanliga fel.** Att använda konjugatregeln när koefficienterna inte är reella. Att glömma en rot vid divisionen.`,
  },
  F16: {
    preview: r`**Vad handlar det om?** Homogena DE av ordning 2 med konstanta koefficienter, $y''+ay'+by=0$. Ansatsen $y=e^{rx}$ ger karakteristiska ekvationen $r^2+ar+b=0$. Tre fall:
- två reella rötter: $y=C_1e^{r_1x}+C_2e^{r_2x}$,
- dubbelrot: $y=(C_1+C_2x)e^{rx}$,
- komplexa rötter $\alpha\pm\beta i$: $y=e^{\alpha x}(C_1\cos\beta x+C_2\sin\beta x)$.

**Partikulärlösning.** Ansätt en lösning av samma typ som högerledet: polynom → polynom, $e^{kx}\to Ae^{kx}$, $\sin/\cos\to A\cos+B\sin$.

**Begynnelsevärden** $y(0)$, $y'(0)$ bestämmer $C_1$ och $C_2$. Lägg till $y_p$ *innan* du sätter in villkoren.`,
    practice: r`**Vad övningarna tränar (15.37–15.47).** De tre fallen, begynnelsevärden och polynomansatser.

**Löst exempel 1.** $y''-y'-6y=0$, $y(0)=0$, $y'(0)=5$. $r^2-r-6=(r-3)(r+2)$, så $y=Ae^{3x}+Be^{-2x}$. Villkoren ger $A+B=0$ och $3A-2B=5$, alltså $A=1$, $B=-1$: $y=e^{3x}-e^{-2x}$.

**Löst exempel 2.** $y''+y=2x$. $y_h=C_1\cos x+C_2\sin x$. Ansatsen $y_p=ax+b$ ger $ax+b=2x$, så $y_p=2x$ och $y=C_1\cos x+C_2\sin x+2x$.

**Vanliga fel.** Att glömma $e^{\alpha x}$ vid komplexa rötter. Att sätta in begynnelsevärden i $y_h$ i stället för i hela $y$. Att ansätta bara $Ax$ när högerledet är $2x$ (konstanttermen behövs).`,
  },
  F17: {
    preview: r`**Vad handlar det om?** Svårare partikulärlösningar.
- **Resonans:** krockar ansatsen med $y_h$, multiplicera ansatsen med $x$ (vid dubbelrot med $x^2$).
- **Superposition:** när högerledet är en summa, hitta en $y_p$ per term och addera.
- **Knep för $e^{kx}\cdot$polynom:** sätt $y=z\,e^{kx}$. Då blir ekvationen för $z$ enkel.
- **Komplex metod:** $e^{ax}\cos bx=\operatorname{Re}e^{(a+bi)x}$.

**Varför?** ht24 #8 (6 p) med $\sin2x$ och $\cos2x$ i högerledet, ht25 #8 med ett polynom.`,
    practice: r`**Vad övningarna tränar (15.48–15.58).** Resonansfall (multiplicera ansatsen med $x$) och trigonometriska högerled.

**Löst exempel.** $y''-4y=e^{2x}$. Rötterna är $\pm2$. Eftersom $e^{2x}$ redan löser den homogena ekvationen har vi resonans. Multiplicera ansatsen med $x$: $y_p=axe^{2x}$. Då är $y_p'=a(1+2x)e^{2x}$ och $y_p''=a(4+4x)e^{2x}$, och insättning ger $a(4+4x-4x)e^{2x}=4ae^{2x}=e^{2x}$, alltså $a=\frac14$:
$$y_p=\frac x4e^{2x},\qquad y=C_1e^{2x}+C_2e^{-2x}+\frac x4e^{2x}.$$

**Trig-högerled.** Ansätt *både* $\cos$ och $\sin$, även om högerledet bara innehåller den ena.

**Vanliga fel.** Att missa resonansen, vilket ger $0=1$ vid identifieringen. Att bara ansätta $A\sin x$.`,
  },
  F18: {
    preview: r`**Vad handlar det om?** Att approximera en funktion med ett polynom nära $x=0$. *Maclaurinpolynomet* av ordning $n$ är
$$p_n(x)=\sum_{k=0}^n\frac{f^{(k)}(0)}{k!}x^k,$$
och $f(x)=p_n(x)+$ restterm. Resttermen kan skrivas på Lagranges form $\frac{f^{(n+1)}(\theta x)}{(n+1)!}x^{n+1}$ eller som $x^{n+1}B(x)$ med $B$ begränsad.

**Viktigt.** Standardutvecklingarna ($e^x$, $\sin$, $\cos$, $\ln(1+x)$, $(1+x)^k$, $\arctan$) står på formelbladet. Sammansatta funktioner utvecklar man genom att *sätta in* i dem, t.ex. $t=x^2$, utan att derivera.

**Varför?** Uppgift 9 (5 p) varje år: en utveckling med restterm och ett gränsvärde.`,
    practice: r`**Vad övningarna tränar (11.1–11.10).** Att ta fram $p_n$ via derivator och via substitution, och att uppskatta resttermer.

**Löst exempel.** Maclaurinutvecklingen av ordning 4 av $e^{-x^2}$. Sätt $t=-x^2$ i $e^t=1+t+\frac{t^2}2+t^3B(t)$:
$$e^{-x^2}=1-x^2+\frac{x^4}2+x^6B(x).$$
Resttermen blir $x^6B(x)$ eftersom $t^3=-x^6$.

**Restterm med Lagrange (typ 11.4).** För $\sin x$ är $R_3=-\frac{\cos\theta x}{6}x^3$. Eftersom $|\cos|\le1$ är $|R_3|\le\frac{|x|^3}6$.

**Vanliga fel.** Fel grad i resttermen efter en substitution. Att derivera i onödan.`,
  },
  F19: {
    preview: r`**Vad handlar det om?**

**Gränsvärden av typen $\frac00$.** Utveckla täljare och nämnare tills den första nollskilda termen syns. Bryt ut lägsta potensen och förkorta.

**Räkneregler för ordo ($x^nB(x)$).** $x^m B+x^nB=x^{\min(m,n)}B$ och $x^mB\cdot x^nB=x^{m+n}B$.

**Taylor kring $x=a$:** $p_n(x)=\sum\frac{f^{(k)}(a)}{k!}(x-a)^k$ (formelbladet).

**Serier.** Den geometriska serien $\sum q^k=\frac1{1-q}$ för $|q|<1$. Maclaurinserier ger summor som $\sum\frac1{k!}=e$.

**Varför?** ht25 #9: gränsvärde, utveckling och seriesumma, alla tre.`,
    practice: r`**Vad övningarna tränar (11.14–11.33).** Gränsvärden, produkter och sammansättningar av utvecklingar, Taylorpolynom och seriesummor.

**Löst exempel 1.** $\lim_{x\to0}\frac{e^x-1-x-\frac{x^2}2}{x^3}$. Nämnaren har grad 3, så utveckla till grad 3: $e^x=1+x+\frac{x^2}2+\frac{x^3}6+x^4B$. Täljaren är då $\frac{x^3}6+x^4B$, och kvoten är $\frac16+xB(x)\to\frac16$.

**Löst exempel 2.** Taylorpolynomet av ordning 2 till $\ln x$ i $x=1$. $f(1)=0$, $f'(1)=1$, $f''(1)=-1$, så $p_2=(x-1)-\frac12(x-1)^2$.

**Löst exempel 3.** $1+\frac13+\frac19+\dots=\frac{1}{1-1/3}=\frac32$.

**Vanliga fel.** För kort utveckling, så att allt tar ut varandra. Att multiplicera ut $(x-a)^k$. Att glömma att en serie som börjar på $k=1$ ger $\frac q{1-q}$.`,
  },
}
