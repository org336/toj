<template>
  <div class="profile">
    <v-row>
      <v-col cols="3">
        <v-list>
          <v-list-item
            v-for="({ icon, to, title }, index) in userMenu"
            :key="index"
            :to="to"
            :title="title"
            :value="title"
            color="primary"
            exact>
            <template v-slot:prepend>
              <v-icon :icon="icon"></v-icon>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="14">
        <router-view></router-view>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
const userMenu = ref([
  {
    icon: "person",
    to: "/user/profile",
    title: "Profile",
  },
  {
    icon: "badge",
    to: "/user/identity",
    title: "Identity",
  },
  {
    icon: "manage_accounts",
    to: "/user/password",
    title: "Password",
  },
]);
</script>

<style lang="scss" scoped>
.profile {
  width: 80%;
  height: 100%;
  margin: 0 auto;
  margin-top: 64px;
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
