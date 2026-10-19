import React from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, ShieldAlert } from 'lucide-react';
import { LegalChecklistFlowPhase4 } from '../diagrams/LegalChecklistFlowPhase4';

interface Phase4LegalFrameworkProps {
  onNextPhase: () => void;
}

export const Phase4LegalFramework: React.FC<Phase4LegalFrameworkProps> = ({ onNextPhase }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Phase Intro Banner */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
            Doppelstunde 2 • Schritt 4
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            02. Voraussetzungen & 03. Wenn-Dann-Formulierung
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
            Wann ist eine Patientenverfügung für Ärzt:innen und Pflegende rechtlich bindend – und wann scheitert sie in der Praxis an mangelnder Bestimmtheit?
          </p>
        </div>
      </div>

      {/* KAPITEL 02: DIE 6 VORAUSSETZUNGEN EINER BINDENDEN PATIENTENVERFÜGUNG */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Folien-Sicherung • Kapitel 02
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Die 6 Voraussetzungen einer bindenden Patientenverfügung
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Quelle: Großkopf & Klein (2019a, 2019b)
          </span>
        </div>

        {/* Didaktisches Schaubild: Die 6 Voraussetzungen & WENN-DANN-Formel */}
        <LegalChecklistFlowPhase4 />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Voraussetzung 1 */}
          <div className="bg-white border border-slate-200 hover:border-blue-400 rounded-3xl p-6 shadow-xs transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-700 uppercase tracking-wider">
                  Voraussetzung 01
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  Zentral!
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-base">
                Einwilligungsfähigkeit ausreichend
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                Volljährigkeit & Vollbesitz geistiger Kräfte
              </p>
              <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <p>
                  <strong>1. Einsichtsfähig:</strong> Versteht Art, Bedeutung und Konsequenzen der Maßnahme.
                </p>
                <p>
                  <strong>2. Urteilsfähig:</strong> Kann Vor- und Nachteile sowie mögliche Alternativen abwägen.
                </p>
                <p>
                  <strong>3. Freie Willensbildung:</strong> Kann ohne äußeren Druck oder Beeinflussung eine Entscheidung treffen.
                </p>
              </div>
            </div>
          </div>

          {/* Voraussetzung 2 */}
          <div className="bg-white border border-slate-200 hover:border-blue-400 rounded-3xl p-6 shadow-xs transition flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-black text-blue-700 uppercase tracking-wider">
                Voraussetzung 02
              </span>
              <h4 className="font-bold text-slate-900 text-base">
                Schriftlich verfasst & unterschrieben
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Die Verfügung muss in Schriftform verfasst und eigenhändig unterschrieben sein.
              </p>
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Wichtiger Zusatz: Notarielle Beglaubigung nicht notwendig!</span>
              </div>
            </div>
          </div>

          {/* Voraussetzung 3 */}
          <div className="bg-white border border-slate-200 hover:border-blue-400 rounded-3xl p-6 shadow-xs transition flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-black text-blue-700 uppercase tracking-wider">
                Voraussetzung 03
              </span>
              <h4 className="font-bold text-slate-900 text-base">
                Erklärung der (Nicht-)Einwilligung im Voraus
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Verbindliche Willenserklärung (Einwilligung oder Nichteinwilligung) für zukünftige Behandlungssituationen.
              </p>
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-medium text-amber-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Abgrenzung: Keine Behandlungswünsche oder allgemeinen Richtlinien!</span>
              </div>
            </div>
          </div>

          {/* Voraussetzung 4 */}
          <div className="bg-white border border-slate-200 hover:border-blue-400 rounded-3xl p-6 shadow-xs transition flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-black text-blue-700 uppercase tracking-wider">
                Voraussetzung 04
              </span>
              <h4 className="font-bold text-slate-900 text-base">
                Bestimmtheit…
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                …des <strong>Behandlungszustands</strong> und des <strong>Handelns- oder Unterlassensszenarios</strong>.
              </p>
              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-xs font-bold text-blue-800">
                → Siehe Kapitel 03: Die juristische <strong>WENN – DANN – Logik</strong>.
              </div>
            </div>
          </div>

          {/* Voraussetzung 5 */}
          <div className="bg-white border border-slate-200 hover:border-blue-400 rounded-3xl p-6 shadow-xs transition flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-black text-blue-700 uppercase tracking-wider">
                Voraussetzung 05
              </span>
              <h4 className="font-bold text-slate-900 text-base">
                Keine Anzeichen der Willensänderung
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Keine konkreten Anhaltspunkte, dass Entscheidungen sich geändert haben (Widerruf ist jederzeit auch formlos und konkludent möglich).
              </p>
            </div>
          </div>

          {/* Voraussetzung 6 */}
          <div className="bg-white border border-slate-200 hover:border-blue-400 rounded-3xl p-6 shadow-xs transition flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-black text-blue-700 uppercase tracking-wider">
                Voraussetzung 06
              </span>
              <h4 className="font-bold text-slate-900 text-base">
                Keine Sittenwidrigkeit
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Die Anordnungen dürfen nicht gegen das Gesetz verstoßen.
              </p>
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-800 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Verboten: z. B. keine aktiv direkte Sterbehilfe (§ 216 StGB).</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KAPITEL 03: WENN - DANN FORMULIERUNG */}
      <div className="bg-white border-2 border-blue-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Folien-Sicherung • Kapitel 03
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Die juristische Formel: WENN – DANN – Formulierung
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">Großkopf & Klein (2019a, 2019b)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-stretch">
          {/* WENN Card */}
          <div className="md:col-span-5 bg-amber-50/70 rounded-2xl p-6 border border-amber-200 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-xl bg-amber-200 text-amber-900 font-black text-xs uppercase tracking-wider">
                1. WENN (Bestimmtheit des Behandlungszustandes)
              </span>
              <h4 className="text-lg font-bold text-slate-900">
                Bestimmtheit des Behandlungszustandes
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Muss sich auf ein <strong>bestimmtes behandlungsbedürftiges Krankheitsbild</strong> bzw. einen <strong>bestimmten behandlungsbedürftigen Krankheitszustand</strong> beziehen.
              </p>
            </div>
            <div className="pt-3 border-t border-amber-200 text-xs text-amber-900 leading-relaxed">
              <strong>Präzise Beispiele:</strong> „Endstadium einer unheilbaren Erkrankung“, „irreversibles Koma ohne Aussicht auf Besserung“.
            </div>
          </div>

          {/* Arrow */}
          <div className="md:col-span-1 flex items-center justify-center text-3xl font-black text-blue-600 py-2">
            ➔
          </div>

          {/* DANN Card */}
          <div className="md:col-span-5 bg-emerald-50/70 rounded-2xl p-6 border border-emerald-200 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-xl bg-emerald-200 text-emerald-900 font-black text-xs uppercase tracking-wider">
                2. DANN (Bestimmtheit des Handelns- oder Unterlassungsszenarios)
              </span>
              <h4 className="text-lg font-bold text-slate-900">
                Bestimmtheit des Handelns- oder Unterlassens
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Im Voraus erklärte <strong>Einwilligung oder Nichteinwilligung</strong> zu einer Heilbehandlung oder ärztlichem Eingriff hinsichtlich der <strong>zu ergreifenden oder zu unterlassenen pflegerischen und ärztlichen Maßnahmen</strong>.
              </p>
            </div>
            <div className="pt-3 border-t border-emerald-200 text-xs text-emerald-900 leading-relaxed">
              <strong>Präzise Beispiele:</strong> „Ablehnung künstlicher Beatmung, Ernährung (PEG) und Dialyse“, „umfassende palliative Schmerztherapie“.
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-end no-print">
        <button
          onClick={onNextPhase}
          className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm tracking-wide shadow-xs transition transform active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          <span>Weiter zu Schritt 5: Eigen-Check Ihrer Verfügung</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
