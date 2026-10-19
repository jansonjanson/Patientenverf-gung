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
import { sounds } from '../../utils/audio';

interface Phase1OrientationProps {
  quizAnswers: Record<string, string>;
  quizSubmitted: boolean;
  quizScore: number;
  customVideoUrl: string;
  onUpdateQuizAnswers: (answers: Record<string, string>, submitted: boolean, score: number) => void;
  onNextPhase: () => void;
}

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
    sounds.playClick();
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
      sounds.playTriumph();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#10b981', '#38bdf8', '#f59e0b'],
      });
    } else {
      sounds.playCorrect();
    }
  };

  // Extract YouTube ID if valid
  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    const match = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const embedUrl = getEmbedUrl(customVideoUrl);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Phase Intro Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              Doppelstunde 1 • Schritt 1 (ca. 20 Minuten)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            01. Arten der Verfügung & Orientierungskompass
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            Bevor Sie selbst eine Patientenverfügung erstellen, klären wir präzise die rechtlichen Grundbegriffe: Wer darf eigentlich entscheiden, wenn eine Person durch Unfall oder Krankheit nicht mehr selbst entscheiden kann?
          </p>
        </div>

        <div className="bg-slate-950/70 p-4 sm:p-5 rounded-2xl border border-slate-800 shrink-0 text-xs sm:text-sm text-slate-300 max-w-sm w-full">
          <div className="font-bold text-white flex items-center gap-1.5 mb-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Arbeitsauftrag Schritt 1:
          </div>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-400 text-xs leading-relaxed">
            <li>Fachvideo ansehen (ca. 5 Min.)</li>
            <li>Foliensatz „01. Arten der Verfügung“ sichten</li>
            <li>Präzisions-Check (Zuordnung) interaktiv lösen</li>
          </ol>
        </div>
      </div>

      {/* Video Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Impuls-Video (5 Min.)
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
              Vorsorgevollmacht, Betreuungsverfügung, Patientenverfügung: Was ist der Unterschied?
            </h3>
          </div>

          <a
            href="https://www.youtube.com/results?search_query=Vorsorgevollmacht+Betreuungsverf%C3%BCgung+Patientenverf%C3%BCgung+Was+ist+der+Unterschied"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md transition transform active:scale-95 no-print"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Auf YouTube öffnen</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Video Container */}
          <div className="lg:col-span-7 aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative flex flex-col items-center justify-center text-center p-6 group">
            {embedUrl ? (
              <iframe
                className="w-full h-full rounded-2xl"
                src={embedUrl}
                title="YouTube Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="space-y-4 max-w-md">
                <div className="w-16 h-16 rounded-full bg-blue-600/20 border border-blue-400/40 flex items-center justify-center mx-auto text-blue-400 group-hover:scale-110 transition duration-300">
                  <Play className="w-8 h-8 fill-blue-400 ml-1" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base">
                    Fachvideo: Die 3 Vorsorgeinstrumente im Vergleich
                  </h4>
                  <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                    Schauen Sie das Video gemeinsam am Beamer an oder öffnen Sie es über den Button oben rechts. Achten Sie auf die Rolle des Gerichts und die Voraussetzungen.
                  </p>
                </div>
                <div className="text-[11px] text-slate-500 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                  (Dozenten-Tipp: Im Dozenten-Cockpit kann ein direkter YouTube-Link eingebettet werden)
                </div>
              </div>
            )}
          </div>

          {/* Active Listening Prompt */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-950/40 to-slate-900/60 rounded-2xl p-5 sm:p-6 border border-blue-500/20 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-blue-300">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Worauf es jetzt ankommt (Präzision!):</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              In der Praxis werden die vier Instrumente fast immer verwechselt. Achten Sie beim Zuschauen und auf den folgenden Folien genau auf diese vier Kernfragen:
            </p>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-md bg-blue-500/20 text-blue-400 font-bold text-[11px] flex items-center justify-center shrink-0">
                  1
                </span>
                <span>
                  Welches Dokument macht eine Person sofort zum <strong>„Vertreter im Willen“</strong> – ganz ohne Gericht?
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-md bg-blue-500/20 text-blue-400 font-bold text-[11px] flex items-center justify-center shrink-0">
                  2
                </span>
                <span>
                  Was passiert mit der <strong>Geschäfts- und Einsichtsfähigkeit</strong>, wenn eine Betreuung angeordnet wird?
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-md bg-blue-500/20 text-blue-400 font-bold text-[11px] flex items-center justify-center shrink-0">
                  3
                </span>
                <span>
                  Wie lange und unter welchen Bedingungen gilt das <strong>gesetzliche Vertretungsrecht für Eheleute (§ 1358 BGB)</strong>?
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-md bg-blue-500/20 text-blue-400 font-bold text-[11px] flex items-center justify-center shrink-0">
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
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Folien-Sicherung • Kapitel 01
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Die 4 Instrumente im juristischen Vergleich
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Quelle: Großkopf & Klein (2019a, 2019b) • § 1358 BGB
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Betreuungsverfügung */}
          <div className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-3xl p-6 shadow-xl transition flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  01a • Gerichtliche Anordnung
                </span>
                <Scale className="w-4 h-4 text-indigo-400" />
              </div>
              <h4 className="text-lg font-bold text-white group-hover:text-indigo-300 transition">
                Betreuungsverfügung
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic border-l-2 border-indigo-500 pl-3">
                „(…) Das Wesen der Betreuung besteht darin, dass mit deren Anordnung lediglich ein <strong>Vertretungsrecht für den Betreuer</strong> entsteht. Das Vertretungsrecht erstreckt sich <strong>nicht auf den gesamten Rechtskreis</strong>.“
              </p>
              <div className="space-y-2 text-xs text-slate-300 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span>Rechte des Betroffenen bleiben ungeschmälert.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span className="text-white font-semibold">
                    Geschäfts- und Einsichtsfähigkeit bleiben bestehen!
                  </span>
                </div>
                <div className="flex items-start gap-2 pt-1 border-t border-slate-800 text-amber-300">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Nachrangigkeit:</strong> Existiert bereits eine ausreichende Bevollmächtigung, so ist die Anordnung einer Betreuung nicht möglich.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Vorsorgevollmacht */}
          <div className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-3xl p-6 shadow-xl transition flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  01b • Rechtsgeschäftliche Vollmacht
                </span>
                <Sparkles className="w-4 h-4 text-blue-400" />
              </div>
              <h4 className="text-lg font-bold text-white group-hover:text-blue-300 transition">
                Vorsorgevollmacht
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic border-l-2 border-blue-500 pl-3">
                „(…) bevollmächtigt nach deutschem Recht eine Person, im Falle einer Notsituation alle oder bestimmte Aufgaben für den <strong>Vollmachtgeber</strong> zu erledigen.“
              </p>
              <div className="space-y-2 text-xs text-slate-300 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    Mit der Vorsorgevollmacht wird der Bevollmächtigte zum <strong>Vertreter im Willen</strong>, d. h., er entscheidet an Stelle des Vollmachtgebers.
                  </span>
                </div>
                <div className="flex items-start gap-2 pt-1 border-t border-slate-800 text-blue-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Vorrang vor Betreuung:</strong> Die Betreuung ist nicht erforderlich, soweit die Angelegenheiten durch einen Bevollmächtigten besorgt werden können (§ 1896 Abs. 2 Satz 2 BGB).
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Vertretungsrecht Eheleute */}
          <div className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-3xl p-6 shadow-xl transition flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  01c • Gesetzliches Notvertretungsrecht
                </span>
                <Calendar className="w-4 h-4 text-amber-400" />
              </div>
              <h4 className="text-lg font-bold text-white group-hover:text-amber-300 transition">
                Vertretungsrecht Eheleute (§ 1358 BGB)
              </h4>
              <div className="space-y-2 text-xs text-slate-300 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Seit 01.01.2023</strong> gesetzlich geregelt (Bereich der Gesundheitssorge).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>Greift bei <strong>Bewusstlosigkeit oder akuter Krankheit</strong>.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Schweigepflicht</strong> wird gegenüber dem Ehegatten aufgehoben.</span>
                </div>
                <div className="flex items-start gap-2 pt-1 border-t border-slate-800 text-amber-300">
                  <span className="text-amber-400 font-bold">⏱</span>
                  <span className="font-semibold">Befristung: Gilt maximal für 6 Monate!</span>
                </div>
                <div className="flex items-start gap-2 text-slate-400">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Ausschluss bei Getrenntleben oder wenn eine andere Verfügung existiert.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Patientenverfügung */}
          <div className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-6 shadow-xl transition flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  01d • Medizinische Willenserklärung
                </span>
                <Zap className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-lg font-bold text-white group-hover:text-emerald-300 transition">
                Patientenverfügung
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic border-l-2 border-emerald-500 pl-3">
                „(…) ist eine <strong>schriftliche Verfügung</strong> über gegebenenfalls zu ergreifende bzw. zu unterlassende <strong>medizinische Maßnahmen</strong>, die eine erwachsene Person für den Fall niederlegt, dass sie durch Krankheit oder Unfall in eine Lage gerät, in der es ihr nicht [mehr] möglich ist, entsprechende Entscheidungen zu treffen.“
              </p>
              <div className="space-y-2 text-xs text-slate-300 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <div>
                  <strong>Willenserklärung:</strong> Bezieht sich auf ärztliche Heileingriffe und die Verweigerung lebensverlängernder Maßnahmen im Voraus.
                </div>
                <div className="font-bold text-emerald-300 pt-2 border-t border-slate-800 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  ⚡ „Wirkt aus sich heraus“: Sofort und ohne nachzufragen zu achten!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Precision Quiz */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Interaktiver Selbsttest
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Präzisions-Check: Bringen Sie die Begriffe nicht durcheinander!
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Wählen Sie für jede Aussage das exakt passende juristische Instrument:
            </p>
          </div>

          <button
            onClick={handleCheckQuiz}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-900/40 transition transform active:scale-95 cursor-pointer no-print"
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
                    ? 'bg-emerald-950/30 border-emerald-500/40'
                    : isCorrect === false
                    ? 'bg-rose-950/30 border-rose-500/40'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                } flex flex-col md:flex-row md:items-center justify-between gap-3`}
              >
                <div className="space-y-1 flex-1">
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">
                    {q.question}
                  </span>
                  {feedback.submitted && (
                    <p
                      className={`text-xs mt-1 ${
                        isCorrect ? 'text-emerald-400' : 'text-rose-400'
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
                        ? 'bg-emerald-900/40 text-emerald-200 border-emerald-500/50'
                        : isCorrect === false
                        ? 'bg-rose-900/40 text-rose-200 border-rose-500/50'
                        : 'bg-slate-900 text-slate-200 border-slate-700 focus:ring-blue-500'
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
                ? 'bg-emerald-950/50 border border-emerald-500/40 text-emerald-300'
                : 'bg-amber-950/50 border border-amber-500/40 text-amber-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {feedback.score === 4 ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <HelpCircle className="w-5 h-5 text-amber-400 shrink-0" />
              )}
              <span>
                {feedback.score === 4
                  ? 'Perfekt! Alle 4 juristischen Begriffe wurden fehlerfrei zugeordnet. Ausgezeichnete Vorbereitung für Schritt 2!'
                  : `${feedback.score} von 4 richtig. Prüfen Sie die rot hervorgehobenen Instrumente noch einmal mit den oberen Vergleichskarten.`}
              </span>
            </div>
            {feedback.score === 4 && (
              <span className="text-[11px] bg-emerald-500/20 px-2.5 py-1 rounded-full text-emerald-300 border border-emerald-500/30">
                Badge freigeschaltet!
              </span>
            )}
          </div>
        )}
      </div>

      {/* PLENUM STOPP 1 */}
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/40 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-5 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 text-xl font-black shrink-0">
            🛑
          </div>
          <div>
            <h4 className="font-extrabold text-amber-300 text-base uppercase tracking-wide">
              Plenum-Stopp 1: Begriffsschärfung im Kurs
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed max-w-2xl">
              Bevor Sie gleich in die Online-Generatoren starten, klären wir im Unterrichtsgespräch verbliebene Fragen zu den vier Verfügungsarten. Erst danach geht es weiter zu Schritt 2!
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sounds.playClick();
            onNextPhase();
          }}
          className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide shrink-0 shadow-lg shadow-amber-900/30 transition transform active:scale-95 flex items-center gap-2 cursor-pointer no-print"
        >
          <span>Weiter zu Schritt 2</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
