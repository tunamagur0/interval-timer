import { MutationTree } from "vuex";
import { RootState, Timer } from "@/store/types";

const mutations: MutationTree<RootState> = {
  update: (state: RootState, timer: Timer) => {
    if (timer.id === "left") {
      state.left = timer.time;
    } else {
      state.right = timer.time;
    }
  },

  updateStartState: (state: RootState, isStarted: boolean) => {
    state.isStarted = isStarted;
  },
};

export default mutations;
