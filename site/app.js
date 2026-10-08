(function () {
  // Text effects (Framer-style). data-shoot animates letter by letter; data-stagger animates word by word.
  document.querySelectorAll('[data-shoot], [data-stagger]').forEach(function (el) {
    var byWord = el.hasAttribute('data-stagger');
    var text = el.textContent.trim();
    el.setAttribute('aria-label', text);
    el.textContent = '';
    var i = 0;
    text.split(' ').forEach(function (word, w) {
      if (w) el.appendChild(document.createTextNode(' '));
      var ws = document.createElement('span');
      ws.className = 'fx-word';
      ws.setAttribute('aria-hidden', 'true');
      if (byWord) {
        ws.style.setProperty('--i', i++);
        ws.textContent = word;
      } else {
        Array.from(word).forEach(function (ch) {
          var cs = document.createElement('span');
          cs.className = 'fx-char';
          cs.style.setProperty('--i', i++);
          cs.textContent = ch;
          ws.appendChild(cs);
        });
      }
      el.appendChild(ws);
    });
    el.classList.add('fx-ready');
  });

  // Reveal from bottom: [data-reveal] elements fade in and rise into place when they enter the screen.
  // Plays once per page; moving between pages or going back doesn't replay it. Reloading any page resets it site-wide.
  (function () {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    var key = 'reveal-seen:' + location.pathname;
    var nav = (performance.getEntriesByType && performance.getEntriesByType('navigation')[0]) || {};
    var seen = false;
    try {
      if (nav.type === 'reload') {
        // A reload of any page restarts the effect across the whole site.
        Object.keys(sessionStorage).forEach(function (k) { if (k.indexOf('reveal-seen:') === 0) sessionStorage.removeItem(k); });
      }
      seen = sessionStorage.getItem(key) === '1';
      sessionStorage.setItem(key, '1');
    } catch (e) { /* storage unavailable: just play it */ }
    if (seen) return;
    document.documentElement.classList.add('reveal-on');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('is-in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { threshold: 0.15 });
    els.forEach(function (e) { io.observe(e); });
  })();

  // Images that are not downloaded yet fall back to a labelled placeholder.
  function markMissing(img) {
    var box = img.closest('.shot, .avatar');
    if (box) box.classList.add('missing');
    if (box && box.classList.contains('avatar')) { img.remove(); box.textContent = box.dataset.initials || ''; }
  }
  document.querySelectorAll('.shot img, .avatar > img').forEach(function (img) {
    if (img.complete && img.naturalWidth === 0) markMissing(img);
    else img.addEventListener('error', function () { markMissing(img); });
  });

  // Tab groups: buttons with aria-controls switch sibling panels; previous/next arrows (mobile) step through them.
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var list = group.querySelector('[role="tablist"]');
    var buttons = Array.prototype.slice.call(group.querySelectorAll('button[role="tab"]'));
    var prev = group.querySelector('[data-tab-prev]');
    var next = group.querySelector('[data-tab-next]');
    var current = 0;
    buttons.forEach(function (btn, i) {
      btn.addEventListener('click', function () { select(i); });
      btn.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return;
        var n = (i + d + buttons.length) % buttons.length;
        buttons[n].focus(); select(n);
      });
    });
    if (prev) prev.addEventListener('click', function () { if (current > 0) select(current - 1); });
    if (next) next.addEventListener('click', function () { if (current < buttons.length - 1) select(current + 1); });
    function select(i) {
      current = i;
      buttons.forEach(function (b, j) {
        var on = j === i;
        b.setAttribute('aria-selected', on);
        b.tabIndex = on ? 0 : -1;
        document.getElementById(b.getAttribute('aria-controls')).hidden = !on;
      });
      if (prev) prev.disabled = i === 0;
      if (next) next.disabled = i === buttons.length - 1;
      // Keep the active tab in view inside the scrolling strip without moving the page.
      if (list && list.scrollWidth > list.clientWidth) {
        var b = buttons[i];
        list.scrollTo({ left: b.offsetLeft - list.offsetLeft - (list.clientWidth - b.offsetWidth) / 2, behavior: 'smooth' });
      }
    }
    select(0);
  });

  // Before / After toggles inside each booking step.
  document.querySelectorAll('[data-step]').forEach(function (step) {
    var buttons = step.querySelectorAll('.toggle button');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var state = btn.dataset.state;
        step.querySelectorAll('.toggle button').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.state === state); });
        step.querySelectorAll('[data-variant]').forEach(function (v) { v.hidden = v.dataset.variant !== state; });
      });
    });
  });

  // Lightbox for zoom buttons: shows the screenshots of the column the button belongs to.
  var box = null;
  function close() { if (box) { box.remove(); box = null; document.body.style.overflow = ''; } }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-zoom]');
    if (!btn) return;
    var scope = btn.closest('[data-zoom-scope]');
    var shots = scope ? Array.prototype.filter.call(scope.querySelectorAll('.shot'), function (s) { return !s.closest('[hidden]'); }) : [];
    box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Enlarged screenshots');
    var inner = document.createElement('div');
    inner.className = 'lightbox__inner';
    shots.forEach(function (s) {
      var img = s.querySelector('img');
      if (s.classList.contains('missing') || !img) {
        var ph = document.createElement('div');
        ph.className = 'shot missing';
        ph.dataset.label = s.dataset.label || 'Image';
        inner.appendChild(ph);
      } else {
        var big = document.createElement('img');
        big.src = img.src; big.alt = img.alt;
        inner.appendChild(big);
      }
    });
    var x = document.createElement('button');
    x.className = 'lightbox__close'; x.type = 'button'; x.textContent = 'Close';
    x.addEventListener('click', close);
    box.addEventListener('click', function (ev) { if (ev.target === box) close(); });
    box.appendChild(x); box.appendChild(inner);
    document.body.appendChild(box);
    document.body.style.overflow = 'hidden';
    x.focus();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  // Inline tag lists: hide a separator square when it ends a wrapped line (row layout only).
  function tidyTags() {
    document.querySelectorAll('.tags').forEach(function (list) {
      var row = getComputedStyle(list).flexDirection === 'row';
      list.querySelectorAll('.sq').forEach(function (sq) {
        var next = sq.nextElementSibling;
        var ends = row && next && next.offsetTop > sq.offsetTop + sq.offsetHeight;
        sq.style.visibility = ends ? 'hidden' : '';
      });
    });
  }
  tidyTags();
  window.addEventListener('resize', tidyTags);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(tidyTags);

  // Mobile menu: opens a dropdown under the header; closes on link tap, outside tap or Esc.
  var nav = document.querySelector('.nav');
  var menuBtn = nav && nav.querySelector('.menu-button');
  if (menuBtn) {
    var setMenu = function (open) { nav.classList.toggle('is-open', open); menuBtn.setAttribute('aria-expanded', open); };
    menuBtn.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
    nav.querySelectorAll('.nav__menu a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('click', function (e) { if (!nav.contains(e.target)) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); menuBtn.focus(); } });
  }

  // Back to top (mobile): appears after scrolling past the hero, scrolls smoothly to the top.
  var toTop = document.querySelector('.back-to-top');
  var hero = document.getElementById('hero');
  if (toTop && hero) {
    var update = function () { toTop.classList.toggle('is-visible', hero.getBoundingClientRect().bottom < 0); };
    window.addEventListener('scroll', update, { passive: true });
    update();
    toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }
})();
