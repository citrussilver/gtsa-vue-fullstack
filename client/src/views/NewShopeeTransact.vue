<template>
    <div>
        <NewShopeeTransactForm :formDetails="shopeeFormDetails"  />
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  import NewShopeeTransactForm from '../components/NewShopeeTransactForm.vue'
  import consts from '../constants/constants.js'
  
  const shopeeFormDetails = reactive(
    {
      componentId: consts.shopee_component_id,
      name: 'Shopee',
      cardBorder: 'card border-primary mb-3',
      header: 'Shopee Transaction',
      transactType: [
        { val: consts.placeholders.default_id, title: consts.placeholders.transaction_type },
        { val: consts.shopee_transacts.online_shopping, title: 'Online Shopping' },
      ],
    }
  )
  </script>
  
  <style>
  
  </style>