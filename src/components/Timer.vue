<template>
  <v-card>
    <v-card-title class="justify-center" v-bind:class="fontSize">
      {{ currentMinutes }} : {{ currentSeconds }}
    </v-card-title>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn v-if="canSetTime" icon @click="showTimeSetting = !showTimeSetting">
        <v-icon>{{ showTimeSetting ? "mdi-chevron-up" : "mdi-cog" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="showTimeSetting && canSetTime">
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
import { ID } from "@/store/types";

@Component
export default class Timer extends Vue {
  @Prop() private canSetTime!: boolean;
  @Prop() private isActive!: boolean;
  // timeLimit[s]
  @Prop() private timeLimitProps!: number;
  @Prop() private id!: ID;
  public timeLimit = 0;
  private currentTime = 0;
  private callbackId = -1;
  private showTimeSetting = false;
  private music!: HTMLAudioElement;

  created() {
    this.timeLimit = this.timeLimitProps;
    this.music = new Audio("sound/alarm.wav");
  }

  private start() {
    this.$store.commit("updateStartState", true);
    let previousTime = performance.now();
    const callback: () => void = () => {
      const now = performance.now();
      const diff = Math.floor((now - previousTime) / 1000);

      if (diff >= 1) {
        previousTime = now;
        this.currentTime += diff;
        this.$store.commit("update", {
          id: this.id,
          time: this.timerValue,
        });
      }
      if (this.timerValue < 0) {
        this.finish();
        return;
      }
    };

    this.callbackId = setInterval(callback, 100);
  }

  private stop() {
    clearInterval(this.callbackId);
    this.callbackId = -1;
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

  private get fontSize() {
    const sizeMap: { [key: string]: string } = {
      xs: "headline",
      sm: "display-1",
      md: "display-2",
      lg: "display-3",
      xl: "display-4",
    };
    const breakPoint: string = this.$vuetify.breakpoint.name;
    const size: string | undefined = sizeMap[breakPoint];
    return size ? { [size]: true } : {};
  }

  private validateTime(time: number) {
    return Math.min(Math.max(1, time), 59 * 60 + 59);
  }

  public clear() {
    this.currentTime = 0;
    this.stop();
  }

  private finish() {
    this.clear();
    this.music.play();
    this.$store.commit("update", {
      id: this.id,
      time: this.timerValue,
    });
    this.$emit("finish");
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
