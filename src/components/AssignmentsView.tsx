import React, { useState } from 'react';
import { 
  CalendarCheck2, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle, 
  ExternalLink, 
  Trash2, 
  Edit3,
  Columns,
  List as ListIcon,
  CheckCircle
} from 'lucide-react';
import { Assignment, Course, AssignmentStatus, PriorityLevel, AssignmentType } from '../types';
import { getDeadlineStatus, formatDateTime } from '../utils/dateUtils';
import confetti from 'canvas-confetti';

interface AssignmentsViewProps {
  assignments: Assignment[];
  courses: Course[];
  onUpdateAssignment: (assignment: Assignment) => void;
  onDeleteAssignment: (assignmentId: string) => void;
  onOpenNewAssignment: () => void;
  onEditAssignment: (assignment: Assignment) => void;
}

export const AssignmentsView: React.FC<AssignmentsViewProps> = ({
  assignments,
  courses,
  onUpdateAssignment,
  onDeleteAssignment,
  onOpenNewAssignment,
  onEditAssignment,
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter logic
  const filteredAssignments = assignments.filter(asg => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = asg.title.toLowerCase().includes(q);
      const matchDesc = asg.description?.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc) return false;
    }

    if (courseFilter !== 'all' && asg.courseId !== courseFilter) return false;
    if (typeFilter !== 'all' && asg.type !== typeFilter) return false;

    if (statusFilter === 'pending') {
      return asg.status === 'not_started' || asg.status === 'in_progress';
    } else if (statusFilter === 'completed') {
      return asg.status === 'submitted' || asg.status === 'graded';
    } else if (statusFilter !== 'all') {
      return asg.status === statusFilter;
    }

    return true;
  });

  // Cycle status forward
  const cycleStatus = (asg: Assignment) => {
    let nextStatus: AssignmentStatus = 'not_started';
    if (asg.status === 'not_started') nextStatus = 'in_progress';
    else if (asg.status === 'in_progress') {
      nextStatus = 'submitted';
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#6366f1', '#f59e0b']
      });
    } else if (asg.status === 'submitted') nextStatus = 'graded';
    else if (asg.status === 'graded') nextStatus = 'not_started';

    onUpdateAssignment({ ...asg, status: nextStatus });
  };

  const getCourse = (courseId: string) => courses.find(c => c.id === courseId);

  const KANBAN_COLUMNS: { key: AssignmentStatus; label: string; color: string }[] = [
    { key: 'not_started', label: 'To Do', color: 'border-slate-700' },
    { key: 'in_progress', label: 'In Progress', color: 'border-indigo-500/50' },
    { key: 'submitted', label: 'Submitted', color: 'border-emerald-500/50' },
    { key: 'graded', label: 'Graded', color: 'border-purple-500/50' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Assignments & Deadline Tracker
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Keep track of practical labs, term projects, quizzes, and submission deadlines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-slate-900 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md text-xs flex items-center gap-1 transition-all ${
                viewMode === 'list'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="List View"
            >
              <ListIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">List</span>
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-md text-xs flex items-center gap-1 transition-all ${
                viewMode === 'kanban'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Kanban View"
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Board</span>
            </button>
          </div>

          <button
            onClick={onOpenNewAssignment}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search tasks, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Filter Course */}
          <div>
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Courses</option>
              {courses.map(c => (
                <option key={c.id} value={c.id}>
                  {c.code} - {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Status */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending (To Do & In Progress)</option>
              <option value="completed">Completed (Submitted & Graded)</option>
              <option value="not_started">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="submitted">Submitted</option>
              <option value="graded">Graded</option>
            </select>
          </div>

          {/* Filter Type */}
          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Types</option>
              <option value="cat">CAT (Continuous Assessment Test)</option>
              <option value="lab">Lab Assignment</option>
              <option value="project">Project / Implementation</option>
              <option value="quiz">Quiz / Test</option>
              <option value="exam">Final Exam</option>
              <option value="homework">Homework</option>
              <option value="reading">Reading / Prep</option>
            </select>
          </div>

        </div>
      </div>

      {/* VIEW: LIST */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {filteredAssignments.length === 0 ? (
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-10 text-center">
              <CalendarCheck2 className="w-10 h-10 text-slate-500 mx-auto mb-2" />
              <h3 className="text-sm font-semibold text-white">No assignments found</h3>
              <p className="text-xs text-slate-400 mt-1">Try clearing filters or add a new assignment.</p>
            </div>
          ) : (
            filteredAssignments.map(asg => {
              const course = getCourse(asg.courseId);
              const deadline = getDeadlineStatus(asg.dueDate, asg.status);
              const isDone = asg.status === 'submitted' || asg.status === 'graded';

              return (
                <div
                  key={asg.id}
                  className={`rounded-xl p-4 border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    isDone 
                      ? 'bg-slate-900/30 border-slate-800/60 opacity-80' 
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Status Toggle Button */}
                    <button
                      onClick={() => cycleStatus(asg)}
                      title={`Status: ${asg.status.replace('_', ' ')} (Click to advance)`}
                      className="mt-1 text-slate-500 hover:text-indigo-400 transition-colors shrink-0"
                    >
                      {asg.status === 'graded' ? (
                        <CheckCircle className="w-5 h-5 text-purple-400" />
                      ) : asg.status === 'submitted' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : asg.status === 'in_progress' ? (
                        <Clock className="w-5 h-5 text-indigo-400 animate-pulse" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                      )}
                    </button>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span 
                          className="text-[11px] font-bold px-2 py-0.5 rounded-md"
                          style={{ 
                            backgroundColor: `${course?.color || '#6366f1'}20`, 
                            color: course?.color || '#a5b4fc',
                            border: `1px solid ${course?.color || '#6366f1'}40` 
                          }}
                        >
                          {course?.code || 'IT Course'}
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

                        <span className={`text-[10px] uppercase font-bold px-1.5 py-0.2 rounded ${
                          asg.priority === 'high' ? 'text-rose-400 bg-rose-500/10' :
                          asg.priority === 'medium' ? 'text-amber-400 bg-amber-500/10' :
                          'text-slate-400 bg-slate-800'
                        }`}>
                          {asg.priority} priority
                        </span>
                      </div>

                      <h3 className={`text-sm font-semibold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                        {asg.title}
                      </h3>

                      {asg.description && (
                        <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                          {asg.description}
                        </p>
                      )}

                      {asg.notes && (
                        <p className="text-[11px] text-indigo-400/90 italic">
                          Tip: {asg.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions & Due Date */}
                  <div className="flex items-center justify-between md:justify-end gap-4 text-xs pt-3 md:pt-0 border-t border-slate-800 md:border-t-0 shrink-0">
                    <div className="text-left md:text-right">
                      <div className="font-semibold text-slate-300">
                        {formatDateTime(asg.dueDate)}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {asg.score !== undefined && asg.score !== null ? (
                          <span className="text-emerald-400 font-bold">Score: {asg.score}/{asg.maxScore || 100}</span>
                        ) : asg.weight ? (
                          `${asg.weight}% of course grade`
                        ) : (
                          'Coursework'
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {asg.submissionLink && (
                        <a
                          href={asg.submissionLink}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                          title="Open LMS Link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <button
                        onClick={() => onEditAssignment(asg)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                        title="Edit task"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onDeleteAssignment(asg.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400"
                        title="Delete task"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* VIEW: KANBAN BOARD */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {KANBAN_COLUMNS.map(col => {
            const columnTasks = filteredAssignments.filter(a => a.status === col.key);

            return (
              <div 
                key={col.key}
                className="rounded-xl bg-slate-900/40 border border-slate-800 p-3 flex flex-col space-y-3 min-h-[400px]"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-200">
                    {col.label}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                    {columnTasks.length}
                  </span>
                </div>

                <div className="space-y-2.5 flex-1">
                  {columnTasks.map(asg => {
                    const course = getCourse(asg.courseId);
                    const deadline = getDeadlineStatus(asg.dueDate, asg.status);

                    return (
                      <div
                        key={asg.id}
                        className="rounded-lg p-3 bg-slate-950/80 border border-slate-800/90 hover:border-indigo-500/40 transition-all space-y-2 text-left"
                      >
                        <div className="flex items-center justify-between">
                          <span 
                            className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                            style={{ 
                              backgroundColor: `${course?.color || '#6366f1'}20`, 
                              color: course?.color || '#a5b4fc',
                            }}
                          >
                            {course?.code}
                          </span>

                          <span className={`text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded-full border ${deadline.badgeClass}`}>
                            {deadline.label}
                          </span>
                        </div>

                        <h4 className="text-xs font-semibold text-white leading-tight">
                          {asg.title}
                        </h4>

                        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                          <span>{formatDateTime(asg.dueDate)}</span>
                          <button
                            onClick={() => cycleStatus(asg)}
                            className="text-xs font-bold text-indigo-400 hover:text-indigo-300"
                            title="Advance status"
                          >
                            Move →
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {columnTasks.length === 0 && (
                    <div className="text-center py-8 text-xs text-slate-600">
                      Empty column
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
