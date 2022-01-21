<template>
  <div class="container-fluid">
    <div class="page-heading">Pokemons</div>
    <div class="page-content">
      <div class="row row-stats">
        <StatsCard title="Pokemons" :value="pokemonStats" />
        <StatsCard title="Species" :value="pokemonStats" />
        <StatsCard title="Types" :value="pokemonStats" />
      </div>

      <div class="row-pokemons">
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
      </div>

      <div class="card pagination-container">
        <n-pagination v-model:page="page" :page-count="100" :page-slot="7">
          <template #prev
            ><ArrowNarrowLeftIcon class="arrow-left-icon" />Previous</template
          >
          <template #next
            >Next <ArrowNarrowRightIcon class="arrow-right-icon"
          /></template>
        </n-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import StatsCard from "@/components/StatsCard.vue";
import PokemonCard from "@/components/PokemonCard.vue";
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
    ArrowNarrowLeftIcon,
    ArrowNarrowRightIcon,
  },
  setup() {
    const pokemonStats = ref(100);
    const page = ref(1);

    return { pokemonStats, page };
  },
};
</script>

<style lang="scss">
@import "@/scss/variables.scss";

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
  width: 100%;
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
</style>
