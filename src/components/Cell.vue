<template>
  <div class="cell" v-bind:style="{'--rotation': rotation}" v-bind:class="className"></div>
</template>

<script>
import { WALL, EMPTY } from "../constants";

export default {
  props: ["value", "toRemove"],
  computed: {
    className() {
      return {
        [`color-${this.value}`]: true,
        filled: this.value != EMPTY,
        "to-remove": this.toRemove && this.value !== WALL
      };
    },
    rotation() {
      const sign = Math.random() > 0.5 ? 1 : -1;
      const degrees = Math.random() * 30 + 60;

      return `${sign * degrees}deg`;
    }
  }
};
</script>

<style scoped>
.cell {
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  border-radius: 2px;
  box-shadow: -1px -1px 0 0 rgba(255, 255, 255, 0.05) inset,
    1px 1px 0 0 rgba(0, 0, 0, 0.05) inset,
    -2px -2px 3px 0px rgba(255, 255, 255, 0.02) inset,
    2px 2px 3px 0px rgba(0, 0, 0, 0.02) inset;
}

.filled {
  box-shadow: 1px 1px 0 0 rgba(255, 255, 255, 0.4) inset,
    -1px -1px 0 0 rgba(0, 0, 0, 0.4) inset,
    2px 2px 3px 0px rgba(255, 255, 255, 0.1) inset,
    -2px -2px 3px 0px rgba(0, 0, 0, 0.1) inset;
}

.color-I {
  background: #c0b9dd;
}
.color-O {
  background: #4ecdc4;
}
.color-T {
  background: #ff6b6b;
}
.color-J {
  background: #c7f464;
}
.color-L {
  background: #c44d58;
}
.color-S {
  background: #98c1d9;
}
.color-Z {
  background: #ffd670;
}

.color-wall {
  background: #808080;
}

.to-remove {
  animation: remove 1s;
}

@keyframes remove {
  0% {
  }

  50% {
    background: #fff;
  }

  100% {
    transform: scale(1.1) rotate(var(--rotation)) translate(10px, 0);
    opacity: 0;
  }
}
</style>
