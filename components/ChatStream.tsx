'use client';

import React from 'react';
import { ChatMessage, Language } from '@/types';
import { TRANSLATIONS } from '@/lib/translations';
import { Volume2, Square, AlertTriangle, ShieldAlert, ArrowRight, Pill, Sparkles } from 'lucide-react';

interface ChatStreamProps {
  messages: ChatMessage[];
  language: Language;
  onSelectSampleQuestion: (q: string) => void;
  onReplayAudio: (text: string) => void;
  onStopAudio: () => void;
  isSpeaking: boolean;
  currentlySpeakingText?: string;
}

export const ChatStream: React.FC<ChatStreamProps> = ({
  messages,
  language,
  onSelectSampleQuestion,
  onReplayAudio,
  onStopAudio,
  isSpeaking,
  currentlySpeakingText,
}) => {
  const t = TRANSLATIONS[language];

  if (messages.length === 0) {
    return (
      <div className="w-full max-w-sm mx-auto px-4 my-3 text-center">
        <div className="liquid-glass-card rounded-3xl p-5 border border-white/15 shadow-liquid">
          <div className="w-12 h-12 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center mx-auto mb-3 text-sky-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {t.emptyStateTitle}
          </h2>
          <p className="text-sm text-slate-300 mt-1 leading-snug">
            {t.emptyStateSubtitle}
          </p>

          {/* Accessible Sample Question Chips */}
          <div className="mt-4 flex flex-col gap-2 text-left">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
              Sample questions (ఉదాహరణ ప్రశ్నలు)
            </span>
            {t.sampleQuestions.map((question, idx) => (
              <button
                key={idx}
                onClick={() => onSelectSampleQuestion(question)}
                className="w-full text-left p-2.5 rounded-xl liquid-glass text-slate-200 hover:text-white hover:bg-white/15 border border-white/10 text-sm font-medium transition-all flex items-center justify-between group tactile-button"
              >
                <span className="leading-snug pr-2">{question}</span>
                <ArrowRight className="w-4 h-4 text-sky-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto px-4 space-y-3.5 my-3">
      {messages.map((msg) => {
        const isUser = msg.role === 'user';
        const isThisSpeaking = isSpeaking && currentlySpeakingText === (msg.speechText || msg.text);

        if (isUser) {
          return (
            <div key={msg.id} className="flex flex-col items-end">
              <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-gradient-to-r from-sky-600 to-indigo-600 px-4 py-2.5 text-white font-semibold text-base sm:text-lg shadow-md border border-sky-400/30">
                {msg.imageUrl && (
                  <img
                    src={msg.imageUrl}
                    alt="Uploaded medicine"
                    className="w-full max-h-40 object-cover rounded-xl mb-2 border border-white/20"
                  />
                )}
                <p className="leading-snug">{msg.text}</p>
              </div>
            </div>
          );
        }

        // Assistant Message Card
        return (
          <div key={msg.id} className="flex flex-col items-start w-full">
            <div className="w-full rounded-2xl liquid-glass-card p-4 border border-white/20 shadow-liquid relative overflow-hidden">
              {/* Top Accent bar for Warning / Urgent */}
              {msg.warningLevel === 'urgent' && (
                <div className="absolute top-0 inset-x-0 h-1.5 bg-rose-500 animate-pulse" />
              )}
              {msg.warningLevel === 'caution' && (
                <div className="absolute top-0 inset-x-0 h-1.5 bg-amber-500" />
              )}

              {/* Main Answer text */}
              <p className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
                {msg.text}
              </p>

              {/* Warning Alert Block */}
              {msg.warning && (
                <div
                  className={`mt-3 p-3 rounded-xl border flex items-start gap-2.5 ${
                    msg.warningLevel === 'urgent'
                      ? 'bg-rose-950/50 border-rose-500/50 text-rose-200'
                      : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                  }`}
                >
                  <AlertTriangle
                    className={`w-5 h-5 shrink-0 mt-0.5 ${
                      msg.warningLevel === 'urgent' ? 'text-rose-400' : 'text-amber-400'
                    }`}
                  />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider block mb-0.5">
                      {msg.warningLevel === 'urgent' ? t.urgentAlert : t.cautionAlert}
                    </span>
                    <p className="text-sm font-medium leading-snug">{msg.warning}</p>
                  </div>
                </div>
              )}

              {/* Next Action Box */}
              {msg.nextAction && (
                <div className="mt-3 p-2.5 rounded-xl bg-sky-500/10 border border-sky-400/25 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="text-sm font-semibold text-sky-200">
                    {msg.nextAction}
                  </span>
                </div>
              )}

              {/* Voice Controls: Replay / Stop */}
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isThisSpeaking ? (
                    <button
                      onClick={onStopAudio}
                      className="px-3 py-1.5 rounded-lg bg-rose-500/30 border border-rose-400/40 text-rose-200 font-bold text-xs flex items-center gap-1.5 tactile-button"
                    >
                      <Square className="w-3.5 h-3.5 fill-rose-300" />
                      <span>{t.stopSpeaking}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onReplayAudio(msg.speechText || msg.text)}
                      className="px-3 py-1.5 rounded-lg liquid-glass border border-white/20 text-slate-200 hover:text-white font-bold text-xs flex items-center gap-1.5 tactile-button"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-sky-400" />
                      <span>{t.replay}</span>
                    </button>
                  )}
                </div>

                <span className="text-[11px] font-mono text-slate-400">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
