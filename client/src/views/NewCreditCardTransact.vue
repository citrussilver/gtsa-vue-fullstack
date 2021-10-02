<template>
  <div>
    <NewTransactForm :formDetails="ccFormDetails"  />
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

    const ccFormDetails = reactive(
      {
        componentId: 3,
        cardBorder: 'card border-danger',
        header: 'New Credit Card Transaction',
        transactType: [
          { val: 0, title: '-- Select Transaction Type --' },
          { val: 1, title: 'Online Payment' },
          { val: 2, title: 'Non-online Payment' },
          { val: 3, title: 'Loan - Credit to Cash Promo' },
        ],
      }
    )

    return { ccFormDetails }
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