<template>
  <div>
    <popup-view ref="popupRef"></popup-view>
    <div class="g-recaptcha" :data-sitekey="siteKey" data-theme="light" ref="recaptcha"></div>
  </div>
</template>

<script setup>
import { UserService } from "@/utils/api";
import { ref, onMounted } from "vue";
const siteKey = import.meta.env.VITE_SITE_KEY;
const recaptcha = ref(null);
const popupRef = ref(null);
let recaptchaWidgetId = ref(null);
onMounted(() => {
  // 确保grecaptcha对象已加载
  const checkRecaptchaLoaded = () => {
    if (window.grecaptcha && window.grecaptcha.render) {
      recaptchaWidgetId.value = grecaptcha.render(recaptcha.value, {
        sitekey: siteKey,
      });
    } else {
      // 如果grecaptcha对象还未加载，稍后再试
      setTimeout(checkRecaptchaLoaded, 500);
    }
  };

  checkRecaptchaLoaded();
});
// 将token发送到服务器验证
const sendToServer = async () => {
  //前端请求Google获取token
  const recaptchaResponse = grecaptcha.getResponse(recaptchaWidgetId.value);
  if (!recaptchaResponse) {
    popupRef.value.show("请完成人机验证!!!");
    return false;
  }
  //请求后端验证token的合法性
  const result = await UserService.validateRecaptcha({ token: recaptchaResponse });
  if (result.code == 200) {
    return true;
  } else {
    popupRef.value.show(result.code);
    return false;
  }
};
defineExpose({
  sendToServer,
});
</script>

<style scoped></style>
