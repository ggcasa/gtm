// ============================================================================
// 3. LOGICA DE LOGIN ȘI RUTARE ECRANE
// ============================================================================
function routeUser(username) {
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('operator-screen').classList.remove('active');
    document.getElementById('manager-screen').classList.remove('active');

    if (username.toLowerCase().startsWith('manager')) {
        document.getElementById('manager-screen').classList.add('active');
        document.getElementById('mgr-name').textContent = username;
    } else {
        document.getElementById('operator-screen').classList.add('active');
        document.getElementById('op-name').textContent = username;
        loadOperatorTasks(username); // Încărcăm task-urile din Go RAM
    }
}

function handleLogin() {
    const userVal = document.getElementById('username').value.trim();
    if (!userVal) {
        alert("Te rugăm să introduci codul sau numele de utilizator.");
        return;
    }
    localStorage.setItem('gtm_user', userVal);
    routeUser(userVal);
}

// Verifică automat dacă utilizatorul are deja o sesiune activă pe acest dispozitiv
function checkExistingSession() {
	const savedUser = localStorage.getItem('username');
	const savedRole = localStorage.getItem('role');

	if (savedUser && savedRole) {
		// Dacă avem sesiune, sărim direct peste ecranul de login
		showScreenByRole(savedRole, savedUser);
	}
}

// Modificăm funcția de logout să șteargă TOT corect din memorie
function logout() {
	localStorage.removeItem('username');
	localStorage.removeItem('role');
	
	// Ascundem ecranele și readucem login-ul în prim-plan
	document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
	document.getElementById('login-screen').classList.add('active');
	document.getElementById('username').value = '';
}



// ============================================================================
// 4. LOGICA DE BUSINESS (API Task-uri din Go RAM)
// ============================================================================
function loadOperatorTasks(username) {
    fetch(`/api/stats?user=${username}`)
        .then(response => response.json())
        .then(tasks => {
            const taskCard = document.querySelector('.task-card');
            if (!taskCard) return;

            const activeTasks = tasks.filter(t => t.status === "În lucru");

            if (activeTasks.length > 0) {
                const currentTask = activeTasks[0];
                const lang = localStorage.getItem('gtm_lang') || 'ro';
                
                taskCard.innerHTML = `
                    <h3>${translations[lang].task_alert}</h3>
                    <p><strong>${translations[lang].location}</strong> ${currentTask.location}</p>
                    <p><strong>${translations[lang].action}</strong> ${currentTask.action}</p>
                    <button class="btn-action" style="background-color: #28a745; margin-top: 15px;" 
                            onclick="completeCurrentTask('${currentTask.id}', '${username}')">
                        ${translations[lang].btn_finish}
                    </button>
                `;
            } else {
                taskCard.innerHTML = `<h3>✅ Nu ai task-uri active în acest moment.</h3>`;
            }
        })
        .catch(err => console.error("Eroare la citirea task-urilor:", err));
}

function completeCurrentTask(taskID, username) {
    fetch(`/api/complete?user=${username}&id=${taskID}`, { method: 'POST' })
        .then(response => response.json())
        .then(res => {
            if (res.status === 'success') {
                alert("Task finalizat cu succes în memoria serverului Go!");
                loadOperatorTasks(username); 
            }
        })
        .catch(err => console.error("Eroare la finalizare:", err));
}

function handleLogin() {
    const usernameInput = document.getElementById('username').value.trim();
    if (!usernameInput) return alert('Introduceți utilizatorul!');

    // Întrebăm backend-ul securizat din Go cine este acest utilizator
    fetch(`/api/login?user=${usernameInput}`, { method: 'POST' })
        .then(response => {
            if (!response.ok) throw new Error('Utilizator sau cod incorect');
            return response.json();
        })
        .then(user => {
            // Salvăm sesiunea oficială primită de la server
            localStorage.setItem('username', user.username);
            localStorage.setItem('role', user.role);

            // Redirecționăm dinamic în funcție de rolul trimis de Go
            showScreenByRole(user.role, user.username);
        })
        .catch(err => alert(err.message));
}

// Funcție centralizată de rutare pe ecrane în același frontend
function showScreenByRole(role, username) {
    // Ascundem toate ecranele primare
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

    if (role === 'operator') {
        document.getElementById('op-name').textContent = username;
        document.getElementById('operator-screen').classList.add('active');
        loadOperatorTasks(username); // Încarcă task-urile din RAM Go
    } else if (role === 'manager') {
        document.getElementById('mgr-name').textContent = username;
        document.getElementById('manager-screen').classList.add('active');
        // Aici se poate apela ulterior loadManagerDashboard()
    }
}

