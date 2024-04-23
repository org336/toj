import { createStore } from "vuex";
import user from "./modules/user";
import course from "./modules/course";

export default createStore({
  modules: {
    user,
    course,
  },
});
