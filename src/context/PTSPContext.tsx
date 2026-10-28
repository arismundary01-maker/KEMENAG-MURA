import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Permohonan, 
  UserRole, 
  SeksiType, 
  NotifikasiItem, 
  StatusPermohonan, 
  DokumenPersyaratan 
} from '../types/ptsp';
import { INITIAL_PERMOHONAN } from '../data/initialData';
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
  activeView: 'public_portal' | 'operator_portal' | 'seksi_dashboard' | 'kakan_tte' | 'tracking_view' | 'tte_verifier';
  setActiveView: (view: 'public_portal' | 'operator_portal' | 'seksi_dashboard' | 'kakan_tte' | 'tracking_view' | 'tte_verifier') => void;
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

  const [currentRole, setCurrentRole] = useState<UserRole>('pemohon');
  const [activeView, setActiveView] = useState<'public_portal' | 'operator_portal' | 'seksi_dashboard' | 'kakan_tte' | 'tracking_view' | 'tte_verifier'>('public_portal');
  const [selectedSeksiTab, setSelectedSeksiTab] = useState<SeksiType>('pendis');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [selectedTrackingResi, setSelectedTrackingResi] = useState<string | null>(null);
  const [selectedPermohonanForDetail, setSelectedPermohonanForDetail] = useState<Permohonan | null>(null);
  const [showTTEModalForResi, setShowTTEModalForResi] = useState<string | null>(null);
  const [whatsAppAlert, setWhatsAppAlert] = useState<WhatsAppSimulasi | null>(null);

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
