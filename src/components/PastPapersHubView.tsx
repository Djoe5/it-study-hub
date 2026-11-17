import React, { useState } from 'react';
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
} from 'lucide-react';
import {
  OFFICIAL_KCA_PAST_PAPER_CHANNELS,
  PAST_PAPER_GUIDES,
} from '../data/revisionPlan';

interface PastPapersHubViewProps {
  onSelectCourse: (courseId: string) => void;
}

export const PastPapersHubView: React.FC<PastPapersHubViewProps> = ({ onSelectCourse }) => {
  const [expandedMockIds, setExpandedMockIds] = useState<string[]>(['kcau-33500']);

  const toggleMock = (courseId: string) => {
    setExpandedMockIds(prev =>
      prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950/45 to-slate-900 border border-amber-500/25 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
              <FileSearch className="w-3.5 h-3.5 text-amber-400" />
              KCA Past Papers Finder & Mock Bank
            </span>
            <span className="text-xs text-slate-300 font-medium">
              All 6 Enrolled BSc IT Units
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Where & How to Pull Real KCA Past Exam Papers
          </h1>
          <p className="text-sm text-slate-300 mt-1.5 max-w-3xl leading-relaxed">
            KCA University keeps official past papers behind student login on the{' '}
            <strong className="text-white">Martin Oduor-Otieno Library Past Exam Bank</strong> &{' '}
            <strong className="text-white">Virtual Campus (Moodle)</strong>. Plus, because KCA recently harmonized unit codes (e.g., <code className="text-amber-300">BIT 1203 → STU 1202</code>, <code className="text-amber-300">KCAU 001 → CUU 2102</code>), searching the <strong>legacy KCA codes</strong> below unlocks years of real papers immediately!
          </p>
        </div>
      </div>

      {/* Step 1: Official KCA University Channels */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Library className="w-4 h-4 text-amber-400" />
          <h2 className="text-base font-bold text-white">
            Step 1: Official KCA University Past Paper Portals (Login Required)
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
            Pro Hack: Always Search Legacy KCA Unit Codes + Exact Unit Title!
          </strong>
          In the KCA Exam Bank, Studocu, Scribd, and WhatsApp class groups, older papers (2018–2024) are indexed under previous BSc IT / BBIT / BSD codes (e.g. <strong>KCAU 001</strong> for Information Literacy, <strong>BIT 1203</strong> for Web Design, <strong>BIT 2107 / BIT 2108</strong> for OOP/UML). Every unit card below includes 1-click pre-built searches combining BOTH your current and legacy codes!
        </div>
      </div>

      {/* Step 2: Unit-by-Unit Past Paper Finder & High-Yield Model Questions */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h2 className="text-base font-bold text-white">
            Step 2: 1-Click Past Paper Search Launchers & KCA Mock Drills (By Exam Order)
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {PAST_PAPER_GUIDES.map((unit, index) => {
            const isExpanded = expandedMockIds.includes(unit.courseId);

            return (
              <div
                key={unit.courseId}
                className="rounded-2xl bg-slate-900/75 border border-slate-800/90 p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Unit Header */}
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

                  {/* Legacy Codes */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span className="text-slate-400 font-semibold">Also search legacy codes:</span>
                    {unit.legacyCodes.map(lc => (
                      <span
                        key={lc}
                        className="px-2 py-0.5 rounded bg-slate-800 text-sky-300 border border-slate-700 font-mono font-bold"
                      >
                        {lc}
                      </span>
                    ))}
                  </div>

                  {/* 1-Click Search Buttons */}
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

                  {/* High-Yield Exam Topics */}
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

                  {/* Expandable KCA-Style Mock Exam Questions */}
                  <div className="rounded-xl border border-slate-800 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleMock(unit.courseId)}
                      className="w-full px-3.5 py-2.5 bg-slate-800/60 hover:bg-slate-800 flex items-center justify-between text-xs font-bold text-amber-300 transition-colors"
                    >
                      <span className="flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5" />
                        KCA-Style Practice Exam Questions (Section A & B)
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
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

                {/* Footer Actions */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                  <button
                    onClick={() => onSelectCourse(unit.courseId)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Open {unit.code} Study Guides</span>
                  </button>
                  <a
                    href={unit.moodleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    title="Open Unit on KCA Virtual Campus"
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
  );
};
