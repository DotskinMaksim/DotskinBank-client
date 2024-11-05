<script context="module">
    // Laeb lehe andmed, kontrollib, kas kasutaja on sisse logitud
    export async function preload({ params }, { token }) {
        if (!token) {
            this.redirect(302, `/login`); // Suunab sisselogimise lehele, kui tokenit ei ole
        }
    }
</script>

<script>
    import { post } from "utils.js"; // Impordib postitamise funktsiooni utiliitidest

    // Funktsioon, mis toob kasutaja andmed
    async function getMyData() {
        return await post(`auth/getMyData`).then(r => {
            r.funds = r.accounts.reduce((funds, account) => funds + account.balance, 0); // Arvutab kõikide kontode saldod kokku
            return r; // Tagastab andmed
        });
    }

    // Funktsioon, mis toob tehingute andmed
    async function getTransactions() {
        return await post(`auth/getTransactions`); // Tagastab tehingud
    }
</script>

{#if process.browser}
    {#await getMyData()}
        loading... <!-- Andmete laadimine -->
    {:then my}
        <section>
            <p style="font-size:xx-large">{my.name}</p> <!-- Kuvab kasutaja nime -->
        </section>
        <section>
            My funds
            <p style="font-size:xx-large; color: {my.funds >= 0 ? 'green' : 'red'}">{my.funds}</p> <!-- Kuvab kasutaja rahalise seisundi rohelise või punase värviga -->
        </section>
        <section>
            <ul>
                {#each my.accounts as account}
                    <li>{account.number} {account.name}</li> <!-- Kuvab iga konto numbri ja nime -->
                {/each}
            </ul>
        </section>
        <section>
            {#await getTransactions()}
                Loading... <!-- Tehingute laadimine -->
            {:then transactions}
                <table class="table table-striped table-bordered"> <!-- Tehingute tabel -->
                    <thead>
                    <tr>
                        <th>SenderName</th> <!-- Saatja nimi -->
                        <th>Amount</th> <!-- Summa -->
                        <th>CreateAt</th> <!-- Loomise kuupäev -->
                        <th>Status</th> <!-- Staatus -->
                    </tr>
                    </thead>
                    <tbody>
                    {#each transactions as transaction}
                        <tr>
                            <td><b>{transaction.senderName}</b><br>{transaction.explanation}</td> <!-- Kuvab saatja nime ja selgituse -->
                            <td style="color: {transaction.amount >= 0 ? 'green' : 'red'}">{transaction.amount} {transaction.currency}</td> <!-- Kuvab summa rohelise või punase värviga -->
                            <td>{transaction.createdAt}</td> <!-- Kuvab loomise kuupäeva -->
                            <td>{transaction.status}<br>{transaction.statusDetail}</td> <!-- Kuvab tehingu staatuse ja detailsed info -->
                        </tr>
                    {/each}
                    </tbody>
                </table>
            {/await}
        </section>
    {/await}
{/if}
