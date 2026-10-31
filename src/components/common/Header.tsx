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
      <header className="sticky top-0 z-40 relative text-white border-b-2 border-amber-400/60 shadow-2xl overflow-hidden">
        {/* Background Banner Lanskap Masjid Hijau-Emas - Skala diperkecil agar tampak proporsional dan jelas pada layar penuh */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#01351e]">
          {/* Lapisan 1: Ambient background blur untuk mengisi tepi secara mulus tanpa celah */}
          <img 
            src="/assets/aistudio/Green-Gold_Mosque_Landscape_Banner_7daeaf8c.png" 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover object-[center_30%] blur-md opacity-50 scale-105"
          />
          {/* Lapisan 2: Gambar lanskap tajam, diperkecil & diposisikan optimal agar kubah masjid, burung, pegunungan, dan petugas terlihat jelas utuh */}
          <img 
            src="/assets/aistudio/Green-Gold_Mosque_Landscape_Banner_7daeaf8c.png" 
            alt="Lanskap Masjid Kemenag Hijau Emas" 
            className="relative w-full h-full object-cover object-[center_24%] md:object-[center_28%] scale-[0.98] md:scale-95 transition-transform duration-300 filter contrast-105"
          />
          {/* Vignette tipis untuk kenyamanan mata & ketajaman teks tanpa menggelapkan foto */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/55 pointer-events-none"></div>
          {/* Garis emas halus di tepi atas dan bawah */}
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-90"></div>
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-90"></div>
        </div>

        {/* Content Container (Header 1 sampai Header 3 Terpadu) */}
        <div className="relative z-10">
          {/* Header 1: Top bar info - Kontras Tinggi & Teks Sangat Jelas */}
          <div className="bg-black/40 backdrop-blur-md text-white text-xs px-4 sm:px-6 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-white/20 shadow-xs">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 font-black text-amber-300 tracking-wide uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,1)] bg-black/45 px-2.5 py-0.5 rounded-lg border border-amber-400/40">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                PORTAL RESMI PTSP {pengaturanWeb.namaKantor.toUpperCase()}
              </span>
              <span className="hidden md:inline text-white/50">|</span>
              <span className="hidden md:inline text-white font-bold italic drop-shadow-[0_1px_3px_rgba(0,0,0,1)] bg-black/35 px-2.5 py-0.5 rounded-md border border-white/10">
                "{pengaturanWeb.slogan}"
              </span>
            </div>

            <div className="flex items-center gap-3 text-white">
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-black text-amber-300 drop-shadow-[0_1px_3px_rgba(0,0,0,1)] bg-black/45 px-2.5 py-0.5 rounded-lg border border-white/20">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                <span>{currentTime}</span>
              </div>

            {/* Sound Toggle - Hanya ditampilkan untuk petugas internal, disembunyikan untuk pengguna publik */}
            {!isPublic && (
              <button
                onClick={toggleSound}
                title={soundEnabled ? 'Notifikasi Suara Aktif (Klik untuk matikan)' : 'Notifikasi Suara Hening (Klik untuk aktifkan)'}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-black/50 hover:bg-black/70 text-[11px] text-amber-300 font-black transition-colors cursor-pointer border border-white/25 shadow-xs backdrop-blur-md"
              >
                {soundEnabled ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-amber-300" />
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

        {/* Main Header Container (Header 2) - Transparan Menyatu */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 bg-transparent">
          {/* Logo & Office Title */}
          <div 
            onClick={() => setActiveView('public_portal')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Official Logo Kementerian Agama RI (Ikhlas Beramal) */}
            <div className="relative group/logo flex items-center justify-center shrink-0">
              {/* Outer Golden Glow Aura */}
              <div className="absolute -inset-1 rounded-2xl bg-amber-400/30 blur-xs opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>

              {/* Logo Container Badge: Perisai Segilima Kemenag Transparan Kaca */}
              <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-black/35 backdrop-blur-md p-1 shadow-2xl border-2 border-amber-400/80 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
                {/* Official Lambang Kementerian Agama RI (SVG Vector Presisi) */}
                <svg 
                  className="w-11 h-11 sm:w-12 sm:h-12 drop-shadow-md" 
                  viewBox="0 0 64 64" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Perisai Segi Lima (Pentagon Kemenag) */}
                  <polygon 
                    points="32,3 60,23 49,58 15,58 4,23" 
                    fill="#015a2b" 
                    stroke="#eab308" 
                    strokeWidth="2.2" 
                    strokeLinejoin="round"
                  />
                  {/* Garis Bingkai Emas Bagian Dalam */}
                  <polygon 
                    points="32,6 56,23 46,55 18,55 8,23" 
                    fill="#046a38" 
                    stroke="#facc15" 
                    strokeWidth="1" 
                    strokeLinejoin="round"
                  />

                  {/* Bintang Bersudut Lima Warna Emas (Ketuhanan Yang Maha Esa) */}
                  <polygon 
                    points="32,9 33.6,13.8 38.5,13.8 34.6,16.6 36.1,21.4 32,18.4 27.9,21.4 29.4,16.6 25.5,13.8 30.4,13.8" 
                    fill="#facc15" 
                    stroke="#ca8a04" 
                    strokeWidth="0.5"
                  />

                  {/* Timbangan Keadilan Emas (Neraca Hukum dan Keadilan) */}
                  {/* Tiang Neraca */}
                  <line x1="32" y1="18" x2="32" y2="34" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="32" cy="18" r="1.2" fill="#facc15" />
                  {/* Palang Dacin Neraca */}
                  <line x1="22" y1="23" x2="42" y2="23" stroke="#facc15" strokeWidth="1.3" strokeLinecap="round" />
                  {/* Tali & Piringan Neraca Kiri */}
                  <line x1="22" y1="23" x2="19" y2="28" stroke="#facc15" strokeWidth="0.8" />
                  <line x1="22" y1="23" x2="25" y2="28" stroke="#facc15" strokeWidth="0.8" />
                  <path d="M17 28 Q22 31 27 28 Z" fill="#facc15" />
                  {/* Tali & Piringan Neraca Kanan */}
                  <line x1="42" y1="23" x2="39" y2="28" stroke="#facc15" strokeWidth="0.8" />
                  <line x1="42" y1="23" x2="45" y2="28" stroke="#facc15" strokeWidth="0.8" />
                  <path d="M37 28 Q42 31 47 28 Z" fill="#facc15" />

                  {/* Untaian Padi (17 butir - Kiri) */}
                  <path d="M14 26 C12 33 13 41 18 47" stroke="#facc15" strokeWidth="1.6" strokeLinecap="round" fill="none" strokeDasharray="1.5 2" />
                  <circle cx="13" cy="30" r="1.2" fill="#facc15" />
                  <circle cx="13" cy="35" r="1.2" fill="#facc15" />
                  <circle cx="14" cy="40" r="1.2" fill="#facc15" />
                  <circle cx="16" cy="44" r="1.2" fill="#facc15" />

                  {/* Bunga Kapas (45 lekuk - Kanan) */}
                  <path d="M50 26 C52 33 51 41 46 47" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" fill="none" strokeDasharray="1.5 2" />
                  <circle cx="51" cy="30" r="1.3" fill="#ffffff" stroke="#015a2b" strokeWidth="0.4" />
                  <circle cx="51" cy="35" r="1.3" fill="#ffffff" stroke="#015a2b" strokeWidth="0.4" />
                  <circle cx="50" cy="40" r="1.3" fill="#ffffff" stroke="#015a2b" strokeWidth="0.4" />
                  <circle cx="48" cy="44" r="1.3" fill="#ffffff" stroke="#015a2b" strokeWidth="0.4" />

                  {/* Kitab Suci Terbuka Putih & Emas (Pedoman Hidup Beragama) */}
                  <g>
                    {/* Halaman Kiri */}
                    <path 
                      d="M32 34 C26.5 32 21 33 17 34.5 L17 41.5 C21 40 26.5 39 32 41 Z" 
                      fill="#ffffff" 
                      stroke="#ca8a04" 
                      strokeWidth="0.6" 
                    />
                    {/* Halaman Kanan */}
                    <path 
                      d="M32 34 C37.5 32 43 33 47 34.5 L47 41.5 C43 40 37.5 39 32 41 Z" 
                      fill="#ffffff" 
                      stroke="#ca8a04" 
                      strokeWidth="0.6" 
                    />
                    {/* Garis-garis tulisan ayat kitab suci */}
                    <line x1="20" y1="36" x2="29" y2="35" stroke="#015a2b" strokeWidth="0.6" strokeLinecap="round" />
                    <line x1="20" y1="38.5" x2="28" y2="37.5" stroke="#015a2b" strokeWidth="0.6" strokeLinecap="round" />
                    <line x1="35" y1="35" x2="44" y2="36" stroke="#015a2b" strokeWidth="0.6" strokeLinecap="round" />
                    <line x1="36" y1="37.5" x2="44" y2="38.5" stroke="#015a2b" strokeWidth="0.6" strokeLinecap="round" />
                  </g>

                  {/* Pita Semboyan: IKHLAS BERAMAL */}
                  <path 
                    d="M12 49 Q32 52.5 52 49 L50.5 54.5 Q32 58 13.5 54.5 Z" 
                    fill="#ffffff" 
                    stroke="#eab308" 
                    strokeWidth="0.8" 
                  />
                  <text 
                    x="32" 
                    y="53.8" 
                    textAnchor="middle" 
                    fill="#015a2b" 
                    fontSize="4.2" 
                    fontWeight="900" 
                    fontFamily="sans-serif" 
                    letterSpacing="0.4"
                  >
                    IKHLAS BERAMAL
                  </text>
                </svg>

                {/* Shimmer sweep effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>

                {/* Live Service Pulse Indicator */}
                <span className="absolute top-1 right-1 flex h-2 w-2" title="Layanan Aktif Kemenag Mura">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                </span>
              </div>
            </div>

            <div className="bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/25 shadow-xl">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <h1 className="text-base sm:text-lg lg:text-xl font-black text-amber-300 tracking-tight leading-tight group-hover:text-yellow-200 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] transition-colors">
                  PTSP KEMENAG MURA <span className="text-xs sm:text-sm font-black text-white block sm:inline drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">(Pelayanan Terpadu Satu Pintu)</span>
                </h1>
                <span className="hidden md:inline-block text-[10px] font-black bg-amber-400 text-emerald-950 px-2 py-0.5 rounded shadow-lg ring-1 ring-amber-300">
                  TTE BSrE
                </span>
              </div>
              <p className="text-xs text-emerald-100 font-extrabold leading-tight mt-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                {pengaturanWeb.namaKantor}
              </p>
            </div>
          </div>

          {/* Quick Resi Search Bar - Transparan Glass Berkontras Tinggi */}
          <form onSubmit={handleQuickSearch} className="hidden lg:flex items-center relative max-w-xs w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Resi: e.g. 0038"
              className="w-full text-xs pl-8 pr-16 py-2 rounded-xl bg-black/50 text-white placeholder:text-slate-200 border border-white/35 focus:bg-black/70 focus:border-amber-300 focus:ring-2 focus:ring-amber-300/50 outline-hidden font-bold shadow-xl backdrop-blur-md transition-all"
            />
            <Search className="w-4 h-4 text-amber-300 absolute left-2.5 top-2.5" />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 text-[11px] font-black rounded-lg transition-colors cursor-pointer shadow-lg"
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
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/50 text-amber-300 border border-amber-400/50 text-xs font-black backdrop-blur-md shadow-lg drop-shadow-sm">
                  <Users className="w-3.5 h-3.5 text-amber-300" />
                  <span>Pengguna Publik</span>
                </div>

                <button
                  onClick={() => setIsAccountModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-emerald-950 font-black text-xs shadow-lg hover:shadow-xl transition-all cursor-pointer ring-2 ring-amber-300/80 drop-shadow-sm"
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
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-emerald-500/50 hover:border-amber-400 bg-white/10 hover:bg-white/20 transition-all text-left shadow-xs group cursor-pointer text-white"
                  title="Ganti Akun Petugas / ASN"
                >
                  <img 
                    src={activeAccount.avatar} 
                    alt={activeAccount.namaLengkap} 
                    className="w-8 h-8 rounded-lg object-cover border border-amber-400/80 shadow-2xs group-hover:ring-2 group-hover:ring-amber-300"
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

                {/* Logout to Public Button */}
                <button
                  onClick={logoutToPublic}
                  className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl border border-rose-500/60 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
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
              className="md:hidden p-2 rounded-xl text-white hover:bg-white/10 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Navigation Bar (Desktop) - Header 3 (Menyatu Transparan Berkontras Tinggi) */}
        <div className="border-t border-white/20 bg-black/35 backdrop-blur-md px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto py-2 scrollbar-none">
            {isPublic ? (
              /* =========================================================================
                 PUBLIC USER NAVIGATION: Menampilkan menu layanan masyarakat.
                 ========================================================================= */
              <nav className="flex items-center gap-2 text-sm sm:text-base font-bold">
                <button
                  onClick={() => setActiveView('public_portal')}
                  className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm sm:text-[15px] font-black ${
                    activeView === 'public_portal'
                      ? 'bg-amber-400 text-emerald-950 shadow-xl ring-2 ring-amber-300'
                      : 'bg-black/55 hover:bg-black/75 text-white hover:text-amber-300 border border-white/30 backdrop-blur-md shadow-md drop-shadow-[0_1px_2px_rgba(0,0,0,1)]'
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
                  className="px-4 py-2 rounded-xl transition-all flex items-center gap-2 bg-black/55 hover:bg-black/75 text-white hover:text-amber-300 border border-white/30 backdrop-blur-md text-sm sm:text-[15px] font-black whitespace-nowrap cursor-pointer shadow-md drop-shadow-[0_1px_2px_rgba(0,0,0,1)]"
                >
                  <FileText className="w-4 h-4" />
                  <span>Katalog Layanan</span>
                </button>

                <button
                  onClick={onOpenPermohonanModal}
                  className="px-4 py-2 rounded-xl transition-all flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-emerald-950 text-sm sm:text-[15px] font-black whitespace-nowrap shadow-xl cursor-pointer ring-2 ring-amber-300/80 drop-shadow-sm"
                >
                  <FileText className="w-4 h-4" />
                  <span>+ Ajukan Permohonan</span>
                </button>

                <button
                  onClick={() => setActiveView('tracking_view')}
                  className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm sm:text-[15px] font-black ${
                    activeView === 'tracking_view'
                      ? 'bg-amber-400 text-emerald-950 shadow-xl ring-2 ring-amber-300'
                      : 'bg-black/55 hover:bg-black/75 text-white hover:text-amber-300 border border-white/30 backdrop-blur-md shadow-md drop-shadow-[0_1px_2px_rgba(0,0,0,1)]'
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
                  className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm sm:text-[15px] font-black ${
                    activeView === 'public_portal'
                      ? 'bg-amber-400 text-emerald-950 shadow-xl ring-2 ring-amber-300'
                      : 'bg-black/55 hover:bg-black/75 text-white hover:text-amber-300 border border-white/30 backdrop-blur-md shadow-md drop-shadow-[0_1px_2px_rgba(0,0,0,1)]'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Beranda PTSP</span>
                </button>

                <button
                  onClick={() => setActiveView('tracking_view')}
                  className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm sm:text-[15px] font-black ${
                    activeView === 'tracking_view'
                      ? 'bg-amber-400 text-emerald-950 shadow-xl ring-2 ring-amber-300'
                      : 'bg-black/55 hover:bg-black/75 text-white hover:text-amber-300 border border-white/30 backdrop-blur-md shadow-md drop-shadow-[0_1px_2px_rgba(0,0,0,1)]'
                  }`}
                >
                  <Search className="w-4 h-4" />
                  <span>Pelacakan Status Online</span>
                </button>

                <div className="h-5 w-px bg-white/40 mx-1"></div>

                {/* Operator PTSP Menu: untuk operator_ptsp & super_admin */}
                {(currentRole === 'operator_ptsp' || currentRole === 'super_admin') && (
                  <button
                    onClick={() => setActiveView('operator_portal')}
                    className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm sm:text-[15px] font-black ${
                      activeView === 'operator_portal'
                        ? 'bg-emerald-600 text-white shadow-xl ring-2 ring-emerald-300'
                        : 'bg-black/55 hover:bg-black/75 text-white hover:text-amber-300 border border-white/30 backdrop-blur-md shadow-md drop-shadow-[0_1px_2px_rgba(0,0,0,1)]'
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
                        ? 'bg-emerald-600 text-white shadow-xl ring-2 ring-emerald-300'
                        : 'bg-black/55 hover:bg-black/75 text-white hover:text-amber-300 border border-white/30 backdrop-blur-md shadow-md drop-shadow-[0_1px_2px_rgba(0,0,0,1)]'
                    }`}
                    title={`Menu Resmi & Dashboard Khusus: ${SEKSI_CONFIG[roleSeksi].nama}`}
                  >
                    {getSeksiNavIcon(roleSeksi)}
                    <span>Menu {SEKSI_CONFIG[roleSeksi].nama}</span>
                    <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                      activeView === 'seksi_dashboard' ? 'bg-amber-400 text-emerald-950' : 'bg-white/20 text-white border border-white/25'
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
                        ? 'bg-emerald-600 text-white shadow-xl ring-2 ring-emerald-300'
                        : 'bg-black/55 hover:bg-black/75 text-white hover:text-amber-300 border border-white/30 backdrop-blur-md shadow-md drop-shadow-[0_1px_2px_rgba(0,0,0,1)]'
                    }`}
                  >
                    <Layers className="w-4 h-4 text-emerald-300" />
                    <span>Dashboard Semua Seksi (5 Seksi)</span>
                  </button>
                )}

                {/* Pimpinan TTE BSrE: untuk kepala_kantor & super_admin */}
                {(currentRole === 'kepala_kantor' || currentRole === 'super_admin') && (
                  <button
                    onClick={() => setActiveView('kakan_tte')}
                    className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm sm:text-[15px] font-black ${
                      activeView === 'kakan_tte'
                        ? 'bg-rose-600 text-white shadow-xl ring-2 ring-rose-400'
                        : 'bg-black/55 hover:bg-black/75 text-white hover:text-amber-300 border border-white/30 backdrop-blur-md shadow-md drop-shadow-[0_1px_2px_rgba(0,0,0,1)]'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-rose-300" />
                    <span>Persetujuan & TTE BSrE</span>
                  </button>
                )}

                {/* Super Admin Menu: khusus super_admin */}
                {currentRole === 'super_admin' && (
                  <>
                    <div className="h-5 w-px bg-white/40 mx-1"></div>
                    <button
                      onClick={() => setActiveView('super_admin_portal')}
                      className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm sm:text-[15px] font-black ${
                        activeView === 'super_admin_portal'
                          ? 'bg-purple-600 text-white shadow-xl ring-2 ring-purple-400'
                          : 'bg-black/55 hover:bg-black/75 text-white hover:text-amber-300 border border-white/30 backdrop-blur-md shadow-md drop-shadow-[0_1px_2px_rgba(0,0,0,1)]'
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
                className="text-xs sm:text-sm font-black text-amber-300 hover:text-white bg-black/55 hover:bg-black/75 border border-amber-400/50 hover:border-amber-300 px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-lg transition-all cursor-pointer backdrop-blur-md drop-shadow-[0_1px_2px_rgba(0,0,0,1)]"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>Cek Validasi TTE</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer - Hijau Kemenag */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-emerald-700/80 bg-gradient-to-b from-[#023320] via-[#023b26] to-[#012618] text-white p-4 space-y-2 animate-in slide-in-from-top-2 shadow-2xl">
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
