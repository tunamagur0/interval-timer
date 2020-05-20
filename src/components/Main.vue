<template>
  <div class="container">
    <div class="timer-container">
      <Timer
        ref="leftTimer"
        :isActive="isLeftActive"
        :timeLimit="timeLimits[0]"
        @finish="onFinish"
      />
      <Timer
        ref="rightTimer"
        :isActive="isRightActive"
        :timeLimit="timeLimits[1]"
        @finish="onFinish"
      />
    </div>
    <Buttons @start="onStart" @stop="onStop" @pause="onPause" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import Buttons from "./Buttons.vue";
import Timer from "./Timer.vue";

@Component({
  components: {
    Buttons,
    Timer,
  },
})
export default class Main extends Vue {
  @Ref() readonly leftTimer!: Timer;
  @Ref() readonly rightTimer!: Timer;
  // 0: 全くスタートしていない, 1: 左のタイマーが動作中, 2: 右のタイマーが動作中, 3, 4: pause中
  private activeTimer = 0;
  private inactiveTimer = 0;
  private timeLimits: [number, number] = [10, 10];
  private onStart() {
    if (this.activeTimer === 0) {
      this.activeTimer = 1;
    }
    if (this.activeTimer >= 3) {
      this.activeTimer -= 2;
    }
  }

  private onStop() {
    this.leftTimer.clear();
    this.rightTimer.clear();
    this.activeTimer = 0;
  }

  private onPause() {
    this.activeTimer += 2;
  }

  private onFinish() {
    this.activeTimer = this.activeTimer === 1 ? 2 : 1;
  }

  private get isLeftActive(): boolean {
    return this.activeTimer === 1;
  }

  private get isRightActive(): boolean {
    return this.activeTimer === 2;
  }
}
</script>

<style scoped>
.container {
  border: 1px solid black;
}

.timer-container {
  display: flex;
  justify-content: space-evenly;
}
</style>
