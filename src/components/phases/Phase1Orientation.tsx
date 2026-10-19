import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Play,
  ExternalLink,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  BookOpen,
  Scale,
  Calendar,
  Zap,
} from 'lucide-react';
import { QUIZ_QUESTIONS, checkQuizAnswers } from '../../utils/legal-learning';
import { DecisionTreePhase1 } from '../diagrams/DecisionTreePhase1';
import { StepTransition } from '../StepTransition';

interface Phase1OrientationProps {
  quizAnswers: Record<string, string>;
  quizSubmitted: boolean;
  quizScore: number;
  customVideoUrl: string;
  onUpdateQuizAnswers: (answers: Record<string, string>, submitted: boolean, score: number) => void;
  onNextPhase: () => void;
}

const DEFAULT_VIDEO_URL = 'https://youtu.be/Vh1T5booFvY?si=wLR32cqG4ojV-hsW';

export const Phase1Orientation: React.FC<Phase1OrientationProps> = ({
  quizAnswers,
  quizSubmitted,
  quizScore,
  customVideoUrl,
  onUpdateQuizAnswers,
  onNextPhase,
}) => {
  const [localAnswers, setLocalAnswers] = useState<Record<string, string>>(quizAnswers || {});
  const [feedback, setFeedback] = useState<{
    submitted: boolean;
    score: number;
    results: Record<string, boolean>;
  }>({
    submitted: quizSubmitted,
    score: quizScore,
    results: quizSubmitted ? checkQuizAnswers(quizAnswers).results : {},
  });

  const handleSelectAnswer = (questionId: string, val: string) => {
    const next = { ...localAnswers, [questionId]: val };
    setLocalAnswers(next);
  };

  const handleCheckQuiz = () => {
    const res = checkQuizAnswers(localAnswers);
    setFeedback({
      submitted: true,
      score: res.score,
      results: res.results,
    });
    onUpdateQuizAnswers(localAnswers, true, res.score);

    if (res.isPerfect) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#10b981', '#38bdf8', '#f59e0b'],
      });
    }
  };

  // Extract YouTube ID if valid, fallback to default Vh1T5booFvY
  const activeVideoUrl = customVideoUrl || DEFAULT_VIDEO_URL;
  const match = activeVideoUrl.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
  const videoId = match ? match[1] : 'Vh1T5booFvY';
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Phase Intro Banner - Clean and structured */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col items-start gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Doppelstunde 1 • Phase 1
          </span>
          <span className="text-xs font-semibold text-slate-500">
            Dauer: ca. 20 Minuten
          </span>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Phase 1: Rechtliche Grundlagen & Arten der Verfügung
          </h2>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-4xl">
            Bevor Sie selbst eine Patientenverfügung erstellen, klären wir präzise die rechtlichen Grundbegriffe: Wer darf eigentlich entscheiden, wenn eine Person durch Unfall oder Krankheit nicht mehr selbst einwilligungsfähig ist?
          </p>
        </div>
      </div>

      {/* Transition to Video Box */}
      <StepTransition
        stepNumber="1"
        title="Video-Impuls ansehen"
        hint="Unterschiede der Vorsorgeinstrumente im Video"
        variant="blue"
      />

      {/* Video Box */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Schritt 1 • Impuls-Video
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
              Vorsorgevollmacht, Betreuungsverfügung, Patientenverfügung: Was ist der Unterschied?
            </h3>
          </div>

          <a
            href={activeVideoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition transform active:scale-95 no-print"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Auf YouTube öffnen</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Video Container with responsive 16:9 iframe embed */}
        <div className="max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 relative shadow-sm">
          <iframe
            className="w-full h-full"
            src={embedUrl}
            title="YouTube Video Player: Vorsorgevollmacht, Betreuungsverfügung, Patientenverfügung"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* Transition to Step 2 */}
      <StepTransition
        stepNumber="2"
        title="Die 4 Rechtsinstrumente im Detail studieren"
        variant="indigo"
      />

      {/* Step 1.2: Visual Slides - 4 Instrumente */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              Schritt 2 • Foliensatz & Schaubild
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Die 4 Instrumente im juristischen Detailvergleich
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Quelle: Großkopf & Klein (2019a, 2019b) • § 1358 BGB
          </span>
        </div>

        {/* Interaktives Didaktisches Schaubild: 4 Instrumente */}
        <DecisionTreePhase1 />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Betreuungsverfügung */}
          <div className="bg-gradient-to-br from-indigo-50/60 via-slate-50/40 to-white border-2 border-indigo-200/90 hover:border-indigo-400 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col justify-between group transition">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-xl text-xs font-bold bg-indigo-100 text-indigo-900 border border-indigo-300">
                  01a • Gerichtliche Anordnung
                </span>
                <Scale className="w-5 h-5 text-indigo-600" />
              </div>
              <h4 className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-700 transition">
                Betreuungsverfügung
              </h4>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed italic border-l-4 border-indigo-500 pl-4 bg-white/90 py-3 rounded-r-2xl shadow-2xs">
                „Mit der Anordnung entsteht lediglich ein <strong className="text-indigo-950">Vertretungsrecht für den Betreuer</strong>, das sich <strong className="text-indigo-950">nicht auf den gesamten Rechtskreis</strong> erstreckt.“
              </p>
              <div className="space-y-2.5 text-sm text-slate-800 bg-white/80 p-4 rounded-2xl border border-indigo-100/90 shadow-2xs">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Rechte des Betroffenen bleiben ungeschmälert.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span className="text-slate-900 font-bold">
                    Geschäfts- und Einsichtsfähigkeit bleiben bestehen!
                  </span>
                </div>
                <div className="flex items-start gap-2.5 pt-2 border-t border-indigo-100 text-amber-900 font-medium">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-amber-950">Nachrangigkeit:</strong> Existiert bereits eine ausreichende Bevollmächtigung, so ist die Anordnung einer Betreuung nicht möglich.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Vorsorgevollmacht */}
          <div className="bg-gradient-to-br from-sky-50/60 via-slate-50/40 to-white border-2 border-sky-200/90 hover:border-sky-400 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col justify-between group transition">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-xl text-xs font-bold bg-sky-100 text-sky-900 border border-sky-300">
                  01b • Rechtsgeschäftliche Vollmacht
                </span>
                <Sparkles className="w-5 h-5 text-sky-600" />
              </div>
              <h4 className="text-xl font-extrabold text-slate-900 group-hover:text-sky-700 transition">
                Vorsorgevollmacht
              </h4>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed italic border-l-4 border-sky-500 pl-4 bg-white/90 py-3 rounded-r-2xl shadow-2xs">
                „Bevollmächtigt eine Person, im Falle einer Notsituation alle oder bestimmte Aufgaben für den <strong className="text-sky-950">Vollmachtgeber</strong> zu erledigen.“
              </p>
              <div className="space-y-2.5 text-sm text-slate-800 bg-white/80 p-4 rounded-2xl border border-sky-100/90 shadow-2xs">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span>
                    Der Bevollmächtigte wird zum <strong className="text-sky-950 font-bold">Vertreter im Willen</strong> (entscheidet an Stelle des Vollmachtgebers).
                  </span>
                </div>
                <div className="flex items-start gap-2.5 pt-2 border-t border-sky-100 text-blue-950 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-blue-900">Vorrang vor Betreuung:</strong> Betreuung ist nicht erforderlich, soweit Angelegenheiten durch einen Bevollmächtigten ebenso gut besorgt werden können (§ 1896 Abs. 2 Satz 2 BGB).
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Vertretungsrecht Eheleute */}
          <div className="bg-gradient-to-br from-amber-50/60 via-slate-50/40 to-white border-2 border-amber-200/90 hover:border-amber-400 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col justify-between group transition">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-xl text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  01c • Gesetzliches Notvertretungsrecht
                </span>
                <Calendar className="w-5 h-5 text-amber-600" />
              </div>
              <h4 className="text-xl font-extrabold text-slate-900 group-hover:text-amber-800 transition">
                Vertretungsrecht Eheleute (§ 1358 BGB)
              </h4>
              <div className="space-y-2.5 text-sm text-slate-800 bg-white/80 p-4 rounded-2xl border border-amber-100/90 shadow-2xs">
                <div className="flex items-start gap-2.5">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong className="text-amber-950">Seit 01.01.2023</strong> gesetzlich geregelt.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Greift aufgrund von <strong className="text-amber-950">Bewusstlosigkeit und/oder Krankheit</strong>, die eine Unfähigkeit der Regelung eigener Angelegenheiten bewirkt.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong className="text-amber-950">Schweigepflicht</strong> wird gegenüber der vertretenden Person aufgehoben.</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-700">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span><strong className="text-rose-900">Ausschluss:</strong> Trifft nicht zu, wenn Eheleute getrennt leben, Ehepartner:in ablehnt oder eine andere Verfügung in Kraft getreten ist.</span>
                </div>
                <div className="flex items-start gap-2.5 pt-2 border-t border-amber-100 text-amber-950 font-bold">
                  <span className="text-amber-600">⏱</span>
                  <span>Befristung: Vertretungsrecht gilt für maximal 6 Monate.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Patientenverfügung */}
          <div className="bg-gradient-to-br from-emerald-50/60 via-slate-50/40 to-white border-2 border-emerald-200/90 hover:border-emerald-400 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col justify-between group transition">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                  01d • Medizinische Willenserklärung
                </span>
                <Zap className="w-5 h-5 text-emerald-600" />
              </div>
              <h4 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-800 transition">
                Patientenverfügung
              </h4>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed italic border-l-4 border-emerald-500 pl-4 bg-white/90 py-3 rounded-r-2xl shadow-2xs">
                „Schriftliche Verfügung einer erwachsenen Person über zu ergreifende bzw. zu unterlassende <strong className="text-emerald-950">medizinische Maßnahmen</strong> (ärztliche Heileingriffe, Verweigerung lebensverlängernder Maßnahmen) für den Fall, dass sie ihren Willen nicht (wirksam) gegenüber Ärzten, Pflegekräften oder Einrichtungsträgern erklären kann.“
              </p>
              <div className="space-y-2.5 text-sm text-slate-800 bg-white/80 p-4 rounded-2xl border border-emerald-100/90 shadow-2xs">
                <div className="font-bold text-emerald-950 pt-1 flex items-start gap-2">
                  <Zap className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    Wichtig: Sie <strong className="underline decoration-emerald-500 underline-offset-2">„wirkt aus sich heraus“</strong>, d. h., sie ist – sobald von ihrer Existenz Kenntnis erlangt wurde – <u>sofort und ohne nachzufragen zu achten</u>!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transition to Step 3 */}
      <StepTransition
        stepNumber="3"
        title="Präzisions-Check lösen"
        hint="Interaktiver Selbsttest zur Begriffsabgrenzung"
        variant="emerald"
      />

      {/* Interactive Precision Quiz */}
      <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Schritt 3 • Interaktiver Selbsttest
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
              Präzisions-Check: Bringen Sie die Begriffe nicht durcheinander!
            </h3>
            <p className="text-sm text-slate-600 mt-1 font-medium">
              Wählen Sie für jede Aussage das exakt passende juristische Instrument:
            </p>
          </div>

          <button
            onClick={handleCheckQuiz}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition transform active:scale-95 cursor-pointer no-print"
          >
            Antworten prüfen
          </button>
        </div>

        <div className="space-y-4">
          {QUIZ_QUESTIONS.map((q) => {
            const selectedVal = localAnswers[q.id] || '';
            const isCorrect = feedback.submitted ? feedback.results[q.id] : null;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border-2 transition ${
                  isCorrect === true
                    ? 'bg-emerald-50/80 border-emerald-300'
                    : isCorrect === false
                    ? 'bg-rose-50/80 border-rose-300'
                    : 'bg-slate-50/80 border-slate-200 hover:border-slate-300'
                } flex flex-col md:flex-row md:items-center justify-between gap-4`}
              >
                <div className="space-y-1.5 flex-1">
                  <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {q.question}
                  </span>
                  {feedback.submitted && (
                    <p
                      className={`text-sm mt-1.5 font-semibold ${
                        isCorrect ? 'text-emerald-800' : 'text-rose-800'
                      }`}
                    >
                      {q.explanation}
                    </p>
                  )}
                </div>

                <div className="shrink-0">
                  <select
                    value={selectedVal}
                    onChange={(e) => handleSelectAnswer(q.id, e.target.value)}
                    className={`w-full md:w-72 px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition focus:outline-none focus:ring-2 ${
                      isCorrect === true
                        ? 'bg-white text-emerald-950 border-emerald-400 focus:ring-emerald-200'
                        : isCorrect === false
                        ? 'bg-white text-rose-950 border-rose-400 focus:ring-rose-200'
                        : 'bg-white text-slate-900 border-slate-300 focus:ring-blue-200 focus:border-blue-500'
                    }`}
                  >
                    <option value="">-- Instrument auswählen --</option>
                    {q.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feedback result alert */}
        {feedback.submitted && (
          <div
            className={`p-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-between gap-3 ${
              feedback.score === 4
                ? 'bg-emerald-50 border border-emerald-300 text-emerald-900'
                : 'bg-amber-50 border border-amber-300 text-amber-900'
            }`}
          >
            <div className="flex items-center gap-2">
              {feedback.score === 4 ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <HelpCircle className="w-5 h-5 text-amber-600 shrink-0" />
              )}
              <span>
                {feedback.score === 4
                  ? 'Perfekt! Alle 4 juristischen Begriffe wurden fehlerfrei zugeordnet. Ausgezeichnete Vorbereitung für Schritt 2!'
                  : `${feedback.score} von 4 richtig. Prüfen Sie die rot hervorgehobenen Instrumente noch einmal mit den oberen Vergleichskarten.`}
              </span>
            </div>
            {feedback.score === 4 && (
              <span className="text-[11px] bg-emerald-100 px-2.5 py-1 rounded-full text-emerald-800 border border-emerald-300">
                Badge freigeschaltet!
              </span>
            )}
          </div>
        )}
      </div>

      {/* PLENUM STOPP 1 */}
      <div className="bg-amber-50/80 border-2 border-amber-300 rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-5 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 text-xl font-black shrink-0">
            🛑
          </div>
          <div>
            <h4 className="font-extrabold text-amber-900 text-base uppercase tracking-wide">
              Plenum-Stopp 1: Begriffsschärfung im Kurs
            </h4>
            <p className="text-xs sm:text-sm text-amber-800 mt-1 leading-relaxed max-w-2xl">
              Bevor Sie gleich in die Online-Generatoren starten, klären wir im Unterrichtsgespräch verbliebene Fragen zu den vier Verfügungsarten. Erst danach geht es weiter zu Schritt 2!
            </p>
          </div>
        </div>

        <button
          onClick={onNextPhase}
          className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm tracking-wide shrink-0 shadow-sm transition transform active:scale-95 flex items-center gap-2 cursor-pointer no-print"
        >
          <span>Weiter zu Schritt 2</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
