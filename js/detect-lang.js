const PATH_NAMES = {
    en: 'en.html',
    fr: ''
};
const FR_LANG = 'fr';
const EN_LANG = 'en';
const LANG_COOKIE = 'of-lang';

// Need to consider locationPath when in dev mode. In prod it will evaluate to empty string.
const locationPath = location.pathname.substring(0, location.pathname.lastIndexOf('/'));
const originUrl = `${location.origin}${locationPath}`;

const _redirectIfNecessary = (lang) => {
    const currentLang = location.pathname.indexOf(PATH_NAMES[EN_LANG]) !== -1 ? EN_LANG : FR_LANG;

    if(lang !== currentLang) {
        location.replace(`${originUrl}/${PATH_NAMES[lang]}`)
    }
};

const langCookie = Cookies.get(LANG_COOKIE);

if(langCookie) {
    _redirectIfNecessary(langCookie);
} else {
    let userLang = navigator.language || navigator.browserLanguage;
    if(userLang.indexOf(EN_LANG) !== -1) {
        userLang = EN_LANG;
    }
    _redirectIfNecessary(userLang);
}
