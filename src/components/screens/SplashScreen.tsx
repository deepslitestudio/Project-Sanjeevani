import React from 'react';
import { Shield, MessageCircle, WifiOff, ArrowRight } from 'lucide-react';
import splashArt from '../../assets/images/sanjeevani_splash_art_1785328020468.jpg';

interface SplashScreenProps {
  onGetStarted: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="flex-1 flex flex-col justify-between p-5 bg-[#FBF7EE] text-gray-800 animate-fadeIn">
      {/* Top Header Logo */}
      <div className="flex flex-col items-center pt-2 text-center">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-9 h-9 rounded-xl bg-[#2E6B4F] flex items-center justify-center text-white shadow-md">
            <span className="text-xl font-black">+</span>
          </div>
          <h1 className="text-2xl font-black text-[#2E6B4F] tracking-tight">
            Sanjeevani AI
          </h1>
        </div>
        <p className="text-xs font-semibold text-gray-600 tracking-wide">
          Aapka Swasthya, Hamari Prathmikta
        </p>
      </div>

      {/* Main Illustration Artwork */}
      <div className="my-4 px-2 flex justify-center">
        <div className="relative rounded-3xl overflow-hidden shadow-md border-2 border-[#E5DEC9]">
          <img
            src={splashArt}
            alt="Sanjeevani AI Doctor and Villager"
            className="w-full h-52 object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Hero Value Props */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900 text-center leading-snug">
          AI Powered Healthcare Companion for Every Indian
        </h2>

        <div className="space-y-2.5 px-2">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F0EAD8]/60 border border-[#E5DEC9]">
            <div className="w-8 h-8 rounded-full bg-[#2E6B4F]/10 text-[#2E6B4F] flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-gray-800">
              Understand your health in simple words
            </p>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F0EAD8]/60 border border-[#E5DEC9]">
            <div className="w-8 h-8 rounded-full bg-[#2E6B4F]/10 text-[#2E6B4F] flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-gray-800">
              Available in your language
            </p>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F0EAD8]/60 border border-[#E5DEC9]">
            <div className="w-8 h-8 rounded-full bg-[#2E6B4F]/10 text-[#2E6B4F] flex items-center justify-center shrink-0">
              <WifiOff className="w-4 h-4" />
            </div>
            <p className="text-xs font-semibold text-gray-800">
              Works offline in remote areas
            </p>
          </div>
        </div>
      </div>

      {/* Get Started Button */}
      <div className="pt-4 pb-2">
        <button
          onClick={onGetStarted}
          className="w-full py-3.5 bg-[#2E6B4F] hover:bg-[#23533E] text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 text-sm transition transform active:scale-98"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
