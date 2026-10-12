import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Globe, 
  Database, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  ShieldCheck, 
  Info, 
  Laptop, 
  FileCode2,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { UniversitySeal } from './UniversitySeal';

interface PlatformNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenArchitecture?: () => void;
}

export const PlatformNoticeModal: React.FC<PlatformNoticeModalProps> = ({
  isOpen,
  onClose,
  onOpenArchitecture
}) => {
  const [dontShowAgainSession, setDontShowAgainSession] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDismiss = () => {
    if (dontShowAgainSession && typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('uos_lms_notice_dismissed', 'true');
      } catch {
        // Ignore session storage errors
      }
    }
    onClose();
  };

  const handleGoToArchitecture = () => {
    handleDismiss();
    if (onOpenArchitecture) {
      onOpenArchitecture();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/70 backdrop-blur-xs transition-opacity duration-200 p-0 sm:p-4 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      {/* Background click handler */}
      <div 
        className="fixed inset-0 -z-10" 
        onClick={handleDismiss} 
        aria-hidden="true" 
      />

      {/* Main Responsive Dialog Container:
          - Mobile (<sm): Slide-up bottom sheet with max height 90vh, rounded top, thumb drag pill
          - Tablet (sm..lg): Centered dialog with 600px max width
          - Desktop (lg+): Centered dialog with 760px max width, dual-column cards
      */}
      <div 
        className="w-full sm:max-w-xl lg:max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col max-h-[92dvh] sm:max-h-[88vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200 relative text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator Bar */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center bg-[#004b87]">
          <div className="w-12 h-1.5 bg-white/40 rounded-full" />
        </div>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#003866] via-[#004b87] to-[#0068b5] text-white px-5 sm:px-7 py-4 sm:py-5 border-b border-[#0068b5]/50 relative shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white rounded-2xl border-2 border-white/20 shadow-md shrink-0">
                <UniversitySeal size="md" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#c8e27b] text-[#003866] text-[10px] font-mono font-bold tracking-wider uppercase shadow-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#003866]" />
                    LMS &amp; E-Portal Showcase Model
                  </span>
                  <span className="text-[10px] text-slate-200 font-mono hidden sm:inline">
                    MetaWave Innovations
                  </span>
                </div>
                <h2 
                  id="modal-headline"
                  className="text-base sm:text-xl font-black tracking-tight text-white mt-1 leading-snug font-sans"
                >
                  University of Sindh LMS &amp; E-Portal
                </h2>
                <p className="text-xs text-slate-200 font-medium">
                  Modernization Platform · Demonstration &amp; Sample Showcase
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="min-w-[36px] min-h-[36px] p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center cursor-pointer shrink-0"
              aria-label="Close Notice"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-5 sm:p-7 space-y-4 sm:space-y-5 overflow-y-auto text-slate-700 text-xs sm:text-sm leading-relaxed">
          
          {/* Main Core Disclaimer Callout */}
          <div className="p-4 sm:p-4.5 rounded-2xl bg-amber-50/90 border-2 border-amber-300/80 text-amber-950 flex items-start gap-3 shadow-xs">
            <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-extrabold text-amber-950">
                  Please Note: LMS &amp; E-Portal Demonstration Model
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.2 rounded bg-amber-200/80 text-amber-900 border border-amber-300">
                  Sample Data Only
                </span>
              </div>
              <p className="text-amber-900 text-xs leading-relaxed">
                This platform is built in <strong>LMS and E-Portal mode</strong> to demonstrate how a modern university academic ecosystem operates. <strong>All information, courses, records, and data across this website have been compiled using Global Search Results and assisted by AI</strong>. Please consider all profiles, timetables, and figures as <strong>sample demonstration data</strong> created to present the highest quality LMS experience ready for academic QA and institutional inspection by the Vice-Chancellor and Department Chairperson.
              </p>
            </div>
          </div>

          {/* 3 Clear Core Cards: LMS Mode, Global Search + AI, Sample Data */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5">
            {/* Card 1: LMS & E-Portal Mode */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-2 hover:border-[#0068b5]/50 transition-colors">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-[#004b87]/10 text-[#004b87] flex items-center justify-center">
                  <Laptop className="w-4 h-4 text-[#004b87]" />
                </div>
                <h4 className="font-bold text-slate-900 text-xs leading-tight">
                  LMS &amp; E-Portal Mode
                </h4>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Engineered as a full Learning Management System and university E-Portal with interactive workflows for students, teachers, HODs, deans, and the VC.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200 text-[10px] font-mono text-[#004b87] font-bold">
                ✓ Full Portal Workflows
              </div>
            </div>

            {/* Card 2: Global Search & AI */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-2 hover:border-[#84a433]/50 transition-colors">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-[#84a433]/15 text-[#546e1a] flex items-center justify-center">
                  <Globe className="w-4 h-4 text-[#546e1a]" />
                </div>
                <h4 className="font-bold text-slate-900 text-xs leading-tight">
                  Global Search &amp; AI
                </h4>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Information on academic faculties, syllabi outlines, and rules was compiled using global web search results and developed with AI assistance.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200 text-[10px] font-mono text-[#546e1a] font-bold">
                ✓ Web &amp; AI Synthesized
              </div>
            </div>

            {/* Card 3: All Data is Sample */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-2 hover:border-amber-300 transition-colors">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100/70 text-amber-800 flex items-center justify-center">
                  <Database className="w-4 h-4 text-amber-800" />
                </div>
                <h4 className="font-bold text-slate-900 text-xs leading-tight">
                  All Data is Sample
                </h4>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  All student profiles, roll numbers, attendance records, exam results, and fee vouchers are purely illustrative sample data for demonstration.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200 text-[10px] font-mono text-amber-800 font-bold">
                ✓ Illustrative Records
              </div>
            </div>
          </div>

          {/* Quick Summary of Features Demonstrated */}
          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono mb-2">
              Features demonstrated in this LMS &amp; E-Portal sample:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Student LMS with course modules &amp; assignments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Live 75% attendance policy monitoring</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Master timetable &amp; exam datesheet engine</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>QR-coded examination admit slip &amp; 1Link challan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-50 px-5 sm:px-7 py-3.5 sm:py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          {/* Don't show again this session toggle */}
          <label className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-600 cursor-pointer select-none self-start sm:self-auto">
            <input
              type="checkbox"
              checked={dontShowAgainSession}
              onChange={(e) => setDontShowAgainSession(e.target.checked)}
              className="rounded text-[#004b87] focus:ring-[#004b87] border-slate-300 w-3.5 h-3.5 cursor-pointer"
            />
            <span>Do not show again during this browser session</span>
          </label>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onOpenArchitecture && (
              <button
                type="button"
                onClick={handleGoToArchitecture}
                className="flex-1 sm:flex-none min-h-[42px] px-3.5 py-2 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileCode2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Architecture Audit</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleDismiss}
              className="flex-1 sm:flex-none min-h-[42px] px-5 py-2 rounded-xl bg-[#004b87] hover:bg-[#003866] text-white text-xs font-bold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore LMS &amp; E-Portal</span>
              <ArrowRight className="w-4 h-4 text-[#c8e27b]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
