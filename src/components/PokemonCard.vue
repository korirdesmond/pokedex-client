<template>
  <div class="card">
    <div class="card-thumbnail shadow-thumb">
      <img :src="props.sprite" />
    </div>
    <div class="card-info">
      <div class="card-name">{{ props.name }}</div>
      <div class="card-id">{{ idHash(props.id) }}</div>
      <div class="card-types">
        <span
          v-for="(type, index) in props.types"
          :key="index"
          :style="{
            color: typesColorPair[type.type.name][0],
            backgroundColor: typesColorPair[type.type.name][1],
          }"
          >{{ type.type.name }}</span
        >
      </div>
    </div>
    <div class="card-action">
      <button
        class="btn btn-lg card-action-star"
        @click="emitFavoriteUpdate(props.id)"
      >
        <StarIcon
          class="star-icon"
          :class="[props.favourite ? 'star-icon-fovorited' : '']"
        />Star {{ props.favourite ? 'true' : 'fals' }}
      </button>
      <button
        class="btn btn-lg card-action-details"
        @click="emitGetDetails(props.id)"
      >
        <IdentificationIcon class="identification-icon" />Details
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IdentificationIcon, StarIcon } from "@heroicons/vue/solid";
import { typesColorPair } from "@/utils";

export default defineComponent({
  name: "PokemonCard",
  components: {
    StarIcon,
    IdentificationIcon,
  },
  props: {
    name: String,
    id: Number,
    types: Object,
    abilities: Object,
    sprite: String,
    species: Object,
    stats: Object,
    favourite: Boolean,
  },
  setup(props, { emit }) {
    function idHash(id: number) {
      if (id < 10) return `#00${id}`;
      if (id < 100) return `#0${id}`;
      else return `#${id}`;
    }

    function emitFavoriteUpdate(id: number) {
      emit("update-favorite", id);
    }

    function emitGetDetails(id: number) {
      emit("get-details", id);
    }

    return {
      props,
      typesColorPair,
      idHash,
      emitFavoriteUpdate,
      emitGetDetails,
    };
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
  text-transform: capitalize;
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
  margin-right: 10px;
}

.star-icon-fovorited {
  color: $cl-brand-gold;
}

.identification-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
  color: $neutral-gray-200;
}
</style>
