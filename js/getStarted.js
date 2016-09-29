$('.btn.get-started').click((e) => {
    $('#get-started').addClass('active');
});

const closeGetStarted = (callback) => {
    let openedAsideSections = $('#thanks.active, #get-started.active, #choose-solution.active, #subscribe.active, #webstore.active');

    if(openedAsideSections.length > 0) {
        openedAsideSections.addClass('closing');
        openedAsideSections.removeClass('active');
        window.setTimeout(() => {
            $('#thanks, #get-started, #choose-solution, #subscribe, #webstore').removeClass('closing');
        }, 1800);

        if(callback) {
            window.setTimeout(() => {
                callback();
            }, 600);
        }
    } else {
        callback();
    }
};

$('#get-started .navigation-control.previous').click((e) => {
    $('#get-started, .btn.get-started').removeClass('active');
});

$('#complete-solution .choose .btn').click((e) => {
    $('#choose-solution').addClass('active');
});

$('#choose-solution .navigation-control.previous').click((e) => {
    $('#choose-solution').removeClass('active');
});

$('#choose-solution .choose .btn').click((e) => {
    $('#subscribe').addClass('active');
});

$('#subscribe .navigation-control.previous').click((e) => {
    $('#subscribe').removeClass('active');
});

$('#store-solution').click((e) => {
    $('#subscribe').addClass('active');
});

$('#webstore .navigation-control.previous').click((e) => {
    $('#webstore').removeClass('active');
});

$('#thanks .navigation-control.previous').click((e) => {
    closeGetStarted();
});
