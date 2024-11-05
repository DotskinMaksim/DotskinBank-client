import * as api from 'api.js'; // Impordib kõik funktsioonid api.js failist

// Ekspordib postifunktsiooni, mis käsitleb HTTP POST päringuid
export function post(req, res) {
    const user = req.body; // Salvestab päringu keha (kasutaja andmed)

    // Kutsub API-lt 'sessions' ja edastab seansi token'i kustutamise
    api.del('sessions', req.session.token).then(response => {
        delete req.session.token; // Kustutab seansist token'i
        res.end(JSON.stringify(response)); // Saadetakse JSON-vastus kliendile
    });
}
