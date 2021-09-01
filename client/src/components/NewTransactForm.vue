<template>
  <div id="flex-container">
      <form @submit.prevent="handleSubmit">
        <div :class="formDetails.cardBorder" style="width: 20rem;">
          <div class="card-header white">{{formDetails.header}}</div>
          <div class="card-body">
            <div class="form-group">
              <label class="col-form-label white">Date</label>
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
                <select class="custom-select" v-model="transactType" style="width: 12rem;" @change="handleChange">
                    <option v-for="transact in formDetails.transactType" :key="transact.val" :value="transact.val">{{transact.title}}</option>
                </select>
            </div>
            <div class="flex-group">
              <div class="form-group" v-if="formDetails.componentId === 2 && transactType === 1">
                <label class="col-form-label white">Customer</label><br>
                <select class="custom-select" v-model="customer" style="width: 6rem;"  @change="handleChange">
                  <option value="1" selected>Mama</option>
                  <option value="2">Tito Anton</option>
                  <option value="3">Ate Emy</option>
                  <option value="4">Aki</option>
                </select>
              </div>
              <div class="form-group" v-if="formDetails.componentId === 2 && (transactType === 5 || transactType === 1)">
                <label class="col-form-label white">Mobile Number</label><br>
                <input type="number" class="form-control" style="width: 8rem;" v-model="mobileNo">
              </div>
            </div>
            <div class="flex-group">
              <div class="form-group" v-if="formDetails.componentId === 2 && (transactType === 5 || transactType === 1)" style="width: 5rem;">
                <label class="col-form-label white">Network</label><br>
                <select class="custom-select" v-model="network">
                  <option value="TM">TM</option>
                  <option value="Globe">Globe</option>
                  <option value="TNT">TNT</option>
                  <option value="Smart">Smart</option>
                </select>
              </div>
              <div class="form-group" v-if="formDetails.componentId === 2 && transactType === 1">
                <label class="col-form-label white">Payment Date / Time</label>
                <input type="datetime-local" class="form-control" v-model="paymentDateTime">
              </div>
            </div>
            <div class="form-group" v-if="formDetails.componentId === 2 && transactType === 8">
              <label class="col-form-label white">Credit or Debit?</label><br>
              <select class="custom-select" v-model="credit" style="width: 6rem;"  @change="handleChange">
                <option value="1" selected>Credit</option>
                <option value="0">Debit</option>
              </select>
            </div>
            <div class="form-group" v-if="formDetails.componentId === 2">
              <label class="col-form-label white">Current GCash Balance</label>
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
              <label class="control-label white">{{ transactType === 4 ? 'Sale / Income Received:' : 'Amount'}}</label>
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
              <label class="control-label white">Remarks</label><br>
              <textarea class="form-control" rows="3" v-model="remarks"/>
            </div>
            <div class="form-group" v-if="formDetails.componentId === 1" >
              <label class="col-form-label white">Location</label><br>
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
import { toast } from 'bulma-toast'

export default {
    props: ['formDetails'],
    setup(props) {
        let dateTime = ref(null)
        let bankId = ref(0)
        let transactType = ref(0)
        let customer = ref('')
        let mobileNo = ref('')
        let network = ref('')
        let paymentDateTime = ref('')
        let credit = ref(1)
        let currGCashBal = ref(1)
        let amount = ref(1)
        let remarks = ref('')
        let location = ref('')
        
        const router = useRouter()

        const handleChange = () => {
          console.log(`Transaction Value: ${transactType.value}`)
          console.log(`credit.value: ${credit.value}`)
          console.log(`customer: ${customer.value}`)
        }
        const handleSubmit = async () => {
          
          try {
            if(props.formDetails.componentId === 2) {

              let newData = {
                date_time: dateTime.value,
                transaction_type_id: transactType.value,
                current_gcash_balance: currGCashBal.value,
                amount: amount.value,
                remarks: remarks.value
              }

              if(transactType.value === 1) {
                newData.customer_id = customer.value
                newData.mobile_number = mobileNo.value
                newData.network = network.value
                if(!paymentDateTime.value) {
                  newData.payment_date = null
                }

                try {
                  await axios.post("http://localhost:5000/transactions/new-gc-loadsale", newData)
                  toast({
                    message: 'Successfully recorded Load Sale',
                    type: 'is-info',
                    position: "top-center",
                    dismissible: true,
                    pauseOnHover: true,
                    closeOnClick: true
                  })
                } catch (error) {
                  console.log(error)
                }

              } else if(transactType.value === 3) {
                try {
                  await axios.post("http://localhost:5000/transactions/new-gc-billspay", newData)
                  toast({
                    message: 'Successfully recorded Bills payment.',
                    type: 'is-info',
                    position: "top-center",
                    dismissible: true,
                    pauseOnHover: true,
                    closeOnClick: true
                  })
                } catch (error) {
                  console.log(error)
                }
              } else if(transactType.value === 4) {
                try {
                  await axios.post("http://localhost:5000/transactions/new-gc-income", newData)
                  toast({
                    message: 'Successfully recorded Sale / Income',
                    type: 'is-info',
                    position: "top-center",
                    dismissible: true,
                    pauseOnHover: true,
                    closeOnClick: true
                  })
                } catch (error) {
                  console.log(error)
                }
              } else if(transactType.value === 5) {
                
                newData.mobile_number = mobileNo.value
                newData.network = network.value

                try {
                  await axios.post("http://localhost:5000/transactions/new-gc-selfbuyload", newData)
                  toast({
                    message: 'Successfully added Self Buy Load record.',
                    type: 'is-info',
                    position: "top-center",
                    dismissible: true,
                    pauseOnHover: true,
                    closeOnClick: true
                  })
                } catch (error) {
                  console.log(error)
                }
              } else if(transactType.value === 8) {

                newData.credit = credit.value
                console.log(newData)

                try {
                  await axios.post("http://localhost:5000/transactions/new-gc-adjustment", newData)
                  toast({
                    message: 'Successfully added Self Buy Load record.',
                    type: 'is-info',
                    position: "top-center",
                    dismissible: true,
                    pauseOnHover: true,
                    closeOnClick: true
                  })
                } catch (error) {
                  console.log(error)
                }
              }

              dateTime.value = null
              transactType.value = 0
              currGCashBal.value = 1
              amount.value = 1
              mobileNo.value = ''
              network.value = ''
              remarks.value = ''
              
            }
          } catch (error) {
            console.log(error);
          }

        }

        return { 
          dateTime, 
          bankId, 
          transactType, 
          customer, 
          mobileNo, 
          network, 
          paymentDateTime, 
          credit, 
          currGCashBal,
          amount, 
          remarks, 
          location, 
          handleChange, 
          handleSubmit }
    }

}
</script>

<style scoped>
#flex-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.white {
  color: #fff;
}

.flex-group {
  display: flex;
  justify-content: space-between;
}
</style>