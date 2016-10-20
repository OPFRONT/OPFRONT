var _this = this;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
 * JavaScript Cookie v2.1.3
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
    var registeredInModuleLoader = false;
    if (typeof define === 'function' && define.amd) {
        define(factory);
        registeredInModuleLoader = true;
    }
    if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
        module.exports = factory();
        registeredInModuleLoader = true;
    }
    if (!registeredInModuleLoader) {
        var OldCookies = window.Cookies;
        var api = window.Cookies = factory();
        api.noConflict = function () {
            window.Cookies = OldCookies;
            return api;
        };
    }
})(function () {
    function extend() {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
            var attributes = arguments[i];
            for (var key in attributes) {
                result[key] = attributes[key];
            }
        }
        return result;
    }

    function init(converter) {
        function api(key, value, attributes) {
            var result;
            if (typeof document === 'undefined') {
                return;
            }

            // Write

            if (arguments.length > 1) {
                attributes = extend({
                    path: '/'
                }, api.defaults, attributes);

                if (typeof attributes.expires === 'number') {
                    var expires = new Date();
                    expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                    attributes.expires = expires;
                }

                try {
                    result = JSON.stringify(value);
                    if (/^[\{\[]/.test(result)) {
                        value = result;
                    }
                } catch (e) {}

                if (!converter.write) {
                    value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                } else {
                    value = converter.write(value, key);
                }

                key = encodeURIComponent(String(key));
                key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                key = key.replace(/[\(\)]/g, escape);

                return document.cookie = [key, '=', value, attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                attributes.path ? '; path=' + attributes.path : '', attributes.domain ? '; domain=' + attributes.domain : '', attributes.secure ? '; secure' : ''].join('');
            }

            // Read

            if (!key) {
                result = {};
            }

            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all. Also prevents odd result when
            // calling "get()"
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            var rdecode = /(%[0-9A-Z]{2})+/g;
            var i = 0;

            for (; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                var cookie = parts.slice(1).join('=');

                if (cookie.charAt(0) === '"') {
                    cookie = cookie.slice(1, -1);
                }

                try {
                    var name = parts[0].replace(rdecode, decodeURIComponent);
                    cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);

                    if (this.json) {
                        try {
                            cookie = JSON.parse(cookie);
                        } catch (e) {}
                    }

                    if (key === name) {
                        result = cookie;
                        break;
                    }

                    if (!key) {
                        result[name] = cookie;
                    }
                } catch (e) {}
            }

            return result;
        }

        api.set = api;
        api.get = function (key) {
            return api.call(api, key);
        };
        api.getJSON = function () {
            return api.apply({
                json: true
            }, [].slice.call(arguments));
        };
        api.defaults = {};

        api.remove = function (key, attributes) {
            api(key, '', extend(attributes, {
                expires: -1
            }));
        };

        api.withConverter = init;

        return api;
    }

    return init(function () {});
});

var PATH_NAMES = {
    en: 'en.html',
    fr: ''
};
var FR_LANG = 'fr';
var EN_LANG = 'en';
var LANG_COOKIE = 'of-lang';

// Need to consider locationPath when in dev mode. In prod it will evaluate to empty string.
var locationPath = location.pathname.substring(0, location.pathname.lastIndexOf('/'));
var originUrl = '' + location.origin + locationPath;

var _redirectIfNecessary = function _redirectIfNecessary(lang) {
    var currentLang = location.pathname.indexOf(PATH_NAMES[EN_LANG]) !== -1 ? EN_LANG : FR_LANG;

    if (lang !== currentLang) {
        location.replace(originUrl + '/' + PATH_NAMES[lang]);
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

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    var _loop = function _loop() {
        var formEl = _step.value;

        formEl.addEventListener('blur', function (_) {
            if (formEl.value) formEl.classList.add('filled');else formEl.classList.remove('filled');
        });
    };

    for (var _iterator = document.querySelectorAll('input,textarea,select')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop();
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}

var _getFormValuesObject = function _getFormValuesObject(formEl) {
    var formValuesEls = formEl.querySelectorAll('input,textarea,select');

    var formValues = {};
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = formValuesEls[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var formValueEl = _step2.value;

            formValues[formValueEl.name] = formValueEl.value;
            formValueEl.value = "";
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
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

var Menu = function () {
    function Menu() {
        _classCallCheck(this, Menu);

        this.topMenu = $('nav .menu');
        this.menuItems = this.topMenu.find('.menu-item');
        this.lastSectionId = '';

        this._bindMenuItemsClick();
        this.menuItems.click(this.handleMenuItemClick);

        $('.nav-logo').click(closeGetStarted);
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
            var menuIsOpened = $('nav.opened');

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
    }

    _createClass(Parallax, [{
        key: '_getContentHeight',
        value: function _getContentHeight() {
            return parseInt($('.page-content').height(), 10);
        }
    }, {
        key: 'onScroll',
        value: function onScroll(offset) {
            // TODO fade in once they scroll past header section

            var scrollPercentage = offset / this._getContentHeight();

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.prisms[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var prism = _step3.value;

                    prism.ele.css('top', 'calc(' + prism.initialPosition + ' + ' + scrollPercentage * prism.move + 'px)');
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
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

var _iteratorNormalCompletion4 = true;
var _didIteratorError4 = false;
var _iteratorError4 = undefined;

try {
    for (var _iterator4 = elementsToTrack[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var el = _step4.value;
        el.addEventListener('click', trackClick);
    }
} catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
} finally {
    try {
        if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
        }
    } finally {
        if (_didIteratorError4) {
            throw _iteratorError4;
        }
    }
}