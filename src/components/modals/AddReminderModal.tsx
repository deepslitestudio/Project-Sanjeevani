import React, { useState } from 'react';
import { X, Plus, Pill } from 'lucide-react';
import { Medicine } from '../../types';

interface AddReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMedicine: (medicine: Medicine) => void;
}

export const AddReminderModal: React.FC<AddReminderModalProps> = ({
  isOpen,
  onClose,
  onAddMedicine,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('General Health');
  const [timing, setTiming] = useState('1-0-1');
  const [instructions, setInstructions] = useState('after food');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newMed: Medicine = {
      id: Date.now().toString(),
      name: name.trim(),
      category,
      timing,
      instructions: `${timing} ${instructions}`,
      timeSlots: [
        { time: '08:00 AM', taken: false, label: 'Morning' },
        { time: '08:00 PM', taken: false, label: 'Night' },
      ],
      duration: '5 Days',
    };

    onAddMedicine(newMed);
    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="w-full max-w-xs bg-white rounded-3xl p-5 shadow-xl space-y-4 relative">
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-[#2E6B4F]" />
            <h2 className="text-sm font-black text-gray-900">Add Medicine Reminder</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Medicine Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tab. Cetirizine 10mg"
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E6B4F]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E6B4F]"
            >
              <option value="General Health">General Health</option>
              <option value="Pain Reliever / Fever">Pain Reliever / Fever</option>
              <option value="Antibiotic">Antibiotic</option>
              <option value="Diabetes / BP">Diabetes / BP</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Timing</label>
              <input
                type="text"
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
                placeholder="1-1-1"
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E6B4F]"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Relation</label>
              <select
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E6B4F]"
              >
                <option value="after food">After food</option>
                <option value="before food">Before food</option>
                <option value="at bedtime">Bedtime</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 bg-[#2E6B4F] text-white font-bold rounded-2xl shadow-md hover:bg-[#23533E] transition"
          >
            Save Reminder
          </button>
        </form>
      </div>
    </div>
  );
};
