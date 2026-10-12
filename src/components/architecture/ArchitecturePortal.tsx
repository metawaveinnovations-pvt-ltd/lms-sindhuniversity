import React, { useState } from 'react';
import { 
  AUDIT_FINDINGS, 
  QA_MASTER_MATRIX, 
  SYSTEM_MODERNIZATION_PHASES 
} from '../../data/auditData';
import { AuditClassification, DefectSeverity, AuditFinding } from '../../types';
import { useSwipeNavigation, useAutoScrollActivePill } from '../../hooks/useSwipeNavigation';
import { 
  FileText, 
  ShieldCheck, 
  Database, 
  Server, 
  Cpu, 
  Layers, 
  Printer, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Filter, 
  Search, 
  ArrowRight, 
  ExternalLink,
  Lock,
  GitBranch,
  Activity,
  Terminal,
  Download,
  ChevronLeft,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { ModernizationDocumentView } from '../modernization/ModernizationDocumentView';

interface ArchitecturePortalProps {
  onSelectFinding?: (finding: AuditFinding) => void;
}

export const ArchitecturePortal: React.FC<ArchitecturePortalProps> = () => {
  const [activeTab, setActiveTab] = useState<'summary' | 'defects' | 'architecture' | 'database' | 'api' | 'security' | 'qa' | 'dr' | 'roadmap' | 'doc9page' | 'report'>('summary');
  
  const archTabIds = ['summary', 'defects', 'architecture', 'database', 'api', 'security', 'qa', 'dr', 'roadmap', 'doc9page', 'report'] as const;
  const archSwipeHandlers = useSwipeNavigation<typeof archTabIds[number]>({
    items: [...archTabIds],
    activeItem: activeTab,
    onSelect: setActiveTab,
    minSwipeDistance: 42,
    ignoreScrollableChildren: true
  });
  const archScrollRef = useAutoScrollActivePill(activeTab);

  // Filters for defects register
  const [filterClassification, setFilterClassification] = useState<AuditClassification | 'ALL'>('ALL');
  const [filterSeverity, setFilterSeverity] = useState<DefectSeverity | 'ALL'>('ALL');
  const [defectSearch, setDefectSearch] = useState('');
  const [selectedFinding, setSelectedFinding] = useState<AuditFinding | null>(AUDIT_FINDINGS[0]);

  const filteredFindings = AUDIT_FINDINGS.filter(f => {
    const matchClass = filterClassification === 'ALL' || f.classification === filterClassification;
    const matchSev = filterSeverity === 'ALL' || f.severity === filterSeverity;
    const matchQuery = f.id.toLowerCase().includes(defectSearch.toLowerCase()) || 
                       f.title.toLowerCase().includes(defectSearch.toLowerCase()) ||
                       f.category.toLowerCase().includes(defectSearch.toLowerCase());
    return matchClass && matchSev && matchQuery;
  });

  const getClassificationBadge = (c: AuditClassification) => {
    switch (c) {
      case 'CONFIRMED':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-200">CONFIRMED (Public)</span>;
      case 'PROBABLE':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">PROBABLE</span>;
      case 'UNKNOWN':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-900 border border-purple-200">UNKNOWN (Auth Access Req)</span>;
      case 'RECOMMENDATION':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-200">RECOMMENDATION</span>;
    }
  };

  const getSeverityBadge = (s: DefectSeverity) => {
    switch (s) {
      case 'P0':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-rose-600 text-white">P0 CRITICAL</span>;
      case 'P1':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-orange-600 text-white">P1 HIGH</span>;
      case 'P2':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500 text-slate-950">P2 MEDIUM</span>;
      case 'P3':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-200 text-slate-800">P3 LOW</span>;
      case 'P4':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">P4 ENHANCEMENT</span>;
    }
  };

  return (
    <div
      onTouchStart={archSwipeHandlers.onTouchStart}
      onTouchEnd={archSwipeHandlers.onTouchEnd}
      className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 sm:space-y-6"
    >
      {/* Executive Initiative Banner */}
      <div className="bg-gradient-to-r from-[#0f2c59] via-[#163668] to-[#0f2c59] rounded-2xl p-6 sm:p-8 text-white shadow-md border border-blue-900">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5" />
              <span>Confidential Modernization Assessment & Target Architecture</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              University of Sindh LMS Modernization Proposal
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed">
              Initiated by a qualified student of <strong>BS Software Engineering (2K23 Batch)</strong>, 
              Department of Software Engineering, University of Sindh, Jamshoro. 
              Presented under the leadership of Chairperson <strong>Prof. Dr. Arifa Bhutto</strong> and Vice Chancellor <strong>Prof. Dr. Fateh Muhammad Mari</strong>, 
              in conceptual technical collaboration with <strong>MetaWave Innovations Ltd.</strong> (Smart Systems — Engineering — Growth).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 shrink-0">
            <button
              onClick={() => setActiveTab('doc9page')}
              className="px-4 py-2.5 bg-[#84a433] hover:bg-[#739129] active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer border border-[#c8e27b]/30"
            >
              <FileText className="w-4 h-4 text-[#c8e27b]" />
              <span>Official 9-Page Modernization Document</span>
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-2 border border-white/20 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>Assessment Summary</span>
            </button>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-slate-300 flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-300 shrink-0" />
          <span>
            <strong>Ethical & Professional Assessment Boundary:</strong> This assessment adheres to ethical standards. No unauthorized penetration testing or vulnerability exploitation was conducted. Where internal server, database, or API access is proprietary, items are strictly marked "Requires authorized technical access for verification".
          </span>
        </div>
      </div>

      {/* Navigation Tabs (Supports Swipe-Left / Swipe-Right on Mobile) */}
      <div
        onTouchStart={archSwipeHandlers.onTouchStart}
        onTouchEnd={archSwipeHandlers.onTouchEnd}
        className="flex items-center justify-between gap-2 pb-1 border-b border-slate-200 text-xs font-semibold no-print select-none"
      >
        <div
          ref={archScrollRef}
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-1"
        >
          {[
            { id: 'doc9page', label: '9-Page Modernization Document', icon: <BookOpen className="w-4 h-4 shrink-0 text-[#84a433]" /> },
            { id: 'summary', label: 'Executive Summary', icon: <FileText className="w-4 h-4 shrink-0" /> },
            { id: 'defects', label: 'Defect Register (LMS-001–020)', icon: <AlertTriangle className="w-4 h-4 shrink-0" /> },
            { id: 'architecture', label: 'Target System Architecture', icon: <Layers className="w-4 h-4 shrink-0" /> },
            { id: 'database', label: 'Relational Database Model', icon: <Database className="w-4 h-4 shrink-0" /> },
            { id: 'api', label: 'RESTful API Blueprint', icon: <Server className="w-4 h-4 shrink-0" /> },
            { id: 'security', label: 'Security & Data Protection', icon: <Lock className="w-4 h-4 shrink-0" /> },
            { id: 'qa', label: 'Master QA Matrix', icon: <ShieldCheck className="w-4 h-4 shrink-0" /> },
            { id: 'dr', label: 'Performance & Disaster Recovery', icon: <Activity className="w-4 h-4 shrink-0" /> },
            { id: 'roadmap', label: 'Modernization Roadmap', icon: <GitBranch className="w-4 h-4 shrink-0" /> },
            { id: 'report', label: 'Printable Formal Report', icon: <Printer className="w-4 h-4 shrink-0" /> }
          ].map(tab => (
            <button
              key={tab.id}
              data-nav-id={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`min-h-[38px] px-3.5 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#004b87] text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex lg:hidden items-center gap-1 pl-1 border-l border-slate-200 shrink-0">
          <button
            onClick={() => {
              const idx = archTabIds.indexOf(activeTab);
              setActiveTab(archTabIds[(idx - 1 + archTabIds.length) % archTabIds.length]);
            }}
            className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center cursor-pointer"
            aria-label="Previous Blueprint Tab"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              const idx = archTabIds.indexOf(activeTab);
              setActiveTab(archTabIds[(idx + 1) % archTabIds.length]);
            }}
            className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center cursor-pointer"
            aria-label="Next Blueprint Tab"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* TAB 0: OFFICIAL 9-PAGE MODERNIZATION DOCUMENT */}
      {activeTab === 'doc9page' && (
        <div className="rounded-2xl overflow-hidden border border-slate-300 shadow-md">
          <ModernizationDocumentView isModal={false} />
        </div>
      )}

      {/* TAB 1: EXECUTIVE SUMMARY */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">The Current Ecosystem</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The publicly observable University of Sindh digital landscape spans multiple independent web properties (lms.usindh.edu.pk, main portal, attendance portals, exam counters). This fragmented landscape requires students to navigate disparate systems with uncoordinated credentials, manual bank visits, and outdated static landing pages.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">The Proposed Transformation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A unified, microservices-based <strong>Digital Academic Platform</strong>. A single sign-on (SSO) gateway provides role-tailored dashboards for Students, Faculty, Department Chairpersons, and ITSC Administrators with instant 1Link online fee reconciliation, sub-second GPA calculations, and digital QR-verified exam slips.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">MetaWave Innovations Philosophy</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Smart Systems — Engineering — Growth</strong>. 
                Emphasizing solid software engineering practices, zero childish decorative fluff, strict WCAG 2.2 AA accessibility, data integrity, and high-concurrency resilience during annual examination result releases.
              </p>
            </div>
          </div>

          {/* Institutional Stakeholder Alignment */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Institutional Stakeholders & Academic Alignment</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Initiator</div>
                <div className="font-bold text-slate-900 text-sm mt-0.5">BS Software Engineering</div>
                <div className="text-blue-900 font-semibold mt-1">2K23 Batch (Semester 7)</div>
                <p className="text-slate-500 text-[11px] mt-1">Practical application of SWE-401 & SWE-403 principles.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Department Leadership</div>
                <div className="font-bold text-slate-900 text-sm mt-0.5">Prof. Dr. Arifa Bhutto</div>
                <div className="text-amber-800 font-semibold mt-1">Chairperson, Software Engineering</div>
                <p className="text-slate-500 text-[11px] mt-1">Oversees academic quality, NCEAC OBE criteria & curriculum.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-slate-400 text-[10px] uppercase font-bold">University Patron</div>
                <div className="font-bold text-slate-900 text-sm mt-0.5">Prof. Dr. Muhammad Siddique Kalhoro</div>
                <div className="text-[#007a33] font-semibold mt-1">Vice-Chancellor, University of Sindh</div>
                <p className="text-slate-500 text-[11px] mt-1">Institutional vision for digital modernization across campuses.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Engineering Partner</div>
                <div className="font-bold text-slate-900 text-sm mt-0.5">MetaWave Innovations Ltd.</div>
                <div className="text-[#004b87] font-semibold mt-1">Smart Systems — Engineering — Growth</div>
                <p className="text-slate-500 text-[11px] mt-1">Architecture, quality assurance & full-stack development.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DEFECT REGISTER (LMS-001 through LMS-020) */}
      {activeTab === 'defects' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 text-xs">
                <span className="text-slate-500 font-semibold">Classification:</span>
                {(['ALL', 'CONFIRMED', 'PROBABLE', 'UNKNOWN'] as const).map(c => (
                  <button
                    key={c}
                    onClick={() => setFilterClassification(c)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                      filterClassification === c
                        ? 'bg-[#0f2c59] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1 text-xs ml-0 md:ml-4">
                <span className="text-slate-500 font-semibold">Severity:</span>
                {(['ALL', 'P0', 'P1', 'P2', 'P3'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setFilterSeverity(s)}
                    className={`px-2 py-1 rounded-md text-xs font-semibold transition-colors ${
                      filterSeverity === s
                        ? 'bg-rose-700 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search defects (e.g. LMS-001, spelling, API)..."
                value={defectSearch}
                onChange={(e) => setDefectSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs outline-hidden focus:border-blue-500 w-full sm:w-64"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Two-Pane Defect Explorer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Defect List */}
            <div className="lg:col-span-5 space-y-2 max-h-[650px] overflow-y-auto pr-1">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Identified Findings ({filteredFindings.length} Items)
              </div>
              {filteredFindings.map(finding => {
                const isSelected = selectedFinding?.id === finding.id;
                return (
                  <div
                    key={finding.id}
                    onClick={() => setSelectedFinding(finding)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/80 border-blue-400 shadow-xs ring-1 ring-blue-300'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black text-blue-900">{finding.id}</span>
                        {getSeverityBadge(finding.severity)}
                      </div>
                      {getClassificationBadge(finding.classification)}
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2 mt-1">
                      {finding.title}
                    </h4>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Category: <span className="font-medium text-slate-700">{finding.category}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Deep Defect Analysis Card */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
              {selectedFinding ? (
                <>
                  <div className="border-b border-slate-100 pb-4 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-black text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded">
                          {selectedFinding.id}
                        </span>
                        {getSeverityBadge(selectedFinding.severity)}
                        {getClassificationBadge(selectedFinding.classification)}
                      </div>
                      <span className="text-xs text-slate-400 font-mono">
                        Verification: {selectedFinding.verificationStatus}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      {selectedFinding.title}
                    </h3>
                    <div className="text-xs text-slate-500">
                      Domain: <strong className="text-slate-700">{selectedFinding.category}</strong> • Affected: <span className="text-slate-700">{selectedFinding.affectedUsers}</span>
                    </div>
                  </div>

                  {/* Evidence & Current Behavior */}
                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="font-bold uppercase tracking-wider text-slate-400 block text-[10px]">
                        Observed Evidence
                      </span>
                      <p className="mt-1 p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 font-mono">
                        {selectedFinding.evidence}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="font-bold uppercase tracking-wider text-rose-600 block text-[10px]">
                          Current Observed Behavior
                        </span>
                        <p className="mt-1 p-2.5 bg-rose-50/50 rounded-lg border border-rose-200 text-slate-700">
                          {selectedFinding.currentBehavior}
                        </p>
                      </div>
                      <div>
                        <span className="font-bold uppercase tracking-wider text-emerald-700 block text-[10px]">
                          Expected Modernized Behavior
                        </span>
                        <p className="mt-1 p-2.5 bg-emerald-50/50 rounded-lg border border-emerald-200 text-slate-700">
                          {selectedFinding.expectedBehavior}
                        </p>
                      </div>
                    </div>

                    <div>
                      <span className="font-bold uppercase tracking-wider text-slate-400 block text-[10px]">
                        Architectural Root Cause
                      </span>
                      <p className="mt-1 text-slate-700 leading-relaxed">
                        {selectedFinding.rootCause}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold uppercase tracking-wider text-amber-700 block text-[10px]">
                        Engineering Recommendation
                      </span>
                      <p className="mt-1 p-3 bg-amber-50/60 rounded-xl border border-amber-200 text-slate-800 font-medium">
                        {selectedFinding.recommendation}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold uppercase tracking-wider text-blue-800 block text-[10px]">
                        Automated Regression Test Procedure
                      </span>
                      <div className="mt-1 p-2.5 bg-slate-900 text-emerald-400 rounded-lg font-mono text-[11px]">
                        {selectedFinding.regressionTest}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-20 text-slate-400">
                  Select a defect from the register to inspect details.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TARGET SYSTEM ARCHITECTURE */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Target Enterprise Microservices Architecture</h3>
              <p className="text-xs text-slate-500">
                Transitioning from a legacy monolithic multi-domain setup to a unified, event-driven academic cloud topology.
              </p>
            </div>

            {/* Architecture Diagram Visualization */}
            <div className="p-6 bg-slate-900 rounded-2xl text-white font-mono text-xs space-y-6 border border-slate-800">
              {/* Layer 1: Edge & Ingress */}
              <div className="border border-slate-700 rounded-xl p-4 bg-slate-800/60 space-y-2">
                <div className="text-amber-400 font-bold text-xs uppercase tracking-wider flex items-center justify-between">
                  <span>1. Edge Ingress & Security Tier</span>
                  <span className="text-[10px] text-slate-400">Cloudflare WAF / Nginx Reverse Proxy</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-300">
                  <div className="p-2 bg-slate-900 rounded border border-slate-700 text-center">
                    SSL/TLS 1.3 Termination & HSTS
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-700 text-center">
                    DDoS Mitigation & IP Rate Limiter
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-700 text-center">
                    Unified Routing / Canonical 301 Normalizer
                  </div>
                </div>
              </div>

              {/* Layer 2: API Gateway & IAM */}
              <div className="border border-blue-900/60 rounded-xl p-4 bg-blue-950/30 space-y-2">
                <div className="text-blue-400 font-bold text-xs uppercase tracking-wider flex items-center justify-between">
                  <span>2. Enterprise API Gateway & OpenID Connect IAM</span>
                  <span className="text-[10px] text-slate-400">Kong Gateway + Keycloak OIDC</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-[11px] text-slate-300">
                  <div className="p-2 bg-slate-900 rounded border border-slate-700 text-center">
                    JWT RS256 Token Validator
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-700 text-center">
                    RBAC Scope Guard
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-700 text-center">
                    Masked CNIC Decryption Token
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-700 text-center">
                    Global Request Correlation ID
                  </div>
                </div>
              </div>

              {/* Layer 3: Microservices Domain Clusters */}
              <div className="border border-emerald-900/60 rounded-xl p-4 bg-emerald-950/20 space-y-2">
                <div className="text-emerald-400 font-bold text-xs uppercase tracking-wider flex items-center justify-between">
                  <span>3. Domain Microservices (Containerized Kubernetes Pods)</span>
                  <span className="text-[10px] text-slate-400">Node.js TypeScript / Golang</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-300">
                  <div className="p-2.5 bg-slate-900 rounded border border-slate-700">
                    <div className="font-bold text-white">LMS Course Engine</div>
                    <div className="text-[10px] text-slate-400">Syllabi, materials, assignments</div>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded border border-slate-700">
                    <div className="font-bold text-white">Attendance Service</div>
                    <div className="text-[10px] text-slate-400">75% threshold, excuse appeals</div>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded border border-slate-700">
                    <div className="font-bold text-white">Examination & CGPA</div>
                    <div className="text-[10px] text-slate-400">Admit slip, repeat rules, 4.0 scale</div>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded border border-slate-700">
                    <div className="font-bold text-white">1Link Banking Bridge</div>
                    <div className="text-[10px] text-slate-400">HBL, Sindh Bank webhooks</div>
                  </div>
                </div>
              </div>

              {/* Layer 4: Data Layer */}
              <div className="border border-[#004b87]/60 rounded-xl p-4 bg-[#003866]/30 space-y-2">
                <div className="text-[#c8e27b] font-bold text-xs uppercase tracking-wider flex items-center justify-between font-mono">
                  <span>4. Persistent Storage, Cache & Audit Stream</span>
                  <span className="text-[10px] text-slate-300">PostgreSQL + Redis + Kafka</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-300">
                  <div className="p-2 bg-slate-900 rounded border border-slate-700 text-center">
                    Primary PostgreSQL (ACID) + 2 Read Replicas
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-700 text-center">
                    Redis Cluster (Results & Session Cache)
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-700 text-center">
                    Append-Only Immutable Audit Log Store
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: RELATIONAL DATABASE MODEL */}
      {activeTab === 'database' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Normalized Relational Database Schema (3NF)</h3>
            <p className="text-xs text-slate-500">
              PostgreSQL schema ensuring referential integrity, cascading protections, and explicit audit indexing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                table: 'users',
                purpose: 'Central identity record for authentication & credentials',
                fields: [
                  'id UUID PRIMARY KEY',
                  'email VARCHAR(255) UNIQUE NOT NULL',
                  'password_hash VARCHAR(255) NOT NULL',
                  'role VARCHAR(50) NOT NULL',
                  'cnic_encrypted BYTEA NOT NULL',
                  'mfa_secret VARCHAR(255)',
                  'created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()'
                ]
              },
              {
                table: 'students',
                purpose: 'Academic student profile and institutional standing',
                fields: [
                  'id UUID PRIMARY KEY REFERENCES users(id)',
                  'roll_number VARCHAR(50) UNIQUE NOT NULL',
                  'batch_year VARCHAR(10) NOT NULL',
                  'department_id UUID REFERENCES departments(id)',
                  'program_id UUID REFERENCES programs(id)',
                  'current_semester INT NOT NULL',
                  'cgpa NUMERIC(3,2) DEFAULT 0.00',
                  'advisor_id UUID REFERENCES faculty(id)'
                ]
              },
              {
                table: 'courses',
                purpose: 'Curriculum catalog and course metadata',
                fields: [
                  'code VARCHAR(20) PRIMARY KEY',
                  'title VARCHAR(255) NOT NULL',
                  'credit_hours INT NOT NULL',
                  'department_id UUID REFERENCES departments(id)',
                  'syllabus_text TEXT',
                  'is_active BOOLEAN DEFAULT TRUE'
                ]
              },
              {
                table: 'attendance_records',
                purpose: 'Per-lecture student attendance tracking with audit metadata',
                fields: [
                  'id UUID PRIMARY KEY',
                  'course_code VARCHAR(20) REFERENCES courses(code)',
                  'student_id UUID REFERENCES students(id)',
                  'lecture_date DATE NOT NULL',
                  'status VARCHAR(20) NOT NULL CHECK (status IN (\'Present\', \'Absent\', \'Late\', \'Excused\'))',
                  'marked_by UUID REFERENCES faculty(id)',
                  'created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()'
                ]
              },
              {
                table: 'examination_grades',
                purpose: 'Official semester grades and marks tabulation',
                fields: [
                  'id UUID PRIMARY KEY',
                  'student_id UUID REFERENCES students(id)',
                  'course_code VARCHAR(20) REFERENCES courses(code)',
                  'semester_number INT NOT NULL',
                  'obtained_marks NUMERIC(5,2) NOT NULL',
                  'letter_grade VARCHAR(5) NOT NULL',
                  'grade_point NUMERIC(3,2) NOT NULL',
                  'is_approved_by_hod BOOLEAN DEFAULT FALSE',
                  'is_published BOOLEAN DEFAULT FALSE'
                ]
              },
              {
                table: 'audit_ledger',
                purpose: 'Immutable security & academic action record (Requirement #23)',
                fields: [
                  'id UUID PRIMARY KEY',
                  'who VARCHAR(255) NOT NULL',
                  'role VARCHAR(50) NOT NULL',
                  'action VARCHAR(100) NOT NULL',
                  'ip_address INET NOT NULL',
                  'object_target VARCHAR(255) NOT NULL',
                  'before_state JSONB',
                  'after_state JSONB',
                  'reason TEXT NOT NULL',
                  'reference_id VARCHAR(100) NOT NULL',
                  'recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()'
                ]
              }
            ].map((tbl, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded">
                    table: {tbl.table}
                  </span>
                  <span className="text-[11px] text-slate-400">PostgreSQL</span>
                </div>
                <p className="text-xs text-slate-600">{tbl.purpose}</p>

                <div className="bg-slate-900 text-slate-200 p-3 rounded-lg font-mono text-[11px] space-y-0.5 overflow-x-auto">
                  {tbl.fields.map((f, fIdx) => (
                    <div key={fIdx} className="text-emerald-400">
                      • {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: RESTFUL API BLUEPRINT */}
      {activeTab === 'api' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 text-base">RESTful API Blueprint (/api/*)</h3>
            <p className="text-xs text-slate-500">
              OpenAPI 3.1 specification for microservices with strict RBAC scopes and input validation schemas.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { method: 'POST', path: '/api/v1/auth/login', auth: 'Public', scope: 'Rate-limited (5 req/min)', desc: 'Authenticate with CNIC/RollNo and password, returns RS256 JWT access token' },
              { method: 'GET', path: '/api/v1/students/me', auth: 'Bearer JWT', scope: 'student', desc: 'Retrieve current student profile, enrolled semester courses, GPA and masked CNIC' },
              { method: 'GET', path: '/api/v1/attendance/summary', auth: 'Bearer JWT', scope: 'student, faculty, hod', desc: 'Calculate course-wise attendance percentages and 75% threshold flags' },
              { method: 'POST', path: '/api/v1/attendance/roster', auth: 'Bearer JWT', scope: 'faculty', desc: 'Submit and lock lecture attendance roster with automatic audit trail entry' },
              { method: 'GET', path: '/api/v1/exams/slip', auth: 'Bearer JWT', scope: 'student', desc: 'Generate digital exam admit slip with cryptographic QR verification token' },
              { method: 'POST', path: '/api/v1/fees/webhook/1link', auth: 'HMAC Signature', scope: 'bank_gateway', desc: 'Instant 1Link / HBL settlement webhook; auto-clears fee challans in sub-60 seconds' },
              { method: 'POST', path: '/api/v1/admin/results/publish', auth: 'Bearer JWT', scope: 'admin, exam_controller', desc: 'Four-stage approval gate release of semester results to student portal' }
            ].map((api, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] ${
                      api.method === 'GET' ? 'bg-blue-100 text-blue-900' : 'bg-emerald-100 text-emerald-900'
                    }`}>
                      {api.method}
                    </span>
                    <span className="font-mono font-bold text-slate-900">{api.path}</span>
                    <span className="text-[10px] px-2 py-0.2 bg-slate-200 rounded font-semibold text-slate-700">
                      Scope: {api.scope}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs">{api.desc}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono text-[11px] text-slate-500 font-semibold">{api.auth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: SECURITY & DATA PROTECTION */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Security Architecture & Privacy Protection</h3>
            <p className="text-xs text-slate-500">
              Adheres to Pakistan Electronic Crimes Act (PECA 2016) and OWASP Top 10 Enterprise Controls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>Masked CNIC Protection</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                CNIC numbers are stored with AES-256 field-level encryption. The frontend interface never displays full CNICs in cleartext (e.g. <code>41302-******4-2</code>) to prevent identity theft.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Least-Privilege RBAC</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Roles are isolated via OpenID Connect claims. Students cannot query records belonging to peers (prevention of BOLA/IDOR), and faculty permissions are constrained to allocated course sections.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#004b87]" />
                <span>Immutable Audit Trails</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                All modifications to marks, attendance, and fee waivers require an authorized reference ID, capturing WHO, WHAT, WHEN, WHERE, BEFORE, AFTER, and REASON in an append-only ledger.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: MASTER QA MATRIX */}
      {activeTab === 'qa' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Master Quality Assurance Matrix</h3>
            <p className="text-xs text-slate-500">
              Formulated by the Assurance & Engineering Intelligence Team across 7 key test domains.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Test Category</th>
                  <th className="py-2.5 px-3">Total Cases</th>
                  <th className="py-2.5 px-3">Automated</th>
                  <th className="py-2.5 px-3">Pass Rate</th>
                  <th className="py-2.5 px-3">Critical Verification Path</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {QA_MASTER_MATRIX.map((qa, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60">
                    <td className="py-3 px-3 font-bold text-slate-900">{qa.category}</td>
                    <td className="py-3 px-3 font-mono">{qa.totalTests}</td>
                    <td className="py-3 px-3 font-mono text-blue-700">{qa.automated}</td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-700">{qa.passRate}%</td>
                    <td className="py-3 px-3 text-slate-600">{qa.criticalPath}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {qa.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 8: PERFORMANCE & DISASTER RECOVERY */}
      {activeTab === 'dr' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Performance Engineering & Disaster Recovery Model</h3>
            <p className="text-xs text-slate-500">
              Engineered to sustain peak annual traffic surges during semester result publications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Target Recovery Point (RPO)</span>
              <strong className="text-lg font-black text-blue-900 mt-1 block">&lt; 15 Minutes</strong>
              <p className="text-slate-500 text-[11px] mt-1">Continuous WAL archiving to offsite cloud bucket.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Target Recovery Time (RTO)</span>
              <strong className="text-lg font-black text-emerald-700 mt-1 block">&lt; 45 Minutes</strong>
              <p className="text-slate-500 text-[11px] mt-1">Automated cluster orchestration & image restoration.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Peak Concurrent Load</span>
              <strong className="text-lg font-black text-[#004b87] mt-1 block">15,000+ Users</strong>
              <p className="text-slate-500 text-[11px] mt-1">Simulated during annual examination result releases.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">API Latency SLA (p95)</span>
              <strong className="text-lg font-black text-slate-800 mt-1 block">&lt; 450 ms</strong>
              <p className="text-slate-500 text-[11px] mt-1">Redis caching on result queries prevents DB spikes.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 9: MODERNIZATION ROADMAP */}
      {activeTab === 'roadmap' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Phased Modernization Implementation Roadmap</h3>
            <p className="text-xs text-slate-500">
              Structured four-phase execution timeline from initial foundation to HEC national accreditation.
            </p>
          </div>

          <div className="space-y-4">
            {SYSTEM_MODERNIZATION_PHASES.map((phase, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 font-mono">
                      {phase.phase}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-0.5">{phase.title}</h4>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-white rounded-lg border border-slate-200 text-slate-700">
                    Lead: {phase.lead}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {phase.deliverables.map((deliv, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 10: FORMAL ASSESSMENT REPORT (PRINTABLE) */}
      {activeTab === 'report' && (
        <div className="bg-white rounded-2xl border-2 border-slate-800 p-8 space-y-8 print:p-0 print:border-none">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-slate-900 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-serif font-black text-2xl text-[#0f2c59]">UNIVERSITY OF SINDH</span>
                <span className="text-xs px-2 py-0.5 bg-slate-100 rounded border border-slate-300 font-semibold">JAMSHORO</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide">
                Digital Academic Platform & LMS Modernization Assessment Report
              </h2>
              <div className="text-xs text-slate-600">
                Document Ref: <span className="font-mono font-bold">UOS/MWI/LMS-MOD/2026-V1</span> • Classification: Institutional Technical Proposal
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-[#0f2c59] hover:bg-blue-900 text-white rounded-lg text-xs font-bold flex items-center gap-2 no-print"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Report</span>
            </button>
          </div>

          {/* Context Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Initiated By</span>
              <strong className="text-slate-900">BS Software Engineering</strong>
              <div className="text-slate-500 text-[11px]">2K23 Batch (Semester 7)</div>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Department Chairperson</span>
              <strong className="text-slate-900">Prof. Dr. Arifa Bhutto</strong>
              <div className="text-slate-500 text-[11px]">Software Engineering Dept</div>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Vice Chancellor</span>
              <strong className="text-slate-900">Prof. Dr. Fateh Muhammad Mari</strong>
              <div className="text-slate-500 text-[11px]">University of Sindh</div>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Engineering Partner</span>
              <strong className="text-slate-900">MetaWave Innovations Ltd.</strong>
              <div className="text-slate-500 text-[11px]">Smart Systems — Growth</div>
            </div>
          </div>

          {/* Report Sections */}
          <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-2">1. Executive Summary</h3>
              <p>
                This assessment presents a comprehensive architectural audit, security evaluation framework, and modernization prototype for the <strong>University of Sindh Learning Management System (https://lms.usindh.edu.pk/)</strong>. 
                Initiated by students of the BS Software Engineering 2K23 Batch under the guidance of academic and engineering stakeholders, 
                this initiative demonstrates how legacy fragmented web services can be transformed into an integrated, secure, and accessible academic platform.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-base mb-2">2. Summary of Publicly Observable Findings (LMS-001 to LMS-020)</h3>
              <p>
                A rigorous audit classified 20 distinct findings into Confirmed, Probable, and Unknown categories. 
                Publicly verified findings include legacy admission labeling from 2021 (LMS-001), navigational spelling errors such as "Tranings" (LMS-006) and "Learning Managment System" (LMS-007), duplicate .php/.html routes (LMS-004), and fragmented user journeys (LMS-011). 
                Areas concerning database normalization (LMS-018), API security (LMS-016), and disaster recovery (LMS-020) have been explicitly marked as requiring authorized technical access for verification, preserving ethical boundaries.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-base mb-2">3. Proposed System Architecture</h3>
              <p>
                The target architecture introduces an enterprise Ingress & API Gateway (Kong) backed by OpenID Connect (Keycloak SSO) to eliminate multiple logins across campus domains. 
                Core academic workflows—including digital attendance with 75% thresholds, 1Link banking reconciliation for instant fee clearance, and tamper-resistant digital examination slips—are decoupled into scalable microservices.
              </p>
            </div>

            {/* Formal Endorsement Signatures */}
            <div className="pt-8 border-t-2 border-slate-300 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
              <div className="border-t border-slate-400 pt-2 text-center">
                <div className="font-bold text-slate-900">Department Representative</div>
                <div className="text-slate-500">BS Software Engineering (2K23 Batch)</div>
              </div>
              <div className="border-t border-slate-400 pt-2 text-center">
                <div className="font-bold text-slate-900">Prof. Dr. Arifa Bhutto</div>
                <div className="text-slate-500">Chairperson, Dept of Software Engineering</div>
              </div>
              <div className="border-t border-slate-400 pt-2 text-center">
                <div className="font-bold text-slate-900">MetaWave Innovations Ltd.</div>
                <div className="text-slate-500">Engineering & Assurance Team</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
