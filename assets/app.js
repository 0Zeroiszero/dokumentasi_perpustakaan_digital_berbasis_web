/* Dokumentasi PustakaDigital — app.js (tanpa dependensi; mermaid & hljs di-vendor) */
(function () {
  "use strict";

  /* ---------- nav mobile ---------- */
  var navBtn = document.getElementById("navBtn");
  var nav = document.getElementById("nav");
  if (navBtn && nav) {
    navBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      navBtn.setAttribute("aria-expanded", open ? "true" : "false");
      navBtn.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
      navBtn.innerHTML = open
        ? '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>'
        : '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
    });
  }

  /* ---------- tombol ke atas ---------- */
  var toTop = document.getElementById("toTop");
  if (toTop) {
    var onScroll = function () {
      toTop.classList.toggle("show", window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- syntax highlight ---------- */
  if (window.hljs) {
    document.querySelectorAll("pre code:not(.mermaid)").forEach(function (el) {
      try { window.hljs.highlightElement(el); } catch (e) { /* abaikan */ }
    });
  }

  /* ---------- salin kode ---------- */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var box = btn.closest(".codebox");
      var pre = box && box.querySelector("pre");
      if (!pre) return;
      var text = pre.textContent || "";
      var selesai = function () {
        btn.classList.add("ok");
        btn.textContent = "Tersalin";
        setTimeout(function () {
          btn.classList.remove("ok");
          btn.textContent = "Salin";
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(selesai, selesai);
      } else {
        var ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch (e) { /* abaikan */ }
        ta.remove();
        selesai();
      }
    });
  });

  /* ---------- tabs (live coding: Kode / Output) ---------- */
  document.querySelectorAll("[data-tabs]").forEach(function (tabs) {
    tabs.querySelectorAll(".tab-b").forEach(function (b) {
      b.addEventListener("click", function () {
        tabs.querySelectorAll(".tab-b").forEach(function (x) { x.classList.remove("active"); });
        tabs.querySelectorAll(".tab-p").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        tabs.querySelectorAll(".tab-b").forEach(function (x) {
          if (x.dataset.tab === b.dataset.tab) x.classList.add("active");
        });
        var target = tabs.querySelector('[data-p="' + b.dataset.tab + '"]');
        if (target) target.classList.add("active");
      });
    });
  });

  /* ---------- galeri: filter kelompok ---------- */
  var gchips = document.querySelectorAll(".gchip");
  if (gchips.length) {
    gchips.forEach(function (c) {
      c.addEventListener("click", function () {
        gchips.forEach(function (x) { x.classList.remove("active"); });
        c.classList.add("active");
        var g = c.dataset.g;
        document.querySelectorAll(".shot").forEach(function (fig) {
          fig.classList.toggle("show", g === "Semua" || fig.dataset.g === g);
        });
      });
    });
    document.querySelectorAll(".shot").forEach(function (fig) {
      fig.classList.add("show");
    });
  }

  /* ---------- lightbox screenshot ---------- */
  var lb = document.getElementById("lightbox");
  if (lb) {
    var lbImg = lb.querySelector("img");
    var lbCap = lb.querySelector(".lb-cap");
    var tutup = function () { lb.hidden = true; lbImg.src = ""; };
    document.querySelectorAll(".shot-open").forEach(function (b) {
      b.addEventListener("click", function () {
        var fig = b.closest(".shot");
        var cap = fig ? fig.querySelector("figcaption") : null;
        lbImg.src = b.dataset.full;
        lbCap.textContent = cap ? cap.textContent.replace(/\s+/g, " ").trim() : "";
        lb.hidden = false;
      });
    });
    lb.querySelector(".lb-close").addEventListener("click", tutup);
    lb.addEventListener("click", function (e) { if (e.target === lb) tutup(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") tutup(); });
  }

  /* ---------- flow player (animasi alur bisnis) ---------- */
  document.querySelectorAll("[data-flow]").forEach(function (player) {
    var steps = Array.prototype.slice.call(player.querySelectorAll(".step"));
    var bar = player.querySelector(".f-bar");
    var play = player.querySelector(".f-play");
    var resetBtn = player.querySelector(".f-reset");
    var idx = -1, timer = null;

    function terapkan() {
      steps.forEach(function (s, i) {
        s.classList.toggle("active", i === idx);
        s.classList.toggle("done", i < idx);
      });
      if (bar) {
        bar.style.width = Math.max(0, Math.round(((idx + 1) / steps.length) * 100)) + "%";
      }
    }
    function berhenti() {
      if (timer) { clearInterval(timer); timer = null; }
      if (play) play.querySelector("span").textContent = "Putar";
    }
    function maju() {
      idx += 1;
      if (idx >= steps.length) { berhenti(); idx = steps.length - 1; terapkan(); return; }
      terapkan();
    }
    if (play) {
      play.addEventListener("click", function () {
        if (timer) { berhenti(); return; }
        if (idx >= steps.length - 1) { idx = -1; terapkan(); }
        play.querySelector("span").textContent = "Jeda";
        timer = setInterval(maju, 1700);
        maju();
      });
    }
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        berhenti(); idx = -1; terapkan();
        bar.style.width = "0";
      });
    }
    steps.forEach(function (s, i) {
      s.addEventListener("click", function () {
        berhenti(); idx = i; terapkan();
      });
    });
  });

  /* ---------- mermaid + zoom/pan + layar penuh ---------- */
  function siapMermaid() {
    if (!window.mermaid) return;
    var warna = {
      dark: true,
      background: "#0f1220",
      primaryColor: "#8b5cf6",
      primaryTextColor: "#f2f2f7",
      primaryBorderColor: "#a78bfa",
      secondaryColor: "#1a1e33",
      secondaryTextColor: "#f2f2f7",
      secondaryBorderColor: "#6366f1",
      tertiaryColor: "#151829",
      tertiaryTextColor: "#e4dcff",
      lineColor: "#9aa0b5",
      textColor: "#f2f2f7",
      mainBkg: "#1a1e33",
      nodeBorder: "#8b5cf6",
      clusterBkg: "#12141f",
      clusterBorder: "#3a3f58",
      edgeLabelBackground: "#151829",
      titleColor: "#f2f2f7",
      noteBkg: "#241a3f",
      noteTextColor: "#e9e4ff",
      noteBorderColor: "#8b5cf6",
      fontSize: "14px"
    };
    try {
      window.mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        securityLevel: "loose",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        flowchart: { curve: "basis", padding: 14, useMaxWidth: true },
        er: { useMaxWidth: true, fontSize: 13 },
        themeVariables: warna
      });
      window.mermaid.run({ querySelector: "pre.mermaid" }).then(interaktif);
    } catch (e) {
      document.querySelectorAll("pre.mermaid").forEach(function (pre) {
        pre.classList.remove("mermaid");
        pre.textContent = "(Gagal merender diagram: " + e.message + ")";
      });
    }
  }

  function interaktif() {
    document.querySelectorAll(".diag").forEach(function (diag) {
      var inner = diag.querySelector(".diag-inner");
      if (!inner) return;
      var state = { s: 1, x: 0, y: 0 };
      var pindah = function () {
        inner.style.transform = "translate(" + state.x + "px," + state.y + "px) scale(" + state.s + ")";
      };
      diag.querySelectorAll(".d-zoom").forEach(function (b) {
        b.addEventListener("click", function () {
          var step = Number(b.dataset.step) * 0.25;
          state.s = Math.min(4, Math.max(0.5, state.s + step));
          pindah();
        });
      });
      var r = diag.querySelector(".d-reset");
      if (r) r.addEventListener("click", function () { state = { s: 1, x: 0, y: 0 }; pindah(); });
      var f = diag.querySelector(".d-full");
      if (f) f.addEventListener("click", function () {
        diag.classList.toggle("open");
        state = { s: 1, x: 0, y: 0 };
        pindah();
        if (!diag.classList.contains("open") && document.fullscreenElement) {
          document.exitFullscreen().catch(function () {});
        }
      });
      var geser = null;
      inner.addEventListener("pointerdown", function (e) {
        geser = { x: e.clientX, y: e.clientY, sx: state.x, sy: state.y };
        inner.setPointerCapture(e.pointerId);
      });
      inner.addEventListener("pointermove", function (e) {
        if (!geser) return;
        state.x = geser.sx + (e.clientX - geser.x);
        state.y = geser.sy + (e.clientY - geser.y);
        pindah();
      });
      ["pointerup", "pointercancel"].forEach(function (ev) {
        inner.addEventListener(ev, function () { geser = null; });
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        document.querySelectorAll(".diag.open").forEach(function (d) { d.classList.remove("open"); });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", siapMermaid);
  } else {
    siapMermaid();
  }
})();
