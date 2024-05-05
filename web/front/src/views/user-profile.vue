<template>
  <div class="profile">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-menu default-active="/profile" class="el-menu" :router="true">
          <el-menu-item index="/profile"> <i class="fas fa-user"></i> 个人简介 </el-menu-item>
          <el-menu-item index="/profile/identity">
            <i class="fas fa-id-card"></i> 身份认证
          </el-menu-item>
          <el-menu-item index="/profile/updatePwd">
            <i class="fas fa-key"></i> 修改密码
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="16">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
</script>

<style lang="scss" scoped>
.profile {
  width: 80%;
  height: 100%;
  margin: 0 auto;
  padding: 16px;
  :deep(.el-menu) {
    .el-menu-item {
      i {
        font-size: 1.2rem;
        width: 28px;
      }
    }
    .el-menu-item.is-active {
      position: relative;
      font-weight: bold;
      background-color: #ecf5ff;
    }
    .el-menu-item.is-active::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background-color: #5995fd;
    }
  }
}
</style>
