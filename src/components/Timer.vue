<template>
  <v-card>
    <v-card-title class="justify-center">
      {{ currentMinutes }} : {{ currentSeconds }}
    </v-card-title>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn v-if="canSetTime" icon @click="showTimeSetting = !showTimeSetting">
        <v-icon>{{
          showTimeSetting ? "mdi-chevron-up" : "mdi-chevron-down"
        }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="showTimeSetting">
        <v-divider></v-divider>
        <v-slider v-model="minutes" :max="59" :min="0" class="align-center">
          <template v-slot:append>
            <v-text-field type="number" v-model.number="minutes" />
            <v-card-text>分</v-card-text>
          </template>
        </v-slider>
        <v-slider v-model="seconds" :max="59" :min="0" class="align-center">
          <template v-slot:append>
            <v-text-field type="number" v-model.number="seconds" />
            <v-card-text>秒</v-card-text>
          </template>
        </v-slider>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class Timer extends Vue {
  @Prop() private canSetTime!: boolean;
  @Prop() private isActive!: boolean;
  // timeLimit[s]
  private timeLimit = 30;
  private currentTime = 0;
  private timerId = -1;
  private showTimeSetting = false;

  private start() {
    this.timerId = setInterval(() => {
      this.currentTime++;
      if (this.timerValue === -1) {
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
    return this.minutes * 60 + this.seconds - this.currentTime;
  }

  private set minutes(val: number) {
    this.timeLimit = this.validateTime(val * 60 + this.seconds);
  }

  private get minutes() {
    return Math.floor(this.timeLimit / 60);
  }

  private set seconds(val: number) {
    this.timeLimit = this.validateTime(this.minutes * 60 + val);
  }

  private get seconds() {
    return this.timeLimit % 60;
  }

  private get currentSeconds() {
    return ("0" + (this.timerValue % 60)).slice(-2);
  }

  private get currentMinutes() {
    return ("0" + Math.floor(this.timerValue / 60)).slice(-2);
  }

  private validateTime(time: number) {
    return Math.min(Math.max(1, time), 59 * 60 + 59);
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
