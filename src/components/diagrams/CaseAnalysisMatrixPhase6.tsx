import React from 'react';
import { AlertCircle, CheckCircle2, ChevronRight, Stethoscope, ArrowRight } from 'lucide-react';

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
      flawTag: 'WENN & DANN vage',
      coreFlaw: 'Kein Krankheitszustand & keine konkrete medizinische Maßnahme genannt.',
    },
    {
      id: 2,
      title: 'Fall 2: „Nicht leiden“',
      flawTag: 'Subjektiv unbestimmt',
      coreFlaw: '„Leiden“ ist interpretationsbedürftig; palliative Schmerzlinderung fehlt.',
    },
    {
      id: 3,
      title: 'Fall 3: „Keine Lebensverlängerung“',
      flawTag: 'Maßnahmen unbestimmt',
      coreFlaw: 'Wann genau? Welche Eingriffe (Beatmung/Dialyse/PEG) gemeint sind, fehlt.',
    },
    {
      id: 4,
      title: 'Fall 4: „Familie soll entscheiden“',
      flawTag: 'Fehlende Vertretungsmacht',
      coreFlaw: 'Keine Vorsorgevollmacht; Angehörige haben per se kein automatisches Entscheidungsrecht.',
    },
    {
      id: 5,
      title: 'Fall 5: „Keine Schläuche“',
      flawTag: 'Umgangssprachlich',
      coreFlaw: 'Floskel ohne rechtliche Subsumtion; meint meist Intubation, Venenkatheter oder PEG.',
    },
    {
      id: 6,
      title: 'Fall 6: „Künstliche Ernährung“',
      flawTag: 'Abgrenzung Palliativpflege',
      coreFlaw: 'Verbot von PEG muss mit Erhalt von Mundpflege und oraler Flüssigkeit abgestimmt sein.',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
            <Stethoscope className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Didaktisches Schaubild: Diagnosematrix aller 6 Problemklauseln
            </h4>
            <p className="text-xs text-slate-500">
              Systematische Fehler-Analyse & Transformation in bindende WENN-DANN-Formulierungen
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
          Klicken Sie auf einen Fall zum direkten Wechsel
        </span>
      </div>

      {/* Grid of 6 Cases */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
        {casesSummary.map((c, idx) => {
          const isSelected = currentCaseIndex === idx;
          const isSolved = !!caseProgress[idx];
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelectCase(idx)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/80 shadow ring-2 ring-blue-200'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-slate-700">Fall {c.id}</span>
                {isSolved ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-300" />
                )}
              </div>
              <p className="text-[11px] font-bold text-slate-900 truncate">{c.title.replace(/Fall \d: /, '')}</p>
              <span className="text-[9px] font-semibold text-rose-700 bg-rose-50 px-1 py-0.5 rounded mt-1 block truncate">
                {c.flawTag}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Case Diagnostic Highlight */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
            {currentCaseIndex + 1}
          </div>
          <div>
            <span className="font-bold text-slate-900 block">
              {casesSummary[currentCaseIndex].title} – Juristischer Hauptmangel:
            </span>
            <p className="text-slate-600 mt-0.5">
              {casesSummary[currentCaseIndex].coreFlaw}
            </p>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-1.5 text-blue-700 font-semibold text-xs bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
          <span>WENN-DANN reparieren</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
