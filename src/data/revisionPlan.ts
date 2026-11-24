export type SprintPhase = 'phase1' | 'phase2' | 'phase3';

export interface RevisionBlock {
  id: string;
  slot: 'Morning (08:30–11:00)' | 'Afternoon (14:00–16:00)' | 'Evening (19:30–21:00)' | 'Exam Slot';
  courseId?: string;
  courseCode: string;
  title: string;
  tasks: string;
  kind: 'study' | 'mock' | 'recall' | 'exam' | 'rest';
}

export interface RevisionDay {
  dayNumber: number;
  date: string; // YYYY-MM-DD
  dayLabel: string; // e.g. "Wed, Nov 18"
  phase: SprintPhase;
  phaseTag: string;
  headline: string;
  isExamDay?: boolean;
  examCode?: string;
  blocks: RevisionBlock[];
}

export interface PastPaperUnitResource {
  courseId: string;
  code: string;
  title: string;
  examDate: string;
  lecturer: string;
  legacyCodes: string[];
  moodleUrl: string;
  searchLinks: {
    label: string;
    platform: 'Google PDF' | 'Studocu' | 'Scribd' | 'Kenyaplex / Masomo';
    url: string;
  }[];
  highYieldTopics: string[];
  mockQuestions: {
    section: string;
    question: string;
    tip: string;
  }[];
}

export const OFFICIAL_KCA_PAST_PAPER_CHANNELS = [
  {
    name: 'KCAU Virtual Campus (Moodle LMS)',
    url: 'https://virtualcampus.kcau.ac.ke/my/courses.php',
    badge: 'Primary Official',
    steps: 'Log in with your KCAU student credentials → Open each unit page or the Library / Past Papers block → Download department revision banks & CATs.',
  },
  {
    name: 'Martin Oduor-Otieno Library (Past Exam Bank)',
    url: 'https://library.kcau.ac.ke/',
    badge: 'Official Exam Bank',
    steps: 'Open E-Resources → Past Examination Papers (Exam Bank) → Search by BOTH current code (e.g. STU 1201) AND legacy KCA codes (e.g. BIT 1106 / BIT 1203).',
  },
  {
    name: 'MyLoft Off-Campus Library Portal',
    url: 'https://app.myloft.xyz/',
    badge: 'Off-Campus Access',
    steps: 'Select KCA University as your institution and sign in with your @students.kcau.ac.ke email to unlock the Past Exam Bank from home.',
  },
];

export const PAST_PAPER_GUIDES: PastPaperUnitResource[] = [
  {
    courseId: 'kcau-33500',
    code: 'STU 1201',
    title: 'Introduction to Programming',
    examDate: 'Tue, Dec 1 · 17:00–19:00',
    lecturer: 'Griffin Kenga Kitili',
    legacyCodes: ['BIT 1106', 'BSD 1105', 'BCT 1104', 'BBIT 105', 'BIT 1102', 'BIT 1303A', 'BAC 1102'],
    moodleUrl: 'https://virtualcampus.kcau.ac.ke/course/view.php?id=33500',
    searchLinks: [
      {
        label: 'Google PDF Search (BIT 1303A / BIT 1102)',
        platform: 'Google PDF',
        url: 'https://www.google.com/search?q=%22KCA+University%22+%28%22STU+1201%22+OR+%22BIT+1303A%22+OR+%22BIT+1102%22+OR+%22Programming+Methodology%22%29+filetype%3Apdf',
      },
      {
        label: 'Studocu KCA Programming Search',
        platform: 'Studocu',
        url: 'https://www.studocu.com/row/search/KCA+University+Programming+Methodology+BIT+1303A',
      },
      {
        label: 'Scribd KCA Programming Papers',
        platform: 'Scribd',
        url: 'https://www.scribd.com/search?query=KCA%20University%20BIT%201303A%20Programming',
      },
      {
        label: 'Masomo Msingi / Kenyaplex Bank',
        platform: 'Kenyaplex / Masomo',
        url: 'https://www.google.com/search?q=site%3Akenyaplex.com+OR+site%3Amasomomsingi.com+%22KCA%22+%22Programming+Methodology%22',
      },
    ],
    highYieldTopics: [
      'IPOS cycle, Compiler vs Interpreter vs Assembler',
      'Program Development Lifecycle (PDLC) & Flowcharts/Pseudocode',
      'C Program Structure, Lexical Elements, Keywords & Identifiers',
      'Primary Data Types, Typecasting, Operator Precedence & Dry-Run Trace Tables',
      'Control Structures (if/else, switch, for, while, do-while), Functions & Arrays',
    ],
    mockQuestions: [
      {
        section: 'Section A (Compulsory - 30 Marks) [KCA Legacy Paper BIT 1303A]',
        question: 'a) Distinguish between a compiler and an interpreter with real examples (4m). b) Draw a flowchart and write a complete C program that requests user input for 3 subjects (Math, Physics, Computer Science), computes average, and outputs Pass (>=50%) or Fail (8m). c) Trace the output of a nested for-loop producing number pyramids (1, 12, 123, 1234, 12345) (6m). d) Explain the 3 main types of programming errors in C: Syntax, Runtime, and Semantic/Logical (6m). e) Differentiate between while loop and do-while loop (6m).',
        tip: 'Always include #include <stdio.h>, int main(void), proper format specifiers (%d, %f), and & in scanf().',
      },
      {
        section: 'Section B (20 Marks) [KCA Past Paper]',
        question: 'a) Explain the 6 stages of the Program Development Lifecycle (PDLC) (10m). b) Compare Procedural, Object-Oriented, and Functional programming paradigms with real language examples and use-cases (10m).',
        tip: 'Use a clean structured table for paradigm comparisons — KCA examiners love well-organized tables.',
      },
      {
        section: 'Section B (20 Marks) [Functions & Arrays]',
        question: 'a) Define the term function as used in programming and outline two advantages of modular programming (4m). b) Write a C function that takes two integer arrays of size 5, multiplies corresponding values, and stores them in a third array (8m). c) Explain the difference between call-by-value and call-by-reference using C code snippets (8m).',
        tip: 'Call-by-value passes a copy; call-by-reference uses pointers (& and *) to manipulate original memory addresses.',
      },
    ],
  },
  {
    courseId: 'kcau-33605',
    code: 'CUU 1202',
    title: 'Foundations of Critical and Creative Thinking',
    examDate: 'Wed, Dec 2 · 17:00–19:00',
    lecturer: 'Stephen Kamba Mwangangi (PT)',
    legacyCodes: ['UCU 103', 'BCU 002', 'KCAU 002', 'CT 101'],
    moodleUrl: 'https://virtualcampus.kcau.ac.ke/course/view.php?id=33605',
    searchLinks: [
      {
        label: 'Google PDF Search (New + Legacy)',
        platform: 'Google PDF',
        url: 'https://www.google.com/search?q=%22KCA+University%22+%28%22CUU+1202%22+OR+%22UCU+103%22+OR+%22Critical+and+Creative+Thinking%22%29+exam+filetype%3Apdf',
      },
      {
        label: 'Studocu KCA Search',
        platform: 'Studocu',
        url: 'https://www.studocu.com/row/search/KCA+University+Critical+and+Creative+Thinking',
      },
      {
        label: 'Scribd KCA Papers',
        platform: 'Scribd',
        url: 'https://www.scribd.com/search?query=KCA%20University%20Critical%20and%20Creative%20Thinking%20exam',
      },
      {
        label: 'Kenyaplex / Masomo Msingi',
        platform: 'Kenyaplex / Masomo',
        url: 'https://www.google.com/search?q=site%3Akenyaplex.com+OR+site%3Amasomomsingi.com+%22Critical+and+Creative+Thinking%22+exam',
      },
    ],
    highYieldTopics: [
      'Origin, Socratic method & Paul-Elder Elements of Thought',
      'Deductive (Validity & Soundness) vs Inductive (Strength & Cogency) Arguments',
      'Informal Fallacies (Ad Hominem, Straw Man, Slippery Slope, False Dilemma, Appeal to Authority)',
      'Cognitive Biases (Confirmation Bias, Anchoring, Groupthink, Dunning-Kruger)',
      'Creative Thinking Stages, Divergent vs Convergent Thinking & Problem-Solving Frameworks',
    ],
    mockQuestions: [
      {
        section: 'Section A (Compulsory - 30 Marks)',
        question: 'Define Critical Thinking and Creative Thinking and explain how they complement each other in IT innovation (8m). Identify and explain the informal fallacy present in 5 given real-world/social-media statements (10m). Distinguish between a valid argument and a sound argument using a syllogism example (6m). Explain 3 barriers to critical thinking (6m).',
        tip: 'For every fallacy question, state: (1) Exact Fallacy Name, (2) Why the reasoning fails, (3) How to fix it.',
      },
      {
        section: 'Section B (20 Marks)',
        question: 'An IT startup is deciding whether to migrate its legacy system to the cloud. Apply a structured 6-step Problem-Solving & Decision-Making framework (12m), and explain 4 cognitive biases the engineering team must guard against during the decision (8m).',
        tip: 'Anchor every point in a concrete scenario — examiners award full marks for applied analysis over rote lists.',
      },
    ],
  },
  {
    courseId: 'kcau-32622',
    code: 'CUU 2102',
    title: 'Information Literacy and Academic Writing',
    examDate: 'Fri, Dec 4 · 17:00–19:00',
    lecturer: 'Benjamin Kasyoki Mutungi',
    legacyCodes: ['KCAU 001', 'BIT 1111', 'BAC 1106', 'UCU 101'],
    moodleUrl: 'https://virtualcampus.kcau.ac.ke/course/view.php?id=32622',
    searchLinks: [
      {
        label: 'Google PDF Search (KCAU 001 / CUU 2102)',
        platform: 'Google PDF',
        url: 'https://www.google.com/search?q=%22KCA+University%22+%28%22CUU+2102%22+OR+%22KCAU+001%22+OR+%22Information+Literacy%22%29+exam+filetype%3Apdf',
      },
      {
        label: 'Studocu KCA Search',
        platform: 'Studocu',
        url: 'https://www.studocu.com/row/search/KCA+University+Information+Literacy',
      },
      {
        label: 'Scribd KCA Papers',
        platform: 'Scribd',
        url: 'https://www.scribd.com/search?query=KCA%20University%20Information%20Literacy%20KCAU%20001',
      },
      {
        label: 'Kenyaplex / Masomo Msingi',
        platform: 'Kenyaplex / Masomo',
        url: 'https://www.google.com/search?q=site%3Akenyaplex.com+OR+site%3Amasomomsingi.com+%22KCA%22+%22Information+Literacy%22',
      },
    ],
    highYieldTopics: [
      'Information Literacy Standards (ACRL / SCONUL) & Lifelong Learning',
      'Primary, Secondary & Tertiary Information Sources',
      'Boolean Operators (AND, OR, NOT), Truncation (*), Phrase Searching (" ")',
      'Source Evaluation — CRAAP Test (Currency, Relevance, Authority, Accuracy, Purpose)',
      'Plagiarism Types, Academic Integrity & Exact APA 7th Edition In-Text & Reference Formatting',
    ],
    mockQuestions: [
      {
        section: 'Question 1 (Compulsory - 20 Marks) [Real KCA Exam - April 2026 / August 2025]',
        question: 'a) Differentiate between primary, secondary, and tertiary sources of information and give relevant examples (6 Marks). b) Outline FIVE criteria for judging an information source (5 Marks). c) Explain FOUR hallmarks of academic writing and give relevant examples (4 Marks). d) Describe FIVE database searching techniques (5 Marks).',
        tip: 'Criteria for judging sources: Currency, Relevance, Authority, Accuracy, Purpose (CRAAP). Hallmarks: Formality, Objectivity, Evidence-based/Referencing, Precision/Clarity.',
      },
      {
        section: 'Question 2 (15 Marks) [Real KCA Exam - August 2025 Diaspora & PT]',
        question: 'a) Using Boolean search strategy, design a comprehensive search query to retrieve information about "renewable energy in Africa and policy development". Explain how your search terms and operators will improve relevance (10 Marks). b) Describe FIVE ways in which "in-text citations" differ from "end-references" when using APA Referencing style (10 Marks). c) Defend the concept of referencing in academic writing (5 Marks).',
        tip: 'Query template: ("renewable energy" OR "solar energy" OR "clean energy") AND Africa AND ("policy development" OR regulation). In-text appears in body (Author, Year); end-reference appears at end with full bibliographic metadata.',
      },
      {
        section: 'Question 3 (15 Marks) [Real KCA Exam - Case Study: AI Ethics in Academic Writing]',
        question: 'Scenario: At KCA University, postgraduate student Maria uses an undisclosed AI writing tool for her literature review, reuses portions of an undergrad paper without citation, shares partially anonymized participant data via a public cloud link, submits to a rapid-publication fee-charging journal, and relies on automated tools generating fake citations. a) Identify and explain THREE key information ethics issues raised (6 Marks). b) Evaluate whether Maria\'s use of AI tools constitutes academic misconduct (6 Marks). c) Analyze responsibilities of the student, supervisor, and university (3 Marks).',
        tip: 'Ethics issues: Self-plagiarism, Data privacy breach, Predatory publishing, Hallucinated citations. Defend with university integrity policy.',
      },
      {
        section: 'Question 4 (15 Marks) [Real KCA Exam - Scenario: John Plagiarism & Source Credibility]',
        question: 'a) John copied paragraphs word-for-word without citing and paraphrased websites without referencing. Explain the mistakes, potential academic disciplinary consequences, and how he should have properly cited (15 Marks). b) Distinguish between formal and informal writing styles in academic contexts with examples (8 Marks).',
        tip: 'Consequences: Disqualification of paper, referral to Disciplinary Committee, suspension, or expunging of credit.',
      },
    ],
  },
  {
    courseId: 'kcau-33501',
    code: 'STU 1202',
    title: 'Web Design and Development',
    examDate: 'Sat, Dec 5 · 11:00–13:00 (Morning!)',
    lecturer: 'Gladys Mange',
    legacyCodes: ['BIT 1203', 'BIT 2106', 'BSD 1203', 'BBIT 204'],
    moodleUrl: 'https://virtualcampus.kcau.ac.ke/course/view.php?id=33501',
    searchLinks: [
      {
        label: 'Google PDF Search (BIT 1203 / STU 1202)',
        platform: 'Google PDF',
        url: 'https://www.google.com/search?q=%22KCA+University%22+%28%22STU+1202%22+OR+%22BIT+1203%22+OR+%22Web+Design+and+Development%22%29+exam+filetype%3Apdf',
      },
      {
        label: 'Studocu KCA Search',
        platform: 'Studocu',
        url: 'https://www.studocu.com/row/search/KCA+University+Web+Design+and+Development',
      },
      {
        label: 'Scribd KCA Papers',
        platform: 'Scribd',
        url: 'https://www.scribd.com/search?query=KCA%20University%20BIT%201203%20Web%20Design',
      },
      {
        label: 'Kenyaplex / Masomo Msingi',
        platform: 'Kenyaplex / Masomo',
        url: 'https://www.google.com/search?q=site%3Akenyaplex.com+OR+site%3Amasomomsingi.com+%22KCA%22+%22Web+Design%22',
      },
    ],
    highYieldTopics: [
      'Internet Services (HTTP/HTTPS, DNS, FTP, SMTP), Client-Server Architecture',
      'Web Project Management & Website Layout / UI-UX Navigation Principles',
      'HTML5 Semantic Structure, Lists, Hyperlinks (Relative vs Absolute), Images & Hex Colors',
      'HTML Tables (colspan, rowspan, thead/tbody) & HTML Forms (input types, GET vs POST)',
      'CSS Box Model, Inline vs Internal vs External CSS, Selectors, Flexbox/Grid & Responsive Media Queries',
    ],
    mockQuestions: [
      {
        section: 'Section A (Compulsory - 30 Marks) [KCA Legacy Paper BIT 1203]',
        question: 'a) Describe the standard web design development lifecycle and list 4 guidelines a webmaster should follow when compiling a detailed site layout (10m). b) Write complete HTML5 code to render a university timetable table demonstrating both colspan and rowspan (8m). c) Distinguish between GET and POST form submission methods and write an HTML registration form with input types: text, email, radio button, select dropdown, and submit button (12m).',
        tip: 'Close every HTML tag cleanly (<tr>, <td>, </form>) and use semantic tags (<header>, <nav>, <main>, <footer>).',
      },
      {
        section: 'Section B (20 Marks) [CSS Box Model & Styling]',
        question: 'a) Illustrate the CSS Box Model with a labeled diagram (Content, Padding, Border, Margin) (6m). b) Distinguish between Inline, Internal, and External CSS with pros/cons (6m). c) Write CSS rules demonstrating class vs ID selectors, hover pseudo-class, and a mobile-first responsive media query (@media (max-width: 768px)) (8m).',
        tip: 'Draw the concentric CSS Box Model diagram cleanly: Content → Padding → Border → Margin.',
      },
      {
        section: 'Section B (20 Marks) [JavaScript DOM & Client-Side Scripting]',
        question: 'a) Explain the purpose of the following JavaScript event handlers and methods: OnSubmit, OnFocus, OnChange, and document.getElementById() (8m). b) Write a client-side JavaScript validation function validateForm() that checks if the username is not empty and password has at least 8 characters before submitting (8m). c) Distinguish between client-side and server-side scripting (4m).',
        tip: 'Always return false from the event handler if validation fails (e.g., event.preventDefault() or onsubmit="return validateForm()").',
      },
    ],
  },
  {
    courseId: 'kcau-33505',
    code: 'STU 2102',
    title: 'Computing Research Skills and Design',
    examDate: 'Mon, Dec 7 · 17:00–19:00',
    lecturer: 'Gladys Mange',
    legacyCodes: ['BIT 3102', 'BSD 2106', 'BIT 2208', 'BCT 3101'],
    moodleUrl: 'https://virtualcampus.kcau.ac.ke/course/view.php?id=33505',
    searchLinks: [
      {
        label: 'Google PDF Search (STU 2102 / Research)',
        platform: 'Google PDF',
        url: 'https://www.google.com/search?q=%22KCA+University%22+%28%22STU+2102%22+OR+%22Computing+Research%22+OR+%22Research+Methodology%22%29+BIT+exam+filetype%3Apdf',
      },
      {
        label: 'Studocu KCA Search',
        platform: 'Studocu',
        url: 'https://www.studocu.com/row/search/KCA+University+Research+Methodology+Computing',
      },
      {
        label: 'Scribd KCA Papers',
        platform: 'Scribd',
        url: 'https://www.scribd.com/search?query=KCA%20University%20Research%20Methodology%20exam',
      },
      {
        label: 'Kenyaplex / Masomo Msingi',
        platform: 'Kenyaplex / Masomo',
        url: 'https://www.google.com/search?q=site%3Akenyaplex.com+OR+site%3Amasomomsingi.com+%22KCA%22+%22Research+Methodology%22',
      },
    ],
    highYieldTopics: [
      'Characteristics of Scientific & Computing Research (Design Science, Experimental, Case Study)',
      'Formulating a Research Problem, General/Specific Objectives & Research Questions',
      'Literature Review Purpose, Theoretical vs Conceptual Frameworks (IV, DV, Moderating Variables)',
      'Probability (Simple Random, Stratified, Cluster) vs Non-Probability Sampling',
      'Data Collection Instruments (Questionnaires vs Interviews), Data Analysis & Research Ethics (Informed Consent, Anonymity)',
    ],
    mockQuestions: [
      {
        section: 'Section A (Compulsory - 30 Marks)',
        question: 'You want to study "Factors Influencing Adoption of AI Study Tools Among Kenyan University Students". Formulate: (a) A concise Problem Statement (6m), (b) 1 General and 3 Specific Objectives (6m), (c) A labeled Conceptual Framework diagram showing Independent and Dependent Variables (8m), and (d) Justify an appropriate Sampling Technique & Data Collection Instrument (10m).',
        tip: 'Specific objectives must use measurable action verbs: "To assess...", "To determine...", "To evaluate...", "To design...".',
      },
      {
        section: 'Section B (20 Marks)',
        question: 'Compare Questionnaires and Interviews as data collection instruments in computing research (10m). Discuss 5 ethical issues in computing research involving human participants and explain how NACOSTI / Institutional Ethics Review boards enforce them (10m).',
        tip: 'Explicitly mention Informed Consent, Confidentiality vs Anonymity, Plagiarism, Data Fabrication, and Right to Withdraw.',
      },
    ],
  },
  {
    courseId: 'kcau-33251',
    code: 'CPP 2104',
    title: 'Object-Oriented Technologies',
    examDate: 'Thu, Dec 10 · 17:00–19:00',
    lecturer: 'Beatrice Muthoni Kagucia',
    legacyCodes: ['BIT 2108', 'BBIT 203', 'BAC 2101', 'BSD 2102', 'BISF 2101', 'CPP 2201'],
    moodleUrl: 'https://virtualcampus.kcau.ac.ke/course/view.php?id=33251',
    searchLinks: [
      {
        label: 'Google PDF Search (BIT 2108 / BAC 2101 / CPP 2201)',
        platform: 'Google PDF',
        url: 'https://www.google.com/search?q=%22KCA+University%22+%28%22BIT+2108%22+OR+%22BAC+2101%22+OR+%22CPP+2201%22+OR+%22Object+Oriented+Programming%22%29+exam+filetype%3Apdf',
      },
      {
        label: 'Studocu KCA OOP Search',
        platform: 'Studocu',
        url: 'https://www.studocu.com/row/search/KCA+University+BIT+2108+Object+Oriented+Programming',
      },
      {
        label: 'Scribd KCA OOP Papers',
        platform: 'Scribd',
        url: 'https://www.scribd.com/search?query=KCA%20University%20BIT%202108%20Object%20Oriented',
      },
      {
        label: 'Masomo Msingi / Kenyaplex Bank',
        platform: 'Kenyaplex / Masomo',
        url: 'https://www.google.com/search?q=site%3Akenyaplex.com+OR+site%3Amasomomsingi.com+%22KCA%22+%22BIT+2108%22',
      },
    ],
    highYieldTopics: [
      'OOP 4 Pillars: Abstraction, Encapsulation, Inheritance, Polymorphism (Runtime vs Compile-time)',
      'Member Visibility & Inheritance Derivation Table (Public, Protected, Private base class derivations)',
      'Constructors (Parameterized, Default, Copy) and Destructors (~ClassName)',
      'Friend Functions, Inline Functions & Static Class Members in C++',
      'File Handling (ifstream, ofstream, fstream) with persistent text files (e.g., calllogs.txt)',
    ],
    mockQuestions: [
      {
        section: 'Question 1 (Compulsory - 20 Marks) [Real KCA Exam - Aug 2024 / Aug 2025]',
        question: 'a) Define the 4 OOP principles and explain their importance (4 Marks). b) Copy and complete the table to show child class visibility of inherited members under Protected, Public, and Private derivation from Public, Private, and Protected parent members (9 Marks). c) Explain the circumstances under which Struct, Class, and Union are most applicable in OOP (6 Marks). d) Explain the terms state and behavior (2 Marks).',
        tip: 'Table Rule: Private parent members are NEVER accessible in derived classes. Under public derivation: public stays public, protected stays protected. Under protected derivation: both become protected. Under private derivation: both become private.',
      },
      {
        section: 'Question 2 (15 Marks) [Real KCA Exam - Class E-Shamba / BankAccount]',
        question: 'a) Write a C++ program implementing class E-Shamba containing two variables, unparameterized and parameterized constructors initializing objects S1(13,19) and S2(25,35), and method Area() to determine and output their areas (8 Marks). b) Design a C++ BankAccount class with private attributes accountNumber and balance, and public methods deposit(), withdraw(), and display() (6 Marks).',
        tip: 'Show explicit constructor definitions: EShamba() : length(0), width(0) {} and EShamba(int l, int w) : length(l), width(w) {}.',
      },
      {
        section: 'Question 3 (15 Marks) [Real KCA Exam - Call Log Receipt File Handling]',
        question: 'Scenario: Express Call Centre Ltd in Nairobi Call Log Receipt (Log No: 5558, Caller: Samuel Otieno, Duration: 15 mins, Charge: KES 150.00). a) Define C++ class CallLog with private attributes: logNo, callerName, callReason, duration, charge. Include public input and display methods (5 Marks). b) Explain how encapsulation protects caller data (3 Marks). c) Write a C++ code segment to open "calllogs.txt" and write one call log record to it using ofstream (4 Marks).',
        tip: 'Use #include <fstream>; ofstream outfile("calllogs.txt", ios::app); outfile << logNo << " " << callerName ...; outfile.close();',
      },
      {
        section: 'Question 4 (15 Marks) [Real KCA Exam - Polymorphism & Pure Virtual Functions]',
        question: 'a) Describe THREE benefits of polymorphism in OOP (3 Marks). b) Using a code example, describe the use of a pure virtual function (virtual void show() = 0;) in C++ and explain abstract base classes (5 Marks). c) Write a C++ program that uses overloaded function compute() to calculate area or volume based on argument count (compute(15,6) vs compute(7,5,10)) (7 Marks).',
        tip: 'Pure virtual functions force derived classes to provide concrete implementations, enabling runtime dynamic dispatch.',
      },
    ],
  },
];

export const REVISION_SPRINT_DAYS: RevisionDay[] = [
  // ==================== PHASE 1: FULL SYLLABUS MASTERY (NOV 18 – NOV 24) ====================
  {
    dayNumber: 1,
    date: '2026-11-18',
    dayLabel: 'Wed, Nov 18',
    phase: 'phase1',
    phaseTag: 'Phase 1 · Mastery',
    headline: 'Kickoff: STU 1201 Foundations + CUU 1202 Logic & Fallacies',
    blocks: [
      {
        id: 'd1-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33500',
        courseCode: 'STU 1201',
        title: 'Lectures 1–4: Programming Concepts, Paradigms & PDLC',
        tasks: 'Read Guides L1–L4. Master IPOS cycle, Compiler vs Interpreter, Paradigms comparison table, and 6 PDLC stages.',
        kind: 'study',
      },
      {
        id: 'd1-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-33605',
        courseCode: 'CUU 1202',
        title: 'Lectures 1–2: Critical Thinking Origins, Arguments & Fallacies',
        tasks: 'Read Guides L1–L2. Master Deductive vs Inductive reasoning, Validity vs Soundness, and memorize 10 core informal fallacies.',
        kind: 'study',
      },
      {
        id: 'd1-b3',
        slot: 'Evening (19:30–21:00)',
        courseId: 'kcau-33500',
        courseCode: 'STU 1201',
        title: 'Handwritten Flowchart & Pseudocode Active Drill',
        tasks: 'Closed-book on paper: Draw flowcharts + pseudocode for (1) Grade Calculator, (2) Largest of 3 numbers, (3) Even/Odd sum loop.',
        kind: 'recall',
      },
    ],
  },
  {
    dayNumber: 2,
    date: '2026-11-19',
    dayLabel: 'Thu, Nov 19',
    phase: 'phase1',
    phaseTag: 'Phase 1 · Mastery',
    headline: 'C Language Core (STU 1201) + Early Web Design Push (STU 1202)',
    blocks: [
      {
        id: 'd2-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33500',
        courseCode: 'STU 1201',
        title: 'Lectures 5–8: Toolchain, C Structure, Lexical Elements & Data Types',
        tasks: 'Read Guides L5–L8. Lock in #include, main(), identifiers rules, int/float/double/char sizes & format specifiers.',
        kind: 'study',
      },
      {
        id: 'd2-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-33501',
        courseCode: 'STU 1202',
        title: 'Lessons 1–4: Internet Services, Web Project Mgmt, UI/UX & HTML Basics',
        tasks: 'Read Guides L1–L4. Front-load STU 1202 early because of the tight Dec 4→5 turnaround!',
        kind: 'study',
      },
      {
        id: 'd2-b3',
        slot: 'Evening (19:30–21:00)',
        courseId: 'kcau-33500',
        courseCode: 'STU 1201',
        title: 'Handwritten C Syntax Drills',
        tasks: 'Write 5 short C programs strictly on paper (no IDE autocomplete): VAT calc, temp converter, circle area, char ASCII check.',
        kind: 'recall',
      },
    ],
  },
  {
    dayNumber: 3,
    date: '2026-11-20',
    dayLabel: 'Fri, Nov 20',
    phase: 'phase1',
    phaseTag: 'Phase 1 · Mastery',
    headline: 'Operators & Control Flow (STU 1201) + HTML Core + Creative Thinking',
    blocks: [
      {
        id: 'd3-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33500',
        courseCode: 'STU 1201',
        title: 'Lectures 9–10 + Loops: Typecasting, Operators, if/else, switch & Loops',
        tasks: 'Read Guides L9–L10. Master operator precedence, ++i vs i++, implicit vs explicit casting, for/while/do-while dry runs.',
        kind: 'study',
      },
      {
        id: 'd3-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-33501',
        courseCode: 'STU 1202',
        title: 'Lessons 6–9: Text Formatting, Hex Colours, Lists & Images',
        tasks: 'Read Guides L6–L9. Master <ol>/<ul>/<dl>, hex color codes, <img> attributes (alt, width, relative paths).',
        kind: 'study',
      },
      {
        id: 'd3-b3',
        slot: 'Evening (19:30–21:00)',
        courseId: 'kcau-33605',
        courseCode: 'CUU 1202',
        title: 'Lectures 3–4: Creative Thinking & Cognitive Biases',
        tasks: 'Read Guides L3–L4. Summarize Divergent vs Convergent thinking and 6 key cognitive biases with IT examples.',
        kind: 'study',
      },
    ],
  },
  {
    dayNumber: 4,
    date: '2026-11-21',
    dayLabel: 'Sat, Nov 21',
    phase: 'phase1',
    phaseTag: 'Phase 1 · Mastery',
    headline: 'HTML Forms & Tables (STU 1202) + C Functions/Arrays (STU 1201)',
    blocks: [
      {
        id: 'd4-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33501',
        courseCode: 'STU 1202',
        title: 'Lessons 10–13: Hyperlinks, Web Forms, HTML Tables & Iframes',
        tasks: 'Read Guides L10–L13. High-exam-probability! Practice colspan/rowspan tables and GET vs POST HTML forms.',
        kind: 'study',
      },
      {
        id: 'd4-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-33500',
        courseCode: 'STU 1201',
        title: 'C Functions, Arrays, Strings & Trace Tables',
        tasks: 'Write C functions (pass-by-value vs reference), 1D array traversal/sum/max, and complete 4 loop trace tables by hand.',
        kind: 'study',
      },
      {
        id: 'd4-b3',
        slot: 'Evening (19:30–21:00)',
        courseId: 'kcau-33501',
        courseCode: 'STU 1202',
        title: 'Paper HTML Coding Drill',
        tasks: 'Closed-book: Hand-code a complete student registration form + 4×4 timetable with rowspan & colspan.',
        kind: 'recall',
      },
    ],
  },
  {
    dayNumber: 5,
    date: '2026-11-22',
    dayLabel: 'Sun, Nov 22',
    phase: 'phase1',
    phaseTag: 'Phase 1 · Mastery',
    headline: 'CSS Mastery (STU 1202 Done!) + CUU 2102 Start + CUU 1202 Finish',
    blocks: [
      {
        id: 'd5-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33501',
        courseCode: 'STU 1202',
        title: 'Lesson 14: CSS Box Model, Selectors, Flexbox, Grid & Media Queries',
        tasks: 'Complete final STU 1202 guide! Master Inline/Internal/External CSS, specificity, Box Model diagram & @media syntax.',
        kind: 'study',
      },
      {
        id: 'd5-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-32622',
        courseCode: 'CUU 2102',
        title: 'Guides 1–2: Info Literacy Intro, Boolean Search & Scholarly Databases',
        tasks: 'Read Guides 1–2. Master Primary/Secondary/Tertiary sources, Boolean AND/OR/NOT, phrase search & truncation.',
        kind: 'study',
      },
      {
        id: 'd5-b3',
        slot: 'Evening (19:30–21:00)',
        courseId: 'kcau-33605',
        courseCode: 'CUU 1202',
        title: 'Lectures 5–6: Source Credibility, Decision Frameworks & Group Dynamics',
        tasks: 'Finish all 6 CUU 1202 guides! Build a 1-page Master Summary covering Arguments, Fallacies, Biases & Decision Steps.',
        kind: 'study',
      },
    ],
  },
  {
    dayNumber: 6,
    date: '2026-11-23',
    dayLabel: 'Mon, Nov 23',
    phase: 'phase1',
    phaseTag: 'Phase 1 · Mastery',
    headline: 'Research Methodology Part 1 (STU 2102) + CUU 2102 Finish & APA Drill',
    blocks: [
      {
        id: 'd6-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33505',
        courseCode: 'STU 2102',
        title: 'Guides 1–5: Intro, Research Problem, Lit Review, Design & Questionnaires',
        tasks: 'Read Guides L1–L5a. Focus on writing sharp Problem Statements, SMART Specific Objectives & Research Designs.',
        kind: 'study',
      },
      {
        id: 'd6-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-32622',
        courseCode: 'CUU 2102',
        title: 'Guides 3–4: CRAAP Test, Academic Integrity & APA 7th Referencing',
        tasks: 'Finish all 4 CUU 2102 guides! Memorize ACRL standards, CRAAP dimensions, plagiarism types & APA 7th rules.',
        kind: 'study',
      },
      {
        id: 'd6-b3',
        slot: 'Evening (19:30–21:00)',
        courseId: 'kcau-32622',
        courseCode: 'CUU 2102',
        title: 'Handwritten APA 7th Edition Reference Gauntlet',
        tasks: 'Format 8 raw sources by hand (1-author book, 2-author journal, 3+ authors et al., website, conference paper) + verify punctuation.',
        kind: 'recall',
      },
    ],
  },
  {
    dayNumber: 7,
    date: '2026-11-24',
    dayLabel: 'Tue, Nov 24',
    phase: 'phase1',
    phaseTag: 'Phase 1 · Mastery',
    headline: 'TODAY: Lock Missing C++ OOP (CPP 2104 U3–U5) & C Pointers/Loops (STU 1201 L11–L13)',
    blocks: [
      {
        id: 'd7-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33500',
        courseCode: 'STU 1201',
        title: 'NEW Guides L11–L13: C Loops, Functions/Macros, Arrays, Pointers & Structs',
        tasks: '[2×50m/10m Pomodoro] Read Guides L11–L13 + Paper C1–C4. Master #define square(x) trap (64), pointer trace (400 400), overtime pay & struct person BMI. Cards 6–10.',
        kind: 'study',
      },
      {
        id: 'd7-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-33251',
        courseCode: 'CPP 2104',
        title: 'NEW Guides U3–U4: Struct/Class/Union, Constructors & 9-Mark Visibility Matrix',
        tasks: '[2×45m/10m Pomodoro] Read Guides U3–U4 + Paper B1 (Aug 2024). Memorize the 3×3 Inheritance Visibility Table & code E-Shamba(13,19) + Friend 16% VAT. Cards 1–3.',
        kind: 'study',
      },
      {
        id: 'd7-b3',
        slot: 'Evening (19:30–21:00)',
        courseId: 'kcau-33251',
        courseCode: 'CPP 2104',
        title: 'NEW Guide U5: Pure Virtual Functions, Polymorphism & fstream File I/O',
        tasks: '[2×40m/10m Pomodoro] Read Guide U5 + Paper B2 (Aug 2025) & B3 (Nov 2025). Write CallLog + calllogs.txt ofstream code & Person->Employee->Manager. Cards 4–5.',
        kind: 'study',
      },
    ],
  },

  // ==================== PHASE 2: KCA PAST PAPERS & TIMED MOCKS (NOV 25 – NOV 30) ====================
  {
    dayNumber: 8,
    date: '2026-11-25',
    dayLabel: 'Wed, Nov 25',
    phase: 'phase2',
    phaseTag: 'Phase 2 · Past Papers',
    headline: 'STU 1201 Timed Mock #1 (Papers C1–C4) + CUU 1202 Exam Synthesis (L7)',
    blocks: [
      {
        id: 'd8-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33500',
        courseCode: 'STU 1201',
        title: 'Timed 2-Hour Closed-Book Exam Simulation #1 (Paper C1 + C3 — 70 Marks)',
        tasks: '[Strict 120m Timer] Handwritten on foolscap: Q1 compulsory (30m in 50m) + 2 Section B Qs (40m in 64m) + 6m audit. Covers overtime pay, 2D arrays, pointers & functions.',
        kind: 'mock',
      },
      {
        id: 'd8-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-33605',
        courseCode: 'CUU 1202',
        title: 'NEW Guide L7: Syllogisms (Valid/Sound), 10 Fallacies, SCAMPER & 6 Hats',
        tasks: '[2×45m/10m Pomodoro] Read Guide L7. Drill Valid vs Sound, Strong vs Cogent, 10 informal fallacies + cognitive biases. Review Flashcards 26–30 (Day 1 SR).',
        kind: 'study',
      },
      {
        id: 'd8-b3',
        slot: 'Evening (19:30–21:00)',
        courseId: 'kcau-33500',
        courseCode: 'STU 1201',
        title: 'Mock #1 Brutal Autopsy + 1-Page C Syntax & Pointer Cheat Sheet',
        tasks: '[2×40m/10m] Grade against L11–L13 & Practice Bank PQ-02, PQ-06, PQ-07. Re-write every missed loop/pointer snippet. Spaced Repetition: Cards 1–10.',
        kind: 'recall',
      },
    ],
  },
  {
    dayNumber: 9,
    date: '2026-11-26',
    dayLabel: 'Thu, Nov 26',
    phase: 'phase2',
    phaseTag: 'Phase 2 · Past Papers',
    headline: 'STU 1202 (Guide L15 + Papers D1–D4) & CUU 1202 Timed Mock #1',
    blocks: [
      {
        id: 'd9-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33501',
        courseCode: 'STU 1202',
        title: 'NEW Guide L15 + Timed Web Design Mock #1 (Papers D1, D2, D4 — 70 Marks)',
        tasks: '[45m Guide L15 + 90m Mock] Master JS onFocus/onSubmit/validateForm, HTML colspan/rowspan table drawing, Radio/Checkbox/Select, GIF vs JPEG, XML/SGML. Cards 16–20.',
        kind: 'mock',
      },
      {
        id: 'd9-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-33605',
        courseCode: 'CUU 1202',
        title: 'Timed 2-Hour Critical Thinking Mock #1 (70 Marks)',
        tasks: '[Strict 120m Timer] Handwritten exam: 10 fallacy scenarios, deductive vs inductive syllogisms, SCAMPER IT redesign & 6 Thinking Hats case essay.',
        kind: 'mock',
      },
      {
        id: 'd9-b3',
        slot: 'Evening (19:30–21:00)',
        courseId: 'kcau-33605',
        courseCode: 'CUU 1202',
        title: 'Dual Mock Autopsy + Spaced Repetition (Day 3: Cards 1–10 & 16–20)',
        tasks: '[2×40m/10m] Fix HTML/JS syntax slips & weak fallacies. Drill Flashcards 1–10 (Day 3 revisit) + 16–20 + 26–30 until ≥ 85% accuracy.',
        kind: 'recall',
      },
    ],
  },
  {
    dayNumber: 10,
    date: '2026-11-27',
    dayLabel: 'Fri, Nov 27',
    phase: 'phase2',
    phaseTag: 'Phase 2 · Past Papers',
    headline: 'CUU 2102 (Guides P5–P6 + Papers A1–A5) & STU 2102 (Guide L12 + Papers E1–E3)',
    blocks: [
      {
        id: 'd10-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-32622',
        courseCode: 'CUU 2102',
        title: 'NEW Guides P5–P6 + Timed Mock #1 (Papers A2 Apr 2026 & A3 Aug 2025)',
        tasks: '[45m Guides P5–P6 + 90m Timed Paper] Solve Maria AI Ethics Case Study (15m), Boolean Renewable Energy query (10m), APA in-text vs end-references (10m) & CRAAP. Cards 11–15.',
        kind: 'mock',
      },
      {
        id: 'd10-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-33505',
        courseCode: 'STU 2102',
        title: 'NEW Guide L12 + Timed Research Mock #1 (Papers E1, E2, E3 — 70 Marks)',
        tasks: '[45m Guide L12 + 90m Timed Paper] Drill 4 Sub-Problem traits, H0 vs H1, 5 Validity types vs Reliability, Tool/Method/Methodology/Framework (20m) & Proposal Ch 1–3. Cards 21–25.',
        kind: 'mock',
      },
      {
        id: 'd10-b3',
        slot: 'Evening (19:30–21:00)',
        courseId: 'kcau-33505',
        courseCode: 'STU 2102',
        title: 'Dual Mock Autopsy + APA 7th & Research Proposal Blueprint Lock-In',
        tasks: '[2×40m/10m] Verify APA punctuation (Book, Journal, Website) & lock in the 5-part Computing Research Proposal template. SR Review: Cards 11–15, 21–25.',
        kind: 'recall',
      },
    ],
  },
  {
    dayNumber: 11,
    date: '2026-11-28',
    dayLabel: 'Sat, Nov 28',
    phase: 'phase2',
    phaseTag: 'Phase 2 · Past Papers',
    headline: 'CPP 2104 Timed Mock #1 (Papers B1–B5) + STU 1202 Cheat Sheet Lock',
    blocks: [
      {
        id: 'd11-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33251',
        courseCode: 'CPP 2104',
        title: 'Timed 2-Hour OOP & UML Mock #1 (Papers B1 Aug 2024 + B2 Aug 2025)',
        tasks: '[Strict 120m Timer] 9-Mark Visibility Table (under 3m) + E-Shamba constructors + CallLog & calllogs.txt ofstream + Pure Virtual function + UML Class Diagram with ruler.',
        kind: 'mock',
      },
      {
        id: 'd11-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-33501',
        courseCode: 'STU 1202',
        title: 'STU 1202 1-Page Master Cheat Sheet (Defusing the Dec 4→5 Turnaround!)',
        tasks: '[2×45m/10m] Distill all 14 Web Design lessons (HTML5 tags, forms, colspan/rowspan, CSS Box Model, JS onSubmit/onFocus) onto 1 front-and-back sheet. Cards 16–20 (Day 3 SR).',
        kind: 'recall',
      },
      {
        id: 'd11-b3',
        slot: 'Evening (19:30–21:00)',
        courseId: 'kcau-33251',
        courseCode: 'CPP 2104',
        title: 'CPP 2104 Autopsy + Rapid Recall (All 30 Flashcards Sweep #1)',
        tasks: '[2×40m/10m] Fix any C++ syntax/UML arrow errors, then run all 30 Exam Flashcards in the Past Papers Hub — flag every card you hesitated on.',
        kind: 'recall',
      },
    ],
  },
  {
    dayNumber: 12,
    date: '2026-11-29',
    dayLabel: 'Sun, Nov 29',
    phase: 'phase2',
    phaseTag: 'Phase 2 · Past Papers',
    headline: 'Diagnostic Checkpoint + Papers 1 & 2 Final Lock-In (48 Hours to Exam #1)',
    blocks: [
      {
        id: 'd12-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33500',
        courseCode: 'STU 1201',
        title: 'Timed 2-Hour STU 1201 Mock #2 (Paper C2 + C4 — Target ≥ 80%)',
        tasks: '[Strict 120m Timer] Complete BIT 1304 Aug 2014 paper: Preprocessors, pointer trace, 4×3 matrix add, math.h expressions, struct person BMI. Target: 50m Q1, 32m Q2, 32m Q3.',
        kind: 'mock',
      },
      {
        id: 'd12-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-33605',
        courseCode: 'CUU 1202',
        title: 'CUU 1202 Full Mock #2 + 4-Part Essay Structure Drill (Target ≥ 80%)',
        tasks: '[2×50m/10m] Drill PQ-12 + 2 full applied essays using Definition → Principle → IT Example → Critical Evaluation. Review Cards 26–30 (Day 5 SR).',
        kind: 'mock',
      },
      {
        id: 'd12-b3',
        slot: 'Evening (19:30–21:00)',
        courseCode: 'DIAGNOSTIC',
        title: '6-Point Readiness Diagnostic + Exam Logistics Check',
        tasks: 'Complete the 6-Point Diagnostic Checklist above! Print/verify Exam Card (confirm CUU 1202 date!), Student ID, and patch any <80% topics from STU 1201 & CUU 1202.',
        kind: 'recall',
      },
    ],
  },
  {
    dayNumber: 13,
    date: '2026-11-30',
    dayLabel: 'Mon, Nov 30',
    phase: 'phase2',
    phaseTag: 'Phase 2 · Final Prep',
    headline: 'Exam Eve: Sharp Calibration for STU 1201 & CUU 1202 + Full 8-Hr Sleep',
    blocks: [
      {
        id: 'd13-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33500',
        courseCode: 'STU 1201',
        title: 'Final STU 1201 Walkthrough (Guides L1–L13) & 5 Trace-Table Warmups',
        tasks: '[2×45m/10m] Review 1-page C Cheat Sheet, dry-run 5 tricky loops/pointers/macros (`64/square(4)`), review Cards 6–10 (Day 7 SR — target 100%).',
        kind: 'recall',
      },
      {
        id: 'd13-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-33605',
        courseCode: 'CUU 1202',
        title: 'CUU 1202 Calm Active Recall (Pre-Loading Paper 2)',
        tasks: '[2×40m/10m] Recite 10 fallacies, Valid/Sound vs Strong/Cogent, SCAMPER & 6 Thinking Hats aloud (Guide L7 + Cards 26–30) so Wed Dec 2 is effortless.',
        kind: 'recall',
      },
      {
        id: 'd13-b3',
        slot: 'Evening (19:30–21:00)',
        courseCode: 'REST & PACK',
        title: 'Pack Exam Kit & Mandatory 8-Hour Sleep',
        tasks: 'Pack Student ID, Exam Card, 2 blue/black pens, pencil, ruler. Close books by 21:00 — rested brains outperform fatigued crammers by 15%+!',
        kind: 'rest',
      },
    ],
  },

  // ==================== PHASE 3: EXAM WEEK PRECISION WARFARE (DEC 1 – DEC 10) ====================
  {
    dayNumber: 14,
    date: '2026-12-01',
    dayLabel: 'Tue, Dec 1',
    phase: 'phase3',
    phaseTag: 'Exam #1 · STU 1201',
    headline: 'EXAM #1: STU 1201 Introduction to Programming (17:00–19:00)',
    isExamDay: true,
    examCode: 'STU 1201',
    blocks: [
      {
        id: 'd14-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33500',
        courseCode: 'STU 1201',
        title: 'Light 90-Min Syntax & Pitfall Warmup (Zero Cramming)',
        tasks: 'Skim C program template, operator precedence, data types & flowchart symbols. Eat a proper lunch and hydrate.',
        kind: 'recall',
      },
      {
        id: 'd14-b2',
        slot: 'Exam Slot',
        courseId: 'kcau-33500',
        courseCode: 'STU 1201',
        title: 'EXAM #1 · Session #36 · 17:00 – 19:00 HRS',
        tasks: 'MAIN: STUDENT CENTRE | TOWN: Main Hall GF | KITENGELA: RM 4-10–4-11 | KSM: HALL. Arrive 30 mins early!',
        kind: 'exam',
      },
      {
        id: 'd14-b3',
        slot: 'Evening (19:30–21:00)',
        courseId: 'kcau-33605',
        courseCode: 'CUU 1202',
        title: '45-Min Calm Pivot to CUU 1202 + Early Sleep',
        tasks: 'Do NOT post-mortem STU 1201! Review your 1-page CUU 1202 fallacies & reasoning summary, then sleep early.',
        kind: 'recall',
      },
    ],
  },
  {
    dayNumber: 15,
    date: '2026-12-02',
    dayLabel: 'Wed, Dec 2',
    phase: 'phase3',
    phaseTag: 'Exam #2 · CUU 1202',
    headline: 'EXAM #2: CUU 1202 Critical & Creative Thinking (17:00–19:00)',
    isExamDay: true,
    examCode: 'CUU 1202',
    blocks: [
      {
        id: 'd15-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33605',
        courseCode: 'CUU 1202',
        title: 'Final Active Recall: Fallacies, Syllogisms & Decision Frameworks',
        tasks: 'Review all 6 CUU 1202 guides highlights & practice structuring 20-mark applied essays cleanly.',
        kind: 'recall',
      },
      {
        id: 'd15-b2',
        slot: 'Exam Slot',
        courseId: 'kcau-33605',
        courseCode: 'CUU 1202',
        title: 'EXAM #2 · Session #40 · 17:00 – 19:00 HRS',
        tasks: 'MAIN: STUDENT CENTRE | TOWN: Main Hall GF | KITENGELA: RM 4-10–4-11 | KSM: HALL. Structure every essay with headings!',
        kind: 'exam',
      },
      {
        id: 'd15-b3',
        slot: 'Evening (19:30–21:00)',
        courseCode: 'RECOVERY',
        title: 'Full Mental Decompression (2/6 Papers Down!)',
        tasks: 'Zero studying tonight. Eat well, relax, and get 8+ hours sleep before Thursday’s strategic gap day.',
        kind: 'rest',
      },
    ],
  },
  {
    dayNumber: 16,
    date: '2026-12-03',
    dayLabel: 'Thu, Dec 3',
    phase: 'phase3',
    phaseTag: 'Phase 3 · Gap Day',
    headline: 'Strategic Gap Day: Lock CUU 2102 + Pre-Arm STU 1202 for Sat Morning',
    blocks: [
      {
        id: 'd16-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-32622',
        courseCode: 'CUU 2102',
        title: 'Full CUU 2102 Mock #2 (Papers A1, A2, A5) + APA 7th Perfection Drill',
        tasks: '[2×50m/10m] Drill Maria AI Ethics Case, John Plagiarism Case, Boolean query, Big6 vs SCONUL, Coherence/Cohesion & APA 7th by hand. Cards 11–15.',
        kind: 'mock',
      },
      {
        id: 'd16-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-33501',
        courseCode: 'STU 1202',
        title: 'STU 1202 Pre-Arm Sprint (Guides L10–L15 + Papers D1–D4)',
        tasks: 'CRITICAL: Drill HTML5 Forms, colspan/rowspan table drawing, CSS Box Model & JS onFocus/onSubmit validation TODAY so Dec 4 night is just a 45m scan! Cards 16–20.',
        kind: 'mock',
      },
      {
        id: 'd16-b3',
        slot: 'Evening (19:30–21:00)',
        courseId: 'kcau-32622',
        courseCode: 'CUU 2102',
        title: 'CUU 2102 1-Page Master Recall',
        tasks: 'Closed-book check of ACRL/SCONUL standards, source types & APA citation formats.',
        kind: 'recall',
      },
    ],
  },
  {
    dayNumber: 17,
    date: '2026-12-04',
    dayLabel: 'Fri, Dec 4',
    phase: 'phase3',
    phaseTag: 'Exam #3 · CUU 2102',
    headline: 'EXAM #3: CUU 2102 Info Literacy (17:00–19:00) → Smart Pivot to STU 1202',
    isExamDay: true,
    examCode: 'CUU 2102',
    blocks: [
      {
        id: 'd17-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-32622',
        courseCode: 'CUU 2102 / STU 1202',
        title: 'Split Warmup: 60m CUU 2102 Final Scan + 60m STU 1202 CSS/HTML Flash',
        tasks: 'Review APA 7th rules & CRAAP framework first, then refresh HTML tags & CSS properties for Saturday morning.',
        kind: 'recall',
      },
      {
        id: 'd17-b2',
        slot: 'Exam Slot',
        courseId: 'kcau-32622',
        courseCode: 'CUU 2102',
        title: 'EXAM #3 · Session #48 · 17:00 – 19:00 HRS',
        tasks: 'MAIN: STUDENT CENTRE | TOWN: Main Hall GF | KITENGELA: RM 4-10–4-11 | KSM: HALL.',
        kind: 'exam',
      },
      {
        id: 'd17-b3',
        slot: 'Evening (19:30–21:00)',
        courseId: 'kcau-33501',
        courseCode: 'STU 1202',
        title: '60-Min STU 1202 Cheat Sheet Scan + Hard Stop 21:30',
        tasks: 'Scan your 1-page HTML/CSS sheet (tables, forms, Box Model, media queries). Sleep early — STU 1202 is at 11:00 AM!',
        kind: 'recall',
      },
    ],
  },
  {
    dayNumber: 18,
    date: '2026-12-05',
    dayLabel: 'Sat, Dec 5',
    phase: 'phase3',
    phaseTag: 'Exam #4 · STU 1202',
    headline: 'EXAM #4 (MORNING!): STU 1202 Web Design & Development (11:00–13:00)',
    isExamDay: true,
    examCode: 'STU 1202',
    blocks: [
      {
        id: 'd18-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33501',
        courseCode: 'STU 1202',
        title: '08:00–09:30 Quick Tag & CSS Refresh → Depart Early',
        tasks: 'Double-check <!DOCTYPE html>, form input types, table colspan/rowspan & CSS Box Model. Be at venue by 10:30 AM!',
        kind: 'recall',
      },
      {
        id: 'd18-b2',
        slot: 'Exam Slot',
        courseId: 'kcau-33501',
        courseCode: 'STU 1202',
        title: 'EXAM #4 · Session #50 · 11:00 – 13:00 HRS (MORNING)',
        tasks: 'MAIN: STUDENT CENTRE | TOWN: Main Hall GF | KITENGELA: RM 4-10–4-11 | KSM: HALL. Indent handwritten HTML cleanly!',
        kind: 'exam',
      },
      {
        id: 'd18-b3',
        slot: 'Afternoon (14:00–16:00)',
        courseCode: 'RECOVERY',
        title: 'Afternoon Reset (4/6 Papers Conquered!)',
        tasks: 'Take the afternoon & evening off to recharge completely before Sunday’s focused STU 2102 revision day.',
        kind: 'rest',
      },
    ],
  },
  {
    dayNumber: 19,
    date: '2026-12-06',
    dayLabel: 'Sun, Dec 6',
    phase: 'phase3',
    phaseTag: 'Phase 3 · Gap Day',
    headline: 'Full STU 2102 Siege Day (All 12 Guides + Papers E1, E2, E3)',
    blocks: [
      {
        id: 'd19-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33505',
        courseCode: 'STU 2102',
        title: 'Deep Review L1–L6 + Guide L12: Sub-Problems, Hypotheses & Validity',
        tasks: '[2×50m/10m] Drill 4 Sub-Problem traits, H0 vs H1, 5 Validity types vs Reliability, Descriptive vs Inferential stats & Systematic vs Cluster sampling. Cards 21–25.',
        kind: 'study',
      },
      {
        id: 'd19-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-33505',
        courseCode: 'STU 2102',
        title: 'Timed STU 2102 Mock #2 (Papers E1 Aug 2011 + E2 Apr 2012 + E3 Aug 2012)',
        tasks: '[90m Timed] Tool vs Method vs Methodology vs Framework (20m), Proposal vs Report, 6 Literature Review roles, Action Research & Ethics.',
        kind: 'mock',
      },
      {
        id: 'd19-b3',
        slot: 'Evening (19:30–21:00)',
        courseId: 'kcau-33505',
        courseCode: 'STU 2102',
        title: '20-Min Mini-Proposal Speed Drill + Operational Definitions',
        tasks: 'Write Title, Problem Statement, 3 SMART Objectives, H0/H1, Conceptual Framework (IV/DV/Moderator) & Delimitations in 20 mins flat.',
        kind: 'recall',
      },
    ],
  },
  {
    dayNumber: 20,
    date: '2026-12-07',
    dayLabel: 'Mon, Dec 7',
    phase: 'phase3',
    phaseTag: 'Exam #5 · STU 2102',
    headline: 'EXAM #5: STU 2102 Computing Research (17:00–19:00 · MAIN: TC 3RD FLR!)',
    isExamDay: true,
    examCode: 'STU 2102',
    blocks: [
      {
        id: 'd20-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33505',
        courseCode: 'STU 2102',
        title: 'Calm Final Scan: Research Designs, Sampling & Ethical Principles',
        tasks: 'Review key terminology & verify venue shift — at MAIN Campus this paper is on TC 3RD FLR!',
        kind: 'recall',
      },
      {
        id: 'd20-b2',
        slot: 'Exam Slot',
        courseId: 'kcau-33505',
        courseCode: 'STU 2102',
        title: 'EXAM #5 · Session #60 · 17:00 – 19:00 HRS',
        tasks: '⚠️ MAIN VENUE CHANGE: TC 3RD FLR | TOWN: Main Hall GF | KITENGELA: RM 4-10–4-11 | KSM: HALL.',
        kind: 'exam',
      },
      {
        id: 'd20-b3',
        slot: 'Evening (19:30–21:00)',
        courseCode: 'RECOVERY',
        title: 'Unwind — 5/6 Done, Only the Final Boss Left!',
        tasks: 'Rest well tonight. You have 2 full open days (Tue & Wed) dedicated exclusively to acing CPP 2104!',
        kind: 'rest',
      },
    ],
  },
  {
    dayNumber: 21,
    date: '2026-12-08',
    dayLabel: 'Tue, Dec 8',
    phase: 'phase3',
    phaseTag: 'Final Boss · Day 1',
    headline: 'CPP 2104 Deep Dive: UML (U1–U2) + C++ OOP Core & Visibility Matrix (U3–U4)',
    blocks: [
      {
        id: 'd21-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33251',
        courseCode: 'CPP 2104',
        title: 'Guides U1–U2 (UML Diagrams) + Guide U3 (Classes, Structs & Constructors)',
        tasks: '[2×50m/10m] Draw UML Class Diagrams with ruler (Aggregation vs Composition). Write C++ classes E-Shamba, BankAccount, Rectangle & Student from memory.',
        kind: 'study',
      },
      {
        id: 'd21-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-33251',
        courseCode: 'CPP 2104',
        title: 'Guide U4–U5: 9-Mark Visibility Matrix, Friend/Virtual & fstream File I/O',
        tasks: '[2×50m/10m] Lock 3×3 Visibility Matrix (90s blank-page test), Friend 16% VAT, Multilevel Person->Employee->Manager, Pure Virtual & calllogs.txt ofstream. Cards 1–5.',
        kind: 'study',
      },
      {
        id: 'd21-b3',
        slot: 'Evening (19:30–21:00)',
        courseId: 'kcau-33251',
        courseCode: 'CPP 2104',
        title: 'Handwritten C++ Code Speed Drill (Papers B1, B2, B3)',
        tasks: 'Write 4 complete C++ exam snippets on foolscap without notes: compute() overloading, pure virtual Shape, CallLog file write, Vehicle getters/setters.',
        kind: 'recall',
      },
    ],
  },
  {
    dayNumber: 22,
    date: '2026-12-09',
    dayLabel: 'Wed, Dec 9',
    phase: 'phase3',
    phaseTag: 'Final Boss · Day 2',
    headline: 'CPP 2104 Timed Mock #2 (Papers B3 Nov 2025 + B5 Dec 2025) & Final Lock',
    blocks: [
      {
        id: 'd22-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33251',
        courseCode: 'CPP 2104',
        title: 'Timed 2-Hour Closed-Book CPP 2104 Mock #2 (Target ≥ 85%)',
        tasks: '[Strict 120m Timer] Paper B3 (CPP 2201 Nov 2025) + Paper B5 (Dec 2025): OOP pillars, Employee class, Driver/Stub/Black Box, 6-record file I/O & Composition vs Inheritance.',
        kind: 'mock',
      },
      {
        id: 'd22-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-33251',
        courseCode: 'CPP 2104',
        title: 'Mock #2 Brutal Autopsy + Early vs Late Binding & Templates Review',
        tasks: 'Fix every trailing `};`, `#include <fstream>`, or UML arrow mistake. Final Day-14 SR check on Cards 1–5 (100% target).',
        kind: 'recall',
      },
      {
        id: 'd22-b3',
        slot: 'Evening (19:30–21:00)',
        courseCode: 'FINAL PREP',
        title: 'Pack Ruler + Pens + Full Night Sleep',
        tasks: 'Pack Student ID, Exam Card, ruler & pencil for crisp UML diagrams! Early sleep for your final paper.',
        kind: 'rest',
      },
    ],
  },
  {
    dayNumber: 23,
    date: '2026-12-10',
    dayLabel: 'Thu, Dec 10',
    phase: 'phase3',
    phaseTag: 'FINAL EXAM #6',
    headline: 'FINAL EXAM #6: CPP 2104 Object-Oriented Tech (17:00–19:00 · MAIN: TC 2-2!)',
    isExamDay: true,
    examCode: 'CPP 2104',
    blocks: [
      {
        id: 'd23-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33251',
        courseCode: 'CPP 2104',
        title: '90-Min Final Scan: 9-Mark Visibility Table, fstream & UML Arrows',
        tasks: 'Calmly scan Inheritance Visibility Matrix, `virtual void f() = 0;`, `ofstream`/`ifstream`, and UML (+, -, #, hollow vs filled diamond).',
        kind: 'recall',
      },
      {
        id: 'd23-b2',
        slot: 'Exam Slot',
        courseId: 'kcau-33251',
        courseCode: 'CPP 2104',
        title: 'FINAL EXAM #6 · Session #72 · 17:00 – 19:00 HRS',
        tasks: '⚠️ MAIN VENUE CHANGE: TC 2-2 | TOWN: Main Hall GF | KITENGELA: RM 4-10–4-11 | KSM: HALL. Finish strong!',
        kind: 'exam',
      },
      {
        id: 'd23-b3',
        slot: 'Evening (19:30–21:00)',
        courseCode: 'DONE! 🎉',
        title: 'Trimester 3 (2026) Officially Complete!',
        tasks: '6/6 Ordinary Examinations conquered. Celebrate your hard work and enjoy the break!',
        kind: 'rest',
      },
    ],
  },
];

export const REVISION_PROGRESS_KEY = 'it_study_hub_revision_sprint_v1';

export function getCompletedRevisionBlocks(): string[] {
  try {
    const raw = localStorage.getItem(REVISION_PROGRESS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCompletedRevisionBlocks(ids: string[]): void {
  try {
    localStorage.setItem(REVISION_PROGRESS_KEY, JSON.stringify(ids));
  } catch {
    // ignore storage errors
  }
}
