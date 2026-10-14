import { Course, Assignment, UserProfile, StudySession } from '../types';
import { initialCourses, initialAssignments, initialProfile } from '../data/initialData';

const STORAGE_KEYS = {
  COURSES: 'it_study_hub_courses_v6_critical_thinking_update',
  ASSIGNMENTS: 'it_study_hub_assignments_v6_critical_thinking_update',
  PROFILE: 'it_study_hub_profile_v6_critical_thinking_update',
  STUDY_SESSIONS: 'it_study_hub_sessions_v6_critical_thinking_update',
};

export const StorageService = {
  getCourses(): Course[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.COURSES);
      if (!stored) {
        this.saveCourses(initialCourses);
        return initialCourses;
      }
      const parsed: Course[] = JSON.parse(stored);
      
      // If cached data contains stale mock courses, purge and reset to initialCourses
      const hasStaleCourses = parsed.some(c => 
        c.code === 'BAC 1104' || c.code === 'BCT 1203' || c.code === 'BCT 1204' || c.code === 'BCT 1205' || c.code === 'BCT 2101'
      );
      if (hasStaleCourses) {
        this.saveCourses(initialCourses);
        return initialCourses;
      }

      // Check if courses have fewer resources than the newly uploaded notes collection
      const totalStoredResources = parsed.reduce((acc, c) => acc + (c.resources?.length || 0), 0);
      const totalInitialResources = initialCourses.reduce((acc, c) => acc + (c.resources?.length || 0), 0);
      if (totalStoredResources < totalInitialResources) {
        // Upgrade to fresh course notes while preserving user's custom additions
        const merged = initialCourses.map(initCourse => {
          const existing = parsed.find(p => p.id === initCourse.id || p.code === initCourse.code);
          if (!existing) return initCourse;
          return {
            ...initCourse,
            // Keep gradeComponents if user customized scores
            gradeComponents: existing.gradeComponents || initCourse.gradeComponents,
          };
        });
        this.saveCourses(merged);
        return merged;
      }

      return parsed;
    } catch (e) {
      console.error('Error reading courses from storage', e);
      return initialCourses;
    }
  },

  saveCourses(courses: Course[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
    } catch (e) {
      console.error('Error saving courses to storage', e);
    }
  },

  getAssignments(): Assignment[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
      if (!stored) {
        this.saveAssignments(initialAssignments);
        return initialAssignments;
      }
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error reading assignments from storage', e);
      return initialAssignments;
    }
  },

  saveAssignments(assignments: Assignment[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(assignments));
    } catch (e) {
      console.error('Error saving assignments to storage', e);
    }
  },

  getProfile(): UserProfile {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (!stored) {
        this.saveProfile(initialProfile);
        return initialProfile;
      }
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error reading profile from storage', e);
      return initialProfile;
    }
  },

  saveProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Error saving profile to storage', e);
    }
  },

  getStudySessions(): StudySession[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.STUDY_SESSIONS);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  },

  saveStudySessions(sessions: StudySession[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDY_SESSIONS, JSON.stringify(sessions));
    } catch (e) {
      console.error('Error saving study sessions', e);
    }
  },

  exportFullBackup(): void {
    const data = {
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      profile: this.getProfile(),
      courses: this.getCourses(),
      assignments: this.getAssignments(),
      sessions: this.getStudySessions(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `it-study-hub-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  importBackup(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.courses && Array.isArray(parsed.courses)) {
        this.saveCourses(parsed.courses);
      }
      if (parsed.assignments && Array.isArray(parsed.assignments)) {
        this.saveAssignments(parsed.assignments);
      }
      if (parsed.profile) {
        this.saveProfile(parsed.profile);
      }
      if (parsed.sessions && Array.isArray(parsed.sessions)) {
        this.saveStudySessions(parsed.sessions);
      }
      return true;
    } catch (e) {
      console.error('Failed to parse backup JSON', e);
      return false;
    }
  },

  resetToDefault(): void {
    this.saveCourses(initialCourses);
    this.saveAssignments(initialAssignments);
    this.saveProfile(initialProfile);
    this.saveStudySessions([]);
  },

  resetAllProgressToUnread(): Course[] {
    const fresh = initialCourses.map(c => ({
      ...c,
      syllabus: c.syllabus.map(m => ({
        ...m,
        completed: false,
        timeSpentMinutes: undefined,
        completedAt: undefined,
      })),
      resources: (c.resources || []).map(r => ({
        ...r,
        covered: false,
        timeSpentMinutes: undefined,
        coveredAt: undefined,
      })),
    }));
    this.saveCourses(fresh);
    this.saveStudySessions([]);
    return fresh;
  }
};
