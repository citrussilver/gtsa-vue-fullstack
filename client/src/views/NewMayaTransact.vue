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
        { val: 0, title: '-- Select Transaction Type --' },
        { val: consts.maya_transacts.cash_in, title: 'Cash-In' },
        { val: consts.maya_transacts.online_payment, title: 'Online Payment' },
        { val: consts.maya_transacts.qr_pay, title: 'QR Pay' },
        // { val: 1, title: 'Load Sale' },
        { val: consts.maya_transacts.bills_payment, title: 'Bills Payment' },
        // { val: 4, title: 'Income / Sale' },
        { val: consts.maya_transacts.self_buy_load, title: 'Self Buy Load' },
        // { val: 6, title: 'Bank Transfer' },
        { val: consts.maya_transacts.adjustment, title: 'Adjustment' },
        // { val: 9, title: 'Send Money' },
        { val: consts.maya_transacts.refund, title: 'Refund' },
        // { val: 12, title: 'Receive Money' },
      ],
      billerMerchant: [
        { val: 0, name: '-- Select Biller / Merchant --' },
        { val: 5, name: consts.national_billers.prime },
        { val: 6, name: consts.national_billers.meralco },
        { val: 7, name: consts.national_billers.dasca },
        { val: 8, name: consts.national_billers.others }
      ],
      onlineStoreWebsite: consts.online_stores
    }
  )
  </script>
  
  <style>
  
  </style>