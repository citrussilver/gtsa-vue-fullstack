<template>
  <div>
      <NewTransactForm :formDetails="gCashFormDetails"  />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import NewTransactForm from '../components/NewTransactForm.vue'
import consts from '../constants/constants.js'

const gCashFormDetails = reactive(
  {
    componentId: consts.gcash_component_id,
    name: 'GCash',
    cardBorder: 'card border-primary mb-3',
    header: 'New GCash Transaction',
    transactType: [
      { val: 0, title: '-- Select Transaction Type --' },
      { val: 1, title: 'Load Sale' },
      { val: 3, title: 'Bills Payment' },
      { val: 4, title: 'Income / Sale' },
      { val: 5, title: 'Self Buy Load' },
      { val: 6, title: 'Bank Transfer' },
      { val: 7, title: 'Online Payment' },
      { val: 8, title: 'Adjustment' },
      { val: 9, title: 'Send Money' },
      { val: 10, title: 'Refund' },
      { val: 11, title: 'Pay QR' },
      { val: 12, title: 'Receive Money' },
    ],
  }
)
</script>

<style>

</style>