<script setup>
import { ref, getCurrentInstance } from "vue";

import { useRouter } from "vue-router";
const { proxy } = getCurrentInstance();
const tabItems = ref([
  { text: "Learn Course", value: "learn", icon: "school", route: "/dashboard/course" },
  { text: "View Class", value: "class", icon: "group", route: "/dashboard/class" },
  { text: "Deal Task", value: "task", icon: "task", route: "/dashboard/task" },
  { text: "Chat GPT", value: "chat", icon: "chat", route: "/dashboard/chat" },
]);
const tab = ref("learn");
</script>
<template>
  <div class="dashboard">
    <v-card>
      <div class="flex">
        <v-tabs v-model="tab" color="secondary" direction="vertical">
          <v-tab
            v-for="{ text, value, icon, route } in tabItems"
            :key="value"
            :value="value"
            :text="text"
            :to="route">
            <template v-slot:prepend>
              <v-icon :icon="icon"></v-icon>
            </template>
          </v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">
          <router-view v-slot="{ Component }">
            <div v-if="Component">
              <component :is="Component" />
            </div>
          </router-view>
        </v-tabs-window>
      </div>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  margin-top: 64px;
  padding-left: 4px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
