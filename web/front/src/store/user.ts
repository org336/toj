import { defineStore } from "pinia";
import { computed, reactive, toRaw } from "vue";
import { UserService } from "@/api/apiServices";
import { ElMessage } from "element-plus";
import { useSnackbarStore } from "./snackbar";
interface UserProfile {
  email: string;
  nickName: string;
  realName: string;
  userId: string;
  signature: string;
  avatarUrl: string;
  identity: number;
}
const snackbarStore = useSnackbarStore();
export const useUserStore = defineStore("userStore", () => {
  const VITE_STATIC_PATH = import.meta.env.VITE_STATIC_PATH;
  const profile = reactive<UserProfile>({
    nickName: "",
    realName: "",
    userId: "",
    email: "",
    signature: "",
    avatarUrl: "",
    identity: 0,
  });
  const avatarUrl = computed(() => `${VITE_STATIC_PATH}${profile.avatarUrl}`);
  const updateProfile = async () => {
    let params = { uid: localStorage.getItem("user_uid"), ...toRaw(profile) };
    const result = await UserService.updateProfile(params);
    if (result.code == 200) {
      ElMessage({
        message: "更新信息成功",
        type: "success",
        center: true,
      });
      Object.assign(profile, result.data);
    } else {
      snackbarStore.show("更新信息失败", "error");
    }
  };

  const getProfile = async () => {
    const uid: string = localStorage.getItem("user_uid");
    let result = await UserService.getProfile({ uid: uid });
    if (result.code == 200) {
      Object.assign(profile, result.data);
    } else {
      snackbarStore.show("获取用户信息失败", "error");
    }
  };
  const updateIdentity = async () => {};
  return {
    profile,
    avatarUrl,
    updateProfile,
    getProfile,
    updateIdentity,
  };
});
