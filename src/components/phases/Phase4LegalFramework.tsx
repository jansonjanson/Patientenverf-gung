import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, ShieldAlert, Activity, ShieldCheck, Sparkles, Zap, ArrowRightCircle } from 'lucide-react';
import { LegalChecklistFlowPhase4 } from '../diagrams/LegalChecklistFlowPhase4';
import { StepTransition } from '../StepTransition';

interface Phase4LegalFrameworkProps {
  onNextPhase: () => void;
}

const WENN_EXAMPLES = [
  'Endstadium einer unheilbaren, tödlich verlaufenden Erkrankung',
  'irreversibles Koma ohne Aussicht auf Wiedererlangung des Bewusstseins',
  'fortgeschrittener Hirnabbauprozess (z. B. schwere Demenz)',
];

const DANN_EXAMPLES = [
  'lehne ich alle lebensverlängernden Maßnahmen wie künstliche Beatmung und Ernährung (PEG) ab',
  'wünsche ich die Einstellung dialytischer Behandlungen',
  'fordere ich eine umfassende palliative Schmerz- und Symptomtherapie',
];

export const Phase4LegalFramework: React.FC<Phase4LegalFrameworkProps> = ({ onNextPhase }) => {
  const [selectedWennIdx, setSelectedWennIdx] = useState(0);
  const [selectedDannIdx, setSelectedDannIdx] = useState(0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Phase Intro Banner */}
      <div className="bg-gradient-to-br from-amber-50/90 via-indigo-50/30 to-slate-50 border-2 border-amber-300/90 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col items-start gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
            Doppelstunde 2 • Phase 4
          </span>
          <span className="text-xs font-semibold text-slate-500">
            Dauer: ca. 35 Minuten
          </span>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Phase 4: Rechtlicher Rahmen – Die 6 Voraussetzungen & WENN-DANN-Formel
          </h2>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-4xl">
            Wann ist eine Patientenverfügung für Ärzt:innen und Pflegeteams rechtlich bindend – und wann scheitert sie in der Praxis an mangelnder Bestimmtheit? Nachfolgend finden Sie die Kernkriterien nach Großkopf & Klein sowie die höchstrichterliche Rechtsprechung (BGH).
          </p>
        </div>
      </div>

      {/* Transition to Step 1 */}
      <StepTransition
        stepNumber="1"
        title="Die 6 Wirksamkeitsvoraussetzungen studieren"
        hint="Gesetzliche Kriterien nach § 1827 BGB (ehem. § 1901a BGB)"
        variant="blue"
      />

      {/* KAPITEL 02: DIE 6 VORAUSSETZUNGEN EINER BINDENDEN PATIENTENVERFÜGUNG */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Schritt 1 • Foliensatz & Kriterien-Prüfung
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Die 6 Voraussetzungen einer bindenden Patientenverfügung
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Quelle: Großkopf & Klein (2019a, 2019b)
          </span>
        </div>

        {/* Didaktisches Schaubild: Die 6 Voraussetzungen nach Großkopf & Klein */}
        <LegalChecklistFlowPhase4 />
      </div>

      {/* Transition to Step 2 */}
      <StepTransition
        stepNumber="2"
        title="Die WENN-DANN-Formel als verbindlichen Prozess verstehen"
        hint="Juristische WENN-DANN-Logik: Behandlungszustand ➔ Rechtsfolge"
        variant="amber"
      />

      {/* KAPITEL 03: INTERAKTIVER WENN - DANN PROZESS / FLOW */}
      <div className="bg-white border-2 border-blue-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Schritt 2 • Interaktiver BGH-Formel-Flow
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Die juristische WENN – DANN – Prozessformel
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">BGH XII ZB 61/16 • Bestimmtheitsgebot</span>
        </div>

        {/* VISUAL PROCESS FLOW CONTAINER WITH PULSING EFFECT */}
        <div className="relative bg-slate-50/80 rounded-3xl p-6 border-2 border-slate-200 shadow-inner">
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center">
            
            {/* WENN-BOX (PROZESS-SCHRITT 1) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white rounded-3xl p-6 sm:p-7 shadow-xl shadow-amber-500/20 border-2 border-amber-300 space-y-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl group-hover:scale-125 transition duration-500"></div>
              
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-amber-300/30 text-amber-100 font-black text-xs uppercase tracking-wider border border-amber-200/40">
                  1. WENN-Glied (Bedingung)
                </span>
                <Activity className="w-6 h-6 text-amber-200" />
              </div>

              <div>
                <h4 className="text-2xl font-black text-white">
                  Bestimmter Behandlungszustand
                </h4>
                <p className="text-xs sm:text-sm text-amber-100 mt-1 font-medium leading-relaxed">
                  Muss ein <strong>konkretes behandlungsbedürftiges Krankheitsbild</strong> bzw. eine eindeutig beschriebene Lebens- und Sterbesituation bezeichnen.
                </p>
              </div>

              <div className="pt-3 border-t border-amber-400/50 space-y-1.5 text-xs text-amber-50">
                <div className="font-bold text-amber-200">Präzisions-Kriterien nach BGH:</div>
                <ul className="list-disc list-inside space-y-1">
                  <li>Unheilbares Endstadium einer Erkrankung</li>
                  <li>Irreversibles Koma ohne Aufwachchance</li>
                  <li>Fortgeschrittene Demenz/Hirnschädigung</li>
                </ul>
              </div>
            </div>

            {/* PULSING FLOW CONNECTOR (PFEIL MIT PULS-EFFEKT) */}
            <div className="lg:col-span-1 flex flex-col items-center justify-center my-2 lg:my-0 gap-2">
              {/* Pulsing Glowing Circle Icon */}
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-2xl bg-blue-500 animate-ping opacity-30"></div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/40 border-2 border-white relative z-10 animate-pulse">
                  <Zap className="w-6 h-6 fill-white text-white" />
                </div>
              </div>

              {/* Pulsing Connector Label & Beam */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-900 bg-blue-100 px-2 py-0.5 rounded-full border border-blue-300 shadow-2xs whitespace-nowrap">
                  Löst aus ➔
                </span>
                <div className="w-1 lg:w-full h-8 lg:h-1.5 bg-gradient-to-b lg:bg-gradient-to-r from-amber-400 via-blue-500 to-emerald-500 rounded-full my-1 animate-pulse"></div>
              </div>
            </div>

            {/* DANN-BOX (PROZESS-SCHRITT 2) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white rounded-3xl p-6 sm:p-7 shadow-xl shadow-emerald-600/20 border-2 border-emerald-300 space-y-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl group-hover:scale-125 transition duration-500"></div>
              
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-300/30 text-emerald-100 font-black text-xs uppercase tracking-wider border border-emerald-200/40">
                  2. DANN-Glied (Rechtsfolge)
                </span>
                <ShieldCheck className="w-6 h-6 text-emerald-200" />
              </div>

              <div>
                <h4 className="text-2xl font-black text-white">
                  Konkrete Maßnahme / Unterlassen
                </h4>
                <p className="text-xs sm:text-sm text-emerald-100 mt-1 font-medium leading-relaxed">
                  Erklärt die <strong>Einwilligung oder Nichteinwilligung</strong> in gezielte ärztliche und pflegerische Heileingriffe.
                </p>
              </div>

              <div className="pt-3 border-t border-emerald-500/50 space-y-1.5 text-xs text-emerald-50">
                <div className="font-bold text-emerald-200">Präzisions-Kriterien nach BGH:</div>
                <ul className="list-disc list-inside space-y-1">
                  <li>Ablehnung künstlicher Beatmung/Ernährung (PEG)</li>
                  <li>Verzicht auf Wiederbelebung (DNR) / Dialyse</li>
                  <li>Gezielte Schmerz- und Symptomlinderung</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* INTERAKTIVE CLAUSE SYNTHESIZER PREVIEW - OPTIMIZED BRIGHT COLOR THEME */}
        <div className="bg-gradient-to-br from-indigo-900 via-slate-800 to-blue-900 text-white rounded-3xl p-6 space-y-5 border-2 border-indigo-400 shadow-lg">
          <div className="flex items-center justify-between border-b border-indigo-400/40 pb-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Interaktive WENN-DANN Satzkombination erproben</span>
            </div>
            <span className="text-xs text-indigo-200 font-semibold hidden sm:inline">
              Klicken Sie auf ein Beispiel, um die BGH-Klausel live zu bilden
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            {/* WENN Selection */}
            <div className="space-y-2.5">
              <div className="font-extrabold text-amber-300 flex items-center gap-1.5">
                <span>1. WENN-Szenario wählen:</span>
              </div>
              <div className="space-y-2">
                {WENN_EXAMPLES.map((ex, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedWennIdx(i)}
                    className={`w-full text-left p-3 rounded-2xl border-2 text-xs sm:text-sm transition cursor-pointer leading-relaxed ${
                      selectedWennIdx === i
                        ? 'bg-amber-400 text-slate-950 font-black border-amber-300 shadow-md ring-2 ring-amber-200'
                        : 'bg-indigo-950/70 text-slate-200 border-indigo-800 hover:bg-indigo-900 hover:border-indigo-600'
                    }`}
                  >
                    WENN {ex}...
                  </button>
                ))}
              </div>
            </div>

            {/* DANN Selection */}
            <div className="space-y-2.5">
              <div className="font-extrabold text-emerald-300 flex items-center gap-1.5">
                <span>2. DANN-Maßnahme wählen:</span>
              </div>
              <div className="space-y-2">
                {DANN_EXAMPLES.map((ex, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedDannIdx(i)}
                    className={`w-full text-left p-3 rounded-2xl border-2 text-xs sm:text-sm transition cursor-pointer leading-relaxed ${
                      selectedDannIdx === i
                        ? 'bg-emerald-400 text-slate-950 font-black border-emerald-300 shadow-md ring-2 ring-emerald-200'
                        : 'bg-indigo-950/70 text-slate-200 border-indigo-800 hover:bg-indigo-900 hover:border-indigo-600'
                    }`}
                  >
                    ...DANN {ex}.
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Assembled Result */}
          <div className="p-5 rounded-2xl bg-indigo-950/90 border-2 border-amber-400/80 text-sm sm:text-base leading-relaxed font-bold shadow-inner">
            <span className="text-xs uppercase tracking-wider text-amber-300 font-extrabold block mb-1.5">
              Daraus resultierende BGH-konforme Gesamtklausel:
            </span>
            <span className="text-amber-300">„Wenn ich mich im </span>
            <span className="text-amber-100 underline decoration-amber-400 underline-offset-4">{WENN_EXAMPLES[selectedWennIdx]}</span>
            <span className="text-amber-300"> befinde, </span>
            <span className="text-emerald-300">dann </span>
            <span className="text-emerald-100 underline decoration-emerald-400 underline-offset-4">{DANN_EXAMPLES[selectedDannIdx]}</span>
            <span className="text-emerald-300">.“</span>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-end no-print pt-2">
        <button
          onClick={onNextPhase}
          className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-400/40 border-2 border-amber-300 animate-pulse flex items-center gap-2.5 cursor-pointer transform active:scale-95 transition"
        >
          <span>✓ Phase 4 als erledigt markieren & weiter zu Phase 5 ➔</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
