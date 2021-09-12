<template>
  <div id="flex-container">
    <form id="main-form" @submit.prevent="handleSubmit">
      <div :class="formDetails.cardBorder">
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
              <select class="custom-select cselect-style" v-model="commonProps.transactType" @change="handleChange">
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
          <div class="form-group" v-if="formDetails.componentId === 1">
            <label class="col-form-label white">Current Bank Balance</label>
            <div class="form-group">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">₱</span>
                </div>
                <input type="text" class="form-control" v-model="commonProps.sa1Balance" required>
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
                <input type="text" class="form-control" v-model="commonProps.gcBalance" required>
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

import { gCashBalanceNc, getGCashBalNc } from '../composables/getGCashInfo'
import { sa1BalanceNc, getSa1BalNc } from '../composables/getSa1Info'

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
      });

      const router = useRouter()
      
      const handleChange = () => {
        console.log(`Transaction Value: ${commonProps.transactType}`)
        console.log(commonProps.gcBalance)
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
                await axios.post("http://localhost:5000/transactions/new-sa-depo", newBankData)
                toast({
                  message: '[Savings Account] New Cash Deposit successfully posted to database',
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
                  message: '[Savings Account] New Cash Withdraw successfully posted to database',
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
                await axios.post("http://localhost:5000/transactions/new-sa-gcash-cash-in", newBankData)
                toast({
                  message: '[Savings Account] New GCash Cash-in successfully posted to database',
                  type: 'is-info',
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
                await axios.post('http://localhost:5000/transactions/new-sa-transfer-money', newBankData)
                toast({
                  message: '[Savings Account] New Transfer Money successfully posted to database',
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

            } else if(commonProps.transactType === 2) {
              try {
                await axios.post("http://localhost:5000/transactions/new-gc-cash-in", newGCashData)
                toast({
                  message: '[GCash] New Cash-in successfully posted to database',
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
            } else if(commonProps.transactType === 7) {
              
              newGCashData.online_shop_website = commonProps.onlineShopWebsite

              try {
                await axios.post("http://localhost:5000/transactions/new-gc-ol-shop-pay", newGCashData)
                toast({
                  message: '[GCash] New Online Payment successfully posted to database',
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
        commonProps, 
        handleChange, 
        handleSubmit,
      }
    }

}
</script>

<style scoped>

#flex-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

#main-form {
  width: 20rem;
  opacity: 0;
  animation-name: wrapper-fadein;
  animation-duration: var(--anim-duration);
  animation-fill-mode: var(--anim-fill-mode);
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

.styled-button{
  box-shadow: 7px 6px 28px 1px rgba(0, 0, 0, 0.24);
}

.styled-button:active {
  box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  transform: scale(0.90);
}

@media all and (max-width: 700px) {
  #main-form {
    width: 96vw;
    font-size: 1.5rem;
  }

  .cselect-style {
    width: 18rem;
  }

  #btn-container {
    display: flex;
    justify-content: center;
  }

  .styled-button{
    transform: scale(1.5);    
  }

  #main-form input, #main-form select, #main-form textarea {
    font-size: 1.5rem;
  }

}

</style>