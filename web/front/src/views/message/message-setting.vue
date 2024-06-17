<template>
  <div class="system">
    <div class="config" v-for="(item, index) in messages">
      <div class="item">
        <div class="text">
          <span class="title">{{ item.title }}</span>
          <span class="tip">{{ item.tip }}</span>
        </div>
        <div class="radio-list">
          <el-switch v-model="item.status" active-text="开启" inactive-text="关闭"></el-switch>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
const messages = reactive([
  {
    title: "消息提醒",
    tip: "(关闭后，消息将不再进行提醒)",
    status: false,
  },
  {
    title: "私信智能拦截",
    tip: "(开启后，将自动拦截疑似骚扰和不良的会话)",
    status: false,
  },
]);
</script>

<style lang="scss" scoped>
.system {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 10px;
  .config {
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
    cursor: pointer;
    .item {
      display: flex;
      flex-direction: column;
      padding: 16px;
      gap: 16px;
      color: #222;
      .text {
        .title {
          color: #333;
          margin-right: 6px;
        }
        .tip {
          color: #999;
        }
      }
    }
  }
}
</style>
