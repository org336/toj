<template>
  <button class="learn-more" :style="{ width: width + 'px' }">
    <span
      class="circle"
      aria-hidden="true"
      :style="{
        backgroundColor: backgroundColor,
      }"
    >
      <span class="icon arrow"></span>
    </span>
    <span class="button-text">{{ buttonText }}</span>
  </button>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  width: {
    type: Number,
    default: 144,
  },
  loadingText: {
    type: String,
    default: "加载中",
  },
  buttonText: {
    type: String,
    default: "点击一下",
  },
  handleClick: {
    type: Function,
    required: true,
  },
  backgroundColor: {
    type: String,
    default: "rgba(0, 49, 173, 1)",
  },
});
</script>
<style lang="scss" scoped>
.learn-more {
  position: relative;
  display: inline-block;
  cursor: pointer;
  border: 0;
  background: transparent;
}
button.learn-more .circle {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: relative;
  display: block;
  margin: 0;
  width: 3rem;
  height: 3rem;
  background: #282936;
  border-radius: 1.625rem;
}

button.learn-more .circle .icon {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
}

button.learn-more .circle .icon.arrow {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  left: 0.625rem;
  width: 1.125rem;
  height: 0.125rem;
  background: none;
}

button.learn-more .circle .icon.arrow::before {
  position: absolute;
  content: "";
  top: -0.29rem;
  right: 0.0625rem;
  width: 0.625rem;
  height: 0.625rem;
  border-top: 0.15rem solid #fff;
  border-right: 0.15rem solid #fff;
  transform: rotate(45deg);
}

button.learn-more .button-text {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.75rem 0;
  margin: 0 0 0 1.6rem;
  color: #282936;
  font-weight: 600;
  font-size: 1.1rem;
  line-height: 1.45;
}

button:hover .circle {
  width: 100%;
}

button:hover .circle .icon.arrow {
  background: #fff;
  transform: translate(1rem, 0);
}

button:hover .button-text {
  color: #fff;
}
</style>
