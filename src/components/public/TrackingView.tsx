import React, { useState } from 'react';
import { usePTSP } from '../../context/PTSPContext';
import { SEKSI_CONFIG } from '../../data/initialData';
import { Permohonan, StatusPermohonan } from '../../types/ptsp';
import { 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Printer, 
  Download, 
  ShieldCheck, 
  QrCode, 
  MapPin, 
  User, 
  Building, 
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface TrackingViewProps {
  onPrintReceipt: (permohonan: Permohonan) => void;
  onPreviewOfficialDocument: (permohonan: Permohonan) => void;
  onOpenValidatorModal: () => void;
}

export const TrackingView: React.FC<TrackingViewProps> = ({
  onPrintReceipt,
  onPreviewOfficialDocument,
  onOpenValidatorModal
}) => {
  const { permohonanList, selectedTrackingResi, setSelectedTrackingResi } = usePTSP();
  const [searchInput, setSearchInput] = useState(selectedTrackingResi || '');

  // Find active permohonan
  const targetResi = selectedTrackingResi || searchInput;
  const currentItem = permohonanList.find(
    p => p.nomorResi.toUpperCase() === targetResi.toUpperCase().trim()
  ) || permohonanList[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setSelectedTrackingResi(searchInput.trim().toUpperCase());
  };

  const getStepActiveIndex = (status: StatusPermohonan) => {
    switch (status) {
      case 'diajukan': return 1;
      case 'verifikasi_operator': return 2;
      case 'perlu_revisi': return 2; // Stalled at operator check
      case 'disposisi_seksi': return 3;
      case 'telaah_seksi': return 4;
      case 'siap_tte': return 5;
      case 'selesai_tte': return 6;
      case 'ditolak': return 2;
    }
  };

  const currentStep = getStepActiveIndex(currentItem.status);
  const seksiInfo = SEKSI_CONFIG[currentItem.seksi];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Search Bar & Header */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-xl border border-emerald-800/40">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1">
            Pelacakan Status Berkas Real-time
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            Lacak Status Permohonan PTSP Online
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 mb-6">
            Pantau posisi berkas permohonan Anda secara transparan dari front office hingga penerbitan dokumen bertanda tangan elektronik.
          </p>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2 max-w-lg mx-auto">
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Masukkan Nomor Resi (misal: PTSP-MURA-2026-0038)"
                className="w-full text-xs sm:text-sm pl-10 pr-3 py-2.5 rounded-xl bg-white text-slate-900 border border-emerald-300 focus:outline-hidden font-bold font-mono"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
            >
              Cari Berkas
            </button>
          </form>

          {/* Quick Resi Selector */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] text-emerald-200">
            <span>Pilih Cepat Demo:</span>
            {permohonanList.slice(0, 4).map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setSelectedTrackingResi(p.nomorResi);
                  setSearchInput(p.nomorResi);
                }}
                className={`px-2 py-0.5 rounded-md font-mono transition-colors cursor-pointer ${
                  currentItem.nomorResi === p.nomorResi
                    ? 'bg-amber-400 text-emerald-950 font-bold'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {p.nomorResi} ({p.status === 'selesai_tte' ? 'TTE Sah' : p.status})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Tracking Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Visual Stepper & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card Status Utama */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <span className="text-[11px] font-mono font-bold text-slate-500 block">
                  NOMOR RESI PERMOHONAN:
                </span>
                <h2 className="text-xl font-black font-mono text-emerald-900">
                  {currentItem.nomorResi}
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Tanggal Pengajuan: <strong className="text-slate-900 font-mono">{currentItem.tanggalPengajuan}</strong>
                </p>
              </div>

              {/* Status Badge */}
              <div>
                <span className={`px-3 py-1.5 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 shadow-2xs ${
                  currentItem.status === 'selesai_tte' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                  currentItem.status === 'siap_tte' ? 'bg-purple-100 text-purple-800 border border-purple-300' :
                  currentItem.status === 'perlu_revisi' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                  'bg-blue-100 text-blue-800 border border-blue-200'
                }`}>
                  {currentItem.status === 'selesai_tte' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Dokumen Sah Ber-TTE (Selesai)
                    </>
                  ) : currentItem.status === 'siap_tte' ? (
                    <>
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      Menunggu TTE Kepala Kantor
                    </>
                  ) : currentItem.status === 'perlu_revisi' ? (
                    <>
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      Perlu Perbaikan Dokumen
                    </>
                  ) : (
                    <>
                      <Clock className="w-4 h-4 text-blue-600" />
                      Sedang Diproses ({currentItem.status})
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Visual Stepper */}
            <div className="py-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Progres Tahapan Pelayanan PTSP
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
                {[
                  { step: 1, title: 'Diajukan', desc: 'Daftar Online' },
                  { step: 2, title: 'Front Office', desc: 'Verifikasi Berkas' },
                  { step: 3, title: 'Disposisi', desc: 'Kasi / Seksi' },
                  { step: 4, title: 'Telaah', desc: 'Draft Naskah' },
                  { step: 5, title: 'Siap TTE', desc: 'Otorisasi' },
                  { step: 6, title: 'Selesai', desc: 'Dokumen Terbit' }
                ].map((s) => {
                  const isDone = currentStep >= s.step;
                  const isCurrent = currentStep === s.step;
                  return (
                    <div 
                      key={s.step}
                      className={`p-2.5 rounded-xl border transition-all ${
                        isDone 
                          ? 'border-emerald-300 bg-emerald-50/70 text-emerald-950' 
                          : 'border-slate-200 bg-slate-50 text-slate-400'
                      } ${isCurrent ? 'ring-2 ring-emerald-600/40 shadow-xs' : ''}`}
                    >
                      <div className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center font-bold text-[11px] mb-1 ${
                        isDone ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                      }`}>
                        {isDone ? '✓' : s.step}
                      </div>
                      <div className="font-bold text-[11px] truncate">{s.title}</div>
                      <div className="text-[10px] text-slate-500 truncate">{s.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons for Applicant */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => onPrintReceipt(currentItem)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-800 hover:bg-slate-50 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                Cetak Tanda Terima / Resi PTSP
              </button>

              {currentItem.status === 'selesai_tte' && (
                <button
                  onClick={() => onPreviewOfficialDocument(currentItem)}
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Unduh Dokumen Ber-TTE Sah (PDF)
                </button>
              )}
            </div>
          </div>

          {/* History Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <h3 className="font-black text-base text-slate-900 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-700" />
              Catatan Riwayat & Log Pelayanan (Audit Trail)
            </h3>

            <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {currentItem.history.map((hist, idx) => (
                <div key={hist.id} className="relative pl-8 text-xs">
                  {/* Dot */}
                  <span className={`absolute left-1.5 top-1 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-white ${
                    idx === currentItem.history.length - 1 ? 'bg-emerald-600 ring-4 ring-emerald-100' : 'bg-slate-400'
                  }`} />

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <h4 className="font-bold text-slate-900 text-xs">{hist.judul}</h4>
                      <span className="text-[10px] font-mono text-slate-500">{hist.waktu}</span>
                    </div>

                    <p className="text-slate-600 text-xs mb-1.5">{hist.keterangan}</p>
                    
                    <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-2">
                      <span>Oleh: <strong className="text-slate-800">{hist.aktor}</strong></span>
                    </div>

                    {hist.catatan && (
                      <div className="mt-2 p-2 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-[11px]">
                        <strong>Catatan:</strong> {hist.catatan}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Detail Info, Dokumen & TTE Status */}
        <div className="space-y-6">
          {/* Info Pemohon & Layanan */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs text-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-100">
              Detail Layanan & Pemohon
            </h3>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Nama Layanan:</span>
              <p className="font-bold text-slate-900 mt-0.5">{currentItem.namaLayanan}</p>
              <p className="text-emerald-800 text-[11px] font-semibold">Seksi: {seksiInfo.nama}</p>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Pemohon:</span>
              <p className="font-bold text-slate-900 mt-0.5">{currentItem.pemohon.namaLengkap}</p>
              {currentItem.pemohon.instansiOrLembaga && (
                <p className="text-blue-700 font-semibold">{currentItem.pemohon.instansiOrLembaga}</p>
              )}
              <p className="text-slate-500 font-mono mt-0.5">NIK: {currentItem.pemohon.nik}</p>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Kontak & Alamat:</span>
              <p className="text-slate-700 font-mono">{currentItem.pemohon.noHpWhatsapp}</p>
              <p className="text-slate-600 mt-0.5">{currentItem.pemohon.alamat}, Kec. {currentItem.pemohon.kecamatan}</p>
            </div>

            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Perihal:</span>
              <p className="text-slate-800 italic mt-0.5">"{currentItem.perihal}"</p>
            </div>
          </div>

          {/* Dokumen Persyaratan Checklist */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs text-xs">
            <h3 className="font-bold text-sm text-slate-900 mb-3 pb-2 border-b border-slate-100">
              Dokumen Persyaratan ({currentItem.dokumenList.length})
            </h3>

            <div className="space-y-2">
              {currentItem.dokumenList.map((doc, idx) => (
                <div 
                  key={doc.id}
                  className={`p-2.5 rounded-xl border flex items-start gap-2 ${
                    doc.status === 'valid' ? 'bg-emerald-50/60 border-emerald-200' :
                    doc.status === 'tidak_valid' ? 'bg-rose-50/60 border-rose-200' :
                    'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 ${
                    doc.status === 'valid' ? 'bg-emerald-600 text-white' :
                    doc.status === 'tidak_valid' ? 'bg-rose-600 text-white' :
                    'bg-slate-300 text-slate-700'
                  }`}>
                    {doc.status === 'valid' ? '✓' : idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 truncate">{doc.nama}</p>
                    <p className="text-[10px] font-mono text-slate-500">{doc.namaFile || 'Berkas.pdf'}</p>
                    {doc.catatan && (
                      <p className="text-[10px] text-rose-700 font-semibold mt-1 bg-white p-1 rounded border border-rose-100">
                        Catatan: {doc.catatan}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sertifikat TTE BSrE Info Card (if signed) */}
          {currentItem.tteInfo.isSigned && (
            <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-2xl p-5 shadow-lg border border-emerald-500/40 text-xs space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold">
                <ShieldCheck className="w-5 h-5" />
                <span>Dokumen Sah Bertanda Tangan Elektronik</span>
              </div>

              <div className="space-y-1.5 text-emerald-100 font-mono text-[11px] bg-white/10 p-3 rounded-xl border border-white/10">
                <div>Penandatangan: <strong className="text-white">{currentItem.tteInfo.namaPenandatangan}</strong></div>
                <div>Jabatan: {currentItem.tteInfo.jabatan}</div>
                <div>NIP: {currentItem.tteInfo.nip}</div>
                <div>Waktu TTE: {currentItem.tteInfo.tanggalTTE}</div>
                <div>Otoritas: {currentItem.tteInfo.sertifikatOtoritas}</div>
              </div>

              <button
                onClick={onOpenValidatorModal}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <QrCode className="w-4 h-4" /> Verifikasi Hash Sertifikat BSrE
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
