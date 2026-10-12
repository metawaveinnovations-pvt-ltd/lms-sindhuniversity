export type UserRole = 
  | 'vc' 
  | 'dean' 
  | 'chairman'
  | 'hod' 
  | 'faculty' 
  | 'student' 
  | 'parent' 
  | 'public' 
  | 'admin' 
  | 'architecture';

export interface UniversityFaculty {
  id: string;
  name: string;
  deanName: string;
  deanEmail: string;
  departmentsCount: number;
  studentsCount: number;
  teachersCount: number;
  attendanceAvg: number;
  passingRate: number;
  accreditationStatus: string;
}

export interface UniversityDepartment {
  id: string;
  name: string;
  code: string;
  facultyId: string;
  facultyName: string;
  chairmanName: string;
  chairmanEmail: string;
  programs: string[];
  studentsCount: number;
  teachersCount: number;
  attendanceRate: number;
  coursesOfferedCount: number;
}

export interface UniversityTeacher {
  id: string;
  name: string;
  designation: string;
  departmentId: string;
  departmentName: string;
  facultyName: string;
  email: string;
  phone: string;
  activeCourses: string[];
  officeRoom: string;
}

export type AuditClassification = 'CONFIRMED' | 'PROBABLE' | 'UNKNOWN' | 'RECOMMENDATION';

export type DefectSeverity = 'P0' | 'P1' | 'P2' | 'P3' | 'P4';

export interface AuditFinding {
  id: string; // LMS-001, etc.
  title: string;
  category: 'Content Governance' | 'UI/UX & IA' | 'Architecture & Routing' | 'Security & Auth' | 'Data Integrity & API' | 'Infrastructure & DR';
  classification: AuditClassification;
  severity: DefectSeverity;
  evidence: string;
  currentBehavior: string;
  expectedBehavior: string;
  impact: string;
  rootCause: string;
  recommendation: string;
  affectedUsers: string;
  regressionTest: string;
  verificationStatus: 'Publicly Verified' | 'Requires Authorized Technical Access' | 'Architectural Opportunity';
}

export interface StudentProfile {
  id: string;
  rollNumber: string;
  name: string;
  fatherName: string;
  department: string;
  batch: string;
  program: string;
  semester: number;
  email: string;
  phone: string;
  cnicMasked: string;
  avatarUrl: string;
  gpa: number;
  cgpa: number;
  completedCredits: number;
  totalCredits: number;
  academicStanding: 'Good Standing' | 'Academic Warning' | 'Probation';
  advisor: string;
}

export interface Course {
  code: string;
  title: string;
  creditHours: number;
  instructor: string;
  instructorEmail: string;
  semester: number;
  department: string;
  schedule: string;
  classroom: string;
  attendancePercent: number;
  attendanceAttended: number;
  attendanceTotal: number;
  currentGrade: string;
  marksScore: number;
  color: string;
  syllabus: string;
  materialsCount: number;
  assignmentsCount: number;
}

export interface Assignment {
  id: string;
  courseCode: string;
  courseName: string;
  title: string;
  description: string;
  dueDate: string;
  totalMarks: number;
  obtainedMarks?: number;
  status: 'Pending' | 'Submitted' | 'Graded' | 'Late';
  submissionDate?: string;
  fileAttachment?: string;
  feedback?: string;
}

export interface AttendanceRecord {
  date: string;
  courseCode: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
  topic: string;
  markedBy: string;
  timestamp: string;
}

export interface ExamScheduleItem {
  id: string;
  courseCode: string;
  courseName: string;
  date: string;
  time: string;
  venue: string;
  seatNumber: string;
  eligibilityStatus: 'Eligible' | 'Attendance Shortage (<75%)' | 'Fee Pending';
  invigilator: string;
}

export interface ResultItem {
  semesterNumber: number;
  academicSession: string;
  gpa: number;
  courses: {
    code: string;
    title: string;
    credits: number;
    marksObtained: number;
    gradePoint: number;
    letterGrade: string;
    remarks: string;
  }[];
}

export interface ChallanRecord {
  challanNumber: string;
  title: string;
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Unpaid' | 'Under Verification';
  bankName: string;
  transactionReference?: string;
  paymentDate?: string;
  receiptNumber?: string;
  semester: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: 'Academic' | 'Examination' | 'Fees' | 'Attendance' | 'System' | 'Announcement';
  timestamp: string;
  read: boolean;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  actionUrl?: string;
}

export interface AuditLogItem {
  id: string;
  who: string;
  role: string;
  what: string;
  category: string;
  when: string;
  whereIp: string;
  objectTarget: string;
  beforeState: string;
  afterState: string;
  reason: string;
  referenceId: string;
}

export interface SystemHealthMetric {
  service: string;
  status: 'Operational' | 'Degraded' | 'Maintenance';
  latencyMs: number;
  uptimePercent: number;
  lastIncident: string;
}
