import React, { useState, useEffect } from 'react';
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
import { sounds } from './utils/audio';
import { WifiOff, Award, Sparkles } from 'lucide-react';

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

  // Sync sound settings with audio utility
  useEffect(() => {
    sounds.enabled = data.audioEnabled;
  }, [data.audioEnabled]);

  // Sync beamer mode CSS class on body
  useEffect(() => {
    if (data.beamerMode) {
      document.body.classList.add('beamer-presentation-mode');
    } else {
      document.body.classList.remove('beamer-presentation-mode');
    }
  }, [data.beamerMode]);

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

  // Check for newly unlocked achievements
  const prevAchievementsCount = React.useRef(0);
  useEffect(() => {
    if (
      progressMetrics.achievements.length > prevAchievementsCount.current &&
      prevAchievementsCount.current > 0
    ) {
      const latest = progressMetrics.achievements[progressMetrics.achievements.length - 1];
      setShowAchievementToast(latest);
      sounds.playTriumph();
      const timer = setTimeout(() => setShowAchievementToast(null), 3500);
      return () => clearTimeout(timer);
    }
    prevAchievementsCount.current = progressMetrics.achievements.length;
  }, [progressMetrics.achievements.length]);

  const handleSelectPhase = (phaseId: number) => {
    updateData({ currentPhase: phaseId });
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

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex items-center gap-3 text-slate-400 text-sm">
          <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
          <span>Lade Guided Classroom...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <Header
        progressPercentage={progressMetrics.percentage}
        syncStatus={syncStatus}
        isOnline={isOnline}
        beamerMode={data.beamerMode}
        onToggleBeamerMode={() => updateData({ beamerMode: !data.beamerMode })}
        audioEnabled={data.audioEnabled}
        onToggleAudio={() => updateData({ audioEnabled: !data.audioEnabled })}
        teacherMode={data.teacherMode}
        onOpenTeacherModal={() => setIsTeacherModalOpen(true)}
        onPrint={() => setIsPrintModalOpen(true)}
      />

      {/* Stepper Navigation */}
      <PhaseStepper
        currentPhase={data.currentPhase}
        onSelectPhase={handleSelectPhase}
        completedPhases={progressMetrics.completedPhases}
        progressPercentage={progressMetrics.percentage}
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
            onNextPhase={() => handleSelectPhase(2)}
          />
        )}

        {data.currentPhase === 2 && (
          <Phase2SelfExperience
            toolsChosen={data.toolsChosen}
            hesitationPoint={data.hesitationPoint}
            ownPvSentences={data.ownPvSentences}
            onUpdateField={(field, val) => updateData({ [field]: val })}
            onNextPhase={() => handleSelectPhase(3)}
          />
        )}

        {data.currentPhase === 3 && (
          <Phase3TandemComparison
            q1={data.comparisonQ1}
            q2={data.comparisonQ2}
            q3={data.comparisonQ3}
            q4={data.comparisonQ4}
            onUpdateField={(field, val) => updateData({ [field]: val })}
            onNextPhase={() => handleSelectPhase(4)}
          />
        )}

        {data.currentPhase === 4 && (
          <Phase4LegalFramework onNextPhase={() => handleSelectPhase(5)} />
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
            onNextPhase={() => handleSelectPhase(6)}
          />
        )}

        {data.currentPhase === 6 && (
          <Phase6LegalConsil
            cases={data.cases}
            teacherMode={data.teacherMode}
            onUpdateCase={handleUpdateCase}
            onPrint={() => setIsPrintModalOpen(true)}
          />
        )}
      </main>

      {/* Offline Toast Banner */}
      {!isOnline && (
        <div className="fixed bottom-5 left-5 z-40 bg-amber-950/90 border border-amber-500/50 text-amber-200 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md animate-in slide-in-from-bottom-2 duration-300">
          <WifiOff className="w-4 h-4 text-amber-400 animate-pulse" />
          <div className="text-xs">
            <span className="font-bold">Offline-Modus aktiv:</span> Eingaben werden lokal auf diesem Gerät gespeichert und bei erneuter Verbindung automatisch synchronisiert.
          </div>
        </div>
      )}

      {/* Achievement Unlock Toast Notification */}
      {showAchievementToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-blue-400/30 animate-in slide-in-from-bottom-3 duration-300">
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
            <Award className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider font-extrabold text-blue-200">
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
        customVideoUrl={data.customVideoUrl}
        onUpdateVideoUrl={(url) => updateData({ customVideoUrl: url })}
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
