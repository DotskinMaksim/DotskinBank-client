import * as api from 'api.js'; // Impordib kõik funktsioonid api.js failist

// Ekspordib asünkroonse postifunktsiooni, mis käsitleb HTTP POST päringuid
export async function post(req, res) {
    // Kutsub API-lt 'transactions' andmeid, kasutades seansi tokenit
    api.get('transactions', req.session.token).then(response => {
        res.setHeader('Content-Type', 'application/json'); // Seab vastuse päise, et näidata, et vastus on JSON
        res.end(JSON.stringify(response)); // Saadetakse JSON-vastus kliendile
    });
}
