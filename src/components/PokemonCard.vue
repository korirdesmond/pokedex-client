<template>
  <div class="card">
    <div class="card-thumbnail shadow-thumb">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
      />
    </div>
    <div class="card-info">
      <div class="card-name">Bullbasar</div>
      <div class="card-id">#001</div>
      <div class="card-types">
        <span>Grass</span>
        <span>Poison</span>
      </div>
    </div>
    <div class="card-action">
      <button class="btn btn-lg card-action-star">
        <StarIcon class="star-icon" />Star
      </button>
      <button class="btn btn-lg card-action-details">
        <IdentificationIcon class="identification-icon" />Details
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IdentificationIcon, StarIcon } from "@heroicons/vue/solid";

export default defineComponent({
  name: "PokemonCard",
  components: {
    StarIcon,
    IdentificationIcon,
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 340px;
  width: 300px;
  padding: 0px;
  margin-bottom: 1rem;
}

.card-thumbnail {
  border-radius: 50%;
  margin-top: 2rem;

  img {
    width: 140px;
  }
}

.card-info {
  text-align: center;
}

.card-name {
  font-size: 16px;
  font-weight: 700;
  color: $cl-main-heading;
}

.card-id {
  font-size: 16px;
  font-weight: 400;
  color: $neutral-gray-200;
}

.card-types {
  span {
    margin: 5px;
    font-size: 12px;
    font-weight: 400;
    border-radius: 8px;
    padding: 1px 5px;
    text-transform: capitalize;
  }
}

.card-action {
  width: 100%;

  .btn {
    width: 50%;
    border-top: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0px;
  }

  .btn:first-child {
    width: 50%;
    border-right: 1px solid rgba(0, 0, 0, 0.125);
  }
}

.star-icon {
  width: 24px;
  height: 24px;
  color: $cl-brand-gold;
  margin-right: 10px;
}

.identification-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
  color: $neutral-gray-200;
}
</style>
