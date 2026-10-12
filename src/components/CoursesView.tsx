import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Calculator, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronRight,
  Sparkles,
  FileText,
  Presentation,
  Video,
  Download,
  FolderGit2,
  Paperclip,
  Share2,
  RotateCcw
} from 'lucide-react';
import { Course, SyllabusModule, GradeComponent, CourseResource, StudySession } from '../types';
import { StudyReadingRoomModal } from './StudyReadingRoomModal';
import confetti from 'canvas-confetti';
import { STU_1201_LECTURES } from '../data/stu1201Lectures';

interface CoursesViewProps {
  courses: Course[];
  selectedCourseId: string | null;
  onSelectCourse: (courseId: string | null) => void;
  onUpdateCourse: (course: Course) => void;
  onDeleteCourse: (courseId: string) => void;
  onOpenNewCourse: () => void;
  onAddSession?: (session: StudySession) => void;
  onResetAllToUnread?: () => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  courses,
  selectedCourseId,
  onSelectCourse,
  onUpdateCourse,
  onDeleteCourse,
  onOpenNewCourse,
  onAddSession,
  onResetAllToUnread,
}) => {
  const [activeTab, setActiveTab] = useState<'syllabus' | 'materials' | 'grades' | 'resources'>('syllabus');
  const [materialFilter, setMaterialFilter] = useState<'all' | 'slides' | 'pdf' | 'zoom' | 'other'>('all');
  const [newTopicText, setNewTopicText] = useState('');
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newResTitle, setNewResTitle] = useState('');
  const [newResUrl, setNewResUrl] = useState('');
  const [newResCategory, setNewResCategory] = useState<'slides' | 'pdf' | 'zoom' | 'portal' | 'other'>('slides');

  // Study Reading Room Modal state
  const [isStudyRoomOpen, setIsStudyRoomOpen] = useState(false);
  const [activeStudyModule, setActiveStudyModule] = useState<SyllabusModule | undefined>(undefined);
  const [activeStudyResource, setActiveStudyResource] = useState<CourseResource | undefined>(undefined);

  const activeCourse = courses.find(c => c.id === selectedCourseId) || courses[0];

  const handleOpenStudyRoomForModule = (mod: SyllabusModule, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveStudyModule(mod);
    setActiveStudyResource(undefined);
    setIsStudyRoomOpen(true);
  };

  const handleOpenStudyRoomForResource = (res: CourseResource, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveStudyResource(res);
    setActiveStudyModule(undefined);
    setIsStudyRoomOpen(true);
  };

  const handleCompleteStudy = (params: { timeSpentMinutes: number; notes: string }) => {
    if (!activeCourse) return;

    const topicTitle = activeStudyModule 
      ? `Week ${activeStudyModule.week}: ${activeStudyModule.title}` 
      : (activeStudyResource?.title || 'Course Material');

    if (onAddSession) {
      onAddSession({
        id: `sess-${Date.now()}`,
        courseId: activeCourse.id,
        topic: topicTitle,
        durationMinutes: params.timeSpentMinutes,
        timestamp: new Date().toISOString(),
      });
    }

    if (activeStudyModule) {
      const updated = activeCourse.syllabus.map(m => {
        if (m.id === activeStudyModule.id) {
          return {
            ...m,
            completed: true,
            completedAt: new Date().toISOString(),
            timeSpentMinutes: (m.timeSpentMinutes || 0) + params.timeSpentMinutes,
            studyNotes: params.notes || m.studyNotes,
          };
        }
        return m;
      });
      onUpdateCourse({ ...activeCourse, syllabus: updated });
    } else if (activeStudyResource) {
      const updated = (activeCourse.resources || []).map(r => {
        if (r.id === activeStudyResource.id) {
          return {
            ...r,
            covered: true,
            coveredAt: new Date().toISOString(),
            timeSpentMinutes: (r.timeSpentMinutes || 0) + params.timeSpentMinutes,
          };
        }
        return r;
      });
      onUpdateCourse({ ...activeCourse, resources: updated });
    }
  };

  // Toggle syllabus module completion
  const handleToggleModule = (moduleId: string) => {
    if (!activeCourse) return;
    const updatedSyllabus = activeCourse.syllabus.map(mod => {
      if (mod.id === moduleId) {
        const nextState = !mod.completed;
        if (nextState) {
          confetti({
            particleCount: 40,
            spread: 50,
            origin: { y: 0.7 },
            colors: [activeCourse.color || '#6366f1', '#10b981', '#38bdf8']
          });
        }
        return { ...mod, completed: nextState };
      }
      return mod;
    });

    onUpdateCourse({
      ...activeCourse,
      syllabus: updatedSyllabus,
    });
  };

  // Add new module to syllabus
  const handleAddModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModuleTitle.trim() || !activeCourse) return;

    const newMod: SyllabusModule = {
      id: `syl-custom-${Date.now()}`,
      week: activeCourse.syllabus.length + 1,
      title: newModuleTitle.trim(),
      topics: newTopicText ? newTopicText.split(',').map(t => t.trim()).filter(Boolean) : [],
      completed: false,
    };

    onUpdateCourse({
      ...activeCourse,
      syllabus: [...activeCourse.syllabus, newMod],
    });

    setNewModuleTitle('');
    setNewTopicText('');
  };

  // Add new course resource / file
  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResTitle.trim() || !newResUrl.trim() || !activeCourse) return;

    const newRes: CourseResource = {
      id: `res-custom-${Date.now()}`,
      title: newResTitle.trim(),
      url: newResUrl.trim(),
      category: newResCategory,
    };

    onUpdateCourse({
      ...activeCourse,
      resources: [...(activeCourse.resources || []), newRes],
    });

    setNewResTitle('');
    setNewResUrl('');
  };

  // Update grade score
  const handleScoreChange = (componentId: string, newScore: number) => {
    if (!activeCourse) return;
    const updatedComponents = activeCourse.gradeComponents.map(gc => {
      if (gc.id === componentId) {
        return { ...gc, score: isNaN(newScore) ? undefined : newScore };
      }
      return gc;
    });

    onUpdateCourse({
      ...activeCourse,
      gradeComponents: updatedComponents,
    });
  };

  // Grade calculation
  const calculateGrades = () => {
    if (!activeCourse || !activeCourse.gradeComponents.length) return null;

    let gradedWeight = 0;
    let earnedWeightPoints = 0;
    let totalWeight = 0;

    activeCourse.gradeComponents.forEach(gc => {
      totalWeight += gc.weight;
      if (gc.score !== undefined && gc.score !== null) {
        gradedWeight += gc.weight;
        earnedWeightPoints += (gc.score / gc.maxScore) * gc.weight;
      }
    });

    const currentStanding = gradedWeight > 0 ? (earnedWeightPoints / gradedWeight) * 100 : 0;
    const remainingWeight = totalWeight - gradedWeight;
    const target = activeCourse.targetGrade || 85;

    // score needed on remaining weight to reach target
    let neededOnRemaining: number | null = null;
    if (remainingWeight > 0) {
      const pointsNeededTotal = (target / 100) * totalWeight;
      const pointsStillNeeded = pointsNeededTotal - earnedWeightPoints;
      neededOnRemaining = Math.max(0, (pointsStillNeeded / remainingWeight) * 100);
    }

    return {
      currentStanding: currentStanding.toFixed(1),
      gradedWeight,
      remainingWeight,
      neededOnRemaining: neededOnRemaining ? neededOnRemaining.toFixed(1) : null,
      target,
    };
  };

  const gradeStats = calculateGrades();

  if (courses.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center">
        <BookOpen className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white">No courses enrolled yet</h2>
        <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
          Add your semester IT subjects to track syllabus units, assignment grading weights, and lecture links.
        </p>
        <button
          onClick={onOpenNewCourse}
          className="mt-6 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30"
        >
          + Add First Course
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Courses & Syllabus Tracker</h1>
          <p className="text-xs text-slate-400 mt-1">
            Track weekly lecture topics, calculate required exam grades, and keep lab links handy.
          </p>
        </div>

        <button
          onClick={onOpenNewCourse}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Course</span>
        </button>
      </div>

      {/* Main Grid: Course selector sidebar + Detailed Course Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left column: Courses list (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
            Enrolled Units ({courses.length})
          </div>

          <div className="space-y-2">
            {courses.map(course => {
              const isSelected = activeCourse?.id === course.id;
              const totalModules = course.syllabus.length;
              const completedModules = course.syllabus.filter(m => m.completed).length;
              const percent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

              return (
                <div
                  key={course.id}
                  onClick={() => onSelectCourse(course.id)}
                  className={`cursor-pointer rounded-xl p-4 transition-all border text-left ${
                    isSelected
                      ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span 
                      className="text-xs font-bold px-2 py-0.5 rounded-md"
                      style={{ 
                        backgroundColor: `${course.color}20`, 
                        color: course.color,
                        border: `1px solid ${course.color}40`
                      }}
                    >
                      {course.code}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {course.credits} Credits
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-white line-clamp-1">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1">
                    {course.instructor}
                  </p>

                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span>Syllabus</span>
                      <span className="font-semibold text-slate-300">{percent}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${percent}%`, backgroundColor: course.color }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: Selected Course Detail (8 cols) */}
        {activeCourse && (
          <div className="lg:col-span-8 space-y-6">
            
            {/* Course Banner */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-xs font-bold px-2.5 py-0.5 rounded-md"
                      style={{ 
                        backgroundColor: `${activeCourse.color}20`, 
                        color: activeCourse.color,
                        border: `1px solid ${activeCourse.color}40`
                      }}
                    >
                      {activeCourse.code}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {activeCourse.term} • {activeCourse.credits} Credit Hours
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white mt-1.5">
                    {activeCourse.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2 self-start">
                  {onResetAllToUnread && (
                    <button
                      onClick={() => {
                        if (confirm('Start fresh? This will reset all syllabus modules and learning materials across all units to Unread so you can study and cover them one-by-one.')) {
                          onResetAllToUnread();
                        }
                      }}
                      title="Reset all units to Unread for a clean, disciplined study cycle"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset All to Unread</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (confirm(`Remove course ${activeCourse.code}?`)) {
                        onDeleteCourse(activeCourse.id);
                      }
                    }}
                    title="Delete course"
                    className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 border border-slate-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Course Meta Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                  <div className="truncate">
                    <div className="text-slate-400 text-[10px]">INSTRUCTOR</div>
                    <div className="truncate font-medium">{activeCourse.instructor}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                  <div>
                    <div className="text-slate-400 text-[10px]">SCHEDULE</div>
                    <div className="font-medium truncate">{activeCourse.schedule || 'TBD'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                  <div>
                    <div className="text-slate-400 text-[10px]">LOCATION / LAB</div>
                    <div className="font-medium truncate">{activeCourse.roomOrLink || 'Lecture Hall'}</div>
                  </div>
                </div>
              </div>

              {/* Sub-tabs: Syllabus, Grade Calculator, Resources */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => setActiveTab('syllabus')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === 'syllabus'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Syllabus Breakdown ({activeCourse.syllabus.length} Weeks)
                </button>

                <button
                  onClick={() => setActiveTab('grades')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === 'grades'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Grade Estimator & Target
                </button>

                <button
                  onClick={() => setActiveTab('materials')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === 'materials'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Virtual Campus Materials ({activeCourse.resources?.length || 0})
                </button>

                <button
                  onClick={() => setActiveTab('resources')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === 'resources'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Portals & Links
                </button>
              </div>
            </div>

            {/* TAB CONTENT: SYLLABUS */}
            {activeTab === 'syllabus' && (
              <div className="space-y-4">
                
                {/* Course Notes & Slide Decks (Available across all courses) */}
                {(() => {
                  const courseNotes = (activeCourse.resources || []).filter(r => 
                    r.url.startsWith('/notes/') || r.fileType || r.category === 'slides' || r.category === 'pdf' || r.category === 'notes'
                  );
                  if (courseNotes.length === 0) return null;

                  return (
                    <div className="rounded-xl border border-indigo-500/40 bg-indigo-950/20 p-4 space-y-3 shadow-inner">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-500/20 pb-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                            <Presentation className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                              <span>{activeCourse.code} Smart Notes & Real-World Guides</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1 font-semibold">
                                <Sparkles className="w-3 h-3 text-amber-400" />
                                Synthesized & Ready
                              </span>
                            </h4>
                            <p className="text-xs text-indigo-200/70">
                              Core highlights, real-world industry applications, code examples & exam traps for every lecture.
                            </p>
                          </div>
                        </div>
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 self-start sm:self-auto font-mono">
                          {courseNotes.length} Smart Guides
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        {courseNotes.map(item => {
                          const matchingMod = activeCourse.syllabus.find(m => 
                            (item.week && m.week === item.week) ||
                            (m.title && item.title.toLowerCase().includes(m.title.toLowerCase().slice(0, 15)))
                          );
                          const isPdf = item.fileType === 'pdf' || item.url.toLowerCase().endsWith('.pdf');

                          return (
                            <div 
                              key={item.id} 
                              className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2.5 hover:border-indigo-500/50 transition-all flex flex-col justify-between group"
                            >
                              <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                                    {item.week ? `Week ${item.week}` : 'Smart Note'} • {item.fileType?.toUpperCase() || item.category.toUpperCase()}
                                  </span>
                                  <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                                    Real-World Context
                                  </span>
                                </div>
                                <h5 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug line-clamp-2">
                                  {item.title}
                                </h5>
                                {matchingMod && (
                                  <p className="text-[11px] text-slate-400 line-clamp-1">
                                    Module: {matchingMod.title}
                                  </p>
                                )}
                              </div>

                              <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                                <button
                                  type="button"
                                  onClick={() => handleOpenStudyRoomForResource(item)}
                                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all"
                                >
                                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                                  <span>Study Smart Guide</span>
                                </button>

                                <a
                                  href={item.url}
                                  download
                                  className="flex items-center justify-center gap-1 py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-all"
                                  title="Download / Open original file"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                  <span>{item.fileType?.toUpperCase() || (isPdf ? 'PDF' : 'FILE')}</span>
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Weekly Topic Checkpoints</span>
                  </h3>
                  <span className="text-xs text-slate-400">
                    Click circle to mark topic studied
                  </span>
                </div>

                <div className="space-y-3">
                  {activeCourse.syllabus.map((mod) => (
                    <div
                      key={mod.id}
                      onClick={() => handleToggleModule(mod.id)}
                      className={`cursor-pointer rounded-xl p-4 border transition-all flex items-start gap-3.5 ${
                        mod.completed
                          ? 'bg-emerald-950/20 border-emerald-500/30'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <button
                        type="button"
                        className="mt-0.5 shrink-0 text-slate-500"
                        title={mod.completed ? 'Mark uncompleted' : 'Mark completed'}
                      >
                        {mod.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Circle className="w-5 h-5 hover:text-indigo-400 transition-colors" />
                        )}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wide">
                            Week {mod.week}
                          </span>
                          <span className={`text-sm font-semibold ${mod.completed ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                            {mod.title}
                          </span>
                        </div>

                        {mod.topics && mod.topics.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {mod.topics.map((t, idx) => (
                              <span
                                key={idx}
                                className={`text-[11px] px-2 py-0.5 rounded-md ${
                                  mod.completed
                                    ? 'bg-emerald-900/20 text-emerald-400/80 border border-emerald-500/20'
                                    : 'bg-slate-800 text-slate-300 border border-slate-700'
                                }`}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Status & Study Room Launcher */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3 pt-2.5 border-t border-slate-800/80">
                          <div className="flex items-center gap-2">
                            {mod.completed ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                Covered {mod.timeSpentMinutes ? `(${mod.timeSpentMinutes}m studied)` : ''}
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Unread • {mod.targetStudyMinutes || 25}m speculated
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={(e) => handleOpenStudyRoomForModule(mod, e)}
                            className="flex items-center justify-center gap-1.5 py-1 px-3 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold transition-all shadow-sm"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>{mod.completed ? 'Re-Study in Room' : 'Enter Study Room'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Module to Syllabus */}
                <form onSubmit={handleAddModule} className="rounded-xl border border-dashed border-slate-800 bg-slate-900/30 p-4 space-y-3">
                  <div className="text-xs font-semibold text-slate-300">
                    + Add Week / Module to Syllabus
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Module Title (e.g. Week 7: Cryptography & Hashes)"
                      value={newModuleTitle}
                      onChange={(e) => setNewModuleTitle(e.target.value)}
                      className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      placeholder="Topics (comma separated, e.g. RSA, AES, SHA-256)"
                      value={newTopicText}
                      onChange={(e) => setNewTopicText(e.target.value)}
                      className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!newModuleTitle.trim()}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold"
                  >
                    Add Syllabus Module
                  </button>
                </form>
              </div>
            )}

            {/* TAB CONTENT: GRADE ESTIMATOR */}
            {activeTab === 'grades' && (
              <div className="space-y-5">
                {/* Stats Summary */}
                {gradeStats && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4">
                      <div className="text-xs text-slate-400">Current Standing</div>
                      <div className="text-2xl font-bold text-white mt-1">
                        {gradeStats.currentStanding}%
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        From {gradeStats.gradedWeight}% graded coursework
                      </div>
                    </div>

                    <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4">
                      <div className="text-xs text-slate-400">Target Grade</div>
                      <div className="text-2xl font-bold text-indigo-400 mt-1">
                        {gradeStats.target}%
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Goal for this subject
                      </div>
                    </div>

                    <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4">
                      <div className="text-xs text-slate-400">Required on Remaining</div>
                      <div className="text-2xl font-bold text-amber-400 mt-1">
                        {gradeStats.neededOnRemaining !== null ? `${gradeStats.neededOnRemaining}%` : 'Complete!'}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Across remaining {gradeStats.remainingWeight}% weight
                      </div>
                    </div>
                  </div>
                )}

                {/* Grade Component Breakdown */}
                <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Syllabus Grading Weights
                    </h4>
                    <span className="text-xs text-slate-400">
                      Enter your received scores to calculate standing
                    </span>
                  </div>

                  <div className="space-y-3">
                    {activeCourse.gradeComponents.map(gc => (
                      <div key={gc.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 gap-3">
                        <div>
                          <div className="text-xs font-semibold text-white">{gc.name}</div>
                          <div className="text-[11px] text-slate-400">Weight: {gc.weight}% of final grade</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <label className="text-xs text-slate-400">Score:</label>
                          <input
                            type="number"
                            min="0"
                            max={gc.maxScore}
                            value={gc.score ?? ''}
                            onChange={(e) => handleScoreChange(gc.id, parseFloat(e.target.value))}
                            placeholder="Pending"
                            className="w-20 px-2.5 py-1 text-center bg-slate-900 border border-slate-700 rounded-md text-xs text-white focus:outline-none focus:border-indigo-500"
                          />
                          <span className="text-xs text-slate-400">/ {gc.maxScore}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: VIRTUAL CAMPUS MATERIALS & LECTURE FILES */}
            {activeTab === 'materials' && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Presentation className="w-4 h-4 text-indigo-400" />
                      <span>Lecture Slides, Handouts & Class Files</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Direct access to weekly courseware imported from KCAU Virtual Campus
                    </p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {(['all', 'slides', 'pdf', 'zoom', 'other'] as const).map(cat => (
                      <button
                        key={cat}
                        onClick={() => setMaterialFilter(cat)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider transition-all ${
                          materialFilter === cat
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Materials List */}
                {(() => {
                  const filtered = (activeCourse.resources || []).filter(r => {
                    if (materialFilter === 'all') return true;
                    if (materialFilter === 'slides') return r.category === 'slides';
                    if (materialFilter === 'pdf') return r.category === 'pdf' || r.category === 'notes' || r.category === 'textbook';
                    if (materialFilter === 'zoom') return r.category === 'zoom' || r.category === 'portal';
                    return r.category === 'other' || r.category === 'github';
                  });

                  if (filtered.length === 0) {
                    return (
                      <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center bg-slate-950/40">
                        <Presentation className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                        <h4 className="text-xs font-semibold text-slate-300">No materials under this filter</h4>
                        <p className="text-[11px] text-slate-400 mt-1 max-w-sm mx-auto">
                          Use the "KCAU Sync" button at the top to import lecture files directly from your Virtual Campus course page.
                        </p>
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {filtered.map(res => {
                        const isSlides = res.category === 'slides';
                        const isPdf = res.category === 'pdf' || res.category === 'textbook';
                        const isZoom = res.category === 'zoom';

                        return (
                          <div
                            key={res.id}
                            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 hover:border-indigo-500/40 hover:bg-slate-900/60 transition-all flex flex-col justify-between group"
                          >
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                                  isSlides ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                  isPdf ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                                  isZoom ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' :
                                  'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                                }`}>
                                  {isSlides ? <Presentation className="w-4 h-4" /> :
                                   isPdf ? <FileText className="w-4 h-4" /> :
                                   isZoom ? <Video className="w-4 h-4" /> :
                                   <Paperclip className="w-4 h-4" />}
                                </div>
                                <div>
                                  <div className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                                    {res.title}
                                  </div>
                                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                                    <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                                      {res.fileType?.toUpperCase() || res.category}
                                    </span>
                                    {res.fileSize && (
                                      <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded">
                                        {res.fileSize}
                                      </span>
                                    )}
                                    {res.week && (
                                      <span className="text-[10px] text-indigo-400 font-medium">
                                        Week {res.week}
                                      </span>
                                    )}
                                    {res.covered ? (
                                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" />
                                        Covered {res.timeSpentMinutes ? `(${res.timeSpentMinutes}m)` : ''}
                                      </span>
                                    ) : (
                                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                        Unread
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                              <span className="text-[11px] text-slate-400 truncate max-w-[140px]">
                                {res.url.replace(/^\/(notes|lectures)\//, '')}
                              </span>
                              <div className="flex items-center gap-2">
                                {(res.url.startsWith('/notes/') || res.fileType) && (
                                  <a
                                    href={res.url}
                                    download
                                    className="flex items-center gap-1 py-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-all"
                                    title="Download File"
                                  >
                                    <Download className="w-3 h-3 text-indigo-400" />
                                    <span>Download</span>
                                  </a>
                                )}
                                <button
                                  type="button"
                                  onClick={(e) => handleOpenStudyRoomForResource(res, e)}
                                  className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all"
                                >
                                  <BookOpen className="w-3 h-3" />
                                  <span>Study Room</span>
                                </button>
                                <a
                                  href={res.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex items-center gap-1 py-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-all"
                                  title="Open in Browser"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}

                {/* Add Custom Lecture Resource / File Link Form */}
                <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-4">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Plus className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Attach Lecture Slide or Document Link</span>
                  </h4>
                  <form onSubmit={handleAddResource} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <input
                      type="text"
                      placeholder="Title (e.g. Week 4 CIDR Subnetting Slides)"
                      value={newResTitle}
                      onChange={(e) => setNewResTitle(e.target.value)}
                      className="sm:col-span-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="url"
                      placeholder="URL / File Link"
                      value={newResUrl}
                      onChange={(e) => setNewResUrl(e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                    <div className="flex gap-2">
                      <select
                        value={newResCategory}
                        onChange={(e) => setNewResCategory(e.target.value as any)}
                        className="flex-1 px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option value="slides">Slides</option>
                        <option value="pdf">PDF / Notes</option>
                        <option value="zoom">Zoom Link</option>
                        <option value="portal">Portal</option>
                        <option value="other">Other</option>
                      </select>
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* TAB CONTENT: RESOURCES */}
            {activeTab === 'resources' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">Course Portals & External References</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeCourse.resources?.map(res => (
                    <a
                      key={res.id}
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-900 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-indigo-400" />
                        <div>
                          <div className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300">
                            {res.title}
                          </div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                            {res.category}
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400" />
                    </a>
                  ))}
                </div>

                {(!activeCourse.resources || activeCourse.resources.length === 0) && (
                  <div className="text-center py-8 text-xs text-slate-400">
                    No reference links added yet for this subject.
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Deep Study Reading Room Modal */}
      {activeCourse && (
        <StudyReadingRoomModal
          isOpen={isStudyRoomOpen}
          onClose={() => {
            setIsStudyRoomOpen(false);
            setActiveStudyModule(undefined);
            setActiveStudyResource(undefined);
          }}
          course={activeCourse}
          module={activeStudyModule}
          resource={activeStudyResource}
          onCompleteStudy={handleCompleteStudy}
        />
      )}
    </div>
  );
};
