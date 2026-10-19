import React, { useState } from 'react';
import { Activity, ShieldCheck, AlertCircle, Clock, CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';

interface StressTestFlowPhase5Props {
  hasCustomClause: boolean;
  checkedCount: number;
  totalChecks: number;
}

export const StressTestFlowPhase5: React.FC<StressTestFlowPhase5Props> = ({
  hasCustomClause,
  checkedCount,
  totalChecks,
}) => {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(hasCustomClause ? 2 : 1);

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200/90 p-5 md:p-7 shadow-xs mb-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-lg font-black text-slate-900">
              Didaktischer Prozesspfad: Der Akut-Notfall-Stresstest (Schnellprüfung)
            </h4>
            <p className="text-xs text-slate-600 font-medium">
              Systematischer Prüfprozess zur Belastbarkeit Ihrer eigenen Formulierung in der Akutsituation
            </p>
          </div>
        </div>

        <span className="text-xs font-black px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-950">
          Eigen-Check: {checkedCount}/{totalChecks} Kriterien erfüllt
        </span>
      </div>

      {/* 3 Step Process Flow Cards with Visual Connectors */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center">
        {/* Step 1: Clause Transfer */}
        <button
          type="button"
          onClick={() => setActiveStep(1)}
          className={`md:col-span-3 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
            activeStep === 1
              ? 'border-blue-600 bg-blue-100/80 shadow-md ring-2 ring-blue-300 scale-[1.02]'
              : 'border-blue-200 bg-blue-50/70 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-blue-900 bg-blue-200/80 px-2.5 py-0.5 rounded-md border border-blue-300">
              Prozess 01
            </span>
            {hasCustomClause ? (
              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4.5 h-4.5 text-amber-500" />
            )}
          </div>
          <p className="text-sm font-black text-slate-900">Eigene Klausel bereitstellen</p>
          <p className="text-xs text-slate-700 font-medium mt-1 leading-snug">
            {hasCustomClause ? '✓ Satz aus DS 1 für Stresstest gespiegelt' : '⚠️ Noch kein Satz notiert – jetzt eintragen'}
          </p>
        </button>

        {/* Process Arrow 1 */}
        <div className="md:col-span-1 flex items-center justify-center my-1 md:my-0">
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-600 shadow-2xs">
            <ArrowRight className="w-4 h-4 hidden md:block" />
            <span className="md:hidden font-black text-xs">↓</span>
          </div>
        </div>

        {/* Step 2: WENN-DANN Check */}
        <button
          type="button"
          onClick={() => setActiveStep(2)}
          className={`md:col-span-3 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
            activeStep === 2
              ? 'border-amber-500 bg-amber-100/90 shadow-md ring-2 ring-amber-300 scale-[1.02]'
              : 'border-amber-300 bg-amber-50/70 hover:border-amber-400'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-md border border-amber-300">
              Prozess 02
            </span>
            <span className="text-xs font-black text-amber-900 bg-amber-200 px-2 py-0.5 rounded-md">
              {checkedCount}/{totalChecks}
            </span>
          </div>
          <p className="text-sm font-black text-slate-900">WENN- & DANN-Prüfung</p>
          <p className="text-xs text-slate-700 font-medium mt-1 leading-snug">
            BGH-Bestimmtheit: Zustand & Maßnahme
          </p>
        </button>

        {/* Process Arrow 2 */}
        <div className="md:col-span-1 flex items-center justify-center my-1 md:my-0">
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-600 shadow-2xs">
            <ArrowRight className="w-4 h-4 hidden md:block" />
            <span className="md:hidden font-black text-xs">↓</span>
          </div>
        </div>

        {/* Step 3: Notfall Simulation */}
        <button
          type="button"
          onClick={() => setActiveStep(3)}
          className={`md:col-span-3 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
            activeStep === 3
              ? 'border-emerald-600 bg-emerald-100/90 shadow-md ring-2 ring-emerald-300 scale-[1.02]'
              : 'border-emerald-300 bg-emerald-50/70 hover:border-emerald-400'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-200/80 px-2.5 py-0.5 rounded-md border border-emerald-300">
              Prozess 03
            </span>
            <Clock className="w-4.5 h-4.5 text-emerald-700" />
          </div>
          <p className="text-sm font-black text-slate-900">Akut-Notfall-Test</p>
          <p className="text-xs text-slate-700 font-medium mt-1 leading-snug">
            Notärztliche Bindung ohne Nachfragen
          </p>
        </button>
      </div>

      {/* Step Insight Detail Card */}
      <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50 border-2 border-slate-200 rounded-2xl p-5 text-xs sm:text-sm space-y-2 shadow-2xs">
        {activeStep === 1 && (
          <div className="space-y-1">
            <span className="font-extrabold text-blue-900 block text-xs uppercase tracking-wider">
              📌 Prozess-Schritt 1: Klausel-Koppelung aus Schritt 2
            </span>
            <p className="text-slate-800 font-medium leading-relaxed">
              Ihr eigener Text aus der Selbsterfahrung dient als Prüfobjekt. Prüfen Sie, ob Ihre Formulierung dem Behandlungsteam im Notfall eindeutige Handlungsanweisungen gibt.
            </p>
          </div>
        )}

        {activeStep === 2 && (
          <div className="space-y-1">
            <span className="font-extrabold text-amber-900 block text-xs uppercase tracking-wider">
              ⚖️ Prozess-Schritt 2: Juristische WENN- & DANN-Analyse
            </span>
            <p className="text-slate-800 font-medium leading-relaxed">
              Gehen Sie die beiden Kernkriterien durch: Ist der Behandlungszustand (WENN) klar abgegrenzt – und ist die medizinische Maßnahme (DANN) unmissverständlich geregelt?
            </p>
          </div>
        )}

        {activeStep === 3 && (
          <div className="space-y-1">
            <span className="font-extrabold text-emerald-900 block text-xs uppercase tracking-wider">
              🩺 Prozess-Schritt 3: Praxis-Bindung am Behandlungsort
            </span>
            <p className="text-slate-800 font-medium leading-relaxed">
              Würde die Schichtleitung oder der Notarzt im akuten Notfall auf Basis Ihrer Klausel in wenigen Sekunden sofort eine Beatmung einstellen oder eine Reanimation unterlassen können, ohne rechtliche Unsicherheit zu verspüren?
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
