import React, { useState } from 'react';
import { Activity, ShieldCheck, AlertCircle, Clock, CheckCircle2, ChevronRight } from 'lucide-react';

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
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Didaktisches Schaubild: Der nächtliche 3:00-Uhr-Notfall-Stresstest
            </h4>
            <p className="text-xs text-slate-500">
              Prüfkaskade zur Belastbarkeit Ihrer eigenen Formulierung in der klinischen Notfallsituation
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
          Checkliste: {checkedCount}/{totalChecks} Kriterien
        </span>
      </div>

      {/* 3 Step Interactive Flow Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {/* Step 1 */}
        <button
          type="button"
          onClick={() => setActiveStep(1)}
          className={`p-3 rounded-xl border-2 text-left transition-all ${
            activeStep === 1
              ? 'border-blue-600 bg-blue-50/70 shadow ring-2 ring-blue-200'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
              Schritt 1
            </span>
            {hasCustomClause ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-500" />
            )}
          </div>
          <p className="text-xs font-bold text-slate-900">Klausel-Transfer (DS 1)</p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {hasCustomClause ? 'Eigene Formulierung gespiegelt' : 'Noch kein eigener Satz notiert'}
          </p>
        </button>

        {/* Step 2 */}
        <button
          type="button"
          onClick={() => setActiveStep(2)}
          className={`p-3 rounded-xl border-2 text-left transition-all ${
            activeStep === 2
              ? 'border-indigo-600 bg-indigo-50/70 shadow ring-2 ring-indigo-200'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded">
              Schritt 2
            </span>
            <span className="text-[11px] font-mono font-bold text-indigo-700">
              {checkedCount}/{totalChecks}
            </span>
          </div>
          <p className="text-xs font-bold text-slate-900">Juristische Prüfung</p>
          <p className="text-[11px] text-slate-500 mt-0.5">WENN- & DANN-Bestimmtheit</p>
        </button>

        {/* Step 3 */}
        <button
          type="button"
          onClick={() => setActiveStep(3)}
          className={`p-3 rounded-xl border-2 text-left transition-all ${
            activeStep === 3
              ? 'border-emerald-600 bg-emerald-50/70 shadow ring-2 ring-emerald-200'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
              Schritt 3
            </span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xs font-bold text-slate-900">Notfall-Stresstest</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Notärztliche Bindung um 03:00 Uhr</p>
        </button>
      </div>

      {/* Step Insight Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs">
        {activeStep === 1 && (
          <div>
            <span className="font-bold text-slate-900 block mb-1">
              📌 Klausel-Import aus Ihrer Selbsterfahrung:
            </span>
            <p className="text-slate-600 leading-relaxed">
              Ihr eigener Text aus Schritt 2 dient als Testobjekt. Ist er präzise genug, um Missverständnisse im Notfall auszuschließen?
            </p>
          </div>
        )}

        {activeStep === 2 && (
          <div>
            <span className="font-bold text-slate-900 block mb-1">
              ⚖️ Die zwei K.O.-Kriterien des BGH:
            </span>
            <p className="text-slate-600 leading-relaxed">
              1. <strong>WENN:</strong> Ist der Zustand eindeutig (z. B. unheilbare tödliche Erkrankung / irreversibles Koma)?<br />
              2. <strong>DANN:</strong> Sind die konkreten Maßnahmen (Beatmung, Ernährung, Dialyse, Reanimation) ausdrücklich benannt?
            </p>
          </div>
        )}

        {activeStep === 3 && (
          <div>
            <span className="font-bold text-slate-900 block mb-1">
              🚨 Die Realität der Palliative- & Notfallmedizin:
            </span>
            <p className="text-slate-600 leading-relaxed">
              Notärzte und Pflegekräfte haben im Zweifel nur Sekunden. Enthält die Verfügung schwammige Formulierungen („würdevoll sterben“, „keine Apparatemedizin“), muss im Zweifel zugunsten des Lebens reanimiert werden!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
