<script setup lang="ts">
import { ref } from "vue";
const taskType = ref([
  {
    title: "TODO",
    to: "todo",
    badge: 8,
  },
  {
    title: "COMPLETED",
    to: "completed",
    badge: 8,
  },
]);
const labels = [
  {
    id: "1",
    title: "Work",
    color: "orange",
  },
  {
    id: "2",
    title: "Relaxation",
    color: "green",
  },
  {
    id: "3",
    title: "Shopping",
    color: "least",
  },
];
</script>

<template>
  <v-card height="100%" class="pa-3">
    <!-- ---------------------------------------------- -->
    <!-- Add Task Dialog -->
    <!-- ---------------------------------------------- -->
    <div class=" mt-2 text-overline text-grey">STATUS</div>
    <v-list class="mt-2 pa-0" color="primary">
      <v-list-item
        link
        v-for="({ title, to, badge }, index) in taskType"
        :key="index"
        :to="to"
        :title="title">
        <template v-slot:append>
          <v-badge color="secondary" inline :content="badge"></v-badge>
        </template>
      </v-list-item>
    </v-list>
    <div class="mt-2 text-overline text-grey">Labels</div>
    <v-list nav class="mt-2 p-0">
      <v-list-item link v-for="({title,id,color}) in labels" :title="title" :key="id">
        <template v-slot:prepend>
          <v-icon :color="color" icon="bookmark"> </v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style scoped lang="scss"></style>
