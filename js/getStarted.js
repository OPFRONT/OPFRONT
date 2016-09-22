$('#thanks .back-btn .btn').click((e) => {
    $('#thanks').removeClass('active');
    $('.btn.get-started').attr('disabled', false);
    $('#complete-solution, #choose-solution, #subscribe, #webstore, #thanks, #get-started, .btn.get-started').removeClass('active');
});

$('.btn.get-started').click((e) => {
    if($('.btn.get-started.active').length == 0) {
        $('#get-started, .btn.get-started').addClass('active');
    } else {
        if($('#complete-solution.active, #choose-solution.active, #subscribe.active, #webstore.active, #thanks.active').length > 0) {
            $('#complete-solution, #choose-solution, #subscribe, #webstore, #thanks').removeClass('active');
            $('.btn.get-started').attr('disabled', false);
            window.setTimeout(() => {
                $('#get-started, .btn.get-started').removeClass('active');
            }, 500);
        } else {
            $('#get-started, .btn.get-started').removeClass('active');
        }
    }
});

$('#get-started .navigation-control.previous').click((e) => {
    $('#get-started, .btn.get-started').removeClass('active');
});

$('#complete-solution').click((e) => {
    $('#choose-solution').addClass('active');
});

$('#choose-solution .navigation-control.previous').click((e) => {
    $('#choose-solution').removeClass('active');
});

$('#choose-solution .btn.choose').click((e) => {
    $('#subscribe').addClass('active');
});

$('#subscribe .navigation-control.previous').click((e) => {
    $('#subscribe').removeClass('active');
});

$('#store-solution').click((e) => {
    $('#webstore').addClass('active');
});

$('#webstore .navigation-control.previous').click((e) => {
    $('#store-solution').removeClass('active');
});