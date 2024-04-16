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
                        <select class="custom-select" v-model="dataPayload.credit_card_id" @change="trackSelection($event.target.selectedIndex, 'cc')">
                            <option v-for="(creditCard, index) in creditCardsData" :key="index" :value="creditCard.credit_card_id">{{ creditCard.last_4_digits }} - {{ creditCard.cc_name }}</option>
                        </select>
                    </div>

                    <!-- transactions dropdown -->
                    <div class="form-group">
                        <select class="custom-select cselect-style" v-model="dataPayload.transact_type_id" @change="trackSelection(dataPayload.transact_type_id, 'tt')">
                            <option v-for="transact in formDetails.transactType" :key="transact.val" :value="transact.val">{{transact.title}}</option>
                        </select>
                    </div>

                    <div class="form-group">
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
                        <label class="control-label white">{{ dataPayload.transact_type_id === consts.cc_transacts.non_online_payment ? 'Store Name:' : 'Online Shop Website:'}}</label>
                        <select v-if="dataPayload.transact_type_id === consts.cc_transacts.online_payment || dataPayload.transact_type_id === consts.cc_transacts.cc_refund" class="custom-select" v-model="shopObject.onlineStoreWebsite">
                            <option v-for="onlineStore in formDetails.onlineStoreWebsite" :key="onlineStore.val" :value="onlineStore.name">{{ onlineStore.name }}</option>
                        </select>
                        <div v-if="dataPayload.transact_type_id === consts.cc_transacts.cc_refund">
                          <br/>
                        </div>
                        <label class="control-label white">{{ dataPayload.transact_type_id === consts.cc_transacts.cc_refund ? 'Store Name:' : ''}}</label>
                        <input v-if="dataPayload.transact_type_id === consts.cc_transacts.non_online_payment || dataPayload.transact_type_id === consts.cc_transacts.cc_refund" type="text" class="form-control" v-model="shopObject.storeName">
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
                      <label class="control-label white">Description</label><br>
                      <textarea type="text" class="form-control" rows="3" v-model="dataPayload.description"/>
                    </div>

                    <div class="form-group">
                        <label class="control-label white">Remarks</label><br>
                        <textarea class="form-control" rows="3" v-model="dataPayload.remarks"/>
                    </div>

                    <div class="form-group">
                        <label class="control-label white">Transaction Ref No</label><br>
                        <input type="text" class="form-control" v-model="dataPayload.ref_no" required/>
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

import { getCreditCards  } from '../composables/getCcsInfo.js'

import consts from '../constants/constants.js'

const props = defineProps({
  formDetails: Object,
});

let axiosReqConfirmed = ref(false)

const router = useRouter()

let dataPayload = reactive(
    {
        credit_card_id: 1, // initialize to 1
        date_time: '',
        transact_type_id: 1,
        description: '',
        current_credit_limit: 1,
        amount: 1,
        post_credit_limit: 1,
        remarks: '',
        ref_no: ''
    }
)

let ccObject = reactive(
  {
    ccId: 1,
    availCreditLimit: 1,
  }
)

let loanObject = reactive(
  {
    loanThru: '', 
    loanTransactNo: '', 
    loanAgentName: '',
    term: 'Monthly', 
    termPay: 1, 
  }
)

let shopObject = reactive(
  {
    onlineStoreWebsite: '',
    storeName: ''
  }
)

let initialIndex = 0

let creditCardsData = ref([])

const fetchCc = (val) => {
    ccObject.availCreditLimit = creditCardsData.value[val].avail_credit_limit
    dataPayload.current_credit_limit = ccObject.availCreditLimit
    return ccObject.availCreditLimit
}

const handleCCInitialization = async () => {
  creditCardsData.value = await invokerInitializer(getCreditCards)
  trackSelection(initialIndex, 'cc')
}

const trackSelection = (val, flag) => {
  // console.log(val, flag)

  if(flag === 'cc') {
    fetchCc(val)
  }
}

const digitOnlyInput = (event) => {
  return event.charCode >= 48 && event.charCode <= 57
}

const handleSubmit = async () => {
    try {

        let newCCTransactData = {...dataPayload}

        if(dataPayload.transact_type_id == consts.cc_transacts.online_payment) {
          
          newCCTransactData.online_shop_website = shopObject.onlineStoreWebsite

          axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/cc/save-cc-op`, newCCTransactData, 'Credit Card', 'Online Payment')
        }

        if(dataPayload.transact_type_id == consts.cc_transacts.non_online_payment) {

          newCCTransactData.store_name = shopObject.storeName

          axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/cc/save-cc-nop`, newCCTransactData, 'Credit Card', 'Non-Online Payment')
        }

        if(dataPayload.transact_type_id == consts.cc_transacts.loan_promo) {
          if(!newCCTransactData.description) {
            newCCTransactData.description =  '[Credit-to-Cash Promo Loan]'
          }

          newCCTransactData.loan_thru = loanObject.loanThru
          newCCTransactData.loan_transact_no = loanObject.loanTransactNo
          newCCTransactData.loan_agent_name = loanObject.loanAgentName
          newCCTransactData.term = loanObject.term
          newCCTransactData.term_pay = loanObject.termPay

          axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/cc/save-cc-loan`, newCCTransactData, 'Credit Card', 'Credit-to-Cash Loan')
        }

        if(dataPayload.transact_type_id == consts.cc_transacts.cc_refund) {

          dataPayload.store_name = `${shopObject.onlineStoreWebsite}: ${shopObject.storeName}`

          dataPayload.post_credit_limit = dataPayload.current_credit_limit + dataPayload.amount

          axiosReqConfirmed.value = await handleAxios(`${config.apiUrl}/cc/save-cc-refund`, newCCTransactData, 'Credit Card', 'Refund')
        }

        if(axiosReqConfirmed.value == true) {
          router.push('/')
        }


    } catch (error) {
        router.push('/')
    }
}

onMounted(async () => {
    creditCardsData.value = await invokerInitializer(getCreditCards)
    trackSelection(initialIndex, 'cc')
    handleCCInitialization()
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