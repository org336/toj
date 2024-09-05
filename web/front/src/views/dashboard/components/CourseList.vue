<script setup lang="ts">
import { ref, computed } from "vue";

const containerHeight = computed(() => window.innerHeight - 72);

const myCourses = ref([
  {
    id: 1,
    name: "Vue.js Basics",
    teacher: "John Doe",
    description: "Learn the basics of Vue.js, a progressive JavaScript framework.",
    image: "https://via.placeholder.com/200",
    show: false,
  },
  {
    id: 2,
    name: "Advanced Vue.js",
    teacher: "Jane Smith",
    description: "Dive deeper into Vue.js and learn advanced concepts.",
    image: "https://via.placeholder.com/200",
    show: false,
  },
  {
    id: 3,
    name: "Vue.js with TypeScript",
    teacher: "Alice Johnson",
    description: "Learn how to use TypeScript with Vue.js for better type safety.",
    image: "https://via.placeholder.com/200",
    show: false,
  },
  {
    id: 4,
    name: "Vue.js and Vuex",
    teacher: "Bob Brown",
    description: "Manage state in your Vue.js applications using Vuex.",
    image: "https://via.placeholder.com/200",
    show: false,
  },
  {
    id: 5,
    name: "Vue Router",
    teacher: "Charlie Davis",
    description: "Learn how to handle routing in your Vue.js applications.",
    image: "https://via.placeholder.com/200",
    show: false,
  },
  {
    id: 6,
    name: "Testing Vue.js Applications",
    teacher: "Diana Evans",
    description: "Learn how to test your Vue.js applications effectively.",
    image: "https://via.placeholder.com/200",
    show: false,
  },
]);
const searchQuery = ref("");
const selectedFilter = ref("All");
const filters = ["All", "Beginner", "Intermediate", "Advanced"];
const searchCourse = () => {
  console.log("Search Query:", searchQuery.value);
};
const filterCourse = () => {
  console.log("Selected Filter:", selectedFilter.value);
};
</script>

<template>
  <v-container :max-height="containerHeight">
    <v-row>
      <v-col cols="2" class="m-t">
        <v-sheet class="w-48">
          <v-text-field
            label="搜索课程"
            clearable
            v-model="searchQuery"
            color="primary"></v-text-field>
          <v-btn @click="searchCourse" size="large" block color="primary">点击搜索</v-btn>
        </v-sheet>
        <v-sheet class="w-48 mt-4">
          <v-select
            v-model="selectedFilter"
            :items="filters"
            label="筛选"
            default="all"></v-select>
          <v-btn @click="filterCourse" size="large" block color="primary">应用筛选</v-btn>
        </v-sheet>
      </v-col>
      <v-col cols="10" class="overflow-auto" >
        <v-row>
          <v-col cols="10" sm="6" md="4" lg="4" v-for="course in myCourses" :key="course.id">
            <v-card class="" max-width="288 " hover>
              <v-img :src="course.image" height="200px" cover></v-img>
              <v-card-item>
                <v-card-title>{{ course.name }}</v-card-title>
                <v-card-subtitle>{{ course.teacher }}</v-card-subtitle>
                <v-card-text>{{ course.description }}</v-card-text>
              </v-card-item>

              <v-card-actions>
                <v-btn color="primary" text="Explore"></v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  :icon="course.show ? 'arrow_upward' : 'arrow_downward'"
                  @click="course.show = !course.show"></v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss"></style>
