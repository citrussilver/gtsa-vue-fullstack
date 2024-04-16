<template>
  <div id="flex-container">

    <form id="main-form" @submit.prevent="handleSubmit">

      <div :class="formDetails.cardBorder" class="main-form-content">

        <div class="card-header white">New {{formDetails.header}}</div>

        <div class="card-body">

          <div class="form-group">
            <label class="col-form-label white">Date</label>
            <input type="datetime-local" class="form-control" v-model="commonProps.dateTime" required>
          </div>

          <div class="form-group" v-if="formDetails.componentId === consts.bank_component_id">
            <select class="custom-select" v-model="bankObject.bankId" @change="trackSelection($event.target.selectedIndex, 'sa')">
              <option v-for="(bank, index) in savingsAcctData" :key="index" :value="bank.bank_id">{{ bank.bank_name }} - {{ bank.bank_abbrev }}</option>
            </select>
          </div>

          <div class="form-group" v-if="formDetails.componentId === consts.cc_component_id">
            <select class="custom-select" v-model="ccProps.ccId" @change="trackSelection($event.target.selectedIndex, 'cc')">
              <option v-for="(creditCard, index) in creditCardsData" :key="index" :value="creditCard.credit_card_id">{{ creditCard.last_4_digits }} - {{ creditCard.cc_name }}</option>
            </select>
          </div>

          <div class="form-group">
              <select class="custom-select cselect-style" v-model="commonProps.transactType" @change="trackSelection(commonProps.transactType, 'tt')">
                  <option v-for="transact in formDetails.transactType" :key="transact.val" :value="transact.val">{{transact.title}}</option>
              </select>
          </div>

          <div class="form-group" v-if="formDetails.componentId === consts.gcash_component_id">
            <label class="col-form-label white">Current GCash Balance</label>
            <div class="form-group">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">₱</span>
                </div>
                <input type="text" class="form-control border-primary" style="background-color: #303030; color: white;" v-model="gCashObject.gcBalance" disabled>
              </div>
            </div>
          </div>

          <div class="form-group" v-if="formDetails.componentId === consts.maya_component_id">
            <label class="col-form-label white">Current Maya Balance</label>
            <div class="form-group">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">₱</span>
                </div>
                <input 
                  type="text" 
                  class="form-control border-success" 
                  style="background-color: #303030; color: white;" 
                  v-model="mayaObject.mayaBalance" disabled
                >
              </div>
            </div>
          </div>

          <div class="form-group" v-if="formDetails.componentId === consts.gcash_component_id && commonProps.transactType === 9">
            <select class="custom-select send-money-type" v-model="commonProps.sendMoneyType">
              <option value="1">Express Send</option>
              <option value="2">Send via QR</option>
              <option value="3">Send with a Clip</option>
              <option value="4">Send Gift</option>
            </select>
          </div>

          <div class="flex-group">
            <div class="form-group" v-if="formDetails.componentId === consts.gcash_component_id && commonProps.transactType === 1">
              <label class="col-form-label white">Customer</label><br>
              <select class="custom-select customer-select-style" v-model="gCashObject.customer" @change="trackSelection(gCashObject.customer, 'gcash')">
                <option v-for="(customer, index) in customersArray" :key="index" :value="customer.customer_id">{{ customer.name }}</option>
              </select>
            </div>
            <div 
              class="form-group" 
              v-if="
                formDetails.componentId === consts.gcash_component_id && 
                ( commonProps.transactType === 5 || 
                  commonProps.transactType === 1 || 
                  commonProps.transactType === 9 || 
                  commonProps.transactType === 12
                )
              "
            >
              <label class="col-form-label white">
                {{ commonProps.transactType === 5 ? 'Own Mobile Numbers' : 'Mobile Number' }}
              </label><br>
              <input type="number" 
                v-if="(formDetails.componentId === consts.gcash_component_id  && commonProps.transactType != 5 )" 
                class="form-control customer-select-style" 
                pattern=" 0+\.[0-9]*[1-9][0-9]*$" 
                @keydown="digitOnlyInput" 
                v-model="gCashObject.mobileNo"
              >
              <select v-else class="custom-select own-numbers" v-model="gCashObject.ownMobileNo">
                <option v-for="(number, index) in ownMobileNosData" :key="index" :value="number.mobile_number">{{ number.alias }} - {{ number.mobile_number }}</option>
              </select>
            </div>
          </div>

          <div class="flex-group">
            <div class="form-group" v-if="formDetails.componentId === consts.gcash_component_id && (commonProps.transactType === 5 || commonProps.transactType === 1)" style="width: 5rem;">
              <label class="col-form-label white">Network</label><br>
              <select class="custom-select" v-model="gCashObject.network" style="width: 6.5rem;">
                <option value="TM">TM</option>
                <option value="Globe">Globe</option>
                <option value="TNT">TNT</option>
                <option value="Smart">Smart</option>
              </select>
            </div>
            <div class="form-group" v-if="formDetails.componentId === consts.gcash_component_id && commonProps.transactType === consts.gcash_transacts.load_sale">
              <label class="col-form-label white">Payment Date / Time</label>
              <input type="datetime-local" class="form-control pay-mobile-res" v-model="gCashObject.paymentDateTime">
            </div>
          </div>

          <div class="form-group" v-if="(formDetails.componentId === consts.bank_component_id && commonProps.transactType === consts.bank_transacts.adjustment) || (formDetails.componentId === consts.gcash_component_id && commonProps.transactType === consts.gcash_transacts.adjustment) || (formDetails.componentId === consts.maya_component_id && commonProps.transactType === consts.maya_transacts.adjustment)">
            <label class="col-form-label white">Credit or Debit?</label><br>
            <select class="custom-select" v-model="commonProps.credit" style="width: 6rem;">
              <option value="1" selected>Credit</option>
              <option value="0">Debit</option>
            </select>
          </div>

          <div class="form-group" v-if="formDetails.componentId === consts.bank_component_id">
            <label class="col-form-label white">Current Bank Balance</label>
            <div class="form-group">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">₱</span>
                </div>
                <input 
                  type="text" 
                  class="form-control border-success" 
                  style="background-color: #303030; color: white;" 
                  v-model="bankObject.saBalance" disabled
                >
              </div>
            </div>
          </div>
          
          <div class="form-group" v-if="formDetails.componentId === consts.cc_component_id">
            <label class="col-form-label white">Current Available Credit Limit</label>
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">₱</span>
                </div>
                <input 
                  type="text" 
                  class="form-control border-danger" 
                  style="background-color: #303030; color: white;" 
                  v-model="ccProps.availCreditLimit" 
                  disabled
                >
              </div>
              <div id="cl-notice"></div>
            </div>
          </div>
          
          <div class="form-group" v-if="(formDetails.componentId === consts.bank_component_id || formDetails.componentId === consts.gcash_component_id) && commonProps.transactType === 3">
            <label class="control-label white">Biller / Merchant</label>
            <select class="custom-select" v-model="commonProps.billerMerchant">
                <option v-if="formDetails.componentId === consts.bank_component_id" value="BPI - BEC MC">BPI - BEC MC</option>
                <option v-if="formDetails.componentId === consts.bank_component_id" value="BPI - AIAPH">BPI - AIAPH</option>
                <option v-if="formDetails.componentId === consts.bank_component_id" value="BPI - COL">BPI - COL</option>
                <option v-if="formDetails.componentId === consts.bank_component_id" value="UB - Visa Platinum">UB - Visa Platinum</option>
                <option value="Primewater">Primewater</option>
                <option value="Meralco">Meralco</option>
                <option value="Dasca">Dasca</option>
              </select>
          </div>

          <div class="form-group" v-if="(formDetails.componentId === consts.cc_component_id) || (formDetails.componentId === consts.gcash_component_id && commonProps.transactType === consts.gcash_transacts.pay_qr) || (formDetails.componentId === consts.maya_component_id && commonProps.transactType === consts.maya_transacts.qr_pay)">
            <label class="control-label white">Description</label><br>
            <input type="text" class="form-control" v-model="commonProps.description"/>
          </div>

          <div class="form-group" v-if="formDetails.componentId === consts.gcash_component_id && commonProps.transactType === 12">
            <label class="control-label white">Sender</label><br>
            <input type="text" class="form-control" v-model="gCashObject.moneySender" required/>
          </div>

          <!-- Amount -->
          <div class="form-group" v-if="commonProps.transactType != consts.bank_transacts.shopee_online_banking">
            <label class="control-label white">{{ (formDetails.componentId === consts.gcash_component_id && commonProps.transactType === 4) ? 'Sale / Income Received:' : 'Amount'}}</label>
            <div class="form-group">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">₱</span>
                </div>
                <input type="number" class="form-control" step="any" pattern=" 0+\.[0-9]*[1-9][0-9]*$" @keypress="digitOnlyInput" v-model="commonProps.amount" required>
              </div>
            </div>
          </div>

          <div class="form-group" v-if="formDetails.componentId === consts.gcash_component_id && commonProps.transactType === 6">
            <label class="control-label white">Acct Name</label><br>
            <input type="text" class="form-control" v-model="gCashObject.acctName"/>
            <label class="control-label white">Acct Number</label><br>
            <input type="text" class="form-control" v-model="commonProps.acctNo"/>
          </div>

          <div class="form-group" v-if="(formDetails.componentId === consts.gcash_component_id && commonProps.transactType === 7) || (formDetails.componentId === consts.maya_component_id && commonProps.transactType === consts.maya_transacts.online_payment)">
            <label class="control-label white">Online Service / Shop Website:</label>
            <select class="custom-select" v-model="commonProps.onlineShopWebsite">
                <option v-if="formDetails.componentId === consts.gcash_component_id" value="GCash A+ Rewards">GCash A+ Rewards</option>
                <option value="Steam">Steam</option>
                <option value="Shopee">Shopee Pay - {{ formDetails.name }}</option>
                <option value="Lazada">Lazada payment - {{ formDetails.name }}</option>
                <option value="Google Play">Google Play</option>
                <option value="Food Panda PH">Food Panda</option>
                <option value="GrabPay">GrabPay</option>
                <option value="Youtube Membership">Youtube Membership</option>
                <option value="Twitch Membership">Twitch Membership</option>
                <option value="Spotify">Spotify</option>
                <option value="Lalamove">Lalamove</option>
                <option value="Mobapay">Mobapay</option>
              </select>
          </div>

          <div class="form-group" v-if="formDetails.componentId === consts.cc_component_id && (commonProps.transactType === consts.cc_transacts.online_payment || commonProps.transactType === consts.cc_transacts.non_online_payment)">
            <label class="control-label white">{{ commonProps.transactType === consts.cc_transacts.online_payment ? 'Online Shop Website:' : 'Physical Store Name'}}</label>
            <select v-if="commonProps.transactType === consts.cc_transacts.online_payment" class="custom-select" v-model="commonProps.onlineShopWebsite">
                <option value="Google Play">Google Play</option>
                <option value="Steam">Steam</option>
                <option value="GOG">GOG</option>
                <option value="Grab">Grab</option>
                <option value="Patreon">Patreon</option>
                <option value="Gumroad">Gumroad</option>
                <option value="From Japan">From Japan</option>
                <option value="Others">Others</option>
            </select>
            <input v-else type="text" class="form-control" v-model="commonProps.storeName">
          </div>

          <div class="form-group" v-if="(formDetails.componentId === consts.bank_component_id && commonProps.transactType === consts.bank_transacts.store_payment) || (formDetails.componentId === consts.gcash_component_id && commonProps.transactType === consts.gcash_transacts.pay_qr) || (formDetails.componentId === consts.maya_component_id && commonProps.transactType === consts.maya_transacts.qr_pay)">
            <label class="control-label white">Store Name:</label><br>
            <input type="text" class="form-control" v-model="commonProps.storeName"/>
          </div>

          <div class="form-group" v-if="formDetails.componentId === consts.bank_component_id && commonProps.transactType === consts.bank_transacts.shopee_online_banking">
            <label class="control-label white">Seller Name:</label><br>
            <input type="text" class="form-control" v-model="commonProps.sellerName"/>
          </div>

          <!-- Merch Subtotal -->
          <div class="form-group" v-if="commonProps.transactType === consts.bank_transacts.shopee_online_banking">
            <label class="control-label white">Merch Subtotal</label>
            <div class="form-group">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">₱</span>
                </div>
                <input type="number" class="form-control" step="any" pattern=" 0+\.[0-9]*[1-9][0-9]*$" @keypress="digitOnlyInput" v-model="commonProps.merchSubtotal" required>
              </div>
            </div>
          </div>

          <div class="form-group" v-if="formDetails.componentId === consts.bank_component_id && commonProps.transactType === consts.bank_transacts.shopee_online_banking">
            <label class="control-label white">OL Bank Fee:</label><br>
            <div class="form-group">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">₱</span>
                </div>
                <input type="number" class="form-control" step="any" pattern=" 0+\.[0-9]*[1-9][0-9]*$" @keypress="digitOnlyInput" v-model="commonProps.shopeeOLBankFee" required>
              </div>
            </div>
          </div>

          <div class="form-group" v-if="formDetails.componentId === consts.bank_component_id && commonProps.transactType === consts.bank_transacts.shopee_online_banking">
            <label class="control-label white">Shipping Fee Subtotal:</label><br>
            <div class="form-group">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">₱</span>
                </div>
                <input type="number" class="form-control" step="any" pattern=" 0+\.[0-9]*[1-9][0-9]*$" @keypress="digitOnlyInput" v-model="commonProps.shippingFee" required>
              </div>
            </div>
          </div>

          <div class="form-group" v-if="formDetails.componentId === consts.bank_component_id && commonProps.transactType === consts.bank_transacts.shopee_online_banking">
            <label class="control-label white">Shipping Fee Discount:</label><br>
            <div class="form-group">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">₱</span>
                </div>
                <input type="number" class="form-control" step="any" pattern=" 0+\.[0-9]*[1-9][0-9]*$" @keypress="digitOnlyInput" v-model="commonProps.shippingFeeDiscount" required>
              </div>
            </div>
          </div>

          <div class="form-group" v-if="formDetails.componentId === consts.bank_component_id && commonProps.transactType === consts.bank_transacts.shopee_online_banking">
            <label class="control-label white">Voucher Discount:</label><br>
            <div class="form-group">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">₱</span>
                </div>
                <input type="number" class="form-control" step="any" pattern=" 0+\.[0-9]*[1-9][0-9]*$" @keypress="digitOnlyInput" v-model="commonProps.voucherDiscount" required>
              </div>
            </div>
          </div>

          <div class="form-group" v-if="formDetails.componentId === consts.bank_component_id && commonProps.transactType === consts.bank_transacts.shopee_online_banking">
            <label class="control-label white">Grand Subtotal:</label><br>
            <div class="form-group">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">₱</span>
                </div>
                <input disabled type="number" class="form-control" step="any" pattern=" 0+\.[0-9]*[1-9][0-9]*$" @keypress="digitOnlyInput" :value="commonProps.shopeeOLBSubTotal = (commonProps.merchSubtotal + commonProps.shopeeOLBankFee + commonProps.shippingFee) - commonProps.shippingFeeDiscount - commonProps.voucherDiscount" required>
              </div>
            </div>
          </div>

          <div class="form-group" v-if="formDetails.componentId === consts.cc_component_id && commonProps.transactType === 3">
            <label class="control-label white">Term</label>
            <select class="custom-select" v-model="ccObject.term">
                <option value="Monthly">Monthly</option>
                <option value="6 Months">6 Months</option>
                <option value="12 Months">12 Months</option>
              </select>
          </div>
          <div class="form-group" v-if="formDetails.componentId === consts.cc_component_id && commonProps.transactType === 3">
            <label class="control-label white">Term Payment</label><br>
            <input type="number" class="form-control" min="1" step="any" pattern=" 0+\.[0-9]*[1-9][0-9]*$" @keypress="digitOnlyInput" v-model="ccObject.termPay"/>
          </div>
          <div class="form-group" v-if="formDetails.componentId === consts.cc_component_id && commonProps.transactType === 3">
            <label class="control-label white">Transaction No.</label><br>
            <input type="text" class="form-control" placeholder="Ask the agent about Transaction No." v-model="ccObject.loanTransactNo"/>
          </div>
          <div class="form-group" v-if="formDetails.componentId === consts.cc_component_id && commonProps.transactType === 3">
            <label class="control-label white">Agent Name</label><br>
            <input type="text" class="form-control" v-model="ccObject.loanAgentName"/>
          </div>
          <div class="form-group" v-if="formDetails.componentId === consts.cc_component_id && commonProps.transactType === 3">
            <label class="control-label white">Loan Thru</label>
            <select class="custom-select" v-model="ccObject.loanThru">
                <option value="phone">Phone</option>
                <option value="branch">Branch</option>
              </select>
          </div>
          <div class="form-group" v-if="formDetails.componentId === consts.gcash_component_id && commonProps.transactType === 9">
            <label class="control-label white">Message</label><br>
            <textarea class="form-control" rows="3" v-model="gCashObject.message"/>
          </div>
          <div class="form-group" v-if="formDetails.componentId === consts.gcash_component_id && commonProps.transactType === 9 && commonProps.sendMoneyType === 3">
            <label class="control-label white">Attachment:</label><br>
            <select class="custom-select" v-model="gCashObject.attachment">
              <option value="None">None</option>
              <option value="Photo" selected>Photo</option>
              <option value="Video">Video</option>
              <option value="Audio">Audio</option>
            </select>
          </div>

          <div class="form-group" v-if="((formDetails.componentId === consts.bank_component_id) || (formDetails.componentId === consts.gcash_component_id && commonProps.transactType != consts.gcash_transacts.pay_qr)) || (formDetails.componentId === consts.cc_component_id) || (formDetails.componentId === consts.maya_component_id && commonProps.transactType != consts.maya_transacts.qr_pay)">
            <label class="control-label white">Remarks</label><br>
            <textarea class="form-control" rows="3" v-model="commonProps.remarks"/>
          </div>

          <div class="form-group" v-if="formDetails.componentId === consts.gcash_component_id || bankObject.location === 'GCash App'">
            <label class="control-label white">{{ bankObject.location == 'GCash App' ? 'GCash ' : '' }}Ref. No.</label><br>
            <input type="text" class="form-control" v-model="gCashObject.refNo" required/>
          </div>

          <div class="form-group" v-if="formDetails.componentId === consts.maya_component_id || bankObject.location === 'Maya App'">
            <label class="control-label white">{{ bankObject.location == 'Maya App' ? 'Maya ' : '' }}Ref. ID.</label><br>
            <input type="text" class="form-control" v-model="mayaObject.refNo" required/>
          </div>

          <div class="form-group" v-if="formDetails.componentId === consts.bank_component_id && (!bankObject.location != 'Maya App' || !bankObject.location != 'GCash App') ">
            <label class="control-label white">Transaction Ref No</label><br>
            <input type="text" class="form-control" v-model="bankObject.refNo" required/>
          </div>

          <div class="form-group" v-if="formDetails.componentId === consts.bank_component_id">
            <label class="col-form-label white">Location</label><br>
            <select class="custom-select" v-model="bankObject.location" >
              <option value="Select">-- Select App / Location --</option>
              <option :value="bankObject.location">{{ bankObject.location }}</option>
              <option value="GCash App">GCash App</option>
              <option value="Maya App">Maya App</option>
              <option value="ATM">ATM</option>
              <option value="Store Card Terminal">Store Card Terminal</option>
              <option v-if="commonProps.transactType === consts.bank_transacts.shopee_online_banking" value="Shopee">Shopee</option>
              <option value="Automatic Activity">Automatic Activity</option>
            </select>
          </div>
          
          <div id="btn-container"><button type="submit" class="btn btn-outline-success styled-button">Submit</button></div>
          
        </div>

      </div>
    </form>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, reactive, ref } from 'vue'

import { useRouter } from 'vue-router'

import config from '../config'

import { invokerInitializer, handleAxios } from '../helpers/helpers.service.js'

import { getGCashInfo } from '../composables/getGCashInfo.js'
import { getMayaInfo } from '../composables/getMayaInfo.js'
import { getSavingsAccs } from '../composables/getBanksInfo.js'
import { getCreditCards  } from '../composables/getCcsInfo.js'
import { getCustomers } from '../composables/getCustomers.js'
import { getOwnMobileNos  } from '../composables/getOwnMobileNosInfo.js'

import consts from '../constants/constants.js'

// import { confirm } from '../ts/dialogs.ts'

const props = defineProps({
  formDetails: Object,
});

let axiosReqConfirmed = ref(false)


let bankObject = reactive({
  bankId: 1, 
  saName: '', 
  saBalance: 1, 
  receipientAcctNo: '', 
  location: 'Select',
  refNo: '',
})

let gCashObject = reactive({
  gCashId: 1, 
  gcBalance: 1, 
  acctName: '', 
  customer: '', 
  mobileNo: '',
  ownMobileNo: '09755512192', 
  network: 'TM', 
  paymentDateTime: '', 
  refNo: '', 
  moneySender: '',
  message: '', 
  attachment: 'Photo'
})

let mayaObject = reactive({
  mayaId: 1,
  mayaBalance: 1,
  acctName: '', 
  customer: '', 
  mobileNo: '',
  ownMobileNo: '09755512192', 
  network: 'TM', 
  paymentDateTime: '', 
  refNo: '', 
  moneySender: '',
  message: '', 
  attachment: 'Photo'
})

let ccObject = reactive({
  term: 'Monthly', 
  termPay: 1, 
  loanThru: '', 
  loanTransactNo: '', 
  loanAgentName: ''
})

let commonProps = reactive(
  {
    dateTime: '',
    transactType: 0,
    credit: 1,
    acctNo: '', 
    amount: 1,
    description: '',
    sendMoneyType: 1, 
    onlineShopWebsite: 'Google Play', // GCash, CC
    billerMerchant: '',
    storeName: '', // GCash, CC
    sellerName: '', // Savings account,
    merchSubtotal: 1,
    shopeeOLBankFee: 10,
    shippingFee: 40,
    shippingFeeDiscount: 0,
    voucherDiscount: 0,
    shopeeOLBSubTotal: 1,
    remarks: ''
  }
)

let ccProps = reactive(
  {
    ccId: 1,
  }
)

let initialIndex = 0

let gCashData = ref([])

let mayaData = ref([])

let savingsAcctData = ref([])

let creditCardsData = ref([])

let customersArray = ref([])

let ownMobileNosData = ref([])

const router = useRouter()

const fetchSavingsAcc = (val) => {
  bankObject.saBalance = savingsAcctData.value[val].balance
  bankObject.location = savingsAcctData.value[val].bank_abbrev + ' App'
  return bankObject.saBalance
}

const fetchCc = (val) => {
  ccProps.availCreditLimit = creditCardsData.value[val].avail_credit_limit
  return ccProps.availCreditLimit
}

const fetchGCashAcc = () => {
  // make sure this is an integer type to prevent Data truncated MySQL error
  gCashObject.gcBalance = gCashData.value[0].balance
}

const fetchMayaAcc = () => {
  // make sure this is an integer type to prevent Data truncated MySQL error
  mayaObject.mayaBalance = mayaData.value[0].balance
}

const handleGCashInitialization = async () => {
  gCashData.value = await invokerInitializer(getGCashInfo)
  fetchGCashAcc()
}

const handleMayaInitialization = async () => {
  mayaData.value = await invokerInitializer(getMayaInfo)
  fetchMayaAcc()
}

const trackSelection = (val, flag) => {
  // console.log(val, flag)

  if(flag === 'sa') {
    fetchSavingsAcc(val)
  }

  if(flag === 'cc') {
    fetchCc(val)
  }

  if(flag === 'tt') {
    commonProps.transactType = val
  }
}

const digitOnlyInput = (event) => {
  return event.charCode >= 48 && event.charCode <= 57
}

const trackDropDown = (param) => {
  console.log(param)
}

const handleSubmit = async () => {
  
  try {
    if(props.formDetails.componentId === consts.bank_component_id) {
      
      let newBankData = {
        bank_id: bankObject.bankId,
        date_time: commonProps.dateTime,
        bank_transact_type_id: commonProps.transactType,
        amount: commonProps.amount,
        current_balance: bankObject.saBalance,        
        remarks: commonProps.remarks,
        location: bankObject.location,
        reference_number: bankObject.refNo
      }

      // console.log(newBankData)
      
      if(commonProps.transactType === consts.bank_transacts.deposit) {

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/sa/save-sa-depo`, newBankData, 'Savings Account', 'Cash Deposit')

      } else if(commonProps.transactType === consts.bank_transacts.withdraw) {

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/sa/save-sa-wdraw`, newBankData, 'Savings Account', 'Cash Withdraw')

      } else if(commonProps.transactType === consts.bank_transacts.bills_payment) {

        newBankData.biller_merchant = commonProps.billerMerchant

        console.log(commonProps.billerMerchant )

        if(commonProps.billerMerchant == 'BPI - BEC MC') {
          // credit card bills payment
          newBankData.bank_transact_type_id = consts.bank_transacts.credit_card_payment
        }

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/sa/save-sa-billspay`, newBankData, 'Savings Account', 'Bills Payment')

      } else if(commonProps.transactType === consts.bank_transacts.gcash_cash_in) {

        newBankData.current_gcash_balance = gCashObject.gcBalance
        newBankData.gcash_id = gCashObject.gCashId
        newBankData.gcash_ref_no = gCashObject.refNo

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/sa/save-gc-cash-in`, newBankData, 'Savings Account', 'GCash Cash-in')

      } else if(commonProps.transactType === consts.bank_transacts.maya_cash_in) {

        newBankData.current_maya_balance = mayaObject.mayaBalance
        newBankData.maya_id = mayaObject.mayaId
        newBankData.maya_ref_no = mayaObject.refNo

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/sa/save-maya-cash-in`, newBankData, 'Savings Account', 'Maya Cash-in')

      }else if(commonProps.transactType === consts.bank_transacts.reload_prepaid_card) {

        newBankData.receipient_acct_no = bankObject.receipientAcctNo

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/sa/save-sa-prepaid-reload`, newBankData, 'Savings Account', 'Reload Prepaid')

      } else if(commonProps.transactType === consts.bank_transacts.transfer_money) {

        newBankData.receipient_acct_no = bankObject.receipientAcctNo

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/sa/save-sa-transfer-money`, newBankData, 'Savings Account', 'Transfer Money')

      } else if(commonProps.transactType === consts.bank_transacts.store_payment) {

        newBankData.store_name = commonProps.storeName

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/sa/save-sa-store-payment`, newBankData, 'Savings Account', 'Store payment')

      } else if(commonProps.transactType === consts.bank_transacts.adjustment) {

        // Adjustment
        // properties are manually added which are unique only to this transaction
        newBankData.credit = commonProps.credit
        newBankData.bank_transact_type_id = commonProps.credit == 1 ? consts.adjustment_types.credit : consts.adjustment_types.debit

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/sa/save-sa-adjustment`, newBankData, 'Savings Account', 'Adjustment')

      } else if(commonProps.transactType === consts.bank_transacts.earn_interest) {

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/sa/save-sa-earn-interest`, newBankData, 'Savings Account', 'Earn Interest')

      }  else if(commonProps.transactType === consts.bank_transacts.tax_withheld) {

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/sa/save-sa-taxwh`, newBankData, 'Savings Account', 'Tax Witheld')

      } else if(commonProps.transactType === consts.bank_transacts.salary_income) {
        // Salary / Income
        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/sa/save-sa-sale-income`, newBankData, 'Savings Account', 'Salary / Income')

      } else if(commonProps.transactType === consts.bank_transacts.shopee_online_banking) {

        newBankData.seller_name = commonProps.sellerName
        newBankData.merch_subtotal = commonProps.merchSubtotal
        newBankData.fee = commonProps.shopeeOLBankFee
        newBankData.shipping_fee = commonProps.shippingFee
        newBankData.shipping_discount = commonProps.shippingFeeDiscount
        newBankData.voucher_discount = commonProps.voucherDiscount
        newBankData.sub_total = commonProps.shopeeOLBSubTotal
        // for use in savings acct table
        newBankData.amount = commonProps.shopeeOLBSubTotal 

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/sa/save-shopee-online-banking`, newBankData, 'Savings Account', 'Shopee - Online Banking')
      }
    } else if(props.formDetails.componentId === consts.gcash_component_id) {

      let newGCashData = {
        gcash_id: 1,
        date_time: commonProps.dateTime,
        transact_type_id: commonProps.transactType,
        current_gcash_balance: gCashObject.gcBalance,
        amount: commonProps.amount,
        remarks: commonProps.remarks,
        ref_no: gCashObject.refNo
      }
      
      if(commonProps.transactType === consts.gcash_transacts.load_sale) {

        newGCashData.customer_id = gCashObject.customer
        newGCashData.mobile_number = gCashObject.mobileNo
        newGCashData.network = gCashObject.network

        if(!gCashObject.paymentDateTime) {
          newGCashData.payment_date = null
        }
        
        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/gcash/save-loadsale`, newGCashData, 'GCash', 'Load Sale')

      } else if(commonProps.transactType === consts.gcash_transacts.bills_payment) {

        newGCashData.biller_merchant = commonProps.billerMerchant

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/gcash/save-gc-billspay`, newGCashData, 'GCash', 'Bills payment')

      } else if(commonProps.transactType === consts.gcash_transacts.income_sale) {

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/gcash/save-gc-income`, newGCashData, 'GCash', 'New Sale / Income')

      } else if(commonProps.transactType === consts.gcash_transacts.self_buy_load) {
        
        newGCashData.own_mobile_number = gCashObject.ownMobileNo
        newGCashData.network = gCashObject.network

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/gcash/save-selfbuyload`, newGCashData, 'GCash', 'Self Buy Load')

      } else if(commonProps.transactType === consts.gcash_transacts.bank_transfer) {
        
        newGCashData.acct_no = commonProps.acctNo
        newGCashData.acct_name = gCashObject.acctName

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/gcash/save-gc-banktransfer`, newGCashData, 'GCash', 'Bank Transfer')

      } else if(commonProps.transactType === consts.gcash_transacts.online_payment) {
        
        newGCashData.online_shop_website = commonProps.onlineShopWebsite

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/gcash/save-ol-shop-pay`, newGCashData, 'GCash', 'Online Payment')

      } else if(commonProps.transactType === consts.gcash_transacts.adjustment) {

        newGCashData.credit = commonProps.credit
        newGCashData.transact_type_id = commonProps.credit == 1 ? consts.adjustment_types.credit : consts.adjustment_types.debit

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/gcash/save-gc-adjustment`, newGCashData, 'GCash', 'New Adjustment')
        
      } else if(commonProps.transactType === consts.gcash_transacts.send_money) {

        newGCashData.mobile_number = gCashObject.mobileNo

        if(commonProps.sendMoneyType === 1) {
          newGCashData.type = 'Express Send'
          newGCashData.message = gCashObject.message
          newGCashData.attachment = 'N/A'
        } else if (commonProps.sendMoneyType === 2) {
          newGCashData.type = 'Send via QR'
          newGCashData.message = 'N/A'
          newGCashData.attachment = 'N/A'
        } else if (commonProps.sendMoneyType === 3) {
          newGCashData.type = 'Send with a Clip'
          newGCashData.message = gCashObject.message
          newGCashData.attachment = gCashObject.attachment
        } else {
          newGCashData.type  = 'Send Gift'
          newGCashData.message = gCashObject.message
          newGCashData.attachment = 'N/A'
        }
        
        newGCashData.remarks = `[${newGCashData.type}] ${newGCashData.remarks}`

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/gcash/save-gc-sendmoney`, newGCashData, 'GCash', 'Send Money')

      } else if(commonProps.transactType === consts.gcash_transacts.refund) {

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/gcash/save-gc-refund`, newGCashData, 'GCash', 'Refund')

      } else if(commonProps.transactType === consts.gcash_transacts.pay_qr) {

        newGCashData.store_name = commonProps.storeName
        newGCashData.description = commonProps.description
        newGCashData.remarks = newGCashData.description

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/gcash/save-pay-qr`, newGCashData, 'GCash', 'Pay QR')

      } else if (commonProps.transactType === consts.gcash_transacts.receive_money) {

        newGCashData.money_sender = gCashObject.moneySender
        newGCashData.mobile_number = gCashObject.mobileNo

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/gcash/save-received-money`, newGCashData, 'GCash', 'Received Money')
      }
    } else if(props.formDetails.componentId === consts.cc_component_id) {

      let newCCData = {
        credit_card_id: ccProps.ccId,
        date_time: commonProps.dateTime,
        transact_type_id: commonProps.transactType,
        description: commonProps.description,
        current_credit_limit: ccProps.availCreditLimit,
        amount: commonProps.amount,
        remarks: commonProps.remarks,
      }

      if (commonProps.transactType === 1) {
        newCCData.online_shop_website = commonProps.onlineShopWebsite

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/cc/save-cc-op`, newCCData, 'Credit Card', 'Online Payment')

      } else if (commonProps.transactType === 2){
        newCCData.store_name = commonProps.storeName

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/cc/save-cc-nop`, newCCData, 'Credit Card', 'Non-Online Payment')

      } else {
        if(!newCCData.description) {
          newCCData.description =  '[Credit-to-Cash Promo Loan]'
        }
        newCCData.loan_thru = ccObject.loanThru
        newCCData.loan_transact_no = ccObject.loanTransactNo
        newCCData.loan_agent_name = ccObject.loanAgentName
        newCCData.term = ccObject.term
        newCCData.term_pay = ccObject.termPay

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/cc/save-cc-loan`, newCCData, 'Credit Card', 'Credit-to-Cash Loan')

      }
    } else if(props.formDetails.componentId === consts.maya_component_id) {

      let newMayaData = {
        maya_id: 1,
        date_time: commonProps.dateTime,
        transact_type_id: commonProps.transactType,
        current_maya_balance: mayaObject.mayaBalance,
        amount: commonProps.amount,
        remarks: commonProps.remarks,
        ref_no: mayaObject.refNo
      }

      if(commonProps.transactType === consts.maya_transacts.online_payment) {
        
        newMayaData.online_shop_website = commonProps.onlineShopWebsite

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/maya/save-ol-shop-pay`, newMayaData, 'Maya', 'Online Payment')

      } else if(commonProps.transactType === consts.maya_transacts.refund) {

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/maya/save-refund`, newMayaData, 'Maya', 'Refund')

      } else if (commonProps.transactType === consts.maya_transacts.qr_pay) {

        newMayaData.store_name = commonProps.storeName
        newMayaData.description = commonProps.description
        newMayaData.remarks = newMayaData.description

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/maya/save-qr-pay`, newMayaData, 'Maya', 'QR Pay')

      } else if (commonProps.transactType === consts.maya_transacts.adjustment) {

        newMayaData.credit = commonProps.credit
        newMayaData.transact_type_id = commonProps.credit == 1 ? consts.adjustment_types.credit : consts.adjustment_types.debit

        axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/maya/save-adjustment`, newMayaData, 'Maya', 'New Adjustment')

      }
    }

    bankObject.bankId = 1
    bankObject.receipientAcctNo = ''
    bankObject.location = ''

    commonProps.dateTime = ''
    commonProps.transactType = 1
    commonProps.credit = 1,
    commonProps.amount = 1,
    commonProps.remarks = '',

    gCashObject.customer = ''
    gCashObject.mobileNo = ''
    gCashObject.network = ''
    gCashObject.paymentDateTime = ''
    gCashObject.refNo = '',
    gCashObject.message = '',
    gCashObject.attachment = 'Photo'

    mayaObject.refNo = ''

    if(axiosReqConfirmed.value == true) {
      router.push('/')
    }

  } catch (error) {
    // console.log(error);
    router.push('/')
  }

}

onMounted(async () => {

  // console.log(`props.formDetails.componentId: ${props.formDetails.componentId}`)

  if(props.formDetails.componentId === consts.bank_component_id) {
    savingsAcctData.value = await invokerInitializer(getSavingsAccs)
    trackSelection(initialIndex, 'sa')
    handleGCashInitialization()
    handleMayaInitialization()
  }

  if(props.formDetails.componentId === consts.gcash_component_id) {
    await handleGCashInitialization()
    customersArray.value = await invokerInitializer(getCustomers)
    ownMobileNosData.value = await invokerInitializer(getOwnMobileNos)
  }

  if(props.formDetails.componentId === consts.maya_component_id) {
    await handleMayaInitialization()
  }
  
  if(props.formDetails.componentId === consts.cc_component_id) {
    creditCardsData.value = await invokerInitializer(getCreditCards)
    trackSelection(initialIndex, 'cc')
  }

})

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