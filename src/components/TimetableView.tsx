import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  ExternalLink, 
  BookOpen, 
  Sparkles 
} from 'lucide-react';
import { Course } from '../types';

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
  }
];

export const TimetableView: React.FC<TimetableViewProps> = ({
  courses,
  onSelectCourse
}) => {
  const [selectedDayFilter, setSelectedDayFilter] = useState<string>('all');

  // Determine current day of the week
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = daysOfWeek[new Date().getDay()];

  // Today's scheduled class
  const todaysSchedule = SCHEDULE_DATA.find(s => s.dayName === todayName);

  const filteredSchedule = selectedDayFilter === 'all' 
    ? SCHEDULE_DATA 
    : SCHEDULE_DATA.filter(s => s.dayName.toLowerCase() === selectedDayFilter.toLowerCase());

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
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
            {day === todayName && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            )}
          </button>
        ))}
      </div>

      {/* Timetable Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSchedule.map((slot) => {
          const isToday = slot.dayName === todayName;
          const matchedCourse = courses.find(c => 
            c.code.replace(/\s+/g, '').toUpperCase() === slot.code.replace(/\s+/g, '').toUpperCase()
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
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                      isToday
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
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
                  <h3 className="text-base font-bold text-white leading-snug">
                    {slot.title}
                  </h3>
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
    </div>
  );
};
