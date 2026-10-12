import React, { useState } from 'react';
import { Course } from '../../types';
import { Calculator, X, Info } from 'lucide-react';

interface GpaCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  currentCgpa: number;
  completedCredits: number;
}

export const GpaCalculatorModal: React.FC<GpaCalculatorModalProps> = ({
  isOpen,
  onClose,
  courses,
  currentCgpa,
  completedCredits
}) => {
  const GRADE_SCALE: Record<string, number> = {
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'D': 1.0,
    'F': 0.0
  };

  const [grades, setGrades] = useState<Record<string, string>>({
    'SWE-401': 'A',
    'SWE-403': 'A-',
    'SWE-405': 'B+',
    'SWE-407': 'A',
    'SWE-499': 'A',
    'CS-411': 'B'
  });

  if (!isOpen) return null;

  const handleGradeChange = (courseCode: string, gradeLetter: string) => {
    setGrades(prev => ({ ...prev, [courseCode]: gradeLetter }));
  };

  let totalSemCredits = 0;
  let totalSemPoints = 0;

  courses.forEach(c => {
    const letter = grades[c.code] || 'B';
    const point = GRADE_SCALE[letter] ?? 3.0;
    totalSemCredits += c.creditHours;
    totalSemPoints += c.creditHours * point;
  });

  const projectedSemGpa = totalSemCredits > 0 ? (totalSemPoints / totalSemCredits) : 0;

  const totalCombinedCredits = completedCredits + totalSemCredits;
  const previousTotalPoints = completedCredits * currentCgpa;
  const projectedCgpa = totalCombinedCredits > 0 
    ? ((previousTotalPoints + totalSemPoints) / totalCombinedCredits)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-2xl border border-slate-200 space-y-4 sm:space-y-5 animate-in slide-in-from-bottom sm:zoom-in-95 duration-150">
        <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#0068b5]/10 text-[#004b87] rounded-xl">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                University of Sindh CGPA Simulator
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Official 4.00 Semester Grading Formula
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="min-w-[36px] min-h-[36px] p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Calculation Metric Comparison */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
          <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Completed</span>
            <span className="text-sm sm:text-base font-bold text-slate-700 font-mono">{completedCredits} CH</span>
            <span className="text-[10px] text-slate-500 block">Semesters 1–6</span>
          </div>

          <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Current CGPA</span>
            <span className="text-sm sm:text-base font-black text-slate-800 font-mono">{currentCgpa.toFixed(2)}</span>
            <span className="text-[10px] text-[#007a33] font-semibold block">Good Standing</span>
          </div>

          <div className="p-2.5 sm:p-3 bg-blue-50/70 rounded-xl border border-[#0068b5]/30">
            <span className="text-[10px] font-bold uppercase text-[#004b87] block">Forecast Sem 7</span>
            <span className="text-base sm:text-lg font-black text-[#004b87] font-mono">{projectedSemGpa.toFixed(2)}</span>
            <span className="text-[10px] text-[#0068b5] block">{totalSemCredits} Credits</span>
          </div>

          <div className="p-2.5 sm:p-3 bg-[#eef4e3] rounded-xl border border-[#84a433]/50">
            <span className="text-[10px] font-bold uppercase text-[#4c6418] block">Projected CGPA</span>
            <span className="text-base sm:text-lg font-black text-[#007a33] font-mono">{projectedCgpa.toFixed(2)}</span>
            <span className="text-[10px] text-[#4c6418] font-bold block">
              {projectedCgpa >= currentCgpa ? `+${(projectedCgpa - currentCgpa).toFixed(2)} Gain` : `${(projectedCgpa - currentCgpa).toFixed(2)} Dip`}
            </span>
          </div>
        </div>

        {/* Grade Tuning Table */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span>Select Expected Grades:</span>
            <button
              onClick={() => setGrades({ 'SWE-401': 'A', 'SWE-403': 'A', 'SWE-405': 'A', 'SWE-407': 'A', 'SWE-499': 'A', 'CS-411': 'A' })}
              className="text-[11px] text-[#0068b5] hover:underline font-bold cursor-pointer"
            >
              Set All to A (4.0)
            </button>
          </div>

          <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1 divide-y divide-slate-100">
            {courses.map(course => (
              <div key={course.code} className="pt-2 flex items-center justify-between gap-2 text-xs">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-[#004b87] shrink-0">{course.code}</span>
                    <span className="font-semibold text-slate-800 truncate">{course.title}</span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {course.creditHours} Credit Hours • {course.instructor}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={grades[course.code] || 'B'}
                    onChange={(e) => handleGradeChange(course.code, e.target.value)}
                    className="min-h-[36px] px-2.5 py-1 bg-[#f4f6f8] border border-slate-300 rounded-lg text-xs font-bold text-slate-900 font-mono outline-hidden focus:border-[#0068b5] cursor-pointer"
                  >
                    {Object.keys(GRADE_SCALE).map(g => (
                      <option key={g} value={g}>{g} ({GRADE_SCALE[g].toFixed(1)})</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Rules Policy Note */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
          <div className="font-bold text-slate-800 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-[#0068b5]" />
            <span>University of Sindh Semester Grading Policy</span>
          </div>
          <p>
            Minimum <strong>2.00 CGPA</strong> required for degree completion. Courses below C grade may be repeated in subsequent regular semesters.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full sm:w-auto min-h-[42px] px-5 py-2 bg-[#0068b5] hover:bg-[#004b87] text-white rounded-xl text-xs font-bold cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
