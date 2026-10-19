import React from 'react';
import { ArrowRight, MessageSquareQuote, ShieldCheck } from 'lucide-react';
import { StressTestFlowPhase5 } from '../diagrams/StressTestFlowPhase5';
import { StepTransition } from '../StepTransition';
import { SaveExportBar } from '../SaveExportBar';

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
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Phase Intro Banner - Clean, without confusing side boxes */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col items-start gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3 w-full">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              Doppelstunde 2 • Phase 5
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Dauer: ca. 15 Minuten
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
            <span>Stresstest-Score: {checkedCount} von 3 Kriterien erfüllt</span>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Phase 5: Der Eigen-Check – Hält Ihre Verfügung dem Stresstest stand?
          </h2>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-4xl">
            Nehmen Sie sich noch einmal Ihr Dokument aus der ersten Doppelstunde vor und prüfen Sie es mit der Brille des Behandlungsteams auf einer Intensiv- oder Palliativstation um 3:00 Uhr morgens im Notfall.
          </p>
        </div>
      </div>

      {/* Transition to Step 1 */}
      <StepTransition
        stepNumber="1"
        title="Den nächtlichen 3:00-Uhr-Notfall-Stresstest simulieren"
        hint="Perspektive des Behandlungsteams auf der Akut- oder Palliativstation"
        variant="indigo"
      />

      {/* Didaktisches Schaubild: Der nächtliche 3:00-Uhr-Notfall-Stresstest */}
      <StressTestFlowPhase5
        hasCustomClause={Boolean(ownPvSentences && ownPvSentences.trim().length > 0)}
        checkedCount={checkedCount}
        totalChecks={3}
      />

      {/* Transition to Step 2 */}
      <StepTransition
        stepNumber="2"
        title="Eigene Klausel prüfen & persönliches Fazit sichern"
        hint="WENN-Prüfung, DANN-Prüfung und Kombination mit Vollmacht"
        variant="emerald"
      />

      <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Schritt 2 • Checkliste & Praxistransfer
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
            Drei-Punkte-Prüfung Ihrer eigenen Verfügung
          </h3>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Vergleichen Sie Ihre eigenen Sätze mit den drei rechtlichen Kernkriterien:
          </p>
        </div>

        {/* Mirror from Step 2 */}
        <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/50 p-5 sm:p-6 rounded-2xl border-2 border-blue-200/90 space-y-2.5 shadow-2xs">
          <div className="text-xs font-black text-blue-900 uppercase tracking-wider flex items-center gap-2">
            <MessageSquareQuote className="w-4 h-4 text-blue-600" />
            <span>Ihre notierten Sätze aus Schritt 2 (Doppelstunde 1):</span>
          </div>
          <p className="text-base sm:text-lg font-bold text-slate-900 italic bg-white/95 p-4 rounded-xl border border-blue-200 shadow-2xs leading-relaxed">
            {ownPvSentences?.trim()
              ? `„${ownPvSentences.trim()}“`
              : '„(Noch kein Satz in Schritt 2 eingetragen – prüfen Sie alternativ direkt Ihr geöffnetes PDF/Formulardokument aus dem Generator.)“'}
          </p>
        </div>

        {/* 3 Checklist Items */}
        <div className="space-y-3.5">
          <h4 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Prüf-Checkliste nach Großkopf & Klein (2019a, 2019b):</span>
          </h4>

          <div
            onClick={() => handleToggle('checklistSelf1', chk1)}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition flex items-start gap-4 ${
              chk1
                ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950 shadow-2xs'
                : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 text-slate-800'
            }`}
          >
            <input
              type="checkbox"
              checked={chk1}
              onChange={() => {}}
              className="mt-1 w-5 h-5 rounded text-blue-600 border-slate-300 pointer-events-none shrink-0"
            />
            <div className="text-sm sm:text-base leading-relaxed font-medium">
              <strong className="text-slate-950 font-bold">1. WENN-Prüfung:</strong> Ist der medizinische Krankheitszustand eindeutig benannt (keine vagen Begriffe wie „schwer krank“ oder „nicht mehr lebenswert“)?
            </div>
          </div>

          <div
            onClick={() => handleToggle('checklistSelf2', chk2)}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition flex items-start gap-4 ${
              chk2
                ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950 shadow-2xs'
                : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 text-slate-800'
            }`}
          >
            <input
              type="checkbox"
              checked={chk2}
              onChange={() => {}}
              className="mt-1 w-5 h-5 rounded text-blue-600 border-slate-300 pointer-events-none shrink-0"
            />
            <div className="text-sm sm:text-base leading-relaxed font-medium">
              <strong className="text-slate-950 font-bold">2. DANN-Prüfung:</strong> Sind die gewünschten oder abgelehnten ärztlichen und pflegerischen Maßnahmen konkret benannt (z. B. künstliche Beatmung, Ernährung, Dialyse, Reanimation, palliative Symptomlinderung)?
            </div>
          </div>

          <div
            onClick={() => handleToggle('checklistSelf3', chk3)}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition flex items-start gap-4 ${
              chk3
                ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950 shadow-2xs'
                : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 text-slate-800'
            }`}
          >
            <input
              type="checkbox"
              checked={chk3}
              onChange={() => {}}
              className="mt-1 w-5 h-5 rounded text-blue-600 border-slate-300 pointer-events-none shrink-0"
            />
            <div className="text-sm sm:text-base leading-relaxed font-medium">
              <strong className="text-slate-950 font-bold">3. Kombination mit Vorsorgevollmacht:</strong> Ist klar geregelt, <em>wer</em> als bevollmächtigte Person meinen Willen gegenüber dem Behandlungsteam durchsetzt?
            </div>
          </div>
        </div>

        {/* Reflection */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-800">
            Ihr Fazit zum Generator: Wo hat das Tool Sie vor juristischen Fehlern geschützt – und wo könnten bei Freitextfeldern trotzdem unbestimmte Aussagen entstehen?
          </label>
          <textarea
            rows={4}
            value={selfCheckReflection}
            onChange={(e) => onUpdateReflection(e.target.value)}
            placeholder="Mein Fazit zur Rechtssicherheit meines Dokuments aus DS 1..."
            className="w-full px-4 py-3.5 rounded-2xl bg-white border border-slate-300 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 font-medium leading-relaxed"
          />
        </div>

        {/* Speichern & Export Bar */}
        <SaveExportBar
          filenamePrefix="phase5_eigen_check"
          label="Eigen-Check sichern:"
          exportData={{
            title: 'Phase 5: Eigen-Check – Stresstest der Patientenverfügung',
            subtitle: '3-Punkte-Prüfung & Reflexion aus Sicht des Behandlungsteams',
            sections: [
              {
                heading: 'Geprüfter Satz aus DS 1',
                content: ownPvSentences || '(Kein Satz eingetragen)',
              },
              {
                heading: 'Erfüllte Kriterien der 3-Punkte-Checkliste',
                content: {
                  '1. WENN-Prüfung (Krankheitszustand bestimmt)': chk1 ? 'Erfüllt (Ja)' : 'Nicht erfüllt (Nein)',
                  '2. DANN-Prüfung (Maßnahmen bestimmt)': chk2 ? 'Erfüllt (Ja)' : 'Nicht erfüllt (Nein)',
                  '3. Kombination mit Vorsorgevollmacht geregelt': chk3 ? 'Erfüllt (Ja)' : 'Nicht erfüllt (Nein)',
                  'Gesamtscore': `${checkedCount} von 3 Kriterien erfüllt`,
                },
              },
              {
                heading: 'Persönliches Fazit zur Rechtssicherheit',
                content: selfCheckReflection || '(Keine Eingabe vorhanden)',
              },
            ],
          }}
        />
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-end no-print pt-2">
        <button
          onClick={onNextPhase}
          className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-400/40 border-2 border-amber-300 animate-pulse flex items-center gap-2.5 cursor-pointer transform active:scale-95 transition"
        >
          <span>✓ Phase 5 als erledigt markieren & weiter zum Rechts-Konsil ➔</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
