import { useState, useEffect, useCallback, useRef } from 'react';

export interface CaseState {
  wenn: string;
  dann: string;
  diagnosis: string[];
  diagnosisText: string;
  isUnlocked: boolean;
  completed: boolean;
}

export interface ClassroomData {
  userId: string;
  userName: string;
  currentPhase: number;
  // Step 1
  quizAnswers: Record<string, string>;
  quizSubmitted: boolean;
  quizScore: number;
  customVideoUrl: string;
  // Step 2
  toolsChosen: string;
  hesitationPoint: string;
  ownPvSentences: string;
  // Step 3
  comparisonQ1: string;
  comparisonQ2: string;
  comparisonQ3: string;
  comparisonQ4: string;
  // Step 5
  checklistSelf1: boolean;
  checklistSelf2: boolean;
  checklistSelf3: boolean;
  selfCheckReflection: string;
  // Step 6
  cases: Record<number, CaseState>;
  // Global Settings
  audioEnabled: boolean; // default false = muted!
  beamerMode: boolean;
  teacherMode: boolean;
  lastUpdated: string;
}

const DEFAULT_CASES: Record<number, CaseState> = {
  1: { wenn: '', dann: '', diagnosis: [], diagnosisText: '', isUnlocked: false, completed: false },
  2: { wenn: '', dann: '', diagnosis: [], diagnosisText: '', isUnlocked: false, completed: false },
  3: { wenn: '', dann: '', diagnosis: [], diagnosisText: '', isUnlocked: false, completed: false },
  4: { wenn: '', dann: '', diagnosis: [], diagnosisText: '', isUnlocked: false, completed: false },
  5: { wenn: '', dann: '', diagnosis: [], diagnosisText: '', isUnlocked: false, completed: false },
  6: { wenn: '', dann: '', diagnosis: [], diagnosisText: '', isUnlocked: false, completed: false },
};

const DEFAULT_STATE: ClassroomData = {
  userId: '',
  userName: 'Teilnehmer:in',
  currentPhase: 1,
  quizAnswers: {},
  quizSubmitted: false,
  quizScore: 0,
  customVideoUrl: 'https://youtu.be/Vh1T5booFvY?si=wLR32cqG4ojV-hsW',
  toolsChosen: '',
  hesitationPoint: '',
  ownPvSentences: '',
  comparisonQ1: '',
  comparisonQ2: '',
  comparisonQ3: '',
  comparisonQ4: '',
  checklistSelf1: false,
  checklistSelf2: false,
  checklistSelf3: false,
  selfCheckReflection: '',
  cases: DEFAULT_CASES,
  audioEnabled: false, // Standardwert zwingend stummgeschaltet!
  beamerMode: false,
  teacherMode: false,
  lastUpdated: new Date().toISOString(),
};

// Strict key requested by user for local student isolation
export const STUDENT_STORAGE_KEY = 'pv_strafrecht_student_state_v1';
const USER_ID_KEY = 'pv_strafrecht_student_uid';

export function useClassroomSync() {
  const [data, setData] = useState<ClassroomData>(DEFAULT_STATE);
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  // Status is kept friendly: 'lokal-gesichert' or 'synchronisiert'
  const [syncStatus, setSyncStatus] = useState<'synced' | 'local' | 'offline'>('local');
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize from LocalStorage (guaranteed offline & multi-user safe)
  useEffect(() => {
    let uid = '';
    try {
      uid = localStorage.getItem(USER_ID_KEY) || '';
      if (!uid) {
        uid = 'tn_' + Math.random().toString(36).substring(2, 9);
        localStorage.setItem(USER_ID_KEY, uid);
      }
    } catch {
      uid = 'tn_' + Date.now().toString(36);
    }

    let initialData = { ...DEFAULT_STATE, userId: uid };
    try {
      const localRaw = localStorage.getItem(STUDENT_STORAGE_KEY);
      if (localRaw) {
        const parsed = JSON.parse(localRaw);
        initialData = {
          ...initialData,
          ...parsed,
          userId: uid,
          // ensure default muted if not explicitly set
          audioEnabled: parsed.audioEnabled === true,
          cases: { ...DEFAULT_CASES, ...(parsed.cases || {}) },
        };
      }
    } catch (e) {
      console.warn('LocalStorage read note:', e);
    }

    setData(initialData);
    setIsInitialized(true);

    // Silent background sync check (if hosted with backend, otherwise ignored without error)
    if (typeof navigator !== 'undefined' && navigator.onLine) {
      fetch(`/api/health`, { method: 'GET' })
        .then((res) => {
          if (res.ok) {
            setSyncStatus('synced');
          } else {
            setSyncStatus('local');
          }
        })
        .catch(() => {
          // Static hosting (Netlify / GitHub Pages) -> silent fallback to local!
          setSyncStatus('local');
        });
    } else {
      setSyncStatus('offline');
    }

    const handleOnline = () => {
      setIsOnline(true);
      setSyncStatus('local');
    };
    const handleOffline = () => {
      setIsOnline(false);
      setSyncStatus('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Update data: immediately saves to localStorage, with silent non-blocking server ping if available
  const updateData = useCallback(
    (updater: Partial<ClassroomData> | ((prev: ClassroomData) => ClassroomData)) => {
      setData((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
        next.lastUpdated = new Date().toISOString();

        // 1. Save immediately to LocalStorage under 'pv_strafrecht_student_state_v1'
        try {
          localStorage.setItem(STUDENT_STORAGE_KEY, JSON.stringify(next));
        } catch (e) {
          console.warn('LocalStorage save error:', e);
        }

        // 2. Silent optional background telemetry to /api/progress if backend exists (never blocks UI)
        if (typeof navigator !== 'undefined' && navigator.onLine) {
          if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
          syncTimeoutRef.current = setTimeout(() => {
            fetch(`/api/progress/${next.userId}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: next.userId,
                userName: next.userName,
                currentPhase: next.currentPhase,
                quizCompleted: next.quizSubmitted,
                quizScore: next.quizScore,
                casesProgress: next.cases,
                answers: {
                  q1: next.comparisonQ1,
                  q2: next.comparisonQ2,
                  q3: next.comparisonQ3,
                  q4: next.comparisonQ4,
                  toolsChosen: next.toolsChosen,
                  hesitationPoint: next.hesitationPoint,
                  ownPvSentences: next.ownPvSentences,
                  selfCheckReflection: next.selfCheckReflection,
                },
                checklists: {
                  c1: next.checklistSelf1,
                  c2: next.checklistSelf2,
                  c3: next.checklistSelf3,
                },
              }),
            })
              .then((res) => {
                if (res.ok) setSyncStatus('synced');
              })
              .catch(() => {
                // Silent fallback on static hosts (Netlify/GitHub Pages)
                setSyncStatus('local');
              });
          }, 1200);
        }

        return next;
      });
    },
    []
  );

  // Reset student device data
  const resetAll = useCallback(() => {
    try {
      localStorage.removeItem(STUDENT_STORAGE_KEY);
    } catch {
      // ignore
    }
    const uid = 'tn_' + Math.random().toString(36).substring(2, 9);
    try {
      localStorage.setItem(USER_ID_KEY, uid);
    } catch {
      // ignore
    }
    const fresh: ClassroomData = {
      ...DEFAULT_STATE,
      userId: uid,
      audioEnabled: false,
    };
    setData(fresh);
    try {
      localStorage.setItem(STUDENT_STORAGE_KEY, JSON.stringify(fresh));
    } catch {
      // ignore
    }
  }, []);

  return {
    data,
    updateData,
    isOnline,
    syncStatus,
    isInitialized,
    resetAll,
  };
}
