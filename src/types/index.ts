export type AssignmentType = 'cat' | 'lab' | 'project' | 'quiz' | 'exam' | 'homework' | 'reading';
export type PriorityLevel = 'low' | 'medium' | 'high';
export type AssignmentStatus = 'not_started' | 'in_progress' | 'submitted' | 'graded';

export interface GradeComponent {
  id: string;
  name: string;
  weight: number; // e.g. 20 for 20%
  score?: number;
  maxScore: number;
}

export interface CourseResource {
  id: string;
  title: string;
  url: string;
  category: 'slides' | 'github' | 'textbook' | 'portal' | 'zoom' | 'pdf' | 'notes' | 'recording' | 'quiz' | 'other';
  fileType?: string;
  fileSize?: string;
  week?: number;
  covered?: boolean;
  coveredAt?: string;
  timeSpentMinutes?: number;
}

export interface SyllabusModule {
  id: string;
  week: number;
  title: string;
  topics: string[];
  completed: boolean;
  completedAt?: string;
  timeSpentMinutes?: number;
  targetStudyMinutes?: number; // Speculated study time required e.g. 25
  studyNotes?: string;
  notes?: string;
  resources?: CourseResource[];
}

export interface TimetableSlot {
  id: string;
  courseId: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string; // e.g. "17:30"
  endTime: string;   // e.g. "20:30"
  roomOrPlatform: string;
  zoomLink?: string;
  zoomMeetingId?: string;
  zoomPasscode?: string;
}

export interface Course {
  id: string;
  code: string; // e.g. "IT 201"
  title: string; // e.g. "Data Communication & Networking"
  instructor: string;
  email?: string;
  officeHours?: string;
  schedule?: string; // e.g. "Mon, Wed 10:00 AM - 11:30 AM"
  roomOrLink?: string;
  zoomLink?: string;
  moodleCourseId?: string;
  credits: number;
  color: string; // hex or Tailwind color
  term: string; // e.g. "Semester 1 (Fall 2026)"
  targetGrade?: number; // target % e.g. 85
  gradeComponents: GradeComponent[];
  syllabus: SyllabusModule[];
  resources: CourseResource[];
  notes?: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  type: AssignmentType;
  priority: PriorityLevel;
  dueDate: string; // YYYY-MM-DDTHH:mm
  status: AssignmentStatus;
  weight?: number; // percentage in course
  score?: number;
  maxScore?: number;
  submissionLink?: string;
  notes?: string;
}

export interface StudySession {
  id: string;
  courseId: string;
  topic: string;
  durationMinutes: number;
  timestamp: string;
}

export interface UserProfile {
  studentName: string;
  program: string;
  institution: string;
  academicYear: string;
  currentTerm: string;
  targetGpa: number;
}
