const timeout = location.hostname === "localhost" || location.hostname === "127.0.0.1" ? 0 : 2000;

window.setTimeout(() => {
    $('#page-loader').addClass('hidden');
}, timeout);
