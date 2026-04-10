/* ═══════════════════════════════════════════════════════════════
   PORTFOLIO JS – Md Arshad Ansari - FIXED VERSION
   Contact form EmailJS working + all animations restored
   ═══════════════════════════════════════════════════════════════ */

// Wait for DOM
document.addEventListener("DOMContentLoaded", function () {

  /* DARK MODE TOGGLE */
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle.addEventListener("click", function () {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
  });

  /* MOBILE MENU */
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  menuToggle.addEventListener("click", function () {
    menuToggle.classList.toggle("active");
    mobileMenu.classList.toggle("open");
  });
  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      mobileMenu.classList.remove("open");
    });
  });

  /* NAVBAR SCROLL */
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  /* SCROLL REVEAL */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  /* SKILL BARS */
  let skillsAnimated = false;
  const skillObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !skillsAnimated) {
      skillsAnimated = true;
      document.querySelectorAll(".skill-fill").forEach(bar => {
        const width = bar.dataset.width;
        bar.style.width = width + "%";
      });
    }
  }, { threshold: 0.2 });
  document.getElementById("skills")?.addEventListener("scroll", () => skillObserver.observe(document.getElementById("skills")));

  /* NAV HIGHLIGHT */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, { rootMargin: "-30% 0px -70% 0px" });
  sections.forEach(section => navObserver.observe(section));

  /* CONTACT FORM EMAILJS - FIXED */
  const initContactForm = () => {
    if (typeof emailjs === "undefined") {
      setTimeout(initContactForm, 250);
      return;
    }
    
    emailjs.init("w7LOWHYnWb-1TK6fY");
    console.log("✅ EmailJS loaded & form ready");
    
    const form = document.getElementById("contact-form");
    const btn = form.querySelector('button[type="submit"]');
    
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const nameField = document.getElementById("name");
      const emailField = document.getElementById("email"); 
      const messageField = document.getElementById("message");
      
      const name = nameField.value.trim();
      const email = emailField.value.trim();
      const message = messageField.value.trim();
      
      console.log("Form values:", {name, email, message}); // DEBUG
      
      if (!name || !email || !message) {
        return alert(`Please fill all fields. Debug: name="${name}", email="${email}", message="${message.length}"`);
      }
      
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return alert("Please enter a valid email");
      }
      
      const original = btn.textContent;
      btn.textContent = "Sending...";
      btn.disabled = true;
      
      emailjs.sendForm("service_vl5w7em", "template_m9yejml", form)
        .then(() => {
          alert("Message sent successfully! 🎉");
          form.reset();
        })
        .catch((error) => {
          console.error("EmailJS Error:", error);
          alert("Failed to send. Try again or email me directly.");
        })
        .finally(() => {
          btn.textContent = original;
          btn.disabled = false;
        });
    });
  };
  
  initContactForm();
  
});

console.log("Portfolio script loaded successfully");
