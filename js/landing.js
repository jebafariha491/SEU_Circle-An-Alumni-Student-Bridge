let selectedRole = "student";
let authMode = "login";

function switchAuthTab(mode) {

  authMode = mode;

  const tabLogin = document.getElementById("tabLogin");
  const tabSignup = document.getElementById("tabSignup");
  const loginFields = document.getElementById("loginFields");
  const signupFields = document.getElementById("signupFields");


  tabLogin.classList.toggle("active", mode === "login");
  tabSignup.classList.toggle("active",mode === "signup");

  if (mode === "login") {
    loginFields.style.display = "block";
    signupFields.classList.remove("show");
  } else {
    loginFields.style.display = "none";
    signupFields.classList.add("show");
  }
  updateSubmitLabel();
}

function selectRole(role) {

  selectedRole = role;
  const studentButton = document.getElementById("roleStudent");
  const alumniButton =document.getElementById("roleAlumni");
  const extraLabel =document.querySelector("#signupExtraField label");
  const extraInput =document.getElementById("signupExtraInput");

  studentButton.classList.toggle("selected",role === "student");
  alumniButton.classList.toggle("selected", role === "alumni");

  if (role === "student") {
    extraLabel.textContent = "Student ID";
    extraInput.placeholder = "e.g. 2019xxxxxx";
  } else {
    extraLabel.textContent = "Company";
    extraInput.placeholder = "Current employer";
  }

  updateSubmitLabel();
}


function updateSubmitLabel() {

  const label = document.getElementById("submitRoleLabel");
  label.textContent =
    selectedRole === "student" ? "Student" : "Alumni";
}


function handleAuthSubmit() {
  if (authMode === "login") {
    const emailInput = document.getElementById("loginEmail");
    const passwordInput =document.getElementById("loginPassword");
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email === "") {
      alert("Please enter your email.");
      emailInput.focus();
      return;
    }

    if (password === "") {
      alert("Please enter your password.");
      passwordInput.focus();
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      emailInput.focus();
      return;
    }

    // Save the dummy login state so goDashboard()/logout() (in script.js)
    // know who's "logged in" and which dashboard to send them to.
    localStorage.setItem('seu_loggedIn', 'true');
    localStorage.setItem('seu_role', selectedRole);

    if (selectedRole === "student") {
      window.location.href =
        "student-dashboard.html";
    } else {
      window.location.href =
        "alumni-dashboard.html";
    }
    return;
  }


  if (authMode === "signup") {

    const name = document.getElementById("signupName").value.trim();
    const batch =document.getElementById("signupBatch").value.trim();
    const department =document.getElementById("signupDepartment").value.trim();
    const extra =document.getElementById("signupExtraInput").value.trim();
    const email =document.getElementById("signupEmail").value.trim();
    const password =document.getElementById("signupPassword").value.trim();

    if (name === "") {

      alert("Please enter your full name.");

      document
        .getElementById("signupName")
        .focus();
      return;
    }

    if (batch === "") {
      alert("Please enter your batch.");
      document
        .getElementById("signupBatch")
        .focus();
      return;
    }

    if (department === "") {
      alert("Please enter your department.");
      document
        .getElementById("signupDepartment")
        .focus();

      return;
    }

    if (extra === "") {
      if (selectedRole === "student") {
        alert("Please enter your Student ID.");
      } else {
        alert("Please enter your company.");
      }

      document
        .getElementById("signupExtraInput")
        .focus();
      return;
    }

    if (email === "") {
      alert("Please enter your email.");
      document
        .getElementById("signupEmail")
        .focus();
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email address.");

      document
        .getElementById("signupEmail")
        .focus();

      return;
    }

    if (password === "") {
      alert("Please create a password.");
      document
        .getElementById("signupPassword")
        .focus();

      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      document
        .getElementById("signupPassword")
        .focus();
      return;
    }

    // Same as login — save the dummy login state before redirecting,
    // so signing up also counts as being "logged in".
    localStorage.setItem('seu_loggedIn', 'true');
    localStorage.setItem('seu_role', selectedRole);

    if (selectedRole === "student") {
      window.location.href =
        "student-dashboard.html";
    } else {
      window.location.href =
        "alumni-dashboard.html";
    }

  }
}

document.addEventListener(
  "DOMContentLoaded",
  function () {
    switchAuthTab("login");
    selectRole("student");
  }
);