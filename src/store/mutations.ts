import { MutationTree } from "vuex";
import { RootState, Timer } from "@/store/types";

const mutations: MutationTree<RootState> = {
  update: (state, timer: Timer) => {
    if (timer.id === "left") {
      state.left = timer.time;
    } else {
      state.right = timer.time;
    }
  }
};

export default mutations;
