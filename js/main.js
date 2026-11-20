/* DIY Astro — site behaviour (no dependencies) */
(function () {
  "use strict";

  // ---- Red night-vision mode (remembered between visits) ----
  var root = document.documentElement;
  try {
    if (localStorage.getItem("nightMode") === "1") root.classList.add("night-mode");
  } catch (e) { /* storage unavailable */ }

  document.addEventListener("DOMContentLoaded", function () {

    // ---- Mobile navigation ----
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".main-nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    // ---- Night mode button ----
    var nightBtn = document.querySelector(".night-toggle");
    if (nightBtn) {
      nightBtn.addEventListener("click", function () {
        var on = root.classList.toggle("night-mode");
        try { localStorage.setItem("nightMode", on ? "1" : "0"); } catch (e) {}
      });
    }

    // ---- Footer year ----
    var yr = document.getElementById("year");
    if (yr) yr.textContent = new Date().getFullYear();

    // ---- Gallery filters ----
    var gallery = document.querySelector(".gallery:not(.preview)");
    if (!gallery) return;

    var figures = Array.prototype.slice.call(gallery.querySelectorAll("figure"));
    var buttons = document.querySelectorAll(".gallery-filters button");

    Array.prototype.forEach.call(buttons, function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.getAttribute("data-filter");
        Array.prototype.forEach.call(buttons, function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        figures.forEach(function (fig) {
          var cats = (fig.getAttribute("data-category") || "").split(" ");
          fig.classList.toggle("hidden", f !== "all" && cats.indexOf(f) === -1);
        });
      });
    });

    // ---- Lightbox ----
    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.innerHTML =
      '<button class="lb-close" aria-label="Close">&times;</button>' +
      '<button class="lb-prev" aria-label="Previous image">&#8249;</button>' +
      '<img alt="">' +
      '<div class="lb-caption"></div>' +
      '<button class="lb-next" aria-label="Next image">&#8250;</button>';
    document.body.appendChild(lb);

    var lbImg = lb.querySelector("img");
    var lbCap = lb.querySelector(".lb-caption");
    var current = 0;

    function visible() { return figures.filter(function (f) { return !f.classList.contains("hidden"); }); }

    function show(fig) {
      var img = fig.querySelector("img");
      lbImg.src = img.getAttribute("data-full") || img.src;
      lbImg.alt = img.alt;
      var cap = fig.querySelector("figcaption");
      lbCap.innerHTML = cap ? cap.innerHTML : "";
    }

    function open(fig) {
      current = visible().indexOf(fig);
      show(fig);
      lb.classList.add("open");
      lb.querySelector(".lb-close").focus();
    }

    function step(d) {
      var v = visible();
      if (!v.length) return;
      current = (current + d + v.length) % v.length;
      show(v[current]);
    }

    function close() { lb.classList.remove("open"); }

    figures.forEach(function (fig) {
      fig.setAttribute("tabindex", "0");
      fig.addEventListener("click", function () { open(fig); });
      fig.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(fig); }
      });
    });

    lb.querySelector(".lb-close").addEventListener("click", close);
    lb.querySelector(".lb-prev").addEventListener("click", function (e) { e.stopPropagation(); step(-1); });
    lb.querySelector(".lb-next").addEventListener("click", function (e) { e.stopPropagation(); step(1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  });
})();
