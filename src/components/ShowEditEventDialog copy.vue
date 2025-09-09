<template>
   <v-dialog v-model="useEvent.showEventDialog" max-width="500">
        <v-card>
          <v-container>
            <v-form @submit.prevent="submitEvent">

              <h4 class="mb-2">แก้ไขนัดหมาย</h4>

              <v-text-field v-model="useEvent.event.customername"
                type="text"
                 readonly="readonly"
                label="ชื่อลูกค้า"></v-text-field>
              <v-text-field v-model="useEvent.event.customerid"
                type="text"
                readonly="readonly"
                label="เบอร์โทร"></v-text-field>
              <v-text-field v-model="useEvent.event.description"
                type="text"
                required
                class="requierd-text"
                label="รายละเอียด"></v-text-field>
              <v-text-field v-model="useEvent.event.time.calldate"
                type="date"
                 required
                 class="requierd-text"
                label="วันที่โทร"></v-text-field>
              <v-text-field v-model="useEvent.event.time.end"
                type="date"
                required
                class="requierd-text"
                label="วันที่นัดลูกค้า"></v-text-field>
              <!-- <v-text-field v-model="color" type="color" label="สี (click to open color menu)"></v-text-field> -->

              <v-select
                v-model="useEvent.event.due_status"
                :items="statusItems"
                required
                class="requierd-text"
                item-title="text"
                item-value="value"
                label="สถานะการโทร"
              ></v-select>

              <v-text-field v-model="useEvent.sale.name"
                type="text"
                readonly="readonly"
                label="พนักงานขาย">
                </v-text-field>

                <v-btn type="submit" color="success" class="mr-4" @click.stop="handleBtnSave">
                  แก้ไขนัดหมาย
                <!-- {{ useEvent.event.due_status === 0 ? 'แก้ไขนัดหมาย' : 'เพิ่มนัดหมายใหม่' }} -->
                </v-btn>

                <v-btn type="button" color="danger" class="mr-4" @click="handleBtnDelete">
                  ลบนัดหมาย
                </v-btn>
            </v-form>
          </v-container>
        </v-card>
  </v-dialog>

  <ShowConfirmModalDialog
    :showDialog="showConfirmEditDialog"
    :onConfirm="editEvent"
    :color="primary"
  />

  <ShowConfirmModalDialog
    :showDialog="showConfirmDeleteDialog"
    :onConfirm="handleDeleteEvent"
    :color="danger"
  />
</template>

<script setup>
import { ref , watch  } from 'vue';
import { defineProps } from 'vue';
import {useEventStore} from '../stores/eventStore'; //pin store
import ShowConfirmModalDialog from './ShowConfirmModalDialog.vue';

const useEvent = useEventStore(); //pin store => useEventStore

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

watch(() => props.dialogEdit, (newVal) => {
  dialogEdit.value = newVal;
});

watch(() => showConfirmEditDialog, (newVal) => {
  showConfirmEditDialog.value = newVal;
});

watch(() => showConfirmDeleteDialog, (newVal) => {
  showConfirmDeleteDialog.value = newVal;
});

const handleBtnSave = () => {

  showConfirmEditDialog.value = false;

  console.log('handleBtnSave: ' + showConfirmEditDialog.value);

  useEvent.modalTitle = 'ยืนยัน';
  useEvent.modalText = 'คุณต้องการแก้ไขนัดหมายนี้ใช่หรือไม่?';
  showConfirmEditDialog.value = true;

  console.log('handleBtnSave 2: ' + showConfirmEditDialog.value);
};

const handleBtnDelete = () => {

  showConfirmDeleteDialog.value = false;

  console.log('handleBtnDelete: ' + showConfirmDeleteDialog.value);

  useEvent.modalTitle = 'ยืนยัน';
  useEvent.modalText = 'คุณต้องการลบนัดหมายนี้ใช่หรือไม่?';
  showConfirmDeleteDialog.value = true;
};

const editEvent = async () => {

  showConfirmEditDialog.value = false;

 await useEvent.editEvent(useEvent.event);

  setTimeout(() => {
    showConfirmEditDialog.value = false;
    useEvent.showEventDialog = false;
    useEvent.fetchEvents(useEvent.sale.code);
  }, 1000);
};

const handleDeleteEvent = async () => {

  //alert('handleDeleteEvent: ' );
  showConfirmDeleteDialog.value = false;

  await useEvent.removeEvent(useEvent.event);

 setTimeout(() => {
  showConfirmDeleteDialog.value = false;
  useEvent.showEventDialog = false;
   useEvent.fetchEvents(useEvent.sale.code);
 }, 1000);
}

const submitEvent = async () => {

  console.log('submitEvent: ' + showConfirmEditDialog.value);


};

</script>

<style scoped>
.requierd-text {
     background-color: pink !important;
}
</style>

