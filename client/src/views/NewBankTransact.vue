<template>
  <div>
    <NewTransactForm :formDetails="bankFormDetails"  />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import NewTransactForm from '../components/NewTransactForm.vue'
import consts from '../constants/constants.js'

const bankFormDetails = reactive(
  {
    componentId: consts.bank_component_id,
    cardBorder: 'card border-success',
    header: 'New Bank Transaction',
    transactType: [
      { val: 0, title: '-- Select Transaction Type --' },
      { val: consts.bank_transacts.deposit, title: 'Deposit' },
      { val: consts.bank_transacts.withdraw, title: 'Withdraw' },
      { val: consts.bank_transacts.bills_payment, title: 'Bills Payment' },
      { val: consts.bank_transacts.gcash_cash_in, title: 'GCash Cash-in' },
      { val: consts.bank_transacts.maya_cash_in, title: 'Maya Cash-in' },
      { val: consts.bank_transacts.reload_prepaid_card, title: 'Reload Prepaid Card' },
      { val: consts.bank_transacts.transfer_money, title: 'Transfer Money' },
      { val: consts.bank_transacts.store_payment, title: 'Store payment' },
      { val: consts.bank_transacts.adjustment, title: 'Adjustment' },
      { val: consts.bank_transacts.earn_interest, title: 'Earn Interest' },
      { val: consts.bank_transacts.tax_withheld, title: 'Tax Withheld' },
      { val: consts.bank_transacts.salary_income, title: 'Salary / Income' },
      { val: consts.bank_transacts.shopee_online_banking, title: 'Shopee Online Banking'}
    ],
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