if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker înregistrat cu succes! Scope:', reg.scope))
            .catch(err => console.log('Înregistrarea Service Worker a eșuat:', err));
    });
}


// 1. Schimbare Light / Dark Mode
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// 2. Schimbare Contrast Ridicat (High Contrast)
function toggleContrast() {
    const currentA11y = document.documentElement.getAttribute('data-a11y');
    const newA11y = currentA11y === 'high-contrast' ? 'normal' : 'high-contrast';
    document.documentElement.setAttribute('data-a11y', newA11y);
    localStorage.setItem('a11y', newA11y);
}

// 3. Schimbare Dimensiune Font
function toggleFontSize() {
    const currentSize = document.documentElement.getAttribute('data-size');
    const newSize = currentSize === 'large' ? 'normal' : 'large';
    document.documentElement.setAttribute('data-size', newSize);
    localStorage.setItem('font-size', newSize);
}

// Încărcăm preferințele salvate la pornirea paginii
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme')) document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
    if (localStorage.getItem('a11y')) document.documentElement.setAttribute('data-a11y', localStorage.getItem('a11y'));
    if (localStorage.getItem('font-size')) document.documentElement.setAttribute('data-size', localStorage.getItem('font-size'));
});