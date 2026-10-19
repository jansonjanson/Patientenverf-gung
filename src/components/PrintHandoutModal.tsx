import React from 'react';
import { X, Printer, CheckCircle2, FileText, Scale, BookOpen, ShieldCheck, Play, ExternalLink, Video, Lock, Sparkles } from 'lucide-react';
import { ClassroomData } from '../hooks/useClassroomSync';
import { CASES_DATA } from '../utils/legal-learning';

interface PrintHandoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ClassroomData;
}

export const PrintHandoutModal: React.FC<PrintHandoutModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const completed = data.completedPhases || [];
  const isTeacher = Boolean(data.teacherMode);

  // Progressive unlock criteria per section:
  // Chapter 1: Unlocked on start or completion of Phase 1
  const isP1Unlocked = isTeacher || completed.includes(1) || data.currentPhase >= 1;
  // Chapter 2: Unlocked when Phase 2 is completed or active after Phase 1
  const isP2Unlocked = isTeacher || completed.includes(2) || (completed.includes(1) && Boolean(data.toolsChosen || data.hesitationPoint));
  // Chapter 3: Unlocked when Phase 3 is completed or active after Phase 2
  const isP3Unlocked = isTeacher || completed.includes(3) || (completed.includes(2) && Boolean(data.comparisonQ1));
  // Chapter 4: Unlocked when Phase 4 (Rechtsrahmen) is reached or completed
  const isP4Unlocked = isTeacher || completed.includes(4) || (completed.includes(3) && data.currentPhase >= 4);
  // Chapter 5: Unlocked when Phase 5 (Eigen-Check) is completed or active
  const isP5Unlocked = isTeacher || completed.includes(5) || (completed.includes(4) && Boolean(data.selfCheckReflection));
  // Chapter 6: Unlocked when Phase 6 (Rechts-Konsil) is reached or completed
  const isP6Unlocked = isTeacher || completed.includes(6) || (completed.includes(5) && data.currentPhase >= 6);

  const unlockedCount = [isP1Unlocked, isP2Unlocked, isP3Unlocked, isP4Unlocked, isP5Unlocked, isP6Unlocked].filter(Boolean).length;

  const cleanQuote = (q: string) => (q || '').replace(/^[„"]|[“"]$/g, '').trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-3xl max-w-4xl w-full p-6 sm:p-10 shadow-2xl space-y-8 my-8 max-h-[90vh] overflow-y-auto">
        {/* Modal Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 no-print">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
              <BookOpen className="w-6 h-6 text-amber-500" />
              <span>Digitales Gesetzbuch & Schulungshandout</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-medium">
              Freischalt-Status: <strong className="text-amber-900 font-extrabold">{unlockedCount} von 6 Kapiteln freigeschaltet</strong> (wächst mit Ihrem Trainingsfortschritt)
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Drucken / PDF speichern</span>
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE COMPENDIUM CONTENT */}
        <div className="space-y-8 text-slate-900 font-sans">
          {/* Document Header */}
          <div className="border-b-2 border-slate-900 pb-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-blue-800 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                Digitales Gesetzbuch & Schulungshandout
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Stand: {new Date().toLocaleDateString('de-DE')}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
              Patientenverfügung & Strafrecht I (Palliative Care III • CE08 U3)
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              Geprüftes Schulungsdokument • Dozentur Palliative Care • Literaturbasis: Großkopf & Klein (2019a, 2019b)
            </p>
          </div>

          {/* SECTION 0: VIDEO IMPULS LINK & INFORMATION */}
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-red-700 flex items-center gap-2">
                <Video className="w-4 h-4 text-red-600" />
                <span>0. Fachvideo & Erklär-Impuls</span>
              </span>
              <a
                href={data.customVideoUrl || 'https://youtu.be/Vh1T5booFvY?si=wLR32cqG4ojV-hsW'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-red-700 hover:underline flex items-center gap-1"
              >
                <span>Video auf YouTube öffnen</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
              <strong>Titel:</strong> Vorsorgevollmacht, Betreuungsverfügung, Patientenverfügung: Was ist der Unterschied?
            </p>
            <p className="text-xs text-slate-600">
              <strong>Direkt-URL:</strong> {data.customVideoUrl || 'https://youtu.be/Vh1T5booFvY?si=wLR32cqG4ojV-hsW'}
            </p>
          </div>

          {/* SECTION 1: DIE 4 RECHTSINSTRUMENTE (Freigeschaltet ab Phase 1) */}
          <div className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-600" />
              <span>1. Gesetzliche Grundbegriffe: Die 4 Rechtsinstrumente im Vergleich</span>
            </h2>

            {isP1Unlocked ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1.5">
                  <h3 className="font-extrabold text-blue-950 text-base">01a. Patientenverfügung (§ 1827 BGB)</h3>
                  <p className="text-slate-800 font-medium leading-relaxed">
                    Schriftliche Willenserklärung für künftige Entscheidungsunfähigkeit. Wirkt unmittelbar <em>aus sich heraus</em> gegenüber Ärzt:innen und Pflegenden, sobald von ihr Kenntnis erlangt wurde.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-1.5">
                  <h3 className="font-extrabold text-indigo-950 text-base">01b. Vorsorgevollmacht (§ 164 ff. BGB)</h3>
                  <p className="text-slate-800 font-medium leading-relaxed">
                    Bevollmächtigt eine Vertrauensperson zum <em>Vertreter im Willen</em>. Hat gesetzlichen Vorrang vor einer gerichtlichen Betreuung (§ 1896 Abs. 2 BGB).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                  <h3 className="font-extrabold text-amber-950 text-base">01c. Betreuungsverfügung (§ 1896 BGB)</h3>
                  <p className="text-slate-800 font-medium leading-relaxed">
                    Wunsch an das Betreuungsgericht zur Auswahl des Betreuers. Rechte sowie Geschäfts- und Einsichtsfähigkeit des Betroffenen bleiben voll bestehen.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                  <h3 className="font-extrabold text-emerald-950 text-base">01d. Ehegatten-Notvertretung (§ 1358 BGB)</h3>
                  <p className="text-slate-800 font-medium leading-relaxed">
                    Seit 01.01.2023 gesetzliches Notvertretungsrecht bei akuter Bewusstlosigkeit/Krankheit für maximal 6 Monate im Bereich der Gesundheitssorge.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-slate-100 border-2 border-slate-300 text-slate-500 text-xs font-bold flex items-center gap-3">
                <Lock className="w-5 h-5 text-slate-400" />
                <span>Kapitel 1 noch nicht freigeschaltet. Absolvieren Sie Phase 1 im Training.</span>
              </div>
            )}
          </div>

          {/* SECTION 2: SELBSTERFAHRUNG (Freigeschaltet ab Phase 2) */}
          <div className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 border-b border-slate-200 pb-2">
              2. Selbsterfahrung & Erstellungshilfen (Stolperstein-Protokoll)
            </h2>

            {isP2Unlocked ? (
              <div className="space-y-3 text-xs sm:text-sm bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200">
                <div>
                  <strong className="text-slate-900 block font-bold">Verwendete Erstellungshilfen:</strong>
                  <p className="text-slate-800 bg-white p-2.5 rounded-xl border border-emerald-200 font-medium">
                    {data.toolsChosen || 'Keine Angabe'}
                  </p>
                </div>

                <div>
                  <strong className="text-slate-900 block font-bold">Längster Zögerungspunkt bei der Erstellung:</strong>
                  <p className="text-slate-800 bg-white p-2.5 rounded-xl border border-emerald-200 font-medium">
                    {data.hesitationPoint || 'Keine Angabe'}
                  </p>
                </div>

                <div>
                  <strong className="text-slate-900 block font-bold">Erprobte Beispielklausel aus Ihrer Verfügung:</strong>
                  <p className="text-slate-950 italic bg-white p-3 rounded-xl border border-emerald-200 font-bold">
                    „{cleanQuote(data.ownPvSentences) || 'Keine Eingabe erfasst'}“
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-slate-100 border-2 border-slate-300 text-slate-500 text-xs font-bold flex items-center gap-3">
                <Lock className="w-5 h-5 text-slate-400" />
                <span>Kapitel 2 noch nicht freigeschaltet. Absolvieren Sie Phase 2 im Training.</span>
              </div>
            )}
          </div>

          {/* SECTION 3: DIE 6 VORAUSSETZUNGEN (Freigeschaltet ab Phase 4) */}
          <div className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>3. Die 6 Voraussetzungen einer bindenden Patientenverfügung (Großkopf & Klein)</span>
            </h2>

            {isP4Unlocked ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-950 block font-black">1. Einwilligungsfähigkeit ausreichend:</strong>
                  <p className="text-slate-700">Volljährigkeit, Einsichtsfähigkeit, Urteilsfähigkeit und freie Willensbildung.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-950 block font-black">2. Schriftlich verfasst & unterschrieben:</strong>
                  <p className="text-slate-700">Schriftformzwang nach § 1827 BGB; notarielle Beglaubigung ist rechtlich nicht notwendig.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-950 block font-black">3. Erklärung im Voraus:</strong>
                  <p className="text-slate-700">Rechtsverbindliche Erklärung der (Nicht-)Einwilligung für Fälle künftiger Entscheidungsunfähigkeit.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-950 block font-black">4. Bestimmtheit (WENN-DANN-Logik):</strong>
                  <p className="text-slate-700">Genaue Angabe des Krankheitszustandes (WENN) und der konkreten Heileingriffe (DANN).</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-950 block font-black">5. Keine Willensänderung / Widerruf:</strong>
                  <p className="text-slate-700">Erklärung darf nicht widerrufen worden sein; geäußerter Abwehrwille bricht jede schriftliche Verfügung.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-950 block font-black">6. Keine Sittenwidrigkeit / Straftat:</strong>
                  <p className="text-slate-700">Kein Verstoß gegen Rechtsverbote (z. B. Verlangen nach aktiver direkter Sterbehilfe, § 216 StGB).</p>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-slate-100 border-2 border-slate-300 text-slate-500 text-xs font-bold flex items-center gap-3">
                <Lock className="w-5 h-5 text-slate-400" />
                <span>Kapitel 3 noch nicht freigeschaltet. Absolvieren Sie Phase 4 im Training.</span>
              </div>
            )}
          </div>

          {/* SECTION 4: EIGEN-CHECK (Freigeschaltet ab Phase 5) */}
          <div className="space-y-3 bg-amber-50/50 p-5 rounded-2xl border-2 border-amber-200">
            <h2 className="text-base font-black text-amber-950 border-b border-amber-200 pb-2">
              4. Eigen-Check & Stresstest Ihrer Klausel
            </h2>

            {isP5Unlocked ? (
              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <strong className="text-slate-900 block font-bold">Detail-Auswertung Ihrer Klausel (Positives, Lücken & Ergänzungen):</strong>
                  <p className="text-slate-800 bg-white p-3 rounded-xl border border-amber-200 font-medium leading-relaxed">
                    {data.selfCheckReflection || 'Keine Angabe'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-white/80 border border-amber-300 text-slate-500 text-xs font-bold flex items-center gap-3">
                <Lock className="w-5 h-5 text-slate-400" />
                <span>Kapitel 4 noch nicht freigeschaltet. Absolvieren Sie Phase 5 im Training.</span>
              </div>
            )}
          </div>

          {/* SECTION 5: DIE 6 RECHTS-KONSIL FÄLLE (Freigeschaltet ab Phase 6) */}
          <div className="space-y-3">
            <h2 className="text-lg font-black text-slate-900 border-b border-slate-200 pb-2">
              5. Die 6 Praxisfälle des Rechts-Konsils (Musterlösungen & Schülerreparaturen)
            </h2>

            {isP6Unlocked ? (
              <div className="space-y-4 text-xs">
                {CASES_DATA.map((c) => {
                  const caseState = data.cases[c.id];
                  const isCaseDone = isTeacher || Boolean(caseState?.completed || caseState?.isUnlocked);

                  return (
                    <div key={c.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="font-extrabold text-slate-900 text-sm flex items-center justify-between">
                        <span>Fall {c.id}: {c.title}</span>
                        <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 text-2xs">
                          {(caseState?.diagnosis || []).join(', ') || 'Analysiert'}
                        </span>
                      </div>

                      <p className="italic text-rose-950 font-semibold bg-rose-50/70 p-2.5 rounded-lg border border-rose-200">
                        Problemklausel: „{cleanQuote(c.quote)}“
                      </p>

                      {(caseState?.wenn || caseState?.dann) && (
                        <div className="bg-blue-50/80 p-2.5 rounded-lg border border-blue-200 font-medium">
                          <strong>Ihre BGH-konforme Reparatur: </strong>
                          <span className="italic">„{caseState.wenn?.trim()} {caseState.dann?.trim()}“</span>
                        </div>
                      )}

                      {isCaseDone ? (
                        <div className="bg-emerald-50/80 p-2.5 rounded-lg border border-emerald-200 font-medium">
                          <strong>Offizielle Musterlösung (Großkopf & Klein): </strong>
                          <span className="italic">„{cleanQuote(c.officialSolution)}“</span>
                        </div>
                      ) : (
                        <div className="p-2.5 rounded-lg bg-slate-200/80 border border-slate-300 text-slate-600 font-bold flex items-center gap-2 text-2xs">
                          <Lock className="w-3.5 h-3.5 text-slate-500" />
                          <span>Musterlösung gesperrt – formulieren Sie zuerst Fall {c.id} im Rechts-Konsil aus.</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-slate-100 border-2 border-slate-300 text-slate-500 text-xs font-bold flex items-center gap-3">
                <Lock className="w-5 h-5 text-slate-400" />
                <span>Kapitel 5 noch nicht freigeschaltet. Absolvieren Sie Phase 6 im Rechts-Konsil.</span>
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="pt-4 border-t text-2xs text-slate-500 text-center space-y-1">
            <p>Guided Classroom: Patientenverfügung & Strafrecht I • Dozentur Palliative Care III (CE08 U3)</p>
            <p>Literaturbasis: Großkopf, V. & Klein, H. (2019a, 2019b) • BGH-Beschlüsse XII ZB 61/16 & XII ZB 107/17</p>
          </div>
        </div>
      </div>
    </div>
  );
};
