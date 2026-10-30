import React, { useState } from 'react';
import { usePTSP } from '../../context/PTSPContext';
import { UserRole } from '../../types/ptsp';
import { 
  ShieldCheck, 
  Lock, 
  X, 
  UserCheck, 
  Briefcase, 
  GraduationCap, 
  Landmark, 
  Cross, 
  Flame, 
  Building2, 
  Crown,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';

interface LoginInternalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginInternalModal: React.FC<LoginInternalModalProps> = ({ isOpen, onClose }) => {
  const { daftarAkun, loginAsStaff, logoutToPublic } = usePTSP();
  const [selectedRole, setSelectedRole] = useState<UserRole>('operator_ptsp');

  if (!isOpen) return null;

  const handleLogin = (role: UserRole) => {
    loginAsStaff(role);
    onClose();
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'super_admin': return <Crown className="w-4 h-4 text-amber-500" />;
      case 'operator_ptsp': return <Briefcase className="w-4 h-4 text-blue-600" />;
      case 'kasi_pendis': return <GraduationCap className="w-4 h-4 text-emerald-600" />;
      case 'kasi_bimas_islam': return <Landmark className="w-4 h-4 text-teal-600" />;
      case 'penyelenggara_kristen': return <Cross className="w-4 h-4 text-indigo-600" />;
      case 'penyelenggara_hindu': return <Flame className="w-4 h-4 text-amber-600" />;
      case 'kasubbag_kepegawaian': return <Building2 className="w-4 h-4 text-purple-600" />;
      case 'kepala_kantor': return <ShieldCheck className="w-4 h-4 text-rose-600" />;
      default: return <UserCheck className="w-4 h-4 text-slate-600" />;
    }
  };

  // Only list internal staff accounts (exclude general public/pemohon)
  const internalAccounts = daftarAkun.filter(acc => acc.role !== 'pemohon');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-linear-to-r from-emerald-950 via-emerald-900 to-teal-950 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-emerald-950 font-black flex items-center justify-center shadow-md">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-800 text-emerald-200 border border-emerald-600/40">
                  Akses Terbatas ASN
                </span>
              </div>
              <h3 className="font-bold text-base text-white mt-0.5">
                Login Internal Petugas & Pejabat PTSP
              </h3>
              <p className="text-xs text-emerald-200/90">
                Pilih profil dinas Anda untuk membuka menu Operator, Admin Seksi, atau TTE
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Public Notice Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-5 py-2.5 flex items-start gap-2.5 text-xs text-amber-900">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Masyarakat & Pemohon Publik</strong> tidak perlu melakukan login untuk mengajukan permohonan, melacak resi, atau mengunduh surat resmi. Menu login ini khusus untuk aparatur dan pengelola sistem PTSP.
          </p>
        </div>

        {/* Body / List of Internal Roles */}
        <div className="p-5 overflow-y-auto space-y-2.5 flex-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            Pilih Akun Petugas / Jabatan:
          </div>

          <div className="space-y-2">
            {internalAccounts.map((acc) => {
              const isSelected = selectedRole === acc.role;
              return (
                <div
                  key={acc.id}
                  onClick={() => setSelectedRole(acc.role)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-600/20 shadow-xs'
                      : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={acc.avatar}
                      alt={acc.namaLengkap}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0 shadow-2xs"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full border ${acc.badgeColor}`}>
                          {acc.badgeLabel}
                        </span>
                        {acc.nip && (
                          <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
                            NIP. {acc.nip}
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                        {acc.namaLengkap}
                      </h4>
                      <p className="text-[11px] text-slate-600 truncate">
                        {acc.jabatan}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLogin(acc.role);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs shrink-0 flex items-center gap-1 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700'
                    }`}
                  >
                    {getRoleIcon(acc.role)}
                    <span>Masuk</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <button
            onClick={() => {
              logoutToPublic();
              onClose();
            }}
            className="text-xs text-slate-600 hover:text-emerald-800 font-semibold underline cursor-pointer"
          >
            Tetap di Mode Publik (Masyarakat)
          </button>
          
          <button
            onClick={() => handleLogin(selectedRole)}
            className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Masuk Sebagai Petugas</span>
          </button>
        </div>
      </div>
    </div>
  );
};
