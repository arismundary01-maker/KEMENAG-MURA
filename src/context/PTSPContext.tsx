import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Permohonan, 
  UserRole, 
  SeksiType, 
  NotifikasiItem, 
  StatusPermohonan, 
  DokumenPersyaratan,
  AkunPengguna,
  BeritaItem,
  PengaturanWeb,
  LayananKatalog,
  KepalaKantorHistory,
  MenuAplikasiWeb
} from '../types/ptsp';
import { 
  INITIAL_PERMOHONAN, 
  DAFTAR_AKUN_SISTEM, 
  BERITA_TERKINI, 
  PENGATURAN_WEB_DEFAULT,
  KATALOG_LAYANAN,
  DATA_KEPALA_KANTOR,
  MENU_APLIKASI_WEB_DEFAULT
} from '../data/initialData';
import { soundService } from '../services/soundNotification';
import confetti from 'canvas-confetti';

interface WhatsAppSimulasi {
  isOpen: boolean;
  to: string;
  nomorResi: string;
  pesan: string;
  waktu: string;
}

interface PTSPContextType {
  permohonanList: Permohonan[];
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  activeView: 'public_portal' | 'operator_portal' | 'seksi_dashboard' | 'kakan_tte' | 'tracking_view' | 'tte_verifier' | 'super_admin_portal';
  setActiveView: (view: 'public_portal' | 'operator_portal' | 'seksi_dashboard' | 'kakan_tte' | 'tracking_view' | 'tte_verifier' | 'super_admin_portal') => void;
  selectedSeksiTab: SeksiType;
  setSelectedSeksiTab: (seksi: SeksiType) => void;
  
  // Real-time notifications
  notifications: NotifikasiItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  
  // Tracking
  selectedTrackingResi: string | null;
  setSelectedTrackingResi: (resi: string | null) => void;

  // Super Admin Management Data & Actions
  daftarAkun: AkunPengguna[];
  tambahAkun: (data: Partial<AkunPengguna>) => void;
  editAkun: (id: string, data: Partial<AkunPengguna>) => void;
  hapusAkun: (id: string) => void;
  toggleStatusAkun: (id: string) => void;

  daftarBerita: BeritaItem[];
  tambahBerita: (data: Partial<BeritaItem>) => void;
  editBerita: (id: string, data: Partial<BeritaItem>) => void;
  hapusBerita: (id: string) => void;

  katalogLayanan: LayananKatalog[];
  tambahLayanan: (data: Partial<LayananKatalog>) => void;
  editLayanan: (id: string, data: Partial<LayananKatalog>) => void;
  hapusLayanan: (id: string) => void;

  dataKepalaKantor: KepalaKantorHistory[];
  tambahKepalaKantor: (data: Partial<KepalaKantorHistory>) => void;
  editKepalaKantor: (id: string, data: Partial<KepalaKantorHistory>) => void;
  hapusKepalaKantor: (id: string) => void;

  daftarMenuAplikasi: MenuAplikasiWeb[];
  tambahMenuAplikasi: (data: Partial<MenuAplikasiWeb>) => void;
  editMenuAplikasi: (id: string, data: Partial<MenuAplikasiWeb>) => void;
  hapusMenuAplikasi: (id: string) => void;

  pengaturanWeb: PengaturanWeb;
  updatePengaturanWeb: (data: Partial<PengaturanWeb>) => void;

  // Actions
  tambahPermohonan: (data: Partial<Permohonan>) => string;
  operatorValidasiBerkas: (
    nomorResi: string, 
    status: 'disposisi_seksi' | 'perlu_revisi' | 'ditolak', 
    catatan: string,
    dokumenListUpdated: DokumenPersyaratan[]
  ) => void;
  seksiReviewPermohonan: (
    nomorResi: string,
    status: 'siap_tte' | 'perlu_revisi' | 'telaah_seksi',
    catatan: string,
    draftSurat?: Permohonan['isiDokumenKeluaran']
  ) => void;
  eksekusiTTE: (
    nomorResi: string,
    passphrase: string,
    signerName: string,
    nip: string,
    jabatan: string
  ) => boolean;
  
  // WhatsApp Notification Simulator Toast
  whatsAppAlert: WhatsAppSimulasi | null;
  dismissWhatsAppAlert: () => void;

  // Selected item modal preview
  selectedPermohonanForDetail: Permohonan | null;
  setSelectedPermohonanForDetail: (p: Permohonan | null) => void;
  showTTEModalForResi: string | null;
  setShowTTEModalForResi: (resi: string | null) => void;
}

const PTSPContext = createContext<PTSPContextType | undefined>(undefined);

export const PTSPProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [permohonanList, setPermohonanList] = useState<Permohonan[]>(() => {
    const saved = localStorage.getItem('kemenag_ptsp_permohonan');
    if (saved) {
      try { return JSON.parse(saved); } catch { return INITIAL_PERMOHONAN; }
    }
    return INITIAL_PERMOHONAN;
  });

  const [currentRole, setCurrentRole] = useState<UserRole>('super_admin');
  const [activeView, setActiveView] = useState<'public_portal' | 'operator_portal' | 'seksi_dashboard' | 'kakan_tte' | 'tracking_view' | 'tte_verifier' | 'super_admin_portal'>('super_admin_portal');
  const [selectedSeksiTab, setSelectedSeksiTab] = useState<SeksiType>('pendis');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [selectedTrackingResi, setSelectedTrackingResi] = useState<string | null>(null);
  const [selectedPermohonanForDetail, setSelectedPermohonanForDetail] = useState<Permohonan | null>(null);
  const [showTTEModalForResi, setShowTTEModalForResi] = useState<string | null>(null);
  const [whatsAppAlert, setWhatsAppAlert] = useState<WhatsAppSimulasi | null>(null);

  // Super Admin reactive states
  const [daftarAkun, setDaftarAkun] = useState<AkunPengguna[]>(() => {
    const saved = localStorage.getItem('kemenag_mura_daftar_akun');
    if (saved) {
      try { return JSON.parse(saved); } catch { return DAFTAR_AKUN_SISTEM; }
    }
    return DAFTAR_AKUN_SISTEM;
  });

  const [daftarBerita, setDaftarBerita] = useState<BeritaItem[]>(() => {
    const saved = localStorage.getItem('kemenag_mura_daftar_berita');
    if (saved) {
      try { return JSON.parse(saved); } catch { return BERITA_TERKINI; }
    }
    return BERITA_TERKINI;
  });

  const [katalogLayanan, setKatalogLayanan] = useState<LayananKatalog[]>(() => {
    const saved = localStorage.getItem('kemenag_mura_katalog_layanan');
    if (saved) {
      try { return JSON.parse(saved); } catch { return KATALOG_LAYANAN; }
    }
    return KATALOG_LAYANAN;
  });

  const [dataKepalaKantor, setDataKepalaKantor] = useState<KepalaKantorHistory[]>(() => {
    const saved = localStorage.getItem('kemenag_mura_kepala_kantor');
    if (saved) {
      try { return JSON.parse(saved); } catch { return DATA_KEPALA_KANTOR; }
    }
    return DATA_KEPALA_KANTOR;
  });

  const [daftarMenuAplikasi, setDaftarMenuAplikasi] = useState<MenuAplikasiWeb[]>(() => {
    const saved = localStorage.getItem('kemenag_mura_menu_aplikasi');
    if (saved) {
      try { return JSON.parse(saved); } catch { return MENU_APLIKASI_WEB_DEFAULT; }
    }
    return MENU_APLIKASI_WEB_DEFAULT;
  });

  const [pengaturanWeb, setPengaturanWeb] = useState<PengaturanWeb>(() => {
    const saved = localStorage.getItem('kemenag_mura_pengaturan_web');
    if (saved) {
      try { return JSON.parse(saved); } catch { return PENGATURAN_WEB_DEFAULT; }
    }
    return PENGATURAN_WEB_DEFAULT;
  });

  const [notifications, setNotifications] = useState<NotifikasiItem[]>([
    {
      id: 'n-1',
      judul: 'Tanda Tangan Elektronik Selesai',
      pesan: 'Surat Rekomendasi MTs Al-Falah Tugumulyo (PTSP-MURA-2026-0038) telah berhasil di-TTE oleh Kepala Kantor.',
      waktu: 'Baru saja',
      tipe: 'tte',
      dibaca: false,
      resiPermohonan: 'PTSP-MURA-2026-0038'
    },
    {
      id: 'n-2',
      judul: 'Antrean TTE Baru',
      pesan: 'Seksi Bimas Islam telah mengajukan draft rekomendasi bantuan masjid (PTSP-MURA-2026-0042) untuk di-TTE.',
      waktu: '10 menit lalu',
      tipe: 'info',
      dibaca: false,
      resiPermohonan: 'PTSP-MURA-2026-0042'
    },
    {
      id: 'n-3',
      judul: 'Permohonan Masuk ke Operator',
      pesan: 'Permohonan Cuti ASN Baru dari Drs. H. Syamsuddin, M.Si siap diverifikasi Front Office.',
      waktu: '25 menit lalu',
      tipe: 'peringatan',
      dibaca: true,
      resiPermohonan: 'PTSP-MURA-2026-0051'
    }
  ]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('kemenag_ptsp_permohonan', JSON.stringify(permohonanList));
  }, [permohonanList]);

  useEffect(() => {
    localStorage.setItem('kemenag_mura_daftar_akun', JSON.stringify(daftarAkun));
  }, [daftarAkun]);

  useEffect(() => {
    localStorage.setItem('kemenag_mura_daftar_berita', JSON.stringify(daftarBerita));
  }, [daftarBerita]);

  useEffect(() => {
    localStorage.setItem('kemenag_mura_katalog_layanan', JSON.stringify(katalogLayanan));
  }, [katalogLayanan]);

  useEffect(() => {
    localStorage.setItem('kemenag_mura_kepala_kantor', JSON.stringify(dataKepalaKantor));
  }, [dataKepalaKantor]);

  useEffect(() => {
    localStorage.setItem('kemenag_mura_menu_aplikasi', JSON.stringify(daftarMenuAplikasi));
  }, [daftarMenuAplikasi]);

  useEffect(() => {
    localStorage.setItem('kemenag_mura_pengaturan_web', JSON.stringify(pengaturanWeb));
  }, [pengaturanWeb]);

  // Super Admin CRUD Handlers
  const tambahAkun = (data: Partial<AkunPengguna>) => {
    const newId = 'acc-' + Date.now();
    const newAkun: AkunPengguna = {
      id: newId,
      username: data.username || `user.${Date.now().toString().slice(-4)}`,
      namaLengkap: data.namaLengkap || 'Pengguna Baru',
      role: data.role || 'operator_ptsp',
      seksi: data.seksi,
      jabatan: data.jabatan || 'Staf Pelaksana',
      nip: data.nip || '-',
      email: data.email || 'user@kemenag.go.id',
      telepon: data.telepon || '081200000000',
      statusAktif: true,
      lastLogin: 'Belum pernah login',
      avatar: data.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      badgeLabel: data.badgeLabel || 'Operator Sistem',
      badgeColor: data.badgeColor || 'bg-blue-100 text-blue-800 border-blue-300',
      deskripsiTugas: data.deskripsiTugas || 'Bertugas memproses layanan operasional Kemenag Murung Raya.'
    };
    setDaftarAkun(prev => [newAkun, ...prev]);
    soundService.playNotification();
  };

  const editAkun = (id: string, data: Partial<AkunPengguna>) => {
    setDaftarAkun(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
    soundService.playNotification();
  };

  const hapusAkun = (id: string) => {
    setDaftarAkun(prev => prev.filter(a => a.id !== id));
  };

  const toggleStatusAkun = (id: string) => {
    setDaftarAkun(prev => prev.map(a => a.id === id ? { ...a, statusAktif: !a.statusAktif } : a));
  };

  // Berita Handlers
  const tambahBerita = (data: Partial<BeritaItem>) => {
    const newId = 'news-' + Date.now();
    const newBerita: BeritaItem = {
      id: newId,
      judul: data.judul || 'Berita Baru Kementerian Agama Kabupaten Murung Raya',
      ringkasan: data.ringkasan || 'Informasi terbaru seputar kegiatan dan layanan keagamaan.',
      kategori: data.kategori || 'PTSP & Layanan',
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      penulis: data.penulis || 'Humas Kemenag Murung Raya',
      dibaca: 1,
      gambarUrl: data.gambarUrl || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
      isiLengkap: data.isiLengkap || 'Pelaksanaan kegiatan resmi di lingkungan Kantor Kementerian Agama Kabupaten Murung Raya berjalan lancar dan tertib.'
    };
    setDaftarBerita(prev => [newBerita, ...prev]);
    soundService.playNotification();
  };

  const editBerita = (id: string, data: Partial<BeritaItem>) => {
    setDaftarBerita(prev => prev.map(b => b.id === id ? { ...b, ...data } : b));
    soundService.playNotification();
  };

  const hapusBerita = (id: string) => {
    setDaftarBerita(prev => prev.filter(b => b.id !== id));
    soundService.playNotification();
  };

  // Katalog Layanan Handlers (Direct CRUD from Beranda PTSP)
  const tambahLayanan = (data: Partial<LayananKatalog>) => {
    const newId = 'layanan-' + Date.now();
    const newLayanan: LayananKatalog = {
      id: newId,
      kode: data.kode || `LAY-${Math.floor(100 + Math.random() * 900)}`,
      seksi: data.seksi || 'pendis',
      namaLayanan: data.namaLayanan || 'Layanan Baru PTSP',
      deskripsi: data.deskripsi || 'Deskripsi perizinan / rekomendasi dinas Kementerian Agama Kabupaten Murung Raya.',
      estimasiHari: data.estimasiHari ?? 3,
      biaya: data.biaya ?? 0,
      dasarHukum: data.dasarHukum || 'PMA RI & Standar Operasional Prosedur PTSP',
      outputDokumen: data.outputDokumen || 'Surat Rekomendasi Resmi TTE BSrE',
      dokumenSyarat: data.dokumenSyarat && data.dokumenSyarat.length > 0 ? data.dokumenSyarat : [
        'Surat Permohonan Resmi ditujukan ke Kepala Kantor',
        'Fotokopi KTP Pemohon / Penanggung Jawab',
        'Dokumen Proposal / Berkas Pendukung Lengkap'
      ]
    };
    setKatalogLayanan(prev => [newLayanan, ...prev]);
    soundService.playNotification();
  };

  const editLayanan = (id: string, data: Partial<LayananKatalog>) => {
    setKatalogLayanan(prev => prev.map(l => l.id === id ? { ...l, ...data } : l));
    soundService.playNotification();
  };

  const hapusLayanan = (id: string) => {
    setKatalogLayanan(prev => prev.filter(l => l.id !== id));
    soundService.playNotification();
  };

  // Riwayat Kepala Kantor Handlers (Direct CRUD from Beranda PTSP)
  const tambahKepalaKantor = (data: Partial<KepalaKantorHistory>) => {
    const newId = 'kk-' + Date.now();
    const nextUrutan = data.urutan ?? (dataKepalaKantor.length + 1);
    const newKK: KepalaKantorHistory = {
      id: newId,
      urutan: nextUrutan,
      nama: data.nama || 'Nama Pejabat Baru',
      gelar: data.gelar || 'M.Pd.I',
      periode: data.periode || `${new Date().getFullYear()} - Sekarang`,
      tahunMulai: data.tahunMulai || new Date().getFullYear(),
      tahunSelesai: data.tahunSelesai ?? 'Sekarang',
      status: data.status || 'Menjabat (Aktif)',
      prestasi: data.prestasi || 'Inovasi Digitalisasi Pelayanan Terpadu Satu Pintu',
      fotoUrl: data.fotoUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
      nip: data.nip || '19750101 200003 1 001'
    };
    setDataKepalaKantor(prev => [...prev, newKK]);
    soundService.playNotification();
  };

  const editKepalaKantor = (id: string, data: Partial<KepalaKantorHistory>) => {
    setDataKepalaKantor(prev => prev.map(k => k.id === id ? { ...k, ...data } : k));
    soundService.playNotification();
  };

  const hapusKepalaKantor = (id: string) => {
    setDataKepalaKantor(prev => prev.filter(k => k.id !== id));
    soundService.playNotification();
  };

  // Menu Aplikasi Web Handlers (Direct CRUD from Beranda PTSP)
  const tambahMenuAplikasi = (data: Partial<MenuAplikasiWeb>) => {
    const newId = 'app-' + Date.now();
    const nextUrutan = data.urutan ?? (daftarMenuAplikasi.length + 1);
    const newApp: MenuAplikasiWeb = {
      id: newId,
      namaAplikasi: data.namaAplikasi || 'Portal Web / Aplikasi Kemenag',
      singkatan: data.singkatan || 'PORTAL',
      kategori: data.kategori || 'portal_utama',
      deskripsi: data.deskripsi || 'Aplikasi dan layanan digital resmi Kementerian Agama Kabupaten Murung Raya.',
      url: data.url || 'https://murungraya.kemenag.go.id',
      badgeText: data.badgeText || 'Aplikasi Resmi',
      warnaTema: data.warnaTema || 'emerald',
      ikon: data.ikon || 'Globe',
      statusAktif: data.statusAktif ?? true,
      bukaTabBaru: data.bukaTabBaru ?? true,
      urutan: nextUrutan
    };
    setDaftarMenuAplikasi(prev => [newApp, ...prev]);
    soundService.playNotification();
  };

  const editMenuAplikasi = (id: string, data: Partial<MenuAplikasiWeb>) => {
    setDaftarMenuAplikasi(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
    soundService.playNotification();
  };

  const hapusMenuAplikasi = (id: string) => {
    setDaftarMenuAplikasi(prev => prev.filter(a => a.id !== id));
    soundService.playNotification();
  };

  const updatePengaturanWeb = (data: Partial<PengaturanWeb>) => {
    setPengaturanWeb(prev => ({ ...prev, ...data }));
    soundService.playNotification();
  };

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    soundService.setSoundEnabled(newState);
    if (newState) {
      soundService.playNotification();
    }
  };

  const triggerRealTimeNotification = (
    judul: string, 
    pesan: string, 
    tipe: 'info' | 'sukses' | 'peringatan' | 'tte',
    resi?: string,
    noHp?: string
  ) => {
    soundService.playNotification();
    const newNotif: NotifikasiItem = {
      id: 'n-' + Date.now(),
      judul,
      pesan,
      waktu: 'Baru saja',
      tipe,
      dibaca: false,
      resiPermohonan: resi
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Trigger WhatsApp notification simulation toast if phone provided
    if (noHp && resi) {
      setWhatsAppAlert({
        isOpen: true,
        to: noHp,
        nomorResi: resi,
        pesan: `*KEMENAG MURA NOTIFIKASI PTSP*\nYth. Pemohon, update status permohonan Anda (${resi}): *${judul}*.\n\n${pesan}\n\nSilakan pantau berkala di: https://ptsp.kemenagmura.go.id/track/${resi}`,
        waktu: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
      });
    }
  };

  const dismissWhatsAppAlert = () => {
    setWhatsAppAlert(null);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, dibaca: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, dibaca: true })));
  };

  const unreadCount = notifications.filter(n => !n.dibaca).length;

  // Add Permohonan (Publik)
  const tambahPermohonan = (data: Partial<Permohonan>): string => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const nomorResi = `PTSP-MURA-2026-${randomNum}`;
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newPermohonan: Permohonan = {
      id: 'req-' + Date.now(),
      nomorResi,
      tanggalPengajuan: nowStr,
      layananId: data.layananId || 'lay-pendis-01',
      namaLayanan: data.namaLayanan || 'Layanan PTSP Kemenag Mura',
      seksi: data.seksi || 'pendis',
      pemohon: data.pemohon || {
        namaLengkap: 'Pemohon Baru',
        nik: '1605000000000000',
        noHpWhatsapp: '081200000000',
        email: 'pemohon@kemenagmura.go.id',
        alamat: 'Kabupaten Musi Rawas',
        kecamatan: 'Muara Beliti',
        kabupaten: 'Musi Rawas'
      },
      perihal: data.perihal || 'Permohonan Layanan PTSP',
      catatanPemohon: data.catatanPemohon || '',
      dokumenList: data.dokumenList || [],
      status: 'diajukan',
      history: [
        {
          id: 'h-' + Date.now(),
          status: 'diajukan',
          judul: 'Permohonan Didaftarkan Online',
          keterangan: 'Berkas permohonan berhasil didaftarkan ke sistem PTSP Online Kemenag Mura.',
          aktor: data.pemohon?.namaLengkap || 'Pemohon',
          role: 'pemohon',
          waktu: nowStr
        }
      ],
      tteInfo: {
        isSigned: false,
        namaPenandatangan: 'Dr. H. Hermadi, S.Ag., M.Si',
        nip: '197004121996031001',
        jabatan: 'Kepala Kantor Kementerian Agama Kab. Musi Rawas',
        tanggalTTE: '',
        nomorDokumen: '',
        sertifikatOtoritas: 'Balai Sertifikasi Elektronik (BSrE) - BSSN',
        hashDokumen: '',
        qrCodeVerificationUrl: ''
      }
    };

    setPermohonanList(prev => [newPermohonan, ...prev]);

    triggerRealTimeNotification(
      'Permohonan Baru Diterima',
      `Permohonan baru ${nomorResi} (${newPermohonan.namaLayanan}) telah masuk ke antrean Operator PTSP.`,
      'info',
      nomorResi,
      newPermohonan.pemohon.noHpWhatsapp
    );

    return nomorResi;
  };

  // Operator verification action
  const operatorValidasiBerkas = (
    nomorResi: string,
    status: 'disposisi_seksi' | 'perlu_revisi' | 'ditolak',
    catatan: string,
    dokumenListUpdated: DokumenPersyaratan[]
  ) => {
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    let judulHistory = '';
    let keteranganHistory = '';

    if (status === 'disposisi_seksi') {
      judulHistory = 'Verifikasi Operator Selesai & Disposisi';
      keteranganHistory = `Berkas dinyatakan lengkap dan absah oleh Operator PTSP. Diteruskan ke seksi teknis terkait.`;
    } else if (status === 'perlu_revisi') {
      judulHistory = 'Perbaikan Berkas / Revisi';
      keteranganHistory = `Operator PTSP meminta pemohon melengkapi/memperbaiki berkas: ${catatan}`;
    } else {
      judulHistory = 'Permohonan Ditolak';
      keteranganHistory = `Permohonan ditolak oleh Operator PTSP: ${catatan}`;
    }

    setPermohonanList(prev => prev.map(item => {
      if (item.nomorResi !== nomorResi) return item;
      return {
        ...item,
        status,
        catatanOperator: catatan,
        dokumenList: dokumenListUpdated,
        history: [
          ...item.history,
          {
            id: 'h-' + Date.now(),
            status,
            judul: judulHistory,
            keterangan: keteranganHistory,
            aktor: 'Rahmat Hidayat, A.Md (Front Office PTSP)',
            role: 'operator_ptsp',
            waktu: nowStr,
            catatan
          }
        ]
      };
    }));

    const targetItem = permohonanList.find(p => p.nomorResi === nomorResi);
    triggerRealTimeNotification(
      status === 'disposisi_seksi' ? 'Berkas Divalidasi Operator' : (status === 'perlu_revisi' ? 'Permohonan Butuh Revisi' : 'Permohonan Ditolak'),
      `Permohonan ${nomorResi}: ${catatan || keteranganHistory}`,
      status === 'disposisi_seksi' ? 'sukses' : 'peringatan',
      nomorResi,
      targetItem?.pemohon.noHpWhatsapp
    );
  };

  // Seksi review action
  const seksiReviewPermohonan = (
    nomorResi: string,
    status: 'siap_tte' | 'perlu_revisi' | 'telaah_seksi',
    catatan: string,
    draftSurat?: Permohonan['isiDokumenKeluaran']
  ) => {
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    let judulHistory = '';
    let keteranganHistory = '';

    if (status === 'siap_tte') {
      judulHistory = 'Telaah Seksi Disetujui - Siap TTE';
      keteranganHistory = `Naskah surat resmi dan telaah teknis disetujui. Diteruskan ke Kepala Kantor untuk Tanda Tangan Elektronik (TTE BSrE).`;
    } else if (status === 'perlu_revisi') {
      judulHistory = 'Permintaan Revisi Teknis Seksi';
      keteranganHistory = `Tim teknis seksi meminta dokumen pelengkap: ${catatan}`;
    } else {
      judulHistory = 'Sedang Ditelaah Tim Seksi';
      keteranganHistory = catatan || 'Tim teknis seksi sedang melakukan verifikasi dan telaah berkas.';
    }

    setPermohonanList(prev => prev.map(item => {
      if (item.nomorResi !== nomorResi) return item;
      return {
        ...item,
        status,
        catatanSeksi: catatan,
        isiDokumenKeluaran: draftSurat || item.isiDokumenKeluaran,
        history: [
          ...item.history,
          {
            id: 'h-' + Date.now(),
            status,
            judul: judulHistory,
            keterangan: keteranganHistory,
            aktor: 'Kepala Seksi / Penyelenggara',
            role: (currentRole.startsWith('kasi_') || currentRole.startsWith('penyelenggara_') || currentRole.startsWith('kasubbag_')) ? currentRole : 'kasi_pendis',
            waktu: nowStr,
            catatan
          }
        ]
      };
    }));

    const targetItem = permohonanList.find(p => p.nomorResi === nomorResi);
    triggerRealTimeNotification(
      status === 'siap_tte' ? 'Dokumen Masuk Antrean TTE' : 'Update Progres Seksi',
      `Permohonan ${nomorResi}: ${keteranganHistory}`,
      status === 'siap_tte' ? 'sukses' : 'info',
      nomorResi,
      targetItem?.pemohon.noHpWhatsapp
    );
  };

  // Head of Office signs with Electronic Signature (BSrE)
  const eksekusiTTE = (
    nomorResi: string,
    passphrase: string,
    signerName: string,
    nip: string,
    jabatan: string
  ): boolean => {
    // Valid passphrase simulation (any passphrase of 4+ characters)
    if (!passphrase || passphrase.trim().length < 4) {
      return false;
    }

    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const dateFormatted = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('id-ID') + ' WIB';
    
    // Generate simulated SHA-256 hash
    const fakeHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const qrVerificationUrl = `https://ptsp.kemenagmura.go.id/tte/verify?hash=${fakeHash.substring(0, 32)}`;
    const nomorDokumenResmi = `B-${Math.floor(1400 + Math.random() * 500)}/Kk.06.05/PP.00/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;

    setPermohonanList(prev => prev.map(item => {
      if (item.nomorResi !== nomorResi) return item;

      const outputData = item.isiDokumenKeluaran || {
        judul: `SURAT REKOMENDASI / KETERANGAN RESMI`,
        nomorSurat: nomorDokumenResmi,
        konsideranMenimbang: [
          'Bahwa permohonan telah memenuhi kriteria dan persyaratan teknis yang ditetapkan.',
          'Bahwa berdasarkan hasil verifikasi berkas dan rekomendasi seksi teknis terkait dipandang perlu menerbitkan surat keterangan/rekomendasi.'
        ],
        konsideranMengingat: [
          'Undang-Undang Nomor 20 Tahun 2003 tentang Sistem Pendidikan Nasional / PMA terkait.',
          'Peraturan Menteri Agama Nomor 34 Tahun 2016 tentang Organisasi dan Tata Kerja Kantor Kementerian Agama.'
        ],
        diktumKeputusan: [
          `MEMBERIKAN REKOMENDASI / KETERANGAN kepada ${item.pemohon.namaLengkap} (${item.pemohon.instansiOrLembaga || 'Pemohon'}) untuk perihal: ${item.perihal}.`,
          'Surat ini diterbitkan secara sah melalui sistem Pelayanan Terpadu Satu Pintu (PTSP) Kemenag Kab. Musi Rawas.'
        ],
        tembusan: [
          'Kepala Bagian Tata Usaha Kantor Kementerian Agama Kab. Musi Rawas',
          'Arsip PTSP'
        ],
        peruntukan: item.pemohon.instansiOrLembaga || item.pemohon.namaLengkap
      };

      return {
        ...item,
        status: 'selesai_tte',
        isiDokumenKeluaran: {
          ...outputData,
          nomorSurat: outputData.nomorSurat || nomorDokumenResmi
        },
        tteInfo: {
          isSigned: true,
          namaPenandatangan: signerName || 'Dr. H. Hermadi, S.Ag., M.Si',
          nip: nip || '197004121996031001',
          jabatan: jabatan || 'Kepala Kantor Kementerian Agama Kab. Musi Rawas',
          tanggalTTE: dateFormatted,
          nomorDokumen: outputData.nomorSurat || nomorDokumenResmi,
          sertifikatOtoritas: 'Balai Sertifikasi Elektronik (BSrE) - Badan Siber dan Sandi Negara (BSSN)',
          hashDokumen: fakeHash,
          qrCodeVerificationUrl: qrVerificationUrl,
          passphraseVerified: true
        },
        history: [
          ...item.history,
          {
            id: 'h-' + Date.now(),
            status: 'selesai_tte',
            judul: 'Tanda Tangan Elektronik (TTE) BSrE Sah',
            keterangan: `Dokumen dinas resmi berhasil ditandatangani secara digital oleh ${signerName} dengan sertifikat elektronik BSrE BSSN. Dokumen resmi siap diunduh oleh pemohon.`,
            aktor: signerName,
            role: 'kepala_kantor',
            waktu: nowStr
          }
        ]
      };
    }));

    // Play triumphant TTE celebration sound
    soundService.playSuccessTTE();

    // Trigger visual confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore
    }

    const targetItem = permohonanList.find(p => p.nomorResi === nomorResi);
    triggerRealTimeNotification(
      'TTE Dokumen Selesai!',
      `Dokumen permohonan ${nomorResi} telah resmi ditandatangani secara elektronik (BSrE BSSN) dan siap diunduh!`,
      'tte',
      nomorResi,
      targetItem?.pemohon.noHpWhatsapp
    );

    return true;
  };

  return (
    <PTSPContext.Provider
      value={{
        permohonanList,
        currentRole,
        setCurrentRole,
        activeView,
        setActiveView,
        selectedSeksiTab,
        setSelectedSeksiTab,
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        soundEnabled,
        toggleSound,
        selectedTrackingResi,
        setSelectedTrackingResi,
        daftarAkun,
        tambahAkun,
        editAkun,
        hapusAkun,
        toggleStatusAkun,
        daftarBerita,
        tambahBerita,
        editBerita,
        hapusBerita,
        katalogLayanan,
        tambahLayanan,
        editLayanan,
        hapusLayanan,
        dataKepalaKantor,
        tambahKepalaKantor,
        editKepalaKantor,
        hapusKepalaKantor,
        daftarMenuAplikasi,
        tambahMenuAplikasi,
        editMenuAplikasi,
        hapusMenuAplikasi,
        pengaturanWeb,
        updatePengaturanWeb,
        tambahPermohonan,
        operatorValidasiBerkas,
        seksiReviewPermohonan,
        eksekusiTTE,
        whatsAppAlert,
        dismissWhatsAppAlert,
        selectedPermohonanForDetail,
        setSelectedPermohonanForDetail,
        showTTEModalForResi,
        setShowTTEModalForResi
      }}
    >
      {children}
    </PTSPContext.Provider>
  );
};

export const usePTSP = () => {
  const context = useContext(PTSPContext);
  if (!context) {
    throw new Error('usePTSP must be used within a PTSPProvider');
  }
  return context;
};
