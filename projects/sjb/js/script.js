$(document).ready(function() {
	setTimeout(function() {
		history.replaceState("", document.title, window.location.pathname);
	}, 10);
	$(window).on('hashchange', function(e){
		history.replaceState("", document.title, e.originalEvent.oldURL);
	});
	
	$(".nav").removeClass("nav-back");
	setTimeout(function() {
		$(".nav").addClass("smooth");
	}, 10);
	
	$(window).scroll(function() {
		if($(window).scrollTop() > 0 && $(window).scrollTop() > $(".title-name").offset().top - 30) {
			$(".nav").addClass("nav-back");
		} else {
			$(".nav").removeClass("nav-back");
		}
		
		dropHandler();
		
		if($(window).width() >= 800) {
			titleScroll();
		}
	});
	
	var droppedwork = false;
	var droppedtest = false;
	var droppedfoot = false;
	function dropHandler() {
		$(".droppable").each(function() {
			if($(window).scrollTop() > $(this).offset().top - (9 * $(window).height() / 10)) {
				$(this).removeClass("droppable");
			}
		});
		
		$(".droppable-title").each(function() {
			if($(window).scrollTop() > $(this).offset().top - (9 * $(window).height() / 10)) {
				$(this).removeClass("droppable-title");
			}
		});
		
		if(!droppedwork && $(window).scrollTop() > $(".work").offset().top - (4 * $(window).height() / 5)) {
			droppedwork = true;
			$(".droppable-work").first().removeClass("droppable-work");
			setTimeout(function() {
				$(".droppable-work").first().removeClass("droppable-work");
			}, 250);
			setTimeout(function() {
				$(".droppable-work").first().removeClass("droppable-work");
			}, 500);
			setTimeout(function() {
				$(".droppable-work").first().removeClass("droppable-work");
			}, 750);
		}
		
		if(!droppedtest && $(window).scrollTop() > $(".testimonials").offset().top - (4 * $(window).height() / 5)) {
			droppedtest = true;
			$(".droppable-test").first().removeClass("droppable-test");
			setTimeout(function() {
				$(".droppable-test").first().removeClass("droppable-test");
			}, 250);
			setTimeout(function() {
				$(".droppable-test").first().removeClass("droppable-test");
			}, 500);
		}
		
		if(!droppedfoot && $(window).scrollTop() > $(".footer").offset().top - $(window).height()) {
			droppedfoot = true;
			$(".foot-text").removeClass("invisible");
			$(".foot-logo").removeClass("invisible");
			$(".foot-am").removeClass("invisible");
		}
		
		if($(window).scrollTop() > $(".contact-r").offset().top - (9 * $(window).height() / 10)) {
			$(".contact-r").removeClass("invisible");
		}
	}
	dropHandler();
	
	var $move = $(".moveable");
	var $head = $(".head-wrap");
	function titleScroll() {
		var y = $(window).scrollTop()/2;
		$move.css("transform", "translate3d(0px, " + y + "px, 0px)");
		$move.css("-moz-transform", "translate3d(0px, " + y + "px, 0px)");
		$move.css("-webkit-transform", "translate3d(0px, " + y + "px, 0px)");
		if($(window).scrollTop() > 0 && $(window).scrollTop() + $move.height() + $head.height() > $head.offset().top && $(window).width() < $move.width() + 2 * $head.width()) {
			$head.addClass("invisible");
		} else {
			$head.removeClass("invisible");
		}
	}
	
	$(window).on("resize", function() {
		var $smooth = $(".smooth");
		var $text = $(".smooth-text");
		$smooth.removeClass("smooth");
		$text.removeClass("smooth-text");
		setTimeout(function() {
			$smooth.addClass("smooth");
			$text.addClass("smooth-text");
		}, 10);
		
		if($(window).width() < 800) {
			$move.css("transform", "translate3d(0px, 0px, 0px)");
			$move.css("-moz-transform", "translate3d(0px, 0px, 0px)");
			$move.css("-webkit-transform", "translate3d(0px, 0px, 0px)");
			$head.removeClass("invisible");
		} else {
			titleScroll();
		}
	});
	
	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				var top;
				if($(window).height() + target.offset().top > $(document).height()) {
					top = $(document).height() - $(window).height();
				} else {
					top = target.offset().top;
				}
				
				$('html, body').animate({
					scrollTop: top
				}, 1000, "swing");
				return false;
			}
		}
	});
});