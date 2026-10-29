import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Globe, 
  ShieldCheck, 
  RefreshCw, 
  X, 
  Sparkles, 
  GraduationCap, 
  Building2, 
  CheckCircle2,
  Lock,
  Maximize2,
  Layers,
  School,
  Users,
  FileText,
  Search,
  BookOpen,
  Calendar,
  Check,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

interface WebPortalViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
  singkatan?: string;
  onReturnToBeranda: () => void;
}

// Data Integrasi Madrasah & Lembaga Pendidikan Islam Kabupaten Murung Raya
const MADRASAH_DATA = [
  { nsm: '131162120001', npsn: '60728901', nama: 'MAN 1 Murung Raya', jenjang: 'MA', status: 'Negeri', akreditasi: 'A', kepala: 'Drs. H. Ahsan, M.Pd.', siswa: 412, guru: 34, alamat: 'Jl. Jenderal Sudirman No. 45, Puruk Cahu' },
  { nsm: '121162120001', npsn: '60728902', nama: 'MTsN 1 Murung Raya', jenjang: 'MTs', status: 'Negeri', akreditasi: 'A', kepala: 'Hj. Siti Mariam, S.Ag.', siswa: 498, guru: 38, alamat: 'Jl. Ki Hajar Dewantara, Puruk Cahu' },
  { nsm: '121162120002', npsn: '60728903', nama: 'MTsN 2 Murung Raya', jenjang: 'MTs', status: 'Negeri', akreditasi: 'B', kepala: 'Ahmad Syarif, M.Pd.I.', siswa: 280, guru: 22, alamat: 'Kec. Laung Tuhup, Kab. Murung Raya' },
  { nsm: '111162120001', npsn: '60728904', nama: 'MIN 1 Murung Raya', jenjang: 'MI', status: 'Negeri', akreditasi: 'A', kepala: 'M. Ridwan, S.Pd.I.', siswa: 340, guru: 26, alamat: 'Jl. A. Yani No. 12, Puruk Cahu' },
  { nsm: '111162120002', npsn: '60728905', nama: 'MIN 2 Murung Raya', jenjang: 'MI', status: 'Negeri', akreditasi: 'B', kepala: 'Nurhasanah, S.Ag.', siswa: 215, guru: 18, alamat: 'Desa Saripoi, Kec. Tanah Siang' },
  { nsm: '131262120002', npsn: '60728906', nama: 'MAS Karya Pembangunan', jenjang: 'MA', status: 'Swasta', akreditasi: 'B', kepala: 'Ust. Zainal Abidin, S.Th.I.', siswa: 175, guru: 16, alamat: 'Jl. KH. Dewantara, Puruk Cahu' },
  { nsm: '121262120004', npsn: '60728907', nama: 'MTsS Nurul Islam', jenjang: 'MTs', status: 'Swasta', akreditasi: 'B', kepala: 'H. Rusli, S.Pd.I.', siswa: 160, guru: 14, alamat: 'Kec. Murung, Kab. Murung Raya' },
  { nsm: '101262120001', npsn: '69921001', nama: 'RA Perwanida Puruk Cahu', jenjang: 'RA', status: 'Swasta', akreditasi: 'A', kepala: 'Hj. Fauziah, S.Pd.', siswa: 95, guru: 8, alamat: 'Komplek Kemenag Murung Raya' },
  { nsm: '101262120002', npsn: '69921002', nama: 'RA Darul Ulum', jenjang: 'RA', status: 'Swasta', akreditasi: 'B', kepala: 'Haryati, S.Pd.I.', siswa: 80, guru: 7, alamat: 'Jl. Bhayangkara, Puruk Cahu' }
];

// Data Pangkalan Guru PAI & SIMPATIKA Terintegrasi
const GURU_PAI_DATA = [
  { nip: '197805122005011003', nama: 'H. M. Mansyur, S.Ag., M.Pd.I.', nuptk: '4532756658200032', tugas: 'Guru Akidah Akhlak - MAN 1 Murung Raya', sertifikasi: 'Sudah Tersertifikasi', status: 'Aktif SIMPATIKA 2026/1' },
  { nip: '198203152008012015', nama: 'Hj. Rahmawati, S.Pd.I.', nuptk: '7841760662300043', tugas: 'Guru Al-Qur\'an Hadis - MTsN 1 Murung Raya', sertifikasi: 'Sudah Tersertifikasi', status: 'Aktif SIMPATIKA 2026/1' },
  { nip: '198509202010011022', nama: 'Fahrurrazi, S.Pd.I.', nuptk: '1245763665200012', tugas: 'Guru Fikih - MTsN 2 Murung Raya', sertifikasi: 'Sudah Tersertifikasi', status: 'Aktif SIMPATIKA 2026/1' },
  { nip: '199004112019032008', nama: 'Nurul Hidayah, S.Pd.', nuptk: '9034768670200021', tugas: 'Guru Kelas MI - MIN 1 Murung Raya', sertifikasi: 'Dalam Proses PPG 2026', status: 'Aktif SIMPATIKA 2026/1' },
  { nip: '198811052014021001', nama: 'Ahmad Syukri, M.Pd.', nuptk: '6743766668200054', tugas: 'Guru SKI - MAS Karya Pembangunan', sertifikasi: 'Sudah Tersertifikasi', status: 'Aktif SIAGA PAI' }
];

export const WebPortalViewerModal: React.FC<WebPortalViewerModalProps> = ({
  isOpen,
  onClose,
  url,
  title,
  singkatan,
  onReturnToBeranda
}) => {
  // Mode tampilan di dalam modal: 'overview' (kartu seperti gambar) atau 'full_embed' (laman penuh di dalam modal tanpa buka tab baru)
  const [viewMode, setViewMode] = useState<'overview' | 'full_embed'>('overview');
  const [embedTab, setEmbedTab] = useState<'iframe' | 'madrasah' | 'guru' | 'layanan'>('iframe');
  const [iframeKey, setIframeKey] = useState<number>(1);
  const [iframeLoading, setIframeLoading] = useState<boolean>(true);
  const [searchFilter, setSearchFilter] = useState<string>('');

  if (!isOpen) return null;

  const isWebUtama = url.includes('murungraya.kemenag.go.id') || url.includes('kemenag.go.id');
  const isSipendis = url.includes('sipendismura.my.id') || url.toLowerCase().includes('pendis');

  const cleanDomain = url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  const handleReturnToBeranda = () => {
    onClose();
    onReturnToBeranda();
  };

  // Requirement: Buka Laman SI-PENDISMURA Penuh menyesuaikan DI DALAM TAMPILAN sehingga TIDAK MEMBUKA TAB BARU
  const handleOpenInsideModal = (tabPreset: 'iframe' | 'madrasah' | 'guru' | 'layanan' = 'iframe') => {
    setEmbedTab(tabPreset);
    setViewMode('full_embed');
    setIframeLoading(true);
  };

  const handleReloadIframe = () => {
    setIframeLoading(true);
    setIframeKey(prev => prev + 1);
  };

  const filteredMadrasah = MADRASAH_DATA.filter(m => 
    m.nama.toLowerCase().includes(searchFilter.toLowerCase()) ||
    m.nsm.includes(searchFilter) ||
    m.kepala.toLowerCase().includes(searchFilter.toLowerCase()) ||
    m.jenjang.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const filteredGuru = GURU_PAI_DATA.filter(g =>
    g.nama.toLowerCase().includes(searchFilter.toLowerCase()) ||
    g.nip.includes(searchFilter) ||
    g.tugas.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 rounded-3xl shadow-2xl w-full max-w-6xl h-[94vh] flex flex-col overflow-hidden border border-emerald-500/40">
        
        {/* TOP BAR / NAVIGATION HEADER (PERSISTENT & ACCORDING TO USER'S SCREENSHOT) */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white px-4 py-3 border-b border-emerald-800/60 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* PRIMARY REQUIREMENT: TOMBOL KEMBALI KE BERANDA PTSP (SEPERTI PADA GAMBAR) */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleReturnToBeranda}
              className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-black text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95 ring-2 ring-amber-300/60"
              title="Klik untuk langsung kembali ke Beranda PTSP Kemenag Murung Raya"
            >
              <ArrowLeft className="w-4 h-4 stroke-[3]" />
              <span className="uppercase tracking-wider">Kembali ke Beranda PTSP</span>
            </button>

            <div className="hidden lg:flex items-center gap-2 text-xs text-emerald-200 pl-2 border-l border-emerald-700/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Portal Terkoneksi Resmi</span>
            </div>
          </div>

          {/* Center Address Pill */}
          <div className="flex-1 max-w-md hidden md:flex items-center justify-center">
            <div className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-1.5 flex items-center gap-2 text-xs font-mono text-emerald-200">
              <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{url}</span>
              <span className="text-[10px] bg-emerald-800 text-emerald-200 px-1.5 py-0.2 rounded font-sans font-bold ml-auto shrink-0">
                HTTPS
              </span>
            </div>
          </div>

          {/* Right Action Buttons: TIDAK MEMBUKA TAB BARU, MELAIN KAN TAMPILAN PENUH DIDALAM LAYAR */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (viewMode === 'full_embed') {
                  setViewMode('overview');
                } else {
                  handleOpenInsideModal('iframe');
                }
              }}
              className="px-3.5 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 hover:text-white text-xs font-bold rounded-xl border border-emerald-500/40 flex items-center gap-1.5 transition-all cursor-pointer"
              title={viewMode === 'full_embed' ? 'Beralih ke Ringkasan' : 'Tampilkan laman penuh menyesuaikan di dalam layar'}
            >
              {viewMode === 'full_embed' ? (
                <>
                  <Layers className="w-3.5 h-3.5 text-amber-300" />
                  <span>Mode Ringkasan</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Tampilan Laman Penuh</span>
                </>
              )}
            </button>

            <button
              onClick={handleReturnToBeranda}
              className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-rose-600/80 transition-colors cursor-pointer"
              title="Tutup dan Kembali ke Beranda PTSP"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* INFO NOTICE BANNER (PERSISTENT SEPERTI PADA GAMBAR) */}
        <div className="bg-emerald-950/90 text-emerald-100 text-xs px-4 py-2 border-b border-emerald-900 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>
              Sedang mengakses <strong>{title}</strong>. Saat Anda selesai atau kembali, sistem secara otomatis mengarahkan Anda ke <strong>Beranda PTSP Kemenag Murung Raya</strong>.
            </span>
          </div>
          <button
            onClick={handleReturnToBeranda}
            className="text-[11px] text-amber-300 hover:text-amber-200 font-bold underline shrink-0 cursor-pointer hidden sm:inline"
          >
            ← Tutup & Ke Beranda PTSP
          </button>
        </div>

        {/* MAIN BODY: VIEW SWITCHER (OVERVIEW ATAU FULL EMBED DIDALAM TAMPILAN) */}
        {viewMode === 'overview' ? (
          /* =========================================================================
             MODE OVERVIEW (PERSIS SEPERTI GAMBAR USER DENGAN PERINTAH SESUAI KEINGINAN)
             ========================================================================= */
          <div className="flex-1 bg-slate-950 relative overflow-y-auto p-6 sm:p-10">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* HERO CARD UTAMA */}
              <div className="bg-gradient-to-br from-slate-900 to-emerald-950 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-bold border border-emerald-600/50 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-amber-300" />
                        {isWebUtama ? 'Web Utama Kemenag RI / Daerah' : 'Portal Pendidikan Islam Terpadu'}
                      </span>
                      <span className="text-xs text-emerald-300 font-mono bg-black/40 px-2 py-0.5 rounded border border-white/10">
                        {cleanDomain}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {title}
                    </h2>

                    <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
                      {isWebUtama ? (
                        'Portal informasi dan publikasi resmi Kantor Kementerian Agama Kabupaten Murung Raya. Menyajikan berita terkini, regulasi keagamaan, data madrasah, KUA kecamatan, program kerukunan umat beragama, dan layanan masyarakat.'
                      ) : (
                        'Sistem Informasi Pendidikan Islam Terpadu Seksi Pendidikan Islam Kantor Kemenag Kabupaten Murung Raya. Terintegrasi dengan pangkalan data madrasah, EMIS, SIMPATIKA, guru PAI, dan layanan operasional pendidikan Islam.'
                      )}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-emerald-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Sertifikat SSL Aman</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-emerald-300">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Domain Resmi Pemerintah RI</span>
                      </div>
                    </div>
                  </div>

                  {/* TOMBOL AKSI UTAMA: MENYESUAIKAN DI DALAM TAMPILAN (TIDAK MEMBUKA TAB BARU) */}
                  <div className="flex flex-col gap-3 shrink-0">
                    <button
                      onClick={() => handleOpenInsideModal('iframe')}
                      className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95"
                      title="Klik untuk membuka laman penuh langsung di dalam tampilan aplikasi (tanpa tab baru)"
                    >
                      <Maximize2 className="w-4 h-4" />
                      Buka Laman {singkatan || 'SI-PENDISMURA'} Penuh
                    </button>

                    <button
                      onClick={handleReturnToBeranda}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-2xl border border-white/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Selesai & Ke Beranda PTSP
                    </button>
                  </div>
                </div>
              </div>

              {/* TIGA KARTU SEPERTI PADA GAMBAR: SEMUA MENYESUAIKAN DI DALAM TAMPILAN TANPA TAB BARU */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  onClick={() => handleOpenInsideModal('madrasah')}
                  className="bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-4 transition-all cursor-pointer group shadow-lg"
                  title="Klik untuk membuka Data Lembaga Madrasah di dalam tampilan"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-300 flex items-center justify-center mb-3 group-hover:bg-emerald-800 transition-colors">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors flex items-center justify-between">
                    <span>{isWebUtama ? 'Berita & Publikasi Kantor' : 'Data Lembaga Madrasah'}</span>
                    <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {isWebUtama ? 'Informasi kegiatan Kepala Kantor, pelantikan, pembinaan ASN, dan hari besar keagamaan.' : 'NSM, NPSN, akreditasi, dan jumlah peserta didik madrasah RA/MI/MTs/MA se-Kabupaten Murung Raya.'}
                  </p>
                  <span className="mt-2.5 inline-block text-[11px] font-semibold text-emerald-400">
                    Buka di dalam layar ↓
                  </span>
                </div>

                <div 
                  onClick={() => handleOpenInsideModal('guru')}
                  className="bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-4 transition-all cursor-pointer group shadow-lg"
                  title="Klik untuk membuka Pangkalan PAI & Guru di dalam tampilan"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-950 text-teal-300 flex items-center justify-center mb-3 group-hover:bg-teal-800 transition-colors">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-white group-hover:text-teal-300 transition-colors flex items-center justify-between">
                    <span>{isWebUtama ? 'Layanan Keagamaan & KUA' : 'Pangkalan PAI & Guru'}</span>
                    <ChevronRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition-transform" />
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {isWebUtama ? 'Pencatatan nikah, kalibrasi arah kiblat, wakaf, dan sertifikasi rumah ibadah.' : 'Pendataan sertifikasi guru madrasah, SIMPATIKA, inpassing, dan tunjangan profesi guru.'}
                  </p>
                  <span className="mt-2.5 inline-block text-[11px] font-semibold text-teal-400">
                    Buka di dalam layar ↓
                  </span>
                </div>

                <div 
                  onClick={handleReturnToBeranda}
                  className="bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 rounded-2xl p-4 transition-all cursor-pointer group shadow-lg"
                  title="Kembali ke Beranda PTSP"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center mb-3">
                    <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <h4 className="font-bold text-sm text-amber-300">
                    Kembali ke Beranda PTSP
                  </h4>
                  <p className="text-xs text-emerald-200 mt-1 line-clamp-2">
                    Kembali ke halaman utama PTSP Online untuk mengajukan permohonan, melacak resi, atau mengunduh dokumen TTE.
                  </p>
                  <span className="mt-2.5 inline-block text-[11px] font-semibold text-amber-300">
                    Kembali sekarang ←
                  </span>
                </div>
              </div>

              {/* FOOTER NOTICE */}
              <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-900/60 text-center text-xs text-emerald-300/90">
                💡 <em>Laman web dibuka langsung menyesuaikan di dalam aplikasi tanpa membuka tab baru browser.</em>
              </div>
            </div>
          </div>
        ) : (
          /* =========================================================================
             MODE FULL EMBED (MENYESUAIKAN DI DALAM TAMPILAN, TIDAK MEMBUKA TAB BARU)
             ========================================================================= */
          <div className="flex-1 bg-slate-950 flex flex-col overflow-hidden">
            {/* SUB-HEADER TOOLBAR DI DALAM TAMPILAN */}
            <div className="bg-slate-900 border-b border-emerald-900/70 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <button
                  onClick={() => setEmbedTab('iframe')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    embedTab === 'iframe'
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'bg-white/5 text-emerald-200 hover:bg-white/10'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Laman Web Langsung (Iframe)</span>
                </button>

                <button
                  onClick={() => setEmbedTab('madrasah')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    embedTab === 'madrasah'
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'bg-white/5 text-emerald-200 hover:bg-white/10'
                  }`}
                >
                  <School className="w-3.5 h-3.5" />
                  <span>Data Madrasah & RA ({MADRASAH_DATA.length})</span>
                </button>

                <button
                  onClick={() => setEmbedTab('guru')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    embedTab === 'guru'
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'bg-white/5 text-emerald-200 hover:bg-white/10'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Data Guru & SIMPATIKA</span>
                </button>

                <button
                  onClick={() => setEmbedTab('layanan')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    embedTab === 'layanan'
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'bg-white/5 text-emerald-200 hover:bg-white/10'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Layanan Operasional Pendis</span>
                </button>
              </div>

              {/* Tombol Kontrol Cepat */}
              <div className="flex items-center gap-2 shrink-0">
                {embedTab === 'iframe' && (
                  <button
                    onClick={handleReloadIframe}
                    className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-emerald-200 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                    title="Muat ulang bingkai web"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Muat Ulang</span>
                  </button>
                )}

                <button
                  onClick={() => setViewMode('overview')}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-amber-300" />
                  <span>Kembali ke Ringkasan</span>
                </button>
              </div>
            </div>

            {/* KONTEN UTAMA DIDALAM TAMPILAN SESUAI TAB YANG AKTIF */}
            <div className="flex-1 overflow-hidden relative flex flex-col bg-slate-950">
              {/* TAB 1: IFRAME WEB LANGSUNG DENGAN PERLINDUNGAN FALLBACK */}
              {embedTab === 'iframe' && (
                <div className="flex-1 w-full h-full flex flex-col relative overflow-hidden p-3 sm:p-4">
                  {/* Banner status dalam layar */}
                  <div className="bg-emerald-950/80 border border-emerald-800/60 rounded-xl px-3.5 py-2 text-xs text-emerald-200 mb-2.5 flex items-center justify-between gap-3 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      <span>Menampilkan <strong>{url}</strong> langsung di dalam aplikasi PTSP (tanpa tab baru).</span>
                    </div>
                    <span className="text-[11px] text-amber-300 font-medium hidden md:inline">
                      Semua interaksi tetap berada di dalam jendela modal ini
                    </span>
                  </div>

                  {/* FRAME EMBED IFRAME */}
                  <div className="flex-1 w-full h-full bg-white rounded-2xl overflow-hidden border-2 border-emerald-500/30 relative shadow-2xl">
                    <iframe
                      key={iframeKey}
                      src={url}
                      title={title}
                      className="w-full h-full border-0"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      onLoad={() => setIframeLoading(false)}
                    />

                    {/* Hint bawah jika frame terhalang kebijakan keamanan domain luar */}
                    <div className="absolute bottom-2 left-2 right-2 bg-slate-900/90 backdrop-blur-md border border-emerald-500/40 rounded-xl p-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-100 shadow-xl pointer-events-auto">
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-amber-300 shrink-0" />
                        <span>
                          Jika penyedia domain membatasi izin bingkai (X-Frame-Options), Anda dapat melihat seluruh pangkalan data resmi secara terintegrasi:
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEmbedTab('madrasah')}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] rounded-lg cursor-pointer transition-colors"
                        >
                          Lihat Data Madrasah & RA
                        </button>
                        <button
                          onClick={() => setEmbedTab('guru')}
                          className="px-2.5 py-1 bg-teal-600 hover:bg-teal-500 text-white font-bold text-[11px] rounded-lg cursor-pointer transition-colors"
                        >
                          Lihat Pangkalan Guru PAI
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: DATA LEMBAGA MADRASAH TERINTEGRASI */}
              {embedTab === 'madrasah' && (
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                  <div className="bg-slate-900 border border-emerald-800/60 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-white text-base flex items-center gap-2">
                        <School className="w-5 h-5 text-emerald-400" />
                        Pangkalan Data Madrasah & RA Se-Kabupaten Murung Raya
                      </h3>
                      <p className="text-xs text-emerald-300/80 mt-0.5">
                        Sumber sinkronisasi: EMIS 4.0 & SI-PENDISMURA (sipendismura.my.id)
                      </p>
                    </div>

                    <div className="relative w-full sm:w-64">
                      <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Cari madrasah, NSM, kepala..."
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                        className="w-full bg-slate-950 border border-emerald-700/60 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {filteredMadrasah.map((item, idx) => (
                      <div key={idx} className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-4 transition-all shadow-md">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700">
                            {item.jenjang} • {item.status}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                            Akreditasi {item.akreditasi}
                          </span>
                        </div>
                        <h4 className="font-bold text-white text-sm">{item.nama}</h4>
                        <p className="text-xs text-slate-300 mt-1">Kepala: {item.kepala}</p>
                        
                        <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                          <span>NSM: <strong className="text-emerald-300 font-mono">{item.nsm}</strong></span>
                          <span>{item.siswa} Siswa • {item.guru} Guru</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1.5 truncate">
                          📍 {item.alamat}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: DATA GURU & SIMPATIKA */}
              {embedTab === 'guru' && (
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                  <div className="bg-slate-900 border border-teal-800/60 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-white text-base flex items-center gap-2">
                        <Users className="w-5 h-5 text-teal-400" />
                        Pangkalan Data Guru PAI & Tenaga Kependidikan Madrasah
                      </h3>
                      <p className="text-xs text-teal-300/80 mt-0.5">
                        Terkoneksi dengan SIMPATIKA Kemenag & SIAGA PAI Wilayah Murung Raya
                      </p>
                    </div>

                    <div className="relative w-full sm:w-64">
                      <Search className="w-4 h-4 text-teal-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Cari nama guru, NIP, tugas..."
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                        className="w-full bg-slate-950 border border-teal-700/60 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {filteredGuru.map((guru, idx) => (
                      <div key={idx} className="bg-slate-900 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                        <div className="space-y-1">
                          <h4 className="font-bold text-white text-sm">{guru.nama}</h4>
                          <p className="text-xs text-teal-300">{guru.tugas}</p>
                          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 pt-0.5">
                            <span>NIP: <strong className="text-slate-200 font-mono">{guru.nip}</strong></span>
                            <span>•</span>
                            <span>NUPTK: <strong className="text-slate-200 font-mono">{guru.nuptk}</strong></span>
                          </div>
                        </div>

                        <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-1.5 shrink-0">
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700">
                            ✓ {guru.sertifikasi}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {guru.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: LAYANAN OPERASIONAL PENDIS */}
              {embedTab === 'layanan' && (
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                  <div className="bg-slate-900 border border-amber-800/60 rounded-2xl p-4">
                    <h3 className="font-bold text-white text-base flex items-center gap-2">
                      <FileText className="w-5 h-5 text-amber-400" />
                      Layanan Operasional Seksi Pendidikan Islam Terpadu
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Permohonan layanan ini terintegrasi langsung dengan loket digital PTSP Kemenag Murung Raya.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <h4 className="font-bold text-white text-sm">Rekomendasi Izin Operasional Lembaga</h4>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        Penerbitan surat rekomendasi teknis pendirian dan perpanjangan izin operasional RA, MI, MTs, dan MA di lingkungan Kemenag Murung Raya.
                      </p>
                      <button
                        onClick={handleReturnToBeranda}
                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Ajukan Lewat PTSP Online
                      </button>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                        <h4 className="font-bold text-white text-sm">Surat Keterangan Pengganti Ijazah Rusak/Hilang</h4>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        Layanan verifikasi dan penerbitan surat keterangan pengganti ijazah madrasah yang hilang atau rusak sesuai standar TTE BSrE.
                      </p>
                      <button
                        onClick={handleReturnToBeranda}
                        className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Ajukan Lewat PTSP Online
                      </button>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                        <h4 className="font-bold text-white text-sm">Rekomendasi Mutasi Peserta Didik Madrasah</h4>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        Pengesahan surat rekomendasi pindah madrasah antar kabupaten/kota maupun antar provinsi dengan validasi data EMIS.
                      </p>
                      <button
                        onClick={handleReturnToBeranda}
                        className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Ajukan Lewat PTSP Online
                      </button>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                        <h4 className="font-bold text-white text-sm">Konsultasi SIMPATIKA & Tunjangan Profesi Guru</h4>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        Bantuan teknis aktivasi akun, verval NRG, pencetakan S25, dan pengajuan tunjangan profesi guru madrasah.
                      </p>
                      <button
                        onClick={handleReturnToBeranda}
                        className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Konsultasi Lewat PTSP
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
