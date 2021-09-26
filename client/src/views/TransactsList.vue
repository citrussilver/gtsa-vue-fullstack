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
                <option value="2">Savings Acct 2 Transactions</option>
                <option value="3">GCash Transactions</option>
                <option value="4">Credit Card Transactions</option>
            </select>
        </div>
        <table id="table-style" v-if="choice == 1 || choice == 2">
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
                <td data-label="Date">{{ transaction.date_time }}</td>
                <td data-label="Transact Type">{{ transaction.transact_type }}</td>
                <td data-label="Amount">{{ transaction.amount }}</td>
                <td data-label="Balance">{{ transaction.current_balance }}</td>
                <td data-label="Remarks">{{ transaction.remarks }}</td>
                <td data-label="Post Balance">{{ transaction.post_transact_balance }}</td>
                <td data-label="App / Location">{{ transaction.location }}</td>
                </tr>
            </tbody>
        </table>
        <table id="table-style" v-else-if="choice == 3">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Transact Type</th>
                    <th>Amount</th>
                    <th>Balance</th>
                    <th>Post Balance</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in gCashTransacts" :key="transaction.gcash_transact_id">
                  <td data-label="Date">{{ transaction.date_time }}</td>
                  <td data-label="Transact Type">{{ transaction.transact_type }}</td>
                  <td data-label="Amount">{{ transaction.amount }}</td>
                  <td data-label="GCash Balance">{{ transaction.current_gcash_balance }}</td>
                  <td data-label="Post Balance">{{ transaction.post_gcash_balance }}</td>
                  <td data-label="Remarks">{{ transaction.remarks }}</td>
                </tr>
            </tbody>
        </table>
        <table id="table-style" v-else-if="choice == 4">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Transact Type</th>
                    <th>Amount</th>
                    <th>Remarks</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in ccTransacts" :key="transaction.cc_transact_id">
                  <td data-label="Date">{{ transaction.date_time }}</td>
                  <td data-label="Transact Type">{{ transaction.transact_type }}</td>
                  <td data-label="Amount">{{ transaction.amount }}</td>
                  <td data-label="Remarks">{{ transaction.remarks }}</td>
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
import { ref} from 'vue'

import { sa1Transacts, getSa1Transacts, sa2Transacts, getSa2Transacts } from '../composables/getSaTransacts'
import { ccTransacts, getCcTransacts } from '../composables/getCcTransacts'
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
            (td, ndx) =>  td.setAttribute('data-label', tdLabels[ndx])
          );
        });
      }

      const checkChoice = (val) => {
        console.log(val)
        if(val == 1) {
            getSa1Transacts()
            //setMobileHeaders("#table-style")
        } else if(val == 2) {
            getSa2Transacts()
            //setMobileHeaders("#table-style")
        } else if(val == 3) {
            getGCashTransacts()
            //setMobileHeaders("#table-style")
        } else if(val == 4) {
            getCcTransacts()
            //setMobileHeaders("#table-style")
        }
      }

      return { choice, checkChoice, sa1Transacts, sa2Transacts, gCashTransacts, ccTransacts, setMobileHeaders }
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
    width: 86vw;
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

  #main-form select, table td {
      font-size: 1.5rem;
  }
  
  tbody td::before {
    content: attr(data-label);
    color: #000;
    text-shadow: 0 0 5px #E36005, 0 0 5px #E36005, 0 0 5px #E36005, 0 0 5px #E36005;
    font-weight: bold;
    width: 7.5rem;
    min-width: 7.5rem;
    margin-right: 1rem;
  }
  
}
</style>