// js/tascusweb.js  (isolated banner module)
(function () {
  'use strict';

  var AUTO_INTERVAL = 3000; // ms

  var root = document.getElementById('tascus-banner-widget');
  if (!root) return;

  var slides = Array.prototype.slice.call(root.querySelectorAll('.tascus-slide'));
  var prevBtn = root.querySelector('.tascus-prev');
  var nextBtn = root.querySelector('.tascus-next');
  var dots = Array.prototype.slice.call(root.querySelectorAll('.tascus-dot'));

  var index = 0;
  var timer = null;
  var isHover = false;
  var isTouching = false;
  var startX = 0;

  function setActive(i) {
    i = (i + slides.length) % slides.length;
    slides.forEach(function (s, idx) {
      s.classList.toggle('tascus-active', idx === i);
      s.setAttribute('aria-hidden', (idx === i) ? 'false' : 'true');
    });
    dots.forEach(function (d, idx) {
      d.classList.toggle('tascus-active', idx === i);
      d.setAttribute('aria-selected', (idx === i).toString());
    });
    index = i;
  }

  function next() { setActive(index + 1); }
  function prev() { setActive(index - 1); }

  function startAuto() {
    stopAuto();
    timer = setInterval(function () {
      if (!isHover && !isTouching) next();
    }, AUTO_INTERVAL);
  }
  function stopAuto() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  // bind controls
  if (nextBtn) nextBtn.addEventListener('click', function () { next(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', function () { prev(); startAuto(); });

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      setActive(i);
      startAuto();
    });
  });

  // pause on hover
  root.addEventListener('mouseenter', function () { isHover = true; });
  root.addEventListener('mouseleave', function () { isHover = false; });

  // touch / swipe
  root.addEventListener('touchstart', function (e) {
    isTouching = true;
    if (e.touches && e.touches[0]) startX = e.touches[0].clientX;
  }, { passive: true });

  root.addEventListener('touchend', function (e) {
    var endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : startX;
    var dx = endX - startX;
    var threshold = 40;
    if (dx > threshold) prev();
    else if (dx < -threshold) next();
    isTouching = false;
    startAuto();
  }, { passive: true });

  // keyboard accessible
  root.tabIndex = 0;
  root.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  // init
  setActive(0);
  startAuto();

  // pause/resume on tab visibility
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stopAuto(); else startAuto();
  });

})();
