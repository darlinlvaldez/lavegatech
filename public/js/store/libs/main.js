import { checkFavorites } from "../fav/fav.js";

(function ($) {
  "use strict";

  // Mobile Nav toggle
  $(".menu-toggle > a").on("click", function (e) {
    e.preventDefault();
    $("#responsive-nav").toggleClass("active");
  });

  // Fix cart dropdown from closing
  $(".cart-dropdown").on("click", function (e) {
    e.stopPropagation();
  });

  /////////////////////////////////////////

  // Products Slick
  $(".products-slick").each(function () {
    var $this = $(this),
      $nav = $this.attr("data-nav");

    $this.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      infinite: true,
      speed: 300,
      dots: false,
      arrows: true,
      appendArrows: $nav ? $nav : false,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  });

  /////////////////////////////////////////

  function handleColorChange(event, slick, currentSlide) {
    var currentSlideElement = $(
      "#product-imgs .slick-slide:not(.slick-cloned)"
    ).eq(currentSlide);
    var imgElement = currentSlideElement.find("img");
    var color = imgElement.attr("alt");
    var productId = "<%= producto.id %>";

    if (color && productId) {
      $("#colorSeleccionado").val(color).trigger("change");

      document.querySelectorAll(".add-to-wishlist").forEach((button) => {
        button.dataset.productColor = color;
      });

      checkFavorites();
    }
  }

  // Product Main img Slick
  $("#product-main-img").slick({
    infinite: true,
    speed: 300,
    dots: false,
    arrows: true,
    fade: true,
    asNavFor: "#product-imgs",
  });

  var $productImgs = $("#product-imgs");
  var slideCount = $productImgs.find(".product-preview").length;

  var slickOptions = {
    slidesToShow: Math.min(3, slideCount),
    slidesToScroll: 1,
    centerPadding: 0,
    vertical: true,
    asNavFor: "#product-main-img",
    focusOnSelect: true, 
    responsive: [
      {
        breakpoint: 991,
        settings: {
          vertical: false,
          dots: false,
          focusOnSelect: true
        },
      },
    ],
  };

  if (slideCount <= 3) {
    $.extend(slickOptions, {
      arrows: false,
      centerMode: false,
      infinite: false,
      swipe: true,
      touchMove: true,
    });
    $productImgs.addClass("few-items");
  } else {
    $.extend(slickOptions, {
      arrows: true,
      centerMode: true,
      infinite: true,
    });
    $productImgs.removeClass("few-items");
  }

  $productImgs.slick(slickOptions);

  $productImgs.on("afterChange", handleColorChange);

  /////////////////////////////////////////

  function asegurarDosDecimales(input) {
    input.value = parseFloat(input.value).toFixed(2);
  }

  const priceInputs = [
    document.getElementById("price-min"),
    document.getElementById("price-max"),
  ];

  priceInputs.forEach((input) => {
    if (input) {
      input.addEventListener("input", function () {
        if (!this.value.includes(".")) {
          this.value = parseFloat(this.value).toFixed(2);
        } else {
          let parts = this.value.split(".");
          this.value = parts[0] + "." + "00";
        }
      });

      input.addEventListener("blur", function () {
        asegurarDosDecimales(this);
      });
    }
  });

  // Input number
  if (document.getElementById("price-slider")) {
    $(".input-number").each(function () {
      var $this = $(this),
        $input = $this.find('input[type="number"]'),
        up = $this.find(".qty-up"),
        down = $this.find(".qty-down");

      down.on("click", function () {
        var value = parseFloat($input.val()) - 500.0;
        value = value < 0.0 ? 0.0 : value;
        $input.val(value.toFixed(2));
        $input.change();
        updatePriceSlider($this, value);
      });

      up.on("click", function () {
        var value = parseFloat($input.val()) + 500.0;
        value = value > 100000.0 ? 100000.0 : value;
        $input.val(value.toFixed(2));
        $input.change();
        updatePriceSlider($this, value);
      });
    });

    var priceInputMax = document.getElementById("price-max"),
      priceInputMin = document.getElementById("price-min"),
      priceSlider = document.getElementById("price-slider"),
      resetButton = document.getElementById("reset-filtro-precio");

    var defaultMin = window.defaultMin || 0;
    var defaultMax = window.defaultMax || 100000;

    var savedMin = localStorage.getItem("priceMin") || defaultMin;
    var savedMax = localStorage.getItem("priceMax") || defaultMax;

    if (priceInputMin) priceInputMin.value = savedMin;
    if (priceInputMax) priceInputMax.value = savedMax;

    function updatePriceSlider(input) {
      let min = parseFloat(priceInputMin.value) || defaultMin;
      let max = parseFloat(priceInputMax.value) || defaultMax;

      if (input.id === "price-min" && min > max) {
        min = max;
        priceInputMin.value = min;
      }
      if (input.id === "price-max" && max < min) {
        max = min;
        priceInputMax.value = max;
      }

      priceSlider.noUiSlider.set([min, max]);

      localStorage.setItem("priceMin", min);
      localStorage.setItem("priceMax", max);
    }

    [priceInputMin, priceInputMax].forEach((input) => {
      if (input) {
        input.addEventListener("change", function () {
          updatePriceSlider(input, this.value);
        });
      }
    });

    if (priceSlider) {
      noUiSlider.create(priceSlider, {
        start: [savedMin, savedMax],
        connect: true,
        step: 0.01,
        range: { min: defaultMin, max: defaultMax },
      });

      priceSlider.noUiSlider.on("update", function (values, handle) {
        let value = parseFloat(values[handle]).toFixed(2);
        (handle ? priceInputMax : priceInputMin).value = value;
        localStorage.setItem(handle ? "priceMax" : "priceMin", value);
      });
    }

    if (resetButton) {
      resetButton.addEventListener("click", function () {
        localStorage.removeItem("priceMin");
        localStorage.removeItem("priceMax");

        priceInputMin.value = defaultMin;
        priceInputMax.value = defaultMax;

        priceSlider.noUiSlider.set([defaultMin, defaultMax]);

        actualizarProductos();
      });
    }
  }
})(jQuery);