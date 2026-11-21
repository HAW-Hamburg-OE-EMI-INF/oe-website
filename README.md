# HAW Hamburg OE-Websites (EMI & INF)

Dieses Repository enthält die statischen Websites für die Orientierungseinheit (OE) der Fakultäten **EMI** (Elektro-, Medien- und Informationstechnik) und **INF** (Informatik und Digitale Gesellschaft) an der HAW Hamburg.

Die Websites werden mit [Astro](https://astro.build/) und [Tailwind CSS v4](https://tailwindcss.com/) gebaut und teilen sich über ein npm-Workspaces-Monorepo den Großteil ihres Codes und ihrer Inhalte.

## Voraussetzungen

- Node.js `>= 22.23.4` (inkl. npm)
- Optional, aber empfohlen: [Lefthook](https://github.com/evilmartians/lefthook) für automatische Git-Hooks

## Projektstruktur

Das Projekt ist als Monorepo mit drei npm-Workspaces aufgebaut:

```text
/
├── shared/   # @oe/shared - Gemeinsame Bibliothek (Komponenten, Seiten, Daten, Styles, Assets)
├── emi/      # @oe/emi    - Website für die Fakultät EMI
└── inf/      # @oe/inf    - Website für die Fakultät INF
```

- **`shared/` (`@oe/shared`)**: Enthält nahezu den gesamten Code, die Seitenvorlagen, das Design und alle Inhalte. Änderungen hier gelten für beide Websites.
- **`emi/` (`@oe/emi`)** und **`inf/` (`@oe/inf`)**: Dünne Wrapper um `@oe/shared`. Sie enthalten jeweils nur die Astro-Konfiguration (`astro.config.mjs`), statische Dateien (`public/`), die Routen (`src/pages/`) sowie das fakultätsspezifische Farbschema (`src/styles/global.css`).

### Aufbau von `shared/src/`

- `assets/`: Bilder, SVG-Icons und Logos.
- `components/`: Wiederverwendbare UI- und Bereichskomponenten (z. B. Header, Footer, Hero, Roadmap, FAQ, Studiengang-Karten, Wartungsseite).
- `data/`: Zentrale Inhalts- und Konfigurationsdaten der Websites (siehe [Anleitung in `shared/src/data/README.md`](./shared/src/data/README.md)).
- `layouts/`: Gemeinsames Grundlayout (`Layout.astro`).
- `pages/`: Vollständige Seitenvorlagen (Startseite, FAQ, Studiengänge, Detailseiten, Impressum, Datenschutz), die von `emi/` und `inf/` eingebunden werden.
- `styles/`: Gemeinsame Stylesheets und Tailwind-Basisdefinitionen.
- `types/`: Gemeinsame TypeScript-Typdefinitionen.
- `util/`: Hilfsfunktionen (z. B. Formatierung, Roadmap-Verarbeitung, Wartungsmodus).

## Webseitendaten anpassen

Fast alle Inhalte, die sich von Semester zu Semester ändern (Termine, Zeitpläne, Namen der Tutor\*innen, Links oder FAQs), liegen zentral im Ordner **`shared/src/data/`**. Wer nur Inhalte aktualisieren möchte, muss in der Regel keine Komponenten oder Layouts anfassen.

Eine ausführliche Anleitung dazu, was genau in welcher Datei angepasst werden kann (inkl. Ablauf, `EDIT AREA` und Unterschied zwischen `StudiengangId` und `StudiengangPageId`), findest du in der [Data-README (`shared/src/data/README.md`)](./shared/src/data/README.md).

## Befehle

Alle Befehle werden im Hauptverzeichnis (Root) des Repositories ausgeführt:

| Befehl              | Beschreibung                                                                                             |
| :------------------ | :------------------------------------------------------------------------------------------------------- |
| `npm install`       | Installiert alle Abhängigkeiten für alle Workspaces.                                                     |
| `npm run dev:emi`   | Startet den lokalen Entwicklungsserver für die EMI-Website.                                              |
| `npm run dev:inf`   | Startet den lokalen Entwicklungsserver für die INF-Website.                                              |
| `npm run build`     | Baut beide Websites (`emi/dist/` und `inf/dist/`).                                                       |
| `npm run build:emi` | Baut nur die EMI-Website (`emi/dist/`).                                                                  |
| `npm run build:inf` | Baut nur die INF-Website (`inf/dist/`).                                                                  |
| `npm run fmt`       | Formatiert den Code automatisch mit `oxfmt`.                                                             |
| `npm run fmt:check` | Prüft die Code-Formatierung mit `oxfmt`.                                                                 |
| `npm run lint`      | Prüft den Code mit ESLint.                                                                               |
| `npm run lint:fix`  | Behebt automatisch behebbare ESLint-Probleme.                                                            |
| `npm run typecheck` | Führt die TypeScript-Typprüfung für alle Workspaces aus.                                                 |
| `npm run check`     | Führt alle Prüfungen inkl. Build aus (`fmt:check`, `lint`, `typecheck` und `build` für alle Workspaces). |

### Wartungsmodus lokal testen

Der Wartungsmodus wird zur Build- bzw. Startzeit über die Umgebungsvariable `PUBLIC_MAINTENANCE_MODE` (`true` oder `1`) gesteuert:

```bash
PUBLIC_MAINTENANCE_MODE=true npm run dev:emi
```

## Git-Hooks mit Lefthook

Für gleichbleibende Code-Qualität ist [Lefthook](https://github.com/evilmartians/lefthook) in `lefthook.yml` konfiguriert. Wenn Lefthook lokal installiert ist, können die Hooks einmalig eingerichtet werden:

```bash
lefthook install
```

Dadurch werden automatisch folgende Prüfungen ausgeführt:

- **Vor jedem Commit (`pre-commit`)**: Formatierung (`fmt:check`), Linting (`lint`) für geänderte Dateien und Typprüfung (`typecheck`).
- **Vor jedem Push (`pre-push`)**: Vollständiger `fmt:check`, `lint`, `typecheck` und `build` beider Websites.

## Deployment (GitHub Actions & GitHub Pages)

Das Deployment läuft automatisch über GitHub Actions (`.github/workflows/deploy.yaml`):

- **Auslöser**: Jeder Push auf den `main`-Branch oder ein manueller Start im GitHub-Tab **Actions** über den Workflow _Deploy static content to Pages_ (`workflow_dispatch`).
- **Prüfung & Build**: Die Pipeline prüft zuerst Formatierung (`oxfmt`), Typen (`typecheck`) und Linting (`ESLint`) und baut danach beide Websites (`emi/dist` und `inf/dist`).
- **Veröffentlichung**: Beide Builds werden getrennt auf den jeweiligen `gh-pages`-Branch der zugehörigen GitHub-Pages-Repositories deployed (`oe-emi-pages` für EMI und `oe-inf-pages` für INF).
- **Wartungsmodus beim Deployment**: Beim manuellen Start des Workflows kann die Option `maintenance_mode` aktiviert werden. Alternativ lässt sich der Wartungsmodus dauerhaft über die GitHub-Repository-Variable `MAINTENANCE_MODE` steuern.
