<template>
  <nav class="navbar navbar-expand-md navbar-light fixed-top">
    <a class="navbar-brand col-sm-1 col-md-1 mr-0" href="#"
      ><img class="navbar-brand_logo" src="../assets/Pokeball.svg"
    /></a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
      @click="toggleMenu"
    >
      <MenuIcon class="menu-icon" />
    </button>

    <div
      class="navbar-right shadow-base collapse navbar-collapse"
      :class="[isMenuOpened ? 'show' : '']"
    >
      <form class="">
        <div class="input-group">
          <span class="input-group-text" id="basic-addon1"
            ><SearchIcon class="search-icon"
          /></span>
          <input
            type="text"
            class="form-control form-control-light"
            placeholder="Search all pokemons"
            aria-describedby="basic-addon1"
          />
        </div>
      </form>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            id="dropdown01"
            @click="toggleDropdown"
            >{{ name }}</a
          >
          <div
            class="dropdown-menu"
            :class="[isDropdownOpened ? 'show' : '']"
            aria-labelledby="dropdown01"
          >
            <a class="dropdown-item" @click="logout">Logout</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { SearchIcon, MenuIcon } from "@heroicons/vue/solid";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Nav",
  components: {
    SearchIcon,
    MenuIcon,
  },
  setup() {
    const isMenuOpened = ref(false);
    const isDropdownOpened = ref(false);
    const router = useRouter();
    const name = localStorage.getItem("name");

    function toggleMenu() {
      isMenuOpened.value = !isMenuOpened.value;
      isDropdownOpened.value = false;
    }
    function toggleDropdown() {
      isDropdownOpened.value = !isDropdownOpened.value;
    }

    function logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      isDropdownOpened.value = false;
      isMenuOpened.value = false;
      router.push("/login");
    }

    return {
      toggleMenu,
      isMenuOpened,
      toggleDropdown,
      isDropdownOpened,
      logout,
      name,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/global.scss";

.navbar {
  height: 100px;
  padding: 0px;
  background-color: $cl-brand-red;
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
  background-color: $cl-brand-red;

  @media (min-width: 768px) {
    background-color: $white;
  }
}

form {
  width: 100%;
  max-width: none;
  padding: 0px;
}

.form-control {
  padding: 0.75rem 1rem 0.75rem 1rem !important;
  border-width: 0;
  border-radius: 0;
}

.form-control-light {
  color: $black;
  background-color: $white;
}

.input-group-text {
  color: $neutral-gray-200;
  background-color: $white;
  border: none;
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

.menu-icon {
  width: 28px;
  height: 28px;
}

.navbar-toggler {
  color: $white;
  background-color: inherit;
}

.col-sm-1 {
  width: auto !important;
}

.show {
  .navbar-nav {
    margin: 1rem 0;
    color: $white;
  }

  .nav-link {
    color: $white;
    font-size: 20px;
  }
}

.dropdown-menu {
  right: 1%;
  left: unset;
}

.dropdown {
  background-color: $cl-brand-red;
  color: $white;

  @media (min-width: 768px) {
    background-color: $white;
  }
}

.dropdown-menu {
  background-color: $cl-brand-red;
  color: $white;

  @media (min-width: 768px) {
    background-color: $white;
  }
}

.dropdown-item {
  color: $white;

  @media (min-width: 768px) {
    color: $black !important;
  }
}

.nav-link {
  color: $white;

  @media (min-width: 768px) {
    color: $black;
  }
}
</style>
