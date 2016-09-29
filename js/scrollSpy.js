const CONTENT_HEIGHT = parseInt($('.page-content').height(), 10);

const TEAL_STICK = $('#teal-stick');
const BLACK_STICK = $('#black-stick');
const RED_STICK = $('#red-stick');

const TEAL_INITIAL_POS = TEAL_STICK.css('top');
const BLACK_INITIAL_POS = BLACK_STICK.css('top');
const RED_INITIAL_POS = RED_STICK.css('top');

const TEAL_MOVE = 125;
const BLACK_MOVE = -280;
const RED_MOVE = -200;

// TODO: Split parallax and menu scrollspy in different modules
const handleParallax = (offset) => {
    let scrollPercentage = offset / CONTENT_HEIGHT;

    TEAL_STICK.css('top', `calc(${TEAL_INITIAL_POS} + ${scrollPercentage * TEAL_MOVE}px)`);
    BLACK_STICK.css('top', `calc(${BLACK_INITIAL_POS} + ${scrollPercentage * BLACK_MOVE}px)`);
    RED_STICK.css('top', `calc(${RED_INITIAL_POS} + ${scrollPercentage * RED_MOVE}px)`);
};

const topMenu = $('nav .menu'),
    menuItems = topMenu.find('.menu-item');

const menuItemsInfo = menuItems.map((_, elem) => ({
    id: $(elem).attr('href'),
    anchorOffset: $($(elem).attr('href')).offset().top - 25
}));

const getCurrentSectionId = (scrollOffset) => {
    let newId;
    menuItemsInfo.map((_, menuItem) => {
        if(menuItem.anchorOffset < scrollOffset) {
            newId = menuItem.id;
        }
    });
    return newId;
};

const markMenuItemAsActive = (newId) => {
    menuItems.removeClass('active');
    topMenu.find('.menu-item[href="' + newId + '"]').addClass('active');
};

let lastId = '';
const handleMenuScrollSpy = (scrollOffset) => {
    const newId = getCurrentSectionId(scrollOffset);
    if(lastId !== newId) {
        markMenuItemAsActive(newId);
        lastId = newId;
    }
};

menuItems.click((e) => {
    const sectionId = $(e.currentTarget).attr('href');
    const sectionOffset = $(sectionId).offset().top;


    closeGetStarted(() => {
        $('html, body').stop().animate({
            scrollTop: sectionOffset
        }, 300);
    });

    e.preventDefault();
});

$(window).scroll(() => {
    let scrollOffset = $(this).scrollTop();
    handleMenuScrollSpy(scrollOffset);
    handleParallax(scrollOffset);
});
