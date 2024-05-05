<template>
  <div class="container" ref="containerRef">
    <div class="forms-container">
      <div class="signin-signup">
        <el-form
          ref="resetRef"
          :model="resetForm"
          :rules="resetRules"
          class="reset-form"
          v-if="showResetForm"
        >
          <h2 class="title">重置密码</h2>
          <div class="input-field">
            <i class="fa-solid fa-user"></i>
            <el-form-item prop="email">
              <el-input v-model.trim="resetForm.email" placeholder="邮箱" clearable />
            </el-form-item>
          </div>
          <div class="emailCode-row">
            <div class="input-field emailCode">
              <i class="fas fa-envelope"></i>
              <el-form-item prop="emailCode">
                <el-input v-model.trim="resetForm.emailCode" placeholder="验证码" />
              </el-form-item>
            </div>
            <el-button type="primary" class="btn" round @click="sendEmailCode">
              发送验证码
            </el-button>
          </div>
          <div class="input-field">
            <i class="fa-solid fa-lock"></i>
            <el-form-item prop="password">
              <el-input
                v-model.trim="resetForm.password"
                type="password"
                placeholder="新密码"
                autocomplete="off"
                show-password
                clearable
              />
            </el-form-item>
          </div>
          <div class="input-field">
            <i class="fa-solid fa-lock"></i>
            <el-form-item prop="confirmPassword">
              <el-input
                v-model.trim="resetForm.confirmPassword"
                type="password"
                placeholder="确认新密码"
                autocomplete="off"
                show-password
                clearable
              />
            </el-form-item>
          </div>
          <div class="reset-line">
            <el-button
              type="primary"
              :loading="resetLoading"
              @click="reset(resetForm)"
              class="btn form"
              round
            >
              {{ resetLoading ? "重 置 中" : "点击重置" }}
            </el-button>
            <button type="reset" class="btn transparent link" @click="showResetLogin">
              去登陆!
            </button>
          </div>
        </el-form>
        <el-form
          ref="loginRef"
          :model="loginForm"
          :rules="loginRules"
          class="sign-in-form"
          v-if="!showResetForm"
        >
          <h2 class="title">登录</h2>
          <div class="input-field">
            <i class="fa-solid fa-user"></i>
            <el-form-item prop="email">
              <el-input v-model.trim="loginForm.email" placeholder="邮箱" clearable />
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
              />
            </el-form-item>
          </div>
          <div class="reset-line">
            <el-button
              type="primary"
              :loading="loginLoading"
              @click="Login(loginForm)"
              class="btn form"
              round
            >
              {{ loginLoading ? "登 录 中" : "点击登录" }}
            </el-button>
            <button type="reset" class="btn transparent link" @click="showReset">
              忘记密码？
            </button>
          </div>
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
                v-model.trim="signUpForm.confirmPassword"
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
            {{ signUploading ? "注 册 中" : "点击注册" }}
          </el-button>
        </el-form>
      </div>
    </div>

    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>新用户 ?</h3>
          <p>请输入您的INFO</p>
          <button class="btn transparent" @click="showSignUp">去注册</button>
        </div>
        <img src="../assets/register.svg" class="image" alt="" />
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3>已有账号 ?</h3>
          <p>请登录以享受CODE</p>
          <button class="btn transparent" @click="showSignIn">去登录</button>
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
import { ref, getCurrentInstance, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance();
const loginLoading = ref(false);
const signUploading = ref(false);
const resetLoading = ref(false);
const loginRef = ref(null);
const signUpRef = ref(null);
const resetRef = ref(null);
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
const resetForm = ref({
  email: "",
  emailCode: "",
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
    { validator: proxy.Verify.email, message: "邮箱不存在", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码" },
    { validator: proxy.Verify.password, message: "密码格式不正确", trigger: "blur" },
  ],
};
const signUpRules = {
  email: [
    { required: true, message: "请输入邮箱" },
    { validator: proxy.Verify.email, message: "邮箱不存在", trigger: "blur" },
  ],
  phone: [
    { required: true, message: "请输入手机号" },
    { validator: proxy.Verify.phone, message: "手机号不存在", trigger: "blur" },
  ],
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
        proxy.Verify.confirmPassword(rule, value, callback, signUpForm.value.password),
      trigger: "blur",
    },
  ],
};
const resetRules = {
  email: [
    { required: true, message: "请输入邮箱" },
    { validator: proxy.Verify.email, message: "邮箱不存在", trigger: "blur" },
  ],
  emailCode: [{ required: true, message: "请输入验证码" }],
  password: [
    { required: true, message: "请输入新密码" },
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
        proxy.Verify.confirmPassword(rule, value, callback, resetForm.value.password),
      trigger: "blur",
    },
  ],
};
const Login = (formData) => {
  //滑动框验证
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
const sendEmailCode = () => {};
const reset = (formData) => {
  resetRef.value.validate((valid) => {});
};
const containerRef = ref();
const showResetForm = ref(false);
const showReset = () => {
  showResetForm.value = true;
  if (loginRef.value) {
    loginRef.value.resetFields();
  }
};
const showResetLogin = () => {
  showResetForm.value = false;
  if (resetRef.value) {
    resetRef.value.resetFields();
  }
};
const showSignUp = () => {
  showResetForm.value = false;
  if (loginRef.value) {
    loginRef.value.resetFields();
  }
  if (resetRef.value) {
    resetRef.value.resetFields();
  }
  containerRef.value.classList.add("sign-up-mode");
};
const showSignIn = () => {
  showResetForm.value = false;
  if (signUpRef.value) {
    signUpRef.value.resetFields();
  }
  if (resetRef.value) {
    resetRef.value.resetFields();
  }
  containerRef.value.classList.remove("sign-up-mode");
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/login.scss";
</style>
