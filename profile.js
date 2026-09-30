/* =========================================================
   SEU CIRCLE — STUDENT PROFILE
   Profile page JavaScript
   ========================================================= */


/* =========================================================
   BASIC HELPERS
   ========================================================= */

function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

function qsa(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}


/* =========================================================
   PROFILE EDIT MODE
   ========================================================= */

function toggleEditMode() {

  const profileView = qs("#profile-view");
  const profileEdit = qs("#profile-edit");

  if (!profileView || !profileEdit) {
    return;
  }

  const isEditing =
    profileEdit.classList.contains("active");

  if (isEditing) {

    profileEdit.classList.remove("active");
    profileView.classList.add("active");

  } else {

    profileView.classList.remove("active");
    profileEdit.classList.add("active");

  }
}


/* =========================================================
   CANCEL EDIT
   ========================================================= */

function cancelEdit() {

  const profileView = qs("#profile-view");
  const profileEdit = qs("#profile-edit");

  if (!profileView || !profileEdit) {
    return;
  }

  profileEdit.classList.remove("active");
  profileView.classList.add("active");

}


/* =========================================================
   PROFILE FORM SUBMIT
   ========================================================= */

function saveProfile(event) {

  if (event) {
    event.preventDefault();
  }

  const form =
    qs("#profile-form");

  if (!form) {
    return;
  }

  const formData =
    new FormData(form);


  /*
   * Update visible profile fields when
   * matching elements are available.
   */

  const fullName =
    formData.get("full_name");

  const headline =
    formData.get("headline");

  const email =
    formData.get("email");

  const phone =
    formData.get("phone");

  const location =
    formData.get("location");

  const about =
    formData.get("about");


  if (fullName) {

    qsa("[data-profile-name]")
      .forEach(element => {
        element.textContent = fullName;
      });

  }


  if (headline) {

    qsa("[data-profile-headline]")
      .forEach(element => {
        element.textContent = headline;
      });

  }


  if (email) {

    qsa("[data-profile-email]")
      .forEach(element => {
        element.textContent = email;
      });

  }


  if (phone) {

    qsa("[data-profile-phone]")
      .forEach(element => {
        element.textContent = phone;
      });

  }


  if (location) {

    qsa("[data-profile-location]")
      .forEach(element => {
        element.textContent = location;
      });

  }


  if (about) {

    qsa("[data-profile-about]")
      .forEach(element => {
        element.textContent = about;
      });

  }


  /*
   * Save a small profile object locally so that
   * the profile information survives page refresh.
   */

  const profileData = {

    full_name:
      fullName || "",

    headline:
      headline || "",

    email:
      email || "",

    phone:
      phone || "",

    location:
      location || "",

    about:
      about || ""

  };


  try {

    localStorage.setItem(
      "seu_student_profile",
      JSON.stringify(profileData)
    );

  } catch (error) {

    console.warn(
      "Unable to save profile data.",
      error
    );

  }


  cancelEdit();

}


/* =========================================================
   LOAD SAVED PROFILE
   ========================================================= */

function loadSavedProfile() {

  let rawProfile = null;

  try {

    rawProfile =
      localStorage.getItem(
        "seu_student_profile"
      );

  } catch (error) {

    return;

  }


  if (!rawProfile) {
    return;
  }


  let profile = null;

  try {

    profile =
      JSON.parse(rawProfile);

  } catch (error) {

    return;

  }


  if (!profile) {
    return;
  }


  /*
   * Fill edit fields.
   */

  const fieldMap = {

    full_name:
      '[name="full_name"]',

    headline:
      '[name="headline"]',

    email:
      '[name="email"]',

    phone:
      '[name="phone"]',

    location:
      '[name="location"]',

    about:
      '[name="about"]'

  };


  Object.keys(fieldMap)
    .forEach(key => {

      const field =
        qs(fieldMap[key]);

      if (
        field &&
        profile[key] !== undefined
      ) {

        field.value =
          profile[key];

      }

    });


  /*
   * Update visible profile fields.
   */

  if (profile.full_name) {

    qsa("[data-profile-name]")
      .forEach(element => {
        element.textContent =
          profile.full_name;
      });

  }


  if (profile.headline) {

    qsa("[data-profile-headline]")
      .forEach(element => {
        element.textContent =
          profile.headline;
      });

  }


  if (profile.email) {

    qsa("[data-profile-email]")
      .forEach(element => {
        element.textContent =
          profile.email;
      });

  }


  if (profile.phone) {

    qsa("[data-profile-phone]")
      .forEach(element => {
        element.textContent =
          profile.phone;
      });

  }


  if (profile.location) {

    qsa("[data-profile-location]")
      .forEach(element => {
        element.textContent =
          profile.location;
      });

  }


  if (profile.about) {

    qsa("[data-profile-about]")
      .forEach(element => {
        element.textContent =
          profile.about;
      });

  }

}


/* =========================================================
   AVATAR UPLOAD
   ========================================================= */

function handleAvatarUpload(event) {

  const file =
    event.target.files &&
    event.target.files[0];

  if (!file) {
    return;
  }


  if (!file.type.startsWith("image/")) {

    alert(
      "Please select an image file."
    );

    event.target.value = "";

    return;

  }


  const reader =
    new FileReader();


  reader.onload =
    function () {

      qsa(
        "[data-profile-avatar]"
      )
      .forEach(
        image => {

          image.src =
            reader.result;

        }
      );


      try {

        localStorage.setItem(
          "seu_student_avatar",
          reader.result
        );

      } catch (error) {

        console.warn(
          "Avatar could not be saved.",
          error
        );

      }

    };


  reader.readAsDataURL(file);

}


/* =========================================================
   LOAD SAVED AVATAR
   ========================================================= */

function loadSavedAvatar() {

  let avatar = null;

  try {

    avatar =
      localStorage.getItem(
        "seu_student_avatar"
      );

  } catch (error) {

    return;

  }


  if (!avatar) {
    return;
  }


  qsa(
    "[data-profile-avatar]"
  )
  .forEach(
    image => {

      image.src =
        avatar;

    }
  );

}


/* =========================================================
   ADD / REMOVE EXPERIENCE
   ========================================================= */

function addExperience() {

  const container =
    qs("#experience-list");

  if (!container) {
    return;
  }


  const item =
    document.createElement("div");

  item.className =
    "profile-repeat-item";


  item.innerHTML = `
    <div class="repeat-item-header">
      <strong>New Experience</strong>

      <button
        type="button"
        class="remove-repeat-item"
        data-remove-experience
      >
        Remove
      </button>
    </div>

    <div class="profile-form-grid">

      <div class="profile-field">
        <label>Job Title</label>

        <input
          type="text"
          name="experience_title[]"
          placeholder="e.g. Software Engineer"
        >
      </div>

      <div class="profile-field">
        <label>Company</label>

        <input
          type="text"
          name="experience_company[]"
          placeholder="Company name"
        >
      </div>

      <div class="profile-field">
        <label>Start Date</label>

        <input
          type="text"
          name="experience_start[]"
          placeholder="Jan 2025"
        >
      </div>

      <div class="profile-field">
        <label>End Date</label>

        <input
          type="text"
          name="experience_end[]"
          placeholder="Present"
        >
      </div>

    </div>

    <div class="profile-field">
      <label>Description</label>

      <textarea
        name="experience_description[]"
        rows="3"
        placeholder="Describe your responsibilities..."
      ></textarea>
    </div>
  `;


  container.appendChild(item);

}


function removeExperience(button) {

  const item =
    button.closest(
      ".profile-repeat-item"
    );

  if (item) {
    item.remove();
  }

}


/* =========================================================
   ADD / REMOVE PROJECT
   ========================================================= */

function addProject() {

  const container =
    qs("#projects-list");

  if (!container) {
    return;
  }


  const item =
    document.createElement("div");

  item.className =
    "profile-repeat-item";


  item.innerHTML = `
    <div class="repeat-item-header">
      <strong>New Project</strong>

      <button
        type="button"
        class="remove-repeat-item"
        data-remove-project
      >
        Remove
      </button>
    </div>

    <div class="profile-form-grid">

      <div class="profile-field">
        <label>Project Name</label>

        <input
          type="text"
          name="project_name[]"
          placeholder="Project name"
        >
      </div>

      <div class="profile-field">
        <label>Project Link</label>

        <input
          type="url"
          name="project_link[]"
          placeholder="https://..."
        >
      </div>

    </div>

    <div class="profile-field">
      <label>Description</label>

      <textarea
        name="project_description[]"
        rows="3"
        placeholder="Describe the project..."
      ></textarea>
    </div>
  `;


  container.appendChild(item);

}


function removeProject(button) {

  const item =
    button.closest(
      ".profile-repeat-item"
    );

  if (item) {
    item.remove();
  }

}


/* =========================================================
   ADD / REMOVE CERTIFICATION
   ========================================================= */

function addCertification() {

  const container =
    qs("#certifications-list");

  if (!container) {
    return;
  }


  const item =
    document.createElement("div");

  item.className =
    "profile-repeat-item";


  item.innerHTML = `
    <div class="repeat-item-header">
      <strong>New Certification</strong>

      <button
        type="button"
        class="remove-repeat-item"
        data-remove-certification
      >
        Remove
      </button>
    </div>

    <div class="profile-form-grid">

      <div class="profile-field">
        <label>Certification</label>

        <input
          type="text"
          name="certification_name[]"
          placeholder="Certification name"
        >
      </div>

      <div class="profile-field">
        <label>Issuer</label>

        <input
          type="text"
          name="certification_issuer[]"
          placeholder="Issuing organization"
        >
      </div>

      <div class="profile-field">
        <label>Issue Date</label>

        <input
          type="text"
          name="certification_date[]"
          placeholder="2026"
        >
      </div>

      <div class="profile-field">
        <label>Credential URL</label>

        <input
          type="url"
          name="certification_url[]"
          placeholder="https://..."
        >
      </div>

    </div>
  `;


  container.appendChild(item);

}


function removeCertification(button) {

  const item =
    button.closest(
      ".profile-repeat-item"
    );

  if (item) {
    item.remove();
  }

}


/* =========================================================
   ADD / REMOVE ACHIEVEMENT
   ========================================================= */

function addAchievement() {

  const container =
    qs("#achievements-list");

  if (!container) {
    return;
  }


  const item =
    document.createElement("div");

  item.className =
    "profile-repeat-item";


  item.innerHTML = `
    <div class="repeat-item-header">
      <strong>New Achievement</strong>

      <button
        type="button"
        class="remove-repeat-item"
        data-remove-achievement
      >
        Remove
      </button>
    </div>

    <div class="profile-field">

      <label>Achievement</label>

      <input
        type="text"
        name="achievement[]"
        placeholder="Describe your achievement"
      >

    </div>
  `;


  container.appendChild(item);

}


function removeAchievement(button) {

  const item =
    button.closest(
      ".profile-repeat-item"
    );

  if (item) {
    item.remove();
  }

}


/* =========================================================
   ADD / REMOVE PUBLICATION
   ========================================================= */

function addPublication() {

  const container =
    qs("#publications-list");

  if (!container) {
    return;
  }


  const item =
    document.createElement("div");

  item.className =
    "profile-repeat-item";


  item.innerHTML = `
    <div class="repeat-item-header">
      <strong>New Publication</strong>

      <button
        type="button"
        class="remove-repeat-item"
        data-remove-publication
      >
        Remove
      </button>
    </div>

    <div class="profile-form-grid">

      <div class="profile-field">
        <label>Title</label>

        <input
          type="text"
          name="publication_title[]"
          placeholder="Publication title"
        >
      </div>

      <div class="profile-field">
        <label>Journal / Conference</label>

        <input
          type="text"
          name="publication_venue[]"
          placeholder="Journal or conference"
        >
      </div>

      <div class="profile-field">
        <label>Year</label>

        <input
          type="text"
          name="publication_year[]"
          placeholder="2026"
        >
      </div>

      <div class="profile-field">
        <label>Link</label>

        <input
          type="url"
          name="publication_url[]"
          placeholder="https://..."
        >
      </div>

    </div>
  `;


  container.appendChild(item);

}


function removePublication(button) {

  const item =
    button.closest(
      ".profile-repeat-item"
    );

  if (item) {
    item.remove();
  }

}


/* =========================================================
   SKILL MANAGEMENT
   ========================================================= */

function addSkill() {

  const input =
    qs("#skill-input");

  const skillList =
    qs("#skills-list");

  if (!input || !skillList) {
    return;
  }


  const value =
    input.value.trim();


  if (!value) {
    return;
  }


  const skill =
    document.createElement("span");

  skill.className =
    "skill-chip";


  skill.innerHTML = `
    <span>${escapeHtml(value)}</span>

    <button
      type="button"
      class="remove-skill"
      aria-label="Remove skill"
    >
      ×
    </button>
  `;


  skillList.appendChild(skill);


  input.value = "";

  input.focus();

}


function removeSkill(button) {

  const skill =
    button.closest(
      ".skill-chip"
    );

  if (skill) {
    skill.remove();
  }

}


/* =========================================================
   SAFE HTML
   ========================================================= */

function escapeHtml(value) {

  const div =
    document.createElement("div");

  div.textContent =
    value;

  return div.innerHTML;

}


/* =========================================================
   PROFILE COMPLETENESS
   ========================================================= */

function updateProfileCompleteness() {

  const fields = [

    '[name="full_name"]',
    '[name="headline"]',
    '[name="email"]',
    '[name="phone"]',
    '[name="location"]',
    '[name="about"]'

  ];


  let completed = 0;


  fields.forEach(
    selector => {

      const field =
        qs(selector);

      if (
        field &&
        field.value.trim()
      ) {

        completed++;

      }

    }
  );


  const percentage =
    Math.round(
      (
        completed /
        fields.length
      ) * 100
    );


  qsa(
    "[data-profile-completeness]"
  )
  .forEach(
    element => {

      element.textContent =
        percentage + "%";

    }
  );


  qsa(
    "[data-profile-progress]"
  )
  .forEach(
    element => {

      element.style.width =
        percentage + "%";

    }
  );

}


/* =========================================================
   EVENT DELEGATION
   ========================================================= */

function setupEventDelegation() {

  document.addEventListener(
    "click",
    function(event) {

      const target =
        event.target;


      /*
       * Edit profile
       */

      if (
        target.closest(
          "[data-action='edit-profile']"
        )
      ) {

        event.preventDefault();

        toggleEditMode();

        return;

      }


      /*
       * Cancel edit
       */

      if (
        target.closest(
          "[data-action='cancel-edit']"
        )
      ) {

        event.preventDefault();

        cancelEdit();

        return;

      }


      /*
       * Add experience
       */

      if (
        target.closest(
          "[data-action='add-experience']"
        )
      ) {

        event.preventDefault();

        addExperience();

        return;

      }


      /*
       * Remove experience
       */

      if (
        target.closest(
          "[data-remove-experience]"
        )
      ) {

        event.preventDefault();

        removeExperience(
          target.closest(
            "[data-remove-experience]"
          )
        );

        return;

      }


      /*
       * Add project
       */

      if (
        target.closest(
          "[data-action='add-project']"
        )
      ) {

        event.preventDefault();

        addProject();

        return;

      }


      /*
       * Remove project
       */

      if (
        target.closest(
          "[data-remove-project]"
        )
      ) {

        event.preventDefault();

        removeProject(
          target.closest(
            "[data-remove-project]"
          )
        );

        return;

      }


      /*
       * Add certification
       */

      if (
        target.closest(
          "[data-action='add-certification']"
        )
      ) {

        event.preventDefault();

        addCertification();

        return;

      }


      /*
       * Remove certification
       */

      if (
        target.closest(
          "[data-remove-certification]"
        )
      ) {

        event.preventDefault();

        removeCertification(
          target.closest(
            "[data-remove-certification]"
          )
        );

        return;

      }


      /*
       * Add achievement
       */

      if (
        target.closest(
          "[data-action='add-achievement']"
        )
      ) {

        event.preventDefault();

        addAchievement();

        return;

      }


      /*
       * Remove achievement
       */

      if (
        target.closest(
          "[data-remove-achievement]"
        )
      ) {

        event.preventDefault();

        removeAchievement(
          target.closest(
            "[data-remove-achievement]"
          )
        );

        return;

      }


      /*
       * Add publication
       */

      if (
        target.closest(
          "[data-action='add-publication']"
        )
      ) {

        event.preventDefault();

        addPublication();

        return;

      }


      /*
       * Remove publication
       */

      if (
        target.closest(
          "[data-remove-publication]"
        )
      ) {

        event.preventDefault();

        removePublication(
          target.closest(
            "[data-remove-publication]"
          )
        );

        return;

      }


      /*
       * Remove skill
       */

      if (
        target.closest(
          ".remove-skill"
        )
      ) {

        event.preventDefault();

        removeSkill(
          target.closest(
            ".remove-skill"
          )
        );

      }

    }
  );

}


/* =========================================================
   FORM EVENTS
   ========================================================= */

function setupFormEvents() {

  const form =
    qs("#profile-form");


  if (form) {

    form.addEventListener(
      "submit",
      saveProfile
    );


    form.addEventListener(
      "input",
      function() {

        updateProfileCompleteness();

      }
    );

  }


  /*
   * Avatar input
   */

  const avatarInput =
    qs("#avatar-upload");


  if (avatarInput) {

    avatarInput.addEventListener(
      "change",
      handleAvatarUpload
    );

  }


  /*
   * Skill input
   */

  const skillInput =
    qs("#skill-input");


  if (skillInput) {

    skillInput.addEventListener(
      "keydown",
      function(event) {

        if (
          event.key === "Enter"
        ) {

          event.preventDefault();

          addSkill();

        }

      }
    );

  }

}


/* =========================================================
   NAVIGATION HELPERS
   ========================================================= */

function goDashboard() {

  window.location.href =
    "dashboard.html";

}


function goJobs() {

  window.location.href =
    "jobs.html";

}


function goAlumni() {

  window.location.href =
    "alumni-directory.html";

}


function goStories() {

  window.location.href =
    "success-stories.html";

}


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    setupEventDelegation();

    setupFormEvents();

    loadSavedProfile();

    loadSavedAvatar();

    updateProfileCompleteness();

  }
);