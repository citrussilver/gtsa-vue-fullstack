<template>
  <div id="flex-container">
      <form @submit.prevent="handleSubmit">
        <div :class="formDetails.cardBorder" style="width: 20rem;">
          <div class="card-header">{{formDetails.header}}</div>
          <div class="card-body">
            <div class="form-group">
              <label class="col-form-label">Date</label>
              <input type="datetime-local" class="form-control" v-model="dateTime" required>
            </div>
            <div class="form-group" v-if="formDetails.componentId === 1">
              <select class="custom-select" v-model="bankId">
                <option value="0">--Choose Bank--</option>
                <option value="1">BPI</option>
                <option value="2">SB</option>
              </select>
            </div>
            <div class="form-group">
                <select class="custom-select" v-model="transactType" @change="handleChange">
                    <option v-for="transact in formDetails.transactType" :key="transact.val" :value="transact.val">{{transact.title}}</option>
                </select>
            </div>
            <div class="form-group" v-if="formDetails.componentId === 2 && transactType === 5">
              <label class="col-form-label">Mobile Number</label><br>
              <input type="number" class="form-control" >
            </div>
            <div class="form-group" v-if="formDetails.componentId === 2">
              <label class="col-form-label">Current GCash Balance</label>
              <div class="form-group">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">₱</span>
                  </div>
                  <input type="text" class="form-control" v-model="currGCashBal" required>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label">{{ transactType === 4 ? 'Sale / Income Received:' : 'Amount'}}</label>
              <div class="form-group">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">₱</span>
                  </div>
                  <input type="number" class="form-control" min="1" step="any" v-model="amount" required>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label">Remarks</label><br>
              <textarea class="form-control" rows="3" v-model="remarks"/>
            </div>
            <div class="form-group">
              <label class="col-form-label">Location</label><br>
              <input type="text" class="form-control" v-model="location" required>
            </div>
            <button type="submit" class="btn btn-outline-success">Submit</button>
          </div>
        </div>
      </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default {
    props: ['formDetails'],
    setup(props) {
        let dateTime = ref(null)
        let bankId = ref(0)
        let transactType = ref(0)
        let currGCashBal = ref(1)
        let amount = ref(1)
        let remarks = ref('')
        let location = ref('')
        
        const router = useRouter()

        const componentId = ref(0)

        const handleChange = () => {
            console.log('transactType.value: ' + transactType.value)
        }
        const handleSubmit = async () => {
          
          try {
            if(props.formDetails.componentId === 2) {

              const newData = {
                date_time: dateTime.value,
                transaction_type_id: transactType.value,
                current_gcash_balance: currGCashBal.value,
                amount: amount.value,
                remarks: remarks.value
              }

              console.log(newData)

              if(transactType.value === 4) {
                console.log('transactType is: ' +transactType.value)
                try {
                  await axios.post("http://localhost:5000/transactions/new-gc-income", newData)
                } catch (error) {
                  console.log(error)
                }
              }

              dateTime.value = null
              transactType.value = 0
              currGCashBal.value = 1
              amount.value = 1
              remarks.value = ''
              location.value = ''
              router.push("/");
            }
          } catch (error) {
            console.log(error);
          }

        }

        return { dateTime, bankId, transactType, currGCashBal, amount, remarks, location, componentId, handleChange, handleSubmit }
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