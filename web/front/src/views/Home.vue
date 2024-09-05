<template>
  <div class="home">
    <div class="nav" :class="extraClass">
      <div class="nav-start">
        <!-- 汉堡菜单图标 -->
        <v-btn variant="text" @click="toggleLeftSidebar"><v-icon icon="menu"></v-icon></v-btn>
        <div class="top-icon"><img src="../assets/icons/whale.png" /></div>
        <div class="top-name" @click="backToHome">BlueWhale</div>
      </div>
      <div class="nav-middle"></div>
      <div class="nav-end">
        
        <!-- 消息图标 -->
        <v-menu location="top">
          <template v-slot:activator="{ props }">
            <v-btn variant="text" icon v-bind="props">
              <v-icon icon="notifications" v-if="true"></v-icon>
              <v-icon icon="notifications_off" v-else></v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="({ route, title }, index) in messageMenu"
              :key="index"
              :value="title"
              :to="route"
              density="compact"
              class="cursor-pointer"
              color="primary">
              <v-list-item-title v-text="title"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-divider
          :thickness="4"
          color="primary"
          class="border-opacity-75"
          vertical></v-divider>
        <!-- 用户头像 -->
        <v-avatar size="48px"><v-img alt="Avatar" :src="avatarUrl"></v-img></v-avatar>
        <v-btn variant="text" icon @click="toggleRightSidebar">
          <v-icon icon="more_vert"></v-icon>
        </v-btn>
      </div>
    </div>
    <!-- 左边栏 -->
    <v-layout>
      <v-navigation-drawer
        v-model="leftDrawer"
        location="left"
        rounded="lg"
        temporary
        width="320">
        <v-list>
          <v-list-item :title="profile.nickName">
            <template v-slot:prepend>
              <img src="@/assets/icons/whale.png" alt="logo" class="w-12 h-12" />
            </template>
            <template v-slot:append>
              <v-btn icon variant="text" @click="toggleLeftSidebar">
                <v-icon icon="close" color="primary"></v-icon>
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
        <v-divider :thickness="4" class="border-opacity-75" color="primary"></v-divider>
        <v-list class="p-4">
          <v-list-item
            v-for="({ text, icon, route }, index) in leftMenu"
            :key="index"
            :value="text"
            color="primary"
            rounded="xl"
            :to="route">
            <template v-slot:prepend>
              <v-icon :icon="icon"></v-icon>
            </template>
            <v-list-item-title v-text="text"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
    <!-- 右边栏 -->
    <v-layout>
      <v-navigation-drawer
        v-model="rightDrawer"
        location="right"
        rounded="lg"
        temporary
        width="320">
        <v-list>
          <v-list-item :title="profile.nickName">
            <template v-slot:prepend>
              <v-avatar rounded="0" size="48px">
                <v-img alt="Avatar" :src="avatarUrl"></v-img>
              </v-avatar>
            </template>
            <template v-slot:append>
              <v-btn icon variant="text" @click="toggleRightSidebar">
                <v-icon icon="close" color="primary"></v-icon>
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
        <v-divider thickness="4" class="border-opacity-75" color="info"></v-divider>
        <v-list-item class="p-0">
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title class="text-lg">我的签名：</v-expansion-panel-title>
              <v-expansion-panel-text v-if="profile.signature">{{
                profile.signature
              }}</v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-list-item>
        <v-divider thickness="4" class="border-opacity-75" color="info"></v-divider>
        <v-list class="p-4">
          <v-list-item
            v-for="({ text, icon, route }, index) in rightMenu"
            :key="index"
            :value="text"
            :title="text"
            :to="route"
            color="primary"
            rounded="xl">
            <template v-slot:prepend>
              <v-icon :icon="icon"></v-icon>
            </template>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
    <div class="main">
      <router-view v-slot="{ Component }">
          <component :is="Component" />
      </router-view>
    </div>
  </div>
  <SnackBar />
</template>
<script setup>
import { myLocalStorage } from "@/utils/storage";
import { ref, getCurrentInstance, watch, computed, onMounted } from "vue";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance();
//处理消息下拉栏的路由跳转
const messageMenu = ref([
  { route: "/message/inbox", title: "收件箱" },
  { route: "/message/send", title: "发送件" },
  { route: "/message/drafts", title: "草稿" },
  { route: "/message/starred", title: "标记" },
  { route: "/message/trash", title: "回收箱" },
  { route: "/message/setting", title: "设置" },
]);
const rightMenu = ref([
  { text: "个人详情", icon: "manage_accounts", route: "/user" },
  { text: "消息中心", icon: "mail", route: "/message" },
  { text: "工作模块", icon: "dashboard", route: "/dashboard" },
  { text: "班级管理", icon: "groups", route: "/class" },
  { text: "任务管理", icon: "task", route: "/task" },
  { text: "退出登录", icon: "logout", route: "/login", action: "logout" },
]);
const leftMenu = ref([{ text: "首页", icon: "home", route: "/" }]);
const pushRoute = (route) => {
  if (route) {
    router.push(route);
  }
};
//处理导航栏的样式变化
const isExtra = ref(false);
const checkScroll = () => {
  isExtra.value = window.scrollY > 64;
};
const isHomePage = computed(() => route.path === "/");
const extraClass = computed(() => (isHomePage.value && !isExtra.value ? "extra" : ""));
watch(
  isHomePage,
  (newVal, oldVal) => {
    if (newVal) {
      window.addEventListener("scroll", checkScroll);
    } else if (oldVal) {
      window.removeEventListener("scroll", checkScroll);
    }
  },
  { immediate: true }
);
// 处理左边栏和右边栏的开关逻辑
const leftDrawer = ref(false);
const rightDrawer = ref(false);
const toggleLeftSidebar = () => {
  leftDrawer.value = !leftDrawer.value;
};
const toggleRightSidebar = () => {
  rightDrawer.value = !rightDrawer.value;
};
const handleCloseleftDrawer = () => {
  leftDrawer.value = false;
};
const handleCloserightDrawer = () => {
  rightDrawer.value = false;
};
// watch(router.currentRoute, () => {
//   leftDrawer.value = false;
//   rightDrawer.value = false;
// });
//返回主页
const backToHome = () => {
  router.push("/");
};
//处理右边栏的数据
const userStore = useUserStore();
userStore.getProfile();
const { profile, avatarUrl } = storeToRefs(userStore);
//点击切换用户消息
const shiftProfile = () => {
  router.push("/profile");
};
// 事件
const logout = () => {
  //删除浏览器的localstorage和cookie
  proxy.VueCookies.remove("LOGIN_STATUS");
  myLocalStorage.remove("user_uid");
  myLocalStorage.remove("user_identity");
};
//主动加载home-page组件
onMounted(() => {
  router.push("/");
});
</script>

<style lang="scss" scoped>
@import "@/styles/home.scss";
</style>
