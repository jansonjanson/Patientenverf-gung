import React, { useState } from 'react';
import { Route, CheckCircle2, AlertCircle, FileText, Globe, Layers, Sparkles } from 'lucide-react';

export const CreationPathPhase2: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'vz' | 'bmj' | 'esslingen'>('vz');

  const toolDetails = {
    vz: {
      title: 'Verbraucherzentrale Online-Generator',
      badge: 'Interaktiver Frage-Antwort-Dialog',
      description: 'Führt Schritt für Schritt durch standardisierte Fallkonstellationen. Sehr einsteigerfreundlich, generiert sofort fertiges PDF.',
      strength: 'Hohe Nutzerführung, schützt vor formalen Auslassungen.',
      watchout: 'Starre Antwortpfade – persönliche Wertvorstellungen können schwer individuell nuanciert werden.',
    },
    bmj: {
      title: 'Bundesministerium der Justiz (BMJ)',
      badge: 'Textbausteine & Formulierungshilfen',
      description: 'Höchste juristische Präzision direkt aus dem Justizressort. Bietet standardisierte Textblöcke zur individuellen Zusammenstellung.',
      strength: 'Exakte WENN-DANN-Formulierungen, von Gerichten und Standesorganisationen anerkannt.',
      watchout: 'Erfordert mehr juristisches Abstraktionsvermögen und redaktionelle Eigenleistung beim Zusammenfügen.',
    },
    esslingen: {
      title: 'Esslinger Initiative',
      badge: 'Kompakter Formulargenerator',
      description: 'Bewährtes, übersichtliches Formularsystem aus der Palliativ- und Hospizpraxis zur schnellen Orientierung.',
      strength: 'Sehr praxisnah für Pflegeteams und Angehörige strukturiert.',
      watchout: 'Ankreuzoptionen müssen sorgfältig mit handschriftlichen Präzisierungen hinterlegt werden.',
    },
  };

  const selected = toolDetails[activeTool];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700">
            <Route className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Didaktisches Schaubild: 3 Wege zur Erstellung & Reflexionspfad
            </h4>
            <p className="text-xs text-slate-500">
              Vom Anwendungs-Tool über emotionale Stolpersteine zur rechtssicheren Klausel
            </p>
          </div>
        </div>
        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full self-start sm:self-auto">
          3-Stufen-Prozess
        </span>
      </div>

      {/* SVG Pathway Diagram */}
      <div className="relative mb-6 overflow-x-auto">
        <div className="min-w-[640px]">
          {/* Step 1: 3 Tool Choices */}
          <div className="grid grid-cols-3 gap-3 mb-2">
            <button
              type="button"
              onClick={() => setActiveTool('vz')}
              className={`p-3 rounded-xl border-2 text-left transition-all ${
                activeTool === 'vz'
                  ? 'border-indigo-600 bg-indigo-50 shadow ring-2 ring-indigo-200'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Globe className={`w-4 h-4 ${activeTool === 'vz' ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span className="text-[10px] font-bold uppercase text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded">
                  Dialog-Tool
                </span>
              </div>
              <p className="text-xs font-bold text-slate-900">Verbraucherzentrale</p>
              <p className="text-[11px] text-slate-500">Online-Generator</p>
            </button>

            <button
              type="button"
              onClick={() => setActiveTool('bmj')}
              className={`p-3 rounded-xl border-2 text-left transition-all ${
                activeTool === 'bmj'
                  ? 'border-indigo-600 bg-indigo-50 shadow ring-2 ring-indigo-200'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <FileText className={`w-4 h-4 ${activeTool === 'bmj' ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span className="text-[10px] font-bold uppercase text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded">
                  Justiz-Standard
                </span>
              </div>
              <p className="text-xs font-bold text-slate-900">BMJ Bausteine</p>
              <p className="text-[11px] text-slate-500">Präzise Textmodule</p>
            </button>

            <button
              type="button"
              onClick={() => setActiveTool('esslingen')}
              className={`p-3 rounded-xl border-2 text-left transition-all ${
                activeTool === 'esslingen'
                  ? 'border-indigo-600 bg-indigo-50 shadow ring-2 ring-indigo-200'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Layers className={`w-4 h-4 ${activeTool === 'esslingen' ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span className="text-[10px] font-bold uppercase text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded">
                  Praxis-Bogen
                </span>
              </div>
              <p className="text-xs font-bold text-slate-900">Esslinger Initiative</p>
              <p className="text-[11px] text-slate-500">Kompaktes Formular</p>
            </button>
          </div>

          {/* SVG Connector Flow */}
          <svg className="w-full h-8" viewBox="0 0 640 32" fill="none">
            <path d="M 106 0 L 106 14 Q 106 20 120 20 L 300 20" stroke="#CBD5E1" strokeWidth="2" />
            <path d="M 320 0 L 320 20" stroke="#CBD5E1" strokeWidth="2" />
            <path d="M 533 0 L 533 14 Q 533 20 520 20 L 340 20" stroke="#CBD5E1" strokeWidth="2" />
            <path d="M 320 20 L 320 32" stroke="#6366F1" strokeWidth="2.5" markerEnd="url(#arrow)" />
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366F1" />
              </marker>
            </defs>
          </svg>

          {/* Stage 2 & 3 Process Nodes */}
          <div className="grid grid-cols-2 gap-3 mt-1">
            <div className="bg-amber-50/80 border border-amber-200 p-3 rounded-xl flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                2
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Reflexions-Schleife (Stolperstein)</p>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  An welcher Stelle entsteht Zögern? (Ethisch, familiär, medizinisch)
                </p>
              </div>
            </div>

            <div className="bg-blue-50/80 border border-blue-200 p-3 rounded-xl flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                3
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Klausel-Extraktion für Stresstest</p>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  1–2 eigene Sätze notieren → Werden automatisch in Phase 5 geprüft
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Tool Details Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
          <span className="font-bold text-slate-900">{selected.title}</span>
          <span className="text-[11px] font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
            {selected.badge}
          </span>
        </div>
        <p className="text-slate-700 mb-3">{selected.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex items-start gap-1.5 text-emerald-800 bg-emerald-50/60 p-2 rounded border border-emerald-100">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Stärke:</strong> {selected.strength}</span>
          </div>
          <div className="flex items-start gap-1.5 text-amber-800 bg-amber-50/60 p-2 rounded border border-amber-100">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <span><strong>Achtung:</strong> {selected.watchout}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
