#!/usr/bin/env python3
"""
Verifierar alla svar i uppgiftsbanken med sympy.

Kör:  npm run verify
(eller: npx tsx scripts/dump-checks.ts > /tmp/checks.json && python3 scripts/verify.py /tmp/checks.json)

Varje uppgift i src/data/problems/*.ts har en lista `checks` med Python-anrop till
hjälpfunktionerna nedan. Alla måste returnera True. Skriptet avslutas med felkod om
något anrop misslyckas eller om en uppgift saknar kontroller.
"""
import json
import random
import sys

from sympy import *  # noqa: F401,F403

x, t, z, k, a, R = symbols('x t z k a R')
C1, C2 = symbols('C1 C2')
y, N, T, h = symbols('y N T h', cls=Function)

NS = {name: obj for name, obj in globals().items() if not name.startswith('_')}


def S(expr):
    """Tolka en sträng (eller tal) som sympy-uttryck i namnrymden ovan."""
    if isinstance(expr, str):
        return sympify(eval(expr, NS))  # eval så att t.ex. Rational(1,3) och Function fungerar
    return sympify(expr)


def _zero(expr, var=x, samples=6, lo=0.3, hi=2.7):
    """Sant om uttrycket är identiskt noll (symboliskt, annars numeriskt i flera punkter)."""
    expr = S(expr)
    try:
        if simplify(expr) == 0:
            return True
    except Exception:
        pass
    free = sorted(expr.free_symbols, key=str)
    rnd = random.Random(1)
    for _ in range(samples):
        subs = {s: rnd.uniform(lo, hi) for s in free}
        val = complex(N_(expr.subs(subs)))
        if abs(val) > 1e-8:
            return False
    return True


def N_(e):
    return e.evalf(30)


def eq(expr, ans):
    """expr == ans (symboliskt eller numeriskt)."""
    e, a_ = S(expr), S(ans)
    if e == a_:
        return True
    diff_ = e - a_
    if diff_.free_symbols:
        return _zero(diff_)
    return abs(complex(N_(diff_))) < 1e-10


def num(expr, approx, tol):
    return abs(float(N_(S(expr))) - approx) <= tol


def defint(f, lo, hi, ans):
    val = integrate(S(f), (x, S(lo), S(hi)))
    if eq(val, ans):
        return True
    # numerisk kontroll som reserv
    numeric = Integral(S(f), (x, S(lo), S(hi))).evalf(30)
    return abs(complex(numeric - N_(S(ans)))) < 1e-10


def antider(F, f):
    """F' == f (primitiv funktion). ln|x| skrivs som log(x); kontrollen sker där uttrycken är reella."""
    return _zero(diff(S(F), x) - S(f), lo=2.1, hi=3.9) and _zero(diff(S(F), x) - S(f), lo=0.2, hi=0.9)


def roots_ok(poly, roots):
    """Varje rot löser ekvationen poly(z) = 0 och antalet olika rötter = gradtalet."""
    p = S(poly)
    rs = [S(r_) for r_ in roots]
    if any(abs(complex(N_(p.subs(z, r_)))) > 1e-10 for r_ in rs):
        return False
    distinct = len({(round(complex(N_(r_)).real, 9), round(complex(N_(r_)).imag, 9)) for r_ in rs})
    return distinct == degree(expand(p), z)


def ode_ok(lhs, sol, func='y', var='x', domain=None):
    """Sätter in lösningen i lhs (= 0 ska gälla). func/var anger funktion och variabel."""
    F = {'y': y, 'N': N, 'T': T, 'h': h}[func]
    v = {'x': x, 't': t}[var]
    expr = S(lhs).subs(F(v), S(sol)).doit()
    if domain:
        rnd = random.Random(2)
        for _ in range(6):
            pt = rnd.uniform(domain[0] + 0.01, domain[1] - 0.01)
            if abs(complex(N_(expr.subs(v, pt)))) > 1e-9:
                return False
        return True
    return _zero(expr)


def lim_ok(expr, point, ans):
    return eq(limit(S(expr), x, S(point)), ans)


def series_ok(f, n, poly):
    """Maclaurinpolynomet av ordning n av f är poly."""
    s = series(S(f), x, 0, n + 1).removeO()
    return expand(s - S(poly)) == 0


def taylor_ok(f, at, n, poly):
    p = S(at)
    s = series(S(f), x, p, n + 1).removeO()
    return simplify(expand(s - S(poly))) == 0


def is_true(expr):
    return bool(eval(expr, NS))


# Styckvis linjär f från omtentans figur 1 (avläst ur figuren, 2 rutor per enhet).
def f_omtenta(tt):
    return Piecewise(
        (-1, tt <= 1),
        (-1 + 2 * (tt - 1), tt <= 2),
        (1 + (tt - 2), tt <= 3),
        (2 - (tt - 3), tt <= 4),
        (1, True),
    )


NS.update({k_: v_ for k_, v_ in globals().items() if callable(v_) and not k_.startswith('_')})
NS.update({'x': x, 't': t, 'z': z, 'k': k, 'a': a, 'R': R, 'y': y, 'N': N, 'T': T, 'h': h, 'C1': C1, 'C2': C2})


def main():
    path = sys.argv[1] if len(sys.argv) > 1 else None
    data = json.load(open(path) if path else sys.stdin)
    failures, total = [], 0
    for item in data:
        if not item['checks']:
            failures.append((item['id'], '(inga kontroller)', 'saknas'))
            continue
        for chk in item['checks']:
            total += 1
            try:
                ok = eval(chk, NS)
            except Exception as e:  # noqa: BLE001
                ok = f'FEL: {type(e).__name__}: {e}'
            if ok is not True:
                failures.append((item['id'], chk, ok))
    print(f'{len(data)} uppgifter, {total} kontroller.')
    if failures:
        print(f'\n{len(failures)} MISSLYCKADE:')
        for pid, chk, res in failures:
            print(f'  ✗ {pid}: {chk}\n      → {res}')
        sys.exit(1)
    print('Alla svar verifierade ✓')


if __name__ == '__main__':
    main()
