import React, { useState } from 'react';
import { 
  FileText, 
  X, 
  Copy, 
  Check, 
  Download, 
  Printer, 
  Info, 
  CheckCircle2, 
  ExternalLink,
  Layers,
  FileSpreadsheet
} from 'lucide-react';
import { TemplateBerkas } from '../../types/ptsp';

interface TemplateViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: TemplateBerkas | null;
  layananNama?: string;
  allTemplates?: TemplateBerkas[];
  onSelectTemplate?: (t: TemplateBerkas) => void;
}

export const TemplateViewerModal: React.FC<TemplateViewerModalProps> = ({
  isOpen,
  onClose,
  template,
  layananNama,
  allTemplates = [],
  onSelectTemplate
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'petunjuk'>('preview');

  if (!isOpen || !template) return null;

  const currentTemplate = template;

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(currentTemplate.kontenTemplate);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback if clipboard API is constrained
      const textArea = document.createElement('textarea');
      textArea.value = currentTemplate.kontenTemplate;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleDownloadDoc = () => {
    const filename = `${currentTemplate.namaDokumen.replace(/[^a-zA-Z0-9_-]/g, '_')}.doc`;
    
    // Format as Word-compatible HTML document with standard styling
    const headerHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${currentTemplate.namaDokumen}</title>
        <style>
          body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5; margin: 2cm; }
          h3 { text-align: center; font-size: 14pt; margin-bottom: 20px; }
          .petunjuk { background-color: #f1f5f9; padding: 12px; border: 1px solid #cbd5e1; margin-bottom: 20px; font-size: 10pt; }
          pre { font-family: 'Times New Roman', Times, serif; font-size: 12pt; white-space: pre-wrap; word-wrap: break-word; }
        </style>
      </head>
      <body>
        <div class="petunjuk">
          <b>PETUNJUK FORMAT RESMI PTSP KEMENAG MURUNG RAYA:</b><br/>
          Layanan: ${layananNama || 'PTSP Kemenag Mura'}<br/>
          Dokumen: ${currentTemplate.namaDokumen}<br/>
          Harap sesuaikan data bertanda [ ... ] atau titik-titik (.....) sebelum ditandatangani dan diunggah.
        </div>
        <pre>${currentTemplate.kontenTemplate}</pre>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', headerHtml], {
      type: 'application/msword'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>${currentTemplate.namaDokumen} - Format Resmi PTSP Kemenag Mura</title>
          <style>
            @page { size: A4; margin: 20mm; }
            body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5; color: #000; margin: 0; padding: 10px; }
            .header-banner { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 25px; }
            .header-banner h2 { margin: 0; font-size: 14pt; text-transform: uppercase; }
            .header-banner p { margin: 3px 0 0 0; font-size: 10pt; }
            pre { font-family: 'Times New Roman', Times, serif; font-size: 12pt; white-space: pre-wrap; word-wrap: break-word; margin: 0; }
          </style>
        </head>
        <body>
          <div class="header-banner">
            <h2>KANTOR KEMENTERIAN AGAMA KABUPATEN MURUNG RAYA</h2>
            <p>SISTEM PELAYANAN TERPADU SATU PINTU (PTSP) DIGITAL</p>
            <p style="font-style: italic;">Format Dokumen Persyaratan: ${currentTemplate.namaDokumen}</p>
          </div>
          <pre>${currentTemplate.kontenTemplate}</pre>
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-4 sm:p-5 flex items-start justify-between gap-3 shrink-0">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-0.5">
              <FileText className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                  Format Template Resmi
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/15 text-white border border-white/20">
                  {currentTemplate.jenisFormat}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-700/80 text-emerald-100">
                  {currentTemplate.ekstensiFile}
                </span>
              </div>
              <h3 className="font-black text-base sm:text-lg text-white mt-1 leading-snug">
                {currentTemplate.namaDokumen}
              </h3>
              {layananNama && (
                <p className="text-xs text-emerald-100/90 mt-0.5 line-clamp-1">
                  Untuk Layanan: <span className="font-semibold text-amber-200">{layananNama}</span>
                </p>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            title="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If multiple templates are available for this service, show quick tabs */}
        {allTemplates.length > 1 && (
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center gap-2 overflow-x-auto shrink-0">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              Pilih Dokumen:
            </span>
            <div className="flex items-center gap-1.5 flex-nowrap">
              {allTemplates.map((t, idx) => {
                const isSelected = t.id === currentTemplate.id;
                return (
                  <button
                    key={t.id || idx}
                    type="button"
                    onClick={() => onSelectTemplate && onSelectTemplate(t)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold bg-black/10">
                      {idx + 1}
                    </span>
                    <span className="truncate max-w-[200px]">{t.namaDokumen}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Top Info Bar & Tabs */}
        <div className="px-4 py-3 bg-slate-50/70 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'preview'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Format Dokumen</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('petunjuk')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'petunjuk'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>Petunjuk Pengisian ({currentTemplate.petunjukPengisian.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyText}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 hover:text-slate-900'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Format Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-600" />
                  <span>Salin Teks Format</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownloadDoc}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Unduh format sebagai file Word .doc"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh .doc</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Cetak atau Simpan PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100/70">
          {activeTab === 'petunjuk' ? (
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="bg-amber-50 rounded-2xl border border-amber-200 p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-200/80 text-amber-900 flex items-center justify-center shrink-0">
                    <Info className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-amber-950">
                      Standar Berkas Persyaratan PTSP Kemenag Murung Raya
                    </h4>
                    <p className="text-xs text-amber-900/90 mt-1 leading-relaxed">
                      {currentTemplate.deskripsiSingkat}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Langkah & Ketentuan Pengisian Format:</span>
                </h4>
                <ul className="space-y-2.5">
                  {currentTemplate.petunjukPengisian.map((petunjuk, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="w-5 h-5 rounded-full bg-emerald-700 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{petunjuk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-4 flex items-center justify-between gap-3">
                <div className="text-xs text-emerald-950">
                  <p className="font-bold">Butuh mengedit format sekarang?</p>
                  <p className="text-emerald-800 text-[11px]">
                    Klik tombol "Unduh .doc" di atas untuk langsung membuka dan mengedit berkas di Microsoft Word.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadDoc}
                  className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
                >
                  Unduh .doc
                </button>
              </div>
            </div>
          ) : (
            /* Document Paper Simulation Container */
            <div className="max-w-3xl mx-auto space-y-4">
              {/* Notification Ribbon */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center justify-between gap-2 text-xs text-blue-900">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    Salin teks atau unduh dokumen ke <b>Word (.doc)</b>, lalu gantilah titik-titik (.....) dengan data asli Anda.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyText}
                  className="text-xs font-bold text-blue-700 hover:text-blue-900 underline shrink-0 cursor-pointer"
                >
                  {copied ? 'Tersalin ✓' : 'Salin Semua'}
                </button>
              </div>

              {/* The Paper Sheet */}
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 sm:p-10 font-serif text-slate-900 text-sm leading-relaxed relative">
                {/* Visual Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                  <div className="text-7xl font-sans font-black tracking-widest text-slate-900 rotate-[-30deg]">
                    KEMENAG MURA
                  </div>
                </div>

                <div className="relative z-10">
                  <pre className="font-mono text-xs sm:text-[13px] text-slate-800 whitespace-pre-wrap font-medium leading-relaxed selection:bg-emerald-100 selection:text-emerald-900">
                    {currentTemplate.kontenTemplate}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500">
            Syarat Terkait: <span className="font-semibold text-slate-700">{currentTemplate.syaratTerkait}</span>
          </div>
          <div className="flex items-center gap-2 justify-end">
            <button
              type="button"
              onClick={handleCopyText}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
            >
              {copied ? '✓ Berhasil Disalin' : 'Salin Teks'}
            </button>
            <button
              type="button"
              onClick={handleDownloadDoc}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh Template (.doc)</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
