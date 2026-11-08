(function ($) {
    //========= dropdown header ================
    $('.header-phones .chevron').click(function() {
        $('.header-phones').toggleClass('open');
    });
    $(document).mouseup(function (e){ // событие клика по веб-документу
        var div = $(".header-phones"); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) { // и не по его дочерним элементам
            $(".header-phones").removeClass('open');
        }
    });

    //========= header_fixed ================
    $(window).scroll(function () {
        if ($(this).scrollTop() > 140) {
            $('.site-header').addClass('site-header_fixed');
            $('body:not(.home)').addClass('padding-top');
        } 
        else {
            $('.site-header').removeClass('site-header_fixed');
            $('body:not(.home)').removeClass('padding-top')
        }
    });

    //========================
    $('.menu-item-has-children > a').append('<i class="chevron bottom"></i>');
        


    /* wow master settings
    ========================================*/
    var wow = new WOW(
      {
        boxClass:     'count-animate',      // animated element css class (default is wow)
        animateClass: 'animated animate__zoomInUp', // animation css class (default is animated)
        offset:       10,          // distance to the element when triggering the animation (default is 0)
        mobile:       false,       // trigger animations on mobile devices (default is true)
        live:         true,       // act on asynchronously loaded content (default is true)
        callback:     function(box) {
          // the callback is fired every time an animation is started
          // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null // optional scroll container selector, otherwise use window
      }
    );
    wow.init();

    //========== Анимация чисел ==============================

    $('body.home .achievements .col:nth-child(2) .count').addClass('thousandth');

    if ($('.count').length > 0) {
        var show_an = true;
        $(window).scroll( function() {
            if(!show_an) return false;

            var w_top = window.innerHeight;
            var e_top = $('.achievements').offset().top;

            if(w_top >= e_top) {
                $('.count').spincrement({
                    thousandSeparator: " ",
                    duration: 2700,
                    decimalPoint: ","
                });

                $('.thousandth').spincrement({
                    thousandSeparator: " ",
                    decimalPlaces: "2", 
                    decimalPoint: ",",
                    duration: 1800
                });

                show_an = false;
            }
        });
    }
    

    /* ============ Slick init ================*/
    $('.awards-wrap').slick({
        slidesToShow: 3,
        arrows: true,
        autoplay: true,
        dots: false,
        pauseOnHover: true,
        responsive: [
            {    
                breakpoint: 992,
                settings: {
                    arrows: true,
                    slidesToShow: 2,
                    dots: true
                }
            },
            {    
                breakpoint: 678,
                settings: {
                    slidesToShow: 1,
                    dots: true
                }
            }
        ]
    });

    $('.project-slider').slick({
        slidesToShow: 1,
        arrows: true,
        autoplay: true,
        dots: false,
        pauseOnHover: true,
        fade: true
    });

    

    // ===select floor====
    if ($(window).width() > 768) {
        if ($('.content-floor-visualization').length) {
            let fv = document.querySelector('.content-floor-visualization');
            fv.append(...Array.from(fv.children).reverse());
        }
        var quantityVisSlide = $('.floor-visualization').length - 1;
    }

    
    $('.content-floor-visualization').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.floor-select',
        focusOnSelect: true,
        dots: false,
        fade: true,
        autoplay: false,
        initialSlide: quantityVisSlide,
        infinite: false
    });

    if ($(window).width() > 768) {
        if ($('.floor-select').length) {
            let ts = document.querySelector('.floor-select');
            ts.append(...Array.from(ts.children).reverse());
        }
        var quantityItemSlide = $('.floor-item').length - 1;
    }

    $('.floor-select').slick({
        slidesToShow: 3,
        asNavFor: '.content-floor-visualization',
        focusOnSelect: true,
        arrows: true,
        autoplay: false,
        infinite: false,  //-последняя задумака 
        vertical: true,
        centerMode: true,
        initialSlide: quantityItemSlide,
        responsive: [
            {    
                breakpoint: 768,
                settings: {
                    vertical: false,
                }
            }
        ]
    });

    if ($(window).width() > 768) {
        $('.floor-select .slick-track').addClass('start-position');
        $('.floor-item, .slick-arrow').on('click', function() {
            if ($('.floor-item:nth-last-of-type(2)').hasClass('slick-current')) {
                $('.floor-select .slick-track').removeClass('start-position');
                $('.floor-select .slick-track').removeClass('center-position');
            }
            else {
                $('.floor-select .slick-track').addClass('center-position');
            }
        });
        $('.floor-item:last-of-type').on('click', function() {
            $('.floor-select .slick-track').addClass('start-position').removeClass('center-position');
        });

        $('.floor-item:last-of-type, .slick-arrow').on('click', function() {
        if ($('.floor-item:last-of-type').hasClass('slick-current')) {
                $('.floor-select .slick-track').addClass('start-position').removeClass('center-position');
            }
        });    
    }


    $('.about-slider-image').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        focusOnSelect: true,
        asNavFor: '.about-slider-dots',
        dots: false,
        fade: true,
        speed: 280,
        autoplay: true,
        autoplaySpeed: 10000,
        infinite: false,
        loop: false,
        responsive: [
            {    
                breakpoint: 992,
                settings: {
                    arrows: true
                }
            }
        ]
    });

    $('.about-slider-dots').slick({
        slidesToShow: 4,
        asNavFor: '.about-slider-image',
        focusOnSelect: true,
        arrows: false,
        autoplay: true,
        variableWidth: true,
        autoplaySpeed: 10000,
        infinite: false,
        loop: false
    });

    //=====================

    $('.about-awards_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        focusOnSelect: true,
        asNavFor: '.about-awards_tabs',
        dots: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 7000,
        infinite: true,
        pauseOnHover: false,
        pauseOnFocus: true
    });

    $('.about-awards_tabs').slick({
        slidesToShow: 3,
        asNavFor: '.about-awards_slider',
        focusOnSelect: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 7000,
        infinite: true,
        pauseOnHover: true,
        pauseOnFocus: true
    });

    const $awards_tabs_track = $('.about-awards_tabs .slick-track');
    if ($awards_tabs_track.children('.item').length <= 3) {
        $awards_tabs_track.addClass('is-not-swipe');
    }

    //=====================

    function setProgress(index) {
      const calc = ((index + 1) / ($slider_team_desk.slick('getSlick').slideCount)) * 100;
      $progressBar
        .css('background-size', `${calc}% 100%`)
        .attr('aria-valuenow', calc);
    }
    const $slider_team_desk = $('.team-slider_desktop, .team-slider_mobile');
    const $progressBar = $('.progress');

    $slider_team_desk.on('beforeChange', function(event, slick, currentSlide, nextSlide) {   
      setProgress(nextSlide);
    });

    $('.team-slider_desktop').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: false,
        dots: false,
        pauseOnHover: true,
        infinite: true,
        loop: true,
        responsive: [
           {
              breakpoint: 992,
              settings: "unslick"
           }
        ]

    });

    $('.team-slider_mobile').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: false,
        dots: false,
        pauseOnHover: true,
        infinite: true,
        loop: true,
        fade: true
    });
    setProgress(0);

    function setProgressTechn(index) {
      const calc_teh = ((index + 1) / ($slider_teh.slick('getSlick').slideCount)) * 100;
      $progressBar_teh
        .css('background-size', `${calc_teh}% 100%`)
        .attr('aria-valuenow', calc_teh);
    }
    const $slider_teh = $('.technology_mob-slider');
    const $progressBar_teh = $('.progress_teh');

    $slider_teh.on('beforeChange', function(event, slick, currentSlide, nextSlide) {   
      setProgressTechn(nextSlide);
    });

    if ($(window).width() < 800) {
        $('.technology_mob-slider').slick({
            slidesToShow: 1,
            arrows: true,
            dots: false,
            autoplay: true,
            swipe: true,
            mobileFirst: true, 
            fade: true,
            responsive: [
               {
                  breakpoint: 800,
                  settings: "unslick"
               }
            ]
        });

        setProgressTechn(0);
    }
    

//     function setProgressSales(index) {
//       const calc_sales_center = ((index + 1) / ($slider_sales_center.slick('getSlick').slideCount)) * 100;
//        $progressBar_sales_center
//         .css('background-size', `${calc_sales_center}% 100%`)
//         .attr('aria-valuenow', calc_sales_center);
//     }
//     const $slider_sales_center = $('.sales-center_slider-mob');
//     const $progressBar_sales_center = $('.progress_sales');

//     $slider_sales_center.on('beforeChange', function(event, slick, currentSlide, nextSlide) {   
//        $progressBar_sales_center(nextSlide);
//     });

// setProgressSales(0);
    $('.sales-center_slider-mob').slick({
        slidesToShow: 1,
        arrows: true,
        dots: false,
        autoplay: true,
        swipe: true,
        mobileFirst: true, 
        fade: true,
        responsive: [
        {
             breakpoint: 768,
            settings: "unslick"
            }
        ]
    });

    
    
    //=======================
    var current_apt = $('.floor-info_view li.current-apt').index();

    $('.flat-info_carusel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        focusOnSelect: true,
        asNavFor: '.floor-info_view',
        dots: false,
        autoplay: false,
        infinite: false,
        fade: true,
        swipe: false,
        allowTouchMove: false,
        initialSlide: current_apt
    });
    $('.all-flat-in-floor_carusel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        focusOnSelect: true,
        asNavFor: '.floor-info_view',
        dots: false,
        autoplay: false,
        infinite: false,
        fade: true,
        swipe: false,
        allowTouchMove: false,
        initialSlide: current_apt
    });

    $('.all-status-flat').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        focusOnSelect: true,
        asNavFor: '.floor-info_view',
        dots: false,
        autoplay: false,
        infinite: false,
        fade: true,
        swipe: false,
        allowTouchMove: false,
        initialSlide: current_apt
    });

    $('.floor-info_view').slick({
        arrows: false,
        focusOnSelect: true,
        asNavFor: '.all-flat-in-floor_carusel, .flat-info_carusel, .all-status-flat',
        dots: false,
        autoplay: false,
        infinite: false,
        variableWidth: true,
        initialSlide: current_apt,
        swipe: false
    });
    

    //select floor for flat ============
    // $('.floor-info_view li.available').on('click', function() {
    //     $(this).addClass('current').siblings('li').removeClass('current');
    //     $('.status-flat').removeClass('visible');
    // });


    //========= modals ================
    $('.closed-modal, .site-modal .foot a').click(function() {
        $('.site-modal').removeClass('open');
        $('body').removeClass('not-scroll');
    });
    
    $('.modal-info-project').click(function() {
        $(this).siblings('.modal-object').addClass('open');
        $('body').addClass('not-scroll');
    });

    $('.client-info-modal').click(function() {
        $(this).siblings('.modal-clients').addClass('open');
        $('body').addClass('not-scroll');
    });

    $('.open-item-video').click(function() {
        $(this).siblings('.modal-wideo').addClass('open');
        $('body').addClass('not-scroll');
    });

    $('.open-booking').click(function() {
        $('.booking-modal').addClass('open');
        $('body').addClass('not-scroll');
    });

    $('.open-consultation-flat').click(function() {
        $('.consultation-flat').addClass('open');
        $('body').addClass('not-scroll');
    });
    //==

    $('.btn-subscribe-mail').click(function(e) {
        e.preventDefault();
        $('.modal-email').addClass('open');
        $('body').addClass('not-scroll');
    });

    $('.btn-subscribe-telegram').click(function(e) {
        e.preventDefault();
        $('.modal-telegram').addClass('open');
        $('body').addClass('not-scroll');
    });

    $('.btn-subscribe-whatsapp').click(function(e) {
        e.preventDefault();
        $('.modal-whatsapp').addClass('open');
        $('body').addClass('not-scroll');
    });

    $('.btn-subscribe-viber').click(function(e) {
        e.preventDefault();
        $('.modal-viber').addClass('open');
        $('body').addClass('not-scroll');
    });

    $('.view-presentation').click(function(e) {
        $('.main-section_media-modal').addClass('open');
    });

    $('.close-video').click(function(e) {
        $('.main-section_media-modal').removeClass('open');
    });


     /* Toggle tabs
     ========================================*/
    var tabContact = $('.contact-tab-content'); 
    if ($(window).width() > 768) {
        $('.contact-tabs_item a').click(function(){
            tabContact.filter(this.hash).addClass('visible').siblings().removeClass('visible'); 
            $('.contact-tabs_item').removeClass('active');
            $(this).parent('.contact-tabs_item').addClass('active');
            return false;
        }).filter(':first').click();
    }

    if ($(window).width() < 768) {
        $('.contact-tabs_item a').click(function(){
            tabContact.filter(this.hash).addClass('visible').siblings().removeClass('visible'); 
            $('.contact-tabs_item').removeClass('active');
            $(this).parent('.contact-tabs_item').addClass('active').toggleClass('single-view').siblings().toggleClass('hide');
            return false;
        });

        $('.contact-tabs_item:first-of-type').removeClass('active');
        $('.contact-tab-content:first-of-type').removeClass('visible');
    }


    /* === type-consultation select ======*/ 
    $('.select-checkbox_header').on('click', function () {
        $(this).parent('.select-checkbox').toggleClass('is-open');
    });

    $(document).on('click', '.list-select label', function () {
        $itemSelectText = $(this).find('.wpcf7-list-item-label').text();
        $('.is-selected').html($itemSelectText);
        $('.select-checkbox').removeClass('is-open');
        $('.select-placeholder').addClass('hidden');

    });

    $(document).on('click', function (e) {
        var el = '.select-checkbox';
        if ($(e.target).closest(el).length) return;
        $('.select-checkbox').removeClass('is-open');
    });


    // ========== scrolling availability check in modal ======================

    // if ($('.modal-body').length) {
    //     $(window).on('load',()=>{
    //         let el = $('.modal-body .inner')[0];
    //         if(el.scrollHeight!=el.clientHeight){
    //             $(el).parent('.modal-body').addClass('has-scroll');
    //         } else {
    //             $(el).parent('.modal-body').removeClass('has-scroll');
    //         }
    //     });
    // }

    if ($(window).width() > 992) {
        $(window).on("load", function () { 
            var about_main_section = $('.about_main-section .content').height();
            $('.about_main-section').css({
                'height': about_main_section
            });
        });
    }
    
    

    // ========== to-top-page ======================

    var btn = $('.button-top');  

    $(window).scroll(function() {     
        if ($(window).scrollTop() > 900) {
            btn.addClass('show');
        } else {
           btn.removeClass('show');
        }

        // if ($(window).scrollTop() > 4800) {
        //     btn.removeClass('show');
        // } 
    });
    btn.on('click', function() {
        $('html, body').animate({scrollTop:0}, '900');
    });

    //анимаця якорей =============================
    $(".anchor-link").on("click", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 900);
    });


    // Конвертация Картинок ===================
    $('img.img-svg, img.leaflet-marker-icon').each(function(){
      var $img = $(this);
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');
      $.get(imgURL, function(data) {
        var $svg = $(data).find('svg');
        if(typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass+' replaced-svg');
        }
        $svg = $svg.removeAttr('xmlns:a');
        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
          $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }
        $img.replaceWith($svg);
      }, 'xml');
    });


    //видео новости =============================
    $(".open-item-video").on("click", function() {
        var youtube_src = $(this).siblings('.site-modal').find('.iframe-youtube'),
        src = youtube_src.attr('src');
        youtube_src.attr('src', src + '&autoplay=1');
    });

    $(".pauseYoutube").click(function() {
        location.reload();
    });


    //=======смена url при выборе квартиры на планировке ===========
    var urlOrigin = window.location.href;
    var title = '';

    $('.floor-info_view .slick-slide').on('click', function() {
        var remLastUrl = window.location.href.match(/.*\/(.+)/)[1];
        var newUrl = urlOrigin.substring(0, location.href.lastIndexOf(remLastUrl));

        var redirect_url = $(this).children('.this_slug_string').text();
        newUrl += redirect_url;

        history.replaceState(null, title, newUrl);

    });

    //========= Translate status object =================
    var lang = $('html').attr('lang');

    const $labelItem = $('.label-item, .top-modal_sub-title, .status');
    $.each($labelItem, function(i, val) {
        const labelItemArrText = $(val).text().split('/');
        
        if (lang === 'ru-RU') {
          $(val).text(labelItemArrText[0]);
        } else if (lang === 'uk') {
          $(val).text(labelItemArrText[1]);
        }
    });

    //========= Customing shMapper =================
    if (lang === 'ru-RU') {
        $('.map-content .shm-map-panel').prepend(
            '<div class="filter-swith-hide"></div> <div class="title-mapper">Отобразить объекты на карте</div>'
        );
    } else if (lang === 'uk') {
        $('.map-content .shm-map-panel').prepend(
            '<div class="filter-swith-hide"></div> <div class="title-mapper">Показувати об`єкти на карті</div>'
        );
    }


    var filterName = $('.point_type_swicher label');
    filterName.each(function(){
        var filterName = $(this).attr('title');
        $(this).prepend(filterName);
        $(this).addClass(filterName);
    });

    $('.filter-swith-hide').click(function() {
        $('.map-content').toggleClass('closed');
    });

    if ($(window).width() < 768) {
        $('.map-content_objects').addClass('closed');
    }


    //========= Главное меню в шапке на мобильном =================
    $('.burger-menu').click(function() {
        $('.dropdown_wrapper').addClass('is-open');
    });
    $('.close-dropdown').click(function() {
        $('.dropdown_wrapper').removeClass('is-open');
    });


    $('li.menu-item-has-children').on('click', function(e) {
        $(this).toggleClass('open');
    });

    //========= Анимация about-legend на мобильном =================
    $(document).ready(function() {
        var windowHeight = $(window).height();
     
        $(document).on('scroll', function() {
            $('.about-legend .item').each(function() {
                var itemLeg = $(this),
                height_top = itemLeg.offset().top + itemLeg.height()/2 - windowHeight/2 - 30;
                if ($(document).scrollTop() >= height_top) {
                    itemLeg.addClass('open').siblings('.item').removeClass('open');
                }
            });
        });
    });


})(jQuery);	






