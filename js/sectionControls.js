const sectionControls = $('.navigation-control');

sectionControls.click((e) => {
    const sectionId = $(e.currentTarget).attr('href');
    const sectionOffset = $(sectionId).offset().top;

    $('html, body').stop().animate({
        scrollTop: sectionOffset
    }, 300);

    e.preventDefault();
});