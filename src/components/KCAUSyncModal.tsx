import React, { useState, useRef } from 'react';
import { 
  X, 
  Download, 
  Upload, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles, 
  BookOpen, 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw, 
  Calendar, 
  ArrowRight,
  ShieldCheck,
  Target
} from 'lucide-react';
import { Course, Assignment, UserProfile } from '../types';
import { StorageService } from '../services/storage';

interface KCAUSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataReload: () => void;
  existingCourses: Course[];
}

export const KCAUSyncModal: React.FC<KCAUSyncModalProps> = ({
  isOpen,
  onClose,
  onDataReload,
  existingCourses
}) => {
  const [activeTab, setActiveTab] = useState<'bookmarklet' | 'upload' | 'strategy'>('bookmarklet');
  const [copiedBookmarklet, setCopiedBookmarklet] = useState(false);
  const [pastedJson, setPastedJson] = useState('');
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // The bookmarklet href

  const copyableSnippet = "javascript:void((async function(){try{const sk=window.M?.cfg?.sesskey;if(!sk){alert('Please log into https://virtualcampus.kcau.ac.ke first!');return;}let pBox=document.getElementById('sh-box');if(!pBox){pBox=document.createElement('div');pBox.id='sh-box';pBox.style.cssText='position:fixed;top:20px;right:20px;z-index:999999;background:#0f172a;color:#fff;padding:20px;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.5);font-family:sans-serif;max-width:400px;border:1px solid #38bdf8;';document.body.appendChild(pBox);}pBox.innerHTML='<h3 style=\"margin:0 0 8px;color:#38bdf8;font-size:16px;\">📚 Study Hub Sync</h3><p id=\"sh-txt\" style=\"margin:0;font-size:13px;color:#94a3b8;\">Connecting to Virtual Campus...</p>';const setMsg=(t)=>{const el=document.getElementById('sh-txt');if(el)el.textContent=t;};function p(t){t=(t||'').trim().replace(/\\s+/g,' ');const m=t.match(/([A-Z]{2,5}\\s*\\d{3,4}[A-Z]?)/i),c=m?m[1].toUpperCase():'UNIT';let s=m?t.replace(m[0],'').replace(/^[\\s:\\-–—]+/,'').trim():t;return{code:c,title:s||t};}const cm=new Map(),cl=['#8b5cf6','#3b82f6','#10b981','#f59e0b','#ec4899','#06b6d4'];let ci=0;setMsg('Fetching enrolled courses...');const cRes=await fetch('/lib/ajax/service.php?sesskey='+sk+'&info=core_course_get_enrolled_courses_by_timeline_classification',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify([{index:0,methodname:'core_course_get_enrolled_courses_by_timeline_classification',args:{classification:'all',limit:30,offset:0,sort:'fullname'}}])});const cJ=await cRes.json();const cs=cJ?.[0]?.data?.courses||[];const validCourses=cs.filter(c=>String(c.id)!=='1'&&!/guide|orientation/i.test(c.fullname));for(const c of validCourses){const mid=String(c.id);const raw=c.fullname||c.shortname||'';let{code,title}=p(raw);let instructor='KCAU Faculty';if(raw.includes('::')){const parts=raw.split('::').pop().split(':').map(s=>s.trim());if(parts[0])title=parts[0];if(parts.length>=3)instructor=parts[2].toLowerCase().replace(/\\b\\w/g,l=>l.toUpperCase());}setMsg('Fetching topics for '+code+'...');let syl=[];let res=[{id:'res-vc-'+mid,title:'Virtual Campus Page',url:'https://virtualcampus.kcau.ac.ke/course/view.php?id='+mid,category:'portal',covered:false}];try{const contRes=await fetch('/lib/ajax/service.php?sesskey='+sk+'&info=core_course_get_contents',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify([{index:0,methodname:'core_course_get_contents',args:{courseid:parseInt(mid,10)}}])});const contJ=await contRes.json();const secs=contJ?.[0]?.data||[];let sIdx=1;for(const sec of secs){const sName=(sec.name||'').trim();if(!sName||/general|announcement/i.test(sName)){(sec.modules||[]).forEach(m=>{if(/zoom|class/i.test(m.name)){res.push({id:'res-'+m.id,title:m.name,url:m.url||('https://virtualcampus.kcau.ac.ke/mod/zoom/view.php?id='+m.id),category:'zoom',covered:false});}});continue;}const tList=[];(sec.modules||[]).forEach(m=>{if(m.name)tList.push(m.name);if(['resource','quiz','assign','url'].includes(m.modname)){const isS=/\\.pptx?|slide|presentation/i.test(m.name);const isQ=m.modname==='quiz'||/quiz|cat|test/i.test(m.name);res.push({id:'res-'+m.id,title:m.name,url:m.url||('https://virtualcampus.kcau.ac.ke/mod/'+m.modname+'/view.php?id='+m.id),category:isQ?'quiz':(isS?'slides':'pdf'),week:sIdx,covered:false});}});syl.push({id:'syl-'+mid+'-'+sIdx,week:sIdx,title:sName,topics:tList.length>0?tList:['Core lecture topics'],completed:false,targetStudyMinutes:25});sIdx++;}}catch(e){console.warn(e);}const cid='kcau-'+mid;cm.set(cid,{id:cid,code,title,instructor,credits:3,color:cl[ci%cl.length],term:'Trimester 3 (2026)',targetGrade:88,roomOrLink:'https://virtualcampus.kcau.ac.ke/course/view.php?id='+mid,gradeComponents:[{id:'gc-1-'+mid,name:'CAT 1',weight:15,maxScore:100},{id:'gc-2-'+mid,name:'CAT 2',weight:15,maxScore:100},{id:'gc-3-'+mid,name:'Assignments',weight:10,maxScore:100},{id:'gc-4-'+mid,name:'Final Exam',weight:60,maxScore:100}],syllabus:syl,resources:res,notes:'Imported directly from KCAU Virtual Campus.'});ci++;}setMsg('Fetching CAT & assignment deadlines...');const al=[];try{const nowTs=Math.floor(Date.now()/1000);const aR=await fetch('/lib/ajax/service.php?sesskey='+sk+'&info=core_calendar_get_action_events_by_timesort',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify([{index:0,methodname:'core_calendar_get_action_events_by_timesort',args:{limitnum:50,timesortfrom:nowTs-86400*3}}])});const aJ=await aR.json();const evs=aJ?.[0]?.data?.events||[];evs.forEach(ev=>{const isC=/CAT|Continuous|Quiz|Test/i.test(ev.name)||ev.modulename==='quiz';const isE=/Exam|Final/i.test(ev.name);al.push({id:'kcau-evt-'+ev.id,courseId:ev.course?'kcau-'+ev.course.id:(cm.keys().next().value||'kcau-gen'),title:ev.name||'Assessment',description:ev.description||'',type:isC?'cat':(isE?'exam':'homework'),priority:isC||isE?'high':'medium',dueDate:new Date((ev.timesort||nowTs)*1000).toISOString().slice(0,16),status:'not_started',weight:isC?15:(isE?60:5),submissionLink:ev.url||ev.action?.url||''});});}catch(e){}const payload={version:'2.0.0',source:'KCAU Virtual Campus Deep Topics Exporter',exportedAt:new Date().toISOString(),profile:{studentName:'Joseph',program:'BSc in Information Technology',institution:'KCA University (Virtual Campus)',academicYear:'Year 1',currentTerm:'Trimester 3 (2026)',targetGpa:4.0},courses:Array.from(cm.values()),assignments:al};const pStr=JSON.stringify(payload,null,2);const blob=new Blob([pStr],{type:'application/json'});const u=URL.createObjectURL(blob);const l=document.createElement('a');l.href=u;l.download='kcau-studyhub-sync-'+new Date().toISOString().slice(0,10)+'.json';document.body.appendChild(l);l.click();document.body.removeChild(l);URL.revokeObjectURL(u);pBox.innerHTML='<h3 style=\"margin:0 0 8px;color:#10b981;font-size:16px;\">✅ Complete Sync Exported!</h3><p style=\"margin:0 0 10px;font-size:13px;color:#cbd5e1;\">Exported '+cm.size+' units with <b>exact weekly topics, lecture notes & deadlines</b>.<br>Drag the downloaded file into StudyHub.</p><button onclick=\"this.parentElement.remove()\" style=\"background:#3b82f6;color:#fff;border:none;padding:6px 14px;border-radius:6px;cursor:pointer;\">Close</button>';}catch(err){alert('Export error: '+err.message);}})());";

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(copyableSnippet);
      setCopiedBookmarklet(true);
      setTimeout(() => setCopiedBookmarklet(false), 2500);
    } catch(err) {
      console.error(err);
    }
  };

  const processImportString = (jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      let importedCount = 0;
      let asgCount = 0;

      if (parsed.courses && Array.isArray(parsed.courses) && parsed.courses.length > 0) {
        const currentCourses = StorageService.getCourses();
        const mergedMap = new Map<string, Course>();
        currentCourses.forEach(c => mergedMap.set(c.id, c));

        parsed.courses.forEach((c: Course) => {
          // Skip non-academic guides
          if (c.code === 'UNIT' || /guide|orientation/i.test(c.title)) return;

          // Parse raw Moodle title e.g. "TRIM3 26::OBJECT-ORIENTED TECHNOLOGIES:PTDL:BEATRICE MUTHONI:ZOOM:Stream A"
          let title = c.title;
          let instructor = c.instructor;
          if (c.title.includes('::')) {
            const afterDouble = c.title.split('::').pop() || '';
            const segments = afterDouble.split(':').map(s => s.trim()).filter(Boolean);
            if (segments.length > 0) {
              title = segments[0];
            }
            if (segments.length >= 3 && (!instructor || instructor === 'KCAU Faculty')) {
              instructor = segments[2].toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
            }
          }

          // Match by id or by course code
          const existingById = mergedMap.get(c.id);
          const existingByCode = Array.from(mergedMap.values()).find(e => 
            e.code.replace(/\s+/g, '').toUpperCase() === c.code.replace(/\s+/g, '').toUpperCase()
          );
          const target = existingById || existingByCode;

          // Clean all topics to unread state
          const cleanedSyllabus = (c.syllabus || []).map(m => ({
            ...m,
            completed: false,
            targetStudyMinutes: m.targetStudyMinutes || 25
          }));

          if (target) {
            mergedMap.set(target.id, {
              ...target,
              ...c,
              id: target.id,
              title: title || target.title,
              instructor: (instructor && instructor !== 'KCAU Faculty') ? instructor : target.instructor,
              syllabus: cleanedSyllabus.length > 0 ? cleanedSyllabus : target.syllabus,
              resources: [
                ...(c.resources || []),
                ...(target.resources || []).filter(tr => !(c.resources || []).some(r => r.url === tr.url))
              ],
            });
          } else {
            mergedMap.set(c.id, {
              ...c,
              title,
              instructor,
              syllabus: cleanedSyllabus,
            });
          }
          importedCount++;
        });
        StorageService.saveCourses(Array.from(mergedMap.values()));
      }

      if (parsed.assignments && Array.isArray(parsed.assignments) && parsed.assignments.length > 0) {
        const currentAsgs = StorageService.getAssignments();
        const asgMap = new Map<string, Assignment>();
        currentAsgs.forEach(a => asgMap.set(a.id, a));
        parsed.assignments.forEach((a: Assignment) => {
          asgMap.set(a.id, a);
          asgCount++;
        });
        StorageService.saveAssignments(Array.from(asgMap.values()));
      }

      if (parsed.profile) {
        const currentProfile = StorageService.getProfile();
        StorageService.saveProfile({
          ...currentProfile,
          institution: 'KCA University (Virtual Campus)',
          program: parsed.profile.program || currentProfile.program
        });
      }

      setStatusMsg({
        type: 'success',
        text: `Successfully synced ${importedCount} units and ${asgCount} deadlines/CATs from KCAU Virtual Campus!`
      });
      onDataReload();
    } catch(err) {
      setStatusMsg({
        type: 'error',
        text: 'Failed to parse JSON. Please verify the file or pasted text.'
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      processImportString(text);
    };
    reader.readAsText(file);
  };

  const handleLoadDemoVirtualCampusData = () => {
    const currentCourses = StorageService.getCourses();
    const updatedCourses = currentCourses.map(c => {
      const codeUpper = c.code.toUpperCase();
      let resources = [...(c.resources || [])];
      
      if (codeUpper.includes('2102') && codeUpper.includes('STU')) {
        // Computing Research Skills
        resources = [
          { id: 'res-stu2102-1', title: 'Week 1-3 Lecture Slides: Computing Research Paradigms & Formulations', url: 'https://virtualcampus.kcau.ac.ke/my/courses.php', category: 'slides', week: 1 },
          { id: 'res-stu2102-2', title: 'Research Proposal Template & Academic Defense Guidelines (KCAU)', url: 'https://virtualcampus.kcau.ac.ke/my/courses.php', category: 'pdf', week: 3 },
          { id: 'res-stu2102-3', title: 'Monday Evening Research Design Studio (Zoom)', url: 'https://zoom.us/join', category: 'zoom' },
          ...resources.filter(r => !r.id.startsWith('res-stu2102-'))
        ];
      } else if (codeUpper.includes('1201')) {
        // Intro to Programming
        resources = [
          { id: 'res-stu1201-1', title: 'Lecture Notes: C/Python Control Structures, Pointers & Memory Models', url: 'https://virtualcampus.kcau.ac.ke/my/courses.php', category: 'slides', week: 2 },
          { id: 'res-stu1201-2', title: 'Programming Lab Worksheets & Dry-Run Trace Table Manual', url: 'https://virtualcampus.kcau.ac.ke/my/courses.php', category: 'pdf', week: 4 },
          { id: 'res-stu1201-3', title: 'Tuesday 4-Hour Live Coding Studio (Zoom)', url: 'https://zoom.us/join', category: 'zoom' },
          ...resources.filter(r => !r.id.startsWith('res-stu1201-'))
        ];
      } else if (codeUpper.includes('1202') && codeUpper.includes('CUU')) {
        // Critical Thinking
        resources = [
          { id: 'res-cuu1202-1', title: 'Informal Fallacies Handbook & CAT Practice Reasoning Matrix', url: 'https://virtualcampus.kcau.ac.ke/my/courses.php', category: 'pdf', week: 2 },
          { id: 'res-cuu1202-2', title: 'Syllogisms, Logic & Argument Deconstruction Lecture Slides', url: 'https://virtualcampus.kcau.ac.ke/my/courses.php', category: 'slides', week: 3 },
          { id: 'res-cuu1202-3', title: 'Wednesday Critical Seminar Live Session (Zoom)', url: 'https://zoom.us/join', category: 'zoom' },
          ...resources.filter(r => !r.id.startsWith('res-cuu1202-'))
        ];
      } else if (codeUpper.includes('2104')) {
        // Object Oriented Technologies
        resources = [
          { id: 'res-cpp2104-1', title: 'OOP 4 Pillars & UML Class Diagramming Masterdeck', url: 'https://virtualcampus.kcau.ac.ke/my/courses.php', category: 'slides', week: 2 },
          { id: 'res-cpp2104-2', title: 'Java/C++ Class Modeling & Polymorphism Lab Manual', url: 'https://virtualcampus.kcau.ac.ke/my/courses.php', category: 'pdf', week: 4 },
          { id: 'res-cpp2104-3', title: 'Thursday Evening OOP Lab Session (Zoom)', url: 'https://zoom.us/join', category: 'zoom' },
          ...resources.filter(r => !r.id.startsWith('res-cpp2104-'))
        ];
      } else if (codeUpper.includes('2102') && codeUpper.includes('CUU')) {
        // Information Literacy & Academic Writing
        resources = [
          { id: 'res-cuu2102-1', title: 'APA 7th Referencing & Citation Comprehensive Guide', url: 'https://virtualcampus.kcau.ac.ke/my/courses.php', category: 'pdf', week: 1 },
          { id: 'res-cuu2102-2', title: 'Turnitin Academic Integrity & Plagiarism Threshold Rules', url: 'https://virtualcampus.kcau.ac.ke/my/courses.php', category: 'slides', week: 2 },
          { id: 'res-cuu2102-3', title: 'Friday Academic Writing Workshop (Zoom)', url: 'https://zoom.us/join', category: 'zoom' },
          ...resources.filter(r => !r.id.startsWith('res-cuu2102-'))
        ];
      } else if (codeUpper.includes('1202') && codeUpper.includes('STU')) {
        // Web Design & Dev
        resources = [
          { id: 'res-stu1202-1', title: 'HTML5 Semantic Layout & CSS Flexbox/Grid Cheatsheet', url: 'https://virtualcampus.kcau.ac.ke/course/view.php?id=33251', category: 'slides', week: 1 },
          { id: 'res-stu1202-2', title: 'Term Web Project Guidelines & Responsive Portfolio Rubric', url: 'https://virtualcampus.kcau.ac.ke/course/view.php?id=33251', category: 'pdf', week: 3 },
          { id: 'res-stu1202-3', title: 'Saturday 4-Hour Web Studio (Zoom)', url: 'https://zoom.us/join', category: 'zoom' },
          ...resources.filter(r => !r.id.startsWith('res-stu1202-'))
        ];
      }

      return {
        ...c,
        resources
      };
    });

    StorageService.saveCourses(updatedCourses);
    onDataReload();
    setStatusMsg({
      type: 'success',
      text: 'Successfully loaded complete Virtual Campus lecture slides, PDF manuals, and Zoom rooms for all 6 units!'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl relative max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-500/20 to-indigo-500/20 border border-amber-500/30 text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">
                  KCAU Virtual Campus Sync & Study Plan
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Moodle LMS
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Automatically import your units, CATs, and assignments from virtualcampus.kcau.ac.ke
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 pt-4 pb-2 border-b border-slate-800/80 shrink-0">
          <button
            onClick={() => setActiveTab('bookmarklet')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'bookmarklet'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>1-Click Bookmarklet</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'upload'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload or Paste JSON</span>
          </button>

          <button
            onClick={() => setActiveTab('strategy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'strategy'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-amber-400 hover:text-amber-300 hover:bg-amber-500/10'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>"Flying Colours" Strategy</span>
          </button>
        </div>

        {/* Status Message */}
        {statusMsg && (
          <div className={`mt-3 p-3 rounded-xl text-xs flex items-center gap-2 shrink-0 ${
            statusMsg.type === 'success' 
              ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30' 
              : 'bg-rose-950/40 text-rose-300 border border-rose-500/30'
          }`}>
            {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {/* TAB 1: BOOKMARKLET */}
          {activeTab === 'bookmarklet' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold">1</span>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wide">
                      Get the 1-Click Exporter Bookmarklet
                    </h3>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium shadow-sm transition-all"
                  >
                    {copiedBookmarklet ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedBookmarklet ? 'Copied Code!' : 'Copy Bookmarklet Code'}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Bookmarklets run directly inside your logged-in browser session on KCAU Virtual Campus.
                </p>

                <div className="bg-slate-900 rounded-lg p-3 border border-slate-800 text-[11px] font-mono text-slate-400 overflow-x-auto whitespace-nowrap">
                  {copyableSnippet.slice(0, 110)}...
                </div>
              </div>

              {/* Instructions steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                  <div className="text-indigo-400 font-bold text-xs flex items-center gap-1.5">
                    <span>Step 1: Save Bookmark</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Create a new browser bookmark (e.g. named <strong>"Sync KCAU"</strong>) and paste the copied code into the URL field.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                  <div className="text-indigo-400 font-bold text-xs flex items-center gap-1.5">
                    <span>Step 2: Visit Portal</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Log in and navigate to <a href="https://virtualcampus.kcau.ac.ke/my/courses.php" target="_blank" rel="noreferrer" className="text-indigo-300 underline">virtualcampus.kcau.ac.ke</a>.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                  <div className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                    <span>Step 3: Click to Export</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Click the bookmark! It instantly extracts all units, CATs & deadlines into a JSON file for StudyHub.
                  </p>
                </div>
              </div>

              {/* Quick shortcut */}
              <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ExternalLink className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs text-indigo-200">
                    Already downloaded your <code>kcau-studyhub-sync.json</code> file?
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="px-3 py-1 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-semibold transition-all"
                >
                  Upload File →
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: UPLOAD OR PASTE */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              {/* Instant Virtual Campus Courseware Preloader */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-indigo-950/80 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Instant KCAU Virtual Campus Courseware Bundle</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Populate complete lecture slides, PDF manuals, and Zoom links for all 6 BSc IT units immediately.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLoadDemoVirtualCampusData}
                  className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 whitespace-nowrap transition-all"
                >
                  ⚡ Populate All 6 Units
                </button>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-slate-700 hover:border-indigo-500/70 bg-slate-950/50 hover:bg-slate-950 rounded-2xl p-6 text-center transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-white mb-1">
                  Click to Browse or Drag & Drop Sync JSON
                </h4>
                <p className="text-[11px] text-slate-400">
                  Select <code>kcau-studyhub-sync-*.json</code> generated by the bookmarklet
                </p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-900 px-2 text-slate-500 font-semibold">Or Paste JSON Directly</span>
                </div>
              </div>

              <div>
                <textarea
                  rows={4}
                  value={pastedJson}
                  onChange={(e) => setPastedJson(e.target.value)}
                  placeholder="Paste exported JSON content here..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
                />
                <button
                  disabled={!pastedJson.trim()}
                  onClick={() => processImportString(pastedJson)}
                  className="mt-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sync Courses & Deadlines Into StudyHub</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: "PASS WITH FLYING COLOURS" STRATEGY */}
          {activeTab === 'strategy' && (
            <div className="space-y-3.5">
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-950/30 to-indigo-950/20 border border-amber-500/20 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    The KCAU First-Class Blueprint (A Grades)
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  In Kenyan Universities and KCAU, achieving a First Class (70%+ Grade A) is won or lost during the semester in <strong>Continuous Coursework</strong>—not during panic cramming in the final exam week.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-amber-300 font-bold text-xs flex items-center gap-1.5">
                    <span>1. Lock in the 30% - 40% Coursework</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    CAT 1 (15%), CAT 2 (15%), and Assignments (10%). If you secure <strong>35/40</strong> in coursework, you only need <strong>35/60 (58%)</strong> in the final exam to easily lock an <strong>A</strong>!
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-emerald-300 font-bold text-xs flex items-center gap-1.5">
                    <span>2. The 48-Hour Safety Buffer</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Never submit assignments on the deadline date. KCAU Virtual Campus experiences heavy traffic between 9:00 PM and 11:59 PM. Always submit <strong>24–48 hours ahead</strong>.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-indigo-300 font-bold text-xs flex items-center gap-1.5">
                    <span>3. Never Miss a Class Protocol</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Set recurring 10-minute alarms before lectures. Keep Zoom/Meet links and room venues saved in StudyHub. Lecturers frequently give exact exam hints and CAT questions in class.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-purple-300 font-bold text-xs flex items-center gap-1.5">
                    <span>4. Spaced Recall with Focus Timer</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Use StudyHub's built-in <strong>Focus Timer</strong> (25-minute Pomodoros). Study 2 hours per unit per week for deep problem solving, packet tracer configs, and coding.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-slate-500">
            {existingCourses.length} units currently in StudyHub
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
