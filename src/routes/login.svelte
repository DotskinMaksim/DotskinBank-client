<script context="module">
    // Eelnevalt laadib lehe, kontrollib, kas kasutaja on juba sisse logitud
    export async function preload({ params }, { token }) {
        if (token) {
            this.redirect(302, `/overview`); // Suunab, kui kasutaja on juba sisse logitud
        }
    }
</script>

<script>
    import { goto, stores } from '@sapper/app'; // Impordib Sapper'i funktsioonid
    import { post } from 'utils.js'; // Impordib postitamise utiliidi

    const { session } = stores(); // Salvestab seansi

    let username = ''; // Kasutajanimi
    let password = ''; // Parool
    let error = null; // Viga, kui sisselogimine ebaõnnestub

    // Sisselogimise funktsioon
    async function submit(event) {
        const response = await post(`auth/login`, {username, password}); // Saadab kasutajanime ja parooli
        // TODO käsitle võrgu vigu
        error = response.error; // Salvestab veateate

        if (response.token) {
            console.log(response) // Logib vastuse
            $session.token = response.token; // Salvestab tokeni seansis
            goto('/overview'); // Suunab ülevaate lehele
        }
    }
</script>

<svelte:head>
    <title>Sign in • barBank</title> <!-- Määrab lehe pealkirja -->
</svelte:head>

<div class="auth-page">
    <div class="container page">
        <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Sign In</h1> <!-- Pealkiri sisselogimise lehe jaoks -->
                <p class="text-xs-center">
                    <a href="/register">Need an account?</a> <!-- Link konto loomiseks -->
                </p>

                {#if error}
                    <div class="alert alert-danger" role="alert">{error}</div> <!-- Kuvab vea, kui sisselogimine ebaõnnestub -->
                {/if}
                <form on:submit|preventDefault={submit}> <!-- Vorm sisselogimiseks -->
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="text" required placeholder="Username" bind:value={username}> <!-- Kasutajanime sisend -->
                    </fieldset>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="password" required placeholder="Password" bind:value={password}> <!-- Parooli sisend -->
                    </fieldset>
                    <button class="btn btn-lg btn-primary pull-xs-right" type="submit"> <!-- Sisselogimise nupp -->
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
