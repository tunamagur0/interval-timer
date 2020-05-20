<template>
  <div class="container">
    <button @click="onStart">start</button>
    <button @click="onPause">pause</button>
    <button @click="onStop">stop</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Buttons extends Vue {
  private onStart() {
    this.$emit("start");
  }

  private onPause() {
    this.$emit("pause");
  }

  private onStop() {
    this.$emit("stop");
  }
}
</script>

<style scoped>
.container {
  border: 1px solid black;
}
</style>
