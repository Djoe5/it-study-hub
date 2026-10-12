import React, { useState, useEffect } from 'react';
import { Course, Assignment, UserProfile, StudySession } from './types';
import { StorageService } from './services/storage';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { CoursesView } from './components/CoursesView';
import { AssignmentsView } from './components/AssignmentsView';
import { FocusTimer } from './components/FocusTimer';
import { TimetableView } from './components/TimetableView';
import { AssignmentModal } from './components/AssignmentModal';
import { CourseModal } from './components/CourseModal';
import { BackupModal } from './components/BackupModal';
import { ITCheatsheetModal } from './components/ITCheatsheetModal';
import { KCAUSyncModal } from './components/KCAUSyncModal';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'courses' | 'assignments' | 'timetable' | 'timer'>('dashboard');
  
  // Persistent data state
  const [courses, setCourses] = useState<Course[]>(() => StorageService.getCourses());
  const [assignments, setAssignments] = useState<Assignment[]>(() => StorageService.getAssignments());
  const [profile, setProfile] = useState<UserProfile>(() => StorageService.getProfile());
  const [sessions, setSessions] = useState<StudySession[]>(() => StorageService.getStudySessions());
  
  // Active course navigation
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(courses[0]?.id || null);

  // Modals state
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isCheatsheetModalOpen, setIsCheatsheetModalOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isKCAUSyncOpen, setIsKCAUSyncOpen] = useState(false);

  // Synchronize to StorageService
  useEffect(() => {
    StorageService.saveCourses(courses);
  }, [courses]);

  useEffect(() => {
    StorageService.saveAssignments(assignments);
  }, [assignments]);

  useEffect(() => {
    StorageService.saveStudySessions(sessions);
  }, [sessions]);

  // Reload data from storage (e.g. after backup import or reset)
  const reloadData = () => {
    const freshCourses = StorageService.getCourses();
    setCourses(freshCourses);
    setAssignments(StorageService.getAssignments());
    setProfile(StorageService.getProfile());
    setSessions(StorageService.getStudySessions());
    if (freshCourses.length > 0) {
      setSelectedCourseId(freshCourses[0].id);
    }
  };

  // Course Handlers
  const handleSaveCourse = (newCourse: Course) => {
    const updated = [...courses, newCourse];
    setCourses(updated);
    setSelectedCourseId(newCourse.id);
  };

  const handleUpdateCourse = (updatedCourse: Course) => {
    setCourses(courses.map(c => c.id === updatedCourse.id ? updatedCourse : c));
  };

  const handleDeleteCourse = (courseId: string) => {
    const updated = courses.filter(c => c.id !== courseId);
    setCourses(updated);
    if (selectedCourseId === courseId) {
      setSelectedCourseId(updated[0]?.id || null);
    }
  };

  // Assignment Handlers
  const handleSaveAssignment = (assignment: Assignment) => {
    const existingIndex = assignments.findIndex(a => a.id === assignment.id);
    if (existingIndex >= 0) {
      const updated = [...assignments];
      updated[existingIndex] = assignment;
      setAssignments(updated);
    } else {
      setAssignments([assignment, ...assignments]);
    }
    setEditingAssignment(null);
  };

  const handleToggleAssignmentStatus = (assignmentId: string) => {
    setAssignments(assignments.map(a => {
      if (a.id === assignmentId) {
        const nextStatus = (a.status === 'submitted' || a.status === 'graded') ? 'not_started' : 'submitted';
        return { ...a, status: nextStatus };
      }
      return a;
    }));
  };

  const handleDeleteAssignment = (assignmentId: string) => {
    setAssignments(assignments.filter(a => a.id !== assignmentId));
  };

  const handleOpenEditAssignment = (asg: Assignment) => {
    setEditingAssignment(asg);
    setIsAssignmentModalOpen(true);
  };

  const handleOpenNewAssignment = () => {
    setEditingAssignment(null);
    setIsAssignmentModalOpen(true);
  };

  const handleSelectCourseFromDashboard = (courseId: string) => {
    setSelectedCourseId(courseId);
    setActiveTab('courses');
  };

  const handleAddSession = (session: StudySession) => {
    setSessions(prev => [...prev, session]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
        onOpenNewAssignment={handleOpenNewAssignment}
        onOpenNewCourse={() => setIsCourseModalOpen(true)}
        onOpenCheatsheet={() => setIsCheatsheetModalOpen(true)}
        onOpenBackup={() => setIsBackupModalOpen(true)}
        onOpenKCAUSync={() => setIsKCAUSyncOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            profile={profile}
            courses={courses}
            assignments={assignments}
            sessions={sessions}
            onSelectCourse={handleSelectCourseFromDashboard}
            onNavigateToTab={setActiveTab}
            onToggleAssignmentStatus={handleToggleAssignmentStatus}
            onOpenNewAssignment={handleOpenNewAssignment}
          />
        )}

        {activeTab === 'courses' && (
          <CoursesView
            courses={courses}
            selectedCourseId={selectedCourseId}
            onSelectCourse={setSelectedCourseId}
            onUpdateCourse={handleUpdateCourse}
            onDeleteCourse={handleDeleteCourse}
            onOpenNewCourse={() => setIsCourseModalOpen(true)}
            onAddSession={handleAddSession}
            onResetAllToUnread={() => {
              const fresh = StorageService.resetAllProgressToUnread();
              setCourses(fresh);
            }}
          />
        )}

        {activeTab === 'assignments' && (
          <AssignmentsView
            assignments={assignments}
            courses={courses}
            onUpdateAssignment={handleSaveAssignment}
            onDeleteAssignment={handleDeleteAssignment}
            onOpenNewAssignment={handleOpenNewAssignment}
            onEditAssignment={handleOpenEditAssignment}
          />
        )}

        {activeTab === 'timetable' && (
          <TimetableView
            courses={courses}
            onSelectCourse={handleSelectCourseFromDashboard}
          />
        )}

        {activeTab === 'timer' && (
          <FocusTimer
            courses={courses}
            sessions={sessions}
            onAddSession={handleAddSession}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>IT Degree Study Hub • Designed for Information Technology Scholars</span>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <button onClick={() => setIsCheatsheetModalOpen(true)} className="hover:text-indigo-400">
              Cheatsheets
            </button>
            <button onClick={() => setIsBackupModalOpen(true)} className="hover:text-indigo-400">
              Backup / Restore
            </button>
            <span>Auto-Saved locally</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AssignmentModal
        isOpen={isAssignmentModalOpen}
        onClose={() => {
          setIsAssignmentModalOpen(false);
          setEditingAssignment(null);
        }}
        onSave={handleSaveAssignment}
        courses={courses}
        initialData={editingAssignment}
      />

      <CourseModal
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        onSave={handleSaveCourse}
      />

      <BackupModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        onDataReload={reloadData}
      />

      <ITCheatsheetModal
        isOpen={isCheatsheetModalOpen}
        onClose={() => setIsCheatsheetModalOpen(false)}
      />

      <KCAUSyncModal
        isOpen={isKCAUSyncOpen}
        onClose={() => setIsKCAUSyncOpen(false)}
        onDataReload={reloadData}
        existingCourses={courses}
      />
    </div>
  );
};

export default App;
