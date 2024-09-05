<template>
  <div>
    <div class="g-recaptcha" :data-sitekey="siteKey" data-theme="light" ref="recaptcha"></div>
  </div>
</template>

<script setup>
import { UserService } from "@/api/apiServices";
import { ref, onMounted, defineEmits } from "vue";
import { useSnackbarStore } from "@/store/snackbar";
const snackbarStore = useSnackbarStore();
const siteKey = import.meta.env.VITE_SITE_KEY;
const recaptcha = ref(null);
const recaptchaWidgetId = ref(null);
const checkRecaptchaLoaded = () => {
  // 检查是否已经渲染了reCAPTCHA
  if (window.grecaptcha && window.grecaptcha.render) {
    //如果没有grecaptcha对象则进行渲染
    if (!recaptchaWidgetId.value) {
      recaptchaWidgetId.value = grecaptcha.render(recaptcha.value, {
        sitekey: siteKey,
      });
    } else {
      // 如果grecaptcha对象还未加载，稍后再试
      setTimeout(checkRecaptchaLoaded, 500);
    }
  }
};
onMounted(() => {
  // 确保grecaptcha对象已加载
  checkRecaptchaLoaded();
});
// 将token发送到服务器验证
const sendToServer = async () => {
  // 检查grecaptcha对象是否已加载且recaptchaWidgetId是否已设置
  if (!window.grecaptcha || recaptchaWidgetId.value === null) {
    snackbarStore.show("人机验证初始化失败，请刷新重试", "warning");

    return false;
  }
  //前端请求Google获取token
  const recaptchaResponse = grecaptcha.getResponse(recaptchaWidgetId.value);
  if (!recaptchaResponse) {
    snackbarStore.show("请先完成人机验证", "warning");
    return false;
  }
  //请求后端接口验证token的合法性
  const result = await UserService.validateRecaptcha({ token: recaptchaResponse });
  if (result.code == 200) {
    return true;
  } else {
    return false;
  }
};
defineExpose({
  sendToServer,
});
</script>

<style scoped></style>
