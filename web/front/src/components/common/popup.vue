<template>
  <div v-if="visible" class="popup-overlay">
    <div class="popup-content">{{ message }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const visible = ref(false);
const message = ref("");
const show = (type, newMessage, duration = 1600) => {
  message.value = newMessage;
  visible.value = true;
  setTimeout(() => {
    visible.value = false;
  }, duration);
};

defineExpose({
  show,
});
</script>

<style scoped>
.popup-overlay {
  z-index: 10;
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.popup-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-size: 16px;
  background: #fff;
  border: 1px solid #007bff;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: #007bff;
  text-align: center;
  max-width: 200px;
}
</style>
