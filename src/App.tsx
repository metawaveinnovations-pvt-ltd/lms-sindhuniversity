import React, { useState, useEffect } from 'react';
import { UserRole, NotificationItem, AuditLogItem } from './types';
import { SYSTEM_NOTIFICATIONS, AUDIT_LOGS_STREAM, MULTI_DEPARTMENT_STUDENTS, CURRENT_STUDENT } from './data/mockAcademicData';
import {
  ClassTimetableSlot,
  ExamDatesheetEntry,
  UniversityTimetableSettings,
  INITIAL_CLASS_TIMETABLE_SLOTS,
  INITIAL_EXAM_DATESHEET_ENTRIES,
  INITIAL_UNIVERSITY_TIMETABLE_SETTINGS
} from './data/timetableData';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { UniversitySeal } from './components/common/UniversitySeal';
import { AppSidebar } from './components/common/AppSidebar';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { SearchModal } from './components/common/SearchModal';
import { PlatformNoticeModal } from './components/common/PlatformNoticeModal';
import { ModernizationDocModal } from './components/modernization/ModernizationDocModal';
import { PublicPortal } from './components/public/PublicPortal';
import { VcPortal } from './components/vc/VcPortal';
import { DeanPortal } from './components/dean/DeanPortal';
import { StudentPortal } from './components/student/StudentPortal';
import { FacultyPortal } from './components/faculty/FacultyPortal';
import { HodPortal } from './components/hod/HodPortal';
import { AdminPortal } from './components/admin/AdminPortal';
import { ParentPortal } from './components/parent/ParentPortal';
import { ArchitecturePortal } from './components/architecture/ArchitecturePortal';
import { useSwipeNavigation } from './hooks/useSwipeNavigation';
import { X, ArrowLeftRight } from 'lucide-react';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('public');
  
  // Student cohort persona state
  const [activeStudentId, setActiveStudentId] = useState<string>('std_2k23_swe_104');
  const activeStudent = MULTI_DEPARTMENT_STUDENTS.find(s => s.id === activeStudentId) || CURRENT_STUDENT;
  
  // Tab states per persona
  const [vcTab, setVcTab] = useState<string>('overview');
  const [deanTab, setDeanTab] = useState<string>('overview');
  const [studentTab, setStudentTab] = useState<string>('overview');
  const [selectedCourseCode, setSelectedCourseCode] = useState<string>('SWE-401');
  const [facultyTab, setFacultyTab] = useState<string>('overview');
  const [hodTab, setHodTab] = useState<string>('overview');
  const [adminTab, setAdminTab] = useState<string>('telemetry');
  const [parentTab, setParentTab] = useState<string>('overview');
  const [activeSubTab, setActiveSubTab] = useState<string>('');

  // Sidebar & Layout states
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Notifications & Audit Stream
  const [notifications, setNotifications] = useState<NotificationItem[]>(SYSTEM_NOTIFICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(AUDIT_LOGS_STREAM);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [swipeFeedback, setSwipeFeedback] = useState<string | null>(null);

  // Platform Disclaimer & AI Prototype Showcase Modal (displays when website opens)
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        return sessionStorage.getItem('uos_lms_notice_dismissed') !== 'true';
      } catch {
        return true;
      }
    }
    return true;
  });

  // Dedicated 9-Page LMS & E-Portal Modernization Document Modal
  const [isModernizationDocOpen, setIsModernizationDocOpen] = useState<boolean>(false);

  // Master University Timetable & Midterm/Final Exam Schedule State (Controlled by Chairman / HOD / Dean / VC)
  const [timetableSlots, setTimetableSlots] = useState<ClassTimetableSlot[]>(INITIAL_CLASS_TIMETABLE_SLOTS);
  const [examEntries, setExamEntries] = useState<ExamDatesheetEntry[]>(INITIAL_EXAM_DATESHEET_ENTRIES);
  const [timetableSettings, setTimetableSettings] = useState<UniversityTimetableSettings>(INITIAL_UNIVERSITY_TIMETABLE_SETTINGS);

  // Guarantee homepage opens at the top hero section on initial load / refresh
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
  }, []);

  const showSwipeToast = (message: string) => {
    setSwipeFeedback(message);
    setTimeout(() => {
      setSwipeFeedback(prev => (prev === message ? null : prev));
    }, 1800);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleAddAuditLog = (newLog: AuditLogItem) => {
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const handleSelectCourse = (code: string) => {
    setCurrentRole('student');
    setSelectedCourseCode(code);
    setStudentTab('courses');
    setActiveSubTab(code);
  };

  const handleNavigate = (role: UserRole, targetTab?: string) => {
    setCurrentRole(role);
    setActiveSubTab('');
    if (role === 'vc' && targetTab) {
      setVcTab(targetTab);
    } else if (role === 'dean' && targetTab) {
      setDeanTab(targetTab);
    } else if (role === 'student' && targetTab) {
      setStudentTab(targetTab === 'registration' ? 'selection' : targetTab);
    } else if (role === 'faculty' && targetTab) {
      setFacultyTab(targetTab);
    } else if ((role === 'chairman' || role === 'hod') && targetTab) {
      setHodTab(targetTab);
    } else if (role === 'admin' && targetTab) {
      setAdminTab(targetTab);
    } else if (role === 'parent' && targetTab) {
      setParentTab(targetTab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCurrentTab = () => {
    if (currentRole === 'vc') return vcTab;
    if (currentRole === 'dean') return deanTab;
    if (currentRole === 'student') return studentTab;
    if (currentRole === 'faculty') return facultyTab;
    if (currentRole === 'chairman' || currentRole === 'hod') return hodTab;
    if (currentRole === 'admin') return adminTab;
    if (currentRole === 'parent') return parentTab;
    return 'overview';
  };

  const handleTabChange = (tabId: string, subLinkId?: string) => {
    const normalizedTab = currentRole === 'student' && tabId === 'registration' ? 'selection' : tabId;
    if (currentRole === 'vc') setVcTab(normalizedTab);
    else if (currentRole === 'dean') setDeanTab(normalizedTab);
    else if (currentRole === 'student') {
      setStudentTab(normalizedTab);
      if (normalizedTab === 'courses' && subLinkId && subLinkId.includes('-')) {
        setSelectedCourseCode(subLinkId);
      }
    }
    else if (currentRole === 'faculty') setFacultyTab(normalizedTab);
    else if (currentRole === 'chairman' || currentRole === 'hod') setHodTab(normalizedTab);
    else if (currentRole === 'admin') setAdminTab(normalizedTab);
    else if (currentRole === 'parent') setParentTab(normalizedTab);

    setActiveSubTab(subLinkId || '');
    setIsMobileDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Complete module list per role for 1-Tap Mobile & Tablet Horizontal Navigation
  const getRoleModules = (role: UserRole): { id: string; label: string }[] => {
    if (role === 'student') {
      return [
        { id: 'overview', label: 'Dashboard' },
        { id: 'timetable', label: 'Timetable & Exams' },
        { id: 'courses', label: 'Courses' },
        { id: 'selection', label: 'Subject Selection' },
        { id: 'attendance', label: '75% Attendance' },
        { id: 'assignments', label: 'Assignments' },
        { id: 'exams', label: 'QR Admit Slip' },
        { id: 'results', label: 'Transcript & GPA' },
        { id: 'proforma', label: 'HEC QEC' },
        { id: 'fees', label: '1Link Challans' },
        { id: 'profile', label: 'Smart ID' }
      ];
    }
    if (role === 'faculty') {
      return [
        { id: 'overview', label: 'Faculty Dashboard' },
        { id: 'timetable', label: 'Timetable & Exams' },
        { id: 'attendance', label: 'Mark Attendance' },
        { id: 'grading', label: 'Grading & Marks' },
        { id: 'materials', label: 'Courseware Upload' },
        { id: 'risk', label: 'At-Risk (<75%)' },
        { id: 'profile', label: 'Faculty Profile' }
      ];
    }
    if (role === 'parent') {
      return [
        { id: 'overview', label: 'Ward Summary' },
        { id: 'timetable', label: 'Timetable & Exams' },
        { id: 'attendance', label: '75% Attendance' },
        { id: 'results', label: 'Grades & CGPA' },
        { id: 'fees', label: '1Link Fees' },
        { id: 'advisor', label: 'Consult Advisor' },
        { id: 'profile', label: 'Guardian Record' }
      ];
    }
    if (role === 'vc') {
      return [
        { id: 'overview', label: 'VC Radar' },
        { id: 'faculties', label: '14 Faculties' },
        { id: 'timetable', label: 'Master Timetables' },
        { id: 'examinations', label: 'Exam Council' },
        { id: 'governance', label: 'Syndicate' },
        { id: 'finance', label: '1Link Treasury' },
        { id: 'profile', label: 'VC Profile' }
      ];
    }
    if (role === 'dean') {
      return [
        { id: 'overview', label: 'Faculty Radar' },
        { id: 'departments', label: 'Departments' },
        { id: 'faculty', label: 'Teachers Roster' },
        { id: 'timetable', label: 'Timetables & Exams' },
        { id: 'bof', label: 'Board of Faculty' },
        { id: 'accreditation', label: 'OBE & NCEAC' },
        { id: 'profile', label: 'Dean Profile' }
      ];
    }
    if (role === 'chairman' || role === 'hod') {
      return [
        { id: 'overview', label: role === 'chairman' ? 'Dept Radar' : 'Institute Radar' },
        { id: 'timetable', label: 'Timetable & Exams' },
        { id: 'cohorts', label: '2K21–2K24 Batches' },
        { id: 'appeals', label: 'Attendance Appeals' },
        { id: 'accreditation', label: 'NCEAC / OBE' },
        { id: 'broadcast', label: 'Circulars' },
        { id: 'profile', label: 'Credentials' }
      ];
    }
    if (role === 'admin') {
      return [
        { id: 'telemetry', label: 'Cluster Telemetry' },
        { id: 'timetable', label: 'Timetable Engine' },
        { id: 'results', label: 'Result Stage-Gate' },
        { id: 'users', label: 'User Directory' },
        { id: 'audit', label: 'Audit Stream' },
        { id: 'profile', label: 'ITSC Profile' }
      ];
    }
    return [];
  };

  const activeModules = getRoleModules(currentRole);
  const currentActiveTab = getCurrentTab();
  const activeModuleIds = activeModules.map(m => m.id);

  // Swipe left/right on the Horizontal Module Bar & Main Viewport
  const moduleSwipeHandlers = useSwipeNavigation<string>({
    items: activeModuleIds,
    activeItem: currentActiveTab,
    onSelect: (tabId) => {
      handleTabChange(tabId);
    },
    minSwipeDistance: 42,
    ignoreScrollableChildren: true,
    onSwipeFeedback: (dir, targetId) => {
      const targetMod = activeModules.find(m => m.id === targetId);
      if (targetMod) {
        showSwipeToast(`${dir === 'left' ? 'Swiped ←' : 'Swiped →'} ${targetMod.label}`);
      }
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6f8] text-slate-900 font-sans">
      {/* Universal Institutional Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={(role) => {
          setCurrentRole(role);
          setIsMobileDrawerOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        unreadCount={unreadCount}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNoticeModal={() => setIsNoticeModalOpen(true)}
        onOpenModernizationDoc={() => setIsModernizationDocOpen(true)}
        onToggleSidebar={() => setIsMobileDrawerOpen(prev => !prev)}
        activeCourseCode={selectedCourseCode}
        onSelectCourse={handleSelectCourse}
        studentTab={studentTab}
        onSelectStudentTab={(tab) => {
          setCurrentRole('student');
          setStudentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeDepartmentName={activeStudent.department.replace('Department of ', '').replace('Institute of ', '')}
        activeBatchName={activeStudent.batch.split(' ')[0]}
      />

      {/* Main Body Area: Dynamic Responsive App Shell */}
      {currentRole === 'public' ? (
        <main className="flex-1 pb-24 lg:pb-0">
          <PublicPortal
            onSelectRole={(role) => {
              setCurrentRole(role);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAudit={() => {
              setCurrentRole('architecture');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      ) : currentRole === 'architecture' ? (
        <main className="flex-1 pb-24 lg:pb-0">
          <ArchitecturePortal />
        </main>
      ) : (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Collapsible Desktop Enterprise Sidebar & Mobile Slide-Over Sidebar */}
          <AppSidebar
            currentRole={currentRole}
            activeTab={currentActiveTab}
            activeSubTab={activeSubTab}
            onTabChange={handleTabChange}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
            isMobileOpen={isMobileDrawerOpen}
            onCloseMobile={() => setIsMobileDrawerOpen(false)}
            onSelectRole={(role) => {
              setCurrentRole(role);
              setActiveSubTab('');
              setIsMobileDrawerOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Persona Main Viewport (Supports Horizontal Swipe-Left / Swipe-Right Between Tabs on Mobile) */}
          <main
            onTouchStart={moduleSwipeHandlers.onTouchStart}
            onTouchEnd={moduleSwipeHandlers.onTouchEnd}
            className="flex-1 overflow-y-auto pb-24 lg:pb-0"
          >
            {currentRole === 'vc' && (
              <VcPortal
                activeTab={vcTab}
                activeSubTab={activeSubTab}
                onTabChange={setVcTab}
                onSubTabChange={setActiveSubTab}
                onAddAuditLog={handleAddAuditLog}
                onNavigateToFaculty={() => {
                  setCurrentRole('dean');
                  setActiveSubTab('');
                }}
                timetableSlots={timetableSlots}
                onUpdateSlots={setTimetableSlots}
                examEntries={examEntries}
                onUpdateExams={setExamEntries}
                timetableSettings={timetableSettings}
                onUpdateSettings={setTimetableSettings}
              />
            )}

            {currentRole === 'dean' && (
              <DeanPortal
                activeTab={deanTab}
                activeSubTab={activeSubTab}
                onTabChange={setDeanTab}
                onSubTabChange={setActiveSubTab}
                onAddAuditLog={handleAddAuditLog}
                onNavigateToDepartment={() => {
                  setCurrentRole('hod');
                  setActiveSubTab('');
                }}
                timetableSlots={timetableSlots}
                onUpdateSlots={setTimetableSlots}
                examEntries={examEntries}
                onUpdateExams={setExamEntries}
                timetableSettings={timetableSettings}
                onUpdateSettings={setTimetableSettings}
              />
            )}

            {currentRole === 'student' && (
              <StudentPortal
                activeTab={studentTab}
                activeSubTab={activeSubTab}
                onTabChange={setStudentTab}
                onSubTabChange={setActiveSubTab}
                selectedCourseCode={selectedCourseCode}
                onSelectCourseCode={(code) => {
                  setSelectedCourseCode(code);
                  setActiveSubTab(code);
                }}
                selectedStudentId={activeStudentId}
                onSelectStudentId={setActiveStudentId}
                onAuditClick={() => setCurrentRole('architecture')}
                onAddAuditLog={handleAddAuditLog}
                timetableSlots={timetableSlots}
                onUpdateSlots={setTimetableSlots}
                examEntries={examEntries}
                onUpdateExams={setExamEntries}
                timetableSettings={timetableSettings}
                onUpdateSettings={setTimetableSettings}
              />
            )}

            {currentRole === 'faculty' && (
              <FacultyPortal
                activeTab={facultyTab}
                activeSubTab={activeSubTab}
                onTabChange={setFacultyTab}
                onSubTabChange={setActiveSubTab}
                onAddAuditLog={handleAddAuditLog}
                timetableSlots={timetableSlots}
                onUpdateSlots={setTimetableSlots}
                examEntries={examEntries}
                onUpdateExams={setExamEntries}
                timetableSettings={timetableSettings}
                onUpdateSettings={setTimetableSettings}
              />
            )}

            {(currentRole === 'chairman' || currentRole === 'hod') && (
              <HodPortal
                activeTab={hodTab}
                activeSubTab={activeSubTab}
                onTabChange={setHodTab}
                onSubTabChange={setActiveSubTab}
                isChairman={currentRole === 'chairman'}
                initialDeptId={currentRole === 'hod' ? 'dept_iba' : 'dept_swe'}
                onAddAuditLog={handleAddAuditLog}
                timetableSlots={timetableSlots}
                onUpdateSlots={setTimetableSlots}
                examEntries={examEntries}
                onUpdateExams={setExamEntries}
                timetableSettings={timetableSettings}
                onUpdateSettings={setTimetableSettings}
              />
            )}

            {currentRole === 'admin' && (
              <AdminPortal
                activeTab={adminTab}
                activeSubTab={activeSubTab}
                onTabChange={setAdminTab}
                onSubTabChange={setActiveSubTab}
                auditLogs={auditLogs}
                onAddAuditLog={handleAddAuditLog}
                timetableSlots={timetableSlots}
                onUpdateSlots={setTimetableSlots}
                examEntries={examEntries}
                onUpdateExams={setExamEntries}
                timetableSettings={timetableSettings}
                onUpdateSettings={setTimetableSettings}
              />
            )}

            {currentRole === 'parent' && (
              <ParentPortal
                activeTab={parentTab}
                activeSubTab={activeSubTab}
                onTabChange={setParentTab}
                onSubTabChange={setActiveSubTab}
                onAddAuditLog={handleAddAuditLog}
                timetableSlots={timetableSlots}
                onUpdateSlots={setTimetableSlots}
                examEntries={examEntries}
                onUpdateExams={setExamEntries}
                timetableSettings={timetableSettings}
                onUpdateSettings={setTimetableSettings}
              />
            )}
          </main>
        </div>
      )}

      {/* Universal Institutional Footer */}
      <Footer 
        onSelectRole={(role) => {
          setCurrentRole(role);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
        onOpenNoticeModal={() => setIsNoticeModalOpen(true)}
        onOpenModernizationDoc={() => setIsModernizationDocOpen(true)}
      />

      {/* High-frequency Mobile Bottom Navigation (Active on all views on mobile) */}
      <MobileBottomNav
        currentRole={currentRole}
        activeTab={currentActiveTab}
        onTabChange={handleTabChange}
        onRoleChange={(role) => {
          setCurrentRole(role);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          showSwipeToast(`Portal: ${role.toUpperCase()}`);
        }}
        onOpenMenu={() => setIsMobileDrawerOpen(true)}
      />

      {/* Tactile Mobile Swipe Gesture Feedback Pill */}
      {swipeFeedback && (
        <div className="lg:hidden fixed bottom-16 left-1/2 -translate-x-1/2 z-50 px-3.5 py-1.5 rounded-full bg-[#004b87]/95 text-white border border-[#c8e27b]/50 shadow-xl text-xs font-bold flex items-center gap-2 pointer-events-none animate-in fade-in duration-150">
          <ArrowLeftRight className="w-3.5 h-3.5 text-[#c8e27b]" />
          <span>{swipeFeedback}</span>
        </div>
      )}

      {/* Slide-out Mobile Navigation Drawer (For Public & Architecture Pages) */}
      {isMobileDrawerOpen && (currentRole === 'public' || currentRole === 'architecture') && (
        <div className="fixed inset-0 z-50 flex justify-start bg-slate-900/50 backdrop-blur-xs lg:hidden animate-in fade-in">
          <div className="w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col border-r border-slate-200 animate-in slide-in-from-left">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-[#004b87] text-white">
              <div className="flex items-center gap-2.5">
                <div className="p-1 bg-white rounded-xl border border-[#d8dadb] shrink-0">
                  <UniversitySeal size="sm" />
                </div>
                <div className="text-xs font-bold leading-tight">
                  University of Sindh LMS
                  <div className="text-[10px] font-normal text-[#c8e27b]">Allama II Qazi Campus</div>
                </div>
              </div>
              <button 
                onClick={() => setIsMobileDrawerOpen(false)}
                className="min-w-[36px] min-h-[36px] p-1 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 flex items-center justify-center cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              {/* Active Portal Modules */}
              {activeModules.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#0068b5] font-mono">
                    Current Workspace Tools
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {activeModules.map(item => (
                      <button
                        key={item.id}
                        onClick={() => handleTabChange(item.id)}
                        className={`min-h-[40px] w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer ${
                          currentActiveTab === item.id
                            ? 'bg-[#0068b5] text-white font-bold shadow-2xs'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{item.label}</span>
                        {currentActiveTab === item.id && <span className="w-2 h-2 rounded-full bg-[#c8e27b]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Switch Portal Role */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Switch University Portal
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {([
                    { role: 'public', label: 'Portal Home' },
                    { role: 'student', label: 'Student LMS' },
                    { role: 'faculty', label: 'Faculty Portal' },
                    { role: 'parent', label: 'Parents View' },
                    { role: 'vc', label: 'VC Office' },
                    { role: 'dean', label: 'Dean Office' },
                    { role: 'chairman', label: 'Chairman' },
                    { role: 'hod', label: 'Director / HOD' },
                    { role: 'admin', label: 'ITSC Admin' },
                    { role: 'architecture', label: 'Architecture' }
                  ] as { role: UserRole; label: string }[]).map(item => (
                    <button
                      key={item.role}
                      onClick={() => {
                        setCurrentRole(item.role);
                        setIsMobileDrawerOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`min-h-[40px] text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between border cursor-pointer ${
                        currentRole === item.role
                          ? 'bg-[#eef4e3] text-[#4c6418] border-[#84a433]/50 font-bold'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500 text-center">
              University of Sindh · Allama II Qazi Campus
            </div>
          </div>
        </div>
      )}

      {/* Slide-over Notification Center */}
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
        onSelectNotification={(item) => {
          if (item.actionUrl?.startsWith('/student')) {
            setCurrentRole('student');
            const tab = item.actionUrl.split('/')[2];
            if (tab) setStudentTab(tab);
          }
          setIsNotificationOpen(false);
        }}
      />

      {/* Global Spotlight Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Welcome & AI Research / Sample Data Disclaimer Modal (Special Responsive Design for all screens) */}
      <PlatformNoticeModal
        isOpen={isNoticeModalOpen}
        onClose={() => setIsNoticeModalOpen(false)}
        onOpenArchitecture={() => {
          setCurrentRole('architecture');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Official 9-Page LMS & E-Portal Modernization Document Modal */}
      <ModernizationDocModal
        isOpen={isModernizationDocOpen}
        onClose={() => setIsModernizationDocOpen(false)}
        onNavigateToArchitecture={() => {
          setCurrentRole('architecture');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
