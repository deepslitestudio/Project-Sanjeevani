import React from 'react';
import {
  Wifi,
  WifiOff,
  AlertTriangle,
  HeartPulse,
} from 'lucide-react';
import { PlatformMode, ScreenType } from '../types';

interface DeviceFrameProps {
  children: React.ReactNode;
  activeScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  platform?: PlatformMode;
  onTogglePlatform?: () => void;
  isOffline: boolean;
  onToggleOffline: () => void;
  onTriggerSOS: () => void;
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
}

/**
 * AndroidMobileShell (formerly DeviceFrame)
 * Pure Android Mobile Application Layout - edge-to-edge on mobile devices,
 * no simulated phone chassis, no fake notches, no fake status bar,
 * and no fake navigation buttons.
 */
export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  activeScreen,
  onSelectScreen,
  isOffline,
  onToggleOffline,
  onTriggerSOS,
}) => {
  return (
    <div className="w-full min-h-screen min-h-[100dvh] bg-[#FBF7EE] sm:bg-stone-200/70 flex justify-center items-stretch text-gray-800 font-sans antialiased">
      {/* Android Native-Style Mobile Container */}
      <div className="w-full sm:max-w-[430px] min-h-screen min-h-[100dvh] bg-[#FBF7EE] sm:shadow-2xl flex flex-col relative sm:border-x sm:border-[#DDD6C5]">
        {/* Android Top App Bar (shown on all screens except initial splash) */}
        {activeScreen !== 'splash' && (
          <header className="w-full bg-[#2E6B4F] text-white px-3.5 py-2.5 flex items-center justify-between sticky top-0 z-40 shadow-xs pt-[max(0.6rem,env(safe-area-inset-top))]">
            {/* Sanjeevani Logo & Title */}
            <div
              onClick={() => onSelectScreen('home')}
              className="flex items-center gap-2 cursor-pointer active:opacity-85 transition select-none"
            >
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-white shadow-xs">
                <HeartPulse className="w-4 h-4 text-emerald-100" />
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black tracking-tight text-white">संजीवनी AI</span>
                  <span className="text-[10px] text-emerald-200 font-medium">Sanjeevani</span>
                </div>
                <p className="text-[9px] text-emerald-200/80 font-medium -mt-0.5">
                  Rural Health Companion
                </p>
              </div>
            </div>

            {/* Top Android Actions: Offline Mode Toggle + Emergency SOS */}
            <div className="flex items-center gap-2">
              {/* Online / Offline Mode Toggle Chip */}
              <button
                onClick={onToggleOffline}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition active:scale-95 ${
                  isOffline
                    ? 'bg-amber-400 text-stone-900 shadow-xs ring-1 ring-amber-300'
                    : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
                }`}
                title={isOffline ? 'Offline Mode Active (Tap for Online)' : 'Online Mode (Tap for Offline testing)'}
              >
                {isOffline ? (
                  <>
                    <WifiOff className="w-3 h-3 text-stone-900" />
                    <span>Offline</span>
                  </>
                ) : (
                  <>
                    <Wifi className="w-3 h-3 text-emerald-300" />
                    <span>Online</span>
                  </>
                )}
              </button>

              {/* Emergency SOS Button */}
              <button
                onClick={onTriggerSOS}
                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 active:scale-95 text-white px-2.5 py-1 rounded-full text-[10px] font-black shadow-md ring-2 ring-red-400/60 animate-pulse"
                title="Tap for Emergency SOS or shake your mobile phone"
              >
                <AlertTriangle className="w-3 h-3" />
                <span>SOS</span>
              </button>
            </div>
          </header>
        )}

        {/* Screen Content Viewport - 100% natural scroll & viewport */}
        <main className="flex-1 w-full flex flex-col relative overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
