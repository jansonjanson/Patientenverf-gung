import React, { useState } from 'react';
import { AlertTriangle, Trash2, X, RotateCcw, CheckSquare } from 'lucide-react';

interface ResetConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReset: () => void;
}

export const ResetConfirmationModal: React.FC<ResetConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirmReset,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  if (!isOpen) return null;

  const isConfirmed = isChecked && confirmText.trim().toUpperCase() === 'ZURÜCKSETZEN';

  const handleReset = () => {
    if (!isConfirmed) return;
    onConfirmReset();
    setIsChecked(false);
    setConfirmText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-rose-200 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-rose-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-600 shrink-0 shadow-sm">
              <RotateCcw className="w-6 h-6 animate-spin-once" />
            </div>
            <div>
              <span className="text-2xs font-black uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                Zweifache Sicherheitssperre
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                Trainingsstand zurücksetzen?
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning Body */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-700">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 font-medium leading-relaxed flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p>
              Achtung: Dadurch werden Ihre eingegebenen Notizen, Selbstreflexionen, Quiz-Antworten und reparierten WENN-DANN-Klauseln aus allen 6 Phasen gelöscht und der Fortschritt auf 0% zurückgesetzt.
            </p>
          </div>

          {/* Double Security Step 1: Checkbox */}
          <div className="space-y-2 pt-1">
            <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-rose-600 focus:ring-rose-500 cursor-pointer"
              />
              <span className="font-extrabold text-slate-900 text-xs leading-relaxed">
                1. Sicherheitsbestätigung: Ich verstehe, dass meine bisherigen Eingaben und Notizen unwiderruflich gelöscht werden.
              </span>
            </label>
          </div>

          {/* Double Security Step 2: Text Match */}
          <div className="space-y-1.5">
            <label className="block font-black text-slate-900 text-xs">
              2. Sicherheitsbestätigung: Tippen Sie das Wort <span className="text-rose-600 underline font-black">ZURÜCKSETZEN</span> ein:
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="ZURÜCKSETZEN"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-sm font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-500 uppercase tracking-wider"
            />
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
          >
            Abbrechen
          </button>

          <button
            onClick={handleReset}
            disabled={!isConfirmed}
            className={`px-5 py-2.5 rounded-xl font-black text-xs transition flex items-center gap-2 ${
              isConfirmed
                ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/30 cursor-pointer animate-pulse'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            <span>Neu starten & Daten löschen</span>
          </button>
        </div>
      </div>
    </div>
  );
};
