'use client';

import React, { useState } from 'react';
import { Language, Medicine } from '@/types';
import { TRANSLATIONS } from '@/lib/translations';
import { Pill, Clock, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MedicineCardProps {
  medicine: Medicine;
  language: Language;
  onTakeConfirmed?: () => void;
}

export const MedicineCard: React.FC<MedicineCardProps> = ({
  medicine,
  language,
  onTakeConfirmed,
}) => {
  const t = TRANSLATIONS[language];
  const [taken, setTaken] = useState(false);

  const getLocalizedName = () => {
    if (language === 'te') return medicine.nameTelugu || medicine.name;
    if (language === 'hi') return medicine.nameHindi || medicine.name;
    return medicine.name;
  };

  const getLocalizedInstruction = () => {
    if (language === 'te') return medicine.instructionTelugu || medicine.instruction;
    if (language === 'hi') return medicine.instructionHindi || medicine.instruction;
    return medicine.instruction;
  };

  const handleMarkTaken = () => {
    setTaken(true);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {
      // ignore
    }
    onTakeConfirmed?.();
  };

  return (
    <div className="w-full max-w-sm mx-auto px-4 my-2">
      <div className="liquid-glass-card rounded-2xl p-4 border border-white/20 shadow-liquid relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Card Header: Next Medicine Badge & Time */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-semibold">
            <Pill className="w-3.5 h-3.5" />
            <span>{t.nextMedicine}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300 text-sm font-bold bg-white/5 px-2.5 py-0.5 rounded-lg border border-white/10">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>{medicine.time}</span>
          </div>
        </div>

        {/* Medicine Name and Dosage */}
        <div className="mt-1">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {getLocalizedName()}
          </h2>
          <p className="text-sm font-medium text-slate-300 mt-0.5">
            {medicine.dosage} • {medicine.frequency}
          </p>
        </div>

        {/* Instructions */}
        <p className="text-sm sm:text-base text-slate-200 mt-2 bg-white/5 p-2.5 rounded-xl border border-white/10 leading-snug">
          {getLocalizedInstruction()}
        </p>

        {/* Taken Action Button */}
        <div className="mt-3">
          {taken ? (
            <div className="w-full py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold text-sm flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Taken for today (ఈరోజు తీసుకున్నారు)</span>
            </div>
          ) : (
            <button
              onClick={handleMarkTaken}
              className="w-full py-2.5 rounded-xl liquid-glass text-white hover:bg-white/15 border border-white/25 font-semibold text-sm flex items-center justify-center gap-2 transition-all tactile-button"
            >
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              <span>Mark as Taken (తీసుకున్నాను)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
