<template>
  <popup-view ref="popupRef"></popup-view>
  <div class="container" ref="containerRef">
    <div class="forms-container">
      <div class="signin-signup">
        <el-form
          ref="resetRef"
          :model="resetForm"
          :rules="resetRules"
          class="reset-form"
          v-if="showResetForm"
          @submit.prevent
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
            <el-button type="primary" class="btn" round @click="sendEmailCode('resetPwd')">
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
                show-password
                clearable
              />
            </el-form-item>
          </div>
          <div class="input-field">
            <i class="fa-solid fa-lock"></i>
            <el-form-item prop="newPassword">
              <el-input
                v-model.trim="resetForm.newPassword"
                type="password"
                placeholder="确认新密码"
                show-password
                clearable
              />
            </el-form-item>
          </div>
          <div class="reset-line">
            <el-button
              type="primary"
              :loading="resetLoading"
              @click="reset(resetForm.value)"
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
          @submit.prevent
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
                show-password
                clearable
              />
            </el-form-item>
          </div>
          <recaptcha-view ref="recaptchaRef" @message="handlePopupMessage"></recaptcha-view>
          <div class="reset-line">
            <el-button
              type="primary"
              :loading="loginLoading"
              @click="Login(loginForm.value)"
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

        <el-form
          ref="signUpRef"
          :model="signUpForm"
          :rules="signUpRules"
          class="sign-up-form"
          @submit.prevent
        >
          <h2 class="title">注册</h2>
          <div class="input-field">
            <i class="fa-solid fa-user"></i>
            <el-form-item prop="email">
              <el-input v-model.trim="signUpForm.email" clearable placeholder="邮箱" />
            </el-form-item>
          </div>
          <div class="emailCode-row">
            <div class="input-field emailCode">
              <i class="fas fa-envelope"></i>
              <el-form-item prop="emailCode">
                <el-input v-model.trim="signUpForm.emailCode" placeholder="验证码" />
              </el-form-item>
            </div>
            <el-button type="primary" class="btn" round @click="sendEmailCode('register')">
              发送验证码
            </el-button>
          </div>
          <div class="input-field">
            <i class="fa-solid fa-id-card"></i>
            <el-form-item prop="userId">
              <el-input v-model.trim="signUpForm.userId" clearable placeholder="学号" />
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
                show-password
              />
            </el-form-item>
          </div>
          <el-button
            type="primary"
            :loading="signUploading"
            @click="SignUp(signUpForm.value)"
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
</template>

<script setup>
import { UserService } from "@/utils/api";
import { ref, getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
import { LocalStorage } from "@/utils/storage";
const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance();
const loginLoading = ref(false);
const signUploading = ref(false);
const resetLoading = ref(false);
const loginRef = ref(null);
const signUpRef = ref(null);
const resetRef = ref(null);
const recaptchaRef = ref(null);
const popupRef = ref(null);
// email: "",
//   password: "",
const loginForm = ref({});
// email: "",
//   emailCode: "",
//   studentId: "",
//   password: "",
//   confirmPassword: "",
const signUpForm = ref({});
// email: "",
//   emailCode: "",
//   password: "",
//   newPassword: "",
const resetForm = ref({});

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
  emailCode: [{ required: true, message: "请输入验证码" }],
  userId: [
    { required: true, message: "请输入学号" },
    { validator: proxy.Verify.studentId, message: "学号不存在", trigger: "blur" },
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
  newPassword: [
    { required: true, message: "请输入新密码" },
    {
      validator: (rule, value, callback) =>
        proxy.Verify.resetPassword(rule, value, callback, resetForm.value.password),
      trigger: "blur",
    },
  ],
};
const handlePopupMessage = (message) => {
  popupRef.value.show("warning", message);
};
const Login = async () => {
  loginRef.value.validate(async (valid) => {
    if (valid) {
      const validateRecaptcha = await recaptchaRef.value.sendToServer();
      if (validateRecaptcha) {
        loginLoading.value = true;
        let params = {};
        Object.assign(params, loginForm.value);
        const result = await UserService.login(params);
        if (result.code == 200) {
          popupRef.value.show("登录成功!");
          LocalStorage.set("user_uid", result.data.uid);
          LocalStorage.set("user_identity", result.data.identity);
          proxy.VueCookies.set("LOGIN_STATUS", 1, "3d");
          router.push({ name: "Home" });
        } else if (result.code == 404) {
          popupRef.value.show("请先注册邮箱!");
        } else if (result.code == 402) {
          popupRef.value.show("密码错误!");
        } else {
          popupRef.value.show(result.msg);
        }
        loginLoading.value = false;
      }
    }
  });
};

const SignUp = () => {
  signUpRef.value.validate(async (valid) => {
    if (valid) {
      signUploading.value = true;
      let params = {};
      Object.assign(params, signUpForm.value);
      const result = await UserService.register(params);
      if (result.code == 200) {
        popupRef.value.show("注册成功");
        showSignIn();
      } else {
        popupRef.value.show(result.msg);
      }
      signUploading.value = false;
    }
  });
};
const sendEmailCode = (purpose) => {
  let validateRef = ref(null);
  let email = null;
  if (purpose === "register") {
    validateRef = signUpRef;
    email = signUpForm.value.email;
  } else {
    validateRef = resetRef;
    email = resetForm.value.email;
  }
  validateRef.value.validateField("email", async (valid) => {
    if (valid) {
      let params = {
        email: email,
        purpose: purpose,
      };
      UserService.sendEmailCode(params).then((res) => {
        if (res.code == 200) {
          popupRef.value.show("验证码发送成功");
        } else {
          popupRef.value.show(res.msg);
        }
      });
    }
  });
};
const reset = () => {
  resetRef.value.validate((valid) => {
    if (valid) {
      resetLoading.value = true;
      let params = {};
      Object.assign(params, resetForm.value);
      UserService.resetPwd(params).then((res) => {
        if (res.code == 200) {
          popupRef.value.show("重置密码成功");
          showResetLogin();
        } else {
          popupRef.value.show(res.msg);
        }
        resetLoading.value = false;
      });
    }
  });
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
