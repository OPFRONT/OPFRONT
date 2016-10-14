const EN_PATH_NAME = 'en.html';

const isProdEnv = !(location.hostname == 'localhost' || location.hostname == '127.0.0.1');
const alreadyOnEnglishVersion = location.pathname.indexOf(EN_PATH_NAME) !== -1;

if (isProdEnv && !alreadyOnEnglishVersion) {
    const userLang = navigator.language || navigator.browserLanguage;
    if (userLang != 'fr')location.replace(`${location.origin}/${EN_PATH_NAME}`);
}
