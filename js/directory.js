function applyFilters() {

  const searchInput = document.getElementById("searchInput");
  const batchInput = document.getElementById("batchInput");
  const searchText = searchInput.value.trim().toLowerCase();
  const batchText = batchInput.value.trim() .toLowerCase();

  /* ================= DEPARTMENT ================= */
  const checkedDepts = Array.from(
    document.querySelectorAll(".filter-dept:checked")
  ).map(cb => cb.value);

  /* ================= AVAILABILITY ================= */
  const referralOnly =
    document.getElementById("filterReferral").checked;
  const mentorOnly =
    document.getElementById("filterMentor").checked;

  /* ================= CARDS ================= */
  const cards = document.querySelectorAll(".alumni-card");
  let visibleCount = 0;
  cards.forEach(card => {
    const dept = card.dataset.dept.toLowerCase();
    const batch = card.dataset.batch.toLowerCase();
    const isReferral = card.dataset.referral === "yes";
    const isMentor = card.dataset.mentor === "yes";
    const cardText = card.textContent.toLowerCase();
    let visible = true;

    /* Search */
    if (
      searchText && !cardText.includes(searchText)
    ) {
      visible = false;
    }
    /* Department */
    if (
      checkedDepts.length > 0 && !checkedDepts.includes(card.dataset.dept)
    ) {
      visible = false;
    }
    /* Batch */
    if (
      batchText &&
      !batch.includes(batchText)
    ) {
      visible = false;
    }
    /* Referral */
    if (
      referralOnly &&!isReferral
    ) {
      visible = false;
    }
    /* Mentoring */
    if (
      mentorOnly && !isMentor
    ) {
      visible = false;
    }
    /* Show / Hide */
    card.style.display = visible ? "" : "none";

    if (visible) {
      visibleCount++;
    }
  });

  updateResultCount(visibleCount);
  updateEmptyState(visibleCount);
}

function updateResultCount(count) {
  const resultCount = document.getElementById("resultCount");
  resultCount.textContent = count; 
}

function updateEmptyState(count) {

  const emptyState = document.getElementById("emptyState");
  const alumniGrid = document.getElementById("alumniGrid");

  if (count === 0) {
    emptyState.style.display = "block";
    alumniGrid.style.display = "none";
  } else {
    emptyState.style.display = "none";
    alumniGrid.style.display = "grid";
  } 
}

function clearFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("batchInput").value = "";
  document.querySelectorAll(".filter-dept").forEach(checkbox => {checkbox.checked = false;});
  document.getElementById("filterReferral").checked = false;
  document.getElementById("filterMentor").checked = false;

  applyFilters();

}

document.addEventListener("DOMContentLoaded", function () {

  const cards = document.querySelectorAll(".alumni-card");
  updateResultCount(cards.length);
  updateEmptyState(cards.length);
});