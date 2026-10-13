import React, { useState } from 'react';
import {
  ArrowLeft,
  Globe,
  Mic,
  WifiOff,
  RefreshCw,
  HelpCircle,
  Info,
  ChevronRight,
  Check,
} from 'lucide-react';
import footerArt from '../../assets/images/village_landscape_footer_1785328054843.jpg';
import { getTranslation } from '../../data/translations';

interface SettingsScreenProps {
  onBack: () => void;
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
  isOffline: boolean;
  onToggleOffline: () => void;
  onRestoreDefaultData?: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onBack,
  selectedLanguage,
  onSelectLanguage,
  isOffline,
  onToggleOffline,
  onRestoreDefaultData,
}) => {
  const t = getTranslation(selectedLanguage);
  const [showLangModal, setShowLangModal] = useState(false);

  const languages = [
    { name: 'हिंदी', label: 'Hindi (हिंदी)' },
    { name: 'English', label: 'English' },
    { name: 'తెలుగు', label: 'Telugu (తెలుగు)' },
  ];

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#FBF7EE] text-gray-800 animate-fadeIn">
      {/* Top Header */}
      <div>
        <div className="p-3 bg-white border-b border-[#E5DEC9] flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <button
            onClick={onBack}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-sm font-black text-gray-900">{t.settingsTitle}</h1>
          <div className="w-5" />
        </div>

        {/* Settings Menu Cards */}
        <div className="p-4 space-y-2.5">
          {/* Language Selector Card */}
          <div
            onClick={() => setShowLangModal(!showLangModal)}
            className="bg-white p-3.5 rounded-2xl border border-[#E5DEC9] shadow-2xs flex items-center justify-between cursor-pointer hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-[#2E6B4F] flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-gray-900 block">
                  {t.languageSetting}
                </span>
                <span className="text-[10px] text-[#2E6B4F] font-bold">
                  Active: {selectedLanguage}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-xl">
                {selectedLanguage}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Interactive Language Selector Dropdown List if toggled */}
          {showLangModal && (
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl space-y-1.5 animate-fadeIn">
              <p className="text-[11px] font-black text-[#2E6B4F] uppercase tracking-wider mb-1">
                Select Your App Language:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.name}
                    onClick={() => {
                      onSelectLanguage(lang.name);
                      setShowLangModal(false);
                    }}
                    className={`p-2 rounded-xl text-xs font-bold flex items-center justify-between border transition ${
                      selectedLanguage === lang.name
                        ? 'bg-[#2E6B4F] text-white border-[#2E6B4F] shadow-xs'
                        : 'bg-white text-gray-800 border-emerald-100 hover:bg-emerald-100/50'
                    }`}
                  >
                    <span>{lang.label}</span>
                    {selectedLanguage === lang.name && (
                      <Check className="w-3.5 h-3.5 text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Voice & Speech */}
          <div className="bg-white p-3.5 rounded-2xl border border-[#E5DEC9] shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Mic className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-gray-900">
                {t.voiceSpeech}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-gray-600">
                {selectedLanguage} (Speech)
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Offline Mode */}
          <div
            onClick={onToggleOffline}
            className="bg-white p-3.5 rounded-2xl border border-[#E5DEC9] shadow-2xs flex items-center justify-between cursor-pointer hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center">
                <WifiOff className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-gray-900">
                {t.offlineMode}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                {isOffline ? 'Active' : 'Sync Ready'}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Data Sync */}
          <div className="bg-white p-3.5 rounded-2xl border border-[#E5DEC9] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-[#E2F0E8] text-[#2E6B4F] flex items-center justify-center">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-900 block">{t.dataSync}</span>
                  <span className="text-[10px] text-gray-500 font-semibold">Local Storage & Cloud Sync</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Active
              </span>
            </div>

            {onRestoreDefaultData && (
              <button
                onClick={onRestoreDefaultData}
                className="w-full mt-2 py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-[#2E6B4F] border border-emerald-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-98"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restore Sample Family & Health Records</span>
              </button>
            )}
          </div>

          {/* Help & Support */}
          <div className="bg-white p-3.5 rounded-2xl border border-[#E5DEC9] shadow-2xs flex items-center justify-between hover:bg-gray-50 cursor-pointer transition">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-gray-900">
                {t.helpSupport}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          {/* About Sanjeevani AI */}
          <div className="bg-white p-3.5 rounded-2xl border border-[#E5DEC9] shadow-2xs flex items-center justify-between hover:bg-gray-50 cursor-pointer transition">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center">
                <Info className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-gray-900">
                {t.aboutApp}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Village Landscape Graphic Footer */}
      <div className="mt-4 pt-2">
        <img
          src={footerArt}
          alt="Rural Village Footer Illustration"
          className="w-full h-28 object-cover opacity-90"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};
