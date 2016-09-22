$('.open-menu-btn').click(() => {
    $('nav .menu').addClass('opened');
});

$('.close-menu-btn').click(() => {
    $('nav .menu').removeClass('opened');
});


$('nav .lang .en').click(() => {
    $('nav .lang').removeClass('fr');
    $('nav .lang').addClass('en');
});

$('nav .lang .fr').click(() => {
    $('nav .lang').removeClass('en');
    $('nav .lang').addClass('fr');
});