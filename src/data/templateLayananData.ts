import { TemplateBerkas } from '../types/ptsp';

export const TEMPLATES_LAYANAN_MAP: Record<string, TemplateBerkas[]> = {
  // 1. IJOP MADRASAH
  'lay-pendis-01': [
    {
      id: 'tpl-pendis-01-01',
      namaDokumen: 'Format Surat Permohonan Resmi Yayasan / Badan Hukum',
      syaratTerkait: 'Surat Permohonan Resmi dari Badan Hukum Pembina / Yayasan (bermaterai Rp 10.000)',
      jenisFormat: 'Surat Permohonan',
      ekstensiFile: '.docx',
      ukuranFile: '42 KB',
      deskripsiSingkat: 'Format surat permohonan resmi dari Ketua Yayasan ditujukan kepada Kepala Kantor Kemenag Kabupaten Murung Raya.',
      petunjukPengisian: [
        'Gunakan kop surat resmi yayasan/badan hukum pembina.',
        'Isi nomor surat, tanggal, dan perihal sesuai administrasi yayasan.',
        'Wajib ditandatangani oleh Ketua Yayasan di atas materai Rp 10.000 serta dibubuhi stempel basah yayasan.'
      ],
      kontenTemplate: `KOP SURAT BADAN HUKUM / YAYASAN
Alamat Lengkap: Jl. ................... No. ..... Desa/Kel. ................... Kec. ................... Kab. Murung Raya
Email: ...................@gmail.com | Telp/HP: 08...................

Nomor    : ....../YYS-...../....../2026                                 Puruk Cahu, ................... 2026
Lampiran : 1 (satu) Berkas Proposal
Perihal  : Permohonan Rekomendasi / Izin Operasional Pendirian Madrasah Baru (RA/MI/MTs/MA)

Kepada Yth.
Kepala Kantor Kementerian Agama Kabupaten Murung Raya
Up. Kepala Seksi Pendidikan Islam (PENDIS)
di -
    Puruk Cahu

Assalamu’alaikum Warahmatullahi Wabarakatuh,

Dengan hormat, yang bertanda tangan di bawah ini kami atas nama Pengurus Yayasan:
Nama Lengkap      : ............................................................
Jabatan           : Ketua Yayasan ............................................
NIK               : ............................................................
Alamat Domisili   : ............................................................
No. HP / WhatsApp : ............................................................

Bersama ini kami mengajukan permohonan Rekomendasi Teknis / Izin Operasional Pendirian Madrasah Baru dengan identitas sebagai berikut:
1. Nama Madrasah yang Diajukan : ............................................................
2. Jenjang Pendidikan          : [ ] RA   [ ] MI   [ ] MTs   [ ] MA
3. Alamat Lokasi Madrasah      : Jl. ................... RT/RW ...... Desa/Kel. ...................
                                 Kecamatan ................... Kabupaten Murung Raya
4. Badan Hukum Penyelenggara   : Yayasan ....................................................
5. Akta Notaris & SK Kemenkumham : No. ................... Tanggal ...................

Sebagai bahan pertimbangan dan verifikasi lapangan, bersama surat ini kami lampirkan 1 (satu) bundel dokumen persyaratan teknis dan administratif:
1. Salinan Akta Notaris dan SK Pengesahan Kemenkumham RI
2. Dokumen Proposal Studi Kelayakan Pendirian Madrasah
3. Bukti Kepemilikan Lahan/Tanah (Sertifikat/Akta Ikrar Wakaf)
4. Denah Lokasi dan Foto Sarana Prasarana (Ruang Belajar, Sanitasi, dll.)
5. Daftar Calon Pendidik dan Tenaga Kependidikan
6. Daftar Calon Peserta Didik (minimal 1 rombel)
7. Struktur Kurikulum Operasional Madrasah
8. Surat Pernyataan Kesanggupan Pembiayaan Operasional 3 Tahun (bermaterai)
9. Surat Rekomendasi Kepala Kantor Urusan Agama (KUA) setempat

Demikian surat permohonan ini kami sampaikan dengan sebenarnya. Atas perhatian, bimbingan, dan perkenan Bapak Kepala Kantor Kementerian Agama Kabupaten Murung Raya, kami ucapkan terima kasih.

Wassalamu’alaikum Warahmatullahi Wabarakatuh.

                                                  Pengurus Yayasan .................................
                                                  Ketua Yayasan,

                                                  [ MATERAI ]
                                                  [ Rp 10.000 ]
                                                  (Ttd & Stempel)

                                                  ..................................................
                                                  Nama Lengkap & Gelar`
    },
    {
      id: 'tpl-pendis-01-02',
      namaDokumen: 'Format Proposal Studi Kelayakan Pendirian Madrasah',
      syaratTerkait: 'Proposal Lengkap Studi Kelayakan Pendirian Madrasah (aspek geografis, demografis, dan sosiologis)',
      jenisFormat: 'Proposal',
      ekstensiFile: '.docx',
      ukuranFile: '78 KB',
      deskripsiSingkat: 'Sistematika penyusunan proposal studi kelayakan mencakup aspek geografis, demografis, sosiologis, dan potensi peserta didik.',
      petunjukPengisian: [
        'Lengkapi seluruh bab sistematika sesuai panduan PMA No. 90/2013 & KMA No. 1385/2020.',
        'Sertakan data rill jumlah penduduk usia sekolah di sekitar lokasi madrasah.',
        'Jelaskan keunggulan kurikulum atau program kekhususan (tahfidz/keagamaan).'
      ],
      kontenTemplate: `PROPOSAL STUDI KELAYAKAN
PENDIRIAN MADRASAH ....................................................
KABUPATEN MURUNG RAYA PROVINSI KALIMANTAN TENGAH

BAB I : PENDAHULUAN
1.1 Latar Belakang Pendirian Madrasah
1.2 Maksud dan Tujuan Pendirian
1.3 Visi, Misi, dan Tujuan Pendidikan Madrasah
1.4 Sasaran dan Target Lulusan

BAB II : PROFIL CALON MADRASAH & BADAN HUKUM PEMBINA
2.1 Identitas Calon Madrasah
2.2 Profil Yayasan / Badan Hukum Penyelenggara
2.3 Susunan Pengurus Yayasan dan Komite Pendiri

BAB III : ASPEK STUDI KELAYAKAN
3.1 Aspek Geografis (Peta lokasi, jarak dengan madrasah/sekolah sejenis di radius 3-5 km)
3.2 Aspek Demografis (Data anak usia sekolah di lingkungan sekitar)
3.3 Aspek Sosiologis & Agama (Dukungan tokoh masyarakat, tokoh agama, dan aparatur desa)
3.4 Aspek Sumber Daya Manusia (Kualifikasi Calon Guru dan Tenaga Kependidikan S-1)
3.5 Aspek Sarana & Prasarana (Ketersediaan tanah, ruang kelas, kantor, tempat ibadah, MCK)

BAB IV : RENCANA PENGEMBANGAN KURIKULUM & PEMBIAYAAN
4.1 Kurikulum yang Diterapkan (Kurikulum Kemenag / Merdeka Belajar terintegrasi kepesantrenan)
4.2 Rencana Anggaran Pendapatan dan Belanja Madrasah (RAPBM) 3 Tahun Pertama
4.3 Sumber Pendanaan Rutin Yayasan

BAB V : PENUTUP
Kesimpulan dan Rekomendasi Akhir.

Lampiran:
- Tabel Rekapitulasi Calon Siswa
- Tabel Data Pendidik
- Foto Kondisi Fisik Lahan & Bangunan`
    },
    {
      id: 'tpl-pendis-01-03',
      namaDokumen: 'Format Surat Pernyataan Kesanggupan Pembiayaan Operasional 3 Tahun',
      syaratTerkait: 'Surat Pernyataan Kesanggupan Pembiayaan Operasional Pendidikan minimal 3 (tiga) tahun bermaterai',
      jenisFormat: 'Surat Pernyataan',
      ekstensiFile: '.docx',
      ukuranFile: '38 KB',
      deskripsiSingkat: 'Surat pernyataan komitmen penyediaan dana operasional dan gaji pendidik selama minimal 3 tahun berturut-turut.',
      petunjukPengisian: [
        'Dibuat oleh Ketua Yayasan di atas materai Rp 10.000.',
        'Mencantumkan komitmen tidak menuntut bantuan operasional dari pemerintah jika belum mandiri.'
      ],
      kontenTemplate: `SURAT PERNYATAAN KESANGGUPAN PEMBIAYAAN OPERASIONAL PENDIDIKAN
Nomor: ....../SP-BIAYA/YYS/....../2026

Yang bertanda tangan di bawah ini:
Nama Lengkap      : ............................................................
Jabatan           : Ketua Yayasan ............................................
Alamat Yayasan    : ............................................................
Bertindak untuk   : Yayasan ....................................................
Penyelenggara dari: Calon Madrasah ............................................

Dengan ini menyatakan dengan sesungguhnya bahwa:
1. Yayasan kami sanggup dan bertanggung jawab penuh untuk menyediakan biaya operasional pendidikan bagi Calon Madrasah ............................................................ sekurang-kurangnya selama 3 (tiga) tahun pertama sejak izin operasional diterbitkan.
2. Sanggup memberikan honorarium / upah yang layak bagi Kepala Madrasah, Dewan Guru, dan Tenaga Kependidikan sesuai ketentuan yang disepakati.
3. Sanggup memelihara dan mengembangkan sarana prasarana pembelajaran yang representatif dan ramah anak.
4. Apabila di kemudian hari kami tidak memenuhi kesanggupan ini sehingga kegiatan belajar mengajar terbengkalai, kami bersedia menerima sanksi pencabutan izin operasional sesuai peraturan perundang-undangan.

Demikian surat pernyataan kesanggupan ini dibuat dengan sadar, penuh rasa tanggung jawab, dan tanpa ada paksaan dari pihak manapun.

Puruk Cahu, .................................. 2026
Yang Membuat Pernyataan,
Ketua Yayasan ............................................

[ MATERAI ]
[ Rp 10.000 ]
(Ttd & Stempel)

..........................................................
Nama Lengkap & Gelar`
    },
    {
      id: 'tpl-pendis-01-04',
      namaDokumen: 'Format Tabel Daftar Calon Guru & Tenaga Kependidikan',
      syaratTerkait: 'Daftar Calon Kepala Madrasah & Tenaga Pendidik (minimal 80% berkualifikasi akademik S-1 linier)',
      jenisFormat: 'Daftar Lampiran',
      ekstensiFile: '.xlsx',
      ukuranFile: '35 KB',
      deskripsiSingkat: 'Format tabel rekapitulasi data guru, ijazah terakhir, mata pelajaran yang diampu, dan status kepegawaian.',
      petunjukPengisian: [
        'Urutkan mulai dari Calon Kepala Madrasah, dilanjutkan Dewan Guru dan Staf Tata Usaha.',
        'Minimal 80% calon guru berpendidikan S-1 sesuai bidang studi.'
      ],
      kontenTemplate: `DAFTAR CALON KEPALA, PENDIDIK, DAN TENAGA KEPENDIDIKAN
CALON MADRASAH ........................................................
TAHUN PELAJARAN 2026/2027

No | Nama Lengkap & Gelar | NIK | L/P | Tempat, Tgl Lahir | Pendidikan Terakhir / Jurusan / Kampus | Mata Pelajaran Diampu | Jabatan
------------------------------------------------------------------------------------------------------------------------------------------
1  | .................... | ... | ... | ................. | S-1 PAI / IAIN Palangka Raya           | Fiqih / SKI           | Calon Kepala
2  | .................... | ... | ... | ................. | S-1 Pendidikan Matematika              | Matematika            | Guru Mapel
3  | .................... | ... | ... | ................. | S-1 Bahasa Indonesia                   | Bahasa Indonesia      | Guru Mapel
4  | .................... | ... | ... | ................. | S-1 Bahasa Arab                        | Bahasa Arab           | Guru Mapel
5  | .................... | ... | ... | ................. | S-1 PGRA / PGMI                        | Tematik               | Guru Kelas
6  | .................... | ... | ... | ................. | D-3 / S-1 Administrasi                 | Tenaga Administrasi   | Kepala TU

Mengetahui,                                                       Puruk Cahu, ................... 2026
Ketua Yayasan,                                                    Calon Kepala Madrasah,

(Ttd & Stempel)                                                   (Ttd)
.........................................                         .........................................`
    }
  ],

  // 2. IJOP PONDOK PESANTREN
  'lay-pendis-02': [
    {
      id: 'tpl-pendis-02-01',
      namaDokumen: 'Format Surat Permohonan Pendaftaran Pesantren dari Kiai/Pimpinan',
      syaratTerkait: 'Surat Permohonan Pendaftaran Pesantren dari Kiai/Pimpinan Lembaga bermaterai Rp 10.000',
      jenisFormat: 'Surat Permohonan',
      ekstensiFile: '.docx',
      ukuranFile: '40 KB',
      deskripsiSingkat: 'Surat permohonan pendaftaran keberadaan dan penerbitan izin operasional (NSPP) dari Pimpinan Pondok Pesantren.',
      petunjukPengisian: [
        'Ditandatangani oleh Kiai/Pimpinan Pesantren di atas materai Rp 10.000.',
        'Mencantumkan nama pesantren dan alamat domisili lengkap.'
      ],
      kontenTemplate: `PONDOK PESANTREN ....................................................
Alamat: Jl. ................... RT/RW ...... Desa/Kel. ................... Kec. ................... Kab. Murung Raya

Nomor    : ....../PP-...../....../2026                                 Puruk Cahu, ................... 2026
Lampiran : 1 (satu) Berkas Dokumen Persyaratan
Perihal  : Permohonan Tanda Daftar Keberadaan & Nomor Statistik Pesantren (NSPP)

Kepada Yth.
Kepala Kantor Kementerian Agama Kabupaten Murung Raya
Up. Kepala Seksi Pendidikan Islam
di -
    Puruk Cahu

Assalamu’alaikum Warahmatullahi Wabarakatuh,

Segala puji bagi Allah SWT yang senantiasa melimpahkan taufiq dan hidayah-Nya. Bersama surat ini, kami Kiai / Pengasuh Pondok Pesantren ............................................................ mengajukan permohonan pendaftaran keberadaan dan penerbitan rekomendasi Tanda Daftar Pesantren (NSPP) pada Kementerian Agama Kabupaten Murung Raya, dengan profil ringkas:

1. Nama Pondok Pesantren : Pondok Pesantren ................................................
2. Nama Kiai / Pengasuh  : ............................................................
3. Alamat Lengkap        : Jl. ................... Desa/Kel. ................... Kec. ...................
4. Tahun Berdiri         : ...................
5. Tipe Pesantren        : [ ] Salafiyah (Tradisional)   [ ] Khalafiyah (Modern)   [ ] Kombinasi
6. Jumlah Santri Mukim   : ......... orang santri (Laki-laki: ....., Perempuan: .....)

Sebagai pemenuhan rukun pesantren sesuai Undang-Undang No. 18 Tahun 2019, terlampir kami sampaikan dokumen persyaratan:
1. Profil Pesantren dan Sanad Keilmuan Kiai
2. Daftar Santri Mukim (dilengkapi fotokopi KTP/KK)
3. Surat Keterangan Domisili dari Kantor Desa / Kelurahan
4. Bukti Kepemilikan Lahan dan Fasilitas Ibadah (Masjid) serta Asrama Pemondokan
5. Silabus / Daftar Kitab Kuning yang Dikaji
6. Surat Pernyataan Komitmen Kebangsaan dan Setia pada NKRI bermaterai

Besar harapan kami agar Bapak Kepala Kantor berkenan melakukan verifikasi lapangan dan menerbitkan Rekomendasi Tanda Daftar Pesantren.

Wassalamu’alaikum Warahmatullahi Wabarakatuh.

                                                  Pengasuh Pondok Pesantren,

                                                  [ MATERAI ]
                                                  [ Rp 10.000 ]
                                                  (Ttd & Stempel)

                                                  ..................................................
                                                  Kiai / Ustadz ....................................`
    },
    {
      id: 'tpl-pendis-02-02',
      namaDokumen: 'Format Surat Pernyataan Komitmen Kebangsaan & Setia pada NKRI',
      syaratTerkait: 'Surat Pernyataan Komitmen Kebangsaan, Setia pada NKRI, Pancasila, dan UUD 1945 bermaterai',
      jenisFormat: 'Surat Pernyataan',
      ekstensiFile: '.docx',
      ukuranFile: '38 KB',
      deskripsiSingkat: 'Pernyataan wajib kesetiaan kepada Pancasila, UUD 1945, NKRI, dan Bhinneka Tunggal Ika serta anti-radikalisme.',
      petunjukPengisian: [
        'Ditandatangani di atas materai Rp 10.000 oleh Pimpinan Pesantren.',
        'Wajib dilampirkan dalam berkas pengajuan izin operasional pesantren.'
      ],
      kontenTemplate: `SURAT PERNYATAAN KOMITMEN KEBANGSAAN DAN SETIA PADA NEGARA KESATUAN REPUBLIK INDONESIA

Yang bertanda tangan di bawah ini:
Nama Lengkap      : ............................................................
Jabatan           : Pimpinan / Pengasuh Pondok Pesantren ....................
Alamat Lembaga    : ............................................................
Kabupaten         : Murung Raya, Provinsi Kalimantan Tengah

Dengan ini menyatakan dengan sungguh-sungguh dan penuh kesadaran bahwa Pondok Pesantren ............................................................:
1. Berpegang teguh dan berkomitmen mengamalkan Pancasila dan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945.
2. Menjunjung tinggi persatuan dan keutuhan Negara Kesatuan Republik Indonesia (NKRI) serta semboyan Bhinneka Tunggal Ika.
3. Mengembangkan ajaran Islam yang rahmatan lil 'alamin, moderat (wasathiyah), toleran (tasamuh), dan menghormati kemajemukan bangsa.
4. Menolak segala bentuk paham intoleransi, ekstremisme, terorisme, radikalisme, dan tindakan separatisme yang bertentangan dengan hukum dan konstitusi Republik Indonesia.
5. Sedia bekerjasama dengan Kementerian Agama RI dan Pemerintah Kabupaten Murung Raya dalam membina moral, spiritual, dan karakter generasi penerus bangsa.

Demikian surat pernyataan komitmen kebangsaan ini dibuat dengan sebenar-benarnya untuk dipergunakan sebagai persyaratan pendaftaran pesantren.

Puruk Cahu, .................................. 2026
Yang Membuat Pernyataan,
Pimpinan Pondok Pesantren,

[ MATERAI ]
[ Rp 10.000 ]
(Ttd & Stempel)

..........................................................`
    }
  ],

  // 3. IJOP LPQ & MDT
  'lay-pendis-03': [
    {
      id: 'tpl-pendis-03-01',
      namaDokumen: 'Format Surat Permohonan Tanda Daftar LPQ (TPQ/TQA) / MDT',
      syaratTerkait: 'Surat Permohonan Tanda Daftar LPQ/MDT dari Kepala Lembaga bermaterai Rp 10.000',
      jenisFormat: 'Surat Permohonan',
      ekstensiFile: '.docx',
      ukuranFile: '39 KB',
      deskripsiSingkat: 'Format permohonan pendaftaran lembaga pendidikan Al-Qur\'an untuk penerbitan Nomor Statistik LPQ/MDT.',
      petunjukPengisian: [
        'Isi data nama TPQ/TQA/MDT dan masjid/mushalla naungan.',
        'Cantumkan nomor kontak aktif kepala unit pembelajaran.'
      ],
      kontenTemplate: `LEMBAGA PENDIDIKAN AL-QUR'AN (LPQ) / MADRASAH DINIYAH TAKMILIYAH (MDT)
....................................................................................
Alamat: Masjid/Mushalla ................... Desa/Kel. ................... Kec. ................... Kab. Murung Raya

Nomor    : ....../LPQ-...../....../2026                                 Puruk Cahu, ................... 2026
Perihal  : Permohonan Tanda Daftar Lembaga & Nomor Statistik LPQ / MDT

Kepada Yth.
Kepala Kantor Kementerian Agama Kabupaten Murung Raya
Up. Seksi Pendidikan Islam
di -
    Puruk Cahu

Assalamu’alaikum Warahmatullahi Wabarakatuh,

Yang bertanda tangan di bawah ini:
Nama Lengkap      : ............................................................
Jabatan           : Kepala LPQ / MDT ............................................
Alamat            : ............................................................
No. WhatsApp      : ............................................................

Dengan ini mengajukan permohonan penerbitan Tanda Daftar dan Nomor Statistik bagi lembaga pendidikan nonformal keagamaan Islam:
- Nama Lembaga   : [ ] TPQ   [ ] TQA   [ ] Rumah Tahfidz   [ ] MDT Ula/Wustha
                    ............................................................
- Tempat Belajar : Masjid / Mushalla / Gedung ................................
- Jumlah Santri  : ......... Orang (Usia 4 - 15 Tahun)
- Jumlah Ustadz  : ......... Orang Tenaga Pengajar

Sebagai kelengkapan berkas, terlampir susunan pengurus, daftar santri, daftar guru, surat domisili desa, dan rekomendasi Kepala KUA Kecamatan.

Wassalamu’alaikum Warahmatullahi Wabarakatuh.

Kepala LPQ / MDT,

[ MATERAI Rp 10.000 ]
(Ttd & Stempel)

..................................................`
    }
  ],

  // 4. BIMAS ISLAM - MAJELIS TAKLIM
  'lay-bimas-01': [
    {
      id: 'tpl-bimas-01-01',
      namaDokumen: 'Format Surat Permohonan Surat Keterangan Terdaftar (SKT) Majelis Taklim',
      syaratTerkait: 'Surat Permohonan Pimpinan Majelis Taklim',
      jenisFormat: 'Surat Permohonan',
      ekstensiFile: '.docx',
      ukuranFile: '36 KB',
      deskripsiSingkat: 'Permohonan tanda daftar resmi majelis taklim sesuai PMA No. 29 Tahun 2019.',
      petunjukPengisian: [
        'Ditandatangani oleh Ketua dan Sekretaris Majelis Taklim.',
        'Lampirkan daftar jamaah aktif minimal 15 orang dan jadwal pengajian.'
      ],
      kontenTemplate: `MAJELIS TAKLIM ....................................................
Alamat: Masjid/Mushalla ................... RT/RW ...... Desa/Kel. ................... Kec. ...................

Nomor   : ....../MT-...../....../2026                                  Puruk Cahu, ................... 2026
Perihal : Permohonan Surat Keterangan Terdaftar (SKT) Majelis Taklim

Kepada Yth.
Kepala Kantor Kementerian Agama Kabupaten Murung Raya
Up. Seksi Bimbingan Masyarakat Islam (BIMAS ISLAM)
di -
    Puruk Cahu

Assalamu’alaikum Wr. Wb.
Dengan hormat, kami pengurus Majelis Taklim mengajukan pendaftaran:
Nama Majelis Taklim : ............................................................
Tempat Kegiatan     : Masjid / Gedung ............................................
Hari & Jam Taklim   : Hari ..................., Pukul ......... s.d. ......... WIB
Materi Kajian Utama : [ ] Fiqih   [ ] Aqidah Akhlak   [ ] Al-Qur'an   [ ] Hadits
Jumlah Jamaah Aktif : ......... orang jamaah

Terlampir kami sertakan susunan pengurus, surat domisili dari Desa/Lurah, daftar nama jamaah, dan jadwal kajian. Mohon kiranya dapat diterbitkan Surat Keterangan Terdaftar resmi.

Wassalamu’alaikum Wr. Wb.

Ketua Majelis Taklim,                                         Sekretaris,

(Ttd)                                                         (Ttd)
.........................................                     .........................................`
    }
  ],

  // 5. BIMAS ISLAM - BANTUAN RUMAH IBADAH
  'lay-bimas-02': [
    {
      id: 'tpl-bimas-02-01',
      namaDokumen: 'Format Surat Permohonan Rekomendasi Bantuan Renovasi Masjid / Mushalla',
      syaratTerkait: 'Surat Permohonan Pengurus BKM / Panitia Pembangunan',
      jenisFormat: 'Surat Permohonan',
      ekstensiFile: '.docx',
      ukuranFile: '41 KB',
      deskripsiSingkat: 'Surat permohonan rekomendasi teknis proposal bantuan dana renovasi/pembangunan rumah ibadah.',
      petunjukPengisian: [
        'Cantumkan Nomor ID SIMAS (Sistem Informasi Masjid) resmi Kemenag.',
        'Wajib dilampiri RAB dan foto kondisi fisik bangunan terkini.'
      ],
      kontenTemplate: `PENGURUS BADAN KESEJAHTERAAN MASJID (BKM) / PANITIA PEMBANGUNAN
MASJID / MUSHALLA ....................................................
Alamat: Jl. ................... Desa/Kel. ................... Kec. ................... Kab. Murung Raya

Nomor   : ....../BKM-...../....../2026                                 Puruk Cahu, ................... 2026
Perihal : Permohonan Surat Rekomendasi Bantuan Rumah Ibadah

Kepada Yth.
Kepala Kantor Kementerian Agama Kabupaten Murung Raya
di -
    Puruk Cahu

Assalamu’alaikum Wr. Wb.
Dalam rangka meningkatkan kenyamanan ibadah umat dan pemeliharaan sarana prasarana Masjid/Mushalla kami:
Nama Rumah Ibadah : Masjid / Mushalla ........................................
Nomor ID SIMAS    : 01.4...................................................... (Wajib diisi)
Alamat Lokasi     : Jl. ................... RT/RW ...... Desa ...................
Kebutuhan Usulan  : [ ] Renovasi Atap/Kubah   [ ] Tempat Wudhu/MCK   [ ] Sound System   [ ] Pembangunan Baru
Estimasi Biaya RAB: Rp ....................................................

Bersama ini kami lampirkan:
1. Salinan Susunan Pengurus BKM / Panitia Pembangunan
2. Proposal Rencana Anggaran Biaya (RAB) Lengkap
3. Foto Berwarna Kondisi Fisik Bangunan yang Akan Direnovasi
4. Surat Rekomendasi Kepala KUA Kecamatan setempat
5. Salinan Sertifikat Hak Milik / Akta Ikrar Wakaf Tanah Masjid

Mohon perkenan Bapak Kepala Kantor menerbitkan Surat Rekomendasi Bantuan.

Wassalamu’alaikum Wr. Wb.

Ketua BKM / Panitia,                                          Sekretaris,

(Ttd & Stempel)                                               (Ttd)
.........................................                     .........................................`
    }
  ],

  // 6. BIMAS ISLAM - PENGUKURAN ARAH KIBLAT
  'lay-bimas-03': [
    {
      id: 'tpl-bimas-03-01',
      namaDokumen: 'Format Surat Permohonan Kalibrasi & Penetapan Arah Kiblat',
      syaratTerkait: 'Surat Permohonan dari Pengurus BKM / Takmir Masjid',
      jenisFormat: 'Surat Permohonan',
      ekstensiFile: '.docx',
      ukuranFile: '34 KB',
      deskripsiSingkat: 'Surat permohonan kunjungan tim Badan Hisab Rukyat Kemenag untuk mengukur akurasi arah kiblat.',
      petunjukPengisian: [
        'Cantumkan nomor kontak takmir dan titik patokan bangunan.',
        'Pengukuran gratis (Rp 0,-) tanpa dipungut biaya petugas.'
      ],
      kontenTemplate: `PENGURUS TAKMIR MASJID / MUSHALLA ....................................
Alamat: ............................................................ Kec. ................... Kab. Murung Raya

Nomor   : ....../TKM-...../....../2026                                 Puruk Cahu, ................... 2026
Perihal : Permohonan Pengukuran Akurasi Arah Kiblat

Kepada Yth.
Kepala Kantor Kementerian Agama Kabupaten Murung Raya
Up. Tim Badan Hisab Rukyat (BHR) / Seksi Bimas Islam
di -
    Puruk Cahu

Assalamu’alaikum Wr. Wb.
Bersama surat ini kami mengajukan permohonan pengukuran dan penetapan arah kiblat yang akurat secara astronomis/theodolit untuk:
Nama Tempat Ibadah : Masjid / Mushalla ........................................
Rencana Kegiatan   : [ ] Kalibrasi Bangunan Sudah Ada   [ ] Penentuan Arah Kiblat Pondasi Baru
Alamat Lokasi      : Jl. ................... RT ...... Desa/Kel. ...................
Kontak Takmir (WA) : 08........................................................

Demikian permohonan ini kami sampaikan, atas bantuan Tim Hisab Rukyat Kemenag Murung Raya kami ucapkan terima kasih.

Wassalamu’alaikum Wr. Wb.
Ketua Pengurus / Takmir,

(Ttd & Stempel)
..................................................`
    }
  ],

  // 7. BIMAS ISLAM - WAKAF
  'lay-bimas-04': [
    {
      id: 'tpl-bimas-04-01',
      namaDokumen: 'Format Surat Pernyataan Tanah Wakaf Tidak Dalam Sengketa',
      syaratTerkait: 'Surat Pernyataan Tidak dalam Sengketa',
      jenisFormat: 'Surat Pernyataan',
      ekstensiFile: '.docx',
      ukuranFile: '37 KB',
      deskripsiSingkat: 'Surat jaminan hukum dari Nadzir/Wakif bahwa tanah peruntukan wakaf bebas dari tuntutan pihak lain.',
      petunjukPengisian: [
        'Dibuat di atas materai Rp 10.000.',
        'Dilampiri tanda tangan saksi-saksi dan diketahui Kepala Desa/Lurah.'
      ],
      kontenTemplate: `SURAT PERNYATAAN TANAH WAKAF TIDAK DALAM SENGKETA

Yang bertanda tangan di bawah ini:
Nama Lengkap      : ............................................................
Jabatan           : Ketua Nadzir / Wakif Tanah Wakaf ........................
NIK               : ............................................................
Alamat            : ............................................................

Dengan ini menyatakan dengan sebenar-benarnya bahwa sebidang tanah wakaf seluas ......... m² yang terletak di:
Jalan/RT/RW       : ............................................................
Desa / Kelurahan  : ............................................................
Kecamatan         : ............................................................
Peruntukan        : Masjid / Mushalla / Makam / Madrasah / Pesantren ...........
Batas-batas Tanah :
- Sebelah Utara   : Berbatasan dengan ..........................................
- Sebelah Timur   : Berbatasan dengan ..........................................
- Sebelah Selatan : Berbatasan dengan ..........................................
- Sebelah Barat   : Berbatasan dengan ..........................................

Adalah benar-benar tanah wakaf murni yang TIDAK SEDANG DALAM SENGKETA, tidak dijaminkan ke pihak bank, dan tidak ada tuntutan hukum dari pihak ahli waris manapun. Apabila pernyataan ini tidak benar, saya bersedia dituntut di hadapan hukum.

Puruk Cahu, .................................. 2026
Mengetahui,                                                     Yang Membuat Pernyataan,
Kepala Desa / Lurah ........................                    Ketua Nadzir / Wakif,

(Ttd & Stempel)                                                 [ MATERAI Rp 10.000 ]
............................................                    ............................................`
    }
  ],

  // 8. BIMAS KRISTEN - GEREJA
  'lay-kristen-01': [
    {
      id: 'tpl-kristen-01-01',
      namaDokumen: 'Format Surat Permohonan Rekomendasi Tanda Daftar Rumah Ibadat / Gereja',
      syaratTerkait: 'Surat Permohonan dari Pimpinan Sinode / Majelis Gereja',
      jenisFormat: 'Surat Permohonan',
      ekstensiFile: '.docx',
      ukuranFile: '42 KB',
      deskripsiSingkat: 'Format permohonan tanda daftar rumah ibadat gereja sesuai PBM No. 9 dan 8 Tahun 2006.',
      petunjukPengisian: [
        'Ditandatangani oleh Pendeta / Pimpinan Majelis Jemaat dan Sinode.',
        'Sertakan daftar minimal 90 jemaat pengguna dan 60 warga pendukung.'
      ],
      kontenTemplate: `GEREJA ............................................................
SINODE / BADAN HUKUM ....................................................
Alamat: Jl. ................... Desa/Kel. ................... Kec. ................... Kab. Murung Raya

Nomor   : ....../G-...../....../2026                                   Puruk Cahu, ................... 2026
Perihal : Permohonan Rekomendasi Tanda Daftar Rumah Ibadat Gereja

Kepada Yth.
Kepala Kantor Kementerian Agama Kabupaten Murung Raya
Up. Penyelenggara Bimas Kristen
di -
    Puruk Cahu

Salam Sejahtera dalam Kasih Tuhan Yesus Kristus,
Yang bertanda tangan di bawah ini kami Majelis Jemaat Gereja:
Nama Gereja       : Gereja ....................................................
Sinode Naungan    : ............................................................
Nama Gembala/Pdt. : ............................................................
Alamat Bangunan   : Jl. ................... RT ...... Desa ................... Kec. ...................
Jumlah Jemaat     : ......... Jiwa / ......... Kepala Keluarga

Dengan ini mengajukan permohonan Rekomendasi Tanda Daftar Rumah Ibadat Gereja di Kabupaten Murung Raya. Terlampir berkas kelengkapan sesuai PBM No. 9 dan 8 Tahun 2006:
1. Daftar nama dan KTP 90 jemaat pengguna disahkan Kades/Lurah
2. Daftar surat dukungan minimal 60 masyarakat setempat disahkan Kades/Lurah
3. Surat Rekomendasi FKUB Kab. Murung Raya
4. Bukti kepemilikan/hak guna tanah dan bangunan

Demikian permohonan ini kami sampaikan, kiranya menjadi pertimbangan. Terima kasih.

Majelis Jemaat / Pimpinan Gereja,
Pendeta / Gembala Jemaat,

(Ttd & Stempel)
..................................................`
    }
  ],

  // 9. BIMAS KRISTEN - ROHANIWAN
  'lay-kristen-02': [
    {
      id: 'tpl-kristen-02-01',
      namaDokumen: 'Format Surat Permohonan Keterangan Pelayanan Rohaniwan / Pendeta',
      syaratTerkait: 'Surat Permohonan dari Pimpinan Jemaat / Sinode',
      jenisFormat: 'Surat Permohonan',
      ekstensiFile: '.docx',
      ukuranFile: '35 KB',
      deskripsiSingkat: 'Surat pengajuan keterangan aktif melayani sebagai rohaniwan/pendeta di wilayah Murung Raya.',
      petunjukPengisian: [
        'Lampirkan SK penahbisan/pengangkatan dari Sinode dan fotokopi KTP/Ijazah.'
      ],
      kontenTemplate: `SURAT PERMOHONAN KETERANGAN PELAYANAN ROHANIWAN KRISTEN
Puruk Cahu, ................... 2026

Kepada Yth.
Penyelenggara Bimas Kristen Kantor Kemenag Kabupaten Murung Raya
di -
    Puruk Cahu

Dengan hormat, yang bertanda tangan di bawah ini:
Nama Lengkap      : Pdt. .......................................................
NIK               : ............................................................
Tempat/Tgl Lahir  : ............................................................
Jabatan Pelayanan : Pendeta / Pelayan Firman di Gereja ........................
Sinode / Klasis   : ............................................................
Alamat Domisili   : ............................................................

Mengajukan permohonan penerbitan Surat Keterangan Rohaniwan Aktif untuk keperluan: ............................................................
Sebagai lampiran, saya sertakan:
1. SK Pengangkatan/Penahbisan Pendeta
2. Fotokopi KTP & Ijazah Teologi Terakhir
3. Surat Keterangan Domisili Tempat Tinggal

Demikian permohonan ini kami sampaikan. Terima kasih.

Hormat saya,

(Ttd)
Pdt. ..........................................`
    }
  ],

  // 10. BIMAS HINDU - PURA / BASARAH
  'lay-hindu-01': [
    {
      id: 'tpl-hindu-01-01',
      namaDokumen: 'Format Surat Permohonan Tanda Daftar Pura / Balai Basarah',
      syaratTerkait: 'Surat Permohonan dari Pengurus Pengempon Pura / Pengurus Balai Basarah Setempat',
      jenisFormat: 'Surat Permohonan',
      ekstensiFile: '.docx',
      ukuranFile: '38 KB',
      deskripsiSingkat: 'Permohonan tanda daftar resmi Pura atau Balai Basarah Hindu Kaharingan.',
      petunjukPengisian: [
        'Ditandatangani oleh Ketua Pengurus Balai Basarah/Pura.',
        'Sertakan rekomendasi PHDI atau Majelis Besar Agama Hindu Kaharingan.'
      ],
      kontenTemplate: `PENGURUS BALAI BASARAH / PURA ........................................
Alamat: Desa/Kel. ................... Kec. ................... Kab. Murung Raya

Nomor   : ....../BB-...../....../2026                                  Puruk Cahu, ................... 2026
Perihal : Permohonan Tanda Daftar Rumah Ibadah Hindu / Kaharingan

Kepada Yth.
Kepala Kantor Kementerian Agama Kabupaten Murung Raya
Up. Penyelenggara Bimas Hindu
di -
    Puruk Cahu

Om Swastyastu,
Yang bertanda tangan di bawah ini Pengurus Rumah Ibadah:
Nama Rumah Ibadah : Balai Basarah / Pura ....................................
Nama Ketua/Basir  : ............................................................
Alamat Lokasi     : RT ...... Desa/Kel. ................... Kec. ...................
Jumlah Krama/Umat : ......... Jiwa / ......... KK

Dengan ini mengajukan permohonan penerbitan Surat Keterangan Tanda Daftar Rumah Ibadah bagi umat Hindu Kaharingan Kabupaten Murung Raya.
Terlampir kami sampaikan daftar umat, rekomendasi PHDI/Majelis Besar, bukti tanah adat/hibah, dan dokumentasi fisik bangunan.

Om Shanti Shanti Shanti Om.

Ketua Pengurus Balai Basarah / Pura,

(Ttd & Stempel)
..................................................`
    }
  ],

  // 11. KEPEGAWAIAN - CUTI ASN
  'lay-peg-01': [
    {
      id: 'tpl-peg-01-01',
      namaDokumen: 'Format Formulir Permohonan Cuti ASN (Format Resmi BKN)',
      syaratTerkait: 'Formulir Pengajuan Cuti (Format Resmi BKN)',
      jenisFormat: 'Formulir',
      ekstensiFile: '.docx',
      ukuranFile: '48 KB',
      deskripsiSingkat: 'Formulir baku permohonan cuti ASN sesuai Lampiran II Peraturan BKN No. 24 Tahun 2017.',
      petunjukPengisian: [
        'Isi data identitas ASN, jenis cuti yang diambil, dan alamat selama menjalankan cuti.',
        'Wajib ditandatangani oleh pemohon dan mendapat persetujuan atasan langsung.'
      ],
      kontenTemplate: `FORMULIR PERMOHONAN CUTI PEGAWAI NEGERI SIPIL / PPPK
(Sesuai Peraturan BKN Nomor 24 Tahun 2017)

Puruk Cahu, ................... 2026
Kepada Yth.
Kepala Kantor Kementerian Agama Kabupaten Murung Raya
melalui Atasan Langsung
di - Puruk Cahu

I. DATA PEGAWAI
1. Nama                   : ............................................................
2. NIP                    : ............................................................
3. Pangkat / Golongan     : ............................................................
4. Jabatan                : ............................................................
5. Unit Kerja             : ............................................................

II. JENIS CUTI YANG DIAMBIL
[ ] Cuti Tahunan          [ ] Cuti Sakit          [ ] Cuti Alasan Penting
[ ] Cuti Besar            [ ] Cuti Melahirkan     [ ] Cuti di Luar Tanggungan Negara

III. ALASAN CUTI
................................................................................................................

IV. LAMANYA CUTI
Selama ......... (...............) hari kerja, mulai tanggal ................... s.d. ...................

V. CATATAN CUTI TAHUN BERJALAN
- Cuti Tahun Berjalan (N)   : Sisa ...... hari
- Cuti Tahun N-1            : Sisa ...... hari

VI. ALAMAT SELAMA MENJALANKAN CUTI
Alamat : ................................................................................................
No. HP : 08...................................................

Hormat saya, Pemohon,


(Ttd)
..................................................
NIP. .............................................

VII. PERTIMBANGAN ATASAN LANGSUNG
[ ] DISETUJUI             [ ] PERUBAHAN           [ ] DITANGGUHKAN        [ ] TIDAK DISETUJUI
Atasan Langsung,


(Ttd)
..................................................
NIP. .............................................

VIII. KEPUTUSAN PEJABAT YANG BERWENANG MEMBERIKAN CUTI (KEPALA KANTOR)
[ ] DISETUJUI             [ ] PERUBAHAN           [ ] DITANGGUHKAN        [ ] TIDAK DISETUJUI`
    }
  ],

  // 12. KEPEGAWAIAN - SKMK (SURAT KETERANGAN MASIH AKTIF)
  'lay-peg-03': [
    {
      id: 'tpl-peg-03-01',
      namaDokumen: 'Format Surat Permohonan & Keterangan Masih Aktif Bekerja (SKMK)',
      syaratTerkait: 'Surat Pengantar dari Kepala Madrasah / Kepala KUA / Atasan Langsung',
      jenisFormat: 'Surat Permohonan',
      ekstensiFile: '.docx',
      ukuranFile: '36 KB',
      deskripsiSingkat: 'Format permohonan penerbitan surat keterangan masih aktif bekerja untuk keperluan perbankan, BPJS, kuliah, atau kedinasan.',
      petunjukPengisian: [
        'Cantumkan tujuan pembuatan SKMK (contoh: Kelengkapan Berkas Bank / Kuliah S-2 / Tunjangan Anak).',
        'Lampirkan fotokopi SK Pangkat/Jabatan terakhir.'
      ],
      kontenTemplate: `SURAT PERMOHONAN PENERBITAN SURAT KETERANGAN MASIH AKTIF BEKERJA (SKMK)

Kepada Yth.
Kepala Kantor Kementerian Agama Kabupaten Murung Raya
Up. Analis Kepegawaian / Kasubbag Tata Usaha
di -
    Puruk Cahu

Dengan hormat, yang bertanda tangan di bawah ini ASN Kemenag Murung Raya:
Nama Lengkap      : ............................................................
NIP               : ............................................................
Pangkat / Gol.    : ............................................................
Jabatan           : ............................................................
Unit Kerja        : [ ] Kantor Kemenag   [ ] KUA Kec. ...........   [ ] MIN/MTsN/MAN ......

Mengajukan permohonan Surat Keterangan Masih Aktif Melaksanakan Tugas (SKMK) yang akan dipergunakan untuk keperluan:
"................................................................................................"

Sebagai bukti pendukung, saya lampirkan:
1. Fotokopi SK Pangkat / Golongan Terakhir
2. Fotokopi Kartu Pegawai (Karpeg) / KTP
3. Surat Rekomendasi dari Kepala Satuan Kerja / Atasan Langsung

Demikian permohonan ini saya ajukan, atas bantuan dan kerjasamanya diucapkan terima kasih.

Puruk Cahu, .................................. 2026
Pemohon,

(Ttd)
..........................................................
NIP. .....................................................`
    }
  ],

  // 13. KEPEGAWAIAN - IZIN PENELITIAN / MAGANG
  'lay-peg-04': [
    {
      id: 'tpl-peg-04-01',
      namaDokumen: 'Format Surat Permohonan Izin Penelitian Skripsi / Magang Mahasiswa',
      syaratTerkait: 'Surat Permohonan Resmi dari Dekan / Pimpinan Perguruan Tinggi',
      jenisFormat: 'Surat Permohonan',
      ekstensiFile: '.docx',
      ukuranFile: '37 KB',
      deskripsiSingkat: 'Surat permohonan izin riset lapangan skripsi/tesis atau praktik kerja lapangan bagi mahasiswa.',
      petunjukPengisian: [
        'Gunakan kop fakultas/universitas pengirim.',
        'Sertakan judul proposal skripsi dan nama madrasah/seksi yang diteliti.'
      ],
      kontenTemplate: `KOP SURAT FAKULTAS / UNIVERSITAS ....................................
Alamat Kampus: ............................................................

Nomor   : ....../DEK-...../....../2026                                 ..................., ................... 2026
Perihal : Permohonan Izin Penelitian Skripsi / Magang Mahasiswa

Kepada Yth.
Kepala Kantor Kementerian Agama Kabupaten Murung Raya
di -
    Puruk Cahu

Dengan hormat, dalam rangka penyelesaian tugas akhir program Sarjana (S-1) / Magister (S-2) mahasiswa kami:
Nama Mahasiswa    : ............................................................
NIM               : ............................................................
Program Studi     : ............................................................
Fakultas / Univ   : ............................................................
No. HP Mahasiswa  : 08........................................................

Bermaksud melakukan penelitian lapangan dengan judul:
"................................................................................................"
Lokasi Penelitian : [ ] Kantor Kemenag Kab. Murung Raya
                    [ ] MTsN / MAN / KUA Kecamatan ............................
Waktu Pelaksanaan : Tanggal ................... s.d. ................... 2026

Terlampir proposal penelitian dan fotokopi Kartu Tanda Mahasiswa (KTM). Kami memohon perkenan Bapak Kepala Kantor dapat memberikan izin penelitian tersebut.

Dekan / Pembantu Dekan Bidang Akademik,

(Ttd & Stempel Fakultas)
..................................................
NIP/NIDN. ........................................`
    }
  ]
};

// Default generic template generator jika ada layanan dinamis / custom
export const generateDefaultTemplate = (layananNama: string, namaSyarat: string): TemplateBerkas => {
  const isSurat = namaSyarat.toLowerCase().includes('surat permohonan') || namaSyarat.toLowerCase().includes('pengantar');
  const isPernyataan = namaSyarat.toLowerCase().includes('pernyataan');
  const isProposal = namaSyarat.toLowerCase().includes('proposal');
  const isDaftar = namaSyarat.toLowerCase().includes('daftar') || namaSyarat.toLowerCase().includes('susunan');

  const jenisFormat = isPernyataan 
    ? 'Surat Pernyataan' 
    : isProposal 
    ? 'Proposal' 
    : isDaftar 
    ? 'Daftar Lampiran' 
    : isSurat 
    ? 'Surat Permohonan' 
    : 'Formulir';

  return {
    id: `tpl-auto-${Math.floor(1000 + Math.random() * 9000)}`,
    namaDokumen: `Format Standar: ${namaSyarat}`,
    syaratTerkait: namaSyarat,
    jenisFormat: jenisFormat as any,
    ekstensiFile: '.docx',
    ukuranFile: '38 KB',
    deskripsiSingkat: `Format resmi standar Kementerian Agama Kabupaten Murung Raya untuk dokumen ${namaSyarat}.`,
    petunjukPengisian: [
      'Isi titik-titik sesuai data riil pemohon / lembaga.',
      'Bubuhi tanda tangan penanggung jawab di atas materai Rp 10.000 jika berupa surat permohonan atau pernyataan.',
      'Simpan dokumen dalam format PDF atau scan dokumen asli beresolusi jelas untuk diunggah.'
    ],
    kontenTemplate: `FORMAT STANDAR DOKUMEN PERSYARATAN PTSP
KANTOR KEMENTERIAN AGAMA KABUPATEN MURUNG RAYA

DOKUMEN : ${namaSyarat.toUpperCase()}
LAYANAN : ${layananNama.toUpperCase()}

Nomor : ....../PTSP-DOC/....../2026
Tanggal : Puruk Cahu, .................................... 2026

Kepada Yth.
Kepala Kantor Kementerian Agama Kabupaten Murung Raya
di -
    Puruk Cahu

Yang bertanda tangan di bawah ini:
Nama Lengkap      : ............................................................
NIK               : ............................................................
Jabatan / Lembaga : ............................................................
Alamat Lengkap    : ............................................................
No. HP / WhatsApp : 08........................................................

Dengan ini menyampaikan dokumen "${namaSyarat}" guna memenuhi persyaratan permohonan "${layananNama}" pada Sistem Pelayanan Terpadu Satu Pintu (PTSP) Kementerian Agama Kabupaten Murung Raya.

URAIAN / DATA KELENGKAPAN:
1. ............................................................................................
2. ............................................................................................
3. ............................................................................................

Demikian dokumen format ini kami buat dengan sebenarnya dan penuh rasa tanggung jawab.

Puruk Cahu, .................................... 2026
Hormat kami,
Pemohon / Penanggung Jawab,

[ MATERAI Rp 10.000 ]
(Ttd & Stempel)

..........................................................
Nama Lengkap`
  };
};

export const getTemplatesForLayanan = (layananId: string, namaLayanan: string, dokumenSyarat: string[]): TemplateBerkas[] => {
  const existing = TEMPLATES_LAYANAN_MAP[layananId] || [];
  
  // Jika sudah ada template spesifik, kembalikan
  if (existing.length > 0) {
    return existing;
  }

  // Jika belum ada, buatkan template otomatis untuk setiap syarat utama
  return dokumenSyarat.map(syarat => generateDefaultTemplate(namaLayanan, syarat));
};

export const getTemplateForSyarat = (layananId: string, namaLayanan: string, namaSyarat: string): TemplateBerkas => {
  const existing = TEMPLATES_LAYANAN_MAP[layananId] || [];
  
  const cleanSyarat = namaSyarat.toLowerCase();
  const matched = existing.find(t => {
    const cleanTplSyarat = t.syaratTerkait.toLowerCase();
    const cleanTplNama = t.namaDokumen.toLowerCase();
    return cleanSyarat.includes(cleanTplSyarat) || 
           cleanTplSyarat.includes(cleanSyarat) ||
           cleanSyarat.includes(cleanTplNama) ||
           cleanTplNama.includes(cleanSyarat);
  });

  if (matched) {
    return matched;
  }

  return generateDefaultTemplate(namaLayanan, namaSyarat);
};

