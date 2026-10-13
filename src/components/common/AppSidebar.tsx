import React, { useState } from 'react';
import { UserRole } from '../../types';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  Clock, 
  FileText, 
  Award, 
  GraduationCap, 
  CreditCard, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight,
  UserCheck, 
  School, 
  Server, 
  CheckSquare,
  FileCheck2,
  HeartHandshake,
  User,
  ChevronDown,
  Building2,
  FolderGit2,
  Sparkles,
  HelpCircle,
  Home,
  X,
  PanelLeft
} from 'lucide-react';
import { UniversitySeal } from './UniversitySeal';

export interface NavSubLink {
  id: string;
  label: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  subLinks?: NavSubLink[];
}

export interface NavSection {
  heading: string;
  items: NavItem[];
}

interface AppSidebarProps {
  currentRole: UserRole;
  activeTab: string;
  activeSubTab?: string;
  onTabChange: (tabId: string, subLinkId?: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onSelectRole: (role: UserRole) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  currentRole,
  activeTab,
  activeSubTab,
  onTabChange,
  isCollapsed,
  onToggleCollapse,
  onSelectRole,
  isMobileOpen = false,
  onCloseMobile
}) => {
  // Navigation structure tailored to each persona with direct sub-links where beneficial
  const getNavSections = (): NavSection[] => {
    if (currentRole === 'vc') {
      return [
        {
          heading: 'Executive Command',
          items: [
            { id: 'overview', label: 'University Radar', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'faculties', label: '14 Faculties Oversight', icon: <School className="w-4 h-4" /> },
            {
              id: 'timetable',
              label: 'Master Timetable & Exams',
              icon: <Calendar className="w-4 h-4" />,
              badge: '8 Sem',
              subLinks: [
                { id: 'classes', label: 'Classes Timetable (1-4 Yrs)' },
                { id: 'exams', label: 'Midterm & Final Datesheet' },
                { id: 'settings', label: 'University Policy & Timings' }
              ]
            },
            { 
              id: 'examinations', 
              label: 'Examination Council', 
              icon: <Award className="w-4 h-4" />, 
              badge: 'Stage-Gate',
              subLinks: [
                { id: 'council', label: 'Controller Tabulation' },
                { id: 'convocation', label: 'Degree Conferment' }
              ]
            },
            { 
              id: 'governance', 
              label: 'Senate & Syndicate', 
              icon: <FileText className="w-4 h-4" />,
              subLinks: [
                { id: 'resolutions', label: 'Statutory Directives' },
                { id: 'minutes', label: 'Syndicate Minutes' }
              ]
            },
            { 
              id: 'finance', 
              label: '1Link Digital Treasury', 
              icon: <CreditCard className="w-4 h-4" />,
              subLinks: [
                { id: 'revenue', label: 'Online Fee Settlement' },
                { id: 'grants', label: 'HEC Recurring Budget' }
              ]
            }
          ]
        },
        {
          heading: 'Executive Identity',
          items: [
            { id: 'profile', label: 'VC Secretariat Profile', icon: <User className="w-4 h-4" /> }
          ]
        }
      ];
    } else if (currentRole === 'dean') {
      return [
        {
          heading: 'Faculty Governance',
          items: [
            { id: 'overview', label: 'Faculty Radar', icon: <LayoutDashboard className="w-4 h-4" /> },
            { 
              id: 'departments', 
              label: 'Constituent Departments', 
              icon: <School className="w-4 h-4" />,
              subLinks: [
                { id: 'depts', label: 'FET Academic Units' },
                { id: 'chairpersons', label: 'Chairpersons Roster' }
              ]
            },
            { id: 'faculty', label: 'Teaching Staff Roster', icon: <UserCheck className="w-4 h-4" /> },
            {
              id: 'timetable',
              label: 'Faculty Timetables & Exams',
              icon: <Calendar className="w-4 h-4" />,
              badge: '1-4 Yrs',
              subLinks: [
                { id: 'classes', label: 'Dept Timetables (8 Sem)' },
                { id: 'exams', label: 'Midterm & Final Datesheets' },
                { id: 'teachers', label: 'Faculty Workload Matrix' },
                { id: 'settings', label: 'Session Timings' }
              ]
            },
            { 
              id: 'bof', 
              label: 'Board of Faculty (BoF)', 
              icon: <FileCheck2 className="w-4 h-4" />,
              subLinks: [
                { id: 'curricula', label: 'Curricula Approvals' },
                { id: 'minutes', label: 'BoF Resolutions' }
              ]
            },
            { id: 'accreditation', label: 'Accreditation & OBE', icon: <ShieldCheck className="w-4 h-4" /> }
          ]
        },
        {
          heading: 'Dean Office',
          items: [
            { id: 'profile', label: 'Dean Credentials', icon: <User className="w-4 h-4" /> }
          ]
        }
      ];
    } else if (currentRole === 'student') {
      return [
        {
          heading: 'Academic Workspace',
          items: [
            { id: 'overview', label: 'Dashboard & Feed', icon: <LayoutDashboard className="w-4 h-4" /> },
            { 
              id: 'courses', 
              label: 'Courses & Modules', 
              icon: <BookOpen className="w-4 h-4" />,
              subLinks: [
                { id: 'modules', label: 'Weekly Lessons (1–16)' },
                { id: 'syllabus', label: 'Syllabus & OBE CLOs' },
                { id: 'assignments', label: 'Course Assignments' },
                { id: 'gradebook', label: 'Course Gradebook' },
                { id: 'resources', label: 'Slides & File Vault' }
              ]
            },
            { id: 'selection', label: 'Subject Selection', icon: <CheckSquare className="w-4 h-4" />, badge: 'Fall 2026' },
            {
              id: 'timetable',
              label: 'Class & Exam Timetable',
              icon: <Calendar className="w-4 h-4" />,
              badge: 'Live PDF',
              subLinks: [
                { id: 'classes', label: 'Weekly Classes (P-I to P-IV)' },
                { id: 'exams', label: 'Midterm & Final Datesheet' },
                { id: 'teachers', label: 'Faculty Schedule Matrix' },
                { id: 'rooms', label: 'Room & Lab Directory' }
              ]
            },
            { 
              id: 'attendance', 
              label: 'Attendance (75% Rule)', 
              icon: <Clock className="w-4 h-4" />, 
              badge: 'Biometric',
              subLinks: [
                { id: 'register', label: 'Course Attendance (75%)' },
                { id: 'stream', label: 'Biometric Punch Log' },
                { id: 'appeal', label: 'File Medical Appeal' }
              ]
            },
            { 
              id: 'assignments', 
              label: 'Assignments & Labs', 
              icon: <FileText className="w-4 h-4" />,
              badge: '2 Due',
              subLinks: [
                { id: 'all', label: 'All Deliverables' },
                { id: 'pending', label: 'Pending Deadlines' },
                { id: 'submissions', label: 'Submitted & Graded' }
              ]
            }
          ]
        },
        {
          heading: 'Assessments & Dues',
          items: [
            { 
              id: 'exams', 
              label: 'Exams & Admit Slip', 
              icon: <Award className="w-4 h-4" />,
              subLinks: [
                { id: 'slip', label: 'Admit Card with QR' },
                { id: 'datesheet', label: 'Midterm Datesheet' }
              ]
            },
            { 
              id: 'results', 
              label: 'Results & Transcript', 
              icon: <GraduationCap className="w-4 h-4" />,
              subLinks: [
                { id: 'grades', label: 'Semester Transcript' },
                { id: 'calculator', label: 'GPA Simulator' }
              ]
            },
            { 
              id: 'fees', 
              label: '1Link Fee Challans', 
              icon: <CreditCard className="w-4 h-4" />, 
              badge: 'Payable',
              subLinks: [
                { id: 'challans', label: 'Kuickpay Challans' },
                { id: 'receipts', label: 'Payment Ledger' }
              ]
            },
            { id: 'proforma', label: 'HEC QEC Proforma', icon: <FileCheck2 className="w-4 h-4" /> }
          ]
        },
        {
          heading: 'Identity & Records',
          items: [
            { id: 'profile', label: 'Student Smart ID & Profile', icon: <User className="w-4 h-4" /> }
          ]
        }
      ];
    } else if (currentRole === 'faculty') {
      return [
        {
          heading: 'Teaching Workspace',
          items: [
            { id: 'overview', label: 'Faculty Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
            {
              id: 'timetable',
              label: 'Teaching & Exam Timetable',
              icon: <Calendar className="w-4 h-4" />,
              badge: 'Assigned',
              subLinks: [
                { id: 'teachers', label: 'My Assigned Lectures' },
                { id: 'classes', label: 'Dept Classes (1-4 Yrs)' },
                { id: 'exams', label: 'Midterm & Final Invigilation' }
              ]
            },
            { 
              id: 'attendance', 
              label: 'Lecture Attendance', 
              icon: <Clock className="w-4 h-4" />,
              subLinks: [
                { id: 'roster', label: 'Mark Daily Roster' },
                { id: 'register', label: 'Course Attendance Book' }
              ]
            },
            { 
              id: 'grading', 
              label: 'Assessments & Grading', 
              icon: <FileText className="w-4 h-4" />,
              subLinks: [
                { id: 'quizzes', label: 'Quizzes & Assignments' },
                { id: 'midfinals', label: 'Midterm / Final Entry' }
              ]
            },
            { id: 'materials', label: 'Courseware Uploader', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'risk', label: 'At-Risk Students', icon: <ShieldCheck className="w-4 h-4" />, badge: 'Active' }
          ]
        },
        {
          heading: 'Faculty Identity',
          items: [
            { id: 'profile', label: 'Academic Profile & Office', icon: <User className="w-4 h-4" /> }
          ]
        }
      ];
    } else if (currentRole === 'chairman' || currentRole === 'hod') {
      const isChair = currentRole === 'chairman';
      return [
        {
          heading: isChair ? 'Department Administration' : 'Institute Directorate',
          items: [
            { id: 'overview', label: isChair ? 'Department Radar' : 'Institute Radar', icon: <School className="w-4 h-4" /> },
            {
              id: 'timetable',
              label: 'Master Timetable & Exams',
              icon: <Calendar className="w-4 h-4" />,
              badge: 'HOD Control',
              subLinks: [
                { id: 'classes', label: 'Classes Timetable (1-4 Yrs)' },
                { id: 'exams', label: 'Midterm & Final Datesheet' },
                { id: 'teachers', label: 'Teacher Schedule Matrix' },
                { id: 'rooms', label: 'Room & Lab Occupancy' },
                { id: 'settings', label: 'University Timetable Settings' }
              ]
            },
            { 
              id: 'cohorts', 
              label: 'Undergraduate Batches', 
              icon: <GraduationCap className="w-4 h-4" />,
              subLinks: [
                { id: 'batches', label: '2K21 to 2K24 Cohorts' },
                { id: '2k21', label: '2K21 Final Year (P-IV)' },
                { id: '2k23', label: '2K23 Junior Batch (P-II)' },
                { id: 'representatives', label: 'Class Reps Directory (CR/GR)' }
              ]
            },
            { id: 'appeals', label: 'Attendance & Medical Appeals', icon: <Clock className="w-4 h-4" />, badge: '3 Pending' },
            { 
              id: 'accreditation', 
              label: 'NCEAC / OBE Criteria', 
              icon: <ShieldCheck className="w-4 h-4" />,
              subLinks: [
                { id: 'criteria', label: 'Accreditation Criteria' },
                { id: 'obe', label: 'CLO Attainment Matrix' }
              ]
            },
            { id: 'broadcast', label: 'Department Circulars', icon: <FileText className="w-4 h-4" /> }
          ]
        },
        {
          heading: 'Executive Desk',
          items: [
            { id: 'profile', label: isChair ? 'Chairperson Secretariat' : 'Director Credentials', icon: <User className="w-4 h-4" /> }
          ]
        }
      ];
    } else if (currentRole === 'admin') {
      return [
        {
          heading: 'ITSC Operations',
          items: [
            { 
              id: 'telemetry', 
              label: 'Cluster Telemetry', 
              icon: <Server className="w-4 h-4" />,
              subLinks: [
                { id: 'services', label: 'Microservices Health' },
                { id: 'spike', label: 'Load Spike Simulator' }
              ]
            },
            {
              id: 'timetable',
              label: 'Master Timetable Engine',
              icon: <Calendar className="w-4 h-4" />,
              badge: '8 Sem',
              subLinks: [
                { id: 'classes', label: 'Dept Classes (1-4 Yrs)' },
                { id: 'exams', label: 'Midterm & Final Datesheets' },
                { id: 'settings', label: 'University Bell Settings' }
              ]
            },
            { id: 'results', label: 'Result Stage-Gate', icon: <Award className="w-4 h-4" />, badge: 'Stage-Gate' },
            { 
              id: 'users', 
              label: 'Unified Directory', 
              icon: <UserCheck className="w-4 h-4" />,
              subLinks: [
                { id: 'roles', label: 'Role Access Matrix' },
                { id: 'students', label: 'Student Accounts' },
                { id: 'faculty', label: 'Faculty Credentials' },
                { id: 'mfa', label: 'MFA Enforcement' }
              ]
            },
            { id: 'audit', label: 'Immutable Audit Log', icon: <ShieldCheck className="w-4 h-4" /> }
          ]
        },
        {
          heading: 'Security & Access',
          items: [
            { id: 'profile', label: 'ITSC Officer Identity', icon: <User className="w-4 h-4" /> }
          ]
        }
      ];
    } else if (currentRole === 'parent') {
      return [
        {
          heading: 'Ward Academic Oversight',
          items: [
            { id: 'overview', label: 'Ward Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
            {
              id: 'timetable',
              label: 'Class & Exam Timetable',
              icon: <Calendar className="w-4 h-4" />,
              subLinks: [
                { id: 'classes', label: 'Weekly Classes Schedule' },
                { id: 'exams', label: 'Midterm & Final Datesheet' }
              ]
            },
            { 
              id: 'attendance', 
              label: 'Attendance (75% Rule)', 
              icon: <Clock className="w-4 h-4" />, 
              badge: '73% Risk',
              subLinks: [
                { id: 'courses', label: 'Course Breakdown' },
                { id: 'logs', label: 'Daily Biometric Log' },
                { id: 'leaves', label: 'Medical Justifications' }
              ]
            },
            { id: 'results', label: 'Term Grades & CGPA', icon: <GraduationCap className="w-4 h-4" /> },
            { 
              id: 'fees', 
              label: '1Link Fee Challans', 
              icon: <CreditCard className="w-4 h-4" />, 
              badge: 'Payable',
              subLinks: [
                { id: 'unpaid', label: 'Pending Vouchers' },
                { id: 'receipts', label: 'Settled Ledger' }
              ]
            },
            { id: 'advisor', label: 'Advisor Consultation', icon: <UserCheck className="w-4 h-4" /> }
          ]
        },
        {
          heading: 'Guardian Profile',
          items: [
            { id: 'profile', label: 'Guardian CNIC Record', icon: <User className="w-4 h-4" /> }
          ]
        }
      ];
    }
    return [];
  };

  const sections = getNavSections();

  return (
    <>
      {/* 1. Desktop Persistent Enterprise Sidebar */}
      <aside 
        className={`hidden lg:flex flex-col bg-white border-r border-slate-200 transition-all duration-200 z-30 shrink-0 select-none ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {/* Top Sidebar Header with Role Status & Collapse button */}
        <div className="h-14 flex items-center justify-between px-3 border-b border-[#d8dadb] bg-[#f4f6f8]">
          {!isCollapsed && (
            <div className="flex items-center gap-2 overflow-hidden min-w-0">
              <span className="w-2 h-2 rounded-full bg-[#84a433] shrink-0" />
              <div className="truncate">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#004b87] leading-tight">
                  {currentRole === 'chairman' ? 'CHAIRMAN DESK' : `${currentRole.toUpperCase()} WORKSPACE`}
                </div>
                <div className="text-[9px] text-slate-500 font-mono">UOS Allama II Qazi</div>
              </div>
            </div>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors mx-auto cursor-pointer"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Main Navigation Sections */}
        <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
          {sections.map((sec, secIdx) => (
            <div key={secIdx} className="space-y-1">
              {!isCollapsed && (
                <div className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {sec.heading}
                </div>
              )}
              <div className="space-y-0.5">
                {sec.items.map((item) => {
                  const isActive = activeTab === item.id;
                  const hasSubLinks = item.subLinks && item.subLinks.length > 0;

                  return (
                    <div key={item.id} className="space-y-0.5">
                      <button
                        onClick={() => onTabChange(item.id)}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer group ${
                          isActive
                            ? 'bg-[#004b87] text-white font-bold shadow-2xs'
                            : 'text-slate-700 hover:text-[#004b87] hover:bg-slate-100/90'
                        }`}
                        title={isCollapsed ? item.label : undefined}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`shrink-0 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-[#004b87]'}`}>
                            {item.icon}
                          </span>
                          {!isCollapsed && <span className="truncate">{item.label}</span>}
                        </div>

                        {!isCollapsed && (
                          <div className="flex items-center gap-1.5 shrink-0">
                            {item.badge && (
                              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold font-mono ${
                                item.badge.includes('Risk')
                                  ? 'bg-rose-100 text-rose-800'
                                  : isActive 
                                    ? 'bg-white/20 text-white' 
                                    : 'bg-[#eef4e3] text-[#4c6418]'
                              }`}>
                                {item.badge}
                              </span>
                            )}
                            {hasSubLinks && (
                              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${
                                isActive ? 'rotate-180 text-white/70' : 'text-slate-400 group-hover:text-slate-600'
                              }`} />
                            )}
                          </div>
                        )}
                      </button>

                      {/* Direct Sub-links for active item */}
                      {!isCollapsed && hasSubLinks && isActive && (
                        <div className="pl-5 pr-1 py-1 space-y-1 border-l-2 border-[#0068b5]/30 ml-4 animate-in fade-in duration-150">
                          {item.subLinks!.map((sub, sIdx) => {
                            const isSubActive = activeSubTab ? activeSubTab === sub.id : sIdx === 0;
                            return (
                              <button
                                key={sub.id}
                                onClick={() => onTabChange(item.id, sub.id)}
                                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition-all flex items-center justify-between gap-1.5 group cursor-pointer ${
                                  isSubActive
                                    ? 'bg-[#0068b5]/10 text-[#004b87] font-bold border border-[#0068b5]/20'
                                    : 'text-slate-600 hover:text-[#004b87] hover:bg-slate-100/80 font-medium'
                                }`}
                              >
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <span
                                    className={`w-1.5 h-1.5 rounded-full transition-colors shrink-0 ${
                                      isSubActive ? 'bg-[#84a433]' : 'bg-slate-300 group-hover:bg-[#0068b5]'
                                    }`}
                                  />
                                  <span className="truncate">{sub.label}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Actions: Public Portal Return & Technical Blueprint */}
        <div className="p-2 border-t border-slate-200 bg-slate-50/80 space-y-1">
          <button
            onClick={() => onSelectRole('public')}
            className={`w-full flex items-center gap-2 p-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-[#0b2545] hover:bg-white border border-slate-200 transition-colors cursor-pointer ${
              isCollapsed ? 'justify-center' : 'justify-start'
            }`}
            title="Return to Public E-Portal & Admissions Gateway"
          >
            <Home className="w-4 h-4 text-slate-600 shrink-0" />
            {!isCollapsed && <span className="truncate">Public LMS Gateway</span>}
          </button>

          <button
            onClick={() => onSelectRole('architecture')}
            className={`w-full flex items-center gap-2 p-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-white border border-slate-200 transition-colors cursor-pointer ${
              isCollapsed ? 'justify-center' : 'justify-between'
            }`}
            title="Audit & Technical Architecture"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <FolderGit2 className="w-4 h-4 text-amber-700 shrink-0" />
              {!isCollapsed && <span className="truncate">System Architecture</span>}
            </div>
            {!isCollapsed && (
              <span className="text-[10px] bg-slate-200 text-slate-800 px-1.5 py-0.2 rounded font-mono font-bold shrink-0">
                UOS-20
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* 2. Mobile & Tablet Slider Drawer from Left Side */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={onCloseMobile}
            aria-label="Close sidebar overlay"
          />

          {/* Slide-over Container from Left */}
          <aside
            className="relative z-50 w-72 sm:w-80 max-w-[85vw] h-full bg-white shadow-2xl flex flex-col border-r border-slate-200 animate-in slide-in-from-left duration-250 select-none"
            aria-label="Mobile Navigation Sidebar"
          >
            {/* Mobile Header with Role Status & Close Button */}
            <div className="h-16 flex items-center justify-between px-3.5 border-b border-[#d8dadb] bg-[#004b87] text-white shrink-0">
              <div className="flex items-center gap-2.5 overflow-hidden min-w-0">
                <div className="p-1 bg-white rounded-xl border border-white/20 shrink-0 shadow-xs">
                  <UniversitySeal size="sm" />
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold uppercase tracking-wider text-white leading-tight">
                    {currentRole === 'chairman' ? 'CHAIRMAN DESK' : `${currentRole.toUpperCase()} WORKSPACE`}
                  </div>
                  <div className="text-[10px] text-[#c8e27b] font-mono truncate">University of Sindh LMS</div>
                </div>
              </div>
              <button
                onClick={onCloseMobile}
                className="min-w-[36px] min-h-[36px] p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition-colors flex items-center justify-center cursor-pointer ml-1 shrink-0"
                aria-label="Close navigation sidebar"
                title="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Navigation List - EXACT SAME SECTIONS, ICONS, BADGES, AND SUBLINKS */}
            <div className="flex-1 overflow-y-auto py-3 px-2.5 space-y-4">
              {sections.map((sec, secIdx) => (
                <div key={secIdx} className="space-y-1">
                  <div className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    {sec.heading}
                  </div>
                  <div className="space-y-0.5">
                    {sec.items.map((item) => {
                      const isActive = activeTab === item.id;
                      const hasSubLinks = item.subLinks && item.subLinks.length > 0;

                      return (
                        <div key={item.id} className="space-y-0.5">
                          <button
                            onClick={() => {
                              onTabChange(item.id);
                              onCloseMobile?.();
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer group ${
                              isActive
                                ? 'bg-[#004b87] text-white font-bold shadow-2xs'
                                : 'text-slate-700 hover:text-[#004b87] hover:bg-slate-100/90'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className={`shrink-0 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-[#004b87]'}`}>
                                {item.icon}
                              </span>
                              <span className="truncate">{item.label}</span>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              {item.badge && (
                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold font-mono ${
                                  item.badge.includes('Risk')
                                    ? 'bg-rose-100 text-rose-800'
                                    : isActive 
                                      ? 'bg-white/20 text-white' 
                                      : 'bg-[#eef4e3] text-[#4c6418]'
                                }`}>
                                  {item.badge}
                                </span>
                              )}
                              {hasSubLinks && (
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${
                                  isActive ? 'rotate-180 text-white/70' : 'text-slate-400 group-hover:text-slate-600'
                                }`} />
                              )}
                            </div>
                          </button>

                          {/* Direct Sub-links for active item */}
                          {hasSubLinks && isActive && (
                            <div className="pl-5 pr-1 py-1 space-y-1 border-l-2 border-[#0068b5]/30 ml-4 animate-in fade-in duration-150">
                              {item.subLinks!.map((sub, sIdx) => {
                                const isSubActive = activeSubTab ? activeSubTab === sub.id : sIdx === 0;
                                return (
                                  <button
                                    key={sub.id}
                                    onClick={() => {
                                      onTabChange(item.id, sub.id);
                                      onCloseMobile?.();
                                    }}
                                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-all flex items-center justify-between gap-1.5 group cursor-pointer ${
                                      isSubActive
                                        ? 'bg-[#0068b5]/10 text-[#004b87] font-bold border border-[#0068b5]/20'
                                        : 'text-slate-600 hover:text-[#004b87] hover:bg-slate-100/80 font-medium'
                                    }`}
                                  >
                                    <div className="flex items-center gap-1.5 min-w-0">
                                      <span
                                        className={`w-1.5 h-1.5 rounded-full transition-colors shrink-0 ${
                                          isSubActive ? 'bg-[#84a433]' : 'bg-slate-300 group-hover:bg-[#0068b5]'
                                        }`}
                                      />
                                      <span className="truncate">{sub.label}</span>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions: Public Portal Return & Technical Blueprint */}
            <div className="p-2.5 border-t border-slate-200 bg-slate-50 space-y-1.5 shrink-0">
              <button
                onClick={() => {
                  onSelectRole('public');
                  onCloseMobile?.();
                }}
                className="w-full flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-[#0b2545] hover:bg-white border border-slate-200 transition-colors cursor-pointer"
                title="Return to Public E-Portal & Admissions Gateway"
              >
                <Home className="w-4 h-4 text-slate-600 shrink-0" />
                <span className="truncate">Public LMS Gateway</span>
              </button>

              <button
                onClick={() => {
                  onSelectRole('architecture');
                  onCloseMobile?.();
                }}
                className="w-full flex items-center justify-between gap-2 p-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-white border border-slate-200 transition-colors cursor-pointer"
                title="Audit & Technical Architecture"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <FolderGit2 className="w-4 h-4 text-amber-700 shrink-0" />
                  <span className="truncate">System Architecture</span>
                </div>
                <span className="text-[10px] bg-slate-200 text-slate-800 px-1.5 py-0.2 rounded font-mono font-bold shrink-0">
                  UOS-20
                </span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
