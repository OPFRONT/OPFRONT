const timeout = location.hostname === "localhost" || location.hostname === "127.0.0.1" ? 0 : 2000;

window.setTimeout(() => {
    $('#page-loader').addClass('fadeOut');
}, timeout);

const BG_IMAGE_FILENAMES = [
    'OP_Image01',
    'OP_Image02',
    'OP_Image03',
    'OP_Image04'
];

const TABLET_MAX_WIDTH = 1024;
const isMobile = window.innerWidth <= TABLET_MAX_WIDTH;

const setRandomBackgroundImage = () => {
    const randomImage = BG_IMAGE_FILENAMES[Math.floor(Math.random() * BG_IMAGE_FILENAMES.length)];
    const randomImageCSSString = `background-image: url(${originUrl}/dist/img/${randomImage}${isMobile ? "small" : ""}.jpg)`;

    document.getElementById('header').setAttribute('style', randomImageCSSString);
};

setRandomBackgroundImage();
