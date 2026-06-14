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

    const userNumber = document.getElementById("number").value.trim();
    const userName = document.getElementById("user_name").value.trim();

    emailjs
      .sendForm("service_uu5o7u7", "template_houqf9x", this)
      .then(() => {
        formStatus.style.color = "#10b981";
        formStatus.textContent =
          "Message sent successfully! Thank you for reaching out.";

        if (userNumber) {
          fetch("https://portfolio-backend-op78.onrender.com/api/portfolio-contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userNumber: userNumber,
              userName: userName,
            }),
          })
            .then((res) => res.json())
            .then((data) => console.log("SMS API Triggered:", data))
            .catch((err) =>
              console.error("SMS Microservice Connection Error:", err),
            );
        }
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
