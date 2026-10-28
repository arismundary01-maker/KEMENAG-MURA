import React, { useState } from 'react';
import { usePTSP } from '../../context/PTSPContext';
import { SEKSI_CONFIG } from '../../data/initialData';
import { Permohonan, SeksiType, StatusPermohonan, DokumenPersyaratan } from '../../types/ptsp';
import { 
  FileCheck2, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Clock, 
  User, 
  Phone, 
  MapPin, 
  Building, 
  FileText, 
  Printer, 
  XCircle, 
  Check, 
  X, 
  Send,
  Eye,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface OperatorPTSPViewProps {
  onPrintReceipt: (permohonan: Permohonan) => void;
  onPreviewOfficialDocument: (permohonan: Permohonan) => void;
}

export const OperatorPTSPView: React.FC<OperatorPTSPViewProps> = ({ 
  onPrintReceipt,
  onPreviewOfficialDocument
}) => {
  const { 
    permohonanList, 
    operatorValidasiBerkas, 
    setSelectedTrackingResi, 
    setActiveView 
  } = usePTSP();

  const [filterStatus, setFilterStatus] = useState<string>('semua');
  const [filterSeksi, setFilterSeksi] = useState<string>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected permohonan for active verification
  const [activeModalPermohonan, setActiveModalPermohonan] = useState<Permohonan | null>(null);
  const [checklistDokumen, setChecklistDokumen] = useState<DokumenPersyaratan[]>([]);
  const [catatanOperator, setCatatanOperator] = useState('');
  const [actionConfirmMode, setActionConfirmMode] = useState<'disposisi' | 'revisi' | 'tolak' | null>(null);

  // Statistics
  const countPending = permohonanList.filter(p => p.status === 'diajukan' || p.status === 'verifikasi_operator').length;
  const countRevisi = permohonanList.filter(p => p.status === 'perlu_revisi').length;
  const countDisposisi = permohonanList.filter(p => p.status === 'disposisi_seksi' || p.status === 'telaah_seksi').length;
  const countSiapTTE = permohonanList.filter(p => p.status === 'siap_tte').length;
  const countSelesai = permohonanList.filter(p => p.status === 'selesai_tte').length;

  const handleOpenVerifyModal = (item: Permohonan) => {
    setActiveModalPermohonan(item);
    setChecklistDokumen(item.dokumenList.map(d => ({ ...d })));
    setCatatanOperator(item.catatanOperator || '');
    setActionConfirmMode(null);
  };

  const handleToggleDocStatus = (docId: string, status: 'valid' | 'tidak_valid') => {
    setChecklistDokumen(prev => prev.map(d => {
      if (d.id !== docId) return d;
      return {
        ...d,
        status: d.status === status ? 'unggah' : status
      };
    }));
  };

  const handleDocNoteChange = (docId: string, catatan: string) => {
    setChecklistDokumen(prev => prev.map(d => {
      if (d.id !== docId) return d;
      return { ...d, catatan };
    }));
  };

  const handleExecuteAction = (status: 'disposisi_seksi' | 'perlu_revisi' | 'ditolak') => {
    if (!activeModalPermohonan) return;

    operatorValidasiBerkas(
      activeModalPermohonan.nomorResi,
      status,
      catatanOperator,
      checklistDokumen
    );

    setActiveModalPermohonan(null);
  };

  // Filter items
  const filteredList = permohonanList.filter(item => {
    const matchStatus = filterStatus === 'semua' || item.status === filterStatus;
    const matchSeksi = filterSeksi === 'semua' || item.seksi === filterSeksi;
    const q = searchQuery.toLowerCase();
    const matchSearch = !searchQuery || 
      item.nomorResi.toLowerCase().includes(q) ||
      item.pemohon.namaLengkap.toLowerCase().includes(q) ||
      item.namaLayanan.toLowerCase().includes(q) ||
      (item.pemohon.instansiOrLembaga && item.pemohon.instansiOrLembaga.toLowerCase().includes(q));

    return matchStatus && matchSeksi && matchSearch;
  });

  const getStatusBadge = (status: StatusPermohonan) => {
    switch (status) {
      case 'diajukan':
      case 'verifikasi_operator':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800 border border-blue-200">Menunggu Verifikasi</span>;
      case 'perlu_revisi':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-800 border border-amber-200">Perlu Revisi</span>;
      case 'disposisi_seksi':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-teal-100 text-teal-800 border border-teal-200">Disposisi ke Seksi</span>;
      case 'telaah_seksi':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-teal-100 text-teal-800 border border-teal-200">Telaah Seksi</span>;
      case 'siap_tte':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-purple-100 text-purple-800 border border-purple-200">Siap TTE</span>;
      case 'selesai_tte':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">TTE Sah (Selesai)</span>;
      case 'ditolak':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-rose-100 text-rose-800 border border-rose-200">Ditolak</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Banner / Operator Identity */}
      <div className="bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-xl border border-blue-800/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
              <FileCheck2 className="w-8 h-8 text-blue-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-400/20 text-blue-300 border border-blue-400/30">
                  Front Office PTSP Kemenag Mura
                </span>
                <span className="text-xs text-blue-200">Petugas: Rahmat Hidayat, A.Md</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Menu Pemrosesan & Validasi Berkas Masuk
              </h1>
              <p className="text-xs sm:text-sm text-blue-100 mt-1">
                Lakukan verifikasi kelengkapan berkas pemohon, checklist dokumen persyaratan, dan disposisi terpadu ke seksi terkait.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-white/10 text-xs font-mono text-blue-200 border border-white/10">
              Antrean Masuk: <strong className="text-white">{countPending}</strong> Berkas
            </span>
          </div>
        </div>

        {/* Counter cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <div className="text-xl font-black text-white">{countPending}</div>
            <div className="text-[11px] text-blue-200">Antrean Verifikasi</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <div className="text-xl font-black text-amber-300">{countRevisi}</div>
            <div className="text-[11px] text-blue-200">Menunggu Revisi</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <div className="text-xl font-black text-teal-300">{countDisposisi}</div>
            <div className="text-[11px] text-blue-200">Sedang di Seksi</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <div className="text-xl font-black text-purple-300">{countSiapTTE}</div>
            <div className="text-[11px] text-blue-200">Siap TTE Pimpinan</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center col-span-2 sm:col-span-1">
            <div className="text-xl font-black text-emerald-300">{countSelesai}</div>
            <div className="text-[11px] text-blue-200">TTE Terbit (Selesai)</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari Resi, Nama Pemohon, atau Instansi..."
            className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-hidden font-medium"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-700 focus:outline-hidden"
          >
            <option value="semua">Semua Status</option>
            <option value="verifikasi_operator">Menunggu Verifikasi</option>
            <option value="perlu_revisi">Perlu Revisi</option>
            <option value="disposisi_seksi">Disposisi ke Seksi</option>
            <option value="telaah_seksi">Telaah Seksi</option>
            <option value="siap_tte">Siap TTE</option>
            <option value="selesai_tte">Selesai (TTE Sah)</option>
          </select>

          {/* Seksi Filter */}
          <select
            value={filterSeksi}
            onChange={(e) => setFilterSeksi(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-700 focus:outline-hidden"
          >
            <option value="semua">Semua Seksi</option>
            <option value="kepegawaian">Subbag TU (Kepegawaian)</option>
            <option value="pendis">Seksi Pendis</option>
            <option value="bimas_islam">Bimas Islam</option>
            <option value="bimas_kristen">Bimas Kristen</option>
            <option value="bimas_hindu">Bimas Hindu</option>
          </select>

          <span className="text-xs text-slate-500 font-medium">
            ({filteredList.length} berkas)
          </span>
        </div>
      </div>

      {/* Main Table List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">No. Resi & Tanggal</th>
                <th className="py-3.5 px-4">Layanan & Seksi</th>
                <th className="py-3.5 px-4">Pemohon / Instansi</th>
                <th className="py-3.5 px-4">Status & Progres</th>
                <th className="py-3.5 px-4 text-right">Aksi Operator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    Tidak ada berkas yang sesuai dengan kriteria pencarian
                  </td>
                </tr>
              ) : (
                filteredList.map((item) => {
                  const seksiInfo = SEKSI_CONFIG[item.seksi];
                  const isActionable = item.status === 'diajukan' || item.status === 'verifikasi_operator';

                  return (
                    <tr 
                      key={item.id}
                      className="hover:bg-blue-50/40 transition-colors"
                    >
                      {/* No Resi */}
                      <td className="py-3.5 px-4 font-mono">
                        <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                          {item.nomorResi}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {item.tanggalPengajuan}
                        </div>
                      </td>

                      {/* Layanan */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <span className="inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 mb-1">
                          {seksiInfo.singkatan}
                        </span>
                        <div className="font-bold text-slate-900 line-clamp-1">{item.namaLayanan}</div>
                        <div className="text-[11px] text-slate-500 line-clamp-1">{item.perihal}</div>
                      </td>

                      {/* Pemohon */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{item.pemohon.namaLengkap}</div>
                        {item.pemohon.instansiOrLembaga && (
                          <div className="text-[11px] text-blue-700 font-semibold">{item.pemohon.instansiOrLembaga}</div>
                        )}
                        <div className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" /> {item.pemohon.noHpWhatsapp}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <div className="mb-1">{getStatusBadge(item.status)}</div>
                        <div className="text-[11px] text-slate-500">
                          {item.dokumenList.filter(d => d.status === 'valid').length} dari {item.dokumenList.length} dokumen valid
                        </div>
                      </td>

                      {/* Aksi */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Print Receipt Slip */}
                          <button
                            onClick={() => onPrintReceipt(item)}
                            title="Cetak Tanda Terima Berkas PTSP"
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-blue-800 transition-colors cursor-pointer"
                          >
                            <Printer className="w-4 h-4" />
                          </button>

                          {/* Preview Official Document if TTE Finished */}
                          {item.status === 'selesai_tte' && (
                            <button
                              onClick={() => onPreviewOfficialDocument(item)}
                              title="Lihat Dokumen Hasil Layanan Ber-TTE"
                              className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors cursor-pointer"
                            >
                              <FileText className="w-4 h-4" />
                            </button>
                          )}

                          {/* Process / Verify Button */}
                          <button
                            onClick={() => handleOpenVerifyModal(item)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                              isActionable 
                                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs' 
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                            }`}
                          >
                            {isActionable ? (
                              <>
                                <FileCheck2 className="w-3.5 h-3.5" /> Proses Berkas
                              </>
                            ) : (
                              <>
                                <Eye className="w-3.5 h-3.5" /> Detail Berkas
                              </>
                            )}
                          </button>
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

      {/* MODAL VERIFIKASI DOKUMEN OPERATOR */}
      {activeModalPermohonan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-blue-900 text-white p-5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold bg-blue-800 px-2.5 py-0.5 rounded">
                    {activeModalPermohonan.nomorResi}
                  </span>
                  <span className="text-xs text-blue-200">
                    Seksi: {SEKSI_CONFIG[activeModalPermohonan.seksi].nama}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-white">
                  Verifikasi & Validasi Dokumen Persyaratan
                </h3>
              </div>
              <button 
                onClick={() => setActiveModalPermohonan(null)}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Applicant Info Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">Nama Pemohon / Instansi:</span>
                  <p className="font-bold text-slate-900 text-sm">{activeModalPermohonan.pemohon.namaLengkap}</p>
                  {activeModalPermohonan.pemohon.instansiOrLembaga && (
                    <p className="text-blue-700 font-semibold">{activeModalPermohonan.pemohon.instansiOrLembaga}</p>
                  )}
                  <p className="text-slate-600 mt-1 font-mono">NIK: {activeModalPermohonan.pemohon.nik}</p>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Kontak & Alamat:</span>
                  <p className="text-slate-800">WhatsApp: <strong className="font-mono">{activeModalPermohonan.pemohon.noHpWhatsapp}</strong></p>
                  <p className="text-slate-600">{activeModalPermohonan.pemohon.alamat}, Kec. {activeModalPermohonan.pemohon.kecamatan}</p>
                  <p className="text-slate-700 mt-1 italic">"{activeModalPermohonan.perihal}"</p>
                </div>
              </div>

              {/* Checklist Dokumen Masuk */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sm text-slate-900">
                    Checklist Dokumen Masuk ({checklistDokumen.length} Berkas)
                  </h4>
                  <span className="text-xs text-slate-500">
                    Beri tanda valid untuk berkas yang telah sesuai regulasi
                  </span>
                </div>

                <div className="space-y-3">
                  {checklistDokumen.map((doc, idx) => (
                    <div 
                      key={doc.id}
                      className={`p-3.5 rounded-xl border transition-all ${
                        doc.status === 'valid'
                          ? 'border-emerald-300 bg-emerald-50/50'
                          : doc.status === 'tidak_valid'
                          ? 'border-rose-300 bg-rose-50/50'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <div>
                            <p className="font-bold text-xs text-slate-900">{doc.nama}</p>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                              <span className="font-mono text-blue-700">{doc.namaFile || 'Berkas_Digital.pdf'}</span>
                              <span>•</span>
                              <span>{doc.ukuranFile || '1.2 MB'}</span>
                              {doc.wajib && (
                                <span className="text-[10px] text-rose-600 font-bold">Wajib</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Status Toggle Buttons */}
                        <div className="flex items-center gap-1.5 self-end sm:self-center">
                          <button
                            type="button"
                            onClick={() => handleToggleDocStatus(doc.id, 'valid')}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                              doc.status === 'valid'
                                ? 'bg-emerald-600 text-white shadow-2xs'
                                : 'bg-slate-100 hover:bg-emerald-100 text-slate-700'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" /> Valid
                          </button>

                          <button
                            type="button"
                            onClick={() => handleToggleDocStatus(doc.id, 'tidak_valid')}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                              doc.status === 'tidak_valid'
                                ? 'bg-rose-600 text-white shadow-2xs'
                                : 'bg-slate-100 hover:bg-rose-100 text-slate-700'
                            }`}
                          >
                            <X className="w-3.5 h-3.5" /> Butuh Perbaikan
                          </button>
                        </div>
                      </div>

                      {/* Notes if invalid */}
                      {doc.status === 'tidak_valid' && (
                        <div className="mt-2.5 pt-2 border-t border-rose-200">
                          <label className="text-[11px] font-bold text-rose-800 block mb-1">
                            Catatan Perbaikan untuk Pemohon:
                          </label>
                          <input
                            type="text"
                            value={doc.catatan || ''}
                            onChange={(e) => handleDocNoteChange(doc.id, e.target.value)}
                            placeholder="Contoh: Dokumen buram, harap pindai ulang dengan resolusi lebih tajam"
                            className="w-full text-xs p-2 rounded-lg bg-white border border-rose-300 focus:outline-hidden focus:ring-1 focus:ring-rose-500"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Catatan Keseluruhan Operator */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Catatan Verifikasi Front Office PTSP:
                </label>
                <textarea
                  rows={3}
                  value={catatanOperator}
                  onChange={(e) => setCatatanOperator(e.target.value)}
                  placeholder="Tuliskan catatan verifikasi, rekomendasi disposisi, atau keterangan revisi untuk pemohon..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-hidden"
                />
              </div>
            </div>

            {/* Modal Footer with Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setActiveModalPermohonan(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 cursor-pointer"
              >
                Batal
              </button>

              <div className="flex items-center gap-2">
                {/* Revisi button */}
                <button
                  type="button"
                  onClick={() => handleExecuteAction('perlu_revisi')}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" /> Kembalikan (Perlu Revisi)
                </button>

                {/* Reject button */}
                <button
                  type="button"
                  onClick={() => handleExecuteAction('ditolak')}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <XCircle className="w-4 h-4" /> Tolak Berkas
                </button>

                {/* Disposisi button */}
                <button
                  type="button"
                  onClick={() => handleExecuteAction('disposisi_seksi')}
                  className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Valid & Disposisi ke Seksi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
