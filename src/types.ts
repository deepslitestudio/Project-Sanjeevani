export type ScreenType =
  | 'splash'
  | 'home'
  | 'ask-ai'
  | 'symptom-checker'
  | 'prescription-scanner'
  | 'ai-recommendation'
  | 'family-records'
  | 'nearby-clinics'
  | 'emergency-help'
  | 'medicine-reminder'
  | 'settings';

export type PlatformMode = 'android' | 'ios';

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  avatar: string;
  age: number;
  gender: string;
  bloodGroup: string;
}

export interface MedicalRecord {
  id: string;
  memberId: string;
  title: string;
  doctor: string;
  date: string;
  type: 'Prescription' | 'Lab Report' | 'Vaccination' | 'Vitals';
  summary: string;
  fileUrl?: string;
}

export interface Medicine {
  id: string;
  name: string;
  category: string;
  timing: string; // e.g. "1-1-1"
  instructions: string; // e.g. "after food"
  timeSlots: { time: string; taken: boolean; label: string }[];
  duration: string;
  precaution?: string;
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  distance: string;
  status: string;
  phone: string;
  type: 'PHC' | 'Hospital' | 'Pharmacy' | 'Blood Bank';
  lat: number;
  lng: number;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  source?: 'Google Maps' | 'OpenStreetMap' | 'Anchored';
}

export interface SymptomState {
  selectedBodyPart: string;
  symptoms: string[];
  duration: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  additionalNotes: string;
}

export interface AIRecommendation {
  likelyCause: string;
  description: string;
  recommendedAction: string;
  medicines: { name: string; frequency: string; purpose: string }[];
  whenToSeeDoctor: string;
  redFlags: string[];
  disclaimer: string;
}

export type LanguageCode = 'hi' | 'en' | 'te' | 'ta' | 'kn' | 'mr' | 'bn' | 'gu';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
}
