// ============================================================================
// GTM - UI RENDER TEMPLATES (MULTILANGUAGE)
// ============================================================================
const GTM_Render = {
    taskCard: (task, username) => {
        const lang = localStorage.getItem('gtm_lang') || 'ro';
        const statusColor = task.status === 'În lucru' ? '#d9383a' : '#0056b3';
        
        // Extragem etichetele traduse din a11y.js
        const lblAlert = translations[lang]?.task_alert || "⚠️ Task Nou";
        const lblLoc = translations[lang]?.location || "Locație:";
        const lblAct = translations[lang]?.action || "Acțiune:";
        const lblBtn = translations[lang]?.btn_finish || "MARCHEAZĂ CA FINALIZAT";

        return `
            <div class="individual-task-box" style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 8px; padding: 15px; margin-bottom: 15px; text-align: left;">
                <div class="task-info">
                    <h3 style="margin-bottom: 10px; color: ${statusColor};">${lblAlert} #${task.id} (${task.status})</h3>
                    <p style="margin-bottom: 5px;"><strong>${lblLoc}</strong> ${task.location}</p>
                    <p style="margin-bottom: 15px;"><strong>${lblAct}</strong> ${task.action}</p>
                </div>
                <button 
                    class="btn-action" 
                    onclick="handleTaskCompletion('${task.id}', '${username}', this)">
                    ${lblBtn}
                </button>
            </div>
        `;
    },

    noTasks: () => {
        return `<div class="no-tasks"><b>Nu ai task-uri active în acest moment.</b></div>`;
    }
};