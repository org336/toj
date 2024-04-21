<template>
  <div class="profile">
    <el-row class="row-top">
      <el-col :span="12">个人简介</el-col>
    </el-row>
    <el-row :gutter="20" class="row-bottom">
      <el-col :span="12" class="row-bottom-left">
        <el-form label-width="80px">
          <el-form-item label="昵称">
            <el-input v-model.trim="username" clearable></el-input>
          </el-form-item>
          <el-form-item label="个人签名">
            <el-input v-model.trim="signature" clearable></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model.trim="email" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model.trim="phone" clearable></el-input>
          </el-form-item>
          <el-form-item label="学号">
            <el-input v-model.trim="studentId" clearable></el-input>
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
const username = ref("");
const signature = ref("");
const email = ref("");
const phone = ref("");
const studentId = ref("");

watchEffect(() => {
  username.value = store.state.user.username;
  signature.value = store.state.user.signature;
  email.value = store.state.user.email;
  phone.value = store.state.user.phone;
  studentId.value = store.state.user.studentId;
});

const updateProfile = () => {
  store.commit("user/updateProfile", {
    username: username.value,
    signature: signature.value,
    email: email.value,
    phone: phone.value,
    studentId: studentId.value,
  });
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
  .row-bottom {
    width: 100%;
    .row-bottom-left {
      margin-right: 62px;
      .input {
        width: 100%;
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
