import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, BookOpen, FileText, CheckCircle2, X, Sparkles, Scale, Download } from 'lucide-react';
import { ClassroomData } from '../hooks/useClassroomSync';
import { exportToWord } from '../utils/exportUtils';
import { CASES_DATA } from '../utils/legal-learning';

interface CompletionSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ClassroomData;
  onOpenGesetzbuch: () => void;
}

export const CompletionSummaryModal: React.FC<CompletionSummaryModalProps> = ({
  isOpen,
  onClose,
  data,
  onOpenGesetzbuch,
}) => {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899'],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const casesCompletedCount = Object.values(data.cases || {}).filter((c) => c.completed).length;

  const handleExportWord = () => {
    exportToWord({
      title: 'Patientenverfügung & Strafrecht I – Gesamtdokumentation',
      subtitle: 'Fachweiterbildung Palliative Care (CE08 U3) • Lehrinhalte nach Großkopf & Klein',
      sections: [
        {
          heading: '1. Phase 1: Präzisions-Check (Rechtsinstrumente)',
          content: {
            'Erreichte Punktzahl im Quiz': `${data.quizScore} von 4 Punkten`,
            'Quiz-Status': data.quizSubmitted ? 'Erfolgreich absolviert' : 'Offen',
          },
        },
        {
          heading: '2. Phase 2: Selbsterfahrung & Erstellungshilfen',
          content: {
            'Gewählte Erstellungshilfen': data.toolsChosen || 'Keine Angabe',
            'Längster Zögerungspunkt': data.hesitationPoint || 'Keine Angabe',
            'Eindrücke & Erkenntnisse': data.creationInsights || 'Keine Angabe',
            'Eigene Beispielklausel': data.ownPvSentences || 'Keine Angabe',
          },
        },
        {
          heading: '3. Phase 3: Tandem-Vergleich der Erstellungshilfen',
          content: {
            '1. Gemeinsamkeiten': data.comparisonQ1 || 'Keine Angabe',
            '2. Unterschiede': data.comparisonQ2 || 'Keine Angabe',
            '3. Lücken / Überraschungen': data.comparisonQ3 || 'Keine Angabe',
            '4. Praxistauglichkeit': data.comparisonQ4 || 'Keine Angabe',
          },
        },
        {
          heading: '4. Phase 5: Eigen-Check & Stresstest',
          content: {
            'WENN-Kriterium erfüllt': data.checklistSelf1 ? 'Ja' : 'Nein',
            'DANN-Kriterium erfüllt': data.checklistSelf2 ? 'Ja' : 'Nein',
            'Detail-Auswertung': data.selfCheckReflection || 'Keine Angabe',
          },
        },
        {
          heading: '5. Phase 6: Rechts-Konsil (6 Praxisfälle)',
          content: Object.fromEntries(
            CASES_DATA.map((c) => [
              `Fall ${c.id}: ${c.title}`,
              `Fehlerbezeichnung: ${(data.cases[c.id]?.diagnosis || []).join(', ') || 'Keine Fehler gewählt'} | Reparierter WENN-Teil: ${data.cases[c.id]?.wenn || '-'} | Reparierter DANN-Teil: ${data.cases[c.id]?.dann || '-'} | Musterlösung: ${c.officialSolution}`,
            ])
          ),
        },
      ],
    }, 'patientenverfuegung_gesamte_schulungsdokumentation.doc');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
      <div className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 relative border-4 border-amber-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-2xl bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebratory Banner */}
        <div className="text-center space-y-3 pt-2">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-amber-600 mx-auto shadow-md animate-bounce">
            <Award className="w-9 h-9" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full">
              Training Erfolgreich Absolviert
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
              Herzlichen Glückwunsch!
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-1 font-medium">
              Sie haben alle 6 Phasen des Classroom-Trainings <strong>„Patientenverfügung & Strafrecht I“</strong> zur rechtssicheren WENN-DANN-Formulierung absolviert.
            </p>
          </div>
        </div>

        {/* Achievement Summary Grid */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Ihre Trainingsergebnisse im Überblick:</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between font-bold">
              <span className="text-slate-700">1. Präzisions-Check (Quiz):</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {data.quizScore}/4 Punkte
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between font-bold">
              <span className="text-slate-700">2. Erstellungshilfen-Test:</span>
              <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 truncate max-w-[120px]">
                {data.toolsChosen ? '✓ Erprobt' : 'Erledigt'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between font-bold">
              <span className="text-slate-700">3. Tandem-Vergleich:</span>
              <span className="text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                4 Fragen beantwortet
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between font-bold">
              <span className="text-slate-700">4. WENN-DANN BGH-Formel:</span>
              <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                ✓ Verstanden
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between font-bold">
              <span className="text-slate-700">5. Eigen-Check:</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {[data.checklistSelf1, data.checklistSelf2].filter(Boolean).length}/2 Kriterien
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between font-bold">
              <span className="text-slate-700">6. Rechts-Konsil:</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {casesCompletedCount}/6 Fälle repariert
              </span>
            </div>
          </div>

          {/* Own Clause Summary Box */}
          {data.ownPvSentences?.trim() && (
            <div className="pt-2 border-t border-slate-200 text-xs">
              <span className="font-bold text-slate-800 block mb-1">
                Ihre erprobte Beispielklausel aus dem Stresstest:
              </span>
              <p className="italic text-slate-900 bg-white p-3 rounded-xl border border-slate-200 font-semibold leading-relaxed">
                „{data.ownPvSentences.trim().replace(/^[„"]|[“"]$/g, '')}“
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          <button
            onClick={() => {
              onClose();
              onOpenGesetzbuch();
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md border border-amber-300 transition cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-slate-950" />
            <span>Gesetzbuch & Handout öffnen</span>
          </button>

          <button
            onClick={handleExportWord}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Als Word (.doc) exportieren</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs sm:text-sm transition cursor-pointer"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
