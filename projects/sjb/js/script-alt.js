$(document).ready(function() {
	setTimeout(function() {
		history.replaceState("", document.title, window.location.pathname);
	}, 5);
	$(window).on('hashchange', function(e){
		history.replaceState("", document.title, e.originalEvent.oldURL);
	});
	
	$(".nav").removeClass("nav-back");
	setTimeout(function() {
		$(".nav").addClass("smooth");
	}, 10);
	
	$(".return-button").click(function(e) {
		e.preventDefault();
		window.history.back();
	});
	
	$(window).scroll(function() {
		if($(window).scrollTop() > 0 && $(window).scrollTop() > $(".title-name").offset().top - 30) {
			$(".nav").addClass("nav-back");
		} else {
			$(".nav").removeClass("nav-back");
		}
		
		dropHandler();
	});
	
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
		
		if(!droppedfoot && $(window).scrollTop() > $(".footer").offset().top - $(window).height()) {
			droppedfoot = true;
			$(".foot-text").removeClass("invisible");
			$(".foot-logo").removeClass("invisible");
			$(".foot-am").removeClass("invisible");
		}
	}
	dropHandler();
	
	$(".button-top").removeClass("invisible");
	$(".description").removeClass("invisible");
	setTimeout(function() {
		$(".button-top").removeClass("smooth");
		$(".button-top").addClass("smooth-text");
	}, 1000);
	
	$(window).on("resize", function() {
		var $smooth = $(".smooth");
		var $text = $(".smooth-text");
		$smooth.removeClass("smooth");
		$text.removeClass("smooth-text");
		setTimeout(function() {
			$smooth.addClass("smooth");
			$text.addClass("smooth-text");
		}, 10);
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