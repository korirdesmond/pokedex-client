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

      <div class="card pagination-container"></div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import StatsCard from "@/components/StatsCard.vue";
import PokemonCard from "@/components/PokemonCard.vue";

export default {
  name: "Dashboard",
  components: {
    StatsCard,
    PokemonCard,
  },
  setup() {
    const pokemonStats = ref(100);
    const pageOfItems = ref([]);

    return { pokemonStats };
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
}
</style>
