import React, { useState } from 'react';
import { ExternalLink, HeartHandshake, ArrowRight, FileText, Download, Users, Laptop, FileCheck, CheckCircle2 } from 'lucide-react';
import { StepTransition } from '../StepTransition';
import { SaveExportBar } from '../SaveExportBar';

interface Phase2SelfExperienceProps {
  toolsChosen: string;
  hesitationPoint: string;
  creationInsights: string;
  ownPvSentences: string;
  onUpdateField: (field: string, value: string) => void;
  onNextPhase: () => void;
}

const PRESET_COMBINATIONS = [
  'Person A: Verbraucherzentrale („Selbstbestimmt“) & Person B: BMJV-Textbausteine (PDF)',
  'Person A: Esslinger Initiative (Formular) & Person B: BMJV-Textbausteine (PDF)',
  'Tandem: Beide haben Verbraucherzentrale & BMJV verglichen',
];

export const Phase2SelfExperience: React.FC<Phase2SelfExperienceProps> = ({
  toolsChosen,
  hesitationPoint,
  creationInsights,
  ownPvSentences,
  onUpdateField,
  onNextPhase,
}) => {
  const [isCustomTool, setIsCustomTool] = useState(!PRESET_COMBINATIONS.includes(toolsChosen) && Boolean(toolsChosen));

  const handleSelectPreset = (selectedVal: string) => {
    if (selectedVal === 'custom') {
      setIsCustomTool(true);
      onUpdateField('toolsChosen', '');
    } else {
      setIsCustomTool(false);
      onUpdateField('toolsChosen', selectedVal);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Phase Intro Banner */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col items-start gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Doppelstunde 1 • Phase 2
          </span>
          <span className="text-xs font-semibold text-slate-500">
            Dauer: ca. 35 Minuten
          </span>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Phase 2: Selbsterfahrung – Eine eigene Patientenverfügung erstellen
          </h2>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-4xl">
            Versetzen Sie sich in die reale Lage von Patient:innen und Ratsuchenden: Erproben Sie die bestehenden Hilfen im verbindlichen Tandem (Person A = Online-Generator, Person B = offizielle Textbausteine) und fertigen Sie eine Patientenverfügung an.
          </p>
        </div>

        {/* Sensitive didactical note */}
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs sm:text-sm text-emerald-900 font-medium">
          <HeartHandshake className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Didaktischer Hinweis:</strong> Falls Ihnen das Verfügen über das eigene Sterben heute emotional zu nah geht, erstellen Sie die Verfügung alternativ für Ihr <strong>80-jähriges Ich oder eine fiktive Person</strong>.
          </span>
        </div>
      </div>

      {/* Transition to Step 1 */}
      <StepTransition
        stepNumber="1"
        title="Tandem-Werkzeuge auswählen & öffnen"
        hint="Person A wählt einen Generator • Person B nutzt BMJV-Textbausteine"
        variant="blue"
      />

      {/* Tool Selection (Clear 2-Column Split for Person A and Person B) */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Schritt 1 • Klare Tandem-Aufteilung
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
              Werkzeuge für Person A und Person B
            </h3>
            <p className="text-sm text-slate-600 mt-1 font-medium">
              Jede Person wählt die für ihre Rolle vorgesehenen Erstellungshilfen:
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold shrink-0">
            <Users className="w-4 h-4 text-blue-600" />
            <span>Tandem-Modus</span>
          </div>
        </div>

        {/* 2-Column Layout: Left = Person A, Right = Person B */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* COLUMN 1: PERSON A (ONLINE-GENERATOREN) */}
          <div className="bg-blue-50/40 border-2 border-blue-200 rounded-3xl p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-base shadow-sm shrink-0">
                  A
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-300">
                    Nur für Person A
                  </span>
                  <h4 className="text-lg font-black text-slate-900 mt-1">
                    Interaktive Online-Generatoren
                  </h4>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                Person A wählt <strong>einen der folgenden beiden Online-Generatoren</strong> aus und führt den Erstellungsprozess schrittweise im Browser durch:
              </p>

              {/* Option A1: Verbraucherzentrale */}
              <div className="bg-white border-2 border-blue-200/90 rounded-2xl p-5 space-y-3 shadow-2xs hover:border-blue-400 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
                    Generator 1 (Empfohlen)
                  </span>
                  <Laptop className="w-4 h-4 text-blue-600" />
                </div>
                <h5 className="font-extrabold text-slate-900 text-base">
                  Verbraucherzentrale („Selbstbestimmt“)
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Schritt-für-Schritt-Generator mit laiengerechten Erklärtexten, Hinweisen zur Tragweite einzelner Entscheidungen und Reflexionsfragen zu persönlichen Wertvorstellungen.
                </p>
                <a
                  href="https://www.vzhh.de/themen/online-service/kostenlos-patientenverfuegung-erstellen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition transform active:scale-95 no-print"
                >
                  <span>Generator der Verbraucherzentrale öffnen</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Option A2: Esslinger Initiative */}
              <div className="bg-white border-2 border-teal-200/90 rounded-2xl p-5 space-y-3 shadow-2xs hover:border-teal-400 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-lg border border-teal-200">
                    Generator 2 (Alternative)
                  </span>
                  <Laptop className="w-4 h-4 text-teal-600" />
                </div>
                <h5 className="font-extrabold text-slate-900 text-base">
                  Esslinger Initiative e.V. (Formulargenerator)
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Kompakter Formulargenerator mit Auswahlkästchen zu typischen Behandlungssituationen („Wenn...“) und konkreten Bestimmungen („Dann...“).
                </p>
                <a
                  href="https://www.esslinger-initiative.de/index.php/formulargenerator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition transform active:scale-95 no-print"
                >
                  <span>Esslinger Generator öffnen</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* COLUMN 2: PERSON B (TEXTBAUSTEINE DES BMJV) */}
          <div className="bg-purple-50/40 border-2 border-purple-200 rounded-3xl p-6 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black text-base shadow-sm shrink-0">
                  B
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-300">
                    Nur für Person B
                  </span>
                  <h4 className="text-lg font-black text-slate-900 mt-1">
                    Offizielle BMJV-Textbausteine (PDF)
                  </h4>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                Person B nutzt <strong>die offiziellen Textbausteine des Bundesministeriums der Justiz (BMJV)</strong> und stellt eine Verfügung durch gezieltes Auswählen, Streichen und Ergänzen von Musterklauseln zusammen.
              </p>

              {/* Main Card: BMJV Textbausteine with direct download */}
              <div className="bg-white border-2 border-purple-200/90 rounded-2xl p-5 space-y-3.5 shadow-2xs hover:border-purple-400 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-lg border border-purple-200">
                    Bundesministerium der Justiz
                  </span>
                  <FileCheck className="w-4 h-4 text-purple-600" />
                </div>
                <h5 className="font-extrabold text-slate-900 text-base">
                  Patientenverfügung Textbausteine (BMJV)
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Das offizielle juristische Standarddokument der Bundesregierung. Enthält formulierte WENN- und DANN-Klauseln zum manuellen Anpassen.
                </p>

                {/* Primary: Direct Download Link */}
                <a
                  href="https://www.bmjv.de/SharedDocs/Downloads/DE/Formular/Patientenverfuegung_Textbausteine_pdf.pdf?__blob=publicationFile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition transform active:scale-95 no-print"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Direkt-Download: BMJV-Textbausteine (PDF)</span>
                </a>

                {/* Secondary: BMJ Document Link */}
                <a
                  href="https://www.bmj.de/SharedDocs/Downloads/DE/Formular/Patientenverfuegung_Textbausteine_pdf.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-2xs font-bold flex items-center justify-center gap-1.5 transition no-print"
                >
                  <FileText className="w-3.5 h-3.5 text-purple-600" />
                  <span>Alternative Ansicht auf bmj.de öffnen</span>
                  <ExternalLink className="w-3 h-3 text-purple-600" />
                </a>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-100/70 border border-purple-300 text-xs text-purple-950 font-medium leading-relaxed">
                💡 <strong>Tipp für Person B:</strong> Achten Sie darauf, welche juristischen Begriffe das Ministerium verwendet und wie viel medizinisches Vorwissen zum Verstehen nötig ist.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Transition to Stolperstein-Protokoll */}
      <StepTransition
        stepNumber="2"
        title="Stolperstein-Protokoll ausfüllen & lokal speichern"
        hint="Beobachtungen festhalten & Sätze für den Stresstest sichern"
        variant="emerald"
      />

      {/* Begleitendes Stolperstein-Protokoll */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Schritt 2 • Begleit-Notizen während der Erstellung
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
            Ihr persönliches „Stolperstein-Protokoll“ (Perspektive Patient:in)
          </h3>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Halten Sie schon beim Ausfüllen fest, was Ihnen auffällt. Ihre Notizen werden sicher und lokal in Ihrem Browser gespeichert und können als Word-Datei (.doc) exportiert werden.
          </p>
        </div>

        {/* Input Field 1: Auswahlbox / Dropdown für gewählte Generatoren */}
        <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <label className="block text-sm font-extrabold text-slate-900">
            1. Welche Erstellungshilfen hat Ihr Tandem verwendet? (Dropdown-Auswahl)
          </label>

          <select
            value={isCustomTool ? 'custom' : toolsChosen}
            onChange={(e) => handleSelectPreset(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-blue-200 text-sm sm:text-base text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-2xs"
          >
            <option value="" disabled>-- Bitte wählen Sie Ihre Tandem-Kombination aus --</option>
            {PRESET_COMBINATIONS.map((preset) => (
              <option key={preset} value={preset}>
                {preset}
              </option>
            ))}
            <option value="custom">✏️ Andere Kombination / Eigene Freitext-Angabe...</option>
          </select>

          {isCustomTool && (
            <input
              type="text"
              value={toolsChosen}
              onChange={(e) => onUpdateField('toolsChosen', e.target.value)}
              placeholder="Geben Sie hier Ihre individuelle Tandem-Kombination ein..."
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 font-medium animate-in fade-in"
            />
          )}
        </div>

        {/* Input Field 2: Größeres Textfeld für Zögerungspunkte */}
        <div className="space-y-2">
          <label className="block text-sm font-extrabold text-slate-900">
            2. Wo mussten Sie beim Erstellen Ihrer eigenen Verfügung am längsten zögern?
          </label>
          <p className="text-xs text-slate-500 font-medium">
            Beschreiben Sie konkrete Passagen oder Bauchentscheidungen (z. B. Künstliche Ernährung bei Demenz, Schmerztherapie vs. Bewusstsein...):
          </p>
          <textarea
            rows={3}
            value={hesitationPoint}
            onChange={(e) => onUpdateField('hesitationPoint', e.target.value)}
            placeholder="Beschreiben Sie hier ausführlich Ihre Zögerungspunkte und Bedenken während des Ausfüllens..."
            className="w-full px-4 py-3.5 rounded-2xl bg-white border border-slate-300 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 font-medium leading-relaxed"
          />
        </div>

        {/* Input Field 3: Eindrücke & Erkenntnisse aus der Erstellung */}
        <div className="space-y-2">
          <label className="block text-sm font-extrabold text-slate-900">
            3. Eindrücke & Erkenntnisse aus der Erstellung:
          </label>
          <p className="text-xs text-slate-600 font-medium">
            Halten Sie hier Ihre Erfahrungen fest (z. B. Übersichtlichkeit der Erstellungshilfen, Verständlichkeit für Laien, fehlende Beratung, Komplexität):
          </p>
          <textarea
            rows={3}
            value={creationInsights}
            onChange={(e) => onUpdateField('creationInsights', e.target.value)}
            placeholder="Fassen Sie hier Ihre Eindrücke und Erkenntnisse zusammen, die Sie bei der Nutzung des Generators / der Textbausteine gewonnen haben..."
            className="w-full px-4 py-3.5 rounded-2xl bg-white border border-slate-300 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 font-medium leading-relaxed"
          />
        </div>

        {/* Input Field 4: Konkrete Klausel für den Stresstest in DS 2 */}
        <div className="space-y-2">
          <label className="block text-sm font-extrabold text-slate-900 flex flex-wrap items-center justify-between gap-2">
            <span>
              4. Konkrete Klausel aus Ihrer erstellten Patientenverfügung (Exemplarischer Satz für DS 2):
            </span>
            <span className="text-xs text-amber-800 font-bold bg-amber-100/80 px-2.5 py-1 rounded-lg border border-amber-300">
              Dient unserem rechtlichen Stresstest in DS 2!
            </span>
          </label>
          <p className="text-xs text-slate-600 font-medium">
            Kopieren oder tippen Sie hier zwingend 1–2 ausformulierte Beispielsätze aus Ihrem Verfügungswortlaut ein (z. B. „Wenn ich mich im Endstadium einer unheilbaren Erkrankung befinde, dann...“):
          </p>
          <textarea
            rows={4}
            value={ownPvSentences}
            onChange={(e) => onUpdateField('ownPvSentences', e.target.value)}
            placeholder="Geben Sie hier Ihre ausformulierte Beispielklausel ein (wird in Doppelstunde 2 dem rechtlichen Stresstest unterzogen)..."
            className="w-full px-4 py-3.5 rounded-2xl bg-white border border-slate-300 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 font-medium leading-relaxed"
          />
        </div>

        {/* Speichern & Export Bar */}
        <SaveExportBar
          filenamePrefix="phase2_stolperstein_protokoll"
          label="Stolperstein-Notizen sichern:"
          exportData={{
            title: 'Phase 2: Selbsterfahrung – Stolperstein-Protokoll',
            subtitle: 'Perspektive Patient:in & Erstellungshilfen im Praxistest',
            sections: [
              {
                heading: '1. Tandem-Werkzeuge & Aufteilung',
                content: toolsChosen || '(Noch keine Eingabe)',
              },
              {
                heading: '2. Längster Zögerungspunkt bei der Erstellung',
                content: hesitationPoint || '(Noch keine Eingabe)',
              },
              {
                heading: '3. Eindrücke & Erkenntnisse aus der Erstellung',
                content: creationInsights || '(Noch keine Eingabe)',
              },
              {
                heading: '4. Konkrete Klausel aus der Verfügung (für Stresstest in DS 2)',
                content: ownPvSentences || '(Noch keine Eingabe)',
              },
            ],
          }}
        />
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-end no-print pt-2">
        <button
          onClick={onNextPhase}
          className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm tracking-wide shadow-xs transition transform active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          <span>Weiter zu Schritt 3: Tandem-Vergleich & Auswertung</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
