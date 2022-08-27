<template>
  <div id="main-content">
    <div class="grid-tile">
      <div 
        class="grid-tile-item blue-1" 
        v-for="(gCash, index) in gCashData" 
        key="index" 
      >
        <p class="tile-title">
          <ArticleTitleSlot>
            {{ gCash.account_nick }}
          </ArticleTitleSlot>
        </p>
        <p class="tile-subtitle">
            <ArticleSubtitleSlot>
              Last 4 digits: {{ gCash.last_4_digits }}
            </ArticleSubtitleSlot>
        </p>
        <details>
          <summary>Balance</summary>
          {{ gCash.balance_wc }}
        </details>
      </div>
      <div 
        class="grid-tile-item" 
        :class="{ 'red-1' : index === 0, 'security-bank dark-grey' :  index === 1, 'union-bank' : index === 2}" 
        v-for="(sa, index) in savingsAcctData" 
        key="index" 
      >
          <p class="tile-title">
            <ArticleTitleSlot>
              {{ sa.bank_name }}
            </ArticleTitleSlot>
          </p>
          <details>
            <summary>Balance</summary>
            {{ sa.balance_wc }}
          </details>
      </div>
      <div 
        class="grid-tile-item purple-1" 
        v-for="(cc, index) in creditCardsData" 
        key="index" 
      >
        <p class="tile-title">
          <ArticleTitleSlot>
            {{ cc.cc_name }}
          </ArticleTitleSlot>
        </p>
        <p class="tile-subtitle">
            <ArticleSubtitleSlot>
              Last 4 digits: {{ cc.last_4_digits }}
            </ArticleSubtitleSlot>
        </p>
        <details>
          <summary>Available Credit Limit</summary>
          {{ cc.avail_credit_limit }}
        </details>
      </div>
      <div class="grid-tile-item purple-1">
        <p class="tile-title">
          <ArticleTitleSlot>
            Random Anime Quotes
          </ArticleTitleSlot>
        </p>
        <p class="tile-subtitle">
          <ArticleSubtitleSlot>
            using Animechan API
          </ArticleSubtitleSlot>
        </p>
        <div id="aniQuote-content">
            <div class="spinner-wrapper" v-if="loading">
              <div class="spinner">
                  <div></div>
                  <div></div>
              </div>
            </div>
            <div class="quote-wrapper" v-else>
              <div id="quote">{{aniQuote.quote}}</div>
              <div id="character">{{aniQuote.character}}</div>
              <div id="animeTitle">{{aniQuote.anime}}</div>
            </div>
        </div>
        <div id="custom-button" @click="loadAniQuote">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-click" style="position: absolute;" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <line x1="3" y1="12" x2="6" y2="12" />
            <line x1="12" y1="3" x2="12" y2="6" />
            <line x1="7.8" y1="7.8" x2="5.6" y2="5.6" />
            <line x1="16.2" y1="7.8" x2="18.4" y2="5.6" />
            <line x1="7.8" y1="16.2" x2="5.6" y2="18.4" />
            <path d="M12 12l9 3l-4 2l-2 4l-3 -9" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import ArticleTitleSlot from './slots/ArticleTitleSlot.vue'
import ArticleSubtitleSlot from './slots/ArticleSubtitleSlot.vue'

import { invokerInitializer } from '../helpers/helpers.service.js'

import { getSavingsAccs } from '../composables/getBanksInfo.js'
import { getCreditCards  } from '../composables/getCcsInfo.js'
import { getGCashInfo } from '../composables/getGCashInfo'
import { aniQuote, generateAniQuote } from '../composables/getAniQuote'

export default {
    components: {
        ArticleTitleSlot,
        ArticleSubtitleSlot
    },
    setup() {

      let loading = ref(false)

      let gCashData = ref([])

      let savingsAcctData = ref([])

      let creditCardsData = ref([])

      const loadAniQuote = async () => {
        try {
          loading.value = true
          await generateAniQuote()  
          loading.value = false
        } catch (error) {
          console.log(error)
        }
      }

      onMounted(async () => {

        gCashData.value = await invokerInitializer(getGCashInfo)
        
        loadAniQuote()
        
        savingsAcctData.value = await invokerInitializer(getSavingsAccs)
  
        creditCardsData.value = await invokerInitializer(getCreditCards)
      })
      
      return { gCashData, savingsAcctData, creditCardsData, loading, aniQuote, loadAniQuote }
    }
}
</script>

<style scoped>
  #main-content {
    opacity: 0;
    animation-name: wrapper-fadein;
    animation-duration: var(--anim-duration);
    animation-fill-mode: var(--anim-fill-mode);
  }

  @keyframes wrapper-fadein {
      to {
          opacity: 1;
      }
  }

  article p {
      font-weight: normal;
  }

  .spoiler {
    position: relative;
    /* background-color: hsl(0,0%,24%); */
    border-radius: 5px;
    /* border: grey dashed 1px; */
    color: hsl(210,9%,91.5%);
    cursor: pointer;
    min-height: 48px;
    padding-left:5px;
  }

  .spoiler::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 4px;
    border-radius: 8px;
    background: grey;
  }

  .blue-1 {
    background-color: #3e8ed0;
  }

  .security-bank {
    background-color: #016cae;
    background-image: linear-gradient(to right, #a0cf67 , #016cae);
  }

  .union-bank {
    background-color: #fd8506;
    background-image: linear-gradient(-269deg, rgb(204, 130, 0) 7%, rgb(204, 130, 0) 17%, rgb(190, 43, 4) 98%);
  }

  .red-1 {
    background-color: #f14668;
  }

  .yellow-1 {
    background-color: #ffe08a;
  }

  .orange-1 {
    background-color: #fd8506;
  }

  .purple-1 {
    background-color: #6d5c71;
  }

  .green-1 {
    background-color: #48c78e;
  }

  .dark-grey {
    color: #303030;
  }

  .grid-tile {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(4, 1fr);

    /* padding-block: 2rem; */
    /* width: min(95%, 70rem); */
    margin-inline: auto;
  }

  .grid-tile-item {
    padding: 2rem;
    border-radius: 0.3rem;
    /* box-shadow: 2.5rem 3.75rem 3rem 1rem; */
  }

  /* .grid-tile-span-2 {
    grid-column: span 2;
  } */

  .grid-tile-item:nth-child(3), .grid-tile-item:nth-child(5)  {
    grid-column-start: 1;
  }

  .grid-tile-item:last-child {
    grid-column-start: 3;
    grid-row-start: 1;
    grid-row-end: 4;
  }

  .tile-title {
    font-size: 1.6rem;
    color: #fff;
  }

  .tile-subtitle {
    font-size: 0.7rem;
    margin-top: -1.25rem;
    margin-bottom: 1.5rem;
    font-weight: normal;
  }

  /* #aniQuote-content {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  } */

  #quote::before {
    content: '"'
  }

  #quote::after {
    content: '"'
  }

  #quote {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }

  #character, #animeTitle {
    text-align: right;
  }

  #character::before {
    content: '\01D116\00A0';
  }

  #animeTitle::before {
    content: 'Anime: ';
  }

  #custom-button {
    /* position: absolute;
    bottom: 1.5rem;
    left: 1.5rem; */
    height: 2.63rem;
    width: 2.63rem;
    background-color: inherit;
    border: dashed orange 1px;
    border-radius: 5px;
    padding: 0.5rem;
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    cursor: pointer;
    /* transition-duration: 1000ms;
    transition-property: transform;
    transition-timing-function: ease-in-out; */
  }

  #custom-button:hover {
    box-shadow: 3px 2px 22px 1px rgba(89, 126, 141, 1);
  }

  #custom-button:active {
    transform: scale(0.9);
  }

  /* details[open] summary ~ * {
    animation: open .5s ease-in-out;
  }

  @keyframes open {
    0%    {opacity: 0; transform: translateX(-10px)}
    100%  {opacity: 1; transform: translateX(0)}
  } */

  .right-padding {
    padding-right: 1.5rem;
  }

  .spinner-wrapper {
    display: flex;  
    justify-content: center;
  }

  .spinner {
    width: 6.25rem;
    height: 6.25rem;
    position: relative;
  }

  .spinner div {
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    border: 10px solid transparent;
    border-top-color: #ad60f5;
    border-radius: 50%;
    animation: spinnerOne 1.2s linear infinite;
  }

  .spinner div:nth-child(2) {
    border: 10px solid transparent;
    border-bottom-color: #ad60f5;
  }

  @keyframes spinnerOne {
    0% { transform: rotate(0deg); border-width: 10px; }
    50% { transform: rotate(180deg); border-width: 1px; }
    100% { transform: rotate(360deg); border-width: 10px; }
  }

  @media all and (max-width: 700px) {

    #main-content {    
      font-size: 1.5rem;
    }

    .tile.is-ancestor {
      margin: 0;
    }

    .grid-tile {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
</style>