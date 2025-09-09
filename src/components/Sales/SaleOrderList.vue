<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">

      <v-row>
        <v-col cols="12" sm="8" class="d-flex align-center">
            <v-icon icon="mdi-cart-outline"></v-icon> &nbsp; ใบสั่งขาย 200 ใบล่าสุด</v-col>
         <v-col>
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
         </v-col>
      </v-row>


      <!-- <v-spacer></v-spacer> -->


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

    <v-col>
      <!-- <button @click="routeToNewSaleOrder" color="primary" class="rounded-lg px-2" flat>
        + New
      </button> -->

      <router-link to="/new_sale_order" class="rounded-lg px-2" style="color: primary; text-decoration: none;">
   <v-btn color="success" style="width:160px; padding: 10px; height: 45px; border-radius: 5; font-weight: 400;">
            <v-icon left>mdi-plus</v-icon> New Order
          </v-btn>
</router-link>

    </v-col>

    <v-divider></v-divider>






    <v-data-table
      v-model:search="search"
      :items="useEvent.salemanOrders"
      :items-per-page="25"
      :headers="headers"

    >
      <template v-slot:header.stock>
        <div class="text-end">Stock</div>
      </template>


      <template v-slot:item.amount="{ item }">
        <div class="text-end">{{ item.amount > 0 ? new Intl.NumberFormat().format(item.amount) : '' }}</div>
      </template>

      <template v-slot:item.daycompercentage="{ item }">
        <v-chip :color="item.daycompercentage > 0 ? getRandomColor() : 'white'" class="text-end">
          {{ item.daycompercentage > 0 ? new Intl.NumberFormat().format(item.daycompercentage) + '%' : '' }}
        </v-chip>
      </template>



      <template v-slot:item.thaidate="{ item }">
        <v-chip :color=getRandomColor() class="text-end">
          {{ item.thaidate}}
        </v-chip>
      </template>


      <template v-slot:item.netdebtamount="{ item }">
        <v-chip :color="item.netdebtamount > 0 ? 'red' : 'white'" class="text-end" style="font-weight: bold;">
          {{ item.netdebtamount > 0 ? new Intl.NumberFormat().format(item.netdebtamount) : '' }}
        </v-chip>
      </template>

      <!-- <template v-slot:item.remark="{ item }">
        <div :class="item.remark === 'รวม' ? 'font-bold' : ''">{{ item.remark }}</div>
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
          :model-value="item.amount"
          color="orange-darken-2"
          density="compact"
          size="small"
          readonly
        ></v-rating>
      </template>

      <template v-slot:item.stock="{ item }">
        <div class="text-end">
          <v-chip
            :color="item.stock ? 'green' : 'red'"
            :text="item.stock ? 'In stock' : 'Out of stock'"
            class="text-uppercase"
            size="small"
            label
          ></v-chip>
        </div>
      </template>

      <template v-slot:no-data>
        <v-alert type="info" class="mx-4">
          No data available
        </v-alert>
      </template> -->

    </v-data-table>
  </v-card>
</template>

<script setup>

  import { ref } from 'vue';
  import { useEventStore } from '@/stores/eventStore';
  import { useRouter } from 'vue-router';

import { getThaiMonth, getLast5years,getCurrentMonth } from '@/utils/dateUtility';

import { onMounted } from 'vue';

onMounted(async () => {

  console.log('Component has been mounted');

  await useEvent.fetchSaleManOrders();

});

const routeToNewSaleOrder = () => {
    const router = useRouter();
    router.push('/new_sale_order');
  };

const headers =  ref([
        {
          title: 'วันที่สั่งขาย',
          align: 'start',
          key: 'thaidate',
        },
        {
          title: 'เลขที่สั่งขาย',
          align: 'start',
          key: 'docno',
        },
        {
          title: 'รหัสลูกค้า',
          align: 'start',
          key: 'arcode',
        },
        {
          title: 'ชื่อลูกค้า',
          align: 'start',
          key: 'arname',
        },
        {
          title: 'หมายเหตุ',
          align: 'start',
          key: 'remark',
        },
        {
          title: 'จำนวนเงิน',
          align: 'end',
          key: 'netdebtamount',
        },

      ]);

let month_item = getThaiMonth();
let years_item = getLast5years();

const months = ref(month_item);
const years = ref(years_item);

console.log(months.value);
console.log(years.value);

let myCuurentMonth = getCurrentMonth();

console.log(myCuurentMonth);

let selectedMonth = ref(myCuurentMonth);

//let selectedMonth = ref(getCurrentMonth);
let selectedYear = ref(null); //current year

  const useEvent = useEventStore();

  const search = ref('');

  const getRandomColor = () => {
    const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleChangeMonth = async () => {

    console.log('selectedMonth.value', selectedMonth.value);
    console.log('selectedYear.value', selectedYear.value);

    setTimeout(async() => {
      await useEvent.handleXmonthChange(selectedMonth.value,selectedYear.value);
    }, 1000);
  };

  const handleChangeYear = async () => {
    console.log('selectedMonth.value', selectedMonth.value);
    console.log('selectedYear.value', selectedYear.value);

    setTimeout(async() => {
      await useEvent.handleXyearChange(selectedMonth.value,selectedYear.value);
    }, 1000);
  };

  /*
  fields for items_commission

  rowid int identity(1,1),
		salecode varchar(30),
		salename varchar(200),
		docdate varchar(30),
		remark varchar(100),
		amount money default 0,
		daycompercentage money default 0,
		daycomamount money default 0,
		daybonus money default 0,
		sumdaycom money default 0,
		monthamount money default 0,
		monthcomamount money default 0,
		sumcomamount money default 0
  */

</script>

<style scoped>
button {
  background-color: #4CAF50;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: dashed;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  width: 120px;
}
</style>

