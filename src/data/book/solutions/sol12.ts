import { PI, PI_FORMEL, VB } from './fmt'

const r = String.raw

const STD = r`**Metod (F1/F2): standardintegral.** Den här primitiven ska kunnas utantill (Sats 12.2). Kontrollera alltid genom att derivera svaret – du ska få tillbaka integranden.`
const GISS = r`**Metod (F2): kvalificerad gissning.** Den inre funktionen är av typen $ax+b$, så dess derivata är en konstant. Gissa en primitiv till den yttre funktionen, derivera (kedjeregeln ger en extra faktor $a$) och förbättra gissningen med en konstant faktor.`

/** Lösningsförslag kapitel 12 – följer F1–F4 (lärarens uppställning). */
export const SOL12: Record<string, string> = {
  // ---------------- 12.1 standardintegraler ----------------
  '12.1a': r`${STD}

$\int x^a\,dx=\frac{x^{a+1}}{a+1}+C$ för $a\ne-1$. Med $a=4$: höj exponenten ett steg och dela med den nya exponenten:
$$\int x^4\,dx=\frac{x^5}{5}+C.$$
**Kontroll:** $\left(\frac{x^5}5\right)'=\frac{5x^4}{5}=x^4$ ✓`,
  '12.1b': r`${STD}

Potensregeln fungerar inte här ($a=-1$ ger division med 0). I stället gäller $\int\frac1x\,dx=\ln|x|+C$.

**Varför absolutbelopp?** $\frac1x$ är definierad även för $x<0$. För $x<0$ är $\frac{d}{dx}\ln(-x)=\frac{-1}{-x}=\frac1x$, så $\ln|x|$ fungerar på båda sidor om 0.`,
  '12.1c': r`${STD}

$e^x$ är sin egen derivata, så $\int e^x\,dx=e^x+C$.`,
  '12.1d': r`${STD}

Vi söker $F$ med $F'(x)=\cos x$. Eftersom $(\sin x)'=\cos x$ är $\int\cos x\,dx=\sin x+C$.`,
  '12.1e': r`${STD}

$(\cos x)'=-\sin x$ – fel tecken. Förbättra: $(-\cos x)'=\sin x$, så $\int\sin x\,dx=-\cos x+C$.

**Vanlig fälla:** minustecknet. Kontrollera alltid genom att derivera.`,
  '12.1f': r`${STD}

Standardintegral från F4: $\int\frac{1}{\cos^2x}\,dx=\tan x+C$.

**Kontroll:** $(\tan x)'=\left(\frac{\sin x}{\cos x}\right)'=\frac{\cos x\cos x-\sin x(-\sin x)}{\cos^2x}=\frac{\cos^2x+\sin^2x}{\cos^2x}=\frac1{\cos^2x}$ ✓`,
  '12.1g': r`${STD}

Standardintegral från F4: $\int\frac{1}{\sin^2x}\,dx=-\frac{\cos x}{\sin x}+C=-\cot x+C$.

**Kontroll (kvotregeln):** $\left(-\frac{\cos x}{\sin x}\right)'=-\frac{-\sin x\sin x-\cos x\cos x}{\sin^2x}=\frac{\sin^2x+\cos^2x}{\sin^2x}=\frac1{\sin^2x}$ ✓`,
  '12.1h': r`${STD}

$\int\frac1{1+x^2}\,dx=\arctan x+C$, eftersom $(\arctan x)'=\frac1{1+x^2}$. Den här kommer tillbaka hela tiden vid partialbråk (F3, F4)!`,
  '12.1i': r`${STD}

$\int\frac{1}{\sqrt{1-x^2}}\,dx=\arcsin x+C$, eftersom $(\arcsin x)'=\frac1{\sqrt{1-x^2}}$.`,
  '12.1j': r`Den här står på **formelbladet**: $\int\frac{dx}{\sqrt{x^2+a}}=\ln\left|x+\sqrt{x^2+a}\right|+C$.

**Kontroll (kedjeregeln):** $\frac{d}{dx}\ln\left(x+\sqrt{x^2+a}\right)=\frac{1+\frac{x}{\sqrt{x^2+a}}}{x+\sqrt{x^2+a}}=\frac{\frac{\sqrt{x^2+a}+x}{\sqrt{x^2+a}}}{x+\sqrt{x^2+a}}=\frac1{\sqrt{x^2+a}}$ ✓`,

  // ---------------- 12.2 potensform ----------------
  '12.2a': r`**Metod (F1):** potensregeln $\int x^a\,dx=\frac{x^{a+1}}{a+1}+C$.

$\int x^3\,dx=\frac{x^4}{4}$. **Kontroll:** $\left(\frac{x^4}4\right)'=x^3$ ✓`,
  '12.2b': r`**Metod (F1):** skriv först på potensform (bokens tips), sedan potensregeln.

$\frac1{x^3}=x^{-3}$, så $\int x^{-3}\,dx=\frac{x^{-3+1}}{-3+1}=\frac{x^{-2}}{-2}=-\frac{1}{2x^2}$.

**Kontroll:** $\left(-\tfrac12x^{-2}\right)'=-\tfrac12\cdot(-2)x^{-3}=x^{-3}$ ✓`,
  '12.2c': r`**Metod (F1):** potensform: $\sqrt x=x^{1/2}$.

$\int x^{1/2}\,dx=\frac{x^{3/2}}{3/2}=\frac23x^{3/2}=\frac23x\sqrt x$ (eftersom $x^{3/2}=x\cdot x^{1/2}$).

**Kontroll:** $\left(\tfrac23x^{3/2}\right)'=\tfrac23\cdot\tfrac32x^{1/2}=\sqrt x$ ✓`,
  '12.2d': r`**Metod (F1):** potensform: $x\sqrt x=x^1\cdot x^{1/2}=x^{3/2}$.

$\int x^{3/2}\,dx=\frac{x^{5/2}}{5/2}=\frac25x^{5/2}=\frac25x^2\sqrt x$.`,
  '12.2e': r`**Metod (F1):** potensform: $\frac1{\sqrt x}=x^{-1/2}$.

$\int x^{-1/2}\,dx=\frac{x^{1/2}}{1/2}=2\sqrt x$.`,
  '12.2f': r`**Metod (F1):** potensform: $\frac1{x\sqrt x}=\frac1{x^{3/2}}=x^{-3/2}$.

$\int x^{-3/2}\,dx=\frac{x^{-1/2}}{-1/2}=-2x^{-1/2}=-\frac2{\sqrt x}$.

**Kontroll:** $\left(-2x^{-1/2}\right)'=-2\cdot(-\tfrac12)x^{-3/2}=x^{-3/2}$ ✓`,

  // ---------------- 12.3 inre funktion ax+b ----------------
  '12.3a': r`Standardintegral: $\int\frac1x\,dx=\ln|x|$.`,
  '12.3b': r`${GISS}

**Gissa** $\ln|x-2|$. **Derivera:** $\frac{1}{x-2}\cdot1$ ✓ (inre derivatan är 1). Klart: $\ln|x-2|$.`,
  '12.3c': r`${GISS}

**Gissa** $\ln|1-x|$. **Derivera:** $\frac{1}{1-x}\cdot(-1)=-\frac1{1-x}$ – fel tecken.

**Förbättra:** $-\ln|1-x|$. Kontroll: $-\frac1{1-x}\cdot(-1)=\frac1{1-x}$ ✓`,
  '12.3d': r`Konstanten 2 får flyttas ut (räkneregel): $2\int\frac{dx}{x+1}=2\ln|x+1|$.`,
  '12.3e': r`${GISS}

**Gissa** $\ln|2x+1|$. **Derivera:** $\frac{2}{2x+1}$ – dubbelt så mycket som vi vill.

**Förbättra:** $\frac12\ln|2x+1|$. Kontroll: $\frac12\cdot\frac{2}{2x+1}=\frac1{2x+1}$ ✓`,
  '12.3f': r`${GISS}

**Gissa** $\ln|1-3x|$. **Derivera:** $\frac{-3}{1-3x}$. Vi vill ha $\frac{2}{1-3x}$, alltså ska gissningen multipliceras med $\frac{2}{-3}$.

**Förbättra:** $-\frac23\ln|1-3x|$. Kontroll: $-\frac23\cdot\frac{-3}{1-3x}=\frac2{1-3x}$ ✓`,
  '12.3g': r`Potensform: $\int x^{-2}\,dx=\frac{x^{-1}}{-1}=-\frac1x$.`,
  '12.3h': r`${GISS}

**Gissa** $-(x-2)^{-1}=-\frac1{x-2}$ (som i g). **Derivera:** $-(-1)(x-2)^{-2}\cdot1=\frac1{(x-2)^2}$ ✓`,
  '12.3i': r`${GISS}

**Gissa** $(1-x)^{-1}$. **Derivera:** $-(1-x)^{-2}\cdot(-1)=\frac1{(1-x)^2}$ ✓ – den inre derivatan $-1$ tog ut minustecknet. Svar: $\frac1{1-x}$.`,
  '12.3j': r`Konstanten ut: $2\int(x+1)^{-2}\,dx=2\cdot\left(-\frac1{x+1}\right)=-\frac2{x+1}$. (Inre derivatan är 1.)`,
  '12.3k': r`${GISS}

**Gissa** $-\frac1{2x+1}$. **Derivera:** $(2x+1)^{-2}\cdot2$ – dubbelt för mycket.

**Förbättra:** $-\frac{1}{2(2x+1)}$.`,
  '12.3l': r`${GISS}

**Gissa** $\frac1{1-3x}=(1-3x)^{-1}$. **Derivera:** $-(1-3x)^{-2}\cdot(-3)=\frac{3}{(1-3x)^2}$. Vi vill ha 2 i täljaren: multiplicera med $\frac23$.

Svar: $\frac{2}{3(1-3x)}$.`,

  // ---------------- 12.4 räkneregler ----------------
  '12.4a': r`**Metod (F2): räkneregler** – integrera term för term: $\int(f+g)=\int f+\int g$ och konstanter får flyttas ut.

$\int x^3dx+\int x\,dx-2\int1\,dx=\frac{x^4}4+\frac{x^2}2-2x+C$.`,
  '12.4b': r`**Räkneregler + potensform:** $\frac1x-x^{-2}+x^{-3}$.
- $\int\frac1x\,dx=\ln|x|$
- $\int x^{-2}dx=-x^{-1}$, så $-\int x^{-2}dx=+\frac1x$
- $\int x^{-3}dx=\frac{x^{-2}}{-2}=-\frac1{2x^2}$

Summa: $\ln|x|+\frac1x-\frac1{2x^2}+C$.`,
  '12.4c': r`Potensform: $x^{1/2}+x^{-1/2}$. Termvis: $\frac{x^{3/2}}{3/2}+\frac{x^{1/2}}{1/2}=\frac23x\sqrt x+2\sqrt x+C$.`,
  '12.4d': r`**Dela upp bråket** (räkneregler + potensform):
$$\frac{3+5x^{2/3}}{x^3}=3x^{-3}+5x^{2/3-3}=3x^{-3}+5x^{-7/3}.$$
- $\int3x^{-3}dx=3\cdot\frac{x^{-2}}{-2}=-\frac{3}{2x^2}$
- $\int5x^{-7/3}dx=5\cdot\frac{x^{-4/3}}{-4/3}=-\frac{15}{4}x^{-4/3}$

Svar: $-\frac{3}{2x^2}-\frac{15}4x^{-4/3}+C$.`,
  '12.4e': r`**Kvalificerad gissning:** gissa $-\frac1{1+x}=-(1+x)^{-1}$. Derivera: $(1+x)^{-2}$ ✓. Svar: $-\frac1{1+x}+C$.`,
  '12.4f': r`Konstanten $-1$ ut och standardintegralen: $-\int\frac{dx}{1+x^2}=-\arctan x+C$. (Bokens svar $\operatorname{arccot}x$ skiljer sig bara med en konstant, eftersom $\operatorname{arccot}x=\frac\pi2-\arctan x$.)`,

  // ---------------- 12.5 trig/exp med ax+b ----------------
  '12.5a': r`${GISS}

**Gissa** $-\cos2x$. **Derivera:** $\sin2x\cdot2$ – dubbelt. **Förbättra:** $-\frac12\cos2x$ (jfr F2:s exempel $\int\cos2x\,dx=\frac12\sin2x$).`,
  '12.5b': r`${GISS}

**Gissa** $-\cos\frac x3$. **Derivera:** $\sin\frac x3\cdot\frac13$ – en tredjedel för lite. **Förbättra:** $-3\cos\frac x3$.`,
  '12.5c': r`${GISS}

**Gissa** $-\cos\left(2x+\frac\pi3\right)$. **Derivera:** $2\sin\left(2x+\frac\pi3\right)$. **Förbättra:** $-\frac12\cos\left(2x+\frac\pi3\right)$.`,
  '12.5d': r`${GISS}

**Gissa** $\sin(1-x)$. **Derivera:** $\cos(1-x)\cdot(-1)$ – fel tecken. **Förbättra:** $-\sin(1-x)$.`,
  '12.5e': r`${GISS}

**Gissa** $\sin\frac{2x}3$. **Derivera:** $\frac23\cos\frac{2x}3$. **Förbättra** med faktorn $\frac32$: $\frac32\sin\frac{2x}3$.`,
  '12.5f': r`${GISS}

**Gissa** $3e^{2x}$. **Derivera:** $6e^{2x}$ – dubbelt. **Förbättra:** $\frac32e^{2x}$.`,
  '12.5g': r`${GISS}

**Gissa** $e^{-x}$. **Derivera:** $-e^{-x}$ – fel tecken. **Förbättra:** $-e^{-x}$.`,
  '12.5h': r`${GISS}

**Gissa** $e^{2x+1}$. **Derivera:** $2e^{2x+1}$. **Förbättra:** $\frac12e^{2x+1}$.`,

  '12.6': r`**Metod (F2): gissa → derivera → kontrollera.** Vi deriverar förslaget med kvotregeln:
$$\left(\frac{e^{x^2}}{2x}\right)'=\frac{e^{x^2}\cdot2x\cdot2x-e^{x^2}\cdot2}{(2x)^2}=\frac{e^{x^2}(4x^2-2)}{4x^2}=e^{x^2}\left(1-\frac{1}{2x^2}\right).$$
Det är inte $e^{x^2}$, så **nej**.

**Lärdom:** man får bara korrigera med en *konstant* faktor (som i 12.3). Här är inre derivatan $2x$, som inte är konstant, och man kan inte "dela bort" den. Från F3: $e^{x^2}$ saknar helt primitiv bland de elementära funktionerna.`,

  '12.7': r`**a) Kedjeregeln baklänges (F2).** Integranden är på formen $e^{\text{inre}}\cdot(\text{inre})'$ med inre funktion $x^2$ och dess derivata $2x$. Eftersom $\frac{d}{dx}e^{x^2}=e^{x^2}\cdot2x$ (kedjeregeln) är svaret direkt $e^{x^2}+C$.

**b) Variabelbyte (lärarens uppställning):**
${VB(r`t=x^2`, r`\frac{dt}{dx}=2x\ \Rightarrow\ dt=2x\,dx`)}
$$\int e^{x^2}\cdot2x\,dx=\int e^t\,dt=e^t+C=e^{x^2}+C\quad(\text{byt tillbaka }t=x^2).$$`,

  // ---------------- 12.8 variabelbyte ----------------
  '12.8a': r`**Metod (F2): variabelbyte.** Inre funktion $x^2$, och $x$ (nästan dess derivata $2x$) finns med.
${VB(r`t=x^2`, r`\frac{dt}{dx}=2x\Rightarrow dt=2x\,dx\Rightarrow\frac{dt}2=x\,dx`)}
Byt ut *allt* som har med $x$ att göra:
$$\int e^{x^2}x\,dx=\int e^t\frac{dt}2=\frac12e^t+C=\frac12e^{x^2}+C.$$`,
  '12.8b': r`Som a), med konstanten $\frac13$ utflyttad:
${VB(r`t=x^2`, r`dt=2x\,dx\Rightarrow\frac{dt}2=x\,dx`)}
$$\frac13\int e^{x^2}x\,dx=\frac13\int e^t\frac{dt}2=\frac16e^t+C=\frac16e^{x^2}+C.$$`,
  '12.8c': r`Exakt F2:s första exempel.
${VB(r`t=x^2`, r`dt=2x\,dx`)}
$$\int\cos(x^2)\,2x\,dx=\int\cos t\,dt=\sin t+C=\sin x^2+C.$$`,
  '12.8d': r`Som c), men $2x$ saknas – vi har bara $x$:
${VB(r`t=x^2`, r`dt=2x\,dx\Rightarrow\frac{dt}2=x\,dx`)}
$$\int\cos(x^2)\,x\,dx=\frac12\int\cos t\,dt=\frac12\sin x^2+C.$$`,
  '12.8e': r`Inre funktion $x^3$ med derivata $3x^2$:
${VB(r`t=x^3`, r`dt=3x^2dx\Rightarrow\frac{dt}3=x^2dx`)}
$$\int x^2\cos x^3\,dx=\frac13\int\cos t\,dt=\frac13\sin x^3+C.$$`,
  '12.8f': r`${VB(r`t=x^3`, r`\frac{dt}3=x^2dx`)}
$$\int x^2\sin x^3\,dx=\frac13\int\sin t\,dt=-\frac13\cos t+C=-\frac13\cos x^3+C.$$`,
  '12.8g': r`Inre funktion $\frac1x$, med derivata $-\frac1{x^2}$ – den finns nästan med!
${VB(r`t=\frac1x`, r`\frac{dt}{dx}=-\frac1{x^2}\Rightarrow-dt=\frac{dx}{x^2}`)}
$$\int\cos\left(\frac1x\right)\frac{dx}{x^2}=-\int\cos t\,dt=-\sin t+C=-\sin\frac1x+C.$$`,
  '12.8h': r`Inre funktion $x^2+5$ med derivata $2x$:
${VB(r`t=x^2+5`, r`dt=2x\,dx`)}
$$\int(x^2+5)^8\,2x\,dx=\int t^8dt=\frac{t^9}9+C=\frac19(x^2+5)^9+C.$$
(Att multiplicera ut $(x^2+5)^8$ hade varit hopplöst!)`,

  // ---------------- 12.9 trig med variabelbyte ----------------
  '12.9a': r`**Metod (F4): variabelbyte $t=\sin x$** – derivatan $\cos x$ står som faktor.
${VB(r`t=\sin x`, r`dt=\cos x\,dx`)}
$$\int\sin^2x\cos x\,dx=\int t^2dt=\frac{t^3}3+C=\frac{\sin^3x}3+C.$$
(Exakt exempel a) från F4.)`,
  '12.9b': r`${VB(r`t=\sin x`, r`dt=\cos x\,dx`)}
$$\int\sin^3x\cos x\,dx=\int t^3dt=\frac{t^4}4+C=\frac14\sin^4x+C.$$`,
  '12.9c': r`${VB(r`t=\sin x`, r`dt=\cos x\,dx`)}
$$\int\sin x\cos x\,dx=\int t\,dt=\frac{t^2}2+C=\frac12\sin^2x+C.$$
(Alternativ: formel (1) från F4 ger $\frac12\sin2x$, och primitiven $-\frac14\cos2x$ – skiljer sig bara med en konstant.)`,
  '12.9d': r`${VB(r`t=\sin x`, r`dt=\cos x\,dx`)}
$$\int\frac{\cos x}{\sin^2x}\,dx=\int t^{-2}dt=-t^{-1}+C=-\frac1{\sin x}+C.$$`,
  '12.9e': r`${VB(r`t=\sin x`, r`dt=\cos x\,dx`)}
$$\int\frac{\cos x}{\sin x}\,dx=\int\frac{dt}t=\ln|t|+C=\ln|\sin x|+C.$$`,
  '12.9f': r`Samma integral som e), bara skriven som ett bråk: $\ln|\sin x|+C$.`,
  '12.9g': r`Nu är det $\sin x$ i täljaren, som är (minus) derivatan av $\cos x$:
${VB(r`t=\cos x`, r`dt=-\sin x\,dx\Rightarrow-dt=\sin x\,dx`)}
$$\int\frac{\sin x}{\cos x}\,dx=-\int\frac{dt}t=-\ln|t|+C=-\ln|\cos x|+C.$$`,
  '12.9h': r`$\tan x=\frac{\sin x}{\cos x}$, så det är g) igen – precis som på F4: $\int\tan x\,dx=-\ln|\cos x|+C$.`,

  // ---------------- 12.10 f'/f ----------------
  '12.10a': r`**Metod (F2/F3): variabelbyte där täljaren är nämnarens derivata.**
${VB(r`t=x^2+1`, r`dt=2x\,dx`)}
$$\int\frac{2x\,dx}{x^2+1}=\int\frac{dt}t=\ln|t|+C=\ln(x^2+1)+C.$$
Absolutbeloppet behövs inte eftersom $x^2+1>0$. (Exakt exempel c) från F3.)`,
  '12.10b': r`Samma integral som a): $\ln(x^2+1)+C$.`,
  '12.10c': r`Nu saknas faktorn 2:
${VB(r`t=x^2+1`, r`dt=2x\,dx\Rightarrow\frac{dt}2=x\,dx`)}
$$\int\frac{x\,dx}{x^2+1}=\frac12\int\frac{dt}t=\frac12\ln(x^2+1)+C.$$`,
  '12.10d': r`${VB(r`t=x^3+1`, r`dt=3x^2dx`)}
$$\int\frac{3x^2}{x^3+1}dx=\int\frac{dt}t=\ln|x^3+1|+C.$$
Här behövs absolutbelopp – $x^3+1$ kan vara negativt.`,
  '12.10e': r`${VB(r`t=x^3+1`, r`\frac{dt}3=x^2dx`)}
$$\int\frac{x^2}{x^3+1}dx=\frac13\int\frac{dt}t=\frac13\ln|x^3+1|+C.$$`,
  '12.10f': r`${VB(r`t=e^x+1`, r`dt=e^xdx`)}
$$\int\frac{e^x}{e^x+1}dx=\int\frac{dt}t=\ln(e^x+1)+C.$$`,
  '12.10g': r`Derivatan av nämnaren $e^x+e^{-x}$ är $e^x-e^{-x}$ – täljaren!
${VB(r`t=e^x+e^{-x}`, r`dt=(e^x-e^{-x})\,dx`)}
$$\int\frac{e^x-e^{-x}}{e^x+e^{-x}}dx=\int\frac{dt}t=\ln(e^x+e^{-x})+C.$$`,
  '12.10h': r`**Här är täljaren inte nämnarens derivata** – variabelbyte $t=e^x$ fungerar inte direkt. Dela i stället upp bråket (räkneregler):
$$\frac{e^x+1}{e^x}=1+\frac1{e^x}=1+e^{-x}.$$
$\int(1+e^{-x})dx=x-e^{-x}+C$ (kvalificerad gissning: $(-e^{-x})'=e^{-x}$ ✓).`,

  // ---------------- 12.11 t = ln x ----------------
  '12.11a': r`**Metod (F2):** inre funktion $\ln x$ med derivatan $\frac1x$ – precis som lärarens exempel $\int(\ln x)^4\frac1x\,dx$.
${VB(r`t=\ln x`, r`\frac{dt}{dx}=\frac1x\Rightarrow dt=\frac1x\,dx`)}
$$\int(\ln x)^2\frac1x\,dx=\int t^2dt=\frac{t^3}3+C=\frac13(\ln x)^3+C.$$`,
  '12.11b': r`${VB(r`t=\ln x`, r`dt=\frac1x\,dx`)}
$$\int\ln x\cdot\frac1x\,dx=\int t\,dt=\frac{t^2}2+C=\frac12(\ln x)^2+C.$$`,
  '12.11c': r`Samma som a) (bara skrivet som ett bråk): $\frac13(\ln x)^3+C$.`,
  '12.11d': r`Samma som b): $\frac12(\ln x)^2+C$.`,
  '12.11e': r`${VB(r`t=\ln x`, r`dt=\frac1x\,dx`)}
$$\int\sin(\ln x)\frac1x\,dx=\int\sin t\,dt=-\cos t+C=-\cos(\ln x)+C.$$`,
  '12.11f': r`${VB(r`t=\ln x`, r`dt=\frac1x\,dx`)}
$$\int\frac1{\ln x}\cdot\frac1x\,dx=\int\frac{dt}t=\ln|t|+C=\ln|\ln x|+C.$$`,
  '12.11g': r`Samma som f): $\ln|\ln x|+C$.`,
  '12.11h': r`Samma som e): $-\cos(\ln x)+C$.`,

  '12.12a': r`**1. Hitta alla primitiver (variabelbyte, F2).**
${VB(r`t=x^2`, r`dt=2x\,dx\Rightarrow\frac{dt}2=x\,dx`)}
$$f(x)=\int x\sin x^2\,dx=\frac12\int\sin t\,dt=-\frac12\cos t+C=-\frac12\cos x^2+C.$$
**2. Bestäm $C$ med villkoret.** $f(0)=-\frac12\cos0+C=-\frac12+C=0\Rightarrow C=\frac12$.

Svar: $f(x)=\frac12(1-\cos x^2)$.`,
  '12.12b': r`**1. Alla primitiver.** Inre funktion $\arctan x$ med derivatan $\frac1{1+x^2}$:
${VB(r`t=\arctan x`, r`dt=\frac{dx}{1+x^2}`)}
$$f(x)=\int\frac{1}{\arctan x}\cdot\frac{dx}{1+x^2}=\int\frac{dt}t=\ln|\arctan x|+C.$$
**2. Villkoret.** Då $x\to\infty$ går $\arctan x\to\frac\pi2$, så $f(x)\to\ln\frac\pi2+C$. Kravet är att detta ska vara 0: $C=-\ln\frac\pi2$.`,
  '12.13': r`**Metod (F2): variabelbyte** enligt anvisningen.
${VB(r`t=e^x`, r`dt=e^xdx`)}
$$\int e^x(e^x+5)^8dx=\int(t+5)^8dt.$$
Kvalificerad gissning: $\frac{(t+5)^9}9$ (inre derivatan är 1). Byt tillbaka: $\frac19(e^x+5)^9+C$.`,
  '12.14a': r`${VB(r`t=\ln x`, r`dt=\frac1x\,dx`)}
$$\int\frac{dx}{x\ln x}=\int\frac1t\,dt=\ln|t|+C=\ln|\ln x|+C.$$`,
  '12.14b': r`${VB(r`t=\cos x`, r`dt=-\sin x\,dx\Rightarrow-dt=\sin x\,dx`)}
$$\int\cos^{-4/3}x\,\sin x\,dx=-\int t^{-4/3}dt=-\frac{t^{-1/3}}{-1/3}+C=3t^{-1/3}+C=3\cos^{-1/3}x+C.$$`,
  '12.15a': r`**Variabelbyte (F2)** enligt bokens tips:
${VB(r`t=1+x^2`, r`dt=2x\,dx\Rightarrow\frac{dt}2=x\,dx`)}
$$\int x(1+x^2)^5dx=\frac12\int t^5dt=\frac{t^6}{12}+C=\frac1{12}(1+x^2)^6+C.$$`,
  '12.15b': r`Inre funktion $\sqrt x$, derivata $\frac1{2\sqrt x}$:
${VB(r`t=\sqrt x`, r`dt=\frac{dx}{2\sqrt x}\Rightarrow2\,dt=\frac{dx}{\sqrt x}`)}
$$\int\sin\sqrt x\,\frac{dx}{\sqrt x}=2\int\sin t\,dt=-2\cos t+C=-2\cos\sqrt x+C.$$`,
  '12.15c': r`${VB(r`t=7x^2+5`, r`dt=14x\,dx\Rightarrow\frac{dt}{14}=x\,dx`)}
$$\int\sqrt{7x^2+5}\,x\,dx=\frac1{14}\int t^{1/2}dt=\frac1{14}\cdot\frac{t^{3/2}}{3/2}+C=\frac1{21}(7x^2+5)^{3/2}+C.$$`,
  '12.15d': r`${VB(r`t=x^2+5`, r`\frac{dt}2=x\,dx`)}
$$\int\frac{x\,dx}{\sqrt{x^2+5}}=\frac12\int t^{-1/2}dt=\frac12\cdot2t^{1/2}+C=\sqrt{x^2+5}+C.$$`,
  '12.15e': r`Ja. Alla fyra är av typen $f(g(x))g'(x)$ (så när som på en konstant), så man kan skriva primitiven direkt med en **kvalificerad gissning** och kontrollera genom att derivera – det är kedjeregeln baklänges (F2).`,
  '12.16a': r`**Variabelbyte utan synlig inre derivata (F2, som $\int e^{2\sqrt x}dx$).** Bokens tips: $t=e^x$.
${VB(r`t=e^x`, r`\frac{dt}{dx}=e^x\Rightarrow dx=\frac{dt}{e^x}=\frac{dt}t`)}
Skriv om integranden: $\frac{1}{e^x+e^{-x}}=\frac1{t+\frac1t}=\frac{t}{t^2+1}$. Då blir
$$\int\frac{t}{t^2+1}\cdot\frac{dt}t=\int\frac{dt}{t^2+1}=\arctan t+C=\arctan e^x+C.$$`,
  '12.16b': r`Bokens tips: $t=\sqrt{x+1}$, alltså $x=t^2-1$.
${VB(r`t=\sqrt{x+1}`, r`\frac{dt}{dx}=\frac1{2\sqrt{x+1}}\Rightarrow dx=2\sqrt{x+1}\,dt=2t\,dt`)}
Byt ut *allt*: $x=t^2-1$, $\sqrt{x+1}=t$:
$$\int x\sqrt{x+1}\,dx=\int(t^2-1)\cdot t\cdot2t\,dt=\int(2t^4-2t^2)dt=\frac25t^5-\frac23t^3+C.$$
Byt tillbaka: $\frac25(x+1)^{5/2}-\frac23(x+1)^{3/2}+C$. Bryt ut $(x+1)^{3/2}$: $(x+1)^{3/2}\cdot\frac{6(x+1)-10}{15}=\frac1{15}(x+1)^{3/2}(6x-4)$.`,
  '12.16c': r`Bokens tips: $t=\sqrt{2x+5}$, alltså $x=\frac{t^2-5}2$.
${VB(r`t=\sqrt{2x+5}`, r`\frac{dt}{dx}=\frac{2}{2\sqrt{2x+5}}=\frac1t\Rightarrow dx=t\,dt`)}
$$\int\frac{x\,dx}{\sqrt{2x+5}}=\int\frac{(t^2-5)/2}{t}\cdot t\,dt=\frac12\int(t^2-5)dt=\frac{t^3}6-\frac52t+C.$$
Förenkla: $\frac t6(t^2-15)$ och $t^2=2x+5$, så $t^2-15=2x-10$. Svar: $\frac t6(2x-10)=\frac13(x-5)\sqrt{2x+5}+C$.`,
  '12.16d': r`Bokens tips: $t=x^{1/3}$, alltså $x=t^3$.
${VB(r`t=x^{1/3},\ x=t^3`, r`dx=3t^2dt`)}
$$\int\frac{dx}{x+x^{1/3}}=\int\frac{3t^2\,dt}{t^3+t}=\int\frac{3t}{t^2+1}dt.$$
Nu är täljaren (konstant gånger) nämnarens derivata, som i 12.10c: $\frac32\ln(t^2+1)+C=\frac32\ln(1+x^{2/3})+C$.`,

  // ---------------- 12.17 partialintegration ----------------
  '12.17a': r`**Metod (F2): partialintegration** ${PI_FORMEL}.

**Val:** normalt deriveras polynomet, men $\ln x$ saknar enkel primitiv och har en enkel derivata – så **$\ln x$ deriveras** och $x^2$ integreras (jfr $\int\ln x\,dx$ på F2).
${PI(r`x^2`, r`\frac{x^3}3`, r`\ln x`, r`\frac1x`)}
$$\int x^2\ln x\,dx=\frac{x^3}3\ln x-\int\frac{x^3}3\cdot\frac1x\,dx=\frac{x^3}3\ln x-\frac13\int x^2dx=\frac{x^3}3\ln x-\frac{x^3}9+C.$$
**Kontroll:** $x^2\ln x+\frac{x^3}3\cdot\frac1x-\frac{x^2}3=x^2\ln x$ ✓`,
  '12.17b': r`**Metod (F2): partialintegration** – "döda" polynomet $x$ med derivering, $e^{-x}$ är trevlig att integrera.
${PI(r`e^{-x}`, r`-e^{-x}`, r`x`, r`1`)}
$$\int xe^{-x}dx=-xe^{-x}-\int(-e^{-x})\cdot1\,dx=-xe^{-x}+\int e^{-x}dx=-xe^{-x}-e^{-x}+C=-(x+1)e^{-x}+C.$$
**Kontroll:** $(-(x+1)e^{-x})'=-e^{-x}+(x+1)e^{-x}=xe^{-x}$ ✓`,
  '12.17c': r`**Partialintegration**, och som i a) deriveras $\ln x$:
${PI(r`\sqrt x=x^{1/2}`, r`\frac23x^{3/2}`, r`\ln x`, r`\frac1x`)}
$$\int\sqrt x\ln x\,dx=\frac23x^{3/2}\ln x-\int\frac23x^{3/2}\cdot\frac1x\,dx=\frac23x^{3/2}\ln x-\frac23\int x^{1/2}dx$$
$$=\frac23x^{3/2}\ln x-\frac23\cdot\frac23x^{3/2}+C=\frac23x^{3/2}\ln x-\frac49x^{3/2}+C.$$`,
  '12.17d': r`**Trick från F2: skriv $\arctan x=1\cdot\arctan x$** (precis som $\int\ln x\,dx$). Integrera 1, derivera $\arctan x$.
${PI(r`1`, r`x`, r`\arctan x`, r`\frac1{1+x^2}`)}
$$\int\arctan x\,dx=x\arctan x-\int\frac{x}{1+x^2}dx.$$
Den sista integralen med variabelbyte (som 12.10c):
${VB(r`t=1+x^2`, r`\frac{dt}2=x\,dx`)}
$\int\frac{x\,dx}{1+x^2}=\frac12\ln(1+x^2)$. Svar: $x\arctan x-\frac12\ln(1+x^2)+C$.`,
  '12.17e': r`**Partialintegration**, där $\arctan x$ deriveras:
${PI(r`x`, r`\frac{x^2}2`, r`\arctan x`, r`\frac1{1+x^2}`)}
$$\int x\arctan x\,dx=\frac{x^2}2\arctan x-\frac12\int\frac{x^2}{1+x^2}dx.$$
**Grad täljare = grad nämnare → polynomdivision först (F3, exempel d):**
$$\frac{x^2}{x^2+1}=\frac{x^2+1-1}{x^2+1}=1-\frac1{x^2+1}\ \Rightarrow\ \int\frac{x^2}{1+x^2}dx=x-\arctan x.$$
Totalt: $\frac{x^2}2\arctan x-\frac x2+\frac12\arctan x+C=\frac12(x^2+1)\arctan x-\frac x2+C$.`,
  '12.17f': r`**Trick från F2: $1\cdot\ln(x+1)$.**
${PI(r`1`, r`x`, r`\ln(x+1)`, r`\frac1{x+1}`)}
$$\int\ln(x+1)\,dx=x\ln(x+1)-\int\frac{x}{x+1}dx.$$
**Kort division** ("lägg till och dra ifrån", F3): $\frac{x}{x+1}=\frac{x+1-1}{x+1}=1-\frac1{x+1}$, så $\int\frac x{x+1}dx=x-\ln(x+1)$.

Totalt: $x\ln(x+1)-x+\ln(x+1)+C=(x+1)\ln(x+1)-x+C$.`,
  '12.17g': r`**Trick från F2: $1\cdot(\ln x)^2$.** Derivatan av $(\ln x)^2$ fås med kedjeregeln: $2\ln x\cdot\frac1x$.
${PI(r`1`, r`x`, r`(\ln x)^2`, r`\frac{2\ln x}x`)}
$$\int(\ln x)^2dx=x(\ln x)^2-\int x\cdot\frac{2\ln x}{x}dx=x(\ln x)^2-2\int\ln x\,dx.$$
Från F2: $\int\ln x\,dx=x\ln x-x$. Svar: $x(\ln x)^2-2x\ln x+2x+C$.`,
  '12.17h': r`**Partialintegration två gånger** (som $\int x^2\cos x\,dx$ på F2). Döda $x^2$ med derivering.
${PI(r`\sin x`, r`-\cos x`, r`x^2`, r`2x`)}
$$\int x^2\sin x\,dx=-x^2\cos x+2\int x\cos x\,dx.$$
En gång till:
${PI(r`\cos x`, r`\sin x`, r`x`, r`1`)}
$\int x\cos x\,dx=x\sin x-\int\sin x\,dx=x\sin x+\cos x$.

Totalt: $-x^2\cos x+2x\sin x+2\cos x+C=(2-x^2)\cos x+2x\sin x+C$.`,
  '12.18a': r`**Partialintegration två gånger + "det som vi började med" (F2, $\int e^x\cos x\,dx$).** Integrera $e^x$ båda gångerna – det viktiga är att vara **konsekvent**.
${PI(r`e^x`, r`e^x`, r`\sin x`, r`\cos x`)}
$$I=\int e^x\sin x\,dx=e^x\sin x-\int e^x\cos x\,dx.$$
${PI(r`e^x`, r`e^x`, r`\cos x`, r`-\sin x`)}
$$\int e^x\cos x\,dx=e^x\cos x+\int e^x\sin x\,dx=e^x\cos x+I.$$
Alltså $I=e^x\sin x-e^x\cos x-I$. Flytta över: $2I=e^x(\sin x-\cos x)+C_1$, så $I=\frac12e^x(\sin x-\cos x)+C$.`,
  '12.18b': r`**Samma metod som a).** Integrera $e^{2x}$ båda gångerna.
${PI(r`e^{2x}`, r`\frac12e^{2x}`, r`\sin3x`, r`3\cos3x`)}
$$I=\frac12e^{2x}\sin3x-\frac32\int e^{2x}\cos3x\,dx.$$
${PI(r`e^{2x}`, r`\frac12e^{2x}`, r`\cos3x`, r`-3\sin3x`)}
$$\int e^{2x}\cos3x\,dx=\frac12e^{2x}\cos3x+\frac32I.$$
Insatt: $I=\frac12e^{2x}\sin3x-\frac34e^{2x}\cos3x-\frac94I$, så $\frac{13}4I=\frac{e^{2x}}4(2\sin3x-3\cos3x)$ och
$$I=\frac{1}{13}e^{2x}(2\sin3x-3\cos3x)+C.$$`,
  '12.19': r`**Partialintegration** – derivera $x$, integrera roten (med kvalificerad gissning).

**12.16 b):**
${PI(r`(x+1)^{1/2}`, r`\frac23(x+1)^{3/2}`, r`x`, r`1`)}
$$\int x\sqrt{x+1}\,dx=\frac23x(x+1)^{3/2}-\frac23\int(x+1)^{3/2}dx=\frac23x(x+1)^{3/2}-\frac4{15}(x+1)^{5/2}+C.$$
**12.16 c):** Gissa $\sqrt{2x+5}$ som primitiv till $\frac1{\sqrt{2x+5}}$: derivatan är $\frac{2}{2\sqrt{2x+5}}$ ✓.
${PI(r`(2x+5)^{-1/2}`, r`(2x+5)^{1/2}`, r`x`, r`1`)}
$$\int\frac{x\,dx}{\sqrt{2x+5}}=x\sqrt{2x+5}-\int\sqrt{2x+5}\,dx=x\sqrt{2x+5}-\frac13(2x+5)^{3/2}+C.$$
Svaren är samma som i 12.16 (förenkla så ser du det).`,
  '12.20': r`**Exakt F2:s exempel med $e^{2\sqrt x}$:** variabelbyte och sedan partialintegration.
${VB(r`t=\sqrt x`, r`\frac{dt}{dx}=\frac1{2\sqrt x}\Rightarrow dx=2\sqrt x\,dt=2t\,dt`)}
$$\int e^{\sqrt x}dx=\int e^t\cdot2t\,dt=2\int te^tdt.$$
${PI(r`e^t`, r`e^t`, r`t`, r`1`, 't')}
$2\int te^tdt=2\left(te^t-\int e^tdt\right)=2(te^t-e^t)+C$. Byt tillbaka: $2(\sqrt xe^{\sqrt x}-e^{\sqrt x})+C$.`,
  '12.21a': r`**Variabelbyte, sedan partialintegration** (bokens tips $t=x^2$). Skriv $x^3dx=x^2\cdot x\,dx$:
${VB(r`t=x^2`, r`dt=2x\,dx\Rightarrow x\,dx=\frac{dt}2`)}
$$\int x^3\sin x^2dx=\int x^2\sin(x^2)\,x\,dx=\frac12\int t\sin t\,dt.$$
${PI(r`\sin t`, r`-\cos t`, r`t`, r`1`, 't')}
$\int t\sin t\,dt=-t\cos t+\int\cos t\,dt=-t\cos t+\sin t$.

Svar: $\frac12(\sin x^2-x^2\cos x^2)+C$.`,
  '12.21b': r`**Variabelbyte** (bokens tips $t=1+e^x$):
${VB(r`t=1+e^x`, r`dt=e^xdx`)}
$$\int e^x\ln(1+e^x)dx=\int\ln t\,dt=t\ln t-t+C\quad(\text{F2: }\int\ln t\,dt).$$
Byt tillbaka: $(1+e^x)\ln(1+e^x)-(1+e^x)+C$. Konstanten $-1$ slås ihop med $C$: $(1+e^x)\ln(1+e^x)-e^x+C$.`,

  // ---------------- 12.22–12.31 rationella funktioner ----------------
  '12.22a': r`**Steg 1 (F4): grad täljare (2) ≥ grad nämnare (1) → polynomdivision.**

Kort division: $x^2+4=(x^2-1)+5=(x-1)(x+1)+5$, alltså
$$\frac{x^2+4}{x-1}=x+1+\frac5{x-1}.$$
**Steg 4: integrera:** $\frac{x^2}2+x+5\ln|x-1|+C$.`,
  '12.22b': r`**Steg 1 (F4): polynomdivision med liggande stolen.**
- $x^2\cdot(x+3)=x^3+3x^2$, rest $2x^2+2x-1$
- $2x\cdot(x+3)=2x^2+6x$, rest $-4x-1$
- $-4\cdot(x+3)=-4x-12$, rest $11$

Alltså $\frac{x^3+5x^2+2x-1}{x+3}=x^2+2x-4+\frac{11}{x+3}$.

**Integrera:** $\frac{x^3}3+x^2-4x+11\ln|x+3|+C$.`,
  '12.23a': r`**Steg 1:** grad 0 < 2 – ingen division. **Steg 2: faktorisera:** $x^2-4=(x-2)(x+2)$.

**Steg 3: ansats** (lärarens lista, olika rötter): $\frac1{(x-2)(x+2)}=\frac A{x-2}+\frac B{x+2}$. Multiplicera med nämnaren: $1=A(x+2)+B(x-2)$.

**Handpåläggning:** $x=2$: $1=4A\Rightarrow A=\frac14$. $x=-2$: $1=-4B\Rightarrow B=-\frac14$.

**Kontroll:** $\frac14\cdot\frac{(x+2)-(x-2)}{(x-2)(x+2)}=\frac14\cdot\frac{4}{x^2-4}$ ✓

**Steg 4:** $\frac14\ln|x-2|-\frac14\ln|x+2|+C=\frac14\ln\left|\frac{x-2}{x+2}\right|+C$.`,
  '12.23b': r`**Steg 2: faktorisera** genom att lösa $x^2-4x-5=0$: $x=2\pm\sqrt{4+5}=2\pm3$, alltså $(x-5)(x+1)$.

**Steg 3: ansats:** $\frac{x+13}{(x-5)(x+1)}=\frac A{x-5}+\frac B{x+1}\Rightarrow x+13=A(x+1)+B(x-5)$.

**Handpåläggning:** $x=5$: $18=6A\Rightarrow A=3$. $x=-1$: $12=-6B\Rightarrow B=-2$.

**Steg 4:** $3\ln|x-5|-2\ln|x+1|+C$.`,
  '12.23c': r`**Steg 2: faktorisera** $q(x)=x^3-6x^2+11x-6$. Testa små heltal: $q(1)=1-6+11-6=0$, så $(x-1)$ är en faktor. Polynomdivision ger $q(x)=(x-1)(x^2-5x+6)=(x-1)(x-2)(x-3)$.

**Steg 3: ansats** (tre olika rötter): $\frac A{x-1}+\frac B{x-2}+\frac C{x-3}$, alltså
$$5x^2-7x+13=A(x-2)(x-3)+B(x-1)(x-3)+C(x-1)(x-2).$$
**Handpåläggning:**
- $x=1$: $11=A(-1)(-2)=2A\Rightarrow A=\frac{11}2$
- $x=2$: $19=B(1)(-1)\Rightarrow B=-19$
- $x=3$: $37=C(2)(1)\Rightarrow C=\frac{37}2$

**Steg 4:** $\frac{11}2\ln|x-1|-19\ln|x-2|+\frac{37}2\ln|x-3|+C$.`,
  '12.24a': r`**Dubbelrot → rätt ansats** (F3: annars saknas lösning!):
$$\frac1{x(x-3)^2}=\frac Ax+\frac B{x-3}+\frac C{(x-3)^2}\ \Rightarrow\ 1=A(x-3)^2+Bx(x-3)+Cx.$$
**Handpåläggning:** $x=0$: $1=9A\Rightarrow A=\frac19$. $x=3$: $1=3C\Rightarrow C=\frac13$.

**$B$ med identifiering** av $x^2$-koefficienten: VL har 0, HL har $A+B$, så $B=-\frac19$.

**Integrera** ($\int\frac{dx}{(x-3)^2}=-\frac1{x-3}$, som på F3):
$$\frac19\ln|x|-\frac19\ln|x-3|-\frac{1}{3(x-3)}+C=\frac19\left(\ln\left|\frac x{x-3}\right|-\frac3{x-3}\right)+C.$$`,
  '12.24b': r`**Dubbelrot** – samma typ som F3:s exempel $\frac{2x}{(x-1)^2}$:
$$\frac{3x+11}{(x+2)^2}=\frac A{x+2}+\frac B{(x+2)^2}\ \Rightarrow\ 3x+11=A(x+2)+B.$$
$x=-2$: $5=B$. Sätt sedan in t.ex. $x=0$: $11=2A+5\Rightarrow A=3$.

**Integrera:** $3\ln|x+2|-\frac5{x+2}+C$.`,
  '12.24c': r`**Generaliserad ansats** (boken s. 291): varje potens av en upprepad faktor får en egen term:
$$\frac1{x^2(x-1)^3}=\frac Ax+\frac B{x^2}+\frac C{x-1}+\frac D{(x-1)^2}+\frac E{(x-1)^3}.$$
Multiplicera med nämnaren:
$$1=Ax(x-1)^3+B(x-1)^3+Cx^2(x-1)^2+Dx^2(x-1)+Ex^2.$$
**Handpåläggning:** $x=0$: $1=-B\Rightarrow B=-1$. $x=1$: $E=1$.

**Identifiera koefficienter:**
- $x$-termen: $-A+3B=0\Rightarrow A=-3$
- $x^4$-termen: $A+C=0\Rightarrow C=3$
- $x^3$-termen: $-3A+B-2C+D=0\Rightarrow 9-1-6+D=0\Rightarrow D=-2$

**Integrera termvis:** $-3\ln|x|+\frac1x+3\ln|x-1|+\frac2{x-1}-\frac1{2(x-1)^2}+C$.`,
  '12.24d': r`**Steg 2: faktorisera:** $x^3+2x^2+x=x(x^2+2x+1)=x(x+1)^2$ – en dubbelrot.

**Ansats:** $\frac Ax+\frac B{x+1}+\frac C{(x+1)^2}$, alltså $1=A(x+1)^2+Bx(x+1)+Cx$.

**Handpåläggning:** $x=0$: $A=1$. $x=-1$: $1=-C\Rightarrow C=-1$. **Identifiera** $x^2$: $0=A+B\Rightarrow B=-1$.

**Integrera:** $\ln|x|-\ln|x+1|+\frac1{x+1}+C$.`,
  '12.25a': r`Standardintegral: $\arctan x+C$.`,
  '12.25b': r`**Variabelbyte** så att nämnaren blir $t^2+1$:
${VB(r`t=2x`, r`dt=2\,dx\Rightarrow dx=\frac{dt}2`)}
$$\int\frac{dx}{(2x)^2+1}=\frac12\int\frac{dt}{t^2+1}=\frac12\arctan2x+C.$$`,
  '12.25c': r`${VB(r`t=\frac x3`, r`dt=\frac{dx}3\Rightarrow dx=3\,dt`)}
$$\int\frac{dx}{(x/3)^2+1}=3\int\frac{dt}{t^2+1}=3\arctan\frac x3+C.$$`,
  '12.26a': r`$4x^2+1=(2x)^2+1$ – samma som 12.25 b): $\frac12\arctan2x+C$.`,
  '12.26b': r`$\frac{x^2}9+1=\left(\frac x3\right)^2+1$ – samma som 12.25 c): $3\arctan\frac x3+C$.`,
  '12.26c': r`Bryt ut $\frac14$ ur nämnaren: $x^2+\frac14=\frac14(4x^2+1)$, så
$$\int\frac{dx}{x^2+\frac14}=4\int\frac{dx}{(2x)^2+1}=4\cdot\frac12\arctan2x=2\arctan2x+C.$$`,
  '12.26d': r`Bryt ut 9: $x^2+9=9\left(\left(\frac x3\right)^2+1\right)$, så
$$\int\frac{dx}{x^2+9}=\frac19\int\frac{dx}{(x/3)^2+1}=\frac19\cdot3\arctan\frac x3=\frac13\arctan\frac x3+C.$$`,
  '12.27a': r`Nämnaren saknar reella nollställen → **kvadratkomplettera**: $x^2-2x+2=(x-1)^2+1$.
${VB(r`t=x-1`, r`dt=dx`)}
$$\int\frac{dx}{(x-1)^2+1}=\int\frac{dt}{t^2+1}=\arctan(x-1)+C.$$`,
  '12.27b': r`Kvadratkomplettera: $x^2+4x+5=(x+2)^2+1$. Med $t=x+2$: $\arctan(x+2)+C$.`,
  '12.27c': r`Kvadratkomplettera: $x^2-2x+5=(x-1)^2+4=4\left(\left(\frac{x-1}2\right)^2+1\right)$.
${VB(r`t=\frac{x-1}2`, r`dx=2\,dt`)}
$$\int\frac{dx}{x^2-2x+5}=\frac14\int\frac{2\,dt}{t^2+1}=\frac12\arctan\frac{x-1}2+C.$$`,
  '12.27d': r`Kvadratkomplettera: $x^2+4x+6=(x+2)^2+2=2\left(\left(\frac{x+2}{\sqrt2}\right)^2+1\right)$.
${VB(r`t=\frac{x+2}{\sqrt2}`, r`dx=\sqrt2\,dt`)}
$$\frac12\int\frac{\sqrt2\,dt}{t^2+1}=\frac1{\sqrt2}\arctan\frac{x+2}{\sqrt2}+C.$$`,
  '12.28a': r`**Metod (F4, $\frac{Bx+C}{x^2+\ldots}$-termer):** skriv täljaren som (konstant)·(nämnarens derivata) + rest. Nämnarens derivata: $2x-2$.
$$x+1=\tfrac12(2x-2)+2.$$
- $\frac12\int\frac{2x-2}{x^2-2x+2}dx=\frac12\ln(x^2-2x+2)$ (täljaren är nämnarens derivata, som 12.10)
- $2\int\frac{dx}{(x-1)^2+1}=2\arctan(x-1)$ (från 12.27 a)

Svar: $\frac12\ln(x^2-2x+2)+2\arctan(x-1)+C$.`,
  '12.28b': r`Nämnarens derivata $2x+4$: $x+1=\frac12(2x+4)-1$.

$\frac12\ln(x^2+4x+5)-\int\frac{dx}{(x+2)^2+1}=\frac12\ln(x^2+4x+5)-\arctan(x+2)+C$.`,
  '12.28c': r`Nämnarens derivata $2x-2$: $x+1=\frac12(2x-2)+2$.

$\frac12\ln(x^2-2x+5)+2\cdot\frac12\arctan\frac{x-1}2=\frac12\ln(x^2-2x+5)+\arctan\frac{x-1}2+C$ (12.27 c).`,
  '12.28d': r`Nämnarens derivata $2x+4$: $x+1=\frac12(2x+4)-1$.

$\frac12\ln(x^2+4x+6)-\frac1{\sqrt2}\arctan\frac{x+2}{\sqrt2}+C$ (12.27 d).`,
  '12.29': r`**Alla fyra stegen (F4).**

**Steg 1: polynomdivision** (grad 5 ≥ 4): $x\cdot(x^4-x^3-x+1)=x^5-x^4-x^2+x$, rest $x+1$. Alltså integranden $=x+\frac{x+1}{x^4-x^3-x+1}$.

**Steg 2: faktorisera:** $x^4-x^3-x+1=x^3(x-1)-(x-1)=(x-1)(x^3-1)=(x-1)^2(x^2+x+1)$. ($x^2+x+1$ saknar reella nollställen.)

**Steg 3: ansats** $\frac A{x-1}+\frac B{(x-1)^2}+\frac{Cx+D}{x^2+x+1}$:
$$x+1=A(x^3-1)+B(x^2+x+1)+(Cx+D)(x-1)^2.$$
Handpåläggning $x=1$: $2=3B\Rightarrow B=\frac23$. Identifiera: $x^3$: $A+C=0$; $x^2$: $B-2C+D=0$; konstant: $-A+B+D=1$. Det ger $A=-\frac13$, $C=\frac13$, $D=0$.

**Steg 4: integrera.**
- $\int x\,dx=\frac{x^2}2$, $\;-\frac13\ln|x-1|$, $\;\int\frac{2/3}{(x-1)^2}=-\frac2{3(x-1)}$
- $\frac13\int\frac{x}{x^2+x+1}dx$: $x=\frac12(2x+1)-\frac12$ ger $\frac16\ln(x^2+x+1)-\frac16\int\frac{dx}{(x+\frac12)^2+\frac34}=\frac16\ln(x^2+x+1)-\frac1{3\sqrt3}\arctan\frac{2x+1}{\sqrt3}$`,
  '12.30a': r`Bokens tips ger ansatsen (lärarens lista, F3):
$$\frac{2}{(x^2+1)(x-1)}=\frac A{x-1}+\frac{Bx+C}{x^2+1}\ \Rightarrow\ 2=A(x^2+1)+(Bx+C)(x-1).$$
**Handpåläggning:** $x=1$: $2=2A\Rightarrow A=1$.

**Identifiera:** $x^2$: $0=A+B\Rightarrow B=-1$. Konstant: $2=A-C\Rightarrow C=-1$.

**Integrera:** $\int\left(\frac1{x-1}-\frac{x}{x^2+1}-\frac1{x^2+1}\right)dx=\ln|x-1|-\frac12\ln(x^2+1)-\arctan x+C$.`,
  '12.30b': r`**Faktorisera:** $x^4-1=(x^2-1)(x^2+1)=(x-1)(x+1)(x^2+1)$.

**Ansats:** $\frac A{x-1}+\frac B{x+1}+\frac{Cx+D}{x^2+1}$, så $1=A(x+1)(x^2+1)+B(x-1)(x^2+1)+(Cx+D)(x^2-1)$.

**Handpåläggning:** $x=1$: $1=4A\Rightarrow A=\frac14$. $x=-1$: $1=-4B\Rightarrow B=-\frac14$.

**Identifiera:** $x^3$: $A+B+C=0\Rightarrow C=0$. Konstant: $A-B-D=1\Rightarrow D=-\frac12$.

**Integrera:** $\frac14\ln|x-1|-\frac14\ln|x+1|-\frac12\arctan x+C$.`,
  '12.30c': r`**Ansats** (dubbelrot + kvadratisk faktor): $\frac A{x+1}+\frac B{(x+1)^2}+\frac{Cx+D}{x^2+4}$, alltså
$$5x^3+12x^2+12x+10=A(x+1)(x^2+4)+B(x^2+4)+(Cx+D)(x+1)^2.$$
**Handpåläggning** $x=-1$: $-5+12-12+10=5=5B\Rightarrow B=1$.

**Identifiera** (med $B=1$): $x^3$: $A+C=5$; konstant: $4A+4+D=10$; $x^2$: $A+1+2C+D=12$. Det ger $A=1$, $C=4$, $D=2$.

**Integrera:**
- $\int\frac{dx}{x+1}=\ln|x+1|$, $\;\int\frac{dx}{(x+1)^2}=-\frac1{x+1}$
- $\int\frac{4x}{x^2+4}dx=2\ln(x^2+4)$, $\;\int\frac{2}{x^2+4}dx=\arctan\frac x2$

Svar: $2\ln(x^2+4)+\arctan\frac x2+\ln|x+1|-\frac1{x+1}+C$.`,
  '12.31a': r`**Steg 1: liggande stolen** ($x^5+1$ delat med $x^4+x^3+x^2$): $x\cdot(\ldots)=x^5+x^4+x^3$, rest $-x^4-x^3+1$; $-1\cdot(\ldots)$, rest $x^2+1$. Alltså $x-1+\frac{x^2+1}{x^2(x^2+x+1)}$.

**Ansats:** $\frac Ax+\frac B{x^2}+\frac{Cx+D}{x^2+x+1}$: $x^2+1=Ax(x^2+x+1)+B(x^2+x+1)+(Cx+D)x^2$.

$x=0$: $B=1$. Identifiera $x$: $A+B=0\Rightarrow A=-1$; $x^2$: $A+B+D=1\Rightarrow D=1$; $x^3$: $A+C=0\Rightarrow C=1$.

**Integrera:** $\frac{x^2}2-x-\ln|x|-\frac1x+\int\frac{x+1}{x^2+x+1}dx$, där $x+1=\frac12(2x+1)+\frac12$ ger $\frac12\ln(x^2+x+1)+\frac1{\sqrt3}\arctan\frac{2x+1}{\sqrt3}$.`,
  '12.31b': r`**Grad lika → kort division:** $\frac{x^2+8x+4}{x^2+4x+8}=\frac{(x^2+4x+8)+4x-4}{x^2+4x+8}=1+\frac{4x-4}{x^2+4x+8}$.

Nämnaren saknar reella nollställen ($(x+2)^2+4$). Täljaren: $4x-4=2(2x+4)-12$.
- $2\int\frac{2x+4}{x^2+4x+8}dx=2\ln(x^2+4x+8)$
- $-12\int\frac{dx}{(x+2)^2+4}=-12\cdot\frac12\arctan\frac{x+2}2=-6\arctan\frac{x+2}2$

Svar: $x+2\ln(x^2+4x+8)-6\arctan\frac{x+2}2+C$.`,
  '12.31c': r`**Steg 1: polynomdivision** ($x^3+4$ delat med $x^2+x$): $x\cdot(x^2+x)=x^3+x^2$, rest $-x^2+4$; $-1\cdot(x^2+x)$, rest $x+4$. Alltså $x-1+\frac{x+4}{x(x+1)}$.

**Handpåläggning:** $x+4=A(x+1)+Bx$: $x=0$: $A=4$; $x=-1$: $3=-B\Rightarrow B=-3$.

**Integrera:** $\frac{x^2}2-x+4\ln|x|-3\ln|x+1|+C$.`,

  // ---------------- 12.34–12.35 trigonometriska ----------------
  '12.34a': r`**Variabelbyte (F4)** enligt tipset – $\sin x$ är (minus) derivatan av $\cos x$:
${VB(r`t=\cos x`, r`dt=-\sin x\,dx`)}
$$\int\frac{\sin x\,dx}{\sqrt{\cos^2x+2\cos x+3}}=-\int\frac{dt}{\sqrt{t^2+2t+3}}.$$
Kvadratkomplettera: $t^2+2t+3=(t+1)^2+2$. Med $u=t+1$ och **formelbladet** ($a=2$):
$$-\int\frac{du}{\sqrt{u^2+2}}=-\ln\left|u+\sqrt{u^2+2}\right|=-\ln\left(\cos x+1+\sqrt{\cos^2x+2\cos x+3}\right)+C.$$`,
  '12.34b': r`**Formel (1) från F4:** $\sin2x=2\sin x\cos x$, så $\frac{\sin2x}{\cos^3x}=\frac{2\sin x}{\cos^2x}$.
${VB(r`t=\cos x`, r`-dt=\sin x\,dx`)}
$$-2\int t^{-2}dt=\frac2t+C=\frac2{\cos x}+C.$$`,
  '12.34c': r`${VB(r`t=\sin x`, r`dt=\cos x\,dx`)}
$$\int\frac{\cos x\,dx}{\sin x+\sin^2x}=\int\frac{dt}{t(1+t)}.$$
**Partialbråk (F3, handpåläggning):** $\frac1{t(1+t)}=\frac1t-\frac1{1+t}$.

$\ln|t|-\ln|1+t|=\ln\left|\frac{\sin x}{1+\sin x}\right|+C$.`,
  '12.34d': r`Som F4:s exempel a):
${VB(r`t=\sin x`, r`dt=\cos x\,dx`)}
$$\int\sin^9x\cos x\,dx=\int t^9dt=\frac{t^{10}}{10}+C=\frac1{10}\sin^{10}x+C.$$`,
  '12.34e': r`**Variabelbyte** enligt tipset $t=\tan x$: $\frac{dt}{dx}=1+\tan^2x\Rightarrow dx=\frac{dt}{1+t^2}$.

Täljaren $t^3+t=t(t^2+1)$, så integranden gånger $dx$ blir $\frac{t(t^2+1)}{t^3+3t^2+2t+6}\cdot\frac{dt}{1+t^2}=\frac{t\,dt}{t^3+3t^2+2t+6}$.

**Faktorisera:** $t^3+3t^2+2t+6=t^2(t+3)+2(t+3)=(t+3)(t^2+2)$.

**Partialbråk:** $\frac{t}{(t+3)(t^2+2)}=\frac A{t+3}+\frac{Bt+C}{t^2+2}$. Handpåläggning $t=-3$: $-3=11A\Rightarrow A=-\frac3{11}$. Identifiera $t^2$: $B=\frac3{11}$; konstant: $2A+3C=0\Rightarrow C=\frac2{11}$.

**Integrera:** $-\frac3{11}\ln|t+3|+\frac3{22}\ln(t^2+2)+\frac2{11}\cdot\frac1{\sqrt2}\arctan\frac t{\sqrt2}$, med $t=\tan x$.`,
  '12.34f': r`**Dela täljare och nämnare med $\cos^2x$:**
$$\frac{1}{\sin^2x+2\cos^2x}=\frac{1/\cos^2x}{\tan^2x+2}.$$
${VB(r`t=\tan x`, r`dt=\frac{dx}{\cos^2x}\ \text{(standardintegral F4)}`)}
$$\int\frac{dt}{t^2+2}=\frac1{\sqrt2}\arctan\frac t{\sqrt2}+C=\frac1{\sqrt2}\arctan\frac{\tan x}{\sqrt2}+C.$$`,
  '12.35a': r`**Udda potens (F4, som $\int\cos^3x\,dx$):** spara en faktor $\sin x$ och skriv resten med formel (3) $\sin^2x=1-\cos^2x$:
$$\sin^5x=\sin x(\sin^2x)^2=\sin x(1-\cos^2x)^2.$$
${VB(r`t=\cos x`, r`-dt=\sin x\,dx`)}
$$-\int(1-t^2)^2dt=-\int(1-2t^2+t^4)dt=-t+\frac23t^3-\frac15t^5+C,$$
med $t=\cos x$.`,
  '12.35b': r`**Jämn potens (F4): formel (5)** $\sin^2x=\frac{1-\cos2x}2$, två gånger:
$$\sin^4x=\left(\frac{1-\cos2x}2\right)^2=\frac14\left(1-2\cos2x+\cos^22x\right),$$
och formel (4) med $2x$: $\cos^22x=\frac{1+\cos4x}2$. Då
$$\sin^4x=\frac38-\frac12\cos2x+\frac18\cos4x.$$
Integrera termvis: $\frac38x-\frac14\sin2x+\frac1{32}\sin4x+C$.`,
  '12.35c': r`**Skriv om produkten till en summa** (bokens tips: Eulers formler, eller additionsformlerna $\sin(5x\pm x)=\sin5x\cos x\pm\cos5x\sin x$). Adderar man de två formlerna fås
$$\sin5x\cos x=\frac12(\sin6x+\sin4x).$$
Integrera: $\frac12\left(-\frac{\cos6x}6-\frac{\cos4x}4\right)=-\frac1{12}\cos6x-\frac18\cos4x+C$.`,
  '12.35d': r`**Formel (4) från F4:** $\cos^2x=\frac{1+\cos2x}2$ (samma som F4:s $\sin^2x$-exempel).
$$\int\frac{1+\cos2x}2dx=\frac x2+\frac12\cdot\frac{\sin2x}2=\frac x2+\frac{\sin2x}4+C.$$`,
  '12.35e': r`Skriv om med formlerna från F4:
$$\sin^4x\cos^2x=\sin^2x(\sin x\cos x)^2=\frac{1-\cos2x}2\cdot\left(\frac{\sin2x}2\right)^2=\frac18\sin^22x-\frac18\cos2x\sin^22x.$$
- $\int\sin^22x\,dx=\int\frac{1-\cos4x}2dx=\frac x2-\frac{\sin4x}8$ (formel (5))
- $\int\cos2x\sin^22x\,dx$: $t=\sin2x$, $dt=2\cos2x\,dx$ ger $\frac12\int t^2dt=\frac{\sin^32x}6$

Totalt $\frac x{16}-\frac{\sin4x}{64}-\frac{\sin^32x}{48}+C$, som är samma som bokens svar.`,
  '12.35f': r`Samma integral som 12.18 b): partialintegrera två gånger (integrera $e^{2x}$ båda gångerna) och lös ut den ursprungliga integralen.`,
}
