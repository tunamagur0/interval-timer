<template>
  <v-container>
    <v-row justify="center">
      <v-col class="center" cols="3">
        <v-btn fab dark v-bind="size" color="pink" @click="onStart">
          <v-icon dark>mdi-play</v-icon>
        </v-btn>
      </v-col>
      <v-col class="center" cols="3">
        <v-btn fab dark v-bind="size" color="pink" @click="onPause">
          <v-icon dark>mdi-pause</v-icon>
        </v-btn>
      </v-col>
      <v-col class="center" cols="3">
        <v-btn fab dark v-bind="size" color="pink" @click="onStop">
          <v-icon dark>mdi-stop</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
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

  private get size() {
    const sizeMap: { [key: string]: string } = {
      xs: "x-small",
      sm: "small",
      lg: "large",
      xl: "x-large",
    };
    const breakPoint: string = this.$vuetify.breakpoint.name;
    const size: string | undefined = sizeMap[breakPoint];
    return size ? { [size]: true } : {};
  }
}
</script>

<style scoped>
.center {
  text-align: center;
}
</style>
