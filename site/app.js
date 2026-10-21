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

  // Lightbox for zoom buttons: title of the current step or tab, the enlarged screenshot,
  // a close button, and a Before/After toggle when the step has both versions.
  var box = null, lastFocus = null;
  var CLOSE_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19Z" fill="currentColor"/></svg>';
  function close() {
    if (!box) return;
    box.remove(); box = null; document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  function visibleText(el) {
    if (!el) return '';
    var spans = el.querySelectorAll('[data-variant]');
    if (!spans.length) return el.textContent.trim();
    var v = Array.prototype.filter.call(spans, function (s) { return !s.hidden; })[0];
    return v ? v.textContent.trim() : '';
  }
  function shotImage(shot) {
    var img = shot && shot.querySelector('img');
    if (!img || shot.classList.contains('missing')) {
      var ph = document.createElement('div');
      ph.className = 'shot missing';
      ph.dataset.label = (shot && shot.dataset.label) || 'Image';
      return ph;
    }
    var big = document.createElement('img');
    big.src = img.src; big.alt = img.alt;
    return big;
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-zoom]');
    if (!btn) return;
    var scope = btn.closest('[data-zoom-scope]');
    if (!scope) return;
    var step = btn.closest('[data-step]');
    var panel = btn.closest('.final-panel');
    var shots = Array.prototype.filter.call(scope.querySelectorAll('.shot'), function (s) { return !s.closest('[hidden]'); });
    var before = step && scope.querySelector('.shot[data-variant="before"]');
    var after = step && scope.querySelector('.shot[data-variant="after"]');
    var hasToggle = !!(before && after);

    lastFocus = btn;
    box = document.createElement('div');
    box.className = 'lightbox' + (hasToggle ? ' lightbox--toggle' : '');
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-labelledby', 'lightbox-title');

    var title = document.createElement('h2');
    title.className = 'lightbox__title'; title.id = 'lightbox-title';
    var x = document.createElement('button');
    x.className = 'lightbox__close'; x.type = 'button'; x.setAttribute('aria-label', 'Close'); x.innerHTML = CLOSE_ICON;
    x.addEventListener('click', close);
    var media = document.createElement('div');
    media.className = 'lightbox__media';

    function show(state) {
      media.textContent = '';
      if (hasToggle) {
        var shown = shotImage(state === 'after' ? after : before);
        // Before screenshots are 2x exports and would open larger than After ones;
        // cap both at the After image's width so switching keeps the same size.
        var afterImg = after.querySelector('img');
        var cap = (afterImg && afterImg.naturalWidth) || 1440;
        if (shown.tagName === 'IMG') shown.style.maxWidth = 'min(100%, ' + cap + 'px)';
        media.appendChild(shown);
        var t = step.querySelector('.step__title [data-variant="' + state + '"]');
        title.textContent = t ? t.textContent.trim() : visibleText(step.querySelector('.step__title'));
      } else {
        shots.forEach(function (s) { media.appendChild(shotImage(s)); });
        title.textContent = step ? visibleText(step.querySelector('.step__title')) : (panel ? visibleText(panel.querySelector('h3')) : '');
      }
    }

    // Title and (when present) the Before/After toggle sit together above the image.
    var head = document.createElement('div');
    head.className = 'lightbox__head';
    head.appendChild(title);
    box.appendChild(head); box.appendChild(x); box.appendChild(media);
    if (hasToggle) {
      var current = after.hidden ? 'before' : 'after';
      var tg = document.createElement('div');
      tg.className = 'toggle'; tg.setAttribute('role', 'group'); tg.setAttribute('aria-label', 'Version');
      ['before', 'after'].forEach(function (state) {
        var b = document.createElement('button');
        b.type = 'button'; b.dataset.state = state; b.textContent = state === 'before' ? 'Before' : 'After';
        b.setAttribute('aria-pressed', String(state === current));
        b.addEventListener('click', function () {
          tg.querySelectorAll('button').forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
          show(state);
          // Keep the page in step with the lightbox, so closing it shows the same version.
          var pageBtn = step.querySelector('.toggle button[data-state="' + state + '"]');
          if (pageBtn && pageBtn.getAttribute('aria-pressed') !== 'true') pageBtn.click();
        });
        tg.appendChild(b);
      });
      head.appendChild(tg);
      show(current);
    } else {
      show();
    }
    if (!title.textContent) title.hidden = true;

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
