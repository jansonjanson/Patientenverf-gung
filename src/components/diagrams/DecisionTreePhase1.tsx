import React, { useState } from 'react';
import { GitBranch, Shield, UserCheck, HeartHandshake, FileCheck, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

interface NodeDetail {
  id: string;
  title: string;
  badge: string;
  sub: string;
  legalBasis: string;
  bindingPower: string;
  coreRule: string;
  color: string;
  icon: React.ReactNode;
}

export const DecisionTreePhase1: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string>('pv');

  const nodes: Record<string, NodeDetail> = {
    pv: {
      id: 'pv',
      title: 'Patientenverfügung',
      badge: 'Unmittelbare Bindung',
      sub: 'Medizinische Willenserklärung im Voraus',
      legalBasis: '§ 1827 BGB (ehem. § 1901a BGB) • BGH-Rechtsprechung',
      bindingPower: '⚡ Wirkt aus sich heraus: Sobald bekannt, sofort ohne Nachfragen zu achten!',
      coreRule: 'Schriftliche Verfügung einer volljährigen, einwilligungsfähigen Person für den Fall späterer Entscheidungsunfähigkeit. Richtet sich direkt an Ärzt:innen und Pflegende. Kein Gericht und kein Vertreter dazwischengeschaltet!',
      color: 'border-blue-500 bg-blue-50/50 text-blue-900',
      icon: <FileCheck className="w-5 h-5 text-blue-600" />,
    },
    vv: {
      id: 'vv',
      title: 'Vorsorgevollmacht',
      badge: 'Vertreter im Willen',
      sub: 'Rechtsgeschäftliche Vertretungsmacht',
      legalBasis: '§ 164 ff. BGB • Vorrang vor Betreuung gem. § 1896 Abs. 2 Satz 2 BGB',
      bindingPower: 'Bevollmächtigte Person entscheidet unmittelbar AN STELLE des Vollmachtgebers.',
      coreRule: 'Bevollmächtigt eine Vertrauensperson für Notsituationen zur Erledigung aller oder definierter Aufgabenkreise. Eine gerichtliche Betreuung ist unzulässig, soweit Angelegenheiten ebenso gut durch Bevollmächtigte besorgt werden können.',
      color: 'border-indigo-500 bg-indigo-50/50 text-indigo-900',
      icon: <UserCheck className="w-5 h-5 text-indigo-600" />,
    },
    bv: {
      id: 'bv',
      title: 'Betreuungsverfügung',
      badge: 'Gerichtliche Kontrolle',
      sub: 'Wunsch an das Betreuungsgericht',
      legalBasis: '§ 1896 ff. BGB',
      bindingPower: 'Kein unmittelbares Vertretungsrecht! Vertretung erst NACH gerichtlicher Anordnung.',
      coreRule: 'Benennt eine Person, die das Gericht im Ernstfall als Betreuer bestellen soll. Wichtig: Rechte des Betroffenen bleiben ungeschmälert, Geschäfts- und Einsichtsfähigkeit bleiben bestehen! Nur begrenzter Aufgabenkreis.',
      color: 'border-amber-500 bg-amber-50/50 text-amber-900',
      icon: <Shield className="w-5 h-5 text-amber-600" />,
    },
    ehe: {
      id: 'ehe',
      title: 'Ehegattennotvertretung',
      badge: 'Gesetzlich seit 01.01.2023',
      sub: 'Subsidäres Notvertretungsrecht',
      legalBasis: '§ 1358 BGB (eingeführt durch Betreuungsrechtsreform)',
      bindingPower: 'Maximal 6 Monate befristet • Nur Gesundheitssorge',
      coreRule: 'Greift kraft Gesetzes bei akuter Bewusstlosigkeit/Krankheit. Hebt ärztliche Schweigepflicht gegenüber Partner auf. Greift NICHT bei Getrenntleben, bekanntem Widerspruch oder vorrangiger Vorsorgevollmacht!',
      color: 'border-emerald-500 bg-emerald-50/50 text-emerald-900',
      icon: <HeartHandshake className="w-5 h-5 text-emerald-600" />,
    },
  };

  const selected = nodes[activeNode];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
            <GitBranch className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Didaktisches Schaubild: Wer darf am Krankenbett entscheiden?
            </h4>
            <p className="text-xs text-slate-500">
              Interaktive Entscheidungsmatrix & Abgrenzung nach Großkopf & Klein (2019a, 2019b)
            </p>
          </div>
        </div>
        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full self-start sm:self-auto">
          Klicken Sie auf ein Instrument zur Detailprüfung
        </span>
      </div>

      {/* Interactive Flowchart SVG + Nodes */}
      <div className="relative mb-6 overflow-x-auto">
        <div className="min-w-[680px]">
          {/* Top Question Banner */}
          <div className="bg-slate-900 text-white text-center py-2.5 px-4 rounded-xl text-xs md:text-sm font-semibold mb-4 shadow-sm flex items-center justify-center gap-2">
            <span>Akute Entscheidungsunfähigkeit durch Unfall oder Erkrankung</span>
            <ChevronRight className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300">Welches Rechtsinstrument entfaltet welche Wirkung?</span>
          </div>

          {/* SVG Connection Lines */}
          <svg className="w-full h-12" viewBox="0 0 680 48" fill="none">
            {/* Trunk line from center */}
            <path d="M 340 0 L 340 16" stroke="#94A3B8" strokeWidth="2" strokeDasharray="3 3" />
            {/* Horizontal distributor */}
            <path d="M 85 16 L 595 16" stroke="#94A3B8" strokeWidth="2" />
            {/* 4 drop lines to cards */}
            <path d="M 85 16 L 85 48" stroke={activeNode === 'pv' ? '#2563EB' : '#CBD5E1'} strokeWidth={activeNode === 'pv' ? '3' : '2'} />
            <path d="M 255 16 L 255 48" stroke={activeNode === 'vv' ? '#4F46E5' : '#CBD5E1'} strokeWidth={activeNode === 'vv' ? '3' : '2'} />
            <path d="M 425 16 L 425 48" stroke={activeNode === 'ehe' ? '#16A34A' : '#CBD5E1'} strokeWidth={activeNode === 'ehe' ? '3' : '2'} />
            <path d="M 595 16 L 595 48" stroke={activeNode === 'bv' ? '#D97706' : '#CBD5E1'} strokeWidth={activeNode === 'bv' ? '3' : '2'} />
          </svg>

          {/* 4 Clickable Instrument Cards */}
          <div className="grid grid-cols-4 gap-3">
            {/* Column 1: PV */}
            <button
              type="button"
              onClick={() => setActiveNode('pv')}
              className={`text-left p-3.5 rounded-xl border-2 transition-all relative ${
                activeNode === 'pv'
                  ? 'border-blue-600 bg-blue-50 shadow-md ring-2 ring-blue-200'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <FileCheck className={`w-4 h-4 ${activeNode === 'pv' ? 'text-blue-600' : 'text-slate-400'}`} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-1.5 py-0.5 rounded">
                  Prio 1
                </span>
              </div>
              <p className="text-xs font-bold text-slate-900 leading-tight">Patientenverfügung</p>
              <p className="text-[11px] text-slate-500 mt-1">Bindung aus sich heraus</p>
            </button>

            {/* Column 2: VV */}
            <button
              type="button"
              onClick={() => setActiveNode('vv')}
              className={`text-left p-3.5 rounded-xl border-2 transition-all relative ${
                activeNode === 'vv'
                  ? 'border-indigo-600 bg-indigo-50 shadow-md ring-2 ring-indigo-200'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <UserCheck className={`w-4 h-4 ${activeNode === 'vv' ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/70 px-1.5 py-0.5 rounded">
                  Vertretung
                </span>
              </div>
              <p className="text-xs font-bold text-slate-900 leading-tight">Vorsorgevollmacht</p>
              <p className="text-[11px] text-slate-500 mt-1">Vertreter im Willen</p>
            </button>

            {/* Column 3: Ehe */}
            <button
              type="button"
              onClick={() => setActiveNode('ehe')}
              className={`text-left p-3.5 rounded-xl border-2 transition-all relative ${
                activeNode === 'ehe'
                  ? 'border-emerald-600 bg-emerald-50 shadow-md ring-2 ring-emerald-200'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <HeartHandshake className={`w-4 h-4 ${activeNode === 'ehe' ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                  Max 6 Mon.
                </span>
              </div>
              <p className="text-xs font-bold text-slate-900 leading-tight">Ehegattenvertretung</p>
              <p className="text-[11px] text-slate-500 mt-1">§ 1358 BGB Notrecht</p>
            </button>

            {/* Column 4: BV */}
            <button
              type="button"
              onClick={() => setActiveNode('bv')}
              className={`text-left p-3.5 rounded-xl border-2 transition-all relative ${
                activeNode === 'bv'
                  ? 'border-amber-600 bg-amber-50 shadow-md ring-2 ring-amber-200'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <Shield className={`w-4 h-4 ${activeNode === 'bv' ? 'text-amber-600' : 'text-slate-400'}`} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded">
                  Gerichtlich
                </span>
              </div>
              <p className="text-xs font-bold text-slate-900 leading-tight">Betreuungsverfügung</p>
              <p className="text-[11px] text-slate-500 mt-1">Vorschlag an Gericht</p>
            </button>
          </div>
        </div>
      </div>

      {/* Selected Node Details Card */}
      <div className={`p-4 rounded-xl border transition-all ${selected.color}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-200/60">
          <div className="flex items-center gap-2">
            {selected.icon}
            <div>
              <span className="text-sm font-bold text-slate-900 mr-2">{selected.title}</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 bg-white/80 rounded border border-slate-200 text-slate-700">
                {selected.badge}
              </span>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-600 font-semibold">{selected.legalBasis}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mt-3">
          <div className="bg-white/80 p-3 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Rechtliche Durchsetzungskraft:</span>
            <p className="text-slate-700 leading-relaxed">{selected.bindingPower}</p>
          </div>
          <div className="bg-white/80 p-3 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Entscheidungsregel am Krankenbett:</span>
            <p className="text-slate-700 leading-relaxed">{selected.coreRule}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
