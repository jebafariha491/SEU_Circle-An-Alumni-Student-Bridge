const defaultProfile = {
  fullName: "Maliha Rahman",
  headline: "Frontend Developer",
  location: "Dhaka, Bangladesh",
  email: "maliha@example.com",
  phone: "+880 1XXXXXXXXX",
  about:"I am a passionate frontend developer interested in creating clean, responsive and user-friendly web experiences. I enjoy learning new technologies and building practical projects.",
  university: "Southeast University",
  department: "Computer Science & Engineering",
  degree: "B.Sc. in CSE",
  graduation: "2025",
  company: "Optimizely BD",
  designation: "Frontend Developer",
  careerStart: "2025",
  skills: "HTML, CSS, JavaScript, React",
  interests: "Web Development, UI/UX, Technology",
  linkedin: "",
  github: "",
  portfolio: ""
};

const savedProfile =
  localStorage.getItem("profileData");

const profile =
  savedProfile
    ? JSON.parse(savedProfile)
    : defaultProfile;

document.getElementById("profileName").textContent = profile.fullName;
document.getElementById("profileHeadline").textContent = profile.headline;
document.getElementById("profileLocation").textContent = profile.location;
document.getElementById("profileUniversity").textContent = profile.university + " · Alumni";

function createInitials(name) {

  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }

  return (
    words[0][0] +
    words[words.length - 1][0]
  ).toUpperCase();
}

document.getElementById("profileAvatar").textContent =createInitials(profile.fullName);
document.getElementById("profileAbout").textContent = profile.about;
document.getElementById("profileEmail").textContent = profile.email || "—";
document.getElementById("profilePhone").textContent = profile.phone || "—";
document.getElementById("profileContactLocation").textContent = profile.location || "—";
document.getElementById("educationDegree").textContent = profile.degree;
document.getElementById("educationUniversity").textContent = profile.university;
document.getElementById("educationDepartment").textContent =profile.department;
document.getElementById("educationGraduation").textContent =profile.graduation;
document.getElementById("careerDesignation").textContent = profile.designation;
document.getElementById("careerCompany").textContent =profile.company;
document.getElementById("careerStart").textContent = profile.careerStart + " → Present";
document.getElementById("timelineCurrentYear").textContent = profile.careerStart + " → Present";
document.getElementById("timelineCurrentTitle").textContent =profile.designation;
document.getElementById("timelineCurrentCompany").textContent =profile.company;
document.getElementById("timelineEducationDegree").textContent =profile.degree;
document.getElementById("timelineEducationUniversity").textContent =profile.university;

function renderTags(containerId, text) {

  const container =
    document.getElementById(containerId);

  container.innerHTML = "";

  const items =
    (text || "")
      .split(",")
      .map(item => item.trim())
      .filter(item => item !== "");

  items.forEach(item => {

    const tag =
      document.createElement("span");

    tag.className = "skill";

    tag.textContent = item;

    container.appendChild(tag);

  });

}

renderTags(
  "profileSkills",
  profile.skills
);

renderTags(
  "profileInterests",
  profile.interests
);


function setupLink(id, url) {
  const link =
    document.getElementById(id);

  if (url && url.trim() !== "") {
    link.href = url;
    link.style.display = "flex";
  } else {
    link.style.display = "none";
  }
}
setupLink(
  "linkedinLink",
  profile.linkedin
);
setupLink(
  "githubLink",
  profile.github
);
setupLink(
  "portfolioLink",
  profile.portfolio
);

function calculateCompletion() {

  const fields = [
    profile.fullName,
    profile.headline,
    profile.location,
    profile.email,
    profile.phone,
    profile.about,
    profile.university,
    profile.department,
    profile.degree,
    profile.graduation,
    profile.company,
    profile.designation,
    profile.skills,
    profile.interests,
    profile.linkedin,
    profile.github,
    profile.portfolio
  ];

  const completed =
    fields.filter(
      field =>
        field && field.trim() !== ""
    ).length;

  const percentage =
    Math.round(
      (completed / fields.length) * 100
    );

  document.getElementById(
    "completionPercent"
  ).textContent = percentage + "%";

  document.getElementById(
    "completionFill"
  ).style.width = percentage + "%";

}

calculateCompletion();