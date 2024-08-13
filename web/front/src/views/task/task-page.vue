<template>
  <div class="task">
    <div class="left-part">
      <el-menu default-active="/task" :router="true">
        <el-menu-item index="/task">
          <span>任务总览</span>
        </el-menu-item>
        <el-menu-item index="/task/dashboard">
          <span>批阅作业</span>
        </el-menu-item>
        <el-menu-item index="/task/create">
          <span>布置作业</span>
        </el-menu-item>
        <el-menu-item index="/task/setting">
          <span>任务设置</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right-part">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
</script>

<style lang="scss" scoped>
.task {
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  margin: 0 auto;
  margin-top: 78px;
  .left-part {
    flex: 0;
    height: 228px;
    border: 2px solid rgb(32, 33, 36);
    .el-menu-item {
      font-size: 1.15rem;
      font-weight: bold;
    }
    .el-menu-item.is-active {
      background-color: #1565c0;
      color: #fff;
    }
  }
  .right-part {
    flex: 1;
    border: 2px solid rgb(32, 33, 36);
    width: 100%;
    padding: 12px;
    max-height: calc(100vh - 78px);
    overflow-y: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
