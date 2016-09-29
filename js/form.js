$('#subscribe-form').submit((e) => {
    $('#thanks').addClass('active');
    e.preventDefault();
});

$('#contact-us-form').submit((e) => {
    $('#contact .thanks').addClass('active');
    $('#contact .btn[type="submit"]').attr('disabled', true);
    e.preventDefault();
});

$('input, textarea').focusout((e) => {
    let input = $(e.target);
    if(input.val()) {
        input.addClass('filled');
    } else {
        input.removeClass('filled');
    }
});