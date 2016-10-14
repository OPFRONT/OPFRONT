const isDevEnV = !(location.hostname == 'localhost' || location.hostname == '127.0.0.1');

if (isDevEnV) {
    const lang = navigator.language || navigator.browserLanguage;
    if (lang != 'fr')location.replace(location.origin + '/en');
}
