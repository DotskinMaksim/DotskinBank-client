import * as api from 'api.js'; // Impordib kõik funktsioonid api.js failist

// Ekspordib postifunktsiooni, mis käsitleb HTTP POST päringuid
export function post(req, res) {
    const user = req.body; // Salvestab päringu keha (kasutaja andmed)

    // Kutsub API-lt 'users' ja edastab kasutaja andmed
    api.post('users', user).then(response => {
        if (response.user) { // Kontrollib, kas vastuses on kasutaja andmed
            req.session.user = response.user; // Salvestab kasutaja andmed seansisse
        }
        res.setHeader('Content-Type', 'application/json'); // Seab vastuse sisu tüübi

        res.end(JSON.stringify(response)); // Saadetakse JSON-vastus kliendile
    });
}
