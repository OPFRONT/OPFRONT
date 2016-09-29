const SECTION_IDS = ['#header', ...$('nav .menu .menu-item').map((_, elem) => $(elem).attr('href'))];

const menu = new Menu();
const parallax = new Parallax();
const pageControls = new PageControls();

$(window).scroll(() => {
    const scrollOffset = $(this).scrollTop();

    menu.onScroll(scrollOffset);
    parallax.onScroll(scrollOffset);
    pageControls.onScroll(scrollOffset);
});

const getSectionOffset = (sectionId) => {
    return parseInt($(sectionId).offset().top, 10);
};

const getFirstSectionOffset = () => {
    return getSectionOffset(SECTION_IDS[1]);
};

const getLastSectionOffset = () => {
    return getSectionOffset(SECTION_IDS[SECTION_IDS.length - 1]);
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

const getAdjacentSectionId = (scrollOffset, indexOffset) => {
    let sectionIndex;
    SECTION_IDS.map((section, index) => {
        if(getSectionOffset(section) <= scrollOffset) {
            sectionIndex = index;
        }
    });
    return SECTION_IDS[sectionIndex + indexOffset];
};
