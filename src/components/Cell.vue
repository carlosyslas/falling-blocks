<template>
  <div class="cell" v-bind:style="{'--rotation': rotation}" v-bind:class="className"></div>
</template>

<script>
export default {
  props: ["value", "toRemove"],
  computed: {
    className() {
      return {
        [`color-${this.value}`]: true,
        filled: this.value != " ",
        animated: this.value === "T",
        "to-remove": this.toRemove
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
  border: 1px solid;
  box-sizing: border-box;
}

.filled {
  box-shadow: 2px 2px 0 0 rgba(255, 255, 255, 0.4) inset,
    -2px -2px 0 0 rgba(0, 0, 0, 0.4) inset;
}

.color-0 {
  background: #000;
}
.color-I {
  background: #f00;
}
.color-O {
  background: #0f0;
}
.color-T {
  background: #08f;
}
.color-J {
  background: rgb(48, 209, 169);
}
.color-L {
  background: #0ff;
}
.color-S {
  background: #f0f;
}
.color-Z {
  background: #ff0;
}

.animated {
  animation: elastic 1s;
}

@keyframes elastic {
  0% {
    border-radius: 0;
    transform: scale(1) translate(0, 0);
  }

  50% {
    border-radius: 6px;
    transform: scale(1.2, 0.8) translate(0, 4px);
  }

  100% {
    border-radius: 0;
    transform: scale(1) translate(0, 0);
  }
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
