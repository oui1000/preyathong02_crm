
<template>

  <v-row class="mb-4" align="center">
    <v-col cols="8" sm="6" md="4">
      <v-text-field
        v-model="phone"
        label="ค้นหาตามเบอร์โทรลูกค้า"
        prepend-inner-icon="mdi-phone"
        clearable
      />
    </v-col>
    <v-col cols="4" sm="2" md="2">
      <v-btn color="danger" @click="searchByPhone">
        ค้นหา
      </v-btn>
    </v-col>
  </v-row>

  <v-row class="mb-4" align="center">
    <v-col cols="8" sm="6" md="4">
      <v-text-field
        v-model="trackingNumber"
        label="ค้นหาตามเลขที่ขนส่ง"
        prepend-inner-icon="mdi-truck"
        clearable
      />
    </v-col>
    <v-col cols="4" sm="2" md="2">
      <v-btn color="danger" @click="searchByTrackingNumber">
        ค้นหา
      </v-btn>
    </v-col>

     <v-col cols="12" sm="4">
          <v-card color="yellow" class="rounded-lg px-2" flat>
            <v-row>
              <v-col cols="12" sm="12" class="mt-1" bgColor="secondary">
                <v-avatar color="#DFEDFF" tile>
                  <v-img :src="eventStore.sale.img" />
                </v-avatar>
              </v-col>
              <v-col cols="12" sm="12">
                <h6 class="white--text">{{ eventStore.sale.title }}</h6>
                <h4 class="white--text">{{ eventStore.sale.subtitle }}</h4>
              </v-col>
            </v-row>
          </v-card>
      </v-col>
  </v-row>

   <v-data-table
      v-model:search="search"
       :headers="headers"
      :items="saleOrderStore.LogOrders"
      :items-per-page="100"
      hide-default-footer

    >
      <template v-slot:header.stock>
        <div class="text-end">Stock</div>
      </template>

       <template v-slot:item.deliveryno="{ item }">
          <v-chip :color=primary class="text-start">

             <router-link :to="`/order_status/${item.deliveryno }`"
                class="rounded-lg px-2"
                style="color: primary; text-decoration: none;"
            >
              {{ item.deliveryno }}
            </router-link>



          </v-chip>
        </template>

       <template v-slot:item.deliverydate="{ item }">
        <v-chip :color="blue" class="text-start">
          {{ item.deliverydate }}
        </v-chip>
      </template>




      <template v-slot:item.laststatus="{ item }">
        <v-chip :color="red" class="text-start">
          {{ item.laststatus }}
        </v-chip>
      </template>

        <template v-slot:item.arcode="{ item }">
             <Phone :phoneNumber="item.arcode"></Phone>
      </template>



    </v-data-table>


</template>

<script setup>

/*
https://vuetifyjs.com/en/components/timelines/#alignment
*/

import { useEventStore } from '@/stores/eventStore';
import { useSaleOrderStore } from '@/stores/saleOrderStore';
import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
import { pink } from 'vuetify/util/colors';
import Phone from '@/components/Customer/Phone.vue';

  const router = useRouter();

const saleOrderStore = useSaleOrderStore();

const eventStore = useEventStore();

const phone = ref('');
const trackingNumber = ref('');

let salecode = eventStore.sale.title;

watch(
  () => eventStore.sale.title,
  async (newVal, oldVal) => {
    salecode = newVal;
    if (salecode) {
      await saleOrderStore.fetchCustomerOrdersBySalecode(salecode);
    }
  }
);

const headers =  ref([
        {
          title: 'เลขขนส่ง',
          align: 'start',
          key: 'deliveryno',
        },
        {
          title: 'วันที่ส่งสินค้า',
          align: 'start',
          key: 'deliverydate',
        },
        {
          title: 'สถานะ',
          align: 'start',
          key: 'laststatus',
        },
        {
          title: 'ชื่อ-นามสกุล',
          align: 'start',
          key: 'arname',
        },
         {
          title: 'เบอร์โทรลูกค้า',
          align: 'start',
          key: 'arcode',
        },
          {
          title: 'พนักงานขาย',
          align: 'start',
          key: 'salename',
        },


      ]);

  onMounted(async () => {
    // Fetch initial data if needed


    if(salecode== null || salecode === undefined || salecode === '') {
     alert("กรุณาเลือกพนักงานขายก่อน");
      return;
    }

    //alert("salecode => " + salecode);

    await saleOrderStore.fetchCustomerOrdersBySalecode(salecode); // Fetch all orders initially
  });

const searchByPhone = async () => {
  // Implement search logic by phone number
  console.log(`Searching for orders with phone: ${phone.value}`);

   await saleOrderStore.fetchCustomerOrdersByPhone(phone.value);
};

const searchByTrackingNumber = async () => {
  // Implement search logic by tracking number
  console.log(`Searching for orders with tracking number: ${trackingNumber.value}`);

// Navigate to the order status page for the given tracking number
if (trackingNumber.value) {
  // Use Vue Router to navigate
  // Assumes you are using <script setup> and have access to useRouter

  router.push(`/order_status/${trackingNumber.value}`);
}

};

</script>
