import React, { useState, useMemo } from 'react';
import { usePTSP } from '../../context/PTSPContext';
import { Permohonan, SeksiType, BerkasDraftTTE } from '../../types/ptsp';
import { SEKSI_CONFIG } from '../../data/initialData';
import { 
  ShieldCheck, 
  KeyRound, 
  FileCheck2, 
  Printer, 
  Award, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  X, 
  Clock, 
  Paperclip, 
  Download, 
  FileText, 
  Eye,
  Filter,
  LayoutList,
  LayoutGrid,
  Building2,
  User,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';

interface PimpinanTTEViewProps {
  onPreviewOfficialDocument: (permohonan: Permohonan) => void;
}

export const PimpinanTTEView: React.FC<PimpinanTTEViewProps> = ({
  onPreviewOfficialDocument
}) => {
  const { permohonanList, eksekusiTTE } = usePTSP();
  const [selectedSigningPermohonan, setSelectedSigningPermohonan] = useState<Permohonan | null>(null);
  const [previewDraftFile, setPreviewDraftFile] = useState<{ permohonan: Permohonan; berkas: BerkasDraftTTE } | null>(null);
  const [passphraseInput, setPassphraseInput] = useState('');
  const [passphraseError, setPassphraseError] = useState('');
  const [isSigningLoading, setIsSigningLoading] = useState(false);

  // Filter & View Mode states (Daftar / Tabel as default)
  const [searchQuery, setSearchQuery] = useState('');
  const [seksiFilter, setSeksiFilter] = useState<'semua' | SeksiType>('semua');
  const [draftFilter, setDraftFilter] = useState<'semua' | 'dengan_draft' | 'tanpa_draft'>('semua');
  const [viewMode, setViewMode] = useState<'daftar' | 'kartu'>('daftar');

  // Items ready for TTE
  const listSiapTTE = useMemo(() => permohonanList.filter(p => p.status === 'siap_tte'), [permohonanList]);
  const listSudahTTE = useMemo(() => permohonanList.filter(p => p.status === 'selesai_tte'), [permohonanList]);

  // Filtered queue
  const filteredSiapTTE = useMemo(() => {
    return listSiapTTE.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        item.nomorResi.toLowerCase().includes(q) ||
        item.namaLayanan.toLowerCase().includes(q) ||
        item.perihal.toLowerCase().includes(q) ||
        item.pemohon.namaLengkap.toLowerCase().includes(q) ||
        (item.pemohon.instansiOrLembaga && item.pemohon.instansiOrLembaga.toLowerCase().includes(q));

      const matchesSeksi = seksiFilter === 'semua' || item.seksi === seksiFilter;

      const matchesDraft = 
        draftFilter === 'semua' ||
        (draftFilter === 'dengan_draft' && !!item.berkasDraftTTE) ||
        (draftFilter === 'tanpa_draft' && !item.berkasDraftTTE);

      return matchesSearch && matchesSeksi && matchesDraft;
    });
  }, [listSiapTTE, searchQuery, seksiFilter, draftFilter]);

  const handleOpenSignModal = (item: Permohonan) => {
    setSelectedSigningPermohonan(item);
    setPassphraseInput('');
    setPassphraseError('');
  };

  const handleExecuteSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSigningPermohonan) return;

    if (!passphraseInput || passphraseInput.length < 4) {
      setPassphraseError('Masukkan Passphrase TTE minimal 4 karakter (contoh: 1234 atau kemenag2026)');
      return;
    }

    setIsSigningLoading(true);

    setTimeout(() => {
      const success = eksekusiTTE(
        selectedSigningPermohonan.nomorResi,
        passphraseInput,
        'Dr. H. Hermadi, S.Ag., M.Si',
        '197004121996031001',
        'Kepala Kantor Kementerian Agama Kab. Musi Rawas'
      );

      setIsSigningLoading(false);
      if (success) {
        setSelectedSigningPermohonan(null);
      } else {
        setPassphraseError('Gagal menandatangani dokumen. Periksa passphrase Anda.');
      }
    }, 800);
  };

  // Helper badge seksi
  const renderSeksiBadge = (seksi: SeksiType) => {
    const config = SEKSI_CONFIG[seksi];
    if (!config) return null;

    const colorClasses: Record<string, string> = {
      emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      teal: 'bg-teal-50 text-teal-800 border-teal-200',
      blue: 'bg-blue-50 text-blue-800 border-blue-200',
      amber: 'bg-amber-50 text-amber-800 border-amber-200',
      indigo: 'bg-indigo-50 text-indigo-800 border-indigo-200'
    };

    const badgeClass = colorClasses[config.warna] || 'bg-slate-100 text-slate-800 border-slate-200';

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badgeClass}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
        {config.singkatan}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Pimpinan Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl border border-rose-800/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
              <ShieldCheck className="w-9 h-9 text-rose-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-400/20 text-rose-300 border border-rose-400/30">
                  Otoritas Penandatanganan Digital BSrE BSSN
                </span>
                <span className="text-xs text-rose-200 font-medium">Sertifikat Elektronik: AKTIF</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Persetujuan & Tanda Tangan Elektronik (TTE) Pimpinan
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Pejabat Penandatangan: <strong className="text-white">Dr. H. Hermadi, S.Ag., M.Si</strong> (Kepala Kantor Kementerian Agama Kab. Musi Rawas)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 text-center min-w-[110px] border border-white/10">
              <div className="text-2xl font-black text-amber-300">{listSiapTTE.length}</div>
              <div className="text-[11px] text-slate-200 font-semibold">Menunggu TTE</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 text-center min-w-[110px] border border-white/10">
              <div className="text-2xl font-black text-emerald-300">{listSudahTTE.length}</div>
              <div className="text-[11px] text-slate-200 font-semibold">Telah Di-TTE</div>
            </div>
          </div>
        </div>
      </div>

      {/* ANTREAN DOKUMEN SIAP TTE (BERUPA DAFTAR / TABEL) */}
      <div className="mb-10">
        {/* Header Bagian Antrean */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
          <div>
            <h3 className="font-black text-xl text-slate-900 tracking-tight flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <KeyRound className="w-4 h-4" />
              </span>
              <span>Daftar Antrean Dokumen Siap Ditandatangani</span>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold font-mono">
                {listSiapTTE.length} Berkas
              </span>
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Dokumen resmi yang telah diverifikasi oleh Operator PTSP dan ditelaah oleh Seksi Teknis, menunggu tanda tangan digital BSrE Kepala Kantor.
            </p>
          </div>

          {/* Toggle View Mode: Daftar (Tabel) vs Kartu */}
          <div className="flex items-center gap-2 bg-slate-200/80 p-1 rounded-xl self-start lg:self-center border border-slate-300">
            <button
              type="button"
              onClick={() => setViewMode('daftar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'daftar'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Tampilkan dalam format Daftar / Tabel Rinci"
            >
              <LayoutList className="w-3.5 h-3.5 text-rose-600" />
              <span>Daftar (Tabel)</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('kartu')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'kartu'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Tampilkan dalam format Grid Kartu"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-slate-600" />
              <span>Grid Kartu</span>
            </button>
          </div>
        </div>

        {/* Filter & Pencarian Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-4 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari no. resi, pemohon, lembaga, atau layanan..."
                className="w-full pl-10 pr-9 py-2 text-xs rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-hidden transition-all bg-slate-50/50"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Seksi */}
            <div className="md:col-span-4">
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <select
                  value={seksiFilter}
                  onChange={(e) => setSeksiFilter(e.target.value as any)}
                  className="w-full py-2 px-3 text-xs rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-hidden bg-white text-slate-700 font-medium cursor-pointer"
                >
                  <option value="semua">Semua Seksi Pengusul ({listSiapTTE.length})</option>
                  <option value="pendis">Seksi Pendidikan Islam (Pendis)</option>
                  <option value="bimas_islam">Seksi Bimas Islam</option>
                  <option value="bimas_kristen">Penyelenggara Bimas Kristen</option>
                  <option value="bimas_hindu">Penyelenggara Bimas Hindu</option>
                  <option value="kepegawaian">Subbag Tata Usaha (Kepegawaian)</option>
                </select>
              </div>
            </div>

            {/* Filter Berkas Draft Seksi */}
            <div className="md:col-span-3">
              <select
                value={draftFilter}
                onChange={(e) => setDraftFilter(e.target.value as any)}
                className="w-full py-2 px-3 text-xs rounded-xl border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-hidden bg-white text-slate-700 font-medium cursor-pointer"
              >
                <option value="semua">Semua Tipe Berkas</option>
                <option value="dengan_draft">Ada Berkas File Seksi</option>
                <option value="tanpa_draft">Format Dokumen Standar</option>
              </select>
            </div>
          </div>

          {/* Active filter count notification if filtered */}
          {(searchQuery || seksiFilter !== 'semua' || draftFilter !== 'semua') && (
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-rose-600" />
                <span>
                  Menampilkan <strong>{filteredSiapTTE.length}</strong> dari <strong>{listSiapTTE.length}</strong> dokumen antrean
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSeksiFilter('semua');
                  setDraftFilter('semua');
                }}
                className="text-[11px] font-bold text-rose-700 hover:text-rose-900 underline cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>

        {/* Content View: Mode DAFTAR (Tabel) atau KARTU */}
        {listSiapTTE.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-500 shadow-xs">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3 opacity-90" />
            <h4 className="font-bold text-base text-slate-800">Semua Antrean TTE Telah Diproses Selesai</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Saat ini tidak ada berkas permohonan yang menunggu tanda tangan elektronik Kepala Kantor. Seluruh dokumen yang disetujui telah diterbitkan dan tersimpan di riwayat.
            </p>
          </div>
        ) : filteredSiapTTE.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 shadow-xs">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-2 opacity-80" />
            <p className="font-bold text-sm text-slate-800">Tidak Ada Dokumen yang Cocok dengan Kriteria Pencarian</p>
            <p className="text-xs text-slate-500 mt-1">Silakan sesuaikan kata kunci atau ubah filter seksi di atas.</p>
          </div>
        ) : viewMode === 'daftar' ? (
          /* =========================================================================
             FORMAT DAFTAR (TABEL RESMI KEPALA KANTOR)
             ========================================================================= */
          <div className="bg-white rounded-2xl border border-rose-200/80 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-rose-950/90 to-slate-900 text-white font-bold uppercase text-[11px] tracking-wider border-b border-rose-900">
                    <th className="py-3.5 px-4 w-12 text-center">No</th>
                    <th className="py-3.5 px-4 min-w-[160px]">No. Resi & Tgl Pengajuan</th>
                    <th className="py-3.5 px-4 min-w-[200px]">Pemohon & Lembaga</th>
                    <th className="py-3.5 px-4 min-w-[240px]">Layanan & Perihal Naskah Dinas</th>
                    <th className="py-3.5 px-4 min-w-[170px]">Seksi Pengusul</th>
                    <th className="py-3.5 px-4 min-w-[170px]">Berkas Naskah Seksi</th>
                    <th className="py-3.5 px-4 min-w-[230px] text-center">Aksi Dokumen & TTE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSiapTTE.map((item, index) => (
                    <tr 
                      key={item.id} 
                      className="hover:bg-rose-50/40 transition-colors group"
                    >
                      {/* Nomor Urut */}
                      <td className="py-3.5 px-4 text-center font-bold text-slate-500 bg-slate-50/50 group-hover:bg-rose-50/60">
                        {index + 1}
                      </td>

                      {/* No. Resi & Tanggal */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="font-mono font-bold text-xs text-rose-900 bg-rose-50 px-2 py-1 rounded-md border border-rose-200 inline-block mb-1">
                          {item.nomorResi}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{item.tanggalPengajuan}</span>
                        </div>
                        <div className="mt-1">
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                            Menunggu Otorisasi TTE
                          </span>
                        </div>
                      </td>

                      {/* Pemohon & Lembaga */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{item.pemohon.namaLengkap}</span>
                        </div>
                        {item.pemohon.instansiOrLembaga ? (
                          <div className="text-blue-900 font-semibold text-[11px] mt-1 flex items-start gap-1 bg-blue-50/70 p-1.5 rounded-lg border border-blue-100">
                            <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                            <span className="leading-tight">{item.pemohon.instansiOrLembaga}</span>
                          </div>
                        ) : (
                          <div className="text-slate-400 text-[11px] italic mt-0.5">
                            Perorangan / Mandiri
                          </div>
                        )}
                        <div className="text-[10px] text-slate-500 mt-1 font-mono">
                          HP: {item.pemohon.noHpWhatsapp || '-'}
                        </div>
                      </td>

                      {/* Layanan & Perihal */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="font-bold text-slate-900 text-xs leading-snug mb-1">
                          {item.namaLayanan}
                        </div>
                        <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 italic leading-relaxed">
                          "{item.perihal}"
                        </div>
                      </td>

                      {/* Seksi Pengusul */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="mb-1.5">
                          {renderSeksiBadge(item.seksi)}
                        </div>
                        {item.catatanSeksi ? (
                          <div className="text-[10px] text-teal-900 bg-teal-50/80 p-1.5 rounded-lg border border-teal-100 leading-tight">
                            <strong className="text-teal-950 block mb-0.5">Catatan Seksi:</strong>
                            {item.catatanSeksi}
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">Telaah teknis terpenuhi</span>
                        )}
                      </td>

                      {/* Berkas Naskah Draft Seksi */}
                      <td className="py-3.5 px-4 align-top">
                        {item.berkasDraftTTE ? (
                          <div className="p-2 rounded-xl bg-teal-50 border border-teal-200 text-teal-950">
                            <div className="flex items-center gap-1.5 mb-1">
                              <FileText className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                              <span className="font-bold text-[11px] truncate max-w-[140px]" title={item.berkasDraftTTE.namaFile}>
                                {item.berkasDraftTTE.namaFile}
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-500 mb-2 font-mono">
                              {item.berkasDraftTTE.ukuranFile} • {item.berkasDraftTTE.diunggahOleh.split(' ')[0]}
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setPreviewDraftFile({ permohonan: item, berkas: item.berkasDraftTTE! })}
                                className="px-2 py-1 bg-white hover:bg-teal-100 text-teal-900 border border-teal-300 rounded-md font-bold text-[10px] flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                                title="Buka berkas naskah yang diunggah seksi"
                              >
                                <Eye className="w-3 h-3 text-teal-700" /> Buka Draft
                              </button>
                              {item.berkasDraftTTE.fileUrl && (
                                <a
                                  href={item.berkasDraftTTE.fileUrl}
                                  download={item.berkasDraftTTE.namaFile}
                                  className="p-1 bg-white hover:bg-teal-100 text-teal-800 border border-teal-300 rounded-md cursor-pointer transition-colors"
                                  title="Unduh Berkas Asli Seksi"
                                >
                                  <Download className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-[11px]">
                            <div className="flex items-center gap-1 font-medium text-slate-700 mb-0.5">
                              <FileText className="w-3.5 h-3.5 text-slate-400" />
                              <span>Format Dokumen PTSP</span>
                            </div>
                            <span className="text-[10px] text-slate-400">Naskah dinas baku Kemenag</span>
                          </div>
                        )}
                      </td>

                      {/* Aksi Dokumen & TTE */}
                      <td className="py-3.5 px-4 align-top text-center">
                        <div className="flex flex-col gap-2 max-w-[200px] mx-auto">
                          {/* Tombol Buka Dokumen Resmi */}
                          <button
                            type="button"
                            onClick={() => onPreviewOfficialDocument(item)}
                            className="w-full px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs hover:shadow-xs"
                            title="Buka dokumen naskah dinas resmi Kemenag untuk ditelaah"
                          >
                            <Eye className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Buka Dokumen</span>
                          </button>

                          {/* Tombol Eksekusi TTE */}
                          <button
                            type="button"
                            onClick={() => handleOpenSignModal(item)}
                            className="w-full px-3 py-2 bg-gradient-to-r from-rose-700 to-rose-800 hover:from-rose-800 hover:to-rose-900 text-white font-bold text-xs rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                            title="Otorisasi Tanda Tangan Elektronik BSrE"
                          >
                            <KeyRound className="w-3.5 h-3.5 text-rose-200" />
                            <span>Tandatangani (TTE)</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer info */}
            <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                <span>
                  Total antrean aktif: <strong className="text-slate-900">{filteredSiapTTE.length} dokumen</strong> siap di-TTE
                </span>
              </div>
              <div className="text-[11px] text-slate-500">
                Pemeriksaan naskah dinas dapat dilakukan dengan menekan tombol <strong>Buka Dokumen</strong> atau <strong>Buka Draft</strong>.
              </div>
            </div>
          </div>
        ) : (
          /* =========================================================================
             FORMAT KARTU (CARD GRID MODE)
             ========================================================================= */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSiapTTE.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-2xl border border-rose-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200">
                      {item.nomorResi}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {renderSeksiBadge(item.seksi)}
                      <span className="text-[11px] text-slate-500">
                        {item.tanggalPengajuan}
                      </span>
                    </div>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 mb-1">
                    {item.namaLayanan}
                  </h4>
                  <p className="text-xs text-slate-600 mb-3 italic">
                    "{item.perihal}"
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1 mb-4">
                    <div>
                      <span className="text-slate-500">Pemohon:</span>{' '}
                      <strong className="text-slate-900">{item.pemohon.namaLengkap}</strong>
                    </div>
                    {item.pemohon.instansiOrLembaga && (
                      <div>
                        <span className="text-slate-500">Lembaga:</span>{' '}
                        <span className="font-semibold text-blue-800">{item.pemohon.instansiOrLembaga}</span>
                      </div>
                    )}
                    {item.catatanSeksi && (
                      <div className="pt-1 border-t border-slate-200 text-teal-800 text-[11px]">
                        <strong>Rekomendasi Seksi:</strong> {item.catatanSeksi}
                      </div>
                    )}
                  </div>

                  {item.berkasDraftTTE && (
                    <div className="mb-4 p-2.5 rounded-xl bg-teal-50/90 border border-teal-200 text-teal-950 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-teal-200/70 text-teal-800 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-teal-200 text-teal-900">
                              Berkas Naskah Seksi
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">({item.berkasDraftTTE.ukuranFile})</span>
                          </div>
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {item.berkasDraftTTE.namaFile}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => setPreviewDraftFile({ permohonan: item, berkas: item.berkasDraftTTE! })}
                          className="px-2.5 py-1.5 bg-white border border-teal-300 hover:bg-teal-100 text-teal-900 rounded-lg font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                          title="Buka dan baca berkas naskah yang diunggah seksi"
                        >
                          <Eye className="w-3 h-3 text-teal-700" /> Buka Draft
                        </button>
                        {item.berkasDraftTTE.fileUrl && (
                          <a
                            href={item.berkasDraftTTE.fileUrl}
                            download={item.berkasDraftTTE.namaFile}
                            className="p-1.5 bg-white border border-teal-200 hover:bg-teal-100 text-teal-700 rounded-lg transition-colors cursor-pointer"
                            title="Unduh Berkas Asli"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onPreviewOfficialDocument(item)}
                    className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs hover:shadow-xs"
                    title="Buka dokumen naskah dinas resmi Kemenag untuk ditelaah"
                  >
                    <Eye className="w-3.5 h-3.5 text-emerald-700" /> Buka Dokumen
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenSignModal(item)}
                    className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <KeyRound className="w-3.5 h-3.5" /> Tandatangani Elektronik (TTE)
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Riwayat Dokumen Selesai TTE */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-black text-lg text-slate-900 tracking-tight flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <span>Riwayat Dokumen Telah Di-TTE Resmi ({listSudahTTE.length})</span>
            </h3>
            <p className="text-xs text-slate-600">
              Dokumen tersertifikasi BSrE yang sah secara hukum dan dapat divalidasi keasliannya melalui QR Code
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase">
                <tr>
                  <th className="py-3 px-4">No. Resi & No. Dokumen</th>
                  <th className="py-3 px-4">Nama Layanan & Peruntukan</th>
                  <th className="py-3 px-4">Seksi</th>
                  <th className="py-3 px-4">Tanggal & Waktu TTE</th>
                  <th className="py-3 px-4">Status Sertifikat BSrE</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {listSudahTTE.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {item.nomorResi}
                      <div className="text-[11px] text-emerald-700 font-semibold font-mono">
                        {item.tteInfo.nomorDokumen || 'Dokumen Resmi'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="font-bold text-slate-900">{item.namaLayanan}</div>
                      <div className="text-slate-500 text-[11px]">
                        Penerima: {item.pemohon.instansiOrLembaga || item.pemohon.namaLengkap}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {renderSeksiBadge(item.seksi)}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">
                      {item.tteInfo.tanggalTTE || '-'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        BSrE BSSN Sah
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {item.berkasDraftTTE?.fileUrl && (
                          <a
                            href={item.berkasDraftTTE.fileUrl}
                            download={item.berkasDraftTTE.namaFile}
                            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
                            title={`Unduh Berkas Asli Seksi (${item.berkasDraftTTE.namaFile})`}
                          >
                            <Download className="w-3.5 h-3.5" /> Draft Seksi
                          </a>
                        )}
                        <button
                          onClick={() => onPreviewOfficialDocument(item)}
                          className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <Printer className="w-3.5 h-3.5" /> Cetak Dokumen Sah
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL INPUT PASSPHRASE TTE BSRE */}
      {selectedSigningPermohonan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-rose-900 to-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                  <KeyRound className="w-5 h-5 text-rose-300" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Otorisasi Tanda Tangan Elektronik</h3>
                  <p className="text-xs text-rose-200">Balai Sertifikasi Elektronik (BSrE) - BSSN</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedSigningPermohonan(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleExecuteSign} className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div>
                  <span className="text-slate-500">Nomor Registrasi:</span>{' '}
                  <strong className="font-mono text-slate-900">{selectedSigningPermohonan.nomorResi}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Dokumen:</span>{' '}
                  <strong className="text-slate-900">{selectedSigningPermohonan.namaLayanan}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Peruntukan:</span>{' '}
                  <span className="font-semibold text-blue-800">
                    {selectedSigningPermohonan.pemohon.instansiOrLembaga || selectedSigningPermohonan.pemohon.namaLengkap}
                  </span>
                </div>
              </div>

              {/* Box Buka / Telaah Dokumen Sebelum TTE */}
              <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 text-emerald-950">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-bold text-xs flex items-center gap-1.5 text-emerald-950">
                    <Eye className="w-4 h-4 text-emerald-700" /> Telaah Dokumen Sebelum Otorisasi TTE:
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900">
                    Verifikasi Dokumen
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mb-2.5 leading-relaxed">
                  Buka dokumen naskah dinas atau berkas draft usulan seksi di bawah ini untuk memeriksa isi surat sebelum membubuhkan passphrase BSrE:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onPreviewOfficialDocument(selectedSigningPermohonan)}
                    className="px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" /> Buka Dokumen Resmi
                  </button>
                  {selectedSigningPermohonan.berkasDraftTTE ? (
                    <button
                      type="button"
                      onClick={() => setPreviewDraftFile({
                        permohonan: selectedSigningPermohonan,
                        berkas: selectedSigningPermohonan.berkasDraftTTE!
                      })}
                      className="px-3 py-2 bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                    >
                      <Eye className="w-3.5 h-3.5 text-emerald-700" /> Buka File Draft Seksi
                    </button>
                  ) : (
                    <div className="px-3 py-2 bg-white/70 border border-slate-200 text-slate-500 rounded-xl text-center text-[11px] flex items-center justify-center font-medium">
                      Naskah Format PTSP
                    </div>
                  )}
                </div>
              </div>

              {selectedSigningPermohonan.berkasDraftTTE && (
                <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-teal-950">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-[11px] flex items-center gap-1 text-teal-900">
                      <Paperclip className="w-3.5 h-3.5 text-teal-700" /> Berkas Naskah Usulan Seksi:
                    </span>
                    {selectedSigningPermohonan.berkasDraftTTE.fileUrl && (
                      <a
                        href={selectedSigningPermohonan.berkasDraftTTE.fileUrl}
                        download={selectedSigningPermohonan.berkasDraftTTE.namaFile}
                        className="text-[11px] font-bold text-teal-800 hover:text-teal-950 underline flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3 h-3" /> Unduh Berkas
                      </a>
                    )}
                  </div>
                  <div className="font-bold text-xs text-slate-900 truncate">
                    {selectedSigningPermohonan.berkasDraftTTE.namaFile}
                  </div>
                  <div className="text-[10px] text-slate-600 mt-0.5">
                    Ukuran: {selectedSigningPermohonan.berkasDraftTTE.ukuranFile} • Diunggah oleh: {selectedSigningPermohonan.berkasDraftTTE.diunggahOleh} ({selectedSigningPermohonan.berkasDraftTTE.waktuUnggah})
                  </div>
                </div>
              )}

              {/* Passphrase Input */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Masukkan Passphrase / PIN Keamanan TTE:
                </label>
                <input
                  type="password"
                  value={passphraseInput}
                  onChange={(e) => {
                    setPassphraseInput(e.target.value);
                    setPassphraseError('');
                  }}
                  placeholder="Ketik passphrase pejabat (contoh: kemenag2026 atau 1234)"
                  className="w-full p-3 rounded-xl border border-slate-300 focus:border-rose-600 focus:ring-2 focus:ring-rose-600/20 text-sm font-mono outline-hidden"
                  autoFocus
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  *Untuk demonstrasi pengujian, Anda dapat memasukkan PIN bebas minimal 4 karakter (misal: 1234 atau kemenag2026).
                </p>
                {passphraseError && (
                  <p className="text-xs text-rose-600 font-bold mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {passphraseError}
                  </p>
                )}
              </div>

              {/* Legal Notice */}
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-rose-950 text-[11px] leading-relaxed">
                <strong>Pernyataan Hukum:</strong> Dokumen elektronik ini memiliki kekuatan hukum yang sah dan mengikat sesuai Undang-Undang ITE Nomor 11 Tahun 2008 dan PP Nomor 71 Tahun 2019 tentang Penyelenggaraan Sistem dan Transaksi Elektronik.
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedSigningPermohonan(null)}
                  className="px-4 py-2 font-bold text-slate-600 hover:text-slate-800 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSigningLoading}
                  className="px-6 py-2.5 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all hover:shadow-lg"
                >
                  {isSigningLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Menandatangani...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" /> Tandatangani Sekarang
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL BUKA FILE DRAFT DARI SEKSI UNTUK KEPALA KANTOR */}
      {previewDraftFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-3 sm:p-5 animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 my-auto max-h-[94vh] flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white p-4 px-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                  <FileText className="w-5 h-5 text-teal-300" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <span>Telaah Berkas Naskah Usulan Seksi</span>
                    <span className="text-[10px] bg-teal-500/30 text-teal-200 px-2 py-0.5 rounded-full font-mono">
                      {previewDraftFile.permohonan.nomorResi}
                    </span>
                  </h3>
                  <p className="text-xs text-teal-200">
                    {previewDraftFile.berkas.namaFile} ({previewDraftFile.berkas.ukuranFile})
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setPreviewDraftFile(null)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white cursor-pointer"
                title="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-header info */}
            <div className="bg-slate-50 border-b border-slate-200 p-4 px-6 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <div>
                  <span className="text-slate-500">Layanan:</span>{' '}
                  <strong className="text-slate-900">{previewDraftFile.permohonan.namaLayanan}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Pemohon / Lembaga:</span>{' '}
                  <span className="font-semibold text-blue-800">
                    {previewDraftFile.permohonan.pemohon.instansiOrLembaga || previewDraftFile.permohonan.pemohon.namaLengkap}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">Diunggah oleh:</span>{' '}
                  <span className="font-semibold text-teal-900">{previewDraftFile.berkas.diunggahOleh}</span>
                  <span className="text-slate-400"> pada {previewDraftFile.berkas.waktuUnggah}</span>
                </div>
              </div>

              {previewDraftFile.berkas.fileUrl && (
                <a
                  href={previewDraftFile.berkas.fileUrl}
                  download={previewDraftFile.berkas.namaFile}
                  className="px-3.5 py-2 bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-300 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-teal-700" /> Unduh Berkas Asli
                </a>
              )}
            </div>

            {/* Document Content Viewer */}
            <div className="p-4 sm:p-6 overflow-y-auto bg-slate-100 flex-1 flex flex-col min-h-[480px]">
              {previewDraftFile.berkas.fileUrl ? (
                previewDraftFile.berkas.tipeFile?.includes('image') || previewDraftFile.berkas.fileUrl.startsWith('data:image') ? (
                  <div className="flex-1 flex items-center justify-center p-4 bg-white rounded-2xl border border-slate-300 shadow-xs">
                    <img
                      src={previewDraftFile.berkas.fileUrl}
                      alt={previewDraftFile.berkas.namaFile}
                      className="max-h-[500px] object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <iframe
                    src={previewDraftFile.berkas.fileUrl}
                    title="Pratinjau File Draft Seksi"
                    className="w-full flex-1 min-h-[500px] rounded-2xl border border-slate-300 bg-white shadow-xs"
                  />
                )
              ) : (
                <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 my-auto">
                  <FileText className="w-12 h-12 text-teal-600 mx-auto mb-2 opacity-80" />
                  <p className="font-bold text-sm text-slate-800">Berkas Naskah Draft Telah Diunggah</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Format: {previewDraftFile.berkas.tipeFile} • Ukuran: {previewDraftFile.berkas.ukuranFile}
                  </p>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-4 px-6 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setPreviewDraftFile(null)}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 font-bold text-xs cursor-pointer"
              >
                Tutup Pratinjau
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const item = previewDraftFile.permohonan;
                    setPreviewDraftFile(null);
                    onPreviewOfficialDocument(item);
                  }}
                  className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-emerald-700" /> Buka Format Dokumen Kemenag
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const item = previewDraftFile.permohonan;
                    setPreviewDraftFile(null);
                    handleOpenSignModal(item);
                  }}
                  className="px-5 py-2 bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5" /> Lanjutkan ke Otorisasi TTE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
