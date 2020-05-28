import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState } from "@/store/types";
import mutations from "./mutations";

const state: RootState = {
  left: 0,
  right: 0
};

const store: StoreOptions<RootState> = {
  state,
  mutations
};

Vue.use(Vuex);

export default new Vuex.Store<RootState>(store);
