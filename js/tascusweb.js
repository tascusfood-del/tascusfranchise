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
   spotify: {
      profileUrl: "#",
      embedUrl: "#"
    },
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
    name: "ĐỒNG PHỤC",
    description: `Đồng phục nhân viên theo màu sắc và nhận diện của Tascus`,
    spotify: {
      profileUrl: "#",
      embedUrl: "#"
    },
    backgroundUrl: "https://i.postimg.cc/Y0npBnLV/do-ng-phu-c.jpg"
  },
  {
    name: "BRANDING GUIDELINE",
    description: `Hệ thống guideline rõ ràng, đầy đủ`,
    spotify: {
      profileUrl: "#",
      embedUrl: "#"
    },
    backgroundUrl: "https://i.postimg.cc/CLs25Bv5/branding_guideline.jpg"
  },
  {
    name: "TÀI NGUYÊN",
    description: `Ảnh chụp sản phẩm đầy đủ chuyên nghiệp`,
    spotify: {
      profileUrl: "#",
      embedUrl: "#"
    },
    backgroundUrl: "https://i.postimg.cc/k54dNFVG/a_nh_thu_c_te.jpg"
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

    /* === SAO CHÉP VÀ DÁN TOÀN BỘ KHỐI NÀY === */

li.innerHTML = `
  <h3>${artist.name}</h3>
  <div class="section-content">
    <div class="inner">
      <div class="bio">
        <h2>${artist.name}</h2>
        <p>
          ${artist.description}
        </p>
        </div>
    </div>
  </div>
`;

/* === DỪNG SAO CHÉP TẠI ĐÂY === */

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

  <!-- SCRIPT TẢI VÀ NHÂN ĐÔI NỘI DUNG BẰNG JAVASCRIPT -->
<script>
    // 1. Dữ liệu sản phẩm (Bạn chỉnh sửa phần này)
    const products = [
        {
            name: "Latte Classic",
            price: "55.000 đ",
            tag: "Món Mới Phải Thử",
            imgColor: "D2B48C",
            imgText: "Cà+Phê+1"
        },
        // Thêm các sản phẩm khác vào đây
        {
            name: "Trà Sữa Khoai Môn",
            price: "49.000 đ",
            tag: "Best Seller",
            imgColor: "8B4513",
            imgText: "Trà+Sữa+2"
        },
        // ...
    ];

    // 2. Hàm tạo HTML cho 1 item (giữ nguyên)
    function createProductCard(product) {
        // Lưu ý: Đang dùng Tailwind CSS classes (như bg-gray-50, shadow-lg...)
        // Nếu web của bạn không dùng Tailwind, bạn cần thay thế các class này bằng CSS của riêng mình.
        return `
            <div class="slide-item">
                <div class="bg-gray-50 p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-[1.01]">
                    <img src="https://placehold.co/300x400/${product.imgColor}/ffffff?text=${product.imgText}" 
                         onerror="this.onerror=null;this.src='https://placehold.co/300x400/${product.imgColor}/ffffff?text=Sản+Phẩm'"
                         alt="${product.name}" 
                         class="w-full h-72 object-cover rounded-lg mb-4" />
                    <p class="text-sm font-medium text-accent-orange">${product.tag}</p>
                    <h3 class="text-xl font-semibold text-primary-dark mb-2">${product.name}</h3>
                    <p class="text-2xl font-bold text-red-500">${product.price}</p>
                </div>
            </div>
        `;
    }

    // 3. Hàm tải và nhân đôi nội dung
    function initializeSlider() {
        const slideTrack = document.getElementById('slide-track');
        if (!slideTrack) return;

        let contentHTML = '';
        
        products.forEach(product => {
            contentHTML += createProductCard(product);
        });

        // Nhân đôi nội dung
        let duplicatedContentHTML = '';
        products.forEach(product => {
            duplicatedContentHTML += createProductCard(product);
        });

        slideTrack.innerHTML = contentHTML + duplicatedContentHTML;

        // Cập nhật tốc độ animation theo số lượng sản phẩm
        const speed = products.length * 5; // 5 giây cho mỗi item
        slideTrack.style.animationDuration = `${speed}s`;
    }

    // Chạy hàm khi trang đã tải xong
    window.onload = initializeSlider;

</script>
})();
