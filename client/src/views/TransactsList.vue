<template>
  <div id="main-content">
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
          <tr v-for="transaction in transactions" :key="transaction.sa_transact_id">
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
import { ref, onMounted } from 'vue'
import axios from "axios";


export default {
    setup() {
      let transactions = ref([])

      const getTransactions = async () => {
        const response = await fetch('http://localhost:5000/transactions', {
          method: 'GET'
        })
        .then( res => {
          return res.json()
        })
        .then(data => transactions.value = data)
        .catch(error => console.log(error))
      }

      onMounted(() => {
        getTransactions()
      })
      // getTransactions()
      return { transactions, getTransactions }
    }
}
</script>

<style scoped>
#main-content {
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
</style>