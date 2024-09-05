<script setup lang="ts">
import EmailList from "../components/EmailList.vue";
import { useEmailStore } from "../emailStore";
const emailStore = useEmailStore();
</script>

<template>
  <EmailList :emails="emailStore.getStarredList" />
</template>

<style scoped lang="scss"></style>
