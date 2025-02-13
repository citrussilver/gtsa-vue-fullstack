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

                    <!-- Savings Accounts List -->
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

                    <!-- Credit Cards List -->
                    <div class="form-group" v-if="dataPayload.bank_transact_type_id == consts.bank_transacts.pay_credit_card.id">
                        <select class="custom-select" v-model="dataPayload.credit_card_id" @change="trackSelection($event.target.selectedIndex, 'cc')" disabled>
                            <option v-for="(creditCard, index) in creditCardsData" :key="index" :value="creditCard.credit_card_id">{{ creditCard.last_4_digits }} - {{ creditCard.cc_name }}</option>
                        </select>
                    </div>

                    <!-- Credit Limit -->
                    <div class="form-group" v-if="dataPayload.bank_transact_type_id == consts.bank_transacts.pay_credit_card.id">
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
                                    v-model="ccObject.availCreditLimit" 
                                    disabled
                                >
                            </div>
                            <div id="cl-notice"></div>
                        </div>
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

                    <div class="form-group" v-if="dataPayload.bank_transact_type_id == consts.bank_transacts.bills_payment.id">
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

                    <!-- Transaction Ref No -->
                    <div class="form-group">
                        <label v-if="[consts.bank_transacts.shopee_online_banking.id, consts.bank_transacts.shopee_pay_cash_in.id].includes(dataPayload.bank_transact_type_id)">Reference ID</label>
                        <label v-else class="control-label white">Transaction Ref No</label><br>
                        <input type="text" class="form-control" v-model="dataPayload.reference_number" required/>
                    </div>

                    <div class="form-group" v-if="[consts.bank_transacts.shopee_online_banking.id, consts.bank_transacts.shopee_pay_cash_in.id].includes(dataPayload.transact_type_id)">
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

                    <div id="btn-container">
                      <button type="submit" class="btn btn-outline-success styled-button">
                        Submit
                      </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>

import { onBeforeMount, onMounted, reactive, ref } from 'vue'

import { useRouter } from 'vue-router'

import { invokerInitializer } from '../helpers/helpers.service.js'

import { createTransaction } from '../http/transact-api.js'

import { getSavingsAccs } from '../composables/getBanksInfo.js'

import { getCreditCards  } from '../composables/getCcsInfo.js'

import consts from '../constants/constants.js'

import CheckMarkIcon from './icons/CheckMarkIcon.vue'

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

let ccObject = reactive(
  {
    ccId: 1,
    availCreditLimit: 1,
  }
)

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

let creditCardsData = ref([])

const isCreditCardPayment = () => {
  if(dataPayload.bank_transact_type_id == consts.bank_transacts.pay_credit_card.id) {

    dataPayload.credit_card_id = 0
    ccObject.availCreditLimit = 0

    if(dataPayload.bank_id == consts.sa_accounts.bpi.id) {
      dataPayload.credit_card_id = consts.credit_cards.bpi[1].id
      dataPayload.biller_merchant = consts.credit_cards.bpi[1].biller
    }

    if(dataPayload.bank_id == consts.sa_accounts.ub.id) {
      dataPayload.credit_card_id = consts.credit_cards.ub[0].id
      dataPayload.biller_merchant = consts.credit_cards.ub[0].biller
    }

    console.log(`dataPayload.credit_card_id: ${dataPayload.credit_card_id}`);

    if(dataPayload.credit_card_id > 0) {
      fetchCc(dataPayload.credit_card_id-1)
    }

  }
}

const fetchSavingsAcc = (val) => {
  bankObject.saBalance = savingsAcctData.value[val].balance
  bankObject.location = savingsAcctData.value[val].bank_abbrev + ' App'

  dataPayload.current_balance = bankObject.saBalance
  dataPayload.location = bankObject.location

  isCreditCardPayment()

  return bankObject.saBalance
}

const fetchCc = (val) => {
    ccObject.availCreditLimit = creditCardsData.value[val].avail_credit_limit
    dataPayload.current_credit_limit = ccObject.availCreditLimit    

    return ccObject.availCreditLimit
}

const handleSaInitialization = async () => {
    savingsAcctData.value = await getSavingsAccs()
    trackSelection(initialIndex, 'sa')
}

const handleCCInitialization = async () => {
  creditCardsData.value = await getCreditCards()
  trackSelection(initialIndex, 'cc')
}

const trackSelection = (val, flag) => {
  console.log(val, flag)

  if(flag === 'sa') {
    fetchSavingsAcc(val)
  }

  if(flag === 'biller') {
    console.log(val)
  }

  if(flag === 'tt') {
    isCreditCardPayment()
  }

  if(flag === 'cc') {
    fetchCc(val)
  }  
}

const digitOnlyInput = (event) => {
  return event.charCode >= 48 && event.charCode <= 57
}

const handleSubmit = async () => {
    try {
        
        let newSaTransactData = {...dataPayload}

        newSaTransactData.account_type = 'Savings Account'

        if(dataPayload.bank_transact_type_id === consts.bank_transacts.deposit.id) {
          
          newSaTransactData.transaction = consts.bank_transacts.deposit.name

          axiosReqConfirmed.value = await createTransaction(consts.bank_transacts.deposit.route, newSaTransactData)
        }
        
        if(dataPayload.bank_transact_type_id === consts.bank_transacts.withdraw.id) {
          
          newSaTransactData.transaction = consts.bank_transacts.withdraw.name

          axiosReqConfirmed.value = await createTransaction(consts.bank_transacts.withdraw.route, newSaTransactData)

        }
        
        if(dataPayload.bank_transact_type_id === consts.bank_transacts.bills_payment.id) {
          
          newSaTransactData.biller_merchant = commonProps.billerMerchant

          newSaTransactData.transaction = consts.bank_transacts.bills_payment.name

          axiosReqConfirmed.value = await createTransaction(consts.bank_transacts.bills_payment.route, newSaTransactData)

        }

        // Pay Credit card
        if(dataPayload.bank_transact_type_id === consts.bank_transacts.pay_credit_card.id) {
          
          // biller_merchant will be decided on isCreditCardPayment() function

          newSaTransactData.bank_transact_type_id = consts.bank_transacts.pay_credit_card.id

          newSaTransactData.transaction = consts.bank_transacts.pay_credit_card.name

          newSaTransactData.new_credit_limit = parseFloat(dataPayload.current_credit_limit) + parseFloat(dataPayload.amount)

          newSaTransactData.new_credit_limit = roundNumber(newSaTransactData.new_credit_limit, 2)

          console.log(newSaTransactData)

          axiosReqConfirmed.value = await createTransaction(consts.bank_transacts.pay_credit_card.route, newSaTransactData)

        } 
        
        if(dataPayload.bank_transact_type_id === consts.bank_transacts.gcash_cash_in.id) {
          
          newSaTransactData.current_gcash_balance = gCashObject.gcBalance
          newSaTransactData.gcash_id = gCashObject.gCashId
          newSaTransactData.gcash_ref_no = gCashObject.refNo

          newSaTransactData.transaction = consts.bank_transacts.gcash_cash_in.name

          axiosReqConfirmed.value = await createTransaction(consts.bank_transacts.gcash_cash_in.route, newSaTransactData)

        }
        
        if(dataPayload.bank_transact_type_id === consts.bank_transacts.maya_cash_in.id) {
          
          newSaTransactData.current_maya_balance = mayaObject.mayaBalance
          newSaTransactData.maya_id = mayaObject.mayaId
          newSaTransactData.reference_id = mayaObject.refNo

          newSaTransactData.transaction = consts.bank_transacts.maya_cash_in.name

          axiosReqConfirmed.value = await createTransaction(consts.bank_transacts.maya_cash_in.route, newSaTransactData)

        }
        
        if(dataPayload.bank_transact_type_id === consts.bank_transacts.reload_prepaid_card.id) {
          newSaTransactData.receipient_acct_no = bankObject.receipientAcctNo

          newSaTransactData.transaction = consts.bank_transacts.reload_prepaid_card.name

          axiosReqConfirmed.value = await createTransaction(consts.bank_transacts.reload_prepaid_card.route, newSaTransactData)

        }
        
        if(dataPayload.bank_transact_type_id === consts.bank_transacts.transfer_money.id) {
          
          newSaTransactData.receipient_acct_no = bankObject.receipientAcctNo

          newSaTransactData.transaction = consts.bank_transacts.transfer_money.name

          axiosReqConfirmed.value = await createTransaction(consts.bank_transacts.transfer_money.route, newSaTransactData)

        }
        
        if(dataPayload.bank_transact_type_id === consts.bank_transacts.store_payment.id) {

          newSaTransactData.store_name = commonProps.storeName

          newSaTransactData.transaction = consts.bank_transacts.store_payment.name

          axiosReqConfirmed.value = await createTransaction(consts.bank_transacts.store_payment.route, newSaTransactData)

        }
        
        if(dataPayload.bank_transact_type_id === consts.bank_transacts.adjustment.id) {
          
          // Adjustment
          // properties are manually added which are unique only to this transaction
          newSaTransactData.credit = commonProps.credit
          newSaTransactData.bank_transact_type_id = commonProps.credit == 1 ? consts.adjustment_types.credit : consts.adjustment_types.debit

          newSaTransactData.transaction = consts.bank_transacts.adjustment.name

          axiosReqConfirmed.value = await createTransaction(consts.bank_transacts.adjustment.route, newSaTransactData)

        }
        
        if(dataPayload.bank_transact_type_id === consts.bank_transacts.earn_interest.id) {
          
          newSaTransactData.transaction = consts.bank_transacts.earn_interest.name
          
          axiosReqConfirmed.value = await createTransaction(consts.bank_transacts.earn_interest.route, newSaTransactData)

        }
        
        if(dataPayload.bank_transact_type_id === consts.bank_transacts.tax_withheld.id) {

          newSaTransactData.transaction = consts.bank_transacts.tax_withheld.name

          axiosReqConfirmed.value = await createTransaction(consts.bank_transacts.tax_withheld.route, newSaTransactData)

        }
        
        if(dataPayload.bank_transact_type_id === consts.bank_transacts.salary_income.id) {
            // Salary / Income

          newSaTransactData.transaction = consts.bank_transacts.salary_income.name

          axiosReqConfirmed.value = await createTransaction(consts.bank_transacts.salary_income.route, newSaTransactData)

        }
        
        if(dataPayload.bank_transact_type_id === consts.bank_transacts.shopee_online_banking.id) {

            newSaTransactData.seller_name = commonProps.sellerName
            newSaTransactData.merch_subtotal = commonProps.merchSubtotal
            newSaTransactData.fee = commonProps.shopeeOLBankFee
            newSaTransactData.shipping_fee = commonProps.shippingFee
            newSaTransactData.shipping_discount = commonProps.shippingFeeDiscount
            newSaTransactData.voucher_discount = commonProps.voucherDiscount
            newSaTransactData.sub_total = commonProps.shopeeOLBSubTotal
            // for use in savings acct table
            newSaTransactData.amount = commonProps.shopeeOLBSubTotal

            newSaTransactData.transaction = consts.bank_transacts.shopee_online_banking.name

            axiosReqConfirmed.value = await createTransaction(consts.bank_transacts.shopee_online_banking.route, newSaTransactData)
        }

        if(dataPayload.bank_transact_type_id === consts.bank_transacts.shopee_pay_cash_in.id) {

          // shopeePay Cash-in Logic

          // for use in savings acct table
          newSaTransactData.amount = dataPayload.amount

          // properties are manually added which are unique only to this transaction
          newSaTransactData.order_sn = commonProps.shopeePayCashInOrderSn

          newSaTransactData.transaction = consts.bank_transacts.shopee_pay_cash_in.name

          axiosReqConfirmed.value = await createTransaction(consts.bank_transacts.shopee_pay_cash_in.route, newSaTransactData)
        }

        if(axiosReqConfirmed.value == true) {
          router.push('/')
        }
        
    } catch (error) {
        router.push('/')
    }
}

onMounted(async () => {
  // testing omitting invokerInitializer
    savingsAcctData.value = await getSavingsAccs()
    trackSelection(initialIndex, 'sa')
    handleSaInitialization()
    handleCCInitialization()
})

const roundNumber = (number, decimals) => {
    let newnumber = new Number(number+'').toFixed(parseInt(decimals))
    return parseFloat(newnumber); 
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