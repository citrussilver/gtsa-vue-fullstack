<template>
    <div id="flex-container">
        <form id="main-form" @submit.prevent="handleSubmit">
            <div :class="formDetails.cardBorder" class="main-form-content">
                <div class="card-header white">New {{formDetails.header}}</div>

                <div class="card-body">
                    <div class="form-group">
                        <label class="col-form-label white">Date</label>
                        <input type="datetime-local" class="form-control" v-model="dataPayload.date_time" required>
                    </div>

                    <div class="form-group">
                        <select class="custom-select" v-model="dataPayload.bank_id" @change="trackSelection($event.target.selectedIndex, 'sa')">
                        <option v-for="(bank, index) in savingsAcctData" :key="index" :value="bank.bank_id">{{ bank.bank_name }} - {{ bank.bank_abbrev }}</option>
                        </select>
                    </div>

                    <!-- transactions dropdown -->
                    <div class="form-group">
                        <select class="custom-select cselect-style" v-model="dataPayload.bank_transact_type_id" @change="trackSelection(dataPayload.bank_transact_type_id, 'tt')">
                            <option v-for="transact in formDetails.transactType" :key="transact.val" :value="transact.val">{{transact.title}}</option>
                        </select>
                    </div>

                    <div class="form-group">
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

                    <div class="form-group" v-if="dataPayload.bank_transact_type_id == consts.bank_transacts.bills_payment">
                        <label class="control-label white">Biller / Merchant</label>
                        <select class="custom-select" v-model="commonProps.billerMerchant" @change="trackSelection(commonProps.billerMerchant, 'biller')">
                            <option v-for="biller in formDetails.billerMerchant" :key="biller.val" :value="biller.name">{{ biller.name }}</option>
                        </select>
                    </div>

                    <!-- Amount -->
                    <div class="form-group">
                        <label class="control-label white">Amount</label>
                        <div class="form-group">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                <span class="input-group-text">₱</span>
                                </div>
                                <input type="number" class="form-control" step="any" pattern=" 0+\.[0-9]*[1-9][0-9]*$" @keypress="digitOnlyInput" v-model="dataPayload.amount" required>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="control-label white">Remarks</label><br>
                        <textarea class="form-control" rows="3" v-model="dataPayload.remarks"/>
                    </div>

                    <div class="form-group">
                        <label v-if="dataPayload.bank_transact_type_id === consts.bank_transacts.shopee_online_banking || dataPayload.bank_transact_type_id === consts.bank_transacts.shopee_pay_cash_in">Reference ID</label>
                        <label v-else class="control-label white">Transaction Ref No</label><br>
                        <input type="text" class="form-control" v-model="dataPayload.reference_number" required/>
                    </div>

                    <div class="form-group" v-if="dataPayload.bank_transact_type_id === consts.bank_transacts.shopee_online_banking || dataPayload.bank_transact_type_id === consts.bank_transacts.shopee_pay_cash_in">
                      <label>Order SN</label>
                      <input type="text" class="form-control" v-model="commonProps.shopeePayCashInOrderSn" required/>
                    </div>

                    <div class="form-group">
                        <label class="col-form-label white">Location</label><br>
                        <select class="custom-select" v-model="bankObject.location" >
                            <option value="Select">-- Select App / Location --</option>
                            <option :value="bankObject.location">{{ bankObject.location }}</option>
                            <option value="GCash App">GCash App</option>
                            <option value="Maya App">Maya App</option>
                            <option value="ATM">ATM</option>
                            <option value="Store Card Terminal">Store Card Terminal</option>
                            <option value="Shopee">Shopee</option>
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

import { getSavingsAccs } from '../composables/getBanksInfo.js'

import consts from '../constants/constants.js'

const props = defineProps({
  formDetails: Object,
});

let axiosReqConfirmed = ref(false)

const router = useRouter()

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

// temporary
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
    shopeePayCashInAmount: 1,
    shopeePayCashInOrderSn: '',
    remarks: ''
  }
)

let dataPayload = reactive({
    bank_id: 1, // initialize to 1
    date_time: '',
    bank_transact_type_id: 1,
    amount: 1,
    current_balance: 1,
    remarks: '',
    location: '',
    reference_number: ''
})

let initialIndex = 0

let savingsAcctData = ref([])

const fetchSavingsAcc = (val) => {
  bankObject.saBalance = savingsAcctData.value[val].balance
  bankObject.location = savingsAcctData.value[val].bank_abbrev + ' App'

  dataPayload.current_balance = bankObject.saBalance
  dataPayload.location = bankObject.location

  return bankObject.saBalance
}

const handleSaInitialization = async () => {
    savingsAcctData.value = await invokerInitializer(getSavingsAccs)
    trackSelection(initialIndex, 'sa')
}

const trackSelection = (val, flag) => {
  console.log(val, flag)

  if(flag === 'sa') {
    fetchSavingsAcc(val)
  }

  if(flag === 'biller') {
    console.log('==== val ====')
    console.log(val)
  }
}

const digitOnlyInput = (event) => {
  return event.charCode >= 48 && event.charCode <= 57
}

const handleSubmit = async () => {
    try {
        
        let newSaTransactData = {...dataPayload}

        if(dataPayload.bank_transact_type_id === consts.bank_transacts.deposit) {

            axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/sa/save-sa-depo`, newSaTransactData, 'Savings Account', 'Cash Deposit')
        }
        
        if(dataPayload.bank_transact_type_id === consts.bank_transacts.withdraw) {
            
            axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/sa/save-sa-wdraw`, newSaTransactData, 'Savings Account', 'Cash Withdraw')

        }
        
        if(dataPayload.bank_transact_type_id === consts.bank_transacts.bills_payment) {
            
            newSaTransactData.biller_merchant = commonProps.billerMerchant



            if(commonProps.billerMerchant == consts.bank_billers.bpi.bluemaster_card || consts.bank_billers.unionbank.visa_platinum) {
                // credit card bills payment - 14
                newSaTransactData.bank_transact_type_id = consts.bank_transacts.credit_card_payment
            }

            axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/sa/save-sa-billspay`, newSaTransactData, 'Savings Account', 'Bills Payment')

        } 
        
        if(dataPayload.bank_transact_type_id === consts.bank_transacts.gcash_cash_in) {

            newSaTransactData.current_gcash_balance = gCashObject.gcBalance
            newSaTransactData.gcash_id = gCashObject.gCashId
            newSaTransactData.gcash_ref_no = gCashObject.refNo

            axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/sa/save-gc-cash-in`, newSaTransactData, 'Savings Account', 'GCash Cash-in')

        }
        
        if(dataPayload.bank_transact_type_id === consts.bank_transacts.maya_cash_in) {

            newSaTransactData.current_maya_balance = mayaObject.mayaBalance
            newSaTransactData.maya_id = mayaObject.mayaId
            newSaTransactData.reference_id = mayaObject.refNo

            axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/sa/save-maya-cash-in`, newSaTransactData, 'Savings Account', 'Maya Cash-in')

        }
        
        if(dataPayload.bank_transact_type_id === consts.bank_transacts.reload_prepaid_card) {

            newSaTransactData.receipient_acct_no = bankObject.receipientAcctNo

            axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/sa/save-sa-prepaid-reload`, newSaTransactData, 'Savings Account', 'Reload Prepaid')

        }
        
        if(dataPayload.bank_transact_type_id === consts.bank_transacts.transfer_money) {

            newSaTransactData.receipient_acct_no = bankObject.receipientAcctNo

            axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/sa/save-sa-transfer-money`, newSaTransactData, 'Savings Account', 'Transfer Money')

        }
        
        if(dataPayload.bank_transact_type_id === consts.bank_transacts.store_payment) {

            newSaTransactData.store_name = commonProps.storeName

            axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/sa/save-sa-store-payment`, newSaTransactData, 'Savings Account', 'Store payment')

        }
        
        if(dataPayload.bank_transact_type_id === consts.bank_transacts.adjustment) {

            // Adjustment
            // properties are manually added which are unique only to this transaction
            newSaTransactData.credit = commonProps.credit
            newSaTransactData.bank_transact_type_id = commonProps.credit == 1 ? consts.adjustment_types.credit : consts.adjustment_types.debit

            axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/sa/save-sa-adjustment`, newSaTransactData, 'Savings Account', 'Adjustment')

        }
        
        if(dataPayload.bank_transact_type_id === consts.bank_transacts.earn_interest) {

            axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/sa/save-sa-earn-interest`, newSaTransactData, 'Savings Account', 'Earn Interest')

        }
        
        if(dataPayload.bank_transact_type_id === consts.bank_transacts.tax_withheld) {

            axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/sa/save-sa-taxwh`, newSaTransactData, 'Savings Account', 'Tax Witheld')

        }
        
        if(dataPayload.bank_transact_type_id === consts.bank_transacts.salary_income) {
            // Salary / Income
            axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/sa/save-sa-sale-income`, newSaTransactData, 'Savings Account', 'Salary / Income')

        }
        
        if(dataPayload.bank_transact_type_id === consts.bank_transacts.shopee_online_banking) {

            newSaTransactData.seller_name = commonProps.sellerName
            newSaTransactData.merch_subtotal = commonProps.merchSubtotal
            newSaTransactData.fee = commonProps.shopeeOLBankFee
            newSaTransactData.shipping_fee = commonProps.shippingFee
            newSaTransactData.shipping_discount = commonProps.shippingFeeDiscount
            newSaTransactData.voucher_discount = commonProps.voucherDiscount
            newSaTransactData.sub_total = commonProps.shopeeOLBSubTotal
            // for use in savings acct table
            newSaTransactData.amount = commonProps.shopeeOLBSubTotal 

            axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/sa/save-shopee-online-banking`, newSaTransactData, 'Savings Account', 'Shopee - Online Banking')
        }

        if(dataPayload.bank_transact_type_id === consts.bank_transacts.shopee_pay_cash_in) {

          // shopeePay Cash-in Logic

          // for use in savings acct table
          newSaTransactData.amount = dataPayload.amount

          // properties are manually added which are unique only to this transaction
          newSaTransactData.order_sn = commonProps.shopeePayCashInOrderSn

          axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/sa/save-shopee-pay-cash-in`, newSaTransactData, 'Savings Account', 'ShopeePay Cash-in')
        }

        if(axiosReqConfirmed.value == true) {
          router.push('/')
        }
        
    } catch (error) {
        router.push('/')
    }
}

onMounted(async () => {
    savingsAcctData.value = await invokerInitializer(getSavingsAccs)
    trackSelection(initialIndex, 'sa')
    handleSaInitialization()
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
  content: '*please check regularly on banking app';
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