// Enquiry Modal, Course Detail Drawer, and Toast notifications
(function() {
  const toastEl = document.getElementById('toast');
  let toastTimer;

  window.toast = function(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('on'), 2500);
  };

  const md = document.getElementById('md');
  const mc = document.getElementById('mc');
  const esc = (s) => (s ? String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])) : '');

  // Open Enquiry Modal
  window.openEnquiryModal = function(courseTitle, courseId, category, audience) {
    if (!mc || !md) return;

    const topic = (courseTitle || 'General Enquiry & Counselling').trim();
    const t = topic.toLowerCase();
    const cat = (category || (typeof window.currentCategorySlug !== 'undefined' ? window.currentCategorySlug : '') || (new URLSearchParams(window.location.search).get('category') || '')).toLowerCase();
    const aud = (audience || '').toLowerCase();

    // Check if this topic or category is school
    const isSchool = cat === 'school' || 
                     aud.includes('class ') || 
                     t.includes('school') || 
                     t.includes('class 5') || t.includes('class 6') || t.includes('class 7') || t.includes('class 8') || t.includes('class 9') || t.includes('class 10') || t.includes('class 11') || t.includes('class 12') ||
                     t.includes('ai explorer') || t.includes('junior robotics') || t.includes('python for beginner');

    // Detect enquiry category
    let type = 'general';
    if (t.includes('institution') || t.includes('college partnership') || t.includes('school partnership') || t.includes('partner with us') || t.includes('setup in school')) {
      type = 'institution';
    } else if (t.includes('business') || t.includes('enterprise') || t.includes('audit')) {
      type = 'business';
    } else if (t.includes('event') || t.includes('hackathon') || t.startsWith('register for')) {
      type = 'event';
    } else if (isSchool) {
      type = 'school';
    }

    mc.dataset.type = type;

    let dynamicFieldsHtml = '';
    let messagePlaceholder = "Tell us about your learning goals...";

    if (type === 'business' || type === 'institution') {
      dynamicFieldsHtml = `
        <div>
          <label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;color:var(--navy);">${type === 'institution' ? 'College / School / University Name *' : 'Company / Organization Name *'}</label>
          <input required name="org" placeholder="${type === 'institution' ? 'e.g. Berhampur University, NIST' : 'e.g. TechCorp Solutions, Odisha'}" aria-label="Organization" />
        </div>
        <div>
          <label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;color:var(--navy);">Designation / Role</label>
          <input name="role" placeholder="e.g. Principal, Director, HOD, HR, Manager" aria-label="Designation" />
        </div>
      `;
      messagePlaceholder = "Tell us about your requirements or collaboration goals...";
    } else if (type === 'event') {
      dynamicFieldsHtml = `
        <div>
          <label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;color:var(--navy);">Current Role *</label>
          <input required name="current_role" placeholder="e.g. Student, Software Developer, Researcher, Founder" aria-label="Current Role" />
        </div>
      `;
      messagePlaceholder = "Any questions or expectations from this event... (Optional)";
    } else if (type === 'school') {
      // School Programs: Course Name + School Name + Class/Grade
      let prefillCourse = '';
      const genericTopics = ['general enquiry', 'academy counselling', 'academy enrolment', 'join od ai hub', 'talk to a counsellor', 'admissions counselling', 'general platform enquiry', 'platform pre-launch interest', 'school programs'];
      if (!genericTopics.includes(t)) {
        prefillCourse = topic.replace(/^(Course:|Blog:|School Program:)\s*/i, '').trim();
      }

      dynamicFieldsHtml = `
        <div>
          <label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;color:var(--navy);">Program / Course Name *</label>
          <input required name="course_name" value="${esc(prefillCourse)}" placeholder="e.g. AI Explorers, Coding for Kids, Robotics" aria-label="Program or Course Name" />
        </div>
        <div>
          <label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;color:var(--navy);">School Name *</label>
          <input required name="stream" placeholder="e.g. Kendriya Vidyalaya, DAV Public School, DPS" aria-label="School Name" />
        </div>
        <div>
          <label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;color:var(--navy);">Class / Grade *</label>
          <input required name="year" placeholder="e.g. Class 5, Class 8, Class 10, Class 12" aria-label="Class or Grade" />
        </div>
      `;
      messagePlaceholder = "Tell us about your interest or any questions... (Optional)";
    } else {
      // Default: Everything else (College Course, Academy, General)
      let prefillCourse = '';
      const genericTopics = ['general enquiry', 'academy counselling', 'academy enrolment', 'join od ai hub', 'talk to a counsellor', 'admissions counselling', 'general platform enquiry', 'platform pre-launch interest'];
      if (!genericTopics.includes(t)) {
        prefillCourse = topic.replace(/^(Course:|Blog:)\s*/i, '').trim();
      }

      dynamicFieldsHtml = `
        <div>
          <label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;color:var(--navy);">Course Name *</label>
          <input required name="course_name" value="${esc(prefillCourse)}" placeholder="e.g. AI & Machine Learning, Python, Full Stack" aria-label="Course Name" />
        </div>
        <div>
          <label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;color:var(--navy);">Year *</label>
          <input required name="year" placeholder="e.g. 1st Year, 2nd Year, 3rd Year, 4th Year, Passout" aria-label="Year" />
        </div>
        <div>
          <label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;color:var(--navy);">Stream Name *</label>
          <input required name="stream" placeholder="e.g. CSE, IT, Mechanical, Science, Commerce, Arts" aria-label="Stream Name" />
        </div>
      `;
      messagePlaceholder = "Tell us what you'd like to learn or achieve... (Optional)";
    }

    mc.innerHTML = `
      <button type="button" class="x" aria-label="Close" onclick="closeEnquiryModal()">✕</button>
      <h3 class="d" style="font-size:22px;font-weight:800;color:var(--navy);margin:0 0 2px;">Enquire now</h3>
      <p style="margin:0 0 10px;color:var(--mu);font-size:13.5px;" id="enq-topic">${esc(topic)}</p>
      
      <!-- Anti-spam honeypot field (hidden from real users) -->
      <div style="display:none;" aria-hidden="true">
        <input type="text" name="hp_field" tabindex="-1" autocomplete="off" />
      </div>

      <input type="hidden" name="course_id" value="${esc(courseId || '')}" />
      
      <div>
        <label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;color:var(--navy);">Your Name *</label>
        <input required name="name" placeholder="Full name" aria-label="Your name" />
      </div>

      <div>
        <label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;color:var(--navy);">Phone Number *</label>
        <input required name="phone" type="tel" placeholder="10-digit mobile number" aria-label="Phone number" />
      </div>

      <div>
        <label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;color:var(--navy);">Email (Optional)</label>
        <input name="email" type="email" placeholder="name@example.com" aria-label="Email" />
      </div>

      ${dynamicFieldsHtml}

      <div>
        <label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;color:var(--navy);">Message (Optional)</label>
        <textarea name="message" rows="3" placeholder="${messagePlaceholder}"></textarea>
      </div>

      <button type="submit" id="enq-submit-btn" class="btn" style="justify-content:center;margin-top:4px;">
        Submit Enquiry →
      </button>
    `;
    md.hidden = false;
    const firstInput = mc.querySelector('input[name="name"]');
    if (firstInput) firstInput.focus();
  };

  window.closeEnquiryModal = function() {
    if (md) md.hidden = true;
  };

  if (md) {
    md.addEventListener('click', (e) => {
      if (e.target === md || e.target.closest('.x')) closeEnquiryModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeEnquiryModal();
      closeCourseDrawer();
    }
  });

  if (mc) {
    mc.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('enq-submit-btn');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Submitting...';
      }

      const formData = new FormData(mc);
      const type = mc.dataset.type || 'general';
      const name = formData.get('name') || '';
      const phone = formData.get('phone') || '';
      const email = formData.get('email') || null;
      const note = formData.get('message') || '';
      const course_id = formData.get('course_id') ? Number(formData.get('course_id')) : null;
      const honeypot = formData.get('hp_field') || null;

      let classOrDegree = '';
      const topicEl = document.getElementById('enq-topic');
      const topicText = topicEl ? topicEl.textContent : 'General Enquiry';
      let fullMessage = `[Topic: ${topicText}]`;
      let courseName = '';
      let year = '';
      let stream = '';
      let currentRole = '';

      if (type === 'business' || type === 'institution') {
        const org = formData.get('org') || '';
        const role = formData.get('role') || '';
        classOrDegree = role && org ? `${role} @ ${org}` : (org || role);
        fullMessage += ` [Organization: ${org}] [Role: ${role}]`;
      } else if (type === 'event') {
        currentRole = formData.get('current_role') || '';
        classOrDegree = `Role: ${currentRole}`;
        fullMessage += ` [Current Role: ${currentRole}]`;
      } else if (type === 'school') {
        courseName = formData.get('course_name') || '';
        year = formData.get('year') || '';
        stream = formData.get('stream') || '';
        classOrDegree = stream && year ? `${stream} – ${year}` : (stream || year);
        fullMessage += ` [Program: ${courseName}] [School: ${stream}] [Class: ${year}]`;
      } else {
        courseName = formData.get('course_name') || '';
        year = formData.get('year') || '';
        stream = formData.get('stream') || '';
        classOrDegree = `${stream} – ${year}`.trim();
        fullMessage += ` [Course: ${courseName}] [Year: ${year}] [Stream: ${stream}]`;
      }

      if (note) fullMessage += `\n${note}`;

      try {
        await window.odApi.submitEnquiry({
          name,
          phone,
          email,
          class_or_degree: classOrDegree || null,
          message: fullMessage,
          course_id,
          course_name: courseName || null,
          year: year || null,
          stream_name: stream || null,
          current_role: currentRole || null,
          honeypot
        });

        mc.innerHTML = `
          <button type="button" class="x" aria-label="Close" onclick="closeEnquiryModal()">✕</button>
          <div style="text-align:center;padding:16px 8px;">
            <div style="width:52px;height:52px;border-radius:50%;background:#FAF7F2;color:#68705A;display:grid;place-items:center;font-size:26px;margin:0 auto 14px;font-weight:bold;">✓</div>
            <h3 class="d" style="font-size:22px;color:var(--navy);margin-bottom:8px;">Thank you, ${esc(name)}!</h3>
            <p style="color:var(--mu);margin:0 0 20px;font-size:14px;line-height:1.5;">
              Your enquiry has been received by our counsellors. We will reach out to you at <strong>${esc(phone)}</strong> shortly.
            </p>
            <button type="button" class="btn" onclick="closeEnquiryModal()" style="margin:auto;">Done</button>
          </div>
        `;
        window.toast('Enquiry submitted successfully!');
      } catch (err) {
        alert(err.message || 'Failed to submit enquiry. Please try again.');
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Submit Enquiry →';
        }
      }
    });
  }

  // Global delegate for [data-enq]
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-enq]');
    if (btn) {
      const courseTitle = btn.dataset.enq || '';
      const courseId = btn.dataset.courseId || '';
      const category = btn.dataset.category || (typeof window.currentCategorySlug !== 'undefined' ? window.currentCategorySlug : '') || (new URLSearchParams(window.location.search).get('category') || '');
      const audience = btn.dataset.audience || '';
      openEnquiryModal(courseTitle, courseId, category, audience);
    }
  });

  // Course Detail Drawer
  let drawerEl = document.getElementById('course-drawer');
  let backdropEl = document.getElementById('drawer-backdrop');

  window.openCourseDrawer = async function(courseSlug) {
    if (!drawerEl) {
      drawerEl = document.createElement('div');
      drawerEl.id = 'course-drawer';
      drawerEl.className = 'drawer';
      document.body.appendChild(drawerEl);
    }
    if (!backdropEl) {
      backdropEl = document.createElement('div');
      backdropEl.id = 'drawer-backdrop';
      backdropEl.className = 'drawer-backdrop';
      backdropEl.onclick = closeCourseDrawer;
      document.body.appendChild(backdropEl);
    }

    drawerEl.innerHTML = `
      <div class="skel" style="height:32px;width:70%;margin-bottom:12px;"></div>
      <div class="skel" style="height:20px;width:40%;margin-bottom:20px;"></div>
      <div class="skel" style="height:80px;width:100%;margin-bottom:20px;"></div>
      <div class="skel" style="height:120px;width:100%;"></div>
    `;
    backdropEl.hidden = false;
    drawerEl.classList.add('open');

    const course = await window.odApi.getCourseDetail(courseSlug);
    if (!course) {
      drawerEl.innerHTML = `
        <button type="button" class="x" onclick="closeCourseDrawer()" style="align-self:flex-end;border:0;background:#eee;padding:8px 12px;border-radius:8px;cursor:pointer;">✕</button>
        <p style="color:var(--mu);margin-top:20px;">Course details not found.</p>
      `;
      return;
    }

    const accent = course.category_accent || '#A65A3A';
    const highlightsHtml = course.highlights && course.highlights.length
      ? `<ul style="padding-left:18px;margin:12px 0 20px;color:var(--ink);display:grid;gap:6px;font-size:14px;">
          ${course.highlights.map(h => `<li>${esc(h)}</li>`).join('')}
         </ul>`
      : '<p style="color:var(--mu);font-size:13.5px;">Hands-on curriculum with real-world projects and mentorship.</p>';

    drawerEl.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;">
        <span style="background:${accent};color:#fff;font-weight:700;font-size:12px;padding:4px 12px;border-radius:99px;">
          ${esc(course.category_name || 'Program')}
        </span>
        <button type="button" onclick="closeCourseDrawer()" style="border:0;background:#F7F3EA;color:var(--navy);font-size:16px;width:34px;height:34px;border-radius:50%;cursor:pointer;font-weight:bold;">✕</button>
      </div>

      <h2 style="font-size:24px;font-weight:800;color:var(--navy);margin:0 0 8px;">${esc(course.title)}</h2>
      
      <p style="color:var(--mu);font-size:14px;margin:0 0 16px;">
        <strong style="color:var(--navy)">For:</strong> ${esc(course.target_audience || 'All enthusiastic learners')}
      </p>

      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px;">
        <span style="background:#FAF7F2;padding:6px 12px;border-radius:8px;font-size:13px;font-weight:600;color:var(--navy);">
          ⏱ ${esc(course.duration_formatted || 'Flexible')}
        </span>
        <span style="background:#FAF7F2;padding:6px 12px;border-radius:8px;font-size:13px;font-weight:600;color:var(--navy);text-transform:capitalize;">
          📍 ${esc(course.mode)}
        </span>
        ${course.batch_size ? `<span style="background:#FAF7F2;padding:6px 12px;border-radius:8px;font-size:13px;font-weight:600;color:var(--navy);">👥 ${course.batch_size} seats</span>` : ''}
        ${course.certificate_included ? `<span style="background:#FAF7F2;padding:6px 12px;border-radius:8px;font-size:13px;font-weight:700;color:#68705A;">✓ Certificate Included</span>` : ''}
      </div>

      <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:24px;">
        <span style="font-size:26px;font-weight:800;color:${accent};font-family:'Plus Jakarta Sans';">${esc(course.discount_display || course.price_display)}</span>
        ${course.discount_display ? `<s style="color:var(--mu);font-size:14px;">${esc(course.price_display)}</s>` : ''}
      </div>

      <h4 style="font-size:16px;font-weight:700;color:var(--navy);margin:0 0 6px;">Program Overview</h4>
      <p style="color:var(--mu);font-size:14.5px;line-height:1.6;margin:0 0 20px;">
        ${esc(course.full_description || course.short_description)}
      </p>

      <h4 style="font-size:16px;font-weight:700;color:var(--navy);margin:0 0 6px;">What You Will Learn</h4>
      ${highlightsHtml}

      ${course.prerequisites ? `
        <h4 style="font-size:16px;font-weight:700;color:var(--navy);margin:0 0 6px;">Prerequisites</h4>
        <p style="color:var(--mu);font-size:13.5px;margin:0 0 24px;">${esc(course.prerequisites)}</p>
      ` : ''}

      <div style="margin-top:auto;padding-top:20px;border-top:1px solid var(--ln);">
        <button class="btn" style="width:100%;justify-content:center;background:${accent};" onclick="closeCourseDrawer(); openEnquiryModal('${esc(course.title)}', ${course.id}, '${esc(course.category_slug || '')}', '${esc(course.group_label || course.target_audience || '')}');">
          Enquire for this course →
        </button>
      </div>
    `;
  };

  window.closeCourseDrawer = function() {
    if (drawerEl) drawerEl.classList.remove('open');
    if (backdropEl) backdropEl.hidden = true;
  };

  // Scroll reveal observer
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.rv').forEach(el => io.observe(el));

  // Animated counters observer
  document.querySelectorAll('[data-n]').forEach(el => {
    new IntersectionObserver((entries, obs) => {
      if (!entries[0].isIntersecting) return;
      obs.disconnect();
      const n = +el.dataset.n;
      const s = el.dataset.s || '';
      const t0 = performance.now();
      const dur = reduceMotion ? 1 : 1400;

      function frame(t) {
        const k = Math.min(1, (t - t0) / dur);
        el.textContent = Math.round(n * (1 - Math.pow(1 - k, 3))).toLocaleString() + s;
        if (k < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }, { threshold: 0.5 }).observe(el);
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (menuToggle && navLinks) {
    menuToggle.onclick = () => {
      navLinks.classList.toggle('open');
    };
  }
})();
