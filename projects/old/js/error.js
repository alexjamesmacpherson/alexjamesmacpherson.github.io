$(document).ready(function() {
// Prevent all natural scrolling and iOS rubber-banding:
	document.body.addEventListener('touchmove', function(event) {
		console.log(event.source);
		event.preventDefault();
	}, false);

	window.onresize = function() {
		$(document.body).width(window.innerWidth).height(window.innerHeight);
	}

	$(function() {
		window.onresize();
	});
	
	$(document).on("mousedown", function(e) {
		window.location.replace("http://www.alexmacpherson.uk/");
	});
	
	$(document).bind("touchstart", function(e) {
		window.location.replace("http://www.alexmacpherson.uk/");
	});
	
	$(document).bind("contextmenu", function(e) {
		e.preventDefault();
	});
	
	$("#logo").html("");
	var animData = {
        wrapper: document.getElementById('logo'),
        animType: 'svg',
        loop: false,
        prerender: true,
        autoplay: false,
        path: '/js/logo-c.json'
    };
	var anim = bodymovin.loadAnimation(animData);
	
	setTimeout(function() {
		$(".err-title").removeClass("invisible");
		$(".err-title").css("transform", "translate3d(0px, -40px, 0px)");
		$(".err-title").css("-moz-transform", "translate3d(0px, -40px, 0px)");
		$(".err-title").css("-webkit-transform", "translate3d(0px, -40px, 0px)");
	}, 1000);
	
	setTimeout(function() {
		$(".err-description").removeClass("invisible");
		$(".err-description").css("transform", "translate3d(0px, -40px, 0px)");
		$(".err-description").css("-moz-transform", "translate3d(0px, -40px, 0px)");
		$(".err-description").css("-webkit-transform", "translate3d(0px, -40px, 0px)");
		anim.play();
	}, 1600);
	
	var $move = $(".moveable");
	var $med = $(".moveable-med");
	var $high = $(".moveable-high");
	$(document).mousemove(function(e) {
		var y = (($(window).height() / 2) - e.pageY) / 200;
		var x = (($(window).width() / 2) - e.pageX) / 200;
		$move.css("transform", "translate3d(" + (x / 3) + "px, " + (y / 3) + "px, 0px)");
		$move.css("-moz-transform", "translate3d(" + (x / 3) + "px, " + (y / 3) + "px, 0px)");
		$move.css("-webkit-transform", "translate3d(" + (x / 3) + "px, " + (y / 3) + "px, 0px)");
		$med.css("transform", "translate3d(" + (x / 2) + "px, " + (y / 2) + "px, 0px)");
		$med.css("-moz-transform", "translate3d(" + (x / 2) + "px, " + (y / 2) + "px, 0px)");
		$med.css("-webkit-transform", "translate3d(" + (x / 2) + "px, " + (y / 2) + "px, 0px)");
		$high.css("transform", "translate3d(" + x + "px, " + y + "px, 0px)");
		$high.css("-moz-transform", "translate3d(" + x + "px, " + y + "px, 0px)");
		$high.css("-webkit-transform", "translate3d(" + x + "px, " + y + "px, 0px)");
	});
});