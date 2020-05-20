<template>
  <div class="container">
    <p>{{ timerValue }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class Timer extends Vue {
  // timeLimit[s]
  @Prop() private timeLimit!: number;
  @Prop() private isActive!: boolean;
  private currentTime = 0;
  private timerId = -1;

  private start() {
    this.timerId = setInterval(() => {
      this.currentTime++;
      if (this.timerValue === 0) {
        this.clear();
        this.$emit("finish");
      }
    }, 1000);
  }

  private stop() {
    clearInterval(this.timerId);
    this.timerId = -1;
  }

  private get timerValue() {
    return this.timeLimit - this.currentTime;
  }

  public clear() {
    this.currentTime = 0;
    this.stop();
  }

  @Watch("isActive")
  private onIsActiveChange(val: boolean, oldVal: boolean) {
    // activeになったとき
    if (!oldVal && val) {
      this.start();
    }

    // 非activeになったとき
    if (oldVal && !val) {
      this.stop();
    }
  }
}
</script>

<style scoped>
.container {
  border: 1px solid black;
  width: 30%;
}
</style>
