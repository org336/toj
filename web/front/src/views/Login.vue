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
          @submit.prevent
        >
          <h2 class="title">重置密码</h2>
          <div class="input-field">
            <i class="fa-regular fa-at"></i>
            <el-form-item prop="email">
              <el-input
                type="text"
                v-model.trim="resetForm.email"
                placeholder="邮箱"
                clearable
              />
            </el-form-item>
          </div>
          <div class="emailCode-row">
            <div class="input-field emailCode">
              <i class="fas fa-envelope"></i>
              <el-form-item prop="emailCode">
                <el-input
                  type="number"
                  v-model.trim="resetForm.emailCode"
                  placeholder="验证码"
                />
              </el-form-item>
            </div>
            <CustomButton
              :isLoading="loadingList.emailCodeLoading"
              buttonText="发送验证码"
              loadingText="发送中"
              @click="sendEmailCode('resetPwd')"
            ></CustomButton>
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
            <CustomButton
              :isLoading="loadingList.resetLoading"
              buttonText="点击重置"
              loadingText="重置中"
              @click="resetPassword"
            ></CustomButton>
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
              <el-input
                type="text"
                v-model.trim="loginForm.email"
                placeholder="邮箱"
                clearable
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
                show-password
                clearable
              />
            </el-form-item>
          </div>
          <recaptcha-view ref="recaptchaRef" @message="handlePopupMessage"></recaptcha-view>
          <div class="reset-line">
            <CustomButton
              :isLoading="loadingList.loginLoading"
              buttonText="点击登录"
              loadingText="登录中"
              @click="Login"
            ></CustomButton>
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
            <i class="fa-regular fa-at"></i>
            <el-form-item prop="email">
              <el-input
                type="text"
                v-model.trim="signUpForm.email"
                clearable
                placeholder="邮箱"
              />
            </el-form-item>
          </div>
          <div class="emailCode-row">
            <div class="input-field emailCode">
              <i class="fas fa-envelope"></i>
              <el-form-item prop="emailCode">
                <el-input
                  type="number"
                  v-model.trim="signUpForm.emailCode"
                  placeholder="验证码"
                />
              </el-form-item>
            </div>
            <CustomButton
              :isLoading="loadingList.emailCodeLoading"
              buttonText="发送验证码"
              loadingText="发送中"
              @click="sendEmailCode('register')"
            ></CustomButton>
          </div>
          <div class="input-field">
            <i class="fa-solid fa-id-card"></i>
            <el-form-item prop="userId">
              <el-input
                type="number"
                v-model.trim="signUpForm.userId"
                clearable
                placeholder="学工号"
              />
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
          <CustomButton
            buttonText="点击注册"
            loadingText="注册中"
            @click="SignUp"
            :isLoading="loadingList.signUploading"
          ></CustomButton>
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
import { ElMessage } from "element-plus";
import { UserService } from "@/utils/api";
import { ref, getCurrentInstance, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { myLocalStorage } from "@/utils/storage";
const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance();
const loadingList = reactive({
  loginLoading: false,
  signUploading: false,
  resetLoading: false,
  emailCodeLoading: false,
});
const loginRef = ref(null);
const signUpRef = ref(null);
const resetRef = ref(null);
const recaptchaRef = ref(null);

const loginForm = ref({});

const signUpForm = ref({});

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
    { required: true, message: "请输入学工号" },
    { validator: proxy.Verify.userId, message: "学工号不存在", trigger: "blur" },
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
        proxy.Verify.confirmPassword(rule, value, callback, resetForm.value.password),
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
        loadingList.loginLoading = true;
        let params = {};
        Object.assign(params, loginForm.value);
        await UserService.login(params)
          .then((res) => {
            if (res.code == 200) {
              myLocalStorage.set("user_uid", res.data.uid);
              myLocalStorage.set("user_identity", res.data.identity);
              proxy.VueCookies.set("LOGIN_STATUS", 1, "3d");
              router.push({ name: "Home" });
            } else {
              ElMessage({
                showClose: true,
                message: res.msg,
                type: "warning",
                center: true,
              });
            }
          })
          .finally(() => {
            loadingList.loginLoading = false;
          });
      }
    }
  });
};
const SignUp = () => {
  signUpRef.value.validate(async (valid) => {
    if (valid) {
      loadingList.signUploading = true;
      let params = {};
      Object.assign(params, signUpForm.value);
      const result = await UserService.register(params);
      if (result.code == 200) {
        ElMessage({
          showClose: true,
          message: "注册成功，请登录",
          type: "success",
          center: true,
        });
        showSignIn();
      } else {
        ElMessage({
          showClose: true,
          message: result.msg,
          type: "error",
          center: true,
        });
      }
      loadingList.signUploading = false;
      loginForm.email = signUpForm.email;
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
      loadingList.emailCodeLoading = true;
      let params = {
        email: email,
        purpose: purpose,
      };
      UserService.sendEmailCode(params)
        .then((res) => {
          if (res.code == 200) {
            ElMessage({
              showClose: true,
              message: "发送验证码成功，请注意查收",
              type: "success",
              center: true,
            });
          } else {
            ElMessage({
              showClose: true,
              message: res.msg,
              type: "error",
              center: true,
            });
          }
        })
        .finally(() => {
          loadingList.emailCodeLoading = false;
        });
    }
  });
};
const resetPassword = () => {
  resetRef.value.validate((valid) => {
    if (valid) {
      loadingList.resetLoading = true;
      let params = {};
      Object.assign(params, resetForm.value);
      UserService.resetPwd(params)
        .then((res) => {
          if (res.code == 200) {
            ElMessage({
              showClose: true,
              message: "重置密码成功",
              type: "success",
              center: true,
            });
            showResetLogin();
          } else {
            ElMessage({
              showClose: true,
              message: res.msg,
              type: "error",
              center: true,
            });
          }
        })
        .finally(() => {
          loadingList.resetLoading = false;
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
