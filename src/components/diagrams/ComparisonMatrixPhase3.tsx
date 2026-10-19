import React, { useState } from 'react';
import { Columns, CheckCircle2, Split, AlertTriangle, HelpCircle, Users } from 'lucide-react';

export const ComparisonMatrixPhase3: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'q1' | 'q2' | 'q3' | 'q4'>('q1');

  const dimensions = {
    q1: {
      id: 'q1',
      title: '1. Gemeinsamkeiten & Überschneidungen',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
      color: 'border-emerald-500 bg-emerald-50/50',
      tag: 'Kernstandard',
      content: 'Alle 3 Hilfsmittel decken existenzielle Notlagen ab (irreversibler Hirnschaden, unmittelbarer Sterbeprozess, künstliche Beatmung/PEG). Sie orientieren sich an der geltenden Rechtsprechung zur Schriftform und fordern eigenhändige Unterschrift.',
      tandemTip: 'Diskutieren Sie zu zweit: Formulieren alle Tools den Passus zum Abbruch lebenserhaltender Maßnahmen ähnlich eindeutig?',
    },
    q2: {
      id: 'q2',
      title: '2. Unterschiede & Benutzerführung',
      icon: <Split className="w-4 h-4 text-blue-600" />,
      color: 'border-blue-500 bg-blue-50/50',
      tag: 'Methodik',
      content: 'Große Diskrepanz in der Didaktik: Der VZ-Generator leitet per Entscheidungsbaum durch Ja/Nein-Kaskaden; die BMJ-Broschüre verlangt selbständiges Zusammenstellen von Klauseln; die Esslinger Initiative arbeitet mit tabellarischen Optionen.',
      tandemTip: 'Welches Instrument hat Ihnen persönlich die meiste Orientierungssicherheit gegeben – und welches wirkte bevormundend?',
    },
    q3: {
      id: 'q3',
      title: '3. Fehlendes & Ergänzungsbedarf',
      icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
      color: 'border-amber-500 bg-amber-50/50',
      tag: 'Grauzonen',
      content: 'Häufig ausgeklammert: Spezifische Demenz-Stadien, Notfallseelsorge/spirituelle Begleitung, genaue Vorgaben zur Schmerztherapie vs. Bewusstseinseintrübung (Palliative Sedierung), Organspende-Kollisionen.',
      tandemTip: 'Prüfen Sie: Was passiert, wenn eine Person zwar an Demenz leidet, aber sichtlich Freude am Spaziergang im Heim hat?',
    },
    q4: {
      id: 'q4',
      title: '4. Praxistauglichkeit für Pflegende',
      icon: <HelpCircle className="w-4 h-4 text-indigo-600" />,
      color: 'border-indigo-500 bg-indigo-50/50',
      tag: 'Akutsituation & Praxis-Realität',
      content: 'Ist der Wille im akuten Notfall in wenigen Sekunden für Notarzt und Pflegefachkraft sofort zweifelsfrei erfassbar? Mehrseitige Textwüsten ohne Deckblatt oder Kernverfügung verzögern akute Notfallentscheidungen erheblich.',
      tandemTip: 'Würden Sie als Schichtleitung auf Basis des generierten Papiers sofort eine Reanimation abbrechen können?',
    },
  };

  const selected = dimensions[activeTab];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
            <Columns className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Didaktisches Schaubild: 4-Dimensionen-Vergleichsmatrix (Tandem)
            </h4>
            <p className="text-xs text-slate-500">
              Strukturierter Kriterienvergleich nach den Unterrichtsfolien von J. Rosenow
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full self-start sm:self-auto">
          <Users className="w-3.5 h-3.5 text-slate-500" />
          <span>Tandem-Arbeit</span>
        </div>
      </div>

      {/* 4 Interactive Dimension Pills / Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        {(Object.keys(dimensions) as Array<keyof typeof dimensions>).map((key) => {
          const item = dimensions[key];
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isActive
                  ? 'border-emerald-600 bg-emerald-50/80 shadow ring-2 ring-emerald-200'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                {item.icon}
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                  {item.tag}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-900 truncate">{item.title}</p>
            </button>
          );
        })}
      </div>

      {/* Selected Dimension Detail Card */}
      <div className={`p-4 rounded-xl border transition-all ${selected.color}`}>
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-200/80">
          {selected.icon}
          <h5 className="text-sm font-bold text-slate-900">{selected.title}</h5>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed mb-3">{selected.content}</p>
        <div className="bg-white/90 p-3 rounded-lg border border-slate-200 text-xs">
          <span className="font-bold text-slate-900 block mb-1">💡 Impuls für Ihr Tandem-Gespräch:</span>
          <p className="text-slate-600 italic">{selected.tandemTip}</p>
        </div>
      </div>
    </div>
  );
};
