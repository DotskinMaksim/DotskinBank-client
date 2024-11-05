<script>
    import { goto, stores } from '@sapper/app'; // Impordib Sapperi funktsioonid
    import { post } from 'utils.js'; // Impordib postitamise funktsiooni utiliitidest
    const { session } = stores(); // Kuidas kasutaja sessiooni andmed salvestada

    // Muutujad, et salvestada kasutaja sisend
    let username = ''; // Kasutajanimi
    let name = ''; // Nimi
    let password = ''; // Parool
    let error = null; // Viga

    // Funktsioon, mis käivitatakse vormi esitamisel
    async function submit(event) {
        const response = await post(`auth/register`, {username, name, password}); // Postitab registri andmed

        error = response.error; // Seab veateate vastavalt vastusele
        if (response.id) {
            goto('/'); // Suunab kasutaja peavalehele, kui registreerimine õnnestus
        }
    }
</script>

<svelte:head>
    <title>Sign up • BarBank</title> <!-- Lehe pealkiri -->
</svelte:head>

<div class="auth-page"> <!-- Autentimise lehe konteiner -->
    <div class="container page"> <!-- Pealehe konteiner -->
        <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12"> <!-- Keskelt joondatud veerg -->
                <h1 class="text-xs-center">Sign up</h1> <!-- Registreerimise pealkiri -->
                <p class="text-xs-center">
                    <a href="/login">Have an account?</a> <!-- Lingid sisselogimise lehele -->
                </p>
                {#if error} <!-- Kui esines viga -->
                    <div class="alert alert-danger" role="alert">{error}</div> <!-- Kuvab vea -->
                {/if}

                <form on:submit|preventDefault={submit}> <!-- Vorm, mis takistab vaikimisi käitumist -->
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="text" required placeholder="Your username"
                               bind:value={username}> <!-- Kasutajanime sisend -->
                    </fieldset>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="text" required placeholder="Name"
                               bind:value={name}> <!-- Nime sisend -->
                    </fieldset>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="password" required placeholder="Password"
                               bind:value={password}> <!-- Parooli sisend -->
                        {#if password.length > 1 && password.length < 6}<sup>
                            <div class="alert alert-danger" role="alert">Password too short</div></sup>{/if} <!-- Kontrollib parooli pikkust -->
                    </fieldset>
                    <button class="btn btn-lg btn-primary pull-xs-right" disabled="{password.length < 6}">Sign up</button> <!-- Registreeru nupp -->
                </form>
            </div>
        </div>
    </div>
</div>
