<template>
    <div class="basic-grid">
        <header>
            <Navbar @stop-scroll="stopVpScroll"/>
        </header>
        <aside class="sidebar-left">
            <Sidebar :class="{'inactive': deactivateClass}" />
        </aside>
        <article class="article-style">
          <div class="router-view-div" :class="{'inactive': deactivateClass}">
            <slot>Main Content Here..</slot>
          </div>
        </article>
        <footer class="custom-footer">
          <p>2021 GCSA</p>
        </footer>
    </div>
</template>

<script>
import { ref } from 'vue'
import Sidebar from '../Sidebar.vue'
import Navbar from '../Navbar.vue'

export default {
    components: {
        Sidebar,
        Navbar,
    },
    setup() {
      const deactivateClass = ref(false)

      const stopVpScroll = (value) => {
        deactivateClass.value = value
        if(deactivateClass.value) {
          document.body.setAttribute('style', `position: fixed; right: 0; left: 0;`)
        } else {
          document.body.setAttribute('style', '')
        }
      }

      return { deactivateClass, stopVpScroll }
    }
}
</script>

<style>

  .router-view-div {
      transition: 0.5s filter ease-out;
  }

  .router-view-div.inactive, .inactive {
    pointer-events: none;
    filter: grayscale(100%) opacity(0.5);
  }

html {
  background-color: #222;
}

.basic-grid {
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  grid-template-rows: 0.1fr 1fr 0.1fr;
  grid-gap: 1rem;
  grid-template-areas:
  "header header"
  "aside article"
  "footer footer"
}

header {
  grid-area: header;
}

aside {
  grid-area: aside;
}

article {
  grid-area: article;
}

footer {
  grid-area: footer;
}

header {
  grid-column: 1 / 4;
}

/*article {
  grid-column: 2 / 4;
} */

/* Resolved the big space above dashboard content */
/* .article-style {
  height: 112vh;
} */

.custom-footer {
  position: fixed;
  bottom: 0;
  height: 50px;
  width: 100%;
  background-color: orange;
  color: #fff;
}

@media all and (max-width: 700px) {
  /* aside,
  article {
    grid-column: 1 / 4;
  } */
  article {
    grid-column: 1 / 4;
  }
  .basic-grid {
    grid-template-columns: 1fr;
    grid-template-areas:
    "header"
    "article"
    "footer"
  }
}

</style>