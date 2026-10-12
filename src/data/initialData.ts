import { Course, Assignment, UserProfile } from '../types';

export const initialProfile: UserProfile = {
  "studentName": "Joseph",
  "program": "BSc in Information Technology",
  "institution": "KCA University (Virtual Campus)",
  "academicYear": "Year 1",
  "currentTerm": "Trimester 3 (2026)",
  "targetGpa": 4.0
};

export const initialCourses: Course[] = [
  // 1. OBJECT-ORIENTED TECHNOLOGIES (CPP 2104)
  {
    "id": "kcau-33251",
    "code": "CPP 2104",
    "title": "Object-Oriented Technologies",
    "instructor": "Beatrice Muthoni Kagucia",
    "schedule": "Thursday 17:30 - 20:30 (Virtual Zoom)",
    "credits": 4,
    "color": "#8b5cf6",
    "term": "Trimester 3 (2026)",
    "targetGrade": 90,
    "roomOrLink": "https://virtualcampus.kcau.ac.ke/mod/zoom/view.php?id=506075",
    "gradeComponents": [
      {
        "id": "gc-1-33251",
        "name": "CAT 1 (Continuous Assessment)",
        "weight": 15,
        "maxScore": 100
      },
      {
        "id": "gc-2-33251",
        "name": "CAT 2 (Continuous Assessment)",
        "weight": 15,
        "maxScore": 100
      },
      {
        "id": "gc-3-33251",
        "name": "OOP Practical Labs & Project",
        "weight": 10,
        "maxScore": 100
      },
      {
        "id": "gc-4-33251",
        "name": "Final Semester Examination",
        "weight": 60,
        "maxScore": 100
      }
    ],
    "syllabus": [
      {
        "id": "syl-33251-1",
        "week": 1,
        "title": "Unit 1: Introduction to Unified Modeling Language (UML)",
        "topics": [
          "UML modeling paradigms & building blocks",
          "Structural vs Behavioral diagrams",
          "Class diagrams, attributes, and visibility notation",
          "Relationships: Association, Aggregation, and Composition"
        ],
        "completed": false,
        "targetStudyMinutes": 35
      },
      {
        "id": "syl-33251-2",
        "week": 2,
        "title": "Unit 2: Core Object-Oriented Principles & Architecture",
        "topics": [
          "Classes, Objects, and State-Behavior encapsulation",
          "Constructor mechanics, overloading & object lifecycle",
          "Inheritance hierarchies & subtyping principles",
          "Polymorphism, virtual dispatch & abstract interfaces"
        ],
        "completed": false,
        "targetStudyMinutes": 40
      },
      {
        "id": "syl-33251-3",
        "week": 3,
        "title": "Constructors, Overloading & Memory Model",
        "topics": [
          "Default vs Parameterized constructors",
          "Copy constructors and deep vs shallow cloning",
          "Destructors and Garbage Collection lifecycle"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33251-4",
        "week": 4,
        "title": "Inheritance, Subtyping & super Keyword",
        "topics": [
          "Single, multilevel, and hierarchical inheritance",
          "Method overriding vs method overloading",
          "Protected access specifier and base constructor chaining"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33251-5",
        "week": 5,
        "title": "Polymorphism & Abstract Classes",
        "topics": [
          "Static vs Dynamic polymorphism",
          "Pure virtual methods & abstract class contracts",
          "Dynamic method lookup table (vtable)"
        ],
        "completed": false,
        "targetStudyMinutes": 30
      },
      {
        "id": "syl-33251-6",
        "week": 6,
        "title": "Interfaces & Multiple Interface Implementation",
        "topics": [
          "Interface contracts and loose coupling",
          "Interface vs Abstract class tradeoffs",
          "Implementing multiple behaviors"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33251-7",
        "week": 7,
        "title": "Advanced UML Class Diagrams & Multiplicity",
        "topics": [
          "Multiplicity (1..*, 0..1, *) notation",
          "Generalization vs Realization arrows",
          "Forward and reverse code engineering from UML"
        ],
        "completed": false,
        "targetStudyMinutes": 30
      },
      {
        "id": "syl-33251-8",
        "week": 8,
        "title": "Exception Handling & Enterprise Design Patterns",
        "topics": [
          "Robust error handling (try, catch, throw, finally)",
          "Custom application exceptions",
          "Singleton, Factory, and Observer design patterns"
        ],
        "completed": false,
        "targetStudyMinutes": 30
      }
    ],
    "resources": [
      {
        "id": "res-oot-u1",
        "title": "Unit 1: Introduction to UML Modeling (Full Courseware PDF)",
        "url": "/notes/object-oriented-tech/Unit 1 Intro_to_the_Unified_Modeling_Language__UML_.pdf",
        "category": "pdf",
        "fileType": "pdf",
        "fileSize": "2.2 MB",
        "week": 1,
        "covered": false
      },
      {
        "id": "res-oot-u2",
        "title": "Unit 2: Core Object-Oriented Principles & Concepts (Courseware PDF)",
        "url": "/notes/object-oriented-tech/Unit-2-1.pdf",
        "category": "pdf",
        "fileType": "pdf",
        "fileSize": "3.6 MB",
        "week": 2,
        "covered": false
      },
      {
        "id": "res-zoom-33251",
        "title": "Live Zoom Lecture Link (Thursdays 5:30 PM)",
        "url": "https://virtualcampus.kcau.ac.ke/mod/zoom/view.php?id=506075",
        "category": "zoom",
        "covered": false
      },
      {
        "id": "res-1-33251",
        "title": "Virtual Campus Unit Portal Page",
        "url": "https://virtualcampus.kcau.ac.ke/course/view.php?id=33251",
        "category": "portal",
        "covered": false
      },
      {
        "id": "res-java-33251",
        "title": "Official Java / C++ OOP Documentation",
        "url": "https://docs.oracle.com/en/java/",
        "category": "other",
        "covered": false
      }
    ],
    "notes": "Lecturer: Beatrice Muthoni Kagucia. Thursdays 5:30 PM. Focus on UML class diagrams, inheritance hierarchies, and dynamic polymorphism."
  },

  // 2. FOUNDATIONS OF CRITICAL AND CREATIVE THINKING (CUU 1202)
  {
    "id": "kcau-33605",
    "code": "CUU 1202",
    "title": "Foundations of Critical and Creative Thinking",
    "instructor": "John Kennedy Kinyua",
    "schedule": "Wednesday 17:30 - 20:30 (Virtual Zoom)",
    "credits": 3,
    "color": "#f59e0b",
    "term": "Trimester 3 (2026)",
    "targetGrade": 88,
    "roomOrLink": "https://virtualcampus.kcau.ac.ke/mod/zoom/view.php?id=488989",
    "gradeComponents": [
      {
        "id": "gc-1-33605",
        "name": "CAT 1 / Quiz 2 (Online Assessment)",
        "weight": 15,
        "maxScore": 100
      },
      {
        "id": "gc-2-33605",
        "name": "CAT 2 (Continuous Assessment)",
        "weight": 15,
        "maxScore": 100
      },
      {
        "id": "gc-3-33605",
        "name": "Group Assignment (ASS 3 Problem Solving)",
        "weight": 10,
        "maxScore": 100
      },
      {
        "id": "gc-4-33605",
        "name": "Final Semester Examination",
        "weight": 60,
        "maxScore": 100
      }
    ],
    "syllabus": [
      {
        "id": "syl-33605-1",
        "week": 1,
        "title": "Introduction & Origin of Critical and Creative Thinking",
        "topics": [
          "Philosophical origins & Socratic questioning",
          "Definition of critical thinking vs routine thinking",
          "Core intellectual standards (Clarity, Precision, Accuracy, Logic)",
          "Internal and external barriers to sound reasoning"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33605-2",
        "week": 2,
        "title": "Argument Structure, Analysis & Fallacies",
        "topics": [
          "Premises, inference indicators & conclusions",
          "Deductive (validity/soundness) vs Inductive (strength/cogency)",
          "Informal fallacies: Ad Hominem, Straw Man, False Dilemma",
          "Fallacies of relevance, ambiguity, and unwarranted assumption"
        ],
        "completed": false,
        "targetStudyMinutes": 30
      },
      {
        "id": "syl-33605-3",
        "week": 3,
        "title": "Creative Thinking & Structured Problem Solving",
        "topics": [
          "Lateral vs Vertical thinking principles",
          "SCAMPER ideation framework & mind mapping",
          "Edward de Bono's Six Thinking Hats technique",
          "Root cause analysis (5 Whys) & decision matrices"
        ],
        "completed": false,
        "targetStudyMinutes": 30
      },
      {
        "id": "syl-33605-4",
        "week": 4,
        "title": "Cognitive Biases & Mental Models in Decision Making",
        "topics": [
          "Confirmation bias and belief perseverance",
          "Availability heuristic and anchoring effects",
          "First-principles thinking in technology decisions"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33605-5",
        "week": 5,
        "title": "Divergent vs Convergent Thinking in Engineering",
        "topics": [
          "Brainstorming and synectics",
          "Hypothesis formulation in troubleshooting",
          "Iterative problem decomposition"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33605-6",
        "week": 6,
        "title": "Problem Solving Strategies & Group Dynamics",
        "topics": [
          "Group decision traps (Groupthink, polarization)",
          "Collaborative consensus building",
          "Case analysis of real-world organizational failures"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33605-7",
        "week": 7,
        "title": "Critical Evaluation of Digital Media & Data",
        "topics": [
          "Disinformation and algorithmic filter bubbles",
          "Rhetorical fallacies in technology marketing",
          "Statistical manipulation and deceptive visual graphs"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33605-8",
        "week": 8,
        "title": "Ethics, Moral Dilemmas & AI Reasoning",
        "topics": [
          "Utilitarianism vs Deontological moral theory",
          "Ethical dilemmas in autonomous computing & algorithms",
          "Personal intellectual humility and code of ethics"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      }
    ],
    "resources": [
      {
        "id": "res-ct-intro",
        "title": "Introduction and Origin of Critical and Creative Thinking (PDF Notes)",
        "url": "/notes/critical-thinking/Introduction and origin of critical and creative thinking.pdf",
        "category": "pdf",
        "fileType": "pdf",
        "fileSize": "129 KB",
        "week": 1,
        "covered": false
      },
      {
        "id": "res-ct-fallacies",
        "title": "Arguments & Fallacies: Deductive, Inductive & Informal Fallacies (PDF)",
        "url": "/notes/critical-thinking/ARGUMENTS  FALLACIES.pdf",
        "category": "pdf",
        "fileType": "pdf",
        "fileSize": "195 KB",
        "week": 2,
        "covered": false
      },
      {
        "id": "res-ct-creative",
        "title": "Creative Thinking & Structured Problem Solving (PDF Notes)",
        "url": "/notes/critical-thinking/Creative thinking and problem solving.pdf",
        "category": "pdf",
        "fileType": "pdf",
        "fileSize": "103 KB",
        "week": 3,
        "covered": false
      },
      {
        "id": "res-zoom-33605",
        "title": "Live Zoom Lecture Link (Wednesdays 5:30 PM)",
        "url": "https://virtualcampus.kcau.ac.ke/mod/zoom/view.php?id=488989",
        "category": "zoom",
        "covered": false
      },
      {
        "id": "res-1-33605",
        "title": "Virtual Campus Unit Portal Page",
        "url": "https://virtualcampus.kcau.ac.ke/course/view.php?id=33605",
        "category": "portal",
        "covered": false
      },
      {
        "id": "res-quiz-33605",
        "title": "ASS 2 Quiz Link (Closes Oct 7)",
        "url": "https://virtualcampus.kcau.ac.ke/mod/quiz/view.php?id=488842",
        "category": "portal",
        "covered": false
      }
    ],
    "notes": "Lecturer: John Kennedy Kinyua. Wednesdays 5:30 PM. Quiz 2 closes Oct 7 (8:00 PM, 10 mins). Group Assignment 3 due Oct 16 (10 Marks)."
  },

  // 3. INFORMATION LITERACY AND ACADEMIC WRITING (CUU 2102)
  {
    "id": "kcau-32622",
    "code": "CUU 2102",
    "title": "Information Literacy and Academic Writing",
    "instructor": "Benjamin Kasyoki Mutungi",
    "schedule": "Friday 17:30 - 20:30 (Virtual Zoom)",
    "credits": 3,
    "color": "#ec4899",
    "term": "Trimester 3 (2026)",
    "targetGrade": 88,
    "roomOrLink": "https://virtualcampus.kcau.ac.ke/mod/zoom/view.php?id=516769",
    "gradeComponents": [
      {
        "id": "gc-1-32622",
        "name": "CAT 1 (Continuous Assessment)",
        "weight": 15,
        "maxScore": 100
      },
      {
        "id": "gc-2-32622",
        "name": "CAT 2 (Continuous Assessment)",
        "weight": 15,
        "maxScore": 100
      },
      {
        "id": "gc-3-32622",
        "name": "Academic Essay & APA Annotated Bibliography",
        "weight": 10,
        "maxScore": 100
      },
      {
        "id": "gc-4-32622",
        "name": "Final Semester Examination",
        "weight": 60,
        "maxScore": 100
      }
    ],
    "syllabus": [
      {
        "id": "syl-32622-1",
        "week": 1,
        "title": "Part 1: Introduction to Information Literacy",
        "topics": [
          "Information landscape and academic research literacy",
          "Information need identification and formulation",
          "Scholarly vs popular communication channels",
          "CRAAP framework for critical source evaluation"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-32622-2",
        "week": 2,
        "title": "Information Literacy 1: Academic Search Strategies",
        "topics": [
          "Boolean operators (AND, OR, NOT) and syntax queries",
          "Truncation, wildcards, and phrase searching in databases",
          "Navigating KCAU library databases, IEEE Xplore, and JSTOR",
          "Peer-review verification and indexing standards"
        ],
        "completed": false,
        "targetStudyMinutes": 30
      },
      {
        "id": "syl-32622-3",
        "week": 3,
        "title": "Information Literacy 2: Plagiarism & Academic Integrity",
        "topics": [
          "Categories of plagiarism (direct, mosaic, self-plagiarism)",
          "Effective paraphrasing vs quoting techniques",
          "Turnitin similarity indexes and submission verification",
          "Copyright law, Fair Use, and Creative Commons licenses"
        ],
        "completed": false,
        "targetStudyMinutes": 30
      },
      {
        "id": "syl-32622-4",
        "week": 4,
        "title": "Information Literacy 3: Referencing Styles & APA 7th Edition",
        "topics": [
          "APA 7th Edition author-date in-text citation rules",
          "Reference list compilation for books, journals, DOIs, and websites",
          "Reference management tools (Mendeley, Zotero)",
          "Secondary citations and multi-author citation conventions"
        ],
        "completed": false,
        "targetStudyMinutes": 30
      },
      {
        "id": "syl-32622-5",
        "week": 5,
        "title": "Academic Essay Architecture & Thesis Statements",
        "topics": [
          "Arguable, concise thesis statement formulation",
          "Topic sentences, paragraph unity, and MEAL plan",
          "Academic cohesion, signposting, and transition markers"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-32622-6",
        "week": 6,
        "title": "Technical & Empirical Research Writing",
        "topics": [
          "Abstract structure (IMRAD model)",
          "Objective methodology presentation",
          "Synthesizing conflicting sources into a cohesive review"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-32622-7",
        "week": 7,
        "title": "Annotated Bibliography & Literature Review Matrices",
        "topics": [
          "Writing critical annotations vs basic summaries",
          "Constructing a thematic literature review matrix",
          "Identifying research gaps in existing literature"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-32622-8",
        "week": 8,
        "title": "Academic Proofreading, Editing & Manuscript Delivery",
        "topics": [
          "Scholarly voice, hedging, and avoiding colloquialisms",
          "Sentence variety and conciseness",
          "Final manuscript submission verification"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      }
    ],
    "resources": [
      {
        "id": "res-il-intro",
        "title": "Part 1: Introduction to Information Literacy (DOCX)",
        "url": "/notes/information-literacy/PART 1 INTRODUCTION TO IL.docx",
        "category": "notes",
        "fileType": "docx",
        "fileSize": "54 KB",
        "week": 1,
        "covered": false
      },
      {
        "id": "res-il-deck1",
        "title": "Information Literacy 1: Search Strategies & Database Research (PPTX)",
        "url": "/notes/information-literacy/Information Literacy 1.pptx",
        "category": "slides",
        "fileType": "pptx",
        "fileSize": "153 KB",
        "week": 2,
        "covered": false
      },
      {
        "id": "res-il-deck2",
        "title": "Information Literacy 2: Plagiarism, Paraphrasing & Integrity (PPTX)",
        "url": "/notes/information-literacy/Information Literacy 2.pptx",
        "category": "slides",
        "fileType": "pptx",
        "fileSize": "254 KB",
        "week": 3,
        "covered": false
      },
      {
        "id": "res-il-deck3",
        "title": "Information Literacy 3: APA 7th Referencing & Reference Tools (PPTX)",
        "url": "/notes/information-literacy/Information Literacy 3.pptx",
        "category": "slides",
        "fileType": "pptx",
        "fileSize": "226 KB",
        "week": 4,
        "covered": false
      },
      {
        "id": "res-zoom-32622",
        "title": "Live Zoom Lecture Link (Fridays 5:30 PM)",
        "url": "https://virtualcampus.kcau.ac.ke/mod/zoom/view.php?id=516769",
        "category": "zoom",
        "covered": false
      },
      {
        "id": "res-1-32622",
        "title": "Virtual Campus Unit Portal Page",
        "url": "https://virtualcampus.kcau.ac.ke/course/view.php?id=32622",
        "category": "portal",
        "covered": false
      },
      {
        "id": "res-apa-32622",
        "title": "Purdue OWL APA 7th Referencing Guide",
        "url": "https://owl.purdue.edu",
        "category": "other",
        "covered": false
      }
    ],
    "notes": "Lecturer: Benjamin Kasyoki Mutungi. Fridays 5:30 PM. Strict APA 7th referencing formatting and Turnitin similarity < 15%."
  },

  // 4. INTRODUCTION TO PROGRAMMING (STU 1201)
  {
    "id": "kcau-33500",
    "code": "STU 1201",
    "title": "Introduction to Programming",
    "instructor": "Griffin Kenga Kitili",
    "schedule": "Tuesday 17:00 - 21:00 (Virtual Zoom)",
    "credits": 4,
    "color": "#10b981",
    "term": "Trimester 3 (2026)",
    "targetGrade": 92,
    "roomOrLink": "https://virtualcampus.kcau.ac.ke/mod/zoom/view.php?id=465032",
    "gradeComponents": [
      {
        "id": "gc-1-33500",
        "name": "CAT 1 (Continuous Assessment)",
        "weight": 15,
        "maxScore": 100
      },
      {
        "id": "gc-2-33500",
        "name": "CAT 2 (Continuous Assessment)",
        "weight": 15,
        "maxScore": 100
      },
      {
        "id": "gc-3-33500",
        "name": "Programming Problem Sets & Labs",
        "weight": 10,
        "maxScore": 100
      },
      {
        "id": "gc-4-33500",
        "name": "Final Semester Examination",
        "weight": 60,
        "maxScore": 100
      }
    ],
    "syllabus": [
      {
        "id": "syl-33500-1",
        "week": 1,
        "title": "Lecture 1: Introduction to Programming Concepts",
        "topics": [
          "Program definition & execution cycle (Input-Process-Output-Storage)",
          "Source code, machine code, and bytecode differences",
          "Compilers vs Interpreters vs Assemblers",
          "Integrated Development Environments (IDEs)"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33500-2",
        "week": 2,
        "title": "Lecture 2: Programming Paradigms",
        "topics": [
          "Procedural/Structured programming (C, Pascal)",
          "Logic programming & rule deduction (Prolog)",
          "Functional programming & immutability (Haskell, Lisp)",
          "Object-Oriented (OOP) and Event-Driven Paradigms"
        ],
        "completed": false,
        "targetStudyMinutes": 30
      },
      {
        "id": "syl-33500-3",
        "week": 3,
        "title": "Lecture 3: Programming Languages Classification",
        "topics": [
          "Generations of languages (1GL to 5GL)",
          "Levels of abstraction (Low-Level vs High-Level Languages)",
          "Key qualities of a good language (Reliability, Writability, Cost)",
          "Compiled vs Interpreted languages execution"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33500-4",
        "week": 4,
        "title": "Lecture 4: Program Development Lifecycle (PDLC)",
        "topics": [
          "6 stages of PDLC (Problem definition to Maintenance)",
          "Algorithm design: Flowcharts and Pseudocode standards",
          "Dry-running and trace tables",
          "Debugging techniques and test cases"
        ],
        "completed": false,
        "targetStudyMinutes": 30
      },
      {
        "id": "syl-33500-5",
        "week": 5,
        "title": "Lecture 5: Programming Tools",
        "topics": [
          "Source code editors and syntax highlighters",
          "Compilers, Assemblers, and Linker-Loader mechanics",
          "Static analysis and interactive debuggers (breakpoints, watches)",
          "Modern IDE suites (VS Code, Code::Blocks, GCC)"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33500-6",
        "week": 6,
        "title": "Lecture 6: C Program Structure",
        "topics": [
          "Preprocessor directives (#include, #define macros)",
          "main() function signature and execution entrypoint",
          "Global vs local declaration sections",
          "Statements, blocks, code formatting, and comments"
        ],
        "completed": false,
        "targetStudyMinutes": 30
      },
      {
        "id": "syl-33500-7",
        "week": 7,
        "title": "Lecture 7: Lexical Elements in C",
        "topics": [
          "C character sets and ASCII values",
          "Keywords and identifier naming rules",
          "Literals (Integer, Real, Character, String)",
          "Operators, punctuators, and whitespace handling"
        ],
        "completed": false,
        "targetStudyMinutes": 30
      },
      {
        "id": "syl-33500-8",
        "week": 8,
        "title": "Lecture 8: Primary Data Types in C",
        "topics": [
          "Primitive types: int, short, long, float, double, char, void",
          "Signed vs unsigned type modifiers",
          "Memory allocation and ranges (sizeof operator)",
          "Format specifiers (%d, %f, %c, %s, %lf)"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33500-9",
        "week": 9,
        "title": "Lecture 9: Variables, Constants and Typecasting in C",
        "topics": [
          "Variable declaration, memory address, and initialization",
          "Constants: #define vs const qualifier",
          "Implicit type promotion and type conversion rules",
          "Explicit typecasting syntax and truncation risks"
        ],
        "completed": false,
        "targetStudyMinutes": 30
      },
      {
        "id": "syl-33500-10",
        "week": 10,
        "title": "Lecture 10: Operators in C",
        "topics": [
          "Arithmetic (+, -, *, /, %) and Relational (==, !=, <, >)",
          "Logical operators (&&, ||, !) & short-circuit evaluation",
          "Bitwise (&, |, ^, ~, <<, >>) and assignment operators",
          "Increment/decrement (++x vs x++) & operator precedence table"
        ],
        "completed": false,
        "targetStudyMinutes": 30
      }
    ],
    "resources": [
      {
        "id": "res-prog-lec1",
        "title": "Lecture 1: Introduction to Programming (PPTX)",
        "url": "/notes/intro-to-programming/Lecture 1 Introduction.pptx",
        "category": "slides",
        "fileType": "pptx",
        "fileSize": "65 KB",
        "week": 1,
        "covered": false
      },
      {
        "id": "res-prog-lec2",
        "title": "Lecture 2: Programming Paradigms (PPTX)",
        "url": "/notes/intro-to-programming/Lecture 2 Programming Paradigms.pptx",
        "category": "slides",
        "fileType": "pptx",
        "fileSize": "331 KB",
        "week": 2,
        "covered": false
      },
      {
        "id": "res-prog-lec3",
        "title": "Lecture 3: Programming Languages & Classifications (PPTX)",
        "url": "/notes/intro-to-programming/Lecture 3 Programming Languages.pptx",
        "category": "slides",
        "fileType": "pptx",
        "fileSize": "103 KB",
        "week": 3,
        "covered": false
      },
      {
        "id": "res-prog-lec4",
        "title": "Lecture 4: Program Development Lifecycle (PDF)",
        "url": "/notes/intro-to-programming/Lecture 4 Program Development Lifecycle.pdf",
        "category": "pdf",
        "fileType": "pdf",
        "fileSize": "381 KB",
        "week": 4,
        "covered": false
      },
      {
        "id": "res-prog-lec5",
        "title": "Lecture 5: Programming Tools (PDF)",
        "url": "/notes/intro-to-programming/Lecture 5 Programming Tools.pdf",
        "category": "pdf",
        "fileType": "pdf",
        "fileSize": "279 KB",
        "week": 5,
        "covered": false
      },
      {
        "id": "res-prog-lec6",
        "title": "Lecture 6: C Program Structure (PDF)",
        "url": "/notes/intro-to-programming/Lecture 6 C Program Structure.pdf",
        "category": "pdf",
        "fileType": "pdf",
        "fileSize": "713 KB",
        "week": 6,
        "covered": false
      },
      {
        "id": "res-prog-lec7",
        "title": "Lecture 7: Lexical Elements in C (PDF)",
        "url": "/notes/intro-to-programming/Lecture 7 Lexical Elements.pdf",
        "category": "pdf",
        "fileType": "pdf",
        "fileSize": "580 KB",
        "week": 7,
        "covered": false
      },
      {
        "id": "res-prog-lec8",
        "title": "Lecture 8: Primary Data Types in C (PDF)",
        "url": "/notes/intro-to-programming/Lecture 8 Primary Data Types in C.pdf",
        "category": "pdf",
        "fileType": "pdf",
        "fileSize": "293 KB",
        "week": 8,
        "covered": false
      },
      {
        "id": "res-prog-lec9",
        "title": "Lecture 9: Variables, Constants and Typecasting in C (PDF)",
        "url": "/notes/intro-to-programming/Lecture 9 Variables, Constants and Typecasting in C.pdf",
        "category": "pdf",
        "fileType": "pdf",
        "fileSize": "395 KB",
        "week": 9,
        "covered": false
      },
      {
        "id": "res-prog-lec10",
        "title": "Lecture 10: Operators in C (PDF)",
        "url": "/notes/intro-to-programming/Lecture 10 Operators in C.pdf",
        "category": "pdf",
        "fileType": "pdf",
        "fileSize": "310 KB",
        "week": 10,
        "covered": false
      },
      {
        "id": "res-zoom-33500",
        "title": "Live Zoom Lecture Link (Tuesdays 5:00 PM)",
        "url": "https://virtualcampus.kcau.ac.ke/mod/zoom/view.php?id=465032",
        "category": "zoom",
        "covered": false
      },
      {
        "id": "res-1-33500",
        "title": "Virtual Campus Unit Portal Page",
        "url": "https://virtualcampus.kcau.ac.ke/course/view.php?id=33500",
        "category": "portal",
        "covered": false
      },
      {
        "id": "res-code-33500",
        "title": "Online C/Python Compiler & Debugger (OnlineGDB)",
        "url": "https://www.onlinegdb.com",
        "category": "other",
        "covered": false
      }
    ],
    "notes": "Lecturer: Griffin Kenga Kitili. Tuesdays 5:00 PM (4-hour block). Complete 10 lecture modules available for study and review."
  },

  // 5. WEB DESIGN AND DEVELOPMENT (STU 1202)
  {
    "id": "kcau-33501",
    "code": "STU 1202",
    "title": "Web Design and Development",
    "instructor": "Gladys Mange",
    "schedule": "Saturday 11:00 - 15:00 (Virtual Zoom)",
    "credits": 4,
    "color": "#06b6d4",
    "term": "Trimester 3 (2026)",
    "targetGrade": 95,
    "roomOrLink": "https://virtualcampus.kcau.ac.ke/mod/zoom/view.php?id=534789",
    "gradeComponents": [
      {
        "id": "gc-1-33501",
        "name": "CAT 1 (Continuous Assessment)",
        "weight": 15,
        "maxScore": 100
      },
      {
        "id": "gc-2-33501",
        "name": "CAT 2 (Continuous Assessment)",
        "weight": 15,
        "maxScore": 100
      },
      {
        "id": "gc-3-33501",
        "name": "Responsive Web Application Project",
        "weight": 10,
        "maxScore": 100
      },
      {
        "id": "gc-4-33501",
        "name": "Final Semester Examination",
        "weight": 60,
        "maxScore": 100
      }
    ],
    "syllabus": [
      {
        "id": "syl-33501-1",
        "week": 1,
        "title": "Lesson 1: Services Provided by the Internet",
        "topics": [
          "Internet vs World Wide Web concepts",
          "Client-Server architecture, web browsers, and web servers",
          "Standard Internet protocols: HTTP, HTTPS, FTP, SMTP, DNS",
          "Domain names, IP addressing, and web hosting fundamentals"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33501-2",
        "week": 2,
        "title": "Lesson 2: Web Project Management",
        "topics": [
          "Web project lifecycle and development stages",
          "Requirements analysis, target audience, and site goals",
          "Information architecture, wireframing, and content strategy",
          "Project timeline, client milestones, and quality assurance"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33501-3",
        "week": 3,
        "title": "Lesson 3: Website Layout Design",
        "topics": [
          "UI/UX visual principles (Contrast, Alignment, Repetition, Proximity)",
          "Website anatomy: Header, Hero, Navigation, Main, Sidebar, Footer",
          "Grid layouts, visual hierarchy, and readability guidelines",
          "Responsive viewport planning and mobile-first approach"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33501-4",
        "week": 4,
        "title": "Lesson 4: Introduction to HTML",
        "topics": [
          "HTML document structure, DOCTYPE, and head/body elements",
          "HTML tags vs elements vs attributes",
          "Headings (h1 to h6), paragraphs (<p>), and horizontal rules (<hr>)",
          "HTML comments and source inspection"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33501-5",
        "week": 5,
        "title": "Lesson 6: Further Text Formatting in HTML",
        "topics": [
          "Physical vs Logical text formatting elements (<b>, <strong>, <i>, <em>)",
          "Subscript (<sub>), superscript (<sup>), and strikethrough (<del>)",
          "Preformatted text (<pre>) and blockquotes (<blockquote>)",
          "HTML special characters & entities (&amp;, &lt;, &copy;)"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33501-6",
        "week": 6,
        "title": "Lesson 7: Colours and Textures in Web Design",
        "topics": [
          "Color psychology & web accessibility contrast standards (WCAG)",
          "Color specification: Named colors, HEX codes (#RRGGBB), and RGB/RGBA",
          "Background colors and repeating background textures",
          "Color schemes (monochromatic, complementary, analogous)"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33501-7",
        "week": 7,
        "title": "Lesson 8: Introduction to HTML Lists",
        "topics": [
          "Ordered lists (<ol>) and type attributes (1, a, A, i, I)",
          "Unordered lists (<ul>) and bullet styling (disc, circle, square)",
          "Description / Definition lists (<dl>, <dt>, <dd>)",
          "Nested list structures and building website navigation menus"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33501-8",
        "week": 8,
        "title": "Lesson 9: Graphical Images in Web Pages",
        "topics": [
          "Image insertion with <img> tag (src, alt, width, height)",
          "Web graphic file formats: JPEG, PNG, GIF, SVG, and WebP",
          "Image resolution, compression, and load performance",
          "Making images clickable and responsive"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33501-9",
        "week": 9,
        "title": "Lesson 10: Hyperlinks & Navigation",
        "topics": [
          "Anchor tag (<a>) and href attribute",
          "Absolute URLs vs relative site paths",
          "Target attributes (_blank, _self) and security (rel='noopener')",
          "Page bookmark jumps (id fragment identifiers) and email links (mailto:)"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33501-10",
        "week": 10,
        "title": "Lesson 11: Web Forms & Interactive Inputs",
        "topics": [
          "The <form> element, action URLs, and GET vs POST methods",
          "Input controls: text, password, email, number, date, radio, checkbox",
          "Multi-line <textarea> and drop-down menus (<select>, <option>)",
          "Form labels (<label for>), fieldsets, legends, and HTML5 validation"
        ],
        "completed": false,
        "targetStudyMinutes": 30
      },
      {
        "id": "syl-33501-11",
        "week": 11,
        "title": "Lesson 12: HTML Tables & Data Presentation",
        "topics": [
          "Table markup: <table>, <tr>, <th>, and <td>",
          "Table layout structure: <thead>, <tbody>, and <tfoot>",
          "Spanning cells: colspan and rowspan attributes",
          "Styling clean tabular data and responsive overflow"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33501-12",
        "week": 12,
        "title": "Lesson 13: HTML Frames & Modern Iframes",
        "topics": [
          "Historical framesets vs modern <iframe> embedding",
          "Embedding maps, video players, and third-party documents",
          "Iframe attributes (src, title, width, height, loading='lazy')",
          "Security sandboxing (sandbox attribute, cross-origin rules)"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33501-13",
        "week": 13,
        "title": "CSS Comprehensive Notes, Box Model & Modern Styling",
        "topics": [
          "CSS syntax: Selectors, properties, and values",
          "Inline, internal (<style>), and external stylesheet linking (<link>)",
          "The CSS Box Model: Margin, Border, Padding, and Content",
          "Flexbox layout essentials, CSS Grid, and media query breakpoints"
        ],
        "completed": false,
        "targetStudyMinutes": 35
      }
    ],
    "resources": [
      {
        "id": "res-wd-l1",
        "title": "Lesson 1: Services Provided by the Internet (PDF)",
        "url": "/notes/web-design/Lesson 1 services provided by the internet.pdf",
        "category": "pdf",
        "fileType": "pdf",
        "fileSize": "199 KB",
        "week": 1,
        "covered": false
      },
      {
        "id": "res-wd-l2",
        "title": "Lesson 2: Web Project Management (PDF)",
        "url": "/notes/web-design/Lesson 2 Web Project management.pdf",
        "category": "pdf",
        "fileType": "pdf",
        "fileSize": "225 KB",
        "week": 2,
        "covered": false
      },
      {
        "id": "res-wd-l3",
        "title": "Lesson 3: Website Layout Design (PDF)",
        "url": "/notes/web-design/Lesson 3 Website Layout Design.pdf",
        "category": "pdf",
        "fileType": "pdf",
        "fileSize": "224 KB",
        "week": 3,
        "covered": false
      },
      {
        "id": "res-wd-l4",
        "title": "Lesson 4: Introduction to HTML (PDF)",
        "url": "/notes/web-design/l4 HTML.pdf",
        "category": "pdf",
        "fileType": "pdf",
        "fileSize": "90 KB",
        "week": 4,
        "covered": false
      },
      {
        "id": "res-wd-l6",
        "title": "Lesson 6: Further Text Formatting in HTML (PDF)",
        "url": "/notes/web-design/l6 Further Text Formatting.pdf",
        "category": "pdf",
        "fileType": "pdf",
        "fileSize": "102 KB",
        "week": 5,
        "covered": false
      },
      {
        "id": "res-wd-l7",
        "title": "Lesson 7: Colours and Textures in Web Design (PDF)",
        "url": "/notes/web-design/l7 Colours and Textures.pdf",
        "category": "pdf",
        "fileType": "pdf",
        "fileSize": "85 KB",
        "week": 6,
        "covered": false
      },
      {
        "id": "res-wd-l8",
        "title": "Lesson 8: Introduction to HTML Lists (PDF)",
        "url": "/notes/web-design/l8 introduction to lists.pdf",
        "category": "pdf",
        "fileType": "pdf",
        "fileSize": "87 KB",
        "week": 7,
        "covered": false
      },
      {
        "id": "res-wd-l9",
        "title": "Lesson 9: Graphical Images in Web Pages (PDF)",
        "url": "/notes/web-design/l9 Graphical images.pdf",
        "category": "pdf",
        "fileType": "pdf",
        "fileSize": "81 KB",
        "week": 8,
        "covered": false
      },
      {
        "id": "res-wd-l10",
        "title": "Lesson 10: Hyperlinks & Site Navigation (PDF)",
        "url": "/notes/web-design/l10 Hyperlinks.pdf",
        "category": "pdf",
        "fileType": "pdf",
        "fileSize": "102 KB",
        "week": 9,
        "covered": false
      },
      {
        "id": "res-wd-l11",
        "title": "Lesson 11: Web Forms & Interactive Inputs (PDF)",
        "url": "/notes/web-design/l11Forms.pdf",
        "category": "pdf",
        "fileType": "pdf",
        "fileSize": "97 KB",
        "week": 10,
        "covered": false
      },
      {
        "id": "res-wd-l12",
        "title": "Lesson 12: HTML Tables & Data Presentation (PDF)",
        "url": "/notes/web-design/l12 tables.pdf",
        "category": "pdf",
        "fileType": "pdf",
        "fileSize": "88 KB",
        "week": 11,
        "covered": false
      },
      {
        "id": "res-wd-l13",
        "title": "Lesson 13: HTML Frames & Iframes (PDF)",
        "url": "/notes/web-design/L13 Frames.pdf",
        "category": "pdf",
        "fileType": "pdf",
        "fileSize": "79 KB",
        "week": 12,
        "covered": false
      },
      {
        "id": "res-wd-css",
        "title": "CSS Comprehensive Notes & Selectors Reference (PDF)",
        "url": "/notes/web-design/CSS notes.pdf",
        "category": "notes",
        "fileType": "pdf",
        "fileSize": "358 KB",
        "week": 13,
        "covered": false
      },
      {
        "id": "res-zoom-33501",
        "title": "Live Zoom Lecture Link (Saturdays 11:00 AM)",
        "url": "https://virtualcampus.kcau.ac.ke/mod/zoom/view.php?id=534789",
        "category": "zoom",
        "covered": false
      },
      {
        "id": "res-1-33501",
        "title": "Virtual Campus Unit Portal Page",
        "url": "https://virtualcampus.kcau.ac.ke/course/view.php?id=33501",
        "category": "portal",
        "covered": false
      },
      {
        "id": "res-mdn-33501",
        "title": "MDN Web Docs (HTML5 & CSS3 Standard Reference)",
        "url": "https://developer.mozilla.org",
        "category": "other",
        "covered": false
      }
    ],
    "notes": "Lecturer: Gladys Mange. Saturdays 11:00 AM – 3:00 PM (4-hour practical). 13 complete lecture modules and CSS notes available."
  },

  // 6. COMPUTING RESEARCH SKILLS AND DESIGN (STU 2102)
  {
    "id": "kcau-33505",
    "code": "STU 2102",
    "title": "Computing Research Skills and Design",
    "instructor": "Gladys Mange",
    "schedule": "Monday 17:30 - 20:30 (Virtual Zoom)",
    "credits": 3,
    "color": "#3b82f6",
    "term": "Trimester 3 (2026)",
    "targetGrade": 88,
    "roomOrLink": "https://virtualcampus.kcau.ac.ke/mod/zoom/view.php?id=457724",
    "gradeComponents": [
      {
        "id": "gc-1-33505",
        "name": "CAT 1 (Continuous Assessment)",
        "weight": 15,
        "maxScore": 100
      },
      {
        "id": "gc-2-33505",
        "name": "CAT 2 (Continuous Assessment)",
        "weight": 15,
        "maxScore": 100
      },
      {
        "id": "gc-3-33505",
        "name": "Computing Research Proposal Defense",
        "weight": 10,
        "maxScore": 100
      },
      {
        "id": "gc-4-33505",
        "name": "Final Semester Examination",
        "weight": 60,
        "maxScore": 100
      }
    ],
    "syllabus": [
      {
        "id": "syl-33505-1",
        "week": 1,
        "title": "Research Methodology L1: Introduction to Research",
        "topics": [
          "Empirical computing research paradigms & scientific inquiry",
          "Types of research: Pure, Applied, Quantitative, Qualitative, Experimental",
          "Objectives, characteristics, and criteria of good computing research",
          "The research journey: From problem identification to publication"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33505-2",
        "week": 2,
        "title": "Research Problem L2: Identifying and Formulating the Problem",
        "topics": [
          "Sources of computing research problems & gap analysis",
          "Formulating an unambiguous problem statement",
          "Research questions vs specific research objectives",
          "Research hypothesis formulation (Null vs Alternative)"
        ],
        "completed": false,
        "targetStudyMinutes": 30
      },
      {
        "id": "syl-33505-3",
        "week": 3,
        "title": "Research Methodology III: Literature Review & Search Strategies",
        "topics": [
          "Purpose and scope of a scholarly literature review",
          "Primary vs secondary computing literature",
          "Systematic searching in IEEE Xplore, ACM Digital Library, Scopus, Google Scholar",
          "Structuring a thematic literature review synthesis matrix"
        ],
        "completed": false,
        "targetStudyMinutes": 30
      },
      {
        "id": "syl-33505-4",
        "week": 4,
        "title": "Research Methodology IV b: Theoretical & Conceptual Frameworks",
        "topics": [
          "Variables in computing: Independent, Dependent, Moderating, and Extraneous",
          "Conceptual framework diagrams and relationship hypotheses",
          "Grounding research in established theoretical frameworks",
          "Operationalizing variables into measurable metrics"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33505-5",
        "week": 5,
        "title": "Research Methodology V a: Research Design in Computing",
        "topics": [
          "Experimental and quasi-experimental design in software systems",
          "Action research, Design Science Research (DSR), and case studies",
          "Survey research design and benchmark telemetry methodology",
          "Internal and external validity in software experiments"
        ],
        "completed": false,
        "targetStudyMinutes": 30
      },
      {
        "id": "syl-33505-6",
        "week": 6,
        "title": "Research Methodology V b: Sampling & Participant Selection",
        "topics": [
          "Target population, accessible population, and sample frame",
          "Probability sampling (Simple random, stratified, cluster)",
          "Non-probability sampling (Purposive, convenience, snowball)",
          "Determining representative sample size for IT usability studies"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33505-7",
        "week": 7,
        "title": "Research Methodology VI: Data Collection Methods & Instruments",
        "topics": [
          "Designing valid questionnaires and Likert scales",
          "Technical telemetry, API logging, and automated benchmark logging",
          "Interviews and focus group protocols",
          "Instrument reliability (Cronbach's alpha) and construct validity"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33505-8",
        "week": 8,
        "title": "Referencing and Citations L7: Academic Standards & Plagiarism",
        "topics": [
          "IEEE citation format vs APA 7th style conventions in computing",
          "In-text citations, bracketed numbers, and author-date methods",
          "Compiling comprehensive bibliography with DOIs and URLs",
          "Turnitin similarity analysis and avoiding academic malpractice"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      },
      {
        "id": "syl-33505-9",
        "week": 9,
        "title": "Writing a Research Proposal L7: Structure & Defense",
        "topics": [
          "KCAU Proposal structure: Chapter 1, Chapter 2, and Chapter 3",
          "Writing clear research scopes, limitations, and significance",
          "Work breakdown structure (Gantt chart) and research budget",
          "Defending the proposal: Presentation slides and handling critique"
        ],
        "completed": false,
        "targetStudyMinutes": 30
      },
      {
        "id": "syl-33505-10",
        "week": 10,
        "title": "Research Methodology VIIb: Data Analysis & Statistical Interpretation",
        "topics": [
          "Descriptive statistics (Mean, Median, Mode, Standard Deviation)",
          "Inferential tests: Correlation, t-tests, ANOVA, and Chi-square",
          "Analyzing telemetry benchmark data and system performance curves",
          "Interpreting p-values, statistical significance, and conclusions"
        ],
        "completed": false,
        "targetStudyMinutes": 30
      },
      {
        "id": "syl-33505-11",
        "week": 11,
        "title": "Ethical Issues in Computing Research L8",
        "topics": [
          "Informed consent, participant privacy, and anonymization",
          "Kenyan Data Protection Act 2019 compliance in data handling",
          "Ethics in artificial intelligence, algorithms, and automated profiling",
          "Institutional Review Board (IRB) and ethical clearance protocols"
        ],
        "completed": false,
        "targetStudyMinutes": 25
      }
    ],
    "resources": [
      {
        "id": "res-rs-l1",
        "title": "Research Methodology L1: Introduction to Research (PPTX)",
        "url": "/notes/computing-research/Research Methodology L1.pptx",
        "category": "slides",
        "fileType": "pptx",
        "fileSize": "118 KB",
        "week": 1,
        "covered": false
      },
      {
        "id": "res-rs-l2",
        "title": "Research Problem L2: Identifying and Formulating the Problem (PPT)",
        "url": "/notes/computing-research/Research Problem L2.ppt",
        "category": "slides",
        "fileType": "ppt",
        "fileSize": "878 KB",
        "week": 2,
        "covered": false
      },
      {
        "id": "res-rs-l3",
        "title": "Research Methodology III: Literature Review & Search Strategies (PPT)",
        "url": "/notes/computing-research/RESEARCH_METHODOLOGY_III_.ppt",
        "category": "slides",
        "fileType": "ppt",
        "fileSize": "191 KB",
        "week": 3,
        "covered": false
      },
      {
        "id": "res-rs-l4b",
        "title": "Research Methodology IV b: Theoretical & Conceptual Frameworks (PPT)",
        "url": "/notes/computing-research/RESEARCH_METHODOLOGY_IV_b.ppt",
        "category": "slides",
        "fileType": "ppt",
        "fileSize": "212 KB",
        "week": 4,
        "covered": false
      },
      {
        "id": "res-rs-l5a",
        "title": "Research Methodology V a: Research Design in Computing (PPT)",
        "url": "/notes/computing-research/RESEARCH_METHODOLOGY_V_a_.ppt",
        "category": "slides",
        "fileType": "ppt",
        "fileSize": "201 KB",
        "week": 5,
        "covered": false
      },
      {
        "id": "res-rs-l5b",
        "title": "Research Methodology V b: Sampling & Participant Selection (PPT)",
        "url": "/notes/computing-research/RESEARCH_METHODOLOGY_V_b_.ppt",
        "category": "slides",
        "fileType": "ppt",
        "fileSize": "54 KB",
        "week": 6,
        "covered": false
      },
      {
        "id": "res-rs-l6",
        "title": "Research Methodology VI: Data Collection Methods & Instruments (PPT)",
        "url": "/notes/computing-research/RESEARCH_METHODOLOGY_VI_.ppt",
        "category": "slides",
        "fileType": "ppt",
        "fileSize": "108 KB",
        "week": 7,
        "covered": false
      },
      {
        "id": "res-rs-l7-ref",
        "title": "Referencing and Citations L7: Academic Standards & Plagiarism (PPT)",
        "url": "/notes/computing-research/referencing and citations L7.ppt",
        "category": "slides",
        "fileType": "ppt",
        "fileSize": "353 KB",
        "week": 8,
        "covered": false
      },
      {
        "id": "res-rs-l7-prop",
        "title": "Writing a Research Proposal L7: Structure & Defense (PPT)",
        "url": "/notes/computing-research/writing a proposal L7.ppt",
        "category": "slides",
        "fileType": "ppt",
        "fileSize": "653 KB",
        "week": 9,
        "covered": false
      },
      {
        "id": "res-rs-l7b",
        "title": "Research Methodology VIIb: Data Analysis & Statistical Interpretation (PPT)",
        "url": "/notes/computing-research/RESEARCH_METHODOLOGY_VIIb.ppt",
        "category": "slides",
        "fileType": "ppt",
        "fileSize": "279 KB",
        "week": 10,
        "covered": false
      },
      {
        "id": "res-rs-l8-eth",
        "title": "Ethical Issues in Computing Research L8 (PPT)",
        "url": "/notes/computing-research/Ethical Issues L 8.ppt",
        "category": "slides",
        "fileType": "ppt",
        "fileSize": "646 KB",
        "week": 11,
        "covered": false
      },
      {
        "id": "res-zoom-33505",
        "title": "Live Zoom Lecture Link (Mondays 5:30 PM)",
        "url": "https://virtualcampus.kcau.ac.ke/mod/zoom/view.php?id=457724",
        "category": "zoom",
        "covered": false
      },
      {
        "id": "res-1-33505",
        "title": "Virtual Campus Unit Portal Page",
        "url": "https://virtualcampus.kcau.ac.ke/course/view.php?id=33505",
        "category": "portal",
        "covered": false
      },
      {
        "id": "res-scholar-33505",
        "title": "Google Scholar / IEEE Xplore Portal",
        "url": "https://scholar.google.com",
        "category": "other",
        "covered": false
      }
    ],
    "notes": "Lecturer: Gladys Mange. Mondays 5:30 PM. 11 full lecture presentations available from Research Methodology L1 to Ethical Issues L8."
  }
];

export const initialAssignments: Assignment[] = [
  {
    "id": "kcau-evt-478802",
    "courseId": "kcau-33605",
    "title": "CUU 1202: Quiz 2 (ASS 2) - Critical Thinking",
    "description": "Quiz 2: 5 multiple choice questions (5 Marks). Opens on 7th October 2026 at 8:00 PM and closes at 8:30 PM. Once attempted, you have only 10 minutes. No second attempt allowed!",
    "type": "cat",
    "priority": "high",
    "dueDate": "2026-10-07T20:30",
    "status": "not_started",
    "weight": 5,
    "submissionLink": "https://virtualcampus.kcau.ac.ke/mod/quiz/view.php?id=488842",
    "notes": "CRITICAL: Opens Oct 7 at 8:00 PM. 10 minutes timer. Review informal fallacies and deductive arguments beforehand!"
  },
  {
    "id": "kcau-evt-478793",
    "courseId": "kcau-33605",
    "title": "CUU 1202: Group Assignment 3 (ASS 3) - Problem Solving",
    "description": "As a group, discuss various strategies of solving problems and decision making (10 Marks). Submit comprehensive report on Virtual Campus.",
    "type": "project",
    "priority": "high",
    "dueDate": "2026-10-16T17:00",
    "status": "not_started",
    "weight": 10,
    "submissionLink": "https://virtualcampus.kcau.ac.ke/mod/assign/view.php?id=488845",
    "notes": "Group Assignment worth 10 Marks. Coordinate with your group members early to finalize the writeup."
  },
  {
    "id": "asg-stu1202-project",
    "courseId": "kcau-33501",
    "title": "STU 1202: Responsive Web Design Project",
    "description": "Build a responsive multi-page website using semantic HTML5, CSS Flexbox & CSS Grid with mobile-first breakpoints.",
    "type": "project",
    "priority": "high",
    "dueDate": "2026-10-18T23:59",
    "status": "not_started",
    "weight": 10,
    "submissionLink": "https://virtualcampus.kcau.ac.ke/course/view.php?id=33501",
    "notes": "Test on both mobile viewport and desktop before submitting on Virtual Campus."
  },
  {
    "id": "asg-stu1201-lab",
    "courseId": "kcau-33500",
    "title": "STU 1201: C Programming Problem Set 1",
    "description": "Implement flowchart algorithms, nested loops, and memory trace tables for 10 numerical problems in C.",
    "type": "lab",
    "priority": "medium",
    "dueDate": "2026-10-14T21:00",
    "status": "not_started",
    "weight": 5,
    "submissionLink": "https://virtualcampus.kcau.ac.ke/course/view.php?id=33500",
    "notes": "Include dry-run screenshots in your lab report PDF."
  },
  {
    "id": "cat-cpp2104-cat1",
    "courseId": "kcau-33251",
    "title": "CPP 2104: CAT 1 - OOP Principles & Encapsulation",
    "description": "Continuous Assessment Test 1 covering classes, constructor overloading, memory model, and access specifiers.",
    "type": "cat",
    "priority": "high",
    "dueDate": "2026-10-22T18:00",
    "status": "not_started",
    "weight": 15,
    "submissionLink": "https://virtualcampus.kcau.ac.ke/course/view.php?id=33251",
    "notes": "Lecturer: Beatrice Muthoni Kagucia. Review class diagram notations and constructor definitions."
  },
  {
    "id": "cat-stu1201-cat1",
    "courseId": "kcau-33500",
    "title": "STU 1201: CAT 1 - Flowcharts, Conditionals & Loops",
    "description": "Continuous Assessment Test 1 covering algorithmic logic, nested loops, conditional evaluations, and code tracing.",
    "type": "cat",
    "priority": "high",
    "dueDate": "2026-10-20T17:30",
    "status": "not_started",
    "weight": 15,
    "submissionLink": "https://virtualcampus.kcau.ac.ke/course/view.php?id=33500",
    "notes": "Lecturer: Griffin Kenga Kitili. Bring scratch paper for trace tables and dry-runs."
  },
  {
    "id": "cat-stu1202-cat1",
    "courseId": "kcau-33501",
    "title": "STU 1202: CAT 1 - HTML5, CSS Box Model & Flexbox",
    "description": "Continuous Assessment Test 1 covering web architecture, semantic markup, and responsive Flexbox layout implementation.",
    "type": "cat",
    "priority": "high",
    "dueDate": "2026-10-24T12:00",
    "status": "not_started",
    "weight": 15,
    "submissionLink": "https://virtualcampus.kcau.ac.ke/course/view.php?id=33501",
    "notes": "Lecturer: Gladys Mange. Be prepared for live layout coding."
  },
  {
    "id": "cat-stu2102-cat1",
    "courseId": "kcau-33505",
    "title": "STU 2102: CAT 1 - Research Problem & Empirical Design",
    "description": "Continuous Assessment Test 1 covering computing paradigms, empirical design, and research questions formulation.",
    "type": "cat",
    "priority": "high",
    "dueDate": "2026-10-26T18:00",
    "status": "not_started",
    "weight": 15,
    "submissionLink": "https://virtualcampus.kcau.ac.ke/course/view.php?id=33505",
    "notes": "Lecturer: Gladys Mange. Review research matrix models from Week 1-3."
  },
  {
    "id": "cat-cuu2102-cat1",
    "courseId": "kcau-32622",
    "title": "CUU 2102: CAT 1 - Academic Writing & APA Referencing",
    "description": "Continuous Assessment Test 1 covering search strategies, CRAAP test, in-text citations, and reference list formatting.",
    "type": "cat",
    "priority": "high",
    "dueDate": "2026-10-30T18:00",
    "status": "not_started",
    "weight": 15,
    "submissionLink": "https://virtualcampus.kcau.ac.ke/course/view.php?id=32622",
    "notes": "Lecturer: Benjamin Kasyoki Mutungi. Memorize author-date formatting and journal reference entries."
  }
];
