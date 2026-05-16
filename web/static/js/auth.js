// ============================================================================
// LOGICA DE AUTENTIFICARE ȘI RUTARE UTILIZATORI
// ============================================================================

function routeUser(username) {
    // Ascundem toate ecranele mai întâi
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('operator-screen').classList.remove('active');
    document.getElementById('manager-screen').classList.remove('active');

    // Decidem ce ecran activăm în funcție de prefixul numelui
    if (username.toLowerCase().startsWith('manager')) {
        document.getElementById('manager-screen').classList.add('active');
        document.getElementById('mgr-name').textContent = username;
    } else {
        document.getElementById('operator-screen').classList.add('active');
        document.getElementById('op-name').textContent = username;
    }
}

function handleLogin() {
    const userVal = document.getElementById('username').value.trim();
    
    if (!userVal) {
        alert("Te rugăm să introduci codul sau numele de utilizator.");
        return;
    }

    // Salvăm sesiunea local
    localStorage.setItem('gtm_user', userVal);
    routeUser(userVal);
}

function logout() {
    localStorage.removeItem('gtm_user');
    
    document.getElementById('operator-screen').classList.remove('active');
    document.getElementById('manager-screen').classList.remove('active');
    document.getElementById('login-screen').classList.add('active');
    document.getElementById('username').value = '';
}