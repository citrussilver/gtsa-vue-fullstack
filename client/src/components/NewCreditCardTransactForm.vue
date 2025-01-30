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

                    <div class="form-group" v-if="dataPayload.transact_type_id === consts.cc_transacts.loan_promo.id">
                      <label class="control-label white">Term</label>
                      <select class="custom-select" v-model="ccObject.term">
                          <option value="Monthly">Monthly</option>
                          <option value="6 Months">6 Months</option>
                          <option value="12 Months">12 Months</option>
                        </select>
                    </div>
                    <div class="form-group" v-if="dataPayload.transact_type_id === consts.cc_transacts.loan_promo.id">
                      <label class="control-label white">Term Payment</label><br>
                      <input type="number" class="form-control" min="1" step="any" pattern=" 0+\.[0-9]*[1-9][0-9]*$" @keypress="digitOnlyInput" v-model="ccObject.termPay"/>
                    </div>
                    <div class="form-group" v-if="dataPayload.transact_type_id === consts.cc_transacts.loan_promo.id">
                      <label class="control-label white">Transaction No.</label><br>
                      <input type="text" class="form-control" placeholder="Ask the agent about Transaction No." v-model="ccObject.loanTransactNo"/>
                    </div>
                    <div class="form-group" v-if="dataPayload.transact_type_id === consts.cc_transacts.loan_promo.id">
                      <label class="control-label white">Agent Name</label><br>
                      <input type="text" class="form-control" v-model="ccObject.loanAgentName"/>
                    </div>
                    <div class="form-group" v-if="dataPayload.transact_type_id === consts.cc_transacts.loan_promo.id">
                      <label class="control-label white">Loan Thru</label>
                      <select class="custom-select" v-model="ccObject.loanThru">
                          <option value="phone">Phone</option>
                          <option value="branch">Branch</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="control-label white" v-if="dataPayload.transact_type_id === consts.cc_transacts.non_online_payment.id">Store Name:</label>
                        <label class="control-label white" v-else>Online Shop Website:</label>
                        <select v-if="[consts.cc_transacts.online_payment.id, consts.cc_transacts.cc_refund.id].includes(dataPayload.transact_type_id)" class="custom-select" v-model="shopObject.onlineStoreWebsite">
                            <option v-for="onlineStore in formDetails.onlineStoreWebsite" :key="onlineStore.val" :value="onlineStore.name">{{ onlineStore.name }}</option>
                        </select>
                        <div v-if="dataPayload.transact_type_id === consts.cc_transacts.cc_refund.id">
                          <br/>
                        </div>
                        <label class="control-label white">{{ dataPayload.transact_type_id === consts.cc_transacts.cc_refund.id ? 'Store Name:' : ''}}</label>
                        <input v-if="[consts.cc_transacts.non_online_payment.id, consts.cc_transacts.cc_refund.id].includes(dataPayload.transact_type_id)" type="text" class="form-control" v-model="shopObject.storeName">
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

import { invokerInitializer } from '../helpers/helpers.service.js'

import { createTransaction } from '../http/transact-api.js'

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

        newCCTransactData.account_type = 'Credit Card'

        if(dataPayload.transact_type_id == consts.cc_transacts.online_payment.id) {
          
          newCCTransactData.online_shop_website = shopObject.onlineStoreWebsite

          newCCTransactData.transaction = consts.cc_transacts.online_payment.name

          axiosReqConfirmed.value = await createTransaction('cc/save-cc-op', newCCTransactData)
        }

        if(dataPayload.transact_type_id == consts.cc_transacts.non_online_payment) {

          newCCTransactData.store_name = shopObject.storeName

          newCCTransactData.transaction = consts.cc_transacts.non_online_payment.name

          axiosReqConfirmed.value = await createTransaction('cc/save-cc-nop', newCCTransactData)
        }

        if(dataPayload.transact_type_id == consts.cc_transacts.loan_promo.id) {
          if(!newCCTransactData.description) {
            newCCTransactData.description =  '[Credit-to-Cash Promo Loan]'
          }

          newCCTransactData.loan_thru = loanObject.loanThru
          newCCTransactData.loan_transact_no = loanObject.loanTransactNo
          newCCTransactData.loan_agent_name = loanObject.loanAgentName
          newCCTransactData.term = loanObject.term
          newCCTransactData.term_pay = loanObject.termPay
          
          newCCTransactData.transaction = consts.cc_transacts.loan_promo.name

          axiosReqConfirmed.value = await createTransaction('cc/save-cc-loan', newCCTransactData)
        }

        if(dataPayload.transact_type_id == consts.cc_transacts.cc_refund.id) {

          dataPayload.store_name = `${shopObject.onlineStoreWebsite}: ${shopObject.storeName}`

          dataPayload.post_credit_limit = dataPayload.current_credit_limit + dataPayload.amount

          newCCTransactData.transaction = consts.cc_transacts.cc_refund.name


          axiosReqConfirmed.value = await createTransaction('cc/save-cc-refund', newCCTransactData)
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