<template>
  <el-button
    class="btn"
    :type="type"
    :disabled="isLoading"
    :loading="isLoading"
    :style="{
      width: width + 'px',
      height: height + 'px',
      fontSize: fontSize + 'rem',
      borderRadius: width + 'px',
    }"
  >
    <template v-if="isLoading">{{ loadingText }}</template>
    <template v-else>
      <slot>{{ buttonText }}</slot>
    </template>
  </el-button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "primary",
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
    default: "点击一下",
  },
});
</script>

<style lang="scss" scoped>
.btn {
  background-color: #4d84e2;
  border: none;
  outline: none;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  margin: 10px auto;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: rgba(0, 49, 173, 1);
  }
}
</style>
