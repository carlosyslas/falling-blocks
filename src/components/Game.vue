<template>
  <div>
    <div class="layout">
      <Grid v-bind:rows="grid" v-bind:to-remove="rowsToRemove"/>
      <Score v-bind:value="score"/>
    </div>
    <div v-if="!isRunning && !isFirstGame">Game over</div>
    <div v-if="isRunning && !isFirstGame">Press any key...</div>
  </div>
</template>

<script>
import Grid from "./Grid";
import Score from "./Score";
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
      if (!this.isRunning) {
        return;
      }

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
  computed: mapGetters([
    "grid",
    "rowsToRemove",
    "score",
    "speed",
    "isRunning",
    "isFirstGame"
  ]),
  components: {
    Grid,
    Score
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

<style scoped>
.layout {
  display: flex;
}
</style>
