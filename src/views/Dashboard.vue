<template>
  <div class="container-fluid">
    <div class="dashboard-container">
      <div
        class="dashboard-container-main"
        :style="{
          width: detailOpened ? '65%' : '100%',
          paddingRight: detailOpened ? '5px' : '1px',
        }"
      >
        <div class="page-heading">Pokemons</div>

        <div class="page-content" v-if="loading">
          <img class="pokeball-icon" src="../assets/Pokeball.svg" />
        </div>
        <div class="page-content" v-else>
          <div class="row row-stats">
            <StatsCard title="Pokemons" :value="pokemonStats" />
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
      />
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed, reactive } from "vue";
import axios from "axios";
import StatsCard from "@/components/StatsCard.vue";
import PokemonCard from "@/components/PokemonCard.vue";
import DetailsCard from "@/components/DetailsCard.vue";
import { NPagination } from "naive-ui";
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/vue/solid";

export default {
  name: "Dashboard",
  components: {
    StatsCard,
    PokemonCard,
    NPagination,
    DetailsCard,
    ArrowNarrowLeftIcon,
    ArrowNarrowRightIcon,
  },
  setup() {
    const page = ref(1);
    const pageCount = ref(1);
    const pokemons = ref([]);
    const loading = ref(false);
    const detailOpened = ref(false);
    const selectedPokemon = reactive({});

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
      loading.value = true;
      fetchPokemons();
    });

    function fetchPokemons() {
      return axios
        .get("pokemons", {
          headers: { Authorization: `${localStorage.token}` },
        })
        .then((response) => {
          const { data } = response;
          pokemons.value = [...data];
          pageCount.value = data.length / 10;
          loading.value = false;
        })
        .catch((error) => {
          loading.value = false;
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
        .then((response) => {
          const { data } = response;
          fetchPokemons();
        })
        .catch((error) => {
          console.log("error", error);
        });
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
    };
  },
};
</script>

<style lang="scss">
@import "@/scss/variables.scss";

.dashboard-container {
  width: 100%;
  position: relative;
}

.page-heading {
  font-size: 30px;
  color: $cl-main-heading;
  font-weight: 700;
  margin-bottom: 5px;
}

.page-content {
  .row {
    margin: 0;
  }
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
  height: 200px;
  width: 200px;
}
</style>
