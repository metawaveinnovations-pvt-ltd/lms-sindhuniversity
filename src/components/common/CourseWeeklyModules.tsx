import React, { useState } from 'react';
import { Course } from '../../types';
import { 
  FileText, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  FileCode, 
  BookOpen, 
  Sparkles,
  Layers,
  Check
} from 'lucide-react';

interface CourseWeeklyModulesProps {
  course: Course;
}

export const CourseWeeklyModules: React.FC<CourseWeeklyModulesProps> = ({ course }) => {
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([1, 4]);
  const [downloadedItem, setDownloadedItem] = useState<string | null>(null);
  const [completedWeeks, setCompletedWeeks] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: false,
    5: false,
    6: false
  });

  const toggleWeek = (weekNo: number) => {
    setExpandedWeeks(prev => 
      prev.includes(weekNo) ? prev.filter(w => w !== weekNo) : [...prev, weekNo]
    );
  };

  const handleToggleComplete = (e: React.MouseEvent, weekNo: number) => {
    e.stopPropagation();
    setCompletedWeeks(prev => ({ ...prev, [weekNo]: !prev[weekNo] }));
  };

  const handleDownload = (itemName: string) => {
    setDownloadedItem(itemName);
    setTimeout(() => {
      setDownloadedItem(null);
    }, 3000);
  };

  const weeklyCurriculum = [
    {
      weekNumber: 1,
      title: 'Foundations of Modern Software Architecture & Domain Modeling',
      objective: 'Decompose monolithic architectures into autonomous bounded contexts and domain services.',
      items: [
        { type: 'slides', name: 'Lecture_01_Architecture_Paradigms.pdf', size: '3.4 MB', date: 'Sep 02, 2026', author: course.instructor },
        { type: 'reading', name: 'IEEE_Recommended_Practice_Architecture_Description.pdf', size: '1.8 MB', date: 'Sep 04, 2026', author: 'IEEE Computer Society' },
        { type: 'lab', name: 'Lab_01_Domain_Storytelling_Exercise.zip', size: '512 KB', date: 'Sep 06, 2026', author: course.instructor }
      ]
    },
    {
      weekNumber: 2,
      title: 'Layered, Clean, and Hexagonal (Ports & Adapters) Patterns',
      objective: 'Implement inversion of control, dependency injection, and decoupling business logic from databases.',
      items: [
        { type: 'slides', name: 'Lecture_02_Clean_Architecture_Principles.pdf', size: '4.2 MB', date: 'Sep 09, 2026', author: course.instructor },
        { type: 'reading', name: 'Hexagonal_Architecture_Reference_Guide.pdf', size: '2.1 MB', date: 'Sep 11, 2026', author: 'Alistair Cockburn' }
      ]
    },
    {
      weekNumber: 3,
      title: 'Microservices Decomposition & API Contract Engineering',
      objective: 'Define synchronous REST & gRPC contracts, OpenAPI 3.1 definitions, and semantic versioning.',
      items: [
        { type: 'slides', name: 'Lecture_03_Microservices_API_Contracts.pdf', size: '5.1 MB', date: 'Sep 16, 2026', author: course.instructor },
        { type: 'code', name: 'UoS_LMS_OpenAPI_Contract_Template.yaml', size: '120 KB', date: 'Sep 18, 2026', author: 'ITSC Engineering' }
      ]
    },
    {
      weekNumber: 4,
      title: 'Event-Driven Architectures, CQRS & Saga Distributed Transactions',
      objective: 'Address dual-write anomalies and transactional consistency across asynchronous message brokers.',
      isCurrent: true,
      items: [
        { type: 'slides', name: 'Lecture_04_EventSourcing_CQRS_Patterns.pdf', size: '6.4 MB', date: 'Oct 02, 2026', author: course.instructor },
        { type: 'reading', name: 'Martin_Fowler_Event_Driven_Patterns.pdf', size: '1.2 MB', date: 'Oct 04, 2026', author: 'Martin Fowler' },
        { type: 'assignment', name: 'Assignment_02_FeeReconciliation_Saga.pdf', size: '890 KB', date: 'Oct 06, 2026', author: course.instructor }
      ]
    },
    {
      weekNumber: 5,
      title: 'Resilience Patterns: Circuit Breakers, Bulkheads & Rate Limiting',
      objective: 'Prevent cascading failures across high-load academic services during result publication events.',
      items: [
        { type: 'slides', name: 'Lecture_05_Circuit_Breakers_Chaos_Testing.pdf', size: '3.9 MB', date: 'Scheduled Oct 14', author: course.instructor }
      ]
    },
    {
      weekNumber: 6,
      title: 'Cloud Native Deployment: Kubernetes Ingress & Service Meshes',
      objective: 'Deploy stateful clusters, manage ingress routing, and configure Prometheus/Grafana telemetry.',
      items: [
        { type: 'slides', name: 'Lecture_06_Kubernetes_Pod_Topology.pdf', size: '4.8 MB', date: 'Scheduled Oct 21', author: course.instructor }
      ]
    }
  ];

  const completedCount = Object.values(completedWeeks).filter(Boolean).length;

  return (
    <div className="space-y-3">
      {/* Top Progress & Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f4f6f8] p-3 rounded-xl border border-[#d8dadb]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#0068b5] text-white">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              Weekly Courseware ({completedCount}/{weeklyCurriculum.length} Completed)
            </h3>
            <p className="text-[11px] text-slate-500">
              Tap any week to view slides, readings &amp; lab files
            </p>
          </div>
        </div>
        <button
          onClick={() =>
            setExpandedWeeks(prev =>
              prev.length === weeklyCurriculum.length ? [4] : [1, 2, 3, 4, 5, 6]
            )
          }
          className="min-h-[34px] px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-[#004b87] hover:bg-slate-50 font-bold cursor-pointer"
        >
          {expandedWeeks.length === weeklyCurriculum.length ? 'Collapse Weeks' : 'Expand All'}
        </button>
      </div>

      {/* Inline Toast when a file is downloaded */}
      {downloadedItem && (
        <div className="p-3 rounded-xl bg-[#eef4e3] border border-[#84a433] text-[#4c6418] text-xs font-semibold flex items-center justify-between gap-2 animate-in fade-in">
          <div className="flex items-center gap-2 min-w-0">
            <CheckCircle2 className="w-4 h-4 text-[#007a33] shrink-0" />
            <span className="truncate">Downloaded <strong>{downloadedItem}</strong> from LMS Repository</span>
          </div>
        </div>
      )}

      <div className="space-y-2.5">
        {weeklyCurriculum.map((week) => {
          const isExpanded = expandedWeeks.includes(week.weekNumber);
          const isDone = completedWeeks[week.weekNumber];
          return (
            <div 
              key={week.weekNumber} 
              className={`rounded-xl border transition-all overflow-hidden ${
                week.isCurrent 
                  ? 'bg-blue-50/30 border-[#0068b5] ring-1 ring-[#0068b5]/20' 
                  : 'bg-white border-slate-200'
              }`}
            >
              {/* Week Accordion Header */}
              <div 
                onClick={() => toggleWeek(week.weekNumber)}
                className="p-3.5 sm:p-4 flex items-center justify-between gap-2.5 cursor-pointer select-none hover:bg-slate-50/70"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <button
                    type="button"
                    onClick={(e) => handleToggleComplete(e, week.weekNumber)}
                    title={isDone ? 'Mark week as incomplete' : 'Mark week as completed'}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors cursor-pointer ${
                      isDone
                        ? 'bg-[#84a433] text-white'
                        : week.isCurrent
                        ? 'bg-[#0068b5] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4" /> : `W${week.weekNumber}`}
                  </button>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        Week {week.weekNumber}: {week.title}
                      </h4>
                      {week.isCurrent && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#0068b5] text-white uppercase font-mono">
                          Active Week
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                      {week.objective}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded hidden sm:inline">
                    {week.items.length} files
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  )}
                </div>
              </div>

              {/* Expanded Week Items */}
              {isExpanded && (
                <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 pt-2 border-t border-slate-100 space-y-2 bg-white">
                  <div className="text-[11px] text-slate-600 pb-1">
                    <strong className="text-[#004b87]">Outcome:</strong> {week.objective}
                  </div>

                  {week.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-[#f4f6f8] border border-slate-200/80 flex items-center justify-between gap-2.5 text-xs hover:border-[#0068b5]/40 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {item.type === 'slides' && <FileText className="w-4 h-4 text-rose-600 shrink-0" />}
                        {item.type === 'reading' && <BookOpen className="w-4 h-4 text-[#0068b5] shrink-0" />}
                        {item.type === 'code' && <FileCode className="w-4 h-4 text-purple-600 shrink-0" />}
                        {item.type === 'lab' && <FileCode className="w-4 h-4 text-teal-600 shrink-0" />}
                        {item.type === 'assignment' && <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />}
                        
                        <div className="min-w-0">
                          <div className="font-semibold text-slate-900 truncate">{item.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono truncate">
                            {item.size} • {item.date}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDownload(item.name)}
                        className="min-h-[34px] px-3 py-1.5 bg-white hover:bg-[#0068b5] text-[#004b87] hover:text-white border border-slate-200 hover:border-[#0068b5] font-bold rounded-lg flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                        title="Download material"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Save</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
