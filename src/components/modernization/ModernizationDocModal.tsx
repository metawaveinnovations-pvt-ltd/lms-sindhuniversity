import React, { useEffect } from 'react';
import { X, Printer, BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';
import { ModernizationDocumentView } from './ModernizationDocumentView';

interface ModernizationDocModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToArchitecture?: () => void;
}

export const ModernizationDocModal: React.FC<ModernizationDocModalProps> = ({
  isOpen,
  onClose,
  onNavigateToArchitecture
}) => {
  // Lock body scroll when modal is open and handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Top Universal App Modal Bar */}
      <div className="bg-[#031f39] text-white border-b border-[#004b87] px-3 sm:px-6 py-2.5 flex items-center justify-between shrink-0 shadow-md">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-2.5 h-2.5 rounded-full bg-[#84a433] shrink-0 animate-pulse" />
          <div className="truncate">
            <span className="text-[10px] sm:text-xs font-bold text-[#c8e27b] uppercase tracking-wider block sm:inline">
              University of Sindh Jamshoro • FET
            </span>
            <span className="hidden sm:inline text-slate-400 mx-1.5">•</span>
            <span className="text-xs sm:text-sm font-bold text-white truncate">
              LMS &amp; E-Portal Modernization Document (9-Page Institutional Specification)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onNavigateToArchitecture && (
            <button
              onClick={() => {
                onClose();
                onNavigateToArchitecture();
              }}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-semibold cursor-pointer transition-colors"
              title="Open full interactive technical audit matrix"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#c8e27b]" />
              <span>Full Audit Console</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-white/10 hover:bg-rose-600/80 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            aria-label="Close document modal"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>
      </div>

      {/* Embedded Document View with internal scrolling */}
      <div className="flex-1 overflow-y-auto bg-slate-100">
        <ModernizationDocumentView onClose={onClose} isModal={true} />
      </div>
    </div>
  );
};
