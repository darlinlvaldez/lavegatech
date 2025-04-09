$(document).ready(function () {
    $(".products-carousel").slick({
      slidesToShow: 4,
      slidesToScroll: 4,
      infinite: false,
      prevArrow: $("#slick-nav-prev"),
      nextArrow: $("#slick-nav-next"),
    });
  
    $(".section-tab-nav a").on("click", function () {
      setTimeout(function () {
        $(".products-carousel").slick("refresh");
      }, 500);
    });
  });