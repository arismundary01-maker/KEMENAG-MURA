import React, { useState } from 'react';
import { usePTSP } from '../../context/PTSPContext';
import { DAFTAR_AKUN_SISTEM } from '../../data/initialData';
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
  Flame 
} from 'lucide-react';

interface AccountSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountSwitcherModal: React.FC<AccountSwitcherModalProps> = ({ isOpen, onClose }) => {
  const { currentRole, setCurrentRole, setActiveView, setSelectedSeksiTab, daftarAkun } = usePTSP();
  const [selectedAccRole, setSelectedAccRole] = useState<UserRole>(currentRole);

  if (!isOpen) return null;

  const handleSelectAccount = (role: UserRole) => {
    setCurrentRole(role);
    setSelectedAccRole(role);

    // Auto-navigate to appropriate view based on role
    if (role === 'super_admin') {
      setActiveView('super_admin_portal');
    } else if (role === 'pemohon') {
      setActiveView('public_portal');
    } else if (role === 'operator_ptsp') {
      setActiveView('operator_portal');
    } else if (role === 'kasi_pendis') {
      setSelectedSeksiTab('pendis');
      setActiveView('seksi_dashboard');
    } else if (role === 'kasi_bimas_islam') {
      setSelectedSeksiTab('bimas_islam');
      setActiveView('seksi_dashboard');
    } else if (role === 'penyelenggara_kristen') {
      setSelectedSeksiTab('bimas_kristen');
      setActiveView('seksi_dashboard');
    } else if (role === 'penyelenggara_hindu') {
      setSelectedSeksiTab('bimas_hindu');
      setActiveView('seksi_dashboard');
    } else if (role === 'kasubbag_kepegawaian') {
      setSelectedSeksiTab('kepegawaian');
      setActiveView('seksi_dashboard');
    } else if (role === 'kepala_kantor') {
      setActiveView('kakan_tte');
    }

    onClose();
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'super_admin': return <ShieldCheck className="w-5 h-5 text-red-600" />;
      case 'pemohon': return <Users className="w-5 h-5 text-emerald-600" />;
      case 'operator_ptsp': return <Briefcase className="w-5 h-5 text-blue-600" />;
      case 'kasi_pendis': return <GraduationCap className="w-5 h-5 text-emerald-600" />;
      case 'kasi_bimas_islam': return <Landmark className="w-5 h-5 text-teal-600" />;
      case 'penyelenggara_kristen': return <Cross className="w-5 h-5 text-indigo-600" />;
      case 'penyelenggara_hindu': return <Flame className="w-5 h-5 text-amber-600" />;
      case 'kasubbag_kepegawaian': return <Building2 className="w-5 h-5 text-purple-600" />;
      case 'kepala_kantor': return <ShieldCheck className="w-5 h-5 text-rose-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-linear-to-r from-emerald-800 to-emerald-950 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <UserCheck className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Beralih Akun & Hak Akses PTSP</h3>
              <p className="text-xs text-emerald-200">Pilih role petugas atau pemohon untuk menguji seluruh alur pelayanan</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto space-y-3 divide-y divide-slate-100 flex-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider pb-1">
            Akun Sistem Terdaftar (Kemenag Kab. Murung Raya)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {daftarAkun.map((acc) => {
              const isCurrent = currentRole === acc.role;
              return (
                <div
                  key={acc.id}
                  onClick={() => handleSelectAccount(acc.role)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between hover:shadow-md ${
                    isCurrent 
                      ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20 shadow-xs' 
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
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${acc.badgeColor}`}>
                          {acc.badgeLabel}
                        </span>
                        {isCurrent && (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                            <Check className="w-3.5 h-3.5" /> Aktif
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 truncate">{acc.namaLengkap}</h4>
                      <p className="text-xs text-slate-600 font-medium truncate">{acc.jabatan}</p>
                      {acc.nip && (
                        <p className="text-[11px] text-slate-500 font-mono">NIP: {acc.nip}</p>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 mt-2 line-clamp-2 bg-white/70 p-1.5 rounded border border-slate-100">
                    {acc.deskripsiTugas}
                  </p>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-mono">@{acc.username}</span>
                    <button 
                      type="button"
                      className={`text-xs font-semibold px-3 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                        isCurrent 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-slate-100 text-slate-700 hover:bg-emerald-600 hover:text-white'
                      }`}
                    >
                      {getRoleIcon(acc.role)}
                      {isCurrent ? 'Sedang Digunakan' : 'Gunakan Akun'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>*Seluruh akun dilengkapi hak akses instan untuk memverifikasi proses approval dokumen & TTE</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
