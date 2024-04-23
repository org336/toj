<template>
  <div class="profile">
    <el-row class="row-top">
      <el-col :span="12">个人简介</el-col>
    </el-row>
    <el-row :gutter="20" class="row-middle">
      <el-col :span="12" class="row-middle-left">
        <el-form label-width="80px" :model="profile" :rules="profileRules">
          <el-form-item label="昵称" prop="username">
            <el-input v-model.trim="profile.username" clearable></el-input>
          </el-form-item>
          <el-form-item label="签名" prop="signature">
            <el-input v-model.trim="profile.signature" clearable></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model.trim="profile.email" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model.trim="profile.phone" clearable></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="studentId">
            <el-input v-model.trim="profile.studentId" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateProfile">更新信息</el-button>
          </el-form-item>
        </el-form></el-col
      >
      <el-col :span="8" class="row-bottom-right">
        <div class="title">个人头像</div>
        <el-avatar :src="avatar" size="large"> </el-avatar>
        <el-upload action="" :on-change="onAvatarChange">
          <el-button size="default" type="primary">更换头像</el-button>
        </el-upload>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, watchEffect } from "vue";
import { useStore } from "vuex";
const store = useStore();
const { proxy } = getCurrentInstance();
const avatarUrl = ref(""); // 头像 URL
const onAvatarChange = (file) => {
  // 在这里处理头像文件的上传
};
const profile = ref({
  username: "",
  signature: "",
  email: "",
  phone: "",
  studentId: "",
});
const profileRules = {
  username: [{ required: true, message: "请输入昵称" }],
  signature: [{ required: true, message: "请输入个人签名" }],
  email: [
    { required: true, message: "请输入邮箱" },
    { validator: proxy.Verify.email, message: "邮箱不存在" },
  ],
  phone: [
    { required: true, message: "请输入手机号" },
    { validator: proxy.Verify.phone, message: "手机号不存在" },
  ],
  studentId: [
    { required: true, message: "请输入学号" },
    { validator: proxy.Verify.studentId, message: "学号不存在" },
  ],
};
watchEffect(() => {
  profile.value.username = store.state.user.username;
  profile.value.signature = store.state.user.signature;
  profile.value.email = store.state.user.email;
  profile.value.phone = store.state.user.phone;
  profile.value.studentId = store.state.user.studentId;
});

const updateProfile = () => {
  store.commit("user/updateProfile", profile.value);
};
</script>

<style lang="scss" scoped>
.profile {
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
