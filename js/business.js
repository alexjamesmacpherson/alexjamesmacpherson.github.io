$(function () {
	var animData = {
        wrapper: document.getElementById('logo'),
        animType: 'svg',
		renderer: 'svg',
        loop: false,
        prerender: true,
        autoplay: true,
        path: '/js/data.json'
    };
    var anim = bodymovin.loadAnimation(animData);
	anim.addEventListener('complete', drawText);
	
	$('#desc').click(function() {
		window.open("http://www.alexmacpherson.uk", "_self");
	});
});

$('body').on('touchmove', function(event) {
	event.preventDefault();
}, false);

function drawText() {
	$("#desc").removeClass("invisible");
	$("#mail").removeClass("invisible");
	setTimeout(function() {
		$("#desc").removeClass("smooth-text");
		$("#mail").removeClass("smooth-text");
		$("#desc-text").typed({
			strings: ["^250 Alex Macpherson", "^250 Web Developer", "^250 UI/UX Designer", "^250 Software Engineer", "^250 Click For More Info^1000"],
			typeSpeed: 50,
			startDelay: 1500,
			backSpeed: 25,
			backDelay: 2500,
			loop: true,
			showCursor: true
		});
	}, 500);
}