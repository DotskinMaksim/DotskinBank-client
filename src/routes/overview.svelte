<script context="module">
    export async function preload({ params }, { token }) {
        if (!token) {
            this.redirect(302, `/login`);
        }
    }
</script>
<script>
    import {post} from "utils.js";
    async function getMyData(){
        return await post(`auth/getMyData`).then(r => {
            r.funds = r.accounts.reduce((funds, account) => funds + account.balance, 0)
            return r
        })
    }

    async function getTransactions(){
        return await post(`auth/getTransactions`)
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
        loading...
    {:then my}
        <section>
            <p style="font-size:xx-large">{my.name}</p>
        </section>
        <section>
            My funds
            <p style="font-size:xx-large; color: {my.funds >= 0 ? 'green' : 'red'}">{my.funds}</p>
        </section>
        <section>
            <ul>
                {#each my.accounts as account}
                    <li>{account.number} {account.name}</li>
                {/each}
            </ul>
        </section>
        <section>
            {#await getTransactions()}
                Loading...
            {:then transactions}

                <table class="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>SenderName</th>
                        <th>Amount</th>
                        <th>CreateAt</th>
                        <th>Status</th>
                        <th>Viewer</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each transactions as transaction}
                        <tr>
                            <td><b>{transaction.senderName}</b><br>{transaction.explanation}</td>
                            <td style="color: {transaction.amount >= 0 ? 'green' : 'red'}">{transaction.amount} {transaction.currency}</td>
                            <td>{formatDate(transaction.createdAt)}</td>
                            <td>{transaction.status}<br>{transaction.statusDetail}</td>
                            <td>{my.name}</td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            {/await}
        </section>
    {/await}
{/if}