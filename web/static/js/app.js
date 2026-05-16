// ============================================================================
// 5. INIȚIALIZARE GENERALĂ ȘI ORCHESTRARE FLUX
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Încărcăm preferințele vizuale salvate
    if (localStorage.getItem('theme')) document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
    if (localStorage.getItem('a11y')) document.documentElement.setAttribute('data-a11y', localStorage.getItem('a11y'));
    if (localStorage.getItem('font-size')) document.documentElement.setAttribute('data-size', localStorage.getItem('font-size'));

    // Activăm limba locală
    const savedLang = localStorage.getItem('gtm_lang') || 'ro';
    if (typeof applyLanguage === 'function') applyLanguage(savedLang);

    // Verificăm sesiunea activă
    if (typeof checkExistingSession === 'function') {
        checkExistingSession();
    }
    
    // Înregistrarea Service Worker pentru modul offline
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW Înregistrat cu succes!'))
            .catch(err => console.error('Eroare SW:', err));
    }
});

function loadOperatorTasks(username) {
    const cardContainer = document.querySelector('.task-card');
    if (!cardContainer) return;

    fetch(`/api/stats?user=${username}`)
        .then(response => {
            if (!response.ok) throw new Error('Răspuns server invalid');
            return response.json();
        })
        .then(tasks => {
            cardContainer.innerHTML = '';

            // Filtrăm task-urile care nu sunt închise
            const activeTasks = tasks.filter(task => task.status !== 'Finalizat');

            if (activeTasks.length === 0) {
                cardContainer.innerHTML = GTM_Render.noTasks();
                return;
            }

            // Mapăm curat elementele folosind fișierul renderer
            cardContainer.innerHTML = activeTasks
                .map(task => GTM_Render.taskCard(task, username))
                .join('');
        })
        .catch(err => {
            console.error('[GTM FETCH ERROR]', err);
            cardContainer.innerHTML = `<p style="color: red;">Eroare la conectare.</p>`;
        });
}