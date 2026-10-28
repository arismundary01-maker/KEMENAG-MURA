export type SeksiType = 
  | 'pendis' 
  | 'bimas_islam' 
  | 'bimas_kristen' 
  | 'bimas_hindu' 
  | 'kepegawaian';

export type StatusPermohonan = 
  | 'diajukan'           // Baru diajukan pemohon
  | 'verifikasi_operator' // Sedang diverifikasi Front Office PTSP
  | 'perlu_revisi'       // Dikembalikan oleh operator/seksi untuk perbaikan dokumen
  | 'disposisi_seksi'    // Lolos verifikasi berkas, diteruskan ke seksi teknis
  | 'telaah_seksi'       // Sedang ditelaah/diproses tim teknis seksi
  | 'siap_tte'           // Dokumen final siap ditandatangani Kepala Kantor
  | 'selesai_tte'        // Dokumen telah di-TTE resmi dan siap diunduh
  | 'ditolak';           // Ditolak dengan alasan resmi

export type UserRole = 
  | 'super_admin'
  | 'pemohon' 
  | 'operator_ptsp' 
  | 'kasi_pendis' 
  | 'kasi_bimas_islam' 
  | 'penyelenggara_kristen' 
  | 'penyelenggara_hindu' 
  | 'kasubbag_kepegawaian' 
  | 'kepala_kantor';

export interface DokumenPersyaratan {
  id: string;
  nama: string;
  wajib: boolean;
  status: 'belum_unggah' | 'unggah' | 'valid' | 'tidak_valid';
  catatan?: string;
  namaFile?: string;
  ukuranFile?: string;
}

export interface LayananKatalog {
  id: string;
  kode: string;
  seksi: SeksiType;
  namaLayanan: string;
  deskripsi: string;
  estimasiHari: number;
  biaya: number; // 0 = Gratis (standar Kemenag)
  dasarHukum: string;
  outputDokumen: string;
  dokumenSyarat: string[];
  portalResmiUrl?: string;
  namaPortalResmi?: string;
  keteranganPortal?: string;
  kategoriLembaga?: 'madrasah' | 'pontren' | 'lpq_mdt';
}

export interface HistoryStatus {
  id: string;
  status: StatusPermohonan;
  judul: string;
  keterangan: string;
  aktor: string;
  role: UserRole;
  waktu: string;
  catatan?: string;
}

export interface TTEInfo {
  isSigned: boolean;
  namaPenandatangan: string;
  nip: string;
  jabatan: string;
  tanggalTTE: string;
  nomorDokumen: string;
  sertifikatOtoritas: string; // e.g. "Balai Sertifikasi Elektronik (BSrE) - BSSN"
  hashDokumen: string;
  qrCodeVerificationUrl: string;
  passphraseVerified?: boolean;
}

export interface Permohonan {
  id: string;
  nomorResi: string; // e.g. PTSP-MURA-2026-0042
  tanggalPengajuan: string;
  layananId: string;
  namaLayanan: string;
  seksi: SeksiType;
  
  // Data Pemohon
  pemohon: {
    namaLengkap: string;
    nik: string;
    noHpWhatsapp: string;
    email: string;
    instansiOrLembaga?: string;
    alamat: string;
    kecamatan: string;
    kabupaten: string;
  };

  // Keterangan & Berkas
  perihal: string;
  catatanPemohon?: string;
  dokumenList: DokumenPersyaratan[];
  
  // Workflow Status
  status: StatusPermohonan;
  history: HistoryStatus[];
  catatanOperator?: string;
  catatanSeksi?: string;
  alasanPenolakan?: string;

  // Output Dokumen Resmi & TTE
  tteInfo: TTEInfo;
  isiDokumenKeluaran?: {
    judul: string;
    nomorSurat: string;
    konsideranMenimbang: string[];
    konsideranMengingat: string[];
    diktumKeputusan: string[];
    tembusan: string[];
    peruntukan: string;
  };
}

export interface NotifikasiItem {
  id: string;
  judul: string;
  pesan: string;
  waktu: string;
  tipe: 'info' | 'sukses' | 'peringatan' | 'tte';
  dibaca: boolean;
  resiPermohonan?: string;
  targetRole?: UserRole | 'semua';
}

export interface AplikasiIntegrasi {
  id: string;
  kode: string;
  nama: string;
  singkatan: string;
  deskripsi: string;
  pengembang: string;
  urlSimulasi: string;
  seksi: SeksiType;
  statusKoneksi: 'Terkoneksi' | 'Sinkronisasi' | 'Optimal';
  terakhirSinkron: string;
  ikon: string;
  fiturUtama: string[];
}

export interface MenuAplikasiWeb {
  id: string;
  namaAplikasi: string;
  singkatan?: string;
  kategori: 'portal_utama' | 'pendis' | 'bimas_islam' | 'bimas_kristen' | 'bimas_hindu' | 'kepegawaian' | 'layanan_nasional' | string;
  deskripsi: string;
  url: string;
  badgeText?: string;
  warnaTema?: 'emerald' | 'blue' | 'teal' | 'indigo' | 'amber' | 'purple' | 'rose' | string;
  ikon?: string;
  statusAktif: boolean;
  bukaTabBaru?: boolean;
  urutan?: number;
}

export interface KepalaKantorHistory {
  id: string;
  urutan: number;
  nama: string;
  gelar: string;
  periode: string;
  tahunMulai: number;
  tahunSelesai: number | 'Sekarang';
  status: 'Purna Bakti' | 'Menjabat (Aktif)';
  prestasi: string;
  fotoUrl: string;
  nip?: string;
}

export interface BeritaItem {
  id: string;
  judul: string;
  ringkasan: string;
  kategori: 'PTSP & Layanan' | 'Pendidikan' | 'Bimas Islam' | 'Kerukunan Umat' | 'Kepegawaian';
  tanggal: string;
  penulis: string;
  dibaca: number;
  gambarUrl: string;
  isiLengkap: string;
}

export interface AkunPengguna {
  id: string;
  username: string;
  namaLengkap: string;
  role: UserRole;
  seksi?: SeksiType;
  jabatan: string;
  nip?: string;
  avatar: string;
  badgeLabel: string;
  badgeColor: string;
  deskripsiTugas: string;
  email?: string;
  telepon?: string;
  statusAktif?: boolean;
  lastLogin?: string;
}

export interface PengaturanWeb {
  namaKantor: string;
  singkatanKantor: string;
  kabupaten: string;
  provinsi: string;
  slogan: string;
  alamatLengkap: string;
  telepon: string;
  email: string;
  website: string;
  teksPengumuman: string;
  statusPengumuman: boolean;
  tteOtoritas: string;
  tteStatusAktif: boolean;
  warnaTema: string;
}
