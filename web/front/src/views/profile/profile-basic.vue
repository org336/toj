<template>
  <div class="profile-main">
    <el-row class="row-top">
      <el-col :span="12">个人简介</el-col>
    </el-row>
    <el-row :gutter="20" class="row-middle">
      <el-col :span="12" class="row-middle-left">
        <el-form label-width="80px" :model="profile" :rules="profileRules">
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model.trim="profile.nickName" clearable></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="realName">
            <el-input v-model.trim="profile.realName" clearable></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model.trim="profile.email" clearable></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="userId">
            <el-input v-model.trim="profile.userId" clearable></el-input>
          </el-form-item>
          <el-form-item label="签名" prop="signature">
            <el-input v-model.trim="profile.signature" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateProfile">更新信息</el-button>
          </el-form-item>
        </el-form></el-col
      >
      <el-col :span="8" class="row-bottom-right">
        <div class="title">个人头像</div>
        <el-avatar :src="profile.avatar" size="large"> </el-avatar>
        <el-upload action="" :on-change="onAvatarChange">
          <el-button size="default" type="primary">更换头像</el-button>
        </el-upload>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, watchEffect } from "vue";
import { UserService } from "@/utils/api";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
const { proxy } = getCurrentInstance();
const avatarUrl = ref(""); // 头像 URL
const onAvatarChange = (file) => {
  // 在这里处理头像文件的上传
};
const store = useUserStore();
const { profile } = storeToRefs(store);
const updateProfile = async () => {
  await UserService.updateProfile(profile);
};
const profileRules = {
  nickName: [{ required: true, message: "请输入昵称" }],
  realName: [{ required: true, message: "请输入真实姓名" }],
  userId: [
    { required: true, message: "请输入学号" },
    { validator: proxy.Verify.studentId, message: "学号不存在", trigger: "blur" },
  ],
  signature: [{ required: true, message: "请输入个人签名" }],
  email: [
    { required: true, message: "请输入邮箱" },
    { validator: proxy.Verify.email, message: "邮箱不存在", trigger: "blur" },
  ],
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
      margin-right: 62px;
      .el-form-item {
        :deep(.el-form-item__label) {
          font-size: 1.1rem;
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
