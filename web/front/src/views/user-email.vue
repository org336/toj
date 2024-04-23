<template>
  <div class="email"></div>
</template>

<script setup>
import { ref, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();
const emailData = ref([]);
</script>

<style lang="scss" scoped></style>
