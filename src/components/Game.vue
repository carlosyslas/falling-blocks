<template>
  <div>
    <div class="layout">
      <Grid/>
      <Score/>
    </div>
    <GameOver/>
  </div>
</template>

<script>
import Grid from "./Grid";
import Score from "./Score";
import GameOver from "./GameOver";
import { KEY_CODE } from "../constants";
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    lastTimestamp: null,
    tickCounter: 0
  }),
  methods: {
    ...mapActions(["fallBlock", "moveBlock", "rotateBlock", "startNewGame"]),
    keydown(e) {
      if (!this.isRunning) {
        if (e.keyCode === KEY_CODE.space) {
          this.startNewGame();
        }
        return;
      }

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
        // TODO: handle space
        default:
          break;
      }
    },
    tick(timestamp) {
      if (!this.isRunning) {
        requestAnimationFrame(this.tick);
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
  computed: mapGetters(["grid", "rowsToRemove", "speed", "isRunning"]),
  components: {
    Grid,
    Score,
    GameOver
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
  justify-content: center;
}
</style>
