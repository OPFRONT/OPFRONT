const SECTION_IDS = ['#header', ...$('nav .menu .menu-item').map((_, elem) => {
        const menuItemLink = $(elem).attr('href');
        const indexOfAnchor = menuItemLink.indexOf('#');
        if(indexOfAnchor > 0) {
            return menuItemLink.substr(indexOfAnchor);
        }
    }
)];

const footer = new Footer();
const menu = new Menu();

$(window).scroll(() => {
    const scrollOffset = $(this).scrollTop();

    menu.onScroll(scrollOffset);
});

const getSectionOffset = (sectionId) => {
    return parseInt($(sectionId).offset().top, 10);
};

const getCurrentSectionId = (scrollOffset) => {
    let sectionId;
    SECTION_IDS.map((section) => {
        if(getSectionOffset(section) <= scrollOffset) {
            sectionId = section;
        }
    });
    return sectionId;
};
