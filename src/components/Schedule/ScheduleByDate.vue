<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">



      <v-row>
        <v-col cols="12" sm="4">
          <v-icon icon="mdi-chart-line"></v-icon> &nbsp;
          สรุปจำนวนนัดมหมายตามวันที่
          <v-spacer></v-spacer>
        </v-col>

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
      <v-col cols="12" sm="4">

      </v-col>
      </v-row>




    </v-card-title>

    <v-row>
        <v-col cols="12" sm="6" md="6" lg="3">
            <v-date-input
            label="จากวันที่"
            v-model="fromdate"
            @update:modelValue="onFromDateChange"
            class="requierd-text"
          >
          </v-date-input>
        </v-col>
       <v-col cols="12" sm="6" md="6" lg="3">
           <v-date-input
            label="ถึงวันที่"
            v-model="todate"
            @update:modelValue="onToDateChange"
            class="requierd-text ms-2"
          >
          </v-date-input>
        </v-col>
      </v-row>

    <v-divider></v-divider>

    <v-data-table
      v-model:search="search"
       :headers="headers"
      :items="useSchedule.appointmentItems"
      :items-per-page="100"
      hide-default-footer

    >
      <template v-slot:header.stock>
        <div class="text-end">Stock</div>
      </template>

       <template v-slot:item.docdate="{ item }">
          <v-chip :color=primary class="text-start">

             <router-link :to="`/schedule/${item.docdate2 +'@@bydate'}`"
                class="rounded-lg px-2"
                style="color: primary; text-decoration: none;"
            >
              {{ item.docdate }}
            </router-link>



          </v-chip>
        </template>


      <template v-slot:item.amount="{ item }">


           <router-link :to="`/schedule/${item.rowid +'@@bydate'}`"
                class="rounded-lg px-2"
                style="color: primary; text-decoration: none;"
            >
              <div class="text-end">{{ item.amount > 0 ? new Intl.NumberFormat().format(item.amount) : '' }}</div>
            </router-link>


      </template>

      <template v-slot:item.daycompercentage="{ item }">
        <v-chip :color="item.daycompercentage > 0 ? 'green' : 'white'" class="text-end">
          {{ item.daycompercentage > 0 ? new Intl.NumberFormat().format(item.daycompercentage) + '%' : '' }}
        </v-chip>
      </template>

      <template v-slot:item.daycomamount="{ item }">
        <!-- <div class="text-end">{{ item.daycomamount > 0 ? new Intl.NumberFormat().format(item.daycomamount) : '' }}</div> -->
          <v-chip :color="item.daycomamount > 0 ? 'green' : 'white'" class="text-end">
          {{ item.daycomamount > 0 ? new Intl.NumberFormat().format(item.daycomamount)  : '' }}
        </v-chip>


      </template>

        <template v-slot:item.cnamount="{ item }">
         <v-chip :color="item.cnamount > 0 ? 'red' : 'white'" class="text-end">
          {{ item.cnamount > 0 ? new Intl.NumberFormat().format(item.cnamount) : '' }}
        </v-chip>
      </template>

       <template v-slot:item.daycomcnamount="{ item }">
         <v-chip :color="item.daycomcnamount > 0 ? 'red' : 'white'" class="text-end">
          {{ item.daycomcnamount > 0 ? new Intl.NumberFormat().format(item.daycomcnamount) : '' }}
        </v-chip>
      </template>

      <template v-slot:item.daybonus="{ item }">
        <div class="text-end">{{ item.daybonus > 0 ? new Intl.NumberFormat().format(item.daybonus) : '' }}</div>
      </template>

      <template v-slot:item.sumdaycom="{ item }">
        <v-chip :color="item.sumdaycom > 0 ? 'blue' : 'white'" class="text-end">
          {{ item.sumdaycom > 0 ? new Intl.NumberFormat().format(item.sumdaycom) : '' }}
        </v-chip>
      </template>



      <template v-slot:item.upschedule="{ item }">
          <router-link :to="`/schedule/${item.rowid +'@@upsale'}`"


                class="rounded-lg px-2"
                style="color: primary; text-decoration: none;"
            >
             <!-- <div class="text-end">{{ item.upschedule > 0 ? new Intl.NumberFormat().format(item.upschedule) : '' }}</div> -->
            <v-chip :color="item.upschedule > 0 ? 'green' : 'white'" class="text-end">
              {{ item.upschedule > 0 ? new Intl.NumberFormat().format(item.upschedule) : '' }}
            </v-chip>

            </router-link>

      </template>

      <template v-slot:item.monthcomamount="{ item }">
        <v-chip :color="item.monthcomamount > 0 ? getRandomColor() : 'white'" class="text-end">
          {{ item.monthcomamount > 0 ? new Intl.NumberFormat().format(item.monthcomamount) : '' }}
        </v-chip>
      </template>

      <!-- <template v-slot:item.sumcomamount="{ item }">
        <v-chip :color="item.sumcomamount > 0 ? 'red' : 'white'" class="text-end">
          {{ item.sumcomamount > 0 ? new Intl.NumberFormat().format(item.sumcomamount) : '' }}
        </v-chip>
      </template> -->

      <template v-slot:item.sumcomamount="{ item }">
        <v-chip :color="item.sumcomamount > 0 ? 'red' : 'white'" class="text-end" style="font-weight: bold;">
          {{ item.sumcomamount > 0 ? new Intl.NumberFormat().format(item.sumcomamount) : '' }}
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

import { ref , watch ,onMounted } from 'vue';
import { useEventStore } from '@/stores/eventStore';
import {useScheduleStore} from '@/stores/scheduleStore';
import { getThaiMonth, getLast5years,getCurrentMonth } from '@/utils/dateUtility';

const headers =  ref([
        {
          title: 'วันที่เอกสาร',
          align: 'start',
          key: 'docdate',
        },
        {
          title: 'จำนวนนัดทั้งหมด',
          align: 'end',
          key: 'all_count',
        },
        {
          title: 'จำนวนโทรแล้ว',
          align: 'end',
          key: 'call_count',
        },
        {
          title: 'จำนวนยังไม่ได้โทร',
          align: 'end',
          key: 'no_call_count',
        },


      ]);

let month_item = getThaiMonth();
let years_item = getLast5years();

const months = ref(month_item);
const years = ref(years_item);

// console.log(months.value);
// console.log(years.value);

let myCuurentMonth = getCurrentMonth();
let selectedMonth = ref(myCuurentMonth);
let selectedYear = ref(null); //current year

const useEvent = useEventStore();
const useSchedule = useScheduleStore();
const search = ref('');

const fromdate = ref(new Date(useSchedule.fromdate))
const todate  = ref(new Date(useSchedule.todate));

  onMounted(async () => {
      useSchedule.sale = useEvent.sale;

      console.log('useSchedule.sale', useSchedule.sale);
      //useSchedule.commsionItems = useEvent.commsionItems;
  });

  watch(() => useEvent.sale, (newValue) => {
    useSchedule.sale = newValue;
    console.log('useSchedule.sale updated', useSchedule.sale);
     useSchedule.handleTodateChange();
  });

  const onFromDateChange = (date) => {
    useSchedule.fromdate = date;
    console.log('onFromDateChange', useSchedule.fromdate);
    useSchedule.handleFromdateChange();
  };

  const onToDateChange = (date) => {
    useSchedule.todate = date;
    console.log('onToDateChange', useSchedule.todate);
    useSchedule.handleTodateChange();
  };

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
    cnamount money default 0,
		daycompercentage money default 0,
		daycomamount money default 0,
    daycomcnamount money default 0,
		daybonus money default 0,
		sumdaycom money default 0,
		monthamount money default 0,
		monthcomamount money default 0,
		sumcomamount money default 0
  */

</script>

