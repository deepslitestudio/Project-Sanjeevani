import React from 'react';
import {
  ArrowLeft,
  PhoneCall,
  Ambulance,
  Building2,
  UserCheck,
  Cross,
  AlertOctagon,
} from 'lucide-react';
import { ScreenType } from '../../types';

interface EmergencyHelpScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenType) => void;
  onTriggerSOS: () => void;
}

export const EmergencyHelpScreen: React.FC<EmergencyHelpScreenProps> = ({
  onBack,
  onNavigate,
  onTriggerSOS,
}) => {
  const handleCall112 = () => {
    window.location.href = 'tel:112';
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FBF7EE] text-gray-800 animate-fadeIn">
      {/* Top Header */}
      <div className="p-3 bg-white border-b border-[#E5DEC9] flex items-center justify-between sticky top-0 z-20 shadow-xs">
        <button
          onClick={onBack}
          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-700"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-black text-gray-900">Emergency Help</h1>
        <div className="w-5" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Giant 112 Tap to Call Card (Matching Wireframe 9) */}
        <div className="bg-rose-50 border-2 border-rose-200 rounded-3xl p-6 text-center shadow-xs flex flex-col items-center space-y-3">
          <span className="text-xs font-black text-rose-900 uppercase tracking-widest">
            Emergency
          </span>

          <div className="text-5xl font-black text-rose-950 tracking-tighter">
            112
          </div>

          <button
            onClick={handleCall112}
            className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg transition transform active:scale-90 animate-pulse my-1"
          >
            <PhoneCall className="w-8 h-8 fill-current" />
          </button>

          <span className="text-xs font-bold text-rose-800">Tap to call</span>
        </div>

        {/* Quick Help Options (4 Tile Grid matching Wireframe) */}
        <div>
          <h2 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider mb-2">
            Quick Help Options
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {/* Ambulance */}
            <button
              onClick={handleCall112}
              className="bg-white p-3.5 rounded-2xl border border-[#E5DEC9] shadow-2xs hover:bg-gray-50 flex items-center gap-3 text-left transition active:scale-95"
            >
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <Ambulance className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-900">Ambulance</h3>
                <p className="text-[10px] text-rose-700 font-extrabold">
                  Call now
                </p>
              </div>
            </button>

            {/* Nearest Hospital */}
            <button
              onClick={() => onNavigate('nearby-clinics')}
              className="bg-white p-3.5 rounded-2xl border border-[#E5DEC9] shadow-2xs hover:bg-gray-50 flex items-center gap-3 text-left transition active:scale-95"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#E2F0E8] text-[#2E6B4F] flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-900">
                  Nearest Hospital
                </h3>
                <p className="text-[10px] text-gray-500 font-medium">
                  Find hospitals
                </p>
              </div>
            </button>

            {/* Call ASHA Worker */}
            <button
              onClick={() => (window.location.href = 'tel:+919876543210')}
              className="bg-white p-3.5 rounded-2xl border border-[#E5DEC9] shadow-2xs hover:bg-gray-50 flex items-center gap-3 text-left transition active:scale-95"
            >
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-900">Call ASHA</h3>
                <p className="text-[10px] text-gray-500 font-medium">Worker</p>
              </div>
            </button>

            {/* First Aid Guides */}
            <button
              onClick={() => onNavigate('symptom-checker')}
              className="bg-white p-3.5 rounded-2xl border border-[#E5DEC9] shadow-2xs hover:bg-gray-50 flex items-center gap-3 text-left transition active:scale-95"
            >
              <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                <Cross className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-900">First Aid</h3>
                <p className="text-[10px] text-gray-500 font-medium">Guides</p>
              </div>
            </button>
          </div>
        </div>

        {/* Shake-to-SOS Trigger Callout */}
        <div className="bg-amber-50 p-4 rounded-3xl border border-amber-200 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-amber-950">
                Shake Phone for SOS
              </h3>
              <p className="text-[10px] font-medium text-amber-800">
                In danger? Shake your device 3 times
              </p>
            </div>
          </div>

          <button
            onClick={onTriggerSOS}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-xs font-bold transition shadow-xs"
          >
            Test Shake
          </button>
        </div>
      </div>
    </div>
  );
};
