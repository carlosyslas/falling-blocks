<template>
  <div>
    <Grid v-bind:rows="grid" v-bind:to-remove="rowsToRemove"/>
    <div>{{score}}</div>
  </div>
</template>

<script>
import Grid from "./Grid";
import { KEY_CODE } from "../constants";
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    lastTimestamp: null,
    tickCounter: 0
    // TODO: move spped to vuex state to increase difficulty.
  }),
  methods: {
    ...mapActions(["fallBlock", "moveBlock", "rotateBlock"]),
    keydown(e) {
      console.log("que loco!", { ...this.currentPiece }, e);
      switch (e.keyCode) {
        case KEY_CODE.up: {
          this.rotateBlock();
          return;
        }
        case KEY_CODE.left: {
          this.moveBlock({ xOffset: -1 });
          return;
        }
        case KEY_CODE.right: {
          this.moveBlock({ xOffset: 1 });
          return;
        }
        case KEY_CODE.down: {
          this.moveBlock({ yOffset: 1 });
          return;
        }
        default:
          break;
      }
    },
    tick(timestamp) {
      if (!this.lastTimestamp) {
        this.lastTimestamp = timestamp;
        requestAnimationFrame(this.tick);
        return;
      }

      const t = timestamp - this.lastTimestamp;
      this.lastTimestamp = timestamp;
      const newTickCounter = (this.tickCounter += t);

      if (newTickCounter > this.speed) {
        this.fallBlock();

        this.tickCounter = 0;
      } else {
        this.tickCounter = newTickCounter;
      }

      requestAnimationFrame(this.tick);
    }
  },
  computed: mapGetters(["grid", "rowsToRemove", "score", "speed"]),
  components: {
    Grid
  },
  created() {
    window.addEventListener("keydown", this.keydown);
    requestAnimationFrame(this.tick);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.keydown);
  }
};
</script>

<style>
</style>
