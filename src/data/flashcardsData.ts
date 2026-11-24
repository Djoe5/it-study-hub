export interface ExamFlashcard {
  id: string;
  number: number;
  courseCode: 'STU 1201' | 'CUU 1202' | 'CUU 2102' | 'STU 1202' | 'STU 2102' | 'CPP 2104';
  courseId: string;
  paperCitation: string;
  priority: 'high' | 'medium';
  front: string;
  back: string;
}

export interface PracticeQuestionItem {
  id: string;
  number: number;
  type: 'MCQ' | 'Short Answer' | 'Code Writing' | 'Extended Essay';
  courseCode: 'STU 1201' | 'CUU 1202' | 'CUU 2102' | 'STU 1202' | 'STU 2102' | 'CPP 2104';
  courseId: string;
  paperCitation: string;
  marks: number;
  timeMinutes: number;
  prompt: string;
  modelAnswer: string;
  rubric: string;
}

export interface PastPaperArchiveEntry {
  paperId: string;
  courseCode: string;
  title: string;
  session: string;
  source: 'Uploaded PDF' | 'Masomo Msingi' | 'Kenyaplex';
  url?: string;
  keyQuestions: string;
}

export const RETRIEVED_PAST_PAPERS_CATALOG: PastPaperArchiveEntry[] = [
  // CUU 2102 — 6 Unique Uploaded PDFs
  {
    paperId: 'Paper A1',
    courseCode: 'CUU 2102',
    title: 'CUU 2102 Information Literacy & Academic Writing (Part Time)',
    session: 'August 2025',
    source: 'Uploaded PDF',
    keyQuestions: 'Q1: IL definition, DB steps, 3 citation reasons; Q2: Source credibility; Q3: John plagiarism scenario; Q4: Essay structure & Formal vs Informal.',
  },
  {
    paperId: 'Paper A2',
    courseCode: 'CUU 2102',
    title: 'CUU 2102 Information Literacy & Academic Writing (Regular — BSc IT)',
    session: 'April 2026',
    source: 'Uploaded PDF',
    keyQuestions: 'Q1: Primary/Secondary/Tertiary, 5 judging criteria, 4 hallmarks, 5 search techniques; Q2: Scholarly vs Non-scholarly; Q3: Maria AI thesis ethics case; Q4: Website credibility & 5 bias clues; Q5: 5 IL benefits.',
  },
  {
    paperId: 'Paper A3',
    courseCode: 'CUU 2102',
    title: 'CUU 2102 Information Literacy (Diaspora)',
    session: 'August 2025',
    source: 'Uploaded PDF',
    keyQuestions: 'Q1: Information Task stages & 5 APA in-text vs end-reference differences; Q2: Boolean query for renewable energy in Africa; Q3: IL & lifelong learning; Q4: Scholarly vs Trade vs Popular magazines.',
  },
  {
    paperId: 'Paper A4',
    courseCode: 'CUU 2102',
    title: 'CUU 2101 Information Literacy & Academic Writing (Full Time)',
    session: 'August 2025',
    source: 'Uploaded PDF',
    keyQuestions: 'Q1: 5 IL skills & standard essay structure; Q2: 5 evaluation reasons & library vs internet; Q3: 5 search strategies; Q4: 8 quality library source types.',
  },
  {
    paperId: 'Paper A5',
    courseCode: 'CUU 2102',
    title: 'CUU 2102 Information Literacy & Academic Writing (DL/PT — Supp & Regular)',
    session: 'Aug / Oct 2025',
    source: 'Uploaded PDF',
    keyQuestions: '3 IL functions, barriers to access, citation tools, Coherence & Cohesion devices, Descriptive vs Analytical vs Argumentative writing, Big6 vs SCONUL models.',
  },
  // CPP 2104 — 5 Unique Uploaded PDFs (BIT 2108 / BAC 2101 / CPP 2201)
  {
    paperId: 'Paper B1',
    courseCode: 'CPP 2104',
    title: 'BAC 2101 / BSD 2102 / BISF 2101 Object Oriented Programming',
    session: 'August 2024',
    source: 'Uploaded PDF',
    keyQuestions: 'Q1: 3 OOP steps, Struct/Class/Union, State/Behavior, 9-Mark Inheritance Visibility Table; Q2: Class E-Shamba(13,19) & Traffic Alert; Q3: Signature vs Prototype, Friend function 16% VAT; Q4: Pure virtual & compute() overloading.',
  },
  {
    paperId: 'Paper B2',
    courseCode: 'CPP 2104',
    title: 'BIT 2108 / BBIT 203 / BAC 2101 Object Oriented Programming',
    session: 'August 2025',
    source: 'Uploaded PDF',
    keyQuestions: 'Q1: Object, OOP vs Procedural, Class Diagrams, while/do-while/break; Q2: Nakuru School Events abstraction; Q3: Participant struct & loop; Q4: Express Call Centre CallLog class + calllogs.txt file I/O.',
  },
  {
    paperId: 'Paper B3',
    courseCode: 'CPP 2104',
    title: 'CPP 2201 Object Oriented Programming (Ordinary)',
    session: 'November 2025',
    source: 'Uploaded PDF',
    keyQuestions: 'Q1: 4 OOP pillars, Friend vs Inline, Constructor vs Destructor, pass object; Q2: Class Rectangle & Static members; Q3: Multilevel inheritance (Person->Employee->Manager), Function vs Operator overloading; Q4: Virtual functions, Vehicle data hiding, Composition vs Inheritance.',
  },
  {
    paperId: 'Paper B4',
    courseCode: 'CPP 2104',
    title: 'BIT 2108 / BBIT 203 / BAC 2101 Object Oriented Programming',
    session: 'April 2025',
    source: 'Uploaded PDF',
    keyQuestions: 'Q1: 4 OOP pillars, Voting age, Scholarship C++, Even numbers 100–500; Q2: print(), Circle flowchart, Access specifiers, switch-case; Q3: BankAccount class, star pyramid, jump statements; Q4: Student class, 2 inheritance types, even/odd modulus.',
  },
  {
    paperId: 'Paper B5',
    courseCode: 'CPP 2104',
    title: 'BIT 2108 / BBIT 203 Object Oriented Programming (Dec 2025 & Aug 2017)',
    session: 'Dec 2025 / Aug 2017',
    source: 'Uploaded PDF',
    keyQuestions: '2 main C++ errors, Employee class (get_input, calculate, constructor), Driver/Stub/Black Box, Tax bracket C++, Nested 1..5 loop, 6 Employee records file handling; Early vs Late binding, Template classes, Pure virtual.',
  },
  // STU 1201 — 4 Full Masomo Msingi Papers + Kenyaplex
  {
    paperId: 'Paper C1',
    courseCode: 'STU 1201',
    title: 'BIT 1304 Programming Methodology (KCA Ordinary)',
    session: 'August 2012',
    source: 'Masomo Msingi',
    url: 'https://masomomsingi.com/bit-1304-programming-methodology-kca-past-paper/',
    keyQuestions: 'Q1: Pseudocode vs Algorithm, Params vs Args, C compiler error, Overtime Gross Pay flowchart + C code, nested loop 50 stars, while vs do-while; Q2: PDLC, char grapes[2][3], marks[3][5]; Q3: Scope; Q5: Recursive rec_cheers -> iterative, Call-by-value vs reference.',
  },
  {
    paperId: 'Paper C2',
    courseCode: 'STU 1201',
    title: 'BIT 1304 Programming Methodology (KCA Ordinary)',
    session: 'August 2013',
    source: 'Masomo Msingi',
    url: 'https://masomomsingi.com/bit-1304-programming-methodology-kca-past-paper-5/',
    keyQuestions: 'Q1: 4 procedural pros, arrays & days of week, source vs object code, 4 variable naming rules, for loop 1–10; Q2: 3 control structure categories, ++/--; Q3: Grade flowchart ladder, comments, return; Q5: High vs low level languages.',
  },
  {
    paperId: 'Paper C3',
    courseCode: 'STU 1201',
    title: 'BIT 1303A / 1304 Programming Methodology (KCA Ordinary)',
    session: 'April 2015',
    source: 'Masomo Msingi',
    url: 'https://masomomsingi.com/bit-1303a-1304-programming-methodology-kca-past-paper/',
    keyQuestions: 'Q1: Relational/Arithmetic/Logical operators, / vs %, 5 C data types, Prototype vs Definition, struct syntax; Q2: #define square(x) x*x trap (64), sum of odds, palindrome string, struct student output; Q3: Pointers, Factorial, Fibonacci; Q4: Largest in array, pointer string reverse, sum of digits.',
  },
  {
    paperId: 'Paper C4',
    courseCode: 'STU 1201',
    title: 'BIT 1303A / 1304 Programming Methodology (KCA Ordinary)',
    session: 'August 2014',
    source: 'Masomo Msingi',
    url: 'https://masomomsingi.com/bit-1303a-programming-methodology-kca-past-paper/',
    keyQuestions: 'Q1: 2 Preprocessors, Pointer arithmetic trace (400 400), 4x3 matrix addition, 6x5 2D sum, math.h/ctype.h expressions; Q2: if vs switch, Pointer operators (&, *), struct person BMI calculator; Q3: Static vs Dynamic memory, Big-O; Q4: Overtime employee struct.',
  },
  // STU 1202 — 4 Full Masomo Msingi Papers + Kenyaplex
  {
    paperId: 'Paper D1',
    courseCode: 'STU 1202',
    title: 'BIT 1203 Web Design and Development (KCA Ordinary)',
    session: 'August 2013',
    source: 'Masomo Msingi',
    url: 'https://masomomsingi.com/bit-1203-web-design-and-development-kca-past-paper-8/',
    keyQuestions: 'Q1: Web design processes, 4 webmaster guidelines, tables pros/cons, GIF vs JPEG, HTML tags (<SAMP>, <CITE>, <BLOCKQUOTE>, <MARQUEE>, <HR>, <STRIKE>); Q2: Radio/Checkbox/Dropdown, WYSIWYG editors, 2 tag groups; Q4: Cellpadding/Cellspacing/Nowrap/Colspan/Rowspan; Q5: Frames, <DL>/<DT>/<DD>.',
  },
  {
    paperId: 'Paper D2',
    courseCode: 'STU 1202',
    title: 'BIT 1203 Web Design and Development (KCA Ordinary)',
    session: 'December 2014',
    source: 'Masomo Msingi',
    url: 'https://masomomsingi.com/bit-1203-web-design-and-development-kca-past-paper-3/',
    keyQuestions: 'Q1: HTML element characteristics, 3 frames drawbacks, internet services, <BASE>, Table HTML; Q3: ACTION & METHOD form attributes; Q4: Draw table from HTML colspan/rowspan code, <FRAME>/<FRAMESET>/<NOFRAMES>, HTTP; Q5: WWW features, protocols, servers.',
  },
  {
    paperId: 'Paper D3',
    courseCode: 'STU 1202',
    title: 'BIT 1203 Web Design and Development (KCA Ordinary)',
    session: 'August 2011',
    source: 'Masomo Msingi',
    url: 'https://masomomsingi.com/bit-1203-web-design-and-development-kca-past-paper-7/',
    keyQuestions: 'Q1: Usenet/Gopher/Mailing Lists, ROWSPAN vs COLSPAN, A vs HREF, THEAD/TFOOT; Q3: Client, TCP/IP, Web Browser, GET/POST; Q4: <IMG SRC>/<ALT>/<VALIGN>, File/Print/Proxy/App servers.',
  },
  {
    paperId: 'Paper D4',
    courseCode: 'STU 1202',
    title: 'BIT 1203 Web Design and Development (KCA Ordinary)',
    session: 'December 2012',
    source: 'Masomo Msingi',
    url: 'https://masomomsingi.com/bit-1203-web-design-and-development-kca-past-paper-6/',
    keyQuestions: 'Q1: XML vs SGML, <PRE>/<HR>/<FRAME>/<CITE>, 3 HTML lists, Image maps, GIF vs JPEG, JavaScript in HTML; Q3: Firewall, Web server, Protocol; Q4: Physical vs Logical tags; Q5: JS onFocus/document.writeln/onSubmit, CGI script vs program, Java vs JavaScript.',
  },
  // STU 2102 — 3 Full Masomo Msingi Papers
  {
    paperId: 'Paper E1',
    courseCode: 'STU 2102',
    title: 'BIT 2301 Research Methodology (KCA Ordinary)',
    session: 'August 2011',
    source: 'Masomo Msingi',
    url: 'https://masomomsingi.com/bit-2301-research-methodology-kca-past-paper-3/',
    keyQuestions: 'Q1: 4 characteristics of sub-problems, Null vs Alternative hypothesis, Proposal vs Report, 6 Literature Review roles, 4 data collection questions; Q2: Systematic vs Cluster sampling, 6 proposal flaws, 6 hypothesis traits, Structured vs Unstructured Qs; Q3: Survey vs Case study, Operational definition & Delimitation.',
  },
  {
    paperId: 'Paper E2',
    courseCode: 'STU 2102',
    title: 'BIT 2301 Research Methodology (KCA Ordinary)',
    session: 'April 2012',
    source: 'Masomo Msingi',
    url: 'https://masomomsingi.com/bit-2301-research-methodology-kca-past-paper-2/',
    keyQuestions: 'Q1: Validity vs Reliability, Qualitative vs Quantitative, Descriptive vs Inferential stats, 5 types of validity, Research process; Q2: 3 interview types, 3 experimental designs (Independent/Dependent/Functional/Factorial); Q3: Bias factors, Descriptive survey, Sampling; Q4: Tool vs Method vs Methodology.',
  },
  {
    paperId: 'Paper E3',
    courseCode: 'STU 2102',
    title: 'BIT 2301 Research Methodology (KCA Ordinary)',
    session: 'August 2012',
    source: 'Masomo Msingi',
    url: 'https://masomomsingi.com/bit-2301-research-methodology-kca-past-paper/',
    keyQuestions: 'Q1: Research definition & process, 3 aims, Characteristics of research objectives, Action research; Q2: 4 hallmarks of research, Aims vs Objectives; Q3: 5 traits of good research, Qual vs Quant; Q4: Tool vs Method vs Methodology vs Framework (20m); Q5: Functions & 5 traits of a research proposal.',
  },
];

export const EXAM_FLASHCARDS: ExamFlashcard[] = [
  // CPP 2104 (Cards 1-5)
  {
    id: 'fc-01',
    number: 1,
    courseCode: 'CPP 2104',
    courseId: 'kcau-33251',
    paperCitation: 'Paper B1 (Aug 2024) · Q1(d) [9 Marks]',
    priority: 'high',
    front: 'In the C++ Inheritance Visibility Table, what happens to Base PUBLIC, PROTECTED, and PRIVATE members under Protected and Private derivation?',
    back: 'Base PRIVATE = NEVER directly accessible under any derivation. Under Protected derivation: Public -> Protected, Protected -> Protected. Under Private derivation: Public -> Private, Protected -> Private. Under Public derivation: Public -> Public, Protected -> Protected.',
  },
  {
    id: 'fc-02',
    number: 2,
    courseCode: 'CPP 2104',
    courseId: 'kcau-33251',
    paperCitation: 'Paper B1 (Aug 2024) · Q1(b) [6 Marks]',
    priority: 'high',
    front: 'When should you choose Struct vs. Class vs. Union in C++ OOP?',
    back: 'Struct: Passive data grouping (default PUBLIC visibility). Class: Full OOP entities requiring encapsulation/data hiding (default PRIVATE visibility). Union: Memory-constrained storage where all members share ONE memory block and only one field is active at a time.',
  },
  {
    id: 'fc-03',
    number: 3,
    courseCode: 'CPP 2104',
    courseId: 'kcau-33251',
    paperCitation: 'Paper B1 (Aug 2024) · Q3(b) & Paper B3 · Q1(b)',
    priority: 'high',
    front: 'State 3 characteristics of a C++ `friend` function and contrast it with an `inline` function.',
    back: 'Friend function: (1) Not a member of the class, (2) Cannot be invoked via object dot operator (takes object as argument), (3) Can access private & protected members. Inline function: Compiler expands body directly at call site to remove call overhead.',
  },
  {
    id: 'fc-04',
    number: 4,
    courseCode: 'CPP 2104',
    courseId: 'kcau-33251',
    paperCitation: 'Paper B1 · Q4(b) & Paper B5 · Q4(c)',
    priority: 'high',
    front: 'What is a Pure Virtual Function in C++, what is its syntax, and what does it do to its owning class?',
    back: 'A virtual function with no base implementation declared as `virtual void show() = 0;`. It makes the class an Abstract Base Class (cannot be instantiated directly) and forces every concrete subclass to override it for runtime polymorphism.',
  },
  {
    id: 'fc-05',
    number: 5,
    courseCode: 'CPP 2104',
    courseId: 'kcau-33251',
    paperCitation: 'Paper B2 (Aug 2025) · Q4(d-e) & Paper B5 (Dec 2025) · Q4',
    priority: 'high',
    front: 'How do you write a record to `calllogs.txt` in C++, and state 2 benefits of file storage over RAM?',
    back: 'Include `<fstream>`, open `ofstream out("calllogs.txt", ios::app);`, check `if (out.is_open())`, write with `out << data << "\\n";`, and call `out.close();`. Benefits: (1) Persistence across shutdowns/power loss, (2) Large capacity & shareability.',
  },

  // STU 1201 (Cards 6-10)
  {
    id: 'fc-06',
    number: 6,
    courseCode: 'STU 1201',
    courseId: 'kcau-33500',
    paperCitation: 'Paper C3 (Apr 2015) · Q2(c)',
    priority: 'high',
    front: 'KCA MACRO TRAP: Given `#define square(x) x*x`, what does `i = 64 / square(4);` output in C and WHY?',
    back: 'Outputs `64` (NOT 4)! Macro text substitution expands it to `64 / 4 * 4`. Because `/` and `*` share equal precedence left-to-right, `(64 / 4) * 4 = 16 * 4 = 64`. Fix: `#define square(x) ((x)*(x))`.',
  },
  {
    id: 'fc-07',
    number: 7,
    courseCode: 'STU 1201',
    courseId: 'kcau-33500',
    paperCitation: 'Paper C4 (Aug 2014) · Q1(b) & Q2(b)',
    priority: 'high',
    front: 'Define a Pointer in C and explain the two operators (`&` and `*`) used with pointers.',
    back: 'A pointer stores the memory address of another variable (`int *p;`). `&` (Address-of) retrieves a variable\'s memory address (`p = &x;`). `*` (Dereference/Indirection) reads or modifies the value stored at that address (`*p = 500;`).',
  },
  {
    id: 'fc-08',
    number: 8,
    courseCode: 'STU 1201',
    courseId: 'kcau-33500',
    paperCitation: 'Paper C1 (Aug 2012) · Q1 & Paper C3 · Q1(e)',
    priority: 'high',
    front: 'Distinguish between: (1) `while` vs `do-while` loop, and (2) Function Prototype vs Function Definition.',
    back: '(1) `while` is pre-test (may execute 0 times); `do-while` is post-test (guaranteed to execute AT LEAST ONCE). (2) Prototype declares return type, name & parameter types ending in `;` before `main()`; Definition includes the executable `{ ... }` code body.',
  },
  {
    id: 'fc-09',
    number: 9,
    courseCode: 'STU 1201',
    courseId: 'kcau-33500',
    paperCitation: 'Paper C1 · Q2(b) & Q5(d)',
    priority: 'medium',
    front: 'For `char grapes[2][3];`, how many elements does it hold, and how do you modify it for 3 records with the same element count? Also contrast Call-by-Value vs Call-by-Reference.',
    back: '`grapes` holds 2×3 = 6 `char` elements; for 3 records with 6 elements use `char grapes[3][2];`. Call-by-Value passes a copy (original unchanged); Call-by-Reference passes memory addresses via pointers (`&`/`*`) modifying the original.',
  },
  {
    id: 'fc-10',
    number: 10,
    courseCode: 'STU 1201',
    courseId: 'kcau-33500',
    paperCitation: 'Paper C3 · Q1(b) & Paper C4 · Q1(e-f)',
    priority: 'medium',
    front: 'Evaluate in C: `17 / 5`, `17 % 5`, `floor(22.46)`, `ceil(33.3)`, `fabs(-1.23)`, and write the quadratic root formula in C.',
    back: '`17 / 5 = 3` (integer truncation), `17 % 5 = 2` (remainder), `floor(22.46) = 22.0`, `ceil(33.3) = 34.0`, `fabs(-1.23) = 1.23`. Quadratic: `(-b + sqrt(pow(b, 2) - 4 * a * c)) / (2 * a)`.',
  },

  // CUU 2102 (Cards 11-15)
  {
    id: 'fc-11',
    number: 11,
    courseCode: 'CUU 2102',
    courseId: 'kcau-32622',
    paperCitation: 'Paper A2 (Apr 2026) · Q1(b), Q4(a-b)',
    priority: 'high',
    front: 'List the 5 CRAAP source evaluation criteria and 3 ways to spot bias in an online article.',
    back: 'CRAAP: Currency, Relevance, Authority, Accuracy, Purpose. Bias clues: (1) Emotionally loaded/sensational language, (2) Omission of counterarguments/cherry-picked data, (3) Undisclosed commercial sponsor or ideological conflict of interest.',
  },
  {
    id: 'fc-12',
    number: 12,
    courseCode: 'CUU 2102',
    courseId: 'kcau-32622',
    paperCitation: 'Paper A2 (Apr 2026) · Q3 [15 Marks]',
    priority: 'high',
    front: 'In Maria\'s KCA AI thesis case study, list the 4 ethics violations and justify whether undisclosed AI writing is academic misconduct.',
    back: 'Violations: (1) Self-plagiarism (uncited undergrad text), (2) Data privacy breach (public cloud PII), (3) Predatory journal submission, (4) Fabricated auto-citations. Undisclosed AI IS misconduct: violates authorship originality and personal scholarly accountability.',
  },
  {
    id: 'fc-13',
    number: 13,
    courseCode: 'CUU 2102',
    courseId: 'kcau-32622',
    paperCitation: 'Paper A3 (Aug 2025) · Q1(b) [10 Marks]',
    priority: 'high',
    front: 'State 5 differences between APA 7th In-Text Citations and End-References.',
    back: '1. Location (body vs end page). 2. Detail (Author+Year vs full bibliographic record). 3. Order (appearance order vs strict alphabetical). 4. Indentation (inline vs 0.5-inch hanging indent). 5. Purpose (immediate claim attribution vs source retrieval).',
  },
  {
    id: 'fc-14',
    number: 14,
    courseCode: 'CUU 2102',
    courseId: 'kcau-32622',
    paperCitation: 'Paper A3 · Q2(a) & Paper A2 · Q1(d)',
    priority: 'high',
    front: 'Write an exam-grade Boolean search query for "renewable energy in Africa and policy development" and name 4 search techniques.',
    back: 'Query: `("renewable energy" OR "clean energy") AND Africa AND ("policy development" OR "energy polic*") NOT coal`. Techniques: Boolean operators (AND/OR/NOT), Phrase quotes `"..."`, Truncation `*`, Nesting `()`, Field/date limiters.',
  },
  {
    id: 'fc-15',
    number: 15,
    courseCode: 'CUU 2102',
    courseId: 'kcau-32622',
    paperCitation: 'Paper A5 · Q4, Q5 & Paper A3 · Q4',
    priority: 'medium',
    front: 'Contrast: (1) Coherence vs Cohesion, and (2) Big6 vs SCONUL Information Literacy models.',
    back: '(1) Coherence = macro-level logical unity across the whole essay; Cohesion = micro-level grammatical links (transitions, pronouns) binding sentences. (2) Big6 = structured linear 6-step workflow; SCONUL = iterative 7-pillar higher-ed competency model.',
  },

  // STU 1202 (Cards 16-20)
  {
    id: 'fc-16',
    number: 16,
    courseCode: 'STU 1202',
    courseId: 'kcau-33501',
    paperCitation: 'Paper D1 (Aug 2013) · Q4(a) & Paper D2 · Q4(a)',
    priority: 'high',
    front: 'Distinguish between `cellpadding`, `cellspacing`, `colspan`, and `rowspan` in HTML tables.',
    back: '`cellpadding`: inner space between cell content and its border. `cellspacing`: outer gap between separate table cells. `colspan="n"`: merges `n` columns horizontally. `rowspan="n"`: merges `n` rows vertically.',
  },
  {
    id: 'fc-17',
    number: 17,
    courseCode: 'STU 1202',
    courseId: 'kcau-33501',
    paperCitation: 'Paper D1 · Q2(a) & Paper D2 · Q3(b)',
    priority: 'high',
    front: 'Contrast Radio Buttons vs Checkboxes, and explain HTML `<form>` `ACTION` vs `METHOD` (`GET` vs `POST`).',
    back: 'Radio buttons enforce SINGLE choice (must share identical `name` attribute); Checkboxes allow MULTIPLE choices. `ACTION` sets the backend target URL; `METHOD="GET"` appends data to URL (visible/limited), `POST` sends data securely in the HTTP body.',
  },
  {
    id: 'fc-18',
    number: 18,
    courseCode: 'STU 1202',
    courseId: 'kcau-33501',
    paperCitation: 'Paper D4 (Dec 2012) · Q5(a, d)',
    priority: 'high',
    front: 'Explain JavaScript `onFocus`, `onSubmit`, and `document.writeln()`, and give 2 differences between Java and JavaScript.',
    back: '`onFocus` fires when an input gets focus; `onSubmit` validates a form before submission (returning `false` blocks submit); `document.writeln()` outputs text+newline to the page. Java = compiled, statically-typed JVM OOP; JavaScript = interpreted, dynamically-typed browser scripting.',
  },
  {
    id: 'fc-19',
    number: 19,
    courseCode: 'STU 1202',
    courseId: 'kcau-33501',
    paperCitation: 'Paper D1 · Q1(d-e) & Paper D4 · Q4(c)',
    priority: 'medium',
    front: 'Compare GIF vs JPEG, Physical vs Logical HTML tags, and define `<DL>`, `<DT>`, `<DD>`, `<CITE>`, `<SAMP>`.',
    back: 'GIF: lossless, 256 colors, supports transparency/animation (logos). JPEG: lossy, 16.7M colors, no animation (photos). Physical (`<b>`, `<i>`) = appearance; Logical (`<strong>`, `<em>`, `<cite>` title, `<samp>` code output) = meaning. `<DL>/<DT>/<DD>` = Definition List / Term / Description.',
  },
  {
    id: 'fc-20',
    number: 20,
    courseCode: 'STU 1202',
    courseId: 'kcau-33501',
    paperCitation: 'Paper D2 · Q1(b) & CSS Box Model',
    priority: 'medium',
    front: 'List the 4 layers of the CSS Box Model (inside out) and 3 drawbacks of legacy HTML `<frameset>` frames.',
    back: 'CSS Box Model: Content -> Padding -> Border -> Margin. Frame drawbacks: (1) Breaks bookmarking/URL sharing, (2) Poor SEO indexing & accessibility/screen-reader issues, (3) Awkward printing & inconsistent rendering on mobile screens.',
  },

  // STU 2102 (Cards 21-25)
  {
    id: 'fc-21',
    number: 21,
    courseCode: 'STU 2102',
    courseId: 'kcau-33505',
    paperCitation: 'Paper E1 (Aug 2011) · Q1(a-b)',
    priority: 'high',
    front: 'State 4 characteristics of Research Sub-Problems and differentiate Null ($H_0$) vs Alternative ($H_1$) hypotheses.',
    back: 'Sub-problems: (1) Each is a complete researchable unit, (2) Tied to data interpretation, (3) Collectively equal the whole main problem, (4) Manageable count & mutually exclusive. $H_0$: no significant effect/relationship; $H_1$: significant effect/relationship exists.',
  },
  {
    id: 'fc-22',
    number: 22,
    courseCode: 'STU 2102',
    courseId: 'kcau-33505',
    paperCitation: 'Paper E2 (Apr 2012) · Q1(a, f)',
    priority: 'high',
    front: 'Differentiate Validity vs Reliability and list 5 types of Validity.',
    back: 'Validity = accuracy (measures what it claims to measure). Reliability = consistency/repeatability across trials. 5 Types: Face Validity, Content Validity, Construct Validity, Criterion (Predictive/Concurrent) Validity, Internal & External Validity.',
  },
  {
    id: 'fc-23',
    number: 23,
    courseCode: 'STU 2102',
    courseId: 'kcau-33505',
    paperCitation: 'Paper E3 (Aug 2012) · Q4 [20 Marks]',
    priority: 'high',
    front: 'Differentiate Tool, Method, Methodology, and Framework in computing research.',
    back: 'Tool = concrete instrument (Questionnaire, SPSS, profiler). Method = specific data procedure (Stratified sampling, A/B testing). Methodology = overarching systematic strategy justifying methods (Design Science, Mixed-Methods). Framework = conceptual map linking IV, Moderating, and DV.',
  },
  {
    id: 'fc-24',
    number: 24,
    courseCode: 'STU 2102',
    courseId: 'kcau-33505',
    paperCitation: 'Paper E1 · Q1(c-d), Q2(a)',
    priority: 'medium',
    front: 'List 6 roles of a Literature Review and contrast Systematic vs Cluster sampling.',
    back: 'Lit Review roles: (1) Establishes context, (2) Identifies research gaps, (3) Prevents duplication, (4) Refines methodology, (5) Anchors conceptual framework, (6) Justifies significance. Systematic: picks every k-th element ($k=N/n$). Cluster: divides population into groups and samples whole groups.',
  },
  {
    id: 'fc-25',
    number: 25,
    courseCode: 'STU 2102',
    courseId: 'kcau-33505',
    paperCitation: 'Paper E1 · Q3(b) & Paper E2 · Q1(a-iii)',
    priority: 'medium',
    front: 'Distinguish between: (1) Research Proposal vs Report, (2) Operational Definition vs Delimitation, and (3) Descriptive vs Inferential stats.',
    back: '(1) Proposal = Ch 1–3 BEFORE study (future tense); Report = Ch 1–5 AFTER study (past tense). (2) Operational def = how variable is measured; Delimitation = intentional scope boundaries. (3) Descriptive summarizes sample (mean/SD); Inferential generalizes/tests $H_0$ (t-test/ANOVA).',
  },

  // CUU 1202 (Cards 26-30)
  {
    id: 'fc-26',
    number: 26,
    courseCode: 'CUU 1202',
    courseId: 'kcau-33605',
    paperCitation: 'CUU 1202 Guide L2 & L7',
    priority: 'high',
    front: 'Distinguish between Valid vs Sound (Deductive) and Strong vs Cogent (Inductive) arguments.',
    back: 'Deductive: Valid = conclusion necessarily follows if premises were true; Sound = Valid + ALL premises factually TRUE. Inductive: Strong = premises make conclusion highly probable; Cogent = Strong + ALL premises factually TRUE.',
  },
  {
    id: 'fc-27',
    number: 27,
    courseCode: 'CUU 1202',
    courseId: 'kcau-33605',
    paperCitation: 'CUU 1202 Guide L2 & L7',
    priority: 'high',
    front: 'Define 5 high-frequency Informal Fallacies: Ad Hominem, Straw Man, Slippery Slope, False Dilemma, and Post Hoc.',
    back: 'Ad Hominem: attacking the person, not the argument. Straw Man: distorting an opponent\'s claim. Slippery Slope: unproven extreme domino chain. False Dilemma: forcing only 2 extremes when alternatives exist. Post Hoc: assuming sequence proves causation.',
  },
  {
    id: 'fc-28',
    number: 28,
    courseCode: 'CUU 1202',
    courseId: 'kcau-33605',
    paperCitation: 'CUU 1202 Guide L3 & L7',
    priority: 'high',
    front: 'Expand the SCAMPER creative problem-solving acronym and list the 4 stages of Wallas\'s Creative Process.',
    back: 'SCAMPER: Substitute, Combine, Adapt, Modify/Magnify, Put to another use, Eliminate, Reverse/Rearrange. 4 Stages: (1) Preparation, (2) Incubation, (3) Illumination, (4) Verification.',
  },
  {
    id: 'fc-29',
    number: 29,
    courseCode: 'CUU 1202',
    courseId: 'kcau-33605',
    paperCitation: 'CUU 1202 Guide L6 & L7',
    priority: 'medium',
    front: 'Explain all 6 colors in Edward de Bono\'s Six Thinking Hats framework.',
    back: 'White = Objective Facts & Data; Red = Emotions & Intuition; Black = Caution, Risks & Critique; Yellow = Optimism & Benefits; Green = Creativity & New Ideas; Blue = Process Control & Meta-facilitation.',
  },
  {
    id: 'fc-30',
    number: 30,
    courseCode: 'CUU 1202',
    courseId: 'kcau-33605',
    paperCitation: 'CUU 1202 Guide L1 & L4',
    priority: 'medium',
    front: 'Explain 4 Cognitive Biases that sabotage IT decision-making.',
    back: '1. Confirmation Bias (seeking only confirming data). 2. Anchoring Bias (over-relying on the first number/estimate). 3. Sunk-Cost Fallacy (keeping failing projects because of past spend). 4. Groupthink (conforming to consensus instead of voicing critical dissent).',
  },
];

export const EXAM_PRACTICE_BANK: PracticeQuestionItem[] = [
  {
    id: 'pq-01',
    number: 1,
    type: 'MCQ',
    courseCode: 'CPP 2104',
    courseId: 'kcau-33251',
    paperCitation: 'Paper B1 (Aug 2024) · Q1(d)',
    marks: 2,
    timeMinutes: 2,
    prompt: 'In C++, if class `Derived` inherits from class `Base` using `protected` derivation (`class Derived : protected Base`), what is the visibility of `Base`\'s `public` and `private` members inside `Derived`?\nA) Public and Private\nB) Protected and Private\nC) Protected and Inaccessible\nD) Private and Inaccessible',
    modelAnswer: 'C) Protected and Inaccessible. Protected derivation caps Base public members to protected, while Base private members are NEVER directly accessible in any derived class.',
    rubric: '2 Marks for exact option C with brief justification.',
  },
  {
    id: 'pq-02',
    number: 2,
    type: 'MCQ',
    courseCode: 'STU 1201',
    courseId: 'kcau-33500',
    paperCitation: 'Paper C3 (Apr 2015) · Q2(c)',
    marks: 2,
    timeMinutes: 2,
    prompt: 'Given `#define square(x) x*x`, what is printed by `int i = 64 / square(4); printf("%d", i);`?\nA) 4\nB) 16\nC) 64\nD) Compile error',
    modelAnswer: 'C) 64. The C preprocessor expands `64 / square(4)` literally to `64 / 4 * 4`. Left-to-right evaluation computes `(64 / 4) * 4 = 16 * 4 = 64`.',
    rubric: '2 Marks for option C + explaining literal macro expansion.',
  },
  {
    id: 'pq-03',
    number: 3,
    type: 'MCQ',
    courseCode: 'STU 1202',
    courseId: 'kcau-33501',
    paperCitation: 'Paper D1 (Aug 2013) · Q2(a)',
    marks: 2,
    timeMinutes: 2,
    prompt: 'In HTML form design, which attribute guarantees that selecting one radio button automatically deselects all other radio buttons in that question?\nA) Identical `id` attribute\nB) Identical `name` attribute\nC) Identical `value` attribute\nD) Identical `class` attribute',
    modelAnswer: 'B) Identical `name` attribute (e.g., `<input type="radio" name="stream" value="PT">`).',
    rubric: '2 Marks for option B.',
  },
  {
    id: 'pq-04',
    number: 4,
    type: 'Short Answer',
    courseCode: 'CPP 2104',
    courseId: 'kcau-33251',
    paperCitation: 'Paper B1 (Aug 2024) · Q1(d)',
    marks: 9,
    timeMinutes: 8,
    prompt: 'Copy and complete the 3×3 C++ Inheritance Member Visibility Table showing Child class visibility under Protected, Public, and Private derivation for Base Public, Base Private, and Base Protected members.',
    modelAnswer: 'Row 1 (Base Public): Protected deriv -> Protected | Public deriv -> Public | Private deriv -> Private.\nRow 2 (Base Private): Protected deriv -> Inaccessible | Public deriv -> Inaccessible | Private deriv -> Inaccessible.\nRow 3 (Base Protected): Protected deriv -> Protected | Public deriv -> Protected | Private deriv -> Private.',
    rubric: '1 Mark per correct cell (9 cells = 9 Marks). Deduct 1 mark if Base Private is marked "Private" instead of "Not Accessible / Inaccessible".',
  },
  {
    id: 'pq-05',
    number: 5,
    type: 'Code Writing',
    courseCode: 'CPP 2104',
    courseId: 'kcau-33251',
    paperCitation: 'Paper B2 (Aug 2025) · Q4(a-e)',
    marks: 15,
    timeMinutes: 22,
    prompt: 'Express Call Centre Ltd needs a Call Log Management System.\n(a) Explain polymorphism and give one way it applies here (3m).\n(b) State how encapsulation protects caller data (3m).\n(c) Define C++ class `CallLog` with private attributes `logNo`, `callerName`, `callReason`, `duration`, `charge`, plus public `input()` and `display()` methods (5m).\n(d) State 2 benefits of file storage over memory (2m).\n(e) Write a C++ snippet opening `calllogs.txt` and writing one record (2m).',
    modelAnswer: '(a) Polymorphism allows one interface (`computeCharge()`) to execute different billing formulas for LocalCall vs InternationalCall at runtime.\n(b) Encapsulation marks attributes `private`, preventing unauthorized external modification of charges/records except through validated public methods.\n(c) `class CallLog { private: int logNo, duration; string callerName, callReason; double charge; public: void input(){ cin>>logNo>>callerName>>callReason>>duration>>charge; } void display(){ cout<<logNo<<" "<<callerName<<" "<<charge<<endl; } };`\n(d) Persistence after shutdown; larger storage & report portability.\n(e) `#include <fstream>` -> `ofstream out("calllogs.txt", ios::app); if(out.is_open()){ out<<5558<<" Samuel_Otieno 15 150.00\\n"; out.close(); }`',
    rubric: '(a) 3m; (b) 3m; (c) 2m private fields + 3m methods/semicolon; (d) 2m; (e) 2m valid ofstream open/write/close.',
  },
  {
    id: 'pq-06',
    number: 6,
    type: 'Code Writing',
    courseCode: 'STU 1201',
    courseId: 'kcau-33500',
    paperCitation: 'Paper C1 (Aug 2012) · Q1(d) & Paper C4 (Aug 2014) · Q1(b)',
    marks: 12,
    timeMinutes: 18,
    prompt: '(a) Write a complete C program that reads `hours` and `payRate`, computes weekly gross pay (regular `hours * rate` up to 40 hrs; time-and-a-half `1.5 * rate` for hours over 40), and displays gross pay (6m).\n(b) Trace the exact output of: `int x=500, *p=&x, a[5]={100,200,300,400,500}, *p2=a; *(p2+1)=*p; *p = *p2 + *(p2+2); printf("%d %d %d", x, *p, a[1]);` (6m).',
    modelAnswer: '(a) `#include <stdio.h>\nint main(void){ double h, r, pay; scanf("%lf %lf", &h, &r); if(h <= 40) pay = h * r; else pay = 40 * r + 1.5 * r * (h - 40); printf("Gross Pay: %.2f\\n", pay); return 0; }`\n(b) Step 1: `p2` points to `a[0]` (100). Step 2: `*(p2+1) = *p` sets `a[1] = 500`. Step 3: `*p = *p2 + *(p2+2)` sets `x = a[0] + a[2] = 100 + 300 = 400`. Final output: `400 400 500`.',
    rubric: '(a) 1m headers/main, 1m scanf with &, 3m accurate if-else overtime formula, 1m printf. (b) 2m per traced value (`x=400`, `*p=400`, `a[1]=500`).',
  },
  {
    id: 'pq-07',
    number: 7,
    type: 'Code Writing',
    courseCode: 'STU 1201',
    courseId: 'kcau-33500',
    paperCitation: 'Paper C4 (Aug 2014) · Q2(c)',
    marks: 11,
    timeMinutes: 15,
    prompt: 'Create a C structure `person` with members `id`, `age`, `height`, and `weight`. Write a complete C program in `main()` that prompts the user for these details, computes Body Mass Index (`BMI = weight / (height * height)`), and echoes all details cleanly.',
    modelAnswer: '`#include <stdio.h>\nstruct person { int id, age; float height, weight; };\nint main(void) {\n  struct person p;\n  printf("Enter ID, Age, Height(m), Weight(kg): ");\n  scanf("%d %d %f %f", &p.id, &p.age, &p.height, &p.weight);\n  float bmi = p.weight / (p.height * p.height);\n  printf("ID: %d | Age: %d | Height: %.2fm | Weight: %.2fkg | BMI: %.2f\\n", p.id, p.age, p.height, p.weight, bmi);\n  return 0;\n}`',
    rubric: '3m struct declaration + trailing semicolon; 3m prompting & scanf with `&p.field`; 3m correct BMI formula; 2m formatted output.',
  },
  {
    id: 'pq-08',
    number: 8,
    type: 'Extended Essay',
    courseCode: 'CUU 2102',
    courseId: 'kcau-32622',
    paperCitation: 'Paper A2 (Apr 2026) · Q3',
    marks: 15,
    timeMinutes: 25,
    prompt: 'Case Study (Maria — KCA Postgraduate Thesis): Maria uses an undisclosed AI writing tool to draft her literature review, reuses her undergrad paper uncited, shares partially anonymized participant data on a public cloud link, submits to a high-fee rapid-publication journal unverified, and keeps inaccurate automated citations.\n(a) Identify & explain 3 key information ethics issues (6m).\n(b) Evaluate whether her AI use constitutes academic misconduct with justification (6m).\n(c) Analyze responsibilities of Student, Supervisor, and University (3m).',
    modelAnswer: '(a) 1. Self-plagiarism (reusing undergrad text uncited misrepresents originality). 2. Data Privacy/Confidentiality Breach (public cloud sharing of partially anonymized PII violates informed consent & Data Protection Act). 3. Predatory Publishing & Citation Fabrication (skipping peer review & submitting hallucinated references).\n(b) YES, it constitutes academic misconduct: (1) Undisclosed AI drafting violates authorship originality even without a specific AI clause because general integrity policies mandate original work, (2) Scholars bear personal accountability for verifying every claim/citation, (3) AI cannot hold authorship.\n(c) Student: uphold honesty, disclose tools, verify every citation. Supervisor: mentor ethically, audit drafts/citations for anomalies. University: publish explicit AI usage policies, train students, deploy integrity checks.',
    rubric: '(a) 2m per issue explained (6m); (b) 2m clear verdict + 4m structured justification (6m); (c) 1m each for student, supervisor, university (3m).',
  },
  {
    id: 'pq-09',
    number: 9,
    type: 'Short Answer',
    courseCode: 'CUU 2102',
    courseId: 'kcau-32622',
    paperCitation: 'Paper A3 (Aug 2025) · Q1(b) & Q2(a)',
    marks: 15,
    timeMinutes: 20,
    prompt: '(a) Design a comprehensive Boolean search query for "renewable energy in Africa and policy development" and explain how each operator improves relevance (10m).\n(b) State 5 ways APA 7th in-text citations differ from end-references (5m).',
    modelAnswer: '(a) Query: `("renewable energy" OR "clean energy" OR "solar power") AND (Africa OR "Sub-Saharan Africa") AND ("policy development" OR "energy polic*" OR regulation) NOT "fossil fuels"`.\nExplanation: Quotes `"..."` lock exact multi-word phrases; `OR` inside `()` captures synonyms (higher recall); `AND` requires all 3 core concepts simultaneously (higher precision); `*` truncation captures policy/policies; `NOT` excludes noise.\n(b) 1. Location (inline vs end page); 2. Detail (Author, Year vs full metadata/DOI); 3. Ordering (text order vs alphabetical); 4. Formatting (normal vs 0.5" hanging indent); 5. Purpose (claim attribution vs source retrieval).',
    rubric: '(a) 4m well-formed query + 6m operator explanations; (b) 1m per clear APA contrast (5m).',
  },
  {
    id: 'pq-10',
    number: 10,
    type: 'Code Writing',
    courseCode: 'STU 1202',
    courseId: 'kcau-33501',
    paperCitation: 'Paper D2 (Dec 2014) · Q4(a) & Paper D4 (Dec 2012) · Q5(a)',
    marks: 12,
    timeMinutes: 16,
    prompt: '(a) Write valid HTML5 code for a 3-column table where Row 1 spans all 3 columns ("KCA UNIVERSITY"), Row 2 has "CLASSES" (`rowspan="2"`), "REST SPACE" (`rowspan="2"`), and "LIBRARY", and Row 3 places "MAIN ADMIN" beneath "LIBRARY" (6m).\n(b) Write a JavaScript `validateForm()` function attached to `onsubmit` that prevents submission if the `email` input is empty or lacks `@` (6m).',
    modelAnswer: '(a) `<table border="1"><tr><th colspan="3">KCA UNIVERSITY</th></tr><tr><td rowspan="2">CLASSES</td><td rowspan="2">REST SPACE</td><td>LIBRARY</td></tr><tr><td>MAIN ADMIN</td></tr></table>`\n(b) `<form onsubmit="return validateForm()"><input id="email" type="text"><button type="submit">Go</button></form><script>function validateForm(){ const e = document.getElementById("email").value.trim(); if(!e || !e.includes("@")){ alert("Valid email required"); return false; } return true; }</script>`',
    rubric: '(a) 2m colspan="3", 2m both rowspan="2", 2m clean Row 3 single `<td>`. (b) 2m `onsubmit="return ..."`, 2m DOM lookup & condition, 2m `return false` blocking submit.',
  },
  {
    id: 'pq-11',
    number: 11,
    type: 'Short Answer',
    courseCode: 'STU 2102',
    courseId: 'kcau-33505',
    paperCitation: 'Paper E1 (Aug 2011) · Q1(a-b) & Paper E3 (Aug 2012) · Q4',
    marks: 15,
    timeMinutes: 20,
    prompt: '(a) Explain 4 characteristics of Research Sub-Problems (6m).\n(b) Differentiate between Tool, Method, Methodology, and Framework in computing research with one concrete IT example each (8m).\n(c) State the difference between Null ($H_0$) and Alternative ($H_1$) hypotheses (1m).',
    modelAnswer: '(a) 1. Each is a completely researchable sub-unit; 2. Tied to empirical data interpretation; 3. Collectively they equal the totality of the main problem; 4. Mutually exclusive and manageable in number.\n(b) Tool: Device collecting data (e.g., Google Forms questionnaire, Wireshark). Method: Specific technique (e.g., Stratified random sampling, packet capture). Methodology: Systematic strategy justifying choices (e.g., Design Science Research, Mixed-Methods). Framework: Visual/theoretical model linking IV, Moderating, and DV.\n(c) $H_0$ posits no significant relationship/effect; $H_1$ posits a statistically significant relationship/effect.',
    rubric: '(a) 1.5m per characteristic (6m); (b) 2m per term + IT example (8m); (c) 1m.',
  },
  {
    id: 'pq-12',
    number: 12,
    type: 'Short Answer',
    courseCode: 'CUU 1202',
    courseId: 'kcau-33605',
    paperCitation: 'CUU 1202 Guide L2, L3 & L7',
    marks: 15,
    timeMinutes: 20,
    prompt: '(a) Distinguish between a Valid argument and a Sound argument using a concrete syllogism example (5m).\n(b) Identify the informal fallacy in each: (i) "Don\'t trust John\'s code review; he failed networking last year." (ii) "Either we migrate to Kubernetes today or our startup goes bankrupt." (iii) "Every time I wear my blue shirt our server crashes, so the shirt causes crashes." (6m).\n(c) Apply 4 elements of SCAMPER to redesign a university library exam portal (4m).',
    modelAnswer: '(a) Valid: conclusion necessarily follows if premises were true. Sound: Valid + ALL premises factually TRUE. Example (Valid but Unsound): "All servers run Linux; Windows Server is a server; therefore Windows Server runs Linux."\n(b) (i) Ad Hominem (attacks John\'s past rather than the code review merits); (ii) False Dilemma (forces 2 extremes ignoring modular/cloud alternatives); (iii) Post Hoc Ergo Propter Hoc (confuses temporal sequence with causation).\n(c) Substitute paper exam cards with QR digital tokens; Combine timetable + spaced flashcards; Adapt offline-first PWA caching; Eliminate manual hall lookup queues.',
    rubric: '(a) 3m definitions + 2m example; (b) 2m per fallacy (1m name + 1m why it fails); (c) 1m per applied SCAMPER action.',
  },
];

export const FLASHCARD_MASTERY_KEY = 'it_study_hub_flashcard_mastery_v1';

export function getMasteredFlashcards(): string[] {
  try {
    const raw = localStorage.getItem(FLASHCARD_MASTERY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveMasteredFlashcards(ids: string[]): void {
  try {
    localStorage.setItem(FLASHCARD_MASTERY_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}
