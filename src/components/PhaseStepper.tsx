import React from 'react';
import { Check, Clock, ChevronRight } from 'lucide-react';
import { sounds } from '../utils/audio';

interface PhaseStepperProps {
  currentPhase: number;
  onSelectPhase: (phase: number) => void;
  completedPhases: number[];
  progressPercentage: number;
}

const PHASES = [
  { id: 1, title: '1. Kompass & Video', time: "20'", ds: 1 },
  { id: 2, title: '2. Selbsterfahrung', time: "35'", ds: 1 },
  { id: 3, title: '3. Tandem-Vergleich', time: "35'", ds: 1 },
  { id: 4, title: '4. Recht & Wenn-Dann', time: "35'", ds: 2 },
  { id: 5, title: '5. Eigen-Check', time: "10'", ds: 2 },
  { id: 6, title: '6. Rechts-Konsil (6 Fälle)', time: "45'", ds: 2 },
];

export const PhaseStepper: React.FC<PhaseStepperProps> = ({
  currentPhase,
  onSelectPhase,
  completedPhases,
  progressPercentage,
}) => {
  return (
    <div className="bg-slate-900 border-b border-slate-800 shadow-md no-print sticky top-[57px] z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        {/* Overall progress indicator bar */}
        <div className="flex items-center justify-between text-xs mb-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">180-Minuten Classroom-Ablauf</span>
            <span className="text-[11px] text-slate-500 font-medium">
              (DS 1: 0–90 Min • DS 2: 90–180 Min)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-24 sm:w-36 h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="font-bold text-emerald-400 text-xs w-9 text-right">
              {progressPercentage}%
            </span>
          </div>
        </div>

        {/* Stepper Tabs with horizontal scroll on small devices */}
        <div className="overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center min-w-[760px] gap-2">
            {/* DS 1 Section */}
            <div className="flex items-center gap-1.5 flex-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                DS 1 (90')
              </span>
              {PHASES.filter((p) => p.ds === 1).map((phase) => {
                const isActive = currentPhase === phase.id;
                const isDone = completedPhases.includes(phase.id);

                return (
                  <button
                    key={phase.id}
                    onClick={() => {
                      sounds.playClick();
                      onSelectPhase(phase.id);
                    }}
                    className={`flex-1 flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                        : isDone
                        ? 'bg-slate-800/80 text-emerald-300 hover:bg-slate-800'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                    }`}
                  >
                    <span className="truncate">{phase.title}</span>
                    <span className="flex items-center gap-1 text-[10px] opacity-75 shrink-0 ml-1">
                      {isDone ? <Check className="w-3 h-3 text-emerald-300" /> : phase.time}
                    </span>
                  </button>
                );
              })}
            </div>

            <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />

            {/* DS 2 Section */}
            <div className="flex items-center gap-1.5 flex-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                DS 2 (90')
              </span>
              {PHASES.filter((p) => p.ds === 2).map((phase) => {
                const isActive = currentPhase === phase.id;
                const isDone = completedPhases.includes(phase.id);

                return (
                  <button
                    key={phase.id}
                    onClick={() => {
                      sounds.playClick();
                      onSelectPhase(phase.id);
                    }}
                    className={`flex-1 flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                        : isDone
                        ? 'bg-slate-800/80 text-emerald-300 hover:bg-slate-800'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                    }`}
                  >
                    <span className="truncate">{phase.title}</span>
                    <span className="flex items-center gap-1 text-[10px] opacity-75 shrink-0 ml-1">
                      {isDone ? <Check className="w-3 h-3 text-emerald-300" /> : phase.time}
                    </span>
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
