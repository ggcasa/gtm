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

// Extindere GTM_Render pentru zona de Management
// ============================================================================

// 1. Componentă pentru o singură rampă din flotă
GTM_Render.managerFleetCard = (rampa) => {
    // Verde dacă e liberă, Roșu/Portocaliu dacă e ocupată sau în așteptare
    let statusColor = '#28a745'; 
    let statusText = 'Liberă (Empty)';
    
    if (rampa.status === 'Descărcare') {
        statusColor = '#d9383a';
        statusText = `Ocupată - ${rampa.camion}`;
    } else if (rampa.status === 'În așteptare') {
        statusColor = '#ffc107';
        statusText = `În așteptare - ${rampa.camion}`;
    }

    return `
        <div class="fleet-ramp-item" style="border-left: 5px solid ${statusColor}; background: var(--card-bg); border-top: 1px solid var(--border-color); border-right: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); padding: 12px; margin-bottom: 10px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center;">
            <div>
                <strong style="font-size: 1.1rem;">Rampa ${rampa.id}</strong>
                <p style="margin: 3px 0 0 0; font-size: 0.9rem; color: var(--text-color); opacity: 0.8;">${statusText}</p>
            </div>
            <span style="font-size: 0.85rem; padding: 4px 8px; background: var(--bg-color); border-radius: 12px; font-weight: bold;">
                ${rampa.zona}
            </span>
        </div>
    `;
};

// 2. Componentă pentru Formularul de Alocare Taskuri
GTM_Render.managerAllocationForm = (rampeOcupate, operatoriDisponibili) => {
    const lang = localStorage.getItem('gtm_lang') || 'ro';
    
    // Generăm opțiunile pentru rampe dinamic (doar cele unde există camioane)
    const rampaOptions = rampeOcupate.length === 0 
        ? `<option value="">-- Nu sunt camioane la rampe --</option>`
        : rampeOcupate.map(r => `<option value="Rampa ${r.id} - ${r.zona}">Rampa ${r.id} (${r.camion})</option>`).join('');

    // Generăm opțiunile pentru operatori dinamic
    const operatorOptions = operatoriDisponibili.length === 0
        ? `<option value="">-- Nu sunt operatori activi --</option>`
        : operatoriDisponibili.map(op => `<option value="${op.username}">${op.username} (${op.status})</option>`).join('');

    return `
        <div class="allocation-form-box" style="text-align: left;">
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">1. Selectează Locația (Rampa Activă):</label>
                <select id="task-location" style="width: 100%; padding: 10px; border-radius: 6px; background: var(--card-bg); color: var(--text-color); border: 1px solid var(--border-color);">
                    ${rampaOptions}
                </select>
            </div>

            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">2. Selectează Operatorul din Teren:</label>
                <select id="task-operator" style="width: 100%; padding: 10px; border-radius: 6px; background: var(--card-bg); color: var(--text-color); border: 1px solid var(--border-color);">
                    ${operatorOptions}
                </select>
            </div>

            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">3. Acțiune / Instrucțiuni:</label>
                <input type="text" id="task-action" placeholder="ex: Pregătire palet descărcare #4402" style="width: 100%; padding: 10px; border-radius: 6px; margin-bottom: 0;">
            </div>

            <button class="btn-action" onclick="GTM_Manager.submitNewTask()" style="background-color: var(--primary-color);">
                🚀 TRIMITE ORDINUL ÎN TEREN
            </button>
        </div>
    `;
};