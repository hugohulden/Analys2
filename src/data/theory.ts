import type { AreaId } from './types'

const r = String.raw

export interface AreaTheory {
  summary: string
  method: string[]
  traps: string[]
  /** Ett kort löst exempel. */
  example: { q: string; a: string }
  /** Uppgifter i banken som fungerar som fler lösta exempel. */
  exampleProblems: string[]
}

export const THEORY: Record<AreaId, AreaTheory> = {
  'komplexa-rakna': {
    summary: r`Ett komplext tal $z = a + bi$ ($i^2 = -1$) har realdel $a$ och imaginärdel $b$. Konjugat $\bar z = a - bi$, belopp $|z| = \sqrt{a^2+b^2}$, $z\bar z = |z|^2$. Polär form: $z = re^{i\theta} = r(\cos\theta + i\sin\theta)$ med $r = |z|$, $\theta = \arg z$ (bestäms mod $2\pi$). Vid multiplikation multipliceras beloppen och argumenten adderas; de Moivre: $(re^{i\theta})^n = r^ne^{in\theta}$.`,
    method: [
      r`Division: förläng med nämnarens konjugat.`,
      r`Potenser/belopp/argument: gå över till polär form, använd räknereglerna.`,
      r`Bestäm argument med en skiss – kolla kvadranten, $\arctan\frac ba$ ensam räcker inte.`,
      r`Reducera argumentet till det efterfrågade intervallet (t.ex. $[0, 2\pi)$).`,
    ],
    traps: [r`Fel kvadrant för argumentet ($-1 + i$ har $\arg = \frac{3\pi}{4}$, inte $-\frac\pi4$).`, r`Räkna inte ut $u^6$ i rektangulär form när bara beloppet efterfrågas.`, r`Glöm inte $i^2 = -1$ i täljaren vid division.`],
    example: { q: r`Skriv $\frac{1+i}{1-i}$ på formen $a+bi$.`, a: r`$\frac{(1+i)^2}{(1-i)(1+i)} = \frac{2i}{2} = i$.` },
    exampleProblems: ['ht24-1a', 'ht24-1b', 'ht25-1b', 'om-1b'],
  },
  'komplexa-ekvationer': {
    summary: r`Binomiska ekvationer $z^n = w$ har exakt $n$ rötter, jämnt fördelade på cirkeln $|z| = |w|^{1/n}$. Andragradsekvationer löses med kvadratkomplettering; $z^2 = a + bi$ löses smidigt med $z = x + iy$. Ekvationer med $\bar z$ löses med $z = a + bi$. Polynom med reella koefficienter har icke-reella rötter i konjugerade par; faktorsatsen: $z_0$ rot ⇔ $(z - z_0)$ är en faktor.`,
    method: [
      r`$z^n = w$: polär form, $r^n = |w|$, $n\theta = \arg w + 2\pi k$, $k = 0..n-1$.`,
      r`$z^2 = a + bi$: $x^2 - y^2 = a$, $2xy = b$, $x^2 + y^2 = |a + bi|$.`,
      r`$z$ och $\bar z$: $z = a + bi$, jämför real- och imaginärdel.`,
      r`Given rot $z_0$ i reellt polynom: dividera med $(z - z_0)(z - \bar z_0)$.`,
    ],
    traps: [r`Bara en rot angiven till binomisk ekvation – alla $n$ ska med!`, r`Teckenval i $z^2 = a + bi$: $xy$ ska ha samma tecken som $b$.`, r`Konjugatregeln gäller bara om koefficienterna är reella.`],
    example: { q: r`Lös $z^2 = -4$.`, a: r`$z = \pm 2i$ (binomisk: $r = 2$, $\theta = \frac\pi2 + \pi k$).` },
    exampleProblems: ['ht24-2', 'ht25-2a', 'om-2a', 'om-2b'],
  },
  'komplexa-geometri': {
    summary: r`$|z - z_0|$ är avståndet mellan $z$ och $z_0$ i talplanet. $|z - z_0| = r$ är en cirkel, $\le r$ en sluten cirkelskiva, $|z - a| = |z - b|$ mittpunktsnormalen. $\arg z = \theta$ är en stråle från origo. Multiplikation med $i$ är en vridning $90°$ moturs; $\bar z$ är spegling i reella axeln.`,
    method: [r`Skriv om till formen $|z - z_0|$ (byt tecken inne i beloppet).`, r`Läs av medelpunkt och radie, rita (heldragen rand om $\le$, streckad om $<$).`, r`För punkter i figur: läs av rutnätet noga – kolla skalan!`],
    traps: [r`$|z + 1 - i| = 3$ har medelpunkt $-1 + i$, inte $1 - i$.`, r`$e^{-i\pi/2} = -i$, så $|z + e^{-i\pi/2}| = |z - i|$.`, r`Avläsning: i omtentans figur 3 är $u = -2 + i$ (två rutor till vänster).`],
    example: { q: r`Beskriv $|z - 2i| < 1$.`, a: r`Öppen cirkelskiva med medelpunkt $2i$ och radie 1 (randen ej med).` },
    exampleProblems: ['ht24-4a', 'ht25-2b', 'om-6'],
  },
  'int-primitiva': {
    summary: r`$F$ är en primitiv funktion till $f$ om $F' = f$. Alla primitiver skiljer sig med en konstant: skriv alltid $+C$. Standardprimitiverna måste kunnas utantill (bara $\int\frac{dx}{\sqrt{x^2+a}}$ står på formelbladet). Kontroll: derivera svaret.`,
    method: [r`Skriv om integranden till summor av standardfunktioner (potenser, $e^{kx}$, $\sin$, $\cos$, $\frac{1}{1+x^2}$).`, r`Använd linjäritet: $\int(af + bg) = a\int f + b\int g$.`, r`Kontrollera genom derivering.`],
    traps: [r`$\int\frac1x\,dx = \ln|x|$ (absolutbelopp).`, r`$\int e^{kx}dx = \frac1ke^{kx}$ – glöm inte $\frac1k$.`, r`$\int x^{-1}$ är inte $\frac{x^0}{0}$.`],
    example: { q: r`$\int\left(3x^2 + \frac{2}{x} + e^{2x}\right)dx$`, a: r`$x^3 + 2\ln|x| + \frac12e^{2x} + C$` },
    exampleProblems: ['d1A-3'],
  },
  'int-variabelbyte': {
    summary: r`Variabelbyte (substitution) är kedjeregeln baklänges: $\int f(g(x))g'(x)\,dx = \int f(u)\,du$ med $u = g(x)$. Används när en inre funktion och (nästan) dess derivata syns. I en bestämd integral byts gränserna: $x = a \mapsto u = g(a)$.`,
    method: [r`Välj $u$ = den inre funktionen.`, r`Räkna $\frac{du}{dx}$, skriv $du = g'(x)\,dx$ och justera konstanten.`, r`Byt gränser (bestämd integral) eller byt tillbaka till $x$ (obestämd).`, r`Kontroll: derivera tillbaka.`],
    traps: [r`Glömda gränsbyten – vanligaste felet.`, r`$x$ kvar i integralen efter bytet ⇒ fel val av $u$.`],
    example: { q: r`$\int_0^1 2xe^{x^2}dx$`, a: r`$u = x^2$: $\int_0^1 e^u\,du = e - 1$.` },
    exampleProblems: ['d1A-2', 'ht24-3b', 'ht25-3a', 'd2Bht24-2'],
  },
  'int-partiell': {
    summary: r`Partialintegration är produktregeln baklänges. Med lärarens skrivsätt: $\int f(x)g(x)\,dx = F(x)g(x) - \int F(x)g'(x)\,dx$, där $f$ **integreras** (↑) och $g$ **deriveras** (↓). Välj $g$ som den faktor som blir enklare av derivering (polynom, $\ln x$, $\arctan x$) och $f$ som den som är lätt att integrera ($e^{kx}$, $\sin$, $\cos$). Grundidé: döda $x^n$ med derivering.`,
    method: [r`Identifiera $g$ (deriveras) och $f'$ (integreras).`, r`Skriv upp formeln, räkna den nya integralen.`, r`Polynom av grad $n$: upprepa $n$ gånger.`, r`$e^{ax}\cos bx$: två gånger + ekvationstricket.`, r`Kontrollera genom derivering.`],
    traps: [r`Fel val (derivera $e^x$, integrera $x$) gör integralen svårare.`, r`Teckenfel med $-\frac13e^{-3x}$.`, r`Bestämd integral: glöm inte att sätta in gränser i $fg$-termen.`],
    example: { q: r`$\int x\cos x\,dx$`, a: r`$x\sin x - \int\sin x\,dx = x\sin x + \cos x + C$` },
    exampleProblems: ['d1A-1', 'ht24-3a', 'ht25-3b', 'om-3a', 'd2Aht25-1'],
  },
  'int-partialbrak': {
    summary: r`En rationell funktion $\frac{p(x)}{q(x)}$ integreras genom att (1) polynomdividera om grad $p \ge$ grad $q$, (2) faktorisera $q$ och (3) skriva om som summa av partialbråk: $\frac{A}{x-a}$ (enkel rot), $\frac{A}{x-a} + \frac{B}{(x-a)^2}$ (dubbelrot), $\frac{Bx+C}{x^2+c}$ (irreducibel kvadratisk faktor).`,
    method: [r`Gradtal: polynomdivision vid behov.`, r`Faktorisera nämnaren fullständigt.`, r`Ansätt partialbråk, multiplicera upp, identifiera koefficienter (eller handpåläggning).`, r`Kontrollera genom att sätta på gemensamt bråkstreck.`, r`Integrera: $\ln$, $-\frac{1}{x-a}$, $\frac12\ln(x^2+c)$, $\arctan$.`],
    traps: [r`Glömd polynomdivision (ht24 #3c).`, r`Ansats $\frac{B}{x^2+1}$ i stället för $\frac{Bx+C}{x^2+1}$.`, r`Dubbelrot behöver båda termerna.`],
    example: { q: r`$\int\frac{dx}{x^2 - 1}$`, a: r`$\frac12\ln|x - 1| - \frac12\ln|x + 1| + C$` },
    exampleProblems: ['d1A-3', 'ht24-3c', 'ht25-3c', 'om-3c', 'd2Aht24-3'],
  },
  'int-trig': {
    summary: r`Trigonometriska integraler löses med omskrivningar: $\sin^2x = \frac{1-\cos2x}{2}$, $\cos^2x = \frac{1+\cos2x}{2}$, $\tan x = \frac{\sin x}{\cos x}$, och variabelbyte $u = \sin x$ eller $u = \cos x$ när en "ensam" $\cos x$ resp. $\sin x$ finns.`,
    method: [r`Jämna potenser: dubbla vinkeln.`, r`Udda potens / ensam faktor: variabelbyte.`, r`$\tan x$: $-\ln|\cos x|$.`],
    traps: [r`$\int\sin^2x\,dx \ne \frac{\sin^3x}{3}$.`, r`Teckenfel: $\int\sin x = -\cos x$.`],
    example: { q: r`$\int_0^{\pi/2}\cos^2x\,dx$`, a: r`$\left[\frac x2 + \frac{\sin2x}{4}\right]_0^{\pi/2} = \frac\pi4$` },
    exampleProblems: ['ht24-5', 'ht25-6', 'om-3b', 'd2Aht24-2'],
  },
  'int-teori': {
    summary: r`Den bestämda integralen är gränsvärdet av Riemannsummor och tolkas som *signerad* area. Räkneregler: linjäritet, $\int_a^b = \int_a^c + \int_c^b$, $\int_a^b = -\int_b^a$. Analysens huvudsats: om $f$ är kontinuerlig och $S(x) = \int_a^xf(t)\,dt$ så är $S'(x) = f(x)$. Med kedjeregeln: $\frac{d}{dx}\int_a^{g(x)}f(t)\,dt = f(g(x))g'(x)$.`,
    method: [r`Räkneregler: dela upp intervall, bryt ut konstanter.`, r`$S(x)$ från graf: räkna signerad area med rektanglar/trianglar.`, r`Max/min av $S$: $S' = f$, teckenstudera $f$.`, r`Derivera integral: $f(\text{övre gräns})\cdot(\text{övre gräns})'$.`],
    traps: [r`Glömd inre derivata ($\frac{1}{2\sqrt x}$ i ht25 #4c).`, r`Area under axeln räknas negativt i $S(x)$.`, r`Glöm inte $x = -2$ som lösning till $S(x) = 0$ (omtenta #4c).`],
    example: { q: r`$\frac{d}{dx}\int_0^{x^3}\cos t\,dt$`, a: r`$3x^2\cos x^3$` },
    exampleProblems: ['ht24-4b', 'ht25-4a', 'ht25-4b', 'ht25-4c', 'om-4c'],
  },
  'int-generaliserade': {
    summary: r`En integral är generaliserad om intervallet är obegränsat eller integranden obegränsad (vid en ändpunkt *eller inne i intervallet*). Den definieras som ett gränsvärde; finns gränsvärdet är integralen konvergent, annars divergent. Jämförelse: $\int_1^\infty x^{-p}$ konv. ⇔ $p > 1$; $\int_0^1x^{-p}$ konv. ⇔ $p < 1$.`,
    method: [r`Identifiera problempunkten (∞ eller singularitet).`, r`Ersätt med $R$ (eller $\varepsilon$), räkna den vanliga integralen.`, r`Ta gränsvärdet och skriv tydligt "konvergent med värdet …" eller "divergent".`, r`Utan primitiv: jämför med $x^{-p}$.`],
    traps: [r`Singularitet inne i intervallet: $\int_{-1}^1 x^{-2}dx$ är divergent, inte $-2$.`, r`Oscillation ($\sin R$, $\arctan(\sin R)$) ger divergens.`, r`Skriv ut gränsvärdet – annars poängavdrag.`],
    example: { q: r`$\int_0^\infty e^{-2x}dx$`, a: r`$\lim_{R\to\infty}\frac12(1 - e^{-2R}) = \frac12$` },
    exampleProblems: ['ht25-5', 'ht24-6', 'om-6'],
  },
  'tillamp-area': {
    summary: r`Arean mellan $y = f(x)$ och $y = g(x)$ på $[a,b]$ är $\int_a^b|f - g|\,dx$. I praktiken: hitta skärningspunkter, avgör vilken kurva som ligger överst, integrera övre minus undre.`,
    method: [r`Rita eller läs av figuren.`, r`Skärningspunkter: lös $f(x) = g(x)$.`, r`Testa en punkt för att avgöra övre/undre.`, r`$A = \int(\text{övre} - \text{undre})$. Ange "a.e.".`],
    traps: [r`Negativ "area" när du tagit undre minus övre.`, r`Kurvor som byter plats – dela upp.`],
    example: { q: r`Area mellan $y = x^2$ och $y = 2x$.`, a: r`Skärning $x = 0, 2$: $\int_0^2(2x - x^2)dx = \frac43$.` },
    exampleProblems: ['ht24-5', 'ht25-6', 'v6-a'],
  },
  'tillamp-volym': {
    summary: r`Volymelement $dV=A(x)\,dx$, alltså $V=\int A(x)\,dx$ (F8). Rotation kring $x$-axeln: tvärsnitten är cirkelskivor, $V = \pi\int_a^bf(x)^2\,dx$. Kring $y$-axeln: skiva vågrätt, $V=\int\pi x(y)^2\,dy$ (eller ringar). Rörformeln ingår inte. Formlerna står inte på formelbladet.`,
    method: [r`Rita figur och avgör rotationsaxel.`, r`Skiva vinkelrätt mot axeln och skriv upp tvärsnittsarean $A$ (cirkelskiva eller ring).`, r`Sätt upp och beräkna integralen (kan vara generaliserad).`],
    traps: [r`Glömt $\pi$ eller kvadraten.`, r`Mellan två kurvor: $\pi\int(f^2 - g^2)$, inte $\pi\int(f - g)^2$.`],
    example: { q: r`$y = x$, $0 \le x \le 1$, kring $x$-axeln.`, a: r`$\pi\int_0^1x^2dx = \frac\pi3$ (en kon).` },
    exampleProblems: ['ht24-6', 'v6-b', 'v6-c'],
  },
  'tillamp-massa': {
    summary: r`För en kropp med densitet $\rho$: $dm = \rho\,d\ell$ (tråd), $\rho\,dA$ (skiva), $\rho\,dV$ (kropp). Massan $m = \int dm$, masscentrum $x_T = \frac1m\int x\,dm$ (formelbladet).`,
    method: [r`Skriv $dm$ uttryckt i $dx$.`, r`$m = \int dm$.`, r`$x_T = \frac1m\int x\,dm$.`, r`Rimlighetskontroll: $x_T$ ligger inom kroppen, närmare den tunga änden.`],
    traps: [r`Glöm inte att dela med $m$.`, r`Enheter (g, m).`],
    example: { q: r`Tråd $0 \le x \le 1$, $\rho = 2x$.`, a: r`$m = 1$, $x_T = \int_0^12x^2dx = \frac23$.` },
    exampleProblems: ['om-5a', 'om-5b', 'om-5c', 'v6-d'],
  },
  'de1-linjar': {
    summary: r`En linjär DE av ordning 1 har formen $y' + g(x)y = h(x)$. Multiplicera med integrerande faktor $e^{G(x)}$ ($G' = g$): vänsterledet blir $(e^{G(x)}y)'$. Integrera och lös ut $y$. Allmän lösning = partikulär + $Ce^{-G(x)}$.`,
    method: [r`Skriv på standardform $y' + g(x)y = h(x)$.`, r`$G(x) = \int g$, faktor $e^{G(x)}$.`, r`$(e^{G}y)' = e^{G}h$ → integrera.`, r`$y = e^{-G}\left(\int e^{G}h\,dx + C\right)$. Begynnelsevillkor sist.`],
    traps: [r`Fel tecken i $G$ ($y' - \frac yx$: $G = -\ln x$).`, r`Glömt $C$ eller delat bara en term med $e^G$.`],
    example: { q: r`$y' + y = 1$`, a: r`$(e^xy)' = e^x \Rightarrow y = 1 + Ce^{-x}$` },
    exampleProblems: ['ht24-7b', 'ht25-7b', 'v7-c'],
  },
  'de1-separabel': {
    summary: r`En separabel DE kan skrivas $y' = f(x)g(y)$. Separera: $\frac{dy}{g(y)} = f(x)\,dx$, integrera båda leden, lös ut $y$.`,
    method: [r`Flytta alla $y$ till ena sidan, alla $x$ till den andra.`, r`Integrera båda sidor, en konstant räcker.`, r`Lös ut $y$ (om möjligt) och bestäm $C$.`],
    traps: [r`Glömt minustecken ($\int y^{-2}dy = -\frac1y$).`, r`Konstanta lösningar där $g(y) = 0$.`],
    example: { q: r`$y' = 2xy$`, a: r`$\ln|y| = x^2 + C \Rightarrow y = Ce^{x^2}$` },
    exampleProblems: ['om-7', 'v7-e'],
  },
  'de1-tillampning': {
    summary: r`Tillämpningar: tillväxt/avtagande $N' = kN$, Newtons avsvalning $T' = k(T - T_{\text{omg}})$, utflöde $h' = -k\sqrt h$. Ställ upp DE:n ur texten, lös, bestäm konstanter ur villkoren, svara med enhet.`,
    method: [r`Inför funktion med enhet och tid.`, r`"Hastighet" = $'$, "proportionell" = $k\cdot$.`, r`Lös (linjär/separabel).`, r`Två villkor → $C$ och $k$.`, r`Använd givna approximationer ($\ln 10 \approx 2{,}3$).`],
    traps: [r`Fel tecken på $k$.`, r`Svarar med $k$ i stället för det efterfrågade.`],
    example: { q: r`$N' = 0{,}1N$, $N(0) = 50$. När är $N = 100$?`, a: r`$t = 10\ln 2 \approx 6{,}9$` },
    exampleProblems: ['ht24-7c', 'ht25-7c', 'om-7', 'v7-b'],
  },
  'de2-homogen': {
    summary: r`$y'' + ay' + by = 0$ löses med karakteristiska ekvationen $r^2 + ar + b = 0$. Reella olika rötter: $C_1e^{r_1x} + C_2e^{r_2x}$. Dubbelrot: $(C_1 + C_2x)e^{rx}$. Komplexa rötter $\alpha \pm\beta i$: $e^{\alpha x}(C_1\cos\beta x + C_2\sin\beta x)$. Begynnelsevärden $y(0)$, $y'(0)$ bestämmer $C_1$, $C_2$.`,
    method: [r`Skriv karakteristiska ekvationen.`, r`Lös, välj rätt fall.`, r`Begynnelsevärden: derivera $y$, sätt in $x = 0$, lös systemet.`],
    traps: [r`Komplexa rötter: $e^{\alpha x}$-faktorn glöms.`, r`Begynnelsevärden insatta i $y_h$ innan $y_p$ adderats.`],
    example: { q: r`$y'' + 9y = 0$`, a: r`$r = \pm3i$: $y = C_1\cos3x + C_2\sin3x$` },
    exampleProblems: ['om-8', 'ht24-8', 'ht25-8'],
  },
  'de2-partikular': {
    summary: r`För $y'' + ay' + by = h(x)$ är $y = y_h + y_p$. Ansätt $y_p$ efter högerledets form: polynom → polynom av samma grad; $e^{kx}$ → $Ae^{kx}$; $\sin kx$/$\cos kx$ → $A\cos kx + B\sin kx$. Om ansatsen redan löser den homogena ekvationen (**resonans**) multipliceras den med $x$ (eller $x^2$).`,
    method: [r`Lös först den homogena ekvationen.`, r`Välj ansats, kontrollera krock med $y_h$.`, r`Derivera, sätt in, identifiera koefficienter.`, r`Kontroll: sätt in $y_p$.`],
    traps: [r`Bara $\sin$ i ansatsen när HL är $\sin$ – båda behövs.`, r`Resonans ($y'' + 4y = \cos2x$).`, r`Polynomansats utan lägre termer.`],
    example: { q: r`$y'' - y = 2$`, a: r`$y_p = -2$, $y = C_1e^x + C_2e^{-x} - 2$` },
    exampleProblems: ['ht24-8', 'ht25-8', 'v8-a', 'v8-b'],
  },
  'taylor-utveckling': {
    summary: r`Maclaurinutvecklingen av ordning $n$: $f(x) = \sum_{k=0}^n\frac{f^{(k)}(0)}{k!}x^k + x^{n+1}B(x)$ med $B$ begränsad nära 0. Standardserierna står på formelbladet. Sammansatta funktioner utvecklas genom substitution ($t = x^2$), produkter genom multiplikation med ordo-regler. Taylorpolynom i $x = a$: samma sak med $(x - a)$.`,
    method: [r`Känd funktion med inre $t$: substituera i formelbladets serie.`, r`Taylor i $x = a$: beräkna derivator i $a$.`, r`Ange resttermen $x^nB(x)$ med rätt $n$.`],
    traps: [r`Fel restterm efter substitution ($t^3B(t)$ med $t = x^2$ ger $x^6B(x)$).`, r`Multiplicera inte ut $(x - \pi)^k$.`],
    example: { q: r`Maclaurin ordning 4 av $e^{-x^2}$.`, a: r`$1 - x^2 + \frac{x^4}{2} + x^6B(x)$` },
    exampleProblems: ['ht24-9a', 'ht25-9b', 'om-9a'],
  },
  'taylor-gransvarde': {
    summary: r`Gränsvärden av typen $\frac00$ då $x \to 0$ beräknas genom att utveckla täljare och nämnare tills första nollskilda term syns. Bryt ut den lägsta potensen och förkorta; termer $x^kB(x)$ med $k > 0$ går mot 0.`,
    method: [r`Avgör vilken grad som behövs (ofta nämnarens grad).`, r`Utveckla med restterm.`, r`Förenkla, bryt ut $x^n$, förkorta.`, r`Låt $x \to 0$.`],
    traps: [r`För kort utveckling – allt tar ut varandra.`, r`Restterm glömd ⇒ ofullständig motivering.`],
    example: { q: r`$\lim_{x\to0}\frac{1 - \cos x}{x^2}$`, a: r`$\frac{\frac{x^2}{2} + x^4B}{x^2} \to \frac12$` },
    exampleProblems: ['ht24-9b', 'ht25-9a', 'om-9b'],
  },
  'taylor-serier': {
    summary: r`Geometrisk serie: $\sum_{k=0}^\infty q^k = \frac{1}{1-q}$ för $|q| < 1$, annars divergent. Maclaurinserierna konvergerar (för $e^x$, $\sin$, $\cos$ överallt) och kan användas för att summera serier. Ordo-räkneregler: $x^mB_1 + x^nB_2 = x^{\min}B$, $x^mB_1\cdot x^nB_2 = x^{m+n}B$.`,
    method: [r`Känn igen kvoten $q$ mellan termerna.`, r`Kontrollera $|q| < 1$.`, r`Summa $= \frac{\text{första termen}}{1 - q}$.`],
    traps: [r`Serien börjar inte på 1: $\sum_{k=1}^\infty q^k = \frac{q}{1-q}$.`, r`Alternerande tecken ⇒ $q < 0$.`],
    example: { q: r`$\sum_{k=0}^\infty\frac{1}{4^k}$`, a: r`$\frac{1}{1 - \frac14} = \frac43$` },
    exampleProblems: ['ht25-9c', 'v9-c'],
  },
}
