<template>
  <div class="row">
    <Cell
      v-for="(cell, index) in cells"
      v-bind:key="index"
      v-bind:value="cell"
      v-bind:to-remove="toRemove"
    />
  </div>
</template>

<script>
import Cell from "./Cell";

export default {
  props: ["cells", "toRemove"],
  components: {
    Cell
  }
};
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
}
</style>
