<template>
    <div class="basic-grid">
        <header>
            <Navbar />
        </header>
        <aside class="sidebar-left">
            <Sidebar />
        </aside>
        <article>
            <slot/>
        </article>
    </div>
</template>

<script>
import Sidebar from '../Sidebar'
import Navbar from '../Navbar.vue'

export default {
    components: {
        Sidebar,
        Navbar,
    }
}
</script>

<style>
.basic-grid {
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  grid-gap: 1rem;
}

header, footer {
  grid-column: 1 / 4;
}

article {
  grid-column: 2 / 4;
}

@media all and (max-width: 700px) {
  aside,
  article {
    grid-column: 1 / 4;
  }
}

</style>