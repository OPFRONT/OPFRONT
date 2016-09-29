var _this = this;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.prisms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var prism = _step.value;

                    prism.ele.css('top', 'calc(' + prism.initialPosition + ' + ' + scrollPercentage * prism.move + 'px)');
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
        }
    }]);

    return Parallax;
}();

var SECTION_IDS = ['#header'].concat(_toConsumableArray($('nav .menu .menu-item').map(function (_, elem) {
    return $(elem).attr('href');
})));

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