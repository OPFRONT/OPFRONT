const EN_PATH_NAME = 'en.html';
const FORCE_LANG_QUERY_PARAM = 'fl';
const FR_LANG = 'fr';

const isProdEnv = !(location.hostname == 'localhost' || location.hostname == '127.0.0.1');
const alreadyOnEnglishVersion = location.pathname.indexOf(EN_PATH_NAME) !== -1;
const isLangForced = location.search.indexOf(FORCE_LANG_QUERY_PARAM) !== -1;

if (isProdEnv && !alreadyOnEnglishVersion && !isLangForced) {
    const userLang = navigator.language || navigator.browserLanguage;
    if (userLang != FR_LANG)location.replace(`${location.origin}/${EN_PATH_NAME}`);
}
