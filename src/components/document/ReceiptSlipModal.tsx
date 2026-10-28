import React from 'react';
import { Permohonan } from '../../types/ptsp';
import { SEKSI_CONFIG } from '../../data/initialData';
import { Printer, X, CheckCircle2, QrCode } from 'lucide-react';

interface ReceiptSlipModalProps {
  permohonan: Permohonan | null;
  onClose: () => void;
}

export const ReceiptSlipModal: React.FC<ReceiptSlipModalProps> = ({ 
  permohonan, 
  onClose 
}) => {
  if (!permohonan) return null;

  const handlePrint = () => {
    window.print();
  };

  const seksiInfo = SEKSI_CONFIG[permohonan.seksi];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 my-auto">
        {/* Action Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between print:hidden">
          <span className="font-bold text-xs">Bukti Tanda Terima Berkas PTSP Resmi</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" /> Cetak Resi
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Slip Receipt */}
        <div className="p-8 bg-white text-slate-900 font-sans text-xs print:p-0">
          {/* Slip Header */}
          <div className="text-center border-b-2 border-slate-900 pb-3 mb-4">
            <h3 className="font-black text-sm uppercase tracking-wide">
              KEMENTERIAN AGAMA KABUPATEN MUSI RAWAS
            </h3>
            <h4 className="font-bold text-xs uppercase text-slate-700">
              PELAYANAN TERPADU SATU PINTU (PTSP)
            </h4>
            <p className="text-[10px] text-slate-500">
              Komplek Perkantoran Pemkab Musi Rawas, Muara Beliti • Telp: (0733) 4540112
            </p>
          </div>

          <div className="text-center mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-300">
              TANDA TERIMA BERKAS PERMOHONAN
            </span>
          </div>

          {/* Barcode simulation */}
          <div className="text-center my-3 p-2 bg-slate-50 rounded-lg border border-slate-200">
            <div className="font-mono text-xl font-black tracking-widest text-slate-950">
              * {permohonan.nomorResi} *
            </div>
            <span className="text-[10px] text-slate-500 font-mono">
              Gunakan nomor di atas untuk melacak status layanan online
            </span>
          </div>

          {/* Data fields */}
          <div className="space-y-2 border-y border-slate-200 py-3 my-3 text-xs">
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-4 text-slate-500">Tanggal Pengajuan</span>
              <span className="col-span-1">:</span>
              <span className="col-span-7 font-mono font-bold text-slate-900">{permohonan.tanggalPengajuan} WIB</span>
            </div>
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-4 text-slate-500">Nama Pemohon</span>
              <span className="col-span-1">:</span>
              <span className="col-span-7 font-bold text-slate-900">{permohonan.pemohon.namaLengkap}</span>
            </div>
            {permohonan.pemohon.instansiOrLembaga && (
              <div className="grid grid-cols-12 gap-1">
                <span className="col-span-4 text-slate-500">Instansi / Lembaga</span>
                <span className="col-span-1">:</span>
                <span className="col-span-7 font-semibold text-blue-900">{permohonan.pemohon.instansiOrLembaga}</span>
              </div>
            )}
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-4 text-slate-500">No. WhatsApp / HP</span>
              <span className="col-span-1">:</span>
              <span className="col-span-7 font-mono text-slate-900">{permohonan.pemohon.noHpWhatsapp}</span>
            </div>
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-4 text-slate-500">Layanan yang Dituju</span>
              <span className="col-span-1">:</span>
              <span className="col-span-7 font-bold text-slate-900">{permohonan.namaLayanan}</span>
            </div>
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-4 text-slate-500">Seksi Terkait</span>
              <span className="col-span-1">:</span>
              <span className="col-span-7 font-semibold text-emerald-900">{seksiInfo.nama}</span>
            </div>
            <div className="grid grid-cols-12 gap-1">
              <span className="col-span-4 text-slate-500">Biaya Retribusi</span>
              <span className="col-span-1">:</span>
              <span className="col-span-7 font-bold text-emerald-700">Rp 0,- (GRATIS)</span>
            </div>
          </div>

          {/* Dokumen diterima */}
          <div className="mb-4">
            <span className="font-bold text-slate-700 block mb-1">Dokumen yang Diterima:</span>
            <ul className="space-y-1">
              {permohonan.dokumenList.map((doc, idx) => (
                <li key={doc.id} className="text-[11px] text-slate-700 flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{doc.nama} ({doc.namaFile || 'Berkas.pdf'})</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer signature */}
          <div className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-2 text-center text-[11px]">
            <div>
              <p className="text-slate-500">Pemohon Layanan,</p>
              <div className="h-12"></div>
              <p className="font-bold underline text-slate-900">{permohonan.pemohon.namaLengkap}</p>
            </div>
            <div>
              <p className="text-slate-500">Petugas Front Office PTSP,</p>
              <div className="h-12"></div>
              <p className="font-bold underline text-slate-900">Rahmat Hidayat, A.Md</p>
              <p className="text-[10px] text-slate-500 font-mono">NIP. 198806152011011003</p>
            </div>
          </div>

          <div className="mt-4 pt-2 text-[10px] text-center text-slate-400 border-t border-slate-100">
            PTSP Online Kementerian Agama Kabupaten Musi Rawas • Simpan resi ini sebagai bukti penyerahan berkas yang sah.
          </div>
        </div>
      </div>
    </div>
  );
};
