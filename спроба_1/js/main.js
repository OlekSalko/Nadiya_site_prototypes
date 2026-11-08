// Nadiya Homes — minimal interactions: mobile nav + gallery slider.
(function () {
  "use strict";

  // Mobile navigation
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Gallery: tabs switch category, each category is a slider
  var gallery = document.querySelector("[data-gallery]");
  if (gallery) {
    var tabs = gallery.querySelectorAll(".gallery__tab");
    var sliders = gallery.querySelectorAll(".slider");
    var state = [];

    sliders.forEach(function (slider, i) {
      var track = slider.querySelector(".slider__track");
      var count = slider.querySelector(".slider__count");
      var total = track.children.length;
      state[i] = 0;

      function go(n) {
        state[i] = (n + total) % total;
        track.style.transform = "translateX(-" + state[i] * 100 + "%)";
        count.textContent = state[i] + 1 + " / " + total;
      }
      go(0);
      slider.querySelector(".slider__btn--prev").addEventListener("click", function () { go(state[i] - 1); });
      slider.querySelector(".slider__btn--next").addEventListener("click", function () { go(state[i] + 1); });
      slider.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") go(state[i] - 1);
        if (e.key === "ArrowRight") go(state[i] + 1);
      });
    });

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t, j) {
          t.setAttribute("aria-selected", String(i === j));
          sliders[j].hidden = i !== j;
        });
      });
    });
  }

  // Visual-only forms: prevent submission
  document.querySelectorAll("form[data-mock]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = f.querySelector("button[type=submit]");
      if (btn) btn.textContent = "Thank you — this is a prototype";
    });
  });
})();
