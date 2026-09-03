'use client';

import React from 'react';
import { AssistantState, Language } from '@/types';
import { TRANSLATIONS } from '@/lib/translations';
import { Mic, MicOff, Square } from 'lucide-react';

interface ActivationButtonProps {
  state: AssistantState;
  language: Language;
  onToggleActivation: () => void;
  onStopSpeaking?: () => void;
}

export const ActivationButton: React.FC<ActivationButtonProps> = ({
  state,
  language,
  onToggleActivation,
  onStopSpeaking,
}) => {
  const t = TRANSLATIONS[language];
  const isListening = state === 'listening' || state === 'transcribing';
  const isSpeaking = state === 'speaking' || state === 'responding';

  if (isSpeaking && onStopSpeaking) {
    return (
      <div className="w-full max-w-sm mx-auto px-4 my-2">
        <button
          onClick={onStopSpeaking}
          className="w-full h-16 sm:h-20 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold text-xl sm:text-2xl shadow-liquid-lg flex items-center justify-center gap-3 tactile-button border border-rose-400/30"
          aria-label={t.stopSpeaking}
        >
          <Square className="w-7 h-7 fill-white" />
          <span>{t.stopSpeaking}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto px-4 my-2 text-center">
      <button
        onClick={onToggleActivation}
        className={`w-full h-16 sm:h-20 rounded-2xl font-bold text-xl sm:text-2xl tracking-wide flex items-center justify-center gap-3.5 transition-all duration-300 tactile-button border ${
          isListening
            ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600 text-white shadow-liquid-lg border-indigo-400/50 ring-4 ring-indigo-500/30'
            : 'liquid-glass-elevated text-white hover:bg-white/15 border-white/25 shadow-liquid-lg'
        }`}
        aria-label={isListening ? t.listening : t.startAssistant}
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isListening
              ? 'bg-white/20 animate-pulse'
              : 'bg-gradient-to-tr from-sky-500 to-indigo-500 shadow-md shadow-sky-500/20'
          }`}
        >
          {isListening ? (
            <MicOff className="w-6 h-6 text-white animate-bounce" />
          ) : (
            <Mic className="w-6 h-6 text-white" />
          )}
        </div>
        <span className="truncate">
          {isListening ? t.listening : t.startAssistant}
        </span>
      </button>

      {/* Subtle prototype note */}
      <p className="text-[12px] text-slate-400/80 mt-1.5 font-medium tracking-wide">
        {t.prototypeActivation}
      </p>
    </div>
  );
};
