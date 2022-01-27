<template>
  <div class="dashboard-container-details card">
    <div class="details-header">
      <XIcon class="x-icon" @click="closeDetails" />
    </div>
    <div class="details-sprite">
      <img :src="props.sprite" />
    </div>
    <div class="details-info-row">
      <div class="details-info-name">
        <span>{{ props.name }}</span>
        <StarIcon
          class="star-icon"
          :class="[props.favourite ? 'star-icon-fovorited' : '']"
          @click="emitFavoriteUpdate(props.id)"
        />
      </div>
      <div class="details-info-id">{{ idHash(props.id) }}</div>
    </div>
    <div class="details-info-row">
      <div class="details-info-title">Types</div>
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
    <div class="details-info-row">
      <div class="details-info-title">Description</div>
      <div class="details-info-description">
        {{ props.description }}
      </div>
    </div>
    <div class="details-info-row">
      <div class="details-info-title">Base stats</div>
      <div class="details-info-stats">
        <div
          class="stats-row"
          v-for="stat in props.stats"
          :key="stat.stat.name"
        >
          <span>{{ stat.stat.name }}</span>
          <span>{{ stat.base_stat }}</span>
        </div>
      </div>
    </div>
    <div class="details-info-row">
      <div class="details-info-title">Abilities</div>
      <div class="details-abilities">
        <span
          v-for="ability in props.abilities"
          :key="ability.ability.name"
          :class="[ability.is_hidden ? 'hidden' : '']"
        >
          {{ ability.ability.name }}</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { XIcon } from "@heroicons/vue/solid";
import { StarIcon } from "@heroicons/vue/outline";
import { typesColorPair } from "@/utils";

export default defineComponent({
  name: "DetailsCard",
  components: {
    XIcon,
    StarIcon,
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
    description: String,
  },
  setup(props, { emit }) {
    function idHash(id: number) {
      if (id < 10) return `#00${id}`;
      if (id < 100) return `#0${id}`;
      else return `#${id}`;
    }

    function closeDetails() {
      emit("close-details");
    }

    function emitFavoriteUpdate(id: number) {
      emit("update-favorite", id);
    }

    return { props, idHash, typesColorPair, closeDetails, emitFavoriteUpdate };
  },
});
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";

.dashboard-container-details {
  min-height: 100vh;
  height: 100%;
  width: 35%;
  top: 0;
  right: -2%;
  position: absolute;
  padding: 15px 2rem 5px 2rem !important;
  margin-right: 2px !important;
}

.details-header {
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
}

.x-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
  color: $neutral-gray-200;
  cursor: pointer;
}

.details-sprite {
  margin-top: 0;
  widows: 100%;
  text-align: center;

  img {
    width: 90%;
  }
}

.details-info-row {
  margin: 1rem 0;
}

.details-info-name:first-child {
  font-size: 30px;
  color: $black;
  font-weight: 700;
  text-transform: capitalize;
}

.star-icon {
  width: 28px;
  height: 28px;
  margin-left: 15px;
  cursor: pointer;
}

.star-icon-fovorited {
  color: $cl-brand-gold;
}

.details-info-id {
  font-size: 18px;
  font-weight: 400;
  color: $neutral-gray-200;
}

.details-info-title {
  font-size: 24px;
  color: $black;
  font-weight: 700;
  margin-bottom: 10px;
}

.card-types {
  span {
    margin: 5px;
    font-size: 16px;
    font-weight: 400;
    border-radius: 15px;
    padding: 1px 5px;
    text-transform: capitalize;
  }
}

.details-info-description {
  font-size: 18px;
  color: $cl-other-heading;
}

.stats-row {
  border-bottom-color: $neutral-gray-200;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  padding: 10px 0px;
  display: flex;
  justify-content: space-between;

  span:first-child {
    text-transform: capitalize;
    font-size: 18px;
    color: $neutral-gray-200;
  }

  span:last-child {
    font-size: 18px;
    color: $cl-other-heading;
    font-weight: 700;
  }
}

.stats-row:first-child {
  border-top-color: $neutral-gray-200;
  border-top-style: solid;
  border-top-width: 1px;
}

.details-abilities {
  span {
    margin: 5px;
    font-size: 16px;
    font-weight: 400;
    border-radius: 14px;
    padding: 1px 10px;
    text-transform: capitalize;
    color: $black;
    background-color: $neutral-gray-150;
  }

  .hidden:before {
    content: "\2022";
    margin-right: 5px;
  }
}
</style>
