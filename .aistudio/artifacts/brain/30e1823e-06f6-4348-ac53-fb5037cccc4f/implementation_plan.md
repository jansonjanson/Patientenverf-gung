# Didaktische Fachgrafiken & Strukturdiagramme für alle 6 Phasen (Großkopf & Klein / J. Rosenow)

Schrittweiser Plan zur vollständigen Übernahme und visuellen Veredelung der juristischen Lehrinhalte aus den Fachfolien von J. Rosenow (M.A. Pflegepädagogik) und Großkopf & Klein (2019a, 2019b) in interaktive, responsive SVG-Prozess- und Strukturdiagramme über alle sechs Lernphasen der Anwendung.

## User Review & Critical Decisions

> [!IMPORTANT]
> Alle drei zentralen Entscheidungen wurden in Phase 1 geklärt und abgestimmt:
> 1. **Inhaltliche Grundlage**: Vollständige Übernahme der integrierten Fachfolien nach Großkopf & Klein (2019a, 2019b) und J. Rosenow. Keine Kürzungen des bestehenden Lehrstoffes; punktuelle didaktische Vertiefung dort, wo Schaubilder das Verständnis schärfen.
> 2. **Umfang der Schaubilder**: Alle sechs Phasen erhalten jeweils ein maßgeschneidertes, interaktives Prozess- und Strukturdiagramm.
> 3. **Visuelle & technische Ausführung**: Native, gestochen scharfe SVG-Flowcharts im hellen UI-Designsystem der App (hochkontrastige Linienführung, klare Statuscodierung mit Text & Symbolik, WCAG-AA-konform, print- und beamerfest).

---

## 1. Übersicht & Didaktisches Konzept

Die Webanwendung begleitet Pflegefachkräfte und Auszubildende durch ein 180-minütiges didaktisches Curriculum (zwei Doppelstunden) zum Thema Patientenverfügung und Strafrecht im Palliative-Care-Kontext.

Während der Textbestand der Folien exakt erhalten bleibt, werden die oft komplexen juristischen Abgrenzungen, Fristen und Subsumtionsschritte durch **visuelle Denkmodelle (SVG-Flowcharts & Strukturmatrizen)** greifbar gemacht. Lernende können per Klick Knotenpunkte erkunden, Entscheidungswege nachvollziehen und Rechtsfolgen unmittelbar vergleichen.

---

## 2. Visuelle Gestaltung & Schaubild-Architektur

### Design-Vorgaben nach UI-Constitution (Education Domain)
- **Farbpalette & Kontraste**: 60% heller neutraler Hintergrund (`bg-slate-50`), 30% weiße Strukturkarten mit feinen Rahmen (`border-slate-200`), 10% funktionale Akzente (Königsblau `#2563EB` für aktive Knoten, Smaragdgrün `#16A34A` für Gültigkeit/Rechtssicherheit, Bernstein `#D97706` für Prüfungsschritte/Fristen, Korallenrot `#DC2626` für Nichtigkeits-/Rechtsmängel).
- **Barrierefreiheit**: Keine reine Farbcodierung – jeder Diagrammknoten trägt ein beschreibendes Icon (Lucide Icons) und textliche Statusauszeichnungen.
- **Interaktivität**: Klickbare Knoten mit animierter Hervorhebung des aktiven Pfads, Detail-Tooltip bzw. fokussiertem Lernkärtchen.

### Geplante Schaubilder für die 6 Phasen

```
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 1: 4-Säulen-Entscheidungsbaum & Abgrenzungsmatrix               │
│ [Betreuungsverfügung] ── [Vorsorgevollmacht] ── [§ 1358 BGB] ── [PV]  │
│ Gerichtl. Anordnung        Vertreter im Willen    6-Monate-Notrecht     Wirkt sofort!  │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│ Phase 2: Selbsterfahrungs- & Reflexionspfad                           │
│ Start ──► [3 Generatoren: BMJ / VZ / Esslingen] ──► [Stolperstein] ──► [Eigener Satz] │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│ Phase 3: Synopse- & Tandem-Vergleichsdiagramm                         │
│ [Gemeinsamkeiten] ◄──► [Unterschiede] ◄──► [Blinde Flecken] ◄──► [Praxisfragen]        │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│ Phase 4: Prüfschema der 6 Voraussetzungen + WENN-DANN-Formel           │
│ 1. Einwilligungsf. ─► 2. Schriftform ─► 3. Vorab-Einwilligung         │
│ 4. Bestimmtheit ────► 5. Kein Widerruf ─► 6. Keine Sittenwidrigkeit   │
│ Formel: [WENN: Konkreter Krankheitszustand] ──► [DANN: Konkrete Maßnahme] │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│ Phase 5: Eigen-Check-Prüfkaskade                                      │
│ [Eigene Klausel aus Phase 2] ──► [Juristischer Belastungstest] ──► [Status: Bindend]  │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│ Phase 6: Konsil-Diagnosebaum für die 6 Problemfälle                   │
│ [Problemklausel] ──► [Diagnose: WENN/DANN vage] ──► [Musterformulierung]│
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Detail-Spezifikation je Phase

### Phase 1: Arten der Verfügung & Orientierungskompass
- **Bestehende Inhalte erhalten**: 5-Min-Impulsvideo (YouTube-Embed), Auszüge zu Betreuungsverfügung, Vorsorgevollmacht, Ehegattennotvertretungsrecht (§ 1358 BGB) und Patientenverfügung ("wirkt aus sich heraus"), 4-Fragen-Quiz, Plenum-Stopp-Banner 1.
- **Neues SVG-Schaubild**:
  - Horizontaler Entscheidungsbaum: "Wer entscheidet am Krankenbett?"
  - Verzweigung 1: Liegt eine wirksame Patientenverfügung vor? ➔ Ja: Unmittelbare Bindung für Behandelnde (kein Gericht, kein Vertreter erforderlich).
  - Verzweigung 2: Liegt eine Vorsorgevollmacht vor? ➔ Ja: Bevollmächtigte Person ist "Vertreter im Willen" (§ 1896 Abs. 2 BGB Vorrang).
  - Verzweigung 3: Verheiratet & Akutfall? ➔ Ehegattenvertretungsrecht nach § 1358 BGB (max. 6 Monate, Schweigepflicht entfällt).
  - Verzweigung 4: Keine Vorsorge? ➔ Gerichtliche Betreuungsanordnung (Geschäfts-/Einsichtsfähigkeit bleibt bestehen, nur begrenzter Aufgabenkreis).

### Phase 2: Selbsterfahrung & Erstellung
- **Bestehende Inhalte erhalten**: Links zu den 3 Generatoren (Verbraucherzentrale, BMJ, Esslinger Initiative), Notiz zur emotionalen Entlastung, Textfelder für Tool-Auswahl, Zögerungspunkt und 1–2 eigene Beispielsätze.
- **Neues SVG-Schaubild**:
  - Prozessdiagramm: "Von der ethischen Reflexion zum rechtssicheren Textbaustein"
  - 3 visualisierte Methodenpfade (Geführter Dialog-Generator vs. modulares Textbaustein-System vs. standardisierter Ankreuzbogen) mit didaktischen Vor- und Nachteilen.

### Phase 3: Tandem-Vergleich & Hilfsmittel-Kritik
- **Bestehende Inhalte erhalten**: Die 4 strukturierten Vergleichsfragen (Was gleicht sich? Was ist anders? Was fehlt? Welche Fragen stellen sich?) sowie Plenum-Stopp-Banner 2.
- **Neues SVG-Schaubild**:
  - 4-Quadranten-Matrix / Venn-artiges Strukturdiagramm für den Tandem-Austausch: Schnittmenge der Werkzeuge vs. systemspezifische Stärken und typische Fallstricke in der Praxis.

### Phase 4: Juristischer Rahmen & WENN-DANN-Logik
- **Bestehende Inhalte erhalten**: 6 Wirksamkeitsvoraussetzungen nach Großkopf & Klein (Einwilligungsfähigkeit mit Einsichts-, Urteilsfähigkeit & freier Willensbildung; Schriftform; Vorab-Einwilligung; Bestimmtheit; keine Willensänderung; keine Sittenwidrigkeit) sowie WENN-DANN-Formulierung.
- **Neues SVG-Schaubild**:
  - **Prüfkaskade der 6 Wirksamkeitsstufen**: Grafische Kette mit Checkmark-Gates (K.O.-Kriterien).
  - **WENN-DANN-Formel-Visualizer**: Interaktive Gegenüberstellung von Krankheitszustand (Symptome, Befund, Prognose) und Behandlungsentscheidung (Einwilligung / Verweigerung konkreter Maßnahmen wie Beatmung, PEG, Dialyse).

### Phase 5: Eigen-Check der erstellten Verfügung
- **Bestehende Inhalte erhalten**: Spiegelung des eigenen Satzes aus Phase 2, Kriterien-Checkliste (WENN-Prüfung, DANN-Prüfung, Widerspruchsfreiheit), Stresstest-Szenario.
- **Neues SVG-Schaubild**:
  - Interaktives "Krankenbett-Stresstest-Ablaufdiagramm": Wie liest ein Notarzt/Pflegefachkraft um 03:00 Uhr nachts die eigene Klausel? (Schnelltest auf Bestimmtheit und Eindeutigkeit).

### Phase 6: Rechts-Konsil & Praxis-Transfer
- **Bestehende Inhalte erhalten**: 6 Praxis-Fallakten mit Original-Aussagen, Fehlerdiagnose-Checkboxen, eigenen WENN- und DANN-Feldern sowie den vollständigen juristischen Musterlösungen nach J. Rosenow.
- **Neues SVG-Schaubild**:
  - Fall-Navigations- & Diagnosematrix: Übersicht aller 6 Fälle mit visueller Zuordnung der typischen Rechtsmängel (Mangel 1: WENN unbestimmt; Mangel 2: DANN unbestimmt; Mangel 3: Unklare Bevollmächtigung) und der logischen Transformation in die bindende Musterformulierung.

---

## 4. Technische Architektur & Komponenten-Design

```
src/components/
├── diagrams/                          // Modulare, wiederverwendbare SVG-Flowcharts
│   ├── DecisionTreePhase1.tsx         // 4-Säulen-Entscheidungsbaum
│   ├── CreationPathPhase2.tsx         // Generator-Pfad & Selbsterfahrungs-Flow
│   ├── ComparisonMatrixPhase3.tsx     // Tandem-Quadranten & Synopse
│   ├── LegalChecklistFlowPhase4.tsx   // 6 Voraussetzungen & WENN-DANN-Formel
│   ├── StressTestFlowPhase5.tsx       // Krankenbett-Stresstest-Kaskade
│   └── CaseAnalysisMatrixPhase6.tsx   // 6-Fälle-Fehlerdiagnose-Übersicht
├── phases/
│   ├── Phase1Orientation.tsx          // Bindet DecisionTreePhase1 ein
│   ├── Phase2SelfExperience.tsx       // Bindet CreationPathPhase2 ein
│   ├── Phase3TandemComparison.tsx     // Bindet ComparisonMatrixPhase3 ein
│   ├── Phase4LegalFramework.tsx       // Bindet LegalChecklistFlowPhase4 ein
│   ├── Phase5SelfCheck.tsx            // Bindet StressTestFlowPhase5 ein
│   └── Phase6LegalConsil.tsx          // Bindet CaseAnalysisMatrixPhase6 ein
```

### Technische Leitlinien
- Reine React/TypeScript-Komponenten mit Inline-SVG und Tailwind-Klassen (keine schweren externen Diagramm-Bibliotheken notwendig; maximale Rendergeschwindigkeit und Zuverlässigkeit).
- Vollständige Offline- und Mobile-Tauglichkeit (`viewBox`-gestützte SVG-Skalierung mit horizontalem Scroll-Fallback auf schmalen Bildschirmen).
- Saubere Integration in die PDF-Druckansicht (`PrintHandoutModal.tsx`), sodass Handouts auch für den Ausdruck didaktisch aufbereitet sind.

---

## 5. Verifikation & Qualitätssicherung

1. **Inhaltlicher 100%-Abgleich**: Jedes Zitat, jeder Paragraph (§ 1896 BGB, § 1358 BGB, BGH-Entscheidungen) und alle 6 Fallbeispiele aus Großkopf & Klein (2019a, 2019b) und den Rosenow-Folien bleiben ungekürzt erhalten.
2. **Offline- & Multi-User-Integrität**: Alle Diagramm-Interaktionen (Klicks, Hervorhebungen) laufen synchron mit dem lokalen State, ohne Netzwerkanfragen zu erzwingen.
3. **Build & Lint**: Verifikation durch `compile_applet` und `lint_applet` nach Abschluss der Implementierung.
