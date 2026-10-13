import { 
  StudentProfile, 
  Course, 
  Assignment, 
  AttendanceRecord, 
  ExamScheduleItem, 
  ResultItem, 
  ChallanRecord, 
  NotificationItem, 
  AuditLogItem, 
  SystemHealthMetric,
  UniversityFaculty,
  UniversityDepartment,
  UniversityTeacher
} from '../types';
import studentPortraitImg from '../assets/images/student_id_portrait_academic_1791409786948.jpg';

export const CURRENT_STUDENT: StudentProfile = {
  id: 'std_2k23_swe_104',
  rollNumber: '2K23/SWE/104',
  name: 'Ali Hassan Chand',
  fatherName: 'Hassan Chand',
  department: 'Department of Software Engineering',
  batch: '2K23 Batch (Undergraduate)',
  program: 'BS Software Engineering (4-Year)',
  semester: 7,
  email: 'ali.hassan23@usindh.edu.pk',
  phone: '+92 300 9284102',
  cnicMasked: '41302-******4-2',
  avatarUrl: studentPortraitImg,
  gpa: 3.62,
  cgpa: 3.54,
  completedCredits: 104,
  totalCredits: 136,
  academicStanding: 'Good Standing',
  advisor: 'Prof. Dr. Rafique Ahmed Bhutto (Professor)'
};

export const ENROLLED_COURSES: Course[] = [
  {
    code: 'SWE-401',
    title: 'Software Architecture & Design',
    creditHours: 3,
    instructor: 'Prof. Dr. Rafique Ahmed Bhutto',
    instructorEmail: 'rafique.bhutto@usindh.edu.pk',
    semester: 7,
    department: 'Software Engineering',
    schedule: 'Mon, Wed 09:00 AM - 10:30 AM',
    classroom: 'Lab 03, Software Engineering Dept',
    attendancePercent: 91,
    attendanceAttended: 20,
    attendanceTotal: 22,
    currentGrade: 'A',
    marksScore: 88,
    color: 'emerald',
    syllabus: 'Architectural patterns, microservices, domain-driven design, clean architecture, and enterprise software systems modeling.',
    materialsCount: 8,
    assignmentsCount: 3
  },
  {
    code: 'SWE-403',
    title: 'Software Quality Assurance & Testing',
    creditHours: 3,
    instructor: 'Prof. Dr. Arifa Bhutto',
    instructorEmail: 'arifa.bhutto@usindh.edu.pk',
    semester: 7,
    department: 'Software Engineering',
    schedule: 'Tue, Thu 11:00 AM - 12:30 PM',
    classroom: 'Seminar Hall, First Floor',
    attendancePercent: 86,
    attendanceAttended: 19,
    attendanceTotal: 22,
    currentGrade: 'A-',
    marksScore: 84,
    color: 'blue',
    syllabus: 'Testing fundamentals, test-driven development, automated testing suites, code coverage metrics, WCAG accessibility testing, and security assurance.',
    materialsCount: 12,
    assignmentsCount: 4
  },
  {
    code: 'SWE-405',
    title: 'Cloud Computing & Distributed Systems',
    creditHours: 3,
    instructor: 'Engr. Aamir Mallah',
    instructorEmail: 'aamir.mallah@usindh.edu.pk',
    semester: 7,
    department: 'Software Engineering',
    schedule: 'Mon, Wed 11:00 AM - 12:30 PM',
    classroom: 'Network Research Lab',
    attendancePercent: 82,
    attendanceAttended: 18,
    attendanceTotal: 22,
    currentGrade: 'B+',
    marksScore: 78,
    color: 'indigo',
    syllabus: 'Virtualization, containerization with Docker & Kubernetes, distributed storage systems, serverless patterns, and cloud resilience.',
    materialsCount: 6,
    assignmentsCount: 2
  },
  {
    code: 'SWE-407',
    title: 'Mobile Application Development',
    creditHours: 3,
    instructor: 'Prof. Dr. Dil Nawaz Hakro',
    instructorEmail: 'dilnawaz.hakro@usindh.edu.pk',
    semester: 7,
    department: 'Software Engineering',
    schedule: 'Tue, Thu 09:00 AM - 10:30 AM',
    classroom: 'Mobile Computing Lab',
    attendancePercent: 95,
    attendanceAttended: 21,
    attendanceTotal: 22,
    currentGrade: 'A',
    marksScore: 92,
    color: 'amber',
    syllabus: 'Cross-platform reactive mobile architectures, native sensor integrations, offline-first syncing, and mobile performance optimization.',
    materialsCount: 10,
    assignmentsCount: 3
  },
  {
    code: 'SWE-499',
    title: 'Final Year Design Project I (FYDP-I)',
    creditHours: 3,
    instructor: 'Prof. Dr. Arifa Bhutto / Committee',
    instructorEmail: 'arifa.bhutto@usindh.edu.pk',
    semester: 7,
    department: 'Software Engineering',
    schedule: 'Friday 09:30 AM - 12:30 PM',
    classroom: 'Project Incubation Center',
    attendancePercent: 100,
    attendanceAttended: 8,
    attendanceTotal: 8,
    currentGrade: 'In Progress',
    marksScore: 85,
    color: 'rose',
    syllabus: 'Problem discovery, requirement specification, SRS documentation, preliminary architectural blueprint, and mid-defense demonstration.',
    materialsCount: 5,
    assignmentsCount: 2
  },
  {
    code: 'CS-411',
    title: 'Professional Ethics & Cyber Law',
    creditHours: 2,
    instructor: 'Dr. Tariq Nizamani',
    instructorEmail: 'tariq.nizamani@usindh.edu.pk',
    semester: 7,
    department: 'Computer Science',
    schedule: 'Wednesday 02:00 PM - 03:40 PM',
    classroom: 'Lecture Room 02',
    attendancePercent: 73, // Under 75% threshold to demonstrate academic warning!
    attendanceAttended: 16,
    attendanceTotal: 22,
    currentGrade: 'B',
    marksScore: 74,
    color: 'purple',
    syllabus: 'PECA (Pakistan Electronic Crimes Act 2016), IEEE/ACM code of ethics, IP rights, academic integrity, and digital copyright law.',
    materialsCount: 4,
    assignmentsCount: 1
  }
];

export const STUDENT_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg_swe401_02',
    courseCode: 'SWE-401',
    courseName: 'Software Architecture & Design',
    title: 'Enterprise Event-Driven Architecture Case Study',
    description: 'Design a high-availability event-driven architecture for a university fee reconciliation service using Kafka/RabbitMQ. Submit PDF report and diagrams.',
    dueDate: '2026-10-18',
    totalMarks: 25,
    status: 'Pending'
  },
  {
    id: 'asg_swe403_03',
    courseCode: 'SWE-403',
    courseName: 'Software Quality Assurance & Testing',
    title: 'Automated E2E Test Suite & WCAG 2.2 AA Audit Report',
    description: 'Develop Playwright test scenarios for an academic grading portal and perform automated accessibility audit according to WCAG 2.2 AA standards.',
    dueDate: '2026-10-14',
    totalMarks: 30,
    obtainedMarks: 28,
    status: 'Graded',
    submissionDate: '2026-10-12',
    feedback: 'Excellent test coverage and accessibility defect classification. Great attention to keyboard navigation.'
  },
  {
    id: 'asg_swe407_01',
    courseCode: 'SWE-407',
    courseName: 'Mobile Application Development',
    title: 'Offline-First Student Attendance Mobile App Prototype',
    description: 'Implement local SQLite persistence and background sync queue for an attendance marking app when campus Wi-Fi drops.',
    dueDate: '2026-10-22',
    totalMarks: 20,
    status: 'Submitted',
    submissionDate: '2026-10-09'
  },
  {
    id: 'asg_cs411_01',
    courseCode: 'CS-411',
    courseName: 'Professional Ethics & Cyber Law',
    title: 'Analysis of PECA 2016 Sections 10 & 16 regarding Student Data Privacy',
    description: 'Provide legal and technical analysis on handling of student CNIC data under Pakistani electronic privacy laws.',
    dueDate: '2026-10-11',
    totalMarks: 15,
    status: 'Pending'
  }
];

export const ATTENDANCE_HISTORY: AttendanceRecord[] = [
  { date: '2026-10-06', courseCode: 'SWE-401', status: 'Present', topic: 'Microservices Circuit Breaker & Retry Patterns', markedBy: 'Engr. Farhan Shaikh', timestamp: '09:05 AM' },
  { date: '2026-10-06', courseCode: 'SWE-405', status: 'Present', topic: 'Kubernetes Pod Scheduling & Replica Sets', markedBy: 'Engr. Kashif Laghari', timestamp: '11:10 AM' },
  { date: '2026-10-05', courseCode: 'SWE-403', status: 'Present', topic: 'Mutation Testing and Flaky Test Detection', markedBy: 'Prof. Dr. Arifa Bhutto', timestamp: '11:04 AM' },
  { date: '2026-10-05', courseCode: 'SWE-407', status: 'Present', topic: 'Mobile Deep Linking and Push Notification Services', markedBy: 'Engr. Aijaz Memon', timestamp: '09:12 AM' },
  { date: '2026-10-03', courseCode: 'CS-411', status: 'Absent', topic: 'Digital Evidence in Pakistani High Courts', markedBy: 'Dr. Tariq Nizamani', timestamp: '02:02 PM' },
  { date: '2026-10-02', courseCode: 'SWE-401', status: 'Present', topic: 'API Gateway Routing & Rate Limiting Algorithms', markedBy: 'Engr. Farhan Shaikh', timestamp: '09:02 AM' },
  { date: '2026-10-01', courseCode: 'SWE-403', status: 'Present', topic: 'Load Testing with Locust & k6 under Peak Spikes', markedBy: 'Prof. Dr. Arifa Bhutto', timestamp: '11:05 AM' },
  { date: '2026-09-30', courseCode: 'CS-411', status: 'Absent', topic: 'Academic Plagiarism Regulations (HEC Policy 2021)', markedBy: 'Dr. Tariq Nizamani', timestamp: '02:05 PM' }
];

export const EXAM_SCHEDULE: ExamScheduleItem[] = [
  {
    id: 'exam_swe401',
    courseCode: 'SWE-401',
    courseName: 'Software Architecture & Design',
    date: '2026-11-20',
    time: '09:30 AM - 12:30 PM',
    venue: 'Allama I.I. Kazi Examination Center (Hall B)',
    seatNumber: 'SWE-104-B12',
    eligibilityStatus: 'Eligible',
    invigilator: 'Engr. Farhan Shaikh / Dr. Tariq Nizamani'
  },
  {
    id: 'exam_swe403',
    courseCode: 'SWE-403',
    courseName: 'Software Quality Assurance & Testing',
    date: '2026-11-23',
    time: '09:30 AM - 12:30 PM',
    venue: 'Allama I.I. Kazi Examination Center (Hall B)',
    seatNumber: 'SWE-104-B12',
    eligibilityStatus: 'Eligible',
    invigilator: 'Prof. Dr. Arifa Bhutto / Staff'
  },
  {
    id: 'exam_swe405',
    courseCode: 'SWE-405',
    courseName: 'Cloud Computing & Distributed Systems',
    date: '2026-11-26',
    time: '09:30 AM - 12:30 PM',
    venue: 'Allama I.I. Kazi Examination Center (Hall A)',
    seatNumber: 'SWE-104-A08',
    eligibilityStatus: 'Eligible',
    invigilator: 'Engr. Kashif Laghari'
  },
  {
    id: 'exam_swe407',
    courseCode: 'SWE-407',
    courseName: 'Mobile Application Development',
    date: '2026-11-30',
    time: '09:30 AM - 12:30 PM',
    venue: 'Allama I.I. Kazi Examination Center (Hall B)',
    seatNumber: 'SWE-104-B12',
    eligibilityStatus: 'Eligible',
    invigilator: 'Engr. Aijaz Memon'
  },
  {
    id: 'exam_cs411',
    courseCode: 'CS-411',
    courseName: 'Professional Ethics & Cyber Law',
    date: '2026-12-03',
    time: '09:30 AM - 11:30 AM',
    venue: 'Department of Software Engineering (Hall 1)',
    seatNumber: 'SWE-104-H03',
    eligibilityStatus: 'Attendance Shortage (<75%)', // Alert condition!
    invigilator: 'Dr. Tariq Nizamani'
  }
];

export const HISTORICAL_TRANSCRIPT: ResultItem[] = [
  {
    semesterNumber: 1,
    academicSession: 'Spring 2023',
    gpa: 3.45,
    courses: [
      { code: 'ENG-101', title: 'Functional English', credits: 3, marksObtained: 80, gradePoint: 3.5, letterGrade: 'B+', remarks: 'Clear' },
      { code: 'MTH-102', title: 'Calculus & Analytical Geometry', credits: 3, marksObtained: 85, gradePoint: 4.0, letterGrade: 'A', remarks: 'Clear' },
      { code: 'PHY-103', title: 'Applied Physics', credits: 3, marksObtained: 76, gradePoint: 3.0, letterGrade: 'B', remarks: 'Clear' },
      { code: 'CS-105', title: 'Introduction to Computing & ICT', credits: 3, marksObtained: 82, gradePoint: 3.5, letterGrade: 'B+', remarks: 'Clear' },
      { code: 'PST-107', title: 'Pakistan Studies & Islamic Ethics', credits: 2, marksObtained: 78, gradePoint: 3.0, letterGrade: 'B', remarks: 'Clear' }
    ]
  },
  {
    semesterNumber: 2,
    academicSession: 'Fall 2023',
    gpa: 3.52,
    courses: [
      { code: 'SWE-102', title: 'Programming Fundamentals (C++)', credits: 4, marksObtained: 86, gradePoint: 4.0, letterGrade: 'A', remarks: 'Clear' },
      { code: 'MTH-104', title: 'Linear Algebra & Differential Equations', credits: 3, marksObtained: 79, gradePoint: 3.0, letterGrade: 'B', remarks: 'Clear' },
      { code: 'ENG-103', title: 'Communication & Presentation Skills', credits: 3, marksObtained: 84, gradePoint: 3.5, letterGrade: 'B+', remarks: 'Clear' },
      { code: 'SWE-106', title: 'Discrete Mathematical Structures', credits: 3, marksObtained: 88, gradePoint: 4.0, letterGrade: 'A', remarks: 'Clear' },
      { code: 'ISL-108', title: 'Islamic Studies / Ethical Behavior', credits: 2, marksObtained: 80, gradePoint: 3.5, letterGrade: 'B+', remarks: 'Clear' }
    ]
  },
  {
    semesterNumber: 3,
    academicSession: 'Spring 2024',
    gpa: 3.60,
    courses: [
      { code: 'SWE-201', title: 'Object Oriented Programming (Java)', credits: 4, marksObtained: 88, gradePoint: 4.0, letterGrade: 'A', remarks: 'Clear' },
      { code: 'SWE-203', title: 'Data Structures & Algorithms', credits: 4, marksObtained: 84, gradePoint: 3.5, letterGrade: 'B+', remarks: 'Clear' },
      { code: 'SWE-205', title: 'Software Engineering Concepts', credits: 3, marksObtained: 89, gradePoint: 4.0, letterGrade: 'A', remarks: 'Clear' },
      { code: 'MTH-207', title: 'Probability & Statistics for Engineers', credits: 3, marksObtained: 81, gradePoint: 3.5, letterGrade: 'B+', remarks: 'Clear' }
    ]
  },
  {
    semesterNumber: 4,
    academicSession: 'Fall 2024',
    gpa: 3.48,
    courses: [
      { code: 'SWE-202', title: 'Database Systems & SQL Design', credits: 4, marksObtained: 83, gradePoint: 3.5, letterGrade: 'B+', remarks: 'Clear' },
      { code: 'SWE-204', title: 'Operating Systems Principles', credits: 4, marksObtained: 79, gradePoint: 3.0, letterGrade: 'B', remarks: 'Clear' },
      { code: 'SWE-206', title: 'Software Requirements Engineering', credits: 3, marksObtained: 87, gradePoint: 4.0, letterGrade: 'A', remarks: 'Clear' },
      { code: 'CS-208', title: 'Computer Communication & Networks', credits: 3, marksObtained: 82, gradePoint: 3.5, letterGrade: 'B+', remarks: 'Clear' }
    ]
  },
  {
    semesterNumber: 5,
    academicSession: 'Spring 2025',
    gpa: 3.58,
    courses: [
      { code: 'SWE-301', title: 'Web Engineering & Full-Stack Systems', credits: 4, marksObtained: 90, gradePoint: 4.0, letterGrade: 'A', remarks: 'Clear' },
      { code: 'SWE-303', title: 'Human Computer Interaction (HCI)', credits: 3, marksObtained: 85, gradePoint: 4.0, letterGrade: 'A', remarks: 'Clear' },
      { code: 'SWE-305', title: 'Formal Methods in Software Eng', credits: 3, marksObtained: 76, gradePoint: 3.0, letterGrade: 'B', remarks: 'Clear' },
      { code: 'MGT-307', title: 'Engineering Economics & Project Management', credits: 3, marksObtained: 83, gradePoint: 3.5, letterGrade: 'B+', remarks: 'Clear' }
    ]
  },
  {
    semesterNumber: 6,
    academicSession: 'Fall 2025',
    gpa: 3.65,
    courses: [
      { code: 'SWE-302', title: 'Software Construction & Development', credits: 3, marksObtained: 89, gradePoint: 4.0, letterGrade: 'A', remarks: 'Clear' },
      { code: 'SWE-304', title: 'Software Project Management (Agile)', credits: 3, marksObtained: 91, gradePoint: 4.0, letterGrade: 'A', remarks: 'Clear' },
      { code: 'SWE-306', title: 'Information Security & Cryptography', credits: 3, marksObtained: 82, gradePoint: 3.5, letterGrade: 'B+', remarks: 'Clear' },
      { code: 'CS-308', title: 'Artificial Intelligence & Machine Learning', credits: 3, marksObtained: 86, gradePoint: 4.0, letterGrade: 'A', remarks: 'Clear' },
      { code: 'ENG-310', title: 'Technical & Business Report Writing', credits: 3, marksObtained: 85, gradePoint: 4.0, letterGrade: 'A', remarks: 'Clear' }
    ]
  }
];

export interface CompletedCourseRecord {
  code: string;
  title: string;
  creditHours: number;
  letterGrade: string;
  gradePoint: number;
  marksScore: number;
  semester: number;
  academicSession: string;
  department: string;
  instructor: string;
  syllabusOverview: string;
  remarks: string;
}

export const COMPLETED_COURSES: CompletedCourseRecord[] = [
  // Semester 1
  { code: 'ENG-101', title: 'Functional English', creditHours: 3, marksScore: 80, gradePoint: 3.5, letterGrade: 'B+', semester: 1, academicSession: 'Spring 2023', department: 'Institute of English Language', instructor: 'Prof. Ghulam Ali', syllabusOverview: 'Grammar mechanics, technical reading comprehension, and academic expository writing.', remarks: 'Clear' },
  { code: 'MTH-102', title: 'Calculus & Analytical Geometry', creditHours: 3, marksScore: 85, gradePoint: 4.0, letterGrade: 'A', semester: 1, academicSession: 'Spring 2023', department: 'Department of Mathematics', instructor: 'Dr. Abdul Sattar', syllabusOverview: 'Functions, limits, differentiation, Riemann integrals, and analytic plane curves.', remarks: 'Clear' },
  { code: 'PHY-103', title: 'Applied Physics', creditHours: 3, marksScore: 76, gradePoint: 3.0, letterGrade: 'B', semester: 1, academicSession: 'Spring 2023', department: 'Department of Physics', instructor: 'Dr. Imran Khan', syllabusOverview: 'Classical mechanics, electromagnetism, semiconductor physics, and circuit laws.', remarks: 'Clear' },
  { code: 'CS-105', title: 'Introduction to Computing & ICT', creditHours: 3, marksScore: 82, gradePoint: 3.5, letterGrade: 'B+', semester: 1, academicSession: 'Spring 2023', department: 'Software Engineering', instructor: 'Engr. Zeeshan Ali', syllabusOverview: 'Binary logic, computer architecture, memory hierarchies, and computing basics.', remarks: 'Clear' },
  { code: 'PST-107', title: 'Pakistan Studies & Islamic Ethics', creditHours: 2, marksScore: 78, gradePoint: 3.0, letterGrade: 'B', semester: 1, academicSession: 'Spring 2023', department: 'Faculty of Social Sciences', instructor: 'Prof. Nisar Ahmed', syllabusOverview: 'Ideological origins, constitutional evolution, and ethical governance.', remarks: 'Clear' },

  // Semester 2
  { code: 'SWE-102', title: 'Programming Fundamentals (C++)', creditHours: 4, marksScore: 86, gradePoint: 4.0, letterGrade: 'A', semester: 2, academicSession: 'Fall 2023', department: 'Software Engineering', instructor: 'Prof. Dr. Arifa Bhutto', syllabusOverview: 'Algorithmic thinking, control structures, pointers, memory allocation, and modular design in modern C++.', remarks: 'Clear' },
  { code: 'MTH-104', title: 'Linear Algebra & Differential Equations', creditHours: 3, marksScore: 79, gradePoint: 3.0, letterGrade: 'B', semester: 2, academicSession: 'Fall 2023', department: 'Department of Mathematics', instructor: 'Dr. Tariq Nizamani', syllabusOverview: 'Matrices, Gaussian elimination, eigenvalues, eigenvectors, and ODE modeling.', remarks: 'Clear' },
  { code: 'ENG-103', title: 'Communication & Presentation Skills', creditHours: 3, marksScore: 84, gradePoint: 3.5, letterGrade: 'B+', semester: 2, academicSession: 'Fall 2023', department: 'Institute of English Language', instructor: 'Ms. Sadia Memon', syllabusOverview: 'Interpersonal workplace communication, persuasive rhetoric, and technical presentations.', remarks: 'Clear' },
  { code: 'SWE-106', title: 'Discrete Mathematical Structures', creditHours: 3, marksScore: 88, gradePoint: 4.0, letterGrade: 'A', semester: 2, academicSession: 'Fall 2023', department: 'Software Engineering', instructor: 'Prof. Dr. Dil Nawaz Hakro', syllabusOverview: 'Propositional calculus, set theory, combinatorics, recurrence relations, and graph theory.', remarks: 'Clear' },
  { code: 'ISL-108', title: 'Islamic Studies / Ethical Behavior', creditHours: 2, marksScore: 80, gradePoint: 3.5, letterGrade: 'B+', semester: 2, academicSession: 'Fall 2023', department: 'Faculty of Social Sciences', instructor: 'Dr. Qasim Soomro', syllabusOverview: 'Quranic epistemology, prophetic workplace ethics, and universal human rights.', remarks: 'Clear' },

  // Semester 3
  { code: 'SWE-201', title: 'Object Oriented Programming (Java)', creditHours: 4, marksScore: 88, gradePoint: 4.0, letterGrade: 'A', semester: 3, academicSession: 'Spring 2024', department: 'Software Engineering', instructor: 'Engr. Aamir Mallah', syllabusOverview: 'Encapsulation, inheritance, polymorphism, abstract classes, Java collections, and exception handling.', remarks: 'Clear' },
  { code: 'SWE-203', title: 'Data Structures & Algorithms', creditHours: 4, marksScore: 84, gradePoint: 3.5, letterGrade: 'B+', semester: 3, academicSession: 'Spring 2024', department: 'Software Engineering', instructor: 'Prof. Dr. Rafique Ahmed Bhutto', syllabusOverview: 'Stacks, queues, linked lists, self-balancing trees, heap sort, hash tables, and Big-O complexity analysis.', remarks: 'Clear' },
  { code: 'SWE-205', title: 'Software Engineering Concepts', creditHours: 3, marksScore: 89, gradePoint: 4.0, letterGrade: 'A', semester: 3, academicSession: 'Spring 2024', department: 'Software Engineering', instructor: 'Prof. Dr. Arifa Bhutto', syllabusOverview: 'SDLC models, Agile Scrum ceremonies, Unified Process, architectural patterns, and quality metrics.', remarks: 'Clear' },
  { code: 'MTH-207', title: 'Probability & Statistics for Engineers', creditHours: 3, marksScore: 81, gradePoint: 3.5, letterGrade: 'B+', semester: 3, academicSession: 'Spring 2024', department: 'Department of Mathematics', instructor: 'Dr. Shahida Soomro', syllabusOverview: 'Random variables, Bayes theorem, normal distributions, hypothesis testing, and regression analysis.', remarks: 'Clear' },

  // Semester 4
  { code: 'SWE-202', title: 'Database Systems & SQL Design', creditHours: 4, marksScore: 83, gradePoint: 3.5, letterGrade: 'B+', semester: 4, academicSession: 'Fall 2024', department: 'Software Engineering', instructor: 'Engr. Zeeshan Ali', syllabusOverview: 'Relational data model, ACID properties, ER diagrams, 3NF normalization, and complex PostgreSQL indexing.', remarks: 'Clear' },
  { code: 'SWE-204', title: 'Operating Systems Principles', creditHours: 4, marksScore: 79, gradePoint: 3.0, letterGrade: 'B', semester: 4, academicSession: 'Fall 2024', department: 'Software Engineering', instructor: 'Dr. Tariq Nizamani', syllabusOverview: 'Processes, concurrency, semaphores, deadlock avoidance, virtual memory paging, and Linux syscalls.', remarks: 'Clear' },
  { code: 'SWE-206', title: 'Software Requirements Engineering', creditHours: 3, marksScore: 87, gradePoint: 4.0, letterGrade: 'A', semester: 4, academicSession: 'Fall 2024', department: 'Software Engineering', instructor: 'Prof. Dr. Rafique Ahmed Bhutto', syllabusOverview: 'Stakeholder interviews, IEEE 830 SRS authoring, user stories, boundary analysis, and requirements traceability.', remarks: 'Clear' },
  { code: 'CS-208', title: 'Computer Communication & Networks', creditHours: 3, marksScore: 82, gradePoint: 3.5, letterGrade: 'B+', semester: 4, academicSession: 'Fall 2024', department: 'Computer Science', instructor: 'Dr. Kamran Dahri', syllabusOverview: 'OSI 7-layer stack, TCP/IP congestion control, subnetting, CIDR, DNS, and socket programming.', remarks: 'Clear' },

  // Semester 5
  { code: 'SWE-301', title: 'Web Engineering & Full-Stack Systems', creditHours: 4, marksScore: 90, gradePoint: 4.0, letterGrade: 'A', semester: 5, academicSession: 'Spring 2025', department: 'Software Engineering', instructor: 'Engr. Aamir Mallah', syllabusOverview: 'TypeScript, React SPA architecture, REST APIs, GraphQL, stateless JWT auth, and micro-frontend design.', remarks: 'Clear' },
  { code: 'SWE-303', title: 'Human Computer Interaction (HCI)', creditHours: 3, marksScore: 85, gradePoint: 4.0, letterGrade: 'A', semester: 5, academicSession: 'Spring 2025', department: 'Software Engineering', instructor: 'Prof. Dr. Dil Nawaz Hakro', syllabusOverview: 'Nielsen heuristics, wireframing, cognitive load theory, WCAG 2.2 accessibility, and usability lab testing.', remarks: 'Clear' },
  { code: 'SWE-305', title: 'Formal Methods in Software Eng', creditHours: 3, marksScore: 76, gradePoint: 3.0, letterGrade: 'B', semester: 5, academicSession: 'Spring 2025', department: 'Software Engineering', instructor: 'Prof. Dr. Arifa Bhutto', syllabusOverview: 'First-order predicate logic, Z notation, formal invariant specifications, and Hoare logic correctness proofs.', remarks: 'Clear' },
  { code: 'MGT-307', title: 'Engineering Economics & Project Management', creditHours: 3, marksScore: 83, gradePoint: 3.5, letterGrade: 'B+', semester: 5, academicSession: 'Spring 2025', department: 'Institute of Commerce', instructor: 'Prof. Aslam Brohi', syllabusOverview: 'Cost-benefit analysis, depreciation methods, NPV/IRR calculations, and enterprise risk register matrices.', remarks: 'Clear' },

  // Semester 6
  { code: 'SWE-302', title: 'Software Construction & Development', creditHours: 3, marksScore: 89, gradePoint: 4.0, letterGrade: 'A', semester: 6, academicSession: 'Fall 2025', department: 'Software Engineering', instructor: 'Prof. Dr. Rafique Ahmed Bhutto', syllabusOverview: 'Clean code principles, refactoring techniques, defensive programming, automated linters, and CI/CD pipelines.', remarks: 'Clear' },
  { code: 'SWE-304', title: 'Software Project Management (Agile)', creditHours: 3, marksScore: 91, gradePoint: 4.0, letterGrade: 'A', semester: 6, academicSession: 'Fall 2025', department: 'Software Engineering', instructor: 'Engr. Aamir Mallah', syllabusOverview: 'Scrum sprint cadence, story point poker estimation, burn-down velocity charts, and Jira backlog grooming.', remarks: 'Clear' },
  { code: 'SWE-306', title: 'Information Security & Cryptography', creditHours: 3, marksScore: 82, gradePoint: 3.5, letterGrade: 'B+', semester: 6, academicSession: 'Fall 2025', department: 'Software Engineering', instructor: 'Dr. Tariq Nizamani', syllabusOverview: 'Symmetric & asymmetric encryption (AES, RSA), hashing (SHA-256), PKI certificates, OWASP Top 10 mitigation.', remarks: 'Clear' },
  { code: 'CS-308', title: 'Artificial Intelligence & Machine Learning', creditHours: 3, marksScore: 86, gradePoint: 4.0, letterGrade: 'A', semester: 6, academicSession: 'Fall 2025', department: 'Computer Science', instructor: 'Dr. Kamran Dahri', syllabusOverview: 'A* search, decision trees, logistic regression, gradient descent, neural networks, and model evaluation metrics.', remarks: 'Clear' },
  { code: 'ENG-310', title: 'Technical & Business Report Writing', creditHours: 3, marksScore: 85, gradePoint: 4.0, letterGrade: 'A', semester: 6, academicSession: 'Fall 2025', department: 'Institute of English Language', instructor: 'Ms. Sadia Memon', syllabusOverview: 'Formal engineering feasibility reports, RFP responses, executive summaries, and academic whitepapers.', remarks: 'Clear' }
];

export interface FailedCourseRecord {
  code: string;
  title: string;
  creditHours: number;
  letterGrade: string;
  gradePoint: number;
  marksScore: number;
  passingMarks: number;
  semesterAttempted: number;
  academicSession: string;
  department: string;
  instructor: string;
  failureReason: string;
  repeatPolicy: string;
  eligibleSession: string;
  prerequisiteFor: string;
  status: 'Pending Re-sit' | 'Repeat Registration Open' | 'Medical Appeal Approved';
}

export const FAILED_COURSES: FailedCourseRecord[] = [
  {
    code: 'MTH-202',
    title: 'Multivariable Calculus & Vector Analysis',
    creditHours: 3,
    letterGrade: 'F',
    gradePoint: 0.00,
    marksScore: 42,
    passingMarks: 50,
    semesterAttempted: 3,
    academicSession: 'Spring 2024',
    department: 'Department of Mathematics',
    instructor: 'Dr. Ghulam Murtaza',
    failureReason: 'Missed final semester examination due to documented emergency hospitalization.',
    repeatPolicy: 'HEC Regulation Clause 14.2: Full grade replacement permitted. Grade F will be superseded upon passing re-sit.',
    eligibleSession: 'Fall 2026 Supplementary / Re-Sit Window',
    prerequisiteFor: 'Advanced Numerical Computing',
    status: 'Repeat Registration Open'
  },
  {
    code: 'EE-104',
    title: 'Basic Electrical Circuit Theory & Electronics',
    creditHours: 3,
    letterGrade: 'F',
    gradePoint: 0.00,
    marksScore: 38,
    passingMarks: 50,
    semesterAttempted: 2,
    academicSession: 'Fall 2023',
    department: 'Department of Electrical Engineering',
    instructor: 'Engr. Zulfiqar Memon',
    failureReason: 'Theory component aggregate fell below the 50% passing threshold.',
    repeatPolicy: 'Engineering Elective Backlog: Maximum 2 repeat attempts permitted before final degree clearance.',
    eligibleSession: '8th Semester (Spring 2027) / Summer 2027 Term',
    prerequisiteFor: 'Microprocessor Interfacing & Embedded Systems',
    status: 'Pending Re-sit'
  }
];

export const FEE_CHALLANS: ChallanRecord[] = [
  {
    challanNumber: 'UOS-2026-FEE-84920',
    title: 'Semester 7 Tuition & Laboratory Fee',
    dueDate: '2026-10-25',
    amount: 32500,
    status: 'Paid',
    bankName: 'Habib Bank Limited (HBL) - Sindh University Campus',
    transactionReference: '1LINK-HBL-94810293',
    paymentDate: '2026-09-15',
    receiptNumber: 'REC-UOS-74910',
    semester: 'Semester 7 (Fall 2026)'
  },
  {
    challanNumber: 'UOS-2026-EXAM-91044',
    title: 'Semester 7 Final Examination & Transcript Fee',
    dueDate: '2026-10-30',
    amount: 4500,
    status: 'Unpaid',
    bankName: 'Habib Bank Limited (HBL) / Sindh Bank / 1Link Portal',
    semester: 'Semester 7 (Fall 2026)'
  },
  {
    challanNumber: 'UOS-2026-LIB-11204',
    title: 'Central Library Allama I.I. Kazi Book Clearance & RFID Token',
    dueDate: '2026-11-10',
    amount: 800,
    status: 'Under Verification',
    bankName: 'Sindh Bank Online Web Portal',
    transactionReference: 'SBL-EP-4910284',
    paymentDate: '2026-10-06',
    semester: 'Semester 7 (Fall 2026)'
  }
];

export const SYSTEM_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_001',
    title: 'Examination Admit Card Registration Live for 2K23 Batch',
    message: 'Examination registration for Fall 2026 semester is now open. Please ensure all outstanding challans are cleared before downloading your digital admit card.',
    category: 'Examination',
    timestamp: 'Today at 09:15 AM',
    read: false,
    priority: 'urgent',
    actionUrl: '/student/exams'
  },
  {
    id: 'notif_002',
    title: 'Attendance Shortage Alert in CS-411 (73%)',
    message: 'Your recorded attendance in Professional Ethics & Cyber Law has dipped to 73% (below HEC mandatory 75% threshold). Please submit an absence excuse appeal to Dr. Tariq Nizamani.',
    category: 'Attendance',
    timestamp: 'Yesterday at 04:30 PM',
    read: false,
    priority: 'high',
    actionUrl: '/student/attendance'
  },
  {
    id: 'notif_003',
    title: 'SWE-401 Lecture Notes & Microservices Slides Uploaded',
    message: 'Engr. Farhan Shaikh uploaded Lecture 14: Event Sourcing & CQRS architectures to the course repository.',
    category: 'Academic',
    timestamp: '2 days ago',
    read: true,
    priority: 'normal'
  },
  {
    id: 'notif_004',
    title: '1Link Bank Reconciliation Engine Active',
    message: 'Fee challans paid through HBL, Sindh Bank, EasyPaisa or JazzCash now verify automatically within 60 seconds.',
    category: 'Fees',
    timestamp: '3 days ago',
    read: true,
    priority: 'normal'
  },
  {
    id: 'notif_005',
    title: 'National Software Engineering Exhibition 2026',
    message: 'Department of Software Engineering, University of Sindh announces Annual Tech Showcase under Chairperson Prof. Dr. Arifa Bhutto. Project registrations open.',
    category: 'Announcement',
    timestamp: '4 days ago',
    read: true,
    priority: 'normal'
  }
];

export const AUDIT_LOGS_STREAM: AuditLogItem[] = [
  {
    id: 'log_9042',
    who: 'Engr. Farhan Shaikh (Asst. Prof)',
    role: 'Faculty',
    what: 'Attendance Roster Submitted',
    category: 'Attendance',
    when: '2026-10-07 10:35:12 PKT',
    whereIp: '10.14.2.18 (Campus Wi-Fi / SWE Dept)',
    objectTarget: 'Course: SWE-401, Section 7A, Lecture #22',
    beforeState: 'Unsubmitted (22 students pending)',
    afterState: 'Submitted (20 Present, 2 Absent)',
    reason: 'Regular Lecture Attendance Marking',
    referenceId: 'ATT-SWE401-20261007'
  },
  {
    id: 'log_9041',
    who: '1Link Bank Gateway Webhook',
    role: 'Automated Service',
    what: 'Fee Challan Auto-Reconciled',
    category: 'Finance',
    when: '2026-10-07 08:14:02 PKT',
    whereIp: '175.107.19.44 (HBL Core API)',
    objectTarget: 'Challan: UOS-2026-FEE-84920 (Ali Hassan Chand)',
    beforeState: 'Status: Unpaid, Verified: False',
    afterState: 'Status: Paid, Verified: True, Amount: PKR 32,500',
    reason: 'Automated 1Link Webhook Settlement',
    referenceId: 'TXN-1LINK-8849102'
  },
  {
    id: 'log_9040',
    who: 'Prof. Dr. Arifa Bhutto (Chairperson)',
    role: 'HOD',
    what: 'Midterm Grade Moderation Approved',
    category: 'Examination',
    when: '2026-10-06 16:45:30 PKT',
    whereIp: '10.14.0.5 (Chairperson Office Terminal)',
    objectTarget: 'Course: SWE-403 (SQA), Batch 2K23',
    beforeState: 'Status: Draft submitted by instructor',
    afterState: 'Status: HOD Endorsed, Forwarded to Controller',
    reason: 'Academic Quality Assurance Committee Endorsement',
    referenceId: 'EXM-MOD-SWE403-2K23'
  },
  {
    id: 'log_9039',
    who: 'Engr. Kashif Laghari (Lead ITSC)',
    role: 'Admin / ITSC',
    what: 'Security Policy Hardened',
    category: 'System Security',
    when: '2026-10-06 14:12:08 PKT',
    whereIp: '10.12.0.1 (ITSC Core Gateway)',
    objectTarget: 'WAF Rule: Strict Transport Security & Rate-Limiter',
    beforeState: 'Max 100 req/min per IP',
    afterState: 'Max 60 req/min per IP with automated captcha for /login',
    reason: 'Pre-result publication DDoS mitigation hardening',
    referenceId: 'SEC-WAF-2026-09'
  },
  {
    id: 'log_9038',
    who: 'Controller of Examinations Office',
    role: 'Examination Authority',
    what: 'Grade Correction Approved',
    category: 'Examination',
    when: '2026-10-05 11:20:19 PKT',
    whereIp: '10.10.1.4 (Exam Controller Terminal)',
    objectTarget: 'Student: 2K22/SWE/88, Course: SWE-302',
    beforeState: 'Grade: B (78 Marks)',
    afterState: 'Grade: A- (82 Marks)',
    reason: 'Authorized Rechecking Committee Notification #UOS/EXM/2026/894',
    referenceId: 'REC-EXM-CORR-884'
  }
];

export const SYSTEM_HEALTH_METRICS: SystemHealthMetric[] = [
  { service: 'Authentication & SSO (Keycloak OIDC)', status: 'Operational', latencyMs: 42, uptimePercent: 99.98, lastIncident: 'None in past 30 days' },
  { service: 'Core LMS & Courseware Engine', status: 'Operational', latencyMs: 65, uptimePercent: 99.95, lastIncident: 'Routine maintenance Sep 18' },
  { service: 'Examination & CGPA Engine', status: 'Operational', latencyMs: 58, uptimePercent: 100.0, lastIncident: 'None in past 90 days' },
  { service: 'Digital Attendance Service', status: 'Operational', latencyMs: 38, uptimePercent: 99.97, lastIncident: 'None in past 60 days' },
  { service: '1Link / HBL Banking Reconciliation API', status: 'Operational', latencyMs: 145, uptimePercent: 99.89, lastIncident: 'Bank gateway lag Oct 01 (12 mins)' },
  { service: 'PostgreSQL Relational Primary Cluster', status: 'Operational', latencyMs: 18, uptimePercent: 100.0, lastIncident: 'Zero unplanned downtime' },
  { service: 'Redis Result Cache & Session Store', status: 'Operational', latencyMs: 4, uptimePercent: 100.0, lastIncident: 'Zero unplanned downtime' },
  { service: 'Automated Disaster Recovery & WAL Sync', status: 'Operational', latencyMs: 82, uptimePercent: 100.0, lastIncident: 'Daily verified recovery dry-run passed' }
];

export const UNIVERSITY_FACULTIES: UniversityFaculty[] = [
  {
    id: 'fac_eng',
    name: 'Faculty of Engineering & Technology',
    deanName: 'Prof. Dr. Khalil-ur-Rehman Khoumbati',
    deanEmail: 'dean.eng@usindh.edu.pk',
    departmentsCount: 5,
    studentsCount: 3820,
    teachersCount: 142,
    attendanceAvg: 87.2,
    passingRate: 91.8,
    accreditationStatus: 'NCEAC W4 Level Certified'
  },
  {
    id: 'fac_nat_sci',
    name: 'Faculty of Natural Sciences',
    deanName: 'Prof. Dr. Wazir Ali Baloch',
    deanEmail: 'dean.natsci@usindh.edu.pk',
    departmentsCount: 9,
    studentsCount: 7450,
    teachersCount: 230,
    attendanceAvg: 85.6,
    passingRate: 88.4,
    accreditationStatus: 'HEC Highest Category Accredited'
  },
  {
    id: 'fac_cba',
    name: 'Faculty of Commerce & Business Administration',
    deanName: 'Prof. Dr. Javed Ahmed Chandio',
    deanEmail: 'dean.cba@usindh.edu.pk',
    departmentsCount: 4,
    studentsCount: 5200,
    teachersCount: 110,
    attendanceAvg: 89.1,
    passingRate: 93.2,
    accreditationStatus: 'NBEAC Chartered & Recognized'
  },
  {
    id: 'fac_arts',
    name: 'Faculty of Arts & Humanities',
    deanName: 'Prof. Dr. Tariq Umrani',
    deanEmail: 'dean.arts@usindh.edu.pk',
    departmentsCount: 7,
    studentsCount: 4600,
    teachersCount: 125,
    attendanceAvg: 83.9,
    passingRate: 89.5,
    accreditationStatus: 'HEC Tier 1 Accredited'
  },
  {
    id: 'fac_soc_sci',
    name: 'Faculty of Social Sciences',
    deanName: 'Prof. Dr. Hamadullah Kakepoto',
    deanEmail: 'dean.socsci@usindh.edu.pk',
    departmentsCount: 8,
    studentsCount: 6100,
    teachersCount: 160,
    attendanceAvg: 84.8,
    passingRate: 87.6,
    accreditationStatus: 'HEC Tier 1 Accredited'
  },
  {
    id: 'fac_pharm',
    name: 'Faculty of Pharmacy',
    deanName: 'Prof. Dr. Abdullah Dayo',
    deanEmail: 'dean.pharm@usindh.edu.pk',
    departmentsCount: 3,
    studentsCount: 2200,
    teachersCount: 85,
    attendanceAvg: 92.4,
    passingRate: 95.1,
    accreditationStatus: 'Pharmacy Council of Pakistan Recognized'
  }
];

export const UNIVERSITY_DEPARTMENTS: UniversityDepartment[] = [
  {
    id: 'dept_swe',
    name: 'Department of Software Engineering',
    code: 'SWE',
    facultyId: 'fac_eng',
    facultyName: 'Faculty of Engineering & Technology',
    chairmanName: 'Prof. Dr. Arifa Bhutto',
    chairmanEmail: 'arifa.bhutto@usindh.edu.pk',
    programs: ['BS Software Engineering', 'MS Software Engineering', 'PhD SE'],
    studentsCount: 840,
    teachersCount: 28,
    attendanceRate: 88.5,
    coursesOfferedCount: 36
  },
  {
    id: 'dept_cs',
    name: 'Department of Computer Science',
    code: 'CS',
    facultyId: 'fac_nat_sci',
    facultyName: 'Faculty of Natural Sciences',
    chairmanName: 'Dr. Zeeshan Bhatti',
    chairmanEmail: 'zeeshan.bhatti@usindh.edu.pk',
    programs: ['BS Computer Science', 'MS Computer Science', 'PhD CS'],
    studentsCount: 1120,
    teachersCount: 34,
    attendanceRate: 86.2,
    coursesOfferedCount: 42
  },
  {
    id: 'dept_it',
    name: 'Department of Information Technology',
    code: 'IT',
    facultyId: 'fac_eng',
    facultyName: 'Faculty of Engineering & Technology',
    chairmanName: 'Prof. Dr. Waheed Umrani',
    chairmanEmail: 'waheed.umrani@usindh.edu.pk',
    programs: ['BS Information Technology', 'MS IT', 'PhD IT'],
    studentsCount: 760,
    teachersCount: 24,
    attendanceRate: 87.0,
    coursesOfferedCount: 32
  },
  {
    id: 'dept_ds',
    name: 'Department of Data Science',
    code: 'DS',
    facultyId: 'fac_eng',
    facultyName: 'Faculty of Engineering & Technology',
    chairmanName: 'Prof. Dr. Faheem Abbasi',
    chairmanEmail: 'faheem.abbasi@usindh.edu.pk',
    programs: ['BS Data Science', 'MS Data Science'],
    studentsCount: 540,
    teachersCount: 18,
    attendanceRate: 88.2,
    coursesOfferedCount: 28
  },
  {
    id: 'dept_tele',
    name: 'Department of Telecommunication',
    code: 'TELE',
    facultyId: 'fac_eng',
    facultyName: 'Faculty of Engineering & Technology',
    chairmanName: 'Prof. Dr. Dil Nawaz Hakro',
    chairmanEmail: 'dilnawaz.hakro@usindh.edu.pk',
    programs: ['BS Telecommunication', 'MS Telecom'],
    studentsCount: 650,
    teachersCount: 22,
    attendanceRate: 85.8,
    coursesOfferedCount: 28
  },
  {
    id: 'dept_iba',
    name: 'Institute of Business Administration (IBA)',
    code: 'BBA/MBA',
    facultyId: 'fac_cba',
    facultyName: 'Faculty of Commerce & Business Administration',
    chairmanName: 'Prof. Dr. Abdul Sattar Shah (Director)',
    chairmanEmail: 'director.iba@usindh.edu.pk',
    programs: ['BBA (4-Year)', 'MBA (2-Year)', 'MS Management Sciences'],
    studentsCount: 1450,
    teachersCount: 38,
    attendanceRate: 90.1,
    coursesOfferedCount: 48
  },
  {
    id: 'dept_eng',
    name: 'Department of English Linguistics & Literature',
    code: 'ENG',
    facultyId: 'fac_arts',
    facultyName: 'Faculty of Arts & Humanities',
    chairmanName: 'Dr. Farida Panhwar',
    chairmanEmail: 'farida.panhwar@usindh.edu.pk',
    programs: ['BS English (Linguistics)', 'BS English (Literature)', 'MPhil English'],
    studentsCount: 920,
    teachersCount: 26,
    attendanceRate: 84.6,
    coursesOfferedCount: 34
  },
  {
    id: 'dept_math',
    name: 'Department of Mathematics',
    code: 'MATH',
    facultyId: 'fac_nat_sci',
    facultyName: 'Faculty of Natural Sciences',
    chairmanName: 'Prof. Dr. Abdul Sattar Soomro',
    chairmanEmail: 'sattar.soomro@usindh.edu.pk',
    programs: ['BS Mathematics', 'MS Mathematics', 'PhD Mathematics'],
    studentsCount: 880,
    teachersCount: 27,
    attendanceRate: 87.4,
    coursesOfferedCount: 30
  },
  {
    id: 'dept_econ',
    name: 'Department of Economics',
    code: 'ECON',
    facultyId: 'fac_soc_sci',
    facultyName: 'Faculty of Social Sciences',
    chairmanName: 'Dr. Muhammad Rafiq',
    chairmanEmail: 'muhammad.rafiq@usindh.edu.pk',
    programs: ['BS Economics', 'MS Economics'],
    studentsCount: 710,
    teachersCount: 21,
    attendanceRate: 86.9,
    coursesOfferedCount: 26
  }
];

export const UNIVERSITY_TEACHERS: UniversityTeacher[] = [
  {
    id: 'tch_rafique',
    name: 'Prof. Dr. Rafique Ahmed Bhutto',
    designation: 'Professor',
    departmentId: 'dept_swe',
    departmentName: 'Department of Software Engineering',
    facultyName: 'Faculty of Engineering & Technology',
    email: 'rafique.bhutto@usindh.edu.pk',
    phone: '+92 300 3019842',
    activeCourses: ['SWE-401 (Architecture)', 'SWE-406 (Formal Methods)'],
    officeRoom: 'Faculty Block B, Room 204'
  },
  {
    id: 'tch_amir',
    name: 'Engr. Aamir Mallah',
    designation: 'Assistant Professor',
    departmentId: 'dept_swe',
    departmentName: 'Department of Software Engineering',
    facultyName: 'Faculty of Engineering & Technology',
    email: 'aamir.mallah@usindh.edu.pk',
    phone: '+92 300 3124567',
    activeCourses: ['SWE-405 (Cloud Systems)', 'SWE-201 (Data Structures)'],
    officeRoom: 'FET Lab Desk, Room 212'
  },
  {
    id: 'tch_dilnawaz',
    name: 'Prof. Dr. Dil Nawaz Hakro',
    designation: 'Professor & Meritorious Faculty',
    departmentId: 'dept_tele',
    departmentName: 'Department of Telecommunication',
    facultyName: 'Faculty of Engineering & Technology',
    email: 'dilnawaz.hakro@usindh.edu.pk',
    phone: '+92 301 9283741',
    activeCourses: ['SWE-407 (Mobile Systems)', 'TELE-401 (Wireless Networks)'],
    officeRoom: 'Telecommunication Block, Room 101'
  },
  {
    id: 'tch_arifa',
    name: 'Prof. Dr. Arifa Bhutto',
    designation: 'Professor & Chairperson',
    departmentId: 'dept_swe',
    departmentName: 'Department of Software Engineering',
    facultyName: 'Faculty of Engineering & Technology',
    email: 'arifa.bhutto@usindh.edu.pk',
    phone: '+92 301 3288490',
    activeCourses: ['SWE-403 (Software QA)', 'SWE-499 (Final Year Project)'],
    officeRoom: 'Chairperson Secretariat, SWE Dept'
  },
  {
    id: 'tch_waheed',
    name: 'Prof. Dr. Waheed Umrani',
    designation: 'Professor & Chairman',
    departmentId: 'dept_it',
    departmentName: 'Department of Information Technology',
    facultyName: 'Faculty of Engineering & Technology',
    email: 'waheed.umrani@usindh.edu.pk',
    phone: '+92 333 2617789',
    activeCourses: ['IT-401 (Information Security)', 'IT-405 (Network Management)'],
    officeRoom: 'IT Department, Chairman Office'
  },
  {
    id: 'tch_khoumbati',
    name: 'Prof. Dr. Khalil-ur-Rehman Khoumbati',
    designation: 'Meritorious Professor & Dean FET',
    departmentId: 'dept_swe',
    departmentName: 'Faculty of Engineering & Technology',
    facultyName: 'Faculty of Engineering & Technology',
    email: 'dean.eng@usindh.edu.pk',
    phone: '+92 22 9213181',
    activeCourses: ['FET-701 (Advanced Computing Systems)'],
    officeRoom: 'Dean Secretariat, FET Complex'
  }
];

export const MULTI_DEPARTMENT_STUDENTS: StudentProfile[] = [
  {
    id: 'std_2k23_swe_104',
    rollNumber: '2K23/SWE/104',
    name: 'Ali Hassan Chand',
    fatherName: 'Hassan Chand',
    department: 'Department of Software Engineering',
    batch: '2K23 Batch (Undergraduate)',
    program: 'BS Software Engineering',
    semester: 7,
    email: 'ali.hassan23@usindh.edu.pk',
    phone: '+92 300 9284102',
    cnicMasked: '41302-******4-2',
    avatarUrl: studentPortraitImg,
    gpa: 3.62,
    cgpa: 3.54,
    completedCredits: 104,
    totalCredits: 136,
    academicStanding: 'Good Standing',
    advisor: 'Prof. Dr. Rafique Ahmed Bhutto (Professor)'
  },
  {
    id: 'std_2k23_swe_045',
    rollNumber: '2K23/SWE/045',
    name: 'Abdul Hannan Memon',
    fatherName: 'Ghulam Mustafa Memon',
    department: 'Department of Software Engineering',
    batch: '2K23 Batch (Undergraduate)',
    program: 'BS Software Engineering',
    semester: 7,
    email: 'abdul.hannan23@usindh.edu.pk',
    phone: '+92 312 3456789',
    cnicMasked: '41303-******1-1',
    avatarUrl: studentPortraitImg,
    gpa: 3.58,
    cgpa: 3.48,
    completedCredits: 104,
    totalCredits: 136,
    academicStanding: 'Good Standing',
    advisor: 'Engr. Aamir Mallah (Assistant Professor)'
  },
  {
    id: 'std_2k23_swe_078',
    rollNumber: '2K23/SWE/078',
    name: 'Haris Ahmed Ansari',
    fatherName: 'Ahmed Ansari',
    department: 'Department of Software Engineering',
    batch: '2K23 Batch (Undergraduate)',
    program: 'BS Software Engineering',
    semester: 7,
    email: 'haris.ansari23@usindh.edu.pk',
    phone: '+92 334 7891234',
    cnicMasked: '41302-******8-4',
    avatarUrl: studentPortraitImg,
    gpa: 3.72,
    cgpa: 3.65,
    completedCredits: 104,
    totalCredits: 136,
    academicStanding: 'Good Standing',
    advisor: 'Prof. Dr. Arifa Bhutto (Chairperson)'
  },
  {
    id: 'std_2k23_bba_042',
    rollNumber: '2K23/BBA/042',
    name: 'Dua Soomro',
    fatherName: 'Manzoor Hussain Soomro',
    department: 'Institute of Business Administration (IBA)',
    batch: '2K23 Batch (Undergraduate)',
    program: 'BBA (Honors 4-Year)',
    semester: 4,
    email: 'dua.bba23@usindh.edu.pk',
    phone: '+92 301 9876543',
    cnicMasked: '41301-******9-7',
    avatarUrl: studentPortraitImg,
    gpa: 3.80,
    cgpa: 3.75,
    completedCredits: 64,
    totalCredits: 132,
    academicStanding: 'Good Standing',
    advisor: 'Prof. Dr. Abdul Sattar Shah (Director IBA)'
  }
];

export const VC_EXECUTIVE_SUMMARY = {
  viceChancellorName: 'Prof. Dr. Muhammad Siddique Kalhoro',
  title: 'Vice-Chancellor, University of Sindh, Jamshoro',
  tenureStatus: 'Confirmed Senate Resolution',
  totalEnrolledStudents: 42850,
  totalFacultyMembers: 1240,
  activeFaculties: 14,
  activeDepartments: 68,
  todayCampusAttendanceRate: 88.4,
  totalFeeCollectionSession: 'PKR 1.392 Billion',
  feeRecoveryPercentage: 94.2,
  examConductReadiness: '100% (All Halls Cleared)',
  activeOBEPrograms: 42,
  pendingAppeals: 18,
  syndicateResolutions: [
    { id: 'SYN-2026-14', title: 'Adoption of Unified Centralized Digital LMS for all 14 Faculties', status: 'Implemented', date: 'Oct 02, 2026' },
    { id: 'SYN-2026-13', title: 'Mandatory 75% HEC Biometric & Digital Attendance for Admit Card Issuance', status: 'Enforced', date: 'Sep 24, 2026' },
    { id: 'SYN-2026-12', title: 'Instant 1Link Online Fee Verification Integration across HBL & Sindh Bank', status: 'Operational', date: 'Sep 10, 2026' }
  ]
};
