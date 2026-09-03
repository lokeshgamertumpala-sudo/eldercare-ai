import { Language } from '@/types';

class TextToSpeechService {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private voicesLoaded = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.loadVoices();
      };
    }
  }

  private loadVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    this.voices = window.speechSynthesis.getVoices();
    if (this.voices.length > 0) {
      this.voicesLoaded = true;
    }
  }

  public getVoiceForLanguage(lang: Language): SpeechSynthesisVoice | null {
    if (!this.voicesLoaded) {
      this.loadVoices();
    }

    const langCodeMap: Record<Language, string[]> = {
      te: ['te-IN', 'te', 'telugu'],
      hi: ['hi-IN', 'hi', 'hindi'],
      en: ['en-IN', 'en-US', 'en-GB', 'en'],
    };

    const targetPrefixes = langCodeMap[lang] || ['en'];

    // 1. Exact match or prefix match
    for (const prefix of targetPrefixes) {
      const match = this.voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith(prefix.toLowerCase()) ||
          v.name.toLowerCase().includes(prefix.toLowerCase())
      );
      if (match) return match;
    }

    // 2. Fallback to any Indian voice if available
    const indianVoice = this.voices.find(
      (v) => v.lang.includes('IN') || v.name.toLowerCase().includes('india')
    );
    if (indianVoice) return indianVoice;

    // 3. Fallback to default voice
    return this.voices.find((v) => v.default) || this.voices[0] || null;
  }

  public speak(
    text: string,
    lang: Language,
    rate: number = 0.9,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: string) => void
  ): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onError?.('Speech synthesis not supported on this browser.');
      return;
    }

    // Always cancel ongoing speech first (supports interruption)
    this.stop();

    if (!text.trim()) return;

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate; // 0.85 for elderly, 1.0 for normal
      utterance.pitch = 1.0;

      const voice = this.getVoiceForLanguage(lang);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        const langTags: Record<Language, string> = {
          te: 'te-IN',
          hi: 'hi-IN',
          en: 'en-US',
        };
        utterance.lang = langTags[lang] || 'en-US';
      }

      utterance.onstart = () => {
        onStart?.();
      };

      utterance.onend = () => {
        this.currentUtterance = null;
        onEnd?.();
      };

      utterance.onerror = (e) => {
        this.currentUtterance = null;
        // Don't report "interrupted" or "canceled" as error
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          onError?.(`TTS Error: ${e.error}`);
        }
        onEnd?.();
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      onError?.(`TTS Exception: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  public stop(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
    }
  }

  public isSpeaking(): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
    return window.speechSynthesis.speaking;
  }
}

export const ttsService = new TextToSpeechService();
