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
    function formatDate(dateString) {
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
<<<<<<< HEAD
                        <th>SenderName</th> <!-- Saatja nimi -->
                        <th>Amount</th> <!-- Summa -->
                        <th>CreateAt</th> <!-- Loomise kuupäev -->
                        <th>Status</th> <!-- Staatus -->
=======
                        <th>SenderName</th>
                        <th>Amount</th>
                        <th>CreateAt</th>
                        <th>Status</th>
                        <th>Viewer</th>
>>>>>>> #188525805-As-a-user-I-see-an-overview-page-when-I-log-on
                    </tr>
                    </thead>
                    <tbody>
                    {#each transactions as transaction}
                        <tr>
<<<<<<< HEAD
                            <td><b>{transaction.senderName}</b><br>{transaction.explanation}</td> <!-- Kuvab saatja nime ja selgituse -->
                            <td style="color: {transaction.amount >= 0 ? 'green' : 'red'}">{transaction.amount} {transaction.currency}</td> <!-- Kuvab summa rohelise või punase värviga -->
                            <td>{transaction.createdAt}</td> <!-- Kuvab loomise kuupäeva -->
                            <td>{transaction.status}<br>{transaction.statusDetail}</td> <!-- Kuvab tehingu staatuse ja detailsed info -->
=======
                            <td><b>{transaction.senderName}</b><br>{transaction.explanation}</td>
                            <td style="color: {transaction.amount >= 0 ? 'green' : 'red'}">{transaction.amount} {transaction.currency}</td>
                            <td>{formatDate(transaction.createdAt)}</td>
                            <td>{transaction.status}<br>{transaction.statusDetail}</td>
                            <td>{my.name}</td>
>>>>>>> #188525805-As-a-user-I-see-an-overview-page-when-I-log-on
                        </tr>
                    {/each}
                    </tbody>
                </table>
            {/await}
        </section>
    {/await}
{/if}
