<template>
  <v-container class="app-container flex mt-20">
    <!-- Side Bar -->
    <div class="sidebar">
      <EmailMenu />
    </div>
    <!--  Mail RouterView-->
    <div class="main">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </v-container>
</template>

<script setup>
import EmailMenu from "./components/EmailMenu.vue";
import { ref, reactive, onMounted, watchEffect } from "vue";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const store = useUserStore();
const { profile } = storeToRefs(store);
const messgaeTypes = {
  MessagePrivate: "私人消息",
  MessageTeacher: "老师消息",
  MessageSystem: "系统通知",
  MessageMy: "我的消息",
  MessageSetting: "消息设置",
};
const selectedMenu = ref("MessagePrivate");
const handleSelect = (index) => {
  selectedMenu.value = index;
  router.push({ name: index });
};
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  height: 100%;
  width: 100%;

  .sidebar {
    width: 300px;
    height: 100%;
    background-color: #fff;
    margin-right: 20px;
  }

  .main {
    flex: 1;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
}
</style>
