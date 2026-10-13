import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  Pill,
  Clock,
  CheckCircle2,
  Circle,
  Plus,
} from 'lucide-react';
import { Medicine } from '../../types';

interface MedicineReminderScreenProps {
  onBack: () => void;
  medicines: Medicine[];
  onToggleTakeMedicine: (medId: string, slotIdx: number) => void;
  onOpenAddModal: () => void;
}

export const MedicineReminderScreen: React.FC<
  MedicineReminderScreenProps
> = ({ onBack, medicines, onToggleTakeMedicine, onOpenAddModal }) => {
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
        <h1 className="text-sm font-black text-gray-900">Medicine Reminder</h1>
        <div className="w-5" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Upcoming Reminder Card */}
        {medicines.length > 0 ? (
          <div className="bg-white p-4 rounded-3xl border border-[#E5DEC9] shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">
                Upcoming Reminder
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>

            <div className="bg-[#FBF7EE] p-3 rounded-2xl border border-[#E5DEC9] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900">
                    {medicines[0].name}
                  </h3>
                  <p className="text-[10px] text-gray-500 font-medium">
                    {medicines[0].instructions || medicines[0].timing}
                  </p>
                </div>
              </div>

              <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-2xs">
                <Clock className="w-3.5 h-3.5" />
                {medicines[0].timeSlots[0]?.time || '08:00 AM'}
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-white p-5 rounded-3xl border border-[#E5DEC9] shadow-2xs text-center space-y-2 py-6">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#2E6B4F] flex items-center justify-center mx-auto">
              <Pill className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-bold text-gray-900">No Pre-Fetched Medicines</h3>
            <p className="text-[10px] text-gray-500 max-w-xs mx-auto">
              Tap "Add Reminder" below to schedule your medicines and dose timings.
            </p>
          </div>
        )}

        {/* Today's Schedule List */}
        <div>
          <h2 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider mb-2">
            Today's Schedule
          </h2>

          {medicines.length === 0 ? (
            <div className="bg-white p-4 rounded-2xl border border-dashed border-[#E5DEC9] text-center text-xs text-gray-500">
              No medicines scheduled for today.
            </div>
          ) : (

          <div className="space-y-2.5">
            {medicines.flatMap((med) =>
              med.timeSlots.map((slot, idx) => (
                <div
                  key={`${med.id}-${idx}`}
                  onClick={() => onToggleTakeMedicine(med.id, idx)}
                  className={`bg-white p-3.5 rounded-2xl border transition shadow-2xs flex items-center justify-between cursor-pointer active:scale-98 ${
                    slot.taken
                      ? 'border-[#B8D7C4] bg-[#F3F8F4]'
                      : 'border-[#E5DEC9] hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-gray-800 bg-gray-100 px-2.5 py-1 rounded-xl">
                      {slot.time}
                    </span>
                    <div>
                      <h3
                        className={`text-xs font-bold ${
                          slot.taken
                            ? 'line-through text-gray-500'
                            : 'text-gray-900'
                        }`}
                      >
                        {med.name}
                      </h3>
                      <p className="text-[10px] text-gray-500 font-medium">
                        {med.timing} ({slot.label})
                      </p>
                    </div>
                  </div>

                  {/* Interactive Checkbox */}
                  <button className="p-1 text-[#2E6B4F]">
                    {slot.taken ? (
                      <CheckCircle2 className="w-5 h-5 fill-emerald-600 text-white" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300" />
                    )}
                  </button>
                </div>
              ))
            )}
          </div>
          )}
        </div>
      </div>

      {/* Add Reminder CTA Button */}
      <div className="p-3 bg-white border-t border-[#E5DEC9] sticky bottom-0">
        <button
          onClick={onOpenAddModal}
          className="w-full py-3.5 bg-[#2E6B4F] hover:bg-[#23533E] text-white font-bold rounded-2xl shadow-md flex items-center justify-center gap-2 text-sm transition active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Add Reminder</span>
        </button>
      </div>
    </div>
  );
};
