const timeout = location.hostname === "localhost" || location.hostname === "127.0.0.1" ? 0 : 2000;

window.setTimeout(() => {
    $('#page-loader').addClass('fadeOut');
}, timeout);

const BG_IMAGE_FILENAMES = [
    'OP_Image01.jpg',
    'OP_Image02.jpg',
    'OP_Image03.jpg',
    'OP_Image04.jpg'
];

const setRandomBackgroundImage = () => {
    const randomImage = BG_IMAGE_FILENAMES[Math.floor(Math.random() * BG_IMAGE_FILENAMES.length)];
    const randomImageCSSString = `background-image: url(${originUrl}/dist/img/${randomImage})`;

    document.getElementById('header').setAttribute('style', randomImageCSSString);
};

setRandomBackgroundImage();
