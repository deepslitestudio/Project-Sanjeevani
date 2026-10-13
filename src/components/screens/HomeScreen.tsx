import React from 'react';
import {
  Bell,
  ChevronDown,
  Sun,
  Wind,
  Droplets,
  Stethoscope,
  Mic,
  Camera,
  Pill,
  Heart,
  Baby,
  Cross,
  MapPin,
  ChevronRight,
  RefreshCw,
  Navigation,
} from 'lucide-react';
import { ScreenType } from '../../types';
import heroArt from '../../assets/images/home_hero_doctor_family_1785328038915.jpg';
import { getTranslation } from '../../data/translations';
import { UserLocation } from '../../hooks/useUserLocation';

interface HomeScreenProps {
  userName: string;
  onNavigate: (screen: ScreenType) => void;
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
  userLocation: UserLocation;
  onRefreshLocation: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userName = 'Sita Devi',
  onNavigate,
  selectedLanguage = 'हिंदी',
  onSelectLanguage,
  userLocation,
  onRefreshLocation,
}) => {
  const t = getTranslation(selectedLanguage);

  const quickActions = [
    {
      id: 'symptom-checker' as ScreenType,
      label: t.healthCheck,
      icon: Stethoscope,
      color: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'ask-ai' as ScreenType,
      label: t.speakToAI,
      icon: Mic,
      color: 'bg-teal-100 text-teal-800',
    },
    {
      id: 'prescription-scanner' as ScreenType,
      label: t.scanPrescription,
      icon: Camera,
      color: 'bg-green-100 text-green-800',
    },
    {
      id: 'medicine-reminder' as ScreenType,
      label: t.medicines,
      icon: Pill,
      color: 'bg-amber-100 text-amber-800',
    },
    {
      id: 'symptom-checker' as ScreenType,
      label: t.pregnancyCare,
      icon: Heart,
      color: 'bg-rose-100 text-rose-800',
    },
    {
      id: 'symptom-checker' as ScreenType,
      label: t.childHealth,
      icon: Baby,
      color: 'bg-amber-100 text-amber-900',
    },
    {
      id: 'emergency-help' as ScreenType,
      label: t.firstAidGuide,
      icon: Cross,
      color: 'bg-[#2E6B4F]/15 text-[#2E6B4F]',
    },
    {
      id: 'nearby-clinics' as ScreenType,
      label: t.nearbyClinics,
      icon: MapPin,
      color: 'bg-emerald-100 text-emerald-800',
    },
  ];

  return (
    <div className="flex-1 flex flex-col p-4 bg-[#FBF7EE] text-gray-800 space-y-3.5 animate-fadeIn">
      {/* Top Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-black text-gray-900 flex items-center gap-1">
            {t.greeting}, {userName} 👋
          </h1>
          <p className="text-xs text-gray-600 font-medium">
            {t.howAreYou}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Notification Button */}
          <button className="relative p-2 rounded-full bg-white border border-[#E5DEC9] text-gray-700 shadow-xs hover:bg-gray-50">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500" />
          </button>

          {/* Language Switcher Dropdown */}
          <div className="relative">
            <select
              value={selectedLanguage}
              onChange={(e) => onSelectLanguage(e.target.value)}
              className="appearance-none bg-[#2E6B4F] text-white border border-[#23533E] text-xs font-black rounded-xl px-3 py-1.5 pr-7 shadow-xs focus:outline-none cursor-pointer"
            >
              <option value="हिंदी" className="bg-white text-gray-900">हिंदी (Hindi)</option>
              <option value="English" className="bg-white text-gray-900">English</option>
              <option value="తెలుగు" className="bg-white text-gray-900">తెలుగు (Telugu)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-white absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Live GPS Exact Location Bar */}
      <div className="bg-white border border-[#E5DEC9] p-2.5 rounded-2xl shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-7 h-7 rounded-full bg-emerald-100 text-[#2E6B4F] flex items-center justify-center shrink-0">
            <Navigation className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <div className="truncate">
            <div className="text-[10px] uppercase tracking-wider font-extrabold text-gray-400">
              {t.currentLocationLabel}
            </div>
            <div className="text-xs font-bold text-gray-900 truncate flex items-center gap-1">
              <span>{userLocation.placeName}</span>
              {userLocation.latitude && (
                <span className="text-[10px] text-gray-500 font-normal">
                  ({userLocation.latitude.toFixed(2)}°, {userLocation.longitude?.toFixed(2)}°)
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={onRefreshLocation}
          className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1 transition"
          title={t.getExactLocationBtn}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${userLocation.isLoading ? 'animate-spin text-[#2E6B4F]' : ''}`} />
          <span className="hidden sm:inline text-[10px]">GPS</span>
        </button>
      </div>

      {/* Hero Banner Illustration Card */}
      <div className="rounded-3xl overflow-hidden shadow-2xs border border-[#E5DEC9] bg-white">
        <img
          src={heroArt}
          alt="Sanjeevani AI Rural Family Healthcare"
          className="w-full h-32 object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Today's Health Snapshot */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider">
            {t.healthSnapshot}
          </h2>
          <button className="text-xs font-bold text-[#2E6B4F] hover:underline">
            {t.seeAll}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Weather Card */}
          <div className="bg-white p-2.5 rounded-2xl border border-[#E5DEC9] shadow-2xs flex flex-col items-center text-center">
            <span className="text-[10px] text-gray-500 font-semibold mb-1">
              {t.weather}
            </span>
            <div className="flex items-center gap-1 text-amber-500 my-0.5">
              <Sun className="w-4 h-4 fill-amber-400" />
              <span className="text-xs font-black text-gray-900">32°C</span>
            </div>
            <span className="text-[10px] text-gray-600">{t.sunny}</span>
          </div>

          {/* Air Quality Card */}
          <div className="bg-white p-2.5 rounded-2xl border border-[#E5DEC9] shadow-2xs flex flex-col items-center text-center">
            <span className="text-[10px] text-gray-500 font-semibold mb-1">
              {t.airQuality}
            </span>
            <div className="flex items-center gap-1 text-emerald-600 my-0.5">
              <Wind className="w-4 h-4" />
              <span className="text-xs font-black text-gray-900">{t.good}</span>
            </div>
            <span className="text-[10px] text-gray-600">AQI 42</span>
          </div>

          {/* Water Quality Card */}
          <div className="bg-white p-2.5 rounded-2xl border border-[#E5DEC9] shadow-2xs flex flex-col items-center text-center">
            <span className="text-[10px] text-gray-500 font-semibold mb-1">
              {t.waterQuality}
            </span>
            <div className="flex items-center gap-1 text-sky-600 my-0.5">
              <Droplets className="w-4 h-4 fill-sky-200" />
              <span className="text-xs font-black text-gray-900">{t.safe}</span>
            </div>
            <span className="text-[10px] text-gray-600">Pure</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h2 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider mb-2">
          {t.quickActions}
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <button
                key={idx}
                onClick={() => onNavigate(action.id)}
                className="bg-white p-2.5 rounded-2xl border border-[#E5DEC9] shadow-2xs hover:shadow-md transition flex flex-col items-center text-center gap-1.5 active:scale-95 min-h-[82px] justify-center"
              >
                <div
                  className={`w-9 h-9 rounded-2xl ${action.color} flex items-center justify-center shadow-inner`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-gray-800 leading-tight">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Emergency Help Banner */}
      <button
        onClick={() => onNavigate('emergency-help')}
        className="w-full bg-[#EAF2EC] border border-[#B8D7C4] p-3.5 rounded-2xl flex items-center justify-between shadow-xs hover:bg-[#E2EFE5] transition text-left active:scale-98"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#2E6B4F] text-white flex items-center justify-center shrink-0">
            <span className="text-lg font-black">+</span>
          </div>
          <div>
            <h3 className="text-xs font-black text-[#2E6B4F] flex items-center gap-1">
              {t.needHelpTitle}
            </h3>
            <p className="text-[11px] font-semibold text-gray-600">
              {t.needHelpSub}
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-[#2E6B4F]" />
      </button>
    </div>
  );
};
