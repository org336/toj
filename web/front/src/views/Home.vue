<template>
  <div class="home">
    <div class="nav">
      <div class="nav-start">
        <!-- 汉堡菜单图标 -->
        <button class="hamburger" @click="toggleLeftSidebar">
          <i class="fas fa-bars"></i>
        </button>
        <div class="top-icon"><img src="../assets/whale.png" /></div>
        <div class="top-name">蓝鲸</div>
      </div>
      <div class="nav-middle"></div>
      <div class="nav-end">
        <!-- 搜索框 -->
        <el-input placeholder="搜索一下">
          <template #prefix><i class="fas fa-search"></i></template>
        </el-input>
        <!-- 消息图标 -->
        <div class="msg-bell">
          <i class="fa-sharp fa-regular fa-bell"></i>
        </div>

        <!-- 用户头像 -->
        <div class="avatar">
          <el-avatar :src="profile.avatar" shape="square">{{ profile.username }}</el-avatar>
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
          <div class="siderbar-icon"><img src="../assets/whale.png" alt="" /></div>
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
              <el-avatar :src="profile.avatar" shape="square">{{ profile.username }}</el-avatar>
            </div>
            <div class="user-name">{{ profile.username }}</div>
          </div>
          <div class="leave" @click="toggleRightSidebar">
            <i class="fas fa-times"></i>
          </div>
        </div>

        <div class="sidebar-bottom">
          <el-menu class="el-menu" :router="true">
            <el-menu-item index="signaturePage">{{ profile.signature }}</el-menu-item>
            <el-menu-item class="divider" @click.native.prevent></el-menu-item>
            <el-menu-item index="/profile">
              <i class="fa-regular fa-user"></i> 个人信息
            </el-menu-item>
            <el-menu-item index="/email">
              <i class="fa-regular fa-envelope"></i>邮箱消息</el-menu-item
            >
            <el-menu-item class="divider" @click.native.prevent></el-menu-item>
            <el-menu-item index="/course"> <i class="fas fa-book"></i> 课程列表 </el-menu-item>
            <el-menu-item index="/class"> <i class="fas fa-users"></i> 班级管理 </el-menu-item>
            <el-menu-item index="addCourse">
              <i class="fas fa-plus"></i> 课程添加
            </el-menu-item>
            <el-menu-item index="/task"> <i class="fas fa-tasks"></i> 任务管理 </el-menu-item>
            <el-menu-item index="/homework">
              <i class="fas fa-pencil-alt"></i> 作业列表
            </el-menu-item>
            <el-menu-item class="divider" @click.native.prevent></el-menu-item>
            <el-menu-item index="/login">
              <i class="fas fa-sign-out-alt"></i> 退出登录
            </el-menu-item>
          </el-menu>
        </div>
      </el-drawer>
    </div>
    <template>
      <el-backtop @click="">
        <div
          style="
            height: 100%;
            width: 100%;
            background-color: var(--el-bg-color-overlay);
            box-shadow: var(--el-box-shadow-lighter);
            text-align: center;
            line-height: 40px;
            color: #1989fa;
          "
        >
          回到顶部
        </div>
      </el-backtop>
    </template>

    <div class="main"><router-view></router-view></div>
    <div class="footer"></div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, watch, watchEffect } from "vue";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance();
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

//处理右边栏的数据
const store = useUserStore();
const { profile } = storeToRefs(store);
</script>

<style lang="scss" scoped>
@import "../assets/scss/home.scss";
</style>
