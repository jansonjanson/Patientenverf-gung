import React, { useState } from 'react';
import { AlertTriangle, Trash2, X, ShieldAlert, CheckCircle2, RotateCcw } from 'lucide-react';

interface StudentResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetAll: () => void;
}

export const StudentResetModal: React.FC<StudentResetModalProps> = ({
  isOpen,
  onClose,
  onResetAll,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [typedConfirmation, setTypedConfirmation] = useState('');

  if (!isOpen) return null;

  const handleClose = () => {
    setStep(1);
    setTypedConfirmation('');
    onClose();
  };

  const handleConfirmReset = () => {
    onResetAll();
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white text-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative border-4 border-rose-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-2xl bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: FIRST SAFETY WARNING */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-600 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-rose-800 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                  Sicherheitsschritt 1 von 2
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Lerndaten wirklich zurücksetzen?
                </h3>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 text-xs sm:text-sm text-rose-950 font-medium leading-relaxed space-y-2">
              <p>
                <strong>Achtung:</strong> Bei diesem Vorgang werden <u>alle lokalen Eingaben</u> auf diesem Gerät vollständig gelöscht:
              </p>
              <ul className="list-disc list-inside space-y-1 font-semibold text-rose-900">
                <li>Ihre Antworten im Präzisions-Check (Quiz)</li>
                <li>Ihr Stolperstein-Protokoll & Beispielsätze</li>
                <li>Ihre 4 Leitfragen im Tandem-Vergleich</li>
                <li>Ihre Fallreparaturen im Rechts-Konsil</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={handleClose}
                className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition cursor-pointer"
              >
                Abbrechen
              </button>

              <button
                onClick={() => setStep(2)}
                className="px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition cursor-pointer"
              >
                <span>Weiter zu Sicherungsschritt 2 ➔</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SECOND SAFETY CONFIRMATION (TYPE 'LÖSCHEN') */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-rose-800 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                  Zweifache Sicherung • Schritt 2
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Letzte Bestätigung erforderlich
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              Um eine versehentliche Löschung zu vermeiden, tippen Sie bitte das Wort <strong className="text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded font-black">LÖSCHEN</strong> in das Feld ein:
            </p>

            <input
              type="text"
              value={typedConfirmation}
              onChange={(e) => setTypedConfirmation(e.target.value)}
              placeholder="Tippen Sie LÖSCHEN ein..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border-2 border-rose-300 text-sm font-black text-slate-900 uppercase tracking-widest placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
            />

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition cursor-pointer"
              >
                Zurück
              </button>

              <button
                disabled={typedConfirmation.trim().toUpperCase() !== 'LÖSCHEN'}
                onClick={handleConfirmReset}
                className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition shadow-md ${
                  typedConfirmation.trim().toUpperCase() === 'LÖSCHEN'
                    ? 'bg-rose-600 hover:bg-rose-700 text-white cursor-pointer active:scale-95'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                }`}
              >
                <Trash2 className="w-4 h-4" />
                <span>Endgültig alle Lernfortschritte zurücksetzen</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
