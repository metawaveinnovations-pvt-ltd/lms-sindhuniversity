import React from 'react';
import { ShieldCheck, BookOpen, ExternalLink, HelpCircle, Heart, Lock, FileText, Building2, Sparkles } from 'lucide-react';
import { UserRole } from '../../types';
import { UniversitySeal } from './UniversitySeal';

interface FooterProps {
  onSelectRole: (role: UserRole) => void;
  onOpenNoticeModal?: () => void;
  onOpenModernizationDoc?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onSelectRole, 
  onOpenNoticeModal,
  onOpenModernizationDoc 
}) => {
  const handleOpenDoc = () => {
    if (onOpenModernizationDoc) {
      onOpenModernizationDoc();
    } else {
      onSelectRole('architecture');
    }
  };

  return (
    <footer className="bg-[#031f39] text-slate-300 text-sm border-t border-[#004b87] no-print">
      {/* Top Banner - Fully Responsive on Mobile, Tablet & Desktop */}
      <div className="bg-[#004b87] border-b border-[#0068b5]/40 py-5 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-3.5 text-center md:text-left flex-col sm:flex-row">
            <div className="p-1.5 bg-white rounded-2xl border-2 border-[#d8dadb] shadow-sm shrink-0">
              <UniversitySeal size="lg" />
            </div>
            <div>
              <h3 className="text-white font-extrabold text-base tracking-tight font-sans">
                UNIVERSITY OF SINDH
              </h3>
              <p className="text-[#c8e27b] font-semibold text-xs mt-0.5">
                Allama II Qazi Campus, Jamshoro · Central Learning Management System (LMS)
              </p>
              <p className="text-slate-200 text-[11px] mt-0.5">
                Maintained by Faculty of Engineering &amp; Technology (FET), University of Sindh · ITSC Data Center
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center md:justify-end w-full md:w-auto">
            {/* Dedicated 9-Page Modernization Document Button */}
            <button
              onClick={handleOpenDoc}
              className="min-h-[40px] px-4 py-2 bg-[#84a433] hover:bg-[#739129] active:scale-95 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md hover:shadow-lg border border-[#c8e27b]/30"
            >
              <FileText className="w-4 h-4 text-[#c8e27b]" />
              <span>Modernization Document (9 Pages)</span>
            </button>

            {onOpenNoticeModal && (
              <button
                onClick={onOpenNoticeModal}
                className="min-h-[40px] px-3.5 py-2 bg-white/10 hover:bg-white/20 text-[#c8e27b] hover:text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer border border-white/20"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#c8e27b]" />
                <span>LMS Notice</span>
              </button>
            )}

            <button
              onClick={() => onSelectRole('architecture')}
              className="min-h-[40px] px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer border border-white/15"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
              <span>Full Audit Matrix</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Institutional & Academic Context */}
        <div className="space-y-3">
          <div className="font-bold text-sm uppercase tracking-wider text-[#c8e27b]">
            Institutional Leadership
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Established in 1947, the University of Sindh is the second oldest university in Pakistan, empowering over 40,000 students across 6 campuses.
          </p>
          <div className="bg-white/5 p-3 rounded-lg border border-white/10 text-xs space-y-1.5">
            <div>
              <span className="text-slate-400">Vice-Chancellor: </span>
              <strong className="text-white">Prof. Dr. Muhammad Siddique Kalhoro</strong>
            </div>
            <div>
              <span className="text-slate-400">FET SWE Chairperson: </span>
              <strong className="text-[#c8e27b]">Prof. Dr. Arifa Bhutto</strong>
            </div>
            <div>
              <span className="text-slate-400">Controller of Exams: </span>
              <strong className="text-white">Prof. Muhammad Mashooque Baloch</strong>
            </div>
            <div>
              <span className="text-slate-400">Academic Scope: </span>
              <strong className="text-white">14 Faculties · 68 Departments</strong>
            </div>
            <div>
              <span className="text-slate-400">Campus: </span>
              <span className="text-[#c8e27b] font-semibold">Allama I.I. Kazi Jamshoro · Estd. 1947</span>
            </div>
          </div>
        </div>

        {/* Col 2: Engineering Partner (MetaWave Innovations) */}
        <div className="space-y-3">
          <div className="font-bold text-sm uppercase tracking-wider text-[#c8e27b]">
            Modernization Initiative
          </div>
          <div className="flex items-center gap-2 text-white font-semibold text-xs">
            <span className="w-2 h-2 rounded-full bg-[#84a433]" />
            <span>MetaWave Innovations Ltd.</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Theme: <strong className="text-white">Smart Systems — Engineering — Growth</strong>.
            Central LMS modernization standard benchmarked against LUMS and NUST academic workflows.
          </p>
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#a3c644]" />
            <span>Unified Centralized Platform for all Teachers, Staff & Students</span>
          </div>
          <div className="pt-1">
            <button
              onClick={handleOpenDoc}
              className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#c8e27b] hover:text-white border border-[#84a433]/40 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-[#84a433]" />
              <span>Read 9-Page Modernization Doc</span>
            </button>
          </div>
        </div>

        {/* Col 3: Academic Portals & Quick Switch */}
        <div className="space-y-3">
          <div className="font-bold text-sm uppercase tracking-wider text-[#c8e27b]">
            University Role Hierarchy
          </div>
          <ul className="text-xs space-y-1.5 text-slate-400">
            <li>
              <button onClick={() => onSelectRole('vc')} className="hover:text-white transition-colors cursor-pointer">
                VC — Vice-Chancellor Command
              </button>
            </li>
            <li>
              <button onClick={() => onSelectRole('dean')} className="hover:text-white transition-colors cursor-pointer">
                Dean — 14 Faculties Oversight
              </button>
            </li>
            <li>
              <button onClick={() => onSelectRole('chairman')} className="hover:text-white transition-colors cursor-pointer">
                Chairman — Department Secretariat
              </button>
            </li>
            <li>
              <button onClick={() => onSelectRole('hod')} className="hover:text-white transition-colors cursor-pointer">
                HOD — Institute Directorate
              </button>
            </li>
            <li>
              <button onClick={() => onSelectRole('faculty')} className="hover:text-white transition-colors cursor-pointer">
                Teachers — Lecture & Grading Roster
              </button>
            </li>
            <li>
              <button onClick={() => onSelectRole('student')} className="hover:text-white transition-colors cursor-pointer">
                Students — All Departments & Batches
              </button>
            </li>
            <li>
              <button onClick={() => onSelectRole('parent')} className="hover:text-white transition-colors cursor-pointer">
                Parents / Guardians — Ward Oversight
              </button>
            </li>
            <li>
              <button onClick={() => onSelectRole('admin')} className="hover:text-white transition-colors cursor-pointer">
                ITSC Systems & Telemetry Console
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Compliance & Digital Resources */}
        <div className="space-y-3">
          <div className="font-bold text-sm uppercase tracking-wider text-[#c8e27b]">
            Standards & Compliance
          </div>
          <div className="space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>WCAG 2.2 AA Accessibility Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400 shrink-0" />
              <span>HEC Pakistan National Quality Standards</span>
            </div>
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-purple-400 shrink-0" />
              <span>NCEAC Accreditation Alignment</span>
            </div>
            <button
              onClick={handleOpenDoc}
              className="flex items-center gap-2 text-left text-[#c8e27b] hover:text-white pt-1 transition-colors cursor-pointer group"
            >
              <FileText className="w-4 h-4 text-[#84a433] shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-semibold underline decoration-[#84a433]/50">9-Page Architecture Whitepaper (PDF)</span>
            </button>
          </div>
          <div className="pt-2">
            <div className="text-[11px] text-slate-500">
              ITSC Jamshoro Helpdesk:
              <br />
              <span className="text-slate-300 font-mono">support@usindh.edu.pk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/80 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © 2026 University of Sindh, Jamshoro. All Rights Reserved. Department of Software Engineering.
          </div>
          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>PECA 2016 Compliant</span>
            <span>•</span>
            <span className="text-amber-400 font-medium">MetaWave Innovations Assurance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
