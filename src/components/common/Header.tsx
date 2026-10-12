import React, { useState, useRef, useEffect } from 'react';
import { UserRole } from '../../types';
import { UniversitySeal } from './UniversitySeal';
import { ENROLLED_COURSES } from '../../data/mockAcademicData';
import { useSwipeNavigation, useAutoScrollActivePill } from '../../hooks/useSwipeNavigation';
import { 
  Building2, 
  GraduationCap, 
  UserCheck, 
  ShieldCheck, 
  Server, 
  FileText, 
  Bell, 
  Search, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X, 
  BookOpen, 
  HeartHandshake, 
  School, 
  Building, 
  CheckCircle2, 
  PhoneCall,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenSearch: () => void;
  onOpenNoticeModal?: () => void;
  onOpenModernizationDoc?: () => void;
  onToggleSidebar?: () => void;
  activeCourseCode?: string;
  onSelectCourse?: (code: string) => void;
  studentTab?: string;
  onSelectStudentTab?: (tab: string) => void;
  activeDepartmentName?: string;
  activeBatchName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  unreadCount,
  onOpenNotifications,
  onOpenSearch,
  onOpenNoticeModal,
  onOpenModernizationDoc,
  activeCourseCode,
  onSelectCourse,
  onSelectStudentTab,
  activeDepartmentName = 'Software Engineering',
  activeBatchName = '2K23 Batch'
}) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [governanceMenuOpen, setGovernanceMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Maintain precise --header-height CSS variable for smooth sticky alignment across all devices
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        document.documentElement.style.setProperty('--header-height', `${headerRef.current.offsetHeight}px`);
      }
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, [currentRole, mobileNavOpen]);

  const roleConfig: Record<UserRole, { title: string; shortLabel: string; tier: string; icon: React.ReactNode }> = {
    public: {
      title: 'Public Academic Portal',
      shortLabel: 'Home',
      tier: 'Public Gateway',
      icon: <Building2 className="w-4 h-4 text-[#0068b5]" />
    },
    student: {
      title: 'Student LMS Workspace',
      shortLabel: 'Student',
      tier: 'Enrolled Scholar',
      icon: <GraduationCap className="w-4 h-4 text-[#007a33]" />
    },
    faculty: {
      title: 'Teacher E-Portal',
      shortLabel: 'Faculty',
      tier: 'Teaching Faculty',
      icon: <UserCheck className="w-4 h-4 text-[#0068b5]" />
    },
    parent: {
      title: 'Parents & Guardians',
      shortLabel: 'Parents',
      tier: 'Guardian View',
      icon: <HeartHandshake className="w-4 h-4 text-[#007a33]" />
    },
    vc: {
      title: 'Vice-Chancellor Secretariat',
      shortLabel: 'VC Office',
      tier: 'Executive Command',
      icon: <Building2 className="w-4 h-4 text-[#004b87]" />
    },
    dean: {
      title: 'Office of the Dean',
      shortLabel: 'Dean Office',
      tier: 'Faculty Board',
      icon: <School className="w-4 h-4 text-[#0068b5]" />
    },
    chairman: {
      title: 'Chairman Secretariat',
      shortLabel: 'Chairman',
      tier: 'Teaching Dept',
      icon: <ShieldCheck className="w-4 h-4 text-[#84a433]" />
    },
    hod: {
      title: 'Director / HOD Office',
      shortLabel: 'HOD Office',
      tier: 'Institute Governance',
      icon: <Building className="w-4 h-4 text-[#9e6338]" />
    },
    admin: {
      title: 'ITSC Operations & Systems',
      shortLabel: 'ITSC Admin',
      tier: 'Central Systems',
      icon: <Server className="w-4 h-4 text-[#0068b5]" />
    },
    architecture: {
      title: 'Modernization Architecture',
      shortLabel: 'Blueprint',
      tier: 'Engineering Audit',
      icon: <FileText className="w-4 h-4 text-[#9e6338]" />
    }
  };

  const isGovernanceRole = ['parent', 'vc', 'dean', 'chairman', 'hod', 'admin'].includes(currentRole);

  const orderedRoles: UserRole[] = [
    'public',
    'student',
    'faculty',
    'parent',
    'vc',
    'dean',
    'chairman',
    'hod',
    'admin',
    'architecture'
  ];

  const handleNavigate = (role: UserRole) => {
    onRoleChange(role);
    setMobileNavOpen(false);
    setGovernanceMenuOpen(false);
    setRoleMenuOpen(false);
  };

  // Swipe left/right on Mobile Portal Switcher ribbon
  const portalSwipeHandlers = useSwipeNavigation<UserRole>({
    items: orderedRoles,
    activeItem: currentRole,
    onSelect: handleNavigate,
    minSwipeDistance: 40
  });
  const portalScrollRef = useAutoScrollActivePill(currentRole);

  // Swipe left/right on Student Courses Quick-Jump ribbon
  const courseCodes = ENROLLED_COURSES.map(c => c.code);
  const courseSwipeHandlers = useSwipeNavigation<string>({
    items: courseCodes,
    activeItem: activeCourseCode || courseCodes[0],
    onSelect: (code) => {
      if (onSelectCourse) onSelectCourse(code);
    },
    minSwipeDistance: 40
  });
  const courseScrollRef = useAutoScrollActivePill(activeCourseCode || courseCodes[0]);

  const stepPortal = (dir: -1 | 1) => {
    const idx = orderedRoles.indexOf(currentRole);
    const nextIdx = (idx + dir + orderedRoles.length) % orderedRoles.length;
    handleNavigate(orderedRoles[nextIdx]);
  };

  const handleAdmissionsClick = () => {
    if (currentRole !== 'public') {
      onRoleChange('public');
      setTimeout(() => {
        document.getElementById('degree-programs-admissions')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      document.getElementById('degree-programs-admissions')?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileNavOpen(false);
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#d8dadb] no-print shadow-2xs">
      {/* 1. Institutional Top Utility Ribbon — Hidden on small phones (<md) to keep mobile header ultra-compact */}
      <div className="hidden md:flex bg-[#004b87] text-white text-[11px] px-4 lg:px-8 py-1.5 items-center justify-between gap-3 border-b border-[#003865]">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="font-serif-academic text-[12px] tracking-wide text-[#c8e27b] font-semibold">
            اُطْلُبُوا الْعِلْمَ مِنَ الْمَهْدِ إِلَى اللَّحْدِ
          </span>
          <span className="text-white/25">·</span>
          <span className="font-semibold text-white">
            UNIVERSITY OF SINDH
          </span>
          <span className="text-white/25">·</span>
          <span className="text-slate-200 font-mono text-[10px]">
            ALLAMA II QAZI CAMPUS, JAMSHORO · ESTD. 1947
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-slate-200 text-[11px] font-mono">
          {onOpenNoticeModal && (
            <button
              onClick={onOpenNoticeModal}
              className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[#c8e27b] hover:text-white px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 border border-white/20 transition-colors cursor-pointer font-sans font-medium shrink-0"
              title="About this Project: LMS & E-Portal Sample Notice"
            >
              <Sparkles className="w-3 h-3 text-[#c8e27b]" />
              <span className="hidden xs:inline">LMS &amp; E-Portal Notice</span>
              <span className="xs:hidden">Notice</span>
            </button>
          )}
          <div className="hidden lg:flex items-center gap-1.5 text-[#c8e27b]">
            <CheckCircle2 className="w-3 h-3 text-[#a3c644]" />
            <span>HEC W4 Ranked · Session Fall 2026</span>
          </div>
          <span className="text-white/25 hidden lg:inline">·</span>
          <div className="flex items-center gap-1 text-slate-100 text-[11px]">
            <PhoneCall className="w-3 h-3 text-[#c8e27b]" />
            <span>ITSC: </span>
            <span className="text-[#c8e27b] font-semibold">022-9213181</span>
          </div>
        </div>
      </div>

      {/* 2. Master Global Navigation Bar — Compact 56px on Mobile, 64px on Desktop */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Left: Authentic Official University of Sindh Brand Lockup */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div 
            onClick={() => handleNavigate('public')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none shrink-0"
            title="University of Sindh Central Portal"
          >
            <div className="sm:hidden shrink-0">
              <UniversitySeal size="sm" />
            </div>
            <div className="hidden sm:block shrink-0">
              <UniversitySeal size="md" />
            </div>
            <div className="flex flex-col shrink-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-sm sm:text-base xl:text-lg tracking-tight text-[#004b87] group-hover:text-[#0068b5] transition-colors leading-none font-sans whitespace-nowrap">
                  UNIVERSITY OF SINDH
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded bg-[#eef4e3] text-[#4c6418] border border-[#84a433]/40 font-bold hidden xl:inline shrink-0">
                  CENTRAL LMS &amp; E-PORTAL
                </span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-600 font-medium leading-tight mt-0.5 flex items-center gap-1 whitespace-nowrap">
                <span>Allama II Qazi Campus</span>
                <span className="text-slate-300">·</span>
                <span className="text-[#004b87] font-semibold">Jamshoro</span>
                <span className="text-slate-300 hidden md:inline">·</span>
                <span className="text-[#84a433] font-mono text-[10px] hidden md:inline">FET QA Inspected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Global Master Navigation Tabs (Desktop) */}
        <nav aria-label="Global Academic Navigation" className="hidden lg:flex items-center gap-1 bg-[#e8ecef] p-1 rounded-xl border border-[#d8dadb] text-xs font-semibold shrink-0">
          <button
            onClick={() => handleNavigate('public')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              currentRole === 'public'
                ? 'bg-[#004b87] text-white shadow-xs font-bold'
                : 'text-slate-700 hover:text-[#004b87] hover:bg-white/80'
            }`}
          >
            <Building2 className={`w-3.5 h-3.5 ${currentRole === 'public' ? 'text-[#c8e27b]' : 'text-[#0068b5]'}`} />
            <span>Home</span>
          </button>

          <button
            onClick={() => handleNavigate('student')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              currentRole === 'student'
                ? 'bg-[#004b87] text-white shadow-xs font-bold'
                : 'text-slate-700 hover:text-[#004b87] hover:bg-white/80'
            }`}
          >
            <GraduationCap className={`w-3.5 h-3.5 ${currentRole === 'student' ? 'text-[#c8e27b]' : 'text-[#007a33]'}`} />
            <span>Student LMS</span>
          </button>

          <button
            onClick={() => handleNavigate('faculty')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              currentRole === 'faculty'
                ? 'bg-[#004b87] text-white shadow-xs font-bold'
                : 'text-slate-700 hover:text-[#004b87] hover:bg-white/80'
            }`}
          >
            <UserCheck className={`w-3.5 h-3.5 ${currentRole === 'faculty' ? 'text-[#c8e27b]' : 'text-[#0068b5]'}`} />
            <span>Faculty</span>
          </button>

          <button
            onClick={handleAdmissionsClick}
            className="px-3 py-1.5 rounded-lg text-slate-700 hover:text-[#004b87] hover:bg-white/80 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap font-medium"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#007a33]" />
            <span>Admissions</span>
            <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[#eef4e3] text-[#4c6418] border border-[#84a433]/40 font-bold">2026</span>
          </button>
        </nav>

        {/* Right: Touch-Friendly Utilities (Search, Alerts, Governance & Portals Dropdown & Mobile Menu) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Quick Search (40x40px touch hitbox on mobile) */}
          <button
            onClick={onOpenSearch}
            className="min-w-[38px] min-h-[38px] px-2 sm:px-2.5 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1.5 text-xs font-medium cursor-pointer"
            title="Search LMS catalog & circulars (⌘K)"
            aria-label="Search"
          >
            <Search className="w-4 h-4 text-[#0068b5]" />
            <span className="hidden xl:inline text-slate-700">Search</span>
            <kbd className="hidden 2xl:inline px-1 py-0.2 text-[9px] bg-slate-100 text-slate-500 border border-slate-200 rounded font-mono">⌘K</kbd>
          </button>

          {/* Notifications Bell (40x40px touch hitbox on mobile) */}
          <button
            onClick={onOpenNotifications}
            className="min-w-[38px] min-h-[38px] p-2 relative text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors flex items-center justify-center cursor-pointer"
            title="Notifications & circulars"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-slate-700" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white rounded-full text-[9px] font-mono font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Governance & Portals Dropdown Button (Prominently placed at the end of the navigation header) */}
          <div className="relative">
            <button
              onClick={() => setGovernanceMenuOpen(!governanceMenuOpen)}
              onBlur={() => setTimeout(() => setGovernanceMenuOpen(false), 220)}
              className={`min-h-[38px] flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border transition-all cursor-pointer shadow-2xs text-xs font-semibold ${
                isGovernanceRole
                  ? 'bg-[#004b87] text-white border-[#003866] shadow-xs'
                  : 'bg-[#f4f6f8] hover:bg-white text-slate-800 border-[#d8dadb] hover:border-[#004b87]'
              }`}
              aria-label="Governance & Portals Menu"
              title="University Governance & Portals"
            >
              <div className="shrink-0">
                <School className={`w-3.5 h-3.5 ${isGovernanceRole ? 'text-[#c8e27b]' : 'text-[#004b87]'}`} />
              </div>
              <span className="text-[11px] sm:text-xs leading-none font-bold truncate max-w-[90px] sm:max-w-[130px] lg:max-w-none">
                {isGovernanceRole ? roleConfig[currentRole].shortLabel : 'Governance & Portals'}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${governanceMenuOpen ? 'rotate-180 text-white' : (isGovernanceRole ? 'text-white/80' : 'text-slate-500')}`} />
            </button>

            {governanceMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setGovernanceMenuOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 w-72 max-w-[calc(100vw-1.5rem)] bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in duration-100">
                  <div className="px-2.5 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 mb-1 flex items-center justify-between font-mono">
                    <span>Governance &amp; Administrative Tier</span>
                    <span className="text-[9px] text-[#0068b5] font-bold">Official Portals</span>
                  </div>
                  <div className="max-h-[65vh] overflow-y-auto space-y-0.5">
                    {[
                      { role: 'parent' as UserRole, label: 'Parents & Guardians Portal', desc: 'Attendance & Result Monitor', icon: <HeartHandshake className="w-4 h-4 text-[#007a33]" /> },
                      { role: 'vc' as UserRole, label: 'Vice-Chancellor Secretariat', desc: 'Prof. Dr. M. Siddique Kalhoro', icon: <Building2 className="w-4 h-4 text-[#004b87]" /> },
                      { role: 'dean' as UserRole, label: 'Office of the Dean', desc: 'Prof. Dr. ur-Rehman Khoumbati (FET)', icon: <School className="w-4 h-4 text-[#0068b5]" /> },
                      { role: 'chairman' as UserRole, label: 'Chairman / Dept Secretariat', desc: 'Prof. Dr. Arifa Bhutto (SWE)', icon: <ShieldCheck className="w-4 h-4 text-[#84a433]" /> },
                      { role: 'hod' as UserRole, label: 'Director / HOD Office', desc: 'Institutes & Academic Boards', icon: <Building className="w-4 h-4 text-[#9e6338]" /> },
                      { role: 'admin' as UserRole, label: 'ITSC Operations & Systems', desc: 'Central University Cluster', icon: <Server className="w-4 h-4 text-[#0068b5]" /> },
                      { role: 'architecture' as UserRole, label: 'Modernization Blueprint', desc: 'Architecture & Technical Audit', icon: <FileText className="w-4 h-4 text-[#9e6338]" /> }
                    ].map((item) => (
                      <button
                        key={item.role}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleNavigate(item.role);
                        }}
                        onClick={() => handleNavigate(item.role)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          currentRole === item.role ? 'bg-[#004b87]/10 text-[#004b87] font-bold border border-[#004b87]/20' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {item.icon}
                          <div className="min-w-0">
                            <div className="leading-tight font-semibold truncate">{item.label}</div>
                            <div className="text-[10px] text-slate-500 font-normal truncate">{item.desc}</div>
                          </div>
                        </div>
                        {currentRole === item.role && <span className="w-2 h-2 rounded-full bg-[#004b87] shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile Hamburger Menu Toggle (40x40px touch hitbox) */}
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="lg:hidden min-w-[38px] min-h-[38px] p-2 rounded-xl text-[#004b87] hover:bg-slate-100 border border-[#d8dadb] transition-colors flex items-center justify-center cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 3. Mobile Responsive Quick-Access Sheet */}
      {mobileNavOpen && (
        <div className="lg:hidden bg-white border-b-2 border-[#0068b5] px-4 py-4 space-y-4 shadow-2xl max-h-[80vh] overflow-y-auto animate-in slide-in-from-top-2 duration-150">
          {/* Quick Student Shortcuts on Mobile */}
          <div className="space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              Primary Academic Portals:
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <button
                onClick={() => handleNavigate('public')}
                className={`min-h-[44px] p-2.5 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                  currentRole === 'public'
                    ? 'bg-[#0068b5] text-white border-[#0068b5] font-bold'
                    : 'bg-[#f4f6f8] text-slate-800 border-[#d8dadb]'
                }`}
              >
                <Building2 className={`w-4 h-4 shrink-0 ${currentRole === 'public' ? 'text-[#c8e27b]' : 'text-[#0068b5]'}`} />
                <span>Portal Home</span>
              </button>

              <button
                onClick={() => handleNavigate('student')}
                className={`min-h-[44px] p-2.5 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                  currentRole === 'student'
                    ? 'bg-[#0068b5] text-white border-[#0068b5] font-bold'
                    : 'bg-[#f4f6f8] text-slate-800 border-[#d8dadb]'
                }`}
              >
                <GraduationCap className={`w-4 h-4 shrink-0 ${currentRole === 'student' ? 'text-[#c8e27b]' : 'text-[#007a33]'}`} />
                <span>Student LMS</span>
              </button>

              <button
                onClick={() => handleNavigate('faculty')}
                className={`min-h-[44px] p-2.5 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                  currentRole === 'faculty'
                    ? 'bg-[#0068b5] text-white border-[#0068b5] font-bold'
                    : 'bg-[#f4f6f8] text-slate-800 border-[#d8dadb]'
                }`}
              >
                <UserCheck className={`w-4 h-4 shrink-0 ${currentRole === 'faculty' ? 'text-[#c8e27b]' : 'text-[#0068b5]'}`} />
                <span>Faculty Portal</span>
              </button>

              <button
                onClick={handleAdmissionsClick}
                className="min-h-[44px] p-2.5 rounded-xl border bg-[#eef4e3] text-[#4c6418] border-[#84a433]/40 font-bold flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-[#007a33] shrink-0" />
                <span>Admissions 2026</span>
              </button>

              <button
                onClick={() => handleNavigate('parent')}
                className={`min-h-[44px] p-2.5 rounded-xl border flex items-center gap-2 transition-all col-span-2 cursor-pointer ${
                  currentRole === 'parent'
                    ? 'bg-[#0068b5] text-white border-[#0068b5] font-bold'
                    : 'bg-[#f4f6f8] text-slate-800 border-[#d8dadb]'
                }`}
              >
                <HeartHandshake className={`w-4 h-4 shrink-0 ${currentRole === 'parent' ? 'text-[#c8e27b]' : 'text-[#007a33]'}`} />
                <span>Parents &amp; Guardians Workspace</span>
              </button>
            </div>
          </div>

          {/* Direct Student Tools Quick-Jump */}
          {onSelectStudentTab && (
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                1-Tap Student Tools:
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-[11px] font-semibold">
                {[
                  { id: 'timetable', label: 'Timetable & Exams' },
                  { id: 'courses', label: 'My Courses' },
                  { id: 'attendance', label: '75% Attendance' },
                  { id: 'exams', label: 'QR Admit Slip' },
                  { id: 'results', label: 'Transcript' },
                  { id: 'fees', label: '1Link Challan' }
                ].map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      onSelectStudentTab(tool.id);
                      setMobileNavOpen(false);
                    }}
                    className="min-h-[38px] px-2 py-1.5 rounded-lg bg-slate-50 hover:bg-[#0068b5] text-slate-700 hover:text-white border border-slate-200 text-center transition-colors cursor-pointer"
                  >
                    {tool.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Governance Section on Mobile */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              University Governance &amp; Administration:
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-[11px] font-medium">
              <button
                onClick={() => handleNavigate('vc')}
                className="min-h-[38px] px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-left hover:bg-slate-100 cursor-pointer"
              >
                VC Secretariat
              </button>
              <button
                onClick={() => handleNavigate('dean')}
                className="min-h-[38px] px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-left hover:bg-slate-100 cursor-pointer"
              >
                Dean Office (BoF)
              </button>
              <button
                onClick={() => handleNavigate('chairman')}
                className="min-h-[38px] px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-left hover:bg-slate-100 cursor-pointer"
              >
                Chairman Office
              </button>
              <button
                onClick={() => handleNavigate('hod')}
                className="min-h-[38px] px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-left hover:bg-slate-100 cursor-pointer"
              >
                Director / HOD
              </button>
              <button
                onClick={() => handleNavigate('admin')}
                className="min-h-[38px] px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-left hover:bg-slate-100 col-span-2 flex items-center justify-between cursor-pointer"
              >
                <span>ITSC Operations Admin</span>
                <span className="font-mono text-[9px] text-[#0068b5]">Jamshoro Cluster</span>
              </button>
            </div>
          </div>

          {/* Official 9-Page Modernization Document Trigger on Mobile */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileNavOpen(false);
                if (onOpenModernizationDoc) {
                  onOpenModernizationDoc();
                } else {
                  handleNavigate('architecture');
                }
              }}
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#eef4e3] hover:bg-[#e2eccf] text-[#364910] border border-[#84a433]/50 flex items-center justify-between text-xs font-bold transition-colors cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#84a433] shrink-0" />
                <span className="font-sans">Modernization Document (9 Pages)</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#84a433] text-white font-bold">PDF / Read</span>
            </button>
          </div>

          {/* AI Research & Sample Data Notice Trigger on Mobile */}
          {onOpenNoticeModal && (
            <div className="pt-1">
              <button
                onClick={() => {
                  setMobileNavOpen(false);
                  onOpenNoticeModal();
                }}
                className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-blue-50/80 hover:bg-blue-100/80 text-[#004b87] border border-blue-200/80 flex items-center justify-between text-xs font-bold transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0068b5]" />
                  <span>LMS &amp; E-Portal Notice (Sample Data)</span>
                </div>
                <span className="text-[10px] font-mono font-normal text-slate-500">Read</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3.5 Mobile & Tablet Horizontal Portal Switcher Bar with Swipe-Left / Swipe-Right Gestures */}
      <div
        onTouchStart={portalSwipeHandlers.onTouchStart}
        onTouchEnd={portalSwipeHandlers.onTouchEnd}
        className="lg:hidden bg-[#f4f6f8] border-t border-[#d8dadb] px-3 py-2 flex items-center justify-between gap-2 select-none no-print shadow-2xs"
      >
        <div
          ref={portalScrollRef}
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-1 py-0.5"
        >
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-1 shrink-0">
            Portals:
          </span>
          {orderedRoles.map((role) => {
            const isSelected = currentRole === role;
            return (
              <button
                key={role}
                data-nav-id={role}
                onClick={() => handleNavigate(role)}
                className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#004b87] text-white font-bold shadow-xs'
                    : 'bg-white text-slate-700 border border-[#d8dadb] hover:bg-slate-100'
                }`}
              >
                <span className="scale-95 shrink-0">{roleConfig[role].icon}</span>
                <span>{roleConfig[role].shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* 1-Tap Prev/Next Portal Step Buttons on Mobile */}
        <div className="flex items-center gap-1 pl-1.5 border-l border-[#d8dadb] shrink-0">
          <button
            onClick={() => stepPortal(-1)}
            className="w-8 h-8 rounded-xl bg-white border border-[#d8dadb] text-[#004b87] hover:bg-slate-100 flex items-center justify-center cursor-pointer shadow-2xs"
            title="Previous Portal (Swipe Right)"
            aria-label="Previous Portal"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => stepPortal(1)}
            className="w-8 h-8 rounded-xl bg-white border border-[#d8dadb] text-[#004b87] hover:bg-slate-100 flex items-center justify-center cursor-pointer shadow-2xs"
            title="Next Portal (Swipe Left)"
            aria-label="Next Portal"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4. Persistent Course Sites Quick-Jump Ribbon (When inside Student — Desktop & Tablet md+) */}
      {currentRole === 'student' && (
        <div
          onTouchStart={courseSwipeHandlers.onTouchStart}
          onTouchEnd={courseSwipeHandlers.onTouchEnd}
          className="hidden md:block bg-[#004b87] text-white text-xs border-t border-[#0068b5] select-none no-print overflow-x-auto no-scrollbar shadow-inner"
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between h-9 gap-3">
            <div
              ref={courseScrollRef}
              className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#c8e27b] font-mono shrink-0 mr-1 flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-[#c8e27b]" />
                <span className="hidden xs:inline">Courses:</span>
              </span>

              {ENROLLED_COURSES.map((course) => {
                const isSelected = activeCourseCode === course.code;
                return (
                  <button
                    key={course.code}
                    data-nav-id={course.code}
                    onClick={() => {
                      if (onSelectCourse) onSelectCourse(course.code);
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-medium font-mono shrink-0 flex items-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white text-[#004b87] font-bold shadow-xs ring-1 ring-white'
                        : 'text-slate-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{course.code}</span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#84a433]" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-3 shrink-0 text-[11px] text-slate-200 font-mono">
              <span className="text-white">Department: {activeDepartmentName} ({activeBatchName})</span>
              <span className="text-white/30" aria-hidden="true">|</span>
              <span className="text-[#c8e27b] font-semibold">75% HEC Verified</span>
            </div>
          </div>
        </div>
      )}

      {/* Faculty Persistent Course Sites Quick-Jump Ribbon (Desktop & Tablet md+) */}
      {currentRole === 'faculty' && (
        <div className="hidden md:block bg-[#004b87] text-white text-xs border-t border-[#0068b5] select-none no-print overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between h-9 gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#c8e27b] font-mono shrink-0 mr-1 flex items-center gap-1">
                <UserCheck className="w-3 h-3 text-[#c8e27b]" />
                <span>Roster:</span>
              </span>

              {['SWE-401 (Architecture)', 'SWE-405 (Cloud Systems)', 'SWE-403 (Software QA)'].map((crs, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded text-xs font-medium font-mono shrink-0 bg-white/10 text-slate-100 border border-white/15"
                >
                  {crs}
                </span>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3 shrink-0 text-[11px] text-slate-200 font-mono">
              <span>Teacher E-Portal Sync: <strong className="text-[#c8e27b]">Live</strong></span>
              <span className="text-white/30" aria-hidden="true">|</span>
              <span>Grading Lock Date: Oct 30, 2026</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
