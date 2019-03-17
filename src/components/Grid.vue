<template>
  <div class="grid">
    <Row
      v-for="(row, index) in rows"
      v-bind:key="index"
      v-bind:cells="row"
      v-bind:to-remove="toRemove.indexOf(index) !== -1"
    />
  </div>
</template>

<script>
import Row from "./Row";

export default {
  props: ["rows", "toRemove"],
  components: {
    Row
  }
};
</script>

<style scoped>
.grid {
  display: flex;
  flex-direction: column;
  background: #000;
}
</style>
