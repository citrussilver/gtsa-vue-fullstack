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
            <select class="custom-select" v-model="commonProps.bankId" @change="trackSelection(commonProps.bankId, 'sa')">
              <option v-for="bank in savingsAccs" :key="bank.bank_id" :value="bank.bank_id">{{ bank.bank_name }} - {{ bank.bank_abbrev }}</option>
            </select>
          </div>
          <div class="form-group" v-if="formDetails.componentId === 3">
            <select class="custom-select" v-model="ccProps.ccId" @change="trackSelection(ccProps.ccId, 'cc')">
              <option v-for="creditCard in creditCards" :key="creditCard.credit_card_id" :value="creditCard.credit_card_id">{{ creditCard.last_4_digits }} - {{ creditCard.cc_name }}</option>
            </select>
          </div>
          <div class="form-group">
              <select class="custom-select cselect-style" v-model="commonProps.transactType" @change="trackSelection(commonProps.transactType, 'tt')">
                  <option v-for="transact in formDetails.transactType" :key="transact.val" :value="transact.val">{{transact.title}}</option>
              </select>
          </div>
          <div class="form-group" v-if="formDetails.componentId === 2 && commonProps.transactType === 9">
            <select class="custom-select send-money-type" v-model="commonProps.sendMoneyType">
              <option value="1">Express Send</option>
              <option value="2">Send via QR</option>
              <option value="3">Send with a Clip</option>
              <option value="4">Send Gift</option>
            </select>
          </div>
          <div class="flex-group">
            <div class="form-group" v-if="formDetails.componentId === 2 && commonProps.transactType === 1">
              <label class="col-form-label white">Customer</label><br>
              <select class="custom-select customer-select-style" v-model="commonProps.customer" @change="trackSelection(commonProps.customer, 'gcash')">
                <option v-for="customer in customers" :key="customer.customer_id" :value="customer.customer_id">{{ customer.name }}</option>
              </select>
            </div>
            <div class="form-group" v-if="formDetails.componentId === 2 && (commonProps.transactType === 5 || commonProps.transactType === 1 || commonProps.transactType === 9)">
              <label class="col-form-label white">{{ commonProps.transactType === 5 ? 'Own Mobile Numbers':'Mobile Number' }}</label><br>
              <input type="number" v-if="(formDetails.componentId === 2  && commonProps.transactType != 5 )" class="form-control customer-select-style" pattern=" 0+\.[0-9]*[1-9][0-9]*$" @keydown="digitOnlyInput" v-model="commonProps.mobileNo">
              <select v-else class="custom-select own-numbers" v-model="commonProps.mobileNo">
                <option value="0">-- Select Mobile No. --</option>
                <option value="09755512192">TM - 09755512192</option>
                <option value="09369700679">GCash No. - 0936970679</option>
                <option value="09157611994">Globe / BPI OTP - 09157611994</option>
                <option value="09179561248">Globe / Grab - 09179561248</option>
              </select>
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
          <div class="form-group" v-if="(formDetails.componentId === 1 && commonProps.transactType === 7 || formDetails.componentId === 2 && commonProps.transactType === 8)">
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
                <input type="text" class="form-control border-success" style="background-color: #303030; color: white;" v-model="commonProps.saBalance" disabled>
              </div>
            </div>
          </div>
          <div class="form-group" v-if="formDetails.componentId === 3">
            <label class="col-form-label white">Current Available Credit Limit</label>
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">₱</span>
                </div>
                <input type="text" class="form-control border-danger" style="background-color: #303030; color: white;" v-model="ccProps.availCreditLimit" disabled>
              </div>
              <div id="cl-notice"></div>
            </div>
          </div>
          <div class="form-group" v-if="formDetails.componentId === 2">
            <label class="col-form-label white">Current GCash Balance</label>
            <div class="form-group">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">₱</span>
                </div>
                <input type="text" class="form-control border-primary" style="background-color: #303030; color: white;" v-model="commonProps.gcBalance" disabled>
              </div>
            </div>
          </div>
          <div class="form-group" v-if="(formDetails.componentId === 3) || (formDetails.componentId === 2 && commonProps.transactType === 11 )">
            <label class="control-label white">Description</label><br>
            <input type="text" class="form-control" v-model="commonProps.description"/>
          </div>
          <div class="form-group">
            <label class="control-label white">{{ (formDetails.componentId === 2 && commonProps.transactType === 4) ? 'Sale / Income Received:' : 'Amount'}}</label>
            <div class="form-group">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">₱</span>
                </div>
                <input type="number" class="form-control" step="any" pattern=" 0+\.[0-9]*[1-9][0-9]*$" @keypress="digitOnlyInput" v-model="commonProps.amount" required>
              </div>
            </div>
          </div>
          <div class="form-group" v-if="formDetails.componentId === 2 && commonProps.transactType === 6">
            <label class="control-label white">Acct Name</label><br>
            <input type="text" class="form-control" v-model="commonProps.acctName"/>
            <label class="control-label white">Acct Number</label><br>
            <input type="text" class="form-control" v-model="commonProps.acctNo"/>
          </div>
          <div class="form-group" v-if="formDetails.componentId === 2 && commonProps.transactType === 7">
            <label class="control-label white">Online Service / Shop Website:</label>
            <select class="custom-select" v-model="commonProps.onlineShopWebsite">
                <option value="Steam">Steam</option>
                <option value="Shopee">Shopee Pay Top-up</option>
                <option value="Lazada">Lazada Wallet Top-up</option>
                <option value="Google Play">Google Play</option>
                <option value="Food Panda PH">Food Panda</option>
                <option value="GrabPay">GrabPay</option>
                <option value="Youtube Membership">Youtube Membership</option>
                <option value="Twitch Membership">Twitch Membership</option>
                <option value="OF Subscription">OF Subscription</option>
              </select>
          </div>
          <div class="form-group" v-if="formDetails.componentId === 3 && (commonProps.transactType === 1 || commonProps.transactType === 2)">
            <label class="control-label white">{{ commonProps.transactType === 1 ? 'Online Shop Website:' : 'Physical Store Name'}}</label>
            <select v-if="commonProps.transactType === 1" class="custom-select" v-model="commonProps.onlineShopWebsite">
                <option value="Google Play">Google Play</option>
                <option value="Steam">Steam</option>
                <option value="GOG">GOG</option>
                <option value="Grab">Grab</option>
                <option value="Patreon">Patreon</option>
                <option value="Gumroad">Gumroad</option>
                <option value="Others">Others</option>
            </select>
            <input v-else type="text" class="form-control" v-model="commonProps.storeName">
          </div>
          <div class="form-group" v-if="formDetails.componentId === 2 && commonProps.transactType === 11">
            <label class="control-label white">Store Name:</label><br>
            <input type="text" class="form-control" v-model="commonProps.storeName"/>
          </div>
          <div class="form-group" v-if="formDetails.componentId === 3 && commonProps.transactType === 3">
            <label class="control-label white">Term</label>
            <select class="custom-select" v-model="commonProps.term">
                <option value="Monthly">Monthly</option>
                <option value="6 Months">6 Months</option>
                <option value="12 Months">12 Months</option>
              </select>
          </div>
          <div class="form-group" v-if="formDetails.componentId === 3 && commonProps.transactType === 3">
            <label class="control-label white">Term Payment</label><br>
            <input type="number" class="form-control" min="1" step="any" pattern=" 0+\.[0-9]*[1-9][0-9]*$" @keypress="digitOnlyInput" v-model="commonProps.termPay"/>
          </div>
          <div class="form-group" v-if="formDetails.componentId === 3 && commonProps.transactType === 3">
            <label class="control-label white">Transaction No.</label><br>
            <input type="text" class="form-control" placeholder="Ask the agent about Transaction No." v-model="commonProps.loanTransactNo"/>
          </div>
          <div class="form-group" v-if="formDetails.componentId === 3 && commonProps.transactType === 3">
            <label class="control-label white">Agent Name</label><br>
            <input type="text" class="form-control" v-model="commonProps.loanAgentName"/>
          </div>
          <div class="form-group" v-if="formDetails.componentId === 3 && commonProps.transactType === 3">
            <label class="control-label white">Loan Thru</label>
            <select class="custom-select" v-model="commonProps.loanThru">
                <option value="phone">Phone</option>
                <option value="branch">Branch</option>
              </select>
          </div>
          <div class="form-group" v-if="formDetails.componentId === 2 && commonProps.transactType === 9">
            <label class="control-label white">Message</label><br>
            <textarea class="form-control" rows="3" v-model="commonProps.message"/>
          </div>
          <div class="form-group" v-if="formDetails.componentId === 2 && commonProps.transactType === 9 && commonProps.sendMoneyType === 3">
            <label class="control-label white">Attachment:</label><br>
            <select class="custom-select" v-model="commonProps.attachment">
              <option value="None">None</option>
              <option value="Photo" selected>Photo</option>
              <option value="Video">Video</option>
              <option value="Audio">Audio</option>
            </select>
          </div>
          <div class="form-group" v-if="((formDetails.componentId === 1) || (formDetails.componentId === 2 && commonProps.transactType != 11)) || (formDetails.componentId === 3)">
            <label class="control-label white">Remarks</label><br>
            <textarea class="form-control" rows="3" v-model="commonProps.remarks"/>
          </div>
          <div class="form-group" v-if="formDetails.componentId === 1">
            <label class="col-form-label white">Location</label><br>
            <select class="custom-select" v-model="commonProps.location">
              <option value="Select">-- Select App / Location --</option>
              <option value="App">App</option>
              <option value="ATM">ATM</option>
              <option value="Automatic Activity">Automatic Activity</option>
            </select>
          </div>
          <div id="btn-container"><button type="submit" class="btn btn-outline-success styled-button">Submit</button></div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { toast } from 'bulma-toast'
import config from '../config'

import { gCash1Bal, getGCashInfo } from '../composables/getGCashInfo.js'
import { savingsAccs, getSavingsAccs } from '../composables/getBanksInfo.js'
import { creditCards, getCreditCards  } from '../composables/getCcsInfo.js'
import { customers, getCustomers } from '../composables/getCustomers.js'

export default {
    props: ['formDetails'],
    setup(props) {

      let commonProps = reactive(
        {
          dateTime: '',
          bankId: 1,
          gCashId: 1,
          transactType: 0,
          customer: '',
          mobileNo: '0',
          network: 'Globe',
          paymentDateTime: '',
          credit: 1,
          saName: '',
          saBalance: 1,
          gcBalance: 1,
          receipientAcctNo: '',
          acctName: '',
          acctNo: '',
          amount: 1,
          term: 'Monthly',
          termPay: 1,
          loanThru: '',
          loanTransactNo: '',
          loanAgentName: '',
          description: '',
          sendMoneyType: 1,
          onlineShopWebsite: 'Google Play',
          storeName: '',
          remarks: '',
          message: '',
          attachment: 'Photo',
          location: 'Select'
        }
      )

      let ccProps = reactive(
        {
          ccId: 1,
          dateTime: '',
          transactType: 1, 
          amount: 1,
          remarks: '',
          availCreditLimit: 1,
        }
      )

      const router = useRouter()

      const setSavingsAcc = (val) => {
        let index = ref(0)
        index.value = val-1
        console.log(commonProps.bankId)
        commonProps.saBalance = savingsAccs.value[index.value].balance
        if(val === 1) {
          commonProps.location = 'BPI App'
        } else {
          commonProps.location = 'SB App'
        }
      }

      const setCc = (val) => {
        let index = ref(0)
        index.value = val-1
        console.log(creditCards.value[index.value].avail_credit_limit)
        ccProps.ccId = creditCards.value[index.value].credit_card_id
        console.log('cc id is ' + ccProps.ccId)
        ccProps.availCreditLimit = creditCards.value[index.value].avail_credit_limit
      }

      const setGCashAcc = () => {
        commonProps.gcBalance = gCash1Bal.value
      }
      
      const trackSelection = (val, flag) => {
        // console.log(val, flag)
        if(flag === 'sa') {
          setSavingsAcc(val)
        }

        if(flag === 'cc') {
          setCc(val)
        }

        if(flag === 'tt') {
          commonProps.transactType = val
        }
      }

      const digitOnlyInput = (event) => {
        return event.charCode >= 48 && event.charCode <= 57
      }

      const handleAxios = async (route, objData, type, specific) => {
        await axios.post(`${route}`, objData)
        .then(response => {

          toast({
            message: `[${type}] New ${specific} successfully posted to database`,
            duration: 3000,
            type: 'is-warning',
            position: "top-center",
            dismissible: true,
            pauseOnHover: true,
            closeOnClick: true
          })
        })
        .catch(err => {
          console.log(err);
        })
      }

      const handleSubmit = async () => {
        
        try {
          if(props.formDetails.componentId === 1) {
            
            let newBankData = {
              bank_id: commonProps.bankId,
              date_time: commonProps.dateTime,
              bank_transact_type_id: commonProps.transactType,
              current_balance: commonProps.saBalance,
              current_gcash_balance: commonProps.gcBalance,
              amount: commonProps.amount,
              remarks: commonProps.remarks,
              location: commonProps.location
            }

            console.log(newBankData)
            
            if(commonProps.transactType === 1) {

              handleAxios(`${config.apiUrl}/sa/save-sa-depo`, newBankData, 'Savings Account', 'Cash Deposit')

            } else if(commonProps.transactType === 2) {

              handleAxios(`${config.apiUrl}/sa/save-sa-wdraw`, newBankData, 'Savings Account', 'Cash Withdraw')

            } else if(commonProps.transactType === 3) {

              handleAxios(`${config.apiUrl}/sa/save-sa-billspay`, newBankData, 'Savings Account', 'Bills Payment')

            } else if(commonProps.transactType === 4) {

              newBankData.gcash_id = commonProps.gCashId
              newBankData.remarks = '[GCash Cash-in]' + commonProps.remarks

              handleAxios(`${config.apiUrl}/sa/save-gc-cash-in`, newBankData, 'Savings Account', 'GCash Cash-in')

            } else if(commonProps.transactType === 5) {

              newBankData.receipient_acct_no = commonProps.receipientAcctNo

              handleAxios(`${config.apiUrl}/sa/save-sa-prepaid-reload`, newBankData, 'Savings Account', 'Reload Prepaid')

            } else if(commonProps.transactType === 6) {

              newBankData.receipient_acct_no = commonProps.receipientAcctNo

              handleAxios(`${config.apiUrl}/sa/save-sa-transfer-money`, newBankData, 'Savings Account', 'Transfer Money')

            } else if(commonProps.transactType === 7) {

              // Adjustment
              // properties are manually added which are unique only to this transaction
              newBankData.credit = commonProps.credit
              newBankData.remarks = '[Adjustment] ' + newBankData.remarks

              handleAxios(`${config.apiUrl}/sa/save-sa-adjustment`, newBankData, 'Savings Account', 'Adjustment')

            } else if(commonProps.transactType === 8) {

              handleAxios(`${config.apiUrl}/sa/save-sa-earn-interest`, newBankData, 'Savings Account', 'Earn Interest')

            }  else if(commonProps.transactType === 9) {

              handleAxios(`${config.apiUrl}/sa/save-sa-taxwh`, newBankData, 'Savings Account', 'Tax Witheld')

            } else if(commonProps.transactType === 10) {
              // Salary / Income

              handleAxios(`${config.apiUrl}/sa/save-sa-sale-income`, newBankData, 'Savings Account', 'Salary / Income')
              
            }
          } else if(props.formDetails.componentId === 2) {

            let newGCashData = {
              gcash_id: 1,
              date_time: commonProps.dateTime,
              transact_type_id: commonProps.transactType,
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
              
              handleAxios(`${config.apiUrl}/gcash/save-loadsale`, newGCashData, 'GCash', 'Load Sale')

            } else if(commonProps.transactType === 3) {
              
              newGCashData.remarks = '[Bills Payment] ' + newGCashData.remarks

              handleAxios(`${config.apiUrl}/gcash/save-gc-billspay`, newGCashData, 'GCash', 'Bills payment')

            } else if(commonProps.transactType === 4) {

              newGCashData.remarks = '[Sale / Income] ' + newGCashData.remarks

              handleAxios(`${config.apiUrl}/gcash/save-gc-income`, newGCashData, 'GCash', 'New Sale / Income')

            } else if(commonProps.transactType === 5) {
              
              newGCashData.mobile_number = commonProps.mobileNo
              newGCashData.network = commonProps.network

              newGCashData.remarks = '[Self Buy Load] ' + newGCashData.remarks

              handleAxios(`${config.apiUrl}/gcash/save-selfbuyload`, newGCashData, 'GCash', 'Self Buy Load')

            } else if(commonProps.transactType === 6) {
              
              newGCashData.acct_no = commonProps.acctNo
              newGCashData.acct_name = commonProps.acctName

              newGCashData.remarks = '[Bank Transfer] ' + newGCashData.remarks

              handleAxios(`${config.apiUrl}/gcash/save-gc-banktransfer`, newGCashData, 'GCash', 'Bank Transfer')

            } else if(commonProps.transactType === 7) {
              
              newGCashData.online_shop_website = commonProps.onlineShopWebsite
              newGCashData.remarks = '[Online Payment] ' + newGCashData.remarks

              handleAxios(`${config.apiUrl}/gcash/save-ol-shop-pay`, newGCashData, 'GCash', 'Online Payment')

            } else if(commonProps.transactType === 8) {

              newGCashData.credit = commonProps.credit
              newGCashData.remarks = '[Adjustment] ' + newGCashData.remarks

              handleAxios(`${config.apiUrl}/gcash/save-gc-adjustment`, newGCashData, 'GCash', 'New Adjustment')
              
            } else if(commonProps.transactType === 9) {

              newGCashData.mobile_number = commonProps.mobileNo

              if(commonProps.sendMoneyType === 1) {
                newGCashData.type = 'Express Send'
                newGCashData.message = commonProps.message
                newGCashData.attachment = 'N/A'
              } else if (commonProps.sendMoneyType === 2) {
                newGCashData.type = 'Send via QR'
                newGCashData.message = 'N/A'
                newGCashData.attachment = 'N/A'
              } else if (commonProps.sendMoneyType === 3) {
                newGCashData.type = 'Send with a Clip'
                newGCashData.message = commonProps.message
                newGCashData.attachment = commonProps.attachment
              } else {
                newGCashData.type  = 'Send Gift'
                newGCashData.message = commonProps.message
                newGCashData.attachment = 'N/A'
              }
              
              newGCashData.remarks = `[${newGCashData.type}] ${newGCashData.remarks}`
              console.log(newGCashData.remarks)

              handleAxios(`${config.apiUrl}/gcash/save-gc-sendmoney`, newGCashData, 'GCash', 'Send Money')

            } else if(commonProps.transactType === 10) {

              newGCashData.remarks = '[Refund] ' + newGCashData.remarks

              handleAxios(`${config.apiUrl}/gcash/save-gc-refund`, newGCashData, 'GCash', 'Refund')

            } else if(commonProps.transactType === 11) {

              newGCashData.store_name = commonProps.storeName
              newGCashData.description = '[Pay QR] ' + commonProps.description
              newGCashData.remarks = newGCashData.description

              handleAxios(`${config.apiUrl}/gcash/save-pay-qr`, newGCashData, 'GCash', 'Pay QR')

            } else if (commonProps.transactType === 12) {
              newGCashData.remarks = '[Received Money] ' + newGCashData.remarks

              handleAxios('/gcash/save-received-money', newGCashData, 'GCash', 'Received Money')
            }
          } else if(props.formDetails.componentId === 3) {
            let newCCData = {
              credit_card_id: ccProps.ccId,
              date_time: commonProps.dateTime,
              transact_type_id: commonProps.transactType,
              description: commonProps.description,
              amount: commonProps.amount,
              remarks: commonProps.remarks,
            }

            if (commonProps.transactType === 1) {
              newCCData.online_shop_website = commonProps.onlineShopWebsite
              newCCData.remarks = '[Online Payment] ' + newCCData.remarks

              handleAxios(`${config.apiUrl}/cc/save-cc-op`, newCCData, 'Credit Card', 'Online Payment')

            } else if (commonProps.transactType === 2){
              newCCData.store_name = commonProps.storeName
              newCCData.remarks = '[Non-Online Payment] ' + newCCData.remarks

              handleAxios(`${config.apiUrl}/cc/new-cc-nop`, newCCData, 'Credit Card', 'Non-Online Payment')

            } else {
              if(!newCCData.description) {
                newCCData.description =  '[Credit-to-Cash Promo Loan]'
              }
              newCCData.loan_thru = commonProps.loanThru
              newCCData.loan_transact_no = commonProps.loanTransactNo
              newCCData.loan_agent_name = commonProps.loanAgentName
              newCCData.term = commonProps.term
              newCCData.term_pay = commonProps.termPay

              handleAxios(`${config.apiUrl}/cc/save-cc-loan`, newCCData, 'Credit Card', 'Credit-to-Cash Loan')

            }
          }
          commonProps.dateTime = ''
          commonProps.bankId = 1
          commonProps.transactType = 1
          commonProps.customer = ''
          commonProps.mobileNo = ''
          commonProps.network = ''
          commonProps.paymentDateTime = ''
          commonProps.credit = 1,
          commonProps.amount = 1,
          commonProps.remarks = '',
          commonProps.message = '',
          commonProps.attachment = 'Photo',
          commonProps.location = ''
          router.push('/')
        } catch (error) {
          console.log(error);
          router.push('/')
        }

      }

      onMounted(async () => {
         if(props.formDetails.componentId === 1) {
          await getSavingsAccs()
          setSavingsAcc(1)
          setGCashAcc()
        }

        if(props.formDetails.componentId === 2) {
          await getGCashInfo()
          setGCashAcc()
          getCustomers()
        }
        
        if(props.formDetails.componentId === 3) {
          await getCreditCards()
          setCc(1)
        }
      })

      return { 
        savingsAccs,
        creditCards,
        customers,
        commonProps, 
        ccProps, 
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

.elec-red {
  color: #DE0000;
}

#cl-notice::after {
  color: #fff;
  text-shadow: 0 0 5px #cf1c01, 0 0 5px #cf1c01, 0 0 5px #cf1c01, 0 0 5px #cf1c01;
  content: '*please check regularly on bank';
  font-size: 0.7rem;
}

.send-money-type {
  width: 9rem;
}

@media screen and (max-width: 700px) {

  #main-form {
    width: 99vw; /* To expand common forms*/
    font-size: 1.5rem;
  }

  .main-form-content {
    margin: 0 0.5rem;
  }
  
  .cselect-style {
    width: 18rem;
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

  .styled-button{
    transform: scale(1.5);
  }

  #after-content {
    color: orange;
  }
  
  #cl-notice::after {
    font-size: 1rem;
  }

  .send-money-type {
    width: 12rem;
  }
}

</style>