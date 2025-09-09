<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">

      <v-row>
        <v-col cols="12" sm="8" class="d-flex align-center">
              <v-icon icon="mdi-cart-outline"></v-icon> &nbsp; {{PageLabel}} {{saleComStore.selectedDate }}
            </v-col>
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



     <v-row>
       <v-col cols="12" md="4" xl="2">
          <v-btn color="success" style="width:160px; padding: 15px; height: 45px; border-radius: 5;"
           @click="$router.back()"
          >
            <v-icon left>mdi-arrow-left</v-icon>Back
          </v-btn>
        </v-col>
    </v-row>

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

  <v-col cols="12" class="d-flex justify-end my-2">
    <v-chip color="success" style="font-weight: bold; font-size: 1.1rem;">
      รวมยอดขาย:
      {{
        (
          hideBydateTable
            ? saleComStore.commsionItemsUpsaleByDate
            : saleComStore.commsionItemsByDate
        )
          .filter(item => Number(item.totalamount) > 0)
          .reduce((sum, item) => sum + (Number(item.totalamount) || 0), 0)
          .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      }}
    </v-chip>
  </v-col>

  <v-col cols="12" class="d-flex justify-end my-2">
    <v-chip color="error" style="font-weight: bold; font-size: 1.1rem;">
      รวมยอดลดหนี้:
      {{
        (
          hideBydateTable
            ? saleComStore.commsionItemsUpsaleByDate
            : saleComStore.commsionItemsByDate
        )
          .filter(item => Number(item.totalamount) < 0)
          .reduce((sum, item) => sum + (Number(item.totalamount) || 0), 0)
          .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      }}
    </v-chip>
  </v-col>

  <v-col cols="12" class="d-flex justify-end my-2">
    <v-chip color="primary" style="font-weight: bold; font-size: 1.1rem;">
      รวมขายหักลดหนี้:
      {{
        (hideBydateTable
          ? saleComStore.commsionItemsUpsaleByDate
          : saleComStore.commsionItemsByDate
        ).reduce((sum, item) => sum + (Number(item.totalamount) || 0), 0)
        .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      }}
    </v-chip>
  </v-col>



    <v-divider></v-divider>





    <v-data-table
      v-if="!hideBydateTable"
      v-model:search="search"
      :items="saleComStore.commsionItemsByDate"
      :items-per-page="25"
      :headers="headers"

    >
      <template v-slot:header.stock>
        <div class="text-end">Stock</div>
      </template>


      <!-- <template v-slot:item.amount="{ item }">
        <div class="text-end">{{ item.amount > 0 ? new Intl.NumberFormat().format(item.amount) : '' }}</div>
      </template> -->



      <template v-slot:item.thaidate="{ item }">
         {{ item.thaidate}}
      </template>


      <template v-slot:item.totalamount="{ item }">
        <v-chip
          :color="item.totalamount > 0 ? 'green' : (item.totalamount < 0 ? 'red' : 'white')"
          class="text-end"
          style="font-weight: bold;"
        >
            {{ item.totalamount !== null && item.totalamount !== undefined
            ? Number(item.totalamount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            : '' }}
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


    <v-data-table
      v-if="!hideUpsaleTable"
      v-model:search="search"
      :items="saleComStore.commsionItemsUpsaleByDate"
      :items-per-page="25"
      :headers="headersUpsale"
    >
      <template v-slot:header.stock>
        <div class="text-end">Stock</div>
      </template>

      <template v-slot:item.thaidate="{ item }">
        {{ item.thaidate}}
      </template>

       <template v-slot:item.totalamount="{ item }">
        <v-chip :color="item.totalamount > 0 ? 'red' : 'white'" class="text-end" style="font-weight: bold;">
          {{ item.totalamount > 0 ? new Intl.NumberFormat().format(item.totalamount) : '' }}
        </v-chip>
      </template>

      <template v-slot:item.upsalecom="{ item }">
        <v-chip :color="item.upsalecom > 0 ? 'red' : 'white'" class="text-end" style="font-weight: bold;">
          {{ item.upsalecom > 0 ? new Intl.NumberFormat().format(item.upsalecom) : '' }}
        </v-chip>
      </template>
    </v-data-table>

  </v-card>
</template>

<script setup>

  import { ref } from 'vue';
  import { defineProps } from 'vue';
  import { useEventStore } from '@/stores/eventStore';
  import { useRouter } from 'vue-router';

  import { useSaleComStore } from '@/stores/saleComStore';

import { getThaiMonth, getLast5years,getCurrentMonth } from '@/utils/dateUtility';

import { onMounted } from 'vue';

const saleComStore = useSaleComStore();

const props = defineProps({
 rowid: {
   type: String,
   default: '',
 },

});

let hideUpsaleTable = ref(false);
hideUpsaleTable.value = props.rowid.includes('upsale') ? true : false;

let hideBydateTable = ref(false);
hideBydateTable.value = props.rowid.includes('bydate') ? true : false;

const PageLabel = ref('SaleCom Detail Daily');

onMounted(async () => {

  //console.log('Component has been mounted');

   let objRowid = props.rowid;
  console.log('props.rowid', props.rowid);
  console.log('objRowid', objRowid);

//<router-link :to="`/salecom/${item.rowid +'@@bydate'}`"

  let  rowid = objRowid.split('@@')[0];
  let xtype = objRowid.split('@@')[1];


  if(xtype=='bydate'){
      saleComStore.fetchSaleComDetailByDate(rowid);
      PageLabel.value = 'บิลขายวันที่';
      hideBydateTable.value = false;
      hideUpsaleTable.value = true;
  }else{
      saleComStore.fetchSaleComUpsaleByDate(rowid);
      PageLabel.value = 'Upsale วันที่';
      hideUpsaleTable.value = false;
      hideBydateTable.value = true;
  }

  //await useEvent.fetchSaleManOrders();

});

const routeToNewSaleOrder = () => {
    const router = useRouter();
    router.push('/new_sale_order');
  };

const headers =  ref([
        {
              title: 'dbname',
                  align: 'center',
                  key: 'dbname',
        },
        {
          title: 'วันที่ใบสั่งขาย',
          align: 'start',
          key: 'thaidate',
        },
        {
          title: 'เลขที่ขนส่ง',
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
          key: 'totalamount',
        },

      ]);

      const headersUpsale =  ref([
         {
              title: 'dbname',
                  align: 'center',
                  key: 'dbname',
        },
        {
          title: 'วันที่ใบสั่งขาย',
          align: 'start',
          key: 'thaidate',
        },
        {
          title: 'เลขที่ใบสั่งขาย',
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
          title: 'ยอดเดิม',
          align: 'start',
          key: 'old_remark',
        },
        {
          title: 'ยอดใหม่',
          align: 'start',
          key: 'remark',
        },
        {
          title: 'จำนวนเงิน Upsale',
          align: 'end',
          key: 'totalamount',
        },
         {
          title: 'ค่าคอม Upsale',
          align: 'end',
          key: 'upsalecom',
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

