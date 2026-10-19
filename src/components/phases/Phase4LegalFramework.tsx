import React from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, FileCheck, ShieldAlert, Cpu } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface Phase4LegalFrameworkProps {
  onNextPhase: () => void;
}

export const Phase4LegalFramework: React.FC<Phase4LegalFrameworkProps> = ({ onNextPhase }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Phase Intro Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
            Doppelstunde 2 • Schritt 4 (Rechtlicher Fach-Input & Präzisierung)
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            02. Voraussetzungen & 03. Wenn-Dann-Formulierung
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            Wann ist eine Patientenverfügung für Ärzt:innen und Pflegende rechtlich bindend – und wann scheitert sie in der Praxis an mangelnder Bestimmtheit?
          </p>
        </div>
      </div>

      {/* KAPITEL 02: DIE 6 VORAUSSETZUNGEN EINER BINDENDEN PATIENTENVERFÜGUNG */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Folien-Sicherung • Kapitel 02
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Die 6 Voraussetzungen einer bindenden Patientenverfügung
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Quelle: Großkopf & Klein (2019a, 2019b)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Voraussetzung 1 */}
          <div className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-3xl p-6 shadow-xl transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-400 uppercase tracking-wider">
                  Voraussetzung 01
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Zentral!
                </span>
              </div>
              <h4 className="font-bold text-white text-base">
                Einwilligungsfähigkeit ausreichend
              </h4>
              <p className="text-xs text-slate-400 font-medium">
                Volljährigkeit & Vollbesitz geistiger Kräfte
              </p>
              <div className="space-y-2 text-xs text-slate-300 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <p>
                  <strong>1. Einsichtsfähig:</strong> Art, Bedeutung und Konsequenzen der Maßnahme verstehen.
                </p>
                <p>
                  <strong>2. Urteilsfähig:</strong> Vor- und Nachteile sowie Alternativen abwägen.
                </p>
                <p>
                  <strong>3. Freie Willensbildung:</strong> Ohne äußeren Druck entscheiden können.
                </p>
              </div>
            </div>
          </div>

          {/* Voraussetzung 2 */}
          <div className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-3xl p-6 shadow-xl transition flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-black text-blue-400 uppercase tracking-wider">
                Voraussetzung 02
              </span>
              <h4 className="font-bold text-white text-base">
                Schriftlich verfasst & eigenhändig unterschrieben
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Die Verfügung muss in Schriftform (§ 126 BGB) vorliegen und vom Verfasser eigenhändig unterschrieben sein.
              </p>
              <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs font-bold text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Wichtig: Eine notarielle Beglaubigung ist <u>nicht</u> erforderlich!</span>
              </div>
            </div>
          </div>

          {/* Voraussetzung 3 */}
          <div className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-3xl p-6 shadow-xl transition flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-black text-blue-400 uppercase tracking-wider">
                Voraussetzung 03
              </span>
              <h4 className="font-bold text-white text-base">
                Erklärung der (Nicht-)Einwilligung im Voraus
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Es muss sich um eine verbindliche Entscheidung (Einwilligung oder Ablehnung) für künftige Behandlungen handeln.
              </p>
              <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-xs font-medium text-amber-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Abgrenzung: Keine unverbindlichen Behandlungswünsche!</span>
              </div>
            </div>
          </div>

          {/* Voraussetzung 4 */}
          <div className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-3xl p-6 shadow-xl transition flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-black text-blue-400 uppercase tracking-wider">
                Voraussetzung 04
              </span>
              <h4 className="font-bold text-white text-base">
                Bestimmtheit…
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                …des <strong>Behandlungszustands</strong> und des <strong>Handelns- oder Unterlassensszenarios</strong>.
              </p>
              <div className="p-3 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-xs font-bold text-blue-300">
                → Die juristische <strong>WENN – DANN – Logik</strong> (unten).
              </div>
            </div>
          </div>

          {/* Voraussetzung 5 */}
          <div className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-3xl p-6 shadow-xl transition flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-black text-blue-400 uppercase tracking-wider">
                Voraussetzung 05
              </span>
              <h4 className="font-bold text-white text-base">
                Keine Anzeichen der Willensänderung
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Es dürfen keine konkreten Anhaltspunkte vorliegen, dass der Patient die Entscheidung geändert hat (Widerruf ist jederzeit formlos und auch konkludent möglich).
              </p>
            </div>
          </div>

          {/* Voraussetzung 6 */}
          <div className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-3xl p-6 shadow-xl transition flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-black text-blue-400 uppercase tracking-wider">
                Voraussetzung 06
              </span>
              <h4 className="font-bold text-white text-base">
                Keine Sittenwidrigkeit
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Die Verfügung darf nicht gegen gesetzliche Verbote verstoßen.
              </p>
              <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-xs font-bold text-rose-300 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Verboten: z. B. aktive direkte Sterbehilfe (§ 216 StGB).</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KAPITEL 03: WENN - DANN FORMULIERUNG */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950/60 to-slate-900 border-2 border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Folien-Sicherung • Kapitel 03
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              Die juristische Formel: WENN – DANN – Formulierung
            </h3>
          </div>
          <span className="text-xs text-slate-400">Großkopf & Klein (2019a, 2019b)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-stretch">
          {/* WENN Card */}
          <div className="md:col-span-5 bg-slate-950/80 rounded-2xl p-6 border border-amber-500/30 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow">
                1. WENN (Situation / Zustand)
              </span>
              <h4 className="text-lg font-bold text-white">
                Bestimmtheit des Behandlungszustandes
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Die Patientenverfügung muss sich auf ein <strong>bestimmtes behandlungsbedürftiges Krankheitsbild</strong> bzw. auf einen <strong>bestimmten Krankheitszustand</strong> beziehen.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 text-xs text-amber-300 leading-relaxed">
              <strong>Präzise Beispiele:</strong> „Endstadium einer unheilbaren Erkrankung“, „irreversibles Koma ohne Aussicht auf Besserung“.
            </div>
          </div>

          {/* Arrow */}
          <div className="md:col-span-1 flex items-center justify-center text-3xl font-black text-amber-400 py-2">
            ➔
          </div>

          {/* DANN Card */}
          <div className="md:col-span-5 bg-slate-950/80 rounded-2xl p-6 border border-emerald-500/30 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-xl bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow">
                2. DANN (Maßnahme / Folge)
              </span>
              <h4 className="text-lg font-bold text-white">
                Bestimmtheit des Handelns- oder Unterlassens
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Es muss eine im Voraus erklärte <strong>Einwilligung oder Ablehnung</strong> konkreter medizinischer Eingriffe vorliegen – bezogen auf die <strong>zu ergreifenden oder zu unterlassenen Maßnahmen</strong>.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 text-xs text-emerald-300 leading-relaxed">
              <strong>Präzise Beispiele:</strong> „Ablehnung künstlicher Beatmung, Ernährung (PEG) und Dialyse“, „umfassende palliative Schmerztherapie“.
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-end no-print">
        <button
          onClick={() => {
            sounds.playClick();
            onNextPhase();
          }}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-blue-900/40 transition transform active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          <span>Weiter zu Schritt 5: Eigen-Check Ihrer Verfügung</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
