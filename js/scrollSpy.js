const topMenu = $('nav .menu'),
    menuItems = topMenu.find('.menu-item');

const menuItemsInfo = menuItems.map((_, elem) => ({
    id: $(elem).attr('href'),
    anchorOffset: $($(elem).attr('href')).offset().top - 25
}));

const getCurrentSectionId = () => {
    let scrollOffset = $(this).scrollTop();
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

menuItems.click((e) => {
    const sectionId = $(e.currentTarget).attr('href');
    const sectionOffset = $(sectionId).offset().top;

    $('html, body').stop().animate({
        scrollTop: sectionOffset
    }, 300);

    e.preventDefault();
});

let lastId = '';
$(window).scroll(() => {
    const newId = getCurrentSectionId();
    if(lastId !== newId) {
        markMenuItemAsActive(newId);
        lastId = newId;
    }
});
