import { defineStore } from "pinia";
import { reactive } from "vue";

export const useCourseStore = defineStore("course", () => {
  // 定义你的状态
  const course = reactive({
    courseName: "计算机组成原理",
    courseNumber: "xxxxxxx",
    courseInstructor: "王老师",
    courseTime: "2024/4/22",
    courseDescription: "讲述计算机的底层原理",
  });

  // 定义你的方法
  const updateCourse = (newCourse) => {
    Object.assign(course, newCourse);
  };
  // 返回你的状态和方法
  return {
    course,
    updateCourse,
  };
});
