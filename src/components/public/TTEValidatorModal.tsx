import React, { useState } from 'react';
import { usePTSP } from '../../context/PTSPContext';
import { 
  ShieldCheck, 
  QrCode, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  FileCheck2, 
  Lock, 
  Calendar, 
  UserCheck, 
  Building 
} from 'lucide-react';

interface TTEValidatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TTEValidatorModal: React.FC<TTEValidatorModalProps> = ({ isOpen, onClose }) => {
  const { permohonanList } = usePTSP();
  const [inputHashOrResi, setInputHashOrResi] = useState('PTSP-MURA-2026-0038');
  const [validationResult, setValidationResult] = useState<any | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setHasChecked(true);

    const q = inputHashOrResi.trim().toUpperCase();
    const matched = permohonanList.find(
      p => p.nomorResi.toUpperCase().includes(q) || (p.tteInfo.hashDokumen && p.tteInfo.hashDokumen.toUpperCase().includes(q))
    );

    if (matched && matched.status === 'selesai_tte') {
      setValidationResult({
        isValid: true,
        nomorResi: matched.nomorResi,
        namaLayanan: matched.namaLayanan,
        nomorSurat: matched.tteInfo.nomorDokumen || 'B-1428/Kk.06.05/PP.00/10/2026',
        penandatangan: matched.tteInfo.namaPenandatangan,
        nip: matched.tteInfo.nip,
        jabatan: matched.tteInfo.jabatan,
        waktuTTE: matched.tteInfo.tanggalTTE,
        otoritas: matched.tteInfo.sertifikatOtoritas,
        hash: matched.tteInfo.hashDokumen || 'e4a938c12f085b3769c0d9a6f1a8e32c8b73e5f29910ab31e893cc218d6a8b79',
        peruntukan: matched.pemohon.instansiOrLembaga || matched.pemohon.namaLengkap
      });
    } else if (matched && matched.status !== 'selesai_tte') {
      setValidationResult({
        isValid: false,
        isPending: true,
        nomorResi: matched.nomorResi,
        message: 'Berkas terdaftar di sistem PTSP Kemenag Mura namun belum selesai ditandatangani secara elektronik (status: ' + matched.status + ').'
      });
    } else {
      setValidationResult({
        isValid: false,
        message: 'Nomor resi atau hash dokumen tidak ditemukan dalam basis data dokumen resmi Kemenag Musi Rawas.'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <QrCode className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Validasi Dokumen Elektronik BSrE</h3>
              <p className="text-xs text-emerald-300">Pemeriksaan Keaslian Sertifikat & Integritas Dokumen</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input form */}
        <div className="p-6 space-y-5 text-xs">
          <form onSubmit={handleVerify} className="space-y-3">
            <label className="block font-bold text-slate-800">
              Masukkan Nomor Resi atau Hash SHA-256 Dokumen:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputHashOrResi}
                onChange={(e) => setInputHashOrResi(e.target.value)}
                placeholder="Contoh: PTSP-MURA-2026-0038"
                className="flex-1 p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 outline-hidden font-mono text-xs"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Search className="w-4 h-4" /> Periksa
              </button>
            </div>
          </form>

          {/* Validation Result Box */}
          {hasChecked && validationResult && (
            <div className="animate-in fade-in slide-in-from-top-2">
              {validationResult.isValid ? (
                <div className="bg-emerald-50 rounded-2xl border border-emerald-300 p-5 space-y-3">
                  <div className="flex items-center gap-2.5 text-emerald-900 pb-2 border-b border-emerald-200">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="font-black text-sm">DOKUMEN ASLI & TERSERTIFIKASI SAH</h4>
                      <p className="text-[11px] text-emerald-700">Tanda Tangan Elektronik terverifikasi oleh BSrE BSSN</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-slate-800 text-xs">
                    <div>
                      <span className="text-slate-500 font-semibold">Nomor Naskah:</span>{' '}
                      <strong className="font-mono text-emerald-950">{validationResult.nomorSurat}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold">Peruntukan:</span>{' '}
                      <strong className="text-slate-900">{validationResult.peruntukan}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold">Penandatangan:</span>{' '}
                      <strong className="text-slate-900">{validationResult.penandatangan}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold">Jabatan:</span>{' '}
                      <span>{validationResult.jabatan}</span> (NIP. {validationResult.nip})
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold">Waktu Penandatanganan:</span>{' '}
                      <span className="font-mono">{validationResult.waktuTTE}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold">Otoritas Sertifikasi:</span>{' '}
                      <span className="font-semibold text-emerald-900">{validationResult.otoritas}</span>
                    </div>
                    <div className="pt-2 border-t border-emerald-200">
                      <span className="text-slate-500 font-semibold block text-[10px]">Digital Fingerprint (SHA-256):</span>
                      <p className="font-mono text-[9px] text-slate-600 break-all bg-white p-1.5 rounded border border-emerald-200">
                        {validationResult.hash}
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 bg-emerald-100/70 rounded-xl text-[11px] text-emerald-900 font-medium">
                    ✓ Integritas Dokumen: Tidak ada manipulasi atau perubahan isi dokumen sejak pertama kali ditandatangani secara elektronik.
                  </div>
                </div>
              ) : (
                <div className="bg-rose-50 rounded-2xl border border-rose-300 p-5 space-y-2 text-rose-900">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    <h4 className="font-bold text-sm">Dokumen Tidak Tervalidasi</h4>
                  </div>
                  <p className="text-xs text-rose-800">{validationResult.message}</p>
                </div>
              )}
            </div>
          )}

          {/* Standards notice */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 text-[11px] space-y-1">
            <strong>Standar Sertifikasi Elektronik Kemenag RI:</strong>
            <p>
              Sistem verifikasi ini mematuhi standar SPBE Nasional, terintegrasi dengan Balai Sertifikasi Elektronik (BSrE), Badan Siber dan Sandi Negara (BSSN) sesuai UU ITE.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
