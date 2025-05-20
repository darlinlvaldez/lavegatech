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
  var currentSlideElement = $('#product-imgs .slick-slide:not(.slick-cloned)').eq(currentSlide);
  var imgElement = currentSlideElement.find('img');
  var color = imgElement.attr('alt');
  var productId = '<%= producto.id %>';
  
  if(color && productId) {
    $('#colorSeleccionado').val(color).trigger('change');
  }
}

// Product Main img Slick
$("#product-main-img").slick({
  infinite: true,
  speed: 300,
  dots: false,
  arrows: true,
  fade: true,
  asNavFor: "#product-imgs"
});

// Product imgs Slick
var $productImgs = $("#product-imgs").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  centerMode: true,
  focusOnSelect: true,
  centerPadding: 0,
  vertical: true,
  asNavFor: "#product-main-img",
  responsive: [{
    breakpoint: 991,
    settings: {
      vertical: false,
      arrows: false,
      dots: true
    }
  }]
});
  
  $productImgs.on('afterChange', handleColorChange);


  // Product img zoom
  // var zoomMainProduct = document.getElementById("product-main-img");
  // if (zoomMainProduct) {
  //   $("#product-main-img .product-preview").zoom();
  // }

  /////////////////////////////////////////


  function asegurarDosDecimales(input) {
  input.value = parseFloat(input.value).toFixed(2);
}

const priceInputs = [document.getElementById("price-min"), document.getElementById("price-max")];

priceInputs.forEach(input => {
  if (input) {
    input.addEventListener("input", function () {
      if (!this.value.includes('.')) {
        this.value = parseFloat(this.value).toFixed(2);
      } else {
        let parts = this.value.split('.');
        this.value = parts[0] + '.' + '00';
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
      var value = parseFloat($input.val()) - 500.00; 
      value = value < 0.00 ? 0.00 : value; 
      $input.val(value.toFixed(2)); 
      $input.change();
      updatePriceSlider($this, value);
    });

    up.on("click", function () {
      var value = parseFloat($input.val()) + 500.00; 
      value = value > 100000.00 ? 100000.00 : value;
      $input.val(value.toFixed(2)); 
      $input.change();
      updatePriceSlider($this, value);
    });
  });

  var priceInputMax = document.getElementById("price-max"),
    priceInputMin = document.getElementById("price-min"),
    priceSlider = document.getElementById("price-slider"),
    resetButton = document.getElementById("reset-filtro-precio");

  var defaultMin = 0,
    defaultMax = 100000,
    savedMin = localStorage.getItem("priceMin") || defaultMin,
    savedMax = localStorage.getItem("priceMax") || defaultMax;

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