// ==========================================
// GTM - Operator Field Tools & Safety Actions
// ==========================================

let asteaptaConfirmare = false;
let timerConfirmare = null;

/**
 * Gestionează confirmarea dublă a unui task pentru a preveni atingerile accidentale pe teren.
 */
function handleTaskCompletion(taskId, username, buttonElement) {
    const currentLang = localStorage.getItem('lang') || 'ro';

    if (!asteaptaConfirmare) {
        // --- ETAPA 1: Cerere confirmare vizuală ---
        asteaptaConfirmare = true;
        
        buttonElement.textContent = currentLang === 'en' ? 'SURE? PRESS AGAIN' : 'SIGUR? APASĂ DIN NOU';
        buttonElement.style.backgroundColor = "#e0a800"; 
        buttonElement.style.borderColor = "#d39e00";

        // Dacă operatorul nu apasă din nou în 3 secunde, resetăm butonul
        timerConfirmare = setTimeout(() => {
            asteaptaConfirmare = false;
            buttonElement.textContent = currentLang === 'en' ? 'MARK AS COMPLETED' : 'MARCHEAZĂ CA FINALIZAT';
            buttonElement.style.backgroundColor = ""; 
            buttonElement.style.borderColor = "";
        }, 3000);

        return; 
    }

    // --- ETAPA 2: Acțiunea confirmată, trimitere către Go ---
    clearTimeout(timerConfirmare);
    asteaptaConfirmare = false;

    buttonElement.textContent = currentLang === 'en' ? 'PROCESSING...' : 'SE PROCESEAZĂ...';
    buttonElement.style.backgroundColor = "#6c757d";
    buttonElement.disabled = true;

    fetch(`/api/complete?user=${username}&id=${taskId}`, { method: 'POST' })
        .then(response => {
            if (!response.ok) throw new Error('Eroare la finalizarea task-ului');
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                // Apelăm funcția globală din app.js care reîmprospătează interfața
                if (typeof loadOperatorTasks === 'function') {
                    loadOperatorTasks(username);
                }
            }
        })
        .catch(err => {
            alert(err.message);
            buttonElement.disabled = false;
            buttonElement.textContent = currentLang === 'en' ? 'MARK AS COMPLETED' : 'MARCHEAZĂ CA FINALIZAT';
            buttonElement.style.backgroundColor = "";
        });
}