<template>
  <div class="grid" v-bind:class="className">
    <Row v-bind:cells="firstRow"/>
    <Row
      v-for="(row, index) in rowsWithWalls"
      v-bind:key="index"
      v-bind:cells="row"
      v-bind:to-remove="rowsToRemove.indexOf(index) !== -1"
    />
    <Row v-bind:cells="lastRow"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Row from "./Row";
import { GRID_SIZE, WALL } from "../constants";

export default {
  data: () => ({
    firstRow: Array.from(Array(GRID_SIZE.width + 2)).map(() => WALL),
    lastRow: Array.from(Array(GRID_SIZE.width + 2)).map(() => WALL)
  }),
  computed: {
    ...mapGetters(["grid", "rowsToRemove", "isRunning"]),
    rowsWithWalls() {
      return this.grid.map(row => [WALL, ...row, WALL]);
    },
    className() {
      return {
        blur: !this.isRunning
      };
    }
  },
  components: {
    Row
  }
};
</script>

<style scoped>
.grid {
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  width: 280px;
}

.blur {
  filter: opacity(0.5) blur(2px);
}
</style>
