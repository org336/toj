import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Email } from "./emailTypes";
import { inboxList, starredList } from "./emailData";

export const useEmailStore = defineStore("email", () => {
  const inbox = ref(inboxList);
  const starred = ref(starredList);
  const currentLabel = ref("work");
  const labels = ref([
    {
      id: "work",
      title: "Work",
      color: "primary",
    },
    {
      id: "relaxation",
      title: "Relaxation",
      color: "green",
    },
    {
      id: "shopping",
      title: "Shopping",
      color: "teal",
    },
  ]);

  const getInboxList = computed(() => inbox.value);
  const getStarredList = computed(() => starred.value);

  function addNewEmail(todo: Email) {
    const newEmail = {
      id: "_" + Math.random().toString(36).substring(2, 11),
      ...todo,
    };
    inbox.value.push(newEmail);
  }

  function updateEmail(todo: Email) {
    const index = inbox.value.findIndex((item: Email) => item.id === todo.id);
    inbox.value.splice(index, 1, todo);
  }

  function deleteEmailById(todoId: number) {
    const index = inbox.value.findIndex((todo: Email) => todo.id === todoId);
    inbox.value.splice(index, 1);
  }

  return {
    inbox,
    starred,
    currentLabel,
    labels,
    getInboxList,
    getStarredList,
    addNewEmail,
    updateEmail,
    deleteEmailById,
  };
});
