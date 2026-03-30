(function ($) {
  "use strict";

  function initSmoothScroll() {
    $("div#about-btn")
      .find('a[href*=#]:not([href=#])')
      .on("click", function () {
        if (
          location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") &&
          location.hostname === this.hostname
        ) {
          var target = $(this.hash);
          target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
          if (target.length) {
            $("html,body").animate({ scrollTop: target.offset().top }, 900, "swing");
            return false;
          }
        }
      });
  }

  function initScrollToTop() {
    $(window).on("scroll", function () {
      if ($(this).scrollTop() >= 50) {
        $("#scrollup").addClass("animated flipInY").fadeIn(200);
      } else {
        $("#scrollup").fadeOut(200);
      }
    });

    $("#scrollup").on("click", function () {
      $("html,body").animate({ scrollTop: 0 }, 600);
      return false;
    });
  }

  jQuery(document).on("ready", function () {
    initSmoothScroll();
    initScrollToTop();
  });

  jQuery(window).on("load", function () {
    $("div#loading").fadeOut(500);

    if (typeof ScrollReveal === "function") {
      window.sr = ScrollReveal({ reset: false });

      var commonCards = ".timeline-dot,.timeline-content,#skills-card,.section-title img";
      sr.reveal(commonCards, { duration: 1100 });
      sr.reveal("#about-card", { duration: 1400, delay: 500 });
      sr.reveal("#v-card-holder", { duration: 1400, distance: "150px" });
    }
  });
})(jQuery);
