// ============================================================================
// 5. INIȚIALIZARE GENERALĂ ȘI SERVICE WORKER
// ============================================================================
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}

document.addEventListener('DOMContentLoaded', () => {
    // Încărcăm preferințele salvate
    if (localStorage.getItem('theme')) document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
    if (localStorage.getItem('a11y')) document.documentElement.setAttribute('data-a11y', localStorage.getItem('a11y'));
    if (localStorage.getItem('font-size')) document.documentElement.setAttribute('data-size', localStorage.getItem('font-size'));

    // Activăm limba (funcție din a11y.js)
    const savedLang = localStorage.getItem('gtm_lang') || 'ro';
    applyLanguage(savedLang);

    // Verificăm sesiunea (funcție din auth.js)
    const savedUser = localStorage.getItem('gtm_user');
    if (savedUser) {
        routeUser(savedUser);
    }
});