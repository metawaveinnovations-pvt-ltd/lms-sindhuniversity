export interface AcademicProgram {
  id: string;
  level: 'undergraduate' | 'postgraduate';
  degreeType: 'BS' | 'Professional' | 'MS' | 'M.Phil' | 'PhD' | 'MBA' | 'Master';
  title: string;
  department: string;
  faculty: string;
  duration: string;
  creditHours: string;
  accreditation: string;
  eligibility: string;
  testRequirement: string;
  seats: string;
  merit2025: string;
  description: string;
  specializations: string[];
  careerProspects: string[];
  feeEstimate: string;
}

export interface AdmissionStep {
  step: number;
  title: string;
  desc: string;
  tag: string;
  actionNote: string;
}

export interface AdmissionQuota {
  name: string;
  percentage: string;
  description: string;
  eligibility: string;
}

export interface AdmissionScheduleDate {
  event: string;
  date: string;
  status: 'Completed' | 'Active' | 'Upcoming';
  note: string;
}

export const ACADEMIC_PROGRAMS: AcademicProgram[] = [
  // ------------------ UNDERGRADUATE PROGRAMS ------------------
  {
    id: 'ug-swe',
    level: 'undergraduate',
    degreeType: 'BS',
    title: 'BS Software Engineering',
    department: 'Department of Software Engineering',
    faculty: 'Faculty of Engineering & Technology',
    duration: '4 Years (8 Semesters)',
    creditHours: '136 Cr. Hrs',
    accreditation: 'HEC & NCEAC (Highest W4 Category)',
    eligibility: 'HSC Pre-Engineering / Computer Science (ICS) with minimum 50% aggregate marks.',
    testRequirement: 'SUTC Pre-Entry Test (Min 50% passing)',
    seats: '60 Morning · 40 Evening',
    merit2025: '74.60% (Last Merit Score)',
    description: 'Premier OBE-aligned curriculum focusing on software architecture, DevOps, cloud native engineering, quality assurance, and AI-assisted software systems.',
    specializations: ['Cloud & Microservices', 'Fullstack Architecture', 'Software QA & Security', 'AI & Machine Learning Systems'],
    careerProspects: ['Software Architect', 'DevOps Specialist', 'Full-stack Engineer', 'QA Automation Lead'],
    feeEstimate: 'PKR 28,500 / Semester (Morning)'
  },
  {
    id: 'ug-cs',
    level: 'undergraduate',
    degreeType: 'BS',
    title: 'BS Computer Science',
    department: 'Institute of Computer Science',
    faculty: 'Faculty of Natural Sciences',
    duration: '4 Years (8 Semesters)',
    creditHours: '134 Cr. Hrs',
    accreditation: 'HEC & NCEAC Accredited',
    eligibility: 'HSC Pre-Engineering / ICS / General Science (with Mathematics) with min 50% marks.',
    testRequirement: 'SUTC Pre-Entry Test (Min 50% passing)',
    seats: '120 Morning · 80 Evening',
    merit2025: '72.80% (Last Merit Score)',
    description: 'Core computing theory, algorithms, compiler construction, database architectures, distributed systems, and computer vision.',
    specializations: ['Artificial Intelligence', 'Data Engineering', 'Distributed Computing', 'Cyber Security'],
    careerProspects: ['AI Engineer', 'Backend Developer', 'Systems Engineer', 'Database Administrator'],
    feeEstimate: 'PKR 26,000 / Semester (Morning)'
  },
  {
    id: 'ug-it',
    level: 'undergraduate',
    degreeType: 'BS',
    title: 'BS Information Technology',
    department: 'Department of Information Technology',
    faculty: 'Faculty of Engineering & Technology',
    duration: '4 Years (8 Semesters)',
    creditHours: '132 Cr. Hrs',
    accreditation: 'HEC Recognized & OBE Framework',
    eligibility: 'HSC (Pre-Eng / ICS / Science) with min 50% marks.',
    testRequirement: 'SUTC Pre-Entry Test (Min 50%)',
    seats: '60 Morning · 50 Evening',
    merit2025: '69.40% (Last Merit Score)',
    description: 'Enterprise IT infrastructure, network security, virtualization, systems administration, and web applications management.',
    specializations: ['Enterprise Networks', 'Information Security', 'Cloud Infrastructure', 'Web Engineering'],
    careerProspects: ['Network Administrator', 'IT Operations Manager', 'Cloud Support Specialist', 'Cybersecurity Analyst'],
    feeEstimate: 'PKR 26,000 / Semester (Morning)'
  },
  {
    id: 'ug-ai-ds',
    level: 'undergraduate',
    degreeType: 'BS',
    title: 'BS Artificial Intelligence & Data Science',
    department: 'Institute of Computer Science',
    faculty: 'Faculty of Natural Sciences',
    duration: '4 Years (8 Semesters)',
    creditHours: '134 Cr. Hrs',
    accreditation: 'HEC & NCEAC Approved',
    eligibility: 'HSC Pre-Eng / ICS (Mathematics mandatory) with min 50% marks.',
    testRequirement: 'SUTC Pre-Entry Test (Min 50%)',
    seats: '50 Morning · 40 Evening',
    merit2025: '73.20% (Last Merit Score)',
    description: 'Cutting-edge program covering deep neural networks, natural language processing, predictive analytics, big data ecosystems, and machine perception.',
    specializations: ['Deep Learning', 'Computer Vision', 'Big Data Engineering', 'NLP & LLM Applications'],
    careerProspects: ['Data Scientist', 'Machine Learning Engineer', 'BI Analyst', 'AI Researcher'],
    feeEstimate: 'PKR 28,000 / Semester (Morning)'
  },
  {
    id: 'ug-telecom',
    level: 'undergraduate',
    degreeType: 'BS',
    title: 'BS Telecommunication',
    department: 'Department of Telecommunication',
    faculty: 'Faculty of Engineering & Technology',
    duration: '4 Years (8 Semesters)',
    creditHours: '134 Cr. Hrs',
    accreditation: 'HEC Approved & NTC Regulated',
    eligibility: 'HSC Pre-Eng / Pre-Medical (with Additional Math) min 50% marks.',
    testRequirement: 'SUTC Pre-Entry Test (Min 50%)',
    seats: '50 Morning · 40 Evening',
    merit2025: '65.10% (Last Merit Score)',
    description: 'Wireless communication, 5G architectures, optical networks, RF engineering, satellite links, and IoT signal processing.',
    specializations: ['5G/6G Networks', 'Optical Communication', 'IoT & Embedded Networks', 'Signal Processing'],
    careerProspects: ['Telecom Network Engineer', 'RF Planning Engineer', 'Fiber Optics Specialist', 'IoT Solutions Engineer'],
    feeEstimate: 'PKR 26,000 / Semester (Morning)'
  },
  {
    id: 'ug-bba',
    level: 'undergraduate',
    degreeType: 'BS',
    title: 'BBA (Honors 4-Year)',
    department: 'Institute of Business Administration (IBA)',
    faculty: 'Faculty of Commerce & Business Administration',
    duration: '4 Years (8 Semesters)',
    creditHours: '132 Cr. Hrs',
    accreditation: 'HEC & NBEAC Accredited',
    eligibility: 'HSC (Commerce / Arts / Science / FA / FSc) with min 50% marks.',
    testRequirement: 'SUTC Pre-Entry Test (Min 50%)',
    seats: '100 Morning · 60 Evening',
    merit2025: '71.50% (Last Merit Score)',
    description: 'Sindh University flagship business education program covering corporate finance, marketing management, supply chain analytics, and entrepreneurship.',
    specializations: ['Marketing & Brand Strategy', 'Corporate Finance & Banking', 'Human Resource Management', 'Supply Chain Management'],
    careerProspects: ['Business Analyst', 'Brand Manager', 'Financial Advisor', 'Supply Chain Coordinator'],
    feeEstimate: 'PKR 30,000 / Semester (Morning)'
  },
  {
    id: 'ug-pharmd',
    level: 'undergraduate',
    degreeType: 'Professional',
    title: 'Pharm.D (Doctor of Pharmacy)',
    department: 'Faculty of Pharmacy',
    faculty: 'Faculty of Pharmacy',
    duration: '5 Years (10 Semesters)',
    creditHours: '198 Cr. Hrs',
    accreditation: 'Pharmacy Council of Pakistan (PCP) & HEC',
    eligibility: 'HSC Pre-Medical with minimum 60% marks.',
    testRequirement: 'SUTC Pre-Entry Test (Strict Merit Competition)',
    seats: '120 Morning · 80 Evening (Self-Finance)',
    merit2025: '79.20% (Last Merit Score)',
    description: 'Clinical pharmacy, pharmaceutical chemistry, pharmacology, toxicology, hospital drug management, and industrial dosage formulation.',
    specializations: ['Clinical Pharmacy', 'Industrial Formulation', 'Pharmacology & Therapeutics', 'Hospital Pharmacy'],
    careerProspects: ['Clinical Pharmacist', 'Drug Inspector', 'Pharmaceutical Quality Manager', 'Medical Research Associate'],
    feeEstimate: 'PKR 35,000 / Semester (Morning)'
  },
  {
    id: 'ug-llb',
    level: 'undergraduate',
    degreeType: 'Professional',
    title: 'LLB (5-Year Program)',
    department: 'Institute of Law',
    faculty: 'Faculty of Law',
    duration: '5 Years (10 Semesters)',
    creditHours: '166 Cr. Hrs',
    accreditation: 'Pakistan Bar Council (PBC) & HEC Approved',
    eligibility: 'HSC / Intermediate in any discipline with min 50% marks + LAT (Law Admission Test) qualified.',
    testRequirement: 'HEC LAT Test (Min 50%) + SUTC Entry Screening',
    seats: '100 Morning · 50 Evening',
    merit2025: '70.30% (Last Merit Score)',
    description: 'Constitutional law, criminal jurisprudence, corporate governance, civil litigation, international treaties, and moot court trial practice.',
    specializations: ['Constitutional Law', 'Corporate & Commercial Law', 'Criminal Jurisprudence', 'Human Rights Law'],
    careerProspects: ['Advocate High Court', 'Corporate Legal Counsel', 'Judicial Magistrate', 'Legal Consultant'],
    feeEstimate: 'PKR 32,000 / Semester (Morning)'
  },
  {
    id: 'ug-biotech',
    level: 'undergraduate',
    degreeType: 'BS',
    title: 'BS Biotechnology',
    department: 'Institute of Biotechnology & Genetic Engineering (IBGE)',
    faculty: 'Faculty of Natural Sciences',
    duration: '4 Years (8 Semesters)',
    creditHours: '134 Cr. Hrs',
    accreditation: 'HEC Recognized',
    eligibility: 'HSC Pre-Medical with min 50% marks.',
    testRequirement: 'SUTC Pre-Entry Test (Min 50%)',
    seats: '60 Morning · 40 Evening',
    merit2025: '72.10% (Last Merit Score)',
    description: 'Recombinant DNA technology, agricultural genetics, microbial fermentation, proteomics, bioinformatics, and immunology.',
    specializations: ['Genetic Engineering', 'Bioinformatics & Omics', 'Agricultural Biotechnology', 'Industrial Microbiology'],
    careerProspects: ['Biotech Researcher', 'Clinical Lab Scientist', 'Forensic Analyst', 'Quality Control Officer'],
    feeEstimate: 'PKR 25,500 / Semester (Morning)'
  },
  {
    id: 'ug-math',
    level: 'undergraduate',
    degreeType: 'BS',
    title: 'BS Mathematics',
    department: 'Department of Mathematics',
    faculty: 'Faculty of Natural Sciences',
    duration: '4 Years (8 Semesters)',
    creditHours: '132 Cr. Hrs',
    accreditation: 'HEC Recognized',
    eligibility: 'HSC Pre-Engineering / General Science with Mathematics min 50% marks.',
    testRequirement: 'SUTC Pre-Entry Test (Min 50%)',
    seats: '70 Morning · 50 Evening',
    merit2025: '64.80% (Last Merit Score)',
    description: 'Pure and applied mathematics, numerical analysis, fluid mechanics, linear algebra, cryptology, and mathematical modeling.',
    specializations: ['Applied Mathematics', 'Computational Mathematics', 'Statistics & Stochastic Models', 'Pure Mathematics'],
    careerProspects: ['Quantitative Analyst', 'Operations Research Analyst', 'Actuarial Scientist', 'Data Modeler'],
    feeEstimate: 'PKR 22,000 / Semester (Morning)'
  },
  {
    id: 'ug-eng',
    level: 'undergraduate',
    degreeType: 'BS',
    title: 'BS English (Linguistics & Literature)',
    department: 'Department of English',
    faculty: 'Faculty of Arts & Humanities',
    duration: '4 Years (8 Semesters)',
    creditHours: '130 Cr. Hrs',
    accreditation: 'HEC Recognized',
    eligibility: 'HSC / Intermediate (any group) with min 45% marks.',
    testRequirement: 'SUTC Pre-Entry Test (Min 50%)',
    seats: '100 Morning · 60 Evening',
    merit2025: '68.00% (Last Merit Score)',
    description: 'Applied linguistics, phonetics, syntax, critical discourse, postcolonial literary studies, World Englishes, and creative writing.',
    specializations: ['Applied Linguistics & ELT', 'World Literatures in English', 'Discourse & Sociolinguistics'],
    careerProspects: ['Content Strategist', 'Academic Lecturer', 'Language Consultant', 'Public Relations Specialist'],
    feeEstimate: 'PKR 21,500 / Semester (Morning)'
  },
  {
    id: 'ug-econ',
    level: 'undergraduate',
    degreeType: 'BS',
    title: 'BS Economics',
    department: 'Department of Economics',
    faculty: 'Faculty of Social Sciences',
    duration: '4 Years (8 Semesters)',
    creditHours: '130 Cr. Hrs',
    accreditation: 'HEC Recognized',
    eligibility: 'HSC (Science / Commerce / Arts with Economics/Math) min 45% marks.',
    testRequirement: 'SUTC Pre-Entry Test (Min 50%)',
    seats: '80 Morning · 50 Evening',
    merit2025: '63.90% (Last Merit Score)',
    description: 'Microeconomics, macroeconomics, econometrics, development policies, monetary economics, and fiscal public finance.',
    specializations: ['Development Economics', 'Econometric Modeling', 'Banking & Monetary Economics'],
    careerProspects: ['Economic Policy Analyst', 'Banking Officer', 'Development Project Specialist', 'Market Research Lead'],
    feeEstimate: 'PKR 22,000 / Semester (Morning)'
  },

  // ------------------ POSTGRADUATE PROGRAMS ------------------
  {
    id: 'pg-ms-swe',
    level: 'postgraduate',
    degreeType: 'MS',
    title: 'MS Software Engineering',
    department: 'Department of Software Engineering',
    faculty: 'Faculty of Engineering & Technology',
    duration: '2 Years (4 Semesters)',
    creditHours: '30 Cr. Hrs (24 Coursework + 6 Thesis)',
    accreditation: 'HEC & NCEAC W4 Recognized',
    eligibility: '16-year BS (Software Engineering / Computer Science / IT) with min 2.50 CGPA (or 60% marks in annual).',
    testRequirement: 'GAT General / SUTC Post-Graduate Test (Min 50% score)',
    seats: '35 Seats (Evening / Weekend)',
    merit2025: '67.40% (Academic + Test Aggregate)',
    description: 'Advanced software architecture, empirical software engineering, cloud systems resilience, software security verification, and formal specification methods.',
    specializations: ['Cloud Software Systems', 'Secure Software Architectures', 'Empirical Software Engineering'],
    careerProspects: ['Lead Software Architect', 'Principal Research Engineer', 'University Faculty', 'Technical Director'],
    feeEstimate: 'PKR 38,000 / Semester'
  },
  {
    id: 'pg-ms-cs',
    level: 'postgraduate',
    degreeType: 'MS',
    title: 'MS Computer Science',
    department: 'Institute of Computer Science',
    faculty: 'Faculty of Natural Sciences',
    duration: '2 Years (4 Semesters)',
    creditHours: '30 Cr. Hrs (24 Coursework + 6 Thesis)',
    accreditation: 'HEC Recognized',
    eligibility: '16-year BS CS / IT / Software Eng / CE with min 2.50 CGPA.',
    testRequirement: 'GAT General / SUTC Test (Min 50%)',
    seats: '40 Seats (Evening / Weekend)',
    merit2025: '66.80% (Aggregate)',
    description: 'Machine learning algorithms, advanced distributed databases, cryptology, high-performance computing, and computer vision.',
    specializations: ['Deep Learning & AI', 'High Performance Computing', 'Cyber Defense'],
    careerProspects: ['AI Research Scientist', 'Data Science Lead', 'University Lecturer', 'Security Consultant'],
    feeEstimate: 'PKR 36,000 / Semester'
  },
  {
    id: 'pg-mba',
    level: 'postgraduate',
    degreeType: 'MBA',
    title: 'MBA (Executive & 2-Year Regular)',
    department: 'Institute of Business Administration (IBA)',
    faculty: 'Faculty of Commerce & Business Administration',
    duration: '1.5 – 2 Years (3 to 4 Semesters)',
    creditHours: '36 Cr. Hrs (Coursework + Capstone Project)',
    accreditation: 'HEC & NBEAC Accredited',
    eligibility: '16 years of education (BBA 4-year for 1.5-yr program; Non-business 16-yr degree for 2-yr program) min 2.50 CGPA.',
    testRequirement: 'GAT General / SUTC IBA Entry Test + Panel Interview',
    seats: '60 Seats (Morning & Executive Evening)',
    merit2025: '68.50% (Academic + Test + Interview)',
    description: 'Strategic management, corporate financial governance, global supply chains, international marketing, and business analytics leadership.',
    specializations: ['Strategic Management', 'FinTech & Corporate Finance', 'Strategic Marketing', 'Supply Chain Analytics'],
    careerProspects: ['Chief Operating Officer', 'Investment Banker', 'Management Consultant', 'General Manager'],
    feeEstimate: 'PKR 42,000 / Semester'
  },
  {
    id: 'pg-mphil-biotech',
    level: 'postgraduate',
    degreeType: 'M.Phil',
    title: 'M.Phil Biotechnology',
    department: 'Institute of Biotechnology & Genetic Engineering (IBGE)',
    faculty: 'Faculty of Natural Sciences',
    duration: '2 Years (4 Semesters)',
    creditHours: '30 Cr. Hrs (24 Coursework + 6 Thesis)',
    accreditation: 'HEC Approved Research Facility',
    eligibility: 'BS 4-Year in Biotechnology / Biochemistry / Microbiology / Botany with min 2.50 CGPA.',
    testRequirement: 'SUTC Subject Test / GAT Subject (Min 60%)',
    seats: '25 Research Seats',
    merit2025: '70.20% (Research Proposal & Test)',
    description: 'Advanced molecular genetics, recombinant protein engineering, metabolic engineering, agricultural genomics, and biocatalysis research.',
    specializations: ['Molecular Genetics', 'Industrial Bioprocessing', 'Medical Biotechnology'],
    careerProspects: ['Senior Research Scientist', 'Genomics Analyst', 'Pharmaceutical R&D Lead', 'Scientific Officer'],
    feeEstimate: 'PKR 35,000 / Semester'
  },
  {
    id: 'pg-llm',
    level: 'postgraduate',
    degreeType: 'Master',
    title: 'LL.M (Master of Laws)',
    department: 'Institute of Law',
    faculty: 'Faculty of Law',
    duration: '2 Years (4 Semesters)',
    creditHours: '30 Cr. Hrs (Coursework + Dissertation)',
    accreditation: 'Pakistan Bar Council & HEC Approved',
    eligibility: 'LLB (3-year or 5-year degree) with min 2nd Division / 2.50 CGPA.',
    testRequirement: 'Law GAT / SUTC Postgraduate Law Test',
    seats: '40 Seats (Evening)',
    merit2025: '65.40%',
    description: 'Comparative constitutional law, international arbitration, human rights jurisprudence, international trade laws, and corporate governance.',
    specializations: ['International Law & Arbitration', 'Constitutional Law', 'Corporate & Commercial Law'],
    careerProspects: ['Senior Advocate', 'Legal Advisor to Banks/Corporations', 'Judicial Services', 'Law Professor'],
    feeEstimate: 'PKR 40,000 / Semester'
  },
  {
    id: 'pg-phd-swe',
    level: 'postgraduate',
    degreeType: 'PhD',
    title: 'PhD Software Engineering',
    department: 'Department of Software Engineering',
    faculty: 'Faculty of Engineering & Technology',
    duration: '3 to 5 Years',
    creditHours: '18 Cr. Hrs Coursework + Comprehensive Exam + Doctoral Dissertation',
    accreditation: 'HEC Approved Doctoral Program',
    eligibility: 'MS / M.Phil Software Engineering / Computer Science with min 3.00 CGPA (out of 4.00) and approved synopsis.',
    testRequirement: 'GAT Subject / SUTC GRE Subject min 60% + Departmental Doctoral Defense',
    seats: '10 Doctoral Fellowships',
    merit2025: 'Synopsis Defense & Published Works',
    description: 'Terminal doctoral research program in empirical software engineering, self-adaptive autonomic architectures, automated defect localization, and distributed cloud systems.',
    specializations: ['Autonomic Software Systems', 'Empirical Software Engineering', 'Automated QA & Verification'],
    careerProspects: ['Professor / Tenured Faculty', 'Principal Research Scientist', 'Chief Technology Officer', 'R&D Director'],
    feeEstimate: 'PKR 45,000 / Semester (Funded HEC Fellowships Available)'
  },
  {
    id: 'pg-phd-cs',
    level: 'postgraduate',
    degreeType: 'PhD',
    title: 'PhD Computer Science',
    department: 'Institute of Computer Science',
    faculty: 'Faculty of Natural Sciences',
    duration: '3 to 5 Years',
    creditHours: '18 Cr. Hrs Coursework + Comprehensive Exam + Dissertation',
    accreditation: 'HEC Approved Doctoral Program',
    eligibility: 'MS / M.Phil in Computer Science / IT with min 3.00 CGPA.',
    testRequirement: 'GRE Subject / SUTC PhD Test min 60% + DRC Interview',
    seats: '12 Doctoral Fellowships',
    merit2025: 'DRC Evaluation & Synopsis',
    description: 'Advanced research in machine learning, high performance distributed computing, computational biology, natural language models, and cryptographic protocols.',
    specializations: ['AI & Neural Systems', 'Distributed Computing', 'Computer Vision'],
    careerProspects: ['University Professor', 'Chief AI Scientist', 'Research Director', 'Senior Tech Advisor'],
    feeEstimate: 'PKR 45,000 / Semester'
  }
];

export const ADMISSION_STEPS: AdmissionStep[] = [
  {
    step: 1,
    title: 'Online Application Portal',
    desc: 'Register with valid CNIC/B-Form at admissions.usindh.edu.pk. Fill in bio-data, academic qualifications (Matric/Inter), and program preferences.',
    tag: 'Step 1: Bio-Data',
    actionNote: 'Upload attested mark sheets, CNIC copy, domicile, and PRC.'
  },
  {
    step: 2,
    title: '1Link Bank Challan Payment',
    desc: 'Generate automated Pre-Entry Test fee voucher (PKR 3,000). Pay online via 1Bill, 1Link banking apps, or over-the-counter at HBL/MCB branches.',
    tag: 'Step 2: Fee Verification',
    actionNote: 'Instant automated verification via ITSC 1Link gateway.'
  },
  {
    step: 3,
    title: 'Download SUTC Test Admit Slip',
    desc: 'Download QR-coded Pre-Entry Test admit slip with assigned test center (Main Campus Jamshoro or Divisional Centers: Hyd, Sukkur, Mirpurkhas, Larkana, Badin).',
    tag: 'Step 3: Admit Slip',
    actionNote: 'Admit slip must be printed along with original CNIC on test day.'
  },
  {
    step: 4,
    title: 'Merit List & Seat Allocation',
    desc: 'Merit formulated: 10% SSC + 30% HSC + 60% Pre-Entry Test. Provisional and final merit lists displayed on LMS and portal for discipline allocation.',
    tag: 'Step 4: Admission Confirmed',
    actionNote: 'Verify documents at Directorate of Admissions and pay semester fees.'
  }
];

export const ADMISSION_QUOTAS: AdmissionQuota[] = [
  {
    name: 'General District Merit (Sindh)',
    percentage: '65% Seats',
    description: 'Allocated proportionally to candidates holding Domicile and PRC of all rural and urban districts of Sindh Province.',
    eligibility: 'HSC / Equivalent with required discipline percentage.'
  },
  {
    name: 'Female Reserved Quota',
    percentage: '15% Seats',
    description: 'Specific reserved seats across high-demand disciplines (Engineering, CS, BBA, Law, Pharmacy) to promote female education in Sindh.',
    eligibility: 'Female candidates across all districts of Sindh.'
  },
  {
    name: 'Sindh University Employees / Teachers',
    percentage: '5% Seats',
    description: 'Allocated for real children of serving, retired, or deceased employees of the University of Sindh.',
    eligibility: 'Employment certificate endorsed by Registrar Office.'
  },
  {
    name: 'Sports & Co-Curricular',
    percentage: '3% Seats',
    description: 'Reserved for national, provincial, and divisional level sports athletes and debaters.',
    eligibility: 'Trial clearance before the Directorate of Physical Education.'
  },
  {
    name: 'Self-Finance & Evening Shift',
    percentage: 'Open / Variable',
    description: 'Available for candidates desiring evening shift or self-finance scheme in BS, Pharm-D, BBA, and MS programs.',
    eligibility: 'Qualified SUTC Entry test and self-finance fee payment.'
  }
];

export const ADMISSION_SCHEDULE: AdmissionScheduleDate[] = [
  {
    event: 'Online Applications Open for Fall 2026',
    date: 'August 15, 2026',
    status: 'Completed',
    note: 'Registration opened for Undergraduate & Postgraduate cohorts'
  },
  {
    event: 'Last Date for Online Submission & Fee Challan',
    date: 'September 30, 2026',
    status: 'Completed',
    note: 'Bank branches accepted 1Link challans till 4:00 PM'
  },
  {
    event: 'Sindh University Pre-Entry Test (SUTC)',
    date: 'October 18, 2026',
    status: 'Active',
    note: 'Conducted simultaneously across Jamshoro & 5 Divisional Centers'
  },
  {
    event: 'Announcement of Pre-Entry Test Results',
    date: 'October 24, 2026',
    status: 'Upcoming',
    note: 'Roll-number wise answer keys and results on admissions.usindh.edu.pk'
  },
  {
    event: '1st Provisional Merit List Publication',
    date: 'November 05, 2026',
    status: 'Upcoming',
    note: 'Discipline allocations for Morning & Evening programs'
  },
  {
    event: 'Document Verification & Fee Submission',
    date: 'November 12 – 22, 2026',
    status: 'Upcoming',
    note: 'Directorate of Admissions AC-II Building, Jamshoro'
  },
  {
    event: 'Commencement of Academic Classes',
    date: 'January 05, 2027',
    status: 'Upcoming',
    note: 'Orientation sessions for Batch 2K27 across all faculties'
  }
];
