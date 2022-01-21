<template>
  <div class="container-fluid">
    <Nav />

    <div class="row">
      <nav class="col-md-1 d-none d-md-block bg-light sidebar">
        <div class="sidebar-sticky"></div>
      </nav>

      <main role="main" class="col-md-11 col-lg-11 pl-1">
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
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  min-height: 100vh;
  height: 100vh;
}

.sidebar-sticky {
  height: 100%;
  background-color: $cl-brand-red;
}

/*
 * Content
 */

[role="main"] {
  padding-top: 130px; /* Space for fixed navbar */
  background-color: $neutral-gray-50;
}

@media (min-width: 768px) {
  [role="main"] {
    padding-top: 120px; /* Space for fixed navbar */
  }
}
</style>
