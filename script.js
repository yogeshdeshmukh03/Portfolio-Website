document.addEventListener("DOMContentLoaded", () => {

  // ✅ Typing
  const text = "Yogesh Deshmukh";
  const el = document.querySelector(".typing");
  if (el) {
    el.textContent = "";
    let i = 0;
    (function type(){
      if (i < text.length){
        el.textContent += text.charAt(i++);
        setTimeout(type, 90);
      }
    })();
  }

  // ✅ Reveal (never blank)
  const revealEls = document.querySelectorAll(".reveal");
  revealEls.forEach(el => el.classList.add("is-hidden"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("is-hidden");
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // fallback
    revealEls.forEach(el => {
      el.classList.remove("is-hidden");
      el.classList.add("active");
    });
  }

});

  // ✅ Mobile Navbar Toggle
 const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // click link -> close menu
  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}
 // outside click -> close menu
    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        navLinks.classList.remove("open");
      }
    });
  


const form = document.getElementById("contactForm");

const SHEET_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbwHD-VHy3BEuxFyhXtswP4euppuGIoKk1qCPHhwt2qaSFxsh1OhovTO-tfhR024szK30A/exec";

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill all fields ❌");
      return;
    }

    const payload = { name, email, message, source: "portfolio" };

    try {
      const res = await fetch(SHEET_WEB_APP_URL, {
        method: "POST",
        // ✅ IMPORTANT: text/plain to avoid CORS preflight issues
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      const text = await res.text(); // ✅ safe
      let data;
      try { data = JSON.parse(text); } catch { data = { status: "error", raw: text }; }

      if (data.status === "success") {
        alert("Message Sent Successfully ✅");
        form.reset();
      } else {
        alert("Something went wrong ❌");
        console.log("Server Response:", data);
      }
    } catch (err) {
      alert("Network Error ❌");
      console.error(err);
    }
  });
}