/* EcoPower Suite — shared site behaviour: theme, accessibility widget (IS 5568 / WCAG 2.1 AA),
   privacy notice, mobile drawer, scroll reveal. No third-party requests. */
(function () {
  'use strict';
  var root = document.documentElement;
  var ICONS = 'assets/icons.svg';

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } }
  };
  function icon(name, cls) {
    return '<svg class="i ' + (cls || '') + '" aria-hidden="true"><use href="' + ICONS + '#i-' + name + '"/></svg>';
  }
  function lang() { return (root.getAttribute('lang') || 'en').slice(0, 2); }

  /* ---------------- Theme ---------------- */
  function setTheme(t, persist) {
    root.setAttribute('data-theme', t);
    if (persist) store.set('eco_theme', t);
    $$('[data-theme-toggle]').forEach(function (b) {
      var light = t === 'light';
      b.setAttribute('aria-pressed', light ? 'true' : 'false');
      var use = $('use', b);
      if (use) use.setAttribute('href', ICONS + '#i-' + (light ? 'moon' : 'sun'));
      b.setAttribute('aria-label', lang() === 'he' ? (light ? 'מעבר למצב כהה' : 'מעבר למצב בהיר') : (light ? 'Switch to dark theme' : 'Switch to light theme'));
      b.title = b.getAttribute('aria-label');
    });
    var meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'light' ? '#f4f7fb' : '#070b14');
  }
  $$('[data-theme-toggle]').forEach(function (b) {
    b.addEventListener('click', function () {
      setTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light', true);
    });
  });
  setTheme(root.getAttribute('data-theme') || 'dark', false);
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: light)');
    var onMq = function (e) { if (!store.get('eco_theme')) setTheme(e.matches ? 'light' : 'dark', false); };
    if (mq.addEventListener) mq.addEventListener('change', onMq);
  }

  /* ---------------- Mobile drawer ---------------- */
  var btnMenu = $('#btnMenu'), drawer = $('#drawer');
  function setDrawer(open) {
    if (!btnMenu || !drawer) return;
    drawer.classList.toggle('open', open);
    btnMenu.setAttribute('aria-expanded', open ? 'true' : 'false');
    var u = $('use', btnMenu);
    if (u) u.setAttribute('href', ICONS + '#i-' + (open ? 'x' : 'menu'));
  }
  if (btnMenu && drawer) {
    btnMenu.addEventListener('click', function () { setDrawer(!drawer.classList.contains('open')); });
    $$('a', drawer).forEach(function (a) { a.addEventListener('click', function () { setDrawer(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setDrawer(false); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 1040) setDrawer(false); });
  }

  /* ---------------- Accessibility widget ---------------- */
  var A = { scale: 100, hc: false, hl: false, nm: false, rf: false };
  try { var saved = JSON.parse(store.get('eco_a11y') || '{}'); for (var k in A) if (k in saved) A[k] = saved[k]; } catch (e) { /* ignore */ }
  var reduceOs = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function applyA11y() {
    root.style.fontSize = A.scale + '%';
    root.classList.toggle('hc', !!A.hc);
    root.classList.toggle('hl', !!A.hl);
    root.classList.toggle('no-motion', !!A.nm);
    root.classList.toggle('rf', !!A.rf);
    store.set('eco_a11y', JSON.stringify(A));
    var on = 'פעיל / On', off = 'כבוי / Off';
    [['hc', 'btnHc'], ['hl', 'btnHl'], ['nm', 'btnNm'], ['rf', 'btnRf']].forEach(function (p) {
      var b = $('#' + p[1]);
      if (!b) return;
      b.setAttribute('aria-pressed', A[p[0]] ? 'true' : 'false');
      $('.st', b).textContent = A[p[0]] ? on : off;
    });
    var sc = $('#a11yScaleLbl');
    if (sc) sc.textContent = A.scale + '%';
  }

  var fab = document.createElement('button');
  fab.type = 'button'; fab.className = 'a11y-fab'; fab.id = 'btnA11y';
  fab.setAttribute('aria-expanded', 'false'); fab.setAttribute('aria-controls', 'a11yMenu');
  fab.setAttribute('aria-label', 'תפריט נגישות / Accessibility menu');
  fab.innerHTML = icon('access');
  var menu = document.createElement('div');
  menu.className = 'a11y-menu'; menu.id = 'a11yMenu'; menu.setAttribute('role', 'dialog');
  menu.setAttribute('aria-label', 'תפריט נגישות / Accessibility menu');
  menu.innerHTML =
    '<div class="hd"><span>תפריט נגישות / Accessibility</span><button type="button" class="btn btn-icon btn-sm" id="a11yClose" aria-label="סגירה / Close">' + icon('x') + '</button></div>' +
    '<div><div style="margin-bottom:.35rem">גודל טקסט / Text size: <b id="a11yScaleLbl" class="mono">100%</b></div>' +
    '<div class="row3"><button type="button" data-scale="-10" aria-label="הקטנת טקסט / Smaller text">A−</button><button type="button" data-scale="0" aria-label="גודל רגיל / Reset size">100%</button><button type="button" data-scale="10" aria-label="הגדלת טקסט / Larger text">A+</button></div></div>' +
    '<button type="button" class="t" id="btnHc" aria-pressed="false"><span>ניגודיות גבוהה / High contrast</span><span class="st">כבוי / Off</span></button>' +
    '<button type="button" class="t" id="btnHl" aria-pressed="false"><span>הדגשת קישורים / Highlight links</span><span class="st">כבוי / Off</span></button>' +
    '<button type="button" class="t" id="btnNm" aria-pressed="false"><span>עצירת תנועה / Pause motion</span><span class="st">כבוי / Off</span></button>' +
    '<button type="button" class="t" id="btnRf" aria-pressed="false"><span>גופן קריא / Readable font</span><span class="st">כבוי / Off</span></button>' +
    '<a href="accessibility.html" style="text-align:center;font-weight:700">הצהרת נגישות מפורטת (ת״י 5568) ←</a>';
  document.body.appendChild(menu);
  document.body.appendChild(fab);

  function setMenu(open) {
    menu.classList.toggle('open', open);
    fab.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) { var f = $('#a11yClose', menu); if (f) f.focus(); }
  }
  fab.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  $('#a11yClose', menu).addEventListener('click', function () { setMenu(false); fab.focus(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); fab.focus(); } });
  $$('[data-scale]', menu).forEach(function (b) {
    b.addEventListener('click', function () {
      var d = parseInt(b.getAttribute('data-scale'), 10);
      A.scale = d === 0 ? 100 : Math.max(90, Math.min(120, A.scale + d));
      applyA11y();
    });
  });
  [['btnHc', 'hc'], ['btnHl', 'hl'], ['btnNm', 'nm'], ['btnRf', 'rf']].forEach(function (p) {
    $('#' + p[0], menu).addEventListener('click', function () { A[p[1]] = !A[p[1]]; applyA11y(); });
  });
  applyA11y();

  /* ---------------- Privacy notice ---------------- */
  var NOTICE = {
    en: { t: 'Zero-cookie privacy', p: 'This site sets <strong>no cookies</strong> and uses no ad or analytics trackers. It stores only your preferences (theme, language, accessibility) and local, on-device page stats in <code>localStorage</code>. A public GitHub API call shows the download count.', a: 'Privacy policy', b: 'Got it' },
    he: { t: 'פרטיות ללא עוגיות', p: 'האתר <strong>אינו מציב עוגיות</strong> ואינו משתמש במעקב פרסומי או אנליטי. נשמרות רק ההעדפות שלך (ערכת נושא, שפה, נגישות) וסטטיסטיקה מקומית על המכשיר שלך ב־<code>localStorage</code>. קריאה ציבורית ל־GitHub API מציגה את מספר ההורדות.', a: 'מדיניות פרטיות', b: 'הבנתי' }
  };
  var notice = null;
  function renderNotice() {
    if (!notice) return;
    var n = NOTICE[lang()] || NOTICE.en;
    notice.innerHTML =
      '<div style="display:flex;justify-content:space-between;align-items:center;gap:.6rem"><strong style="display:inline-flex;align-items:center;gap:.4rem;color:var(--cy-t)">' + icon('lock') + n.t + '</strong>' +
      '<button type="button" class="btn btn-icon btn-sm" data-dismiss aria-label="' + (lang() === 'he' ? 'סגירה' : 'Close') + '">' + icon('x') + '</button></div>' +
      '<p>' + n.p + '</p><div class="acts"><a href="privacy.html">' + n.a + '</a><button type="button" class="btn btn-primary btn-sm" data-dismiss>' + n.b + '</button></div>';
    $$('[data-dismiss]', notice).forEach(function (b) {
      b.addEventListener('click', function () { notice.hidden = true; store.set('eco_privacy_notice_dismissed', 'true'); });
    });
  }
  if (store.get('eco_privacy_notice_dismissed') !== 'true') {
    notice = document.createElement('aside');
    notice.className = 'notice'; notice.id = 'privacyNotice'; notice.setAttribute('aria-label', 'Privacy notice');
    document.body.appendChild(notice);
    renderNotice();
  }
  document.addEventListener('eco:lang', function () { renderNotice(); setTheme(root.getAttribute('data-theme') || 'dark', false); });

  /* ---------------- Scroll reveal + scrollspy ---------------- */
  var revealEls = $$('.reveal');
  if (revealEls.length) {
    if ('IntersectionObserver' in window && !reduceOs) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
      revealEls.forEach(function (el) { io.observe(el); });
      /* Safety net: never leave content hidden */
      setTimeout(function () { revealEls.forEach(function (el) { el.classList.add('in'); }); }, 4000);
    } else {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    }
  }
  var navLinks = $$('.nav a[href^="#"]');
  if (navLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    navLinks.forEach(function (a) { var s = $(a.getAttribute('href')); if (s) map[s.id] = a; });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          navLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
          map[en.target.id].setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { so.observe(document.getElementById(id)); });
  }

  window.EcoCommon = { store: store, icon: icon, lang: lang };
})();
