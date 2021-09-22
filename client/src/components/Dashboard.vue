<template>
  <div id="main-content">
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-8">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification is-info custom-tile">
              <p class="title">
                  <ArticleTitleSlot>
                      {{ gCashNickname }}
                  </ArticleTitleSlot>
              </p>
              <div class="content">
                <details>
                    <summary>Balance</summary>
                    {{ gCashBalance }}
                </details>
              </div>
            </article>
            <article class="tile is-child notification is-danger">
              <p class="title">
                  <ArticleTitleSlot>
                      {{ bankName }}
                  </ArticleTitleSlot>
              </p>
              <div class="content">
                <details>
                    <summary>Balance</summary>
                    {{ sa1Balance }}
                </details>
              </div>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child right-padding notification" style="background-color: #6D5C71;">
              <p class="title">
                  <ArticleTitleSlot>
                      Random Anime Quotes
                  </ArticleTitleSlot>
              </p>
              <p class="subtitle" style="font-size: 0.7rem;">
                  <ArticleSubtitleSlot>
                      using Animechan API
                  </ArticleSubtitleSlot>
              </p>
              <!-- <figure class="image is-4by3">
                <img src="https://picsum.photos/id/16/2500/1667">
              </figure> -->
              <div class="content">
                <div id="aniQuote-content">
                  <div id="charQuote">{{aniQuote.quote}}</div>
                  <div id="character">&#8210;&nbsp;{{aniQuote.character}}</div>
                  <div id="anime">Anime: {{aniQuote.anime}}</div>
                </div>
                <div id="custom-button" @click="generateAniQuote">
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
            </article>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification is-primary">
            <p class="title">
                <ArticleTitleSlot />
            </p>
            <p class="subtitle">
                <ArticleSubtitleSlot/>
            </p>
            <div class="content">
              <!-- Content -->
              Content
            </div>
          </article>
        </div>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification is-success">
          <div class="content">
            <p class="title">
                <ArticleTitleSlot />
            </p>
            <p class="subtitle">
                <ArticleSubtitleSlot/>
            </p>
            <div class="content">
              <!-- Content -->
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import ArticleTitleSlot from './slots/ArticleTitleSlot.vue'
import ArticleSubtitleSlot from './slots/ArticleSubtitleSlot.vue'

import { bankName, sa1Balance, getSa1Info } from '../composables/getSa1Info'
import { gCashNickname, gCashBalance, getGCashInfo } from '../composables/getGCashInfo'
import { aniQuote, generateAniQuote } from '../composables/getAniQuote'

export default {
    components: {
        ArticleTitleSlot,
        ArticleSubtitleSlot
    },
    setup() {
      onMounted(async () => {
        await getSa1Info()
        await getGCashInfo()
        await generateAniQuote()
      })

      return { bankName, sa1Balance, gCashNickname, gCashBalance, aniQuote, generateAniQuote }
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

#aniQuote-content {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

#charQuote::before {
  content: '"'
}

#charQuote::after {
  content: '"'
}

#charQuote {
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

#anime {
  inline-size: 200px;
  text-align: right;
}

#custom-button {
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
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

@media all and (max-width: 700px) {

  #main-content {
    width: 96vw;
    font-size: 1.5rem;
  }

  #main-content {
    margin: 0 0.5rem;
  }

  /* .tile.is-ancestor {
    margin: 0 -0.5rem;
  } */
}
</style>