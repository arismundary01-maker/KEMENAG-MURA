import React, { useState } from 'react';
import { usePTSP } from '../../context/PTSPContext';
import { 
  AkunPengguna, 
  BeritaItem, 
  PengaturanWeb, 
  SeksiType, 
  UserRole 
} from '../../types/ptsp';
import { 
  DATA_SEKSI_PENDIS, 
  DATA_SEKSI_BIMAS_ISLAM, 
  DATA_SEKSI_BIMAS_KRISTEN, 
  DATA_SEKSI_BIMAS_HINDU, 
  DATA_SEKSI_KEPEGAWAIAN,
  SEKSI_CONFIG
} from '../../data/initialData';
import { 
  ShieldCheck, 
  Users, 
  Settings, 
  Newspaper, 
  Database, 
  UserPlus, 
  Edit3, 
  Trash2, 
  KeyRound, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Filter, 
  Building2, 
  GraduationCap, 
  Landmark, 
  Cross, 
  Flame, 
  Globe, 
  Plus, 
  Save, 
  RefreshCw, 
  Eye, 
  Check, 
  X, 
  AlertTriangle, 
  FileText, 
  Lock, 
  Radio, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const SuperAdminPortal: React.FC = () => {
  const { 
    daftarAkun, 
    tambahAkun, 
    editAkun, 
    hapusAkun, 
    toggleStatusAkun,
    daftarBerita, 
    tambahBerita, 
    editBerita, 
    hapusBerita,
    pengaturanWeb, 
    updatePengaturanWeb,
    setCurrentRole,
    setActiveView,
    permohonanList
  } = usePTSP();

  // Active top tab in Super Admin
  const [activeMainTab, setActiveMainTab] = useState<'kelola_sumber_data' | 'layanan_berita' | 'pengelolaan_web'>('kelola_sumber_data');
  const [subDataTab, setSubDataTab] = useState<'kelola_akun' | 'data_master_seksi'>('kelola_akun');
  
  // Search & Filters
  const [searchAkunQuery, setSearchAkunQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('semua');
  const [searchBeritaQuery, setSearchBeritaQuery] = useState('');

  // Modals for Accounts
  const [isTambahAkunOpen, setIsTambahAkunOpen] = useState(false);
  const [editingAkun, setEditingAkun] = useState<AkunPengguna | null>(null);
  const [resetPassAkun, setResetPassAkun] = useState<AkunPengguna | null>(null);
  const [newPassphraseInput, setNewPassphraseInput] = useState('');
  const [resetSuccessMsg, setResetSuccessMsg] = useState('');

  // Account Form State
  const [formNamaLengkap, setFormNamaLengkap] = useState('');
  const [formUsername, setFormUsername] = useState('');
  const [formRole, setFormRole] = useState<UserRole>('operator_ptsp');
  const [formSeksi, setFormSeksi] = useState<SeksiType | ''>('');
  const [formJabatan, setFormJabatan] = useState('');
  const [formNip, setFormNip] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formTelepon, setFormTelepon] = useState('');
  const [formDeskripsi, setFormDeskripsi] = useState('');

  // Modals for News
  const [isTambahBeritaOpen, setIsTambahBeritaOpen] = useState(false);
  const [editingBerita, setEditingBerita] = useState<BeritaItem | null>(null);
  const [formJudulBerita, setFormJudulBerita] = useState('');
  const [formKategoriBerita, setFormKategoriBerita] = useState<BeritaItem['kategori']>('PTSP & Layanan');
  const [formRingkasanBerita, setFormRingkasanBerita] = useState('');
  const [formIsiBerita, setFormIsiBerita] = useState('');
  const [formGambarBerita, setFormGambarBerita] = useState('');
  const [formPenulisBerita, setFormPenulisBerita] = useState('Humas Kemenag Murung Raya');

  // Web Settings Form State
  const [siteSettings, setSiteSettings] = useState<PengaturanWeb>(pengaturanWeb);
  const [saveSettingsSuccess, setSaveSettingsSuccess] = useState(false);

  // Handlers for Accounts
  const handleOpenTambahAkun = () => {
    setFormNamaLengkap('');
    setFormUsername('');
    setFormRole('operator_ptsp');
    setFormSeksi('');
    setFormJabatan('Petugas Front Office');
    setFormNip('');
    setFormEmail('');
    setFormTelepon('');
    setFormDeskripsi('Pengelola layanan administrasi Kemenag Murung Raya.');
    setIsTambahAkunOpen(true);
  };

  const handleOpenEditAkun = (akun: AkunPengguna) => {
    setEditingAkun(akun);
    setFormNamaLengkap(akun.namaLengkap);
    setFormUsername(akun.username);
    setFormRole(akun.role);
    setFormSeksi(akun.seksi || '');
    setFormJabatan(akun.jabatan);
    setFormNip(akun.nip || '');
    setFormEmail(akun.email || '');
    setFormTelepon(akun.telepon || '');
    setFormDeskripsi(akun.deskripsiTugas);
  };

  const handleSaveAkun = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNamaLengkap || !formUsername) return;

    // Get badge configuration
    let badgeLabel = 'Operator Sistem';
    let badgeColor = 'bg-blue-100 text-blue-800 border-blue-300';
    if (formRole === 'super_admin') {
      badgeLabel = 'Super Admin Sistem';
      badgeColor = 'bg-red-100 text-red-800 border-red-300';
    } else if (formRole === 'kepala_kantor') {
      badgeLabel = 'Pimpinan (Kepala Kantor)';
      badgeColor = 'bg-rose-100 text-rose-800 border-rose-300';
    } else if (formRole === 'kasubbag_kepegawaian') {
      badgeLabel = 'Kasubbag Tata Usaha';
      badgeColor = 'bg-purple-100 text-purple-800 border-purple-300';
    } else if (formRole === 'kasi_pendis') {
      badgeLabel = 'Operator/Kasi Pendis';
      badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
    } else if (formRole === 'kasi_bimas_islam') {
      badgeLabel = 'Operator/Kasi Bimas Islam';
      badgeColor = 'bg-teal-100 text-teal-800 border-teal-300';
    } else if (formRole === 'penyelenggara_kristen') {
      badgeLabel = 'Operator/Penyelenggara Kristen';
      badgeColor = 'bg-indigo-100 text-indigo-800 border-indigo-300';
    } else if (formRole === 'penyelenggara_hindu') {
      badgeLabel = 'Operator/Penyelenggara Hindu';
      badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';
    }

    if (editingAkun) {
      editAkun(editingAkun.id, {
        namaLengkap: formNamaLengkap,
        username: formUsername,
        role: formRole,
        seksi: formSeksi ? formSeksi as SeksiType : undefined,
        jabatan: formJabatan,
        nip: formNip,
        email: formEmail,
        telepon: formTelepon,
        badgeLabel,
        badgeColor,
        deskripsiTugas: formDeskripsi
      });
      setEditingAkun(null);
    } else {
      tambahAkun({
        namaLengkap: formNamaLengkap,
        username: formUsername,
        role: formRole,
        seksi: formSeksi ? formSeksi as SeksiType : undefined,
        jabatan: formJabatan,
        nip: formNip,
        email: formEmail,
        telepon: formTelepon,
        badgeLabel,
        badgeColor,
        deskripsiTugas: formDeskripsi
      });
      setIsTambahAkunOpen(false);
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetPassAkun || !newPassphraseInput) return;
    setResetSuccessMsg(`Kata sandi / PIN TTE akun @${resetPassAkun.username} (${resetPassAkun.namaLengkap}) berhasil diperbarui.`);
    setTimeout(() => {
      setResetPassAkun(null);
      setNewPassphraseInput('');
      setResetSuccessMsg('');
    }, 1200);
  };

  // Handlers for News
  const handleOpenTambahBerita = () => {
    setFormJudulBerita('');
    setFormKategoriBerita('PTSP & Layanan');
    setFormRingkasanBerita('');
    setFormIsiBerita('');
    setFormGambarBerita('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80');
    setFormPenulisBerita('Humas Kemenag Murung Raya');
    setIsTambahBeritaOpen(true);
  };

  const handleOpenEditBerita = (berita: BeritaItem) => {
    setEditingBerita(berita);
    setFormJudulBerita(berita.judul);
    setFormKategoriBerita(berita.kategori);
    setFormRingkasanBerita(berita.ringkasan);
    setFormIsiBerita(berita.isiLengkap);
    setFormGambarBerita(berita.gambarUrl);
    setFormPenulisBerita(berita.penulis);
  };

  const handleSaveBerita = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formJudulBerita || !formRingkasanBerita) return;

    if (editingBerita) {
      editBerita(editingBerita.id, {
        judul: formJudulBerita,
        kategori: formKategoriBerita,
        ringkasan: formRingkasanBerita,
        isiLengkap: formIsiBerita,
        gambarUrl: formGambarBerita,
        penulis: formPenulisBerita
      });
      setEditingBerita(null);
    } else {
      tambahBerita({
        judul: formJudulBerita,
        kategori: formKategoriBerita,
        ringkasan: formRingkasanBerita,
        isiLengkap: formIsiBerita,
        gambarUrl: formGambarBerita,
        penulis: formPenulisBerita
      });
      setIsTambahBeritaOpen(false);
    }
  };

  // Handlers for Site Settings
  const handleSaveSiteSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updatePengaturanWeb(siteSettings);
    setSaveSettingsSuccess(true);
    setTimeout(() => setSaveSettingsSuccess(false), 3000);
  };

  // Filtered accounts
  const filteredAkun = daftarAkun.filter(acc => {
    const matchRole = filterRole === 'semua' || acc.role === filterRole;
    const q = searchAkunQuery.toLowerCase();
    const matchSearch = !searchAkunQuery || 
      acc.namaLengkap.toLowerCase().includes(q) || 
      acc.username.toLowerCase().includes(q) || 
      acc.jabatan.toLowerCase().includes(q) ||
      (acc.nip && acc.nip.includes(q));
    return matchRole && matchSearch;
  });

  // Filtered news
  const filteredBerita = daftarBerita.filter(b => {
    const q = searchBeritaQuery.toLowerCase();
    return !searchBeritaQuery || b.judul.toLowerCase().includes(q) || b.kategori.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* 1. TOP BANNER SUPER ADMIN */}
      <div className="bg-gradient-to-r from-slate-950 via-red-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl border-2 border-red-700/40 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-red-600/15 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0 shadow-inner">
              <ShieldCheck className="w-9 h-9 text-red-400" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-600 text-white shadow-xs">
                  SUPER ADMINISTRATOR
                </span>
                <span className="text-xs text-red-200 font-medium">
                  Portal Resmi: {pengaturanWeb.namaKantor}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Panel Pusat Kendali & Pengelolaan Data Keseluruhan
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                Kelola sumber data master kelembagaan, akun seluruh seksi dan pimpinan, CMS layanan berita publikasi, serta konfigurasi portal resmi Kementerian Agama Kabupaten Murung Raya.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 text-center min-w-[100px] border border-white/10">
              <div className="text-2xl font-black text-red-300">{daftarAkun.length}</div>
              <div className="text-[11px] text-slate-300">Total Akun</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 text-center min-w-[100px] border border-white/10">
              <div className="text-2xl font-black text-amber-300">{daftarBerita.length}</div>
              <div className="text-[11px] text-slate-300">Artikel Berita</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 text-center min-w-[100px] border border-white/10">
              <div className="text-2xl font-black text-emerald-300">{permohonanList.length}</div>
              <div className="text-[11px] text-slate-300">Permohonan</div>
            </div>
          </div>
        </div>

        {/* 2. SUPER ADMIN TOP LEVEL NAVIGATION (3 MAIN MENUS) */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveMainTab('kelola_sumber_data')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeMainTab === 'kelola_sumber_data'
                ? 'bg-red-600 text-white shadow-lg'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Database className="w-4 h-4 text-red-300" />
            1. Menu Kelola Sumber Data & Akun Seksi
          </button>

          <button
            onClick={() => setActiveMainTab('layanan_berita')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeMainTab === 'layanan_berita'
                ? 'bg-red-600 text-white shadow-lg'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Newspaper className="w-4 h-4 text-amber-300" />
            2. Layanan Berita & Publikasi CMS
          </button>

          <button
            onClick={() => setActiveMainTab('pengelolaan_web')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeMainTab === 'pengelolaan_web'
                ? 'bg-red-600 text-white shadow-lg'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Globe className="w-4 h-4 text-emerald-300" />
            3. Pengelolaan Web Resmi Kemenag Murung Raya
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 1: KELOLA SUMBER DATA (AKUN & DATA MASTER) */}
      {/* ------------------------------------------------------------- */}
      {activeMainTab === 'kelola_sumber_data' && (
        <div className="space-y-6">
          {/* Sub-menu toggle */}
          <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
            <button
              onClick={() => setSubDataTab('kelola_akun')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                subDataTab === 'kelola_akun'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Users className="w-4 h-4" />
              Kelola Akun Masing-Masing Seksi & Pimpinan ({daftarAkun.length})
            </button>

            <button
              onClick={() => setSubDataTab('data_master_seksi')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                subDataTab === 'data_master_seksi'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Database className="w-4 h-4" />
              Kelola Sumber Data Master (Madrasah, Masjid, Gereja, Pura, ASN)
            </button>
          </div>

          {/* SUB-MENU A: KELOLA AKUN */}
          {subDataTab === 'kelola_akun' && (
            <div className="space-y-4">
              {/* Toolbar */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchAkunQuery}
                    onChange={(e) => setSearchAkunQuery(e.target.value)}
                    placeholder="Cari akun: nama, username, jabatan, atau NIP..."
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-red-600 outline-hidden font-medium"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-700"
                  >
                    <option value="semua">Semua Role</option>
                    <option value="super_admin">Super Admin</option>
                    <option value="kepala_kantor">Kepala Kantor (Pimpinan)</option>
                    <option value="kasubbag_kepegawaian">Kasubbag TU</option>
                    <option value="kasi_pendis">Kasi Pendis</option>
                    <option value="kasi_bimas_islam">Kasi Bimas Islam</option>
                    <option value="penyelenggara_kristen">Bimas Kristen</option>
                    <option value="penyelenggara_hindu">Bimas Hindu</option>
                    <option value="operator_ptsp">Operator PTSP</option>
                    <option value="pemohon">Pemohon / Warga</option>
                  </select>

                  <button
                    onClick={handleOpenTambahAkun}
                    className="px-4 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" /> Tambah Akun Baru
                  </button>
                </div>
              </div>

              {/* Accounts Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4">Pengguna & Username</th>
                        <th className="py-3.5 px-4">Jabatan & Seksi</th>
                        <th className="py-3.5 px-4">NIP & Kontak</th>
                        <th className="py-3.5 px-4">Hak Akses & Status</th>
                        <th className="py-3.5 px-4 text-right">Aksi Kelola</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredAkun.map((acc) => (
                        <tr key={acc.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={acc.avatar}
                                alt={acc.namaLengkap}
                                className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
                              />
                              <div>
                                <div className="font-bold text-slate-900">{acc.namaLengkap}</div>
                                <div className="text-[11px] font-mono text-slate-500">@{acc.username}</div>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-800">{acc.jabatan}</div>
                            {acc.seksi && (
                              <div className="text-[11px] text-emerald-800 font-medium">
                                Seksi: {SEKSI_CONFIG[acc.seksi].singkatan}
                              </div>
                            )}
                          </td>

                          <td className="py-3.5 px-4 font-mono text-[11px]">
                            <div className="text-slate-800">NIP: {acc.nip || '-'}</div>
                            <div className="text-slate-500">{acc.email || '-'}</div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${acc.badgeColor}`}>
                                {acc.badgeLabel}
                              </span>
                            </div>
                            <button
                              onClick={() => toggleStatusAkun(acc.id)}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer ${
                                acc.statusAktif !== false
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-200 text-slate-600'
                              }`}
                            >
                              {acc.statusAktif !== false ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                              {acc.statusAktif !== false ? 'Aktif' : 'Non-aktif'}
                            </button>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Quick Switch to this account */}
                              <button
                                onClick={() => {
                                  setCurrentRole(acc.role);
                                  if (acc.role === 'pemohon') setActiveView('public_portal');
                                  else if (acc.role === 'operator_ptsp') setActiveView('operator_portal');
                                  else if (acc.role === 'kepala_kantor') setActiveView('kakan_tte');
                                  else if (acc.role.startsWith('kasi_') || acc.role.startsWith('penyelenggara_') || acc.role.startsWith('kasubbag_')) {
                                    setActiveView('seksi_dashboard');
                                  }
                                }}
                                title="Login / Beralih sebagai pengguna ini"
                                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-bold text-[11px] transition-colors cursor-pointer"
                              >
                                Gunakan
                              </button>

                              {/* Reset Password / PIN TTE */}
                              <button
                                onClick={() => setResetPassAkun(acc)}
                                title="Reset Kata Sandi / PIN Passphrase"
                                className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors cursor-pointer"
                              >
                                <KeyRound className="w-3.5 h-3.5" />
                              </button>

                              {/* Edit */}
                              <button
                                onClick={() => handleOpenEditAkun(acc)}
                                title="Edit Akun"
                                className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              {/* Delete (prevent deleting super admin itself) */}
                              {acc.role !== 'super_admin' && (
                                <button
                                  onClick={() => {
                                    if (confirm(`Yakin ingin menghapus akun ${acc.namaLengkap} (@${acc.username})?`)) {
                                      hapusAkun(acc.id);
                                    }
                                  }}
                                  title="Hapus Akun"
                                  className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SUB-MENU B: KELOLA SUMBER DATA MASTER */}
          {subDataTab === 'data_master_seksi' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Card 1: Data Madrasah Murung Raya */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-bold text-sm text-slate-900">Data Pendidikan Islam ({DATA_SEKSI_PENDIS.length})</h4>
                  </div>
                  <span className="text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    Seksi Pendis
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Basis data kelembagaan madrasah negeri dan swasta, pondok pesantren, dan tenaga pendidik PAI se-Kabupaten Murung Raya.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 font-mono">
                  {DATA_SEKSI_PENDIS.slice(0, 3).map(m => (
                    <div key={m.id} className="truncate">• {m.nama} ({m.jenjang} - {m.kecamatan})</div>
                  ))}
                </div>
                <div className="pt-2 flex justify-end">
                  <a
                    href="https://sipendismura.my.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    Buka Sinkronisasi sipendismura.my.id <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Card 2: Data Bimas Islam & Kemasjidan */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Landmark className="w-5 h-5 text-teal-600" />
                    <h4 className="font-bold text-sm text-slate-900">Data Kemasjidan & KUA ({DATA_SEKSI_BIMAS_ISLAM.length})</h4>
                  </div>
                  <span className="text-[11px] font-mono font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded">
                    Bimas Islam
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Pencatatan data KUA kecamatan, nomor ID SIMAS masjid/mushalla, kalibrasi arah kiblat, dan tanah wakaf.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 font-mono">
                  {DATA_SEKSI_BIMAS_ISLAM.slice(0, 3).map(b => (
                    <div key={b.id} className="truncate">• {b.nama} ({b.tipologi})</div>
                  ))}
                </div>
                <div className="pt-2 flex justify-end">
                  <span className="text-xs font-bold text-teal-700">Tersinkronisasi SIMAS & SIMKAH Gen 4</span>
                </div>
              </div>

              {/* Card 3: Data Bimas Kristen */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Cross className="w-5 h-5 text-indigo-600" />
                    <h4 className="font-bold text-sm text-slate-900">Data Rumah Ibadah & Gereja ({DATA_SEKSI_BIMAS_KRISTEN.length})</h4>
                  </div>
                  <span className="text-[11px] font-mono font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
                    Bimas Kristen
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Pencatatan tanda daftar gereja, data pendeta/rohaniwan, dan jemaat Kristen di Kabupaten Murung Raya.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 font-mono">
                  {DATA_SEKSI_BIMAS_KRISTEN.slice(0, 3).map(k => (
                    <div key={k.id} className="truncate">• {k.nama} ({k.sinode})</div>
                  ))}
                </div>
                <div className="pt-2 flex justify-end">
                  <span className="text-xs font-bold text-indigo-700">Tersinkronisasi SIAGAMA Kristen</span>
                </div>
              </div>

              {/* Card 4: Data Kepegawaian ASN */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-purple-600" />
                    <h4 className="font-bold text-sm text-slate-900">Database Pegawai ASN ({DATA_SEKSI_KEPEGAWAIAN.length})</h4>
                  </div>
                  <span className="text-[11px] font-mono font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                    Subbag TU
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Profil kepegawaian ASN PNS dan PPPK, pangkat/golongan, riwayat cuti, KGB, dan integrasi SIASN BKN.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 font-mono">
                  {DATA_SEKSI_KEPEGAWAIAN.slice(0, 3).map(p => (
                    <div key={p.id} className="truncate">• {p.nama} ({p.jabatan})</div>
                  ))}
                </div>
                <div className="pt-2 flex justify-end">
                  <span className="text-xs font-bold text-purple-700">Tersinkronisasi SIMPEG 5 & SIASN</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: LAYANAN BERITA & PUBLIKASI CMS */}
      {/* ------------------------------------------------------------- */}
      {activeMainTab === 'layanan_berita' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchBeritaQuery}
                onChange={(e) => setSearchBeritaQuery(e.target.value)}
                placeholder="Cari berita publikasi..."
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-red-600 outline-hidden font-medium"
              />
            </div>

            <button
              onClick={handleOpenTambahBerita}
              className="px-4 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Tulis Berita Baru
            </button>
          </div>

          {/* News List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredBerita.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img 
                      src={item.gambarUrl} 
                      alt={item.judul}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-slate-900/90 text-white font-bold text-[10px] px-2.5 py-1 rounded-md backdrop-blur-xs">
                      {item.kategori}
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                      <span>{item.tanggal}</span>
                      <span>•</span>
                      <span>{item.penulis}</span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 line-clamp-2 mb-2">
                      {item.judul}
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-2">
                      {item.ringkasan}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">Dibaca: {item.dibaca}x</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditBerita(item)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                      title="Edit Berita"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Hapus artikel berita "${item.judul}"?`)) {
                          hapusBerita(item.id);
                        }
                      }}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer"
                      title="Hapus Berita"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: PENGELOLAAN WEB RESMI KEMENAG MURUNG RAYA */}
      {/* ------------------------------------------------------------- */}
      {activeMainTab === 'pengelolaan_web' && (
        <form onSubmit={handleSaveSiteSettings} className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Konfigurasi Identitas Portal Web Resmi Kemenag Murung Raya
                </h3>
                <p className="text-xs text-slate-600">
                  Ubah nama instansi, alamat resmi Puruk Cahu, kontak layanan, serta teks pengumuman beranda
                </p>
              </div>

              {saveSettingsSuccess && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Pengaturan Berhasil Disimpan
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Kantor Resmi *</label>
                <input
                  type="text"
                  value={siteSettings.namaKantor}
                  onChange={(e) => setSiteSettings({ ...siteSettings, namaKantor: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Singkatan Lembaga</label>
                <input
                  type="text"
                  value={siteSettings.singkatanKantor}
                  onChange={(e) => setSiteSettings({ ...siteSettings, singkatanKantor: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kabupaten & Provinsi</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={siteSettings.kabupaten}
                    onChange={(e) => setSiteSettings({ ...siteSettings, kabupaten: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                  <input
                    type="text"
                    value={siteSettings.provinsi}
                    onChange={(e) => setSiteSettings({ ...siteSettings, provinsi: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Slogan Pelayanan</label>
                <input
                  type="text"
                  value={siteSettings.slogan}
                  onChange={(e) => setSiteSettings({ ...siteSettings, slogan: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 italic"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Alamat Gedung Kantor Resmi *</label>
                <input
                  type="text"
                  value={siteSettings.alamatLengkap}
                  onChange={(e) => setSiteSettings({ ...siteSettings, alamatLengkap: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nomor Telepon Kantor & Call Center</label>
                <input
                  type="text"
                  value={siteSettings.telepon}
                  onChange={(e) => setSiteSettings({ ...siteSettings, telepon: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Resmi Layanan</label>
                <input
                  type="email"
                  value={siteSettings.email}
                  onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-mono"
                />
              </div>
            </div>

            {/* Banner Pengumuman Beranda */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-900 block">
                  Teks Banner Pengumuman Beranda Publik:
                </label>
                <label className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={siteSettings.statusPengumuman}
                    onChange={(e) => setSiteSettings({ ...siteSettings, statusPengumuman: e.target.checked })}
                    className="rounded text-red-600"
                  />
                  Tampilkan di Beranda
                </label>
              </div>
              <textarea
                rows={2}
                value={siteSettings.teksPengumuman}
                onChange={(e) => setSiteSettings({ ...siteSettings, teksPengumuman: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 font-medium"
              />
            </div>

            {/* TTE Integration Authority */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-slate-900">Konfigurasi Otoritas Tanda Tangan Elektronik (TTE):</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">Lembaga Otoritas Penjamin:</span>
                  <input
                    type="text"
                    value={siteSettings.tteOtoritas}
                    onChange={(e) => setSiteSettings({ ...siteSettings, tteOtoritas: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold text-slate-900"
                  />
                </div>
                <div className="flex items-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Modul TTE BSrE Aktif & Terenkripsi SHA-256
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Simpan Pengaturan Web Resmi
              </button>
            </div>
          </div>
        </form>
      )}

      {/* MODAL TAMBAH / EDIT AKUN PENGGUNA */}
      {(isTambahAkunOpen || editingAkun) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-white">
                  {editingAkun ? 'Edit Data Akun Pengguna' : 'Tambah Akun Pengguna Baru'}
                </h3>
                <p className="text-xs text-slate-300">Pengelolaan Akses Sistem Kemenag Murung Raya</p>
              </div>
              <button
                onClick={() => { setIsTambahAkunOpen(false); setEditingAkun(null); }}
                className="p-1 rounded-lg hover:bg-white/10 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAkun} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Lengkap & Gelar *</label>
                  <input
                    type="text"
                    required
                    value={formNamaLengkap}
                    onChange={(e) => setFormNamaLengkap(e.target.value)}
                    placeholder="Contoh: Drs. H. Ahmad Fauzi, M.Pd.I"
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Username Login *</label>
                  <input
                    type="text"
                    required
                    value={formUsername}
                    onChange={(e) => setFormUsername(e.target.value)}
                    placeholder="Contoh: kasi.pendis"
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Role / Peran Sistem *</label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value as UserRole)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
                  >
                    <option value="operator_ptsp">Operator PTSP (Front Office)</option>
                    <option value="kasi_pendis">Kepala Seksi Pendis</option>
                    <option value="kasi_bimas_islam">Kepala Seksi Bimas Islam</option>
                    <option value="penyelenggara_kristen">Penyelenggara Bimas Kristen</option>
                    <option value="penyelenggara_hindu">Penyelenggara Bimas Hindu</option>
                    <option value="kasubbag_kepegawaian">Kasubbag Tata Usaha</option>
                    <option value="kepala_kantor">Kepala Kantor (Pimpinan / TTE)</option>
                    <option value="super_admin">Super Administrator</option>
                    <option value="pemohon">Pemohon / Warga</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Seksi Terkait</label>
                  <select
                    value={formSeksi}
                    onChange={(e) => setFormSeksi(e.target.value as SeksiType)}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  >
                    <option value="">Tidak terikat seksi</option>
                    <option value="pendis">Seksi Pendidikan Islam</option>
                    <option value="bimas_islam">Seksi Bimas Islam</option>
                    <option value="bimas_kristen">Bimas Kristen</option>
                    <option value="bimas_hindu">Bimas Hindu</option>
                    <option value="kepegawaian">Subbag TU Kepegawaian</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jabatan Resmi</label>
                  <input
                    type="text"
                    value={formJabatan}
                    onChange={(e) => setFormJabatan(e.target.value)}
                    placeholder="Contoh: Kasi Pendidikan Islam"
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">NIP Pegawai (Opsional)</label>
                  <input
                    type="text"
                    value={formNip}
                    onChange={(e) => setFormNip(e.target.value)}
                    placeholder="18 Digit NIP"
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Dinas</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="email@kemenag.go.id"
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">No. WhatsApp / HP</label>
                  <input
                    type="tel"
                    value={formTelepon}
                    onChange={(e) => setFormTelepon(e.target.value)}
                    placeholder="08xxxxxxxx"
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Tugas Akun</label>
                <textarea
                  rows={2}
                  value={formDeskripsi}
                  onChange={(e) => setFormDeskripsi(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="pt-2 flex justify-between items-center border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => { setIsTambahAkunOpen(false); setEditingAkun(null); }}
                  className="px-4 py-2 font-bold text-slate-600 hover:text-slate-800 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded-xl shadow-md cursor-pointer"
                >
                  {editingAkun ? 'Perbarui Akun' : 'Daftarkan Akun'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL RESET PASSWORD / PASSPHRASE TTE */}
      {resetPassAkun && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-white">Reset Kata Sandi / PIN TTE</h3>
              </div>
              <button
                onClick={() => setResetPassAkun(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleResetPassword} className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Akun yang dipilih:</span>
                <strong className="text-slate-900 font-bold text-sm block">{resetPassAkun.namaLengkap}</strong>
                <span className="text-slate-600 font-mono">@{resetPassAkun.username} • {resetPassAkun.jabatan}</span>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Masukkan Kata Sandi / Passphrase TTE Baru:
                </label>
                <input
                  type="password"
                  required
                  value={newPassphraseInput}
                  onChange={(e) => setNewPassphraseInput(e.target.value)}
                  placeholder="Ketik kata sandi / PIN baru..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-sm"
                  autoFocus
                />
              </div>

              {resetSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{resetSuccessMsg}</span>
                </div>
              )}

              <div className="pt-2 flex justify-between items-center border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setResetPassAkun(null)}
                  className="px-4 py-2 font-bold text-slate-600 hover:text-slate-800 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Simpan Password Baru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH / EDIT BERITA PUBLIKASI */}
      {(isTambahBeritaOpen || editingBerita) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-white">
                  {editingBerita ? 'Edit Artikel Berita' : 'Tulis Berita Baru Web Kemenag Murung Raya'}
                </h3>
                <p className="text-xs text-slate-300">Pemberitaan & Publikasi Informasi Publik</p>
              </div>
              <button
                onClick={() => { setIsTambahBeritaOpen(false); setEditingBerita(null); }}
                className="p-1 rounded-lg hover:bg-white/10 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBerita} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Berita *</label>
                <input
                  type="text"
                  required
                  value={formJudulBerita}
                  onChange={(e) => setFormJudulBerita(e.target.value)}
                  placeholder="Ketik judul berita yang menarik dan informatif..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori Berita</label>
                  <select
                    value={formKategoriBerita}
                    onChange={(e) => setFormKategoriBerita(e.target.value as BeritaItem['kategori'])}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
                  >
                    <option value="PTSP & Layanan">PTSP & Layanan</option>
                    <option value="Pendidikan">Pendidikan (Madrasah / Ponpes)</option>
                    <option value="Bimas Islam">Bimas Islam</option>
                    <option value="Kerukunan Umat">Kerukunan Umat</option>
                    <option value="Kepegawaian">Kepegawaian</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Penulis / Redaksi</label>
                  <input
                    type="text"
                    value={formPenulisBerita}
                    onChange={(e) => setFormPenulisBerita(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">URL Gambar Cover (Foto Utama)</label>
                <input
                  type="url"
                  value={formGambarBerita}
                  onChange={(e) => setFormGambarBerita(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ringkasan Berita *</label>
                <textarea
                  rows={2}
                  required
                  value={formRingkasanBerita}
                  onChange={(e) => setFormRingkasanBerita(e.target.value)}
                  placeholder="Ringkasan singkat berita untuk ditampilkan di kartu beranda..."
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Isi Lengkap Berita</label>
                <textarea
                  rows={5}
                  value={formIsiBerita}
                  onChange={(e) => setFormIsiBerita(e.target.value)}
                  placeholder="Tuliskan isi berita secara terperinci..."
                  className="w-full p-3 rounded-xl border border-slate-300 leading-relaxed"
                />
              </div>

              <div className="pt-2 flex justify-between items-center border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => { setIsTambahBeritaOpen(false); setEditingBerita(null); }}
                  className="px-4 py-2 font-bold text-slate-600 hover:text-slate-800 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded-xl shadow-md cursor-pointer"
                >
                  {editingBerita ? 'Perbarui Berita' : 'Publikasikan Berita'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
