import React, { useState, useMemo } from 'react';
import {
  Youtube,
  Play,
  ExternalLink,
  CheckCircle2,
  Circle,
  BookOpen,
  Sparkles,
  Calendar,
  X,
} from 'lucide-react';
import {
  STUDY_VIDEOS,
  StudyVideo,
  getWatchedVideoIds,
  saveWatchedVideoIds,
} from '../data/videoLibrary';
import confetti from 'canvas-confetti';

interface VideoStudyVaultViewProps {
  onSelectCourse: (courseId: string) => void;
}

const UNIT_FILTERS = [
  { code: 'ALL', label: 'All 6 Units' },
  { code: 'STU 1201', label: '1 · STU 1201 (C Prog)' },
  { code: 'CUU 1202', label: '2 · CUU 1202 (Critical Thinking)' },
  { code: 'CUU 2102', label: '3 · CUU 2102 (Info Literacy)' },
  { code: 'STU 1202', label: '4 · STU 1202 (Web Design)' },
  { code: 'STU 2102', label: '5 · STU 2102 (Research)' },
  { code: 'CPP 2104', label: '6 · CPP 2104 (OOP & UML)' },
];

export const VideoStudyVaultView: React.FC<VideoStudyVaultViewProps> = ({ onSelectCourse }) => {
  const [selectedUnit, setSelectedUnit] = useState<string>('ALL');
  const [watchedIds, setWatchedIds] = useState<string[]>(() => getWatchedVideoIds());
  const [activeVideo, setActiveVideo] = useState<StudyVideo | null>(null);

  const filteredVideos = useMemo(() => {
    if (selectedUnit === 'ALL') return STUDY_VIDEOS;
    return STUDY_VIDEOS.filter(v => v.courseCode === selectedUnit);
  }, [selectedUnit]);

  const watchedPercent = Math.round((watchedIds.length / STUDY_VIDEOS.length) * 100);

  const toggleWatched = (videoId: string) => {
    setWatchedIds(prev => {
      const exists = prev.includes(videoId);
      const next = exists ? prev.filter(id => id !== videoId) : [...prev, videoId];
      if (!exists) {
        confetti({
          particleCount: 25,
          spread: 45,
          origin: { y: 0.75 },
          colors: ['#ef4444', '#f59e0b', '#10b981'],
        });
      }
      saveWatchedVideoIds(next);
      return next;
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-red-950/45 to-slate-900 border border-red-500/25 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-red-500/20 text-red-300 border border-red-500/35 flex items-center gap-1.5">
                <Youtube className="w-3.5 h-3.5 text-red-400" />
                Distraction-Free YouTube Study Vault
              </span>
              <span className="text-xs text-slate-300 font-medium">
                {STUDY_VIDEOS.length} Verified Exam-Aligned Tutorials
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Curated YouTube Video Playlists for All 6 Units
            </h1>
            <p className="text-sm text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
              Hand-picked tutorials from <strong>freeCodeCamp</strong>, <strong>Bro Code</strong>, <strong>Scribbr</strong>, <strong>Lucid Software</strong>, <strong>CrashCourse</strong>, and <strong>Wireless Philosophy</strong>—mapped directly to your 23-day revision sprint. Watch right here inside Study Hub without getting pulled into YouTube rabbit holes!
            </p>
          </div>

          {/* Watched Progress Card */}
          <div className="p-5 rounded-xl bg-slate-950/85 border border-red-500/30 max-w-xs w-full shadow-lg">
            <div className="text-xs font-bold text-red-300 uppercase tracking-wider mb-1.5">
              Video Mastery Tracker
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{watchedPercent}%</span>
              <span className="text-xs text-slate-400">
                ({watchedIds.length}/{STUDY_VIDEOS.length} watched)
              </span>
            </div>
            <div className="mt-3 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-red-500 to-amber-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${watchedPercent}%` }}
              />
            </div>
            <p className="mt-3 text-[11px] text-slate-400">
              Tip: Watch at <strong>1.25x–1.5x</strong> speed while taking handwritten notes on paper!
            </p>
          </div>
        </div>
      </div>

      {/* Inline Active Video Player Modal/Theatre */}
      {activeVideo && (
        <div className="rounded-2xl bg-slate-950 border border-red-500/40 overflow-hidden shadow-2xl">
          <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs mb-0.5">
                <span
                  className="font-extrabold px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: `${activeVideo.color}20`,
                    color: activeVideo.color,
                    border: `1px solid ${activeVideo.color}40`,
                  }}
                >
                  {activeVideo.courseCode}
                </span>
                <span className="text-slate-400">{activeVideo.channel}</span>
                <span className="text-amber-300 font-semibold">• {activeVideo.sprintWindow}</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white truncate">
                {activeVideo.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => toggleWatched(activeVideo.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all ${
                  watchedIds.includes(activeVideo.id)
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-800 hover:bg-emerald-600/20 text-slate-200 border-slate-700'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{watchedIds.includes(activeVideo.id) ? 'Watched' : 'Mark Watched'}</span>
              </button>
              <a
                href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                title="Open on YouTube"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                title="Close player"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative w-full aspect-video bg-black">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="px-5 py-3 bg-slate-900/90 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <strong>Exam Focus:</strong> {activeVideo.whyWatch}
            </span>
            <button
              onClick={() => onSelectCourse(activeVideo.courseId)}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Open {activeVideo.courseCode} Notes</span>
            </button>
          </div>
        </div>
      )}

      {/* Unit Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {UNIT_FILTERS.map(unit => (
          <button
            key={unit.code}
            onClick={() => setSelectedUnit(unit.code)}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              selectedUnit === unit.code
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {unit.label}
          </button>
        ))}
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVideos.map(video => {
          const isWatched = watchedIds.includes(video.id);
          const isPlaying = activeVideo?.id === video.id;
          const thumbUrl = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

          return (
            <div
              key={video.id}
              className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all ${
                isPlaying
                  ? 'bg-slate-900 border-red-500/60 ring-1 ring-red-500/40 shadow-lg shadow-red-500/10'
                  : isWatched
                  ? 'bg-slate-900/50 border-emerald-500/25 opacity-85'
                  : 'bg-slate-900/75 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div>
                {/* Thumbnail with Play Overlay */}
                <div
                  onClick={() => setActiveVideo(video)}
                  className="relative aspect-video bg-slate-950 cursor-pointer group overflow-hidden"
                >
                  <img
                    src={thumbUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-950/35 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-600/95 group-hover:bg-red-500 text-white flex items-center justify-center shadow-xl shadow-black/50 group-hover:scale-110 transition-all">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                  <span
                    className="absolute top-2.5 left-2.5 text-[10px] font-extrabold px-2 py-0.5 rounded-md backdrop-blur-md"
                    style={{
                      backgroundColor: 'rgba(2, 6, 23, 0.85)',
                      color: video.color,
                      border: `1px solid ${video.color}60`,
                    }}
                  >
                    Exam #{video.examOrder} · {video.courseCode}
                  </span>
                  {isWatched && (
                    <span className="absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600/90 text-white flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Watched
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-4 space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="font-semibold text-slate-300 truncate">{video.channel}</span>
                    <span className="text-amber-300 font-medium flex items-center gap-1 shrink-0">
                      <Calendar className="w-3 h-3" />
                      {video.sprintWindow}
                    </span>
                  </div>

                  <h3
                    onClick={() => setActiveVideo(video)}
                    className="cursor-pointer text-sm font-bold text-white hover:text-red-300 leading-snug transition-colors"
                  >
                    {video.title}
                  </h3>

                  <div className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-sky-300 border border-slate-700">
                    {video.focusTag}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">{video.whyWatch}</p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="px-4 py-3 border-t border-slate-800/80 flex items-center gap-2 bg-slate-950/40">
                <button
                  onClick={() => setActiveVideo(video)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isPlaying ? 'Playing' : 'Watch Here'}</span>
                </button>

                <button
                  onClick={() => toggleWatched(video.id)}
                  className={`p-2 rounded-lg border transition-colors ${
                    isWatched
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  }`}
                  title={isWatched ? 'Mark unwatched' : 'Mark as watched'}
                >
                  {isWatched ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                </button>

                <a
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                  title="Open on YouTube"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={() => onSelectCourse(video.courseId)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                  title={`Open ${video.courseCode} Study Guides`}
                >
                  <BookOpen className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
