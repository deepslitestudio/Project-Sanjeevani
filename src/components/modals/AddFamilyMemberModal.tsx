import React, { useState, useRef, useEffect } from 'react';
import { X, UserPlus, Upload, Camera, Trash2, CheckCircle2 } from 'lucide-react';
import { FamilyMember } from '../../types';
import {
  getDefaultGovtAvatar,
  GOVT_CARTOON_PRESETS,
  GOVT_CARTOON_CITIZEN,
} from '../../utils/govtHealthAvatars';

interface AddFamilyMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (member: FamilyMember, initialNote?: string) => void;
}

export const AddFamilyMemberModal: React.FC<AddFamilyMemberModalProps> = ({
  isOpen,
  onClose,
  onAddMember,
}) => {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Self (You)');
  const [age, setAge] = useState('28');
  const [gender, setGender] = useState('Male');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [initialCondition, setInitialCondition] = useState('');

  // Uploaded photo state (base64 Data URL)
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  // Selected Govt cartoon preset if not uploaded
  const [selectedCartoonPreset, setSelectedCartoonPreset] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compute active avatar preview:
  // 1. If user uploaded a photo -> use uploaded photo
  // 2. Else if user explicitly picked a cartoon preset -> use that cartoon
  // 3. Otherwise -> auto-pick Government Health Cartoon based on gender/age/relation
  const activeAvatar = uploadedPhoto
    ? uploadedPhoto
    : selectedCartoonPreset
    ? selectedCartoonPreset
    : getDefaultGovtAvatar({
        gender,
        age: parseInt(age) || 28,
        relation,
      });

  // Reset state when opening/closing
  useEffect(() => {
    if (!isOpen) {
      setName('');
      setRelation('Self (You)');
      setAge('28');
      setGender('Male');
      setBloodGroup('O+');
      setInitialCondition('');
      setUploadedPhoto(null);
      setSelectedCartoonPreset(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setUploadedPhoto(dataUrl);
        setSelectedCartoonPreset(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveUploadedPhoto = () => {
    setUploadedPhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newMember: FamilyMember = {
      id: 'fam-' + Date.now(),
      name: name.trim(),
      relation,
      age: parseInt(age) || 25,
      gender,
      bloodGroup,
      avatar: activeAvatar,
    };

    onAddMember(newMember, initialCondition.trim() || undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 z-50 animate-fadeIn">
      <div className="w-full max-w-sm max-h-[92vh] overflow-y-auto bg-white rounded-3xl p-5 shadow-2xl space-y-4 relative border border-[#E5DEC9]">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 border-[#E5DEC9]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#2E6B4F] flex items-center justify-center shadow-xs">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-gray-900">Add Patient / Family Member</h2>
              <p className="text-[10px] text-gray-500 font-medium">Upload photo or use Govt health cartoon</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-full transition"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Patient Photo & Government Health Cartoon Section */}
          <div className="bg-[#FBF7EE] p-3.5 rounded-2xl border border-[#E5DEC9] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-gray-800 text-[11px] uppercase tracking-wide">
                Patient Photo
              </span>
              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                {uploadedPhoto ? '✓ Custom Upload' : 'Govt Cartoon Avatar'}
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              {/* Preview Circle */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-full border-2 border-[#2E6B4F] bg-white shadow-xs p-0.5 overflow-hidden flex items-center justify-center">
                  <img
                    src={activeAvatar}
                    alt="Patient Preview"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                {uploadedPhoto && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white p-0.5 rounded-full shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              {/* Action Buttons: Upload or Remove */}
              <div className="flex-1 space-y-1.5">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleFileUpload}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2 px-3 bg-[#2E6B4F] hover:bg-[#23533E] active:scale-98 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-2xs transition"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadedPhoto ? 'Change Uploaded Photo' : 'Upload Patient Photo'}</span>
                </button>

                {uploadedPhoto ? (
                  <button
                    type="button"
                    onClick={handleRemoveUploadedPhoto}
                    className="w-full py-1 text-[11px] text-rose-600 hover:text-rose-700 font-semibold flex items-center justify-center gap-1 transition"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove & Use Govt Cartoon</span>
                  </button>
                ) : (
                  <p className="text-[10px] text-gray-500 leading-tight">
                    No photo? A Government Health cartoon character is automatically applied.
                  </p>
                )}
              </div>
            </div>

            {/* Choose Govt Health Cartoon Preset if not uploaded */}
            {!uploadedPhoto && (
              <div className="pt-2 border-t border-[#E5DEC9]/60">
                <p className="text-[10px] font-bold text-gray-600 mb-2">
                  Select Govt Health Cartoon Persona:
                </p>
                <div className="grid grid-cols-5 gap-1.5">
                  {GOVT_CARTOON_PRESETS.map((preset) => {
                    const isSelected = activeAvatar === preset.avatar;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setSelectedCartoonPreset(preset.avatar)}
                        className={`p-1 rounded-xl flex flex-col items-center gap-1 transition text-center ${
                          isSelected
                            ? 'bg-emerald-100 ring-2 ring-[#2E6B4F]'
                            : 'bg-white hover:bg-stone-100 border border-[#E5DEC9]'
                        }`}
                        title={preset.name}
                      >
                        <img
                          src={preset.avatar}
                          alt={preset.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-[8px] font-bold text-gray-700 leading-none truncate max-w-full">
                          {preset.id}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Patient Details Form Fields */}
          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Full Patient Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sita Devi, Ramesh Kumar"
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E6B4F]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Relation</label>
              <select
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E6B4F]"
              >
                <option value="Self (You)">Self (You)</option>
                <option value="Spouse">Spouse</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Son">Son</option>
                <option value="Daughter">Daughter</option>
                <option value="Grandfather">Grandfather</option>
                <option value="Grandmother">Grandmother</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Age (Years)</label>
              <input
                type="number"
                min="0"
                max="120"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E6B4F]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E6B4F]"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Blood Group</label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E6B4F]"
              >
                <option value="O+">O+</option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="AB+">AB+</option>
                <option value="O-">O-</option>
                <option value="A-">A-</option>
                <option value="B-">B-</option>
                <option value="AB-">AB-</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Initial Health Note / Known Condition (Optional)
            </label>
            <input
              type="text"
              value={initialCondition}
              onChange={(e) => setInitialCondition(e.target.value)}
              placeholder="e.g. Mild Hypertension, Diabetes, No allergies"
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E6B4F]"
            />
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#2E6B4F] text-white font-black rounded-xl hover:bg-[#23533E] active:scale-95 shadow-md transition"
            >
              Save Patient Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
