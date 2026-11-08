// Мобільне меню, слайдер фото, візуальна форма, пауза відео при reduced-motion.
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
      if (e.target.closest("a[href*='#']")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.querySelectorAll(".slider").forEach(function (slider) {
    var track = slider.querySelector(".slider__track");
    var count = slider.querySelector(".slider__count");
    var total = track.children.length;
    var i = 0;
    function go(n) {
      i = (n + total) % total;
      track.style.transform = "translateX(-" + i * 100 + "%)";
      count.textContent = i + 1 + " / " + total;
    }
    go(0);
    slider.querySelector(".slider__btn--prev").addEventListener("click", function () { go(i - 1); });
    slider.querySelector(".slider__btn--next").addEventListener("click", function () { go(i + 1); });
    slider.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") go(i - 1);
      if (e.key === "ArrowRight") go(i + 1);
    });
  });

  document.querySelectorAll("form[data-mock]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var b = f.querySelector("button[type=submit]");
      if (b) b.textContent = "Дякуємо! Це прототип";
    });
  });

  var video = document.querySelector(".hero__video");
  if (video && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    video.pause();
  }
})();
