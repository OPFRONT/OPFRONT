$('#contact-us-form, #subscribe-form, #subscribe-store-form').submit((e) => {
    $("#thanks").addClass('active');
    $('.btn.get-started').attr('disabled', true);
    if($('#complete-solution.active, #choose-solution.active, #subscribe.active, #webstore.active, #thanks.active').length > 0) {
        window.setTimeout(() => {
            $('#get-started, #complete-solution, #choose-solution, #subscribe, #webstore, .btn.get-started').removeClass('active');
        }, 500);
    }
    e.preventDefault();
});