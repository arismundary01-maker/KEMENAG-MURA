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
  const [currentTime, setCurrentTime] = useState<string>('');
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

  // Clock in WIB (Sumatera Selatan / Musi Rawas UTC+7)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('id-ID', { 
          weekday: 'long', 
          day: 'numeric', 
          month: 'short', 
          year: 'numeric' 
        }) + ' • ' + now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        {/* Top bar info */}
        <div className="bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-emerald-950/40">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-200 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              PORTAL RESMI PTSP {pengaturanWeb.namaKantor.toUpperCase()}
            </span>
            <span className="hidden md:inline text-emerald-300/40">|</span>
            <span className="hidden md:inline text-emerald-100 font-medium italic">
              "{pengaturanWeb.slogan}"
            </span>
          </div>

          <div className="flex items-center gap-4 text-emerald-100">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-200">
              <Clock className="w-3.5 h-3.5 text-emerald-300" />
              <span>{currentTime}</span>
            </div>

            {/* Sound Toggle - Hanya ditampilkan untuk petugas internal, disembunyikan untuk pengguna publik */}
            {!isPublic && (
              <button
                onClick={toggleSound}
                title={soundEnabled ? 'Notifikasi Suara Aktif (Klik untuk matikan)' : 'Notifikasi Suara Hening (Klik untuk aktifkan)'}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[11px] text-white transition-colors cursor-pointer"
              >
                {soundEnabled ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-300" />
                    <span className="hidden sm:inline">Audio Nyala</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-slate-300" />
                    <span className="hidden sm:inline">Audio Hening</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Main Header Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Logo & Office Title */}
          <div 
            onClick={() => setActiveView('public_portal')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Animated Public Service Logo (Logo PTSP Bernuansa Pelayanan) */}
            <div className="relative group/logo flex items-center justify-center shrink-0">
              {/* Outer Pulsing Glow Aura */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-emerald-500/40 via-amber-400/40 to-teal-400/40 blur-xs opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>

              {/* Main Animated Badge Container */}
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-950 via-teal-950 to-emerald-900 p-1 shadow-md border-2 border-amber-400/50 flex flex-col items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
                {/* Rotating Service Orbit Ring */}
                <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite] text-amber-300/30 pointer-events-none" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeDasharray="6 7"
                  />
                </svg>

                {/* Shimmer sweep effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>

                {/* Center Service Emblem: Service Bell / Pelayanan Prima */}
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <div className="text-amber-300 drop-shadow-md animate-bounce [animation-duration:2.5s] flex items-center justify-center">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      {/* Pelayanan Prima Concierge Bell */}
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" fill="currentColor" fillOpacity="0.25" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                      <line x1="12" y1="2" x2="12" y2="4" strokeWidth="3" />
                      <circle cx="12" cy="2" r="1.5" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="text-[7.5px] font-black tracking-widest text-emerald-200 uppercase -mt-0.5 font-mono">
                    PTSP
                  </span>
                </div>

                {/* Live Service Pulse Indicator */}
                <span className="absolute top-1 right-1 flex h-2 w-2" title="Pelayanan Aktif Sepenuh Hati">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                </span>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <h1 className="text-base sm:text-lg lg:text-xl font-black text-emerald-950 tracking-tight leading-tight group-hover:text-emerald-700 transition-colors">
                  PTSP KEMENAG MURA <span className="text-xs sm:text-sm font-bold text-emerald-700 block sm:inline">(Pelayanan Terpadu Satu Pintu)</span>
                </h1>
                <span className="hidden md:inline-block text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.5 rounded shadow-2xs">
                  TTE BSrE
                </span>
              </div>
              <p className="text-xs text-slate-600 font-semibold leading-tight mt-0.5">
                {pengaturanWeb.namaKantor}
              </p>
            </div>
          </div>

          {/* Quick Resi Search Bar */}
          <form onSubmit={handleQuickSearch} className="hidden lg:flex items-center relative max-w-xs w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Resi: e.g. 0038"
              className="w-full text-xs pl-8 pr-16 py-2 rounded-xl bg-slate-100 border border-slate-200 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-hidden transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
            >
              Lacak
            </button>
          </form>

          {/* Right Action Icons: Notification, User Role Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Real-time Notification Bell - Hanya untuk Petugas Internal, Disembunyikan untuk Pengguna Publik */}
            {!isPublic && (
              <div className="relative">
                <button
                  onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
                  className="relative p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors focus:ring-2 focus:ring-emerald-600/20 cursor-pointer"
                  title="Notifikasi Real-Time"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white font-bold text-[10px] flex items-center justify-center animate-bounce shadow-xs">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown Drawer */}
                {isNotifDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="bg-emerald-900 text-white p-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-emerald-300" />
                      <span className="font-bold text-sm">Notifikasi Real-time</span>
                      {unreadCount > 0 && (
                        <span className="text-[10px] bg-rose-600 text-white font-bold px-1.5 py-0.2 rounded-full">
                          {unreadCount} Baru
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-[11px] text-emerald-200 hover:text-white underline"
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
                      className="text-xs font-semibold text-slate-600 hover:text-emerald-700"
                    >
                      Tutup Notifikasi
                    </button>
                  </div>
                </div>
              )}
            </div>
            )}

            {/* Public vs Staff Header Controls */}
            {isPublic ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Pengguna Publik</span>
                </div>

                <button
                  onClick={() => setIsAccountModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white font-bold text-xs shadow-sm hover:shadow transition-all cursor-pointer ring-1 ring-emerald-500/40"
                  title="Akses Masuk Petugas / ASN PTSP Kemenag"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login Petugas / ASN</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {/* Staff Account Info & Switcher Button */}
                <button
                  onClick={() => setIsAccountModalOpen(true)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50/80 hover:bg-emerald-50/50 transition-all text-left shadow-2xs group cursor-pointer"
                  title="Ganti Akun Petugas / ASN"
                >
                  <img 
                    src={activeAccount.avatar} 
                    alt={activeAccount.namaLengkap} 
                    className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-2xs group-hover:ring-2 group-hover:ring-emerald-500"
                  />
                  <div className="hidden sm:block">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full border ${activeAccount.badgeColor}`}>
                        {activeAccount.badgeLabel}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[130px]">
                      {activeAccount.namaLengkap}
                    </p>
                  </div>
                  <UserCheck className="w-4 h-4 text-slate-500 group-hover:text-emerald-600" />
                </button>

                {/* Logout to Public Button */}
                <button
                  onClick={logoutToPublic}
                  className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
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
              className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Navigation Bar (Desktop) */}
        <div className="border-t border-slate-100 bg-slate-50/80 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto py-1.5 scrollbar-none">
            {isPublic ? (
              /* =========================================================================
                 PUBLIC USER NAVIGATION: Hanya menampilkan menu layanan masyarakat.
                 Menu Operator PTSP, Dashboard Admin Seksi, dan Persetujuan TTE DIHILANGKAN.
                 ========================================================================= */
              <nav className="flex items-center gap-2 text-sm sm:text-base font-bold">
                <button
                  onClick={() => setActiveView('public_portal')}
                  className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm sm:text-[15px] font-bold ${
                    activeView === 'public_portal'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-100/60'
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
                  className="px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 text-slate-700 hover:text-emerald-800 hover:bg-emerald-100/60 text-sm sm:text-[15px] font-bold whitespace-nowrap cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>Katalog Layanan</span>
                </button>

                <button
                  onClick={onOpenPermohonanModal}
                  className="px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-emerald-950 text-sm sm:text-[15px] font-black whitespace-nowrap shadow-sm cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>+ Ajukan Permohonan</span>
                </button>

                <button
                  onClick={() => setActiveView('tracking_view')}
                  className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm sm:text-[15px] font-bold ${
                    activeView === 'tracking_view'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-100/60'
                  }`}
                >
                  <Search className="w-4 h-4" />
                  <span>Pelacakan Status Online</span>
                </button>
              </nav>
            ) : (
              /* =========================================================================
                 STAFF / ASN NAVIGATION: Menampilkan menu operasional dinas sesuai peran.
                 ========================================================================= */
              <nav className="flex items-center gap-2 text-sm sm:text-base font-bold">
                <button
                  onClick={() => setActiveView('public_portal')}
                  className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm sm:text-[15px] font-bold ${
                    activeView === 'public_portal'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-100/60'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Beranda PTSP</span>
                </button>

                <button
                  onClick={() => setActiveView('tracking_view')}
                  className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm sm:text-[15px] font-bold ${
                    activeView === 'tracking_view'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-100/60'
                  }`}
                >
                  <Search className="w-4 h-4" />
                  <span>Pelacakan Status Online</span>
                </button>

                <div className="h-5 w-px bg-slate-300 mx-1"></div>

                {/* Operator PTSP Menu: untuk operator_ptsp & super_admin */}
                {(currentRole === 'operator_ptsp' || currentRole === 'super_admin') && (
                  <button
                    onClick={() => setActiveView('operator_portal')}
                    className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm sm:text-[15px] font-bold ${
                      activeView === 'operator_portal'
                        ? 'bg-blue-700 text-white shadow-xs'
                        : 'text-blue-900 hover:bg-blue-100/70'
                    }`}
                  >
                    <FileCheck2 className="w-4 h-4" />
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
                    className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm sm:text-[15px] font-bold ${
                      activeView === 'seksi_dashboard'
                        ? 'bg-teal-700 text-white shadow-xs'
                        : 'text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200'
                    }`}
                    title={`Menu Resmi & Dashboard Khusus: ${SEKSI_CONFIG[roleSeksi].nama}`}
                  >
                    {getSeksiNavIcon(roleSeksi)}
                    <span>Menu {SEKSI_CONFIG[roleSeksi].nama}</span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      activeView === 'seksi_dashboard' ? 'bg-white/20 text-white' : 'bg-teal-200 text-teal-900'
                    }`}>
                      {SEKSI_CONFIG[roleSeksi].singkatan}
                    </span>
                  </button>
                )}

                {/* Dashboard Admin Seksi: khusus super_admin (untuk supervisi 5 seksi) */}
                {currentRole === 'super_admin' && (
                  <button
                    onClick={() => setActiveView('seksi_dashboard')}
                    className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm sm:text-[15px] font-bold ${
                      activeView === 'seksi_dashboard'
                        ? 'bg-teal-700 text-white shadow-xs'
                        : 'text-teal-900 hover:bg-teal-100/70'
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                    <span>Dashboard Semua Seksi (5 Seksi)</span>
                  </button>
                )}

                {/* Pimpinan TTE BSrE: untuk kepala_kantor & super_admin */}
                {(currentRole === 'kepala_kantor' || currentRole === 'super_admin') && (
                  <button
                    onClick={() => setActiveView('kakan_tte')}
                    className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm sm:text-[15px] font-bold ${
                      activeView === 'kakan_tte'
                        ? 'bg-rose-700 text-white shadow-xs'
                        : 'text-rose-900 hover:bg-rose-100/70'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Persetujuan & TTE BSrE</span>
                  </button>
                )}

                {/* Super Admin Menu: khusus super_admin */}
                {currentRole === 'super_admin' && (
                  <>
                    <div className="h-5 w-px bg-slate-300 mx-1"></div>
                    <button
                      onClick={() => setActiveView('super_admin_portal')}
                      className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm sm:text-[15px] font-bold ${
                        activeView === 'super_admin_portal'
                          ? 'bg-purple-800 text-white shadow-xs ring-2 ring-purple-400'
                          : 'text-purple-900 bg-purple-50 hover:bg-purple-100/80 border border-purple-200'
                      }`}
                      title="Kelola Data Keseluruhan, Akun Semua Seksi, Layanan Berita, dan Web Resmi"
                    >
                      <Crown className="w-4 h-4 text-amber-500" />
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
                className="text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-800 bg-white border border-slate-200 hover:border-emerald-400 px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-2xs transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Cek Validasi TTE</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white p-4 space-y-2 animate-in slide-in-from-top-2">
            <button
              onClick={() => { setActiveView('public_portal'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-bold text-slate-800 hover:bg-slate-100 flex items-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-emerald-600" />
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
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-bold text-slate-800 hover:bg-slate-100 flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>Katalog Layanan PTSP</span>
                </button>
                <button
                  onClick={() => { onOpenPermohonanModal(); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-black text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-700" />
                  <span>+ Ajukan Permohonan Baru</span>
                </button>
                <button
                  onClick={() => { setActiveView('tracking_view'); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-bold text-slate-800 hover:bg-slate-100 flex items-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4 text-emerald-600" />
                  <span>Pelacakan Status Online</span>
                </button>
                <button
                  onClick={() => { onOpenValidatorModal(); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-bold text-slate-800 hover:bg-slate-100 flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Validasi Dokumen Elektronik</span>
                </button>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => { setIsAccountModalOpen(true); setMobileMenuOpen(false); }}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm cursor-pointer"
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
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-black text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-700" />
                  <span>+ Ajukan Permohonan Baru</span>
                </button>
                <button
                  onClick={() => { setActiveView('tracking_view'); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-bold text-slate-800 hover:bg-slate-100 flex items-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4 text-emerald-600" />
                  <span>Pelacakan Status Online</span>
                </button>

                {(currentRole === 'operator_ptsp' || currentRole === 'super_admin') && (
                  <button
                    onClick={() => { setActiveView('operator_portal'); setMobileMenuOpen(false); }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-bold text-blue-900 hover:bg-blue-50 flex items-center gap-2 cursor-pointer"
                  >
                    <FileCheck2 className="w-4 h-4 text-blue-600" />
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
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-bold text-teal-900 bg-teal-50 hover:bg-teal-100 flex items-center justify-between border border-teal-200 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      {getSeksiNavIcon(roleSeksi)}
                      <span>Menu {SEKSI_CONFIG[roleSeksi].nama}</span>
                    </span>
                    <span className="text-xs bg-teal-200 text-teal-900 font-bold px-2 py-0.5 rounded-full">
                      {SEKSI_CONFIG[roleSeksi].singkatan}
                    </span>
                  </button>
                )}

                {/* Super Admin: Supervisi 5 Seksi */}
                {currentRole === 'super_admin' && (
                  <button
                    onClick={() => { setActiveView('seksi_dashboard'); setMobileMenuOpen(false); }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-bold text-teal-900 hover:bg-teal-50 flex items-center gap-2 cursor-pointer"
                  >
                    <Layers className="w-4 h-4 text-teal-600" />
                    <span>Dashboard Semua Seksi (5 Seksi)</span>
                  </button>
                )}

                {(currentRole === 'kepala_kantor' || currentRole === 'super_admin') && (
                  <button
                    onClick={() => { setActiveView('kakan_tte'); setMobileMenuOpen(false); }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-bold text-rose-900 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-rose-600" />
                    <span>Persetujuan & TTE BSrE</span>
                  </button>
                )}

                {currentRole === 'super_admin' && (
                  <button
                    onClick={() => { setActiveView('super_admin_portal'); setMobileMenuOpen(false); }}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-bold text-purple-900 bg-purple-50 hover:bg-purple-100 flex items-center justify-between border border-purple-200 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-amber-500" />
                      <span>Menu Super Admin (Kelola Web)</span>
                    </span>
                    <span className="text-xs bg-purple-200 text-purple-900 px-2 py-0.5 rounded-full font-bold">Admin</span>
                  </button>
                )}

                <button
                  onClick={() => { onOpenValidatorModal(); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm sm:text-base font-bold text-slate-800 hover:bg-slate-100 flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Validasi Dokumen Elektronik</span>
                </button>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => { logoutToPublic(); setMobileMenuOpen(false); }}
                    className="w-full py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar (Kembali ke Mode Publik)</span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </header>

      {/* Account Switcher Modal */}
      <AccountSwitcherModal 
        isOpen={isAccountModalOpen} 
        onClose={() => setIsAccountModalOpen(false)} 
      />
    </>
  );
};
