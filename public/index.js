var _this = this;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PATH_NAMES = {
    en: 'en',
    fr: ''
};
var FR_LANG = 'fr';
var EN_LANG = 'en';
var LANG_COOKIE = 'of-lang';

// Need to consider locationPath when in dev mode. In prod it will evaluate to empty string.
var locationPath = location.pathname.substring(0, location.pathname.lastIndexOf('/'));
var originUrl = '' + location.origin + locationPath;

var _redirectIfNecessary = function _redirectIfNecessary(lang) {
    var currentLang = location.pathname.indexOf(EN_LANG) !== -1 ? EN_LANG : FR_LANG;
    var newLang = PATH_NAMES[lang] !== undefined ? lang : EN_LANG;

    if (newLang !== currentLang) {
        location.replace(originUrl + '/' + PATH_NAMES[newLang]);
    }
};

var langCookie = Cookies.get(LANG_COOKIE);

if (langCookie) {
    _redirectIfNecessary(langCookie);
} else {
    var userLang = navigator.language || navigator.browserLanguage;
    if (userLang.indexOf(EN_LANG) !== -1) {
        userLang = EN_LANG;
    }
    _redirectIfNecessary(userLang);
}

var CONTACT_FORM_EVENT = 'Contact form sent';
var SUBSCRIBE_FORM_EVENT = 'Subscribe form sent';

var inputs = document.querySelectorAll('input,textarea,select');

var _loop = function _loop(i) {
    var formEl = inputs[i];
    formEl.addEventListener('blur', function (_) {
        if (formEl.value) formEl.classList.add('filled');else formEl.classList.remove('filled');
    });
};

for (var i = 0; i < inputs.length; i++) {
    _loop(i);
}

var _getFormValuesObject = function _getFormValuesObject(formEl) {
    var formValuesEls = formEl.querySelectorAll('input,textarea,select');

    var formValues = {};
    for (var _i = 0; _i < formValuesEls.length; _i++) {
        var formValueEl = formValuesEls[_i];
        formValues[formValueEl.name] = formValueEl.value;
        formValueEl.value = "";
    }

    return formValues;
};

var _addUserAsLead = function _addUserAsLead(userInfo) {
    var identifyPayload = {
        firstName: userInfo.firstname,
        lastName: userInfo.lastname,
        email: userInfo.email,
        phone: userInfo.phone,
        createdAt: new Date().toISOString(),
        company: {
            name: userInfo.company,
            website: userInfo.website
        },
        website: userInfo.website
    };
    console.log(identifyPayload);

    //TODO find a better way to add leads, seems like its not working with freshsales
    // analytics.identify(userInfo.email, identifyPayload)
};

//CONTACT
document.getElementById('contact-us-form').addEventListener('submit', function (e) {
    var form = e.target;

    e.preventDefault();
    document.querySelector('#contact .thanks').classList.add('active');
    form.querySelector('.btn[type="submit"]').setAttribute('disabled', true);

    var formValues = _getFormValuesObject(e.target);

    var message = formValues.firstname + ' ' + formValues.lastname + ' (' + formValues.email + ') asks for contact on website.\n message: ' + formValues.message;
    sendMessageToSlack(message);
    analytics.track(CONTACT_FORM_EVENT, formValues);
});

//SUBSCRIBE
document.getElementById('subscribe-form').addEventListener('submit', function (e) {
    var form = e.target;

    e.preventDefault();
    var formValues = _getFormValuesObject(form);
    analytics.track(SUBSCRIBE_FORM_EVENT, formValues);
    _addUserAsLead(formValues);

    var message = formValues.firstname + ' ' + formValues.lastname + ' (' + formValues.email + ') just subscribed.';
    for (var key in formValues) {
        message += '\n ' + key + ' : ' + formValues[key];
    }sendMessageToSlack(message);
    document.getElementById('thanks').classList.add('active');
});

var GET_STARTED_ANIMATION_DURATION = 600;

$('.btn.get-started').click(function (e) {
    $('#get-started').addClass('active');
});

// TODO this whole process of closing windows before others should use promises. Need to be refactored.
var closeGetStarted = function closeGetStarted() {
    var openedAsideSections = $('#get-started.active, #thanks.active, #choose-solution.active, #subscribe.active, #webstore.active');

    if (openedAsideSections.length > 0) {
        $('#thanks.active, #choose-solution.active, #subscribe.active, #webstore.active').addClass('closing');
        $('#get-started').removeClass('active');
        window.setTimeout(function () {
            $('#thanks, #choose-solution, #subscribe, #webstore').removeClass('active');
        }, GET_STARTED_ANIMATION_DURATION);
        window.setTimeout(function () {
            $('#thanks, #choose-solution, #subscribe, #webstore').removeClass('closing');
        }, GET_STARTED_ANIMATION_DURATION * 3);

        return true;
    }
    return false;
};

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

var timeout = location.hostname === "localhost" || location.hostname === "127.0.0.1" ? 0 : 2000;

window.setTimeout(function () {
    $('#page-loader').addClass('fadeOut');
}, timeout);

var BG_IMAGE_FILENAMES = ['OP_Image01', 'OP_Image02', 'OP_Image03', 'OP_Image04'];

var TABLET_MAX_WIDTH = 1024;
var isMobile = window.innerWidth <= TABLET_MAX_WIDTH;

var setRandomBackgroundImage = function setRandomBackgroundImage() {
    var randomImage = BG_IMAGE_FILENAMES[Math.floor(Math.random() * BG_IMAGE_FILENAMES.length)];
    var randomImageCSSString = 'background-image: url(' + location.origin + '/img/' + randomImage + (isMobile ? "small" : "") + '.jpg)';

    document.getElementById('header').setAttribute('style', randomImageCSSString);
};

setRandomBackgroundImage();

var Menu = function () {
    function Menu() {
        _classCallCheck(this, Menu);

        this.topMenu = $('nav .menu');
        this.menuItems = this.topMenu.find('.menu-item');
        this.lastSectionId = '';

        this._bindMenuItemsClick();
        this.menuItems.click(this.handleMenuItemClick);
    }

    _createClass(Menu, [{
        key: '_bindMenuItemsClick',
        value: function _bindMenuItemsClick() {
            $('.menu-btn').click(function () {
                $('nav').toggleClass('opened');
            });

            $('nav .lang .en').click(function () {
                $('nav .lang').removeClass(FR_LANG);
                $('nav .lang').addClass(EN_LANG);
                Cookies.set(LANG_COOKIE, EN_LANG);
            });

            $('nav .lang .fr').click(function () {
                $('nav .lang').removeClass(EN_LANG);
                $('nav .lang').addClass(FR_LANG);
                Cookies.set(LANG_COOKIE, FR_LANG);
            });

            $('nav .nav-logo').click(function () {
                closeGetStarted();
                $('nav').removeClass('opened');
                $(window).scrollTop();
            });
        }
    }, {
        key: '_markMenuItemAsActive',
        value: function _markMenuItemAsActive(newId) {
            this.menuItems.removeClass('active');
            this.topMenu.find('.menu-item[href="' + newId + '"]').addClass('active');
        }
    }, {
        key: 'handleMenuItemClick',
        value: function handleMenuItemClick(e) {
            var sectionId = $(e.currentTarget).attr('href');
            var sectionOffset = getSectionOffset(sectionId);

            var getStartedWasOpened = closeGetStarted();
            var menuIsOpened = $('nav.opened').length > 0;

            $('nav').removeClass('opened');

            window.setTimeout(function () {
                $('html, body').stop().animate({
                    scrollTop: sectionOffset
                }, GET_STARTED_ANIMATION_DURATION);
            }, getStartedWasOpened || menuIsOpened ? GET_STARTED_ANIMATION_DURATION : 0);

            e.preventDefault();
        }
    }, {
        key: 'onScroll',
        value: function onScroll(offset) {
            var newSectionId = getCurrentSectionId(offset);

            if (this.lastSectionId !== newSectionId) {
                this._markMenuItemAsActive(newSectionId);
                this.lastSectionId = newSectionId;
            }
        }
    }]);

    return Menu;
}();

var PageControls = function () {
    function PageControls() {
        _classCallCheck(this, PageControls);

        this.previousPageControl = $('.page-controls .previous');
        this.nextPageControl = $('.page-controls .next');
        this.pageControls = $([this.nextPageControl[0], this.previousPageControl[0]]);

        this.pageControls.click(this.handlePageControlClick);
    }

    _createClass(PageControls, [{
        key: 'handlePageControlClick',
        value: function handlePageControlClick(e) {
            var scrollOffset = $(window).scrollTop();
            var indexOffset = $(e.currentTarget).hasClass('previous') ? -1 : 1;
            var sectionId = getAdjacentSectionId(scrollOffset, indexOffset);
            var sectionOffset = getSectionOffset(sectionId);

            $('html, body').stop().animate({
                scrollTop: sectionOffset
            }, 300);
        }
    }, {
        key: 'onScroll',
        value: function onScroll(offset) {
            offset < getFirstSectionOffset() ? this.previousPageControl.removeClass('active') : this.previousPageControl.addClass('active');

            offset >= getLastSectionOffset() ? this.nextPageControl.removeClass('active') : this.nextPageControl.addClass('active');

            offset > $('.page-controls .next').height() ? this.nextPageControl.removeClass('white') : this.nextPageControl.addClass('white');
        }
    }]);

    return PageControls;
}();

var Parallax = function () {
    function Parallax() {
        _classCallCheck(this, Parallax);

        this.prisms = [{
            ele: $('#teal-stick'),
            initialPosition: $('#teal-stick').css('top'),
            move: 125
        }, {
            ele: $('#black-stick'),
            initialPosition: $('#black-stick').css('top'),
            move: -280
        }, {
            ele: $('#red-stick'),
            initialPosition: $('#red-stick').css('top'),
            move: -200
        }];
        this._documentHeight = document.height !== undefined ? document.height : document.body.offsetHeight;
    }

    _createClass(Parallax, [{
        key: 'onScroll',
        value: function onScroll(offset) {
            // TODO fade in once they scroll past header section

            var scrollPercentage = offset / this._documentHeight;

            for (var _i2 = 0; _i2 < this.prisms.length; _i2++) {
                var prism = this.prisms[_i2];
                prism.ele.css('top', 'calc(' + prism.initialPosition + ' + ' + scrollPercentage * prism.move + 'px)');
            }
        }
    }]);

    return Parallax;
}();

// Bug: This doesn't work in Safari. Seems like there's a problem with the spread operator while transpiling.


var SECTION_IDS = ['#header'].concat(_toConsumableArray($('nav .menu .menu-item').map(function (_, elem) {
    return $(elem).attr('href');
})));
// let SECTION_IDS = ['#header'];
// $('nav .menu .menu-item').map((_, elem) => {
//     SECTION_IDS.push($(elem).attr('href'))
// });

var menu = new Menu();
var parallax = new Parallax();
var pageControls = new PageControls();

$(window).scroll(function () {
    var scrollOffset = $(_this).scrollTop();

    menu.onScroll(scrollOffset);
    parallax.onScroll(scrollOffset);
    pageControls.onScroll(scrollOffset);
});

var getSectionOffset = function getSectionOffset(sectionId) {
    return parseInt($(sectionId).offset().top, 10);
};

var getFirstSectionOffset = function getFirstSectionOffset() {
    return getSectionOffset(SECTION_IDS[1]);
};

var getLastSectionOffset = function getLastSectionOffset() {
    return getSectionOffset(SECTION_IDS[SECTION_IDS.length - 1]);
};

var getCurrentSectionId = function getCurrentSectionId(scrollOffset) {
    var sectionId = void 0;
    SECTION_IDS.map(function (section) {
        if (getSectionOffset(section) <= scrollOffset) {
            sectionId = section;
        }
    });
    return sectionId;
};

var getAdjacentSectionId = function getAdjacentSectionId(scrollOffset, indexOffset) {
    var sectionIndex = void 0;
    SECTION_IDS.map(function (section, index) {
        if (getSectionOffset(section) <= scrollOffset) {
            sectionIndex = index;
        }
    });
    return SECTION_IDS[sectionIndex + indexOffset];
};

var SLACK_SUPPORT_WEBHOOK_URL = 'https://hooks.slack.com/services/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';

var sendMessageToSlack = function sendMessageToSlack(text) {
    var jsonSlackPayload = JSON.stringify({ text: text });
    var xhr = new XMLHttpRequest();

    xhr.open('POST', SLACK_SUPPORT_WEBHOOK_URL);
    xhr.send(jsonSlackPayload);
};
var TRACK_CLICKS_ATTRIBUTE_NAME = 'track-click';

var elementsToTrack = document.querySelectorAll('[' + TRACK_CLICKS_ATTRIBUTE_NAME + ']');
var trackClick = function trackClick(e) {
    var elemId = e.target.id;
    if (elemId) analytics.track('Clicked on ' + elemId);
};

for (var _i3 = 0; _i3 < elementsToTrack.length; _i3++) {
    elementsToTrack[_i3].addEventListener('click', trackClick);
}