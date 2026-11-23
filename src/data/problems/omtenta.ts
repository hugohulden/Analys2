import type { Problem } from '../types'

const r = String.raw

const FIG_S = { src: 'figurer/omtenta-4.png', alt: 'Graf till f(t): −1 på [−2,1], linjär upp till (2,1), till (3,2), ned till (4,1), sedan 1 till t = 5' }
const S_PREAMBLE = r`Låt $S(x) = \displaystyle\int_{-2}^x f(t)\,dt$, $-2 \le x \le 5$, där grafen till $f$ ges i figuren (en ruta = $\tfrac12$ enhet).`
const S_READ = r`Avläsning av grafen (2 rutor per enhet): $f = -1$ på $[-2,1]$; rät linje från $(1,-1)$ till $(2,1)$; från $(2,1)$ till $(3,2)$; från $(3,2)$ till $(4,1)$; $f = 1$ på $[4,5]$.`

export const OMTENTA_PROBLEMS: Problem[] = [
  {
    id: 'om-1a', source: 'omtenta-ht25', number: '1a', slot: 1, areas: ['komplexa-rakna'], points: 2,
    statement: r`Låt $u = i - 1$, $w = 1 + 2i$. Skriv $\dfrac uw$ på formen $a + bi$. Ange svaret på så förenklad form som möjligt.`,
    hint: r`Förläng med $\bar w = 1 - 2i$.`,
    method: r`**Division**: förläng med konjugatet.`,
    steps: [
      r`$$\frac{-1+i}{1+2i} = \frac{(-1+i)(1-2i)}{(1+2i)(1-2i)} = \frac{-1 + 2i + i - 2i^2}{5} = \frac{1 + 3i}{5}.$$`,
    ],
    answer: r`$\dfrac15 + \dfrac35 i$`,
    checks: ["eq('(I-1)/(1+2*I)', '1/5 + 3*I/5')"],
  },
  {
    id: 'om-1b', source: 'omtenta-ht25', number: '1b', slot: 1, areas: ['komplexa-rakna'], points: 3,
    statement: r`Låt $u = i - 1$. Skriv $u^{10}$ på polär form med ett argument mellan $0$ och $2\pi$.`,
    hint: r`Skriv $u$ på polär form först. Rita $u$: vilken kvadrant?`,
    method: r`**Polär form + de Moivre**: $u = re^{i\theta} \Rightarrow u^{10} = r^{10}e^{10i\theta}$. Reducera argumentet modulo $2\pi$.`,
    steps: [
      r`$u = -1 + i$: $|u| = \sqrt2$, $u$ ligger i andra kvadranten med $\arg u = \frac{3\pi}{4}$. Så $u = \sqrt2 e^{3\pi i/4}$.`,
      r`$$u^{10} = (\sqrt2)^{10}e^{i\cdot 30\pi/4} = 32e^{i\,15\pi/2}.$$`,
      r`$\frac{15\pi}{2} - 3\cdot 2\pi = \frac{3\pi}{2}$, så $u^{10} = 32e^{i\,3\pi/2}$.`,
      r`*Kontroll:* $u^2 = (-1+i)^2 = 1 - 2i - 1 = -2i$, $u^{10} = (-2i)^5 = -32i = 32e^{3\pi i/2}$ ✓`,
    ],
    answer: r`$u^{10} = 32e^{i\,3\pi/2}$ $\;(= -32i)$`,
    checks: ["eq('(I-1)**10', '32*exp(3*pi*I/2)')"],
  },
  {
    id: 'om-2a', source: 'omtenta-ht25', number: '2a', slot: 2, areas: ['komplexa-ekvationer'], points: 2,
    statement: r`Lös ekvationen $2z + i\bar z = 2i - 5$.`,
    hint: r`När både $z$ och $\bar z$ finns med: sätt $z = a + bi$.`,
    method: r`**Ekvation med $z$ och $\bar z$**: sätt $z = a + bi$, $\bar z = a - bi$, och identifiera real- och imaginärdel → linjärt ekvationssystem.`,
    steps: [
      r`$z = a + bi$: $2(a + bi) + i(a - bi) = 2a + 2bi + ai + b = (2a + b) + (a + 2b)i$.`,
      r`Jämför med $-5 + 2i$: $\begin{cases} 2a + b = -5 \\ a + 2b = 2\end{cases}$.`,
      r`Första: $b = -5 - 2a$. Insatt: $a - 10 - 4a = 2 \Rightarrow a = -4$, $b = 3$.`,
      r`*Kontroll:* $2(-4 + 3i) + i(-4 - 3i) = -8 + 6i - 4i + 3 = -5 + 2i$ ✓`,
    ],
    answer: r`$z = -4 + 3i$`,
    checks: ["eq('2*(-4+3*I) + I*conjugate(-4+3*I)', '2*I - 5')"],
  },
  {
    id: 'om-2b', source: 'omtenta-ht25', number: '2b', slot: 2, areas: ['komplexa-ekvationer'], points: 3,
    statement: r`Ekvationen $z^3 - 2z^2 + 4z - 8 = 0$ har en rot $z = 2i$. Lös ekvationen fullständigt.`,
    hint: r`Reella koefficienter ⇒ $\overline{2i} = -2i$ är också en rot. Dividera bort $(z-2i)(z+2i) = z^2 + 4$.`,
    method: r`**Polynom med reella koefficienter**: icke-reella rötter kommer i konjugerade par. Faktorsatsen + polynomdivision.`,
    steps: [
      r`Polynomet har reella koefficienter, så även $z = -2i$ är en rot. Då är $(z - 2i)(z + 2i) = z^2 + 4$ en faktor.`,
      r`Polynomdivision (eller faktorisering): $z^3 - 2z^2 + 4z - 8 = z^2(z - 2) + 4(z - 2) = (z^2 + 4)(z - 2)$.`,
      r`Rötterna är alltså $z = \pm 2i$ och $z = 2$.`,
    ],
    answer: r`$z = 2,\; z = 2i,\; z = -2i$`,
    checks: ["roots_ok('z**3 - 2*z**2 + 4*z - 8', ['2', '2*I', '-2*I'])"],
  },
  {
    id: 'om-3a', source: 'omtenta-ht25', number: '3a', slot: 3, areas: ['int-partiell'], points: 3,
    statement: r`Beräkna $\displaystyle\int_0^{\ln 3} xe^{-x}\,dx$.`,
    hint: r`Derivera $x$. Kom ihåg $e^{-\ln 3} = \frac13$.`,
    method: r`**Partialintegration** (polynom · exponential).`,
    steps: [
      r`$$\int_0^{\ln3} xe^{-x}\,dx = \Big[-xe^{-x}\Big]_0^{\ln 3} + \int_0^{\ln 3}e^{-x}\,dx = \Big[-xe^{-x} - e^{-x}\Big]_0^{\ln 3}.$$`,
      r`Med $e^{-\ln 3} = \frac13$: $\left(-\frac{\ln 3}{3} - \frac13\right) - (0 - 1) = \frac23 - \frac{\ln 3}{3}$.`,
    ],
    answer: r`$\dfrac{2 - \ln 3}{3}$`,
    checks: ["defint('x*exp(-x)', 0, 'log(3)', '(2 - log(3))/3')"],
  },
  {
    id: 'om-3b', source: 'omtenta-ht25', number: '3b', slot: 3, areas: ['int-variabelbyte', 'int-trig'], points: 3,
    statement: r`Bestäm $\displaystyle\int \tan x\,dx$.`,
    hint: r`$\tan x = \frac{\sin x}{\cos x}$. Vad är derivatan av $\cos x$?`,
    method: r`Skriv om och använd **variabelbyte** $u = \cos x$ (eller $\int\frac{f'}{f} = \ln|f|$).`,
    steps: [
      r`$\int\tan x\,dx = \int\frac{\sin x}{\cos x}\,dx$. Sätt $u = \cos x$, $du = -\sin x\,dx$:`,
      r`$$\int\frac{\sin x}{\cos x}\,dx = -\int\frac{du}{u} = -\ln|u| + C = -\ln|\cos x| + C.$$`,
      r`*Kontroll:* $\frac{d}{dx}(-\ln|\cos x|) = -\frac{-\sin x}{\cos x} = \tan x$ ✓`,
    ],
    answer: r`$-\ln|\cos x| + C$`,
    checks: ["antider('-log(cos(x))', 'tan(x)')"],
  },
  {
    id: 'om-3c', source: 'omtenta-ht25', number: '3c', slot: 3, areas: ['int-partialbrak'], points: 3,
    statement: r`Bestäm $\displaystyle\int \frac{8}{4x + x^3}\,dx$.`,
    hint: r`$4x + x^3 = x(x^2 + 4)$.`,
    method: r`**Partialbråk**: $\frac{A}{x} + \frac{Bx + C}{x^2 + 4}$.`,
    steps: [
      r`$8 = A(x^2 + 4) + (Bx + C)x$. Konstant: $4A = 8 \Rightarrow A = 2$. $x^2$: $A + B = 0 \Rightarrow B = -2$. $x$: $C = 0$.`,
      r`$$\int\left(\frac2x - \frac{2x}{x^2+4}\right)dx = 2\ln|x| - \ln(x^2+4) + C.$$`,
    ],
    answer: r`$2\ln|x| - \ln(x^2+4) + C$`,
    checks: ["antider('2*log(x) - log(x**2+4)', '8/(4*x + x**3)')"],
  },
  {
    id: 'om-4a', source: 'omtenta-ht25', number: '4a', slot: 4, areas: ['int-teori'], points: 1,
    statement: S_PREAMBLE + r`

a) Beräkna $S(0)$.`,
    figures: [FIG_S],
    hint: r`$S(0)$ är den *signerade* arean mellan grafen och $t$-axeln från $-2$ till $0$.`,
    method: r`**Integral som signerad area**: area under $t$-axeln räknas negativt.`,
    steps: [S_READ, r`$S(0) = \int_{-2}^0 (-1)\,dt = -2$ (en rektangel med bredd 2 och höjd $-1$).`],
    answer: r`$S(0) = -2$`,
    checks: ["eq('integrate(f_omtenta(t), (t, -2, 0))', '-2')"],
  },
  {
    id: 'om-4b', source: 'omtenta-ht25', number: '4b', slot: 4, areas: ['int-teori'], points: 2,
    statement: S_PREAMBLE + r`

b) Beräkna $S(5)$.`,
    figures: [FIG_S],
    hint: r`Dela upp i rektanglar och trianglar/trapets och räkna signerad area.`,
    method: r`**Integral som signerad area**, uppdelad i enkla geometriska figurer.`,
    steps: [
      S_READ,
      r`$[-2,1]$: rektangel, $-1\cdot 3 = -3$.`,
      r`$[1,2]$: linjen går från $-1$ till $1$ och skär axeln i $t = 1{,}5$; två trianglar med area $\frac14$ var och olika tecken → summa $0$.`,
      r`$[2,3]$: trapets med höjder 1 och 2: $\frac{1+2}{2} = 1{,}5$. $[3,4]$: trapets $\frac{2+1}{2} = 1{,}5$. $[4,5]$: rektangel $1$.`,
      r`$S(5) = -3 + 0 + 1{,}5 + 1{,}5 + 1 = 1$.`,
    ],
    answer: r`$S(5) = 1$`,
    checks: ["eq('integrate(f_omtenta(t), (t, -2, 5))', '1')"],
  },
  {
    id: 'om-4c', source: 'omtenta-ht25', number: '4c', slot: 4, areas: ['int-teori'], points: 2,
    statement: S_PREAMBLE + r`

c) Lös ekvationen $S(x) = 0$.`,
    figures: [FIG_S],
    hint: r`$S(-2) = 0$ alltid. $S$ avtar så länge $f < 0$ och växer när $f > 0$. Var har den samlade arean blivit noll igen?`,
    method: r`**$S' = f$** (huvudsatsen): $S$ avtar där $f<0$ och växer där $f>0$. Följ den ackumulerade arean steg för steg.`,
    steps: [
      S_READ,
      r`$S(-2) = 0$ (tomt intervall) – en lösning.`,
      r`På $(-2, 1{,}5)$ är $f < 0$, så $S$ avtar strikt och är negativ: $S(1) = -3$, $S(1{,}5) = -3 - \frac14 = -3{,}25$.`,
      r`På $(1{,}5, 5]$ är $f > 0$, så $S$ växer strikt. Ackumulerat: $S(2) = -3$, $S(3) = -1{,}5$, $S(4) = -1{,}5 + 1{,}5 = 0$.`,
      r`Eftersom $S$ är strikt växande där finns ingen annan nollpunkt, och $S(5) = 1 > 0$.`,
      r`Lösningar: $x = -2$ och $x = 4$.`,
    ],
    answer: r`$x = -2$ och $x = 4$`,
    checks: ["eq('integrate(f_omtenta(t), (t, -2, 4))', '0')", "is_true('all(integrate(f_omtenta(t), (t, -2, Rational(p,10))) != 0 for p in range(-19, 50) if p != 40)')"],
  },
  {
    id: 'om-5a', source: 'omtenta-ht25', number: '5a', slot: 6, areas: ['tillamp-massa'], points: 2,
    statement: r`En tråd spänns mellan positionerna $0$ m och $2$ m på $x$-axeln. Densiteten är $\rho(x) = 2 + x + ax^2$ g/m, där $a > -1$.

a) Bestäm trådens massa i fallet $a = 0$.`,
    hint: r`$m = \int \rho(x)\,dx$.`,
    method: r`**Massa** för endimensionell kropp: $dm = \rho(x)\,dx$, $m = \int_0^2\rho(x)\,dx$.`,
    steps: [r`$$m = \int_0^2(2 + x)\,dx = \Big[2x + \frac{x^2}{2}\Big]_0^2 = 4 + 2 = 6 \text{ g}.$$`],
    answer: r`$m = 6$ g`,
    checks: ["defint('2 + x', 0, 2, '6')"],
  },
  {
    id: 'om-5b', source: 'omtenta-ht25', number: '5b', slot: 6, areas: ['tillamp-massa'], points: 2,
    statement: r`(Forts. tråden, $\rho(x) = 2 + x$.) b) Bestäm trådens masscentrum i fallet $a = 0$.`,
    hint: r`$x_T = \frac1m\int x\,dm$ (formelbladet).`,
    method: r`**Masscentrum**: $x_T = \frac1m\int_0^2 x\rho(x)\,dx$.`,
    steps: [
      r`$$\int_0^2 x(2 + x)\,dx = \Big[x^2 + \frac{x^3}{3}\Big]_0^2 = 4 + \frac83 = \frac{20}{3}.$$`,
      r`$x_T = \frac{1}{6}\cdot\frac{20}{3} = \frac{10}{9}$ m. (Rimligt: lite till höger om mitten eftersom tråden är tyngre till höger.)`,
    ],
    answer: r`$x_T = \dfrac{10}{9}$ m`,
    checks: ["eq('integrate(x*(2+x), (x, 0, 2))/integrate(2+x, (x, 0, 2))', '10/9')"],
  },
  {
    id: 'om-5c', source: 'omtenta-ht25', number: '5c', slot: 6, areas: ['tillamp-massa'], points: 2,
    statement: r`(Forts. tråden, $\rho(x) = 2 + x + ax^2$, $a > -1$.) c) Bestäm $a$ så att trådens masscentrum ges av $x = 1$.`,
    hint: r`Ställ upp $x_T(a) = 1$, dvs. $\int x\rho\,dx = 1\cdot\int\rho\,dx$.`,
    method: r`Masscentrum som funktion av $a$; lös ekvationen $x_T(a) = 1$.`,
    steps: [
      r`$m(a) = \int_0^2(2 + x + ax^2)\,dx = 6 + \frac{8a}{3}$.`,
      r`$\int_0^2 x(2 + x + ax^2)\,dx = \frac{20}{3} + a\Big[\frac{x^4}{4}\Big]_0^2 = \frac{20}{3} + 4a$.`,
      r`$x_T = 1 \iff \frac{20}{3} + 4a = 6 + \frac{8a}{3} \iff \frac{4a}{3} = -\frac23 \iff a = -\frac12$, vilket uppfyller $a > -1$.`,
    ],
    answer: r`$a = -\dfrac12$`,
    checks: ["eq('solve(integrate(x*(2+x+a*x**2),(x,0,2)) - integrate(2+x+a*x**2,(x,0,2)), a)[0]', '-1/2')"],
  },
  {
    id: 'om-6', source: 'omtenta-ht25', number: '6', slot: 5, areas: ['int-generaliserade', 'komplexa-geometri', 'de1-linjar'], points: 5,
    pointSteps: [0, 1, 3, 5],
    statement: r`Endast svar (ja/nej). 5 rätt ger 5 p, 4 rätt 3 p, 3 rätt 1 p, 0–2 rätt 0 p.

a) Cirkeln i figur 2 kan beskrivas med ekvationen $|z + e^{-i\pi/2}| = 2$.

b) De komplexa talen i figur 3 uppfyller $w = i\bar u$.

c) Den generaliserade integralen $\displaystyle\int_0^\infty \frac{\cos x}{\sin^2 x + 1}\,dx$ är konvergent.

d) Det gäller att $\displaystyle\int_{-1}^1 \frac{1}{x^2}\,dx = -2$.

e) Differentialekvationen $y' - \frac yx = 3$ är linjär med integrerande faktor $\frac1x$.`,
    figures: [{ src: 'figurer/omtenta-6-fig2.png', alt: 'Figur 2: cirkel med medelpunkt −i och radie 2' }, { src: 'figurer/omtenta-6-fig3.png', alt: 'Figur 3: u = −2 + i och w = 1 − 2i' }],
    hint: r`a) Vad är $e^{-i\pi/2}$? b) Läs av $u$ och $w$ noga (en ruta = 1). c) Primitiv: $\arctan(\sin x)$. d) Var är integranden inte definierad? e) $e^{G(x)}$ med $G' = -\frac1x$.`,
    method: r`Snabbkoll av fällor: **cirkelns ekvation** $|z - z_0| = r$, **konjugat och multiplikation med $i$** (rotation $90°$), **generaliserad integral** (gränsvärdet måste existera; singularitet *inne i* intervallet), **integrerande faktor**.`,
    steps: [
      r`**a) Nej.** $e^{-i\pi/2} = -i$, så $|z + e^{-i\pi/2}| = |z - i| = 2$ är cirkeln med medelpunkt $+i$. Cirkeln i figur 2 har medelpunkt $-i$ och radie 2 (den beskrivs av $|z + i| = 2$).`,
      r`**b) Ja.** Avläst (figur 3, visas under lösningen): $u = -2 + i$, $w = 1 - 2i$. $\bar u = -2 - i$ och $i\bar u = -2i - i^2 = 1 - 2i = w$ ✓`,
      r`**c) Nej.** $\int_0^R \frac{\cos x}{\sin^2 x + 1}\,dx = \Big[\arctan(\sin x)\Big]_0^R = \arctan(\sin R)$, som pendlar mellan $\pm\frac\pi4$ och saknar gränsvärde då $R\to\infty$ → divergent.`,
      r`**d) Nej.** $\frac1{x^2}$ är obegränsad vid $x = 0$ *inne i* intervallet, så integralen är generaliserad: $\int_0^1 x^{-2}dx = \lim_{\varepsilon\to0^+}\left(\frac1\varepsilon - 1\right) = \infty$ → divergent. (Att svaret skulle bli negativt för en positiv integrand är också en varningsflagga.)`,
      r`**e) Ja.** $y' - \frac1x y = 3$ är linjär, $g(x) = -\frac1x$, $G(x) = -\ln x$ ($x > 0$), integrerande faktor $e^{-\ln x} = \frac1x$. Kontroll: $\left(\frac yx\right)' = \frac{y'}{x} - \frac{y}{x^2} = \frac1x\left(y' - \frac yx\right)$ ✓`,
      r`Svar: a) Nej, b) Ja, c) Nej, d) Nej, e) Ja.`,
    ],
    answer: r`a) Nej  b) Ja  c) Nej  d) Nej  e) Ja`,
    checks: [
      "eq('exp(-I*pi/2)', '-I')",
      "eq('I*conjugate(-2+I)', '1-2*I')",
      "eq('integrate(cos(x)/(sin(x)**2+1), (x, 0, R))', 'atan(sin(R))')",
      "eq('integrate(1/x**2, (x, 0, 1))', 'oo')",
      "eq('simplify(diff(y(x)/x, x) - (diff(y(x),x) - y(x)/x)/x)', '0')",
    ],
  },
  {
    id: 'om-7', source: 'omtenta-ht25', number: '7', slot: 7, areas: ['de1-tillampning', 'de1-separabel'], points: 5,
    statement: r`En 9 meter djup vattentank som är fylld upp till kanten börjar plötsligt läcka och vattennivån, i meter, minskar med en hastighet som är proportionell mot roten ur vattennivån, med proportionalitetskonstant $k = \frac14$ h$^{-1}$. Hur lång tid tar det innan tanken är tom?`,
    hint: r`$h' = -k\sqrt h$ – separabel. Glöm inte minustecknet (nivån *minskar*).`,
    method: r`Ställ upp DE:n (**tillämpning**), lös den som **separabel** DE, använd begynnelsevillkoret $h(0) = 9$ och lös $h(t) = 0$.`,
    steps: [
      r`Låt $h(t)$ vara vattennivån (m) efter $t$ timmar. Nivån minskar: $h' = -\frac14\sqrt h$, $h(0) = 9$.`,
      r`Separera (för $h > 0$): $\frac{dh}{\sqrt h} = -\frac14\,dt \Rightarrow \int h^{-1/2}\,dh = -\frac14\int dt \Rightarrow 2\sqrt h = -\frac t4 + C$.`,
      r`$h(0) = 9$: $2\cdot 3 = C \Rightarrow C = 6$. Alltså $\sqrt h = 3 - \frac t8$, dvs. $h(t) = \left(3 - \frac t8\right)^2$ för $0 \le t \le 24$.`,
      r`Tanken är tom när $h = 0$: $3 - \frac t8 = 0 \iff t = 24$.`,
    ],
    answer: r`$24$ timmar`,
    checks: ["ode_ok('Derivative(h(t),t) + sqrt(h(t))/4', '(3 - t/8)**2', func='h', var='t', domain=(0, 23))", "eq('(3 - 24/8)**2', '0')"],
  },
  {
    id: 'om-8', source: 'omtenta-ht25', number: '8', slot: 8, areas: ['de2-homogen'], points: 5,
    statement: r`Lös begynnelsevärdesproblemet $y'' + y' - 2y = 0$, $y(0) = 0$, $y'(0) = 6$.`,
    hint: r`Karakteristisk ekvation $r^2 + r - 2 = 0$. Bestäm sedan $C_1$, $C_2$ ur villkoren.`,
    method: r`**Homogen DE ordning 2**: två reella olika rötter ⇒ $y = C_1e^{r_1x} + C_2e^{r_2x}$. **Begynnelsevärden** ger ett ekvationssystem för $C_1, C_2$.`,
    steps: [
      r`$r^2 + r - 2 = (r - 1)(r + 2) = 0 \Rightarrow r = 1, -2$. Allmän lösning: $y = C_1e^x + C_2e^{-2x}$.`,
      r`$y' = C_1e^x - 2C_2e^{-2x}$.`,
      r`$y(0) = C_1 + C_2 = 0$, $y'(0) = C_1 - 2C_2 = 6$. Subtrahera: $3C_2 = -6 \Rightarrow C_2 = -2$, $C_1 = 2$.`,
      r`*Kontroll:* $y(0) = 2 - 2 = 0$, $y'(0) = 2 + 4 = 6$ ✓`,
    ],
    answer: r`$y = 2e^x - 2e^{-2x}$`,
    checks: ["ode_ok('Derivative(y(x),x,2) + Derivative(y(x),x) - 2*y(x)', '2*exp(x) - 2*exp(-2*x)')", "eq('(2*exp(x) - 2*exp(-2*x)).subs(x, 0)', '0')", "eq('diff(2*exp(x) - 2*exp(-2*x), x).subs(x, 0)', '6')"],
  },
  {
    id: 'om-9a', source: 'omtenta-ht25', number: '9a', slot: 9, areas: ['taylor-utveckling'], points: 2,
    statement: r`Bestäm Taylorpolynomet av ordning 3 i $x = \pi$ till $f(x) = \sin x$.`,
    hint: r`$p_3(x) = \sum_{k=0}^3\frac{f^{(k)}(\pi)}{k!}(x - \pi)^k$ (formelbladet).`,
    method: r`**Taylorpolynom**: beräkna $f, f', f'', f'''$ i $x = \pi$ och sätt in i formeln.`,
    steps: [
      r`$f(\pi) = \sin\pi = 0$, $f'(\pi) = \cos\pi = -1$, $f''(\pi) = -\sin\pi = 0$, $f'''(\pi) = -\cos\pi = 1$.`,
      r`$$p_3(x) = 0 - (x - \pi) + 0 + \frac{1}{3!}(x - \pi)^3 = -(x - \pi) + \frac{(x - \pi)^3}{6}.$$`,
    ],
    answer: r`$p_3(x) = -(x-\pi) + \dfrac{(x-\pi)^3}{6}$`,
    checks: ["taylor_ok('sin(x)', 'pi', 3, '-(x-pi) + (x-pi)**3/6')"],
  },
  {
    id: 'om-9b', source: 'omtenta-ht25', number: '9b', slot: 9, areas: ['taylor-gransvarde'], points: 3,
    statement: r`Använd Maclaurinutveckling för att beräkna $\displaystyle\lim_{x\to0}\frac{x^5}{x\ln(1+x^2) - x^3}$.`,
    hint: r`Täljaren har grad 5 – utveckla $\ln(1+t)$ med $t = x^2$ så att nämnaren får en $x^5$-term.`,
    method: r`**Gränsvärde med Maclaurin**: $\ln(1+t) = t - \frac{t^2}{2} + t^3B(t)$ med $t = x^2$.`,
    steps: [
      r`$\ln(1 + x^2) = x^2 - \frac{x^4}{2} + x^6B(x)$.`,
      r`$x\ln(1+x^2) - x^3 = x^3 - \frac{x^5}{2} + x^7B(x) - x^3 = -\frac{x^5}{2} + x^7B(x)$.`,
      r`$$\frac{x^5}{-\frac{x^5}{2} + x^7B(x)} = \frac{1}{-\frac12 + x^2B(x)} \to -2.$$`,
    ],
    answer: r`$-2$`,
    checks: ["lim_ok('x**5/(x*log(1+x**2) - x**3)', 0, '-2')"],
  },
]
