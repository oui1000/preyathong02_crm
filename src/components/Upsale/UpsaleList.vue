<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-cart-outline"></v-icon> &nbsp; Upsale
      จำนวน {{ useUpsale.upSaleOrders.length }} รายการ

      <v-spacer></v-spacer>

    </v-card-title>

    <v-row>
          <v-col cols="12" sm="4">
            <v-card color="yellow" class="rounded-lg px-2" flat>
              <v-row>
                <v-col cols="12" sm="12" class="mt-1" bgColor="secondary">
                  <v-avatar color="#DFEDFF" tile>
                    <v-img :src="useEvent.sale.img" />
                  </v-avatar>
                </v-col>
                <v-col cols="12" sm="12">
                  <h6 class="white--text"

                  >{{ useEvent.sale.title }}</h6>
                  <h4 class="white--text">{{ useEvent.sale.subtitle }}</h4>
                </v-col>
              </v-row>
            </v-card>
        </v-col>
    </v-row>


      <v-row>
        <v-col cols="12" sm="12" md="6" lg="4">
            <v-date-input
            label="วันที่บิลขาย"
            v-model="upSaleDate"
            @update:modelValue="onDateChange"
          >
          </v-date-input>
        </v-col>
      </v-row>

    <v-row>
      <v-col cols="12" sm="12" md="6" lg="6">
           <button @click="handleChangeDonTel" class="button">
          <v-icon>mdi-check</v-icon><br>
          โทรแล้ว จำนวน {{ useUpsale.countBillTel }} รายการ
        </button>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="6">
              <button @click="handleChangeCompleteUpsale" class="button2">
          <v-icon>mdi-check</v-icon><br>
          Upsale Complete จำนวน {{ useUpsale.countUpsaleComplete }} รายการ
        </button>
      </v-col>
    </v-row>



    <v-divider></v-divider>



    <v-data-table
      v-model:search="search"
      :items="useUpsale.upSaleOrders"
      :items-per-page="25"
      :headers="headers"

    >
      <!-- <template v-slot:header.stock>
        <div class="text-end">Stock</div>
      </template> -->

      <!-- <template v-slot:header.is_selected>
        <div class="text-center">

         <v-checkbox
            v-model="useUpsale.selectedAll"
            @change="useUpsale.toggleSelectAll"
            color="primary"
            hide-details
          ></v-checkbox>

        </div>
      </template>

      <template v-slot:item.is_selected="{ item }">
        <div class="text-center">
          <v-checkbox
            v-model="item.is_selected"
            @change="useUpsale.toggleSelect(item)"
            color="primary"
            hide-details
          ></v-checkbox>
        </div>
      </template> -->

       <template v-slot:header.is_tel_status>
        <div class="text-start">
           โทรแล้ว
          <v-checkbox
            v-model="useUpsale.select_tel_status_all"
            @change="handleSelectAllTelStatus"
            color="primary"

          ></v-checkbox>

        </div>
      </template>

        <template v-slot:item.is_tel_status="{ item }">
           <div class="text-center">
            <v-checkbox
              v-model="item.is_tel_status"
              @change="handleToggleSelectTelStatus(item)"
              color="primary"
              hide-details

            >
              <!-- <v-chip
                :color="item.is_tel_status === 1 ? 'green' : 'red'"
                :text="item.is_tel_status === 1 ? 'Yes' : 'No'"
                class="text-uppercase"
                size="small"
                label
                style="font-weight: bold;"
            ></v-chip> -->
          </v-checkbox>


          </div>
        <!-- <div class="text-center">
          <v-chip
            :color="item.is_tel_status === 1 ? 'green' : 'red'"
            :text="item.is_tel_status === 1 ? 'Yes' : 'No'"
            class="text-uppercase"
            size="small"
            label
            style="font-weight: bold;"
          ></v-chip>
        </div> -->
      </template>

        <template v-slot:header.is_upsale_status>
        <div class="text-start">
           Upsale Complete
          <v-checkbox
            v-model="useUpsale.select_upsale_status_all"
            @change="handleSelectAllUpsaleStatus"
            color="primary"

          ></v-checkbox>

        </div>
      </template>

       <template v-slot:item.is_upsale_status="{ item }">
        <div class="text-center">
          <v-checkbox
            v-model="item.is_upsale_status"
            @change="handleToggleSelectUpsaleStatus(item)"
            color="primary"
            hide-details
          ></v-checkbox>
          <!-- <v-chip
            :color="item.is_upsale_status === 1 ? 'green' : 'red'"
            :text="item.is_upsale_status === 1 ? 'Yes' : 'No'"
            class="text-uppercase"
            size="small"
            label
            style="font-weight: bold;"
          ></v-chip> -->
        </div>
      </template>


      <!-- <template v-slot:item.totalamount="{ item }">
        <div class="text-end">{{ item.totalamount > 0 ? new Intl.NumberFormat().format(item.totalamount) : '' }}</div>
      </template>

      <template v-slot:item.daycompercentage="{ item }">
        <v-chip :color="item.daycompercentage > 0 ? getRandomColor() : 'white'" class="text-end">
          {{ item.daycompercentage > 0 ? new Intl.NumberFormat().format(item.daycompercentage) + '%' : '' }}
        </v-chip>
      </template> -->

       <template v-slot:item.totalamount="{ item }">
        <v-chip :color="item.totalamount > 0 ? 'red' : 'white'" class="text-end" style="font-weight: bold;">
          {{ item.totalamount > 0 ? new Intl.NumberFormat().format(item.totalamount) : '' }}
        </v-chip>
      </template>

      <!-- :to="`/edit_sale_order/${item.docno}`" -->

        <template v-slot:item.docno="{ item }">
          <v-chip :color=primary class="text-end">

            <router-link :to="`/saleorders/${item.docno + '@@' + item.databasename}`"
                class="rounded-lg px-2"
                style="color: primary; text-decoration: none;"
            >
              {{ item.docno }}
            </router-link>

                <!-- <router-link
                v-if="item.docno"
                :to="{
                  name: 'edit_sale_order',
                  params: {
                    id: item.docno
                  }}"
                class="rounded-lg px-2"
                style="color: primary; text-decoration: none;"
                >
                {{ item.docno }}
                </router-link> -->

          </v-chip>
        </template>

        <template v-slot:item.arcode="{ item }">
             <Phone :phoneNumber="item.arcode"></Phone>
        </template>



      <template v-slot:item.thaidate="{ item }">
        <v-chip :color='red' class="text-end">
          {{ item.thaidate }}
        </v-chip>
      </template>




      <!-- <template v-slot:item.netdebtamount="{ item }">
        <v-chip :color="item.netdebtamount > 0 ? 'red' : 'white'" class="text-end" style="font-weight: bold;">
          {{ item.netdebtamount > 0 ? new Intl.NumberFormat().format(item.netdebtamount) : '' }}
        </v-chip>
      </template> -->

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

   <v-dialog
      v-model="showErrorModalDialog"
       min-width="250"
       max-width="600"
    >
      <v-card title="Error" color="red">
        <template v-slot:text>
            <h4>
              {{ useUpsale.modalText }}
            </h4>
        </template>

        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn

            class="my-2"
            text="OK"
            width="120"
            @click="handleSplitAddress"
          ></v-btn> -->
          <v-btn
            text="Close"
            variant="text"
            @click="showErrorModalDialog = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

     <v-dialog
      v-model="showCompleteModalDialog"
       min-width="250"
       max-width="600"
    >
      <v-card title="complete" color="green">
        <template v-slot:text>
            <h4>
              {{ useUpsale.modalTitle }}
            </h4>
        </template>

        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn

            class="my-2"
            text="OK"
            width="120"
            @click="handleSplitAddress"
          ></v-btn> -->
          <v-btn
            text="Close"
            variant="text"
            @click="showCompleteModalDialog = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>

<script setup>

  import { ref } from 'vue';
  import { useUpSaleStore } from '@/stores/upSaleStore';
  import { useEventStore } from '@/stores/eventStore';
  import { useRouter } from 'vue-router';
  import Phone from '@/components/Customer/Phone.vue';
  import { watch } from 'vue';
  import { shallowRef } from 'vue'
  import { useDate } from 'vuetify'

  // import { getThaiMonth, getLast5years,getCurrentMonth } from '@/utils/dateUtility';
  import { onMounted } from 'vue';


const useEvent = useEventStore();
const useUpsale = useUpSaleStore();
//const saleOrderStore = useSaleOrderStore(); //pin store => saleOrderStoreStore

const showCompleteModalDialog = ref(false);
const showErrorModalDialog = ref(false);


//const docdate = ref('');

onMounted(async () => {

  console.log('Component has been mounted');

  console.log('useEvent.sale.title', useEvent.sale);

  //useUpsale.upSaleDate = new Date().toISOString().split('T')[0]; // Set default date to today
  //useUpsale.upSaleDate = useUpsale.formattedDate(useUpsale.upSaleDate);

  console.log('useUpsale.upSaleDate', useUpsale.upSaleDate);

  if(useEvent.sale.title) {
     await useUpsale.fetchUpsaleBySalecode(useEvent.sale.title,useUpsale.upSaleDate);
  }

});

const selectedAll = ref(false);
const toggleSelectAll = () => {
  useUpsale.toggleSelectAll();
};

const adapter = useDate()
// const upSaleDate = shallowRef(adapter.parseISO(useUpsale.upSaleDate))
const upSaleDate = ref(new Date(useUpsale.upSaleDate)); // Format to YYYY-MM-DD


const onDateChange = async (newDate) => {
  console.log('New date selected:', newDate);

  if (newDate) {
    useUpsale.upSaleDate = newDate


    console.log('New date selected:', useUpsale.upSaleDate);
    await useUpsale.fetchUpsaleBySalecode(useEvent.sale.title, useUpsale.upSaleDate);
  }
}

const handleSelectAllTelStatus = async () => {

  await useUpsale.toggleSelectTelStatusAll();
  console.log('handleSelectAllTelStatus called');

  let result = await useUpsale.UpdateUpsaleStatus();
  if (result) {
    console.log("from server OK", result);
    if (result == "true") {
      console.log("from server OK 22222");

      let selectedCount = useUpsale.upSaleOrders.length;
      console.log("selectedCount", selectedCount);

      useUpsale.modalTitle = "เปลี่ยนสถานะโทรแล้ว " + selectedCount + " รายการ";
      useUpsale.modalText = useUpsale.modalString.saveComplete;
      showCompleteModalDialog.value = true;
    } else {
      useUpsale.modalTitle = "error from server : " + result;
      useUpsale.modalText = useUpsale.modalString.errorFromServer;
      showErrorModalDialog.value = true;
      console.log("from server OK error");
    }
  }

};

const handleSelectAllUpsaleStatus = async () => {

  await useUpsale.toggleSelectUpsaleStatusAll();
  console.log('handleSelectAllUpsaleStatus called');

  let result = await useUpsale.UpdateUpsaleStatus();
  if (result) {
    console.log("from server OK", result);
    if (result == "true") {
      console.log("from server OK 22222");

      let selectedCount = useUpsale.upSaleOrders.length;
      console.log("selectedCount", selectedCount);

      useUpsale.modalTitle = "เปลี่ยนสถานะ Upsale " + selectedCount + " รายการ";
      useUpsale.modalText = useUpsale.modalString.saveComplete;
      showCompleteModalDialog.value = true;
    } else {
      useUpsale.modalTitle = "error from server : " + result;
      useUpsale.modalText = useUpsale.modalString.errorFromServer;
      showErrorModalDialog.value = true;
      console.log("from server OK error");
    }
  }

};

const handleToggleSelectTelStatus = async (item) => {

  await useUpsale.toggleSelectTelStatus(item);
  console.log('handleToggleSelectTelStatus called');

  let result = await useUpsale.UpdateUpsaleStatus();
  if (result) {
    console.log("from server OK", result);
    if (result == "true") {
      console.log("from server OK 22222");

      // let selectedCount = useUpsale.upSaleOrders.countBillTel;
      // console.log("selectedCount", selectedCount);

      // useUpsale.modalTitle = "เปลี่ยนสถานะโทรแล้ว " + selectedCount + " รายการ";
      // useUpsale.modalText = useUpsale.modalString.saveComplete;
      // showCompleteModalDialog.value = true;
    } else {
      useUpsale.modalTitle = "error from server : " + result;
      useUpsale.modalText = useUpsale.modalString.errorFromServer;
      showErrorModalDialog.value = true;
      console.log("from server OK error");
    }
  }

};

const handleToggleSelectUpsaleStatus = async (item) => {

  await useUpsale.toggleSelectUpsaleStatus(item);
  console.log('handleToggleSelectUpsaleStatus called');

  let result = await useUpsale.UpdateUpsaleStatus();
  if (result) {
    console.log("from server OK", result);
    if (result == "true") {
      console.log("from server OK 22222");

      // let selectedCount = useUpsale.upSaleOrders.countBillTel;
      // console.log("selectedCount", selectedCount);

      // useUpsale.modalTitle = "เปลี่ยนสถานะโทรแล้ว " + selectedCount + " รายการ";
      // useUpsale.modalText = useUpsale.modalString.saveComplete;
      // showCompleteModalDialog.value = true;
    } else {
      useUpsale.modalTitle = "error from server : " + result;
      useUpsale.modalText = useUpsale.modalString.errorFromServer;
      showErrorModalDialog.value = true;
      console.log("from server OK error");
    }
  }

};

const handleChangeDonTel = async () => {

  // console.log('handleChangeDonTel called');
  // await useUpsale.changeDonTel();
  // console.log('handleChangeDonTel completed');

  // setTimeout(async () => {

  //       let result = await useUpsale.UpdateUpsaleStatus();

  //      if(result){
  //        console.log("from server OK", result);
  //        if(result =="true")
  //         {
  //            console.log("from server OK 22222");

  //           let selectedCount = useUpsale.upSaleOrders.filter(order => order.is_selected).length;
  //           console.log("selectedCount", selectedCount);

  //           useUpsale.modalTitle = "เปลี่ยนสถานะโทรแล้ว " + selectedCount + " รายการ";
  //           useUpsale.modalText =  useUpsale.modalString.saveComplete;
  //           showCompleteModalDialog.value = true;
  //         } else {
  //           useUpsale.modalTitle = "error from server : " + result;
  //           useUpsale.modalText =  useUpsale.modalString.errorFromServer;
  //           showErrorModalDialog.value = true;
  //           console.log("from server OK error");
  //         }

  //      }
  //     }, 500);
};

const handleChangeCompleteUpsale = async () => {

  // console.log('handleChangeCompleteUpsale called');
  // await useUpsale.changeUpsaleComplete();
  // console.log('handleChangeCompleteUpsale completed');

  // setTimeout(async () => {

  //       let result = await useUpsale.UpdateUpsaleStatus();

  //      if(result){
  //        console.log("from server OK", result);
  //        if(result =="true")
  //         {
  //            console.log("from server OK 22222");

  //           let selectedCount = useUpsale.upSaleOrders.filter(order => order.is_upsale_status==1).length;
  //           console.log("selectedCount", selectedCount);

  //           useUpsale.modalTitle = "เปลี่ยนสถานะ Upsale Complete " + selectedCount + " รายการ";
  //           useUpsale.modalText =  useUpsale.modalString.saveComplete;
  //           showCompleteModalDialog.value = true;
  //         } else {
  //           useUpsale.modalTitle = "error from server : " + result;
  //           useUpsale.modalText =  useUpsale.modalString.errorFromServer;
  //           showErrorModalDialog.value = true;
  //           console.log("from server OK error");
  //         }

  //      }
  //     }, 500);
};



// Watch for changes in the sale object and fetch upsale data accordingly
watch(
  () => useEvent.sale,
  async (newSale, oldSale) => {
    if (newSale && newSale.title) {
      await useUpsale.fetchUpsaleBySalecode(newSale.title, useUpsale.upSaleDate);
    }
  },
  { deep: true }
);

const routeToNewSaleOrder = () => {
    const router = useRouter();
    router.push('/new_sale_order');
  };

// alter table tnt_upsale_order_don_split_by_date add is_tel_status int default 0 --tel to customer status 1=tel yet
// alter table tnt_upsale_order_don_split_by_date add is_upsale_status int default 0--result of tel to customer => 1=customer say yes to buy sonthing up

const headers =  ref([
      // {
      //   title: '',
      //   align: 'center',
      //   key: 'is_selected',
      //   sortable: false,
      //   width: 48,
      // },
      {
        title: 'สถานะการโทร',
        align: 'center',
        key: 'is_tel_status',
        sortable: false
      },
      {
        title: 'สถานะการ Upsale',
        align: 'center',
        key: 'is_upsale_status',
        sortable: false
      },
       {
          title: 'เลขที่สั่งขาย',
          align: 'start',
          key: 'docno',
        },
        {
          title: 'วันที่สั่งขาย',
          align: 'start',
          key: 'thaidate',
        },



         {
          title: 'ชื่อลูกค้า',
          align: 'start',
          key: 'arname',
        },
         {
          title: 'ที่อยู่',
          align: 'start',
          key: 'araddress',
        },
        {
          title: 'เบอร์โทรศัพท์',
          align: 'start',
          key: 'arcode',
        },
        // {
        //   title: 'เลขที่ขนส่ง',
        //   align: 'start',
        //   key: 'deliveryno',
        // },
        {
          title: 'รหัสพนักงานขาย',
          align: 'start',
          key: 'salecode',
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







  const getRandomColor = () => {
    const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleChangeDate = async () => {

    console.log('selectedMonth.value', selectedMonth.value);
    console.log('selectedYear.value', selectedYear.value);

    // setTimeout(async() => {
    //   await useUpsale.handleXmonthChange(selectedMonth.value,selectedYear.value);
    // }, 1000);
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
.button {
  background-color: #4CAF50;
  color: white;
  padding: 5px 32px;
  text-align: center;
  text-decoration: dashed;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  width: 100%;
}
.button2 {
  background-color: red;
  color: white;
  padding: 5px 32px;
  text-align: center;
  text-decoration: dashed;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  width: 100%;
}
</style>

