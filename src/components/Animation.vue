<template>
  <v-container>
    <v-img
      v-if="isAnimating"
      max-height="40vh"
      aspect-ratio="1"
      contain
      src="@/assets/animation.png"
    ></v-img>
    <v-img
      v-else
      max-height="40vh"
      aspect-ratio="1"
      contain
      src="@/assets/stop.png"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { RootState } from "../store/types";

@Component
export default class Animation extends Vue {
  get isAnimating() {
    const state: RootState = this.$store.state;
    return state.isStarted && state.left != 0 && state.right != 0;
  }
}
</script>
