import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  CheckCircle2,
  AlertOctagon,
  Printer,
  BookOpen,
  Info,
} from 'lucide-react';
import { CASES_DATA, evaluateCaseFormulation } from '../../utils/legal-learning';
import { CaseState } from '../../hooks/useClassroomSync';
import { CaseAnalysisMatrixPhase6 } from '../diagrams/CaseAnalysisMatrixPhase6';

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
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Phase Intro Banner */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
            Doppelstunde 2 • Schritt 6
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            04. (Negativ-)Beispiele: Aussagen prüfen & rechtssicher umformulieren
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
            Wenden Sie Ihr neues Fachwissen auf sechs reale Problempassagen aus fiktiven Patientenverfügungen an: Diagnostizieren Sie den Rechtsmangel und formulieren Sie eine bindende Verbesserung!
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shrink-0 text-center w-full lg:w-48">
          <div className="text-2xl font-black text-emerald-600">{completedCasesCount} / 6</div>
          <div className="text-xs text-slate-500 font-semibold mt-0.5">Fälle gelöst</div>
        </div>
      </div>

      {/* Didaktisches Schaubild: Diagnosematrix aller 6 Problemklauseln */}
      <CaseAnalysisMatrixPhase6
        currentCaseIndex={focusedCaseIndex}
        onSelectCase={handleSelectCase}
        caseProgress={Object.fromEntries(
          CASES_DATA.map((c, i) => [i, Boolean(cases[c.id]?.completed)])
        )}
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
              className={`bg-white border rounded-3xl p-6 sm:p-8 shadow-xs transition space-y-6 ${
                state.completed
                  ? 'border-emerald-300 ring-1 ring-emerald-200'
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
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
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
              <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/80 border-l-4 border-l-rose-500 border border-rose-200 text-rose-950 font-bold text-base sm:text-lg italic">
                {c.quote}
              </div>

              {/* Step 1: Diagnostic checklist */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  1. Juristische & pflegerische Fehler-Diagnose ({c.hintQuestion})
                </label>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleToggleDiagnosis(c.id, 'wenn_unbestimmt')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center gap-2 ${
                      state.diagnosis.includes('wenn_unbestimmt')
                        ? 'bg-rose-50 text-rose-900 border-rose-300 font-bold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <AlertOctagon className="w-3.5 h-3.5 text-rose-500" />
                    <span>WENN unbestimmt (Krankheitszustand vage/fehlt)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleDiagnosis(c.id, 'dann_unbestimmt')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center gap-2 ${
                      state.diagnosis.includes('dann_unbestimmt')
                        ? 'bg-rose-50 text-rose-900 border-rose-300 font-bold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <AlertOctagon className="w-3.5 h-3.5 text-rose-500" />
                    <span>DANN unbestimmt (Maßnahme/Unterlassen vage/fehlt)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleDiagnosis(c.id, 'vertretung_unklar')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center gap-2 ${
                      state.diagnosis.includes('vertretung_unklar')
                        ? 'bg-rose-50 text-rose-900 border-rose-300 font-bold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <AlertOctagon className="w-3.5 h-3.5 text-rose-500" />
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
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                />
              </div>

              {/* Step 2: WENN - DANN Split Editor */}
              <div className="space-y-4 bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    2. Ihre Verbesserung: Rechtssicher formulieren (WENN – DANN – Struktur)
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {evaluation.characterCount} Zeichen getippt
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* WENN Input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-amber-900">
                      WENN (Bestimmter Krankheitszustand / Situation):
                    </label>
                    <textarea
                      rows={3}
                      id={`case_${c.id}_wenn`}
                      data-testid={`case-${c.id}-wenn`}
                      value={state.wenn}
                      onChange={(e) => handleTextChange(c.id, 'wenn', e.target.value)}
                      placeholder="z. B. Wenn ich mich im Endstadium einer unheilbaren, tödlich verlaufenden Erkrankung befinde..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-amber-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500"
                    />
                  </div>

                  {/* DANN Input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-emerald-900">
                      DANN (Bestimmte Maßnahme / Unterlassen):
                    </label>
                    <textarea
                      rows={3}
                      id={`case_${c.id}_dann`}
                      data-testid={`case-${c.id}-dann`}
                      value={state.dann}
                      onChange={(e) => handleTextChange(c.id, 'dann', e.target.value)}
                      placeholder="z. B. ...lehne ich alle lebensverlängernden Maßnahmen wie Beatmung und künstliche Ernährung ab..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-emerald-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Merged Sentence Live Preview */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs leading-relaxed text-slate-700">
                  <span className="font-bold text-slate-900">Ihr neuer Gesamtsatz: </span>
                  <span className="italic text-slate-700" id={`case_${c.id}_preview`}>
                    {state.wenn.trim() || state.dann.trim()
                      ? `„${state.wenn.trim() ? state.wenn.trim() : '[WENN fehlt noch]'} ${state.dann.trim() ? state.dann.trim() : '[DANN fehlt noch]'}“`
                      : 'Bitte tragen Sie beide Klauseln in die Felder oben ein...'}
                  </span>
                </div>
              </div>

              {/* Inline warning notification if locked (Replaces window.alert bug!) */}
              {showLockedHint && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2.5 animate-in fade-in">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong>Hinweis zur Freischaltung:</strong> Bitte formulieren Sie zuerst sowohl den WENN-Teil als auch den DANN-Teil aus (mindestens 10 Zeichen in beiden Feldern), bevor Sie die Musterlösung einsehen. Alternativ kann die Lehrkraft alle Lösungen über das Dozenten-Cockpit (PIN 1358) zentral freischalten.
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
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    isUnlocked
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                      : evaluation.isReadyForSolution || teacherMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-300'
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
                <div className="solution-box rounded-2xl bg-emerald-50/70 border-2 border-emerald-300 p-5 space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Juristische Auflösung & Verbesserung (Foliensatz J. Rosenow)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-rose-200 text-xs text-rose-900 leading-relaxed">
                    <strong className="text-rose-950">Rechtsmangel im Originalsatz:</strong>{' '}
                    {c.officialProblem}
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-emerald-300 text-xs sm:text-sm text-emerald-950 font-semibold leading-relaxed">
                    <strong className="text-emerald-800">Muster-Verbesserung:</strong>{' '}
                    {c.officialSolution}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* DIDAKTISCHE TRANSFER-BOX */}
      <div className="bg-white border-2 border-blue-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 font-black flex items-center justify-center shrink-0 border border-blue-200">
            ⚖️
          </div>
          <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">
            Praxis-Transfer: Was passiert rechtlich, wenn eine Verfügung im Ernstfall zu unbestimmt ist?
          </h4>
        </div>
        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <p>
            Wenn eine Formulierung das <strong>Bestimmtheitsgebot</strong> verfehlt (z. B. bloße Floskeln wie „würdevoll sterben“ oder „keine Schläuche“), ist das Dokument <u>nicht wertlos</u>!
          </p>
          <p>
            Die niedergelegten Aussagen entfalten dann zwar keine unmittelbare Selbstbindung („wirkt aus sich heraus“), sie dienen jedoch als <strong>wichtige Anhaltspunkte für die Ermittlung der Behandlungswünsche bzw. des mutmaßlichen Willens</strong> des Betroffenen.
          </p>
          <p className="text-blue-900 font-medium pt-1 border-t border-slate-200">
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
          <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed max-w-3xl">
            Vergleichen Sie Ihre eigenen Wenn-Dann-Formulierungen im Kurs mit den juristischen Musterlösungen. Diskutieren Sie zum Abschluss: <strong>Welche Rolle übernehmen wir als Pflegefachpersonen, wenn Patient:innen Angst vor „Schläuchen“ äußern – und was passiert rechtlich, wenn eine Verfügung unbestimmt bleibt (Behandlungswünsche & mutmaßlicher Wille)?</strong>
          </p>
        </div>

        <button
          onClick={onPrint}
          className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shrink-0 shadow-xs transition transform active:scale-95 flex items-center gap-2 cursor-pointer no-print"
        >
          <Printer className="w-4 h-4" />
          <span>Handout / PDF speichern</span>
        </button>
      </div>

      {/* LITERATURE FOOTER */}
      <div className="bg-slate-100 border border-slate-200 rounded-3xl p-6 text-xs text-slate-600 space-y-2">
        <div className="font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600" />
          Literaturverzeichnis (Foliensatz J. Rosenow)
        </div>
        <p>• Großkopf, V. & Klein, H. (2019a). <em>Recht in Medizin und Pflege.</em> (5. Aufl.). Balingen: Spitta GmbH.</p>
        <p>• Großkopf, V. & Klein, H. (2019b). <em>Vorschriften und Gesetze für das Gesundheitswesen: inkl. Heilkundeübertragungsrichtlinie.</em> (3. Aufl.). Balingen: Spitta GmbH.</p>
      </div>
    </div>
  );
};
