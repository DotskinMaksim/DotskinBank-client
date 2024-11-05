import sirv from 'sirv'; // Statiliste failide teenindamine
import polka from 'polka'; // Kerge veebiserver
import compression from 'compression'; // HTTP vastuste tihendamine
import * as sapper from '@sapper/server'; // Sapperi serveri middleware
import session from 'express-session'; // Sessioonide haldamine
import sessionFileStore from 'session-file-store'; // Sessioonide salvestamine failides
const { json } = require('body-parser'); // Keha JSON-parsimine

const { PORT, NODE_ENV } = process.env; // Port ja keskkond keskkonna muutujatest
const dev = NODE_ENV === 'development'; // Arenduskeskkonna määramine

const FileStore = new sessionFileStore(session); // Uue sessioonide failide salvestamise objekti loomine

polka() // Polka serveri loomine
	.use(
		compression({ threshold: 0 }), // Vastuste tihendamine
		json(), // Keha JSON-parsimine
		session({ // Sessioonide haldamise seadistamine
			secret: 'kamel12hg', // Salajane märksõna
			resave: true, // Sessiooni salvestamine iga kord, kui seda muudetakse
			saveUninitialized: true, // Salvestamine isegi algsetele sessioonidele
			cookie: { // Küpsiste seadistamine
				maxAge: 31536000 // Küpsise eluea seadmine (1 aasta)
			},
			store: new FileStore({ // Failide salvestamise seadistamine
				path: `.sessions` // Failide salvestamise tee
			})
		}),
		sirv('static', { dev }), // Statiliste failide teenindamine arendusrežiimis
		sapper.middleware({ // Sapperi middleware'i seadistamine
			session: req => ({ // Sessiooni andmete määramine
				user: req.session && req.session.user, // Kasutaja andmed sessioonist
				token: req.session && req.session.token // Autoriseerimise token sessioonist
			})
		})
	)
	.listen(PORT, err => { // Serveri kuulamine määratud pordil
		if (err) console.log('error', err); // Vigade logimine
	});
