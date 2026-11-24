import React, { useState, useMemo, useEffect } from 'react';
import {
  FileSearch,
  ExternalLink,
  Library,
  Sparkles,
  BookOpen,
  ChevronDown,
  ChevronUp,
  KeyRound,
  CheckCircle2,
  Lightbulb,
  Layers,
  ClipboardCheck,
  RotateCcw,
  Shuffle,
  Clock,
  Award,
  Eye,
  EyeOff,
  FileText,
} from 'lucide-react';
import {
  OFFICIAL_KCA_PAST_PAPER_CHANNELS,
  PAST_PAPER_GUIDES,
} from '../data/revisionPlan';
import {
  EXAM_FLASHCARDS,
  EXAM_PRACTICE_BANK,
  RETRIEVED_PAST_PAPERS_CATALOG,
  getMasteredFlashcards,
  saveMasteredFlashcards,
} from '../data/flashcardsData';

interface PastPapersHubViewProps {
  onSelectCourse: (courseId: string) => void;
  initialSubTab?: 'vault' | 'flashcards' | 'practice';
}

type HubSubTab = 'vault' | 'flashcards' | 'practice';
type UnitFilter = 'ALL' | 'STU 1201' | 'CUU 1202' | 'CUU 2102' | 'STU 1202' | 'STU 2102' | 'CPP 2104';

const UNIT_FILTERS: UnitFilter[] = [
  'ALL',
  'STU 1201',
  'CUU 1202',
  'CUU 2102',
  'STU 1202',
  'STU 2102',
  'CPP 2104',
];

export const PastPapersHubView: React.FC<PastPapersHubViewProps> = ({
  onSelectCourse,
  initialSubTab = 'vault',
}) => {
  const [subTab, setSubTab] = useState<HubSubTab>(initialSubTab);

  useEffect(() => {
    setSubTab(initialSubTab);
  }, [initialSubTab]);
  const [unitFilter, setUnitFilter] = useState<UnitFilter>('ALL');
  const [expandedMockIds, setExpandedMockIds] = useState<string[]>(['kcau-33500']);

  // Flashcards state
  const [masteredIds, setMasteredIds] = useState<string[]>(() => getMasteredFlashcards());
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});
  const [shuffleSeed, setShuffleSeed] = useState<number>(0);
  const [onlyUnmastered, setOnlyUnmastered] = useState<boolean>(false);

  // Practice Qs reveal state
  const [revealedAnswerIds, setRevealedAnswerIds] = useState<Record<string, boolean>>({});

  const toggleMock = (courseId: string) => {
    setExpandedMockIds(prev =>
      prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]
    );
  };

  const toggleFlip = (id: string) => {
    setFlippedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMastered = (id: string) => {
    setMasteredIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      saveMasteredFlashcards(next);
      return next;
    });
  };

  const resetFlashcards = () => {
    if (window.confirm('Reset all flashcard mastery checkmarks?')) {
      setMasteredIds([]);
      setFlippedIds({});
      saveMasteredFlashcards([]);
    }
  };

  const filteredFlashcards = useMemo(() => {
    let list = EXAM_FLASHCARDS.filter(c => unitFilter === 'ALL' || c.courseCode === unitFilter);
    if (onlyUnmastered) {
      list = list.filter(c => !masteredIds.includes(c.id));
    }
    if (shuffleSeed > 0) {
      const copy = [...list];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = (i * 17 + shuffleSeed * 31) % (i + 1);
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }
    return list;
  }, [unitFilter, onlyUnmastered, masteredIds, shuffleSeed]);

  const filteredPractice = useMemo(
    () => EXAM_PRACTICE_BANK.filter(q => unitFilter === 'ALL' || q.courseCode === unitFilter),
    [unitFilter]
  );

  const filteredArchive = useMemo(
    () => RETRIEVED_PAST_PAPERS_CATALOG.filter(p => unitFilter === 'ALL' || p.courseCode === unitFilter),
    [unitFilter]
  );

  const masteryPct = Math.round((masteredIds.length / EXAM_FLASHCARDS.length) * 100);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950/45 to-slate-900 border border-amber-500/25 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <FileSearch className="w-3.5 h-3.5 text-amber-400" />
                KCA Past Papers Vault, Flashcards & Mock Rubrics
              </span>
              <span className="text-xs text-emerald-300 font-semibold">
                • 21 Real Papers Indexed · 30 Flashcards · 12 Worked Rubrics
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              KCA Exam Intelligence & Active Recall Command Center
            </h1>
            <p className="text-sm text-slate-300 mt-1.5 max-w-3xl leading-relaxed">
              Every uploaded KCA PDF (<code className="text-amber-300">CUU 2102</code>, <code className="text-amber-300">BIT 2108 / CPP 2201</code>) and verified Masomo Msingi paper (<code className="text-amber-300">BIT 1304 / 1303A</code>, <code className="text-amber-300">BIT 1203</code>, <code className="text-amber-300">BIT 2301</code>) distilled into spaced-repetition flashcards, model answers, and direct links.
            </p>
          </div>

          {/* Mastery Metric Pill */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 min-w-[210px] shrink-0">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-amber-300">Flashcard Mastery</span>
              <span className="font-extrabold text-white">{masteryPct}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-1.5">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
                style={{ width: `${masteryPct}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-400">
              {masteredIds.length} / {EXAM_FLASHCARDS.length} high-yield cards locked in
            </div>
          </div>
        </div>
      </div>

      {/* Sub-tab switcher + Unit Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="inline-flex flex-wrap p-1 rounded-xl bg-slate-900 border border-slate-800 gap-1">
          <button
            type="button"
            onClick={() => setSubTab('vault')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              subTab === 'vault'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Past Papers Vault ({RETRIEVED_PAST_PAPERS_CATALOG.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab('flashcards')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              subTab === 'flashcards'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>30 Exam Flashcards</span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab('practice')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              subTab === 'practice'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>12 Worked Qs & Rubrics</span>
          </button>
        </div>

        {/* Unit Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {UNIT_FILTERS.map(u => (
            <button
              key={u}
              type="button"
              onClick={() => setUnitFilter(u)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                unitFilter === u
                  ? 'bg-indigo-500/20 text-indigo-200 border-indigo-500/50'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      {/* ==================== TAB 1: PAST PAPER VAULT & FINDER ==================== */}
      {subTab === 'vault' && (
        <div className="space-y-6">
          {/* Curated 21-Paper Authoritative Archive Table */}
          <div className="rounded-2xl bg-slate-900/75 border border-slate-800 overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm sm:text-base font-bold text-white">
                  Verified Authoritative KCA Past Paper Archive ({filteredArchive.length} Papers)
                </h2>
              </div>
              <span className="text-[11px] text-slate-400">
                Primary References cited across Summary Notes & Flashcards
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-950/70 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <th className="py-2.5 px-4">Paper ID</th>
                    <th className="py-2.5 px-3">Unit</th>
                    <th className="py-2.5 px-3">Examination Title & Session</th>
                    <th className="py-2.5 px-3">Key Tested Topics</th>
                    <th className="py-2.5 px-4 text-right">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {filteredArchive.map(p => (
                    <tr key={p.paperId} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono font-bold text-[11px]">
                          {p.paperId}
                        </span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-bold text-amber-300">
                        {p.courseCode}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-white">{p.title}</div>
                        <div className="text-[11px] text-slate-400">{p.session}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-300 max-w-md leading-relaxed">
                        {p.keyQuestions}
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        {p.url ? (
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold transition-all"
                          >
                            <span>{p.source}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="inline-block px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700 text-[11px] font-semibold">
                            {p.source}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Official KCA University Channels */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Library className="w-4 h-4 text-amber-400" />
              <h2 className="text-base font-bold text-white">
                Official KCA University Past Paper Portals (Student Login)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {OFFICIAL_KCA_PAST_PAPER_CHANNELS.map(channel => (
                <div
                  key={channel.name}
                  className="rounded-xl bg-slate-900/75 border border-slate-800 hover:border-amber-500/40 p-5 flex flex-col justify-between transition-all"
                >
                  <div>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 mb-2">
                      {channel.badge}
                    </span>
                    <h3 className="text-sm font-bold text-white mb-1.5">{channel.name}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">{channel.steps}</p>
                  </div>
                  <a
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-amber-600 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 hover:border-amber-500 transition-all"
                  >
                    <span>Open Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tip: Legacy Code Strategy */}
          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-start gap-3">
            <KeyRound className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs text-indigo-100/90 leading-relaxed">
              <strong className="text-indigo-300 text-sm block mb-0.5">
                Legacy Code Hack Verified Against Real Papers!
              </strong>
              Search <strong>BIT 1304 / BIT 1303A</strong> for STU 1201, <strong>BIT 1203</strong> for STU 1202, <strong>BIT 2301</strong> for STU 2102, <strong>BIT 2108 / BAC 2101 / CPP 2201</strong> for CPP 2104, and <strong>CUU 2101 / KCAU 001</strong> for CUU 2102.
            </div>
          </div>

          {/* Unit-by-Unit Search Launchers & High-Yield Model Questions */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h2 className="text-base font-bold text-white">
                Unit-by-Unit 1-Click Search Launchers & KCA Mock Drills (By Exam Order)
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {PAST_PAPER_GUIDES.filter(u => unitFilter === 'ALL' || u.code === unitFilter).map((unit, index) => {
                const isExpanded = expandedMockIds.includes(unit.courseId);

                return (
                  <div
                    key={unit.courseId}
                    className="rounded-2xl bg-slate-900/75 border border-slate-800/90 p-5 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/35">
                              Exam #{index + 1} · {unit.code}
                            </span>
                            <span className="text-[11px] text-slate-400">{unit.examDate}</span>
                          </div>
                          <h3 className="text-base font-bold text-white">{unit.title}</h3>
                          <p className="text-xs text-slate-400 mt-0.5">Lecturer: {unit.lecturer}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                        <span className="text-slate-400 font-semibold">Legacy codes:</span>
                        {unit.legacyCodes.map(lc => (
                          <span
                            key={lc}
                            className="px-2 py-0.5 rounded bg-slate-800 text-sky-300 border border-slate-700 font-mono font-bold"
                          >
                            {lc}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {unit.searchLinks.map(link => (
                          <a
                            key={link.platform}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between gap-1.5 px-3 py-2 rounded-lg bg-slate-950/80 hover:bg-indigo-600/20 text-slate-200 hover:text-indigo-200 border border-slate-800 hover:border-indigo-500/40 text-xs font-medium transition-all"
                          >
                            <span className="truncate">{link.platform}</span>
                            <ExternalLink className="w-3 h-3 shrink-0 text-slate-400" />
                          </a>
                        ))}
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-2">
                          Most Frequently Tested KCA Exam Topics
                        </div>
                        <ul className="space-y-1.5">
                          {unit.highYieldTopics.map((topic, i) => (
                            <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-xl border border-slate-800 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => toggleMock(unit.courseId)}
                          className="w-full px-3.5 py-2.5 bg-slate-800/60 hover:bg-slate-800 flex items-center justify-between text-xs font-bold text-amber-300 transition-colors"
                        >
                          <span className="flex items-center gap-1.5">
                            <Lightbulb className="w-3.5 h-3.5" />
                            Real KCA Past Exam Questions ({unit.mockQuestions.length})
                          </span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        {isExpanded && (
                          <div className="p-3.5 bg-slate-950/80 space-y-3 border-t border-slate-800">
                            {unit.mockQuestions.map((mq, idx) => (
                              <div
                                key={idx}
                                className="p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 space-y-1.5"
                              >
                                <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30">
                                  {mq.section}
                                </span>
                                <p className="text-xs text-slate-200 leading-relaxed">{mq.question}</p>
                                <p className="text-[11px] text-emerald-300/90 bg-emerald-500/10 px-2.5 py-1.5 rounded border border-emerald-500/20">
                                  <strong>Examiner Tip:</strong> {mq.tip}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                      <button
                        type="button"
                        onClick={() => onSelectCourse(unit.courseId)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-semibold transition-all"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Open Upgraded Summary Notes</span>
                      </button>
                      <a
                        href={unit.moodleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-all"
                      >
                        <span>Moodle</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 2: 30 EXAM FLASHCARDS ==================== */}
      {subTab === 'flashcards' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/75 border border-slate-800">
            <div className="text-xs text-slate-300">
              <strong className="text-white">Active Recall Protocol:</strong> Say the answer aloud BEFORE flipping. Mark mastered only when you nail it cleanly in under 20 seconds. Revisit on Days 1, 3, 7 & Exam Eve.
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setOnlyUnmastered(v => !v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  onlyUnmastered
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                {onlyUnmastered ? 'Showing Unmastered Only' : 'Show Unmastered Only'}
              </button>
              <button
                type="button"
                onClick={() => setShuffleSeed(s => s + 1)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-200 text-xs font-bold border border-slate-700 transition-all"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Shuffle</span>
              </button>
              <button
                type="button"
                onClick={resetFlashcards}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-600/80 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFlashcards.map(card => {
              const isFlipped = !!flippedIds[card.id];
              const isMastered = masteredIds.includes(card.id);

              return (
                <div
                  key={card.id}
                  className={`rounded-2xl p-5 border transition-all flex flex-col justify-between space-y-4 ${
                    isMastered
                      ? 'bg-emerald-950/20 border-emerald-500/40'
                      : isFlipped
                      ? 'bg-indigo-950/30 border-indigo-500/50'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-extrabold font-mono">
                          CARD #{String(card.number).padStart(2, '0')}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                          {card.courseCode}
                        </span>
                        {card.priority === 'high' && (
                          <span className="px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-300 text-[10px] font-bold">
                            HIGH YIELD
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">{card.paperCitation}</span>
                    </div>

                    <div
                      onClick={() => toggleFlip(card.id)}
                      className="cursor-pointer min-h-[105px] p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/90 hover:border-indigo-500/40 transition-all"
                    >
                      <div className="text-[10px] font-extrabold uppercase tracking-wider mb-1.5 text-slate-400">
                        {isFlipped ? '✅ MODEL ANSWER (BACK)' : '❓ EXAM PROMPT (FRONT — CLICK TO FLIP)'}
                      </div>
                      <p className={`text-xs sm:text-[13px] leading-relaxed whitespace-pre-line ${isFlipped ? 'text-emerald-200' : 'text-white font-semibold'}`}>
                        {isFlipped ? card.back : card.front}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/70">
                    <button
                      type="button"
                      onClick={() => toggleFlip(card.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
                    >
                      {isFlipped ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{isFlipped ? 'Show Question' : 'Flip Answer'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleMastered(card.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        isMastered
                          ? 'bg-emerald-600 text-white border-emerald-500'
                          : 'bg-slate-950 text-slate-300 hover:text-emerald-300 border-slate-700 hover:border-emerald-500/40'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isMastered ? 'Mastered' : 'Mark Mastered'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==================== TAB 3: 12 WORKED PRACTICE QS & RUBRICS ==================== */}
      {subTab === 'practice' && (
        <div className="space-y-4">
          {filteredPractice.map(q => {
            const isRevealed = !!revealedAnswerIds[q.id];

            return (
              <div
                key={q.id}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/35 text-xs font-extrabold">
                      Q{q.number} · {q.courseCode}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-[11px] font-bold">
                      {q.type}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">{q.paperCitation}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold">
                      {q.marks} Marks
                    </span>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                      <Clock className="w-3 h-3 text-sky-400" />
                      {q.timeMinutes} mins
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs sm:text-sm text-white leading-relaxed whitespace-pre-line">
                  {q.prompt}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setRevealedAnswerIds(prev => ({ ...prev, [q.id]: !prev[q.id] }))
                    }
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/35 text-xs font-bold transition-all"
                  >
                    {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{isRevealed ? 'Hide Model Answer & Rubric' : 'Reveal Model Answer & Marking Rubric'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectCourse(q.courseId)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Open {q.courseCode} Notes</span>
                  </button>
                </div>

                {isRevealed && (
                  <div className="space-y-2.5 pt-2 animate-fadeIn">
                    <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400 mb-1.5">
                        Model Answer
                      </div>
                      <pre className="text-xs text-slate-100 leading-relaxed whitespace-pre-wrap font-sans">
                        {q.modelAnswer}
                      </pre>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-950/25 border border-amber-500/30 text-xs text-amber-200">
                      <strong className="text-amber-300">Official Marking Rubric: </strong>
                      {q.rubric}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
