export type Language = 'en' | 'te' | 'hi';

export type AssistantState = 
  | 'idle'
  | 'activating'
  | 'listening'
  | 'transcribing'
  | 'thinking'
  | 'responding'
  | 'speaking'
  | 'error';

export type WarningLevel = 'none' | 'caution' | 'urgent';

export interface Medicine {
  id: string;
  name: string;
  nameTelugu: string;
  nameHindi: string;
  dosage: string;
  time: string;
  frequency: string;
  instruction: string;
  instructionTelugu: string;
  instructionHindi: string;
  purpose: string;
}

export interface Reminder {
  id: string;
  medicineName: string;
  time: string;
  frequency: string;
  active: boolean;
  createdAt: string;
}

export interface DetectedMedicine {
  name: string;
  dosage?: string;
  instruction?: string;
  confidence?: 'low' | 'medium' | 'high';
  uncertaintyNote?: string;
}

export interface ReminderAction {
  create: boolean;
  medicine?: string;
  time?: string;
  frequency?: string;
}

export interface AIResponse {
  language: Language;
  answer: string;
  warning?: string;
  warningLevel: WarningLevel;
  nextAction?: string;
  needsProfessionalHelp: boolean;
  emergencyAvailable: boolean;
  speechText: string;
  detectedMedicine?: DetectedMedicine;
  reminderAction?: ReminderAction;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  speechText?: string;
  timestamp: string;
  warning?: string;
  warningLevel?: WarningLevel;
  nextAction?: string;
  imageUrl?: string;
  isAnalyzing?: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
  isPrimary?: boolean;
  type: 'family' | 'doctor' | 'ambulance';
}

export type PharmacyCallStep = 
  | 'idle' 
  | 'dialing' 
  | 'connecting' 
  | 'speaking_bot' 
  | 'speaking_pharmacist' 
  | 'checking' 
  | 'completed' 
  | 'failed';

export interface PharmacyCallTranscriptItem {
  id: string;
  speaker: 'bot' | 'pharmacist' | 'system';
  text: string;
  time: string;
}

export interface UserPreferences {
  speechRate: number; // 0.8 (slow) to 1.0 (normal)
  fontSize: 'normal' | 'large' | 'extra-large';
  highContrast: boolean;
  reducedMotion: boolean;
}
