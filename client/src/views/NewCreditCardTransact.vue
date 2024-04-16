<template>
  <div>
    <NewCreditCardTransactForm :formDetails="ccFormDetails"  />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import NewCreditCardTransactForm from '../components/NewCreditCardTransactForm.vue'
import consts from '../constants/constants.js'

const ccFormDetails = reactive(
  {
    componentId: consts.cc_component_id,
    cardBorder: 'card border-danger',
    header: 'Credit Card Transaction',
    transactType: [
      { val: 0, title: '-- Select Transaction Type --' },
      { val: consts.cc_transacts.online_payment, title: 'Online Payment' },
      { val: consts.cc_transacts.non_online_payment, title: 'Non-online Payment' },
      { val: consts.cc_transacts.loan_promo, title: 'Loan - Credit to Cash Promo' },
      { val: consts.cc_transacts.cc_refund, title: 'Refund' }
    ],
    onlineStoreWebsite: consts.online_stores
  }
)
</script>

<style scoped>

#flex-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>