import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  AlertTriangle,
  Pill,
  ThumbsUp,
  ThumbsDown,
  Info,
  CheckCircle,
} from 'lucide-react';
import { AIRecommendation, ScreenType } from '../../types';

interface AIRecommendationScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenType) => void;
  recommendation: AIRecommendation;
}

export const AIRecommendationScreen: React.FC<AIRecommendationScreenProps> = ({
  onBack,
  onNavigate,
  recommendation,
}) => {
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);

  const defaultRec: AIRecommendation = {
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
    redFlags: ['Chest pain', 'Breathlessness', 'High fever'],
    disclaimer: 'This is not a diagnosis. Please consult a doctor if symptoms persist.',
  };

  const rec = recommendation || defaultRec;

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
        <h1 className="text-sm font-black text-gray-900">AI Recommendation</h1>
        <div className="w-5" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {/* Likely Cause Card */}
        <div className="bg-white p-4 rounded-3xl border border-[#E5DEC9] shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">
              Likely Cause
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
          <h2 className="text-base font-black text-[#2E6B4F]">
            {rec.likelyCause}
          </h2>
          <p className="text-xs text-gray-600 mt-1 font-medium">
            {rec.description || 'Based on your symptoms'}
          </p>
        </div>

        {/* Recommended Action Card */}
        <div className="bg-white p-4 rounded-3xl border border-[#E5DEC9] shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">
              Recommended Action
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-xs font-bold text-gray-800 leading-relaxed">
            {rec.recommendedAction}
          </p>
        </div>

        {/* Medicines Card */}
        <div className="bg-white p-4 rounded-3xl border border-[#E5DEC9] shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">
              Medicines
            </span>
            <button
              onClick={() => onNavigate('medicine-reminder')}
              className="text-xs font-bold text-[#2E6B4F] hover:underline"
            >
              View more
            </button>
          </div>

          <div className="space-y-2">
            {rec.medicines.map((med, idx) => (
              <div
                key={idx}
                className="bg-[#FBF7EE] p-3 rounded-2xl border border-[#E5DEC9] flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Pill className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900">
                    {med.name}
                  </h3>
                  <p className="text-[10px] text-gray-600 font-medium">
                    {med.frequency}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* When to see a doctor? (Red Flag Card) */}
        <div className="bg-amber-50 p-4 rounded-3xl border border-amber-200 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-extrabold text-amber-900 uppercase tracking-wider flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              When to see a doctor?
            </span>
            <ChevronRight className="w-4 h-4 text-amber-700" />
          </div>
          <p className="text-xs font-semibold text-amber-950 leading-relaxed">
            {rec.whenToSeeDoctor}
          </p>
        </div>

        {/* Disclaimer Banner */}
        <div className="bg-emerald-50/80 p-3.5 rounded-2xl border border-emerald-200 flex items-start gap-2.5">
          <div className="w-5 h-5 rounded-full bg-[#2E6B4F] text-white flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-xs font-black">+</span>
          </div>
          <p className="text-[11px] font-semibold text-gray-700 leading-snug">
            {rec.disclaimer}
          </p>
        </div>

        {/* Was this helpful? Feedback Loop */}
        <div className="pt-2 flex items-center justify-between px-2">
          <span className="text-xs font-bold text-gray-700">Was this helpful?</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFeedback('yes')}
              className={`p-2 rounded-xl border transition ${
                feedback === 'yes'
                  ? 'bg-[#2E6B4F] text-white border-[#2E6B4F]'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => setFeedback('no')}
              className={`p-2 rounded-xl border transition ${
                feedback === 'no'
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
