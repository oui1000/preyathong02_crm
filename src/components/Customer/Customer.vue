<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-account-multiple-outline"></v-icon> &nbsp; รายชื่อลูกค้า
      จำนวน {{ useEvent.customerItemsDistinct.length }} รายการ

      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
      ></v-text-field>
    </v-card-title>

    <v-col cols="12" sm="4">
      <v-card color="yellow" class="rounded-lg px-2" flat>
        <v-row>
          <v-col cols="12" sm="12" class="mt-1" bgColor="secondary">
            <v-avatar color="#DFEDFF" tile>
              <v-img :src="useEvent.sale.img" />
            </v-avatar>
          </v-col>
          <v-col cols="12" sm="12">
            <h6 class="white--text">{{ useEvent.sale.title }}</h6>
            <h4 class="white--text">{{ useEvent.sale.subtitle }}</h4>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <v-divider></v-divider>
    <v-data-table
      v-model:search="search"
      :filter-keys="['arname','arcode']"
      :items="useEvent.customerItemsDistinct"
      :items-per-page="25"
      :headers="headers"
    >
      <template v-slot:header.stock>
        <div class="text-end">Stock</div>
      </template>

      <template v-slot:item.arcode="{ item }">
        <v-chip :color="getRandomColor()" class="text-end">
          {{ item.arcode }}
        </v-chip>
      </template>

      <!-- <template v-slot:item.customerid="{ item }">
        <Phone :phoneNumber="item.telephone"></Phone>
      </template> -->

      <!-- <template v-slot:item.image="{ item }">
        <v-card class="my-2" elevation="2" rounded>
          <v-img
            :src="`https://cdn.vuetifyjs.com/docs/images/graphics/gpus/${item.image}`"
            height="64"
            cover
          ></v-img>
        </v-card>
      </template> -->

      <!-- <template v-slot:item.rating="{ item }">
        <v-rating
          :model-value="item.rating"
          color="orange-darken-2"
          density="compact"
          size="small"
          readonly
        ></v-rating>
      </template> -->

      <!-- <template v-slot:item.stock="{ item }">
        <div class="text-end">
          <v-chip
            :color="item.stock ? 'green' : 'red'"
            :text="item.stock ? 'In stock' : 'Out of stock'"
            class="text-uppercase"
            size="small"
            label
          ></v-chip>
        </div>
      </template> -->
    </v-data-table>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useEventStore } from "@/stores/eventStore";
import Phone from "@/components/Customer/Phone.vue";

const useEvent = useEventStore();

const search = ref("");
const headers = ref([
  {
    title: "เบอร์โทร",
    align: "start",
    key: "arcode",
  },
  {
    title: "ชื่อลูกค้า",
    align: "start",
    key: "arname",
  },
  {
    title: "ที่อยู่",
    align: "start",
    key: "araddress",
  },
  // {
  //   title: "เบอร์โทร",
  //   align: "start",
  //   key: "telephone",
  //   sortable: false,
  // },
]);

const getRandomColor = () => {
  const colors = [
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "error",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
</script>
