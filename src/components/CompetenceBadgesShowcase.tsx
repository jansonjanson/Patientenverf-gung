import React from 'react';
import { Award, Lock, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { getCompetenceBadges } from '../utils/legal-learning';
import { ClassroomData } from '../hooks/useClassroomSync';

interface CompetenceBadgesShowcaseProps {
  data: Partial<ClassroomData> | any;
  onSelectPhase?: (phaseId: number) => void;
}

export const CompetenceBadgesShowcase: React.FC<CompetenceBadgesShowcaseProps> = ({
  data,
  onSelectPhase,
}) => {
  const badges = getCompetenceBadges(data);
  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-indigo-400/80 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-800/80 pb-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-emerald-400 p-0.5 shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400">
              <Award className="w-6 h-6 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                Micro-Credentials & Badges
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5 flex items-center gap-2">
              <span>Ihre digitalen Kompetenz-Badges</span>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </h3>
          </div>
        </div>

        {/* Progress Counter Pill */}
        <div className="flex items-center gap-3 bg-indigo-900/80 border border-indigo-400/50 px-4 py-2 rounded-2xl self-start sm:self-auto">
          <span className="text-xs font-bold text-indigo-200">
            Freigeschaltet: <strong className="text-amber-300 font-extrabold">{unlockedCount} / {badges.length}</strong>
          </span>
          <div className="w-20 h-2 bg-indigo-950 rounded-full overflow-hidden border border-indigo-700">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-blue-400 transition-all duration-500"
              style={{ width: `${(unlockedCount / badges.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid of 6 Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge) => {
          return (
            <div
              key={badge.id}
              onClick={() => onSelectPhase && onSelectPhase(badge.phaseId)}
              className={`p-5 rounded-2xl border-2 transition-all relative flex flex-col justify-between space-y-3 ${
                badge.unlocked
                  ? 'bg-gradient-to-br from-indigo-900/80 via-slate-900/90 to-blue-900/80 border-emerald-400/80 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-400/40 cursor-pointer hover:scale-[1.02]'
                  : 'bg-slate-900/50 border-slate-800/80 text-slate-400 opacity-75'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-md ${
                      badge.unlocked
                        ? `bg-gradient-to-br ${badge.color} text-white ring-2 ring-amber-300/60`
                        : 'bg-slate-800 text-slate-500 border border-slate-700'
                    }`}
                  >
                    {badge.icon}
                  </div>
                  <div>
                    <h4
                      className={`text-sm font-extrabold leading-snug ${
                        badge.unlocked ? 'text-white' : 'text-slate-400'
                      }`}
                    >
                      {badge.title}
                    </h4>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider ${
                        badge.unlocked ? 'text-emerald-400' : 'text-slate-500'
                      }`}
                    >
                      {badge.unlocked ? '✓ Freigeschaltet' : '🔒 Noch gesperrt'}
                    </span>
                  </div>
                </div>

                {badge.unlocked ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <Lock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                )}
              </div>

              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                {badge.subtitle}
              </p>

              {onSelectPhase && (
                <div className="flex items-center justify-between pt-2 border-t border-indigo-800/50 text-[11px] font-bold text-indigo-300 hover:text-white transition">
                  <span>Zur Phase {badge.phaseId}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
