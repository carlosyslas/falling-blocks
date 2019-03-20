<template>
  <div class="grid">
    <Row v-bind:cells="firstRow"/>
    <Row
      v-for="(row, index) in rowsWithWalls"
      v-bind:key="index"
      v-bind:cells="row"
      v-bind:to-remove="toRemove.indexOf(index) !== -1"
    />
    <Row v-bind:cells="lastRow"/>
  </div>
</template>

<script>
import Row from "./Row";
import { GRID_SIZE, WALL } from "../constants";

export default {
  props: ["rows", "toRemove"],
  data: () => ({
    firstRow: Array.from(Array(GRID_SIZE.width + 2)).map(() => WALL),
    lastRow: Array.from(Array(GRID_SIZE.width + 2)).map(() => WALL)
  }),
  computed: {
    rowsWithWalls() {
      return this.rows.map(row => [WALL, ...row, WALL]);
    }
  },
  components: {
    Row
  }
};
</script>

<style scoped>
.grid {
  display: flex;
  flex-direction: column;
  background: #333;
}
</style>
