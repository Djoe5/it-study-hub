import React from 'react';
import { 
  BookOpen, 
  CalendarClock, 
  Award, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  Circle, 
  Clock, 
  ExternalLink,
  Calendar,
  Sparkles
} from 'lucide-react';
import { Course, Assignment, UserProfile, StudySession } from '../types';
import { getDeadlineStatus, formatDateTime } from '../utils/dateUtils';
import confetti from 'canvas-confetti';

interface DashboardProps {
  profile: UserProfile;
  courses: Course[];
  assignments: Assignment[];
  sessions: StudySession[];
  onSelectCourse: (courseId: string) => void;
  onNavigateToTab: (tab: 'dashboard' | 'courses' | 'assignments' | 'timer') => void;
  onToggleAssignmentStatus: (assignmentId: string) => void;
  onOpenNewAssignment: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  profile,
  courses,
  assignments,
  sessions,
  onSelectCourse,
  onNavigateToTab,
  onToggleAssignmentStatus,
  onOpenNewAssignment,
}) => {
  // Urgent upcoming assignments (excluding completed/graded)
  const pendingAssignments = assignments
    .filter(a => a.status === 'not_started' || a.status === 'in_progress')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const urgentAssignments = pendingAssignments.slice(0, 4);

  // Calculate overall syllabus progress
  let totalModules = 0;
  let completedModules = 0;
  courses.forEach(c => {
    totalModules += c.syllabus.length;
    completedModules += c.syllabus.filter(m => m.completed).length;
  });
  const overallSyllabusPercent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  // Total study hours
  const totalStudyMinutes = sessions.reduce((acc, s) => acc + s.durationMinutes, 0);
  const totalStudyHours = (totalStudyMinutes / 60).toFixed(1);

  // Handle celebration checkmark
  const handleCheck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10b981', '#6366f1', '#38bdf8']
    });
    onToggleAssignmentStatus(id);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                Degree Launchpad
              </span>
              <span className="text-xs text-slate-400">• Semester in session</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {profile.studentName}!
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              {profile.program} at {profile.institution}. You have{' '}
              <span className="font-semibold text-amber-300">
                {pendingAssignments.length} pending assignment{pendingAssignments.length === 1 ? '' : 's'}
              </span>{' '}
              and your syllabus is {overallSyllabusPercent}% complete.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateToTab('timer')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 shadow-sm transition-all"
            >
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>Start Study Session</span>
            </button>
            <button
              onClick={onOpenNewAssignment}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all"
            >
              <span>+ Add Task</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Enrolled Courses */}
        <div 
          onClick={() => onNavigateToTab('courses')}
          className="group cursor-pointer rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 p-5 transition-all hover:bg-slate-900/90"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Enrolled Courses</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{courses.length}</span>
            <span className="text-xs text-slate-400">active units</span>
          </div>
          <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500" 
              style={{ width: `${overallSyllabusPercent}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Syllabus covered</span>
            <span className="font-semibold text-indigo-400">{overallSyllabusPercent}%</span>
          </p>
        </div>

        {/* Pending Deadlines */}
        <div 
          onClick={() => onNavigateToTab('assignments')}
          className="group cursor-pointer rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 p-5 transition-all hover:bg-slate-900/90"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Assignments Due</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <CalendarClock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{pendingAssignments.length}</span>
            <span className="text-xs text-amber-400 font-medium">
              {urgentAssignments.length > 0 ? 'Upcoming soon' : 'All clear'}
            </span>
          </div>
          <p className="mt-4 text-[11px] text-slate-400">
            {assignments.filter(a => a.status === 'graded' || a.status === 'submitted').length} completed so far
          </p>
        </div>

        {/* Target GPA */}
        <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Target Grade Point</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{profile.targetGpa.toFixed(1)}</span>
            <span className="text-xs text-slate-400">/ 4.0 scale</span>
          </div>
          <p className="mt-4 text-[11px] text-emerald-400/90 flex items-center gap-1 font-medium">
            <span>First Class Honours Track</span>
          </p>
        </div>

        {/* Focus Study Hours */}
        <div 
          onClick={() => onNavigateToTab('timer')}
          className="group cursor-pointer rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/40 p-5 transition-all hover:bg-slate-900/90"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Focus Logged</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">{totalStudyHours}</span>
            <span className="text-xs text-slate-400">hours completed</span>
          </div>
          <p className="mt-4 text-[11px] text-purple-400 flex items-center gap-1">
            <span>{sessions.length} sessions logged</span>
          </p>
        </div>
      </div>

      {/* Main 2-Column Section: Deadlines Radar & Course Timetable/Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Deadlines Radar (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Deadline Radar</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  Next Up
                </span>
              </h2>
              <p className="text-xs text-slate-400">Sorted by urgency to keep your semester on track</p>
            </div>

            <button
              onClick={() => onNavigateToTab('assignments')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group"
            >
              <span>View all ({assignments.length})</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {urgentAssignments.length === 0 ? (
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-8 text-center">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
              <h3 className="text-base font-semibold text-white">No upcoming deadlines!</h3>
              <p className="text-xs text-slate-400 mt-1">You are all caught up with your coursework.</p>
              <button
                onClick={onOpenNewAssignment}
                className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-medium"
              >
                + Add New Assignment
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {urgentAssignments.map(asg => {
                const course = courses.find(c => c.id === asg.courseId);
                const deadline = getDeadlineStatus(asg.dueDate, asg.status);

                return (
                  <div
                    key={asg.id}
                    onClick={() => onNavigateToTab('assignments')}
                    className="cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-900 transition-all gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={(e) => handleCheck(asg.id, e)}
                        title="Mark as completed"
                        className="mt-1 text-slate-500 hover:text-emerald-400 transition-colors"
                      >
                        <Circle className="w-5 h-5" />
                      </button>

                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span 
                            className="text-[11px] font-bold px-2 py-0.5 rounded-md"
                            style={{ 
                              backgroundColor: `${course?.color || '#6366f1'}20`, 
                              color: course?.color || '#a5b4fc',
                              border: `1px solid ${course?.color || '#6366f1'}40` 
                            }}
                          >
                            {course?.code || 'Course'}
                          </span>

                          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${deadline.badgeClass}`}>
                            {deadline.label}
                          </span>

                          <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md border ${
                            asg.type === 'cat' 
                              ? 'text-amber-300 bg-amber-500/20 border-amber-500/30 font-bold' 
                              : 'text-slate-400 bg-slate-800 border-slate-700'
                          }`}>
                            {asg.type === 'cat' ? 'CAT' : asg.type}
                          </span>
                        </div>

                        <h4 className="text-sm font-semibold text-slate-100 group-hover:text-indigo-300 transition-colors">
                          {asg.title}
                        </h4>

                        {asg.description && (
                          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                            {asg.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-400 pt-2 sm:pt-0 border-t border-slate-800/60 sm:border-t-0">
                      <div className="text-left sm:text-right">
                        <div className="text-slate-300 font-medium">{formatDateTime(asg.dueDate)}</div>
                        {asg.weight && (
                          <div className="text-[11px] text-slate-400">{asg.weight}% of course grade</div>
                        )}
                      </div>

                      {asg.submissionLink && (
                        <a
                          href={asg.submissionLink}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          title="Open LMS submission page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Quick IT Course Schedule */}
          <div className="mt-8 rounded-xl bg-slate-900/60 border border-slate-800/80 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>Class Timetable & Room Directory</span>
              </h3>
              <span className="text-xs text-slate-400">{profile.currentTerm}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {courses.map(course => (
                <div 
                  key={course.id}
                  onClick={() => onSelectCourse(course.id)}
                  className="cursor-pointer p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-950 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-indigo-400">{course.code}</span>
                    <span className="text-[11px] text-slate-400 font-medium">{course.credits} Credits</span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-200 line-clamp-1 mb-2">
                    {course.title}
                  </h4>
                  <div className="text-[11px] text-slate-400 space-y-0.5">
                    <div className="text-slate-300 font-medium">{course.schedule || 'Schedule TBD'}</div>
                    <div className="text-slate-400 truncate">{course.roomOrLink || 'Lecture Hall'} • {course.instructor}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Syllabus Progress Overview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Syllabus Radar</h2>
              <p className="text-xs text-slate-400">Weekly topic mastery by course</p>
            </div>
            <button
              onClick={() => onNavigateToTab('courses')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Details
            </button>
          </div>

          <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 p-5 space-y-5">
            {courses.map(course => {
              const total = course.syllabus.length;
              const completed = course.syllabus.filter(m => m.completed).length;
              const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

              return (
                <div 
                  key={course.id} 
                  onClick={() => onSelectCourse(course.id)}
                  className="cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-2.5 h-2.5 rounded-full" 
                        style={{ backgroundColor: course.color }}
                      />
                      <span className="text-xs font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">
                        {course.code}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                      {completed}/{total} modules ({percent}%)
                    </span>
                  </div>

                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-2 rounded-full transition-all duration-500" 
                      style={{ 
                        width: `${percent}%`, 
                        backgroundColor: course.color || '#6366f1' 
                      }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-400 mt-1 truncate">
                    {course.title}
                  </p>
                </div>
              );
            })}

            <div className="pt-3 border-t border-slate-800">
              <button
                onClick={() => onNavigateToTab('courses')}
                className="w-full py-2 px-3 rounded-lg bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 text-xs font-semibold transition-all text-center"
              >
                Open Full Syllabus Breakdown & Checklists
              </button>
            </div>
          </div>

          {/* Quick IT Student Tip */}
          <div className="rounded-xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/20 p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1 flex items-center gap-1.5">
              <span>Study Pro-Tip for IT</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              For networking & databases, hands-on lab practice with Wireshark packet captures and writing actual SQL joins retains 70% better than reading slides alone.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
