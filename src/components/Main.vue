<template>
  <v-container fill-height>
    <v-row justify="center">
      <v-icon large color="green darken-2">mdi-domain</v-icon>
    </v-row>
    <v-row justify="center">
      <v-col md="4" cols="8">
        <Timer
          ref="leftTimer"
          :isActive="isLeftActive"
          :timeLimitProps="timeLimits[0]"
          :canSetTime="canSetTime"
          @finish="onFinish"
        />
      </v-col>
      <v-col md="4" cols="8">
        <Timer
          ref="rightTimer"
          :isActive="isRightActive"
          :timeLimitProps="timeLimits[1]"
          :canSetTime="canSetTime"
          @finish="onFinish"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6" md="4">
        <Buttons @start="onStart" @stop="onStop" @pause="onPause" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import Buttons from "./Buttons.vue";
import Timer from "./Timer.vue";

@Component({
  components: {
    Buttons,
    Timer
  }
})
export default class Main extends Vue {
  @Ref() readonly leftTimer!: Timer;
  @Ref() readonly rightTimer!: Timer;
  // 0: 全くスタートしていない, 1: 左のタイマーが動作中, 2: 右のタイマーが動作中, 3, 4: pause中
  private activeTimer = 0;
  private inactiveTimer = 0;
  private timeLimits: [number, number] = [10, 10];
  created() {
    const limits: string | null = localStorage.getItem("timeLimits");
    if (limits) {
      try {
        this.timeLimits = JSON.parse(limits);
      } catch (e) {
        console.error(e);
      }
    }
  }

  private onStart() {
    if (this.activeTimer === 0) {
      this.activeTimer = 1;
      this.timeLimits[0] = this.leftTimer.timeLimit;
      this.timeLimits[1] = this.rightTimer.timeLimit;
      localStorage.setItem("timeLimits", JSON.stringify(this.timeLimits));
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
    if (this.activeTimer === 1 || this.activeTimer === 2) this.activeTimer += 2;
    else if (this.activeTimer >= 3) this.activeTimer -= 2;
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

  private get canSetTime(): boolean {
    return this.activeTimer === 0;
  }
}
</script>
