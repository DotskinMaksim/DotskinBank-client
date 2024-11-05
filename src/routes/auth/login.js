import * as api from 'api.js'; // Impordib kõik funktsioonid api.js failist

// Ekspordib postifunktsiooni, mis käsitleb HTTP POST päringuid
export function post(req, res) {
    const user = req.body; // Salvestab päringu keha (kasutaja andmed) muutujasse

    // Kutsub API-lt 'sessions' ja saadab kasutaja andmed
    api.post('sessions', req.body).then(response => {
        // Kui vastuses on token, salvestab selle seansi
        if (response.token) req.session.token = response.token;
        res.setHeader('Content-Type', 'application/json'); // Seab vastuse päise, et näidata, et vastus on JSON

<<<<<<< HEAD
        res.end(JSON.stringify(response)); // Saadetakse JSON-vastus kliendile
=======
        res.end(JSON.stringify(response));

        console.log("token: "+response.token);
>>>>>>> #188525805-As-a-user-I-see-an-overview-page-when-I-log-on
    });
}
