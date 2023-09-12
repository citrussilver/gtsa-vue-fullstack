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
    header: 'GCash Transaction',
    transactType: [
      { val: 0, title: '-- Select Transaction Type --' },
      { val: consts.gcash_transacts.load_sale, title: 'Load Sale' },
      { val: consts.gcash_transacts.bills_payment, title: 'Bills Payment' },
      { val: consts.gcash_transacts.income_sale, title: 'Income / Sale' },
      { val: consts.gcash_transacts.self_buy_load, title: 'Self Buy Load' },
      { val: consts.gcash_transacts.bank_transfer, title: 'Bank Transfer' },
      { val: consts.gcash_transacts.online_payment, title: 'Online Payment' },
      { val: consts.gcash_transacts.adjustment, title: 'Adjustment' },
      { val: consts.gcash_transacts.send_money, title: 'Send Money' },
      { val: consts.gcash_transacts.refund, title: 'Refund' },
      { val: consts.gcash_transacts.pay_qr, title: 'Pay QR' },
      { val: consts.gcash_transacts.receive_money, title: 'Receive Money' },
    ],
  }
)
</script>

<style>

</style>