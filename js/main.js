(function () {
  var nav = document.getElementById("site-nav");
  var toggle = document.querySelector(".nav-toggle");
  var yearEl = document.getElementById("year");
  var form = document.getElementById("contact-form");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function setNavOpen(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNavOpen(!nav.classList.contains("is-open"));
    });

    nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 768px)").matches) {
          setNavOpen(false);
        }
      });
    });
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("name");
      var email = document.getElementById("email");
      var phone = document.getElementById("phone");
      var message = document.getElementById("message");

      if (!name || !email || !message) return;

      if (!form.reportValidity()) return;

      var subject = encodeURIComponent("Anfrage über aktalan-entruempelung.de");
      var body = encodeURIComponent(
        "Name: " +
          name.value.trim() +
          "\n" +
          "E-Mail: " +
          email.value.trim() +
          "\n" +
          (phone && phone.value.trim()
            ? "Telefon: " + phone.value.trim() + "\n"
            : "") +
          "\n" +
          "Nachricht:\n" +
          message.value.trim()
      );

      var mailto = "mailto:kontakt@aktalan-entruempelung.de?subject=" + subject + "&body=" + body;
      window.location.href = mailto;
    });
  }
})();
