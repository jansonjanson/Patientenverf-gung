import React, { useState, useEffect } from 'react';
import { ShieldCheck, Video, Users, RotateCcw, X, Check, AlertCircle, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

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

  useEffect(() => {
    if (isOpen) {
      fetchStats();
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
      // offline or error
    } finally {
      setLoadingStats(false);
    }
  };

  const handleUnlock = () => {
    if (pin.trim() === '1358') {
      sounds.playTriumph();
      onToggleTeacherMode(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleApplyVideo = () => {
    onUpdateVideoUrl(videoInput);
    setVideoSuccess(true);
    sounds.playCorrect();
    setTimeout(() => setVideoSuccess(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md no-print animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl text-slate-100 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">Dozenten-Cockpit</h3>
              <p className="text-xs text-slate-400">J. Rosenow (M.A. Pflegepädagogik) • Palliative Care III</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Auth / Active Banner */}
        {!teacherMode ? (
          <div className="bg-slate-800/80 border border-amber-500/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-amber-300">Dozenten-Modus aktivieren</h4>
                <p className="text-xs text-slate-300 mt-1">
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
                className="flex-1 px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button
                onClick={handleUnlock}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow"
              >
                Freischalten
              </button>
            </div>
            {pinError && (
              <p className="text-xs text-rose-400 font-semibold flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> Ungültige PIN. (Hinweis: Die Standard-PIN ist 1358 gemäß § 1358 BGB).
              </p>
            )}
          </div>
        ) : (
          <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-emerald-300 text-sm font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Dozenten-Modus ist aktiv – Alle Musterlösungen & Beamer-Tools freigeschaltet
            </div>
            <button
              onClick={() => onToggleTeacherMode(false)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              Deaktivieren
            </button>
          </div>
        )}

        {/* Live Classroom Stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              Live Classroom-Übersicht
            </h4>
            <button
              onClick={fetchStats}
              disabled={loadingStats}
              className="text-xs text-blue-400 hover:text-blue-300"
            >
              {loadingStats ? 'Lade Daten...' : 'Aktualisieren'}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60 text-center">
              <div className="text-2xl font-black text-white">{stats?.totalParticipants || 0}</div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">Teilnehmer:innen</div>
            </div>
            <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60 text-center">
              <div className="text-2xl font-black text-emerald-400">{stats?.quizPassedCount || 0}</div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">Quiz 100% gelöst</div>
            </div>
            <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60 text-center">
              <div className="text-2xl font-black text-blue-400">{stats?.averageCasesCompleted || '0'}</div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">Ø Fälle bearbeitet</div>
            </div>
            <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60 text-center">
              <div className="text-2xl font-black text-amber-400">
                {stats?.phaseDistribution?.[6] || 0}
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">In Phase 6 (Rechts-Konsil)</div>
            </div>
          </div>
        </div>

        {/* Video Embedding option */}
        <div className="space-y-3 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/60">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Video className="w-4 h-4 text-purple-400" />
            Impuls-Video anpassen / YouTube einbetten
          </h4>
          <p className="text-xs text-slate-400">
            Fügen Sie einen beliebigen YouTube-Link ein, um das Video in Schritt 1 direkt im Player einzubetten:
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="https://www.youtube.com/watch?v=..."
              value={videoInput}
              onChange={(e) => setVideoInput(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleApplyVideo}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center gap-1.5"
            >
              {videoSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : 'Übernehmen'}
            </button>
          </div>
        </div>

        {/* Reset & Close */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={() => {
              if (window.confirm('Möchten Sie die lokalen Daten auf diesem Endgerät zurücksetzen?')) {
                onResetAllData();
                onClose();
              }
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Eigene Eingaben zurücksetzen
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
