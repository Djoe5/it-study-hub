import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  FileText, 
  Presentation, 
  Sparkles, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Globe,
  Code,
  Lightbulb,
  Target,
  AlertTriangle,
  FileCode2,
  Check
} from 'lucide-react';
import { Course, SyllabusModule, CourseResource } from '../types';
import confetti from 'canvas-confetti';
import { SMART_STUDY_GUIDES, SmartLectureGuide } from '../data/smartStudyNotes';

interface StudyReadingRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  module?: SyllabusModule;
  resource?: CourseResource;
  onCompleteStudy: (params: { timeSpentMinutes: number; notes: string }) => void;
}

export const StudyReadingRoomModal: React.FC<StudyReadingRoomModalProps> = ({
  isOpen,
  onClose,
  course,
  module,
  resource,
  onCompleteStudy,
}) => {
  // Course Guides
  const courseGuides: SmartLectureGuide[] = SMART_STUDY_GUIDES[course.code] || [];
  
  // Find initial guide index
  const determineInitialGuideIndex = (): number => {
    if (courseGuides.length === 0) return 0;
    
    const targetWeek = resource?.week || module?.week;
    const targetTitle = (resource?.title || module?.title || '').toLowerCase();

    const byWeek = courseGuides.findIndex(g => g.lectureNumber === targetWeek);
    if (byWeek >= 0) return byWeek;

    const byTitle = courseGuides.findIndex(g => 
      targetTitle.includes(`lecture ${g.lectureNumber}`) ||
      targetTitle.includes(`lesson ${g.lectureNumber}`) ||
      targetTitle.includes(`unit ${g.lectureNumber}`) ||
      targetTitle.includes(g.title.toLowerCase().slice(0, 15))
    );
    if (byTitle >= 0) return byTitle;

    return 0;
  };

  const [currentGuideIndex, setCurrentGuideIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'summary' | 'industry' | 'code' | 'exam' | 'raw'>('summary');
  
  // Target duration in minutes
  const initialMinutes = module?.targetStudyMinutes || (resource?.category === 'slides' ? 25 : 20);
  const [targetMinutes, setTargetMinutes] = useState<number>(initialMinutes);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(initialMinutes * 60);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [studyNotes, setStudyNotes] = useState<string>(module?.studyNotes || '');
  const [allowEarlyUnlock, setAllowEarlyUnlock] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Play acoustic completion chime
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.15 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.15);
        osc.stop(ctx.currentTime + idx * 0.15 + 0.6);
      });
    } catch (e) {
      console.warn('Audio not supported', e);
    }
  };

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      const idx = determineInitialGuideIndex();
      setCurrentGuideIndex(idx);
      setActiveTab('summary');
      const mins = courseGuides[idx]?.estimatedReadTimeMinutes || module?.targetStudyMinutes || 25;
      setTargetMinutes(mins);
      setSecondsRemaining(mins * 60);
      setIsActive(true);
      setAllowEarlyUnlock(false);
      setStudyNotes(module?.studyNotes || '');
    }
  }, [isOpen, module, resource, course.code]);

  // Tick timer
  useEffect(() => {
    if (isActive && secondsRemaining > 0) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            playChime();
            confetti({
              particleCount: 75,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#10b981', '#6366f1', '#f59e0b']
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, secondsRemaining, soundEnabled]);

  if (!isOpen) return null;

  const currentGuide: SmartLectureGuide | undefined = courseGuides[currentGuideIndex];

  const totalSeconds = targetMinutes * 60;
  const elapsedSeconds = totalSeconds - secondsRemaining;
  const progressPercent = Math.min(100, Math.round((elapsedSeconds / totalSeconds) * 100));

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isUnlocked = secondsRemaining === 0 || allowEarlyUnlock;

  const handleFinishAndCover = () => {
    const elapsedMins = Math.max(1, Math.round(elapsedSeconds / 60));
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#10b981', '#3b82f6', '#ec4899', '#f59e0b']
    });
    onCompleteStudy({
      timeSpentMinutes: elapsedMins,
      notes: studyNotes,
    });
    onClose();
  };

  const materialTitle = currentGuide?.title || resource?.title || module?.title || 'Course Lecture';
  const rawDownloadUrl = currentGuide?.downloadUrl || resource?.url;
  const rawFileName = currentGuide?.originalFileName || resource?.title;
  const isPdf = rawDownloadUrl?.toLowerCase().endsWith('.pdf') || resource?.fileType === 'pdf';

  const copyCodeToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-5xl rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-2xl relative max-h-[96vh] flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/90 gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {course.code}
                </span>
                <span className="text-xs text-slate-400">• Smart AI Study Guide</span>
                {currentGuide && (
                  <span className="text-[11px] text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {currentGuide.estimatedReadTimeMinutes}m Read
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight line-clamp-1 mt-0.5">
                {materialTitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            {/* Guide Quick Dropdown & Prev/Next Switcher */}
            {courseGuides.length > 1 && (
              <div className="flex items-center gap-1.5 bg-slate-800/90 px-2 py-1 rounded-xl border border-slate-700 text-xs">
                <button
                  type="button"
                  disabled={currentGuideIndex === 0}
                  onClick={() => setCurrentGuideIndex(prev => Math.max(0, prev - 1))}
                  className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                  title="Previous Lecture"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <select
                  value={currentGuideIndex}
                  onChange={(e) => setCurrentGuideIndex(Number(e.target.value))}
                  className="bg-slate-900 text-slate-200 text-xs font-medium py-1 px-2 rounded-lg border border-slate-700 focus:outline-none focus:border-indigo-500 max-w-[180px] sm:max-w-[240px] truncate cursor-pointer"
                  title="Select Lecture Guide"
                >
                  {courseGuides.map((g, idx) => (
                    <option key={g.id} value={idx}>
                      Lec {g.lectureNumber}: {g.title.replace(/^Lecture \d+:? |^Lesson \d+:? |^Unit \d+:? /i, '')}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  disabled={currentGuideIndex === courseGuides.length - 1}
                  onClick={() => setCurrentGuideIndex(prev => Math.min(courseGuides.length - 1, prev + 1))}
                  className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                  title="Next Lecture"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Mute chime" : "Enable chime"}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Compact Countdown Bar */}
        <div className="px-5 py-3 bg-slate-950/60 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="text-xl sm:text-2xl font-extrabold font-mono text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>
            <div className="w-24 sm:w-36 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              {secondsRemaining > 0 ? `${progressPercent}% Focus Complete` : '🎉 Session Complete!'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsActive(!isActive)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isActive 
                  ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40 hover:bg-amber-600/40' 
                  : 'bg-emerald-600 text-white hover:bg-emerald-500'
              }`}
            >
              {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isActive ? 'Pause' : 'Resume'}</span>
            </button>

            <button
              onClick={() => {
                setSecondsRemaining(targetMinutes * 60);
                setIsActive(true);
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              title="Restart Timer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleFinishAndCover}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all ml-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark as Covered</span>
            </button>
          </div>
        </div>

        {/* Study Navigation Tabs */}
        <div className="px-5 pt-3 bg-slate-900 border-b border-slate-800 flex items-center gap-1 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('summary')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-t-xl text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'summary'
                ? 'border-indigo-500 text-white bg-slate-800/80'
                : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Smart Summary & Highlights</span>
          </button>

          <button
            onClick={() => setActiveTab('industry')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-t-xl text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'industry'
                ? 'border-indigo-500 text-white bg-slate-800/80'
                : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Globe className="w-4 h-4 text-sky-400" />
            <span>Real-World & Industry Usage</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-t-xl text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'code'
                ? 'border-indigo-500 text-white bg-slate-800/80'
                : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Code className="w-4 h-4 text-emerald-400" />
            <span>Code & Practical Walkthrough</span>
          </button>

          <button
            onClick={() => setActiveTab('exam')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-t-xl text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'exam'
                ? 'border-indigo-500 text-white bg-slate-800/80'
                : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Target className="w-4 h-4 text-rose-400" />
            <span>Exam Secrets & Traps</span>
          </button>

          <button
            onClick={() => setActiveTab('raw')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-t-xl text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'raw'
                ? 'border-indigo-500 text-white bg-slate-800/80'
                : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span>Original Raw File</span>
          </button>
        </div>

        {/* Scrollable Main Reader Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* TAB 1: SMART SUMMARY & HIGHLIGHTS */}
          {activeTab === 'summary' && currentGuide && (
            <div className="space-y-6 animate-fadeIn">
              {/* Executive Summary Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-950/30 border border-indigo-500/30 space-y-2">
                <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Executive Summary</span>
                </div>
                <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                  {currentGuide.executiveSummary}
                </p>
              </div>

              {/* Core Concept Highlights */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <span>Core Academic Concepts</span>
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  {currentGuide.coreHighlights.map((block, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5 hover:border-indigo-500/30 transition-colors"
                    >
                      <h4 className="text-sm font-bold text-indigo-300">{block.heading}</h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                        {block.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                            <span className="leading-relaxed">{pt}</span>
                          </li>
                        ))}
                      </ul>

                      {block.callout && (
                        <div className={`mt-3 p-3 rounded-lg text-xs flex items-start gap-2.5 border ${
                          block.callout.type === 'insight' 
                            ? 'bg-indigo-950/40 text-indigo-200 border-indigo-500/30' 
                            : 'bg-amber-950/40 text-amber-200 border-amber-500/30'
                        }`}>
                          <Lightbulb className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                          <span className="leading-relaxed">{block.callout.text}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Terms Glossary */}
              {currentGuide.keyTermsGlossary && currentGuide.keyTermsGlossary.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Target className="w-4 h-4 text-emerald-400" />
                    <span>Essential Glossary & Flashcards</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentGuide.keyTermsGlossary.map((item, gIdx) => (
                      <div key={gIdx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <div className="text-xs font-bold text-emerald-400">{item.term}</div>
                        <p className="text-xs text-slate-300 leading-relaxed">{item.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: REAL-WORLD & INDUSTRY USAGE */}
          {activeTab === 'industry' && currentGuide && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/30 flex items-start gap-3">
                <Globe className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Why This Matters in the Tech Industry</h4>
                  <p className="text-xs text-sky-200/80 mt-1">
                    Universities teach theory; top companies look for applied mastery. Here is how this lecture directly powers production engineering.
                  </p>
                </div>
              </div>

              {/* Big Tech & Industry Context */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                  <span>🏢 Enterprise & Tech Giants Architecture</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {currentGuide.realWorldApplication.industryContext}
                </p>
              </div>

              {/* Career Relevance */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <span>💼 Your Career & Technical Interviews</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {currentGuide.realWorldApplication.careerRelevance}
                </p>
              </div>

              {/* Concrete Scenario / Case Study */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-indigo-500/30 space-y-2">
                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                  <span>🚀 Concrete Case Study</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {currentGuide.realWorldApplication.concreteExample}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: CODE & PRACTICAL WALKTHROUGH */}
          {activeTab === 'code' && currentGuide && (
            <div className="space-y-5 animate-fadeIn">
              {currentGuide.practicalExamples && currentGuide.practicalExamples.length > 0 ? (
                currentGuide.practicalExamples.map((ex, eIdx) => (
                  <div key={eIdx} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden space-y-3">
                    <div className="flex items-center justify-between p-4 bg-slate-900/90 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <FileCode2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-white">{ex.title}</span>
                      </div>
                      {ex.codeOrDiagram && (
                        <button
                          onClick={() => copyCodeToClipboard(ex.codeOrDiagram!)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 hover:text-white transition-all"
                        >
                          {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : null}
                          <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                        </button>
                      )}
                    </div>

                    {ex.codeOrDiagram && (
                      <div className="p-4 overflow-x-auto">
                        <pre className="text-xs sm:text-sm font-mono text-emerald-300/90 bg-slate-950 p-4 rounded-xl border border-slate-800/80 leading-relaxed overflow-x-auto">
                          <code>{ex.codeOrDiagram}</code>
                        </pre>
                      </div>
                    )}

                    <div className="px-4 pb-4">
                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                        {ex.explanation}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <Code className="w-8 h-8 text-slate-600 mx-auto" />
                  <h4 className="text-sm font-bold text-white">Conceptual & Methodological Unit</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    This module focuses on architecture, research paradigms, and critical logic principles rather than raw syntax. Review the Smart Summary and Real-World tabs for full synthesis!
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: EXAM SECRETS & PITFALLS */}
          {activeTab === 'exam' && currentGuide && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Examiner Traps & High-Yield Questions</h4>
                  <p className="text-xs text-rose-200/80 mt-1">
                    Lecturers deliberately design CATs and Final Exams to test these common misconceptions. Study these solutions to secure top grades.
                  </p>
                </div>
              </div>

              {currentGuide.examPitfallsAndTricks && currentGuide.examPitfallsAndTricks.length > 0 ? (
                currentGuide.examPitfallsAndTricks.map((item, pIdx) => (
                  <div key={pIdx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-start gap-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase">
                        Common Trap
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-rose-200">{item.trap}</h4>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs sm:text-sm text-emerald-200 leading-relaxed">
                      <span className="font-bold text-emerald-300">Correct Approach: </span>
                      {item.correctApproach}
                    </div>

                    {item.sampleQuestion && (
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                        <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                          Sample Exam Question:
                        </span>
                        <p className="font-medium text-white mt-0.5">{item.sampleQuestion}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-8 text-center rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <Target className="w-8 h-8 text-slate-600 mx-auto" />
                  <h4 className="text-sm font-bold text-white">General Review Unit</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Focus on the core concepts, real-world context, and glossary flashcards in the Smart Summary tab to master this module for exams.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: ORIGINAL RAW FILE */}
          {activeTab === 'raw' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                    {isPdf ? <FileText className="w-6 h-6" /> : <Presentation className="w-6 h-6" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{rawFileName || materialTitle}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Direct download of the lecturer's original uploaded document.
                    </p>
                  </div>
                </div>

                {rawDownloadUrl && (
                  <div className="flex items-center gap-2">
                    <a
                      href={rawDownloadUrl}
                      download
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all whitespace-nowrap"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download File</span>
                    </a>
                    <a
                      href={rawDownloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all whitespace-nowrap"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Open in Browser</span>
                    </a>
                  </div>
                )}
              </div>

              {/* In-App PDF view if it is a PDF */}
              {isPdf && rawDownloadUrl && (
                <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950 h-[480px]">
                  <iframe
                    src={`${rawDownloadUrl}#toolbar=1`}
                    className="w-full h-full border-0"
                    title={materialTitle}
                  />
                </div>
              )}
            </div>
          )}

          {/* Active Recall / Takeaway Notes Pad */}
          <div className="pt-4 border-t border-slate-800">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>My Active Recall Notes (Saved Automatically)</span>
                </label>
                <span className="text-[10px] text-slate-500">Writing in your own words boosts retention</span>
              </div>
              <textarea
                rows={3}
                value={studyNotes}
                onChange={(e) => setStudyNotes(e.target.value)}
                placeholder="Write your key takeaways or memory cues from this session..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
