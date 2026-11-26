import type { Card } from './types'
import { LECTURES } from './lectures'

const r = String.raw

/** "Måste kunna utantill" – står INTE på formelbladet (avsnitt 6.4). */
const UTANTILL: Card[] = [
  { id: 'u-prim-pot', kind: 'utantill', area: 'int-primitiva', front: r`$\displaystyle\int x^a\,dx$ ($a \ne -1$) och $\displaystyle\int\frac1x\,dx$`, back: r`$\frac{x^{a+1}}{a+1} + C$ och $\ln|x| + C$` },
  { id: 'u-prim-exp', kind: 'utantill', area: 'int-primitiva', front: r`$\displaystyle\int e^{kx}\,dx$, $\displaystyle\int\sin kx\,dx$, $\displaystyle\int\cos kx\,dx$`, back: r`$\frac1k e^{kx}$, $\;-\frac1k\cos kx$, $\;\frac1k\sin kx$ (alla $+C$)` },
  { id: 'u-prim-atan', kind: 'utantill', area: 'int-primitiva', front: r`$\displaystyle\int\frac{1}{1+x^2}\,dx$ och $\displaystyle\int\frac{1}{a^2+x^2}\,dx$`, back: r`$\arctan x + C$ och $\frac1a\arctan\frac xa + C$` },
  { id: 'u-prim-fprim', kind: 'utantill', area: 'int-primitiva', front: r`$\displaystyle\int\frac{f'(x)}{f(x)}\,dx$`, back: r`$\ln|f(x)| + C$. Ex: $\int\frac{2x}{x^2+1}dx = \ln(x^2+1) + C$, $\int\tan x\,dx = -\ln|\cos x| + C$.` },
  { id: 'u-prim-asin', kind: 'utantill', area: 'int-primitiva', front: r`$\displaystyle\int\frac{1}{\sqrt{1-x^2}}\,dx$ och $\displaystyle\int\frac{1}{\cos^2x}\,dx$`, back: r`$\arcsin x + C$ och $\tan x + C$` },
  { id: 'u-partiell', kind: 'utantill', area: 'int-partiell', front: r`Partialintegrationsformeln`, back: r`Lärarens skrivsätt: $$\int f(x)g(x)\,dx = F(x)g(x) - \int F(x)g'(x)\,dx$$ $f$ integreras (↑), $g$ deriveras (↓). Välj $g$ = det som blir enklare av derivering (polynom, $\ln x$, $\arctan x$).` },
  { id: 'u-varbyte', kind: 'utantill', area: 'int-variabelbyte', front: r`Variabelbyte i *bestämd* integral – vad måste man komma ihåg?`, back: r`Byt gränserna! $u = g(x)$: $\displaystyle\int_a^b f(g(x))g'(x)\,dx = \int_{g(a)}^{g(b)} f(u)\,du$. (Alternativt: byt tillbaka till $x$ innan insättning.)` },
  { id: 'u-pb-enkla', kind: 'utantill', area: 'int-partialbrak', front: r`Partialbråksansats för $\dfrac{p(x)}{(x-a)(x-b)}$ ($a \ne b$)`, back: r`$\dfrac{A}{x-a} + \dfrac{B}{x-b}$. Snabbt: handpåläggning – sätt $x = a$ för $A$.` },
  { id: 'u-pb-dubbel', kind: 'utantill', area: 'int-partialbrak', front: r`Partialbråksansats för $\dfrac{p(x)}{(x-a)^2}$ (dubbelrot)`, back: r`$\dfrac{A}{x-a} + \dfrac{B}{(x-a)^2}$, där $\int\frac{B}{(x-a)^2}dx = -\frac{B}{x-a}$.` },
  { id: 'u-pb-kvadr', kind: 'utantill', area: 'int-partialbrak', front: r`Partialbråksansats för $\dfrac{p(x)}{x(x^2+c)}$ ($c > 0$)`, back: r`$\dfrac{A}{x} + \dfrac{Bx+C}{x^2+c}$. Dela sedan upp: $\frac{Bx}{x^2+c}$ ger $\frac B2\ln(x^2+c)$, $\frac{C}{x^2+c}$ ger arctan.` },
  { id: 'u-pb-grad', kind: 'utantill', area: 'int-partialbrak', front: r`Första steget när gradtal täljare $\ge$ gradtal nämnare?`, back: r`**Polynomdivision!** Ex: $\frac{x^2}{x^2-1} = 1 + \frac{1}{x^2-1}$.` },
  { id: 'u-trig-sq', kind: 'utantill', area: 'int-trig', front: r`$\sin^2 x = \;?$ och $\cos^2 x = \;?$ (för integration)`, back: r`$\sin^2 x = \dfrac{1 - \cos 2x}{2}$, $\quad\cos^2 x = \dfrac{1 + \cos 2x}{2}$` },
  { id: 'u-huvudsats', kind: 'utantill', area: 'int-teori', front: r`Analysens huvudsats (båda delarna)`, back: r`Om $f$ är kontinuerlig och $S(x) = \int_a^x f(t)\,dt$ så är $S'(x) = f(x)$. Insättningsformeln: $\int_a^b f(x)\,dx = F(b) - F(a)$ där $F' = f$.` },
  { id: 'u-deriv-int', kind: 'utantill', area: 'int-teori', front: r`$\dfrac{d}{dx}\displaystyle\int_a^{g(x)} f(t)\,dt = \;?$`, back: r`$f(g(x))\cdot g'(x)$ (huvudsatsen + kedjeregeln)` },
  { id: 'u-gen-p', kind: 'utantill', area: 'int-generaliserade', front: r`För vilka $p$ konvergerar $\displaystyle\int_1^\infty\frac{dx}{x^p}$ resp. $\displaystyle\int_0^1\frac{dx}{x^p}$?`, back: r`$\int_1^\infty$: konvergent $\iff p > 1$. $\int_0^1$: konvergent $\iff p < 1$.` },
  { id: 'u-jamfor', kind: 'utantill', area: 'int-generaliserade', front: r`Jämförelsesatsen för generaliserade integraler`, back: r`Om $0 \le f(x) \le g(x)$: $\int g$ konvergent ⇒ $\int f$ konvergent; $\int f$ divergent ⇒ $\int g$ divergent.` },
  { id: 'u-skiv', kind: 'utantill', area: 'tillamp-volym', front: r`Rotationsvolym kring $x$-axeln (skivmetoden)`, back: r`$V = \pi\displaystyle\int_a^b f(x)^2\,dx$` },
  { id: 'u-ror', kind: 'utantill', area: 'tillamp-volym', front: r`Rotationsvolym kring $y$-axeln (F8)`, back: r`Skiva vågrätt: lös ut $x=x(y)$. $dV=A(y)\,dy$ med $A(y)=\pi x(y)^2$ (cirkelskiva) eller $\pi(x_{yttre}^2-x_{inre}^2)$ (ring). Rörformeln ingår inte.` },
  { id: 'u-area', kind: 'utantill', area: 'tillamp-area', front: r`Area mellan två kurvor`, back: r`$A = \displaystyle\int_a^b (\text{övre} - \text{undre})\,dx$, gränser = skärningspunkter. Byter kurvorna plats: dela upp intervallet.` },
  { id: 'u-belopp-arg', kind: 'utantill', area: 'komplexa-rakna', front: r`$|z|$, $\arg z$ och $\bar z$ för $z = a + bi$`, back: r`$|z| = \sqrt{a^2+b^2}$, $\tan(\arg z) = \frac ba$ (kolla kvadranten!), $\bar z = a - bi$, $z\bar z = |z|^2$.` },
  { id: 'u-euler', kind: 'utantill', area: 'komplexa-rakna', front: r`Eulers formel och de Moivres formel`, back: r`$e^{i\theta} = \cos\theta + i\sin\theta$. $(re^{i\theta})^n = r^ne^{in\theta}$. Vid multiplikation: belopp multipliceras, argument adderas.` },
  { id: 'u-cirkel', kind: 'utantill', area: 'komplexa-geometri', front: r`Vad beskriver $|z - z_0| = r$ och $|z - z_0| \le r$?`, back: r`Cirkeln resp. slutna cirkelskivan med medelpunkt $z_0$ och radie $r$. OBS: $|z + 1 - i| = |z - (-1 + i)|$, medelpunkt $-1 + i$.` },
  { id: 'u-binom', kind: 'utantill', area: 'komplexa-ekvationer', front: r`Hur löser man $z^n = w$?`, back: r`$z = re^{i\theta}$, $w = |w|e^{i\varphi}$. $r = |w|^{1/n}$, $\theta = \frac{\varphi + 2\pi k}{n}$, $k = 0,\dots,n-1$. $n$ rötter jämnt fördelade på en cirkel.` },
  { id: 'u-kvadrat', kind: 'utantill', area: 'komplexa-ekvationer', front: r`Hur löser man $z^2 = a + bi$ när vinkeln inte är "snäll"?`, back: r`Sätt $z = x + iy$: $x^2 - y^2 = a$, $2xy = b$, och $x^2 + y^2 = \sqrt{a^2+b^2}$. Addera/subtrahera.` },
  { id: 'u-konj-rot', kind: 'utantill', area: 'komplexa-ekvationer', front: r`Polynom med reella koefficienter har roten $z_0 = a + bi$. Vad följer?`, back: r`$\bar z_0 = a - bi$ är också rot, så $(z - z_0)(z - \bar z_0) = z^2 - 2az + a^2 + b^2$ är en faktor (faktorsatsen + polynomdivision).` },
  { id: 'u-intfaktor', kind: 'utantill', area: 'de1-linjar', front: r`Lös $y' + g(x)y = h(x)$`, back: r`Integrerande faktor $e^{G(x)}$, $G' = g$: $\left(e^{G(x)}y\right)' = e^{G(x)}h(x)$. Integrera båda led och dela med $e^{G(x)}$.` },
  { id: 'u-separabel', kind: 'utantill', area: 'de1-separabel', front: r`Lös $y' = f(x)g(y)$`, back: r`Separera: $\displaystyle\int\frac{dy}{g(y)} = \int f(x)\,dx$. Glöm inte konstanten och kontrollera ev. konstanta lösningar $g(y) = 0$.` },
  { id: 'u-kar', kind: 'utantill', area: 'de2-homogen', front: r`$y'' + ay' + by = 0$: de tre fallen`, back: r`Kar. ekv. $r^2 + ar + b = 0$. Reella olika: $C_1e^{r_1x} + C_2e^{r_2x}$. Dubbelrot: $(C_1 + C_2x)e^{rx}$. Komplexa $\alpha \pm \beta i$: $e^{\alpha x}(C_1\cos\beta x + C_2\sin\beta x)$.` },
  { id: 'u-ansats', kind: 'utantill', area: 'de2-partikular', front: r`Ansatser för partikulärlösning`, back: r`Polynom grad $n$ → polynom grad $n$. $Ce^{ax}$ → $Ae^{ax}$. $\sin kx$ / $\cos kx$ → $A\cos kx + B\sin kx$ (båda!). **Krock** med $y_h$ → multiplicera med $x$ (ev. $x^2$).` },
  { id: 'u-geom', kind: 'utantill', area: 'taylor-serier', front: r`Geometrisk serie $\displaystyle\sum_{k=0}^\infty x^k$`, back: r`$= \dfrac{1}{1-x}$ för $|x| < 1$ (divergent annars).` },
  { id: 'u-ordo', kind: 'utantill', area: 'taylor-serier', front: r`Räkneregler för $x^nB(x)$ (ordo)`, back: r`$x^mB_1(x) + x^nB_2(x) = x^{\min(m,n)}B(x)$; $x^mB_1(x)\cdot x^nB_2(x) = x^{m+n}B(x)$; $c\cdot x^nB(x) = x^nB(x)$; $x^k\cdot x^nB(x) = x^{n+k}B(x)$.` },
  { id: 'u-taylor-ordning', kind: 'utantill', area: 'taylor-gransvarde', front: r`Hur långt ska man utveckla vid ett gränsvärde $\lim_{x\to0}$?`, back: r`Tills täljare och nämnare får samma lägsta grad (första nollskilda term). Bryt ut den potensen och låt $x \to 0$.` },
]

/** Snabba sant/falskt-kort (förberedelse för ja/nej-uppgiften). */
const JANEJ: Card[] = [
  { id: 'jn-1', kind: 'janej', area: 'int-generaliserade', front: r`Sant eller falskt: $\displaystyle\int_{-1}^1\frac{1}{x^2}\,dx = -2$.`, back: r`**Falskt.** Singularitet i $x = 0$ inne i intervallet → generaliserad och divergent.` },
  { id: 'jn-2', kind: 'janej', area: 'int-generaliserade', front: r`Sant eller falskt: $\displaystyle\int_1^\infty\frac{1}{\sqrt x}\,dx$ är konvergent.`, back: r`**Falskt.** $p = \frac12 \le 1$ → divergent.` },
  { id: 'jn-3', kind: 'janej', area: 'int-generaliserade', front: r`Sant eller falskt: $\displaystyle\int_0^\infty\cos x\,dx$ är konvergent.`, back: r`**Falskt.** $\int_0^R\cos x\,dx = \sin R$ saknar gränsvärde.` },
  { id: 'jn-4', kind: 'janej', area: 'int-generaliserade', front: r`Sant eller falskt: $\displaystyle\int_0^1\frac{1}{\sqrt x}\,dx = 2$.`, back: r`**Sant.** $p = \frac12 < 1$ på $(0,1]$; $[2\sqrt x]_\varepsilon^1 \to 2$.` },
  { id: 'jn-5', kind: 'janej', area: 'komplexa-geometri', front: r`Sant eller falskt: $|z + 2 - i| = 3$ är en cirkel med medelpunkt $2 - i$.`, back: r`**Falskt.** $|z - (-2 + i)| = 3$: medelpunkt $-2 + i$, radie 3.` },
  { id: 'jn-6', kind: 'janej', area: 'komplexa-geometri', front: r`Sant eller falskt: $|z + e^{-i\pi/2}| = 2$ är cirkeln med medelpunkt $-i$.`, back: r`**Falskt.** $e^{-i\pi/2} = -i$, så $|z - i| = 2$: medelpunkt $+i$.` },
  { id: 'jn-7', kind: 'janej', area: 'komplexa-rakna', front: r`Sant eller falskt: multiplikation med $i$ vrider ett tal $90°$ moturs.`, back: r`**Sant.** $i = e^{i\pi/2}$, så argumentet ökar med $\frac\pi2$ och beloppet är oförändrat.` },
  { id: 'jn-8', kind: 'janej', area: 'komplexa-rakna', front: r`Sant eller falskt: $\arg(-1 - i) = \frac\pi4$.`, back: r`**Falskt.** $-1 - i$ ligger i tredje kvadranten: $\arg = \frac{5\pi}{4}$ (eller $-\frac{3\pi}4$). $\arctan\frac ba$ räcker inte – rita!` },
  { id: 'jn-9', kind: 'janej', area: 'de1-linjar', front: r`Sant eller falskt: $y' - \frac yx = 3$ har integrerande faktor $\frac1x$ ($x > 0$).`, back: r`**Sant.** $G(x) = -\ln x$, $e^{G} = \frac1x$.` },
  { id: 'jn-10', kind: 'janej', area: 'de1-linjar', front: r`Sant eller falskt: $y' + 2xy = x$ har integrerande faktor $e^{2x}$.`, back: r`**Falskt.** $G(x) = x^2$, faktorn är $e^{x^2}$.` },
  { id: 'jn-11', kind: 'janej', area: 'de1-separabel', front: r`Sant eller falskt: $y' = x + y$ är separabel.`, back: r`**Falskt.** Högerledet kan inte skrivas som $f(x)g(y)$. Den är linjär: $y' - y = x$.` },
  { id: 'jn-12', kind: 'janej', area: 'de2-partikular', front: r`Sant eller falskt: för $y'' - y = e^x$ fungerar ansatsen $y_p = Ae^x$.`, back: r`**Falskt.** $r = \pm1$, så $e^x$ löser den homogena ekvationen → ansats $Axe^x$.` },
  { id: 'jn-13', kind: 'janej', area: 'int-teori', front: r`Sant eller falskt: $\dfrac{d}{dx}\displaystyle\int_0^{x^2}\sin t\,dt = \sin x^2$.`, back: r`**Falskt.** Kedjeregeln: $2x\sin x^2$.` },
  { id: 'jn-14', kind: 'janej', area: 'taylor-serier', front: r`Sant eller falskt: $\displaystyle\sum_{k=0}^\infty\left(\frac{3}{2}\right)^k$ är konvergent.`, back: r`**Falskt.** Geometrisk serie med $|q| = \frac32 \ge 1$ → divergent.` },
  { id: 'jn-15', kind: 'janej', area: 'int-teori', front: r`Sant eller falskt: om $f$ är kontinuerlig och $\int_{-a}^a f(x)\,dx = 0$ så är $f$ udda.`, back: r`**Falskt.** Udda ⇒ integralen 0, men inte omvänt (t.ex. $f(x) = x^2 - \frac{a^2}{3}$).` },
]

/** Metodkort: "vad gör jag när jag ser …?" */
const METOD: Card[] = [
  { id: 'm-int-produkt', kind: 'metod', area: 'int-partiell', front: r`Du ser $\int x^n e^{kx}$, $\int x^n\sin kx$ eller $\int x^n\ln x$. Metod?`, back: r`**Partialintegration.** Derivera polynomet – utom med $\ln x$, då deriveras $\ln x$.` },
  { id: 'm-int-inre', kind: 'metod', area: 'int-variabelbyte', front: r`Du ser $\int f(g(x))\,g'(x)\,dx$, t.ex. $\int x^2\cos x^3\,dx$. Metod?`, back: r`**Variabelbyte** $u = g(x)$ (inre derivatan syns, ev. på en konstant när).` },
  { id: 'm-int-rationell', kind: 'metod', area: 'int-partialbrak', front: r`Du ser $\int\frac{p(x)}{q(x)}dx$ (rationell funktion). Ordning på stegen?`, back: r`1) Grad $p \ge$ grad $q$? → polynomdivision. 2) Faktorisera $q$. 3) Partialbråksansats (enkla, dubbelrot, $\frac{Bx+C}{x^2+c}$). 4) Integrera termvis.` },
  { id: 'm-int-ekv', kind: 'metod', area: 'int-partiell', front: r`$\int e^{ax}\cos bx\,dx$ – metod?`, back: r`Partialintegration två gånger (integrera $e^{ax}$ båda gångerna), **ekvationstricket**: $I = \dots - cI$, lös ut $I$.` },
  { id: 'm-kompl-ekv', kind: 'metod', area: 'komplexa-ekvationer', front: r`Ekvation med både $z$ och $\bar z$. Metod?`, back: r`Sätt $z = a + bi$, identifiera real- och imaginärdel → linjärt ekvationssystem.` },
  { id: 'm-de1-val', kind: 'metod', area: 'de1-linjar', front: r`DE ordning 1: hur avgör du linjär vs separabel?`, back: r`Linjär: $y' + g(x)y = h(x)$ ($y$ och $y'$ i första grad) → integrerande faktor. Separabel: $y' = f(x)g(y)$ → separera. Vissa (t.ex. $y' = ky$) är båda.` },
  { id: 'm-de-tillamp', kind: 'metod', area: 'de1-tillampning', front: r`"Hastigheten är proportionell mot …" – hur ställer du upp DE:n?`, back: r`Hastighet = derivata. "Proportionell mot $X$" = $kX$. Minskar → minustecken (eller $k < 0$). Ex: $h' = -k\sqrt h$, $T' = k(T - T_{\text{ute}})$, $N' = kN$.` },
  { id: 'm-taylor-sub', kind: 'metod', area: 'taylor-utveckling', front: r`Maclaurin för $\cos x^2$, $e^{-x^2}$, $\ln(1+2x)$ – smartaste metoden?`, back: r`Sätt in i standardutvecklingen ($t = x^2$, $t = -x^2$, $t = 2x$). Derivera inte!` },
]

/** "Testa dig själv"-frågor från föreläsningsanteckningarna. */
const FORELASNING: Card[] = Object.values(LECTURES).flatMap((l) => l.quiz.map((q) => ({ id: q.id, kind: 'forelasning' as const, area: q.area, front: `**${l.id}:** ${q.q}`, back: q.a })))

export const CARDS: Card[] = [...UTANTILL, ...JANEJ, ...METOD, ...FORELASNING]
export const CARD_BY_ID = Object.fromEntries(CARDS.map((c) => [c.id, c])) as Record<string, Card>
