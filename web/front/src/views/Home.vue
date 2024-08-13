<template>
  <div class="home">
    <div class="nav" :class="extraClass">
      <div class="nav-start">
        <!-- 汉堡菜单图标 -->
        <div class="hamburger" @click="toggleLeftSidebar">
          <i class="fas fa-bars"></i>
        </div>
        <div class="top-icon"><img src="../assets/icons/whale.png" /></div>
        <div class="top-name" @click="backToHome">BlueWhale</div>
      </div>
      <div class="nav-middle"></div>
      <div class="nav-end">
        <!-- 搜索图标 -->
        <div class="search-icon">
          <i class="fas fa-search"></i>
        </div>
        <!-- 消息图标 -->

        <div class="msg-bell" @click="shiftMessage">
          <el-dropdown size="large" @command="handleCommand">
            <i class="fa-sharp fa-regular fa-bell"></i>
            <template #dropdown>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="MessagePrivate">私人消息</el-dropdown-item>
                <el-dropdown-item command="MessageTeacher">老师消息</el-dropdown-item>
                <el-dropdown-item command="MessageSystem">系统消息</el-dropdown-item>
                <el-dropdown-item command="MessageMy">我的消息</el-dropdown-item>
                <el-dropdown-item command="MessageSetting">消息设置</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <!-- 用户头像 -->
        <div class="avatar" @click="shiftProfile">
          <el-avatar :src="avatarUrl" shape="square">{{ profile.nickName }}</el-avatar>
        </div>
        <div class="right-arrow" @click="toggleRightSidebar">
          <i class="fas fa-chevron-left"></i>
        </div>
      </div>
    </div>
    <!-- 左边栏 -->
    <div class="sidebar left-sidebar">
      <el-drawer
        v-model="leftDrawer"
        title=""
        :with-header="false"
        direction="ltr"
        :before-close="handleCloseleftDrawer"
        width="200px"
        class="drawer left-drawer"
      >
        <div class="sidebar-top">
          <div class="siderbar-icon"><img src="@/assets/icons/whale.png" alt="" /></div>
          <div class="leave" @click="toggleLeftSidebar">
            <i class="fas fa-times"></i>
          </div>
        </div>
        <div class="sidebar-middle"></div>

        <div class="sidebar-bottom">
          <el-menu class="el-menu" :router="true">
            <el-menu-item class="divider" @click.native.prevent></el-menu-item>
            <el-menu-item index="/"> <i class="fas fa-home"></i> 首页 </el-menu-item>
          </el-menu>
        </div>
      </el-drawer>
    </div>
    <!-- 右边栏 -->
    <div class="sidebar right-sidebar">
      <el-drawer
        v-model="rightDrawer"
        title=""
        :with-header="false"
        direction="rtl"
        :before-close="handleCloserightDrawer"
        class="drawer right-drawer"
      >
        <div class="sidebar-top">
          <div class="user">
            <div class="user-avatar">
              <el-avatar :src="avatarUrl" shape="square">{{ profile.username }}</el-avatar>
            </div>
            <span class="user-name">{{ profile.nickName }}</span>
          </div>
          <div class="leave" @click="toggleRightSidebar">
            <i class="fas fa-times"></i>
          </div>
        </div>

        <div class="sidebar-bottom">
          <el-menu class="el-menu" :router="true">
            <el-menu-item @click.native.prevent>
              <span class="signature">{{ profile.signature }}</span>
            </el-menu-item>
            <el-menu-item class="divider" @click.native.prevent></el-menu-item>
            <el-menu-item index="/profile">
              <i class="fa-regular fa-user"></i> 个人信息
            </el-menu-item>
            <el-menu-item index="/message/private">
              <i class="fa-regular fa-envelope"></i>邮箱消息</el-menu-item
            >
            <el-menu-item class="divider" @click.native.prevent></el-menu-item>
            <el-menu-item index="/course"> <i class="fas fa-book"></i> 课程列表 </el-menu-item>
            <el-menu-item index="/class"> <i class="fas fa-users"></i> 班级管理 </el-menu-item>
            <el-menu-item index="/todo"> <i class="fas fa-plus"></i> 课程添加 </el-menu-item>
            <el-menu-item index="/task"> <i class="fas fa-tasks"></i> 任务管理 </el-menu-item>
            <el-menu-item index="/homework">
              <i class="fas fa-pencil-alt"></i> 作业列表
            </el-menu-item>
            <el-menu-item class="divider" @click.native.prevent></el-menu-item>
            <el-menu-item index="/login" @click="logout">
              <i class="fas fa-sign-out-alt"></i> 退出登录
            </el-menu-item>
          </el-menu>
        </div>
      </el-drawer>
    </div>

    <div class="main"><router-view></router-view></div>
    <div class="footer"></div>
  </div>
</template>
<script setup>
import { myLocalStorage } from "@/utils/storage";
import { ElMessage } from "element-plus";
import { ref, getCurrentInstance, watch, computed, onMounted } from "vue";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance();
//处理消息下拉栏的路由跳转
const handleCommand = (command) => {
  router.push({ name: command });
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
watch(router.currentRoute, () => {
  leftDrawer.value = false;
  rightDrawer.value = false;
});
//返回主页
const backToHome = () => {
  router.push("/");
};
//处理右边栏的数据
const store = useUserStore();
useUserStore().getProfile();
const { profile } = storeToRefs(store);
const { avatarUrl } = storeToRefs(store);
//点击切换用户消息
const shiftMessage = () => {
  router.push("/message/private");
};
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
@import "@/assets/scss/home.scss";
</style>
