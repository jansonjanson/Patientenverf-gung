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
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Phase Intro Banner */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Doppelstunde 1 • Schritt 1
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            01. Arten der Verfügung & Orientierungskompass
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
            Bevor Sie selbst eine Patientenverfügung erstellen, klären wir präzise die rechtlichen Grundbegriffe: Wer darf eigentlich entscheiden, wenn eine Person durch Unfall oder Krankheit nicht mehr selbst entscheiden kann?
          </p>
        </div>

        {/* Quick Task Card */}
        <div className="bg-slate-50 border border-slate-200 p-4 sm:p-5 rounded-2xl shrink-0 w-full lg:w-80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Arbeitsauftrag Schritt 1:</span>
          </div>
          <ol className="text-xs text-slate-600 space-y-1 list-decimal list-inside">
            <li>Fachvideo ansehen</li>
            <li>Foliensatz „01. Arten der Verfügung“ sichten</li>
            <li>Präzisions-Check (Zuordnung) interaktiv lösen</li>
          </ol>
        </div>
      </div>

      {/* Video Box */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Impuls-Video
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Video Container with responsive 16:9 iframe embed */}
          <div className="lg:col-span-7 aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 relative shadow-sm">
            <iframe
              className="w-full h-full"
              src={embedUrl}
              title="YouTube Video Player: Vorsorgevollmacht, Betreuungsverfügung, Patientenverfügung"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Active Listening Prompt */}
          <div className="lg:col-span-5 bg-blue-50/60 rounded-2xl p-5 sm:p-6 border border-blue-100 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-blue-900">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Worauf es jetzt ankommt (Präzision!):</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              In der Praxis werden die vier Instrumente fast immer verwechselt. Achten Sie beim Zuschauen und auf den folgenden Folien genau auf diese vier Kernfragen:
            </p>
            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-md bg-blue-200 text-blue-900 font-bold text-[11px] flex items-center justify-center shrink-0">
                  1
                </span>
                <span>
                  Welches Dokument macht eine Person sofort zum <strong>„Vertreter im Willen“</strong> – ganz ohne Gericht?
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-md bg-blue-200 text-blue-900 font-bold text-[11px] flex items-center justify-center shrink-0">
                  2
                </span>
                <span>
                  Was passiert mit der <strong>Geschäfts- und Einsichtsfähigkeit</strong>, wenn eine Betreuung angeordnet wird?
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-md bg-blue-200 text-blue-900 font-bold text-[11px] flex items-center justify-center shrink-0">
                  3
                </span>
                <span>
                  Wie lange und unter welchen Bedingungen gilt das <strong>gesetzliche Vertretungsrecht für Eheleute (§ 1358 BGB)</strong>?
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-md bg-blue-200 text-blue-900 font-bold text-[11px] flex items-center justify-center shrink-0">
                  4
                </span>
                <span>
                  Warum wirkt eine <strong>Patientenverfügung „aus sich heraus“</strong>?
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Step 1.2: Visual Slides - 4 Instrumente */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Folien-Sicherung • Kapitel 01
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Die 4 Instrumente im juristischen Vergleich
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
          <div className="bg-white border-l-4 border-l-indigo-600 border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  01a • Gerichtliche Anordnung
                </span>
                <Scale className="w-4 h-4 text-indigo-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition">
                Betreuungsverfügung
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic border-l-2 border-indigo-400 pl-3 bg-slate-50 py-2 rounded-r-xl">
                „Mit der Anordnung entsteht lediglich ein <strong>Vertretungsrecht für den Betreuer</strong>, das sich <strong>nicht auf den gesamten Rechtskreis</strong> erstreckt.“
              </p>
              <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Rechte des Betroffenen bleiben ungeschmälert.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span className="text-slate-900 font-semibold">
                    Geschäfts- und Einsichtsfähigkeit bleiben bestehen!
                  </span>
                </div>
                <div className="flex items-start gap-2 pt-1 border-t border-slate-200 text-amber-800">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Nachrangigkeit:</strong> Existiert bereits eine ausreichende Bevollmächtigung, so ist die Anordnung einer Betreuung nicht möglich.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Vorsorgevollmacht */}
          <div className="bg-white border-l-4 border-l-sky-600 border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
                  01b • Rechtsgeschäftliche Vollmacht
                </span>
                <Sparkles className="w-4 h-4 text-sky-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition">
                Vorsorgevollmacht
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic border-l-2 border-sky-400 pl-3 bg-slate-50 py-2 rounded-r-xl">
                „Bevollmächtigt eine Person, im Falle einer Notsituation alle oder bestimmte Aufgaben für den <strong>Vollmachtgeber</strong> zu erledigen.“
              </p>
              <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span>
                    Der Bevollmächtigte wird zum <strong>Vertreter im Willen</strong> (entscheidet an Stelle des Vollmachtgebers).
                  </span>
                </div>
                <div className="flex items-start gap-2 pt-1 border-t border-slate-200 text-blue-900">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Vorrang vor Betreuung:</strong> Betreuung ist nicht erforderlich, soweit Angelegenheiten durch einen Bevollmächtigten ebenso gut besorgt werden können (§ 1896 Abs. 2 Satz 2 BGB).
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Vertretungsrecht Eheleute */}
          <div className="bg-white border-l-4 border-l-amber-500 border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  01c • Gesetzliches Notvertretungsrecht
                </span>
                <Calendar className="w-4 h-4 text-amber-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition">
                Vertretungsrecht Eheleute (§ 1358 BGB)
              </h4>
              <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>Seit 01.01.2023</strong> gesetzlich geregelt.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Greift aufgrund von <strong>Bewusstlosigkeit und/oder Krankheit</strong>, die eine Unfähigkeit der Regelung eigener Angelegenheiten bewirkt.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>Schweigepflicht</strong> wird gegenüber der vertretenden Person aufgehoben.</span>
                </div>
                <div className="flex items-start gap-2 text-slate-600">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span><strong>Ausschluss:</strong> Trifft nicht zu, wenn Eheleute getrennt leben, Ehepartner:in ablehnt oder eine andere Verfügung in Kraft getreten ist.</span>
                </div>
                <div className="flex items-start gap-2 pt-1 border-t border-slate-200 text-amber-900">
                  <span className="text-amber-600 font-bold">⏱</span>
                  <span className="font-semibold"><strong>Befristung:</strong> Vertretungsrecht gilt für <strong>6 Monate</strong>.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Patientenverfügung */}
          <div className="bg-white border-l-4 border-l-emerald-600 border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  01d • Medizinische Willenserklärung
                </span>
                <Zap className="w-4 h-4 text-emerald-600" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition">
                Patientenverfügung
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic border-l-2 border-emerald-500 pl-3 bg-slate-50 py-2 rounded-r-xl">
                „Schriftliche Verfügung einer erwachsenen Person über zu ergreifende bzw. zu unterlassende <strong>medizinische Maßnahmen</strong> (ärztliche Heileingriffe, Verweigerung lebensverlängernder Maßnahmen) für den Fall, dass sie ihren Willen nicht (wirksam) gegenüber Ärzten, Pflegekräften oder Einrichtungsträgern erklären kann.“
              </p>
              <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div className="font-bold text-emerald-900 pt-1 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Wichtig: Sie <strong>„wirkt aus sich heraus“</strong>, d. h., sie ist – sobald von ihrer Existenz Kenntnis erlangt wurde – <u>sofort und ohne nachzufragen zu achten</u>!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Precision Quiz */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Interaktiver Selbsttest
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Präzisions-Check: Bringen Sie die Begriffe nicht durcheinander!
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Wählen Sie für jede Aussage das exakt passende juristische Instrument:
            </p>
          </div>

          <button
            onClick={handleCheckQuiz}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition transform active:scale-95 cursor-pointer no-print"
          >
            Antworten prüfen
          </button>
        </div>

        <div className="space-y-3.5">
          {QUIZ_QUESTIONS.map((q) => {
            const selectedVal = localAnswers[q.id] || '';
            const isCorrect = feedback.submitted ? feedback.results[q.id] : null;

            return (
              <div
                key={q.id}
                className={`p-4 rounded-2xl border transition ${
                  isCorrect === true
                    ? 'bg-emerald-50/70 border-emerald-300'
                    : isCorrect === false
                    ? 'bg-rose-50/70 border-rose-300'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                } flex flex-col md:flex-row md:items-center justify-between gap-3`}
              >
                <div className="space-y-1 flex-1">
                  <span className="text-xs sm:text-sm font-semibold text-slate-900">
                    {q.question}
                  </span>
                  {feedback.submitted && (
                    <p
                      className={`text-xs mt-1 font-medium ${
                        isCorrect ? 'text-emerald-700' : 'text-rose-700'
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
                    className={`w-full md:w-64 px-3.5 py-2 rounded-xl text-xs font-bold border transition focus:outline-none focus:ring-2 ${
                      isCorrect === true
                        ? 'bg-white text-emerald-900 border-emerald-400 focus:ring-emerald-200'
                        : isCorrect === false
                        ? 'bg-white text-rose-900 border-rose-400 focus:ring-rose-200'
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
