/*---------------------------------------------------------------------
    File Name: custom.js
---------------------------------------------------------------------*/

$(function () {
	
	"use strict";
	
	/* Preloader
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	setTimeout(function () {
		$('.loader_bg').fadeToggle();
	}, 1500);
	
	/* JQuery Menu
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(document).ready(function () {
		$('header nav').meanmenu();
	});
	
	/* Tooltip
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(document).ready(function(){
		$('[data-toggle="tooltip"]').tooltip();
	});
	
	/* sticky
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(document).ready(function(){
		$(".sticky-wrapper-header").sticky({topSpacing:0});
	});
	
	/* Mouseover
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(document).ready(function(){
		$(".main-menu ul li.megamenu").mouseover(function(){
			if (!$(this).parent().hasClass("#wrapper")){
			$("#wrapper").addClass('overlay');
			}
		});
		$(".main-menu ul li.megamenu").mouseleave(function(){
			$("#wrapper").removeClass('overlay');
		});
	});
	
	/* NiceScroll
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(".brand-box").niceScroll({
		cursorcolor:"#9b9b9c",
	});	
	
	/* NiceSelect
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	// $(document).ready(function() {
	// 	$('select').niceSelect();
	// });	
		
	/* OwlCarousel - Blog Post slider
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(document).ready(function() {
	  var owl = $('.carousel-slider-post');
	  owl.owlCarousel({
		items: 1,
		loop: true,
		margin: 10,
		autoplay: true,
		autoplayTimeout: 3000,
		autoplayHoverPause: true
	  });	  
	});
	
	/* OwlCarousel - Banner Rotator Slider
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(document).ready(function() {
	  var owl = $('.banner-rotator-slider');
	  owl.owlCarousel({
		items: 1,
		loop: true,
		margin: 10,
		nav: true,
		dots: false,
		navText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
		autoplay: true,
		autoplayTimeout: 3000,
		autoplayHoverPause: true
	  });	  
	});
	
	/* OwlCarousel - Product Slider
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(document).ready(function() {
	  var owl = $('#product-in-slider');
	  owl.owlCarousel({
		loop: true,
		nav: true,
		margin: 10,
		navText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
		responsive: {
		  0: {
			items: 1
		  },
		  600: {
			items: 2
		  },
		  960: {
			items: 3
		  },
		  1200: {
			items: 4
		  }
		}
	  });
	  owl.on('mousewheel', '.owl-stage', function(e) {
		if (e.deltaY > 0) {
		  owl.trigger('next.owl');
		} else {
		  owl.trigger('prev.owl');
		}
		e.preventDefault();
	  });
	});
	
	/* Scroll to Top
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(window).on('scroll', function (){
        scroll = $(window).scrollTop();
        if (scroll >= 100){
          $("#back-to-top").addClass('b-show_scrollBut')
        }else{
          $("#back-to-top").removeClass('b-show_scrollBut')
        }
      });
      $("#back-to-top").on("click", function(){
        $('body,html').animate({
          scrollTop: 0
        }, 1000);
    });
	
	/* Contact-form
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	$.validator.setDefaults( {
		submitHandler: function () {
			alert( "submitted!" );
		}
	} );
	
	$( document ).ready( function () {
		$( "#contact-form" ).validate( {
			rules: {
				firstname: "required",
				email: {
					required: true,
					email: true
				},
				lastname: "required",
				message: "required",
				agree: "required"
			},
			messages: {
				firstname: "Please enter your firstname",
				email: "Please enter a valid email address",
				lastname: "Please enter your lastname",
				username: {
					required: "Please enter a username",
					minlength: "Your username must consist of at least 2 characters"
				},
				message: "Please enter your Message",
				agree: "Please accept our policy"
			},
			errorElement: "div",
			errorPlacement: function ( error, element ) {
				// Add the `help-block` class to the error element
				error.addClass( "help-block" );

				if ( element.prop( "type" ) === "checkbox" ) {
					error.insertAfter( element.parent( "input" ) );
				} else {
					error.insertAfter( element );
				}
			},
			highlight: function ( element, errorClass, validClass ) {
				$( element ).parents( ".col-md-4, .col-md-12" ).addClass( "has-error" ).removeClass( "has-success" );
			},
			unhighlight: function (element, errorClass, validClass) {
				$( element ).parents( ".col-md-4, .col-md-12" ).addClass( "has-success" ).removeClass( "has-error" );
			}
		} );
	});
	
	/* heroslider
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	var swiper = new Swiper('.heroslider', {
		spaceBetween: 30,
		centeredSlides: true,
		slidesPerView: 'auto',
		paginationClickable: true,
		loop: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			dynamicBullets: true
		},
	});
	

	/* Product Filters
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	var swiper = new Swiper('.swiper-product-filters', {
		slidesPerView: 3,
		slidesPerColumn: 2,
		spaceBetween: 30,
		breakpoints: {
			1024: {
			  slidesPerView: 3,
			  spaceBetween: 30,
			},
			768: {
			  slidesPerView: 2,
			  spaceBetween: 30,
			  slidesPerColumn: 1,
			},
			640: {
			  slidesPerView: 2,
			  spaceBetween: 20,
			  slidesPerColumn: 1,
			},
			480: {
			  slidesPerView: 1,
			  spaceBetween: 10,
			  slidesPerColumn: 1,
			}
		  },
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			dynamicBullets: true
		}
    });

	/* Countdown
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$('[data-countdown]').each(function () {
        var $this = $(this),
		finalDate = $(this).data('countdown');
		$this.countdown(finalDate, function (event) {
			var $this = $(this).html(event.strftime(''
			+ '<div class="time-bar"><span class="time-box">%w</span> <span class="line-b">weeks</span></div> '
			+ '<div class="time-bar"><span class="time-box">%d</span> <span class="line-b">days</span></div> '
			+ '<div class="time-bar"><span class="time-box">%H</span> <span class="line-b">hr</span></div> '
			+ '<div class="time-bar"><span class="time-box">%M</span> <span class="line-b">min</span></div> '
			+ '<div class="time-bar"><span class="time-box">%S</span> <span class="line-b">sec</span></div>'));
		});
    });
	
	/* Deal Slider
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$('.deal-slider').slick({
        dots: false,
        infinite: false,
		prevArrow: '.previous-deal',
		nextArrow: '.next-deal',
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
		infinite: false,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                infinite: true,
                dots: false
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
	
	/* News Slider
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$('#news-slider').slick({
        dots: false,
        infinite: false,
		prevArrow: '.previous',
		nextArrow: '.next',
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: false
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
	
	/* Fancybox
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(".fancybox").fancybox({
		maxWidth: 1200,
		maxHeight: 600,
		width: '70%',
		height: '70%',
	});
	
	/* Toggle sidebar
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
     
     $(document).ready(function () {
       $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
          $(this).toggleClass('active');
       });
     });

     /* Product slider 
     -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
     // optional
     $('#blogCarousel').carousel({
        interval: 5000
     });

/* ========== CF Slide: isolated, no global vars ========== */
(function () {
  'use strict';

  // config
  var AUTOPLAY_MS = 3000; // 3 seconds

  // init function for a given container element
  function initCfSlide(container) {
    if (!container) return;
    var slidesWrap = container.querySelector('.cf-slides');
    var slides = Array.prototype.slice.call(container.querySelectorAll('.cf-slide'));
    if (!slides.length) return;

    // create dots
    var dotsWrap = container.querySelector('.cf-dots');
    slides.forEach(function (_, idx) {
      var d = document.createElement('button');
      d.type = 'button';
      d.className = 'cf-dot' + (idx === 0 ? ' cf-active' : '');
      d.setAttribute('aria-label', 'Go to slide ' + (idx + 1));
      d.setAttribute('data-idx', idx);
      d.addEventListener('click', function (e) {
        goTo(idx);
        resetAutoplay();
      });
      dotsWrap.appendChild(d);
    });

    var current = 0;
    var autoplayId = null;

    function update() {
      var translateX = -current * 100;
      slidesWrap.style.transform = 'translateX(' + translateX + '%)';
      // update dots
      var allDots = dotsWrap.querySelectorAll('.cf-dot');
      allDots.forEach(function (dot, i) {
        dot.classList.toggle('cf-active', i === current);
      });
    }

    function goTo(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      current = index;
      update();
    }

    function next() {
      goTo(current + 1);
    }

    function resetAutoplay() {
      if (autoplayId) clearInterval(autoplayId);
      autoplayId = setInterval(next, AUTOPLAY_MS);
    }

    // pause on hover/focus
    container.addEventListener('mouseenter', function () {
      if (autoplayId) clearInterval(autoplayId);
    });
    container.addEventListener('mouseleave', function () {
      resetAutoplay();
    });
    // also pause when any child gets focus (accessibility)
    container.addEventListener('focusin', function () {
      if (autoplayId) clearInterval(autoplayId);
    });
    container.addEventListener('focusout', function () {
      resetAutoplay();
    });

    // set initial sizes if needed (not required)
    update();
    resetAutoplay();

    // optional: make swipe support for touch devices
    (function addSwipe() {
      var startX = null;
      var threshold = 40; // px
      slidesWrap.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
      }, {passive: true});
      slidesWrap.addEventListener('touchend', function (e) {
        if (startX === null) return;
        var endX = e.changedTouches[0].clientX;
        var diff = startX - endX;
        if (Math.abs(diff) > threshold) {
          if (diff > 0) { // swipe left
            next();
          } else {
            goTo(current - 1);
          }
          resetAutoplay();
        }
        startX = null;
      }, {passive: true});
    })();
  }

  // auto-init all instances with class .cf-slide-wrap
  document.addEventListener('DOMContentLoaded', function () {
    var containers = document.querySelectorAll('.cf-slide-wrap');
    containers.forEach(function (c) {
      initCfSlide(c);
    });
  });

})();
/* ========== CF Slide JS (isolated) ========== */
(function () {
  'use strict';
  var AUTOPLAY_MS = 3000;

  function initCfSlideOne(container) {
    if (!container) return;
    var slidesWrap = container.querySelector('.cf-slides');
    var slides = Array.prototype.slice.call(container.querySelectorAll('.cf-slide'));
    if (!slides.length) return;
    var dotsWrap = container.querySelector('.cf-dots');
    // ensure dots empty
    dotsWrap.innerHTML = '';

    slides.forEach(function(_, idx) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cf-dot' + (idx === 0 ? ' cf-active' : '');
      btn.setAttribute('data-idx', idx);
      btn.setAttribute('aria-label', 'Go to slide ' + (idx + 1));
      btn.addEventListener('click', function() {
        goTo(idx);
        resetAutoplay();
      });
      dotsWrap.appendChild(btn);
    });

    var current = 0;
    var autoplayId = null;

    function update() {
      var tx = -current * 100;
      slidesWrap.style.transform = 'translateX(' + tx + '%)';
      var allDots = dotsWrap.querySelectorAll('.cf-dot');
      allDots.forEach(function(d, i) { d.classList.toggle('cf-active', i === current); });
    }
    function goTo(i) {
      if (i < 0) i = slides.length - 1;
      if (i >= slides.length) i = 0;
      current = i;
      update();
    }
    function next() { goTo(current + 1); }
    function resetAutoplay() {
      if (autoplayId) clearInterval(autoplayId);
      autoplayId = setInterval(next, AUTOPLAY_MS);
    }

    container.addEventListener('mouseenter', function(){ if (autoplayId) clearInterval(autoplayId); });
    container.addEventListener('mouseleave', function(){ resetAutoplay(); });
    container.addEventListener('focusin', function(){ if (autoplayId) clearInterval(autoplayId); });
    container.addEventListener('focusout', function(){ resetAutoplay(); });

    // touch swipe
    (function(){
      var startX = null, threshold = 40;
      slidesWrap.addEventListener('touchstart', function(e){ startX = e.touches[0].clientX; }, {passive:true});
      slidesWrap.addEventListener('touchend', function(e){
        if (startX === null) return;
        var endX = e.changedTouches[0].clientX;
        var diff = startX - endX;
        if (Math.abs(diff) > threshold) {
          if (diff > 0) next(); else goTo(current - 1);
          resetAutoplay();
        }
        startX = null;
      }, {passive:true});
    })();

    update();
    resetAutoplay();
  }

  document.addEventListener('DOMContentLoaded', function(){
    var c = document.querySelector('#cfSlide1');
    initCfSlideOne(c);
  });
})();

});

