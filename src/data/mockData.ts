import { Clinic, FamilyMember, Language, MedicalRecord, Medicine } from '../types';
import {
  GOVT_CARTOON_CITIZEN,
  GOVT_CARTOON_FEMALE,
  GOVT_CARTOON_MALE,
  GOVT_CARTOON_SENIOR,
  GOVT_CARTOON_CHILD,
} from '../utils/govtHealthAvatars';

export const LANGUAGES: Language[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
];

export const INITIAL_FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: 'f1',
    name: 'Sita Devi',
    relation: 'You',
    avatar: GOVT_CARTOON_FEMALE,
    age: 45,
    gender: 'Female',
    bloodGroup: 'O+',
  },
  {
    id: 'f2',
    name: 'Ram Prasad',
    relation: 'Father',
    avatar: GOVT_CARTOON_SENIOR,
    age: 68,
    gender: 'Male',
    bloodGroup: 'B+',
  },
  {
    id: 'f3',
    name: 'Gudiya',
    relation: 'Daughter',
    avatar: GOVT_CARTOON_CHILD,
    age: 12,
    gender: 'Female',
    bloodGroup: 'O+',
  },
  {
    id: 'f4',
    name: 'Asha Devi',
    relation: 'Mother',
    avatar: GOVT_CARTOON_SENIOR,
    age: 65,
    gender: 'Female',
    bloodGroup: 'A+',
  },
];

export const INITIAL_MEDICINES: Medicine[] = [
  {
    id: 'm1',
    name: 'Tab. Paracetamol 650mg',
    category: 'Pain reliever / Fever reducer',
    timing: '1-1-1',
    instructions: '1-1-1 after food',
    timeSlots: [
      { time: '08:00 AM', taken: true, label: 'Morning' },
      { time: '02:00 PM', taken: true, label: 'Afternoon' },
      { time: '08:00 PM', taken: false, label: 'Night' },
    ],
    duration: '3 Days',
    precaution: 'Do not take on empty stomach',
  },
  {
    id: 'm2',
    name: 'Cap. Amoxicillin 500mg',
    category: 'Antibiotic',
    timing: '1-1-1',
    instructions: '1-1-1 after food',
    timeSlots: [
      { time: '08:00 AM', taken: true, label: 'Morning' },
      { time: '02:00 PM', taken: true, label: 'Afternoon' },
      { time: '08:00 PM', taken: false, label: 'Night' },
    ],
    duration: '5 Days',
    precaution: 'Complete full course',
  },
];

export const INITIAL_CLINICS: Clinic[] = [
  {
    id: 'c1',
    name: 'Primary Health Center',
    address: 'Kalyanpur, Ward 4',
    distance: '1.2 km away',
    status: 'Open 24x7',
    phone: '+91 98765 43210',
    type: 'PHC',
    lat: 20.5937,
    lng: 78.9629,
  },
  {
    id: 'c2',
    name: 'Community Health Center',
    address: 'Rampur Main Road',
    distance: '3.4 km away',
    status: 'Open 24x7',
    phone: '+91 98765 11223',
    type: 'Hospital',
    lat: 20.601,
    lng: 78.97,
  },
  {
    id: 'c3',
    name: 'Sanjeevani Jan Aushadhi Pharmacy',
    address: 'Kalyanpur Market',
    distance: '0.8 km away',
    status: 'Open till 10 PM',
    phone: '+91 98765 99887',
    type: 'Pharmacy',
    lat: 20.59,
    lng: 78.96,
  },
  {
    id: 'c4',
    name: 'District Red Cross Blood Bank',
    address: 'Civil Hospital Complex',
    distance: '8.5 km away',
    status: 'Open 24x7',
    phone: '+91 98765 44332',
    type: 'Blood Bank',
    lat: 20.62,
    lng: 78.99,
  },
];

export const INITIAL_RECORDS: MedicalRecord[] = [
  {
    id: 'r1',
    memberId: 'f1',
    title: 'Seasonal Fever Consultation',
    doctor: 'Dr. R. Kumar',
    date: 'Yesterday, 10:30 AM',
    type: 'Prescription',
    summary: 'Prescribed Paracetamol & Amoxicillin for mild viral infection.',
  },
  {
    id: 'r2',
    memberId: 'f1',
    title: 'Routine Health Checkup',
    doctor: 'ANM Rekha Rani',
    date: '15 Jun 2026',
    type: 'Vitals',
    summary: 'BP: 120/80 mmHg, Pulse: 72 bpm, Sugar: 98 mg/dL.',
  },
  {
    id: 'r3',
    memberId: 'f2',
    title: 'Hypertension Management',
    doctor: 'Dr. S. Sharma',
    date: '02 Jun 2026',
    type: 'Prescription',
    summary: 'Tab Amlodipine 5mg once daily at morning.',
  },
  {
    id: 'r4',
    memberId: 'f3',
    title: 'Child Immunization Booster',
    doctor: 'PHC Kalyanpur',
    date: '10 May 2026',
    type: 'Vaccination',
    summary: 'Td Booster vaccine administered.',
  },
];
