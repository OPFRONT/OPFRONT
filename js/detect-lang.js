const lang = navigator.language || navigator.browserLanguage;

if (lang != 'fr') window.location.replace(window.location.origin + '/en');
