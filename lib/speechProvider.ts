import { Language } from '@/types';

export interface SpeechInputOptions {
  language: Language;
  onTranscript: (transcript: string, isFinal: boolean) => void;
  onError: (error: string) => void;
  onEnd?: () => void;
  onStart?: () => void;
}

export interface ISpeechInputProvider {
  name: string;
  isSupported(): boolean;
  start(options: SpeechInputOptions): void;
  stop(): void;
  setLanguage(lang: Language): void;
}

const LANG_MAP: Record<Language, string> = {
  en: 'en-IN',
  te: 'te-IN',
  hi: 'hi-IN',
};

// 1. Browser Web Speech API Provider
export class BrowserSpeechRecognitionProvider implements ISpeechInputProvider {
  name = 'Browser Web Speech API';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private recognition: any = null;
  private currentLanguage: Language = 'te';
  private isListening = false;

  isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    return !!(win.SpeechRecognition || win.webkitSpeechRecognition);
  }

  setLanguage(lang: Language): void {
    this.currentLanguage = lang;
    if (this.recognition) {
      this.recognition.lang = LANG_MAP[lang] || 'en-IN';
    }
  }

  start(options: SpeechInputOptions): void {
    if (!this.isSupported()) {
      options.onError('Browser speech recognition is not supported in this browser.');
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const win = window as any;
      const SpeechRecognitionConstructor = win.SpeechRecognition || win.webkitSpeechRecognition;
      this.recognition = new SpeechRecognitionConstructor();
      
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = LANG_MAP[options.language] || LANG_MAP[this.currentLanguage];
      this.recognition.maxAlternatives = 1;

      this.recognition.onstart = () => {
        this.isListening = true;
        options.onStart?.();
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcriptPiece = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPiece;
          } else {
            interimTranscript += transcriptPiece;
          }
        }

        const combined = finalTranscript || interimTranscript;
        if (combined.trim()) {
          options.onTranscript(combined, !!finalTranscript);
        }
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.recognition.onerror = (event: any) => {
        if (event.error === 'no-speech') {
          // ignore transient silence
          return;
        }
        if (event.error === 'not-allowed') {
          options.onError('Microphone permission was denied. Please allow microphone access.');
          return;
        }
        options.onError(`Speech recognition error: ${event.error}`);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        options.onEnd?.();
      };

      this.recognition.start();
    } catch (err) {
      this.isListening = false;
      options.onError(`Failed to start microphone: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  stop(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch {
        // ignore
      }
      this.isListening = false;
    }
  }
}

// 2. Fallback MediaRecorder / Mock Provider for unsupported browsers
export class FallbackSpeechProvider implements ISpeechInputProvider {
  name = 'Fallback Audio Provider';
  private isListening = false;

  isSupported(): boolean {
    return typeof window !== 'undefined' && !!navigator.mediaDevices?.getUserMedia;
  }

  setLanguage(): void {}

  start(options: SpeechInputOptions): void {
    this.isListening = true;
    options.onStart?.();
    options.onError('Speech recognition is not native in this browser. Please type your question or use Chrome/Edge on mobile.');
  }

  stop(): void {
    this.isListening = false;
  }
}

// Factory
export function getSpeechInputProvider(): ISpeechInputProvider {
  const browserProvider = new BrowserSpeechRecognitionProvider();
  if (browserProvider.isSupported()) {
    return browserProvider;
  }
  return new FallbackSpeechProvider();
}
