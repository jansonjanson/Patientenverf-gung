import React from 'react';
import {
  Printer,
  WifiOff,
  ShieldCheck,
  Shield,
  FileText,
  BookOpen,
  RotateCcw,
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  progressPercentage: number;
  syncStatus: 'synced' | 'syncing' | 'offline' | 'saved-offline' | 'error' | 'local';
  isOnline: boolean;
  teacherMode: boolean;
  onOpenTeacherModal: () => void;
  onOpenResetModal?: () => void;
  onPrint: () => void;
  onExportWord?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  syncStatus: _syncStatus,
  isOnline,
  teacherMode,
  onOpenTeacherModal,
  onOpenResetModal,
  onPrint,
  onExportWord,
}) => {
  return (
    <header className="bg-white/95 backdrop-blur-md text-slate-900 sticky top-0 z-40 border-b border-slate-200 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Logo & Course Info */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-xl text-white shadow-md shadow-blue-500/20">
              §
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/80 px-2 py-0.5 rounded-full">
                  CE08 U3 • Palliative Care III
                </span>
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  J. Rosenow (M.A. Pflegepädagogik)
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 flex items-center gap-2 mt-0.5">
                <span>Patientenverfügung – Strafrecht I</span>
                <span className="text-xs font-medium text-slate-500 hidden md:inline">
                  (Guided Classroom)
                </span>
              </h1>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-2.5">
            {/* Sync & Local Storage Badge */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition ${
                !isOnline
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}
              title="Alle Eingaben werden isoliert und sicher auf diesem Endgerät gespeichert"
            >
              {!isOnline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden sm:inline">Offline</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">Lokal gesichert</span>
                </>
              )}
            </div>

            {/* PWA Install Button */}
            <PWAInstallButton />

            {/* Digitales Gesetzbuch / PDF Handout Button */}
            <button
              onClick={onPrint}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer border border-amber-300"
              title="Komplettes Gesetzbuch & Schulungshandout mit allen Wissensinhalten und Video-Links öffnen"
            >
              <BookOpen className="w-3.5 h-3.5 text-slate-950" />
              <span className="hidden sm:inline font-black">Gesetzbuch</span>
            </button>

            {/* Word (.doc) Export Button */}
            {onExportWord && (
              <button
                onClick={onExportWord}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                title="Gesamtes Lerntagebuch als Word-kompatible Datei (.doc) herunterladen"
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Word (.doc)</span>
              </button>
            )}

            {/* Reset Button (Zweifache Sicherheit) */}
            {onOpenResetModal && (
              <button
                onClick={onOpenResetModal}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-300 hover:border-rose-300 flex items-center gap-1.5 transition cursor-pointer"
                title="Eingaben & Fortschritt zurücksetzen (mit zweifacher Sicherheit)"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500 hover:text-rose-600" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}

            {/* Teacher Mode Button */}
            <button
              onClick={onOpenTeacherModal}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition cursor-pointer ${
                teacherMode
                  ? 'bg-amber-50 text-amber-900 border-amber-300 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
              title="Dozenten-Cockpit öffnen"
            >
              <Shield className={`w-3.5 h-3.5 ${teacherMode ? 'text-amber-600' : 'text-slate-500'}`} />
              <span className="hidden sm:inline">Dozent</span>
              {teacherMode && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
