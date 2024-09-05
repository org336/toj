import { defineStore } from "pinia";
import { ref } from "vue";
interface ChatGPTStore {
  token: string;
  prompt: string;
  model: string;
  endpoint: string;
}
export const useChatGPTStore = defineStore("chatGPT", () => {
  const config = ref<ChatGPTStore>({
    token: import.meta.env.VITE_GITHUB_TOKEN,
    prompt: "",
    model: "gpt-4o-mini",
    endpoint: "https://models.inference.ai.azure.com",
  });

  return {
    config,
  };
});
