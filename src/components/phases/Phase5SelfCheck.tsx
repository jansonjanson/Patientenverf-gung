import React from 'react';
import { ArrowRight, MessageSquareQuote, ShieldCheck } from 'lucide-react';
import { StressTestFlowPhase5 } from '../diagrams/StressTestFlowPhase5';

interface Phase5SelfCheckProps {
  ownPvSentences: string;
  chk1: boolean;
  chk2: boolean;
  chk3: boolean;
  selfCheckReflection: string;
  onUpdateChecklist: (key: string, value: boolean) => void;
  onUpdateReflection: (value: string) => void;
  onNextPhase: () => void;
}

export const Phase5SelfCheck: React.FC<Phase5SelfCheckProps> = ({
  ownPvSentences,
  chk1,
  chk2,
  chk3,
  selfCheckReflection,
  onUpdateChecklist,
  onUpdateReflection,
  onNextPhase,
}) => {
  const checkedCount = [chk1, chk2, chk3].filter(Boolean).length;

  const handleToggle = (key: string, current: boolean) => {
    onUpdateChecklist(key, !current);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Phase Intro Banner */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
            Doppelstunde 2 • Schritt 5
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Der Eigen-Check: Hält Ihre Verfügung aus DS 1 dem Stresstest stand?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
            Nehmen Sie sich noch einmal Ihr Dokument aus der ersten Doppelstunde vor und prüfen Sie es mit der Brille des Behandlungsteams auf einer Intensiv- oder Palliativstation.
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shrink-0 text-center w-full lg:w-48">
          <div className="text-2xl font-black text-emerald-600">{checkedCount} / 3</div>
          <div className="text-xs text-slate-500 font-semibold mt-0.5">Kriterien erfüllt</div>
        </div>
      </div>

      {/* Didaktisches Schaubild: Der nächtliche 3:00-Uhr-Krankenbett-Stresstest */}
      <StressTestFlowPhase5
        hasCustomClause={Boolean(ownPvSentences && ownPvSentences.trim().length > 0)}
        checkedCount={checkedCount}
        totalChecks={3}
      />

      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        {/* Mirror from Step 2 */}
        <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 space-y-2">
          <div className="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1.5">
            <MessageSquareQuote className="w-4 h-4 text-blue-600" />
            <span>Ihre notierten Sätze aus Schritt 2 (Doppelstunde 1):</span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-slate-800 italic bg-white p-4 rounded-xl border border-blue-100">
            {ownPvSentences?.trim()
              ? `„${ownPvSentences.trim()}“`
              : '„(Noch kein Satz in Schritt 2 eingetragen – prüfen Sie alternativ direkt Ihr geöffnetes PDF/Formulardokument aus dem Generator.)“'}
          </p>
        </div>

        {/* 3 Checklist Items */}
        <div className="space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            Prüf-Checkliste nach Großkopf & Klein (2019a, 2019b):
          </h3>

          <div
            onClick={() => handleToggle('checklistSelf1', chk1)}
            className={`p-4 rounded-2xl border cursor-pointer transition flex items-start gap-3.5 ${
              chk1
                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            <input
              type="checkbox"
              checked={chk1}
              onChange={() => {}}
              className="mt-1 w-4 h-4 rounded text-blue-600 border-slate-300 pointer-events-none"
            />
            <div className="text-xs sm:text-sm">
              <strong className="text-slate-900">1. WENN-Prüfung:</strong> Ist der medizinische Krankheitszustand eindeutig benannt (keine vagen Begriffe wie „schwer krank“ oder „nicht mehr lebenswert“)?
            </div>
          </div>

          <div
            onClick={() => handleToggle('checklistSelf2', chk2)}
            className={`p-4 rounded-2xl border cursor-pointer transition flex items-start gap-3.5 ${
              chk2
                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            <input
              type="checkbox"
              checked={chk2}
              onChange={() => {}}
              className="mt-1 w-4 h-4 rounded text-blue-600 border-slate-300 pointer-events-none"
            />
            <div className="text-xs sm:text-sm">
              <strong className="text-slate-900">2. DANN-Prüfung:</strong> Sind die gewünschten oder abgelehnten ärztlichen und pflegerischen Maßnahmen konkret benannt (z. B. künstliche Beatmung, Ernährung, Dialyse, Reanimation, palliative Symptomlinderung)?
            </div>
          </div>

          <div
            onClick={() => handleToggle('checklistSelf3', chk3)}
            className={`p-4 rounded-2xl border cursor-pointer transition flex items-start gap-3.5 ${
              chk3
                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            <input
              type="checkbox"
              checked={chk3}
              onChange={() => {}}
              className="mt-1 w-4 h-4 rounded text-blue-600 border-slate-300 pointer-events-none"
            />
            <div className="text-xs sm:text-sm">
              <strong className="text-slate-900">3. Kombination mit Vorsorgevollmacht:</strong> Ist klar geregelt, <em>wer</em> als bevollmächtigte Person meinen Willen gegenüber dem Behandlungsteam durchsetzt?
            </div>
          </div>
        </div>

        {/* Reflection */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            Ihr Fazit zum Generator: Wo hat das Tool Sie vor juristischen Fehlern geschützt – und wo könnten bei Freitextfeldern trotzdem unbestimmte Aussagen entstehen?
          </label>
          <textarea
            rows={3}
            value={selfCheckReflection}
            onChange={(e) => onUpdateReflection(e.target.value)}
            placeholder="Mein Fazit zur Rechtssicherheit meines Dokuments aus DS 1..."
            className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-end no-print">
        <button
          onClick={onNextPhase}
          className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm tracking-wide shadow-xs transition transform active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          <span>Weiter zu Schritt 6: Die 6 Fälle bearbeiten</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
