import React, { useState, useMemo } from 'react';
import {
  Flame,
  CheckCircle2,
  Circle,
  BookOpen,
  Target,
  Clock,
  Sparkles,
  GraduationCap,
  Coffee,
  FileCheck2,
  Brain,
  RotateCcw,
  Printer,
  Download,
} from 'lucide-react';
import {
  REVISION_SPRINT_DAYS,
  SprintPhase,
  getCompletedRevisionBlocks,
  saveCompletedRevisionBlocks,
  RevisionBlock,
} from '../data/revisionPlan';
import confetti from 'canvas-confetti';

interface RevisionSprintViewProps {
  onSelectCourse: (courseId: string) => void;
}

const KIND_STYLES: Record<
  RevisionBlock['kind'],
  { label: string; badgeClass: string; icon: React.ReactNode }
> = {
  study: {
    label: 'Deep Study',
    badgeClass: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    icon: <BookOpen className="w-3 h-3" />,
  },
  mock: {
    label: 'Timed Mock',
    badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/35',
    icon: <FileCheck2 className="w-3 h-3" />,
  },
  recall: {
    label: 'Active Recall',
    badgeClass: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    icon: <Brain className="w-3 h-3" />,
  },
  exam: {
    label: 'OFFICIAL EXAM',
    badgeClass: 'bg-rose-500/25 text-rose-200 border-rose-500/50 font-extrabold',
    icon: <GraduationCap className="w-3 h-3" />,
  },
  rest: {
    label: 'Recovery',
    badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    icon: <Coffee className="w-3 h-3" />,
  },
};

export const RevisionSprintView: React.FC<RevisionSprintViewProps> = ({ onSelectCourse }) => {
  const [completedIds, setCompletedIds] = useState<string[]>(() => getCompletedRevisionBlocks());
  const [phaseFilter, setPhaseFilter] = useState<'all' | SprintPhase>('all');

  const todayIso = new Date().toISOString().slice(0, 10);

  const totalBlocks = useMemo(
    () => REVISION_SPRINT_DAYS.reduce((acc, d) => acc + d.blocks.length, 0),
    []
  );
  const completedCount = completedIds.length;
  const percentComplete = totalBlocks > 0 ? Math.round((completedCount / totalBlocks) * 100) : 0;

  const toggleBlock = (blockId: string) => {
    setCompletedIds(prev => {
      const exists = prev.includes(blockId);
      const next = exists ? prev.filter(id => id !== blockId) : [...prev, blockId];
      if (!exists) {
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.75 },
          colors: ['#10b981', '#6366f1', '#f59e0b'],
        });
      }
      saveCompletedRevisionBlocks(next);
      return next;
    });
  };

  const resetProgress = () => {
    if (window.confirm('Reset all revision sprint checkmarks?')) {
      setCompletedIds([]);
      saveCompletedRevisionBlocks([]);
    }
  };

  const filteredDays = useMemo(() => {
    if (phaseFilter === 'all') return REVISION_SPRINT_DAYS;
    return REVISION_SPRINT_DAYS.filter(d => d.phase === phaseFilter);
  }, [phaseFilter]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950/50 to-slate-900 border border-emerald-500/25 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-emerald-400" />
                23-Day Vigorous Study Mode
              </span>
              <span className="text-xs text-slate-300 font-medium">
                Wed, Nov 18 → Thu, Dec 10, 2026
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              First-Class Exam Revision Timetable
            </h1>
            <p className="text-sm text-slate-300 mt-1.5 max-w-2xl">
              Structured 3-phase battle plan covering all <strong>46 lecture guides</strong>, handwritten code/UML drills, and timed 2-hour KCA past paper simulations—engineered to defuse the tight Dec 1→2 and Dec 4→5 turnarounds.
            </p>

            {/* Daily Study Protocol Strip */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-3xl text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950/75 border border-slate-800">
                <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Morning · 08:30–11:00
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  3×50m Pomodoro on hardest technical unit + handwritten code/UML
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/75 border border-slate-800">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" />
                  Afternoon · 14:00–16:00
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  2×50m second unit OR full 2-hr timed KCA past paper (70 marks)
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/75 border border-slate-800">
                <div className="font-bold text-sky-300 flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5" />
                  Evening · 19:30–21:00
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Closed-book recall, APA/syntax drills & mistake repair (sleep by 22:00)
                </div>
              </div>
            </div>
          </div>

          {/* Sprint Progress Card */}
          <div className="p-5 rounded-xl bg-slate-950/85 border border-emerald-500/30 max-w-xs w-full shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Sprint Completion
              </span>
              {completedCount > 0 && (
                <button
                  onClick={resetProgress}
                  className="text-[11px] text-slate-500 hover:text-rose-400 flex items-center gap-1 transition-colors"
                  title="Reset progress"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{percentComplete}%</span>
              <span className="text-xs text-slate-400">
                ({completedCount}/{totalBlocks} blocks)
              </span>
            </div>

            <div className="mt-3 w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-sky-400 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${percentComplete}%` }}
              />
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-300 space-y-2.5">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  <strong>Exam Timing Split:</strong> 50m Q1 (30m) + 32m Q2 + 28m Q3 + 5m review
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="/KCA-Dec-2026-Revision-Timetable.pdf"
                  download="KCA-Dec-2026-Revision-Timetable.pdf"
                  className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </a>
                <a
                  href="/revision-timetable-print.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-bold border border-slate-700 transition-all"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print View</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {[
          { id: 'all', label: 'All 23 Days (Nov 18 – Dec 10)' },
          { id: 'phase1', label: 'Phase 1: Core Mastery (Nov 18–24)' },
          { id: 'phase2', label: 'Phase 2: KCA Past Papers & Mocks (Nov 25–30)' },
          { id: 'phase3', label: 'Phase 3: Exam Week Precision (Dec 1–10)' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setPhaseFilter(tab.id as 'all' | SprintPhase)}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              phaseFilter === tab.id
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Day-by-Day Cards */}
      <div className="space-y-4">
        {filteredDays.map(day => {
          const isToday = day.date === todayIso;
          const isTomorrow = day.date === '2026-11-18' && todayIso === '2026-11-17';
          const dayCompletedBlocks = day.blocks.filter(b => completedIds.includes(b.id)).length;
          const isDayDone = dayCompletedBlocks === day.blocks.length;

          return (
            <div
              key={day.date}
              className={`rounded-2xl border p-5 transition-all ${
                day.isExamDay
                  ? 'bg-gradient-to-r from-rose-950/35 via-slate-900 to-slate-900 border-rose-500/40 shadow-lg shadow-rose-500/10'
                  : isToday || isTomorrow
                  ? 'bg-gradient-to-r from-emerald-950/35 via-slate-900 to-slate-900 border-emerald-500/40 ring-1 ring-emerald-500/25'
                  : isDayDone
                  ? 'bg-slate-900/40 border-emerald-500/25 opacity-80'
                  : 'bg-slate-900/70 border-slate-800/90 hover:border-slate-700'
              }`}
            >
              {/* Day Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-slate-800 text-white border border-slate-700">
                      Day {day.dayNumber} · {day.dayLabel}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        day.isExamDay
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : day.phase === 'phase1'
                          ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                          : day.phase === 'phase2'
                          ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                          : 'bg-sky-500/15 text-sky-300 border-sky-500/30'
                      }`}
                    >
                      {day.phaseTag}
                    </span>
                    {isToday && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                        TODAY
                      </span>
                    )}
                    {isTomorrow && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        STARTS TOMORROW
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white">{day.headline}</h3>
                </div>

                <div className="text-xs font-semibold text-slate-400 flex items-center gap-2 shrink-0">
                  <span className={isDayDone ? 'text-emerald-400' : 'text-slate-300'}>
                    {dayCompletedBlocks}/{day.blocks.length} done
                  </span>
                </div>
              </div>

              {/* 3 Study Blocks */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-4">
                {day.blocks.map(block => {
                  const isDone = completedIds.includes(block.id);
                  const style = KIND_STYLES[block.kind];

                  return (
                    <div
                      key={block.id}
                      onClick={() => toggleBlock(block.id)}
                      className={`cursor-pointer rounded-xl border p-4 flex flex-col justify-between transition-all ${
                        block.kind === 'exam'
                          ? 'bg-rose-950/35 border-rose-500/45 hover:border-rose-400'
                          : isDone
                          ? 'bg-emerald-950/20 border-emerald-500/30'
                          : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-950'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-mono text-slate-400">
                              {block.slot}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 ${style.badgeClass}`}
                            >
                              {style.icon}
                              {style.label}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={e => {
                              e.stopPropagation();
                              toggleBlock(block.id);
                            }}
                            className={`shrink-0 transition-colors ${
                              isDone ? 'text-emerald-400' : 'text-slate-600 hover:text-emerald-400'
                            }`}
                            title={isDone ? 'Mark incomplete' : 'Mark complete'}
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : (
                              <Circle className="w-5 h-5" />
                            )}
                          </button>
                        </div>

                        <div className="text-[11px] font-extrabold text-amber-400 mb-0.5">
                          {block.courseCode}
                        </div>
                        <h4
                          className={`text-sm font-bold leading-snug mb-1.5 ${
                            isDone ? 'text-slate-400 line-through' : 'text-white'
                          }`}
                        >
                          {block.title}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{block.tasks}</p>
                      </div>

                      {block.courseId && (
                        <div className="mt-3 pt-2.5 border-t border-slate-800/70 flex justify-end">
                          <button
                            type="button"
                            onClick={e => {
                              e.stopPropagation();
                              onSelectCourse(block.courseId!);
                            }}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-[11px] font-semibold transition-all"
                          >
                            <BookOpen className="w-3 h-3" />
                            <span>Open {block.courseCode.split(' ')[0]} Notes</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
