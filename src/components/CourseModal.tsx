import React, { useState } from 'react';
import { X, BookOpen, Plus, Trash2 } from 'lucide-react';
import { Course, SyllabusModule, GradeComponent } from '../types';

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (course: Course) => void;
}

const COLOR_OPTIONS = [
  '#3b82f6', // blue
  '#10b981', // emerald
  '#f59e0b', // amber
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#ef4444', // red
];

export const CourseModal: React.FC<CourseModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [instructor, setInstructor] = useState('');
  const [email, setEmail] = useState('');
  const [schedule, setSchedule] = useState('');
  const [roomOrLink, setRoomOrLink] = useState('');
  const [credits, setCredits] = useState<number>(3);
  const [color, setColor] = useState(COLOR_OPTIONS[0]);
  const [term, setTerm] = useState('Semester 1');
  const [targetGrade, setTargetGrade] = useState<number>(85);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !title.trim()) return;

    // Generate starter syllabus (Weeks 1 to 4)
    const initialSyllabus: SyllabusModule[] = [
      { id: `syl-${Date.now()}-1`, week: 1, title: 'Course Orientation & Fundamentals', topics: ['Syllabus overview', 'Core principles'], completed: false },
      { id: `syl-${Date.now()}-2`, week: 2, title: 'Key Architecture & Concepts', topics: ['Terminology & standards'], completed: false },
      { id: `syl-${Date.now()}-3`, week: 3, title: 'Implementation & Problem Sets', topics: ['Hands-on laboratory work'], completed: false },
      { id: `syl-${Date.now()}-4`, week: 4, title: 'Assessment & Synthesis', topics: ['Case studies & review'], completed: false },
    ];

    const initialGradeComponents: GradeComponent[] = [
      { id: `gc-${Date.now()}-1`, name: 'Coursework & Labs', weight: 30, maxScore: 100 },
      { id: `gc-${Date.now()}-2`, name: 'Midterm Examination', weight: 30, maxScore: 100 },
      { id: `gc-${Date.now()}-3`, name: 'Final Exam', weight: 40, maxScore: 100 },
    ];

    const newCourse: Course = {
      id: `course-${Date.now()}`,
      code: code.trim(),
      title: title.trim(),
      instructor: instructor.trim() || 'Staff Professor',
      email: email.trim() || undefined,
      schedule: schedule.trim() || undefined,
      roomOrLink: roomOrLink.trim() || undefined,
      credits: Number(credits) || 3,
      color,
      term,
      targetGrade: Number(targetGrade) || 85,
      gradeComponents: initialGradeComponents,
      syllabus: initialSyllabus,
      resources: [],
    };

    onSave(newCourse);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <span>Add New Degree Course</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Course Code *</label>
              <input
                type="text"
                required
                placeholder="e.g. IT 305"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Credits</label>
              <input
                type="number"
                min="1"
                max="10"
                value={credits}
                onChange={(e) => setCredits(parseInt(e.target.value) || 3)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Course Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Cloud Computing & Distributed Systems"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Instructor</label>
              <input
                type="text"
                placeholder="e.g. Dr. Alan Turing"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Instructor Email</label>
              <input
                type="email"
                placeholder="prof@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Schedule</label>
              <input
                type="text"
                placeholder="e.g. Mon & Wed 2:00 PM - 3:30 PM"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Room / Zoom Link</label>
              <input
                type="text"
                placeholder="e.g. Computing Lab 4"
                value={roomOrLink}
                onChange={(e) => setRoomOrLink(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Term / Semester</label>
              <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Target Grade (%)</label>
              <input
                type="number"
                min="50"
                max="100"
                value={targetGrade}
                onChange={(e) => setTargetGrade(parseInt(e.target.value) || 85)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Color theme */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Color Accent</label>
            <div className="flex items-center gap-2">
              {COLOR_OPTIONS.map(c => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-6 h-6 rounded-full transition-transform ${
                    color === c ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-900' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/20"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
