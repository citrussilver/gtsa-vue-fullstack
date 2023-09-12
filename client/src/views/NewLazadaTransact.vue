<template>
    <div>
        <NewLazadaTransactForm :formDetails="lazadaFormDetails"  />
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  import NewLazadaTransactForm from '../components/NewLazadaTransactForm.vue'
  import consts from '../constants/constants.js'
  
  const lazadaFormDetails = reactive(
    {
      componentId: consts.lazada_component_id,
      name: 'Lazada',
      cardBorder: 'card border-primary mb-3',
      header: 'Lazada Transaction',
      transactType: [
        { val: 0, title: '-- Select Transaction Type --' },
        { val: consts.lazada_transacts.online_shopping, title: 'Online Shopping' },
      ],
    }
  )
  </script>
  
  <style>
  
  </style>