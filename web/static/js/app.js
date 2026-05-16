if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker înregistrat cu succes! Scope:', reg.scope))
            .catch(err => console.log('Înregistrarea Service Worker a eșuat:', err));
    });
}