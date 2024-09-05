<script setup lang="ts">
import EmailCompose from "./EmailCompose.vue";
import { ref } from "vue";

// 定义列表项的属性数组
const inboxMenu = ref({
  icon: "mail",
  to: "/message/inbox",
  title: "Inbox",
  children: [
    {
      icon: "all_inbox",
      to: "/message/inbox/?type=all",
      title: "All",
      badge: 6,
    },
    {
      icon: "3p",
      to: "/message/inbox/?type=personal",
      title: "Personal",
      badge: 6,
    },
    {
      icon: "chat",
      to: "/message/inbox/?type=system",
      title: "System",
      badge: 6,
    },
  ],
});
const menuItems = ref([
  {
    icon: "send",
    to: "/message/send",
    title: "Send",
    badge: 12,
  },
  {
    icon: "drafts",
    to: "/message/drafts",
    title: "Drafts",
    badge: 12,
  },
  {
    icon: "star",
    to: "/message/starred",
    title: "Starred",
    badge: 12,
  },
  {
    icon: "delete",
    to: "/message/trash",
    title: "Trash",
    badge: 12,
  },
  {
    icon: "settings",
    to: "/message/setting",
    title: "Setting",
    badge: null,
  },
]);
</script>

<template>
  <v-card height="100%" class="pa-3">
    <!-- ---------------------------------------------- -->
    <!-- Write Email -->
    <!-- ---------------------------------------------- -->

    <EmailCompose />
    <v-list class="mt-2 pa-0" color="primary">
      <v-list-group value="Inbox">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" prepend-icon="mail" title="Inbox"></v-list-item>
        </template>

        <v-list-item
          v-for="({ icon, to, title, badge }, index) in inboxMenu.children"
          :key="index"
          :to="to"
          :title="title"
          :value="title"
          exact>
          <template v-slot:prepend>
            <v-icon :icon="icon"></v-icon>
          </template>
          <template v-slot:append>
            <v-badge color="secondary" :content="badge" inline></v-badge>
          </template>
        </v-list-item>
      </v-list-group>
      <v-list-item
        v-for="({ icon, to, title, badge }, index) in menuItems"
        :key="index"
        :to="to"
        :title="title"
        :value="title"
        exact>
        <template v-slot:prepend>
          <v-icon :icon="icon"></v-icon>
        </template>
        <template v-slot:append v-if="badge">
          <v-badge color="secondary" :content="badge" inline></v-badge>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style scoped lang="scss"></style>
