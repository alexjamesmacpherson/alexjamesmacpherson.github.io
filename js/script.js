/* Globals */
var $window = $(window);
var $droppable = $(".droppable");
var $dropped = $(".dropped");
var $dropRow = $(".drop-row");
var dropPoint;
var isScrolling = false;
var scrollTime;
var mobileBreakpoint = 1024;

var $navbar = $("#navbar");
var $navButs = $("li");
var $navLines = $(".nav-line");
var $logoBut = $(".logo-but").children(".logo-text");
var navHeight;
var fixedNav;
var navLogo;
var logoHover = false;

var $mobNav = $("#mobile-nav");
var $mobButs = $(".menu-but");
var $mobMenu = $("#mobile-but");
var mobileButton;
var menuOpen = false;
var menuVisible = false;

var $hiddenSect = $(".section-hide");

var $land = $("#land");
var $landDesc = $("#desc");
var $landText = $("#desc-text");
var pageReady = false;
var animReady = false;
var landAnimComplete = false;

var $about = $("#about");
var aboutHeight;

var $contact = $("#contact");
var contactHeight;

var $foot = $("#foot");
var $footLogo = $("#foot-logo");
var $footDesc = $("#foot-desc");
var $footText = $("#foot-typed");
var footAnim = true;
var footViews = 0;
var byes = ["Cheerio then!", "Toodle pip!", "Until next time!", "Ta-ta for now!", "Be seeing you!", "Catch you later!", "See you around!", "Later tater!", "Au revoir", "Adieu!", "À bientôt"];
var cheers = ["Thanks for dropping by!", "Thanks for coming!", "Cheers for taking the time!", "Merci beaucoup!", "Merci bien!"];

/* Start doing things */
landingAnimation();
sizeSetter();

/* Wait for all images to load before rendering rest of page */
$(window).on("load", function() {
  sizeSetter();
  /* Finish drawing page */
  pageReady = true;
  if(animReady) {
    drawNav();
  }

  /* Nav button scrolling */
  $($navButs[0]).click(function() {
    scrollToPage(0);
  });
  $($navButs[1]).click(function() {
    scrollToPage(1);
  });
  $($navButs[2]).click(function() {
    scrollToPage(2);
  });
  $($navButs[3]).click(function() {
    openCV();
  });

  /* Mobile button scrolling */
  $($mobButs[0]).click(function() {
    scrollToPage(0);
  });
  $($mobButs[1]).click(function() {
    scrollToPage(1);
  });
  $($mobButs[2]).click(function() {
    scrollToPage(2);
  });
  $($mobButs[3]).click(function() {
    openCV();
  });

  /* Inline button scrolling */
  $("#contact-link").click(function() {
    scrollToPage(2);
  });

  /* Inline CV link */
  $("#cv-link").click(function() {
    openCV();
  });

  /* Nav logo animation */
  $($navButs[0]).on("mouseenter", function() {
    logoHover = true;
    if($navbar.hasClass("nav-fixed") && !$navbar.hasClass("nav-end")) {
      navLogoClose();
    }
  });
  $($navButs[0]).on("mouseleave", function() {
    logoHover = false;
    if($navbar.hasClass("nav-fixed") && !$navbar.hasClass("nav-end")) {
      navLogoOpen();
    }
  });

  /* Mobile menu handling */
  $mobMenu.click(function() {
    if(menuOpen) {
      menuOpen = false;
      mobileMenuClose();
    } else {
      menuOpen = true;
      mobileMenuOpen();
    }
  });
});

/* Begin landing animation */
function landingAnimation() {
  var animData = {
    wrapper: document.getElementById('logo'),
    animType: 'svg',
    renderer: 'svg',
    loop: false,
    prerender: true,
    autoplay: true,
    path: '/js/data.json'
  };
  var landLogo = bodymovin.loadAnimation(animData);
  landLogo.addEventListener('complete', drawText);

  /* Draw nav logo */
  var animData3 = {
    wrapper: document.getElementById('nav-logo'),
    animType: 'svg',
    renderer: 'svg',
    loop: false,
    prerender: true,
    autoplay: false,
    path: '/js/data.json'
  };
  navLogo = bodymovin.loadAnimation(animData3);
  navLogo.setSpeed(3);
  navLogo.addEventListener('complete', function() {
    if(logoHover || !$navbar.hasClass("nav-fixed") || $navbar.hasClass("nav-end")) {
      $logoBut.removeClass("invisible");
    }
  });

  /* Mobile nav button */
  var animData4 = {
    wrapper: document.getElementById('mobile-but'),
    animType: 'svg',
    renderer: 'svg',
    loop: false,
    prerender: true,
    autoplay: false,
    path: '/js/mobile.json'
  };
  mobileButton = bodymovin.loadAnimation(animData4);
}

/* Draw landing text */
function drawText() {
  $landDesc.removeClass("invisible");
  setTimeout(function() {
    $landDesc.removeClass("smooth-text");
    $landText.typed({
      strings: ["^250 Alex Macpherson", "^250 Technical Lead", "^250 Staff Engineer"],
      typeSpeed: 50,
      startDelay: 1500,
      backSpeed: 25,
      backDelay: 2500,
      loop: true,
      showCursor: true
    });
    drawNav();
  }, 500);
}

/* Draw navbar, unhide sections */
function drawNav() {
  if(pageReady) {
    $($navButs[0]).removeClass("nav-hide");
    setTimeout(function() {
      $($navButs[1]).removeClass("nav-hide");
    }, 200);
    setTimeout(function() {
      $($navButs[2]).removeClass("nav-hide");
    }, 400);
    setTimeout(function() {
      $($navButs[3]).removeClass("nav-hide");
      $hiddenSect.removeClass("section-hide");
      sizeSetter();
      footAnim = false;
      landAnimComplete = true;
    }, 600);
  } else {
    animReady = true;
  }
}

/* Draw footer text */
function drawFoot() {
  footViews++;
  $footDesc.removeClass("invisible");
  setTimeout(function() {
    $footDesc.removeClass("smooth-text");
		footTyped();
  }, 500);
}
function footTyped() {
  var rand = Math.floor(Math.random() * byes.length);
  var rand2 = Math.floor(Math.random() * cheers.length);
  $footText.typed({
    strings: ["^250" + byes[rand], "^250" + cheers[rand2], "^250 © 2024 Alex Macpherson", "^250 All Images Licensed CC0", "^250 All Rights Reserved"],
    typeSpeed: 50,
    startDelay: 1500,
    backSpeed: 25,
    backDelay: 2500,
    loop: true,
    showCursor: true
  });
}

/* Resize & scroll handling */
$window.scroll(function () {
  sizeSetter();
});
$window.on("resize", function() {
  sizeSetter();
  if(window.innerWidth >= mobileBreakpoint) {
    menuOpen = false;
    mobileMenuClose();
  }
});
$window.on("orientationchange", function() {
  sizeSetter();
});
document.body.className = 'ontouchstart' in document.documentElement ? '' : 'hover';

function sizeSetter() {
  scrollTime = window.innerWidth < mobileBreakpoint ? 0 : 1000;
  fixedNav = window.innerWidth < mobileBreakpoint ? 0 : $navbar.outerHeight();
  navHeight = Math.ceil($land.outerHeight() - fixedNav);
  aboutHeight = Math.ceil($about.offset().top);
  contactHeight = Math.ceil($contact.offset().top);
  if(window.innerWidth >= mobileBreakpoint) {
    dropPoint = $window.height() - 30;
  } else {
    dropPoint = $window.height();
  }
  scrollHandler();
}

function scrollHandler() {
  if(landAnimComplete && $window.scrollTop() + $window.innerHeight() >= contactHeight - 1 && window.innerWidth >= mobileBreakpoint) {
    $navbar.addClass("nav-end");
    navLogoClose();
  } else if($window.scrollTop() >= navHeight && window.innerWidth >= mobileBreakpoint) {
    $navbar.removeClass("nav-end");
    logoHover = false;
    navLogoOpen();
    if(!$navbar.hasClass("nav-fixed")) {
      $navbar.addClass("nav-fixed");
      $navLines.css("height", "0");
      setTimeout(function() {
        $navLines.css("top", "0");
        $navLines.css("height", "");
        $navbar.addClass("fixed-fade");
      }, 300);
    }
  } else if($window.scrollTop() < navHeight) {
    $navbar.removeClass("nav-end");
    $navbar.removeClass("fixed-fade");
    navLogoClose();
    if($navbar.hasClass("nav-fixed")) {
      $navbar.removeClass("nav-fixed");
      $navLines.css("height", "0");
      setTimeout(function() {
        $navLines.css("height", "");
        $navLines.css("top", "");
      }, 300);
    }
  } else {
    $navbar.removeClass("nav-end");
  }

  if(!isScrolling) {
    if($window.scrollTop() + $window.innerHeight() >= contactHeight - 1) {
      $navLines.removeClass("nav-line-selected");
      $($navLines[2]).addClass("nav-line-selected");
    } else if($window.scrollTop() >= aboutHeight - fixedNav) {
      $navLines.removeClass("nav-line-selected");
      $($navLines[1]).addClass("nav-line-selected");
    } else {
      $navLines.removeClass("nav-line-selected");
      $($navLines[0]).addClass("nav-line-selected");
    }
    if($window.scrollTop() >= aboutHeight && landAnimComplete) {
      menuVisible = true;
      $mobMenu.removeClass("send-to-back");
      $mobMenu.removeClass("invisible");
    } else {
      menuVisible = false;
      if(!menuOpen) {
        $mobMenu.addClass("invisible");
        setTimeout(function() {
          if(!menuVisible) {
            $mobMenu.addClass("send-to-back");
          }
        }, 500);
      }
    }
  }

  if($window.scrollTop() >= $about.offset().top && $window.scrollTop() + window.innerHeight < $contact.offset().top) {
    $about.children(".left").css("top", "");
    $about.children(".left").addClass("left-fixed");
    $about.children(".right").addClass("right-float");
  } else {
    $about.children(".left").removeClass("left-fixed");
    $about.children(".right").removeClass("right-float");
    if($window.scrollTop() + window.innerHeight >= $contact.offset().top && window.innerWidth >= mobileBreakpoint) {
      $about.children(".left").css("top", $about.outerHeight() - $about.children(".left").outerHeight());
    } else {
      $about.children(".left").css("top", "");
    }
  }

  dropHandler();

  /* Animate footer when visible */
  if($window.scrollTop() + $window.height() > $foot.offset().top) {
    if(!footAnim) {
      footAnim = true;
      var animData2 = {
        wrapper: document.getElementById('foot-logo'),
        animType: 'svg',
        renderer: 'svg',
        loop: false,
        prerender: true,
        autoplay: true,
        path: '/js/data.json'
      };
      var footLogo = bodymovin.loadAnimation(animData2);
      footLogo.addEventListener('complete', drawFoot);
    }
  } else {
    footAnim = false;
    $footLogo.html("");
    $footDesc.addClass("invisible");
    $footText.typed({
      strings: [""],
      typeSpeed: 50,
      startDelay: 1500,
      backSpeed: 25,
      backDelay: 2500,
      loop: true,
      showCursor: true
    });
  }
}

/* Handle navbar clicks */
function clickScroll(pageNum) {
  isScrolling = true;
  $navLines.removeClass("nav-line-selected");
  $($navButs[pageNum]).children(".nav-line").addClass("nav-line-selected");
  setTimeout(function() {
    isScrolling = false;
    sizeSetter();
  }, scrollTime);
}

/* Scroll to page */
function scrollToPage(pageNum) {
  if(landAnimComplete) {
    menuOpen = false;
    mobileMenuClose();
    clickScroll(pageNum);
    var page = 0;
    switch(pageNum) {
      case 1: page = aboutHeight;
        break;
      case 2: page = contactHeight - $window.innerHeight();
        break;
    }
    $('html, body').animate({
      scrollTop: page,
    }, scrollTime, "swing");
  }
}

/* Open CV */
function openCV() {
  setTimeout(function() {
    window.open('/curriculum-vitae.pdf','_blank');
  }, 300);
}

/* Nav logo animation functions */
function navLogoOpen() {
  $logoBut.addClass("invisible");
  navLogo.setDirection(1);
  navLogo.play();
}
function navLogoClose() {
  navLogo.setDirection(-1);
  navLogo.play();
}

/* Mobile menu animation functions */
function mobileMenuOpen() {
  $mobNav.removeClass("send-to-back");
  $mobNav.removeClass("invisible");
  mobileButton.setDirection(1);
  mobileButton.play();
  setTimeout(function() {
    if(!$mobNav.hasClass("invisible")) {
      $($mobButs[0]).removeClass("nav-hide");
    }
  }, 300);
  setTimeout(function() {
    if(!$mobNav.hasClass("invisible")) {
      $($mobButs[1]).removeClass("nav-hide");
    }
  }, 400);
  setTimeout(function() {
    if(!$mobNav.hasClass("invisible")) {
      $($mobButs[2]).removeClass("nav-hide");
    }
  }, 500);
  setTimeout(function() {
    if(!$mobNav.hasClass("invisible")) {
      $($mobButs[3]).removeClass("nav-hide");
    }
  }, 600);
  setTimeout(function() {
    if(!$mobNav.hasClass("invisible")) {
      $($mobButs[4]).removeClass("nav-hide");
    }
  }, 700);
}
function mobileMenuClose() {
  $mobNav.addClass("invisible");
  setTimeout(function() {
    if($mobNav.hasClass("invisible")) {
      $mobNav.addClass("send-to-back");
      $mobButs.addClass("nav-hide");
      if(!menuVisible) {
        $mobMenu.addClass("send-to-back");
      }
    }
  }, 500);
  mobileButton.setDirection(-1);
  mobileButton.play();
}

/* Text drop animations */
function dropHandler() {
  var dropChange = false;
  $droppable.each(function() {
    if(landAnimComplete && $window.scrollTop() > $(this).offset().top - dropPoint) {
      dropChange = true;
      var el = $(this);
      el.removeClass("droppable");
      el.addClass("dropped");
      setTimeout(function() {
        if(el.hasClass("dropped")) {
          el.removeClass("smooth-text");
        }
      }, 500);
    }
  });
  $dropped.each(function() {
    if(landAnimComplete && $window.scrollTop() + $window.height() < $(this).offset().top) {
      dropChange = true;
      var el = $(this);
      el.addClass("droppable");
      el.addClass("smooth-text");
      el.removeClass("dropped");
    }
  });
  if(dropChange) {
    $droppable = $(".droppable");
    $dropped = $(".dropped");
  }

  $dropRow.each(function() {
    var $row = $(this);
    if(landAnimComplete && $window.scrollTop() > $row.offset().top - dropPoint) {
      $row.addClass("dropped-row");
      var dropDelay = 0;
      $row.children().each(function() {
        var $this = $(this);
        setTimeout(function() {
          if($row.hasClass("dropped-row")) {
            $this.removeClass("droppable-row");
          }
        }, 200 * dropDelay++);
      });
    } else {
      $row.removeClass("dropped-row");
      $row.children().each(function() {
        var $this = $(this);
        $this.addClass("droppable-row");
      });
    }
  });
}
