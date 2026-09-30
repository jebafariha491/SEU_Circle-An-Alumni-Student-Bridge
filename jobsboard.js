
const JOB_PAGE_SIZE = 6;

function getFilterState() {
  return {
    types: Array.from(
      document.querySelectorAll('.f-type:checked')
    ).map(checkbox => checkbox.value),

    departments: Array.from(
      document.querySelectorAll('.f-dept:checked')
    ).map(checkbox => checkbox.value),

    experiences: Array.from(
      document.querySelectorAll('.f-exp:checked')
    ).map(checkbox => checkbox.value),

    company:
      document.getElementById('company-filter')?.value ||
      'All companies',

    search:
      document.getElementById('jobs-search')?.value
        .trim()
        .toLowerCase() || ''
  };
}


function filterJobs() {
  const state = getFilterState();

  const cards = Array.from(
    document.querySelectorAll('.job-card')
  );

  const matchingCards = [];

  cards.forEach(card => {
    const type = card.dataset.type || '';
    const department = card.dataset.department || '';
    const experience = card.dataset.experience || '';
    const text = (card.innerText || '').toLowerCase();

    const typeMatch = state.types.includes(type);
    const departmentMatch = state.departments.includes(department);
    const experienceMatch = state.experiences.includes(experience);

    const companyMatch =
      state.company === 'All companies' ||
      text.includes(state.company.toLowerCase());

    const searchMatch =
      !state.search ||
      text.includes(state.search);

    const matches =
      typeMatch &&
      departmentMatch &&
      experienceMatch &&
      companyMatch &&
      searchMatch;

    if (matches) {
      matchingCards.push(card);
    } else {
      card.classList.add('job-hidden');
    }
  });


  /* Show first 6 or all */

  const showAll = window.jobsShowAll === true;

  matchingCards.forEach((card, index) => {
    if (showAll || index < JOB_PAGE_SIZE) {
      card.classList.remove('job-hidden');
    } else {
      card.classList.add('job-hidden');
    }
  });


  const totalMatching = matchingCards.length;

  const currentlyShown = showAll
    ? totalMatching
    : Math.min(JOB_PAGE_SIZE, totalMatching);

  const resultCount =
    document.getElementById('result-count');

  if (resultCount) {
    resultCount.textContent =
      `${totalMatching} ${
        totalMatching === 1
          ? 'opportunity'
          : 'opportunities'
      }`;
  }


  const noResults =
    document.getElementById('no-results');

  if (noResults) {
    noResults.style.display =
      totalMatching === 0 ? 'block' : 'none';
  }



  const shownCount =
    document.getElementById('jobs-shown-count');

  if (shownCount) {
    shownCount.textContent =
      totalMatching === 0
        ? '0 opportunities shown'
        : `${currentlyShown} of ${totalMatching} opportunities shown`;
  }



  const moreWrap =
    document.getElementById('jobs-more-wrap');

  if (moreWrap) {
    moreWrap.style.display =
      totalMatching > JOB_PAGE_SIZE && !showAll
        ? 'flex'
        : 'none';
  }
}


function toggleMoreJobs() {
  window.jobsShowAll = true;
  filterJobs();
}

window.toggleMoreJobs = toggleMoreJobs;



function clearFilters() {
  document
    .querySelectorAll('.f-type, .f-dept, .f-exp')
    .forEach(checkbox => {
      checkbox.checked = true;
    });

  const companyFilter =
    document.getElementById('company-filter');

  if (companyFilter) {
    companyFilter.value = 'All companies';
  }

  window.jobsShowAll = false;

  filterJobs();
}

window.clearFilters = clearFilters;


function renderJobExtras() {
  let profileSkills = [];

  const raw =
    localStorage.getItem('seu_student_profile');

  if (raw) {
    try {
      const profile = JSON.parse(raw);

      if (profile.skills) {
        profileSkills = profile.skills
          .split(',')
          .map(skill => skill.trim().toLowerCase())
          .filter(Boolean);
      }
    } catch (error) {
      console.warn('Could not read saved profile skills.');
    }
  }


  document.querySelectorAll('.job-card').forEach(card => {
    const slot =
      card.querySelector('[data-badges-slot]');

    if (!slot) {
      return;
    }

    slot.innerHTML = '';


    const jobSkills =
      (card.dataset.skills || '')
        .split(',')
        .map(skill => skill.trim().toLowerCase())
        .filter(Boolean);

    if (jobSkills.length && profileSkills.length) {
      const matchCount =
        jobSkills.filter(skill =>
          profileSkills.includes(skill)
        ).length;

      if (matchCount > 0) {
        const badge =
          document.createElement('span');

        badge.className = 'badge match';
        badge.textContent =
          `${matchCount}/${jobSkills.length} skills match`;

        slot.appendChild(badge);
      }
    }


    const jobId = card.dataset.jobid;

    if (
      jobId &&
      localStorage.getItem(`applied_${jobId}`) === 'true'
    ) {
      const badge =
        document.createElement('span');

      badge.className = 'badge applied';
      badge.textContent = '✓ Applied';

      slot.appendChild(badge);
    }
  });
}


window.addEventListener('DOMContentLoaded', () => {

  const search =
    document.getElementById('jobs-search');

  if (search) {
    search.addEventListener('input', () => {
      window.jobsShowAll = false;
      filterJobs();
    });
  }


  document
    .querySelectorAll('.f-type, .f-dept, .f-exp')
    .forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        window.jobsShowAll = false;
        filterJobs();
      });
    });


  const companyFilter =
    document.getElementById('company-filter');

  if (companyFilter) {
    companyFilter.addEventListener('change', () => {
      window.jobsShowAll = false;
      filterJobs();
    });
  }


  window.jobsShowAll = false;

  filterJobs();
  renderJobExtras();

});

