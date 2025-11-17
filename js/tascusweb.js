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




  /* script.js */

// 1. Dữ liệu artists
// (Bạn có thể thay đổi nội dung, hình ảnh ở đây)
const artists = [
  {
    name: "BAO BÌ",
    description: `Hệ thống nhận diện bao bì đầy đủ, chuyên nghiệp theo phong cách của thương hiệu`,
   
    backgroundUrl: "https://i.postimg.cc/GtYHKjsD/BANER-BAO-BI.jpg"
  },
  {
    name: "LINH VẬT",
    description: `Thiết kế nhân vật hoạt hình độc đáo, thân thiện, Tạo sự gần gũi, dễ nhớ với khách hàng`,
    spotify: {
      profileUrl: "#",
      embedUrl: "#"
    },
    backgroundUrl: "https://i.postimg.cc/dtc8X5jw/linh_va_t.jpg"
  },
  {
    name: "CỬA HÀNG 3D",
    description: `Cửa hàng chuyên nghiệp hỗ trợ thiết kế & thi công đúng nhận diện Tascus`,
    spotify: {
      profileUrl: "#",
      embedUrl: "#"
    },
    backgroundUrl: "https://i.postimg.cc/bvJj0HGJ/cu_a_ha_ng.jpgg"
  },
  {
    name: "Allday",
    description: `Tom Gaynor, better known by his stage name “Allday”...`,
    spotify: {
      profileUrl: "https://open.spotify.com/artist/2Ltr0s15RyvsjqWzSmiSRs?si=uTbBZc32RhC75qp7tlOfzw",
      embedUrl: "https://open.spotify.com/embed/artist/2Ltr0s15RyvsjqWzSmiSRs?utm_source=generator"
    },
    backgroundUrl: "https://assets.codepen.io/152347/allday.jpg"
  },
  {
    name: "Boo Seeka",
    description: `Boo Seeka is the artist name of Australian electro-pop singer-songwriter...`,
    spotify: {
      profileUrl: "https://open.spotify.com/artist/1SFz3S9eSUTc49ysstadiO?si=C3KO89rcTbeJqZzsdedesA",
      embedUrl: "https://open.spotify.com/embed/artist/1SFz3S9eSUTc49ysstadiO?utm_source=generator"
    },
    backgroundUrl: "https://assets.codepen.io/152347/boo-seeka.jpg"
  },
  {
    name: "Running Touch",
    description: `Running Touch is a triple threat singer, songwriter and producer...`,
    spotify: {
      profileUrl: "https://open.spotify.com/artist/5bdwzvp6eirvqh0TwOwjgE?si=89zOMpUxQ-yHGnDcYs0M_w",
      embedUrl: "https://open.spotify.com/embed/artist/5bdwzvp6eirvqh0TwOwjgE?utm_source=generator"
    },
    backgroundUrl: "https://assets.codepen.io/152347/running-touch.jpg"
  }
];

// 2. Trạng thái
let activeIndex = 0; 

// 3. Chờ HTML tải xong
document.addEventListener("DOMContentLoaded", () => {
  // Tìm đúng <ul> ta đã đặt ID
  const artistListElement = document.getElementById("artist-banner");

  // Thoát nếu không tìm thấy element (để tránh lỗi)
  if (!artistListElement) {
    console.warn('Không tìm thấy phần tử #artist-banner trên trang này.');
    return;
  }

  // 4. Hàm tạo các slide
  function createArtistSlides() {
    artistListElement.innerHTML = ""; 

    artists.forEach((artist, index) => {
      const li = document.createElement("li");
      li.style.backgroundImage = `url(${artist.backgroundUrl})`;
      li.setAttribute("role", "button");

      if (index === activeIndex) {
        li.classList.add("active");
      }

      li.innerHTML = `
        <h3>${artist.name}</h3>
        <div class="section-content">
          <div class="inner">
            <div class="bio">
              <h2>${artist.name}</h2>
              <p>
                ${artist.description}
              </p>
              <a
                href="${artist.spotify.profileUrl}"
                target="_blank"
                class="artist-profile-link md:hidden"
              >
                <img
                  src="https://assets.codepen.io/152347/spotify-badge.svg"
                  alt="Listen on Spotify"
                  width="176"
                  height="64"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>
      `;

      li.addEventListener("click", () => {
        setActiveSlide(index);
      });

      artistListElement.appendChild(li);
    });
  }

  // 5. Hàm cập nhật slide 'active'
  function setActiveSlide(index) {
    activeIndex = index;
    const allSlides = artistListElement.querySelectorAll("li");

    allSlides.forEach((slide, i) => {
      // Bật/tắt class 'active' tùy theo index
      slide.classList.toggle('active', i === activeIndex);
    });
  }

  // 6. Các hàm next/prev (nếu bạn cần dùng)
  window.nextSlide = function() {
    if (activeIndex < artists.length - 1) {
      setActiveSlide(activeIndex + 1);
    }
  }

  window.prevSlide = function() {
    if (activeIndex > 0) {
      setActiveSlide(activeIndex - 1);
    }
  }

  // 7. Tạo slide lần đầu
  createArtistSlides();
});
})();
