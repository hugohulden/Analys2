const r = String.raw

export interface MethodNode {
  q?: string
  options?: { label: string; next: string }[]
  result?: string
}

export interface MethodTree {
  id: string
  title: string
  root: string
  nodes: Record<string, MethodNode>
}

export const METHOD_TREES: MethodTree[] = [
  {
    id: 'integral',
    title: 'Integraler',
    root: 'start',
    nodes: {
      start: {
        q: r`Hur ser integranden ut?`,
        options: [
          { label: r`Rationell funktion $\frac{p(x)}{q(x)}$`, next: 'rat' },
          { label: r`Produkt: polynom · $e^{x}$ / $\sin$ / $\cos$ / $\ln$ / $\arctan$`, next: 'pi' },
          { label: r`$e^{ax}\cdot\sin bx$ eller $e^{ax}\cdot\cos bx$`, next: 'ekv' },
          { label: r`En inre funktion vars derivata (nästan) syns`, next: 'vb' },
          { label: r`$\sin^2 x$, $\cos^2 x$, $\tan x$`, next: 'trig' },
          { label: r`Gränsen är $\infty$ eller integranden är obegränsad`, next: 'gen' },
          { label: r`Standardprimitiv direkt?`, next: 'std' },
        ],
      },
      rat: {
        q: r`Är gradtal täljare $\ge$ gradtal nämnare?`,
        options: [
          { label: 'Ja', next: 'poldiv' },
          { label: 'Nej', next: 'fprim' },
        ],
      },
      poldiv: { result: r`**Polynomdivision först!** Skriv $\frac{p}{q} = k(x) + \frac{r(x)}{q(x)}$ med grad $r <$ grad $q$. Fortsätt sedan med resten som en "äkta" rationell funktion. (Fälla: ht24 #3c, dugga 2 ht25 #3.)` },
      fprim: {
        q: r`Är täljaren (en konstant gånger) derivatan av nämnaren?`,
        options: [
          { label: r`Ja, t.ex. $\frac{2x}{x^2+1}$`, next: 'lnf' },
          { label: 'Nej', next: 'fakt' },
        ],
      },
      lnf: { result: r`$\int\frac{f'(x)}{f(x)}\,dx = \ln|f(x)| + C$. Klart!` },
      fakt: {
        q: r`Faktorisera nämnaren. Vilka faktorer får du?`,
        options: [
          { label: r`Olika linjära: $(x-a)(x-b)$`, next: 'pb1' },
          { label: r`Dubbelrot: $(x-a)^2$`, next: 'pb2' },
          { label: r`Irreducibel kvadratisk: $x(x^2+c)$`, next: 'pb3' },
          { label: r`Bara en irreducibel: $\frac{1}{x^2+a^2}$`, next: 'atan' },
        ],
      },
      pb1: { result: r`Ansats $\frac{A}{x-a} + \frac{B}{x-b}$. Handpåläggning: sätt $x = a$ i $p(x) = A(x-b) + B(x-a)$. Integrera till $A\ln|x-a| + B\ln|x-b| + C$.` },
      pb2: { result: r`Ansats $\frac{A}{x-a} + \frac{B}{(x-a)^2}$. Primitiv: $A\ln|x-a| - \frac{B}{x-a} + C$. (Dugga 2 ht24.)` },
      pb3: { result: r`Ansats $\frac{A}{x} + \frac{Bx+C}{x^2+c}$. Identifiera koefficienter. $\int\frac{Bx}{x^2+c} = \frac B2\ln(x^2+c)$, $\int\frac{C}{x^2+c} = \frac{C}{\sqrt c}\arctan\frac{x}{\sqrt c}$. (Dugga 1 2026, omtenta #3c.)` },
      atan: { result: r`$\int\frac{dx}{x^2+a^2} = \frac1a\arctan\frac xa + C$. Kvadratkomplettera vid behov: $x^2 + 2x + 5 = (x+1)^2 + 4$.` },
      pi: {
        q: r`Vilken faktor blir enklare av derivering?`,
        options: [
          { label: r`Polynomet ($x^n$) – den andra är $e^{x}$, $\sin$, $\cos$`, next: 'pi-pol' },
          { label: r`$\ln x$ eller $\arctan x$`, next: 'pi-ln' },
        ],
      },
      'pi-pol': { result: r`**Partialintegration** $\int fg\,dx = Fg - \int Fg'\,dx$ med $g$ = polynomet (deriveras) och $f$ = den andra faktorn (integreras). Upprepa $n$ gånger för $x^n$. Kontroll: derivera svaret.` },
      'pi-ln': { result: r`**Partialintegration** med $g = \ln x$ (eller $\arctan x$) och $f'$ = det andra (även $f' = 1$ fungerar: $\int\ln x\,dx = x\ln x - x + C$).` },
      ekv: { result: r`**Partialintegration två gånger + ekvationstricket.** Integrera $e^{ax}$ båda gångerna. Du får $I = (\dots) - cI$, så $I = \frac{(\dots)}{1+c} + C$. (ht25 #3b.)` },
      vb: { result: r`**Variabelbyte** $u = $ den inre funktionen. Räkna $du = u'(x)\,dx$ och justera konstanten. I bestämd integral: **byt gränser**. Ex: $\int x^2\cos x^3\,dx$, $u = x^3$.` },
      trig: {
        q: r`Vilken?`,
        options: [
          { label: r`$\sin^2 x$ eller $\cos^2 x$`, next: 'sq' },
          { label: r`$\tan x$`, next: 'tan' },
          { label: r`$\sin^m x\cos x$ (udda potens av cos/sin)`, next: 'sincos' },
        ],
      },
      sq: { result: r`$\sin^2 x = \frac{1-\cos 2x}{2}$, $\cos^2 x = \frac{1+\cos 2x}{2}$. Integrera termvis. (ht24 #5, ht25 #6.)` },
      tan: { result: r`$\tan x = \frac{\sin x}{\cos x}$, $u = \cos x$: $\int\tan x\,dx = -\ln|\cos x| + C$. (Omtenta #3b.)` },
      sincos: { result: r`Variabelbyte $u = \sin x$ (om en $\cos x$ blir över) eller $u = \cos x$. Ex: $\int\frac{\cos x}{\sin^7x}dx = -\frac{1}{6\sin^6 x} + C$.` },
      gen: { result: r`**Generaliserad integral**: ersätt problemgränsen med $R$ (eller $\varepsilon$), räkna, ta gränsvärdet. Kolla också singulariteter *inne i* intervallet! Jämför med $\int_1^\infty x^{-p}$ ($p > 1$) / $\int_0^1 x^{-p}$ ($p < 1$).` },
      std: { result: r`Kolla korten "Måste kunna": $x^a$, $\frac1x$, $e^{kx}$, $\sin$, $\cos$, $\frac{1}{1+x^2}$, $\frac{1}{\sqrt{1-x^2}}$, $\frac{1}{\cos^2x}$. Och formelbladet: $\int\frac{dx}{\sqrt{x^2+a}}$.` },
    },
  },
  {
    id: 'komplexa',
    title: 'Komplexa tal & ekvationer',
    root: 'start',
    nodes: {
      start: {
        q: r`Vad ska du göra?`,
        options: [
          { label: r`Skriva en kvot på formen $a + bi$`, next: 'div' },
          { label: r`Beräkna potens, belopp eller argument`, next: 'pol' },
          { label: r`Lösa $z^n = w$`, next: 'binom' },
          { label: r`Lösa $z^2 = a + bi$ med "ful" vinkel`, next: 'kvad' },
          { label: r`Lösa ekvation med $z$ och $\bar z$`, next: 'zbar' },
          { label: r`Polynomekvation med given rot`, next: 'polrot' },
          { label: r`Andragradsekvation $z^2 + pz + q = 0$`, next: 'pq' },
          { label: r`Skissa ett område, t.ex. $|z - z_0| \le r$`, next: 'geo' },
        ],
      },
      div: { result: r`Förläng med nämnarens konjugat: $\frac{u}{w} = \frac{u\bar w}{|w|^2}$. Förenkla med $i^2 = -1$.` },
      pol: { result: r`Gå till **polär form** $re^{i\theta}$. $|z^n| = |z|^n$, $|u/w| = |u|/|w|$, $\arg(uv) = \arg u + \arg v$, $\arg(z^n) = n\arg z$. Bestäm kvadranten med en figur. Reducera argument mod $2\pi$.` },
      binom: { result: r`$z = re^{i\theta}$, $w = |w|e^{i\varphi}$. $r^n = |w|$ och $n\theta = \varphi + 2\pi k$ ⇒ $\theta = \frac{\varphi}{n} + \frac{2\pi k}{n}$, $k = 0,\dots,n-1$. Ange **alla $n$** rötter, ev. på rektangulär form, och rita dem på cirkeln $|z| = r$.` },
      kvad: { result: r`$z = x + iy$: $x^2 - y^2 = a$, $2xy = b$, $x^2 + y^2 = \sqrt{a^2+b^2}$. Lös för $x^2$, $y^2$; välj tecken så att $xy$ har tecknet hos $b$.` },
      zbar: { result: r`Sätt $z = a + bi$, $\bar z = a - bi$. Samla real- och imaginärdel → två reella ekvationer. Lös systemet. Kontrollera genom insättning.` },
      polrot: { result: r`Reella koefficienter ⇒ konjugatet är också rot. Multiplicera ihop $(z - z_0)(z - \bar z_0)$ (reellt andragradspolynom), **polynomdivision** (eller faktorisera), lös resten.` },
      pq: { result: r`Kvadratkomplettera eller pq-formeln. Om diskriminanten är negativ: $\sqrt{-d} = i\sqrt d$. Om koefficienterna är komplexa: kvadratkomplettera och lös $w^2 = c$ med $w = x + iy$.` },
      geo: { result: r`$|z - z_0|$ = avståndet till $z_0$. $|z - z_0| = r$: cirkel; $\le r$: skiva (rand med); $< r$: öppen skiva. Skriv om tecken: $|z - 1 + i| = |z - (1 - i)|$. $\arg z = \theta$: stråle från origo.` },
    },
  },
  {
    id: 'de1',
    title: 'DE ordning 1',
    root: 'start',
    nodes: {
      start: {
        q: r`Är det en textuppgift (tillämpning)?`,
        options: [
          { label: 'Ja', next: 'text' },
          { label: 'Nej, ekvationen är given', next: 'typ' },
        ],
      },
      text: { result: r`1) Inför beteckning med enhet ($N(t)$, $T(t)$, $h(t)$). 2) "Hastighet" = derivata, "proportionell mot $X$" = $kX$, "minskar" = minustecken. 3) Lös DE:n. 4) Bestäm konstanter ur villkoren. 5) Svara på frågan med enhet och använd givna approximationer ($\ln 2 \approx 0{,}7$).` },
      typ: {
        q: r`Kan ekvationen skrivas $y' + g(x)y = h(x)$?`,
        options: [
          { label: r`Ja → linjär`, next: 'lin' },
          { label: r`Nej, men $y' = f(x)\,g(y)$`, next: 'sep' },
        ],
      },
      lin: { result: r`**Integrerande faktor** $e^{G(x)}$ där $G' = g$. Multiplicera: $(e^{G}y)' = e^{G}h$. Integrera, dela med $e^G$. Begynnelsevillkor sist. Kontroll: sätt in i DE:n.` },
      sep: { result: r`**Separera**: $\int\frac{dy}{g(y)} = \int f(x)\,dx + C$. Lös ut $y$ om möjligt. Bestäm $C$ ur begynnelsevillkoret. Glöm inte ev. konstanta lösningar där $g(y) = 0$.` },
    },
  },
  {
    id: 'de2',
    title: 'DE ordning 2 (konstanta koefficienter)',
    root: 'start',
    nodes: {
      start: {
        q: r`Steg 1: lös karakteristiska ekvationen $r^2 + ar + b = 0$. Vilka rötter?`,
        options: [
          { label: r`Två olika reella $r_1 \ne r_2$`, next: 'real' },
          { label: r`Dubbelrot $r$`, next: 'dubbel' },
          { label: r`Komplexa $\alpha \pm \beta i$`, next: 'kompl' },
        ],
      },
      real: { result: r`$y_h = C_1e^{r_1x} + C_2e^{r_2x}$. Är högerledet $\ne 0$? → gå till "Partikulärlösning" nedan.`, options: [{ label: 'Partikulärlösning →', next: 'hl' }] },
      dubbel: { result: r`$y_h = (C_1 + C_2x)e^{rx}$.`, options: [{ label: 'Partikulärlösning →', next: 'hl' }] },
      kompl: { result: r`$y_h = e^{\alpha x}(C_1\cos\beta x + C_2\sin\beta x)$.`, options: [{ label: 'Partikulärlösning →', next: 'hl' }] },
      hl: {
        q: r`Steg 2: vad står i högerledet?`,
        options: [
          { label: r`Polynom av grad $n$`, next: 'pol' },
          { label: r`$Ce^{kx}$`, next: 'exp' },
          { label: r`$\sin kx$ och/eller $\cos kx$`, next: 'trig' },
          { label: r`Summa av sådana`, next: 'sum' },
          { label: r`$0$ med begynnelsevärden`, next: 'bv' },
        ],
      },
      pol: { result: r`Ansats: polynom av grad $n$ ($Ax^2 + Bx + C$ för grad 2). **Krock** om $r = 0$ är rot (dvs. $b = 0$): multiplicera med $x$.` },
      exp: { result: r`Ansats $Ae^{kx}$. **Resonans**: om $k$ är en enkel rot → $Axe^{kx}$; dubbelrot → $Ax^2e^{kx}$. Tips: $y = ze^{kx}$ förenklar räkningen.` },
      trig: { result: r`Ansats $A\cos kx + B\sin kx$ (**båda**, även om bara sin står i HL). **Resonans** om $\pm ki$ är rötter → $x(A\cos kx + B\sin kx)$.` },
      sum: { result: r`Superposition: hitta en partikulärlösning för varje term separat och addera dem.` },
      bv: { result: r`$y = y_h + y_p$ först! Derivera, sätt in $y(0)$ och $y'(0)$ → linjärt system för $C_1, C_2$. Kontrollera båda villkoren.` },
    },
  },
  {
    id: 'taylor',
    title: 'Maclaurin / Taylor',
    root: 'start',
    nodes: {
      start: {
        q: r`Vad efterfrågas?`,
        options: [
          { label: r`Utveckling av en sammansatt funktion, t.ex. $\cos x^2$`, next: 'sub' },
          { label: r`Taylorpolynom i $x = a \ne 0$`, next: 'tay' },
          { label: r`Gränsvärde $\lim_{x\to0}$`, next: 'lim' },
          { label: r`Summan av en serie`, next: 'ser' },
        ],
      },
      sub: { result: r`Sätt in i standardutvecklingen från formelbladet ($t = x^2$, $t = -x$, $t = 2x$). Resttermen: $t^nB(t)$ blir $x^{2n}B(x)$ osv. Multiplicera ihop med ordo-räknereglerna.` },
      tay: { result: r`Beräkna $f(a), f'(a), \dots, f^{(n)}(a)$ och sätt in i $p_n(x) = \sum\frac{f^{(k)}(a)}{k!}(x-a)^k$ (formelbladet). Behåll $(x-a)$ – multiplicera inte ut.` },
      lim: { result: r`Utveckla täljare och nämnare tills första nollskilda term syns i båda (samma grad som den lägsta grad som överlever). Bryt ut lägsta potensen, förkorta, låt $x \to 0$ ($x^kB(x) \to 0$).` },
      ser: { result: r`Känn igen geometrisk serie $\sum q^k = \frac{1}{1-q}$ ($|q| < 1$) eller en Maclaurinserie i en viss punkt, t.ex. $\sum\frac{1}{k!} = e$, $1 - \frac12 + \frac13 - \dots = \ln 2$.` },
    },
  },
  {
    id: 'tillamp',
    title: 'Tillämpningar av integraler',
    root: 'start',
    nodes: {
      start: {
        q: r`Vad efterfrågas?`,
        options: [
          { label: 'Area', next: 'area' },
          { label: r`Volym, rotation kring $x$-axeln`, next: 'vx' },
          { label: r`Volym, rotation kring $y$-axeln`, next: 'vy' },
          { label: 'Massa / masscentrum', next: 'massa' },
        ],
      },
      area: { result: r`Hitta skärningspunkter. Avgör vilken kurva som ligger överst (testa en punkt). $A = \int(\text{övre} - \text{undre})\,dx$. Area under $x$-axeln räknas positivt – dela upp vid nollställen.` },
      vx: { result: r`Skivmetoden $V = \pi\int_a^b f(x)^2\,dx$. Mellan två kurvor: $\pi\int(f^2 - g^2)$. Oändligt intervall → generaliserad integral (ht24 #6).` },
      vy: { result: r`Skiva vågrätt (F8): lös ut $x$ som funktion av $y$. Tvärsnittet är en cirkelskiva $A(y)=\pi x(y)^2$ eller en ring $\pi(x_{yttre}^2-x_{inre}^2)$, och $V=\int A(y)\,dy$. Rörformeln ingår inte.` },
      massa: { result: r`Formelbladet: $dm = \rho\,d\ell$ (eller $\rho\,dA$, $\rho\,dV$), $m = \int dm$, $x_T = \frac1m\int x\,dm$. Rimlighetskontroll: $x_T$ ligger närmare den tyngre änden.` },
    },
  },
]
