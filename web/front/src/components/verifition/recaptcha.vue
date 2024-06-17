<template>
  <div>
    <popup-view ref="popupRef"></popup-view>
    <div class="g-recaptcha" :data-sitekey="siteKey" data-theme="light" ref="recaptcha"></div>
  </div>
</template>

<script setup>
import { UserService } from "@/utils/api";
import { ref, onMounted } from "vue";
import axios from "axios";
const siteKey = import.meta.env.VITE_SITE_KEY;
const recaptcha = ref(null);
const popupRef = ref(null);
let recaptchaWidgetId = ref(null);
// 将token发送到服务器验证
const sendToServer = async () => {
  //前端请求Google获取token
  const recaptchaResponse = grecaptcha.getResponse(recaptchaWidgetId.value);
  if (!recaptchaResponse) {
    popupRef.value.show("请完成人机验证!!!");
    return false;
  }
  const result = await UserService.validate({ token: recaptchaResponse });
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
onMounted(() => {
  if (recaptcha.value) {
    recaptchaWidgetId.value = grecaptcha.render(recaptcha.value, {
      sitekey: siteKey,
    });
  }
});
</script>

<style scoped></style>
