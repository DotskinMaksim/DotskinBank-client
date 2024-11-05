import * as api from 'api.js'; // Impordib kõik funktsioonid api.js failist

// Ekspordib postifunktsiooni, mis käsitleb HTTP POST päringuid
export function post(req, res) {
    // Kutsub API-lt 'users/current' andmeid, kasutades seansi tokenit
    api.get('users/current', req.session.token).then(response => {
        res.setHeader('Content-Type', 'application/json'); // Seab vastuse päise, et näidata, et vastus on JSON
        res.end(JSON.stringify(response)); // Saadetakse JSON-vastus kliendile
    });
}
