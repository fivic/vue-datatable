<template>
  <div id="app">
    <Index />
  </div>
</template>

<script>
import Index from "@/components/Index.vue";

export default {
  name: "App",
  components: {
    Index
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
html,
body {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #edf2f6;
  min-height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 2px 0;
}
</style>
