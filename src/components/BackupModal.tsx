import React, { useRef, useState } from 'react';
import { X, Download, Upload, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { StorageService } from '../services/storage';

interface BackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataReload: () => void;
}

export const BackupModal: React.FC<BackupModalProps> = ({
  isOpen,
  onClose,
  onDataReload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleExport = () => {
    StorageService.exportFullBackup();
    setStatusMsg({ type: 'success', text: 'Backup downloaded successfully! Keep this JSON file safe.' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = StorageService.importBackup(content);
      if (success) {
        setStatusMsg({ type: 'success', text: 'Workspace restored successfully!' });
        onDataReload();
      } else {
        setStatusMsg({ type: 'error', text: 'Invalid backup JSON file format.' });
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm('Reset to default IT courses and demo assignments? Any custom changes will be overwritten.')) {
      StorageService.resetToDefault();
      setStatusMsg({ type: 'success', text: 'Reset to sample IT curriculum!' });
      onDataReload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <Download className="w-5 h-5 text-indigo-400" />
          <span>Workspace Backup & Sync</span>
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          Your syllabus checklists and assignments are safely stored in your browser. You can also export full backups to move between devices.
        </p>

        {statusMsg && (
          <div className={`mb-4 p-3 rounded-xl text-xs flex items-center gap-2 ${
            statusMsg.type === 'success' 
              ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30' 
              : 'bg-rose-950/40 text-rose-300 border border-rose-500/30'
          }`}>
            {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
            <span>{statusMsg.text}</span>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={handleExport}
            className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                <Download className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white group-hover:text-indigo-300">
                  Export Workspace (JSON)
                </div>
                <div className="text-[11px] text-slate-400">
                  Download all courses, syllabus checks & tasks
                </div>
              </div>
            </div>
            <span className="text-xs font-bold text-indigo-400">Export</span>
          </button>

          <div>
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white group-hover:text-emerald-300">
                    Import Backup File
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Load a previously exported JSON backup
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-400">Import</span>
            </button>
          </div>

          <button
            onClick={handleReset}
            className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-rose-500/40 hover:bg-slate-900 transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
                <RotateCcw className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white group-hover:text-rose-300">
                  Restore Sample IT Curriculum
                </div>
                <div className="text-[11px] text-slate-400">
                  Reset to default Networking, DB, Security & OOP courses
                </div>
              </div>
            </div>
            <span className="text-xs font-bold text-rose-400">Reset</span>
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
