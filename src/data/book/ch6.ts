import type { BookTask } from './types'

const r = String.raw

/** Kapitel 6 – Komplexa tal. Svar ur bokens facit ("Svar Kapitel 6"), tips ur "Tips Kapitel 6". */
export const CH6: BookTask[] = [
  {
    id: '6.1', answerSource: 'bok', intro: r`Bestäm $\operatorname{Re} z$ och $\operatorname{Im} z$ om $z$ är … Rita ut talen i det komplexa talplanet.`,
    parts: {
      a: { text: r`$2+3i$`, answer: r`$2,\ 3$`, checks: ["eq('re(2+3*I)', 2)", "eq('im(2+3*I)', 3)"] },
      b: { text: r`$-1-i$`, answer: r`$-1,\ -1$` },
      c: { text: r`$3$`, answer: r`$3,\ 0$` },
      d: { text: r`$2i$`, answer: r`$0,\ 2$` },
      e: { text: r`$-i$`, answer: r`$0,\ -1$` },
    },
  },
  {
    id: '6.2', answerSource: 'bok', intro: r`Skriv följande tal på formen $a+bi$ där $a$ och $b$ är reella:`,
    parts: {
      a: { text: r`$(1+i)+(-3-2i)$`, answer: r`$-2-i$`, checks: ["eq('(1+I)+(-3-2*I)', '-2-I')"] },
      b: { text: r`$(1+i)-(3-4i)$`, answer: r`$-2+5i$`, checks: ["eq('(1+I)-(3-4*I)', '-2+5*I')"] },
      c: { text: r`$(1+i)(3-4i)$`, answer: r`$7-i$`, checks: ["eq('expand((1+I)*(3-4*I))', '7-I')"] },
      d: { text: r`$(1-i)^2$`, answer: r`$-2i$`, checks: ["eq('expand((1-I)**2)', '-2*I')"] },
      e: { text: r`$(5-2i)^3$`, answer: r`$65-142i$`, checks: ["eq('expand((5-2*I)**3)', '65-142*I')"] },
      f: { text: r`$(1-i)^4$`, answer: r`$-4$`, checks: ["eq('expand((1-I)**4)', '-4')"] },
    },
  },
  {
    id: '6.3', answerSource: 'bok', intro: r`Beräkna`,
    parts: {
      a: { text: r`$\overline{1+i}$`, answer: r`$1-i$` },
      b: { text: r`$\overline{3-5i}$`, answer: r`$3+5i$` },
      c: { text: r`$\overline{-7}$`, answer: r`$-7$` },
      d: { text: r`$(1+i)\overline{(1+i)}$`, answer: r`$2$`, checks: ["eq('(1+I)*conjugate(1+I)', 2)"] },
      e: { text: r`$|1+i|$`, answer: r`$\sqrt2$`, checks: ["eq('Abs(1+I)', 'sqrt(2)')"] },
      f: { text: r`$|i|$`, answer: r`$1$` },
      g: { text: r`$|3-2i|$`, answer: r`$\sqrt{13}$`, checks: ["eq('Abs(3-2*I)', 'sqrt(13)')"] },
      h: { text: r`$|-5i|$`, answer: r`$5$` },
    },
  },
  {
    id: '6.4', answerSource: 'bok', intro: r`Skriv följande tal på formen $a+bi$ där $a$ och $b$ är reella:`,
    parts: {
      a: { text: r`$\dfrac{1}{1+i}$`, answer: r`$\frac12-\frac12 i$`, checks: ["eq('1/(1+I)', '1/2-I/2')"] },
      b: { text: r`$\dfrac{1}{3-4i}$`, answer: r`$\frac{3}{25}+\frac{4}{25}i$`, checks: ["eq('1/(3-4*I)', '3/25+4*I/25')"] },
      c: { text: r`$\dfrac{3-4i}{1+i}$`, answer: r`$-\frac12-\frac72 i$`, checks: ["eq('(3-4*I)/(1+I)', '-1/2-7*I/2')"] },
      d: { text: r`$\dfrac{1-i}{1+i}$`, answer: r`$-i$`, checks: ["eq('(1-I)/(1+I)', '-I')"] },
      e: { text: r`$(1+i)^{-2}$`, answer: r`$-\frac12 i$`, checks: ["eq('(1+I)**(-2)', '-I/2')"] },
      f: { text: r`$\dfrac1i$`, answer: r`$-i$`, checks: ["eq('1/I', '-I')"] },
    },
  },
  {
    id: '6.5', answerSource: 'bok', mark: 'L', intro: r`Beräkna absolutbeloppet av talen`,
    parts: {
      a: { text: r`$(1-i)^{14}$`, answer: r`$128$`, checks: ["eq('Abs((1-I)**14)', 128)"] },
      b: { text: r`$\dfrac{3+i}{4+3i}$`, answer: r`$\frac{\sqrt{10}}{5}$`, checks: ["eq('Abs((3+I)/(4+3*I))', 'sqrt(10)/5')"] },
    },
  },
  {
    id: '6.6', answerSource: 'bok', intro: r`Beräkna absolutbeloppet av $\dfrac{(1+2i)(7+\sqrt3 i)^2}{(5+i)^2}$.`,
    answer: r`$2\sqrt5$`, checks: ["eq('Abs((1+2*I)*(7+sqrt(3)*I)**2/(5+I)**2)', '2*sqrt(5)')"],
  },
  {
    id: '6.7', answerSource: 'bok', mark: 'L', intro: r`Lös ekvationen $z+2\bar z = 2-i$.`,
    answer: r`$z = \frac23 + i$`, checks: ["eq('(Rational(2,3)+I) + 2*conjugate(Rational(2,3)+I)', '2-I')"],
  },
  {
    id: '6.8', answerSource: 'bok', intro: r`Lös ekvationerna`,
    parts: {
      a: { text: r`$3z - i\bar z = 7-5i$`, answer: r`$z = 2-i$`, checks: ["eq('3*(2-I) - I*conjugate(2-I)', '7-5*I')"] },
      b: { text: r`$z\cdot 2\bar z = 1+i$`, answer: r`Lösning saknas ($2|z|^2$ är reellt men $1+i$ är det inte).` },
    },
  },
  { id: '6.9', answerSource: 'bok', mark: 'L', intro: r`Tolka geometriskt i det komplexa talplanet relationen $\operatorname{Re} z + \operatorname{Im} z = 1$.`, answer: r`Den räta linjen genom $1$ och $i$ (dvs. $x + y = 1$).` },
  {
    id: '6.10', answerSource: 'bok', intro: r`Rita i det komplexa talplanet de $z$ som uppfyller relationen`,
    parts: {
      a: { text: r`$\operatorname{Re} z = 3$`, answer: r`Linjen $x = 3$` },
      b: { text: r`$\operatorname{Im} z = -1$`, answer: r`Linjen $y = -1$` },
      c: { text: r`$\operatorname{Im} z > 0$`, answer: r`Halvplanet $y > 0$` },
      d: { text: r`$z + \bar z = 0$`, answer: r`Imaginära axeln` },
      e: { text: r`$z = \bar z$`, answer: r`Reella axeln` },
    },
  },
  { id: '6.11', answerSource: 'bok', mark: 'L', intro: r`Rita i det komplexa talplanet de $z$ som uppfyller $|z+2| = 1$.`, answer: r`Cirkeln med radie 1 och medelpunkt $-2$.` },
  {
    id: '6.12', answerSource: 'bok', intro: r`Rita i det komplexa talplanet`,
    parts: {
      a: { text: r`$|z| = 1$`, answer: r`Cirkeln med radie 1 och medelpunkt 0` },
      b: { text: r`$|z| = 3$`, answer: r`Cirkeln med radie 3 och medelpunkt 0` },
      c: { text: r`$|z-2| = 1$`, answer: r`Cirkeln med radie 1 och medelpunkt 2` },
      d: { text: r`$|z+1+i| = 2$`, answer: r`Cirkeln med radie 2 och medelpunkt $-1-i$` },
      e: { text: r`$|z| \le 2$`, answer: r`Cirkelskivan med radie 2 och medelpunkt 0` },
      f: { text: r`$|z| > 2$`, answer: r`Allt utanför cirkelskivan i e)` },
      g: { text: r`$1 \le |z+1| \le 2$`, answer: r`Området mellan två cirklar med medelpunkt $-1$ och radierna 1 respektive 2` },
    },
  },
  {
    id: '6.13', answerSource: 'bok', intro: r`Bestäm alla komplexa tal som uppfyller $\begin{cases}|z-3i| = 2,\\ z+\bar z = 2.\end{cases}$`,
    answer: r`$z = 1 + i(3\pm\sqrt3)$`, checks: ["eq('Abs(1+I*(3+sqrt(3)) - 3*I)', 2)", "eq('Abs(1+I*(3-sqrt(3)) - 3*I)', 2)"],
  },
  { id: '6.14', answerSource: 'bok', mark: 'L', intro: r`Bestäm alla komplexa tal för vilka $|z-1| = |z+1|$.`, answer: r`Alla tal på imaginära axeln.` },
  {
    id: '6.15', answerSource: 'bok', mark: 'L', intro: r`Bestäm alla komplexa tal för vilka $|z-1| = 2|z+1|$.`,
    answer: r`Alla $z$ på cirkeln med radie $\frac43$ och medelpunkt $-\frac53$.`,
    checks: ["is_true('all(abs(abs(complex(-5/3+4/3*cos(t_), 4/3*sin(t_))-1) - 2*abs(complex(-5/3+4/3*cos(t_), 4/3*sin(t_))+1)) < 1e-12 for t_ in [0.3, 1.1, 2.5, 4])')"],
  },
  {
    id: '6.16', answerSource: 'bok', mark: 'T', intro: r`Bestäm alla komplexa tal för vilka $\left|\dfrac1z - \dfrac14\right| = \dfrac14$.`,
    answer: r`Alla $z$ på linjen $\operatorname{Re} z = 2$.`, tip: r`Gör liknämnigt och skriv ekvationen som $\dfrac{|z-4|}{|z|} = 1$.`,
    checks: ["eq('Abs(1/(2+5*I) - Rational(1,4))', '1/4')"],
  },
  { id: '6.17', answerSource: 'bok', intro: r`Bestäm alla komplexa tal sådana att $z + \dfrac1z$ är reellt.`, answer: r`Alla tal på reella axeln utom $z = 0$, samt alla tal på enhetscirkeln.` },
  {
    id: '6.18', answerSource: 'bok', intro: r`Ange på formen $a+bi$ de komplexa tal vars absolutbelopp och argument är`,
    parts: {
      a: { text: r`$\sqrt2,\ \frac\pi4$`, answer: r`$1+i$`, checks: ["eq('sqrt(2)*exp(I*pi/4)', '1+I')"] },
      b: { text: r`$1,\ \pi$`, answer: r`$-1$` },
      c: { text: r`$\sqrt2,\ \frac{9\pi}4$`, answer: r`$1+i$`, checks: ["eq('sqrt(2)*exp(9*I*pi/4)', '1+I')"] },
      d: { text: r`$1,\ \frac\pi2$`, answer: r`$i$` },
      e: { text: r`$1,\ 2\pi$`, answer: r`$1$` },
      f: { text: r`$\frac1{\sqrt2},\ -\frac\pi4$`, answer: r`$\frac12(1-i)$`, checks: ["eq('exp(-I*pi/4)/sqrt(2)', '(1-I)/2')"] },
      g: { text: r`$1,\ -100\pi$`, answer: r`$1$` },
    },
  },
  {
    id: '6.19', answerSource: 'bok', intro: r`Rita följande komplexa tal i ett talplan. Bestäm även argument, absolutbelopp och polär form:`,
    parts: {
      a: { text: r`$1$`, answer: r`$\arg z = 0,\ |z| = 1,\ z = 1e^{i0}$` },
      b: { text: r`$-13$`, answer: r`$\arg z = \pi,\ |z| = 13,\ z = 13e^{i\pi}$` },
      c: { text: r`$i$`, answer: r`$\arg z = \frac\pi2,\ |z| = 1,\ z = 1e^{i\pi/2}$` },
      d: { text: r`$-1+i$`, answer: r`$\arg z = \frac{3\pi}4,\ |z| = \sqrt2,\ z = \sqrt2e^{3\pi i/4}$`, checks: ["eq('sqrt(2)*exp(3*I*pi/4)', '-1+I')"] },
      e: { text: r`$i\sqrt3-1$`, answer: r`$\arg z = \frac{2\pi}3,\ |z| = 2,\ z = 2e^{2\pi i/3}$`, checks: ["eq('2*exp(2*I*pi/3)', '-1+sqrt(3)*I')"] },
      f: { text: r`$\sqrt3+3i$`, answer: r`$\arg z = \frac\pi3,\ |z| = 2\sqrt3,\ z = 2\sqrt3e^{i\pi/3}$`, checks: ["eq('2*sqrt(3)*exp(I*pi/3)', 'sqrt(3)+3*I')"] },
    },
  },
  {
    id: '6.20', answerSource: 'bok', intro: r`Vad är absolutbeloppet av`,
    parts: {
      a: { text: r`$\cos\frac\pi8 + i\sin\frac\pi8$`, answer: r`$1$` },
      b: { text: r`$\cos\frac{9\pi}5 + i\sin\frac{9\pi}5$`, answer: r`$1$` },
      c: { text: r`$\cos\theta + i\sin\theta$?`, answer: r`$1$` },
    },
  },
  {
    id: '6.21', answerSource: 'bok', intro: r`Vad är absolutbeloppet av`,
    parts: {
      a: { text: r`$e^{i\pi/8}$`, answer: r`$1$` },
      b: { text: r`$e^{i9\pi/5}$`, answer: r`$1$` },
      c: { text: r`$e^{i\theta}$ om $\theta$ är reellt?`, answer: r`$1$` },
    },
  },
  {
    id: '6.22', answerSource: 'bok', intro: r`Argumentet av $z$ är $\pi/3$ och $\arg w = \pi/4$. Bestäm ett argument till`,
    parts: {
      a: { text: r`$zw$`, answer: r`$\frac{7\pi}{12}$` },
      b: { text: r`$z/w$`, answer: r`$\frac{\pi}{12}$` },
      c: { text: r`Kan man säga något om vad $\arg(z+w)$ eller $\arg(z-w)$ är?`, answer: r`Nej (det beror på beloppen).` },
    },
  },
  {
    id: '6.23', answerSource: 'bok', intro: r`Argumentet av $z$ är $\pi/3$. Ange ett argument som ligger mellan $0$ och $2\pi$ till $z^{2000}$.`,
    answer: r`$\frac{2\pi}3$`, checks: ["eq('Mod(2000*pi/3, 2*pi)', '2*pi/3')"],
  },
  {
    id: '6.24', answerSource: 'bok', mark: 'L', intro: r`Beräkna argumentet av $z = \dfrac{1+i\sqrt3}{(2-2i)^3}$.`,
    answer: r`$\frac{13\pi}{12} + k2\pi$, $k$ heltal`, checks: ["eq('arg((1+I*sqrt(3))/(2-2*I)**3) + 2*pi', '13*pi/12')"],
  },
  {
    id: '6.25', answerSource: 'bok', intro: r`Bestäm $\arg\dfrac{(2+2i)(1+i\sqrt3)}{3i(\sqrt{12}-2i)}$.`,
    answer: r`$\frac\pi4 + k2\pi$, $k$ heltal`, checks: ["eq('arg((2+2*I)*(1+I*sqrt(3))/(3*I*(sqrt(12)-2*I)))', 'pi/4')"],
  },
  {
    id: '6.27', answerSource: 'bok', intro: r`Beräkna $\left(\frac12 + i\frac{\sqrt3}2\right)^{100}$.`,
    answer: r`$-\frac12 - i\frac{\sqrt3}2$`, checks: ["eq('(Rational(1,2)+I*sqrt(3)/2)**100', '-Rational(1,2)-I*sqrt(3)/2')"],
  },
  {
    id: '6.28', answerSource: 'bok', mark: 'T', intro: r`Använd de Moivres formel för att uttrycka $\cos 4\theta$ och $\sin 4\theta$ med hjälp av $\sin\theta$ och $\cos\theta$.`,
    answer: r`$\cos4\theta = \cos^4\theta - 6\cos^2\theta\sin^2\theta + \sin^4\theta$, $\quad\sin4\theta = 4\cos^3\theta\sin\theta - 4\cos\theta\sin^3\theta$`,
    tip: r`Enligt de Moivres formel gäller $(\cos\theta + i\sin\theta)^4 = \cos4\theta + i\sin4\theta$. Utveckla nu vänsterledet med hjälp av binomialsatsen.`,
    checks: ["eq('cos(4*x) - (cos(x)**4 - 6*cos(x)**2*sin(x)**2 + sin(x)**4)', 0)", "eq('sin(4*x) - (4*cos(x)**3*sin(x) - 4*cos(x)*sin(x)**3)', 0)"],
  },
  {
    id: '6.29', answerSource: 'bok', mark: 'L', intro: r`Använd Eulers formler för att härleda ett uttryck för $\cos\alpha\sin\beta$.`,
    answer: r`$\cos\alpha\sin\beta = \frac12\big(\sin(\alpha+\beta) - \sin(\alpha-\beta)\big)$`,
    checks: ["eq('cos(x)*sin(t) - (sin(x+t) - sin(x-t))/2', 0)"],
  },
  {
    id: '6.30', answerSource: 'bok', mark: 'T', intro: r`Uttryck $\sin^4\theta$ med hjälp av cosinus för $\theta$, $2\theta$, $3\theta$ och $4\theta$.`,
    answer: r`$\sin^4\theta = \frac38 - \frac12\cos2\theta + \frac18\cos4\theta$`,
    tip: r`Skriv $\sin\theta$ som $\dfrac{e^{i\theta} - e^{-i\theta}}{2i}$ och använd binomialsatsen.`,
    checks: ["eq('sin(x)**4 - (Rational(3,8) - cos(2*x)/2 + cos(4*x)/8)', 0)"],
  },
  {
    id: '6.31', answerSource: 'bok', mark: 'T', intro: r`Vektorerna i det komplexa talplanet vrids vinkeln $\pi/2$ i positiv led. I vilket tal övergår`,
    parts: {
      a: { text: r`$1$`, answer: r`$i$` },
      b: { text: r`$-3+2i$?`, answer: r`$-2-3i$`, checks: ["eq('I*(-3+2*I)', '-2-3*I')"] },
    },
    tip: r`Vridning innebär att storleken, dvs. absolutbeloppet, inte ändras. Vridning vinkeln $\pi/2$ i positiv led motsvarar att argumentet ökar med $\pi/2$. Alltså ska de givna talen multipliceras med $1\cdot e^{i\pi/2} = i$.`,
  },
  {
    id: '6.34', answerSource: 'bok', intro: r`Beräkna $e^z$ för följande $z$:`,
    parts: {
      a: { text: r`$0$`, answer: r`$1$` },
      b: { text: r`$i\frac\pi2$`, answer: r`$i$` },
      c: { text: r`$\frac12\ln2 + i\frac\pi4$`, answer: r`$1+i$`, checks: ["eq('exp(log(2)/2 + I*pi/4)', '1+I')"] },
      d: { text: r`$i\pi$`, answer: r`$-1$` },
      e: { text: r`$3-i$`, answer: r`$e^3\cos1 - ie^3\sin1$`, checks: ["eq('exp(3-I)', 'exp(3)*cos(1) - I*exp(3)*sin(1)')"] },
    },
  },
  { id: '6.36', answerSource: 'bok', intro: r`Visa att om $z = x+yi$ ($x$ och $y$ reella), så är $|e^z| = e^x$. Vad är $\arg e^z$?`, answer: r`$|e^z| = |e^x e^{iy}| = e^x\cdot 1$. $\arg e^z = y + k2\pi$, $k$ heltal.` },
  {
    id: '6.37', answerSource: 'bok', mark: 'TL', intro: r`Lös ekvationerna`,
    parts: {
      a: { text: r`$z^2 = 5+12i$`, answer: r`$z = \pm(3+2i)$`, checks: ["roots_ok('z**2 - (5+12*I)', ['3+2*I', '-3-2*I'])"] },
      b: { text: r`$z^2 - (2+2i)z - 5 - 10i = 0$`, answer: r`$z_1 = 4+3i,\ z_2 = -2-i$`, checks: ["roots_ok('z**2 - (2+2*I)*z - 5 - 10*I', ['4+3*I', '-2-I'])"] },
    },
    tip: r`Studera Exempel 6.12 respektive 6.13 på sidorna 98–100 i läroboken.`,
  },
  {
    id: '6.38', answerSource: 'bok', intro: r`Lös ekvationerna`,
    parts: {
      a: { text: r`$z^2 = -i$`, answer: r`$z = \pm\frac1{\sqrt2}(1-i)$`, checks: ["roots_ok('z**2 + I', ['(1-I)/sqrt(2)', '-(1-I)/sqrt(2)'])"] },
      b: { text: r`$z^2 = 1+i\sqrt3$`, answer: r`$z = \pm\frac12(\sqrt6 + i\sqrt2)$`, checks: ["roots_ok('z**2 - (1+I*sqrt(3))', ['(sqrt(6)+I*sqrt(2))/2', '-(sqrt(6)+I*sqrt(2))/2'])"] },
      c: { text: r`$z^2 = 4i+3$`, answer: r`$z = \pm(2+i)$`, checks: ["roots_ok('z**2 - (3+4*I)', ['2+I', '-2-I'])"] },
    },
  },
  {
    id: '6.39', answerSource: 'bok', intro: r`Lös ekvationerna`,
    parts: {
      a: { text: r`$z^2 + 2iz - 1 + 2i = 0$`, answer: r`$z_1 = -1,\ z_2 = 1-2i$`, checks: ["roots_ok('z**2 + 2*I*z - 1 + 2*I', ['-1', '1-2*I'])"] },
      b: { text: r`$z^2 + (2-2i)z - 6i - 3 = 0$`, answer: r`$z_1 = -3,\ z_2 = 1+2i$`, checks: ["roots_ok('z**2 + (2-2*I)*z - 6*I - 3', ['-3', '1+2*I'])"] },
    },
  },
  {
    id: '6.41', answerSource: 'bok', mark: 'TL', intro: r`Lös följande ekvationer och rita ut rötterna i det komplexa talplanet:`,
    parts: {
      a: { text: r`$z^3 = i$`, answer: r`$\frac{\sqrt3}2 + \frac12 i,\ -\frac{\sqrt3}2 + \frac12 i,\ -i$`, checks: ["roots_ok('z**3 - I', ['sqrt(3)/2+I/2', '-sqrt(3)/2+I/2', '-I'])"] },
      b: { text: r`$z^3 = 1+i$`, answer: r`$2^{1/6}e^{i\pi/12},\ 2^{1/6}e^{i3\pi/4},\ 2^{1/6}e^{i17\pi/12}$`, checks: ["roots_ok('z**3 - 1 - I', ['2**Rational(1,6)*exp(I*pi/12)', '2**Rational(1,6)*exp(3*I*pi/4)', '2**Rational(1,6)*exp(17*I*pi/12)'])"] },
      c: { text: r`$z^4 = 16$`, answer: r`$2,\ 2i,\ -2,\ -2i$`, checks: ["roots_ok('z**4 - 16', ['2', '2*I', '-2', '-2*I'])"] },
      d: { text: r`$z^3 = i\sqrt3 - 1$`, answer: r`$2^{1/3}e^{i2\pi/9},\ 2^{1/3}e^{i8\pi/9},\ 2^{1/3}e^{i14\pi/9}$`, checks: ["roots_ok('z**3 - I*sqrt(3) + 1', ['2**Rational(1,3)*exp(2*I*pi/9)', '2**Rational(1,3)*exp(8*I*pi/9)', '2**Rational(1,3)*exp(14*I*pi/9)'])"] },
      e: { text: r`$z^5 = 4i$`, answer: r`$4^{1/5}e^{i\pi/10},\ 4^{1/5}i,\ 4^{1/5}e^{i9\pi/10},\ 4^{1/5}e^{i13\pi/10},\ 4^{1/5}e^{i17\pi/10}$`, checks: ["roots_ok('z**5 - 4*I', ['4**Rational(1,5)*exp(I*pi/10)', '4**Rational(1,5)*I', '4**Rational(1,5)*exp(9*I*pi/10)', '4**Rational(1,5)*exp(13*I*pi/10)', '4**Rational(1,5)*exp(17*I*pi/10)'])"] },
      f: { text: r`$z^4 = -1$`, answer: r`$\frac1{\sqrt2} + \frac1{\sqrt2}i,\ -\frac1{\sqrt2} + \frac1{\sqrt2}i,\ -\frac1{\sqrt2} - \frac1{\sqrt2}i,\ \frac1{\sqrt2} - \frac1{\sqrt2}i$`, checks: ["roots_ok('z**4 + 1', ['(1+I)/sqrt(2)', '(-1+I)/sqrt(2)', '(-1-I)/sqrt(2)', '(1-I)/sqrt(2)'])"] },
    },
    tip: r`Studera Exempel 6.15 på sidan 101 i läroboken.`,
  },
  {
    id: '6.43', answerSource: 'bok', intro: r`Bestäm alla komplexa rötter till ekvationen $(1+z^2)^3 = -8$. Svaret skall ges på formen $a+bi$, $a$ och $b$ reella.`,
    answer: r`$\pm i\sqrt3,\ \left(\frac34\right)^{1/4}(\pm1\pm i)$ (totalt sex rötter)`,
    checks: ["roots_ok('(1+z**2)**3 + 8', ['I*sqrt(3)', '-I*sqrt(3)', '(Rational(3,4))**Rational(1,4)*(1+I)', '(Rational(3,4))**Rational(1,4)*(1-I)', '(Rational(3,4))**Rational(1,4)*(-1+I)', '(Rational(3,4))**Rational(1,4)*(-1-I)'])"],
  },
  {
    id: '6.44', answerSource: 'bok', intro: r`Bestäm konstanten $a$ så att polynomet $p(x) = x^3 - 2x^2 - 19x + a$ får faktorn $x-1$. Faktorisera sedan polynomet för detta $a$-värde.`,
    answer: r`$a = 20$, $p(x) = (x-1)(x-5)(x+4)$`, checks: ["eq('expand((x-1)*(x-5)*(x+4))', 'x**3 - 2*x**2 - 19*x + 20')"],
  },
  {
    id: '6.45', answerSource: 'bok', mark: 'L', intro: r`Ekvationen $z^4 - 2z^3 + 2z^2 - 10z + 25 = 0$ har rötterna $z = 2+i$ och $z = -1-2i$. Lös ekvationen fullständigt.`,
    answer: r`$z = 2\pm i,\ -1\pm2i$`, checks: ["roots_ok('z**4 - 2*z**3 + 2*z**2 - 10*z + 25', ['2+I', '2-I', '-1+2*I', '-1-2*I'])"],
  },
  {
    id: '6.46', answerSource: 'bok', intro: r`Ange ett sjättegradspolynom med reella koefficienter som har enkelt nollställe i $z = 2-i$ och dubbelt nollställe i $z = i$.`,
    answer: r`$(z-2+i)(z-2-i)(z-i)^2(z+i)^2 = z^6 - 4z^5 + 7z^4 - 8z^3 + 11z^2 - 4z + 5$`,
    checks: ["eq('expand((z-2+I)*(z-2-I)*(z-I)**2*(z+I)**2)', 'z**6 - 4*z**5 + 7*z**4 - 8*z**3 + 11*z**2 - 4*z + 5')"],
  },
  {
    id: '6.47', answerSource: 'bok', intro: r`Bestäm rötterna samt deras summa och produkt till var och en av ekvationerna`,
    parts: {
      a: { text: r`$z^2 - 7z + 10 = 0$`, answer: r`$z_1 = 5,\ z_2 = 2,\ z_1+z_2 = 7,\ z_1z_2 = 10$`, checks: ["roots_ok('z**2 - 7*z + 10', ['5', '2'])"] },
      b: { text: r`$3z^2 - 21z + 30 = 0$`, answer: r`Samma som a)` },
      c: { text: r`$z^3 - 7z^2 + 10z = 0$`, answer: r`$z_1 = 5,\ z_2 = 2,\ z_3 = 0,\ z_1+z_2+z_3 = 7,\ z_1z_2z_3 = 0$`, checks: ["roots_ok('z**3 - 7*z**2 + 10*z', ['5', '2', '0'])"] },
    },
  },
  {
    id: '6.49', answerSource: 'bok', mark: 'L', intro: r`Ekvationen $z^4 - z^3 + 7z^2 - 9z - 18 = 0$ har en rent imaginär rot. Lös ekvationen.`,
    answer: r`$z = -1,\ 2,\ 3i,\ -3i$`, checks: ["roots_ok('z**4 - z**3 + 7*z**2 - 9*z - 18', ['-1', '2', '3*I', '-3*I'])"],
  },
  {
    id: '6.52', answerSource: 'bok', mark: 'TL', intro: r`Dela upp polynomet $p(x)$ i reella faktorer av så låg grad som möjligt, om $p(x)$ är lika med`,
    parts: {
      a: { text: r`$x^3 - x$`, answer: r`$x(x+1)(x-1)$` },
      b: { text: r`$x^3 + x$`, answer: r`$x(x^2+1)$` },
      c: { text: r`$x^4 - 1$`, answer: r`$(x+1)(x-1)(x^2+1)$` },
      d: { text: r`$x^4 + 1$`, answer: r`$(x^2 - \sqrt2x + 1)(x^2 + \sqrt2x + 1)$`, checks: ["eq('expand((x**2 - sqrt(2)*x + 1)*(x**2 + sqrt(2)*x + 1))', 'x**4 + 1')"] },
    },
    tip: r`Enligt teorin kan varje reellt polynom delas upp i faktorer av högst grad två, där eventuella andragradsfaktorer saknar reella nollställen. Deluppgift d) är den svåraste: lös först ekvationen $x^4 + 1 = 0$, och skriv upp den komplexa faktoruppdelningen. Para sedan ihop faktorerna två och två.`,
  },
  {
    id: '6.55', answerSource: 'bok', intro: r`Skriv $(1+i\sqrt3)^5$ på rektangulär form med hjälp av`,
    parts: { a: { text: r`binomialsatsen`, answer: r`$16 - 16\sqrt3 i$` }, b: { text: r`polär form.`, answer: r`$16 - 16\sqrt3 i$`, checks: ["eq('expand((1+I*sqrt(3))**5)', '16 - 16*sqrt(3)*I')"] } },
  },
  { id: '6.56', answerSource: 'bok', intro: r`Skriv $1 + e^{i\pi/2}$ på polär form.`, answer: r`$\sqrt2 e^{i\pi/4}$`, checks: ["eq('1 + exp(I*pi/2)', 'sqrt(2)*exp(I*pi/4)')"] },
  {
    id: '6.61', answerSource: 'bok', intro: r`Vektorn $(1,2)$ vrids i positiv led vinkeln … Var hamnar den?`,
    parts: {
      a: { text: r`$\pi/2$`, answer: r`$(-2,1)$` },
      b: { text: r`$\pi/4$`, answer: r`$\frac1{\sqrt2}(-1,3)$`, checks: ["eq('(1+2*I)*exp(I*pi/4)', '(-1+3*I)/sqrt(2)')"] },
      c: { text: r`$\pi$`, answer: r`$(-1,-2)$` },
      d: { text: r`$\theta$`, answer: r`$(\cos\theta - 2\sin\theta,\ 2\cos\theta + \sin\theta)$` },
    },
  },
  {
    id: '6.62', answerSource: 'bok', intro: r`Vektorn $(x,y)$ vrids i positiv led vinkeln … Var hamnar den?`,
    parts: {
      a: { text: r`$\pi/2$`, answer: r`$(-y,x)$` },
      b: { text: r`$\pi/4$`, answer: r`$\frac1{\sqrt2}(x-y,\ x+y)$` },
      c: { text: r`$\pi$`, answer: r`$(-x,-y)$` },
      d: { text: r`$\theta$`, answer: r`$(x\cos\theta - y\sin\theta,\ x\sin\theta + y\cos\theta)$` },
    },
  },
  {
    id: '6.68', answerSource: 'bok', intro: r`Sjättegradsekvationen $z^6 - 2z^5 + 3z^4 + 4z^2 - 8z + 12 = 0$ har roten $z = 1 + i\sqrt2$.`,
    parts: {
      a: { text: r`Ange ytterligare en rot till ekvationen.`, answer: r`Även $1 - i\sqrt2$ är en rot.` },
      b: { text: r`Ange ett andragradspolynom som delar sjättegradspolynomet.`, answer: r`$z^2 - 2z + 3$ är en faktor i $p(z)$.`, checks: ["eq('rem(z**6 - 2*z**5 + 3*z**4 + 4*z**2 - 8*z + 12, z**2 - 2*z + 3, z)', 0)"] },
      c: { text: r`Ange resterande rötter till ekvationen. Rötterna skall ges på formen $z = a+bi$.`, answer: r`$1+i,\ 1-i,\ -1+i,\ -1-i$`, checks: ["roots_ok('z**6 - 2*z**5 + 3*z**4 + 4*z**2 - 8*z + 12', ['1+I*sqrt(2)', '1-I*sqrt(2)', '1+I', '1-I', '-1+I', '-1-I'])"] },
    },
  },
]
