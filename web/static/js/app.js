// ============================================================================
// SERVICE WORKER (Înregistrare PWA pentru funcționare Offline)
// ============================================================================

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('SW: Înregistrat cu succes! Scope:', reg.scope))
        .catch(err => console.error('SW: Eroare la înregistrare:', err));
}

// ============================================================================
// INIȚIALIZARE APLICAȚIE (La încărcarea completă a paginii)
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Aplicăm setările de accesibilitate salvate (Teme/Fonturi)
    if (localStorage.getItem('theme')) document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
    if (localStorage.getItem('a11y')) document.documentElement.setAttribute('data-a11y', localStorage.getItem('a11y'));
    if (localStorage.getItem('font-size')) document.documentElement.setAttribute('data-size', localStorage.getItem('font-size'));

    // 2. Aplicăm limba salvată (implicit română 'ro')
    const savedLang = localStorage.getItem('gtm_lang') || 'ro';
    applyLanguage(savedLang); // Funcție definită în a11y.js

    // 3. Verificăm dacă există o sesiune activă (utilizator deja logat)
    const savedUser = localStorage.getItem('gtm_user');
    if (savedUser) {
        console.log("Sesiune găsită pentru:", savedUser);
        routeUser(savedUser); // Funcție definită în auth.js
    }
});