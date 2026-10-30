/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PTSPProvider, usePTSP } from './context/PTSPContext';
import { Header } from './components/common/Header';
import { BerandaPortal } from './components/public/BerandaPortal';
import { OperatorPTSPView } from './components/operator/OperatorPTSPView';
import { SeksiDashboardView } from './components/seksi/SeksiDashboardView';
import { PimpinanTTEView } from './components/kakan/PimpinanTTEView';
import { TrackingView } from './components/public/TrackingView';
import { SuperAdminPortal } from './components/admin/SuperAdminPortal';
import { PermohonanFormModal } from './components/public/PermohonanFormModal';
import { OfficialDocumentModal } from './components/document/OfficialDocumentModal';
import { ReceiptSlipModal } from './components/document/ReceiptSlipModal';
import { TTEValidatorModal } from './components/public/TTEValidatorModal';
import { WhatsAppAlertToast } from './components/common/WhatsAppAlertToast';
import { LayananKatalog, Permohonan } from './types/ptsp';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Heart, 
  ExternalLink,
  Crown,
  Lock,
  ArrowLeft
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { currentRole, activeView, setActiveView, pengaturanWeb } = usePTSP();

  // Modal states
  const [isPermohonanModalOpen, setIsPermohonanModalOpen] = useState(false);
  const [selectedPresetLayanan, setSelectedPresetLayanan] = useState<LayananKatalog | null>(null);
  const [isValidatorModalOpen, setIsValidatorModalOpen] = useState(false);
  const [printedReceiptPermohonan, setPrintedReceiptPermohonan] = useState<Permohonan | null>(null);
  const [previewDocumentPermohonan, setPreviewDocumentPermohonan] = useState<Permohonan | null>(null);

  const handleOpenPermohonan = (layananPreset?: LayananKatalog) => {
    setSelectedPresetLayanan(layananPreset || null);
    setIsPermohonanModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 selection:bg-emerald-600 selection:text-white">
      {/* 1. Header with Role Switcher, Real-time Clock, and Audio Toggle */}
      <Header
        onOpenPermohonanModal={() => handleOpenPermohonan()}
        onOpenTrackingModal={() => setActiveView('tracking_view')}
        onOpenValidatorModal={() => setIsValidatorModalOpen(true)}
      />

      {/* 2. Main Active View Content */}
      <main className="flex-1">
        {activeView === 'public_portal' && (
          <BerandaPortal
            onOpenPermohonanModal={handleOpenPermohonan}
            onOpenValidatorModal={() => setIsValidatorModalOpen(true)}
          />
        )}

        {activeView === 'tracking_view' && (
          <TrackingView
            onPrintReceipt={(p) => setPrintedReceiptPermohonan(p)}
            onPreviewOfficialDocument={(p) => setPreviewDocumentPermohonan(p)}
            onOpenValidatorModal={() => setIsValidatorModalOpen(true)}
          />
        )}

        {/* Akses Khusus Petugas - Jika pengguna publik mengakses URL / view internal */}
        {currentRole === 'pemohon' && ['operator_portal', 'seksi_dashboard', 'kakan_tte', 'super_admin_portal'].includes(activeView) && (
          <div className="max-w-xl mx-auto my-16 px-4">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
                <Lock className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-black text-slate-900 mb-2">
                Menu Terbatas: Khusus Petugas & ASN Kemenag
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Menu ini merupakan dashboard operasional internal bagi petugas PTSP, seksi teknis, dan pimpinan kantor. Pengguna publik / masyarakat umum dapat menikmati seluruh layanan perizinan dan pelacakan status secara langsung di Beranda tanpa perlu akun login.
              </p>
              <button
                onClick={() => setActiveView('public_portal')}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke Beranda Publik</span>
              </button>
            </div>
          </div>
        )}

        {/* Tampilan Internal Petugas (Operator, Seksi, Kakan, Super Admin) */}
        {currentRole !== 'pemohon' && activeView === 'operator_portal' && (
          <OperatorPTSPView
            onPrintReceipt={(p) => setPrintedReceiptPermohonan(p)}
            onPreviewOfficialDocument={(p) => setPreviewDocumentPermohonan(p)}
          />
        )}

        {currentRole !== 'pemohon' && activeView === 'seksi_dashboard' && (
          <SeksiDashboardView
            onPreviewOfficialDocument={(p) => setPreviewDocumentPermohonan(p)}
          />
        )}

        {currentRole !== 'pemohon' && activeView === 'kakan_tte' && (
          <PimpinanTTEView
            onPreviewOfficialDocument={(p) => setPreviewDocumentPermohonan(p)}
          />
        )}

        {currentRole !== 'pemohon' && activeView === 'super_admin_portal' && (
          <SuperAdminPortal />
        )}
      </main>

      {/* 3. Official Government Footer */}
      <footer className="bg-emerald-950 text-white border-t border-emerald-900 pt-12 pb-8 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-emerald-900/60">
            {/* Identity */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-800 text-amber-300 font-black flex items-center justify-center text-sm border border-amber-400/40">
                  KM
                </div>
                <div>
                  <h4 className="font-black text-sm tracking-tight uppercase text-white">
                    {pengaturanWeb.namaKantor}
                  </h4>
                  <p className="text-xs text-emerald-300">
                    Sistem Pelayanan Terpadu Satu Pintu (PTSP) & TTE BSrE Online
                  </p>
                </div>
              </div>

              <p className="text-xs text-emerald-100/80 leading-relaxed max-w-lg">
                Melayani masyarakat {pengaturanWeb.kabupaten} dengan prinsip "{pengaturanWeb.slogan}" dan BerAKHLAK (Berorientasi Pelayanan, Akuntabel, Kompeten, Harmonis, Loyal, Adaptif, dan Kolaboratif) menuju Zona Integritas WBK/WBBM.
              </p>

              <div className="pt-2 text-xs text-emerald-200/90 space-y-1">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{pengaturanWeb.alamatLengkap}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{pengaturanWeb.telepon} • Call Center PTSP</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{pengaturanWeb.email}</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="font-bold text-xs uppercase tracking-wider text-amber-300 mb-3">
                Layanan & Navigasi
              </h5>
              <ul className="space-y-2 text-xs text-emerald-100/90">
                <li>
                  <button onClick={() => setActiveView('public_portal')} className="hover:text-amber-300 transition-colors">
                    Beranda & Katalog Layanan
                  </button>
                </li>
                <li>
                  <button onClick={() => handleOpenPermohonan()} className="hover:text-amber-300 transition-colors">
                    Pengajuan Permohonan Mandiri
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('tracking_view')} className="hover:text-amber-300 transition-colors">
                    Pelacakan Status Resi Online
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('operator_portal')} className="hover:text-amber-300 transition-colors">
                    Portal Operator PTSP
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('seksi_dashboard')} className="hover:text-amber-300 transition-colors">
                    Dashboard Seksi & Integrasi
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('kakan_tte')} className="hover:text-amber-300 transition-colors">
                    Persetujuan & TTE BSrE
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('super_admin_portal')} className="hover:text-amber-300 transition-colors text-amber-300 font-bold flex items-center gap-1">
                    <Crown className="w-3 h-3 text-amber-400" />
                    Menu Super Admin (Kelola Web)
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsValidatorModalOpen(true)} className="hover:text-amber-300 transition-colors">
                    Validasi Sertifikat TTE BSrE
                  </button>
                </li>
              </ul>
            </div>

            {/* SPBE Security Badge */}
            <div>
              <h5 className="font-bold text-xs uppercase tracking-wider text-amber-300 mb-3">
                Keamanan & Regulasi
              </h5>
              <div className="space-y-3 text-xs text-emerald-100/80">
                <div className="p-3 bg-emerald-900/60 rounded-xl border border-emerald-800 text-[11px] leading-relaxed">
                  <div className="flex items-center gap-1.5 text-amber-300 font-bold mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Tersertifikasi BSrE BSSN</span>
                  </div>
                  Dokumen dinas digital ditandatangani menggunakan sertifikat elektronik resmi yang dijamin integritasnya oleh Balai Sertifikasi Elektronik, BSSN RI.
                </div>
                <p className="text-[11px] text-emerald-300">
                  Standar Pelayanan Publik sesuai UU No. 25 Tahun 2009 & PMA RI.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300">
            <p>© {new Date().getFullYear()} {pengaturanWeb.namaKantor}. Hak Cipta Dilindungi Undang-Undang.</p>
            <p className="flex items-center gap-1">
              PTSP Digital {pengaturanWeb.singkatanKantor} • <span className="text-amber-300 font-semibold">{pengaturanWeb.slogan}</span>
            </p>
          </div>
        </div>
      </footer>

      {/* 4. Global Modals */}
      <PermohonanFormModal
        isOpen={isPermohonanModalOpen}
        onClose={() => setIsPermohonanModalOpen(false)}
        presetLayanan={selectedPresetLayanan}
      />

      <OfficialDocumentModal
        permohonan={previewDocumentPermohonan}
        onClose={() => setPreviewDocumentPermohonan(null)}
        onProceedToSign={() => {
          setActiveView('kakan_tte');
        }}
      />

      <ReceiptSlipModal
        permohonan={printedReceiptPermohonan}
        onClose={() => setPrintedReceiptPermohonan(null)}
      />

      <TTEValidatorModal
        isOpen={isValidatorModalOpen}
        onClose={() => setIsValidatorModalOpen(false)}
      />

      {/* 5. Real-Time WhatsApp Alert Simulation Toast - Disembunyikan untuk Pengguna Publik */}
      {currentRole !== 'pemohon' && <WhatsAppAlertToast />}
    </div>
  );
};

export default function App() {
  return (
    <PTSPProvider>
      <MainAppContent />
    </PTSPProvider>
  );
}
