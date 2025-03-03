<template>
<div id="flex-container">
  <div id="main-form">
    <div class="card border-success">
      <div class="card-header white">View Records</div>
      <div class="card-body">
        <div class="form-input-flex">
          <div class="form-group">
            <select class="custom-select cselect-style" v-model="choice" @change="checkChoice(choice)">
                <option value="0">-- Select a Source -- </option>
                <option v-for="record in transactionRecords" :value="record.val">{{ record.name }}</option>
            </select>
          </div>
          <div style="margin-left: 1rem;"></div>
          <div class="form-input-flex" v-if="choice > 0">
              <label class="control-label white" style="white-space: nowrap; margin-top: 0.5rem;">Search String</label><br>
              <div style="margin-left: 1rem;"></div>
              <input type="text" class="form-control" v-model="filterString"/>
              <div style="margin-left: 1rem;"></div>
              <div id="btn-container"><button class="btn btn-outline-success styled-button" @click="handleFilter">Submit</button></div>
          </div>
        </div>

        <div v-if="choice == consts.sa_accounts.bpi.id">
          <vue3-datatable :rows="sa1Rows" :columns="saCols">
          </vue3-datatable>  
        </div>

        <div v-if="choice == consts.sa_accounts.ub.id">
          <vue3-datatable :rows="sa3Rows" :columns="saCols">
          </vue3-datatable>  
        </div>

        <div v-if="choice == consts.bank_transacts.maya_cash_in.id">
          <vue3-datatable :rows="mayaRows" :columns="mayaCols" />
        </div>

        <!-- <DataTable :tableDataConfig="componentData.savingAccTableConfig" v-if="choice == 1 || choice == 2"/>
        <DataTable :tableDataConfig="gCashTableConfig" v-if="choice == 3"/>
        <DataTable :tableDataConfig="ccTableConfig" v-if="choice == 4"/> -->

      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, reactive } from 'vue'

import Vue3Datatable from '@bhplugin/vue3-datatable'
import "@bhplugin/vue3-datatable/dist/style.css";

import DataTable from '../components/DataTable.vue'

import consts from '../constants/constants.js'

// import { getSa1Transacts, getSa2Transacts } from '../composables/getSaTransacts'
// import { getCcTransacts } from '../composables/getCcTransacts'
// import { getGCashTransacts, getFilterRemarksGCashTransacts } from '../composables/getGCashTransacts'
import { applyWatchOnRef } from '../helpers/helpers.service.js'

import useSa1Fetcher from '../composables/useSa1Fetcher.js';
import useSa3Fetcher from '../composables/useSa3Fetcher.js';
import useMayaTransactsFetcher from '../composables/useMayaTransactsFetcher.js'

let choice = ref(0)
let filterString = ref('')

let sa1Data = ref([])

let sa3Data = ref([])

let mayaTransactsData = ref([])

let transactionRecords = [
  {
    val: consts.sa_accounts.bpi.id, 
    name: 'BPI Transactions' 
  },
  {
    val: consts.sa_accounts.sb.id, 
    name: 'Security Bank Transactions' 
  },
  {
    val: consts.sa_accounts.ub.id, 
    name: 'Unionbank Transactions' 
  },
  {
    val: consts.bank_transacts.gcash_cash_in.id, 
    name: 'GCash Transactions' 
  },
  {
    val: consts.bank_transacts.maya_cash_in.id,
    name: 'Maya Transactions'
  },
  {
    val: consts.bank_transacts.pay_credit_card.id,
    name: 'Creditcard'
  }
]

const saCols =
        ref([
          { field: "sa_transact_id", title: "Sa Transact ID"},
          { field: "date_time", title: "Date", type: "date" },
          { field: "transact_type", title: "Transact Type" },
          { field: "amount", title: "Amount" },
          { field: "current_balance", title: "Balance" },
          { field: "remarks", title: "Remarks" },
          { field: "post_transact_balance", title: "Post Balance" },
          { field: "location", title: "App / Location" },
        ]) || [];

let sa1Rows = null
let sa3Rows = null

const mayaCols =
        ref([
          { field: "maya_transact_id", title: "Maya Transact ID"},
          { field: "date_time", title: "Date", type: "date" },
          { field: "transact_type", title: "Transact Type" },
          { field: "current_maya_balance", title: "Maya Current Balance" },
          { field: "amount", title: "Amount" },
          { field: "post_maya_balance", title: "Maya Post Balance" },
          { field: "remarks", title: "Remarks" },
        ]) || [];

let mayaRows = null

const checkChoice = (val) => {

  console.log(`val is: ${val}`);
  
  if(val == consts.sa_accounts.bpi.id) {
    
    let { sa1Info } = useSa1Fetcher();
    applyWatchOnRef(sa1Info, sa1Data)
  } 
  
  if(val == consts.sa_accounts.ub.id) {
    let { sa3Info } = useSa3Fetcher();
    applyWatchOnRef(sa3Info, sa3Data)
  }

  if(val == consts.bank_transacts.maya_cash_in.id) {

    let { mayaTransacts } = useMayaTransactsFetcher();
    applyWatchOnRef(mayaTransacts, mayaTransactsData);

  }
}

if (sa1Data) {
  console.log('sa1Data has contents now!');
  sa1Rows = sa1Data
}

if(sa3Data) {
  console.log('sa3Data has contents now!');

  sa3Rows = sa3Data
}

if(mayaTransactsData) {
  mayaRows = mayaTransactsData
}
   

// const identifyChoice = () => {
//   if(choice == 1 || 2) {
//     return savingAccTableConfig
//   } else if(choice == 3) {
//     return gCashTableConfig
//   } else {
//     return ccTableConfig
//   }
// }

// const setMobileHeaders = (selector) => {
//   const tableEl = document.querySelector(selector);
//   console.log(tableEl)
//   const thEls = tableEl.querySelectorAll('thead th');
//   const tdLabels = Array.from(thEls).map(el => el.innerText);
//   tableEl.querySelectorAll('tbody tr').forEach( tr => {
//     Array.from(tr.children).forEach( 
//       (td, ndx) =>  td.setAttribute('data-label', tdLabels[ndx])
//     );
//   });
// }



const handleFilter = () => {
  console.log(filterString.value)
  if(choice.value == 3) {
    if(filterString.value) {
      getFilterRemarksGCashTransacts(filterString.value)
    } else {
      alert('Please input something!')
    }
  } else {
    alert('Sorry, the filter is currently a work in progress..')
  }
}
</script>

<style scoped>

.form-input-flex {
  display: flex;  
}

/* #table-style {
  color: #fff;
} */

.cselect-style {
  width: 12.5rem;
}

@media screen and (max-width: 700px) {

  #main-form select {
    width: 86vw;
  }

  /* #table-style {
    margin: 0;
    width: 100%;
  } */

  /* table thead {
    display: none;
  }

  table td {
    display: flex;
  } */

  #main-form select, table td {
      font-size: 1.5rem;
  }
  
  /* tbody td::before {
    content: attr(data-label);
    color: #000;
    text-shadow: 0 0 5px #E36005, 0 0 5px #E36005, 0 0 5px #E36005, 0 0 5px #E36005;
    font-weight: bold;
    width: 7.5rem;
    min-width: 7.5rem;
    margin-right: 1rem;
  } */
  
}
</style>