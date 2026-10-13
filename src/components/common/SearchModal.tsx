import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, AlertCircle, FileText, ArrowRight, User } from 'lucide-react';
import { UserRole } from '../../types';
import { ENROLLED_COURSES, STUDENT_ASSIGNMENTS } from '../../data/mockAcademicData';
import { AUDIT_FINDINGS } from '../../data/auditData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (role: UserRole, targetTab?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalized = query.toLowerCase().trim();

  // Search through courses
  const matchedCourses = ENROLLED_COURSES.filter(
    c => c.title.toLowerCase().includes(normalized) || c.code.toLowerCase().includes(normalized) || c.instructor.toLowerCase().includes(normalized)
  );

  // Search through assignments
  const matchedAssignments = STUDENT_ASSIGNMENTS.filter(
    a => a.title.toLowerCase().includes(normalized) || a.courseCode.toLowerCase().includes(normalized)
  );

  // Search through audit defects
  const matchedAudit = AUDIT_FINDINGS.filter(
    af => af.id.toLowerCase().includes(normalized) || af.title.toLowerCase().includes(normalized) || af.category.toLowerCase().includes(normalized)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-6 sm:pt-16 p-2 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150 overflow-hidden">
      <div className="w-full max-w-full sm:max-w-2xl max-h-[88dvh] sm:max-h-[85vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col box-border">
        {/* Search Input Bar */}
        <div className="p-3 sm:p-4 border-b border-slate-200 flex items-center gap-2 sm:gap-3 bg-slate-50/70 shrink-0">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, roll numbers, syllabi, fee challans (e.g. SWE-401)..."
            className="flex-1 bg-transparent border-none outline-hidden text-xs sm:text-sm text-slate-900 placeholder-slate-400 font-medium min-w-0"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="text-[10px] sm:text-xs px-2 py-1 bg-slate-200/70 hover:bg-slate-200 text-slate-600 rounded-lg font-mono cursor-pointer shrink-0"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
          {/* Quick Suggestions if query is empty */}
          {!query && (
            <div className="space-y-2.5 sm:space-y-3">
              <div className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                Quick Shortcuts
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                <button
                  onClick={() => { onNavigate('vc'); onClose(); }}
                  className="p-2.5 rounded-xl border border-[#d8dadb] hover:border-[#004b87] hover:bg-[#004b87]/5 text-left transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-800 truncate">VC University Command</div>
                    <div className="text-[10px] text-slate-500 truncate">14 Faculties KPI Radar</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1.5" />
                </button>
                <button
                  onClick={() => { onNavigate('dean'); onClose(); }}
                  className="p-2.5 rounded-xl border border-[#d8dadb] hover:border-[#0068b5] hover:bg-[#0068b5]/5 text-left transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <div className="text-xs font-semibold text-slate-800">Dean of Faculty</div>
                    <div className="text-[10px] text-slate-500">Depts & Teaching Roster</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button
                  onClick={() => { onNavigate('hod'); onClose(); }}
                  className="p-2.5 rounded-xl border border-[#d8dadb] hover:border-[#84a433] hover:bg-[#84a433]/10 text-left transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <div className="text-xs font-semibold text-slate-800">Chairman / HOD</div>
                    <div className="text-[10px] text-slate-500">Cohorts & Attendance</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button
                  onClick={() => { onNavigate('student', 'exams'); onClose(); }}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 text-left transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <div className="text-xs font-semibold text-slate-800">Student Admit Card</div>
                    <div className="text-[10px] text-slate-500">Hall seating & QR token</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button
                  onClick={() => { onNavigate('parent'); onClose(); }}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50/50 text-left transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <div className="text-xs font-semibold text-slate-800">Guardian Portal</div>
                    <div className="text-[10px] text-slate-500">Ward Attendance & Fees</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button
                  onClick={() => { onNavigate('student', 'attendance'); onClose(); }}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 text-left transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <div className="text-xs font-semibold text-slate-800">75% Attendance</div>
                    <div className="text-[10px] text-slate-500">Statutory threshold monitor</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>
          )}

          {/* Matched Courses */}
          {matchedCourses.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>Courses & Syllabus ({matchedCourses.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedCourses.map(course => (
                  <div
                    key={course.code}
                    onClick={() => { onNavigate('student', 'courses'); onClose(); }}
                    className="p-2.5 rounded-lg border border-slate-100 hover:bg-blue-50/60 hover:border-blue-200 cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-700">{course.code}</span>
                        <span className="text-xs font-semibold text-slate-800">{course.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {course.instructor} • {course.schedule}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-600">{course.attendancePercent}% Att.</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matched Audit Findings */}
          {matchedAudit.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                <span>Audit & Defect Register ({matchedAudit.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedAudit.map(finding => (
                  <div
                    key={finding.id}
                    onClick={() => { onNavigate('architecture', 'defects'); onClose(); }}
                    className="p-2.5 rounded-lg border border-slate-100 hover:bg-rose-50/60 hover:border-rose-200 cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-rose-700">{finding.id}</span>
                        <span className="text-xs font-semibold text-slate-800">{finding.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {finding.category} • Severity: {finding.severity} • {finding.classification}
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-700">
                      {finding.classification}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {query && matchedCourses.length === 0 && matchedAssignments.length === 0 && matchedAudit.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <p className="text-sm">No results found for "{query}"</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for "SWE-401", "Architecture", "Challan", or "LMS-001".</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-2.5 sm:p-3 bg-slate-50 border-t border-slate-200 text-[11px] sm:text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2 shrink-0 text-center sm:text-left">
          <span className="truncate max-w-full">Search spans Student Workspace, Faculty Roster &amp; Architecture</span>
          <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 shrink-0">MetaWave Innovations FastIndex</span>
        </div>
      </div>
    </div>
  );
};
