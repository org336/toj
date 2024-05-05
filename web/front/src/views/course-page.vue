<template>
  <div class="course">
    <div class="course-header">
      <div class="select-left-right">
        <span
          class="select left"
          :class="{ active: activeTab === 'tab1' }"
          @click="activeTab = 'tab1'"
          >我学的课
        </span>
        <span
          class="select right"
          :class="{ active: activeTab === 'tab2' }"
          @click="activeTab = 'tab2'"
          >我教的课
        </span>
      </div>
      <el-select v-model="value" placeholder="Select" style="width: 240px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="course-content">
      <template v-if="activeTab === 'tab1'"
        ><el-card
          shadow="hover"
          class="course-item"
          v-for="(course, index) in studyCourses"
          :key="index"
        >
          <el-image :src="course.image" fit="cover" class="course-image" />
          <template #footer>
            <div class="course-info">
              <div class="course-name">{{ course.name }}</div>
              <div class="course-row teacher">
                <p>授课老师:</p>
                <p>{{ course.teacher }}</p>
              </div>
              <div class="course-row id">
                <p>课程编号:</p>
                <p>{{ course.id }}</p>
              </div>
              <div class="course-row description">
                <p>课程描述:</p>
                <p>{{ course.description }}</p>
              </div>
            </div>
          </template>
        </el-card></template
      >
      <template v-if="activeTab === 'tab2'">
        <el-card
          shadow="hover"
          class="course-item"
          v-for="(course, index) in teachCourses"
          :key="index"
        >
          <el-image :src="course.image" :fit="contain" class="course-image"> ></el-image>
          <template #footer>
            <div class="course-info">
              <div class="course-name">{{ course.name }}</div>
              <div class="course-row teacher">
                <p>授课老师:</p>
                <p>{{ course.teacher }}</p>
              </div>
              <div class="course-row id">
                <p>课程编号:</p>
                <p>{{ course.id }}</p>
              </div>
              <div class="course-row description">
                <p>课程描述:</p>
                <p>{{ course.description }}</p>
              </div>
            </div>
          </template>
        </el-card></template
      >
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const activeTab = ref("tab1");
const teachCourses = ref([]);
const studyCourses = ref([
  {
    name: "课程1",
    teacher: "老师1",
    id: "Xxxxxxxxx",
    description: "课程1的描述",
    image: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
  },
  {
    name: "课程2",
    teacher: "老师2",
    id: "Xxxxxxxxx",
    description: "课程2的描述",
    image: "../assets/course.jpeg",
  },
  {
    name: "课程3",
    teacher: "老师3",
    id: "Xxxxxxxxx",
    description: "课程3的描述",
    image: "../assets/course.jpeg",
  },
  {
    name: "课程4",
    teacher: "老师4",
    id: "Xxxxxxxxx",
    description: "课程4的描述",
    image: "../assets/course.jpg",
  },
  {
    name: "课程1",
    teacher: "老师1",
    id: "Xxxxxxxxx",
    description: "课程1的描述",
    image: "../assets/course.jpg",
  },
  {
    name: "课程2",
    teacher: "老师2",
    id: "Xxxxxxxxx",
    description: "课程2的描述",
    image: "../assets/course.jpg",
  },
  {
    name: "课程3",
    teacher: "老师3",
    id: "Xxxxxxxxx",
    description: "课程3的描述",
    image: "../assets/course.jpg",
  },
  {
    name: "课程4",
    teacher: "老师4",
    id: "Xxxxxxxxx",
    description: "课程4的描述",
    image: "../assets/course.jpg",
  },
  // ...
]);
const value = ref("");
const options = ref([
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
]);
</script>

<style lang="scss" scoped>
.course {
  width: 65%;
  height: 100%;
  margin: 0 auto;
  padding: 16px;
  .course-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    line-height: 4rem;
    margin-bottom: 18px;
    border-bottom: 1px solid #cdc7c7;
    .select-left-right {
      margin-right: 14px;
      .select {
        position: relative;
        font-size: 1.4rem;
        cursor: pointer;
        padding: 10px 12px;
        &.active {
          background-color: #87ceeb;
          font-weight: bold;
          border-radius: 5px;
          &::after {
            content: "";
            display: inline-block;
            width: 0;
            height: 0;
            border-left: 12px solid transparent;
            border-right: 12px solid transparent;
            border-top: 12px solid #87ceeb;
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
      .left {
        margin-right: 14px;
      }
    }
  }
  .course-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    max-height: calc(100vh - 138px);
    overflow-y: auto;
    .course-item {
      :deep(.el-card__body) {
        padding: 0 !important;
        .course-image {
          width: 100%;
          height: 192px;
          cursor: pointer;
        }
      }
      .course-info {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        .course-name {
          font-size: 1.3rem;
          margin-bottom: 6px;
        }
        .course-row {
          display: flex;
          flex-wrap: nowrap;
        }
      }
    }
  }
}
</style>
