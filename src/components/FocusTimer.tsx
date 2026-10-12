import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Timer, 
  Flame, 
  CheckCircle2, 
  Award, 
  BookOpen, 
  Clock 
} from 'lucide-react';
import { Course, StudySession } from '../types';
import confetti from 'canvas-confetti';

interface FocusTimerProps {
  courses: Course[];
  sessions: StudySession[];
  onAddSession: (session: StudySession) => void;
}

type TimerMode = 'pomodoro' | 'deep_work' | 'short_break' | 'long_break';

const TIMER_CONFIGS: Record<TimerMode, { label: string; minutes: number }> = {
  pomodoro: { label: 'Pomodoro (25m)', minutes: 25 },
  deep_work: { label: 'Deep Work (50m)', minutes: 50 },
  short_break: { label: 'Short Break (5m)', minutes: 5 },
  long_break: { label: 'Long Break (15m)', minutes: 15 },
};

export const FocusTimer: React.FC<FocusTimerProps> = ({
  courses,
  sessions,
  onAddSession,
}) => {
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || '');
  const [topic, setTopic] = useState<string>('');
  
  const timerRef = useRef<number | null>(null);

  // Play synthetic chime using Web Audio API
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch (e) {
      console.log('Audio not allowed yet by user gesture', e);
    }
  };

  // Timer countdown
  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const handleComplete = () => {
    setIsRunning(false);
    playChime();
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });

    // If it was a focus session (pomodoro or deep work), log it
    if (mode === 'pomodoro' || mode === 'deep_work') {
      const duration = TIMER_CONFIGS[mode].minutes;
      const course = courses.find(c => c.id === selectedCourseId);
      
      const newSession: StudySession = {
        id: `sess-${Date.now()}`,
        courseId: selectedCourseId,
        topic: topic.trim() || `${course?.code || 'IT'} Focus Block`,
        durationMinutes: duration,
        timestamp: new Date().toISOString(),
      };

      onAddSession(newSession);
    }
  };

  const switchMode = (newMode: TimerMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(TIMER_CONFIGS[newMode].minutes * 60);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(TIMER_CONFIGS[mode].minutes * 60);
  };

  // Format time
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const currentCourse = courses.find(c => c.id === selectedCourseId);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">Focus & Pomodoro Timer</h1>
        <p className="text-xs text-slate-400">
          Block out distractions, study your IT concepts in focused intervals, and log your hours.
        </p>
      </div>

      {/* Main Timer Card */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-8 shadow-2xl relative overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Mode Selector */}
        <div className="inline-flex p-1 rounded-xl bg-slate-950 border border-slate-800 mb-8 max-w-full overflow-x-auto">
          {(Object.keys(TIMER_CONFIGS) as TimerMode[]).map(m => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                mode === m
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {TIMER_CONFIGS[m].label}
            </button>
          ))}
        </div>

        {/* Big Countdown Display */}
        <div className="my-6">
          <span className="font-mono text-7xl sm:text-8xl font-black tracking-tight text-white select-none">
            {timeFormatted}
          </span>
          <p className="text-xs text-indigo-400 font-semibold tracking-wider uppercase mt-2">
            {mode === 'short_break' || mode === 'long_break' ? '☕ Resting Period' : '⚡ Deep Focus Mode'}
          </p>
        </div>

        {/* Course & Topic Linking */}
        {(mode === 'pomodoro' || mode === 'deep_work') && (
          <div className="max-w-md mx-auto grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-6 text-left">
            <div>
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Linked Course
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                {courses.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.code} - {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Study Topic / Unit
              </label>
              <input
                type="text"
                placeholder="e.g. Subnetting drills"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        )}

        {/* Timer Control Buttons */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold shadow-xl transition-all ${
              isRunning
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>Pause Session</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>Start Focus</span>
              </>
            )}
          </button>

          <button
            onClick={resetTimer}
            title="Reset timer"
            className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Focus History Logs */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white">Logged Study Sessions</h3>
          </div>
          <span className="text-xs text-slate-400">
            {sessions.length} total logged
          </span>
        </div>

        {sessions.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-500">
            No study sessions logged yet. Complete a Pomodoro session to log your focus hours!
          </div>
        ) : (
          <div className="space-y-2">
            {sessions.slice(-5).reverse().map(sess => {
              const course = courses.find(c => c.id === sess.courseId);

              return (
                <div 
                  key={sess.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span 
                      className="px-2 py-0.5 rounded font-bold text-[10px]"
                      style={{ 
                        backgroundColor: `${course?.color || '#6366f1'}20`, 
                        color: course?.color || '#a5b4fc' 
                      }}
                    >
                      {course?.code || 'Study'}
                    </span>
                    <span className="font-semibold text-slate-200">{sess.topic}</span>
                  </div>

                  <div className="flex items-center gap-4 text-slate-400">
                    <span className="font-medium text-emerald-400">+{sess.durationMinutes} mins</span>
                    <span className="text-[11px] text-slate-500">
                      {new Date(sess.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
