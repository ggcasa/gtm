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

function logout() {
    localStorage.removeItem('gtm_user');
    document.getElementById('operator-screen').classList.remove('active');
    document.getElementById('manager-screen').classList.remove('active');
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