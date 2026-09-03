'use client';

import React from 'react';
import { Language, UserPreferences } from '@/types';
import { TRANSLATIONS } from '@/lib/translations';
import { X, Volume2, Type, Eye, Sparkles, RefreshCw, Sliders, Shield } from 'lucide-react';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  preferences: UserPreferences;
  onUpdatePreferences: (pref: Partial<UserPreferences>) => void;
  onResetDemo: () => void;
}

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  isOpen,
  onClose,
  language,
  onLanguageChange,
  preferences,
  onUpdatePreferences,
  onResetDemo,
}) => {
  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#0c121e] border-l border-white/20 h-full p-5 flex flex-col justify-between overflow-y-auto shadow-2xl">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <Sliders className="w-5 h-5 text-sky-400" />
              <h2 className="text-xl font-bold text-white tracking-tight">
                {t.settings}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center text-slate-300 hover:text-white"
              aria-label={t.close}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Preferences Controls */}
          <div className="space-y-5 my-5">
            {/* Language Selector */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 uppercase tracking-wider block">
                Primary Language (భాష / भाषा)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => onLanguageChange('en')}
                  className={`py-3 rounded-xl font-bold text-sm border transition-all ${
                    language === 'en'
                      ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/30'
                      : 'liquid-glass text-slate-300 border-white/10 hover:border-white/25'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => onLanguageChange('te')}
                  className={`py-3 rounded-xl font-bold text-sm border transition-all ${
                    language === 'te'
                      ? 'bg-pink-600 text-white border-pink-400 shadow-md shadow-pink-600/30'
                      : 'liquid-glass text-slate-300 border-white/10 hover:border-white/25'
                  }`}
                >
                  తెలుగు
                </button>
                <button
                  onClick={() => onLanguageChange('hi')}
                  className={`py-3 rounded-xl font-bold text-sm border transition-all ${
                    language === 'hi'
                      ? 'bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-600/30'
                      : 'liquid-glass text-slate-300 border-white/10 hover:border-white/25'
                  }`}
                >
                  हिन्दी
                </button>
              </div>
            </div>

            {/* Voice Speech Rate */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-sky-400" />
                <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                  {t.speechSpeed}
                </label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onUpdatePreferences({ speechRate: 0.85 })}
                  className={`py-3 rounded-xl font-bold text-sm border transition-all ${
                    preferences.speechRate < 0.95
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                      : 'liquid-glass text-slate-300 border-white/10 hover:border-white/25'
                  }`}
                >
                  {t.speedSlow}
                </button>
                <button
                  onClick={() => onUpdatePreferences({ speechRate: 1.0 })}
                  className={`py-3 rounded-xl font-bold text-sm border transition-all ${
                    preferences.speechRate >= 0.95
                      ? 'bg-sky-500 text-white border-sky-400 shadow-md'
                      : 'liquid-glass text-slate-300 border-white/10 hover:border-white/25'
                  }`}
                >
                  {t.speedNormal}
                </button>
              </div>
            </div>

            {/* Font Size */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-sky-400" />
                <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                  {t.textSize}
                </label>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => onUpdatePreferences({ fontSize: 'normal' })}
                  className={`py-2.5 rounded-xl font-bold text-xs border transition-all ${
                    preferences.fontSize === 'normal'
                      ? 'bg-sky-500 text-white border-sky-400'
                      : 'liquid-glass text-slate-300 border-white/10'
                  }`}
                >
                  Default
                </button>
                <button
                  onClick={() => onUpdatePreferences({ fontSize: 'large' })}
                  className={`py-2.5 rounded-xl font-bold text-sm border transition-all ${
                    preferences.fontSize === 'large'
                      ? 'bg-sky-500 text-white border-sky-400'
                      : 'liquid-glass text-slate-300 border-white/10'
                  }`}
                >
                  Large (పెద్దది)
                </button>
                <button
                  onClick={() => onUpdatePreferences({ fontSize: 'extra-large' })}
                  className={`py-2.5 rounded-xl font-bold text-base border transition-all ${
                    preferences.fontSize === 'extra-large'
                      ? 'bg-sky-500 text-white border-sky-400'
                      : 'liquid-glass text-slate-300 border-white/10'
                  }`}
                >
                  XL (చాలా పెద్దది)
                </button>
              </div>
            </div>

            {/* High Contrast Toggle */}
            <div className="p-3.5 rounded-2xl liquid-glass border border-white/15 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Eye className="w-5 h-5 text-sky-400" />
                <span className="text-base font-bold text-white">{t.highContrast}</span>
              </div>
              <input
                type="checkbox"
                checked={preferences.highContrast}
                onChange={(e) => onUpdatePreferences({ highContrast: e.target.checked })}
                className="w-6 h-6 rounded accent-sky-500 cursor-pointer"
              />
            </div>

            {/* Reduced Motion Toggle */}
            <div className="p-3.5 rounded-2xl liquid-glass border border-white/15 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-sky-400" />
                <span className="text-base font-bold text-white">{t.reducedMotion}</span>
              </div>
              <input
                type="checkbox"
                checked={preferences.reducedMotion}
                onChange={(e) => onUpdatePreferences({ reducedMotion: e.target.checked })}
                className="w-6 h-6 rounded accent-sky-500 cursor-pointer"
              />
            </div>

            {/* AI Architecture Status */}
            <div className="p-3.5 rounded-2xl bg-sky-950/40 border border-sky-400/25">
              <div className="flex items-center gap-2 text-sky-300 text-xs font-bold uppercase tracking-wider mb-1">
                <Shield className="w-4 h-4 text-sky-400" />
                <span>Cloud Multimodal Architecture</span>
              </div>
              <p className="text-sm text-slate-200">
                Primary Model: <strong className="text-white">gemini-3.8-flash</strong> via official Google GenAI SDK. Server-side API key protection with zero client leaks.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-white/10 space-y-2.5">
          <button
            onClick={() => {
              onResetDemo();
              onClose();
            }}
            className="w-full py-3.5 rounded-2xl liquid-glass text-rose-300 border border-rose-500/30 hover:bg-rose-500/10 font-bold text-sm flex items-center justify-center gap-2 tactile-button"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t.resetDemoData}</span>
          </button>
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-base tactile-button shadow-md"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
