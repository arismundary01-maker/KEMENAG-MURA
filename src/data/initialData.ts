import { LayananKatalog, Permohonan, AplikasiIntegrasi, SeksiType } from '../types/ptsp';

export const SEKSI_CONFIG: Record<SeksiType, { nama: string; singkatan: string; kepala: string; nip: string; deskripsi: string; warna: string }> = {
  pendis: {
    nama: 'Seksi Pendidikan Islam',
    singkatan: 'Pendis',
    kepala: 'Drs. H. Ahmad Fauzi, M.Pd.I',
    nip: '197405122000031002',
    deskripsi: 'Pelayanan administrasi Madrasah (RA, MI, MTs, MA), Pondok Pesantren, MDT, LPQ, dan Pendidik PAI.',
    warna: 'emerald'
  },
  bimas_islam: {
    nama: 'Seksi Bimbingan Masyarakat Islam',
    singkatan: 'Bimas Islam',
    kepala: 'H. Muhammad Ridwan, S.Ag., M.H',
    nip: '197608142003121001',
    deskripsi: 'Pelayanan kemasjidan, hisab rukyat/kiblat, tanah wakaf, majelis taklim, dan koordinasi KUA.',
    warna: 'teal'
  },
  bimas_kristen: {
    nama: 'Penyelenggara Bimbingan Masyarakat Kristen',
    singkatan: 'Bimas Kristen',
    kepala: 'Marnix S. Pandiangan, S.Th., M.Pd.K',
    nip: '198103252008011014',
    deskripsi: 'Pelayanan pendaftaran rumah ibadah Kristen, rekomendasi rohaniwan, dan pembinaan guru agama.',
    warna: 'blue'
  },
  bimas_hindu: {
    nama: 'Penyelenggara Bimbingan Masyarakat Hindu',
    singkatan: 'Bimas Hindu',
    kepala: 'I Wayan Sudiarta, S.Ag',
    nip: '198307182009121003',
    deskripsi: 'Pelayanan tanda daftar pura, pembinaan pasraman, rohaniwan Pinandita, dan peribadatan umat Hindu.',
    warna: 'amber'
  },
  kepegawaian: {
    nama: 'Subbagian Tata Usaha - Urusan Kepegawaian',
    singkatan: 'Kepegawaian',
    kepala: 'H. Sarifuddin, S.E., M.Si',
    nip: '197211051998031004',
    deskripsi: 'Pelayanan administrasi ASN, kenaikan pangkat, cuti, kenaikan gaji berkala, dan mutasi.',
    warna: 'indigo'
  }
};

export const KATALOG_LAYANAN: LayananKatalog[] = [
  // PENDIS
  {
    id: 'lay-pendis-01',
    kode: 'PND-01',
    seksi: 'pendis',
    namaLayanan: 'Rekomendasi Izin Operasional Pendirian Madrasah',
    deskripsi: 'Penerbitan surat rekomendasi teknis pendirian Madrasah baru (RA, MI, MTs, MA) di wilayah Kabupaten Musi Rawas.',
    estimasiHari: 3,
    biaya: 0,
    dasarHukum: 'PMA Nomor 90 Tahun 2013 & KMA Nomor 1385 Tahun 2020',
    outputDokumen: 'Surat Rekomendasi Izin Operasional Madrasah',
    dokumenSyarat: [
      'Surat Permohonan dari Yayasan/Lembaga bermaterai 10.000',
      'Akta Notaris Yayasan dan SK Kemenkumham',
      'Proposal Studi Kelayakan Pendirian Madrasah',
      'Bukti Kepemilikan Lahan/Tanah (Sertifikat/Wakaf)',
      'Data Calon Tenaga Pendidik dan Kependidikan'
    ]
  },
  {
    id: 'lay-pendis-02',
    kode: 'PND-02',
    seksi: 'pendis',
    namaLayanan: 'Rekomendasi Izin Operasional Pondok Pesantren / LPQ',
    deskripsi: 'Rekomendasi penetapan tanda daftar atau izin operasional baru bagi Pondok Pesantren, MDT, atau LPQ.',
    estimasiHari: 3,
    biaya: 0,
    dasarHukum: 'PMA Nomor 30 Tahun 2020 tentang Pendirian dan Penyelenggaraan Pesantren',
    outputDokumen: 'Surat Rekomendasi Tanda Daftar Pesantren/LPQ',
    dokumenSyarat: [
      'Surat Permohonan Pimpinan Lembaga/Kiai',
      'Susunan Pengurus Lembaga & Riwayat Hidup Kyai/Pimpinan',
      'Surat Keterangan Domisili dari Kantor Desa/Kelurahan',
      'Daftar Santri Mukim (minimal 15 santri) & Kurikulum Pembelajaran',
      'Foto Sarana Prasarana (Masjid/Mushalla, Asrama, Ruang Belajar)'
    ]
  },
  {
    id: 'lay-pendis-03',
    kode: 'PND-03',
    seksi: 'pendis',
    namaLayanan: 'Surat Keterangan Pengganti Ijazah Rusak / Hilang',
    deskripsi: 'Penerbitan surat keterangan pengganti ijazah madrasah yang hilang atau rusak bagi alumni madrasah.',
    estimasiHari: 1,
    biaya: 0,
    dasarHukum: 'Permendikbud No. 29 Tahun 2014 & Juknis Pendis Kemenag',
    outputDokumen: 'Surat Keterangan Pengganti Ijazah Ber-TTE',
    dokumenSyarat: [
      'Surat Tanda Penerimaan Laporan Kehilangan (STPLK) dari Kepolisian',
      'Surat Keterangan dari Kepala Madrasah Asal',
      'Fotokopi Ijazah yang hilang (bila ada) atau Buku Induk Siswa',
      'Fotokopi KTP / KK Pemohon',
      'Pas Foto 3x4 Hitam Putih 2 Lembar'
    ]
  },
  {
    id: 'lay-pendis-04',
    kode: 'PND-04',
    seksi: 'pendis',
    namaLayanan: 'Rekomendasi Mutasi Siswa Madrasah Antar Provinsi/Kabupaten',
    deskripsi: 'Surat rekomendasi izin pindah sekolah/madrasah lintas wilayah.',
    estimasiHari: 1,
    biaya: 0,
    dasarHukum: 'Keputusan Dirjen Pendis Kemenag RI tentang Tata Kelola Mutasi Peserta Didik',
    outputDokumen: 'Surat Rekomendasi Mutasi Siswa',
    dokumenSyarat: [
      'Surat Permohonan Orang Tua/Wali Murid',
      'Surat Keterangan Pindah dari Madrasah Asal (Validasi EMIS)',
      'Surat Keterangan Siap Menerima dari Madrasah Tujuan',
      'Fotokopi Rapor Terakhir & Kartu Keluarga'
    ]
  },

  // BIMAS ISLAM
  {
    id: 'lay-bimas-01',
    kode: 'BIM-01',
    seksi: 'bimas_islam',
    namaLayanan: 'Surat Rekomendasi Pendaftaran Majelis Taklim',
    deskripsi: 'Penerbitan surat rekomendasi tanda daftar operasional Majelis Taklim.',
    estimasiHari: 2,
    biaya: 0,
    dasarHukum: 'PMA Nomor 29 Tahun 2019 tentang Majelis Taklim',
    outputDokumen: 'Surat Keterangan Terdaftar (SKT) Majelis Taklim',
    dokumenSyarat: [
      'Surat Permohonan Pimpinan Majelis Taklim',
      'Susunan Pengurus Majelis Taklim',
      'Surat Keterangan Domisili dari Desa/Lurah setempat',
      'Daftar Anggota / Jamaah Majelis Taklim (minimal 15 orang)',
      'Jadwal dan Materi Kajian Rutin'
    ]
  },
  {
    id: 'lay-bimas-02',
    kode: 'BIM-02',
    seksi: 'bimas_islam',
    namaLayanan: 'Surat Rekomendasi Bantuan Rumah Ibadah (Masjid / Mushalla)',
    deskripsi: 'Penerbitan surat rekomendasi teknis untuk pengajuan proposal bantuan renovasi/pembangunan rumah ibadah.',
    estimasiHari: 2,
    biaya: 0,
    dasarHukum: 'Keputusan Menteri Agama tentang Bantuan Tempat Ibadah & PMA Tata Kelola Rumah Ibadah',
    outputDokumen: 'Surat Rekomendasi Permohonan Bantuan Masjid/Mushalla',
    dokumenSyarat: [
      'Surat Permohonan Pengurus BKM / Panitia Pembangunan',
      'Nomor Identitas Masjid (ID SIMAS Kemenag)',
      'Proposal Rencana Anggaran Biaya (RAB) dan Foto Kondisi Fisik',
      'Rekomendasi dari KUA Kecamatan setempat',
      'Surat Status Tanah / Akta Ikrar Wakaf'
    ]
  },
  {
    id: 'lay-bimas-03',
    kode: 'BIM-03',
    seksi: 'bimas_islam',
    namaLayanan: 'Konsultasi Syariah & Pengukuran Akurasi Arah Kiblat',
    deskripsi: 'Permohonan kalibrasi dan penetapan arah kiblat masjid/mushalla oleh Badan Hisab Rukyat Kemenag Mura.',
    estimasiHari: 2,
    biaya: 0,
    dasarHukum: 'Instruksi Menag tentang Akurasi Arah Kiblat Bangunan Ibadah',
    outputDokumen: 'Berita Acara & Sertifikat Arah Kiblat Resmi',
    dokumenSyarat: [
      'Surat Permohonan dari Pengurus BKM / Takmir Masjid',
      'Titik Koordinat GPS / Alamat Lengkap Lokasi',
      'Surat Pengantar dari Kepala KUA Kecamatan setempat'
    ]
  },
  {
    id: 'lay-bimas-04',
    kode: 'BIM-04',
    seksi: 'bimas_islam',
    namaLayanan: 'Pendaftaran dan Konsultasi Tanah Wakaf (AIW / APAIW)',
    deskripsi: 'Verifikasi berkas Akta Ikrar Wakaf dan rekomendasi pencatatan SIWAK.',
    estimasiHari: 2,
    biaya: 0,
    dasarHukum: 'UU No. 41 Tahun 2004 tentang Wakaf & PP No. 42 Tahun 2006',
    outputDokumen: 'Surat Rekomendasi Verifikasi Tanah Wakaf',
    dokumenSyarat: [
      'Salinan Akta Ikrar Wakaf (AIW) dari PPAIW / KUA',
      'Surat Bukti Kepemilikan Hak Atas Tanah (SHM / Girik)',
      'Susunan Nadzir yang disahkan BWI',
      'Surat Pernyataan Tidak dalam Sengketa'
    ]
  },

  // BIMAS KRISTEN
  {
    id: 'lay-kristen-01',
    kode: 'KRS-01',
    seksi: 'bimas_kristen',
    namaLayanan: 'Surat Rekomendasi Tanda Daftar Rumah Ibadat / Gereja',
    deskripsi: 'Penerbitan surat rekomendasi pencatatan dan tanda daftar rumah ibadat gereja di Kab. Musi Rawas.',
    estimasiHari: 3,
    biaya: 0,
    dasarHukum: 'PBM Menag dan Mendagri No. 9 dan 8 Tahun 2006',
    outputDokumen: 'Surat Rekomendasi Tanda Daftar Gereja',
    dokumenSyarat: [
      'Surat Permohonan dari Pimpinan Sinode / Majelis Gereja',
      'Daftar Nama & KTP Jemaat Pengguna Rumah Ibadat (Minimal 90 orang disahkan Kades/Lurah)',
      'Surat Dukungan Masyarakat Setempat (Minimal 60 orang disahkan Kades/Lurah)',
      'Rekomendasi Tertulis dari Forum Kerukunan Umat Beragama (FKUB) Kab. Musi Rawas',
      'Bukti Kepemilikan atau Hak Guna Tanah/Bangunan'
    ]
  },
  {
    id: 'lay-kristen-02',
    kode: 'KRS-02',
    seksi: 'bimas_kristen',
    namaLayanan: 'Surat Keterangan Pelayanan Rohaniwan / Pendeta',
    deskripsi: 'Penerbitan surat keterangan pelayanan keagamaan untuk pendeta/pelayan gereja di Kab. Musi Rawas.',
    estimasiHari: 1,
    biaya: 0,
    dasarHukum: 'Keputusan Dirjen Bimas Kristen Kemenag RI',
    outputDokumen: 'Surat Keterangan Rohaniwan Kristen Ber-TTE',
    dokumenSyarat: [
      'Surat Permohonan dari Pimpinan Jemaat / Sinode',
      'Surat Keputusan (SK) Pengangkatan / Penahbisan Pendeta',
      'Fotokopi KTP & Ijazah Teologi Terakhir',
      'Surat Keterangan Domisili dari Desa/Kelurahan'
    ]
  },
  {
    id: 'lay-kristen-03',
    kode: 'KRS-03',
    seksi: 'bimas_kristen',
    namaLayanan: 'Rekomendasi Paspor Rohaniwan / Ziarah Keagamaan Kristen',
    deskripsi: 'Surat rekomendasi untuk pengurusan paspor ziarah rohani bagi pemuka agama Kristen.',
    estimasiHari: 1,
    biaya: 0,
    dasarHukum: 'Surat Edaran Dirjen Imigrasi & Ditjen Bimas Kristen',
    outputDokumen: 'Surat Rekomendasi Paspor Ziarah Rohani',
    dokumenSyarat: [
      'Surat Permohonan Pribadi & Rekomendasi Sinode Gereja',
      'Fotokopi KTP dan Kartu Keluarga',
      'Bukti Pendaftaran / Undangan Resmi Lembaga Ziarah'
    ]
  },

  // BIMAS HINDU
  {
    id: 'lay-hindu-01',
    kode: 'HND-01',
    seksi: 'bimas_hindu',
    namaLayanan: 'Surat Keterangan Tanda Daftar Rumah Ibadah Pura',
    deskripsi: 'Penerbitan surat keterangan tanda daftar dan penetapan status Pura bagi umat Hindu Kab. Musi Rawas.',
    estimasiHari: 3,
    biaya: 0,
    dasarHukum: 'PBM No. 9 dan 8 Tahun 2006 & Juknis Ditjen Bimas Hindu',
    outputDokumen: 'Surat Tanda Daftar Rumah Ibadah Pura Ber-TTE',
    dokumenSyarat: [
      'Surat Permohonan dari Pengurus Pengempon Pura / PHDI Setempat',
      'Daftar Umat / Krama Pura Pengguna Rumah Ibadah',
      'Rekomendasi dari Parisada Hindu Dharma Indonesia (PHDI) Kab. Musi Rawas',
      'Surat Status Tanah (Sertifikat Hak Milik/Hibah/Wakaf Hindu)',
      'Dokumentasi Foto Pura (Mandala, Pelinggih, Candi Bentar)'
    ]
  },
  {
    id: 'lay-hindu-02',
    kode: 'HND-02',
    seksi: 'bimas_hindu',
    namaLayanan: 'Rekomendasi Pendirian & Bantuan Pasraman Hindu',
    deskripsi: 'Penerbitan surat rekomendasi izin operasional lembaga pendidikan keagamaan Hindu Pasraman nonformal/formal.',
    estimasiHari: 2,
    biaya: 0,
    dasarHukum: 'PMA No. 56 Tahun 2014 tentang Pendidikan Keagamaan Hindu',
    outputDokumen: 'Surat Rekomendasi Izin Operasional Pasraman',
    dokumenSyarat: [
      'Proposal Pendirian Pasraman dari Yayasan / PHDI',
      'Struktur Pengelola Pasraman & Riwayat Hidup Guru / Acarya',
      'Daftar Siswa / Brahmacari (Minimal 10 anak)',
      'Kurikulum Pembelajaran Pasraman'
    ]
  },
  {
    id: 'lay-hindu-03',
    kode: 'HND-03',
    seksi: 'bimas_hindu',
    namaLayanan: 'Surat Keterangan Rohaniwan Hindu (Pinandita / Pemangku)',
    deskripsi: 'Pencatatan dan penerbitan surat keterangan pelayanan bagi Pemangku/Pinandita umat Hindu.',
    estimasiHari: 1,
    biaya: 0,
    dasarHukum: 'Juklak Bimas Hindu Kemenag RI',
    outputDokumen: 'Surat Keterangan Rohaniwan Hindu Ber-TTE',
    dokumenSyarat: [
      'Surat Rekomendasi dari PHDI Kab. Musi Rawas',
      'Surat Keputusan Widhi Widhana / Pensucian Pemangku',
      'Fotokopi KTP & KK Rohaniwan'
    ]
  },

  // KEPEGAWAIAN
  {
    id: 'lay-peg-01',
    kode: 'KPG-01',
    seksi: 'kepegawaian',
    namaLayanan: 'Permohonan Cuti ASN (Tahunan, Besar, Bersalin, Sakit, Alasan Penting)',
    deskripsi: 'Pelayanan persetujuan cuti dinas ASN di lingkungan Kantor Kemenag Kabupaten Musi Rawas.',
    estimasiHari: 1,
    biaya: 0,
    dasarHukum: 'Peraturan BKN No. 24 Tahun 2017 & Perka BKN No. 7 Tahun 2021',
    outputDokumen: 'Surat Keputusan Pemberian Cuti Ber-TTE',
    dokumenSyarat: [
      'Formulir Pengajuan Cuti (Format Resmi BKN)',
      'Surat Rekomendasi / Pengantar dari Atasan Langsung',
      'Surat Keterangan Dokter (khusus cuti sakit/melahirkan)',
      'Catatan Riwayat Sisa Cuti Tahun Berjalan'
    ]
  },
  {
    id: 'lay-peg-02',
    kode: 'KPG-02',
    seksi: 'kepegawaian',
    namaLayanan: 'Pengusulan Kenaikan Pangkat (KP) Reguler & Fungsional',
    deskripsi: 'Verifikasi berkas usulan kenaikan pangkat ASN Kemenag Mura ke Kanwil / BKN via SIASN.',
    estimasiHari: 3,
    biaya: 0,
    dasarHukum: 'PP No. 11 Tahun 2017 tentang Manajemen PNS & Edaran BKN 6 Periode KP',
    outputDokumen: 'Surat Pengantar Usulan Kenaikan Pangkat Kanwil/BKN',
    dokumenSyarat: [
      'SK Pangkat Terakhir & SK CPNS/PNS',
      'Penilaian Kinerja Pegawai (SKP) 2 Tahun Terakhir Bernilai Minimal Baik',
      'PAK Asli (khusus jabatan fungsional guru/penghulu/penyuluh)',
      'Ijazah & Transkrip Terakhir yang telah dilegalisasi',
      'Surat Pernyataan Tidak Sedang Menjalani Hukuman Disiplin'
    ]
  },
  {
    id: 'lay-peg-03',
    kode: 'KPG-03',
    seksi: 'kepegawaian',
    namaLayanan: 'Penerbitan Surat Keterangan Masih Aktif Bekerja (SKMK)',
    deskripsi: 'Penerbitan surat keterangan masih aktif bekerja untuk keperluan perbankan, beasiswa, atau kedinasan.',
    estimasiHari: 1,
    biaya: 0,
    dasarHukum: 'Tata Naskah Dinas Kementerian Agama RI',
    outputDokumen: 'Surat Keterangan Aktif Melaksanakan Tugas Ber-TTE',
    dokumenSyarat: [
      'Surat Pengantar dari Kepala Madrasah / Kepala KUA / Atasan Langsung',
      'Fotokopi SK Pangkat / Jabatan Terakhir',
      'Fotokopi Kartu Pegawai (Karpeg) / KTP'
    ]
  },
  {
    id: 'lay-peg-04',
    kode: 'KPG-04',
    seksi: 'kepegawaian',
    namaLayanan: 'Permohonan Izin Penelitian / PKL / Magang Kampus',
    deskripsi: 'Pelayanan penerbitan surat izin penelitian skripsi/tesis atau magang bagi mahasiswa di lingkungan Kemenag Mura.',
    estimasiHari: 1,
    biaya: 0,
    dasarHukum: 'Tata Kelola Administrasi Kemenag',
    outputDokumen: 'Surat Keterangan Izin Penelitian / Rekomendasi Magang',
    dokumenSyarat: [
      'Surat Permohonan Resmi dari Dekan / Pimpinan Perguruan Tinggi',
      'Proposal Rencana Penelitian / Kerangka Magang',
      'Fotokopi KTM (Kartu Tanda Mahasiswa) & KTP'
    ]
  }
];

export const INITIAL_PERMOHONAN: Permohonan[] = [
  {
    id: 'req-001',
    nomorResi: 'PTSP-MURA-2026-0038',
    tanggalPengajuan: '2026-10-21 09:15',
    layananId: 'lay-pendis-01',
    namaLayanan: 'Rekomendasi Izin Operasional Pendirian Madrasah',
    seksi: 'pendis',
    pemohon: {
      namaLengkap: 'Drs. H. Mulyadi Saputra, M.Pd',
      nik: '1605011208720003',
      noHpWhatsapp: '081273849921',
      email: 'mulyadi.alfalah@gmail.com',
      instansiOrLembaga: 'Yayasan Pendidikan Islam Al-Falah Mandiri',
      alamat: 'Jl. Jenderal Sudirman No. 45, Desa Mataram',
      kecamatan: 'Tugumulyo',
      kabupaten: 'Musi Rawas'
    },
    perihal: 'Permohonan Rekomendasi Izin Operasional MTs Al-Falah Tugumulyo',
    catatanPemohon: 'Mohon dibantu verifikasi berkas izin operasional MTs Al-Falah untuk persiapan tahun ajaran baru.',
    dokumenList: [
      { id: 'd1', nama: 'Surat Permohonan dari Yayasan/Lembaga bermaterai 10.000', wajib: true, status: 'valid', namaFile: 'Surat_Permohonan_Yayasan_AlFalah.pdf', ukuranFile: '840 KB' },
      { id: 'd2', nama: 'Akta Notaris Yayasan dan SK Kemenkumham', wajib: true, status: 'valid', namaFile: 'Akta_Notaris_Kemenkumham.pdf', ukuranFile: '2.1 MB' },
      { id: 'd3', nama: 'Proposal Studi Kelayakan Pendirian Madrasah', wajib: true, status: 'valid', namaFile: 'Proposal_Kelayakan_MTs_AlFalah.pdf', ukuranFile: '4.8 MB' },
      { id: 'd4', nama: 'Bukti Kepemilikan Lahan/Tanah (Sertifikat/Wakaf)', wajib: true, status: 'valid', namaFile: 'Sertifikat_Wakaf_Tanah_1200m2.pdf', ukuranFile: '1.4 MB' },
      { id: 'd5', nama: 'Data Calon Tenaga Pendidik dan Kependidikan', wajib: true, status: 'valid', namaFile: 'Daftar_Guru_dan_Karyawan.pdf', ukuranFile: '620 KB' }
    ],
    status: 'selesai_tte',
    history: [
      { id: 'h1', status: 'diajukan', judul: 'Permohonan Didaftarkan', keterangan: 'Pemohon mendaftarkan permohonan melalui Portal Mandiri PTSP Online Kemenag Mura.', aktor: 'Drs. H. Mulyadi Saputra, M.Pd', role: 'pemohon', waktu: '2026-10-21 09:15' },
      { id: 'h2', status: 'verifikasi_operator', judul: 'Verifikasi Berkas Front Office', keterangan: 'Petugas loket memverifikasi 5 dokumen digital. Seluruh dokumen asli dan lengkap.', aktor: 'Rahmat Hidayat, A.Md (Operator PTSP)', role: 'operator_ptsp', waktu: '2026-10-21 10:30' },
      { id: 'h3', status: 'disposisi_seksi', judul: 'Disposisi ke Seksi Pendis', keterangan: 'Berkas dinyatakan lengkap dan diteruskan kepada Kepala Seksi Pendidikan Islam.', aktor: 'Rahmat Hidayat, A.Md', role: 'operator_ptsp', waktu: '2026-10-21 11:00' },
      { id: 'h4', status: 'telaah_seksi', judul: 'Telaah Teknis Seksi Pendis', keterangan: 'Seksi Pendis telah melaksanakan verifikasi lapangan dan menyusun naskah Surat Rekomendasi Resmi.', aktor: 'Drs. H. Ahmad Fauzi, M.Pd.I', role: 'kasi_pendis', waktu: '2026-10-22 09:00' },
      { id: 'h5', status: 'siap_tte', judul: 'Pengajuan Tanda Tangan Elektronik', keterangan: 'Konsep surat rekomendasi dikirim ke Kepala Kantor Kementerian Agama Kab. Musi Rawas untuk penandatanganan digital.', aktor: 'Drs. H. Ahmad Fauzi, M.Pd.I', role: 'kasi_pendis', waktu: '2026-10-22 14:15' },
      { id: 'h6', status: 'selesai_tte', judul: 'Tanda Tangan Elektronik (TTE) BSrE Berhasil', keterangan: 'Dokumen rekomendasi resmi telah ditandatangani secara elektronik oleh Kepala Kantor Kemenag Kab. Musi Rawas. Dokumen resmi siap diunduh.', aktor: 'Dr. H. Hermadi, S.Ag., M.Si (Kepala Kantor)', role: 'kepala_kantor', waktu: '2026-10-23 08:30' }
    ],
    catatanOperator: 'Dokumen persyaratan lengkap dan absah sesuai PMA No. 90/2013.',
    catatanSeksi: 'Hasil verifikasi faktual lapangan tim Seksi Pendis memenuhi syarat sarana dan guru.',
    tteInfo: {
      isSigned: true,
      namaPenandatangan: 'Dr. H. Hermadi, S.Ag., M.Si',
      nip: '197004121996031001',
      jabatan: 'Kepala Kantor Kementerian Agama Kab. Musi Rawas',
      tanggalTTE: '2026-10-23 08:30:14 WIB',
      nomorDokumen: 'B-1428/Kk.06.05.02/PP.00.7/10/2026',
      sertifikatOtoritas: 'Balai Sertifikasi Elektronik (BSrE) - Badan Siber dan Sandi Negara (BSSN)',
      hashDokumen: 'e4a938c12f085b3769c0d9a6f1a8e32c8b73e5f29910ab31e893cc218d6a8b79',
      qrCodeVerificationUrl: 'https://ptsp.kemenagmura.go.id/tte/verify?hash=e4a938c12f085b3769c0d9a6f1a8e32c',
      passphraseVerified: true
    },
    isiDokumenKeluaran: {
      judul: 'SURAT REKOMENDASI IZIN OPERASIONAL PENDIRIAN MADRASAH',
      nomorSurat: 'B-1428/Kk.06.05.02/PP.00.7/10/2026',
      konsideranMenimbang: [
        'Bahwa dalam rangka pemerataan dan peningkatan mutu akses pendidikan madrasah di Kabupaten Musi Rawas;',
        'Bahwa Yayasan Pendidikan Islam Al-Falah Mandiri telah memenuhi persyaratan administratif, teknis, dan kelayakan pendirian satuan pendidikan baru;'
      ],
      konsideranMengingat: [
        'Undang-Undang Nomor 20 Tahun 2003 tentang Sistem Pendidikan Nasional;',
        'Peraturan Menteri Agama Nomor 90 Tahun 2013 tentang Penyelenggaraan Pendidikan Madrasah;'
      ],
      diktumKeputusan: [
        'MEMBERIKAN REKOMENDASI TEKNIS kepada MTs Al-Falah Tugumulyo yang beralamat di Desa Mataram, Kec. Tugumulyo, Kab. Musi Rawas untuk proses penetapan Izin Operasional Kanwil Kemenag.',
        'Pihak Yayasan wajib mematuhi seluruh kurikulum kementerian dan melaporkan data kelembagaan secara berkala melalui sistem EMIS 4.0.'
      ],
      tembusan: [
        'Kepala Kantor Wilayah Kementerian Agama Provinsi Sumatera Selatan',
        'Bupati Musi Rawas c.q. Kepala Dinas Pendidikan',
        'Ketua Yayasan Pendidikan Islam Al-Falah Mandiri'
      ],
      peruntukan: 'MTs Al-Falah Tugumulyo'
    }
  },
  {
    id: 'req-002',
    nomorResi: 'PTSP-MURA-2026-0042',
    tanggalPengajuan: '2026-10-22 10:20',
    layananId: 'lay-bimas-02',
    namaLayanan: 'Surat Rekomendasi Bantuan Rumah Ibadah (Masjid / Mushalla)',
    seksi: 'bimas_islam',
    pemohon: {
      namaLengkap: 'Ust. Bambang Irawan, S.Pd.I',
      nik: '1605031505800004',
      noHpWhatsapp: '085268491102',
      email: 'masjidnuruliman.ms@gmail.com',
      instansiOrLembaga: 'BKM Masjid Nurul Iman Megang Sakti',
      alamat: 'Jl. Poros Blok B, Kelurahan Megang Sakti I',
      kecamatan: 'Megang Sakti',
      kabupaten: 'Musi Rawas'
    },
    perihal: 'Permohonan Rekomendasi Bantuan Renovasi Kubah dan Tempat Wudhu Masjid',
    catatanPemohon: 'Masjid Nurul Iman telah memiliki ID SIMAS: 01.4.08.05.02.000142. Berkas proposal lengkap terlampir.',
    dokumenList: [
      { id: 'd1', nama: 'Surat Permohonan Pengurus BKM / Panitia Pembangunan', wajib: true, status: 'valid', namaFile: 'Surat_Permohonan_BKM_NurulIman.pdf', ukuranFile: '530 KB' },
      { id: 'd2', nama: 'Nomor Identitas Masjid (ID SIMAS Kemenag)', wajib: true, status: 'valid', namaFile: 'Kartu_Identitas_SIMAS_0140805.pdf', ukuranFile: '410 KB' },
      { id: 'd3', nama: 'Proposal Rencana Anggaran Biaya (RAB) dan Foto Kondisi Fisik', wajib: true, status: 'valid', namaFile: 'Proposal_RAB_Renovasi_Masjid.pdf', ukuranFile: '3.6 MB' },
      { id: 'd4', nama: 'Rekomendasi dari KUA Kecamatan setempat', wajib: true, status: 'valid', namaFile: 'Rekomendasi_KUA_Kec_MegangSakti.pdf', ukuranFile: '750 KB' },
      { id: 'd5', nama: 'Surat Status Tanah / Akta Ikrar Wakaf', wajib: true, status: 'valid', namaFile: 'Salinan_AIW_Wakaf_Masjid.pdf', ukuranFile: '1.2 MB' }
    ],
    status: 'siap_tte',
    history: [
      { id: 'h1', status: 'diajukan', judul: 'Permohonan Didaftarkan', keterangan: 'Pemohon mendaftarkan permohonan melalui sistem PTSP Online.', aktor: 'Ust. Bambang Irawan, S.Pd.I', role: 'pemohon', waktu: '2026-10-22 10:20' },
      { id: 'h2', status: 'verifikasi_operator', judul: 'Verifikasi Berkas Front Office', keterangan: 'Semua berkas dan ID SIMAS telah divalidasi oleh operator PTSP.', aktor: 'Siti Nurhaliza, S.Kom', role: 'operator_ptsp', waktu: '2026-10-22 11:45' },
      { id: 'h3', status: 'disposisi_seksi', judul: 'Disposisi ke Seksi Bimas Islam', keterangan: 'Diteruskan ke Seksi Bimas Islam untuk telaah proposal.', aktor: 'Siti Nurhaliza, S.Kom', role: 'operator_ptsp', waktu: '2026-10-22 13:10' },
      { id: 'h4', status: 'telaah_seksi', judul: 'Telaah Teknis & Penyusunan Draft', keterangan: 'Kasi Bimas Islam menyetujui rekomendasi bantuan senilai pagu teknis yang diajukan.', aktor: 'H. Muhammad Ridwan, S.Ag., M.H', role: 'kasi_bimas_islam', waktu: '2026-10-23 07:45' },
      { id: 'h5', status: 'siap_tte', judul: 'Menunggu Tanda Tangan Elektronik', keterangan: 'Draft surat rekomendasi resmi telah masuk antrean tanda tangan elektronik Kepala Kantor.', aktor: 'H. Muhammad Ridwan, S.Ag., M.H', role: 'kasi_bimas_islam', waktu: '2026-10-23 08:05' }
    ],
    catatanOperator: 'ID SIMAS valid dan terverifikasi di database Kementerian Agama.',
    catatanSeksi: 'Disetujui. Layak menerima bantuan renovasi sesuai kriteria bantuan rumah ibadah.',
    tteInfo: {
      isSigned: false,
      namaPenandatangan: 'Dr. H. Hermadi, S.Ag., M.Si',
      nip: '197004121996031001',
      jabatan: 'Kepala Kantor Kementerian Agama Kab. Musi Rawas',
      tanggalTTE: '',
      nomorDokumen: 'B-1431/Kk.06.05.06/BA.01.1/10/2026',
      sertifikatOtoritas: 'Balai Sertifikasi Elektronik (BSrE) - BSSN',
      hashDokumen: 'c9f8a10738d415b3901b87a2ec31f6749102cba39158fe7d0182746193746192',
      qrCodeVerificationUrl: '',
      passphraseVerified: false
    },
    isiDokumenKeluaran: {
      judul: 'SURAT REKOMENDASI BANTUAN RUMAH IBADAH',
      nomorSurat: 'B-1431/Kk.06.05.06/BA.01.1/10/2026',
      konsideranMenimbang: [
        'Bahwa Masjid Nurul Iman Megang Sakti merupakan pusat kegiatan ibadah dan keagamaan umat Islam yang aktif;',
        'Bahwa sarana tempat wudhu dan atap memerlukan perbaikan mendesak demi kenyamanan ibadah jemaah.'
      ],
      konsideranMengingat: [
        'Peraturan Menteri Agama Nomor 34 Tahun 2016 tentang Organisasi dan Tata Kerja Kementerian Agama;',
        'Petunjuk Teknis Penyaluran Bantuan Rumah Ibadat Kementerian Agama RI.'
      ],
      diktumKeputusan: [
        'Memberikan REKOMENDASI kepada Pengurus Masjid Nurul Iman Megang Sakti untuk mengajukan permohonan bantuan kepada instansi pemerintah maupun para donatur.',
        'Surat rekomendasi ini berlaku selama 6 (enam) bulan terhitung sejak tanggal diterbitkan.'
      ],
      tembusan: [
        'Kepala KUA Kecamatan Megang Sakti',
        'Pengurus BKM Masjid Nurul Iman'
      ],
      peruntukan: 'Masjid Nurul Iman Megang Sakti'
    }
  },
  {
    id: 'req-003',
    nomorResi: 'PTSP-MURA-2026-0045',
    tanggalPengajuan: '2026-10-22 13:40',
    layananId: 'lay-kristen-01',
    namaLayanan: 'Surat Rekomendasi Tanda Daftar Rumah Ibadat / Gereja',
    seksi: 'bimas_kristen',
    pemohon: {
      namaLengkap: 'Pdt. Yohanes Simanjuntak, S.Th',
      nik: '1605022103780002',
      noHpWhatsapp: '081367290033',
      email: 'yohanes.simanjuntak@gpdi.or.id',
      instansiOrLembaga: 'Majelis Jemaat GPdI Musi Rawas',
      alamat: 'Jl. Poros Simpang Beliti Indah',
      kecamatan: 'Muara Beliti',
      kabupaten: 'Musi Rawas'
    },
    perihal: 'Permohonan Rekomendasi Tanda Daftar Rumah Ibadat Gereja GPdI Beliti Indah',
    catatanPemohon: 'Kelengkapan surat persetujuan warga sekitar dan verifikasi FKUB terlampir.',
    dokumenList: [
      { id: 'd1', nama: 'Surat Permohonan dari Pimpinan Sinode / Majelis Gereja', wajib: true, status: 'valid', namaFile: 'Surat_Permohonan_Majelis_GPdI.pdf', ukuranFile: '780 KB' },
      { id: 'd2', nama: 'Daftar Nama & KTP Jemaat Pengguna Rumah Ibadat (Minimal 90 orang disahkan Kades/Lurah)', wajib: true, status: 'valid', namaFile: 'Daftar_94_KTP_Jemaat_Disahkan_Lurah.pdf', ukuranFile: '5.2 MB' },
      { id: 'd3', nama: 'Surat Dukungan Masyarakat Setempat (Minimal 60 orang disahkan Kades/Lurah)', wajib: true, status: 'valid', namaFile: 'Surat_Dukungan_68_Warga_Sekitar.pdf', ukuranFile: '3.1 MB' },
      { id: 'd4', nama: 'Rekomendasi Tertulis dari Forum Kerukunan Umat Beragama (FKUB) Kab. Musi Rawas', wajib: true, status: 'valid', namaFile: 'Surat_Rekomendasi_FKUB_Mura.pdf', ukuranFile: '920 KB' },
      { id: 'd5', nama: 'Bukti Kepemilikan atau Hak Guna Tanah/Bangunan', wajib: true, status: 'valid', namaFile: 'Sertifikat_SHM_Gereja.pdf', ukuranFile: '1.8 MB' }
    ],
    status: 'disposisi_seksi',
    history: [
      { id: 'h1', status: 'diajukan', judul: 'Permohonan Didaftarkan', keterangan: 'Berkas didaftarkan secara online.', aktor: 'Pdt. Yohanes Simanjuntak, S.Th', role: 'pemohon', waktu: '2026-10-22 13:40' },
      { id: 'h2', status: 'verifikasi_operator', judul: 'Pemeriksaan Berkas PTSP', keterangan: 'Berkas dicek kesesuaian dengan PBM No. 9 dan 8 Tahun 2006.', aktor: 'Rahmat Hidayat, A.Md', role: 'operator_ptsp', waktu: '2026-10-22 15:00' },
      { id: 'h3', status: 'disposisi_seksi', judul: 'Disposisi ke Penyelenggara Bimas Kristen', keterangan: 'Diteruskan ke Penyelenggara Bimas Kristen untuk verifikasi faktual lapangan.', aktor: 'Rahmat Hidayat, A.Md', role: 'operator_ptsp', waktu: '2026-10-22 15:30' }
    ],
    catatanOperator: 'Persyaratan 90 jemaat dan 60 warga setempat lengkap bertanda tangan Lurah.',
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
  },
  {
    id: 'req-004',
    nomorResi: 'PTSP-MURA-2026-0049',
    tanggalPengajuan: '2026-10-23 07:10',
    layananId: 'lay-hindu-01',
    namaLayanan: 'Surat Keterangan Tanda Daftar Rumah Ibadah Pura',
    seksi: 'bimas_hindu',
    pemohon: {
      namaLengkap: 'I Made Suardana, S.Pd.H',
      nik: '1605051809850001',
      noHpWhatsapp: '082188440912',
      email: 'madesuardana.mura@gmail.com',
      instansiOrLembaga: 'Pengempon Pura Penataran Agung Muara Beliti',
      alamat: 'Dusun III, Desa Pedang',
      kecamatan: 'Muara Beliti',
      kabupaten: 'Musi Rawas'
    },
    perihal: 'Permohonan Pembaharuan Tanda Daftar Pura Penataran Agung',
    catatanPemohon: 'Pembaruan sertifikat tanda daftar rumah ibadah Pura Penataran Agung.',
    dokumenList: [
      { id: 'd1', nama: 'Surat Permohonan dari Pengurus Pengempon Pura / PHDI Setempat', wajib: true, status: 'valid', namaFile: 'Permohonan_Pengempon_Pura.pdf', ukuranFile: '620 KB' },
      { id: 'd2', nama: 'Daftar Umat / Krama Pura Pengguna Rumah Ibadah', wajib: true, status: 'valid', namaFile: 'Data_Krama_Pura_42_KK.pdf', ukuranFile: '850 KB' },
      { id: 'd3', nama: 'Rekomendasi dari Parisada Hindu Dharma Indonesia (PHDI) Kab. Musi Rawas', wajib: true, status: 'valid', namaFile: 'Rekomendasi_PHDI_Mura_2026.pdf', ukuranFile: '490 KB' },
      { id: 'd4', nama: 'Surat Status Tanah (Sertifikat Hak Milik/Hibah/Wakaf Hindu)', wajib: true, status: 'valid', namaFile: 'Sertifikat_Tanah_Pura.pdf', ukuranFile: '1.6 MB' },
      { id: 'd5', nama: 'Dokumentasi Foto Pura (Mandala, Pelinggih, Candi Bentar)', wajib: true, status: 'valid', namaFile: 'Foto_Pura_Penataran_Agung.pdf', ukuranFile: '4.2 MB' }
    ],
    status: 'telaah_seksi',
    history: [
      { id: 'h1', status: 'diajukan', judul: 'Permohonan Didaftarkan', keterangan: 'Pemohon mendaftarkan secara online.', aktor: 'I Made Suardana, S.Pd.H', role: 'pemohon', waktu: '2026-10-23 07:10' },
      { id: 'h2', status: 'verifikasi_operator', judul: 'Pemeriksaan Front Office PTSP', keterangan: 'Operator PTSP menyetujui kelengkapan berkas.', aktor: 'Siti Nurhaliza, S.Kom', role: 'operator_ptsp', waktu: '2026-10-23 07:30' },
      { id: 'h3', status: 'disposisi_seksi', judul: 'Disposisi Seksi Bimas Hindu', keterangan: 'Diteruskan ke Penyelenggara Bimas Hindu.', aktor: 'Siti Nurhaliza, S.Kom', role: 'operator_ptsp', waktu: '2026-10-23 07:45' },
      { id: 'h4', status: 'telaah_seksi', judul: 'Telaah Data Rumah Ibadah Hindu', keterangan: 'Penyelenggara Bimas Hindu sedang memverifikasi data krama pura dan koordinasi dengan PHDI.', aktor: 'I Wayan Sudiarta, S.Ag', role: 'penyelenggara_hindu', waktu: '2026-10-23 08:00' }
    ],
    catatanOperator: 'Semua berkas rekomendasi PHDI dan bukti tanah lengkap.',
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
  },
  {
    id: 'req-005',
    nomorResi: 'PTSP-MURA-2026-0051',
    tanggalPengajuan: '2026-10-23 07:55',
    layananId: 'lay-peg-01',
    namaLayanan: 'Permohonan Cuti ASN (Tahunan, Besar, Bersalin, Sakit, Alasan Penting)',
    seksi: 'kepegawaian',
    pemohon: {
      namaLengkap: 'Drs. H. Syamsuddin, M.Si',
      nik: '1605012504680001',
      noHpWhatsapp: '081271109923',
      email: 'syamsuddin.kemenag@kemenag.go.id',
      instansiOrLembaga: 'KUA Kecamatan Tugumulyo (Kepala KUA)',
      alamat: 'Jl. Ahmad Yani No. 12, Kel. Srikaton',
      kecamatan: 'Tugumulyo',
      kabupaten: 'Musi Rawas'
    },
    perihal: 'Pengajuan Cuti Tahunan Periode Akhir Tahun (6 Hari Kerja)',
    catatanPemohon: 'Pengajuan cuti tahunan tanggal 27 Oktober - 03 November 2026 untuk urusan keluarga. Pelaksana harian telah ditunjuk.',
    dokumenList: [
      { id: 'd1', nama: 'Formulir Pengajuan Cuti (Format Resmi BKN)', wajib: true, status: 'unggah', namaFile: 'Formulir_Cuti_BKN_Syamsuddin.pdf', ukuranFile: '420 KB' },
      { id: 'd2', nama: 'Surat Rekomendasi / Pengantar dari Atasan Langsung', wajib: true, status: 'unggah', namaFile: 'Surat_Pengantar_Plh_KUA.pdf', ukuranFile: '310 KB' },
      { id: 'd3', nama: 'Catatan Riwayat Sisa Cuti Tahun Berjalan', wajib: true, status: 'unggah', namaFile: 'Catatan_Sisa_Cuti_2026.pdf', ukuranFile: '280 KB' }
    ],
    status: 'verifikasi_operator',
    history: [
      { id: 'h1', status: 'diajukan', judul: 'Permohonan Didaftarkan', keterangan: 'Pengajuan cuti masuk ke sistem antrean.', aktor: 'Drs. H. Syamsuddin, M.Si', role: 'pemohon', waktu: '2026-10-23 07:55' },
      { id: 'h2', status: 'verifikasi_operator', judul: 'Dalam Antrean Front Office', keterangan: 'Operator PTSP sedang meneliti keabsahan formulir dan sisa cuti.', aktor: 'Rahmat Hidayat, A.Md', role: 'operator_ptsp', waktu: '2026-10-23 08:00' }
    ],
    catatanOperator: '',
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
  },
  {
    id: 'req-006',
    nomorResi: 'PTSP-MURA-2026-0054',
    tanggalPengajuan: '2026-10-23 08:10',
    layananId: 'lay-pendis-02',
    namaLayanan: 'Rekomendasi Izin Operasional Pondok Pesantren / LPQ',
    seksi: 'pendis',
    pemohon: {
      namaLengkap: 'Ust. Khoirul Anam, S.Pd.I',
      nik: '1605041006880005',
      noHpWhatsapp: '081377889901',
      email: 'raudhatuljannah.ponpes@gmail.com',
      instansiOrLembaga: 'Ponpes Tahfidz Raudhatul Jannah',
      alamat: 'Desa Ciptodadi II',
      kecamatan: 'Sukamaju',
      kabupaten: 'Musi Rawas'
    },
    perihal: 'Permohonan Izin Operasional Pondok Pesantren Baru',
    catatanPemohon: 'Kami melampirkan berkas pondok pesantren tahfidz yang telah membina 28 santri mukim.',
    dokumenList: [
      { id: 'd1', nama: 'Surat Permohonan Pimpinan Lembaga/Kiai', wajib: true, status: 'valid', namaFile: 'Surat_Permohonan_Kiai.pdf', ukuranFile: '490 KB' },
      { id: 'd2', nama: 'Susunan Pengurus Lembaga & Riwayat Hidup Kyai/Pimpinan', wajib: true, status: 'valid', namaFile: 'Susunan_Pengurus_Ponpes.pdf', ukuranFile: '710 KB' },
      { id: 'd3', nama: 'Surat Keterangan Domisili dari Kantor Desa/Kelurahan', wajib: true, status: 'valid', namaFile: 'Domisili_Desa_Ciptodadi.pdf', ukuranFile: '380 KB' },
      { id: 'd4', nama: 'Daftar Santri Mukim (minimal 15 santri) & Kurikulum Pembelajaran', wajib: true, status: 'tidak_valid', catatan: 'Mohon cantumkan NIK dan Nomor KK santri mukim secara lengkap sesuai format Ditpdpontren.', namaFile: 'Daftar_Santri_Sementara.pdf', ukuranFile: '310 KB' },
      { id: 'd5', nama: 'Foto Sarana Prasarana (Masjid/Mushalla, Asrama, Ruang Belajar)', wajib: true, status: 'unggah', namaFile: 'Foto_Sarpras.pdf', ukuranFile: '3.1 MB' }
    ],
    status: 'perlu_revisi',
    history: [
      { id: 'h1', status: 'diajukan', judul: 'Permohonan Didaftarkan', keterangan: 'Pemohon mendaftarkan berkas secara online.', aktor: 'Ust. Khoirul Anam, S.Pd.I', role: 'pemohon', waktu: '2026-10-23 08:10' },
      { id: 'h2', status: 'perlu_revisi', judul: 'Pengembalian Berkas - Perlu Revisi', keterangan: 'Operator PTSP meminta pemohon mengunggah ulang Dokumen No. 4 (Daftar Santri Mukim dengan NIK valid).', aktor: 'Rahmat Hidayat, A.Md', role: 'operator_ptsp', waktu: '2026-10-23 08:25' }
    ],
    catatanOperator: 'Daftar santri mukim belum mencantumkan Nomor Induk Kependudukan (NIK) dan KK secara lengkap. Harap perbaiki formulir lampiran santri dan unggah kembali.',
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
  }
];

// Integrasi Aplikasi Resmi Kementerian Agama per Seksi
export const APLIKASI_INTEGRASI: AplikasiIntegrasi[] = [
  // SEKSI PENDIDIKAN ISLAM (PENDIS)
  {
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
  },
  {
    id: 'app-emis',
    kode: 'EMIS-40',
    nama: 'EMIS 4.0 - Education Management Information System',
    singkatan: 'EMIS 4.0',
    deskripsi: 'Pangkalan data pokok madrasah (RA, MI, MTs, MA), pondok pesantren, MDT, LPQ terintegrasi nasional Ditjen Pendis.',
    pengembang: 'Ditjen Pendidikan Islam Kemenag RI',
    urlSimulasi: 'https://emis.kemenag.go.id',
    seksi: 'pendis',
    statusKoneksi: 'Terkoneksi',
    terakhirSinkron: '15 Menit yang lalu',
    ikon: 'Database',
    fiturUtama: ['Data Pokok Kelembagaan', 'Sinkronisasi NISN & Data Siswa', 'Sarpras Madrasah', 'Laporan Bos Kemenag']
  },
  {
    id: 'app-simpatika',
    kode: 'SIMPATIKA',
    nama: 'SIMPATIKA - Sistem Informasi Pendidik & Tenaga Kependidikan',
    singkatan: 'SIMPATIKA',
    deskripsi: 'Pengelolaan data guru, sertifikasi, NUPTK, keaktifan bulanan guru madrasah, dan penerbitan SKAKPT/SKMT.',
    pengembang: 'Ditjen Pendidikan Islam bekerjasama dengan Telkom',
    urlSimulasi: 'https://simpatika.kemenag.go.id',
    seksi: 'pendis',
    statusKoneksi: 'Optimal',
    terakhirSinkron: '22 Menit yang lalu',
    ikon: 'GraduationCap',
    fiturUtama: ['Penerbitan NUPTK', 'Pemberkasan TPG & Tunjangan Insentif', 'Validasi Beban Mengajar 24 Jam', 'Jadwal Mengajar Simpatika']
  },
  {
    id: 'app-siaga',
    kode: 'SIAGA-PAI',
    nama: 'SIAGA PAI - Sistem Informasi Administrasi Guru Agama',
    singkatan: 'SIAGA PAI',
    deskripsi: 'Sistem tata kelola guru dan pengawas Pendidikan Agama Islam (PAI) pada sekolah umum (SD, SMP, SMA, SMK).',
    pengembang: 'Direktorat PAI Ditjen Pendis Kemenag RI',
    urlSimulasi: 'https://siagapai.kemenag.go.id',
    seksi: 'pendis',
    statusKoneksi: 'Terkoneksi',
    terakhirSinkron: '1 Jam yang lalu',
    ikon: 'BookOpen',
    fiturUtama: ['Verifikasi Berkas TPG PAI Sekolah Umum', 'Pemutakhiran Rekening TPG', 'Data Pengawas PAI Kab. Mura']
  },
  {
    id: 'app-ijop',
    kode: 'IJOP-ONLINE',
    nama: 'IJOP Online - Izin Operasional Lembaga Keagamaan Islam',
    singkatan: 'IJOP Online',
    deskripsi: 'Sistem verifikasi pendaftaran dan penerbitan nomor statistik pondok pesantren (NSPP) dan madrasah diniyah.',
    pengembang: 'Ditpdpontren Ditjen Pendis Kemenag RI',
    urlSimulasi: 'https://ijop.kemenag.go.id',
    seksi: 'pendis',
    statusKoneksi: 'Terkoneksi',
    terakhirSinkron: '3 Jam yang lalu',
    ikon: 'FileCheck',
    fiturUtama: ['Pengajuan NSPP Baru', 'Verifikasi Dokumen Kiai & Santri', 'Penerbitan Piagam Digital']
  },
  {
    id: 'app-pdum',
    kode: 'PDUM',
    nama: 'PDUM - Pangkalan Data Ujian Madrasah',
    singkatan: 'PDUM',
    deskripsi: 'Sistem pendataan calon peserta Asesmen Madrasah (AM) dan cetak daftar nominasi tetap (DNT).',
    pengembang: 'Direktorat KSKK Madrasah',
    urlSimulasi: 'https://pdum.kemenag.go.id',
    seksi: 'pendis',
    statusKoneksi: 'Optimal',
    terakhirSinkron: '4 Jam yang lalu',
    ikon: 'Award',
    fiturUtama: ['Daftar Nominasi Sementara (DNS)', 'Daftar Nominasi Tetap (DNT)', 'Blangko Ijazah Elektronik']
  },

  // SEKSI BIMAS ISLAM
  {
    id: 'app-simkah',
    kode: 'SIMKAH-4',
    nama: 'SIMKAH Gen 4 - Sistem Informasi Manajemen Nikah',
    singkatan: 'SIMKAH Gen 4',
    deskripsi: 'Sistem informasi pendaftaran nikah online, kartu nikah digital, validasi NIK Dukcapil, dan operasional KUA.',
    pengembang: 'Ditjen Bimbingan Masyarakat Islam Kemenag RI',
    urlSimulasi: 'https://simkah.kemenag.go.id',
    seksi: 'bimas_islam',
    statusKoneksi: 'Optimal',
    terakhirSinkron: '8 Menit yang lalu',
    ikon: 'HeartHandshake',
    fiturUtama: ['Pendaftaran Nikah Online 14 KUA MURA', 'Penerbitan Kartu Nikah Digital', 'Buku Nikah Digital & Rekonsiliasi PNBP']
  },
  {
    id: 'app-simas',
    kode: 'SIMAS',
    nama: 'SIMAS - Sistem Informasi Masjid Kementerian Agama',
    singkatan: 'SIMAS Kemenag',
    deskripsi: 'Registrasi data masjid dan mushalla di seluruh Indonesia lengkap dengan titik koordinat dan ID nasional.',
    pengembang: 'Direktorat Urusan Agama Islam & Syariah',
    urlSimulasi: 'https://simas.kemenag.go.id',
    seksi: 'bimas_islam',
    statusKoneksi: 'Terkoneksi',
    terakhirSinkron: '35 Menit yang lalu',
    ikon: 'Landmark',
    fiturUtama: ['Nomor ID SIMAS Resmi', 'Status Tanah & Luas Bangunan', 'Akurasi Arah Kiblat', 'Rekomendasi Bantuan Bimas Islam']
  },
  {
    id: 'app-siwak',
    kode: 'SIWAK',
    nama: 'SIWAK - Sistem Informasi Wakaf Terpadu',
    singkatan: 'SIWAK',
    deskripsi: 'Pencatatan tanah wakaf, sertifikat wakaf, nazhir resmi, dan pemanfaatan aset wakaf produktif.',
    pengembang: 'Direktorat Pemberdayaan Zakat dan Wakaf',
    urlSimulasi: 'https://siwak.kemenag.go.id',
    seksi: 'bimas_islam',
    statusKoneksi: 'Terkoneksi',
    terakhirSinkron: '1 Hari yang lalu',
    ikon: 'Compass',
    fiturUtama: ['Pemetaan Geospasial Tanah Wakaf', 'Pencatatan AIW & APAIW', 'Monitoring Sengketa Tanah Wakaf']
  },
  {
    id: 'app-sihalal',
    kode: 'SIHALAL',
    nama: 'SIHALAL - Sistem Informasi Layanan Halal Terintegrasi BPJPH',
    singkatan: 'SIHALAL BPJPH',
    deskripsi: 'Layanan pendaftaran sertifikasi halal reguler & self-declare bagi pelaku usaha mikro dan UMKM.',
    pengembang: 'Badan Penyelenggara Jaminan Produk Halal (BPJPH)',
    urlSimulasi: 'https://ptsp.halal.go.id',
    seksi: 'bimas_islam',
    statusKoneksi: 'Optimal',
    terakhirSinkron: '50 Menit yang lalu',
    ikon: 'ShieldCheck',
    fiturUtama: ['Verifikasi Pendamping PPH Halal', 'Sertifikat Halal Digital BPJPH', 'Monitoring Produk Halal Daerah Mura']
  },

  // PENYELENGGARA BIMAS KRISTEN
  {
    id: 'app-siagama-kristen',
    kode: 'SIAGAMA-KRS',
    nama: 'SIAGAMA Kristen - Sistem Informasi Keagamaan Kristen',
    singkatan: 'SIAGAMA Kristen',
    deskripsi: 'Pangkalan data terpadu jemaat gereja, rohaniwan, izin rumah ibadah, dan lembaga keagamaan Kristen.',
    pengembang: 'Ditjen Bimas Kristen Kemenag RI',
    urlSimulasi: 'https://bimas-kristen.kemenag.go.id',
    seksi: 'bimas_kristen',
    statusKoneksi: 'Terkoneksi',
    terakhirSinkron: '2 Jam yang lalu',
    ikon: 'Church',
    fiturUtama: ['Tanda Daftar Gereja Terpadu', 'Database Rohaniwan & Pendeta Aktif', 'Pemberkasan Lembaga Keagamaan']
  },
  {
    id: 'app-simpatika-kristen',
    kode: 'SIMPATIKA-KRS',
    nama: 'SIMPATIKA Guru Agama Kristen Kemenag',
    singkatan: 'SIMPATIKA Kristen',
    deskripsi: 'Pengelolaan data guru dan pengawas Pendidikan Agama Kristen serta pencairan tunjangan profesi.',
    pengembang: 'Ditjen Bimas Kristen',
    urlSimulasi: 'https://kristen.simpatika.kemenag.go.id',
    seksi: 'bimas_kristen',
    statusKoneksi: 'Optimal',
    terakhirSinkron: '1 Jam yang lalu',
    ikon: 'GraduationCap',
    fiturUtama: ['Verval NRG & SKAKPT Guru Kristen', 'Penilaian Kinerja Guru Agama Kristen']
  },

  // PENYELENGGARA BIMAS HINDU
  {
    id: 'app-simba-hindu',
    kode: 'SIMBA-HND',
    nama: 'SIMBA Hindu - Sistem Informasi Manajemen Bimas Hindu',
    singkatan: 'SIMBA Hindu',
    deskripsi: 'Database tempat suci Pura, Pasraman, Pinandita/Pandita, dan kelembagaan PHDI di Kabupaten Musi Rawas.',
    pengembang: 'Ditjen Bimas Hindu Kemenag RI',
    urlSimulasi: 'https://bimashindu.kemenag.go.id/simba',
    seksi: 'bimas_hindu',
    statusKoneksi: 'Terkoneksi',
    terakhirSinkron: '3 Jam yang lalu',
    ikon: 'Flame',
    fiturUtama: ['Registrasi Tanda Daftar Pura', 'Pencatatan Pasraman Widya', 'Database Pemangku / Rohaniwan']
  },
  {
    id: 'app-sipasraman',
    kode: 'SI-PASRAMAN',
    nama: 'SI-PASRAMAN - Sistem Informasi Pendidikan Pasraman',
    singkatan: 'SI-Pasraman',
    deskripsi: 'Manajemen data pendidik keagamaan Hindu, brahmacari, dan bantuan operasional pasraman.',
    pengembang: 'Ditjen Bimas Hindu',
    urlSimulasi: 'https://pasraman.kemenag.go.id',
    seksi: 'bimas_hindu',
    statusKoneksi: 'Optimal',
    terakhirSinkron: '5 Jam yang lalu',
    ikon: 'BookOpen',
    fiturUtama: ['Kurikulum Pasraman', 'Data Siswa & Pendidik Agama Hindu Mura']
  },

  // SUBBAG TU - KEPEGAWAIAN
  {
    id: 'app-simpeg',
    kode: 'SIMPEG-5',
    nama: 'SIMPEG 5 - Sistem Informasi Manajemen Kepegawaian Kemenag',
    singkatan: 'SIMPEG 5 Kemenag',
    deskripsi: 'Sistem profil terpadu ASN Kementerian Agama (PNS & PPPK), riwayat kepangkatan, mutasi, jabatan, dan diklat.',
    pengembang: 'Biro Kepegawaian Sekretariat Jenderal Kemenag RI',
    urlSimulasi: 'https://simpeg.kemenag.go.id',
    seksi: 'kepegawaian',
    statusKoneksi: 'Optimal',
    terakhirSinkron: '10 Menit yang lalu',
    ikon: 'Users',
    fiturUtama: ['Biodata ASN & Riwayat Jabatan', 'Pengusulan KGB & SK Pengangkatan', 'Pemberkasan Kenaikan Pangkat Elektronik']
  },
  {
    id: 'app-siasn',
    kode: 'SIASN-BKN',
    nama: 'SIASN & MyASN BKN - Sistem Informasi ASN Nasional',
    singkatan: 'SIASN BKN',
    deskripsi: 'Layanan administrasi kepegawaian terpusat BKN untuk Kenaikan Pangkat, Mutasi, Pensiun, dan Cuti ASN.',
    pengembang: 'Badan Kepegawaian Negara (BKN)',
    urlSimulasi: 'https://siasn.bkn.go.id',
    seksi: 'kepegawaian',
    statusKoneksi: 'Terkoneksi',
    terakhirSinkron: '20 Menit yang lalu',
    ikon: 'Building2',
    fiturUtama: ['Layanan Kenaikan Pangkat 6 Periode BKN', 'Penerbitan SK Pensiun Digital', 'Sinkronisasi Data MyASN Pegawai']
  },
  {
    id: 'app-pusaka',
    kode: 'PUSAKA',
    nama: 'PUSAKA Superapps & Presensi Online Kemenag',
    singkatan: 'Pusaka Superapps',
    deskripsi: 'Aplikasi layanan keagamaan dan presensi kehadiran digital geolokasi (GPS) seluruh pegawai Kemenag.',
    pengembang: 'Kementerian Agama Republik Indonesia',
    urlSimulasi: 'https://pusaka.kemenag.go.id',
    seksi: 'kepegawaian',
    statusKoneksi: 'Optimal',
    terakhirSinkron: 'Real-time (Active)',
    ikon: 'Smartphone',
    fiturUtama: ['Presensi Online Geofencing Kantor & Madrasah', 'Layanan Surat Cuti Online', 'Dashboard Kinerja Harian']
  }
];

// DATA MASTER SEKSI (SUB-MENU DATA SPESIFIK)
export const DATA_SEKSI_PENDIS = [
  { id: 'm-01', nama: 'MAN 1 Musi Rawas', nsm: '131116050001', npsn: '10648821', jenjang: 'MA Negeri', status: 'Negeri', akreditasi: 'A', kepala: 'Buchari, S.Ag., M.Pd.I', kecamatan: 'Muara Beliti', jumlahSiswa: 540, jumlahGuru: 42 },
  { id: 'm-02', nama: 'MTsN 1 Musi Rawas', nsm: '121116050001', npsn: '10648830', jenjang: 'MTs Negeri', status: 'Negeri', akreditasi: 'A', kepala: 'Nurhayati, S.Pd., M.Si', kecamatan: 'Tugumulyo', jumlahSiswa: 680, jumlahGuru: 51 },
  { id: 'm-03', nama: 'MIN 1 Musi Rawas', nsm: '111116050001', npsn: '10648815', jenjang: 'MI Negeri', status: 'Negeri', akreditasi: 'A', kepala: 'H. Sudirman, S.Pd.I', kecamatan: 'Purwodadi', jumlahSiswa: 390, jumlahGuru: 28 },
  { id: 'm-04', nama: 'MTs Al-Falah Mandiri', nsm: '121216050012', npsn: '69921004', jenjang: 'MTs Swasta', status: 'Swasta', akreditasi: 'B', kepala: 'Drs. H. Mulyadi Saputra', kecamatan: 'Tugumulyo', jumlahSiswa: 215, jumlahGuru: 18 },
  { id: 'm-05', nama: 'MAS Raudhatul Jannah', nsm: '131216050009', npsn: '69899120', jenjang: 'MA Swasta', status: 'Swasta', akreditasi: 'B', kepala: 'Ust. Khoirul Anam, S.Pd.I', kecamatan: 'Megang Sakti', jumlahSiswa: 185, jumlahGuru: 16 },
  { id: 'm-06', nama: 'Ponpes Darussalam Muara Beliti', nsm: '510016050003', npsn: 'P9920140', jenjang: 'Pondok Pesantren', status: 'Swasta', akreditasi: 'A', kepala: 'KH. Usman Mansyur', kecamatan: 'Muara Beliti', jumlahSiswa: 340, jumlahGuru: 32 }
];

export const DATA_SEKSI_BIMAS_ISLAM = [
  { id: 'b-01', nama: 'KUA Kecamatan Muara Beliti', tipologi: 'KUA Tipologi B', kepala: 'Drs. H. M. Zainuri, M.H', alamat: 'Komplek Perkantoran Pemkab Mura', noKontak: '081273911029', jmlPernikahan2026: 142, statusSimkah: 'Online (Gen 4)' },
  { id: 'b-02', nama: 'KUA Kecamatan Tugumulyo', tipologi: 'KUA Tipologi A', kepala: 'Drs. H. Syamsuddin, M.Si', alamat: 'Jl. Ahmad Yani No. 12 Srikaton', noKontak: '081271109923', jmlPernikahan2026: 284, statusSimkah: 'Online (Gen 4)' },
  { id: 'b-03', nama: 'KUA Kecamatan Megang Sakti', tipologi: 'KUA Tipologi B', kepala: 'Ahmad Subandi, S.Ag', alamat: 'Jl. Poros Megang Sakti I', noKontak: '085268491102', jmlPernikahan2026: 198, statusSimkah: 'Online (Gen 4)' },
  { id: 'b-04', nama: 'Masjid Agung Darussalam Mura', idSimas: '01.1.08.05.01.000001', tipologi: 'Masjid Agung Kabupaten', kapasitas: '5.000 Jamaah', alamat: 'Muara Beliti', sertifikatArahKiblat: 'Tersertifikasi (Valid)', statusWakaf: 'SHM Wakaf No. 12' },
  { id: 'b-05', nama: 'Masjid Nurul Iman Megang Sakti', idSimas: '01.4.08.05.02.000142', tipologi: 'Masjid Jami Kecamatan', kapasitas: '1.200 Jamaah', alamat: 'Megang Sakti I', sertifikatArahKiblat: 'Tersertifikasi (Valid)', statusWakaf: 'AIW / W.3' }
];

export const DATA_SEKSI_BIMAS_KRISTEN = [
  { id: 'k-01', nama: 'GPdI Beliti Indah Musi Rawas', tandaDaftar: 'F/IV/Reg.112/Kemenag/2021', pimpinan: 'Pdt. Yohanes Simanjuntak, S.Th', sinode: 'Gereja Pentakosta di Indonesia (GPdI)', alamat: 'Simpang Beliti Indah', kecamatan: 'Muara Beliti', jumlahJemaat: 140 },
  { id: 'k-02', nama: 'Gereja Kristen Protestan Tugumulyo (GKPI)', tandaDaftar: 'F/IV/Reg.089/Kemenag/2018', pimpinan: 'Pdt. Markus Silaban, M.Th', sinode: 'GKPI Wilayah Sumbagsel', alamat: 'Desa Sidorejo', kecamatan: 'Tugumulyo', jumlahJemaat: 210 },
  { id: 'k-03', nama: 'Gereja HKBP Persiapan Megang Sakti', tandaDaftar: 'F/IV/Reg.130/Kemenag/2023', pimpinan: 'Pdt. Andreas Hutapea, S.Si', sinode: 'HKBP Distrik Sumbagsel', alamat: 'Jl. Usaha Bersama', kecamatan: 'Megang Sakti', jumlahJemaat: 115 },
  { id: 'k-04', nama: 'Data Guru Agama Kristen MURA', tandaDaftar: 'SIMPATIKA Kemenag', pimpinan: 'Koordinator: Esther Hutagalung, S.Pd.K', sinode: 'Satker Kemenag Kab. Musi Rawas', alamat: 'Kantor Kemenag Mura', kecamatan: 'Kabupaten Musi Rawas', jumlahJemaat: 24 }
];

export const DATA_SEKSI_BIMAS_HINDU = [
  { id: 'h-01', nama: 'Pura Penataran Agung Muara Beliti', tandaDaftar: 'HND/REG/014/MURA/2019', pinandita: 'Pemangku I Made Suardana, S.Pd.H', lembaga: 'Pengempon Umat Hindu Mura & PHDI', alamat: 'Dusun III, Desa Pedang', kecamatan: 'Muara Beliti', kramaPura: '42 KK (165 Jiwa)' },
  { id: 'h-02', nama: 'Pura Tirta Bhuana Tugumulyo', tandaDaftar: 'HND/REG/021/MURA/2022', pinandita: 'Pemangku Wayan Sukarta', lembaga: 'Banjar Adat Tugumulyo', alamat: 'Desa Wonokerto', kecamatan: 'Tugumulyo', kramaPura: '28 KK (110 Jiwa)' },
  { id: 'h-03', nama: 'Pasraman Widya Shanti', tandaDaftar: 'PAS-HND/004/2020', pinandita: 'Ketua: Ketut Wardana, S.Ag', lembaga: 'Pendidikan Keagamaan Hindu Nonformal', alamat: 'Muara Beliti', kecamatan: 'Muara Beliti', kramaPura: '35 Siswa / 4 Acarya' }
];

export const DATA_SEKSI_KEPEGAWAIAN = [
  { id: 'p-01', nip: '197004121996031001', nama: 'Dr. H. Hermadi, S.Ag., M.Si', jabatan: 'Kepala Kantor', pangkatGol: 'Pembina Utama Muda (IV/c)', unitKerja: 'Pimpinan Kantor Kemenag Mura', statusASN: 'PNS', skpStatus: 'Sangat Baik' },
  { id: 'p-02', nip: '197211051998031004', nama: 'H. Sarifuddin, S.E., M.Si', jabatan: 'Kepala Subbagian Tata Usaha', pangkatGol: 'Pembina (IV/a)', unitKerja: 'Subbag TU', statusASN: 'PNS', skpStatus: 'Baik' },
  { id: 'p-03', nip: '197405122000031002', nama: 'Drs. H. Ahmad Fauzi, M.Pd.I', jabatan: 'Kasi Pendidikan Islam', pangkatGol: 'Pembina (IV/a)', unitKerja: 'Seksi Pendis', statusASN: 'PNS', skpStatus: 'Sangat Baik' },
  { id: 'p-04', nip: '197608142003121001', nama: 'H. Muhammad Ridwan, S.Ag., M.H', jabatan: 'Kasi Bimas Islam', pangkatGol: 'Penata Tk. I (III/d)', unitKerja: 'Seksi Bimas Islam', statusASN: 'PNS', skpStatus: 'Baik' },
  { id: 'p-05', nip: '198103252008011014', nama: 'Marnix S. Pandiangan, S.Th., M.Pd.K', jabatan: 'Penyelenggara Bimas Kristen', pangkatGol: 'Penata Tk. I (III/d)', unitKerja: 'Bimas Kristen', statusASN: 'PNS', skpStatus: 'Baik' },
  { id: 'p-06', nip: '198307182009121003', nama: 'I Wayan Sudiarta, S.Ag', jabatan: 'Penyelenggara Bimas Hindu', pangkatGol: 'Penata (III/c)', unitKerja: 'Bimas Hindu', statusASN: 'PNS', skpStatus: 'Baik' },
  { id: 'p-07', nip: '198806152011011003', nama: 'Rahmat Hidayat, A.Md', jabatan: 'Pranata Komputer / Operator PTSP', pangkatGol: 'Pengatur Tk. I (II/d)', unitKerja: 'Front Office PTSP', statusASN: 'PNS', skpStatus: 'Sangat Baik' }
];

// Data Kepala Kantor Kementerian Agama Kabupaten Musi Rawas dari Pertama sampai Terbaru
export const DATA_KEPALA_KANTOR: import('../types/ptsp').KepalaKantorHistory[] = [
  {
    id: 'kk-01',
    urutan: 1,
    nama: 'H. A. Rahman Zen, BA',
    gelar: 'Kepala Kantor Kemenag Mura Pertama',
    periode: '1968 - 1975',
    tahunMulai: 1968,
    tahunSelesai: 1975,
    status: 'Purna Bakti',
    prestasi: 'Peletak dasar kelembagaan Kantor Departemen Agama di Kabupaten Musi Rawas serta perintisan KUA di kecamatan awal.',
    fotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    nip: '-'
  },
  {
    id: 'kk-02',
    urutan: 2,
    nama: 'H. M. Yasin Bakri',
    gelar: 'Kepala Kantor Periode Ke-2',
    periode: '1975 - 1983',
    tahunMulai: 1975,
    tahunSelesai: 1983,
    status: 'Purna Bakti',
    prestasi: 'Pemekaran balai nikah KUA dan penataan kelembagaan madrasah ibtidaiyah swasta di permukiman transmigrasi.',
    fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    nip: '-'
  },
  {
    id: 'kk-03',
    urutan: 3,
    nama: 'Drs. H. Harun Ar-Rasyid',
    gelar: 'Kepala Kantor Periode Ke-3',
    periode: '1983 - 1991',
    tahunMulai: 1983,
    tahunSelesai: 1991,
    status: 'Purna Bakti',
    prestasi: 'Pembangunan gedung kantor permanen dan pemantapan kerukunan antarumat beragama di Kabupaten Musi Rawas.',
    fotoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
    nip: '150123890'
  },
  {
    id: 'kk-04',
    urutan: 4,
    nama: 'Drs. H. Syamsuddin Effendi',
    gelar: 'Kepala Kantor Periode Ke-4',
    periode: '1991 - 1998',
    tahunMulai: 1991,
    tahunSelesai: 1998,
    status: 'Purna Bakti',
    prestasi: 'Penguatan kurikulum madrasah terpadu dan pembinaan intensif pondok pesantren tradisional di Musi Rawas.',
    fotoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
    nip: '150198421'
  },
  {
    id: 'kk-05',
    urutan: 5,
    nama: 'H. Fauzi Abdullah, S.Ag',
    gelar: 'Kepala Kantor Periode Ke-5',
    periode: '1998 - 2005',
    tahunMulai: 1998,
    tahunSelesai: 2005,
    status: 'Purna Bakti',
    prestasi: 'Transformasi administrasi pasca-otonomi daerah dan sertifikasi tanah wakaf serta rumah ibadah lintas agama.',
    fotoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
    nip: '195504121980031003'
  },
  {
    id: 'kk-06',
    urutan: 6,
    nama: 'Drs. H. Zainuri Arsyad, M.Si',
    gelar: 'Kepala Kantor Periode Ke-6',
    periode: '2005 - 2012',
    tahunMulai: 2005,
    tahunSelesai: 2012,
    status: 'Purna Bakti',
    prestasi: 'Pembangunan Pusat Layanan Haji & Umrah Terpadu serta sertifikasi guru madrasah dan guru PAI Musi Rawas.',
    fotoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    nip: '195908201985031002'
  },
  {
    id: 'kk-07',
    urutan: 7,
    nama: 'H. Sukardi, S.Ag., M.Pd.I',
    gelar: 'Kepala Kantor Periode Ke-7',
    periode: '2012 - 2018',
    tahunMulai: 2012,
    tahunSelesai: 2018,
    status: 'Purna Bakti',
    prestasi: 'Relokasi dan optimalisasi Komplek Perkantoran Pemkab di Muara Beliti serta inisiasi Pelayanan Terpadu Satu Pintu (PTSP) fisik.',
    fotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    nip: '196503141991031002'
  },
  {
    id: 'kk-08',
    urutan: 8,
    nama: 'Dr. H. Hermadi, S.Ag., M.Si',
    gelar: 'Kepala Kantor Kementerian Agama Kab. Musi Rawas (Aktif)',
    periode: '2018 - Sekarang',
    tahunMulai: 2018,
    tahunSelesai: 'Sekarang',
    status: 'Menjabat (Aktif)',
    prestasi: 'Pencanangan Transformasi Digital Layanan Keagamaan, PTSP Online Berbasis TTE BSrE, Penguatan Zona Integritas WBK/WBBM, dan Moderasi Beragama.',
    fotoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80',
    nip: '197004121996031001'
  }
];

// Berita Terkini Kemenag Mura
export const BERITA_TERKINI: import('../types/ptsp').BeritaItem[] = [
  {
    id: 'news-01',
    judul: 'Kemenag Musi Rawas Luncurkan Sistem PTSP Digital Berbasis TTE BSrE untuk Tingkatkan Mutu SPBE',
    ringkasan: 'Melalui inovasi terpadu satu pintu, masyarakat dan lembaga keagamaan kini dapat mengajukan izin, rekomendasi, dan surat keterangan secara online tanpa tatap muka.',
    kategori: 'PTSP & Layanan',
    tanggal: '26 Oktober 2026',
    penulis: 'Humas Kemenag MURA',
    dibaca: 1240,
    gambarUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
    isiLengkap: 'Kantor Kementerian Agama Kabupaten Musi Rawas resmi meluncurkan integrasi sistem Pelayanan Terpadu Satu Pintu (PTSP) berbasis Tanda Tangan Elektronik (TTE) yang tersertifikasi oleh Balai Sertifikasi Elektronik (BSrE) Badan Siber dan Sandi Negara. Dengan inovasi ini, pengurusan dokumen izin operasional madrasah, rekomendasi rumah ibadah, dan izin penelitian dapat diselesaikan lebih cepat, transparan, dan dapat diverifikasi langsung melalui QR code keamanan.'
  },
  {
    id: 'news-02',
    judul: 'Kakan Kemenag Mura Pimpin Deklarasi Kerukunan dan Dialog Moderasi Beragama Lintas Seksi',
    ringkasan: 'Menghadirkan tokoh FKUB, pengurus Bimas Islam, Kristen, dan Hindu untuk memperkokoh persaudaraan dan toleransi di Bumi Lan Serasan Sekenten.',
    kategori: 'Kerukunan Umat',
    tanggal: '24 Oktober 2026',
    penulis: 'Pranata Humas MURA',
    dibaca: 980,
    gambarUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&auto=format&fit=crop&q=80',
    isiLengkap: 'Kepala Kantor Kemenag Kab. Musi Rawas Dr. H. Hermadi, S.Ag., M.Si menegaskan pentingnya moderasi beragama sebagai fondasi harmoni sosial. Acara yang digelar di Aula Pelayanan Terpadu ini dihadiri oleh perwakilan tokoh agama Islam, Kristen, Hindu, serta para kepala KUA dan pimpinan ormas keagamaan se-Kabupaten Musi Rawas.'
  },
  {
    id: 'news-03',
    judul: 'Seksi Pendidikan Islam Matangkan Sinkronisasi Data EMIS 4.0 dan Validasi Kelayakan Madrasah',
    ringkasan: 'Ratusan operator madrasah dan pondok pesantren mengikuti bimbingan teknis pemutakhiran data sarpras dan peserta didik jelang asesmen akhir tahun.',
    kategori: 'Pendidikan',
    tanggal: '22 Oktober 2026',
    penulis: 'Tim Pendis Kemenag MURA',
    dibaca: 1420,
    gambarUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
    isiLengkap: 'Seksi Pendidikan Islam Kemenag Musi Rawas menyelenggarakan workshop percepatan verifikasi data EMIS 4.0 dan SIMPATIKA di MAN 1 Musi Rawas. Kasi Pendis Drs. H. Ahmad Fauzi mengingatkan agar seluruh madrasah memanfaatkan layanan PTSP Online untuk kepengurusan izin operasional dan rekomendasi bantuan secara tepat waktu.'
  },
  {
    id: 'news-04',
    judul: 'Bimas Islam Musi Rawas Gelar Kalibrasi Arah Kiblat Serentak dan Verval ID SIMAS Masjid',
    ringkasan: 'Badan Hisab Rukyat (BHR) Kemenag Musi Rawas turun ke 14 kecamatan memastikan akurasi arah kiblat dan penyerahan sertifikat kalibrasi resmi.',
    kategori: 'Bimas Islam',
    tanggal: '19 Oktober 2026',
    penulis: 'Seksi Bimas Islam',
    dibaca: 830,
    gambarUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&auto=format&fit=crop&q=80',
    isiLengkap: 'Sebagai wujud pelayanan prima urusan agama Islam, Bimas Islam telah mengalibrasi 42 masjid dan mushalla dalam program triwulan ke-4 tahun 2026. Masjid yang telah terkalibrasi memperoleh sertifikat resmi ber-TTE dan nomor registrasi SIMAS nasional.'
  },
  {
    id: 'news-05',
    judul: 'Subbag Tata Usaha Sosialisasikan Tata Kelola Kenaikan Pangkat Enam Periode dan Layanan Cuti Digital',
    ringkasan: 'Aparatur Sipil Negara Kemenag Mura diimbau memanfaatkan portal PTSP dan integrasi SIASN BKN untuk kelancaran karir kepegawaian.',
    kategori: 'Kepegawaian',
    tanggal: '17 Oktober 2026',
    penulis: 'Subbag TU Kepegawaian',
    dibaca: 1110,
    gambarUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
    isiLengkap: 'Kasubbag Tata Usaha H. Sarifuddin, S.E., M.Si menyampaikan bahwa sistem PTSP Online Kemenag Mura kini memudahkan ASN mengajukan permohonan cuti, surat keterangan aktif, dan usulan kenaikan pangkat secara paperless.'
  }
];

// Daftar Akun Sistem Resmi untuk Pengujian & Transisi Role Sesuai Permintaan User
export const DAFTAR_AKUN_SISTEM: import('../types/ptsp').AkunPengguna[] = [
  {
    id: 'acc-pemohon',
    username: 'pemohon.warga',
    namaLengkap: 'Masyarakat / Pemohon Layanan',
    role: 'pemohon',
    jabatan: 'Masyarakat Umum / Lembaga Keagamaan',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    badgeLabel: 'Portal Pemohon',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    deskripsiTugas: 'Mengajukan permohonan baru, mengunggah dokumen persyaratan, melacak resi, dan mengunduh surat resmi ber-TTE.'
  },
  {
    id: 'acc-operator-ptsp',
    username: 'operator.ptsp',
    namaLengkap: 'Rahmat Hidayat, A.Md',
    role: 'operator_ptsp',
    jabatan: 'Petugas Front Office / Operator PTSP',
    nip: '198806152011011003',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    badgeLabel: 'Operator PTSP (Front Office)',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    deskripsiTugas: 'Memproses berkas masuk, verifikasi checklist dokumen fisik & digital, beri catatan revisi, dan disposisi ke seksi teknis.'
  },
  {
    id: 'acc-pendis',
    username: 'kasi.pendis',
    namaLengkap: 'Drs. H. Ahmad Fauzi, M.Pd.I',
    role: 'kasi_pendis',
    seksi: 'pendis',
    jabatan: 'Kepala Seksi Pendidikan Islam (Pendis)',
    nip: '197405122000031002',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    badgeLabel: 'Operator/Kasi Pendis',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    deskripsiTugas: 'Telaah teknis izin operasional madrasah & ponpes, integrasi EMIS 4.0, SIMPATIKA, SIAGA PAI, dan draft rekomendasi.'
  },
  {
    id: 'acc-bimas-islam',
    username: 'kasi.bimasislam',
    namaLengkap: 'H. Muhammad Ridwan, S.Ag., M.H',
    role: 'kasi_bimas_islam',
    seksi: 'bimas_islam',
    jabatan: 'Kepala Seksi Bimbingan Masyarakat Islam',
    nip: '197608142003121001',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    badgeLabel: 'Operator/Kasi Bimas Islam',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    deskripsiTugas: 'Telaah teknis bantuan rumah ibadah, majelis taklim, arah kiblat, integrasi SIMKAH Gen 4, SIMAS, dan SIWAK.'
  },
  {
    id: 'acc-bimas-kristen',
    username: 'penyelenggara.kristen',
    namaLengkap: 'Marnix S. Pandiangan, S.Th., M.Pd.K',
    role: 'penyelenggara_kristen',
    seksi: 'bimas_kristen',
    jabatan: 'Penyelenggara Bimas Kristen',
    nip: '198103252008011014',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    badgeLabel: 'Operator/Penyelenggara Kristen',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    deskripsiTugas: 'Verifikasi tanda daftar rumah ibadat gereja, surat keterangan rohaniwan Kristen, integrasi SIAGAMA.'
  },
  {
    id: 'acc-bimas-hindu',
    username: 'penyelenggara.hindu',
    namaLengkap: 'I Wayan Sudiarta, S.Ag',
    role: 'penyelenggara_hindu',
    seksi: 'bimas_hindu',
    jabatan: 'Penyelenggara Bimas Hindu',
    nip: '198307182009121003',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    badgeLabel: 'Operator/Penyelenggara Hindu',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    deskripsiTugas: 'Verifikasi tanda daftar pura, pasraman, pembinaan pemangku/pinandita, integrasi SIMBA Hindu.'
  },
  {
    id: 'acc-kepegawaian',
    username: 'kasubbag.tu',
    namaLengkap: 'H. Sarifuddin, S.E., M.Si',
    role: 'kasubbag_kepegawaian',
    seksi: 'kepegawaian',
    jabatan: 'Kepala Subbagian Tata Usaha (Kasubbag TU)',
    nip: '197211051998031004',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    badgeLabel: 'Kasubbag Tata Usaha',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    deskripsiTugas: 'Manajemen permohonan cuti, usulan kenaikan pangkat, KGB, SKMK, integrasi SIMPEG 5, SIASN BKN, dan Pusaka.'
  },
  {
    id: 'acc-pimpinan',
    username: 'kakan.kemenag',
    namaLengkap: 'Dr. H. Hermadi, S.Ag., M.Si',
    role: 'kepala_kantor',
    jabatan: 'Kepala Kantor Kementerian Agama Kab. Musi Rawas',
    nip: '197004121996031001',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    badgeLabel: 'Pimpinan (Kepala Kantor)',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    deskripsiTugas: 'Persetujuan akhir dokumen permohonan dan penandatanganan elektronik resmi (TTE BSrE BSSN) berpassphrase.'
  }
];

