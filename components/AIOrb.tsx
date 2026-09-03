'use client';

import React from 'react';
import { AssistantState, Language } from '@/types';
import { TRANSLATIONS } from '@/lib/translations';

interface AIOrbProps {
  state: AssistantState;
  language: Language;
  onOrbClick?: () => void;
  isUrgent?: boolean;
}

export const AIOrb: React.FC<AIOrbProps> = ({
  state,
  language,
  onOrbClick,
  isUrgent = false,
}) => {
  const t = TRANSLATIONS[language];

  // Map state to human-readable label
  const getStatusLabel = () => {
    if (isUrgent) return t.urgentAlert;
    switch (state) {
      case 'activating':
      case 'listening':
      case 'transcribing':
        return t.listening;
      case 'thinking':
        return t.thinking;
      case 'speaking':
      case 'responding':
        return t.speaking;
      case 'error':
        return 'Connection Unavailable';
      default:
        return t.ready;
    }
  };

  // Select Orb style variant
  const getOrbAnimationClass = () => {
    if (isUrgent) return 'orb-urgent-anim';
    switch (state) {
      case 'listening':
      case 'transcribing':
        return 'orb-listening-anim';
      case 'thinking':
        return 'orb-thinking-anim';
      case 'speaking':
      case 'responding':
        return 'orb-speaking-anim';
      default:
        return 'orb-idle-anim';
    }
  };

  const getGradientTheme = () => {
    if (isUrgent) {
      return 'from-rose-500 via-amber-500 to-red-600 shadow-orb-urgent';
    }
    switch (state) {
      case 'listening':
      case 'transcribing':
        return 'from-indigo-500 via-purple-500 to-sky-400 shadow-orb-listening';
      case 'thinking':
        return 'from-pink-500 via-purple-600 to-indigo-400 shadow-orb-thinking';
      case 'speaking':
      case 'responding':
        return 'from-emerald-400 via-teal-500 to-sky-400 shadow-orb-speaking';
      default:
        return 'from-sky-400 via-cyan-500 to-indigo-500 shadow-orb-idle';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-3 select-none">
      {/* Outer Glow & Liquid Glass Sphere */}
      <div
        onClick={onOrbClick}
        role="button"
        tabIndex={0}
        aria-label={`AI Assistant state: ${getStatusLabel()}`}
        className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center cursor-pointer group focus:outline-none"
      >
        {/* Soft Background Liquid Diffusion */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-tr ${getGradientTheme()} opacity-40 blur-3xl transition-all duration-700 pointer-events-none`}
        />

        {/* Outer Glass Ring with Specular Edge */}
        <div
          className={`relative w-40 h-40 sm:w-44 sm:h-44 rounded-full p-[3px] bg-gradient-to-b from-white/40 via-white/10 to-white/5 backdrop-blur-2xl shadow-liquid-lg ${getOrbAnimationClass()} transition-all duration-500`}
        >
          {/* Inner Liquid Glass Core */}
          <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-950/90 flex items-center justify-center overflow-hidden border border-white/20 relative">
            {/* Top Gloss Reflection */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-20 bg-gradient-to-b from-white/30 to-transparent rounded-full blur-sm pointer-events-none" />

            {/* Dynamic Chromatic Fluid Center */}
            <div
              className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr ${getGradientTheme()} opacity-85 blur-md transform transition-all duration-700`}
            />

            {/* Acoustic Waveform Overlay when Speaking or Listening */}
            {(state === 'listening' || state === 'speaking') && (
              <div className="absolute inset-0 flex items-center justify-center gap-1.5 z-10">
                <span className="w-1.5 h-6 bg-white/90 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-11 bg-white/95 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-14 bg-white rounded-full animate-bounce [animation-delay:300ms]" />
                <span className="w-1.5 h-10 bg-white/95 rounded-full animate-bounce [animation-delay:450ms]" />
                <span className="w-1.5 h-5 bg-white/90 rounded-full animate-bounce [animation-delay:600ms]" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Clear Status Capsule for Older Adults */}
      <div className="mt-3 flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass border border-white/15 shadow-sm">
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            isUrgent
              ? 'bg-rose-500 animate-ping'
              : state === 'listening'
              ? 'bg-indigo-400 animate-pulse'
              : state === 'thinking'
              ? 'bg-purple-400 animate-spin'
              : state === 'speaking'
              ? 'bg-emerald-400 animate-pulse'
              : 'bg-sky-400'
          }`}
        />
        <span className="text-base sm:text-lg font-semibold tracking-wide text-slate-100">
          {getStatusLabel()}
        </span>
      </div>
    </div>
  );
};
