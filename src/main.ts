import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify/lib";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import store from "@/store/index";

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  iconfont: "mdi"
});

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
