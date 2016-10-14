class Menu {
    constructor() {
        this.topMenu = $('nav .menu');
        this.menuItems = this.topMenu.find('.menu-item');
        this.lastSectionId = '';

        this._bindMenuItemsClick();
        this.menuItems.click(this.handleMenuItemClick);

        $('.nav-logo').click(closeGetStarted);
    }

    _bindMenuItemsClick() {
        $('.menu-btn').click(() => {
            $('nav').toggleClass('opened');
        });

        $('nav .lang .en').click(() => {
            $('nav .lang').removeClass('fr');
            $('nav .lang').addClass('en');
        });

        $('nav .lang .fr').click(() => {
            $('nav .lang').removeClass('en');
            $('nav .lang').addClass('fr');
        });
    }

    _markMenuItemAsActive(newId) {
        this.menuItems.removeClass('active');
        this.topMenu.find('.menu-item[href="' + newId + '"]').addClass('active');
    };

    handleMenuItemClick(e) {
        const sectionId = $(e.currentTarget).attr('href');
        const sectionOffset = getSectionOffset(sectionId);

        closeGetStarted(() => {
            $('html, body').stop().animate({
                scrollTop: sectionOffset
            }, 300);
        });

        $('nav').removeClass('opened');

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
