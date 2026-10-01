const defaultProfile = {
  fullName: "Maliha Rahman",
  headline: "Frontend Developer",
  location: "Dhaka, Bangladesh",
  email: "maliha@example.com",
  phone: "+880 1XXXXXXXXX",

  about:
    "I am a Computer Science & Engineering graduate from Southeast University and a passionate Frontend Developer with a strong interest in creating clean, responsive, and user-friendly web experiences. I enjoy turning ideas and designs into functional digital products while continuously exploring new technologies and improving my development skills. I am also interested in UI/UX, modern web technologies, and building practical solutions that provide a smooth user experience. I believe in continuous learning, collaboration, and growing through real-world projects and challenges.",

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


/* =========================================
   GET PROFILE DATA
========================================= */

function getProfileData() {

  const saved =
    localStorage.getItem("profileData");

  if (saved) {

    const profile =
      JSON.parse(saved);

    /* Preserve missing fields from default */

    return {
      ...defaultProfile,
      ...profile
    };
  }

  return {
    ...defaultProfile
  };
}


/* =========================================
   LOAD PROFILE INTO FORM
========================================= */

function loadProfileIntoForm() {

  const profile =
    getProfileData();

  document.getElementById("fullName").value =
    profile.fullName || "";

  document.getElementById("headline").value =
    profile.headline || "";

  document.getElementById("location").value =
    profile.location || "";

  document.getElementById("email").value =
    profile.email || "";

  document.getElementById("phone").value =
    profile.phone || "";

  document.getElementById("about").value =
    profile.about || "";

  document.getElementById("university").value =
    profile.university || "";

  document.getElementById("department").value =
    profile.department || "";

  document.getElementById("degree").value =
    profile.degree || "";

  document.getElementById("graduation").value =
    profile.graduation || "";

  document.getElementById("company").value =
    profile.company || "";

  document.getElementById("designation").value =
    profile.designation || "";

  document.getElementById("careerStart").value =
    profile.careerStart || "";

  document.getElementById("skills").value =
    profile.skills || "";

  document.getElementById("interests").value =
    profile.interests || "";

  document.getElementById("linkedin").value =
    profile.linkedin || "";

  document.getElementById("github").value =
    profile.github || "";

  /*
    Portfolio field may not exist in
    the current form, so check first.
  */

  const portfolioField =
    document.getElementById("portfolio");

  if (portfolioField) {

    portfolioField.value =
      profile.portfolio || "";
  }
}


/* =========================================
   SAVE PROFILE
========================================= */

document
  .getElementById("profileForm")
  .addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      const profileData = {

        fullName:
          document
            .getElementById("fullName")
            .value
            .trim(),

        headline:
          document
            .getElementById("headline")
            .value
            .trim(),

        location:
          document
            .getElementById("location")
            .value
            .trim(),

        email:
          document
            .getElementById("email")
            .value
            .trim(),

        phone:
          document
            .getElementById("phone")
            .value
            .trim(),

        about:
          document
            .getElementById("about")
            .value
            .trim(),

        university:
          document
            .getElementById("university")
            .value
            .trim(),

        department:
          document
            .getElementById("department")
            .value
            .trim(),

        degree:
          document
            .getElementById("degree")
            .value
            .trim(),

        graduation:
          document
            .getElementById("graduation")
            .value
            .trim(),

        company:
          document
            .getElementById("company")
            .value
            .trim(),

        designation:
          document
            .getElementById("designation")
            .value
            .trim(),

        careerStart:
          document
            .getElementById("careerStart")
            .value
            .trim(),

        skills:
          document
            .getElementById("skills")
            .value
            .trim(),

        interests:
          document
            .getElementById("interests")
            .value
            .trim(),

        linkedin:
          document
            .getElementById("linkedin")
            .value
            .trim(),

        github:
          document
            .getElementById("github")
            .value
            .trim(),

        portfolio:
          document.getElementById("portfolio")
            ? document
                .getElementById("portfolio")
                .value
                .trim()
            : ""

      };


      /* Save to localStorage */

      localStorage.setItem(
        "profileData",
        JSON.stringify(profileData)
      );


      /* Go back to profile */

      window.location.href =
        "alumni-profile.html";

    }
  );


/* =========================================
   INITIAL LOAD
========================================= */

loadProfileIntoForm();

