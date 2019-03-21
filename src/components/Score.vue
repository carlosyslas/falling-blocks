<template>
  <div class="score" v-bind:class="className">
    <div>Score</div>
    <div>{{score}}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["score", "isRunning"]),
    className() {
      return {
        blur: !this.isRunning
      };
    }
  }
};
</script>

<style scoped>
.score {
  padding: 20px 40px;
  font-size: 20px;
  transition: 0.3s;
}

.blur {
  filter: opacity(0.5) blur(2px);
}
</style>
