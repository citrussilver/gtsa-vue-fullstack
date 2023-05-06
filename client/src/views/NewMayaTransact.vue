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
        { val: 1, title: 'Online Payment' }
        // { val: 1, title: 'Load Sale' },
        // { val: 3, title: 'Bills Payment' },
        // { val: 4, title: 'Income / Sale' },
        // { val: 5, title: 'Self Buy Load' },
        // { val: 6, title: 'Bank Transfer' },
        // { val: 7, title: 'Online Payment' },
        // { val: 8, title: 'Adjustment' },
        // { val: 9, title: 'Send Money' },
        // { val: 10, title: 'Refund' },
        // { val: 11, title: 'Pay QR' },
        // { val: 12, title: 'Receive Money' },
      ],
    }
  )
  </script>
  
  <style>
  
  </style>