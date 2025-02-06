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
      { val: consts.placeholders.default_id, title: consts.placeholders.transaction_type },
      { val: consts.cc_transacts.online_payment.id, title: consts.cc_transacts.online_payment.name },
      { val: consts.cc_transacts.non_online_payment.id, title: consts.cc_transacts.non_online_payment.name },
      { val: consts.cc_transacts.loan_promo.id, title: consts.cc_transacts.loan_promo.name },
      { val: consts.cc_transacts.cc_refund.id, title: consts.cc_transacts.cc_refund.name },
      { val: consts.cc_transacts.adjustment.id, title: consts.cc_transacts.adjustment.name }
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