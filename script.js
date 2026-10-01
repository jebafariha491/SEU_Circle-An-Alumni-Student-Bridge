/* ================================
   SEU Circle — shared script
   (used across all pages — Student + Alumni side)
   ================================ */

// Generic search filter: hides/shows cards inside a grid container
// based on whether the card's visible text matches the typed query.
function filterCards(gridId, query){
  const grid = document.getElementById(gridId);
  if(!grid) return;
  const q = query.trim().toLowerCase();
  Array.from(grid.children).forEach(card=>{
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(q) ? '' : 'none';
  });
}


function goDashboard(){
  const loggedIn = localStorage.getItem('seu_loggedIn') === 'true';
  if(!loggedIn){
    window.location.href = 'landing.html';   // ← বদলানো হলো
    return;
  }
  const role = localStorage.getItem('seu_role');
  window.location.href = (role === 'alumni') ? 'alumni-dashboard.html' : 'student-dashboard.html';
}

function logout(){
  localStorage.removeItem('seu_loggedIn');
  localStorage.removeItem('seu_role');
  window.location.href = 'landing.html';   // ← বদলানো হলো
}

// Opens/closes the ⚙ settings dropdown — only used on pages still
// on the old top-navbar layout (sidebar pages have Settings/Logout
// as plain links instead, so this is a no-op there).
function toggleSettingsMenu(e){
  e.stopPropagation();
  const dropdown = document.getElementById('settings-dropdown');
  if(dropdown) dropdown.classList.toggle('open');
}

document.addEventListener('click', function(e){
  const menu = document.querySelector('.profile-menu');
  if(menu && !menu.contains(e.target)){
    const dropdown = document.getElementById('settings-dropdown');
    if(dropdown) dropdown.classList.remove('open');
  }
});