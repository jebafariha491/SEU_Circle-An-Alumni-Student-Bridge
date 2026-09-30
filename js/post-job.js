  function submitJobPost(btn) {

  const titleInput = document.getElementById('pjTitle');
  const companyInput = document.getElementById('pjCompany');
  const locationInput = document.getElementById('pjLocation');
  const descriptionInput = document.getElementById('pjDescription');
  const confirmInput = document.getElementById('pjConfirm');
  const title = titleInput.value.trim();
  const company = companyInput.value.trim();
  const location = locationInput.value.trim();
  const description = descriptionInput.value.trim();
  const selectedType = document.querySelector('input[name="jobType"]:checked');

  // Validation
  if (!title) {
    alert('Please enter the job title.');
    titleInput.focus();
    return;
  }

  if (!company) {
    alert('Please enter the company name.');
    companyInput.focus();
    return;
  }

  if (!location) {
    alert('Please enter the job location.');
    locationInput.focus();
    return;
  }

  if (!selectedType) {
    alert('Please select a job type.');
    return;
  }

  if (!description) {
    alert('Please enter the job description.');
    descriptionInput.focus();
    return;
  }

  if (!confirmInput.checked) {
    alert("Please confirm that this listing is accurate and you're authorized to post it.");
    return;
  }

  // Build job object
  const newJob = {
    title: title,
    company: company,
    location: location,
    type: selectedType.value,
    description: description,
    status: 'Active',
    applicants: 0
  };

  // Get existing jobs
  const existingJobs =
    JSON.parse(localStorage.getItem('postedJobs')) || [];

  // Add new job
  existingJobs.push(newJob);

  // Save to localStorage
  localStorage.setItem(
    'postedJobs',
    JSON.stringify(existingJobs)
  );

  // Update button
  btn.textContent = 'Posted';
  btn.classList.add('posted');
  btn.disabled = true;

  // Go back to dashboard
  setTimeout(() => {
    window.location.href = 'alumni-dashboard.html';
  }, 900);
}

function goToDashboard() {
  window.location.href = 'alumni-dashboard.html';
}