'use client';

import React, { useState } from 'react';
import { Language } from '@/types';
import { TRANSLATIONS } from '@/lib/translations';
import { Bell, AlertTriangle, Camera, Store, RefreshCw, ChevronUp, ChevronDown, Wrench } from 'lucide-react';

interface DemoToolbarProps {
  language: Language;
  onTriggerDemoReminder: () => void;
  onTriggerDemoEmergency: () => void;
  onTriggerDemoCamera: () => void;
  onTriggerDemoPharmacy: () => void;
  onResetDemoData: () => void;
}

export const DemoToolbar: React.FC<DemoToolbarProps> = ({
  language,
  onTriggerDemoReminder,
  onTriggerDemoEmergency,
  onTriggerDemoCamera,
  onTriggerDemoPharmacy,
  onResetDemoData,
}) => {
  const t = TRANSLATIONS[language];
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 flex flex-col items-center pointer-events-none pb-1">
      {/* Floating Toggle Pill */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="pointer-events-auto px-4 py-1.5 rounded-full liquid-glass-elevated border border-sky-400/40 text-xs font-bold text-sky-200 flex items-center gap-1.5 shadow-2xl mb-1 tactile-button"
      >
        <Wrench className="w-3.5 h-3.5 text-sky-400" />
        <span>Judge Demo Bar (డెమో బార్)</span>
        {isExpanded ? (
          <ChevronDown className="w-3.5 h-3.5" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Expanded Actions Dock */}
      {isExpanded && (
        <div className="pointer-events-auto w-full max-w-lg mx-auto px-3 pb-2 animate-in slide-in-from-bottom-2 duration-200">
          <div className="liquid-glass-elevated rounded-2xl p-3 border border-sky-400/30 shadow-2xl backdrop-blur-3xl">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
              <span className="text-[11px] font-black uppercase tracking-wider text-sky-300">
                ICO Hackathon Rapid Testing Controls
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                Gemini 3.8 Flash Engine
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {/* 1. Demo Reminder Now */}
              <button
                onClick={onTriggerDemoReminder}
                className="p-2.5 rounded-xl liquid-glass border border-sky-400/30 text-sky-100 hover:bg-sky-500/20 text-xs font-bold flex flex-col items-center gap-1 text-center tactile-button"
              >
                <Bell className="w-4 h-4 text-sky-400" />
                <span className="leading-tight">Demo Reminder</span>
              </button>

              {/* 2. Demo Emergency */}
              <button
                onClick={onTriggerDemoEmergency}
                className="p-2.5 rounded-xl liquid-glass border border-rose-500/40 text-rose-200 hover:bg-rose-500/20 text-xs font-bold flex flex-col items-center gap-1 text-center tactile-button"
              >
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span className="leading-tight">Demo Urgent</span>
              </button>

              {/* 3. Demo Camera Analysis */}
              <button
                onClick={onTriggerDemoCamera}
                className="p-2.5 rounded-xl liquid-glass border border-indigo-400/30 text-indigo-100 hover:bg-indigo-500/20 text-xs font-bold flex flex-col items-center gap-1 text-center tactile-button"
              >
                <Camera className="w-4 h-4 text-indigo-400" />
                <span className="leading-tight">Demo Camera</span>
              </button>

              {/* 4. Demo Pharmacy Call */}
              <button
                onClick={onTriggerDemoPharmacy}
                className="p-2.5 rounded-xl liquid-glass border border-emerald-400/30 text-emerald-100 hover:bg-emerald-500/20 text-xs font-bold flex flex-col items-center gap-1 text-center tactile-button"
              >
                <Store className="w-4 h-4 text-emerald-400" />
                <span className="leading-tight">Pharmacy Bot</span>
              </button>
            </div>

            {/* Reset Button */}
            <div className="mt-2 pt-2 border-t border-white/10 flex justify-end">
              <button
                onClick={onResetDemoData}
                className="text-[11px] font-bold text-slate-400 hover:text-rose-300 flex items-center gap-1 py-0.5 px-2 rounded-lg hover:bg-white/5 transition-all"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset All Demo Data</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
