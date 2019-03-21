<template>
  <div class="game-over" v-if="!isRunning">
    <div class="red title" v-if="!isFirstGame">
      <b>Game Over</b>
    </div>
    <div>
      Press
      <b class="blue">[Space]</b> to start a new game.
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["isRunning", "isFirstGame"])
};
</script>

<style scoped>
.game-over {
  position: fixed;
  top: 200px;
  left: 50%;
  transform: translate(-50%, 0);
  background: #212121;
  padding: 30px;
  border-radius: 10px;
}

.title {
  margin-bottom: 15px;
  font-size: 24px;
}

.red {
  color: #ff6b6b;
}

.blue {
  color: #4ecdc4;
}
</style>
