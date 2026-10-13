import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Plus,
  ChevronRight,
  ClipboardList,
  Syringe,
  Activity,
  FileText,
  UserPlus,
  Trash2,
  Heart,
  Calendar,
  Upload,
  Camera,
  RotateCcw,
} from 'lucide-react';
import { FamilyMember, MedicalRecord } from '../../types';
import {
  getDefaultGovtAvatar,
  GOVT_CARTOON_CITIZEN,
} from '../../utils/govtHealthAvatars';

interface FamilyRecordsScreenProps {
  onBack: () => void;
  onNavigate: (screen: any) => void;
  familyMembers: FamilyMember[];
  records: MedicalRecord[];
  onOpenAddMemberModal: () => void;
  onOpenAddRecordModal: (memberId: string, memberName: string) => void;
  onDeleteMember?: (memberId: string) => void;
  onDeleteRecord?: (recordId: string) => void;
  onUpdateMemberAvatar?: (memberId: string, avatar: string) => void;
  onRestoreDefaultData?: () => void;
}

export const FamilyRecordsScreen: React.FC<FamilyRecordsScreenProps> = ({
  onBack,
  onNavigate,
  familyMembers,
  records,
  onOpenAddMemberModal,
  onOpenAddRecordModal,
  onDeleteMember,
  onDeleteRecord,
  onUpdateMemberAvatar,
  onRestoreDefaultData,
}) => {
  const [selectedMemberId, setSelectedMemberId] = useState<string>('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync selectedMemberId with available family members
  useEffect(() => {
    if (familyMembers.length > 0) {
      const exists = familyMembers.some((m) => m.id === selectedMemberId);
      if (!exists) {
        setSelectedMemberId(familyMembers[0].id);
      }
    } else {
      setSelectedMemberId('');
    }
  }, [familyMembers, selectedMemberId]);

  const activeMember = familyMembers.find((m) => m.id === selectedMemberId);

  // Helper to ensure avatar is never an external unsplash photo
  const getSafeAvatar = (member: FamilyMember) => {
    if (member.avatar && !member.avatar.includes('unsplash.com')) {
      return member.avatar;
    }
    return getDefaultGovtAvatar(member);
  };

  const handleInlinePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeMember || !onUpdateMemberAvatar) return;

    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onUpdateMemberAvatar(activeMember.id, dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetToGovtCartoon = () => {
    if (!activeMember || !onUpdateMemberAvatar) return;
    const cartoon = getDefaultGovtAvatar(activeMember);
    onUpdateMemberAvatar(activeMember.id, cartoon);
  };

  // Filter records for active member
  const memberRecords = activeMember
    ? records.filter((r) => r.memberId === activeMember.id)
    : [];

  const filteredRecords = activeCategoryFilter === 'All'
    ? memberRecords
    : memberRecords.filter((r) => r.type === activeCategoryFilter);

  return (
    <div className="flex-1 flex flex-col bg-[#FBF7EE] text-gray-800 animate-fadeIn">
      {/* Top Header */}
      <div className="p-3 bg-white border-b border-[#E5DEC9] flex items-center justify-between sticky top-0 z-20 shadow-xs">
        <button
          onClick={onBack}
          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-700 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-black text-gray-900">Family & Health Records</h1>
        <button
          onClick={onOpenAddMemberModal}
          className="px-3 py-1 bg-[#2E6B4F] text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-2xs hover:bg-[#23533E] active:scale-95 transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Family Member Avatars & Add Member Row */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {/* Add Member Button */}
          <button
            onClick={onOpenAddMemberModal}
            className="flex flex-col items-center shrink-0 group active:scale-95 transition"
            title="Add Patient / Family Member"
          >
            <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#2E6B4F] bg-emerald-50 text-[#2E6B4F] flex items-center justify-center shadow-2xs group-hover:bg-emerald-100 transition">
              <Plus className="w-6 h-6 text-[#2E6B4F]" />
            </div>
            <span className="text-xs font-black text-[#2E6B4F] mt-1">+ Add</span>
            <span className="text-[10px] text-gray-500 font-medium">Patient</span>
          </button>

          {/* User-Added Family Members with Govt Health cartoon or uploaded photo */}
          {familyMembers.map((member) => {
            const isSelected = member.id === selectedMemberId;
            const avatarSrc = getSafeAvatar(member);

            return (
              <button
                key={member.id}
                onClick={() => setSelectedMemberId(member.id)}
                className="flex flex-col items-center shrink-0 group active:scale-95 transition"
              >
                <div
                  className={`relative w-14 h-14 rounded-full p-0.5 transition ${
                    isSelected
                      ? 'ring-3 ring-[#2E6B4F] ring-offset-2 scale-105'
                      : 'opacity-80 group-hover:opacity-100'
                  }`}
                >
                  <img
                    src={avatarSrc}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover shadow-2xs bg-stone-100 border border-[#E5DEC9]"
                  />
                  {isSelected && (
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#2E6B4F] text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-2xs">
                      ✓
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold text-gray-900 mt-1 max-w-[68px] truncate">
                  {member.name}
                </span>
                <span className="text-[10px] text-gray-500 font-medium max-w-[68px] truncate">
                  {member.relation}
                </span>
              </button>
            );
          })}
        </div>

        {/* If no members added yet: friendly prompt with Add Button */}
        {!activeMember ? (
          <div className="bg-white p-6 rounded-3xl border border-[#E5DEC9] shadow-xs text-center space-y-3.5 my-2">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 text-[#2E6B4F] flex items-center justify-center mx-auto shadow-inner overflow-hidden">
              <img
                src={GOVT_CARTOON_CITIZEN}
                alt="Govt Health Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-sm font-black text-gray-900">
                No Patient Data Added Yet
              </h3>
              <p className="text-xs text-gray-600 mt-1 max-w-xs mx-auto leading-relaxed">
                Click <strong>+ Add</strong> to fill details (Name, Age, Relation, Blood Group) and upload a patient photo or use a Government Health cartoon avatar.
              </p>
            </div>
            <div className="space-y-2 pt-1">
              <button
                onClick={onOpenAddMemberModal}
                className="w-full py-3 bg-[#2E6B4F] hover:bg-[#23533E] active:scale-98 text-white text-xs font-black rounded-2xl shadow-md flex items-center justify-center gap-2 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add Patient Details</span>
              </button>

              {onRestoreDefaultData && (
                <button
                  onClick={onRestoreDefaultData}
                  className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100/80 active:scale-98 text-[#2E6B4F] border border-emerald-200 text-xs font-bold rounded-2xl flex items-center justify-center gap-1.5 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Sample Family & Health Records</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Selected Member Profile Card with Upload Photo & Cartoon Avatar */}
            <div className="bg-white p-4 rounded-3xl border border-[#E5DEC9] shadow-2xs space-y-3">
              <div className="flex items-center gap-3">
                {/* Avatar with quick Upload button overlay */}
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-full border-2 border-[#2E6B4F] p-0.5 bg-stone-50 overflow-hidden shadow-xs">
                    <img
                      src={getSafeAvatar(activeMember)}
                      alt={activeMember.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>

                {/* Patient Information */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black text-gray-900 truncate">
                      {activeMember.name}
                    </h3>
                    {onDeleteMember && (
                      <button
                        onClick={() => onDeleteMember(activeMember.id)}
                        className="text-gray-400 hover:text-red-600 p-1 rounded transition"
                        title="Delete patient profile"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] font-semibold text-[#2E6B4F]">
                    {activeMember.relation} • {activeMember.gender}
                  </p>
                  <p className="text-[10px] text-gray-500 font-medium">
                    Age: {activeMember.age} yrs • Blood Group: {activeMember.bloodGroup}
                  </p>
                </div>
              </div>

              {/* Upload Image & Avatar Controls Bar */}
              <div className="pt-2 border-t border-[#E5DEC9]/70 flex items-center justify-between gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleInlinePhotoUpload}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#2E6B4F] border border-[#2E6B4F]/30 rounded-xl text-[10px] font-bold flex items-center gap-1.5 transition active:scale-95"
                >
                  <Upload className="w-3 h-3" />
                  <span>Upload Image</span>
                </button>

                {onUpdateMemberAvatar && (
                  <button
                    type="button"
                    onClick={handleResetToGovtCartoon}
                    className="px-2.5 py-1.5 text-gray-600 hover:text-gray-900 border border-gray-200 rounded-xl text-[10px] font-medium flex items-center gap-1 transition hover:bg-gray-50 active:scale-95"
                    title="Switch to Government Health cartoon avatar"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Use Govt Cartoon</span>
                  </button>
                )}

                <button
                  onClick={() => onOpenAddRecordModal(activeMember.id, activeMember.name)}
                  className="px-3 py-1.5 bg-[#2E6B4F] hover:bg-[#23533E] text-white rounded-xl text-[10px] font-bold flex items-center gap-1 shadow-2xs transition active:scale-95 ml-auto"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Record</span>
                </button>
              </div>
            </div>

            {/* Categories Filter Cards */}
            <div className="space-y-2">
              {/* Prescriptions */}
              <div
                onClick={() => setActiveCategoryFilter(activeCategoryFilter === 'Prescription' ? 'All' : 'Prescription')}
                className={`bg-white p-3 rounded-2xl border shadow-2xs flex items-center justify-between hover:bg-gray-50 transition cursor-pointer active:scale-99 ${
                  activeCategoryFilter === 'Prescription' ? 'border-[#2E6B4F] ring-1 ring-[#2E6B4F]' : 'border-[#E5DEC9]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                    <ClipboardList className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900">
                      Prescriptions & Consultations
                    </h3>
                    <p className="text-[10px] text-gray-500 font-medium">
                      Doctor visits & prescriptions
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>

              {/* Vaccinations */}
              <div
                onClick={() => setActiveCategoryFilter(activeCategoryFilter === 'Vaccination' ? 'All' : 'Vaccination')}
                className={`bg-white p-3 rounded-2xl border shadow-2xs flex items-center justify-between hover:bg-gray-50 transition cursor-pointer active:scale-99 ${
                  activeCategoryFilter === 'Vaccination' ? 'border-[#2E6B4F] ring-1 ring-[#2E6B4F]' : 'border-[#E5DEC9]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Syringe className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900">Vaccinations</h3>
                    <p className="text-[10px] text-gray-500 font-medium">
                      Immunization history
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>

              {/* Vitals History */}
              <div
                onClick={() => setActiveCategoryFilter(activeCategoryFilter === 'Vitals' ? 'All' : 'Vitals')}
                className={`bg-white p-3 rounded-2xl border shadow-2xs flex items-center justify-between hover:bg-gray-50 transition cursor-pointer active:scale-99 ${
                  activeCategoryFilter === 'Vitals' ? 'border-[#2E6B4F] ring-1 ring-[#2E6B4F]' : 'border-[#E5DEC9]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900">Vitals History</h3>
                    <p className="text-[10px] text-gray-500 font-medium">
                      BP, Sugar & Pulse records
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Member Medical Record History Feed */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider">
                  Health History ({activeMember.name})
                </h3>
                <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-full border border-[#E5DEC9]">
                  {filteredRecords.length} records
                </span>
              </div>

              {filteredRecords.length === 0 ? (
                <div className="bg-white p-5 rounded-2xl border border-dashed border-[#E5DEC9] text-center space-y-2">
                  <p className="text-xs text-gray-600 font-medium">
                    No medical records added yet for {activeMember.name}
                  </p>
                  <button
                    onClick={() => onOpenAddRecordModal(activeMember.id, activeMember.name)}
                    className="px-4 py-2 bg-[#2E6B4F] hover:bg-[#23533E] text-white text-xs font-bold rounded-xl shadow-2xs inline-flex items-center gap-1.5 transition active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add First Health Record</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredRecords.map((rec) => (
                    <div
                      key={rec.id}
                      className="bg-white p-3 rounded-2xl border border-[#E5DEC9] shadow-2xs space-y-1.5 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-gray-900">
                          {rec.title}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-semibold text-gray-500">
                            {rec.date}
                          </span>
                          {onDeleteRecord && (
                            <button
                              onClick={() => onDeleteRecord(rec.id)}
                              className="text-gray-300 hover:text-red-500 transition p-0.5"
                              title="Delete record"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {rec.type}
                        </span>
                        <p className="text-[11px] text-gray-600 font-medium">
                          Doctor: {rec.doctor}
                        </p>
                      </div>
                      <p className="text-[10px] text-gray-600 italic bg-gray-50 p-2 rounded-xl">
                        "{rec.summary}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
