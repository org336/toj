<template>
  <div class="teacher">
    <div class="card" v-for="(item, index) in messages">
      <div class="item">
        <div class="left-box">
          <el-avatar :src="item.senderAvatar" shape="circle">{{ item.sender }}</el-avatar>
        </div>
        <div class="center-box">
          <div class="line-1">
            <span class="name">{{ item.sender }}</span>
            <span class="desc">提醒了我</span>
          </div>
          <div class="line-2">{{ item.content }}</div>
          <div class="line-3">
            <div class="time-field">{{ item.time }}</div>
          </div>
        </div>
        <div class="right-box"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { UserService } from "@/utils/api";
const messages = ref([]);
const params = {};
const getMessages = async () => {
  UserService.getMessages(params, "teacher")
    .then((res) => {
      if (res.status === 200) {
        messages.value = res.data.data;
      }
    })
    .catch((error) => {});
};

onMounted(() => {
  getMessages();
});
</script>

<style lang="scss" scoped>
.teacher {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 10px;
  .card {
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
    cursor: pointer;
    .item {
      display: flex;
      padding: 16px;
      gap: 16px;
      .left-box {
        flex-shrink: 0;
        .el-avatar {
          width: 48px;
          height: 48px;
        }
      }
      .center-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 12px;
        color: #222;
        .line-1 {
          .name {
            font-weight: 600;
            margin-right: 12px;
          }
        }

        .line-3 {
          display: flex;
          justify-content: start;
          align-items: center;
          gap: 12px;
          color: #999;
          width: 100%;
        }
      }
    }
  }
}
</style>
