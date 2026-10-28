import React, { useState } from 'react';
import { usePTSP } from '../../context/PTSPContext';
import { Permohonan } from '../../types/ptsp';
import { 
  ShieldCheck, 
  KeyRound, 
  FileCheck2, 
  Printer, 
  QrCode, 
  Award, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  X, 
  Sparkles,
  ExternalLink,
  Clock
} from 'lucide-react';

interface PimpinanTTEViewProps {
  onPreviewOfficialDocument: (permohonan: Permohonan) => void;
}

export const PimpinanTTEView: React.FC<PimpinanTTEViewProps> = ({
  onPreviewOfficialDocument
}) => {
  const { permohonanList, eksekusiTTE } = usePTSP();
  const [selectedSigningPermohonan, setSelectedSigningPermohonan] = useState<Permohonan | null>(null);
  const [passphraseInput, setPassphraseInput] = useState('');
  const [passphraseError, setPassphraseError] = useState('');
  const [isSigningLoading, setIsSigningLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // Items ready for TTE
  const listSiapTTE = permohonanList.filter(p => p.status === 'siap_tte');
  const listSudahTTE = permohonanList.filter(p => p.status === 'selesai_tte');

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
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-400/20 text-rose-300 border border-rose-400/30">
                  Otoritas Penandatanganan Digital BSrE BSSN
                </span>
                <span className="text-xs text-rose-200">Sertifikat Elektronik: AKTIF</span>
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

      {/* Antrean Siap TTE */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-black text-lg text-slate-900 tracking-tight flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-rose-600" />
              Antrean Dokumen Siap Ditandatangani ({listSiapTTE.length})
            </h3>
            <p className="text-xs text-slate-600">
              Dokumen telah lolos telaah teknis seksi dan siap diotorisasi menggunakan sertifikat elektronik resmi
            </p>
          </div>
        </div>

        {listSiapTTE.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 shadow-xs">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2 opacity-80" />
            <p className="font-bold text-sm text-slate-700">Semua Antrean TTE Telah Diproses</p>
            <p className="text-xs text-slate-500 mt-0.5">Tidak ada berkas yang menunggu tanda tangan saat ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listSiapTTE.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-2xl border border-rose-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200">
                      {item.nomorResi}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Pengajuan: {item.tanggalPengajuan}
                    </span>
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
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-purple-700 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Memerlukan Passphrase TTE
                  </span>
                  <button
                    onClick={() => handleOpenSignModal(item)}
                    className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
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
              Riwayat Dokumen Telah Di-TTE Resmi ({listSudahTTE.length})
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
                      <button
                        onClick={() => onPreviewOfficialDocument(item)}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" /> Cetak / Unduh Dokumen
                      </button>
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
                  className="px-6 py-2.5 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
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
    </div>
  );
};
