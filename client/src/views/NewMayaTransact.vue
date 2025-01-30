<template>
    <div>
        <NewMayaTransactForm :formDetails="mayaFormDetails"  />
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  // import NewTransactForm from '../components/NewTransactForm.vue'
  import NewMayaTransactForm from '../components/NewMayaTransactForm.vue'
  import consts from '../constants/constants.js'
  
  const mayaFormDetails = reactive(
    {
      componentId: consts.maya_component_id,
      name: 'Maya',
      cardBorder: 'card border-success',
      header: 'Maya Transaction',
      transactType: [
        { val: consts.placeholders.default_id, title: consts.placeholders.transaction_type },
        { val: consts.maya_transacts.cash_in.id, title: consts.maya_transacts.cash_in.name },
        { val: consts.maya_transacts.online_payment.id, title: consts.maya_transacts.online_payment.name },
        { val: consts.maya_transacts.qr_pay.id, title: consts.maya_transacts.qr_pay.name },
        { val: consts.maya_transacts.bills_payment.id, title: consts.maya_transacts.bills_payment.name },
        { val: consts.maya_transacts.self_buy_load.id, title: consts.maya_transacts.self_buy_load.name },
        { val: consts.maya_transacts.adjustment.id, title: consts.maya_transacts.adjustment.name },
        { val: consts.maya_transacts.refund.id, title: consts.maya_transacts.refund.name },
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