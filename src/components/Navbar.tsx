import React from 'react';
import { 
  GraduationCap, 
  LayoutDashboard, 
  BookOpen, 
  CalendarCheck2, 
  Timer, 
  Terminal, 
  Download, 
  Plus,
  BookMarked,
  Sparkles,
  Calendar
} from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  activeTab: 'dashboard' | 'courses' | 'assignments' | 'timetable' | 'timer';
  setActiveTab: (tab: 'dashboard' | 'courses' | 'assignments' | 'timetable' | 'timer') => void;
  profile: UserProfile;
  onOpenNewAssignment: () => void;
  onOpenNewCourse: () => void;
  onOpenCheatsheet: () => void;
  onOpenBackup: () => void;
  onOpenKCAUSync: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  profile,
  onOpenNewAssignment,
  onOpenNewCourse,
  onOpenCheatsheet,
  onOpenBackup,
  onOpenKCAUSync,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Degree Tag */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="h-full w-full bg-slate-950 rounded-xl flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">IT Study Hub</span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold tracking-wide bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
                  BSc IT
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                {profile.academicYear} • {profile.currentTerm}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden md:inline">Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'courses'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden md:inline">Courses & Syllabus</span>
            </button>

            <button
              onClick={() => setActiveTab('assignments')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'assignments'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <CalendarCheck2 className="h-4 w-4" />
              <span className="hidden md:inline">Assignments & Deadlines</span>
            </button>

            <button
              onClick={() => setActiveTab('timetable')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'timetable'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span className="hidden md:inline">Class Schedule</span>
            </button>

            <button
              onClick={() => setActiveTab('timer')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'timer'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Timer className="h-4 w-4" />
              <span className="hidden md:inline">Focus Timer</span>
            </button>
          </nav>

          {/* Quick Actions & Cheatsheet */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCheatsheet}
              title="IT Quick Reference Cheatsheet"
              className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-900 rounded-lg transition-colors border border-slate-800"
            >
              <Terminal className="h-4 w-4" />
            </button>

            <button
              onClick={onOpenBackup}
              title="Export / Backup Workspace"
              className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-900 rounded-lg transition-colors border border-slate-800"
            >
              <Download className="h-4 w-4" />
            </button>

            <button
              onClick={onOpenKCAUSync}
              title="KCAU Virtual Campus Sync & Study Plan"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-950/90 hover:bg-indigo-900 border border-indigo-500/30 text-indigo-300 hover:text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
              <span>KCAU Sync</span>
            </button>

            <div className="relative group">
              <button
                onClick={onOpenNewAssignment}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all"
              >
                <Plus className="h-3.5 w-3.5" />
                <span className="hidden lg:inline">Assignment</span>
              </button>
            </div>

            <button
              onClick={onOpenNewCourse}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all"
            >
              <BookMarked className="h-3.5 w-3.5 text-indigo-400" />
              <span>Course</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
