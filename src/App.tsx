import React, { useState, useEffect } from 'react';
import {
  AIRecommendation,
  FamilyMember,
  MedicalRecord,
  Medicine,
  PlatformMode,
  ScreenType,
  SymptomState,
} from './types';
import {
  INITIAL_CLINICS,
  INITIAL_FAMILY_MEMBERS,
  INITIAL_MEDICINES,
  INITIAL_RECORDS,
} from './data/mockData';
import { evaluateSymptoms } from './services/api';
import { useUserLocation } from './hooks/useUserLocation';
import { DeviceFrame } from './components/DeviceFrame';
import { BottomNav } from './components/BottomNav';
import { SplashScreen } from './components/screens/SplashScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { AskAIScreen } from './components/screens/AskAIScreen';
import { SymptomCheckerScreen } from './components/screens/SymptomCheckerScreen';
import { PrescriptionScannerScreen } from './components/screens/PrescriptionScannerScreen';
import { AIRecommendationScreen } from './components/screens/AIRecommendationScreen';
import { FamilyRecordsScreen } from './components/screens/FamilyRecordsScreen';
import { NearbyClinicsScreen } from './components/screens/NearbyClinicsScreen';
import { EmergencyHelpScreen } from './components/screens/EmergencyHelpScreen';
import { MedicineReminderScreen } from './components/screens/MedicineReminderScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { ShakeSOSModal } from './components/modals/ShakeSOSModal';
import { AddReminderModal } from './components/modals/AddReminderModal';
import { AddFamilyMemberModal } from './components/modals/AddFamilyMemberModal';
import { AddRecordModal } from './components/modals/AddRecordModal';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('splash');
  const [platform, setPlatform] = useState<PlatformMode>('android');
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('हिंदी');

  // Live User Location Hook
  const { location: userLocation, refreshLocation: onRefreshLocation } = useUserLocation();

  // Clean persistent states - No pre-fetched mock data!
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(() => {
    try {
      const saved = localStorage.getItem('sanjeevani_family_members');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [medicines, setMedicines] = useState<Medicine[]>(() => {
    try {
      const saved = localStorage.getItem('sanjeevani_medicines');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [records, setRecords] = useState<MedicalRecord[]>(() => {
    try {
      const saved = localStorage.getItem('sanjeevani_records');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [clinics, setClinics] = useState(INITIAL_CLINICS);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('sanjeevani_family_members', JSON.stringify(familyMembers));
  }, [familyMembers]);

  useEffect(() => {
    localStorage.setItem('sanjeevani_medicines', JSON.stringify(medicines));
  }, [medicines]);

  useEffect(() => {
    localStorage.setItem('sanjeevani_records', JSON.stringify(records));
  }, [records]);

  const [currentRecommendation, setCurrentRecommendation] =
    useState<AIRecommendation>({
      likelyCause: 'Viral Fever',
      description: 'Based on your reported symptoms of body pain and warmth.',
      recommendedAction:
        'Rest, drink plenty of fluids and take paracetamol for fever.',
      medicines: [
        {
          name: 'Tab. Paracetamol 650mg',
          frequency: '1-1-1 after food',
          purpose: 'Pain reliever / Fever reducer',
        },
      ],
      whenToSeeDoctor:
        'If fever lasts more than 3 days, or if you feel breathlessness or severe weakness.',
      redFlags: ['Chest pain', 'Breathlessness', 'Severe weakness'],
      disclaimer:
        'This is not a diagnosis. Please consult a doctor if symptoms persist.',
    });

  // Modal Dialog States
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
  const [isAddReminderOpen, setIsAddReminderOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isAddRecordOpen, setIsAddRecordOpen] = useState(false);
  const [activeRecordMember, setActiveRecordMember] = useState<{ id: string; name: string }>({
    id: '',
    name: '',
  });

  // Real Device Motion Accelerometer Shake Detection for Auto SOS Trigger
  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastZ = 0;
    let lastTime = 0;

    const handleDeviceMotion = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity || e.acceleration;
      if (!acc || acc.x === null || acc.y === null || acc.z === null) return;

      const now = Date.now();
      if (now - lastTime > 120) {
        const timeDiff = now - lastTime;
        lastTime = now;

        const deltaX = Math.abs(acc.x - lastX);
        const deltaY = Math.abs(acc.y - lastY);
        const deltaZ = Math.abs(acc.z - lastZ);

        // Shake speed calculation threshold
        const totalDelta = deltaX + deltaY + deltaZ;
        if (totalDelta > 20 || (deltaX > 10 && deltaY > 10)) {
          setIsSOSModalOpen(true);
        }

        lastX = acc.x;
        lastY = acc.y;
        lastZ = acc.z;
      }
    };

    if (typeof window !== 'undefined' && 'DeviceMotionEvent' in window) {
      window.addEventListener('devicemotion', handleDeviceMotion);
    }

    return () => {
      if (typeof window !== 'undefined' && 'DeviceMotionEvent' in window) {
        window.removeEventListener('devicemotion', handleDeviceMotion);
      }
    };
  }, []);

  // Toggle Medicine Taken Checklist
  const handleToggleTakeMedicine = (medId: string, slotIdx: number) => {
    setMedicines((prev) =>
      prev.map((med) => {
        if (med.id === medId) {
          const updatedSlots = [...med.timeSlots];
          updatedSlots[slotIdx] = {
            ...updatedSlots[slotIdx],
            taken: !updatedSlots[slotIdx].taken,
          };
          return { ...med, timeSlots: updatedSlots };
        }
        return med;
      })
    );
  };

  // Evaluate Symptoms & Navigate to Recommendation
  const handleProceedToRecommendation = async (symptomState: SymptomState) => {
    setActiveScreen('ai-recommendation');
    const rec = await evaluateSymptoms(symptomState, isOffline);
    setCurrentRecommendation(rec);
  };

  // Handlers for Adding & Deleting Data
  const handleAddMedicine = (newMed: Medicine) => {
    setMedicines((prev) => [newMed, ...prev]);
  };

  const handleAddFamilyMember = (newMember: FamilyMember, initialNote?: string) => {
    setFamilyMembers((prev) => [...prev, newMember]);
    if (initialNote) {
      const initialRecord: MedicalRecord = {
        id: 'rec-' + Date.now(),
        memberId: newMember.id,
        title: 'Health Profile Note',
        doctor: 'Self / Guardian',
        date: 'Today',
        type: 'Vitals',
        summary: initialNote,
      };
      setRecords((prev) => [initialRecord, ...prev]);
    }
  };

  const handleAddRecord = (newRecord: MedicalRecord) => {
    setRecords((prev) => [newRecord, ...prev]);
  };

  const handleDeleteMember = (memberId: string) => {
    setFamilyMembers((prev) => prev.filter((m) => m.id !== memberId));
    setRecords((prev) => prev.filter((r) => r.memberId !== memberId));
  };

  const handleDeleteRecord = (recordId: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== recordId));
  };

  const handleUpdateMemberAvatar = (memberId: string, avatar: string) => {
    setFamilyMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, avatar } : m))
    );
  };

  const handleRestoreDefaultData = () => {
    setFamilyMembers(INITIAL_FAMILY_MEMBERS);
    setMedicines(INITIAL_MEDICINES);
    setRecords(INITIAL_RECORDS);
  };

  return (
    <DeviceFrame
      activeScreen={activeScreen}
      onSelectScreen={setActiveScreen}
      platform={platform}
      onTogglePlatform={() =>
        setPlatform((p) => (p === 'android' ? 'ios' : 'android'))
      }
      isOffline={isOffline}
      onToggleOffline={() => setIsOffline((o) => !o)}
      onTriggerSOS={() => setIsSOSModalOpen(true)}
      selectedLanguage={selectedLanguage}
      onLanguageChange={setSelectedLanguage}
    >
      {/* Screen Router Views */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex-1 flex flex-col">
          {activeScreen === 'splash' && (
            <SplashScreen onGetStarted={() => setActiveScreen('home')} />
          )}

          {activeScreen === 'home' && (
            <HomeScreen
              userName={
                familyMembers[0]?.name ||
                (selectedLanguage === 'తెలుగు'
                  ? 'సభ్యుడు'
                  : selectedLanguage === 'हिंदी'
                  ? 'उपयोगकर्ता'
                  : 'User')
              }
              onNavigate={setActiveScreen}
              selectedLanguage={selectedLanguage}
              onSelectLanguage={setSelectedLanguage}
              userLocation={userLocation}
              onRefreshLocation={onRefreshLocation}
            />
          )}

          {activeScreen === 'ask-ai' && (
            <AskAIScreen
              onBack={() => setActiveScreen('home')}
              onNavigate={setActiveScreen}
              isOffline={isOffline}
              selectedLanguage={selectedLanguage}
              onSelectLanguage={setSelectedLanguage}
            />
          )}

          {activeScreen === 'symptom-checker' && (
            <SymptomCheckerScreen
              onBack={() => setActiveScreen('home')}
              onProceedToResult={handleProceedToRecommendation}
            />
          )}

          {activeScreen === 'prescription-scanner' && (
            <PrescriptionScannerScreen
              onBack={() => setActiveScreen('home')}
              onNavigate={setActiveScreen}
              isOffline={isOffline}
              selectedLanguage={selectedLanguage}
              onAddMedicinesFromScan={(newMeds) => {
                setMedicines((prev) => [...newMeds, ...prev]);
              }}
            />
          )}

          {activeScreen === 'ai-recommendation' && (
            <AIRecommendationScreen
              onBack={() => setActiveScreen('symptom-checker')}
              onNavigate={setActiveScreen}
              recommendation={currentRecommendation}
            />
          )}

          {activeScreen === 'family-records' && (
            <FamilyRecordsScreen
              onBack={() => setActiveScreen('home')}
              onNavigate={setActiveScreen}
              familyMembers={familyMembers}
              records={records}
              onOpenAddMemberModal={() => setIsAddMemberOpen(true)}
              onOpenAddRecordModal={(mId, mName) => {
                setActiveRecordMember({ id: mId, name: mName });
                setIsAddRecordOpen(true);
              }}
              onDeleteMember={handleDeleteMember}
              onDeleteRecord={handleDeleteRecord}
              onUpdateMemberAvatar={handleUpdateMemberAvatar}
              onRestoreDefaultData={handleRestoreDefaultData}
            />
          )}

          {activeScreen === 'nearby-clinics' && (
            <NearbyClinicsScreen
              onBack={() => setActiveScreen('home')}
              clinics={clinics}
              userLocation={userLocation}
              onRefreshLocation={onRefreshLocation}
              selectedLanguage={selectedLanguage}
            />
          )}

          {activeScreen === 'emergency-help' && (
            <EmergencyHelpScreen
              onBack={() => setActiveScreen('home')}
              onNavigate={setActiveScreen}
              onTriggerSOS={() => setIsSOSModalOpen(true)}
            />
          )}

          {activeScreen === 'medicine-reminder' && (
            <MedicineReminderScreen
              onBack={() => setActiveScreen('home')}
              medicines={medicines}
              onToggleTakeMedicine={handleToggleTakeMedicine}
              onOpenAddModal={() => setIsAddReminderOpen(true)}
            />
          )}

          {activeScreen === 'settings' && (
            <SettingsScreen
              onBack={() => setActiveScreen('home')}
              selectedLanguage={selectedLanguage}
              onSelectLanguage={setSelectedLanguage}
              isOffline={isOffline}
              onToggleOffline={() => setIsOffline((o) => !o)}
              onRestoreDefaultData={handleRestoreDefaultData}
            />
          )}
        </div>

        {/* Show Bottom Navbar on applicable screens */}
        {activeScreen !== 'splash' && (
          <BottomNav
            activeScreen={activeScreen}
            onSelectScreen={setActiveScreen}
            selectedLanguage={selectedLanguage}
          />
        )}
      </div>

      {/* Global Modals */}
      <ShakeSOSModal
        isOpen={isSOSModalOpen}
        onClose={() => setIsSOSModalOpen(false)}
        onConfirmSOS={() => {
          setIsSOSModalOpen(false);
          setActiveScreen('emergency-help');
        }}
        userLocation={userLocation}
      />

      <AddReminderModal
        isOpen={isAddReminderOpen}
        onClose={() => setIsAddReminderOpen(false)}
        onAddMedicine={handleAddMedicine}
      />

      <AddFamilyMemberModal
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        onAddMember={handleAddFamilyMember}
      />

      <AddRecordModal
        isOpen={isAddRecordOpen}
        onClose={() => setIsAddRecordOpen(false)}
        memberId={activeRecordMember.id}
        memberName={activeRecordMember.name}
        onAddRecord={handleAddRecord}
      />
    </DeviceFrame>
  );
}
