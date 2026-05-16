// ============================================================================
// 1. TRADUCERI ȘI MODUL MULTILANGUAGE
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
        panel_field: "Panou Teren:",
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

function applyLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    localStorage.setItem('gtm_lang', lang);
}

function changeLanguage(lang) {
    applyLanguage(lang);
}

// ============================================================================
// 2. TEME ȘI CONTRAST (⚙️)
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

function toggleA11yMenu() {
    document.getElementById('a11y-menu-content').classList.toggle('show');
}

window.addEventListener('click', (event) => {
    if (!event.target.matches('.a11y-trigger-btn')) {
        const dropdown = document.getElementById('a11y-menu-content');
        if (dropdown && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    }
});