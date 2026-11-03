import React, { useState, useEffect } from 'react';
import { usePTSP } from '../../context/PTSPContext';
import { DAFTAR_AKUN_SISTEM, SEKSI_CONFIG, getSeksiByRole } from '../../data/initialData';
import { SeksiType } from '../../types/ptsp';
import { 
  Bell, 
  Volume2, 
  VolumeX, 
  UserCheck, 
  Search, 
  FileText, 
  CheckCircle2, 
  ExternalLink,
  Menu,
  X,
  FileCheck2,
  Clock,
  Layers,
  Sparkles,
  ShieldAlert,
  Crown,
  LogIn,
  LogOut,
  Users,
  Globe,
  GraduationCap,
  Landmark,
  Cross,
  Flame,
  Building2
} from 'lucide-react';
import { AccountSwitcherModal } from './AccountSwitcherModal';

interface HeaderProps {
  onOpenPermohonanModal: () => void;
  onOpenTrackingModal: () => void;
  onOpenValidatorModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenPermohonanModal, 
  onOpenTrackingModal,
  onOpenValidatorModal
}) => {
  const { 
    currentRole, 
    activeView, 
    setActiveView, 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead,
    soundEnabled, 
    toggleSound,
    setSelectedTrackingResi,
    selectedSeksiTab,
    setSelectedSeksiTab,
    permohonanList,
    daftarAkun,
    pengaturanWeb,
    logoutToPublic
  } = usePTSP();

  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const roleSeksi = getSeksiByRole(currentRole);

  const getSeksiNavIcon = (seksi: SeksiType) => {
    switch (seksi) {
      case 'pendis': return <GraduationCap className="w-3.5 h-3.5" />;
      case 'bimas_islam': return <Landmark className="w-3.5 h-3.5" />;
      case 'bimas_kristen': return <Cross className="w-3.5 h-3.5" />;
      case 'bimas_hindu': return <Flame className="w-3.5 h-3.5" />;
      case 'kepegawaian': return <Building2 className="w-3.5 h-3.5" />;
    }
  };

  const activeAccount = daftarAkun.find(acc => acc.role === currentRole) || DAFTAR_AKUN_SISTEM.find(acc => acc.role === currentRole) || DAFTAR_AKUN_SISTEM[0];
  const isPublic = currentRole === 'pemohon';

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const query = searchQuery.trim().toUpperCase();
    
    // Check if matching resi
    const match = permohonanList.find(p => p.nomorResi.toUpperCase().includes(query));
    if (match) {
      setSelectedTrackingResi(match.nomorResi);
      setActiveView('tracking_view');
    } else {
      setSelectedTrackingResi(query);
      setActiveView('tracking_view');
    }
    setSearchQuery('');
  };

  return (
    <>
      <header 
        className="sticky top-0 z-40 relative text-white backdrop-blur-md shadow-md border-b border-[#33CC66]/35"
        style={{ backgroundColor: 'rgba(51, 204, 102, 0.35)' }}
      >
        {/* Content Container (Header 2 & Header 3 Terpadu) */}
        <div className="relative z-10">
          {/* Main Header Container (Header 2) - Identitas Resmi Kementerian Agama */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            {/* Logo & Office Title */}
            <div 
              onClick={() => setActiveView('public_portal')}
              className="flex items-center gap-3 sm:gap-4 cursor-pointer group select-none min-w-0"
            >
              {/* Logo Resmi Kementerian Agama RI */}
              <div className="relative shrink-0 flex items-center justify-center">
                <img 
                  src="/assets/aistudio/Kementerian_Agama_new_logo_f9b3eec1.png" 
                  alt="Logo Kementerian Agama Republik Indonesia" 
                  className="w-12 h-12 sm:w-15 sm:h-15 object-contain drop-shadow-md transition-transform duration-200 group-hover:scale-105"
                />
              </div>

              {/* Hanya ada tulisan: PTSP (Pelayanan Terpadu Satu Pintu) Kemenag Mura */}
              <div className="flex items-center min-w-0">
                <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-black text-white tracking-tight leading-snug group-hover:text-amber-300 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                  PTSP (Pelayanan Terpadu Satu Pintu) Kemenag Mura
                </h1>
              </div>
            </div>

            {/* Quick Resi Search Bar - Tampilan Fresh & Rounded Modern */}
            <form onSubmit={handleQuickSearch} className="hidden lg:flex items-center relative max-w-xs xl:max-w-sm w-full mx-2">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Lacak No. Resi PTSP: e.g. 0038"
                  className="w-full text-xs pl-9 pr-18 py-2 rounded-full bg-white/15 hover:bg-white/20 focus:bg-white text-white focus:text-slate-900 placeholder:text-emerald-100/70 focus:placeholder:text-slate-400 font-semibold shadow-inner outline-none ring-1 ring-white/25 focus:ring-2 focus:ring-amber-400 transition-all"
                />
                <Search className="w-4 h-4 text-emerald-100 absolute left-3 top-2.5 pointer-events-none" />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 text-[11px] font-black rounded-full transition-all cursor-pointer shadow-xs"
                >
                  Lacak
                </button>
              </div>
            </form>

          {/* Right Action Icons: Notification, User Role Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Real-time Notification & Audio Toggle - Hanya untuk Petugas Internal */}
            {!isPublic && (
              <>
                <button
                  onClick={toggleSound}
                  title={soundEnabled ? 'Notifikasi Suara Aktif (Klik untuk heningkan)' : 'Notifikasi Suara Hening (Klik untuk aktifkan)'}
                  className="p-2 sm:p-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-all cursor-pointer shadow-xs"
                >
                  {soundEnabled ? (
                    <Volume2 className="w-5 h-5 text-amber-300" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-white/60" />
                  )}
                </button>

                <div className="relative">
                  <button
                    onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
                    className="relative p-2 sm:p-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-all cursor-pointer shadow-xs"
                    title="Notifikasi Real-Time Kemenag"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center animate-bounce shadow-xs">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notification Dropdown Drawer */}
                  {isNotifDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150 text-slate-800">
                      <div className="bg-gradient-to-r from-[#036237] to-[#02562f] text-white p-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-amber-300" />
                          <span className="font-bold text-sm">Notifikasi PTSP Real-time</span>
                          {unreadCount > 0 && (
                            <span className="text-[10px] bg-rose-600 text-white font-bold px-1.5 py-0.2 rounded-full">
                              {unreadCount} Baru
                            </span>
                          )}
                        </div>
                        {unreadCount > 0 && (
                          <button 
                            onClick={markAllAsRead}
                            className="text-[11px] text-amber-300 hover:text-white underline cursor-pointer"
                          >
                            Tandai semua dibaca
                          </button>
                        )}
                      </div>

                      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 p-1">
                        {notifications.length === 0 ? (
                          <div className="p-6 text-center text-xs text-slate-500">
                            Tidak ada notifikasi saat ini
                          </div>
                        ) : (
                          notifications.map(notif => (
                            <div 
                              key={notif.id}
                              onClick={() => {
                                markAsRead(notif.id);
                                if (notif.resiPermohonan) {
                                  setSelectedTrackingResi(notif.resiPermohonan);
                                  setActiveView('tracking_view');
                                  setIsNotifDropdownOpen(false);
                                }
                              }}
                              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                                !notif.dibaca ? 'bg-emerald-50/70 hover:bg-emerald-100/60 font-medium' : 'hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span className="font-bold text-xs text-slate-900">{notif.judul}</span>
                                <span className="text-[10px] text-slate-600 font-mono">{notif.waktu}</span>
                              </div>
                              <p className="text-xs text-slate-600 line-clamp-2">{notif.pesan}</p>
                              {notif.resiPermohonan && (
                                <span className="mt-1.5 inline-block text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                                  {notif.resiPermohonan}
                                </span>
                              )}
                            </div>
                          ))
                        )}
                      </div>

                      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                        <button 
                          onClick={() => setIsNotifDropdownOpen(false)}
                          className="text-xs font-bold text-emerald-800 hover:text-emerald-950 cursor-pointer"
                        >
                          Tutup Notifikasi
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Public vs Staff Header Controls */}
            {isPublic ? (
              <div className="flex items-center gap-2.5">
                <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-xs shadow-xs">
                  <Users className="w-3.5 h-3.5 text-amber-300" />
                  <span>Pengguna Publik</span>
                </div>

                <button
                  onClick={() => setIsAccountModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                  title="Akses Masuk Petugas / ASN Kemenag"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login Petugas / ASN</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {/* Staff Account Info & Switcher Button - Disembunyikan saat login sebagai operator sesuai permintaan user */}
                {currentRole !== 'operator_ptsp' && (
                  <button
                    onClick={() => setIsAccountModalOpen(true)}
                    className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 transition-all text-left shadow-xs group cursor-pointer text-white"
                    title="Ganti Akun Petugas / ASN Kemenag"
                  >
                    <img 
                      src={activeAccount.avatar} 
                      alt={activeAccount.namaLengkap} 
                      className="w-8 h-8 rounded-lg object-cover shadow-2xs group-hover:ring-2 group-hover:ring-amber-300"
                    />
                    <div className="hidden sm:block">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full border ${activeAccount.badgeColor}`}>
                          {activeAccount.badgeLabel}
                        </span>
                      </div>
                      <p className="text-xs font-black text-white leading-tight truncate max-w-[130px]">
                        {activeAccount.namaLengkap}
                      </p>
                    </div>
                    <UserCheck className="w-4 h-4 text-amber-300 group-hover:text-amber-200" />
                  </button>
                )}

                {/* Logout to Public Button */}
                <button
                  onClick={logoutToPublic}
                  className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  title="Keluar dari Akun Petugas (Kembali ke Mode Publik Masyarakat)"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Keluar</span>
                </button>
              </div>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-white bg-white/15 hover:bg-white/25 cursor-pointer transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Navigation Bar (Desktop) - Header 3 (Pita Navigasi Bersih & Fresh Kemenag) */}
        <div 
          className="backdrop-blur-md border-t border-[#33CC66]/30 px-4 sm:px-6"
          style={{ backgroundColor: 'rgba(51, 204, 102, 0.20)' }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto py-2 scrollbar-none">
            {isPublic ? (
              /* =========================================================================
                 PUBLIC USER NAVIGATION: Menampilkan menu layanan masyarakat nuansa Kemenag
                 ========================================================================= */
              <nav className="flex items-center gap-2 text-sm sm:text-base font-bold">
                <button
                  onClick={() => setActiveView('public_portal')}
                  className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm sm:text-[15px] font-black ${
                    activeView === 'public_portal'
                      ? 'bg-white text-emerald-950 shadow-md'
                      : 'bg-white/10 hover:bg-white/20 text-emerald-50 hover:text-white shadow-xs'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Beranda PTSP</span>
                </button>

                <button
                  onClick={() => {
                    if (activeView !== 'public_portal') {
                      setActiveView('public_portal');
                    }
                    setTimeout(() => {
                      document.getElementById('katalog-layanan')?.scrollIntoView({ behavior: 'smooth' });
                    }, 80);
                  }}
                  className="px-4 py-2 rounded-xl transition-all flex items-center gap-2 bg-white/10 hover:bg-white/20 text-emerald-50 hover:text-white text-sm sm:text-[15px] font-black whitespace-nowrap cursor-pointer shadow-xs"
                >
                  <FileText className="w-4 h-4" />
                  <span>Katalog Layanan</span>
                </button>

                <button
                  onClick={onOpenPermohonanModal}
                  className="px-4 py-2 rounded-xl transition-all flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 text-sm sm:text-[15px] font-black whitespace-nowrap shadow-md cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>+ Ajukan Permohonan</span>
                </button>

                <button
                  onClick={() => setActiveView('tracking_view')}
                  className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm sm:text-[15px] font-black ${
                    activeView === 'tracking_view'
                      ? 'bg-white text-emerald-950 shadow-md'
                      : 'bg-white/10 hover:bg-white/20 text-emerald-50 hover:text-white shadow-xs'
                  }`}
                >
                  <Search className="w-4 h-4" />
                  <span>Pelacakan Status Online</span>
                </button>
              </nav>
            ) : (
              /* =========================================================================
                 STAFF / ASN NAVIGATION: Menampilkan menu operasional dinas sesuai peran
                 ========================================================================= */
              <nav className="flex items-center gap-2 text-sm sm:text-base font-bold">
                <button
                  onClick={() => setActiveView('public_portal')}
                  className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm sm:text-[15px] font-black ${
                    activeView === 'public_portal'
                      ? 'bg-white text-emerald-950 shadow-md'
                      : 'bg-white/10 hover:bg-white/20 text-emerald-50 hover:text-white shadow-xs'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Beranda PTSP</span>
                </button>

                <button
                  onClick={() => setActiveView('tracking_view')}
                  className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm sm:text-[15px] font-black ${
                    activeView === 'tracking_view'
                      ? 'bg-white text-emerald-950 shadow-md'
                      : 'bg-white/10 hover:bg-white/20 text-emerald-50 hover:text-white shadow-xs'
                  }`}
                >
                  <Search className="w-4 h-4" />
                  <span>Pelacakan Status Online</span>
                </button>

                <div className="h-5 w-px bg-white/20 mx-1"></div>

                {/* Operator PTSP Menu: untuk operator_ptsp & super_admin */}
                {(currentRole === 'operator_ptsp' || currentRole === 'super_admin') && (
                  <button
                    onClick={() => setActiveView('operator_portal')}
                    className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm sm:text-[15px] font-black ${
                      activeView === 'operator_portal'
                        ? 'bg-white text-emerald-950 shadow-md'
                        : 'bg-white/10 hover:bg-white/20 text-emerald-50 hover:text-white shadow-xs'
                    }`}
                  >
                    <FileCheck2 className="w-4 h-4 text-amber-300" />
                    <span>Operator PTSP (Front Office)</span>
                  </button>
                )}

                {/* Menu Admin Seksi Otomatis Sesuai Seksi yang Login */}
                {roleSeksi && (
                  <button
                    onClick={() => {
                      setSelectedSeksiTab(roleSeksi);
                      setActiveView('seksi_dashboard');
                    }}
                    className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm sm:text-[15px] font-black ${
                      activeView === 'seksi_dashboard'
                        ? 'bg-white text-emerald-950 shadow-md'
                        : 'bg-white/10 hover:bg-white/20 text-emerald-50 hover:text-white shadow-xs'
                    }`}
                    title={`Menu Resmi & Dashboard Khusus: ${SEKSI_CONFIG[roleSeksi].nama}`}
                  >
                    {getSeksiNavIcon(roleSeksi)}
                    <span>Menu {SEKSI_CONFIG[roleSeksi].nama}</span>
                    <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                      activeView === 'seksi_dashboard' ? 'bg-amber-400 text-emerald-950' : 'bg-black/25 text-amber-300'
                    }`}>
                      {SEKSI_CONFIG[roleSeksi].singkatan}
                    </span>
                  </button>
                )}

                {/* Dashboard Admin Seksi: khusus super_admin (untuk supervisi 5 seksi) */}
                {currentRole === 'super_admin' && (
                  <button
                    onClick={() => setActiveView('seksi_dashboard')}
                    className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm sm:text-[15px] font-black ${
                      activeView === 'seksi_dashboard'
                        ? 'bg-white text-emerald-950 shadow-md'
                        : 'bg-white/10 hover:bg-white/20 text-emerald-50 hover:text-white shadow-xs'
                    }`}
                  >
                    <Layers className="w-4 h-4 text-amber-300" />
                    <span>Dashboard Semua Seksi (5 Seksi)</span>
                  </button>
                )}

                {/* Pimpinan TTE BSrE: untuk kepala_kantor & super_admin */}
                {(currentRole === 'kepala_kantor' || currentRole === 'super_admin') && (
                  <button
                    onClick={() => setActiveView('kakan_tte')}
                    className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm sm:text-[15px] font-black ${
                      activeView === 'kakan_tte'
                        ? 'bg-rose-500 text-white shadow-md'
                        : 'bg-white/10 hover:bg-white/20 text-rose-100 hover:text-white shadow-xs'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Persetujuan & TTE BSrE</span>
                  </button>
                )}

                {/* Super Admin Menu: khusus super_admin */}
                {currentRole === 'super_admin' && (
                  <>
                    <div className="h-5 w-px bg-white/20 mx-1"></div>
                    <button
                      onClick={() => setActiveView('super_admin_portal')}
                      className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm sm:text-[15px] font-black ${
                        activeView === 'super_admin_portal'
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-white/10 hover:bg-white/20 text-purple-100 hover:text-white shadow-xs'
                      }`}
                      title="Kelola Data Keseluruhan, Akun Semua Seksi, Layanan Berita, dan Web Resmi"
                    >
                      <Crown className="w-4 h-4 text-amber-300" />
                      <span>Super Admin</span>
                    </button>
                  </>
                )}
              </nav>
            )}

            {/* Quick action: Validator TTE QR */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={onOpenValidatorModal}
                className="text-xs sm:text-sm font-black text-amber-300 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>Cek Validasi TTE</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer - Hijau Kemenag Fresh */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-gradient-to-b from-[#036237] to-[#024e2b] text-white p-4 space-y-2 animate-in slide-in-from-top-2 shadow-2xl">
            <button
              onClick={() => { setActiveView('public_portal'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-bold text-emerald-100 hover:bg-white/10 hover:text-white flex items-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-amber-300" />
              <span>Beranda PTSP</span>
            </button>

            {isPublic ? (
              <>
                <button
                  onClick={() => { 
                    setActiveView('public_portal'); 
                    setMobileMenuOpen(false);
                    setTimeout(() => {
                      document.getElementById('katalog-layanan')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-bold text-emerald-100 hover:bg-white/10 hover:text-white flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  <span>Katalog Layanan PTSP</span>
                </button>
                <button
                  onClick={() => { onOpenPermohonanModal(); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-black text-emerald-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 flex items-center gap-2 cursor-pointer shadow-md ring-2 ring-amber-300/60"
                >
                  <FileText className="w-4 h-4" />
                  <span>+ Ajukan Permohonan Baru</span>
                </button>
                <button
                  onClick={() => { setActiveView('tracking_view'); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-bold text-emerald-100 hover:bg-white/10 hover:text-white flex items-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4 text-amber-300" />
                  <span>Pelacakan Status Online</span>
                </button>
                <button
                  onClick={() => { onOpenValidatorModal(); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-bold text-emerald-100 hover:bg-white/10 hover:text-white flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>Validasi Dokumen Elektronik</span>
                </button>

                <div className="pt-2 border-t border-emerald-700/60">
                  <button
                    onClick={() => { setIsAccountModalOpen(true); setMobileMenuOpen(false); }}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-emerald-950 font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md cursor-pointer ring-1 ring-amber-300/60"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login Petugas / ASN</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => { onOpenPermohonanModal(); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-black text-emerald-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <FileText className="w-4 h-4" />
                  <span>+ Ajukan Permohonan Baru</span>
                </button>
                <button
                  onClick={() => { setActiveView('tracking_view'); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-bold text-emerald-100 hover:bg-white/10 hover:text-white flex items-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4 text-amber-300" />
                  <span>Pelacakan Status Online</span>
                </button>

                {(currentRole === 'operator_ptsp' || currentRole === 'super_admin') && (
                  <button
                    onClick={() => { setActiveView('operator_portal'); setMobileMenuOpen(false); }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-bold text-emerald-100 bg-white/10 hover:bg-white/20 border border-emerald-500/40 flex items-center gap-2 cursor-pointer"
                  >
                    <FileCheck2 className="w-4 h-4 text-amber-300" />
                    <span>Menu Operator PTSP</span>
                  </button>
                )}

                {/* Menu Admin Seksi Otomatis Sesuai Seksi yang Login */}
                {roleSeksi && (
                  <button
                    onClick={() => { 
                      setSelectedSeksiTab(roleSeksi);
                      setActiveView('seksi_dashboard'); 
                      setMobileMenuOpen(false); 
                    }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-bold text-white bg-emerald-900/60 hover:bg-emerald-900/80 flex items-center justify-between border border-emerald-500/40 cursor-pointer shadow-xs"
                  >
                    <span className="flex items-center gap-2">
                      {getSeksiNavIcon(roleSeksi)}
                      <span>Menu {SEKSI_CONFIG[roleSeksi].nama}</span>
                    </span>
                    <span className="text-xs bg-amber-400 text-emerald-950 font-black px-2 py-0.5 rounded-full">
                      {SEKSI_CONFIG[roleSeksi].singkatan}
                    </span>
                  </button>
                )}

                {/* Super Admin: Supervisi 5 Seksi */}
                {currentRole === 'super_admin' && (
                  <button
                    onClick={() => { setActiveView('seksi_dashboard'); setMobileMenuOpen(false); }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-bold text-emerald-100 hover:bg-white/10 flex items-center gap-2 cursor-pointer"
                  >
                    <Layers className="w-4 h-4 text-amber-300" />
                    <span>Dashboard Semua Seksi (5 Seksi)</span>
                  </button>
                )}

                {(currentRole === 'kepala_kantor' || currentRole === 'super_admin') && (
                  <button
                    onClick={() => { setActiveView('kakan_tte'); setMobileMenuOpen(false); }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-bold text-rose-200 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/40 flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-rose-300" />
                    <span>Persetujuan & TTE BSrE</span>
                  </button>
                )}

                {currentRole === 'super_admin' && (
                  <button
                    onClick={() => { setActiveView('super_admin_portal'); setMobileMenuOpen(false); }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-bold text-purple-200 bg-purple-950/40 hover:bg-purple-900/60 flex items-center justify-between border border-purple-500/40 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-amber-300" />
                      <span>Menu Super Admin (Kelola Web)</span>
                    </span>
                    <span className="text-xs bg-purple-900 text-purple-100 px-2 py-0.5 rounded-full font-bold">Admin</span>
                  </button>
                )}

                <button
                  onClick={() => { onOpenValidatorModal(); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-bold text-emerald-100 hover:bg-white/10 flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>Validasi Dokumen Elektronik</span>
                </button>

                <div className="pt-2 border-t border-emerald-700/60">
                  <button
                    onClick={() => { logoutToPublic(); setMobileMenuOpen(false); }}
                    className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar (Kembali ke Mode Publik)</span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}
        </div>
      </header>

      {/* Account Switcher Modal */}
      <AccountSwitcherModal 
        isOpen={isAccountModalOpen} 
        onClose={() => setIsAccountModalOpen(false)} 
      />
    </>
  );
};
