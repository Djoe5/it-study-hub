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
    section: 'Section A (Compulsory - 30 Marks)' | 'Section B (20 Marks)';
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
    legacyCodes: ['BIT 1106', 'BSD 1105', 'BCT 1104', 'BBIT 105'],
    moodleUrl: 'https://virtualcampus.kcau.ac.ke/course/view.php?id=33500',
    searchLinks: [
      {
        label: 'Google PDF Search (New + Legacy)',
        platform: 'Google PDF',
        url: 'https://www.google.com/search?q=%22KCA+University%22+%28%22STU+1201%22+OR+%22BIT+1106%22+OR+%22Introduction+to+Programming%22%29+exam+OR+%22past+paper%22+filetype%3Apdf',
      },
      {
        label: 'Studocu KCA Search',
        platform: 'Studocu',
        url: 'https://www.studocu.com/row/search/KCA+University+Introduction+to+Programming',
      },
      {
        label: 'Scribd KCA Papers',
        platform: 'Scribd',
        url: 'https://www.scribd.com/search?query=KCA%20University%20Introduction%20to%20Programming%20exam',
      },
      {
        label: 'Kenyaplex / Masomo Msingi',
        platform: 'Kenyaplex / Masomo',
        url: 'https://www.google.com/search?q=site%3Akenyaplex.com+OR+site%3Amasomomsingi.com+%22KCA%22+%22Introduction+to+Programming%22',
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
        section: 'Section A (Compulsory - 30 Marks)',
        question: 'Distinguish between a compiler and an interpreter (4m). Draw a flowchart and write a complete C program that reads 5 student marks, calculates the average, and assigns a grade (A≥70, B≥60, C≥50, D≥40, Fail<40) (12m). Trace the output of a given nested for-loop snippet (8m). Explain 3 types of programming errors with C examples (6m).',
        tip: 'Always include #include <stdio.h>, int main(void), proper format specifiers (%d, %f), and & in scanf().',
      },
      {
        section: 'Section B (20 Marks)',
        question: 'Explain the 6 stages of the Program Development Lifecycle (PDLC) (10m). Compare Procedural, Object-Oriented, and Functional programming paradigms with real language examples and use-cases (10m).',
        tip: 'Use a clean structured table for paradigm comparisons — KCA examiners love well-organized tables.',
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
        section: 'Section A (Compulsory - 30 Marks)',
        question: 'Distinguish between Primary, Secondary, and Tertiary information sources with 2 academic examples each (9m). Explain how Boolean operators (AND, OR, NOT) and truncation refine database searches for an IT topic on "Cybersecurity in Mobile Banking" (9m). Format 4 given raw source details (Book, Journal Article, Website, Two-Author Report) into exact APA 7th edition reference list entries (12m).',
        tip: 'Check APA punctuation ruthlessly: Author, A. A. (Year). *Title in sentence case*. Publisher/Journal, *vol*(issue), pp–pp.',
      },
      {
        section: 'Section B (20 Marks)',
        question: 'Apply the CRAAP evaluation framework to assess whether a blog article on AI healthcare diagnostics is suitable for a university term paper (10m). Discuss 5 forms of plagiarism and 5 practical strategies students use to maintain academic integrity (10m).',
        tip: 'Spell out every letter of CRAAP clearly and explain what specific evidence you check under each.',
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
        section: 'Section A (Compulsory - 30 Marks)',
        question: 'Write complete HTML5 code to render a KCA Exam Timetable table demonstrating both colspan and rowspan (10m). Distinguish between GET and POST form submission methods and write an HTML registration form with text, email, radio, dropdown, and submit inputs (12m). Differentiate relative vs absolute URLs with examples (8m).',
        tip: 'Close every HTML tag cleanly (<tr>, <td>, </form>) and use semantic tags (<header>, <nav>, <main>, <footer>).',
      },
      {
        section: 'Section B (20 Marks)',
        question: 'Illustrate the CSS Box Model with a labeled diagram and write CSS rules demonstrating margin, border, padding, class vs ID selectors, and a mobile-first @media query (12m). Discuss 4 stages of Web Project Management and 4 UI/UX accessibility principles (8m).',
        tip: 'Draw the concentric CSS Box Model diagram cleanly: Content → Padding → Border → Margin.',
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
    legacyCodes: ['BIT 2107', 'BIT 2108', 'BBIT 203', 'BSD 2101'],
    moodleUrl: 'https://virtualcampus.kcau.ac.ke/course/view.php?id=33251',
    searchLinks: [
      {
        label: 'Google PDF Search (BIT 2107 / BIT 2108 / CPP 2104)',
        platform: 'Google PDF',
        url: 'https://www.google.com/search?q=%22KCA+University%22+%28%22CPP+2104%22+OR+%22BIT+2107%22+OR+%22BIT+2108%22+OR+%22Object+Oriented%22%29+exam+filetype%3Apdf',
      },
      {
        label: 'Studocu KCA Search',
        platform: 'Studocu',
        url: 'https://www.studocu.com/row/search/KCA+University+Object+Oriented',
      },
      {
        label: 'Scribd KCA Papers',
        platform: 'Scribd',
        url: 'https://www.scribd.com/search?query=KCA%20University%20Object%20Oriented%20BIT%202107%202108',
      },
      {
        label: 'Kenyaplex / Masomo Msingi',
        platform: 'Kenyaplex / Masomo',
        url: 'https://www.google.com/search?q=site%3Akenyaplex.com+OR+site%3Amasomomsingi.com+%22KCA%22+%22Object+Oriented%22',
      },
    ],
    highYieldTopics: [
      'UML Building Blocks, Structural (Class, Object, Package) vs Behavioral (Use Case, Sequence, Activity) Diagrams',
      'UML Class Diagrams: Visibility (+, -, #), Multiplicity (1..*, 0..1), Association, Aggregation (hollow diamond) vs Composition (filled diamond)',
      '4 Pillars of OOP: Encapsulation, Inheritance, Polymorphism (Overloading vs Overriding), Abstraction',
      'Constructors, Destructors, Access Modifiers, Abstract Classes vs Interfaces',
      'Exception Handling (try/catch/throw/finally) & Design Patterns (Singleton, Factory, Observer)',
    ],
    mockQuestions: [
      {
        section: 'Section A (Compulsory - 30 Marks)',
        question: 'Design a complete UML Class Diagram for a KCA University Library System (Book, Member, Student, Lecturer, Loan, Library) showing visibility (+/-/ #), methods, inheritance, aggregation/composition, and multiplicity (14m). Differentiate Method Overloading vs Method Overriding with code examples (8m). Contrast Abstract Classes vs Interfaces (8m).',
        tip: 'Bring a ruler! Hollow triangle = Inheritance (Generalization), Filled diamond = Composition (strong whole-part), Hollow diamond = Aggregation.',
      },
      {
        section: 'Section B (20 Marks)',
        question: 'Write a clean OOP program (Java or C++) demonstrating Encapsulation, Inheritance, Dynamic Polymorphism, and try-catch exception handling for a Banking Account hierarchy (SavingsAccount & CurrentAccount) (14m). Explain the Singleton and Observer design patterns with real software use cases (6m).',
        tip: 'Keep your handwritten code concise, clearly annotate access specifiers (private/protected/public), and show @Override or virtual methods.',
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
    headline: 'Finish STU 2102 + Full CPP 2104 UML & OOP Foundation (100% Syllabus Covered!)',
    blocks: [
      {
        id: 'd7-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33505',
        courseCode: 'STU 2102',
        title: 'Guides 6–11: Interviews, Proposal Chapters, Analysis & Research Ethics',
        tasks: 'Finish all 11 STU 2102 guides! Master Sampling methods, Ch 1–3 proposal layout, Qualitative/Quantitative analysis & Ethics.',
        kind: 'study',
      },
      {
        id: 'd7-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-33251',
        courseCode: 'CPP 2104',
        title: 'Units 1–2 UML Guides + OOP Pillars (Encapsulation & Inheritance)',
        tasks: 'Read both CPP 2104 UML guides. Master Class diagrams, visibility (+/-/ #), Association, Aggregation & Composition.',
        kind: 'study',
      },
      {
        id: 'd7-b3',
        slot: 'Evening (19:30–21:00)',
        courseId: 'kcau-33251',
        courseCode: 'CPP 2104',
        title: 'Polymorphism, Interfaces, Exceptions & Design Patterns',
        tasks: 'Cover syllabus weeks 5–8: Abstract Classes vs Interfaces, Overloading vs Overriding, try/catch/finally, Singleton/Factory/Observer.',
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
    headline: 'KCA Past Paper Harvest + STU 1201 Timed 2-Hour Mock #1',
    blocks: [
      {
        id: 'd8-b1',
        slot: 'Morning (08:30–11:00)',
        courseCode: 'ALL 6 UNITS',
        title: 'Past Paper Vault Collection (KCA Library + Virtual Campus + Legacy Codes)',
        tasks: 'Open the KCA Past Papers Finder tab → Pull 2–3 real past papers per unit using both new & legacy codes → Tag top repeated questions.',
        kind: 'study',
      },
      {
        id: 'd8-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-33500',
        courseCode: 'STU 1201',
        title: 'Timed 2-Hour Closed-Book Exam Simulation #1 (70 Marks)',
        tasks: 'Strict 120-min timer! Handwritten on foolscap: Compulsory Q1 (30m) + 2 Section B questions (40m). No phone, no notes.',
        kind: 'mock',
      },
      {
        id: 'd8-b3',
        slot: 'Evening (19:30–21:00)',
        courseId: 'kcau-33500',
        courseCode: 'STU 1201',
        title: 'Mock Autopsy & 1-Page C Syntax Cheat Sheet',
        tasks: 'Mark your script brutally against lecture notes. Re-write every missed code snippet and compile a 1-page rapid-review sheet.',
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
    headline: 'STU 1202 & CUU 1202 Timed 2-Hour KCA Mocks',
    blocks: [
      {
        id: 'd9-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33501',
        courseCode: 'STU 1202',
        title: 'Timed 2-Hour Closed-Book Web Design Mock #1 (70 Marks)',
        tasks: 'Full 120-min handwritten exam: HTML5 table (colspan/rowspan), form, CSS Box Model & responsive layout rules.',
        kind: 'mock',
      },
      {
        id: 'd9-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-33605',
        courseCode: 'CUU 1202',
        title: 'Timed 2-Hour Critical Thinking Mock #1 (70 Marks)',
        tasks: 'Full 120-min handwritten exam: Fallacy identification, deductive syllogisms, bias detection & decision-making case essay.',
        kind: 'mock',
      },
      {
        id: 'd9-b3',
        slot: 'Evening (19:30–21:00)',
        courseId: 'kcau-33605',
        courseCode: 'CUU 1202',
        title: 'Dual Mock Autopsy & Mistake Patch',
        tasks: 'Grade both papers, fix HTML/CSS syntax slips, and create flashcards for any fallacies or biases you hesitated on.',
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
    headline: 'CUU 2102 & STU 2102 Timed 2-Hour KCA Mocks',
    blocks: [
      {
        id: 'd10-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-32622',
        courseCode: 'CUU 2102',
        title: 'Timed 2-Hour Information Literacy Mock #1 (70 Marks)',
        tasks: 'Full 120-min exam: Primary/Secondary sources, Boolean search strings, CRAAP case study & 5 APA 7th references by hand.',
        kind: 'mock',
      },
      {
        id: 'd10-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-33505',
        courseCode: 'STU 2102',
        title: 'Timed 2-Hour Computing Research Mock #1 (70 Marks)',
        tasks: 'Full 120-min exam: Draft problem statement, objectives, conceptual framework diagram, sampling design & research ethics.',
        kind: 'mock',
      },
      {
        id: 'd10-b3',
        slot: 'Evening (19:30–21:00)',
        courseId: 'kcau-33505',
        courseCode: 'STU 2102',
        title: 'Dual Mock Autopsy & Proposal Template Lock-In',
        tasks: 'Verify every APA comma/italics rule and lock in the Ch 1–3 proposal blueprint so you can reproduce it effortlessly.',
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
    headline: 'CPP 2104 UML/OOP Mock #1 + STU 1202 Pre-Exam Vault Lock',
    blocks: [
      {
        id: 'd11-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33251',
        courseCode: 'CPP 2104',
        title: 'Timed 2-Hour OOP & UML Exam Simulation #1 (70 Marks)',
        tasks: 'Draw full UML Class + Use Case diagram with ruler + write OOP inheritance/polymorphism code + design patterns essay.',
        kind: 'mock',
      },
      {
        id: 'd11-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-33501',
        courseCode: 'STU 1202',
        title: 'STU 1202 1-Page Master Cheat Sheet (Defusing Dec 4→5!)',
        tasks: 'Distill all 13 Web Design lessons onto 1 clean front-and-back master sheet so Dec 4 evening requires only a 45-min scan.',
        kind: 'recall',
      },
      {
        id: 'd11-b3',
        slot: 'Evening (19:30–21:00)',
        courseId: 'kcau-33251',
        courseCode: 'CPP 2104',
        title: 'CPP 2104 Autopsy + Rapid Recall (Papers 1 & 2)',
        tasks: 'Review UML arrow errors from morning mock, then do 30 mins of flashcards for STU 1201 & CUU 1202.',
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
    headline: 'Papers 1 & 2 Final Intensive Lock-In (48 Hours to Exam #1)',
    blocks: [
      {
        id: 'd12-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33500',
        courseCode: 'STU 1201',
        title: 'Timed 2-Hour STU 1201 Mock #2 (Target ≥ 80%)',
        tasks: 'Second full past paper. Focus on speed: finish Q1 (30m) in 50 mins, Q2 & Q3 (20m each) in 32 mins each, 6 mins proofread.',
        kind: 'mock',
      },
      {
        id: 'd12-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-33605',
        courseCode: 'CUU 1202',
        title: 'CUU 1202 Full Past Paper #2 + Essay Structuring',
        tasks: 'Practice clear 4-part exam answers: Definition → Core Principle → Concrete IT Example → Critical Evaluation.',
        kind: 'mock',
      },
      {
        id: 'd12-b3',
        slot: 'Evening (19:30–21:00)',
        courseCode: 'LOGISTICS',
        title: 'Exam Readiness Audit & Weak-Spot Cleanup',
        tasks: 'Print/download Exam Card (verify CUU 1202 date!), check Student ID, fix any remaining STU 1201 operator/loop weak spots.',
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
    headline: 'Exam Eve: Sharp Calibration for STU 1201 & CUU 1202 + Full Sleep',
    blocks: [
      {
        id: 'd13-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33500',
        courseCode: 'STU 1201',
        title: 'Final STU 1201 Walkthrough & 5 Trace-Table Warmups',
        tasks: 'Review your 1-page C Cheat Sheet, dry-run 5 tricky loops/conditionals, and review exam pitfalls from L1–L10 guides.',
        kind: 'recall',
      },
      {
        id: 'd13-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-33605',
        courseCode: 'CUU 1202',
        title: 'CUU 1202 Calm Active Recall (Pre-Loading Paper 2)',
        tasks: 'Recite fallacies, argument validity rules, creative thinking steps & biases aloud — keeps Wed Dec 2 stress-free.',
        kind: 'recall',
      },
      {
        id: 'd13-b3',
        slot: 'Evening (19:30–21:00)',
        courseCode: 'REST & PACK',
        title: 'Pack Bag & Mandatory 8-Hour Sleep',
        tasks: 'Pack Student ID, Exam Card, 2 blue/black pens, pencil, ruler. Close books by 21:00 — rested brains score 15% higher!',
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
        title: 'Full CUU 2102 Past Paper #2 + APA 7th Perfection Drill',
        tasks: 'Timed 90-min practice: Boolean operators, CRAAP evaluation, plagiarism prevention & flawless APA 7th references.',
        kind: 'mock',
      },
      {
        id: 'd16-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-33501',
        courseCode: 'STU 1202',
        title: 'STU 1202 Pre-Arm Sprint (HTML5 Forms, Tables & CSS Box Model)',
        tasks: 'CRITICAL: Do your heavy STU 1202 rehearsal TODAY so tomorrow night after CUU 2102 you only need a light scan!',
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
    headline: 'Full STU 2102 Siege Day (All 11 Research Methodology Lectures)',
    blocks: [
      {
        id: 'd19-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33505',
        courseCode: 'STU 2102',
        title: 'Deep Review L1–L5: Problem, Lit Review, Design & Sampling',
        tasks: 'Drill Qualitative vs Quantitative vs Mixed Methods, Conceptual Framework diagrams, and Probability vs Non-Probability sampling.',
        kind: 'study',
      },
      {
        id: 'd19-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-33505',
        courseCode: 'STU 2102',
        title: 'Deep Review L6–L8 + Timed STU 2102 Mock #2',
        tasks: 'Questionnaires vs Interviews, Proposal Chapters 1–3, Data Analysis, Research Ethics + 90-min timed past paper.',
        kind: 'mock',
      },
      {
        id: 'd19-b3',
        slot: 'Evening (19:30–21:00)',
        courseId: 'kcau-33505',
        courseCode: 'STU 2102',
        title: '20-Min Mini-Proposal Speed Drill',
        tasks: 'Pick any IT topic and write Title, Problem Statement, 3 Objectives, Conceptual Framework & Ethics section in 20 mins flat.',
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
    headline: 'CPP 2104 Deep Dive: UML Mastery & The 4 OOP Pillars',
    blocks: [
      {
        id: 'd21-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33251',
        courseCode: 'CPP 2104',
        title: 'UML Diagrams Workshop (Class, Use Case, Sequence & Multiplicity)',
        tasks: 'Draw 3 full UML Class Diagrams by hand with a ruler (Library, Hospital, E-Commerce). Nail Aggregation vs Composition arrows!',
        kind: 'study',
      },
      {
        id: 'd21-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-33251',
        courseCode: 'CPP 2104',
        title: 'Core OOP Mechanics: Encapsulation, Constructors, Inheritance & Polymorphism',
        tasks: 'Master Overloading vs Overriding, Abstract Class vs Interface comparison table, super/base constructor chaining & vtable.',
        kind: 'study',
      },
      {
        id: 'd21-b3',
        slot: 'Evening (19:30–21:00)',
        courseId: 'kcau-33251',
        courseCode: 'CPP 2104',
        title: 'Handwritten OOP Code & Exception Handling Drill',
        tasks: 'Write clean Java/C++ inheritance + interface + try/catch/finally programs on paper without looking at notes.',
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
    headline: 'CPP 2104 Timed Mock #2 + Design Patterns Final Lock-In',
    blocks: [
      {
        id: 'd22-b1',
        slot: 'Morning (08:30–11:00)',
        courseId: 'kcau-33251',
        courseCode: 'CPP 2104',
        title: 'Timed 2-Hour Closed-Book CPP 2104 Mock #2 (Target ≥ 85%)',
        tasks: 'Full 120-min simulation: UML Class Diagram + OOP code implementation + Polymorphism & Interface theory.',
        kind: 'mock',
      },
      {
        id: 'd22-b2',
        slot: 'Afternoon (14:00–16:00)',
        courseId: 'kcau-33251',
        courseCode: 'CPP 2104',
        title: 'Design Patterns (Singleton, Factory, Observer) & Mock Autopsy',
        tasks: 'Fix every UML arrow/visibility mistake from Mock #2 and memorize 1-paragraph explanations + diagrams for all 3 patterns.',
        kind: 'recall',
      },
      {
        id: 'd22-b3',
        slot: 'Evening (19:30–21:00)',
        courseCode: 'FINAL PREP',
        title: 'Pack Ruler + Pens + Full Night Sleep',
        tasks: 'Do not forget a ruler & pencil for crisp UML diagrams! Early sleep for your final paper.',
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
        title: '90-Min UML Arrow Legend & OOP Pillars Calm Scan',
        tasks: 'Scan UML notations (+, -, #, 1..*, hollow vs filled diamond), Abstract vs Interface, and Singleton/Factory/Observer.',
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
