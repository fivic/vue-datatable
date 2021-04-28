<template>
  <a @click="scrollTop" v-show="visible" class="bottom-right">
    <slot></slot>
    <VIcon icon="top" xs></VIcon>
  </a>
</template>

<script>
import VIcon from "../VIcon/VIcon";
export default {
  name: "VScroll",
  data() {
    return {
      visible: false
    };
  },
  components: { VIcon },
  methods: {
    scrollTop: function() {
      this.intervalId = setInterval(() => {
        if (window.pageYOffset === 0) {
          clearInterval(this.intervalId);
        }
        window.scroll(0, window.pageYOffset - 50);
      }, 20);
    },
    scrollListener: function() {
      this.visible = window.scrollY > 150;
    }
  },
  mounted: function() {
    window.addEventListener("scroll", this.scrollListener);
  },
  beforeDestroy: function() {
    window.removeEventListener("scroll", this.scrollListener);
  }
};
</script>

<style scoped>
.bottom-right {
  position: fixed;
  bottom: 20px;
  left: 20px;
  cursor: pointer;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.55);
  padding: 10px;
}
</style>
