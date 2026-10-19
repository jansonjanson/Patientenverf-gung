import React from 'react';
import { ArrowRight, CheckSquare, Sparkles, MessageSquareQuote, ShieldCheck } from 'lucide-react';
import { sounds } from '../../utils/audio';

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
    sounds.playClick();
    onUpdateChecklist(key, !current);
    if (!current && checkedCount === 2) {
      sounds.playCorrect();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Phase Intro Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
            Doppelstunde 2 • Schritt 5 (ca. 10 Minuten Transfer auf DS 1)
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Der Eigen-Check: Hält Ihre Verfügung aus DS 1 dem Stresstest stand?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            Nehmen Sie sich noch einmal Ihr Dokument aus der ersten Doppelstunde vor und prüfen Sie es mit der Brille des Behandlungsteams auf einer Intensiv- oder Palliativstation.
          </p>
        </div>

        <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 shrink-0 text-center w-full lg:w-48">
          <div className="text-2xl font-black text-emerald-400">{checkedCount} / 3</div>
          <div className="text-xs text-slate-400 font-semibold mt-0.5">Kriterien erfüllt</div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        {/* Mirror from Step 2 */}
        <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <MessageSquareQuote className="w-4 h-4 text-blue-400" />
            <span>Ihre notierten Sätze aus Schritt 2 (Doppelstunde 1):</span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-slate-100 italic bg-slate-900/80 p-4 rounded-xl border border-slate-800/80">
            {ownPvSentences?.trim()
              ? `„${ownPvSentences.trim()}“`
              : '„(Noch kein Satz in Schritt 2 eingetragen – prüfen Sie alternativ direkt Ihr geöffnetes PDF/Formulardokument aus dem Generator.)“'}
          </p>
        </div>

        {/* 3 Checklist Items */}
        <div className="space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Prüf-Checkliste nach Großkopf & Klein (2019a, 2019b):
          </h3>

          <div
            onClick={() => handleToggle('checklistSelf1', chk1)}
            className={`p-4 rounded-2xl border cursor-pointer transition flex items-start gap-3.5 ${
              chk1
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <input
              type="checkbox"
              checked={chk1}
              onChange={() => {}}
              className="mt-1 w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-700 pointer-events-none"
            />
            <div className="text-xs sm:text-sm">
              <strong className="text-white">1. WENN-Prüfung:</strong> Ist der medizinische Krankheitszustand eindeutig benannt (keine vagen Begriffe wie „schwer krank“ oder „nicht mehr lebenswert“)?
            </div>
          </div>

          <div
            onClick={() => handleToggle('checklistSelf2', chk2)}
            className={`p-4 rounded-2xl border cursor-pointer transition flex items-start gap-3.5 ${
              chk2
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <input
              type="checkbox"
              checked={chk2}
              onChange={() => {}}
              className="mt-1 w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-700 pointer-events-none"
            />
            <div className="text-xs sm:text-sm">
              <strong className="text-white">2. DANN-Prüfung:</strong> Sind die gewünschten oder abgelehnten ärztlichen und pflegerischen Maßnahmen konkret benannt (z. B. künstliche Beatmung, Ernährung, Dialyse, Reanimation, palliative Symptomlinderung)?
            </div>
          </div>

          <div
            onClick={() => handleToggle('checklistSelf3', chk3)}
            className={`p-4 rounded-2xl border cursor-pointer transition flex items-start gap-3.5 ${
              chk3
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <input
              type="checkbox"
              checked={chk3}
              onChange={() => {}}
              className="mt-1 w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-700 pointer-events-none"
            />
            <div className="text-xs sm:text-sm">
              <strong className="text-white">3. Kombination mit Vorsorgevollmacht:</strong> Ist klar geregelt, <em>wer</em> als bevollmächtigte Person meinen Willen gegenüber dem Behandlungsteam durchsetzt?
            </div>
          </div>
        </div>

        {/* Reflection */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-300">
            Ihr Fazit zum Generator: Wo hat das Tool Sie vor juristischen Fehlern geschützt – und wo könnten bei Freitextfeldern trotzdem unbestimmte Aussagen entstehen?
          </label>
          <textarea
            rows={3}
            value={selfCheckReflection}
            onChange={(e) => onUpdateReflection(e.target.value)}
            placeholder="Mein Fazit zur Rechtssicherheit meines Dokuments aus DS 1..."
            className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-end no-print">
        <button
          onClick={() => {
            sounds.playClick();
            onNextPhase();
          }}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-blue-900/40 transition transform active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          <span>Weiter zu Schritt 6: Die 6 Fälle bearbeiten</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
