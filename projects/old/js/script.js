$(document).ready(function() {
/*************************
 * Scroll functionality: *
 *************************/
	
// Vars
	var $window = $(window);
	var $smooth = $(".smooth");
	var $text = $(".smooth-text");
	var $logo = $("#logo");
	var $logo2 = $("#logo2");
	var $logo3 = $("#logo3");
	var $lwrap = $(".logo-wrap");
	var $lname = $(".logo-name");
	var $lline = $(".logo-line");
	var $standard = $(".moveable");
	var $medium = $(".moveable-med");
	var $high = $(".moveable-high");
	var $back = $(".background");
	var $backg = $(".back");
	var $scroll = $(".side-num");
	var $stop = $(".side-top");
	var $scount = $(".side-count");
	var $sbottom = $(".side-bottom");
	var $section = $(".section");
	var $lspin = $(".logo-spin");
	var $ln = $(".logo-n");
	var $lt = $(".logo-t");
	var $projects = $(".project");
	var $pdesc = $(".project-desc");
	var project = 102;
	
	var isScrolling = true;
	var isResize = false;
	var page = 1;
	var pages = 0;
	$section.each(function(pages) {
		$(this).attr("id", ++pages);
	});
	pages = $section.length;
	var sideHeight = 100 - 100 * (80 / $(".sidebar").css("height").replace("px", ""));
	$scount.html("<span class='side-page'>" + page + "</span> / <span class='side-total'>" + pages + "</span>");
	
// Prevent all natural scrolling and iOS rubber-banding:
	$('body').on('touchmove', function(event) {
		event.preventDefault();
	}, false);
	
// Bind mousewheel events
	$(document).on("mousewheel DOMMouseScroll", function(e) {
		if(!isScrolling) {
			if(e.originalEvent.wheelDelta) {
				if(e.originalEvent.wheelDelta > 0) {
					scrollToPage(page - 1);
				} else {
					scrollToPage(page + 1);
				}
			} else if(e.originalEvent.detail) {
				if(e.originalEvent.detail < 0) {
					scrollToPage(page - 1);
				} else {
					scrollToPage(page + 1);
				}
			}
		}
	});
	
// Bind touchmove events
	var ts;
	$(document).on("touchstart", function(e) {
		ts = e.originalEvent.touches[0].clientY;
	});
	$(document).on("touchend", function(e) {
		var te = e.originalEvent.changedTouches[0].clientY;
		if(!isScrolling && (Math.abs(ts - te) > 50)) {
			if(ts < te) {
				scrollToPage(page - 1);
			} else {
				scrollToPage(page + 1);
			}
		}
	});
	
// Scroll to given page
	function scrollToPage(pageno) {
		if(page == pageno || isResize || isScrolling || pageno < 1 || pageno > pages) {
			$stop.css("height", ((page - 1) * sideHeight/(pages - 1)) + "%");
			$scroll.css("top", ((page - 1) * sideHeight/(pages - 1)) + "%");
			$sbottom.css("height", (sideHeight - (page - 1) * sideHeight/(pages - 1)) + "%");
			$scount.html("<span class='side-page'>" + page + "</span> / <span class='side-total'>" + pages + "</span>");
			return;
		}
		isScrolling = true;
		setTimeout(function() {
			if(!isResize) {
				isScrolling = false;
			}
		}, 1000);
		
		$section.each(function(count) {
			$(this).removeClass("smooth");
			count++;
			if(count == page) {
				
			} else if(count < pageno) {
				$(this).removeClass("below");
				$(this).addClass("above");
			} else if(count > pageno) {
				$(this).addClass("below");
				$(this).removeClass("above");
			}
			setTimeout(function() {
				$(this).addClass("smooth");
			}, 10);
		});
		
		if(page < pageno) {
			$("#" + page).addClass("smooth").addClass("above");
			$("#" + pageno).addClass("smooth").removeClass("below");
		} else {
			$("#" + page).addClass("smooth").addClass("below");
			$("#" + pageno).addClass("smooth").removeClass("above");
		}
		page = parseInt(pageno, 10);
		$backg.css("-moz-transform", "translate3d(0px, -" + ((page - 1) * Math.min(100/pages, 20)) + "vh, 0px)");
		$backg.css("-webkit-transform", "translate3d(0px, -" + ((page - 1) * Math.min(100/pages, 20)) + "vh, 0px)");
		$backg.css("transform", "translate3d(0px, -" + ((page - 1) * Math.min(100/pages, 20)) + "vh, 0px)");
		$stop.css("height", ((page - 1) * sideHeight/(pages - 1)) + "%");
		$scroll.css("top", ((page - 1) * sideHeight/(pages - 1)) + "%");
		$sbottom.css("height", (sideHeight - (page - 1) * sideHeight/(pages - 1)) + "%");
		$scount.html("<span class='side-page'>" + page + "</span> / <span class='side-total'>" + pages + "</span>");
		
		if(page == 1) {
			logoHover = true;
			anim1.goToAndPlay(0, true);
			$logo.removeClass("invisible");
			$logo2.addClass("invisible");
			$logo3.addClass("invisible");
			$lspin.removeClass("rotate-down");
			$lt.addClass("invisible");
			$ln.removeClass("invisible");
			$lline.removeClass("logo-line-r");
			setTimeout(function() {
				logoHover = false;
			}, 6500);
		}
	}
	
// Resize handling
	$window.on("resize", function() {
		$(document.body).width(window.innerWidth).height(window.innerHeight);
		
		isScrolling = true;
		isResize = true;
		$smooth.removeClass("smooth");
		$text.removeClass("smooth-text");
		
		setTimeout(function(s) {
			sideHeight = 100 - 100 * (80 / $(".sidebar").css("height").replace("px", ""));
			$stop.css("height", ((page - 1) * sideHeight/(pages - 1)) + "%");
			$scroll.css("top", ((page - 1) * sideHeight/(pages - 1)) + "%");
			$sbottom.css("height", (sideHeight - (page - 1) * sideHeight/(pages - 1)) + "%");
		}, 5);
		
		setTimeout(function() {
			isScrolling = false;
			isResize = false;
			$smooth.addClass("smooth");
			$text.addClass("smooth-text");
		}, 10);
	});
	
/****************************
 * Animation functionality: *
 ****************************/
	
// HAMINATION
	$logo.html("");
	
	var logoHover = true;
	var animData = {
        wrapper: document.getElementById('logo'),
        animType: 'svg',
        loop: false,
        prerender: true,
        autoplay: true,
        path: '/js/logo-c.json'
    };
    var anim1 = bodymovin.loadAnimation(animData);
	animData = {
		wrapper: document.getElementById('logo2'),
		animType: 'svg',
		loop: false,
		prerender: true,
		autoplay: false,
		path: '/js/logo-ov-o.json'
	};
	var anim2 = bodymovin.loadAnimation(animData);
	animData = {
		wrapper: document.getElementById('logo3'),
		animType: 'svg',
		loop: false,
		prerender: true,
		autoplay: false,
		path: '/js/logo-ov-c.json'
	};
	var anim3 = bodymovin.loadAnimation(animData);
	
	$lwrap.on("mouseover", function(e) {
		if(!logoHover) {
			logoHover = true;
			$logo2.removeClass("invisible");
			$logo.addClass("invisible");
			$lspin.addClass("rotate-down");
			$lt.removeClass("invisible");
			$ln.addClass("invisible");
			$lline.addClass("logo-line-r");
			anim2.goToAndPlay(0, true);
			setTimeout(function() {
				if($logo.hasClass("invisible")) {
					$logo3.removeClass("invisible");
					$logo2.addClass("invisible");
					$lspin.removeClass("rotate-down");
					$lt.addClass("invisible");
					$ln.removeClass("invisible");
					$lline.removeClass("logo-line-r");
					anim3.goToAndPlay(0, true);
				}
			}, 5000);
			setTimeout(function() {
				if($logo.hasClass("invisible")) {
					$logo.removeClass("invisible");
					$logo3.addClass("invisible");
					logoHover = false;
				}
			}, 7500);
		}
	});
	
// Landing animation
	$backg.addClass("visible");
	setTimeout(function() {
		$lname.addClass("visible");
		$lwrap.addClass("logo-expand");
		$lline.addClass("logo-line-expand");
		$scroll.removeClass("invisible");
		$(".mail").removeClass("invisible");
		$(".mail-mobile").removeClass("invisible");
		$sbottom.css("height", sideHeight + "%");
	}, 2000);
	setTimeout(function() {
		$lname.removeClass("smooth");
		$lwrap.removeClass("smooth");
		$sbottom.removeClass("smooth").removeClass("side-bottom-init");
		$backg.addClass("smooth");
		logoHover = false;
	}, 3000);
	setTimeout(function() {
		if(!isResize) {
			isScrolling = false;
		}
		$sbottom.addClass("smooth");
	}, 3100);
	
// Mouse-based movement
	var dragScroll = false;
	var initY;
	
	$(document).mousemove(function(e) {
		if($window.width() < 800) {
			return;
		}
		var y = (($window.height() / 2) - e.pageY) / 200;
		var x = (($window.width() / 2) - e.pageX) / 200;
		$standard.css("-moz-transform", "translate3d(" + (x / 3) + "px, " + (y / 3) + "px, 0px)");
		$standard.css("-webkit-transform", "translate3d(" + (x / 3) + "px, " + (y / 3) + "px, 0px)");
		$standard.css("transform", "translate3d(" + (x / 3) + "px, " + (y / 3) + "px, 0px)");
		$medium.css("-moz-transform", "translate3d(" + (x / 2) + "px, " + (y / 2) + "px, 0px)");
		$medium.css("-webkit-transform", "translate3d(" + (x / 2) + "px, " + (y / 2) + "px, 0px)");
		$medium.css("transform", "translate3d(" + (x / 2) + "px, " + (y / 2) + "px, 0px)");
		$high.css("-moz-transform", "translate3d(" + x + "px, " + y + "px, 0px)");
		$high.css("-webkit-transform", "translate3d(" + x + "px, " + y + "px, 0px)");
		$high.css("transform", "translate3d(" + x + "px, " + y + "px, 0px)");
		$back.css("-moz-transform", "translate3d(" + (-x / 3) + "px, " + (-y / 3) + "px, 0px)");
		$back.css("-webkit-transform", "translate3d(" + (-x / 3) + "px, " + (-y / 3) + "px, 0px)");
		$back.css("transform", "translate3d(" + (-x / 3) + "px, " + (-y / 3) + "px, 0px)");
		
	// Sidebar drag-scroll
		if(dragScroll) {
			var top = Math.min(Math.max(e.pageY - initY, 0), ($(".sidebar").css("height").replace("px", "") - 80));
			$scroll.css("top", top);
			$stop.css("height", top + "px");
			$sbottom.css("height", ($(".sidebar").css("height").replace("px", "") - 80 - top) + "px");
			$scount.html("<span class='side-page'>" + (($scroll.css("top").replace("px", "")/(($(".sidebar").css("height").replace("px", "") - 80) / (pages - 1))) + 1).toFixed(0) + "</span> / <span class='side-total'>" + pages + "</span>");
		}
	});
	
// Disable all the things
	$(document).on("mousedown", function(e) {
		e.preventDefault();
	});
	
	$(".no-tap").on("tap", function(e) {
		e.preventDefault();
	});
	
	$(".no-tap").on("taphold", function(e) {
		e.preventDefault();
	});
	
	$(document).on("contextmenu", function(e) {
		e.preventDefault();
	});
	
	$scroll.on("mousedown", function(e) {
		if($window.width() < 800) {
			e.preventDefault();
			e.stopPropogation();
			return;
		}
		if(!isScrolling && !isResize) {
			$scroll.removeClass("smooth");
			$stop.removeClass("smooth");
			$sbottom.removeClass("smooth");
			initY = e.pageY - $scroll.position().top;
			dragScroll = true;
			isScrolling = true;
		}
	});
	
	$(document).on("mouseup", function(e) {
		if($window.width() < 800) {
			e.preventDefault();
			return;
		}
		if(dragScroll) {
			dragScroll = false;
			isScrolling = false;
			$scroll.addClass("smooth");
			$stop.addClass("smooth");
			$sbottom.addClass("smooth");
			scrollToPage((($scroll.css("top").replace("px", "")/(($(".sidebar").css("height").replace("px", "") - 80) / (pages - 1))) + 1).toFixed(0));
		}
	});
	
	var pdesc = ["<a class='smooth-text' href='http://sjb.alexmacpherson.uk/' target='_blank'>SJB Carpentry & Joinery</a><br><br>Clean and responsive one-page design developed in PHP, coupled with intricate JavaScript and CSS3 animations to provide a seamless and enticing user experience, showcasing the work of the company.",
	
	"<a class='smooth-text' href='http://ePerlego.herokuapp.com/' target='_blank'>ePerlego - The Social VLE</a><br><br>My undergraduate thesis: a feature-rich web-based academic companion tool, serving primarily as a student performance tracker to promote achievement and aid parental involvement in schools. I developed the system in Ruby on Rails, deploying on Heroku.",
	
	"<a class='smooth-text' href='http://cs261.herokuapp.com/' target='_blank'>Data Cleansing & Pattern Analysis System</a><br><br>Python/Django-backed system capable of identifying clusters and communications patterns within large datasets - in this case an email corpus. I developed the front-end using D3.js to visualise the data graphically."];
	
	$pdesc.html(pdesc[project - 101]);
	$projects.click(function() {
		if($(this).hasClass("project-left") && $(this).attr('id') != '100') {
			$("#" + (project - 2)).removeClass("hide-left");
			$("#" + (project - 1)).removeClass("project-left");
			$("#" + project).addClass("project-right");
			$("#" + (project + 1)).addClass("hide-right");
			project--;
			$pdesc.html(pdesc[project - 101]);
		} else if($(this).hasClass("project-right") && $(this).attr('id') != '104') {
			$("#" + (project - 1)).addClass("hide-left");
			$("#" + project).addClass("project-left");
			$("#" + (project + 1)).removeClass("project-right");
			$("#" + (project + 2)).removeClass("hide-right");
			project++;
			$pdesc.html(pdesc[project - 101]);
		}
	});
});