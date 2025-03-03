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

                    <!-- transactions -->
                    <div class="form-group">
                        <select class="custom-select cselect-style" v-model="dataPayload.transact_type_id" @change="trackSelection(dataPayload.transact_type_id, 'tt')">
                            <option v-for="transact in formDetails.transactType" :key="transact.val" :value="transact.val">{{transact.title}}</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="col-form-label white">Current GCash Balance</label>
                        <div class="form-group">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">₱</span>
                                </div>
                                <input 
                                    type="text"
                                    class="form-control border-primary"
                                    style="background-color: #303030; color: white;"
                                    v-model="gCashObject.gcBalance" disabled
                                >
                            </div>
                        </div>
                    </div>

                    <!-- Biller / Merchant -->
                    <div class="form-group" v-if="dataPayload.transact_type_id == consts.gcash_transacts.bills_payment.id">
                        <label class="control-label white">Biller / Merchant</label>
                        <select class="custom-select" v-model="commonProps.billerMerchant" @change="trackSelection(commonProps.billerMerchant, 'biller')">
                            <option v-for="biller in formDetails.billerMerchant" :key="biller.val" :value="biller.name">{{ biller.name }}</option>
                        </select>
                    </div>

                    <!-- Adjustment -->
                    <div class="form-group" v-if="dataPayload.transact_type_id === consts.gcash_transacts.adjustment.id">
                        <label class="col-form-label white">Credit or Debit?</label><br>
                        <select class="custom-select" v-model="commonProps.credit" style="width: 6rem;">
                          <option value="1" selected>Credit</option>
                          <option value="0">Debit</option>
                        </select>
                    </div>

                    <div class="form-group" v-if="dataPayload.transact_type_id === consts.gcash_transacts.pay_qr.id">
                        <label class="control-label white">Description</label><br>
                        <input type="text" class="form-control" v-model="dataPayload.description"/>
                    </div>

                    <!-- Self Buy Load -->
                    <div class="form-group" v-if="dataPayload.transact_type_id === consts.gcash_transacts.self_buy_load.id">
                        <label class="col-form-label white">Own Mobile Numbers</label><br>
                        <select class="custom-select own-numbers" v-model="gCashObject.ownMobileNo">
                          <option v-for="(number, index) in ownMobileNosData" :key="index" :value="number.mobile_number">{{ number.alias }} - {{ number.mobile_number }}</option>
                        </select>
                    </div>

                    <!-- Load Sale - Customer -->
                    <div class="flex-group">
                        <div class="form-group" v-if="dataPayload.transact_type_id === consts.gcash_transacts.load_sale.id">
                            <label class="col-form-label white">Customer</label><br>
                            <select class="custom-select customer-select-style" v-model="gCashObject.customer" @change="trackSelection(gCashObject.customer, 'gcash')">
                                <option v-for="(customer, index) in customersArray" :key="index" :value="customer.customer_id">{{ customer.name }}</option>
                            </select>
                        </div>
                        <div class="form-group" 
                            v-if="[consts.gcash_transacts.load_sale.id, consts.gcash_transacts.send_money.id].includes(dataPayload.transact_type_id)">
                            <label class="col-form-label white">Mobile Number</label><br>
                            <input type="number" 
                                class="form-control customer-select-style" 
                                pattern=" 0+\.[0-9]*[1-9][0-9]*$" 
                                v-model="gCashObject.mobileNo"
                                @keydown="digitOnlyInput" 
                            >
                        </div>
                    </div>

                    <div class="form-group" v-if="[consts.gcash_transacts.self_buy_load.id, consts.gcash_transacts.load_sale.id].includes(dataPayload.transact_type_id)">
                        <label class="col-form-label white">Network</label><br>
                        <select class="custom-select" v-model="gCashObject.network" style="width: 6.5rem;">
                          <option value="TM">TM</option>
                          <option value="Globe">Globe</option>
                          <option value="TNT">TNT</option>
                          <option value="Smart">Smart</option>
                        </select>
                    </div>

                    <div class="form-group" v-if="dataPayload.transact_type_id === consts.gcash_transacts.load_sale.id">
                        <label class="col-form-label white">Payment Date / Time</label>
                        <input type="datetime-local" class="form-control pay-mobile-res" v-model="gCashObject.paymentDateTime">
                    </div>

                    <div class="form-group" v-if="dataPayload.transact_type_id === consts.gcash_transacts.send_money.id">
                        <select class="custom-select send-money-type" v-model="commonProps.sendMoneyType" @change="trackSelection($event.target.selectedIndex, 'send-money-type')">
                            <option value="1">Express Send</option>
                            <option value="2">Send via QR</option>
                            <option value="3">Send with a Clip</option>
                            <option value="4">Send Gift</option>
                        </select>
                    </div>

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

                    <div class="form-group" v-if="[consts.gcash_transacts.pay_qr.id, consts.gcash_transacts.online_payment.id].includes(dataPayload.transact_type_id)">
                        <label class="control-label white">{{ dataPayload.transact_type_id === consts.gcash_transacts.pay_qr.id ? 'Store Name:' : 'Online Shop Website:'}}</label>
                        <select v-if="dataPayload.transact_type_id === consts.gcash_transacts.online_payment.id" class="custom-select" v-model="shopObject.storeName" @change="trackSelection($event.target.selectedIndex, 'online_shop_web')">
                            <option v-for="onlineStore in formDetails.onlineStoreWebsite" :key="onlineStore.val" :value="onlineStore.name">{{ onlineStore.name }}</option>
                        </select>
                        <div v-if="dataPayload.transact_type_id === consts.gcash_transacts.refund.id">
                          <br/>
                        </div>
                        <label class="control-label white">{{ dataPayload.transact_type_id === consts.gcash_transacts.refund.id ? 'Store Name:' : ''}}</label>
                        <input 
                            type="text"
                            class="form-control"
                            v-if="[consts.gcash_transacts.pay_qr.id, consts.gcash_transacts.refund.id].includes(dataPayload.transact_type_id)"
                            v-model="shopObject.storeName"
                        >
                    </div>

                    <div class="form-group" v-if="dataPayload.transact_type_id === consts.gcash_transacts.send_money.id">
                        <label class="control-label white">Message</label><br>
                        <textarea class="form-control" rows="3" v-model="gCashObject.message"/>
                    </div>
                    <div class="form-group" v-if="dataPayload.transact_type_id === consts.gcash_transacts.send_money.id && commonProps.sendMoneyType == 3">
                        <label class="control-label white">Attachment:</label><br>
                        <select class="custom-select" v-model="gCashObject.attachment">
                            <option value="None">None</option>
                            <option value="Photo" selected>Photo</option>
                            <option value="Video">Video</option>
                            <option value="Audio">Audio</option>
                        </select>
                    </div>

                    <div class="form-group" v-if="dataPayload.transact_type_id != consts.gcash_transacts.pay_qr.id">
                        <label class="control-label white">Remarks</label><br>
                        <textarea class="form-control" rows="3" v-model="dataPayload.remarks"/>
                    </div>

                    <div class="form-group">
                        <label class="control-label white">Ref. No.</label><br>
                        <input type="text" class="form-control" v-model="dataPayload.ref_no" required/>
                    </div>

                    <div id="btn-container"><button type="submit" class="btn btn-outline-success styled-button">Submit</button></div>
                </div>
            </div>
        </form>
      </div>  
</template>
    
<script setup>
import { onMounted, reactive, ref } from 'vue'

import { useRouter } from 'vue-router'

import { invokerInitializer } from '../helpers/helpers.service.js'

import { createTransaction } from '../http/transact-api.js'

import { getGCashInfo } from '../composables/getGCashInfo.js'

import { getCustomers } from '../composables/getCustomers.js'

import { getOwnMobileNos  } from '../composables/getOwnMobileNosInfo.js'

import consts from '../constants/constants.js'

const props = defineProps({
  formDetails: Object,
});

let axiosReqConfirmed = ref(false)

const router = useRouter()

let dataPayload = reactive(
    {
        gcash_id: 1, 
        date_time: '',
        transact_type_id: 1,
        current_gcash_balance: 1,
        amount: 1,
        remarks: '',
        ref_no: ''
    }
)

let gCashObject = reactive({
  gCashId: 1, 
  gcBalance: 1, 
  acctName: '', 
  customer: null, 
  mobileNo: '',
  ownMobileNo: '09755512192', 
  network: 'TM', 
  paymentDateTime: '', 
  refNo: '', 
  moneySender: '',
  message: '', 
  attachment: 'Photo'
})

let shopObject = reactive(
  {
    onlineStoreWebsite: '',
    storeName: ''
  }
)

let commonProps = reactive(
  {
    sendMoneyType: 1, 
    billerMerchant: '-- Select Biller / Merchant --',
    credit: 1
  }
);

let initialIndex = 0

let gCashData = ref([])

let customersArray = ref([])

let ownMobileNosData = ref([])

const fetchGCashAcc = () => {
  // make sure this is an integer type to prevent Data truncated MySQL error
  gCashObject.gcBalance = gCashData.value[0].balance
  dataPayload.current_gcash_balance = gCashData.value[0].balance
  return gCashObject.gcBalance
}

const handleGCashInitialization = async () => {
  gCashData.value = await invokerInitializer(getGCashInfo)
  customersArray.value = await invokerInitializer(getCustomers)
  ownMobileNosData.value = await invokerInitializer(getOwnMobileNos)
  trackSelection(initialIndex, 'gcash')
}

const trackSelection = (val, flag) => {
  console.log(val, flag)

  console.log(commonProps.sendMoneyType)

  // if(flag === 'sa') {
  //   fetchSavingsAcc(val)
  // }

  if(flag === 'gcash') {
    fetchGCashAcc(val)
  }
}

const digitOnlyInput = (event) => {
  return event.charCode >= 48 && event.charCode <= 57
}

onMounted(async () => {
    gCashData.value = await invokerInitializer(getGCashInfo)
    trackSelection(initialIndex, 'gcash')
    handleGCashInitialization()
    // handleSaInitialization()
})

const handleSubmit = async () => {
    try {
        let newGCashData = {...dataPayload}

        newGCashData.account_type = 'GCash'

        if(dataPayload.transact_type_id === consts.gcash_transacts.load_sale.id) {

            newGCashData.customer_id = gCashObject.customer
            newGCashData.mobile_number = gCashObject.mobileNo
            newGCashData.network = gCashObject.network

            if(!gCashObject.paymentDateTime) {
                newGCashData.payment_date = null
            }

            newGCashData.transaction = consts.gcash_transacts.load_sale.name

            axiosReqConfirmed.value = await createTransaction(consts.gcash_transacts.load_sale.route, newGCashData)

        }
        
        if(dataPayload.transact_type_id === consts.gcash_transacts.bills_payment.id) {
            
            newGCashData.biller_merchant = commonProps.billerMerchant

            newGCashData.transaction = consts.gcash_transacts.bills_payment.name

            axiosReqConfirmed.value = await createTransaction(consts.gcash_transacts.bills_payment.route, newGCashData)

        } 
        
        if(dataPayload.transact_type_id === consts.gcash_transacts.income_sale.id) {
            
            newGCashData.transaction = consts.gcash_transacts.income_sale.name
            
            axiosReqConfirmed.value = await createTransaction(consts.gcash_transacts.income_sale.route, newGCashData)

        } 
        
        if(dataPayload.transact_type_id === consts.gcash_transacts.self_buy_load.id) {

            newGCashData.own_mobile_number = gCashObject.ownMobileNo
            newGCashData.network = gCashObject.network

            newGCashData.transaction = consts.gcash_transacts.self_buy_load.name

            console.log(newGCashData);

            axiosReqConfirmed.value = await createTransaction(consts.gcash_transacts.self_buy_load.route, newGCashData)

        } 
        
        if(dataPayload.transact_type_id === consts.gcash_transacts.bank_transfer.id) {
            
            newGCashData.acct_no = commonProps.acctNo
            newGCashData.acct_name = gCashObject.acctName

            newGCashData.transaction = consts.gcash_transacts.bank_transfer.name

            axiosReqConfirmed.value = await createTransaction(consts.gcash_transacts.bank_transfer.route, newGCashData)

        } 
        
        
        if(dataPayload.transact_type_id === consts.gcash_transacts.online_payment.id) {
            
            newGCashData.online_shop_website = shopObject.storeName

            newGCashData.transaction = consts.gcash_transacts.online_payment.name
        
            axiosReqConfirmed.value = await createTransaction(consts.gcash_transacts.online_payment.route, newGCashData)

        }
        
        if(dataPayload.transact_type_id === consts.gcash_transacts.adjustment.id) {
            
            newGCashData.credit = commonProps.credit
            newGCashData.transact_type_id = commonProps.credit == 1 ? consts.adjustment_types.credit : consts.adjustment_types.debit

            newGCashData.transaction = consts.gcash_transacts.adjustment.name

            axiosReqConfirmed.value = await createTransaction(consts.gcash_transacts.adjustment.route, newGCashData)

        }
        
        if(dataPayload.transact_type_id === consts.gcash_transacts.send_money.id) {

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

            newGCashData.transaction = consts.gcash_transacts.send_money.name

            axiosReqConfirmed.value = await createTransaction(consts.gcash_transacts.send_money.route, newGCashData)

        }
        
        if(dataPayload.transact_type_id === consts.gcash_transacts.refund.id) {

            newGCashData.transaction = consts.gcash_transacts.refund.name

            axiosReqConfirmed.value = await createTransaction(consts.gcash_transacts.refund.route, newGCashData)
        } 
        
        if(dataPayload.transact_type_id === consts.gcash_transacts.pay_qr.id) {

            newGCashData.store_name = shopObject.storeName

            newGCashData.transaction = consts.gcash_transacts.pay_qr.name

            console.log(newGCashData);

            axiosReqConfirmed.value = await createTransaction(consts.gcash_transacts.pay_qr.route, newGCashData)

        }
        
        if (dataPayload.transact_type_id === consts.gcash_transacts.receive_money.id) {

            newGCashData.money_sender = gCashObject.moneySender
            newGCashData.mobile_number = gCashObject.mobileNo

            newGCashData.transaction = consts.gcash_transacts.receive_money.name

            axiosReqConfirmed.value = await createTransaction(consts.gcash_transacts.receive_money.route, newGCashData)
        }

        if(axiosReqConfirmed.value == true) {
          router.push('/')
        }

    } catch (error) {
        router.push('/')
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

  .send-money-type {
    width: 12rem;
  }
}
</style>