<template>
  <div class="profile-pwd">
    <el-row class="row-top">
      <el-col :span="12">修改密码</el-col>
    </el-row>
    <el-form label-width="80px" :model="pwdForm" :rules="pwdRules">
      <div class="row">
        <el-row :span="6"> <div class="row-title">旧密码</div></el-row>
        <el-row :span="12">
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model.trim="pwdForm.oldPassword"
              clearable
              autocomplete="off"
              show-password
            >
            </el-input>
          </el-form-item>
        </el-row>
      </div>
      <div class="row">
        <el-row :span="6"> <div class="row-title">新密码</div></el-row>
        <el-row :span="12">
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model.trim="pwdForm.newPassword"
              clearable
              autocomplete="off"
              show-password
            >
            </el-input>
          </el-form-item>
        </el-row>
      </div>
      <div class="row">
        <el-row :span="6"> <div class="row-title">确认新密码</div></el-row>
        <el-row :span="12">
          <el-form-item prop="confirmPassword">
            <el-input
              type="password"
              v-model.trim="pwdForm.confirmPassword"
              clearable
              autocomplete="off"
              show-password
            >
            </el-input>
          </el-form-item>
        </el-row></div
    ></el-form>

    <div class="row button">
      <el-button type="primary">更新密码</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const pwdForm = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const pwdRules = {
  password: [
    { required: true, message: "请输入密码" },
    {
      validator: proxy.Verify.password,
      message: "密码只能是数字、字母、特殊字符的8-18位组合",
      trigger: "blur",
    },
  ],
  confirmPassword: [
    { required: true, message: "请再次输入密码" },
    {
      validator: (rule, value, callback) =>
        proxy.Verify.confirmPassword(rule, value, callback, pwdForm.value.newPassword),
      trigger: "blur",
    },
  ],
};
</script>

<style lang="scss" scoped>
.profile-pwd {
  margin: 16px;
  .row-top {
    height: 36px;
    text-align: left;
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 18px;
    border-bottom: 1px solid #cdc7c7;
  }

  .row {
    margin-top: 12px;
    .row-title {
      font-size: 1.2rem;
      margin-bottom: 8px;
    }
    .el-form-item {
      :deep(.el-form-item__content) {
        margin-left: 0px !important;
        .el-input {
          width: 280px;
          font-size: 1.1rem;
        }
      }
    }
  }
  .button {
    margin-top: 24px;
    span {
      color: #5995fd;
      margin-left: 12px;
      font-size: 0.9rem;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
