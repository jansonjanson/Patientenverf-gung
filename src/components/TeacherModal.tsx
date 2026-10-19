import React, { useState, useEffect } from 'react';
import { ShieldCheck, Video, Users, RotateCcw, X, Check, AlertCircle, Sparkles } from 'lucide-react';

interface TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacherMode: boolean;
  onToggleTeacherMode: (active: boolean) => void;
  customVideoUrl: string;
  onUpdateVideoUrl: (url: string) => void;
  onResetAllData: () => void;
}

interface ClassroomStats {
  totalParticipants: number;
  phaseDistribution: Record<number, number>;
  quizPassedCount: number;
  averageCasesCompleted: string | number;
  activeLearners: Array<{
    userId: string;
    userName: string;
    currentPhase: number;
    lastUpdated: string;
  }>;
}

export const TeacherModal: React.FC<TeacherModalProps> = ({
  isOpen,
  onClose,
  teacherMode,
  onToggleTeacherMode,
  customVideoUrl,
  onUpdateVideoUrl,
  onResetAllData,
}) => {
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [videoInput, setVideoInput] = useState(customVideoUrl || '');
  const [videoSuccess, setVideoSuccess] = useState(false);
  const [stats, setStats] = useState<ClassroomStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchStats();
      setConfirmReset(false);
    }
  }, [isOpen]);

  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const res = await fetch('/api/classroom/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch {
      // offline or static host fallback
    } finally {
      setLoadingStats(false);
    }
  };

  const handleUnlock = () => {
    if (pin.trim() === '1358') {
      onToggleTeacherMode(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleApplyVideo = () => {
    onUpdateVideoUrl(videoInput);
    setVideoSuccess(true);
    setTimeout(() => setVideoSuccess(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm no-print animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl text-slate-800 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-sm">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Dozenten-Cockpit</h3>
              <p className="text-xs text-slate-500">J. Rosenow (M.A. Pflegepädagogik) • Palliative Care III</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Auth / Active Banner */}
        {!teacherMode ? (
          <div className="bg-amber-50/70 border border-amber-300 rounded-2xl p-5 space-y-3">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-amber-900">Dozenten-Modus aktivieren</h4>
                <p className="text-xs text-amber-800 mt-1">
                  Schalten Sie alle 6 Fall-Musterlösungen frei, binden Sie eigene Lehrvideos ein und sehen Sie Live-Statistiken Ihrer Lerngruppe.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2">
              <input
                type="password"
                placeholder="Dozenten-PIN (1358)"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setPinError(false);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                className="flex-1 px-4 py-2 rounded-xl bg-white border border-amber-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button
                onClick={handleUnlock}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-xs cursor-pointer"
              >
                Freischalten
              </button>
            </div>
            {pinError && (
              <p className="text-xs text-rose-600 font-semibold flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> Ungültige PIN. (Hinweis: Die Standard-PIN ist 1358 gemäß § 1358 BGB).
              </p>
            )}
          </div>
        ) : (
          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-emerald-800 text-sm font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Dozenten-Modus ist aktiv (PIN 1358 autorisiert)
              </div>
              <button
                onClick={() => onToggleTeacherMode(false)}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition cursor-pointer"
              >
                Sperren
              </button>
            </div>
            <div className="pt-2 border-t border-emerald-200 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-slate-700">
                Musterlösungen der 6 Fälle für Unterrichtsauswertung / Beamer:
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                Alle 6 Musterlösungen freigeschaltet
              </span>
            </div>
          </div>
        )}

        {/* Live Classroom Stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              Live Classroom-Übersicht
            </h4>
            <button
              onClick={fetchStats}
              disabled={loadingStats}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
            >
              {loadingStats ? 'Lade Daten...' : 'Aktualisieren'}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
              <div className="text-2xl font-black text-slate-900">{stats?.totalParticipants || 0}</div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">Teilnehmer:innen</div>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
              <div className="text-2xl font-black text-emerald-600">{stats?.quizPassedCount || 0}</div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">Quiz 100% gelöst</div>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
              <div className="text-2xl font-black text-blue-600">{stats?.averageCasesCompleted || '0'}</div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">Ø Fälle bearbeitet</div>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
              <div className="text-2xl font-black text-amber-600">
                {stats?.phaseDistribution?.[6] || 0}
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-0.5">In Phase 6 (Rechts-Konsil)</div>
            </div>
          </div>
        </div>

        {/* Video Embedding option */}
        <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Video className="w-4 h-4 text-purple-600" />
            Impuls-Video anpassen / YouTube einbetten
          </h4>
          <p className="text-xs text-slate-600">
            Fügen Sie einen beliebigen YouTube-Link ein, um das Video in Schritt 1 direkt im Player einzubetten:
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="https://youtu.be/..."
              value={videoInput}
              onChange={(e) => setVideoInput(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
            />
            <button
              onClick={handleApplyVideo}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              {videoSuccess ? <Check className="w-4 h-4 text-white" /> : 'Übernehmen'}
            </button>
          </div>
        </div>

        {/* Inline Confirmation for Reset (Replaces window.confirm bug!) */}
        {confirmReset && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-xs text-rose-950 space-y-2 animate-in fade-in">
            <p className="font-bold">
              Möchten Sie alle lokalen Daten und Eingaben auf diesem Endgerät wirklich unwiderruflich zurücksetzen?
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  onResetAllData();
                  setConfirmReset(false);
                  onClose();
                }}
                className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition cursor-pointer"
              >
                Ja, alles zurücksetzen
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold transition cursor-pointer"
              >
                Abbrechen
              </button>
            </div>
          </div>
        )}

        {/* Reset & Close */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
          {!confirmReset && (
            <button
              onClick={() => setConfirmReset(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-rose-300 transition flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Eigene Gerätedaten zurücksetzen
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-auto px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 border border-slate-300 transition cursor-pointer"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
