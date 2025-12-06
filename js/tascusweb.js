
// js/tascusweb.js  (isolated banner module - supports multiple carousels)
(function () {
  'use strict';

  var AUTO_INTERVAL = 3000; // ms

  // Find all banner carousels (by class instead of ID)
  var banners = Array.prototype.slice.call(document.querySelectorAll('.tascus-fullbleed'));
  
  if (!banners.length) return;

  // Initialize each banner carousel independently
  banners.forEach(function (root) {
    var slides = Array.prototype.slice.call(root.querySelectorAll('.tascus-slide'));
    var prevBtn = root.querySelector('.tascus-prev');
    var nextBtn = root.querySelector('.tascus-next');
    var dots = Array.prototype.slice.call(root.querySelectorAll('.tascus-dot'));

    if (!slides.length) return; // Skip if no slides found

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
  });




  /* script.js */

// 1. Dữ liệu artists
// (Bạn có thể thay đổi nội dung, hình ảnh ở đây)
const artists = [
  {
    name: "BAO BÌ",
    description: `Hệ thống nhận diện bao bì, chuyên nghiệp `,
   spotify: {
      profileUrl: "#",
      embedUrl: "#"
    },
    backgroundUrl: "https://tascusfood.com/franchise%20page/BANER-BAO-BI.webp"
  },
  {
    name: "LINH VẬT",
    description: `Tạo sự gần gũi, dễ nhớ với khách hàng`,
    spotify: {
      profileUrl: "#",
      embedUrl: "#"
    },
    backgroundUrl: "https://tascusfood.com/franchise%20page/linh-va-t.webp"
  },
  {
    name: "CỬA HÀNG 3D",
    description: `Hỗ trợ thi công đúng nhận diện Tascus`,
    spotify: {
      profileUrl: "#",
      embedUrl: "#"
    },
    backgroundUrl: "https://tascusfood.com/franchise%20page/cu-a-ha-ng.webp"
  },
  {
    name: "ĐỒNG PHỤC",
    description: `Chuyên nghiệp theo nhận diện của Tascus`,
    spotify: {
      profileUrl: "#",
      embedUrl: "#"
    },
    backgroundUrl: "https://tascusfood.com/franchise%20page/do-ng-phu-c.webp"
  },
  {
    name: "BRAND GUIDELINE",
    description: `Hệ thống guideline rõ ràng, đầy đủ`,
    spotify: {
      profileUrl: "#",
      embedUrl: "#"
    },
    backgroundUrl: "https://tascusfood.com/franchise%20page/branding-guideline.webp"
  },
  {
    name: "TÀI NGUYÊN",
    description: `Ảnh chụp sản phẩm đầy đủ chuyên nghiệp`,
    spotify: {
      profileUrl: "#",
      embedUrl: "#"
    },
    backgroundUrl: "https://tascusfood.com/franchise%20page/anh.webp"
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
        <h2 >${artist.name}</h2>
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

document.addEventListener("DOMContentLoaded", function() {
    const track = document.getElementById('feedbackTrack');
    
    // Kiểm tra nếu track tồn tại
    if (track) {
        // Phương pháp Clone (Nhân bản) để tạo scroll vô cực
        // Ta nhân đôi toàn bộ nội dung bên trong track
        const content = track.innerHTML;
        track.innerHTML = content + content;
        
        // Xử lý hỗ trợ Touch (Mobile) tốt hơn
        // Mặc định CSS hover đã pause, nhưng trên mobile ta muốn chạm vào thì dừng
        track.addEventListener('touchstart', function() {
            this.style.animationPlayState = 'paused';
        });
        
        track.addEventListener('touchend', function() {
            this.style.animationPlayState = 'running';
        });
    }
});
document.addEventListener("DOMContentLoaded", function() {
    // === 1. KHAI BÁO BIẾN ===
    const tocContainer = document.getElementById('floating-toc-container');
    const toggleBtn = document.getElementById('toc-toggle-btn');
    const closeBtn = document.getElementById('toc-close');
    const tocLinks = document.querySelectorAll('#table-of-contents a');
    
    // Tìm banner để đo chiều cao. Nếu không có banner thì lấy header làm mốc
    const banner = document.getElementById('tascus-banner-widget') || document.querySelector('.header_section');

    // === 2. HÀM XỬ LÝ ẨN HIỆN NÚT THEO SCROLL ===
    function handleScroll() {
        if (!banner || !toggleBtn) return;

        // Tính điểm đáy của banner
        const triggerPoint = banner.offsetHeight + banner.offsetTop;
        
        // Nếu cuộn qua banner: Hiện nút (thêm class .show-on-scroll)
        // Nếu ở trên banner: Ẩn nút (xóa class)
        if (window.scrollY > triggerPoint) {
            toggleBtn.classList.add('show-on-scroll');
        } else {
            toggleBtn.classList.remove('show-on-scroll');
            // Nếu cuộn lên đầu trang mà menu đang mở -> Tự động đóng lại luôn cho gọn
            tocContainer.classList.remove('active');
            toggleBtn.classList.remove('hidden-by-active');
        }
    }

    // Lắng nghe sự kiện cuộn
    window.addEventListener('scroll', handleScroll);
    // Chạy thử 1 lần ngay khi tải trang (đề phòng user refresh ở giữa trang)
    handleScroll();

    // === 3. XỬ LÝ BẬT TẮT MENU ===
    function openMenu() {
        tocContainer.classList.add('active');     // Hiện menu
        toggleBtn.classList.add('hidden-by-active'); // Ẩn nút bấm
    }

    function closeMenu() {
        tocContainer.classList.remove('active');     // Ẩn menu
        toggleBtn.classList.remove('hidden-by-active'); // Hiện lại nút bấm
    }

    if(toggleBtn) toggleBtn.addEventListener('click', openMenu);
    if(closeBtn) closeBtn.addEventListener('click', closeMenu);

    // Click ra ngoài khoảng trắng thì đóng menu
    document.addEventListener('click', function(e) {
        if (!tocContainer.contains(e.target) && !toggleBtn.contains(e.target)) {
            closeMenu();
        }
    });

    // === 4. CLICK LINK THÌ CUỘN MƯỢT VÀ ĐÓNG MENU ===
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Đóng menu ngay
            closeMenu();

            if(targetId === '#top') {
                window.scrollTo({top: 0, behavior: 'smooth'});
            } else {
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    const headerOffset = 80; // Trừ hao thanh header dính
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Dữ liệu ảnh
const imageData = [
    { src: "https://tascusfood.com/nhu%CC%9Bo%CC%9Bng%20quye%CC%82%CC%80n/IMG/1.webp", alt: "Núi hùng vĩ" },
    { src: "https://tascusfood.com/nhu%CC%9Bo%CC%9Bng%20quye%CC%82%CC%80n/IMG/2.webp", alt: "Cánh đồng xanh" },
    { src: "https://tascusfood.com/nhu%CC%9Bo%CC%9Bng%20quye%CC%82%CC%80n/IMG/3.webp", alt: "Sương mù buổi sáng" },
    { src: "https://tascusfood.com/nhu%CC%9Bo%CC%9Bng%20quye%CC%82%CC%80n/IMG/4.webp", alt: "Rừng thu" },
    { src: "https://tascusfood.com/nhu%CC%9Bo%CC%9Bng%20quye%CC%82%CC%80n/IMG/5.webp", alt: "Leo núi" },
    { src: "https://tascusfood.com/nhu%CC%9Bo%CC%9Bng%20quye%CC%82%CC%80n/IMG/6.webp", alt: "Bờ biển" },
    // Dữ liệu thêm
    { src: "https://tascusfood.com/nhu%CC%9Bo%CC%9Bng%20quye%CC%82%CC%80n/IMG/7.webp", alt: "Thác nước" },
    { src: "https://tascusfood.com/nhu%CC%9Bo%CC%9Bng%20quye%CC%82%CC%80n/IMG/8.webp", alt: "Rừng nhiệt đới" },
    { src: "https://tascusfood.com/nhu%CC%9Bo%CC%9Bng%20quye%CC%82%CC%80n/IMG/9.webp", alt: "Vườn hoa" },
    { src: "https://tascusfood.com/nhu%CC%9Bo%CC%9Bng%20quye%CC%82%CC%80n/IMG/10.webp", alt: "Hoàng hôn" },
    { src: "https://tascusfood.com/nhu%CC%9Bo%CC%9Bng%20quye%CC%82%CC%80n/IMG/11.webp", alt: "Cầu treo" },
    { src: "https://tascusfood.com/nhu%CC%9Bo%CC%9Bng%20quye%CC%82%CC%80n/IMG/12.webp", alt: "Bầu trời đêm" },
];

let itemsToShow = 6;
let itemsLoaded = 0;

const galleryGrid = document.getElementById('gallery-grid');
const loadMoreBtn = document.getElementById('load-more-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close-lightbox');

function createGalleryItem(imgInfo) {
    const item = document.createElement('div');
    item.className = 'ts-gallery-item';
    
    // Hình ảnh
    const img = document.createElement('img');
    img.src = imgInfo.src;
    img.alt = imgInfo.alt;
    img.loading = "lazy";
    
    // Lớp phủ khi hover
    const overlay = document.createElement('div');
    overlay.className = 'ts-gallery-overlay';
    // Dùng icon font-awesome nếu có, hoặc dùng ký tự +
    overlay.innerHTML = '<i class="fa fa-search-plus" style="color: white; font-size: 24px;">+</i>';

    item.appendChild(img);
    item.appendChild(overlay);

    // Sự kiện click
    item.onclick = () => openLightbox(imgInfo.src);

    return item;
}

function loadImages() {
    const nextItems = itemsLoaded + itemsToShow;
    const totalItems = imageData.length;
    const fragment = document.createDocumentFragment();

    for (let i = itemsLoaded; i < nextItems && i < totalItems; i++) {
        fragment.appendChild(createGalleryItem(imageData[i]));
    }

    galleryGrid.appendChild(fragment);
    itemsLoaded = nextItems;

    if (itemsLoaded >= totalItems) {
        loadMoreBtn.style.display = 'none';
    }
}

// Lightbox logic
function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    setTimeout(() => {
        lightboxImg.src = '';
    }, 300);
    document.body.style.overflow = 'auto';
}

loadMoreBtn.addEventListener('click', loadImages);
closeBtn.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeLightbox();
});

// Chạy lần đầu
loadImages();


const allDetails = document.querySelectorAll('.faq-item');
        allDetails.forEach((targetDetail) => {
            const summary = targetDetail.querySelector('summary');
            summary.addEventListener('click', (e) => {
                allDetails.forEach((detail) => {
                    if (detail !== targetDetail) {
                        detail.removeAttribute('open');
                    }
                });
            });
        });
})();
