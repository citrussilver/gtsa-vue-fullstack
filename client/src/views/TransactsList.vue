<template>
<div id="flex-container">
  <div id="main-form">
    <div class="card border-success">
      <div class="card-header white">View Records</div>
      <div class="card-body">
        <div class="form-group">
            <select class="custom-select cselect-style" v-model="choice" @change="checkChoice(choice)">
                <option value="0">-- Select a Source -- </option>
                <option value="1">Savings Acct 1 Transactions</option>
                <option value="2">GCash Transactions</option>
            </select>
        </div>
        <table id="table-style" v-if="choice == 1">
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
                <tr v-for="transaction in sa1Transacts" :key="transaction.sa_transact_id">
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
        <table id="table-style" v-else-if="choice == 2">
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
                <tr v-for="transaction in gCashTransacts" :key="transaction.gcash_transact_id">
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
        <table id="table-style" v-else>
            <tbody>
                <tr>
                <td>No records to show.</td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { ref, onMounted } from 'vue'

import { sa1Transacts, getSa1Transacts } from '../composables/getSa1Transacts'
import { gCashTransacts, getGCashTransacts } from '../composables/getGCashTransacts'

export default {

    setup() {

      let choice = ref(0)

      const setMobileHeaders = (selector) => {
        const tableEl = document.querySelector(selector);
        console.log(tableEl)
        const thEls = tableEl.querySelectorAll('thead th');
        const tdLabels = Array.from(thEls).map(el => el.innerText);
        tableEl.querySelectorAll('tbody tr').forEach( tr => {
          Array.from(tr.children).forEach( 
            (td, ndx) =>  td.setAttribute('label', tdLabels[ndx])
          );
        });
      }

      const checkChoice = (val) => {
        console.log(val)
        if(val == 1) {
            getSa1Transacts()
            setMobileHeaders("#table-style")
        } else if(val == 2) {
            getGCashTransacts()
            setMobileHeaders("#table-style")
        }
      }

      return { choice, checkChoice, sa1Transacts, gCashTransacts, setMobileHeaders }
    }
}
</script>

<style scoped>

#table-style {
  color: #fff;
}

.cselect-style {
  width: 12.5rem;
}

@media screen and (max-width: 700px) {

  #main-form select {
    font-size: 1.5rem;
  }

  #table-style {
    margin: 0;
    width: 100%;
  }

  table thead {
    display: none;
  }

  table td {
    display: flex;
  }
  
  table td::before {
    content: attr(label);
    color: #fff;
    font-weight: bold;
    width: 7.5rem;
    min-width: 7.5rem;
  }
  
}
</style>