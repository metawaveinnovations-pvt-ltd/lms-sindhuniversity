import React, { useState } from 'react';
import { 
  UNIVERSITY_DEPARTMENTS, 
  UNIVERSITY_TEACHERS, 
  VC_EXECUTIVE_SUMMARY 
} from '../../data/mockAcademicData';
import { UniversitySeal } from '../common/UniversitySeal';
import { TimetableMasterEngine } from '../common/TimetableMasterEngine';
import {
  ClassTimetableSlot,
  ExamDatesheetEntry,
  UniversityTimetableSettings
} from '../../data/timetableData';
import { 
  Building2, 
  Users, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  Send, 
  FileSpreadsheet, 
  ShieldCheck,
  Clock,
  School,
  ArrowRight,
  Filter,
  Calendar
} from 'lucide-react';

interface HodPortalProps {
  onAddAuditLog: (log: any) => void;
  initialDeptId?: string;
  isChairman?: boolean;
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

export const HodPortal: React.FC<HodPortalProps> = ({ 
  onAddAuditLog,
  initialDeptId = 'dept_swe',
  isChairman = true,
  activeTab: controlledTab,
  activeSubTab: controlledSubTab,
  onTabChange: setControlledTab,
  onSubTabChange: setControlledSubTab,
  timetableSlots,
  onUpdateSlots,
  examEntries,
  onUpdateExams,
  timetableSettings,
  onUpdateSettings
}) => {
  const [selectedDeptId, setSelectedDeptId] = useState<string>(initialDeptId);
  const [internalTab, setInternalTab] = useState<'overview' | 'timetable' | 'cohorts' | 'accreditation' | 'broadcast' | 'appeals' | 'profile'>('overview');
  const [internalSubTab, setInternalSubTab] = useState<string>('');
  const activeTab = (controlledTab as any) || internalTab;
  const activeSubTab = controlledSubTab !== undefined ? controlledSubTab : internalSubTab;

  const setActiveTab = (tab: any, sub: string = '') => {
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
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [crNoticeToast, setCrNoticeToast] = useState<string | null>(null);
  const [dispatchedCirculars, setDispatchedCirculars] = useState([
    {
      id: 'CIRC-2026-09',
      title: 'Publication of Official 2nd Semester (Aug–Dec) Classes Timetable & Lab Groups',
      content: 'All undergraduate scholars of Part-I to Part-IV (Morning & Evening shifts) are directed to follow the revised laboratory groupings (G1/G2) and report 10 minutes prior to scheduled bell timings.',
      date: 'Oct 06, 2026 · 09:30 AM',
      target: 'All Batches (2K21–2K24)'
    },
    {
      id: 'CIRC-2026-08',
      title: 'Strict Enforcement of 75% HEC Biometric Attendance & Medical Board Deadline',
      content: 'Scholars falling below the statutory 75% attendance threshold must submit verified hospital certificates to the Chairperson Secretariat prior to Oct 25, 2026 for examination slip clearance.',
      date: 'Oct 01, 2026 · 11:15 AM',
      target: 'Undergraduate Scholars & Faculty'
    }
  ]);
  const [resolvedAppeals, setResolvedAppeals] = useState<string[]>([]);

  const department = UNIVERSITY_DEPARTMENTS.find(d => d.id === selectedDeptId) || UNIVERSITY_DEPARTMENTS[0];
  const deptTeachers = UNIVERSITY_TEACHERS.filter(t => t.departmentId === department.id);

  const sampleBatches = [
    { batch: '2K21 Final Year (Part-IV · Sem 8)', students: 185, avgCgpa: 3.42, attendance: 91.2, status: 'FYP & Capstone Defense Phase' },
    { batch: '2K22 Third Year (Part-III · Sem 6)', students: 210, avgCgpa: 3.28, attendance: 87.5, status: 'Internship & Core Courses' },
    { batch: '2K23 Second Year (Part-II · Sem 4)', students: 235, avgCgpa: 3.35, attendance: 88.5, status: 'Midterm Examination Scheduled' },
    { batch: '2K24 Freshman (Part-I · Sem 2)', students: 210, avgCgpa: 3.15, attendance: 86.8, status: 'Foundation Semester in Progress' }
  ];

  const classRepresentatives = [
    { batch: '2K21 (Part-IV)', shift: 'Morning', crName: 'Muhammad Bilal Soomro', crRoll: `2K21/${department.code}/014`, grName: 'Ayesha Siddiqui', grRoll: `2K21/${department.code}/038`, strength: 110, advisor: deptTeachers[0]?.name || 'Prof. Dr. Arifa Bhutto' },
    { batch: '2K21 (Part-IV)', shift: 'Evening', crName: 'Fahad Hussain Talpur', crRoll: `2K21/${department.code}/E-09`, grName: 'Sadia Memon', grRoll: `2K21/${department.code}/E-22`, strength: 75, advisor: deptTeachers[1]?.name || 'Dr. Kamran Taj Pathan' },
    { batch: '2K22 (Part-III)', shift: 'Morning', crName: 'Zeeshan Ali Laghari', crRoll: `2K22/${department.code}/021`, grName: 'Nida Fatima Qureshi', grRoll: `2K22/${department.code}/054`, strength: 125, advisor: deptTeachers[1]?.name || 'Dr. Kamran Taj Pathan' },
    { batch: '2K23 (Part-II)', shift: 'Morning', crName: 'Ali Hassan Chand', crRoll: `2K23/${department.code}/104`, grName: 'Areeba Shaikh', grRoll: `2K23/${department.code}/102`, strength: 140, advisor: deptTeachers[0]?.name || 'Engr. Farhan Shaikh' },
    { batch: '2K23 (Part-II)', shift: 'Evening', crName: 'Waqar Ahmed Joyo', crRoll: `2K23/${department.code}/E-15`, grName: 'Hina Parveen', grRoll: `2K23/${department.code}/E-41`, strength: 95, advisor: deptTeachers[2]?.name || 'Engr. Bistam Ali' },
    { batch: '2K24 (Part-I)', shift: 'Morning', crName: 'Hamza Khan Pathan', crRoll: `2K24/${department.code}/007`, grName: 'Zainab Abro', grRoll: `2K24/${department.code}/019`, strength: 130, advisor: deptTeachers[0]?.name || 'Prof. Dr. Arifa Bhutto' }
  ];

  const pendingMedicalAppeals = [
    { id: 'APP-01', rollNo: '2K23/SWE/104', student: 'Zainab Ali', course: 'CS-411 Cyber Law', currentAtt: '72%', reason: 'Dengue fever hospital admission (Civil Hospital Hyderabad)', certVerified: true },
    { id: 'APP-02', rollNo: '2K23/SWE/072', student: 'Ahmed Raza', course: 'SWE-401 Arch', currentAtt: '71%', reason: 'Inter-University National Debate Competition representation', certVerified: true },
    { id: 'APP-03', rollNo: '2K23/SWE/091', student: 'Sanaullah Jamali', course: 'SWE-403 SQA', currentAtt: '68%', reason: 'Family medical emergency documentation submitted', certVerified: false }
  ];

  const handleResolveAppeal = (appealId: string, approved: boolean) => {
    setResolvedAppeals(prev => [...prev, appealId]);
    onAddAuditLog({
      id: 'log_' + Date.now().toString().slice(-4),
      who: `${department.chairmanName} (Chairperson)`,
      role: 'Chairman / HOD',
      what: `Attendance Medical Appeal ${appealId} ${approved ? 'Endorsed' : 'Rejected'}`,
      category: 'Student Welfare',
      when: new Date().toLocaleString() + ' PKT',
      whereIp: '10.14.0.5 (Chairperson Office)',
      objectTarget: `Appeal: ${appealId} · Dept: ${department.name}`,
      beforeState: 'Pending Chairman Review',
      afterState: approved ? 'Endorsed to Dean & Controller' : 'Rejected for Inadequate Hospital Documentation',
      reason: '75% Attendance Statutory Review',
      referenceId: 'HOD-APP-' + Date.now().toString().slice(-6)
    });
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `CIRC-2026-${Math.floor(10 + Math.random() * 89)}`;
    setDispatchedCirculars(prev => [
      {
        id: newId,
        title: broadcastTitle,
        content: broadcastMessage,
        date: 'Just now · Official PKT',
        target: `All Batches of ${department.name}`
      },
      ...prev
    ]);
    onAddAuditLog({
      id: 'log_' + Date.now().toString().slice(-4),
      who: `${department.chairmanName} (Chairperson)`,
      role: 'Chairman / HOD',
      what: `Departmental Circular Dispatched: ${broadcastTitle}`,
      category: 'Announcement',
      when: new Date().toLocaleString() + ' PKT',
      whereIp: '10.14.0.5 (Chairperson Terminal)',
      objectTarget: `All Enrolled Batches of ${department.name}`,
      beforeState: 'Draft Circular',
      afterState: 'Dispatched to LMS Noticeboards & Student Portals',
      reason: broadcastTitle,
      referenceId: 'NOTIF-HOD-' + Date.now().toString().slice(-6)
    });

    setBroadcastSent(true);
    setBroadcastTitle('');
    setBroadcastMessage('');
    setTimeout(() => {
      setBroadcastSent(false);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3.5 sm:py-6 space-y-4 sm:space-y-6">
      {/* Department Leadership Lockup */}
      <div className="bg-white border border-[#d8dadb] rounded-2xl shadow-2xs overflow-hidden">
        <div className="bg-[#004b87] text-white px-4 sm:px-6 py-3.5 sm:py-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#003865]">
          <div className="flex items-center gap-3">
            <div className="p-1 bg-white rounded-xl border border-[#d8dadb] shrink-0">
              <UniversitySeal size="sm" monochrome={false} />
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#c8e27b] uppercase font-mono">
                {isChairman ? 'Teaching Department · Office of the Chairperson' : 'Institute / Academic Unit · Office of the Director / HOD'}
              </div>
              <h1 className="text-sm sm:text-lg font-bold text-white tracking-tight">
                {department.name}
              </h1>
              <div className="text-xs text-slate-200 font-sans mt-0.5">
                {isChairman ? 'Chairperson' : 'Director / HOD'}: <strong className="text-white">{department.chairmanName}</strong>
                <span className="text-white/40 mx-1.5">·</span>
                <span className="text-[#c8e27b] font-mono text-[11px]">NCEAC / HEC OBE Level-1 Accredited</span>
              </div>
            </div>
          </div>

          {/* Department Switcher */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-[#c8e27b] hidden sm:inline">Department:</span>
            <select
              value={selectedDeptId}
              onChange={(e) => setSelectedDeptId(e.target.value)}
              className="w-full sm:w-auto min-h-[36px] px-3 py-1.5 rounded-xl border border-white/25 bg-white/10 text-white text-xs font-semibold backdrop-blur-xs cursor-pointer focus:outline-hidden"
            >
              {UNIVERSITY_DEPARTMENTS.map(d => (
                <option key={d.id} value={d.id} className="text-slate-900 bg-white">
                  {d.name} ({d.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Chairperson Context & Metric Strip */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center bg-gradient-to-b from-slate-50/50 to-white">
          <div className="lg:col-span-5 flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#004b87] text-[#c8e27b] flex items-center justify-center font-serif-academic text-sm font-bold border border-[#003866] shadow-xs shrink-0 tracking-wide">
              CHAIR
            </div>
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                Chairperson · Department Secretariat
              </div>
              <h2 className="text-lg font-bold text-slate-900 leading-snug">
                {department.chairmanName}
              </h2>
              <div className="text-xs text-slate-600 font-mono">
                {department.chairmanEmail} • {department.facultyName}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Students</div>
              <div className="text-xl font-black text-slate-900 mt-1">{department.studentsCount}</div>
              <div className="text-[11px] text-slate-600 mt-0.5">4 Cohort Batches</div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Faculty Members</div>
              <div className="text-xl font-black text-slate-900 mt-1">{department.teachersCount}</div>
              <div className="text-[11px] text-slate-600 mt-0.5">Assigned Roster</div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Attendance Rate</div>
              <div className="text-xl font-black text-emerald-700 mt-1">{department.attendanceRate}%</div>
              <div className="text-[11px] text-emerald-600 mt-0.5">75% Policy Enforced</div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Offered Courses</div>
              <div className="text-xl font-black text-[#004b87] mt-1">{department.coursesOfferedCount}</div>
              <div className="text-[11px] text-[#0068b5] mt-0.5">HEC OBE Matrices</div>
            </div>
          </div>
        </div>

        {/* In-Portal Module Navigation Strip */}
        <div className="flex px-4 sm:px-6 border-t border-slate-200/80 items-center gap-1 overflow-x-auto no-scrollbar text-xs font-semibold bg-slate-50/70">
          {[
            { id: 'overview', label: 'Department Radar', icon: <School className="w-3.5 h-3.5" /> },
            { id: 'timetable', label: 'Master Timetable & Exams (1-4 Yrs)', icon: <Calendar className="w-3.5 h-3.5" /> },
            { id: 'cohorts', label: 'Undergraduate Batches (2K21-2K24)', icon: <Users className="w-3.5 h-3.5" /> },
            { id: 'appeals', label: 'Attendance Medical Appeals', icon: <Clock className="w-3.5 h-3.5" /> },
            { id: 'accreditation', label: 'NCEAC / OBE Criteria', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
            { id: 'broadcast', label: 'Department Circulars', icon: <Send className="w-3.5 h-3.5" /> },
            { id: 'profile', label: isChairman ? 'Chairperson Secretariat' : 'Director Office', icon: <Building2 className="w-3.5 h-3.5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3.5 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
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
          TAB 1: DEPARTMENT RADAR
         ========================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Department Programs</h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800">
                  {department.programs.length} Active
                </span>
              </div>
              <div className="space-y-2">
                {department.programs.map((prog, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-semibold text-slate-800 flex items-center justify-between">
                    <span>{prog}</span>
                    <span className="text-[10px] text-emerald-700 font-mono font-bold">Accredited</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Attendance Compliance</h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                    {department.attendanceRate}% Overall
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Lectures marked synchronously by department instructors. Students with &lt; 75% receive automated warnings and are placed on debarred lists pending medical scrutiny.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('appeals')}
                className="w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>{pendingMedicalAppeals.length - resolvedAppeals.length} Medical Appeals Pending</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">OBE & Continuous Quality</h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800">
                    CQI Cycle
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  CLO-PLO attainment matrix mapped for all {department.coursesOfferedCount} offered semester modules. Course folders and rubrics submitted to Quality Enhancement Cell (QEC).
                </p>
              </div>
              <button
                onClick={() => setActiveTab('accreditation', 'obe')}
                className="w-full py-2 px-3 rounded-xl bg-[#004b87]/10 hover:bg-[#004b87] text-[#004b87] hover:text-white text-xs font-bold flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>Inspect CLO-PLO Attainment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Chairman / HOD Master Timetable & Examination Control Callout */}
          <div className="bg-gradient-to-r from-[#004b87] to-[#0b2545] rounded-2xl p-4 sm:p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs border border-[#003865]">
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#c8e27b] font-bold">
                Chairman / HOD Authority • Synced Across Student &amp; Teacher Portals
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Master Classes Timetable (1–4 Years / 8 Semesters) &amp; Midterm / Final Exam Datesheet
              </h3>
              <p className="text-xs text-slate-200 max-w-2xl">
                Add, edit, or delete Theory &amp; Lab slots (Periods 1–6), assign instructors and labs, manage Morning &amp; Evening Midterm/Final examination papers, and configure university bell timings.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveTab('timetable', 'classes')}
                className="px-3.5 py-2 rounded-xl bg-[#84a433] hover:bg-[#6e8a28] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Manage Classes Timetable</span>
              </button>
              <button
                onClick={() => setActiveTab('timetable', 'exams')}
                className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Award className="w-3.5 h-3.5 text-[#c8e27b]" />
                <span>Midterm &amp; Final Datesheet</span>
              </button>
            </div>
          </div>

          {/* Departmental Teaching Faculty Roster */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Departmental Teaching Faculty & Course Workload</h3>
                <p className="text-xs text-slate-500">Assigned professors, associate professors, and lecturers in {department.name}.</p>
              </div>
              <button
                onClick={() => setActiveTab('cohorts')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer self-start sm:self-auto"
              >
                View Batch Progression →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">Faculty Member</th>
                    <th className="py-2.5 px-3">Designation</th>
                    <th className="py-2.5 px-3">Office / Chamber</th>
                    <th className="py-2.5 px-3">Assigned Courses</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {deptTeachers.map((teacher) => (
                    <tr key={teacher.id} className="hover:bg-slate-50/80">
                      <td className="py-3 px-3 font-bold text-slate-900">
                        <div>{teacher.name}</div>
                        <div className="text-[11px] font-mono text-slate-400 font-normal">{teacher.email}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-700 font-semibold">{teacher.designation}</td>
                      <td className="py-3 px-3 text-slate-600">{teacher.officeRoom}</td>
                      <td className="py-3 px-3 font-mono font-bold text-[#004b87]">{teacher.activeCourses.join(', ')}</td>
                      <td className="py-3 px-3 text-right">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-[10px]">
                          Active Roster
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 1B: MASTER TIMETABLE & MIDTERM/FINAL EXAM CONTROL
         ========================================================= */}
      {activeTab === 'timetable' && (
        <TimetableMasterEngine
          role={isChairman ? 'chairman' : 'hod'}
          canManage={true}
          initialDeptId={selectedDeptId}
          activeSubView={activeSubTab}
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
          TAB 2: COHORT BATCHES & CLASS REPRESENTATIVES (CR / GR)
         ========================================================= */}
      {activeTab === 'cohorts' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-5 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {activeSubTab === 'representatives'
                  ? `Appointed Class Representatives (CR / GR) — ${department.name}`
                  : 'Department Cohorts & Undergraduate Batch Progression'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {activeSubTab === 'representatives'
                  ? 'Official student coordinators across Part-I to Part-IV (Morning & Evening) for timetable & academic liaison.'
                  : `Live progression tracking across undergraduate batches of ${department.name}.`}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
              {[
                { id: 'batches', label: 'All Batches (4)' },
                { id: '2k21', label: '2K21 Final Year' },
                { id: '2k23', label: '2K23 Junior Batch' },
                { id: 'representatives', label: 'Class Reps (CR/GR)' }
              ].map((st) => {
                const normalizedSub = !activeSubTab ? 'batches' : activeSubTab;
                const isSelected = normalizedSub === st.id;
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

          {crNoticeToast && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{crNoticeToast}</span>
            </div>
          )}

          {activeSubTab === 'representatives' ? (
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Batch & Part</th>
                    <th className="py-3 px-4">Shift</th>
                    <th className="py-3 px-4">Class Representative (CR)</th>
                    <th className="py-3 px-4">Girls Representative (GR)</th>
                    <th className="py-3 px-4">Cohort Size</th>
                    <th className="py-3 px-4">Batch Advisor</th>
                    <th className="py-3 px-4 text-right">HOD Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {classRepresentatives.map((rep, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-bold text-slate-900">{rep.batch}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          rep.shift === 'Morning' ? 'bg-blue-50 text-[#004b87] border border-blue-200' : 'bg-amber-50 text-amber-900 border border-amber-200'
                        }`}>
                          {rep.shift}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{rep.crName}</div>
                        <div className="text-[11px] font-mono text-[#0068b5]">{rep.crRoll}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{rep.grName}</div>
                        <div className="text-[11px] font-mono text-[#007a33]">{rep.grRoll}</div>
                      </td>
                      <td className="py-3 px-4 font-mono font-semibold text-slate-800">{rep.strength} Scholars</td>
                      <td className="py-3 px-4 text-slate-600">{rep.advisor}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            setCrNoticeToast(`Official HOD Timetable & Attendance Advisory dispatched to ${rep.crName} & ${rep.grName} (${rep.batch} ${rep.shift}).`);
                            setTimeout(() => setCrNoticeToast(null), 3500);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-[#004b87]/10 hover:bg-[#004b87] text-[#004b87] hover:text-white text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          Notify CR/GR
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sampleBatches
                .filter(b => {
                  if (activeSubTab === '2k21') return b.batch.includes('2K21');
                  if (activeSubTab === '2k23') return b.batch.includes('2K23');
                  return true;
                })
                .map((b, idx) => (
                  <div key={idx} className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900">{b.batch}</h4>
                      <span className="text-xs font-mono font-bold text-[#004b87] bg-white px-2.5 py-0.5 rounded-lg border border-slate-200">
                        {b.students} Scholars
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 text-xs">
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200/70">
                        <span className="text-slate-500 block text-[10px] uppercase font-mono">Average CGPA</span>
                        <strong className="text-slate-900 text-sm font-black font-mono">{b.avgCgpa}</strong>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200/70">
                        <span className="text-slate-500 block text-[10px] uppercase font-mono">Attendance</span>
                        <strong className="text-emerald-700 text-sm font-black font-mono">{b.attendance}%</strong>
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200/70 flex items-center justify-between">
                      <span>Academic Phase: <strong className="text-slate-900">{b.status}</strong></span>
                      <button
                        onClick={() => setActiveTab('timetable', 'classes')}
                        className="text-[11px] font-bold text-[#0068b5] hover:text-[#004b87] cursor-pointer"
                      >
                        Open Timetable →
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          TAB 3: ATTENDANCE APPEALS
         ========================================================= */}
      {activeTab === 'appeals' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-base font-bold text-slate-900">
              Statutory 75% Minimum Attendance Appeals & Grievances
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Medical certificates and official representations reviewed before examination admit card lockdown.
            </p>
          </div>

          <div className="space-y-3">
            {pendingMedicalAppeals.map((app) => {
              const isResolved = resolvedAppeals.includes(app.id);
              return (
                <div key={app.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {app.rollNo}
                      </span>
                      <strong className="text-sm text-slate-900">{app.student}</strong>
                      <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        {app.currentAtt} ({app.course})
                      </span>
                    </div>
                    <div className="text-xs text-slate-600">{app.reason}</div>
                    <div className="text-[11px] text-slate-400">
                      Medical Certificate: {app.certVerified ? 'Verified by Liaquat University Hospital Jamshoro' : 'Pending verification'}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isResolved ? (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                        Action Recorded & Synced
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => handleResolveAppeal(app.id, true)}
                          className="py-1.5 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Approve Medical Waiver
                        </button>
                        <button
                          onClick={() => handleResolveAppeal(app.id, false)}
                          className="py-1.5 px-3 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 4: ACCREDITATION (WITH SUB-TABS: CRITERIA vs OBE)
         ========================================================= */}
      {activeTab === 'accreditation' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-5 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Accreditation & Outcome-Based Education (OBE) Desk
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                NCEAC / HEC accreditation standards and CLO-PLO attainment verification for {department.name}.
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
              {[
                { id: 'criteria', label: 'Accreditation Criteria' },
                { id: 'obe', label: 'CLO Attainment Matrix' }
              ].map((st) => {
                const isSelected = (activeSubTab || 'criteria') === st.id;
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

          {(activeSubTab || 'criteria') === 'criteria' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-800">Faculty Student Ratio</div>
                <div className="text-lg font-black text-slate-900 font-mono">1 : 30</div>
                <p className="text-xs text-slate-600">Compliant with National Computing Education Accreditation Council norms.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-800">PhD Faculty Proportion</div>
                <div className="text-lg font-black text-[#004b87] font-mono">42%</div>
                <p className="text-xs text-slate-600">Foreign and indigenous doctoral degree holders heading core modules.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-800">Laboratory Readiness</div>
                <div className="text-lg font-black text-emerald-700 font-mono">100% Calibrated</div>
                <p className="text-xs text-slate-600">Modern computing labs with gigabit fiber backbone on Jamshoro campus.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Course Code</th>
                      <th className="py-2.5 px-3">Course Title</th>
                      <th className="py-2.5 px-3">Mapped PLOs</th>
                      <th className="py-2.5 px-3">Direct Attainment</th>
                      <th className="py-2.5 px-3">CQI Action Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { code: 'SWE-401', title: 'Software Architecture & Design', plos: 'PLO-1, PLO-3, PLO-5', score: '84.2%', status: 'Exceeds Benchmark (>70%)' },
                      { code: 'SWE-403', title: 'Software Quality Assurance', plos: 'PLO-2, PLO-4, PLO-6', score: '81.5%', status: 'Exceeds Benchmark (>70%)' },
                      { code: 'SWE-405', title: 'Cloud Computing & Distributed Systems', plos: 'PLO-3, PLO-5, PLO-9', score: '78.9%', status: 'Satisfactory Attainment' },
                      { code: 'CS-411', title: 'Professional Ethics & Cyber Law', plos: 'PLO-8 (Ethics), PLO-10', score: '88.4%', status: 'Exemplary Cohort Score' }
                    ].map((row) => (
                      <tr key={row.code} className="hover:bg-slate-50">
                        <td className="py-3 px-3 font-mono font-bold text-[#004b87]">{row.code}</td>
                        <td className="py-3 px-3 font-semibold text-slate-900">{row.title}</td>
                        <td className="py-3 px-3 font-mono text-slate-600">{row.plos}</td>
                        <td className="py-3 px-3 font-mono font-bold text-emerald-700">{row.score}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-[11px]">
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          TAB 5: DEPARTMENT BROADCAST & CIRCULARS LEDGER
         ========================================================= */}
      {activeTab === 'broadcast' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-200">
          <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4 h-fit">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Publish Official Department Circular
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Transmitted instantly to all enrolled student mobile devices and faculty portals.
              </p>
            </div>

            {broadcastSent && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Official Department Circular published and verified.</span>
              </div>
            )}

            <form onSubmit={handleBroadcast} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notice Headline</label>
                <input
                  type="text"
                  required
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  placeholder="e.g. Mandatory Lab Examination Timetable for Batch 2K23"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-blue-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Circular Content</label>
                <textarea
                  required
                  rows={4}
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  placeholder="Specify instructions, venues, dates, and regulatory notices for scholars..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-blue-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-5 rounded-xl bg-[#004b87] hover:bg-[#0b2545] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Dispatch Circular to Department</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Dispatched Departmental Circulars Ledger</h3>
                <p className="text-xs text-slate-500 mt-0.5">Official Gazette notices issued by {department.chairmanName}.</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#004b87] bg-slate-100 px-2.5 py-1 rounded-lg">
                {dispatchedCirculars.length} Active Notices
              </span>
            </div>

            <div className="space-y-3">
              {dispatchedCirculars.map((circ) => (
                <div key={circ.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono font-bold text-[#004b87] bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                      {circ.id}
                    </span>
                    <span className="text-slate-500 font-mono text-[11px]">{circ.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{circ.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{circ.content}</p>
                  <div className="pt-1.5 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200/60">
                    <span>Audience: <strong className="text-slate-700">{circ.target}</strong></span>
                    <span className="text-emerald-700 font-semibold">● Live on Student &amp; Faculty Portals</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB: CHAIRPERSON / DIRECTOR DESK & CREDENTIALS
         ========================================================= */}
      {activeTab === 'profile' && (
        <div className="bg-white border border-[#d8dadb] rounded-2xl p-6 shadow-2xs space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#004b87] border-2 border-[#d8dadb] p-1.5 flex items-center justify-center shadow-md shrink-0">
                <UniversitySeal size="lg" showText={false} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl font-black text-slate-900">{department.chairmanName}</h3>
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#eef4e3] text-[#4c6418] border border-[#84a433]/40 font-mono">
                    {isChairman ? 'Chairperson & Senior Professor' : 'Director of Institute'}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#004b87]/10 text-[#004b87] border border-[#004b87]/20">
                    QA &amp; OBE Approved
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 font-medium">
                  Department of Software Engineering · Faculty of Engineering &amp; Technology (FET) · University of Sindh, Jamshoro
                </p>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1 flex-wrap">
                  <span>Secretariat: FET Ground Floor, Allama I.I. Kazi Campus</span>
                  <span>·</span>
                  <span className="text-[#007a33] font-semibold">Board of Studies Chairperson</span>
                  <span>·</span>
                  <span className="text-[#004b87] font-mono">NCEAC Program Evaluator</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-mono uppercase block">Office Code</span>
              <span className="text-xs font-mono font-bold text-[#004b87] bg-slate-100 px-2.5 py-1 rounded border border-[#d8dadb]">
                DEPT-{department.code}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Accredited Department Programs</h4>
              <ul className="text-xs space-y-1.5 text-slate-600">
                {department.programs.map((prog, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0068b5] shrink-0" />
                    <span className="font-medium text-slate-800">{prog}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Academic Administration & Workload</h4>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span>Total Enrolled Scholars</span>
                  <span className="font-bold text-slate-900">{department.studentsCount} Students</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span>Teaching Faculty Roster</span>
                  <span className="font-bold text-slate-900">{deptTeachers.length} Professors &amp; Lecturers</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>National Accreditation</span>
                  <span className="font-bold text-[#007a33]">NCEAC W4 Level / HEC Level-1</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Official Secretariat Contact</h4>
              <div className="space-y-2 text-xs text-slate-600">
                <div>
                  <span className="text-[10px] text-slate-400 block">Department Email</span>
                  <span className="font-mono text-slate-800 font-semibold">{department.code.toLowerCase()}@usindh.edu.pk</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Chairperson Direct Office Extension</span>
                  <span className="font-mono text-slate-800 font-semibold">+92-22-9213181 Ext 240 / 241</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Student Consultation Hours</span>
                  <span className="text-slate-800">Tuesday &amp; Thursday: 11:00 AM – 01:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dedicated Institutional QA Inspection Dossier for Vice-Chancellor & Chairperson Review */}
          <div className="rounded-2xl border-2 border-[#84a433]/40 bg-gradient-to-br from-[#f8faf5] via-white to-[#f0f4e8] p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#84a433]/30 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#84a433] text-white rounded-xl shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900">
                    Statutory QA &amp; Inspection Dossier
                  </h4>
                  <p className="text-xs text-[#4c6418] font-semibold">
                    Prepared for High-Level Review by Vice-Chancellor &amp; Chairperson Prof. Dr. Arifa Bhutto
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#004b87] text-white self-start sm:self-auto">
                HEC &amp; NCEAC COMPLIANT
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white border border-[#d8dadb] space-y-1.5 shadow-2xs">
                <span className="text-[10px] font-mono uppercase font-bold text-[#004b87] block">1. 75% Attendance Rule</span>
                <strong className="text-slate-900 block text-xs">Biometric &amp; LMS Synchronized</strong>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Students below 75% attendance are automatically flagged and debarred from semester examinations until reviewed by Chairperson medical board.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#d8dadb] space-y-1.5 shadow-2xs">
                <span className="text-[10px] font-mono uppercase font-bold text-[#004b87] block">2. Four-Stage Grading Gate</span>
                <strong className="text-slate-900 block text-xs">Controller Stage-Gate Active</strong>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Instructor Marks &rarr; Department Scrutiny Committee &amp; Chairperson Approval &rarr; Dean FET Endorsement &rarr; Controller Tabulation.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#d8dadb] space-y-1.5 shadow-2xs">
                <span className="text-[10px] font-mono uppercase font-bold text-[#004b87] block">3. Computing Facilities</span>
                <strong className="text-slate-900 block text-xs">4 Specialized Labs (200+ PCs)</strong>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Ada Lovelace Computing Lab, Turing Seminar Hall, FET Lab 01 &amp; Lab 02 with gigabit campus fiber and uninterruptible solar power.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#d8dadb] space-y-1.5 shadow-2xs">
                <span className="text-[10px] font-mono uppercase font-bold text-[#004b87] block">4. OBE CLO-PLO Attainment</span>
                <strong className="text-slate-900 block text-xs">CQI Cycle Complete</strong>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  All 36 offered semester courses mapped to 12 Washington Accord Graduate Attributes with continuous quality improvement documentation.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
