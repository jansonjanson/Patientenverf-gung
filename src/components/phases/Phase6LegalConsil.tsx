import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  CheckCircle2,
  AlertOctagon,
  Printer,
  BookOpen,
  Info,
  Scale,
  Wrench,
  MessageSquareQuote,
  Zap,
} from 'lucide-react';
import { CASES_DATA, evaluateCaseFormulation } from '../../utils/legal-learning';
import { CaseState } from '../../hooks/useClassroomSync';
import { CaseAnalysisMatrixPhase6 } from '../diagrams/CaseAnalysisMatrixPhase6';
import { StepTransition } from '../StepTransition';
import { SaveExportBar } from '../SaveExportBar';

interface Phase6LegalConsilProps {
  cases: Record<number, CaseState>;
  teacherMode: boolean;
  onUpdateCase: (id: number, updater: Partial<CaseState>) => void;
  onPrint: () => void;
  onCompleteTraining?: () => void;
}

export const Phase6LegalConsil: React.FC<Phase6LegalConsilProps> = ({
  cases,
  teacherMode,
  onUpdateCase,
  onPrint,
  onCompleteTraining,
}) => {
  const [lockedHintCaseId, setLockedHintCaseId] = useState<number | null>(null);
  const [focusedCaseIndex, setFocusedCaseIndex] = useState<number>(0);
  const completedCasesCount = Object.values(cases).filter((c) => c.completed).length;

  const handleSelectCase = (index: number) => {
    setFocusedCaseIndex(index);
    const targetCaseId = CASES_DATA[index]?.id;
    if (targetCaseId) {
      const el = document.getElementById(`case-card-${targetCaseId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleToggleDiagnosis = (caseId: number, tag: 'wenn_unbestimmt' | 'dann_unbestimmt') => {
    const currentTags = cases[caseId]?.diagnosis || [];
    const nextTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];

    onUpdateCase(caseId, { diagnosis: nextTags });
  };

  const handleFieldChange = (
    caseId: number,
    field: 'wenn' | 'dann' | 'wennReason' | 'dannReason',
    val: string
  ) => {
    const current = cases[caseId] || {
      wenn: '',
      dann: '',
      wennReason: '',
      dannReason: '',
      diagnosis: [],
      diagnosisText: '',
      isUnlocked: false,
      completed: false,
    };
    const updated = { ...current, [field]: val };

    const evaluation = evaluateCaseFormulation(updated.wenn, updated.dann);
    updated.completed = evaluation.isReadyForSolution;

    if (lockedHintCaseId === caseId && evaluation.isReadyForSolution) {
      setLockedHintCaseId(null);
    }

    onUpdateCase(caseId, updated);
  };

  const handleScrollToRepair = (caseId: number) => {
    const el = document.getElementById(`case_${caseId}_repair_section`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const firstTextarea = el.querySelector('textarea');
      if (firstTextarea) {
        (firstTextarea as HTMLTextAreaElement).focus();
      }
    }
  };

  const handleToggleSolution = (caseId: number) => {
    const c = cases[caseId];
    const evaluation = evaluateCaseFormulation(c?.wenn || '', c?.dann || '');

    if (!teacherMode && !evaluation.isReadyForSolution) {
      setLockedHintCaseId(caseId);
      return;
    }

    setLockedHintCaseId(null);
    const nextUnlocked = !c?.isUnlocked;
    onUpdateCase(caseId, { isUnlocked: nextUnlocked, completed: true });
  };

  const cleanQuote = (q: string) => q.replace(/^[„"]|[“"]$/g, '').trim();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Phase Intro Banner */}
      <div className="bg-gradient-to-br from-violet-50/90 via-indigo-50/40 to-slate-50 border-2 border-violet-300/90 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col items-start gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3 w-full">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              Doppelstunde 2 • Phase 6
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Dauer: ca. 45 Minuten
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
            <span>Fortschritt: {completedCasesCount} von 6 Fällen gelöst</span>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Phase 6: Rechts-Konsil – 6 reale Praxisfälle analysieren & umformulieren
          </h2>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-4xl">
            Wenden Sie Ihr neues Fachwissen auf sechs reale Problempassagen aus Patientenverfügungen an: Diagnostizieren Sie den Rechtsmangel (WENN unbestimmt oder DANN unbestimmt), begründen Sie den Fehler schriftlich und formulieren Sie eine bindende BGH-Verbesserung!
          </p>
        </div>
      </div>

      {/* Transition to Step 1 */}
      <StepTransition
        stepNumber="1"
        title="Fallübersicht & Analyse-Matrix öffnen"
        hint="Alle 6 Problemklauseln im systematischen Überblick"
        variant="indigo"
      />

      {/* Didaktisches Schaubild: Diagnosematrix aller 6 Problemklauseln */}
      <CaseAnalysisMatrixPhase6
        currentCaseIndex={focusedCaseIndex}
        onSelectCase={handleSelectCase}
        caseProgress={Object.fromEntries(
          CASES_DATA.map((c, i) => [i, Boolean(cases[c.id]?.completed)])
        )}
      />

      {/* Transition to Step 2 */}
      <StepTransition
        stepNumber="2"
        title="Die 6 Fallakten bearbeiten, begründen & WENN-DANN Klauseln reparieren"
        hint="Fehler diagnostizieren, Mangel begründen, neu verfassen & mit Musterlösung abgleichen"
        variant="blue"
      />

      {/* The 6 Cases */}
      <div className="space-y-6">
        {CASES_DATA.map((c, idx) => {
          const state = cases[c.id] || {
            wenn: '',
            dann: '',
            wennReason: '',
            dannReason: '',
            diagnosis: [],
            diagnosisText: '',
            isUnlocked: false,
            completed: false,
          };

          const evaluation = evaluateCaseFormulation(state.wenn, state.dann);
          const isUnlocked = teacherMode || state.isUnlocked;
          const showLockedHint = lockedHintCaseId === c.id;

          const isWennSelected = state.diagnosis.includes('wenn_unbestimmt');
          const isDannSelected = state.diagnosis.includes('dann_unbestimmt');

          return (
            <div
              key={c.id}
              id={`case-card-${c.id}`}
              onClick={() => setFocusedCaseIndex(idx)}
              className={`bg-white border-2 rounded-3xl p-6 sm:p-8 shadow-xs transition space-y-6 ${
                state.completed
                  ? 'border-emerald-300 ring-2 ring-emerald-100'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Header & Badges */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200">
                      Fallakte {c.id} • Problem-Klausel
                    </span>
                    {state.completed && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Bearbeitet
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                    {c.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleScrollToRepair(c.id);
                  }}
                  className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs flex items-center gap-2 shadow-xs transition active:scale-95 cursor-pointer shrink-0 border border-amber-300 no-print"
                >
                  <Wrench className="w-4 h-4 text-slate-950" />
                  <span>WENN-DANN reparieren ➔</span>
                </button>
              </div>

              {/* Fallvignette für Azubis */}
              {c.vignette && (
                <div className="p-4 rounded-2xl bg-blue-50/90 border-2 border-blue-200/90 text-slate-800 space-y-1 shadow-2xs">
                  <div className="font-black text-blue-900 flex items-center gap-2 uppercase tracking-wider text-xs">
                    <span>📋 Fallvignette für die Auszubildenden:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {c.vignette}
                  </p>
                </div>
              )}

              {/* The Original Faulty Quote (Clean Single Quotes) */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-50/90 to-red-50/60 border-l-4 border-l-rose-500 border-2 border-rose-200/90 text-rose-950 font-bold text-base sm:text-lg italic shadow-2xs">
                „{cleanQuote(c.quote)}“
              </div>

              {/* Step 1: Diagnostic checklist (ONLY WENN and DANN) */}
              <div className="space-y-3">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-800">
                  1. Fehler-Diagnose: Welcher Teilsatz ist juristisch unbestimmt? ({c.hintQuestion})
                </label>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => handleToggleDiagnosis(c.id, 'wenn_unbestimmt')}
                    className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold border-2 transition cursor-pointer flex items-center gap-2.5 ${
                      isWennSelected
                        ? 'bg-amber-100 text-amber-950 border-amber-400 shadow-2xs'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <AlertOctagon className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>1. WENN-Teil unbestimmt (Krankheitszustand unklar/vage)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleDiagnosis(c.id, 'dann_unbestimmt')}
                    className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold border-2 transition cursor-pointer flex items-center gap-2.5 ${
                      isDannSelected
                        ? 'bg-emerald-100 text-emerald-950 border-emerald-400 shadow-2xs'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <AlertOctagon className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>2. DANN-Teil unbestimmt (Maßnahme/Unterlassen vage)</span>
                  </button>
                </div>
              </div>

              {/* Step 2: Dynamic Justification Textareas for Selected Flaws */}
              {(isWennSelected || isDannSelected) && (
                <div className="space-y-4 bg-amber-50/70 p-5 rounded-2xl border-2 border-amber-200 animate-in fade-in duration-300">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-900 block">
                    2. Genaue Begründung: Warum genügt die Formulierung den BGH-Kriterien nicht?
                  </span>

                  {isWennSelected && (
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-amber-950">
                        Begründung für WENN (Krankheitszustand):
                      </label>
                      <textarea
                        rows={2}
                        value={state.wennReason || ''}
                        onChange={(e) => handleFieldChange(c.id, 'wennReason', e.target.value)}
                        placeholder="Begründen Sie präzise: Welche Unklarheiten bestehen im WENN-Satzteil bezüglich des Krankheitszustandes?"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-amber-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-200 font-medium"
                      />
                    </div>
                  )}

                  {isDannSelected && (
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-emerald-950">
                        Begründung für DANN (Medizinische Maßnahme):
                      </label>
                      <textarea
                        rows={2}
                        value={state.dannReason || ''}
                        onChange={(e) => handleFieldChange(c.id, 'dannReason', e.target.value)}
                        placeholder="Begründen Sie präzise: Warum ist die DANN-Anweisung bezüglich der medizinischen Maßnahmen unbestimmt?"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-emerald-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 font-medium"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: WENN - DANN Repair Editor */}
              <div
                id={`case_${c.id}_repair_section`}
                className="space-y-4 bg-slate-50/90 p-5 sm:p-6 rounded-2xl border-2 border-slate-200"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-blue-900 flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-blue-600" />
                    <span>3. Ihre Reparatur: BGH-konform formulieren</span>
                  </span>
                  <span className="text-xs text-slate-600 font-bold">
                    {evaluation.characterCount} Zeichen getippt
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* WENN Input */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-amber-950">
                      Ihre Verbesserung für WENN (Bestimmter Krankheitszustand):
                    </label>
                    <textarea
                      rows={3}
                      id={`case_${c.id}_wenn`}
                      data-testid={`case-${c.id}-wenn`}
                      value={state.wenn}
                      onChange={(e) => handleFieldChange(c.id, 'wenn', e.target.value)}
                      placeholder="z. B. Wenn ich mich im Endstadium einer unheilbaren, tödlich verlaufenden Erkrankung befinde..."
                      className="w-full px-4 py-3 rounded-xl bg-white border-2 border-amber-300 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500 font-medium"
                    />
                  </div>

                  {/* DANN Input */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-emerald-950">
                      Ihre Verbesserung für DANN (Bestimmte Maßnahme):
                    </label>
                    <textarea
                      rows={3}
                      id={`case_${c.id}_dann`}
                      data-testid={`case-${c.id}-dann`}
                      value={state.dann}
                      onChange={(e) => handleFieldChange(c.id, 'dann', e.target.value)}
                      placeholder="z. B. ...lehne ich alle lebensverlängernden Maßnahmen wie Beatmung und künstliche Ernährung ab..."
                      className="w-full px-4 py-3 rounded-xl bg-white border-2 border-emerald-300 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 font-medium"
                    />
                  </div>
                </div>

                {/* Merged Sentence Live Preview */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 text-sm leading-relaxed text-slate-800">
                  <span className="font-bold text-slate-900">Ihre reparierte Gesamtklausel: </span>
                  <span className="italic text-slate-800 font-medium" id={`case_${c.id}_preview`}>
                    {state.wenn.trim() || state.dann.trim()
                      ? `„${state.wenn.trim() ? state.wenn.trim() : '[WENN fehlt noch]'} ${state.dann.trim() ? state.dann.trim() : '[DANN fehlt noch]'}“`
                      : 'Bitte tragen Sie beide Klauseln in die Felder oben ein...'}
                  </span>
                </div>
              </div>

              {/* Inline warning notification if locked */}
              {showLockedHint && (
                <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-950 text-sm flex items-start gap-3 animate-in fade-in">
                  <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="leading-relaxed font-medium">
                    <strong className="text-amber-900 font-bold">Hinweis zur Freischaltung:</strong> Bitte formulieren Sie zuerst sowohl den WENN-Teil als auch den DANN-Teil aus (mindestens 10 Zeichen in beiden Feldern), bevor Sie die Musterlösung einsehen. Alternativ kann die Lehrkraft alle Lösungen über das Dozenten-Cockpit zentral freischalten.
                  </div>
                </div>
              )}

              {/* Step 4: Solution Toggle Button */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 no-print">
                <span className="text-xs text-slate-500">
                  {teacherMode
                    ? '✨ Dozenten-Modus aktiv: Musterlösungen direkt einsehbar'
                    : evaluation.isReadyForSolution
                    ? '✓ Satz ist ausformuliert! Klicken Sie zum Abgleich mit der Musterlösung.'
                    : '💡 Formulieren Sie WENN und DANN aus (mind. 10 Zeichen je Feld), um die Musterlösung freizuschalten.'}
                </span>

                <button
                  type="button"
                  id={`case_${c.id}_btn_solution`}
                  data-testid={`case-${c.id}-btn-solution`}
                  onClick={() => handleToggleSolution(c.id)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer shadow-xs ${
                    isUnlocked
                      ? 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                      : evaluation.isReadyForSolution || teacherMode
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-500 border border-slate-300'
                  }`}
                >
                  {isUnlocked ? (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Musterlösung verbergen</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4" />
                      <span>Musterlösung freischalten</span>
                    </>
                  )}
                </button>
              </div>

              {/* Unlocked Solution Display */}
              {isUnlocked && (
                <div
                  id={`case_${c.id}_solution`}
                  data-testid={`case-${c.id}-solution`}
                  className="bg-emerald-50/90 border-2 border-emerald-300 rounded-2xl p-5 sm:p-6 space-y-4 animate-in fade-in duration-300"
                >
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Juristische Musterlösung & Analyse (Großkopf & Klein)</span>
                  </div>

                  <div className="bg-white/95 p-4 rounded-xl border border-emerald-200 text-emerald-950 font-bold text-base italic shadow-2xs leading-relaxed">
                    „{cleanQuote(c.officialSolution)}“
                  </div>

                  <div className="space-y-2 text-sm text-slate-800 font-medium">
                    <p>
                      <strong className="text-slate-950 font-bold">Juristischer Kernmangel: </strong>
                      {c.officialProblem}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Save & Export Bar */}
      <SaveExportBar
        filenamePrefix="phase6_rechts_konsil"
        label="Fallanalysen des Rechts-Konsils sichern:"
        exportData={{
          title: 'Phase 6: Rechts-Konsil – Fallanalysen & WENN-DANN Reparaturen',
          subtitle: '6 reale Praxisfälle mit Fehlerbegründung & BGH-konformer Formulierung',
          sections: CASES_DATA.map((c) => ({
            heading: `Fall ${c.id}: ${c.title}`,
            content: {
              'Fehlerbezeichnung': (cases[c.id]?.diagnosis || []).join(', ') || 'Keine Fehler gewählt',
              'WENN-Begründung': cases[c.id]?.wennReason || 'Keine Angabe',
              'DANN-Begründung': cases[c.id]?.dannReason || 'Keine Angabe',
              'Reparierter WENN-Teil': cases[c.id]?.wenn || 'Keine Angabe',
              'Reparierter DANN-Teil': cases[c.id]?.dann || 'Keine Angabe',
              'Offizielle BGH-Musterlösung': c.officialSolution,
            },
          })),
        }}
      />

      {/* PLENUM STOPP 2 */}
      <div className="bg-emerald-50/90 border-2 border-emerald-300 rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-5 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 text-xl font-black shrink-0">
            🏁
          </div>
          <div>
            <h4 className="font-extrabold text-emerald-950 text-base uppercase tracking-wide">
              Abschluss-Synthese im Plenum
            </h4>
            <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed max-w-3xl font-medium">
              Vergleichen Sie Ihre eigenen Wenn-Dann-Formulierungen im Kurs mit den juristischen Musterlösungen. Diskutieren Sie zum Abschluss: <strong>Welche Rolle übernehmen wir als Pflegefachpersonen, wenn Patient:innen Angst vor „Schläuchen“ äußern – und was passiert rechtlich, wenn eine Verfügung unbestimmt bleibt?</strong>
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 no-print">
          <button
            onClick={onCompleteTraining || onPrint}
            className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-400/40 border-2 border-amber-300 animate-pulse flex items-center gap-2.5 cursor-pointer transform active:scale-95 transition"
          >
            <span>🎉 Phase 6 & Gesamtes Training erfolgreich abschließen! ➔</span>
          </button>

          <button
            onClick={onPrint}
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition transform active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Gesetzbuch / PDF speichern</span>
          </button>
        </div>
      </div>

      {/* LITERATURE FOOTER */}
      <div className="bg-slate-100 border border-slate-200 rounded-3xl p-6 text-xs text-slate-600 space-y-2">
        <div className="font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600" />
          Literaturverzeichnis (Fachweiterbildung Palliative Care III)
        </div>
        <p>• Großkopf, V. & Klein, H. (2019a). <em>Recht in Medizin und Pflege.</em> (5. Aufl.). Balingen: Spitta GmbH.</p>
        <p>• Großkopf, V. & Klein, H. (2019b). <em>Vorschriften und Gesetze für das Gesundheitswesen: inkl. Heilkundeübertragungsrichtlinie.</em> (3. Aufl.). Balingen: Spitta GmbH.</p>
      </div>
    </div>
  );
};
