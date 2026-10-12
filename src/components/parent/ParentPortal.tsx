import React, { useState } from 'react';
import { 
  CURRENT_STUDENT, 
  MULTI_DEPARTMENT_STUDENTS,
  ENROLLED_COURSES, 
  ATTENDANCE_HISTORY,
  HISTORICAL_TRANSCRIPT, 
  FEE_CHALLANS 
} from '../../data/mockAcademicData';
import { UniversitySeal } from '../common/UniversitySeal';
import { TimetableMasterEngine } from '../common/TimetableMasterEngine';
import {
  ClassTimetableSlot,
  ExamDatesheetEntry,
  UniversityTimetableSettings
} from '../../data/timetableData';
import { 
  GraduationCap, 
  Clock, 
  CreditCard, 
  Award, 
  AlertTriangle, 
  CheckCircle2, 
  Download, 
  Printer, 
  Calendar, 
  UserCheck, 
  Mail, 
  Phone, 
  Building2, 
  ShieldCheck, 
  FileText, 
  HeartHandshake, 
  ChevronRight, 
  Send 
} from 'lucide-react';

interface ParentPortalProps {
  activeTab?: string;
  activeSubTab?: string;
  onTabChange?: (tab: string) => void;
  onSubTabChange?: (sub: string) => void;
  onAddAuditLog: (log: any) => void;
  timetableSlots: ClassTimetableSlot[];
  onUpdateSlots: React.Dispatch<React.SetStateAction<ClassTimetableSlot[]>>;
  examEntries: ExamDatesheetEntry[];
  onUpdateExams: React.Dispatch<React.SetStateAction<ExamDatesheetEntry[]>>;
  timetableSettings: UniversityTimetableSettings;
  onUpdateSettings: React.Dispatch<React.SetStateAction<UniversityTimetableSettings>>;
}

export const ParentPortal: React.FC<ParentPortalProps> = ({
  activeTab: controlledTab,
  activeSubTab: controlledSubTab,
  onTabChange: setControlledTab,
  onSubTabChange: setControlledSubTab,
  onAddAuditLog,
  timetableSlots,
  onUpdateSlots,
  examEntries,
  onUpdateExams,
  timetableSettings,
  onUpdateSettings
}) => {
  const [internalTab, setInternalTab] = useState<string>('overview');
  const [internalSubTab, setInternalSubTab] = useState<string>('');
  const activeTab = controlledTab || internalTab;
  const activeSubTab = controlledSubTab !== undefined ? controlledSubTab : internalSubTab;

  const setActiveTab = (tab: string, sub: string = '') => {
    if (setControlledTab) {
      setControlledTab(tab);
    } else {
      setInternalTab(tab);
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

  const [selectedWardId, setSelectedWardId] = useState<string>('std_2k23_swe_104');
  const currentWard = MULTI_DEPARTMENT_STUDENTS.find(s => s.id === selectedWardId) || CURRENT_STUDENT;

  const [inquirySubject, setInquirySubject] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  // Fee payment simulator state
  const [payingChallan, setPayingChallan] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [challansList, setChallansList] = useState(FEE_CHALLANS);
  const [receiptToast, setReceiptToast] = useState<string | null>(null);

  const handlePayChallan = (challanNo: string) => {
    setPayingChallan(challanNo);
    setTimeout(() => {
      setChallansList(prev => prev.map(c => {
        if (c.challanNumber === challanNo) {
          return {
            ...c,
            status: 'Paid',
            transactionReference: '1LINK-GUARDIAN-' + Math.floor(10000000 + Math.random() * 90000000),
            paymentDate: new Date().toISOString().split('T')[0],
            receiptNumber: 'REC-GUARDIAN-' + Math.floor(10000 + Math.random() * 90000)
          };
        }
        return c;
      }));

      onAddAuditLog({
        id: 'log_' + Date.now().toString().slice(-4),
        who: 'Ali Muhammad Soomro (Father / Guardian)',
        role: 'Guardian',
        what: 'Parental Fee Payment Settled via 1Link Sandbox',
        category: 'Finance',
        when: new Date().toLocaleString() + ' PKT',
        whereIp: '182.185.102.44 (Guardian Mobile Session)',
        objectTarget: `Challan: ${challanNo} for Student: 2K23/SWE/104`,
        beforeState: 'Status: Unpaid',
        afterState: 'Status: Paid (Guardian Verified)',
        reason: 'Semester 7 Examination Fee Clearance by Guardian',
        referenceId: 'TXN-1LINK-PRNT-' + Date.now().toString().slice(-6)
      });

      setPaymentSuccess(true);
      setPayingChallan(null);
      setTimeout(() => setPaymentSuccess(false), 3000);
    }, 1200);
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAuditLog({
      id: 'log_' + Date.now().toString().slice(-4),
      who: 'Ali Muhammad Soomro (Guardian: 2K23/SWE/104)',
      role: 'Guardian',
      what: 'Parent Consultation Inquiry Submitted to Department Advisor',
      category: 'Student Affairs',
      when: new Date().toLocaleString() + ' PKT',
      whereIp: '182.185.102.44 (Guardian Session)',
      objectTarget: `Advisor: Engr. Farhan Shaikh · Student: ${CURRENT_STUDENT.name}`,
      beforeState: 'Draft',
      afterState: 'Dispatched to Faculty Portal & Chairperson Office',
      reason: inquirySubject,
      referenceId: 'INQ-GUARDIAN-' + Date.now().toString().slice(-6)
    });

    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquirySubject('');
      setInquiryMessage('');
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3.5 sm:py-5 space-y-4 sm:space-y-5">
      {receiptToast && (
        <div className="fixed bottom-16 lg:bottom-6 right-4 left-4 sm:left-auto z-50 bg-[#004b87] text-white px-4 py-3 rounded-2xl shadow-2xl border border-[#84a433] flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#c8e27b] shrink-0" />
            <span className="text-xs font-semibold">{receiptToast}</span>
          </div>
        </div>
      )}

      {/* =========================================================
          GUARDIAN OFFICIAL IDENTITY & WARD OVERVIEW
         ========================================================= */}
      <div className="bg-white border border-[#d8dadb] rounded-2xl overflow-hidden shadow-2xs">
        {/* Top Institutional Header */}
        <div className="bg-[#004b87] text-white px-4 sm:px-5 py-3 flex flex-wrap items-center justify-between gap-2 border-b border-[#003865]">
          <div className="flex items-center gap-2.5">
            <div className="p-0.5 bg-white rounded-lg border border-[#d8dadb]">
              <UniversitySeal size="xs" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-[#c8e27b]">UNIVERSITY OF SINDH</span>
              <span className="text-white/30 mx-1.5 hidden sm:inline" aria-hidden="true">·</span>
              <span className="text-slate-200 font-medium hidden sm:inline">Parents &amp; Guardian Oversight Portal</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-200 font-mono">
            <span>Guardian: <strong className="text-white">Ali M. Soomro</strong></span>
            <span className="text-[#c8e27b] font-semibold ml-2">● Verified</span>
          </div>
        </div>

        {/* Ward Academic Lockup & Metrics */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center">
          <div className="lg:col-span-5 flex items-start gap-4">
            <div className="relative shrink-0">
              <img
                src={currentWard.avatarUrl}
                alt={currentWard.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-xl object-cover border-2 border-slate-200 shadow-2xs"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider font-mono">
                  Enrolled Scholar / Ward
                </div>
                {/* Ward Switcher */}
                <select
                  value={selectedWardId}
                  onChange={(e) => setSelectedWardId(e.target.value)}
                  className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 border border-slate-200 text-slate-800 cursor-pointer focus:outline-hidden"
                  title="Switch Enrolled Ward"
                >
                  {MULTI_DEPARTMENT_STUDENTS.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.department})
                    </option>
                  ))}
                </select>
              </div>
              <h2 className="text-lg font-bold text-slate-900 leading-tight">
                {currentWard.name}
              </h2>
              <div className="text-xs text-slate-600 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span className="font-mono font-bold text-blue-900">{currentWard.rollNumber}</span>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <span>{currentWard.program}</span>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <span className="text-slate-500">Semester {currentWard.semester}</span>
              </div>
              <div className="text-[11px] text-slate-600 font-medium pt-0.5">
                {currentWard.department}
              </div>
            </div>
          </div>

          {/* 4 Precision Guardian Metric Dockets */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div 
              onClick={() => setActiveTab('results')}
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-blue-50/50 hover:border-blue-300 transition-colors cursor-pointer"
            >
              <div className="text-[10px] text-slate-400 uppercase font-sans">Current CGPA</div>
              <div className="text-xl font-black text-[#0b2545] mt-0.5 tabular-nums">{CURRENT_STUDENT.cgpa}</div>
              <div className="text-[10px] text-emerald-800 font-sans font-semibold mt-0.5">Honours Standing</div>
            </div>

            <div 
              onClick={() => setActiveTab('attendance')}
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-amber-50/50 hover:border-amber-300 transition-colors cursor-pointer"
            >
              <div className="text-[10px] text-slate-400 uppercase font-sans">Attendance Rate</div>
              <div className="text-xl font-black text-slate-900 mt-0.5 tabular-nums">88.0%</div>
              <div className="text-[10px] text-amber-800 font-sans font-semibold mt-0.5">1 Course Shortage Alert</div>
            </div>

            <div 
              onClick={() => setActiveTab('fees')}
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-emerald-50/50 hover:border-emerald-300 transition-colors cursor-pointer"
            >
              <div className="text-[10px] text-slate-400 uppercase font-sans">Fee Dues</div>
              <div className="text-base font-bold text-slate-900 mt-0.5 font-sans">
                {challansList.some(c => c.status === 'Unpaid') ? 'PKR 4,500' : 'Cleared'}
              </div>
              <div className="text-[10px] text-slate-500 font-sans mt-0.5">Exam Slip Clearance</div>
            </div>

            <div 
              onClick={() => setActiveTab('advisor')}
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <div className="text-[10px] text-slate-400 uppercase font-sans">Advisor Status</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5 font-sans truncate">Engr. Farhan</div>
              <div className="text-[10px] text-blue-700 font-sans font-medium mt-0.5">Direct Message →</div>
            </div>
          </div>
        </div>

        {/* In-Portal Guardian Navigation Strip */}
        <div className="flex px-4 sm:px-6 items-center gap-1 border-t border-slate-200 overflow-x-auto no-scrollbar text-xs font-semibold bg-slate-50/70">
          {[
            { id: 'overview', label: 'Ward Summary & Schedule', icon: <GraduationCap className="w-3.5 h-3.5" /> },
            { id: 'timetable', label: 'Class & Exam Timetable', icon: <Calendar className="w-3.5 h-3.5" /> },
            { id: 'attendance', label: 'Attendance & 75% Rule', icon: <Clock className="w-3.5 h-3.5" /> },
            { id: 'results', label: 'Academic Transcript & CGPA', icon: <Award className="w-3.5 h-3.5" /> },
            { id: 'fees', label: 'Fee Challans & Online Payment', icon: <CreditCard className="w-3.5 h-3.5" /> },
            { id: 'advisor', label: 'Consult Academic Advisor', icon: <UserCheck className="w-3.5 h-3.5" /> },
            { id: 'profile', label: 'Guardian Identity & Ward Link', icon: <ShieldCheck className="w-3.5 h-3.5" /> }
          ].map(tab => {
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-3 flex items-center gap-2 whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                  isCurrent
                    ? 'border-[#004b87] text-[#004b87] font-bold bg-white/80'
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

      {/* =========================================================
          TAB: WARD CLASS & EXAM TIMETABLE
         ========================================================= */}
      {activeTab === 'timetable' && (
        <TimetableMasterEngine
          role="parent"
          canManage={false}
          initialDeptId={
            currentWard.department.includes('Information Tech') ? 'dept_it' :
            currentWard.department.includes('Data Science') ? 'dept_ds' :
            currentWard.department.includes('Computer Science') ? 'dept_cs' :
            currentWard.department.includes('Physics') ? 'dept_phy' :
            currentWard.department.includes('Business') ? 'dept_iba' :
            currentWard.department.includes('English') ? 'dept_eng' : 'dept_swe'
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
          TAB 1: WARD OVERVIEW & TODAY'S SCHEDULE
         ========================================================= */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-5">
            {/* Today's Classes & Campus Presence */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <Clock className="w-4 h-4 text-blue-700" />
                  <span>Ward's Lecture Schedule for Today (Monday)</span>
                </div>
                <span className="font-mono text-slate-500 text-[11px]">Jamshoro Campus</span>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                <div className="p-4 flex items-center justify-between gap-4 bg-emerald-50/20">
                  <div className="space-y-0.5">
                    <div className="font-mono text-slate-500 text-[11px]">09:00 AM – 10:30 AM · Lab 03</div>
                    <div className="font-bold text-slate-900">SWE-401: Software Architecture & Design</div>
                    <div className="text-slate-600 text-[11px]">Instructor: Engr. Farhan Shaikh</div>
                  </div>
                  <span className="text-emerald-800 font-semibold flex items-center gap-1 text-[11px] shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Biometric Punch: Present (09:12 AM)</span>
                  </span>
                </div>

                <div className="p-4 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="font-mono text-slate-500 text-[11px]">11:00 AM – 12:30 PM · Network Research Lab</div>
                    <div className="font-bold text-slate-900">SWE-405: Cloud Computing & Distributed Systems</div>
                    <div className="text-slate-600 text-[11px]">Instructor: Engr. Kashif Laghari</div>
                  </div>
                  <span className="text-slate-500 font-mono text-[11px] shrink-0">Scheduled at 11:00 AM</span>
                </div>

                <div className="p-4 flex items-center justify-between gap-4 bg-amber-50/30">
                  <div className="space-y-0.5">
                    <div className="font-mono text-slate-500 text-[11px]">02:00 PM – 03:30 PM · Seminar Library</div>
                    <div className="font-bold text-slate-900">CS-411: Professional Ethics & Cyber Law</div>
                    <div className="text-slate-600 text-[11px]">Instructor: Dr. Tariq Nizamani</div>
                  </div>
                  <span className="text-amber-800 font-semibold flex items-center gap-1 text-[11px] shrink-0">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Attendance at 73% (Needs Presence)</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Registered Courses Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Registered Courses in Fall 2026 Session ({ENROLLED_COURSES.length} Courses)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ENROLLED_COURSES.map(course => (
                  <div key={course.code} className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[#0b2545]">{course.code}</span>
                      <span className="font-mono text-slate-500 text-[11px]">{course.creditHours} Credits</span>
                    </div>
                    <h4 className="font-bold text-slate-900">{course.title}</h4>
                    <div className="text-slate-500 text-[11px]">{course.instructor}</div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Attendance:</span>
                      <span className={`font-mono font-bold ${
                        course.attendancePercent < 75 ? 'text-rose-700' : 'text-emerald-700'
                      }`}>
                        {course.attendancePercent}% ({course.attendancePercent < 75 ? 'Shortage Alert' : 'Good Standing'})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Attendance Warning & Fee Alert */}
          <div className="lg:col-span-4 space-y-5">
            {/* Statutory Attendance Shortage Notice */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-5 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-amber-900 font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Attendance Shortage Alert</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                CS-411 Professional Ethics is at 73%
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Under Ordinance Section 14-B of the University of Sindh, students must maintain <strong>75% minimum attendance</strong> to receive their semester final examination slip. 
                Your ward is currently deficient by 2 lectures. A formal representation has been filed with the department.
              </p>
              <button
                onClick={() => setActiveTab('attendance')}
                className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition-colors cursor-pointer text-center"
              >
                Inspect Attendance Record & Appeal Status
              </button>
            </div>

            {/* Fee Dues Clearance Notice */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 text-xs shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-blue-700" />
                  <span>Semester 7 Examination Fee</span>
                </span>
                <span className="text-[10px] font-mono text-amber-800 font-bold bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded">
                  Due Oct 30
                </span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-700">Total Payable:</span>
                  <span className="text-slate-900 font-mono text-sm">PKR 4,500</span>
                </div>
                <div className="text-[11px] text-slate-500 font-mono">1Link PSID: 1008742391024851</div>
              </div>
              <button
                onClick={() => setActiveTab('fees')}
                className="w-full py-2 bg-[#0b2545] hover:bg-blue-900 text-white font-bold rounded-lg transition-colors cursor-pointer text-center"
              >
                Pay Online on Behalf of Student via 1Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: ATTENDANCE & 75% STATUTORY RULE (WITH SUB-TABS)
         ========================================================= */}
      {activeTab === 'attendance' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5 shadow-2xs text-xs animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Ward's Statutory Attendance & Biometric Log</h2>
              <p className="text-slate-500 mt-0.5">
                Official biometric attendance monitored under University of Sindh Examination Ordinance (75% Minimum).
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
              {[
                { id: 'courses', label: 'Course Attendance' },
                { id: 'logs', label: 'Daily Biometric Log' }
              ].map((st) => {
                const isSelected = (activeSubTab || 'courses') === st.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => setSubTab(st.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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

          {(activeSubTab || 'courses') === 'courses' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">Course Code</th>
                    <th className="py-2.5 px-3">Course Title</th>
                    <th className="py-2.5 px-3">Classes Conducted</th>
                    <th className="py-2.5 px-3">Attended</th>
                    <th className="py-2.5 px-3">Percentage</th>
                    <th className="py-2.5 px-3">Safety Buffer</th>
                    <th className="py-2.5 px-3">Statutory Eligibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ENROLLED_COURSES.map(course => {
                    const isShortage = course.attendancePercent < 75;
                    return (
                      <tr key={course.code} className={isShortage ? 'bg-rose-50/40' : 'hover:bg-slate-50'}>
                        <td className="py-3 px-3 font-mono font-bold text-[#004b87]">{course.code}</td>
                        <td className="py-3 px-3 font-medium text-slate-900">{course.title}</td>
                        <td className="py-3 px-3 font-mono text-slate-600">{course.attendanceTotal}</td>
                        <td className="py-3 px-3 font-mono text-slate-800">{course.attendanceAttended}</td>
                        <td className="py-3 px-3 font-mono font-bold">
                          <span className={isShortage ? 'text-rose-700' : 'text-emerald-700'}>
                            {course.attendancePercent}%
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono">
                          {isShortage ? (
                            <span className="text-rose-700 font-bold">-2 Deficit</span>
                          ) : (
                            <span className="text-emerald-700">+2 Safe</span>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <span className={`inline-flex items-center gap-1 font-semibold ${
                            isShortage ? 'text-rose-700' : 'text-emerald-700'
                          }`}>
                            {isShortage ? <AlertTriangle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                            <span>{isShortage ? 'Debarment Risk' : 'Cleared for Final Exam'}</span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Course</th>
                    <th className="py-2.5 px-3">Lecture Topic</th>
                    <th className="py-2.5 px-3">Biometric Status</th>
                    <th className="py-2.5 px-3">Marked By</th>
                    <th className="py-2.5 px-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ATTENDANCE_HISTORY.map((rec, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-mono text-slate-600">{rec.date}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-[#004b87]">{rec.courseCode}</td>
                      <td className="py-2.5 px-3 text-slate-900 font-medium">{rec.topic}</td>
                      <td className="py-2.5 px-3">
                        <span className={`font-bold ${rec.status === 'Present' ? 'text-emerald-700' : 'text-rose-700'}`}>
                          {rec.status === 'Present' ? '● Present (SMS Sent)' : '✕ Absent (Alert Sent)'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">{rec.markedBy}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">{rec.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          TAB 3: ACADEMIC TRANSCRIPT & CGPA
         ========================================================= */}
      {activeTab === 'results' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5 shadow-2xs text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Official Semester Grade Ledger & CGPA Record</h2>
              <p className="text-slate-500 mt-0.5">
                Official Examination Branch transcripts across Semesters 1 through 6.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono bg-blue-50 text-blue-900 font-bold px-3 py-1.5 rounded border border-blue-200">
                CGPA: {CURRENT_STUDENT.cgpa} / 4.00
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {HISTORICAL_TRANSCRIPT.slice(0, 3).map(sem => (
              <div key={sem.semesterNumber} className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-50 px-4 py-2.5 flex items-center justify-between border-b border-slate-200">
                  <div className="flex items-center gap-2 font-bold text-slate-800">
                    <span>Semester {sem.semesterNumber}</span>
                    <span className="text-slate-400 font-normal">· {sem.academicSession}</span>
                  </div>
                  <div className="font-mono font-bold text-blue-950">
                    GPA: {sem.gpa}
                  </div>
                </div>

                <table className="w-full text-left">
                  <thead className="bg-white text-slate-400 border-b border-slate-100">
                    <tr>
                      <th className="py-2 px-3">Course</th>
                      <th className="py-2 px-3">Title</th>
                      <th className="py-2 px-3">Credits</th>
                      <th className="py-2 px-3">Grade Point</th>
                      <th className="py-2 px-3">Letter Grade</th>
                      <th className="py-2 px-3">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {sem.courses.map((c, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-bold text-slate-700">{c.code}</td>
                        <td className="py-2.5 px-3 font-sans text-slate-900">{c.title}</td>
                        <td className="py-2.5 px-3 text-slate-500">{c.credits}</td>
                        <td className="py-2.5 px-3 font-bold text-blue-900">{c.gradePoint}</td>
                        <td className="py-2.5 px-3 font-bold">{c.letterGrade}</td>
                        <td className="py-2.5 px-3 font-sans text-emerald-700">{c.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 4: FEE CHALLANS & ONLINE PAYMENT (WITH SUB-TABS)
         ========================================================= */}
      {activeTab === 'fees' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5 shadow-2xs text-xs animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Guardian Online Fee Payment & Clearance Portal</h2>
              <p className="text-slate-500 mt-0.5">
                Pay university tuition and examination fees directly via 1Link, HBL, or Sindh Bank.
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
              {[
                { id: '', label: 'All Challans' },
                { id: 'unpaid', label: 'Pending Challans' },
                { id: 'receipts', label: 'Paid Receipts' }
              ].map((st) => {
                const isSelected = activeSubTab === st.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => setSubTab(st.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Fee successfully settled on behalf of {currentWard.name}. Examination hall slip unlocked.</span>
            </div>
          )}

          <div className="space-y-3">
            {challansList
              .filter(challan => {
                if (activeSubTab === 'unpaid') return challan.status === 'Unpaid';
                if (activeSubTab === 'receipts') return challan.status === 'Paid';
                return true;
              })
              .map(challan => (
                <div
                  key={challan.challanNumber}
                  className="p-5 border border-slate-200 rounded-xl bg-white hover:border-slate-300 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-blue-900">{challan.challanNumber}</span>
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      challan.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {challan.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{challan.title}</h4>
                  <div className="text-slate-500">
                    Designated Bank: {challan.bankName} · Due Date: <span className="font-mono">{challan.dueDate}</span>
                  </div>
                  {challan.transactionReference && (
                    <div className="text-emerald-800 font-mono text-[11px]">
                      Ref: {challan.transactionReference} · Receipt: {challan.receiptNumber}
                    </div>
                  )}
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                  <div className="text-right">
                    <div className="text-base font-black text-slate-900 font-mono">
                      PKR {challan.amount.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-400">Inclusive of University Examination Levy</div>
                  </div>

                  {challan.status === 'Unpaid' ? (
                    <button
                      onClick={() => handlePayChallan(challan.challanNumber)}
                      disabled={payingChallan === challan.challanNumber}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>{payingChallan === challan.challanNumber ? 'Settling...' : 'Pay via 1Link Sandbox'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setReceiptToast(`Verified Bank Paid Receipt downloaded for ${challan.challanNumber}`);
                        setTimeout(() => setReceiptToast(null), 3500);
                      }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Bank Receipt</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 5: CONSULT ACADEMIC ADVISOR & DEPARTMENT CHAIR
         ========================================================= */}
      {activeTab === 'advisor' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5 shadow-2xs text-xs">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-base font-bold text-slate-900">Direct Departmental Consultation & Inquiries</h2>
            <p className="text-slate-500 mt-0.5">
              Contact the Academic Advisor or Department Chairperson regarding your ward's progress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Academic Advisor</span>
              <h4 className="font-bold text-slate-900 text-sm">Engr. Farhan Shaikh</h4>
              <p className="text-slate-600">Assistant Professor, Department of Software Engineering</p>
              <div className="text-slate-500 space-y-0.5 pt-1 border-t border-slate-200">
                <div>Email: farhan.shaikh@usindh.edu.pk</div>
                <div>Office: Faculty Office #14, Jamshoro Campus</div>
                <div>Office Consultation: Monday & Wednesday (02:00 PM – 04:00 PM)</div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Department Chairperson</span>
              <h4 className="font-bold text-slate-900 text-sm">Prof. Dr. Arifa Bhutto</h4>
              <p className="text-slate-600">Chairperson, Department of Software Engineering</p>
              <div className="text-slate-500 space-y-0.5 pt-1 border-t border-slate-200">
                <div>Office: Chairperson Secretariat, SWE Dept</div>
                <div>Meeting Hours: Tuesday & Thursday (11:00 AM – 01:00 PM)</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSendInquiry} className="space-y-3 pt-2">
            <h3 className="font-bold text-slate-900 text-sm">Submit Official Guardian Inquiry</h3>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Subject</label>
              <input
                type="text"
                required
                value={inquirySubject}
                onChange={(e) => setInquirySubject(e.target.value)}
                placeholder="e.g. Inquiry regarding CS-411 attendance representation & examination status"
                className="w-full p-2.5 border border-slate-300 rounded-lg outline-hidden focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Message to Advisor / Chairperson</label>
              <textarea
                required
                rows={4}
                value={inquiryMessage}
                onChange={(e) => setInquiryMessage(e.target.value)}
                placeholder="Provide detailed inquiry or request in-person consultation appointment..."
                className="w-full p-2.5 border border-slate-300 rounded-lg outline-hidden focus:border-blue-500"
              />
            </div>

            {inquirySent && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 font-semibold">
                Inquiry officially logged and forwarded to Engr. Farhan Shaikh and Prof. Dr. Arifa Bhutto.
              </div>
            )}

            <button
              type="submit"
              className="px-5 py-2.5 bg-[#0b2545] hover:bg-blue-900 text-white font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Dispatch Guardian Consultation Request</span>
            </button>
          </form>
        </div>
      )}

      {/* =========================================================
          TAB: GUARDIAN IDENTITY RECORD & WARD LINK
         ========================================================= */}
      {activeTab === 'profile' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-teal-800 p-2 flex items-center justify-center shadow-md text-white font-bold text-xl">
                MA
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-900">Muhammad Ali (Father & Registered Guardian)</h3>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-teal-50 text-teal-900 border border-teal-200">
                    Verified Guardian
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Guardian of Scholar: {currentWard.name} ({currentWard.rollNumber})
                </p>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                  <span>NADRA CNIC: 41303-XXXXXXX-1</span>
                  <span>·</span>
                  <span className="text-emerald-700 font-medium">SMS Broadcast Enrolled</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">Guardian Link ID</span>
              <span className="text-xs font-mono font-bold text-teal-900 bg-teal-50 px-2.5 py-1 rounded">
                GUARD-{currentWard.rollNumber.replace('/', '-')}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Enrolled Ward Information</h4>
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span>Student Name</span>
                  <span className="font-bold text-slate-900">{currentWard.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span>Roll Number</span>
                  <span className="font-mono font-bold text-slate-900">{currentWard.rollNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span>Department</span>
                  <span className="font-bold text-slate-900">{currentWard.department}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Semester</span>
                  <span className="font-bold text-slate-900">Semester {currentWard.semester} (Fall 2026)</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Statutory Guardian Rights</h4>
              <ul className="text-xs space-y-1.5 text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Real-time Biometric Attendance SMS</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Controller Verified Semester Results</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>1Link Digital Fee Settlement Clearance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Direct Communication with Dept Chairperson</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Registered Contact Details</h4>
              <div className="space-y-2 text-xs text-slate-600">
                <div>
                  <span className="text-[10px] text-slate-400 block">Registered Mobile Number</span>
                  <span className="font-mono text-slate-800 font-semibold">+92-300-9876543 (Primary)</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Residential Address</span>
                  <span className="text-slate-800">House # 42, Citizen Colony, Hyderabad</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Emergency Status</span>
                  <span className="text-emerald-700 font-semibold">Active & Verified in ITSC Registry</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
