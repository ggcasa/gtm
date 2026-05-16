// ============================================================================
// 5. INIȚIALIZARE GENERALĂ ȘI SERVICE WORKER
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificăm imediat dacă omul este deja logat (persistență)
    if (typeof checkExistingSession === 'function') {
        checkExistingSession();
    }
    
    // 2. Înregistrarea Service Worker-ului tău (codul existent)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW Înregistrat cu succes!'))
            .catch(err => console.error('Eroare SW:', err));
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Încărcăm preferințele salvate
    if (localStorage.getItem('theme')) document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
    if (localStorage.getItem('a11y')) document.documentElement.setAttribute('data-a11y', localStorage.getItem('a11y'));
    if (localStorage.getItem('font-size')) document.documentElement.setAttribute('data-size', localStorage.getItem('font-size'));

    // Activăm limba (funcție din a11y.js)
    const savedLang = localStorage.getItem('gtm_lang') || 'ro';
    applyLanguage(savedLang);

    // Verificăm sesiunea (funcție din auth.js)
    const savedUser = localStorage.getItem('gtm_user');
    if (savedUser) {
        routeUser(savedUser);
    }
});


function loadOperatorTasks(username) {
    console.log(`[GTM] Se inițiază încărcarea task-urilor pentru utilizatorul: ${username}`);
    
    const cardContainer = document.querySelector('.task-card');
    if (!cardContainer) {
        console.error("[GTM EROARE CRITICĂ] Nu am găsit elementul '.task-card' în HTML! Verifică index.html.");
    }

    // Interogăm serverul Go
    fetch(`/api/stats?user=${username}`)
        .then(response => {
            console.log(`[GTM Rețea] Serverul Go a răspuns cu statusul HTTP: ${response.status}`);
            if (!response.ok) throw new Error('Răspuns server invalid');
            return response.json();
        })
        .then(tasks => {
            console.log("[GTM Date Raw] Iată exact ce matrice de task-uri a trimis Go în acest moment:");
            console.table(tasks); // Îți desenează un tabel curat în consola browserului cu ID, Status, Locație!

            if (cardContainer) cardContainer.innerHTML = '';

            // Filtrul: luăm tot ce nu este Finalizat
            const activeTasks = tasks.filter(task => task.status !== 'Finalizat');
            console.log(`[GTM Filtru] Task-uri active rămase după filtrare: ${activeTasks.length}`);

            if (activeTasks.length === 0) {
                console.log("[GTM Interfață] Zero task-uri active. Randerz mesajul de gol.");
                if (cardContainer) {
                    cardContainer.innerHTML = `<div class="no-tasks"><b>Nu ai task-uri active.</b></div>`;
                }
                return;
            }

            let htmlConstruct = '';
            activeTasks.forEach(task => {
                console.log(`[GTM Randare] Generez cardul pentru Task ID: ${task.id}, Status: ${task.status}`);
                
                const statusColor = task.status === 'În lucru' ? '#d9383a' : '#0056b3';
                htmlConstruct += `
                    <div class="individual-task-box" style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 8px; padding: 15px; margin-bottom: 15px; text-align: left;">
                        <div class="task-info">
                            <h3 style="margin-bottom: 10px; color: ${statusColor};">⚠️ Task #${task.id} (${task.status})</h3>
                            <p style="margin-bottom: 5px;"><strong>Locație:</strong> ${task.location}</p>
                            <p style="margin-bottom: 15px;"><strong>Acțiune:</strong> ${task.action}</p>
                        </div>
                        <button 
                            class="btn-action" 
                            style="width: 100%; padding: 12px; font-weight: bold; cursor: pointer;"
                            onclick="handleTaskCompletion('${task.id}', '${username}', this)">
                            MARCHEAZĂ CA FINALIZAT
                        </button>
                    </div>
                `;
            });

            if (cardContainer) {
                cardContainer.innerHTML = htmlConstruct;
                console.log("[GTM Interfață] HTML-ul a fost injectat cu succes în DOM!");
            }
        })
        .catch(err => {
            console.error('[GTM EROARE FETCH]', err);
            if (cardContainer) {
                cardContainer.innerHTML = `<p style="color: red;">Eroare la conectare: ${err.message}</p>`;
            }
        });
}