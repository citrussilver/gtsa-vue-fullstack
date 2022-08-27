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
                <option value="1">Savings Acct 1 Transactions</option>
                <option value="2">Savings Acct 2 Transactions</option>
                <option value="3">GCash Transactions</option>
                <option value="4">Credit Card Transactions</option>
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

        <DataTable :tableDataConfig="componentData.savingAccTableConfig" v-if="choice == 1 || choice == 2"/>
        <DataTable :tableDataConfig="gCashTableConfig" v-if="choice == 3"/>
        <DataTable :tableDataConfig="ccTableConfig" v-if="choice == 4"/>

      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, reactive } from 'vue'

import DataTable from '../components/DataTable.vue'

import { getSa1Transacts, getSa2Transacts } from '../composables/getSaTransacts'
import { getCcTransacts } from '../composables/getCcTransacts'
import { getGCashTransacts, getFilterRemarksGCashTransacts } from '../composables/getGCashTransacts'

let choice = ref(0)
let filterString = ref('')

const componentData = reactive({})

componentData.savingAccTableConfig = {
  data_table_title: 'Savings Account Transactions Data',
  headers: [
        'Date',
        'Transact Type',
        'Amount',
        'Balance',
        'Remarks',
        'Post Balance',
        'App / Location'
  ],
  columns: {
    date: (data) => data.date_time,
    transactType: (data) => data.transact_type,
    amount: (data) => data.amount,
    balance: (data) => data.current_balance,
    remarks: (data) => data.remarks,
    postBalance: (data) => data.post_transact_balance,
    appLocation: (data) => data.location
  },
  column_count: () => Object.keys(componentData.savingAccTableConfig.columns).length,
  total_records: 0,
  report_data: [],
  page_number_count: 6,
  data_source: function() {
      let res = getSa1Transacts()
      return res
  },
  pagination_data: {
      totalItems: 0,
      currentPage: 1,
      rowCount: 10,
      maxPages: 6
  },
  operation_hash: ''
}

componentData.gCashTableConfig = {
  data_table_title: 'GCash Transactions Data',
  headers: [
    'Date',
    'Transact Type',
    'Amount',
    'Balance',
    'Post Balance',
    'Remarks'
  ],
  columns: {
    date: (data) => data.date_time,
    transactType: (data) => data.transact_type,
    amount: (data) => data.amount,
    balance: (data) => data.current_gcash_balance,
    postBalance: (data) => data.post_gcash_balance,
    remarks: (data) => data.remarks,
  },
  total_records: 0,
  report_data: [],
  page_number_count: 6,
  data_source: function() {
      let res = getGCashTransacts()
      console.log(res)
      return res
  },
  pagination_data: {
      totalItems: 0,
      currentPage: 1,
      rowCount: 10,
      maxPages: 6
  },
  operation_hash: ''
}

componentData.ccTableConfig = {
    headers: [
      'Date',
      'Transact Type',
      'Description',
      'Amount',
      'Remarks'
    ],
    columns: {
      date: (data) => data.date_time,
      transactType: (data) => data.transact_type,
      description: (data) => data.description,
      amount: (data) => data.amount,
      remarks: (data) => data.remarks,
    },
    total_records: 0,
    page_number_count: 6,
    data_source: function() {
        let res = getCcTransacts()
        console.log(res)
        return res
    },
    pagination_data: {
        totalItems: 0,
        currentPage: 1,
        rowCount: 10,
        maxPages: 6
    },
    operation_hash: ''
}

const checkChoice = (val) => {
  console.log(val)
  if(val == 1) {

      // getSa1Transacts()
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

// const identifyChoice = () => {
//   if(choice == 1 || 2) {
//     return savingAccTableConfig
//   } else if(choice == 3) {
//     return gCashTableConfig
//   } else {
//     return ccTableConfig
//   }
// }

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