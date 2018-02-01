$(document).ready(function () {
  // Reversed scrolling.
  $(document).scroll(function () {
    var $earth = $('.earth');
    var top = $(this).scrollTop();
    var scrolledPercentage = (top / $(window).height()) * 100;
    $('.content').css({'bottom': '-' + top + 'px'});

    if (top > 200) {
      $('.rocket').addClass('transition');
    }
    else {
      $('.rocket').removeClass('transition');
    }

    if (($earth.offset().top + $earth.height()  - top) > $(window).height()) {
      $earth.css('bottom', $earth.offset().top - top);
      if ($(document).height() - $(window).height() > top - 300) {
        $earth.addClass('transition');
      }
      else {
        $earth.removeClass('transition');
      }
    }
    else {
      $earth.css('bottom', '');
      $earth.removeClass('transition');
    }
  });

  var randomStars = function (amountOfStars) {
    var $star = $('.star');
    var starParent = $star.parent();

    for (var i = 0; i <= amountOfStars; i++) {
      $star.clone().css({
        left: Math.floor(Math.random() * $(window).width()) + 0,
        top: Math.floor(Math.random() * $(document).height()) + 0,
        animation: 'stars 10s ' + (Math.floor(Math.random() * 5) + 1) + 's infinite',
        width: (Math.floor(Math.random() * 3) + 1) + '%',
      }).appendTo(starParent);
    }
  }

  randomStars(100);

});
