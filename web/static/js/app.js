// ============================================================================
// 1. GESTIONARE TEME ȘI ACCESIBILITATE (Light/Dark, Contrast, Dimensiune Font)
// ============================================================================

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

function toggleContrast() {
    const currentA11y = document.documentElement.getAttribute('data-a11y');
    const newA11y = currentA11y === 'high-contrast' ? 'normal' : 'high-contrast';
    document.documentElement.setAttribute('data-a11y', newA11y);
    localStorage.setItem('a11y', newA11y);
}

function toggleFontSize() {
    const currentSize = document.documentElement.getAttribute('data-size');
    const newSize = currentSize === 'large' ? 'normal' : 'large';
    document.documentElement.setAttribute('data-size', newSize);
    localStorage.setItem('font-size', newSize);
}

// ============================================================================
// 2. LOGICA DE AUTENTIFICARE ȘI MANAGEMENTUL SESIUNII (Offline-Friendly)
// ============================================================================

// Funcție responsabilă cu ascunderea și afișarea ecranului potrivit
function routeUser(username) {
    // Ascundem absolut toate ecranele mai întâi
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('operator-screen').classList.remove('active');
    document.getElementById('manager-screen').classList.remove('active');

    // Decidem ce ecran activăm în funcție de numele utilizatorului
    if (username.toLowerCase().startsWith('manager')) {
        document.getElementById('manager-screen').classList.add('active');
        document.getElementById('mgr-name').textContent = username;
    } else {
        document.getElementById('operator-screen').classList.add('active');
        document.getElementById('op-name').textContent = username;
    }
}

// Funcție apelată când utilizatorul apasă pe "Intră în cont"
function handleLogin() {
    const userVal = document.getElementById('username').value.trim();
    
    if (!userVal) {
        alert("Te rugăm să introduci codul sau numele de utilizator.");
        return;
    }

    // Salvăm utilizatorul în memoria locală a browserului pentru a nu pierde sesiunea la refresh
    localStorage.setItem('gtm_user', userVal);

    // Trimitem utilizatorul către interfața lui
    routeUser(userVal);
}

// Funcție apelată la apăsarea butonului "Ieșire"
function logout() {
    // Ștergem utilizatorul din memoria locală
    localStorage.removeItem('gtm_user');
    
    // Resetăm ecranele și readucem utilizatorul la Login
    document.getElementById('operator-screen').classList.remove('active');
    document.getElementById('manager-screen').classList.remove('active');
    document.getElementById('login-screen').classList.add('active');
    document.getElementById('username').value = '';
}

// ============================================================================
// 3. SERVICE WORKER (Înregistrare de bază pentru PWA)
// ============================================================================

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('Service Worker înregistrat cu succes! Scope:', reg.scope))
        .catch(err => console.error('Eroare la înregistrarea Service Worker-ului:', err));
}

// ============================================================================
// 4. INIȚIALIZARE APLICAȚIE (Se execută automat când pagina s-a încărcat)
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Încărcăm preferințele de accesibilitate salvate anterior
    if (localStorage.getItem('theme')) document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
    if (localStorage.getItem('a11y')) document.documentElement.setAttribute('data-a11y', localStorage.getItem('a11y'));
    if (localStorage.getItem('font-size')) document.documentElement.setAttribute('data-size', localStorage.getItem('font-size'));

    // Verificăm dacă există deja o sesiune activă (utilizator logat)
    const savedUser = localStorage.getItem('gtm_user');
    if (savedUser) {
        console.log("Sesiune existentă găsită pentru:", savedUser);
        routeUser(savedUser); // Îl logăm direct fără să mai vadă ecranul de login
    }
});