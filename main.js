/* ============ Basis Media HK — main.js ============ */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover)").matches;

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- site-wide page transition veil ---- */
  (function pageTransitions() {
    const veil = document.querySelector(".page-veil");
    if (!veil) return;
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href) return;
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      let url;
      try { url = new URL(href, window.location.href); } catch (_) { return; }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.hash) return; // same-page anchor
      e.preventDefault();
      if (prefersReduced) { window.location.href = url.href; return; }
      veil.style.transition = "transform .55s var(--ease)";
      veil.style.transform = "translateY(0)";
      document.body.classList.remove("loaded");
      setTimeout(() => { window.location.href = url.href; }, 600);
    });
  })();

  /* ---- page load veil ---- */
  document.body.classList.add("loading");
  window.addEventListener("load", () => {
    document.body.classList.remove("loading");
    document.body.classList.add("loaded");
  });
  // safety fallback if load is slow
  setTimeout(() => document.body.classList.add("loaded"), 2200);

  /* ---- custom cursor ---- */
  if (canHover && !prefersReduced && !("ontouchstart" in window)) {
    const ring = document.querySelector(".cursor");
    const dot = document.querySelector(".cursor-dot");
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    });
    (function loop() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll("a,button,[data-tilt]").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("is-hover"));
    });
  }

  /* ---- magnetic elements ---- */
  if (canHover && !prefersReduced) {
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
      el.style.transition = "transform .4s cubic-bezier(.16,1,.3,1)";
    });
  }

  /* ---- nav: glass pill on scroll, scroll progress, fullscreen menu, scrollspy ---- */
  const nav = document.getElementById("nav");
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  const progress = document.getElementById("progress");

  function onScroll() {
    const y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle("scrolled", y > 40);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, y / h) : 0;
      progress.querySelector("i").style.transform = "scaleX(" + p + ")";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("load", onScroll);
  onScroll();

  function closeMenu() {
    if (!nav || !menu || !burger) return;
    nav.classList.remove("open");
    menu.classList.remove("open");
    menu.setAttribute("aria-hidden", "true");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", (window.BasisI18n && window.BasisI18n.t)
      ? window.BasisI18n.t(window.BasisI18n.getLang(), "nav.menu")
      : "Menu");
    document.body.style.overflow = "";
  }
  function openMenu() {
    if (!nav || !menu || !burger) return;
    nav.classList.add("open");
    menu.classList.add("open");
    menu.setAttribute("aria-hidden", "false");
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", (window.BasisI18n && window.BasisI18n.t)
      ? window.BasisI18n.t(window.BasisI18n.getLang(), "nav.menuClose")
      : "Close");
    document.body.style.overflow = "hidden";
  }
  if (burger && nav && menu) {
    burger.addEventListener("click", () => {
      if (nav.classList.contains("open")) closeMenu();
      else openMenu();
    });
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => { closeMenu(); })
    );
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  }

  /* scrollspy — highlight the nav link for the section in view */
  (function scrollspy() {
    const links = [].slice.call(document.querySelectorAll(".nav__links a[data-spy]"));
    if (!links.length || !("IntersectionObserver" in window)) return;
    const map = {};
    links.forEach((l) => { const id = l.getAttribute("data-spy"); const sec = id && document.querySelector(id); if (sec) map[id] = l; });
    const io = new IntersectionObserver((ents) => {
      ents.forEach((en) => {
        const link = map["#" + en.target.id];
        if (!link) return;
        if (en.isIntersecting) {
          links.forEach((l) => l.classList.remove("is-active"));
          link.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    Object.keys(map).forEach((id) => { const s = document.querySelector(id); if (s) io.observe(s); });
  })();

  /* ---- card tilt (3D hover) ---- */
  if (canHover && !prefersReduced) {
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-6px)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  }

  /* ---- hero canvas: AI constellation field ---- */
  (function heroField() {
    const canvas = document.querySelector(".hero__canvas");
    if (!canvas || prefersReduced) { if (canvas) canvas.style.display = "none"; return; }
    const ctx = canvas.getContext("2d");
    let w, h, dpr, nodes = [], raf, mouse = { x: -999, y: -999 };
    const COLORS = ["#ff2e93", "#ff5ea3", "#b13bff"];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // perf: 40% fewer nodes than the original field
      const count = Math.min(42, Math.round((w * h) / 33000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.8,
        c: COLORS[(Math.random() * COLORS.length) | 0],
      }));
    }

    // perf: cap the field at ~30fps instead of running at display refresh
    const FRAME_MS = 1000 / 30;
    let last = 0;

    function draw(ts) {
      raf = requestAnimationFrame(draw);
      if (ts === undefined) ts = 0;
      if (ts - last < FRAME_MS) return;
      last = ts;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        // mouse repel
        const dx = n.x - mouse.x, dy = n.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 120) { n.x += (dx / d) * 0.8; n.y += (dy / d) * 0.8; }
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.c; ctx.globalAlpha = 0.9; ctx.fill();
      }
      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = "#ff2e93";
            ctx.globalAlpha = (1 - dist / 130) * 0.25;
            ctx.lineWidth = 1; ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    }

    window.addEventListener("mousemove", (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    window.addEventListener("resize", resize);
    resize(); draw();
    // pause when hero off-screen (perf)
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((ents) => {
        ents.forEach((en) => {
          if (en.isIntersecting) { if (!raf) draw(); }
          else { cancelAnimationFrame(raf); raf = null; }
        });
      }).observe(canvas);
    }
  })();

  /* ---- GSAP animations ---- */
  function initGSAP() {
    if (prefersReduced || typeof gsap === "undefined") {
      // ensure everything visible
      document.querySelectorAll(".reveal").forEach((el) => { el.style.opacity = 1; el.style.transform = "none"; });
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

    // hero words stagger in
    gsap.set(".hero__title .w", { yPercent: 120 });
    gsap.to(".hero__title .w", {
      yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.08, delay: 0.9,
    });

    // generic reveals
    gsap.utils.toArray(".reveal").forEach((el) => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    });

    // statement words light up on scroll
    gsap.utils.toArray(".reveal-word").forEach((el) => {
      gsap.to(el, {
        opacity: 1, ease: "none",
        scrollTrigger: { trigger: el, start: "top 90%", end: "top 55%", scrub: true },
      });
    });

    // parallax on hero glow
    gsap.to(".hero__glow", {
      yPercent: 30, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });

    // index numerals drift in
    gsap.utils.toArray(".work__num").forEach((n) => {
      if (n.closest(".work-item")) return; // handled by the scroll-driven card transition
      gsap.from(n, {
        opacity: 0, y: 40, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: n, start: "top 92%" },
      });
    });
  }

  /* ---- scrollbar width var so 100vw full-bleed bands never overflow ---- */
  function setSbw() {
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty("--sbw", (sbw > 0 ? sbw : 0) + "px");
  }
  setSbw();
  window.addEventListener("resize", setSbw);
  window.addEventListener("load", () => { setSbw(); setTimeout(setSbw, 300); setTimeout(setSbw, 1400); });

  /* ---- signature: scroll-driven thumbnail -> hero transition on work cards ---- */
  function initWorkCards() {
    const cards = document.querySelectorAll(".work-item");
    if (!cards.length) return;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      cards.forEach((c) => c.classList.add("is-in"));
      return;
    }
    document.documentElement.classList.add("js-anim");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const i = [].indexOf.call(cards, en.target);
        en.target.style.transitionDelay = "";
        setTimeout(() => en.target.classList.add("is-in"), (i % 2) * 90);
        io.unobserve(en.target);
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    cards.forEach((c) => io.observe(c));
    // safety: never leave a card hidden
    setTimeout(() => cards.forEach((c) => c.classList.add("is-in")), 4000);
  }
  initWorkCards();

  if (document.readyState === "complete") initGSAP();
  else window.addEventListener("load", initGSAP);

  /* ---- reliability: force-reveal any .reveal still hidden (GSAP/ScrollTrigger can fail to fire) ---- */
  function revealSafety() {
    document.querySelectorAll(".reveal").forEach((el) => {
      if (parseFloat(getComputedStyle(el).opacity) < 0.05) {
        el.style.opacity = "1";
        el.style.transform = "none";
      }
    });
  }
  // run after GSAP has had a chance, and again after a hard fallback
  window.addEventListener("load", () => { setTimeout(revealSafety, 1200); setTimeout(revealSafety, 3000); });
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((ents) => {
      ents.forEach((en) => {
        if (en.isIntersecting) {
          en.target.style.opacity = "1";
          en.target.style.transform = "none";
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -5% 0px" });
    document.querySelectorAll(".reveal:not(.work-item)").forEach((el) => io.observe(el));
  } else {
    revealSafety();
  }

  /* ---- reliability: refresh ScrollTrigger after fonts/images settle ---- */
  window.addEventListener("load", () => {
    const refresh = () => {
      if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
    };
    setTimeout(refresh, 400);
    setTimeout(refresh, 1500);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  });
  // orientation/resize on mobile can desync triggers
  let rt;
  window.addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
    }, 250);
  });
})();

/* ============ v4: motion craft ============ */
(function () {
  "use strict";
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia("(hover: hover)").matches;
  var hasIO = "IntersectionObserver" in window;

  /* ---- 1) animated stat counters ---- */
  function initCounters() {
    var nodes = [].slice.call(document.querySelectorAll(".number__num, .stat__num"));
    if (!nodes.length || prefersReduced || !hasIO) return;

    function parse(txt) {
      var m = txt.match(/-?[\d,]*\.?\d+/);
      if (!m) return null;
      var numStr = m[0];
      var val = parseFloat(numStr.replace(/,/g, ""));
      if (isNaN(val)) return null;
      var i = txt.indexOf(numStr);
      var decimals = (numStr.split(".")[1] || "").length;
      return { val: val, prefix: txt.slice(0, i), suffix: txt.slice(i + numStr.length), decimals: decimals };
    }

    function fmt(v, d) {
      return d ? v.toFixed(d) : Math.round(v).toLocaleString("en-US");
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        io.unobserve(el);
        var final = el.textContent.trim();
        var p = parse(final);
        if (!p) return;
        var dur = 1400, t0 = null;
        function step(ts) {
          if (t0 === null) t0 = ts;
          var k = Math.min((ts - t0) / dur, 1);
          var e = 1 - Math.pow(1 - k, 3);
          el.textContent = p.prefix + fmt(p.val * e, p.decimals) + p.suffix;
          if (k < 1) requestAnimationFrame(step);
          else el.textContent = final;
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  /* ---- 4) clip-path reveals for bands + BTS ---- */
  function initReveals() {
    var els = [].slice.call(document.querySelectorAll(".case__band, .bts__item"));
    if (!els.length) return;
    if (prefersReduced || !hasIO) { els.forEach(function (e) { e.classList.add("is-in"); }); return; }
    document.documentElement.classList.add("js-anim");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-in");
        io.unobserve(en.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (e) { io.observe(e); });
    setTimeout(function () { els.forEach(function (e) { e.classList.add("is-in"); }); }, 4500);
  }

  /* ---- 5) kinetic type: cycling Fraunces italic word ---- */
  function initCycle() {
    var host = document.querySelector(".reel__cycle");
    if (!host) return;
    var words;
    try { words = JSON.parse(host.getAttribute("data-cycle") || "[]"); } catch (_) { words = []; }
    if (!words.length || prefersReduced) return;
    var i = 0;
    var timer = setInterval(function () {
      i = (i + 1) % words.length;
      host.innerHTML = "<em>" + words[i] + "</em>";
    }, 2000);
    if (hasIO) {
      new IntersectionObserver(function (ents) {
        ents.forEach(function (en) { host.style.visibility = "visible"; });
      }).observe(host);
    }
    window.addEventListener("pagehide", function () { clearInterval(timer); });
  }

  /* ---- 3) magnetic CTAs (stronger, spring back) ---- */
  function initMagnetic() {
    if (!canHover || prefersReduced || window.innerWidth < 600) return;
    var sels = ".btn, .nav__cta, .jstrip__more";
    [].slice.call(document.querySelectorAll(sels)).forEach(function (el) {
      if (el.dataset.magWired) return;
      el.dataset.magWired = "1";
      el.style.transition = "transform .45s cubic-bezier(.16,1,.3,1)";
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - (r.left + r.width / 2);
        var y = e.clientY - (r.top + r.height / 2);
        el.style.transform = "translate(" + x * 0.28 + "px," + y * 0.35 + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }

  /* ---- 6) cursor trail ---- */
  function initTrail() {
    if (!canHover || prefersReduced) return;
    if ("ontouchstart" in window) return; // no trail on touch devices
    if (!document.querySelector(".cursor")) return;
    var N = 6, MAX_N = 12, dots = [], pts = []; // capped trail length
    N = Math.min(N, MAX_N);
    for (var i = 0; i < N; i++) {
      var d = document.createElement("div");
      d.className = "cursor-trail";
      d.setAttribute("aria-hidden", "true");
      document.body.appendChild(d);
      dots.push(d);
      pts.push({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }
    var mx = window.innerWidth / 2, my = window.innerHeight / 2, active = false;
    window.addEventListener("mousemove", function (e) { mx = e.clientX; my = e.clientY; active = true; });
    (function loop() {
      var tx = mx, ty = my;
      for (var i = 0; i < N; i++) {
        var p = pts[i];
        p.x += (tx - p.x) * 0.28;
        p.y += (ty - p.y) * 0.28;
        var s = 1 - i / (N + 2);
        dots[i].style.transform = "translate(" + p.x + "px," + p.y + "px) translate(-50%,-50%) scale(" + s + ")";
        dots[i].style.opacity = active ? String(0.34 * s) : "0";
        tx = p.x; ty = p.y;
      }
      requestAnimationFrame(loop);
    })();
  }

  /* ---- signature: Fraunces variable-weight scroll response ----
     The display headline "breathes" — weight interpolates 320 -> 760 as
     the hero scrolls out. Reduced motion: fixed weight, no listener. */
  function initTypeBreath() {
    var el = document.querySelector(".hero__title") ||
             document.querySelector(".page-header__title");
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--hero-wght", "520");
      return;
    }
    var MIN = 320, MAX = 760, ticking = false;
    function apply() {
      ticking = false;
      var span = Math.max(1, window.innerHeight * 0.9);
      var p = Math.min(1, Math.max(0, (window.pageYOffset || 0) / span));
      if (el.dataset.sigHover === "1") return;   /* hover signature owns weight */
      var w = Math.round(MIN + (MAX - MIN) * p);
      el.style.setProperty("--hero-wght", String(w));
      el.style.fontVariationSettings = '"opsz" 144,"wght" ' + w;
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(apply); }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    apply();
  }

  /* ---- signature: kinetic index — ghost numerals interpolate Fraunces
     weight 200 -> 900 as each work item crosses the viewport. rAF-throttled,
     IO-gated so only visible numerals compute. Reduced motion: static. ---- */
  function initNumeralWeight() {
    var nums = document.querySelectorAll(".work__num");
    if (!nums.length) return;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      for (var i = 0; i < nums.length; i++) nums[i].style.setProperty("--num-wght", "600");
      return;
    }
    var live = [], ticking = false;
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        var idx = live.indexOf(e.target);
        if (e.isIntersecting && idx === -1) live.push(e.target);
        else if (!e.isIntersecting && idx > -1) live.splice(idx, 1);
      });
      tick();
    }, { threshold: 0 });
    for (var j = 0; j < nums.length; j++) io.observe(nums[j]);
    function apply() {
      ticking = false;
      var vh = window.innerHeight || 1;
      for (var k = 0; k < live.length; k++) {
        var el = live[k], r = el.getBoundingClientRect();
        var p = 1 - (r.top + r.height * 0.5) / vh;      /* 0 at bottom, 1 at top */
        p = Math.min(1, Math.max(0, p));
        el.style.setProperty("--num-wght", String(Math.round(200 + 700 * p)));
      }
    }
    function tick() { if (!ticking) { ticking = true; requestAnimationFrame(apply); } }
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick, { passive: true });
    tick();
  }

  /* ---- signature: the title responds to attention (hover/focus weight) ---- */
  function initTitleResponse() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    /* touch devices never fire mouseenter without a real pointer, so no gate needed */
    var t = document.querySelector(".case__title, .page-header__title");
    if (!t) return;
    var base = null;
    function set(w) { t.style.fontVariationSettings = '"opsz" 144,"wght" ' + w; }
    t.addEventListener("mouseenter", function () {
      base = t.style.fontVariationSettings || "";
      t.dataset.sigHover = "1";
      set(900);
    });
    t.addEventListener("mouseleave", function () {
      t.dataset.sigHover = "0";
      if (base) t.style.fontVariationSettings = base; else set(600);
    });
  }

  /* ---- word-by-word reveal for display headlines (no layout shift, tag-safe) ---- */
  function splitHeadlines() {
    if (prefersReduced) return;
    var sels = ".section-title, .cta__title, .work__title, .bigstat__quote, .page-header__title, .case__title";
    [].slice.call(document.querySelectorAll(sels)).forEach(function (el) {
      if (el.dataset.split) return;
      el.dataset.split = "1";
      wrapWords(el);
    });
  }
  /* walk child nodes; wrap only TEXT words in .word spans, keep element tags intact */
  function wrapWords(root) {
    var nodes = [].slice.call(root.childNodes);
    nodes.forEach(function (node) {
      if (node.nodeType === 3) { // text node
        var parts = node.textContent.split(/(\s+)/);
        var frag = document.createDocumentFragment();
        parts.forEach(function (part) {
          if (part === "" ) return;
          if (part.trim() === "") { frag.appendChild(document.createTextNode(part)); return; }
          var outer = document.createElement("span");
          outer.className = "word";
          var inner = document.createElement("span");
          inner.textContent = part;
          outer.appendChild(inner);
          frag.appendChild(outer);
        });
        root.replaceChild(frag, node);
      } else if (node.nodeType === 1) { // element (a, em, span…) — recurse, keep tag
        wrapWords(node);
      }
    });
  }

  function initHeadlineReveal() {
    splitHeadlines();
    var words = [].slice.call(document.querySelectorAll(".word"));
    if (!words.length || prefersReduced || !hasIO) {
      words.forEach(function (w) { w.style.opacity = "1"; w.style.transform = "none"; });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var w = en.target, delay = (parseInt(w.dataset.i, 10) || 0) * 55;
        setTimeout(function () { w.classList.add("in"); }, delay);
        io.unobserve(w);
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -8% 0px" });
    words.forEach(function (w, i) { w.dataset.i = i % 14; io.observe(w); });
    setTimeout(function () { words.forEach(function (w) { w.classList.add("in"); }); }, 5000);
  }
  function boot() {
    try { initHeadlineReveal(); } catch (e) {}
    try { initTypeBreath(); } catch (e) {}
    try { initNumeralWeight(); } catch (e) {}
    try { initTitleResponse(); } catch (e) {}
    try { initCounters(); } catch (e) {}
    try { initReveals(); } catch (e) {}
    try { initCycle(); } catch (e) {}
    try { initMagnetic(); } catch (e) {}
    try { initTrail(); } catch (e) {}
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();

/* ============ v5: award motion layer ============ */
(function () {
  "use strict";
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia("(hover: hover)").matches && !("ontouchstart" in window);

  /* ---- Lenis smooth scroll ---- */
  function initLenis() {
    if (prefersReduced || typeof Lenis === "undefined") return null;
    var lenis = new Lenis({
      duration: 1.15,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      touchMultiplier: 1.4
    });
    if (typeof gsap !== "undefined") {
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
    if (typeof ScrollTrigger !== "undefined") {
      lenis.on("scroll", ScrollTrigger.update);
    }
    document.documentElement.classList.add("lenis", "lenis-smooth");
    return lenis;
  }

  /* ---- contextual cursor label ---- */
  function initCursorLabel() {
    if (!canHover || prefersReduced) return;
    var label = document.createElement("div");
    label.className = "cursor-label";
    label.setAttribute("aria-hidden", "true");
    document.body.appendChild(label);
    var ring = document.querySelector(".cursor");
    var x = 0, y = 0, lx = 0, ly = 0;
    window.addEventListener("mousemove", function (e) {
      x = e.clientX; y = e.clientY;
    }, { passive: true });
    (function loop() {
      lx += (x - lx) * 0.22;
      ly += (y - ly) * 0.22;
      label.style.transform = "translate(" + lx + "px," + ly + "px) translate(-50%,-50%)" +
        (label.classList.contains("is-on") ? " scale(1)" : " scale(.6)");
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll("[data-cursor]").forEach(function (el) {
      el.addEventListener("mouseenter", function () {
        label.textContent = el.getAttribute("data-cursor") || "";
        label.classList.add("is-on");
        if (ring) {
          ring.classList.add("is-hover");
          ring.classList.add(el.getAttribute("data-cursor") === "Talk" ? "is-talk" : "is-view");
        }
      });
      el.addEventListener("mouseleave", function () {
        label.classList.remove("is-on");
        if (ring) ring.classList.remove("is-hover", "is-view", "is-talk");
      });
    });
  }

  /* ---- scroll velocity → marquee speed ---- */
  function initMarqueeVelocity() {
    if (prefersReduced) return;
    var lastY = window.scrollY || 0;
    var lastT = performance.now();
    var mq = 1;
    function tick(now) {
      var y = window.scrollY || 0;
      var dt = Math.max(16, now - lastT);
      var v = Math.abs(y - lastY) / dt;
      var target = 1 + Math.min(2.4, v * 18);
      mq += (target - mq) * 0.08;
      document.documentElement.style.setProperty("--mq", mq.toFixed(3));
      lastY = y; lastT = now;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---- section head line draw ---- */
  function initSectionDraw() {
    var heads = [].slice.call(document.querySelectorAll(".section-head"));
    if (!heads.length) return;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      heads.forEach(function (h) { h.classList.add("is-drawn"); });
      return;
    }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-drawn");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.55 });
    heads.forEach(function (h) { io.observe(h); });
  }

  /* ---- image parallax ---- */
  function initParallax() {
    if (prefersReduced) return;
    var imgs = [].slice.call(document.querySelectorAll("[data-parallax-img], .work__img, .case__hero img, .case__band img"));
    if (!imgs.length) return;
    function apply() {
      var vh = window.innerHeight || 1;
      imgs.forEach(function (img) {
        var r = img.getBoundingClientRect();
        if (r.bottom < -80 || r.top > vh + 80) return;
        var p = (r.top + r.height * 0.5 - vh * 0.5) / vh;
        var y = Math.max(-18, Math.min(18, -p * 22));
        img.style.transform = "translate3d(0," + y.toFixed(2) + "px,0) scale(1.08)";
      });
    }
    var ticking = false;
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(function () { apply(); ticking = false; });
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    apply();
  }

  /* ---- process step highlight ---- */
  function initStepHot() {
    var steps = [].slice.call(document.querySelectorAll(".step"));
    if (!steps.length || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        en.target.classList.toggle("is-hot", en.isIntersecting && en.intersectionRatio > 0.45);
      });
    }, { threshold: [0.45, 0.7] });
    steps.forEach(function (s) { io.observe(s); });
  }

  /* ---- footer rise + signature scramble ---- */
  function initFooterFX() {
    var foot = document.querySelector(".footer");
    if (!foot) return;
    if (prefersReduced) { foot.classList.add("is-in"); return; }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (ents) {
        ents.forEach(function (en) {
          if (en.isIntersecting) {
            foot.classList.add("is-in");
            var sig = foot.querySelector(".sig");
            if (sig) {
              sig.classList.add("is-live");
              scramble(sig);
            }
          }
        });
      }, { threshold: 0.25 }).observe(foot);
    } else {
      foot.classList.add("is-in");
    }
  }

  function scramble(sig) {
    if (prefersReduced) return;
    var nodes = [].slice.call(sig.querySelectorAll(".sig__i"));
    var glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    nodes.forEach(function (node, idx) {
      var final = node.textContent;
      var frames = 10 + idx * 2;
      var i = 0;
      var timer = setInterval(function () {
        if (i >= frames) {
          node.textContent = final;
          clearInterval(timer);
          return;
        }
        node.textContent = final.split("").map(function (ch, cIdx) {
          if (ch === " " || ch === "·" || ch === "°" || /[0-9]/.test(ch) && i > frames - 3) return ch;
          if (cIdx < (i / frames) * final.length) return final[cIdx];
          return glyphs[Math.floor(Math.random() * glyphs.length)];
        }).join("");
        i++;
      }, 28);
    });
  }

  /* ---- hero scroll cue hide ---- */
  function initScrollCue() {
    var hero = document.getElementById("hero");
    if (!hero) return;
    function check() {
      hero.classList.toggle("is-scrolled", (window.scrollY || 0) > 40);
    }
    window.addEventListener("scroll", check, { passive: true });
    check();
  }

  /* ---- GSAP extras when available ---- */
  function initGsapExtras() {
    if (prefersReduced || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    // bigstat quote scrubbed scale
    if (document.querySelector(".bigstat__quote")) {
      gsap.fromTo(".bigstat__quote",
        { scale: 0.92, opacity: 0.35 },
        {
          scale: 1, opacity: 1, ease: "none",
          scrollTrigger: { trigger: ".bigstat", start: "top 80%", end: "top 30%", scrub: true }
        }
      );
    }

    // services stagger
    gsap.utils.toArray(".svc").forEach(function (el, i) {
      gsap.from(el, {
        x: i % 2 === 0 ? -28 : 28, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" }
      });
    });

    // caps list cascade
    if (document.querySelector(".caps__list")) {
      gsap.from(".cap", {
        y: 24, opacity: 0, stagger: 0.07, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ".caps__list", start: "top 80%" }
      });
    }
  }

  function boot() {
    try { initLenis(); } catch (e) {}
    try { initCursorLabel(); } catch (e) {}
    try { initMarqueeVelocity(); } catch (e) {}
    try { initSectionDraw(); } catch (e) {}
    try { initParallax(); } catch (e) {}
    try { initStepHot(); } catch (e) {}
    try { initFooterFX(); } catch (e) {}
    try { initScrollCue(); } catch (e) {}
    try { initGsapExtras(); } catch (e) {}
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
  window.addEventListener("load", function () {
    try { initGsapExtras(); } catch (e) {}
    if (typeof ScrollTrigger !== "undefined") setTimeout(function () { ScrollTrigger.refresh(); }, 300);
  });
})();
