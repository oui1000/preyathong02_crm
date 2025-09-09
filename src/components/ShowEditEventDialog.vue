<template>
  <v-dialog
    persistent
    v-model="useEvent.showEventDialog"
    max-width="500">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>แก้ไขนัดหมาย</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="useEvent.showEventDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container>
          <v-form @submit.prevent="submitEvent">

            <v-text-field v-model="useEvent.event.customername"
              type="text"
               readonly="readonly"
              label="ชื่อลูกค้า"></v-text-field>

             <v-text-field v-model="useEvent.event.customeraddress"

              type="text"
               readonly="readonly"
              label="ที่อยู่"></v-text-field>

            <!-- <v-text-field v-model="useEvent.event.customerid"
              type="text"
              readonly="readonly"
              label="เบอร์โทร"></v-text-field> -->

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
              label="วันที่โทร"></v-text-field> -->


              <v-date-input
                label="วันที่โทร"
                readonly="readonly"
                v-model="callDate"
                @update:modelValue="handleCalldateChange"

              >
              </v-date-input>


                <!-- <v-text-field v-model="useEvent.event.time.end"
               type="date"
               required
               locale="th-TH"
               class="requierd-text"
               label="วันที่นัดลูกค้า"></v-text-field> -->

                <v-date-input
                label="วันที่นัดลูกค้า (เดิม)"
                 readonly="readonly"
                v-model="dueDate"
                @update:modelValue="handleDuedateChange"

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

                <v-date-input
                label="วันที่นัดลูกค้า (ใหม่)"

                v-model="newDueDate"
                @update:modelValue="handleNewDuedateChange"
                class="requierd-text"
              >
              </v-date-input>




            <v-text-field v-model="useEvent.sale.name"
              type="text"
              readonly="readonly"
              label="พนักงานขาย">
              </v-text-field>

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

              <v-btn type="submit" color="success" class="mr-4" @click="handleDialog2">
                แก้ไขนัดหมาย
              <!-- {{ useEvent.event.due_status === 0 ? 'แก้ไขนัดหมาย' : 'เพิ่มนัดหมายใหม่' }} -->
              </v-btn>

              <v-btn type="button" color="danger" class="mr-4" @click="handleDialog3">
                ลบนัดหมาย
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
      <v-card title="ยืนยัน" color="yellow">
        <template v-slot:text>
            <h2>
              ต้องการแก้ไขนัดหมายนี้ใช่หรือไม่?
            </h2>
        </template>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn

            class="my-2"
            text="OK"
            width="120"
            @click="editEvent"
          ></v-btn>
          <v-btn
            text="Close"
            variant="text"
            @click="dialog2 = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialog3"
       min-width="250"
       max-width="600"
    >
      <v-card title="ยืนยัน" color="red">
        <template v-slot:text>
            <h2>
              ต้องการลบนัดหมายนี้ใช่หรือไม่?
            </h2>
        </template>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="my-2"
            text="OK"
            width="120"
             variant="text"
            @click="handleDeleteEvent"
          ></v-btn>
          <v-btn
            text="Close"
            variant="text"
            @click="dialog3 = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  <!-- <ShowConfirmModalDialog
    :showDialog="showConfirmEditDialog"
    :onConfirm="editEvent"
    :color="primary"
  />

  <ShowConfirmModalDialog
    :showDialog="showConfirmDeleteDialog"
    :onConfirm="handleDeleteEvent"
    :color="danger"
  /> -->
</template>

<script setup>
import { ref , watch  } from 'vue';
import { defineProps } from 'vue';
import {useEventStore} from '../stores/eventStore'; //pin store
import { onMounted } from 'vue';


import { defineEmits } from 'vue';
import Phone from '@/components/Customer/Phone.vue';


const useEvent = useEventStore(); //pin store => useEventStore


let dialog2 = ref(false)
let dialog3 = ref(false)


let showConfirmEditDialog = ref(false)
let showConfirmDeleteDialog = ref(false)

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
const dialogEdit = ref(props.dialogEdit);

let callDate = ref(new Date());
let dueDate = ref(new Date(useEvent.event.time.end));

// Watch for event changes and update callDate/dueDate accordingly
watch(
  () => useEvent.event,
  (newEvent) => {
    callDate.value = newEvent.time?.calldate ? new Date(newEvent.time.calldate) : null;
    dueDate.value = newEvent.time?.end ? new Date(newEvent.time.end) : null;
  },
  { immediate: true, deep: true }
);



watch(() => props.dialogEdit, (newVal) => {
  dialogEdit.value = newVal;
});

watch(() => showConfirmEditDialog, (newVal) => {
  showConfirmEditDialog.value = newVal;
});

watch(() => showConfirmDeleteDialog, (newVal) => {
  showConfirmDeleteDialog.value = newVal;
});

onMounted(async () => {
  watch(() => useEvent.showEventDialog, async (newVal) => {
    if (newVal && useEvent.event.customerid) {
      await useEvent.fetchLastCustomerOrder(useEvent.event.customerid);
    }
  });
});

const handleCalldateChange = async (newDate) => {
  //console.log('New date selected:', newDate);
  if (newDate) {
   useEvent.event.time.calldate = newDate;
    console.log('New Call date selected:',useEvent.event.time.calldate);
  }
}

const handleNewDuedateChange = async (newDate) => {
  //console.log('New date selected:', newDate);
  if (newDate) {
   useEvent.event.time.newduedate = newDate;
    console.log('New Due date selected:',useEvent.event.time.newduedate);
  }
}





const handleDialog2 = () => {
  dialog2.value = !dialog2.value;
};

const handleDialog3 = () => {
  dialog3.value = !dialog3.value;
};



const editEvent = async () => {

  console.log('editEvent: newduedate ->' + useEvent.event.time.newduedate );

  //ถ้า duedate <> วันปัจจุบัน  alert ไม่สามารถแก้ไขได้



    // Check if the due date is not today

    console.log('useEvent.event.oldduedate: ' + useEvent.event.oldduedate);
    console.log('useEvent.event.currentdate: ' + useEvent.event.currentdate);


  if(useEvent.event.oldduedate !== useEvent.event.currentdate) {
      alert('ไม่สามารถแก้ไขได้ เนื่องจากวันที่นัดหมายไม่ตรงกับวันปัจจุบัน');
      return;
    }


  //return ;  /// debug before submit
  if(useEvent.event.time.newduedate === undefined || useEvent.event.time.newduedate === null) {
     alert('กรุณาเลือกวันที่นัดลูกค้าใหม่');
     return;
  }


 await useEvent.editEvent(useEvent.event);

  setTimeout(() => {
    dialog2.value = false;
    useEvent.showEventDialog = false;
    useEvent.fetchEvents(useEvent.sale.code);
  }, 1000);
};

const handleDeleteEvent = async () => {

  await useEvent.removeEvent(useEvent.event);

 setTimeout(() => {
  dialog3.value = false;
  useEvent.showEventDialog = false;
   useEvent.fetchEvents(useEvent.sale.code);
 }, 1000);
}

const submitEvent = async () => {

  console.log('submitEvent: ' + showConfirmEditDialog.value);


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



const formattedEndDate = computed(() => {
  const date = useEvent.event.time.end;
  return date ? new Date(date).toLocaleDateString('th-TH', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
});

const updateEndDate = (value) => {
  useEvent.event.time.end = value;
};
</script>


<style scoped>
.requierd-text {
     background-color: pink !important;
}
</style>

