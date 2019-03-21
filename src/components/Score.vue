<template>
  <div class="score">
    <div>Score</div>
    <div>{{value}}</div>
  </div>
</template>

<script>
export default {
  props: ["value"]
};
</script>

<style scoped>
.score {
  padding: 20px 40px;
  font-size: 20px;
}
</style>
