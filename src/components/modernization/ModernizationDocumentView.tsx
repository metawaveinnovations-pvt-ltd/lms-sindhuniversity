import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, 
  Printer, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Database, 
  Server, 
  Cpu, 
  Layers, 
  Lock, 
  ExternalLink, 
  GraduationCap, 
  Building2, 
  BookOpen, 
  CreditCard, 
  QrCode, 
  Sparkles, 
  Maximize2, 
  Minimize2, 
  Search, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Users,
  Compass,
  ArrowRight,
  Fingerprint,
  Calendar,
  Award,
  ArrowLeftRight,
  Share2
} from 'lucide-react';
import { UniversitySeal } from '../common/UniversitySeal';
import { useSwipeNavigation, useAutoScrollActivePill } from '../../hooks/useSwipeNavigation';

interface ModernizationDocumentViewProps {
  onClose?: () => void;
  isModal?: boolean;
}

export const ModernizationDocumentView: React.FC<ModernizationDocumentViewProps> = ({ 
  onClose,
  isModal = false 
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'single' | 'continuous'>('single');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const documentContainerRef = useRef<HTMLDivElement>(null);

  const totalPages = 9;

  const pageTitles = [
    { page: 1, title: 'Executive Transmittal & Institutional Mandate', tag: 'Cover & Mandate' },
    { page: 2, title: 'Problem Analysis & Legacy E-Portal Forensic Audit', tag: 'Defect Analysis' },
    { page: 3, title: 'Target Enterprise Cloud Architecture & Hybrid Topology', tag: 'System Topology' },
    { page: 4, title: 'Unified Academic Schema & High-Throughput Engine', tag: 'Database & Scale' },
    { page: 5, title: 'Zero-Trust IAM, RBAC Matrix & HEC Compliance', tag: 'Security & RBAC' },
    { page: 6, title: 'Re-Engineered Core Academic Workflows (Admissions, Fees, Exams)', tag: 'Workflows' },
    { page: 7, title: 'Key UI/UX System Showcases & Interactive Visual Highlights', tag: 'UI Showcases' },
    { page: 8, title: 'Implementation Roadmap, Phased Rollout & Risk Mitigation', tag: 'Roadmap & Rollout' },
    { page: 9, title: 'Steering Committee Sign-Off & Official Verification', tag: 'Sign-Off & Cert' }
  ];

  // Mobile swipe navigation for smooth touch experience
  const pageIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
  const pageSwipeHandlers = useSwipeNavigation<typeof pageIds[number]>({
    items: [...pageIds],
    activeItem: currentPage.toString() as typeof pageIds[number],
    onSelect: (pageStr) => {
      const pageNum = parseInt(pageStr, 10);
      setCurrentPage(pageNum);
      if (documentContainerRef.current) {
        documentContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    minSwipeDistance: 38,
    ignoreScrollableChildren: true
  });
  const pageNavScrollRef = useAutoScrollActivePill(currentPage.toString());

  const handlePrint = () => {
    window.print();
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
    if (documentContainerRef.current) {
      documentContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
    if (documentContainerRef.current) {
      documentContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePageSelect = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (documentContainerRef.current) {
      documentContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCopyCitation = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(
        'University of Sindh Central LMS & E-Portal Modernization Specification (9-Page Document). Ref: UOS/FET/MWI/LMS-MOD/2026-V1. Department of Software Engineering, Jamshoro.'
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen text-slate-800 flex flex-col font-sans select-text">
      {/* Top Document Control Ribbon - Fully Responsive on Mobile, Tablet & Desktop */}
      <header className="bg-[#031f39] text-white border-b border-[#004b87] sticky top-0 z-40 px-3 sm:px-6 py-2.5 sm:py-3 shadow-md no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Document Identity */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 w-full md:w-auto">
            <div className="p-1 sm:p-1.5 bg-white rounded-xl border border-slate-300 shrink-0">
              <UniversitySeal size="sm" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] sm:text-xs font-black tracking-wider uppercase text-[#c8e27b]">
                  Official Whitepaper
                </span>
                <span className="text-[9px] sm:text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-slate-300 font-mono">
                  UOS-FET-MWI-LMS-2026
                </span>
                <span className="text-[9px] sm:text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded font-bold">
                  9 Pages Complete
                </span>
              </div>
              <h1 className="text-xs sm:text-sm md:text-base font-bold text-white truncate">
                LMS &amp; E-Portal Modernization Specification
              </h1>
            </div>
          </div>

          {/* Controls: Mode, Page Navigation, Zoom, Print */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-between sm:justify-end w-full md:w-auto">
            {/* View Mode Toggle */}
            <div className="bg-white/10 p-0.5 rounded-xl flex items-center text-xs">
              <button
                onClick={() => setViewMode('single')}
                className={`min-h-[34px] px-2.5 sm:px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer text-xs ${
                  viewMode === 'single' ? 'bg-[#004b87] text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                Page-by-Page
              </button>
              <button
                onClick={() => setViewMode('continuous')}
                className={`min-h-[34px] px-2.5 sm:px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer text-xs ${
                  viewMode === 'continuous' ? 'bg-[#004b87] text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                All 9 Pages
              </button>
            </div>

            {/* Citation Copy Button */}
            <button
              onClick={handleCopyCitation}
              className="min-h-[34px] px-2.5 py-1 bg-white/10 hover:bg-white/20 text-slate-200 text-xs rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
              title="Copy Citation"
            >
              <Share2 className="w-3.5 h-3.5 text-[#c8e27b]" />
              <span className="hidden sm:inline">{copiedLink ? 'Copied!' : 'Cite'}</span>
            </button>

            {/* Print Official Document Button */}
            <button
              onClick={handlePrint}
              className="min-h-[34px] px-3 sm:px-3.5 py-1.5 bg-[#84a433] hover:bg-[#739129] active:scale-95 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save PDF (9 Pages)</span>
              <span className="sm:hidden">Print PDF</span>
            </button>

            {isModal && onClose && (
              <button
                onClick={onClose}
                className="min-h-[34px] px-3 py-1.5 bg-white/10 hover:bg-rose-600/80 text-slate-200 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
              >
                Close
              </button>
            )}
          </div>
        </div>

        {/* Page Thumbnails / Step Navigator (Active in Single Page Mode) */}
        {viewMode === 'single' && (
          <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-white/10 flex items-center justify-between gap-1.5 sm:gap-2">
            {/* Prev / Next controls */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="min-h-[38px] min-w-[38px] p-1.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center cursor-pointer transition-colors shadow-2xs"
                title="Previous Page"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-white px-1 sm:px-2 whitespace-nowrap">
                <span className="text-[#c8e27b] font-mono">{currentPage}</span> / <span className="font-mono">{totalPages}</span>
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="min-h-[38px] min-w-[38px] p-1.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center cursor-pointer transition-colors shadow-2xs"
                title="Next Page"
                aria-label="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Pill Strip */}
            <div 
              ref={pageNavScrollRef}
              className="flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-1 py-1"
            >
              {pageTitles.map((p) => (
                <button
                  key={p.page}
                  data-nav-id={p.page}
                  onClick={() => handlePageSelect(p.page)}
                  className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    currentPage === p.page
                      ? 'bg-[#c8e27b] text-[#031f39] font-bold shadow-xs'
                      : 'bg-white/5 hover:bg-white/15 text-slate-300'
                  }`}
                  title={p.title}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                    currentPage === p.page ? 'bg-[#031f39] text-[#c8e27b]' : 'bg-white/10 text-slate-300'
                  }`}>
                    {p.page}
                  </span>
                  <span className="truncate max-w-[100px] sm:max-w-[140px]">{p.tag}</span>
                </button>
              ))}
            </div>

            {/* Swipe hint on mobile */}
            <div className="hidden lg:flex items-center gap-1 text-[10px] text-slate-400 font-mono shrink-0 pl-1 border-l border-white/10">
              <ArrowLeftRight className="w-3 h-3 text-[#c8e27b]" />
              <span>Swipe supported</span>
            </div>
          </div>
        )}
      </header>

      {/* Main Document Content Area with Swipe Support */}
      <main 
        ref={documentContainerRef}
        onTouchStart={pageSwipeHandlers.onTouchStart}
        onTouchEnd={pageSwipeHandlers.onTouchEnd}
        className="flex-1 overflow-y-auto p-2.5 sm:p-6 lg:p-8 pb-28 sm:pb-16 flex flex-col items-center gap-6 sm:gap-8"
      >
        {/* Render either current single page or all 9 continuous pages */}
        {viewMode === 'single' ? (
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-slate-300 overflow-hidden print:shadow-none print:border-none print:w-full print:max-w-none transition-all duration-200">
            {renderPage(currentPage)}
          </div>
        ) : (
          <div className="w-full max-w-4xl space-y-8 sm:space-y-12 print:space-y-0">
            {Array.from({ length: totalPages }).map((_, i) => (
              <div 
                key={i + 1} 
                className="bg-white rounded-2xl shadow-xl border border-slate-300 overflow-hidden print:shadow-none print:border-none print:w-full print:max-w-none print:break-after-page mb-6 sm:mb-8 print:mb-0"
              >
                {renderPage(i + 1)}
              </div>
            ))}
          </div>
        )}

        {/* Page Switcher Footer for Single Page Mode */}
        {viewMode === 'single' && (
          <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-3 bg-white px-4 sm:px-6 py-3.5 rounded-2xl border border-slate-200 shadow-sm no-print">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="min-h-[40px] w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Page ({Math.max(1, currentPage - 1)})</span>
            </button>

            <div className="text-center text-xs text-slate-500 py-1">
              <span className="block sm:inline">Page {currentPage} of {totalPages}: </span>
              <strong className="text-slate-800 font-semibold">{pageTitles[currentPage - 1].title}</strong>
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="min-h-[40px] w-full sm:w-auto px-4 py-2 bg-[#004b87] hover:bg-[#003865] disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
            >
              <span>Next Page ({Math.min(totalPages, currentPage + 1)})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>
    </div>
  );

  /* Helper to render individual pages */
  function renderPage(pageNum: number) {
    switch (pageNum) {
      case 1:
        return <PageOneCover />;
      case 2:
        return <PageTwoProblemAudit />;
      case 3:
        return <PageThreeArchitecture />;
      case 4:
        return <PageFourDatabaseScale />;
      case 5:
        return <PageFiveSecurityRBAC />;
      case 6:
        return <PageSixCoreWorkflows />;
      case 7:
        return <PageSevenShowcases />;
      case 8:
        return <PageEightRoadmapRollout />;
      case 9:
        return <PageNineSignOffGovernance />;
      default:
        return <div className="p-8 text-center">Page Not Found</div>;
    }
  }
};

/* =========================================================================
   PAGE 1: COVER, EXECUTIVE TRANSMITTAL & INSTITUTIONAL MANDATE
   ========================================================================= */
const PageOneCover: React.FC = () => {
  return (
    <div className="p-5 sm:p-10 md:p-12 min-h-[960px] sm:min-h-[1050px] flex flex-col justify-between bg-gradient-to-b from-white via-slate-50 to-[#f0f4f9] relative border-t-8 border-[#004b87]">
      {/* Running Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-slate-200 pb-3 text-xs gap-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-[#004b87]">UNIVERSITY OF SINDH, JAMSHORO</span>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <span className="text-slate-500 font-medium">FACULTY OF ENGINEERING &amp; TECHNOLOGY (FET)</span>
        </div>
        <div className="font-mono text-[10px] sm:text-[11px] font-semibold text-slate-500">
          PAGE 1 OF 9 • CONFIDENTIAL MANDATE
        </div>
      </div>

      {/* Main Cover Body */}
      <div className="my-auto py-6 sm:py-8 text-center space-y-4 sm:space-y-6">
        {/* Seal Lockup */}
        <div className="inline-block p-3 sm:p-4 bg-white rounded-3xl border-2 border-[#d8dadb] shadow-md">
          <UniversitySeal size="xl" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#004b87]/10 text-[#004b87] text-[11px] sm:text-xs font-bold uppercase tracking-widest border border-[#004b87]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#84a433]" />
            <span>Digital Transformation Initiative 2026-2027</span>
          </div>

          <h1 className="text-xl sm:text-3xl md:text-4xl font-black text-[#031f39] tracking-tight leading-tight max-w-2xl mx-auto px-2">
            CENTRAL LMS &amp; E-PORTAL MODERNIZATION SPECIFICATION
          </h1>
          <p className="text-xs sm:text-sm md:text-base font-semibold text-[#84a433] max-w-xl mx-auto px-2">
            Comprehensive Architectural Audit, Defect Remediation Framework &amp; Unified Cloud Academic Platform Blueprint
          </p>
        </div>

        {/* Executive Mandate Box */}
        <div className="max-w-2xl mx-auto bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm text-left text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="font-bold uppercase tracking-wider text-[#004b87] text-[11px]">
              Institutional Scope &amp; Authority
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
              Verified v1.0 Proposal
            </span>
          </div>
          <p className="text-slate-600 leading-relaxed text-xs">
            Formally presented under the academic guidance of the <strong>Department of Software Engineering (FET)</strong> and 
            engineered in collaboration with <strong>MetaWave Innovations Ltd.</strong>, this specification establishes the authoritative 
            re-engineering blueprint to replace the legacy fragmented web properties (<code className="font-mono text-[#004b87]">lms.usindh.edu.pk</code>, <code className="font-mono text-[#004b87]">admissions.usindh.edu.pk</code>, <code className="font-mono text-[#004b87]">eportal.usindh.edu.pk</code>) 
            with a unified, cloud-native Academic Operating System serving over <strong>40,000 students</strong> and <strong>1,800 faculty members</strong> across <strong>14 Faculties and 68 Academic Departments</strong>.
          </p>
        </div>

        {/* Key Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-2xl mx-auto text-left text-xs">
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Initiated By</span>
            <strong className="text-slate-900 block mt-0.5 text-xs truncate">BS Software Eng.</strong>
            <span className="text-[10px] text-slate-500 font-medium">Batch 2K23 (FET)</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Executive Sponsor</span>
            <strong className="text-slate-900 block mt-0.5 text-xs truncate">Prof. Dr. M. S. Kalhoro</strong>
            <span className="text-[10px] text-slate-500 font-medium">Vice-Chancellor</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Academic Lead</span>
            <strong className="text-slate-900 block mt-0.5 text-xs truncate">Prof. Dr. Arifa Bhutto</strong>
            <span className="text-[10px] text-slate-500 font-medium">Chairperson, SWE</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Assurance Partner</span>
            <strong className="text-[#84a433] block mt-0.5 text-xs truncate">MetaWave Innovations</strong>
            <span className="text-[10px] text-slate-500 font-medium">Smart Systems Eng.</span>
          </div>
        </div>
      </div>

      {/* Running Footer */}
      <div className="border-t-2 border-slate-200 pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-500 gap-1.5 text-center sm:text-left">
        <div>
          University of Sindh · Allama I.I. Kazi Campus, Jamshoro · Sindh, Pakistan · Established 1947
        </div>
        <div className="font-mono text-[#004b87] font-bold">
          Ref: UOS/MWI/LMS-MOD/2026-V1
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   PAGE 2: PROBLEM STATEMENT & LEGACY E-PORTAL FORENSIC AUDIT
   ========================================================================= */
const PageTwoProblemAudit: React.FC = () => {
  return (
    <div className="p-5 sm:p-10 md:p-12 min-h-[960px] sm:min-h-[1050px] flex flex-col justify-between bg-white border-t-8 border-[#004b87]">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3 text-xs">
        <div className="font-bold text-[#004b87] flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span className="truncate">SECTION 1: FORENSIC ARCHITECTURAL &amp; DEFECT AUDIT</span>
        </div>
        <div className="font-mono text-[10px] sm:text-[11px] font-semibold text-slate-500 shrink-0">
          PAGE 2 OF 9
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 sm:space-y-6 my-4 text-xs sm:text-sm">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            1. Problem Statement &amp; Legacy Architectural Bottlenecks
          </h2>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            A comprehensive empirical audit of public University of Sindh web properties (specifically <code className="font-mono text-blue-700">lms.usindh.edu.pk</code> and ancillary portals) 
            identified structural vulnerabilities, fragmented UX flows, stale configurations, and missing transactional capabilities.
          </p>
        </div>

        {/* 6 Key Architectural Defect Clusters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="p-3.5 sm:p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
              <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0" />
              <span>DEFECT CLUSTER A: Domain &amp; Auth Fragmentation</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Students and teachers must juggle multiple unconnected web domains with conflicting credentials: 
              <span className="font-mono text-[11px]"> lms.usindh.edu.pk</span>, <span className="font-mono text-[11px]">eportal.usindh.edu.pk</span>, and <span className="font-mono text-[11px]">admissions.usindh.edu.pk</span>. No Central Single Sign-On (SSO) exists.
            </p>
            <div className="text-[10px] font-mono text-rose-700 font-bold">
              Classification: CONFIRMED • Severity: P0 CRITICAL
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
              <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0" />
              <span>DEFECT CLUSTER B: Stale Legacy Content (2021 Artifacts)</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              The public LMS hero and navigation banners display stale links dating back to "Bachelor Admissions 2021" and obsolete circulars, eroding digital credibility for prospective candidates and international ranking accreditors.
            </p>
            <div className="text-[10px] font-mono text-rose-700 font-bold">
              Classification: CONFIRMED (LMS-001) • Severity: P1 HIGH
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
              <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0" />
              <span>DEFECT CLUSTER C: Navigational &amp; Lexical Errors</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Critical public navigational tabs suffer from persistent typographical flaws, notably <strong className="text-amber-900">"Tranings"</strong> (misspelling of Trainings) and <strong className="text-amber-900">"Learning Managment System"</strong> (missing 'e'), causing negative impressions during HEC audits.
            </p>
            <div className="text-[10px] font-mono text-amber-800 font-bold">
              Classification: CONFIRMED (LMS-006, LMS-007) • Severity: P2 MEDIUM
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
              <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0" />
              <span>DEFECT CLUSTER D: Duplicate Routes &amp; Broken Endpoints</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Inconsistent server routing returns parallel duplicate URLs for the same resource (<code className="font-mono text-[11px]">/index.php</code> vs <code className="font-mono text-[11px]">/index.html</code>) with missing canonical 301 redirects, breaking SEO indexing and browser back-history traversal.
            </p>
            <div className="text-[10px] font-mono text-amber-800 font-bold">
              Classification: CONFIRMED (LMS-004) • Severity: P2 MEDIUM
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs">
              <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
              <span>DEFECT CLUSTER E: Examination Surge Crash Bottlenecks</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              During semester result announcements, un-cached SQL queries against un-indexed monolithic database tables exhaust Apache/PHP thread pools, leading to total server timeout (HTTP 504 Gateway Timeout) under 10,000+ concurrent requests.
            </p>
            <div className="text-[10px] font-mono text-indigo-800 font-bold">
              Classification: PROBABLE (LMS-018) • Severity: P0 CRITICAL
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs">
              <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
              <span>DEFECT CLUSTER F: Manual Paper Challan Friction</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Fee payments require students to stand in physical bank queues at HBL/NBP, collect physical stamped paper receipts, and manually submit paper copies to department clerks, delaying semester registration by 7 to 14 working days.
            </p>
            <div className="text-[10px] font-mono text-indigo-800 font-bold">
              Classification: CONFIRMED • Severity: P1 HIGH
            </div>
          </div>
        </div>

        {/* Audit Evidence Summary Matrix */}
        <div className="p-3.5 sm:p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Summary of Evaluated Findings (Audit Range: LMS-001 through LMS-020)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
            <div className="p-2 bg-white rounded border border-slate-200">
              <strong className="text-blue-900 block font-mono">11 Confirmed</strong>
              <span className="text-slate-500">Publicly verified via HTTP probes</span>
            </div>
            <div className="p-2 bg-white rounded border border-slate-200">
              <strong className="text-amber-800 block font-mono">5 Probable</strong>
              <span className="text-slate-500">Inferred from stack telemetry</span>
            </div>
            <div className="p-2 bg-white rounded border border-slate-200">
              <strong className="text-purple-800 block font-mono">4 Unknown</strong>
              <span className="text-slate-500">Requires ITSC DB credentials</span>
            </div>
            <div className="p-2 bg-white rounded border border-slate-200">
              <strong className="text-emerald-800 block font-mono">100% Remediated</strong>
              <span className="text-slate-500">Solved in proposed architecture</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-slate-200 pt-3 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500">
        <span>University of Sindh · LMS Modernization Audit Register</span>
        <span className="font-mono">Page 2 of 9</span>
      </div>
    </div>
  );
};

/* =========================================================================
   PAGE 3: TARGET ENTERPRISE SYSTEM ARCHITECTURE & INFRASTRUCTURE TOPOLOGY
   ========================================================================= */
const PageThreeArchitecture: React.FC = () => {
  return (
    <div className="p-5 sm:p-10 md:p-12 min-h-[960px] sm:min-h-[1050px] flex flex-col justify-between bg-white border-t-8 border-[#004b87]">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3 text-xs">
        <div className="font-bold text-[#004b87] flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-[#004b87]" />
          <span className="truncate">SECTION 2: TARGET SYSTEM ARCHITECTURE &amp; TOPOLOGY</span>
        </div>
        <div className="font-mono text-[10px] sm:text-[11px] font-semibold text-slate-500 shrink-0">
          PAGE 3 OF 9
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 sm:space-y-6 my-4 text-xs sm:text-sm">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            2. Target Enterprise Cloud-Native Multi-Tier Architecture
          </h2>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            The target architecture replaces monolithic legacy PHP scripts with a modern, decoupled microservices mesh protected by an enterprise API Gateway and unified identity realm.
          </p>
        </div>

        {/* 4-Tier Architectural Diagram Illustration */}
        <div className="space-y-3">
          {/* Tier 1: Client Edge */}
          <div className="p-3.5 sm:p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-1.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
              <span className="font-bold text-blue-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                TIER 1: Client Edge &amp; Presentation Layer (Universal Web PWA)
              </span>
              <span className="font-mono text-[10px] text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200 self-start sm:self-auto">
                React 18 + Tailwind + Vite
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Single responsive web app tailored for Desktop, Tablet, and Touch Mobile. Includes WCAG 2.2 AA accessibility, service workers for offline cached timetables, and tactile touch navigation.
            </p>
          </div>

          {/* Tier 2: API Gateway & Security Ingress */}
          <div className="p-3.5 sm:p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 space-y-1.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
              <span className="font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0" />
                TIER 2: Ingress API Gateway &amp; Enterprise SSO Realm
              </span>
              <span className="font-mono text-[10px] text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200 self-start sm:self-auto">
                Kong Gateway + Keycloak OIDC
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Handles rate limiting (DDoS deterrence), SSL termination (TLS 1.3), OpenID Connect token verification, and federated Single Sign-On across all 14 Faculties and satellite campuses.
            </p>
          </div>

          {/* Tier 3: Core Domain Microservices */}
          <div className="p-3.5 sm:p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
              <span className="font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
                TIER 3: Core Domain Academic Microservices
              </span>
              <span className="font-mono text-[10px] text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200 self-start sm:self-auto">
                Node.js / Express Micro-Runtimes
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="p-2 bg-white rounded border border-emerald-200">
                <strong className="text-slate-900 block font-semibold">Academic Engine</strong>
                <span className="text-slate-500">Cohorts, courses &amp; syllabi</span>
              </div>
              <div className="p-2 bg-white rounded border border-emerald-200">
                <strong className="text-slate-900 block font-semibold">1Link Treasury</strong>
                <span className="text-slate-500">60-sec auto bank reconcile</span>
              </div>
              <div className="p-2 bg-white rounded border border-emerald-200">
                <strong className="text-slate-900 block font-semibold">75% Attendance</strong>
                <span className="text-slate-500">Biometric &amp; digital logging</span>
              </div>
              <div className="p-2 bg-white rounded border border-emerald-200">
                <strong className="text-slate-900 block font-semibold">Exam &amp; QR Slips</strong>
                <span className="text-slate-500">Tamper-proof digital cards</span>
              </div>
            </div>
          </div>

          {/* Tier 4: Storage, Caching & Disaster Recovery */}
          <div className="p-3.5 sm:p-4 rounded-xl border border-purple-200 bg-purple-50/50 space-y-1.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
              <span className="font-bold text-purple-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600 shrink-0" />
                TIER 4: Distributed Database, Redis Cache &amp; S3 Storage
              </span>
              <span className="font-mono text-[10px] text-purple-700 bg-white px-2 py-0.5 rounded border border-purple-200 self-start sm:self-auto">
                PostgreSQL 16 HA + Redis Sentinel
              </span>
            </div>
            <p className="text-xs text-slate-600">
              PostgreSQL primary-replica cluster with connection pooling (PgBouncer), sub-millisecond Redis key-value result caching, and MinIO S3 for encrypted lecture notes &amp; syllabus PDFs.
            </p>
          </div>
        </div>

        {/* ITSC Jamshoro Hybrid Hosting Topology */}
        <div className="p-3.5 sm:p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Hybrid On-Premises &amp; Cloud Deployment Specification
            </h4>
            <span className="text-[10px] bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded">
              99.95% SLA
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-700">
            <div>
              <strong className="text-slate-900 block">ITSC Primary Cluster</strong>
              <span className="text-slate-500 text-[11px]">
                Bare-metal Kubernetes cluster situated at University of Sindh Data Center, Jamshoro.
              </span>
            </div>
            <div>
              <strong className="text-slate-900 block">Offsite Geo-Replication</strong>
              <span className="text-slate-500 text-[11px]">
                Real-time WAL streaming replication to national cloud (HEC PERN / Islamabad node).
              </span>
            </div>
            <div>
              <strong className="text-slate-900 block">Edge Caching CDN</strong>
              <span className="text-slate-500 text-[11px]">
                Static assets and courseware hosted via Edge CDN nodes across Karachi and Hyderabad.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-slate-200 pt-3 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500">
        <span>University of Sindh · Central LMS Modernization Topology</span>
        <span className="font-mono">Page 3 of 9</span>
      </div>
    </div>
  );
};

/* =========================================================================
   PAGE 4: UNIFIED DATABASE SCHEMA & HIGH-THROUGHPUT PERFORMANCE
   ========================================================================= */
const PageFourDatabaseScale: React.FC = () => {
  return (
    <div className="p-5 sm:p-10 md:p-12 min-h-[960px] sm:min-h-[1050px] flex flex-col justify-between bg-white border-t-8 border-[#004b87]">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3 text-xs">
        <div className="font-bold text-[#004b87] flex items-center gap-1.5">
          <Database className="w-4 h-4 text-blue-700" />
          <span className="truncate">SECTION 3: DATABASE ARCHITECTURE &amp; CONCURRENCY</span>
        </div>
        <div className="font-mono text-[10px] sm:text-[11px] font-semibold text-slate-500 shrink-0">
          PAGE 4 OF 9
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 sm:space-y-6 my-4 text-xs sm:text-sm">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            3. Normalized Relational Schema &amp; High-Throughput Scaling
          </h2>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Eliminates redundant data duplication across faculties through a 3NF normalized PostgreSQL schema engineered to withstand 15,000+ simultaneous queries during semester result releases.
          </p>
        </div>

        {/* Master Normalized Entity Relationship Matrix with Mobile Overflow Protection */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="bg-[#004b87] text-white px-3 sm:px-4 py-2 text-xs font-bold flex items-center justify-between">
            <span className="truncate">CORE RELATIONAL TABLES &amp; PARTITIONS</span>
            <span className="text-[#c8e27b] font-mono text-[10px] shrink-0">PostgreSQL 16 Engine</span>
          </div>
          <div className="overflow-x-auto">
            <div className="divide-y divide-slate-100 text-xs min-w-[500px]">
              <div className="p-3 bg-white grid grid-cols-4 gap-2">
                <span className="font-mono font-bold text-blue-900">uos_students</span>
                <span className="text-slate-600 col-span-2">Permanent academic record, CNIC, roll number, faculty ID</span>
                <span className="text-[11px] font-mono text-slate-500">PK: student_id (UUID)</span>
              </div>
              <div className="p-3 bg-slate-50 grid grid-cols-4 gap-2">
                <span className="font-mono font-bold text-blue-900">uos_enrollments</span>
                <span className="text-slate-600 col-span-2">Course registration, batch cohort, elective selections</span>
                <span className="text-[11px] font-mono text-slate-500">FK: student_id, course_id</span>
              </div>
              <div className="p-3 bg-white grid grid-cols-4 gap-2">
                <span className="font-mono font-bold text-blue-900">uos_attendance_ledger</span>
                <span className="text-slate-600 col-span-2">Daily lecture logs, timestamp, biometric status, 75% running %</span>
                <span className="text-[11px] font-mono text-slate-500">Partitioned by semester</span>
              </div>
              <div className="p-3 bg-slate-50 grid grid-cols-4 gap-2">
                <span className="font-mono font-bold text-blue-900">uos_examinations</span>
                <span className="text-slate-600 col-span-2">Midterm &amp; Final results, marks ledger, cryptographic QR hash</span>
                <span className="text-[11px] font-mono text-slate-500">Indexed: student_id, exam_id</span>
              </div>
              <div className="p-3 bg-white grid grid-cols-4 gap-2">
                <span className="font-mono font-bold text-blue-900">uos_challans_1link</span>
                <span className="text-slate-600 col-span-2">16-digit 1Bill token, bank transaction ID, auto-reconcile stamp</span>
                <span className="text-[11px] font-mono text-slate-500">Status: PAID | UNPAID</span>
              </div>
            </div>
          </div>
        </div>

        {/* High Concurrency Result Day Strategy */}
        <div className="p-4 sm:p-5 rounded-xl border border-blue-200 bg-blue-50/50 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-[#004b87]" />
              <span>Result Release Surge Solution (15,000+ Concurrent Students)</span>
            </h4>
            <span className="text-[10px] bg-blue-700 text-white font-mono px-2 py-0.5 rounded font-bold self-start sm:self-auto">
              Sub-450ms p95 SLA
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs">
            <div className="p-3 bg-white rounded-lg border border-blue-100 space-y-1">
              <strong className="text-slate-900 block font-bold">1. Redis Hot Pre-Warming</strong>
              <p className="text-slate-600 text-[11px]">
                Upon official Controller release, all transcript hashes are pre-baked into Redis cluster in-memory caches, avoiding any live SQL joins.
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-blue-100 space-y-1">
              <strong className="text-slate-900 block font-bold">2. PgBouncer Connection Pool</strong>
              <p className="text-slate-600 text-[11px]">
                5,000 incoming simultaneous connections are multiplexed over 200 high-performance connection pool handles, preventing database thread exhaustion.
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-blue-100 space-y-1">
              <strong className="text-slate-900 block font-bold">3. Static Edge CDN Delivery</strong>
              <p className="text-slate-600 text-[11px]">
                Rendered printable admit slips and transcript PDFs are stored on encrypted S3 edge nodes with pre-signed ephemeral URLs.
              </p>
            </div>
          </div>
        </div>

        {/* High Availability & RTO / RPO Targets */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-center text-xs">
          <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Target RPO</span>
            <strong className="text-sm sm:text-base font-black text-blue-900 mt-0.5 block">&lt; 15 Minutes</strong>
            <span className="text-[10px] text-slate-500">WAL archiving</span>
          </div>
          <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Target RTO</span>
            <strong className="text-sm sm:text-base font-black text-emerald-700 mt-0.5 block">&lt; 45 Minutes</strong>
            <span className="text-[10px] text-slate-500">Auto failover</span>
          </div>
          <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Peak Load</span>
            <strong className="text-sm sm:text-base font-black text-[#004b87] mt-0.5 block">15,000+ Users</strong>
            <span className="text-[10px] text-slate-500">Benchmarked</span>
          </div>
          <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Redundancy</span>
            <strong className="text-sm sm:text-base font-black text-purple-900 mt-0.5 block">N+2 Standby</strong>
            <span className="text-[10px] text-slate-500">Patroni HA</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-slate-200 pt-3 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500">
        <span>University of Sindh · Database Performance Engineering</span>
        <span className="font-mono">Page 4 of 9</span>
      </div>
    </div>
  );
};

/* =========================================================================
   PAGE 5: ZERO-TRUST IAM, RBAC MATRIX & HEC COMPLIANCE
   ========================================================================= */
const PageFiveSecurityRBAC: React.FC = () => {
  return (
    <div className="p-5 sm:p-10 md:p-12 min-h-[960px] sm:min-h-[1050px] flex flex-col justify-between bg-white border-t-8 border-[#004b87]">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3 text-xs">
        <div className="font-bold text-[#004b87] flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="truncate">SECTION 4: ZERO-TRUST SECURITY &amp; ROLE-BASED ACCESS (RBAC)</span>
        </div>
        <div className="font-mono text-[10px] sm:text-[11px] font-semibold text-slate-500 shrink-0">
          PAGE 5 OF 9
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 sm:space-y-6 my-4 text-xs sm:text-sm">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            4. Institutional Role-Based Access Control (RBAC) &amp; Security
          </h2>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Strict separation of duties enforcing the Principle of Least Privilege across academic, administrative, and executive ranks aligned with HEC National QA Criteria and PECA 2016 privacy mandates.
          </p>
        </div>

        {/* 8-Persona Institutional Access Matrix with Mobile Horizontal Scroll */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[580px]">
              <thead className="bg-[#031f39] text-white">
                <tr>
                  <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[11px]">Role / Persona</th>
                  <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[11px]">Institutional Scope</th>
                  <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[11px]">Authorized Capabilities</th>
                  <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-[11px]">Restricted Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50">
                  <td className="py-2 px-3 font-bold text-blue-900">Vice-Chancellor (VC)</td>
                  <td className="py-2 px-3">University-Wide (14 Faculties)</td>
                  <td className="py-2 px-3 text-[11px]">Executive intelligence, treasury, emergency alerts, syndicate reports</td>
                  <td className="py-2 px-3 text-rose-600 text-[11px]">Direct raw student record edits</td>
                </tr>
                <tr className="hover:bg-slate-50 bg-slate-50/50">
                  <td className="py-2 px-3 font-bold text-blue-900">Dean of Faculty</td>
                  <td className="py-2 px-3">Faculty Level (e.g. FET, Arts, Science)</td>
                  <td className="py-2 px-3 text-[11px]">Departmental oversight, teacher allocation vetting, Board of Faculty approval</td>
                  <td className="py-2 px-3 text-rose-600 text-[11px]">Cross-faculty budget transfers</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2 px-3 font-bold text-blue-900">Chairman / HOD</td>
                  <td className="py-2 px-3">Department Secretariat (SWE, IBA, etc.)</td>
                  <td className="py-2 px-3 text-[11px]">Master timetable locks, teacher course roster, midterm result authorization</td>
                  <td className="py-2 px-3 text-rose-600 text-[11px]">Post-publishing grade changes</td>
                </tr>
                <tr className="hover:bg-slate-50 bg-slate-50/50">
                  <td className="py-2 px-3 font-bold text-blue-900">Teacher / Faculty</td>
                  <td className="py-2 px-3">Assigned Course Sections</td>
                  <td className="py-2 px-3 text-[11px]">Daily 75% attendance entry, CLO marks entry, courseware upload, at-risk flags</td>
                  <td className="py-2 px-3 text-rose-600 text-[11px]">Unassigned course access</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2 px-3 font-bold text-blue-900">Student</td>
                  <td className="py-2 px-3">Self-Enrolled Profile</td>
                  <td className="py-2 px-3 text-[11px]">Subject selection, attendance view, 1Link challan payment, QR admit slip, GPA</td>
                  <td className="py-2 px-3 text-rose-600 text-[11px]">Any write access to grades/logs</td>
                </tr>
                <tr className="hover:bg-slate-50 bg-slate-50/50">
                  <td className="py-2 px-3 font-bold text-blue-900">Parent / Guardian</td>
                  <td className="py-2 px-3">Linked Ward(s)</td>
                  <td className="py-2 px-3 text-[11px]">Attendance safety gauge, fee clearance verification, advisor consultation</td>
                  <td className="py-2 px-3 text-rose-600 text-[11px]">Private batch communications</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2 px-3 font-bold text-blue-900">ITSC Admin</td>
                  <td className="py-2 px-3">System &amp; Network Nodes</td>
                  <td className="py-2 px-3 text-[11px]">Keycloak user provisioning, cluster health, telemetry, automated backup jobs</td>
                  <td className="py-2 px-3 text-rose-600 text-[11px]">Modifying academic marks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Security Hardening Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>Cryptographic Audit Trails</span>
            </div>
            <p className="text-slate-600 text-xs">
              Every score update, fee reconciliation, and attendance edit is signed with a SHA-256 hash log stored in an immutable append-only audit register.
            </p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
              <Fingerprint className="w-4 h-4 text-blue-600" />
              <span>Multi-Factor Auth (MFA)</span>
            </div>
            <p className="text-slate-600 text-xs">
              Faculty grade submissions and administrative actions mandate FIDO2 Passkeys or time-based OTPs, preventing credential stuffing attacks.
            </p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span>PECA 2016 Compliance</span>
            </div>
            <p className="text-slate-600 text-xs">
              Fully aligned with Pakistan Electronic Crimes Act 2016 and HEC National Quality Standards. Personal data is encrypted at rest (AES-256).
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-slate-200 pt-3 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500">
        <span>University of Sindh · Security &amp; Access Control Architecture</span>
        <span className="font-mono">Page 5 of 9</span>
      </div>
    </div>
  );
};

/* =========================================================================
   PAGE 6: RE-ENGINEERED CORE ACADEMIC WORKFLOWS
   ========================================================================= */
const PageSixCoreWorkflows: React.FC = () => {
  return (
    <div className="p-5 sm:p-10 md:p-12 min-h-[960px] sm:min-h-[1050px] flex flex-col justify-between bg-white border-t-8 border-[#004b87]">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3 text-xs">
        <div className="font-bold text-[#004b87] flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-[#84a433]" />
          <span className="truncate">SECTION 5: RE-ENGINEERED ACADEMIC WORKFLOWS</span>
        </div>
        <div className="font-mono text-[10px] sm:text-[11px] font-semibold text-slate-500 shrink-0">
          PAGE 6 OF 9
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 sm:space-y-6 my-4 text-xs sm:text-sm">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            5. Re-Engineered Core Academic Workflows
          </h2>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Eliminating physical manual bottlenecks by replacing paper processing with automated, instant digital workflows for admissions, banking, attendance, and exam issuance.
          </p>
        </div>

        {/* 4 Core Re-Engineered Workflows */}
        <div className="space-y-3 sm:space-y-4">
          {/* Workflow 1: Admissions 2026 */}
          <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-xs flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#004b87]" />
                WORKFLOW 1: Online Admissions 2026 &amp; Real-Time Merit Lists
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                100% Paperless
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs text-slate-600">
              <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-200">
                <strong className="text-rose-800 block text-[11px]">Legacy Flaw:</strong>
                Physical form submission, manual entry errors, outdated 2021 web labels, and manual merit list calculating requiring weeks.
              </div>
              <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                <strong className="text-emerald-800 block text-[11px]">Modernized Solution:</strong>
                CNIC/B-Form auto-validation, digital quota assignment, automated aggregate merit calculation, and instant SMS admission offers.
              </div>
            </div>
          </div>

          {/* Workflow 2: 1Link Fees */}
          <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-xs flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                WORKFLOW 2: 1Link / 1Bill Instant Banking Reconciliation
              </span>
              <span className="text-[10px] bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded">
                &lt; 60 Sec Clearance
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs text-slate-600">
              <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-200">
                <strong className="text-rose-800 block text-[11px]">Legacy Flaw:</strong>
                4-copy carbon paper challans, physical bank queues, manual teller stamping, 10-day delay in student portal course unlocking.
              </div>
              <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                <strong className="text-emerald-800 block text-[11px]">Modernized Solution:</strong>
                16-digit 1Bill token payable via any banking app, JazzCash, or Easypaisa. Webhook reconciliation unlocks LMS access in under 60 seconds.
              </div>
            </div>
          </div>

          {/* Workflow 3: 75% Attendance */}
          <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-xs flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                WORKFLOW 3: 75% Mandatory Attendance Tracking &amp; At-Risk Alerts
              </span>
              <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
                HEC Enforced
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs text-slate-600">
              <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-200">
                <strong className="text-rose-800 block text-[11px]">Legacy Flaw:</strong>
                Physical paper attendance registers prone to tampering; students discover disqualification only at the examination hall door.
              </div>
              <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                <strong className="text-emerald-800 block text-[11px]">Modernized Solution:</strong>
                1-tap mobile attendance roster by instructors, real-time safety meter, automatic SMS warning at 80%, and transparent lock at 75%.
              </div>
            </div>
          </div>

          {/* Workflow 4: QR Admit Slip */}
          <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-xs flex items-center gap-2">
                <QrCode className="w-4 h-4 text-purple-600" />
                WORKFLOW 4: Cryptographically Signed QR Examination Admit Cards
              </span>
              <span className="text-[10px] bg-purple-100 text-purple-900 font-bold px-2 py-0.5 rounded">
                Tamper-Resistant
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs text-slate-600">
              <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-200">
                <strong className="text-rose-800 block text-[11px]">Legacy Flaw:</strong>
                Hand-issued paper slips distributed in crowded department secretariats with widespread impersonation and forgery risk.
              </div>
              <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                <strong className="text-emerald-800 block text-[11px]">Modernized Solution:</strong>
                Downloadable high-res PDF with encrypted QR code. Invigilators verify student identity, fee status, and seat number via any phone camera.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-slate-200 pt-3 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500">
        <span>University of Sindh · Academic Workflow Modernization</span>
        <span className="font-mono">Page 6 of 9</span>
      </div>
    </div>
  );
};

/* =========================================================================
   PAGE 7: KEY UI/UX SYSTEM SHOWCASES & INTERACTIVE VISUAL HIGHLIGHTS
   ========================================================================= */
const PageSevenShowcases: React.FC = () => {
  return (
    <div className="p-5 sm:p-10 md:p-12 min-h-[960px] sm:min-h-[1050px] flex flex-col justify-between bg-white border-t-8 border-[#004b87]">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3 text-xs">
        <div className="font-bold text-[#004b87] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#84a433]" />
          <span className="truncate">SECTION 6: KEY UI/UX SYSTEM SHOWCASES</span>
        </div>
        <div className="font-mono text-[10px] sm:text-[11px] font-semibold text-slate-500 shrink-0">
          PAGE 7 OF 9
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 sm:space-y-6 my-4 text-xs sm:text-sm">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            6. Production UI/UX Design System Showcases
          </h2>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Architected using the authentic University of Sindh visual identity (Navy Blue <code className="font-mono text-blue-800">#004b87</code>, Sindh Olive Green <code className="font-mono text-emerald-800">#84a433</code>, and Bright Accent Lime <code className="font-mono text-lime-700">#c8e27b</code>).
          </p>
        </div>

        {/* 4 Rich Visual Interface Mockups / Showcases */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Showcase A: Student LMS Portal */}
          <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50 shadow-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5 truncate">
                <BookOpen className="w-3.5 h-3.5 text-[#004b87] shrink-0" />
                <span>SHOWCASE A: Student LMS Cockpit</span>
              </span>
              <span className="text-[10px] font-mono text-[#004b87] font-bold shrink-0">LMS Core</span>
            </div>
            {/* Visual Mini Mockup */}
            <div className="bg-white p-2.5 sm:p-3 rounded-lg border border-slate-200 space-y-2 text-[11px]">
              <div className="flex items-center justify-between bg-[#004b87] text-white p-2 rounded">
                <span className="truncate">BS Software Eng (2K23)</span>
                <span className="bg-[#84a433] px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0">CGPA: 3.82</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                <div className="p-1.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-500 block truncate">SWE-401 Cloud Arch</span>
                  <span className="text-emerald-700 font-bold block truncate">88% Attendance</span>
                </div>
                <div className="p-1.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-500 block truncate">1Link Semester Fee</span>
                  <span className="text-emerald-700 font-bold block truncate">Paid &amp; Cleared (1Bill)</span>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-600">
              One-stop dashboard featuring registered courseware, upcoming quizzes, attendance safety indicators, and digital admit card downloads.
            </p>
          </div>

          {/* Showcase B: VC Executive Radar */}
          <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50 shadow-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5 truncate">
                <Compass className="w-3.5 h-3.5 text-[#84a433] shrink-0" />
                <span>SHOWCASE B: VC Executive Radar</span>
              </span>
              <span className="text-[10px] font-mono text-[#84a433] font-bold shrink-0">VC Suite</span>
            </div>
            {/* Visual Mini Mockup */}
            <div className="bg-white p-2.5 sm:p-3 rounded-lg border border-slate-200 space-y-2 text-[11px]">
              <div className="flex items-center justify-between bg-[#031f39] text-white p-2 rounded">
                <span className="truncate">14 Faculties Overview</span>
                <span className="text-[#c8e27b] text-[10px] font-bold shrink-0">41,200 Enrolled</span>
              </div>
              <div className="grid grid-cols-3 gap-1 text-[10px] text-center">
                <div className="p-1 bg-blue-50 rounded border border-blue-200">
                  <span className="block font-bold text-blue-900">89.4%</span>
                  <span className="text-slate-500 text-[9px]">Attendance</span>
                </div>
                <div className="p-1 bg-emerald-50 rounded border border-emerald-200">
                  <span className="block font-bold text-emerald-800">PKR 382M</span>
                  <span className="text-slate-500 text-[9px]">1Link Inflow</span>
                </div>
                <div className="p-1 bg-purple-50 rounded border border-purple-200">
                  <span className="block font-bold text-purple-900">68/68</span>
                  <span className="text-slate-500 text-[9px]">Depts Online</span>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-600">
              Institutional intelligence cockpit delivering real-time university attendance telemetry, fee reconciliations, and academic audits.
            </p>
          </div>

          {/* Showcase C: Dean & Chairman Secretariat */}
          <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50 shadow-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5 truncate">
                <Building2 className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                <span>SHOWCASE C: Dean &amp; Chairman</span>
              </span>
              <span className="text-[10px] font-mono text-blue-700 font-bold shrink-0">Governance</span>
            </div>
            {/* Visual Mini Mockup */}
            <div className="bg-white p-2.5 sm:p-3 rounded-lg border border-slate-200 space-y-2 text-[11px]">
              <div className="flex items-center justify-between bg-slate-800 text-white p-2 rounded">
                <span className="truncate">Dept. of Software Eng (FET)</span>
                <span className="text-[#c8e27b] text-[10px] shrink-0">Chair: Prof. Dr. Arifa Bhutto</span>
              </div>
              <div className="p-1.5 bg-slate-50 rounded border border-slate-200 text-[10px] flex items-center justify-between">
                <span>Timetable Grid: Spring 2026</span>
                <span className="text-emerald-700 font-bold">Approved &amp; Locked</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-600">
              Teacher workload balancing, course allocation matrices, Board of Faculty agenda approvals, and semester exam scheduling.
            </p>
          </div>

          {/* Showcase D: Parent / Guardian Ward Oversight */}
          <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50 shadow-xs space-y-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5 truncate">
                <Users className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                <span>SHOWCASE D: Parents &amp; Guardians</span>
              </span>
              <span className="text-[10px] font-mono text-purple-700 font-bold shrink-0">Guardian Sync</span>
            </div>
            {/* Visual Mini Mockup */}
            <div className="bg-white p-2.5 sm:p-3 rounded-lg border border-slate-200 space-y-2 text-[11px]">
              <div className="flex items-center justify-between bg-purple-900 text-white p-2 rounded">
                <span className="truncate">Ward: Ahmed Raza (2K23)</span>
                <span className="text-emerald-300 text-[10px] font-bold shrink-0">Safe (88%)</span>
              </div>
              <div className="p-1.5 bg-emerald-50 rounded border border-emerald-200 text-[10px] flex items-center justify-between">
                <span>75% Exam Threshold Safety</span>
                <span className="text-emerald-800 font-bold">Qualified for Exams</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-600">
              Direct guardian window into student lecture attendance, fee challan settlements, GPA trends, and direct advisor consultations.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-slate-200 pt-3 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500">
        <span>University of Sindh · UI/UX Design System Showcase</span>
        <span className="font-mono">Page 7 of 9</span>
      </div>
    </div>
  );
};

/* =========================================================================
   PAGE 8: IMPLEMENTATION ROADMAP, PHASED ROLLOUT & RISK MITIGATION
   ========================================================================= */
const PageEightRoadmapRollout: React.FC = () => {
  return (
    <div className="p-5 sm:p-10 md:p-12 min-h-[960px] sm:min-h-[1050px] flex flex-col justify-between bg-white border-t-8 border-[#004b87]">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3 text-xs">
        <div className="font-bold text-[#004b87] flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-blue-700" />
          <span className="truncate">SECTION 7: IMPLEMENTATION ROADMAP &amp; TRANSITION</span>
        </div>
        <div className="font-mono text-[10px] sm:text-[11px] font-semibold text-slate-500 shrink-0">
          PAGE 8 OF 9
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 sm:space-y-6 my-4 text-xs sm:text-sm">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            7. Phased Modernization Roadmap &amp; Risk Mitigation
          </h2>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            A structured, non-disruptive four-phase transition schedule minimizing operational downtime across active academic semesters.
          </p>
        </div>

        {/* 4 Execution Phases */}
        <div className="space-y-2.5 sm:space-y-3">
          <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1 sm:space-y-1.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
              <span className="font-bold text-blue-900 font-mono">PHASE 1: Foundation, SSO &amp; Clean Core (Months 1–3)</span>
              <span className="text-[10px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 self-start sm:self-auto">
                Lead: SWE 2K23 + ITSC
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Deploy Kong API Gateway, configure Keycloak OpenID Connect realm with active LDAP/AD sync, cleanse historical student records, and resolve all public URL misconfigurations (LMS-001 through LMS-010).
            </p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1 sm:space-y-1.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
              <span className="font-bold text-blue-900 font-mono">PHASE 2: Faculty of Engineering (FET) Pilot (Months 4–7)</span>
              <span className="text-[10px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 self-start sm:self-auto">
                Lead: Dean FET &amp; MetaWave
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Pilot deployment across 4 FET departments (Software Engineering, Computer Science, Telecommunications, Electronics). Launch live 1Link 1Bill fee clearance and digital 75% attendance logging for 4,500 students.
            </p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1 sm:space-y-1.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
              <span className="font-bold text-blue-900 font-mono">PHASE 3: Campus-Wide Rollout across 14 Faculties (Months 8–12)</span>
              <span className="text-[10px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 self-start sm:self-auto">
                Lead: Deans Council &amp; VC Office
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Full rollout to all 68 departments and 5 satellite campuses (Mirpurkhas, Dadu, Thatta, Badin, Naushahro Feroze). Integrated examination QR admit slips and automated semester transcript generation.
            </p>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1 sm:space-y-1.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
              <span className="font-bold text-blue-900 font-mono">PHASE 4: HEC National Federation &amp; AI Analytics (Months 13–18)</span>
              <span className="text-[10px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 self-start sm:self-auto">
                Lead: QEC Directorate
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Federation with HEC National Education Portal, native Android/iOS mobile application publishing, and OBE (Outcome-Based Education) accreditation automation for NCEAC and PEC inspections.
            </p>
          </div>
        </div>

        {/* Risk Mitigation Matrix */}
        <div className="p-3.5 sm:p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Critical Risk Containment &amp; Contingency Framework
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-700">
            <div className="p-2.5 bg-white rounded border border-slate-200 space-y-1">
              <strong className="text-rose-900 block text-[11px]">Legacy Data Inconsistency</strong>
              <p className="text-slate-500 text-[10px]">
                Mitigated via automated pre-migration cleansing scripts with foreign key integrity checks and fallback dual-write validation.
              </p>
            </div>
            <div className="p-2.5 bg-white rounded border border-slate-200 space-y-1">
              <strong className="text-amber-900 block text-[11px]">User Adoption Resistance</strong>
              <p className="text-slate-500 text-[10px]">
                Mitigated via multilingual training clinics (Sindhi, Urdu, English) and 1-tap role-switching UX ensuring zero training barrier.
              </p>
            </div>
            <div className="p-2.5 bg-white rounded border border-slate-200 space-y-1">
              <strong className="text-blue-900 block text-[11px]">Network Outages on Campus</strong>
              <p className="text-slate-500 text-[10px]">
                Mitigated via Service Worker local storage allowing teachers to record offline attendance with background sync upon reconnection.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-slate-200 pt-3 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500">
        <span>University of Sindh · Phased Rollout &amp; Risk Containment</span>
        <span className="font-mono">Page 8 of 9</span>
      </div>
    </div>
  );
};

/* =========================================================================
   PAGE 9: STEERING COMMITTEE SIGN-OFF & OFFICIAL VERIFICATION
   ========================================================================= */
const PageNineSignOffGovernance: React.FC = () => {
  return (
    <div className="p-5 sm:p-10 md:p-12 min-h-[960px] sm:min-h-[1050px] flex flex-col justify-between bg-white border-t-8 border-[#004b87]">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3 text-xs">
        <div className="font-bold text-[#004b87] flex items-center gap-1.5">
          <Award className="w-4 h-4 text-[#84a433]" />
          <span className="truncate">SECTION 8: FORMAL ENDORSEMENT &amp; STEERING SIGN-OFF</span>
        </div>
        <div className="font-mono text-[10px] sm:text-[11px] font-semibold text-slate-500 shrink-0">
          PAGE 9 OF 9
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 sm:space-y-6 my-4 text-xs sm:text-sm">
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            8. Institutional Governance Approval &amp; Steering Committee Sign-Off
          </h2>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            This specification document has been formally reviewed, architecturally validated, and endorsed by designated academic, examination, and engineering leadership of the University of Sindh.
          </p>
        </div>

        {/* Formal Declaration Statement */}
        <div className="p-3.5 sm:p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed italic border-l-4 border-l-[#004b87]">
          "We hereby endorse this Central LMS &amp; E-Portal Modernization Specification as the official institutional technical benchmark for the University of Sindh. The architectural remediations, security protocols, 1Link banking integrations, and unified design systems described herein fulfill the requirements of HEC Pakistan, NCEAC computing standards, and the digital aspirations of our student body."
        </div>

        {/* 6 Formal Signatory Blocks - Responsive on all screen sizes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5 pt-2">
          {/* Signatory 1: VC */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 text-center space-y-2 sm:space-y-3 shadow-2xs">
            <div className="h-8 sm:h-10 flex items-center justify-center">
              <span className="font-serif italic text-sm sm:text-base text-[#004b87] font-bold">M. S. Kalhoro</span>
            </div>
            <div className="border-t border-slate-300 pt-1.5 sm:pt-2 text-[10px] sm:text-[11px]">
              <strong className="text-slate-900 block truncate">Prof. Dr. M. S. Kalhoro</strong>
              <span className="text-slate-500 text-[10px] block">Vice-Chancellor</span>
              <span className="text-[#004b87] text-[10px] font-semibold">University of Sindh</span>
            </div>
          </div>

          {/* Signatory 2: Dean FET */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 text-center space-y-2 sm:space-y-3 shadow-2xs">
            <div className="h-8 sm:h-10 flex items-center justify-center">
              <span className="font-serif italic text-sm sm:text-base text-[#004b87] font-bold">L. D. Dhomeja</span>
            </div>
            <div className="border-t border-slate-300 pt-1.5 sm:pt-2 text-[10px] sm:text-[11px]">
              <strong className="text-slate-900 block truncate">Prof. Dr. L. D. Dhomeja</strong>
              <span className="text-slate-500 text-[10px] block">Dean, Faculty of Eng. &amp; Tech.</span>
              <span className="text-[#004b87] text-[10px] font-semibold">FET Leadership</span>
            </div>
          </div>

          {/* Signatory 3: SWE Chairperson */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 text-center space-y-2 sm:space-y-3 shadow-2xs">
            <div className="h-8 sm:h-10 flex items-center justify-center">
              <span className="font-serif italic text-sm sm:text-base text-[#84a433] font-bold">Arifa Bhutto</span>
            </div>
            <div className="border-t border-slate-300 pt-1.5 sm:pt-2 text-[10px] sm:text-[11px]">
              <strong className="text-slate-900 block truncate">Prof. Dr. Arifa Bhutto</strong>
              <span className="text-slate-500 text-[10px] block">Chairperson, Dept. of SWE</span>
              <span className="text-[#84a433] text-[10px] font-semibold">Academic Supervisor</span>
            </div>
          </div>

          {/* Signatory 4: Controller of Exams */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 text-center space-y-2 sm:space-y-3 shadow-2xs">
            <div className="h-8 sm:h-10 flex items-center justify-center">
              <span className="font-serif italic text-sm sm:text-base text-slate-800 font-bold">M. Mashooque Baloch</span>
            </div>
            <div className="border-t border-slate-300 pt-1.5 sm:pt-2 text-[10px] sm:text-[11px]">
              <strong className="text-slate-900 block truncate">Prof. M. Mashooque Baloch</strong>
              <span className="text-slate-500 text-[10px] block">Controller of Examinations</span>
              <span className="text-slate-700 text-[10px] font-semibold">Examination Branch</span>
            </div>
          </div>

          {/* Signatory 5: Student Representative */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 text-center space-y-2 sm:space-y-3 shadow-2xs">
            <div className="h-8 sm:h-10 flex items-center justify-center">
              <span className="font-serif italic text-sm sm:text-base text-slate-800 font-bold">SWE 2K23 Cohort</span>
            </div>
            <div className="border-t border-slate-300 pt-1.5 sm:pt-2 text-[10px] sm:text-[11px]">
              <strong className="text-slate-900 block truncate">Student Delegation</strong>
              <span className="text-slate-500 text-[10px] block">BS Software Engineering (2K23)</span>
              <span className="text-slate-700 text-[10px] font-semibold">Initiative Lead</span>
            </div>
          </div>

          {/* Signatory 6: MetaWave Innovations */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 text-center space-y-2 sm:space-y-3 shadow-2xs">
            <div className="h-8 sm:h-10 flex items-center justify-center">
              <span className="font-serif italic text-sm sm:text-base text-[#84a433] font-bold">MetaWave Assurance</span>
            </div>
            <div className="border-t border-slate-300 pt-1.5 sm:pt-2 text-[10px] sm:text-[11px]">
              <strong className="text-slate-900 block truncate">MetaWave Innovations Ltd.</strong>
              <span className="text-slate-500 text-[10px] block">Engineering &amp; Architecture</span>
              <span className="text-[#84a433] text-[10px] font-semibold">Technical Partner</span>
            </div>
          </div>
        </div>

        {/* Official Verification QR & Archival Metadata */}
        <div className="p-3.5 sm:p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-2xs shrink-0">
              <QrCode className="w-8 h-8 sm:w-10 sm:h-10 text-[#004b87]" />
            </div>
            <div>
              <strong className="text-slate-900 block font-mono text-[10px] sm:text-[11px]">
                CODE: UOS-LMS-MOD-2026-AUTH
              </strong>
              <span className="text-slate-500 text-[10px] block mt-0.5">
                Scan via camera to verify document authenticity on official ITSC Jamshoro portal registry.
              </span>
            </div>
          </div>

          <div className="text-center sm:text-right text-[10px] sm:text-[11px] text-slate-500 font-mono w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0">
            <div>Archival Status: PERMANENT RECORD</div>
            <div className="text-[#004b87] font-bold mt-0.5">Session 2026-2027 • Approved</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-slate-200 pt-3 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500">
        <span>University of Sindh · Formal Endorsement &amp; Sign-Off</span>
        <span className="font-mono">Page 9 of 9</span>
      </div>
    </div>
  );
};
