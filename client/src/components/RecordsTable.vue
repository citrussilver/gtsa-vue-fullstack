<template>
    <div id="main-form">
        <div class="form-group">
            <select class="custom-select cselect-style" v-model="choice" @change="trackSelection(choice)">
                <option value="0">-- Select a Source -- </option>
                <option value="1">Savings Acct 1 Transactions</option>
                <option value="2">GCash Transactions</option>
            </select>
        </div>
        <table id="table-style">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Transact Type</th>
                    <th>Amount</th>
                    <th>Balance</th>
                    <th>Remarks</th>
                    <th>Post Balance</th>
                    <th>App / Location</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in data" :key="transaction.sa_transact_id">
                <td>{{ transaction.date_time }}</td>
                <td>{{ transaction.transact_type }}</td>
                <td>{{ transaction.amount }}</td>
                <td>{{ transaction.current_balance }}</td>
                <td>{{ transaction.remarks }}</td>
                <td>{{ transaction.post_transact_balance }}</td>
                <td>{{ transaction.location }}</td>
                </tr>
            </tbody>
        </table>     
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    
    props: ['data'],
    emits: ['choice-update'],
    setup(props, { emit }) {
        console.log(props.data)
        let choice = ref(0)

        const trackSelection = (val) => {
            choice.value = val
            emit('choice-update', val)
        }
        return { choice, trackSelection }
    }

}
</script>

<style scoped>
#main-form {
  opacity: 0;
  animation-name: wrapper-fadein;
  animation-duration: var(--anim-duration);
  animation-fill-mode: var(--anim-fill-mode);
}

@keyframes wrapper-fadein {
    to {
        opacity: 1;
    }
}

.cselect-style {
  width: 12.5rem;
}

#table-style {
    color: #fff;
}

@media all and (max-width: 700px) {

  .cselect-style {
    width: 18rem;
  }

  #main-form select {
    font-size: 1.5rem;
  }
}

</style>