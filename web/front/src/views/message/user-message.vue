<template>
  <div class="msg">
    <div class="space-left">
      <div class="sidebar">
        <div class="title">
          <div class="title-name">消息中心</div>
        </div>
        <el-menu @select="handleSelect" :default-active="activeMenu">
          <el-menu-item index="MessagePrivate">私人消息</el-menu-item>
          <el-menu-item index="MessageTeacher">老师消息</el-menu-item>
          <el-menu-item index="MessageSystem">系统通知</el-menu-item>
          <el-menu-item index="MessageMy">我的消息</el-menu-item>
          <div class="divided-line"></div>
          <el-menu-item index="MessageSetting">消息设置</el-menu-item>
        </el-menu>
      </div>
    </div>

    <div class="space-right">
      <div class="title">{{ messgaeTypes[selectedMenu] }}</div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watchEffect } from "vue";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const store = useUserStore();
const { profile } = storeToRefs(store);
const activeMenu = ref(route.name);
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
onMounted(() => {
  document.body.style.overflow = "hidden";
});
watchEffect(() => {
  activeMenu.value = route.name;
});
</script>

<style lang="scss" scoped>
.msg {
  display: flex;
  width: 60%;
  margin: 74px auto;
  background-color: #f5f5f5;
  .space-left {
    background-color: rgba(255, 255, 255, 0.8);
    width: 150px;
    .sidebar {
      width: 100%;
      font-weight: 700;
      .divided-line {
        border-top: 1px solid #fff;
        margin: 10px 0;
      }
      .title {
        height: 62px;
        line-height: 62px;
        font-size: 15px;
        text-align: center;
        color: #333;
      }
      :deep(.el-menu) {
        border-right: none;
        .el-menu-item {
          color: #6b757b;
          text-align: center;
          padding-left: 35px;
        }
        .el-menu-item.is-active {
          color: #5995fd;
          background-color: #ecf5ff;
        }
      }
    }
  }
  .space-right {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    margin: 0 10px;
    margin-bottom: 10px;
    .title {
      margin: 10px 0;
      align-items: center;
      padding: 0 16px;
      font-size: 16px;
      height: 44px;
      line-height: 44px;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
    }
    .content {
      max-height: calc(100vh - 64px - 44px);
      overflow-y: auto;
    }
  }
}
</style>
