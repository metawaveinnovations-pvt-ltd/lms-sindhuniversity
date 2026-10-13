import React, { useState, useEffect } from 'react';
import { Course, Assignment } from '../../types';
import { CompletedCourseRecord, FailedCourseRecord } from '../../data/mockAcademicData';
import { CourseWeeklyModules } from '../common/CourseWeeklyModules';
import { useSwipeNavigation, useAutoScrollActivePill } from '../../hooks/useSwipeNavigation';
import {
  BookOpen,
  Clock,
  FileText,
  Award,
  AlertTriangle,
  CheckCircle2,
  Download,
  Search,
  ArrowRight,
  ArrowLeft,
  Layers,
  Terminal,
  Check,
  X,
  MapPin,
  Mail,
  Eye,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  FolderOpen,
  FileSpreadsheet,
  CheckSquare,
  Users
} from 'lucide-react';

export interface CoursesPortalViewProps {
  enrolledCourses: Course[];
  completedCourses: CompletedCourseRecord[];
  failedCourses: FailedCourseRecord[];
  selectedCourseCode: string;
  onSelectCourseCode: (code: string) => void;
  assignmentsList: Assignment[];
  onOpenAssignmentSubmit: (id: string) => void;
  onOpenOfficeHours: () => void;
  onToast: (message: string) => void;
  activeSubTab?: string;
}

export const CoursesPortalView: React.FC<CoursesPortalViewProps> = ({
  enrolledCourses,
  completedCourses,
  failedCourses,
  selectedCourseCode,
  onSelectCourseCode,
  assignmentsList,
  onOpenAssignmentSubmit,
  onOpenOfficeHours,
  onToast,
  activeSubTab
}) => {
  // Search query and category filter
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Current Semester' | 'Completed' | 'Failed'>('Current Semester');
  const [viewMode, setViewMode] = useState<'grid' | 'workspace'>('grid');

  // Secondary sub-filters
  const [attendanceFilter, setAttendanceFilter] = useState<'All' | 'High Attendance' | 'At Risk'>('All');
  const [completedSemesterFilter, setCompletedSemesterFilter] = useState<string>('all');

  // Modal states
  const [selectedCompletedCourse, setSelectedCompletedCourse] = useState<CompletedCourseRecord | null>(null);
  const [resitModalCourse, setResitModalCourse] = useState<FailedCourseRecord | null>(null);
  const [resitRegisteredCodes, setResitRegisteredCodes] = useState<string[]>([]);
  const [resitReasonInput, setResitReasonInput] = useState<string>(
    'Attending regular revision lectures and requesting examination hall seat clearance.'
  );

  // Selected tool inside workspace
  const [courseTool, setCourseTool] = useState<
    'modules' | 'syllabus' | 'assignments' | 'gradebook' | 'attendance' | 'resources' | 'roster'
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

  const statusFilterSwipe = useSwipeNavigation<'Current Semester' | 'Completed' | 'Failed'>({
    items: ['Current Semester', 'Completed', 'Failed'],
    activeItem: statusFilter,
    onSelect: setStatusFilter,
    minSwipeDistance: 35
  });

  // Switch to workspace when a specific subTab like 'modules' or 'syllabus' is activated
  useEffect(() => {
    if (activeSubTab) {
      const validTools = ['modules', 'syllabus', 'assignments', 'gradebook', 'attendance', 'resources', 'roster'];
      if (validTools.includes(activeSubTab)) {
        setCourseTool(activeSubTab as any);
        setViewMode('workspace');
      }
    }
  }, [activeSubTab]);

  const selectedCourse = enrolledCourses.find(c => c.code === selectedCourseCode) || enrolledCourses[0];

  // Filter 1: Current Semester courses
  const filteredCurrentCourses = enrolledCourses.filter(c => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q ||
      c.title.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.instructor.toLowerCase().includes(q) ||
      c.department.toLowerCase().includes(q) ||
      c.classroom.toLowerCase().includes(q);
    if (!matchSearch) return false;
    if (attendanceFilter === 'High Attendance') return c.attendancePercent >= 90;
    if (attendanceFilter === 'At Risk') return c.attendancePercent < 75;
    return true;
  });

  // Filter 2: Completed courses
  const filteredCompletedCourses = completedCourses.filter(c => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q ||
      c.title.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.instructor.toLowerCase().includes(q) ||
      c.department.toLowerCase().includes(q) ||
      c.letterGrade.toLowerCase() === q ||
      c.academicSession.toLowerCase().includes(q);
    if (!matchSearch) return false;
    if (completedSemesterFilter !== 'all' && c.semester !== Number(completedSemesterFilter)) return false;
    return true;
  });

  // Filter 3: Failed courses
  const filteredFailedCourses = failedCourses.filter(c => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q ||
      c.title.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.instructor.toLowerCase().includes(q) ||
      c.department.toLowerCase().includes(q) ||
      c.failureReason.toLowerCase().includes(q) ||
      c.eligibleSession.toLowerCase().includes(q);
    return matchSearch;
  });

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* =========================================================
          TOP COURSES HEADER BANNER WITH STATS & VIEW MODE TOGGLE
         ========================================================= */}
      <div className="bg-white border border-[#d8dadb] rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3 sm:space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 border-b border-slate-100 pb-3 sm:pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="p-1.5 rounded-lg bg-[#004b87] text-white shadow-xs">
                <BookOpen className="w-4 h-4" />
              </div>
              <h2 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight">
                Courses &amp; Academic Curriculum
              </h2>
              <span className="text-[10px] sm:text-[11px] font-mono font-bold bg-[#eef4e3] text-[#4c6418] border border-[#84a433]/30 px-2.5 py-0.5 rounded-md">
                Semester 7 (Fall 2026)
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Explore enrolled semester courses, verified historical transcripts, and academic backlog modules with responsive filtering and OBE tracking.
            </p>
          </div>

          {/* Mode Switcher Pill */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`min-h-[34px] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-[#004b87] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Courses Grid</span>
            </button>
            <button
              onClick={() => setViewMode('workspace')}
              className={`min-h-[34px] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'workspace'
                  ? 'bg-[#004b87] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Workspace ({selectedCourse.code})</span>
            </button>
          </div>
        </div>

        {/* Curriculum Progress Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-500 block uppercase font-mono font-semibold">Current Semester</span>
            <div className="text-sm font-extrabold text-[#004b87] mt-0.5">{enrolledCourses.length} Courses &middot; 17 Cr</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-500 block uppercase font-mono font-semibold">Completed History</span>
            <div className="text-sm font-extrabold text-emerald-700 mt-0.5">{completedCourses.length} Courses &middot; 87 Cr</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-500 block uppercase font-mono font-semibold">Academic Backlog</span>
            <div className="text-sm font-extrabold text-rose-700 mt-0.5">{failedCourses.length} Courses Retake</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-500 block uppercase font-mono font-semibold">Degree Completion</span>
            <div className="text-sm font-extrabold text-slate-800 mt-0.5">104 / 136 Cr (76.5%)</div>
          </div>
        </div>
      </div>

      {/* =========================================================
          VIEW MODE 1: ENHANCED RESPONSIVE COURSES GRID
         ========================================================= */}
      {viewMode === 'grid' && (
        <div className="space-y-4">
          {/* Filterable Search Bar & Core Category Toggle */}
          <div className="bg-white border border-[#d8dadb] rounded-2xl p-3.5 sm:p-4 shadow-2xs space-y-3">
            {/* Search Input & Status Toggles */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              {/* Filterable Search Input */}
              <div className="relative flex-1">
                <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 focus-within:border-[#0068b5] focus-within:ring-2 focus-within:ring-[#0068b5]/15 rounded-xl px-3 py-2 transition-all">
                  <Search className="w-4 h-4 text-[#0068b5] shrink-0" />
                  <input
                    type="text"
                    placeholder="Filter courses by code (e.g. SWE-401, MTH-202), title, instructor, or department..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs text-slate-800 placeholder:text-slate-400 bg-transparent outline-hidden"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                      title="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* The 3 Core Status Toggles: 'Current Semester' | 'Completed' | 'Failed' */}
              <div
                onTouchStart={statusFilterSwipe.onTouchStart}
                onTouchEnd={statusFilterSwipe.onTouchEnd}
                className="flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 select-none bg-slate-100/80 p-1 rounded-xl border border-slate-200/80"
              >
                {[
                  {
                    id: 'Current Semester',
                    label: 'Current Semester',
                    count: enrolledCourses.length,
                    icon: <Clock className="w-3.5 h-3.5 shrink-0" />,
                    activeClass: 'bg-[#004b87] text-white shadow-xs',
                    badgeActive: 'bg-white/20 text-white'
                  },
                  {
                    id: 'Completed',
                    label: 'Completed',
                    count: completedCourses.length,
                    icon: <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />,
                    activeClass: 'bg-[#007a33] text-white shadow-xs',
                    badgeActive: 'bg-white/20 text-white'
                  },
                  {
                    id: 'Failed',
                    label: 'Failed',
                    count: failedCourses.length,
                    icon: <AlertTriangle className="w-3.5 h-3.5 shrink-0" />,
                    activeClass: 'bg-[#b91c1c] text-white shadow-xs',
                    badgeActive: 'bg-white/20 text-white'
                  }
                ].map((tab) => {
                  const isSelected = statusFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setStatusFilter(tab.id as any)}
                      className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                        isSelected
                          ? `${tab.activeClass} font-extrabold`
                          : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                        isSelected ? tab.badgeActive : 'bg-white text-slate-600 border border-slate-200'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sub-Filters & Active Count Summary */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {statusFilter === 'Current Semester' && (
                  <>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono mr-1">
                      Attendance:
                    </span>
                    {(['All', 'High Attendance', 'At Risk'] as const).map(cat => (
                      <button
                        key={cat}
                        onClick={() => setAttendanceFilter(cat)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                          attendanceFilter === cat
                            ? 'bg-[#0068b5] text-white font-bold shadow-2xs'
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                        }`}
                      >
                        {cat === 'All' ? 'All (6)' : cat === 'High Attendance' ? '≥90% Attendance' : 'Debarment Risk (<75%)'}
                      </button>
                    ))}
                  </>
                )}

                {statusFilter === 'Completed' && (
                  <>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono mr-1">
                      Semester:
                    </span>
                    <button
                      onClick={() => setCompletedSemesterFilter('all')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        completedSemesterFilter === 'all'
                          ? 'bg-[#007a33] text-white font-bold shadow-2xs'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                      }`}
                    >
                      All Semesters (27)
                    </button>
                    {[1, 2, 3, 4, 5, 6].map(sem => (
                      <button
                        key={sem}
                        onClick={() => setCompletedSemesterFilter(String(sem))}
                        className={`px-2 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                          completedSemesterFilter === String(sem)
                            ? 'bg-[#007a33] text-white font-bold shadow-2xs'
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                        }`}
                      >
                        Sem {sem}
                      </button>
                    ))}
                  </>
                )}

                {statusFilter === 'Failed' && (
                  <div className="flex items-center gap-1.5 text-rose-700 bg-rose-50 border border-rose-200/70 px-2.5 py-1 rounded-lg text-[11px] font-medium">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>HEC Academic Policy 14.2: Grade replacement upon passing re-sit exam.</span>
                  </div>
                )}
              </div>

              {/* Summary Text */}
              <div className="text-[11px] text-slate-500 font-mono">
                {statusFilter === 'Current Semester' && `Showing ${filteredCurrentCourses.length} of ${enrolledCourses.length} courses`}
                {statusFilter === 'Completed' && `Showing ${filteredCompletedCourses.length} of ${completedCourses.length} courses`}
                {statusFilter === 'Failed' && `Showing ${filteredFailedCourses.length} of ${failedCourses.length} courses`}
              </div>
            </div>
          </div>

          {/* 1. CURRENT SEMESTER COURSES GRID */}
          {statusFilter === 'Current Semester' && (
            <>
              {filteredCurrentCourses.length === 0 ? (
                <div className="bg-white border border-[#d8dadb] rounded-2xl p-8 text-center space-y-3 shadow-2xs">
                  <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
                  <div className="text-sm font-bold text-slate-800">No current courses match your filter</div>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    No courses found matching &ldquo;{searchQuery}&rdquo;. Try clearing your search query or reset filters.
                  </p>
                  <button
                    onClick={() => { setSearchQuery(''); setAttendanceFilter('All'); }}
                    className="px-3.5 py-1.5 bg-[#004b87] text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Reset Search
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {filteredCurrentCourses.map((course) => {
                    const isShortage = course.attendancePercent < 75;
                    return (
                      <div
                        key={course.code}
                        className="bg-white border border-[#d8dadb] rounded-2xl overflow-hidden hover:border-[#0068b5] hover:shadow-md transition-all flex flex-col justify-between group shadow-2xs"
                      >
                        {/* Card Header Banner */}
                        <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#004b87] to-[#0068b5] text-white relative overflow-hidden">
                          <div className="absolute right-0 top-0 bottom-0 w-24 opacity-10 pointer-events-none flex items-center justify-center">
                            <BookOpen className="w-16 h-16 text-white" />
                          </div>
                          <div className="relative z-10 space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-mono font-bold text-[#c8e27b] bg-black/25 px-2 py-0.5 rounded text-[11px]">
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

                        {/* Card Body */}
                        <div className="p-4 space-y-3.5 text-xs flex-1 flex flex-col justify-between">
                          <div className="space-y-2.5">
                            <div className="space-y-1 text-[11px] text-slate-600">
                              <div className="flex items-center gap-1.5 truncate">
                                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <span className="truncate">{course.schedule}</span>
                              </div>
                              <div className="flex items-center gap-1.5 truncate">
                                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <span className="truncate">{course.classroom}</span>
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-[10px] text-slate-500">
                                <span>Lessons Completed</span>
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

                            {/* Attendance Status Indicator */}
                            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                              <span className="text-slate-500">Attendance:</span>
                              <span className={`font-mono font-bold flex items-center gap-1 ${
                                isShortage ? 'text-rose-700' : 'text-emerald-700'
                              }`}>
                                {isShortage ? <AlertTriangle className="w-3 h-3 shrink-0" /> : <CheckCircle2 className="w-3 h-3 shrink-0" />}
                                <span>{course.attendancePercent}% ({isShortage ? 'Debarment Risk' : 'Eligible'})</span>
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5">
                            <button
                              onClick={() => {
                                onSelectCourseCode(course.code);
                                setCourseTool('modules');
                                setViewMode('workspace');
                              }}
                              className="min-h-[36px] px-3 py-1.5 bg-[#004b87] hover:bg-[#003966] text-white rounded-xl font-bold text-[11px] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                            >
                              <span>Open Workspace</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>

                            <div className="flex items-center gap-1 text-[11px]">
                              <button
                                onClick={() => {
                                  onSelectCourseCode(course.code);
                                  setCourseTool('syllabus');
                                  setViewMode('workspace');
                                }}
                                className="min-h-[34px] px-2.5 py-1 text-slate-600 hover:text-[#004b87] hover:bg-slate-100 rounded-lg font-medium cursor-pointer"
                              >
                                Syllabus
                              </button>
                              <button
                                onClick={() => {
                                  onSelectCourseCode(course.code);
                                  setCourseTool('gradebook');
                                  setViewMode('workspace');
                                }}
                                className="min-h-[34px] px-2.5 py-1 text-slate-600 hover:text-[#004b87] hover:bg-slate-100 rounded-lg font-medium cursor-pointer"
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
              )}
            </>
          )}

          {/* 2. COMPLETED COURSES GRID */}
          {statusFilter === 'Completed' && (
            <>
              {filteredCompletedCourses.length === 0 ? (
                <div className="bg-white border border-[#d8dadb] rounded-2xl p-8 text-center space-y-3 shadow-2xs">
                  <CheckCircle2 className="w-10 h-10 text-slate-300 mx-auto" />
                  <div className="text-sm font-bold text-slate-800">No completed courses found</div>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    No historical completed courses match your search or semester filter.
                  </p>
                  <button
                    onClick={() => { setSearchQuery(''); setCompletedSemesterFilter('all'); }}
                    className="px-3.5 py-1.5 bg-[#007a33] text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {filteredCompletedCourses.map((course) => {
                    const isHighGrade = course.letterGrade.startsWith('A');
                    return (
                      <div
                        key={course.code}
                        className="bg-white border border-[#d8dadb] rounded-2xl overflow-hidden hover:border-[#007a33] hover:shadow-md transition-all flex flex-col justify-between group shadow-2xs"
                      >
                        {/* Card Header Banner */}
                        <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#0b2545] to-[#134e4a] text-white relative overflow-hidden">
                          <div className="relative z-10 space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono font-bold text-[#c8e27b] bg-black/25 px-2 py-0.5 rounded text-[11px]">
                                  {course.code}
                                </span>
                                <span className="text-[10px] bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 px-1.5 py-0.2 rounded font-bold">
                                  Sem {course.semester}
                                </span>
                              </div>
                              <span className="text-[11px] text-slate-200 font-mono">
                                {course.creditHours} Cr. Hrs
                              </span>
                            </div>
                            <h3 className="font-bold text-sm text-white line-clamp-1 group-hover:text-[#c8e27b] transition-colors">
                              {course.title}
                            </h3>
                            <p className="text-[11px] text-slate-200 truncate">
                              {course.academicSession} &middot; {course.department}
                            </p>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-4 space-y-3.5 text-xs flex-1 flex flex-col justify-between">
                          <div className="space-y-2.5">
                            <div className="flex items-center justify-between">
                              <span className={`px-2.5 py-1 rounded-lg font-bold font-mono text-xs flex items-center gap-1.5 ${
                                isHighGrade ? 'bg-emerald-100 text-emerald-900 border border-emerald-200' : 'bg-blue-100 text-blue-900 border border-blue-200'
                              }`}>
                                <Award className="w-3.5 h-3.5" />
                                <span>Grade: {course.letterGrade} ({course.gradePoint.toFixed(2)} GP)</span>
                              </span>
                              <span className="font-mono font-bold text-slate-700 text-xs">
                                {course.marksScore} / 100
                              </span>
                            </div>

                            <div className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-100">
                              {course.syllabusOverview}
                            </div>

                            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                              <span>Instructor: <strong className="text-slate-800">{course.instructor}</strong></span>
                              <span className="text-emerald-700 font-bold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Passed</span>
                              </span>
                            </div>
                          </div>

                          {/* Card Action */}
                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                            <button
                              onClick={() => setSelectedCompletedCourse(course)}
                              className="w-full min-h-[36px] px-3 py-1.5 bg-slate-100 hover:bg-[#007a33] text-slate-800 hover:text-white rounded-xl font-bold text-[11px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View Course Details &amp; CLOs</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* 3. FAILED / BACKLOG COURSES GRID */}
          {statusFilter === 'Failed' && (
            <>
              {filteredFailedCourses.length === 0 ? (
                <div className="bg-white border border-[#d8dadb] rounded-2xl p-8 text-center space-y-3 shadow-2xs">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <div className="text-sm font-bold text-slate-800">No Failed Courses in Record!</div>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Your academic standing is in Good Standing with zero failed courses in the selected search criteria.
                  </p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-3.5 py-1.5 bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {filteredFailedCourses.map((course) => {
                    const isRegistered = resitRegisteredCodes.includes(course.code);
                    return (
                      <div
                        key={course.code}
                        className="bg-white border-2 border-rose-200 rounded-2xl overflow-hidden hover:border-rose-400 hover:shadow-md transition-all flex flex-col justify-between group shadow-2xs"
                      >
                        {/* Card Header Banner (Rose Warning Gradient) */}
                        <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#881337] to-[#9f1239] text-white relative overflow-hidden">
                          <div className="relative z-10 space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono font-bold text-white bg-black/35 px-2 py-0.5 rounded text-[11px]">
                                  {course.code}
                                </span>
                                <span className="text-[10px] bg-rose-400/30 text-rose-100 border border-rose-300/40 px-1.5 py-0.2 rounded font-bold">
                                  Sem {course.semesterAttempted}
                                </span>
                              </div>
                              <span className="text-[11px] text-rose-100 font-mono">
                                {course.creditHours} Cr. Hrs
                              </span>
                            </div>
                            <h3 className="font-bold text-sm text-white line-clamp-1">
                              {course.title}
                            </h3>
                            <p className="text-[11px] text-rose-200 truncate">
                              {course.academicSession} &middot; {course.department}
                            </p>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-4 space-y-3.5 text-xs flex-1 flex flex-col justify-between">
                          <div className="space-y-2.5">
                            <div className="flex items-center justify-between">
                              <span className="px-2.5 py-1 rounded-lg font-bold font-mono text-xs bg-rose-100 text-rose-900 border border-rose-300 flex items-center gap-1.5">
                                <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />
                                <span>Grade: F ({course.gradePoint.toFixed(2)} GP)</span>
                              </span>
                              <span className="font-mono font-bold text-rose-700 text-xs">
                                {course.marksScore} / 100 (Pass: {course.passingMarks})
                              </span>
                            </div>

                            <div className="p-2.5 bg-rose-50/70 border border-rose-100 rounded-xl space-y-1 text-[11px] text-rose-900">
                              <div className="font-bold text-rose-950 flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5 text-rose-700" />
                                <span>Deficiency Note:</span>
                              </div>
                              <p className="leading-relaxed text-rose-800">{course.failureReason}</p>
                            </div>

                            <div className="space-y-1 text-[11px] text-slate-600">
                              <div>
                                <strong className="text-slate-800">Prerequisite for:</strong> {course.prerequisiteFor}
                              </div>
                              <div className="text-amber-800 font-medium">
                                <strong>Re-Sit Session:</strong> {course.eligibleSession}
                              </div>
                            </div>
                          </div>

                          {/* Card Action */}
                          <div className="pt-3 border-t border-slate-100">
                            {isRegistered ? (
                              <div className="w-full py-2 px-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                <span>Re-Sit Examination Confirmed (Fall 2026)</span>
                              </div>
                            ) : (
                              <button
                                onClick={() => setResitModalCourse(course)}
                                className="w-full min-h-[38px] px-3 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Apply for Re-sit / Repeat Exam</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* =========================================================
          VIEW MODE 2: SAKAI LMS COURSE LEARNING WORKSPACE
         ========================================================= */}
      {viewMode === 'workspace' && (
        <div className="space-y-4">
          {/* Workspace Top Quick Course Switcher Ribbon */}
          <div className="bg-white border border-[#d8dadb] rounded-2xl p-3 sm:p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className="min-h-[36px] px-3 py-1.5 bg-[#004b87] hover:bg-[#003966] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Courses Grid</span>
              </button>
              <span className="text-xs text-slate-500 hidden sm:inline">
                Switch Active Course:
              </span>
            </div>

            {/* 1-Tap Enrolled Course Selector Pills */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {enrolledCourses.map(c => (
                <button
                  key={c.code}
                  onClick={() => onSelectCourseCode(c.code)}
                  className={`min-h-[32px] px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCourse.code === c.code
                      ? 'bg-[#84a433] text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {c.code}
                </button>
              ))}
            </div>
          </div>

          {/* Course Banner (Top Header of Course Workspace) */}
          <div className="bg-white border border-[#d8dadb] rounded-2xl overflow-hidden shadow-2xs">
            <div className="p-4 sm:p-6 bg-gradient-to-r from-[#004b87] via-[#005a9e] to-[#0068b5] text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-white bg-[#84a433] px-2.5 py-0.5 rounded-md">
                    {selectedCourse.code}
                  </span>
                  <span className="text-xs text-slate-100">
                    Semester 7 Core &middot; {selectedCourse.creditHours} Credit Hours
                  </span>
                </div>
                <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                  {selectedCourse.title}
                </h2>
                <div className="text-xs text-slate-200 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>Instructor: <strong className="text-white">{selectedCourse.instructor}</strong></span>
                  <span className="text-white/40" aria-hidden="true">&middot;</span>
                  <span>{selectedCourse.schedule}</span>
                  <span className="text-white/40" aria-hidden="true">&middot;</span>
                  <span>{selectedCourse.classroom}</span>
                </div>
              </div>

              {/* Quick Instructor Actions */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={onOpenOfficeHours}
                  className="min-h-[38px] px-3 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Office Hours</span>
                </button>
                <button
                  onClick={() => onToast(`Full syllabus & lecture pack for ${selectedCourse.code} downloaded (.ZIP).`)}
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
                      <h3 className="text-base font-bold text-slate-900">Weekly Lessons &amp; Lecture Modules</h3>
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
                    <h3 className="text-base font-bold text-slate-900">Course Syllabus &amp; Description</h3>
                    <p className="text-xs text-slate-500">Official curriculum approved by the Board of Studies, University of Sindh.</p>
                  </div>

                  <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <h4 className="font-bold text-slate-900 text-xs mb-1 uppercase tracking-wider text-blue-900">
                        Course Overview &amp; Scope
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
                          <span>Analyze enterprise business requirements and formalize microservices architectural boundaries (Bloom&apos;s Taxonomy: C4 - Analysis).</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-mono font-bold text-blue-700 shrink-0">CLO-2:</span>
                          <span>Design scalable distributed software systems adhering to Clean Architecture &amp; DDD principles (Bloom&apos;s Taxonomy: C5 - Synthesis).</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="font-mono font-bold text-blue-700 shrink-0">CLO-3:</span>
                          <span>Conduct automated regression testing and architectural compliance audits in continuous integration pipelines (Bloom&apos;s Taxonomy: C5 - Evaluation).</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <h4 className="font-bold text-slate-900 text-xs mb-1 uppercase tracking-wider text-blue-900">
                        Recommended Textbooks &amp; References
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-slate-600">
                        <li>Software Architecture in Practice (4th Edition) &mdash; Len Bass, Paul Clements, Rick Kazman</li>
                        <li>Clean Architecture: A Craftsman&apos;s Guide to Software Structure &mdash; Robert C. Martin</li>
                        <li>Designing Data-Intensive Applications &mdash; Martin Kleppmann (O&apos;Reilly)</li>
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
                      <h3 className="text-base font-bold text-slate-900">Course Assignments &amp; Lab Tasks</h3>
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
                            <span className="text-slate-400 font-mono">Due: {asg.dueDate} &middot; {asg.totalMarks} Marks</span>
                            {asg.status === 'Pending' ? (
                              <button
                                onClick={() => onOpenAssignmentSubmit(asg.id)}
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

              {/* TOOL: GRADEBOOK & OBE */}
              {courseTool === 'gradebook' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Course Assessment &amp; Marks Distribution</h3>
                      <p className="text-xs text-slate-500">Continuous assessment breakdown according to UoS examination regulations.</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                      Current Score: {selectedCourse.marksScore}/100 ({selectedCourse.currentGrade})
                    </span>
                  </div>

                  <div className="space-y-3">
                    {[
                      { component: 'Midterm Examination', weight: '30%', max: 30, obtained: 27, status: 'Graded', remarks: 'Strong system design modeling' },
                      { component: 'Final Theory Exam (Scheduled)', weight: '40%', max: 40, obtained: '-', status: 'Pending', remarks: 'Exam date: Oct 2026' },
                      { component: 'Continuous Assignments (3)', weight: '15%', max: 15, obtained: 14, status: 'Graded', remarks: 'All submissions cleared' },
                      { component: 'Laboratory Practical & Viva', weight: '10%', max: 10, obtained: 9.5, status: 'Graded', remarks: 'Excellent Docker lab work' },
                      { component: 'Class Quizzes (Surprise)', weight: '5%', max: 5, obtained: 4.5, status: 'Graded', remarks: 'Top decile performance' }
                    ].map((item, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                        <div className="space-y-0.5">
                          <h4 className="font-bold text-slate-900">{item.component}</h4>
                          <p className="text-slate-500 text-[11px]">Weightage: {item.weight} &middot; {item.remarks}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-slate-900 text-sm">
                            {item.obtained} <span className="text-slate-400 text-xs">/ {item.max}</span>
                          </span>
                          <span className={`block text-[10px] font-bold ${item.status === 'Graded' ? 'text-emerald-700' : 'text-amber-700'}`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TOOL: ATTENDANCE DRILLDOWN */}
              {courseTool === 'attendance' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Course Attendance Log (75% Statutory Rule)</h3>
                      <p className="text-xs text-slate-500">Biometric classroom attendance records for {selectedCourse.code}.</p>
                    </div>
                    <span className={`text-xs font-mono font-bold px-3 py-1 rounded-lg border ${
                      selectedCourse.attendancePercent < 75 
                        ? 'bg-rose-50 text-rose-800 border-rose-200' 
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}>
                      {selectedCourse.attendancePercent}% ({selectedCourse.attendanceAttended}/{selectedCourse.attendanceTotal} Lectures)
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase font-mono text-[10px]">
                          <th className="py-2.5 px-3">Date</th>
                          <th className="py-2.5 px-3">Topic / Lecture</th>
                          <th className="py-2.5 px-3">Time &amp; Hall</th>
                          <th className="py-2.5 px-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {[
                          { date: '2026-10-06', topic: 'Microservices Communication & gRPC', time: '09:00 AM', status: 'Present' },
                          { date: '2026-10-04', topic: 'Domain Driven Design Aggregates', time: '09:00 AM', status: 'Present' },
                          { date: '2026-09-29', topic: 'Hexagonal Architecture Patterns', time: '09:00 AM', status: 'Present' },
                          { date: '2026-09-27', topic: 'Event Sourcing & CQRS Fundamentals', time: '09:00 AM', status: 'Present' },
                          { date: '2026-09-22', topic: 'Clean Architecture Layer Boundaries', time: '09:00 AM', status: selectedCourse.attendancePercent < 75 ? 'Absent' : 'Present' }
                        ].map((row, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="py-2.5 px-3 font-mono text-slate-600">{row.date}</td>
                            <td className="py-2.5 px-3 font-medium text-slate-900">{row.topic}</td>
                            <td className="py-2.5 px-3 text-slate-500">{row.time} &middot; Lab 03</td>
                            <td className="py-2.5 px-3">
                              <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                                row.status === 'Present' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}>
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

              {/* TOOL: COURSE RESOURCES & SLIDES */}
              {courseTool === 'resources' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Lecture Presentations, Readings &amp; Datasets</h3>
                      <p className="text-xs text-slate-500">Instructor-uploaded study assets.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { name: 'Lecture 01–04 Slide Pack (PDF)', size: '14.2 MB', updated: 'Sep 15, 2026' },
                      { name: 'Microservices Case Study Architecture Diagram', size: '3.8 MB', updated: 'Sep 22, 2026' },
                      { name: 'Domain Driven Design Code Examples (ZIP)', size: '22.1 MB', updated: 'Sep 29, 2026' },
                      { name: 'Sample Midterm Papers (2023–2025)', size: '2.1 MB', updated: 'Oct 02, 2026' }
                    ].map((res, i) => (
                      <div key={i} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                        <div className="space-y-0.5 min-w-0 pr-2">
                          <h4 className="font-bold text-slate-900 truncate">{res.name}</h4>
                          <p className="text-slate-400 text-[11px] font-mono">{res.size} &middot; {res.updated}</p>
                        </div>
                        <button
                          onClick={() => onToast(`Downloading ${res.name}...`)}
                          className="p-2 bg-white hover:bg-[#004b87] hover:text-white border border-slate-200 rounded-lg text-slate-700 transition-colors cursor-pointer shrink-0"
                          title="Download Asset"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TOOL: CLASS ROSTER */}
              {courseTool === 'roster' && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-base font-bold text-slate-900">Enrolled Student Cohort &amp; Study Forum</h3>
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
          MODAL 1: COMPLETED COURSE DETAILS & OBE OUTCOMES
         ========================================================= */}
      {selectedCompletedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-hidden">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-full sm:max-w-lg w-full p-4 sm:p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90dvh] overflow-y-auto box-border animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {selectedCompletedCourse.code} &middot; {selectedCompletedCourse.title}
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">
                    Semester {selectedCompletedCourse.semester} ({selectedCompletedCourse.academicSession}) &middot; {selectedCompletedCourse.creditHours} Credit Hours
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCompletedCourse(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Grade & Score Summary */}
              <div className="grid grid-cols-3 gap-2.5 p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">Letter Grade</span>
                  <span className="text-base font-extrabold text-emerald-700">{selectedCompletedCourse.letterGrade}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">Grade Point</span>
                  <span className="text-base font-extrabold text-slate-800">{selectedCompletedCourse.gradePoint.toFixed(2)} GP</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">Marks Score</span>
                  <span className="text-base font-extrabold text-[#004b87]">{selectedCompletedCourse.marksScore} / 100</span>
                </div>
              </div>

              {/* Department & Faculty Details */}
              <div className="space-y-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex justify-between">
                  <span className="text-slate-500">Instructor:</span>
                  <span className="font-bold text-slate-900">{selectedCompletedCourse.instructor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Academic Department:</span>
                  <span className="font-semibold text-slate-800">{selectedCompletedCourse.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Official Status:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified &amp; Cleared ({selectedCompletedCourse.remarks})
                  </span>
                </div>
              </div>

              {/* Syllabus Description */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider font-mono">
                  Curriculum Scope &amp; Topics
                </label>
                <p className="text-slate-600 leading-relaxed p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  {selectedCompletedCourse.syllabusOverview}
                </p>
              </div>

              {/* OBE CLO Attainment Scores */}
              <div className="space-y-2 p-3 bg-[#eef4e3]/50 border border-[#84a433]/30 rounded-xl">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#4c6418]">
                  <Sparkles className="w-3.5 h-3.5 text-[#84a433]" />
                  <span>Outcome-Based Education (OBE) CLO Attainment</span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between text-slate-700">
                    <span>CLO-1 (Cognitive Analysis):</span>
                    <span className="font-mono font-bold text-emerald-700">92% Attained (Exceeded)</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>CLO-2 (Design Synthesis):</span>
                    <span className="font-mono font-bold text-emerald-700">88% Attained (Exceeded)</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>CLO-3 (Practical Verification):</span>
                    <span className="font-mono font-bold text-emerald-700">85% Attained (Met Threshold)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  onToast(`Official syllabus & verification transcript for ${selectedCompletedCourse.code} downloaded (.PDF)`);
                  setSelectedCompletedCourse(null);
                }}
                className="px-3.5 py-2 bg-[#004b87] hover:bg-[#003966] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Transcript Slip</span>
              </button>
              <button
                onClick={() => setSelectedCompletedCourse(null)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 2: RE-SIT & BACKLOG COURSE REGISTRATION
         ========================================================= */}
      {resitModalCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-hidden">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-full sm:max-w-md w-full p-4 sm:p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90dvh] overflow-y-auto box-border animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-rose-100 text-rose-800">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Apply for Re-Sit / Repeat Exam
                  </h3>
                  <span className="text-xs text-rose-700 font-mono font-bold">
                    {resitModalCourse.code} &middot; Grade F (Deficiency)
                  </span>
                </div>
              </div>
              <button
                onClick={() => setResitModalCourse(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
                <span className="font-bold text-rose-950 block">{resitModalCourse.title}</span>
                <p className="text-rose-800 leading-relaxed text-[11px]">
                  <strong>Deficiency Note:</strong> {resitModalCourse.failureReason}
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Student Roll:</span>
                  <span className="font-mono font-bold text-slate-800">2K23/SWE/104</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Re-Sit Session:</span>
                  <span className="font-bold text-[#004b87]">{resitModalCourse.eligibleSession}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Regulatory Framework:</span>
                  <span className="font-semibold text-slate-700">HEC Clause 14.2 (Grade Replacement)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Re-Exam Processing Fee:</span>
                  <span className="font-mono font-bold text-emerald-700">Fee Waived (Medical Clearance)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student Confirmation &amp; Study Declaration
                </label>
                <textarea
                  rows={2}
                  value={resitReasonInput}
                  onChange={(e) => setResitReasonInput(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-[#004b87] outline-hidden leading-relaxed"
                />
              </div>

              <div className="flex items-start gap-2 p-2.5 bg-amber-50 border border-amber-200/70 rounded-xl text-[11px] text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  Confirming re-sit will reserve an examination seat in Department Hall 03 and issue an updated QR Admit Slip upon controller approval.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setResitModalCourse(null)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setResitRegisteredCodes(prev => [...prev, resitModalCourse.code]);
                  onToast(`Official Re-sit Registration confirmed for ${resitModalCourse.code}! Examination hall seat reserved.`);
                  setResitModalCourse(null);
                }}
                className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Check className="w-4 h-4" />
                <span>Confirm Re-sit Registration</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
