const r = String.raw

const RAKNA = r`**Metod (F12): räkneregler.** Räkna med $i$ som med en variabel och använd $i^2=-1$. Addition/subtraktion: real- och imaginärdelar var för sig. Multiplikation: multiplicera ihop, ersätt $i^2$ med $-1$ och samla real- och imaginärdel.`
const KONJ = r`**Metod (F12): konjugat och belopp.** $\overline{a+bi}=a-bi$ (spegling i Re-axeln). $|a+bi|=\sqrt{a^2+b^2}$ är avståndet till origo (Pythagoras). Räkneregel: $z\bar z=|z|^2$.`
const DIV = r`**Metod (F12): division – förläng med nämnarens konjugat.** Då blir nämnaren $(c+di)(c-di)=c^2+d^2$, ett reellt tal, och man kan dela upp i real- och imaginärdel.`
const BELOPP = r`**Metod (F12): räkneregler för belopp.** $|zw|=|z||w|$, $\left|\frac zw\right|=\frac{|z|}{|w|}$ och $|z^n|=|z|^n$. Räkna ut beloppen av varje faktor i stället för att först räkna ut talet.`
const OMR = r`**Metod (F12): områden i talplanet.** $|z-w|$ är avståndet mellan $z$ och $w$. $|z-z_0|=r$ är cirkeln med medelpunkt $z_0$ och radie $r$, $\le$ ger cirkelskivan och $<$ eller $>$ streckad rand. Villkor på $\operatorname{Re}z$ och $\operatorname{Im}z$ ger linjer och halvplan. Vid osäkerhet: sätt $z=x+iy$.`
const POL = r`**Metod (bok §6.3–6.4): polär form.** $z=r(\cos\theta+i\sin\theta)=re^{i\theta}$ med $r=|z|$ och $\theta=\arg z$ (rita figur för att få rätt kvadrant). Vid multiplikation multipliceras beloppen och argumenten adderas; vid division subtraheras de (de Moivre).`
const BIN = r`**Metod (bok §6.5): komplexa ekvationer.** $z^n=w$: skriv båda leden på polär form och jämför belopp och argument ($+2\pi k$). $z^2=a+bi$: sätt $z=x+iy$, jämför real- och imaginärdel och använd $|z|^2=|w|$. Andragradsekvationer: kvadratkomplettera.`
const POLY = r`**Metod (bok §6.6): polynom.** Faktorsatsen: $p(a)=0\iff(z-a)$ är en faktor. Reella koefficienter ⇒ icke-reella rötter kommer i konjugerade par. Hitta en faktor och polynomdividera.`

/** Lösningsförslag kapitel 6. 6.1–6.17 följer F12, resten boken (§6.3–6.6). */
export const SOL6: Record<string, string> = {
  '6.1': r`${RAKNA}

**Definitionen (F12):** för $z=a+bi$ är $\operatorname{Re}z=a$ (delen utan $i$) och $\operatorname{Im}z=b$ (talet framför $i$). ⚠️ $i$ tas **inte** med i imaginärdelen: $\operatorname{Im}(3-5i)=-5$, inte $-5i$.

**I talplanet** ritas $z=a+bi$ som punkten $(a,b)$: realdelen på den vågräta axeln (Re) och imaginärdelen på den lodräta (Im). Ett reellt tal ligger på Re-axeln, ett imaginärt tal ($\operatorname{Re}z=0$) på Im-axeln.`,
  '6.2a': r`${RAKNA}

**Addition/subtraktion – real- och imaginärdelar var för sig:**
$$(1+i)-(3+2i)=(1-3)+(1-2)i=-2-i.$$`,
  '6.2b': r`${RAKNA}

**Var för sig:** $(1-3)+(1-(-4))i=-2+5i$. (Se upp med minustecknet framför parentesen.)`,
  '6.2c': r`${RAKNA}

**Multiplikation – multiplicera ihop varje term med varje term:**
$$(1+i)(3-4i)=1\cdot3+1\cdot(-4i)+i\cdot3+i\cdot(-4i)=3-4i+3i-4i^2.$$
**Använd $i^2=-1$ och samla:** $3-4i+3i+4=7-i$.`,
  '6.2d': r`${RAKNA}

**Kvadreringsregeln** fungerar som vanligt: $(1-i)^2=1-2i+i^2=1-2i-1=-2i$.`,
  '6.2e': r`${RAKNA}

**Steg för steg** – kvadrera först: $(5-2i)^2=25-20i+4i^2=25-20i-4=21-20i$.

**Multiplicera med $(5-2i)$ en gång till:**
$$(21-20i)(5-2i)=105-42i-100i+40i^2=105-40-142i=65-142i.$$`,
  '6.2f': r`${RAKNA}

**Utnyttja d):** $(1-i)^4=\left((1-i)^2\right)^2=(-2i)^2=4i^2=-4$.`,
  '6.3a': r`${KONJ}

$\overline{1+i}=1-i$ (byt tecken på imaginärdelen).`,
  '6.3b': r`${KONJ}

$\overline{3-5i}=3+5i$.`,
  '6.3c': r`${KONJ}

$-7$ har imaginärdel 0, så $\overline{-7}=-7$. Ett reellt tal är sitt eget konjugat.`,
  '6.3d': r`${KONJ}

**Räkneregeln $z\bar z=|z|^2$:** $(1+i)(1-i)=1-i^2=1+1=2=|1+i|^2$.`,
  '6.3e': r`${KONJ}

$|1+i|=\sqrt{1^2+1^2}=\sqrt2$ (Pythagoras: avståndet från origo till punkten $(1,1)$).`,
  '6.3f': r`${KONJ}

$i=0+1i$: $|i|=\sqrt{0^2+1^2}=1$.`,
  '6.3g': r`${KONJ}

$|3-2i|=\sqrt{3^2+(-2)^2}=\sqrt{13}$. ⚠️ Ha inte med $i$ under roten.`,
  '6.3h': r`${KONJ}

$-5i=0-5i$: $|-5i|=\sqrt{0+25}=5$ (avståndet från origo till $(0,-5)$).`,
  '6.4a': r`${DIV}

$$\frac1{1+i}=\frac{1\cdot(1-i)}{(1+i)(1-i)}=\frac{1-i}{1-i^2}=\frac{1-i}2=\frac12-\frac12i.$$`,
  '6.4b': r`${DIV}

$$\frac1{3-4i}=\frac{3+4i}{(3-4i)(3+4i)}=\frac{3+4i}{9-16i^2}=\frac{3+4i}{25}=\frac3{25}+\frac4{25}i.$$`,
  '6.4c': r`${DIV}

**Förläng med $1-i$:**
$$\frac{(3-4i)(1-i)}{(1+i)(1-i)}=\frac{3-3i-4i+4i^2}{1-i^2}=\frac{3-4-7i}{2}=-\frac12-\frac72i.$$`,
  '6.4d': r`${DIV}

**Förläng med $1-i$:** täljaren blir $(1-i)^2=-2i$ och nämnaren $(1+i)(1-i)=2$:
$$\frac{1-i}{1+i}=\frac{-2i}2=-i.$$`,
  '6.4e': r`${DIV}

**Räkna först potensen:** $(1+i)^2=1+2i+i^2=2i$, så $(1+i)^{-2}=\frac1{2i}$.

**Förläng med konjugatet $-2i$:** $\frac1{2i}=\frac{-2i}{2i\cdot(-2i)}=\frac{-2i}{-4i^2}=\frac{-2i}4=-\frac i2$.`,
  '6.4f': r`${DIV}

**Förläng med konjugatet $-i$:** $\frac1i=\frac{-i}{i\cdot(-i)}=\frac{-i}{-i^2}=\frac{-i}{1}=-i$.

**Kontroll:** $i\cdot(-i)=-i^2=1$ ✓`,
  '6.5a': r`${BELOPP}

**Räkna inte ut potensen!** Med $|zw|=|z||w|$ upprepat gäller $|z^n|=|z|^n$:
$$|(1-i)^{14}|=|1-i|^{14}=\left(\sqrt2\right)^{14}=2^7=128.$$`,
  '6.5b': r`${BELOPP}

**Beloppet av en kvot är kvoten av beloppen:**
$$\left|\frac{3+i}{4+3i}\right|=\frac{|3+i|}{|4+3i|}=\frac{\sqrt{9+1}}{\sqrt{16+9}}=\frac{\sqrt{10}}5.$$`,
  '6.6': r`${BELOPP}

**Dela upp i produkter och kvoter av belopp** (räkna inte ut talet först):
$$\frac{|1+2i|\cdot|7+\sqrt3i|^2}{|5+i|^2}=\frac{\sqrt{1+4}\cdot(49+3)}{25+1}=\frac{52\sqrt5}{26}=2\sqrt5.$$
(Observera att $|w|^2=a^2+b^2$ direkt, utan rot.)`,
  '6.7': r`**Metod (F12): likhet – sätt $z=a+bi$ och jämför real- och imaginärdelar.** Ekvationer med både $z$ och $\bar z$ löses så.

**Sätt in** $z=a+bi$, $\bar z=a-bi$:
$$z+2\bar z=a+bi+2a-2bi=3a-bi.$$
**Likhet** med $2-i$: realdelar $3a=2$, imaginärdelar $-b=-1$. Alltså $a=\frac23$, $b=1$.

**Svar:** $z=\frac23+i$. **Kontroll:** $\frac23+i+\frac43-2i=2-i$ ✓`,
  '6.8a': r`**Metod (F12): likhet – sätt $z=a+bi$.**

$3z-i\bar z=3a+3bi-i(a-bi)=3a+3bi-ai+bi^2=(3a-b)+(3b-a)i$.

**Likhet** med $7-5i$:
$$\begin{cases}3a-b=7\\-a+3b=-5\end{cases}$$
Andra ekvationen ger $a=3b+5$. Insatt i den första: $9b+15-b=7\iff b=-1$, och då $a=2$.

**Svar:** $z=2-i$. **Kontroll:** $3(2-i)-i(2+i)=6-3i-2i+1=7-5i$ ✓`,
  '6.8b': r`**Metod (F12): räkneregeln $z\bar z=|z|^2$.**

VL $=z\cdot2\bar z=2|z|^2=2(a^2+b^2)$ är alltid **reellt**. HL $=1+i$ har imaginärdel $1\ne0$.

**Slutsats:** likheten kan aldrig gälla – ekvationen saknar lösning.`,
  '6.9': r`${OMR}

**Sätt $z=x+iy$:** $\operatorname{Re}z=x$ och $\operatorname{Im}z=y$, så villkoret är $x+y=1$, alltså $y=1-x$.

**Tolkning:** en rät linje med lutning $-1$ som skär Re-axeln i $1$ och Im-axeln i $i$.`,
  '6.10a': r`${OMR}

$\operatorname{Re}z=3$: alla tal med realdel 3, alltså den **lodräta linjen** genom $3$ (jämför $\operatorname{Re}z=-1$ i F12).`,
  '6.10b': r`${OMR}

$\operatorname{Im}z=-1$: den **vågräta linjen** genom $-i$.`,
  '6.10c': r`${OMR}

$\operatorname{Im}z>0$: allt **ovanför** Re-axeln (övre halvplanet). Strikt olikhet, så Re-axeln själv ritas streckad.`,
  '6.10d': r`${OMR}

**Sätt $z=x+iy$:** $z+\bar z=(x+iy)+(x-iy)=2x$. Villkoret $2x=0\iff x=0$: **Im-axeln**.`,
  '6.10e': r`${OMR}

**Sätt $z=x+iy$:** $z=\bar z\iff x+iy=x-iy\iff2iy=0\iff y=0$: **Re-axeln** (de reella talen).`,
  '6.11': r`${OMR}

**Skriv som ett avstånd:** $|z+2|=|z-(-2)|$ är avståndet mellan $z$ och $-2$.

**Tolkning:** alla punkter på avståndet 1 från $-2$ – **cirkeln** med medelpunkt $-2$ och radie 1.`,
  '6.12a': r`${OMR}

$|z|=|z-0|=1$: avståndet till origo är 1 – **enhetscirkeln**.`,
  '6.12b': r`${OMR}

$|z|=3$: cirkeln med medelpunkt i origo och radie 3.`,
  '6.12c': r`${OMR}

$|z-2|=1$: cirkeln med medelpunkt $2$ och radie 1.`,
  '6.12d': r`${OMR}

**Skriv på formen $|z-z_0|$:** $|z+1+i|=|z-(-1-i)|=2$. Cirkeln med medelpunkt $-1-i$, alltså punkten $(-1,-1)$, och radie 2.`,
  '6.12e': r`${OMR}

$|z|\le2$: alla punkter på avstånd högst 2 från origo – **cirkelskivan**, randen inräknad (heldragen).`,
  '6.12f': r`${OMR}

$|z|>2$: alla punkter **utanför** cirkeln med radie 2. Strikt olikhet, så cirkeln ritas streckad.`,
  '6.12g': r`${OMR}

$|z+1|=|z-(-1)|$ är avståndet till $-1$. Villkoret $1\le|z+1|\le2$ betyder att avståndet ligger mellan 1 och 2: en **ring** med medelpunkt $-1$, inre radie 1 och yttre radie 2 (båda randerna inräknade).`,
  '6.13': r`**Metod (F12): sätt $z=x+iy$ och översätt varje villkor.**

**Andra villkoret:** $z+\bar z=2x=2\iff x=1$.

**Första villkoret:** $z-3i=x+(y-3)i$, så $|z-3i|=\sqrt{x^2+(y-3)^2}=2$. Med $x=1$:
$$1+(y-3)^2=4\iff(y-3)^2=3\iff y=3\pm\sqrt3.$$
**Geometriskt:** skärningen mellan cirkeln med medelpunkt $3i$ och radie 2 och linjen $\operatorname{Re}z=1$ – två punkter.

**Svar:** $z=1+(3+\sqrt3)i$ och $z=1+(3-\sqrt3)i$.`,
  '6.14': r`${OMR}

**Geometriskt:** $|z-1|=|z+1|$ betyder att $z$ ligger **lika långt** från $1$ som från $-1$. Det är mittpunktsnormalen till sträckan mellan dem – Im-axeln.

**Algebraiskt (kontroll):** kvadrera båda leden: $(x-1)^2+y^2=(x+1)^2+y^2\iff-2x=2x\iff x=0$ ✓`,
  '6.15': r`**Metod (F12): sätt $z=x+iy$ och kvadrera bort rötterna.** (Avståndstolkningen räcker inte direkt här på grund av faktorn 2.)

$|z-1|^2=(x-1)^2+y^2$ och $|z+1|^2=(x+1)^2+y^2$. Kvadrera villkoret:
$$(x-1)^2+y^2=4\left((x+1)^2+y^2\right)\iff x^2-2x+1+y^2=4x^2+8x+4+4y^2.$$
**Samla:** $0=3x^2+10x+3+3y^2\iff x^2+\frac{10}3x+y^2+1=0$.

**Kvadratkomplettera:** $\left(x+\frac53\right)^2-\frac{25}9+y^2+1=0\iff\left(x+\frac53\right)^2+y^2=\frac{16}9$.

**Svar:** cirkeln med medelpunkt $-\frac53$ och radie $\frac43$.`,
  '6.16': r`**Metod (F12): skriv om så att villkoret blir ett avstånd.** ($z\ne0$.)

**Gemensam nämnare:** $\frac1z-\frac14=\frac{4-z}{4z}$.

**Räkneregeln för belopp av kvot:** $\left|\frac{4-z}{4z}\right|=\frac{|4-z|}{4|z|}=\frac14\iff|z-4|=|z|$.

**Tolkning:** $z$ ligger lika långt från $4$ som från $0$, alltså på mittpunktsnormalen: linjen $\operatorname{Re}z=2$.`,
  '6.17': r`**Metod (F12): förläng med konjugatet och sätt $z=x+iy$.**

**Skriv om $\frac1z$:** $\frac1z=\frac{\bar z}{z\bar z}=\frac{\bar z}{|z|^2}=\frac{x-iy}{x^2+y^2}$.

**Imaginärdelen av $z+\frac1z$:**
$$\operatorname{Im}\left(z+\frac1z\right)=y-\frac{y}{x^2+y^2}=y\left(1-\frac1{x^2+y^2}\right).$$
**Reellt** $\iff$ imaginärdelen är 0 $\iff y=0$ eller $x^2+y^2=1$.

**Svar:** reella axeln (utom $z=0$, där $\frac1z$ inte är definierat) och enhetscirkeln $|z|=1$.`,
  '6.18': r`${POL}

Använd $z=r(\cos\theta+i\sin\theta)$. a) $\sqrt2\left(\frac{1}{\sqrt2}+\frac{i}{\sqrt2}\right)=1+i$. c) $\frac{9\pi}{4}=\frac\pi4+2\pi$, samma som a). f) $\frac{1}{\sqrt2}\left(\frac{1}{\sqrt2}-\frac{i}{\sqrt2}\right)=\frac12(1-i)$. g) $-100\pi$ är ett helt antal varv, så $z=1$.`,
  '6.19': r`${POL}

$|z|=\sqrt{a^2+b^2}$; argumentet bestäms ur en figur (kvadranten!). d) $-1+i$: $|z|=\sqrt2$, andra kvadranten, vinkeln $\frac{3\pi}4$. e) $-1+i\sqrt3$: $|z|=2$, $\tan\theta=-\sqrt3$ i andra kvadranten ger $\frac{2\pi}3$. f) $\sqrt3+3i$: $|z|=\sqrt{12}=2\sqrt3$, $\tan\theta=\sqrt3$ i första kvadranten ger $\frac\pi3$.`,
  '6.20': r`${POL}

$|\cos\theta+i\sin\theta|=\sqrt{\cos^2\theta+\sin^2\theta}=1$ för alla reella $\theta$.`,
  '6.21': r`${POL}

$e^{i\theta}=\cos\theta+i\sin\theta$, så $|e^{i\theta}|=1$ (se 6.20).`,
  '6.22': r`${POL}

Vid multiplikation adderas argumenten, vid division subtraheras de: a) $\frac\pi3+\frac\pi4=\frac{7\pi}{12}$, b) $\frac\pi3-\frac\pi4=\frac{\pi}{12}$. c) Nej, argumentet av en summa beror även på beloppen.`,
  '6.23': r`${POL}

$\arg z^{2000}=2000\cdot\frac\pi3=\frac{2000\pi}{3}=666\pi+\frac{2\pi}{3}=333\cdot2\pi+\frac{2\pi}3$, alltså $\frac{2\pi}3$.`,
  '6.24': r`${POL}

$\arg(1+i\sqrt3)=\frac\pi3$, $\arg(2-2i)=-\frac\pi4$. $\arg z=\frac\pi3-3\left(-\frac\pi4\right)=\frac\pi3+\frac{3\pi}4=\frac{13\pi}{12}$ (+$2\pi k$).`,
  '6.25': r`${POL}

$\arg(2+2i)=\frac\pi4$, $\arg(1+i\sqrt3)=\frac\pi3$, $\arg(3i)=\frac\pi2$, $\arg(2\sqrt3-2i)=-\frac\pi6$. Totalt $\frac\pi4+\frac\pi3-\frac\pi2+\frac\pi6=\frac{3\pi}{12}=\frac\pi4$.`,
  '6.27': r`${POL}

$\frac12+i\frac{\sqrt3}2=e^{i\pi/3}$, så talet är $e^{i100\pi/3}$. $\frac{100\pi}{3}=16\cdot2\pi+\frac{4\pi}{3}$, alltså $e^{4\pi i/3}=-\frac12-i\frac{\sqrt3}2$.`,
  '6.28': r`${POL}

Sätt $c=\cos\theta$, $s=\sin\theta$. Binomialsatsen: $(c+is)^4=c^4+4c^3(is)+6c^2(is)^2+4c(is)^3+(is)^4=(c^4-6c^2s^2+s^4)+i(4c^3s-4cs^3)$. Enligt de Moivre är detta $\cos4\theta+i\sin4\theta$; identifiera real- och imaginärdel.`,
  '6.29': r`${POL}

$\cos\alpha\sin\beta=\frac{e^{i\alpha}+e^{-i\alpha}}{2}\cdot\frac{e^{i\beta}-e^{-i\beta}}{2i}=\frac{e^{i(\alpha+\beta)}-e^{-i(\alpha+\beta)}}{4i}-\frac{e^{i(\alpha-\beta)}-e^{-i(\alpha-\beta)}}{4i}=\frac12\left(\sin(\alpha+\beta)-\sin(\alpha-\beta)\right)$.`,
  '6.30': r`${POL}

$\sin^4\theta=\left(\frac{e^{i\theta}-e^{-i\theta}}{2i}\right)^4=\frac{1}{16}\left(e^{4i\theta}-4e^{2i\theta}+6-4e^{-2i\theta}+e^{-4i\theta}\right)=\frac{1}{16}(2\cos4\theta-8\cos2\theta+6)=\frac38-\frac12\cos2\theta+\frac18\cos4\theta$.`,
  '6.31': r`${POL}

Vridning $\pi/2$ moturs = multiplikation med $e^{i\pi/2}=i$. a) $i\cdot1=i$. b) $i(-3+2i)=-3i+2i^2=-2-3i$.`,
  '6.34': r`${POL}

$e^{x+iy}=e^x(\cos y+i\sin y)$. a) $e^0=1$. b) $\cos\frac\pi2+i\sin\frac\pi2=i$. c) $e^{\frac12\ln2}=\sqrt2$, så $\sqrt2\left(\frac{1}{\sqrt2}+\frac{i}{\sqrt2}\right)=1+i$. d) $\cos\pi=-1$. e) $e^3(\cos(-1)+i\sin(-1))=e^3\cos1-ie^3\sin1$.`,
  '6.36': r`${POL}

$e^z=e^xe^{iy}$ och $|e^{iy}|=1$, så $|e^z|=e^x$. Argumentet av $e^xe^{iy}$ är $y$ (mod $2\pi$).`,
  '6.37a': r`${BIN}

$z=x+iy$: $x^2-y^2=5$, $2xy=12$, och $x^2+y^2=|5+12i|=13$. Addera: $x^2=9$; subtrahera: $y^2=4$. $xy=6>0$ ger samma tecken: $z=\pm(3+2i)$.`,
  '6.37b': r`${BIN}

Kvadratkomplettera: $z^2-(2+2i)z=(z-(1+i))^2-(1+i)^2=(z-1-i)^2-2i$. Ekvationen blir $(z-1-i)^2=5+10i+2i=5+12i$. Enligt a) är $z-1-i=\pm(3+2i)$, så $z=4+3i$ eller $z=-2-i$.`,
  '6.38a': r`${BIN}

$-i=e^{-i\pi/2}$, så $z=\pm e^{-i\pi/4}=\pm\frac{1}{\sqrt2}(1-i)$.`,
  '6.38b': r`${BIN}

$1+i\sqrt3=2e^{i\pi/3}$, så $z=\pm\sqrt2e^{i\pi/6}=\pm\sqrt2\left(\frac{\sqrt3}{2}+\frac i2\right)=\pm\frac12(\sqrt6+i\sqrt2)$.`,
  '6.38c': r`${BIN}

$z=x+iy$: $x^2-y^2=3$, $2xy=4$, $x^2+y^2=5$ ger $x^2=4$, $y^2=1$, samma tecken: $z=\pm(2+i)$.`,
  '6.39a': r`${BIN}

$(z+i)^2=z^2+2iz-1$, så ekvationen är $(z+i)^2=-2i$. $w^2=-2i$ ger $w=\pm(1-i)$ (kontroll: $(1-i)^2=-2i$). $z=-i\pm(1-i)$: $z=1-2i$ eller $z=-1$.`,
  '6.39b': r`${BIN}

$(z+1-i)^2=z^2+(2-2i)z-2i$, så ekvationen blir $(z+1-i)^2=3+6i-2i=3+4i$. $w^2=3+4i$ ger $w=\pm(2+i)$. $z=-1+i\pm(2+i)$: $z=1+2i$ eller $z=-3$.`,
  '6.41': r`${BIN}

Binomisk ekvation $z^n=w$: sätt $z=re^{i\theta}$, $w=|w|e^{i\varphi}$. Då är $r=|w|^{1/n}$ och $\theta=\frac{\varphi}{n}+\frac{2\pi k}{n}$, $k=0,\dots,n-1$.`,
  '6.41a': r`${BIN}

$i=e^{i\pi/2}$: $r=1$, $\theta=\frac\pi6+\frac{2\pi k}3$, dvs. $\frac\pi6,\frac{5\pi}6,\frac{3\pi}2$, vilket ger $\frac{\sqrt3}2+\frac i2$, $-\frac{\sqrt3}2+\frac i2$, $-i$.`,
  '6.41b': r`${BIN}

$1+i=\sqrt2e^{i\pi/4}$: $r=2^{1/6}$, $\theta=\frac{\pi}{12}+\frac{2\pi k}{3}$, dvs. $\frac\pi{12},\frac{3\pi}4,\frac{17\pi}{12}$.`,
  '6.41c': r`${BIN}

$16=16e^{i0}$: $r=2$, $\theta=\frac{2\pi k}4=0,\frac\pi2,\pi,\frac{3\pi}2$, dvs. $2,2i,-2,-2i$.`,
  '6.41d': r`${BIN}

$-1+i\sqrt3=2e^{2\pi i/3}$: $r=2^{1/3}$, $\theta=\frac{2\pi}9+\frac{2\pi k}{3}$, dvs. $\frac{2\pi}9,\frac{8\pi}9,\frac{14\pi}9$.`,
  '6.41e': r`${BIN}

$4i=4e^{i\pi/2}$: $r=4^{1/5}$, $\theta=\frac{\pi}{10}+\frac{2\pi k}{5}$, dvs. $\frac\pi{10},\frac\pi2,\frac{9\pi}{10},\frac{13\pi}{10},\frac{17\pi}{10}$.`,
  '6.41f': r`${BIN}

$-1=e^{i\pi}$: $r=1$, $\theta=\frac\pi4+\frac{\pi k}2$, vilket ger $\frac{\pm1\pm i}{\sqrt2}$.`,
  '6.43': r`${BIN}

Sätt $w=1+z^2$. $w^3=-8=8e^{i\pi}$ ger $w=2e^{i(\pi/3+2\pi k/3)}$: $w=1+i\sqrt3$, $-2$, $1-i\sqrt3$. Då är $z^2=w-1=i\sqrt3$, $-3$, $-i\sqrt3$. $z^2=-3$: $z=\pm i\sqrt3$. $z^2=i\sqrt3=\sqrt3e^{i\pi/2}$: $z=\pm3^{1/4}e^{i\pi/4}=\pm\left(\frac34\right)^{1/4}(1+i)$. $z^2=-i\sqrt3$: $z=\pm\left(\frac34\right)^{1/4}(1-i)$.`,
  '6.44': r`${POLY}

Faktorsatsen: $x-1$ är en faktor $\iff p(1)=0\iff1-2-19+a=0\iff a=20$. Polynomdivision: $x^3-2x^2-19x+20=(x-1)(x^2-x-20)=(x-1)(x-5)(x+4)$.`,
  '6.45': r`${POLY}

Koefficienterna är reella, så även konjugaten $2-i$ och $-1+2i$ är rötter. Ett fjärdegradspolynom har fyra rötter: $2\pm i$, $-1\pm2i$.`,
  '6.46': r`${POLY}

Reella koefficienter kräver att även $2+i$ (enkel) och $-i$ (dubbel) är rötter: totalt $1+1+2+2=6$ rötter. $(z-2+i)(z-2-i)=z^2-4z+5$ och $(z-i)^2(z+i)^2=(z^2+1)^2$. Multiplicera ut: $(z^2-4z+5)(z^4+2z^2+1)=z^6-4z^5+7z^4-8z^3+11z^2-4z+5$.`,
  '6.47': r`${POLY}

a) $z^2-7z+10=(z-5)(z-2)$; summan är $7$ (= minus koefficienten för $z$) och produkten $10$ (konstanttermen). b) Dividera med 3 – samma ekvation. c) $z(z^2-7z+10)=0$: rötterna $5,2,0$.`,
  '6.49': r`${POLY}

Sätt $z=bi$: real- och imaginärdel ger $b^4-7b^2-18=0$ och $b^3-9b=0$. Gemensam lösning $b=\pm3$, så $z^2+9$ är en faktor. Division: $z^4-z^3+7z^2-9z-18=(z^2+9)(z^2-z-2)=(z^2+9)(z-2)(z+1)$. Rötter: $\pm3i,2,-1$.`,
  '6.52a': r`${POLY}

$x^3-x=x(x^2-1)=x(x+1)(x-1)$.`,
  '6.52b': r`${POLY}

$x^3+x=x(x^2+1)$, och $x^2+1$ saknar reella nollställen.`,
  '6.52c': r`${POLY}

$x^4-1=(x^2-1)(x^2+1)=(x+1)(x-1)(x^2+1)$.`,
  '6.52d': r`${POLY}

$x^4=-1$ har rötterna $e^{i(\pi/4+k\pi/2)}$. Para ihop konjugerade par: $(x-e^{i\pi/4})(x-e^{-i\pi/4})=x^2-2\cos\frac\pi4x+1=x^2-\sqrt2x+1$ och på samma sätt $x^2+\sqrt2x+1$.`,
  '6.55a': r`${POL}

$\sum_{k=0}^5\binom5k(i\sqrt3)^k=1+5i\sqrt3-30-30\sqrt3i+45+9\sqrt3i=16-16\sqrt3i$.`,
  '6.55b': r`${POL}

$1+i\sqrt3=2e^{i\pi/3}$, så talet är $32e^{5\pi i/3}=32\left(\frac12-\frac{\sqrt3}2i\right)=16-16\sqrt3i$.`,
  '6.56': r`${POL}

$1+e^{i\pi/2}=1+i=\sqrt2e^{i\pi/4}$.`,
  '6.61': r`${POL}

Vridning vinkeln $\theta$ = multiplikation med $e^{i\theta}$. Vektorn $(1,2)$ är $1+2i$. a) $i(1+2i)=-2+i$. b) $(1+2i)\frac{1+i}{\sqrt2}=\frac{-1+3i}{\sqrt2}$. c) $-(1+2i)$. d) $(1+2i)(\cos\theta+i\sin\theta)=(\cos\theta-2\sin\theta)+i(2\cos\theta+\sin\theta)$.`,
  '6.62': r`${POL}

Som 6.61 med $x+iy$: $(x+iy)e^{i\theta}=(x\cos\theta-y\sin\theta)+i(x\sin\theta+y\cos\theta)$. Specialfallen $\theta=\frac\pi2,\frac\pi4,\pi$ ger a)–c).`,
  '6.68a': r`${POLY}

Koefficienterna är reella, så konjugatet $1-i\sqrt2$ är också en rot.`,
  '6.68b': r`${POLY}

$(z-1-i\sqrt2)(z-1+i\sqrt2)=(z-1)^2+2=z^2-2z+3$ delar polynomet.`,
  '6.68c': r`${POLY}

Polynomdivision: $z^6-2z^5+3z^4+4z^2-8z+12=(z^2-2z+3)(z^4+4)$. $z^4=-4=4e^{i\pi}$ ger $z=\sqrt2e^{i(\pi/4+k\pi/2)}=\pm1\pm i$.`,
}
