(async function() {
  const existing = document.getElementById('studyhub-kcau-modal');
  if (existing) existing.remove();

  function parseCourseDetails(rawText) {
    const text = (rawText || '').trim().replace(/\s+/g, ' ');
    const codeMatch = text.match(/([A-Z]{2,5}\s*\d{3,4}[A-Z]?)/i);
    const code = codeMatch ? codeMatch[1].toUpperCase() : 'UNIT';
    let title = text;
    if (codeMatch) {
      title = text.replace(codeMatch[0], '').replace(/^[\s:\-–—]+/, '').replace(/[\s:\-–—]+$/, '').trim();
    }
    if (!title || title.length < 3) title = text;
    return { code, title };
  }

  const coursesMap = new Map();
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#6366f1'];
  let colorIdx = 0;

  const courseElements = document.querySelectorAll(
    '[data-region="course-content"], .dashboard-card, .course-info-container, .coursebox, .coursename, a[href*="/course/view.php?id="]'
  );

  courseElements.forEach(el => {
    let link = el.tagName === 'A' ? el : el.querySelector('a[href*="/course/view.php?id="]');
    if (!link) return;
    const href = link.href;
    const idMatch = href.match(/[?&]id=(\d+)/);
    if (!idMatch) return;
    const moodleCourseId = idMatch[1];
    if (moodleCourseId === '1') return;

    const titleEl = el.querySelector('.coursename, .multiline, [data-region="course-link"]') || link;
    const rawTitle = titleEl.innerText || titleEl.textContent || '';
    if (!rawTitle || rawTitle.includes('Site home') || rawTitle.includes('Dashboard')) return;

    const { code, title } = parseCourseDetails(rawTitle);
    const courseId = 'kcau-' + moodleCourseId;

    if (!coursesMap.has(courseId)) {
      coursesMap.set(courseId, {
        id: courseId,
        code: code,
        title: title,
        instructor: 'KCAU Faculty',
        credits: 3,
        color: colors[colorIdx % colors.length],
        term: 'Current Trimester',
        targetGrade: 85,
        roomOrLink: href,
        gradeComponents: [
          { id: 'gc-cat1-' + moodleCourseId, name: 'CAT 1 (Continuous Assessment)', weight: 15, maxScore: 100 },
          { id: 'gc-cat2-' + moodleCourseId, name: 'CAT 2 (Continuous Assessment)', weight: 15, maxScore: 100 },
          { id: 'gc-asg-' + moodleCourseId, name: 'Assignments & Labs', weight: 10, maxScore: 100 },
          { id: 'gc-exam-' + moodleCourseId, name: 'Final Semester Examination', weight: 60, maxScore: 100 }
        ],
        syllabus: [],
        resources: [
          {
            id: 'res-portal-' + moodleCourseId,
            title: 'KCAU Virtual Campus Course Page',
            url: href,
            category: 'portal'
          }
        ],
        notes: 'Enrolled unit at KCA University Virtual Campus.'
      });
      colorIdx++;
    }
  });

  const assignmentsList = [];
  const processedEventIds = new Set();
  const sesskey = window.M?.cfg?.sesskey;

  if (sesskey) {
    try {
      const nowTs = Math.floor(Date.now() / 1000);
      const res = await fetch('/lib/ajax/service.php?sesskey=' + sesskey + '&info=core_calendar_get_action_events_by_timesort', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([{
          index: 0,
          methodname: 'core_calendar_get_action_events_by_timesort',
          args: { limitnum: 50, timesortfrom: nowTs - (86400 * 3) }
        }])
      });

      const json = await res.json();
      if (json && json[0] && json[0].data && json[0].data.events) {
        json[0].data.events.forEach(evt => {
          if (processedEventIds.has(evt.id)) return;
          processedEventIds.add(evt.id);

          const eventName = evt.name || 'Assessment';
          const isCAT = /CAT|Continuous Assessment|Quiz|Test/i.test(eventName) || evt.modulename === 'quiz';
          const isExam = /Exam|Examination|Final/i.test(eventName);
          
          let asgType = 'homework';
          if (isCAT) asgType = 'cat';
          else if (isExam) asgType = 'exam';
          else if (evt.modulename === 'assign') asgType = 'lab';

          const moodleCourseId = evt.course ? String(evt.course.id) : null;
          const courseId = moodleCourseId ? 'kcau-' + moodleCourseId : (coursesMap.keys().next().value || 'kcau-general');

          if (moodleCourseId && !coursesMap.has(courseId) && evt.course) {
            const { code, title } = parseCourseDetails(evt.course.fullname);
            coursesMap.set(courseId, {
              id: courseId,
              code: code,
              title: title,
              instructor: 'KCAU Faculty',
              credits: 3,
              color: colors[colorIdx % colors.length],
              term: 'Current Trimester',
              targetGrade: 85,
              roomOrLink: 'https://virtualcampus.kcau.ac.ke/course/view.php?id=' + moodleCourseId,
              gradeComponents: [
                { id: 'gc-cat1-' + moodleCourseId, name: 'CAT 1', weight: 15, maxScore: 100 },
                { id: 'gc-cat2-' + moodleCourseId, name: 'CAT 2', weight: 15, maxScore: 100 },
                { id: 'gc-asg-' + moodleCourseId, name: 'Assignments', weight: 10, maxScore: 100 },
                { id: 'gc-exam-' + moodleCourseId, name: 'Final Exam', weight: 60, maxScore: 100 }
              ],
              syllabus: [],
              resources: [
                {
                  id: 'res-portal-' + moodleCourseId,
                  title: 'KCAU Virtual Campus Course Page',
                  url: 'https://virtualcampus.kcau.ac.ke/course/view.php?id=' + moodleCourseId,
                  category: 'portal'
                }
              ]
            });
            colorIdx++;
          }

          const dateObj = new Date((evt.timesort || nowTs) * 1000);
          const dueDateStr = dateObj.toISOString().slice(0, 16);

          assignmentsList.push({
            id: 'kcau-evt-' + evt.id,
            courseId: courseId,
            title: eventName,
            description: evt.description || 'Assessment on KCAU Virtual Campus',
            type: asgType,
            priority: isCAT || isExam ? 'high' : 'medium',
            dueDate: dueDateStr,
            status: 'not_started',
            weight: isCAT ? 15 : isExam ? 60 : 5,
            submissionLink: evt.url || evt.action?.url || ('https://virtualcampus.kcau.ac.ke/mod/' + evt.modulename + '/view.php?id=' + evt.instance),
            notes: 'Imported live from KCAU Virtual Campus'
          });
        });
      }
    } catch (err) {
      console.warn('Moodle AJAX timeline fetch error:', err);
    }
  }

  const courses = Array.from(coursesMap.values());
  const exportPayload = {
    version: '1.0.0',
    source: 'KCAU Virtual Campus Exporter',
    institution: 'KCA University',
    exportedAt: new Date().toISOString(),
    profile: {
      studentName: 'Joseph',
      program: 'Bachelor of Science in Information Technology',
      institution: 'KCA University (Virtual Campus)',
      academicYear: 'Year 1',
      currentTerm: 'Current Trimester',
      targetGpa: 4.0
    },
    courses: courses,
    assignments: assignmentsList
  };

  const payloadString = JSON.stringify(exportPayload, null, 2);

  const modal = document.createElement('div');
  modal.id = 'studyhub-kcau-modal';
  modal.style.cssText = 'position:fixed; top:20px; right:20px; width:380px; max-width:90vw; background:#090d16; color:#e2e8f0; border:1px solid #334155; border-radius:16px; padding:20px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.8); z-index:9999999; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; font-size:13px; line-height:1.5;';

  modal.innerHTML = `
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; border-bottom:1px solid #1e293b; padding-bottom:10px;">
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="font-size:18px;">🎓</span>
        <strong style="color:#ffffff; font-size:14px;">KCAU ➔ StudyHub Sync</strong>
      </div>
      <button id="studyhub-close-btn" style="background:none; border:none; color:#94a3b8; font-size:20px; cursor:pointer;">&times;</button>
    </div>

    <div style="margin-bottom:14px;">
      <div style="display:flex; gap:8px; margin-bottom:8px;">
        <span style="background:#1e1b4b; color:#a5b4fc; border:1px solid #3730a3; padding:2px 8px; border-radius:999px; font-weight:600; font-size:11px;">
          ${courses.length} Units Found
        </span>
        <span style="background:#143329; color:#6ee7b7; border:1px solid #065f46; padding:2px 8px; border-radius:999px; font-weight:600; font-size:11px;">
          ${assignmentsList.length} Deadlines / CATs
        </span>
      </div>
      <p style="color:#94a3b8; margin:0; font-size:12px;">
        ${courses.length > 0 
          ? 'Ready to sync your courses and CATs directly into StudyHub!' 
          : '⚠️ No courses detected. Make sure you are logged in on <a href="/my/courses.php" style="color:#60a5fa;">My courses</a>.'}
      </p>
    </div>

    ${courses.length > 0 ? `
      <div style="max-height:140px; overflow-y:auto; background:#0f172a; border:1px solid #1e293b; border-radius:8px; padding:8px; margin-bottom:14px;">
        ${courses.map(c => `
          <div style="display:flex; align-items:center; justify-content:space-between; padding:4px 0; border-bottom:1px solid #1e293b; font-size:11px;">
            <strong style="color:${c.color};">${c.code}</strong>
            <span style="color:#cbd5e1; max-width:220px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${c.title}</span>
          </div>
        `).join('')}
      </div>
    ` : ''}

    <div style="display:flex; flex-direction:column; gap:8px;">
      <button id="studyhub-download-btn" style="width:100%; background:#4f46e5; color:#ffffff; border:none; padding:10px 12px; border-radius:8px; font-weight:600; cursor:pointer; font-size:12px; display:flex; align-items:center; justify-content:center; gap:6px;">
        <span>📥</span> Download StudyHub Sync (.json)
      </button>

      <button id="studyhub-copy-btn" style="width:100%; background:#1e293b; color:#cbd5e1; border:1px solid #334155; padding:8px 12px; border-radius:8px; font-weight:500; cursor:pointer; font-size:11px; display:flex; align-items:center; justify-content:center; gap:6px;">
        <span>📋</span> Copy JSON to Clipboard
      </button>
    </div>

    <div id="studyhub-feedback" style="margin-top:10px; font-size:11px; text-align:center; color:#10b981; display:none;"></div>
  `;

  document.body.appendChild(modal);

  document.getElementById('studyhub-close-btn').onclick = () => modal.remove();

  document.getElementById('studyhub-download-btn').onclick = () => {
    const blob = new Blob([payloadString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kcau-virtualcampus-sync-' + (new Date().toISOString().slice(0, 10)) + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    const fb = document.getElementById('studyhub-feedback');
    fb.style.display = 'block';
    fb.innerText = '✅ File downloaded! Drop it into StudyHub.';
  };

  document.getElementById('studyhub-copy-btn').onclick = async () => {
    try {
      await navigator.clipboard.writeText(payloadString);
      const fb = document.getElementById('studyhub-feedback');
      fb.style.display = 'block';
      fb.innerText = '✅ Copied to clipboard!';
    } catch(err) {
      alert('Could not copy directly. Please use the Download button.');
    }
  };
})();