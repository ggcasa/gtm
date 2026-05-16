// ============================================================================
// 3. LOGICA DE LOGIN ȘI AUTENTIFICARE (RBAC)
// ============================================================================

function handleLogin() {
    const usernameInput = document.getElementById('username').value.trim();
    if (!usernameInput) return alert('Introduceți utilizatorul!');

    // Interogăm backend-ul în Go pentru a stabili rolul
    fetch(`/api/login?user=${usernameInput}`, { method: 'POST' })
        .then(response => {
            if (!response.ok) throw new Error('Utilizator sau cod incorect');
            return response.json();
        })
        .then(user => {
            // Unificăm cheile din localStorage cu cele folosite în app.js
            localStorage.setItem('gtm_user', user.username);
            localStorage.setItem('gtm_role', user.role);

            // Redirecționăm către ecranul corespunzător
            routeUser(user.username, user.role);
        })
        .catch(err => alert(err.message));
}

function routeUser(username, role) {
    // Ascundem toate ecranele primare
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('operator-screen').classList.remove('active');
    document.getElementById('manager-screen').classList.remove('active');

    if (role === 'manager' || username.toLowerCase().startsWith('manager')) {
        document.getElementById('manager-screen').classList.add('active');
        document.getElementById('mgr-name').textContent = username;
    } else {
        document.getElementById('operator-screen').classList.add('active');
        document.getElementById('op-name').textContent = username;
        
        // Apelăm funcția unică din app.js pentru a lista TOATE task-urile
        if (typeof loadOperatorTasks === 'function') {
            loadOperatorTasks(username);
        }
    }
}

function checkExistingSession() {
    const savedUser = localStorage.getItem('gtm_user');
    const savedRole = localStorage.getItem('gtm_role');

    if (savedUser && savedRole) {
        routeUser(savedUser, savedRole);
    }
}

function logout() {
    localStorage.removeItem('gtm_user');
    localStorage.removeItem('gtm_role');
    
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('login-screen').classList.add('active');
    document.getElementById('username').value = '';
}