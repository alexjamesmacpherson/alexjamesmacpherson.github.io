/* Globals */
var $window = $(window);
var $droppable = $(".droppable");
var $dropped = $(".dropped");
var $dropRow = $(".drop-row");
var dropPoint;
var isScrolling = false;
var scrollTime;

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
var $tk = $("#tk");
var $aaron = $("#aaron");
var $hamish = $("#hamish");
var aboutHeight;

var $projects = $("#projects");
var $proHeads = $(".project-head");
var $projExpand = $(".project-expand");
var projectsHeight;
var projLoad = false;
var whiffDirection = 1;
var whiffDiffDirection = 1;
var whiffLogo;
var whiffDiff;

var $contact = $("#contact");
var $form = $("form");
var $inName = $("#in-name");
var $inEmail = $("#in-email");
var $inMessage = $("#in-message");
var $inSubmit = $("#in-submit");
var contactHeight;
var tempEmail = "";

var $foot = $("#foot");
var $footLogo = $("#foot-logo");
var $footDesc = $("#foot-desc");
var $footText = $("#foot-typed");
var footAnim = true;
var footViews = 0;
var links = ['https://www.youtube.com/watch?v=cZO9tMetxno','https://www.youtube.com/watch?v=Mh5LY4Mz15o','https://www.youtube.com/watch?v=mheHbVev1CU','https://www.youtube.com/watch?v=L5xQ7wWDRPs','https://www.youtube.com/watch?v=4oP5SVUdHtM','https://www.youtube.com/watch?v=oHyctwgE6m4','https://www.youtube.com/watch?v=qlTA3rnpgzU'];
var byes = ["Cheerio then!", "Farewell friend!", "Until next time!", "Ta-ta for now!", "Be seeing you!"];
var cheers = ["Thanks for dropping by!", "Cheers for stopping over!", "Thanks for coming!"];

/* Start doing things */
landingAnimation();
sizeSetter();

/* Wait for all images to load before rendering rest of page */
$(window).on("load", function() {
	sizeSetter();
	drawEmoji();
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
		scrollToPage(3);
	});
	$($navButs[4]).click(function() {
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
		scrollToPage(3);
	});
	$($mobButs[4]).click(function() {
		openCV();
	});
	
/* Inline button scrolling */
	$("#work-link").click(function() {
		scrollToPage(2);
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
	
/* Footer handling */
	$footDesc.click(function() {
		if($(this).hasClass("foot-link")) {
			var rand = Math.floor(Math.random() * links.length);
			window.open(links[rand],'_blank');
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
	
// Prevent all natural scrolling and iOS rubber-banding:
	$('body').on('touchmove', function(event) {
		if(menuOpen || !landAnimComplete) {
			event.preventDefault();
		}
	});
	$(document).on("mousewheel DOMMouseScroll", function(e) {
		if(menuOpen || !landAnimComplete) {
			e.preventDefault();
		}
	});
	
/* AJAX Mailer */
	$form.submit(function(event) {
		event.preventDefault();
		var send = true;
	/* Throw some errors */
		if($inName.val() == "") {
			send = false;
			$inName.prop("placeholder","who even are you?");
			$inName.addClass("in-error");
		}
		if($inEmail.val() == "") {
			send = false;
			$inEmail.prop("placeholder","but what of your email?");
			$inEmail.addClass("in-error");
		}else if(!isEmail($inEmail.val())) {
			send = false;
			tempEmail = $inEmail.val();
			$inEmail.val("");
			$inEmail.prop("placeholder","something's amiss here");
			$inEmail.addClass("in-error");
		}
		if($inMessage.val() == "") {
			send = false;
			$inMessage.prop("placeholder","go on, say something");
			$inMessage.addClass("in-error");
		}
	/* Post some mail */
		if(send) {
			var formData = $form.serialize();
			$inName.prop("disabled",true);
			$inEmail.prop("disabled",true);
			$inMessage.prop("disabled",true);
			$inSubmit.prop("disabled",true);
			$inSubmit.prop("value","Sending");
			$.ajax({
				type: 'POST',
				url: $form.attr('action'),
				data: formData
			})
			.done(function(response) {
				$inSubmit.prop("value","Message Sent");
			});
		} else {
			$inSubmit.prop("disabled",true);
			$inSubmit.prop("value","Oh No");
		}
	});
	
/* Remove errors */
	$inName.focusin(function() {
		$(this).removeClass("in-error");
		$inName.prop("placeholder","name");
		contactErrors();
	});
	$inEmail.focusin(function() {
		$(this).removeClass("in-error");
		$inEmail.prop("placeholder","email");
		if(tempEmail != "") {
			$inEmail.val(tempEmail);
			tempEmail = "";
		}
		contactErrors();
	});
	$inMessage.focusin(function() {
		$(this).removeClass("in-error");
		$inMessage.prop("placeholder","message");
		contactErrors();
	});
	
	$proHeads.click(function() {
		if(!projLoad) {
			projLoad = true;
			var $this = $(this);
			var $projCont = $this.parent();
			var $projBody = $this.siblings(".project-body");
			var $prevExpanded = $projCont.prevAll(".project-expand");
			var $projText = $projBody.children(".project-text");
			
			if($projCont.is("#esport") && !$projCont.hasClass("project-expand")) {
				whiffDiff.play();
				whiffLogo.play();
			} else {
				whiffDiff.pause();
				whiffLogo.pause();
			}
			
			if(window.innerWidth >= 800) {
				var scrollSubtraction = 0;
				if($window.scrollTop() != Math.ceil($this.offset().top)) {
					$('html, body').animate({
						scrollTop: Math.ceil($this.offset().top)
					}, 500, "swing");
				} else {
					scrollSubtraction = 500;
				}
				if($projCont.hasClass("project-expand")) {
					setTimeout(function() {
						$projCont.removeClass("project-expand");
						$this.animate({
							height: "100vh"
						}, 750, "swing");
						$projExpand = $(".project-expand");
					}, 550 - scrollSubtraction);
					setTimeout(function() {
						$projBody.css("height","");
						projLoad = false;
						sizeSetter();
					}, 1300 - scrollSubtraction);
				} else {
					setTimeout(function() {
						var $expanded = $(".project-expand");
						$expanded.removeClass("project-expand");
						$expanded.children(".project-head").css("height","");
						$expanded.children(".project-body").css("height","");
						$projCont.addClass("project-expand");
						$projExpand = $(".project-expand");
						$window.scrollTop(Math.ceil($this.offset().top));
						$this.animate({
							height: "50vh"
						}, 750, "swing");
						$projBody.css("height",$projText.outerHeight());
						var dropDelay = 1;
						$projText.children().each(function() {
							var $el = $(this);
							if(!$el.hasClass("drop-row")) {
								if($el.offset().top - (window.innerHeight/2) <= $window.scrollTop() + window.innerHeight) {
									setTimeout(function() {
										$el.addClass("dropped");
										$el.removeClass("droppable");
										setTimeout(function() {
											if($el.hasClass("dropped")) {
												$el.removeClass("smooth-text");
											}
										}, 500);
									}, 300 * dropDelay++);
								} else {
									$el.removeClass("dropped");
									$el.addClass("droppable");
									$el.addClass("smooth-text");
								}
							}
						});
					}, 550 - scrollSubtraction);
					setTimeout(function() {
						sizeSetter();
						projLoad = false;
					}, 1300 - scrollSubtraction);
				}
			} else {
				if($projCont.hasClass("project-expand")) {
					$projCont.removeClass("project-expand");
					$projBody.css("height","");
				} else {
					var $expanded = $(".project-expand");
					$expanded.removeClass("project-expand");
					$expanded.children(".project-body").css("height","");
					$projCont.addClass("project-expand");
					$projBody.css("height",$projText.outerHeight());
					$window.scrollTop(Math.ceil($projCont.offset().top));
				}
				$projExpand = $(".project-expand");
				sizeSetter();
				projLoad = false;
			}
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
	
/* Whiffers logo */
	var animData5 = {
		wrapper: document.getElementById('whiffers-logo'),
		animType: 'svg',
		renderer: 'svg',
		loop: false,
		prerender: true,
		autoplay: false,
		path: '/js/whiffers.json'
	};
	whiffLogo = bodymovin.loadAnimation(animData5);
	whiffLogo.addEventListener('complete', function() {
		whiffDirection *= -1;
		whiffLogo.setDirection(whiffDirection);
		var whiffDelay = 2500;
		if(whiffDirection > 0) {
			whiffDelay = 500;
		}
		setTimeout(function() {
			whiffLogo.play();
		}, whiffDelay);
	});
	
/* Whiffers differences */
	var animData6 = {
		wrapper: document.getElementById('whiffers-diff'),
		animType: 'svg',
		renderer: 'svg',
		loop: false,
		prerender: true,
		autoplay: false,
		path: '/js/whiffers-diff.json'
	};
	whiffDiff = bodymovin.loadAnimation(animData6);
	whiffDiff.addEventListener('complete', function() {
		whiffDiffDirection *= -1;
		whiffDiff.setDirection(whiffDiffDirection);
		var whiffDelay = 0;
		if(whiffDiffDirection > 0) {
			whiffDelay = 500;
		}
		setTimeout(function() {
			whiffDiff.play();
		}, whiffDelay);
	});
}

/* Draw landing text */
function drawText() {
	$landDesc.removeClass("invisible");
	setTimeout(function() {
		$landDesc.removeClass("smooth-text");
		$landText.typed({
			strings: ["^250 Alex Macpherson", "^250 Web Developer", "^250 UI/UX Designer", "^250 Software Engineer"],
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
		}, 600);
		setTimeout(function() {
			$($navButs[4]).removeClass("nav-hide");
			$hiddenSect.removeClass("section-hide");
			sizeSetter();
			footAnim = false;
			landAnimComplete = true;
		}, 800);
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
		if(footViews % 5 == 0) {
			footEdited();
		} else {
			footTyped();
		}
	}, 500);
}
function footTyped() {
	var rand = Math.floor(Math.random() * byes.length);
	var rand2 = Math.floor(Math.random() * cheers.length);
	$footDesc.removeClass("foot-link");
	$footText.typed({
		strings: ["^250" + byes[rand], "^250" + cheers[rand2], "^250 © 2016 Alex Macpherson", "^250 All Images Licensed CC0", "^250 All Rights Reserved"],
		typeSpeed: 50,
		startDelay: 1500,
		backSpeed: 25,
		backDelay: 2500,
		loop: true,
		showCursor: true
	});
}
function footEdited() {
	$footDesc.addClass("foot-link");
	$footText.typed({
		strings: [".^250.^250.", "^1000 You're still here.^250.^250.^250?", "^500 Wanna watch a funny?", "^250 Go on then, click this.^2000"],
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
	if(window.innerWidth >= 800) {
		menuOpen = false;
		mobileMenuClose();
	}
	$projExpand.find(".project-body").css("height", $projExpand.find(".project-text").outerHeight());
});
$window.on("orientationchange", function(event) {
	sizeSetter();
});
document.body.className = 'ontouchstart' in document.documentElement ? '' : 'hover';

function sizeSetter() {
	scrollTime = window.innerWidth < 800 ? 0 : 1000;
	fixedNav = window.innerWidth < 800 ? 0 : $navbar.outerHeight();
	navHeight = Math.ceil($land.outerHeight() - fixedNav);
	aboutHeight = Math.ceil($about.offset().top);
	projectsHeight = Math.ceil($projects.offset().top);
	contactHeight = Math.ceil($contact.offset().top);
	if(window.innerWidth >= 800) {
		dropPoint = (9 * $window.height() / 10);
	} else {
		dropPoint = $window.height();
	}
	scrollHandler();
}

function scrollHandler() {
	if(landAnimComplete && $window.scrollTop() >= contactHeight - 1 && window.innerWidth >= 800) {
		if($contact.outerHeight() <= window.innerHeight) {
			$navbar.css("background","none");
		} else {
			$navbar.css("background","");
		}
		$navbar.addClass("nav-end");
		navLogoClose();
	} else if($window.scrollTop() >= navHeight && window.innerWidth >= 800) {
		$navbar.css("background","");
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
		$navbar.css("background","");
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
		$navbar.css("background","");
		$navbar.removeClass("nav-end");
	}
	
	if(!isScrolling) {
		if($window.scrollTop() >= contactHeight - 1) {
			$navLines.removeClass("nav-line-selected");
			$($navLines[3]).addClass("nav-line-selected");
		} else if($window.scrollTop() >= projectsHeight - fixedNav) {
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
	
	if($window.scrollTop() >= $about.offset().top && $window.scrollTop() + window.innerHeight < $projects.offset().top) {
		$about.children(".left").css("top", "");
		$about.children(".left").addClass("left-fixed");
		$about.children(".right").addClass("right-float");
	} else {
		$about.children(".left").removeClass("left-fixed");
		$about.children(".right").removeClass("right-float");
		if($window.scrollTop() + window.innerHeight >= $projects.offset().top && window.innerWidth >= 800) {
			$about.children(".left").css("top", $about.outerHeight() - $about.children(".left").outerHeight());
		} else {
			$about.children(".left").css("top", "");
		}
	}
	
	if($window.scrollTop() >= $projects.offset().top && $window.scrollTop() + window.innerHeight < $contact.offset().top) {
		$projects.children(".left").css("top", "");
		$projects.children(".left").addClass("left-fixed");
		$projects.children(".right").addClass("right-float");
	} else {
		$projects.children(".left").removeClass("left-fixed");
		$projects.children(".right").removeClass("right-float");
		if($window.scrollTop() + window.innerHeight >= $contact.offset().top && window.innerWidth >= 800) {
			$projects.children(".left").css("top", $projects.outerHeight() - $projects.children(".left").outerHeight());
		} else {
			$projects.children(".left").css("top", "");
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
			case 2: page = projectsHeight;
				break;
			case 3: page = contactHeight;
				break;
		}
		$('html, body').animate({
			scrollTop: page
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

/* Draw all emoji characters */
function drawEmoji() {
	var emoji = twemoji.parse(" \ud83d\ude80");
	$(".rocket-emoji").append(emoji);
	emoji = twemoji.parse(" \ud83d\ude38");
	$(".cat-emoji").append(emoji);
	emoji = twemoji.parse(" \ud83d\udc7e");
	$(".si-emoji").append(emoji);
	emoji = twemoji.parse("\ud83d\udd17");
	$(".link").children(".no-wrap").append(emoji);
}

/* Email validation function */
function isEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

/* Clean up form errors */
function contactErrors() {
	if($(".in-error").length == 0) {
		$inSubmit.prop("disabled",false);
		$inSubmit.prop("value","Send Message");
	}
}