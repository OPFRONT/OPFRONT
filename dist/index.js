var _this = this;

$('#subscribe-form').submit(function (e) {
    $('#thanks').addClass('active');
    e.preventDefault();
});

$('#contact-us-form').submit(function (e) {
    $('#contact .thanks').addClass('active');
    $('#contact .btn[type="submit"]').attr('disabled', true);
    e.preventDefault();
});

$('input, textarea').focusout(function (e) {
    var input = $(e.target);
    if (input.val()) {
        input.addClass('filled');
    } else {
        input.removeClass('filled');
    }
});
// $('#thanks .back-btn .btn').click((e) => {
//     $('#thanks').removeClass('active');
//     $('.btn.get-started').attr('disabled', false);
//     $('#complete-solution, #choose-solution, #subscribe, #webstore, #thanks, #get-started, .btn.get-started').removeClass('active');
// });

$('.btn.get-started').click(function (e) {
    $('#get-started').addClass('active');
});

var closeGetStarted = function closeGetStarted(callback) {
    var openedAsideSections = $('#thanks.active, #get-started.active, #choose-solution.active, #subscribe.active, #webstore.active');

    if (openedAsideSections.length > 0) {
        openedAsideSections.addClass('closing');
        openedAsideSections.removeClass('active');
        window.setTimeout(function () {
            $('#thanks, #get-started, #choose-solution, #subscribe, #webstore').removeClass('closing');
        }, 1800);

        if (callback) {
            window.setTimeout(function () {
                callback();
            }, 600);
        }
    } else {
        callback();
    }
};

// TODO: hide get started section on menu item clic and on logo clic

$('#get-started .navigation-control.previous').click(function (e) {
    $('#get-started, .btn.get-started').removeClass('active');
});

$('#complete-solution .choose .btn').click(function (e) {
    $('#choose-solution').addClass('active');
});

$('#choose-solution .navigation-control.previous').click(function (e) {
    $('#choose-solution').removeClass('active');
});

$('#choose-solution .choose .btn').click(function (e) {
    $('#subscribe').addClass('active');
});

$('#subscribe .navigation-control.previous').click(function (e) {
    $('#subscribe').removeClass('active');
});

$('#store-solution').click(function (e) {
    $('#subscribe').addClass('active');
});

$('#webstore .navigation-control.previous').click(function (e) {
    $('#webstore').removeClass('active');
});

$('#thanks .navigation-control.previous').click(function (e) {
    closeGetStarted();
});
// window.setTimeout(() => {
//     $('#page-loader img').addClass('hidden');
// }, 1500);
// }, 0);

window.setTimeout(function () {
    $('#page-loader').addClass('hidden');
    // }, 2000);
}, 0);

$('.open-menu-btn').click(function () {
    $('nav .menu').addClass('opened');
});

$('.close-menu-btn').click(function () {
    $('nav .menu').removeClass('opened');
});

$('nav .lang .en').click(function () {
    $('nav .lang').removeClass('fr');
    $('nav .lang').addClass('en');
});

$('nav .lang .fr').click(function () {
    $('nav .lang').removeClass('en');
    $('nav .lang').addClass('fr');
});
var CONTENT_HEIGHT = parseInt($('.page-content').height(), 10);

var TEAL_STICK = $('#teal-stick');
var BLACK_STICK = $('#black-stick');
var RED_STICK = $('#red-stick');

var TEAL_INITIAL_POS = TEAL_STICK.css('top');
var BLACK_INITIAL_POS = BLACK_STICK.css('top');
var RED_INITIAL_POS = RED_STICK.css('top');

var TEAL_MOVE = 125;
var BLACK_MOVE = -280;
var RED_MOVE = -200;

// TODO: Split parallax and menu scrollspy in different modules
var handleParallax = function handleParallax(offset) {
    var scrollPercentage = offset / CONTENT_HEIGHT;

    TEAL_STICK.css('top', 'calc(' + TEAL_INITIAL_POS + ' + ' + scrollPercentage * TEAL_MOVE + 'px)');
    BLACK_STICK.css('top', 'calc(' + BLACK_INITIAL_POS + ' + ' + scrollPercentage * BLACK_MOVE + 'px)');
    RED_STICK.css('top', 'calc(' + RED_INITIAL_POS + ' + ' + scrollPercentage * RED_MOVE + 'px)');
};

var topMenu = $('nav .menu'),
    menuItems = topMenu.find('.menu-item');

var menuItemsInfo = menuItems.map(function (_, elem) {
    return {
        id: $(elem).attr('href'),
        anchorOffset: $($(elem).attr('href')).offset().top - 25
    };
});

var getCurrentSectionId = function getCurrentSectionId(scrollOffset) {
    var newId = void 0;
    menuItemsInfo.map(function (_, menuItem) {
        if (menuItem.anchorOffset < scrollOffset) {
            newId = menuItem.id;
        }
    });
    return newId;
};

var markMenuItemAsActive = function markMenuItemAsActive(newId) {
    menuItems.removeClass('active');
    topMenu.find('.menu-item[href="' + newId + '"]').addClass('active');
};

var lastId = '';
var handleMenuScrollSpy = function handleMenuScrollSpy(scrollOffset) {
    var newId = getCurrentSectionId(scrollOffset);
    if (lastId !== newId) {
        markMenuItemAsActive(newId);
        lastId = newId;
    }
};

menuItems.click(function (e) {
    var sectionId = $(e.currentTarget).attr('href');
    var sectionOffset = $(sectionId).offset().top;

    closeGetStarted(function () {
        $('html, body').stop().animate({
            scrollTop: sectionOffset
        }, 300);
    });

    e.preventDefault();
});

$(window).scroll(function () {
    var scrollOffset = $(_this).scrollTop();
    handleMenuScrollSpy(scrollOffset);
    handleParallax(scrollOffset);
});

var sectionControls = $('section:not(".aside-section") .navigation-control');

sectionControls.click(function (e) {
    var sectionId = $(e.currentTarget).attr('href');
    var sectionOffset = $(sectionId).offset().top;

    $('html, body').stop().animate({
        scrollTop: sectionOffset
    }, 300);

    e.preventDefault();
});

$('.nav-logo').click(function (e) {
    closeGetStarted();
});