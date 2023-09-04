<template>
    <div>
        <NewTransactForm :formDetails="mayaFormDetails"  />
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  import NewTransactForm from '../components/NewTransactForm.vue'
  import consts from '../constants/constants.js'
  
  const mayaFormDetails = reactive(
    {
      componentId: consts.maya_component_id,
      name: 'Maya',
      cardBorder: 'card border-success',
      header: 'New Maya Transaction',
      transactType: [
        { val: 0, title: '-- Select Transaction Type --' },
        { val: consts.maya_transacts.online_payment, title: 'Online Payment' },
        { val: consts.maya_transacts.qr_pay, title: 'QR Pay' },
        // { val: 1, title: 'Load Sale' },
        // { val: 3, title: 'Bills Payment' },
        // { val: 4, title: 'Income / Sale' },
        // { val: 5, title: 'Self Buy Load' },
        // { val: 6, title: 'Bank Transfer' },
        { val: consts.maya_transacts.adjustment, title: 'Adjustment' },
        // { val: 9, title: 'Send Money' },
        { val: consts.maya_transacts.refund, title: 'Refund' },
        // { val: 12, title: 'Receive Money' },
      ],
    }
  )
  </script>
  
  <style>
  
  </style>