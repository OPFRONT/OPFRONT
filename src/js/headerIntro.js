const BG_IMAGE_FILENAMES = [
    'OP_Image01',
    'OP_Image02',
    'OP_Image03',
    'OP_Image04'
];

const TABLET_MAX_WIDTH = 1024;
const isMobile = window.innerWidth <= TABLET_MAX_WIDTH;

const setRandomBackgroundImage = () => {
    const header = document.getElementById('header');
    if(header) {
        const randomImage = BG_IMAGE_FILENAMES[Math.floor(Math.random() * BG_IMAGE_FILENAMES.length)];
        const randomImageCSSString = `background-image: url(${location.origin}/img/${randomImage}${isMobile ? "small" : ""}.jpg)`;

        header.setAttribute('style', randomImageCSSString);
    }
};

setRandomBackgroundImage();
