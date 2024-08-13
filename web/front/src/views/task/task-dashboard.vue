<template>
  <div class="dashboard">
    <el-descriptions :column="4" v-for="(item, index) in tasks">
      <el-descriptions-item>
        <template #default>
          <div class="homework-info">
            <h3 class="name">{{ item.name }}</h3>
            <span class="class">
              <i class="fas fa-users"></i>
              {{ item.class }}</span
            >
            <span class="datetime"
              ><i class="fas fa-calendar-alt"></i> {{ item.startDate }} -
              {{ item.endDate }}</span
            >
          </div>
        </template>
      </el-descriptions-item>
      <el-descriptions-item min-width="480px">
        <div class="full-options">
          <div class="options">
            <span class="icon set" @click="editItem(item)">
              <i class="fas fa-edit"></i>修改
            </span>
            <span class="icon delete" @click="deleteItem(item)">
              <i class="fas fa-trash-alt"></i>删除
            </span>
          </div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item width="180px"
        ><template #default>
          <div class="situation">
            <span class="wait">
              <h2>{{ item.waiting }}</h2>
              待批</span
            >
            <span class="submitted">
              <h2>{{ item.submitted }}</h2>
              已交</span
            >
            <span class="total">
              <h2>80</h2>
              总共</span
            >
          </div>
        </template></el-descriptions-item
      >
      <el-descriptions-item width="140px">
        <CustomButton :width="120" @click="amendHomework" buttonText="点击批阅"></CustomButton>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup>
import CustomButton from "@/components/common/CustomButton.vue";
import { ref, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();
const amendHomework = () => {};
const editItem = (item) => {
  console.log(item);
};
const deleteItem = (item) => {
  console.log(item);
};
const tasks = [
  {
    name: "第05章 输入输出系统",
    class: "22计算机[3-4]班",
    startDate: "2024-01-01 07-05 17:50",
    endDate: "2024-01-01 08-05 17:50",
    waiting: "5",
    submitted: "5",
  },
  {
    name: "第05章 输入输出系统",
    class: "22计算机[3-4]班",
    startDate: "2024-01-01 07-05 17:50",
    endDate: "2024-01-01 08-05 17:50",
    waiting: "5",
    submitted: "5",
  },
  {
    name: "第05章 输入输出系统",
    class: "22计算机[3-4]班",
    startDate: "2024-01-01 07-05 17:50",
    endDate: "2024-01-01 08-05 17:50",
    waiting: "5",
    submitted: "5",
  },
  {
    name: "第05章 输入输出系统",
    class: "22计算机[3-4]班",
    startDate: "2024-01-01 07-05 17:50",
    endDate: "2024-01-01 08-05 17:50",
    waiting: "5",
    submitted: "5",
  },
  {
    name: "第05章 输入输出系统",
    class: "22计算机[3-4]班",
    startDate: "2024-01-01 07-05 17:50",
    endDate: "2024-01-01 08-05 17:50",
    waiting: "5",
    submitted: "5",
  },
];
</script>

<style lang="scss" scoped>
.dashboard {
  .homework-info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;
    color: #999;
    gap: 4px;
    .name {
      color: #222;
    }
    i {
      color: #5995fd;
    }
  }
  .full-options {
    cursor: pointer;
    width: 100%;
    .options {
      visibility: hidden;
      display: flex;
      justify-content: center;
      align-items: baseline;
      height: 80px;
      font-size: 1.1rem;
      gap: 16px;
      .icon {
        color: #555;
        font-weight: bold;
        cursor: pointer;
        &:hover {
          color: #5995fd;
        }
      }
    }
    &:hover {
      .options {
        visibility: visible;
      }
    }
  }

  .situation {
    display: flex;
    justify-content: center;
    align-items: baseline;
    gap: 12px;
  }
}
</style>
