<template>
  <div class="col-md-3 col-lg-3 card">
    <div class="card-title">{{ props.title }}</div>
    <div class="card-stats">{{ props.value }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
interface Props {
  title: string;
  value: number;
}
export default defineComponent({
  name: "StatsCard",
  props: {
    title: String,
    value: Number,
  },
  setup(props): any {
    return { props };
  },
});
</script>

<style lang="scss">
@import "@/scss/variables.scss";

.card {
  background-color: $white;
  margin-right: 1rem;
  padding: 10px 20px;
}

.card-title {
  font-size: 16px;
  color: $cl-other-heading;
  margin: 0px;
}

.card-stats {
  font-size: 30px;
  color: $cl-main-heading;
  font-weight: 700;
}
</style>
