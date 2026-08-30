/* ==========================================================================
   WIRED://LAIN — theme scripts (vanilla JS, no dependencies)
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- mobile navigation toggle ------------------------------------ */
  var navToggle = document.querySelector('.nav-toggle');
  var header = document.querySelector('.site-header');
  if (navToggle && header) {
    navToggle.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- reading progress bar ---------------------------------------- */
  var bar = document.getElementById('progress-bar');
  function updateProgress() {
    if (!bar) return;
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
  }
  document.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---------- back to top -------------------------------------------------- */
  var topBtn = document.getElementById('back-to-top');
  if (topBtn) {
    window.addEventListener('scroll', function () {
      topBtn.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- reveal on scroll --------------------------------------------- */
  var revealables = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealables.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- episode badge on post cards --------------------------------- */
  function epBadge(title) {
    var m = /episode\s*(\d+)/i.exec(title || '');
    if (m) return 'EP_' + ('00' + m[1]).slice(-2);
    m = /\bE(\d{1,3})\b/.exec(title || '');
    if (m) return 'EP_' + ('00' + m[1]).slice(-2);
    return '';
  }
  document.querySelectorAll('.post-card').forEach(function (card) {
    var badge = card.querySelector('.card-badge');
    if (badge && !badge.textContent.trim()) {
      var t = card.querySelector('.post-title');
      var label = epBadge(t ? t.textContent : '');
      if (label) badge.textContent = label;
      else if (badge.parentNode) badge.parentNode.removeChild(badge);
    }
  });

  /* ---------- related posts via Blogger label feed ------------------------ */
  var rel = document.getElementById('related-feed');
  if (rel) {
    var labelEl = document.getElementById('related-label');
    var label = labelEl ? labelEl.textContent.trim() : '';
    var feed = document.getElementById('related-feed-url');
    var feedUrl = feed ? feed.value : '';
    if (label && feedUrl) {
      fetch(feedUrl + 'feeds/posts/default/-/' + encodeURIComponent(label) + '?alt=json&max-results=4')
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (data) {
          if (!data || !data.feed || !data.feed.entry) return;
          var thisUrl = location.href.split('?')[0].split('#')[0];
          var html = '';
          var count = 0;
          data.feed.entry.forEach(function (entry) {
            if (count >= 3) return;
            var link = '#';
            (entry.link || []).forEach(function (l) {
              if (l.rel === 'alternate' && l.type === 'text/html') link = l.href;
            });
            if (link === thisUrl || link.split('?')[0].split('#')[0] === thisUrl) return;
            var title = entry.title && entry.title.$t ? entry.title.$t : 'untitled';
            var thumb = '';
            if (entry.media$thumbnail && entry.media$thumbnail.url) {
              thumb = entry.media$thumbnail.url.replace(/\/s72(-c)?\//, '/s320/');
            }
            var badge = epBadge(title);
            html += '<a class="related-item reveal in" href="' + link + '">' +
              '<span class="ri-thumb">' +
                (thumb
                  ? '<img loading="lazy" src="' + thumb + '" alt="' + title.replace(/"/g, '&quot;') + '">'
                  : '<span class="ri-no">' + (badge || 'FILE') + '</span>') +
              '</span>' +
              '<span class="ri-title">' + title + '</span>' +
            '</a>';
            count++;
          });
          var grid = rel.querySelector('.related-grid');
          if (grid && html) {
            grid.innerHTML = html;
            rel.style.display = 'block';
          }
        })
        .catch(function () { /* fail silently — theme stays intact */ });
    }
  }

  /* ---------- current year in footer -------------------------------------- */
  document.querySelectorAll('.js-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- easter egg --------------------------------------------------- */
  try {
    console.log('%cWIRED://LAIN v1.0%c\n> no matter where you are, everyone is always connected.\n> present day, present time.',
      'color:#3dffa0;font-family:monospace;font-weight:bold;font-size:16px',
      'color:#6f8f82;font-family:monospace');
  } catch (e) {}
})();
