class Footer {
    constructor() {
        this.sitemapItems = $('footer .sitemap a');
        this.sitemapItems.click(this.handleSitemapClick);

    }

    handleSitemapClick(e) {
        const sectionId = $(e.currentTarget).attr('href');
        const sectionOffset = getSectionOffset(sectionId);

        $('html, body').stop().animate({
            scrollTop: sectionOffset
        }, GET_STARTED_ANIMATION_DURATION);

        e.preventDefault();
    }
}
