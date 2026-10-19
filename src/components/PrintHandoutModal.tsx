import React from 'react';
import { X, Printer, CheckCircle2, FileText, Scale, BookOpen, ShieldCheck } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-3xl max-w-4xl w-full p-6 sm:p-10 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        {/* Modal Controls (Hidden in print) */}
        <div className="flex items-center justify-between border-b pb-4 no-print">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Printer className="w-5 h-5 text-blue-600" />
              Lernskript & Handout (Druck- / PDF-Vorschau)
            </h3>
            <p className="text-xs text-slate-500">
              Vollständiges Lern- und Ergebnisprotokoll inklusive aller Theorietexte, Ihrer persönlichen Eingaben und der Musterlösungen.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Drucken / PDF</span>
            </button>
            <button
              onClick={() => {
                import('../utils/exportUtils').then(({ exportToWord }) => {
                  exportToWord({
                    title: 'Lernskript & Handout: Patientenverfügung – Strafrecht I',
                    subtitle: 'Palliative Care III (CE08 U3) • Dozent: J. Rosenow • Literaturbasis: Großkopf & Klein',
                    sections: [
                      {
                        heading: '1. Theorie-Übersicht: Die 4 Rechtsinstrumente',
                        content: {
                          '01a Betreuungsverfügung': 'Gerichtliche Anordnung; Vertretungsrecht des Betreuers erstreckt sich nicht auf den gesamten Rechtskreis. Nachrangig zu Vollmachten.',
                          '01b Vorsorgevollmacht': 'Rechtsgeschäftlich; Bevollmächtigter wird zum Vertreter im Willen; Vorrang vor Betreuung (§ 1896 Abs. 2 BGB).',
                          '01c Ehegatten-Notvertretungsrecht': '§ 1358 BGB seit 01.01.2023; Notfallvertretung für max. 6 Monate im Bereich Gesundheitssorge.',
                          '01d Patientenverfügung': 'Medizinische Willenserklärung; wirkt aus sich heraus und ist sofort zu achten.',
                        },
                      },
                      {
                        heading: '2. Selbsterfahrung: Stolperstein-Protokoll',
                        content: {
                          'Gewählte Erstellungshilfe': data.toolsChosen || 'Keine Angabe',
                          'Längster Zögerungspunkt': data.hesitationPoint || 'Keine Angabe',
                          'Notierte Beispielsätze': data.ownPvSentences || 'Keine Angabe',
                        },
                      },
                      {
                        heading: '3. Tandem-Vergleich: 4 Leitfragen',
                        content: {
                          'Gemeinsamkeiten': data.comparisonQ1 || 'Keine Angabe',
                          'Unterschiede': data.comparisonQ2 || 'Keine Angabe',
                          'Was fehlt?': data.comparisonQ3 || 'Keine Angabe',
                          'Nutzerfragen': data.comparisonQ4 || 'Keine Angabe',
                        },
                      },
                      {
                        heading: '4. Rechtlicher Rahmen & Stresstest',
                        content: {
                          'WENN-Kriterium': data.checklistSelf1 ? 'Erfüllt' : 'Nicht erfüllt',
                          'DANN-Kriterium': data.checklistSelf2 ? 'Erfüllt' : 'Nicht erfüllt',
                          'Vorsorgevollmacht kombiniert': data.checklistSelf3 ? 'Erfüllt' : 'Nicht erfüllt',
                          'Fazit': data.selfCheckReflection || 'Keine Angabe',
                        },
                      },
                      {
                        heading: '5. Die 6 Praxisfälle (Rechts-Konsil)',
                        content: Object.fromEntries(
                          CASES_DATA.map((c) => [
                            `Fall ${c.id}: ${c.title}`,
                            `WENN: ${data.cases[c.id]?.wenn || '-'} | DANN: ${data.cases[c.id]?.dann || '-'} | Musterlösung: ${c.officialSolution}`,
                          ])
                        ),
                      },
                    ],
                  }, 'patientenverfuegung_handout_lernskript.doc');
                });
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Word (.doc)</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Content */}
        <div className="space-y-6 text-slate-900 printable-content">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                  CE08 U3 • Palliative Care III • Modulunterlagen
                </span>
                <h1 className="text-2xl font-black mt-0.5 text-slate-950">
                  Patientenverfügung – Strafrecht I (Guided Classroom)
                </h1>
                <p className="text-xs text-slate-600 mt-1">
                  Dozent: J. Rosenow (M.A. Pflegepädagogik) • Literaturbasis: Großkopf & Klein (2019a, 2019b)
                </p>
              </div>
              <div className="text-right text-xs text-slate-500 shrink-0">
                <div>Datum: {new Date().toLocaleDateString('de-DE')}</div>
                <div className="font-semibold text-slate-800 mt-0.5">Teilnehmer-ID: {data.userId}</div>
                <div className="text-[10px] text-emerald-700 font-bold mt-0.5">✓ Lokal gesichert</div>
              </div>
            </div>
          </div>

          {/* THEORIE-ÜBERSICHT 1: 4 VERFÜGUNGSARTEN */}
          <div className="space-y-3 border-b pb-5 print-break-inside">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-900">
                1. Theorie-Übersicht: Die 4 Instrumente im juristischen Vergleich
              </h2>
              <span className="text-[11px] text-slate-500">Großkopf & Klein (2019a, 2019b)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {/* Betreuungsverfügung */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-indigo-900">01a • Betreuungsverfügung (Gerichtliche Anordnung)</div>
                <p className="text-slate-700 italic">
                  „Mit der Anordnung entsteht lediglich ein Vertretungsrecht für den Betreuer, das sich nicht auf den gesamten Rechtskreis erstreckt.“
                </p>
                <p className="text-slate-600">
                  • Rechte des Betroffenen bleiben ungeschmälert; Geschäfts- und Einsichtsfähigkeit bleiben bestehen.<br />
                  • <strong>Nachrangigkeit:</strong> Existiert bereits eine ausreichende Bevollmächtigung, ist keine Betreuung möglich.
                </p>
              </div>

              {/* Vorsorgevollmacht */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-blue-900">01b • Vorsorgevollmacht (Rechtsgeschäftlich)</div>
                <p className="text-slate-700 italic">
                  „Bevollmächtigt eine Person, im Falle einer Notsituation alle oder bestimmte Aufgaben für den Vollmachtgeber zu erledigen.“
                </p>
                <p className="text-slate-600">
                  • Der Bevollmächtigte wird zum <strong>Vertreter im Willen</strong> (entscheidet an Stelle des Vollmachtgebers).<br />
                  • <strong>Vorrang vor Betreuung:</strong> § 1896 Abs. 2 Satz 2 BGB.
                </p>
              </div>

              {/* Notvertretungsrecht Eheleute */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-amber-900">01c • Vertretungsrecht Eheleute (§ 1358 BGB)</div>
                <p className="text-slate-600">
                  • <strong>Seit 01.01.2023</strong> gesetzlich geregelt bei Bewusstlosigkeit/akuter Krankheit im Bereich Gesundheitssorge.<br />
                  • Schweigepflicht gegenüber vertretendem Ehegatten aufgehoben.<br />
                  • <strong>Befristung:</strong> Maximal <strong>6 Monate</strong> gültig.<br />
                  • <strong>Ausschluss:</strong> Gilt nicht bei Getrenntleben oder wenn bereits eine andere Verfügung/Vollmacht greift.
                </p>
              </div>

              {/* Patientenverfügung */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-emerald-900">01d • Patientenverfügung (Medizinische Willenserklärung)</div>
                <p className="text-slate-700 italic">
                  „Schriftliche Verfügung einer erwachsenen Person über zu ergreifende bzw. zu unterlassende medizinische Maßnahmen für den Fall, dass sie ihren Willen nicht mehr wirksam erklären kann.“
                </p>
                <p className="text-emerald-800 font-semibold">
                  ⚡ <strong>„Wirkt aus sich heraus“:</strong> Sobald von ihrer Existenz Kenntnis erlangt wurde, ist sie sofort und ohne nachzufragen zu achten!
                </p>
              </div>
            </div>

            {/* Quiz Result */}
            <div className="p-2.5 bg-blue-50/80 rounded-xl border border-blue-200 text-xs flex justify-between items-center">
              <span><strong>Ergebnis Präzisions-Check (4 Zuordnungen):</strong></span>
              <span className="font-bold text-blue-900">
                {data.quizSubmitted ? `${data.quizScore} von 4 Punkten erzielt` : 'Noch nicht eingereicht'}
              </span>
            </div>
          </div>

          {/* PRAXISTEIL 2: SELBSTERFAHRUNG & STOLPERSTEIN-PROTOKOLL */}
          <div className="space-y-2 border-b pb-4 print-break-inside">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
              2. Selbsterfahrung: Erstellung einer Patientenverfügung (Stolperstein-Protokoll)
            </h2>
            <div className="text-xs space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-2.5 bg-slate-50 rounded-xl border">
                  <strong>Gewählte Hilfen/Generatoren:</strong> {data.toolsChosen || '–'}
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border">
                  <strong>Längster Zögerungspunkt bei Erstellung:</strong> {data.hesitationPoint || '–'}
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong>Exemplarische Klausel aus Ihrer erstellten Verfügung (Transfer für Stresstest):</strong>
                <p className="italic text-slate-800 mt-1">
                  {data.ownPvSentences ? `„${data.ownPvSentences}“` : 'Keine Sätze notiert.'}
                </p>
              </div>
            </div>
          </div>

          {/* PRAXISTEIL 3: SYSTEMATISCHER VERGLEICH */}
          <div className="space-y-2 border-b pb-4 print-break-inside">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
              3. Systematischer Vergleich der Erstellungshilfen (Tandem-Arbeit)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border">
                <strong>1. Was gleicht sich / überschneidet sich?</strong>
                <p className="text-slate-700 mt-1">{data.comparisonQ1 || '–'}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border">
                <strong>2. Was ist anders / unterschiedlich?</strong>
                <p className="text-slate-700 mt-1">{data.comparisonQ2 || '–'}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border">
                <strong>3. Was fehlt? Was müsste ergänzt werden?</strong>
                <p className="text-slate-700 mt-1">{data.comparisonQ3 || '–'}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border">
                <strong>4. Welche Fragen ergeben sich als Nutzer:in?</strong>
                <p className="text-slate-700 mt-1">{data.comparisonQ4 || '–'}</p>
              </div>
            </div>
          </div>

          {/* THEORIE-ÜBERSICHT 2: 6 VORAUSSETZUNGEN & WENN-DANN */}
          <div className="space-y-3 border-b pb-5 print-break-inside">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-900">
                4. Theorie-Übersicht: Voraussetzungen & Wenn-Dann-Formulierung
              </h2>
              <span className="text-[11px] text-slate-500">Großkopf & Klein (2019a, 2019b)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl border">
                <strong>1. Einwilligungsfähigkeit:</strong><br />
                • Einsichtsfähig (versteht Art/Folgen)<br />
                • Urteilsfähig (wägt Alternativen ab)<br />
                • Freie Willensbildung (ohne Zwang)
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border">
                <strong>2. Schriftform:</strong><br />
                Schriftlich & eigenhändig unterschrieben.<br />
                <em>(Notarielle Beglaubigung nicht notwendig!)</em>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border">
                <strong>3. Erklärung im Voraus:</strong><br />
                Verbindliche (Nicht-)Einwilligung. Keine bloßen unverbindlichen Behandlungswünsche.
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border">
                <strong>4. Bestimmtheit:</strong><br />
                Bestimmtheit des Zustands (WENN) und der Maßnahme/des Unterlassens (DANN).
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border">
                <strong>5. Keine Willensänderung:</strong><br />
                Keine Anhaltspunkte, dass der Wille sich geändert hat (jederzeit formlos widerrufbar).
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border">
                <strong>6. Keine Sittenwidrigkeit:</strong><br />
                Kein Verstoß gegen Gesetze (z. B. keine aktive direkte Sterbehilfe § 216 StGB).
              </div>
            </div>

            <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-xs">
              <strong>Die juristische Kernformel:</strong><br />
              <span className="text-amber-900 font-bold">WENN (Bestimmtheit des Behandlungszustandes):</span> Muss sich auf ein bestimmtes behandlungsbedürftiges Krankheitsbild bzw. einen bestimmten Krankheitszustand beziehen.<br />
              <span className="text-emerald-900 font-bold">➔ DANN (Bestimmtheit des Handelns/Unterlassens):</span> Im Voraus erklärte Einwilligung/Ablehnung zu ärztlichen/pflegerischen Maßnahmen.
            </div>
          </div>

          {/* PRAXISTEIL 5: EIGEN-CHECK */}
          <div className="space-y-2 border-b pb-4 print-break-inside">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
              5. Eigen-Check der erstellten Verfügung
            </h2>
            <div className="text-xs space-y-1 bg-slate-50 p-3 rounded-xl border">
              <div className="flex items-center gap-2">
                <span>{data.checklistSelf1 ? '☑' : '☐'}</span>
                <span><strong>WENN-Prüfung:</strong> Krankheitszustand eindeutig und bestimmt benannt</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{data.checklistSelf2 ? '☑' : '☐'}</span>
                <span><strong>DANN-Prüfung:</strong> Konkrete ärztliche und pflegerische Maßnahmen benannt</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{data.checklistSelf3 ? '☑' : '☐'}</span>
                <span><strong>Kombination mit Vorsorgevollmacht:</strong> Vertretungsperson zur Durchsetzung geregelt</span>
              </div>
              {data.selfCheckReflection && (
                <div className="mt-2 pt-2 border-t text-slate-700">
                  <strong>Ihr persönliches Fazit zum Generator:</strong> {data.selfCheckReflection}
                </div>
              )}
            </div>
          </div>

          {/* PRAXISTEIL 6: RECHTS-KONSIL (ALLE 6 FÄLLE GEGENÜBERGESTELLT) */}
          <div className="space-y-3 print-break-inside">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
              6. Rechts-Konsil: Gegenüberstellung aller 6 Fälle mit Ihren Formulierungen & Musterlösungen
            </h2>

            <div className="space-y-3">
              {CASES_DATA.map((c) => {
                const caseState = data.cases[c.id];
                const wenn = caseState?.wenn?.trim();
                const dann = caseState?.dann?.trim();
                const diagText = caseState?.diagnosisText?.trim();

                return (
                  <div key={c.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2 print-break-inside">
                    <div className="font-bold text-slate-900 flex justify-between items-center border-b pb-1.5">
                      <span className="text-blue-900 font-extrabold">{c.title}</span>
                      <span className="text-slate-500 font-normal">Fallakte {c.id}</span>
                    </div>

                    <div className="text-rose-900 bg-rose-50/70 p-2 rounded-lg border border-rose-200">
                      <strong>Fehlerhafter Originalsatz:</strong> {c.quote}<br />
                      <strong>Diagnostizierter Mangel:</strong> {c.officialProblem}
                      {diagText && <div className="mt-1 text-slate-600"><em>Ihre Anmerkung:</em> {diagText}</div>}
                    </div>

                    <div className="bg-white p-2.5 rounded-lg border border-blue-200 text-blue-950">
                      <strong>Ihre Formulierung der TN (WENN – DANN):</strong>
                      <p className="mt-0.5 italic font-medium">
                        {wenn || dann ? `„${wenn} ${dann}“` : 'Noch nicht formuliert'}
                      </p>
                    </div>

                    <div className="text-emerald-950 bg-emerald-50/90 p-2.5 rounded-lg border border-emerald-300">
                      <strong>Juristische Muster-Verbesserung (J. Rosenow):</strong>
                      <p className="mt-0.5 font-semibold">{c.officialSolution}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* PRAXIS-TRANSFER BOX */}
          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200 text-xs space-y-1.5 print-break-inside">
            <h3 className="font-bold text-blue-950 uppercase tracking-wide">
              Praxis-Transfer: Was passiert rechtlich, wenn eine Verfügung im Ernstfall zu unbestimmt ist?
            </h3>
            <p className="text-slate-700 leading-relaxed">
              Wenn eine Formulierung das Bestimmtheitsgebot verfehlt, ist das Dokument nicht wertlos – die Aussagen dienen dann als wichtige Anhaltspunkte für die Ermittlung der Behandlungswünsche bzw. des mutmaßlichen Willens, den Bevollmächtigte (Vorsorgevollmacht) oder Betreuer:innen (Betreuungsverfügung) gemeinsam mit dem Behandlungsteam umsetzen müssen (§ 1827 Abs. 2 BGB).
            </p>
          </div>

          {/* LITERATURVERZEICHNIS */}
          <div className="text-[11px] text-slate-500 pt-3 border-t">
            <strong>Literaturverzeichnis:</strong><br />
            • Großkopf, V. & Klein, H. (2019a). <em>Recht in Medizin und Pflege.</em> (5. Aufl.). Balingen: Spitta GmbH.<br />
            • Großkopf, V. & Klein, H. (2019b). <em>Vorschriften und Gesetze für das Gesundheitswesen: inkl. Heilkundeübertragungsrichtlinie.</em> (3. Aufl.). Balingen: Spitta GmbH.
          </div>
        </div>
      </div>
    </div>
  );
};
