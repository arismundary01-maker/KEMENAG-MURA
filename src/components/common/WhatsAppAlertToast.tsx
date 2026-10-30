import React from 'react';
import { usePTSP } from '../../context/PTSPContext';
import { MessageSquare, X, ExternalLink, ShieldCheck } from 'lucide-react';

export const WhatsAppAlertToast: React.FC = () => {
  const { currentRole, whatsAppAlert, dismissWhatsAppAlert, setSelectedTrackingResi, setActiveView } = usePTSP();

  // Pengguna publik tidak menampilkan popup notifikasi
  if (currentRole === 'pemohon' || !whatsAppAlert || !whatsAppAlert.isOpen) return null;

  const handleOpenTracking = () => {
    if (whatsAppAlert.nomorResi) {
      setSelectedTrackingResi(whatsAppAlert.nomorResi);
      setActiveView('tracking_view');
      dismissWhatsAppAlert();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-emerald-950 text-white rounded-2xl shadow-2xl border-2 border-emerald-500/50 overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-900 px-4 py-2.5 flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-bold text-xs text-white">WhatsApp PTSP Kemenag MURA</span>
              <span className="text-[10px] text-emerald-300 block">Notifikasi Real-Time Pemohon</span>
            </div>
          </div>
          <button
            onClick={dismissWhatsAppAlert}
            className="p-1 rounded-lg hover:bg-emerald-800 text-emerald-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message body */}
        <div className="p-4 space-y-2 text-xs">
          <div className="flex items-center justify-between text-[11px] text-emerald-300 font-mono">
            <span>Terkirim ke: {whatsAppAlert.to}</span>
            <span>{whatsAppAlert.waktu}</span>
          </div>

          <div className="bg-emerald-900/60 p-3 rounded-xl border border-emerald-700/50 whitespace-pre-line text-emerald-50 text-[11px] leading-relaxed">
            {whatsAppAlert.pesan}
          </div>

          <div className="pt-1 flex items-center justify-between gap-2">
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Gateway Resmi Kemenag Mura
            </span>
            <button
              onClick={handleOpenTracking}
              className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              Lihat Progres <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
