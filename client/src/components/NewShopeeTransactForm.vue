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
                      <label class="col-form-label white">Delivery Location</label><br>
                      <select class="custom-select" v-model="dataPayload.delivery_location">
                        <option v-for="(location, index) in deliveryLocationsData" :key="index" :value="location.address">{{ location.city }} - {{ location.address }}</option>
                      </select>
                    </div>

                    <div class="form-group">
                      <label class="col-form-label white">Payment Method</label><br>
                      <select style="width: 6rem;" class="custom-select" v-model="dataPayload.payment_method" @change="trackSelection(dataPayload.payment_method, 'test')">
                        <option :value="consts.bank_component_id">Bank</option>
                        <option :value="consts.gcash_component_id">GCash</option>
                        <option :value="consts.maya_component_id">Maya</option>
                        <option :value="consts.shopee_component_id">Shopee Wallet</option>
                      </select>
                    </div>

                    <div class="form-group" v-if="dataPayload.payment_method === consts.bank_component_id">
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

                    <div class="form-group" v-if="dataPayload.payment_method === consts.gcash_component_id">
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

                    <div class="form-group" v-if="dataPayload.payment_method === consts.maya_component_id">
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

                    <div class="form-group" v-if="dataPayload.payment_method === consts.shopee_component_id">
                      <label class="col-form-label white">Current Shopee Wallet Balance</label>
                      <div class="form-group">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text">₱</span>
                          </div>
                          <input 
                            type="text" 
                            class="form-control border-success" 
                            style="background-color: #303030; color: white;" 
                            v-model="shopeeObject.walletBalance" disabled
                          >
                        </div>
                      </div>
                    </div>                    

                    <div class="form-group">
                      <label class="control-label white">Order ID</label><br>
                      <input type="text" class="form-control" v-model="dataPayload.order_id" required/>
                    </div>

                    <div class="form-group" >
                      <label class="control-label white">Store Name:</label><br>
                      <input type="text" class="form-control" v-model="dataPayload.store_name"/>
                    </div>

                    <div class="form-group">
                      <label class="control-label white">Description</label><br>
                      <textarea class="form-control" rows="3" v-model="dataPayload.description"/>
                    </div>

                    <div class="form-group">
                      <label class="control-label white">Merch Subtotal</label>
                      <div class="form-group">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text">₱</span>
                          </div>
                          <input type="number" class="form-control" step="any" pattern=" 0+\.[0-9]*[1-9][0-9]*$" @keypress="digitOnlyInput" v-model="dataPayload.merch_subtotal" required>
                        </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="control-label white">Shipping Fee Subtotal:</label><br>
                      <div class="form-group">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text">₱</span>
                          </div>
                          <input type="number" class="form-control" step="any" pattern=" 0+\.[0-9]*[1-9][0-9]*$" @keypress="digitOnlyInput" v-model="dataPayload.shipping_fee" required>
                        </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="control-label white">Shipping Fee</label>
                      <DiscountIcon/>
                      <br>
                      <div class="form-group">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text">₱</span>
                          </div>
                          <input type="number" class="form-control" step="any" pattern=" 0+\.[0-9]*[1-9][0-9]*$" @keypress="digitOnlyInput" v-model="dataPayload.shipping_fee_discount" required>
                        </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="control-label white">Store</label>
                      <DiscountIcon/>
                      <br>
                      <div class="form-group">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text">₱</span>
                          </div>
                          <input type="number" class="form-control" step="any" pattern=" 0+\.[0-9]*[1-9][0-9]*$" @keypress="digitOnlyInput" v-model="dataPayload.store_discount" required>
                        </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="control-label white">Voucher</label>
                      <DiscountIcon/>
                      <br>
                      <div class="form-group">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text">₱</span>
                          </div>
                          <input type="number" class="form-control" step="any" pattern=" 0+\.[0-9]*[1-9][0-9]*$" @keypress="digitOnlyInput" v-model="dataPayload.voucher_discount" required>
                        </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="control-label white">Coins</label>
                      <DiscountIcon/>
                      <br>
                      <div class="form-group">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text">₱</span>
                          </div>
                          <input type="number" class="form-control" step="any" pattern=" 0+\.[0-9]*[1-9][0-9]*$" @keypress="digitOnlyInput" v-model="dataPayload.coins" required>
                        </div>
                      </div>
                    </div>

                    <!-- <div class="form-group">
                      <label class="control-label white">Cashback</label>
                      <DiscountIcon/>
                      <br>
                      <div class="form-group">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text">₱</span>
                          </div>
                          <input type="number" class="form-control" step="any" pattern=" 0+\.[0-9]*[1-9][0-9]*$" @keypress="digitOnlyInput" v-model="dataPayload.cashback" required>
                        </div>
                      </div>
                    </div> -->

                    <div class="form-group">
                      <label class="control-label white">Grand Subtotal:</label><br>
                      <div class="form-group">
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text">₱</span>
                          </div>
                          <input disabled type="number" class="form-control" step="any" pattern=" 0+\.[0-9]*[1-9][0-9]*$" @keypress="digitOnlyInput" :value="dataPayload.sub_total = (dataPayload.merch_subtotal + dataPayload.shipping_fee) - dataPayload.shipping_fee_discount - dataPayload.store_discount - dataPayload.voucher_discount - dataPayload.coins" required>
                        </div>
                      </div>
                    </div>

                    <div class="form-group" v-if="dataPayload.payment_method === consts.gcash_component_id">
                        <label class="control-label white">GCash Ref. No.</label><br>
                        <input type="text" class="form-control" v-model="gCashObject.refNo" required/>
                    </div>

                    <div class="form-group" v-if="dataPayload.payment_method === consts.maya_component_id || bankObject.location === 'Maya App'">
                        <label class="control-label white">Maya Ref. ID.</label><br>
                        <input type="text" class="form-control" v-model="mayaObject.refNo" required/>
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
import { getShopeeWalletInfo } from '../composables/getShopeeWalletInfo.js'
import { getSavingsAccs } from '../composables/getBanksInfo.js'
// import { getCreditCards  } from '../composables/getCcsInfo.js'
import { getDeliveryLocations } from '../composables/getDeliveryLocations.js'

import consts from '../constants/constants.js'

import DiscountIcon from '../components/DiscountIcon.vue'

const props = defineProps({
  formDetails: Object,
});

let axiosReqConfirmed = ref(false)

const router = useRouter()

let dataPayload = reactive(
  {
    date_time: '',
    delivery_location: '',
    payment_method: 1,
    order_id: '',
    store_name: '',
    description: '',
    merch_subtotal: 1,
    shipping_fee: 40,
    shipping_fee_discount: 0,
    store_discount: 0,
    voucher_discount: 0,
    coins: 0,
    cashback: 0,
    sub_total: 0,
  }
)

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

let shopeeObject = reactive({
  shopeeWalletId: 1,
  walletBalance: 1,
})

let initialIndex = 0

let gCashData = ref([])

let mayaData = ref([])

let savingsAcctData = ref([])

let shopeeWalletData = ref([])

let deliveryLocationsData = ref([])

const fetchSavingsAcc = (val) => {
  bankObject.saBalance = savingsAcctData.value[val].balance
  bankObject.location = savingsAcctData.value[val].bank_abbrev + ' App'
  return bankObject.saBalance
}

const fetchGCashAcc = () => {
  // make sure this is an integer type to prevent Data truncated MySQL error
  gCashObject.gcBalance = gCashData.value[0].balance
}

const fetchMayaAcc = () => {
  // make sure this is an integer type to prevent Data truncated MySQL error
  mayaObject.mayaBalance = mayaData.value[0].balance
}

const fetchShopeeWallet = () => {
  shopeeObject.walletBalance = shopeeWalletData.value[0].balance
}

const handleGCashInitialization = async () => {
  gCashData.value = await invokerInitializer(getGCashInfo)
  fetchGCashAcc()
}

const handleMayaInitialization = async () => {
  mayaData.value = await invokerInitializer(getMayaInfo)
  fetchMayaAcc()
}

const handleShopeeWalletInitialization = async () => {
  shopeeWalletData.value = await invokerInitializer(getShopeeWalletInfo)
  fetchShopeeWallet()
}

const trackSelection = (val, flag) => {
  // console.log(val, flag)

  if(flag === 'gc') {
    fetchGCashAcc()
  }

  if(flag === 'sa') {
    fetchSavingsAcc(val)
  }

  // if(flag === 'cc') {
  //   fetchCc(val)
  // }
}

const digitOnlyInput = (event) => {
  return event.charCode >= 48 && event.charCode <= 57
}

const handleSubmit = async () => {
  try {

    let newShopeeData = {...dataPayload}

    if(dataPayload.payment_method == consts.gcash_component_id) {
      newShopeeData.current_gcash_balance = parseFloat(gCashObject.gcBalance)
    }

    if(dataPayload.payment_method == consts.maya_component_id) {
      newShopeeData.current_maya_balance = parseFloat(mayaObject.mayaBalance)
    }

    // console.log(newShopeeData)

    axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/shp/save-shp-order`, newShopeeData, 'Shopee Transactions', 'Shopee Order')
    
    bankObject.bankId = 1
    bankObject.receipientAcctNo = ''
    bankObject.location = ''

    dataPayload.date_time = ''

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
  savingsAcctData.value = await invokerInitializer(getSavingsAccs)
  trackSelection(initialIndex, 'sa')
  handleGCashInitialization()
  handleMayaInitialization()
  handleShopeeWalletInitialization()
  deliveryLocationsData.value = await invokerInitializer(getDeliveryLocations)
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