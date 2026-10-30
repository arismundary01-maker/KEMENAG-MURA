import React, { useState, useEffect } from 'react';
import { usePTSP } from '../../context/PTSPContext';
import { 
  SEKSI_CONFIG, 
  APLIKASI_INTEGRASI, 
  DATA_SEKSI_PENDIS, 
  DATA_SEKSI_BIMAS_ISLAM, 
  DATA_SEKSI_BIMAS_KRISTEN, 
  DATA_SEKSI_BIMAS_HINDU, 
  DATA_SEKSI_KEPEGAWAIAN,
  getSeksiByRole 
} from '../../data/initialData';
import { SeksiType, Permohonan, AplikasiIntegrasi, BerkasDraftTTE } from '../../types/ptsp';
import { 
  GraduationCap, 
  Landmark, 
  Cross, 
  Flame, 
  Building2, 
  CheckCircle2, 
  Clock, 
  Database, 
  ExternalLink, 
  RefreshCw, 
  Send, 
  FileText, 
  Sparkles, 
  Search, 
  Check, 
  X, 
  Layers, 
  Users, 
  School, 
  FileCheck, 
  ShieldCheck,
  ChevronRight,
  BookOpen,
  Globe,
  UploadCloud,
  FileUp,
  Paperclip,
  Eye,
  Download,
  Trash2,
  AlertCircle
} from 'lucide-react';

interface SeksiDashboardViewProps {
  onPreviewOfficialDocument: (permohonan: Permohonan) => void;
}

export const SeksiDashboardView: React.FC<SeksiDashboardViewProps> = ({ 
  onPreviewOfficialDocument 
}) => {
  const { 
    selectedSeksiTab, 
    setSelectedSeksiTab, 
    permohonanList, 
    seksiReviewPermohonan, 
    unggahBerkasTTELangsung,
    currentRole 
  } = usePTSP();

  const userSeksi = getSeksiByRole(currentRole);

  // Otomatis arahkan tab seksi sesuai seksi akun login
  useEffect(() => {
    if (userSeksi && selectedSeksiTab !== userSeksi) {
      setSelectedSeksiTab(userSeksi);
    }
  }, [userSeksi, selectedSeksiTab, setSelectedSeksiTab]);

  // Internal tab within section
  const [activeSubTab, setActiveSubTab] = useState<'progres_layanan' | 'data_seksi' | 'integrasi_aplikasi'>('progres_layanan');
  const [searchDataQuery, setSearchDataQuery] = useState('');
  
  // Section review modal
  const [activeReviewPermohonan, setActiveReviewPermohonan] = useState<Permohonan | null>(null);
  const [catatanSeksi, setCatatanSeksi] = useState('');
  const [draftNomorSurat, setDraftNomorSurat] = useState('');
  const [draftJudul, setDraftJudul] = useState('');
  const [draftPeruntukan, setDraftPeruntukan] = useState('');
  const [reviewUploadedFile, setReviewUploadedFile] = useState<BerkasDraftTTE | null>(null);

  // Direct Upload Modal State for any Seksi
  const [isDirectUploadModalOpen, setIsDirectUploadModalOpen] = useState(false);
  const [directJudul, setDirectJudul] = useState('');
  const [directNomorSurat, setDirectNomorSurat] = useState('');
  const [directPerihal, setDirectPerihal] = useState('');
  const [directPeruntukan, setDirectPeruntukan] = useState('');
  const [directCatatan, setDirectCatatan] = useState('');
  const [directUploadedFile, setDirectUploadedFile] = useState<BerkasDraftTTE | null>(null);
  const [directError, setDirectError] = useState('');

  // Simulation state for app launch modal
  const [activeLaunchedApp, setActiveLaunchedApp] = useState<AplikasiIntegrasi | null>(null);
  const [syncingAppId, setSyncingAppId] = useState<string | null>(null);

  const seksiInfo = SEKSI_CONFIG[selectedSeksiTab];
  const seksiApps = APLIKASI_INTEGRASI.filter(a => a.seksi === selectedSeksiTab);
  const seksiPermohonan = permohonanList.filter(p => p.seksi === selectedSeksiTab);

  // Stats for this section
  const countAntrean = seksiPermohonan.filter(p => p.status === 'disposisi_seksi' || p.status === 'telaah_seksi').length;
  const countSiapTTE = seksiPermohonan.filter(p => p.status === 'siap_tte').length;
  const countSelesai = seksiPermohonan.filter(p => p.status === 'selesai_tte').length;

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleProcessUploadedFile = (
    file: File, 
    onSuccess: (berkas: BerkasDraftTTE) => void,
    targetSeksi: SeksiType
  ) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileUrl = e.target?.result as string;
      const newBerkas: BerkasDraftTTE = {
        id: 'draft-file-' + Date.now(),
        namaFile: file.name,
        ukuranFile: formatFileSize(file.size),
        tipeFile: file.type || 'application/pdf',
        fileUrl: fileUrl,
        waktuUnggah: new Date().toISOString().replace('T', ' ').substring(0, 16),
        diunggahOleh: `${SEKSI_CONFIG[targetSeksi].kepala} (${SEKSI_CONFIG[targetSeksi].singkatan})`,
        seksi: targetSeksi
      };
      onSuccess(newBerkas);
    };
    reader.readAsDataURL(file);
  };

  const handleUseTemplateFile = (
    jenisSurat: string,
    nomorSurat: string,
    onSuccess: (berkas: BerkasDraftTTE) => void,
    targetSeksi: SeksiType
  ) => {
    const sanitizedNo = nomorSurat.replace(/[\/\.]/g, '_');
    const templateBerkas: BerkasDraftTTE = {
      id: 'draft-template-' + Date.now(),
      namaFile: `Draft_Naskah_${sanitizedNo || 'Resmi'}.pdf`,
      ukuranFile: '1.4 MB',
      tipeFile: 'application/pdf',
      waktuUnggah: new Date().toISOString().replace('T', ' ').substring(0, 16),
      diunggahOleh: `${SEKSI_CONFIG[targetSeksi].kepala} (${SEKSI_CONFIG[targetSeksi].singkatan})`,
      seksi: targetSeksi,
      catatanPengantar: `Konsep naskah dinas ${jenisSurat} telah disusun sesuai kaidah tata naskah dinas Kemenag.`
    };
    onSuccess(templateBerkas);
  };

  const handleOpenReview = (item: Permohonan) => {
    setActiveReviewPermohonan(item);
    setCatatanSeksi(item.catatanSeksi || 'Telah diteliti berkas dan memenuhi ketentuan teknis.');
    setDraftNomorSurat(item.isiDokumenKeluaran?.nomorSurat || `B-${Math.floor(1400 + Math.random() * 500)}/Kk.06.05/${item.seksi.toUpperCase().substring(0, 3)}/10/2026`);
    setDraftJudul(item.isiDokumenKeluaran?.judul || `SURAT REKOMENDASI / KETERANGAN RESMI`);
    setDraftPeruntukan(item.pemohon.instansiOrLembaga || item.pemohon.namaLengkap);
    setReviewUploadedFile(item.berkasDraftTTE || item.isiDokumenKeluaran?.berkasDraftTTE || null);
  };

  const handleForwardToTTE = () => {
    if (!activeReviewPermohonan) return;

    const finalBerkas: BerkasDraftTTE = reviewUploadedFile || {
      id: 'draft-' + Date.now(),
      namaFile: `Draft_Naskah_${draftNomorSurat.replace(/[\/\.]/g, '_') || 'Kemenag'}.pdf`,
      ukuranFile: '1.4 MB',
      tipeFile: 'application/pdf',
      waktuUnggah: new Date().toISOString().replace('T', ' ').substring(0, 16),
      diunggahOleh: `${seksiInfo.kepala} (${seksiInfo.singkatan})`,
      seksi: selectedSeksiTab,
      catatanPengantar: catatanSeksi
    };

    seksiReviewPermohonan(
      activeReviewPermohonan.nomorResi,
      'siap_tte',
      catatanSeksi,
      {
        judul: draftJudul,
        nomorSurat: draftNomorSurat,
        konsideranMenimbang: [
          'Bahwa berdasarkan permohonan yang diajukan dan hasil telaah teknis tim seksi terkait;',
          'Bahwa pemohon telah memenuhi seluruh persyaratan substantif dan administratif yang berlaku.'
        ],
        konsideranMengingat: [
          'Undang-Undang Nomor 20 Tahun 2003 / Peraturan Menteri Agama terkait;',
          'Peraturan Menteri Agama Nomor 34 Tahun 2016 tentang Organisasi dan Tata Kerja Kementerian Agama.'
        ],
        diktumKeputusan: [
          `MEMBERIKAN REKOMENDASI / KETERANGAN kepada: ${draftPeruntukan}`,
          `Untuk keperluan: ${activeReviewPermohonan.perihal}. Surat ini berlaku sah secara kedinasan.`
        ],
        tembusan: [
          'Kepala Bagian Tata Usaha Kantor Kemenag Kab. Musi Rawas',
          'Arsip Seksi Teknis Terkait'
        ],
        peruntukan: draftPeruntukan,
        berkasDraftTTE: finalBerkas
      },
      finalBerkas
    );

    setActiveReviewPermohonan(null);
    setReviewUploadedFile(null);
  };

  const handleOpenDirectUploadModal = () => {
    const currentSeksi = selectedSeksiTab;
    const cfg = SEKSI_CONFIG[currentSeksi];
    const noSuratRandom = `B-${Math.floor(1500 + Math.random() * 500)}/Kk.06.05/${currentSeksi.toUpperCase().substring(0, 3)}/10/2026`;
    setDirectJudul(`SURAT REKOMENDASI / KEPUTUSAN RESMI SEKSI ${cfg.singkatan.toUpperCase()}`);
    setDirectNomorSurat(noSuratRandom);
    setDirectPerihal(`Pengajuan Naskah Dinas Seksi ${cfg.nama} untuk Ditandatangani Elektronik (TTE)`);
    setDirectPeruntukan('');
    setDirectCatatan('Naskah dinas resmi dan lampiran telah diteliti memenuhi ketentuan tata naskah dinas. Diteruskan ke Operator & Kepala Kantor untuk di-TTE.');
    setDirectUploadedFile(null);
    setDirectError('');
    setIsDirectUploadModalOpen(true);
  };

  const handleDirectUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directJudul.trim()) {
      setDirectError('Judul naskah dokumen dinas wajib diisi.');
      return;
    }
    if (!directPeruntukan.trim()) {
      setDirectError('Penerima / Peruntukan naskah wajib diisi.');
      return;
    }

    const finalFile: BerkasDraftTTE = directUploadedFile || {
      id: 'draft-direct-' + Date.now(),
      namaFile: `Draft_${directNomorSurat.replace(/[\/\.]/g, '_') || 'Naskah_Dinas'}.pdf`,
      ukuranFile: '1.5 MB',
      tipeFile: 'application/pdf',
      waktuUnggah: new Date().toISOString().replace('T', ' ').substring(0, 16),
      diunggahOleh: `${seksiInfo.kepala} (${seksiInfo.singkatan})`,
      seksi: selectedSeksiTab,
      catatanPengantar: directCatatan
    };

    unggahBerkasTTELangsung({
      seksi: selectedSeksiTab,
      judul: directJudul,
      nomorSurat: directNomorSurat,
      perihal: directPerihal,
      peruntukan: directPeruntukan,
      berkas: finalFile,
      catatan: directCatatan
    });

    setIsDirectUploadModalOpen(false);
    setDirectUploadedFile(null);
    setActiveSubTab('progres_layanan');
  };

  const handleSyncApp = (appId: string) => {
    setSyncingAppId(appId);
    setTimeout(() => {
      setSyncingAppId(null);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* 1. SEKSI SELECTOR BAR / DEDICATED SECTION HEADER */}
      {userSeksi ? (
        <div className="mb-6 bg-white border border-teal-200/80 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold shrink-0 shadow-2xs">
              {userSeksi === 'pendis' && <GraduationCap className="w-6 h-6 text-emerald-600" />}
              {userSeksi === 'bimas_islam' && <Landmark className="w-6 h-6 text-teal-600" />}
              {userSeksi === 'bimas_kristen' && <Cross className="w-6 h-6 text-indigo-600" />}
              {userSeksi === 'bimas_hindu' && <Flame className="w-6 h-6 text-amber-600" />}
              {userSeksi === 'kepegawaian' && <Building2 className="w-6 h-6 text-purple-600" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-300">
                  Menu Login Sesuai Seksi
                </span>
                <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
                  Hak Akses Terverifikasi: {seksiInfo.singkatan}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-black text-slate-900 mt-0.5">
                Dashboard & Layanan {seksiInfo.nama}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Pejabat Penanggung Jawab: <strong className="text-slate-900">{seksiInfo.kepala}</strong></span>
          </div>
        </div>
      ) : (
        /* Super Admin Selector: Bebas memilih 5 seksi */
        <div className="mb-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-600" />
              Mode Supervisi Super Admin: Pilih Seksi untuk Dipantau
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => { setSelectedSeksiTab('pendis'); setActiveSubTab('progres_layanan'); }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                selectedSeksiTab === 'pendis'
                  ? 'bg-emerald-800 text-white shadow-md ring-2 ring-emerald-600/30'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              Seksi Pendis
            </button>
            <button
              onClick={() => { setSelectedSeksiTab('bimas_islam'); setActiveSubTab('progres_layanan'); }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                selectedSeksiTab === 'bimas_islam'
                  ? 'bg-teal-800 text-white shadow-md ring-2 ring-teal-600/30'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-teal-50'
              }`}
            >
              <Landmark className="w-4 h-4 text-teal-400" />
              Seksi Bimas Islam
            </button>
            <button
              onClick={() => { setSelectedSeksiTab('bimas_kristen'); setActiveSubTab('progres_layanan'); }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                selectedSeksiTab === 'bimas_kristen'
                  ? 'bg-indigo-800 text-white shadow-md ring-2 ring-indigo-600/30'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-indigo-50'
              }`}
            >
              <Cross className="w-4 h-4 text-indigo-400" />
              Bimas Kristen
            </button>
            <button
              onClick={() => { setSelectedSeksiTab('bimas_hindu'); setActiveSubTab('progres_layanan'); }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                selectedSeksiTab === 'bimas_hindu'
                  ? 'bg-amber-700 text-white shadow-md ring-2 ring-amber-600/30'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-amber-50'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-400" />
              Bimas Hindu
            </button>
            <button
              onClick={() => { setSelectedSeksiTab('kepegawaian'); setActiveSubTab('progres_layanan'); }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                selectedSeksiTab === 'kepegawaian'
                  ? 'bg-purple-800 text-white shadow-md ring-2 ring-purple-600/30'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-purple-50'
              }`}
            >
              <Building2 className="w-4 h-4 text-purple-400" />
              Subbag Kepegawaian TU
            </button>
          </div>
        </div>
      )}

      {/* 2. SECTION BANNER & METRICS */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-6 shadow-xl border border-emerald-800/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Dashboard Pengawasan & Data Seksi
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {seksiInfo.nama}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/90 mt-1 max-w-2xl">
              {seksiInfo.deskripsi}
            </p>
            <div className="mt-3 flex items-center gap-3 text-xs text-slate-300">
              <span>Pejabat: <strong className="text-white">{seksiInfo.kepala}</strong></span>
              <span>•</span>
              <span className="font-mono">NIP: {seksiInfo.nip}</span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 text-center min-w-[95px] border border-white/10">
              <div className="text-2xl font-black text-amber-300">{countAntrean}</div>
              <div className="text-[11px] text-emerald-200">Telaah Teknis</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 text-center min-w-[95px] border border-white/10">
              <div className="text-2xl font-black text-purple-300">{countSiapTTE}</div>
              <div className="text-[11px] text-emerald-200">Siap TTE</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 text-center min-w-[95px] border border-white/10">
              <div className="text-2xl font-black text-emerald-300">{countSelesai}</div>
              <div className="text-[11px] text-emerald-200">Selesai Ber-TTE</div>
            </div>
          </div>
        </div>

        {/* 3. SUB-MENU NAVIGATION WITHIN SECTION (REQUIRED BY USER) */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveSubTab('progres_layanan')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'progres_layanan'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-emerald-200 hover:text-white hover:bg-white/10'
            }`}
          >
            <Layers className="w-4 h-4" />
            1. Progres Layanan PTSP ({seksiPermohonan.length})
          </button>

          <button
            onClick={() => setActiveSubTab('data_seksi')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'data_seksi'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-emerald-200 hover:text-white hover:bg-white/10'
            }`}
          >
            <Database className="w-4 h-4" />
            2. Sub Menu Data {seksiInfo.singkatan}
          </button>

          <button
            onClick={() => setActiveSubTab('integrasi_aplikasi')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'integrasi_aplikasi'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-emerald-200 hover:text-white hover:bg-white/10'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            3. Integrasi Aplikasi Resmi ({seksiApps.length} Aplikasi)
          </button>
        </div>
      </div>

      {/* SUB-MENU CONTENT CONTAINER */}
      {/* ------------------------------------------------------------- */}
      {/* TAB 1: PROGRES LAYANAN PTSP SEKSI */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'progres_layanan' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <span>Tab Progres Layanan & Naskah TTE {seksiInfo.nama}</span>
                <span className="text-xs font-mono font-bold bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-0.5 rounded-full">
                  {seksiPermohonan.length} Berkas
                </span>
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Memantau disposisi berkas dan upload file naskah dinas untuk dikirim ke Operator & Kepala Kantor guna penandatanganan elektronik (TTE BSrE).
              </p>
            </div>
            
            <button
              onClick={handleOpenDirectUploadModal}
              className="px-4 py-2.5 bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <UploadCloud className="w-4 h-4 text-emerald-200" />
              <span>Upload Berkas Naskah TTE ke Kakan</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase">
                <tr>
                  <th className="py-3.5 px-4">No. Resi</th>
                  <th className="py-3.5 px-4">Nama Layanan & Perihal</th>
                  <th className="py-3.5 px-4">Pemohon</th>
                  <th className="py-3.5 px-4">Status Progres</th>
                  <th className="py-3.5 px-4 text-right">Aksi Telaah & Berkas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {seksiPermohonan.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-slate-500">
                      Belum ada permohonan yang dialihkan ke seksi ini
                    </td>
                  </tr>
                ) : (
                  seksiPermohonan.map((item) => {
                    const isReadyForSeksi = item.status === 'disposisi_seksi' || item.status === 'telaah_seksi';
                    return (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                          {item.nomorResi}
                          <div className="text-[11px] text-slate-500 font-normal">{item.tanggalPengajuan}</div>
                        </td>
                        <td className="py-3.5 px-4 max-w-sm">
                          <div className="font-bold text-slate-900">{item.namaLayanan}</div>
                          <div className="text-slate-600 text-[11px] line-clamp-1">{item.perihal}</div>
                          {item.berkasDraftTTE && (
                            <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/80 w-fit">
                              <Paperclip className="w-3 h-3 text-teal-600 shrink-0" />
                              <span className="font-semibold truncate max-w-[200px]">{item.berkasDraftTTE.namaFile}</span>
                              <span className="text-[10px] text-slate-500 font-mono">({item.berkasDraftTTE.ukuranFile})</span>
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{item.pemohon.namaLengkap}</div>
                          <div className="text-slate-500 text-[11px]">{item.pemohon.instansiOrLembaga || '-'}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                            item.status === 'selesai_tte' ? 'bg-emerald-100 text-emerald-800' :
                            item.status === 'siap_tte' ? 'bg-purple-100 text-purple-800' :
                            item.status === 'telaah_seksi' || item.status === 'disposisi_seksi' ? 'bg-teal-100 text-teal-800' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {item.status === 'selesai_tte' ? 'TTE Selesai' :
                             item.status === 'siap_tte' ? 'Antrean TTE Kakan' :
                             'Perlu Telaah Teknis'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {item.status === 'selesai_tte' && (
                              <button
                                onClick={() => onPreviewOfficialDocument(item)}
                                className="px-3 py-1.5 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 font-bold rounded-lg transition-colors cursor-pointer"
                              >
                                Lihat Dokumen Sah
                              </button>
                            )}

                            {isReadyForSeksi && (
                              <button
                                onClick={() => handleOpenReview(item)}
                                className="px-3.5 py-1.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                              >
                                <UploadCloud className="w-3.5 h-3.5" /> Upload & Draft TTE
                              </button>
                            )}

                            {item.status === 'siap_tte' && (
                              <div className="flex items-center gap-1.5">
                                <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-1 rounded-md border border-purple-200">
                                  Terkirim ke Kakan
                                </span>
                                {item.berkasDraftTTE?.fileUrl && (
                                  <a
                                    href={item.berkasDraftTTE.fileUrl}
                                    download={item.berkasDraftTTE.namaFile}
                                    className="p-1 rounded-md text-slate-500 hover:text-teal-700 hover:bg-teal-50"
                                    title="Unduh Draft"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: SUB-MENU DATA SEKSI (EMIS/SIMPATIKA/SIMAS/ASN/DLL) */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'data_seksi' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Pangkalan Data Terpadu: {seksiInfo.nama}
              </h3>
              <p className="text-xs text-slate-600">
                Data master kelembagaan, sarana, dan sumber daya keagamaan di Kabupaten Musi Rawas
              </p>
            </div>

            {/* Quick search in section data */}
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchDataQuery}
                onChange={(e) => setSearchDataQuery(e.target.value)}
                placeholder="Cari data lembaga / nama..."
                className="w-full text-xs pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-hidden focus:border-emerald-600 font-medium"
              />
            </div>
          </div>

          {/* SPECIFIC DATA VIEW PER SECTION */}
          {/* A. PENDIS (MADRASAH & PONPES) */}
          {selectedSeksiTab === 'pendis' && (
            <div className="space-y-4">
              {/* TOMBOL & BANNER INTEGRASI WEB BARU SIPENDISMURA.MY.ID */}
              <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-2xl p-5 sm:p-6 shadow-xl border-2 border-emerald-500/40 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-emerald-500/15 blur-2xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0 shadow-inner">
                      <Globe className="w-8 h-8 text-amber-300" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-emerald-950 shadow-xs">
                          PORTAL RESMI BARU
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-emerald-800/80 px-2 py-0.5 rounded-full border border-emerald-600/40">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          Terkoneksi Aktif
                        </span>
                      </div>

                      <h4 className="text-lg sm:text-xl font-black text-white tracking-tight">
                        Integrasi Sistem: SIPENDIS MURA (sipendismura.my.id)
                      </h4>

                      <p className="text-xs text-emerald-100/90 mt-1 max-w-2xl leading-relaxed">
                        Sistem Informasi Pendidikan Islam Terpadu Kantor Kementerian Agama Kabupaten Musi Rawas. Terkoneksi langsung dengan pangkalan data madrasah, pondok pesantren, guru PAI, dan layanan operasional keagamaan Islam.
                      </p>

                      <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11px] text-emerald-200">
                        <span className="font-mono bg-black/30 px-2 py-0.5 rounded border border-white/10 text-amber-300">
                          https://sipendismura.my.id
                        </span>
                        <span>•</span>
                        <span>Seksi Pendidikan Islam Kemenag Musi Rawas</span>
                      </div>
                    </div>
                  </div>

                  {/* Tombol Integrasi Langsung */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
                    <a
                      href="https://sipendismura.my.id"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        sessionStorage.setItem('kemenag_return_to_beranda_on_focus', 'true');
                      }}
                      className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer text-center"
                    >
                      <Globe className="w-4 h-4 text-emerald-950" />
                      Koneksi ke Web Baru sipendismura.my.id <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        const sipendisApp = seksiApps.find(a => a.id === 'app-sipendis-mura') || {
                          id: 'app-sipendis-mura',
                          kode: 'SIPENDIS-MURA',
                          nama: 'SIPENDIS MURA - Portal Resmi Pendidikan Islam Kemenag Musi Rawas',
                          singkatan: 'SIPENDIS MURA',
                          deskripsi: 'Sistem Informasi & Pangkalan Data Mandiri Terintegrasi Seksi Pendidikan Islam Kantor Kementerian Agama Kabupaten Musi Rawas (sipendismura.my.id).',
                          pengembang: 'Seksi Pendidikan Islam Kemenag Musi Rawas',
                          urlSimulasi: 'https://sipendismura.my.id',
                          seksi: 'pendis',
                          statusKoneksi: 'Optimal',
                          terakhirSinkron: 'Real-time (Active)',
                          ikon: 'Globe',
                          fiturUtama: ['Portal Web Baru sipendismura.my.id', 'Pangkalan Data Madrasah & RA Mura', 'Pendataan Guru & PAI', 'Layanan Berkas & Dokumen Online']
                        };
                        setActiveLaunchedApp(sipendisApp);
                      }}
                      className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      Status Sinkronisasi
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabel Data Madrasah & Lembaga Pendis */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="p-4 bg-emerald-50/70 border-b border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-bold text-emerald-900 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-emerald-700" />
                    Data Madrasah & Lembaga Pendidikan Islam Kab. Musi Rawas
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://sipendismura.my.id"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 underline flex items-center gap-1"
                    >
                      Buka di sipendismura.my.id <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      {DATA_SEKSI_PENDIS.length} Satuan Pendidikan
                    </span>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                    <tr>
                      <th className="py-3 px-4">Nama Madrasah / Lembaga</th>
                      <th className="py-3 px-4">NSM / NPSN</th>
                      <th className="py-3 px-4">Jenjang & Status</th>
                      <th className="py-3 px-4">Kepala Madrasah</th>
                      <th className="py-3 px-4">Kecamatan</th>
                      <th className="py-3 px-4 text-center">Siswa & Guru</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {DATA_SEKSI_PENDIS
                      .filter(m => !searchDataQuery || m.nama.toLowerCase().includes(searchDataQuery.toLowerCase()) || m.kecamatan.toLowerCase().includes(searchDataQuery.toLowerCase()))
                      .map((madrasah) => (
                      <tr key={madrasah.id} className="hover:bg-emerald-50/30">
                        <td className="py-3 px-4 font-bold text-slate-900">
                          {madrasah.nama}
                          <span className="ml-2 text-[10px] px-1.5 py-0.2 rounded font-bold bg-amber-100 text-amber-800">
                            Akreditasi {madrasah.akreditasi}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                          NSM: {madrasah.nsm}<br/>NPSN: {madrasah.npsn}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-slate-800">{madrasah.jenjang}</span>
                          <div className="text-[11px] text-slate-500">{madrasah.status}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-700">{madrasah.kepala}</td>
                        <td className="py-3 px-4 text-slate-700">{madrasah.kecamatan}</td>
                        <td className="py-3 px-4 text-center font-mono">
                          <strong className="text-emerald-800">{madrasah.jumlahSiswa}</strong> Siswa / <strong className="text-slate-700">{madrasah.jumlahGuru}</strong> Guru
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            </div>
          )}

          {/* B. BIMAS ISLAM (KUA & MASJID) */}
          {selectedSeksiTab === 'bimas_islam' && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 bg-teal-50/70 border-b border-teal-100 flex items-center justify-between">
                <span className="text-xs font-bold text-teal-900 flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-teal-700" />
                  Data KUA Kecamatan & Masjid Ber-ID SIMAS Kab. Musi Rawas
                </span>
                <span className="text-[11px] font-mono font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                  {DATA_SEKSI_BIMAS_ISLAM.length} Titik Pelayanan
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                    <tr>
                      <th className="py-3 px-4">Nama Satker / Tempat Ibadah</th>
                      <th className="py-3 px-4">Tipologi / Kapasitas</th>
                      <th className="py-3 px-4">Pimpinan / Kepala KUA</th>
                      <th className="py-3 px-4">Alamat</th>
                      <th className="py-3 px-4">Status SIMKAH / SIMAS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {DATA_SEKSI_BIMAS_ISLAM
                      .filter(b => !searchDataQuery || b.nama.toLowerCase().includes(searchDataQuery.toLowerCase()))
                      .map((item) => (
                      <tr key={item.id} className="hover:bg-teal-50/30">
                        <td className="py-3 px-4 font-bold text-slate-900">
                          {item.nama}
                          {'idSimas' in item && item.idSimas && (
                            <div className="text-[10px] font-mono text-teal-700">ID SIMAS: {item.idSimas}</div>
                          )}
                        </td>
                        <td className="py-3 px-4 text-slate-700">
                          {item.tipologi}
                          {'kapasitas' in item && item.kapasitas && <div className="text-[11px] text-slate-500">{item.kapasitas}</div>}
                        </td>
                        <td className="py-3 px-4 text-slate-700">{item.kepala || '-'}</td>
                        <td className="py-3 px-4 text-slate-700">{item.alamat}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-semibold text-[11px]">
                            {item.statusSimkah || item.sertifikatArahKiblat || 'Terdaftar'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* C. BIMAS KRISTEN */}
          {selectedSeksiTab === 'bimas_kristen' && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 bg-indigo-50/70 border-b border-indigo-100 flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-900 flex items-center gap-2">
                  <Cross className="w-4 h-4 text-indigo-700" />
                  Data Gereja & Jemaat Kristen di Kabupaten Musi Rawas
                </span>
                <span className="text-[11px] font-mono font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded">
                  {DATA_SEKSI_BIMAS_KRISTEN.length} Lembaga Terdaftar
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                    <tr>
                      <th className="py-3 px-4">Nama Gereja / Jemaat</th>
                      <th className="py-3 px-4">No. Tanda Daftar</th>
                      <th className="py-3 px-4">Pimpinan / Pendeta</th>
                      <th className="py-3 px-4">Sinode</th>
                      <th className="py-3 px-4">Kecamatan</th>
                      <th className="py-3 px-4 text-center">Jemaat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {DATA_SEKSI_BIMAS_KRISTEN
                      .filter(k => !searchDataQuery || k.nama.toLowerCase().includes(searchDataQuery.toLowerCase()))
                      .map((k) => (
                      <tr key={k.id} className="hover:bg-indigo-50/30">
                        <td className="py-3 px-4 font-bold text-slate-900">{k.nama}</td>
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-600">{k.tandaDaftar}</td>
                        <td className="py-3 px-4 text-slate-700">{k.pimpinan}</td>
                        <td className="py-3 px-4 text-slate-700">{k.sinode}</td>
                        <td className="py-3 px-4 text-slate-700">{k.kecamatan}</td>
                        <td className="py-3 px-4 text-center font-bold font-mono text-indigo-800">{k.jumlahJemaat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* D. BIMAS HINDU */}
          {selectedSeksiTab === 'bimas_hindu' && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 bg-amber-50/70 border-b border-amber-100 flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-700" />
                  Data Pura & Pasraman Keagamaan Hindu Kab. Musi Rawas
                </span>
                <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  {DATA_SEKSI_BIMAS_HINDU.length} Tempat Ibadah & Pasraman
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                    <tr>
                      <th className="py-3 px-4">Nama Pura / Pasraman</th>
                      <th className="py-3 px-4">Tanda Daftar</th>
                      <th className="py-3 px-4">Pinandita / Pemangku</th>
                      <th className="py-3 px-4">Lembaga / Pengempon</th>
                      <th className="py-3 px-4">Kecamatan</th>
                      <th className="py-3 px-4">Krama Umat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {DATA_SEKSI_BIMAS_HINDU
                      .filter(h => !searchDataQuery || h.nama.toLowerCase().includes(searchDataQuery.toLowerCase()))
                      .map((h) => (
                      <tr key={h.id} className="hover:bg-amber-50/30">
                        <td className="py-3 px-4 font-bold text-slate-900">{h.nama}</td>
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-600">{h.tandaDaftar}</td>
                        <td className="py-3 px-4 text-slate-700">{h.pinandita}</td>
                        <td className="py-3 px-4 text-slate-700">{h.lembaga}</td>
                        <td className="py-3 px-4 text-slate-700">{h.kecamatan}</td>
                        <td className="py-3 px-4 font-mono font-semibold text-amber-900">{h.kramaPura}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* E. SUBBAG TU (KEPEGAWAIAN ASN) */}
          {selectedSeksiTab === 'kepegawaian' && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 bg-purple-50/70 border-b border-purple-100 flex items-center justify-between">
                <span className="text-xs font-bold text-purple-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-purple-700" />
                  Database Aparatur Sipil Negara (ASN) Kemenag Kab. Musi Rawas
                </span>
                <span className="text-[11px] font-mono font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded">
                  {DATA_SEKSI_KEPEGAWAIAN.length} Pegawai
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                    <tr>
                      <th className="py-3 px-4">Nama Pegawai & NIP</th>
                      <th className="py-3 px-4">Jabatan</th>
                      <th className="py-3 px-4">Pangkat / Golongan</th>
                      <th className="py-3 px-4">Unit Kerja</th>
                      <th className="py-3 px-4">Status SKP e-Kinerja</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {DATA_SEKSI_KEPEGAWAIAN
                      .filter(p => !searchDataQuery || p.nama.toLowerCase().includes(searchDataQuery.toLowerCase()))
                      .map((peg) => (
                      <tr key={peg.id} className="hover:bg-purple-50/30">
                        <td className="py-3 px-4 font-bold text-slate-900">
                          {peg.nama}
                          <div className="text-[11px] text-slate-500 font-mono">NIP: {peg.nip}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-700">{peg.jabatan}</td>
                        <td className="py-3 px-4 text-slate-700 font-semibold">{peg.pangkatGol}</td>
                        <td className="py-3 px-4 text-slate-700">{peg.unitKerja}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                            {peg.skpStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: INTEGRASI APLIKASI KEMENTERIAN AGAMA (REQUIRED BY USER) */}
      {/* ------------------------------------------------------------- */}
      {activeSubTab === 'integrasi_aplikasi' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Aplikasi Resmi yang Terintegrasi pada {seksiInfo.nama}
              </h3>
              <p className="text-xs text-slate-600">
                Aplikasi kementerian yang tersinkronisasi langsung dengan pangkalan data PTSP Kemenag Mura
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {seksiApps.map((app) => {
              const isSyncing = syncingAppId === app.id;
              return (
                <div 
                  key={app.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {app.kode}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        {app.statusKoneksi}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 mb-1">
                      {app.nama}
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-3 mb-4">
                      {app.deskripsi}
                    </p>

                    <div className="mb-4">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Fitur Terintegrasi:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {app.fiturUtama.map((f, i) => (
                          <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <div className="text-[10px] text-slate-500 flex items-center justify-between mb-3">
                      <span>Sinkronisasi: {app.terakhirSinkron}</span>
                      <button
                        onClick={() => handleSyncApp(app.id)}
                        disabled={isSyncing}
                        className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                        {isSyncing ? 'Menyinkronkan...' : 'Sinkron'}
                      </button>
                    </div>

                    <button
                      onClick={() => setActiveLaunchedApp(app)}
                      className="w-full py-2 bg-slate-900 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      Buka Integrasi {app.singkatan} <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODAL TELAAH TEKNIS & DRAFT DOKUMEN SEKSI */}
      {activeReviewPermohonan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
            <div className="bg-teal-900 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase bg-teal-800 px-2 py-0.5 rounded font-bold">
                  {activeReviewPermohonan.nomorResi}
                </span>
                <h3 className="font-bold text-lg text-white mt-1">
                  Telaah Teknis & Konsep Dokumen TTE
                </h3>
              </div>
              <button 
                onClick={() => setActiveReviewPermohonan(null)}
                className="p-1.5 rounded-lg text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Judul Naskah Dokumen Resmi:
                </label>
                <input
                  type="text"
                  value={draftJudul}
                  onChange={(e) => setDraftJudul(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-hidden font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nomor Naskah Dinas:
                  </label>
                  <input
                    type="text"
                    value={draftNomorSurat}
                    onChange={(e) => setDraftNomorSurat(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-teal-600 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Penerima / Peruntukan:
                  </label>
                  <input
                    type="text"
                    value={draftPeruntukan}
                    onChange={(e) => setDraftPeruntukan(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-teal-600 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Hasil Telaah Teknis Seksi:
                </label>
                <textarea
                  rows={2}
                  value={catatanSeksi}
                  onChange={(e) => setCatatanSeksi(e.target.value)}
                  placeholder="Berdasarkan verifikasi faktual lapangan..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 outline-hidden"
                />
              </div>

              {/* UPLOAD BERKAS DRAFT NASKAH TTE */}
              <div className="pt-3 border-t border-slate-200">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <FileUp className="w-4 h-4 text-teal-700" />
                    <span>Upload Berkas Draft Dokumen TTE (PDF / DOCX):</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleUseTemplateFile(draftJudul, draftNomorSurat, setReviewUploadedFile, selectedSeksiTab)}
                    className="text-[11px] font-bold text-teal-700 hover:text-teal-900 underline flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-amber-500" /> Gunakan Draft Standar (.pdf)
                  </button>
                </div>

                {reviewUploadedFile ? (
                  <div className="p-3 bg-teal-50/80 rounded-xl border border-teal-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-9 h-9 rounded-lg bg-teal-100 border border-teal-300 flex items-center justify-center text-teal-800 shrink-0">
                        <FileText className="w-5 h-5 text-teal-700" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {reviewUploadedFile.namaFile}
                        </p>
                        <p className="text-[10px] text-slate-500 font-medium">
                          {reviewUploadedFile.ukuranFile} • Diunggah {reviewUploadedFile.waktuUnggah} oleh {reviewUploadedFile.diunggahOleh}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {reviewUploadedFile.fileUrl && (
                        <a
                          href={reviewUploadedFile.fileUrl}
                          download={reviewUploadedFile.namaFile}
                          className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-teal-800 hover:border-teal-300 transition-colors"
                          title="Unduh Draft File"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => setReviewUploadedFile(null)}
                        className="p-1.5 rounded-lg bg-white border border-slate-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 transition-colors cursor-pointer"
                        title="Hapus / Ganti Berkas"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative border-2 border-dashed border-teal-300/80 hover:border-teal-500 rounded-xl p-4 bg-teal-50/30 text-center transition-all">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleProcessUploadedFile(file, setReviewUploadedFile, selectedSeksiTab);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <UploadCloud className="w-7 h-7 text-teal-600 mx-auto mb-1.5" />
                    <p className="text-xs font-bold text-slate-800">
                      Klik atau seret berkas naskah draft ke sini
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Mendukung format PDF, Word DOC, DOCX (Maksimal 15 MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => {
                  setActiveReviewPermohonan(null);
                  setReviewUploadedFile(null);
                }}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleForwardToTTE}
                className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-4 h-4" /> Kirim Berkas ke Kepala Kantor untuk TTE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL UPLOAD BERKAS NASKAH TTE LANGSUNG KE OPERATOR & KEPALA KANTOR */}
      {isDirectUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                  <UploadCloud className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                      Seksi {seksiInfo.singkatan}
                    </span>
                    <span className="text-xs text-emerald-200 font-semibold">TTE BSrE BSSN</span>
                  </div>
                  <h3 className="font-bold text-base text-white mt-0.5">
                    Upload Berkas Naskah Dinas Siap TTE ke Kepala Kantor
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => setIsDirectUploadModalOpen(false)}
                className="p-1.5 rounded-lg text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleDirectUploadSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              {directError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{directError}</span>
                </div>
              )}

              {/* Seksi & Pejabat Info Banner */}
              <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-teal-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-slate-500 block text-[11px]">Seksi Pengunggah Naskah:</span>
                  <strong className="text-teal-900">{seksiInfo.nama}</strong>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-slate-500 block text-[11px]">Pejabat Penanggung Jawab:</span>
                  <strong className="text-slate-900">{seksiInfo.kepala}</strong>
                </div>
              </div>

              {/* Form Input fields */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Judul Naskah Dokumen Dinas: <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={directJudul}
                  onChange={(e) => {
                    setDirectJudul(e.target.value);
                    setDirectError('');
                  }}
                  placeholder="Contoh: SURAT REKOMENDASI IZIN OPERASIONAL MADRASAH"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Nomor Naskah Dinas:
                  </label>
                  <input
                    type="text"
                    value={directNomorSurat}
                    onChange={(e) => setDirectNomorSurat(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-teal-600 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Penerima / Peruntukan Dokumen: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={directPeruntukan}
                    onChange={(e) => {
                      setDirectPeruntukan(e.target.value);
                      setDirectError('');
                    }}
                    placeholder="Contoh: Yayasan Al-Falah / Drs. H. Ahmad"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-teal-600 font-semibold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Perihal Dokumen:
                </label>
                <input
                  type="text"
                  value={directPerihal}
                  onChange={(e) => setDirectPerihal(e.target.value)}
                  placeholder="Ringkasan perihal naskah dinas..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-teal-600"
                />
              </div>

              {/* UPLOAD FILE ZONE */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Paperclip className="w-4 h-4 text-teal-700" />
                    <span>Lampirkan Berkas File Naskah Dinas (PDF / DOCX): <span className="text-rose-500">*</span></span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleUseTemplateFile(directJudul, directNomorSurat, setDirectUploadedFile, selectedSeksiTab)}
                    className="text-[11px] font-bold text-teal-700 hover:text-teal-900 underline flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-amber-500" /> Pakai Naskah Contoh (.pdf)
                  </button>
                </div>

                {directUploadedFile ? (
                  <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-9 h-9 rounded-lg bg-teal-100 border border-teal-300 flex items-center justify-center text-teal-800 shrink-0">
                        <FileText className="w-5 h-5 text-teal-700" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {directUploadedFile.namaFile}
                        </p>
                        <p className="text-[10px] text-slate-500 font-medium">
                          {directUploadedFile.ukuranFile} • Diunggah {directUploadedFile.waktuUnggah} oleh {directUploadedFile.diunggahOleh}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {directUploadedFile.fileUrl && (
                        <a
                          href={directUploadedFile.fileUrl}
                          download={directUploadedFile.namaFile}
                          className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-teal-800 hover:border-teal-300 transition-colors"
                          title="Unduh Draft File"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => setDirectUploadedFile(null)}
                        className="p-1.5 rounded-lg bg-white border border-slate-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 transition-colors cursor-pointer"
                        title="Hapus / Ganti Berkas"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative border-2 border-dashed border-teal-300/80 hover:border-teal-500 rounded-xl p-5 bg-teal-50/30 text-center transition-all cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleProcessUploadedFile(file, setDirectUploadedFile, selectedSeksiTab);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <UploadCloud className="w-8 h-8 text-teal-600 mx-auto mb-1.5" />
                    <p className="text-xs font-bold text-slate-800">
                      Pilih atau Seret Berkas Naskah Dinas ke Area Ini
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Format didukung: PDF, DOCX, DOC (Ukuran maksimal 15 MB)
                    </p>
                  </div>
                )}
              </div>

              {/* Catatan Pengantar */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Catatan Pengantar untuk Operator & Kepala Kantor:
                </label>
                <textarea
                  rows={2}
                  value={directCatatan}
                  onChange={(e) => setDirectCatatan(e.target.value)}
                  placeholder="Catatan telaah atau instruksi khusus untuk penandatanganan..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-teal-600"
                />
              </div>

              {/* Legal Notice */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 text-[11px] leading-relaxed flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  Dokumen yang dikirim akan otomatis masuk ke antrean verifikasi Operator PTSP dan menunggu otorisasi TTE resmi Kepala Kantor menggunakan sertifikat digital BSrE BSSN.
                </span>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsDirectUploadModalOpen(false)}
                  className="px-4 py-2 font-bold text-slate-600 hover:text-slate-800 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-teal-800 hover:bg-teal-900 text-white font-bold rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Send className="w-4 h-4 text-emerald-300" />
                  Kirim ke Operator & Kepala Kantor (Siap TTE)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL SIMULASI INTEGRASI SSO APLIKASI */}
      {activeLaunchedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-sm">
                  {activeLaunchedApp.singkatan.substring(0, 2)}
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">{activeLaunchedApp.nama}</h3>
                  <p className="text-xs text-emerald-300">Tersinkronisasi dengan Database Kemenag Mura</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveLaunchedApp(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950">
                <span className="font-bold block mb-1">Status Koneksi Single Sign-On (SSO):</span>
                <span>Terautentikasi melalui Akun Resmi Satker Kementerian Agama Kabupaten Musi Rawas (Satker ID: 418291). Data ter-update secara otomatis dua arah.</span>
              </div>

              <div>
                <h4 className="font-bold text-slate-700 uppercase tracking-wider mb-2">Endpoint & Layanan Terkoneksi:</h4>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-700 space-y-1">
                  <div>URL Gateway: {activeLaunchedApp.urlSimulasi}</div>
                  <div>Pengembang: {activeLaunchedApp.pengembang}</div>
                  <div>Protokol: REST API / JSON Web Token (JWT) Secured</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-700 uppercase tracking-wider mb-2">Fitur Aktif:</h4>
                <ul className="grid grid-cols-2 gap-2">
                  {activeLaunchedApp.fiturUtama.map((fitur, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 p-2 bg-slate-100 rounded-lg font-medium text-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{fitur}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Kemenag Musi Rawas SPBE</span>
              <button
                onClick={() => setActiveLaunchedApp(null)}
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl cursor-pointer"
              >
                Selesai / Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
