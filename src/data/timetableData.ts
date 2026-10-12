export type TimetableDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
export type TimetablePeriod = 1 | 2 | 3 | 4 | 5 | 6;
export type ProgramPart = 'P-I' | 'P-II' | 'P-III' | 'P-IV';
export type SemesterNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface PeriodDefinition {
  period: TimetablePeriod;
  label: string;
  timeRange: string;
  eveningTimeRange: string;
}

export const UNIVERSITY_PERIODS: PeriodDefinition[] = [
  { period: 1, label: 'Period 1', timeRange: '8:30 - 9:20', eveningTimeRange: '2:00 - 2:45' },
  { period: 2, label: 'Period 2', timeRange: '9:20 - 10:10', eveningTimeRange: '2:45 - 3:30' },
  { period: 3, label: 'Period 3', timeRange: '10:10 - 11:00', eveningTimeRange: '3:30 - 4:15' },
  { period: 4, label: 'Period 4', timeRange: '11:00 - 11:50', eveningTimeRange: '4:15 - 5:00' },
  { period: 5, label: 'Period 5', timeRange: '11:50 - 12:40', eveningTimeRange: '5:00 - 5:45' },
  { period: 6, label: 'Period 6', timeRange: '12:40 - 1:30', eveningTimeRange: '5:45 - 6:30' },
];

export const TIMETABLE_DAYS: TimetableDay[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export interface ClassTimetableSlot {
  id: string;
  deptId: string;
  deptCode: string; // e.g. 'BSIT', 'BSSW', 'BSDS', 'BSCS'
  part: ProgramPart; // 'P-I' (Year 1), 'P-II' (Year 2), 'P-III' (Year 3), 'P-IV' (Year 4)
  semester: SemesterNumber; // 1 to 8
  day: TimetableDay;
  period: TimetablePeriod; // 1 to 6
  span: 1 | 2 | 3; // 1 = 50m lecture, 2 = 100m lab, 3 = FYP block
  courseCode: string;
  courseTitle: string;
  teacher: string;
  room: string;
  shift: 'Morning' | 'Evening';
  type: 'Lecture' | 'Lab' | 'Capstone';
}

export interface ExamDatesheetEntry {
  id: string;
  deptId: string;
  deptCode: string; // 'BS (IT)', 'BS (SW)', 'BS (DS)'
  part: ProgramPart; // 'P-I' | 'P-II' | 'P-III' | 'P-IV'
  semester: SemesterNumber; // 1 to 8
  examType: 'Midterm' | 'Final';
  sNo: number;
  date: string; // e.g., '12-10-2026'
  courseCode: string;
  subject: string;
  time: string; // e.g., '09:00 A.M TO 10:00 A.M'
  teacherMorning: string;
  teacherEvening: string;
  roomAllocation: string;
}

export interface UniversityTimetableSettings {
  academicYear: string;
  sessionTitle: string;
  effectiveDate: string;
  version: string;
  generatorEngine: string;
  morningStart: string;
  morningEnd: string;
  eveningStart: string;
  eveningEnd: string;
  periodDurationMinutes: number;
  jummahBreakEnabled: boolean;
  hodLockdownActive: boolean;
  syncToStudentAndTeacherPortals: boolean;
}

export const DEFAULT_TIMETABLE_SETTINGS: UniversityTimetableSettings = {
  academicYear: '2025–2026',
  sessionTitle: 'FET Second Semester Classes Timetable (Morning / Evening Program)',
  effectiveDate: '11-08-2025',
  version: 'V4',
  generatorEngine: 'aSc Timetables · ITSC Central Scheduler',
  morningStart: '08:30 AM',
  morningEnd: '01:30 PM',
  eveningStart: '02:00 PM',
  eveningEnd: '06:30 PM',
  periodDurationMinutes: 50,
  jummahBreakEnabled: true,
  hodLockdownActive: false,
  syncToStudentAndTeacherPortals: true,
};

export const PART_METADATA: {
  part: ProgramPart;
  yearLabel: string;
  evenSemester: SemesterNumber;
  oddSemester: SemesterNumber;
  batchLabel: string;
}[] = [
  { part: 'P-I', yearLabel: '1st Year (Part-I)', oddSemester: 1, evenSemester: 2, batchLabel: 'Batch 2K25 / 2K26' },
  { part: 'P-II', yearLabel: '2nd Year (Part-II)', oddSemester: 3, evenSemester: 4, batchLabel: 'Batch 2K24' },
  { part: 'P-III', yearLabel: '3rd Year (Part-III)', oddSemester: 5, evenSemester: 6, batchLabel: 'Batch 2K23' },
  { part: 'P-IV', yearLabel: '4th Year (Part-IV)', oddSemester: 7, evenSemester: 8, batchLabel: 'Batch 2K22' },
];

export const DEFAULT_HOME_ROOMS: Record<string, Record<ProgramPart, string>> = {
  dept_it: {
    'P-I': 'Lecture Hall @ Hitech',
    'P-II': 'Room No 22',
    'P-III': 'Room No 1',
    'P-IV': 'Room No 1',
  },
  dept_swe: {
    'P-I': 'Lecture Hall @ Hitech',
    'P-II': 'Room No 10',
    'P-III': 'Room No 8',
    'P-IV': 'Room No 1',
  },
  dept_ds: {
    'P-I': 'Room No 20',
    'P-II': 'Room No 2',
    'P-III': 'CL Classroom',
    'P-IV': 'Room No 3 & 4',
  },
};

// ============================================================================
// OFFICIAL FET CLASSES TIMETABLE (w.e.f 11-08-2025 V4 - aSc Timetables PDF)
// Covers BSIT (P-I to P-IV), BSSW (P-I to P-IV), BSDS (P-I to P-IV)
// ============================================================================
export const INITIAL_CLASS_TIMETABLE_SLOTS: ClassTimetableSlot[] = [
  // --------------------------------------------------------------------------
  // 1. BSIT P-I (Year 1, Semester 2) — Lecture Hall @ Hitech (PDF Page 1)
  // --------------------------------------------------------------------------
  { id: 'bsit_p1_m1', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-I', semester: 2, day: 'Monday', period: 1, span: 1, courseCode: 'GISS/GETH-302', courseTitle: 'Islamic Studies/Ethics', teacher: 'Dr. Sibgatullah Bhutto / Mr. Abdul Waheed Chandio', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p1_m2', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-I', semester: 2, day: 'Monday', period: 2, span: 1, courseCode: 'GISS/GETH-302', courseTitle: 'Islamic Studies/Ethics', teacher: 'Dr. Sibgatullah Bhutto / Mr. Abdul Waheed Chandio', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p1_m3', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-I', semester: 2, day: 'Monday', period: 3, span: 1, courseCode: 'GENG-312', courseTitle: 'Expository Writing', teacher: 'Mr. Waqas Gopang', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p1_m4', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-I', semester: 2, day: 'Monday', period: 4, span: 2, courseCode: 'IT24-321', courseTitle: 'Object Oriented Programming (Lab)', teacher: 'Ms. Nazish Basir', room: 'Comp Lab II', shift: 'Morning', type: 'Lab' },
  { id: 'bsit_p1_m6', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-I', semester: 2, day: 'Monday', period: 6, span: 1, courseCode: 'DCMT-308', courseTitle: 'Mathematics-II', teacher: 'Engr. Aamir Mal', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },

  { id: 'bsit_p1_tu1', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-I', semester: 2, day: 'Tuesday', period: 1, span: 1, courseCode: 'GQUR-322', courseTitle: 'Calculus & Analytical Geometry', teacher: 'Dr. Asif Jamali', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p1_tu2', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-I', semester: 2, day: 'Tuesday', period: 2, span: 1, courseCode: 'GENG-312', courseTitle: 'Expository Writing', teacher: 'Mr. Waqas Gopang', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p1_tu3', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-I', semester: 2, day: 'Tuesday', period: 3, span: 1, courseCode: 'GENG-312', courseTitle: 'Expository Writing', teacher: 'Mr. Waqas Gopang', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p1_tu4', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-I', semester: 2, day: 'Tuesday', period: 4, span: 1, courseCode: 'IT24-320', courseTitle: 'Object Oriented Programming', teacher: 'Ms. Nazish Basir', room: 'Room No 10', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p1_tu6', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-I', semester: 2, day: 'Tuesday', period: 6, span: 1, courseCode: 'DCMT-308', courseTitle: 'Mathematics-II', teacher: 'Engr. Aamir Mal', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },

  { id: 'bsit_p1_w1', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-I', semester: 2, day: 'Wednesday', period: 1, span: 1, courseCode: 'IT24-326', courseTitle: 'Digital Logic Design', teacher: 'Engr. Kundan Kumar', room: 'Room No 10', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p1_w2', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-I', semester: 2, day: 'Wednesday', period: 2, span: 1, courseCode: 'IT24-326', courseTitle: 'Digital Logic Design', teacher: 'Engr. Kundan Kumar', room: 'Room No 10', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p1_w3', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-I', semester: 2, day: 'Wednesday', period: 3, span: 1, courseCode: 'IT24-320', courseTitle: 'Object Oriented Programming', teacher: 'Ms. Nazish Basir', room: 'Room No 22', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p1_w4', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-I', semester: 2, day: 'Wednesday', period: 4, span: 1, courseCode: 'GQUR-322', courseTitle: 'Calculus & Analytical Geometry', teacher: 'Dr. Asif Jamali', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p1_w5', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-I', semester: 2, day: 'Wednesday', period: 5, span: 1, courseCode: 'GSOS-324', courseTitle: 'Introduction to Management', teacher: 'Mr. Z.A Bhutto', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p1_w6', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-I', semester: 2, day: 'Wednesday', period: 6, span: 1, courseCode: 'DCMT-308', courseTitle: 'Mathematics-II', teacher: 'Engr. Aamir Mal', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },

  { id: 'bsit_p1_th1', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-I', semester: 2, day: 'Thursday', period: 1, span: 2, courseCode: 'IT24-327', courseTitle: 'Digital Logic Design (Lab)', teacher: 'Engr. Kundan Kumar', room: 'Microprocessor Lab', shift: 'Morning', type: 'Lab' },
  { id: 'bsit_p1_th3', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-I', semester: 2, day: 'Thursday', period: 3, span: 1, courseCode: 'GQUR-322', courseTitle: 'Calculus & Analytical Geometry', teacher: 'Dr. Asif Jamali', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p1_th4', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-I', semester: 2, day: 'Thursday', period: 4, span: 1, courseCode: 'GSOS-324', courseTitle: 'Introduction to Management', teacher: 'Mr. Z.A Bhutto', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p1_th5', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-I', semester: 2, day: 'Thursday', period: 5, span: 1, courseCode: 'IT24-320', courseTitle: 'Object Oriented Programming', teacher: 'Ms. Nazish Basir', room: 'Room No 22', shift: 'Morning', type: 'Lecture' },

  // --------------------------------------------------------------------------
  // 2. BSIT P-II (Year 2, Semester 4) — Room No 22 (PDF Page 2)
  // --------------------------------------------------------------------------
  { id: 'bsit_p2_m1', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-II', semester: 4, day: 'Monday', period: 1, span: 2, courseCode: 'IT24-427', courseTitle: 'Web Technologies (Lab)', teacher: 'Dr. Mumtaz Qabulio', room: 'Comp Lab I', shift: 'Morning', type: 'Lab' },
  { id: 'bsit_p2_m3', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-II', semester: 4, day: 'Monday', period: 3, span: 1, courseCode: 'IT24-430', courseTitle: 'Computer Graphics and Game Development', teacher: 'Dr. M. Ali Nizamani', room: 'Room No 22', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p2_m4', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-II', semester: 4, day: 'Monday', period: 4, span: 1, courseCode: 'IT24-426', courseTitle: 'Web Technologies', teacher: 'Dr. Mumtaz Qabulio', room: 'Room No 22', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p2_m5', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-II', semester: 4, day: 'Monday', period: 5, span: 1, courseCode: 'IT24-422', courseTitle: 'Database Systems', teacher: 'Dr. Kamran Dahri', room: 'Room No 22', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p2_m6', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-II', semester: 4, day: 'Monday', period: 6, span: 1, courseCode: 'IT24-422', courseTitle: 'Database Systems', teacher: 'Dr. Kamran Dahri', room: 'Room No 22', shift: 'Morning', type: 'Lecture' },

  { id: 'bsit_p2_tu1', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-II', semester: 4, day: 'Tuesday', period: 1, span: 1, courseCode: 'IT24-426', courseTitle: 'Web Technologies', teacher: 'Dr. Mumtaz Qabulio', room: 'Room No 22', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p2_tu2', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-II', semester: 4, day: 'Tuesday', period: 2, span: 1, courseCode: 'IT24-424', courseTitle: 'Computer Networks', teacher: 'Mr. Aslam Kumbhar', room: 'Room No 22', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p2_tu3', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-II', semester: 4, day: 'Tuesday', period: 3, span: 2, courseCode: 'IT24-425', courseTitle: 'Computer Networks (Lab)', teacher: 'Mr. Aslam Kumbhar', room: 'Comp Lab II', shift: 'Morning', type: 'Lab' },
  { id: 'bsit_p2_tu5', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-II', semester: 4, day: 'Tuesday', period: 5, span: 1, courseCode: 'IT24-430', courseTitle: 'Computer Graphics and Game Development', teacher: 'Dr. M. Ali Nizamani', room: 'Room No 22', shift: 'Morning', type: 'Lecture' },

  { id: 'bsit_p2_w1', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-II', semester: 4, day: 'Wednesday', period: 1, span: 1, courseCode: 'GENT-432', courseTitle: 'Entrepreneurship', teacher: 'Mr. Rafique Bhutto', room: 'Room No 22', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p2_w2', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-II', semester: 4, day: 'Wednesday', period: 2, span: 1, courseCode: 'IT24-422', courseTitle: 'Database Systems', teacher: 'Dr. Kamran Dahri', room: 'Room No 22', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p2_w3', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-II', semester: 4, day: 'Wednesday', period: 3, span: 2, courseCode: 'IT24-423', courseTitle: 'Database Systems (Lab)', teacher: 'Dr. Kamran Dahri / Mr. Hassan Jhatial', room: 'Comp Lab II', shift: 'Morning', type: 'Lab' },

  { id: 'bsit_p2_th1', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-II', semester: 4, day: 'Thursday', period: 1, span: 1, courseCode: 'IT24-428', courseTitle: 'Multivariable Calculus', teacher: 'Mr. Rahat Ali', room: 'Room No 22', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p2_th2', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-II', semester: 4, day: 'Thursday', period: 2, span: 1, courseCode: 'IT24-424', courseTitle: 'Computer Networks', teacher: 'Mr. Aslam Kumbhar', room: 'Room No 22', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p2_th3', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-II', semester: 4, day: 'Thursday', period: 3, span: 1, courseCode: 'IT24-424', courseTitle: 'Computer Networks', teacher: 'Mr. Aslam Kumbhar', room: 'Room No 22', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p2_th4', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-II', semester: 4, day: 'Thursday', period: 4, span: 1, courseCode: 'GENT-432', courseTitle: 'Entrepreneurship', teacher: 'Mr. Rafique Bhutto', room: 'Room No 22', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p2_th5', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-II', semester: 4, day: 'Thursday', period: 5, span: 2, courseCode: 'IT24-431', courseTitle: 'Computer Graphics and Game Development (Lab)', teacher: 'Dr. M. Ali Nizamani / Mr. Hassan Jhatial', room: 'Comp Lab II', shift: 'Morning', type: 'Lab' },

  { id: 'bsit_p2_f1', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-II', semester: 4, day: 'Friday', period: 1, span: 1, courseCode: 'IT24-428', courseTitle: 'Multivariable Calculus', teacher: 'Mr. Rahat Ali', room: 'Room No 22', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p2_f2', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-II', semester: 4, day: 'Friday', period: 2, span: 1, courseCode: 'IT24-428', courseTitle: 'Multivariable Calculus', teacher: 'Mr. Rahat Ali', room: 'Room No 22', shift: 'Morning', type: 'Lecture' },

  // --------------------------------------------------------------------------
  // 3. BSIT P-III (Year 3, Semester 6) — Room No 1 (PDF Page 3)
  // --------------------------------------------------------------------------
  { id: 'bsit_p3_m1', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-III', semester: 6, day: 'Monday', period: 1, span: 1, courseCode: 'INFT-520', courseTitle: 'Information Technology Infrastructure', teacher: 'Mr. Hassan Jhatial', room: 'CL Classroom', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p3_m2', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-III', semester: 6, day: 'Monday', period: 2, span: 1, courseCode: 'INFT-528', courseTitle: 'Introduction to Sociology', teacher: 'Dr. Niaz Bhutto', room: 'CL Classroom', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p3_m3', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-III', semester: 6, day: 'Monday', period: 3, span: 1, courseCode: 'INFT-528', courseTitle: 'Introduction to Sociology', teacher: 'Dr. Niaz Bhutto', room: 'CL Classroom', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p3_m4', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-III', semester: 6, day: 'Monday', period: 4, span: 1, courseCode: 'INFT-522', courseTitle: 'Distributed Computing', teacher: 'Dr. Atia Bano', room: 'CL Classroom', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p3_m5', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-III', semester: 6, day: 'Monday', period: 5, span: 1, courseCode: 'INFT-530', courseTitle: 'IT Project Management', teacher: 'Dr. Imran Ujjan', room: 'CL Classroom', shift: 'Morning', type: 'Lecture' },

  { id: 'bsit_p3_tu1', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-III', semester: 6, day: 'Tuesday', period: 1, span: 1, courseCode: 'INFT-528', courseTitle: 'Introduction to Sociology', teacher: 'Dr. Niaz Bhutto', room: 'Room No 1', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p3_tu2', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-III', semester: 6, day: 'Tuesday', period: 2, span: 1, courseCode: 'INFT-524', courseTitle: 'Mobile Application Development', teacher: 'Dr. Zeeshan Bhatti', room: 'Room No 1', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p3_tu4', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-III', semester: 6, day: 'Tuesday', period: 4, span: 1, courseCode: 'INFT-526', courseTitle: 'Data Science', teacher: 'Dr. Faheem Abbasi', room: 'Room No 1', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p3_tu5', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-III', semester: 6, day: 'Tuesday', period: 5, span: 2, courseCode: 'INFT-531', courseTitle: 'IT Project Management (Lab)', teacher: 'Dr. Imran Ujjan / Mr. Shahjahan', room: 'Comp Lab I', shift: 'Morning', type: 'Lab' },

  { id: 'bsit_p3_w1', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-III', semester: 6, day: 'Wednesday', period: 1, span: 1, courseCode: 'INFT-522', courseTitle: 'Distributed Computing', teacher: 'Dr. Atia Bano', room: 'Room No 1', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p3_w2', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-III', semester: 6, day: 'Wednesday', period: 2, span: 1, courseCode: 'INFT-526', courseTitle: 'Data Science', teacher: 'Dr. Faheem Abbasi', room: 'Room No 1', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p3_w3', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-III', semester: 6, day: 'Wednesday', period: 3, span: 1, courseCode: 'INFT-524', courseTitle: 'Mobile Application Development', teacher: 'Dr. Zeeshan Bhatti', room: 'Room No 1', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p3_w5', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-III', semester: 6, day: 'Wednesday', period: 5, span: 2, courseCode: 'INFT-527', courseTitle: 'Data Science (Lab)', teacher: 'Dr. Faheem Abbasi / Mr. Junaid Korai', room: 'Comp Lab I', shift: 'Morning', type: 'Lab' },

  { id: 'bsit_p3_th1', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-III', semester: 6, day: 'Thursday', period: 1, span: 1, courseCode: 'INFT-530', courseTitle: 'IT Project Management', teacher: 'Dr. Imran Ujjan', room: 'Room No 1', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p3_th2', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-III', semester: 6, day: 'Thursday', period: 2, span: 1, courseCode: 'INFT-526', courseTitle: 'Data Science', teacher: 'Dr. Faheem Abbasi', room: 'Room No 1', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p3_th3', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-III', semester: 6, day: 'Thursday', period: 3, span: 2, courseCode: 'INFT-525', courseTitle: 'Mobile Application Development (Lab)', teacher: 'Dr. Zeeshan Bhatti', room: 'Comp Lab II', shift: 'Morning', type: 'Lab' },

  { id: 'bsit_p3_f1', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-III', semester: 6, day: 'Friday', period: 1, span: 1, courseCode: 'INFT-522', courseTitle: 'Distributed Computing', teacher: 'Dr. Atia Bano', room: 'Room No 1', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p3_f2', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-III', semester: 6, day: 'Friday', period: 2, span: 1, courseCode: 'INFT-520', courseTitle: 'Information Technology Infrastructure', teacher: 'Mr. Hassan Jhatial', room: 'Room No 1', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p3_f3', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-III', semester: 6, day: 'Friday', period: 3, span: 1, courseCode: 'INFT-520', courseTitle: 'Information Technology Infrastructure', teacher: 'Mr. Hassan Jhatial', room: 'Room No 1', shift: 'Morning', type: 'Lecture' },

  // --------------------------------------------------------------------------
  // 4. BSIT P-IV (Year 4, Semester 8) — Room No 1 (PDF Page 4)
  // --------------------------------------------------------------------------
  { id: 'bsit_p4_m1', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-IV', semester: 8, day: 'Monday', period: 1, span: 1, courseCode: 'ITEC-620', courseTitle: 'Network Science', teacher: 'Dr. Abdul Waheed', room: 'Room No 1', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p4_m2', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-IV', semester: 8, day: 'Monday', period: 2, span: 1, courseCode: 'ITEC-620', courseTitle: 'Network Science', teacher: 'Dr. Abdul Waheed', room: 'Room No 1', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p4_m3', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-IV', semester: 8, day: 'Monday', period: 3, span: 1, courseCode: 'MNG-622', courseTitle: 'Entrepreneurship', teacher: 'Dr. Arifa Bhutto', room: 'Room No 1', shift: 'Morning', type: 'Lecture' },
  { id: 'bsit_p4_m4', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-IV', semester: 8, day: 'Monday', period: 4, span: 1, courseCode: 'MNG-622', courseTitle: 'Entrepreneurship', teacher: 'Dr. Arifa Bhutto', room: 'Room No 1', shift: 'Morning', type: 'Lecture' },

  { id: 'bsit_p4_tu1', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-IV', semester: 8, day: 'Tuesday', period: 1, span: 2, courseCode: 'ITEC-621', courseTitle: 'Network Science (Lab)', teacher: 'Dr. Abdul Waheed / Engr. Aamir Mal', room: 'Comp Lab I', shift: 'Morning', type: 'Lab' },
  { id: 'bsit_p4_tu3', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-IV', semester: 8, day: 'Tuesday', period: 3, span: 1, courseCode: 'MNG-622', courseTitle: 'Entrepreneurship', teacher: 'Dr. Arifa Bhutto', room: 'Room No 1', shift: 'Morning', type: 'Lecture' },

  { id: 'bsit_p4_w1', deptId: 'dept_it', deptCode: 'BSIT', part: 'P-IV', semester: 8, day: 'Wednesday', period: 1, span: 3, courseCode: 'ITEC-699', courseTitle: 'Final Year Project (FYP Defense & Lab)', teacher: 'Dr. Abdul Waheed / FYP Committee', room: 'Room No 1', shift: 'Morning', type: 'Capstone' },

  // --------------------------------------------------------------------------
  // 5. BSSW P-I (Year 1, Semester 2) — Lecture Hall @ Hitech (PDF Page 5)
  // --------------------------------------------------------------------------
  { id: 'bssw_p1_m1', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-I', semester: 2, day: 'Monday', period: 1, span: 1, courseCode: 'SE24-324', courseTitle: 'Object Oriented Programming', teacher: 'Mr. Mir Hazar Khan', room: 'Room No 22', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p1_m2', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-I', semester: 2, day: 'Monday', period: 2, span: 1, courseCode: 'SE24-324', courseTitle: 'Object Oriented Programming', teacher: 'Mr. Mir Hazar Khan', room: 'Room No 22', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p1_m4', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-I', semester: 2, day: 'Monday', period: 4, span: 1, courseCode: 'GENG-312', courseTitle: 'Expository Writing', teacher: 'Mr. Waqas Gopang', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p1_m5', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-I', semester: 2, day: 'Monday', period: 5, span: 1, courseCode: 'SE24-324', courseTitle: 'Object Oriented Programming', teacher: 'Mr. Mir Hazar Khan', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p1_m6', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-I', semester: 2, day: 'Monday', period: 6, span: 1, courseCode: 'DCMT-308', courseTitle: 'Mathematics-II', teacher: 'Engr. Aamir Mal', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },

  { id: 'bssw_p1_tu1', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-I', semester: 2, day: 'Tuesday', period: 1, span: 2, courseCode: 'SE24-325', courseTitle: 'Object Oriented Programming (Lab)', teacher: 'Mr. Mir Hazar Khan', room: 'Comp Lab II', shift: 'Morning', type: 'Lab' },
  { id: 'bssw_p1_tu3', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-I', semester: 2, day: 'Tuesday', period: 3, span: 1, courseCode: 'SE24-316', courseTitle: 'Discrete Structures', teacher: 'Dr. Arjumand Bano', room: 'Room No 22', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p1_tu4', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-I', semester: 2, day: 'Tuesday', period: 4, span: 1, courseCode: 'GENG-312', courseTitle: 'Expository Writing', teacher: 'Mr. Waqas Gopang', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p1_tu5', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-I', semester: 2, day: 'Tuesday', period: 5, span: 1, courseCode: 'SE24-322', courseTitle: 'Software Engineering', teacher: 'Dr. Kamran Taj Pathan', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p1_tu6', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-I', semester: 2, day: 'Tuesday', period: 6, span: 1, courseCode: 'DCMT-308', courseTitle: 'Mathematics-II', teacher: 'Engr. Aamir Mal', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },

  { id: 'bssw_p1_w1', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-I', semester: 2, day: 'Wednesday', period: 1, span: 1, courseCode: 'GISS/GETH-304', courseTitle: 'Islamic Studies / Ethics', teacher: 'Dr. Sibgatullah Bhutto / Mr. Abdul Waheed Chandio', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p1_w2', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-I', semester: 2, day: 'Wednesday', period: 2, span: 1, courseCode: 'GISS/GETH-304', courseTitle: 'Islamic Studies / Ethics', teacher: 'Dr. Sibgatullah Bhutto / Mr. Abdul Waheed Chandio', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p1_w3', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-I', semester: 2, day: 'Wednesday', period: 3, span: 1, courseCode: 'GENG-312', courseTitle: 'Expository Writing', teacher: 'Mr. Waqas Gopang', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p1_w4', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-I', semester: 2, day: 'Wednesday', period: 4, span: 1, courseCode: 'SE24-320', courseTitle: 'Digital Logic Design', teacher: 'Mr. Waseem Javaid', room: 'Room No 22', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p1_w5', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-I', semester: 2, day: 'Wednesday', period: 5, span: 1, courseCode: 'SE24-320', courseTitle: 'Digital Logic Design', teacher: 'Mr. Waseem Javaid', room: 'Room No 22', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p1_w6', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-I', semester: 2, day: 'Wednesday', period: 6, span: 1, courseCode: 'DCMT-308', courseTitle: 'Mathematics-II', teacher: 'Engr. Aamir Mal', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },

  { id: 'bssw_p1_th1', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-I', semester: 2, day: 'Thursday', period: 1, span: 1, courseCode: 'SE24-318', courseTitle: 'Multivariable Calculus', teacher: 'Engr. Aamir Mal', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p1_th2', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-I', semester: 2, day: 'Thursday', period: 2, span: 1, courseCode: 'SE24-318', courseTitle: 'Multivariable Calculus', teacher: 'Engr. Aamir Mal', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p1_th3', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-I', semester: 2, day: 'Thursday', period: 3, span: 2, courseCode: 'SE24-321', courseTitle: 'Digital Logic Design (Lab)', teacher: 'Mr. Waseem Javaid', room: 'Microprocessor Lab', shift: 'Morning', type: 'Lab' },
  { id: 'bssw_p1_th5', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-I', semester: 2, day: 'Thursday', period: 5, span: 1, courseCode: 'SE24-322', courseTitle: 'Software Engineering', teacher: 'Dr. Kamran Taj Pathan', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p1_th6', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-I', semester: 2, day: 'Thursday', period: 6, span: 1, courseCode: 'SE24-322', courseTitle: 'Software Engineering', teacher: 'Dr. Kamran Taj Pathan', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },

  { id: 'bssw_p1_f1', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-I', semester: 2, day: 'Friday', period: 1, span: 1, courseCode: 'SE24-316', courseTitle: 'Discrete Structures', teacher: 'Dr. Arjumand Bano', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p1_f2', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-I', semester: 2, day: 'Friday', period: 2, span: 1, courseCode: 'SE24-316', courseTitle: 'Discrete Structures', teacher: 'Dr. Arjumand Bano', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p1_f3', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-I', semester: 2, day: 'Friday', period: 3, span: 1, courseCode: 'SE24-318', courseTitle: 'Multivariable Calculus', teacher: 'Engr. Aamir Mal', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },

  // --------------------------------------------------------------------------
  // 6. BSSW P-II (Year 2, Semester 4) — Room No 10 (PDF Page 6)
  // --------------------------------------------------------------------------
  { id: 'bssw_p2_m1', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-II', semester: 4, day: 'Monday', period: 1, span: 2, courseCode: 'SE24-411', courseTitle: 'Computer Organization & Assembly Language (Lab)', teacher: 'Dr. Arjumand Bano', room: 'Comp Lab II', shift: 'Morning', type: 'Lab' },
  { id: 'bssw_p2_m3', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-II', semester: 4, day: 'Monday', period: 3, span: 1, courseCode: 'SE24-408', courseTitle: 'Probability & Statistics', teacher: 'Dr. Shazia Abbasi', room: 'Room No 10', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p2_m4', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-II', semester: 4, day: 'Monday', period: 4, span: 1, courseCode: 'SE24-410', courseTitle: 'Computer Organization & Assembly Language', teacher: 'Dr. Arjumand Bano', room: 'Room No 10', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p2_m5', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-II', semester: 4, day: 'Monday', period: 5, span: 2, courseCode: 'SE24-413', courseTitle: 'Software Requirement Engineering (Lab)', teacher: 'Ms. Noorulain Patoli', room: 'Comp Lab I', shift: 'Morning', type: 'Lab' },

  { id: 'bssw_p2_tu1', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-II', semester: 4, day: 'Tuesday', period: 1, span: 1, courseCode: 'SE24-410', courseTitle: 'Computer Organization & Assembly Language', teacher: 'Dr. Arjumand Bano', room: 'Room No 10', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p2_tu2', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-II', semester: 4, day: 'Tuesday', period: 2, span: 1, courseCode: 'SE24-414,415', courseTitle: 'Web Technologies', teacher: 'Dr. Mumtaz Qabulio', room: 'Room No 10', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p2_tu3', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-II', semester: 4, day: 'Tuesday', period: 3, span: 1, courseCode: 'SE24-416', courseTitle: 'Data Science', teacher: 'Dr. M. Ali Memon', room: 'Room No 10', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p2_tu5', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-II', semester: 4, day: 'Tuesday', period: 5, span: 2, courseCode: 'SE24-416L', courseTitle: 'Data Science (Lab)', teacher: 'Dr. M. Ali Memon / Mr. Rafique Bhutto', room: 'Comp Lab II', shift: 'Morning', type: 'Lab' },

  { id: 'bssw_p2_w1', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-II', semester: 4, day: 'Wednesday', period: 1, span: 2, courseCode: 'SE24-414L', courseTitle: 'Web Technologies (Lab)', teacher: 'Dr. Mumtaz Qabulio', room: 'Comp Lab I', shift: 'Morning', type: 'Lab' },
  { id: 'bssw_p2_w3', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-II', semester: 4, day: 'Wednesday', period: 3, span: 1, courseCode: 'SE24-408', courseTitle: 'Probability & Statistics', teacher: 'Dr. Shazia Abbasi', room: 'Room No 10', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p2_w4', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-II', semester: 4, day: 'Wednesday', period: 4, span: 1, courseCode: 'SE24-414,415', courseTitle: 'Web Technologies', teacher: 'Dr. Mumtaz Qabulio', room: 'Room No 10', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p2_w5', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-II', semester: 4, day: 'Wednesday', period: 5, span: 1, courseCode: 'SE24-412', courseTitle: 'Software Requirement Engineering', teacher: 'Ms. Noorulain Patoli', room: 'Room No 10', shift: 'Morning', type: 'Lecture' },

  { id: 'bssw_p2_th1', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-II', semester: 4, day: 'Thursday', period: 1, span: 1, courseCode: 'SE24-412', courseTitle: 'Software Requirement Engineering', teacher: 'Ms. Noorulain Patoli', room: 'Room No 10', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p2_th2', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-II', semester: 4, day: 'Thursday', period: 2, span: 1, courseCode: 'SE24-416', courseTitle: 'Data Science', teacher: 'Dr. M. Ali Memon', room: 'Room No 10', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p2_th3', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-II', semester: 4, day: 'Thursday', period: 3, span: 1, courseCode: 'GENT-432', courseTitle: 'Entrepreneurship', teacher: 'Dr. Arifa Bhutto', room: 'Room No 10', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p2_th4', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-II', semester: 4, day: 'Thursday', period: 4, span: 1, courseCode: 'GENT-432', courseTitle: 'Entrepreneurship', teacher: 'Dr. Arifa Bhutto', room: 'Room No 10', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p2_th5', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-II', semester: 4, day: 'Thursday', period: 5, span: 1, courseCode: 'SE24-408', courseTitle: 'Probability & Statistics', teacher: 'Dr. Shazia Abbasi', room: 'Room No 10', shift: 'Morning', type: 'Lecture' },

  // --------------------------------------------------------------------------
  // 7. BSSW P-III (Year 3, Semester 6) — Room No 8 (PDF Page 7)
  // --------------------------------------------------------------------------
  { id: 'bssw_p3_m1', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-III', semester: 6, day: 'Monday', period: 1, span: 1, courseCode: 'SE23-512', courseTitle: 'Business Process Engineering', teacher: 'Mr. Rafique Bhutto', room: 'Room No 8', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p3_m2', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-III', semester: 6, day: 'Monday', period: 2, span: 1, courseCode: 'SE23-516', courseTitle: 'Simulations and Modelling', teacher: 'Engr. Aamir Mal', room: 'Room No 8', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p3_m3', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-III', semester: 6, day: 'Monday', period: 3, span: 1, courseCode: 'SE23-514', courseTitle: 'Software Construction & Development', teacher: 'Ms. Noorulain Patoli', room: 'Room No 8', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p3_m4', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-III', semester: 6, day: 'Monday', period: 4, span: 1, courseCode: 'SE23-510', courseTitle: 'Human Computer Interaction', teacher: 'Dr. Kamran Taj Pathan', room: 'Room No 8', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p3_m5', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-III', semester: 6, day: 'Monday', period: 5, span: 1, courseCode: 'SE23-510', courseTitle: 'Human Computer Interaction', teacher: 'Dr. Kamran Taj Pathan', room: 'Room No 8', shift: 'Morning', type: 'Lecture' },

  { id: 'bssw_p3_tu1', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-III', semester: 6, day: 'Tuesday', period: 1, span: 1, courseCode: 'SE23-512', courseTitle: 'Business Process Engineering', teacher: 'Mr. Rafique Bhutto', room: 'Room No 8', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p3_tu2', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-III', semester: 6, day: 'Tuesday', period: 2, span: 1, courseCode: 'SE23-518', courseTitle: 'Data Science', teacher: 'Dr. M. Ali Memon', room: 'Room No 8', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p3_tu3', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-III', semester: 6, day: 'Tuesday', period: 3, span: 1, courseCode: 'SE23-520', courseTitle: 'Natural Language Process', teacher: 'Ms. Nazish Basir', room: 'Room No 8', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p3_tu4', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-III', semester: 6, day: 'Tuesday', period: 4, span: 1, courseCode: 'SE23-510', courseTitle: 'Human Computer Interaction', teacher: 'Dr. Kamran Taj Pathan', room: 'Room No 8', shift: 'Morning', type: 'Lecture' },

  { id: 'bssw_p3_w1', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-III', semester: 6, day: 'Wednesday', period: 1, span: 1, courseCode: 'SE23-516', courseTitle: 'Simulations and Modelling', teacher: 'Engr. Aamir Mal', room: 'Room No 8', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p3_w2', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-III', semester: 6, day: 'Wednesday', period: 2, span: 1, courseCode: 'SE23-518', courseTitle: 'Data Science', teacher: 'Dr. M. Ali Memon', room: 'Room No 8', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p3_w3', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-III', semester: 6, day: 'Wednesday', period: 3, span: 2, courseCode: 'SE23-515', courseTitle: 'Software Construction & Development (Lab)', teacher: 'Ms. Noorulain Patoli', room: 'Comp Lab I', shift: 'Morning', type: 'Lab' },
  { id: 'bssw_p3_w5', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-III', semester: 6, day: 'Wednesday', period: 5, span: 1, courseCode: 'SE23-520', courseTitle: 'Natural Language Process', teacher: 'Ms. Nazish Basir', room: 'Room No 8', shift: 'Morning', type: 'Lecture' },

  { id: 'bssw_p3_th1', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-III', semester: 6, day: 'Thursday', period: 1, span: 1, courseCode: 'SE23-512', courseTitle: 'Business Process Engineering', teacher: 'Mr. Rafique Bhutto', room: 'Room No 8', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p3_th2', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-III', semester: 6, day: 'Thursday', period: 2, span: 1, courseCode: 'SE23-514', courseTitle: 'Software Construction & Development', teacher: 'Ms. Noorulain Patoli', room: 'Room No 8', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p3_th3', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-III', semester: 6, day: 'Thursday', period: 3, span: 1, courseCode: 'SE23-518', courseTitle: 'Data Science', teacher: 'Dr. M. Ali Memon', room: 'Room No 8', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p3_th4', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-III', semester: 6, day: 'Thursday', period: 4, span: 1, courseCode: 'SE23-520', courseTitle: 'Natural Language Process', teacher: 'Ms. Nazish Basir', room: 'Room No 8', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p3_th5', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-III', semester: 6, day: 'Thursday', period: 5, span: 1, courseCode: 'SE23-516', courseTitle: 'Simulations and Modelling', teacher: 'Engr. Aamir Mal', room: 'Room No 8', shift: 'Morning', type: 'Lecture' },

  // --------------------------------------------------------------------------
  // 8. BSSW P-IV (Year 4, Semester 8) — Room No 1 (PDF Page 8)
  // --------------------------------------------------------------------------
  { id: 'bssw_p4_tu1', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-IV', semester: 8, day: 'Tuesday', period: 1, span: 3, courseCode: 'SENG-699', courseTitle: 'Final Year Project (FYP Capstone)', teacher: 'Dr. Arifa Bhutto / FYP Committee', room: 'Room No 1', shift: 'Morning', type: 'Capstone' },

  { id: 'bssw_p4_w1', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-IV', semester: 8, day: 'Wednesday', period: 1, span: 2, courseCode: 'SENG-619', courseTitle: 'Software Verification & Validation (Lab)', teacher: 'Dr. Asif Jamali / Mr. Shahjahan', room: 'Comp Lab II', shift: 'Morning', type: 'Lab' },
  { id: 'bssw_p4_w4', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-IV', semester: 8, day: 'Wednesday', period: 4, span: 1, courseCode: 'SENG-620', courseTitle: 'Pervasive Computing', teacher: 'Dr. Lachhman Das', room: 'Room No 1', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p4_w5', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-IV', semester: 8, day: 'Wednesday', period: 5, span: 1, courseCode: 'SENG-622', courseTitle: 'Software Engineering Economics', teacher: 'Dr. Imran Ujjan', room: 'Room No 1', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p4_w6', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-IV', semester: 8, day: 'Wednesday', period: 6, span: 1, courseCode: 'SENG-622', courseTitle: 'Software Engineering Economics', teacher: 'Dr. Imran Ujjan', room: 'Room No 1', shift: 'Morning', type: 'Lecture' },

  { id: 'bssw_p4_th1', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-IV', semester: 8, day: 'Thursday', period: 1, span: 2, courseCode: 'SENG-621', courseTitle: 'Pervasive Computing (Lab)', teacher: 'Dr. Lachhman Das / Dr. Mumtaz Qabulio', room: 'Comp Lab II', shift: 'Morning', type: 'Lab' },
  { id: 'bssw_p4_th3', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-IV', semester: 8, day: 'Thursday', period: 3, span: 1, courseCode: 'SENG-622', courseTitle: 'Software Engineering Economics', teacher: 'Dr. Imran Ujjan', room: 'Room No 1', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p4_th4', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-IV', semester: 8, day: 'Thursday', period: 4, span: 1, courseCode: 'SENG-620', courseTitle: 'Pervasive Computing', teacher: 'Dr. Lachhman Das', room: 'Room No 1', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p4_th5', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-IV', semester: 8, day: 'Thursday', period: 5, span: 1, courseCode: 'SENG-618', courseTitle: 'Software Verification & Validation', teacher: 'Dr. Asif Jamali', room: 'Room No 1', shift: 'Morning', type: 'Lecture' },
  { id: 'bssw_p4_th6', deptId: 'dept_swe', deptCode: 'BSSW', part: 'P-IV', semester: 8, day: 'Thursday', period: 6, span: 1, courseCode: 'SENG-618', courseTitle: 'Software Verification & Validation', teacher: 'Dr. Asif Jamali', room: 'Room No 1', shift: 'Morning', type: 'Lecture' },

  // --------------------------------------------------------------------------
  // 9. BSDS P-I (Year 1, Semester 2) — Room No 20 (PDF Page 9)
  // --------------------------------------------------------------------------
  { id: 'bsds_p1_m1', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-I', semester: 2, day: 'Monday', period: 1, span: 1, courseCode: 'GENG-312', courseTitle: 'Expository Writing', teacher: 'Mr. Waqas Gopang', room: 'Room No 20', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p1_m2', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-I', semester: 2, day: 'Monday', period: 2, span: 1, courseCode: 'DS24-320', courseTitle: 'Object Oriented Programming', teacher: 'Mr. Junaid Korai', room: 'Room No 20', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p1_m3', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-I', semester: 2, day: 'Monday', period: 3, span: 1, courseCode: 'GQUR-322', courseTitle: 'Calculus & Analytical Geometry', teacher: 'Dr. Asif Jamali', room: 'Room No 20', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p1_m4', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-I', semester: 2, day: 'Monday', period: 4, span: 1, courseCode: 'GSOS-324', courseTitle: 'Introduction to Management', teacher: 'Dr. Sheeraz Laghari', room: 'Room No 20', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p1_m6', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-I', semester: 2, day: 'Monday', period: 6, span: 1, courseCode: 'DCMT-308', courseTitle: 'Mathematics-II', teacher: 'Engr. Aamir Mal', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },

  { id: 'bsds_p1_tu1', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-I', semester: 2, day: 'Tuesday', period: 1, span: 1, courseCode: 'GISS/GETH-302', courseTitle: 'Islamic Studies / Ethics', teacher: 'Dr. Sibgatullah Bhutto', room: 'Room No 20', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p1_tu2', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-I', semester: 2, day: 'Tuesday', period: 2, span: 1, courseCode: 'GISS/GETH-302', courseTitle: 'Islamic Studies / Ethics', teacher: 'Dr. Sibgatullah Bhutto', room: 'Room No 20', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p1_tu3', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-I', semester: 2, day: 'Tuesday', period: 3, span: 1, courseCode: 'GQUR-322', courseTitle: 'Calculus & Analytical Geometry', teacher: 'Dr. Asif Jamali', room: 'Room No 20', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p1_tu5', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-I', semester: 2, day: 'Tuesday', period: 5, span: 1, courseCode: 'DS24-326', courseTitle: 'Digital Logic Design', teacher: 'Engr. Kundan Kumar', room: 'Room No 20', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p1_tu6', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-I', semester: 2, day: 'Tuesday', period: 6, span: 1, courseCode: 'DCMT-308', courseTitle: 'Mathematics-II', teacher: 'Engr. Aamir Mal', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },

  { id: 'bsds_p1_w1', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-I', semester: 2, day: 'Wednesday', period: 1, span: 1, courseCode: 'GENG-312', courseTitle: 'Expository Writing', teacher: 'Mr. Waqas Gopang', room: 'Room No 20', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p1_w2', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-I', semester: 2, day: 'Wednesday', period: 2, span: 1, courseCode: 'GENG-312', courseTitle: 'Expository Writing', teacher: 'Mr. Waqas Gopang', room: 'Room No 20', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p1_w3', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-I', semester: 2, day: 'Wednesday', period: 3, span: 1, courseCode: 'DS24-320', courseTitle: 'Object Oriented Programming', teacher: 'Mr. Junaid Korai', room: 'Room No 20', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p1_w4', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-I', semester: 2, day: 'Wednesday', period: 4, span: 1, courseCode: 'GSOS-324', courseTitle: 'Introduction to Management', teacher: 'Dr. Sheeraz Laghari', room: 'Room No 20', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p1_w6', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-I', semester: 2, day: 'Wednesday', period: 6, span: 1, courseCode: 'DCMT-308', courseTitle: 'Mathematics-II', teacher: 'Engr. Aamir Mal', room: 'Lecture Hall @ Hitech', shift: 'Morning', type: 'Lecture' },

  { id: 'bsds_p1_th1', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-I', semester: 2, day: 'Thursday', period: 1, span: 1, courseCode: 'GQUR-322', courseTitle: 'Calculus & Analytical Geometry', teacher: 'Dr. Asif Jamali', room: 'Room No 20', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p1_th2', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-I', semester: 2, day: 'Thursday', period: 2, span: 1, courseCode: 'DS24-320', courseTitle: 'Object Oriented Programming', teacher: 'Mr. Junaid Korai', room: 'Room No 20', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p1_th3', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-I', semester: 2, day: 'Thursday', period: 3, span: 1, courseCode: 'DS24-326', courseTitle: 'Digital Logic Design', teacher: 'Engr. Kundan Kumar', room: 'Room No 20', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p1_th5', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-I', semester: 2, day: 'Thursday', period: 5, span: 2, courseCode: 'DS24-327', courseTitle: 'Digital Logic Design (Lab)', teacher: 'Engr. Kundan Kumar', room: 'Microprocessor Lab', shift: 'Morning', type: 'Lab' },

  { id: 'bsds_p1_f1', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-I', semester: 2, day: 'Friday', period: 1, span: 2, courseCode: 'DS24-321', courseTitle: 'Object Oriented Programming (Lab)', teacher: 'Mr. Junaid Korai', room: 'Comp Lab I', shift: 'Morning', type: 'Lab' },

  // --------------------------------------------------------------------------
  // 10. BSDS P-II (Year 2, Semester 4) — Room No 2 (PDF Page 10)
  // --------------------------------------------------------------------------
  { id: 'bsds_p2_m1', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-II', semester: 4, day: 'Monday', period: 1, span: 1, courseCode: 'DS24-428', courseTitle: 'Multivariable Calculus', teacher: 'Mr. Rahat Ali', room: 'Room No 2', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p2_m2', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-II', semester: 4, day: 'Monday', period: 2, span: 1, courseCode: 'DS24-428', courseTitle: 'Multivariable Calculus', teacher: 'Mr. Rahat Ali', room: 'Room No 2', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p2_m3', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-II', semester: 4, day: 'Monday', period: 3, span: 2, courseCode: 'DS24-423', courseTitle: 'Database Systems (Lab)', teacher: 'Mr. Junaid Korai / Mr. Shahjahan', room: 'Comp Lab I', shift: 'Morning', type: 'Lab' },
  { id: 'bsds_p2_m5', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-II', semester: 4, day: 'Monday', period: 5, span: 1, courseCode: 'DS24-426', courseTitle: 'Artificial Intelligence', teacher: 'Dr. M. Ali Nizamani', room: 'Room No 2', shift: 'Morning', type: 'Lecture' },

  { id: 'bsds_p2_tu1', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-II', semester: 4, day: 'Tuesday', period: 1, span: 1, courseCode: 'DS24-422', courseTitle: 'Database Systems', teacher: 'Mr. Junaid Korai', room: 'Room No 2', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p2_tu2', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-II', semester: 4, day: 'Tuesday', period: 2, span: 1, courseCode: 'DS24-422', courseTitle: 'Database Systems', teacher: 'Mr. Junaid Korai', room: 'Room No 2', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p2_tu3', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-II', semester: 4, day: 'Tuesday', period: 3, span: 2, courseCode: 'DS24-425', courseTitle: 'Computer Networks (Lab)', teacher: 'Dr. Nisar Memon / Mr. Shahjahan', room: 'Comp Lab I', shift: 'Morning', type: 'Lab' },
  { id: 'bsds_p2_tu5', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-II', semester: 4, day: 'Tuesday', period: 5, span: 1, courseCode: 'DS24-424', courseTitle: 'Computer Networks', teacher: 'Dr. Nisar Memon', room: 'Room No 2', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p2_tu6', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-II', semester: 4, day: 'Tuesday', period: 6, span: 1, courseCode: 'DS24-430', courseTitle: 'Advanced Statistics', teacher: 'Engr. Umair Abro', room: 'Room No 2', shift: 'Morning', type: 'Lecture' },

  { id: 'bsds_p2_w1', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-II', semester: 4, day: 'Wednesday', period: 1, span: 1, courseCode: 'DS24-428', courseTitle: 'Multivariable Calculus', teacher: 'Mr. Rahat Ali', room: 'Room No 2', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p2_w2', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-II', semester: 4, day: 'Wednesday', period: 2, span: 1, courseCode: 'GENT-432', courseTitle: 'Entrepreneurship', teacher: 'Mr. Rafique Bhutto', room: 'Room No 2', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p2_w3', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-II', semester: 4, day: 'Wednesday', period: 3, span: 1, courseCode: 'DS24-424', courseTitle: 'Computer Networks', teacher: 'Dr. Nisar Memon', room: 'Room No 2', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p2_w4', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-II', semester: 4, day: 'Wednesday', period: 4, span: 1, courseCode: 'DS24-426', courseTitle: 'Artificial Intelligence', teacher: 'Dr. M. Ali Nizamani', room: 'Room No 2', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p2_w5', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-II', semester: 4, day: 'Wednesday', period: 5, span: 2, courseCode: 'DS24-427', courseTitle: 'Artificial Intelligence (Lab)', teacher: 'Dr. M. Ali Nizamani / Mr. Hassan Jhatial', room: 'Comp Lab II', shift: 'Morning', type: 'Lab' },

  { id: 'bsds_p2_th1', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-II', semester: 4, day: 'Thursday', period: 1, span: 1, courseCode: 'DS24-422', courseTitle: 'Database Systems', teacher: 'Mr. Junaid Korai', room: 'Room No 2', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p2_th2', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-II', semester: 4, day: 'Thursday', period: 2, span: 1, courseCode: 'GENT-432', courseTitle: 'Entrepreneurship', teacher: 'Mr. Rafique Bhutto', room: 'Room No 2', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p2_th3', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-II', semester: 4, day: 'Thursday', period: 3, span: 1, courseCode: 'DS24-424', courseTitle: 'Computer Networks', teacher: 'Dr. Nisar Memon', room: 'Room No 2', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p2_th5', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-II', semester: 4, day: 'Thursday', period: 5, span: 1, courseCode: 'DS24-430', courseTitle: 'Advanced Statistics', teacher: 'Engr. Umair Abro', room: 'Room No 2', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p2_th6', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-II', semester: 4, day: 'Thursday', period: 6, span: 1, courseCode: 'DS24-430', courseTitle: 'Advanced Statistics', teacher: 'Engr. Umair Abro', room: 'Room No 2', shift: 'Morning', type: 'Lecture' },

  // --------------------------------------------------------------------------
  // 11. BSDS P-III (Year 3, Semester 6) — CL Classroom (PDF Page 11)
  // --------------------------------------------------------------------------
  { id: 'bsds_p3_tu1', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-III', semester: 6, day: 'Tuesday', period: 1, span: 1, courseCode: 'DASC-528', courseTitle: 'Introduction to Management', teacher: 'Dr. Sheeraz Laghari', room: 'CL Classroom', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p3_tu2', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-III', semester: 6, day: 'Tuesday', period: 2, span: 1, courseCode: 'DASC-524', courseTitle: 'Machine Learning', teacher: 'Dr. Faheem Abbasi', room: 'CL Classroom', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p3_tu3', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-III', semester: 6, day: 'Tuesday', period: 3, span: 1, courseCode: 'DASC-522', courseTitle: 'Parallel and Distributed Computing', teacher: 'Dr. Atia Bano', room: 'CL Classroom', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p3_tu4', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-III', semester: 6, day: 'Tuesday', period: 4, span: 1, courseCode: 'DASC-522', courseTitle: 'Parallel and Distributed Computing', teacher: 'Dr. Atia Bano', room: 'CL Classroom', shift: 'Morning', type: 'Lecture' },

  { id: 'bsds_p3_w1', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-III', semester: 6, day: 'Wednesday', period: 1, span: 1, courseCode: 'DASC-528', courseTitle: 'Introduction to Management', teacher: 'Dr. Sheeraz Laghari', room: 'CL Classroom', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p3_w2', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-III', semester: 6, day: 'Wednesday', period: 2, span: 1, courseCode: 'DASC-528', courseTitle: 'Introduction to Management', teacher: 'Dr. Sheeraz Laghari', room: 'CL Classroom', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p3_w3', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-III', semester: 6, day: 'Wednesday', period: 3, span: 1, courseCode: 'DASC-524', courseTitle: 'Machine Learning', teacher: 'Dr. Faheem Abbasi', room: 'CL Classroom', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p3_w4', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-III', semester: 6, day: 'Wednesday', period: 4, span: 1, courseCode: 'DASC-520', courseTitle: 'Data Warehousing & Business Intelligence', teacher: 'Mr. Mir Hazar Khan', room: 'CL Classroom', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p3_w5', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-III', semester: 6, day: 'Wednesday', period: 5, span: 1, courseCode: 'DASC-520', courseTitle: 'Data Warehousing & Business Intelligence', teacher: 'Mr. Mir Hazar Khan', room: 'CL Classroom', shift: 'Morning', type: 'Lecture' },

  { id: 'bsds_p3_th1', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-III', semester: 6, day: 'Thursday', period: 1, span: 2, courseCode: 'DASC-521', courseTitle: 'Data Warehousing & Business Intelligence (Lab)', teacher: 'Mr. Mir Hazar Khan', room: 'Comp Lab I', shift: 'Morning', type: 'Lab' },
  { id: 'bsds_p3_th3', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-III', semester: 6, day: 'Thursday', period: 3, span: 2, courseCode: 'DASC-525', courseTitle: 'Machine Learning (Lab)', teacher: 'Dr. Faheem Abbasi / Mr. Junaid Korai', room: 'Comp Lab I', shift: 'Morning', type: 'Lab' },
  { id: 'bsds_p3_th5', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-III', semester: 6, day: 'Thursday', period: 5, span: 2, courseCode: 'DASC-523', courseTitle: 'Parallel and Distributed Computing (Lab)', teacher: 'Dr. Atia Bano', room: 'Comp Lab I', shift: 'Morning', type: 'Lab' },

  { id: 'bsds_p3_f1', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-III', semester: 6, day: 'Friday', period: 1, span: 1, courseCode: 'DASC-526', courseTitle: 'Topics in Data Science (Network Science)', teacher: 'Dr. Abdul Waheed', room: 'Room No 8', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p3_f2', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-III', semester: 6, day: 'Friday', period: 2, span: 1, courseCode: 'DASC-526', courseTitle: 'Topics in Data Science (Network Science)', teacher: 'Dr. Abdul Waheed', room: 'Room No 8', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p3_f3', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-III', semester: 6, day: 'Friday', period: 3, span: 2, courseCode: 'DASC-527', courseTitle: 'Topics in Data Science (Network Science) (Lab)', teacher: 'Dr. Abdul Waheed', room: 'Comp Lab I', shift: 'Morning', type: 'Lab' },

  // --------------------------------------------------------------------------
  // 12. BSDS P-IV (Year 4, Semester 8) — Room 3 & 4
  // --------------------------------------------------------------------------
  { id: 'bsds_p4_m1', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-IV', semester: 8, day: 'Monday', period: 1, span: 2, courseCode: 'DASC-622', courseTitle: 'Data Visualization', teacher: 'Dr. Atia Bano', room: 'Room 3 & 4', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p4_m3', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-IV', semester: 8, day: 'Monday', period: 3, span: 2, courseCode: 'DASC-626', courseTitle: 'Professional Practices', teacher: 'Dr. Imran Ujjan', room: 'Room 3 & 4', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p4_tu1', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-IV', semester: 8, day: 'Tuesday', period: 1, span: 2, courseCode: 'DASC-624', courseTitle: 'Introduction to Sociology', teacher: 'Dr. Niaz Bhutto', room: 'Room 3 & 4', shift: 'Morning', type: 'Lecture' },
  { id: 'bsds_p4_w1', deptId: 'dept_ds', deptCode: 'BSDS', part: 'P-IV', semester: 8, day: 'Wednesday', period: 1, span: 3, courseCode: 'DASC-699', courseTitle: 'Final Year Data Science Capstone Project', teacher: 'Dr. Faheem Abbasi / FYP Committee', room: 'Comp Lab I', shift: 'Morning', type: 'Capstone' },
];

// ============================================================================
// OFFICIAL SCHEDULE OF MIDTERM & FINAL EXAMINATIONS 2026 (PDF 2 Pages 1-3)
// ============================================================================
export const INITIAL_EXAM_DATESHEET: ExamDatesheetEntry[] = [
  // --------------------------------------------------------------------------
  // DEPARTMENT OF INFORMATION TECHNOLOGY — BS (IT) P-I to P-IV (PDF 2 Page 1)
  // --------------------------------------------------------------------------
  { id: 'ex_it_p1_1', deptId: 'dept_it', deptCode: 'BS (IT)', part: 'P-I', semester: 2, examType: 'Midterm', sNo: 1, date: '12-10-2026', courseCode: 'GQUR-322', subject: 'Calculus & Analytical Geometry', time: '09:00 A.M TO 10:00 A.M', teacherMorning: 'Engr. Noorulain Patoli', teacherEvening: 'Engr. Aamir Mal', roomAllocation: 'Room 10 & Room 8 (Morning) · Room 1 (Evening Group-A) · Room 2 (Evening Group-B)' },
  { id: 'ex_it_p1_2', deptId: 'dept_it', deptCode: 'BS (IT)', part: 'P-I', semester: 2, examType: 'Midterm', sNo: 2, date: '13-10-2026', courseCode: 'IT26-326', subject: 'Digital Logic Design', time: '09:00 A.M TO 10:00 A.M', teacherMorning: 'Dr. Fauzia Talpur', teacherEvening: 'Engr. Sayed Mansoor', roomAllocation: 'Room 10 & Room 8 (Morning) · Room 1 & Room 2 (Evening)' },
  { id: 'ex_it_p1_3', deptId: 'dept_it', deptCode: 'BS (IT)', part: 'P-I', semester: 2, examType: 'Midterm', sNo: 3, date: '14-10-2026', courseCode: 'IT26-320', subject: 'Object Oriented Programming', time: '09:00 A.M TO 10:00 A.M', teacherMorning: 'Dr. Nazish Basir', teacherEvening: 'Dr. Nazish Basir', roomAllocation: 'Room 10 & Room 8 (Morning) · Room 1 & Room 2 (Evening)' },
  { id: 'ex_it_p1_4a', deptId: 'dept_it', deptCode: 'BS (IT)', part: 'P-I', semester: 2, examType: 'Midterm', sNo: 4, date: '15-10-2026', courseCode: 'GENG-312', subject: 'Expository Writing', time: '09:00 A.M TO 10:00 A.M', teacherMorning: 'Ms. Asmat Fatima', teacherEvening: 'Mr. Ashfaque Meerani', roomAllocation: 'Room 10 & Room 8 (Morning) · Room 1 & Room 2 (Evening)' },
  { id: 'ex_it_p1_4b', deptId: 'dept_it', deptCode: 'BS (IT)', part: 'P-I', semester: 2, examType: 'Midterm', sNo: 4, date: '15-10-2026', courseCode: 'GICP-302', subject: 'Ideology and Constitution of Pakistan', time: '1:00 PM TO 2:00 PM', teacherMorning: 'Mr. Ahmed Hussain Shah', teacherEvening: 'Mr. Ahmed Hussain Shah', roomAllocation: 'Room 10 & Room 8 (Morning) · Room 1 & Room 2 (Evening)' },
  { id: 'ex_it_p1_5', deptId: 'dept_it', deptCode: 'BS (IT)', part: 'P-I', semester: 2, examType: 'Midterm', sNo: 5, date: '16-10-2026', courseCode: 'GSOS-324', subject: 'Introduction to Management', time: '09:00 A.M TO 10:00 A.M', teacherMorning: 'Mr. Z.A Bhutto', teacherEvening: 'Mr. Z.A Bhutto', roomAllocation: 'Room 10 & Room 8 (Morning) · Room 1 & Room 2 (Evening)' },

  { id: 'ex_it_p2_1', deptId: 'dept_it', deptCode: 'BS (IT)', part: 'P-II', semester: 4, examType: 'Midterm', sNo: 1, date: '12-10-2026', courseCode: 'IT24-428', subject: 'Multivariable Calculus', time: '10:00 A.M TO 11:00 A.M', teacherMorning: 'Engr. Umair Abro', teacherEvening: 'Engr. Umair Abro', roomAllocation: 'Room 10 & Room 8 (Morning) · Room 1 & Room 2 (Evening)' },
  { id: 'ex_it_p2_2', deptId: 'dept_it', deptCode: 'BS (IT)', part: 'P-II', semester: 4, examType: 'Midterm', sNo: 2, date: '13-10-2026', courseCode: 'IT24-430', subject: 'Computer graphics and Game Development', time: '10:00 A.M TO 11:00 A.M', teacherMorning: 'Dr. M. Ali Nizamani', teacherEvening: 'Mr. Mir Hazar Khan', roomAllocation: 'Room 10 & Room 8 (Morning) · Room 1 & Room 2 (Evening)' },
  { id: 'ex_it_p2_3', deptId: 'dept_it', deptCode: 'BS (IT)', part: 'P-II', semester: 4, examType: 'Midterm', sNo: 3, date: '14-10-2026', courseCode: 'IT24-422', subject: 'Database Systems', time: '10:00 A.M TO 11:00 A.M', teacherMorning: 'Mr. Junaid Javed', teacherEvening: 'Mr. Junaid Javed', roomAllocation: 'Room 10 & Room 8 (Morning) · Room 1 & Room 2 (Evening)' },
  { id: 'ex_it_p2_4a', deptId: 'dept_it', deptCode: 'BS (IT)', part: 'P-II', semester: 4, examType: 'Midterm', sNo: 4, date: '15-10-2026', courseCode: 'IT24-424', subject: 'Computer Networks', time: '10:00 A.M TO 11:00 A.M', teacherMorning: 'Mr. Aslam Kumbhar', teacherEvening: 'Mr. Aslam Kumbhar', roomAllocation: 'Room 10 & Room 8 (Morning) · Room 1 & Room 2 (Evening)' },
  { id: 'ex_it_p2_4b', deptId: 'dept_it', deptCode: 'BS (IT)', part: 'P-II', semester: 4, examType: 'Midterm', sNo: 4, date: '15-10-2026', courseCode: 'GENT-432', subject: 'Entrepreneurship', time: '2:00 P.M TO 3:00 P.M', teacherMorning: 'Dr. M. Ali Memon', teacherEvening: 'Mr. Farman Ali Lashari', roomAllocation: 'Room 10 & Room 8 (Morning) · Room 1 & Room 2 (Evening)' },
  { id: 'ex_it_p2_5', deptId: 'dept_it', deptCode: 'BS (IT)', part: 'P-II', semester: 4, examType: 'Midterm', sNo: 5, date: '16-10-2026', courseCode: 'IT24-426', subject: 'Web Technologies', time: '10:00 A.M TO 11:00 A.M', teacherMorning: 'Dr. Zeeshan Bhatti', teacherEvening: 'Dr. Zeeshan Bhatti', roomAllocation: 'Room 10 & Room 8 (Morning) · Room 1 & Room 2 (Evening)' },

  { id: 'ex_it_p3_1', deptId: 'dept_it', deptCode: 'BS (IT)', part: 'P-III', semester: 6, examType: 'Midterm', sNo: 1, date: '12-10-2026', courseCode: 'IT24-520', subject: 'Information Technology Infrastructure', time: '11:00 A.M TO 12:00 P.M', teacherMorning: 'Mr. Hassan Jhatial', teacherEvening: 'Mr. Hassan Jhatial', roomAllocation: 'Room 10 & Room 8 (Morning) · Room 1 & Room 2 (Evening)' },
  { id: 'ex_it_p3_2', deptId: 'dept_it', deptCode: 'BS (IT)', part: 'P-III', semester: 6, examType: 'Midterm', sNo: 2, date: '13-10-2026', courseCode: 'IT24-524', subject: 'Cloud Computing', time: '11:00 A.M TO 12:00 P.M', teacherMorning: 'Mr. Junaid Javed', teacherEvening: 'Mr. Junaid Javed', roomAllocation: 'Room 10 & Room 8 (Morning) · Room 1 & Room 2 (Evening)' },
  { id: 'ex_it_p3_3', deptId: 'dept_it', deptCode: 'BS (IT)', part: 'P-III', semester: 6, examType: 'Midterm', sNo: 3, date: '14-10-2026', courseCode: 'IT24-522', subject: 'Parallel and Distributed Computing', time: '11:00 A.M TO 12:00 P.M', teacherMorning: 'Dr. Lachhman Das', teacherEvening: 'Dr. Lachhman Das', roomAllocation: 'Room 10 & Room 8 (Morning) · Room 1 & Room 2 (Evening)' },
  { id: 'ex_it_p3_4', deptId: 'dept_it', deptCode: 'BS (IT)', part: 'P-III', semester: 6, examType: 'Midterm', sNo: 4, date: '15-10-2026', courseCode: 'IT24-526', subject: 'Data Mining', time: '11:00 A.M TO 12:00 P.M', teacherMorning: 'Dr. Faheem Abbasi', teacherEvening: 'Dr. Imran Ujjan', roomAllocation: 'Room 10 & Room 8 (Morning) · Room 1 & Room 2 (Evening)' },
  { id: 'ex_it_p3_5', deptId: 'dept_it', deptCode: 'BS (IT)', part: 'P-III', semester: 6, examType: 'Midterm', sNo: 5, date: '16-10-2026', courseCode: 'IT24-530', subject: 'Introduction to Marketing', time: '11:00 A.M TO 12:00 P.M', teacherMorning: 'Dr. Hakim Ali Mahesar', teacherEvening: 'Dr. Hakim Ali Mahesar', roomAllocation: 'Room 10 & Room 8 (Morning) · Room 1 & Room 2 (Evening)' },

  { id: 'ex_it_p4_1', deptId: 'dept_it', deptCode: 'BS (IT)', part: 'P-IV', semester: 8, examType: 'Midterm', sNo: 1, date: '12-10-2026', courseCode: 'INFT-624', subject: 'Cyber Security', time: '12:00 P.M TO 01:00 P.M', teacherMorning: 'Dr. Shiraz Leghari', teacherEvening: 'Dr. Shiraz Leghari', roomAllocation: 'Room 10 & Room 8 (Morning) · Room 1 & Room 2 (Evening)' },
  { id: 'ex_it_p4_2', deptId: 'dept_it', deptCode: 'BS (IT)', part: 'P-IV', semester: 8, examType: 'Midterm', sNo: 2, date: '13-10-2026', courseCode: 'INFT-626', subject: 'Professional Practices', time: '12:00 P.M TO 01:00 P.M', teacherMorning: 'Dr. M. Ali Memon', teacherEvening: 'Dr. Imran Ujjan', roomAllocation: 'Room 10 & Room 8 (Morning) · Room 1 & Room 2 (Evening)' },
  { id: 'ex_it_p4_3', deptId: 'dept_it', deptCode: 'BS (IT)', part: 'P-IV', semester: 8, examType: 'Midterm', sNo: 3, date: '14-10-2026', courseCode: 'INFT-622', subject: 'Network Science', time: '12:00 P.M TO 01:00 P.M', teacherMorning: 'Dr. Abdul Waheed', teacherEvening: 'Dr. Abdul Waheed', roomAllocation: 'Room 10 & Room 8 (Morning) · Room 1 & Room 2 (Evening)' },
  { id: 'ex_it_p4_4', deptId: 'dept_it', deptCode: 'BS (IT)', part: 'P-IV', semester: 8, examType: 'Midterm', sNo: 4, date: '15-10-2026', courseCode: 'INFT-620', subject: 'Systems and Network Administration', time: '12:00 P.M TO 01:00 P.M', teacherMorning: 'Mr. Hassan Jhatial', teacherEvening: 'Mr. Hassan Jhatial (Evening)', roomAllocation: 'Room 10 & Room 8 (Morning) · Room 1 & Room 2 (Evening)' },

  // --------------------------------------------------------------------------
  // DEPARTMENT OF SOFTWARE ENGINEERING — BS (SW) P-I to P-IV (PDF 2 Page 2)
  // --------------------------------------------------------------------------
  { id: 'ex_sw_p1_1', deptId: 'dept_swe', deptCode: 'BS (SW)', part: 'P-I', semester: 2, examType: 'Midterm', sNo: 1, date: '12-10-2026', courseCode: 'GQUR-322', subject: 'Discrete Structures', time: '09:00 A.M TO 10:00 A.M', teacherMorning: 'Dr. Arjumand Bano', teacherEvening: 'Mr. Shahjahan', roomAllocation: 'Room 22 And Corridor (Morning) · Room 20 (Evening Group-A & B)' },
  { id: 'ex_sw_p1_2', deptId: 'dept_swe', deptCode: 'BS (SW)', part: 'P-I', semester: 2, examType: 'Midterm', sNo: 2, date: '13-10-2026', courseCode: 'SE26-320', subject: 'Digital Logic Design', time: '09:00 A.M TO 10:00 A.M', teacherMorning: 'Dr. Fauzia Talpur', teacherEvening: 'Engr. Sayed Mansoor', roomAllocation: 'Room 22 And Corridor (Morning) · Room 20 (Evening)' },
  { id: 'ex_sw_p1_3', deptId: 'dept_swe', deptCode: 'BS (SW)', part: 'P-I', semester: 2, examType: 'Midterm', sNo: 3, date: '14-10-2026', courseCode: 'SE26-322', subject: 'Object Oriented Programming', time: '09:00 A.M TO 10:00 A.M', teacherMorning: 'Engr. Aamir Mal', teacherEvening: 'Engr. Aamir Mal', roomAllocation: 'Room 22 And Corridor (Morning) · Room 20 (Evening)' },
  { id: 'ex_sw_p1_4a', deptId: 'dept_swe', deptCode: 'BS (SW)', part: 'P-I', semester: 2, examType: 'Midterm', sNo: 4, date: '15-10-2026', courseCode: 'GENG-312', subject: 'Expository Writing', time: '09:00 A.M TO 10:00 A.M', teacherMorning: 'Ms. Murk Masooma', teacherEvening: 'Mr. Ashfaque Meerani', roomAllocation: 'Room 22 And Corridor (Morning) · Room 20 (Evening)' },
  { id: 'ex_sw_p1_4b', deptId: 'dept_swe', deptCode: 'BS (SW)', part: 'P-I', semester: 2, examType: 'Midterm', sNo: 4, date: '15-10-2026', courseCode: 'GICP-302', subject: 'Ideology and Constitution of Pakistan', time: '1:00 PM TO 2:00 PM', teacherMorning: 'Mr. Ahmed Hussain Shah', teacherEvening: 'Mr. Ahmed Hussain Shah', roomAllocation: 'Room 22 And Corridor (Morning) · Room 20 (Evening)' },
  { id: 'ex_sw_p1_5a', deptId: 'dept_swe', deptCode: 'BS (SW)', part: 'P-I', semester: 2, examType: 'Midterm', sNo: 5, date: '16-10-2026', courseCode: 'GSOS-324', subject: 'Introduction to Management', time: '09:00 A.M TO 10:00 A.M', teacherMorning: 'Dr. Asif Ali Jamali', teacherEvening: 'Dr. Asif Ali Jamali', roomAllocation: 'Room 22 And Corridor (Morning) · Room 20 (Evening)' },
  { id: 'ex_sw_p1_5b', deptId: 'dept_swe', deptCode: 'BS (SW)', part: 'P-I', semester: 2, examType: 'Midterm', sNo: 5, date: '16-10-2026', courseCode: 'SE26-324', subject: 'Software Engineering', time: '12:00 P.M TO 1:00 P.M', teacherMorning: 'Dr. Arifa Bhutto', teacherEvening: 'Ms. Bushra Memon', roomAllocation: 'Room 22 And Corridor (Morning) · Room 20 (Evening)' },

  { id: 'ex_sw_p2_1', deptId: 'dept_swe', deptCode: 'BS (SW)', part: 'P-II', semester: 4, examType: 'Midterm', sNo: 1, date: '12-10-2026', courseCode: 'SE24-408', subject: 'Probability & Statistics', time: '10:00 A.M TO 11:00 A.M', teacherMorning: 'Dr. Asif Ali Jamali', teacherEvening: 'Dr. Asif Ali Jamali', roomAllocation: 'Room 22 And Corridor (Morning) · Room 20 (Evening)' },
  { id: 'ex_sw_p2_2', deptId: 'dept_swe', deptCode: 'BS (SW)', part: 'P-II', semester: 4, examType: 'Midterm', sNo: 2, date: '13-10-2026', courseCode: 'SE24-414', subject: 'Web Technologies', time: '10:00 A.M TO 11:00 A.M', teacherMorning: 'Dr. Mumtaz Qabulio', teacherEvening: 'Mr. Rafique Ahmed', roomAllocation: 'Room 22 And Corridor (Morning) · Room 20 (Evening)' },
  { id: 'ex_sw_p2_3', deptId: 'dept_swe', deptCode: 'BS (SW)', part: 'P-II', semester: 4, examType: 'Midterm', sNo: 3, date: '14-10-2026', courseCode: 'SE24-416', subject: 'Data Science', time: '10:00 A.M TO 11:00 A.M', teacherMorning: 'Dr. Niaz Hussain Arijo', teacherEvening: 'Mr. Hassan Jhatial', roomAllocation: 'Room 22 And Corridor (Morning) · Room 20 (Evening)' },
  { id: 'ex_sw_p2_4a', deptId: 'dept_swe', deptCode: 'BS (SW)', part: 'P-II', semester: 4, examType: 'Midterm', sNo: 4, date: '15-10-2026', courseCode: 'SE24-412', subject: 'Software Requirement Engineering', time: '10:00 A.M TO 11:00 A.M', teacherMorning: 'Ms. Noorulain Patoli', teacherEvening: 'Dr. Arjumand Bano', roomAllocation: 'Room 22 And Corridor (Morning) · Room 20 (Evening)' },
  { id: 'ex_sw_p2_4b', deptId: 'dept_swe', deptCode: 'BS (SW)', part: 'P-II', semester: 4, examType: 'Midterm', sNo: 4, date: '15-10-2026', courseCode: 'GENT-432', subject: 'Entrepreneurship', time: '2:00 P.M TO 3:00 P.M', teacherMorning: 'Dr. Arifa Bhutto', teacherEvening: 'Dr. Arifa Bhutto', roomAllocation: 'Room 22 And Corridor (Morning) · Room 20 (Evening)' },
  { id: 'ex_sw_p2_5', deptId: 'dept_swe', deptCode: 'BS (SW)', part: 'P-II', semester: 4, examType: 'Midterm', sNo: 5, date: '16-10-2026', courseCode: 'SE24-410', subject: 'Computer Organization & Assembly Language', time: '10:00 A.M TO 11:00 A.M', teacherMorning: 'Dr. Arjumand Bano', teacherEvening: 'Mr. Musuab Ahsan', roomAllocation: 'Room 22 And Corridor (Morning) · Room 20 (Evening)' },

  { id: 'ex_sw_p3_1', deptId: 'dept_swe', deptCode: 'BS (SW)', part: 'P-III', semester: 6, examType: 'Midterm', sNo: 1, date: '12-10-2026', courseCode: 'SE24-510', subject: 'Information Security', time: '11:00 A.M TO 12:00 P.M', teacherMorning: 'Dr. Mumtaz Qabulio', teacherEvening: 'Mr. Rafique Ahmed', roomAllocation: 'Room 22 And Corridor (Morning) · Room 20 (Evening)' },
  { id: 'ex_sw_p3_2', deptId: 'dept_swe', deptCode: 'BS (SW)', part: 'P-III', semester: 6, examType: 'Midterm', sNo: 2, date: '13-10-2026', courseCode: 'SE24-512', subject: 'Software Project Management', time: '11:00 A.M TO 12:00 P.M', teacherMorning: 'Dr. Kamran Taj', teacherEvening: 'Dr. Kamran Taj', roomAllocation: 'Room 22 And Corridor (Morning) · Room 20 (Evening)' },
  { id: 'ex_sw_p3_3', deptId: 'dept_swe', deptCode: 'BS (SW)', part: 'P-III', semester: 6, examType: 'Midterm', sNo: 3, date: '14-10-2026', courseCode: 'SE24-516', subject: 'Software Construction and Development', time: '11:00 A.M TO 12:00 P.M', teacherMorning: 'Engr. Aamir Mal', teacherEvening: 'Engr. Aamir Mal', roomAllocation: 'Room 22 And Corridor (Morning) · Room 20 (Evening)' },
  { id: 'ex_sw_p3_4', deptId: 'dept_swe', deptCode: 'BS (SW)', part: 'P-III', semester: 6, examType: 'Midterm', sNo: 4, date: '15-10-2026', courseCode: 'SE24-514', subject: 'Parallel and Distributed Computing', time: '11:00 A.M TO 12:00 P.M', teacherMorning: 'Mr. Junaid Javed', teacherEvening: 'Mr. Junaid Javed', roomAllocation: 'Room 22 And Corridor (Morning) · Room 20 (Evening)' },
  { id: 'ex_sw_p3_5', deptId: 'dept_swe', deptCode: 'BS (SW)', part: 'P-III', semester: 6, examType: 'Midterm', sNo: 5, date: '16-10-2026', courseCode: 'SE24-518', subject: 'Mobile Application And Development', time: '11:00 A.M TO 12:00 P.M', teacherMorning: 'Mr. Mir Hazar Khan', teacherEvening: 'Mr. Mir Hazar Khan', roomAllocation: 'Room 22 And Corridor (Morning) · Room 20 (Evening)' },

  { id: 'ex_sw_p4_1', deptId: 'dept_swe', deptCode: 'BS (SW)', part: 'P-IV', semester: 8, examType: 'Midterm', sNo: 1, date: '12-10-2026', courseCode: 'SE23-612', subject: 'Information Security', time: '12:00 P.M TO 01:00 P.M', teacherMorning: 'Dr. Mumtaz Qabulio', teacherEvening: 'Dr. Asif Jamali', roomAllocation: 'Room 22 And Corridor (Morning) · Room 20 (Evening)' },
  { id: 'ex_sw_p4_2', deptId: 'dept_swe', deptCode: 'BS (SW)', part: 'P-IV', semester: 8, examType: 'Midterm', sNo: 2, date: '13-10-2026', courseCode: 'SE23-610', subject: 'Professional Practices', time: '12:00 P.M TO 01:00 P.M', teacherMorning: 'Dr. Imran Ujjan', teacherEvening: 'Dr. Imran Ujjan', roomAllocation: 'Room 22 And Corridor (Morning) · Room 20 (Evening)' },
  { id: 'ex_sw_p4_3', deptId: 'dept_swe', deptCode: 'BS (SW)', part: 'P-IV', semester: 8, examType: 'Midterm', sNo: 3, date: '14-10-2026', courseCode: 'SE23-616', subject: 'Game Application', time: '12:00 P.M TO 01:00 P.M', teacherMorning: 'Mr. Mir Hazar Khan', teacherEvening: 'Mr. Mir Hazar Khan', roomAllocation: 'Room 22 And Corridor (Morning) · Room 20 (Evening)' },
  { id: 'ex_sw_p4_4', deptId: 'dept_swe', deptCode: 'BS (SW)', part: 'P-IV', semester: 8, examType: 'Midterm', sNo: 4, date: '15-10-2026', courseCode: 'SE23-614', subject: 'Software Re-Engineering', time: '12:00 P.M TO 01:00 P.M', teacherMorning: 'Mr. Rafique Ahmed', teacherEvening: 'Mr. Rafique Ahmed', roomAllocation: 'Room 22 And Corridor (Morning) · Room 20 (Evening)' },

  // --------------------------------------------------------------------------
  // DEPARTMENT OF DATA SCIENCE — BS (DS) P-I to P-IV (PDF 2 Page 3)
  // --------------------------------------------------------------------------
  { id: 'ex_ds_p1_1', deptId: 'dept_ds', deptCode: 'BS (DS)', part: 'P-I', semester: 2, examType: 'Midterm', sNo: 1, date: '12-10-2026', courseCode: 'GQUR-322', subject: 'Calculus & Analytical Geometry', time: '09:00 A.M TO 10:00 A.M', teacherMorning: 'Engr. Noorulain Patoli', teacherEvening: 'Morning Only', roomAllocation: 'Room 3 & Room 4' },
  { id: 'ex_ds_p1_2', deptId: 'dept_ds', deptCode: 'BS (DS)', part: 'P-I', semester: 2, examType: 'Midterm', sNo: 2, date: '13-10-2026', courseCode: 'DS26-326', subject: 'Digital Logic Design', time: '09:00 A.M TO 10:00 A.M', teacherMorning: 'Dr. Fauzia Talpur', teacherEvening: 'Morning Only', roomAllocation: 'Room 3 & Room 4' },
  { id: 'ex_ds_p1_3', deptId: 'dept_ds', deptCode: 'BS (DS)', part: 'P-I', semester: 2, examType: 'Midterm', sNo: 3, date: '14-10-2026', courseCode: 'DS26-320', subject: 'Object Oriented Programming', time: '09:00 A.M TO 10:00 A.M', teacherMorning: 'Dr. Nazish Basir', teacherEvening: 'Morning Only', roomAllocation: 'Room 3 & Room 4' },
  { id: 'ex_ds_p1_4a', deptId: 'dept_ds', deptCode: 'BS (DS)', part: 'P-I', semester: 2, examType: 'Midterm', sNo: 4, date: '15-10-2026', courseCode: 'GENG-312', subject: 'Expository Writing', time: '09:00 A.M TO 10:00 A.M', teacherMorning: 'Mr. GM Keerio', teacherEvening: 'Morning Only', roomAllocation: 'Room 3 & Room 4' },
  { id: 'ex_ds_p1_4b', deptId: 'dept_ds', deptCode: 'BS (DS)', part: 'P-I', semester: 2, examType: 'Midterm', sNo: 4, date: '15-10-2026', courseCode: 'GICP-302', subject: 'Ideology and Constitution of Pakistan', time: '1:00 PM TO 2:00 PM', teacherMorning: 'Mr. Ahmed Hussain Shah', teacherEvening: 'Morning Only', roomAllocation: 'Room 3 & Room 4' },
  { id: 'ex_ds_p1_5', deptId: 'dept_ds', deptCode: 'BS (DS)', part: 'P-I', semester: 2, examType: 'Midterm', sNo: 5, date: '16-10-2026', courseCode: 'GSOS-324', subject: 'Introduction to Management', time: '09:00 A.M TO 10:00 A.M', teacherMorning: 'Dr. Asif Ali Jamali', teacherEvening: 'Morning Only', roomAllocation: 'Room 3 & Room 4' },

  { id: 'ex_ds_p2_1', deptId: 'dept_ds', deptCode: 'BS (DS)', part: 'P-II', semester: 4, examType: 'Midterm', sNo: 1, date: '12-10-2026', courseCode: 'DS24-428', subject: 'Multivariable Calculus', time: '10:00 A.M TO 11:00 A.M', teacherMorning: 'Engr. Umair Abro', teacherEvening: 'Morning Only', roomAllocation: 'Room 3 & Room 4' },
  { id: 'ex_ds_p2_2', deptId: 'dept_ds', deptCode: 'BS (DS)', part: 'P-II', semester: 4, examType: 'Midterm', sNo: 2, date: '13-10-2026', courseCode: 'DS24-430', subject: 'Advanced Statistics', time: '10:00 A.M TO 11:00 A.M', teacherMorning: 'Dr. Shazia Abbasi', teacherEvening: 'Morning Only', roomAllocation: 'Room 3 & Room 4' },
  { id: 'ex_ds_p2_3', deptId: 'dept_ds', deptCode: 'BS (DS)', part: 'P-II', semester: 4, examType: 'Midterm', sNo: 3, date: '14-10-2026', courseCode: 'DS24-426', subject: 'Artificial Intelligence', time: '10:00 A.M TO 11:00 A.M', teacherMorning: 'Dr. M. Ali Nizamani', teacherEvening: 'Morning Only', roomAllocation: 'Room 3 & Room 4' },
  { id: 'ex_ds_p2_4a', deptId: 'dept_ds', deptCode: 'BS (DS)', part: 'P-II', semester: 4, examType: 'Midterm', sNo: 4, date: '15-10-2026', courseCode: 'DS24-424', subject: 'Computer Networks', time: '10:00 A.M TO 11:00 A.M', teacherMorning: 'Dr. Nisar Memon', teacherEvening: 'Morning Only', roomAllocation: 'Room 3 & Room 4' },
  { id: 'ex_ds_p2_4b', deptId: 'dept_ds', deptCode: 'BS (DS)', part: 'P-II', semester: 4, examType: 'Midterm', sNo: 4, date: '15-10-2026', courseCode: 'GENT-432', subject: 'Entrepreneurship', time: '2:00 P.M TO 3:00 P.M', teacherMorning: 'Mr. Rafique Ahmed', teacherEvening: 'Morning Only', roomAllocation: 'Room 3 & Room 4' },
  { id: 'ex_ds_p2_5', deptId: 'dept_ds', deptCode: 'BS (DS)', part: 'P-II', semester: 4, examType: 'Midterm', sNo: 5, date: '16-10-2026', courseCode: 'DS24-422', subject: 'Database Systems', time: '10:00 A.M TO 11:00 A.M', teacherMorning: 'Dr. Kamran Dahri', teacherEvening: 'Morning Only', roomAllocation: 'Room 3 & Room 4' },

  { id: 'ex_ds_p3_1', deptId: 'dept_ds', deptCode: 'BS (DS)', part: 'P-III', semester: 6, examType: 'Midterm', sNo: 1, date: '12-10-2026', courseCode: 'DS24-524', subject: 'Artificial Neural Networks & Deep Learning', time: '11:00 A.M TO 12:00 P.M', teacherMorning: 'Dr. Niaz Hussain Arijo', teacherEvening: 'Morning Only', roomAllocation: 'Room 3 & Room 4' },
  { id: 'ex_ds_p3_2', deptId: 'dept_ds', deptCode: 'BS (DS)', part: 'P-III', semester: 6, examType: 'Midterm', sNo: 2, date: '13-10-2026', courseCode: 'DS24-526', subject: 'Design and Analysis of Algorithms', time: '11:00 A.M TO 12:00 P.M', teacherMorning: 'Engr. Aamir Mal', teacherEvening: 'Morning Only', roomAllocation: 'Room 3 & Room 4' },
  { id: 'ex_ds_p3_3', deptId: 'dept_ds', deptCode: 'BS (DS)', part: 'P-III', semester: 6, examType: 'Midterm', sNo: 3, date: '14-10-2026', courseCode: 'DS24-522', subject: 'Parallel and Distributed Computing', time: '11:00 A.M TO 12:00 P.M', teacherMorning: 'Dr. Atia Bano', teacherEvening: 'Morning Only', roomAllocation: 'Room 3 & Room 4' },
  { id: 'ex_ds_p3_4', deptId: 'dept_ds', deptCode: 'BS (DS)', part: 'P-III', semester: 6, examType: 'Midterm', sNo: 4, date: '15-10-2026', courseCode: 'DS24-520', subject: 'Data Mining', time: '11:00 A.M TO 12:00 P.M', teacherMorning: 'Dr. Faheem Abbasi', teacherEvening: 'Morning Only', roomAllocation: 'Room 3 & Room 4' },
  { id: 'ex_ds_p3_5', deptId: 'dept_ds', deptCode: 'BS (DS)', part: 'P-III', semester: 6, examType: 'Midterm', sNo: 5, date: '16-10-2026', courseCode: 'DS24-530', subject: 'Introduction to Marketing', time: '11:00 A.M TO 12:00 P.M', teacherMorning: 'Ms. Priya Babar', teacherEvening: 'Morning Only', roomAllocation: 'Room 3 & Room 4' },

  { id: 'ex_ds_p4_1', deptId: 'dept_ds', deptCode: 'BS (DS)', part: 'P-IV', semester: 8, examType: 'Midterm', sNo: 1, date: '12-10-2026', courseCode: 'DASC-622', subject: 'Data Visualization', time: '12:00 P.M TO 01:00 P.M', teacherMorning: 'Dr. Atia Bano', teacherEvening: 'Morning Only', roomAllocation: 'Room 3 & Room 4' },
  { id: 'ex_ds_p4_2', deptId: 'dept_ds', deptCode: 'BS (DS)', part: 'P-IV', semester: 8, examType: 'Midterm', sNo: 2, date: '13-10-2026', courseCode: 'DASC-626', subject: 'Professional Practices', time: '12:00 P.M TO 01:00 P.M', teacherMorning: 'Dr. Imran Ujjan', teacherEvening: 'Morning Only', roomAllocation: 'Room 3 & Room 4' },
  { id: 'ex_ds_p4_3', deptId: 'dept_ds', deptCode: 'BS (DS)', part: 'P-IV', semester: 8, examType: 'Midterm', sNo: 3, date: '14-10-2026', courseCode: 'DASC-624', subject: 'Introduction to Sociology', time: '12:00 P.M TO 01:00 P.M', teacherMorning: 'Dr. Niaz Bhutto', teacherEvening: 'Morning Only', roomAllocation: 'Room 3 & Room 4' },

  // --------------------------------------------------------------------------
  // FINAL SEMESTER EXAMINATION SCHEDULE 2026 (Sample Seed Across BSIT, BSSW, BSDS)
  // --------------------------------------------------------------------------
  { id: 'fn_sw_p3_1', deptId: 'dept_swe', deptCode: 'BS (SW)', part: 'P-III', semester: 6, examType: 'Final', sNo: 1, date: '14-12-2026', courseCode: 'SE23-510', subject: 'Human Computer Interaction', time: '09:30 A.M TO 12:30 P.M', teacherMorning: 'Dr. Kamran Taj Pathan', teacherEvening: 'Dr. Kamran Taj Pathan', roomAllocation: 'Room 22 & Corridor (Morning) · Room 20 (Evening)' },
  { id: 'fn_sw_p3_2', deptId: 'dept_swe', deptCode: 'BS (SW)', part: 'P-III', semester: 6, examType: 'Final', sNo: 2, date: '16-12-2026', courseCode: 'SE23-514', subject: 'Software Construction & Development', time: '09:30 A.M TO 12:30 P.M', teacherMorning: 'Ms. Noorulain Patoli', teacherEvening: 'Engr. Aamir Mal', roomAllocation: 'Room 22 & Corridor (Morning) · Room 20 (Evening)' },
  { id: 'fn_sw_p3_3', deptId: 'dept_swe', deptCode: 'BS (SW)', part: 'P-III', semester: 6, examType: 'Final', sNo: 3, date: '18-12-2026', courseCode: 'SE23-518', subject: 'Data Science', time: '09:30 A.M TO 12:30 P.M', teacherMorning: 'Dr. M. Ali Memon', teacherEvening: 'Mr. Hassan Jhatial', roomAllocation: 'Room 22 & Corridor (Morning) · Room 20 (Evening)' },
  { id: 'fn_sw_p3_4', deptId: 'dept_swe', deptCode: 'BS (SW)', part: 'P-III', semester: 6, examType: 'Final', sNo: 4, date: '21-12-2026', courseCode: 'SE23-520', subject: 'Natural Language Process', time: '09:30 A.M TO 12:30 P.M', teacherMorning: 'Ms. Nazish Basir', teacherEvening: 'Ms. Nazish Basir', roomAllocation: 'Room 22 & Corridor (Morning) · Room 20 (Evening)' },

  { id: 'fn_it_p3_1', deptId: 'dept_it', deptCode: 'BS (IT)', part: 'P-III', semester: 6, examType: 'Final', sNo: 1, date: '14-12-2026', courseCode: 'INFT-520', subject: 'Information Technology Infrastructure', time: '09:30 A.M TO 12:30 P.M', teacherMorning: 'Mr. Hassan Jhatial', teacherEvening: 'Mr. Hassan Jhatial', roomAllocation: 'Room 10 & Room 8 (Morning) · Room 1 & Room 2 (Evening)' },
  { id: 'fn_it_p3_2', deptId: 'dept_it', deptCode: 'BS (IT)', part: 'P-III', semester: 6, examType: 'Final', sNo: 2, date: '16-12-2026', courseCode: 'INFT-524', subject: 'Mobile Application Development', time: '09:30 A.M TO 12:30 P.M', teacherMorning: 'Dr. Zeeshan Bhatti', teacherEvening: 'Dr. Zeeshan Bhatti', roomAllocation: 'Room 10 & Room 8 (Morning) · Room 1 & Room 2 (Evening)' },
  { id: 'fn_it_p3_3', deptId: 'dept_it', deptCode: 'BS (IT)', part: 'P-III', semester: 6, examType: 'Final', sNo: 3, date: '18-12-2026', courseCode: 'INFT-526', subject: 'Data Science', time: '09:30 A.M TO 12:30 P.M', teacherMorning: 'Dr. Faheem Abbasi', teacherEvening: 'Dr. Imran Ujjan', roomAllocation: 'Room 10 & Room 8 (Morning) · Room 1 & Room 2 (Evening)' },

  { id: 'fn_ds_p3_1', deptId: 'dept_ds', deptCode: 'BS (DS)', part: 'P-III', semester: 6, examType: 'Final', sNo: 1, date: '14-12-2026', courseCode: 'DASC-524', subject: 'Machine Learning', time: '09:30 A.M TO 12:30 P.M', teacherMorning: 'Dr. Faheem Abbasi', teacherEvening: 'Morning Only', roomAllocation: 'Room 3 & Room 4' },
  { id: 'fn_ds_p3_2', deptId: 'dept_ds', deptCode: 'BS (DS)', part: 'P-III', semester: 6, examType: 'Final', sNo: 2, date: '16-12-2026', courseCode: 'DASC-520', subject: 'Data Warehousing & Business Intelligence', time: '09:30 A.M TO 12:30 P.M', teacherMorning: 'Mr. Mir Hazar Khan', teacherEvening: 'Morning Only', roomAllocation: 'Room 3 & Room 4' },
];

export const INITIAL_EXAM_DATESHEET_ENTRIES = INITIAL_EXAM_DATESHEET;
export const INITIAL_UNIVERSITY_TIMETABLE_SETTINGS = DEFAULT_TIMETABLE_SETTINGS;

