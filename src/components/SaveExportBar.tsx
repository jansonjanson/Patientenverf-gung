import React, { useState } from 'react';
import { Save, FileText, Check, Download } from 'lucide-react';
import { exportToWord, exportToText, ExportData } from '../utils/exportUtils';

interface SaveExportBarProps {
  onManualSave?: () => void;
  exportData: ExportData;
  filenamePrefix: string;
  label?: string;
  className?: string;
}

export const SaveExportBar: React.FC<SaveExportBarProps> = ({
  onManualSave,
  exportData,
  filenamePrefix,
  label = 'Eingaben sichern:',
  className = '',
}) => {
  const [justSaved, setJustSaved] = useState(false);

  const handleSave = () => {
    if (onManualSave) {
      onManualSave();
    }
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2500);
  };

  const handleExportWord = () => {
    exportToWord(exportData, `${filenamePrefix}.doc`);
  };

  const handleExportText = () => {
    exportToText(exportData, `${filenamePrefix}.txt`);
  };

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 p-3 sm:p-3.5 bg-slate-50/90 rounded-xl border border-slate-200 text-xs text-slate-700 shadow-2xs ${className}`}
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold text-slate-800">{label}</span>
        {justSaved ? (
          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 animate-in fade-in duration-200">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            Lokal im Browser gespeichert!
          </span>
        ) : (
          <span className="text-slate-500 hidden sm:inline">
            (wird automatisch im Browser gesichert)
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Explicit Save button */}
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-2xs active:scale-95"
          title="Jetzt manuell im Browser speichern"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Speichern</span>
        </button>

        {/* Word (.doc) export */}
        <button
          type="button"
          onClick={handleExportWord}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-2xs active:scale-95"
          title="Als Word-kompatible Datei (.doc) exportieren"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Word (.doc)</span>
        </button>

        {/* Text (.txt) export */}
        <button
          type="button"
          onClick={handleExportText}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-800 text-white font-medium transition shadow-2xs active:scale-95"
          title="Als reine Textdatei (.txt) herunterladen"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Text (.txt)</span>
        </button>
      </div>
    </div>
  );
};
