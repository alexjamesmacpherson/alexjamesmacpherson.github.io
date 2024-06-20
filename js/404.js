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

  $('body').click(function() {
    window.location.replace("http://www.alexmacpherson.uk");
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
      strings: ["^250 404", "^250 Sorry Pal", "^250 Click To Go Back"],
      typeSpeed: 50,
      startDelay: 1500,
      backSpeed: 25,
      backDelay: 2500,
      loop: true,
      showCursor: true
    });
  }, 500);
}
