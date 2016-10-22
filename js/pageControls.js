class PageControls {
    constructor() {
        this.previousPageControl = $('.page-controls .previous');
        this.nextPageControl = $('.page-controls .next');
        this.pageControls = $([this.nextPageControl[0], this.previousPageControl[0]]);

        this.pageControls.click(this.handlePageControlClick);
    }

    handlePageControlClick(e) {
        const scrollOffset = $(window).scrollTop();
        const indexOffset = $(e.currentTarget).hasClass('previous') ? -1 : 1;
        const sectionId = getAdjacentSectionId(scrollOffset, indexOffset);
        const sectionOffset = getSectionOffset(sectionId);

        $('html, body').stop().animate({
            scrollTop: sectionOffset
        }, 300);
    }

    onScroll(offset) {
        offset < getFirstSectionOffset() ?
            this.previousPageControl.removeClass('active') :
            this.previousPageControl.addClass('active');

        offset >= getLastSectionOffset() ?
            this.nextPageControl.removeClass('active') :
            this.nextPageControl.addClass('active');

        offset > $('.page-controls .next').height() ?
            this.nextPageControl.removeClass('white') :
            this.nextPageControl.addClass('white');
    }
}
