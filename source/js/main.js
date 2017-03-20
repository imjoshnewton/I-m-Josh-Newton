////////////////////////////////////////////////////////////////////////////////
//
//		JS for imjoshnewton.me
//		Version: 1.0
//		Updated: 3/1/17
//
////////////////////////////////////////////////////////////////////////////////

$(document).ready(function() {
	$("#menu").children("i").click(function() {
		$(this).toggleClass("fa-bars").toggleClass("fa-times").closest("#menu").toggleClass("open");
	});

	$("#menu").children("ul").children("li").children('a').click(function() {
		$(this).closest('#menu').toggleClass("open").children('i').removeClass("fa-times").addClass("fa-bars");
	});

	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});

  var touchStart = ('ontouchstart' in window),
      notFixed = $('.bg').css('background-attachment') === "scroll, scroll",
      mobileTouch = touchStart && notFixed;

  if(mobileTouch){
    $(window).scroll(function() {
      var wScroll = $(this).scrollTop();

      window.console.log(wScroll);

      $('.bg').css({
        backgroundPosition : 'center ' + wScroll /2 + 'px'
      });
    });
	}
	else{}
});
