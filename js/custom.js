(function ($) {
  "use strict";

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

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
            if (prefersReducedMotion()) {
              $("html,body").scrollTop(target.offset().top);
            } else {
              $("html,body").animate({ scrollTop: target.offset().top }, 900, "swing");
            }
            return false;
          }
        }
      });
  }

  function initScrollToTop() {
    $(window).on("scroll", function () {
      var shouldShow = $(this).scrollTop() >= 50;
      var scrollUpButton = $("#scrollup");

      scrollUpButton.toggleClass("is-visible", shouldShow);

      if (prefersReducedMotion()) {
        scrollUpButton.removeClass("animated flipInY");
      } else if (shouldShow) {
        scrollUpButton.addClass("animated flipInY");
      } else {
        scrollUpButton.removeClass("animated flipInY");
      }
    });

    $("#scrollup").on("click", function () {
      if (prefersReducedMotion()) {
        $("html,body").scrollTop(0);
      } else {
        $("html,body").animate({ scrollTop: 0 }, 600);
      }
      return false;
    });
  }

  jQuery(document).on("ready", function () {
    initSmoothScroll();
    initScrollToTop();
  });

  jQuery(window).on("load", function () {
    if (prefersReducedMotion()) {
      $("div#loading").hide();
    } else {
      $("div#loading").fadeOut(500);
    }

    if (!prefersReducedMotion() && typeof ScrollReveal === "function") {
      window.sr = ScrollReveal({ reset: false });

      var commonCards = ".timeline-dot,.timeline-content,#skills-card,.section-title img";
      sr.reveal(commonCards, { duration: 1100 });
      sr.reveal("#about-card", { duration: 1400, delay: 500 });
      sr.reveal("#v-card-holder", { duration: 1400, distance: "150px" });
    }
  });
})(jQuery);
