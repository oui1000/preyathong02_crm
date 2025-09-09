<template>
  <v-dialog v-model="saleOrderStore.showNewItemDialog" max-width="500">
       <v-card>

        <v-toolbar flat>
          <v-toolbar-title>ค้นหาสินค้า</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="saleOrderStore.showNewItemDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

         <v-container>
           <v-form @submit.prevent="submitEvent">

              <ProductAutoCompleteSelect />




             <!-- <v-data-table
                  v-model:search="search"
                  :headers="headers"
                  :items="saleOrderStore.lastCustomerOrderItems"
                  :items-per-page="25"
                  hide-default-footer

                >
                  <template v-slot:header.stock>

                  </template>


                  <template v-slot:item.itemname="{ item }">
                    <v-chip :color="getRandomColor()" class="text-start">
                      {{ item.itemname }}
                    </v-chip>
                  </template>

                  <template v-slot:item.qty="{ item }">
                    <div class="text-end">{{ item.qty > 0 ? new Intl.NumberFormat().format(item.qty) : '' }}</div>
                  </template>

              </v-data-table> -->



               <!-- <v-btn type="submit" color="success" class="mr-4" @click="handleDialog2">
                 บันทึกข้อมูล

               </v-btn> -->
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
import { useSaleOrderStore } from '@/stores/saleOrderStore'; //pin store
import { defineEmits } from 'vue';
import ProductAutoCompleteSelect from '@/components/Sales/ProductAutoCompleteSelect.vue';


const saleOrderStore = useSaleOrderStore(); //pin store => useSaleOrderStore

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

watch(() => props.dialogEdit, (newVal) => {
 dialogEdit.value = newVal;
 saleOrderStore.lastCustomerOrderItems = [];

 //alert("watch 1")

});

onMounted(async () => {
  watch(() => saleOrderStore.showNewItemDialog, async (newVal) => {
    saleOrderStore.showNewItemDialog = newVal;

    //alert("watch 2")

    saleOrderStore.lastCustomerOrderItems = [];
  });
});

const handleDialog2 = () => {
  dialog2.value = !dialog2.value;
};

// const handleBtnSave = async () => {

//   console.log("handleBtnSave")
//   saleOrderStore.modalTitle = 'ยืนยัน';
//   saleOrderStore.modalText = 'คุณต้องการบันทึกข้อมูลใช่หรือไม่?';
//   showConfirmDialog.value = true;

// };

const handleOnConfirm = async () => {

  dialog2.value = false;
  //save event to db
  await saleOrderStore.addEvent(saleOrderStore.event);

  setTimeout(() => {
      saleOrderStore.showNewItemDialog = false;
      saleOrderStore.fetchEvents(saleOrderStore.sale.code);
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
      value: 'itemname',
    },
    { title: 'จำนวน', value: 'qty',align: 'end', },
    { title: 'วันที่ซื้อล่าสุด', value: 'thaidate' },

  ];

</script>

<style scoped>
.requierd-text {
    background-color: pink !important;
}
</style>

