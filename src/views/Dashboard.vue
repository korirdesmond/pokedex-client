<template>
  <div class="container-fluid">
    <div class="dashboard-container">
      <div
        class="dashboard-container-main"
        :class="[detailOpened ? 'container-main' : '']"
      >
        <div class="page-heading">Pokémons</div>

        <div class="loading-content" v-if="loading">
          <img class="pokeball-icon" src="../assets/Loading.svg" />
        </div>
        <div class="page-content" v-else>
          <div class="row row-stats">
            <StatsCard title="Pokémons" :value="pokemonStats" />
            <StatsCard title="Species" :value="speciesStats" />
            <StatsCard title="Types" :value="typesStats" />
          </div>

          <div class="row-pokemons">
            <PokemonCard
              v-for="pokemon in pagePokemons"
              :key="pokemon.id"
              v-bind="pokemon"
              @update-favorite="updateFavorite"
              @get-details="getDetails"
            />
          </div>

          <div class="card pagination-container">
            <n-pagination
              v-model:page="page"
              :page-count="pageCount"
              :page-slot="7"
            >
              <template #prev
                ><ArrowNarrowLeftIcon
                  class="arrow-left-icon"
                />Previous</template
              >
              <template #next
                >Next <ArrowNarrowRightIcon class="arrow-right-icon"
              /></template>
            </n-pagination>
          </div>
        </div>
      </div>
      <DetailsCard
        v-if="detailOpened"
        v-bind="selectedPokemon"
        @close-details="closeDetails"
        @update-favorite="updateFavorite"
      />
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed, reactive, defineComponent } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import emitter from "tiny-emitter/instance";
import StatsCard from "@/components/StatsCard.vue";
import PokemonCard from "@/components/PokemonCard.vue";
import DetailsCard from "@/components/DetailsCard.vue";
import { NPagination } from "naive-ui";
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/vue/solid";

export default defineComponent({
  name: "Dashboard",
  components: {
    StatsCard,
    PokemonCard,
    NPagination,
    DetailsCard,
    ArrowNarrowLeftIcon,
    ArrowNarrowRightIcon,
  },
  setup(props) {
    const page = ref(1);
    const pageCount = ref(1);
    const pokemons = ref([]);
    const searchData = ref([]);
    const loading = ref(false);
    const detailOpened = ref(false);
    const selectedPokemon = reactive({});
    const router = useRouter();

    const pagePokemons = computed(() => {
      const startIdx = page.value * 10 - 10;
      const endIdx = page.value * 10;
      return pokemons.value.slice(startIdx, endIdx);
    });

    const pokemonStats = computed(() => pokemons.value.length);
    const speciesStats = computed(() => {
      const seen = {};
      const count = pokemons.value.reduce((acc, item) => {
        if (!seen[item.species.name]) {
          acc += 1;
          seen[item.species.name] = true;
        }
        return acc;
      }, 0);
      return count;
    });
    const typesStats = computed(() => {
      const seen = {};
      const count = pokemons.value.reduce((acc, item) => {
        let i = 0;
        while (i < item.types.length) {
          if (!seen[item.types[i].type.name]) {
            acc += 1;
            seen[item.types[i].type.name] = true;
          }
          i++;
        }
        return acc;
      }, 0);
      return count;
    });

    onMounted(() => {
      emitter.on("search", (value) => filterData(value));
      loading.value = true;
      fetchPokemons();
    });

    function fetchPokemons() {
      return axios
        .get("pokemons?limit=60", {
          headers: { Authorization: `${localStorage.token}` },
        })
        .then((response) => {
          const { data } = response;

          pokemons.value = [...data];
          searchData.value = [...data];
          pageCount.value = data.length / 10;
          loading.value = false;
        })
        .catch((error) => {
          loading.value = false;
          const { message } = error.response?.data;

          if (message === "jwt expired") {
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            router.push("/login");
          }
          console.log("error", error);
        });
    }

    function updateFavorite(pokemonId) {
      return axios
        .patch(
          `pokemons/${pokemonId}`,
          {},
          {
            headers: { Authorization: `${localStorage.token}` },
          }
        )
        .then(() => {
          fetchPokemons();
        })
        .catch((error) => {
          console.log("error", error);
        });
    }

    function filterData(value) {
      const data = [...searchData.value];

      const filteredData =
        value === ""
          ? data
          : data.filter((item) => item.name.includes(value.toLowerCase()));
      pokemons.value = [...filteredData];
      pageCount.value = filteredData.length / 10;
      page.value = 1;
      return;
    }

    function getDetails(id) {
      const pokemon = pagePokemons.value.find((item) => item.id === id);
      Object.assign(selectedPokemon, pokemon);
      detailOpened.value = true;
      return;
    }

    function closeDetails() {
      detailOpened.value = false;
    }

    return {
      pokemonStats,
      speciesStats,
      typesStats,
      page,
      pageCount,
      pagePokemons,
      loading,
      updateFavorite,
      detailOpened,
      selectedPokemon,
      getDetails,
      closeDetails,
      props,
    };
  },
});
</script>

<style lang="scss">
@import "@/scss/variables.scss";

.dashboard-container {
  width: 100%;
  position: relative;
}

.dashboard-container-main {
  width: 100%;
  padding-right: 1px;
}

.container-main {
  padding-right: 5px !important;
  width: 100%;

  @media (min-width: 768px) {
    width: 65% !important;
    padding-right: 1px;
  }
}

.page-heading {
  font-size: 36px;
  color: $cl-main-heading;
  font-weight: 700;
  margin-bottom: 20px;
}

.page-content {
  .row {
    margin: 0;
  }
}

.row-stats {
  margin: 1rem 0rem;
}

.row-pokemons {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}

.pagination-container {
  width: 95%;
  height: 4rem;
  margin-bottom: 2rem;
  padding: 0px 10px;
}

.n-pagination {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.n-pagination-item:first-child {
  position: absolute;
  left: 0;
}

.n-pagination-item:last-child {
  position: absolute;
  right: 0;
}

.n-pagination-item--active {
  color: $cl-brand-red !important;
  height: 100% !important;
  border-bottom: none !important;
  border-right: none !important;
  border-left: none !important;
  border-top-color: $cl-brand-red !important;
  border-top-width: 2px !important;
  border-radius: 0px !important;
}

.arrow-left-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.arrow-right-icon {
  width: 24px;
  height: 24px;
  margin-left: 10px;
}

.pokeball-icon {
  width: 30%;
  margin-top: 4rem;
}

.loading-content {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
