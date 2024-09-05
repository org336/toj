<script setup>
import ChatBotV2 from "@/components/Ai/chatGPT/ChatBotV2.vue";
import { ref } from "vue";
const containerHeight = ref(window.innerHeight - 72);
</script>
<template>
  <v-container :max-height="containerHeight">
    <ChatBotV2 />
  </v-container>
</template>

<style lang="scss" scoped></style>
