<script setup>
import { ref, computed } from "vue";
import TaskList from "../components/TaskList.vue";
import TaskMenu from "../components/TaskMenu.vue";
const containerHeight = computed(() => window.innerHeight - 64);
</script>
<template>
  <v-container class="app-container" :max-height="containerHeight">
    <div class="d-md-block sidebar">
      <TaskMenu />
    </div>

    <div class="main">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
.app-container {
  display: flex;
  height: 100%;
  width: 100%;

  .sidebar {
    display: flex;
    flex-direction: column;
    width: 200px;
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
