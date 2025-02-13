<template>
  <div>
    <NewBankTransactForm :formDetails="bankFormDetails" />
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
      { val: consts.placeholders.default_id, title: consts.placeholders.transaction_type },
      { val: consts.bank_transacts.deposit.id, title: consts.bank_transacts.deposit.name },
      { val: consts.bank_transacts.withdraw.id, title: consts.bank_transacts.withdraw.name },
      { val: consts.bank_transacts.bills_payment.id, title: consts.bank_transacts.bills_payment.name },
      { val: consts.bank_transacts.pay_credit_card.id, title: consts.bank_transacts.pay_credit_card.name },
      { val: consts.bank_transacts.gcash_cash_in.id, title: consts.bank_transacts.gcash_cash_in.name },
      { val: consts.bank_transacts.maya_cash_in.id, title: consts.bank_transacts.maya_cash_in.name },
      { val: consts.bank_transacts.reload_prepaid_card.id, title: consts.bank_transacts.reload_prepaid_card.name },
      { val: consts.bank_transacts.transfer_money.id, title: consts.bank_transacts.transfer_money.name },
      { val: consts.bank_transacts.store_payment.id, title: consts.bank_transacts.store_payment.name },
      { val: consts.bank_transacts.adjustment.id, title: consts.bank_transacts.adjustment.name },
      { val: consts.bank_transacts.earn_interest.id, title: consts.bank_transacts.earn_interest.name },
      { val: consts.bank_transacts.tax_withheld.id, title: consts.bank_transacts.tax_withheld.name },
      { val: consts.bank_transacts.salary_income.id, title: consts.bank_transacts.salary_income.name },
      { val: consts.bank_transacts.shopee_online_banking.id, title: consts.bank_transacts.shopee_online_banking.name },
      { val: consts.bank_transacts.bank_charge.id, title: consts.bank_transacts.bank_charge.name },
      { val: consts.bank_transacts.shopee_pay_cash_in.id, title: consts.bank_transacts.shopee_pay_cash_in.name }
    ],
    billerMerchant: [
      { val: consts.bank_billers.bpi.bluemaster_card.id, name: consts.bank_billers.bpi.bluemaster_card.name },
      { val: consts.bank_billers.bpi.aiaph.id, name: consts.bank_billers.bpi.aiaph.name },
      { val: consts.bank_billers.bpi.col.id, name: consts.bank_billers.bpi.col.name },
      { val: consts.bank_billers.unionbank.visa_platinum.id, name: consts.bank_billers.unionbank.visa_platinum.name },
      { val: consts.national_billers.prime.id, name: consts.national_billers.prime.name },
      { val: consts.national_billers.meralco.id, name: consts.national_billers.meralco.name },
      { val: consts.national_billers.dasca.id, name: consts.national_billers.dasca.name },
      { val: consts.national_billers.others.id, name: consts.national_billers.others.name }
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