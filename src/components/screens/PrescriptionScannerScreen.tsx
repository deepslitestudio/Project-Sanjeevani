import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Camera,
  Upload,
  ChevronRight,
  Loader2,
  X,
  RefreshCw,
  CheckCircle2,
  FileText,
  AlertCircle,
  Clock,
  Sparkles,
  Sun,
  Moon,
  Coffee,
  Languages,
  Check,
  PlusCircle,
  Eye,
  Info,
} from 'lucide-react';
import { ScreenType, Medicine } from '../../types';
import { scanPrescriptionImage, PrescriptionScanResponse, ScannedMedicine } from '../../services/api';

interface PrescriptionScannerScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenType) => void;
  isOffline: boolean;
  selectedLanguage: string;
  onAddMedicinesFromScan?: (medicines: Medicine[]) => void;
}

export const PrescriptionScannerScreen: React.FC<PrescriptionScannerScreenProps> = ({
  onBack,
  onNavigate,
  isOffline,
  selectedLanguage,
  onAddMedicinesFromScan,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImageUri, setCapturedImageUri] = useState<string | null>(null);
  const [displayLanguage, setDisplayLanguage] = useState<'hindi' | 'telugu' | 'english'>(() => {
    if (selectedLanguage.includes('తెలుగు')) return 'telugu';
    if (selectedLanguage.includes('हिंदी')) return 'hindi';
    return 'english';
  });

  const [scanResult, setScanResult] = useState<PrescriptionScanResponse | null>(null);
  const [addedToReminders, setAddedToReminders] = useState(false);
  const [showRawText, setShowRawText] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  // Sync with global language changes if user switches elsewhere
  useEffect(() => {
    if (selectedLanguage.includes('తెలుగు')) setDisplayLanguage('telugu');
    else if (selectedLanguage.includes('हिंदी')) setDisplayLanguage('hindi');
    else setDisplayLanguage('english');
  }, [selectedLanguage]);

  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  const openNativeMobileCamera = () => {
    stopCameraStream();
    setScanError(null);
    cameraInputRef.current?.click();
  };

  const startLiveWebcam = async () => {
    try {
      setScanError(null);
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      setIsCameraActive(true);

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch((err) => {
            console.warn('Video play error:', err);
          });
        }
      }, 100);
    } catch (err: any) {
      console.warn('Webcam stream failed, triggering native camera input:', err);
      openNativeMobileCamera();
    }
  };

  const takeSnapshot = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedImageUri(dataUrl);
      stopCameraStream();
      processImageForOCR(dataUrl);
    }
  };

  const [currentSampleType, setCurrentSampleType] = useState<'fever' | 'chronic' | undefined>(undefined);

  const generateSamplePrescriptionSvg = (type: 'fever' | 'chronic'): string => {
    if (type === 'chronic') {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="420" viewBox="0 0 600 420" style="background:#FFFDF7;font-family:system-ui,-apple-system,sans-serif;">
        <rect width="600" height="420" fill="#FFFDF7" stroke="#D7CEA2" stroke-width="3"/>
        <rect x="18" y="18" width="564" height="68" fill="#1B4D3E" rx="8"/>
        <text x="32" y="46" fill="#FFFFFF" font-size="17" font-weight="bold">DR. R. RAO, MBBS, DNB (Internal Medicine)</text>
        <text x="32" y="68" fill="#A3E3C2" font-size="12">MCI Reg: 33902 / AP-2011 • District Hospital &amp; Diabetes Clinic</text>
        
        <rect x="18" y="96" width="564" height="34" fill="#F4EFE0" rx="6"/>
        <text x="32" y="118" fill="#2D3748" font-size="12" font-weight="bold">Patient: Ram Prasad (68y/M) • Date: 13-Oct-2026</text>
        <text x="435" y="118" fill="#C53030" font-size="12" font-weight="bold">BP: 140/90 mmHg</text>
        
        <text x="32" y="162" fill="#1B4D3E" font-size="28" font-weight="bold" font-family="serif">Rx</text>
        
        <rect x="32" y="174" width="536" height="48" fill="#FFFFFF" stroke="#E2D9C2" rx="6"/>
        <text x="44" y="196" fill="#111827" font-size="13" font-weight="bold">1. Tab. Metformin 500mg SR</text>
        <text x="44" y="213" fill="#1B4D3E" font-size="11" font-weight="600">Dosage: 500mg | Intake: 1-0-1 (Morning &amp; Night After Food) x 30 Days</text>
        
        <rect x="32" y="230" width="536" height="48" fill="#FFFFFF" stroke="#E2D9C2" rx="6"/>
        <text x="44" y="252" fill="#111827" font-size="13" font-weight="bold">2. Tab. Telmisartan 40mg</text>
        <text x="44" y="269" fill="#1B4D3E" font-size="11" font-weight="600">Dosage: 40mg | Intake: 1-0-0 (Morning After Breakfast) x 30 Days</text>
        
        <rect x="32" y="286" width="536" height="48" fill="#FFFFFF" stroke="#E2D9C2" rx="6"/>
        <text x="44" y="308" fill="#111827" font-size="13" font-weight="bold">3. Cap. Pantoprazole 40mg</text>
        <text x="44" y="325" fill="#1B4D3E" font-size="11" font-weight="600">Dosage: 40mg | Intake: 1-0-0 (Morning Empty Stomach) x 15 Days</text>
        
        <text x="32" y="358" fill="#4A5568" font-size="11" font-style="italic">Advice: Low salt diet, daily brisk walking, monitor BP &amp; Sugar.</text>
        <line x1="420" y1="388" x2="550" y2="388" stroke="#718096" stroke-width="1"/>
        <text x="430" y="403" fill="#718096" font-size="11">Dr. R. Rao (Sign &amp; Seal)</text>
      </svg>`;
      return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.trim());
    } else {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="420" viewBox="0 0 600 420" style="background:#FFFDF7;font-family:system-ui,-apple-system,sans-serif;">
        <rect width="600" height="420" fill="#FFFDF7" stroke="#D7CEA2" stroke-width="3"/>
        <rect x="18" y="18" width="564" height="68" fill="#2E6B4F" rx="8"/>
        <text x="32" y="46" fill="#FFFFFF" font-size="17" font-weight="bold">DR. S. K. SHARMA, MBBS, MD</text>
        <text x="32" y="68" fill="#A3E3C2" font-size="12">MCI Reg: 48210 / UP-2014 • Primary Health Center, Kalyanpur</text>
        
        <rect x="18" y="96" width="564" height="34" fill="#F4EFE0" rx="6"/>
        <text x="32" y="118" fill="#2D3748" font-size="12" font-weight="bold">Patient: Sita Devi (45y/F) • Date: 13-Oct-2026</text>
        <text x="435" y="118" fill="#2E6B4F" font-size="12" font-weight="bold">Temp: 101.4°F</text>
        
        <text x="32" y="162" fill="#2E6B4F" font-size="28" font-weight="bold" font-family="serif">Rx</text>
        
        <rect x="32" y="174" width="536" height="48" fill="#FFFFFF" stroke="#E2D9C2" rx="6"/>
        <text x="44" y="196" fill="#111827" font-size="13" font-weight="bold">1. Tab. Paracetamol 650mg</text>
        <text x="44" y="213" fill="#2E6B4F" font-size="11" font-weight="600">Dosage: 650mg | Intake: 1-0-1 (Morning &amp; Night After Food) x 3 Days</text>
        
        <rect x="32" y="230" width="536" height="48" fill="#FFFFFF" stroke="#E2D9C2" rx="6"/>
        <text x="44" y="252" fill="#111827" font-size="13" font-weight="bold">2. Cap. Amoxicillin 500mg</text>
        <text x="44" y="269" fill="#2E6B4F" font-size="11" font-weight="600">Dosage: 500mg | Intake: 1-0-1 (Morning &amp; Night After Food) x 5 Days</text>
        
        <rect x="32" y="286" width="536" height="48" fill="#FFFFFF" stroke="#E2D9C2" rx="6"/>
        <text x="44" y="308" fill="#111827" font-size="13" font-weight="bold">3. Syp. Cough Relief (Ambroxol + Levosalbutamol)</text>
        <text x="44" y="325" fill="#2E6B4F" font-size="11" font-weight="600">Dosage: 10ml | Intake: 0-0-1 (Bedtime 10ml) x 5 Days</text>
        
        <text x="32" y="358" fill="#4A5568" font-size="11" font-style="italic">Advice: Complete rest, drink plenty of warm water. Review after 3 days.</text>
        <line x1="420" y1="388" x2="550" y2="388" stroke="#718096" stroke-width="1"/>
        <text x="430" y="403" fill="#718096" font-size="11">Dr. S. K. Sharma (Sign &amp; Seal)</text>
      </svg>`;
      return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.trim());
    }
  };

  const handleLoadSample = (type: 'fever' | 'chronic') => {
    stopCameraStream();
    setCurrentSampleType(type);
    const sampleUri = generateSamplePrescriptionSvg(type);
    setCapturedImageUri(sampleUri);
    processImageForOCR(sampleUri, displayLanguage, type);
  };

  const processImageForOCR = async (
    base64Data: string,
    lang = displayLanguage,
    sampleType?: 'fever' | 'chronic'
  ) => {
    setIsScanning(true);
    setScanError(null);
    setAddedToReminders(false);

    const targetLangName =
      lang === 'telugu' ? 'Telugu (తెలుగు)' : lang === 'hindi' ? 'Hindi (हिंदी)' : 'English';

    try {
      const res = await scanPrescriptionImage(
        base64Data,
        targetLangName,
        isOffline,
        sampleType ?? currentSampleType
      );
      setScanResult(res);
    } catch (err: any) {
      console.error('OCR scan error:', err);
      setScanError(
        err.message ||
          'Could not extract medicines accurately. Please ensure prescription text is clearly visible and well-lit.'
      );
    } finally {
      setIsScanning(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCurrentSampleType(undefined);
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setCapturedImageUri(result);
      processImageForOCR(result);
    };
    reader.readAsDataURL(file);
  };

  // Convert scanned medicines into daily medicine reminders
  const handleAddToDailyReminders = () => {
    if (!scanResult || !scanResult.detectedMedicines || scanResult.detectedMedicines.length === 0)
      return;

    const createdMedicines: Medicine[] = scanResult.detectedMedicines.map((med, index) => {
      const timeSlots: { time: string; taken: boolean; label: string }[] = [];

      if (med.timingSchedule?.morning) {
        timeSlots.push({ time: '08:00 AM', taken: false, label: 'Morning' });
      }
      if (med.timingSchedule?.afternoon) {
        timeSlots.push({ time: '01:00 PM', taken: false, label: 'Afternoon' });
      }
      if (med.timingSchedule?.evening) {
        timeSlots.push({ time: '05:00 PM', taken: false, label: 'Evening' });
      }
      if (med.timingSchedule?.night) {
        timeSlots.push({ time: '08:30 PM', taken: false, label: 'Night' });
      }

      // Default fallback if schedule is not explicitly broken down
      if (timeSlots.length === 0) {
        timeSlots.push({ time: '08:00 AM', taken: false, label: 'Morning' });
        timeSlots.push({ time: '08:00 PM', taken: false, label: 'Night' });
      }

      return {
        id: 'med-' + Date.now() + '-' + index,
        name: med.name,
        category: med.category || 'Prescribed Medicine',
        timing: med.timing || '1-0-1',
        instructions:
          displayLanguage !== 'english' && med.instructionsTranslated
            ? med.instructionsTranslated
            : med.instructions || 'Take as advised on prescription slip',
        timeSlots,
        duration: med.duration || '5 Days',
        precaution: med.precaution,
      };
    });

    if (onAddMedicinesFromScan) {
      onAddMedicinesFromScan(createdMedicines);
    } else {
      // Direct LocalStorage sync fallback
      try {
        const existingStr = localStorage.getItem('sanjeevani_medicines');
        const existing: Medicine[] = existingStr ? JSON.parse(existingStr) : [];
        localStorage.setItem(
          'sanjeevani_medicines',
          JSON.stringify([...createdMedicines, ...existing])
        );
      } catch (e) {
        console.warn('LocalStorage medicine save error:', e);
      }
    }

    setAddedToReminders(true);
    setTimeout(() => {
      onNavigate('medicine-reminder');
    }, 1200);
  };

  // Re-run or toggle language view for current scan
  const handleLanguageSwitch = (lang: 'hindi' | 'telugu' | 'english') => {
    setDisplayLanguage(lang);
    if (capturedImageUri && (!scanResult?.detectedMedicines[0]?.instructionsTranslated || displayLanguage !== lang)) {
      processImageForOCR(capturedImageUri, lang);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FBF7EE] text-gray-800 animate-fadeIn">
      {/* Top Header */}
      <div className="p-3 bg-white border-b border-[#E5DEC9] flex items-center justify-between sticky top-0 z-20 shadow-xs">
        <button
          onClick={() => {
            stopCameraStream();
            onBack();
          }}
          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-700"
          aria-label="Back to home"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h1 className="text-sm font-black text-gray-900">Exact Prescription Scanner</h1>
          <p className="text-[10px] text-[#2E6B4F] font-bold">Original Medical Slip OCR</p>
        </div>

        {/* Language Quick Selector */}
        <div className="flex items-center gap-1 bg-[#F4EFE6] p-1 rounded-xl border border-[#E5DEC9]">
          <button
            onClick={() => handleLanguageSwitch('hindi')}
            className={`px-1.5 py-0.5 rounded-lg text-[10px] font-bold transition ${
              displayLanguage === 'hindi'
                ? 'bg-[#2E6B4F] text-white shadow-2xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title="Convert to Hindi"
          >
            हिंदी
          </button>
          <button
            onClick={() => handleLanguageSwitch('telugu')}
            className={`px-1.5 py-0.5 rounded-lg text-[10px] font-bold transition ${
              displayLanguage === 'telugu'
                ? 'bg-[#2E6B4F] text-white shadow-2xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title="Convert to Telugu"
          >
            తెలుగు
          </button>
          <button
            onClick={() => handleLanguageSwitch('english')}
            className={`px-1.5 py-0.5 rounded-lg text-[10px] font-bold transition ${
              displayLanguage === 'english'
                ? 'bg-[#2E6B4F] text-white shadow-2xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title="Convert to English"
          >
            EN
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Hidden Native Mobile Camera / File Input */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileUpload}
        />

        {/* Viewfinder / Capture Box */}
        <div className="relative rounded-3xl overflow-hidden bg-stone-900 border-2 border-[#E5DEC9] p-2 shadow-inner flex flex-col items-center justify-center min-h-[260px]">
          {/* Live Camera View */}
          {isCameraActive ? (
            <div className="relative w-full h-[250px] bg-black rounded-2xl overflow-hidden flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-4 border-2 border-dashed border-emerald-400/80 rounded-xl pointer-events-none flex flex-col items-center justify-between p-2">
                <span className="text-[10px] font-black text-emerald-300 bg-black/70 px-3 py-1 rounded-full backdrop-blur-xs">
                  Place Doctor's Prescription Within Frame
                </span>
                <span className="text-[9px] text-white/80 bg-black/50 px-2 py-0.5 rounded-md">
                  Keep still for crisp text & dosage capture
                </span>
              </div>

              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-4 z-10">
                <button
                  onClick={stopCameraStream}
                  className="w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center backdrop-blur-xs hover:bg-black/90"
                >
                  <X className="w-5 h-5" />
                </button>

                <button
                  onClick={takeSnapshot}
                  className="w-14 h-14 rounded-full bg-white border-4 border-[#2E6B4F] flex items-center justify-center shadow-lg transform active:scale-90 transition"
                  title="Capture Prescription"
                >
                  <div className="w-10 h-10 rounded-full bg-[#2E6B4F]" />
                </button>
              </div>
            </div>
          ) : capturedImageUri ? (
            /* Captured Prescription Preview with Retake */
            <div className="relative w-full h-[250px] rounded-2xl overflow-hidden bg-stone-950 flex items-center justify-center">
              <img
                src={capturedImageUri}
                alt="Captured Original Prescription Sheet"
                className="w-full h-full object-contain"
              />
              <div className="absolute top-2 left-2 bg-black/75 text-emerald-400 px-2.5 py-1 rounded-full text-[10px] font-black flex items-center gap-1 backdrop-blur-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Original Sheet Captured</span>
              </div>
              <button
                onClick={() => {
                  setCapturedImageUri(null);
                  setScanResult(null);
                  setScanError(null);
                  openNativeMobileCamera();
                }}
                className="absolute top-2 right-2 bg-black/80 hover:bg-black text-white p-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 px-3 shadow-md backdrop-blur-xs transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retake / Scan Another</span>
              </button>
            </div>
          ) : (
            /* Empty State - Clear Instructions */
            <div className="w-full bg-[#FFFDF8] border border-amber-200/80 rounded-2xl p-4 shadow-2xs font-serif text-gray-800 space-y-3 relative">
              <div className="flex items-center justify-between border-b pb-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[#2E6B4F] text-lg font-serif">Rx</span>
                  <div>
                    <p className="text-[11px] font-black text-gray-900 font-sans leading-tight">
                      Prescription Verification Scanner
                    </p>
                    <p className="text-[9px] text-gray-500 font-sans">
                      Accurate tablet extraction, dosage in mg & intake timings
                    </p>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-800 bg-emerald-100 font-bold px-2 py-0.5 rounded-full font-sans">
                  Ready
                </span>
              </div>

              <div className="py-4 text-center font-sans space-y-2">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-50 text-[#2E6B4F] flex items-center justify-center border border-emerald-200">
                  <Camera className="w-6 h-6" />
                </div>
                <p className="text-xs font-black text-gray-800">
                  Attach or Capture Original Doctor's Prescription
                </p>
                <p className="text-[11px] text-gray-500 max-w-[280px] mx-auto leading-relaxed">
                  Real AI reads handwritten doctor notes to extract the <strong>exact tablet name</strong>, <strong>milligrams (mg)</strong>, and <strong>morning/night intake timings</strong> in Hindi or Telugu.
                </p>
              </div>
            </div>
          )}

          {/* AI Processing Overlay */}
          {isScanning && (
            <div className="absolute inset-0 bg-[#1F4935]/85 backdrop-blur-xs flex flex-col items-center justify-center gap-2 rounded-3xl z-30 p-4 text-center">
              <div className="w-14 h-14 rounded-full bg-white text-[#2E6B4F] flex items-center justify-center shadow-xl animate-bounce">
                <Sparkles className="w-7 h-7 text-[#2E6B4F] animate-spin" />
              </div>
              <p className="text-xs font-black text-white bg-black/40 px-4 py-1.5 rounded-full shadow-md">
                Reading Authentic Doctor Handwriting & Dosages...
              </p>
              <p className="text-[10px] text-emerald-100 max-w-[260px]">
                Extracting exact tablet names, mg strength, and intake schedule in {displayLanguage.toUpperCase()}...
              </p>
            </div>
          )}

          {/* Action Buttons Bar */}
          {!isCameraActive && (
            <div className="mt-3 flex items-center justify-center gap-2.5 w-full">
              <button
                onClick={openNativeMobileCamera}
                disabled={isScanning}
                className="flex-1 py-3 bg-[#2E6B4F] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm hover:bg-[#23533E] transition active:scale-95 disabled:opacity-50"
              >
                <Camera className="w-4 h-4" />
                <span>Capture Prescription</span>
              </button>

              <label className="flex-1 py-3 bg-white text-gray-800 border border-[#E5DEC9] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs hover:bg-gray-50 transition cursor-pointer active:scale-95">
                <Upload className="w-4 h-4 text-gray-600" />
                <span>Upload Document</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={isScanning}
                />
              </label>

              <button
                onClick={startLiveWebcam}
                disabled={isScanning}
                className="px-3.5 py-3 bg-stone-800 text-stone-200 rounded-xl text-[11px] font-bold hover:bg-stone-700 transition"
                title="Use Live Camera Stream"
              >
                Live
              </button>
            </div>
          )}
        </div>

        {/* 1-Tap Sample Prescriptions for Instant Testing */}
        <div className="bg-white p-3 rounded-2xl border border-[#E5DEC9] shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-gray-900 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#2E6B4F]" />
              <span>
                {displayLanguage === 'telugu'
                  ? 'నమూనా ప్రిస్క్రిప్షన్లు (తక్షణ పరీక్ష)'
                  : displayLanguage === 'hindi'
                  ? 'नमूना पर्चियां (तुरंत परीक्षण करें)'
                  : 'Sample Prescriptions (Instant Test)'}
              </span>
            </span>
            <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              1-Tap Exact OCR
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={() => handleLoadSample('fever')}
              disabled={isScanning}
              className={`p-2.5 rounded-xl border text-left transition flex items-start gap-2.5 active:scale-98 ${
                currentSampleType === 'fever'
                  ? 'bg-emerald-50 border-[#2E6B4F] ring-1 ring-[#2E6B4F]'
                  : 'bg-[#FBF7EE] border-[#E5DEC9] hover:bg-emerald-50/50'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#2E6B4F] flex items-center justify-center shrink-0 font-serif font-black text-xs">
                Rx 1
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black text-gray-900 truncate">Dr. S. K. Sharma (PHC)</p>
                <p className="text-[10px] text-gray-600 line-clamp-1">Paracetamol 650mg, Amox 500mg, Syp 10ml</p>
                <span className="inline-block mt-0.5 text-[9px] font-black text-[#2E6B4F]">
                  {displayLanguage === 'telugu' ? 'పరీక్షించండి (ఉదయం & రాత్రి) →' : displayLanguage === 'hindi' ? 'जांचें (सुबह और रात) →' : 'Scan & View Timings →'}
                </span>
              </div>
            </button>

            <button
              onClick={() => handleLoadSample('chronic')}
              disabled={isScanning}
              className={`p-2.5 rounded-xl border text-left transition flex items-start gap-2.5 active:scale-98 ${
                currentSampleType === 'chronic'
                  ? 'bg-teal-50 border-teal-700 ring-1 ring-teal-700'
                  : 'bg-[#FBF7EE] border-[#E5DEC9] hover:bg-teal-50/50'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 font-serif font-black text-xs">
                Rx 2
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black text-gray-900 truncate">Dr. R. Rao (Chronic)</p>
                <p className="text-[10px] text-gray-600 line-clamp-1">Metformin 500mg, Telmi 40mg, Panto 40mg</p>
                <span className="inline-block mt-0.5 text-[9px] font-black text-teal-800">
                  {displayLanguage === 'telugu' ? 'పరీక్షించండి (ఖాళీ కడుపు / భోజనం) →' : displayLanguage === 'hindi' ? 'जांचें (खाली पेट / भोजन) →' : 'Scan & View Timings →'}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Scan Error Notice if parsing failed */}
        {scanError && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 text-xs text-rose-800 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold">Prescription Scan Notice</p>
              <p className="text-[11px] text-rose-700 mt-0.5 leading-relaxed">{scanError}</p>
            </div>
          </div>
        )}

        {/* Real Scan Results Section */}
        {scanResult && scanResult.detectedMedicines && scanResult.detectedMedicines.length > 0 && (
          <div className="space-y-3 animate-fadeIn">
            {/* Doctor & Clinic Header Banner */}
            <div className="bg-white p-3.5 rounded-2xl border border-[#E5DEC9] shadow-2xs space-y-2">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <h2 className="text-xs font-black text-gray-900">
                    {scanResult.doctorName || "Doctor's Prescription"}
                  </h2>
                  <p className="text-[10px] text-gray-500 font-semibold">
                    {scanResult.clinic || 'Medical Clinic'} {scanResult.regNumber ? `• ${scanResult.regNumber}` : ''}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified OCR</span>
                  </span>
                  {scanResult.date && (
                    <p className="text-[9px] text-gray-400 mt-0.5">Date: {scanResult.date}</p>
                  )}
                </div>
              </div>

              {/* Patient Name if found on original slip */}
              {scanResult.patientName && (
                <p className="text-[10px] text-gray-600 font-medium">
                  <strong>Patient:</strong> {scanResult.patientName}
                </p>
              )}

              {/* Language Switch Notice */}
              <div className="flex items-center justify-between text-[11px] bg-amber-50/70 p-2 rounded-xl border border-amber-200/50">
                <span className="font-semibold text-amber-900 flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5 text-amber-700" />
                  <span>Viewing in: <strong>{displayLanguage === 'telugu' ? 'తెలుగు (Telugu)' : displayLanguage === 'hindi' ? 'हिंदी (Hindi)' : 'English'}</strong></span>
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleLanguageSwitch('hindi')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      displayLanguage === 'hindi' ? 'bg-[#2E6B4F] text-white' : 'bg-white text-gray-700 border'
                    }`}
                  >
                    हिंदी
                  </button>
                  <button
                    onClick={() => handleLanguageSwitch('telugu')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      displayLanguage === 'telugu' ? 'bg-[#2E6B4F] text-white' : 'bg-white text-gray-700 border'
                    }`}
                  >
                    తెలుగు
                  </button>
                </div>
              </div>
            </div>

            {/* List of Verified Medicines with Exact mg and Intake Timings */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#2E6B4F]" />
                  <span>
                    Exact Tablets Prescribed ({scanResult.detectedMedicines.length})
                  </span>
                </h3>
                <span className="text-[10px] text-gray-500 font-semibold">
                  No random data • Authentic OCR
                </span>
              </div>

              {scanResult.detectedMedicines.map((med: ScannedMedicine, idx: number) => {
                const instructionsToDisplay =
                  displayLanguage !== 'english' && med.instructionsTranslated
                    ? med.instructionsTranslated
                    : med.instructions;

                const categoryToDisplay =
                  displayLanguage !== 'english' && med.categoryTranslated
                    ? med.categoryTranslated
                    : med.category;

                const durationToDisplay =
                  displayLanguage !== 'english' && med.durationTranslated
                    ? med.durationTranslated
                    : med.duration;

                return (
                  <div
                    key={med.id || idx}
                    className="bg-white p-3.5 rounded-2xl border border-[#E5DEC9] shadow-2xs space-y-2.5"
                  >
                    {/* Medicine Name and Dosage (mg) */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#2E6B4F] text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-xs font-black text-gray-900 leading-tight">
                              {med.name}
                            </h4>
                            {/* Explicit mg / Dosage badge */}
                            {med.dosageMg && (
                              <span className="text-[10px] font-black bg-emerald-100 text-[#1F4935] px-2 py-0.5 rounded-md border border-emerald-300">
                                {med.dosageMg}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-gray-600 font-semibold mt-0.5">
                            {categoryToDisplay}
                          </p>
                        </div>
                      </div>

                      {/* Shorthand timing code like 1-0-1 */}
                      <span className="text-xs font-black text-[#2E6B4F] bg-[#E2F0E8] px-2.5 py-1 rounded-lg shrink-0">
                        {med.timing}
                      </span>
                    </div>

                    {/* Detailed Intake Timings Visual Breakdown (Morning, Afternoon, Night) */}
                    <div className="bg-[#FAF6EC] p-2.5 rounded-xl border border-[#E7DFCC] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-gray-700 uppercase tracking-wider flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#2E6B4F]" />
                          <span>
                            {displayLanguage === 'telugu'
                              ? 'తీసుకోవాల్సిన సమయాలు (Intake Timings)'
                              : displayLanguage === 'hindi'
                              ? 'दवा लेने का समय (Intake Timings)'
                              : 'Intake Timings (Morning / Night)'}
                          </span>
                        </span>

                        {med.timingSchedule?.mealRelation && (
                          <span className="text-[10px] font-extrabold text-[#1F4935] bg-emerald-100/80 px-2 py-0.5 rounded">
                            {med.timingSchedule.mealRelation}
                          </span>
                        )}
                      </div>

                      {/* Morning, Afternoon, Evening, Night Indicators */}
                      <div className="grid grid-cols-3 gap-1.5 text-center pt-1">
                        {/* Morning */}
                        <div
                          className={`p-1.5 rounded-lg border text-[10px] font-bold flex flex-col items-center gap-0.5 ${
                            med.timingSchedule?.morning
                              ? 'bg-amber-100/80 border-amber-300 text-amber-950 font-black'
                              : 'bg-white/60 border-gray-200 text-gray-400 opacity-60'
                          }`}
                        >
                          <Sun className={`w-3.5 h-3.5 ${med.timingSchedule?.morning ? 'text-amber-700' : 'text-gray-400'}`} />
                          <span>
                            {displayLanguage === 'telugu' ? 'ఉదయం (Morning)' : displayLanguage === 'hindi' ? 'सुबह (Morning)' : 'Morning'}
                          </span>
                          <span className="text-[9px]">
                            {med.timingSchedule?.morning ? '✓ 1 Dose' : '—'}
                          </span>
                        </div>

                        {/* Afternoon */}
                        <div
                          className={`p-1.5 rounded-lg border text-[10px] font-bold flex flex-col items-center gap-0.5 ${
                            med.timingSchedule?.afternoon
                              ? 'bg-orange-100/80 border-orange-300 text-orange-950 font-black'
                              : 'bg-white/60 border-gray-200 text-gray-400 opacity-60'
                          }`}
                        >
                          <Coffee className={`w-3.5 h-3.5 ${med.timingSchedule?.afternoon ? 'text-orange-700' : 'text-gray-400'}`} />
                          <span>
                            {displayLanguage === 'telugu' ? 'మధ్యాహ్నం' : displayLanguage === 'hindi' ? 'दोपहर' : 'Afternoon'}
                          </span>
                          <span className="text-[9px]">
                            {med.timingSchedule?.afternoon ? '✓ 1 Dose' : '—'}
                          </span>
                        </div>

                        {/* Night */}
                        <div
                          className={`p-1.5 rounded-lg border text-[10px] font-bold flex flex-col items-center gap-0.5 ${
                            med.timingSchedule?.night
                              ? 'bg-indigo-100/80 border-indigo-300 text-indigo-950 font-black'
                              : 'bg-white/60 border-gray-200 text-gray-400 opacity-60'
                          }`}
                        >
                          <Moon className={`w-3.5 h-3.5 ${med.timingSchedule?.night ? 'text-indigo-700' : 'text-gray-400'}`} />
                          <span>
                            {displayLanguage === 'telugu' ? 'రాత్రి (Night)' : displayLanguage === 'hindi' ? 'रात (Night)' : 'Night'}
                          </span>
                          <span className="text-[9px]">
                            {med.timingSchedule?.night ? '✓ 1 Dose' : '—'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Full Instructions in Selected Language */}
                    {instructionsToDisplay && (
                      <div className="text-[11px] text-gray-800 bg-[#FFFDF8] p-2.5 rounded-xl border border-amber-200 flex items-start gap-2">
                        <Info className="w-3.5 h-3.5 text-[#2E6B4F] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-gray-900 leading-tight">
                            {instructionsToDisplay}
                          </p>
                          {durationToDisplay && (
                            <p className="text-[10px] text-gray-600 mt-1 font-semibold">
                              <strong>Course:</strong> {durationToDisplay}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Precautions if any */}
                    {med.precaution && (
                      <p className="text-[10px] text-amber-900 bg-amber-100/60 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5">
                        <AlertCircle className="w-3 h-3 text-amber-700 shrink-0" />
                        <span>{med.precautionTranslated || med.precaution}</span>
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pharmacist Reading Notes & Raw Slip Transcription View */}
            <div className="bg-white p-3.5 rounded-2xl border border-[#E5DEC9] shadow-2xs space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-gray-900 flex items-center gap-1.5 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#2E6B4F]" />
                  <span>Clinical Reading Verification</span>
                </span>
                {scanResult.rawExtractedText && (
                  <button
                    onClick={() => setShowRawText(!showRawText)}
                    className="text-[10px] font-bold text-[#2E6B4F] hover:underline flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    <span>{showRawText ? 'Hide Raw Text' : 'View Raw Prescription Text'}</span>
                  </button>
                )}
              </div>

              <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                {displayLanguage !== 'english' && scanResult.notesTranslated
                  ? scanResult.notesTranslated
                  : scanResult.notes || 'All medicines read verbatim from the attached document.'}
              </p>

              {showRawText && scanResult.rawExtractedText && (
                <pre className="mt-2 p-2 bg-[#F6F2E9] rounded-xl text-[10px] text-gray-800 font-mono whitespace-pre-wrap border border-[#E5DEC9] max-h-36 overflow-y-auto">
                  {scanResult.rawExtractedText}
                </pre>
              )}
            </div>
          </div>
        )}

        {/* Informational Guidance when no scan result */}
        {!scanResult && (
          <div className="bg-white p-4 rounded-2xl border border-[#E5DEC9] shadow-2xs space-y-2 text-xs">
            <h3 className="font-black text-gray-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#2E6B4F]" />
              <span>How Exact Prescription Scanner Works</span>
            </h3>
            <ol className="list-decimal list-inside text-gray-600 space-y-1.5 text-[11px] font-medium leading-relaxed">
              <li>
                Tap <strong>Capture Prescription</strong> or <strong>Upload Document</strong> to snap the doctor's slip.
              </li>
              <li>
                Gemini AI Vision transcribes the <strong>exact tablet names</strong> written on the sheet (never random medicine names).
              </li>
              <li>
                Extracts the exact <strong>mg strength</strong> (e.g. 650mg, 500mg) and <strong>morning / night intake timings</strong>.
              </li>
              <li>
                Tap the language buttons (हिंदी / తెలుగు) to immediately understand tablet instructions in your mother tongue.
              </li>
              <li>
                Directly add recognized tablets to your daily medicine reminders with 1 tap.
              </li>
            </ol>
          </div>
        )}
      </div>

      {/* Bottom CTA Button: Add Real Medicines to Daily Reminders */}
      {scanResult && scanResult.detectedMedicines?.length > 0 && (
        <div className="p-3 bg-white border-t border-[#E5DEC9] sticky bottom-0 z-10 shadow-md">
          <button
            onClick={handleAddToDailyReminders}
            disabled={addedToReminders}
            className={`w-full py-3.5 text-white font-black rounded-2xl shadow-md flex items-center justify-center gap-2 text-sm transition active:scale-98 ${
              addedToReminders ? 'bg-emerald-700' : 'bg-[#2E6B4F] hover:bg-[#23533E]'
            }`}
          >
            {addedToReminders ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Added to Medicine Reminders!</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4" />
                <span>Add {scanResult.detectedMedicines.length} Tablets to Daily Reminders</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
