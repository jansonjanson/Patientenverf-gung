import React from 'react';
import {
  X,
  Printer,
  CheckCircle2,
  FileText,
  Scale,
  BookOpen,
  ShieldCheck,
  Play,
  ExternalLink,
  Video,
  Lock,
  Sparkles,
  Zap,
  HelpCircle,
  Users,
  Wrench,
  AlertTriangle,
} from 'lucide-react';
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
  const isP1Unlocked = isTeacher || completed.includes(1) || data.currentPhase >= 1;
  const isP2Unlocked = isTeacher || completed.includes(2) || (completed.includes(1) && Boolean(data.toolsChosen || data.hesitationPoint));
  const isP3Unlocked = isTeacher || completed.includes(3) || (completed.includes(2) && Boolean(data.comparisonQ1));
  const isP4Unlocked = isTeacher || completed.includes(4) || (completed.includes(3) && data.currentPhase >= 4);
  const isP5Unlocked = isTeacher || completed.includes(5) || (completed.includes(4) && Boolean(data.selfCheckReflection));
  const isP6Unlocked = isTeacher || completed.includes(6) || (completed.includes(5) && data.currentPhase >= 6);

  const unlockedCount = [isP1Unlocked, isP2Unlocked, isP3Unlocked, isP4Unlocked, isP5Unlocked, isP6Unlocked].filter(Boolean).length;

  const cleanQuote = (q: string) => (q || '').replace(/^[„"]|[“"]$/g, '').trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-50 text-slate-900 rounded-3xl max-w-4xl w-full p-6 sm:p-10 shadow-2xl space-y-8 my-8 max-h-[90vh] overflow-y-auto border-2 border-slate-200">
        {/* Modal Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 no-print">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-500 text-slate-950 flex items-center justify-center font-black text-xl shrink-0 shadow-md">
              <BookOpen className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <span>Digitales Gesetzbuch & Schulungshandout</span>
                <Sparkles className="w-5 h-5 text-amber-500" />
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-medium">
                Freischalt-Status: <strong className="text-amber-800 font-extrabold">{unlockedCount} von 6 Kapiteln freigeschaltet</strong> (wächst dynamisch mit Ihrem Trainingsfortschritt)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer transform active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Drucken / PDF speichern</span>
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE COMPENDIUM CONTENT */}
        <div className="space-y-8 text-slate-900 font-sans">
          {/* Document Header */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 sm:p-8 space-y-3 shadow-xl border-2 border-indigo-400/80">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-2xs font-black uppercase tracking-wider text-amber-300 bg-amber-400/20 border border-amber-400/40 px-3 py-1 rounded-full">
                Offizielles Gesetzbuch & Lerntagebuch
              </span>
              <span className="text-xs font-semibold text-slate-300">
                Stand: {new Date().toLocaleDateString('de-DE')}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Patientenverfügung & Strafrecht I (Palliative Care III • CE08 U3)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Geprüftes Schulungsdokument • Dozentur Palliative Care • Literaturbasis: Großkopf & Klein (2019a, 2019b)
            </p>
          </div>

          {/* SECTION 0: VIDEO IMPULS LINK & INFORMATION */}
          <div className="bg-gradient-to-br from-red-50 via-rose-50/40 to-white border-2 border-red-200/90 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-red-800 flex items-center gap-2">
                <Video className="w-4 h-4 text-red-600" />
                <span>0. Fachvideo & Erklär-Impuls</span>
              </span>
              <a
                href={data.customVideoUrl || 'https://youtu.be/Vh1T5booFvY?si=wLR32cqG4ojV-hsW'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-black text-red-700 hover:underline flex items-center gap-1 bg-red-100/80 px-2.5 py-1 rounded-lg border border-red-200"
              >
                <span>Video auf YouTube öffnen</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 font-bold leading-relaxed">
              <strong>Titel:</strong> Vorsorgevollmacht, Betreuungsverfügung, Patientenverfügung: Was ist der Unterschied?
            </p>
            <p className="text-xs text-slate-600 font-mono">
              URL: {data.customVideoUrl || 'https://youtu.be/Vh1T5booFvY?si=wLR32cqG4ojV-hsW'}
            </p>
          </div>

          {/* SECTION 1: DIE 4 RECHTSINSTRUMENTE (Freigeschaltet ab Phase 1) */}
          <div className="bg-white rounded-3xl border-2 border-blue-200/90 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-blue-100 pb-3">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2.5">
                <Scale className="w-5 h-5 text-blue-600" />
                <span>1. Gesetzliche Grundbegriffe: Die 4 Rechtsinstrumente im Vergleich</span>
              </h2>
              <span className="text-2xs font-extrabold uppercase px-2.5 py-1 rounded-md bg-blue-100 text-blue-900 border border-blue-300">
                Phase 1
              </span>
            </div>

            {isP1Unlocked ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-1.5 shadow-2xs">
                  <h3 className="font-extrabold text-blue-950 text-base">01a. Patientenverfügung (§ 1827 BGB)</h3>
                  <p className="text-slate-800 font-medium leading-relaxed">
                    Schriftliche Willenserklärung für künftige Entscheidungsunfähigkeit. Wirkt unmittelbar <em>aus sich heraus</em> gegenüber Ärzt:innen und Pflegenden, sobald von ihr Kenntnis erlangt wurde.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200 space-y-1.5 shadow-2xs">
                  <h3 className="font-extrabold text-indigo-950 text-base">01b. Vorsorgevollmacht (§ 164 ff. BGB)</h3>
                  <p className="text-slate-800 font-medium leading-relaxed">
                    Bevollmächtigt eine Vertrauensperson zum <em>Vertreter im Willen</em>. Hat gesetzlichen Vorrang vor einer gerichtlichen Betreuung (§ 1896 Abs. 2 BGB).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-1.5 shadow-2xs">
                  <h3 className="font-extrabold text-amber-950 text-base">01c. Betreuungsverfügung (§ 1896 BGB)</h3>
                  <p className="text-slate-800 font-medium leading-relaxed">
                    Wunsch an das Betreuungsgericht zur Auswahl des Betreuers. Rechte sowie Geschäfts- und Einsichtsfähigkeit des Betroffenen bleiben voll bestehen.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-1.5 shadow-2xs">
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
          <div className="bg-white rounded-3xl border-2 border-emerald-200/90 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-emerald-600" />
                <span>2. Selbsterfahrung & Erstellungshilfen (Stolperstein-Protokoll)</span>
              </h2>
              <span className="text-2xs font-extrabold uppercase px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300">
                Phase 2
              </span>
            </div>

            {isP2Unlocked ? (
              <div className="space-y-3 text-xs sm:text-sm bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200">
                <div>
                  <strong className="text-slate-900 block font-bold">1. Verwendete Erstellungshilfen im Tandem:</strong>
                  <p className="text-slate-800 bg-white p-3 rounded-xl border border-emerald-200 font-medium mt-1">
                    {data.toolsChosen || 'Keine Angabe erfasst'}
                  </p>
                </div>

                <div>
                  <strong className="text-slate-900 block font-bold">2. Längster Zögerungspunkt bei der Erstellung:</strong>
                  <p className="text-slate-800 bg-white p-3 rounded-xl border border-emerald-200 font-medium mt-1">
                    {data.hesitationPoint || 'Keine Angabe erfasst'}
                  </p>
                </div>

                <div>
                  <strong className="text-slate-900 block font-bold">3. Eindrücke & Erkenntnisse aus der Erstellung:</strong>
                  <p className="text-slate-800 bg-white p-3 rounded-xl border border-emerald-200 font-medium mt-1">
                    {data.creationInsights || 'Keine Angabe erfasst'}
                  </p>
                </div>

                <div>
                  <strong className="text-slate-900 block font-bold">4. Erprobte Beispielklausel aus Ihrer Verfügung (für Stresstest):</strong>
                  <p className="text-slate-950 italic bg-white p-3.5 rounded-xl border-2 border-emerald-300 font-bold mt-1 text-sm sm:text-base">
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

          {/* SECTION 3: TANDEM-VERGLEICH (Freigeschaltet ab Phase 3) */}
          <div className="bg-white rounded-3xl border-2 border-indigo-200/90 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2.5">
                <Users className="w-5 h-5 text-indigo-600" />
                <span>3. Systematischer Tandem-Vergleich (Die 4 Leitfragen & Blinde Flecken)</span>
              </h2>
              <span className="text-2xs font-extrabold uppercase px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-900 border border-indigo-300">
                Phase 3
              </span>
            </div>

            {isP3Unlocked ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-1">
                  <strong className="text-indigo-950 block font-black">1. Gemeinsamkeiten & Überschneidungen:</strong>
                  <p className="text-slate-800 bg-white p-2.5 rounded-xl border border-indigo-200 font-medium">
                    {data.comparisonQ1 || 'Keine Angabe erfasst'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-1">
                  <strong className="text-indigo-950 block font-black">2. Unterschiede & Benutzerführung:</strong>
                  <p className="text-slate-800 bg-white p-2.5 rounded-xl border border-indigo-200 font-medium">
                    {data.comparisonQ2 || 'Keine Angabe erfasst'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-1">
                  <strong className="text-indigo-950 block font-black">3. Blinde Flecken & Ergänzungsbedarf:</strong>
                  <p className="text-slate-800 bg-white p-2.5 rounded-xl border border-indigo-200 font-medium">
                    {data.comparisonQ3 || 'Keine Angabe erfasst'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-1">
                  <strong className="text-indigo-950 block font-black">4. Offene Fragen aus Nutzerperspektive:</strong>
                  <p className="text-slate-800 bg-white p-2.5 rounded-xl border border-indigo-200 font-medium">
                    {data.comparisonQ4 || 'Keine Angabe erfasst'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-slate-100 border-2 border-slate-300 text-slate-500 text-xs font-bold flex items-center gap-3">
                <Lock className="w-5 h-5 text-slate-400" />
                <span>Kapitel 3 noch nicht freigeschaltet. Absolvieren Sie Phase 3 im Training.</span>
              </div>
            )}
          </div>

          {/* SECTION 4: DIE 6 VORAUSSETZUNGEN & BGH WENN-DANN FORMEL (Freigeschaltet ab Phase 4) */}
          <div className="bg-white rounded-3xl border-2 border-amber-200/90 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <span>4. Juristischer Rechtsrahmen: Die 6 Voraussetzungen & BGH WENN-DANN Formel</span>
              </h2>
              <span className="text-2xs font-extrabold uppercase px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                Phase 4
              </span>
            </div>

            {isP4Unlocked ? (
              <div className="space-y-6">
                {/* 6 Prerequisites Grid */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-3">
                    Die 6 Voraussetzungen einer bindenden Patientenverfügung (Großkopf & Klein)
                  </h3>
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
                </div>

                {/* BGH WENN-DANN FORMEL DEFINITION & HINTERGRUND */}
                <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-950 text-white rounded-2xl p-5 space-y-4 border-2 border-indigo-400 shadow-md">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-400" />
                    <h3 className="font-extrabold text-base text-amber-300 uppercase tracking-wider">
                      Die BGH WENN-DANN Prozessformel & Höchstrichterliche Rechtsprechung
                    </h3>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                    <p>
                      <strong>Definition & Kernprinzip:</strong> Die WENN-DANN-Formel bildet das juristische Rückgrat jeder rechtsverbindlichen Patientenverfügung. Sie verknüpft einen eindeutig bestimmten medizinischen Zustand (<strong>WENN</strong>) unmissverständlich mit einer konkreten ärztlichen Behandlungsanweisung oder deren Ablehnung (<strong>DANN</strong>).
                    </p>
                    <p>
                      <strong>Höchstrichterlicher Hintergrund (BGH XII ZB 61/16 & XII ZB 107/17):</strong> Nach der gefestigten Rechtsprechung des Bundesgerichtshofs reichen allgemeine Formulierungen wie <em>„würdevoll sterben“</em> oder <em>„keine lebensverlängernden Maßnahmen“</em> mangels Bestimmtheit <strong>nicht</strong> aus. Der BGH fordert, dass die betroffene Person konkrete Behandlungssituationen beschreibt und bestimmte medizinische Heileingriffe ausdrücklich benennt.
                    </p>
                  </div>

                  <div className="bg-indigo-950/90 border border-amber-400/80 p-4 rounded-xl text-xs sm:text-sm font-bold leading-relaxed text-amber-300">
                    <span>Musterbeispiel: </span>
                    <span className="text-amber-200 font-mono">
                      „WENN ich mich im Endstadium einer unheilbaren Erkrankung befinde [Bestimmter Zustand], DANN wünsche ich, dass alle künstlichen Beatmungs- und Ernährungseingriffe (PEG) eingestellt werden [Bestimmte Maßnahme].“
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-slate-100 border-2 border-slate-300 text-slate-500 text-xs font-bold flex items-center gap-3">
                <Lock className="w-5 h-5 text-slate-400" />
                <span>Kapitel 4 noch nicht freigeschaltet. Absolvieren Sie Phase 4 im Training.</span>
              </div>
            )}
          </div>

          {/* SECTION 5: EIGEN-CHECK (Freigeschaltet ab Phase 5) */}
          <div className="bg-white rounded-3xl border-2 border-emerald-200/90 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>5. Eigen-Check & Akut-Notfall-Stresstest Ihrer Klausel</span>
              </h2>
              <span className="text-2xs font-extrabold uppercase px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300">
                Phase 5
              </span>
            </div>

            {isP5Unlocked ? (
              <div className="space-y-3 text-xs sm:text-sm bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200">
                <div>
                  <strong className="text-slate-900 block font-bold">1. Geprüfte Beispielklausel:</strong>
                  <p className="text-slate-950 italic bg-white p-3 rounded-xl border border-emerald-200 font-bold">
                    „{cleanQuote(data.ownPvSentences) || 'Keine Eingabe erfasst'}“
                  </p>
                </div>

                <div>
                  <strong className="text-slate-900 block font-bold">2. Auswertung Ihres Notfall-Stresstests (Positives, Lücken & Ergänzungen):</strong>
                  <p className="text-slate-800 bg-white p-3 rounded-xl border border-emerald-200 font-medium leading-relaxed mt-1">
                    {data.selfCheckReflection || 'Keine Angabe erfasst'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-slate-100 border-2 border-slate-300 text-slate-500 text-xs font-bold flex items-center gap-3">
                <Lock className="w-5 h-5 text-slate-400" />
                <span>Kapitel 5 noch nicht freigeschaltet. Absolvieren Sie Phase 5 im Training.</span>
              </div>
            )}
          </div>

          {/* SECTION 6: DIE 6 RECHTS-KONSIL FÄLLE (Freigeschaltet ab Phase 6) */}
          <div className="bg-white rounded-3xl border-2 border-purple-200/90 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2.5">
                <Wrench className="w-5 h-5 text-purple-600" />
                <span>6. Die 6 Praxisfälle des Rechts-Konsils (Vignette, Schüler-Reparatur & Musterlösung)</span>
              </h2>
              <span className="text-2xs font-extrabold uppercase px-2.5 py-1 rounded-md bg-purple-100 text-purple-900 border border-purple-300">
                Phase 6
              </span>
            </div>

            {isP6Unlocked ? (
              <div className="space-y-4 text-xs">
                {CASES_DATA.map((c) => {
                  const caseState = data.cases[c.id];
                  const isCaseDone = isTeacher || Boolean(caseState?.completed || caseState?.isUnlocked);

                  return (
                    <div key={c.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-2xs">
                      <div className="font-extrabold text-slate-900 text-sm flex items-center justify-between border-b border-slate-200 pb-2">
                        <span>Fall {c.id}: {c.title}</span>
                        <span className="text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 text-2xs font-bold">
                          {(caseState?.diagnosis || []).join(', ') || 'Analysiert'}
                        </span>
                      </div>

                      {/* Fallvignette */}
                      {c.vignette && (
                        <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-slate-800 text-2xs font-medium">
                          <strong className="text-blue-900 block font-bold mb-0.5">📋 Fallvignette:</strong>
                          {c.vignette}
                        </div>
                      )}

                      <p className="italic text-rose-950 font-bold bg-rose-50/80 p-3 rounded-xl border border-rose-200 text-xs">
                        Problemklausel: „{cleanQuote(c.quote)}“
                      </p>

                      {(caseState?.wenn || caseState?.dann) && (
                        <div className="bg-blue-50/80 p-3 rounded-xl border border-blue-200 font-medium space-y-1">
                          <strong className="text-blue-950 block font-bold">Ihre BGH-konforme Reparatur: </strong>
                          <span className="italic text-slate-900 font-bold">„{caseState.wenn?.trim()} {caseState.dann?.trim()}“</span>
                        </div>
                      )}

                      {isCaseDone ? (
                        <div className="bg-emerald-50/90 p-3 rounded-xl border border-emerald-300 font-medium space-y-1">
                          <strong className="text-emerald-950 block font-bold">Offizielle Musterlösung (Großkopf & Klein): </strong>
                          <span className="italic text-emerald-900 font-bold">„{cleanQuote(c.officialSolution)}“</span>
                        </div>
                      ) : (
                        <div className="p-3 rounded-xl bg-slate-200/80 border border-slate-300 text-slate-600 font-bold flex items-center gap-2 text-2xs">
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
                <span>Kapitel 6 noch nicht freigeschaltet. Absolvieren Sie Phase 6 im Rechts-Konsil.</span>
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
