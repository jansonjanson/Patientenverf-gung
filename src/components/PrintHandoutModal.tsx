import React from 'react';
import { X, Printer, CheckCircle, FileText, Scale } from 'lucide-react';
import { ClassroomData } from '../hooks/useClassroomSync';
import { CASES_DATA } from '../utils/legal-learning';

interface PrintHandoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ClassroomData;
}

export const PrintHandoutModal: React.FC<PrintHandoutModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-3xl max-w-4xl w-full p-6 sm:p-10 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        {/* Modal Controls (No print) */}
        <div className="flex items-center justify-between border-b pb-4 no-print">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Printer className="w-5 h-5 text-blue-600" />
              Druck- & Handout-Vorschau
            </h3>
            <p className="text-xs text-slate-500">
              Vollständiges Arbeits- & Ergebnisprotokoll für Ihre Kursunterlagen oder zum Speichern als PDF.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Jetzt drucken / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Content */}
        <div className="space-y-6 text-slate-900">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                  CE08 U3 • Palliative Care III
                </span>
                <h1 className="text-2xl font-black mt-0.5">
                  Arbeits- & Ergebnisprotokoll: Patientenverfügung – Strafrecht I
                </h1>
                <p className="text-xs text-slate-600 mt-1">
                  Dozent: J. Rosenow (M.A. Pflegepädagogik) • Literaturbasis: Großkopf & Klein (2019a, 2019b)
                </p>
              </div>
              <div className="text-right text-xs text-slate-500">
                <div>Datum: {new Date().toLocaleDateString('de-DE')}</div>
                <div className="font-semibold text-slate-800 mt-0.5">Teilnehmer-ID: {data.userId}</div>
              </div>
            </div>
          </div>

          {/* Phase 1 Summary */}
          <div className="space-y-2 border-b pb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              1. Arten der Verfügung & Begriffs-Check
            </h2>
            <div className="p-3 bg-slate-50 rounded-xl text-xs flex justify-between items-center">
              <span>Präzisions-Check (4 juristische Instrumente):</span>
              <span className="font-bold text-blue-700">
                {data.quizSubmitted ? `${data.quizScore} von 4 richtig gelöst` : 'Noch nicht eingereicht'}
              </span>
            </div>
          </div>

          {/* Phase 2 Summary */}
          <div className="space-y-2 border-b pb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              2. Selbsterfahrung: Erstellung einer Patientenverfügung
            </h2>
            <div className="text-xs space-y-2">
              <div>
                <strong>Gewählte Erstellungshilfen:</strong> {data.toolsChosen || '–'}
              </div>
              <div>
                <strong>Längster Zögerungspunkt:</strong> {data.hesitationPoint || '–'}
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong>Exemplarische Klausel aus eigener Verfügung:</strong>
                <p className="italic text-slate-700 mt-1">
                  {data.ownPvSentences || 'Keine Sätze notiert.'}
                </p>
              </div>
            </div>
          </div>

          {/* Phase 3 Summary */}
          <div className="space-y-2 border-b pb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              3. Systematischer Vergleich der Hilfsmittel
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <strong>1. Gemeinsamkeiten & Überschneidungen:</strong>
                <p className="text-slate-600 mt-1">{data.comparisonQ1 || '–'}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <strong>2. Unterschiede & Benutzerführung:</strong>
                <p className="text-slate-600 mt-1">{data.comparisonQ2 || '–'}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <strong>3. Blinde Flecken & Ergänzungsbedarf:</strong>
                <p className="text-slate-600 mt-1">{data.comparisonQ3 || '–'}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <strong>4. Offene Fragen aus Nutzersicht:</strong>
                <p className="text-slate-600 mt-1">{data.comparisonQ4 || '–'}</p>
              </div>
            </div>
          </div>

          {/* Phase 5 Summary */}
          <div className="space-y-2 border-b pb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              4. & 5. Eigen-Check nach Großkopf & Klein (2019a, 2019b)
            </h2>
            <div className="text-xs space-y-1">
              <div className="flex items-center gap-2">
                <span>{data.checklistSelf1 ? '☑' : '☐'}</span>
                <span>WENN-Prüfung: Krankheitszustand eindeutig bestimmt</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{data.checklistSelf2 ? '☑' : '☐'}</span>
                <span>DANN-Prüfung: Konkrete ärztliche/pflegerische Maßnahmen bestimmt</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{data.checklistSelf3 ? '☑' : '☐'}</span>
                <span>Kombination mit Vorsorgevollmacht geklärt</span>
              </div>
              {data.selfCheckReflection && (
                <div className="mt-2 p-3 bg-slate-50 rounded-xl">
                  <strong>Fazit zum Generator:</strong> {data.selfCheckReflection}
                </div>
              )}
            </div>
          </div>

          {/* Phase 6 Summary: 6 Cases */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              6. Rechts-Konsil: Die 6 Fälle im Vergleich zur Musterlösung
            </h2>

            <div className="space-y-3">
              {CASES_DATA.map((c) => {
                const caseState = data.cases[c.id];
                const wenn = caseState?.wenn?.trim();
                const dann = caseState?.dann?.trim();

                return (
                  <div key={c.id} className="p-3 bg-slate-50 rounded-xl border text-xs space-y-1.5 print-break-inside">
                    <div className="font-bold text-slate-900 flex justify-between">
                      <span>{c.title}</span>
                      <span className="text-slate-500 font-normal italic">
                        Original: „{c.quote}“
                      </span>
                    </div>

                    <div className="bg-white p-2.5 rounded-lg border text-blue-950">
                      <strong>Ihre Formulierung (WENN – DANN):</strong>
                      <p className="mt-0.5 italic">
                        {wenn || dann ? `„${wenn} ${dann}“` : 'Noch nicht formuliert'}
                      </p>
                    </div>

                    <div className="text-emerald-900 bg-emerald-50/80 p-2.5 rounded-lg border border-emerald-200">
                      <strong>Juristische Muster-Lösung (J. Rosenow):</strong>
                      <p className="mt-0.5">{c.officialSolution}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Literature citation */}
          <div className="text-[11px] text-slate-500 pt-4 border-t">
            <strong>Literatur:</strong> Großkopf, V. & Klein, H. (2019a). <em>Recht in Medizin und Pflege.</em> Spitta GmbH. • Großkopf, V. & Klein, H. (2019b). <em>Vorschriften und Gesetze für das Gesundheitswesen.</em> Spitta GmbH.
          </div>
        </div>
      </div>
    </div>
  );
};
