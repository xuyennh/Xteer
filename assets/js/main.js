(function (win, $) {
	var header = $('#header'),
		gnbList = $('.gnb__list');
		useScroll = false,
		gnbItem = $('.gnb__item'),
		searchElm = $('.search'),
		kvBg = $('.kv__img'),
		kvContent = $('.kv__content'),
		listBrandSearchs = $('.list-brand__item'),
		icoSearchElm = $('.ico--search'),
		icoCloseSearch = $('.ico--close'),
		gnbLinkEl = $('.gnb__link'),
		icoLanguage = $('.ico--language'),
		languageList = $('.language__list'),
		burger = $('.burger'),
		familyBtn = $('.family-site'),
		familyList = $('.family-list'),
		heightH = $('#header').outerHeight() - 1,
		secBrandTop = $('#sec-brand').offset().top,
		dimmed = $('.dimmed');

	appHeight = function() {
		let vh = document.documentElement.clientHeight * 0.01;
		document.querySelector('.kv').style.setProperty('--vh', `${vh}px`);
	}

	// resize set Height header
	$( window ).resize(function() {
		heightH = $('#header').outerHeight() - 1;
		secBrandTop = $('#sec-brand').offset().top;
		appHeight();
	});	

	// scrollSection
	var scrollSection = function() {
		$('body','html').on('mousewheel', function(x, y) {
			if($('#sec-brand').length) {
				var currentOffset = Math.floor(secBrandTop - heightH);
				var scroll = $(window).scrollTop();
				if(scroll > 0 && scroll < currentOffset) {
					if(!useScroll) {
						useScroll = true;
						console.log(currentOffset);
						if(y < 0) {
							$('html, body').stop().animate({
								scrollTop: currentOffset
							}, 600, function() {
								useScroll = false;
							})
						console.log(currentOffset);
						} else if (y > 0) {
							$('html, body').stop().animate({
								scrollTop: 0
							}, 600, function() {
								useScroll = false
							})
						}
					}
				}
			}
		})
	}


	// show gnb-depth2
	var showGnbDepth2 = function() {
		gnbList.hover(
			function () {
				header.removeClass('header--se');
			if(header.hasClass('gnb-header')) {
				return
			}
				header.addClass("header--active");
			},
			function () {
				if($(window).scrollTop() <= 50) {
					header.removeClass("header--active");
				}
			}
		)
		gnbLinkEl.hover(
			function() {
				console.log('hover');
				if($(window).outerWidth() > 1024) {
					$(this).parent().addClass('showline')
				}
			},
			function() {
				console.log('out hover');
				if($(window).outerWidth() > 1024) {
					$(this).parent().removeClass('showline')
				}
			}
		)
		$('.gnb__list--depth2').hover(
			function() {
				if($(window).outerWidth() > 1024) {
					$(this).parent().addClass('showline')
				}
			},
			function() {
				if($(window).outerWidth() > 1024) {
					$(this).parent().removeClass('showline')
				}
			}
		)
	}

	// Header Scroll
	var headerHandle = function() {
		var handleHeader = function () {
			if ($(window).scrollTop() >= 50) {
				if(languageList.hasClass('language__list--active')) {

				}
				header.addClass("header--active");
			} else {
				if(!searchElm.hasClass('search--active')) {
					header.removeClass('header--active');
				}
			}
		}
		handleHeader();
		$(window).scroll(function() {
			handleHeader();
		});
	}

	// handle Keyvisual
	var keyVisualHandle = function() {
		setTimeout(function(){
			$('.kv__inner').addClass("kv__inner--active");
			header.addClass("header--show");
			clearTimeout();
		}, 1000);
	}

	// showlanguage
	var showLanguage = function() {
		icoLanguage.on('click', function() {
			header.toggleClass("header--lang");
			languageList.toggleClass("language__list--active");
		})
	}

	// scroll-secbrand 
	var handleClickScroll = function() {
		$('.kv__down').click(function(e) {
			e.preventDefault();
			var aboutSection = $(this).attr("href");
			$('html, body').stop().animate({
				scrollTop: Math.floor(secBrandTop - heightH)
			}, 600, function() {
					location.hash = aboutSection;
			});
		})
	}

	
	// handleResultSearch 
	var handleResultSearch = function() {
		listBrandSearchs.click(function() {
			listBrandSearchs.removeClass('list-brand__item--active');
			$(this).addClass('list-brand__item--active');
		})
	}

	// hanleSearchClick
	var handleSearchClick = function() {
		icoSearchElm.click(function() {
			searchElm.toggleClass('search--active');
			dimmed.toggleClass('dimmed--active');
			if($(window).outerWidth() > 1024) {
				header.toggleClass('header--se');
			}
			if($('.search').hasClass('search--active')) {
				$.scrollLock(true);
			} else {
				$.scrollLock(false);
			}
		})
		icoCloseSearch.click(function() {
			searchElm.removeClass('search--active');
			dimmed.removeClass('dimmed--active');
			header.removeClass('header--active');
			$.scrollLock(false);
		})
		gnbList.hover(function() {
			if(searchElm.hasClass('search--active')) {
				searchElm.removeClass('search--active');
				$.scrollLock(false);
			}
		})
	}

	// show menu 
	var showGnb = function() {
		burger.click(function() {
			burger.toggleClass('open');
			header.toggleClass('gnb-header');
			if(header.hasClass('header--lang') || header.hasClass('header--se')) {
				header.removeClass('header--lang');
				header.removeClass('header--se');
				$('.language__list').removeClass('language__list--active');
				searchElm.removeClass('search--active');
				dimmed.removeClass('dimmed--active');
			}
			if(header.hasClass('gnb-header')) {
				$.scrollLock(true);
			} else {
				$.scrollLock(false);
			}
		})
	}
	var dimmedHandle = function() {
		dimmed.click(function() {
			dimmed.toggleClass('dimmed--active');
			searchElm.removeClass('search--active');
			header.removeClass('header--se');
			$.scrollLock(false);
		})
	}
	// Strigger Config Animate
	var scrollStrigger = function(selector, options = {}) {
		let els = document.querySelectorAll(selector);
		els = Array.from(els);
		els.forEach(el => {
			addObserver(el, options);
		})
	}
	var addObserver = function(el, options) {
		if(!('IntersectionObserver' in window)) {
			if(options.cb) {
				options.cb(el);
			} else {
				entry.target.classList.add('active');
			}
			return
		}
		let observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if(entry.isIntersecting) {
					if(options.cb) {
						options.cb(el);
					} else {
						entry.target.classList.add('active');
					}
					observer.unobserve(entry.target);
				}
			})
		}, options)
		observer.observe(el);
	}

	// swiper Section lineup
	var slideLineUp = function() {
		var fullSwiper = new Swiper('.lineup-full', {
			observer: true,
			observeParents: true,
			allowTouchMove: false,
			breakpoints: {
				1024: {
					allowTouchMove: true,
				},
			},
		});
		var thumbSwiper = new Swiper('.lineup-thumbs', {
			effect: 'fade',
			fadeEffect: { crossFade: true },
			slidersPerView: 1,
  			virtualTranslate: true,
			speed: 500,
			observer: true,
			observeParents: true,
			allowTouchMove: false,
			navigation: {
				nextEl: '.lineup-thumbs .swiper-button-next',
				prevEl: '.lineup-thumbs .swiper-button-prev',
			},
		});
		fullSwiper.controller.control = thumbSwiper;
    	thumbSwiper.controller.control = fullSwiper;
		var swiperLineUp = $('.lineup-wrap .lineup-content').length;
		var current = $('.swiper-counter .current');
		var total = $('.swiper-counter .total');
		total.html('0'+ swiperLineUp);
		thumbSwiper.on('slideChange', function () {
			var swiperLineCount = this.activeIndex + 1;
			if(this.activeIndex === 0) {
				current.addClass('disable')
			} else {
				current.removeClass('disable')
			}
			if(this.activeIndex === swiperLineUp - 1) {
				total.addClass('disable')
			} else {
				total.removeClass('disable')
			}
			current.html('0' + swiperLineCount);
		});
	}

	// scroll to top
	var scrollToTop = function() {
		$('.scroll-to-top').click(function() {
			$('html, body').animate({scrollTop: '0px'}, 800)
		})
	}
	// show menu depth 
	var dropMenuDepth2 = function() {
		gnbLinkEl.on('click', function() {
			var el = $(this).next();
			if($(window).outerWidth() < 1025) {
				console.log(123);
				if(el.is(":hidden")) {
					el.slideDown('normal');
					$(this).parent().siblings().find('ul.gnb__list--depth2').slideUp('normal');
				} else {
					el.slideUp('normal');
				}
			} 
		})
	}
	// reset css when resize
	$(window).resize(function() { 
		if($(window).outerWidth() > 1024) {
			$('.gnb__item').each(function() {
				$(this).find($('.gnb__list--depth2').hide(0, function() {
					$(this).attr('style', '');
				}))
			})
		}
		if($(window).outerWidth() <= 1024) {
			$('.gnb__item').removeClass('showline');
		}
	})
	// handle click language 
	var handleLanguage = function() {
		$('.language__list .language__item').click(function() {
			$('.language__list .language__item').removeClass('language__item--active');
			$(this).addClass('language__item--active');
		})
	}
	// show family site
	var familySitehandle = function() {
		
		familyBtn.on('click', function() {
			familyList.toggleClass('family-list--active')
		})
	}
	// Anination all page
	var callAnimate = function() {
		scrollStrigger('.competitiveness__item')
		scrollStrigger('.section-title')
		scrollStrigger('.section-txt')
		scrollStrigger('.search-form')
		scrollStrigger('.search-form-result__item')
		scrollStrigger('.about__item')
		scrollStrigger('.info__item',)
		scrollStrigger('.section-lineup')
		scrollStrigger('.lineup-img')
		scrollStrigger('.lineup-ic-lst')
		scrollStrigger('.lineup-title')
		scrollStrigger('.lineup-desc')
		scrollStrigger('.ico-more')
		scrollStrigger('.brand__tit')
		scrollStrigger('.brand__txt')
	}

	// call func
	$(win).on('load', function() {
		keyVisualHandle();
		showGnbDepth2();
		headerHandle();
		handleClickScroll();
		showLanguage();
		handleResultSearch();
		handleSearchClick();
		showGnb();
		slideLineUp();
		scrollToTop();
		dropMenuDepth2();
		handleLanguage();
		familySitehandle();
		dimmedHandle();
		scrollSection();
		appHeight();
		callAnimate();
	});
	

})(window, window.jQuery)
