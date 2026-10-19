import React from 'react';
import {
  FileText,
  Lock,
  Unlock,
  CheckCircle2,
  AlertOctagon,
  Sparkles,
  ArrowRight,
  Printer,
  BookOpen,
} from 'lucide-react';
import { CASES_DATA, evaluateCaseFormulation } from '../../utils/legal-learning';
import { CaseState } from '../../hooks/useClassroomSync';
import { sounds } from '../../utils/audio';

interface Phase6LegalConsilProps {
  cases: Record<number, CaseState>;
  teacherMode: boolean;
  onUpdateCase: (id: number, updater: Partial<CaseState>) => void;
  onPrint: () => void;
}

export const Phase6LegalConsil: React.FC<Phase6LegalConsilProps> = ({
  cases,
  teacherMode,
  onUpdateCase,
  onPrint,
}) => {
  const completedCasesCount = Object.values(cases).filter((c) => c.completed).length;

  const handleToggleDiagnosis = (caseId: number, tag: string) => {
    sounds.playClick();
    const currentTags = cases[caseId]?.diagnosis || [];
    const nextTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];

    onUpdateCase(caseId, { diagnosis: nextTags });
  };

  const handleTextChange = (caseId: number, field: 'wenn' | 'dann' | 'diagnosisText', val: string) => {
    const current = cases[caseId] || { wenn: '', dann: '', diagnosis: [], diagnosisText: '', isUnlocked: false, completed: false };
    const updated = { ...current, [field]: val };

    const evaluation = evaluateCaseFormulation(updated.wenn, updated.dann);
    updated.completed = evaluation.isReadyForSolution;

    onUpdateCase(caseId, updated);
  };

  const handleToggleSolution = (caseId: number) => {
    const c = cases[caseId];
    const evaluation = evaluateCaseFormulation(c?.wenn || '', c?.dann || '');

    if (!teacherMode && !evaluation.isReadyForSolution) {
      alert(
        'Bitte formulieren Sie zuerst sowohl den WENN-Teil als auch den DANN-Teil aus (mindestens ein vollständiger Teilsatz), bevor Sie die Musterlösung öffnen.\n\n(Dozenten-Hinweis: Über das Dozenten-Cockpit mit PIN 1358 sofort freischaltbar.)'
      );
      return;
    }

    const nextUnlocked = !c?.isUnlocked;
    sounds.playUnlock();
    onUpdateCase(caseId, { isUnlocked: nextUnlocked, completed: true });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Phase Intro Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
            Doppelstunde 2 • Schritt 6 (30 Min. Fallarbeit + 15 Min. Plenums-Sicherung)
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            04. (Negativ-)Beispiele: Aussagen prüfen & rechtssicher umformulieren
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            Wenden Sie Ihr neues Fachwissen auf sechs reale Problempassagen aus fiktiven Patientenverfügungen an: Diagnostizieren Sie den Rechtsmangel und formulieren Sie eine bindende Verbesserung!
          </p>
        </div>

        <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 shrink-0 text-center w-full lg:w-48">
          <div className="text-2xl font-black text-emerald-400">{completedCasesCount} / 6</div>
          <div className="text-xs text-slate-400 font-semibold mt-0.5">Fälle gelöst</div>
        </div>
      </div>

      {/* The 6 Cases */}
      <div className="space-y-6">
        {CASES_DATA.map((c) => {
          const state = cases[c.id] || {
            wenn: '',
            dann: '',
            diagnosis: [],
            diagnosisText: '',
            isUnlocked: false,
            completed: false,
          };

          const evaluation = evaluateCaseFormulation(state.wenn, state.dann);
          const isUnlocked = teacherMode || state.isUnlocked;

          return (
            <div
              key={c.id}
              className={`bg-slate-900 border rounded-3xl p-6 sm:p-8 shadow-xl transition space-y-6 ${
                state.completed
                  ? 'border-emerald-500/40'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Header & Badges */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      Fallakte {c.id} • Problem-Klausel
                    </span>
                    {state.completed && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Bearbeitet
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1">
                    {c.title}
                  </h3>
                </div>
                <span className="text-xs text-slate-400">Großkopf & Klein (2019a, 2019b)</span>
              </div>

              {/* The Original Faulty Quote */}
              <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/40 border-l-4 border-l-rose-500 border border-rose-500/30 text-rose-100 font-bold text-base sm:text-lg italic">
                {c.quote}
              </div>

              {/* Step 1: Diagnostic checklist */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  1. Juristische & pflegerische Fehler-Diagnose ({c.hintQuestion})
                </label>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleToggleDiagnosis(c.id, 'wenn_unbestimmt')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center gap-2 ${
                      state.diagnosis.includes('wenn_unbestimmt')
                        ? 'bg-rose-950/60 text-rose-200 border-rose-500/60'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
                    <span>WENN unbestimmt (Krankheitszustand vage/fehlt)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleDiagnosis(c.id, 'dann_unbestimmt')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center gap-2 ${
                      state.diagnosis.includes('dann_unbestimmt')
                        ? 'bg-rose-950/60 text-rose-200 border-rose-500/60'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
                    <span>DANN unbestimmt (Maßnahme/Unterlassen vage/fehlt)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleDiagnosis(c.id, 'vertretung_unklar')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center gap-2 ${
                      state.diagnosis.includes('vertretung_unklar')
                        ? 'bg-rose-950/60 text-rose-200 border-rose-500/60'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
                    <span>Unklare Vertretung / Vollmacht</span>
                  </button>
                </div>

                <input
                  type="text"
                  id={`case_${c.id}_diag_text`}
                  data-testid={`case-${c.id}-diag-text`}
                  value={state.diagnosisText}
                  onChange={(e) => handleTextChange(c.id, 'diagnosisText', e.target.value)}
                  placeholder="Begründen Sie kurz in eigenen Worten: Welches konkrete Problem entsteht durch diesen Satz am Krankenbett?"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Step 2: WENN - DANN Split Editor */}
              <div className="space-y-4 bg-slate-950/70 p-5 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    2. Ihre Verbesserung: Rechtssicher formulieren (WENN – DANN – Struktur)
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {evaluation.characterCount} Zeichen getippt
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* WENN Input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-amber-300">
                      WENN (Bestimmter Krankheitszustand / Situation):
                    </label>
                    <textarea
                      rows={3}
                      id={`case_${c.id}_wenn`}
                      data-testid={`case-${c.id}-wenn`}
                      value={state.wenn}
                      onChange={(e) => handleTextChange(c.id, 'wenn', e.target.value)}
                      placeholder="z. B. Wenn ich mich im Endstadium einer unheilbaren, tödlich verlaufenden Erkrankung befinde..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-amber-500/30 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  {/* DANN Input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-emerald-300">
                      DANN (Bestimmte Maßnahme / Unterlassen):
                    </label>
                    <textarea
                      rows={3}
                      id={`case_${c.id}_dann`}
                      data-testid={`case-${c.id}-dann`}
                      value={state.dann}
                      onChange={(e) => handleTextChange(c.id, 'dann', e.target.value)}
                      placeholder="z. B. ...lehne ich alle lebensverlängernden Maßnahmen wie Beatmung und künstliche Ernährung ab..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-emerald-500/30 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>
                </div>

                {/* Merged Sentence Live Preview */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs leading-relaxed text-slate-300">
                  <span className="font-bold text-white">Ihr neuer Gesamtsatz: </span>
                  <span className="italic text-slate-300" id={`case_${c.id}_preview`}>
                    {state.wenn.trim() || state.dann.trim()
                      ? `„${state.wenn.trim() ? state.wenn.trim() : '[WENN fehlt noch]'} ${state.dann.trim() ? state.dann.trim() : '[DANN fehlt noch]'}“`
                      : 'Bitte tragen Sie beide Klauseln in die Felder oben ein...'}
                  </span>
                </div>
              </div>

              {/* Step 3: Solution Toggle Button */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 no-print">
                <span className="text-xs text-slate-400">
                  {teacherMode
                    ? '✨ Dozenten-Modus aktiv: Musterlösungen direkt einsehbar'
                    : evaluation.isReadyForSolution
                    ? '✓ Satz ist ausformuliert! Klicken Sie zum Abgleich mit der Musterlösung.'
                    : '💡 Formulieren Sie WENN und DANN aus (mind. 10 Zeichen), um die Musterlösung freizuschalten.'}
                </span>

                <button
                  type="button"
                  id={`case_${c.id}_btn_solution`}
                  data-testid={`case-${c.id}-btn-solution`}
                  onClick={() => handleToggleSolution(c.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    isUnlocked
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : evaluation.isReadyForSolution || teacherMode
                      ? 'bg-blue-600 hover:bg-blue-500 text-white'
                      : 'bg-slate-800 text-slate-500 hover:text-slate-400'
                  }`}
                >
                  {isUnlocked ? (
                    <>
                      <Unlock className="w-3.5 h-3.5" />
                      <span>Musterlösung ausblenden</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Musterlösung & Folien-Abgleich</span>
                    </>
                  )}
                </button>
              </div>

              {/* Solution Box (Visible when unlocked or in teacher mode) */}
              {isUnlocked && (
                <div className="solution-box rounded-2xl bg-emerald-950/40 border-2 border-emerald-500/40 p-5 space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Juristische Auflösung & Verbesserung (Foliensatz J. Rosenow)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/30 text-xs text-rose-200 leading-relaxed">
                    <strong className="text-rose-100">Rechtsmangel im Originalsatz:</strong>{' '}
                    {c.officialProblem}
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/40 text-xs sm:text-sm text-emerald-100 font-semibold leading-relaxed">
                    <strong className="text-emerald-300">Muster-Verbesserung:</strong>{' '}
                    {c.officialSolution}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* PLENUM STOPP 3 & CLOSING */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-emerald-950/40 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center text-sm border border-emerald-500/30">
              🛑
            </span>
            <h4 className="font-extrabold text-white text-base sm:text-lg">
              Plenum-Stopp 3: Gemeinsame Fallbesprechung & Transfer in die Pflegepraxis
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            Vergleichen Sie Ihre eigenen Wenn-Dann-Formulierungen im Kurs mit den juristischen Musterlösungen. Diskutieren Sie zum Abschluss: <strong>Welche Rolle übernehmen wir als Pflegefachpersonen, wenn Patient:innen Angst vor „Schläuchen“ äußern – und was passiert rechtlich, wenn eine Verfügung unbestimmt bleibt (Behandlungswünsche & mutmaßlicher Wille)?</strong>
          </p>
        </div>

        <button
          onClick={onPrint}
          className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shrink-0 shadow-lg shadow-emerald-900/40 transition transform active:scale-95 flex items-center gap-2 cursor-pointer no-print"
        >
          <Printer className="w-4 h-4" />
          <span>Handout / PDF speichern</span>
        </button>
      </div>

      {/* LITERATURE FOOTER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-xs text-slate-400 space-y-2">
        <div className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-400" />
          Literaturverzeichnis (Foliensatz J. Rosenow)
        </div>
        <p>• Großkopf, V. & Klein, H. (2019a). <em>Recht in Medizin und Pflege.</em> (5. Aufl.). Balingen: Spitta GmbH.</p>
        <p>• Großkopf, V. & Klein, H. (2019b). <em>Vorschriften und Gesetze für das Gesundheitswesen: inkl. Heilkundeübertragungsrichtlinie.</em> (3. Aufl.). Balingen: Spitta GmbH.</p>
      </div>
    </div>
  );
};
