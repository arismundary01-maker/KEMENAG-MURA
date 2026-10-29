import React, { useState } from 'react';
import { usePTSP } from '../../context/PTSPContext';
import { UserRole } from '../../types/ptsp';
import { 
  Users, 
  Check, 
  X, 
  ShieldCheck, 
  Briefcase, 
  UserCheck, 
  Building2, 
  GraduationCap, 
  Landmark, 
  Cross, 
  Flame,
  LogIn,
  LogOut,
  Crown,
  KeyRound
} from 'lucide-react';

interface AccountSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountSwitcherModal: React.FC<AccountSwitcherModalProps> = ({ isOpen, onClose }) => {
  const { 
    currentRole, 
    daftarAkun,
    loginAsStaff,
    logoutToPublic
  } = usePTSP();

  const [activeTab, setActiveTab] = useState<'semua' | 'operator' | 'seksi' | 'pimpinan'>('semua');

  if (!isOpen) return null;

  const handleSelectAccount = (role: UserRole) => {
    if (role === 'pemohon') {
      logoutToPublic();
    } else {
      loginAsStaff(role);
    }
    onClose();
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'super_admin': return <Crown className="w-4 h-4 text-amber-500" />;
      case 'pemohon': return <Users className="w-4 h-4 text-emerald-600" />;
      case 'operator_ptsp': return <Briefcase className="w-4 h-4 text-blue-600" />;
      case 'kasi_pendis': return <GraduationCap className="w-4 h-4 text-emerald-600" />;
      case 'kasi_bimas_islam': return <Landmark className="w-4 h-4 text-teal-600" />;
      case 'penyelenggara_kristen': return <Cross className="w-4 h-4 text-indigo-600" />;
      case 'penyelenggara_hindu': return <Flame className="w-4 h-4 text-amber-600" />;
      case 'kasubbag_kepegawaian': return <Building2 className="w-4 h-4 text-purple-600" />;
      case 'kepala_kantor': return <ShieldCheck className="w-4 h-4 text-rose-600" />;
    }
  };

  const staffAccounts = daftarAkun.filter(a => a.role !== 'pemohon');

  const filteredAccounts = staffAccounts.filter(acc => {
    if (activeTab === 'operator') return acc.role === 'operator_ptsp';
    if (activeTab === 'seksi') {
      return ['kasi_pendis', 'kasi_bimas_islam', 'penyelenggara_kristen', 'penyelenggara_hindu', 'kasubbag_kepegawaian'].includes(acc.role);
    }
    if (activeTab === 'pimpinan') {
      return acc.role === 'kepala_kantor' || acc.role === 'super_admin';
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 text-emerald-300">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base sm:text-lg text-white">
                  Akses Masuk Petugas & ASN Kemenag
                </h3>
                <span className="text-[10px] bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-400/30 font-bold">
                  Internal PTSP
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 mt-0.5">
                Masyarakat umum dapat mengakses layanan langsung tanpa akun login. Panel ini khusus operasional dinas ASN.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Public vs Staff State Banner */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs text-slate-700">
              Status Anda saat ini:{' '}
              <span className="font-black text-slate-900">
                {currentRole === 'pemohon' ? 'Pengguna Publik (Masyarakat Umum)' : currentRole.replace(/_/g, ' ').toUpperCase()}
              </span>
            </span>
          </div>

          {currentRole !== 'pemohon' ? (
            <button
              onClick={() => {
                logoutToPublic();
                onClose();
              }}
              className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar ke Mode Publik</span>
            </button>
          ) : (
            <div className="text-[11px] text-emerald-700 font-bold bg-emerald-100/70 border border-emerald-300 px-2.5 py-1 rounded-lg">
              ✓ Akses Publik Aktif (Bebas Akses Tanpa Login)
            </div>
          )}
        </div>

        {/* Category Tabs */}
        <div className="px-5 pt-3 pb-2 border-b border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'semua', label: 'Semua Akun Dinas', count: staffAccounts.length },
            { id: 'operator', label: 'Operator Front Office', count: staffAccounts.filter(a => a.role === 'operator_ptsp').length },
            { id: 'seksi', label: 'Seksi Teknis (Pendis/Bimas/TU)', count: staffAccounts.filter(a => ['kasi_pendis', 'kasi_bimas_islam', 'penyelenggara_kristen', 'penyelenggara_hindu', 'kasubbag_kepegawaian'].includes(a.role)).length },
            { id: 'pimpinan', label: 'Pimpinan & Super Admin', count: staffAccounts.filter(a => a.role === 'kepala_kantor' || a.role === 'super_admin').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === tab.id ? 'bg-emerald-950 text-emerald-200' : 'bg-slate-200 text-slate-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1 max-h-[50vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredAccounts.map((acc) => {
              const isCurrent = currentRole === acc.role;
              return (
                <div
                  key={acc.id}
                  onClick={() => handleSelectAccount(acc.role)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between hover:shadow-md ${
                    isCurrent 
                      ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-600/20 shadow-xs' 
                      : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50/70'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img 
                      src={acc.avatar} 
                      alt={acc.namaLengkap} 
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-2xs shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${acc.badgeColor}`}>
                          {acc.badgeLabel}
                        </span>
                        {isCurrent && (
                          <span className="flex items-center gap-1 text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                            <Check className="w-3 h-3 text-emerald-600" /> Sedang Aktif
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">{acc.namaLengkap}</h4>
                      <p className="text-[11px] text-slate-600 font-medium truncate">{acc.jabatan}</p>
                      {acc.nip && (
                        <p className="text-[10px] text-slate-500 font-mono">NIP: {acc.nip}</p>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 mt-2 line-clamp-2 bg-white/80 p-2 rounded-xl border border-slate-100">
                    {acc.deskripsiTugas}
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-mono">@{acc.username}</span>
                    <button 
                      type="button"
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shadow-2xs ${
                        isCurrent 
                          ? 'bg-emerald-700 text-white' 
                          : 'bg-emerald-50 hover:bg-emerald-600 text-emerald-900 hover:text-white border border-emerald-200 hover:border-emerald-600'
                      }`}
                    >
                      {getRoleIcon(acc.role)}
                      <span>{isCurrent ? 'Akun Aktif' : 'Masuk Akun Ini'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
          <span className="text-[11px]">
            *Pengguna publik/warga tidak memerlukan login untuk mengajukan permohonan dan mengecek resi.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl transition-colors cursor-pointer text-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

