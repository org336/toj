export default {
  namespaced: true,
  state: {
    username: "小红", // 用户名
    email: "xxxxxxxxxx@qq.com", // 邮箱
    phone: "18370223323", // 手机号
    signature: "开发灵感", // 签名
    studentId: "1520223609", // 学号
    password: "xxxxxxx", // 密码
  },
  mutations: {
    updateProfile(state, newProfile) {
      Object.assign(state, newProfile);
    },
    updatePassword(state, newPassword) {
      state.password = newPassword;
    },
    saveStateToLocalStorage(state) {
      localStorage.setItem("user", JSON.stringify(state));
    },
  },
  actions: {
    // 在这里定义你的 actions
  },
  getters: {
    // 在这里定义你的 getters
  },
};
