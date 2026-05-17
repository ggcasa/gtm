// ============================================================================
// 1. TRADUCERI ȘI MODUL MULTILANGUAGE (GLOBAL DEMO)
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
    },
    pt: {
        login_title: "Autentificação GTM",
        login_label: "Usuário / Código de Ponto:",
        login_btn: "Entrar",
        task_alert: "⚠️ Nova Tarefa do Escritório",
        location: "Localização:",
        action: "Ação:",
        btn_finish: "MARCAR COMO CONCLUÍDA",
        logout: "Sair",
        panel_field: "Painel de Campo:",
        panel_manager: "Console de Gerenciamento:",
        menu_tasks: "📊 Alocação de Tarefas",
        menu_fleet: "🚚 Monitoramento de Frota",
        menu_clock: "⏱️ Registro de Ponto"
    },
    es: {
        login_title: "Autenticación GTM",
        login_label: "Usuario / Código de Fichaje:",
        login_btn: "Entrar",
        task_alert: "⚠️ Nueva Tarea de Oficina",
        location: "Ubicación:",
        action: "Acción:",
        btn_finish: "MARCAR COMO COMPLETADO",
        logout: "Salir",
        panel_field: "Panel de Campo:",
        panel_manager: "Consola de Gestión:",
        menu_tasks: "📊 Asignación de Tareas",
        menu_fleet: "🚚 Monitoreo de Flota",
        menu_clock: "⏱️ Fichaje de Operarios"
    },
    fr: {
        login_title: "Authentification GTM",
        login_label: "Utilisateur / Code Pointage:",
        login_btn: "Se Connecter",
        task_alert: "⚠️ Nouvelle Tâche du Bureau",
        location: "Emplacement:",
        action: "Action:",
        btn_finish: "MARQUER COMME TERMINÉ",
        logout: "Déconnexion",
        panel_field: "Panneau de Terrain:",
        panel_manager: "Console de Gestion:",
        menu_tasks: "📊 Allocation des Tâches",
        menu_fleet: "🚚 Suivi de la Flotte",
        menu_clock: "⏱️ Pointage des Opérateurs"
    },
    de: {
        login_title: "GTM Authentifizierung",
        login_label: "Benutzer / Zeiterfassungscode:",
        login_btn: "Einloggen",
        task_alert: "⚠️ Neue Aufgabe vom Büro",
        location: "Standort:",
        action: "Aktion:",
        btn_finish: "ALS ERLEDIGT MARKIEREN",
        logout: "Abmelden",
        panel_field: "Feldpanel:",
        panel_manager: "Management-Konsole:",
        menu_tasks: "📊 Aufgabenverteilung",
        menu_fleet: "🚚 Flottenüberwachung",
        menu_clock: "⏱️ Zeiterfassung Operator"
    },
    ua: {
        login_title: "Автентифікація GTM",
        login_label: "Користувач / Код табелю:",
        login_btn: "Увійти",
        task_alert: "⚠️ Нове завдання з офісу",
        location: "Локація:",
        action: "Дія:",
        btn_finish: "ПОЗНАЧИТИ ЯК ВИКОНАНЕ",
        logout: "Вихід",
        panel_field: "Панель поля:",
        panel_manager: "Консоль управління:",
        menu_tasks: "📊 Розподіл завдань",
        menu_fleet: "🚚 Моніторинг автопарку",
        menu_clock: "⏱️ Табелювання операторів"
    },
    pl: {
        login_title: "Uwierzytelnianie GTM",
        login_label: "Użytkownik / Kod rejestracji:",
        login_btn: "Zaloguj się",
        task_alert: "⚠️ Nowe zadanie z biura",
        location: "Lokalizacja:",
        action: "Akcja:",
        btn_finish: "OZNACZ JAKO ZAKOŃCZONE",
        logout: "Wyloguj się",
        panel_field: "Panel terenowy:",
        panel_manager: "Konsola zarządzania:",
        menu_tasks: "📊 Przydział zadań",
        menu_fleet: "🚚 Monitorowanie floty",
        menu_clock: "⏱️ Rejestracja czasu pracy"
    },
    ar: {
        login_title: "GTM مصادقة",
        login_label: "المستخدم / رمز تسجيل الحضور:",
        login_btn: "تسجيل الدخول",
        task_alert: "⚠️ مهمة جديدة من المكتب",
        location: "الموقع:",
        action: "الإجراء:",
        btn_finish: "تحديد كمكتمل",
        logout: "تسجيل الخروج",
        panel_field: "اللوحة الميدانية:",
        panel_manager: "لوحة التحكم الإدارية:",
        menu_tasks: "📊 تخصيص المهام",
        menu_fleet: "🚚 مراقبة الأسطول",
        menu_clock: "⏱️ تسجيل حضور العمال"
    },
    zh: {
        login_title: "GTM 身份验证",
        login_label: "用户 / 打卡代码:",
        login_btn: "登录",
        task_alert: "⚠️ 来自办公室的新任务",
        location: "位置:",
        action: "操作:",
        btn_finish: "标记为已完成",
        logout: "退出登录",
        panel_field: "现场面板:",
        panel_manager: "管理控制台:",
        menu_tasks: "📊 任务分配",
        menu_fleet: "🚚 车队监控",
        menu_clock: "⏱️ 操作员打卡"
    },
    pa: {
        login_title: "GTM ਪ੍ਰਮਾਣੀਕਰਨ",
        login_label: "ਉਪਭੋਗਤਾ / ਕਲਾਕ-ਇਨ ਕੋਡ:",
        login_btn: "ਸਾਈਨ ਇਨ ਕਰੋ",
        task_alert: "⚠️ ਦਫ਼ਤਰ ਤੋਂ ਨਵਾਂ ਕੰਮ",
        location: "ਟਿਕาਣਾ:",
        action: "ਕਾਰਵਾਈ:",
        btn_finish: "ਮੁਕੰਮਲ ਵਜੋਂ ਚਿੰਨ੍ਹਿਤ ਕਰੋ",
        logout: "ਸਾਈਨ ਆਊਟ",
        panel_field: "ਫੀਲਡ ਪੈਨਲ:",
        panel_manager: "ਪ੍ਰਬੰਧਨ ਕੰਸੋล:",
        menu_tasks: "📊 ਟਾਸਕ ਵੰਡ",
        menu_fleet: "🚚 ਫਲੀਟ ਨਿਗਰਾਨੀ",
        menu_clock: "⏱️ ਓਪਰੇਟਰ ਕਲਾਕ-ਇਨ"
    }
};

function applyLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Forțăm direcția paginii (RTL pentru arabă, LTR pentru restul)
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    localStorage.setItem('gtm_lang', lang);
}

function changeLanguage(lang) {
    applyLanguage(lang);
    
    // Dacă managerul este logat, reîmprospătăm dashboard-ul ca să își ia noile etichete din formular
    if (typeof GTM_Manager !== 'undefined' && document.getElementById('manager-screen').classList.contains('active')) {
        GTM_Manager.loadDashboard();
    }
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

// Scurtăm logica pentru contrast
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