export type CampusCode = 'MAIN' | 'TOWN' | 'KITENGELA' | 'KSM';

export interface ExamEntry {
  id: string;
  sessionNumber: number;
  courseId: string;
  code: string;
  title: string;
  date: string;        // YYYY-MM-DD
  dayOfWeek: string;
  timeRange: string;   // e.g. "17:00 – 19:00 HRS"
  startIso: string;    // YYYY-MM-DDTHH:mm
  endIso: string;      // YYYY-MM-DDTHH:mm
  modeOfStudy: string;
  stream: string;
  trimesterCode: string;
  lecturer: string;
  venues: Record<CampusCode, string>;
  color: string;
  gapNote: string;
  alternateNote?: string;
  revisionFocus: string;
}

export const CAMPUS_OPTIONS: { code: CampusCode; label: string }[] = [
  { code: 'MAIN', label: 'Main Campus (Ruaraka)' },
  { code: 'TOWN', label: 'Town Campus (CBD)' },
  { code: 'KITENGELA', label: 'Kitengela Campus' },
  { code: 'KSM', label: 'Kisumu Campus (KSM)' },
];

export const EXAM_TIMETABLE: ExamEntry[] = [
  {
    id: 'exam-2026-stu1201',
    sessionNumber: 36,
    courseId: 'kcau-33500',
    code: 'STU 1201',
    title: 'Introduction to Programming',
    date: '2026-12-01',
    dayOfWeek: 'Tuesday',
    timeRange: '17:00 – 19:00 HRS',
    startIso: '2026-12-01T17:00',
    endIso: '2026-12-01T19:00',
    modeOfStudy: 'Part-Time/DL',
    stream: 'A',
    trimesterCode: '1.2',
    lecturer: 'Griffin Kenga Kitili',
    venues: {
      MAIN: 'STUDENT CENTRE',
      TOWN: 'Main Hall GF',
      KITENGELA: 'ROOM 4-10 TO 4-11',
      KSM: 'HALL',
    },
    color: '#0ea5e9',
    gapNote: 'Exam #1 — Kickoff paper',
    revisionFocus: 'Flowcharts, C syntax, loops, arrays, functions, pointers & dry-run trace tables',
  },
  {
    id: 'exam-2026-cuu1202',
    sessionNumber: 40,
    courseId: 'kcau-33605',
    code: 'CUU 1202',
    title: 'Foundations of Critical and Creative Thinking',
    date: '2026-12-02',
    dayOfWeek: 'Wednesday',
    timeRange: '17:00 – 19:00 HRS',
    startIso: '2026-12-02T17:00',
    endIso: '2026-12-02T19:00',
    modeOfStudy: 'Part-Time',
    stream: 'A',
    trimesterCode: '1.1',
    lecturer: 'Stephen Kamba Mwangangi',
    venues: {
      MAIN: 'STUDENT CENTRE',
      TOWN: 'Main Hall GF',
      KITENGELA: 'ROOM 4-10 TO 4-11',
      KSM: 'HALL',
    },
    color: '#f59e0b',
    gapNote: 'Back-to-back (next day after STU 1201)',
    alternateNote: 'Confirm on exam card: Part-Time is Wed Dec 2 (17:00–19:00, Stephen Kamba Mwangangi). DL / Weekend is Sun Dec 6 (14:00–16:00, Jackson Ndungu Mwangi / Keziah Njeri Wanjiku).',
    revisionFocus: 'Deductive vs inductive arguments, informal fallacies, creative problem solving & decision making',
  },
  {
    id: 'exam-2026-cuu2102',
    sessionNumber: 48,
    courseId: 'kcau-32622',
    code: 'CUU 2102',
    title: 'Information Literacy and Academic Writing',
    date: '2026-12-04',
    dayOfWeek: 'Friday',
    timeRange: '17:00 – 19:00 HRS',
    startIso: '2026-12-04T17:00',
    endIso: '2026-12-04T19:00',
    modeOfStudy: 'Part-Time',
    stream: 'A',
    trimesterCode: '1.2',
    lecturer: 'Benjamin Kasyoki Mutungi',
    venues: {
      MAIN: 'STUDENT CENTRE',
      TOWN: 'Main Hall GF',
      KITENGELA: 'ROOM 4-10 TO 4-11',
      KSM: 'HALL',
    },
    color: '#ec4899',
    gapNote: '1 full revision day after CUU 1202 (Thu Dec 3 free)',
    revisionFocus: 'CRAAP source evaluation, Boolean search strategies, APA 7th citations & academic integrity',
  },
  {
    id: 'exam-2026-stu1202',
    sessionNumber: 50,
    courseId: 'kcau-33501',
    code: 'STU 1202',
    title: 'Web Design and Development',
    date: '2026-12-05',
    dayOfWeek: 'Saturday',
    timeRange: '11:00 – 13:00 HRS',
    startIso: '2026-12-05T11:00',
    endIso: '2026-12-05T13:00',
    modeOfStudy: 'Part-Time/DL',
    stream: 'A',
    trimesterCode: '1.2',
    lecturer: 'Gladys Mange',
    venues: {
      MAIN: 'STUDENT CENTRE',
      TOWN: 'Main Hall GF',
      KITENGELA: 'ROOM 4-10 TO 4-11',
      KSM: 'HALL',
    },
    color: '#10b981',
    gapNote: 'Tight turnaround — Morning exam (11:00 AM) right after Friday evening paper!',
    revisionFocus: 'Semantic HTML5, CSS Box Model, Flexbox/Grid, responsive media queries, forms & JS DOM',
  },
  {
    id: 'exam-2026-stu2102',
    sessionNumber: 60,
    courseId: 'kcau-33505',
    code: 'STU 2102',
    title: 'Computing Research Skills and Design',
    date: '2026-12-07',
    dayOfWeek: 'Monday',
    timeRange: '17:00 – 19:00 HRS',
    startIso: '2026-12-07T17:00',
    endIso: '2026-12-07T19:00',
    modeOfStudy: 'Part-Time/DL',
    stream: 'A',
    trimesterCode: '1.2',
    lecturer: 'Gladys Mange',
    venues: {
      MAIN: 'TC 3RD FLR',
      TOWN: 'Main Hall GF',
      KITENGELA: 'ROOM 4-10 TO 4-11',
      KSM: 'HALL',
    },
    color: '#06b6d4',
    gapNote: '1 full revision day (Sun Dec 6 free) — Note MAIN venue changes to TC 3RD FLR',
    revisionFocus: 'Problem formulation, literature review, conceptual frameworks, sampling, data analysis & ethics',
  },
  {
    id: 'exam-2026-cpp2104',
    sessionNumber: 72,
    courseId: 'kcau-33251',
    code: 'CPP 2104',
    title: 'Object-Oriented Technologies',
    date: '2026-12-10',
    dayOfWeek: 'Thursday',
    timeRange: '17:00 – 19:00 HRS',
    startIso: '2026-12-10T17:00',
    endIso: '2026-12-10T19:00',
    modeOfStudy: 'Part-Time/DL',
    stream: 'A',
    trimesterCode: '1.2',
    lecturer: 'Beatrice Muthoni Kagucia',
    venues: {
      MAIN: 'TC 2-2',
      TOWN: 'Main Hall GF',
      KITENGELA: 'ROOM 4-10 TO 4-11',
      KSM: 'HALL',
    },
    color: '#8b5cf6',
    gapNote: 'Final paper — 2 full revision days (Tue Dec 8 & Wed Dec 9 free) · MAIN venue: TC 2-2',
    revisionFocus: 'UML class diagrams, 4 OOP pillars, constructors, polymorphism, interfaces & design patterns',
  },
];

export const EXAM_CAMPUS_STORAGE_KEY = 'it_study_hub_exam_campus_v1';

export function getSavedExamCampus(): CampusCode {
  try {
    const saved = localStorage.getItem(EXAM_CAMPUS_STORAGE_KEY) as CampusCode | null;
    if (saved && ['MAIN', 'TOWN', 'KITENGELA', 'KSM'].includes(saved)) {
      return saved;
    }
  } catch {
    // ignore storage errors
  }
  return 'MAIN';
}

export function saveExamCampus(campus: CampusCode): void {
  try {
    localStorage.setItem(EXAM_CAMPUS_STORAGE_KEY, campus);
  } catch {
    // ignore storage errors
  }
}
