<template>
  <v-dialog v-model="useEvent.showNewEventDialog" max-width="500">
       <v-card>

        <v-toolbar flat>
          <v-toolbar-title>เพิ่มนัดหมายใหม่</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="useEvent.showNewEventDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

         <v-container>
           <v-form @submit.prevent="submitEvent">

            <AutoCompleteSelect />

            <v-text-field v-model="useEvent.event.customername"
               type="text"
               readonly="readonly"
               label="ชื่อลูกค้า">
               </v-text-field>

             <v-text-field v-model="useEvent.event.customeraddress"

              type="text"
               readonly="readonly"
              label="ที่อยู่"></v-text-field>

             <!-- <v-text-field v-model="useEvent.event.customerid"
               type="text"
               readonly="readonly"
               label="เบอร์โทร"></v-text-field> -->

              <!-- <Phone v-model="useEvent.event.customerid" label="เบอร์โทร" readonly="readonly" /> -->

              <Phone :phoneNumber="useEvent.event.customerid"></Phone>



             <v-text-field v-model="useEvent.event.description"
               type="text"
               required
               class="requierd-text"
               label="รายละเอียด"></v-text-field>

             <!-- <v-text-field v-model="useEvent.event.time.calldate"
               type="date"
                required
                class="requierd-text"
               label="วันที่โทร"></v-text-field>
             <v-text-field v-model="useEvent.event.time.end"
               type="date"
               required
               class="requierd-text"
               label="วันที่นัดลูกค้า"></v-text-field> -->

                <v-date-input
                label="วันที่โทร"
                v-model="callDate"
                @update:modelValue="handleCalldateChange"
                class="requierd-text"
              >
              </v-date-input>


                <!-- <v-text-field v-model="useEvent.event.time.end"
               type="date"
               required
               locale="th-TH"
               class="requierd-text"
               label="วันที่นัดลูกค้า"></v-text-field> -->

                <v-date-input
                label="วันที่นัดลูกค้า"
                v-model="dueDate"
                @update:modelValue="handleDuedateChange"
                class="requierd-text"
              >
              </v-date-input>


             <v-select
               v-model="useEvent.event.due_status"
               :items="statusItems"
               required
               class="requierd-text"
               item-title="text"
               item-value="value"
               label="สถานะการโทร"
             ></v-select>

             <v-data-table
                  v-model:search="search"
                  :headers="headers"
                  :items="useEvent.lastCustomerOrderItems"
                  :items-per-page="25"
                  hide-default-footer

                >
                  <template v-slot:header.stock>
                    <!-- <div class="text-end">Stock</div> -->
                  </template>


                  <template v-slot:item.itemname="{ item }">
                    <v-chip :color="getRandomColor()" class="text-start">
                      {{ item.itemname }}
                    </v-chip>
                  </template>

                  <template v-slot:item.qty="{ item }">
                    <div class="text-end">{{ item.qty > 0 ? new Intl.NumberFormat().format(item.qty) : '' }}</div>
                  </template>

              </v-data-table>

               <v-text-field
                v-model="useEvent.CustomerOrderBillCount"
                type="text"
                readonly="readonly"
                label="จำนวนบิลซื้อสินค้าทั้งหมด">
              </v-text-field>

               <v-data-table
                  v-model:search="search"
                  :headers="headers02"
                  :items="useEvent.lastCustomerOrderDeliveryNo"
                  :items-per-page="25"
                  hide-default-footer

                >
                  <template v-slot:header.stock>
                    <!-- <div class="text-end">Stock</div> -->
                  </template>


                  <template v-slot:item.deliveryno="{ item }">
                    <v-chip :color="green" class="text-start">
                      {{ item.deliveryno }}
                    </v-chip>
                  </template>



              </v-data-table>

             <v-text-field v-model="useEvent.sale.name"
               type="text"
               readonly="readonly"
               label="พนักงานขาย">
               </v-text-field>

               <v-btn type="submit" color="success" class="mr-4" @click="handleDialog2">
                 บันทึกข้อมูล
               <!-- {{ useEvent.event.due_status === 0 ? 'แก้ไขนัดหมาย' : 'เพิ่มนัดหมายใหม่' }} -->
               </v-btn>
           </v-form>
         </v-container>
       </v-card>
 </v-dialog>

 <v-dialog
      v-model="dialog2"
       min-width="250"
       max-width="600"
    >
      <v-card title="ยืนยัน" color="green">
        <template v-slot:text>
            <h2>
              ต้องกาบันทึกนัดหมายนี้ใช่หรือไม่?
            </h2>
        </template>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn

            class="my-2"
            text="OK"
            width="120"
            @click="handleOnConfirm"
          ></v-btn>
          <v-btn
            text="Close"
            variant="text"
            @click="dialog2 = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

 <!-- <ShowConfirmModalDialog
    :showDialog="showConfirmDialog"
    :onConfirm="handleOnConfirm"
  /> -->
</template>

<script setup>
import { ref , watch  } from 'vue';
import { defineProps } from 'vue';
import {useEventStore} from '../stores/eventStore'; //pin store
import { defineEmits } from 'vue';
import AutoCompleteSelect from './AutoCompleteSelect.vue';
import Phone from '@/components/Customer/Phone.vue';

const useEvent = useEventStore(); //pin store => useEventStore

const statusItems = ref([
 { text: 'ยังไม่โทร', value: 0 },
 { text: 'โทรแล้ว', value: 1 },
]);

const props = defineProps({
 dialogEdit: {
   type: Boolean,
   default : false,
 },
 event: {
   type: Object,
   default: {},
 },

});

const emit = defineEmits(['update:dialogEdit']);

let showConfirmDialog = ref(false)

const dialogEdit = ref(props.dialogEdit);
let dialog2 = ref(false);

const callDate = ref(new Date(useEvent.event.time.calldate));
const dueDate = ref(new Date(useEvent.event.time.end));



onMounted(async () => {
  watch(() => useEvent.showNewEventDialog, async (newVal) => {
    useEvent.showNewEventDialog = newVal;

    //alert("watch 2")

    useEvent.lastCustomerOrderItems = [];
  });
});

watch(() => props.dialogEdit, (newVal) => {
 dialogEdit.value = newVal;
 useEvent.lastCustomerOrderItems = [];

 //alert("watch 1")

});

const handleCalldateChange = async (newDate) => {
  //console.log('New date selected:', newDate);
  if (newDate) {
   useEvent.event.time.calldate = newDate;
    console.log('New Call date selected:',useEvent.event.time.calldate);
  }
}

const handleDuedateChange = async (newDate) => {
  //console.log('New date selected:', newDate);
  if (newDate) {
   useEvent.event.time.end = newDate;
    console.log('New Due date selected:',useEvent.event.time.end);
  }
}

const handleDialog2 = () => {
  dialog2.value = !dialog2.value;
};

// const handleBtnSave = async () => {

//   console.log("handleBtnSave")
//   useEvent.modalTitle = 'ยืนยัน';
//   useEvent.modalText = 'คุณต้องการบันทึกข้อมูลใช่หรือไม่?';
//   showConfirmDialog.value = true;

// };

const handleOnConfirm = async () => {

  dialog2.value = false;
  //save event to db
  await useEvent.addEvent(useEvent.event);

  setTimeout(() => {
      useEvent.showNewEventDialog = false;
      useEvent.fetchEvents(useEvent.sale.code);
  }, 1000);

};

const submitEvent = async () => {

//click แล้ว show confirm dialog เฉยๆ จากนั้นจะไปทำ editEvent รับค่าจาก confirmModalDialog อีกที

// console.log("submitEvent");



 //handleBtnSave();


};

const getRandomColor = () => {
    const colors = ['primary',];
    return colors[Math.floor(Math.random() * colors.length)];
  };


  const headers = [
    {
      title: 'รายการสินค้าซื้อล่าสุด',
      align: 'start',
      sortable: false,
      value: 'remark',
    },
    // { title: 'จำนวน', value: 'qty',align: 'end', },
    { title: 'วันที่ซื้อล่าสุด', value: 'thaidate' },

  ];

    const headers02 = [
    {
      title: 'หมายเลขจัดส่ง 10 บิลล่าสุด',
      align: 'start',
      sortable: false,
      value: 'deliveryno',
    },
    { title: 'วันที่จัดส่ง', value: 'deliverydate', align: 'start', },
    { title: 'รายการสินค้า', value: 'remark', align: 'start', },
  ];

</script>

<style scoped>
.requierd-text {
    background-color: pink !important;
}
</style>

