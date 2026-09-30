document.addEventListener('DOMContentLoaded', () => {

  const PROFILE_FIELDS = [
    'name',
    'studentId',
    'batch',
    'department',
    'semester',
    'cgpa',
    'creditsCompleted',
    'bio',
    'skills',
    'research',
    'sector',
    'languages',
    'email',
    'phone',
    'location',
    'resume',
    'linkedin',
    'github'
  ];

  const LIST_FIELDS = [
    'experience',
    'projects',
    'achievements',
    'publications',
    'extracurricular',
    'certifications'
  ];

  /* ---------- profile data ---------- */

  const raw = localStorage.getItem('seu_student_profile');

  let profile = {
    name: 'Misfa Tabassum'
  };

  if (raw) {
    try {
      profile = JSON.parse(raw) || profile;
    } catch (error) {
      console.warn('Could not parse saved profile data.');
    }
  }

  const studentName = String(profile.name || 'Student').trim();
  const firstName = studentName.split(/\s+/)[0] || 'Student';

  const greeting = document.getElementById('greeting');
  const topAvatar = document.getElementById('top-avatar');
  const topName = document.getElementById('top-name');
  const menuName = document.getElementById('menu-name');

  if (greeting) {
    greeting.textContent = `Welcome back, ${firstName}`;
  }

  if (topName) {
    topName.textContent = studentName;
  }

  if (menuName) {
    menuName.textContent = studentName;
  }

  /* ---------- avatar fallback ---------- */

  function makeAvatarFallback(name) {
    const initials = name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(word => word[0])
      .join('')
      .toUpperCase() || 'ST';

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
        <rect width="96" height="96" rx="48" fill="#12364c"/>
        <text
          x="48"
          y="57"
          text-anchor="middle"
          font-family="Arial,sans-serif"
          font-size="29"
          font-weight="700"
          fill="#ffffff"
        >${initials}</text>
      </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  if (topAvatar) {
    topAvatar.src = profile.photo || makeAvatarFallback(studentName);
  }

  /* ---------- profile completion ---------- */

  let filled = PROFILE_FIELDS.filter(field => {
    return (
      profile[field] !== undefined &&
      profile[field] !== null &&
      String(profile[field]).trim() !== ''
    );
  }).length;

  filled += LIST_FIELDS.filter(field => {
    return Array.isArray(profile[field]) && profile[field].length > 0;
  }).length;

  const total = PROFILE_FIELDS.length + LIST_FIELDS.length;

  const completion = total
    ? Math.min(100, Math.round((filled / total) * 100))
    : 0;

  const pctEl = document.getElementById('nudge-pct');
  const fillEl = document.getElementById('nudge-fill');

  if (pctEl) {
    pctEl.textContent = `${completion}%`;
  }

  if (fillEl) {
    requestAnimationFrame(() => {
      fillEl.style.width = `${completion}%`;
    });
  }

  /* ---------- dropdowns ---------- */

  const notificationBtn = document.getElementById('notification-btn');
  const notificationPanel = document.getElementById('notification-panel');

  const profileTrigger = document.getElementById('profile-trigger');
  const profileMenu = document.getElementById('profile-menu');

  function closeNotifications() {
    notificationPanel?.classList.remove('open');
    notificationBtn?.setAttribute('aria-expanded', 'false');
  }

  function closeProfileMenu() {
    profileMenu?.classList.remove('open');
    profileTrigger?.setAttribute('aria-expanded', 'false');
  }

  function closeMenus() {
    closeNotifications();
    closeProfileMenu();
  }

  notificationBtn?.addEventListener('click', event => {
    event.stopPropagation();

    const shouldOpen =
      !notificationPanel?.classList.contains('open');

    closeMenus();

    if (shouldOpen) {
      notificationPanel?.classList.add('open');
      notificationBtn?.setAttribute('aria-expanded', 'true');
    }
  });

  profileTrigger?.addEventListener('click', event => {
    event.stopPropagation();

    const shouldOpen =
      !profileMenu?.classList.contains('open');

    closeMenus();

    if (shouldOpen) {
      profileMenu?.classList.add('open');
      profileTrigger?.setAttribute('aria-expanded', 'true');
    }
  });

  /* ---------- close dropdowns outside ---------- */

  document.addEventListener('click', event => {
    const target = event.target;

    if (
      notificationPanel &&
      notificationBtn &&
      !notificationPanel.contains(target) &&
      !notificationBtn.contains(target)
    ) {
      closeNotifications();
    }

    if (
      profileMenu &&
      profileTrigger &&
      !profileMenu.contains(target) &&
      !profileTrigger.contains(target)
    ) {
      closeProfileMenu();
    }
  });

  /* ---------- profile menu ---------- */

  document.getElementById('my-profile-link')?.addEventListener('click', () => {
    closeMenus();
  });

  document.getElementById('settings-link')?.addEventListener('click', () => {
    window.location.href = 'student-profile.html';
  });

  document.getElementById('logout-link')?.addEventListener('click', event => {
    event.preventDefault();

    if (typeof logout === 'function') {
      logout();
      return;
    }

    localStorage.removeItem('seu_logged_in');
    window.location.href = 'index.html';
  });

  /* ---------- upcoming events ---------- */

  document.getElementById('events-btn')?.addEventListener('click', () => {
    alert(
      'Upcoming Events\n\n' +
      'Career & Internship Fair — Sep 28 — 10:00 AM — On campus\n' +
      'CV Writing Workshop — Oct 02 — 3:00 PM — Online\n' +
      'Alumni Networking Night — Oct 08 — 6:00 PM — On campus'
    );
  });

  /* ---------- keyboard ---------- */

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenus();
    }
  });

});