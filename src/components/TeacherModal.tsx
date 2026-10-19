import React, { useState } from 'react';
import { ShieldCheck, RotateCcw, X, Check, AlertCircle, Sparkles, Lock } from 'lucide-react';

interface TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacherMode: boolean;
  onToggleTeacherMode: (active: boolean) => void;
  onResetAllData: () => void;
}

export const TeacherModal: React.FC<TeacherModalProps> = ({
  isOpen,
  onClose,
  teacherMode,
  onToggleTeacherMode,
  onResetAllData,
}) => {
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const handleUnlock = () => {
    // PIN updated to 'Janson' (case-insensitive)
    if (pin.trim().toLowerCase() === 'janson') {
      onToggleTeacherMode(true);
      setPinError(false);
      setPin('');
    } else {
      setPinError(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm no-print animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-slate-800 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-sm">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Dozenten-Cockpit</h3>
              <p className="text-xs text-slate-500 font-medium">
                J. Rosenow (M.A. Pflegepädagogik) • Palliative Care III
              </p>
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
          <div className="bg-amber-50/70 border-2 border-amber-300 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-base font-bold text-amber-900">Dozenten-Modus aktivieren</h4>
                <p className="text-xs sm:text-sm text-amber-800 mt-1 leading-relaxed">
                  Schalten Sie alle 6 Fall-Musterlösungen im Rechts-Konsil für die gemeinsame Auswertung frei.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
              <input
                type="password"
                placeholder="Dozenten-PIN eingeben"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setPinError(false);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-amber-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium"
              />
              <button
                onClick={handleUnlock}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-xs cursor-pointer shrink-0"
              >
                Freischalten
              </button>
            </div>

            {pinError && (
              <p className="text-xs sm:text-sm text-rose-600 font-semibold flex items-center gap-1.5 pt-1">
                <AlertCircle className="w-4 h-4 shrink-0" />
                Ungültige PIN. Bitte autorisierte Dozenten-PIN eingeben.
              </p>
            )}
          </div>
        ) : (
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-emerald-800 text-sm sm:text-base font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Dozenten-Modus ist aktiv (autorisiert)
              </div>
              <button
                onClick={() => onToggleTeacherMode(false)}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition cursor-pointer"
              >
                Sperren
              </button>
            </div>

            <div className="pt-2 border-t border-emerald-200 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs sm:text-sm text-slate-700">
                Musterlösungen der 6 Fälle für Unterrichtsauswertung / Beamer:
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                Alle 6 Musterlösungen freigeschaltet
              </span>
            </div>
          </div>
        )}

        {/* Local Storage Information Box */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm text-slate-600 space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>Datenschutz & lokale Speicherung</span>
          </div>
          <p className="leading-relaxed">
            Alle Bearbeitungsstände, Notizen und Fallanalysen werden ausschließlich lokal auf diesem Endgerät gespeichert. Es findet keine Übertragung an externe Server statt.
          </p>
        </div>

        {/* Inline Confirmation for Reset */}
        {confirmReset && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-xs sm:text-sm text-rose-950 space-y-2 animate-in fade-in">
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
                className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition cursor-pointer"
              >
                Ja, alles zurücksetzen
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold transition cursor-pointer"
              >
                Abbrechen
              </button>
            </div>
          </div>
        )}

        {/* Reset & Close Buttons */}
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
            className="ml-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 border border-slate-300 transition cursor-pointer"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
