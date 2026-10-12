export interface SlideContent {
  slideNumber: number;
  title: string;
  bullets: string[];
  notes?: string;
  codeSnippet?: string;
}

export interface LectureDeck {
  id: string;
  courseCode: string;
  lectureNumber: number;
  title: string;
  filename: string;
  downloadUrl: string;
  fileSize: string;
  objectives: string[];
  slides: SlideContent[];
  activities: {
    title: string;
    description: string;
    tasks?: string[];
  }[];
  exercises: string[];
  references: string[];
}

export const STU_1201_LECTURES: LectureDeck[] = [
  {
    id: 'stu1201-lec-1',
    courseCode: 'STU 1201',
    lectureNumber: 1,
    title: 'Lecture 1: Introduction to Programming',
    filename: 'Lecture 1 Introduction.pptx',
    downloadUrl: '/notes/intro-to-programming/Lecture 1 Introduction.pptx',
    fileSize: '65 KB',
    objectives: [
      'Describe the basic concepts in computer programming.',
      'Describe the general operations of a computer program.'
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'Introduction & Lesson Objectives',
        bullets: [
          'Lesson objectives for Session 1',
          'Describe the basic concepts in computer programming',
          'Describe the general operations of a computer program'
        ]
      },
      {
        slideNumber: 2,
        title: 'What is a Program?',
        bullets: [
          'Program: Sequence of instructions that a computer can decode and execute.',
          'Instructs the hardware on what computations to perform and in what order.'
        ]
      },
      {
        slideNumber: 3,
        title: 'How a Program Works',
        bullets: [
          'All programs in general work through a cycle:',
          '1. Input: Receiving raw data from keyboard, mouse, or file.',
          '2. Process: Processing or manipulating data in CPU / Memory.',
          '3. Output: Generating meaningful results on screen, printer, or network.',
          '4. Storage: Saving results or state to secondary storage for later retrieval.'
        ]
      },
      {
        slideNumber: 4,
        title: 'Activity 1: Programming Defined',
        bullets: [
          'Activity: Define the term "programming".',
          'Discuss how human logic is translated into unambiguous machine instructions.'
        ]
      },
      {
        slideNumber: 5,
        title: 'Exercise 1: Core Concepts',
        bullets: [
          'Define the following foundational concepts:',
          '• Source Code: High-level instructions written by a programmer.',
          '• Compiler: Translates entire source code into machine code before execution.',
          '• Interpreter: Translates and executes source code line-by-line.',
          '• Integrated Development Environment (IDE): Software suite combining editor, compiler, and debugger.',
          '• Machine Code: Low-level binary instructions (0s and 1s) directly understood by CPU.'
        ]
      },
      {
        slideNumber: 6,
        title: 'References & Further Reading',
        bullets: [
          'An Introduction to Programming by Wu Thomas, Norman and Theodore (McGraw-Hill).',
          'The C Programming Language by Brian W. Kernighan & Dennis M. Ritchie (Prentice Hall).',
          'C How to Program by H.M. Deitel & P.J. Deitel (Prentice Hall).',
          'Websites: tutorialspoint.com/cprogramming, learn-c.org, w3schools.in/c-tutorial.'
        ]
      }
    ],
    activities: [
      {
        title: 'Activity 1: Conceptualizing Programming',
        description: 'Define the term "programming" in your own words and explain how algorithms bridge the gap between real-world problems and computer execution.'
      }
    ],
    exercises: [
      'Define Source Code, Compiler, Interpreter, IDE, and Machine Code.',
      'Explain the Input -> Process -> Output -> Storage lifecycle with a real-world example.'
    ],
    references: [
      'The C Programming Language (Kernighan & Ritchie)',
      'C How to Program (Deitel & Deitel)',
      'https://www.learn-c.org/'
    ]
  },
  {
    id: 'stu1201-lec-2',
    courseCode: 'STU 1201',
    lectureNumber: 2,
    title: 'Lecture 2: Programming Paradigms',
    filename: 'Lecture 2 Programming Paradigms.pptx',
    downloadUrl: '/notes/intro-to-programming/Lecture 2 Programming Paradigms.pptx',
    fileSize: '331 KB',
    objectives: [
      'Explain the necessity of knowledge about programming paradigms.',
      'Discuss various programming paradigms in detail.',
      'Select a programming paradigm for a given programming task.'
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'Lesson Objectives',
        bullets: [
          'Explain the necessity of knowledge about programming paradigms.',
          'Discuss various programming paradigms in detail.',
          'Select an appropriate programming paradigm for a given problem.'
        ]
      },
      {
        slideNumber: 2,
        title: '1. Procedural Programming (Structured Programming)',
        bullets: [
          'Specifies the exact sequence of steps a program must take to reach a desired state (ordered sequences of actions).',
          'Advantages: Easy to understand and follow; works exceptionally well for small and simple tasks.',
          'Disadvantages: Hard to manage as programs grow large; limited code reuse.',
          'Real-life Analogy: Following a recipe, filing tax returns, ATM cash withdrawal steps.',
          'Primary Languages: C, BASIC, Pascal.'
        ]
      },
      {
        slideNumber: 3,
        title: '2. Logic Programming',
        bullets: [
          'Defines program logic without detailed control flow. Views computation as automated reasoning over a body of knowledge.',
          'Structures programs around rules and logical relationships (facts + rules = deduction).',
          'Advantages: Superb for solving complex decision problems; focuses on "what is true" rather than "how to solve".',
          'Disadvantages: Hard to understand for beginners; can be computationally slower for very large rule sets.',
          'Real-life Applications: Legal reasoning systems, medical diagnosis expert systems.',
          'Primary Languages: Prolog, Python (with logic frameworks).'
        ]
      },
      {
        slideNumber: 4,
        title: '3. Functional Programming',
        bullets: [
          'Involves creating programs using mathematical expressions and pure functions without mutating state or data.',
          'Functions act as both data and algorithm; avoids side effects.',
          'Advantages: Fewer errors/bugs since there is no mutable shared state; highly predictable and easy to unit test.',
          'Disadvantages: Less intuitive for imperative beginners; can use more memory for some low-level tasks.',
          'Real-life Applications: Payroll and financial calculations, high-volume data transformations.',
          'Primary Languages: Haskell, Lisp, Erlang, modern JavaScript/Python functional subsets.'
        ]
      },
      {
        slideNumber: 5,
        title: '4. Object-Oriented Programming (OOP)',
        bullets: [
          'Organizes programs into objects: cohesive data structures consisting of attributes (data fields) and behaviors (methods).',
          'Describes real-world entities and what they can do (e.g. Student, BankAccount, Vehicle).',
          'Advantages: Models real-world systems intuitively; promotes code reuse via inheritance and modularity.',
          'Disadvantages: Complex design upfront; higher memory footprint.',
          'Real-life Applications: University management systems, mobile apps, enterprise banking.',
          'Primary Languages: C++, Java, C#, Python.'
        ]
      },
      {
        slideNumber: 6,
        title: '5. Event-Driven Programming (EDP)',
        bullets: [
          'Program control flow is determined by external or internal events (mouse clicks, key presses, sensor signals, timers, or messages).',
          'Program runs an event loop that waits for an event and dispatches the corresponding event handler / callback.',
          'Advantages: Highly responsive; ideal for modern interactive GUIs and IoT sensor devices.',
          'Disadvantages: Harder to trace sequential flow; debugging asynchronous event listeners can be tricky.',
          'Real-life Applications: Mobile touch apps, web UI buttons, traffic light sensors.',
          'Primary Languages: JavaScript, C#, VB.NET.'
        ]
      },
      {
        slideNumber: 7,
        title: 'Comparison Matrix & Conclusion',
        bullets: [
          'Programming paradigms represent different thinking styles and structural architectures.',
          'A program can be structured as sequential steps (Procedural), logical deductions (Logic), mathematical transformations (Functional), interacting entities (OOP), or event reactions (Event-driven).',
          'Professional software engineers choose the paradigm that best fits the problem constraints.'
        ]
      },
      {
        slideNumber: 8,
        title: 'Activity 1: Paradigm Comparison Matrix',
        bullets: [
          'Construct a comparison table evaluating Procedural, Logic, OOP, and Functional paradigms across 4 metrics:',
          '1. Core Focus',
          '2. Two Key Advantages',
          '3. Two Drawbacks / Tradeoffs',
          '4. Two Major Real-World Applications'
        ]
      },
      {
        slideNumber: 9,
        title: 'Activity 2: University Computer Lab Access Control',
        bullets: [
          'Problem: Managing student and staff entry into a KCA University Computer Lab.',
          'Group A: Lab assistant is new and must follow fixed strict sequential steps (Procedural).',
          'Group B: Access depends on dynamic rule validation: valid ID + correct time window + registered unit (Logic).',
          'Group C: Entry decision must be 100% deterministic and stateless without altering database history (Functional).',
          'Group D: System represents Students, Labs, Terminals, and AccessPermissions with methods like grantAccess() (OOP).',
          'Group E: Turnstiles unlock only when an RFID tag or NFC sensor taps the reader (Event-Driven).'
        ]
      },
      {
        slideNumber: 10,
        title: 'Self-Check Exercises',
        bullets: [
          '1. Differentiate between a programming convention (syntax style, naming rules) and a programming paradigm (fundamental design approach).',
          '2. Describe two distinct advantages of procedural programming for embedded systems.',
          '3. Differentiate between imperative paradigms (how to compute) and declarative paradigms (what to compute).'
        ]
      }
    ],
    activities: [
      {
        title: 'Activity 1: Comparison Matrix',
        description: 'Construct a comparison matrix for Procedural, Logic, Object-Oriented, and Functional paradigms covering focus, 2 advantages, 2 drawbacks, and 2 applications.'
      }
    ],
    exercises: [
      'Differentiate between programming convention and programming paradigm.',
      'Describe any two advantages of procedural programming language.',
      'Differentiate between imperative and declarative programming paradigms.'
    ],
    references: [
      'An Introduction to Programming by Wu Thomas, Norman and Theodore (McGill, 1997)',
      'The C Programming Language (Kernighan & Ritchie, 2nd Ed)'
    ]
  },
  {
    id: 'stu1201-lec-3',
    courseCode: 'STU 1201',
    lectureNumber: 3,
    title: 'Lecture 3: Programming Languages Classification',
    filename: 'Lecture 3 Programming Languages.pptx',
    downloadUrl: '/notes/intro-to-programming/Lecture 3 Programming Languages.pptx',
    fileSize: '103 KB',
    objectives: [
      'Define the term programming language and explain why we study different languages.',
      'Describe various ways of classifying programming languages (Generations, Abstraction, Execution).',
      'Describe key characteristics of a good programming language (Reliability, Writability, Cost).',
      'Choose a suitable programming language for a given problem domain.'
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'Lesson Objectives',
        bullets: [
          'Define the term programming language.',
          'Describe various ways of classifying programming languages.',
          'Describe key characteristics of a good programming language.',
          'Choose a suitable programming language for a given problem domain.'
        ]
      },
      {
        slideNumber: 2,
        title: 'Definition & Purpose',
        bullets: [
          'Programming Language: A set of conventions in which instructions for the machine are written.',
          'Why learn different languages:',
          '• Improved ability to express programming ideas clearly and effectively.',
          '• Enhanced ability to choose an appropriate programming language for a given problem.',
          '• Increased ability to learn new programming languages quickly.',
          '• Overall improvement in computing knowledge and problem-solving skills.'
        ]
      },
      {
        slideNumber: 3,
        title: 'Qualities of a Good Language',
        bullets: [
          '1. Reliability (Dependability): Extent to which a program performs according to its specifications under all conditions (type checking, exception handling).',
          '2. Writability (Expressivity): Measures how easily a language can be used to create programs for a given problem domain.',
          '3. Cost: Overall cost affected by compilation, developer training, licensing, and ongoing maintenance.'
        ]
      },
      {
        slideNumber: 4,
        title: 'Classification by Generation (1GL to 5GL)',
        bullets: [
          '• 1GL (Machine Code): Raw binary instructions (0s and 1s), machine specific, executed directly by CPU.',
          '• 2GL (Assembly Language): Uses mnemonics (MOV, ADD), translated by Assembler.',
          '• 3GL (High-Level Procedural/OOP): English-like statements, hardware independent (C, Java, Python).',
          '• 4GL (Problem-Oriented/Declarative): Very high abstraction, focuses on what result is needed (SQL).',
          '• 5GL (Logic & Constraint Based): Solves problems using constraints and inference engines (Prolog, AI).'
        ]
      },
      {
        slideNumber: 5,
        title: 'Classification by Abstraction & Execution',
        bullets: [
          'Abstraction Level:',
          '• Low-Level Languages (LLL): Direct hardware access, faster, harder to write/maintain.',
          '• High-Level Languages (HLL): Abstraction from memory addresses, portable, easier to debug.',
          'Execution Model:',
          '• Compiled Languages: Entire source translated ahead-of-time into machine code (C, C++, Rust).',
          '• Interpreted Languages: Source code executed statement-by-statement by an interpreter (Python, JS).'
        ]
      }
    ],
    activities: [
      {
        title: 'Activity: Comparison Matrix',
        description: 'Construct a comparison matrix for Ada, C#, Python, C, Java, and Prolog analyzing generation, major application, key feature, and main limitation.'
      }
    ],
    exercises: [
      'What does it mean for a program to be reliable?',
      'Outline three fundamental features of an object-oriented programming language.',
      'Explain the different aspects that determine the total cost of a programming language.'
    ],
    references: [
      'An Introduction to Programming (Wu Thomas, Norman and Theodore)',
      'The C Programming Language (Kernighan & Ritchie)'
    ]
  },
  {
    id: 'stu1201-lec-4',
    courseCode: 'STU 1201',
    lectureNumber: 4,
    title: 'Lecture 4: Program Development Lifecycle (PDLC)',
    filename: 'Lecture 4 Program Development Lifecycle.pdf',
    downloadUrl: '/notes/intro-to-programming/Lecture 4 Program Development Lifecycle.pdf',
    fileSize: '381 KB',
    objectives: [
      'Master the 6 sequential phases of the Program Development Lifecycle.',
      'Design algorithms using standard flowchart symbols and pseudocode.',
      'Trace logic execution using dry-run verification tables.'
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'The 6 Phases of PDLC',
        bullets: [
          '1. Problem Definition: Clarifying objectives, user needs, and system boundaries.',
          '2. Problem Analysis: Identifying inputs, expected outputs, and constraints.',
          '3. Algorithm Design: Crafting flowcharts and pseudocode before touching code.',
          '4. Coding: Translating design into syntax in a target language (C).',
          '5. Testing & Debugging: Validating edge cases and eliminating runtime/logic errors.',
          '6. Maintenance & Documentation: Ongoing bug fixing and user manual creation.'
        ]
      },
      {
        slideNumber: 2,
        title: 'Algorithm Representation: Flowcharts vs Pseudocode',
        bullets: [
          'Flowchart Symbols: Oval (Terminal), Parallelogram (Input/Output), Rectangle (Process), Diamond (Decision).',
          'Pseudocode: Structured English-like representation using standard verbs (READ, COMPUTE, IF-THEN-ELSE, WHILE).',
          'Dry Running: Step-by-step tracing of variables in tabular form.'
        ]
      }
    ],
    activities: [
      {
        title: 'Lab Exercise: Flowchart & Trace Table',
        description: 'Create a flowchart and trace table for computing the roots of a quadratic equation.'
      }
    ],
    exercises: [
      'List the 6 stages of the Program Development Lifecycle.',
      'Differentiate between syntax errors, runtime errors, and logic errors.'
    ],
    references: [
      'Programming Logic and Design (Tony Gaddis)'
    ]
  },
  {
    id: 'stu1201-lec-5',
    courseCode: 'STU 1201',
    lectureNumber: 5,
    title: 'Lecture 5: Programming Tools',
    filename: 'Lecture 5 Programming Tools.pdf',
    downloadUrl: '/notes/intro-to-programming/Lecture 5 Programming Tools.pdf',
    fileSize: '279 KB',
    objectives: [
      'Understand the developer toolchain: Editors, Compilers, Linkers, and Loaders.',
      'Use debuggers and understand step-over, step-into, and watch expressions.',
      'Configure modern IDEs for C programming.'
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'The Compilation & Build Toolchain',
        bullets: [
          '1. Text Editor: Creates human-readable source code (.c).',
          '2. Preprocessor: Expands header files and macros (#include).',
          '3. Compiler: Converts preprocessed C code into object code (.obj / .o).',
          '4. Linker: Combines object code with C standard library functions into executable (.exe).',
          '5. Loader: Operating system component that loads executable into RAM for CPU execution.'
        ]
      }
    ],
    activities: [
      {
        title: 'Toolchain Setup',
        description: 'Trace how GCC compiles a basic C program from .c to .exe via gcc -Wall -o main main.c'
      }
    ],
    exercises: [
      'What is the distinct role of the Linker in C compilation?',
      'Why is an IDE preferable to a basic text editor for large-scale development?'
    ],
    references: [
      'Modern C Development Toolchain Guide'
    ]
  },
  {
    id: 'stu1201-lec-6',
    courseCode: 'STU 1201',
    lectureNumber: 6,
    title: 'Lecture 6: C Program Structure',
    filename: 'Lecture 6 C Program Structure.pdf',
    downloadUrl: '/notes/intro-to-programming/Lecture 6 C Program Structure.pdf',
    fileSize: '713 KB',
    objectives: [
      'Understand the required sections of a standard C program.',
      'Identify preprocessor directives and header inclusions.',
      'Explain the main() function and return status codes.'
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'Anatomy of a C Program',
        bullets: [
          '• Documentation Section: Author comments and project notes (/* ... */ or //).',
          '• Link Section: Preprocessor header files (#include <stdio.h>).',
          '• Definition Section: Symbolic constants (#define MAX 100).',
          '• Global Declaration Section: Global variables and function prototypes.',
          '• Main Function: int main(void) { ... return 0; }',
          '• Subprogram Section: User-defined function definitions.'
        ]
      }
    ],
    activities: [
      {
        title: 'C Boilerplate Dissection',
        description: 'Write a well-formatted C program printing student details with clear comments and proper exit status.'
      }
    ],
    exercises: [
      'Why does every executable C program require exactly one main() function?',
      'Explain the purpose of #include <stdio.h>.'
    ],
    references: [
      'The C Programming Language (Kernighan & Ritchie)'
    ]
  },
  {
    id: 'stu1201-lec-7',
    courseCode: 'STU 1201',
    lectureNumber: 7,
    title: 'Lecture 7: Lexical Elements in C',
    filename: 'Lecture 7 Lexical Elements.pdf',
    downloadUrl: '/notes/intro-to-programming/Lecture 7 Lexical Elements.pdf',
    fileSize: '580 KB',
    objectives: [
      'Identify the 6 lexical tokens in the C programming language.',
      'Learn C naming rules for valid identifiers.',
      'Understand keywords, literals, and delimiters.'
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'The 6 Lexical Tokens in C',
        bullets: [
          '1. Keywords: 32 reserved words (int, return, if, for, while, char, void).',
          '2. Identifiers: User-defined names for variables, arrays, and functions.',
          '3. Constants / Literals: Fixed values (e.g. 100, 3.14, "Hello", \'A\').',
          '4. Strings: Character arrays enclosed in double quotes terminated by \\0.',
          '5. Operators: Symbols triggering calculations (+, -, ==, &&).',
          '6. Special Characters / Delimiters: Semicolons (;), braces ({}), brackets ([]).'
        ]
      }
    ],
    activities: [
      {
        title: 'Identifier Validation',
        description: 'Classify 10 variable names as valid or invalid based on C identifier naming rules.'
      }
    ],
    exercises: [
      'State 4 rules for naming identifiers in C.',
      'Can a C keyword be used as a variable name? Explain why.'
    ],
    references: [
      'C: The Complete Reference (Herbert Schildt)'
    ]
  },
  {
    id: 'stu1201-lec-8',
    courseCode: 'STU 1201',
    lectureNumber: 8,
    title: 'Lecture 8: Primary Data Types in C',
    filename: 'Lecture 8 Primary Data Types in C.pdf',
    downloadUrl: '/notes/intro-to-programming/Lecture 8 Primary Data Types in C.pdf',
    fileSize: '293 KB',
    objectives: [
      'Master C primitive data types: int, char, float, double, void.',
      'Understand data type modifiers: signed, unsigned, short, long.',
      'Determine memory allocation using the sizeof operator.'
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'C Primary Data Types Matrix',
        bullets: [
          '• char: 1 byte (-128 to 127), format %c',
          '• unsigned char: 1 byte (0 to 255), format %c',
          '• int: 2 or 4 bytes (-2,147,483,648 to 2,147,483,647), format %d',
          '• unsigned int: 4 bytes (0 to 4,294,967,295), format %u',
          '• float: 4 bytes (single precision floating point), format %f',
          '• double: 8 bytes (double precision), format %lf',
          '• void: Empty data type used for non-returning functions or generic pointers.'
        ]
      }
    ],
    activities: [
      {
        title: 'Memory Sizing Program',
        description: 'Write a C program that prints the sizeof all fundamental data types on your machine.'
      }
    ],
    exercises: [
      'What is the difference between float and double in C?',
      'Why would a programmer choose an unsigned int over a signed int?'
    ],
    references: [
      'C How to Program (Deitel & Deitel)'
    ]
  },
  {
    id: 'stu1201-lec-9',
    courseCode: 'STU 1201',
    lectureNumber: 9,
    title: 'Lecture 9: Variables, Constants and Typecasting in C',
    filename: 'Lecture 9 Variables, Constants and Typecasting in C.pdf',
    downloadUrl: '/notes/intro-to-programming/Lecture 9 Variables, Constants and Typecasting in C.pdf',
    fileSize: '395 KB',
    objectives: [
      'Understand variable declaration, memory address, and initialization.',
      'Declare symbolic constants using #define and the const keyword.',
      'Master implicit type coercion and explicit type casting.'
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'Variables, Constants & Casting',
        bullets: [
          'Variables: Named storage locations in RAM with a type, value, and memory address (&var).',
          'Constants: Values that cannot be changed during execution (#define PI 3.14159 or const float pi = 3.14159f;).',
          'Implicit Casting: Automatic widening conversion by compiler (int + float -> float).',
          'Explicit Casting: Manual type conversion using (type) syntax: float avg = (float)total / count;'
        ]
      }
    ],
    activities: [
      {
        title: 'Typecasting Pitfall Demo',
        description: 'Demonstrate why 5 / 2 yields 2 while (float)5 / 2 yields 2.5 in C.'
      }
    ],
    exercises: [
      'Explain the difference between #define and the const keyword in C.',
      'What is integer truncation in division and how is it resolved?'
    ],
    references: [
      'The C Programming Language (Kernighan & Ritchie)'
    ]
  },
  {
    id: 'stu1201-lec-10',
    courseCode: 'STU 1201',
    lectureNumber: 10,
    title: 'Lecture 10: Operators in C',
    filename: 'Lecture 10 Operators in C.pdf',
    downloadUrl: '/notes/intro-to-programming/Lecture 10 Operators in C.pdf',
    fileSize: '310 KB',
    objectives: [
      'Understand all operator categories in C.',
      'Master logical short-circuiting and bitwise operations.',
      'Apply operator precedence and associativity rules in expressions.'
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'Operator Categories in C',
        bullets: [
          '• Arithmetic: +, -, *, /, % (modulus only for integers)',
          '• Relational: ==, !=, <, >, <=, >= (evaluates to 1 for true, 0 for false)',
          '• Logical: && (AND), || (OR), ! (NOT) with short-circuit evaluation',
          '• Bitwise: & (AND), | (OR), ^ (XOR), ~ (NOT), << (left shift), >> (right shift)',
          '• Assignment: =, +=, -=, *=, /=, %=',
          '• Increment/Decrement: Pre (++x) vs Post (x++)',
          '• Conditional (Ternary): condition ? expr1 : expr2'
        ]
      }
    ],
    activities: [
      {
        title: 'Precedence & Tracing',
        description: 'Evaluate complex C expressions: e.g. int x = 5; int y = ++x * 2 + x--;'
      }
    ],
    exercises: [
      'What is the difference between prefix and postfix increment in C?',
      'Explain how short-circuit evaluation works in logical AND (&&) expressions.'
    ],
    references: [
      'C How to Program (Deitel & Deitel)'
    ]
  }
];
