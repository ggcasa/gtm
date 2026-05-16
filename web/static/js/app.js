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

function toggleA11yMenu() {
    document.getElementById('a11y-menu-content').classList.toggle('show');
}

// Închidem meniul dacă utilizatorul dă click în afara lui
window.addEventListener('click', (event) => {
    if (!event.target.matches('.a11y-trigger-btn')) {
        const dropdown = document.getElementById('a11y-menu-content');
        if (dropdown && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    }
});

// ============================================================================
// 5. SUPORT MULTILANGUAGE (i18n)
// ============================================================================

const translations = {
    ro: {
        login_title: "Autentificare GTM",
        login_label: "Utilizator / Cod Pontaj:",
        login_btn: "Intră în cont",
        task_alert: "⚠️ Task Nou de la Birou",
        location: "Locație:",
        action: "Acțiune:",
        btn_finish: "MARCHEAZĂ CA FINALIZAT",
        logout: "Ieșire",
        panel_field: "Panau Teren:",
        panel_manager: "Consolă Management:",
        menu_tasks: "📊 Alocare Taskuri",
        menu_fleet: "🚚 Monitorizare Flotă",
        menu_clock: "⏱️ Pontaj Operatori"
    },
    en: {
        login_title: "GTM Authentication",
        login_label: "User / Clock-in Code:",
        login_btn: "Sign In",
        task_alert: "⚠️ New Task from Office",
        location: "Location:",
        action: "Action:",
        btn_finish: "MARK AS COMPLETED",
        logout: "Logout",
        panel_field: "Field Panel:",
        panel_manager: "Management Console:",
        menu_tasks: "📊 Task Allocation",
        menu_fleet: "🚚 Fleet Monitoring",
        menu_clock: "⏱️ Operator Clock-in"
    }
};

// Funcția care aplică traducerile pe elementele cu atributul data-i18n
function applyLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    localStorage.setItem('gtm_lang', lang);
}

// Funcția apelată din meniul ⚙️
function changeLanguage(lang) {
    applyLanguage(lang);
}

// Verificăm dacă există o limbă salvată, altfel punem implicit Română ('ro')
    const savedLang = localStorage.getItem('gtm_lang') || 'ro';
    applyLanguage(savedLang);