import React, { useState } from 'react';
import { Permohonan } from '../../types/ptsp';
import { SEKSI_CONFIG } from '../../data/initialData';
import { usePTSP } from '../../context/PTSPContext';
import { 
  Printer, 
  X, 
  ShieldCheck, 
  QrCode, 
  Download, 
  CheckCircle2, 
  FileBadge,
  FileText,
  Paperclip,
  Eye,
  KeyRound,
  AlertCircle
} from 'lucide-react';

interface OfficialDocumentModalProps {
  permohonan: Permohonan | null;
  onClose: () => void;
  onProceedToSign?: (permohonan: Permohonan) => void;
}

export const OfficialDocumentModal: React.FC<OfficialDocumentModalProps> = ({ 
  permohonan, 
  onClose,
  onProceedToSign
}) => {
  const { pengaturanWeb } = usePTSP();
  const [activeTab, setActiveTab] = useState<'format_resmi' | 'draft_seksi' | 'dokumen_pemohon'>('format_resmi');

  if (!permohonan) return null;

  const handlePrint = () => {
    window.print();
  };

  const seksiInfo = SEKSI_CONFIG[permohonan.seksi];
  const tte = permohonan.tteInfo;
  const isDraftTTE = permohonan.status === 'siap_tte' || !tte.isSigned;
  const doc = permohonan.isiDokumenKeluaran || {
    judul: 'SURAT REKOMENDASI RESMI',
    nomorSurat: tte.nomorDokumen || `B-1428/Kk.06.05/PP.00/10/2026`,
    konsideranMenimbang: [
      'Bahwa permohonan yang diajukan telah diteliti dan memenuhi persyaratan administratif maupun teknis sesuai peraturan perundang-undangan.',
      `Bahwa berdasarkan hasil telaah tim teknis ${pengaturanWeb.namaKantor} dipandang perlu menerbitkan surat rekomendasi.`
    ],
    konsideranMengingat: [
      'Undang-Undang Nomor 20 Tahun 2003 tentang Sistem Pendidikan Nasional / Regulasi Terkait;',
      'Peraturan Menteri Agama Nomor 34 Tahun 2016 tentang Organisasi dan Tata Kerja Kementerian Agama.'
    ],
    diktumKeputusan: [
      `MEMBERIKAN REKOMENDASI kepada: ${permohonan.pemohon.instansiOrLembaga || permohonan.pemohon.namaLengkap} yang beralamat di ${permohonan.pemohon.alamat}, Kec. ${permohonan.pemohon.kecamatan}, ${pengaturanWeb.kabupaten}.`,
      `Untuk keperluan: ${permohonan.perihal}. Surat rekomendasi ini berlaku sah sejak tanggal ditetapkan.`
    ],
    tembusan: [
      'Kepala Kantor Wilayah Kementerian Agama Provinsi Kalimantan Tengah',
      `Bupati ${pengaturanWeb.kabupaten.replace('Kabupaten ', '')}`,
      'Arsip Pelayanan Terpadu Satu Pintu (PTSP)'
    ],
    peruntukan: permohonan.pemohon.instansiOrLembaga || permohonan.pemohon.namaLengkap
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-2 sm:p-4 animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 my-auto max-h-[96vh] flex flex-col">
        {/* Status Indicator Banner for Draft vs Sah */}
        {isDraftTTE ? (
          <div className="bg-amber-500 text-slate-950 px-5 py-2 font-bold text-xs flex items-center justify-between border-b border-amber-600 print:hidden">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse"></span>
              <span>DRAFT NASKAH DINAS — Sedang Menunggu Proses Otorisasi TTE Kepala Kantor</span>
            </div>
            <span className="text-[11px] font-mono bg-black/10 px-2 py-0.5 rounded">
              No. Resi: {permohonan.nomorResi}
            </span>
          </div>
        ) : (
          <div className="bg-emerald-700 text-white px-5 py-2 font-bold text-xs flex items-center justify-between border-b border-emerald-800 print:hidden">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
              <span>DOKUMEN RESMI TERSERTIFIKASI TTE ELEKTRONIK BSrE (BSSN)</span>
            </div>
            <span className="text-[11px] font-mono bg-black/20 px-2 py-0.5 rounded">
              TTE Sah: {tte.tanggalTTE}
            </span>
          </div>
        )}

        {/* Modal Toolbar (Screen Only) */}
        <div className="bg-slate-900 text-white p-3.5 px-5 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <FileBadge className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="font-bold text-sm block">Pratinjau Dokumen & Naskah PTSP</span>
              <span className="text-[11px] text-slate-400 block">{permohonan.namaLayanan}</span>
            </div>
          </div>

          {/* Tab Selector if Seksi uploaded a file */}
          <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-xl text-xs">
            <button
              onClick={() => setActiveTab('format_resmi')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'format_resmi'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Naskah Kemenag
            </button>
            {permohonan.berkasDraftTTE && (
              <button
                onClick={() => setActiveTab('draft_seksi')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'draft_seksi'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Paperclip className="w-3.5 h-3.5 text-teal-300" /> Berkas Draft Seksi
              </button>
            )}
            {permohonan.dokumenList && permohonan.dokumenList.length > 0 && (
              <button
                onClick={() => setActiveTab('dokumen_pemohon')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'dokumen_pemohon'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-blue-300" /> Syarat Pemohon ({permohonan.dokumenList.length})
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onProceedToSign && isDraftTTE && (
              <button
                onClick={() => {
                  onClose();
                  onProceedToSign(permohonan);
                }}
                className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5" /> Otorisasi TTE
              </button>
            )}
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" /> Cetak / PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white cursor-pointer"
              title="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body based on Active Tab */}
        {activeTab === 'draft_seksi' && permohonan.berkasDraftTTE ? (
          <div className="p-6 overflow-y-auto bg-slate-100 flex-1 flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-teal-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-teal-100 text-teal-900 border border-teal-200">
                    Naskah Usulan {SEKSI_CONFIG[permohonan.berkasDraftTTE.seksi]?.singkatan || 'Seksi Teknis'}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    Ukuran: {permohonan.berkasDraftTTE.ukuranFile}
                  </span>
                </div>
                <h4 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-700" />
                  {permohonan.berkasDraftTTE.namaFile}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Diunggah oleh: <strong>{permohonan.berkasDraftTTE.diunggahOleh}</strong> pada {permohonan.berkasDraftTTE.waktuUnggah}
                </p>
                {permohonan.berkasDraftTTE.catatanPengantar && (
                  <p className="text-xs text-teal-900 bg-teal-50 border border-teal-200 p-2.5 rounded-xl mt-2 italic">
                    "Catatan: {permohonan.berkasDraftTTE.catatanPengantar}"
                  </p>
                )}
              </div>

              {permohonan.berkasDraftTTE.fileUrl && (
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={permohonan.berkasDraftTTE.fileUrl}
                    download={permohonan.berkasDraftTTE.namaFile}
                    className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-xs inline-flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> Unduh Dokumen
                  </a>
                </div>
              )}
            </div>

            {/* In-App Document Viewer for Seksi Uploaded File */}
            <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-4 flex-1 min-h-[500px] flex flex-col">
              <div className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-teal-700" />
                Tampilan Pratinjau Berkas File Seksi:
              </div>
              {permohonan.berkasDraftTTE.fileUrl ? (
                permohonan.berkasDraftTTE.tipeFile?.includes('image') || permohonan.berkasDraftTTE.fileUrl.startsWith('data:image') ? (
                  <div className="flex-1 flex items-center justify-center p-4 bg-slate-50 rounded-xl overflow-auto">
                    <img 
                      src={permohonan.berkasDraftTTE.fileUrl} 
                      alt={permohonan.berkasDraftTTE.namaFile} 
                      className="max-h-[550px] object-contain rounded-lg shadow-sm"
                    />
                  </div>
                ) : (
                  <iframe
                    src={permohonan.berkasDraftTTE.fileUrl}
                    title="Pratinjau Dokumen Naskah Seksi"
                    className="w-full flex-1 min-h-[550px] rounded-xl border border-slate-200 bg-slate-50"
                  />
                )
              ) : (
                <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-xl my-auto">
                  <FileText className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                  <p className="font-bold text-sm">Dokumen Naskah Tersimpan di Server</p>
                  <p className="text-xs text-slate-500 mt-1">Gunakan tombol unduh di atas untuk membaca dokumen selengkapnya.</p>
                </div>
              )}
            </div>
          </div>
        ) : activeTab === 'dokumen_pemohon' ? (
          <div className="p-6 overflow-y-auto bg-slate-100 flex-1">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-3xl mx-auto">
              <h4 className="font-black text-base text-slate-900 mb-1 flex items-center gap-2">
                <Paperclip className="w-5 h-5 text-blue-600" />
                Daftar Dokumen Persyaratan yang Diunggah Pemohon
              </h4>
              <p className="text-xs text-slate-500 mb-5">
                Nomor Registrasi: <span className="font-mono font-bold text-slate-800">{permohonan.nomorResi}</span> • Pemohon: <strong>{permohonan.pemohon.namaLengkap}</strong>
              </p>

              <div className="space-y-3">
                {permohonan.dokumenList.map((dok, idx) => (
                  <div key={dok.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900">{dok.nama}</div>
                        <div className="text-[11px] text-slate-500">
                          File: <span className="font-mono font-semibold text-slate-700">{dok.namaFile || `${dok.nama.toLowerCase().replace(/\s+/g, '_')}.pdf`}</span>
                          {dok.ukuranFile && <span> • {dok.ukuranFile}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Berkas Valid
                      </span>
                      {dok.fileUrl && (
                        <a
                          href={dok.fileUrl}
                          download={dok.namaFile || 'dokumen.pdf'}
                          className="p-1.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-700 cursor-pointer"
                          title="Unduh Berkas"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Tab Standar: Paper Document Preview Area (A4 Government Format) */
          <div className="p-6 sm:p-12 overflow-y-auto bg-slate-100 flex-1 flex justify-center">
          <div className="bg-white w-full max-w-[210mm] min-h-[297mm] p-8 sm:p-14 shadow-xl border border-slate-300 text-slate-900 print:shadow-none print:border-none print:p-0 font-serif leading-relaxed text-xs sm:text-sm">
            {/* 1. KOP SURAT RESMI KEMENAG */}
            <div className="border-b-4 border-double border-slate-900 pb-3 mb-6 text-center relative">
              <div className="flex items-center justify-center gap-4">
                {/* Garuda/Kemenag Logo Emblem representation */}
                <div className="w-16 h-16 rounded-full bg-emerald-800 text-amber-300 font-black flex items-center justify-center text-xl border-2 border-amber-400 shrink-0">
                  KM
                </div>
                <div>
                  <h3 className="font-black text-sm sm:text-base tracking-wider uppercase text-slate-950 font-sans">
                    KEMENTERIAN AGAMA REPUBLIK INDONESIA
                  </h3>
                  <h4 className="font-extrabold text-xs sm:text-sm tracking-wide uppercase text-slate-900 font-sans">
                    {pengaturanWeb.namaKantor.toUpperCase()}
                  </h4>
                  <p className="text-[10px] sm:text-xs font-sans text-slate-700 leading-tight mt-0.5">
                    {pengaturanWeb.alamatLengkap}<br />
                    Telepon: {pengaturanWeb.telepon} • Pos-el: {pengaturanWeb.email} • Laman: {pengaturanWeb.website}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. NOMOR SURAT & JUDUL */}
            <div className="text-center mb-6">
              <h2 className="font-black text-sm sm:text-base underline uppercase tracking-tight font-sans text-slate-950">
                {doc.judul}
              </h2>
              <p className="font-mono text-xs text-slate-800 font-semibold mt-0.5">
                Nomor: {doc.nomorSurat}
              </p>
            </div>

            {/* 3. KONSIDERAN MENIMBANG & MENGINGAT */}
            <div className="space-y-4 mb-6 text-justify">
              <div className="grid grid-cols-12 gap-2">
                <span className="col-span-2 font-bold font-sans">Menimbang</span>
                <span className="col-span-1 text-center">:</span>
                <div className="col-span-9 space-y-1">
                  {doc.konsideranMenimbang.map((m, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="font-sans text-[11px] font-bold">{String.fromCharCode(97 + i)}.</span>
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-12 gap-2">
                <span className="col-span-2 font-bold font-sans">Mengingat</span>
                <span className="col-span-1 text-center">:</span>
                <div className="col-span-9 space-y-1">
                  {doc.konsideranMengingat.map((m, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="font-sans text-[11px] font-bold">{i + 1}.</span>
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. DIKTUM KEPUTUSAN / REKOMENDASI */}
            <div className="border-t border-slate-300 pt-4 mb-8 text-justify">
              <div className="text-center font-black uppercase tracking-wider font-sans mb-3 text-xs">
                MEMBERIKAN REKOMENDASI / KETERANGAN:
              </div>
              <div className="space-y-2">
                {doc.diktumKeputusan.map((d, i) => (
                  <p key={i} className="indent-6">
                    {d}
                  </p>
                ))}
              </div>
            </div>

            {/* 5. TANDA TANGAN ELEKTRONIK (BSrE - BSSN CERTIFIED BLOCK) */}
            <div className="mt-8 pt-4 flex justify-between items-start">
              {/* Tembusan */}
              <div className="text-[11px] text-slate-600 max-w-xs font-sans">
                <p className="font-bold underline mb-1">Tembusan Yth.:</p>
                <ol className="list-decimal list-inside space-y-0.5">
                  {doc.tembusan.map((t, idx) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ol>
              </div>

              {/* TTE Block */}
              <div className="text-center w-72 text-xs font-sans">
                <p className="font-medium">Muara Beliti, {tte.tanggalTTE ? tte.tanggalTTE.substring(0, 16) : '2026'}</p>
                <p className="font-bold mt-0.5">Kepala Kantor Kementerian Agama<br />Kabupaten Musi Rawas</p>

                {/* Visual BSrE Electronic Signature Stamp */}
                <div className="my-3 mx-auto p-3 bg-slate-50 border-2 border-dashed border-emerald-600 rounded-xl max-w-[240px] flex items-center justify-between gap-3 shadow-2xs">
                  <div className="w-16 h-16 bg-white border border-slate-300 rounded p-1 flex items-center justify-center shrink-0">
                    {/* QR Code representation */}
                    <div className="w-full h-full bg-slate-900 rounded-xs flex items-center justify-center text-white text-[8px] font-mono text-center p-1 font-bold">
                      QR TTE BSrE
                    </div>
                  </div>
                  <div className="text-left text-[9px] leading-tight text-slate-700">
                    <span className="font-bold text-emerald-800 block">DITANDATANGANI SECARA ELEKTRONIK OLEH:</span>
                    <strong className="text-slate-900 block mt-0.5 font-bold">{tte.namaPenandatangan}</strong>
                    <span className="text-slate-500 font-mono block">NIP. {tte.nip}</span>
                    <span className="text-[8px] text-slate-400 mt-1 block font-mono">BSrE - BSSN</span>
                  </div>
                </div>

                <p className="font-bold underline text-xs">{tte.namaPenandatangan}</p>
                <p className="font-mono text-[11px] text-slate-600">NIP. {tte.nip}</p>
              </div>
            </div>

            {/* 6. CATATAN KAKI KEAMANAN DOKUMEN BSrE */}
            <div className="mt-12 pt-3 border-t border-slate-200 text-[9px] font-sans text-slate-500 space-y-0.5">
              <p>
                <strong>Catatan Keamanan Informasi:</strong> Sesuai dengan ketentuan perundang-undangan, dokumen ini telah ditandatangani secara elektronik menggunakan sertifikat elektronik yang diterbitkan oleh Balai Sertifikasi Elektronik (BSrE), Badan Siber dan Sandi Negara (BSSN).
              </p>
              <p className="font-mono text-[8px] text-slate-400 truncate">
                Digital Hash (SHA-256): {tte.hashDokumen || 'e4a938c12f085b3769c0d9a6f1a8e32c8b73e5f29910ab31e893cc218d6a8b79'}
              </p>
              <p className="text-[8px] text-slate-400">
                Surat ini sah dan tidak memerlukan tanda tangan basah serta stempel manual. Keabsahan dokumen dapat divalidasi melalui sistem PTSP Online Kemenag Mura.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);
};
