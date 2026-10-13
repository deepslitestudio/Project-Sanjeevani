import React from 'react';
import { Home, HeartPulse, FileText, Bot, Users } from 'lucide-react';
import { ScreenType } from '../types';
import { getTranslation } from '../data/translations';

interface BottomNavProps {
  activeScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  selectedLanguage?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeScreen,
  onSelectScreen,
  selectedLanguage = 'हिंदी',
}) => {
  const t = getTranslation(selectedLanguage);

  const tabs = [
    { id: 'home' as ScreenType, label: t.navHome, icon: Home },
    { id: 'symptom-checker' as ScreenType, label: t.navSymptom, icon: HeartPulse },
    { id: 'family-records' as ScreenType, label: t.navRecords, icon: FileText },
    { id: 'ask-ai' as ScreenType, label: t.navAskAI, icon: Bot },
    { id: 'nearby-clinics' as ScreenType, label: t.navClinics, icon: Users },
  ];

  return (
    <nav className="sticky bottom-0 left-0 right-0 bg-[#FFFDF7] border-t border-[#E8E2D2] px-1 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] flex items-center justify-around z-30 shadow-lg select-none">
      {tabs.map((tab, idx) => {
        const Icon = tab.icon;
        const isActive = activeScreen === tab.id;

        return (
          <button
            key={idx + tab.id}
            onClick={() => onSelectScreen(tab.id)}
            className="flex-1 flex flex-col items-center justify-center py-1 px-1 transition group active:scale-95 touch-manipulation min-h-[52px]"
          >
            {/* Android Material 3 Active Indicator Pill */}
            <div
              className={`px-4 py-1 rounded-full transition-all duration-200 flex items-center justify-center ${
                isActive
                  ? 'bg-[#2E6B4F] text-white shadow-xs'
                  : 'text-gray-500 group-hover:text-gray-800'
              }`}
            >
              <Icon className="w-5 h-5 transition-transform duration-200" />
            </div>

            {/* Label below icon */}
            <span
              className={`text-[10px] mt-0.5 tracking-tight transition-colors duration-150 ${
                isActive
                  ? 'font-black text-[#2E6B4F]'
                  : 'font-semibold text-gray-500'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
