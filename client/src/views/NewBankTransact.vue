<template>
  <div>
    <NewBankTransactForm :formDetails="bankFormDetails"  />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import NewBankTransactForm from '../components/NewBankTransactForm.vue'
import consts from '../constants/constants.js'

const bankFormDetails = reactive(
  {
    componentId: consts.bank_component_id,
    cardBorder: 'card border-success',
    header: 'Bank Transaction',
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
      { val: consts.bank_transacts.shopee_online_banking, title: 'Shopee Online Banking'},
      { val: consts.bank_transacts.bank_charge, title: 'Bank Charge'},
      { val: consts.bank_transacts.shopee_pay_cash_in, title: 'ShopeePay Cash-In' }
    ],
    billerMerchant: [
      { val: 1, name: consts.bank_billers.bpi.bluemaster_card },
      { val: 2, name: consts.bank_billers.bpi.aiaph },
      { val: 3, name: consts.bank_billers.bpi.col },
      { val: 4, name: consts.bank_billers.unionbank.visa_platinum },
      { val: 5, name: consts.national_billers.prime },
      { val: 6, name: consts.national_billers.meralco },
      { val: 7, name: consts.national_billers.dasca },
      { val: 8, name: consts.national_billers.others }
    ]
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