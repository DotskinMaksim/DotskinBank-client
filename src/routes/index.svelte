<script>
	import cat from 'images/cat.jpg'; // Impordib kassi pildi
</script>

<style>
	h1, figure, p {
		text-align: center;
	margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
	text-transform: uppercase;
	font-weight: 700;
	margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
	max-width: 400px;
	margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>Sapper project template</title> <!-- Määrab lehe pealkirja -->
</svelte:head>

<h1>Tere tulemast!</h1> <!-- Kuvab pealkirja 'Tere tulemast!' -->

<figure>
	<img alt="Cat" src="{cat}"> <!-- Kuvab kassi pildi -->
	<figcaption>Testing Sapper!</figcaption> <!-- Kuvab pildi allkirja -->
</figure>

<p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong></p> <!-- Kutsub kasutajat redigeerima faili elureloading'i testimiseks -->
