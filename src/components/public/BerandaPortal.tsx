import React, { useState } from 'react';
import { usePTSP } from '../../context/PTSPContext';
import { 
  KATALOG_LAYANAN, 
  SEKSI_CONFIG, 
  BERITA_TERKINI, 
  DATA_KEPALA_KANTOR 
} from '../../data/initialData';
import { SeksiType, LayananKatalog, BeritaItem, KepalaKantorHistory } from '../../types/ptsp';
import { 
  Search, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Users, 
  GraduationCap, 
  Landmark, 
  Cross, 
  Flame, 
  Building2, 
  ArrowRight, 
  Calendar, 
  Award, 
  ExternalLink,
  ChevronRight,
  BookOpen,
  HelpCircle,
  FileBadge2,
  X,
  Globe
} from 'lucide-react';

interface BerandaPortalProps {
  onOpenPermohonanModal: (layananPreset?: LayananKatalog) => void;
  onOpenValidatorModal: () => void;
}

export const BerandaPortal: React.FC<BerandaPortalProps> = ({ 
  onOpenPermohonanModal,
  onOpenValidatorModal
}) => {
  const { setActiveView, setSelectedTrackingResi, permohonanList } = usePTSP();
  const [activeKatalogTab, setActiveKatalogTab] = useState<'semua' | SeksiType>('semua');
  const [trackingInput, setTrackingInput] = useState('');
  const [selectedBerita, setSelectedBerita] = useState<BeritaItem | null>(null);
  const [selectedDetailLayanan, setSelectedDetailLayanan] = useState<LayananKatalog | null>(null);

  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingInput.trim()) return;
    setSelectedTrackingResi(trackingInput.trim().toUpperCase());
    setActiveView('tracking_view');
  };

  const filteredLayanan = activeKatalogTab === 'semua'
    ? KATALOG_LAYANAN
    : KATALOG_LAYANAN.filter(l => l.seksi === activeKatalogTab);

  const totalSelesaiTTE = permohonanList.filter(p => p.status === 'selesai_tte').length;

  const getSeksiIcon = (seksi: SeksiType) => {
    switch (seksi) {
      case 'pendis': return <GraduationCap className="w-4 h-4 text-emerald-600" />;
      case 'bimas_islam': return <Landmark className="w-4 h-4 text-teal-600" />;
      case 'bimas_kristen': return <Cross className="w-4 h-4 text-indigo-600" />;
      case 'bimas_hindu': return <Flame className="w-4 h-4 text-amber-600" />;
      case 'kepegawaian': return <Building2 className="w-4 h-4 text-purple-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative bg-linear-to-b from-emerald-900 via-emerald-800 to-teal-900 text-white overflow-hidden py-12 md:py-20 px-4 sm:px-6">
        {/* Background decorative patterns */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-700/60 border border-emerald-400/30 text-emerald-200 text-xs font-semibold mb-4 backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Sistem Pelayanan Terpadu Satu Pintu & TTE BSrE Terintegrasi
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
              Layanan Keagamaan Modern, Cepat & Bebas Pungli
            </h1>

            <p className="text-sm sm:text-base text-emerald-100 font-medium mb-8 leading-relaxed">
              Selamat datang di portal pelayanan digital resmi Kantor Kementerian Agama Kabupaten Musi Rawas. 
              Ajukan permohonan rekomendasi, izin madrasah, rumah ibadah, dan administrasi kepegawaian secara daring 
              dengan validasi Tanda Tangan Elektronik resmi.
            </p>

            {/* Quick Tracking Resi Input Box */}
            <div className="bg-white p-2.5 sm:p-3 rounded-2xl shadow-2xl max-w-xl mx-auto border border-emerald-200/40">
              <form onSubmit={handleTrackingSubmit} className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative flex-1 w-full">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    placeholder="Masukkan Nomor Resi (misal: PTSP-MURA-2026-0038)"
                    className="w-full text-slate-900 text-sm pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-hidden font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  Lacak Berkas
                </button>
              </form>

              {/* Sample resi pills */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">Contoh Resi Aktif:</span>
                <button 
                  type="button"
                  onClick={() => { setSelectedTrackingResi('PTSP-MURA-2026-0038'); setActiveView('tracking_view'); }}
                  className="text-emerald-700 hover:underline font-mono bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 cursor-pointer"
                >
                  PTSP-MURA-2026-0038 (TTE Sah)
                </button>
                <button 
                  type="button"
                  onClick={() => { setSelectedTrackingResi('PTSP-MURA-2026-0042'); setActiveView('tracking_view'); }}
                  className="text-teal-700 hover:underline font-mono bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200 cursor-pointer"
                >
                  PTSP-MURA-2026-0042 (Siap TTE)
                </button>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onOpenPermohonanModal()}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-black rounded-xl text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                Ajukan Permohonan Baru
              </button>
              <button
                onClick={onOpenValidatorModal}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-sm border border-white/20 transition-all flex items-center gap-2 backdrop-blur-xs cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                Cek Keaslian Dokumen TTE
              </button>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-300">17</div>
              <div className="text-xs text-emerald-200 font-semibold mt-1">Layanan PTSP 5 Seksi</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-black text-emerald-300">{permohonanList.length}</div>
              <div className="text-xs text-emerald-200 font-semibold mt-1">Total Permohonan Masuk</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-black text-white">{totalSelesaiTTE}</div>
              <div className="text-xs text-emerald-200 font-semibold mt-1">Dokumen Resmi Ber-TTE</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-300">98.4%</div>
              <div className="text-xs text-emerald-200 font-semibold mt-1">Indeks Kepuasan Masyarakat</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ALUR PELAYANAN PTSP DENGAN TTE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Alur Pelayanan Satu Pintu (PTSP) Online
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Transparan, terstruktur, dan terpantau secara real-time dari registrasi berkas hingga terbitnya dokumen resmi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-sm mb-2 shadow-2xs">
                1
              </div>
              <h4 className="font-bold text-xs text-slate-900 mb-1">Daftar Mandiri</h4>
              <p className="text-[11px] text-slate-600">Pemohon mengisi formulir & unggah dokumen persyaratan digital.</p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 font-black flex items-center justify-center text-sm mb-2 shadow-2xs">
                2
              </div>
              <h4 className="font-bold text-xs text-blue-950 mb-1">Verifikasi Operator</h4>
              <p className="text-[11px] text-slate-600">Operator Front Office PTSP memvalidasi keabsahan checklist berkas.</p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 font-black flex items-center justify-center text-sm mb-2 shadow-2xs">
                3
              </div>
              <h4 className="font-bold text-xs text-teal-950 mb-1">Telaah Seksi</h4>
              <p className="text-[11px] text-slate-600">Tim teknis seksi (Pendis/Bimas/TU) menelaah & menyusun konsep SK.</p>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-800 font-black flex items-center justify-center text-sm mb-2 shadow-2xs">
                4
              </div>
              <h4 className="font-bold text-xs text-purple-950 mb-1">TTE Pimpinan (BSrE)</h4>
              <p className="text-[11px] text-slate-600">Kepala Kantor menandatangani digital menggunakan sertifikat BSrE.</p>
            </div>

            {/* Step 5 */}
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-300 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center text-sm mb-2 shadow-2xs">
                5
              </div>
              <h4 className="font-bold text-xs text-emerald-950 mb-1">Unduh Dokumen Sah</h4>
              <p className="text-[11px] text-slate-600">Dokumen resmi ber-QR Code terbit & siap diunduh secara online.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KATALOG PTSP KEMENAG MURA (PERSYARATAN 1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
              <FileBadge2 className="w-4 h-4" />
              Katalog Pelayanan Terpadu Satu Pintu
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Standar & Katalog Layanan per Seksi
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Pilih layanan sesuai seksi terkait untuk melihat persyaratan lengkap dan mengajukan permohonan.
            </p>
          </div>

          {/* Biaya Rp 0 Badge */}
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="text-xs">
              <p className="font-bold text-emerald-950">Biaya Layanan: Rp 0,- (GRATIS)</p>
              <p className="text-emerald-700">Komitmen Wilayah Bebas dari Korupsi (WBK)</p>
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          <button
            onClick={() => setActiveKatalogTab('semua')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeKatalogTab === 'semua'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Semua Layanan ({KATALOG_LAYANAN.length})
          </button>

          <button
            onClick={() => setActiveKatalogTab('kepegawaian')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeKatalogTab === 'kepegawaian'
                ? 'bg-purple-800 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-purple-900 hover:bg-purple-50'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-purple-600" />
            Subbag Tata Usaha (Kepegawaian)
          </button>

          <button
            onClick={() => setActiveKatalogTab('pendis')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeKatalogTab === 'pendis'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-emerald-900 hover:bg-emerald-50'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
            Pendidikan Islam (Pendis)
          </button>

          <button
            onClick={() => setActiveKatalogTab('bimas_islam')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeKatalogTab === 'bimas_islam'
                ? 'bg-teal-800 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-teal-900 hover:bg-teal-50'
            }`}
          >
            <Landmark className="w-3.5 h-3.5 text-teal-600" />
            Bimas Islam
          </button>

          <button
            onClick={() => setActiveKatalogTab('bimas_hindu')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeKatalogTab === 'bimas_hindu'
                ? 'bg-amber-700 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-amber-900 hover:bg-amber-50'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            Bimas Hindu
          </button>

          <button
            onClick={() => setActiveKatalogTab('bimas_kristen')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeKatalogTab === 'bimas_kristen'
                ? 'bg-indigo-800 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-indigo-900 hover:bg-indigo-50'
            }`}
          >
            <Cross className="w-3.5 h-3.5 text-indigo-600" />
            Bimas Kristen
          </button>
        </div>

        {/* SIPENDIS MURA Link Alert for Pendis tab */}
        {activeKatalogTab === 'pendis' && (
          <div className="mb-6 p-4 rounded-2xl bg-linear-to-r from-emerald-900 to-teal-900 text-white border border-emerald-500/40 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  Portal Web Resmi Baru: SIPENDIS MURA (sipendismura.my.id)
                  <span className="text-[10px] font-extrabold bg-amber-400 text-emerald-950 px-2 py-0.2 rounded-full">Baru</span>
                </h4>
                <p className="text-xs text-emerald-200">
                  Akses langsung pangkalan data madrasah, pesantren, dan pendidik PAI se-Kabupaten Musi Rawas.
                </p>
              </div>
            </div>
            <a
              href="https://sipendismura.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              Koneksi ke sipendismura.my.id <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Layanan Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLayanan.map((lay) => {
            const seksiInfo = SEKSI_CONFIG[lay.seksi];
            return (
              <div 
                key={lay.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:border-emerald-400"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                      {lay.kode}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600">
                      {getSeksiIcon(lay.seksi)}
                      {seksiInfo.singkatan}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-slate-900 mb-2 group-hover:text-emerald-800 transition-colors">
                    {lay.namaLayanan}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                    {lay.deskripsi}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" /> Estimasi Proses:
                      </span>
                      <span className="font-bold text-slate-800">{lay.estimasiHari} Hari Kerja</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Keluaran Dokumen:</span>
                      <span className="font-semibold text-emerald-800 truncate max-w-[160px]">{lay.outputDokumen}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedDetailLayanan(lay)}
                    className="text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
                  >
                    Syarat Berkas ({lay.dokumenSyarat.length})
                  </button>
                  <button
                    onClick={() => onOpenPermohonanModal(lay)}
                    className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1 shadow-2xs cursor-pointer"
                  >
                    Ajukan <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. BERITA TERKINI KEMENAG MURA (PERSYARATAN 1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" />
              Pemberitaan Resmi
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Berita Terkini Kemenag Musi Rawas
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Informasi agenda kerja, inovasi layanan, dan perkembangan keagamaan di Kabupaten Musi Rawas.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BERITA_TERKINI.slice(0, 3).map((berita) => (
            <div 
              key={berita.id}
              onClick={() => setSelectedBerita(berita)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img 
                    src={berita.gambarUrl} 
                    alt={berita.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-emerald-900/90 text-white font-bold text-[10px] px-2.5 py-1 rounded-md backdrop-blur-xs">
                    {berita.kategori}
                  </span>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{berita.tanggal}</span>
                    <span>•</span>
                    <span>{berita.penulis}</span>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 mb-2">
                    {berita.judul}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3">
                    {berita.ringkasan}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Baca Selengkapnya <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. DATA KEPALA KANTOR KEMENAG MURA DARI PERTAMA SAMPAI TERBARU (PERSYARATAN 1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-20">
        <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-emerald-800/40">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold mb-3">
              <Award className="w-4 h-4 text-amber-400" />
              Historis Kepemimpinan Kantor Kemenag Kabupaten Musi Rawas
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-2">
              Daftar Kepala Kantor dari Pertama Sampai Terbaru
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200">
              Jejak pengabdian pimpinan Kantor Kementerian Agama Kabupaten Musi Rawas dalam membina kerukunan umat dan memajukan pendidikan keagamaan sejak tahun 1968.
            </p>
          </div>

          {/* Leaders Carousel/Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DATA_KEPALA_KANTOR.map((kakan) => {
              const isAktif = kakan.status === 'Menjabat (Aktif)';
              return (
                <div 
                  key={kakan.id}
                  className={`rounded-2xl p-4 transition-all flex flex-col justify-between ${
                    isAktif 
                      ? 'bg-linear-to-b from-emerald-800/90 to-emerald-950/90 border-2 border-amber-400/80 ring-4 ring-amber-400/10 shadow-xl' 
                      : 'bg-white/5 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <div>
                    {/* Head photo and order badge */}
                    <div className="relative mb-3 flex items-center justify-center">
                      <img 
                        src={kakan.fotoUrl} 
                        alt={kakan.nama}
                        className={`w-20 h-20 rounded-full object-cover border-2 ${
                          isAktif ? 'border-amber-400 ring-4 ring-emerald-500/30' : 'border-white/20'
                        }`}
                      />
                      <span className={`absolute -bottom-1 px-2 py-0.5 rounded-full text-[10px] font-black ${
                        isAktif ? 'bg-amber-400 text-emerald-950' : 'bg-slate-800 text-slate-300 border border-white/20'
                      }`}>
                        Ke-{kakan.urutan}
                      </span>
                    </div>

                    <div className="text-center">
                      {isAktif && (
                        <span className="inline-block px-2 py-0.5 bg-amber-400/30 text-amber-300 border border-amber-400/40 text-[9px] font-extrabold rounded-full mb-1">
                          ★ Pejabat Aktif Saat Ini
                        </span>
                      )}
                      <h4 className="font-bold text-sm text-white line-clamp-1">{kakan.nama}</h4>
                      <p className="text-[11px] text-amber-300 font-medium">{kakan.gelar}</p>
                      
                      <div className="mt-2 py-1 px-2 rounded-lg bg-black/20 text-[11px] font-mono text-emerald-200">
                        Periode: {kakan.periode}
                      </div>
                    </div>

                    <p className="mt-3 text-[11px] text-slate-300/90 line-clamp-3 text-center leading-relaxed">
                      {kakan.prestasi}
                    </p>
                  </div>

                  {kakan.nip && kakan.nip !== '-' && (
                    <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-center text-slate-400 font-mono">
                      NIP: {kakan.nip}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. DETAIL PERSYARATAN MODAL */}
      {selectedDetailLayanan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200">
            <div className="bg-emerald-900 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase bg-emerald-800 px-2 py-0.5 rounded font-bold">
                  {selectedDetailLayanan.kode}
                </span>
                <h3 className="font-bold text-base text-white mt-1">{selectedDetailLayanan.namaLayanan}</h3>
              </div>
              <button 
                onClick={() => setSelectedDetailLayanan(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 max-h-[75vh] overflow-y-auto space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Deskripsi Layanan</h4>
                <p className="text-xs text-slate-700">{selectedDetailLayanan.deskripsi}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Dasar Hukum</h4>
                <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-mono">
                  {selectedDetailLayanan.dasarHukum}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Dokumen Persyaratan Wajib (Diunggah Digital)
                </h4>
                <ul className="space-y-2">
                  {selectedDetailLayanan.dokumenSyarat.map((syarat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-800 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100">
                      <span className="w-5 h-5 rounded-full bg-emerald-700 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span>{syarat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-500 block text-[11px]">Estimasi Waktu:</span>
                  <span className="font-bold text-slate-900">{selectedDetailLayanan.estimasiHari} Hari Kerja</span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <span className="text-emerald-700 block text-[11px]">Biaya Retribusi:</span>
                  <span className="font-bold text-emerald-900">Rp 0,- (GRATIS)</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => setSelectedDetailLayanan(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  const targetLay = selectedDetailLayanan;
                  setSelectedDetailLayanan(null);
                  onOpenPermohonanModal(targetLay);
                }}
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                Ajukan Sekarang <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. FULL BERITA MODAL */}
      {selectedBerita && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 max-h-[85vh] flex flex-col">
            <div className="relative h-56 shrink-0">
              <img 
                src={selectedBerita.gambarUrl} 
                alt={selectedBerita.judul}
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setSelectedBerita(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="absolute bottom-3 left-3 bg-emerald-900/90 text-white font-bold text-xs px-3 py-1 rounded-md backdrop-blur-xs">
                {selectedBerita.kategori}
              </span>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                <span>{selectedBerita.tanggal}</span>
                <span>•</span>
                <span>Oleh: {selectedBerita.penulis}</span>
                <span>•</span>
                <span>Dibaca: {selectedBerita.dibaca} kali</span>
              </div>

              <h2 className="text-xl font-black text-slate-900 mb-4 leading-snug">
                {selectedBerita.judul}
              </h2>

              <div className="text-sm text-slate-700 leading-relaxed space-y-3 font-normal">
                <p className="font-semibold text-slate-800">{selectedBerita.ringkasan}</p>
                <p>{selectedBerita.isiLengkap}</p>
                <p>
                  Kantor Kementerian Agama Kabupaten Musi Rawas terus berkomitmen memberikan keterbukaan informasi publik dan mewujudkan Wilayah Bebas dari Korupsi (WBK) serta Wilayah Birokrasi Bersih dan Melayani (WBBM) bagi segenap masyarakat Kabupaten Musi Rawas.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedBerita(null)}
                className="px-5 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl hover:bg-emerald-800 cursor-pointer"
              >
                Tutup Berita
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
