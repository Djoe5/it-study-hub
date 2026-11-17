import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  Video,
  ExternalLink,
  BookOpen,
  Sparkles,
  GraduationCap,
  MapPin,
  AlertTriangle,
  User,
  CheckCircle2,
  Building2,
  Flame,
  Info,
  FileSearch,
  CalendarRange,
} from 'lucide-react';
import { Course } from '../types';
import {
  EXAM_TIMETABLE,
  CAMPUS_OPTIONS,
  CampusCode,
  getSavedExamCampus,
  saveExamCampus,
  ExamEntry,
} from '../data/examTimetable';
import { RevisionSprintView } from './RevisionSprintView';
import { PastPapersHubView } from './PastPapersHubView';

interface TimetableViewProps {
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
}

interface ScheduleDay {
  dayName: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  code: string;
  title: string;
  timeSlot: string;
  startHour: number;
  startMin: number;
  endHour: number;
  endMin: number;
  mode: string;
  zoomUrl: string;
  moodleId: string;
  focus: string;
}

const SCHEDULE_DATA: ScheduleDay[] = [
  {
    dayName: 'Monday',
    code: 'STU 2102',
    title: 'Computing Research Skills & Design',
    timeSlot: '17:30 – 20:30 (EAT)',
    startHour: 17,
    startMin: 30,
    endHour: 20,
    endMin: 30,
    mode: 'Virtual (Zoom)',
    zoomUrl: 'https://zoom.us/join',
    moodleId: 'https://virtualcampus.kcau.ac.ke/my/courses.php',
    focus: 'Problem formulation, literature review, APA 7th research defense',
  },
  {
    dayName: 'Tuesday',
    code: 'STU 1201',
    title: 'Introduction to Programming',
    timeSlot: '17:00 – 21:00 (EAT)',
    startHour: 17,
    startMin: 0,
    endHour: 21,
    endMin: 0,
    mode: 'Virtual (Zoom)',
    zoomUrl: 'https://zoom.us/join',
    moodleId: 'https://virtualcampus.kcau.ac.ke/my/courses.php',
    focus: 'C/Python syntax, control loops, memory pointers & algorithmic trace tables',
  },
  {
    dayName: 'Wednesday',
    code: 'CUU 1202',
    title: 'Foundations of Critical & Creative Thinking',
    timeSlot: '17:30 – 20:30 (EAT)',
    startHour: 17,
    startMin: 30,
    endHour: 20,
    endMin: 30,
    mode: 'Virtual (Zoom)',
    zoomUrl: 'https://zoom.us/join',
    moodleId: 'https://virtualcampus.kcau.ac.ke/my/courses.php',
    focus: 'Logical fallacies, syllogisms, argument deconstruction & decision matrices',
  },
  {
    dayName: 'Thursday',
    code: 'CPP 2104',
    title: 'Object-Oriented Technologies',
    timeSlot: '17:30 – 20:30 (EAT)',
    startHour: 17,
    startMin: 30,
    endHour: 20,
    endMin: 30,
    mode: 'Virtual (Zoom)',
    zoomUrl: 'https://zoom.us/join',
    moodleId: 'https://virtualcampus.kcau.ac.ke/my/courses.php',
    focus: 'OOP 4 Pillars (Encapsulation, Inheritance, Polymorphism, Abstraction) & UML',
  },
  {
    dayName: 'Friday',
    code: 'CUU 2102',
    title: 'Information Literacy & Academic Writing',
    timeSlot: '17:30 – 20:30 (EAT)',
    startHour: 17,
    startMin: 30,
    endHour: 20,
    endMin: 30,
    mode: 'Virtual (Zoom)',
    zoomUrl: 'https://zoom.us/join',
    moodleId: 'https://virtualcampus.kcau.ac.ke/my/courses.php',
    focus: 'APA 7th Referencing, Turnitin originality, database search querying',
  },
  {
    dayName: 'Saturday',
    code: 'STU 1202',
    title: 'Web Design & Development',
    timeSlot: '11:00 – 15:00 (EAT)',
    startHour: 11,
    startMin: 0,
    endHour: 15,
    endMin: 0,
    mode: 'Virtual (Zoom)',
    zoomUrl: 'https://zoom.us/join',
    moodleId: 'https://virtualcampus.kcau.ac.ke/course/view.php?id=33251',
    focus: 'HTML5 Semantic layout, CSS Grid/Flexbox, responsive media queries & DOM',
  },
  {
    dayName: 'Sunday',
    code: 'SELF-STUDY',
    title: 'Weekly Review & CAT Preparation',
    timeSlot: 'Self-Paced (Recommended: 14:00 – 18:00)',
    startHour: 14,
    startMin: 0,
    endHour: 18,
    endMin: 0,
    mode: 'StudyHub Focus Timer',
    zoomUrl: '#',
    moodleId: 'https://virtualcampus.kcau.ac.ke/my/courses.php',
    focus: 'Consolidate lecture notes, complete pending Moodle submissions, review CAT questions',
  },
];

function getExamCountdown(startIso: string, endIso: string): {
  label: string;
  daysLeft: number;
  status: 'upcoming' | 'today' | 'completed';
  badgeClass: string;
} {
  const now = new Date();
  const start = new Date(startIso);
  const end = new Date(endIso);

  if (now > end) {
    return {
      label: 'Completed',
      daysLeft: -1,
      status: 'completed',
      badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    };
  }

  const diffMs = start.getTime() - now.getTime();
  const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffMs <= 0) {
    return {
      label: 'In Progress',
      daysLeft: 0,
      status: 'today',
      badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse',
    };
  }

  if (diffHours <= 24) {
    return {
      label: diffHours <= 1 ? 'Starts in <1 hr' : `In ${diffHours} hrs`,
      daysLeft: 0,
      status: 'today',
      badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    };
  }

  if (diffDays <= 5) {
    return {
      label: `In ${diffDays} days`,
      daysLeft: diffDays,
      status: 'upcoming',
      badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    };
  }

  return {
    label: `In ${diffDays} days`,
    daysLeft: diffDays,
    status: 'upcoming',
    badgeClass: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
  };
}

function formatExamDate(dateStr: string): string {
  const d = new Date(`${dateStr}T12:00:00`);
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export const TimetableView: React.FC<TimetableViewProps> = ({
  courses,
  onSelectCourse,
}) => {
  const [viewMode, setViewMode] = useState<'exams' | 'sprint' | 'pastpapers' | 'classes'>('exams');
  const [selectedCampus, setSelectedCampus] = useState<CampusCode>(() => getSavedExamCampus());
  const [selectedDayFilter, setSelectedDayFilter] = useState<string>('all');

  const handleCampusChange = (campus: CampusCode) => {
    setSelectedCampus(campus);
    saveExamCampus(campus);
  };

  // Determine current day of the week
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = daysOfWeek[new Date().getDay()];
  const todaysSchedule = SCHEDULE_DATA.find(s => s.dayName === todayName);

  const filteredSchedule =
    selectedDayFilter === 'all'
      ? SCHEDULE_DATA
      : SCHEDULE_DATA.filter(s => s.dayName.toLowerCase() === selectedDayFilter.toLowerCase());

  const nextExam: ExamEntry | undefined = useMemo(() => {
    const now = new Date();
    return EXAM_TIMETABLE.find(e => new Date(e.endIso) > now) || EXAM_TIMETABLE[0];
  }, []);

  const nextExamStatus = nextExam ? getExamCountdown(nextExam.startIso, nextExam.endIso) : null;
  const completedExamCount = EXAM_TIMETABLE.filter(
    e => getExamCountdown(e.startIso, e.endIso).status === 'completed'
  ).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Mode Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="inline-flex flex-wrap p-1 rounded-xl bg-slate-900 border border-slate-800 self-start gap-1">
          <button
            onClick={() => setViewMode('exams')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'exams'
                ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-lg shadow-rose-600/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Final Exams</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                viewMode === 'exams' ? 'bg-white/20 text-white' : 'bg-rose-500/20 text-rose-300'
              }`}
            >
              {EXAM_TIMETABLE.length}
            </span>
          </button>

          <button
            onClick={() => setViewMode('sprint')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'sprint'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CalendarRange className="w-4 h-4" />
            <span>Revision Sprint (23 Days)</span>
          </button>

          <button
            onClick={() => setViewMode('pastpapers')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'pastpapers'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-600/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileSearch className="w-4 h-4" />
            <span>KCA Past Papers</span>
          </button>

          <button
            onClick={() => setViewMode('classes')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'classes'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Weekly Classes</span>
          </button>
        </div>

        {viewMode === 'exams' && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              Exam Campus:
            </span>
            <div className="inline-flex p-1 rounded-lg bg-slate-900 border border-slate-800">
              {CAMPUS_OPTIONS.map(campus => (
                <button
                  key={campus.code}
                  onClick={() => handleCampusChange(campus.code)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                    selectedCampus === campus.code
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'text-slate-400 hover:text-white border border-transparent'
                  }`}
                  title={campus.label}
                >
                  {campus.code}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {viewMode === 'exams' ? (
        <>
          {/* Exam Hero Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-rose-950/50 to-slate-900 border border-rose-500/25 p-6 sm:p-8 shadow-2xl">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-rose-400" />
                    Ordinary Examinations Timetable
                  </span>
                  <span className="text-xs text-slate-300 font-medium">
                    Sep – Dec 2026 · BIT Part-Time / DL
                  </span>
                  <span className="text-xs text-amber-300 font-semibold">
                    • {completedExamCount}/{EXAM_TIMETABLE.length} Papers Completed
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  December 2026 Final Exam Schedule
                </h1>
                <p className="text-sm text-slate-300 mt-1.5 max-w-2xl">
                  Official School of Technology (SDIS Dept) timetable for your 6 enrolled BSc IT units. Showing venues for{' '}
                  <span className="font-bold text-amber-300">
                    {CAMPUS_OPTIONS.find(c => c.code === selectedCampus)?.label}
                  </span>
                  .
                </p>

                {/* Quick Summary Stats */}
                <div className="mt-4 flex flex-wrap gap-3 text-xs">
                  <div className="px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300">
                    <span className="text-slate-400">Exam Window: </span>
                    <strong className="text-white">Dec 1 – Dec 10, 2026</strong>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300">
                    <span className="text-slate-400">Stream: </span>
                    <strong className="text-white">Stream A (Part-Time/DL)</strong>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300">
                    <span className="text-slate-400">Standard Slot: </span>
                    <strong className="text-white">17:00–19:00</strong>{' '}
                    <span className="text-amber-300">(Sat STU 1202 @ 11:00)</span>
                  </div>
                </div>
              </div>

              {/* Next Exam Spotlight Card */}
              {nextExam && nextExamStatus && (
                <div className="p-4 sm:p-5 rounded-xl bg-slate-950/85 border border-rose-500/35 max-w-sm w-full shadow-lg">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-rose-400 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5" />
                      NEXT EXAM UP
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${nextExamStatus.badgeClass}`}>
                      {nextExamStatus.label}
                    </span>
                  </div>

                  <div className="text-xs font-extrabold text-amber-400">
                    {nextExam.code} · Session #{nextExam.sessionNumber}
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug mt-0.5">
                    {nextExam.title}
                  </h3>

                  <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span className="font-medium">{formatExamDate(nextExam.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>{nextExam.timeRange}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="font-bold text-amber-300">
                        {selectedCampus}: {nextExam.venues[selectedCampus]}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectCourse(nextExam.courseId)}
                    className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md shadow-rose-600/20 transition-all"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Revise {nextExam.code} Now</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Heads-Up Alerts Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-100/90 leading-relaxed">
                <strong className="text-amber-300 block mb-0.5">Tight Turnaround (Dec 4 → Dec 5)</strong>
                CUU 2102 finishes Fri 19:00, and <strong>STU 1202</strong> starts Sat <strong>11:00 AM</strong>. Pre-revise Web Design earlier in the week!
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/25 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div className="text-xs text-sky-100/90 leading-relaxed">
                <strong className="text-sky-300 block mb-0.5">
                  {selectedCampus === 'MAIN' ? 'Main Campus Venue Shifts' : `${selectedCampus} Campus Venues`}
                </strong>
                {selectedCampus === 'MAIN' ? (
                  <>
                    Papers 1–4 are at <strong>STUDENT CENTRE</strong>, then STU 2102 moves to <strong>TC 3RD FLR</strong> & CPP 2104 to <strong>TC 2-2</strong>.
                  </>
                ) : (
                  <>
                    All 6 of your papers at {selectedCampus} are scheduled in <strong>{EXAM_TIMETABLE[0].venues[selectedCampus]}</strong>.
                  </>
                )}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div className="text-xs text-indigo-100/90 leading-relaxed">
                <strong className="text-indigo-300 block mb-0.5">Verify CUU 1202 on Exam Card</strong>
                Part-Time is <strong>Wed Dec 2 (17:00)</strong> (Stephen Kamba Mwangangi). If registered as DL/Weekend, it sits <strong>Sun Dec 6 (14:00)</strong>.
              </div>
            </div>
          </div>

          {/* Chronological Exam Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EXAM_TIMETABLE.map((exam, index) => {
              const countdown = getExamCountdown(exam.startIso, exam.endIso);
              const matchedCourse = courses.find(
                c =>
                  c.id === exam.courseId ||
                  c.code.replace(/\s+/g, '').toUpperCase() === exam.code.replace(/\s+/g, '').toUpperCase()
              );
              const totalModules = matchedCourse?.syllabus.length || 0;
              const completedModules = matchedCourse?.syllabus.filter(m => m.completed).length || 0;
              const syllabusPercent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
              const isNext = nextExam?.id === exam.id;
              const venue = exam.venues[selectedCampus];
              const isMorningSlot = exam.timeRange.startsWith('11:00');

              return (
                <div
                  key={exam.id}
                  className={`rounded-xl border p-5 flex flex-col justify-between transition-all ${
                    isNext
                      ? 'bg-gradient-to-b from-rose-950/35 via-slate-900 to-slate-950 border-rose-500/45 shadow-lg shadow-rose-500/10 ring-1 ring-rose-500/25'
                      : countdown.status === 'completed'
                      ? 'bg-slate-900/40 border-emerald-500/25 opacity-80'
                      : 'bg-slate-900/70 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div>
                    {/* Top Row: Paper Order, Session & Countdown */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-slate-800 text-slate-200 border border-slate-700">
                          Paper {index + 1}/6
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          S#{exam.sessionNumber}
                        </span>
                      </div>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${countdown.badgeClass}`}
                      >
                        {countdown.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                        {countdown.label}
                      </span>
                    </div>

                    {/* Course Code & Title */}
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-xs font-extrabold px-2 py-0.5 rounded-md"
                          style={{
                            backgroundColor: `${exam.color}20`,
                            color: exam.color,
                            border: `1px solid ${exam.color}40`,
                          }}
                        >
                          {exam.code}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Stream {exam.stream} · {exam.modeOfStudy}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white leading-snug">
                        {exam.title}
                      </h3>
                    </div>

                    {/* Date, Time & Venue Box */}
                    <div className="space-y-2 text-xs bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 mb-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-2 text-slate-200 font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          {formatExamDate(exam.date)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Clock className={`w-3.5 h-3.5 shrink-0 ${isMorningSlot ? 'text-amber-400' : 'text-sky-400'}`} />
                        <span className={isMorningSlot ? 'font-bold text-amber-300' : ''}>
                          {exam.timeRange}
                          {isMorningSlot ? ' (Morning)' : ''}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 pt-1.5 border-t border-slate-800/70">
                        <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <div className="flex-1">
                          <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                            {selectedCampus} Venue
                          </span>
                          <span className="text-xs font-extrabold text-white">{venue}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 pt-1">
                        <User className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{exam.lecturer}</span>
                      </div>
                    </div>

                    {/* Gap & Alternate Notes */}
                    <div className="space-y-2 mb-4">
                      <div className="text-[11px] text-slate-300 bg-slate-800/50 px-2.5 py-1.5 rounded-lg border border-slate-800 flex items-start gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{exam.gapNote}</span>
                      </div>

                      {exam.alternateNote && (
                        <div className="text-[11px] text-amber-200/90 bg-amber-500/10 px-2.5 py-1.5 rounded-lg border border-amber-500/25 flex items-start gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{exam.alternateNote}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Readiness Progress & Study Action */}
                  <div className="pt-3 border-t border-slate-800/80 space-y-3">
                    {matchedCourse && (
                      <div>
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="text-slate-400">Syllabus Readiness</span>
                          <span className="font-bold text-slate-200">
                            {completedModules}/{totalModules} modules ({syllabusPercent}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${syllabusPercent}%`, backgroundColor: exam.color }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectCourse(exam.courseId)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/15"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Open Study Guide & Notes</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : viewMode === 'sprint' ? (
        <RevisionSprintView onSelectCourse={onSelectCourse} />
      ) : viewMode === 'pastpapers' ? (
        <PastPapersHubView onSelectCourse={onSelectCourse} />
      ) : (
        <>
          {/* Weekly Class Schedule Top Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-500/20 p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    KCAU Virtual Campus Timetable
                  </span>
                  <span className="text-xs text-slate-400">Trimester 3 (2026)</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Weekly Class Schedule & Live Portals
                </h1>
                <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                  All 6 enrolled BSc IT units with direct links to join live Zoom lectures and access Moodle unit spaces.
                </p>
              </div>

              {/* Quick status for today */}
              {todaysSchedule && (
                <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30 max-w-sm w-full">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Today ({todayName})
                    </span>
                    <span className="text-slate-400">{todaysSchedule.timeSlot}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white truncate">
                    {todaysSchedule.code}: {todaysSchedule.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{todaysSchedule.focus}</p>

                  <div className="mt-3 flex items-center gap-2">
                    <a
                      href={todaysSchedule.zoomUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join Live Class</span>
                    </a>
                    <a
                      href={todaysSchedule.moodleId}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                      title="Open in Virtual Campus"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Day Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
            <button
              onClick={() => setSelectedDayFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDayFilter === 'all'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              All Days
            </button>
            {daysOfWeek.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDayFilter(day)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedDayFilter.toLowerCase() === day.toLowerCase()
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>{day}</span>
                {day === todayName && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
              </button>
            ))}
          </div>

          {/* Timetable Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSchedule.map(slot => {
              const isToday = slot.dayName === todayName;
              const matchedCourse = courses.find(
                c => c.code.replace(/\s+/g, '').toUpperCase() === slot.code.replace(/\s+/g, '').toUpperCase()
              );

              return (
                <div
                  key={slot.dayName}
                  className={`rounded-xl border p-5 flex flex-col justify-between transition-all ${
                    isToday
                      ? 'bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-950 border-indigo-500/40 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/30'
                      : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div>
                    {/* Header tag */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                            isToday
                              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                              : 'bg-slate-800 text-slate-300 border border-slate-700'
                          }`}
                        >
                          {slot.dayName}
                        </span>
                        {isToday && (
                          <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            TODAY
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {slot.timeSlot.split(' ')[0]}
                      </span>
                    </div>

                    {/* Course Code & Title */}
                    <div className="mb-3">
                      <div className="text-xs font-extrabold text-indigo-400 tracking-wide mb-0.5">
                        {slot.code}
                      </div>
                      <h3 className="text-base font-bold text-white leading-snug">{slot.title}</h3>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-xs text-slate-400 mb-4 bg-slate-950/50 p-3 rounded-lg border border-slate-800/60">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Video className="w-3.5 h-3.5 text-sky-400" />
                        <span>{slot.mode}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-relaxed text-slate-300">
                          <strong className="text-slate-200">Weekly Focus:</strong> {slot.focus}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                    <a
                      href={slot.zoomUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/10"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join Class</span>
                    </a>

                    <a
                      href={slot.moodleId}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                      title="Open Moodle Course Space"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    {matchedCourse && (
                      <button
                        onClick={() => onSelectCourse(matchedCourse.id)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                        title="View Course Syllabus & Materials"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
