import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, ArrowRight, BookOpen, Scale, Sparkles } from 'lucide-react';

export const LegalChecklistFlowPhase4: React.FC = () => {
  const [activeReq, setActiveReq] = useState<number>(1);
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
        'Widerruf bedarf keiner Schriftform; geäußerte Abwehr am Krankenbett hat immer Vorrang.',
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

  const current = requirements.find((r) => r.num === activeReq) || requirements[0];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Didaktisches Schaubild: Die 6 Voraussetzungen nach Großkopf & Klein
            </h4>
            <p className="text-xs text-slate-500">
              Juristisches Prüfschema für die Bindungswirkung am Krankenbett (2019a, 2019b)
            </p>
          </div>
        </div>
        <span className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full self-start sm:self-auto">
          Interaktives Prüfschema
        </span>
      </div>

      {/* 6 Step Sequence Flow */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-4">
        {requirements.map((r) => {
          const isActive = activeReq === r.num;
          return (
            <button
              key={r.num}
              type="button"
              onClick={() => setActiveReq(r.num)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                isActive
                  ? 'border-blue-600 bg-blue-50 shadow ring-2 ring-blue-200'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {r.num}
                </span>
                {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
              </div>
              <p className="text-[11px] font-bold text-slate-900 line-clamp-1">{r.title}</p>
            </button>
          );
        })}
      </div>

      {/* Requirement Details Box */}
      <div className="bg-blue-50/40 border border-blue-200 rounded-xl p-4 text-xs mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 mb-2 border-b border-blue-200/80">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              {current.num}
            </span>
            <span className="font-bold text-slate-900 text-sm">{current.title}</span>
          </div>
          <span className="text-slate-500 font-medium">{current.sub}</span>
        </div>
        <p className="text-slate-700 mb-2 leading-relaxed">{current.details}</p>
        <ul className="space-y-1.5 mb-3">
          {current.bulletPoints.map((bp, i) => (
            <li key={i} className="flex items-start gap-2 text-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
              <span>{bp}</span>
            </li>
          ))}
        </ul>
        <div className="bg-white/90 p-2.5 rounded-lg border border-blue-200 text-slate-700 font-medium">
          ⚖️ {current.legalNote}
        </div>
      </div>

      {/* WENN-DANN Formula Interactive Box */}
      <div className="border border-slate-200 bg-slate-50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Kapitel 03: Die juristische WENN-DANN-Formel
            </h5>
          </div>
          <span className="text-[11px] text-slate-500">Klicken Sie zum Vertiefen</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* WENN Node */}
          <button
            type="button"
            onClick={() => setActiveFormulaPart('wenn')}
            className={`p-3 rounded-xl border-2 text-left transition-all ${
              activeFormulaPart === 'wenn'
                ? 'border-indigo-600 bg-white shadow ring-2 ring-indigo-200'
                : 'border-slate-200 bg-white/70 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                WENN (Krankheitszustand)
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Bestimmtheitsgebot</span>
            </div>
            <p className="text-xs font-bold text-slate-900 mb-1">
              Bezug auf ein konkretes, behandlungsbedürftiges Krankheitsbild
            </p>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Muss medizinisch klar abgrenzbar sein (z. B. unheilbare terminale Erkrankung, irreversibles Koma, schwerste Hirnschädigung).
            </p>
          </button>

          {/* DANN Node */}
          <button
            type="button"
            onClick={() => setActiveFormulaPart('dann')}
            className={`p-3 rounded-xl border-2 text-left transition-all ${
              activeFormulaPart === 'dann'
                ? 'border-emerald-600 bg-white shadow ring-2 ring-emerald-200'
                : 'border-slate-200 bg-white/70 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                DANN (Handlungs-Szenario)
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Einwilligung / Verzicht</span>
            </div>
            <p className="text-xs font-bold text-slate-900 mb-1">
              Konkrete Anweisung zu pflegerischen & ärztlichen Maßnahmen
            </p>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Im Voraus erklärte (Nicht-)Einwilligung zu Heileingriffen (künstliche Beatmung, PEG/Sondenernährung, Dialyse, Reanimation).
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
