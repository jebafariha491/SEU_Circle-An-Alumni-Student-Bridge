/* =========================================
   SEU CIRCLE — ALUMNI JOB DETAILS
========================================= */


/* =========================================
   ALUMNI / JOB DATA
========================================= */

const jobData = {

  name: "Maliha Rahman",

  initials: "MR",

  title: "Frontend Developer",

  company: "Optimizely",

  type: "Full-time",

  location: "Dhaka, Bangladesh",

  batch: "Batch 48",

  department: "CSE",

  referral: true,

  /*
    Replace these two values with your
    actual contact information.
  */

  email: "maliha@example.com",

  phone: "+880 1XXXXXXXXX",

  linkedin: "https://linkedin.com/",

  skills: [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Git",
    "Responsive Design",
    "REST API"
  ]

};


/* =========================================
   HELPER
========================================= */

function setText(id, value) {

  const element = document.getElementById(id);

  if (element) {
    element.textContent = value;
  }

}


/* =========================================
   RENDER BASIC INFORMATION
========================================= */

function renderJobData() {

  /* Header */

  setText(
    "jobAvatar",
    jobData.initials
  );

  setText(
    "jobTitle",
    jobData.title
  );

  setText(
    "jobCompany",
    jobData.company
  );

  setText(
    "jobType",
    jobData.type
  );

  setText(
    "jobLocation",
    jobData.location
  );


  /* Overview */

  setText(
    "overviewTitle",
    jobData.title
  );

  setText(
    "overviewCompany",
    jobData.company
  );

  setText(
    "overviewType",
    jobData.type
  );

  setText(
    "overviewLocation",
    jobData.location
  );


  /* Contact card */

  setText(
    "contactAvatar",
    jobData.initials
  );

  setText(
    "contactName",
    jobData.name
  );


  /* Modal */

  setText(
    "modalAvatar",
    jobData.initials
  );

  setText(
    "modalName",
    jobData.name
  );

  setText(
    "emailText",
    jobData.email
  );

  setText(
    "phoneText",
    jobData.phone
  );


  /* Referral */

  const referralBadge =
    document.getElementById("referralBadge");

  if (referralBadge) {

    if (jobData.referral) {

      referralBadge.textContent =
        "Open to Referrals";

      referralBadge.style.display =
        "block";

    } else {

      referralBadge.style.display =
        "none";

    }

  }

}


/* =========================================
   RENDER SKILLS
========================================= */

function renderSkills() {

  const skillsList =
    document.getElementById("skillsList");

  if (!skillsList) {
    return;
  }

  skillsList.innerHTML = "";

  jobData.skills.forEach(function(skillName) {

    const skill =
      document.createElement("span");

    skill.className = "skill";

    skill.textContent = skillName;

    skillsList.appendChild(skill);

  });

}


/* =========================================
   CONTACT LINKS
========================================= */

function setupContactLinks() {

  const emailLink =
    document.getElementById("emailLink");

  const phoneLink =
    document.getElementById("phoneLink");

  const linkedinLink =
    document.getElementById("linkedinLink");


  /* Email */

  if (emailLink) {

    emailLink.href =
      "mailto:" + jobData.email;

  }


  /* Phone */

  if (phoneLink) {

    const cleanPhone =
      jobData.phone.replace(/\s+/g, "");

    phoneLink.href =
      "tel:" + cleanPhone;

  }


  /* LinkedIn */

  if (linkedinLink) {

    linkedinLink.href =
      jobData.linkedin;

  }

}


/* =========================================
   CONTACT MODAL
========================================= */

function setupContactModal() {

  const contactBtn =
    document.getElementById("contactBtn");

  const contactModal =
    document.getElementById("contactModal");

  const contactOverlay =
    document.getElementById("contactOverlay");

  const closeContact =
    document.getElementById("closeContact");


  if (!contactBtn || !contactModal) {
    return;
  }


  /* Open modal */

  contactBtn.addEventListener(
    "click",
    function() {

      contactModal.classList.add("show");

      contactModal.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.style.overflow =
        "hidden";

    }
  );


  /* Close function */

  function closeModal() {

    contactModal.classList.remove(
      "show"
    );

    contactModal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow =
      "";

  }


  /* Close button */

  if (closeContact) {

    closeContact.addEventListener(
      "click",
      closeModal
    );

  }


  /* Click outside */

  if (contactOverlay) {

    contactOverlay.addEventListener(
      "click",
      closeModal
    );

  }


  /* ESC */

  document.addEventListener(
    "keydown",
    function(event) {

      if (
        event.key === "Escape" &&
        contactModal.classList.contains("show")
      ) {

        closeModal();

      }

    }
  );

}


/* =========================================
   COPY EMAIL
========================================= */

function setupCopyEmail() {

  const copyButton =
    document.getElementById("copyEmail");

  const copyMessage =
    document.getElementById("copyMessage");


  if (!copyButton) {
    return;
  }


  copyButton.addEventListener(
    "click",
    async function() {

      try {

        await navigator.clipboard.writeText(
          jobData.email
        );

        if (copyMessage) {

          copyMessage.textContent =
            "Email copied successfully.";

        }

      } catch (error) {

        /*
          Fallback for browsers where
          clipboard API is unavailable.
        */

        const tempInput =
          document.createElement("input");

        tempInput.value =
          jobData.email;

        document.body.appendChild(
          tempInput
        );

        tempInput.select();

        document.execCommand("copy");

        document.body.removeChild(
          tempInput
        );

        if (copyMessage) {

          copyMessage.textContent =
            "Email copied successfully.";

        }

      }


      setTimeout(
        function() {

          if (copyMessage) {

            copyMessage.textContent =
              "";

          }

        },
        2500
      );

    }
  );

}


/* =========================================
   INITIALIZE PAGE
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    renderJobData();

    renderSkills();

    setupContactLinks();

    setupContactModal();

    setupCopyEmail();

  }
);