import { defineStore } from "pinia";
import { reactive } from "vue";
import { UserService } from "@/utils/api";
interface UserProfile {
  email: string;
  nickName: string;
  realName: string;
  userId: string;
  signature: string;
  identity: number;
  avatarUrl: string;
}
export const useUserStore = defineStore("user", () => {
  const profile = reactive<UserProfile>({
    nickName: "",
    realName: "",
    userId: "",
    email: "",
    signature: "",
    avatarUrl: "",
    identity: null,
  });

  const updateProfile = async (newProfile) => {
    const userUid = localStorage.getItem("user_uid");
    const data = {
      userUid,
      newProfile,
    };
    const updatedProfile = await UserService.updateProfile(data);
    Object.assign(profile, updatedProfile);
  };
  const getProfile = async () => {
    const userUid: string = localStorage.getItem("user_uid");
    let result = await UserService.getProfile({ userUid });
    if (result.code == 200) {
      Object.assign(profile, result.data);
    } else {
      return;
    }
  };
  return {
    profile,
    updateProfile,
    getProfile,
  };
});
