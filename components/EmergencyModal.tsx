'use client';

import React, { useState } from 'react';
import { EmergencyContact, Language } from '@/types';
import { TRANSLATIONS } from '@/lib/translations';
import { Phone, PhoneCall, X, AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  contacts: EmergencyContact[];
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  language,
  contacts,
}) => {
  const t = TRANSLATIONS[language];
  const [activeCallContact, setActiveCallContact] = useState<EmergencyContact | null>(null);
  const [callTimer, setCallTimer] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  if (!isOpen) return null;

  const startSimulatedCall = (contact: EmergencyContact) => {
    setActiveCallContact(contact);
    setCallTimer(0);
    const interval = setInterval(() => {
      setCallTimer((prev) => prev + 1);
    }, 1000);
    setTimerInterval(interval);
  };

  const endSimulatedCall = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setActiveCallContact(null);
    setCallTimer(0);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md liquid-glass-elevated rounded-3xl border-2 border-rose-500/40 p-5 shadow-2xl relative overflow-hidden">
        {/* Glow Header */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-rose-500 via-red-500 to-amber-500" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {t.emergencyTitle}
              </h2>
              <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">
                Immediate Action Mode
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              endSimulatedCall();
              onClose();
            }}
            className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center text-slate-300 hover:text-white"
            aria-label={t.close}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Warning Notice */}
        <div className="my-3.5 p-3 rounded-2xl bg-rose-950/40 border border-rose-500/30 flex items-start gap-2.5 text-left">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-rose-200 leading-snug">
            {t.emergencyWarning}
          </p>
        </div>

        {/* Active Simulated Call Screen */}
        {activeCallContact ? (
          <div className="py-6 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center animate-pulse mb-3">
              <PhoneCall className="w-10 h-10 text-rose-400 animate-bounce" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {activeCallContact.name}
            </h3>
            <p className="text-sm font-semibold text-rose-300 tracking-wider">
              {activeCallContact.phone}
            </p>
            <div className="mt-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-slate-200">
              {formatTimer(callTimer)} • (SIMULATED CALL DEMO)
            </div>

            <div className="w-full mt-6 flex gap-3">
              <button
                onClick={endSimulatedCall}
                className="w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-lg shadow-liquid tactile-button flex items-center justify-center gap-2"
              >
                <X className="w-6 h-6" />
                <span>End Call (కాల్ ముగించండి)</span>
              </button>
            </div>
          </div>
        ) : (
          /* List of Emergency Contacts */
          <div className="flex flex-col gap-2.5 my-2 max-h-[50vh] overflow-y-auto pr-1">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="p-3.5 rounded-2xl liquid-glass border border-white/15 flex items-center justify-between gap-2"
              >
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white leading-tight">
                    {contact.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                    {contact.relation} • {contact.phone}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Native dialer link */}
                  <a
                    href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                    className="p-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs flex items-center gap-1 shadow-md tactile-button"
                    title="Open phone dialer"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="hidden sm:inline">Call</span>
                  </a>

                  {/* Simulated Demo Call for Desktop / Browser */}
                  <button
                    onClick={() => startSimulatedCall(contact)}
                    className="p-3 rounded-xl liquid-glass border border-rose-400/40 text-rose-300 hover:bg-rose-500/20 font-bold text-xs flex items-center gap-1 tactile-button"
                    title="Simulate call"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span className="text-[11px]">Demo</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Disclaimer footer */}
        <p className="text-[11px] text-slate-400 text-center mt-3 pt-2 border-t border-white/10">
          {t.emergencyDisclaimer}
        </p>
      </div>
    </div>
  );
};
