<template>
  <div class="personal">
    <div class="card" v-for="(item, index) in privateMessages">
      <div class="sender">
        <el-avatar :src="item.avatarUrl" shape="circle">{{ item.sender.nickName }}</el-avatar>
        <span class="name">{{ item.sender.nickName }}</span>
        <span class="desc">私信了我</span>
      </div>
      <div class="message" v-for="(message, index) in item.messages">
        <div class="top">
          <span class="title">{{ message.title }}</span>
          <span class="content">{{ message.content }}</span>
        </div>
        <div class="bottom">
          <span class="time">{{ message.update_time }}</span>
          <div @click="showReply(message)" class="action reply">
            <i class="fas fa-reply"></i>
            回复
          </div>
          <div @click="likeMessage(message)" class="action like">
            <i class="fas fa-thumbs-up"></i> 点赞
          </div>
          <div class="action delete">
            <el-popconfirm
              width="210"
              confirm-button-text="确定"
              cancel-button-text="取消"
              confirm-button-type="danger"
              cancel-button-type="primary"
              icon-color="#2faee3"
              title="你确定要删除此条消息吗？"
              @confirm="deleteMessage(message)"
            >
              <template #reference> <i class="fas fa-trash">删除</i> </template>
            </el-popconfirm>
          </div>
        </div>
        <div class="reply-dialog" v-show="message.showReply">
          <div class="left-box">
            <el-avatar :src="profile.avatarUrl" shape="circle">{{
              profile.nickName
            }}</el-avatar>
          </div>
          <div class="center-box">
            <el-input
              type="textarea"
              v-model="item.reply"
              placeholder="请输入回复"
              :autosize="{ minRows: 2, maxRows: 6 }"
            ></el-input>
          </div>
          <div class="right-box">
            <el-button
              type="primary"
              :style="{ width: '52px', height: '52px' }"
              @click="replyMessage(message)"
              >点击
              <br />
              回复</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/store/user";
import { MessageService } from "@/utils/api";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
const store = useUserStore();
const { profile } = storeToRefs(store);
const privateMessages = ref([]);
const getMessages = () => {
  let params = {
    uid: localStorage.getItem("user_uid"),
  };
  MessageService.getPrivateMessage(params)
    .then((res) => {
      if (res.code == 200) {
        privateMessages.value = res.data;
      }
    })
    .catch((error) => {
      ElMessage.error("获取私人消息失败");
    });
};
const showReply = (item) => {
  if (item.showReply == null) {
    item.showReply = true;
  } else {
    item.showReply = !item.showReply;
  }
  item.reply = null;
};
const replyMessage = () => {};
const likeMessage = () => {};
const deleteMessage = () => {};
onMounted(() => {
  getMessages();
});
</script>

<style lang="scss" scoped>
.personal {
  padding: 24px 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
  border-radius: 6px;
  margin-bottom: 48px;
  .card {
    padding-top: 24px;
    padding-bottom: 24px;
    cursor: pointer;

    &:first-child {
      padding-top: 0px;
    }
    &:last-child {
      padding-bottom: 0px;
    }
    .sender {
      flex: 1;
      display: flex;
      justify-content: flex-start;
      align-items: baseline;
      gap: 12px;
      color: #222;
      .el-avatar {
        width: 48px;
        height: 48px;
      }
      .name {
        font-weight: 600;
        margin-right: 12px;
      }
    }
    .message {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 16px;
      .top {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 12px;
        .title {
          font-weight: bold;
        }
        .content {
          color: #222;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      }
      .bottom {
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 12px;
        color: #999;
        width: 100%;

        .action {
          &:hover {
            color: #2faee3;
          }
        }
        .delete {
          display: none;
        }
        &:hover {
          .delete {
            display: block;
          }
        }
      }
      .reply-dialog {
        display: flex;
        gap: 16px;
        justify-content: flex-start;
        align-items: center;
        margin-top: 16px;
        .left-box {
          .el-avatar {
            width: 48px;
            height: 48px;
          }
        }
        .center-box {
          flex-shrink: 0;
          flex: 1;
          .el-textarea {
            :deep(.el-textarea__inner) {
              max-height: 104px;
            }
          }
        }
      }
    }

    &:not(:last-child) {
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
