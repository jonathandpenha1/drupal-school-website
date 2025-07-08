(function ($, Drupal) {

  /**
   * EBT Carousel behavior.
   */
  Drupal.behaviors.ebtCarousel = {
    attach: function (context, settings) {
      $.each(drupalSettings.ebtCarousel, function(i, value){
        // Initialize FlexSlider.
        var blockClass = drupalSettings.ebtCarousel[i].blockClass;
        if ($('.' + blockClass).length == 0) {
          return;
        }
        var $blockCarousel = $('.' + blockClass);
        if ($blockCarousel.hasClass('tiny-slider-added')) {
          return;
        }

        var options = {};
        options['container'] = '.' + drupalSettings.ebtCarousel[i].blockClass + ' .ebt-carousel-wrapper';
        options['prevButton'] = '.' + drupalSettings.ebtCarousel[i].blockClass + ' .ebt-carousel-controls .ebt-carousel-prev';
        options['nextButton'] = '.' + drupalSettings.ebtCarousel[i].blockClass + ' .ebt-carousel-controls .ebt-carousel-next';

        drupalBlockSettings = drupalSettings.ebtCarousel[i].options;
        if (drupalBlockSettings.mode != undefined) {
          options['mode'] = Drupal.checkPlain(drupalBlockSettings.mode);
        }

        if (drupalBlockSettings.axis != undefined) {
          options['axis'] = Drupal.checkPlain(drupalBlockSettings.axis);
        }

        if (drupalBlockSettings.items != undefined && drupalBlockSettings.items != '') {
          options['items'] = parseInt(drupalBlockSettings.items);
        }

        if (drupalBlockSettings.gutter != undefined && drupalBlockSettings.gutter != '') {
          options['gutter'] = parseInt(drupalBlockSettings.gutter);
        }

        if (drupalBlockSettings.edgePadding != undefined && drupalBlockSettings.edgePadding != '') {
          options['edgePadding'] = parseInt(drupalBlockSettings.edgePadding);
        }

        if (drupalBlockSettings.fixedWidth != undefined && drupalBlockSettings.fixedWidth != '') {
          options['fixedWidth'] = parseInt(drupalBlockSettings.fixedWidth);
        }

        if (drupalBlockSettings.autoWidth != undefined) {
          if (drupalBlockSettings.autoWidth == 1) {
            options['autoWidth'] = true;
          }
          else {
            options['autoWidth'] = false;
          }
        }

        if (drupalBlockSettings.slideBy != undefined && drupalBlockSettings.slideBy != '') {
          options['slideBy'] = parseInt(drupalBlockSettings.slideBy);
        }

        if (drupalBlockSettings.center != undefined) {
          if (drupalBlockSettings.center == 1) {
            options['center'] = true;
          }
          else {
            options['center'] = false;
          }
        }

        if (drupalBlockSettings.arrowKeys != undefined) {
          if (drupalBlockSettings.arrowKeys == 1) {
            options['arrowKeys'] = true;
          }
          else {
            options['arrowKeys'] = false;
          }
        }

        if (drupalBlockSettings.speed != undefined && drupalBlockSettings.speed != '') {
          options['speed'] = parseInt(drupalBlockSettings.speed);
        }

        if (drupalBlockSettings.loop != undefined) {
          if (drupalBlockSettings.loop == 1) {
            options['loop'] = true;
          }
          else {
            options['loop'] = false;
          }
        }

        if (drupalBlockSettings.autoHeight != undefined) {
          if (drupalBlockSettings.autoHeight == 1) {
            options['autoHeight'] = true;
          }
          else {
            options['autoHeight'] = false;
          }
        }

        // Additional settings.
        if (drupalBlockSettings.additional.viewportMax != undefined && drupalBlockSettings.additional.viewportMax != '') {
          options['viewportMax'] = parseInt(drupalBlockSettings.additional.viewportMax);
        }

        if (drupalBlockSettings.additional.rewind != undefined) {
          if (drupalBlockSettings.additional.rewind == 1) {
            options['rewind'] = true;
          }
          else {
            options['rewind'] = false;
          }
        }

        if (drupalBlockSettings.additional.touch != undefined) {
          if (drupalBlockSettings.additional.touch == 1) {
            options['touch'] = true;
          }
          else {
            options['touch'] = false;
          }
        }

        if (drupalBlockSettings.additional.mouseDrag != undefined) {
          if (drupalBlockSettings.additional.mouseDrag == 1) {
            options['mouseDrag'] = true;
          }
          else {
            options['mouseDrag'] = false;
          }
        }

        if (drupalBlockSettings.additional.swipeAngle != undefined && drupalBlockSettings.additional.swipeAngle != '') {
          options['swipeAngle'] = parseInt(drupalBlockSettings.additional.swipeAngle);
        }

        if (drupalBlockSettings.additional.preventActionWhenRunning != undefined) {
          if (drupalBlockSettings.additional.preventActionWhenRunning == 1) {
            options['preventActionWhenRunning'] = true;
          }
          else {
            options['preventActionWhenRunning'] = false;
          }
        }

        if (drupalBlockSettings.additional.preventScrollOnTouch != undefined) {
          options['preventScrollOnTouch'] = Drupal.checkPlain(drupalBlockSettings.additional.preventScrollOnTouch);
        }

        if (drupalBlockSettings.additional.nested != undefined) {
          options['nested'] = Drupal.checkPlain(drupalBlockSettings.additional.nested);
        }

        if (drupalBlockSettings.additional.freezable != undefined) {
          if (drupalBlockSettings.additional.freezable == 1) {
            options['freezable'] = true;
          }
          else {
            options['freezable'] = false;
          }
        }

        if (drupalBlockSettings.additional.disable != undefined) {
          if (drupalBlockSettings.additional.disable == 1) {
            options['disable'] = true;
          }
          else {
            options['disable'] = false;
          }
        }

        if (drupalBlockSettings.additional.startIndex != undefined && drupalBlockSettings.additional.startIndex != '') {
          options['startIndex'] = parseInt(drupalBlockSettings.additional.startIndex);
        }

        if (drupalBlockSettings.additional.useLocalStorage != undefined) {
          if (drupalBlockSettings.additional.useLocalStorage == 1) {
            options['useLocalStorage'] = true;
          }
          else {
            options['useLocalStorage'] = false;
          }
        }

        if (drupalBlockSettings.additional.nonce != undefined && drupalBlockSettings.additional.nonce != '') {
          options['nonce'] = Drupal.checkPlain(drupalBlockSettings.additional.nonce);
        }

        // Responsive settings.
        var responsive = {};

        // Mobile.
        if (drupalBlockSettings.responsive.mobile.breakpoint != undefined && drupalBlockSettings.responsive.mobile.breakpoint != '') {
          var mobileBreakpoint = parseInt(drupalBlockSettings.responsive.mobile.breakpoint);
        }

        if (drupalBlockSettings.responsive.mobile.items != undefined && drupalBlockSettings.responsive.mobile.items != '') {
          var mobileItems = parseInt(drupalBlockSettings.responsive.mobile.items);
        }

        if (drupalBlockSettings.responsive.mobile.slideBy != undefined && drupalBlockSettings.responsive.mobile.slideBy != '') {
          var mobileSlideBy = parseInt(drupalBlockSettings.responsive.mobile.slideBy);
        }

        if (drupalBlockSettings.responsive.mobile.gutter != undefined && drupalBlockSettings.responsive.mobile.gutter != '') {
          var mobileGutter = parseInt(drupalBlockSettings.responsive.mobile.gutter);
        }

        if (drupalBlockSettings.responsive.mobile.edgePadding != undefined && drupalBlockSettings.responsive.mobile.edgePadding != '') {
          var mobileEdgePadding = parseInt(drupalBlockSettings.responsive.mobile.edgePadding);
        }

        if (mobileBreakpoint != undefined) {
          if (mobileItems != undefined) {
            if (responsive[mobileBreakpoint] == undefined) {
              responsive[mobileBreakpoint] = {}
            }
            responsive[mobileBreakpoint]['items'] = mobileItems;
          }

          if (mobileSlideBy != undefined) {
            if (responsive[mobileBreakpoint] == undefined) {
              responsive[mobileBreakpoint] = {}
            }
            responsive[mobileBreakpoint]['slideBy'] = mobileSlideBy;
          }

          if (mobileGutter != undefined) {
            if (responsive[mobileBreakpoint] == undefined) {
              responsive[mobileBreakpoint] = {}
            }
            responsive[mobileBreakpoint]['gutter'] = mobileGutter;
          }

          if (mobileEdgePadding != undefined) {
            if (responsive[mobileBreakpoint] == undefined) {
              responsive[mobileBreakpoint] = {}
            }
            responsive[mobileBreakpoint]['edgePadding'] = mobileEdgePadding;
          }
        }

        // Tablet.
        if (drupalBlockSettings.responsive.tablet.breakpoint != undefined && drupalBlockSettings.responsive.tablet.breakpoint != '') {
          var tabletBreakpoint = parseInt(drupalBlockSettings.responsive.tablet.breakpoint);
        }

        if (drupalBlockSettings.responsive.tablet.items != undefined && drupalBlockSettings.responsive.tablet.items != '') {
          var tabletItems = parseInt(drupalBlockSettings.responsive.tablet.items);
        }

        if (drupalBlockSettings.responsive.tablet.slideBy != undefined && drupalBlockSettings.responsive.tablet.slideBy != '') {
          var tabletSlideBy = parseInt(drupalBlockSettings.responsive.tablet.slideBy);
        }

        if (drupalBlockSettings.responsive.tablet.gutter != undefined && drupalBlockSettings.responsive.tablet.gutter != '') {
          var tabletGutter = parseInt(drupalBlockSettings.responsive.tablet.gutter);
        }

        if (drupalBlockSettings.responsive.tablet.edgePadding != undefined && drupalBlockSettings.responsive.tablet.edgePadding != '') {
          var tabletEdgePadding = parseInt(drupalBlockSettings.responsive.tablet.edgePadding);
        }

        if (tabletBreakpoint != undefined) {
          if (tabletItems != undefined) {
            if (responsive[tabletBreakpoint] == undefined) {
              responsive[tabletBreakpoint] = {}
            }
            responsive[tabletBreakpoint]['items'] = tabletItems;
          }

          if (tabletSlideBy != undefined) {
            if (responsive[tabletBreakpoint] == undefined) {
              responsive[tabletBreakpoint] = {}
            }
            responsive[tabletBreakpoint]['slideBy'] = tabletSlideBy;
          }

          if (tabletGutter != undefined) {
            if (responsive[tabletBreakpoint] == undefined) {
              responsive[tabletBreakpoint] = {}
            }
            responsive[tabletBreakpoint]['gutter'] = tabletGutter;
          }

          if (tabletEdgePadding != undefined) {
            if (responsive[tabletBreakpoint] == undefined) {
              responsive[tabletBreakpoint] = {}
            }
            responsive[tabletBreakpoint]['edgePadding'] = tabletEdgePadding;
          }
        }

        // Desktop.
        if (drupalBlockSettings.responsive.desktop.breakpoint != undefined && drupalBlockSettings.responsive.desktop.breakpoint != '') {
          var desktopBreakpoint = parseInt(drupalBlockSettings.responsive.desktop.breakpoint);
        }

        if (drupalBlockSettings.responsive.desktop.items != undefined && drupalBlockSettings.responsive.desktop.items != '') {
          var desktopItems = parseInt(drupalBlockSettings.responsive.desktop.items);
        }

        if (drupalBlockSettings.responsive.desktop.slideBy != undefined && drupalBlockSettings.responsive.desktop.slideBy != '') {
          var desktopSlideBy = parseInt(drupalBlockSettings.responsive.desktop.slideBy);
        }

        if (drupalBlockSettings.responsive.desktop.gutter != undefined && drupalBlockSettings.responsive.desktop.gutter != '') {
          var desktopGutter = parseInt(drupalBlockSettings.responsive.desktop.gutter);
        }

        if (drupalBlockSettings.responsive.desktop.edgePadding != undefined && drupalBlockSettings.responsive.desktop.edgePadding != '') {
          var desktopEdgePadding = parseInt(drupalBlockSettings.responsive.desktop.edgePadding);
        }

        if (desktopBreakpoint != undefined) {
          if (desktopItems != undefined) {
            if (responsive[desktopBreakpoint] == undefined) {
              responsive[desktopBreakpoint] = {}
            }
            responsive[desktopBreakpoint]['items'] = desktopItems;
          }

          if (desktopSlideBy != undefined) {
            if (responsive[desktopBreakpoint] == undefined) {
              responsive[desktopBreakpoint] = {}
            }
            responsive[desktopBreakpoint]['slideBy'] = desktopSlideBy;
          }

          if (desktopGutter != undefined) {
            if (responsive[desktopBreakpoint] == undefined) {
              responsive[desktopBreakpoint] = {}
            }
            responsive[desktopBreakpoint]['gutter'] = desktopGutter;
          }

          if (desktopEdgePadding != undefined) {
            if (responsive[desktopBreakpoint] == undefined) {
              responsive[desktopBreakpoint] = {}
            }
            responsive[desktopBreakpoint]['edgePadding'] = desktopEdgePadding;
          }
        }

        if (responsive != {}) {
          options['responsive'] = responsive;
        }

        // Controls.
        if (drupalBlockSettings.controls.controls != undefined) {
          if (drupalBlockSettings.controls.controls == 1) {
            options['controls'] = true;
          }
          else {
            options['controls'] = false;
          }
        }

        if (drupalBlockSettings.controls.controlsPosition != undefined) {
          options['controlsPosition'] = Drupal.checkPlain(drupalBlockSettings.controls.controlsPosition);
        }

        if (drupalBlockSettings.controls.controlsTextPrev != undefined && drupalBlockSettings.controls.controlsTextPrev != '' &&
            drupalBlockSettings.controls.controlsTextNext != undefined && drupalBlockSettings.controls.controlsTextNext != '') {
          options['controlsText'] = [Drupal.checkPlain(drupalBlockSettings.controls.controlsTextPrev), Drupal.checkPlain(drupalBlockSettings.controls.controlsTextNext)];
        }

        if (drupalBlockSettings.controls.nav != undefined) {
          if (drupalBlockSettings.controls.nav == 1) {
            options['nav'] = true;
          }
          else {
            options['nav'] = false;
          }
        }

        if (drupalBlockSettings.controls.navPosition != undefined) {
          options['navPosition'] = Drupal.checkPlain(drupalBlockSettings.controls.navPosition);
        }

        if (drupalBlockSettings.controls.navAsThumbnails != undefined) {
          if (drupalBlockSettings.controls.navAsThumbnails == 1) {
            options['navAsThumbnails'] = true;
          }
          else {
            options['navAsThumbnails'] = false;
          }
        }

        // Autoplay settings.
        if (drupalBlockSettings.autoplay.autoplay != undefined) {
          if (drupalBlockSettings.autoplay.autoplay == 1) {
            options['autoplay'] = true;
          }
          else {
            options['autoplay'] = false;
          }
        }

        if (drupalBlockSettings.autoplay.autoplayPosition != undefined) {
          options['autoplayPosition'] = Drupal.checkPlain(drupalBlockSettings.autoplay.autoplayPosition);
        }

        if (drupalBlockSettings.autoplay.autoplayTimeout != undefined && drupalBlockSettings.autoplay.autoplayTimeout != '') {
          options['autoplayTimeout'] = parseInt(drupalBlockSettings.autoplay.autoplayTimeout);
        }

        if (drupalBlockSettings.autoplay.autoplayDirection != undefined) {
          options['autoplayDirection'] = Drupal.checkPlain(drupalBlockSettings.autoplay.autoplayDirection);
        }

        if (drupalBlockSettings.autoplay.autoplayTextStart != undefined && drupalBlockSettings.autoplay.autoplayTextStart != '' &&
            drupalBlockSettings.autoplay.autoplayTextStop != undefined && drupalBlockSettings.autoplay.autoplayTextStop != '') {
          options['autoplayText'] = [Drupal.checkPlain(drupalBlockSettings.autoplay.autoplayTextStart), Drupal.checkPlain(drupalBlockSettings.autoplay.autoplayTextStop)];
        }

        if (drupalBlockSettings.autoplay.autoplayHoverPause != undefined) {
          if (drupalBlockSettings.autoplay.autoplayHoverPause == 1) {
            options['autoplayHoverPause'] = true;
          }
          else {
            options['autoplayHoverPause'] = false;
          }
        }

        if (drupalBlockSettings.autoplay.autoplayButton != undefined && drupalBlockSettings.autoplay.autoplayButton != '') {
          options['autoplayButton'] = Drupal.checkPlain(drupalBlockSettings.autoplay.autoplayButton);
        }

        if (drupalBlockSettings.autoplay.autoplayButtonOutput != undefined) {
          if (drupalBlockSettings.autoplay.autoplayButtonOutput == 1) {
            options['autoplayButtonOutput'] = true;
          }
          else {
            options['autoplayButtonOutput'] = false;
          }
        }

        if (drupalBlockSettings.autoplay.autoplayResetOnVisibility != undefined) {
          if (drupalBlockSettings.autoplay.autoplayResetOnVisibility == 1) {
            options['autoplayResetOnVisibility'] = true;
          }
          else {
            options['autoplayResetOnVisibility'] = false;
          }
        }

        // Animate settings.
        if (drupalBlockSettings.animate.animateIn != undefined && drupalBlockSettings.animate.animateIn == '') {
          options['animateIn'] = Drupal.checkPlain(drupalBlockSettings.animate.animateIn);
        }

        if (drupalBlockSettings.animate.animateOut != undefined && drupalBlockSettings.animate.animateOut == '') {
          options['animateOut'] = Drupal.checkPlain(drupalBlockSettings.animate.animateOut);
        }

        if (drupalBlockSettings.animate.animateNormal != undefined && drupalBlockSettings.animate.animateNormal == '') {
          options['animateNormal'] = Drupal.checkPlain(drupalBlockSettings.animate.animateNormal);
        }

        if (drupalBlockSettings.animate.animateDelay != undefined && drupalBlockSettings.animate.animateDelay != '') {
          options['animateDelay'] = parseInt(drupalBlockSettings.animate.animateDelay);
        }

        tns(options);
        $blockCarousel.addClass('tiny-slider-added');
      });
    }
  };

})(jQuery, Drupal);
