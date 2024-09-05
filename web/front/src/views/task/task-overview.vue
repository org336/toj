<template>
  <div class="flex justify-start items-center gap-4">
    <v-sheet
      class="pa-4 text-center mx-auto"
      elevation="12"
      max-width="600"
      rounded="lg"
      width="100%"
      color="info">
      <v-icon class="mb-5" color="success" icon="check_circle" size="112"></v-icon>

      <h2 class="text-h5 mb-6">You reconciled this account</h2>

      <p class="mb-4 text-medium-emphasis text-body-2">
        To see a report on this reconciliation, click
        <a class="text-decoration-none text-info" href="#">View reconciliation report.</a>

        <br />

        Otherwise, you're done!
      </p>

      <v-divider class="mb-4"></v-divider>

      <div class="text-end">
        <v-btn class="text-none" color="success" variant="flat" width="90" rounded>
          Done
        </v-btn>
      </div>
    </v-sheet>
    <v-sheet
      class="pa-4 text-center mx-auto"
      elevation="12"
      max-width="600"
      rounded="lg"
      width="100%"
      color="info">
    </v-sheet>
  </div>
  <SnackBar></SnackBar>
</template>

<script setup>
import { ref, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();
import { useSnackbarStore } from "@/store/snackbar";
const snackbarStore = useSnackbarStore();
snackbarStore.show("Welcome to the dashboard!", "info");
// 控制抽屉显示的布尔值
const drawer = ref(true);
const rightMenu = [
  { text: "个人详情", icon: "manage_accounts", route: "/profile" },
  { text: "消息中心", icon: "mail", route: "/message" },
  { text: "课程中心", icon: "menu_book", route: "/course" },
  { text: "班级管理", icon: "groups", route: "/class" },
  { text: "任务管理", icon: "task", route: "/task" },
  { text: "作业列表", icon: "edit_note", route: "/homework" },
  { text: "退出登录", icon: "logout", route: "/login", action: "logout" },
];
</script>

<style lang="scss" scoped></style>
