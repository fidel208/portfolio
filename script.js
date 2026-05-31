const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".links a");

const observerOptions = {
  root: null,
  threshold: 0.6,
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const activeId = entry.target.getAttribute("id");

      navLinks.forEach((link) => link.classList.remove("active"));

      const matchingLink = document.querySelector(
        `.links a[href$="${activeId}"]`,
      );
      if (matchingLink) {
        matchingLink.classList.add("active");
      }
    }
  });
}, observerOptions);

sections.forEach((section) => sectionObserver.observe(section));

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

const menuIcon = document.getElementById("menu-icon");
const navLinksContainer = document.getElementById("nav-links");

if (menuIcon && navLinksContainer) {
  menuIcon.addEventListener("click", () => {
    navLinksContainer.classList.toggle("active-menu");

    if (menuIcon.classList.contains("fa-bars")) {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-xmark");
    } else {
      menuIcon.classList.remove("fa-xmark");
      menuIcon.classList.add("fa-bars");
    }
  });

  const individualLinks = navLinksContainer.querySelectorAll("a");
  individualLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinksContainer.classList.remove("active-menu");
      menuIcon.classList.remove("fa-xmark");
      menuIcon.classList.add("fa-bars");
    });
  });
}

const contactForm = document.querySelector("form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const submitButton = contactForm.querySelector("button[type='submit']");
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    formStatus.textContent = "";
    formStatus.style.opacity = "1";

    emailjs
      .sendForm("service_uu5o7u7", "template_houqf9x", this)
      .then(() => {
        formStatus.style.color = "#10b981";
        formStatus.textContent =
          "Message sent successfully! Thank you for reaching out.";
        contactForm.reset();
      })
      .catch((error) => {
        console.error("Mail Delivery Failure:", error);
        formStatus.style.color = "#ef4444";
        formStatus.textContent =
          "Failed to send message. Please try again or email me directly.";
      })
      .finally(() => {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;

        setTimeout(() => {
          formStatus.style.opacity = "0";
          setTimeout(() => {
            formStatus.textContent = "";
          }, 300);
        }, 5000);
      });
  });
}
