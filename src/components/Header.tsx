import React from 'react';
import {
  Printer,
  Volume2,
  VolumeX,
  Type,
  Wifi,
  WifiOff,
  CloudCheck,
  Shield,
  Award,
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { sounds } from '../utils/audio';

interface HeaderProps {
  progressPercentage: number;
  syncStatus: 'synced' | 'syncing' | 'offline' | 'saved-offline' | 'error';
  isOnline: boolean;
  beamerMode: boolean;
  onToggleBeamerMode: () => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  teacherMode: boolean;
  onOpenTeacherModal: () => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  progressPercentage,
  syncStatus,
  isOnline,
  beamerMode,
  onToggleBeamerMode,
  audioEnabled,
  onToggleAudio,
  teacherMode,
  onOpenTeacherModal,
  onPrint,
}) => {
  return (
    <header className="bg-slate-900/95 backdrop-blur-md text-white sticky top-0 z-40 border-b border-slate-800 shadow-xl no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Logo & Course Info */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-500 flex items-center justify-center font-black text-xl shadow-lg shadow-blue-500/20 border border-blue-400/30">
              §
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded-full">
                  CE08 U3 • Palliative Care III
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  J. Rosenow (M.A. Pflegepädagogik)
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2 mt-0.5">
                <span>Patientenverfügung – Strafrecht I</span>
                <span className="text-xs font-medium text-slate-400 hidden md:inline">
                  (Guided Classroom)
                </span>
              </h1>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-2.5">
            {/* Sync & Connectivity Badge */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition ${
                !isOnline
                  ? 'bg-amber-950/40 text-amber-300 border-amber-500/30'
                  : syncStatus === 'syncing'
                  ? 'bg-blue-950/40 text-blue-300 border-blue-500/30'
                  : 'bg-slate-800/80 text-emerald-300 border-emerald-500/30'
              }`}
              title={
                !isOnline
                  ? 'Offline-Modus aktiv: Daten werden lokal gesichert'
                  : syncStatus === 'syncing'
                  ? 'Synchronisiere mit Classroom-Server...'
                  : 'Verbunden & synchronisiert'
              }
            >
              {!isOnline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Offline</span>
                </>
              ) : syncStatus === 'syncing' ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                  <span className="hidden sm:inline">Sync...</span>
                </>
              ) : (
                <>
                  <CloudCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Online</span>
                </>
              )}
            </div>

            {/* PWA Install Button */}
            <PWAInstallButton />

            {/* Audio Toggle */}
            <button
              onClick={() => {
                onToggleAudio();
                if (!audioEnabled) sounds.playCorrect();
              }}
              className={`p-2 rounded-xl text-xs font-medium border transition ${
                audioEnabled
                  ? 'bg-slate-800 text-blue-400 border-slate-700 hover:bg-slate-700'
                  : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-400'
              }`}
              title={audioEnabled ? 'Sound-Effekte aktiv' : 'Sound-Effekte stumm'}
              aria-label="Sound Feedback an/aus"
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Beamer A+ Font scaling */}
            <button
              onClick={onToggleBeamerMode}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition ${
                beamerMode
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
              title="Schriftgröße für Beamer/Präsentation vergrößern"
            >
              <Type className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Beamer A+</span>
            </button>

            {/* Print / PDF Button */}
            <button
              onClick={onPrint}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-900/30 flex items-center gap-1.5 transition active:scale-95"
              title="Handout / Dokumentation drucken oder als PDF sichern"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PDF / Druck</span>
            </button>

            {/* Teacher Mode Button */}
            <button
              onClick={onOpenTeacherModal}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition ${
                teacherMode
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
              title="Dozenten-Cockpit öffnen"
            >
              <Shield className={`w-3.5 h-3.5 ${teacherMode ? 'text-amber-400' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">Dozent</span>
              {teacherMode && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
