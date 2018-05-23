var windowWidth = window.innerWidth,
    windowHeight = window.innerHeight,
    mobile = false,
    tablet = true,
    desktop = true,
    opera12 = false,
    apple = false,
    loaded = false,
    ie = 0,
    oldie = false,
    scrolltop = 0,
    animation = true,
    scrollWidth = 0;

function isMobile() {
    var check = false;
    (function(a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

function isTablet() {
    return (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
}

function isApple() {
    return (/iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase()));
}

function isAndroid() {
    return (/android/i.test(navigator.userAgent.toLowerCase()));
}

function isOpera12() {
    if (navigator.userAgent.indexOf('Opera') !== -1 && navigator.userAgent.indexOf('OPR/') === -1) {
        var version = navigator.userAgent.substring(navigator.userAgent.indexOf('Version/') + 8);
        if (version.indexOf('12.') !== false) return true;
        return false;
    }
    return false;
}

function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

function getScrollbarWidth() {
    var outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);
    var widthNoScroll = outer.offsetWidth;
    outer.style.overflow = 'scroll';
    var inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);
    var widthWithScroll = inner.offsetWidth;
    outer.parentNode.removeChild(outer);
    return widthNoScroll - widthWithScroll;
}

mobile = isMobile();
tablet = isTablet();
desktop = (isMobile() || isTablet()) ? false : true;
apple = isApple();
opera12 = isOpera12();
ie = isIE();
scrollWidth = getScrollbarWidth();

oldie = (ie !== false && ie <= 10);

var viewport = document.getElementById('viewport');

if (tablet === true) {
    viewport.setAttribute('content', 'width=device-width user-scalable=no');
}

if (mobile === true) {
    viewport.setAttribute('content', 'width=device-width user-scalable=no');
}

windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
windowHeight = window.innerHeight ? window.innerHeight : $(window).height();

if (desktop === false) {
    $('body').removeClass('desktop');
    $('body').addClass('device');
}

if (opera12 === true) {
    $('body').addClass('opera12');
}

if (isAndroid()) {
    $('body').addClass('android');
}

if (apple === true) {
    $('body').addClass('apple');
}

if (desktop === true) {
    $('body').addClass('desktop');
}

if (tablet === true && mobile === false) {
    $('body').addClass('tablet');
}

if (mobile === true) {
    $('body').addClass('mobile');
}

if (ie !== false) {
    $('body').addClass('ie');
}

if (ie !== false && ie <= 9) {
    $('body').addClass('ie9');
}

if (ie !== false && ie === 10) {
    $('body').addClass('ie10');
}

if ($('.js-years-list').length > 0) {
    yearsList();
}

$(window).scroll(function() {
    scrolltop = $(window).scrollTop();
});

function resizeHandler() {
    windowWidth = (document.documentElement.clientWidth) ? document.documentElement.clientWidth : $(window).width();
    windowHeight = (document.documentElement.clientHeight) ? document.documentElement.clientHeight : $(window).height();
}

$(window).on("debouncedresize", function(event) {
    resizeHandler();
});

if (desktop === false) {
    window.addEventListener('orientationchange', function() {
        resizeHandler();
    });
}

function freeze(type, state) {
    var body = $('body'),
        page = $('.page-wrap');
    if (state === true) {
        body
            .addClass(type + '-is-visible')
            .css({
                'overflow': 'hidden',
                'height': 'calc(100vh + ' + scrolltop + 'px)'
            });

        page.css({
            'padding-right': scrollWidth + 'px'
        });
    } else {
        body
            .removeClass(type + '-is-visible')
            .removeAttr('style');
        page.removeAttr('style');
    }
}

function elemAppear() {
    var elem = $('.js-appear');
    elem.appear();
    $.each(elem, function(index, val) {
        var elem = $(val);
        elem.on('appear', function(event, $all_appeared_elements) {
            $(this).addClass('is-visible');
        });
        elem.on('appear', function(event, $all_appeared_elements) {
            $(this).addClass('is-visible');
        });
        if (elem.is(':appeared') === true) {
            elem.addClass('is-visible');
        }
    });
}

$(elemAppear());

function elemVisible() {
    var elem = $('.js-visible');
    elem.appear();
    elem.on('appear', function(event, $all_appeared_elements) {
        $(this).addClass('is-visible');
    });
    elem.on('disappear', function(event, $all_appeared_elements) {
        $(this).removeClass('is-visible');
    });
    if (elem.is(':appeared') === true) {
        elem.addClass('is-visible');
    }
}

$(elemVisible());

$(function(){
    // lazy loads elements with default selector as ".lozad"
    let observer = lozad();
    observer.observe();
});

$(function headerAnimationFunction() {
    const $headerEl = $('.js-header');
    const $bg  = $headerEl.find('.js-header-bg');
    const $img = $headerEl.find('.js-header-img');
    const $wav = $headerEl.find('.js-header-pattern-wave');
    const $gradient = $headerEl.find('.js-header-gradient');
    const $promoSlider = $headerEl.find('.js-promo-slider');
    const $promoNav = $('.js-promo-slider-nav');
    const $headerInfo = $('.js-header-slider-aside');

    let t = new TimelineMax();
    let header = new headerAnimation()

    function headerAnimation($headerEl) {
        var instance = this;

        this.prepare = function() {
            TweenLite.set($bg, {
                width:'0%',
            });

            TweenLite.set($wav, {
                width:'0%',
            });

            TweenLite.set($img, {
                opacity: 0,
                scale: 1.2,
                transformOrign:'50% 50%'
            });

            TweenLite.set($gradient, {
                opacity: 0,
                y: '50%'
            });

            TweenLite.set($promoSlider, {
                opacity: 0,
                y: '10%'
            });

            TweenLite.set($promoNav, {
                opacity: 0,
                x: '-10%'
            });

            TweenLite.set($headerInfo, {
                opacity: 0,
                x: '10%'
            });

            $img.imagesLoaded(function(){
                console.log('imagesLoaded');
                setTimeout(header.show, 1000);
            });

        }

        this.show = function() {
            t.add(TweenLite.to($bg, 0.75, {
                width:'100%',
                ease: Power2.easeIn,
            }));

            t.add(TweenLite.to($img, 0.75, {
                opacity: 1,
                scale: 1,
                ease: Power2.easeOut,
            }));

            t.add(TweenLite.to($gradient, 0.75, {
                opacity: 1,
                y: '0%',
                ease: Power2.easeOut,
                onStart:function() {
                    TweenLite.to($wav, 4, {
                        width:'100%'
                    });
                    TweenLite.to($promoSlider, 0.5, {
                        opacity: 1,
                        delay: 0.25,
                        y: '0%',
                        ease: Power2.easeOut,
                    });
                    TweenLite.to($headerInfo, 0.5, {
                        opacity: 1,
                        delay: 0.5,
                        x: '0%',
                        ease: Power2.easeOut,
                    });
                    TweenLite.to($promoNav, 0.5, {
                        opacity: 1,
                        delay: 0.75,
                        x: '0%',
                        ease: Power2.easeOut,
                    });
                }
            }));

        }
    }

    // header.prepare();
});



const stickybitsInstance = stickybits('.js-sidemenu', {
    stickyBitStickyOffset: 40
});


var promoSlider = new Swiper('.js-promo-slider', {
    direction: 'horizontal',
    speed: 1000,
    effect: 'slide',
    slidesPerView: 1,
    parallax:true,
    pagination: false,
    navigation: false,
    scrollbar: false,
    resistance: false,
    loop: false,
    lazy: {
        loadPrevNext: true,
    }
});

var promoSliderNav = new Swiper('.js-promo-slider-nav', {
    slidesPerView: 5,
    loop: false,
    slideToClickedSlide: true,
    centeredSlides: true,
    speed: 1000,
    lazy: true,

    navigation: {
        nextEl: '.promo-button-next',
        prevEl: '.promo-button-prev',
    }
});

$(function(){
    if ($('.js-promo-slider').length > 0) {
        promoSlider.controller.control = promoSliderNav;
        promoSliderNav.controller.control = promoSlider;
    }
});