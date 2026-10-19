import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { PhaseStepper } from './components/PhaseStepper';
import { Phase1Orientation } from './components/phases/Phase1Orientation';
import { Phase2SelfExperience } from './components/phases/Phase2SelfExperience';
import { Phase3TandemComparison } from './components/phases/Phase3TandemComparison';
import { Phase4LegalFramework } from './components/phases/Phase4LegalFramework';
import { Phase5SelfCheck } from './components/phases/Phase5SelfCheck';
import { Phase6LegalConsil } from './components/phases/Phase6LegalConsil';
import { TeacherModal } from './components/TeacherModal';
import { PrintHandoutModal } from './components/PrintHandoutModal';
import { useClassroomSync, CaseState } from './hooks/useClassroomSync';
import { computeOverallProgress } from './utils/legal-learning';
import { exportToWord } from './utils/exportUtils';
import { WifiOff, Award } from 'lucide-react';

export default function App() {
  const { data, updateData, isOnline, syncStatus, isInitialized, resetAll } = useClassroomSync();

  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [showAchievementToast, setShowAchievementToast] = useState<string | null>(null);

  // Register service worker for offline support
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.warn('Service worker registration failed:', err);
      });
    }
  }, []);

  // Compute overall progress & achievements
  const casesCompletedCount = Object.values(data.cases || {}).filter((c) => c.completed).length;
  const comparisonAnswersCount = [
    data.comparisonQ1,
    data.comparisonQ2,
    data.comparisonQ3,
    data.comparisonQ4,
  ].filter((a) => (a || '').trim().length > 5).length;
  const checklistsCheckedCount = [
    data.checklistSelf1,
    data.checklistSelf2,
    data.checklistSelf3,
  ].filter(Boolean).length;

  const progressMetrics = computeOverallProgress({
    quizPassed: data.quizSubmitted && data.quizScore === 4,
    pvSentencesEntered: (data.ownPvSentences || '').trim().length > 10,
    comparisonAnswersCount,
    checklistsCheckedCount,
    casesCompletedCount,
  });

  const explicitCompleted = data.completedPhases || [];
  const allCompletedPhases = Array.from(
    new Set([...explicitCompleted, ...progressMetrics.completedPhases])
  );

  const effectivePercentage = Math.min(
    100,
    Math.max(
      progressMetrics.percentage,
      Math.round((allCompletedPhases.length / 6) * 100)
    )
  );

  // Check for newly unlocked achievements
  const prevAchievementsCount = React.useRef(0);
  useEffect(() => {
    if (
      progressMetrics.achievements.length > prevAchievementsCount.current &&
      prevAchievementsCount.current > 0
    ) {
      const latest = progressMetrics.achievements[progressMetrics.achievements.length - 1];
      setShowAchievementToast(latest);
      const timer = setTimeout(() => setShowAchievementToast(null), 3500);
      return () => clearTimeout(timer);
    }
    prevAchievementsCount.current = progressMetrics.achievements.length;
  }, [progressMetrics.achievements.length]);

  const handleSelectPhase = (phaseId: number) => {
    updateData({ currentPhase: phaseId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompletePhase = (phaseId: number) => {
    const currentCompleted = data.completedPhases || [];
    const nextCompleted = Array.from(new Set([...currentCompleted, phaseId]));
    const nextPhase = phaseId < 6 ? phaseId + 1 : 6;

    updateData({
      completedPhases: nextCompleted,
      currentPhase: nextPhase,
    });

    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899'],
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateQuizAnswers = (
    answers: Record<string, string>,
    submitted: boolean,
    score: number
  ) => {
    updateData({
      quizAnswers: answers,
      quizSubmitted: submitted,
      quizScore: score,
    });
  };

  const handleUpdateCase = (id: number, updater: Partial<CaseState>) => {
    updateData((prev) => ({
      ...prev,
      cases: {
        ...prev.cases,
        [id]: {
          ...(prev.cases[id] || {
            wenn: '',
            dann: '',
            diagnosis: [],
            diagnosisText: '',
            isUnlocked: false,
            completed: false,
          }),
          ...updater,
        },
      },
    }));
  };

  const handleExportAllToWord = () => {
    exportToWord({
      title: 'Patientenverfügung & Strafrecht I – Gesamtes Lerntagebuch',
      subtitle: 'Fachweiterbildung Palliative Care (CE08 U3) • Lehrinhalte nach Großkopf & Klein',
      sections: [
        {
          heading: 'Phase 1: Präzisions-Check (Rechtsinstrumente)',
          content: {
            'Erreichte Punktzahl im Quiz': `${data.quizScore} von 4 Punkten`,
            'Quiz eingereicht': data.quizSubmitted ? 'Ja' : 'Nein',
          },
        },
        {
          heading: 'Phase 2: Selbsterfahrung (Stolperstein-Protokoll)',
          content: {
            'Tandem-Werkzeuge': data.toolsChosen || '(Keine Angabe)',
            'Größte Hürde / Zögerungspunkt': data.hesitationPoint || '(Keine Angabe)',
            'Notierte Sätze für den Stresstest': data.ownPvSentences || '(Keine Angabe)',
          },
        },
        {
          heading: 'Phase 3: Tandem-Vergleich (4 Leitfragen)',
          content: {
            '1. Gemeinsamkeiten': data.comparisonQ1 || '(Keine Angabe)',
            '2. Unterschiede': data.comparisonQ2 || '(Keine Angabe)',
            '3. Was fehlt? (Blinde Flecken)': data.comparisonQ3 || '(Keine Angabe)',
            '4. Offene Fragen aus Nutzersicht': data.comparisonQ4 || '(Keine Angabe)',
          },
        },
        {
          heading: 'Phase 5: Eigen-Check (3-Punkte-Stresstest)',
          content: {
            '1. WENN-Kriterium (Krankheitszustand)': data.checklistSelf1 ? 'Erfüllt' : 'Nicht erfüllt',
            '2. DANN-Kriterium (Maßnahmen)': data.checklistSelf2 ? 'Erfüllt' : 'Nicht erfüllt',
            '3. Kombination mit Vorsorgevollmacht': data.checklistSelf3 ? 'Erfüllt' : 'Nicht erfüllt',
            'Persönliches Fazit': data.selfCheckReflection || '(Keine Angabe)',
          },
        },
        {
          heading: 'Phase 6: Rechts-Konsil (Die 6 Praxisfälle)',
          content: Object.fromEntries(
            Object.entries(data.cases || {}).map(([id, c]) => [
              `Fall ${id}`,
              `WENN: ${c.wenn || '-'} | DANN: ${c.dann || '-'} (Diagnose: ${(c.diagnosis || []).join(', ') || '-'})`,
            ])
          ),
        },
      ],
    }, 'patientenverfuegung_gesamtdokumentation.doc');
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-800">
        <div className="flex items-center gap-3 text-slate-600 text-sm">
          <div className="w-5 h-5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
          <span>Lade Guided Classroom...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <Header
        progressPercentage={effectivePercentage}
        syncStatus={syncStatus}
        isOnline={isOnline}
        teacherMode={data.teacherMode}
        onOpenTeacherModal={() => setIsTeacherModalOpen(true)}
        onPrint={() => setIsPrintModalOpen(true)}
        onExportWord={handleExportAllToWord}
      />

      {/* Stepper Navigation */}
      <PhaseStepper
        currentPhase={data.currentPhase}
        onSelectPhase={handleSelectPhase}
        completedPhases={allCompletedPhases}
        progressPercentage={effectivePercentage}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {data.currentPhase === 1 && (
          <Phase1Orientation
            quizAnswers={data.quizAnswers}
            quizSubmitted={data.quizSubmitted}
            quizScore={data.quizScore}
            customVideoUrl={data.customVideoUrl}
            onUpdateQuizAnswers={handleUpdateQuizAnswers}
            onNextPhase={() => handleCompletePhase(1)}
          />
        )}

        {data.currentPhase === 2 && (
          <Phase2SelfExperience
            toolsChosen={data.toolsChosen}
            hesitationPoint={data.hesitationPoint}
            creationInsights={data.creationInsights}
            ownPvSentences={data.ownPvSentences}
            onUpdateField={(field, val) => updateData({ [field]: val })}
            onNextPhase={() => handleCompletePhase(2)}
          />
        )}

        {data.currentPhase === 3 && (
          <Phase3TandemComparison
            q1={data.comparisonQ1}
            q2={data.comparisonQ2}
            q3={data.comparisonQ3}
            q4={data.comparisonQ4}
            onUpdateField={(field, val) => updateData({ [field]: val })}
            onNextPhase={() => handleCompletePhase(3)}
          />
        )}

        {data.currentPhase === 4 && (
          <Phase4LegalFramework onNextPhase={() => handleCompletePhase(4)} />
        )}

        {data.currentPhase === 5 && (
          <Phase5SelfCheck
            ownPvSentences={data.ownPvSentences}
            chk1={data.checklistSelf1}
            chk2={data.checklistSelf2}
            chk3={data.checklistSelf3}
            selfCheckReflection={data.selfCheckReflection}
            onUpdateChecklist={(key, val) => updateData({ [key]: val })}
            onUpdateReflection={(val) => updateData({ selfCheckReflection: val })}
            onNextPhase={() => handleCompletePhase(5)}
          />
        )}

        {data.currentPhase === 6 && (
          <Phase6LegalConsil
            cases={data.cases}
            teacherMode={data.teacherMode}
            onUpdateCase={handleUpdateCase}
            onPrint={() => setIsPrintModalOpen(true)}
            onCompleteTraining={() => handleCompletePhase(6)}
          />
        )}
      </main>

      {/* Offline Toast Banner */}
      {!isOnline && (
        <div className="fixed bottom-5 left-5 z-40 bg-amber-50 border border-amber-300 text-amber-900 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-2 duration-300">
          <WifiOff className="w-4 h-4 text-amber-600 animate-pulse" />
          <div className="text-xs">
            <span className="font-bold">Offline-Modus aktiv:</span> Eingaben werden lokal auf diesem Gerät gespeichert.
          </div>
        </div>
      )}

      {/* Achievement Unlock Toast Notification */}
      {showAchievementToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-bottom-3 duration-300">
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Award className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider font-extrabold text-blue-300">
              Erfolg freigeschaltet!
            </div>
            <div className="text-xs font-bold">{showAchievementToast}</div>
          </div>
        </div>
      )}

      {/* Teacher Cockpit Modal */}
      <TeacherModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
        teacherMode={data.teacherMode}
        onToggleTeacherMode={(active) => updateData({ teacherMode: active })}
        onResetAllData={resetAll}
      />

      {/* Print / PDF Modal */}
      <PrintHandoutModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        data={data}
      />
    </div>
  );
}
