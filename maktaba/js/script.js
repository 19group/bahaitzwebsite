(function($) {

    "use strict";

    var searchPopup = function() {
      // open search box
      $('#header-nav').on('click', '.search-button', function(e) {
        $('.search-popup').toggleClass('is-visible');
      });

      $('#header-nav').on('click', '.btn-close-search', function(e) {
        $('.search-popup').toggleClass('is-visible');
      });
      
      $(".search-popup-trigger").on("click", function(b) {
          b.preventDefault();
          $(".search-popup").addClass("is-visible"),
          setTimeout(function() {
              $(".search-popup").find("#search-popup").focus()
          }, 350)
      }),
      $(".search-popup").on("click", function(b) {
          ($(b.target).is(".search-popup-close") || $(b.target).is(".search-popup-close svg") || $(b.target).is(".search-popup-close path") || $(b.target).is(".search-popup")) && (b.preventDefault(),
          $(this).removeClass("is-visible"))
      }),
      $(document).keyup(function(b) {
          "27" === b.which && $(".search-popup").removeClass("is-visible")
      })
    }

    var countdownTimer = function() {
      function getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        return {
          total,
          days,
          hours,
          minutes,
          seconds
        };
      }
  
      function initializeClock(id, endtime) {
        const clock = document.getElementById(id);
        const daysSpan = clock.querySelector('.days');
        const hoursSpan = clock.querySelector('.hours');
        const minutesSpan = clock.querySelector('.minutes');
        const secondsSpan = clock.querySelector('.seconds');
  
        function updateClock() {
          const t = getTimeRemaining(endtime);
          daysSpan.innerHTML = t.days;
          hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
          minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
          secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
          if (t.total <= 0) {
            clearInterval(timeinterval);
          }
        }
        updateClock();
        const timeinterval = setInterval(updateClock, 1000);
      }
  
      $('#countdown-clock').each(function(){
        const deadline = new Date(Date.parse(new Date()) + 28 * 24 * 60 * 60 * 1000);
        initializeClock('countdown-clock', deadline);
      });
    }

    var initProductQty = function(){

      $('.product-qty').each(function(){

        var $el_product = $(this);
        var quantity = 0;

        $el_product.find('.quantity-right-plus').click(function(e){
            e.preventDefault();
            var quantity = parseInt($el_product.find('#quantity').val());
            $el_product.find('#quantity').val(quantity + 1);
        });

        $el_product.find('.quantity-left-minus').click(function(e){
            e.preventDefault();
            var quantity = parseInt($el_product.find('#quantity').val());
            if(quantity>0){
              $el_product.find('#quantity').val(quantity - 1);
            }
        });

      });

    }

    $(document).ready(function() {

      searchPopup();
      initProductQty();
      countdownTimer();

      /* Video */
      var $videoSrc;  
        $('.play-btn').click(function() {
          $videoSrc = $(this).data( "src" );
        });

        $('#myModal').on('shown.bs.modal', function (e) {

        $("#video").attr('src',$videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0" ); 
      })

      $('#myModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src',$videoSrc); 
      })

      var mainSwiper = new Swiper(".main-swiper", {
        speed: 500,
        navigation: {
          nextEl: ".main-slider-button-next",
          prevEl: ".main-slider-button-prev",
        },
      });

      var productSwiper = new Swiper(".product-swiper", {
        spaceBetween: 20,        
        navigation: {
          nextEl: ".product-slider-button-next",
          prevEl: ".product-slider-button-prev",
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          660: {
            slidesPerView: 3,
          },
          980: {
            slidesPerView: 4,
          },
          1500: {
            slidesPerView: 5,
          }
        },
      });      

      var testimonialSwiper = new Swiper(".testimonial-swiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
          nextEl: ".testimonial-button-next",
          prevEl: ".testimonial-button-prev",
        },
      });

      var thumb_slider = new Swiper(".thumb-swiper", {
        slidesPerView: 1,
      });
      var large_slider = new Swiper(".large-swiper", {
        spaceBetween: 10,
        effect: 'fade',
        thumbs: {
          swiper: thumb_slider,
        },
      });

    }); // End of a document ready

    // window.addEventListener("load", function () {
    //   const preloader = document.getElementById("preloader");
    //   preloader.classList.add("hide-preloader");
    // });

    function hidePreloader() {
      const preloader = document.getElementById("preloader");
      if (preloader) {
        preloader.classList.add("hide-preloader");
        console.log("Preloader hidden");
        sessionStorage.setItem("preloaderHidden", "true");
      } else {
        console.log("Preloader element not found");
      }
    }

    // Function to check preloader state
    function checkPreloaderState() {
      const preloaderHidden = sessionStorage.getItem("preloaderHidden");
      if (preloaderHidden === "true") {
        hidePreloader();
      }
    }

    // Observe LCP event
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        for (const entry of entries) {
          console.log("LCP entry:", entry);
          if (entry.element && entry.element.id === 'billboard') {
            console.log("Hero element is LCP");
            hidePreloader();
            observer.disconnect();
            break;
          }
        }
      });

      observer.observe({ type: 'largest-contentful-paint', buffered: true });
    } else {
      // Fallback if PerformanceObserver is not supported
      window.addEventListener("load", hidePreloader);
    }
        // Check preloader state on page load
    document.addEventListener("DOMContentLoaded", checkPreloaderState);

    // Page Visibility API
    document.addEventListener("visibilitychange", function() {
      if (document.visibilityState === "visible") {
        checkPreloaderState();
      }
    });

    // Fallback mechanism
    window.addEventListener("load", function() {
      console.log("Window load event triggered");
      hidePreloader();
    });

    document.addEventListener('DOMContentLoaded', function() {
      // Attach click event listener to all links with the 'open-pdf-viewer' class
      document.querySelectorAll('.open-pdf-viewer').forEach(link => {
          link.addEventListener('click', function(event) {
              event.preventDefault();  // Prevent the default link behavior
  
              const pdfUrl = this.dataset.pdfUrl;  // Get the PDF URL from the data attribute
              
              // Open the PDF in the custom PDF viewer
              window.open(`pdfviewer.html?file=${encodeURIComponent(pdfUrl)}`, '_blank');
          });
      });
  });
  

})(jQuery);