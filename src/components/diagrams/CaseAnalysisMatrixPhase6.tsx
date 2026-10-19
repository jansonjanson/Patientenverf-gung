import React from 'react';
import { CheckCircle2, ChevronRight, Scale, ArrowRight, Zap, AlertTriangle } from 'lucide-react';

interface CaseAnalysisMatrixPhase6Props {
  currentCaseIndex: number;
  onSelectCase: (index: number) => void;
  caseProgress: Record<number, boolean>;
}

export const CaseAnalysisMatrixPhase6: React.FC<CaseAnalysisMatrixPhase6Props> = ({
  currentCaseIndex,
  onSelectCase,
  caseProgress,
}) => {
  const casesSummary = [
    {
      id: 1,
      title: 'Fall 1: „Würdevoll sterben“',
      flawTag: 'WENN & DANN unbestimmt',
      coreFlaw: 'Sowohl der Krankheitszustand als auch die medizinische Maßnahme sind völlig unbestimmt.',
    },
    {
      id: 2,
      title: 'Fall 2: „Nicht leiden“',
      flawTag: 'WENN & DANN unbestimmt',
      coreFlaw: '„Leiden“ ist subjektiv vage; konkrete Festlegung palliativer Symptomlinderung fehlt.',
    },
    {
      id: 3,
      title: 'Fall 3: „Keine Lebensverlängerung“',
      flawTag: 'DANN unbestimmt',
      coreFlaw: 'Spezifische Heileingriffe (Beatmung/PEG/Dialyse/Reanimation) sind nicht einzeln benannt.',
    },
    {
      id: 4,
      title: 'Fall 4: „Familie entscheidet“',
      flawTag: 'WENN & DANN unbestimmt',
      coreFlaw: 'Fehlende inhaltliche medizinische Festlegung; Angehörige haben per se kein automatisches Recht.',
    },
    {
      id: 5,
      title: 'Fall 5: „Keine Schläuche“',
      flawTag: 'DANN unbestimmt',
      coreFlaw: 'Umgangssprachliche Floskel; unterscheidet nicht zwischen Infusion, PEG, Katheter oder Beatmung.',
    },
    {
      id: 6,
      title: 'Fall 6: „Künstliche Ernährung“',
      flawTag: 'DANN abgrenzungsbedürftig',
      coreFlaw: 'PEG-Sonde muss von allgemeiner Mundpflege und oraler Flüssigkeit getrennt werden.',
    },
  ];

  const solvedCount = Object.values(caseProgress).filter(Boolean).length;
  const nextUnsolvedIndex = casesSummary.findIndex((_, idx) => !caseProgress[idx]);

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200/90 p-5 md:p-7 shadow-xs mb-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 border border-indigo-300 flex items-center justify-center text-indigo-700 shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-lg font-black text-slate-900">
              Didaktische Diagnosematrix: Die 6 Praxisfälle im Rechts-Konsil
            </h4>
            <p className="text-xs text-slate-600 font-medium">
              Wählen Sie nacheinander alle 6 Praxisfälle aus, begründen Sie den Mangel und formulieren Sie eine BGH-konforme Lösung.
            </p>
          </div>
        </div>

        {/* Progress Counter */}
        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 px-3.5 py-1.5 rounded-full self-start sm:self-auto">
          <span className="text-xs font-bold text-indigo-900">
            Geprüft: {solvedCount} / 6 Fälle
          </span>
          <div className="w-16 h-2 bg-indigo-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${(solvedCount / 6) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid of 6 Cases with Interactive Pulse & Arrows */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {casesSummary.map((c, idx) => {
          const isSelected = currentCaseIndex === idx;
          const isSolved = !!caseProgress[idx];
          const isNextTarget = idx === nextUnsolvedIndex;

          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelectCase(idx)}
              className={`p-3 rounded-2xl border-2 text-left transition-all relative group cursor-pointer ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50 shadow-md ring-2 ring-indigo-200 scale-[1.02]'
                  : isNextTarget
                  ? 'border-amber-400 bg-amber-50/80 shadow-xs animate-pulse ring-2 ring-amber-300'
                  : isSolved
                  ? 'border-emerald-300 bg-emerald-50/50 hover:border-emerald-400'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`w-6 h-6 rounded-xl flex items-center justify-center text-xs font-black ${
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : isSolved
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-200'
                  }`}
                >
                  {c.id}
                </span>

                {isSolved ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : isNextTarget ? (
                  <span className="text-[10px] font-black uppercase text-amber-900 bg-amber-200 px-1.5 py-0.5 rounded">
                    Hier!
                  </span>
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
                )}
              </div>

              <p className="text-xs font-black text-slate-900 truncate">
                Fall {c.id}
              </p>
              <span className="text-[10px] font-bold text-slate-600 block truncate mt-0.5">
                {c.title.replace(/Fall \d: /, '')}
              </span>

              <span
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded mt-1.5 inline-block truncate ${
                  isSolved
                    ? 'text-emerald-800 bg-emerald-100'
                    : 'text-rose-800 bg-rose-100/80'
                }`}
              >
                {c.flawTag}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Case Diagnostic Highlight Box */}
      <div className="bg-gradient-to-r from-indigo-50/90 via-slate-50 to-blue-50/90 border-2 border-indigo-200 rounded-2xl p-4 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shrink-0">
            {currentCaseIndex + 1}
          </div>
          <div>
            <span className="font-extrabold text-indigo-950 block text-xs uppercase tracking-wider">
              {casesSummary[currentCaseIndex].title} – Juristisches Fehlerbild:
            </span>
            <p className="text-slate-800 mt-1 font-medium leading-relaxed">
              {casesSummary[currentCaseIndex].coreFlaw}
            </p>
          </div>
        </div>

        <button
          onClick={() => onSelectCase(currentCaseIndex)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-2xs transition active:scale-95 cursor-pointer self-end sm:self-center"
        >
          <span>Fallakte {currentCaseIndex + 1} bearbeiten</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
