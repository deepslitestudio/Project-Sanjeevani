import React, { useState } from 'react';
import { ArrowLeft, Check, ChevronRight, AlertCircle } from 'lucide-react';
import { ScreenType, SymptomState } from '../../types';

interface SymptomCheckerScreenProps {
  onBack: () => void;
  onProceedToResult: (symptomState: SymptomState) => void;
}

export const SymptomCheckerScreen: React.FC<SymptomCheckerScreenProps> = ({
  onBack,
  onProceedToResult,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('Stomach');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    'Acidity / Pain',
  ]);
  const [duration, setDuration] = useState<string>('2-3 Days');
  const [severity, setSeverity] = useState<'Mild' | 'Moderate' | 'Severe'>(
    'Moderate'
  );

  const regionSymptomsMap: Record<string, string[]> = {
    Head: ['Headache', 'Dizziness', 'Fever', 'Eye strain', 'Cold / Runny nose'],
    Chest: ['Chest tightness', 'Cough / Phlegm', 'Shortness of breath', 'Palpitations'],
    Stomach: ['Acidity / Pain', 'Nausea / Vomiting', 'Diarrhea', 'Loss of appetite'],
    Arm: ['Joint pain', 'Muscle soreness', 'Numbness', 'Swelling'],
    Leg: ['Knee pain', 'Cramps', 'Swelling in ankles', 'Difficulty walking'],
  };

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms((prev) => prev.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms((prev) => [...prev, symptom]);
    }
  };

  const handleNext = () => {
    onProceedToResult({
      selectedBodyPart: selectedRegion,
      symptoms: selectedSymptoms,
      duration,
      severity,
      additionalNotes: '',
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FBF7EE] text-gray-800 animate-fadeIn">
      {/* Top Header */}
      <div className="p-3 bg-white border-b border-[#E5DEC9] flex items-center justify-between sticky top-0 z-20">
        <button
          onClick={onBack}
          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-700"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-black text-gray-900">Symptom Checker</h1>

        {/* Progress Dots */}
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#2E6B4F]" />
          <span className="w-2 h-2 rounded-full bg-[#2E6B4F]" />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-base font-extrabold text-gray-900">
            Select the area where you feel discomfort
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            Tap on the body map or choose from options
          </p>
        </div>

        {/* Body Map Diagram & Buttons Container */}
        <div className="bg-white p-4 rounded-3xl border border-[#E5DEC9] shadow-xs flex items-center justify-between gap-4">
          {/* Human Body Illustration Vector */}
          <div className="relative w-36 h-64 flex justify-center items-center">
            {/* Simple anatomical vector figure */}
            <svg
              viewBox="0 0 100 200"
              className="w-full h-full text-[#2E6B4F] stroke-current stroke-2 fill-emerald-50"
            >
              {/* Head */}
              <circle
                cx="50"
                cy="25"
                r="16"
                className={`cursor-pointer transition ${
                  selectedRegion === 'Head'
                    ? 'fill-[#2E6B4F] text-white'
                    : 'hover:fill-emerald-200'
                }`}
                onClick={() => setSelectedRegion('Head')}
              />
              {/* Neck & Chest */}
              <path
                d="M38,42 L62,42 L68,85 L32,85 Z"
                className={`cursor-pointer transition ${
                  selectedRegion === 'Chest'
                    ? 'fill-[#2E6B4F]'
                    : 'hover:fill-emerald-200'
                }`}
                onClick={() => setSelectedRegion('Chest')}
              />
              {/* Stomach */}
              <path
                d="M32,87 L68,87 L64,120 L36,120 Z"
                className={`cursor-pointer transition ${
                  selectedRegion === 'Stomach'
                    ? 'fill-[#2E6B4F]'
                    : 'hover:fill-emerald-200'
                }`}
                onClick={() => setSelectedRegion('Stomach')}
              />
              {/* Arms */}
              <path
                d="M28,45 L15,100 L24,102 L32,55 Z M72,45 L85,100 L76,102 L68,55 Z"
                className={`cursor-pointer transition ${
                  selectedRegion === 'Arm'
                    ? 'fill-[#2E6B4F]'
                    : 'hover:fill-emerald-200'
                }`}
                onClick={() => setSelectedRegion('Arm')}
              />
              {/* Legs */}
              <path
                d="M36,122 L46,122 L44,185 L34,185 Z M54,122 L64,122 L66,185 L56,185 Z"
                className={`cursor-pointer transition ${
                  selectedRegion === 'Leg'
                    ? 'fill-[#2E6B4F]'
                    : 'hover:fill-emerald-200'
                }`}
                onClick={() => setSelectedRegion('Leg')}
              />
            </svg>
          </div>

          {/* Body Part Selection Buttons (Matching Wireframe Pills) */}
          <div className="flex flex-col gap-2 flex-1">
            {['Head', 'Chest', 'Stomach', 'Arm', 'Leg'].map((part) => {
              const isSelected = selectedRegion === part;
              return (
                <button
                  key={part}
                  onClick={() => {
                    setSelectedRegion(part);
                    setSelectedSymptoms([]);
                  }}
                  className={`w-full py-2 px-4 rounded-2xl text-xs font-bold transition border shadow-2xs ${
                    isSelected
                      ? 'bg-[#2E6B4F] text-white border-[#2E6B4F]'
                      : 'bg-[#FBF7EE] text-gray-800 border-[#E5DEC9] hover:bg-gray-100'
                  }`}
                >
                  {part}
                </button>
              );
            })}
          </div>
        </div>

        {/* Specific Symptoms Checklist for selected region */}
        <div className="bg-white p-3.5 rounded-3xl border border-[#E5DEC9]">
          <h3 className="text-xs font-extrabold text-gray-900 mb-2">
            Symptoms in {selectedRegion}:
          </h3>
          <div className="flex flex-wrap gap-2">
            {(regionSymptomsMap[selectedRegion] || []).map((sym) => {
              const active = selectedSymptoms.includes(sym);
              return (
                <button
                  key={sym}
                  onClick={() => toggleSymptom(sym)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                    active
                      ? 'bg-amber-100 border border-amber-300 text-amber-900'
                      : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {active && <Check className="w-3.5 h-3.5 text-amber-700" />}
                  <span>{sym}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Duration & Severity Options */}
        <div className="bg-white p-3.5 rounded-3xl border border-[#E5DEC9] space-y-3">
          <div>
            <span className="text-xs font-extrabold text-gray-800 block mb-1.5">
              How long have you had this?
            </span>
            <div className="grid grid-cols-3 gap-2">
              {['1 Day', '2-3 Days', '1 Week+'].map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`py-1.5 text-xs font-bold rounded-xl border transition ${
                    duration === d
                      ? 'bg-[#2E6B4F] text-white border-[#2E6B4F]'
                      : 'bg-gray-50 text-gray-700 border-gray-200'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-extrabold text-gray-800 block mb-1.5">
              Severity Level
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(['Mild', 'Moderate', 'Severe'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSeverity(s)}
                  className={`py-1.5 text-xs font-bold rounded-xl border transition ${
                    severity === s
                      ? s === 'Severe'
                        ? 'bg-red-600 text-white border-red-600'
                        : 'bg-[#2E6B4F] text-white border-[#2E6B4F]'
                      : 'bg-gray-50 text-gray-700 border-gray-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Next Button Footer */}
      <div className="p-3 bg-white border-t border-[#E5DEC9] sticky bottom-0">
        <button
          onClick={handleNext}
          className="w-full py-3.5 bg-[#2E6B4F] hover:bg-[#23533E] text-white font-bold rounded-2xl shadow-md flex items-center justify-center gap-2 text-sm transition active:scale-98"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
