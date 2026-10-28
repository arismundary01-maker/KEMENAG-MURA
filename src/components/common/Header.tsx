import React, { useState, useEffect } from 'react';
import { usePTSP } from '../../context/PTSPContext';
import { DAFTAR_AKUN_SISTEM } from '../../data/initialData';
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
  Sparkles
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
    permohonanList
  } = usePTSP();

  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const activeAccount = DAFTAR_AKUN_SISTEM.find(acc => acc.role === currentRole) || DAFTAR_AKUN_SISTEM[0];

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
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-200 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              PORTAL RESMI PTSP KEMENAG KABUPATEN MUSI RAWAS
            </span>
            <span className="hidden md:inline text-emerald-300/40">|</span>
            <span className="hidden md:inline text-emerald-100 font-medium italic">
              "Ikhlas Beramal - Melayani Sepenuh Hati, BerAKHLAK & Akuntabel"
            </span>
          </div>

          <div className="flex items-center gap-4 text-emerald-100">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-200">
              <Clock className="w-3.5 h-3.5 text-emerald-300" />
              <span>{currentTime}</span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Notifikasi Suara Aktif (Klik untuk matikan)' : 'Notifikasi Suara Hening (Klik untuk aktifkan)'}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[11px] text-white transition-colors"
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
          </div>
        </div>

        {/* Main Header Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Logo & Office Title */}
          <div 
            onClick={() => setActiveView('public_portal')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Kemenag Badge Logo Icon */}
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-800 to-emerald-600 flex items-center justify-center shadow-md border-2 border-emerald-500/30 group-hover:scale-105 transition-transform">
              <div className="w-8 h-8 rounded-lg bg-emerald-950 flex items-center justify-center text-amber-300 font-black text-xs border border-amber-400/40">
                <span className="tracking-tighter">KM</span>
              </div>
              <span className="absolute -bottom-1 -right-1 px-1 py-0.2 bg-amber-400 text-emerald-950 font-bold text-[9px] rounded-sm shadow-xs">
                MURA
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-emerald-950 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                  PTSP ONLINE
                </h1>
                <span className="hidden sm:inline-block text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.5 rounded">
                  TTE BSrE
                </span>
              </div>
              <p className="text-xs text-slate-600 font-semibold leading-tight">
                Kementerian Agama Kabupaten Musi Rawas
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
              className="absolute right-1 top-1 bottom-1 px-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold rounded-lg transition-colors"
            >
              Lacak
            </button>
          </form>

          {/* Right Action Icons: Notification, User Role Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Real-time Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
                className="relative p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors focus:ring-2 focus:ring-emerald-600/20"
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

            {/* Role & Account Button (Requirement 2: Akun Operator masing-masing seksi, kasubbag, pimpinan) */}
            <button
              onClick={() => setIsAccountModalOpen(true)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50/80 hover:bg-emerald-50/50 transition-all text-left shadow-2xs group"
              title="Beralih Akun (Operator PTSP, Seksi Pendis, Bimas Islam, Hindu, Kristen, Kasubbag, Pimpinan)"
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

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Navigation Bar (Desktop) */}
        <div className="border-t border-slate-100 bg-slate-50/80 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto py-1 scrollbar-none">
            <nav className="flex items-center gap-1 text-xs font-bold">
              <button
                onClick={() => setActiveView('public_portal')}
                className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeView === 'public_portal'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-100/50'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Beranda PTSP
              </button>

              <button
                onClick={onOpenPermohonanModal}
                className="px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 text-emerald-800 hover:bg-emerald-100 font-extrabold whitespace-nowrap"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-600" />
                + Ajukan Permohonan
              </button>

              <button
                onClick={() => setActiveView('tracking_view')}
                className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeView === 'tracking_view'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-100/50'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                Pelacakan Status Online
              </button>

              <div className="h-4 w-px bg-slate-300 mx-1"></div>

              {/* Front Office Operator PTSP Menu */}
              <button
                onClick={() => setActiveView('operator_portal')}
                className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeView === 'operator_portal'
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'text-blue-900 hover:bg-blue-100/70'
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                Operator PTSP (Front Office)
              </button>

              {/* Seksi Dashboard */}
              <button
                onClick={() => setActiveView('seksi_dashboard')}
                className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeView === 'seksi_dashboard'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'text-teal-900 hover:bg-teal-100/70'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Dashboard Admin Seksi
              </button>

              {/* Pimpinan TTE */}
              <button
                onClick={() => setActiveView('kakan_tte')}
                className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeView === 'kakan_tte'
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'text-rose-900 hover:bg-rose-100/70'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Persetujuan & TTE BSrE
              </button>
            </nav>

            {/* Quick action: Validator TTE QR */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={onOpenValidatorModal}
                className="text-[11px] font-bold text-slate-700 hover:text-emerald-800 bg-white border border-slate-200 hover:border-emerald-400 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-2xs transition-all"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Cek Validasi TTE
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white p-4 space-y-2 animate-in slide-in-from-top-2">
            <button
              onClick={() => { setActiveView('public_portal'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100"
            >
              Beranda PTSP
            </button>
            <button
              onClick={() => { onOpenPermohonanModal(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-emerald-700 hover:bg-emerald-50"
            >
              + Ajukan Permohonan Baru
            </button>
            <button
              onClick={() => { setActiveView('tracking_view'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100"
            >
              Pelacakan Status Online
            </button>
            <button
              onClick={() => { setActiveView('operator_portal'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-blue-800 hover:bg-blue-50"
            >
              Menu Operator PTSP
            </button>
            <button
              onClick={() => { setActiveView('seksi_dashboard'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-teal-800 hover:bg-teal-50"
            >
              Dashboard Seksi & Integrasi
            </button>
            <button
              onClick={() => { setActiveView('kakan_tte'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-rose-800 hover:bg-rose-50"
            >
              Persetujuan & TTE BSrE
            </button>
            <button
              onClick={() => { onOpenValidatorModal(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-100"
            >
              Validasi Dokumen Elektronik
            </button>
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
