$(document).ready(function () {
  // Reversed scrolling.
  $(document).scroll(function () {
    var top = $(this).scrollTop();
    var scrolledPercentage = (top / $(window).height()) * 100;
    $('.content').css({'bottom': '-' + top + 'px'});

    if (top > 200 && top < 300) {
      $('.rocket').css('bottom', 200 - (top - 200));
    } else if (top >= 300) {
      $('.rocket').css('bottom', 0);
    }
    else {
      $('.rocket').css('bottom', '');
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

  randomStars(50);

});
