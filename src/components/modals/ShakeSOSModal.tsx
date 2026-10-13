import React, { useState, useEffect } from 'react';
import { AlertTriangle, Phone, MapPin, X, Check } from 'lucide-react';
import { UserLocation } from '../../hooks/useUserLocation';

interface ShakeSOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSOS: () => void;
  userLocation?: UserLocation;
}

export const ShakeSOSModal: React.FC<ShakeSOSModalProps> = ({
  isOpen,
  onClose,
  onConfirmSOS,
  userLocation,
}) => {
  const [countdown, setCountdown] = useState<number>(15);
  const [sosTriggered, setSosTriggered] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(15);
      setSosTriggered(false);
      return;
    }

    // Play alert sound if audio synthesis is available
    if ('speechSynthesis' in window) {
      const msg = new SpeechSynthesisUtterance('Possible emergency detected. Confirming SOS in 15 seconds.');
      msg.rate = 1.0;
      window.speechSynthesis.speak(msg);
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setSosTriggered(true);
          onConfirmSOS();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const latText = userLocation?.latitude ? userLocation.latitude.toFixed(4) + '° N' : '20.5937° N';
  const lngText = userLocation?.longitude ? userLocation.longitude.toFixed(4) + '° E' : '78.9629° E';
  const placeText = userLocation?.placeName || 'Live GPS Location';

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="w-full max-w-xs bg-white rounded-3xl border-2 border-red-500 p-5 text-center shadow-2xl space-y-4 relative overflow-hidden">
        {/* Pulsing Red Banner Header */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg animate-bounce mb-2">
            <AlertTriangle className="w-9 h-9" />
          </div>
          <h2 className="text-base font-black text-red-700">
            SHAKE SOS DETECTED
          </h2>
          <p className="text-xs font-semibold text-gray-700 mt-1">
            We detected a sudden shake motion.
          </p>
        </div>

        {!sosTriggered ? (
          <>
            <div className="py-2">
              <span className="text-4xl font-black text-red-600 tracking-tight">
                {countdown}s
              </span>
              <p className="text-[11px] font-bold text-gray-500 uppercase mt-1">
                Auto-triggering 112 Call & Location Share
              </p>
            </div>

            {/* GPS Location Status Indicator */}
            <div className="bg-red-50 p-2.5 rounded-2xl text-[10px] text-red-900 font-bold flex flex-col items-center justify-center gap-0.5">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-600 animate-pulse" />
                <span>GPS: {latText}, {lngText}</span>
              </div>
              <span className="text-[9px] text-red-700 font-medium truncate max-w-[220px]">
                {placeText}
              </span>
            </div>

            {/* Confirmation Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setSosTriggered(true);
                  onConfirmSOS();
                }}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl shadow-md text-xs transition active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>YES, CALL 112 NOW</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-2xl text-xs transition"
              >
                NO, CANCEL (I'M SAFE)
              </button>
            </div>
          </>
        ) : (
          <div className="py-4 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="text-sm font-black text-emerald-900">
              SOS ALERT DISPATCHED
            </h3>
            <p className="text-xs font-medium text-gray-700">
              SMS sent to Guardian with live GPS location ({placeText}). Initiating 112 Call.
            </p>

            <button
              onClick={onClose}
              className="mt-2 w-full py-2.5 bg-gray-900 text-white font-bold rounded-2xl text-xs"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
