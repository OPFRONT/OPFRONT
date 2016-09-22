var _this = this;

$('#contact-us-form, #subscribe-form, #subscribe-store-form').submit(function (e) {
    $("#thanks").addClass('active');
    $('.btn.get-started').attr('disabled', true);
    if ($('#complete-solution.active, #choose-solution.active, #subscribe.active, #webstore.active, #thanks.active').length > 0) {
        window.setTimeout(function () {
            $('#get-started, #complete-solution, #choose-solution, #subscribe, #webstore, .btn.get-started').removeClass('active');
        }, 500);
    }
    e.preventDefault();
});
$('#thanks .back-btn .btn').click(function (e) {
    $('#thanks').removeClass('active');
    $('.btn.get-started').attr('disabled', false);
    $('#complete-solution, #choose-solution, #subscribe, #webstore, #thanks, #get-started, .btn.get-started').removeClass('active');
});

$('.btn.get-started').click(function (e) {
    if ($('.btn.get-started.active').length == 0) {
        $('#get-started, .btn.get-started').addClass('active');
    } else {
        if ($('#complete-solution.active, #choose-solution.active, #subscribe.active, #webstore.active, #thanks.active').length > 0) {
            $('#complete-solution, #choose-solution, #subscribe, #webstore, #thanks').removeClass('active');
            $('.btn.get-started').attr('disabled', false);
            window.setTimeout(function () {
                $('#get-started, .btn.get-started').removeClass('active');
            }, 500);
        } else {
            $('#get-started, .btn.get-started').removeClass('active');
        }
    }
});

$('#get-started .navigation-control.previous').click(function (e) {
    $('#get-started, .btn.get-started').removeClass('active');
});

$('#complete-solution').click(function (e) {
    $('#choose-solution').addClass('active');
});

$('#choose-solution .navigation-control.previous').click(function (e) {
    $('#choose-solution').removeClass('active');
});

$('#choose-solution .btn.choose').click(function (e) {
    $('#subscribe').addClass('active');
});

$('#subscribe .navigation-control.previous').click(function (e) {
    $('#subscribe').removeClass('active');
});

$('#store-solution').click(function (e) {
    $('#webstore').addClass('active');
});

$('#webstore .navigation-control.previous').click(function (e) {
    $('#store-solution').removeClass('active');
});
window.setTimeout(function () {
    $('#page-loader img').addClass('hidden');
}, 1500);

window.setTimeout(function () {
    $('#page-loader').addClass('hidden');
}, 2000);
// }, 0);

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
var topMenu = $('nav .menu'),
    menuItems = topMenu.find('.menu-item');

var menuItemsInfo = menuItems.map(function (_, elem) {
    return {
        id: $(elem).attr('href'),
        anchorOffset: $($(elem).attr('href')).offset().top - 25
    };
});

var getCurrentSectionId = function getCurrentSectionId() {
    var scrollOffset = $(_this).scrollTop();
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

menuItems.click(function (e) {
    var sectionId = $(e.currentTarget).attr('href');
    var sectionOffset = $(sectionId).offset().top;

    $('html, body').stop().animate({
        scrollTop: sectionOffset
    }, 300);

    e.preventDefault();
});

var lastId = '';
$(window).scroll(function () {
    var newId = getCurrentSectionId();
    if (lastId !== newId) {
        markMenuItemAsActive(newId);
        lastId = newId;
    }
});

var sectionControls = $('.navigation-control');

sectionControls.click(function (e) {
    var sectionId = $(e.currentTarget).attr('href');
    var sectionOffset = $(sectionId).offset().top;

    $('html, body').stop().animate({
        scrollTop: sectionOffset
    }, 300);

    e.preventDefault();
});