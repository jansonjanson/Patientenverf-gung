import React, { useState } from 'react';
import { ArrowRight, MessageSquare, Lightbulb, CheckCircle2 } from 'lucide-react';
import { sounds } from '../../utils/audio';

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
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Phase Intro Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            Doppelstunde 1 • Schritt 3 (ca. 35 Minuten Vergleich & Blitzlicht)
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Systematischer Vergleich der Erstellungshilfen
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            Vergleichen Sie die beiden Erstellungshilfen (Online-Generator vs. Textbausteine/Formulierungshilfen) miteinander und dokumentieren Sie Ihre Ergebnisse anhand der vier Leitfragen.
          </p>
        </div>

        <button
          onClick={() => {
            sounds.playClick();
            setShowInspirations(!showInspirations);
          }}
          className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-2 transition shrink-0 no-print"
        >
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>{showInspirations ? 'Hinweise ausblenden' : 'Didaktische Impulse anzeigen'}</span>
        </button>
      </div>

      {/* The 4 Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Question 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 font-extrabold text-sm flex items-center justify-center shrink-0 border border-blue-500/30">
                1
              </span>
              <h3 className="font-bold text-white text-base">
                Was gleicht sich? Was überschneidet sich? Was ähnelt sich?
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              z. B. Struktur nach Situationen und Maßnahmen, Hinweis auf Vorsorgevollmacht, Palliativversorgung...
            </p>
            {showInspirations && (
              <div className="text-[11px] text-blue-300 bg-blue-950/40 p-3 rounded-xl border border-blue-500/20 leading-relaxed">
                💡 <em>Gemeinsamkeiten:</em> Beide trennen die Lebenssituation (Koma, Endstadium) von den medizinischen Maßnahmen; beide betonen Schriftform und Vertretung.
              </div>
            )}
          </div>
          <textarea
            rows={4}
            value={q1}
            onChange={(e) => onUpdateField('comparisonQ1', e.target.value)}
            placeholder="Ihre Beobachtungen zu Gemeinsamkeiten..."
            className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
          />
        </div>

        {/* Question 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 font-extrabold text-sm flex items-center justify-center shrink-0 border border-indigo-500/30">
                2
              </span>
              <h3 className="font-bold text-white text-base">
                Was ist anders / unterschiedlich?
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              z. B. Benutzerführung, didaktische Erklärungen vs. juristischer Gesetzestext, Detailgrad der Optionen...
            </p>
            {showInspirations && (
              <div className="text-[11px] text-indigo-300 bg-indigo-950/40 p-3 rounded-xl border border-indigo-500/20 leading-relaxed">
                💡 <em>Unterschiede:</em> Der Generator führt laienverständlich per Multiple-Choice durch Szenarien; die BMJ-Bausteine erfordern präzise juristische Textauswahl und juristische Selbstreflexion.
              </div>
            )}
          </div>
          <textarea
            rows={4}
            value={q2}
            onChange={(e) => onUpdateField('comparisonQ2', e.target.value)}
            placeholder="Ihre Beobachtungen zu Unterschieden..."
            className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
          />
        </div>

        {/* Question 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 font-extrabold text-sm flex items-center justify-center shrink-0 border border-amber-500/30">
                3
              </span>
              <h3 className="font-bold text-white text-base">
                Was fehlt? Was müsste ergänzt werden?
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              z. B. spezifische Krankheitsbilder, konkrete pflegerische Maßnahmen, Beratungshinweis, Notfallkarte...
            </p>
            {showInspirations && (
              <div className="text-[11px] text-amber-300 bg-amber-950/40 p-3 rounded-xl border border-amber-500/20 leading-relaxed">
                💡 <em>Blinde Flecken:</em> Was passiert im akuten Notfall vor Ort (Notarzt-Reanimation vor Einsicht in die Verfügung)? Aufbewahrung des Dokuments?
              </div>
            )}
          </div>
          <textarea
            rows={4}
            value={q3}
            onChange={(e) => onUpdateField('comparisonQ3', e.target.value)}
            placeholder="Blinde Flecken & Ergänzungsbedarf..."
            className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
          />
        </div>

        {/* Question 4 */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 font-extrabold text-sm flex items-center justify-center shrink-0 border border-rose-500/30">
                4
              </span>
              <h3 className="font-bold text-white text-base">
                Welche Fragen ergeben sich für Sie als Nutzer:in?
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              z. B. „Was bedeutet ‚unmittelbarer Sterbeprozess‘ genau?“, „Wer legt meine Verfügung im Notfall aus?“
            </p>
            {showInspirations && (
              <div className="text-[11px] text-rose-300 bg-rose-950/40 p-3 rounded-xl border border-rose-500/20 leading-relaxed">
                💡 <em>Nutzerperspektive:</em> Kann ich mir heute als gesunder Mensch wirklich vorstellen, was ich im Stadium schwerer Demenz noch empfinde?
              </div>
            )}
          </div>
          <textarea
            rows={4}
            value={q4}
            onChange={(e) => onUpdateField('comparisonQ4', e.target.value)}
            placeholder="Offene Fragen aus Laien- und Nutzerperspektive..."
            className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
          />
        </div>
      </div>

      {/* PLENUM STOPP 2 */}
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/40 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-5 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 text-xl font-black shrink-0">
            🛑
          </div>
          <div>
            <h4 className="font-extrabold text-amber-300 text-base uppercase tracking-wide">
              Plenum-Stopp 2: Auswertung der Generatoren & Übergang in Doppelstunde 2
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed max-w-2xl">
              Wir sammeln Ihre Erfahrungen im Kurs: Wie herausfordernd war das Formulieren – und was bedeutet das für Patient:innen und Angehörige ohne medizinisches Fachwissen?
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sounds.playClick();
            onNextPhase();
          }}
          className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide shrink-0 shadow-lg shadow-amber-900/30 transition transform active:scale-95 flex items-center gap-2 cursor-pointer no-print"
        >
          <span>Start DS 2: Rechtlicher Rahmen</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
