<template>
  <div>
      <NewGCashTransactForm :formDetails="gCashFormDetails"  />
      <!-- <NewTransactForm :formDetails="gCashFormDetails"  /> -->
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import NewGCashTransactForm from '../components/NewGCashTransactForm.vue'
// import NewTransactForm from '../components/NewTransactForm.vue'
import consts from '../constants/constants.js'

const gCashFormDetails = reactive(
  {
    componentId: consts.gcash_component_id,
    name: 'GCash',
    cardBorder: 'card border-primary mb-3',
    header: 'GCash Transaction',
    transactType: [
      { val: consts.placeholders.default_id, title: consts.placeholders.transaction_type },
      { val: consts.gcash_transacts.load_sale.id, title: consts.gcash_transacts.load_sale.name },
      { val: consts.gcash_transacts.bills_payment.id, title: consts.gcash_transacts.bills_payment.name },
      { val: consts.gcash_transacts.income_sale.id, title: consts.gcash_transacts.income_sale.name },
      { val: consts.gcash_transacts.self_buy_load.id, title: consts.gcash_transacts.self_buy_load.name },
      { val: consts.gcash_transacts.bank_transfer.id, title: consts.gcash_transacts.bank_transfer.name },
      { val: consts.gcash_transacts.online_payment.id, title: consts.gcash_transacts.online_payment.name },
      { val: consts.gcash_transacts.adjustment.id, title: consts.gcash_transacts.adjustment.name },
      { val: consts.gcash_transacts.send_money.id, title: consts.gcash_transacts.send_money.name },
      { val: consts.gcash_transacts.refund.id, title: consts.gcash_transacts.refund.name },
      { val: consts.gcash_transacts.pay_qr.id, title: consts.gcash_transacts.pay_qr.name },
      { val: consts.gcash_transacts.receive_money.id, title: consts.gcash_transacts.receive_money.name },
    ],
    billerMerchant: [
        { val: consts.placeholders.default_id, name: '-- Select Biller / Merchant --' },
        { val: consts.national_billers.prime.id, name: consts.national_billers.prime.name },
        { val: consts.national_billers.meralco.id, name: consts.national_billers.meralco.name },
        { val: consts.national_billers.dasca.id, name: consts.national_billers.dasca.name },
        { val: consts.national_billers.others.id, name: consts.national_billers.others.name }
      ],
    onlineStoreWebsite: consts.online_stores
  }
)
</script>

<style>

</style>