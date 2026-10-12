import React, { useState, useMemo, useEffect } from 'react';
import {
  TimetableDay,
  TimetablePeriod,
  ProgramPart,
  SemesterNumber,
  ClassTimetableSlot,
  ExamDatesheetEntry,
  UniversityTimetableSettings,
  UNIVERSITY_PERIODS,
  TIMETABLE_DAYS,
  PART_METADATA,
  DEFAULT_HOME_ROOMS,
} from '../../data/timetableData';
import { UNIVERSITY_DEPARTMENTS } from '../../data/mockAcademicData';
import { UniversitySeal } from './UniversitySeal';
import {
  Calendar,
  Clock,
  Plus,
  Edit3,
  Trash2,
  Printer,
  CheckCircle2,
  Building2,
  UserCheck,
  BookOpen,
  ShieldCheck,
  Search,
  Settings,
  Layers,
  Award,
  X,
  Sparkles,
  FileSpreadsheet,
  Filter,
} from 'lucide-react';

interface TimetableMasterEngineProps {
  role: 'chairman' | 'hod' | 'dean' | 'vc' | 'faculty' | 'student' | 'parent' | 'admin';
  canManage: boolean; // True for Chairman, HOD, Admin (or when unlocked)
  classSlots?: ClassTimetableSlot[];
  slots?: ClassTimetableSlot[];
  onUpdateSlots?: React.Dispatch<React.SetStateAction<ClassTimetableSlot[]>>;
  onAddClassSlot?: (slot: ClassTimetableSlot) => void;
  onUpdateClassSlot?: (slot: ClassTimetableSlot) => void;
  onDeleteClassSlot?: (slotId: string) => void;
  examEntries: ExamDatesheetEntry[];
  onUpdateExams?: React.Dispatch<React.SetStateAction<ExamDatesheetEntry[]>>;
  onAddExamEntry?: (entry: ExamDatesheetEntry) => void;
  onUpdateExamEntry?: (entry: ExamDatesheetEntry) => void;
  onDeleteExamEntry?: (entryId: string) => void;
  settings: UniversityTimetableSettings;
  onUpdateSettings: (settings: UniversityTimetableSettings) => void;
  initialDeptId?: string;
  initialPart?: ProgramPart;
  initialSemester?: SemesterNumber;
  initialTeacherFilter?: string;
  lockedTeacherName?: string;
  initialSubView?: 'classes' | 'exams' | 'teachers' | 'settings';
  activeSubView?: string;
  onSubViewChange?: (sub: string) => void;
  onAddAuditLog?: (log: any) => void;
}

export const TimetableMasterEngine: React.FC<TimetableMasterEngineProps> = ({
  role,
  canManage,
  classSlots: propClassSlots,
  slots: propSlots,
  onUpdateSlots,
  onAddClassSlot: propAddClassSlot,
  onUpdateClassSlot: propUpdateClassSlot,
  onDeleteClassSlot: propDeleteClassSlot,
  examEntries,
  onUpdateExams,
  onAddExamEntry: propAddExamEntry,
  onUpdateExamEntry: propUpdateExamEntry,
  onDeleteExamEntry: propDeleteExamEntry,
  settings,
  onUpdateSettings,
  initialDeptId = 'dept_swe',
  initialPart = 'P-I',
  initialSemester,
  initialTeacherFilter = '',
  lockedTeacherName = '',
  initialSubView = 'classes',
  activeSubView,
  onSubViewChange,
  onAddAuditLog,
}) => {
  const classSlots = propClassSlots || propSlots || [];

  const onAddClassSlot = (slot: ClassTimetableSlot) => {
    if (propAddClassSlot) propAddClassSlot(slot);
    if (onUpdateSlots) onUpdateSlots((prev) => [...prev, slot]);
    if (onAddAuditLog) {
      onAddAuditLog({
        id: 'log_' + Date.now().toString().slice(-4),
        who: `${role.toUpperCase()} Office`,
        role: role.toUpperCase(),
        what: `Added Class Timetable Slot: ${slot.courseCode} (${slot.day} Period ${slot.period})`,
        category: 'Academic Administration',
        when: new Date().toLocaleString() + ' PKT',
        whereIp: '10.14.0.5 (Department Terminal)',
        objectTarget: `${slot.deptCode} ${slot.part} · Sem ${slot.semester}`,
        beforeState: 'Vacant Slot',
        afterState: `${slot.courseCode} ${slot.courseTitle} (${slot.teacher})`,
        reason: 'Official Semester Timetable Update',
        referenceId: 'TT-ADD-' + Date.now().toString().slice(-6),
      });
    }
  };

  const onUpdateClassSlot = (slot: ClassTimetableSlot) => {
    if (propUpdateClassSlot) propUpdateClassSlot(slot);
    if (onUpdateSlots) onUpdateSlots((prev) => prev.map((s) => (s.id === slot.id ? slot : s)));
    if (onAddAuditLog) {
      onAddAuditLog({
        id: 'log_' + Date.now().toString().slice(-4),
        who: `${role.toUpperCase()} Office`,
        role: role.toUpperCase(),
        what: `Updated Class Timetable Slot: ${slot.courseCode} (${slot.day} Period ${slot.period})`,
        category: 'Academic Administration',
        when: new Date().toLocaleString() + ' PKT',
        whereIp: '10.14.0.5 (Department Terminal)',
        objectTarget: `${slot.deptCode} ${slot.part} · Sem ${slot.semester}`,
        beforeState: 'Previous Timetable Entry',
        afterState: `${slot.courseCode} ${slot.courseTitle} (${slot.teacher} · ${slot.room})`,
        reason: 'Chairman / HOD Timetable Revision',
        referenceId: 'TT-UPD-' + Date.now().toString().slice(-6),
      });
    }
  };

  const onDeleteClassSlot = (slotId: string) => {
    if (propDeleteClassSlot) propDeleteClassSlot(slotId);
    if (onUpdateSlots) onUpdateSlots((prev) => prev.filter((s) => s.id !== slotId));
  };

  const onAddExamEntry = (entry: ExamDatesheetEntry) => {
    if (propAddExamEntry) propAddExamEntry(entry);
    if (onUpdateExams) onUpdateExams((prev) => [...prev, entry]);
    if (onAddAuditLog) {
      onAddAuditLog({
        id: 'log_' + Date.now().toString().slice(-4),
        who: `${role.toUpperCase()} Office`,
        role: role.toUpperCase(),
        what: `Added ${entry.examType} Exam Datesheet Paper: ${entry.courseCode} ${entry.subject}`,
        category: 'Examination Control',
        when: new Date().toLocaleString() + ' PKT',
        whereIp: '10.14.0.5 (Chairman Exam Terminal)',
        objectTarget: `${entry.deptCode} ${entry.part} · ${entry.date}`,
        beforeState: 'Unscheduled',
        afterState: `${entry.date} (${entry.time}) · ${entry.roomAllocation}`,
        reason: 'Official Exam Datesheet Notification',
        referenceId: 'EX-ADD-' + Date.now().toString().slice(-6),
      });
    }
  };

  const onUpdateExamEntry = (entry: ExamDatesheetEntry) => {
    if (propUpdateExamEntry) propUpdateExamEntry(entry);
    if (onUpdateExams) onUpdateExams((prev) => prev.map((x) => (x.id === entry.id ? entry : x)));
  };

  const onDeleteExamEntry = (entryId: string) => {
    if (propDeleteExamEntry) propDeleteExamEntry(entryId);
    if (onUpdateExams) onUpdateExams((prev) => prev.filter((x) => x.id !== entryId));
  };

  const normalizeSubView = (sv?: string): 'classes' | 'exams' | 'teachers' | 'settings' => {
    if (sv === 'exams') return 'exams';
    if (sv === 'teachers' || sv === 'rooms') return 'teachers';
    if (sv === 'settings') return 'settings';
    return 'classes';
  };

  const [activeSection, setActiveSection] = useState<'classes' | 'exams' | 'teachers' | 'settings'>(
    activeSubView ? normalizeSubView(activeSubView) : initialSubView
  );

  useEffect(() => {
    if (activeSubView) {
      setActiveSection(normalizeSubView(activeSubView));
    }
  }, [activeSubView]);

  useEffect(() => {
    setSelectedDeptId(initialDeptId);
  }, [initialDeptId]);

  const [selectedDeptId, setSelectedDeptId] = useState<string>(initialDeptId);
  const [selectedPart, setSelectedPart] = useState<ProgramPart>(initialPart);
  const [selectedSemester, setSelectedSemester] = useState<SemesterNumber>(
    initialSemester || (initialPart === 'P-I' ? 2 : initialPart === 'P-II' ? 4 : initialPart === 'P-III' ? 6 : 8)
  );
  const [selectedShift, setSelectedShift] = useState<'Morning' | 'Evening'>('Morning');
  const [examTypeFilter, setExamTypeFilter] = useState<'Midterm' | 'Final'>('Midterm');
  const [examPartFilter, setExamPartFilter] = useState<ProgramPart | 'ALL'>('ALL');
  const [teacherSearch, setTeacherSearch] = useState<string>(initialTeacherFilter || lockedTeacherName.split(' ').slice(-1)[0] || '');

  useEffect(() => {
    if (lockedTeacherName) {
      // Match last name or key segment so e.g. "Dr. Rafique Ahmed Memon" matches "Rafique"
      const parts = lockedTeacherName.replace(/Prof\.|Dr\.|Engr\.|Mr\.|Ms\./g, '').trim().split(/\s+/);
      if (parts[0]) setTeacherSearch(parts[0]);
    }
  }, [lockedTeacherName]);
  const [mobileDayFilter, setMobileDayFilter] = useState<TimetableDay | 'ALL'>('ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Class Slot Modal State (Add / Edit)
  const [editingSlot, setEditingSlot] = useState<ClassTimetableSlot | null>(null);
  const [isSlotModalOpen, setIsSlotModalOpen] = useState<boolean>(false);

  // Exam Entry Modal State (Add / Edit)
  const [editingExam, setEditingExam] = useState<ExamDatesheetEntry | null>(null);
  const [isExamModalOpen, setIsExamModalOpen] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const currentDept =
    UNIVERSITY_DEPARTMENTS.find((d) => d.id === selectedDeptId) || UNIVERSITY_DEPARTMENTS[0];

  const getDeptCodeLabel = (deptId: string) => {
    if (deptId === 'dept_it') return 'BSIT';
    if (deptId === 'dept_swe') return 'BSSW';
    if (deptId === 'dept_ds') return 'BSDS';
    if (deptId === 'dept_cs') return 'BSCS';
    if (deptId === 'dept_tele') return 'BSTELE';
    if (deptId === 'dept_iba') return 'BBA';
    return currentDept.code;
  };

  const getExamDeptHeader = (deptId: string) => {
    if (deptId === 'dept_it') return 'BS (IT)';
    if (deptId === 'dept_swe') return 'BS (SW)';
    if (deptId === 'dept_ds') return 'BS (DS)';
    return `BS (${currentDept.code})`;
  };

  const handleSelectPart = (part: ProgramPart) => {
    setSelectedPart(part);
    const meta = PART_METADATA.find((p) => p.part === part);
    if (meta) {
      setSelectedSemester(meta.evenSemester);
    }
  };

  const handleSelectSemester = (sem: SemesterNumber) => {
    setSelectedSemester(sem);
    if (sem === 1 || sem === 2) setSelectedPart('P-I');
    else if (sem === 3 || sem === 4) setSelectedPart('P-II');
    else if (sem === 5 || sem === 6) setSelectedPart('P-III');
    else setSelectedPart('P-IV');
  };

  // Filtered slots for current Department + Part (or fallback to even semester of that part so all 8 semesters have rich visual schedule)
  const activeClassSlots = useMemo(() => {
    const exact = classSlots.filter(
      (s) => s.deptId === selectedDeptId && s.part === selectedPart && s.semester === selectedSemester
    );
    if (exact.length > 0) return exact;
    // If user selected odd semester (1, 3, 5, 7) or another department, fall back to same Part in dept or SWE so grid is never blank unless deleted
    const partMatch = classSlots.filter((s) => s.deptId === selectedDeptId && s.part === selectedPart);
    if (partMatch.length > 0) return partMatch;
    return classSlots.filter((s) => s.deptId === 'dept_swe' && s.part === selectedPart);
  }, [classSlots, selectedDeptId, selectedPart, selectedSemester]);

  const homeRoom =
    DEFAULT_HOME_ROOMS[selectedDeptId]?.[selectedPart] ||
    activeClassSlots[0]?.room ||
    'Lecture Hall @ Hitech';

  // Unique teachers across all timetable slots & exam entries
  const allTeachers = useMemo(() => {
    const set = new Set<string>();
    classSlots.forEach((s) => {
      s.teacher.split('/').forEach((t) => set.add(t.trim()));
    });
    examEntries.forEach((e) => {
      if (e.teacherMorning) set.add(e.teacherMorning.trim());
    });
    return Array.from(set).sort();
  }, [classSlots, examEntries]);

  // Open modal to add new slot
  const handleOpenAddSlot = (day: TimetableDay = 'Monday', period: TimetablePeriod = 1) => {
    setEditingSlot({
      id: 'slot_' + Date.now(),
      deptId: selectedDeptId,
      deptCode: getDeptCodeLabel(selectedDeptId),
      part: selectedPart,
      semester: selectedSemester,
      day,
      period,
      span: 1,
      courseCode: '',
      courseTitle: '',
      teacher: '',
      room: homeRoom,
      shift: selectedShift,
      type: 'Lecture',
    });
    setIsSlotModalOpen(true);
  };

  // Open modal to edit existing slot
  const handleOpenEditSlot = (slot: ClassTimetableSlot) => {
    setEditingSlot({ ...slot });
    setIsSlotModalOpen(true);
  };

  const handleSaveSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlot) return;
    const exists = classSlots.some((s) => s.id === editingSlot.id);
    if (exists) {
      onUpdateClassSlot(editingSlot);
      showToast(`Updated ${editingSlot.courseCode} (${editingSlot.day} P-${editingSlot.period})`);
    } else {
      onAddClassSlot(editingSlot);
      showToast(`Added ${editingSlot.courseCode} to ${editingSlot.deptCode} ${editingSlot.part} Timetable`);
    }
    setIsSlotModalOpen(false);
    setEditingSlot(null);
  };

  // Open modal to add new exam entry
  const handleOpenAddExam = (part: ProgramPart = selectedPart) => {
    const currentDeptExams = examEntries.filter(
      (x) => x.deptId === selectedDeptId && x.part === part && x.examType === examTypeFilter
    );
    setEditingExam({
      id: 'exam_' + Date.now(),
      deptId: selectedDeptId,
      deptCode: getExamDeptHeader(selectedDeptId),
      part,
      semester: part === 'P-I' ? 2 : part === 'P-II' ? 4 : part === 'P-III' ? 6 : 8,
      examType: examTypeFilter,
      sNo: currentDeptExams.length + 1,
      date: '17-10-2026',
      courseCode: '',
      subject: '',
      time: '09:00 A.M TO 10:00 A.M',
      teacherMorning: '',
      teacherEvening: 'Morning / Evening',
      roomAllocation:
        selectedDeptId === 'dept_it'
          ? 'Room 10 & Room 8 (Morning) · Room 1 & Room 2 (Evening)'
          : selectedDeptId === 'dept_swe'
          ? 'Room 22 And Corridor (Morning) · Room 20 (Evening)'
          : 'Room 3 & Room 4',
    });
    setIsExamModalOpen(true);
  };

  const handleOpenEditExam = (entry: ExamDatesheetEntry) => {
    setEditingExam({ ...entry });
    setIsExamModalOpen(true);
  };

  const handleSaveExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExam) return;
    const exists = examEntries.some((x) => x.id === editingExam.id);
    if (exists) {
      onUpdateExamEntry(editingExam);
      showToast(`Updated ${editingExam.examType} Exam: ${editingExam.courseCode} ${editingExam.subject}`);
    } else {
      onAddExamEntry(editingExam);
      showToast(`Added ${editingExam.courseCode} to ${editingExam.deptCode} ${editingExam.part} ${editingExam.examType} Schedule`);
    }
    setIsExamModalOpen(false);
    setEditingExam(null);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Non-blocking Toast */}
      {toastMessage && (
        <div className="fixed bottom-16 lg:bottom-6 right-4 z-50 bg-[#004b87] text-white px-4 py-3 rounded-2xl shadow-2xl border border-[#c8e27b] flex items-center gap-2.5 text-xs font-bold animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#c8e27b] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =====================================================================
          MASTER TIMETABLE & EXAMINATION COMMAND BAR
         ===================================================================== */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4 no-print">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-[#004b87]/10 text-[#004b87] font-mono text-[10px] font-bold uppercase tracking-wider">
                {settings.generatorEngine} · Version {settings.version}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-[10px] font-bold">
                w.e.f {settings.effectiveDate} · Live Sync Active
              </span>
              {canManage && (
                <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 font-mono text-[10px] font-bold">
                  Chairman / HOD Full CRUD Authority
                </span>
              )}
            </div>
            <h2 className="text-base sm:text-xl font-black text-slate-900 tracking-tight">
              Central University Timetable & Examination Datesheet System (1–4 Years · 8 Semesters)
            </h2>
            <p className="text-xs text-slate-500">
              Official aSc Classes Timetable (8:30 AM – 1:30 PM) & Midterm/Final Examination Schedules controlled by Department Chairmen/HODs and synced live to Students & Teachers.
            </p>
          </div>

          {/* 4 Sub-Section Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl overflow-x-auto no-scrollbar shrink-0">
            {[
              { id: 'classes', label: 'Classes Timetable (P-I to P-IV)', icon: <Calendar className="w-3.5 h-3.5" /> },
              { id: 'exams', label: 'Midterm & Final Datesheet', icon: <Award className="w-3.5 h-3.5" /> },
              { id: 'teachers', label: 'Teacher Assigned Matrix', icon: <UserCheck className="w-3.5 h-3.5" /> },
              ...(canManage
                ? [{ id: 'settings', label: 'University Settings', icon: <Settings className="w-3.5 h-3.5" /> }]
                : []),
            ].map((tab) => {
              const isSelected = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveSection(tab.id as any);
                    onSubViewChange?.(tab.id);
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#004b87] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Universal Department + Year (P-I to P-IV) + Semester (1-8) Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Department Selector */}
          <div className="md:col-span-4">
            <label className="block text-[10px] font-mono uppercase font-bold text-slate-400 mb-1">
              University Department / Institute
            </label>
            <select
              value={selectedDeptId}
              onChange={(e) => setSelectedDeptId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50/80 text-xs font-bold text-slate-900 focus:outline-hidden focus:border-[#004b87] cursor-pointer"
            >
              {UNIVERSITY_DEPARTMENTS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.code})
                </option>
              ))}
            </select>
          </div>

          {/* 4-Year Part Selector (P-I, P-II, P-III, P-IV) */}
          <div className="md:col-span-4">
            <label className="block text-[10px] font-mono uppercase font-bold text-slate-400 mb-1">
              Academic Year / Part (1–4 Years)
            </label>
            <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-xl">
              {PART_METADATA.map((pm) => {
                const isSelected = selectedPart === pm.part;
                return (
                  <button
                    key={pm.part}
                    onClick={() => handleSelectPart(pm.part)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                      isSelected
                        ? 'bg-[#004b87] text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title={pm.yearLabel}
                  >
                    {pm.part}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 8-Semester Selector (Semesters 1 to 8) */}
          <div className="md:col-span-4">
            <label className="block text-[10px] font-mono uppercase font-bold text-slate-400 mb-1">
              Semester (1–8 Semesters)
            </label>
            <div className="grid grid-cols-8 gap-1 bg-slate-100 p-1 rounded-xl">
              {([1, 2, 3, 4, 5, 6, 7, 8] as SemesterNumber[]).map((sem) => {
                const isSelected = selectedSemester === sem;
                return (
                  <button
                    key={sem}
                    onClick={() => handleSelectSemester(sem)}
                    className={`py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer text-center ${
                      isSelected
                        ? 'bg-[#004b87] text-[#c8e27b] shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title={`Semester ${sem}`}
                  >
                    S{sem}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          SECTION 1: OFFICIAL aSc CLASSES TIMETABLE (P-I to P-IV / SEM 1-8)
         ===================================================================== */}
      {activeSection === 'classes' && (
        <div className="bg-white border-2 border-slate-900 rounded-2xl shadow-sm overflow-hidden">
          {/* Official aSc Timetable Header Lockup (Matches Attached PDF 1) */}
          <div className="p-4 sm:p-6 border-b-2 border-slate-900 bg-gradient-to-b from-slate-50/70 to-white">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-semibold text-slate-800">
              <span className="font-mono font-bold uppercase tracking-wider text-[#004b87]">
                FET · {currentDept.name}
              </span>
              <span className="text-center font-semibold">
                {settings.sessionTitle} (w.e.f {settings.effectiveDate})
              </span>
              <span className="font-mono font-bold">{settings.version}</span>
            </div>

            <div className="my-3 text-center">
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950 font-sans">
                {getDeptCodeLabel(selectedDeptId)} {selectedPart}
              </h1>
              <div className="text-xs font-mono text-slate-500 mt-0.5">
                {PART_METADATA.find((p) => p.part === selectedPart)?.yearLabel} · Semester {selectedSemester} ({selectedShift} Program)
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200 text-xs">
              <div className="font-bold text-slate-800">
                AoRE · <span className="text-[#004b87]">{currentDept.chairmanName}</span>
              </div>

              {/* Action Controls */}
              <div className="flex flex-wrap items-center gap-2 no-print">
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                  {(['Morning', 'Evening'] as const).map((sh) => (
                    <button
                      key={sh}
                      onClick={() => setSelectedShift(sh)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer ${
                        selectedShift === sh ? 'bg-white text-[#004b87] shadow-2xs' : 'text-slate-600'
                      }`}
                    >
                      {sh}
                    </button>
                  ))}
                </div>

                {canManage && (
                  <button
                    onClick={() => handleOpenAddSlot('Monday', 1)}
                    className="px-3 py-1.5 rounded-xl bg-[#004b87] hover:bg-[#0b2545] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Class / Lab Slot</span>
                  </button>
                )}

                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Timetable</span>
                </button>
              </div>

              <div className="font-bold text-slate-900">
                Home Room: <span className="font-mono text-[#004b87]">{homeRoom}</span>
              </div>
            </div>
          </div>

          {/* Mobile Day Filter Pills (<md) */}
          <div className="md:hidden px-3 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar no-print">
            <button
              onClick={() => setMobileDayFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 cursor-pointer ${
                mobileDayFilter === 'ALL' ? 'bg-[#004b87] text-white' : 'bg-white text-slate-700 border border-slate-200'
              }`}
            >
              All Days
            </button>
            {TIMETABLE_DAYS.map((day) => (
              <button
                key={day}
                onClick={() => setMobileDayFilter(day)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 cursor-pointer ${
                  mobileDayFilter === day ? 'bg-[#004b87] text-white' : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Mobile Day-by-Day Cards (<md) */}
          <div className="md:hidden p-3 space-y-4">
            {TIMETABLE_DAYS.filter((d) => mobileDayFilter === 'ALL' || d === mobileDayFilter).map((day) => {
              const daySlots = activeClassSlots
                .filter((s) => s.day === day)
                .sort((a, b) => a.period - b.period);
              return (
                <div key={day} className="border border-slate-300 rounded-xl overflow-hidden bg-white">
                  <div className="bg-[#0b2545] text-white px-3.5 py-2 flex items-center justify-between text-xs font-bold">
                    <span>{day}</span>
                    {canManage && (
                      <button
                        onClick={() => handleOpenAddSlot(day, 1)}
                        className="px-2 py-0.5 rounded bg-white/15 hover:bg-white/25 text-[#c8e27b] text-[11px] flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" /> Add Slot
                      </button>
                    )}
                  </div>
                  {daySlots.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400">
                      No scheduled lectures on {day} (Self-Study / FYP Research Day)
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-200">
                      {daySlots.map((slot) => {
                        const pDef = UNIVERSITY_PERIODS.find((p) => p.period === slot.period);
                        const endPDef = UNIVERSITY_PERIODS.find(
                          (p) => p.period === ((slot.period + (slot.span || 1) - 1) as TimetablePeriod)
                        );
                        const timeLabel =
                          slot.span > 1 && pDef && endPDef
                            ? `${pDef.timeRange.split(' - ')[0]} - ${endPDef.timeRange.split(' - ')[1]}`
                            : pDef?.timeRange;
                        return (
                          <div key={slot.id} className="p-3 space-y-1.5 hover:bg-slate-50">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono text-[11px] font-bold text-[#004b87] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                                Period {slot.period}
                                {slot.span > 1 ? `–${slot.period + slot.span - 1}` : ''} ({timeLabel})
                              </span>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[11px] font-mono font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                                  {slot.room}
                                </span>
                                {canManage && (
                                  <>
                                    <button
                                      onClick={() => handleOpenEditSlot(slot)}
                                      className="p-1 rounded bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-[#004b87] cursor-pointer"
                                      title="Edit Slot"
                                    >
                                      <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => {
                                        onDeleteClassSlot(slot.id);
                                        showToast(`Removed ${slot.courseCode} from ${slot.day}`);
                                      }}
                                      className="p-1 rounded bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-700 cursor-pointer"
                                      title="Delete Slot"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="text-xs font-extrabold text-slate-900">
                              {slot.courseCode} · {slot.courseTitle}
                            </div>
                            <div className="text-[11px] font-semibold text-slate-600">{slot.teacher}</div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop & Print Authentic 6-Period aSc Timetable Grid (md:block) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse table-fixed">
              <thead>
                <tr className="border-b-2 border-slate-900 bg-slate-50">
                  <th className="w-32 border-r-2 border-slate-900 p-3 text-left text-xs font-bold text-slate-500 uppercase font-mono">
                    Day / Period
                  </th>
                  {UNIVERSITY_PERIODS.map((p) => (
                    <th key={p.period} className="border-r border-slate-900 p-2.5 text-center">
                      <div className="text-xs sm:text-sm font-black text-slate-900 font-mono">
                        {selectedShift === 'Morning' ? p.timeRange : p.eveningTimeRange}
                      </div>
                      <div className="text-right text-base font-bold text-slate-800 pr-1 leading-none mt-1">
                        {p.period}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIMETABLE_DAYS.map((day) => {
                  const daySlots = activeClassSlots.filter((s) => s.day === day);
                  const cells: React.ReactNode[] = [];
                  let p = 1;
                  while (p <= 6) {
                    const currentPeriod = p as TimetablePeriod;
                    const slot = daySlots.find((s) => s.period === currentPeriod);
                    if (slot) {
                      const span = Math.min(slot.span || 1, 7 - p);
                      cells.push(
                        <td
                          key={`${day}_p${p}`}
                          colSpan={span}
                          className={`border-r border-b border-slate-900 p-2.5 align-top relative group transition-colors ${
                            slot.type === 'Lab'
                              ? 'bg-[#004b87]/[0.04] hover:bg-[#004b87]/[0.08]'
                              : slot.type === 'Capstone'
                              ? 'bg-amber-50/50 hover:bg-amber-50'
                              : 'bg-white hover:bg-slate-50/90'
                          }`}
                        >
                          <div className="min-h-[96px] flex flex-col justify-between gap-2">
                            {/* Top: Course Code & Subject Title */}
                            <div className="text-center">
                              <div className="text-xs font-black text-slate-950 leading-snug">
                                {slot.courseCode} {slot.courseTitle}
                              </div>
                            </div>

                            {/* Middle: Room / Lab aligned right */}
                            <div className="text-right text-[11px] font-medium text-slate-700 pr-1">
                              {slot.room}
                            </div>

                            {/* Bottom: Teacher Name aligned left */}
                            <div className="text-left text-[11px] font-bold text-slate-900 leading-tight">
                              {slot.teacher}
                            </div>
                          </div>

                          {/* Chairman / HOD Hover CRUD Controls */}
                          {canManage && (
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-1.5 right-1.5 flex items-center gap-1 bg-white/95 p-1 rounded-lg shadow-md border border-slate-200 no-print">
                              <button
                                onClick={() => handleOpenEditSlot(slot)}
                                className="p-1 rounded hover:bg-blue-50 text-[#004b87] cursor-pointer"
                                title="Edit Class Slot"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  onDeleteClassSlot(slot.id);
                                  showToast(`Deleted ${slot.courseCode} from ${day} Period ${slot.period}`);
                                }}
                                className="p-1 rounded hover:bg-rose-50 text-rose-600 cursor-pointer"
                                title="Delete Class Slot"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </td>
                      );
                      p += span;
                    } else {
                      cells.push(
                        <td
                          key={`${day}_p${p}`}
                          className="border-r border-b border-slate-900 p-2 align-middle text-center min-h-[96px] group hover:bg-slate-50/80 transition-colors"
                        >
                          {canManage ? (
                            <button
                              onClick={() => handleOpenAddSlot(day, currentPeriod)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity px-2.5 py-1.5 rounded-lg border border-dashed border-slate-300 text-[11px] font-bold text-slate-500 hover:text-[#004b87] hover:border-[#004b87] inline-flex items-center gap-1 cursor-pointer no-print"
                            >
                              <Plus className="w-3 h-3" /> Assign
                            </button>
                          ) : (
                            <span className="text-[11px] text-slate-200 select-none">—</span>
                          )}
                        </td>
                      );
                      p += 1;
                    }
                  }

                  return (
                    <tr key={day} className="border-b border-slate-900">
                      <td className="border-r-2 border-slate-900 p-3 font-bold text-base sm:text-lg text-slate-950 text-center align-middle bg-slate-50/40">
                        {day}
                      </td>
                      {cells}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Official aSc Footer */}
          <div className="px-4 sm:px-6 py-2.5 bg-slate-50 border-t border-slate-300 flex items-center justify-between text-[11px] font-medium text-slate-700">
            <span>Timetable generated: 9/6/2025 · Effective {settings.effectiveDate}</span>
            <span className="italic font-serif">aSc Timetables · University of Sindh Central LMS</span>
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 2: OFFICIAL SCHEDULE OF MIDTERM & FINAL EXAMINATIONS 2026
         ===================================================================== */}
      {activeSection === 'exams' && (
        <div className="bg-white border-2 border-slate-900 rounded-2xl shadow-sm overflow-hidden">
          {/* Official University of Sindh Examination Datesheet Header (Matches PDF 2) */}
          <div className="p-4 sm:p-6 border-b-2 border-slate-900 text-center space-y-1.5 bg-gradient-to-b from-slate-50 to-white relative">
            <h2 className="text-lg sm:text-2xl font-black text-slate-950 uppercase tracking-tight">
              {currentDept.name.toUpperCase()}
            </h2>
            <div className="text-xs sm:text-sm font-extrabold text-slate-800 uppercase tracking-wide">
              UNIVERSITY OF SINDH JAMSHORO
            </div>
            <div className="text-xs sm:text-sm font-black text-[#004b87] uppercase underline decoration-2 underline-offset-4">
              SCHEDULE OF {examTypeFilter.toUpperCase()} EXAMINATION 2026
            </div>

            {/* Filter & Add Controls */}
            <div className="pt-3 flex flex-wrap items-center justify-between gap-2 no-print">
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                {(['Midterm', 'Final'] as const).map((et) => (
                  <button
                    key={et}
                    onClick={() => setExamTypeFilter(et)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      examTypeFilter === et
                        ? 'bg-[#004b87] text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {et} Examination 2026
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                {(['ALL', 'P-I', 'P-II', 'P-III', 'P-IV'] as const).map((pt) => (
                  <button
                    key={pt}
                    onClick={() => setExamPartFilter(pt)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                      examPartFilter === pt
                        ? 'bg-[#0b2545] text-[#c8e27b]'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {pt === 'ALL' ? 'All Parts (P-I to P-IV)' : pt}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {canManage && (
                  <button
                    onClick={() => handleOpenAddExam(examPartFilter === 'ALL' ? 'P-I' : examPartFilter)}
                    className="px-3 py-1.5 rounded-xl bg-[#004b87] hover:bg-[#0b2545] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Exam Paper</span>
                  </button>
                )}
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Datesheet</span>
                </button>
              </div>
            </div>
          </div>

          {/* Grouped by Part: P-I, P-II, P-III, P-IV */}
          <div className="divide-y-2 divide-slate-900">
            {(['P-I', 'P-II', 'P-III', 'P-IV'] as ProgramPart[])
              .filter((pt) => examPartFilter === 'ALL' || pt === examPartFilter)
              .map((part) => {
                const partExams = examEntries
                  .filter(
                    (e) =>
                      (e.deptId === selectedDeptId ||
                        (examEntries.filter((x) => x.deptId === selectedDeptId).length === 0 &&
                          e.deptId === 'dept_swe')) &&
                      e.part === part &&
                      e.examType === examTypeFilter
                  )
                  .sort((a, b) => a.sNo - b.sNo);

                return (
                  <div key={part} className="bg-white">
                    <div className="bg-slate-100 border-b border-slate-900 py-2 px-4 flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-wide mx-auto">
                        {getExamDeptHeader(selectedDeptId)} {part} SECOND SEMESTER {examTypeFilter.toUpperCase()} EXAMINATION 2026 (MORNING / EVENING)
                      </span>
                      {canManage && (
                        <button
                          onClick={() => handleOpenAddExam(part)}
                          className="px-2 py-0.5 rounded bg-[#004b87] text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer shrink-0 no-print"
                        >
                          <Plus className="w-3 h-3" /> Add to {part}
                        </button>
                      )}
                    </div>

                    {partExams.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-400">
                        No {examTypeFilter} papers scheduled for {part} yet.
                        {canManage && (
                          <button
                            onClick={() => handleOpenAddExam(part)}
                            className="ml-2 text-[#004b87] font-bold underline cursor-pointer"
                          >
                            + Add First Paper
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left border-collapse">
                          <thead>
                            <tr className="border-b border-slate-900 bg-slate-50/80 text-slate-900 font-bold">
                              <th className="py-2 px-3 border-r border-slate-900 w-14 text-center">S.No</th>
                              <th className="py-2 px-3 border-r border-slate-900 w-28 text-center">Date</th>
                              <th className="py-2 px-3 border-r border-slate-900">Subject</th>
                              <th className="py-2 px-3 border-r border-slate-900 w-44 text-center">Time</th>
                              <th className="py-2 px-3 border-r border-slate-900">Teacher</th>
                              <th className="py-2 px-3 w-48 text-center">Room Allocation</th>
                              {canManage && (
                                <th className="py-2 px-3 border-l border-slate-900 w-24 text-center no-print">
                                  Actions
                                </th>
                              )}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-900">
                            {partExams.map((item) => (
                              <tr key={item.id} className="hover:bg-slate-50">
                                <td className="py-2.5 px-3 border-r border-slate-900 text-center font-bold">
                                  {item.sNo}
                                </td>
                                <td className="py-2.5 px-3 border-r border-slate-900 text-center font-mono font-bold text-slate-900">
                                  {item.date}
                                </td>
                                <td className="py-2.5 px-3 border-r border-slate-900 font-semibold text-slate-900">
                                  <span className="font-mono font-bold text-[#004b87] mr-1.5">
                                    {item.courseCode}
                                  </span>
                                  {item.subject}
                                </td>
                                <td className="py-2.5 px-3 border-r border-slate-900 text-center font-mono font-bold text-slate-900">
                                  {item.time}
                                </td>
                                <td className="py-2.5 px-3 border-r border-slate-900 text-slate-800">
                                  <div className="font-semibold">{item.teacherMorning} (Morning)</div>
                                  {item.teacherEvening && item.teacherEvening !== 'Morning Only' && (
                                    <div className="text-[11px] text-slate-600">
                                      {item.teacherEvening === item.teacherMorning
                                        ? '(Morning) / (Evening)'
                                        : `${item.teacherEvening} (Evening)`}
                                    </div>
                                  )}
                                </td>
                                <td className="py-2.5 px-3 text-center text-[11px] font-semibold text-slate-700">
                                  {item.roomAllocation}
                                </td>
                                {canManage && (
                                  <td className="py-2.5 px-3 border-l border-slate-900 text-center no-print">
                                    <div className="inline-flex items-center gap-1">
                                      <button
                                        onClick={() => handleOpenEditExam(item)}
                                        className="p-1.5 rounded bg-slate-100 hover:bg-blue-100 text-[#004b87] cursor-pointer"
                                        title="Edit Exam Entry"
                                      >
                                        <Edit3 className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        onClick={() => {
                                          onDeleteExamEntry(item.id);
                                          showToast(`Removed ${item.courseCode} from ${part} Datesheet`);
                                        }}
                                        className="p-1.5 rounded bg-slate-100 hover:bg-rose-100 text-rose-600 cursor-pointer"
                                        title="Delete Exam Entry"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </td>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

          {/* Official Factotum & Chairman Signatory Footer (Matches PDF 2) */}
          <div className="p-6 bg-slate-50 border-t-2 border-slate-900 flex items-center justify-between text-xs sm:text-sm font-black text-slate-900">
            <div className="border-t-2 border-slate-900 pt-1.5 px-4">
              Factotum {currentDept.code}
            </div>
            <div className="text-center text-[11px] font-mono text-slate-500 font-normal">
              Verified & Issued by Office of the Chairperson · {currentDept.name}
            </div>
            <div className="border-t-2 border-slate-900 pt-1.5 px-4">
              Chairman {currentDept.code} ({currentDept.chairmanName})
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 3: TEACHER WORKLOAD & ASSIGNED TIMETABLE MATRIX
         ===================================================================== */}
      {activeSection === 'teachers' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Faculty & Teacher Assigned Timetable & Examination Supervision Matrix
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Every class lecture, 2-hour lab, and midterm/final exam assigned across BSIT, BSSW, and BSDS (P-I to P-IV).
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  value={teacherSearch}
                  onChange={(e) => setTeacherSearch(e.target.value)}
                  placeholder="Filter by teacher name or course..."
                  className="pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs w-64 focus:outline-hidden focus:border-[#004b87]"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
              {teacherSearch && (
                <button
                  onClick={() => setTeacherSearch('')}
                  className="px-2.5 py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-600 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Quick Teacher Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setTeacherSearch('')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 cursor-pointer ${
                teacherSearch === '' ? 'bg-[#004b87] text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              All Teachers ({allTeachers.length})
            </button>
            {allTeachers.slice(0, 14).map((tName) => (
              <button
                key={tName}
                onClick={() => setTeacherSearch(tName)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 cursor-pointer ${
                  teacherSearch === tName
                    ? 'bg-[#004b87] text-white font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tName}
              </button>
            ))}
          </div>

          {/* Assigned Class Slots Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase font-mono text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Instructor Name</th>
                  <th className="py-2.5 px-3">Dept & Cohort</th>
                  <th className="py-2.5 px-3">Day & Period</th>
                  <th className="py-2.5 px-3">Course Code & Title</th>
                  <th className="py-2.5 px-3">Room / Lab</th>
                  <th className="py-2.5 px-3 text-right">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {classSlots
                  .filter(
                    (s) =>
                      !teacherSearch ||
                      s.teacher.toLowerCase().includes(teacherSearch.toLowerCase()) ||
                      s.courseCode.toLowerCase().includes(teacherSearch.toLowerCase()) ||
                      s.courseTitle.toLowerCase().includes(teacherSearch.toLowerCase())
                  )
                  .slice(0, 45)
                  .map((slot) => {
                    const pDef = UNIVERSITY_PERIODS.find((p) => p.period === slot.period);
                    return (
                      <tr key={slot.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-bold text-slate-900">{slot.teacher}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-[#004b87]">
                          {slot.deptCode} {slot.part} (Sem {slot.semester})
                        </td>
                        <td className="py-2.5 px-3 font-mono text-slate-700">
                          {slot.day} · P{slot.period}
                          {slot.span > 1 ? `–P${slot.period + slot.span - 1}` : ''} ({pDef?.timeRange})
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-slate-900">
                          <span className="font-mono text-[#004b87] mr-1">{slot.courseCode}:</span>
                          {slot.courseTitle}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-slate-600">{slot.room}</td>
                        <td className="py-2.5 px-3 text-right">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              slot.type === 'Lab'
                                ? 'bg-blue-50 text-blue-800 border border-blue-200'
                                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            }`}
                          >
                            {slot.type}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 4: UNIVERSITY MASTER TIMETABLE & BELL SETTINGS (HOD/CHAIRMAN)
         ===================================================================== */}
      {activeSection === 'settings' && canManage && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900">
              University of Sindh Master Timetable & Examination Bell Governance
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Changes made here by the Chairman / HOD propagate across all Student, Faculty, Dean, and VC Portals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Timetable Title</label>
              <input
                type="text"
                value={settings.sessionTitle}
                onChange={(e) => onUpdateSettings({ ...settings, sessionTitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Effective Date (w.e.f)</label>
              <input
                type="text"
                value={settings.effectiveDate}
                onChange={(e) => onUpdateSettings({ ...settings, effectiveDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Revision Version</label>
              <input
                type="text"
                value={settings.version}
                onChange={(e) => onUpdateSettings({ ...settings, version: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono font-bold text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">Live Student & Teacher Sync</div>
                <div className="text-[11px] text-slate-500">Push timetable edits immediately to portals</div>
              </div>
              <input
                type="checkbox"
                checked={settings.syncToStudentAndTeacherPortals}
                onChange={(e) =>
                  onUpdateSettings({
                    ...settings,
                    syncToStudentAndTeacherPortals: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-[#004b87] cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">Friday Jummah Prayer Rule</div>
                <div className="text-[11px] text-slate-500">Reserve Friday P4–P6 after 11:00 AM</div>
              </div>
              <input
                type="checkbox"
                checked={settings.jummahBreakEnabled}
                onChange={(e) =>
                  onUpdateSettings({ ...settings, jummahBreakEnabled: e.target.checked })
                }
                className="w-4 h-4 accent-[#004b87] cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">Chairman Seal Lockdown</div>
                <div className="text-[11px] text-slate-500">Freeze room re-allocation during exams</div>
              </div>
              <input
                type="checkbox"
                checked={settings.hodLockdownActive}
                onChange={(e) =>
                  onUpdateSettings({ ...settings, hodLockdownActive: e.target.checked })
                }
                className="w-4 h-4 accent-[#004b87] cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => showToast('University Timetable & Examination Settings Saved & Synced!')}
              className="px-5 py-2.5 rounded-xl bg-[#004b87] hover:bg-[#0b2545] text-white text-xs font-bold cursor-pointer shadow-xs"
            >
              Save & Broadcast Timetable Settings
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 1: ADD / EDIT CLASS TIMETABLE SLOT
         ===================================================================== */}
      {isSlotModalOpen && editingSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {classSlots.some((s) => s.id === editingSlot.id)
                    ? 'Edit Class / Lab Timetable Slot'
                    : 'Add New Class / Lab Timetable Slot'}
                </h3>
                <p className="text-xs text-slate-500">
                  {editingSlot.deptCode} {editingSlot.part} (Semester {editingSlot.semester})
                </p>
              </div>
              <button
                onClick={() => setIsSlotModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSlot} className="space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Day</label>
                  <select
                    value={editingSlot.day}
                    onChange={(e) =>
                      setEditingSlot({ ...editingSlot, day: e.target.value as TimetableDay })
                    }
                    className="w-full p-2 rounded-lg border border-slate-300 font-semibold"
                  >
                    {TIMETABLE_DAYS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Start Period</label>
                  <select
                    value={editingSlot.period}
                    onChange={(e) =>
                      setEditingSlot({
                        ...editingSlot,
                        period: Number(e.target.value) as TimetablePeriod,
                      })
                    }
                    className="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold"
                  >
                    {UNIVERSITY_PERIODS.map((p) => (
                      <option key={p.period} value={p.period}>
                        P-{p.period} ({p.timeRange})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duration / Span</label>
                  <select
                    value={editingSlot.span}
                    onChange={(e) =>
                      setEditingSlot({
                        ...editingSlot,
                        span: Number(e.target.value) as 1 | 2 | 3,
                        type: Number(e.target.value) === 2 ? 'Lab' : Number(e.target.value) === 3 ? 'Capstone' : 'Lecture',
                      })
                    }
                    className="w-full p-2 rounded-lg border border-slate-300 font-semibold"
                  >
                    <option value={1}>1 Period (50m Lecture)</option>
                    <option value={2}>2 Periods (100m Lab)</option>
                    <option value={3}>3 Periods (FYP / Capstone)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Course Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SE24-414"
                    value={editingSlot.courseCode}
                    onChange={(e) => setEditingSlot({ ...editingSlot, courseCode: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Subject / Course Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Web Technologies"
                    value={editingSlot.courseTitle}
                    onChange={(e) => setEditingSlot({ ...editingSlot, courseTitle: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assigned Instructor</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Mumtaz Qabulio"
                    value={editingSlot.teacher}
                    onChange={(e) => setEditingSlot({ ...editingSlot, teacher: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lecture Hall / Lab</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Room No 10 or Comp Lab I"
                    value={editingSlot.room}
                    onChange={(e) => setEditingSlot({ ...editingSlot, room: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300 font-semibold"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsSlotModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#004b87] hover:bg-[#0b2545] text-white font-bold cursor-pointer"
                >
                  Save & Sync Timetable Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: ADD / EDIT MIDTERM OR FINAL EXAM PAPER
         ===================================================================== */}
      {isExamModalOpen && editingExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {examEntries.some((x) => x.id === editingExam.id)
                    ? `Edit ${editingExam.examType} Examination Paper`
                    : `Add ${editingExam.examType} Examination Paper`}
                </h3>
                <p className="text-xs text-slate-500">
                  {editingExam.deptCode} {editingExam.part} · Second Semester 2026
                </p>
              </div>
              <button
                onClick={() => setIsExamModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveExam} className="space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Program Part</label>
                  <select
                    value={editingExam.part}
                    onChange={(e) =>
                      setEditingExam({ ...editingExam, part: e.target.value as ProgramPart })
                    }
                    className="w-full p-2 rounded-lg border border-slate-300 font-bold"
                  >
                    <option value="P-I">P-I (1st Year)</option>
                    <option value="P-II">P-II (2nd Year)</option>
                    <option value="P-III">P-III (3rd Year)</option>
                    <option value="P-IV">P-IV (4th Year)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Exam Date</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 12-10-2026"
                    value={editingExam.date}
                    onChange={(e) => setEditingExam({ ...editingExam, date: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Exam Timing</label>
                  <input
                    type="text"
                    required
                    placeholder="09:00 A.M TO 10:00 A.M"
                    value={editingExam.time}
                    onChange={(e) => setEditingExam({ ...editingExam, time: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Course Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SE24-414"
                    value={editingExam.courseCode}
                    onChange={(e) => setEditingExam({ ...editingExam, courseCode: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300 font-mono font-bold"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Subject Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Web Technologies"
                    value={editingExam.subject}
                    onChange={(e) => setEditingExam({ ...editingExam, subject: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Morning Teacher</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Mumtaz Qabulio"
                    value={editingExam.teacherMorning}
                    onChange={(e) =>
                      setEditingExam({ ...editingExam, teacherMorning: e.target.value })
                    }
                    className="w-full p-2 rounded-lg border border-slate-300 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Evening Teacher</label>
                  <input
                    type="text"
                    placeholder="e.g. Mr. Rafique Ahmed"
                    value={editingExam.teacherEvening}
                    onChange={(e) =>
                      setEditingExam({ ...editingExam, teacherEvening: e.target.value })
                    }
                    className="w-full p-2 rounded-lg border border-slate-300 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Room Allocation</label>
                <input
                  type="text"
                  required
                  value={editingExam.roomAllocation}
                  onChange={(e) =>
                    setEditingExam({ ...editingExam, roomAllocation: e.target.value })
                  }
                  className="w-full p-2 rounded-lg border border-slate-300 font-semibold"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsExamModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#004b87] hover:bg-[#0b2545] text-white font-bold cursor-pointer"
                >
                  Save Examination Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
