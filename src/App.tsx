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
  ExternalLink 
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activeView, setActiveView } = usePTSP();

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

        {activeView === 'operator_portal' && (
          <OperatorPTSPView
            onPrintReceipt={(p) => setPrintedReceiptPermohonan(p)}
            onPreviewOfficialDocument={(p) => setPreviewDocumentPermohonan(p)}
          />
        )}

        {activeView === 'seksi_dashboard' && (
          <SeksiDashboardView
            onPreviewOfficialDocument={(p) => setPreviewDocumentPermohonan(p)}
          />
        )}

        {activeView === 'kakan_tte' && (
          <PimpinanTTEView
            onPreviewOfficialDocument={(p) => setPreviewDocumentPermohonan(p)}
          />
        )}

        {activeView === 'tracking_view' && (
          <TrackingView
            onPrintReceipt={(p) => setPrintedReceiptPermohonan(p)}
            onPreviewOfficialDocument={(p) => setPreviewDocumentPermohonan(p)}
            onOpenValidatorModal={() => setIsValidatorModalOpen(true)}
          />
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
                    KANTOR KEMENTERIAN AGAMA KABUPATEN MUSI RAWAS
                  </h4>
                  <p className="text-xs text-emerald-300">
                    Sistem Pelayanan Terpadu Satu Pintu (PTSP) & TTE BSrE Online
                  </p>
                </div>
              </div>

              <p className="text-xs text-emerald-100/80 leading-relaxed max-w-lg">
                Melayani masyarakat Kabupaten Musi Rawas dengan prinsip Ikhlas Beramal dan BerAKHLAK (Berorientasi Pelayanan, Akuntabel, Kompeten, Harmonis, Loyal, Adaptif, dan Kolaboratif) menuju Zona Integritas WBK/WBBM.
              </p>

              <div className="pt-2 text-xs text-emerald-200/90 space-y-1">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Komplek Perkantoran Pemkab Musi Rawas, Muara Beliti, Kab. Musi Rawas, Sumatera Selatan 31661</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>(0733) 4540112 • Call Center PTSP: 0812-7384-9921</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>ptsp.kemenagmura@kemenag.go.id</span>
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
            <p>© {new Date().getFullYear()} Kantor Kementerian Agama Kabupaten Musi Rawas. Hak Cipta Dilindungi Undang-Undang.</p>
            <p className="flex items-center gap-1">
              PTSP Digital Kemenag Mura • <span className="text-amber-300 font-semibold">Ikhlas Beramal</span>
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
      />

      <ReceiptSlipModal
        permohonan={printedReceiptPermohonan}
        onClose={() => setPrintedReceiptPermohonan(null)}
      />

      <TTEValidatorModal
        isOpen={isValidatorModalOpen}
        onClose={() => setIsValidatorModalOpen(false)}
      />

      {/* 5. Real-Time WhatsApp Alert Simulation Toast */}
      <WhatsAppAlertToast />
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
