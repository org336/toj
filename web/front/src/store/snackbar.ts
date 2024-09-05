import { defineStore } from "pinia";
import { ref } from "vue";

type MessageType = "" | "info" | "success" | "error" | "warning";

export const useSnackbarStore = defineStore("snackbarStore", () => {
  const isShow = ref(false);
  const message = ref("");
  const type = ref<MessageType>("info");

  function show(newMessage: string, newType: MessageType = "info") {
    message.value = newMessage;
    type.value = newType;
    isShow.value = true;
  }

  function close() {
    isShow.value = false;
  }

  return {
    isShow,
    message,
    type,
    show,
    close,
  };
});
