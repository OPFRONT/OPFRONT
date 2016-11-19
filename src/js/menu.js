class Menu {
    constructor() {
        this.topMenu = $('nav .menu');
        this.menuItems = this.topMenu.find('.menu-item');
        this.lastSectionId = '';

        this._bindMenuItemsClick();
        this.menuItems.click(this.handleMenuItemClick);
    }

    _bindMenuItemsClick() {
        $('.menu-btn').click(() => {
            $('nav').toggleClass('opened');
        });

        $('nav .lang .en').click(() => {
            $('nav .lang').removeClass(FR_LANG);
            $('nav .lang').addClass(EN_LANG);
            Cookies.set(LANG_COOKIE, EN_LANG);
        });

        $('nav .lang .fr').click(() => {
            $('nav .lang').removeClass(EN_LANG);
            $('nav .lang').addClass(FR_LANG);
            Cookies.set(LANG_COOKIE, FR_LANG);
        });

        $('nav .nav-logo').click(() => {
            closeGetStarted();
            $('nav').removeClass('opened');
            $(window).scrollTop();
        });
    }

    _markMenuItemAsActive(newId) {
        this.menuItems.removeClass('active');
        this.topMenu.find('.menu-item[href="' + newId + '"]').addClass('active');
    };

    handleMenuItemClick(e) {
        const sectionId = $(e.currentTarget).attr('href');
        const sectionOffset = getSectionOffset(sectionId);

        const getStartedWasOpened = closeGetStarted();
        const menuIsOpened = $('nav.opened').length > 0;

        $('nav').removeClass('opened');

        window.setTimeout(() => {
            $('html, body').stop().animate({
                scrollTop: sectionOffset
            }, GET_STARTED_ANIMATION_DURATION);
        }, getStartedWasOpened || menuIsOpened ? GET_STARTED_ANIMATION_DURATION : 0);

        e.preventDefault();
    }

    onScroll(offset) {
        const newSectionId = getCurrentSectionId(offset);

        if(this.lastSectionId !== newSectionId) {
            this._markMenuItemAsActive(newSectionId);
            this.lastSectionId = newSectionId;
        }
    }
}
