<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import { useSnackbarStore } from "@/store/snackbar";
import { useChatGPTStore } from "@/store/chatGPTStore";
import { storeToRefs } from "pinia";
import { read, countAndCompleteCodeBlocks } from "@/utils/aiUtils";
import OpenAI from "openai";
const snackbarStore = useSnackbarStore();
const chatGPTStore = useChatGPTStore();
const { config } = storeToRefs(chatGPTStore);
interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

// User Input Message
const userMessage = ref("");

// Prompt Message
const promptMessage = computed(() => {
  return [
    {
      role: "system" as const,
      content: config.value.prompt,
    },
  ];
});
const scrollToBottom = () => {
  nextTick(() => {
    const messageContainer = document.querySelector(".message-container");
    messageContainer.scrollTop = messageContainer.scrollHeight;
  });
};

// Message List
const messages = ref<Message[]>([]);

const requestMessages = computed<Message[]>(() => {
  if (messages.value.length <= 10) {
    return [...promptMessage.value, ...messages.value];
  } else {
    // 截取最新的10条信息
    const slicedMessages = messages.value.slice(-10);
    return [...promptMessage.value, ...slicedMessages];
  }
});

// Send Message
const sendMessage = async () => {
  if (userMessage.value) {
    // Add the message to the list
    messages.value.push({
      content: userMessage.value,
      role: "user",
    });

    // Clear the input
    userMessage.value = "";

    // Create a response
    await createCompletion();
  }
};
const createCompletion = async () => {
  messages.value.push({
    content: "Thinking...",
    role: "assistant",
  });
  // 调试输出 token
  try {
    const client = new OpenAI({
      baseURL: config.value.endpoint,
      apiKey: config.value.token,
      dangerouslyAllowBrowser: true,
    });

    const response = await client.chat.completions.create({
      messages: requestMessages.value,
      model: config.value.model,
    });

    if (response.choices && response.choices.length > 0) {
      messages.value.pop();
      messages.value.push({
        content: response.choices[0].message.content,
        role: "assistant",
      });
    }
    scrollToBottom();
  } catch (error) {
    snackbarStore.show(error.message, "error");
  }
};

const displayMessages = computed(() => {
  const messagesCopy = messages.value.slice(); // 创建原始数组的副本
  const lastMessage = messagesCopy[messagesCopy.length - 1];
  if (!lastMessage) return messagesCopy;
  const updatedLastMessage = {
    ...lastMessage,
    content: countAndCompleteCodeBlocks(lastMessage.content),
  };
  messagesCopy[messagesCopy.length - 1] = updatedLastMessage;
  return messagesCopy;
});

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    if (e.altKey || e.shiftKey) {
      e.preventDefault();
      userMessage.value += "\n";
    } else {
      e.preventDefault();
      sendMessage();
    }
  }
};

const inputRow = ref(1);
</script>

<template>
  <v-container max-width="1000">
    <v-card class="message-container">
      <div v-for="(message, index) in displayMessages" :key="index">
        <v-row
          :class="{
            'justify-end': message.role === 'user',
            'justify-start': message.role !== 'user',
          }">
          <v-col cols="auto">
            <div
              :class="[
                'message-bubble',
                message.role === 'user' ? 'user-bubble' : 'assistant-bubble',
              ]">
              <div v-html="message.content"></div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-card>
    <v-sheet
      elevation="0"
      class="input-panel d-flex align-end pa-1"
      max-width="1200"
      color="transparent">
      <v-btn class="mb-1" variant="elevated" icon @click="">
        <v-icon size="30" class="text-primary" icon="tune"></v-icon>
        <v-tooltip activator="parent" location="top" text="ChatGPT Config"></v-tooltip>
      </v-btn>
      <v-textarea
        class="mx-2"
        color="primary"
        width="680"
        type="text"
        clearable
        variant="solo"
        v-model="userMessage"
        placeholder="Ask Me Anything"
        hide-details
        @keydown="handleKeydown"
        no-resize
        :rows="inputRow"
        :auto-grow="true">
      </v-textarea>
      <v-btn class="mb-1" color="primary" variant="elevated" icon>
        <v-icon @click="sendMessage" icon="send"></v-icon>
      </v-btn>
    </v-sheet>
  </v-container>
</template>

<style scoped lang="scss">
.chat-bot {
  .messsage-area {
    flex: 1;
  }

  .input-area {
    padding: 1rem;

    align-items: center;
    position: absolute;
    width: 100%;
    bottom: 0;

    .input-panel {
      border-radius: 5px;
      max-width: 1200px;
      margin: 0 auto;
    }
  }
}

.user-message {
  background-color: #f6f6fd;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
}

.assitant-message {
  background-color: #fff;
  border-bottom: 1px solid #e5e7eb;
}

.message {
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
}
.message-container {
  min-height: 540px;
  width: 100%;
  overflow-y: auto;
  .message-bubble {
    border: 2px solid #e5e7eb;
    padding: 10px;
    border-radius: 5px;
    margin: 5px;
    min-width: 80px;
    max-width: 80%;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
}
.no-message-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    font-size: 2rem;
    font-weight: 500;
  }
}
</style>
