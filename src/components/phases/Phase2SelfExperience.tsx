import React from 'react';
import { ExternalLink, HeartHandshake, ArrowRight, Save, HelpCircle, FileText, Globe } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface Phase2SelfExperienceProps {
  toolsChosen: string;
  hesitationPoint: string;
  ownPvSentences: string;
  onUpdateField: (field: string, value: string) => void;
  onNextPhase: () => void;
}

export const Phase2SelfExperience: React.FC<Phase2SelfExperienceProps> = ({
  toolsChosen,
  hesitationPoint,
  ownPvSentences,
  onUpdateField,
  onNextPhase,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Phase Intro Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            Doppelstunde 1 • Schritt 2 (ca. 35 Minuten Einzelarbeit)
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Selbsterfahrung: Eine eigene Patientenverfügung erstellen
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            Versetzen Sie sich in die Lage von Patient:innen und Ratsuchenden: Erproben Sie die bestehenden Erstellungshilfen (Online-Generatoren und Textbausteine) und fertigen Sie eine Patientenverfügung für sich selbst an.
          </p>
        </div>

        <div className="bg-emerald-950/40 p-4 sm:p-5 rounded-2xl border border-emerald-500/30 shrink-0 text-xs text-emerald-200 max-w-sm w-full">
          <div className="flex items-center gap-2 font-bold text-emerald-300 mb-1.5">
            <HeartHandshake className="w-4 h-4 text-emerald-400" />
            Didaktischer Hinweis:
          </div>
          <p className="leading-relaxed">
            Falls Ihnen das Verfügen über das eigene Sterben heute emotional zu nah geht, dürfen Sie die Verfügung alternativ für Ihr <strong>80-jähriges Ich</strong> erstellen.
          </p>
        </div>
      </div>

      {/* Tool Selection Cards (The 3 Sources) */}
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-400" />
          Wählen Sie zwei Erstellungshilfen aus (oder teilen Sie sich im Tandem auf: Person A = Online-Generator, Person B = Textbausteine):
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Tool 1: Verbraucherzentrale */}
          <div className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-3xl p-6 shadow-xl transition flex flex-col justify-between group">
            <div className="space-y-3">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Typ A: Interaktiver Online-Generator
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition">
                1. Verbraucherzentrale („Selbstbestimmt“)
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Schritt-für-Schritt-Generator mit Erklärtexten, Hinweisen zur Tragweite einzelner Entscheidungen und Reflexionsfragen zu persönlichen Wertvorstellungen.
              </p>
            </div>

            <a
              href="https://www.vzhh.de/themen/online-service/kostenlos-patientenverfuegung-erstellen"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold text-center flex items-center justify-center gap-2 shadow-md shadow-blue-900/30 transition transform active:scale-95 no-print"
            >
              <span>Generator öffnen</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Tool 2: Bundesministerium der Justiz (BMJ) */}
          <div className="bg-slate-900 border border-slate-800 hover:border-purple-500/50 rounded-3xl p-6 shadow-xl transition flex flex-col justify-between group">
            <div className="space-y-3">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Typ B: Textbausteine & Formulierungshilfen
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition">
                2. Bundesministerium der Justiz (BMJ)
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Die offiziellen juristischen Textbausteine und Formulierungshilfen des Bundesministeriums (PDF-Dokument zum Auswählen, Streichen und Ergänzen).
              </p>
            </div>

            <a
              href="https://www.bmj.de/SharedDocs/Downloads/DE/Formular/Patientenverfuegung_Textbausteine_pdf.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold text-center flex items-center justify-center gap-2 shadow-md shadow-purple-900/30 transition transform active:scale-95 no-print"
            >
              <span>BMJ-Textbausteine (PDF)</span>
              <FileText className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Tool 3: Esslinger Initiative */}
          <div className="bg-slate-900 border border-slate-800 hover:border-teal-500/50 rounded-3xl p-6 shadow-xl transition flex flex-col justify-between group">
            <div className="space-y-3">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">
                Typ A/B: Formulargenerator & Bausteine
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-teal-300 transition">
                3. Esslinger Initiative e.V.
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Kompakter Formulargenerator mit Auswahlkästchen zu Behandlungssituationen („Wenn...“) und konkreten Bestimmungen („Dann...“).
              </p>
            </div>

            <a
              href="https://www.esslinger-initiative.de/index.php/formulargenerator"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold text-center flex items-center justify-center gap-2 shadow-md shadow-teal-900/30 transition transform active:scale-95 no-print"
            >
              <span>Esslinger Generator öffnen</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Begleitendes Stolperstein-Protokoll */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Begleit-Notizen während der Erstellung
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
            Ihr persönliches „Stolperstein-Protokoll“ (Perspektive Patient:in)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Halten Sie schon beim Ausfüllen fest, was Ihnen auffällt. Ihre Notizen werden automatisch mit dem Classroom synchronisiert.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">
              Welche beiden Hilfen/Generatoren haben Sie (bzw. Ihr Tandem) ausgewählt?
            </label>
            <input
              type="text"
              value={toolsChosen}
              onChange={(e) => onUpdateField('toolsChosen', e.target.value)}
              placeholder="z. B. Verbraucherzentrale & BMJ-Textbausteine"
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">
              Wo mussten Sie beim Erstellen Ihrer eigenen Verfügung am längsten zögern?
            </label>
            <input
              type="text"
              value={hesitationPoint}
              onChange={(e) => onUpdateField('hesitationPoint', e.target.value)}
              placeholder="z. B. Entscheidung über künstliche Ernährung bei Demenz, Dialyse..."
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-300 flex items-center justify-between">
            <span>
              Notieren Sie hier exemplarisch 1–2 zentrale Sätze aus Ihrer soeben erstellten Patientenverfügung:
            </span>
            <span className="text-[11px] text-amber-400 font-semibold">
              (Dient unserem rechtlichen Stresstest in DS 2!)
            </span>
          </label>
          <textarea
            rows={3}
            value={ownPvSentences}
            onChange={(e) => onUpdateField('ownPvSentences', e.target.value)}
            placeholder="Kopieren oder tippen Sie hier einen relevanten Abschnitt aus Ihrer erstellten Verfügung hinein (z. B. eine Behandlungssituation und die gewünschte Maßnahme)..."
            className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-end no-print">
        <button
          onClick={() => {
            sounds.playClick();
            onNextPhase();
          }}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-blue-900/40 transition transform active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          <span>Weiter zu Schritt 3: Vergleich & Auswertung</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
