<script setup lang="ts">
import { ref } from "vue";

const msgDialog = ref(false);
const searchMate = ref("");
const mateData = ref([
  {
    uid: 1,
    avatar: "https://example.com/avatar1.jpg",
    realName: "John Doe",
  },
  {
    uid: 2,
    avatar: "https://example.com/avatar2.jpg",
    realName: "Jane Smith",
  },
  {
    uid: 3,
    avatar: "https://example.com/avatar3.jpg",
    realName: "Alice Johnson",
  },
  {
    uid: 4,
    avatar: "https://example.com/avatar4.jpg",
    realName: "Bob Brown",
  },
  {
    uid: 5,
    avatar: "https://example.com/avatar5.jpg",
    realName: "Charlie Davis",
  },
]);
const message = ref({
  receiver_name: "",
  receiver_uid: "",
  title: "",
  content: "",
});
const resetMessage = () => {
  message.value = {
    receiver_name: "",
    receiver_uid: "",
    title: "",
    content: "",
  };
}
const sendMessage = () => {
  console.log(message.value);
  resetMessage()
  closeDialog();
};
const closeDialog = () => {
  msgDialog.value = false;
  resetMessage()
};
function openDialog(uid, name) {
  message.value.receiver_uid = uid;
  message.value.receiver_name = name;
  msgDialog.value = true;
}
</script>
<template>
  <v-card>
    <v-text-field
      density="compact"
      v-model="searchMate"
      label="Search Mate"
      hide-details
      variant="outlined"
      color="primary"></v-text-field>
    <v-card-text>
      <v-dialog v-model="msgDialog" max-width="500">
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props" flat>
            <v-icon icon="chat"></v-icon>Send Message
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="pa-4 bg-secondary">
            <span class="title text-white">Send Message</span>
          </v-card-title>

          <v-card-text>
            <v-form class="mt-5" ref="form" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    variant="outlined"
                    color="primary"
                    density="compact"
                    v-model="message.receiver_name"
                    label="Receiver"
                    required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    variant="outlined"
                    color="primary"
                    density="compact"
                    v-model="message.title"
                    label="Title"
                    required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    variant="outlined"
                    color="primary"
                    density="compact"
                    v-model="message.content"
                    label="Content"
                    rows="5"
                    required></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="pa-4">
            <v-spacer></v-spacer>
            <v-btn color="error" @click="closeDialog">Cancel</v-btn>
            <v-btn
              color="secondary"
              :disabled="!message.title || !message.content"
              variant="flat"
              @click="sendMessage"
              >Send</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-text>
  </v-card>

  <v-card class="mt-2">
    <v-card-title> ClassMate List </v-card-title>
    <v-list class="">
      <v-list-item
        v-for="{ uid, avatar, realName } in mateData"
        :key="uid"
        :index="uid"
        :value="realName">
        <template v-slot:prepend>
          <v-avatar size="40">
            <v-img :src="avatar" />
          </v-avatar>
        </template>
        <v-list-item-title class="font-weight-bold" v-text="realName"> </v-list-item-title>
        <template v-slot:append>
          <v-btn color="primary" icon variant="text" @click="openDialog(uid, realName)">
            <v-icon icon="chat"></v-icon>
          </v-btn>
        </template>
      </v-list-item>
    </v-list>
    <v-card-actions> </v-card-actions>
  </v-card>
</template>
