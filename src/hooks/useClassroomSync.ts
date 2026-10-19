import { useState, useEffect, useCallback } from 'react';

export interface CaseState {
  wenn: string;
  dann: string;
  wennReason?: string;
  dannReason?: string;
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
  creationInsights: string;
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
  // Explicit completion tracking
  completedPhases: number[];
  // Global Settings
  audioEnabled: boolean;
  beamerMode: boolean;
  teacherMode: boolean;
  lastUpdated: string;
}

const DEFAULT_CASES: Record<number, CaseState> = {
  1: { wenn: '', dann: '', wennReason: '', dannReason: '', diagnosis: [], diagnosisText: '', isUnlocked: false, completed: false },
  2: { wenn: '', dann: '', wennReason: '', dannReason: '', diagnosis: [], diagnosisText: '', isUnlocked: false, completed: false },
  3: { wenn: '', dann: '', wennReason: '', dannReason: '', diagnosis: [], diagnosisText: '', isUnlocked: false, completed: false },
  4: { wenn: '', dann: '', wennReason: '', dannReason: '', diagnosis: [], diagnosisText: '', isUnlocked: false, completed: false },
  5: { wenn: '', dann: '', wennReason: '', dannReason: '', diagnosis: [], diagnosisText: '', isUnlocked: false, completed: false },
  6: { wenn: '', dann: '', wennReason: '', dannReason: '', diagnosis: [], diagnosisText: '', isUnlocked: false, completed: false },
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
  creationInsights: '',
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
  completedPhases: [],
  audioEnabled: false,
  beamerMode: false,
  teacherMode: false,
  lastUpdated: new Date().toISOString(),
};

// Local storage key for persistent offline learning
export const STUDENT_STORAGE_KEY = 'pv_strafrecht_student_state_v1';
const USER_ID_KEY = 'pv_strafrecht_student_uid';

export function useClassroomSync() {
  const [data, setData] = useState<ClassroomData>(DEFAULT_STATE);
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [syncStatus] = useState<'local'>('local');
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Initialize from LocalStorage (purely local, safe and isolated per device)
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
          audioEnabled: parsed.audioEnabled === true,
          cases: { ...DEFAULT_CASES, ...(parsed.cases || {}) },
        };
      }
    } catch (e) {
      console.warn('LocalStorage read note:', e);
    }

    setData(initialData);
    setIsInitialized(true);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Update data: immediately and reliably saves to localStorage
  const updateData = useCallback(
    (updater: Partial<ClassroomData> | ((prev: ClassroomData) => ClassroomData)) => {
      setData((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
        next.lastUpdated = new Date().toISOString();

        // Save immediately to LocalStorage under 'pv_strafrecht_student_state_v1'
        try {
          localStorage.setItem(STUDENT_STORAGE_KEY, JSON.stringify(next));
        } catch (e) {
          console.warn('LocalStorage save error:', e);
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
