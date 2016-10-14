const isProdEnv = !(location.hostname == 'localhost' || location.hostname == '127.0.0.1');

if (isProdEnv) {
    const lang = navigator.language || navigator.browserLanguage;
    if (lang != 'fr')location.replace(location.origin + '/en');
}
