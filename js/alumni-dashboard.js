/* Load dynamically posted jobs */
function renderPostedJobs(){

  const jobs = JSON.parse(localStorage.getItem('postedJobs')) || [];

  if (jobs.length === 0) return;
  const jobLists = document.querySelectorAll('.dash-list');
  const jobsList = jobLists[1];
  const viewAllRow = jobsList.querySelector('.view-all-row');

  jobs.forEach(job => {
    const statusClass =
      job.status === 'Active'? 'status-job-active': job.status === 'Closed'? 'status-job-closed': 'status-job-pending';
    const row = document.createElement('div');
    row.className = 'dash-row';
    row.innerHTML = `
      <span class="name">${job.title}</span>
      <span class="sub"> ${job.type} · ${job.location} · ${job.applicants} applicants </span>
      <span class="badge ${statusClass}">${job.status}</span>
    `;

    if (viewAllRow) {
      jobsList.insertBefore(row, viewAllRow);
    } else {
      jobsList.appendChild(row);
    }

  });
}

/* Handle referral Accept / Decline */
function setReferralStatus(id, action, button) {
  const row = document.getElementById(id);

  if (!row) {
    console.log("Referral row not found:", id);
    return;
  }

  const acceptButton = row.querySelector(".action-btn.accept");
  const declineButton = row.querySelector(".action-btn.decline");

  if (!acceptButton || !declineButton) {
    console.log("Referral buttons not found");
    return;
  }

  acceptButton.classList.remove("is-active");
  declineButton.classList.remove("is-active");

  if (action === "accept") {

    acceptButton.classList.add("is-active");
    acceptButton.textContent = "Accepted";
    declineButton.textContent = "Decline";

  } else if (action === "decline") {

    declineButton.classList.add("is-active");
    declineButton.textContent = "Declined";
    acceptButton.textContent = "Accept";

  }
}

/* Run when dashboard page loads */
renderPostedJobs();