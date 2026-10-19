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

  const handleToggleDiagnosis = (caseId: number, tag: string) => {
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

    if (lockedHintCaseId === caseId && evaluation.isReadyForSolution) {
      setLockedHintCaseId(null);
    }

    onUpdateCase(caseId, updated);
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

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Phase Intro Banner - Clean, without confusing side boxes */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col items-start gap-4">
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
            Wenden Sie Ihr neues Fachwissen auf sechs reale Problempassagen aus Patientenverfügungen an: Diagnostizieren Sie den Rechtsmangel (WENN unbestimmt, DANN unbestimmt oder Vertretung unklar) und formulieren Sie eine rechtssichere Verbesserung!
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
        title="Die 6 Fallakten bearbeiten & WENN-DANN Klauseln formulieren"
        hint="Fehler diagnostizieren, neu verfassen & mit der Musterlösung abgleichen"
        variant="blue"
      />

      {/* The 6 Cases */}
      <div className="space-y-6">
        {CASES_DATA.map((c, idx) => {
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
          const showLockedHint = lockedHintCaseId === c.id;

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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
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
                <span className="text-xs text-slate-500 font-medium">Großkopf & Klein (2019a, 2019b)</span>
              </div>

              {/* The Original Faulty Quote */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-50/90 to-red-50/60 border-l-4 border-l-rose-500 border-2 border-rose-200/90 text-rose-950 font-bold text-base sm:text-lg italic shadow-2xs">
                {c.quote}
              </div>

              {/* Step 1: Diagnostic checklist */}
              <div className="space-y-3">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-800">
                  1. Juristische & pflegerische Fehler-Diagnose ({c.hintQuestion})
                </label>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleToggleDiagnosis(c.id, 'wenn_unbestimmt')}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition cursor-pointer flex items-center gap-2 ${
                      state.diagnosis.includes('wenn_unbestimmt')
                        ? 'bg-rose-100/90 text-rose-950 border-rose-400 font-bold shadow-2xs'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <AlertOctagon className="w-4 h-4 text-rose-500" />
                    <span>WENN unbestimmt (Krankheitszustand vage/fehlt)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleDiagnosis(c.id, 'dann_unbestimmt')}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition cursor-pointer flex items-center gap-2 ${
                      state.diagnosis.includes('dann_unbestimmt')
                        ? 'bg-rose-100/90 text-rose-950 border-rose-400 font-bold shadow-2xs'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <AlertOctagon className="w-4 h-4 text-rose-500" />
                    <span>DANN unbestimmt (Maßnahme/Unterlassen vage/fehlt)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleDiagnosis(c.id, 'vertretung_unklar')}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition cursor-pointer flex items-center gap-2 ${
                      state.diagnosis.includes('vertretung_unklar')
                        ? 'bg-rose-100/90 text-rose-950 border-rose-400 font-bold shadow-2xs'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <AlertOctagon className="w-4 h-4 text-rose-500" />
                    <span>Vertretung unklar (keine bevollmächtigte Person)</span>
                  </button>
                </div>
              </div>

              {/* Step 2: WENN - DANN Split Editor */}
              <div className="space-y-4 bg-slate-50/90 p-5 sm:p-6 rounded-2xl border-2 border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-blue-800">
                    2. Ihre Verbesserung: Rechtssicher formulieren (WENN – DANN – Struktur)
                  </span>
                  <span className="text-xs text-slate-600 font-bold">
                    {evaluation.characterCount} Zeichen getippt
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* WENN Input */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-amber-950">
                      WENN (Bestimmter Krankheitszustand / Situation):
                    </label>
                    <textarea
                      rows={3}
                      id={`case_${c.id}_wenn`}
                      data-testid={`case-${c.id}-wenn`}
                      value={state.wenn}
                      onChange={(e) => handleTextChange(c.id, 'wenn', e.target.value)}
                      placeholder="z. B. Wenn ich mich im Endstadium einer unheilbaren, tödlich verlaufenden Erkrankung befinde..."
                      className="w-full px-4 py-3 rounded-xl bg-white border-2 border-amber-300 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500 font-medium"
                    />
                  </div>

                  {/* DANN Input */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-bold text-emerald-950">
                      DANN (Bestimmte Maßnahme / Unterlassen):
                    </label>
                    <textarea
                      rows={3}
                      id={`case_${c.id}_dann`}
                      data-testid={`case-${c.id}-dann`}
                      value={state.dann}
                      onChange={(e) => handleTextChange(c.id, 'dann', e.target.value)}
                      placeholder="z. B. ...lehne ich alle lebensverlängernden Maßnahmen wie Beatmung und künstliche Ernährung ab..."
                      className="w-full px-4 py-3 rounded-xl bg-white border-2 border-emerald-300 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 font-medium"
                    />
                  </div>
                </div>

                {/* Merged Sentence Live Preview */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 text-sm leading-relaxed text-slate-800">
                  <span className="font-bold text-slate-900">Ihr neuer Gesamtsatz: </span>
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

              {/* Step 3: Solution Toggle Button */}
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
                    „{c.officialSolution}“
                  </div>

                  <div className="space-y-2 text-sm text-slate-800 font-medium">
                    <p>
                      <strong className="text-slate-950 font-bold">Juristischer Kernmangel: </strong>
                      {c.officialProblem}
                    </p>
                    <p>
                      <strong className="text-slate-950 font-bold">Leitfrage zur Prüfung: </strong>
                      {c.hintQuestion}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Speichern & Export Bar for all 6 cases */}
      <div className="pt-2">
        <SaveExportBar
          filenamePrefix="phase6_rechts_konsil_faelle"
          label="Alle 6 Fallakten sichern & exportieren:"
          exportData={{
            title: 'Phase 6: Rechts-Konsil – Alle 6 Praxisfälle',
            subtitle: 'Fehler-Diagnosen & rechtssichere WENN-DANN Umformulierungen',
            sections: CASES_DATA.map((c) => {
              const state = cases[c.id];
              return {
                heading: `Fallakte ${c.id}: ${c.title}`,
                content: {
                  'Originale Problemklausel': c.quote,
                  'Fehlerdiagnose': (state?.diagnosis || []).length > 0 ? (state?.diagnosis || []).join(', ') : 'Keine Diagnose gewählt',
                  'Ihr WENN-Teil (Krankheitszustand)': state?.wenn?.trim() || '(Noch keine Eingabe)',
                  'Ihr DANN-Teil (Maßnahme/Unterlassen)': state?.dann?.trim() || '(Noch keine Eingabe)',
                  'Formulierter Gesamtsatz': state?.wenn?.trim() && state?.dann?.trim() ? `„${state.wenn.trim()} ${state.dann.trim()}“` : '(Unvollständig)',
                  'Musterlösung': c.officialSolution,
                  'Juristischer Mangel': c.officialProblem,
                },
              };
            }),
          }}
        />
      </div>

      {/* Transition to Praxis Transfer */}
      <StepTransition
        stepNumber="3"
        title="Praxis-Transfer & Abschluss im Plenum"
        hint="Was gilt bei unbestimmten Verfügungen? Handout als PDF sichern"
        variant="emerald"
      />

      {/* TRANSFER BOX: WAS PASSIERT BEI UNBESTIMMTEN VERFÜGUNGEN? */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 font-black flex items-center justify-center shrink-0 border border-blue-200">
            <Scale className="w-5 h-5 text-blue-700" />
          </div>
          <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">
            Praxis-Transfer: Was passiert rechtlich, wenn eine Verfügung im Ernstfall zu unbestimmt ist?
          </h4>
        </div>
        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200 font-medium">
          <p>
            Wenn eine Formulierung das <strong>Bestimmtheitsgebot</strong> verfehlt (z. B. bloße Floskeln wie „würdevoll sterben“ oder „keine Schläuche“), ist das Dokument <u>nicht wertlos</u>!
          </p>
          <p>
            Die niedergelegten Aussagen entfalten dann zwar keine unmittelbare Selbstbindung („wirkt aus sich heraus“), sie dienen jedoch als <strong>wichtige Anhaltspunkte für die Ermittlung der Behandlungswünsche bzw. des mutmaßlichen Willens</strong> des Betroffenen.
          </p>
          <p className="text-blue-900 font-semibold pt-1 border-t border-slate-200">
            ➔ <strong>Konsequenz für das Behandlungsteam:</strong> Die bevollmächtigte Person (aus einer <em>Vorsorgevollmacht</em>) oder der gerichtlich bestellte Betreuer (aus einer <em>Betreuungsverfügung</em>) muss diesen mutmaßlichen Willen gemeinsam mit den behandelnden Ärzt:innen und Pflegenden erörtern und zur Geltung bringen (§ 1827 Abs. 2 BGB).
          </p>
        </div>
      </div>

      {/* PLENUM STOPP 3 & CLOSING */}
      <div className="bg-emerald-50/80 border-2 border-emerald-300 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-sm border border-emerald-300">
              🛑
            </span>
            <h4 className="font-extrabold text-emerald-950 text-base sm:text-lg">
              Plenum-Stopp 3: Gemeinsame Fallbesprechung & Transfer in die Pflegepraxis
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed max-w-3xl font-medium">
            Vergleichen Sie Ihre eigenen Wenn-Dann-Formulierungen im Kurs mit den juristischen Musterlösungen. Diskutieren Sie zum Abschluss: <strong>Welche Rolle übernehmen wir als Pflegefachpersonen, wenn Patient:innen Angst vor „Schläuchen“ äußern – und was passiert rechtlich, wenn eine Verfügung unbestimmt bleibt (Behandlungswünsche & mutmaßlicher Wille)?</strong>
          </p>
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
            <span>Handout / PDF speichern</span>
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
