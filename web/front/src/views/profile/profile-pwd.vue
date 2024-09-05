<template>
  <div class="profile-pwd">
    <el-row class="row-top">
      <el-col :span="12">修改密码</el-col>
    </el-row>
    <el-form ref="pwdRef" label-width="80px" :model="pwdForm" :rules="pwdRules" @submit.prevent>
      <div class="row">
        <el-row :span="6"> <div class="row-title">旧密码</div></el-row>
        <el-row :span="12">
          <el-form-item prop="oldPassword">
            <el-input
              type="password"
              v-model.trim="pwdForm.oldPassword"
              clearable
              show-password>
            </el-input>
          </el-form-item>
        </el-row>
      </div>
      <div class="row">
        <el-row :span="6"> <div class="row-title">新密码</div></el-row>
        <el-row :span="12">
          <el-form-item prop="newPassword">
            <el-input
              type="password"
              v-model.trim="pwdForm.newPassword"
              clearable
              show-password>
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
              show-password>
            </el-input>
          </el-form-item>
        </el-row>
        <el-row
          ><span class="row-prompt"> 确保密码是数字、字母、特殊字符的8-18位组合 </span></el-row
        >
      </div></el-form
    >

    <div class="row button">
      <CustomButton
        :width="120"
        :height="45"
        :isLoading="loadingList.passwordLoading"
        buttonText="更新密码"
        loadingText="更新中"
        @click="updatePassword"></CustomButton>
      <button type="reset" class="btn transparent link" @click="showReset">忘记密码？</button>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { UserService } from "@/api/apiServices";
import { myLocalStorage } from "@/utils/storage";
import { ref, reactive, getCurrentInstance } from "vue";
import { useSnackbarStore } from "@/store/snackbar";
const snackbarStore = useSnackbarStore();
const { proxy } = getCurrentInstance();
const pwdForm = ref({});
const pwdRef = ref();
const loadingList = reactive({
  passwordLoading: false,
});
const pwdRules = {
  oldPassword: [
    { required: true, message: "请输入密码" },
    {
      validator: proxy.Verify.password,
      message: "密码只能是数字、字母、特殊字符的8-18位组合",
      trigger: "blur",
    },
  ],
  newPassword: [
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
const updatePassword = () => {
  pwdRef.value.validate((valid) => {
    if (valid) {
      loadingList.passwordLoading = true;
      let params = {};
      params["uid"] = myLocalStorage.get("user_uid");
      Object.assign(params, pwdForm.value);
      UserService.updatePwd(params)
        .then((res) => {
          if (res.code == 200) {
            pwdForm.value = {};
            snackbarStore.show("更新密码成功", "success");
          } else {
            snackbarStore.show(res.msg, "error");
          }
        })
        .finally(() => {
          loadingList.passwordLoading = false;
        });
    }
  });
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
    .row-title {
      font-size: 1.15rem;
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
    .row-prompt {
      color: #999;
      font-size: 0.9rem;
    }
  }
  .btn.transparent {
    border: none;
    outline: none;
    color: #4d84e2;
    background: none;
    width: 100px;
    height: 40px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
  }
}
</style>
