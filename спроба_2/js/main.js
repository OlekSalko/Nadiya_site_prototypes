// Мобільне меню та візуальна форма (без відправлення даних).
(function () {
  "use strict";
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a[href^='#']")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }
  document.querySelectorAll("form[data-mock]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var b = f.querySelector("button[type=submit]");
      if (b) b.textContent = "Дякуємо! Це прототип";
    });
  });
})();
