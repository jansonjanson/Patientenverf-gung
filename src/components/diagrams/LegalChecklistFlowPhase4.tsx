import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Scale, Sparkles, ChevronRight, Zap } from 'lucide-react';

export const LegalChecklistFlowPhase4: React.FC = () => {
  const [activeReq, setActiveReq] = useState<number>(1);
  const [viewedReqs, setViewedReqs] = useState<number[]>([1]);
  const [activeFormulaPart, setActiveFormulaPart] = useState<'wenn' | 'dann'>('wenn');

  const requirements = [
    {
      num: 1,
      title: 'Einwilligungsfähigkeit ausreichend',
      sub: 'Volljährigkeit & geistige Einsicht',
      details: 'Bei Verfassung muss Person einwilligungsfähig sein. Es genügen 3 kumulative Voraussetzungen:',
      bulletPoints: [
        'Einsichtsfähig: Versteht Art, Bedeutung und Tragweite der medizinischen Maßnahme.',
        'Urteilsfähig: Kann Vor- und Nachteile sowie Handlungsalternativen rational abwägen.',
        'Freie Willensbildung: Kann die Entscheidung frei von unzulässigem äußerem Druck oder Manipulation treffen.',
      ],
      legalNote: 'Wichtig: Volle Geschäftsfähigkeit ist NICHT zwingend; Einwilligungsfähigkeit im medizinischen Sinne genügt!',
    },
    {
      num: 2,
      title: 'Schriftlich verfasst & unterschrieben',
      sub: 'Formstrenge nach § 1827 BGB',
      details: 'Muss eigenhändig unterzeichnet oder durch ein notariell beglaubigtes Handzeichen signiert sein.',
      bulletPoints: [
        'Eigenhändige Unterschrift mit Datum dringend geboten.',
        'Wichtiger Zusatz: Eine notarielle Beglaubigung oder Beurkundung ist NICHT notwendig!',
      ],
      legalNote: 'Ein rein mündlicher Wille ist keine formgültige Patientenverfügung (kann aber als mutmaßlicher Wille herangezogen werden).',
    },
    {
      num: 3,
      title: 'Erklärung der (Nicht-)Einwilligung im Voraus',
      sub: 'Rechtsverbindliche Vorab-Entscheidung',
      details: 'Muss eine konkrete Willensentscheidung über die Durchführung oder das Unterlassen medizinischer Eingriffe enthalten.',
      bulletPoints: [
        'Gilt für den Fall künftiger Unfähigkeit zur eigenen Willensäußerung.',
        'Reine unverbindliche „Behandlungswünsche“ oder bloße Lebensphilosophien reichen NICHT aus.',
      ],
      legalNote: 'Die Verfügung entfaltet unmittelbare Gesetzeskraft für Behandelnde (§ 1827 Abs. 1 BGB).',
    },
    {
      num: 4,
      title: 'Bestimmtheit (WENN-DANN-Logik)',
      sub: 'Krankheitsbild & Maßnahmen exakt',
      details: 'Zentrales Kriterium des BGH (Beschlüsse 2016 & 2018): Allgemeine Floskeln sind rechtlich unwirksam!',
      bulletPoints: [
        'WENN: Eindeutige Beschreibung des Behandlungszustandes (z. B. irreversibles Koma, terminale Erkrankung).',
        'DANN: Spezifische Anweisung über Maßnahmen (Beatmung, künstliche Ernährung/PEG, Dialyse, Reanimation).',
      ],
      legalNote: '„Würdevoll sterben“ oder „keine Schläuche“ sind zu unbestimmt und binden den Arzt nicht!',
    },
    {
      num: 5,
      title: 'Keine Anzeichen der Willensänderung',
      sub: 'Aktualität & Widerruflichkeit',
      details: 'Eine Patientenverfügung kann jederzeit formlos widerrufen werden – auch mündlich oder durch schlüssiges Verhalten.',
      bulletPoints: [
        'Keine konkreten Anhaltspunkte, dass der Verfasser seinen Willen zwischenzeitlich geändert hat.',
        'Widerruf bedarf keiner Schriftform; geäußerte Abwehr in der Behandlungssituation hat immer Vorrang.',
      ],
      legalNote: 'Regelmäßige Erneuerung der Unterschrift (z. B. alle 2 Jahre) ist rechtlich nicht Pflicht, aber beweiskräftig.',
    },
    {
      num: 6,
      title: 'Keine Sittenwidrigkeit',
      sub: 'Rechtliche Schranken (§ 138 BGB)',
      details: 'Der geäußerte Wille darf nicht gegen zwingende Rechtsverbote oder die guten Sitten verstoßen.',
      bulletPoints: [
        'Verlangen nach aktiver direkter Sterbehilfe (Tötung auf Verlangen, § 216 StGB) ist unwirksam!',
        'Der Verzicht auf lebenserhaltende Maßnahmen (passive Sterbehilfe/Therapiezieländerung) ist dagegen ausdrücklich rechtmäßig.',
      ],
      legalNote: 'Ärzt:innen und Pflegende dürfen niemals zu Straftaten verpflichtet werden.',
    },
  ];

  const handleSelectReq = (num: number) => {
    setActiveReq(num);
    if (!viewedReqs.includes(num)) {
      setViewedReqs([...viewedReqs, num]);
    }
  };

  const handleNextReq = () => {
    const nextNum = activeReq < 6 ? activeReq + 1 : 1;
    handleSelectReq(nextNum);
  };

  const current = requirements.find((r) => r.num === activeReq) || requirements[0];
  const nextUnviewed = requirements.find((r) => !viewedReqs.includes(r.num))?.num;

  return (
    <div className="bg-white rounded-3xl border-2 border-blue-200/90 p-5 md:p-7 shadow-xs mb-6 space-y-6">
      {/* Header with Progress Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-700 shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-lg font-black text-slate-900">
              Didaktisches Prüfschema: Die 6 Voraussetzungen (Großkopf & Klein)
            </h4>
            <p className="text-xs text-slate-600 font-medium">
              Klicken Sie nacheinander auf alle 6 Kacheln, um das juristische Prüfschema vollständig zu erfassen.
            </p>
          </div>
        </div>

        {/* Progress Counter */}
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full self-start sm:self-auto">
          <span className="text-xs font-bold text-blue-900">
            Gelernt: {viewedReqs.length} / 6 Kriterien
          </span>
          <div className="w-16 h-2 bg-blue-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${(viewedReqs.length / 6) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* 6 Step Sequence Flow with Interactive Pulse & Arrows */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
        {requirements.map((r) => {
          const isActive = activeReq === r.num;
          const isViewed = viewedReqs.includes(r.num);
          const isNextTarget = r.num === nextUnviewed;

          return (
            <button
              key={r.num}
              type="button"
              onClick={() => handleSelectReq(r.num)}
              className={`p-3 rounded-2xl border-2 text-left transition-all relative group cursor-pointer ${
                isActive
                  ? 'border-blue-600 bg-blue-50 shadow-md ring-2 ring-blue-200 scale-[1.02]'
                  : isNextTarget
                  ? 'border-amber-400 bg-amber-50/80 shadow-xs animate-pulse ring-2 ring-amber-300'
                  : isViewed
                  ? 'border-slate-200 bg-white hover:border-slate-300'
                  : 'border-blue-200 bg-blue-50/30 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`w-6 h-6 rounded-xl flex items-center justify-center text-xs font-black ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : isViewed
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
                >
                  {r.num}
                </span>

                {isViewed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : isNextTarget ? (
                  <span className="text-[10px] font-black uppercase text-amber-900 bg-amber-200 px-1.5 py-0.5 rounded">
                    Hier!
                  </span>
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
                )}
              </div>

              <p className="text-xs font-black text-slate-900 line-clamp-2 leading-snug">
                {r.title}
              </p>

              {!isViewed && (
                <span className="text-[10px] text-blue-700 font-bold block mt-1.5 underline decoration-blue-400">
                  Details ansehen ➔
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Requirement Details Box */}
      <div className="bg-gradient-to-br from-blue-50/80 via-slate-50/40 to-white border-2 border-blue-200 rounded-3xl p-5 sm:p-6 text-xs sm:text-sm space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-blue-200">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-2xs">
              {current.num}
            </span>
            <div>
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block">
                Voraussetzung 0{current.num} von 06
              </span>
              <h5 className="font-extrabold text-slate-900 text-base">{current.title}</h5>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-xs font-semibold">{current.sub}</span>
            <button
              onClick={handleNextReq}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 transition shadow-lg shadow-amber-400/40 border-2 border-amber-300 animate-pulse active:scale-95 cursor-pointer no-print"
            >
              <span>Nächstes Kriterium ➔</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>

        <p className="text-slate-800 font-medium leading-relaxed">{current.details}</p>

        <ul className="space-y-2">
          {current.bulletPoints.map((bp, i) => (
            <li key={i} className="flex items-start gap-2.5 text-slate-900 font-medium bg-white/90 p-3 rounded-2xl border border-blue-100 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>{bp}</span>
            </li>
          ))}
        </ul>

        <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-300 text-amber-950 font-medium leading-relaxed flex items-start gap-2.5">
          <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span><strong>Rechtliche Konsequenz:</strong> {current.legalNote}</span>
        </div>
      </div>

      {/* WENN-DANN Formula Interactive Box */}
      <div className="border-2 border-slate-200 bg-slate-50/90 rounded-3xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              BGH-Formel: Das Bestimmtheitsgebot im Detail
            </h5>
          </div>
          <span className="text-2xs text-slate-500 font-medium">Unerlässlich für die Rechtswirksamkeit</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* WENN Node - STATICALLY COLORED AMBER */}
          <div className="p-4.5 rounded-2xl border-2 border-amber-400 bg-amber-50/90 shadow-sm text-left">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black uppercase text-amber-950 bg-amber-200/90 px-2.5 py-0.5 rounded-lg border border-amber-300">
                1. WENN (Glied)
              </span>
              <span className="text-2xs text-amber-900 font-bold">Behandlungszustand</span>
            </div>
            <p className="text-xs font-extrabold text-amber-950 mb-1">
              Bezug auf ein konkretes Krankheitsbild
            </p>
            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              Muss medizinisch klar abgrenzbar sein (z. B. unheilbare terminale Erkrankung, irreversibles Koma, schwerste Hirnschädigung).
            </p>
          </div>

          {/* DANN Node - STATICALLY COLORED EMERALD */}
          <div className="p-4.5 rounded-2xl border-2 border-emerald-400 bg-emerald-50/90 shadow-sm text-left">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black uppercase text-emerald-950 bg-emerald-200/90 px-2.5 py-0.5 rounded-lg border border-emerald-300">
                2. DANN (Glied)
              </span>
              <span className="text-2xs text-emerald-900 font-bold">Rechtsfolge / Maßnahme</span>
            </div>
            <p className="text-xs font-extrabold text-emerald-950 mb-1">
              Konkrete Anweisung zu Eingriffen
            </p>
            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              Im Voraus erklärte (Nicht-)Einwilligung zu Heileingriffen (künstliche Beatmung, PEG/Sondenernährung, Dialyse, Reanimation).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
