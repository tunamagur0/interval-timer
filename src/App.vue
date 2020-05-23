<template>
  <v-app id="container"> <Main /> </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Main from "./components/Main.vue";

@Component({
  components: {
    Main
  }
})
export default class App extends Vue {}
</script>

<style>
html {
  overflow-y: auto;
}
</style>

<style scoped>
#container {
  background-color: lightblue;
}
</style>
