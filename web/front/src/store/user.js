import { defineStore } from "pinia";
import { reactive } from "vue";

export const useUserStore = defineStore("user", () => {
  const profile = reactive({
    username: "小红",
    email: "xxxxxxxxxx@qq.com",
    phone: "18370223323",
    signature: "开发灵感",
    studentId: "1520223609",
    password: "test123456~",
    avatar: "",
  });

  const updateProfile = (newProfile) => {
    Object.assign(profile, newProfile);
  };

  const updatePassword = (newPassword) => {
    profile.password = newPassword;
  };

  return {
    profile,
    updateProfile,
    updatePassword,
  };
});
