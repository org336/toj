<template>
  <div class="container">
    <div class="forms-container">
      <div class="signin-signup">
        <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="sign-in-form">
          <h2 class="title">登录</h2>
          <div class="input-field">
            <i class="fa-solid fa-user"></i>
            <el-form-item prop="email">
              <el-input
                v-model.trim="loginForm.email"
                placeholder="邮箱"
                clearable
                @keyup.enter="Login(loginForm)"
              />
            </el-form-item>
          </div>
          <div class="input-field">
            <i class="fa-solid fa-lock"></i>
            <el-form-item prop="password">
              <el-input
                v-model.trim="loginForm.password"
                type="password"
                placeholder="密码"
                autocomplete="off"
                show-password
                clearable
                @keyup.enter="Login(loginForm)"
              />
            </el-form-item>
          </div>
          <el-button
            type="primary"
            :loading="loginLoading"
            @click="Login(loginForm)"
            class="btn form"
            round
          >
            {{ loginLoading ? "登 录 中" : "登 录" }}
          </el-button>
        </el-form>
        <el-form ref="signUpRef" :model="signUpForm" :rules="signUpRules" class="sign-up-form">
          <h2 class="title">注册</h2>
          <div class="input-field">
            <i class="fa-solid fa-user"></i>
            <el-form-item prop="email">
              <el-input v-model.trim="signUpForm.email" clearable placeholder="邮箱" />
            </el-form-item>
          </div>
          <div class="input-field">
            <i class="fa-solid fa-phone"></i>
            <el-form-item prop="phone">
              <el-input v-model.trim="signUpForm.phone" clearable placeholder="手机号" />
            </el-form-item>
          </div>
          <div class="input-field">
            <i class="fa-solid fa-lock"></i>
            <el-form-item prop="password">
              <el-input
                v-model.trim="signUpForm.password"
                type="password"
                clearable
                placeholder="密码"
                autocomplete="off"
                show-password
              />
            </el-form-item>
          </div>
          <div class="input-field">
            <i class="fa-solid fa-lock"></i>
            <el-form-item prop="confirmPassword">
              <el-input
                v-model="signUpForm.confirmPassword"
                type="password"
                clearable
                placeholder="确认密码"
                autocomplete="off"
                show-password
              />
            </el-form-item>
          </div>
          <el-button
            type="primary"
            :loading="signUploading"
            @click="SignUp(signUpForm)"
            class="btn form"
            round
          >
            {{ signUploading ? "注 册 中" : "注 册" }}
          </el-button>
        </el-form>
      </div>
    </div>

    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>新用户 ?</h3>
          <p>请输入您的信息</p>
          <button class="btn transparent" @click="showSignUp">注 册</button>
        </div>
        <img src="../assets/register.svg" class="image" alt="" />
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3>已有账号 ?</h3>
          <p>请登录以享受CODE</p>
          <button class="btn transparent" @click="showSignIn">登 录</button>
        </div>
        <img src="../assets/log.svg" class="image" alt="" />
      </div>
    </div>
  </div>
  <Verify
    mode="pop"
    :captchaType="captchaType"
    :imgSize="{ width: '400px', height: '200px' }"
    ref="verify"
  ></Verify>
</template>

<script setup>
import { ElMessage } from "element-plus";
import Verify from "../components/verifition/Verify.vue";
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance();
const loginLoading = ref(false);
const signUploading = ref(false);
const loginRef = ref(null);
const signUpRef = ref(null);
const loginForm = ref({
  name: "",
  password: "",
});
const signUpForm = ref({
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
});

// 处理滑动验证码逻辑
const verify = ref(null);
const captchaType = ref("");
const onShow = (type) => {
  captchaType.value = type;
  verify.value.show();
};
const loginRules = {
  email: [
    { required: true, message: "请输入邮箱" },
    { validator: proxy.Verify.email, message: "邮箱不存在" },
  ],
  password: [
    { required: true, message: "请输入密码" },
    { validator: proxy.Verify.password, message: "密码格式不正确" },
  ],
};
const confirmPassword = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value != signUpForm.value.password) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};
const signUpRules = {
  email: [
    { required: true, message: "请输入邮箱" },
    { validator: proxy.Verify.email, message: "邮箱不存在" },
  ],
  password: [
    { required: true, message: "请输入密码" },
    {
      validator: proxy.Verify.password,
      message: "密码只能是数字、字母、特殊字符的8-18位组合",
    },
  ],
  phone: [
    { required: true, message: "请输入手机号" },
    { validator: proxy.Verify.phone, message: "手机号不存在" },
  ],
  confirmPassword: [
    { required: true, message: "请再次输入密码" },
    { validator: confirmPassword, message: "两次输入的密码不一致!" },
  ],
};

const Login = (formData) => {
  onShow("blockPuzzle");
  loginRef.value.validate((valid) => {
    if (valid) {
      loginLoading.value = true;
      // TODO: axios 登录请求
      setTimeout(() => {
        ElMessage.success("登录成功");
        loginLoading.value = false;
      }, 5000);
    }
  });
  router.push({ name: "Home" });
};

const SignUp = (formData) => {
  signUpRef.value.validate((valid) => {
    if (valid) {
      signUploading.value = true;
      // TODO: axios 注册请求
      setTimeout(() => {
        ElMessage.success("注册成功");
        signUpRef.value.resetFields();
        showSignIn();
      }, 500);
    }
  });
  signUploading.value = false;
};

const showSignUp = () => {
  const container = document.querySelector(".container");
  container.classList.add("sign-up-mode");
};

const showSignIn = () => {
  const container = document.querySelector(".container");
  container.classList.remove("sign-up-mode");
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/login.scss";
</style>
