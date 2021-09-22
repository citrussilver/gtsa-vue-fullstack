<template>
  <div id="flex-container">
    <form id="main-form" @submit.prevent="handleSubmit">
      <div :class="formDetails.cardBorder" class="main-form-content">
        <div class="card-header white">{{formDetails.header}}</div>
        <div class="card-body">
          <div class="form-group">
            <label class="col-form-label white">Date</label>
            <input type="datetime-local" class="form-control" v-model="commonProps.dateTime" required>
          </div>
          <div class="form-group" v-if="formDetails.componentId === 1">
            <select class="custom-select" v-model="commonProps.bankId">
              <option value="0">--Choose Bank--</option>
              <option value="1">Northland Bank</option>
            </select>
          </div>
          <div class="form-group">
              <select class="custom-select cselect-style" v-model="commonProps.transactType">
                  <option v-for="transact in formDetails.transactType" :key="transact.val" :value="transact.val">{{transact.title}}</option>
              </select>
          </div>
          <div class="flex-group">
            <div class="form-group" v-if="formDetails.componentId === 2 && commonProps.transactType === 1">
              <label class="col-form-label white">Customer</label><br>
              <select class="custom-select customer-select-style" v-model="commonProps.customer" @change="trackSelection(commonProps.customer)">
                <option v-for="customer in customers" :key="customer.customer_id" :value="customer.customer_id">{{ customer.name }}</option>
              </select>
            </div>
            <div class="form-group" v-if="formDetails.componentId === 2 && (commonProps.transactType === 5 || commonProps.transactType === 1 || commonProps.transactType === 9)">
              <label class="col-form-label white">Mobile Number</label><br>
              <input type="number" class="form-control customer-select-style" pattern=" 0+\.[0-9]*[1-9][0-9]*$" @keydown="digitOnlyInput" v-model="commonProps.mobileNo">
            </div>
          </div>
          <div class="flex-group">
            <div class="form-group" v-if="formDetails.componentId === 2 && (commonProps.transactType === 5 || commonProps.transactType === 1)" style="width: 5rem;">
              <label class="col-form-label white">Network</label><br>
              <select class="custom-select" v-model="commonProps.network" style="width: 6.5rem;">
                <option value="TM">TM</option>
                <option value="Globe">Globe</option>
                <option value="TNT">TNT</option>
                <option value="Smart">Smart</option>
              </select>
            </div>
            <div class="form-group" v-if="formDetails.componentId === 2 && commonProps.transactType === 1">
              <label class="col-form-label white">Payment Date / Time</label>
              <input type="datetime-local" class="form-control pay-mobile-res" v-model="commonProps.paymentDateTime">
            </div>
          </div>
          <div class="form-group" v-if="formDetails.componentId === 2 && commonProps.transactType === 8">
            <label class="col-form-label white">Credit or Debit?</label><br>
            <select class="custom-select" v-model="commonProps.credit" style="width: 6rem;">
              <option value="1" selected>Credit</option>
              <option value="0">Debit</option>
            </select>
          </div>
          <div class="form-group" v-if="formDetails.componentId === 1">
            <label class="col-form-label white">Current Bank Balance</label>
            <div class="form-group">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">₱</span>
                </div>
                <input type="text" class="form-control" style="border: 0.3px solid rgba(0, 188, 140, 1); background-color: #303030; color: white;" v-model="commonProps.sa1Balance" disabled>
              </div>
            </div>
          </div>
          <div class="form-group" v-if="formDetails.componentId === 2">
            <label class="col-form-label white">Current GCash Balance</label>
            <div class="form-group">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">₱</span>
                </div>
                <input type="text" class="form-control" style="border: 0.3px solid rgba(0, 150, 255, 1); background-color: #303030; color: white;" v-model="commonProps.gcBalance" disabled>
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
                <input type="number" class="form-control" min="1" step="any" pattern=" 0+\.[0-9]*[1-9][0-9]*$" @keypress="digitOnlyInput" v-model="commonProps.amount" required>
              </div>
            </div>
          </div>
          <div class="form-group" v-if="formDetails.componentId === 2 && commonProps.transactType === 7">
            <label class="control-label white">Online Shop Website:</label>
            <select class="custom-select" v-model="commonProps.onlineShopWebsite">
                <option value="shp">Shopee Pay Top-up</option>
                <option value="lzd">Lazada Wallet Top-up</option>
                <option value="gplay">Google Play</option>
              </select>
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
              <option value="None">None</option>
              <option value="Photo" selected>Photo</option>
              <option value="Video">Video</option>
              <option value="Audio">Audio</option>
            </select>
          </div>
          <div class="form-group" v-if="formDetails.componentId === 1">
            <label class="col-form-label white">Location</label><br>
            <input type="text" class="form-control" v-model="commonProps.location" required>
          </div>
          <div id="btn-container"><button type="submit" class="btn btn-outline-success styled-button">Submit</button></div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { toast } from 'bulma-toast'
import config from '../config'

import { gCashBalanceNc, getGCashBalNc } from '../composables/getGCashInfo'
import { sa1BalanceNc, getSa1BalNc } from '../composables/getSa1Info'
import { customers, getCustomers } from '../composables/getCustomers'

export default {
    props: ['formDetails'],
    setup(props) {

      let commonProps = reactive(
        {
          dateTime: '',
          bankId: 1,
          transactType: 0,
          customer: '',
          mobileNo: '',
          network: '',
          paymentDateTime: '',
          credit: 1,
          sa1Name: '',
          sa1Balance: sa1BalanceNc,
          gcBalance: gCashBalanceNc,
          receipientAcctNo: '',
          amount: 1,
          onlineShopWebsite: '',
          remarks: '',
          message: '',
          attachment: '',
          location: ''
          }
      )

      onMounted(async () => {
        await getGCashBalNc()
        await getSa1BalNc()
        await getCustomers()
      });

      const router = useRouter()
      
      const trackSelection = (value) => {
        console.log(value)
      }

      const digitOnlyInput = (event) => {
        return event.charCode >= 48 && event.charCode <= 57
      }

      const handleSubmit = async () => {
        
        try {
          if(props.formDetails.componentId === 1) {
            
            let newBankData = {
              bank_id: commonProps.bankId,
              date_time: commonProps.dateTime,
              bank_transact_type_id: commonProps.transactType,
              current_balance: commonProps.sa1Balance,
              current_gcash_balance: commonProps.gcBalance,
              amount: commonProps.amount,
              remarks: commonProps.remarks,
              location: commonProps.location
            }

            console.log(newBankData)
            
            if(commonProps.transactType === 1) {
              try {
                await axios.post(`${config.apiUrl}/transactions/new-sa-depo`, newBankData)
                toast({
                  message: '[Savings Account] New Cash Deposit successfully posted to database',
                  duration: 3000,
                  type: 'is-warning',
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
                await axios.post(`${config.apiUrl}/transactions/new-sa-wdraw`, newBankData)
                toast({
                  message: '[Savings Account] New Cash Withdraw successfully posted to database',
                  duration: 3000,
                  type: 'is-warning',
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
                await axios.post(`${config.apiUrl}/transactions/new-sa-gcash-cash-in`, newBankData)
                toast({
                  message: '[Savings Account] New GCash Cash-in successfully posted to database',
                  duration: 3000,
                  type: 'is-warning',
                  position: "top-center",
                  dismissible: true,
                  pauseOnHover: true,
                  closeOnClick: true
                })
              } catch (error) {
                console.log(error)
              }
            } else if(commonProps.transactType === 6) {

              newBankData.receipient_acct_no = commonProps.receipientAcctNo

              try {
                await axios.post(`${config.apiUrl}/transactions/new-sa-transfer-money`, newBankData)
                toast({
                  message: '[Savings Account] New Transfer Money successfully posted to database',
                  duration: 3000,
                  type: 'is-warning',
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
              current_gcash_balance: commonProps.gcBalance,
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
              newGCashData.remarks = '[Load Sale] ' + newGCashData.remarks

              try {
                await axios.post(`${config.apiUrl}/transactions/new-gc-loadsale`, newGCashData)
                toast({
                  message: '[GCash] New Load Sale successfully posted to database',
                  duration: 3000,
                  type: 'is-warning',
                  position: "top-center",
                  dismissible: true,
                  pauseOnHover: true,
                  closeOnClick: true
                })
              } catch (error) {
                console.log(error)
              }

            } else if(commonProps.transactType === 2) {

              newGCashData.remarks = '[Cash-In] ' + newGCashData.remarks

              try {
                await axios.post(`${config.apiUrl}/transactions/new-gc-cash-in`, newGCashData)
                toast({
                  message: '[GCash] New Cash-in successfully posted to database',
                  duration: 3000,
                  type: 'is-warning',
                  position: "top-center",
                  dismissible: true,
                  pauseOnHover: true,
                  closeOnClick: true
                })
              } catch (error) {
                console.log(error)
              }
            } else if(commonProps.transactType === 3) {
              
              newGCashData.remarks = '[Bills Payment] ' + newGCashData.remarks

              try {
                await axios.post(`${config.apiUrl}/transactions/new-gc-billspay`, newGCashData)
                toast({
                  message: '[GCash] New Bills payment successfully posted to database',
                  duration: 3000,
                  type: 'is-warning',
                  position: "top-center",
                  dismissible: true,
                  pauseOnHover: true,
                  closeOnClick: true
                })
              } catch (error) {
                console.log(error)
              }
            } else if(commonProps.transactType === 4) {

              newGCashData.remarks = '[Sale / Income] ' + newGCashData.remarks

              try {
                await axios.post(`${config.apiUrl}/transactions/new-gc-income`, newGCashData)
                toast({
                  message: '[GCash] New Sale / Income successfully posted to database',
                  duration: 3000,
                  type: 'is-warning',
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

              newGCashData.remarks = '[Self Buy Load] ' + newGCashData.remarks

              try {
                await axios.post(`${config.apiUrl}/transactions/new-gc-selfbuyload`, newGCashData)
                toast({
                  message: '[GCash] New Self Buy Load successfully posted to database',
                  duration: 3000,
                  type: 'is-warning',
                  position: "top-center",
                  dismissible: true,
                  pauseOnHover: true,
                  closeOnClick: true
                })
              } catch (error) {
                console.log(error)
              }
            } else if(commonProps.transactType === 7) {
              
              newGCashData.online_shop_website = commonProps.onlineShopWebsite
              newGCashData.remarks = '[Online Payment] ' + newGCashData.remarks

              try {
                await axios.post(`${config.apiUrl}/transactions/new-gc-ol-shop-pay`, newGCashData)
                toast({
                  message: '[GCash] New Online Payment successfully posted to database',
                  duration: 3000,
                  type: 'is-warning',
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
              newGCashData.remarks = '[Adjustment] ' + newGCashData.remarks
              
              try {
                await axios.post(`${config.apiUrl}/transactions/new-gc-adjustment`, newGCashData)
                toast({
                  message: '[GCash] New Adjustment successfully posted to database',
                  duration: 3000,
                  type: 'is-warning',
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
              newGCashData.remarks = '[Send Money w/ clip] ' + newGCashData.remarks
              
              try {
                await axios.post(`${config.apiUrl}/transactions/new-gc-sendmoney`, newGCashData)
                toast({
                  message: '[GCash] New Send Money w/ clip successfully posted to database',
                  duration: 3000,
                  type: 'is-warning',
                  position: "top-center",
                  dismissible: true,
                  pauseOnHover: true,
                  closeOnClick: true
                })
              } catch (error) {
                console.log(error)
              }
            } else if(commonProps.transactType === 10) {

              newGCashData.remarks = '[Refund] ' + newGCashData.remarks

              try {
                await axios.post(`${config.apiUrl}/transactions/new-gc-refund`, newGCashData)
                toast({
                  message: '[GCash] New Refund successfully posted to database',
                  duration: 3000,
                  type: 'is-warning',
                  position: "top-center",
                  dismissible: true,
                  pauseOnHover: true,
                  closeOnClick: true
                })
              } catch (error) {
                console.log(error)
              }
            }
          }
          commonProps.dateTime = ''
          commonProps.bankId = 1
          commonProps.transactType = 0
          commonProps.customer = ''
          commonProps.mobileNo = ''
          commonProps.network = ''
          commonProps.paymentDateTime = ''
          commonProps.credit = 1,
          commonProps.amount = 1,
          commonProps.remarks = '',
          commonProps.message = '',
          commonProps.attachment = '',
          commonProps.location = ''
          router.push('/')
        } catch (error) {
          console.log(error);
          router.push('/')
        }

      }

      return { 
        customers,
        commonProps, 
        trackSelection, 
        handleSubmit,
        digitOnlyInput,
      }
    }

}
</script>

<style scoped>

#main-form {
  width: 22rem;
}

.cselect-style {
  width: 12rem;
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

@media screen and (max-width: 700px) {

  #main-form {
    width: 96vw;
    font-size: 1.5rem;
  }

  .main-form-content {
    margin: 0 0.5rem;
  }

  .customer-select-style {
    width: 11.5rem;
  }

  #btn-container {
    display: flex;
    justify-content: center;
  }

  #main-form input, #main-form select, #main-form textarea {
    font-size: 1.5rem;
  }

  .pay-mobile-res {
    width: 11.5rem;
  }
}

</style>