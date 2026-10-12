import React, { useState, useEffect } from 'react';
import { X, Calendar, BookOpen, Tag, AlertCircle } from 'lucide-react';
import { Assignment, Course, AssignmentType, PriorityLevel, AssignmentStatus } from '../types';

interface AssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (assignment: Assignment) => void;
  courses: Course[];
  initialData?: Assignment | null;
}

export const AssignmentModal: React.FC<AssignmentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  courses,
  initialData,
}) => {
  const [courseId, setCourseId] = useState<string>(courses[0]?.id || '');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<AssignmentType>('lab');
  const [priority, setPriority] = useState<PriorityLevel>('medium');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState<AssignmentStatus>('not_started');
  const [weight, setWeight] = useState<number | ''>('');
  const [score, setScore] = useState<number | ''>('');
  const [maxScore, setMaxScore] = useState<number>(100);
  const [submissionLink, setSubmissionLink] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialData) {
      setCourseId(initialData.courseId);
      setTitle(initialData.title);
      setDescription(initialData.description || '');
      setType(initialData.type);
      setPriority(initialData.priority);
      setDueDate(initialData.dueDate ? initialData.dueDate.slice(0, 16) : '');
      setStatus(initialData.status);
      setWeight(initialData.weight ?? '');
      setScore(initialData.score ?? '');
      setMaxScore(initialData.maxScore || 100);
      setSubmissionLink(initialData.submissionLink || '');
      setNotes(initialData.notes || '');
    } else {
      // Default: 3 days from now at 23:59
      const defaultDue = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
      defaultDue.setHours(23, 59, 0, 0);
      setCourseId(courses[0]?.id || '');
      setTitle('');
      setDescription('');
      setType('lab');
      setPriority('medium');
      setDueDate(defaultDue.toISOString().slice(0, 16));
      setStatus('not_started');
      setWeight('');
      setScore('');
      setMaxScore(100);
      setSubmissionLink('');
      setNotes('');
    }
  }, [initialData, isOpen, courses]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !courseId) return;

    const assignment: Assignment = {
      id: initialData ? initialData.id : `asg-${Date.now()}`,
      courseId,
      title: title.trim(),
      description: description.trim() || undefined,
      type,
      priority,
      dueDate: dueDate || new Date().toISOString().slice(0, 16),
      status,
      weight: typeof weight === 'number' ? weight : undefined,
      score: typeof score === 'number' ? score : undefined,
      maxScore: Number(maxScore) || 100,
      submissionLink: submissionLink.trim() || undefined,
      notes: notes.trim() || undefined,
    };

    onSave(assignment);
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
          <span>{initialData ? 'Edit Assignment' : 'Add New Task / Assignment'}</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Course Selection */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Subject / Course *</label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              required
            >
              {courses.map(c => (
                <option key={c.id} value={c.id}>
                  {c.code} - {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Lab 3: Packet Tracer Router Configuration"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Description / Instructions</label>
            <textarea
              rows={2}
              placeholder="Key deliverables, required file formats, or grading notes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          {/* 3-Column: Type, Priority, Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as AssignmentType)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="cat">CAT (Continuous Assessment)</option>
                <option value="lab">Lab</option>
                <option value="project">Project</option>
                <option value="quiz">Quiz</option>
                <option value="exam">Exam</option>
                <option value="homework">Homework</option>
                <option value="reading">Reading</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as AssignmentStatus)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="not_started">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="submitted">Submitted</option>
                <option value="graded">Graded</option>
              </select>
            </div>
          </div>

          {/* Due Date & Weight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Due Date & Time *</label>
              <input
                type="datetime-local"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Grade Weight (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="e.g. 10 (for 10%)"
                value={weight}
                onChange={(e) => setWeight(e.target.value === '' ? '' : parseFloat(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Score fields (if graded) */}
          {status === 'graded' && (
            <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Received Score</label>
                <input
                  type="number"
                  placeholder="e.g. 95"
                  value={score}
                  onChange={(e) => setScore(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Max Score</label>
                <input
                  type="number"
                  value={maxScore}
                  onChange={(e) => setMaxScore(parseFloat(e.target.value) || 100)}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>
            </div>
          )}

          {/* Submission URL */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">LMS / Moodle / Canvas URL</label>
            <input
              type="url"
              placeholder="https://moodle.university.edu/..."
              value={submissionLink}
              onChange={(e) => setSubmissionLink(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Notes / Tips */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Personal Reminder / Tips</label>
            <input
              type="text"
              placeholder="e.g. Remember to format as PDF and export terminal logs"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
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
              {initialData ? 'Save Changes' : 'Create Assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
