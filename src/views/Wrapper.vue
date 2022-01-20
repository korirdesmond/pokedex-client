<template>
  <div class="container-fluid">
    <Nav />

    <div class="row">
      <nav class="col-md-1 d-none d-md-block bg-light sidebar">
        <div class="sidebar-sticky"></div>
      </nav>

      <main role="main" class="col-md-10 ml-sm-auto col-lg-10 px-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";

export default {
  name: "Wrapper",
  components: {
    Nav,
  },
};
</script>

<style lang="scss">
@import "@/scss/variables.scss";

/*
 * Sidebar
 */

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
}

.sidebar-sticky {
  height: 100%;
  background-color: $cl-brand-red;
}

/*
 * Content
 */

[role="main"] {
  padding-top: 133px; /* Space for fixed navbar */
}

@media (min-width: 768px) {
  [role="main"] {
    padding-top: 48px; /* Space for fixed navbar */
  }
}
</style>
