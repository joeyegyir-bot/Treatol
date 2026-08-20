(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");
  const year = document.getElementById("year");
  const form = document.getElementById("visit-form");
  const mailtoBtn = document.getElementById("mailto-btn");
  const note = document.getElementById("form-note");

  if (year) year.textContent = String(new Date().getFullYear());

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const setMenu = (open) => {
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => {
    setMenu(!document.body.classList.contains("nav-open"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });

  const composeMessage = () => {
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const phone = (data.get("phone") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const interest = (data.get("interest") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();

    return [
      "Hello Treatol Ghana Limited,",
      "",
      `My name is ${name || "(not given)"}.`,
      `Phone: ${phone || "(not given)"}`,
      email ? `Email: ${email}` : null,
      `Interest: ${interest}`,
      message ? `Brief: ${message}` : "I would like to request a visit.",
    ]
      .filter(Boolean)
      .join("\n");
  };

  const showNote = (text) => {
    note.hidden = false;
    note.textContent = text;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const text = composeMessage();
    const url = `https://wa.me/233558329717?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener");
    showNote("Opening WhatsApp with your brief. If nothing appears, call 055 832 9717.");
  });

  mailtoBtn.addEventListener("click", () => {
    if (!form.reportValidity()) return;
    const text = composeMessage();
    const href = `mailto:treatolghana@gmail.com?subject=${encodeURIComponent(
      "Visit request — Treatol Ghana"
    )}&body=${encodeURIComponent(text)}`;
    window.location.href = href;
    showNote("Opening your email app. You can also write treatolghana@gmail.com.");
  });
})();
