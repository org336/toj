<template>
  <div class="personal">
    <div class="card" v-for="(item, index) in messages">
      <div class="item">
        <div class="left-box">
          <el-avatar :src="item.senderAvatar" shape="circle">{{ item.sender }}</el-avatar>
        </div>
        <div class="center-box">
          <div class="line-1">
            <span class="name">{{ item.sender }}</span>
            <span class="desc">私信了我</span>
          </div>
          <div class="line-2">{{ item.content }}</div>
          <div class="line-3">
            <div class="time-field">{{ item.time }}</div>
            <div class="action-field">
              <div @click="reply(item)" class="action reply">
                <i class="fas fa-reply"></i> 回复
              </div>
              <div @click="like(item)" class="action like">
                <i class="fas fa-thumbs-up"></i> 点赞
              </div>
              <div @click="deleteMessage(item)" class="action delete">
                <i class="fas fa-trash"></i> 删除
              </div>
            </div>
          </div>
        </div>
        <div class="right-box"></div>
      </div>
      <div class="reply-dialog" v-show="item.showReply">
        <div class="left-box">
          <el-avatar :src="item.senderAvatar" shape="circle">{{ profile.username }}</el-avatar>
        </div>
        <div class="center-box">
          <el-input
            type="textarea"
            v-model="item.reply"
            placeholder="请输入回复"
            :autosize="{ minRows: 2, maxRows: 4 }"
          ></el-input>
        </div>
        <div class="right-box">
          <el-button type="primary" :style="{ width: '52px', height: '52px' }"
            >点击
            <br />
            回复</el-button
          >
        </div>
      </div>
      <div class="delete-dialog" v-show="showDelete"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { UserService } from "@/utils/api";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
const store = useUserStore();
const { profile } = storeToRefs(store);
const messages = ref([]);
const params = {};
const showReply = ref(false);
const showDelete = ref(false);
const getMessages = async () => {
  UserService.getMessages(params, "personal")
    .then((res) => {
      if (res.status === 200) {
        messages.value = res.data.data;
      }
    })
    .catch((error) => {});
};
const reply = (item) => {
  if (item.showReply == null) {
    item.showReply = true;
  } else {
    item.showReply = !item.showReply;
  }
  item.reply = null;
};
const deleteMessage = (item) => {
  item.showReply = !item.showReply;
};
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
    .item {
      display: flex;
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
          .action-field {
            display: flex;
            gap: 12px;
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

    &:not(:last-child) {
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
