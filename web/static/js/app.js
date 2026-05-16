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

function loadDashboardData() {
    fetch('/api/stats')
        .then(response => response.json())
        .then(data => {
            // Căutăm paragrafele din interiorul cardurilor și le punem textul din Go
            const cards = document.querySelectorAll('.card p');
            if(cards.length >= 3) {
                cards[0].textContent = data.modul1;
                cards[1].textContent = data.modul2;
                cards[2].textContent = data.modul3;
            }
        })
        .catch(err => console.error("Eroare la încărcarea datelor din Go:", err));
}

// Rulăm funcția automat când se încarcă pagina
document.addEventListener('DOMContentLoaded', loadDashboardData);

function handleLogin() {
    const userVal = document.getElementById('username').value.trim();
    
    if (!userVal) {
        alert("Te rugăm să introduci codul sau numele de utilizator.");
        return;
    }

    // Ascundem ecranul de login
    document.getElementById('login-screen').classList.remove('active');

    // Regula de rutare simplă bazată pe prefix
    if (userVal.startsWith('manager')) {
        // Activăm ecranul de manager
        document.getElementById('manager-screen').classList.add('active');
        document.getElementById('mgr-name').textContent = userVal;
    } else {
        // Implicit, orice altceva (ex: operator_gg) primește interfața de teren
        document.getElementById('operator-screen').classList.add('active');
        document.getElementById('op-name').textContent = userVal;
    }
}

function logout() {
    // Resetăm ecranele înapoi la login
    document.getElementById('operator-screen').classList.remove('active');
    document.getElementById('manager-screen').classList.remove('active');
    document.getElementById('login-screen').classList.add('active');
    document.getElementById('username').value = '';
}