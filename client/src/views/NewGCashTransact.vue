<template>
  <div>
      <NewTransactForm :formDetails="gCashFormDetails"  />
  </div>
</template>

<script>
import { ref } from 'vue'
import NewTransactForm from '../components/NewTransactForm.vue'

export default {
  components: {
    NewTransactForm
  },
  setup() {
    const gCashFormDetails = ref(
      {
        componentId: 2,
        cardBorder: 'card border-primary mb-3',
        header: 'New GCash Transaction',
        transactType: [
          { val: 0, title: '-- Select Transaction Type --' },
          { val: 1, title: 'Load Sale' },
          { val: 3, title: 'Bills Payment' },
          { val: 4, title: 'Income / Sale' },
          { val: 5, title: 'Self Buy Load' },
          { val: 6, title: 'Send to Bank' },
          { val: 7, title: 'Online Shop Payment' },
          { val: 8, title: 'Adjustment' },
          { val: 9, title: 'Send Money w/ Clip' },
          { val: 10, title: 'Refund' }
        ],
      }
    )

    return { gCashFormDetails }
  }


}
</script>

<style>

</style>