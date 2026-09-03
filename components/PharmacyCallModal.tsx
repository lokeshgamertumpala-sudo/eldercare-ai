'use client';

import React, { useState, useEffect } from 'react';
import { Language, PharmacyCallTranscriptItem } from '@/types';
import { TRANSLATIONS } from '@/lib/translations';
import { PhoneCall, X, Store, CheckCircle, Clock, Volume2, Sparkles } from 'lucide-react';

interface PharmacyCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  medicineName?: string;
}

export const PharmacyCallModal: React.FC<PharmacyCallModalProps> = ({
  isOpen,
  onClose,
  language,
  medicineName = 'Metformin 500mg',
}) => {
  const t = TRANSLATIONS[language];
  const [step, setStep] = useState<number>(0);
  const [transcript, setTranscript] = useState<PharmacyCallTranscriptItem[]>([]);
  const [isCalling, setIsCalling] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      runSimulatedCall();
    } else {
      setStep(0);
      setTranscript([]);
      setIsCalling(false);
    }
  }, [isOpen]);

  const runSimulatedCall = () => {
    setIsCalling(true);
    setStep(1); // Connecting
    setTranscript([
      {
        id: '1',
        speaker: 'system',
        text: `Dialing Apollo Pharmacy (Demo)... Connecting secure voice bridge.`,
        time: '00:01',
      },
    ]);

    setTimeout(() => {
      setStep(2); // AI speaking
      setTranscript((prev) => [
        ...prev,
        {
          id: '2',
          speaker: 'bot',
          text: `Hello, this is ElderCare AI calling on behalf of Demo Patient. Could you please verify stock for ${medicineName}?`,
          time: '00:05',
        },
      ]);
    }, 2000);

    setTimeout(() => {
      setStep(3); // Pharmacist speaking
      setTranscript((prev) => [
        ...prev,
        {
          id: '3',
          speaker: 'pharmacist',
          text: `Hello! Checking our inventory for ${medicineName}... Yes, we have 4 strips of 10 tablets in stock (₹38.50 per strip).`,
          time: '00:11',
        },
      ]);
    }, 4500);

    setTimeout(() => {
      setStep(4); // AI reserving
      setTranscript((prev) => [
        ...prev,
        {
          id: '4',
          speaker: 'bot',
          text: `Thank you! Please hold 1 strip for pickup today under Demo Patient ID.`,
          time: '00:16',
        },
      ]);
    }, 7000);

    setTimeout(() => {
      setStep(5); // Completed
      setIsCalling(false);
      setTranscript((prev) => [
        ...prev,
        {
          id: '5',
          speaker: 'system',
          text: `Medicine reserved successfully. Pharmacy open until 10:30 PM. (SIMULATED PROTOTYPE)`,
          time: '00:20',
        },
      ]);
    }, 9500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg liquid-glass-elevated rounded-3xl border border-sky-400/30 p-5 shadow-2xl relative overflow-hidden flex flex-col max-h-[85vh]">
        {/* Glow Header */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {t.pharmacyTitle}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider border border-amber-500/30">
                  DEMO MODE
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Checking availability for {medicineName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center text-slate-300 hover:text-white"
            aria-label={t.close}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Live Call Progress Status */}
        <div className="my-3 p-3.5 rounded-2xl liquid-glass border border-white/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3.5 h-3.5 rounded-full ${isCalling ? 'bg-emerald-400 animate-ping' : 'bg-emerald-500'}`} />
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Call Status
              </span>
              <span className="text-sm sm:text-base font-bold text-white">
                {step === 1 && 'Connecting to Apollo Pharmacy...'}
                {step === 2 && 'AI Assistant Speaking...'}
                {step === 3 && 'Pharmacist Responding...'}
                {step === 4 && 'Reserving Medicine...'}
                {step === 5 && 'Availability Confirmed & Reserved'}
                {step === 0 && 'Ready to Call'}
              </span>
            </div>
          </div>

          {isCalling ? (
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-4 bg-sky-400 rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-6 bg-sky-400 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-3 bg-sky-400 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          ) : (
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              IN STOCK (లభ్యమవుతుంది)
            </span>
          )}
        </div>

        {/* Live Call Transcript */}
        <div className="flex-1 overflow-y-auto my-2 space-y-2.5 pr-1">
          {transcript.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-2xl text-sm leading-relaxed border ${
                item.speaker === 'bot'
                  ? 'bg-sky-500/15 border-sky-400/30 text-sky-100 ml-4'
                  : item.speaker === 'pharmacist'
                  ? 'bg-emerald-500/15 border-emerald-400/30 text-emerald-100 mr-4'
                  : 'bg-white/5 border-white/10 text-slate-300 text-center text-xs'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold mb-1 opacity-75">
                <span>
                  {item.speaker === 'bot' && 'AI Assistant (ElderCare)'}
                  {item.speaker === 'pharmacist' && 'Pharmacist (Apollo)'}
                  {item.speaker === 'system' && 'Call System Event'}
                </span>
                <span>{item.time}</span>
              </div>
              <p className="text-sm font-medium">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="pt-3 border-t border-white/10 flex items-center gap-2.5">
          <button
            onClick={runSimulatedCall}
            disabled={isCalling}
            className="flex-1 py-3 rounded-2xl liquid-glass text-slate-200 border border-white/20 font-bold text-sm flex items-center justify-center gap-2 tactile-button"
          >
            <PhoneCall className="w-4 h-4 text-sky-400" />
            <span>Replay Call Demo</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm flex items-center justify-center gap-2 tactile-button shadow-md"
          >
            <span>Done (పూర్తయింది)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
