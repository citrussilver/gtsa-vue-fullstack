<template>
  <div>
    <NewTransactForm :formDetails="bankFormDetails"  />
  </div>
</template>

<script>
import { reactive } from 'vue'
import NewTransactForm from '../components/NewTransactForm.vue'

export default {
  components: {
    NewTransactForm
  },
  setup() {

    const bankFormDetails = reactive(
      {
        componentId: 1,
        cardBorder: 'card border-success',
        header: 'New Bank Transaction',
        transactType: [
          { val: 0, title: '-- Select Transaction Type --' },
          { val: 1, title: 'Deposit' },
          { val: 2, title: 'Withdraw' },
          { val: 3, title: 'Bills Payment' },
          { val: 4, title: 'GCash Cash-in' },
          { val: 5, title: 'Reload Prepaid Card' },
          { val: 6, title: 'Transfer Money' },
          { val: 7, title: 'Adjustment' },
          { val: 8, title: 'Earn Interest' },
          { val: 9, title: 'Tax Withheld' },
        ],
      }
    )

    return { bankFormDetails }
  }
}
</script>

<style scoped>

#flex-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>