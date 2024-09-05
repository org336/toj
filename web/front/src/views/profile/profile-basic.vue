<template>
  <div class="profile-main">
    <el-row class="row-top">
      <el-col :span="12">个人简介</el-col>
    </el-row>
    <el-row :gutter="20" class="row-middle">
      <el-col :span="12" class="row-middle-left">
        <el-form label-width="100px" :model="profile" :rules="profileRules" @submit.prevent>
          <el-form-item label="昵称" prop="nickName">
            <el-input type="text" v-model.trim="profile.nickName"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="realName">
            <el-input type="text" v-model.trim="profile.realName" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input type="text" v-model.trim="profile.email" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="学工号" prop="userId">
            <el-input v-model.trim="profile.userId" clearable :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="签名" prop="signature">
            <el-input
              type="textarea"
              v-model.trim="profile.signature"
              :autosize="{ minRows: 3, maxRows: 5 }"
              clearable></el-input>
          </el-form-item>
          <el-form-item>
            <CustomButton
              :width="120"
              :height="45"
              :isLoading="loadingList.profileLoading"
              buttonText="更新信息"
              loadingText="更新中"
              @click="updateProfile"></CustomButton>
          </el-form-item> </el-form
      ></el-col>
      <el-col :span="8" class="row-bottom-right">
        <div class="title">个人头像</div>
        <el-avatar :src="avatarUrl" size="large" shape="square"> </el-avatar>
        <span class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过2MB</span>
        <el-upload
          ref="uploadRef"
          action="avatarFile"
          accept="image/jpeg,image/png,image/jpg"
          :limit="1"
          :before-upload="beforeUpload"
          :show-file-list="false"
          :http-request="uploadAvatar">
          <CustomButton
            :width="120"
            :height="45"
            :isLoading="loadingList.avatarLoading"
            buttonText="更换头像"
            loadingText="更换中"></CustomButton>
        </el-upload>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, reactive } from "vue";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { UploadService } from "@/api/apiServices";
import { useSnackbarStore } from "@/store/snackbar";
const snackbarStore = useSnackbarStore();
const { proxy } = getCurrentInstance();
const uploadRef = ref();
const avatarFile = ref();
const loadingList = reactive({
  avatarLoading: false,
  profileLoading: false,
});
const store = useUserStore();
const { profile ,avatarUrl} = storeToRefs(store);
const updateProfile = async () => {
  loadingList.profileLoading = true;
  await store
    .updateProfile()
    .then(() => {})
    .finally(() => {
      loadingList.profileLoading = false;
    });
};
const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
const profileRules = {
  nickName: [{ required: true, message: "请输入昵称" }],
  realName: [{ required: true, message: "请输入真实姓名" }],
  userId: [
    { required: true, message: "请输入学工号" },
    { validator: proxy.Verify.userId, message: "学工号不存在", trigger: "blur" },
  ],
  signature: [{ required: true, message: "请输入个人签名" }],
  email: [
    { required: true, message: "请输入邮箱" },
    { validator: proxy.Verify.email, message: "邮箱不存在", trigger: "blur" },
  ],
};
// el-upload上传文件逻辑处理
function beforeUpload(rawFile) {
  // 异步操作，比如调用API检查文件
  const isIMAGE = allowedTypes.includes(rawFile.type);
  const isL2M = rawFile.size / 1024 / 1024 < 2;
  if (!isIMAGE) {
    snackbarStore.show("上传文件只能是图片格式!", "error");
    return false;
  }
  if (!isL2M) {
    snackbarStore.show("上传文件大小不能超过2MB!", "error");
    return false;
  }
}
const uploadAvatar = (options) => {
  let formdata = new FormData();
  formdata.append("file", options.file);
  loadingList.avatarLoading = true;
  UploadService.uploadAvatar(localStorage.getItem("user_uid"), formdata)
    .then((res) => {
      if (res.code == 200) {
        store.getProfile();
        uploadRef.value.clearFiles();
      } else {
        snackbarStore.show(res.msg, "error");
      }
    })
    .finally(() => {
      loadingList.avatarLoading = false;
    });
};
</script>

<style lang="scss" scoped>
.profile-main {
  margin: 16px;
  .row-top {
    height: 36px;
    text-align: left;
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 18px;
    border-bottom: 1px solid #cdc7c7;
  }
  .row-middle {
    width: 100%;
    .row-middle-left {
      margin-right: 32px;
      .el-form-item {
        :deep(.el-form-item__label) {
          font-size: 1.1rem;
          color: #000;
        }
        :deep(.el-form-item__content) {
          .el-input {
            width: 280px;
            font-size: 1.1rem;
          }
        }
      }
    }
    .row-bottom-right {
      display: flex;
      gap: 10px;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .title {
        font-size: 1.2rem;
      }
      .el-avatar {
        width: 200px;
        height: 200px;
      }
    }
  }
}
</style>
