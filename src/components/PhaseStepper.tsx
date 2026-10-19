import React from 'react';
import { Check, ChevronRight, CheckCircle2 } from 'lucide-react';

interface PhaseStepperProps {
  currentPhase: number;
  onSelectPhase: (phase: number) => void;
  completedPhases: number[];
  progressPercentage: number;
}

const PHASES = [
  { id: 1, title: '1. Arten & Video', ds: 1 },
  { id: 2, title: '2. Selbsterfahrung', ds: 1 },
  { id: 3, title: '3. Tandem-Vergleich', ds: 1 },
  { id: 4, title: '4. Recht & Wenn-Dann', ds: 2 },
  { id: 5, title: '5. Eigen-Check', ds: 2 },
  { id: 6, title: '6. Rechts-Konsil', ds: 2 },
];

export const PhaseStepper: React.FC<PhaseStepperProps> = ({
  currentPhase,
  onSelectPhase,
  completedPhases,
  progressPercentage,
}) => {
  return (
    <div className="bg-white border-b border-slate-200 shadow-xs no-print sticky top-[57px] z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        {/* Overall progress indicator bar */}
        <div className="flex items-center justify-between text-xs mb-2">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900">Classroom-Lernpfad Fortschritt</span>
            <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
              (DS 1: Reiter 1–3 • DS 2: Reiter 4–6)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-28 sm:w-44 h-2.5 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-blue-600 to-emerald-500 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="font-black text-emerald-800 text-xs w-10 text-right bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-md">
              {progressPercentage}%
            </span>
          </div>
        </div>

        {/* Stepper Tabs with horizontal scroll on small devices */}
        <div className="overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
          <div className="flex items-center min-w-[780px] gap-2.5">
            {/* DS 1 Section */}
            <div className="flex items-center gap-1.5 flex-1 bg-slate-50/90 p-1.5 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-xl bg-blue-100 text-blue-900 border border-blue-300 shrink-0 shadow-2xs">
                DS 1
              </span>
              {PHASES.filter((p) => p.ds === 1).map((phase) => {
                const isActive = currentPhase === phase.id;
                const isDone = completedPhases.includes(phase.id);

                return (
                  <button
                    key={phase.id}
                    onClick={() => onSelectPhase(phase.id)}
                    className={`flex-1 flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                      isActive && isDone
                        ? 'bg-emerald-600 text-white shadow-md border-2 border-emerald-400 ring-2 ring-emerald-200'
                        : isActive
                        ? 'bg-blue-600 text-white shadow-md border-2 border-blue-400 ring-2 ring-blue-200'
                        : isDone
                        ? 'bg-emerald-50/90 text-emerald-950 border-2 border-emerald-300 hover:bg-emerald-100/90 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white border border-transparent font-bold'
                    }`}
                  >
                    <span className="truncate">{phase.title}</span>
                    {isDone ? (
                      <span className="flex items-center shrink-0 ml-1 bg-emerald-200/80 text-emerald-900 p-0.5 rounded-full">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-emerald-700'}`} />
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />

            {/* DS 2 Section */}
            <div className="flex items-center gap-1.5 flex-1 bg-slate-50/90 p-1.5 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-xl bg-indigo-100 text-indigo-900 border border-indigo-300 shrink-0 shadow-2xs">
                DS 2
              </span>
              {PHASES.filter((p) => p.ds === 2).map((phase) => {
                const isActive = currentPhase === phase.id;
                const isDone = completedPhases.includes(phase.id);

                return (
                  <button
                    key={phase.id}
                    onClick={() => onSelectPhase(phase.id)}
                    className={`flex-1 flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                      isActive && isDone
                        ? 'bg-emerald-600 text-white shadow-md border-2 border-emerald-400 ring-2 ring-emerald-200'
                        : isActive
                        ? 'bg-blue-600 text-white shadow-md border-2 border-blue-400 ring-2 ring-blue-200'
                        : isDone
                        ? 'bg-emerald-50/90 text-emerald-950 border-2 border-emerald-300 hover:bg-emerald-100/90 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white border border-transparent font-bold'
                    }`}
                  >
                    <span className="truncate">{phase.title}</span>
                    {isDone ? (
                      <span className="flex items-center shrink-0 ml-1 bg-emerald-200/80 text-emerald-900 p-0.5 rounded-full">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-emerald-700'}`} />
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
