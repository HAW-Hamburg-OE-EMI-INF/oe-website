# Inhalte der OE-Websites bearbeiten (`shared/src/data/`)

In diesem Ordner liegen **alle Inhalte der OE-Websites für EMI und INF**, die von Semester zu Semester oder bei Bedarf angepasst werden (Termine, Wochenpläne, Tutor\*innen-Namen, Links, FAQs usw.).

Für normale inhaltliche Updates musst du keine anderen Ordner oder Dateien im Projekt anfassen. Änderungen hier wirken sich direkt auf die jeweiligen Websites (`emi` und `inf`) aus.

---

## Wichtig vorab: Die `EDIT AREA`

Jede Datei in diesem Ordner enthält Markierungen für die **EDIT AREA**:

- In `.ts`-Dateien: `// EDIT AREA START` bis `// EDIT AREA END`
- In `faq-content.astro`: `<!-- // EDIT AREA START // -->` bis `<!-- EDIT AREA END -->`.

**Bitte bearbeite ausschließlich Inhalte innerhalb dieser `EDIT AREA`.**
Alles außerhalb davon sind technische Verknüpfungen für die Website und sollte unverändert bleiben (nur wenn es zwingend nötig ist, z. B. bei komplett neuen Studiengängen, muss dort etwas angepasst werden).

---

## Typischer Ablauf für Änderungen

1. **Einmalig im Hauptverzeichnis** alle Abhängigkeiten installieren:
   ```bash
   npm install
   ```
2. Die gewünschte Datei in `shared/src/data/` öffnen und die Inhalte innerhalb der `EDIT AREA` anpassen.
3. Den lokalen Entwicklungsserver im Hauptverzeichnis starten, um die Änderungen direkt im Browser zu prüfen:
   ```bash
   npm run dev:emi   # für die EMI-Website
   npm run dev:inf   # für die INF-Website
   ```
4. Vor dem Commit die automatische Formatierung laufen lassen und prüfen, ob alles fehlerfrei baut:
   ```bash
   npm run fmt
   npm run check
   ```

---

## Schnellübersicht: Welche Datei brauche ich wofür?

### Jedes Semester anpassen

| Datei             | Was dort geändert wird                                                                      |
| :---------------- | :------------------------------------------------------------------------------------------ |
| `general-info.ts` | Zeitraum der OE-Woche, Daten zur Startveranstaltung (Datum, Uhrzeit, Gebäude, Raum, Link).  |
| `roadmap.ts`      | Kompletter OE-Wochenplan: Semester, Wochentage, Daten, Abendprogramm, Tagespläne und Räume. |
| `tutor-names.ts`  | Vornamen der OE-Tutor\*innen je Studiengangsseite.                                          |

### Bei Bedarf anpassen

| Datei               | Was dort geändert wird                                                                        |
| :------------------ | :-------------------------------------------------------------------------------------------- |
| `links.ts`          | Linksammlungen auf den Studiengangsseiten (myHAW, HVV-Ticket, Teams-Code, Klausurensammlung). |
| `faq-content.astro` | Fragen, Antworten und Kategorien auf der FAQ-Seite.                                           |

### Nur selten ändern (Stammdaten)

| Datei              | Was dort geändert wird                                                                |
| :----------------- | :------------------------------------------------------------------------------------ |
| `studiengaenge.ts` | Namen, Kürzel, Abschlüsse und Zuordnung der Studiengänge (nur bei neuen/umbenannten). |
| `faculty.ts`       | Namen, Kontakt-E-Mails und Website-URLs der Fakultäten EMI und INF.                   |

---

## `StudiengangId` vs. `StudiengangPageId` (Wichtig wegen ITS/ECS)

In den Dateien tauchen zwei ähnliche Schreibweisen für Studiengänge auf. Der Unterschied liegt daran, dass **ITS** und **ECS** eine gemeinsame Detailseite haben:

- **`StudiengangId`** (Großbuchstaben, z. B. `ET`, `ITS`, `ECS`, `M-INF`):
  Steht immer für einen **einzelnen Studiengang**. Wird dort genutzt, wo Studiengänge einzeln aufgezählt werden – z. B. in `studiengaenge.ts` und in der Studiengangsliste auf der Startseite (`general-info.ts`).
- **`StudiengangPageId`** (Kleinbuchstaben, z. B. `et`, `its-ecs`, `m-inf`):
  Steht für eine **Studiengangs-Detailseite** und entspricht dem letzten Teil der URL (z. B. `/studiengang/its-ecs`). Wird überall dort genutzt, wo Inhalte für eine konkrete Detailseite gepflegt werden – also in `roadmap.ts`, `tutor-names.ts` und `links.ts`.

### Zuordnung im Überblick

| Fakultät | `StudiengangId` (einzelner Studiengang) | `StudiengangPageId` (Detailseite / URL) |
| :------- | :-------------------------------------- | :-------------------------------------- |
| EMI      | `ET`                                    | `et`                                    |
| EMI      | `IE`                                    | `ie`                                    |
| EMI      | `MT`                                    | `mt`                                    |
| EMI      | `REE`                                   | `ree`                                   |
| INF      | `AI`                                    | `ai`                                    |
| INF      | `ITS` und `ECS`                         | `its-ecs` _(gemeinsame Seite)_          |
| INF      | `WI`                                    | `wi`                                    |
| INF      | `MI`                                    | `mi`                                    |
| INF      | `BIM`                                   | `bim`                                   |
| INF      | `M-INF`                                 | `m-inf`                                 |

---

## Detaillierte Übersicht aller Dateien

### 1. `general-info.ts` – Startseite & Startveranstaltung

Hier stehen die allgemeinen Eckdaten der OE-Woche, die auf der Startseite der jeweiligen Fakultät angezeigt werden.

- **`oeWeekData`**: Zeitraum der OE-Woche für beide Fakultäten:
  - `startDate`: Erster Tag der OE (z. B. `"05.10.2026"`).
  - `endDate`: Letzter Tag der OE (z. B. `"08.10.2026"`).
- **`commonStartEventData`**: Gemeinsame Angaben zur Startveranstaltung:
  - `date`: Datum der Startveranstaltung.
  - `building`: Vollständiger Gebäudename / Adresse (z. B. `"Berliner Tor 21"`).
  - `buildingShort`: Kürzel in Klammern dahinter (z. B. `"BT21"`).
  - `room`: Raumangabe mit Artikel, da sie direkt in den Satz `in <room> des <building>` eingesetzt wird (z. B. `"der Aula"` → _„in der Aula des Berliner Tor 21 (BT21)“_). Wenn kein Raum genannt werden soll, einfach leer lassen (`""`).
  - `mapsUrl`: Google-Maps-Link zum Gebäude.
- **`oeInfoCardDataEMI` und `oeInfoCardDataINF`**: Fakultätsspezifische Angaben:
  - `time`: Startuhrzeit der Startveranstaltung für EMI bzw. INF (z. B. `"9:30 Uhr"`).
  - `studiengaenge`: Welche Studiengänge im Begrüßungstext auf der Startseite genannt werden (hier werden die einzelnen `StudiengangId`-Einträge wie `studiengaenge.ITS` und `studiengaenge.ECS` verwendet).

---

### 2. `roadmap.ts` – OE-Wochenplan (Roadmap)

Hier wird der gesamte Ablaufplan der OE-Woche gepflegt. Die Daten sind in einen **gemeinsamen Teil** und einen **studiengangspezifischen Teil** aufgeteilt.

- **`common`**: Gilt für alle Studiengänge gleichzeitig:
  - `semester`: Semesterbezeichnung für die Überschrift (z. B. `"SoSe 26"` oder `"WiSe 26/27"`).
  - `days`: Liste der einzelnen OE-Tage mit:
    - `weekday`: Wochentag (z. B. `"Dienstag"`).
    - `date`: Datum (z. B. `"07.04"`).
    - `eveningProgram`: Gemeinsames Abendprogramm des jeweiligen Tages.
- **`roadmapBuilderDataByPageId`**: Enthält für jede `StudiengangPageId` (außer `m-inf`) den eigenen Wochenplan:
  - `room`: Standardraum bzw. Campus des Studiengangs (z. B. `"Raum: 10.60 am Berliner Tor 7"`).
  - `days`: Liste der Tagespläne für diesen Studiengang. Jeder Tag hat:
    - `start`: Startzeit (z. B. `"10:00 Uhr"`).
    - `end`: Endzeit (z. B. `"16:00 Uhr"` oder `"open end"`).
    - `items`: Stichpunkte zu den Programmpunkten des Tages.

> **Wichtige Hinweise zur Roadmap:**
>
> - **Eigene Tagespläne statt `demoDayData`:** `demoDayData` ist eine Beispielvorlage. Sobald ein Studiengang einen eigenen Plan hat, kannst du für ihn direkt eine eigene Tagesliste eintragen (oder wie `demoDayData` darüber anlegen und bei `days:` zuweisen).
> - **Master Informatik (`m-inf`):** Für `m-inf` wird auf der Detailseite bewusst keine Roadmap angezeigt, daher gibt es hier keinen Eintrag für `m-inf`.

---

### 3. `tutor-names.ts` – Namen der OE-Tutor\*innen

Hier stehen die Vornamen der OE-Tutor\*innen, zugeordnet nach `StudiengangPageId`.

- Trage einfach die Vornamen in die Liste des jeweiligen Studiengangs ein.
- Die Namen werden auf der Website **automatisch alphabetisch sortiert** – die Reihenfolge in der Datei spielt also keine Rolle.
- Wenn für einen Studiengang noch keine Namen feststehen, lass die Liste einfach leer (`[]`). Auf der Website erscheint dann automatisch der Hinweis _„Die Tutor\*innen für diesen Studiengang werden noch bekanntgegeben.“_

---

### 4. `links.ts` – Linksammlungen auf den Studiengangsseiten

Hier werden alle nützlichen Links für die Erstsemester verwaltet.

- **Oben in der Datei** stehen häufig genutzte Einzellinks (z. B. `hvvSemesterTicketLink`, `onlineServicesLink`, `myHawLink`, `klausurenSammlungLinkINF`, `klausurenSammlungLinkEMI`, `teamsRaumSupportLink`). Wenn sich z. B. der Teams-Beitrittscode oder ein allgemeiner HAW-Link ändert, reicht es, ihn einmal dort anzupassen.
- **`emiCommon` und `infCommon`** fassen die gemeinsamen Standardlinks für alle EMI- bzw. INF-Studiengänge zusammen.
- **`linksByPage`** ordnet jeder `StudiengangPageId` ihre Links zu (meist zuerst der Link zur offiziellen HAW-Studiengangsseite, danach die gemeinsamen Links über `...emiCommon` bzw. `...infCommon`, plus eventuelle Sonderlinks wie die Campus-Bibliothek bei `bim`).

Jeder Link-Eintrag besteht aus folgenden Feldern:

- `label`: Sichtbarer Text des Links.
- `href`: Ziel-URL.
- `note` _(optional)_: Kurzer Erklärungstext unter dem Link.
- `teamsCode` _(optional)_: Beitrittscode für Microsoft Teams, der als hervorgehobenes Badge neben dem Link angezeigt wird.

---

### 5. `faq-content.astro` – Fragen & Antworten (FAQ-Seite)

Hier stehen alle Inhalte der FAQ-Seite (gemeinsam für EMI und INF). Die Datei ist in Kategorien und einzelne Fragen gegliedert:

- **Kategorie (`<FAQCategory ...>`)**:
  - `title`: Überschrift der Kategorie (z. B. `"Orientierungseinheit (OE)"`).
  - `description`: Kurzer Untertitel unter der Überschrift.
  - `type`: Eindeutige Kennung in Kleinbuchstaben ohne Leerzeichen (z. B. `"oe"`, `"studium"`, `"campus"`), dient als Sprungmarke auf der Seite.
- **Frage (`<FAQQuestion question="...">`)**:
  - `question`: Der Fragetext, der als ausklappbarer Eintrag erscheint.
  - Innerhalb von `<FAQQuestion>...</FAQQuestion>` steht der Antworttext.
- **Formatierung in Antworten**:
  - `<p>...</p>` für normale Textabsätze
  - `<strong>...</strong>` für fettgedruckte Begriffe
  - `<ul>` mit `<li>...</li>` für Aufzählungspunkte
  - `<Link href="https://...">Linktext</Link>` für externe Links (für interne Links wie die Startseite reicht `<a href="/">Startseite</a>`)
  - `<div class="faq-callout">...</div>` für hervorgehobene Hinweisboxen (z. B. für Pflichttermine)

Am einfachsten kopierst du für eine neue Frage einen bestehenden `<FAQQuestion>`-Block und passt Frage und Antwort an.

---

### 6. `studiengaenge.ts` – Stammdaten der Studiengänge _(selten zu ändern)_

Enthält die Grunddaten aller Studiengänge unter `studiengaenge` (geordnet nach `StudiengangId`):

- `name`: Vollständiger Name des Studiengangs.
- `short`: Kürzel (entspricht der `StudiengangId`).
- `degree`: Abschluss (z. B. `"B.Sc."`, `"B.A."`, `"M.Sc."`).
- `faculty`: Zugehörige Fakultät (`faculties.EMI` oder `faculties.INF`).
- `details.entryId`: Zugehörige `StudiengangPageId` (z. B. `"its-ecs"` bei `ITS` und `ECS`).

Darunter stehen die Listen `studiengaengeEMI`, `studiengaengeBachelorINF` und `studiengaengeINF`, die festlegen, welche Studiengänge auf der jeweiligen Übersichtsseite erscheinen.

> **Hinweis:** Wenn ein Studiengang nur umbenannt wird, reicht eine Änderung hier. Wenn ein komplett **neuer Studiengang** hinzukommt oder wegfällt, müssen zusätzlich die IDs in `shared/src/types/types.ts` sowie die Einträge in `roadmap.ts`, `tutor-names.ts`, `links.ts` und `general-info.ts` angepasst werden.

---

### 7. `faculty.ts` – Stammdaten der Fakultäten _(selten zu ändern)_

Enthält für `EMI` und `INF` jeweils:

- `name`: Vollständiger Fakultätsname.
- `short`: Kürzel (`"EMI"` / `"INF"`).
- `contactEmail`: Kontakt-E-Mail-Adresse (wird u. a. auf der Startseite und im Kontaktbereich genutzt).
- `website`: Offizielle URL der jeweiligen OE-Website.
