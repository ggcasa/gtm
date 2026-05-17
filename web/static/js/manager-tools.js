// ============================================================================
// GTM - Manager Console Tools & Business Logic
// ============================================================================

const GTM_Manager = {
    // Încarcă datele combinate (Flotă + Operatori) de la serverul Go
    loadDashboard: () => {
        const fleetContainer = document.getElementById('manager-fleet-container');
        const allocContainer = document.getElementById('manager-allocation-container');

        if (!fleetContainer || !allocContainer) return;

        // Apelăm endpoint-ul centralizat din Go
        fetch('/api/manager/dashboard')
            .then(response => {
                if (!response.ok) throw new Error('Eroare la încărcarea datelor de management');
                return response.json();
            })
            .then(data => {
                // 1. Randare Flotă / Rampe
                if (data.rampe && data.rampe.length > 0) {
                    fleetContainer.innerHTML = data.rampe
                        .map(rampa => GTM_Render.managerFleetCard(rampa))
                        .join('');
                } else {
                    fleetContainer.innerHTML = '<p>Nu există rampe configurate.</p>';
                }

                // 2. Randare Formular de Alocare
                // Filtrăm rampele ocupate pentru a le trimite doar pe ele în drop-down-ul de locații
                const rampeOcupate = data.rampe ? data.rampe.filter(r => r.status !== 'Liberă') : [];
                const operatoriDisponibili = data.operatori || [];

                allocContainer.innerHTML = GTM_Render.managerAllocationForm(rampeOcupate, operatoriDisponibili);
            })
            .catch(err => {
                console.error('[GTM MANAGER ERROR]', err);
                fleetContainer.innerHTML = `<p style="color: red;">Eroare: ${err.message}</p>`;
            });
    },

    // Trimite noul task creat de manager către backend
    submitNewTask: () => {
        const locVal = document.getElementById('task-location').value;
        const opVal = document.getElementById('task-operator').value;
        const actVal = document.getElementById('task-action').value.trim();

        if (!locVal || !opVal || !actVal) {
            alert('Te rugăm să completezi toate câmpurile formularului!');
            return;
        }

        const payload = {
            operator: opVal,
            location: locVal,
            action: actVal
        };

        fetch('/api/manager/assign-task', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) throw new Error('Eroare la salvarea task-ului pe server');
            return response.json();
        })
        .then(res => {
            if (res.status === 'success') {
                alert('Task alocat cu succes! Operatorul îl va primi instant.');
                document.getElementById('task-action').value = ''; // Resetăm doar câmpul de text
                GTM_Manager.loadDashboard(); // Reîmprospătăm ecranele
            }
        })
        .catch(err => alert(err.message));
    }
};