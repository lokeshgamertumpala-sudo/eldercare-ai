'use client';

import React from 'react';
import { Language } from '@/types';
import { TRANSLATIONS } from '@/lib/translations';
import { Sparkles, Settings, Activity } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenSettings: () => void;
  isConnected?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onOpenSettings,
  isConnected = true,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="w-full max-w-md mx-auto pt-3 pb-2 px-4 flex items-center justify-between z-20">
      {/* Brand Title */}
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500/30 to-indigo-500/30 border border-sky-400/30 flex items-center justify-center shadow-lg shadow-sky-500/10">
          <Sparkles className="w-5 h-5 text-sky-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white leading-none">
            {t.appTitle}
          </h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-medium tracking-wide text-emerald-300/90 uppercase">
              Gemini 3.8 Flash
            </span>
          </div>
        </div>
      </div>

      {/* Language Switcher & Settings */}
      <div className="flex items-center gap-1.5">
        {/* Language Tabs */}
        <div className="flex items-center p-1 rounded-full liquid-glass border border-white/10">
          <button
            onClick={() => onLanguageChange('en')}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
              language === 'en'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                : 'text-slate-300 hover:text-white'
            }`}
            aria-label="Switch to English"
          >
            EN
          </button>
          <button
            onClick={() => onLanguageChange('te')}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
              language === 'te'
                ? 'bg-pink-600 text-white shadow-md shadow-pink-600/30'
                : 'text-slate-300 hover:text-white'
            }`}
            aria-label="తెలుగు భాషను ఎంచుకోండి"
          >
            తెలుగు
          </button>
          <button
            onClick={() => onLanguageChange('hi')}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
              language === 'hi'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-300 hover:text-white'
            }`}
            aria-label="हिन्दी भाषा चुनें"
          >
            हिन्दी
          </button>
        </div>

        {/* Settings button */}
        <button
          onClick={onOpenSettings}
          className="w-10 h-10 rounded-full liquid-glass border border-white/15 flex items-center justify-center text-slate-200 hover:text-white hover:border-white/30 transition-all tactile-button"
          aria-label="Settings and accessibility"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
