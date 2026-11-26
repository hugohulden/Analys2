import { PI, VB } from './fmt'

const r = String.raw

const INS = r`**Metod (F6): insättningsformeln.** Hitta först en primitiv $F$ (med metoderna från F1–F4), och räkna sedan $\int_a^bf(x)\,dx=\big[F(x)\big]_a^b=F(b)-F(a)$.`
const HS = r`**Metod (F6): analysens huvudsats + kedjeregeln.** Om $f$ är kontinuerlig är $S(y)=\int_a^yf(t)\,dt$ deriverbar med $S'(y)=f(y)$. Har integralen en sammansatt gräns $g(x)$ skriver vi den som $S(g(x))$ och deriverar med kedjeregeln: $\frac{d}{dx}S(g(x))=f(g(x))\cdot g'(x)$.`
const GEN = r`**Metod (F7): generaliserad integral.** Ersätt den "dåliga" gränsen med en variabel ($K$ för $\infty$, $\varepsilon$ nära en punkt där integranden är obegränsad), räkna integralen med insättningsformeln och låt sedan $K\to\infty$ eller $\varepsilon\to0^+$. Ändligt gränsvärde: **konvergent**, annars **divergent**.`
const JMF = r`**Metod (F7): jämförelse.** Vi behöver inte räkna ut värdet, bara avgöra konvergens. Jämför med $\int x^{-\alpha}dx$, vars konvergens vi känner från **Sats 13.11** ($\int_a^\infty$: konvergent $\iff\alpha>1$; $\int_0^a$: konvergent $\iff\alpha<1$).
- **Sats 13.10:** om $0\le f\le g$ gäller: $\int g$ konvergent ⇒ $\int f$ konvergent, och $\int f$ divergent ⇒ $\int g$ divergent.
- **Sats 13.12:** om $f,g>0$ och $\lim\frac fg=A$ med $A\ne0,\infty$ har integralerna samma konvergens. Bra när olikheten pekar åt fel håll.`
const AREA = r`**Metod (F8): areaelement.** Rita figur och ta reda på skärningspunkterna. Ett lodrätt areaelement är en tunn rektangel med höjden (övre $-$ undre) och bredden $dx$: $dA=(f(x)-g(x))\,dx$. Summera: $A=\int_a^b(f(x)-g(x))\,dx$. Arean kan aldrig bli negativ.`
const VOL = r`**Metod (F8): volymelement.** Skiva upp kroppen vinkelrätt mot en axel. En tunn skiva har volymen $dV=A(x)\,dx$, där $A(x)$ är tvärsnittsarean, och $V=\int_a^bA(x)\,dx$.`
const ROT = r`**Metod (F8): rotationskropp (skivor).** Vid rotation kring $x$-axeln är varje tvärsnitt en cirkelskiva med radien $f(x)$, så $A(x)=\pi(f(x))^2$ och $V=\int_a^b\pi(f(x))^2\,dx$.`
const MASS = r`**Metod (F9): masselement.** Där densiteten varierar tar vi tunna bitar där den är nästan konstant: $dm=\rho\,dx$ (tråd), $dm=\rho\,dA$ (skiva) eller $dm=\rho\,dV$ (kropp). Summera: $m=\int_Kdm$.`
const TP = r`**Metod (F9): tyngdpunkt (formelbladet).** $x_T=\frac1m\int_Kx\,dm$. Kontrollera rimligheten: tyngdpunkten ska ligga närmare den tunga delen.`
const ACK = r`**Metod (F8): ackumulering.** Vi "samlar på oss" en storhet över tiden: $ds=v(t)\,dt$, $dv=a(t)\,dt$, $dE=P(t)\,dt$. Över ett tidsintervall: $\int_{t_1}^{t_2}$.`

/** Lösningsförslag kapitel 13 – följer F5–F7. */
export const SOL13: Record<string, string> = {
  '13.4': r`**Metod (F5): integralen som signerad area.** $\int_a^bf\,dx$ = (area över $x$-axeln) $-$ (area under $x$-axeln). Om $f\ge0$ på hela intervallet kan integralen alltså inte bli negativ.

**Tecken på integranden:** $(\arcsin x)^2\ge0$ för alla $x$, och $>0$ för $0<x\le\frac12$. Integralen över $[0,\frac12]$ är därför positiv.

**Tecken på studentens svar:** $\frac\pi3\approx1{,}05>1$, så $\left(\frac\pi3\right)^2>1$ och $1-\left(\frac\pi3\right)^2<0$.

**Slutsats:** en positiv integrand kan inte ge en negativ integral. Svaret är orimligt.`,
  '13.9': r`${HS}

**Huvudsatsen:** $S(x)=\int_0^xf(t)\,dt$ har derivatan $S'(x)=f(x)$.

**Teckenstudium (från figuren):**
- På $0<x<3$ är $f(x)>0$, så $S'>0$ och $S$ växer: vi samlar på oss area över axeln.
- På $3<x<6$ är $f(x)<0$, så $S'<0$ och $S$ avtar: arean under axeln dras av.

**Slutsats:** $S$ växer fram till $x=3$ och avtar sedan, så maximum antas i $x=3$.`,
  '13.10': r`${HS}

**Derivera:** $f'(x)=e^{-x^2}\sin x$ (huvudsatsen, den övre gränsen är bara $x$).

**Teckenstudium:** $e^{-x^2}>0$ för alla $x$, så $f'$ har samma tecken som $\sin x$.
- $0<x<\pi$: $\sin x>0$, $f$ växer.
- $\pi<x<2\pi$: $\sin x<0$, $f$ avtar.

**Slutsats:** största värdet antas i $x=\pi$. (Ändpunkterna kan inte ge större värden: $f(0)=0$ och $f$ avtar efter $\pi$.)`,
  '13.11a': r`${HS}

Här är den övre gränsen bara $x$, så huvudsatsen ger direkt
$$\frac{d}{dx}\int_1^x\cos(t^2)\,dt=\cos(x^2).$$
Den undre gränsen 1 spelar ingen roll (den ger bara en konstant).`,
  '13.11b': r`${HS}

**Skriv som sammansatt funktion:** $S(y)=\int_1^y\cos(t^2)\,dt$ har $S'(y)=\cos(y^2)$. Vår funktion är $S(\sqrt x)$.

**Kedjeregeln:**
$$\frac{d}{dx}S(\sqrt x)=S'(\sqrt x)\cdot(\sqrt x)'=\cos\big((\sqrt x)^2\big)\cdot\frac1{2\sqrt x}=\frac{\cos x}{2\sqrt x}.$$`,
  '13.12a': r`${HS}

$S(y)=\int_1^y\frac{\sin t}t\,dt$ ger $S'(y)=\frac{\sin y}y$. Den inre funktionen är $\arcsin x$ med derivatan $\frac1{\sqrt{1-x^2}}$.

**Kedjeregeln:**
$$\frac{\sin(\arcsin x)}{\arcsin x}\cdot\frac1{\sqrt{1-x^2}}=\frac{x}{\sqrt{1-x^2}\,\arcsin x},$$
eftersom $\sin(\arcsin x)=x$.`,
  '13.12b': r`${HS}

$S(y)=\int_{1/2}^y\frac{e^{2t}}t\,dt$ ger $S'(y)=\frac{e^{2y}}y$. Den inre funktionen är $\ln x$ med derivatan $\frac1x$.

**Kedjeregeln:**
$$\frac{e^{2\ln x}}{\ln x}\cdot\frac1x=\frac{x^2}{x\ln x}=\frac{x}{\ln x},$$
eftersom $e^{2\ln x}=\left(e^{\ln x}\right)^2=x^2$.`,
  '13.12c': r`${HS}

**Variabel undre gräns – byt ordning (F6):** $\int_{\cos x}^1\sqrt{1-t^2}\,dt=-\int_1^{\cos x}\sqrt{1-t^2}\,dt$.

**Kedjeregeln** med inre funktion $\cos x$:
$$-\sqrt{1-\cos^2x}\cdot(-\sin x)=\sqrt{\sin^2x}\cdot\sin x=|\sin x|\sin x.$$
**Absolutbeloppet:** $\sin x>0$ för $0<x<\pi$, så $|\sin x|=\sin x$ och derivatan är $\sin^2x$.`,
  '13.12d': r`${HS}

**Dela upp vid en fast punkt (räkneregel):** $\int_{\cos x}^{\sin x}=\int_0^{\sin x}-\int_0^{\cos x}$.

**Derivera varje del med kedjeregeln:**
- $\frac{d}{dx}\int_0^{\sin x}\sqrt{1-t^2}\,dt=\sqrt{1-\sin^2x}\cdot\cos x=|\cos x|\cos x=\cos^2x$.
- $\frac{d}{dx}\int_0^{\cos x}\sqrt{1-t^2}\,dt=\sqrt{1-\cos^2x}\cdot(-\sin x)=-|\sin x|\sin x=-\sin^2x$.

(Både $\sin x$ och $\cos x$ är positiva på $0<x<\frac\pi2$.)

**Summa:** $\cos^2x-(-\sin^2x)=\cos^2x+\sin^2x=1$ (trigonometriska ettan).`,
  '13.13': r`**Metod (F5): uppskatta integranden.** Om $f(t)<g(t)$ på $[1,x]$ är $\int_1^xf\,dt<\int_1^xg\,dt$ (större rektanglar ger större area).

**Uppskattning:** för $t>1$ är $\sin t\le1$, så $\frac{\sin t}t\le\frac1t<1$.

**Integrera olikheten** över $[1,x]$, $x>1$:
$$\int_1^x\frac{\sin t}t\,dt<\int_1^x1\,dt=x-1.$$

**Sätt in:** $1-x+\int_1^x\frac{\sin t}t\,dt<1-x+(x-1)=0$. $\blacksquare$`,
  '13.14': r`${INS}

**Steg 1 – partialbråk (F4).** Nämnaren faktoriseras: $x^2+5x+6=(x+2)(x+3)$. Gradtal täljare (1) < nämnare (2), så ingen division behövs. Ansats:
$$\frac{x+1}{(x+2)(x+3)}=\frac A{x+2}+\frac B{x+3}.$$
**Handpåläggning:** $x=-2$: $A=\frac{-2+1}{-2+3}=-1$. $x=-3$: $B=\frac{-3+1}{-3+2}=2$.

**Steg 2 – primitiv:** $\int\left(\frac{-1}{x+2}+\frac2{x+3}\right)dx=-\ln|x+2|+2\ln|x+3|$.

**Steg 3 – insättning:**
$$\big[-\ln(x+2)+2\ln(x+3)\big]_0^1=(-\ln3+2\ln4)-(-\ln2+2\ln3)=4\ln2+\ln2-3\ln3=5\ln2-3\ln3=\ln\frac{32}{27}.$$`,
  '13.15a': r`**Metod (F6): partialintegration med gränser.** $\int_a^bfg\,dx=\big[Fg\big]_a^b-\int_a^bFg'\,dx$. Ensam logaritm: skriv $\ln(1+x^2)=1\cdot\ln(1+x^2)$ och integrera ettan.
${PI(r`1`, r`x`, r`\ln(1+x^2)`, r`\frac{2x}{1+x^2}`)}
$$\int_0^1\ln(1+x^2)\,dx=\big[x\ln(1+x^2)\big]_0^1-\int_0^1\frac{2x^2}{1+x^2}\,dx.$$
**Randtermen:** $1\cdot\ln2-0=\ln2$.

**Den nya integralen** – täljare och nämnare har samma grad, så dividera först (F4): $\frac{2x^2}{1+x^2}=\frac{2(1+x^2)-2}{1+x^2}=2-\frac2{1+x^2}$.
$$\int_0^1\left(2-\frac2{1+x^2}\right)dx=\big[2x-2\arctan x\big]_0^1=2-2\cdot\frac\pi4=2-\frac\pi2.$$
**Svar:** $\ln2-\left(2-\frac\pi2\right)=\ln2-2+\frac\pi2$.`,
  '13.15b': r`**Metod (F6): variabelbyte med gränsbyte, sedan partialintegration.** $e^x$ står både i $\ln(1+e^x)$ och utanför – och $e^x$ är derivatan av $e^x$.
${VB(r`t=e^x,\ \frac{dt}{dx}=e^x\ \Rightarrow\ dt=e^x\,dx`, r`x=0\Rightarrow t=1,\quad x=1\Rightarrow t=e`)}
$$\int_0^1e^x\ln(1+e^x)\,dx=\int_1^e\ln(1+t)\,dt.$$
**Partialintegration** med "integrera ettan" – välj $F=1+t$ (en primitiv till 1 som gör det enkelt):
${PI(r`1`, r`1+t`, r`\ln(1+t)`, r`\frac1{1+t}`, 't')}
$$\int_1^e\ln(1+t)\,dt=\big[(1+t)\ln(1+t)\big]_1^e-\int_1^e1\,dt=(1+e)\ln(1+e)-2\ln2-(e-1).$$`,
  '13.15c': r`**Metod (F6): partialintegration två gånger, med gränser.**

**Första gången** – integrera ettan:
${PI(r`1`, r`x`, r`(\ln x)^2`, r`\frac{2\ln x}{x}`)}
$$\int_1^e(\ln x)^2dx=\big[x(\ln x)^2\big]_1^e-\int_1^e2\ln x\,dx=e-2\int_1^e\ln x\,dx.$$
**Andra gången:**
${PI(r`1`, r`x`, r`\ln x`, r`\frac1x`)}
$$\int_1^e\ln x\,dx=\big[x\ln x\big]_1^e-\int_1^e1\,dx=e-(e-1)=1.$$
**Svar:** $e-2\cdot1=e-2$.`,
  '13.15d': r`**Metod (F6): partialintegration med gränser.** Polynom gånger något vi kan integrera: låt polynomet deriveras. $\frac1{\cos^2x}$ har primitiven $\tan x$ (standardintegral).
${PI(r`\frac1{\cos^2x}`, r`\tan x`, r`x`, r`1`)}
$$\int_0^{\pi/4}\frac{x}{\cos^2x}\,dx=\big[x\tan x\big]_0^{\pi/4}-\int_0^{\pi/4}\tan x\,dx.$$
**Randtermen:** $\frac\pi4\cdot1-0=\frac\pi4$.

**$\int\tan x\,dx$:** skriv $\tan x=\frac{\sin x}{\cos x}$ och byt variabel:
${VB(r`t=\cos x,\ dt=-\sin x\,dx`)}
$\int\frac{\sin x}{\cos x}dx=-\int\frac{dt}t=-\ln|\cos x|$. Alltså $\int_0^{\pi/4}\tan x\,dx=\big[-\ln\cos x\big]_0^{\pi/4}=-\ln\frac1{\sqrt2}=\frac12\ln2$.

**Svar:** $\frac\pi4-\frac12\ln2$.`,
  '13.16a': r`${INS}

**Standardintegral (formelbladet):** $\int\frac{dx}{a^2+x^2}=\frac1a\arctan\frac xa$. Här är $a=10$:
$$\int_0^{10}\frac{40}{100+x^2}\,dx=40\cdot\frac1{10}\left[\arctan\frac x{10}\right]_0^{10}=4(\arctan1-\arctan0)=4\cdot\frac\pi4=\pi.$$`,
  '13.16b': r`**Metod (F6): skriv om, sedan variabelbyte med gränsbyte.** $\cosh x=\frac{e^x+e^{-x}}2$, så $\frac1{\cosh x}=\frac2{e^x+e^{-x}}$. Förläng med $e^x$: $\frac{2e^x}{e^{2x}+1}$.
${VB(r`t=e^x,\ dt=e^x\,dx`, r`x=-1\Rightarrow t=e^{-1},\quad x=1\Rightarrow t=e`)}
$$\int_{-1}^1\frac{2e^x}{e^{2x}+1}\,dx=\int_{1/e}^e\frac{2\,dt}{t^2+1}=2\big[\arctan t\big]_{1/e}^e=2\left(\arctan e-\arctan\frac1e\right).$$`,
  '13.16c': r`**Metod (F6): variabelbyte – byt ut roten.** Vi vill bli av med $x^{1/3}$, så sätt $t=x^{1/3}$, dvs. $x=t^3$.
${VB(r`x=t^3,\ \frac{dx}{dt}=3t^2\ \Rightarrow\ dx=3t^2\,dt`, r`x=0\Rightarrow t=0,\quad x=1\Rightarrow t=1`)}
$$\int_0^1\cos x^{1/3}\,dx=\int_0^13t^2\cos t\,dt.$$
**Partialintegration två gånger** (polynomet deriveras):
${PI(r`\cos t`, r`\sin t`, r`t^2`, r`2t`, 't')}
$\int t^2\cos t\,dt=t^2\sin t-\int2t\sin t\,dt$.
${PI(r`\sin t`, r`-\cos t`, r`2t`, r`2`, 't')}
$\int2t\sin t\,dt=-2t\cos t+\int2\cos t\,dt=-2t\cos t+2\sin t$.

Primitiv: $t^2\sin t+2t\cos t-2\sin t$.
$$3\big[t^2\sin t+2t\cos t-2\sin t\big]_0^1=3(\sin1+2\cos1-2\sin1)=6\cos1-3\sin1.$$`,
  '13.16d': r`**Metod (F3/F6): trigformel, variabelbyte och partialintegration.** Formel (1): $\sin2x=2\sin x\cos x$. Då står $\cos x$ (derivatan av $\sin x$) som faktor.
${VB(r`t=\sin x,\ dt=\cos x\,dx`, r`x=0\Rightarrow t=0,\quad x=\frac\pi2\Rightarrow t=1`)}
$$\int_0^{\pi/2}e^{\sin x}\cdot2\sin x\cos x\,dx=\int_0^12te^t\,dt.$$
${PI(r`e^t`, r`e^t`, r`2t`, r`2`, 't')}
$$\int_0^12te^t\,dt=\big[2te^t\big]_0^1-\int_0^12e^t\,dt=2e-\big[2e^t\big]_0^1=2e-(2e-2)=2.$$`,
  '13.17a': r`**Metod (F6): variabelbyte, sedan partialintegration.** Byt ut det som är jobbigt, $\arcsin x$.
${VB(r`t=\arcsin x\iff x=\sin t,\ dx=\cos t\,dt`, r`x=0\Rightarrow t=0,\quad x=\frac12\Rightarrow t=\frac\pi6`)}
$$\int_0^{1/2}(\arcsin x)^2dx=\int_0^{\pi/6}t^2\cos t\,dt.$$
**Partialintegration två gånger** (som i 13.16 c): primitiven är $t^2\sin t+2t\cos t-2\sin t$.

**Insättning** ($\sin\frac\pi6=\frac12$, $\cos\frac\pi6=\frac{\sqrt3}2$):
$$\frac{\pi^2}{36}\cdot\frac12+2\cdot\frac\pi6\cdot\frac{\sqrt3}2-2\cdot\frac12-0=\frac{\pi^2}{72}+\frac{\pi\sqrt3}6-1.$$`,
  '13.17b': r`**Metod (F6 + F4): variabelbyte till rationell funktion, sedan partialbråk.**
${VB(r`t=e^x,\ dt=e^x\,dx\Rightarrow dx=\frac{dt}t`, r`x=0\Rightarrow t=1,\quad x=1\Rightarrow t=e`)}
Integranden: $\frac1{t-t^{-2}+2}\cdot\frac1t=\frac{t^2}{t^3+2t^2-1}\cdot\frac1t=\frac{t}{t^3+2t^2-1}$.

**Faktorisera nämnaren:** $t=-1$ är en rot ($-1+2-1=0$). Polynomdivision: $t^3+2t^2-1=(t+1)(t^2+t-1)$. Andragradaren har reella rötter, men vi kan också kvadratkomplettera.

**Partialbråk:** $\frac{t}{(t+1)(t^2+t-1)}=\frac A{t+1}+\frac{Bt+C}{t^2+t-1}$. Handpåläggning $t=-1$: $A=\frac{-1}{1-1-1}=1$. Identifiera koefficienter i $t=A(t^2+t-1)+(Bt+C)(t+1)$: $t^2$: $0=1+B\Rightarrow B=-1$; konstant: $0=-1+C\Rightarrow C=1$.

**Primitiv:** $\frac{1-t}{t^2+t-1}=-\frac12\cdot\frac{2t+1}{t^2+t-1}+\frac{3/2}{(t+\frac12)^2-\frac54}$. Första delen ger $-\frac12\ln|t^2+t-1|$ (täljaren är nämnarens derivata), den andra ger med partialbråk $\frac{3}{2\sqrt5}\ln\left|\frac{2t+1-\sqrt5}{2t+1+\sqrt5}\right|$. Totalt
$$\ln(t+1)-\frac12\ln|t^2+t-1|+\frac{3}{2\sqrt5}\ln\left|\frac{2t+1-\sqrt5}{2t+1+\sqrt5}\right|,$$
som sätts in mellan $t=1$ och $t=e$.`,
  '13.17c': r`**Metod (F3/F6): skriv om så att en derivata dyker upp.** Udda potens av $\sin$ i täljaren och $\cos^5$ i nämnaren: dela upp som $\frac{\sin^3x}{\cos^3x}\cdot\frac1{\cos^2x}=\tan^3x\cdot\frac1{\cos^2x}$, och $\frac1{\cos^2x}$ är derivatan av $\tan x$.
${VB(r`t=\tan x,\ dt=\frac{1}{\cos^2x}\,dx`, r`x=0\Rightarrow t=0,\quad x=\frac\pi4\Rightarrow t=1`)}
$$\int_0^1t^3dt=\left[\frac{t^4}4\right]_0^1=\frac14.$$`,
  '13.18a': r`**Metod (F6): partialintegration med gränser.** $\ln x$ ska deriveras (vi kan inte integrera den direkt), och $\frac x{(1+x^2)^2}$ kan integreras med variabelbyte $t=1+x^2$.
${PI(r`\frac{x}{(1+x^2)^2}`, r`-\frac1{2(1+x^2)}`, r`\ln x`, r`\frac1x`)}
$$\int_1^2\frac{x\ln x}{(1+x^2)^2}dx=\left[-\frac{\ln x}{2(1+x^2)}\right]_1^2+\frac12\int_1^2\frac{dx}{x(1+x^2)}.$$
**Randtermen:** $-\frac{\ln2}{10}-0$.

**Partialbråk (F4):** $\frac1{x(1+x^2)}=\frac Ax+\frac{Bx+C}{1+x^2}$. Handpåläggning $x=0$: $A=1$. Identifiera: $1=(1+x^2)+(Bx+C)x\Rightarrow B=-1$, $C=0$. Alltså $\frac1x-\frac x{1+x^2}$, med primitiven $\ln x-\frac12\ln(1+x^2)$.
$$\frac12\left[\ln x-\frac12\ln(1+x^2)\right]_1^2=\frac12\left(\ln2-\frac12\ln5+\frac12\ln2\right)=\frac34\ln2-\frac14\ln5.$$
**Svar:** $-\frac{\ln2}{10}+\frac34\ln2-\frac14\ln5=\frac{13}{20}\ln2-\frac14\ln5$.`,
  '13.18b': r`**Metod (F2): täljaren är nämnarens derivata.** Förläng med $\cos x$: $\frac{1-\tan x}{1+\tan x}=\frac{\cos x-\sin x}{\cos x+\sin x}$.
${VB(r`t=\sin x+\cos x,\ dt=(\cos x-\sin x)\,dx`)}
$\int\frac{dt}t=\ln|t|$, alltså är $\ln(\sin x+\cos x)$ en primitiv (positiv på intervallet).
$$\big[\ln(\sin x+\cos x)\big]_0^{\pi/4}=\ln\left(\frac{\sqrt2}2+\frac{\sqrt2}2\right)-\ln1=\ln\sqrt2=\frac12\ln2.$$`,
  '13.18c': r`**Metod (F6): partialintegration med gränser.** $\arcsin x$ ska deriveras. $x\sqrt{1-x^2}$ integreras med variabelbyte $t=1-x^2$ (kvalificerad gissning).
${PI(r`x\sqrt{1-x^2}`, r`-\frac13(1-x^2)^{3/2}`, r`\arcsin x`, r`\frac1{\sqrt{1-x^2}}`)}
$$\int_0^1x\sqrt{1-x^2}\arcsin x\,dx=\left[-\frac13(1-x^2)^{3/2}\arcsin x\right]_0^1+\frac13\int_0^1\frac{(1-x^2)^{3/2}}{\sqrt{1-x^2}}dx.$$
**Randtermen:** i $x=1$ är $(1-x^2)^{3/2}=0$ och i $x=0$ är $\arcsin0=0$. Den blir 0.

**Kvar:** $\frac13\int_0^1(1-x^2)\,dx=\frac13\left[x-\frac{x^3}3\right]_0^1=\frac13\cdot\frac23=\frac29$.`,
  '13.19a': r`**Metod (F5): absolutbelopp – dela upp intervallet.** $\left|\frac12-x\right|=\frac12-x$ när $x\le\frac12$ och $=x-\frac12$ när $x\ge\frac12$:
$$\int_{-1/2}^{1/2}\left(\tfrac12-x\right)\cos x\,dx+\int_{1/2}^1\left(x-\tfrac12\right)\cos x\,dx.$$
**Primitiv (partialintegration, polynomet deriveras):**
${PI(r`\cos x`, r`\sin x`, r`\tfrac12-x`, r`-1`)}
$\int\left(\tfrac12-x\right)\cos x\,dx=\left(\tfrac12-x\right)\sin x+\int\sin x\,dx=\left(\tfrac12-x\right)\sin x-\cos x$.

**Första delen:** $\left[(\tfrac12-x)\sin x-\cos x\right]_{-1/2}^{1/2}=\left(0-\cos\tfrac12\right)-\left(-\sin\tfrac12-\cos\tfrac12\right)=\sin\tfrac12$.

**Andra delen** (ombytt tecken): $-\left[(\tfrac12-x)\sin x-\cos x\right]_{1/2}^{1}=-\left(-\tfrac12\sin1-\cos1+\cos\tfrac12\right)=\tfrac12\sin1+\cos1-\cos\tfrac12$.

**Svar:** $\sin\frac12+\frac12\sin1+\cos1-\cos\frac12$.`,
  '13.19b': r`**Metod (F5 + F3): dela upp vid teckenbytet, partialintegration "runt".**

**Tecken:** $\sin x\ge0$ på $[0,\pi]$ och $\le0$ på $[\pi,2\pi]$, så
$$\int_0^{2\pi}e^{-x}|\sin x|\,dx=\int_0^\pi e^{-x}\sin x\,dx-\int_\pi^{2\pi}e^{-x}\sin x\,dx.$$
**Primitiv:** partialintegrera två gånger tills $I=\int e^{-x}\sin x\,dx$ dyker upp igen:
${PI(r`e^{-x}`, r`-e^{-x}`, r`\sin x`, r`\cos x`)}
$I=-e^{-x}\sin x+\int e^{-x}\cos x\,dx$, och igen: $\int e^{-x}\cos x\,dx=-e^{-x}\cos x-\int e^{-x}\sin x\,dx=-e^{-x}\cos x-I$.

Alltså $2I=-e^{-x}(\sin x+\cos x)$ och $I=-\frac12e^{-x}(\sin x+\cos x)$.

**Insättning:** $\left[-\frac12e^{-x}(\sin x+\cos x)\right]_0^\pi=\frac12e^{-\pi}+\frac12$ och $\left[\dots\right]_\pi^{2\pi}=-\frac12e^{-2\pi}-\frac12e^{-\pi}$.

**Svar:** $\frac12(1+e^{-\pi})+\frac12(e^{-\pi}+e^{-2\pi})=\frac12\left(1+2e^{-\pi}+e^{-2\pi}\right)=\frac12(1+e^{-\pi})^2$.`,
  '13.20a': r`**Metod (F6): dela med $\cos^2x$ så att $\tan x$ dyker upp.** $\frac1{1+\sin x\cos x}=\frac{1/\cos^2x}{\frac1{\cos^2x}+\tan x}$, och $\frac1{\cos^2x}=1+\tan^2x$:
$$\frac{1/\cos^2x}{1+\tan^2x+\tan x}.$$
${VB(r`t=\tan x,\ dt=\frac{dx}{\cos^2x}`, r`x=0\Rightarrow t=0,\quad x=\frac\pi4\Rightarrow t=1`)}
$$\int_0^1\frac{dt}{t^2+t+1}.$$
**Kvadratkomplettera (F4):** $t^2+t+1=\left(t+\frac12\right)^2+\frac34$. Standardintegral med $a=\frac{\sqrt3}2$:
$$\frac2{\sqrt3}\left[\arctan\frac{2t+1}{\sqrt3}\right]_0^1=\frac2{\sqrt3}\left(\arctan\sqrt3-\arctan\frac1{\sqrt3}\right)=\frac2{\sqrt3}\left(\frac\pi3-\frac\pi6\right)=\frac{\pi}{3\sqrt3}.$$`,
  '13.20b': r`**Metod (F6): variabelbytet $t=\tan\frac x2$ (bokens tips).** Med det blir alla trigfunktioner rationella i $t$: $\cos x=\frac{1-t^2}{1+t^2}$ och $dx=\frac{2\,dt}{1+t^2}$.
${VB(r`t=\tan\frac x2,\ dx=\frac{2\,dt}{1+t^2}`, r`x=0\Rightarrow t=0,\quad x=\frac\pi2\Rightarrow t=1`)}
**Nämnaren:** $1+\cos x=\frac{1+t^2+1-t^2}{1+t^2}=\frac2{1+t^2}$.

**Integranden:** $\frac{\cos x}{1+\cos x}dx=\frac{1-t^2}{1+t^2}\cdot\frac{1+t^2}2\cdot\frac{2\,dt}{1+t^2}=\frac{1-t^2}{1+t^2}dt$.

**Division:** $\frac{1-t^2}{1+t^2}=\frac{2-(1+t^2)}{1+t^2}=\frac2{1+t^2}-1$.
$$\big[2\arctan t-t\big]_0^1=\frac\pi2-1.$$`,
  '13.20c': r`**Metod (F6): variabelbytet $t=\tan x$ (bokens tips).**
${VB(r`t=\tan x\iff x=\arctan t,\ dx=\frac{dt}{1+t^2}`, r`x=0\Rightarrow t=0,\quad x=\frac\pi4\Rightarrow t=1`)}
$$\int_0^1\frac{t^3+t^4}{1+t^2}\,dt.$$
**Polynomdivision (F4)** – täljaren har högre grad: $t^4+t^3=(t^2+t-1)(t^2+1)+(-t+1)$. Alltså
$$\frac{t^4+t^3}{1+t^2}=t^2+t-1-\frac{t}{1+t^2}+\frac1{1+t^2}.$$
**Integrera:** $\left[\frac{t^3}3+\frac{t^2}2-t-\frac12\ln(1+t^2)+\arctan t\right]_0^1=\frac13+\frac12-1-\frac12\ln2+\frac\pi4=\frac\pi4-\frac16-\frac12\ln2$.`,
  '13.21a': r`**Metod (F4): dela upp täljaren så att nämnarens derivata dyker upp.** Rotens innehåll har derivatan $2x+2$. Skriv $x+3=\frac12(2x+2)+2$.

**Första delen:** ${VB(r`t=x^2+2x+10,\ dt=(2x+2)\,dx`)}
$\int\frac{\frac12(2x+2)}{\sqrt{x^2+2x+10}}dx=\frac12\int t^{-1/2}dt=\sqrt t=\sqrt{x^2+2x+10}$.

**Andra delen:** kvadratkomplettera $x^2+2x+10=(x+1)^2+9$. Formelbladet: $\int\frac{dx}{\sqrt{x^2+a}}=\ln\left|x+\sqrt{x^2+a}\right|$, så $2\int\frac{dx}{\sqrt{(x+1)^2+9}}=2\ln\left(x+1+\sqrt{(x+1)^2+9}\right)$.

**Insättning** mellan $-1$ och $3$: $\sqrt{25}-\sqrt9=2$ och $2(\ln(4+5)-\ln(0+3))=2\ln3$.

**Svar:** $2+2\ln3$.`,
  '13.21b': r`**Metod (F6): variabelbyte med gränsbyte.** $\sin x$ är (minus) derivatan av $\cos x$.
${VB(r`t=\cos x,\ dt=-\sin x\,dx`, r`x=0\Rightarrow t=1,\quad x=\pi\Rightarrow t=-1`)}
$$\int_1^{-1}\frac{-dt}{\sqrt{t^2+2t+3}}=\int_{-1}^1\frac{dt}{\sqrt{(t+1)^2+2}}.$$
(Minustecknet vänder på gränserna.) Formelbladet $\int\frac{dt}{\sqrt{u^2+a}}=\ln|u+\sqrt{u^2+a}|$ med $u=t+1$:
$$\left[\ln\left(t+1+\sqrt{(t+1)^2+2}\right)\right]_{-1}^1=\ln(2+\sqrt6)-\ln\sqrt2=\ln\frac{2+\sqrt6}{\sqrt2}=\ln(\sqrt2+\sqrt3).$$`,
  '13.22': r`${GEN}

**a)** Kurvan $y=\frac1{x^2+1}$ börjar i $1$ vid $x=0$ och avtar mot 0.

**b)** Standardintegral: $\int_0^X\frac{dx}{x^2+1}=\big[\arctan x\big]_0^X=\arctan X$.

**c)** $\lim_{X\to\infty}\arctan X=\frac\pi2$.

**d)** Gränsvärdet finns och är ändligt, så $\int_0^\infty\frac{dx}{x^2+1}$ är **konvergent** med värdet $\frac\pi2$.`,
  '13.23a': r`${GEN}

**Skriv om** och förläng med $e^x$: $\frac1{e^x-e^{-x}}=\frac{e^x}{e^{2x}-1}$.
${VB(r`t=e^x,\ dt=e^x\,dx`, r`x=1\Rightarrow t=e,\quad x=K\Rightarrow t=e^K`)}
$\int_1^K\frac{e^x\,dx}{e^{2x}-1}=\int_e^{e^K}\frac{dt}{t^2-1}$.

**Partialbråk:** $\frac1{t^2-1}=\frac{1/2}{t-1}-\frac{1/2}{t+1}$, primitiv $\frac12\ln\frac{t-1}{t+1}$.
$$\frac12\left[\ln\frac{t-1}{t+1}\right]_e^{e^K}=\frac12\ln\frac{e^K-1}{e^K+1}-\frac12\ln\frac{e-1}{e+1}.$$
**Låt $K\to\infty$:** $\frac{e^K-1}{e^K+1}\to1$, så första termen $\to\ln1=0$.

**Svar:** konvergent, $\frac12\ln\frac{e+1}{e-1}$.`,
  '13.23b': r`${GEN}

${VB(r`t=3+\sin x,\ dt=\cos x\,dx`)}
Täljaren är nämnarens derivata: $\int_0^K\frac{\cos x}{3+\sin x}dx=\big[\ln(3+\sin x)\big]_0^K=\ln(3+\sin K)-\ln3$.

**Låt $K\to\infty$:** $\sin K$ pendlar mellan $-1$ och $1$, så uttrycket pendlar mellan $\ln\frac23$ och $\ln\frac43$ och har **inget gränsvärde**.

**Svar:** divergent.`,
  '13.24a': r`${GEN}

${VB(r`t=1+x^2,\ dt=2x\,dx`)}
$\int_0^K\frac{x}{1+x^2}dx=\frac12\big[\ln(1+x^2)\big]_0^K=\frac12\ln(1+K^2)\to\infty$ då $K\to\infty$.

**Svar:** divergent. (Jämför Sats 13.11: för stora $x$ beter sig integranden som $\frac1x$.)`,
  '13.24b': r`${GEN}

**Primitiv (partialintegration):**
${PI(r`e^{-x}`, r`-e^{-x}`, r`x`, r`1`)}
$\int xe^{-x}dx=-xe^{-x}+\int e^{-x}dx=-(x+1)e^{-x}$.
$$\int_0^Kxe^{-x}dx=\big[-(x+1)e^{-x}\big]_0^K=1-\frac{K+1}{e^K}.$$
**Låt $K\to\infty$:** $e^K$ växer mycket snabbare än $K+1$ (standardgränsvärde), så $\frac{K+1}{e^K}\to0$.

**Svar:** konvergent med värdet $1$.`,
  '13.24c': r`${GEN}

**Partialintegration** – logaritmen deriveras:
${PI(r`\frac1{x^2}`, r`-\frac1x`, r`\ln(2x-1)`, r`\frac2{2x-1}`)}
$$\int_1^K\frac{\ln(2x-1)}{x^2}dx=\left[-\frac{\ln(2x-1)}x\right]_1^K+\int_1^K\frac{2\,dx}{x(2x-1)}.$$
**Randtermen:** $-\frac{\ln(2K-1)}K+0\to0$ då $K\to\infty$ (logaritmen växer långsammare än $K$).

**Partialbråk:** $\frac2{x(2x-1)}=\frac Ax+\frac B{2x-1}$. Handpåläggning: $x=0$: $A=-2$; $x=\frac12$: $B=\frac2{1/2}=4$. Primitiv: $-2\ln x+2\ln(2x-1)=2\ln\frac{2x-1}x$.
$$\left[2\ln\frac{2x-1}x\right]_1^K=2\ln\frac{2K-1}K-0\to2\ln2.$$
**Svar:** konvergent med värdet $2\ln2$.`,
  '13.24d': r`${GEN}

${VB(r`t=x^2,\ dt=2x\,dx`, r`x=2\Rightarrow t=4,\quad x=K\Rightarrow t=K^2`)}
$\int_2^K\frac{x\,dx}{x^4-1}=\frac12\int_4^{K^2}\frac{dt}{t^2-1}$.

**Partialbråk:** primitiv $\frac12\ln\frac{t-1}{t+1}$ (som i 13.23 a).
$$\frac14\left[\ln\frac{t-1}{t+1}\right]_4^{K^2}=\frac14\ln\frac{K^2-1}{K^2+1}-\frac14\ln\frac35\to0-\frac14\ln\frac35=\frac14\ln\frac53.$$
**Svar:** konvergent med värdet $\frac14\ln\frac53$.`,
  '13.25': r`${GEN}

**a)** Kurvan $y=\frac1{\sqrt x}$ växer obegränsat när $x\to0^+$.

**b)** $\int_\varepsilon^1x^{-1/2}dx=\big[2\sqrt x\big]_\varepsilon^1=2-2\sqrt\varepsilon$.

**c)** $\lim_{\varepsilon\to0^+}(2-2\sqrt\varepsilon)=2$.

**d)** Ja, konvergent med värdet 2. Det stämmer med Sats 13.11: $\int_0^1x^{-\alpha}dx$ konvergerar för $\alpha=\frac12<1$.`,
  '13.26a': r`${GEN}

Integranden är obegränsad nära $x=0$. **Primitiv (partialintegration):**
${PI(r`x^{-1/2}`, r`2\sqrt x`, r`\ln x`, r`\frac1x`)}
$\int\frac{\ln x}{\sqrt x}dx=2\sqrt x\ln x-\int\frac{2\sqrt x}{x}dx=2\sqrt x\ln x-4\sqrt x$.
$$\int_\varepsilon^1\frac{\ln x}{\sqrt x}dx=(0-4)-\left(2\sqrt\varepsilon\ln\varepsilon-4\sqrt\varepsilon\right).$$
**Låt $\varepsilon\to0^+$:** $\sqrt\varepsilon\ln\varepsilon\to0$ (standardgränsvärde: $x^a\ln x\to0$ för $a>0$) och $\sqrt\varepsilon\to0$.

**Svar:** konvergent med värdet $-4$ (negativt eftersom $\ln x<0$ på intervallet).`,
  '13.26b': r`${GEN}

Integranden är obegränsad nära $x=1$ ($\ln1=0$).
${VB(r`t=\ln x,\ dt=\frac{dx}x`)}
$\int\frac{dx}{x\ln x}=\int\frac{dt}t=\ln|\ln x|$.
$$\int_{1/2}^{1-\varepsilon}\frac{dx}{x\ln x}=\ln|\ln(1-\varepsilon)|-\ln|\ln\tfrac12|.$$
**Låt $\varepsilon\to0^+$:** $\ln(1-\varepsilon)\to0$, så $\ln|\ln(1-\varepsilon)|\to-\infty$.

**Svar:** divergent.`,
  '13.27a': r`${GEN}

$\ln x\to-\infty$ då $x\to0^+$. **Primitiv** (integrera ettan):
${PI(r`1`, r`x`, r`\ln x`, r`\frac1x`)}
$\int\ln x\,dx=x\ln x-x$.
$$\int_\varepsilon^1\ln x\,dx=(0-1)-(\varepsilon\ln\varepsilon-\varepsilon)\to-1$$
eftersom $\varepsilon\ln\varepsilon\to0$ (standardgränsvärde).

**Svar:** konvergent med värdet $-1$.`,
  '13.27b': r`${GEN}

$x^2-1=0$ i $x=1$, så integranden är obegränsad där.

**Partialbråk:** $\frac1{x^2-1}=\frac{1/2}{x-1}-\frac{1/2}{x+1}$, primitiv $\frac12\ln\left|\frac{x-1}{x+1}\right|$.
$$\int_{1+\varepsilon}^2\frac{dx}{x^2-1}=\frac12\ln\frac13-\frac12\ln\frac{\varepsilon}{2+\varepsilon}.$$
**Låt $\varepsilon\to0^+$:** $\frac\varepsilon{2+\varepsilon}\to0$, så $\ln\frac\varepsilon{2+\varepsilon}\to-\infty$ och uttrycket $\to+\infty$.

**Svar:** divergent.`,
  '13.27c': r`${GEN}

Integranden är obegränsad vid $x=0$. Byt ut roten:
${VB(r`t=\sqrt x\iff x=t^2,\ dx=2t\,dt`, r`x=\varepsilon\Rightarrow t=\sqrt\varepsilon,\quad x=1\Rightarrow t=1`)}
$\int\frac{\arctan t}{t}\cdot2t\,dt=2\int\arctan t\,dt$ – nu är integranden begränsad!

**Partialintegration** (integrera ettan):
${PI(r`1`, r`t`, r`\arctan t`, r`\frac1{1+t^2}`, 't')}
$\int\arctan t\,dt=t\arctan t-\int\frac{t}{1+t^2}dt=t\arctan t-\frac12\ln(1+t^2)$.
$$2\left[t\arctan t-\tfrac12\ln(1+t^2)\right]_0^1=2\left(\frac\pi4-\frac12\ln2\right)=\frac\pi2-\ln2.$$
(Gränsvärdet $\varepsilon\to0^+$ är okomplicerat eftersom primitiven är kontinuerlig i 0.)`,
  '13.27d': r`${GEN}

Integranden är obegränsad vid $x=1$. **Formelbladet:** $\int\frac{dx}{\sqrt{x^2+a}}=\ln\left|x+\sqrt{x^2+a}\right|$ med $a=-1$.
$$\int_{1+\varepsilon}^2\frac{dx}{\sqrt{x^2-1}}=\ln(2+\sqrt3)-\ln\left(1+\varepsilon+\sqrt{(1+\varepsilon)^2-1}\right).$$
**Låt $\varepsilon\to0^+$:** det andra uttrycket $\to\ln(1+0)=0$.

**Svar:** konvergent med värdet $\ln(2+\sqrt3)$.`,
  '13.28': r`${GEN}

**Primitiv – byt ut roten:**
${VB(r`t=\sqrt x\iff x=t^2,\ dx=2t\,dt`)}
$\int\frac{dx}{\sqrt x(x+4)}=\int\frac{2t\,dt}{t(t^2+4)}=\int\frac{2\,dt}{t^2+4}=\arctan\frac t2=\arctan\frac{\sqrt x}2$ (formelbladet, $a=2$).

**a)** $\int_1^K=\arctan\frac{\sqrt K}2-\arctan\frac12\to\frac\pi2-\arctan\frac12$ då $K\to\infty$.

**b)** Obegränsad vid 0: $\int_\varepsilon^1=\arctan\frac12-\arctan\frac{\sqrt\varepsilon}2\to\arctan\frac12$.

**c)** Generaliserad på två sätt – dela upp: $\int_0^\infty=\int_0^1+\int_1^\infty$, båda konvergenta. Summa: $\frac\pi2$.`,
  '13.29a': r`${GEN}

Generaliserad i båda ändar – dela upp: $\int_{-\infty}^0+\int_0^\infty$.
- $\int_0^K\frac{dx}{1+x^2}=\arctan K\to\frac\pi2$.
- $\int_{-K}^0\frac{dx}{1+x^2}=0-\arctan(-K)\to\frac\pi2$.

**Svar:** konvergent med värdet $\pi$.`,
  '13.29b': r`${GEN}

Här är det generaliserat på **två** sätt: vid $x=1$ (nämnaren är 0) och vid $\infty$. Båda delarna måste konvergera.

**Vid $x=1$:** primitiven $\frac12\ln\left|\frac{x-1}{x+1}\right|$ går mot $-\infty$ då $x\to1^+$ (se 13.27 b). Redan $\int_1^2$ är alltså divergent.

**Svar:** divergent.`,
  '13.29c': r`${GEN}

Integranden är obegränsad i båda ändarna, där $4x^2=1$. **Primitiv** med variabelbyte:
${VB(r`t=2x,\ dt=2\,dx`)}
$\int\frac{dx}{\sqrt{1-(2x)^2}}=\frac12\int\frac{dt}{\sqrt{1-t^2}}=\frac12\arcsin2x$.

Primitiven är kontinuerlig i ändpunkterna, så gränsvärdena blir bara insättning:
$$\frac12\big[\arcsin2x\big]_{-1/2}^{1/2}=\frac12\left(\frac\pi2-\left(-\frac\pi2\right)\right)=\frac\pi2.$$`,
  '13.29d': r`${GEN}

Obegränsad vid både $x=0$ och $x=1$. **Kvadratkomplettera:** $x(1-x)=x-x^2=\frac14-\left(x-\frac12\right)^2$.
${VB(r`t=2x-1,\ dt=2\,dx`)}
$\frac{1}{\sqrt{\frac14-(x-\frac12)^2}}=\frac{2}{\sqrt{1-(2x-1)^2}}$, så $\int\frac{dx}{\sqrt{x(1-x)}}=\int\frac{dt}{\sqrt{1-t^2}}=\arcsin(2x-1)$.
$$\big[\arcsin(2x-1)\big]_0^1=\frac\pi2-\left(-\frac\pi2\right)=\pi.$$`,
  '13.30a': r`${JMF}

**Jämför med $\frac1{x^2}$.** För $x\ge1$ är $\ln x\ge0$, så $x^2+\ln x\ge x^2$ och
$$0<\frac1{x^2+\ln x}\le\frac1{x^2}.$$
$\int_1^\infty\frac{dx}{x^2}$ är konvergent ($\alpha=2>1$). Den större integralen är ändlig, alltså är den mindre det också (Sats 13.10).

**Svar:** konvergent.`,
  '13.30b': r`${JMF}

**Jämför med $\frac1x$.** För $x\ge1$ är $\ln x\ge0$, så $0<x-\ln x\le x$ och
$$\frac1{x-\ln x}\ge\frac1x>0.$$
$\int_1^\infty\frac{dx}x$ är divergent ($\alpha=1$). Den mindre integralen är oändlig, alltså är den större det också (Sats 13.10).

**Svar:** divergent.`,
  '13.30c': r`${JMF}

**Olikheten pekar åt fel håll:** $x^2-\ln x\le x^2$ ger $\frac1{x^2-\ln x}\ge\frac1{x^2}$, vilket inte hjälper. **Använd Sats 13.12** med $f=\frac1{x^2}$, $g=\frac1{x^2-\ln x}$ (båda positiva för $x\ge1$):
$$\lim_{x\to\infty}\frac fg=\lim_{x\to\infty}\frac{x^2-\ln x}{x^2}=\lim_{x\to\infty}\left(1-\frac{\ln x}{x^2}\right)=1\ne0,\infty.$$
$\int_1^\infty\frac{dx}{x^2}$ konvergerar, alltså gör $\int_1^\infty\frac{dx}{x^2-\ln x}$ det också.

**Svar:** konvergent.`,
  '13.30d': r`${JMF}

**Olikheten pekar åt fel håll** ($\frac1{x+\ln x}\le\frac1x$ hjälper inte för divergens). **Sats 13.12** med $f=\frac1x$, $g=\frac1{x+\ln x}$:
$$\lim_{x\to\infty}\frac{x+\ln x}{x}=\lim_{x\to\infty}\left(1+\frac{\ln x}x\right)=1\ne0,\infty.$$
$\int_1^\infty\frac{dx}x$ divergerar, alltså gör $\int_1^\infty\frac{dx}{x+\ln x}$ det också.

**Svar:** divergent.`,
  '13.31a': r`${JMF}

$x^3+1\ge x^3$, så $0<\frac1{\sqrt{x^3+1}}\le\frac1{x^{3/2}}$. $\int_2^\infty x^{-3/2}dx$ konvergerar ($\alpha=\frac32>1$), alltså är integralen **konvergent** (Sats 13.10).`,
  '13.31b': r`${JMF}

$0<x-1<x$, så $\frac1{\sqrt{x-1}}>\frac1{\sqrt x}>0$. $\int_2^\infty x^{-1/2}dx$ divergerar ($\alpha=\frac12\le1$), alltså är integralen **divergent** (Sats 13.10).`,
  '13.31c': r`${JMF}

Olikheten åt fel håll ($\frac1{\sqrt{x^3-1}}>\frac1{x^{3/2}}$). **Sats 13.12** med $f=x^{-3/2}$:
$$\lim_{x\to\infty}\frac{\sqrt{x^3-1}}{x^{3/2}}=\lim_{x\to\infty}\sqrt{1-\frac1{x^3}}=1.$$
$\int_2^\infty x^{-3/2}dx$ konvergerar, alltså är integralen **konvergent**.`,
  '13.31d': r`${JMF}

Problemet ligger vid $x=0$. På $]0,1]$ är $x+x^5\ge x$, så $0<\frac1{\sqrt{x+x^5}}\le\frac1{\sqrt x}$. $\int_0^1x^{-1/2}dx$ konvergerar ($\alpha=\frac12<1$), alltså är integralen **konvergent**.`,
  '13.31e': r`${JMF}

Problemet ligger vid $x=0$. För $0<x\le1$ gäller $0<\sin x\le x$, så $\frac1{\sin x}\ge\frac1x>0$. $\int_0^1\frac{dx}x$ divergerar ($\alpha=1$), alltså är integralen **divergent**.`,
  '13.31f': r`${JMF}

**Generaliserad på två sätt** – dela upp i $\int_0^1+\int_1^\infty$. Båda måste konvergera.

**Nära 0:** $e^x+1\ge2$, så $0<\frac1{\sqrt x(e^x+1)}\le\frac1{2\sqrt x}$. $\int_0^1x^{-1/2}dx$ konvergerar ($\alpha=\frac12<1$).

**Mot $\infty$:** för $x\ge1$ är $\sqrt x(e^x+1)\ge e^x$, så integranden är $\le e^{-x}$. $\int_1^Ke^{-x}dx=e^{-1}-e^{-K}\to e^{-1}$ – konvergent.

**Svar:** konvergent.`,
  '13.32a': r`**Metod (F7): jämförelse (Sats 13.10) med en integral vi kan räkna ut.**

**Uppskatta nämnaren nedåt:** $\sin^2x\ge0$, så $e^x+\sin^2x\ge e^x$ och
$$0<\frac1{e^x+\sin^2x}\le e^{-x}.$$
**Räkna jämförelseintegralen:** $\int_0^Ke^{-x}dx=\big[-e^{-x}\big]_0^K=1-e^{-K}\to1$.

**Slutsats:** integralen är konvergent och $\int_0^\infty\frac{dx}{e^x+\sin^2x}\le\int_0^\infty e^{-x}dx=1$. $\blacksquare$`,
  '13.32b': r`**Metod (F7): jämförelse (Sats 13.10) med en integral vi kan räkna ut.**

**Uppskatta nämnaren nedåt:** för $x\ge1$ är $\ln x\ge0$, så $x^3+\ln x\ge x^3$ och
$$0<\frac{x}{x^3+\ln x}\le\frac{x}{x^3}=\frac1{x^2}.$$
**Räkna jämförelseintegralen:** $\int_1^K\frac{dx}{x^2}=\left[-\frac1x\right]_1^K=1-\frac1K\to1$.

**Slutsats:** $\int_1^\infty\frac{x}{x^3+\ln x}dx\le1$. $\blacksquare$`,
  '13.50': r`**Metod (F7): kontrollera om integralen är generaliserad innan du använder insättningsformeln.**

**Var är integranden obegränsad?** $(2x+1)^2=0$ när $x=-\frac12$, som ligger **inne i** intervallet $[-1,1]$. Integralen är alltså generaliserad, och insättningsformeln får inte användas rakt över problempunkten.

**Rimlighetskontroll:** integranden $\frac2{(2x+1)^2}$ är positiv överallt, så integralen kan inte bli negativ (F5). Det "uträknade" svaret $-\frac43$ är omöjligt.

**Rätt sätt:** dela upp i $\int_{-1}^{-1/2}+\int_{-1/2}^1$. Till exempel
$$\int_{-1/2+\varepsilon}^1\frac{2\,dx}{(2x+1)^2}=\left[-\frac1{2x+1}\right]_{-1/2+\varepsilon}^1=-\frac13+\frac1{2\varepsilon}\to\infty.$$
Integralen är **divergent**.`,
}

/** Lösningsförslag kapitel 14 – följer F8–F9 (area-, volym- och masselement, skivmetoden). */
export const SOL14: Record<string, string> = {
  '14.1': r`${AREA}

**Skärningspunkter:** $x^3=x^4\iff x^3(1-x)=0\iff x=0$ eller $x=1$.

**Vilken ligger överst?** Testa $x=\frac12$: $\frac18>\frac1{16}$, så $x^3\ge x^4$ på $[0,1]$.

**Areaelement:** $dA=(x^3-x^4)\,dx$.
$$A=\int_0^1(x^3-x^4)\,dx=\left[\frac{x^4}4-\frac{x^5}5\right]_0^1=\frac14-\frac15=\frac1{20}.$$`,
  '14.2a': r`${AREA}

**Skärningspunkt:** $\frac2{1+x^2}=\frac1{\sqrt{1+x^2}}\iff2=\sqrt{1+x^2}\iff1+x^2=4\iff x=\sqrt3$ (positiv).

**Areaelement:** $dA=\left(\frac2{1+x^2}-\frac1{\sqrt{1+x^2}}\right)dx$.

**Primitiver:** $\int\frac{2}{1+x^2}dx=2\arctan x$ (standard) och $\int\frac{dx}{\sqrt{x^2+1}}=\ln\left(x+\sqrt{x^2+1}\right)$ (formelbladet, $a=1$).
$$A=\left[2\arctan x-\ln\left(x+\sqrt{x^2+1}\right)\right]_0^{\sqrt3}=2\cdot\frac\pi3-\ln(\sqrt3+2)-0=\frac{2\pi}3-\ln(2+\sqrt3).$$`,
  '14.2b': r`${AREA}

**Förenkla den undre kurvan:** $1-\cos^2x=\sin^2x$ (trigonometriska ettan). Eftersom $0\le\sin x\le1$ på $[0,\frac\pi2]$ är $\sin^2x\le\sin x$, så $\sin x$ ligger överst.

**Areaelement:** $dA=(\sin x-\sin^2x)\,dx$. Med formel (3): $\sin^2x=\frac{1-\cos2x}2$.
$$A=\int_0^{\pi/2}\left(\sin x-\frac12+\frac12\cos2x\right)dx=\left[-\cos x-\frac x2+\frac14\sin2x\right]_0^{\pi/2}=\left(0-\frac\pi4+0\right)-(-1)=1-\frac\pi4.$$`,
  '14.3': r`${VOL}

**Skiva tältet vågrätt.** På höjden $x$ är tvärsnittet en kvadrat med sidan $\sqrt{4-x^2}$, alltså
$$A(x)=\left(\sqrt{4-x^2}\right)^2=4-x^2,\qquad dV=(4-x^2)\,dx.$$
**a)** Hela tältet, $0\le x\le2$: $V=\int_0^2(4-x^2)\,dx=\left[4x-\frac{x^3}3\right]_0^2=8-\frac83=\frac{16}3$ m³.

**b)** Bara upp till 1 m: $V=\int_0^1(4-x^2)\,dx=4-\frac13=\frac{11}3$ m³.`,
  '14.4': r`${VOL}

**Lägg $x$-axeln längs eggen**, med $-a\le x\le a$. Bottenytan är ellipsen $\frac{x^2}{a^2}+\frac{y^2}{b^2}\le1$.

**Tvärsnittet** vid $x$ (vinkelrätt mot eggen) är en likbent triangel. Basen är ellipsens korda: $y=\pm b\sqrt{1-\frac{x^2}{a^2}}$, så basen är $2b\sqrt{1-\frac{x^2}{a^2}}$. Höjden är $h$.
$$A(x)=\frac12\cdot2b\sqrt{1-\frac{x^2}{a^2}}\cdot h=bh\sqrt{1-\frac{x^2}{a^2}}.$$
**Volym:** $V=bh\int_{-a}^a\sqrt{1-\frac{x^2}{a^2}}\,dx$.
${VB(r`x=a\sin t,\ dx=a\cos t\,dt`, r`x=-a\Rightarrow t=-\frac\pi2,\quad x=a\Rightarrow t=\frac\pi2`)}
$\int_{-\pi/2}^{\pi/2}\cos t\cdot a\cos t\,dt=a\int_{-\pi/2}^{\pi/2}\frac{1+\cos2t}2dt=\frac{\pi a}2$ (formel (2)).

**Svar:** $V=bh\cdot\frac{\pi a}2=\frac12\pi abh$.`,
  '14.5': r`${ROT}

**Radien** i varje tvärsnitt är $f(x)=xe^x$, så $A(x)=\pi x^2e^{2x}$ och
$$V=\pi\int_0^1x^2e^{2x}\,dx.$$
**Partialintegration två gånger** (polynomet deriveras):
${PI(r`e^{2x}`, r`\frac12e^{2x}`, r`x^2`, r`2x`)}
$\int x^2e^{2x}dx=\frac{x^2}2e^{2x}-\int xe^{2x}dx$.
${PI(r`e^{2x}`, r`\frac12e^{2x}`, r`x`, r`1`)}
$\int xe^{2x}dx=\frac x2e^{2x}-\frac14e^{2x}$.

Primitiv: $e^{2x}\left(\frac{x^2}2-\frac x2+\frac14\right)$.
$$V=\pi\left[e^{2x}\left(\frac{x^2}2-\frac x2+\frac14\right)\right]_0^1=\pi\left(\frac{e^2}4-\frac14\right)=\frac\pi4(e^2-1).$$`,
  '14.6': r`${ROT}

**Radien** är $f(x)=x^3$, så $A(x)=\pi(x^3)^2=\pi x^6$.
$$V=\int_0^1\pi x^6\,dx=\pi\left[\frac{x^7}7\right]_0^1=\frac\pi7.$$`,
  '14.7': r`${ROT}

**Klotet som rotationskropp:** halvcirkeln $y=\sqrt{R^2-x^2}$, $-R\le x\le R$, roterad kring $x$-axeln. Planet är $x=a$.

**Tvärsnitt:** $A(x)=\pi(R^2-x^2)$.

**Den mindre delen** ("kalotten", $a\le x\le R$):
$$V_1=\pi\int_a^R(R^2-x^2)\,dx=\pi\left[R^2x-\frac{x^3}3\right]_a^R=\pi\left(\frac23R^3-aR^2+\frac{a^3}3\right)=\frac\pi3(R-a)^2(2R+a).$$
**Den andra delen:** klotets volym minus $V_1$: $V_2=\frac43\pi R^3-V_1=\frac\pi3(R+a)^2(2R-a)$.

**Kontroll:** $a=0$ ger två halvklot, $\frac23\pi R^3$ vardera ✓`,
  '14.8': r`${ROT}

**Radien** är $f(x)=\sin x+2\cos x$ (positiv på $[0,\frac\pi2]$).
$$V=\pi\int_0^{\pi/2}(\sin x+2\cos x)^2dx=\pi\int_0^{\pi/2}\left(\sin^2x+4\sin x\cos x+4\cos^2x\right)dx.$$
**Trigformlerna (F3):** $\sin^2x=\frac{1-\cos2x}2$, $\cos^2x=\frac{1+\cos2x}2$, $2\sin x\cos x=\sin2x$.
- $\int_0^{\pi/2}\sin^2x\,dx=\frac\pi4$ och $\int_0^{\pi/2}4\cos^2x\,dx=\pi$ (cos2x-termerna ger 0).
- $\int_0^{\pi/2}2\sin2x\,dx=\big[-\cos2x\big]_0^{\pi/2}=1+1=2$.

**Svar:** $V=\pi\left(\frac\pi4+2+\pi\right)=\frac{\pi(5\pi+8)}4$.`,
  '14.9': r`${ROT}

**Radien** är $f(x)=\frac1{\sqrt{x(1+x^2)}}$, så $A(x)=\frac{\pi}{x(1+x^2)}$. Intervallet är obegränsat – en **generaliserad integral** (F7):
$$V=\lim_{K\to\infty}\pi\int_1^K\frac{dx}{x(1+x^2)}.$$
**Partialbråk (F4):** $\frac1{x(1+x^2)}=\frac1x-\frac{x}{1+x^2}$ (handpåläggning $x=0$ ger $A=1$, sedan $B=-1$, $C=0$). Primitiv: $\ln x-\frac12\ln(1+x^2)=\ln\frac{x}{\sqrt{1+x^2}}$.
$$\pi\left[\ln\frac{x}{\sqrt{1+x^2}}\right]_1^K=\pi\ln\frac{K}{\sqrt{1+K^2}}-\pi\ln\frac1{\sqrt2}.$$
**Låt $K\to\infty$:** $\frac{K}{\sqrt{1+K^2}}\to1$, så första termen $\to0$.

**Svar:** $V=\pi\ln\sqrt2=\frac\pi2\ln2$.`,
  '14.10': r`**Metod (F8): volymelement – skiva vinkelrätt mot rotationsaxeln.** Kroppen roterar kring $y$-axeln, så vi skivar den vågrätt: tvärsnitten är cirkelskivor på höjden $y$, och $dV=A(y)\,dy$. (Rörformeln ingår inte i kursen.)

**Radien på höjden $y$:** kurvan $y=e^{-x^2}$ går från $y=1$ (vid $x=0$) ner mot 0. Lös ut $x$: $-x^2=\ln y\iff x=\sqrt{-\ln y}$, $0<y\le1$. Skivan på höjden $y$ har alltså radien $\sqrt{-\ln y}$:
$$A(y)=\pi\left(\sqrt{-\ln y}\right)^2=-\pi\ln y.$$
**Volym** – generaliserad nära $y=0$, där $\ln y\to-\infty$ (F7):
$$V=\int_0^1-\pi\ln y\,dy=\lim_{\varepsilon\to0^+}-\pi\big[y\ln y-y\big]_\varepsilon^1=\lim_{\varepsilon\to0^+}-\pi\big(-1-\varepsilon\ln\varepsilon+\varepsilon\big)=\pi,$$
eftersom $\varepsilon\ln\varepsilon\to0$. (Primitiven till $\ln y$ fås med partialintegration, se 13.27 a.)`,
  '14.11': r`**Metod (F8): volymelement – skiva vinkelrätt mot rotationsaxeln.** Rotationen sker kring $y$-axeln, så skivorna är vågräta. Varje skiva är en **ring** (en cirkelskiva med ett hål), och dess area är stora skivan minus hålet: $A(y)=\pi\left(R_{yttre}^2-R_{inre}^2\right)$.

**Radierna på höjden $y$:** cirkeln $(x-4)^2+y^2=4$ ger $x=4\pm\sqrt{4-y^2}$, $-2\le y\le2$. Skriv $s=\sqrt{4-y^2}$:
$$A(y)=\pi\left((4+s)^2-(4-s)^2\right)=\pi\cdot16s=16\pi\sqrt{4-y^2}.$$
**Volym:** $V=16\pi\int_{-2}^2\sqrt{4-y^2}\,dy$.

**Integralen som area (F5):** $\int_{-2}^2\sqrt{4-y^2}\,dy$ är arean under en halvcirkel med radie 2, alltså $\frac{\pi\cdot2^2}2=2\pi$.

**Svar:** $V=16\pi\cdot2\pi=32\pi^2$.`,
  '14.12': r`${MASS}

**Tråd:** $dm=\rho(x)\,dx=x^2\,dx$.
$$m=\int_1^2x^2\,dx=\left[\frac{x^3}3\right]_1^2=\frac83-\frac13=\frac73\ \text{kg}.$$
**Rimligt:** densiteten ligger mellan 1 och 4 kg/m på en 1 m lång tråd.`,
  '14.13': r`${MASS}

**Tråd:** $dm=\ln(1+x)\,dx$, $0\le x\le2$.

**Primitiv (partialintegration, integrera ettan)** – välj $F=1+x$:
${PI(r`1`, r`1+x`, r`\ln(1+x)`, r`\frac1{1+x}`)}
$\int\ln(1+x)\,dx=(1+x)\ln(1+x)-\int1\,dx=(1+x)\ln(1+x)-x$.
$$m=\big[(1+x)\ln(1+x)-x\big]_0^2=3\ln3-2\approx1{,}3\ \text{kg}.$$`,
  '14.14': r`${MASS}

**Kropp:** $dm=\rho\,dV$. Skiva konen vågrätt på avståndet $x$ från spetsen.

**Tvärsnitt:** likformighet – radien växer linjärt från 0 vid spetsen till 1 vid $x=2$, alltså $r(x)=\frac x2$ och $A(x)=\pi\frac{x^2}4$. Volymelement $dV=\frac{\pi x^2}4dx$.

**Masselement:** $dm=(10-x^2)\cdot\frac{\pi x^2}4\,dx$.
$$m=\frac\pi4\int_0^2(10x^2-x^4)\,dx=\frac\pi4\left[\frac{10x^3}3-\frac{x^5}5\right]_0^2=\frac\pi4\left(\frac{80}3-\frac{32}5\right)=\frac\pi4\cdot\frac{304}{15}=\frac{76\pi}{15}\ \text{kg}.$$`,
  '14.15': r`${MASS}

**Densiteten:** lägg tråden på $0\le x\le L$. Avstånden till ändpunkterna är $x$ och $L-x$, så $\rho(x)=kx(L-x)$.

**Masselement:** $dm=k(Lx-x^2)\,dx$.
$$m=k\int_0^L(Lx-x^2)\,dx=k\left[\frac{Lx^2}2-\frac{x^3}3\right]_0^L=k\left(\frac{L^3}2-\frac{L^3}3\right)=\frac{kL^3}6.$$`,
  '14.16': r`${MASS}

**Full silo:** $H=20$, så $\rho(h)=\ln(5+20-h)=\ln(25-h)$.

**Volymelement:** silon är en cylinder, så varje vågrät skiva har tvärsnittsarean $\pi\cdot4^2=16\pi$ och $dV=16\pi\,dh$. Masselement: $dm=16\pi\ln(25-h)\,dh$.
$$m=16\pi\int_0^{20}\ln(25-h)\,dh.$$
${VB(r`u=25-h,\ du=-dh`, r`h=0\Rightarrow u=25,\quad h=20\Rightarrow u=5`)}
$16\pi\int_{25}^5-\ln u\,du=16\pi\int_5^{25}\ln u\,du$.

**Primitiv** (partialintegration, integrera ettan): $u\ln u-u$.
$$m=16\pi\big[u\ln u-u\big]_5^{25}=16\pi(25\ln25-25-5\ln5+5)=16\pi(25\ln25-5\ln5-20)\ \text{kg}.$$`,
  '14.17': r`**Metod (F9): tyngdpunkt för en plan skiva.** Homogen ⇒ $\rho$ konstant, $dm=\rho\,dA$, och $\rho$ förkortas bort: $x_T=\frac1A\int x\,dA$, $y_T=\frac1A\int y\,dA$.

**Area (lodräta remsor):** $dA=\sin x\,dx$, $A=\int_0^{\pi/2}\sin x\,dx=\big[-\cos x\big]_0^{\pi/2}=1$.

**$x_T$ – lodräta remsor:** remsan vid $x$ har arean $\sin x\,dx$.
${PI(r`\sin x`, r`-\cos x`, r`x`, r`1`)}
$$x_T=\int_0^{\pi/2}x\sin x\,dx=\big[-x\cos x\big]_0^{\pi/2}+\int_0^{\pi/2}\cos x\,dx=0+1=1.$$
**$y_T$ – summera areaelementen i $y$-led (vågräta remsor):** på höjden $y$, $0\le y\le1$, går remsan från kurvan $x=\arcsin y$ till linjen $x=\frac\pi2$. Bredd $h(y)=\frac\pi2-\arcsin y$, så $dA=\left(\frac\pi2-\arcsin y\right)dy$.
$$y_T=\int_0^1y\left(\frac\pi2-\arcsin y\right)dy=\frac\pi4-\int_0^1y\arcsin y\,dy.$$
${PI(r`y`, r`\frac{y^2}2`, r`\arcsin y`, r`\frac1{\sqrt{1-y^2}}`, 'y')}
$\int_0^1y\arcsin y\,dy=\left[\frac{y^2}2\arcsin y\right]_0^1-\frac12\int_0^1\frac{y^2}{\sqrt{1-y^2}}dy=\frac\pi4-\frac12\int_0^1\frac{y^2\,dy}{\sqrt{1-y^2}}$.
${VB(r`y=\sin t,\ dy=\cos t\,dt`, r`y=0\Rightarrow t=0,\quad y=1\Rightarrow t=\frac\pi2`)}
$\int_0^{\pi/2}\frac{\sin^2t}{\cos t}\cos t\,dt=\int_0^{\pi/2}\sin^2t\,dt=\frac\pi4$. Alltså $\int_0^1y\arcsin y\,dy=\frac\pi4-\frac\pi8=\frac\pi8$.

**Svar:** $y_T=\frac\pi4-\frac\pi8=\frac\pi8$, så tyngdpunkten är $(1,\frac\pi8)$. Rimligt: området är tjockare upp mot $x=\frac\pi2$ och lågt i $y$-led.`,
  '14.18': r`${TP}

**Massa** (se 14.12): $m=\int_1^2x^2dx=\frac73$.

**Moment:** $\int_1^2x\,dm=\int_1^2x\cdot x^2\,dx=\left[\frac{x^4}4\right]_1^2=\frac{16-1}4=\frac{15}4$.
$$x_{mc}=\frac{15/4}{7/3}=\frac{45}{28}\approx1{,}61\ \text{m}.$$
**Rimligt:** större än mitten 1,5 eftersom tråden är tyngre vid $x=2$.`,
  '14.19': r`${TP}

**Masselement** (se 14.14): $dm=(10-x^2)\frac{\pi x^2}4dx$, $m=\frac{76\pi}{15}$. Av symmetri ligger masscentrum på konens axel.

**Moment:**
$$\int_0^2x\,dm=\frac\pi4\int_0^2(10x^3-x^5)\,dx=\frac\pi4\left[\frac{10x^4}4-\frac{x^6}6\right]_0^2=\frac\pi4\left(40-\frac{32}3\right)=\frac{22\pi}3.$$
$$x_{mc}=\frac{22\pi/3}{76\pi/15}=\frac{22\cdot15}{3\cdot76}=\frac{55}{38}\approx1{,}45\ \text{m från spetsen}.$$
**Rimligt:** det mesta av volymen ligger upp mot den breda delen ($x=2$).`,
  '14.20': r`${TP}

**Masselement:** homogen kropp ($\rho$ konstant) med skivor av radien $e^x$: $dV=\pi e^{2x}dx$ och $dm=\rho\pi e^{2x}dx$. $\rho\pi$ förkortas bort:
$$x_{mc}=\frac{\int_0^{1/2}xe^{2x}dx}{\int_0^{1/2}e^{2x}dx}.$$
**Nämnaren:** $\left[\frac12e^{2x}\right]_0^{1/2}=\frac{e-1}2$.

**Täljaren (partialintegration):**
${PI(r`e^{2x}`, r`\frac12e^{2x}`, r`x`, r`1`)}
$\int_0^{1/2}xe^{2x}dx=\left[\frac x2e^{2x}\right]_0^{1/2}-\frac12\int_0^{1/2}e^{2x}dx=\frac e4-\frac{e-1}4=\frac14$.

**Svar:** $x_{mc}=\frac{1/4}{(e-1)/2}=\frac1{2(e-1)}\approx0{,}29$.`,
  '14.39': r`${ACK}

**Sträcka = ∫ hastighet:** $ds=v(t)\,dt$. Första kvarten är $0\le t\le\frac14$ h.
$$s=\int_0^{1/4}1600(t-4t^2)\,dt=1600\left[\frac{t^2}2-\frac{4t^3}3\right]_0^{1/4}=1600\left(\frac1{32}-\frac1{48}\right)=1600\cdot\frac1{96}=\frac{50}3\ \text{km}.$$
(Hastigheten är $\ge0$ på intervallet, så förflyttningen är också sträckan.)`,
  '14.40': r`${ACK}

**Hastighet = ∫ acceleration:** $dv=a(t)\,dt$. Partikeln startar i vila, $v(0)=0$.
$$v(3)=v(0)+\int_0^3100\cos t\,dt=0+\big[100\sin t\big]_0^3=100\sin3\approx14\ \text{m/s}.$$`,
  '14.41': r`${ACK}

**Energi = ∫ effekt:** $dE=P(t)\,dt$, ett dygn är $0\le t\le24$ h.
$$E=\int_0^{24}\left(1+\pi\left|\sin\frac{\pi t}{12}\right|\right)dt=24+\pi\int_0^{24}\left|\sin\frac{\pi t}{12}\right|dt.$$
**Absolutbeloppet – dela upp (F5):** $\sin\frac{\pi t}{12}\ge0$ på $[0,12]$ och $\le0$ på $[12,24]$, och de två delarna är lika stora. Alltså
$$\int_0^{24}\left|\sin\frac{\pi t}{12}\right|dt=2\int_0^{12}\sin\frac{\pi t}{12}dt=2\left[-\frac{12}\pi\cos\frac{\pi t}{12}\right]_0^{12}=2\cdot\frac{24}\pi=\frac{48}\pi.$$
**Svar:** $E=24+\pi\cdot\frac{48}\pi=72$ kWh.`,
}

