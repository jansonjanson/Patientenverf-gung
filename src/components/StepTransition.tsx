import React from 'react';
import { ArrowDown, CheckCircle2 } from 'lucide-react';

interface StepTransitionProps {
  stepNumber?: string | number;
  title: string;
  hint?: string;
  variant?: 'blue' | 'emerald' | 'amber' | 'indigo' | 'teal' | 'purple';
}

const COLOR_MAP = {
  blue: {
    line: 'from-blue-200 via-blue-400 to-blue-200',
    badge: 'bg-blue-50/95 border-blue-200 text-blue-900 shadow-blue-100/50',
    iconBg: 'bg-blue-600 text-white',
    pill: 'bg-blue-600 text-white',
  },
  emerald: {
    line: 'from-emerald-200 via-emerald-400 to-emerald-200',
    badge: 'bg-emerald-50/95 border-emerald-200 text-emerald-900 shadow-emerald-100/50',
    iconBg: 'bg-emerald-600 text-white',
    pill: 'bg-emerald-600 text-white',
  },
  amber: {
    line: 'from-amber-200 via-amber-400 to-amber-200',
    badge: 'bg-amber-50/95 border-amber-200 text-amber-900 shadow-amber-100/50',
    iconBg: 'bg-amber-600 text-white',
    pill: 'bg-amber-600 text-white',
  },
  indigo: {
    line: 'from-indigo-200 via-indigo-400 to-indigo-200',
    badge: 'bg-indigo-50/95 border-indigo-200 text-indigo-900 shadow-indigo-100/50',
    iconBg: 'bg-indigo-600 text-white',
    pill: 'bg-indigo-600 text-white',
  },
  teal: {
    line: 'from-teal-200 via-teal-400 to-teal-200',
    badge: 'bg-teal-50/95 border-teal-200 text-teal-900 shadow-teal-100/50',
    iconBg: 'bg-teal-600 text-white',
    pill: 'bg-teal-600 text-white',
  },
  purple: {
    line: 'from-purple-200 via-purple-400 to-purple-200',
    badge: 'bg-purple-50/95 border-purple-200 text-purple-900 shadow-purple-100/50',
    iconBg: 'bg-purple-600 text-white',
    pill: 'bg-purple-600 text-white',
  },
};

export const StepTransition: React.FC<StepTransitionProps> = ({
  stepNumber,
  title,
  hint,
  variant = 'blue',
}) => {
  const styles = COLOR_MAP[variant] || COLOR_MAP.blue;

  return (
    <div className="relative py-4 flex flex-col items-center justify-center select-none" aria-label={`Nächster Schritt: ${title}`}>
      {/* Top vertical connecting line */}
      <div className={`w-0.5 h-6 bg-gradient-to-b ${styles.line}`} />

      {/* Pill badge with arrow and text */}
      <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border shadow-sm backdrop-blur-xs transition-all hover:scale-102 ${styles.badge}`}>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 shadow-2xs ${styles.iconBg}`}>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm">
          <span className="font-extrabold tracking-wide uppercase text-2xs opacity-80">
            Nächster Schritt {stepNumber ? `• ${stepNumber}` : ''}:
          </span>
          <span className="font-bold text-slate-900">{title}</span>
          {hint && (
            <span className="text-2xs text-slate-500 font-medium hidden md:inline ml-1">
              ({hint})
            </span>
          )}
        </div>
      </div>

      {/* Bottom vertical connecting line */}
      <div className={`w-0.5 h-6 bg-gradient-to-b ${styles.line}`} />
    </div>
  );
};
