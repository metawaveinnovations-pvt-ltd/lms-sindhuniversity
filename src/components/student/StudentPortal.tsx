import React, { useState, useEffect } from 'react';
import { 
  CURRENT_STUDENT, 
  MULTI_DEPARTMENT_STUDENTS,
  ENROLLED_COURSES, 
  STUDENT_ASSIGNMENTS, 
  ATTENDANCE_HISTORY, 
  EXAM_SCHEDULE, 
  HISTORICAL_TRANSCRIPT, 
  FEE_CHALLANS 
} from '../../data/mockAcademicData';
import { CourseWeeklyModules } from '../common/CourseWeeklyModules';
import { GpaCalculatorModal } from '../common/GpaCalculatorModal';
import { UniversitySeal } from '../common/UniversitySeal';
import { TimetableMasterEngine } from '../common/TimetableMasterEngine';
import {
  ClassTimetableSlot,
  ExamDatesheetEntry,
  UniversityTimetableSettings
} from '../../data/timetableData';
import { useSwipeNavigation, useAutoScrollActivePill } from '../../hooks/useSwipeNavigation';
import { Course } from '../../types';
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  FileText, 
  Award, 
  CreditCard, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar as CalendarIcon, 
  Download, 
  Printer, 
  Search, 
  QrCode, 
  Upload, 
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Info,
  Calculator,
  ArrowRight,
  Layers,
  HelpCircle,
  ShieldCheck,
  Check,
  X,
  FileCheck2,
  Building2,
  UserCheck,
  Terminal,
  ChevronDown,
  Home,
  MessageSquare,
  FileSpreadsheet,
  CheckSquare,
  Users,
  FolderOpen,
  Filter,
  Eye,
  Mail,
  MapPin,
  Bookmark,
  Share2
} from 'lucide-react';

interface StudentPortalProps {
  initialTab?: string;
  activeTab?: string;
  activeSubTab?: string;
  onTabChange?: (tab: string) => void;
  onSubTabChange?: (sub: string) => void;
  selectedCourseCode?: string;
  onSelectCourseCode?: (code: string) => void;
  selectedStudentId?: string;
  onSelectStudentId?: (id: string) => void;
  onAuditClick: () => void;
  onAddAuditLog: (log: any) => void;
  timetableSlots: ClassTimetableSlot[];
  onUpdateSlots: React.Dispatch<React.SetStateAction<ClassTimetableSlot[]>>;
  examEntries: ExamDatesheetEntry[];
  onUpdateExams: React.Dispatch<React.SetStateAction<ExamDatesheetEntry[]>>;
  timetableSettings: UniversityTimetableSettings;
  onUpdateSettings: React.Dispatch<React.SetStateAction<UniversityTimetableSettings>>;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  initialTab = 'overview',
  activeTab: controlledTab,
  activeSubTab: controlledSubTab,
  onTabChange: setControlledTab,
  onSubTabChange: setControlledSubTab,
  selectedCourseCode: controlledCourseCode,
  onSelectCourseCode: setControlledCourseCode,
  selectedStudentId: controlledStudentId,
  onSelectStudentId: setControlledStudentId,
  onAuditClick,
  onAddAuditLog,
  timetableSlots,
  onUpdateSlots,
  examEntries,
  onUpdateExams,
  timetableSettings,
  onUpdateSettings
}) => {
  const [internalTab, setInternalTab] = useState<string>(initialTab);
  const [internalSubTab, setInternalSubTab] = useState<string>('');
  const rawTab = controlledTab || internalTab;
  const activeTab = rawTab === 'registration' ? 'selection' : rawTab;
  const activeSubTab = controlledSubTab !== undefined ? controlledSubTab : internalSubTab;

  const setActiveTab = (tab: string, sub: string = '') => {
    const normalized = tab === 'registration' ? 'selection' : tab;
    if (setControlledTab) {
      setControlledTab(normalized);
    } else {
      setInternalTab(normalized);
    }
    if (setControlledSubTab) {
      setControlledSubTab(sub);
    } else {
      setInternalSubTab(sub);
    }
  };

  const setSubTab = (sub: string) => {
    if (setControlledSubTab) {
      setControlledSubTab(sub);
    } else {
      setInternalSubTab(sub);
    }
  };

  const [internalStudentId, setInternalStudentId] = useState<string>('std_2k23_swe_104');
  const activeStudentId = controlledStudentId || internalStudentId;
  const setSelectedStudentId = (id: string) => {
    if (setControlledStudentId) {
      setControlledStudentId(id);
    } else {
      setInternalStudentId(id);
    }
  };
  const currentStudent = MULTI_DEPARTMENT_STUDENTS.find(s => s.id === activeStudentId) || CURRENT_STUDENT;

  // Subject Selection Module State (Authentic USindh LMS)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([
    'SWE-401', 'SWE-403', 'SWE-405', 'SWE-407', 'SWE-499', 'CS-411'
  ]);
  const [subjectSelectionSubmitted, setSubjectSelectionSubmitted] = useState<boolean>(false);

  // Mandatory HEC QEC Proforma State (Authentic USindh LMS)
  const [qecProformaSubmitted, setQecProformaSubmitted] = useState<boolean>(false);
  const [qecRatings, setQecRatings] = useState<Record<string, number>>({
    syllabus: 5,
    clarity: 4,
    delivery: 5,
    punctuality: 5,
    fairness: 4,
    interaction: 5
  });

  const [internalCourseCode, setInternalCourseCode] = useState<string>('SWE-401');
  const selectedCourseCode = controlledCourseCode || internalCourseCode;
  const setSelectedCourseCode = (code: string) => {
    if (setControlledCourseCode) {
      setControlledCourseCode(code);
    } else {
      setInternalCourseCode(code);
    }
  };

  // Selected sub-tool inside LUMS/Sakai course workspace
  const [courseTool, setCourseTool] = useState<
    'overview' | 'syllabus' | 'modules' | 'assignments' | 'gradebook' | 'attendance' | 'resources' | 'roster'
  >('modules');

  const courseToolIds = ['modules', 'syllabus', 'assignments', 'gradebook', 'attendance', 'resources', 'roster'] as const;
  const courseToolSwipe = useSwipeNavigation<string>({
    items: [...courseToolIds],
    activeItem: courseTool,
    onSelect: (tool) => setCourseTool(tool as any),
    minSwipeDistance: 40,
    ignoreScrollableChildren: true
  });
  const courseToolScrollRef = useAutoScrollActivePill(courseTool);

  // Course Dashboard Filters (NUST LMS style)
  const [courseSearchQuery, setCourseSearchQuery] = useState('');
  const [courseCategoryFilter, setCourseCategoryFilter] = useState<'All' | 'In Progress' | 'High Attendance' | 'At Risk'>('All');
  const categoryFilterSwipe = useSwipeNavigation<'All' | 'In Progress' | 'High Attendance' | 'At Risk'>({
    items: ['All', 'In Progress', 'High Attendance', 'At Risk'],
    activeItem: courseCategoryFilter,
    onSelect: setCourseCategoryFilter,
    minSwipeDistance: 35
  });

  // Interactive Calendar State (NUST/LUMS style)
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<number>(8); // Oct 8, 2026
  const [timelineTab, setTimelineTab] = useState<'Upcoming' | 'Next30' | 'Overdue'>('Upcoming');

  // Modals state
  const [showAppealModal, setShowAppealModal] = useState<boolean>(false);
  const [showGpaModal, setShowGpaModal] = useState<boolean>(false);
  const [showQrVerificationModal, setShowQrVerificationModal] = useState<boolean>(false);
  const [showOfficeHoursModal, setShowOfficeHoursModal] = useState<boolean>(false);
  const [showCohortMenu, setShowCohortMenu] = useState<boolean>(false);
  const [actionToast, setActionToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setActionToast(msg);
    setTimeout(() => setActionToast(null), 3500);
  };
  const [appealCourse, setAppealCourse] = useState<string>('CS-411');
  const [appealReason, setAppealReason] = useState<string>('');
  const [appealCategory, setAppealCategory] = useState<string>('Medical Emergency');
  const [appealSuccess, setAppealSuccess] = useState<boolean>(false);

  // Fee payment simulator state
  const [payingChallan, setPayingChallan] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [challansList, setChallansList] = useState(FEE_CHALLANS);

  // Assignment submission modal state
  const [submittingAssignmentId, setSubmittingAssignmentId] = useState<string | null>(null);
  const [assignmentsList, setAssignmentsList] = useState(STUDENT_ASSIGNMENTS);
  const [assignmentFilter, setAssignmentFilter] = useState<'All' | 'Pending' | 'Submitted' | 'Graded'>('All');
  const [submissionFile, setSubmissionFile] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Sync sidebar sub-tab selection with internal filters/modals
  useEffect(() => {
    if (activeTab === 'courses' && activeSubTab) {
      const validTools = ['modules', 'syllabus', 'assignments', 'gradebook', 'attendance', 'resources', 'roster'];
      if (validTools.includes(activeSubTab)) {
        setCourseTool(activeSubTab as any);
      }
    }
    if (activeTab === 'assignments') {
      if (activeSubTab === 'pending') setAssignmentFilter('Pending');
      else if (activeSubTab === 'submitted') setAssignmentFilter('Submitted');
      else if (activeSubTab === 'graded') setAssignmentFilter('Graded');
      else setAssignmentFilter('All');
    }
    if (activeTab === 'attendance' && activeSubTab === 'appeal') {
      setShowAppealModal(true);
    }
  }, [activeTab, activeSubTab]);

  // Completed lesson modules checklist state
  const [completedModules, setCompletedModules] = useState<Record<string, boolean>>({
    'mod_1': true,
    'mod_2': true,
    'mod_3': true,
    'mod_4': false,
    'mod_5': false
  });

  const toggleModuleComplete = (modId: string) => {
    setCompletedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  // What-If GPA Simulator state within Results tab
  const [simulatedGrades, setSimulatedGrades] = useState<Record<string, number>>({
    'SWE-401': 4.0, // A
    'SWE-403': 3.67, // A-
    'SWE-405': 3.33, // B+
    'SWE-407': 4.0, // A
    'SWE-499': 3.67, // In Progress / A-
    'CS-411': 3.0 // B
  });

  const handlePayChallan = (challanNo: string) => {
    setPayingChallan(challanNo);
    setTimeout(() => {
      setChallansList(prev => prev.map(c => {
        if (c.challanNumber === challanNo) {
          return {
            ...c,
            status: 'Paid',
            transactionReference: '1LINK-HBL-' + Math.floor(10000000 + Math.random() * 90000000),
            paymentDate: new Date().toISOString().split('T')[0],
            receiptNumber: 'REC-UOS-' + Math.floor(10000 + Math.random() * 90000)
          };
        }
        return c;
      }));

      onAddAuditLog({
        id: 'log_' + Date.now().toString().slice(-4),
        who: 'Ali Hassan Chand (Student: 2K23/SWE/104)',
        role: 'Student',
        what: 'Online Fee Payment Settled via 1Link Sandbox',
        category: 'Finance',
        when: new Date().toLocaleString() + ' PKT',
        whereIp: '192.168.1.104 (Authenticated Session)',
        objectTarget: `Challan: ${challanNo}`,
        beforeState: 'Status: Unpaid',
        afterState: 'Status: Paid, Bank Verified: True',
        reason: 'Semester 7 Examination Fee Clearance',
        referenceId: 'TXN-1LINK-AUTO-' + Date.now().toString().slice(-6)
      });

      setPaymentSuccess(true);
      setPayingChallan(null);
      setTimeout(() => {
        setPaymentSuccess(false);
      }, 3000);
    }, 1200);
  };

  const handleSubmitAssignment = (asgId: string) => {
    setIsUploading(true);
    setTimeout(() => {
      setAssignmentsList(prev => prev.map(a => {
        if (a.id === asgId) {
          return {
            ...a,
            status: 'Submitted',
            submissionDate: new Date().toISOString().split('T')[0],
            fileAttachment: submissionFile || 'Ali_Hassan_2K23_SWE_104_Assessment.pdf'
          };
        }
        return a;
      }));

      onAddAuditLog({
        id: 'log_' + Date.now().toString().slice(-4),
        who: 'Ali Hassan Chand (Student: 2K23/SWE/104)',
        role: 'Student',
        what: 'Assignment Submission Uploaded (Turnitin Similarity Checked)',
        category: 'Academic',
        when: new Date().toLocaleString() + ' PKT',
        whereIp: '192.168.1.104 (Authenticated Session)',
        objectTarget: `Assignment: ${asgId}`,
        beforeState: 'Status: Pending',
        afterState: 'Status: Submitted (Turnitin: 2.1% Similarity)',
        reason: 'Continuous Assessment Submission',
        referenceId: 'ASG-SUB-' + Date.now().toString().slice(-6)
      });

      setIsUploading(false);
      setSubmittingAssignmentId(null);
      setSubmissionFile('');
    }, 1000);
  };

  const handleSendAppeal = (e: React.FormEvent) => {
    e.preventDefault();
    setAppealSuccess(true);

    onAddAuditLog({
      id: 'log_' + Date.now().toString().slice(-4),
      who: 'Ali Hassan Chand (Student: 2K23/SWE/104)',
      role: 'Student',
      what: 'Statutory 75% Attendance Shortage Representation Filed',
      category: 'Attendance',
      when: new Date().toLocaleString() + ' PKT',
      whereIp: '192.168.1.104 (Authenticated Session)',
      objectTarget: `Course: ${appealCourse}`,
      beforeState: 'Attendance: 73% (Ineligible for Examination Hall Slip)',
      afterState: 'Formal Appeal Under Review with Course Instructor & HOD',
      reason: `Category: ${appealCategory} — ${appealReason || 'Clinical Medical Representation'}`,
      referenceId: 'ATT-APL-' + Date.now().toString().slice(-6)
    });

    setTimeout(() => {
      setShowAppealModal(false);
      setAppealSuccess(false);
      setAppealReason('');
    }, 1500);
  };

  const selectedCourse = ENROLLED_COURSES.find(c => c.code === selectedCourseCode) || ENROLLED_COURSES[0];

  // What-if GPA projections
  const totalCompletedCredits = CURRENT_STUDENT.completedCredits;
  const currentTotalQualityPoints = CURRENT_STUDENT.cgpa * totalCompletedCredits;
  const currentSemesterCredits = ENROLLED_COURSES.reduce((acc, c) => acc + c.creditHours, 0);
  const simulatedSemesterQualityPoints = ENROLLED_COURSES.reduce((acc, c) => {
    const gp = simulatedGrades[c.code] ?? 3.67;
    return acc + (gp * c.creditHours);
  }, 0);
  const simulatedSemesterGpa = Number((simulatedSemesterQualityPoints / currentSemesterCredits).toFixed(2));
  const projectedGraduationCgpa = Number(((currentTotalQualityPoints + simulatedSemesterQualityPoints) / (totalCompletedCredits + currentSemesterCredits)).toFixed(2));

  // Filter courses on dashboard
  const filteredCourses = ENROLLED_COURSES.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(courseSearchQuery.toLowerCase()) || 
                        c.code.toLowerCase().includes(courseSearchQuery.toLowerCase()) || 
                        c.instructor.toLowerCase().includes(courseSearchQuery.toLowerCase());
    if (!matchSearch) return false;
    if (courseCategoryFilter === 'High Attendance') return c.attendancePercent >= 90;
    if (courseCategoryFilter === 'At Risk') return c.attendancePercent < 75;
    return true;
  });

  const filteredAssignments = assignmentsList.filter(a => {
    if (assignmentFilter === 'All') return true;
    return a.status === assignmentFilter;
  });

  // Calendar dates with events
  const calendarEventDates = [5, 8, 12, 15, 19, 22, 26, 29];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3.5 sm:py-5 space-y-4 sm:space-y-5">
      {/* Non-blocking In-App Action Toast */}
      {actionToast && (
        <div className="fixed bottom-16 lg:bottom-6 right-4 left-4 sm:left-auto z-50 bg-[#004b87] text-white px-4 py-3 rounded-2xl shadow-2xl border border-[#84a433] flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center gap-2.5 min-w-0">
            <CheckCircle2 className="w-4 h-4 text-[#c8e27b] shrink-0" />
            <span className="text-xs font-semibold truncate">{actionToast}</span>
          </div>
          <button
            onClick={() => setActionToast(null)}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-200 cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* =========================================================
          EXECUTIVE ACADEMIC PASSPORT STRIP (MOBILE & DESKTOP)
         ========================================================= */}
      <div className="bg-white border border-[#d8dadb] rounded-2xl shadow-2xs overflow-hidden no-print">
        <div className="p-3.5 sm:px-5 sm:py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3.5 border-b border-slate-100 bg-gradient-to-r from-[#004b87]/5 via-white to-[#84a433]/5">
          <div className="flex items-start sm:items-center gap-3">
            <div className="relative shrink-0">
              <img
                src={currentStudent.avatarUrl}
                alt={currentStudent.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl object-cover border-2 border-[#0068b5]/30 shadow-2xs"
              />
              <span 
                className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#007a33] border-2 border-white rounded-full" 
                title="Active Enrolled Student"
              />
            </div>

            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h1 className="text-sm sm:text-lg font-extrabold text-[#004b87] tracking-tight leading-tight truncate">
                  {currentStudent.name}
                </h1>
                <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#0068b5]/10 text-[#004b87] border border-[#0068b5]/25">
                  {currentStudent.rollNumber}
                </span>

                {/* Tap-Friendly Department & Batch Cohort Selector */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCohortMenu(!showCohortMenu)}
                    className="min-h-[30px] px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white border border-[#d8dadb] text-[#004b87] hover:border-[#0068b5] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    title="Switch Department & Cohort Batch"
                  >
                    <Building2 className="w-3.5 h-3.5 text-[#0068b5] shrink-0" />
                    <span className="truncate max-w-[150px] sm:max-w-none">
                      {currentStudent.department.replace('Department of ', '').replace('Institute of ', '')} · {currentStudent.batch.split(' ')[0]}
                    </span>
                    <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${showCohortMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showCohortMenu && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowCohortMenu(false)} />
                      <div className="absolute left-0 mt-1.5 w-76 max-w-[calc(100vw-2rem)] bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in duration-100">
                        <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1 flex items-center justify-between font-mono">
                          <span>Switch Student Cohort</span>
                          <span className="text-[9px] text-[#0068b5] font-bold">4 Batches</span>
                        </div>
                        {MULTI_DEPARTMENT_STUDENTS.map(std => {
                          const isSelected = std.id === activeStudentId;
                          return (
                            <button
                              key={std.id}
                              onClick={() => {
                                setSelectedStudentId(std.id);
                                setShowCohortMenu(false);
                              }}
                              className={`w-full text-left p-2.5 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-between ${
                                isSelected ? 'bg-[#0068b5]/10 text-[#004b87] font-bold border border-[#0068b5]/30' : 'hover:bg-slate-50 text-slate-700'
                              }`}
                            >
                              <div className="min-w-0">
                                <div className="font-bold text-slate-900 truncate">{std.name} · <span className="font-mono text-slate-500 font-normal">{std.rollNumber}</span></div>
                                <div className="text-[10px] text-slate-500 truncate">{std.department}</div>
                                <div className="text-[10px] text-[#4c6418] font-semibold">{std.batch} · Sem {std.semester}</div>
                              </div>
                              {isSelected && <span className="w-2 h-2 rounded-full bg-[#84a433] shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-600 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span className="font-semibold text-slate-800 truncate">{currentStudent.program}</span>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <span className="text-slate-500">Semester {currentStudent.semester} (Fall 2026)</span>
                <span className="text-slate-300 hidden sm:inline" aria-hidden="true">·</span>
                <span className="font-semibold text-[#007a33] hidden sm:inline">Cohort: {currentStudent.batch}</span>
              </div>
            </div>
          </div>

          {/* Quick Snapshot Metrics — 4-Column Responsive Grid on Mobile, Inline on Desktop */}
          <div className="grid grid-cols-4 md:flex items-center gap-2 md:gap-4 pt-2.5 md:pt-0 border-t md:border-t-0 border-slate-200/70 text-xs font-mono shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('results')}
              className="p-2 md:p-0 rounded-xl bg-[#f4f6f8] md:bg-transparent text-center md:text-right cursor-pointer hover:opacity-80 transition-opacity"
              title="Tap to view transcript & GPA simulator"
            >
              <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase font-sans block">CGPA</span>
              <strong className="text-sm sm:text-base font-black text-[#004b87] tabular-nums">{currentStudent.cgpa}</strong>
            </button>
            <div className="hidden md:block h-7 w-px bg-slate-200" />
            <button
              type="button"
              onClick={() => setActiveTab('attendance')}
              className="p-2 md:p-0 rounded-xl bg-[#f4f6f8] md:bg-transparent text-center md:text-right cursor-pointer hover:opacity-80 transition-opacity"
              title="Tap to view 75% attendance register"
            >
              <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase font-sans block">Attend</span>
              <strong className="text-sm sm:text-base font-black text-[#007a33] tabular-nums">88%</strong>
            </button>
            <div className="hidden md:block h-7 w-px bg-slate-200" />
            <button
              type="button"
              onClick={() => setActiveTab('courses')}
              className="p-2 md:p-0 rounded-xl bg-[#f4f6f8] md:bg-transparent text-center md:text-right cursor-pointer hover:opacity-80 transition-opacity"
              title="Tap to view credits"
            >
              <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase font-sans block">Credits</span>
              <strong className="text-sm sm:text-base font-black text-slate-900 tabular-nums">{currentStudent.completedCredits}</strong>
              <span className="text-[9px] text-slate-400 font-sans hidden sm:inline">/{currentStudent.totalCredits}</span>
            </button>
            <div className="hidden md:block h-7 w-px bg-slate-200" />
            <button
              type="button"
              onClick={() => setActiveTab('fees')}
              className="p-2 md:p-0 rounded-xl bg-amber-50/80 md:bg-transparent text-center md:text-right cursor-pointer hover:opacity-80 transition-opacity"
              title="Tap to view 1Link Fee ledger"
            >
              <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase font-sans block">1Link Fee</span>
              <strong className="text-[11px] sm:text-xs font-bold text-[#9e6338] font-sans">1 Due</strong>
            </button>
          </div>
        </div>

        {/* Academic Tab Context Bar */}
        <div className="px-3.5 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between gap-2 bg-white">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-1.5 sm:p-2 rounded-xl bg-[#0068b5]/10 text-[#004b87] shrink-0">
              {activeTab === 'overview' && <Home className="w-4 h-4" />}
              {activeTab === 'courses' && <BookOpen className="w-4 h-4" />}
              {activeTab === 'selection' && <CheckSquare className="w-4 h-4" />}
              {activeTab === 'timetable' && <CalendarIcon className="w-4 h-4" />}
              {activeTab === 'attendance' && <Clock className="w-4 h-4" />}
              {activeTab === 'assignments' && <FileText className="w-4 h-4" />}
              {activeTab === 'exams' && <Award className="w-4 h-4" />}
              {activeTab === 'results' && <GraduationCap className="w-4 h-4" />}
              {activeTab === 'fees' && <CreditCard className="w-4 h-4" />}
              {activeTab === 'proforma' && <FileCheck2 className="w-4 h-4" />}
              {activeTab === 'profile' && <UserCheck className="w-4 h-4" />}
            </div>
            <div className="min-w-0">
              <h2 className="text-xs sm:text-base font-bold text-slate-900 leading-tight truncate">
                {activeTab === 'overview' && 'Student Dashboard & Enrolled Courses'}
                {activeTab === 'courses' && 'Course Learning Workspace'}
                {activeTab === 'selection' && 'Online Subject Selection'}
                {activeTab === 'timetable' && 'Departmental Classes Timetable & Midterm/Final Datesheet'}
                {activeTab === 'attendance' && '75% Mandatory Attendance Register'}
                {activeTab === 'assignments' && 'Assignments & Lab Deliverables'}
                {activeTab === 'exams' && 'QR Examination Admit Slip'}
                {activeTab === 'results' && 'Academic Transcript & CGPA'}
                {activeTab === 'fees' && '1Link Digital Fee Challans'}
                {activeTab === 'proforma' && 'HEC QEC Evaluation Proforma'}
                {activeTab === 'profile' && 'Smart Campus ID Card'}
              </h2>
              <p className="text-[10px] sm:text-[11px] text-slate-500 truncate hidden sm:block">
                Allama II Qazi Campus · {currentStudent.department} · Fall 2026
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowGpaModal(true)}
            className="min-h-[34px] px-2.5 sm:px-3 py-1.5 bg-[#f4f6f8] hover:bg-[#0068b5] text-[#004b87] hover:text-white border border-[#d8dadb] rounded-xl text-[11px] sm:text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shrink-0"
          >
            <Calculator className="w-3.5 h-3.5 shrink-0" />
            <span>GPA Calc</span>
          </button>
        </div>

        {/* Desktop Quick Module Navigation Strip */}
        <div className="hidden lg:flex px-5 border-t border-slate-100 items-center gap-1 overflow-x-auto no-scrollbar text-xs font-semibold bg-slate-50/70">
          {[
            { id: 'overview', label: 'Dashboard', icon: <Home className="w-3.5 h-3.5" /> },
            { id: 'courses', label: 'My Courses (6)', icon: <BookOpen className="w-3.5 h-3.5" /> },
            { id: 'selection', label: 'Subject Selection', icon: <CheckSquare className="w-3.5 h-3.5" /> },
            { id: 'timetable', label: 'Class & Exam Timetable', icon: <CalendarIcon className="w-3.5 h-3.5" /> },
            { id: 'attendance', label: 'Attendance (75%)', icon: <Clock className="w-3.5 h-3.5" /> },
            { id: 'assignments', label: 'Assignments', icon: <FileText className="w-3.5 h-3.5" /> },
            { id: 'exams', label: 'QR Admit Slip', icon: <Award className="w-3.5 h-3.5" /> },
            { id: 'results', label: 'Transcript & GPA', icon: <GraduationCap className="w-3.5 h-3.5" /> },
            { id: 'proforma', label: 'QEC Proforma', icon: <FileCheck2 className="w-3.5 h-3.5" /> },
            { id: 'fees', label: '1Link Challans', icon: <CreditCard className="w-3.5 h-3.5" /> },
            { id: 'profile', label: 'Smart ID Card', icon: <UserCheck className="w-3.5 h-3.5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#004b87] text-[#004b87] font-bold bg-white/80'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================
          TAB 1: DASHBOARD & COURSE OVERVIEW (NUST & LUMS BENCHMARK)
         ========================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-4 sm:space-y-5">
          {/* 1-Tap High-Engagement Student Quick Actions (Mobile-First Convenience) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
            <button
              onClick={() => setActiveTab('attendance')}
              className="p-3 sm:p-3.5 rounded-2xl bg-white border border-[#d8dadb] hover:border-[#0068b5] shadow-2xs text-left flex items-center justify-between gap-2 transition-all cursor-pointer group"
            >
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase font-bold text-[#007a33] block">75% Rule Status</span>
                <div className="text-xs sm:text-sm font-extrabold text-slate-900 truncate mt-0.5">88% Attendance</div>
                <span className="text-[10px] text-slate-500 block truncate">1 Alert (CS-411)</span>
              </div>
              <div className="p-2 rounded-xl bg-[#eef4e3] text-[#4c6418] group-hover:bg-[#84a433] group-hover:text-white transition-colors shrink-0">
                <Clock className="w-4 h-4" />
              </div>
            </button>

            <button
              onClick={() => setActiveTab('exams')}
              className="p-3 sm:p-3.5 rounded-2xl bg-white border border-[#d8dadb] hover:border-[#0068b5] shadow-2xs text-left flex items-center justify-between gap-2 transition-all cursor-pointer group"
            >
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase font-bold text-[#0068b5] block">Exam Controller</span>
                <div className="text-xs sm:text-sm font-extrabold text-slate-900 truncate mt-0.5">QR Admit Slip</div>
                <span className="text-[10px] text-slate-500 block truncate">Fall 2026 Ready</span>
              </div>
              <div className="p-2 rounded-xl bg-blue-50 text-[#0068b5] group-hover:bg-[#0068b5] group-hover:text-white transition-colors shrink-0">
                <QrCode className="w-4 h-4" />
              </div>
            </button>

            <button
              onClick={() => setActiveTab('fees')}
              className="p-3 sm:p-3.5 rounded-2xl bg-white border border-[#d8dadb] hover:border-[#0068b5] shadow-2xs text-left flex items-center justify-between gap-2 transition-all cursor-pointer group"
            >
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase font-bold text-[#9e6338] block">1Link Challan</span>
                <div className="text-xs sm:text-sm font-extrabold text-slate-900 truncate mt-0.5">PKR 4,500 Due</div>
                <span className="text-[10px] text-slate-500 block truncate">Pay Online Instant</span>
              </div>
              <div className="p-2 rounded-xl bg-amber-50 text-[#9e6338] group-hover:bg-[#9e6338] group-hover:text-white transition-colors shrink-0">
                <CreditCard className="w-4 h-4" />
              </div>
            </button>

            <button
              onClick={() => setActiveTab('assignments')}
              className="p-3 sm:p-3.5 rounded-2xl bg-white border border-[#d8dadb] hover:border-[#0068b5] shadow-2xs text-left flex items-center justify-between gap-2 transition-all cursor-pointer group"
            >
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase font-bold text-[#004b87] block">Course Tasks</span>
                <div className="text-xs sm:text-sm font-extrabold text-slate-900 truncate mt-0.5">2 Pending Labs</div>
                <span className="text-[10px] text-slate-500 block truncate">Upload Deliverable</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-100 text-[#004b87] group-hover:bg-[#004b87] group-hover:text-white transition-colors shrink-0">
                <Upload className="w-4 h-4" />
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left Column (8 cols): Course Cards Grid + Search/Filter Bar */}
            <div className="lg:col-span-8 space-y-4">
              {/* Course Filter & Search Bar */}
              <div className="bg-white border border-[#d8dadb] rounded-2xl p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-2xs">
                <div className="flex items-center gap-2 flex-1">
                  <Search className="w-4 h-4 text-[#0068b5] shrink-0" />
                  <input
                    type="text"
                    placeholder="Filter courses by title, code, or instructor..."
                    value={courseSearchQuery}
                    onChange={(e) => setCourseSearchQuery(e.target.value)}
                    className="w-full text-xs text-slate-800 placeholder:text-slate-400 bg-transparent outline-hidden"
                  />
                </div>

                <div
                  onTouchStart={categoryFilterSwipe.onTouchStart}
                  onTouchEnd={categoryFilterSwipe.onTouchEnd}
                  className="flex items-center gap-1 overflow-x-auto no-scrollbar shrink-0 text-xs border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 select-none"
                >
                  {(['All', 'In Progress', 'High Attendance', 'At Risk'] as const).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCourseCategoryFilter(cat)}
                      className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer text-[11px] font-semibold whitespace-nowrap ${
                        courseCategoryFilter === cat
                          ? 'bg-[#0068b5] text-white font-bold'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Modern Course Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                {filteredCourses.map((course) => {
                  const isShortage = course.attendancePercent < 75;
                  return (
                    <div
                      key={course.code}
                      className="bg-white border border-[#d8dadb] rounded-2xl overflow-hidden hover:border-[#0068b5] hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      {/* Course Card Header Banner */}
                      <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#004b87] to-[#0068b5] text-white relative overflow-hidden">
                        <div className="absolute right-0 top-0 bottom-0 w-28 opacity-10 pointer-events-none flex items-center justify-center">
                          <BookOpen className="w-20 h-20 text-white" />
                        </div>

                        <div className="relative z-10 space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono font-bold text-[#c8e27b] bg-black/20 px-2 py-0.5 rounded text-[11px]">
                              {course.code}
                            </span>
                            <span className="text-[11px] text-slate-100 font-mono">
                              {course.creditHours} Cr. Hrs
                            </span>
                          </div>
                          <h3 className="font-bold text-sm text-white line-clamp-1 group-hover:text-[#c8e27b] transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-[11px] text-slate-200 truncate">
                            {course.instructor}
                          </p>
                        </div>
                      </div>

                    {/* Course Card Body */}
                    <div className="p-4 space-y-3.5 text-xs flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-slate-600">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{course.schedule}</span>
                          </span>
                        </div>

                        {/* Progress Bar (Modules Completed) */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[10px] text-slate-500">
                            <span>Syllabus Progress</span>
                            <span className="font-mono font-bold text-slate-800">
                              {Math.round((course.materialsCount / 14) * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-700 rounded-full" 
                              style={{ width: `${Math.min(100, (course.materialsCount / 14) * 100)}%` }} 
                            />
                          </div>
                        </div>

                        {/* Attendance Indicator */}
                        <div className="flex items-center justify-between text-[11px] pt-1">
                          <span className="text-slate-500">Attendance:</span>
                          <span className={`font-mono font-bold flex items-center gap-1 ${
                            isShortage ? 'text-rose-700' : 'text-emerald-700'
                          }`}>
                            {isShortage ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                            <span>{course.attendancePercent}% ({isShortage ? 'Debarment Risk' : 'Eligible'})</span>
                          </span>
                        </div>
                      </div>

                      {/* 4 Direct Action Buttons (NUST/LUMS Standard) */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => {
                            setSelectedCourseCode(course.code);
                            setCourseTool('modules');
                            setActiveTab('courses');
                          }}
                          className="min-h-[36px] px-3 py-1.5 bg-[#0068b5] hover:bg-[#004b87] text-white rounded-xl font-bold text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span>Open Course</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>

                        <div className="flex items-center gap-1 text-[11px]">
                          <button
                            onClick={() => {
                              setSelectedCourseCode(course.code);
                              setCourseTool('syllabus');
                              setActiveTab('courses');
                            }}
                            className="min-h-[34px] px-2.5 py-1 text-slate-600 hover:text-[#004b87] hover:bg-slate-100 rounded-lg font-medium cursor-pointer"
                            title="Course Syllabus"
                          >
                            Syllabus
                          </button>
                          <button
                            onClick={() => {
                              setSelectedCourseCode(course.code);
                              setCourseTool('gradebook');
                              setActiveTab('courses');
                            }}
                            className="min-h-[34px] px-2.5 py-1 text-slate-600 hover:text-[#004b87] hover:bg-slate-100 rounded-lg font-medium cursor-pointer"
                            title="Course Gradebook & OBE"
                          >
                            Grades
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (4 cols): LUMS/NUST Timeline & Academic Calendar Widgets */}
          <div className="lg:col-span-4 space-y-4">
            {/* Interactive Academic Mini-Calendar Widget (NUST/LUMS Style) */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <CalendarIcon className="w-4 h-4 text-blue-700" />
                  <span>October 2026</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Jamshoro Academic Calendar</span>
              </div>

              {/* Calendar Grid */}
              <div className="text-center text-xs">
                <div className="grid grid-cols-7 text-[10px] font-bold text-slate-400 mb-1">
                  <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-[11px] font-mono">
                  {/* Empty offset for October 2026 starting on Thursday */}
                  <span className="p-1 text-slate-300"></span>
                  <span className="p-1 text-slate-300"></span>
                  <span className="p-1 text-slate-300"></span>
                  <span className="p-1 text-slate-300"></span>
                  
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                    const isSelected = selectedCalendarDate === day;
                    const isToday = day === 8;
                    const hasEvent = calendarEventDates.includes(day);

                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedCalendarDate(day)}
                        className={`p-1 rounded-md text-center transition-colors relative cursor-pointer ${
                          isSelected
                            ? 'bg-[#0b2545] text-white font-bold'
                            : isToday
                            ? 'bg-blue-100 text-blue-900 font-bold'
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <span>{day}</span>
                        {hasEvent && !isSelected && (
                          <span className="block mx-auto w-1 h-1 bg-amber-500 rounded-full mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Day Agenda preview */}
              <div className="pt-2 border-t border-slate-100 text-xs space-y-1.5">
                <div className="font-bold text-slate-900 text-[11px] flex items-center justify-between">
                  <span>Agenda for Oct {selectedCalendarDate}, 2026:</span>
                  {selectedCalendarDate === 8 && (
                    <span className="text-emerald-700 font-normal">● Today Active</span>
                  )}
                </div>
                {selectedCalendarDate === 8 ? (
                  <div className="space-y-1 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <div><strong>09:00 AM:</strong> SWE-401 Lecture (Lab 03)</div>
                    <div><strong>11:00 AM:</strong> SWE-405 Lecture (Network Lab)</div>
                    <div><strong>11:59 PM:</strong> SWE-401 Lab 03 Task Due</div>
                  </div>
                ) : calendarEventDates.includes(selectedCalendarDate) ? (
                  <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200">
                    Scheduled academic activity on this day. Check syllabus for session details.
                  </div>
                ) : (
                  <div className="text-[11px] text-slate-400 italic">No scheduled deliverables on this date.</div>
                )}
              </div>
            </div>

            {/* Timeline / Deadlines Hub (NUST LMS Benchmark) */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>Timeline & Deadlines</span>
                </div>
                <div className="flex items-center gap-1 text-[10px]">
                  {(['Upcoming', 'Next30', 'Overdue'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setTimelineTab(tab)}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        timelineTab === tab ? 'bg-slate-200 font-bold text-slate-900' : 'text-slate-500'
                      }`}
                    >
                      {tab === 'Upcoming' ? '7 Days' : tab === 'Next30' ? '30 Days' : 'Overdue'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5">
                {assignmentsList.slice(0, 3).map(asg => (
                  <div key={asg.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
                    <div className="flex items-center justify-between font-mono">
                      <span className="font-bold text-[#0b2545]">{asg.courseCode}</span>
                      <span className="text-[10px] text-amber-800 font-semibold">Due: {asg.dueDate}</span>
                    </div>
                    <div className="font-semibold text-slate-900 line-clamp-1">{asg.title}</div>
                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="text-slate-500">{asg.totalMarks} Marks · Weight: 10%</span>
                      <button
                        onClick={() => {
                          setSubmittingAssignmentId(asg.id);
                        }}
                        className="text-blue-700 hover:text-blue-900 font-bold cursor-pointer"
                      >
                        Submit File →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Institutional Circular Bulletin (LUMS Style) */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-2xs text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-700" />
                  <span>Examination Notice</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                  Active
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Admit slips for Fall 2026 Examination are generated with verifiable QR signatures. Please ensure all 1Link dues are settled before Oct 30.
              </p>
              <button
                onClick={() => setActiveTab('exams')}
                className="w-full py-2.5 bg-[#0068b5] hover:bg-[#004b87] text-white font-bold rounded-xl transition-colors cursor-pointer text-center"
              >
                Inspect Official Hall Slip
              </button>
            </div>
          </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 1B: STUDENT CLASS & EXAM TIMETABLE (CONTROLLED BY CHAIRMAN/HOD)
         ========================================================= */}
      {activeTab === 'timetable' && (
        <TimetableMasterEngine
          role="student"
          canManage={false}
          initialDeptId={
            currentStudent.department.includes('Information Tech') ? 'dept_it' :
            currentStudent.department.includes('Data Science') ? 'dept_ds' :
            currentStudent.department.includes('Computer Science') ? 'dept_cs' :
            currentStudent.department.includes('Physics') ? 'dept_phy' :
            currentStudent.department.includes('Business') ? 'dept_iba' :
            currentStudent.department.includes('English') ? 'dept_eng' : 'dept_swe'
          }
          initialPart="P-II"
          initialSemester={2}
          activeSubView={activeSubTab || 'classes'}
          onSubViewChange={setSubTab}
          slots={timetableSlots}
          onUpdateSlots={onUpdateSlots}
          examEntries={examEntries}
          onUpdateExams={onUpdateExams}
          settings={timetableSettings}
          onUpdateSettings={onUpdateSettings}
          onAddAuditLog={onAddAuditLog}
        />
      )}

      {/* =========================================================
          TAB 2: LUMS SAKAI DEDICATED COURSE LEARNING WORKSPACE
         ========================================================= */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          {/* Course Banner (Top Header of Course Workspace) */}
          <div className="bg-white border border-[#d8dadb] rounded-2xl overflow-hidden shadow-2xs">
            <div className="p-4 sm:p-6 bg-gradient-to-r from-[#004b87] via-[#005a9e] to-[#0068b5] text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-white bg-[#84a433] px-2.5 py-0.5 rounded-md">
                    {selectedCourse.code}
                  </span>
                  <span className="text-xs text-slate-100">
                    Semester 7 Core · {selectedCourse.creditHours} Credit Hours
                  </span>
                </div>
                <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                  {selectedCourse.title}
                </h2>
                <div className="text-xs text-slate-200 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>Instructor: <strong className="text-white">{selectedCourse.instructor}</strong></span>
                  <span className="text-white/40" aria-hidden="true">·</span>
                  <span>{selectedCourse.schedule}</span>
                  <span className="text-white/40" aria-hidden="true">·</span>
                  <span>{selectedCourse.classroom}</span>
                </div>
              </div>

              {/* Quick Instructor Actions */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowOfficeHoursModal(true)}
                  className="min-h-[38px] px-3 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Office Hours</span>
                </button>
                <button
                  onClick={() => triggerToast(`Full syllabus & lecture pack for ${selectedCourse.code} downloaded (.ZIP).`)}
                  className="min-h-[38px] px-3.5 py-2 bg-[#84a433] hover:bg-[#739129] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Course Pack</span>
                </button>
              </div>
            </div>
          </div>

          {/* Two-Pane Architecture: Horizontal Swipeable Pill Bar on Mobile + Left Sidebar on Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
            {/* Course Tool Navigation Palette */}
            <aside
              onTouchStart={courseToolSwipe.onTouchStart}
              onTouchEnd={courseToolSwipe.onTouchEnd}
              className="lg:col-span-3 bg-white border border-[#d8dadb] rounded-2xl p-2 lg:p-2.5 lg:space-y-1 h-fit shadow-2xs select-none"
            >
              <div className="hidden lg:block px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                Course Tools
              </div>

              <div
                ref={courseToolScrollRef}
                className="flex lg:flex-col items-center lg:items-stretch gap-1.5 lg:gap-1 overflow-x-auto no-scrollbar"
              >
                {[
                  { id: 'modules', label: 'Lessons (1–16)', icon: <BookOpen className="w-4 h-4 shrink-0" /> },
                  { id: 'syllabus', label: 'Syllabus & OBE', icon: <FileText className="w-4 h-4 shrink-0" /> },
                  { id: 'assignments', label: 'Assignments', icon: <CheckSquare className="w-4 h-4 shrink-0" />, count: selectedCourse.assignmentsCount },
                  { id: 'gradebook', label: 'Gradebook', icon: <FileSpreadsheet className="w-4 h-4 shrink-0" /> },
                  { id: 'attendance', label: 'Attendance', icon: <Clock className="w-4 h-4 shrink-0" /> },
                  { id: 'resources', label: 'Resources', icon: <FolderOpen className="w-4 h-4 shrink-0" />, count: selectedCourse.materialsCount },
                  { id: 'roster', label: 'Class Roster', icon: <Users className="w-4 h-4 shrink-0" /> }
                ].map(tool => {
                  const isCurrent = courseTool === tool.id;
                  return (
                    <button
                      key={tool.id}
                      data-nav-id={tool.id}
                      onClick={() => setCourseTool(tool.id as any)}
                      className={`min-h-[38px] lg:w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-[#0068b5] text-white shadow-2xs font-bold'
                          : 'bg-[#f4f6f8] lg:bg-transparent text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {tool.icon}
                        <span>{tool.label}</span>
                      </div>
                      {tool.count !== undefined && (
                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                          isCurrent ? 'bg-white/20 text-white' : 'bg-white lg:bg-slate-100 text-slate-600'
                        }`}>
                          {tool.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Right Main Tool Viewport (Supports Swipe Left/Right Between Course Tools) */}
            <main
              onTouchStart={courseToolSwipe.onTouchStart}
              onTouchEnd={courseToolSwipe.onTouchEnd}
              className="lg:col-span-9 bg-white border border-[#d8dadb] rounded-2xl p-4 sm:p-6 space-y-5 shadow-2xs min-h-[420px]"
            >
              {/* TOOL: LESSONS & MODULES */}
              {courseTool === 'modules' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Weekly Lessons & Lecture Modules</h3>
                      <p className="text-xs text-slate-500">
                        Progress through syllabus milestones. Check items as completed to track readiness.
                      </p>
                    </div>
                    <span className="text-xs font-mono text-slate-600 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">
                      16-Week Academic Plan
                    </span>
                  </div>

                  {/* Modules Accordion Component */}
                  <CourseWeeklyModules course={selectedCourse} />
                </div>
              )}

              {/* TOOL: SYLLABUS & OUTCOMES */}
              {courseTool === 'syllabus' && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-base font-bold text-slate-900">Course Syllabus & Description</h3>
                    <p className="text-xs text-slate-500">Official curriculum approved by the Board of Studies, University of Sindh.</p>
                  </div>

                  <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <h4 className="font-bold text-slate-900 text-xs mb-1 uppercase tracking-wider text-blue-900">
                        Course Overview & Scope
                      </h4>
                      <p>{selectedCourse.syllabus}</p>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                      <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-blue-900">
                        Outcome-Based Education (OBE) Learning Outcomes (CLOs)
                      </h4>
                      <div className="space-y-1.5 font-sans">
                        <div className="flex items-start gap-2">
                          <span className="font-mono font-bold text-blue-700 shrink-0">CLO-1:</span>
                          <span>Analyze enterprise business requirements and formalize microservices architectural boundaries (Bloom's Taxonomy: C4 - Analysis).</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-mono font-bold text-blue-700 shrink-0">CLO-2:</span>
                          <span>Design scalable distributed software systems adhering to Clean Architecture & DDD principles (Bloom's Taxonomy: C5 - Synthesis).</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-mono font-bold text-blue-700 shrink-0">CLO-3:</span>
                          <span>Conduct automated regression testing and architectural compliance audits in continuous integration pipelines (Bloom's Taxonomy: C5 - Evaluation).</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <h4 className="font-bold text-slate-900 text-xs mb-1 uppercase tracking-wider text-blue-900">
                        Recommended Textbooks & References
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-slate-600">
                        <li>Software Architecture in Practice (4th Edition) — Len Bass, Paul Clements, Rick Kazman</li>
                        <li>Clean Architecture: A Craftsman's Guide to Software Structure — Robert C. Martin</li>
                        <li>Designing Data-Intensive Applications — Martin Kleppmann (O'Reilly)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* TOOL: ASSIGNMENTS */}
              {courseTool === 'assignments' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Course Assignments & Lab Tasks</h3>
                      <p className="text-xs text-slate-500">Deliverables assigned for {selectedCourse.code}.</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {assignmentsList
                      .filter(a => a.courseCode === selectedCourse.code)
                      .map(asg => (
                        <div key={asg.id} className="p-4 border border-slate-200 rounded-xl space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-slate-900 text-sm">{asg.title}</h4>
                            <span className={`px-2 py-0.5 rounded font-bold ${
                              asg.status === 'Graded' ? 'bg-emerald-100 text-emerald-800' :
                              asg.status === 'Submitted' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {asg.status}
                            </span>
                          </div>
                          <p className="text-slate-600 leading-relaxed">{asg.description}</p>
                          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                            <span className="text-slate-400 font-mono">Due: {asg.dueDate} · {asg.totalMarks} Marks</span>
                            {asg.status === 'Pending' ? (
                              <button
                                onClick={() => setSubmittingAssignmentId(asg.id)}
                                className="px-3 py-1 bg-[#0b2545] hover:bg-blue-900 text-white rounded font-bold cursor-pointer"
                              >
                                Submit Assignment
                              </button>
                            ) : (
                              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Turnitin Cleared (2.1%)</span>
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* TOOL: GRADEBOOK */}
              {courseTool === 'gradebook' && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-base font-bold text-slate-900">Course Gradebook & Assessment Breakdown</h3>
                    <p className="text-xs text-slate-500">Weighting components and scores for {selectedCourse.code}.</p>
                  </div>

                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Component</th>
                        <th className="py-2.5 px-3">Weight</th>
                        <th className="py-2.5 px-3">Max Marks</th>
                        <th className="py-2.5 px-3">Score Obtained</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      <tr>
                        <td className="py-2.5 px-3 font-sans font-medium text-slate-800">Quizzes & Continuous MCQs</td>
                        <td className="py-2.5 px-3">15%</td>
                        <td className="py-2.5 px-3">15</td>
                        <td className="py-2.5 px-3 font-bold text-[#0b2545]">13.5</td>
                        <td className="py-2.5 px-3 text-emerald-700 font-sans font-semibold">Evaluated</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-sans font-medium text-slate-800">Assignments & Lab Dockets</td>
                        <td className="py-2.5 px-3">15%</td>
                        <td className="py-2.5 px-3">15</td>
                        <td className="py-2.5 px-3 font-bold text-[#0b2545]">14.0</td>
                        <td className="py-2.5 px-3 text-emerald-700 font-sans font-semibold">Evaluated</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-sans font-medium text-slate-800">Midterm Examination</td>
                        <td className="py-2.5 px-3">30%</td>
                        <td className="py-2.5 px-3">30</td>
                        <td className="py-2.5 px-3 font-bold text-[#0b2545]">27.0</td>
                        <td className="py-2.5 px-3 text-emerald-700 font-sans font-semibold">Evaluated</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-sans font-medium text-slate-800">Final Term Examination</td>
                        <td className="py-2.5 px-3">40%</td>
                        <td className="py-2.5 px-3">40</td>
                        <td className="py-2.5 px-3 text-slate-400">—</td>
                        <td className="py-2.5 px-3 text-amber-700 font-sans font-semibold">Scheduled (Hall Slip Ready)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* TOOL: ATTENDANCE */}
              {courseTool === 'attendance' && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Lecture Attendance Log — {selectedCourse.code}</h3>
                      <p className="text-xs text-slate-500">Official log maintained under University of Sindh Examination Ordinance.</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
                      {selectedCourse.attendancePercent}% (Safe)
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                        <tr>
                          <th className="py-2 px-3">Date</th>
                          <th className="py-2 px-3">Lecture Topic</th>
                          <th className="py-2 px-3">Status</th>
                          <th className="py-2 px-3">Marked By</th>
                          <th className="py-2 px-3 font-mono">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {ATTENDANCE_HISTORY
                          .filter(a => a.courseCode === selectedCourse.code)
                          .map((rec, i) => (
                            <tr key={i} className="hover:bg-slate-50">
                              <td className="py-2.5 px-3 font-mono text-slate-600">{rec.date}</td>
                              <td className="py-2.5 px-3 text-slate-800">{rec.topic}</td>
                              <td className="py-2.5 px-3">
                                <span className={`font-semibold ${
                                  rec.status === 'Present' ? 'text-emerald-700' : 'text-rose-700'
                                }`}>
                                  {rec.status === 'Present' ? '● Present' : '✕ Absent'}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 text-slate-600">{rec.markedBy}</td>
                              <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">{rec.timestamp}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TOOL: RESOURCES */}
              {courseTool === 'resources' && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Course Resources & File Vault</h3>
                      <p className="text-xs text-slate-500">Lecture slides, code packages, and supplementary readings.</p>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    {[
                      { name: 'Lecture 01-04 Slide Deck (Foundations).pdf', size: '14.2 MB', date: 'Sep 10, 2026' },
                      { name: 'Microservices Clean Architecture Reference Code.zip', size: '8.4 MB', date: 'Sep 24, 2026' },
                      { name: 'Domain Driven Design Tactical Patterns.pdf', size: '4.8 MB', date: 'Oct 02, 2026' },
                      { name: 'Midterm Past Papers & Solution Key.pdf', size: '2.1 MB', date: 'Oct 05, 2026' }
                    ].map((file, i) => (
                      <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <FileText className="w-4 h-4 text-blue-700" />
                          <div>
                            <span className="font-semibold text-slate-900 block">{file.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{file.size} · Uploaded {file.date}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => triggerToast(`Downloaded ${file.name} from LMS Vault.`)}
                          className="px-2.5 py-1 text-slate-700 hover:text-slate-900 hover:bg-slate-200 rounded font-bold cursor-pointer flex items-center gap-1"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TOOL: ROSTER & DISCUSSION */}
              {courseTool === 'roster' && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-base font-bold text-slate-900">Enrolled Student Cohort & Study Forum</h3>
                    <p className="text-xs text-slate-500">BS Software Engineering (2K23 Batch) cohort enrolled in {selectedCourse.code}.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {[
                      { roll: '2K23/SWE/104', name: 'Ali Hassan Chand (You)', email: 'ali.hassan23@usindh.edu.pk' },
                      { roll: '2K23/SWE/045', name: 'Abdul Hannan Memon', email: 'abdul.hannan23@usindh.edu.pk' },
                      { roll: '2K23/SWE/078', name: 'Haris Ahmed Ansari', email: 'haris.ansari23@usindh.edu.pk' },
                      { roll: '2K23/SWE/101', name: 'Abdul Samad', email: 'abdul.swe23@usindh.edu.pk' },
                      { roll: '2K23/SWE/102', name: 'Areeba Shaikh', email: 'areeba.swe23@usindh.edu.pk' },
                      { roll: '2K23/SWE/105', name: 'Dua Memon', email: 'dua.swe23@usindh.edu.pk' }
                    ].map((peer, i) => (
                      <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-900 font-bold flex items-center justify-center font-mono text-xs">
                          {peer.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <strong className="text-slate-900 block">{peer.name}</strong>
                          <span className="text-[11px] font-mono text-slate-500">{peer.roll}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 3: BIOMETRIC ATTENDANCE (75% STATUTORY RULE)
         ========================================================= */}
      {activeTab === 'attendance' && (
        <div className="space-y-5">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Official Attendance Register & Statutory Compliance</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Enforcing University of Sindh Examination Regulations (Statute 14-B: Minimum 75% Attendance Required).
                </p>
              </div>
              <div className="text-xs font-mono text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                Overall Attendance: <strong className="text-[#0b2545] font-bold">88.0%</strong>
              </div>
            </div>

            {/* Course-by-Course Attendance Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Course Code</th>
                    <th className="py-2.5 px-3">Subject Title</th>
                    <th className="py-2.5 px-3">Lectures Held</th>
                    <th className="py-2.5 px-3">Attended</th>
                    <th className="py-2.5 px-3">Attendance %</th>
                    <th className="py-2.5 px-3">Safety Buffer</th>
                    <th className="py-2.5 px-3">Examination Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ENROLLED_COURSES.map(course => {
                    const isAtRisk = course.attendancePercent < 75;
                    const safeBuffer = isAtRisk ? -2 : Math.floor((course.attendanceAttended - (course.attendanceTotal * 0.75)));
                    return (
                      <tr key={course.code} className={isAtRisk ? 'bg-rose-50/40' : 'hover:bg-slate-50/60'}>
                        <td className="py-3 px-3 font-mono font-bold text-[#0b2545]">{course.code}</td>
                        <td className="py-3 px-3 font-medium text-slate-900">{course.title}</td>
                        <td className="py-3 px-3 font-mono text-slate-600">{course.attendanceTotal}</td>
                        <td className="py-3 px-3 font-mono text-slate-800">{course.attendanceAttended}</td>
                        <td className="py-3 px-3 font-mono font-bold">
                          <span className={isAtRisk ? 'text-rose-700' : 'text-emerald-700'}>
                            {course.attendancePercent}%
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-600 font-mono">
                          {isAtRisk ? (
                            <span className="text-rose-700 font-bold">-2 Deficit</span>
                          ) : (
                            <span className="text-emerald-700">+{safeBuffer} Safe</span>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <span className={`inline-flex items-center gap-1 font-semibold ${
                            isAtRisk ? 'text-rose-700' : 'text-emerald-700'
                          }`}>
                            {isAtRisk ? <AlertTriangle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                            <span>{isAtRisk ? 'Debarment Warning' : 'Eligible'}</span>
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          {isAtRisk ? (
                            <button
                              onClick={() => {
                                setAppealCourse(course.code);
                                setShowAppealModal(true);
                              }}
                              className="px-2.5 py-1 text-xs font-bold text-rose-700 bg-rose-100 hover:bg-rose-200 rounded cursor-pointer"
                            >
                              File Appeal
                            </button>
                          ) : (
                            <span className="text-slate-400 text-[11px]">Cleared</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Attendance Marking Stream History */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Recent Biometric Lecture Attendance Stream
              </h3>
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-3">Date</th>
                      <th className="py-2 px-3">Course</th>
                      <th className="py-2 px-3">Lecture Topic</th>
                      <th className="py-2 px-3">Marked Status</th>
                      <th className="py-2 px-3">Instructor</th>
                      <th className="py-2 px-3 font-mono">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {ATTENDANCE_HISTORY.map((record, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-mono text-slate-600">{record.date}</td>
                        <td className="py-2 px-3 font-mono font-bold text-[#0b2545]">{record.courseCode}</td>
                        <td className="py-2 px-3 text-slate-800">{record.topic}</td>
                        <td className="py-2 px-3">
                          <span className={`font-semibold ${
                            record.status === 'Present' ? 'text-emerald-700' : 'text-rose-700'
                          }`}>
                            {record.status === 'Present' ? '● Present' : '✕ Absent'}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-slate-600">{record.markedBy}</td>
                        <td className="py-2 px-3 text-slate-400 font-mono text-[11px]">{record.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 4: ASSIGNMENTS, LABS & QUIZZES HUB
         ========================================================= */}
      {activeTab === 'assignments' && (
        <div className="space-y-5">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Course Assessment & Deliverables Engine</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Continuous assessment tasks, lab deliverables, and rubric evaluations.
                </p>
              </div>

              {/* Segmented Filter Control */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs">
                {(['All', 'Pending', 'Submitted', 'Graded'] as const).map(filter => (
                  <button
                    key={filter}
                    onClick={() => {
                      setAssignmentFilter(filter);
                      setSubTab(filter === 'All' ? '' : filter.toLowerCase());
                    }}
                    className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                      assignmentFilter === filter
                        ? 'bg-white text-slate-900 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Assignments List */}
            <div className="space-y-3">
              {filteredAssignments.map(asg => (
                <div
                  key={asg.id}
                  className="p-5 border border-slate-200 rounded-xl bg-white hover:border-slate-300 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono font-bold text-[#0b2545]">{asg.courseCode}</span>
                      <span className="text-slate-400" aria-hidden="true">·</span>
                      <span className="text-slate-600">{asg.courseName}</span>
                      <span className="text-slate-400" aria-hidden="true">·</span>
                      <span className={`font-semibold ${
                        asg.status === 'Graded' ? 'text-emerald-700' :
                        asg.status === 'Submitted' ? 'text-blue-700' : 'text-amber-700'
                      }`}>
                        {asg.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">{asg.title}</h4>
                    <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">{asg.description}</p>

                    {asg.feedback && (
                      <div className="mt-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-800">
                        <strong>Faculty Evaluation:</strong> {asg.feedback}
                      </div>
                    )}
                  </div>

                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 shrink-0">
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-900 font-mono">
                        {asg.status === 'Graded' ? `${asg.obtainedMarks} / ${asg.totalMarks} Marks` : `${asg.totalMarks} Marks`}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">Due: {asg.dueDate}</div>
                    </div>

                    {asg.status === 'Pending' && (
                      <button
                        onClick={() => setSubmittingAssignmentId(asg.id)}
                        className="px-3.5 py-1.5 bg-[#0b2545] hover:bg-blue-900 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Deliverable</span>
                      </button>
                    )}

                    {asg.status === 'Submitted' && (
                      <span className="text-xs text-blue-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Turnitin Cleared (2.1%)</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 5: OFFICIAL VERIFIABLE EXAMINATION SLIP & DATESHEET
         ========================================================= */}
      {activeTab === 'exams' && (
        <div className="space-y-5">
          {/* Sub-navigation bar between Digital Admit Card & Official Datesheet */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Controller of Examinations — Scholar Examination Portal</h2>
              <p className="text-xs text-slate-500">Verify digital examination hall slip, seat allocation, and official Midterm/Final datesheets.</p>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto text-xs">
              {[
                { id: 'slip', label: 'Digital Admit Card (Slip)' },
                { id: 'datesheet', label: 'Midterm & Final Datesheet' }
              ].map((st) => {
                const isSelected = (activeSubTab === '' && st.id === 'slip') || activeSubTab === st.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => setSubTab(st.id)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#004b87] text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {st.label}
                  </button>
                );
              })}
            </div>
          </div>

          {activeSubTab === 'datesheet' ? (
            <TimetableMasterEngine
              role="student"
              canManage={false}
              slots={timetableSlots}
              onUpdateSlots={onUpdateSlots}
              examEntries={examEntries}
              onUpdateExams={onUpdateExams}
              settings={timetableSettings}
              onUpdateSettings={onUpdateSettings}
              initialDeptId="dept_swe"
              initialPart="P-IV"
              initialSemester={7}
              initialSubView="exams"
              onAddAuditLog={onAddAuditLog}
            />
          ) : (
          <div className="relative bg-white rounded-xl border-2 border-[#0b2545] p-6 sm:p-8 space-y-6 shadow-sm overflow-hidden">
            {/* Watermark Crest */}
            <div className="absolute inset-0 opacity-[0.02] flex items-center justify-center pointer-events-none">
              <UniversitySeal size="xl" monochrome />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-900 pb-5 relative z-10">
              <div className="flex items-center gap-4">
                <UniversitySeal size="lg" />
                <div>
                  <h2 className="font-cinzel text-lg sm:text-xl font-black text-[#0b2545] tracking-tight uppercase">
                    UNIVERSITY OF SINDH, JAMSHORO
                  </h2>
                  <div className="text-xs font-bold text-slate-800 tracking-wide font-mono">
                    Office of the Controller of Examinations · Fall 2026 Examination Hall Slip
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 no-print">
                <button
                  onClick={() => setShowQrVerificationModal(true)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Verify Digital QR</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 bg-[#0b2545] hover:bg-blue-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Slip</span>
                </button>
              </div>
            </div>

            {/* Candidate Identity Matrix */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10 text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={CURRENT_STUDENT.avatarUrl}
                  alt={CURRENT_STUDENT.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover border border-slate-300 shadow-2xs shrink-0"
                />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold font-mono">Candidate Name</span>
                  <strong className="text-slate-900 text-base font-serif-academic">{CURRENT_STUDENT.name}</strong>
                  <div className="text-[11px] text-slate-500 font-mono">CNIC: {CURRENT_STUDENT.cnicMasked}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Roll Number</span>
                  <strong className="text-[#0b2545] text-sm font-bold">{CURRENT_STUDENT.rollNumber}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Batch & Program</span>
                  <strong className="text-slate-900">{CURRENT_STUDENT.batch}</strong>
                  <div className="text-[11px] text-slate-500 font-sans">{CURRENT_STUDENT.program}</div>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Assigned Center</span>
                  <strong className="text-slate-900 font-sans">Allama I.I. Kazi Hall B</strong>
                </div>
              </div>
            </div>

            {/* Examination Schedule Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#0b2545] text-white">
                  <tr>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Timing</th>
                    <th className="py-2.5 px-3">Course Code & Title</th>
                    <th className="py-2.5 px-3">Seat Number</th>
                    <th className="py-2.5 px-3">Eligibility Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {EXAM_SCHEDULE.map(exam => (
                    <tr key={exam.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-mono font-semibold">{exam.date}</td>
                      <td className="py-3 px-3 text-slate-600 font-mono">{exam.time}</td>
                      <td className="py-3 px-3 font-medium text-slate-900">
                        <span className="font-mono text-[#0b2545] font-bold mr-1.5">{exam.courseCode}:</span>
                        {exam.courseName}
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-700">{exam.seatNumber}</td>
                      <td className="py-3 px-3">
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{exam.eligibilityStatus}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cryptographic Seal & Instructions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <div 
                  onClick={() => setShowQrVerificationModal(true)}
                  className="p-2 bg-slate-100 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-200"
                  title="Click to verify digital signature"
                >
                  <QrCode className="w-10 h-10 text-slate-800" />
                </div>
                <div className="text-[11px] text-slate-500">
                  <div>Digital QR Cryptographic Hash: <strong className="font-mono text-slate-700">SHA256:7e9a8...b041</strong></div>
                  <div>Verifiable by Examination Invigilators via ITSC Proctor Network.</div>
                </div>
              </div>

              <div className="text-right text-xs text-slate-500">
                <div className="font-bold text-slate-900">Controller of Examinations</div>
                <div>University of Sindh, Jamshoro</div>
              </div>
            </div>
          </div>
          )}
        </div>
      )}

      {/* =========================================================
          TAB 6: RESULTS & LIVE WHAT-IF GPA SIMULATOR
         ========================================================= */}
      {activeTab === 'results' && (
        <div className="space-y-5">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 shadow-2xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Official Semester Grade Ledger & Transcript</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Academic record across Semesters 1 through 6 with embedded GPA projection engine for current courses.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
                  {[
                    { id: '', label: 'Complete Record' },
                    { id: 'transcript', label: 'Semesters 1–6' },
                    { id: 'simulator', label: 'CGPA Simulator' }
                  ].map((st) => {
                    const isSelected = activeSubTab === st.id;
                    return (
                      <button
                        key={st.id}
                        onClick={() => setSubTab(st.id)}
                        className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#004b87] text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {st.label}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setShowGpaModal(true)}
                  className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Full Calculator</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-2 bg-[#0b2545] hover:bg-blue-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Transcript</span>
                </button>
              </div>
            </div>

            {/* Interactive "What-If" GPA Projection Terminal */}
            {(activeSubTab === '' || activeSubTab === 'simulator') && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-blue-700" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Live Semester 7 Grade Forecast & Graduating CGPA Simulator
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span>Forecast SGPA: <strong className="text-blue-900 font-bold">{simulatedSemesterGpa}</strong></span>
                  <span className="text-slate-300" aria-hidden="true">·</span>
                  <span>Forecast Graduating CGPA: <strong className="text-emerald-800 font-bold">{projectedGraduationCgpa}</strong></span>
                </div>
              </div>

              <p className="text-xs text-slate-600">
                Adjust prospective letter grades for ongoing Fall 2026 courses to project your graduation honours according to University of Sindh regulations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {ENROLLED_COURSES.map(course => (
                  <div key={course.code} className="p-3 bg-white border border-slate-200 rounded-lg text-xs flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-[#0b2545]">{course.code}</span>
                      <span className="text-slate-500 block text-[11px] truncate max-w-[140px]">{course.title}</span>
                    </div>

                    <select
                      value={simulatedGrades[course.code] ?? 3.67}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setSimulatedGrades(prev => ({ ...prev, [course.code]: val }));
                      }}
                      className="p-1 rounded border border-slate-300 text-xs font-mono font-bold text-slate-900 bg-white"
                    >
                      <option value={4.0}>A (4.00 · 85%+)</option>
                      <option value={3.67}>A- (3.67 · 80-84%)</option>
                      <option value={3.33}>B+ (3.33 · 75-79%)</option>
                      <option value={3.0}>B (3.00 · 71-74%)</option>
                      <option value={2.67}>B- (2.67 · 68-70%)</option>
                      <option value={2.0}>C (2.00 · 60-63%)</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
            )}

            {/* Historical Transcript Records */}
            {(activeSubTab === '' || activeSubTab === 'transcript') && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Official Examination Branch Historical Semesters (1 to 6)
              </h3>
              {HISTORICAL_TRANSCRIPT.map(sem => (
                <div key={sem.semesterNumber} className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 px-4 py-2.5 flex items-center justify-between border-b border-slate-200 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">Semester {sem.semesterNumber}</span>
                      <span className="text-slate-400" aria-hidden="true">·</span>
                      <span className="text-slate-600 font-medium">{sem.academicSession}</span>
                    </div>
                    <div className="font-mono font-bold text-[#0b2545]">
                      Semester GPA: <span>{sem.gpa}</span>
                    </div>
                  </div>

                  <table className="w-full text-xs text-left">
                    <thead className="bg-white text-slate-500 border-b border-slate-100">
                      <tr>
                        <th className="py-2 px-3">Course Code</th>
                        <th className="py-2 px-3">Subject Title</th>
                        <th className="py-2 px-3">Cr.</th>
                        <th className="py-2 px-3">Marks %</th>
                        <th className="py-2 px-3">Grade Point</th>
                        <th className="py-2 px-3">Grade</th>
                        <th className="py-2 px-3">Remarks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {sem.courses.map((c, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="py-2 px-3 font-mono font-bold text-slate-700">{c.code}</td>
                          <td className="py-2 px-3 text-slate-900 font-medium">{c.title}</td>
                          <td className="py-2 px-3 text-slate-600 font-mono">{c.credits}</td>
                          <td className="py-2 px-3 font-mono">{c.marksObtained}</td>
                          <td className="py-2 px-3 font-mono font-bold text-[#0b2545]">{c.gradePoint}</td>
                          <td className="py-2 px-3 font-mono font-bold">{c.letterGrade}</td>
                          <td className="py-2 px-3 text-emerald-700 font-medium">{c.remarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 7: 1LINK DIGITAL FEE CHALLAN LEDGER
         ========================================================= */}
      {activeTab === 'fees' && (
        <div className="space-y-5">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">1Link Digital Fee Challan Portal</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Direct online settlement with HBL, Sindh Bank, and 1Link (Replacing manual bank branch queues).
                </p>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto text-xs">
                {[
                  { id: '', label: 'All Challans' },
                  { id: 'challans', label: 'Active Challans' },
                  { id: 'history', label: 'Verified Receipts' }
                ].map((st) => {
                  const isSelected = activeSubTab === st.id;
                  return (
                    <button
                      key={st.id}
                      onClick={() => setSubTab(st.id)}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#004b87] text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {st.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {paymentSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Payment successfully settled through 1Link. Examination clearance updated in real-time.</span>
              </div>
            )}

            <div className="space-y-3">
              {challansList
                .filter(c => {
                  if (activeSubTab === 'challans') return c.status === 'Unpaid';
                  if (activeSubTab === 'history') return c.status === 'Paid';
                  return true;
                })
                .map(challan => (
                <div
                  key={challan.challanNumber}
                  className="p-5 border border-slate-200 rounded-xl bg-white hover:border-slate-300 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono font-bold text-[#0b2545]">
                        {challan.challanNumber}
                      </span>
                      <span className="text-slate-400" aria-hidden="true">·</span>
                      <span className={`font-semibold ${
                        challan.status === 'Paid' ? 'text-emerald-700' :
                        challan.status === 'Under Verification' ? 'text-amber-700' : 'text-rose-700'
                      }`}>
                        {challan.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">{challan.title}</h4>
                    <div className="text-xs text-slate-500">
                      Designated Bank: {challan.bankName} · Due Date: <span className="font-mono">{challan.dueDate}</span>
                    </div>

                    {challan.transactionReference && (
                      <div className="text-[11px] font-mono text-emerald-800 pt-0.5">
                        Ref: {challan.transactionReference} · Receipt: {challan.receiptNumber}
                      </div>
                    )}
                  </div>

                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                    <div className="text-right">
                      <div className="text-base font-black text-slate-900 font-mono">
                        PKR {challan.amount.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-400">Inclusive of HEC levy</div>
                    </div>

                    {challan.status === 'Unpaid' ? (
                      <button
                        onClick={() => handlePayChallan(challan.challanNumber)}
                        disabled={payingChallan === challan.challanNumber}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>{payingChallan === challan.challanNumber ? 'Settling...' : 'Pay via 1Link Sandbox'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => triggerToast(`Official Paid Receipt downloaded for ${challan.challanNumber}.`)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Official Receipt</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 8: ONLINE SUBJECT SELECTION (AUTHENTIC USINDH LMS)
         ========================================================= */}
      {activeTab === 'selection' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                  <CheckSquare className="w-3.5 h-3.5 text-amber-700" />
                  <span>ITSC Central Semester Enrollment Module</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mt-1">
                  Online Subject Selection — Fall 2026 Semester
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Department: <strong>{currentStudent.department}</strong> · Cohort: <strong>{currentStudent.batch}</strong> · Scholar: <strong>{currentStudent.name} ({currentStudent.rollNumber})</strong>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Selected Credits</span>
                  <span className="text-lg font-black text-[#0b2545] font-mono">
                    {selectedSubjects.length * 3 - (selectedSubjects.includes('CS-411') ? 1 : 0)} / 18 CH
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                  HEC Limit: 15–18 CH
                </span>
              </div>
            </div>

            {subjectSelectionSubmitted && (
              <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs">Subject Selection Form Submitted to Chairperson Office</h4>
                    <p className="text-[11px] text-emerald-700">
                      Tracking ID: <span className="font-mono font-bold">UOS-SUB-2026-9041</span>. Status: <strong className="font-semibold">Chairperson & Dean Endorsement Pending</strong>.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => triggerToast('Official Subject Selection Form PDF Downloaded.')}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Form</span>
                </button>
              </div>
            )}

            {/* Courses Table */}
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3 w-10 text-center">Select</th>
                    <th className="p-3">Course Code & Title</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Credit Hours</th>
                    <th className="p-3">Designated Instructor</th>
                    <th className="p-3">Prerequisites</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { code: 'SWE-401', title: 'Software Architecture & Design', type: 'Major Compulsory', ch: 3, teacher: 'Engr. Farhan Shaikh', pre: 'SWE-301 (OOD)' },
                    { code: 'SWE-403', title: 'Software Quality Assurance & Testing', type: 'Major Compulsory', ch: 3, teacher: 'Prof. Dr. Arifa Bhutto', pre: 'SWE-305 (SWE Principles)' },
                    { code: 'SWE-405', title: 'Cloud Computing & Distributed Systems', type: 'Elective (Track A)', ch: 3, teacher: 'Engr. Kashif Laghari', pre: 'CS-301 (OS & Networks)' },
                    { code: 'SWE-407', title: 'Mobile Application Development', type: 'Elective (Track B)', ch: 3, teacher: 'Engr. Aijaz Memon', pre: 'SWE-202 (OOP & Data Structures)' },
                    { code: 'SWE-499', title: 'Final Year Design Project I (FYDP-I)', type: 'Capstone', ch: 3, teacher: 'Chairperson Committee', pre: 'Passed 90+ Credit Hours' },
                    { code: 'CS-411', title: 'Professional Ethics & Cyber Law', type: 'General Compulsory', ch: 2, teacher: 'Dr. Tariq Nizamani', pre: 'None' },
                    { code: 'SWE-415', title: 'Formal Methods in Software Engineering', type: 'Elective (Alternate)', ch: 3, teacher: 'Faculty TBD', pre: 'Discrete Structures' }
                  ].map((sub) => {
                    const isChecked = selectedSubjects.includes(sub.code);
                    return (
                      <tr key={sub.code} className={`hover:bg-slate-50/80 transition-colors ${isChecked ? 'bg-blue-50/30' : ''}`}>
                        <td className="p-3 text-center">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              if (isChecked) {
                                setSelectedSubjects(prev => prev.filter(c => c !== sub.code));
                              } else {
                                setSelectedSubjects(prev => [...prev, sub.code]);
                              }
                            }}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                        </td>
                        <td className="p-3">
                          <span className="font-mono font-bold text-slate-900 mr-2">{sub.code}</span>
                          <span className="font-semibold text-slate-800">{sub.title}</span>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                            {sub.type}
                          </span>
                        </td>
                        <td className="p-3 font-mono font-bold text-slate-700">
                          {sub.ch} CH
                        </td>
                        <td className="p-3 text-slate-600">
                          {sub.teacher}
                        </td>
                        <td className="p-3 font-mono text-[11px] text-slate-500">
                          {sub.pre}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                Notice: Subject selection follows statutory HEC curriculum guidelines. Once endorsed by Chairman, changes require formal withdrawal proforma.
              </div>
              <button
                onClick={() => {
                  setSubjectSelectionSubmitted(true);
                  onAddAuditLog({
                    id: 'log_' + Date.now().toString().slice(-4),
                    who: `${currentStudent.name} (${currentStudent.rollNumber})`,
                    role: 'Student',
                    what: `Online Subject Selection Submitted (${selectedSubjects.length} subjects)`,
                    category: 'Academic Administration',
                    when: new Date().toLocaleString() + ' PKT',
                    whereIp: '10.14.2.88 (Campus Session)',
                    objectTarget: `Department: ${currentStudent.department} · Fall 2026`,
                    beforeState: 'Unsubmitted Subject Selection',
                    afterState: 'Submitted to Chairman Secretariat',
                    reason: 'Semester 7 Subject Enrollment',
                    referenceId: 'SUB-SEL-' + Date.now().toString().slice(-6)
                  });
                }}
                disabled={selectedSubjects.length < 5}
                className="px-5 py-2.5 bg-[#0b2545] hover:bg-[#133e87] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Submit Subject Selection Form</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 9: MANDATORY HEC QEC PROFORMA (AUTHENTIC USINDH LMS)
         ========================================================= */}
      {activeTab === 'proforma' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#004b87] flex items-center gap-1.5">
                  <FileCheck2 className="w-3.5 h-3.5 text-[#004b87]" />
                  <span>Quality Enhancement Cell (QEC) Directorate · Proforma 1 & 10</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mt-1">
                  HEC Course & Teacher Evaluation Proforma
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Mandatory semester-end feedback required for final examination hall slip issuance.
                </p>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                qecProformaSubmitted 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}>
                {qecProformaSubmitted ? '✓ QEC Form Completed' : 'Pending Submission'}
              </span>
            </div>

            {qecProformaSubmitted ? (
              <div className="mt-6 p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-emerald-950">Thank you for submitting your QEC evaluation!</h3>
                <p className="text-xs text-emerald-800 max-w-lg mx-auto">
                  Your ratings have been cryptographically hashed and sent to the Quality Enhancement Cell (QEC). Your final examination admit card clearance has been officially verified.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('exams')}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    View Digital Admit Slip
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-5 space-y-5">
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                  <span>Evaluating: <strong>SWE-401 (Software Architecture & Design)</strong></span>
                  <span>Course Incharge: <strong>Engr. Farhan Shaikh</strong></span>
                </div>

                <div className="space-y-4">
                  {[
                    { key: 'syllabus', question: '1. The course outline, weekly lecture schedule, and learning outcomes were clearly presented at the start of semester.' },
                    { key: 'clarity', question: '2. The teacher demonstrated comprehensive subject knowledge and explained complex architectural patterns effectively.' },
                    { key: 'delivery', question: '3. Lecture slides, courseware materials, and laboratory resources were uploaded regularly to the LMS portal.' },
                    { key: 'punctuality', question: '4. The teacher maintained regular punctuality and strictly enforced the mandatory 75% HEC attendance policy.' },
                    { key: 'fairness', question: '5. Quizzes, assignments, and continuous assessments were evaluated fairly with constructive feedback.' },
                    { key: 'interaction', question: '6. The teacher was accessible during designated faculty office hours for academic consultation.' }
                  ].map(q => (
                    <div key={q.key} className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white transition-colors space-y-2.5">
                      <p className="text-xs font-semibold text-slate-800 leading-relaxed">{q.question}</p>
                      <div className="grid grid-cols-5 sm:flex sm:items-center gap-1.5 sm:gap-2">
                        {[1, 2, 3, 4, 5].map(score => {
                          const isSelected = qecRatings[q.key] === score;
                          return (
                            <button
                              key={score}
                              type="button"
                              onClick={() => setQecRatings(prev => ({ ...prev, [q.key]: score }))}
                              className={`min-h-[38px] px-2 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                                isSelected
                                  ? 'bg-[#0068b5] text-white shadow-xs'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                              }`}
                            >
                              <span>{score} ★</span>
                              <span className="hidden sm:inline">{score === 5 ? ' (Strongly Agree)' : score === 1 ? ' (Poor)' : ''}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                  <button
                    onClick={() => {
                      setQecProformaSubmitted(true);
                      onAddAuditLog({
                        id: 'log_' + Date.now().toString().slice(-4),
                        who: `${currentStudent.name} (${currentStudent.rollNumber})`,
                        role: 'Student',
                        what: 'HEC QEC Course & Teacher Evaluation Form Submitted',
                        category: 'Quality Enhancement',
                        when: new Date().toLocaleString() + ' PKT',
                        whereIp: '10.14.2.88 (Campus Session)',
                        objectTarget: 'Course: SWE-401 · Teacher: Engr. Farhan Shaikh',
                        beforeState: 'QEC Form Pending',
                        afterState: 'QEC Form Submitted & Admit Card Unblocked',
                        reason: 'Mandatory QEC Compliance Policy',
                        referenceId: 'QEC-EVAL-' + Date.now().toString().slice(-6)
                      });
                    }}
                    className="px-5 py-2.5 bg-[#004b87] hover:bg-[#003866] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer border border-[#003866]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#c8e27b]" />
                    <span>Submit Certified QEC Evaluation</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 10: STUDENT ACADEMIC PROFILE & SMART CAMPUS ID CARD
         ========================================================= */}
      {activeTab === 'profile' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Smart Campus Digital RFID Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-linear-to-br from-[#0b2545] via-[#133e87] to-[#07162c] text-white rounded-3xl p-6 shadow-xl border border-blue-900/40 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <UniversitySeal size="sm" showText={false} />
                    <div>
                      <div className="font-bold text-xs uppercase tracking-wider text-amber-300">University of Sindh</div>
                      <div className="text-[10px] text-slate-300">Smart Campus Identity Card</div>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 border border-white/20 text-white">
                    RFID ACTIVE
                  </span>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <div className="w-20 h-20 rounded-2xl bg-white/10 p-1 border-2 border-amber-400/80 shrink-0 shadow-md flex items-center justify-center">
                    <img
                      src={currentStudent.avatarUrl || CURRENT_STUDENT.avatarUrl}
                      alt={currentStudent.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-base text-white truncate">{currentStudent.name}</h3>
                    <div className="font-mono text-xs text-amber-300 font-semibold">{currentStudent.rollNumber}</div>
                    <div className="text-[11px] text-slate-300 mt-1 truncate">{currentStudent.program}</div>
                    <div className="text-[10px] text-slate-400">Batch {currentStudent.batch} · Sem {currentStudent.semester}</div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between text-[10px] font-mono">
                <div>
                  <span className="text-slate-400 block">CARD VALIDITY</span>
                  <span className="font-bold text-white">DEC 2026</span>
                </div>
                <div>
                  <span className="text-slate-400 block">REGISTRATION NO</span>
                  <span className="font-bold text-white">2023-FET-104</span>
                </div>
                <div className="p-1.5 bg-white rounded-lg">
                  <QrCode className="w-7 h-7 text-slate-900" />
                </div>
              </div>
            </div>

            {/* Academic Credentials & Bio Details */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Enrolled Scholar Institutional Record</h3>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  Status: Regular & In Good Standing
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Department</span>
                  <span className="font-bold text-slate-900">{currentStudent.department}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Faculty</span>
                  <span className="font-bold text-slate-900">Faculty of Engineering & Technology</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Assigned Academic Mentor</span>
                  <span className="font-bold text-slate-900">Dr. Farhan Ali Shah (Room 214)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">District / Domicile</span>
                  <span className="font-bold text-slate-900">Hyderabad (Rural Merit Quota)</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700">HEC Higher Education Aptitude Compliance</span>
                  <span className="text-emerald-700 font-bold">100% Cleared</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  All academic pre-requisites for Semester 7 enrollment completed. Examination slip issuance cleared under Controller of Examinations Regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODALS & DIALOGS
         ========================================================= */}
      {/* 1. GPA Calculator Modal */}
      <GpaCalculatorModal
        isOpen={showGpaModal}
        onClose={() => setShowGpaModal(false)}
        courses={ENROLLED_COURSES}
        currentCgpa={CURRENT_STUDENT.cgpa}
        completedCredits={CURRENT_STUDENT.completedCredits}
      />

      {/* 2. QR Verification Dialog */}
      {showQrVerificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-slate-900 text-sm">Cryptographic QR Verification</h3>
              <button 
                onClick={() => setShowQrVerificationModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xs"
              >
                ✕
              </button>
            </div>
            <div className="text-center py-2 space-y-2">
              <div className="inline-block p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <QrCode className="w-24 h-24 text-slate-900 mx-auto" />
              </div>
              <div className="font-mono text-xs font-bold text-emerald-800">
                VERIFIED AUTHENTIC BY ITSC
              </div>
              <p className="text-[11px] text-slate-500">
                Signer: Controller of Examinations, University of Sindh<br />
                Timestamp: 2026-10-07T13:40:00Z<br />
                SHA-256: 7e9a8f2c01994bd5a881...
              </p>
            </div>
            <button
              onClick={() => setShowQrVerificationModal(false)}
              className="w-full py-2 bg-[#0b2545] text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              Close Verification
            </button>
          </div>
        </div>
      )}

      {/* 3. Book Office Hours Modal */}
      {showOfficeHoursModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-blue-700" />
                <span>Book Faculty Office Consultation</span>
              </h3>
              <button 
                onClick={() => setShowOfficeHoursModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xs"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-slate-600 space-y-2">
              <p>
                Instructor: <strong>{selectedCourse.instructor}</strong><br />
                Office: Faculty Office #14, Dept of Software Engineering<br />
                Regular Office Hours: <strong>Mon & Wed, 02:00 PM – 04:00 PM</strong>
              </p>
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Consultation Topic</label>
                <input 
                  type="text" 
                  placeholder="e.g. Microservices boundary design query..."
                  className="w-full p-2 border border-slate-300 rounded text-xs outline-hidden"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowOfficeHoursModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  triggerToast(`Consultation request sent to ${selectedCourse.instructor}.`);
                  setShowOfficeHoursModal(false);
                }}
                className="px-3.5 py-1.5 bg-[#0068b5] hover:bg-[#004b87] text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Assignment Submission Modal */}
      {submittingAssignmentId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Submit Assignment File</h3>
            <p className="text-xs text-slate-500">
              Upload your deliverable file (PDF, ZIP, IPYNB, max 25MB). Automatic Turnitin plagiarism check will execute upon upload.
            </p>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-700">File Name / Label</label>
              <input
                type="text"
                placeholder="e.g. Ali_Hassan_2K23_SWE_104_LabTask.pdf"
                value={submissionFile}
                onChange={(e) => setSubmissionFile(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 outline-hidden focus:border-blue-500"
              />

              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center text-xs text-slate-400 hover:border-blue-400 cursor-pointer">
                <Upload className="w-6 h-6 mx-auto mb-1 text-slate-400" />
                <span>Drag and drop assignment file here or click to browse</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSubmittingAssignmentId(null)}
                className="px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmitAssignment(submittingAssignmentId)}
                disabled={isUploading}
                className="px-4 py-2 text-xs font-bold bg-[#0b2545] hover:bg-blue-900 text-white rounded-lg cursor-pointer disabled:opacity-50"
              >
                {isUploading ? 'Verifying & Uploading...' : 'Confirm Submission'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Statutory Attendance Shortage Appeal Modal */}
      {showAppealModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
              <AlertTriangle className="w-5 h-5" />
              <span>Statutory Attendance Shortage Appeal</span>
            </div>
            <p className="text-xs text-slate-500">
              Submit an official representation for missed lectures in <strong>{appealCourse}</strong> to the Course Instructor & Department Chairperson Prof. Dr. Arifa Bhutto.
            </p>

            <form onSubmit={handleSendAppeal} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Reason Category</label>
                <select
                  value={appealCategory}
                  onChange={(e) => setAppealCategory(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 outline-hidden"
                >
                  <option value="Medical Emergency">Medical Emergency / Hospitalization</option>
                  <option value="Official University Representation">Official University Representation (Sports/Debates/Conference)</option>
                  <option value="Family Bereavement">Family Bereavement / Severe Circumstance</option>
                  <option value="Hajj / Umrah Sanctioned Leave">Hajj / Umrah Official Leave</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Explanation & Clinical Documentation</label>
                <textarea
                  required
                  rows={3}
                  value={appealReason}
                  onChange={(e) => setAppealReason(e.target.value)}
                  placeholder="Provide clinical medical practitioner details, certificate number, or official nomination letter reference..."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 outline-hidden focus:border-blue-500"
                />
              </div>

              {appealSuccess && (
                <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-medium border border-emerald-200">
                  Representation formally recorded in immutable audit log. Forwarded to HOD Office.
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAppealModal(false)}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white rounded-lg cursor-pointer"
                >
                  Submit Official Representation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
