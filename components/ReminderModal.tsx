'use client';

import React from 'react';
import { Language, Reminder } from '@/types';
import { TRANSLATIONS } from '@/lib/translations';
import { Bell, Clock, Check, X, Pill, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  pendingReminder?: {
    medicine?: string;
    time?: string;
    frequency?: string;
  } | null;
  reminders: Reminder[];
  onConfirmPending: (reminder: Reminder) => void;
  onCancelPending: () => void;
  onDeleteReminder: (id: string) => void;
}

export const ReminderModal: React.FC<ReminderModalProps> = ({
  isOpen,
  onClose,
  language,
  pendingReminder,
  reminders,
  onConfirmPending,
  onCancelPending,
  onDeleteReminder,
}) => {
  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!pendingReminder) return;
    const newReminder: Reminder = {
      id: `rem-${Date.now()}`,
      medicineName: pendingReminder.medicine || 'Metformin 500mg',
      time: pendingReminder.time || '08:00 AM',
      frequency: pendingReminder.frequency || 'Daily',
      active: true,
      createdAt: new Date().toISOString(),
    };
    try {
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
    } catch {
      // ignore
    }
    onConfirmPending(newReminder);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md liquid-glass-elevated rounded-3xl border border-sky-400/30 p-5 shadow-2xl relative overflow-hidden flex flex-col max-h-[85vh]">
        {/* Glow Header */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                {t.medicineReminder}
              </h2>
              <span className="text-xs text-slate-300">
                Automatic scheduled notifications
              </span>
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

        {/* Pending Reminder Confirmation Card */}
        {pendingReminder && (
          <div className="my-3 p-4 rounded-2xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 border-2 border-sky-400/50 shadow-liquid">
            <div className="flex items-center gap-2 text-sky-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Clock className="w-4 h-4" />
              <span>{t.reminderPrompt}</span>
            </div>
            <h3 className="text-2xl font-black text-white mt-1">
              {pendingReminder.time || '08:00 AM'}
            </h3>
            <p className="text-base font-semibold text-slate-200 mt-0.5">
              {pendingReminder.medicine || 'Metformin 500mg'} • {pendingReminder.frequency || 'Daily'}
            </p>

            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={onCancelPending}
                className="flex-1 py-3 rounded-xl liquid-glass text-slate-300 font-bold text-sm border border-white/15 tactile-button"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm shadow-md flex items-center justify-center gap-1.5 tactile-button border border-emerald-400/30"
              >
                <Check className="w-4 h-4" />
                <span>{t.confirm}</span>
              </button>
            </div>
          </div>
        )}

        {/* List of Active Reminders */}
        <div className="flex-1 overflow-y-auto my-2 space-y-2.5 pr-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Active Reminders (నమోదైన రిమైండర్‌లు)
          </span>

          {reminders.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">
              No reminders set. You can say &quot;Remind me at 8 AM&quot;.
            </p>
          ) : (
            reminders.map((rem) => (
              <div
                key={rem.id}
                className="p-3.5 rounded-2xl liquid-glass border border-white/15 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-400/25 flex items-center justify-center text-sky-400">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {rem.medicineName}
                    </h4>
                    <p className="text-xs font-semibold text-slate-300 mt-0.5">
                      {rem.time} • {rem.frequency}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteReminder(rem.id)}
                  className="w-9 h-9 rounded-xl liquid-glass flex items-center justify-center text-slate-400 hover:text-rose-400 border border-white/10"
                  aria-label="Delete reminder"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Bottom Close Button */}
        <div className="pt-3 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl liquid-glass text-slate-200 border border-white/20 font-bold text-base tactile-button"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
