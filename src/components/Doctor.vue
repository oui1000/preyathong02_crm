<template>
  <v-card color="white" class="rounded-lg mt-2" flat>
    <v-row justify="center" class="pt-2">
      <!-- <v-date-picker
               v-model="picker"
               color="#2784FF"
               width="260"
             ></v-date-picker> -->
    </v-row>

    <v-toolbar color="transparent" flat class="mt-4 mb-6 pl-4 pr-4">
      <h4 class="black--text">พนักงานขาย</h4>
      <v-spacer></v-spacer>
      <v-avatar tile color="#ECF5FF">
        <v-icon color="warning">mdi-comment-processing-outline</v-icon>
      </v-avatar>
    </v-toolbar>
    <v-list
      class="mt-n6"
      color="transparent"
      style="background-color: green"
      dense
    >
      <v-list-item
        v-for="chat in saleman"
        :key="chat.title"
        @click="showChat(chat)"
        :class="{ 'yellow-background': selectedChat === chat || saleman.length === 1 }"
      >
        <v-list-item-avatar tile>
          <v-img :src="chat.img" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
        v-text="chat.title"
        class="black--text"
          ></v-list-item-title>
          <v-list-item-subtitle
        v-text="chat.subtitle"
        class="grey--text"
          ></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useEventStore } from "../stores/eventStore"; //pin store
const useEvent = useEventStore(); //pin store => useEventStore

const selectedChat = ref(null);

const saleman = ref([
  {
    img: "p5.jpg",
    subtitle: "Surgeon",
    title: "Dr.Brett Hoffman",
  },
  {
    img: "p4.jpg",
    subtitle: "Hematologist",
    title: "Dr.Miguel Leonard",
  },
]);

async function getSaleCode() {
  // const titles = Array.from({ length: 30 }, (_, i) => `พนักงานขาย ${String(i + 1).padStart(3, '0')}`);
  // const images = ['p1.png', 'p2.jpg', 'p3.jpg', 'p4.jpg', 'p5.jpg', 'p6.jpg', 'p7.jpg'];
  // return titles.map(title => ({
  //   img: images[Math.floor(Math.random() * images.length)],
  //   subtitle: "พนักงานขาย",
  //   title: title,
  // }));

  saleman.value = await useEvent.fetchSaleCode();

  //return titles;
}

onMounted(async () => {
  await getSaleCode();
});

const showChat = async (chat) => {
  selectedChat.value = chat;
  let salecode = chat.title.toString();

  //alert("showChat "+ salecode);

  try {
    await useEvent.fetchEvents(salecode);
    console.log("Events fetched successfully");
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

const picker = ref(
  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substring(0, 10)
);
</script>

<style>
.yellow-background {
  background-color: yellow !important;
  color: black !important;
}
.v-img {
  border-radius: 50% !important;
  width: 60px;
  height: 60px;
}

.v-list-item-title {
  font-size: 16px;
  color: black !important;
}

.v-list-item-subtitle {
  font-size: 12px;
  color: black !important;
  border-bottom: 1px solid whitesmoke;
}
</style>
