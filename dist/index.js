var _this = this;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var closeGetStarted = function closeGetStarted(callback) {
    var openedAsideSections = $('#thanks.active, #choose-solution.active, #subscribe.active, #webstore.active');

    if (openedAsideSections.length > 0) {
        $('#thanks.active, #choose-solution.active, #subscribe.active, #webstore.active').addClass('closing');
        $('#get-started').removeClass('active');
        window.setTimeout(function () {
            $('#thanks, #choose-solution, #subscribe, #webstore').removeClass('active');
        }, GET_STARTED_ANIMATION_DURATION);
        window.setTimeout(function () {
            $('#thanks, #choose-solution, #subscribe, #webstore').removeClass('closing');
        }, GET_STARTED_ANIMATION_DURATION * 3);

        if (callback) {
            window.setTimeout(function () {
                callback();
            }, GET_STARTED_ANIMATION_DURATION);
        }
    } else {
        callback();
    }
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
    $('#page-loader').addClass('hidden');
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
                $('nav .menu').toggleClass('opened');
            });

            $('nav .lang .en').click(function () {
                $('nav .lang').removeClass('fr');
                $('nav .lang').addClass('en');
            });

            $('nav .lang .fr').click(function () {
                $('nav .lang').removeClass('en');
                $('nav .lang').addClass('fr');
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

            closeGetStarted(function () {
                $('html, body').stop().animate({
                    scrollTop: sectionOffset
                }, 300);
            });

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