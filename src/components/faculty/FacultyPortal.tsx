import React, { useState } from 'react';
import { 
  UNIVERSITY_TEACHERS, 
  ENROLLED_COURSES 
} from '../../data/mockAcademicData';
import { UniversitySeal } from '../common/UniversitySeal';
import { TimetableMasterEngine } from '../common/TimetableMasterEngine';
import {
  ClassTimetableSlot,
  ExamDatesheetEntry,
  UniversityTimetableSettings
} from '../../data/timetableData';
import { 
  Users, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Upload, 
  FileCheck, 
  Calendar,
  Save,
  MessageSquare,
  ShieldCheck,
  Building2,
  Filter,
  ArrowRight
} from 'lucide-react';

interface FacultyPortalProps {
  onAddAuditLog: (log: any) => void;
  activeTab?: string;
  activeSubTab?: string;
  onTabChange?: (tab: string) => void;
  onSubTabChange?: (sub: string) => void;
  timetableSlots: ClassTimetableSlot[];
  onUpdateSlots: React.Dispatch<React.SetStateAction<ClassTimetableSlot[]>>;
  examEntries: ExamDatesheetEntry[];
  onUpdateExams: React.Dispatch<React.SetStateAction<ExamDatesheetEntry[]>>;
  timetableSettings: UniversityTimetableSettings;
  onUpdateSettings: React.Dispatch<React.SetStateAction<UniversityTimetableSettings>>;
}

export const FacultyPortal: React.FC<FacultyPortalProps> = ({ 
  onAddAuditLog,
  activeTab: controlledTab,
  activeSubTab: controlledSubTab,
  onTabChange: setControlledTab,
  onSubTabChange,
  timetableSlots,
  onUpdateSlots,
  examEntries,
  onUpdateExams,
  timetableSettings,
  onUpdateSettings
}) => {
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>('tch_rafique');
  const [selectedCourse, setSelectedCourse] = useState<string>('SWE-401');
  const [internalTab, setInternalTab] = useState<'overview' | 'timetable' | 'attendance' | 'grading' | 'materials' | 'risk' | 'profile'>('overview');
  const [internalAttSub, setInternalAttSub] = useState<'roster' | 'register'>('roster');
  const [internalGradSub, setInternalGradSub] = useState<'quizzes' | 'midfinals'>('quizzes');
  const [facultyToast, setFacultyToast] = useState<string | null>(null);

  const [coursewareFiles, setCoursewareFiles] = useState([
    { id: 'cw_1', title: 'Week 08 — Microservices Event-Driven Architecture & Saga Pattern.pdf', type: 'Lecture Slides', date: 'Oct 08, 2026', size: '4.2 MB' },
    { id: 'cw_2', title: 'Lab 07 — Docker Compose & API Gateway Service Discovery.zip', type: 'Lab Manual', date: 'Oct 05, 2026', size: '8.7 MB' },
    { id: 'cw_3', title: 'OBE Course Outline & CLO-PLO Mapping Matrix (Fall 2026).pdf', type: 'Syllabus', date: 'Sep 12, 2026', size: '1.8 MB' }
  ]);
  const [newMaterialTitle, setNewMaterialTitle] = useState('');
  const [newMaterialType, setNewMaterialType] = useState('Lecture Slides');

  const showToast = (msg: string) => {
    setFacultyToast(msg);
    setTimeout(() => setFacultyToast(null), 3500);
  };

  const currentTeacher = UNIVERSITY_TEACHERS.find(t => t.id === selectedTeacherId) || UNIVERSITY_TEACHERS[0];

  const activeTab = controlledTab || internalTab;
  const setActiveTab = (tab: any) => {
    if (setControlledTab) {
      setControlledTab(tab);
    } else {
      setInternalTab(tab);
    }
  };

  const attSubView = controlledSubTab === 'register' ? 'register' : controlledSubTab === 'roster' ? 'roster' : internalAttSub;
  const gradSubView = controlledSubTab === 'midfinals' ? 'midfinals' : controlledSubTab === 'quizzes' ? 'quizzes' : internalGradSub;

  // Attendance marking roster state
  const [roster, setRoster] = useState([
    { roll: '2K23/SWE/104', name: 'Ali Hassan Chand', status: 'Present' },
    { roll: '2K23/SWE/045', name: 'Abdul Hannan Memon', status: 'Present' },
    { roll: '2K23/SWE/078', name: 'Haris Ahmed Ansari', status: 'Present' },
    { roll: '2K23/SWE/101', name: 'Abdul Samad', status: 'Present' },
    { roll: '2K23/SWE/102', name: 'Areeba Shaikh', status: 'Present' },
    { roll: '2K23/SWE/103', name: 'Bilal Ahmed', status: 'Present' },
    { roll: '2K23/SWE/105', name: 'Dua Memon', status: 'Absent' },
    { roll: '2K23/SWE/108', name: 'Kamran Soomro', status: 'Late' }
  ]);
  const [attendanceSaved, setAttendanceSaved] = useState(false);

  // Grading state
  const [submissions, setSubmissions] = useState([
    { id: 'sub_01', roll: '2K23/SWE/104', name: 'Ali Hassan Chand', assignment: 'Enterprise Architecture Case Study', submitted: '2026-10-06', marks: 24, maxMarks: 25, feedback: 'Rigorous event model design. Great adherence to DDD.' },
    { id: 'sub_02', roll: '2K23/SWE/045', name: 'Abdul Hannan Memon', assignment: 'Enterprise Architecture Case Study', submitted: '2026-10-07', marks: 23, maxMarks: 25, feedback: 'Strong architectural decomposition. Clean layer boundaries.' },
    { id: 'sub_03', roll: '2K23/SWE/078', name: 'Haris Ahmed Ansari', assignment: 'Enterprise Architecture Case Study', submitted: '2026-10-07', marks: 22, maxMarks: 25, feedback: 'Good component diagrams. Need deeper data layer description.' }
  ]);

  const toggleStudentStatus = (roll: string) => {
    setRoster(prev => prev.map(s => {
      if (s.roll === roll) {
        const nextStatus = s.status === 'Present' ? 'Absent' : s.status === 'Absent' ? 'Late' : 'Present';
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  const handleMarkAllPresent = () => {
    setRoster(prev => prev.map(s => ({ ...s, status: 'Present' })));
  };

  const handleSubmitAttendance = () => {
    const presentCount = roster.filter(s => s.status === 'Present').length;
    const absentCount = roster.filter(s => s.status === 'Absent').length;

    onAddAuditLog({
      id: 'log_' + Date.now().toString().slice(-4),
      who: `${currentTeacher.name} (${currentTeacher.designation})`,
      role: 'Teacher / Faculty',
      what: `Lecture Attendance Locked for Course ${selectedCourse}`,
      category: 'Attendance',
      when: new Date().toLocaleString() + ' PKT',
      whereIp: '10.14.2.18 (Faculty Terminal)',
      objectTarget: `Course: ${selectedCourse} · Dept: ${currentTeacher.departmentName}`,
      beforeState: 'Unsubmitted',
      afterState: `Submitted & Locked (${presentCount} Present, ${absentCount} Absent)`,
      reason: 'Regular Lecture Session Conduct',
      referenceId: 'ATT-LOCK-' + Date.now().toString().slice(-6)
    });

    setAttendanceSaved(true);
    setTimeout(() => setAttendanceSaved(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3.5 sm:py-6 space-y-4 sm:space-y-6">
      {/* Faculty Instructor Header */}
      <div className="bg-white border border-[#d8dadb] rounded-2xl shadow-2xs overflow-hidden">
        <div className="bg-[#004b87] text-white px-4 sm:px-6 py-3.5 sm:py-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#003865]">
          <div className="flex items-center gap-3">
            <div className="p-1 bg-white rounded-xl border border-[#d8dadb] shrink-0">
              <UniversitySeal size="sm" monochrome={false} />
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#c8e27b] uppercase font-mono">
                Teacher E-Portal &amp; Academic Workspace
              </div>
              <h1 className="text-sm sm:text-lg font-bold text-white tracking-tight">
                {currentTeacher.departmentName}
              </h1>
            </div>
          </div>

          {/* Teacher Selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-[#c8e27b] hidden sm:inline">Instructor:</span>
            <select
              value={selectedTeacherId}
              onChange={(e) => setSelectedTeacherId(e.target.value)}
              className="w-full sm:w-auto min-h-[36px] px-3 py-1.5 rounded-xl border border-white/25 bg-white/10 text-white text-xs font-semibold backdrop-blur-xs cursor-pointer focus:outline-hidden"
            >
              {UNIVERSITY_TEACHERS.map(tch => (
                <option key={tch.id} value={tch.id} className="text-slate-900 bg-white">
                  {tch.name} ({tch.designation})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Teacher Details & Course Selector */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center bg-gradient-to-b from-slate-50/50 to-white">
          <div className="lg:col-span-5 flex items-center gap-3.5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#004b87] text-[#c8e27b] flex items-center justify-center font-serif-academic text-sm sm:text-base font-bold border border-[#003866] shadow-xs shrink-0 tracking-wide">
              FAC
            </div>
            <div className="space-y-0.5 min-w-0">
              <div className="text-[10px] sm:text-[11px] font-bold text-[#004b87] uppercase tracking-wider font-mono">
                {currentTeacher.designation}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug truncate">
                {currentTeacher.name}
              </h2>
              <div className="text-[11px] sm:text-xs text-slate-600 font-mono truncate">
                {currentTeacher.email} • {currentTeacher.officeRoom}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-wrap items-center lg:justify-end gap-2">
            <span className="text-xs font-semibold text-slate-600">Course Roster:</span>
            <div className="flex flex-wrap gap-1.5">
              {currentTeacher.activeCourses.map((c, idx) => {
                const code = c.split(' ')[0];
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedCourse(code)}
                    className={`min-h-[36px] px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-colors cursor-pointer ${
                      selectedCourse === code
                        ? 'bg-[#004b87] text-white shadow-xs'
                        : 'bg-[#f4f6f8] text-slate-700 hover:bg-slate-200 border border-[#d8dadb]'
                    }`}
                  >
                    {code}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Academic Context Header (Zero Secondary Navbar Clutter) */}
        <div className="px-6 py-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
              {activeTab === 'overview' && <Building2 className="w-4 h-4 text-emerald-800" />}
              {activeTab === 'timetable' && <Calendar className="w-4 h-4 text-[#004b87]" />}
              {activeTab === 'attendance' && <Clock className="w-4 h-4 text-emerald-800" />}
              {activeTab === 'grading' && <FileCheck className="w-4 h-4 text-blue-900" />}
              {activeTab === 'materials' && <BookOpen className="w-4 h-4 text-indigo-800" />}
              {activeTab === 'risk' && <AlertTriangle className="w-4 h-4 text-amber-800" />}
              {activeTab === 'profile' && <ShieldCheck className="w-4 h-4 text-emerald-800" />}
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                {activeTab === 'overview' && 'Faculty Teaching Overview & Course Schedule'}
                {activeTab === 'timetable' && 'Assigned Lecture Timetable & Examination Invigilation Schedule'}
                {activeTab === 'attendance' && 'Lecture Attendance Register & Digital Roster'}
                {activeTab === 'grading' && 'Continuous Assessments & Gradebook Entry'}
                {activeTab === 'materials' && 'Courseware Repository & Learning Resources'}
                {activeTab === 'risk' && 'At-Risk Scholars Attendance Watchlist (<75%)'}
                {activeTab === 'profile' && 'Faculty Academic Profile & Office Consultation Hours'}
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Department of Software Engineering, FET · Allama II Qazi Campus
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            Active Term: Fall 2026
          </div>
        </div>

        {/* Desktop & Tablet In-Portal Module Switcher Strip */}
        <div className="hidden lg:flex px-6 border-t border-slate-200/80 items-center gap-1 overflow-x-auto text-xs font-semibold bg-white">
          {[
            { id: 'overview', label: 'Faculty Dashboard', icon: <Building2 className="w-3.5 h-3.5" /> },
            { id: 'timetable', label: 'Teaching & Exam Timetable', icon: <Calendar className="w-3.5 h-3.5" /> },
            { id: 'attendance', label: 'Lecture Attendance', icon: <Clock className="w-3.5 h-3.5" /> },
            { id: 'grading', label: 'Assessments & Grading', icon: <FileCheck className="w-3.5 h-3.5" /> },
            { id: 'materials', label: 'Courseware Uploader', icon: <BookOpen className="w-3.5 h-3.5" /> },
            { id: 'risk', label: 'At-Risk Students (<75%)', icon: <AlertTriangle className="w-3.5 h-3.5" /> },
            { id: 'profile', label: 'Academic Profile', icon: <ShieldCheck className="w-3.5 h-3.5" /> }
          ].map(tab => {
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-3.5 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
                  isCurrent
                    ? 'border-[#0068b5] text-[#004b87] font-bold bg-[#0068b5]/5'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {facultyToast && (
        <div className="p-4 rounded-xl bg-[#004b87] text-white border border-[#c8e27b]/40 text-xs font-semibold flex items-center gap-2 shadow-md animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#c8e27b] shrink-0" />
          <span>{facultyToast}</span>
        </div>
      )}

      {attendanceSaved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Lecture attendance officially recorded and locked into University Examination Core.</span>
        </div>
      )}

      {/* =========================================================
          TAB 0: FACULTY TEACHING DASHBOARD
         ========================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Today's Schedule</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800">2 Lectures</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-900">SWE-401 Software Architecture</div>
                  <div className="text-slate-500 text-[11px]">09:00 AM – 10:30 AM · FET Lab 3</div>
                  <div className="text-emerald-700 font-semibold text-[10px] mt-1">● Attendance Marked</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <div className="font-bold text-slate-900">CS-411 Cyber Law & Ethics</div>
                  <div className="text-slate-500 text-[11px]">11:30 AM – 01:00 PM · Lecture Hall 2</div>
                  <div className="text-amber-700 font-semibold text-[10px] mt-1">○ Pending Attendance Roster</div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Coursework</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800">Semester 7</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Enrolled Students</span>
                  <span className="font-mono font-bold text-slate-900">128 Scholars</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Pending Lab Submissions</span>
                  <span className="font-mono font-bold text-amber-700">14 to Grade</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Average Class Attendance</span>
                  <span className="font-mono font-bold text-emerald-700">89.4%</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-600">Course Outlines Mapped (OBE)</span>
                  <span className="font-bold text-blue-900">100% CLOs Aligned</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Quick Faculty Actions</span>
                <span className="text-xs font-mono text-slate-400">Fast LMS</span>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('timetable')}
                  className="w-full text-left p-2.5 rounded-lg bg-[#004b87]/10 hover:bg-[#004b87] text-[#004b87] hover:text-white font-semibold text-xs transition-colors flex items-center justify-between cursor-pointer group"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Assigned Timetable &amp; Exam Datesheet</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setActiveTab('attendance')}
                  className="w-full text-left p-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-semibold text-xs transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Take Daily Lecture Attendance</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
                </button>
                <button
                  onClick={() => setActiveTab('grading')}
                  className="w-full text-left p-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-950 font-semibold text-xs transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <FileCheck className="w-3.5 h-3.5 text-blue-700" />
                    <span>Input Midterm & Quiz Grades</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-700" />
                </button>
                <button
                  onClick={() => setActiveTab('materials')}
                  className="w-full text-left p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-xs transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-slate-700" />
                    <span>Upload Courseware Slides & Labs</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-700" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 0B: TEACHING & EXAM TIMETABLE (ASSIGNED BY CHAIRMAN/HOD)
         ========================================================= */}
      {activeTab === 'timetable' && (
        <TimetableMasterEngine
          role="faculty"
          canManage={false}
          initialDeptId={currentTeacher.departmentId}
          lockedTeacherName={currentTeacher.name}
          activeSubView={controlledSubTab || 'teachers'}
          onSubViewChange={onSubTabChange}
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
          TAB 1: LECTURE ATTENDANCE ROSTER & CUMULATIVE REGISTER
         ========================================================= */}
      {activeTab === 'attendance' && (
        <div className="bg-white border border-[#d8dadb] rounded-2xl p-4 sm:p-6 shadow-2xs space-y-4 sm:space-y-5 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Course: {selectedCourse} • {attSubView === 'register' ? 'Cumulative Semester Attendance Register' : 'Daily Lecture Attendance Roster'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {attSubView === 'register'
                  ? 'Cumulative 16-week attendance ledger and 75% HEC examination eligibility status.'
                  : 'Tap Present, Absent, or Late for any scholar, then lock the roster.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 bg-[#f4f6f8] p-1 rounded-xl border border-[#d8dadb]">
                <button
                  onClick={() => {
                    setInternalAttSub('roster');
                    onSubTabChange?.('roster');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    attSubView === 'roster' ? 'bg-[#0068b5] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Mark Daily Roster
                </button>
                <button
                  onClick={() => {
                    setInternalAttSub('register');
                    onSubTabChange?.('register');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    attSubView === 'register' ? 'bg-[#0068b5] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Attendance Book
                </button>
              </div>
              {attSubView === 'roster' && (
                <>
                  <button
                    onClick={handleMarkAllPresent}
                    className="min-h-[38px] py-1.5 px-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                  >
                    Mark All Present
                  </button>
                  <button
                    onClick={handleSubmitAttendance}
                    className="min-h-[38px] py-1.5 px-4 rounded-xl bg-[#84a433] hover:bg-[#739129] text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Lock Roster</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {attSubView === 'register' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500 uppercase">
                  <tr>
                    <th className="py-2.5 px-3">Roll Number</th>
                    <th className="py-2.5 px-3">Scholar Name</th>
                    <th className="py-2.5 px-3">Conducted</th>
                    <th className="py-2.5 px-3">Attended</th>
                    <th className="py-2.5 px-3">Percentage</th>
                    <th className="py-2.5 px-3">HEC 75% Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {roster.map((s, idx) => {
                    const conducted = 24;
                    const attended = s.status === 'Absent' ? 16 : s.status === 'Late' ? 17 : 22 - (idx % 3);
                    const pct = Math.round((attended / conducted) * 100);
                    const eligible = pct >= 75;
                    return (
                      <tr key={s.roll} className="hover:bg-slate-50/70">
                        <td className="py-3 px-3 font-mono font-bold text-[#004b87]">{s.roll}</td>
                        <td className="py-3 px-3 font-bold text-slate-900">{s.name}</td>
                        <td className="py-3 px-3 font-mono text-slate-600">{conducted}</td>
                        <td className="py-3 px-3 font-mono font-semibold text-slate-900">{attended}</td>
                        <td className="py-3 px-3 font-mono font-bold">
                          <span className={eligible ? 'text-emerald-700' : 'text-rose-700'}>{pct}%</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            eligible
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-rose-50 text-rose-800 border-rose-200'
                          }`}>
                            {eligible ? 'Cleared for Exam' : 'Below 75% Alert'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {roster.map((s) => (
                <div key={s.roll} className="py-3 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:bg-slate-50/70 rounded-xl">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="font-mono text-xs font-bold text-[#004b87] bg-[#f4f6f8] px-2.5 py-1 rounded-lg border border-[#d8dadb] shrink-0">
                      {s.roll}
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                      {s.name}
                    </span>
                  </div>

                  {/* 1-Tap Touch Status Buttons for Mobile & Desktop */}
                  <div className="grid grid-cols-3 sm:flex items-center gap-1.5 shrink-0">
                    {(['Present', 'Absent', 'Late'] as const).map((statusOption) => {
                      const isSelected = s.status === statusOption;
                      return (
                        <button
                          key={statusOption}
                          type="button"
                          onClick={() =>
                            setRoster(prev =>
                              prev.map(item =>
                                item.roll === s.roll ? { ...item, status: statusOption } : item
                              )
                            )
                          }
                          className={`min-h-[34px] px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? statusOption === 'Present'
                                ? 'bg-[#007a33] text-white shadow-2xs'
                                : statusOption === 'Absent'
                                ? 'bg-rose-600 text-white shadow-2xs'
                                : 'bg-amber-500 text-white shadow-2xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {statusOption}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          TAB 2: GRADING & ASSESSMENTS (WITH SUB-TABS)
         ========================================================= */}
      {activeTab === 'grading' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-5 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {gradSubView === 'midfinals' ? `Midterm & Final Examination Marks Entry (${selectedCourse})` : `Continuous Assessment & Rubric Scoring (${selectedCourse})`}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {gradSubView === 'midfinals'
                  ? 'Enter terminal and midterm scores mapped to OBE Course Learning Outcomes (CLOs).'
                  : `Assignment submissions and OBE rubric scores for course ${selectedCourse}.`}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 bg-[#f4f6f8] p-1 rounded-xl border border-[#d8dadb]">
                <button
                  onClick={() => {
                    setInternalGradSub('quizzes');
                    onSubTabChange?.('quizzes');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    gradSubView === 'quizzes' ? 'bg-[#0068b5] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Quizzes &amp; Assignments
                </button>
                <button
                  onClick={() => {
                    setInternalGradSub('midfinals');
                    onSubTabChange?.('midfinals');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    gradSubView === 'midfinals' ? 'bg-[#0068b5] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Midterm / Final Entry
                </button>
              </div>
              <button
                onClick={() => showToast(`Award list and OBE grades for ${selectedCourse} saved and transmitted to HOD Moderation.`)}
                className="px-3.5 py-2 rounded-xl bg-[#004b87] hover:bg-[#0068b5] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 text-[#c8e27b]" />
                <span>Save Award List</span>
              </button>
            </div>
          </div>

          {gradSubView === 'midfinals' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500 uppercase">
                  <tr>
                    <th className="py-2.5 px-3">Roll Number</th>
                    <th className="py-2.5 px-3">Scholar Name</th>
                    <th className="py-2.5 px-3">Sessional (20)</th>
                    <th className="py-2.5 px-3">Midterm (30)</th>
                    <th className="py-2.5 px-3">Final Exam (50)</th>
                    <th className="py-2.5 px-3">Total (100)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {roster.slice(0, 6).map((s, idx) => {
                    const sess = 18 - (idx % 3);
                    const mid = 26 - (idx % 4);
                    const fin = 44 - (idx % 5);
                    return (
                      <tr key={s.roll} className="hover:bg-slate-50/70 font-mono">
                        <td className="py-2.5 px-3 font-bold text-[#004b87]">{s.roll}</td>
                        <td className="py-2.5 px-3 font-sans font-bold text-slate-900">{s.name}</td>
                        <td className="py-2.5 px-3">{sess} / 20</td>
                        <td className="py-2.5 px-3">{mid} / 30</td>
                        <td className="py-2.5 px-3">{fin} / 50</td>
                        <td className="py-2.5 px-3 font-bold text-emerald-700">{sess + mid + fin}% (A)</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="space-y-3">
              {submissions.map((sub) => (
                <div key={sub.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">{sub.roll}</span>
                      <strong className="text-xs text-slate-900">{sub.name}</strong>
                      <span className="text-[11px] text-slate-500">Submitted: {sub.submitted}</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-800">{sub.assignment}</div>
                    <div className="text-xs text-slate-600 italic">Feedback: "{sub.feedback}"</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-base font-black text-emerald-800 font-mono">{sub.marks} / {sub.maxMarks}</div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono">OBE Score</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          TAB 3: COURSEWARE & RESOURCES (INTERACTIVE REPOSITORY)
         ========================================================= */}
      {activeTab === 'materials' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-5 animate-in fade-in">
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Courseware &amp; Lecture Slides Distribution ({selectedCourse})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Uploaded resources automatically sync to enrolled student dashboards and weekly lesson modules.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#004b87] bg-[#f4f6f8] px-3 py-1.5 rounded-xl border border-[#d8dadb]">
              {coursewareFiles.length} Published Files
            </span>
          </div>

          {/* Interactive Courseware Publish Form */}
          <div className="p-5 border-2 border-dashed border-[#0068b5]/30 rounded-2xl bg-[#f4f6f8]/70 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#0068b5] text-white shrink-0">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">Publish New Lecture Deck, Lab Manual, or OBE Handout</p>
                <p className="text-[11px] text-slate-500">Supported formats: PDF, PPTX, DOCX, ZIP (Instant sync to Student LMS)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <input
                type="text"
                value={newMaterialTitle}
                onChange={(e) => setNewMaterialTitle(e.target.value)}
                placeholder="e.g., Week 09 — Distributed Consensus & Raft Protocol Slides.pdf"
                className="sm:col-span-6 px-3.5 py-2 rounded-xl bg-white border border-[#d8dadb] text-xs text-slate-900 focus:outline-hidden focus:border-[#0068b5]"
              />
              <select
                value={newMaterialType}
                onChange={(e) => setNewMaterialType(e.target.value)}
                className="sm:col-span-3 px-3 py-2 rounded-xl bg-white border border-[#d8dadb] text-xs font-semibold text-slate-800 cursor-pointer"
              >
                <option value="Lecture Slides">Lecture Slides</option>
                <option value="Lab Manual">Lab Manual</option>
                <option value="Reference Reading">Reference Reading</option>
              </select>
              <button
                type="button"
                onClick={() => {
                  const titleToUse = newMaterialTitle.trim() || `Week 09 — ${selectedCourse} Advanced Lecture Handout.pdf`;
                  setCoursewareFiles(prev => [
                    {
                      id: 'cw_' + Date.now(),
                      title: titleToUse,
                      type: newMaterialType,
                      date: 'Just now',
                      size: '3.6 MB'
                    },
                    ...prev
                  ]);
                  setNewMaterialTitle('');
                  showToast(`Published "${titleToUse}" to ${selectedCourse} Student Course Workspace.`);
                }}
                className="sm:col-span-3 py-2 px-4 rounded-xl bg-[#0068b5] hover:bg-[#004b87] text-white text-xs font-bold cursor-pointer transition-colors shadow-xs"
              >
                Upload &amp; Publish
              </button>
            </div>
          </div>

          {/* Published Courseware List */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              Published Course Repository ({selectedCourse})
            </h4>
            {coursewareFiles.map((file) => (
              <div key={file.id} className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#0068b5]/40 flex flex-wrap items-center justify-between gap-3 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-blue-50 text-[#004b87] shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">{file.title}</div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {file.type} · {file.date} · {file.size}
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold">
                  Synced to Students
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 4: AT-RISK SCHOLARS
         ========================================================= */}
      {activeTab === 'risk' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>At-Risk Students Below 75% HEC Minimum Attendance</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Scholars identified for examination debarment unless remediated before final cutoff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-rose-900">2K23/SWE/105 • Dua Memon</span>
                <span className="text-xs font-black text-rose-700 font-mono">68% Attendance</span>
              </div>
              <p className="text-xs text-slate-700">
                Missed 4 consecutive lab sessions. Automated advisory alert dispatched to registered guardian mobile.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-900">2K23/SWE/108 • Kamran Soomro</span>
                <span className="text-xs font-black text-amber-700 font-mono">72% Attendance</span>
              </div>
              <p className="text-xs text-slate-700">
                Requires 100% attendance in next 3 lectures to cross the mandatory 75% threshold for admit card generation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB: FACULTY ACADEMIC PROFILE & OFFICE HOURS
         ========================================================= */}
      {activeTab === 'profile' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#0b2545] p-2 flex items-center justify-center shadow-md">
                <UniversitySeal size="lg" showText={false} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-900">{currentTeacher.name}</h3>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-900 border border-blue-200">
                    {currentTeacher.designation}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Department of Software Engineering, FET · University of Sindh, Jamshoro
                </p>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                  <span>Room 214, FET Complex</span>
                  <span>·</span>
                  <span className="text-emerald-700 font-medium">HEC Approved PhD Supervisor</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">Faculty ID</span>
              <span className="text-xs font-mono font-bold text-[#0b2545] bg-slate-100 px-2.5 py-1 rounded">
                {currentTeacher.id.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Research & Specializations</h4>
              <ul className="text-xs space-y-1.5 text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>Software Architecture & Design Patterns</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>Cloud Computing & Distributed Systems</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>Empirical Software Engineering & Metrics</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Course Load (Fall 2026)</h4>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span>SWE-401 Software Architecture</span>
                  <span className="font-bold text-slate-900">3+1 Credit Hours</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span>CS-411 Cyber Law & Ethics</span>
                  <span className="font-bold text-slate-900">3+0 Credit Hours</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Supervised FYP Groups</span>
                  <span className="font-bold text-slate-900">4 Capstone Groups</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Office Consultation Hours</h4>
              <div className="space-y-2 text-xs text-slate-600">
                <div>
                  <span className="text-[10px] text-slate-400 block">Official Email</span>
                  <span className="font-mono text-slate-800 font-semibold">{currentTeacher.email || 'farhan.shah@usindh.edu.pk'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Office Consultation</span>
                  <span className="text-slate-800">Mon & Wed: 10:00 AM – 12:00 PM</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">FET Lab Desk</span>
                  <span className="text-slate-800">Lab 3 (Advanced Software Engineering Lab)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
