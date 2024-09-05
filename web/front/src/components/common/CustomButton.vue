<template>
  <button
    class="btn"
    :autocomplete="false"
    :type="type"
    :loading="isLoading"
    :style="{
      width: width + 'px',
      height: height + 'px',
      fontSize: fontSize + 'rem',
      borderRadius: isRadius ? width + 'px' : 'none',
    }"
  >
    <template v-if="isLoading">{{ loadingText }}</template>
    <template v-else>
      <slot name="icon"></slot>
      {{ buttonText }}
    </template>
  </button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
  width: {
    type: Number,
    default: 150,
  },
  height: {
    type: Number,
    default: 49,
  },
  fontSize: {
    type: Number,
    default: 1.1,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  loadingText: {
    type: String,
    default: "加载中",
  },
  buttonText: {
    type: String,
    default: "",
  },
  isRadius: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss" scoped>
.btn {
  background-color: #2196f3;
  border: none;
  outline: none;
  color: #fff;
  font-weight: 600;
  margin: 10px auto;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: rgba(0, 49, 173, 1);
  }
}
</style>
