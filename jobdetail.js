const JOB_ID = 'Frontend-dev';

function applyNow(){
  localStorage.setItem('applied_' + JOB_ID, 'true');
  window.location.href = 'application.html';
}