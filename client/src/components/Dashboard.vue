<template>
  <div class="tile is-ancestor">
  <div class="tile is-vertical is-8">
    <div class="tile">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child notification is-primary">
          <p class="title">
              <ArticleTitleSlot>
                  Sample Bank 1
              </ArticleTitleSlot>
          </p>
          <p class="subtitle">
              <ArticleSubtitleSlot>
                  Current balance:
              </ArticleSubtitleSlot>
          </p>
        <div class="content">
        <!-- Content -->
        {{ sa1Balance }}
        </div>
        </article>
        <article class="tile is-child notification is-warning">
          <p class="title">
               <ArticleTitleSlot />
          </p>
          <p class="subtitle">
              <ArticleSubtitleSlot/>
          </p>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification is-info">
          <p class="title">
               <ArticleTitleSlot />
          </p>
          <p class="subtitle">
              <ArticleSubtitleSlot>
                  With an image
              </ArticleSubtitleSlot>
          </p>
          <figure class="image is-4by3">
            <img src="https://bulma.io/images/placeholders/640x480.png">
          </figure>
        </article>
      </div>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child notification is-danger">
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
</template>

<script>
import { ref, onMounted } from 'vue'
import ArticleTitleSlot from './slots/ArticleTitleSlot.vue'
import ArticleSubtitleSlot from './slots/ArticleSubtitleSlot.vue'

export default {
    components: {
        ArticleTitleSlot,
        ArticleSubtitleSlot
    },
    setup() {

        let sa1Balance = ref([])
        
        const getSa1Balance = async () => {
            const response = await fetch('http://localhost:5000/sa/sa1-bal', {
                method: 'GET'
            })
            .then( res => {
                return res.json()
            })
            .then(data => sa1Balance.value = data)
            .catch(error => console.log(error))

            console.log(response)
        }

        onMounted(() => {
            getSa1Balance()
        })

        return { sa1Balance, getSa1Balance }
    }
}
</script>

<style scoped>
article p {
    font-weight: normal;
}
</style>