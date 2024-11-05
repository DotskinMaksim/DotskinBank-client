import * as sapper from '@sapper/app'; // Sapperi rakenduse impordimine

sapper.start({ // Sapperi rakenduse käivitamine
	target: document.querySelector('#sapper') // Määratakse sihtkoht, kuhu rakendus paigaldatakse
});
