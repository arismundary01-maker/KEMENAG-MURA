import React, { useState } from 'react';
import { usePTSP } from '../../context/PTSPContext';
import { KATALOG_LAYANAN, SEKSI_CONFIG } from '../../data/initialData';
import { LayananKatalog, SeksiType, DokumenPersyaratan } from '../../types/ptsp';
import { 
  FileText, 
  Upload, 
  Check, 
  X, 
  AlertCircle, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Building, 
  CheckCircle2, 
  Printer, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PermohonanFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetLayanan?: LayananKatalog | null;
}

export const PermohonanFormModal: React.FC<PermohonanFormModalProps> = ({ 
  isOpen, 
  onClose, 
  presetLayanan 
}) => {
  const { tambahPermohonan, setSelectedTrackingResi, setActiveView, katalogLayanan, pengaturanWeb } = usePTSP();

  const [step, setStep] = useState<number>(presetLayanan ? 2 : 1);
  const [selectedLayananId, setSelectedLayananId] = useState<string>(presetLayanan?.id || (katalogLayanan[0]?.id || KATALOG_LAYANAN[0].id));
  
  // Form fields
  const [namaLengkap, setNamaLengkap] = useState('');
  const [nik, setNik] = useState('');
  const [noHpWhatsapp, setNoHpWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [instansiOrLembaga, setInstansiOrLembaga] = useState('');
  const [alamat, setAlamat] = useState('');
  const [kecamatan, setKecamatan] = useState('Puruk Cahu');
  const [perihal, setPerihal] = useState('');
  const [catatanPemohon, setCatatanPemohon] = useState('');

  // Uploaded documents state
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, { namaFile: string; ukuranFile: string }>>({});
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedResi, setSubmittedResi] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentLayanan = katalogLayanan.find(l => l.id === selectedLayananId) || katalogLayanan[0] || KATALOG_LAYANAN[0];

  const handleSimulateFileUpload = (docIndex: number) => {
    const fakeSizes = ['680 KB', '1.4 MB', '2.1 MB', '890 KB', '3.2 MB'];
    const randomSize = fakeSizes[docIndex % fakeSizes.length];
    const docName = currentLayanan.dokumenSyarat[docIndex];
    const sanitizedName = docName.substring(0, 20).replace(/[^a-zA-Z0-9]/g, '_') + `_scan.pdf`;

    setUploadedDocs(prev => ({
      ...prev,
      [docIndex]: {
        namaFile: sanitizedName,
        ukuranFile: randomSize
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!namaLengkap || !nik || !noHpWhatsapp || !alamat) {
      setErrorMsg('Mohon lengkapi seluruh data wajib (Nama, NIK, No. WhatsApp, dan Alamat).');
      return;
    }

    // Prepare documents list
    const dokumenList: DokumenPersyaratan[] = currentLayanan.dokumenSyarat.map((syarat, idx) => {
      const isUploaded = !!uploadedDocs[idx];
      return {
        id: 'doc-' + idx,
        nama: syarat,
        wajib: true,
        status: isUploaded ? 'unggah' : 'belum_unggah',
        namaFile: uploadedDocs[idx]?.namaFile || `Berkas_Persyaratan_${idx + 1}.pdf`,
        ukuranFile: uploadedDocs[idx]?.ukuranFile || '1.1 MB'
      };
    });

    const resiBaru = tambahPermohonan({
      layananId: currentLayanan.id,
      namaLayanan: currentLayanan.namaLayanan,
      seksi: currentLayanan.seksi,
      pemohon: {
        namaLengkap,
        nik,
        noHpWhatsapp,
        email: email || `${namaLengkap.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
        instansiOrLembaga,
        alamat,
        kecamatan,
        kabupaten: pengaturanWeb.kabupaten
      },
      perihal: perihal || `Permohonan ${currentLayanan.namaLayanan}`,
      catatanPemohon,
      dokumenList
    });

    // Trigger celebration
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore
    }

    setSubmittedResi(resiBaru);
  };

  const handleGoToTracking = () => {
    if (submittedResi) {
      setSelectedTrackingResi(submittedResi);
      setActiveView('tracking_view');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              Formulir Pendaftaran Online Mandiri
            </span>
            <h3 className="font-bold text-lg text-white mt-0.5">
              Pengajuan Layanan PTSP {pengaturanWeb.namaKantor}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success View after submission */}
        {submittedResi ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Registrasi Berhasil
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                Permohonan Anda Telah Masuk ke Antrean PTSP
              </h2>
              <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto">
                Notifikasi tanda terima dan pembaruan progres status berkas telah dikirimkan secara otomatis ke nomor WhatsApp <strong className="text-slate-900">{noHpWhatsapp}</strong>.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 max-w-md mx-auto">
              <span className="text-[11px] text-slate-500 font-semibold block">Nomor Resi / Registrasi Pelacakan:</span>
              <div className="text-2xl font-black font-mono text-emerald-800 tracking-wider my-1">
                {submittedResi}
              </div>
              <p className="text-[11px] text-slate-500">
                Simpan nomor resi ini untuk melacak status verifikasi berkas secara online kapan saja.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={handleGoToTracking}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
              >
                Lacak Status Permohonan Ini <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl cursor-pointer"
              >
                Tutup Jendela
              </button>
            </div>
          </div>
        ) : (
          /* Multi-step Form */
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {/* Step indicator */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 text-xs">
              <span className={`font-bold flex items-center gap-1.5 ${step === 1 ? 'text-emerald-700' : 'text-slate-500'}`}>
                <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[11px] flex items-center justify-center">1</span>
                Pilih Layanan
              </span>
              <span className={`font-bold flex items-center gap-1.5 ${step === 2 ? 'text-emerald-700' : 'text-slate-500'}`}>
                <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[11px] flex items-center justify-center">2</span>
                Data Pemohon
              </span>
              <span className={`font-bold flex items-center gap-1.5 ${step === 3 ? 'text-emerald-700' : 'text-slate-500'}`}>
                <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[11px] flex items-center justify-center">3</span>
                Unggah Berkas
              </span>
            </div>

            {/* Step 1: Select Service */}
            {step === 1 && (
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-slate-900">
                  Pilih Layanan PTSP yang Diinginkan:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-1">
                  {katalogLayanan.map((lay) => {
                    const isSelected = lay.id === selectedLayananId;
                    return (
                      <div
                        key={lay.id}
                        onClick={() => setSelectedLayananId(lay.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-600/20'
                            : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                            {lay.kode}
                          </span>
                          <span className="text-[11px] font-bold text-emerald-800">
                            {lay.estimasiHari} Hari • Gratis
                          </span>
                        </div>
                        <h5 className="font-bold text-xs text-slate-900">{lay.namaLayanan}</h5>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{lay.deskripsi}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Applicant Info */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs">
                  <span className="text-emerald-700 font-bold block">Layanan yang Dipilih:</span>
                  <span className="font-black text-emerald-950 text-sm">{currentLayanan.namaLayanan}</span>
                  <div className="text-[11px] text-emerald-800 mt-1">Seksi: {SEKSI_CONFIG[currentLayanan.seksi].nama}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nama Lengkap Pemohon *</label>
                    <input
                      type="text"
                      required
                      value={namaLengkap}
                      onChange={(e) => setNamaLengkap(e.target.value)}
                      placeholder="Contoh: Drs. H. Ahmad Fauzi"
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 outline-hidden font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nomor Induk Kependudukan (NIK) *</label>
                    <input
                      type="text"
                      required
                      maxLength={16}
                      value={nik}
                      onChange={(e) => setNik(e.target.value)}
                      placeholder="16 Digit NIK KTP"
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 outline-hidden font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">No. WhatsApp / HP (Wajib untuk Notifikasi Real-time) *</label>
                    <input
                      type="tel"
                      required
                      value={noHpWhatsapp}
                      onChange={(e) => setNoHpWhatsapp(e.target.value)}
                      placeholder="0812xxxxxxxx"
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 outline-hidden font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Alamat Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="pemohon@gmail.com"
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nama Instansi / Yayasan / Tempat Ibadah</label>
                    <input
                      type="text"
                      value={instansiOrLembaga}
                      onChange={(e) => setInstansiOrLembaga(e.target.value)}
                      placeholder="Contoh: Yayasan Al-Falah / BKM Masjid / GPdI / Mandiri"
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Kecamatan di Kab. Musi Rawas *</label>
                    <select
                      value={kecamatan}
                      onChange={(e) => setKecamatan(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 outline-hidden font-medium"
                    >
                      <option value="Muara Beliti">Muara Beliti</option>
                      <option value="Tugumulyo">Tugumulyo</option>
                      <option value="Megang Sakti">Megang Sakti</option>
                      <option value="Purwodadi">Purwodadi</option>
                      <option value="STL Ulu Terawas">STL Ulu Terawas</option>
                      <option value="Selangit">Selangit</option>
                      <option value="Jayaloka">Jayaloka</option>
                      <option value="Sukamaju">Sukamaju</option>
                      <option value="Muara Kelingi">Muara Kelingi</option>
                      <option value="Muara Lakitan">Muara Lakitan</option>
                      <option value="Tuah Negeri">Tuah Negeri</option>
                      <option value="Tiang Pumpung Kepungut">Tiang Pumpung Kepungut</option>
                      <option value="Sumber Harta">Sumber Harta</option>
                      <option value="Bulan Tengah Suku">Bulan Tengah Suku</option>
                    </select>
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block font-bold text-slate-700 mb-1">Alamat Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    placeholder="Nama Jalan, RT/RW, Dusun, Desa/Kelurahan"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 outline-hidden"
                  />
                </div>

                <div className="text-xs">
                  <label className="block font-bold text-slate-700 mb-1">Perihal Permohonan Ringkas</label>
                  <input
                    type="text"
                    value={perihal}
                    onChange={(e) => setPerihal(e.target.value)}
                    placeholder={`Permohonan ${currentLayanan.namaLayanan}`}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 outline-hidden font-medium"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Upload Documents */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900">
                    Unggah Dokumen Persyaratan Digital (PDF/Scan)
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    Klik tombol untuk menyimulasikan unggahan berkas
                  </span>
                </div>

                <div className="space-y-3">
                  {currentLayanan.dokumenSyarat.map((syarat, idx) => {
                    const isUploaded = !!uploadedDocs[idx];
                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isUploaded 
                            ? 'border-emerald-300 bg-emerald-50/50' 
                            : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <span className={`w-5 h-5 rounded-full font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5 ${
                            isUploaded ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {idx + 1}
                          </span>
                          <div>
                            <p className="font-bold text-xs text-slate-900">{syarat}</p>
                            {isUploaded ? (
                              <p className="text-[11px] font-mono text-emerald-800 font-semibold mt-0.5">
                                ✓ Terunggah: {uploadedDocs[idx].namaFile} ({uploadedDocs[idx].ukuranFile})
                              </p>
                            ) : (
                              <p className="text-[11px] text-slate-500 mt-0.5">
                                Format: PDF / JPG / PNG (Maksimal 5 MB)
                              </p>
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleSimulateFileUpload(idx)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                            isUploaded
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-2xs'
                          }`}
                        >
                          <Upload className="w-3.5 h-3.5 inline mr-1" />
                          {isUploaded ? 'Ganti Berkas' : 'Unggah File'}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Upload All button for rapid demo */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-600">
                    Opsi Cepat Pengujian: Lengkapi seluruh berkas otomatis
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      currentLayanan.dokumenSyarat.forEach((_, idx) => {
                        handleSimulateFileUpload(idx);
                      });
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Unggah Semua Sekaligus
                  </button>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  ← Kembali
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Batal
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (step === 2 && (!namaLengkap || !nik || !noHpWhatsapp || !alamat)) {
                      setErrorMsg('Mohon isi data wajib bertanda bintang (*) sebelum melanjutkan.');
                      return;
                    }
                    setErrorMsg('');
                    setStep(step + 1);
                  }}
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  Lanjutkan <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-black rounded-xl shadow-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" /> Daftarkan Permohonan Sekarang
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
