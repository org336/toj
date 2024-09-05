<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const tasks = [
  {
    id: 1,
    title: "Write a report",
    detail: "Draft the quarterly update for the team",
    completed: false,
    tags: ["work"],
    to: "1",
  },
  {
    id: 2,
    title: "Attend a meeting",
    detail: "Join the conference call with the client",
    completed: false,
    tags: ["work"],
    to: "2",
  },
  {
    id: 3,
    title: "Complete a project",
    detail: "Finish the coding task before the deadline",
    completed: false,
    tags: ["work"],
    to: "3",
  },
  {
    id: 4,
    title: "Take a walk",
    detail: "Explore the park and enjoy the nature",
    completed: false,
    tags: ["relaxation"],
    to: "4",
  },
  {
    id: 5,
    title: "Meditate",
    detail: "Practice mindfulness for 15 minutes",
    completed: true,
    tags: ["relaxation"],
    to: "5",
  },
  {
    id: 6,
    title: "Watch a movie",
    detail: "Stream a comedy to lighten the mood",
    completed: true,
    tags: ["relaxation"],
    to: "6",
  },
  {
    id: 7,
    title: "Buy groceries",
    detail: "Stock up on fruits, vegetables, and snacks",
    completed: true,
    tags: ["shopping"],
    to: "7",
  },
  {
    id: 8,
    title: "Shop for clothes",
    detail: "Look for a new outfit for the weekend",
    completed: false,
    tags: ["shopping"],
    to: "8",
  },
  {
    id: 9,
    title: "Order supplies",
    detail: "Get some office essentials for the team",
    completed: false,
    tags: ["shopping", "relaxation"],
    to: "9",
  },
  {
    id: 10,
    title: "Buy gifts",
    detail: "Get presents for friends and family",
    completed: false,
    tags: ["shopping", "relaxation"],
    to: "10",
  },
];
const searchKey = ref("");
const data = computed(() => {
  let isCompletedRoute = route.path.includes("completed");
  return tasks.filter((task) => (isCompletedRoute ? task.completed : !task.completed));
});
const filterdTodoList = computed(() => {});
</script>

<template>
  <v-card>
    <div class="flex justify-start gap-1">
      <v-sheet></v-sheet>
      <v-text-field
        clearable
        variant="solo"
        class="elevation-1 ma-3"
        hide-details
        prepend-inner-icon="search"
        placeholder="Filter Tasks"
        v-model="searchKey"></v-text-field>
    </div>

    <v-list class="todo-list">
      <v-list-item
        v-for="{ id, title, detail, completed, tags, to } in data"
        :key="id"
        :to="to"
        :index="id"
        class="todo-item d-flex align-center pa-5">
        <template v-slot:prepend>
          <v-avatar size="40">
            <v-img src="https://avatars.githubusercontent.com/u/35951244?v=4" alt="alt" />
          </v-avatar>
        </template>
        <v-list-item-title
          class="font-weight-bold"
          :class="completed ? 'text-decoration-line-through' : ''">
          {{ title }}
        </v-list-item-title>
        <v-list-item-subtitle :class="completed ? 'text-decoration-line-through' : ''">
          {{ detail }}
        </v-list-item-subtitle>
        <div>
          <v-chip
            v-for="tag in tags"
            :key="tag"
            size="x-small"
            variant="outlined"
            class="mr-1 mt-1">
            {{ tag }}
          </v-chip>
        </div>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style scoped lang="scss">
.todo-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  height: 100%;

  .todo-item {
    flex: 1 1 calc(50% - 16px);
    transition: all 0.3s;

    &:hover {
      transition: all 0.3s;
      background-color: rgba(99, 99, 99, 0.2);
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px !important;
      cursor: pointer;
    }
  }
}
</style>
