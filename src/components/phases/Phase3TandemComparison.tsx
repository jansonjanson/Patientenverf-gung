import React, { useState } from 'react';
import { ArrowRight, Lightbulb, Users } from 'lucide-react';
import { StepTransition } from '../StepTransition';
import { SaveExportBar } from '../SaveExportBar';

interface Phase3TandemComparisonProps {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  onUpdateField: (field: string, value: string) => void;
  onNextPhase: () => void;
}

export const Phase3TandemComparison: React.FC<Phase3TandemComparisonProps> = ({
  q1,
  q2,
  q3,
  q4,
  onUpdateField,
  onNextPhase,
}) => {
  const [showInspirations, setShowInspirations] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Phase Intro Banner */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col items-start gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Doppelstunde 1 • Phase 3
          </span>
          <span className="text-xs font-semibold text-slate-500">
            Dauer: ca. 35 Minuten
          </span>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Phase 3: Systematischer Tandem-Vergleich der Erstellungshilfen
          </h2>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-4xl">
            Vergleichen Sie nun Ihre Ergebnisse im Tandem (Online-Generator von Person A vs. Textbausteine von Person B) direkt anhand der vier Leitfragen und halten Sie Ihre Erkenntnisse fest.
          </p>
        </div>
      </div>

      {/* Transition directly to the 4 Leitfragen */}
      <StepTransition
        stepNumber="1"
        title="Die 4 Leitfragen im Tandem beantworten & sichern"
        hint="Gemeinsamkeiten, Unterschiede, Lücken & Fragen dokumentieren"
        variant="blue"
      />

      {/* The 4 Questions Grid Container */}
      <div className="space-y-6">
        {/* Step Header with Integrated "Didaktische Impulse" Button */}
        <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Schritt 1 • Tandem-Auswertung
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
              Die 4 Leitfragen zur Gegenüberstellung
            </h3>
            <p className="text-sm text-slate-600 mt-1 font-medium">
              Diskutieren Sie zu zweit und halten Sie Ihre Antworten in den vier Eingabefeldern fest:
            </p>
          </div>

          {/* Integrated Didaktische Impulse Button & Tooltip / Explanatory Hint */}
          <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0 bg-amber-50/80 p-3.5 rounded-2xl border border-amber-300">
            <button
              onClick={() => setShowInspirations(!showInspirations)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-2xs active:scale-95 no-print"
            >
              <Lightbulb className="w-4 h-4 text-slate-950" />
              <span>{showInspirations ? 'Didaktische Impulse ausblenden' : 'Didaktische Impulse einblenden'}</span>
            </button>
            <span className="text-2xs text-amber-900 font-semibold max-w-xs text-left md:text-right">
              💡 Blendet exemplarische Leitgedanken und Musterantworten zur Unterstützung ein.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Question 1 */}
          <div className="bg-gradient-to-br from-blue-50/60 via-slate-50/30 to-white border-2 border-blue-200/90 hover:border-blue-300 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4 flex flex-col justify-between transition">
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-base flex items-center justify-center shrink-0 shadow-2xs">
                  1
                </span>
                <h4 className="font-extrabold text-slate-900 text-lg leading-snug">
                  Was gleicht sich? Was überschneidet sich? Was ähnelt sich?
                </h4>
              </div>
              <p className="text-sm text-slate-600 font-medium">
                z. B. Struktur nach Situationen und Maßnahmen, Hinweis auf Vorsorgevollmacht, Palliativversorgung...
              </p>
              {showInspirations && (
                <div className="text-sm text-blue-950 bg-blue-100/70 p-3.5 rounded-xl border border-blue-300 leading-relaxed font-medium animate-in fade-in">
                  💡 <strong className="text-blue-900 font-bold">Gemeinsamkeiten:</strong> Beide trennen die Lebenssituation (Koma, Endstadium) von den medizinischen Maßnahmen; beide betonen Schriftform und Vertretung.
                </div>
              )}
            </div>
            <textarea
              rows={4}
              value={q1}
              onChange={(e) => onUpdateField('comparisonQ1', e.target.value)}
              placeholder="Ihre Beobachtungen zu Gemeinsamkeiten..."
              className="w-full px-4 py-3.5 rounded-2xl bg-white border border-slate-300 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 font-medium mt-2 leading-relaxed"
            />
          </div>

          {/* Question 2 */}
          <div className="bg-gradient-to-br from-indigo-50/60 via-slate-50/30 to-white border-2 border-indigo-200/90 hover:border-indigo-300 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4 flex flex-col justify-between transition">
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black text-base flex items-center justify-center shrink-0 shadow-2xs">
                  2
                </span>
                <h4 className="font-extrabold text-slate-900 text-lg leading-snug">
                  Was ist anders / unterschiedlich?
                </h4>
              </div>
              <p className="text-sm text-slate-600 font-medium">
                z. B. Benutzerführung, didaktische Erklärungen vs. juristischer Gesetzestext, Detailgrad der Optionen...
              </p>
              {showInspirations && (
                <div className="text-sm text-indigo-950 bg-indigo-100/70 p-3.5 rounded-xl border border-indigo-300 leading-relaxed font-medium animate-in fade-in">
                  💡 <strong className="text-indigo-900 font-bold">Unterschiede:</strong> Der Generator führt laienverständlich per Multiple-Choice durch Szenarien; die BMJ-Bausteine erfordern eigenständige juristische Textauswahl.
                </div>
              )}
            </div>
            <textarea
              rows={4}
              value={q2}
              onChange={(e) => onUpdateField('comparisonQ2', e.target.value)}
              placeholder="Ihre Beobachtungen zu Unterschieden..."
              className="w-full px-4 py-3.5 rounded-2xl bg-white border border-slate-300 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 font-medium mt-2 leading-relaxed"
            />
          </div>

          {/* Question 3 */}
          <div className="bg-gradient-to-br from-amber-50/60 via-slate-50/30 to-white border-2 border-amber-200/90 hover:border-amber-300 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4 flex flex-col justify-between transition">
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-amber-600 text-white font-black text-base flex items-center justify-center shrink-0 shadow-2xs">
                  3
                </span>
                <h4 className="font-extrabold text-slate-900 text-lg leading-snug">
                  Was fehlt? Was müsste ergänzt werden?
                </h4>
              </div>
              <p className="text-sm text-slate-600 font-medium">
                z. B. spezifische Krankheitsbilder, konkrete pflegerische Maßnahmen, Beratungshinweis, Notfallkarte...
              </p>
              {showInspirations && (
                <div className="text-sm text-amber-950 bg-amber-100/70 p-3.5 rounded-xl border border-amber-300 leading-relaxed font-medium animate-in fade-in">
                  💡 <strong className="text-amber-900 font-bold">Blinde Flecken:</strong> Was passiert im akuten Notfall vor Ort (Notarzt-Reanimation vor Einsicht in die Verfügung)? Aufbewahrung des Dokuments?
                </div>
              )}
            </div>
            <textarea
              rows={4}
              value={q3}
              onChange={(e) => onUpdateField('comparisonQ3', e.target.value)}
              placeholder="Blinde Flecken & Ergänzungsbedarf..."
              className="w-full px-4 py-3.5 rounded-2xl bg-white border border-slate-300 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 font-medium mt-2 leading-relaxed"
            />
          </div>

          {/* Question 4 */}
          <div className="bg-gradient-to-br from-rose-50/60 via-slate-50/30 to-white border-2 border-rose-200/90 hover:border-rose-300 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4 flex flex-col justify-between transition">
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-rose-600 text-white font-black text-base flex items-center justify-center shrink-0 shadow-2xs">
                  4
                </span>
                <h4 className="font-extrabold text-slate-900 text-lg leading-snug">
                  Welche Fragen ergeben sich für Sie als Nutzer:in?
                </h4>
              </div>
              <p className="text-sm text-slate-600 font-medium">
                z. B. „Was bedeutet ‚unmittelbarer Sterbeprozess‘ genau?“, „Wer legt meine Verfügung im Notfall aus?“
              </p>
              {showInspirations && (
                <div className="text-sm text-rose-950 bg-rose-100/70 p-3.5 rounded-xl border border-rose-300 leading-relaxed font-medium animate-in fade-in">
                  💡 <strong className="text-rose-900 font-bold">Nutzerperspektive:</strong> Kann ich mir heute als gesunder Mensch wirklich vorstellen, was ich im Stadium schwerer Demenz noch empfinde?
                </div>
              )}
            </div>
            <textarea
              rows={4}
              value={q4}
              onChange={(e) => onUpdateField('comparisonQ4', e.target.value)}
              placeholder="Offene Fragen aus Laien- und Nutzerperspektive..."
              className="w-full px-4 py-3.5 rounded-2xl bg-white border border-slate-300 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 font-medium mt-2 leading-relaxed"
            />
          </div>
        </div>

        {/* Speichern & Export Bar for Phase 3 */}
        <SaveExportBar
          filenamePrefix="phase3_tandem_vergleich"
          label="Tandem-Vergleich sichern:"
          exportData={{
            title: 'Phase 3: Tandem-Vergleich der Erstellungshilfen',
            subtitle: 'Online-Generator vs. BMJ-Textbausteine (4 Leitfragen)',
            sections: [
              {
                heading: '1. Gemeinsamkeiten & Überschneidungen',
                content: q1 || '(Noch keine Eingabe)',
              },
              {
                heading: '2. Unterschiede & Benutzerführung',
                content: q2 || '(Noch keine Eingabe)',
              },
              {
                heading: '3. Blinde Flecken & Ergänzungsbedarf',
                content: q3 || '(Noch keine Eingabe)',
              },
              {
                heading: '4. Offene Fragen aus Nutzerperspektive',
                content: q4 || '(Noch keine Eingabe)',
              },
            ],
          }}
        />
      </div>

      {/* Transition to Plenum Stopp */}
      <StepTransition
        stepNumber="2"
        title="Plenum-Auswertung & Wechsel zu Doppelstunde 2"
        hint="Erfahrungen zusammentragen vor dem Start des Rechtsrahmens"
        variant="amber"
      />

      {/* PLENUM STOPP 2 */}
      <div className="bg-amber-50/80 border-2 border-amber-300 rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-5 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 text-xl font-black shrink-0">
            🛑
          </div>
          <div>
            <h4 className="font-extrabold text-amber-900 text-base uppercase tracking-wide">
              Plenum-Stopp 2: Auswertung der Generatoren & Übergang in Doppelstunde 2
            </h4>
            <p className="text-xs sm:text-sm text-amber-800 mt-1 leading-relaxed max-w-2xl font-medium">
              Wir sammeln Ihre Erfahrungen im Kurs: Wie herausfordernd war das Formulieren – und was bedeutet das für Patient:innen und Angehörige ohne medizinisches Fachwissen?
            </p>
          </div>
        </div>

        <button
          onClick={onNextPhase}
          className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm tracking-wide shrink-0 shadow-sm transition transform active:scale-95 flex items-center gap-2 cursor-pointer no-print"
        >
          <span>Start DS 2: Rechtlicher Rahmen</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
