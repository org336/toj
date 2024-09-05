<script setup lang="ts">
import { useSnackbarStore } from "@/store/snackbar";
import { storeToRefs } from "pinia";
const snackbarStore = useSnackbarStore();
const { isShow, type, message } = storeToRefs(snackbarStore);
const icon = {
  info: "info",
  success: "check",
  error: "error_outline",
  warning: "warning",
};
</script>

<template>
  <div>
    <v-snackbar v-model="isShow" timeout="2000" :color="type" location="top">
      <div class="flex justify-start items-center text-lg">
        <v-icon class="mr-2" :icon="icon[type]"></v-icon>
        <span>{{ message }}</span>
      </div>
      <template v-slot:actions>
        <v-btn icon @click="isShow = false">
          <v-icon icon="close"></v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
