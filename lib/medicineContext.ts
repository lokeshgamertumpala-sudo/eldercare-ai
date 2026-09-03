import { Medicine, EmergencyContact, Reminder } from '@/types';

export interface PatientProfile {
  name: string;
  age: number;
  gender: string;
  defaultLanguage: 'te' | 'hi' | 'en';
  primaryCondition: string;
}

export const DEFAULT_PATIENT_PROFILE: PatientProfile = {
  name: 'Ammamma (Grandmother)',
  age: 72,
  gender: 'Female',
  defaultLanguage: 'te',
  primaryCondition: 'Type 2 Diabetes & Mild Hypertension',
};

export const DEFAULT_MEDICINES: Medicine[] = [
  {
    id: 'med-1',
    name: 'Metformin 500mg',
    nameTelugu: 'మెట్ఫార్మిన్ 500mg',
    nameHindi: 'मेटफॉर्मिन 500mg',
    dosage: '1 tablet (1 మాత్ర)',
    time: '08:00 AM',
    frequency: 'Daily (ప్రతిరోజూ)',
    instruction: 'Take after breakfast with water. Helps maintain healthy blood sugar.',
    instructionTelugu: 'ఉదయం టిఫిన్ తిన్న తర్వాత మంచినీళ్లతో వేసుకోవాలి. షుగర్ నియంత్రణకు సహాయపడుతుంది.',
    instructionHindi: 'नाश्ते के बाद पानी के साथ एक गोली लें। यह शुगर को नियंत्रित रखने में मदद करता है।',
    purpose: 'Blood sugar control / మధుమేహం నియంత్రణ / शुगर नियंत्रण',
  },
  {
    id: 'med-2',
    name: 'Amlodipine 5mg',
    nameTelugu: 'ఆమ్లోడిపైన్ 5mg',
    nameHindi: 'एम्लोडिपाइन 5mg',
    dosage: '1 tablet (1 మాత్ర)',
    time: '08:00 PM',
    frequency: 'Daily (ప్రతిరోజూ)',
    instruction: 'Take after dinner before sleep. Helps manage blood pressure.',
    instructionTelugu: 'రాత్రి భోజనం తర్వాత పడుకునే ముందు వేసుకోవాలి. రక్తపోటు నియంత్రణకు సహాయపడుతుంది.',
    instructionHindi: 'रात के खाने के बाद सोने से पहले लें। यह रक्तचाप को नियंत्रित रखता है।',
    purpose: 'Blood pressure / రక్తపోటు (BP) / ब्लड प्रेशर',
  },
];

export const DEFAULT_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'contact-1',
    name: 'Rajesh (కుమారుడు / Son)',
    relation: 'Son (కుమారుడు)',
    phone: '+91 98765 43210',
    isPrimary: true,
    type: 'family',
  },
  {
    id: 'contact-2',
    name: 'Dr. K. Sharma',
    relation: 'Family Physician (ఫ్యామిలీ డాక్టర్)',
    phone: '+91 98480 12345',
    type: 'doctor',
  },
  {
    id: 'contact-3',
    name: 'Emergency Medical Ambulance (108 / 112)',
    relation: 'National Emergency Helpline',
    phone: '108',
    type: 'ambulance',
  },
];

export const DEFAULT_REMINDERS: Reminder[] = [
  {
    id: 'rem-1',
    medicineName: 'Metformin 500mg',
    time: '08:00 AM',
    frequency: 'Daily',
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rem-2',
    medicineName: 'Amlodipine 5mg',
    time: '08:00 PM',
    frequency: 'Daily',
    active: true,
    createdAt: new Date().toISOString(),
  },
];

const STORAGE_KEYS = {
  PROFILE: 'eldercare_patient_profile',
  MEDICINES: 'eldercare_medicines',
  CONTACTS: 'eldercare_emergency_contacts',
  REMINDERS: 'eldercare_reminders',
  LANGUAGE: 'eldercare_selected_language',
};

export function getStoredMedicines(): Medicine[] {
  if (typeof window === 'undefined') return DEFAULT_MEDICINES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MEDICINES);
    if (!raw) return DEFAULT_MEDICINES;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_MEDICINES;
  }
}

export function saveMedicines(meds: Medicine[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.MEDICINES, JSON.stringify(meds));
}

export function getStoredEmergencyContacts(): EmergencyContact[] {
  if (typeof window === 'undefined') return DEFAULT_EMERGENCY_CONTACTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONTACTS);
    if (!raw) return DEFAULT_EMERGENCY_CONTACTS;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_EMERGENCY_CONTACTS;
  }
}

export function getStoredReminders(): Reminder[] {
  if (typeof window === 'undefined') return DEFAULT_REMINDERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REMINDERS);
    if (!raw) return DEFAULT_REMINDERS;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_REMINDERS;
  }
}

export function saveReminders(reminders: Reminder[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
}

export function resetDemoData(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.MEDICINES, JSON.stringify(DEFAULT_MEDICINES));
  localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(DEFAULT_EMERGENCY_CONTACTS));
  localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(DEFAULT_REMINDERS));
  localStorage.setItem(STORAGE_KEYS.LANGUAGE, 'te');
}
