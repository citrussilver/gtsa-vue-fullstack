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

                    <!-- <div class="form-group">
                        <select class="custom-select" @change="trackSelection($event.target.selectedIndex, 'sa')">
                        <option v-for="(bank, index) in savingsAcctData" :key="index" :value="bank.bank_id">{{ bank.bank_name }} - {{ bank.bank_abbrev }}</option>
                        </select>
                    </div> -->
                    
                    <!-- transactions -->
                    <div class="form-group">
                        <select class="custom-select cselect-style" v-model="dataPayload.transact_type_id" @change="trackSelection(dataPayload.transact_type_id, 'tt')">
                            <option v-for="transact in formDetails.transactType" :key="transact.val" :value="transact.val">{{transact.title}}</option>
                        </select>
                    </div>

                    <div class="form-group">
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

                    <div class="form-group" v-if="dataPayload.transact_type_id == consts.maya_transacts.bills_payment.id">
                        <label class="control-label white">Biller / Merchant</label>
                        <select class="custom-select" v-model="commonProps.billerMerchant" @change="trackSelection(commonProps.billerMerchant, 'biller')">
                            <option v-for="biller in formDetails.billerMerchant" :key="biller.val" :value="biller.name">{{ biller.name }}</option>
                        </select>
                    </div>

                    <div class="form-group" v-if="dataPayload.transact_type_id === consts.maya_transacts.adjustment.id">
                        <label class="col-form-label white">Credit or Debit?</label><br>
                        <select class="custom-select" v-model="commonProps.credit" style="width: 6rem;">
                          <option value="1" selected>Credit</option>
                          <option value="0">Debit</option>
                        </select>
                    </div>

                    <div class="form-group" v-if="dataPayload.transact_type_id === consts.maya_transacts.qr_pay.id">
                        <label class="control-label white">Description</label><br>
                        <input type="text" class="form-control" v-model="dataPayload.description"/>
                    </div>

                    <div class="flex-group" v-if="dataPayload.transact_type_id === consts.maya_transacts.self_buy_load.id">
                      <!-- <div class="form-group" v-if="dataPayload.transact_type === 1">
                        <label class="col-form-label white">Customer</label><br>
                        <select class="custom-select customer-select-style" v-model="gCashObject.customer" @change="trackSelection(gCashObject.customer, 'gcash')">
                          <option v-for="(customer, index) in customersArray" :key="index" :value="customer.customer_id">{{ customer.name }}</option>
                        </select>
                      </div> -->
                      <div class="form-group">
                        <label class="col-form-label white">
                          {{ dataPayload.transact_type_id === 5 ? 'Own Mobile Numbers' : 'Mobile Number' }}
                        </label><br>
                        <input type="number" 
                          v-if="(dataPayload.transact_type_id != 5 )" 
                          class="form-control customer-select-style" 
                          pattern=" 0+\.[0-9]*[1-9][0-9]*$" 
                          @keydown="digitOnlyInput" 
                          v-model="mayaObject.mobileNo"
                        >
                        <select v-else class="custom-select own-numbers" v-model="mayaObject.ownMobileNo">
                          <option v-for="(number, index) in ownMobileNosData" :key="index" :value="number.mobile_number">{{ number.alias }} - {{ number.mobile_number }}</option>
                        </select>
                      </div>
                    </div>

                    <div class="flex-group" v-if="dataPayload.transact_type_id === consts.maya_transacts.self_buy_load.id" style="width: 5rem;">
                      <div class="form-group">
                        <label class="col-form-label white">Network</label><br>
                        <select class="custom-select" v-model="mayaObject.network" style="width: 6.5rem;">
                          <option value="TM">TM</option>
                          <option value="Globe">Globe</option>
                          <option value="TNT">TNT</option>
                          <option value="Smart">Smart</option>
                        </select>
                      </div>
                      <!-- <div class="form-group" v-if="dataPayload.transact_type_id === consts.maya_transacts.load_sale.id">
                        <label class="col-form-label white">Payment Date / Time</label>
                        <input type="datetime-local" class="form-control pay-mobile-res" v-model="gCashObject.paymentDateTime">
                      </div> -->
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

                    <div class="form-group" v-if="[consts.maya_transacts.qr_pay.id, consts.maya_transacts.online_payment.id].includes(dataPayload.transact_type_id)">
                        <label class="control-label white">{{ dataPayload.transact_type_id === consts.maya_transacts.qr_pay.id ? 'Store Name:' : 'Online Shop Website:'}}</label>
                        <select v-if="dataPayload.transact_type_id === consts.maya_transacts.online_payment.id" class="custom-select" v-model="shopObject.onlineStoreWebsite" @change="trackSelection($event.target.selectedIndex, 'online_shop_web')">
                            <option v-for="onlineStore in formDetails.onlineStoreWebsite" :key="onlineStore.val" :value="onlineStore.name">{{ onlineStore.name }}</option>
                        </select>
                        <div v-if="dataPayload.transact_type_id === consts.maya_transacts.refund.id">
                          <br/>
                        </div>
                        <label class="control-label white">{{ dataPayload.transact_type_id === consts.maya_transacts.refund.id ? 'Store Name:' : ''}}</label>
                        <input v-if="[consts.maya_transacts.qr_pay.id, consts.maya_transacts.refund.id].includes(dataPayload.transact_type_id)" type="text" class="form-control" v-model="shopObject.storeName">
                    </div>

                    <!-- <div class="form-group" v-if="dataPayload.transact_type_id === consts.maya_transacts.qr_pay.id">
                        <label class="control-label white">Store Name:</label><br>
                        <input type="text" class="form-control" v-model="commonProps.storeName"/>
                    </div> -->

                    <div class="form-group" v-if="dataPayload.transact_type_id != consts.maya_transacts.qr_pay.id">
                        <label class="control-label white">Remarks</label><br>
                        <textarea class="form-control" rows="3" v-model="dataPayload.remarks"/>
                    </div>

                    <div class="form-group">
                        <label class="control-label white">Ref. ID.</label><br>
                        <input type="text" class="form-control" v-model="dataPayload.reference_id" required/>
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

import { getMayaInfo } from '../composables/getMayaInfo.js'

import { getSavingsAccs } from '../composables/getBanksInfo.js'

import { getOwnMobileNos  } from '../composables/getOwnMobileNosInfo.js'

import consts from '../constants/constants.js'

const props = defineProps({
  formDetails: Object,
});

let axiosReqConfirmed = ref(false)

const router = useRouter()

let dataPayload = reactive(
    {
        maya_id: 1, 
        date_time: '',
        transact_type_id: 1,
        current_balance: 1,
        amount: 1,
        remarks: '',
        reference_id: ''
    }
)

let mayaObject = reactive({
  mayaId: 1,
  mayaBalance: 1,
  acctName: '', 
  customer: '', 
  mobileNo: '',
  ownMobileNo: '09755512192', 
  network: 'TM', 
  paymentDateTime: '', 
  refId: '', 
  moneySender: '',
  message: '', 
  attachment: 'Photo'
})

let bankObject = reactive({
  bankId: 1, 
  saName: '', 
  saBalance: 1, 
  receipientAcctNo: '', 
  location: 'Select',
  refNo: '',
})

let shopObject = reactive(
  {
    onlineStoreWebsite: '',
    storeName: ''
  }
)

let commonProps = reactive(
  {
    billerMerchant: '-- Select Biller / Merchant --',
    credit: 1
  }
);

let initialIndex = 0

let mayaData = ref([])

let savingsAcctData = ref([])

let ownMobileNosData = ref([])

const fetchMayaAcc = () => {
  // make sure this is an integer type to prevent Data truncated MySQL error
  mayaObject.mayaBalance = mayaData.value[0].balance
  dataPayload.current_balance = mayaData.value[0].balance
  return mayaObject.mayaBalance
}

const handleMayaInitialization = async () => {
  mayaData.value = await invokerInitializer(getMayaInfo)
  ownMobileNosData.value = await invokerInitializer(getOwnMobileNos)
  trackSelection(initialIndex, 'maya')
    //   fetchMayaAcc()
}

// const fetchSavingsAcc = (val) => {
//   bankObject.saBalance = savingsAcctData.value[val].balance
//   bankObject.location = savingsAcctData.value[val].bank_abbrev + ' App'

//   dataPayload.current_balance = bankObject.saBalance
//   dataPayload.location = bankObject.location

//   return bankObject.saBalance
// }

// const handleSaInitialization = async () => {
//     savingsAcctData.value = await invokerInitializer(getSavingsAccs)
//     trackSelection(initialIndex, 'sa')
// }

const trackSelection = (val, flag) => {
  console.log(val, flag)

  // if(flag === 'sa') {
  //   fetchSavingsAcc(val)
  // }

  if(flag === 'maya') {
    fetchMayaAcc(val)
  }
}

const digitOnlyInput = (event) => {
  return event.charCode >= 48 && event.charCode <= 57
}

const handleSubmit = async () => {
    try {
        let newMayaData = {...dataPayload}

        newMayaData.account_type = 'Maya'

        if(dataPayload.transact_type_id == consts.maya_transacts.cash_in.id) {

          newMayaData.transaction = consts.maya_transacts.cash_in.name

          axiosReqConfirmed.value = await createTransaction(consts.maya_transacts.cash_in.route, newMayaData)
        }

        if(dataPayload.transact_type_id == consts.maya_transacts.online_payment.id) {
          
          newMayaData.online_shop_website = shopObject.onlineStoreWebsite

          newMayaData.transaction = consts.maya_transacts.online_payment.name

          axiosReqConfirmed.value = await createTransaction(consts.maya_transacts.online_payment.route, newMayaData)
        }

        if(dataPayload.transact_type_id == consts.maya_transacts.bills_payment.id) {

          newMayaData.biller_merchant = commonProps.billerMerchant

          newMayaData.transaction = consts.maya_transacts.bills_payment.name

          axiosReqConfirmed.value = await createTransaction(consts.maya_transacts.bills_payment.route, newMayaData)
        }

        if(dataPayload.transact_type_id == consts.maya_transacts.self_buy_load.id) {

          newMayaData.mobile_number = mayaObject.ownMobileNo
          newMayaData.network = mayaObject.network

          newMayaData.transaction = consts.maya_transacts.self_buy_load.name

          axiosReqConfirmed.value = await createTransaction(consts.maya_transacts.self_buy_load.route, newMayaData)
        }

        if(dataPayload.transact_type_id === consts.maya_transacts.refund.id) {

          newMayaData.transaction = consts.maya_transacts.refund.name

          axiosReqConfirmed.value = await createTransaction(consts.maya_transacts.refund.route, newMayaData)
        }

        if (dataPayload.transact_type_id === consts.maya_transacts.qr_pay.id) {
          
          newMayaData.store_name = commonProps.storeName
          newMayaData.description = dataPayload.description

          newMayaData.transaction = consts.maya_transacts.qr_pay.name

          axiosReqConfirmed.value = await createTransaction(consts.maya_transacts.qr_pay.route, newMayaData)
        }

        if (dataPayload.transact_type_id === consts.maya_transacts.adjustment.id) {
          
          newMayaData.credit = commonProps.credit
          newMayaData.transact_type_id = commonProps.credit == 1 ? consts.adjustment_types.credit : consts.adjustment_types.debit

          newMayaData.transaction = consts.maya_transacts.adjustment.name

          axiosReqConfirmed.value = await createTransaction(consts.maya_transacts.adjustment.route, newMayaData)
        }

        if(axiosReqConfirmed.value == true) {
          router.push('/')
        }

    } catch (error) {
        router.push('/')
    }
}

onMounted(async () => {
    mayaData.value = await invokerInitializer(getMayaInfo)
    trackSelection(initialIndex, 'maya')
    handleMayaInitialization()
    // handleSaInitialization()
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