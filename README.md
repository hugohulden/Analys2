# Analys 2 – studiecoach (PWA)

En personlig studiecoach för **Matematisk analys 2 (A242TG, Högskolan i Borås, HT2026)**. Appen säger vad du ska göra *idag* fram till tentan, håller koll på övningarna, låter dig träna på alla gamla tenta- och duggauppgifter med lösningar och styr repetitionen mot det som ger flest tentapoäng.

Allt är på svenska och fungerar helt offline efter första besöket. Det finns ingen inloggning och ingen server, och progress sparas lokalt i webbläsaren (IndexedDB).

## Funktioner

| Vy | Innehåll |
|---|---|
| **Idag** | Nedräkning och dagens pass. Varje pass **börjar med föreläsningen**: gå igenom appens sammanfattning av föreläsningen (anteckningar, lärarens exempel, kontrollfrågor) och bocka av. Missade föreläsningar kommer först (en per föreläsningsdag, upp till tre på dagar utan ny föreläsning). Sedan ikapp, dagens G-övningar, tentauppgift och repetition. "Mindre tid" ger en kortversion. |
| **Kursplan** | Hela schemat vecka för vecka. Varje övning (även uppdelade intervall och deluppgifter) har ✅/🟡/❌. 🟡 och ❌ hamnar i repetitionen och listas under "Fråga på Ö-passet". Progress visas per vecka och per område. |
| **Tentor** | 104 uppgifter: 3 tentor, 5 duggor och 36 egna varianter. Uppgifterna avslöjas stegvis (ledtråd → metod → lösning → svar), och du rättar dig själv efter varje försök. Det går att filtrera på område, källa, poäng och status. |
| **Simulering** | Riktig tenta (4 h med timer), mixtenta (en uppgift per tentaplats), mini-dugga (3 × 2 p, 1 h), självrättning, betyg och historik med trend. |
| **Kort** | Leitner-repetition, "Måste kunna utantill", ja/nej-fällor, metodkort, formelbladet och metodväljaren "Vad gör jag nu?". |
| **Mer** | Statistik (behärskning, förväntade tentapoäng, vad som ger flest poäng per timme, duggabonus), strategi, teori per område och inställningar (målbetyg, datum, lediga dagar, studietid, export/import). |

## Kör lokalt

Kräver Node 22+.

```bash
npm install
npm run dev        # utvecklingsserver på http://localhost:5173
npm test           # tester för schemaläggning, Leitner och parser
npm run build      # produktionsbygge i dist/
npm run preview    # testa bygget (inkl. service worker/offline) på http://localhost:4173
```

Vill du testa hur passet ser ut en annan dag lägger du till `?datum=2026-12-18` i adressen, eller bläddrar med pilarna på startsidan.

### Verifiera alla svar

Varje uppgift har en lista `checks` med anrop som kontrollerar svaret med **sympy**: primitiver deriveras tillbaka, integraler räknas ut, rötter och DE-lösningar sätts in, och gränsvärden och serier beräknas.

```bash
pip install sympy
npm run verify     # 500 uppgifter/deluppgifter, 570 kontroller
```

## Deploya till GitHub Pages

1. Skapa ett repo på GitHub och pusha koden till grenen `main`.
2. Gå till **Settings → Pages → Build and deployment → Source** i repot och välj **GitHub Actions**.
3. Workflowen `.github/workflows/deploy.yml` kör testerna, bygger med rätt `base` (`/<reponamn>/`) och publicerar. Appen hamnar på `https://<användarnamn>.github.io/<reponamn>/`.

Om du bygger manuellt för en annan sökväg: `VITE_BASE=/reponamn/ npm run build`.

> Obs: Ett publikt repo gör även tentorna i `material/` och de utklippta figurerna i `public/figurer/` publika. Gör repot privat om det är ett problem. GitHub Pages för privata repon kräver ett betalkonto.

## Installera på mobilen

- **Android (Chrome):** öppna sidan, välj ⋮ och sedan **Installera app** / **Lägg till på startskärmen**.
- **iPhone (Safari):** öppna sidan, välj Dela och sedan **Lägg till på hemskärmen**.

Öppna appen en gång med nät. Därefter fungerar den i flygplansläge.

## Flytta progress mellan mobil och dator

Gå till **Mer → Inställningar → Exportera till JSON-fil** och skicka filen till den andra enheten. Där väljer du **Importera från JSON-fil**. Importen ersätter progressen på den enheten.

## Struktur

```
material/            Originalen (tentor, dugga 1B, lösningsförslag dugga 1)
public/figurer/      Figurer utklippta ur PDF:erna (200 dpi) + egna lösningsfigurer (SVG)
scripts/verify.py    sympy-verifiering av alla svar
scripts/make-figures.mjs  genererar lösningsfigurer och appikoner
src/data/            Kursdata: schema, studieplan, områden, uppgifter + lösningar, kort, formelblad, teori, metodträd
src/logic/           Planerare (dagens pass), Leitner, behärskning, simuleringar, notationsparser (+ tester)
src/views/           Vyerna
```

### Anpassningar

- **Studieplanen** finns i `src/data/studyplan.ts`. Datum för Dugga 2 och tentan styrs från inställningarna.
- **Tidsuppskattningar**: `MIN` och `problemMinutes` i `src/logic/planner.ts` (G-övning 6 min, högre nivå 12 min, demo 5 min, tentauppgift 2 + 3,5 min/p).
- **Övningar** skrivs i kompakt notation, till exempel `'12.1a-f'`, `'12.2-12.6'`, `'12.17a,b,c'` och `'integrering:3-5'`. Se `src/logic/parse.ts`.

## Antaganden

- Dugga 2 antas vara **tis 8/12** och tentan **tis 12/1 2027**. Appen visar en varning tills du har bekräftat datumen i Inställningar.
- Dugga 2:s innehåll är okänt. Förvalt är F10–F15 (DE ordning 1 och komplexa tal), och det går att ändra i Inställningar.
- Bonus: minst 4 av 6 p på en dugga ger 1 bonuspoäng. Det står på Dugga 1B.
- Varje bokuppgift kopplas till ett område utifrån kapitel och uppgiftsnummer. Det är en uppskattning, eftersom boken inte finns i repot (se `exerciseArea` i `src/data/exercises.ts`).
- Under v. 46–51 innehåller passen bara G-nivå. Högre nivå tas med från 21/12 (ändras i Inställningar), och bara med målbetyg 4/5.
- F1–F7 räknas som redan gjorda. Bara övningar från och med 18/11 (F8) räknas som "ikapp". Det går att ändra.
