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

const contactForm = document.querySelector("form");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    const nameInput = document.getElementById("name").value;

    alert(
      `Thank you for reaching out, ${nameInput}! Your message has been sent successfully.`,
    );
  });
}
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
