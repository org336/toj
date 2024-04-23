<template>
  <div class="profile">
    <el-row class="row-top">
      <el-col :span="12">修改密码</el-col>
    </el-row>
    <el-form label-width="80px" :model="pwdForm" :rules="pwdRules">
      <div class="row">
        <el-row :span="6"> <div class="row-title">旧密码</div></el-row>
        <el-row :span="12">
          <el-form-item prop="password">
            <el-input type="password" v-model="pwdForm.oldPassword" clearable show-password>
            </el-input>
          </el-form-item>
        </el-row>
      </div>
      <div class="row">
        <el-row :span="6"> <div class="row-title">新密码</div></el-row>
        <el-row :span="12">
          <el-form-item prop="password">
            <el-input type="password" v-model="pwdForm.newPassword" clearable show-password>
            </el-input>
          </el-form-item>
        </el-row>
      </div>
      <div class="row">
        <el-row :span="6"> <div class="row-title">确认新密码</div></el-row>
        <el-row :span="12">
          <el-form-item prop="confirmPassword">
            <el-input type="password" v-model="pwdForm.confirmPassword" clearable show-password>
            </el-input>
          </el-form-item>
        </el-row></div
    ></el-form>

    <div class="row button">
      <el-button type="primary">更新密码</el-button><span>我忘记了密码</span>
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
const confirmPassword = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value != pwdForm.value.newPassword) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};
const pwdRules = {
  password: [
    { required: true, message: "请输入密码" },
    {
      validator: proxy.Verify.password,
      message: "密码只能是数字、字母、特殊字符的8-18位组合",
    },
  ],
  confirmPassword: [
    { required: true, message: "请再次输入密码" },
    { validator: confirmPassword, message: "两次输入的密码不一致!" },
  ],
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
