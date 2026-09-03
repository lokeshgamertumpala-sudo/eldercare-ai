'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  AssistantState,
  ChatMessage,
  EmergencyContact,
  Language,
  Medicine,
  Reminder,
  UserPreferences,
  AIResponse,
} from '@/types';
import { TRANSLATIONS } from '@/lib/translations';
import {
  DEFAULT_EMERGENCY_CONTACTS,
  DEFAULT_MEDICINES,
  DEFAULT_REMINDERS,
  getStoredEmergencyContacts,
  getStoredMedicines,
  getStoredReminders,
  resetDemoData,
  saveMedicines,
  saveReminders,
} from '@/lib/medicineContext';
import { getSpeechInputProvider, ISpeechInputProvider } from '@/lib/speechProvider';
import { ttsService } from '@/lib/tts';

// Components
import { Header } from '@/components/Header';
import { AIOrb } from '@/components/AIOrb';
import { ActivationButton } from '@/components/ActivationButton';
import { MedicineCard } from '@/components/MedicineCard';
import { ChatStream } from '@/components/ChatStream';
import { CameraModal } from '@/components/CameraModal';
import { EmergencyModal } from '@/components/EmergencyModal';
import { PharmacyCallModal } from '@/components/PharmacyCallModal';
import { ReminderModal } from '@/components/ReminderModal';
import { SettingsDrawer } from '@/components/SettingsDrawer';
import { DemoToolbar } from '@/components/DemoToolbar';

// Icons
import { Camera, AlertCircle, Phone, Send, Keyboard, X, Bell, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Home() {
  // App State
  const [language, setLanguage] = useState<Language>('te');
  const [assistantState, setAssistantState] = useState<AssistantState>('idle');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>(DEFAULT_MEDICINES);
  const [reminders, setReminders] = useState<Reminder[]>(DEFAULT_REMINDERS);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>(DEFAULT_EMERGENCY_CONTACTS);

  // Live Speech & Text
  const [currentTranscript, setCurrentTranscript] = useState<string>('');
  const [typedInput, setTypedInput] = useState<string>('');
  const [showTypeInput, setShowTypeInput] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [currentlySpeakingText, setCurrentlySpeakingText] = useState<string>('');

  // Modals & Panels
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState<boolean>(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState<boolean>(false);
  const [isPharmacyOpen, setIsPharmacyOpen] = useState<boolean>(false);
  const [isReminderOpen, setIsReminderOpen] = useState<boolean>(false);
  const [pendingReminder, setPendingReminder] = useState<{
    medicine?: string;
    time?: string;
    frequency?: string;
  } | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Active Alert Banner (e.g. for Demo Reminder or Urgent Notice)
  const [activeAlert, setActiveAlert] = useState<{
    type: 'reminder' | 'urgent';
    title: string;
    subtitle: string;
    speechText: string;
  } | null>(null);

  // Accessibility & Preferences
  const [preferences, setPreferences] = useState<UserPreferences>({
    speechRate: 0.85,
    fontSize: 'normal',
    highContrast: false,
    reducedMotion: false,
  });

  const speechProviderRef = useRef<ISpeechInputProvider | null>(null);
  const t = TRANSLATIONS[language];

  // Initialize data on mount
  useEffect(() => {
    setMedicines(getStoredMedicines());
    setReminders(getStoredReminders());
    setEmergencyContacts(getStoredEmergencyContacts());

    const savedLang = localStorage.getItem('eldercare_selected_language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'te' || savedLang === 'hi')) {
      setLanguage(savedLang);
    }
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    ttsService.stop();
    setIsSpeaking(false);
    setLanguage(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('eldercare_selected_language', newLang);
    }
  };

  const handleUpdatePreferences = (updated: Partial<UserPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...updated }));
  };

  const handleResetDemoData = () => {
    ttsService.stop();
    setIsSpeaking(false);
    resetDemoData();
    setMedicines(DEFAULT_MEDICINES);
    setReminders(DEFAULT_REMINDERS);
    setEmergencyContacts(DEFAULT_EMERGENCY_CONTACTS);
    setMessages([]);
    setLanguage('te');
    setActiveAlert(null);
  };

  // Stop Audio playback
  const handleStopAudio = () => {
    ttsService.stop();
    setIsSpeaking(false);
    setCurrentlySpeakingText('');
    setAssistantState((prev) => (prev === 'speaking' ? 'idle' : prev));
  };

  // Replay Audio
  const handleReplayAudio = (text: string) => {
    if (!text) return;
    handleStopAudio();
    setIsSpeaking(true);
    setCurrentlySpeakingText(text);
    setAssistantState('speaking');

    ttsService.speak(
      text,
      language,
      preferences.speechRate,
      () => {
        setIsSpeaking(true);
        setAssistantState('speaking');
      },
      () => {
        setIsSpeaking(false);
        setCurrentlySpeakingText('');
        setAssistantState('idle');
      },
      () => {
        setIsSpeaking(false);
        setAssistantState('idle');
      }
    );
  };

  // Primary Query Dispatcher to Backend
  const submitQueryToAI = async (
    userText: string,
    imageBase64?: string,
    imageMimeType?: string
  ) => {
    if (!userText.trim() && !imageBase64) return;

    // Interrupt any active speech
    handleStopAudio();

    // 1. Add User message to chat
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      imageUrl: imageBase64,
    };
    setMessages((prev) => [...prev, userMsg]);
    setCurrentTranscript('');
    setAssistantState('thinking');

    try {
      // 2. Call server-side API
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userText,
          language,
          medicines,
          imageBase64,
          imageMimeType,
          conversationHistory: messages.slice(-4).map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      const data: AIResponse = await res.json();

      // 3. Add AI response to chat
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: data.answer,
        speechText: data.speechText || data.answer,
        warning: data.warning,
        warningLevel: data.warningLevel,
        nextAction: data.nextAction,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);

      // 4. Handle Reminders if requested by AI
      if (data.reminderAction?.create) {
        setPendingReminder({
          medicine: data.reminderAction.medicine || 'Metformin 500mg',
          time: data.reminderAction.time || '08:00 AM',
          frequency: data.reminderAction.frequency || 'Daily',
        });
        setIsReminderOpen(true);
      }

      // 5. Play Voice Output
      const spokenText = data.speechText || data.answer;
      if (spokenText) {
        setIsSpeaking(true);
        setCurrentlySpeakingText(spokenText);
        setAssistantState('speaking');

        ttsService.speak(
          spokenText,
          language,
          preferences.speechRate,
          () => {
            setIsSpeaking(true);
            setAssistantState('speaking');
          },
          () => {
            setIsSpeaking(false);
            setCurrentlySpeakingText('');
            setAssistantState('idle');
          },
          () => {
            setIsSpeaking(false);
            setAssistantState('idle');
          }
        );
      } else {
        setAssistantState('idle');
      }
    } catch (err) {
      console.error('Failed to get AI response:', err);
      setAssistantState('error');
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          text: 'AI connection is unavailable right now. Please check your network or try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          warningLevel: 'none',
        },
      ]);
    }
  };

  // Activation Button Click (Start / Stop Microphone)
  const handleToggleActivation = () => {
    // If speaking, stop speaking immediately (conversational interruption)
    if (assistantState === 'speaking' || isSpeaking) {
      handleStopAudio();
      return;
    }

    // If already listening, stop listening and submit what was transcribed
    if (assistantState === 'listening' || assistantState === 'transcribing') {
      speechProviderRef.current?.stop();
      setAssistantState('idle');
      if (currentTranscript.trim()) {
        submitQueryToAI(currentTranscript.trim());
      }
      return;
    }

    // Otherwise, start listening
    setAssistantState('activating');
    setCurrentTranscript('');

    const provider = getSpeechInputProvider();
    speechProviderRef.current = provider;

    provider.start({
      language,
      onStart: () => {
        setAssistantState('listening');
      },
      onTranscript: (transcript, isFinal) => {
        setCurrentTranscript(transcript);
        setAssistantState('transcribing');
        if (isFinal && transcript.trim().length > 3) {
          // Auto-submit on finalized sentence
          provider.stop();
          submitQueryToAI(transcript.trim());
        }
      },
      onError: (err) => {
        console.warn('Speech recognition warning:', err);
        setAssistantState('idle');
        // If browser SpeechRecognition is blocked or unsupported, prompt typing
        setShowTypeInput(true);
      },
      onEnd: () => {
        setAssistantState((prev) =>
          prev === 'listening' || prev === 'transcribing' ? 'idle' : prev
        );
      },
    });
  };

  // Camera Analysis Handler
  const handleAnalyzeImage = async (base64Image: string, mimeType: string) => {
    setIsAnalyzingImage(true);
    await submitQueryToAI('Please identify this medicine and review my schedule.', base64Image, mimeType);
    setIsAnalyzingImage(false);
  };

  // Demo Actions for Hackathon Judges
  const handleTriggerDemoReminder = () => {
    const alertData = {
      type: 'reminder' as const,
      title: t.timeForMedicine,
      subtitle: 'Metformin 500mg • 1 tablet with water (టిఫిన్ తర్వాత ఒక మాత్ర)',
      speechText: t.timeForMedicine,
    };
    setActiveAlert(alertData);

    // Audio announcement in selected language
    ttsService.speak(alertData.speechText, language, preferences.speechRate);
  };

  const handleTriggerDemoEmergency = () => {
    setIsEmergencyOpen(true);
  };

  const handleTriggerDemoCamera = () => {
    setIsCameraOpen(true);
  };

  const handleTriggerDemoPharmacy = () => {
    setIsPharmacyOpen(true);
  };

  // Confirm pending reminder
  const handleConfirmPendingReminder = (newRem: Reminder) => {
    const updated = [...reminders, newRem];
    setReminders(updated);
    saveReminders(updated);
    setPendingReminder(null);
    setIsReminderOpen(false);

    // Voice confirmation
    ttsService.speak(t.reminderConfirmed, language, preferences.speechRate);
  };

  const handleDeleteReminder = (id: string) => {
    const updated = reminders.filter((r) => r.id !== id);
    setReminders(updated);
    saveReminders(updated);
  };

  return (
    <main
      className={`min-h-screen flex flex-col justify-between pb-20 relative select-none ${
        preferences.highContrast ? 'high-contrast' : ''
      } ${
        preferences.fontSize === 'large'
          ? 'text-scale-large'
          : preferences.fontSize === 'extra-large'
          ? 'text-scale-extra-large'
          : ''
      }`}
    >
      {/* Background Soft Atmospheric Ambient Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -left-32 w-80 h-80 bg-sky-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* Top Header */}
        <Header
          language={language}
          onLanguageChange={handleLanguageChange}
          onOpenSettings={() => setIsSettingsOpen(true)}
          isConnected={true}
        />

        {/* Active Alert Banner (Demo Reminder or Urgent Callout) */}
        {activeAlert && (
          <div className="w-full max-w-sm mx-auto px-4 my-2 animate-in slide-in-from-top duration-300">
            <div className="liquid-glass-elevated rounded-2xl p-4 border-2 border-emerald-400/50 shadow-liquid relative overflow-hidden bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-emerald-950/40">
              <button
                onClick={() => setActiveAlert(null)}
                className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full liquid-glass flex items-center justify-center text-slate-300 hover:text-white"
                aria-label="Dismiss alert"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Bell className="w-4 h-4 animate-bounce" />
                <span>Medicine Alert (మందుల సమయం)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {activeAlert.title}
              </h2>
              <p className="text-sm text-slate-200 mt-1 font-medium">
                {activeAlert.subtitle}
              </p>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => {
                    confetti({ particleCount: 40, spread: 60 });
                    setActiveAlert(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm flex items-center justify-center gap-1.5 shadow-md tactile-button"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Taken (తీసుకున్నాను)</span>
                </button>
                <button
                  onClick={() => setActiveAlert(null)}
                  className="px-4 py-2.5 rounded-xl liquid-glass text-slate-300 font-bold text-sm tactile-button"
                >
                  Snooze
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Central Visual Experience: AI Orb */}
        <AIOrb
          state={assistantState}
          language={language}
          onOrbClick={handleToggleActivation}
          isUrgent={messages.some((m) => m.warningLevel === 'urgent')}
        />

        {/* Live Speech Recognition Transcript under Orb */}
        {currentTranscript && (
          <div className="w-full max-w-sm mx-auto px-4 -mt-1 mb-2 animate-in fade-in duration-150">
            <div className="p-3 rounded-2xl liquid-glass border border-sky-400/40 text-center">
              <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block mb-0.5">
                Hearing You (వింటున్నాను)
              </span>
              <p className="text-base sm:text-lg font-bold text-white italic">
                &ldquo;{currentTranscript}&rdquo;
              </p>
            </div>
          </div>
        )}

        {/* Primary Tactile 68px+ Activation Button */}
        <ActivationButton
          state={assistantState}
          language={language}
          onToggleActivation={handleToggleActivation}
          onStopSpeaking={handleStopAudio}
        />

        {/* Two Large Primary Secondary Buttons: Camera & Emergency */}
        <div className="w-full max-w-sm mx-auto px-4 grid grid-cols-2 gap-3 my-1">
          {/* Camera Button */}
          <button
            onClick={() => setIsCameraOpen(true)}
            className="h-16 rounded-2xl liquid-glass-card hover:bg-white/15 border border-white/20 text-white font-bold text-base sm:text-lg flex items-center justify-center gap-2.5 tactile-button shadow-liquid"
            aria-label={t.camera}
          >
            <div className="w-9 h-9 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
              <Camera className="w-5 h-5" />
            </div>
            <span>{t.camera}</span>
          </button>

          {/* Emergency Button */}
          <button
            onClick={() => setIsEmergencyOpen(true)}
            className="h-16 rounded-2xl bg-gradient-to-r from-rose-950/60 to-red-900/60 hover:from-rose-900/70 hover:to-red-800/70 border-2 border-rose-500/40 text-rose-100 font-bold text-base sm:text-lg flex items-center justify-center gap-2.5 tactile-button shadow-liquid"
            aria-label={t.emergency}
          >
            <div className="w-9 h-9 rounded-full bg-rose-500/30 border border-rose-400/40 flex items-center justify-center text-rose-300 animate-pulse">
              <Phone className="w-5 h-5" />
            </div>
            <span>{t.emergency}</span>
          </button>
        </div>

        {/* Next Medicine Card */}
        {medicines.length > 0 && (
          <MedicineCard
            medicine={medicines[0]}
            language={language}
            onTakeConfirmed={() => {}}
          />
        )}

        {/* Text Input Fallback Bar / Toggle */}
        <div className="w-full max-w-sm mx-auto px-4 my-1">
          {showTypeInput ? (
            <div className="p-2 rounded-2xl liquid-glass border border-white/20 flex items-center gap-2">
              <input
                type="text"
                value={typedInput}
                onChange={(e) => setTypedInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && typedInput.trim()) {
                    submitQueryToAI(typedInput.trim());
                    setTypedInput('');
                  }
                }}
                placeholder={t.askPlaceholder}
                className="flex-1 bg-transparent px-3 py-2 text-white placeholder-slate-400 text-sm font-medium focus:outline-none"
              />
              <button
                onClick={() => {
                  if (typedInput.trim()) {
                    submitQueryToAI(typedInput.trim());
                    setTypedInput('');
                  }
                }}
                className="w-10 h-10 rounded-xl bg-sky-500 hover:bg-sky-400 text-white flex items-center justify-center tactile-button"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowTypeInput(false)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-white flex items-center justify-center"
                aria-label="Close keyboard input"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowTypeInput(true)}
              className="w-full py-2 text-center text-xs font-semibold text-slate-400 hover:text-sky-300 flex items-center justify-center gap-1.5 transition-all"
            >
              <Keyboard className="w-4 h-4" />
              <span>{t.typeInstead}</span>
            </button>
          )}
        </div>

        {/* Conversation Stream & Empty State */}
        <ChatStream
          messages={messages}
          language={language}
          onSelectSampleQuestion={(q) => submitQueryToAI(q)}
          onReplayAudio={handleReplayAudio}
          onStopAudio={handleStopAudio}
          isSpeaking={isSpeaking}
          currentlySpeakingText={currentlySpeakingText}
        />

        {/* Medical Safety Disclaimer at bottom of scroll */}
        <div className="w-full max-w-sm mx-auto px-4 mt-4 text-center">
          <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
            {t.medicalDisclaimer}
          </p>
        </div>
      </div>

      {/* Camera Inspection Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        language={language}
        onAnalyzeImage={handleAnalyzeImage}
        isAnalyzing={isAnalyzingImage}
      />

      {/* Emergency Dialing & Safeguard Modal */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        language={language}
        contacts={emergencyContacts}
      />

      {/* Pharmacy Call Bot Simulator */}
      <PharmacyCallModal
        isOpen={isPharmacyOpen}
        onClose={() => setIsPharmacyOpen(false)}
        language={language}
        medicineName={medicines[0]?.name || 'Metformin 500mg'}
      />

      {/* Reminders Modal */}
      <ReminderModal
        isOpen={isReminderOpen}
        onClose={() => {
          setIsReminderOpen(false);
          setPendingReminder(null);
        }}
        language={language}
        pendingReminder={pendingReminder}
        reminders={reminders}
        onConfirmPending={handleConfirmPendingReminder}
        onCancelPending={() => {
          setPendingReminder(null);
          setIsReminderOpen(false);
        }}
        onDeleteReminder={handleDeleteReminder}
      />

      {/* Settings & Accessibility Drawer */}
      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        language={language}
        onLanguageChange={handleLanguageChange}
        preferences={preferences}
        onUpdatePreferences={handleUpdatePreferences}
        onResetDemo={handleResetDemoData}
      />

      {/* Hackathon Judge Toolbar */}
      <DemoToolbar
        language={language}
        onTriggerDemoReminder={handleTriggerDemoReminder}
        onTriggerDemoEmergency={handleTriggerDemoEmergency}
        onTriggerDemoCamera={handleTriggerDemoCamera}
        onTriggerDemoPharmacy={handleTriggerDemoPharmacy}
        onResetDemoData={handleResetDemoData}
      />
    </main>
  );
}
