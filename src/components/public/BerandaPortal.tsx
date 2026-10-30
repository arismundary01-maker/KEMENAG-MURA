import React, { useState } from 'react';
import { usePTSP } from '../../context/PTSPContext';
import { SEKSI_CONFIG } from '../../data/initialData';
import { SeksiType, LayananKatalog, BeritaItem, KepalaKantorHistory, MenuAplikasiWeb } from '../../types/ptsp';
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
  Globe,
  Crown,
  Plus,
  Pencil,
  Trash2,
  AlertTriangle,
  Check,
  Sparkles,
  Info,
  Layers,
  Compass,
  Link as LinkIcon
} from 'lucide-react';
import { WebPortalViewerModal } from './WebPortalViewerModal';

interface BerandaPortalProps {
  onOpenPermohonanModal: (layananPreset?: LayananKatalog) => void;
  onOpenValidatorModal: () => void;
}

export const BerandaPortal: React.FC<BerandaPortalProps> = ({ 
  onOpenPermohonanModal,
  onOpenValidatorModal
}) => {
  const { 
    setActiveView, 
    setSelectedTrackingResi, 
    permohonanList,
    currentRole,
    katalogLayanan,
    tambahLayanan,
    editLayanan,
    hapusLayanan,
    daftarBerita,
    tambahBerita,
    editBerita,
    hapusBerita,
    dataKepalaKantor,
    tambahKepalaKantor,
    editKepalaKantor,
    hapusKepalaKantor,
    daftarMenuAplikasi,
    tambahMenuAplikasi,
    editMenuAplikasi,
    hapusMenuAplikasi,
    pengaturanWeb
  } = usePTSP();

  const isSuperAdmin = currentRole === 'super_admin';

  const [activeKatalogTab, setActiveKatalogTab] = useState<'semua' | SeksiType>('semua');
  const [katalogSearch, setKatalogSearch] = useState('');
  const [trackingInput, setTrackingInput] = useState('');
  const [selectedBerita, setSelectedBerita] = useState<BeritaItem | null>(null);
  const [selectedDetailLayanan, setSelectedDetailLayanan] = useState<LayananKatalog | null>(null);

  // ==========================================
  // SUPER ADMIN DIRECT MANAGEMENT STATES
  // ==========================================

  // 1. Layanan Modal State
  const [layananModalOpen, setLayananModalOpen] = useState(false);
  const [editingLayanan, setEditingLayanan] = useState<LayananKatalog | null>(null);
  const [layananForm, setLayananForm] = useState<Partial<LayananKatalog>>({
    kode: '',
    seksi: 'pendis',
    namaLayanan: '',
    deskripsi: '',
    estimasiHari: 3,
    biaya: 0,
    dasarHukum: 'PMA RI & Standar Operasional Prosedur PTSP',
    outputDokumen: 'Surat Rekomendasi Resmi TTE BSrE',
    dokumenSyarat: [
      'Surat Permohonan Resmi ditujukan ke Kepala Kantor',
      'Fotokopi KTP Pemohon / Penanggung Jawab',
      'Dokumen Proposal / Berkas Pendukung Lengkap'
    ]
  });
  const [newSyaratInput, setNewSyaratInput] = useState('');

  // 2. Berita Modal State
  const [beritaModalOpen, setBeritaModalOpen] = useState(false);
  const [editingBerita, setEditingBerita] = useState<BeritaItem | null>(null);
  const [beritaForm, setBeritaForm] = useState<Partial<BeritaItem>>({
    judul: '',
    kategori: 'PTSP & Layanan',
    penulis: 'Humas Kemenag Murung Raya',
    gambarUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
    ringkasan: '',
    isiLengkap: ''
  });

  // 3. Kepala Kantor Modal State
  const [kkModalOpen, setKkModalOpen] = useState(false);
  const [editingKK, setEditingKK] = useState<KepalaKantorHistory | null>(null);
  const [kkForm, setKkForm] = useState<Partial<KepalaKantorHistory>>({
    urutan: dataKepalaKantor.length + 1,
    nama: '',
    gelar: 'M.Pd.I',
    nip: '19750101 200003 1 001',
    periode: `${new Date().getFullYear()} - Sekarang`,
    tahunMulai: new Date().getFullYear(),
    tahunSelesai: 'Sekarang',
    status: 'Menjabat (Aktif)',
    prestasi: '',
    fotoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80'
  });

  // 4. Menu Aplikasi State (Tampilan Kartu & Kelola Super Admin)
  const [menuAplikasiModalOpen, setMenuAplikasiModalOpen] = useState(false);
  const [editingMenuAplikasi, setEditingMenuAplikasi] = useState<MenuAplikasiWeb | null>(null);
  const [menuAplikasiForm, setMenuAplikasiForm] = useState<Partial<MenuAplikasiWeb>>({
    namaAplikasi: '',
    singkatan: '',
    kategori: 'portal_utama',
    deskripsi: '',
    url: 'https://',
    badgeText: 'Portal Resmi Kemenag',
    warnaTema: 'emerald',
    ikon: 'Globe',
    statusAktif: true,
    bukaTabBaru: true,
    urutan: 1
  });
  const [kategoriAplikasiFilter, setKategoriAplikasiFilter] = useState<string>('semua');
  const [searchAplikasi, setSearchAplikasi] = useState('');

  // 5. Delete Confirmation State
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: 'layanan' | 'berita' | 'kakan' | 'menu_aplikasi';
    id: string;
    title: string;
  } | null>(null);

  // 6. Web Portal Viewer Modal State (Requirement: Akses Web Utama Resmi & SIPENDIS MURA, kembali otomatis ke Beranda PTSP)
  const [portalViewerData, setPortalViewerData] = useState<{
    isOpen: boolean;
    url: string;
    title: string;
    singkatan?: string;
  } | null>(null);

  // Success Feedback Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenPortalWeb = (app: MenuAplikasiWeb) => {
    // Record auto-return flag in sessionStorage so if opened in tab or on return, it redirects to Beranda PTSP
    sessionStorage.setItem('kemenag_return_to_beranda_on_focus', 'true');
    setPortalViewerData({
      isOpen: true,
      url: app.url,
      title: app.namaAplikasi,
      singkatan: app.singkatan
    });
  };

  const handleReturnToBerandaFromPortal = () => {
    setPortalViewerData(null);
    setActiveView('public_portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('👋 Selamat datang kembali di Beranda PTSP Kemenag Murung Raya!');
  };

  // Tracking submit
  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingInput.trim()) return;
    setSelectedTrackingResi(trackingInput.trim().toUpperCase());
    setActiveView('tracking_view');
  };

  // Saat pengguna memilih seksi/unit layanan, langsung tampilkan seluruh layanan seksi tersebut
  const handleSelectSeksiTab = (seksi: SeksiType | 'semua') => {
    setActiveKatalogTab(seksi);
    setKatalogSearch(''); // Reset kata kunci pencarian agar seluruh layanan seksi terpilih langsung tampil
    setTimeout(() => {
      const el = document.getElementById('daftar-layanan-ptsp');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const filteredLayanan = activeKatalogTab === 'semua'
    ? katalogLayanan
    : katalogLayanan.filter(l => l.seksi === activeKatalogTab);

  const searchedLayanan = filteredLayanan.filter(l => {
    if (!katalogSearch.trim()) return true;
    const q = katalogSearch.trim().toLowerCase();
    return (
      l.namaLayanan.toLowerCase().includes(q) ||
      l.kode.toLowerCase().includes(q) ||
      l.deskripsi.toLowerCase().includes(q) ||
      l.outputDokumen.toLowerCase().includes(q) ||
      l.dokumenSyarat.some(s => s.toLowerCase().includes(q))
    );
  });

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

  // ==========================================
  // HANDLERS: LAYANAN CRUD
  // ==========================================
  const handleOpenAddLayanan = (presetSeksi?: SeksiType) => {
    setEditingLayanan(null);
    setLayananForm({
      kode: `LAY-${Math.floor(100 + Math.random() * 900)}`,
      seksi: presetSeksi || (activeKatalogTab === 'semua' ? 'pendis' : activeKatalogTab),
      namaLayanan: '',
      deskripsi: '',
      estimasiHari: 3,
      biaya: 0,
      dasarHukum: 'PMA RI & Standar Operasional Prosedur PTSP Kemenag',
      outputDokumen: 'Surat Rekomendasi Resmi TTE BSrE',
      dokumenSyarat: [
        'Surat Permohonan Resmi ditujukan ke Kepala Kantor',
        'Fotokopi KTP Pemohon / Penanggung Jawab',
        'Dokumen Proposal / Berkas Pendukung Lengkap'
      ]
    });
    setNewSyaratInput('');
    setLayananModalOpen(true);
  };

  const handleOpenEditLayanan = (lay: LayananKatalog, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingLayanan(lay);
    setLayananForm({
      ...lay,
      dokumenSyarat: [...lay.dokumenSyarat]
    });
    setNewSyaratInput('');
    setLayananModalOpen(true);
  };

  const handleSaveLayanan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!layananForm.namaLayanan?.trim()) return;

    if (editingLayanan) {
      editLayanan(editingLayanan.id, layananForm);
      showToast(`Layanan "${layananForm.namaLayanan}" berhasil diperbarui.`);
    } else {
      tambahLayanan(layananForm);
      showToast(`Layanan baru "${layananForm.namaLayanan}" berhasil ditambahkan.`);
    }
    setLayananModalOpen(false);
    setEditingLayanan(null);
  };

  const handleAddSyaratRow = () => {
    if (!newSyaratInput.trim()) return;
    setLayananForm(prev => ({
      ...prev,
      dokumenSyarat: [...(prev.dokumenSyarat || []), newSyaratInput.trim()]
    }));
    setNewSyaratInput('');
  };

  const handleRemoveSyaratRow = (idx: number) => {
    setLayananForm(prev => ({
      ...prev,
      dokumenSyarat: (prev.dokumenSyarat || []).filter((_, i) => i !== idx)
    }));
  };

  // ==========================================
  // HANDLERS: BERITA CRUD
  // ==========================================
  const handleOpenAddBerita = () => {
    setEditingBerita(null);
    setBeritaForm({
      judul: '',
      kategori: 'PTSP & Layanan',
      penulis: 'Humas Kemenag Murung Raya',
      gambarUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
      ringkasan: '',
      isiLengkap: ''
    });
    setBeritaModalOpen(true);
  };

  const handleOpenEditBerita = (item: BeritaItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingBerita(item);
    setBeritaForm({ ...item });
    setBeritaModalOpen(true);
  };

  const handleSaveBerita = (e: React.FormEvent) => {
    e.preventDefault();
    if (!beritaForm.judul?.trim()) return;

    if (editingBerita) {
      editBerita(editingBerita.id, beritaForm);
      showToast(`Berita "${beritaForm.judul}" berhasil diubah.`);
    } else {
      tambahBerita(beritaForm);
      showToast(`Berita "${beritaForm.judul}" berhasil diterbitkan.`);
    }
    setBeritaModalOpen(false);
    setEditingBerita(null);
  };

  // ==========================================
  // HANDLERS: KEPALA KANTOR CRUD
  // ==========================================
  const handleOpenAddKepalaKantor = () => {
    setEditingKK(null);
    setKkForm({
      urutan: dataKepalaKantor.length + 1,
      nama: '',
      gelar: 'M.Pd.I',
      nip: '19750101 200003 1 001',
      periode: `${new Date().getFullYear()} - Sekarang`,
      tahunMulai: new Date().getFullYear(),
      tahunSelesai: 'Sekarang',
      status: 'Menjabat (Aktif)',
      prestasi: 'Inovasi Digitalisasi Pelayanan Terpadu Satu Pintu',
      fotoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80'
    });
    setKkModalOpen(true);
  };

  const handleOpenEditKepalaKantor = (kk: KepalaKantorHistory, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingKK(kk);
    setKkForm({ ...kk });
    setKkModalOpen(true);
  };

  const handleSaveKepalaKantor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kkForm.nama?.trim()) return;

    if (editingKK) {
      editKepalaKantor(editingKK.id, kkForm);
      showToast(`Data riwayat ${kkForm.nama} berhasil diubah.`);
    } else {
      tambahKepalaKantor(kkForm);
      showToast(`Riwayat Kepala Kantor ke-${kkForm.urutan} berhasil ditambahkan.`);
    }
    setKkModalOpen(false);
    setEditingKK(null);
  };

  // ==========================================
  // HANDLERS: MENU APLIKASI WEB
  // ==========================================
  const handleOpenAddMenuAplikasi = () => {
    setEditingMenuAplikasi(null);
    setMenuAplikasiForm({
      namaAplikasi: '',
      singkatan: '',
      kategori: 'portal_utama',
      deskripsi: '',
      url: 'https://',
      badgeText: 'Portal Resmi Kemenag',
      warnaTema: 'emerald',
      ikon: 'Globe',
      statusAktif: true,
      bukaTabBaru: true,
      urutan: daftarMenuAplikasi.length + 1
    });
    setMenuAplikasiModalOpen(true);
  };

  const handleOpenEditMenuAplikasi = (app: MenuAplikasiWeb, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingMenuAplikasi(app);
    setMenuAplikasiForm({ ...app });
    setMenuAplikasiModalOpen(true);
  };

  const handleSaveMenuAplikasi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!menuAplikasiForm.namaAplikasi?.trim() || !menuAplikasiForm.url?.trim()) return;

    if (editingMenuAplikasi) {
      editMenuAplikasi(editingMenuAplikasi.id, menuAplikasiForm);
      showToast(`Menu Aplikasi "${menuAplikasiForm.namaAplikasi}" berhasil diperbarui.`);
    } else {
      tambahMenuAplikasi(menuAplikasiForm);
      showToast(`Menu Aplikasi "${menuAplikasiForm.namaAplikasi}" berhasil ditambahkan.`);
    }
    setMenuAplikasiModalOpen(false);
    setEditingMenuAplikasi(null);
  };

  const renderAppIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      case 'Building2': return <Building2 className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      case 'Landmark': return <Landmark className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  // ==========================================
  // HANDLERS: DELETE CONFIRMATION
  // ==========================================
  const handleConfirmDelete = (type: 'layanan' | 'berita' | 'kakan' | 'menu_aplikasi', id: string, title: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDeleteConfirm({ type, id, title });
  };

  const handleExecuteDelete = () => {
    if (!deleteConfirm) return;
    if (deleteConfirm.type === 'layanan') {
      hapusLayanan(deleteConfirm.id);
      showToast(`Layanan "${deleteConfirm.title}" berhasil dihapus.`);
    } else if (deleteConfirm.type === 'berita') {
      hapusBerita(deleteConfirm.id);
      showToast(`Berita "${deleteConfirm.title}" berhasil dihapus.`);
    } else if (deleteConfirm.type === 'kakan') {
      hapusKepalaKantor(deleteConfirm.id);
      showToast(`Riwayat Kepala Kantor "${deleteConfirm.title}" berhasil dihapus.`);
    } else if (deleteConfirm.type === 'menu_aplikasi') {
      hapusMenuAplikasi(deleteConfirm.id);
      showToast(`Menu Aplikasi "${deleteConfirm.title}" berhasil dihapus.`);
    }
    setDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. HERO SECTION */}
      <section className="relative bg-linear-to-b from-emerald-900 via-emerald-800 to-teal-900 text-white overflow-hidden py-12 md:py-20 px-4 sm:px-6">
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
              Selamat datang di portal pelayanan digital resmi {pengaturanWeb.namaKantor}. 
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
              <div className="text-2xl sm:text-3xl font-black text-amber-300">
                {katalogLayanan.length}
              </div>
              <p className="text-xs text-emerald-100 font-medium mt-1">Layanan PTSP Aktif</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-300">5</div>
              <p className="text-xs text-emerald-100 font-medium mt-1">Seksi & Subbag Teknis</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-300">100%</div>
              <p className="text-xs text-emerald-100 font-medium mt-1">Biaya Rp 0,- (Gratis)</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-300">
                {totalSelesaiTTE + 128}
              </div>
              <p className="text-xs text-emerald-100 font-medium mt-1">Dokumen Resmi TTE BSrE</p>
            </div>
          </div>
        </div>
      </section>

      {/* SUPER ADMIN QUICK MANAGEMENT TOOLBAR (VISIBLE WHEN SUPER ADMIN) */}
      {isSuperAdmin && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6 relative z-20">
          <div className="bg-linear-to-r from-purple-950 via-purple-900 to-indigo-950 text-white p-4 rounded-2xl shadow-xl border-2 border-purple-400/40 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-purple-950 font-black flex items-center justify-center shrink-0 shadow-md">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                    Akses Kelola Super Admin (Beranda PTSP)
                  </span>
                  <span className="text-[10px] bg-purple-700/80 text-purple-200 border border-purple-400/30 px-2 py-0.5 rounded-full font-bold">
                    Mode Pengelolaan Langsung Aktif
                  </span>
                </div>
                <p className="text-xs text-purple-200/90 mt-0.5">
                  Anda dapat langsung menambah, mengubah, atau menghapus Katalog Layanan, Berita, dan Riwayat Kepala Kantor di Beranda ini.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => handleOpenAddLayanan()}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 text-emerald-200" />
                + Tambah Layanan
              </button>

              <button
                onClick={() => handleOpenAddBerita()}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 text-blue-200" />
                + Tulis Berita
              </button>

              <button
                onClick={() => handleOpenAddKepalaKantor()}
                className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-purple-950 font-black text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 text-purple-950" />
                + Riwayat Kakan
              </button>

              <button
                onClick={() => setActiveView('super_admin_portal')}
                className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition-all cursor-pointer"
              >
                Portal Super Admin
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 2. ALUR LAYANAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-12">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Standar Operasional Prosedur (SOP) Digital
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              Alur Pengajuan & Penerbitan Dokumen PTSP
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Transparan, akuntabel, dan terpantau secara real-time dari registrasi hingga penandatanganan elektronik.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-sm mb-2 shadow-2xs">
                1
              </div>
              <h4 className="font-bold text-xs text-slate-900 mb-1">Pengajuan Mandiri</h4>
              <p className="text-[11px] text-slate-600">Pemohon mengisi formulir online & mengunggah berkas persyaratan.</p>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 font-black flex items-center justify-center text-sm mb-2 shadow-2xs">
                2
              </div>
              <h4 className="font-bold text-xs text-blue-950 mb-1">Verifikasi Operator</h4>
              <p className="text-[11px] text-slate-600">Operator Front Office PTSP memvalidasi keabsahan checklist berkas.</p>
            </div>

            <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 font-black flex items-center justify-center text-sm mb-2 shadow-2xs">
                3
              </div>
              <h4 className="font-bold text-xs text-teal-950 mb-1">Telaah Seksi</h4>
              <p className="text-[11px] text-slate-600">Tim teknis seksi (Pendis/Bimas/TU) menelaah & menyusun konsep SK.</p>
            </div>

            <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-800 font-black flex items-center justify-center text-sm mb-2 shadow-2xs">
                4
              </div>
              <h4 className="font-bold text-xs text-purple-950 mb-1">TTE Pimpinan (BSrE)</h4>
              <p className="text-[11px] text-slate-600">Kepala Kantor menandatangani digital menggunakan sertifikat BSrE.</p>
            </div>

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

      {/* 3. KATALOG PTSP KEMENAG MURA (PERSYARATAN 1 & LANGSUNG EDIT SUPER ADMIN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16" id="katalog-layanan">
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

          <div className="flex items-center gap-3">
            {/* Biaya Rp 0 Badge */}
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-emerald-950">Biaya Layanan: Rp 0,- (GRATIS)</p>
                <p className="text-emerald-700">Komitmen Wilayah Bebas dari Korupsi (WBK)</p>
              </div>
            </div>

            {/* Direct Super Admin Add Service Button */}
            {isSuperAdmin && (
              <button
                onClick={() => handleOpenAddLayanan()}
                className="px-4 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer shrink-0 transition-all ring-2 ring-purple-300"
                title="Super Admin: Tambah Layanan Baru ke Katalog Beranda"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                Tambah Layanan
              </button>
            )}
          </div>
        </div>

        {/* Menu Layanan Seksi Tampilan Kartu (Requirement 2) */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Pilih Seksi / Unit Layanan:</span>
            </p>
            <span className="text-xs text-slate-500 font-medium">
              Klik kartu seksi untuk memfilter daftar layanan
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
            {/* Card 1: Semua Layanan */}
            <button
              type="button"
              onClick={() => handleSelectSeksiTab('semua')}
              className={`text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between group cursor-pointer relative ${
                activeKatalogTab === 'semua'
                  ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-600/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    activeKatalogTab === 'semua' ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    <Layers className="w-5 h-5" />
                  </div>
                  {activeKatalogTab === 'semua' ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Aktif
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                      SEMUA
                    </span>
                  )}
                </div>

                <h3 className={`text-xs sm:text-sm font-bold leading-snug ${
                  activeKatalogTab === 'semua' ? 'text-emerald-950 font-black' : 'text-slate-900 group-hover:text-emerald-700'
                }`}>
                  Semua Layanan
                </h3>

                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  Katalog lengkap seluruh perizinan dan permohonan PTSP.
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Total:</span>
                <span className={`font-bold tabular-nums ${activeKatalogTab === 'semua' ? 'text-emerald-800 font-black' : 'text-slate-700'}`}>
                  {katalogLayanan.length} Layanan
                </span>
              </div>
            </button>

            {/* Card 2: Kepegawaian */}
            <button
              type="button"
              onClick={() => handleSelectSeksiTab('kepegawaian')}
              className={`text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between group cursor-pointer relative ${
                activeKatalogTab === 'kepegawaian'
                  ? 'border-purple-600 bg-purple-50/70 shadow-sm ring-2 ring-purple-600/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    activeKatalogTab === 'kepegawaian' ? 'bg-purple-700 text-white' : 'bg-purple-100 text-purple-800'
                  }`}>
                    <Building2 className="w-5 h-5" />
                  </div>
                  {activeKatalogTab === 'kepegawaian' ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-700 text-white flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Aktif
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-1.5 py-0.5 rounded">
                      TU
                    </span>
                  )}
                </div>

                <h3 className={`text-xs sm:text-sm font-bold leading-snug ${
                  activeKatalogTab === 'kepegawaian' ? 'text-purple-950 font-black' : 'text-slate-900 group-hover:text-purple-700'
                }`}>
                  Tata Usaha / Kepegawaian
                </h3>

                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  Administrasi ASN, kenaikan pangkat, cuti, berkala & mutasi.
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Layanan:</span>
                <span className={`font-bold tabular-nums ${activeKatalogTab === 'kepegawaian' ? 'text-purple-900 font-black' : 'text-slate-700'}`}>
                  {katalogLayanan.filter(l => l.seksi === 'kepegawaian').length} Layanan
                </span>
              </div>
            </button>

            {/* Card 3: Pendidikan Islam (Pendis) */}
            <button
              type="button"
              onClick={() => handleSelectSeksiTab('pendis')}
              className={`text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between group cursor-pointer relative ${
                activeKatalogTab === 'pendis'
                  ? 'border-emerald-600 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-600/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    activeKatalogTab === 'pendis' ? 'bg-emerald-700 text-white' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  {activeKatalogTab === 'pendis' ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-700 text-white flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Aktif
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                      PENDIS
                    </span>
                  )}
                </div>

                <h3 className={`text-xs sm:text-sm font-bold leading-snug ${
                  activeKatalogTab === 'pendis' ? 'text-emerald-950 font-black' : 'text-slate-900 group-hover:text-emerald-700'
                }`}>
                  Pendidikan Islam (Pendis)
                </h3>

                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  IJOP Madrasah, Pesantren, MDT, LPQ & Guru PAI.
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Layanan:</span>
                <span className={`font-bold tabular-nums ${activeKatalogTab === 'pendis' ? 'text-emerald-800 font-black' : 'text-slate-700'}`}>
                  {katalogLayanan.filter(l => l.seksi === 'pendis').length} Layanan
                </span>
              </div>
            </button>

            {/* Card 4: Bimas Islam */}
            <button
              type="button"
              onClick={() => handleSelectSeksiTab('bimas_islam')}
              className={`text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between group cursor-pointer relative ${
                activeKatalogTab === 'bimas_islam'
                  ? 'border-teal-600 bg-teal-50/70 shadow-sm ring-2 ring-teal-600/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    activeKatalogTab === 'bimas_islam' ? 'bg-teal-700 text-white' : 'bg-teal-100 text-teal-800'
                  }`}>
                    <Landmark className="w-5 h-5" />
                  </div>
                  {activeKatalogTab === 'bimas_islam' ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-700 text-white flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Aktif
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-teal-800 bg-teal-100 px-1.5 py-0.5 rounded">
                      BIMAS
                    </span>
                  )}
                </div>

                <h3 className={`text-xs sm:text-sm font-bold leading-snug ${
                  activeKatalogTab === 'bimas_islam' ? 'text-teal-950 font-black' : 'text-slate-900 group-hover:text-teal-700'
                }`}>
                  Bimbingan Masyarakat Islam
                </h3>

                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  Kemasjidan, arah kiblat, tanah wakaf & majelis taklim.
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Layanan:</span>
                <span className={`font-bold tabular-nums ${activeKatalogTab === 'bimas_islam' ? 'text-teal-900 font-black' : 'text-slate-700'}`}>
                  {katalogLayanan.filter(l => l.seksi === 'bimas_islam').length} Layanan
                </span>
              </div>
            </button>

            {/* Card 5: Bimas Hindu */}
            <button
              type="button"
              onClick={() => handleSelectSeksiTab('bimas_hindu')}
              className={`text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between group cursor-pointer relative ${
                activeKatalogTab === 'bimas_hindu'
                  ? 'border-amber-600 bg-amber-50/70 shadow-sm ring-2 ring-amber-600/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    activeKatalogTab === 'bimas_hindu' ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'
                  }`}>
                    <Flame className="w-5 h-5" />
                  </div>
                  {activeKatalogTab === 'bimas_hindu' ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-600 text-white flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Aktif
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                      HINDU
                    </span>
                  )}
                </div>

                <h3 className={`text-xs sm:text-sm font-bold leading-snug ${
                  activeKatalogTab === 'bimas_hindu' ? 'text-amber-950 font-black' : 'text-slate-900 group-hover:text-amber-700'
                }`}>
                  Bimbingan Masyarakat Hindu
                </h3>

                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  Tanda daftar pura, pasraman & rohaniwan Hindu.
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Layanan:</span>
                <span className={`font-bold tabular-nums ${activeKatalogTab === 'bimas_hindu' ? 'text-amber-900 font-black' : 'text-slate-700'}`}>
                  {katalogLayanan.filter(l => l.seksi === 'bimas_hindu').length} Layanan
                </span>
              </div>
            </button>

            {/* Card 6: Bimas Kristen */}
            <button
              type="button"
              onClick={() => handleSelectSeksiTab('bimas_kristen')}
              className={`text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between group cursor-pointer relative ${
                activeKatalogTab === 'bimas_kristen'
                  ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-2 ring-indigo-600/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    activeKatalogTab === 'bimas_kristen' ? 'bg-indigo-700 text-white' : 'bg-indigo-100 text-indigo-800'
                  }`}>
                    <Cross className="w-5 h-5" />
                  </div>
                  {activeKatalogTab === 'bimas_kristen' ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-700 text-white flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Aktif
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-indigo-800 bg-indigo-100 px-1.5 py-0.5 rounded">
                      KRISTEN
                    </span>
                  )}
                </div>

                <h3 className={`text-xs sm:text-sm font-bold leading-snug ${
                  activeKatalogTab === 'bimas_kristen' ? 'text-indigo-950 font-black' : 'text-slate-900 group-hover:text-indigo-700'
                }`}>
                  Bimbingan Masyarakat Kristen
                </h3>

                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  Pendaftaran rumah ibadah, rohaniwan & guru agama.
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Layanan:</span>
                <span className={`font-bold tabular-nums ${activeKatalogTab === 'bimas_kristen' ? 'text-indigo-900 font-black' : 'text-slate-700'}`}>
                  {katalogLayanan.filter(l => l.seksi === 'bimas_kristen').length} Layanan
                </span>
              </div>
            </button>
          </div>
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
                  Akses langsung pangkalan data madrasah, pesantren, dan pendidik PAI se-Kabupaten Murung Raya.
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

        {/* Container Utama Daftar Seluruh Layanan PTSP */}
        <div id="daftar-layanan-ptsp" className="scroll-mt-24 mb-4">
          {activeKatalogTab !== 'semua' ? (
            <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-emerald-900 text-white p-4 sm:p-5 rounded-2xl shadow-md border border-emerald-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-white/10 text-amber-300 flex items-center justify-center shrink-0 border border-white/20">
                  {getSeksiIcon(activeKatalogTab)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-emerald-950 px-2 py-0.5 rounded-full">
                      Seksi Terpilih
                    </span>
                    <span className="text-xs text-emerald-200 font-medium">
                      Kepala: {SEKSI_CONFIG[activeKatalogTab].kepala}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white mt-1">
                    Seluruh Layanan {SEKSI_CONFIG[activeKatalogTab].nama}
                  </h3>
                  <p className="text-xs text-emerald-100/90 mt-0.5">
                    Menampilkan seluruh <strong className="text-amber-300 font-bold">{filteredLayanan.length} layanan resmi</strong> yang siap diajukan secara langsung.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSelectSeksiTab('semua')}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-xs shrink-0"
              >
                <span>Tampilkan Semua Seksi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">
                    Katalog Lengkap Seluruh Layanan PTSP ({katalogLayanan.length} Layanan)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Klik kartu seksi di atas untuk langsung menyaring dan menampilkan seluruh layanan per unit.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search & Filter Bar for List View */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={katalogSearch}
              onChange={(e) => setKatalogSearch(e.target.value)}
              placeholder="Cari dalam daftar layanan (e.g. IJOP, Rekomendasi, Cuti, Nikah)..."
              className="w-full text-xs sm:text-sm pl-9 pr-8 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-hidden font-medium"
            />
            {katalogSearch && (
              <button
                onClick={() => setKatalogSearch('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                title="Hapus kata kunci"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <span>Menampilkan:</span>
            <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg tabular-nums">
              {searchedLayanan.length} Layanan
            </span>
            {activeKatalogTab !== 'semua' && (
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                Seksi: {SEKSI_CONFIG[activeKatalogTab].singkatan}
              </span>
            )}
          </div>
        </div>

        {/* Katalog Layanan PTSP: Tampilan Daftar (Requirement 1) */}
        <div className="space-y-3">
          {searchedLayanan.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center shadow-xs">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">
                Tidak ada layanan yang sesuai dengan kriteria
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                {katalogSearch 
                  ? `Tidak ditemukan layanan dengan kata kunci "${katalogSearch}". Coba kata kunci lain atau pilih seksi berbeda.`
                  : 'Belum ada data layanan untuk kategori seksi ini.'}
              </p>
              <button
                onClick={() => {
                  setKatalogSearch('');
                  setActiveKatalogTab('semua');
                }}
                className="mt-4 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                Reset Filter & Tampilkan Semua Layanan
              </button>
            </div>
          ) : (
            searchedLayanan.map((lay) => {
              const seksiInfo = SEKSI_CONFIG[lay.seksi];
              return (
                <div 
                  key={lay.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 group hover:border-emerald-400 relative"
                >
                  {/* Left & Middle: Main Service Detail */}
                  <div className="flex-1 min-w-0">
                    {/* Top Row: Code, Seksi, Biaya & Super Admin Tools */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                        {lay.kode}
                      </span>

                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">
                        {getSeksiIcon(lay.seksi)}
                        <span>{seksiInfo.nama}</span>
                      </span>

                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                        Rp 0,- (Gratis)
                      </span>

                      {/* Super Admin Direct Edit & Delete Buttons on List Row */}
                      {isSuperAdmin && (
                        <div className="flex items-center gap-1 ml-auto pl-2 border-l border-slate-200">
                          <button
                            onClick={(e) => handleOpenEditLayanan(lay, e)}
                            className="p-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 hover:text-purple-900 transition-colors cursor-pointer"
                            title="Super Admin: Edit Layanan ini"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleConfirmDelete('layanan', lay.id, lay.namaLayanan, e)}
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 hover:text-rose-900 transition-colors cursor-pointer"
                            title="Super Admin: Hapus Layanan ini"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Service Name */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                      {lay.namaLayanan}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed line-clamp-2">
                      {lay.deskripsi}
                    </p>

                    {/* Law & Output Info Strip */}
                    <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <span className="font-medium text-slate-700">Keluaran:</span>
                        <span className="font-semibold text-emerald-800">{lay.outputDokumen}</span>
                      </span>
                      <span className="hidden sm:inline text-slate-300">•</span>
                      <span className="flex items-center gap-1">
                        <span className="font-medium text-slate-700">Dasar Hukum:</span>
                        <span className="text-slate-600 font-mono text-[11px] truncate max-w-[280px]">{lay.dasarHukum}</span>
                      </span>
                    </div>
                  </div>

                  {/* Middle: Service Specs Strip (Estimasi, Biaya, Syarat count) */}
                  <div className="shrink-0 flex sm:flex-row lg:flex-col items-start sm:items-center lg:items-start justify-between gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs min-w-[200px]">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Estimasi:</span>
                      <span className="font-bold text-slate-900 tabular-nums">{lay.estimasiHari} Hari Kerja</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Biaya:</span>
                      <span className="font-bold text-emerald-700">Rp 0,- (Gratis)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>Syarat:</span>
                      <span className="font-semibold text-slate-800 tabular-nums">{lay.dokumenSyarat.length} Berkas Syarat</span>
                    </div>
                  </div>

                  {/* Right: Action Buttons */}
                  <div className="shrink-0 flex items-center sm:flex-row lg:flex-col gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 justify-end min-w-[170px]">
                    <button
                      onClick={() => setSelectedDetailLayanan(lay)}
                      className="w-full text-xs font-bold text-slate-700 hover:text-emerald-800 bg-white border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 py-2.5 px-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Lihat Syarat ({lay.dokumenSyarat.length})</span>
                    </button>
                    <button
                      onClick={() => onOpenPermohonanModal(lay)}
                      className="w-full text-xs sm:text-sm font-bold bg-emerald-700 hover:bg-emerald-800 text-white py-2.5 px-4 rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Ajukan</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* 4. BERITA TERKINI KEMENAG MURA (PERSYARATAN 1 & LANGSUNG EDIT SUPER ADMIN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" />
              Pemberitaan Resmi
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Berita Terkini {pengaturanWeb.namaKantor}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Informasi agenda kerja, inovasi layanan, dan perkembangan keagamaan di {pengaturanWeb.kabupaten}.
            </p>
          </div>

          {/* Direct Super Admin Add News Button */}
          {isSuperAdmin && (
            <button
              onClick={() => handleOpenAddBerita()}
              className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer shrink-0 transition-all ring-2 ring-blue-300"
              title="Super Admin: Tulis & Publikasikan Berita Baru"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              Tulis Berita Baru
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {daftarBerita.slice(0, 6).map((berita) => (
            <div 
              key={berita.id}
              onClick={() => setSelectedBerita(berita)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between cursor-pointer group relative"
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

                  {/* Super Admin Direct Edit & Delete Buttons on News Card */}
                  {isSuperAdmin && (
                    <div 
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-xs p-1 rounded-lg border border-white/20"
                    >
                      <button
                        onClick={(e) => handleOpenEditBerita(berita, e)}
                        className="p-1 rounded-md bg-white/20 text-white hover:bg-blue-600 transition-colors"
                        title="Super Admin: Edit Berita"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleConfirmDelete('berita', berita.id, berita.judul, e)}
                        className="p-1 rounded-md bg-white/20 text-white hover:bg-rose-600 transition-colors"
                        title="Super Admin: Hapus Berita"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
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

      {/* 5. DATA KEPALA KANTOR DARI PERTAMA SAMPAI TERBARU (PERSYARATAN 1 & LANGSUNG EDIT SUPER ADMIN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-20">
        <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-emerald-800/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold mb-3">
                <Award className="w-4 h-4 text-amber-400" />
                Historis Kepemimpinan {pengaturanWeb.namaKantor}
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-2">
                Daftar Kepala Kantor dari Pertama Sampai Terbaru
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200 max-w-2xl">
                Jejak pengabdian pimpinan {pengaturanWeb.namaKantor} dalam membina kerukunan umat dan memajukan pendidikan keagamaan di {pengaturanWeb.kabupaten}.
              </p>
            </div>

            {/* Direct Super Admin Add Kepala Kantor Button */}
            {isSuperAdmin && (
              <button
                onClick={() => handleOpenAddKepalaKantor()}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-black text-xs rounded-xl shadow-lg flex items-center gap-1.5 cursor-pointer shrink-0 transition-all ring-2 ring-amber-300"
                title="Super Admin: Tambah Riwayat Kepala Kantor Baru"
              >
                <Plus className="w-4 h-4" />
                Tambah Riwayat Kakan
              </button>
            )}
          </div>

          {/* Leaders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dataKepalaKantor.map((kakan) => {
              const isAktif = kakan.status === 'Menjabat (Aktif)';
              return (
                <div 
                  key={kakan.id}
                  className={`rounded-2xl p-4 transition-all flex flex-col justify-between relative group ${
                    isAktif 
                      ? 'bg-linear-to-b from-emerald-800/90 to-emerald-950/90 border-2 border-amber-400/80 ring-4 ring-amber-400/10 shadow-xl' 
                      : 'bg-white/5 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {/* Super Admin Direct Edit & Delete Buttons on Leader Card */}
                  {isSuperAdmin && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 z-10 bg-slate-900/80 backdrop-blur-xs p-1 rounded-lg border border-white/20">
                      <button
                        onClick={(e) => handleOpenEditKepalaKantor(kakan, e)}
                        className="p-1 rounded-md text-amber-300 hover:bg-white/20 transition-colors"
                        title="Super Admin: Edit Data Kepala Kantor"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleConfirmDelete('kakan', kakan.id, kakan.nama, e)}
                        className="p-1 rounded-md text-rose-400 hover:bg-white/20 transition-colors"
                        title="Super Admin: Hapus Data Kepala Kantor"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

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

      {/* ========================================================
          MODALS SECTION
          ======================================================== */}

      {/* 6. DETAIL PERSYARATAN MODAL (PUBLIC) */}
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

      {/* 7. FULL BERITA MODAL (PUBLIC) */}
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
                  {pengaturanWeb.namaKantor} terus berkomitmen memberikan keterbukaan informasi publik dan mewujudkan Wilayah Bebas dari Korupsi (WBK) serta Wilayah Birokrasi Bersih dan Melayani (WBBM) bagi segenap masyarakat {pengaturanWeb.kabupaten}.
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

      {/* 8. MODAL SUPER ADMIN: TAMBAH / EDIT LAYANAN */}
      {layananModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 my-auto">
            <div className="bg-purple-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-white">
                  {editingLayanan ? 'Edit Layanan PTSP (Super Admin)' : 'Tambah Layanan PTSP Baru'}
                </h3>
              </div>
              <button
                onClick={() => setLayananModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLayanan} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kode Layanan *
                  </label>
                  <input
                    type="text"
                    required
                    value={layananForm.kode || ''}
                    onChange={(e) => setLayananForm({ ...layananForm, kode: e.target.value.toUpperCase() })}
                    placeholder="Contoh: LAY-101"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 font-mono focus:border-purple-600 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Seksi Penanggung Jawab *
                  </label>
                  <select
                    value={layananForm.seksi || 'pendis'}
                    onChange={(e) => setLayananForm({ ...layananForm, seksi: e.target.value as SeksiType })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-purple-600 outline-hidden"
                  >
                    <option value="pendis">Seksi Pendidikan Islam (Pendis)</option>
                    <option value="bimas_islam">Seksi Bimas Islam</option>
                    <option value="bimas_kristen">Penyelenggara Bimas Kristen</option>
                    <option value="bimas_hindu">Penyelenggara Bimas Hindu</option>
                    <option value="kepegawaian">Subbag Tata Usaha (Kepegawaian)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Layanan *
                </label>
                <input
                  type="text"
                  required
                  value={layananForm.namaLayanan || ''}
                  onChange={(e) => setLayananForm({ ...layananForm, namaLayanan: e.target.value })}
                  placeholder="Contoh: Rekomendasi Pendirian Madrasah Diniyah Takmiliyah"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-purple-600 outline-hidden font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Deskripsi Singkat Layanan
                </label>
                <textarea
                  rows={2}
                  value={layananForm.deskripsi || ''}
                  onChange={(e) => setLayananForm({ ...layananForm, deskripsi: e.target.value })}
                  placeholder="Uraian ringkas tentang tujuan dan cakupan layanan ini..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-purple-600 outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Estimasi Waktu Proses (Hari Kerja) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    required
                    value={layananForm.estimasiHari ?? 3}
                    onChange={(e) => setLayananForm({ ...layananForm, estimasiHari: parseInt(e.target.value) || 1 })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-purple-600 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Biaya Retribusi (Rp)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={layananForm.biaya ?? 0}
                    onChange={(e) => setLayananForm({ ...layananForm, biaya: parseInt(e.target.value) || 0 })}
                    placeholder="0 = Gratis"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-purple-600 outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Dasar Hukum
                  </label>
                  <input
                    type="text"
                    value={layananForm.dasarHukum || ''}
                    onChange={(e) => setLayananForm({ ...layananForm, dasarHukum: e.target.value })}
                    placeholder="PMA RI No. 34 Tahun 2016"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-purple-600 outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Keluaran Dokumen (Output)
                  </label>
                  <input
                    type="text"
                    value={layananForm.outputDokumen || ''}
                    onChange={(e) => setLayananForm({ ...layananForm, outputDokumen: e.target.value })}
                    placeholder="Surat Rekomendasi Resmi TTE BSrE"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-purple-600 outline-hidden"
                  />
                </div>
              </div>

              {/* Requirement Documents List Editor */}
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Daftar Dokumen Persyaratan Berkas
                </label>
                <div className="space-y-1.5 mb-3">
                  {(layananForm.dokumenSyarat || []).map((syarat, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200 text-xs">
                      <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-900 font-bold text-[10px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="flex-1 text-slate-800">{syarat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSyaratRow(idx)}
                        className="text-rose-600 hover:text-rose-800 p-1 cursor-pointer"
                        title="Hapus persyaratan ini"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newSyaratInput}
                    onChange={(e) => setNewSyaratInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSyaratRow();
                      }
                    }}
                    placeholder="Ketik persyaratan baru lalu tekan Tambah..."
                    className="flex-1 text-xs p-2 rounded-xl border border-slate-200 focus:border-purple-600 outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleAddSyaratRow}
                    className="px-3 py-2 bg-purple-100 text-purple-900 hover:bg-purple-200 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    + Tambah Syarat
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setLayananModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-800 hover:bg-purple-900 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  {editingLayanan ? 'Simpan Perubahan Layanan' : 'Publikasikan Layanan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 9. MODAL SUPER ADMIN: TAMBAH / EDIT BERITA */}
      {beritaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 my-auto">
            <div className="bg-blue-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-white">
                  {editingBerita ? 'Edit Berita Resmi (Super Admin)' : 'Tulis Berita Baru'}
                </h3>
              </div>
              <button
                onClick={() => setBeritaModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBerita} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Judul Berita *
                </label>
                <input
                  type="text"
                  required
                  value={beritaForm.judul || ''}
                  onChange={(e) => setBeritaForm({ ...beritaForm, judul: e.target.value })}
                  placeholder="Ketik judul berita yang menarik dan informatif..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-hidden font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kategori Berita *
                  </label>
                  <select
                    value={beritaForm.kategori || 'PTSP & Layanan'}
                    onChange={(e) => setBeritaForm({ ...beritaForm, kategori: e.target.value as any })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-hidden"
                  >
                    <option value="PTSP & Layanan">PTSP & Layanan</option>
                    <option value="Pendidikan">Pendidikan (Pendis)</option>
                    <option value="Bimas Islam">Bimas Islam</option>
                    <option value="Kerukunan Umat">Kerukunan Umat (Kristen & Hindu)</option>
                    <option value="Kepegawaian">Kepegawaian & Tata Usaha</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Penulis / Rilis Humas *
                  </label>
                  <input
                    type="text"
                    required
                    value={beritaForm.penulis || ''}
                    onChange={(e) => setBeritaForm({ ...beritaForm, penulis: e.target.value })}
                    placeholder="Humas Kemenag Murung Raya"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  URL Gambar Utama Berita
                </label>
                <input
                  type="url"
                  value={beritaForm.gambarUrl || ''}
                  onChange={(e) => setBeritaForm({ ...beritaForm, gambarUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-hidden font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ringkasan Berita (Lead Paragraph) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={beritaForm.ringkasan || ''}
                  onChange={(e) => setBeritaForm({ ...beritaForm, ringkasan: e.target.value })}
                  placeholder="Ringkasan singkat isi berita untuk ditampilkan di kartu Beranda..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Isi Lengkap Berita *
                </label>
                <textarea
                  rows={5}
                  required
                  value={beritaForm.isiLengkap || ''}
                  onChange={(e) => setBeritaForm({ ...beritaForm, isiLengkap: e.target.value })}
                  placeholder="Tuliskan berita lengkap secara jelas dan komprehensif..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-blue-600 outline-hidden leading-relaxed"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setBeritaModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  {editingBerita ? 'Simpan Perubahan Berita' : 'Terbitkan Berita'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 10. MODAL SUPER ADMIN: TAMBAH / EDIT KEPALA KANTOR */}
      {kkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 my-auto">
            <div className="bg-amber-600 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-200" />
                <h3 className="font-bold text-base text-white">
                  {editingKK ? 'Edit Riwayat Kepala Kantor' : 'Tambah Riwayat Kepala Kantor Baru'}
                </h3>
              </div>
              <button
                onClick={() => setKkModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveKepalaKantor} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Urutan Kepala Kantor Ke- *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={kkForm.urutan ?? 1}
                    onChange={(e) => setKkForm({ ...kkForm, urutan: parseInt(e.target.value) || 1 })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-amber-600 outline-hidden font-bold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Lengkap (tanpa gelar) *
                  </label>
                  <input
                    type="text"
                    required
                    value={kkForm.nama || ''}
                    onChange={(e) => setKkForm({ ...kkForm, nama: e.target.value })}
                    placeholder="Contoh: H. Syamsuddin"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-amber-600 outline-hidden font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Gelar Akademik
                  </label>
                  <input
                    type="text"
                    value={kkForm.gelar || ''}
                    onChange={(e) => setKkForm({ ...kkForm, gelar: e.target.value })}
                    placeholder="Contoh: S.Ag., M.Pd.I"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-amber-600 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    NIP Pejabat
                  </label>
                  <input
                    type="text"
                    value={kkForm.nip || ''}
                    onChange={(e) => setKkForm({ ...kkForm, nip: e.target.value })}
                    placeholder="19750101 200003 1 001"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-amber-600 outline-hidden font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Periode (Label) *
                  </label>
                  <input
                    type="text"
                    required
                    value={kkForm.periode || ''}
                    onChange={(e) => setKkForm({ ...kkForm, periode: e.target.value })}
                    placeholder="Contoh: 2024 - Sekarang"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-amber-600 outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tahun Mulai *
                  </label>
                  <input
                    type="number"
                    required
                    value={kkForm.tahunMulai ?? 2024}
                    onChange={(e) => setKkForm({ ...kkForm, tahunMulai: parseInt(e.target.value) || 2024 })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-amber-600 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Status Jabatan *
                  </label>
                  <select
                    value={kkForm.status || 'Purna Bakti'}
                    onChange={(e) => setKkForm({ ...kkForm, status: e.target.value as any })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-amber-600 outline-hidden font-semibold"
                  >
                    <option value="Menjabat (Aktif)">Menjabat (Aktif)</option>
                    <option value="Purna Bakti">Purna Bakti</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  URL Foto Profil
                </label>
                <input
                  type="url"
                  value={kkForm.fotoUrl || ''}
                  onChange={(e) => setKkForm({ ...kkForm, fotoUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-amber-600 outline-hidden font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Prestasi / Catatan Pengabdian Kepemimpinan
                </label>
                <textarea
                  rows={3}
                  value={kkForm.prestasi || ''}
                  onChange={(e) => setKkForm({ ...kkForm, prestasi: e.target.value })}
                  placeholder="Inovasi utama, pembangunan sarana, atau pencapaian zona integritas..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-amber-600 outline-hidden"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setKkModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  {editingKK ? 'Simpan Riwayat Kakan' : 'Tambahkan Pejabat'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 11. MODAL KONFIRMASI HAPUS (SUPER ADMIN) */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="font-bold text-base text-slate-900 mb-2">
              Konfirmasi Hapus Data
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Apakah Anda yakin ingin menghapus data{' '}
              <span className="font-bold text-slate-900">"{deleteConfirm.title}"</span> dari sistem? 
              Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Batalkan
              </button>
              <button
                onClick={handleExecuteDelete}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                Ya, Hapus Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 13. MODAL VIEWER WEB UTAMA & SIPENDIS MURA (AUTO RETURN TO BERANDA PTSP) */}
      {portalViewerData && (
        <WebPortalViewerModal
          isOpen={portalViewerData.isOpen}
          url={portalViewerData.url}
          title={portalViewerData.title}
          singkatan={portalViewerData.singkatan}
          onClose={() => setPortalViewerData(null)}
          onReturnToBeranda={handleReturnToBerandaFromPortal}
        />
      )}
    </div>
  );
};
