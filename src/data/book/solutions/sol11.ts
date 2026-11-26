const r = String.raw

const TAY = r`**Metod (kap 11): Taylorpolynom.** $p_n(x)=\sum_{k=0}^n\frac{f^{(k)}(a)}{k!}(x-a)^k$. Derivera $n$ gånger, sätt in $x=a$ i varje derivata och sätt ihop. **Lagranges restterm:** $R_{n+1}(x)=\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-a)^{n+1}$ för något $\xi$ mellan $a$ och $x$ – uppskatta $|f^{(n+1)}|$ uppåt på intervallet för att få en felgräns.`
const STD = r`**Metod (kap 11): standardutvecklingar (formelbladet).** Härled inte derivatorna – byt variabel i en känd utveckling ($e^t$, $\sin t$, $\cos t$, $\ln(1+t)$, $(1+t)^k$, $\arctan t$) och skriv resten som $x^nB(x)$ där $B$ är begränsad nära 0. Vid produkter och sammansättningar: ta med termer upp till rätt ordning och samla.`
const GV = r`**Metod (kap 11): gränsvärden med Maclaurinutveckling.** Utveckla täljare och nämnare tills första termen som inte tar ut sig dyker upp, bryt ut den lägsta potensen av $x$ och förkorta. Resttermerna $x^kB(x)\to0$.`
const SER = r`**Metod (kap 11): kända serier.** Känn igen summan som en standardutveckling (formelbladet) i en viss punkt och sätt in punkten.`

/** Lösningsförslag kapitel 11. */
export const SOL11: Record<string, string> = {
  '11.1a': r`${TAY}

$f=\ln(1+x)$: $f'=\frac{1}{1+x}$, $f''=-\frac{1}{(1+x)^2}$, $f'''=\frac{2}{(1+x)^3}$, $f^{(4)}=-\frac{6}{(1+x)^4}$. I $x=0$: $0,1,-1,2,-6$. $p_4(x)=x-\frac{x^2}{2!}+\frac{2x^3}{3!}-\frac{6x^4}{4!}=x-\frac12x^2+\frac13x^3-\frac14x^4$, och $p_1,p_2,p_3$ är början av detta.`,
  '11.1b': r`${TAY}

Sätt in $x=0{,}1$ i polynomen från a). Ju högre ordning, desto närmare $f(0{,}1)$ – felet krymper ungefär med en faktor 10 per ordning.`,
  '11.1c': r`${TAY}

Felet $f(x)-p_2(x)$ beter sig som $\frac{x^3}{3}$: när $x$ minskar 10 gånger blir felet ungefär 1000 gånger mindre.`,
  '11.2': r`${TAY}

$p_n(x)=\sum_{k=0}^n\frac{f^{(k)}(0)}{k!}x^k$. a) Alla derivator av $e^x$ är 1 i 0. b) $\sin$: derivatorna i 0 är $0,1,0,-1$. c) $f^{(4)}(0)=\sin0=0$, så $p_4=p_3$. d) $f'=\frac12(1+x)^{-1/2}$, $f''=-\frac14(1+x)^{-3/2}$: $f(0)=1$, $f'(0)=\frac12$, $f''(0)=-\frac14$ ger $1+\frac x2-\frac{x^2}{8}$.`,
  '11.3a': r`${TAY}

$f(0)=1$, $f'(0)=\frac12$, så $p_1(x)=1+\frac12x$ – precis högerledet.`,
  '11.3b': r`${TAY}

$y=p_1(x)$ är tangenten till $y=\sqrt{1+x}$ i $x=0$; nära 0 sammanfaller kurvorna nästan.`,
  '11.3c': r`${TAY}

Lagrange: $R_2(x)=\frac{f''(\theta x)}{2!}x^2$ med $f''(t)=-\frac14(1+t)^{-3/2}$, alltså $R_2(x)=-\frac{1}{8(1+\theta x)^{3/2}}x^2$, $0\le\theta\le1$.`,
  '11.3d': r`${TAY}

För $x\ge0$ är $1+\theta x\ge1$, så $(1+\theta x)^{3/2}\ge1$ och $|R_2(x)|\le\frac18x^2$.`,
  '11.3e': r`${TAY}

För $0\le x\le0{,}1$: $|R_2(x)|\le\frac18(0{,}1)^2=1{,}25\cdot10^{-3}\le5\cdot10^{-3}$.`,
  '11.3f': r`${TAY}

Kräv $\frac18a^2\le5\cdot10^{-4}\iff a^2\le4\cdot10^{-3}\iff a\le\sqrt{40}\cdot10^{-2}\approx0{,}063$.`,
  '11.3g': r`${TAY}

$f''(0)=-\frac14$, så $p_2(x)=1+\frac12x-\frac{1}{4\cdot2!}x^2=1+\frac12x-\frac18x^2$.`,
  '11.3h': r`${TAY}

Parabeln $p_2$ följer kurvan ännu bättre nära 0 än tangenten.`,
  '11.3i': r`${TAY}

$f'''(t)=\frac38(1+t)^{-5/2}$, så $R_3(x)=\frac{f'''(\theta x)}{3!}x^3=\frac{3/8}{6}(1+\theta x)^{-5/2}x^3=\frac{x^3}{16(1+\theta x)^{5/2}}$.`,
  '11.3j': r`${TAY}

Som i d): $(1+\theta x)^{5/2}\ge1$ för $x\ge0$, så $|R_3(x)|\le\frac{1}{16}x^3$.`,
  '11.3k': r`${TAY}

$|R_3(x)|\le\frac{1}{16}(0{,}1)^3=6{,}25\cdot10^{-5}$.`,
  '11.4a': r`${TAY}

$f(0)=0$, $f'(0)=\cos0=1$ ger $p_1(x)=x$. $f''(0)=-\sin0=0$, så även $p_2(x)=x$.`,
  '11.4b': r`${TAY}

Lagrange: $R_2(x)=\frac{f''(\theta x)}{2}x^2=-\frac12\sin(\theta x)\,x^2$ och $R_3(x)=\frac{f'''(\theta x)}{6}x^3=-\frac16\cos(\theta x)\,x^3$.`,
  '11.4c': r`${TAY}

$|\sin|\le1$ och $|\cos|\le1$ ger $|R_2|<\frac12(0{,}1)^2$ och $|R_3|<\frac16(0{,}1)^3$. Eftersom $p_1=p_2$ är båda uppskattningar av samma fel; den mindre ($R_3$) är bättre.`,
  '11.5a': r`${TAY}

Alla derivator av $e^x$ är 1 i $x=0$: $p_3(x)=1+x+\frac{x^2}{2}+\frac{x^3}{6}$.`,
  '11.5b': r`${TAY}

$R_4(x)=\frac{f^{(4)}(\theta x)}{4!}x^4=\frac{e^{\theta x}}{24}x^4$, $0\le\theta\le1$.`,
  '11.5c': r`${TAY}

För $|x|\le0{,}1$ är $e^{\theta x}\le e^{0{,}1}<3$, så $|R_4|\le\frac{3}{24}(0{,}1)^4=\frac18\cdot10^{-4}$.`,
  '11.5d': r`${TAY}

Samma uppskattning utan att sätta in $x$: $|R_4(x)|\le\frac{3}{24}x^4=\frac18x^4$.`,
  '11.6': r`${TAY}

Se svaret: vänsterledet är $|R_5(x)|$ för $e^x$, och Lagranges restterm uppskattas med $e^{\theta x}\le e<3$.`,
  '11.7': r`${TAY}

Se svaret: vänsterledet är Lagranges restterm $R_3$ för $\ln(1+x)$; uppskatta $f'''(t)=\frac{2}{(1+t)^3}$ med $1+t\ge\frac12$.`,
  '11.10': r`${TAY}

Se svaret: $e^x+e^{-x}=2+x^2+R_4(x)$ där $R_4=\frac{e^{t}+e^{-t}}{24}x^4$, och $e^t+e^{-t}<4$ för $|t|\le1$.`,
  '11.14a': r`${STD}

Sätt $t=2x$ i $e^t=1+t+\frac{t^2}{2}+\frac{t^3}{6}+t^4B(t)$: $1+2x+2x^2+\frac43x^3+x^4B(x)$.`,
  '11.14b': r`${STD}

Sätt $t=-x$ i $e^t$: $1-x+\frac{x^2}2-\frac{x^3}6+x^4B(x)$.`,
  '11.14c': r`${STD}

Sätt $t=\frac x2$ i $\cos t=1-\frac{t^2}{2}+t^4B(t)$: $1-\frac{x^2}{8}+x^4B(x)$.`,
  '11.14d': r`${STD}

$\ln(1+t)=t-\frac{t^2}{2}+t^3B(t)$ med $t=x^2$: $x^2-\frac{x^4}{2}+\dots=x^2+x^4B(x)$.`,
  '11.14e': r`${STD}

Som d) med $t=-x^2$: $-x^2+x^4B(x)$.`,
  '11.15': r`${STD}

Använd $(1+t)^k=1+kt+\frac{k(k-1)}{2}t^2+t^3B(t)$ från formelbladet.`,
  '11.15a': r`${STD}

$k=\frac12$, $t=x$: $1+\frac12x+\frac{\frac12\cdot(-\frac12)}{2}x^2=1+\frac12x-\frac18x^2$.`,
  '11.15b': r`${STD}

$k=-1$: $1-x+\frac{(-1)(-2)}{2}x^2=1-x+x^2$.`,
  '11.15c': r`${STD}

$k=\frac13$: $\frac{\frac13\cdot(-\frac23)}{2}=-\frac19$, så $1+\frac13x-\frac19x^2$.`,
  '11.15d': r`${STD}

$k=\frac12$, $t=-\frac x2$: $1-\frac x4-\frac18\cdot\frac{x^2}{4}=1-\frac14x-\frac1{32}x^2$.`,
  '11.15e': r`${STD}

$k=\frac13$, $t=x^2$: $1+\frac13x^2-\frac19x^4+\dots=1+\frac13x^2+x^4B(x)$.`,
  '11.16a': r`${STD}

$e^x=1+x+\frac{x^2}2+\frac{x^3}6+\frac{x^4}{24}+x^5B$. Multiplicera med $1-x^2$ och samla: $1+x+\left(\frac12-1\right)x^2+\left(\frac16-1\right)x^3+\left(\frac1{24}-\frac12\right)x^4=1+x-\frac12x^2-\frac56x^3-\frac{11}{24}x^4$.`,
  '11.16b': r`${STD}

$x\sin x=x\left(x-\frac{x^3}6+x^5B\right)=x^2-\frac16x^4+x^6B(x)$.`,
  '11.16c': r`${STD}

$\cos x-1=-\frac{x^2}2+x^4B$, så $x(\cos x-1)=-\frac12x^3+x^5B(x)$.`,
  '11.17a': r`${STD}

$e^{x^2}=1+x^2+\frac{x^4}2+x^6B$, $\cos x=1-\frac{x^2}2+\frac{x^4}{24}+x^6B$. Produkt: $1+\left(1-\frac12\right)x^2+\left(\frac12-\frac12+\frac1{24}\right)x^4=1+\frac12x^2+\frac1{24}x^4$.`,
  '11.17b': r`${STD}

$\sin x=x-\frac{x^3}6+x^5B$, $\arctan x=x-\frac{x^3}3+x^5B$. Produkt: $x^2-\left(\frac13+\frac16\right)x^4+x^6B=x^2-\frac12x^4+x^6B$.`,
  '11.17c': r`${STD}

$1+\cos x=2\left(1-\frac{x^2}4+\frac{x^4}{48}+x^6B\right)$, så $\ln(1+\cos x)=\ln2+\ln(1+t)$ med $t=-\frac{x^2}4+\frac{x^4}{48}$. $\ln(1+t)=t-\frac{t^2}2+\dots=-\frac{x^2}4+\frac{x^4}{48}-\frac{x^4}{32}=-\frac{x^2}4-\frac{x^4}{96}$.`,
  '11.18a': r`${STD}

$e^t=1+t+\frac{t^2}2+\frac{t^3}6+\frac{t^4}{24}$ med $t=\sin x=x-\frac{x^3}6+\dots$: $t^2=x^2-\frac{x^4}3$, $t^3=x^3$, $t^4=x^4$ (upp till $x^4$). Summan: $1+x+\frac{x^2}2+\left(-\frac16+\frac16\right)x^3+\left(-\frac16+\frac1{24}\right)x^4=1+x+\frac12x^2-\frac18x^4$.`,
  '11.18b': r`${STD}

$e^{\cos x}=e\cdot e^{u}$ med $u=\cos x-1=-\frac{x^2}2+\frac{x^4}{24}$. $e^u=1+u+\frac{u^2}2=1-\frac{x^2}2+\frac{x^4}{24}+\frac{x^4}8=1-\frac{x^2}2+\frac{x^4}6$. Multiplicera med $e$.`,
  '11.19': r`${TAY}

Ett polynom av grad 3 är sitt eget Maclaurinpolynom av ordning 3: derivatorna i 0 återskapar exakt koefficienterna.`,
  '11.20': r`${GV}

$1-\cos x=\frac{x^2}{2}+x^4B(x)$ och $\ln(1+x)-x=-\frac{x^2}2+x^3B(x)$. Dela med $x^2$: $\frac{\frac12+x^2B}{-\frac12+xB}\to-1$.`,
  '11.21a': r`${GV}

$e^x-1-x=\frac{x^2}2+x^3B(x)$, så kvoten är $\frac12+xB(x)\to\frac12$.`,
  '11.21b': r`${GV}

$\sin2x=2x-\frac{(2x)^3}{6}+x^5B=2x-\frac43x^3+x^5B$. Nämnaren $=-\frac43x^3+x^5B$, så kvoten $\to\frac{1}{-4/3}=-\frac34$.`,
  '11.22a': r`${GV}

$\cos x-e^{x^2}=\left(1-\frac{x^2}2\right)-(1+x^2)+x^4B=-\frac32x^2+x^4B$, $x\sin x=x^2+x^4B$. Gränsvärdet $-\frac32$.`,
  '11.22b': r`${GV}

$x+\ln(1-x)=x-x-\frac{x^2}2+x^3B=-\frac{x^2}2+x^3B$; $1-\sqrt{1-x^2}=\frac{x^2}2+x^4B$. Kvoten $\to-1$.`,
  '11.22c': r`${GV}

$\sin x-\arctan x=\left(x-\frac{x^3}6\right)-\left(x-\frac{x^3}3\right)+x^5B=\frac{x^3}6+x^5B$; $x(\cos2x-1)=x(-2x^2+x^4B)=-2x^3+x^5B$. Kvoten $\to\frac{1/6}{-2}=-\frac1{12}$.`,
  '11.30': r`${SER}

$e^x=\sum_{k=0}^\infty\frac{x^k}{k!}$ för alla $x$. Med $x=1$ blir summan $e$.`,
  '11.31a': r`${SER}

$e^x$-serien med $x=2$: $e^2$.`,
  '11.31b': r`${SER}

$\arctan x=\sum_{k=1}^\infty(-1)^{k-1}\frac{x^{2k-1}}{2k-1}$; med $x=1$: $\arctan1=\frac\pi4$.`,
  '11.31c': r`${SER}

$\cos x=\sum(-1)^k\frac{x^{2k}}{(2k)!}$; med $x=\pi$: $\cos\pi=-1$.`,
  '11.31d': r`${SER}

$\sin x=\sum(-1)^k\frac{x^{2k+1}}{(2k+1)!}$; med $x=\frac\pi6$: $\sin\frac\pi6=\frac12$.`,
  '11.31e': r`${SER}

$\ln(1+x)=\sum(-1)^{k-1}\frac{x^k}k$; med $x=1$: $\ln2$.`,
  '11.33a': r`${TAY}

$f=\sqrt{1+x^2}$, $f'=\frac{x}{\sqrt{1+x^2}}$, $f''=(1+x^2)^{-3/2}$. I $x=1$: $\sqrt2$, $\frac1{\sqrt2}$, $\frac1{2\sqrt2}$. $p_2=\sqrt2+\frac{1}{\sqrt2}(x-1)+\frac{1}{2\sqrt2\cdot2}(x-1)^2$.`,
  '11.33b': r`${TAY}

Alla derivator av $e^x$ är $e$ i $x=1$: $p_3=e+e(x-1)+\frac e2(x-1)^2+\frac e6(x-1)^3$.`,
  '11.33c': r`${TAY}

$f'=\frac{1}{2\sqrt x}$, $f''=-\frac14x^{-3/2}$. I $x=2$: $\sqrt2$, $\frac{1}{2\sqrt2}=\frac{\sqrt2}4$, $-\frac{1}{8\sqrt2}$. $p_2=\sqrt2+\frac{\sqrt2}4(x-2)-\frac{1}{16\sqrt2}(x-2)^2$ och $\frac{1}{16\sqrt2}=\frac{\sqrt2}{32}$.`,
  '11.33d': r`${TAY}

$\tan0=0$, $(\tan)'=1+\tan^2\to1$, $(\tan)''=2\tan x(1+\tan^2x)\to0$. $p_2(x)=x$.`,
  '11.33e': r`${TAY}

$f(-1)=-\frac\pi4$, $f'=\frac1{1+x^2}\to\frac12$, $f''=\frac{-2x}{(1+x^2)^2}\to\frac12$, $f'''=\frac{6x^2-2}{(1+x^2)^3}\to\frac12$. $p_3=-\frac\pi4+\frac12(x+1)+\frac{1/2}{2}(x+1)^2+\frac{1/2}{6}(x+1)^3$.`,
  '11.43': r`${STD}

Koefficienten framför $x^k$ är $\frac{f^{(k)}(0)}{k!}$ (entydighet). $x$-termen saknas, så $f'(0)=0$. $\frac{f^{(5)}(0)}{5!}=-\frac1{12}\Rightarrow f^{(5)}(0)=-\frac{120}{12}=-10$.`,
}
