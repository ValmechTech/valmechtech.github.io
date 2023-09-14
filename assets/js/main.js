(function ($) {
	"use strict";

/*=============================================
	=    		 Preloader			      =
=============================================*/
function preloader() {
	$('#preloader').delay(0).fadeOut();
};

$(window).on('load', function () {
	preloader();
	mainSlider();
	wowAnimation();
});



/*=============================================
	=    		Mobile Menu			      =
=============================================*/
//SubMenu Dropdown Toggle
if ($('.menu-area li.menu-item-has-children ul').length) {
	$('.menu-area .navigation li.menu-item-has-children').append('<div class="dropdown-btn"><span class="fas fa-angle-down"></span></div>');

}

//Mobile Nav Hide Show
if ($('.mobile-menu').length) {

	var mobileMenuContent = $('.menu-area .main-menu').html();
	$('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);

	//Dropdown Button
	$('.mobile-menu li.menu-item-has-children .dropdown-btn').on('click', function () {
		$(this).toggleClass('open');
		$(this).prev('ul').slideToggle(300);
	});
	//Menu Toggle Btn
	$('.mobile-nav-toggler').on('click', function () {
		$('body').addClass('mobile-menu-visible');
	});

	//Menu Toggle Btn
	$('.menu-backdrop, .mobile-menu .close-btn').on('click', function () {
		$('body').removeClass('mobile-menu-visible');
	});
}



/*=============================================
	=     Menu sticky & Scroll to top      =
=============================================*/
$(window).on('scroll', function () {
	var scroll = $(window).scrollTop();
	if (scroll < 245) {
		$("#sticky-header").removeClass("sticky-menu");
        $('.scroll-to-target').removeClass('open');
		$("#header-fixed-height").removeClass("active-height");

	} else {
		$("#sticky-header").addClass("sticky-menu");
        $('.scroll-to-target').addClass('open');
		$("#header-fixed-height").addClass("active-height");
	}
});


/*=============================================
	=    		 Scroll Up  	         =
=============================================*/
if ($('.scroll-to-target').length) {
  $(".scroll-to-target").on('click', function () {
    var target = $(this).attr('data-target');
    // animate
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 1000);

  });
}

/*=============================================
	=            Header Search            =
=============================================*/
$(".header-search > a").on('click', function () {
	$(".search-popup-wrap").slideToggle();
	$('body').addClass('search-visible');
	return false;
});

$(".search-backdrop").on('click', function () {
	$(".search-popup-wrap").slideUp(500);
	$('body').removeClass('search-visible');
});


/*=============================================
=     Offcanvas Menu      =
=============================================*/
$(".menu-tigger").on("click", function () {
	$(".extra-info,.offcanvas-overly").addClass("active");
	return false;
});
$(".menu-close,.offcanvas-overly").on("click", function () {
	$(".extra-info,.offcanvas-overly").removeClass("active");
});


/*=============================================
=     Sidebar Menu      =
=============================================*/
$('.burger-menu').on('click', function (e) {
    $(this).toggleClass('active');
    e.preventDefault();
    if ($('body').hasClass('burger-menu-visible')) {
        setTimeout(function () {
            $('body').removeClass('burger-menu-visible');
        }, 900);
    } else {
        $('body').addClass('burger-menu-visible');
    }
});

//Menu Toggle Btn
$('.tgCanvas-backdrop').on('click', function () {
    $('.burger-menu').removeClass('active');
    setTimeout(function () {
        $('body').removeClass('burger-menu-visible');
    }, 900);
});


//SubMenu Dropdown Toggle
if ($('.tgCanvas-menu li.menu-item-has-children').length) {
	$('.tgCanvas-menu li.menu-item-has-children').append('<i class="dropdown-icon"></i>');
}
$(".tgCanvas-menu .dropdown-icon").on('click', function() {
    var $tgMenu = $(this);
    $(this).parent().siblings().find('.sub-menu').slideUp();
    $tgMenu.prev(".sub-menu").slideToggle();
});

// Menu Animation
$('.burger-menu, .tgCanvas-backdrop').on('click', function (e) {
    var $this = $(this);
    e.preventDefault();
    if ($('body').hasClass('menu-open')) {
        $this.removeClass('active');
        $('.tgCanvas-menu ul.navigation > li').each(function (i) {
            var that = $(this);
            setTimeout(function () {
                that.removeClass('is-show');
            }, i * 100);
        });
        setTimeout(function () {
            $('.side-menu-wrapper').removeClass('side-menu-show');
        }, 800);
        $('body').removeClass('menu-open');
    }
    else {
        $('.side-menu-wrapper').addClass('side-menu-show');
        $this.addClass('active');
        $('body').addClass('menu-open');
        setTimeout(function () {
            $('.tgCanvas-menu ul.navigation > li').each(function (i) {
                var that = $(this);
                setTimeout(function () {
                    that.addClass('is-show');
                }, i * 100);
            });
        }, 500);
    }
});


/*=============================================
	=          Data Background               =
=============================================*/
$("[data-background]").each(function () {
	$(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
})



/*=============================================
	=    		 Main Slider		      =
=============================================*/
function mainSlider() {
	var BasicSlider = $('.slider-active');
	BasicSlider.on('init', function (e, slick) {
		var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
		doAnimations($firstAnimatingElements);
	});
	BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
		var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
		doAnimations($animatingElements);
	});
    BasicSlider.on('init', function(event, slick) {
        $('.current').text(slick.currentSlide + 1);
        $('.total').text(slick.slideCount);
     })
	BasicSlider.slick({
		autoplay: false,
		autoplaySpeed: 10000,
		dots: false,
		fade: true,
		arrows: false,
		responsive: [
			{ breakpoint: 767, settings: { dots: false, arrows: false } }
		]
	}).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
          $('.current').text(nextSlide + 1);
     });

	function doAnimations(elements) {
		var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		elements.each(function () {
			var $this = $(this);
			var $animationDelay = $this.data('delay');
			var $animationType = 'animated ' + $this.data('animation');
			$this.css({
				'animation-delay': $animationDelay,
				'-webkit-animation-delay': $animationDelay
			});
			$this.addClass($animationType).one(animationEndEvents, function () {
				$this.removeClass($animationType);
			});
		});
	}
}




/*=============================================
	=    		Brand Active		      =
=============================================*/
$('.brand-active').slick({
	dots: false,
	infinite: true,
	speed: 1000,
	autoplay: true,
	arrows: false,
	slidesToShow: 5,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 1,
				infinite: true,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				arrows: false,
			}
		},
		{
			breakpoint: 575,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				arrows: false,
			}
		},
	]
});



/*=============================================
	=    		testimonial Active		      =
=============================================*/
$('.testimonial-active').slick({
	dots: false,
	infinite: true,
	speed: 1000,
	autoplay: true,
    fade: true,
	arrows: true,
    prevArrow: '<button type="button" class="slick-prev">Prev</button>',
	nextArrow: '<button type="button" class="slick-next">Next</button>',
	appendArrows: ".testimonial-nav",
	slidesToShow: 1,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
			}
		},
		{
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
			}
		},
	]
});


/*=============================================
	=    		testimonial Active		      =
=============================================*/
$('.testimonial-active-two').slick({
	dots: false,
	infinite: true,
	speed: 1000,
	autoplay: true,
	arrows: false,
	slidesToShow: 2,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				infinite: true,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
			}
		},
		{
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
			}
		},
	]
});


/*=============================================
	=    		testimonial Active		      =
=============================================*/
$('.testimonial-active-three').slick({
	dots: false,
	infinite: true,
	speed: 1000,
	autoplay: true,
	arrows: false,
	slidesToShow: 1,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
			}
		},
		{
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
			}
		},
	]
});


/*=============================================
	=    		testimonial Active		      =
=============================================*/
$('.testimonial-active-four').slick({
	dots: false,
	infinite: true,
	speed: 1000,
	autoplay: true,
	arrows: false,
	slidesToShow: 1,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
			}
		},
		{
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
			}
		},
	]
});


/*=============================================
	=    		services Active  	       =
=============================================*/
$('.services-item').hover(function () {
	$(this).find('.services-btn').slideToggle(300);
	return false;
});


/*=============================================
	=    		project Active  	       =
=============================================*/
$(function () {
    var width = $(window).width();
    if (width > 991) {

        "use strict";

        var wind = $(window);

        wind.on('scroll', function () {
            $(".project-area .sub-bg .project-content").each(function () {
                var bottom_of_object =
                    $(this).offset().top + $(this).outerHeight();
                var bottom_of_window =
                    $(window).scrollTop() + $(window).height();
                var tab_id = $(this).attr('data-tab');
                if (bottom_of_window > bottom_of_object) {
                    $("#" + tab_id).addClass('current');
                    $(this).addClass('current');
                } else {
                    $("#" + tab_id).removeClass('current');
                    $(this).removeClass('current');
                }
            });
        });
    }
});


/*=============================================
	=          sticky           =
=============================================*/
$("#sticky_item").stick_in_parent();



/*=============================================
	=          Services Active           =
=============================================*/
var serviceSwiper = new Swiper('.project-active-two', {
	// Optional parameters
	loop: false,
	slidesPerView: 1,
	spaceBetween: 30,
	autoplay: false,
	breakpoints: {
		'1500': {
			slidesPerView: 1.3,
            spaceBetween: 75,
		},
		'1200': {
			slidesPerView: 1.3,
            spaceBetween: 40,
		},
		'992': {
			slidesPerView: 1.5,
            spaceBetween: 40,
		},
		'768': {
			slidesPerView: 1.3,
		},
		'576': {
			slidesPerView: 1,
		},
		'0': {
			slidesPerView: 1,
		},
	},
	// And if we need scrollbar
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
        draggable: true,
        clickable: true,
    },
});


/*=============================================
	=   slider project Active		=
=============================================*/
$('.slider-project-active').slick({
	dots: false,
	infinite: true,
	speed: 1000,
	autoplay: true,
	arrows: false,
	slidesToShow: 5,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 1,
				infinite: true,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				arrows: false,
			}
		},
		{
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
			}
		},
	]
});
$('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
	$('.slider-project-active').slick('setPosition');
})


/*=============================================
	=   related project Active		=
=============================================*/
$('.related-project-active').slick({
	dots: false,
	infinite: true,
	speed: 1000,
	autoplay: true,
	arrows: false,
	slidesToShow: 3,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: true,
			}
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			}
		},
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
			}
		},
		{
			breakpoint: 575,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
			}
		},
	]
});


/*=============================================
	=        Faq Active 	       =
=============================================*/
$(".accordion-header").on('click', function () {
	$(".accordion-item").removeClass("active"),
		$(this).parent().addClass("active")
});


/*=============================================
	=    		 Jarallax Active  	         =
=============================================*/
$('.jarallax').jarallax({
    speed: 0.2,
});


/*=============================================
	=          easyPieChart Active          =
=============================================*/
function easyPieChart() {
	$('.counter-circle-wrap, .skill-item').on('inview', function (event, isInView) {
		if (isInView) {
			$('.chart').easyPieChart({
				scaleLength: 0,
				lineWidth: 10,
				trackWidth: 2,
				size: 220,
				rotate: 360,
				animate: 3000,
				trackColor: '#EAEAEA',
				barColor: '#222222',
			});
		}
	});
	$('.skill-area').on('inview', function (event, isInView) {
		if (isInView) {
			$('.chart-two').easyPieChart({
				scaleLength: 0,
				lineWidth: 4,
				trackWidth: 1,
				size: 120,
				rotate: 360,
				animate: 3000,
				trackColor: '#EAEAEA',
				barColor: '#222222',
			});
		}
	});
}
easyPieChart();


/*=============================================
	=    		banner Animation  	       =
=============================================*/
  const radio_buttons = document.querySelector("#video_check");
  const video_start = document.querySelector("body");

  if (radio_buttons) {
    radio_buttons.addEventListener('click', function () {
      let video = document.querySelector(".video-icon")
      let videoClose = document.querySelector(".video-icon.close-video-icon")
      if (radio_buttons.checked) {
        document.querySelector(".banner-video-wrap").style.zIndex = "1";
        video.style.display = "none";
        videoClose.style.display = "block";
        video_start.classList.add('start-video');
        document.querySelector('body').classList.add('bg-white');

      }
      else {
        document.querySelector(".banner-video-wrap").style.zIndex = "10";
        video.style.display = "block";
        videoClose.style.display = "none";
        video_start.classList.remove('start-video');
        document.querySelector('body').classList.remove('bg-white');
      }
    });
  }


/*=============================================
	=    		Odometer Active  	       =
=============================================*/
$('.odometer').appear(function (e) {
	var odo = $(".odometer");
	odo.each(function () {
		var countNumber = $(this).attr("data-count");
		$(this).html(countNumber);
	});
});


/*=============================================
	=    		Magnific Popup		      =
=============================================*/
$('.popup-image').magnificPopup({
	type: 'image',
	gallery: {
		enabled: true
	}
});

/* magnificPopup video view */
$('.popup-video').magnificPopup({
	type: 'iframe'
});


/*=============================================
	=    		Isotope	Active  	      =
=============================================*/
$('.project-active-three, .project-active-four, .project-active-five, .project-active-six, .project-active-seven, .project-active-eight, .project-active-nine').imagesLoaded(function () {
	// init Isotope
	var $grid = $('.project-active-three, .project-active-four, .project-active-five, .project-active-six, .project-active-seven, .project-active-eight, .project-active-nine').isotope({
		itemSelector: '.grid-item',
		percentPosition: true,
		masonry: {
			columnWidth: '.grid-sizer',
		}
	});
	// filter items on button click
	$('.project-nav').on('click', 'li', function () {
		var filterValue = $(this).attr('data-filter');
		$grid.isotope({ filter: filterValue });
	});

});
//for menu active class
$('.project-nav li').on('click', function (event) {
	$(this).siblings('.active').removeClass('active');
	$(this).addClass('active');
	event.preventDefault();
});


/*=============================================
	=    		Isotope	Active  	      =
=============================================*/
$('.project-active-seven').imagesLoaded(function () {
	// init Isotope
	var $grid = $('.project-active-seven').isotope({
		itemSelector: '.grid-item',
		percentPosition: true,
		masonry: {
			columnWidth: 1,
		}
	});
	// filter items on button click
	$('.project-nav').on('click', 'li', function () {
		var filterValue = $(this).attr('data-filter');
		$grid.isotope({ filter: filterValue });
	});

});
//for menu active class
$('.project-nav li').on('click', function (event) {
	$(this).siblings('.active').removeClass('active');
	$(this).addClass('active');
	event.preventDefault();
});




/*=============================================
	=    		 Wow Active  	         =
=============================================*/
function wowAnimation() {
	var wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animated',
		offset: 0,
		mobile: false,
		live: true
	});
	wow.init();
}


})(jQuery);