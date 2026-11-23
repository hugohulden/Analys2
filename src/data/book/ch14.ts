import type { BookTask } from './types'

const r = String.raw
const D = (f: string, a: string | number, b: string | number, ans: string) => `defint('${f}', '${a}', '${b}', '${ans}')`

/** Kapitel 14 – Användning av integraler (uppgifter i kursplanen). */
export const CH14: BookTask[] = [
  { id: '14.1', answerSource: 'bok', mark: 'L', intro: r`Beräkna arean av det begränsade område som innesluts av kurvorna $y=x^3$ och $y=x^4$.`, answer: r`$\frac{1}{20}$`, checks: [D('x**3-x**4', 0, 1, '1/20')] },
  {
    id: '14.2', answerSource: 'bok', intro: r`Beräkna arean av den skuggade ytan (figurer i boken):`,
    parts: {
      a: { text: r`Området mellan $y=\frac{2}{1+x^2}$ (övre) och $y=\frac{1}{\sqrt{1+x^2}}$ (undre), från $x=0$ till skärningspunkten.`, answer: r`$\frac{2\pi}{3}-\ln(2+\sqrt3)$`, checks: [D('2/(1+x**2)-1/sqrt(1+x**2)', 0, 'sqrt(3)', '2*pi/3-log(2+sqrt(3))')] },
      b: { text: r`Området mellan $y=\sin x$ (övre) och $y=1-\cos^2x$ (undre), $0\le x\le\frac\pi2$.`, answer: r`$1-\frac\pi4$`, checks: [D('sin(x)-(1-cos(x)**2)', 0, 'pi/2', '1-pi/4')] },
    },
  },
  {
    id: '14.3', answerSource: 'bok', mark: 'T', intro: r`Ett tält har höjden 2 m och kvadratisk golvyta med sidan 2 m. Varje horisontellt plan på höjden $x$ m ($0\le x\le2$) skär ut en kvadrat med sidan $\sqrt{4-x^2}$ m. a) Beräkna tältets volym. b) Beräkna luftens volym i den delen av tältet som är högst 1 m över marken.`,
    answer: r`a) $16/3$ m³ b) $11/3$ m³`, tip: r`Lägg in en $x$-axel längs tältets höjd och använd skivformeln.`,
    checks: [D('4-x**2', 0, 2, '16/3'), D('4-x**2', 0, 1, '11/3')],
  },
  { id: '14.4', answerSource: 'bok', mark: 'L', intro: r`En kil har elliptisk bottenyta med halvaxlarna $a$ respektive $b$. Eggen är parallell med den axel vars halva längd är $a$. Plana snitt vinkelräta mot eggen ger likbenta trianglar av höjden $h$. Bestäm kilens volym.`, answer: r`$\frac12\pi abh$` },
  { id: '14.5', answerSource: 'bok', mark: 'L', intro: r`Ytan mellan $x$-axeln och kurvan $y=xe^x$, $0\le x\le1$, roterar ett varv kring $x$-axeln. Beräkna volymen av den så uppkomna rotationskroppen.`, answer: r`$\frac14\pi(e^2-1)$`, checks: [D('pi*x**2*exp(2*x)', 0, 1, 'pi*(E**2-1)/4')] },
  { id: '14.6', answerSource: 'bok', intro: r`Om man låter området $0\le y\le x^3$, $0\le x\le1$, rotera ett varv kring $x$-axeln, så bildas en "strut" med höjd 1. Beräkna volymen av struten.`, answer: r`$\pi/7$`, checks: [D('pi*x**6', 0, 1, 'pi/7')] },
  {
    id: '14.7', answerSource: 'bok', mark: 'T', intro: r`Ett klot med radien $R$ delas i två delar av ett plan med avståndet $a$ från medelpunkten. Beräkna de bägge delarnas volymer.`,
    answer: r`$\frac\pi3(2R^3-3aR^2+a^3)$ respektive $\frac\pi3(2R^3+3aR^2-a^3)$`,
    tip: r`Om klotets medelpunkt ligger i origo, så kan man tänka sig att det uppstått genom rotation av kurvan $y=\sqrt{R^2-x^2}$ kring $x$-axeln.`,
    checks: ["eq('integrate(pi*(3**2-x**2),(x,1,3))', 'pi/3*(2*27-3*1*9+1)')"],
  },
  { id: '14.8', answerSource: 'bok', intro: r`Ytan mellan kurvstycket $y=\sin x+2\cos x$, $0\le x\le\pi/2$, och $x$-axeln roterar kring $x$-axeln. Beräkna rotationskroppens volym.`, answer: r`$\frac{\pi(5\pi+8)}{4}$ v.e.`, checks: [D('pi*(sin(x)+2*cos(x))**2', 0, 'pi/2', 'pi*(5*pi+8)/4')] },
  { id: '14.9', answerSource: 'bok', intro: r`Bestäm volymen av den rotationskropp som uppkommer då ytan mellan kurvan $y=\dfrac{1}{\sqrt{x(1+x^2)}}$, $x\ge1$, och $x$-axeln roterar runt $x$-axeln.`, answer: r`$\frac\pi2\ln2$`, checks: [D('pi/(x*(1+x**2))', 1, 'oo', 'pi*log(2)/2')] },
  { id: '14.10', answerSource: 'bok', mark: 'L', intro: r`Beräkna volymen av den kropp som uppkommer då ytan mellan $x$-axeln och kurvan $y=e^{-x^2}$, $0\le x<\infty$, roterar kring $y$-axeln.`, answer: r`$\pi$`, checks: [D('2*pi*x*exp(-x**2)', 0, 'oo', 'pi')] },
  { id: '14.11', answerSource: 'bok', intro: r`Beräkna volymen av den ringformade kropp (torus) som uppkommer då cirkelområdet $(x-4)^2+y^2\le4$ roterar runt $y$-axeln.`, answer: r`$32\pi^2$`, checks: [D('2*pi*x*2*sqrt(4-(x-4)**2)', 2, 6, '32*pi**2')] },
  {
    id: '14.12', answerSource: 'bok', mark: 'T', intro: r`En tråd är spänd mellan positionerna 1 (m) och 2 (m) på $x$-axeln. Densiteten ges av $\rho(x)=x^2$ kg/m. Bestäm trådens totala massa.`,
    answer: r`Trådens massa är $7/3$ kg $\approx2{,}3$ kg.`, checks: [D('x**2', 1, 2, '7/3')],
    tip: r`Om en tråd är spänd längs $x$-axeln från $a$ till $b$, och i punkten $x$ har densiteten $\rho(x)$, så bestäms trådens totala massa $m$ av $m=\int_a^b\rho(x)\,dx$. Detta följer av att densiteten kan antas konstant i varje litet delintervall $[x,x+dx]$. Massan $dm$ av tråden i ett sådant delintervall blir då ungefär $\rho(x)dx$. Efter indelning av hela intervallet $[a,b]$ i små delintervall, och summering av massbidragen $dm$, får vi formeln genom gränsövergång då delintervallens längd går mot 0.`,
  },
  { id: '14.13', answerSource: 'bok', intro: r`En 2,0 m lång tråd har densiteten $\ln(1+x)$ kg/m i den punkt som har avståndet $x$ m till ena ändpunkten. Beräkna trådens massa.`, answer: r`Trådens massa är $(3\ln3-2)$ kg $\approx1{,}3$ kg.`, checks: [D('log(1+x)', 0, 2, '3*log(3)-2')] },
  { id: '14.14', answerSource: 'bok', intro: r`En rak cirkulär kon med höjden 2 m och radien 1 m har spetsen nedåt och är fylld med en vätska. I ett plant snitt parallellt med konens bottenyta och på avståndet $x$ m från konens spets är vätskans densitet $(10-x^2)$ kg/m³. Bestäm vätskans totala massa.`, answer: r`Massan är $\frac{76}{15}\pi$ kg $\approx15{,}9$ kg.`, checks: [D('(10-x**2)*pi*(x/2)**2', 0, 2, '76*pi/15')] },
  { id: '14.15', answerSource: 'bok', intro: r`Densiteten för en tråd med längden $L$ är proportionell mot produkten av avstånden till trådens ändpunkter med proportionalitetskonstanten $k$. Beräkna trådens massa.`, answer: r`Trådens massa är $\frac{kL^3}{6}$.` },
  { id: '14.16', answerSource: 'bok', intro: r`Vid lastning av en 20 m hög cylindrisk silo med radien 4 m räknar man med att materialet packas i silon på följande sätt: Om silon är fylld till höjden $H$ m, så ges densiteten på höjden $h$ m över botten av $\ln(5+H-h)$ kg/m³, $0\le h\le H$. Beräkna massan i en full silo.`, answer: r`$16\pi(25\ln25-5\ln5-20)$ kg $=16\pi(45\ln5-20)$ kg`, checks: [D('16*pi*log(25-x)', 0, 20, '16*pi*(45*log(5)-20)')] },
  { id: '14.17', answerSource: 'bok', mark: 'L', intro: r`Bestäm tyngdpunkten för den homogena yta som begränsas av kurvan $y=\sin x$, $0\le x\le\pi/2$, och linjerna $x=\pi/2$ och $y=0$.`, answer: r`Tyngdpunktens koordinater är $(1,\pi/8)$.`, checks: ["eq('integrate(x*sin(x),(x,0,pi/2))/integrate(sin(x),(x,0,pi/2))', 1)", "eq('integrate(sin(x)**2/2,(x,0,pi/2))/integrate(sin(x),(x,0,pi/2))', 'pi/8')"] },
  {
    id: '14.18', answerSource: 'bok', mark: 'T', intro: r`En tråd är spänd mellan 1 (m) och 2 (m) på $x$-axeln. Densiteten ges av $\rho(x)=x^2$ kg/m. Bestäm trådens masscentrum $x_{mc}$. Du får använda att $x_{mc}=\frac1M\int x\,dm$, där $M=\int dm$.`,
    answer: r`Trådens masscentrum är $x_{mc}=\frac{45}{28}\approx1{,}6$ (m).`, tip: r`I intervallet $[x,x+dx]$ är massan ungefär lika med $\rho(x)dx$, vilket duger som masselement $dm$.`,
    checks: ["eq('integrate(x**3,(x,1,2))/integrate(x**2,(x,1,2))', '45/28')"],
  },
  {
    id: '14.19', answerSource: 'bok', mark: 'T', intro: r`En rak cirkulär kon med höjden 2 m och radien 1 m har spetsen nedåt och är fylld med en vätska. I ett plant snitt parallellt med konens bottenyta och på avståndet $x$ m från konens spets är vätskans densitet $(10-x^2)$ kg/m³. Bestäm vätskans masscentrum.`,
    answer: r`Vätskans masscentrum är beläget $\frac{55}{38}$ l.e. $\approx1{,}45$ l.e. från konens spets och på konens symmetriaxel.`,
    tip: r`Ta som litet masselement $dm$ en tunn skiva med radien $y$. Då är approximativt $dm=\rho\pi y^2dx$.`,
    checks: ["eq('integrate(x*(10-x**2)*x**2,(x,0,2))/integrate((10-x**2)*x**2,(x,0,2))', '55/38')"],
  },
  { id: '14.20', answerSource: 'bok', intro: r`Kurvan $y=e^x$, $0\le x\le1/2$, roteras runt $x$-axeln. Den kropp som då uppkommer antas vara homogen. Bestäm $x$-koordinaten för kroppens masscentrum, $x_{mc}=\frac1m\int x\,dm$.`, answer: r`$x_{mc}=\frac{1}{2(e-1)}$`, checks: ["eq('integrate(x*exp(2*x),(x,0,Rational(1,2)))/integrate(exp(2*x),(x,0,Rational(1,2)))', '1/(2*(E-1))')"] },
  { id: '14.39', answerSource: 'bok', mark: 'T', intro: r`En bil har hastigheten $1600(t-4t^2)$ km/h vid tiden $t$ h. Beräkna bilens förflyttning under den första kvarten.`, answer: r`Förflyttningen är $50/3$ km $\approx17$ km.`, tip: r`Om hastigheten $v$ är konstant och tiden är $\Delta t$, så är förflyttningen, dvs. lägesändringen, $\Delta s=v\cdot\Delta t$.`, checks: [D('1600*(x-4*x**2)', 0, 'Rational(1,4)', '50/3')] },
  { id: '14.40', answerSource: 'bok', mark: 'T', intro: r`En partikel startar i vila och har accelerationen $100\cos t$ m/s² vid tiden $t$ sekunder. Vilken är partikelns hastighet vid tiden 3,0 s?`, answer: r`Partikelns hastighet är $100\sin3{,}0$ m/s $\approx14$ m/s.`, tip: r`Om accelerationen $a$ är konstant, så är under tiden $\Delta t$ hastighetsändringen $\Delta v=a\cdot\Delta t$. Tänk sedan som i föregående problem.`, checks: [D('100*cos(x)', 0, 3, '100*sin(3)')] },
  {
    id: '14.41', answerSource: 'bok', mark: 'T', intro: r`En viss verksamhets eleffektanvändning vid tiden $t$ h är $\left(1+\pi\left|\sin\frac{\pi t}{12}\right|\right)$ kW. Beräkna verksamhetens elenergianvändning under ett dygn.`,
    answer: r`Verksamhetens elanvändning under ett dygn är 72 kWh.`,
    tip: r`Om effekten $P$ är konstant, så är under tiden $\Delta t$ energin $\Delta W=P\cdot\Delta t$. Tänk sedan som i föregående problem. Tips för beräkning av integralen: Rita först kurvan $y=\sin\frac{\pi}{12}t$ i intervallet $0\le t\le24$. Tänk sedan efter vad absolutbeloppet har för inverkan på kurvans utseende.`,
    checks: ["num('Integral(1+pi*Abs(sin(pi*x/12)),(x,0,24)).evalf()', 72, 1e-6)"],
  },
]
