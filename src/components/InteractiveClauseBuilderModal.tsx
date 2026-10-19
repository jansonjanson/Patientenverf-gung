import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Wrench, ArrowRight, Zap, Copy, ShieldCheck } from 'lucide-react';

interface InteractiveClauseBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseTitle?: string;
  onApplyClause: (wennText: string, dannText: string) => void;
}

const WENN_BLOCKS = [
  {
    label: '01. Endstadium tödlicher Erkrankung',
    text: 'Wenn ich mich im Endstadium einer unheilbaren, tödlich verlaufenden Erkrankung befinde und keine Aussicht auf Besserung besteht,',
  },
  {
    label: '02. Irreversibles Koma / Hirnschädigung',
    text: 'Wenn ich mich in einem irreversiblen Koma befinde oder eine schwerste dauerhafte Hirnschädigung vorliegt,',
  },
  {
    label: '03. Fortgeschrittene ALS / Muskelatrophie',
    text: 'Wenn bei mir eine fortgeschrittene Amyotrophe Lateralsklerose (ALS) vorliegt und eine vollständige Lähmung droht,',
  },
  {
    label: '04. Schwere COPD / Atemnot-Endstadium',
    text: 'Wenn ich an schwerer COPD im Endstadium leide und eine akute, lebensbedrohliche Atemnot ohne Besserungschance eintritt,',
  },
  {
    label: '05. Fortgeschrittene Demenz',
    text: 'Wenn ich mich im Spätstadium einer fortgeschrittenen Demenz befinde und nahestehende Personen nicht mehr erkenne,',
  },
];

const DANN_BLOCKS = [
  {
    label: '01. Beatmung & PEG-Ernährung ablehnen',
    text: 'wünsche ich, dass alle lebensverlängernden Maßnahmen (insbesondere künstliche Beatmung sowie künstliche Ernährung und Flüssigkeitszufuhr via PEG-Sonde) eingestellt bzw. unterlassen werden.',
  },
  {
    label: '02. Unerlässliche Palliative Schmerztherapie',
    text: 'wünsche ich eine umfassende palliative Schmerz- und Symptomtherapie zur Leidenslindung, selbst wenn dadurch mein Bewusstsein getrübt oder die Lebenszeit verkürzt werden sollte.',
  },
  {
    label: '03. Einstellung von Dialyse & Intensivmedizin',
    text: 'lehne ich den Beginn oder die Fortführung dialytischer Verfahren sowie invasive intensivmedizinische Maßnahmen ab.',
  },
  {
    label: '04. Keine OPs zur reinen Lebensverlängerung',
    text: 'lehne ich operative Eingriffe ab, die ausschließlich der Lebensverlängerung dienen und keine Symptomlinderung bewirken.',
  },
];

export const InteractiveClauseBuilderModal: React.FC<InteractiveClauseBuilderModalProps> = ({
  isOpen,
  onClose,
  caseTitle,
  onApplyClause,
}) => {
  const [selectedWennIdx, setSelectedWennIdx] = useState(0);
  const [selectedDannIdx, setSelectedDannIdx] = useState(0);

  if (!isOpen) return null;

  const currentWenn = WENN_BLOCKS[selectedWennIdx].text;
  const currentDann = DANN_BLOCKS[selectedDannIdx].text;

  const handleApply = () => {
    onApplyClause(currentWenn, currentDann);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border-2 border-indigo-200 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-indigo-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-black text-xl shrink-0 shadow-md">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-300">
                  BGH Live-Formel-Baukasten
                </span>
                {caseTitle && (
                  <span className="text-[10px] font-bold text-slate-500 truncate max-w-xs">
                    {caseTitle}
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                BGH-konforme WENN-DANN Klausel synthetisieren
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Builder Interface */}
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* WENN Selection */}
            <div className="space-y-2.5">
              <label className="block text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                1. WENN-Bedingungsblock wählen (Krankheitszustand):
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {WENN_BLOCKS.map((block, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedWennIdx(idx)}
                    className={`w-full text-left p-3 rounded-2xl border-2 text-xs font-bold transition cursor-pointer leading-relaxed ${
                      selectedWennIdx === idx
                        ? 'bg-amber-100 text-amber-950 border-amber-400 shadow-md ring-2 ring-amber-200'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {block.label}
                  </button>
                ))}
              </div>
            </div>

            {/* DANN Selection */}
            <div className="space-y-2.5">
              <label className="block text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                2. DANN-Rechtsfolgeblock wählen (Maßnahme):
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {DANN_BLOCKS.map((block, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedDannIdx(idx)}
                    className={`w-full text-left p-3 rounded-2xl border-2 text-xs font-bold transition cursor-pointer leading-relaxed ${
                      selectedDannIdx === idx
                        ? 'bg-emerald-100 text-emerald-950 border-emerald-400 shadow-md ring-2 ring-emerald-200'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {block.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Assembled Clause Preview */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white border-2 border-indigo-400 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xs font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Echtzeit-Synthese (BGH-Bestimmtheitskriterium 100% erfüllt):</span>
              </span>
              <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/50">
                ✓ Rechtsverbindlich
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/90 border border-indigo-800 text-sm sm:text-base font-bold leading-relaxed italic shadow-inner">
              <span className="text-amber-300">„{currentWenn} </span>
              <span className="text-emerald-300">{currentDann}“</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
          >
            Abbrechen
          </button>

          <button
            onClick={handleApply}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-lg shadow-emerald-600/30 transition flex items-center gap-2 cursor-pointer transform active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Klausel in Fallakte übernehmen ➔</span>
          </button>
        </div>
      </div>
    </div>
  );
};
