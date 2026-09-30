// ---------- Data (replace with your own, or fetch from an API later) ----------
const GRADE_POINTS = { "A+": 4.0, "A": 3.75, "A-": 3.5, "B+": 3.25, "B": 3.0, "B-": 2.75, "C+": 2.5, "C": 2.25, "D": 2.0, "F": 0 };

const profile = {
  name: "Ayesha Karim",
  program: "BSc in Computer Science and Engineering",
  studentId: "CSE-2022-0417",
  email: "ayesha@example.edu",
  bio: "Final-year student interested in web development and applied machine learning."
};

const courses = [
  { code: "CSE 1101", title: "Structured Programming", semester: "1st year, 1st sem", credits: 3, grade: "A" },
  { code: "CSE 1201", title: "Data Structures", semester: "1st year, 2nd sem", credits: 3, grade: "A-" },
  { code: "CSE 2101", title: "Algorithms", semester: "2nd year, 1st sem", credits: 3, grade: "B+" },
  { code: "CSE 2201", title: "Database Systems", semester: "2nd year, 2nd sem", credits: 3, grade: "A" },
  { code: "CSE 3101", title: "Web Technologies", semester: "3rd year, 1st sem", credits: 3, grade: "A+" },
  { code: "CSE 3201", title: "Operating Systems", semester: "3rd year, 2nd sem", credits: 3, grade: "B" }
];

const skills = [
  { name: "HTML & CSS", level: 85 },
  { name: "JavaScript", level: 70 },
  { name: "Python", level: 75 },
  { name: "SQL", level: 65 }
];

const projects = [
  { title: "Library Management System", desc: "Book search, borrowing records and overdue alerts.", tags: ["PHP", "MySQL"], link: "#" },
  { title: "Portfolio Website", desc: "Responsive personal site with a project gallery.", tags: ["HTML", "CSS", "JavaScript"], link: "#" }
];

// ---------- Helpers ----------
const $ = (id) => document.getElementById(id);

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text; // textContent keeps user input safe
  return node;
}

const STORE_KEY = "studentProfile:v1";

function loadProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));
    if (saved) Object.assign(profile, saved);
  } catch (err) { /* storage unavailable: use defaults */ }
}

function saveProfile() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(profile)); } catch (err) { /* ignore */ }
}

function initials(name) {
  return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

// ---------- Rendering ----------
function renderIdentity() {
  $("name").textContent = profile.name;
  $("program").textContent = profile.program;
  $("studentId").textContent = profile.studentId;
  $("email").textContent = profile.email;
  $("bio").textContent = profile.bio;
  $("avatar").textContent = initials(profile.name);
  document.title = profile.name + " | Student Profile";
}

function renderStats() {
  let points = 0, credits = 0;
  courses.forEach((c) => {
    if (c.grade === "F") return; // failed courses earn no credit
    points += GRADE_POINTS[c.grade] * c.credits;
    credits += c.credits;
  });
  $("cgpa").textContent = credits ? (points / credits).toFixed(2) : "–";
  $("credits").textContent = credits;
  $("courseCount").textContent = courses.length;
  $("projectCount").textContent = projects.length;
}

function renderSemesterOptions() {
  const select = $("semFilter");
  const semesters = [...new Set(courses.map((c) => c.semester))];
  select.append(new Option("All semesters", "all"));
  semesters.forEach((s) => select.append(new Option(s, s)));
  select.addEventListener("change", renderCourses);
}

function renderCourses() {
  const chosen = $("semFilter").value;
  const rows = $("courseRows");
  rows.replaceChildren();
  courses
    .filter((c) => chosen === "all" || c.semester === chosen)
    .forEach((c) => {
      const tr = el("tr");
      tr.append(
        el("td", "", c.code),
        el("td", "", c.title),
        el("td", "", c.semester),
        el("td", "num", String(c.credits)),
        el("td", "num grade", c.grade)
      );
      rows.append(tr);
    });
}

function renderSkills() {
  const list = $("skillList");
  skills.forEach((s) => {
    const li = el("li");
    const bar = el("div", "bar");
    const fill = el("i");
    fill.style.width = s.level + "%";
    bar.append(fill);
    li.append(el("span", "", s.name), bar, el("span", "pct", s.level + "%"));
    list.append(li);
  });
}

function renderProjects() {
  const list = $("projectList");
  projects.forEach((p) => {
    const li = el("li");
    const tags = el("div", "tags");
    p.tags.forEach((t) => tags.append(el("span", "", t)));
    const link = el("a", "", "View project");
    link.href = p.link;
    li.append(el("h3", "", p.title), el("p", "", p.desc), tags, link);
    list.append(li);
  });
}

// ---------- Tabs ----------
function setupTabs() {
  const tabs = document.querySelectorAll('[role="tab"]');
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        const active = t === tab;
        t.setAttribute("aria-selected", active);
        $(t.getAttribute("aria-controls")).hidden = !active;
      });
    });
  });
}

// ---------- Edit dialog ----------
function setupEditDialog() {
  const dialog = $("editDialog");
  const form = $("editForm");

  $("editBtn").addEventListener("click", () => {
    ["name", "program", "studentId", "email", "bio"].forEach((key) => {
      form.elements[key].value = profile[key];
    });
    dialog.showModal();
  });

  $("cancelBtn").addEventListener("click", () => dialog.close());

  form.addEventListener("submit", () => {
    ["name", "program", "studentId", "email", "bio"].forEach((key) => {
      profile[key] = form.elements[key].value.trim();
    });
    saveProfile();
    renderIdentity();
  });
}

// ---------- Start ----------
loadProfile();
renderIdentity();
renderStats();
renderSemesterOptions();
renderCourses();
renderSkills();
renderProjects();
setupTabs();
setupEditDialog();
