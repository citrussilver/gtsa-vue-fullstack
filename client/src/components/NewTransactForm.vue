<template>
  <div id="flex-container">
      <form id="main-form" @submit.prevent="handleSubmit">
        <div :class="formDetails.cardBorder" style="width: 20rem;">
          <div class="card-header white">{{formDetails.header}}</div>
          <div class="card-body">
            <div class="form-group">
              <label class="col-form-label white">Date</label>
              <input type="datetime-local" class="form-control" v-model="commonProps.dateTime" required>
            </div>
            <div class="form-group" v-if="formDetails.componentId === 1">
              <select class="custom-select" v-model="commonProps.bankId">
                <option value="0">--Choose Bank--</option>
                <option value="1">BPI</option>
                <option value="2">SB</option>
              </select>
            </div>
            <div class="form-group">
                <select class="custom-select" v-model="commonProps.transactType" style="width: 12rem;" @change="handleChange">
                    <option v-for="transact in formDetails.transactType" :key="transact.val" :value="transact.val">{{transact.title}}</option>
                </select>
            </div>
            <div class="flex-group">
              <div class="form-group" v-if="formDetails.componentId === 2 && commonProps.transactType === 1">
                <label class="col-form-label white">Customer</label><br>
                <select class="custom-select" v-model="commonProps.customer" style="width: 6rem;"  @change="handleChange">
                  <option value="1" selected>Mama</option>
                  <option value="2">Tito Anton</option>
                  <option value="3">Ate Emy</option>
                  <option value="4">Aki</option>
                </select>
              </div>
              <div class="form-group" v-if="formDetails.componentId === 2 && (commonProps.transactType === 5 || commonProps.transactType === 1 || commonProps.transactType === 9)">
                <label class="col-form-label white">Mobile Number</label><br>
                <input type="number" class="form-control" style="width: 8rem;" v-model="commonProps.mobileNo">
              </div>
            </div>
            <div class="flex-group">
              <div class="form-group" v-if="formDetails.componentId === 2 && (commonProps.transactType === 5 || commonProps.transactType === 1)" style="width: 5rem;">
                <label class="col-form-label white">Network</label><br>
                <select class="custom-select" v-model="commonProps.network">
                  <option value="TM">TM</option>
                  <option value="Globe">Globe</option>
                  <option value="TNT">TNT</option>
                  <option value="Smart">Smart</option>
                </select>
              </div>
              <div class="form-group" v-if="formDetails.componentId === 2 && commonProps.transactType === 1">
                <label class="col-form-label white">Payment Date / Time</label>
                <input type="datetime-local" class="form-control" v-model="commonProps.paymentDateTime">
              </div>
            </div>
            <div class="form-group" v-if="formDetails.componentId === 2 && commonProps.transactType === 8">
              <label class="col-form-label white">Credit or Debit?</label><br>
              <select class="custom-select" v-model="commonProps.credit" style="width: 6rem;"  @change="handleChange">
                <option value="1" selected>Credit</option>
                <option value="0">Debit</option>
              </select>
            </div>
            <div class="form-group">
              <label class="col-form-label white">Current {{ formDetails.componentId === 1 ? 'Bank': 'GCash'}} Balance</label>
              <div class="form-group">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">₱</span>
                  </div>
                  <input type="text" class="form-control" v-model="commonProps.currentBalance" required>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label white">{{ commonProps.transactType === 4 ? 'Sale / Income Received:' : 'Amount'}}</label>
              <div class="form-group">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">₱</span>
                  </div>
                  <input type="number" class="form-control" min="1" step="any" v-model="commonProps.amount" required>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label white">Remarks</label><br>
              <textarea class="form-control" rows="3" v-model="commonProps.remarks"/>
            </div>
            <div class="form-group" v-if="commonProps.transactType === 9">
              <label class="control-label white">Message</label><br>
              <textarea class="form-control" rows="3" v-model="commonProps.message"/>
            </div>
            <div class="form-group" v-if="commonProps.transactType === 9">
              <label class="control-label white">Attachment:</label><br>
              <select class="custom-select" v-model="commonProps.attachment">
                <option value="Photo" selected>Photo</option>
                <option value="Video">Video</option>
                <option value="Audio">Audio</option>
              </select>
            </div>
            <div class="form-group" v-if="formDetails.componentId === 1">
              <label class="col-form-label white">Location</label><br>
              <input type="text" class="form-control" v-model="commonProps.location" required>
            </div>
            <button type="submit" class="btn btn-outline-success styled-button">Submit</button>
          </div>
        </div>
      </form>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { toast } from 'bulma-toast'

export default {
    props: ['formDetails'],
    setup(props) {

        let commonProps = reactive(
          {
             dateTime: '',
             bankId: 0,
             transactType: 0,
             customer: '',
             mobileNo: '',
             network: '',
             paymentDateTime: '',
             credit: 1,
             currentBalance: 1,
             amount: 1,
             remarks: '',
             message: '',
             attachment: '',
             location: ''
          }
        )
        
        const router = useRouter()

        const handleChange = () => {
          console.log(`Transaction Value: ${commonProps.transactType}`)
          console.log(`credit.value: ${commonProps.credit}`)
          console.log(`customer: ${commonProps.customer}`)
        }
        const handleSubmit = async () => {
          
          try {
            if(props.formDetails.componentId === 1) {
              
              let newBankData = {
                bank_id: commonProps.bankId,
                date_time: commonProps.dateTime,
                bank_transact_type_id: commonProps.transactType,
                current_balance: commonProps.currentBalance,
                amount: commonProps.amount,
                remarks: commonProps.remarks,
                location: commonProps.location
              }

              console.log(newBankData)
              
              if(commonProps.transactType === 1) {
                try {
                  await axios.post("http://localhost:5000/transactions/new-sa-depo", newBankData)
                  toast({
                    message: 'Successfully recorded Cash Deposit',
                    type: 'is-info',
                    position: "top-center",
                    dismissible: true,
                    pauseOnHover: true,
                    closeOnClick: true
                  })

                } catch (error) {
                  console.log(error)
                }
              } else if(commonProps.transactType === 2) {
                try {
                  await axios.post("http://localhost:5000/transactions/new-sa-wdraw", newBankData)
                  toast({
                    message: 'Successfully recorded Cash Withdraw',
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

            } else if(props.formDetails.componentId === 2) {

              let newGCashData = {
                gcash_id: 1,
                date_time: commonProps.dateTime,
                transaction_type_id: commonProps.transactType,
                current_gcash_balance: commonProps.currentBalance,
                amount: commonProps.amount,
                remarks: commonProps.remarks
              }

              if(commonProps.transactType === 1) {
                newGCashData.customer_id = commonProps.customer
                newGCashData.mobile_number = commonProps.mobileNo
                newGCashData.network = commonProps.network
                if(!commonProps.paymentDateTime) {
                  newGCashData.payment_date = null
                }

                try {
                  await axios.post("http://localhost:5000/transactions/new-gc-loadsale", newGCashData)
                  toast({
                    message: '[GCash] New Load Sale successfully posted to database',
                    type: 'is-info',
                    position: "top-center",
                    dismissible: true,
                    pauseOnHover: true,
                    closeOnClick: true
                  })
                } catch (error) {
                  console.log(error)
                }

              } else if(commonProps.transactType === 3) {
                try {
                  await axios.post("http://localhost:5000/transactions/new-gc-billspay", newGCashData)
                  toast({
                    message: '[GCash] New Bills payment successfully posted to database',
                    type: 'is-info',
                    position: "top-center",
                    dismissible: true,
                    pauseOnHover: true,
                    closeOnClick: true
                  })
                } catch (error) {
                  console.log(error)
                }
              } else if(commonProps.transactType === 4) {
                try {
                  await axios.post("http://localhost:5000/transactions/new-gc-income", newGCashData)
                  toast({
                    message: '[GCash] New Sale / Income successfully posted to database',
                    type: 'is-info',
                    position: "top-center",
                    dismissible: true,
                    pauseOnHover: true,
                    closeOnClick: true
                  })
                } catch (error) {
                  console.log(error)
                }
              } else if(commonProps.transactType === 5) {
                
                newGCashData.mobile_number = commonProps.mobileNo
                newGCashData.network = commonProps.network

                try {
                  await axios.post("http://localhost:5000/transactions/new-gc-selfbuyload", newGCashData)
                  toast({
                    message: '[GCash] New Self Buy Load successfully posted to database',
                    type: 'is-info',
                    position: "top-center",
                    dismissible: true,
                    pauseOnHover: true,
                    closeOnClick: true
                  })
                } catch (error) {
                  console.log(error)
                }
              } else if(commonProps.transactType === 8) {

                newGCashData.credit = commonProps.credit
                console.log(newGCashData)
                
                try {
                  await axios.post("http://localhost:5000/transactions/new-gc-adjustment", newGCashData)
                  toast({
                    message: '[GCash] New Adjustment successfully posted to database',
                    type: 'is-info',
                    position: "top-center",
                    dismissible: true,
                    pauseOnHover: true,
                    closeOnClick: true
                  })
                } catch (error) {
                  console.log(error)
                }
              } else if(commonProps.transactType === 9) {

                newGCashData.mobile_number = commonProps.mobileNo
                newGCashData.message = commonProps.message
                newGCashData.attachment = commonProps.attachment
                console.log(newGCashData)
                
                try {
                  await axios.post("http://localhost:5000/transactions/new-gc-sendmoney", newGCashData)
                  toast({
                    message: '[GCash] New Send Money w/ clip successfully posted to database',
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

              commonProps.dateTime = ''
              commonProps.bankId = 0
              commonProps.transactType = 0
              commonProps.customer = ''
              commonProps.mobileNo = ''
              commonProps.network = ''
              commonProps.paymentDateTime = ''
              commonProps.credit = 1,
              commonProps.currentBalance = 1,
              commonProps.amount = 1,
              commonProps.remarks = ''
              commonProps.location = ''
              router.push('/')
            }
          } catch (error) {
            console.log(error);
          }

        }

        return { 
          commonProps, 
          handleChange, 
          handleSubmit }
    }

}
</script>

<style scoped>

#main-form {
  opacity: 0;
  animation-name: wrapper-fadein;
  animation-duration: var(--anim-duration);
  animation-fill-mode: var(--anim-fill-mode);
}

@keyframes wrapper-fadein {
    to {
        opacity: 1;
    }
}

.white {
  color: #fff;
}

.flex-group {
  display: flex;
  justify-content: space-between;
}

.styled-button{
  box-shadow: 7px 6px 28px 1px rgba(0, 0, 0, 0.24);
}

.styled-button:active {
  box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  transform: scale(0.90);
}


</style>