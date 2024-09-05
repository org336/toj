<script setup>
import { ref } from "vue";
import MateList from "../components/MateList.vue";
const containerHeight = ref(window.innerHeight - 72);
</script>
<template>
  <v-container :max-height="containerHeight">
    <MateList />
  </v-container>
</template>

<style lang="scss" scoped></style>
