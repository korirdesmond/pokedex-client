<template>
  <nav class="navbar navbar-expand-md navbar-light fixed-top">
    <a class="navbar-brand col-sm-3 col-md-1 mr-0" href="#"
      ><img class="navbar-brand_logo" src="../assets/Logo.svg"
    /></a>

    <div class="navbar-right shadow-base collapse navbar-collapse">
      <SearchIcon class="search-icon" />
      <input
        class="form-control form-control-light w-90"
        type="text"
        placeholder="Search all pokemons"
        aria-label="Search"
      />
      <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="dropdown01"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
            >Name Name</a
          >
          <div class="dropdown-menu" aria-labelledby="dropdown01">
            <a class="dropdown-item" href="#">Logout</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { SearchIcon } from "@heroicons/vue/solid";
export default {
  name: "Nav",
  components: {
    SearchIcon,
  },
};
</script>

<style lang="scss">
@import "@/scss/global.scss";

.navbar {
  height: 100px;
  padding: 0px;
  background-color: $white;
}

.bg-light {
  background-color: $white;
}

.navbar-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: $cl-brand-red;
}

.navbar-brand_logo {
  height: 50%;
}

.navbar-right {
  height: 100%;
  padding: 0 10px;
}

.navbar .form-control {
  padding: 0.75rem 1rem 0.75rem 0rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-light {
  color: $black;
  background-color: $white;
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
}

.search-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
</style>
