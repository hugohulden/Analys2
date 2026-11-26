import { PI, VB } from './fmt'

const r = String.raw

const DIREKT = r`**Metod (F10): integrera direkt.** Ekvationen är av typen $y'=f(x)$, så den allmänna lösningen är alla primitiver: $y=\int f(x)\,dx=F(x)+C$. Ett begynnelsevillkor bestämmer $C$.`
const REC = r`**Metod (F10): receptet för linjära ekvationer av ordning 1.**
0. Skriv på formen $y'+g(x)y=h(x)$.
1. Hitta en primitiv $G(x)$ till $g(x)$.
2. Multiplicera med den integrerande faktorn $e^{G(x)}$.
3. VL $=\left(e^{G(x)}y\right)'$.
4. Integrera (kom ihåg $C$).
5. Dela med $e^{G(x)}$.`
const SEP = r`**Metod (F11): separabel ekvation.** Samla allt med $y$ i VL och allt med $x$ i HL: $g(y)\,y'=h(x)$, alltså $g(y)\,dy=h(x)\,dx$. Integrera båda leden, $\int g(y)\,dy=\int h(x)\,dx$ (implicit lösning), och lös sedan ut $y$ om det går. ⚠️ Har du delat med något som kan vara 0 måste du kontrollera om det ger en lösning.`
const MOD = r`**Metod (F11/F12): modellera.** Inför beteckningar (vad är $y(t)$, vilken enhet?). "Ändras med en hastighet" är $y'(t)$, och "proportionell mot …" är $k\cdot(\dots)$. Skriv upp begynnelsevillkoret, lös ekvationen (oftast linjär) och svara på frågan.`
const KAR = r`**Metod (bok §15.3): karakteristisk ekvation.** För $y''+ay'+by=0$ sätter man in $y=e^{rx}$ och får $r^2+ar+b=0$.
- Två reella rötter $r_1\ne r_2$: $y=Ae^{r_1x}+Be^{r_2x}$.
- Dubbelrot $r$: $y=(Ax+B)e^{rx}$.
- Komplexa rötter $\alpha\pm\beta i$: $y=e^{\alpha x}(A\cos\beta x+B\sin\beta x)$.`
const INH = r`**Metod (bok §15.4): $y=y_h+y_p$.** Lös först den homogena ekvationen (karakteristisk ekvation), och hitta sedan **en** partikulärlösning $y_p$ med en ansats av samma typ som högerledet. Sätt in och identifiera koefficienter.
⚠️ **Resonans:** om ansatsen redan löser den homogena ekvationen multiplicerar man den med $x$ (en gång för enkelrot, $x^2$ för dubbelrot).`

/** Lösningsförslag kapitel 15 – följer F10–F12 (ordning 1) och boken (ordning 2). */
export const SOL15: Record<string, string> = {
  '15.1': r`${DIREKT}

**Allmän lösning:**
$$y=\int\left(x^2-e^{-x}\right)dx=\frac{x^3}3+e^{-x}+C.$$
(Kvalificerad gissning: $(e^{-x})'=-e^{-x}$, så $\int-e^{-x}dx=e^{-x}$.)

**Begynnelsevillkoret:** $y(0)=0+1+C=1\iff C=0$, alltså $y=\frac{x^3}3+e^{-x}$.

**Kontroll:** $y'=x^2-e^{-x}$ ✓`,
  '15.2': r`${DIREKT}

**Skriv om:** $xy'=\ln x\iff y'=\frac{\ln x}x$ ($x>0$).
${VB(r`t=\ln x,\ \frac{dt}{dx}=\frac1x\Rightarrow dt=\frac{dx}x`)}
$$y=\int\frac{\ln x}{x}\,dx=\int t\,dt=\frac{t^2}2+C=\frac12(\ln x)^2+C.$$
**Begynnelsevillkoret:** $y(1)=\frac12\cdot0+C=2\iff C=2$.

**Svar:** $y=\frac12(\ln x)^2+2$.`,
  '15.3': r`${REC}

**0.** Redan på rätt form: $g(x)=-2$, $h(x)=3$.

**1.** $G(x)=-2x$. **2.** Integrerande faktor $e^{-2x}$:
$$e^{-2x}y'-2e^{-2x}y=3e^{-2x}.$$
**3.** VL $=\left(e^{-2x}y\right)'$ (produktregeln baklänges).

**4.** $e^{-2x}y=\int3e^{-2x}dx=-\frac32e^{-2x}+C$.

**5.** $y=-\frac32+Ce^{2x}$.

**Kontroll:** $y'=2Ce^{2x}$ och $y'-2y=2Ce^{2x}+3-2Ce^{2x}=3$ ✓`,
  '15.4a': r`${REC}

$g(x)=2\Rightarrow G(x)=2x$, faktor $e^{2x}$. HL är 0:
$$\left(e^{2x}y\right)'=0\Rightarrow e^{2x}y=C\Rightarrow y=Ce^{-2x}.$$
(En funktion med derivatan 0 är en konstant.)`,
  '15.4b': r`${REC}

$g(x)=-3\Rightarrow G(x)=-3x$, faktor $e^{-3x}$:
$$\left(e^{-3x}y\right)'=0\Rightarrow e^{-3x}y=C\Rightarrow y=Ce^{3x}.$$`,
  '15.4c': r`${REC}

$g(x)=-k\Rightarrow G(x)=-kx$, faktor $e^{-kx}$:
$$\left(e^{-kx}y\right)'=0\Rightarrow y=Ce^{kx}.$$
(Det här är modellen för "ändras proportionellt mot sig själv", se F11.)`,
  '15.4d': r`${REC}

$g(x)=x\Rightarrow G(x)=\frac{x^2}2$, faktor $e^{x^2/2}$:
$$\left(e^{x^2/2}y\right)'=0\Rightarrow y=Ce^{-x^2/2}.$$`,
  '15.5a': r`${REC}

**1–2.** $G(x)=2x$, faktor $e^{2x}$: $e^{2x}y'+2e^{2x}y=e^{2x}$.

**3–4.** $\left(e^{2x}y\right)'=e^{2x}\Rightarrow e^{2x}y=\frac12e^{2x}+C$.

**5.** $y=\frac12+Ce^{-2x}$.

**Kontroll:** $y'+2y=-2Ce^{-2x}+1+2Ce^{-2x}=1$ ✓`,
  '15.5b': r`${REC}

**1–2.** $G(x)=-3x$, faktor $e^{-3x}$.

**3–4.** $\left(e^{-3x}y\right)'=e^{-3x}\Rightarrow e^{-3x}y=-\frac13e^{-3x}+C$.

**5.** $y=-\frac13+Ce^{3x}$.`,
  '15.5c': r`${REC}

**1.** $g(x)=\cos x\Rightarrow G(x)=\sin x$. **2.** Faktor $e^{\sin x}$.

**3.** $\left(e^{\sin x}y\right)'=4\cos x\,e^{\sin x}$.

**4.** ${VB(r`t=\sin x,\ dt=\cos x\,dx`)}
$e^{\sin x}y=\int4e^t\,dt=4e^{\sin x}+C$.

**5.** $y=4+Ce^{-\sin x}$.`,
  '15.5d': r`${REC}

**1.** $g(x)=x\Rightarrow G(x)=\frac{x^2}2$. **2.** Faktor $e^{x^2/2}$.

**3.** $\left(e^{x^2/2}y\right)'=xe^{x^2/2}$.

**4.** ${VB(r`t=\frac{x^2}2,\ dt=x\,dx`)}
$e^{x^2/2}y=\int e^tdt=e^{x^2/2}+C$.

**5.** $y=1+Ce^{-x^2/2}$.`,
  '15.6': r`${REC}

**0. Dela med $1+x^2$** (som aldrig är 0):
$$y'-\frac{x}{1+x^2}y=\frac{x}{1+x^2}.$$
**1.** $g(x)=-\frac{x}{1+x^2}$. Täljaren är halva nämnarens derivata: $G(x)=-\frac12\ln(1+x^2)$.

**2.** $e^{G(x)}=e^{-\frac12\ln(1+x^2)}=(1+x^2)^{-1/2}=\frac1{\sqrt{1+x^2}}$.

**3.** $\left(\frac{y}{\sqrt{1+x^2}}\right)'=\frac{x}{(1+x^2)^{3/2}}$.

**4.** ${VB(r`t=1+x^2,\ dt=2x\,dx`)}
$\int\frac{x\,dx}{(1+x^2)^{3/2}}=\frac12\int t^{-3/2}dt=-t^{-1/2}=-\frac1{\sqrt{1+x^2}}$, så $\frac{y}{\sqrt{1+x^2}}=-\frac1{\sqrt{1+x^2}}+C$.

**5.** $y=-1+C\sqrt{1+x^2}$.

**Begynnelsevillkoret:** $y(0)=-1+C=2\iff C=3$, alltså $y=-1+3\sqrt{1+x^2}$.`,
  '15.7a': r`${REC}

$g(x)=2x\Rightarrow G(x)=x^2$, faktor $e^{x^2}$:
$$\left(e^{x^2}y\right)'=0\Rightarrow e^{x^2}y=C\Rightarrow y=Ce^{-x^2}.$$
(Den här är också separabel, jämför $y'=2xy$ i F11.)`,
  '15.7b': r`${REC}

**0. Dela med $x$:** $y'+\frac{10}xy=\frac{\ln x}x$.

**1.** $G(x)=10\ln x$ ($x>0$). **2.** $e^{10\ln x}=x^{10}$.

**3.** $\left(x^{10}y\right)'=x^{10}\cdot\frac{\ln x}x=x^9\ln x$.

**4. Partialintegration (F3):**
${PI(r`x^9`, r`\frac{x^{10}}{10}`, r`\ln x`, r`\frac1x`)}
$x^{10}y=\frac{x^{10}}{10}\ln x-\int\frac{x^{9}}{10}dx=\frac{x^{10}}{10}\ln x-\frac{x^{10}}{100}+C$.

**5.** $y=\frac{\ln x}{10}-\frac1{100}+\frac{C}{x^{10}}$.`,
  '15.7c': r`${REC}

**1.** $g(x)=\cot x=\frac{\cos x}{\sin x}$ – täljaren är nämnarens derivata: $G(x)=\ln\sin x$ ($\sin x>0$ på intervallet).

**2.** $e^{G(x)}=\sin x$.

**3.** $(y\sin x)'=\sin x\tan^2x=\frac{\sin^3x}{\cos^2x}$.

**4. Udda potens av sin – spara en faktor (F3):** $\sin^3x=\sin x(1-\cos^2x)$.
${VB(r`t=\cos x,\ dt=-\sin x\,dx`)}
$\int\frac{(1-\cos^2x)\sin x}{\cos^2x}dx=-\int\frac{1-t^2}{t^2}dt=-\int\left(t^{-2}-1\right)dt=\frac1t+t$.

Alltså $y\sin x=\frac1{\cos x}+\cos x+C$.

**5.** $y=\frac1{\sin x\cos x}+\frac{\cos x}{\sin x}+\frac C{\sin x}=\frac2{\sin2x}+\cot x+\frac C{\sin x}$ (formel (1): $2\sin x\cos x=\sin2x$).`,
  '15.8a': r`${REC}

**1–2.** $g(x)=x^2\Rightarrow G(x)=\frac{x^3}3$, faktor $e^{x^3/3}$.

**3.** $\left(e^{x^3/3}y\right)'=x^2e^{x^3/3}$.

**4.** ${VB(r`t=\frac{x^3}3,\ dt=x^2\,dx`)}
$e^{x^3/3}y=e^{x^3/3}+C$.

**5.** $y=1+Ce^{-x^3/3}$.

**Begynnelsevillkoret:** $y(0)=1+C=2\iff C=1$: $y=1+e^{-x^3/3}$.`,
  '15.8b': r`${REC}

**0. Dela med $1-x^2$** ($>0$ för $|x|<1$): $y'+\frac{x}{1-x^2}y=\frac{x}{1-x^2}$.

**1.** $G(x)=\int\frac{x}{1-x^2}dx=-\frac12\ln(1-x^2)$ (täljaren är $-\frac12$ gånger nämnarens derivata).

**2.** $e^{G(x)}=\frac1{\sqrt{1-x^2}}$.

**3–4.** $\left(\frac{y}{\sqrt{1-x^2}}\right)'=\frac{x}{(1-x^2)^{3/2}}$. Med $t=1-x^2$, $dt=-2x\,dx$: $\int\frac{x\,dx}{(1-x^2)^{3/2}}=-\frac12\int t^{-3/2}dt=t^{-1/2}=\frac1{\sqrt{1-x^2}}$. Alltså $\frac{y}{\sqrt{1-x^2}}=\frac1{\sqrt{1-x^2}}+C$.

**5.** $y=1+C\sqrt{1-x^2}$.

**Begynnelsevillkoret:** $y(0)=1+C=3\iff C=2$: $y=1+2\sqrt{1-x^2}$.`,
  '15.8c': r`${REC}

**0. Dela med $1+x^2$:** $y'-\frac{2x}{1+x^2}y=\arctan x$.

**1.** $G(x)=-\ln(1+x^2)$ (täljaren är nämnarens derivata). **2.** $e^{G(x)}=\frac1{1+x^2}$.

**3.** $\left(\frac{y}{1+x^2}\right)'=\frac{\arctan x}{1+x^2}$.

**4.** ${VB(r`t=\arctan x,\ dt=\frac{dx}{1+x^2}`)}
$\frac{y}{1+x^2}=\int t\,dt=\frac12\arctan^2x+C$.

**5.** $y=(1+x^2)\left(\frac12\arctan^2x+C\right)$.

**Begynnelsevillkoret:** $y(1)=2\left(\frac12\cdot\frac{\pi^2}{16}+C\right)=2\iff C=1-\frac{\pi^2}{32}$.

**Svar:** $y=(1+x^2)\left(\frac12\arctan^2x+1-\frac{\pi^2}{32}\right)$.`,
  '15.8d': r`${REC}

**0. Dela med $(x+1)(x+2)$:** $y'-\frac{1}{(x+1)(x+2)}y=\frac1{(x+1)(x+2)}$.

**1. Partialbråk (F4):** $\frac1{(x+1)(x+2)}=\frac1{x+1}-\frac1{x+2}$ (handpåläggning). Alltså $g(x)=-\frac1{x+1}+\frac1{x+2}$ och
$$G(x)=-\ln(x+1)+\ln(x+2)=\ln\frac{x+2}{x+1}.$$
**2.** $e^{G(x)}=\frac{x+2}{x+1}$.

**3.** $\left(\frac{x+2}{x+1}y\right)'=\frac{x+2}{x+1}\cdot\frac1{(x+1)(x+2)}=\frac1{(x+1)^2}$.

**4.** $\frac{x+2}{x+1}y=-\frac1{x+1}+C$.

**5.** $y=\frac{x+1}{x+2}\left(C-\frac1{x+1}\right)=\frac{C(x+1)-1}{x+2}$.

**Begynnelsevillkoret:** $y(0)=\frac{C-1}2=2\iff C=5$: $y=\frac{5x+4}{x+2}$.`,
  '15.10': r`${MOD}

**a) Modell:** $y(t)$ = antalet bakterier vid tiden $t$ h. "Ändras med en hastighet proportionell mot antalet" ger
$$y'=0{,}1y,\qquad y(0)=1000.$$
**Lös (recept F10):** $y'-0{,}1y=0$, $G(t)=-0{,}1t$, faktor $e^{-0{,}1t}$: $\left(e^{-0{,}1t}y\right)'=0\Rightarrow y=Ce^{0{,}1t}$. $y(0)=C=1000$.
$$y(t)=1000e^{0{,}1t},\qquad y(6)=1000e^{0{,}6}\approx1822.$$
**b) Fördubbling:** $1000e^{0{,}1t}=2000\iff e^{0{,}1t}=2\iff t=10\ln2\approx6{,}9$ h.`,
  '15.11': r`${MOD}

**a) Modell:** $m(t)$ = mängden (g) vid tiden $t$ s. $m'=-0{,}2m$, $m(0)=3$.

**Lös:** $m'+0{,}2m=0$, faktor $e^{0{,}2t}$: $\left(e^{0{,}2t}m\right)'=0\Rightarrow m=Ce^{-0{,}2t}$, $C=3$.
$$m(t)=3e^{-0{,}2t},\qquad m(10)=3e^{-2}\approx0{,}41\ \text{g}.$$
**b) Halveringstid:** $3e^{-0{,}2t}=\frac32\iff e^{-0{,}2t}=\frac12\iff t=\frac{\ln2}{0{,}2}=5\ln2\approx3{,}5$ s.`,
  '15.12': r`${REC}

**0.** $mv'=-kv\iff v'+\frac kmv=0$.

**1–2.** $G(t)=\frac kmt$, faktor $e^{kt/m}$.

**3–4.** $\left(e^{kt/m}v\right)'=0\Rightarrow e^{kt/m}v=C$.

**5.** $v=Ce^{-kt/m}$. Begynnelsevillkoret $v(0)=C=v_0$ ger $v(t)=v_0e^{-kt/m}$.

**Rimligt:** farten avtar exponentiellt mot 0, snabbare ju större bromskonstanten $k$ är.`,
  '15.13': r`${REC}

**0.** $u=-RCu'\iff u'+\frac1{RC}u=0$.

**1–5.** Faktor $e^{t/RC}$: $\left(e^{t/RC}u\right)'=0\Rightarrow u=Ce^{-t/RC}$. $u(0)=C=E$, så $u(t)=Ee^{-t/RC}$.

**Halva spänningen:** $Ee^{-t/RC}=\frac E2\iff e^{-t/RC}=\frac12\iff t=RC\ln2$.`,
  '15.14': r`${REC}

**0.** $Li'+Ri=E\iff i'+\frac RLi=\frac EL$.

**1–2.** $G(t)=\frac RLt$, faktor $e^{Rt/L}$.

**3–4.** $\left(e^{Rt/L}i\right)'=\frac ELe^{Rt/L}\Rightarrow e^{Rt/L}i=\frac EL\cdot\frac LRe^{Rt/L}+C=\frac ERe^{Rt/L}+C$.

**5.** $i=\frac ER+Ce^{-Rt/L}$.

**Begynnelsevillkoret:** $i(0)=\frac ER+C=0\iff C=-\frac ER$, alltså $i(t)=\frac ER\left(1-e^{-Rt/L}\right)$. Strömmen växer mot $\frac ER$ (Ohms lag).`,
  '15.15': r`${MOD}

**Beteckningar:** $m(t)$ = mängden förorening (liter) efter $t$ minuter. Från början $m(0)=0{,}05\cdot3000=150$.

**Blandproblem (F12): $m'$ = in $-$ ut.**
- In: rent vatten, alltså 0.
- Ut: $50$ ℓ/min med koncentrationen $\frac{m}{3000}$: $50\cdot\frac m{3000}=\frac m{60}$ ℓ/min.

$$m'=-\frac m{60},\qquad m(0)=150.$$
**Lös:** $m'+\frac1{60}m=0$, faktor $e^{t/60}$: $m=Ce^{-t/60}$, $C=150$.

**När är koncentrationen 1 %?** Då är $m=30$: $150e^{-t/60}=30\iff e^{-t/60}=\frac15\iff t=60\ln5$ min $=\ln5$ h $\approx1{,}6$ h.`,
  '15.16': r`${MOD}

**Beteckningar:** $m(t)$ = mängden förorening (ton) efter $t$ år, $m(0)=0$.

**In $-$ ut:** in 3 ton/år, ut (avdunstning) $0{,}05m$ ton/år:
$$m'=3-0{,}05m\iff m'+0{,}05m=3.$$
**Recept:** faktor $e^{0{,}05t}$: $\left(e^{0{,}05t}m\right)'=3e^{0{,}05t}\Rightarrow e^{0{,}05t}m=\frac{3}{0{,}05}e^{0{,}05t}+C=60e^{0{,}05t}+C$, alltså $m=60+Ce^{-0{,}05t}$.

**Begynnelsevillkoret:** $m(0)=60+C=0\iff C=-60$.

**Efter 40 år:** $m(40)=60\left(1-e^{-2}\right)\approx52$ ton.`,
  '15.17': r`${MOD}

**Beteckningar:** $y(t)$ = antalet mjuka klappar. Lagret har alltid $M$ klappar, så de hårda är $M-y$.

**In $-$ ut:** ut $2Ky$, in $K(M-y)$:
$$y'=-2Ky+K(M-y)=-3Ky+KM,\qquad y(0)=\frac M2.$$
**Recept:** $y'+3Ky=KM$, faktor $e^{3Kt}$: $\left(e^{3Kt}y\right)'=KMe^{3Kt}\Rightarrow e^{3Kt}y=\frac M3e^{3Kt}+C$, alltså $y=\frac M3+Ce^{-3Kt}$.

**Begynnelsevillkoret:** $\frac M3+C=\frac M2\iff C=\frac M6$.

**Svar:** $y(t)=M\left(\frac13+\frac16e^{-3Kt}\right)$. Kurvan avtar från $\frac M2$ och närmar sig $\frac M3$ asymptotiskt.`,
  '15.19a': r`${SEP}

$2y\,dy=3x^2\,dx\Rightarrow\int2y\,dy=\int3x^2\,dx\Rightarrow y^2=x^3+C$ (implicit).

**Begynnelsevillkoret:** $y(1)=2$: $4=1+C\iff C=3$.

**Explicit:** $y=\pm\sqrt{x^3+3}$. Eftersom $y(1)=2>0$ väljer vi $+$: $y=\sqrt{x^3+3}$.`,
  '15.19b': r`${SEP}

$3y^2\,dy=2x\,dx\Rightarrow y^3=x^2+C$.

**Begynnelsevillkoret:** $8=1+C\iff C=7$.

**Explicit:** kubikroten är entydig (inget teckenval): $y=\sqrt[3]{x^2+7}$.`,
  '15.19c': r`${SEP}

$y\,dy=3x^2\,dx\Rightarrow\frac{y^2}2=x^3+C$.

**Begynnelsevillkoret:** $\frac42=1+C\iff C=1$, alltså $y^2=2x^3+2$.

**Explicit:** $y(1)=2>0$ ger $y=\sqrt{2x^3+2}$.`,
  '15.19d': r`${SEP}

$y^2\,dy=2x\,dx\Rightarrow\frac{y^3}3=x^2+C$.

**Begynnelsevillkoret:** $\frac83=1+C\iff C=\frac53$, alltså $y^3=3x^2+5$ och $y=\sqrt[3]{3x^2+5}$.`,
  '15.20a': r`${SEP}

**Separera:** $4y^3\,dy=\frac{dx}x$ ($x\ne0$).

**Integrera:** $y^4=\ln|x|+C$. $y(1)=1$: $1=0+C\iff C=1$.

**Explicit:** $y=\sqrt[4]{1+\ln x}$ (positiv eftersom $y(1)=1>0$). Den är definierad när $1+\ln x>0\iff x>e^{-1}$.`,
  '15.20b': r`${SEP}

**Separera:** $xy'=1-y^2\Rightarrow\frac{dy}{1-y^2}=\frac{dx}x$, om $y\ne\pm1$.

**Kontrollera de bortplockade fallen:** $y=1$ och $y=-1$ ger VL $=0$ och HL $=1-1=0$ ✓. De är konstanta lösningar.

**Partialbråk (F4):** $\frac1{1-y^2}=\frac{1/2}{1-y}+\frac{1/2}{1+y}$, primitiv $\frac12\ln\left|\frac{1+y}{1-y}\right|$.
$$\frac12\ln\left|\frac{1+y}{1-y}\right|=\ln x+c\Rightarrow\left|\frac{1+y}{1-y}\right|=e^{2c}x^2\Rightarrow\frac{1+y}{1-y}=Cx^2,\ C\ne0$$
(absolutbeloppet tas bort med $\pm$, och $\pm e^{2c}$ kallas $C$, som i F11).

**Lös ut $y$:** $1+y=Cx^2-Cx^2y\Rightarrow y=\frac{Cx^2-1}{Cx^2+1}$. Med $C=0$ fås $y=-1$; $y=1$ måste anges separat.`,
  '15.21a': r`${SEP}

$y\,dy=-x\,dx\Rightarrow\frac{y^2}2=-\frac{x^2}2+c\Rightarrow y^2=C-x^2$ (implicit).

Lösningskurvorna är cirklar $x^2+y^2=C$ (eller halvcirklar om man löser ut $y=\pm\sqrt{C-x^2}$).`,
  '15.21b': r`${SEP}

**Skriv om:** $y'=e^{x+y}=e^x\cdot e^y$. Dela med $e^y$ (aldrig 0): $e^{-y}\,dy=e^x\,dx$.

**Integrera:** $-e^{-y}=e^x-C\iff e^{-y}=C-e^x$.

**Lös ut $y$:** $-y=\ln(C-e^x)\iff y=-\ln(C-e^x)$ (där $C-e^x>0$).`,
  '15.21c': r`${SEP}

**Separera (för $y\ne0$):** $\frac{dy}{y^2}=dx\Rightarrow-\frac1y=x+C$.

**Begynnelsevillkoret:** $y(1)=1$: $-1=1+C\iff C=-2$. Alltså $-\frac1y=x-2\iff y=\frac1{2-x}$.

($y=0$ är också en lösning till ekvationen, men den uppfyller inte $y(1)=1$.)`,
  '15.21d': r`${SEP}

**Här är det viktigt att inte dela med 0 (F11)!** När vi separerar delar vi med $y^2$, vilket kräver $y\ne0$. Men villkoret är $y(1)=0$.

**Kontrollera $y=0$:** VL $=y'=0$ och HL $=0^2=0$ ✓, och $y(1)=0$ ✓.

**Svar:** $y=0$. (Lösningarna $y=\frac{-1}{x+C}$ blir aldrig 0, så ingen av dem fungerar.)`,
  '15.21e': r`${SEP}

**Separera:** $y\,dy=\frac{1+x^2}{x^2}dx=\left(\frac1{x^2}+1\right)dx$.

**Integrera:** $\frac{y^2}2=-\frac1x+x+C$.

**Begynnelsevillkoret:** $y(2)=2$: $2=-\frac12+2+C\iff C=\frac12$.

**Explicit:** $y^2=2\left(x-\frac1x+\frac12\right)$, och $y(2)>0$ ger $y=\sqrt{2\left(x-\frac1x+\frac12\right)}$.`,
  '15.22a': r`${SEP}

**Separera (för $y\ne\pm1$):** $\frac{dy}{y^2-1}=x\,dx$. (Villkoret $y(0)=0$ gör att de konstanta lösningarna $y=\pm1$ inte är aktuella.)

**Partialbråk:** $\frac1{y^2-1}=\frac{1/2}{y-1}-\frac{1/2}{y+1}$:
$$\frac12\ln\left|\frac{y-1}{y+1}\right|=\frac{x^2}2+c\Rightarrow\frac{y-1}{y+1}=Ce^{x^2}.$$
**Begynnelsevillkoret:** $y(0)=0$: $\frac{-1}{1}=C$, alltså $C=-1$.

**Lös ut $y$:** $y-1=-e^{x^2}(y+1)\iff y(1+e^{x^2})=1-e^{x^2}\iff y=\frac{1-e^{x^2}}{1+e^{x^2}}$.`,
  '15.22b': r`${SEP}

**Separera (för $y\ne0,2$):** $\frac{dy}{y(y-2)}=\frac{dx}x$.

**Partialbråk (handpåläggning):** $\frac1{y(y-2)}=\frac{-1/2}{y}+\frac{1/2}{y-2}$:
$$\frac12\ln\left|\frac{y-2}y\right|=\ln x+c\Rightarrow\frac{y-2}y=Cx^2.$$
**Begynnelsevillkoret:** $y(1)=1$: $\frac{-1}1=C$, alltså $C=-1$.

**Lös ut $y$:** $1-\frac2y=-x^2\iff\frac2y=1+x^2\iff y=\frac2{1+x^2}$.`,
  '15.23': r`**Metod (F11): sortera.** **Linjär** = kan skrivas $a(x)y'+b(x)y=c(x)$ (inga $y\cdot y$, $y\cdot y'$, $y'\cdot y'$, $e^y$ …). **Separabel** = kan skrivas $g(y)\,y'=h(x)$.

- **a)** $y'+y=3$: linjär.
- **b)** $y'\cdot y=3$: innehåller $y\cdot y'$ – ej linjär. Separabel: $y\,dy=3\,dx$.
- **c)** $y'+x^2y=3$: linjär ($b(x)=x^2$).
- **d)** $y'+y^2=3$: innehåller $y\cdot y$ – ej linjär. Separabel: $\frac{y'}{3-y^2}=1$.
- **e)** $xyy'=x^2+y^2$: ej linjär. Ej separabel – HL är en summa där $x$ och $y$ inte går att dela upp i en produkt.
- **f)** $xyy'=e^y\sin x$: ej linjär. Separabel: $ye^{-y}y'=\frac{\sin x}x$.`,
  '15.27': r`${MOD}

**Modell:** $h(t)$ = vattendjupet (dm) efter $t$ min. "Minskar med en hastighet proportionell mot roten ur djupet": $h'=-k\sqrt h$, $h(0)=7$.

**Separabel (F11):** för $h>0$: $h^{-1/2}\,dh=-k\,dt\Rightarrow2\sqrt h=-kt+C$.

**Begynnelsevillkoret:** $2\sqrt7=C$, alltså $2\sqrt h=2\sqrt7-kt$.

**Tomt efter 4 min:** $h(4)=0$: $0=2\sqrt7-4k\iff k=\frac{\sqrt7}2\approx1{,}3$ $\sqrt{\text{dm}}$/min.`,
  '15.36': r`${DIREKT}

Här är det $y''$ som är given – integrera två gånger, med en ny konstant varje gång.

**Första gången:** $y'=\int\left(4e^{2x}+x^2\right)dx=2e^{2x}+\frac{x^3}3+C_1$. $y'(0)=2+C_1=1\iff C_1=-1$.

**Andra gången:** $y=\int\left(2e^{2x}+\frac{x^3}3-1\right)dx=e^{2x}+\frac{x^4}{12}-x+C_2$. $y(0)=1+C_2=2\iff C_2=1$.

**Svar:** $y=e^{2x}+\frac{x^4}{12}-x+1$.`,
  '15.37a': r`${KAR}

$r^2-3r+2=0\iff(r-1)(r-2)=0\iff r=1,2$. Reella olika: $y=Ae^x+Be^{2x}$.`,
  '15.37b': r`${KAR}

$r^2-4r+4=(r-2)^2=0$: dubbelrot $r=2$. $y=(Ax+B)e^{2x}$.`,
  '15.37c': r`${KAR}

$r^2-6r+10=0\iff r=3\pm\sqrt{9-10}=3\pm i$ (pq-formeln, $\sqrt{-1}=i$ som i F12). $y=e^{3x}(A\cos x+B\sin x)$.`,
  '15.37d': r`${KAR}

$r^2-r-2=(r-2)(r+1)=0\iff r=2,-1$. $y=Ae^{2x}+Be^{-x}$.`,
  '15.37e': r`${KAR}

$r^2-10r+61=0\iff r=5\pm\sqrt{25-61}=5\pm\sqrt{-36}=5\pm6i$. $y=e^{5x}(A\cos6x+B\sin6x)$.`,
  '15.37f': r`${KAR}

$r^2-2r+5=0\iff r=1\pm\sqrt{1-5}=1\pm2i$. $y=e^x(A\cos2x+B\sin2x)$.`,
  '15.37g': r`${KAR}

$r^2+6r+9=(r+3)^2=0$: dubbelrot $r=-3$. $y=(Ax+B)e^{-3x}$.`,
  '15.38a': r`${KAR}

$r^2-4=0\iff r=\pm2$: $y=Ae^{2x}+Be^{-2x}$, $y'=2Ae^{2x}-2Be^{-2x}$.

**Villkoren:** $y(0)=A+B=0$ och $y'(0)=2A-2B=1$. Alltså $B=-A$ och $4A=1$: $A=\frac14$, $B=-\frac14$.

**Svar:** $y=\frac14\left(e^{2x}-e^{-2x}\right)$.`,
  '15.38b': r`${KAR}

Dubbelrot $r=-3$: $y=(Ax+B)e^{-3x}$, $y'=Ae^{-3x}-3(Ax+B)e^{-3x}$.

**Villkoren:** $y(0)=B=-1$; $y'(0)=A-3B=A+3=1\iff A=-2$.

**Svar:** $y=-(2x+1)e^{-3x}$.`,
  '15.39a': r`${KAR}

$r^2+4=0\iff r=\pm2i$: $y=A\cos2x+B\sin2x$.

**Randvillkoren:** $y(0)=A=0$. $y\left(\frac\pi2\right)=B\sin\pi=0$ – uppfylls för **alla** $B$.

**Svar:** $y=B\sin2x$, $B$ godtycklig (oändligt många lösningar).`,
  '15.39b': r`${KAR}

$y=A\cos2x+B\sin2x$, $y'=-2A\sin2x+2B\cos2x$.

**Randvillkoren:** $y'(0)=2B=0\iff B=0$. $y'\left(\frac\pi2\right)=-2A\sin\pi=0$ för alla $A$.

**Svar:** $y=A\cos2x$, $A$ godtycklig.`,
  '15.40': r`${KAR}

Karakteristisk ekvation $r^2+\lambda=0$. Tre fall:

**$\lambda<0$**, skriv $\lambda=-\mu^2$ ($\mu>0$): $r=\pm\mu$, $y=Ae^{\mu x}+Be^{-\mu x}$. $y(0)=A+B=0$ ger $y=A\left(e^{\mu x}-e^{-\mu x}\right)$, och $y(\ell)=0$ ger $A=0$ (eftersom $e^{\mu\ell}\ne e^{-\mu\ell}$). Bara $y\equiv0$.

**$\lambda=0$:** $y=Ax+B$. $y(0)=B=0$, $y(\ell)=A\ell=0\Rightarrow A=0$. Bara $y\equiv0$.

**$\lambda>0$**, skriv $\lambda=\omega^2$: $r=\pm i\omega$, $y=A\cos\omega x+B\sin\omega x$. $y(0)=A=0$. $y(\ell)=B\sin\omega\ell=0$ med $B\ne0$ kräver $\sin\omega\ell=0\iff\omega\ell=n\pi$.

**Svar:** $\lambda=\frac{n^2\pi^2}{\ell^2}$, $n=1,2,3,\dots$, med lösningarna $y=B\sin\frac{n\pi x}\ell$.`,
  '15.41': r`${KAR}

Samma tre fall som i 15.40, men med villkor på derivatan.

**$\lambda<0$:** $y'=\mu(Ae^{\mu x}-Be^{-\mu x})$; $y'(0)=0\Rightarrow A=B$ och $y'(\ell)=0\Rightarrow A=0$. Trivial.

**$\lambda=0$:** $y=Ax+B$, $y'=A=0$. Då är $y=B$ en icke-trivial lösning! ($n=0$.)

**$\lambda=\omega^2>0$:** $y'=\omega(-A\sin\omega x+B\cos\omega x)$. $y'(0)=\omega B=0\Rightarrow B=0$. $y'(\ell)=-\omega A\sin\omega\ell=0$ med $A\ne0$ kräver $\omega\ell=n\pi$.

**Svar:** $\lambda=\frac{n^2\pi^2}{\ell^2}$, $n=0,1,2,\dots$, med $y=A\cos\frac{n\pi x}\ell$.`,
  '15.42': r`${KAR}

**Konstanten:** $\frac gL=\frac g{0{,}2}=5g$. Karakteristisk ekvation $r^2+5g=0\iff r=\pm i\sqrt{5g}$:
$$\alpha(t)=A\cos\sqrt{5g}\,t+B\sin\sqrt{5g}\,t.$$
**Begynnelsevillkoren** (vinkeln i radianer): $\alpha(0)=A=3°=\frac{3\pi}{180}=\frac\pi{60}$. $\alpha'(0)=\sqrt{5g}\,B=0\Rightarrow B=0$.

**Efter en sekund:** $\alpha(1)=\frac\pi{60}\cos\sqrt{5g}\approx2{,}26°$ (med $g\approx9{,}81$).`,
  '15.43': r`${KAR}

**Karakteristisk ekvation:** $r^2+\frac cmr+\frac km=0\iff r=-\frac c{2m}\pm\sqrt{\left(\frac c{2m}\right)^2-\frac km}$.

**Dubbelrot** när rotuttrycket är 0: $\left(\frac c{2m}\right)^2=\frac km\iff\frac c{2m}=\sqrt{\frac km}$.

**Lösning:** dubbelroten är $-\frac c{2m}$, så $y=(At+B)e^{-\frac c{2m}t}$.

**Extremvärden:** $y'=e^{-\frac c{2m}t}\left(A-\frac c{2m}(At+B)\right)$. Exponentialfaktorn är aldrig 0, och parentesen är ett förstagradsuttryck i $t$ om $A\ne0$, som har exakt ett nollställe. Alltså **ett** extremvärde om $A\ne0$, inget om $A=0$.`,
  '15.44': r`${KAR}

**Dela med $L$:** $i''+\frac RLi'+\frac1{LC}i=0$. Karakteristisk ekvation $r^2+\frac RLr+\frac1{LC}=0$.

**Kritisk dämpning = dubbelrot:** $\left(\frac R{2L}\right)^2=\frac1{LC}\iff R=2\sqrt{\frac LC}$.

**Sätt in:** $R=2\sqrt{\frac{0{,}2}{0{,}8\cdot10^{-6}}}=2\sqrt{250\,000}=2\cdot500=1000\ \Omega=1$ kΩ.`,
  '15.45': r`${INH}

**a) Homogen:** $r^2+4=0\iff r=\pm2i$: $y_h=A\cos2x+B\sin2x$.

**Partikulär:** HL är ett andragradspolynom, så ansätt $y_p=ax^2+bx+c$, $y_p''=2a$:
$$2a+4(ax^2+bx+c)=x^2\iff4ax^2+4bx+(2a+4c)=x^2.$$
Identifiera: $4a=1$, $4b=0$, $2a+4c=0$, alltså $a=\frac14$, $b=0$, $c=-\frac18$.
$$y=A\cos2x+B\sin2x+\frac{x^2}4-\frac18.$$
**b)** $y(0)=A-\frac18=0\iff A=\frac18$. $y'=-2A\sin2x+2B\cos2x+\frac x2$, $y'(0)=2B=0$.

**Svar:** $y=\frac18\cos2x+\frac{x^2}4-\frac18$.`,
  '15.46': r`${INH}

**Homogen:** $r^2+4r=r(r+4)=0\iff r=0,-4$: $y_h=A+Be^{-4x}$.

**Partikulär:** HL är ett förstagradspolynom. Men $r=0$ är en rot (konstanter löser den homogena ekvationen), så polynomansatsen multipliceras med $x$:
$$y_p=x(ax+b)=ax^2+bx,\quad y_p'=2ax+b,\quad y_p''=2a.$$
**Sätt in:** $2a+4(2ax+b)=8ax+(2a+4b)=x+1$. Identifiera: $8a=1\iff a=\frac18$; $\frac14+4b=1\iff b=\frac3{16}$.

**Svar:** $y=A+Be^{-4x}+\frac18x^2+\frac3{16}x$.`,
  '15.47a': r`${INH}

**Homogen:** $r^2-3r+2=(r-1)(r-2)$: $y_h=Ae^x+Be^{2x}$.

**Partikulär:** HL är konstant, ansätt $y_p=c$: $2c=6\iff c=3$.

**Svar:** $y=Ae^x+Be^{2x}+3$.`,
  '15.47b': r`${INH}

**Homogen:** $y_h=Ae^x+Be^{2x}$.

**Partikulär:** $y_p=ax^2+bx+c$, $y_p'=2ax+b$, $y_p''=2a$:
$$2a-3(2ax+b)+2(ax^2+bx+c)=2ax^2+(2b-6a)x+(2a-3b+2c)=x^2.$$
Identifiera: $2a=1\Rightarrow a=\frac12$; $2b-3=0\Rightarrow b=\frac32$; $1-\frac92+2c=0\Rightarrow c=\frac74$.

**Svar:** $y=Ae^x+Be^{2x}+\frac12x^2+\frac32x+\frac74$.`,
  '15.47c': r`${INH}

**Homogen:** $r^2+3r+2=(r+1)(r+2)$: $y_h=Ae^{-x}+Be^{-2x}$.

**Partikulär:** HL är av grad 3: $y_p=ax^3+bx^2+cx+d$, $y_p'=3ax^2+2bx+c$, $y_p''=6ax+2b$.
$$y_p''+3y_p'+2y_p=2ax^3+(9a+2b)x^2+(6a+6b+2c)x+(2b+3c+2d).$$
Identifiera med $x^3+x+1$:
- $x^3$: $2a=1\Rightarrow a=\frac12$.
- $x^2$: $\frac92+2b=0\Rightarrow b=-\frac94$.
- $x$: $3-\frac{27}2+2c=1\Rightarrow c=\frac{23}4$.
- konstant: $-\frac92+\frac{69}4+2d=1\Rightarrow d=-\frac{47}8$.

**Svar:** $y=Ae^{-x}+Be^{-2x}+\frac12x^3-\frac94x^2+\frac{23}4x-\frac{47}8$.`,
  '15.47d': r`${INH}

**Homogen:** $r^2+2r=r(r+2)$: $y_h=A+Be^{-2x}$.

**Partikulär:** $r=0$ är rot, så polynomansatsen multipliceras med $x$: $y_p=x(ax^2+bx+c)=ax^3+bx^2+cx$.
$$y_p''+2y_p'=6ax+2b+2(3ax^2+2bx+c)=6ax^2+(6a+4b)x+(2b+2c)=x^2+1.$$
Identifiera: $a=\frac16$; $1+4b=0\Rightarrow b=-\frac14$; $-\frac12+2c=1\Rightarrow c=\frac34$.

**Svar:** $y=A+Be^{-2x}+\frac16x^3-\frac14x^2+\frac34x$.`,
  '15.48': r`${INH}

**Homogen:** $r^2+3r+2=(r+1)(r+2)$: $y_h=Ae^{-x}+Be^{-2x}$.

**Partikulär:** HL är (polynom av grad 1) $\cdot e^{-3x}$, och $-3$ är inte en rot. Ansätt $y_p=(ax+b)e^{-3x}$:
- $y_p'=(-3ax+a-3b)e^{-3x}$
- $y_p''=(9ax-6a+9b)e^{-3x}$

**Sätt in** (dela med $e^{-3x}$, som aldrig är 0):
$$(9ax-6a+9b)+3(-3ax+a-3b)+2(ax+b)=2ax+(-3a+2b)=x+1.$$
Identifiera: $2a=1\Rightarrow a=\frac12$; $-\frac32+2b=1\Rightarrow b=\frac54$.

**Svar:** $y=Ae^{-x}+Be^{-2x}+e^{-3x}\left(\frac12x+\frac54\right)$.`,
  '15.49a': r`${INH}

**Homogen:** $y_h=Ae^x+Be^{2x}$ ($r=1,2$).

**Partikulär:** $5$ är inte en rot, ansätt $y_p=ae^{5x}$: $(25-15+2)ae^{5x}=12ae^{5x}=e^{5x}\Rightarrow a=\frac1{12}$.

**Svar:** $y=Ae^x+Be^{2x}+\frac1{12}e^{5x}$.`,
  '15.49b': r`${INH}

**Homogen:** $y_h=Ae^x+Be^{2x}$.

**Resonans:** $ae^{2x}$ löser den homogena ekvationen (2 är en enkelrot), så ansätt $y_p=axe^{2x}$:
- $y_p'=a(1+2x)e^{2x}$, $y_p''=a(4+4x)e^{2x}$.

**Sätt in:** $a e^{2x}\left[(4+4x)-3(1+2x)+2x\right]=ae^{2x}=e^{2x}\Rightarrow a=1$.

**Svar:** $y=Ae^x+Be^{2x}+xe^{2x}$.`,
  '15.49c': r`${INH}

**Homogen:** $(r+3)^2=0$, dubbelrot: $y_h=(A+Bx)e^{-3x}$.

**Partikulär:** $-1$ är inte en rot, $y_p=ae^{-x}$: $(1-6+9)a=4a=4\Rightarrow a=1$.

**Allmän lösning:** $y=(A+Bx)e^{-3x}+e^{-x}$, $y'=(B-3A-3Bx)e^{-3x}-e^{-x}$.

**Villkoren:** $y(0)=A+1=2\Rightarrow A=1$. $y'(0)=B-3-1=-2\Rightarrow B=2$.

**Svar:** $y=(1+2x)e^{-3x}+e^{-x}$.`,
  '15.49d': r`${INH}

**Homogen:** $(r+1)^2=0$, dubbelrot $-1$: $y_h=(A+Bx)e^{-x}$.

**Resonans (dubbelrot):** ansatsen $(ax+b)e^{-x}$ multipliceras med $x^2$: $y_p=(ax^3+bx^2)e^{-x}=u\,e^{-x}$.

**Derivera:** $y_p'=(u'-u)e^{-x}$, $y_p''=(u''-2u'+u)e^{-x}$. Insatt:
$$y_p''+2y_p'+y_p=e^{-x}\left(u''-2u'+u+2u'-2u+u\right)=u''e^{-x}.$$
Alltså ska $u''=6ax+2b=x$: $a=\frac16$, $b=0$, $y_p=\frac{x^3}6e^{-x}$.

**Allmän lösning:** $y=\left(A+Bx+\frac{x^3}6\right)e^{-x}$.

**Villkoren:** $y(0)=A=1$. $y'=\left(B+\frac{x^2}2\right)e^{-x}-\left(A+Bx+\frac{x^3}6\right)e^{-x}$, $y'(0)=B-A=0\Rightarrow B=1$.

**Svar:** $y=\left(1+x+\frac{x^3}6\right)e^{-x}$.`,
  '15.50': r`${INH}

**Homogen:** $(r+1)^2=0$: $y_h=(Ax+B)e^{-x}$.

**Superposition:** hitta en partikulärlösning för varje term i HL och addera.

**För $e^x$:** $1$ är inte en rot, $y_1=ae^x$: $(1+2+1)a=1\Rightarrow a=\frac14$.

**För $e^{-x}$:** dubbelrot ⇒ multiplicera med $x^2$: $y_2=ax^2e^{-x}$. Som i 15.49 d gäller $y_2''+2y_2'+y_2=u''e^{-x}$ med $u=ax^2$, så $2a=1\Rightarrow a=\frac12$.

**Svar:** $y=(Ax+B)e^{-x}+\frac14e^x+\frac12x^2e^{-x}$.`,
  '15.51': r`${INH}

**Homogen:** $r^2-3r-4=(r-4)(r+1)$: $y_h=Ae^{4x}+Be^{-x}$.

**För $5e^{-x}$ – resonans** ($-1$ är rot): $y_1=axe^{-x}$, $y_1'=a(1-x)e^{-x}$, $y_1''=a(x-2)e^{-x}$:
$$ae^{-x}\left[(x-2)-3(1-x)-4x\right]=-5ae^{-x}=5e^{-x}\Rightarrow a=-1.$$
**För $4x$:** $y_2=ax+b$: $-3a-4(ax+b)=-4ax-(3a+4b)=4x\Rightarrow a=-1$, $b=\frac34$.

**Allmän lösning:** $y=Ae^{4x}+Be^{-x}-xe^{-x}-x+\frac34$.

**Villkoren:** $y(0)=A+B+\frac34=1$ och $y'(0)=4A-B-1-1=-1$. Alltså $A+B=\frac14$ och $4A-B=1$, vilket ger $A=\frac14$, $B=0$.

**Svar:** $y=\frac14\left(e^{4x}+3\right)-x\left(1+e^{-x}\right)$.`,
  '15.52': r`${INH}

**Homogen:** $(r+1)^2=0$: $y_h=(A+Bx)e^{-x}$.

**För $xe^{-x}$:** precis som i 15.49 d: $y_1=\frac{x^3}6e^{-x}$.

**För $1$:** $y_2=c$ ger $c=1$.

**Allmän lösning:** $y=\left(A+Bx+\frac{x^3}6\right)e^{-x}+1$.

**Villkoren:** $y(0)=A+1=0\Rightarrow A=-1$. $y'(0)=B-A=0\Rightarrow B=-1$.

**Svar:** $y=e^{-x}\left(\frac{x^3}6-x-1\right)+1$.`,
  '15.53': r`${INH}

**Homogen:** $r=\pm2i$: $y_h=A\cos2x+B\sin2x$.

**Resonans:** $\sin2x$ löser den homogena ekvationen. Ansätt $y_p=x\,u$ med $u=a\cos2x+b\sin2x$. Eftersom $u''=-4u$ blir
$$y_p''=2u'+xu''=2u'-4xu\quad\Rightarrow\quad y_p''+4y_p=2u'.$$
$2u'=-4a\sin2x+4b\cos2x=\sin2x\Rightarrow a=-\frac14$, $b=0$.

**Svar:** $y=A\cos2x+B\sin2x-\frac14x\cos2x$.`,
  '15.54a': r`${INH}

**Homogen:** $r^2-2r-1=0\iff r=1\pm\sqrt2$: $y_h=Ae^{(1+\sqrt2)x}+Be^{(1-\sqrt2)x}$.

**Partikulär:** trig-HL – ta med både cos och sin: $y_p=a\cos3x+b\sin3x$, $y_p'=-3a\sin3x+3b\cos3x$, $y_p''=-9y_p$.
$$y_p''-2y_p'-y_p=(-10a-6b)\cos3x+(6a-10b)\sin3x=\sin3x.$$
Identifiera: $-10a-6b=0$ och $6a-10b=1$. Första ger $a=-\frac35b$, insatt: $-\frac{18}5b-10b=1\Rightarrow b=-\frac5{68}$, $a=\frac3{68}$.

**Svar:** $y=y_h+\frac3{68}\cos3x-\frac5{68}\sin3x$.`,
  '15.54b': r`${INH}

**Homogen:** $y_h=A\cos2x+B\sin2x$.

**Partikulär:** $y_p=a\sin x+b\cos x$ ($\pm i$ är inte rötter). $y_p''=-y_p$, så $y_p''+4y_p=3y_p=2\sin x-\cos x$: $a=\frac23$, $b=-\frac13$.

**Svar:** $y=A\cos2x+B\sin2x+\frac23\sin x-\frac13\cos x$.`,
  '15.54c': r`${INH}

**Homogen:** $y_h=Ae^x+Be^{2x}$.

**Partikulär:** $y_p=a\cos2x+b\sin2x$, $y_p'=-2a\sin2x+2b\cos2x$, $y_p''=-4y_p$:
$$(-4a-6b+2a)\cos2x+(-4b+6a+2b)\sin2x=(-2a-6b)\cos2x+(6a-2b)\sin2x.$$
Identifiera med $\cos2x+\sin2x$: $-2a-6b=1$, $6a-2b=1$. Andra ger $b=3a-\frac12$, insatt: $-20a+3=1\Rightarrow a=\frac1{10}$, $b=-\frac15$.

**Svar:** $y=Ae^x+Be^{2x}+\frac1{10}\cos2x-\frac15\sin2x$.`,
  '15.54d': r`${INH}

**Homogen:** $r=1\pm2i$: $y_h=e^x(A\cos2x+B\sin2x)$.

**Superposition:** för konstanten $1$: $5c=1\Rightarrow c=\frac15$. För $\sin x$: $y_p=a\cos x+b\sin x$, $y_p'=-a\sin x+b\cos x$, $y_p''=-y_p$:
$$(4a-2b)\cos x+(2a+4b)\sin x=\sin x\Rightarrow b=2a,\ 10a=1\Rightarrow a=\frac1{10},\ b=\frac15.$$
**Svar:** $y=e^x(A\cos2x+B\sin2x)+\frac15+\frac1{10}\cos x+\frac15\sin x$.`,
  '15.54e': r`${INH}

**Homogen:** $y_h=A\cos2x+B\sin2x$.

**Superposition:** för $1$: $4c=1\Rightarrow c=\frac14$. För $\cos2x$ – **resonans**: $y_p=x(a\cos2x+b\sin2x)$ ger som i 15.53 $y_p''+4y_p=2u'=-4a\sin2x+4b\cos2x=\cos2x$, alltså $a=0$, $b=\frac14$.

**Svar:** $y=A\cos2x+B\sin2x+\frac14+\frac x4\sin2x$.`,
  '15.55': r`**Metod (bokens tips + F12): komplex ansats.** $e^{3x}\cos x=\operatorname{Re}\,e^{(3+i)x}$ eftersom $e^{(3+i)x}=e^{3x}(\cos x+i\sin x)$. Lös ekvationen med HL $e^{(3+i)x}$ och ta realdelen av lösningen.

**Homogen:** $r^2-3r+2=(r-1)(r-2)$: $y_h=Ae^x+Be^{2x}$.

**Komplex ansats** $y=Ce^{(3+i)x}$ ($3+i$ är inte en rot): sätt in och dela med $e^{(3+i)x}$:
$$C\left((3+i)^2-3(3+i)+2\right)=C(8+6i-9-3i+2)=C(1+3i)=1.$$
**Division – förläng med konjugatet (F12):** $C=\frac1{1+3i}=\frac{1-3i}{(1+3i)(1-3i)}=\frac{1-3i}{10}$.

**Realdel:** $\operatorname{Re}\left(\frac{1-3i}{10}e^{3x}(\cos x+i\sin x)\right)=\frac{e^{3x}}{10}\operatorname{Re}\big(\cos x+3\sin x+i(\sin x-3\cos x)\big)=\frac{e^{3x}}{10}(\cos x+3\sin x)$.

**Svar:** $y=Ae^x+Be^{2x}+\frac1{10}e^{3x}(\cos x+3\sin x)$.`,
  '15.56a': r`**Metod (som 15.55): komplex ansats.** $e^{3x}\cos x=\operatorname{Re}\,e^{(3+i)x}$.

**Homogen:** $r^2-6r+10=0\iff r=3\pm i$: $y_h=e^{3x}(A\cos x+B\sin x)$.

**Resonans:** $3+i$ är en rot, så ansätt $y=Cxe^{(3+i)x}$. Med $\rho=3+i$: $y'=C(1+\rho x)e^{\rho x}$, $y''=C(2\rho+\rho^2x)e^{\rho x}$. Insatt:
$$Ce^{\rho x}\left[(\rho^2-6\rho+10)x+2\rho-6\right]=C(2\rho-6)e^{\rho x}=2iC\,e^{\rho x},$$
eftersom $\rho^2-6\rho+10=0$. Alltså $2iC=1\iff C=\frac1{2i}=-\frac i2$.

**Realdel:** $\operatorname{Re}\left(-\frac i2xe^{3x}(\cos x+i\sin x)\right)=\frac x2e^{3x}\sin x$.

**Svar:** $y=e^{3x}\left(A\cos x+B\sin x+\frac x2\sin x\right)$.`,
  '15.56b': r`**Metod (som 15.55): komplex ansats.** $e^{-2x}\sin x=\operatorname{Im}\,e^{(-2+i)x}$.

**Homogen:** $r^2+6r+8=(r+2)(r+4)$: $y_h=Ae^{-2x}+Be^{-4x}$.

**Komplex ansats** $y=Ce^{(-2+i)x}$ ($-2+i$ är inte en rot):
$$C\left((-2+i)^2+6(-2+i)+8\right)=C(3-4i-12+6i+8)=C(-1+2i)=1.$$
$C=\frac1{-1+2i}=\frac{-1-2i}{(-1)^2+2^2}=\frac{-1-2i}5$ (förläng med konjugatet).

**Imaginärdel:** $\operatorname{Im}\left(\frac{-1-2i}5(\cos x+i\sin x)\right)=\frac{-\sin x-2\cos x}5$.

**Svar:** $y=Ae^{-2x}+Be^{-4x}-\frac15e^{-2x}(2\cos x+\sin x)$.`,
  '15.57': r`${INH}

**Homogen:** $r^2+\frac14=0\iff r=\pm\frac i2$: $y_h=A\cos\frac x2+B\sin\frac x2$.

**Partikulär:** ingen $y'$-term, så $y_p=a\sin x$ räcker: $-a\sin x+\frac a4\sin x=-\sin x\Rightarrow-\frac34a=-1\Rightarrow a=\frac43$.

**Randvillkoren:** $y(0)=A=0$. $y(\pi)=B\sin\frac\pi2+\frac43\sin\pi=B=0$.

**Svar:** $y=\frac43\sin x$.`,
  '15.58': r`${INH}

**Homogen:** $r^2+9=0\iff r=\pm3i$: $y_h=A\cos3x+B\sin3x$. HL $\sin\alpha x$ löser den homogena ekvationen precis när $\alpha=3$.

**Resonans med $\alpha=3$:** $y_p=x\,u$, $u=a\cos3x+b\sin3x$. Eftersom $u''=-9u$ blir $y_p''+9y_p=2u'=-6a\sin3x+6b\cos3x=\sin3x$, så $a=-\frac16$, $b=0$.

**Svar:** $\alpha=3$ och $y=\left(A-\frac x6\right)\cos3x+B\sin3x$.`,
  '15.63': r`${MOD}

**Modell:** $T(t)$ = innertemperaturen efter $t$ h. "Sänkningen per tidsenhet proportionell mot skillnaden" – precis som kaffet i F12:
$$T'=k(T-(-10))=k(T+10),\qquad T(0)=20.$$
**Recept:** $T'-kT=10k$, faktor $e^{-kt}$: $\left(e^{-kt}T\right)'=10ke^{-kt}\Rightarrow e^{-kt}T=-10e^{-kt}+C$, alltså $T=-10+Ce^{kt}$.

**Bivillkoren:** $T(0)=-10+C=20\Rightarrow C=30$. $T(2)=15$: $-10+30e^{2k}=15\iff e^{2k}=\frac56$.

**Efter ett dygn:** $T(24)=-10+30e^{24k}=-10+30\left(e^{2k}\right)^{12}=-10+30\left(\frac56\right)^{12}\approx-6{,}6$ °C.`,
  '15.71': r`${MOD}

**Modell:** $y(t)$ = folkmängden efter $t$ år. Ökning $0{,}1\,\%$ per år $=0{,}001y$, utflyttning 500 per år:
$$y'=0{,}001y-500,\qquad y(0)=100\,000.$$
**Recept:** $y'-\frac{y}{1000}=-500$, faktor $e^{-t/1000}$: $\left(e^{-t/1000}y\right)'=-500e^{-t/1000}\Rightarrow e^{-t/1000}y=500\,000e^{-t/1000}+C$, alltså
$$y=500\,000+Ce^{t/1000}.$$
**Begynnelsevillkoret:** $500\,000+C=100\,000\Rightarrow C=-400\,000$: $y(t)=500\,000-400\,000e^{t/1000}$.

**När har folkmängden minskat med 10 000, dvs. är 90 000?** $400\,000e^{t/1000}=410\,000\iff t=1000\ln\frac{41}{40}\approx25$ år.`,
}
