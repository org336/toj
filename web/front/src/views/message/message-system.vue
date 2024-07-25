<template>
  <div class="system">
    <div class="card" v-for="(item, index) in messages">
      <div class="item">
        <div class="top-box">
          <span class="title">{{ item.title }}</span>
          <span class="time">{{ item.update_time }}</span>
        </div>
        <div class="bottom-box">
          <span class="content">{{ item.content }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { MessageService } from "@/utils/api";
const messages = ref([]);
const getMessages = () => {
  let params = {
    uid: localStorage.getItem("user_uid"),
  };
  MessageService.getSystemMessage(params)
    .then((res) => {
      if (res.code == 200) {
        messages.value = res.data;
      }
    })
    .catch((error) => {});
};
onMounted(() => {
  getMessages();
});
</script>

<style lang="scss" scoped>
.system {
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
      flex-direction: column;
      padding: 16px;
      gap: 16px;
      color: #222;

      .top-box {
        .title {
          font-weight: bold;
          margin-right: 24px;
        }
        .time {
          color: #999;
        }
      }
    }
  }
}
</style>
