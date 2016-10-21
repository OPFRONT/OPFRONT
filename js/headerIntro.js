const timeout = location.hostname === "localhost" || location.hostname === "127.0.0.1" ? 0 : 2000;

window.setTimeout(() => {
    $('#page-loader').addClass('fadeOut');
}, timeout);

const BG_IMAGE_IDS = [
    '1471015060382-6cbd8b4e34d0',
    '1450027179084-b3ff1fce4bb5',
    '1471565661762-b9dfae862dbe',
    '1442810480970-6d3fc310e3eb'
];

const setRandomBackgroundImage = () => {
    const randomImageId = BG_IMAGE_IDS[Math.floor(Math.random() * BG_IMAGE_IDS.length)];
    const randomImageCSSString = `background-image: url(https://images.unsplash.com/photo-${randomImageId}?dpr=2&auto=format&crop=entropy&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb)`;

    document.getElementById('header').setAttribute('style', randomImageCSSString);
};

setRandomBackgroundImage();
