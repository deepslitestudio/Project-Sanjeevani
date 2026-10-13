import React, { useState } from 'react';
import { X, FilePlus, Calendar, User, Stethoscope } from 'lucide-react';
import { MedicalRecord } from '../../types';

interface AddRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberId: string;
  memberName: string;
  onAddRecord: (record: MedicalRecord) => void;
}

export const AddRecordModal: React.FC<AddRecordModalProps> = ({
  isOpen,
  onClose,
  memberId,
  memberName,
  onAddRecord,
}) => {
  const [title, setTitle] = useState('');
  const [doctor, setDoctor] = useState('');
  const [type, setType] = useState<MedicalRecord['type']>('Prescription');
  const [summary, setSummary] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newRecord: MedicalRecord = {
      id: 'rec-' + Date.now(),
      memberId,
      title: title.trim(),
      doctor: doctor.trim() || 'Health Worker / Self',
      date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type,
      summary: summary.trim() || 'Record entered by family member.',
    };

    onAddRecord(newRecord);
    setTitle('');
    setDoctor('');
    setSummary('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-xl space-y-4 relative">
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#2E6B4F] flex items-center justify-center">
              <FilePlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-gray-900">Add Health Record</h2>
              <p className="text-[10px] text-gray-500 font-medium">For {memberName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Title / Reason <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Fever & Cough Checkup, BP Reading"
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E6B4F]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Record Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as MedicalRecord['type'])}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E6B4F]"
              >
                <option value="Prescription">Prescription</option>
                <option value="Vitals">Vitals (BP/Sugar)</option>
                <option value="Vaccination">Vaccination</option>
                <option value="Lab Report">Lab Report</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Doctor / Clinic</label>
              <input
                type="text"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                placeholder="e.g. Dr. Kumar / PHC"
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E6B4F]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Details / Summary / Diagnosis
            </label>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="e.g. BP: 120/80 mmHg, prescribed Paracetamol 650mg, recommended 3 days rest."
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E6B4F] resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 bg-[#2E6B4F] hover:bg-[#23533E] active:scale-98 text-white font-bold rounded-2xl shadow-md transition"
          >
            Save Health Record
          </button>
        </form>
      </div>
    </div>
  );
};
