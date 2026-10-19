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
  // Global
  audioEnabled: boolean;
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
  customVideoUrl: '',
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
  audioEnabled: true,
  beamerMode: false,
  teacherMode: false,
  lastUpdated: new Date().toISOString(),
};

const LOCAL_STORAGE_KEY = 'guided_classroom_state_v2';
const USER_ID_KEY = 'guided_classroom_user_id';

export function useClassroomSync() {
  const [data, setData] = useState<ClassroomData>(DEFAULT_STATE);
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'offline' | 'saved-offline' | 'error'>('synced');
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize User ID and load local storage
  useEffect(() => {
    let uid = localStorage.getItem(USER_ID_KEY);
    if (!uid) {
      uid = 'user_' + Math.random().toString(36).substring(2, 9);
      localStorage.setItem(USER_ID_KEY, uid);
    }

    const localRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
    let initialData = { ...DEFAULT_STATE, userId: uid };
    if (localRaw) {
      try {
        const parsed = JSON.parse(localRaw);
        initialData = {
          ...initialData,
          ...parsed,
          userId: uid,
          cases: { ...DEFAULT_CASES, ...(parsed.cases || {}) },
        };
      } catch (e) {
        console.warn('Failed to parse localStorage cache', e);
      }
    }

    setData(initialData);
    setIsInitialized(true);

    // Initial sync from backend
    if (navigator.onLine) {
      fetch(`/api/progress/${uid}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((resp) => {
          if (resp?.success && resp?.progress) {
            setData((prev) => ({
              ...prev,
              userName: resp.progress.userName || prev.userName,
              currentPhase: resp.progress.currentPhase || prev.currentPhase,
              quizScore: resp.progress.quizScore ?? prev.quizScore,
              quizSubmitted: resp.progress.quizCompleted ?? prev.quizSubmitted,
              cases: { ...prev.cases, ...(resp.progress.casesProgress || {}) },
            }));
          }
        })
        .catch(() => {
          // offline or backend not reached
        });
    }

    // Network status listeners
    const handleOnline = () => {
      setIsOnline(true);
      setSyncStatus('syncing');
      triggerBackendSync(initialData);
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

  // Sync to Backend helper
  const triggerBackendSync = useCallback(async (stateToSync: ClassroomData) => {
    if (!navigator.onLine) {
      setSyncStatus('saved-offline');
      return;
    }

    setSyncStatus('syncing');
    try {
      const payload = {
        userId: stateToSync.userId,
        userName: stateToSync.userName,
        currentPhase: stateToSync.currentPhase,
        quizCompleted: stateToSync.quizSubmitted,
        quizScore: stateToSync.quizScore,
        casesProgress: stateToSync.cases,
        answers: {
          q1: stateToSync.comparisonQ1,
          q2: stateToSync.comparisonQ2,
          q3: stateToSync.comparisonQ3,
          q4: stateToSync.comparisonQ4,
          toolsChosen: stateToSync.toolsChosen,
          hesitationPoint: stateToSync.hesitationPoint,
          ownPvSentences: stateToSync.ownPvSentences,
          selfCheckReflection: stateToSync.selfCheckReflection,
        },
        checklists: {
          c1: stateToSync.checklistSelf1,
          c2: stateToSync.checklistSelf2,
          c3: stateToSync.checklistSelf3,
        },
      };

      const res = await fetch(`/api/progress/${stateToSync.userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSyncStatus('synced');
      } else {
        setSyncStatus('error');
      }
    } catch {
      setSyncStatus('saved-offline');
    }
  }, []);

  // Update data with debounced backend sync & immediate localStorage save
  const updateData = useCallback(
    (updater: Partial<ClassroomData> | ((prev: ClassroomData) => ClassroomData)) => {
      setData((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
        next.lastUpdated = new Date().toISOString();

        // Save immediately to local storage for offline resilience
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
        } catch (e) {
          console.warn('Failed to write to localStorage', e);
        }

        // Debounce network sync
        if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
        syncTimeoutRef.current = setTimeout(() => {
          triggerBackendSync(next);
        }, 800);

        return next;
      });
    },
    [triggerBackendSync]
  );

  const resetAll = useCallback(() => {
    if (typeof window !== 'undefined' && window.confirm('Möchten Sie wirklich alle Einträge auf diesem Gerät zurücksetzen?')) {
      const uid = localStorage.getItem(USER_ID_KEY) || 'user_' + Math.random().toString(36).substring(2, 9);
      const fresh = { ...DEFAULT_STATE, userId: uid };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fresh));
      setData(fresh);
      triggerBackendSync(fresh);
    }
  }, [triggerBackendSync]);

  return {
    data,
    updateData,
    isOnline,
    syncStatus,
    isInitialized,
    resetAll,
  };
}
