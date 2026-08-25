(function ($) {

  "use strict";


  /* ============================================================
     NORTH STAR CREATIVES
     Slower Premium Website Motion
  ============================================================ */



  /* ============================================================
     01. PREMIUM MOBILE NAVIGATION
  ============================================================ */

  var initMobileMenu = function () {


    var $body =
      $("body");


    var $menuButton =
      $(".menu-btn");


    var $navLinks =
      $("#one-page-menu .nav-link");


    var $mobileBrand =
      $(".mobile-brand");



    if (!$menuButton.length) {

      return;

    }



    /* Initial accessibility state */

    $menuButton.attr({

      "aria-expanded": "false",

      "aria-label": "Open navigation"

    });



    /* ----------------------------------------------------------
       OPEN / CLOSE MENU
    ---------------------------------------------------------- */

    $menuButton.on("click", function (e) {


      e.preventDefault();


      var isOpen =
        $body.hasClass("nav-active");



      if (isOpen) {


        $body.removeClass(
          "nav-active"
        );


        $menuButton.attr({

          "aria-expanded": "false",

          "aria-label": "Open navigation"

        });


      } else {


        $body.addClass(
          "nav-active"
        );


        $menuButton.attr({

          "aria-expanded": "true",

          "aria-label": "Close navigation"

        });


      }

    });



    /* ----------------------------------------------------------
       CLOSE AFTER SELECTING NAVIGATION ITEM
    ---------------------------------------------------------- */

    $navLinks.on("click", function () {


      if (
        window.innerWidth <= 991
      ) {


        $body.removeClass(
          "nav-active"
        );


        $menuButton.attr({

          "aria-expanded": "false",

          "aria-label": "Open navigation"

        });

      }

    });



    /* ----------------------------------------------------------
       CLOSE IF MOBILE BRAND IS CLICKED
    ---------------------------------------------------------- */

    $mobileBrand.on("click", function () {


      if (
        window.innerWidth <= 991
      ) {


        $body.removeClass(
          "nav-active"
        );


        $menuButton.attr({

          "aria-expanded": "false",

          "aria-label": "Open navigation"

        });

      }

    });



    /* ----------------------------------------------------------
       ESCAPE KEY CLOSES MENU
    ---------------------------------------------------------- */

    $(document).on(
      "keydown",
      function (e) {


        if (
          e.key === "Escape" &&
          $body.hasClass("nav-active")
        ) {


          $body.removeClass(
            "nav-active"
          );


          $menuButton.attr({

            "aria-expanded": "false",

            "aria-label": "Open navigation"

          });

        }

      }
    );



    /* ----------------------------------------------------------
       RESET MENU WHEN RETURNING TO DESKTOP
    ---------------------------------------------------------- */

    $(window).on(
      "resize",
      function () {


        if (
          window.innerWidth > 991
        ) {


          $body.removeClass(
            "nav-active"
          );


          $menuButton.attr({

            "aria-expanded": "false",

            "aria-label": "Open navigation"

          });

        }

      }
    );

  };



  /* ============================================================
     02. TEXT ANIMATION
  ============================================================ */

  var initTextFx = function () {


    $(".txt-fx").each(function () {


      var element =
        this;



      /* Avoid processing same text twice */

      if (
        element.dataset.textFxReady === "true"
      ) {

        return;

      }



      var state = {

        count: 0,

        delay: 160,

        stagger: 18

      };



      var transformNode =
        function (node) {


          var fragment =
            document.createDocumentFragment();



          /* ------------------------------------------------------
             TEXT NODE
          ------------------------------------------------------ */

          if (
            node.nodeType === Node.TEXT_NODE
          ) {


            var text =
              node.nodeValue;


            var tokens =
              text.match(
                /(\s+|[^\s]+)/g
              );



            if (!tokens) {

              return fragment;

            }



            tokens.forEach(
              function (token) {


                /* Keep whitespace */

                if (
                  /^\s+$/.test(token)
                ) {


                  fragment.appendChild(

                    document.createTextNode(
                      token
                    )

                  );


                  return;

                }



                /* Create word wrapper */

                var word =
                  document.createElement(
                    "span"
                  );


                word.className =
                  "word";



                /* Create individual letters */

                Array.from(token)
                  .forEach(
                    function (character) {


                      var letter =
                        document.createElement(
                          "span"
                        );


                      letter.className =
                        "letter";


                      letter.style.transitionDelay =
                        (
                          state.delay +
                          state.stagger *
                          state.count
                        ) + "ms";


                      letter.textContent =
                        character;


                      word.appendChild(
                        letter
                      );


                      state.count++;

                    }
                  );


                fragment.appendChild(
                  word
                );


                state.count++;

              }
            );


            return fragment;

          }



          /* ------------------------------------------------------
             ELEMENT NODE
          ------------------------------------------------------ */

          if (
            node.nodeType === Node.ELEMENT_NODE
          ) {


            /* Keep line breaks */

            if (
              node.tagName === "BR"
            ) {


              fragment.appendChild(

                document.createElement(
                  "br"
                )

              );


              return fragment;

            }



            var clone =
              node.cloneNode(false);



            Array.from(
              node.childNodes
            ).forEach(
              function (child) {


                clone.appendChild(

                  transformNode(
                    child
                  )

                );

              }
            );


            fragment.appendChild(
              clone
            );


            return fragment;

          }



          return fragment;

        };



      var newContent =
        document.createDocumentFragment();



      Array.from(
        element.childNodes
      ).forEach(
        function (node) {


          newContent.appendChild(

            transformNode(
              node
            )

          );

        }
      );



      element.innerHTML =
        "";


      element.appendChild(
        newContent
      );


      element.dataset.textFxReady =
        "true";

    });

  };



  /* ============================================================
     03. AOS SCROLL ANIMATIONS
  ============================================================ */

  var initAOS = function () {


    if (
      typeof AOS === "undefined"
    ) {

      return;

    }



    AOS.init({


      /* Slow premium reveal */

      duration: 1200,


      easing:
        "ease-out-cubic",


      offset:
        70,


      /* Animation happens once */

      once:
        true,


      anchorPlacement:
        "top-bottom"

    });

  };



  /* ============================================================
     04. SMOOTH NAVIGATION
  ============================================================ */

  var initSmoothNavigation =
    function () {


      $('a[href^="#"]')
        .on(
          "click",
          function (e) {


            var targetID =
              $(this).attr(
                "href"
              );



            if (
              targetID === "#" ||
              targetID === ""
            ) {

              return;

            }



            var $target =
              $(targetID);



            if (
              !$target.length
            ) {

              return;

            }



            e.preventDefault();



            /*
             * Allow mobile menu to begin
             * closing before scroll begins.
             */

            var delay =
              window.innerWidth <= 991
                ? 120
                : 0;



            setTimeout(
              function () {


                $("html, body")
                  .stop()
                  .animate(
                    {

                      scrollTop:
                        $target
                          .offset()
                          .top

                    },
                    {

                      duration:
                        1000,

                      easing:
                        "swing"

                    }
                  );

              },
              delay
            );

          }
        );

    };



  /* ============================================================
     05. ACTIVE NAVIGATION
  ============================================================ */

  var initActiveNavigation =
    function () {


      var $sections =
        $("section[id]");


      var $navLinks =
        $("#one-page-menu .nav-link");



      if (
        !$sections.length ||
        !$navLinks.length
      ) {

        return;

      }



      var updateNavigation =
        function () {


          var scrollPosition =
            $(window).scrollTop() +
            180;



          $sections.each(
            function () {


              var $section =
                $(this);


              var sectionTop =
                $section
                  .offset()
                  .top;


              var sectionBottom =
                sectionTop +
                $section
                  .outerHeight();



              if (
                scrollPosition >=
                  sectionTop &&
                scrollPosition <
                  sectionBottom
              ) {


                var sectionID =
                  $section.attr(
                    "id"
                  );



                $navLinks
                  .removeClass(
                    "active"
                  );



                $(
                  '#one-page-menu .nav-link[href="#' +
                  sectionID +
                  '"]'
                )
                  .addClass(
                    "active"
                  );

              }

            }
          );

        };



      $(window)
        .on(
          "scroll",
          updateNavigation
        );


      updateNavigation();

    };



  /* ============================================================
     06. SERVICE INTERACTION
  ============================================================ */

  var initServiceInteraction =
    function () {


      /*
       * Only use hover behaviour on
       * devices with real hover support.
       */

      if (
        !window.matchMedia(
          "(hover: hover)"
        ).matches
      ) {

        return;

      }



      $(".service-row")
        .on(
          "mouseenter",
          function () {


            $(this)
              .addClass(
                "service-active"
              );

          }
        );



      $(".service-row")
        .on(
          "mouseleave",
          function () {


            $(this)
              .removeClass(
                "service-active"
              );

          }
        );

    };



  /* ============================================================
     07. MOBILE TOP BAR SCROLL EFFECT
  ============================================================ */

  var initMobileTopbar =
    function () {


      var $topbar =
        $(".mobile-topbar");



      if (
        !$topbar.length
      ) {

        return;

      }



      var updateTopbar =
        function () {


          if (
            $(window).scrollTop() > 40
          ) {


            $topbar.addClass(
              "mobile-topbar-scrolled"
            );


          } else {


            $topbar.removeClass(
              "mobile-topbar-scrolled"
            );

          }

        };



      $(window)
        .on(
          "scroll",
          updateTopbar
        );


      updateTopbar();

    };



  /* ============================================================
     08. DOCUMENT READY
  ============================================================ */

  $(document).ready(
    function () {


      initMobileMenu();


      initTextFx();


      initSmoothNavigation();


      initActiveNavigation();


      initServiceInteraction();


      initMobileTopbar();


      initAOS();

    }
  );



  /* ============================================================
     09. WINDOW LOAD
  ============================================================ */

  $(window).on(
    "load",
    function () {


      $(".preloader")
        .fadeOut(
          900
        );



      $("body")
        .addClass(
          "page-loaded"
        );



      if (
        typeof AOS !==
        "undefined"
      ) {


        AOS.refresh();

      }

    }
  );


})(jQuery);