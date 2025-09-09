<template>
  <div class="text-center pa-4" >
    <v-dialog
      v-model="showDialog"
      max-width="400"
      persistent
     :color="color"
    >
      <v-card
        prepend-icon="mdi-alert-circle-outline"
        :color="color"
      >

      <h4 class="text-center mb-2">
        {{ useEvent.modalTitle }}
      </h4>

      <v-card-title :title="useEvent.modalText">
        {{ useEvent.modalText }}
      </v-card-title>
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="handleOK">
            OK
          </v-btn>

          <v-btn @click="showDialog = false">
            Calcel
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>

import { ref ,onMounted } from 'vue';
import {useEventStore} from '../stores/eventStore'; //pin store

const useEvent = useEventStore(); //pin store => useEventStore
const emit = defineEmits(['confirmOK']);

const props = defineProps({
  onConfirm: {
    type: Function,
    required: true
  },
  showDialog: {
    type: Boolean,
    default: true,
  },
  color: {
    type: String,
    default: 'primary',
  },
});


let showDialog = ref(props.showDialog);
let color = ref(props.color);

watch(() => props.showDialog, (newVal) => {
  showDialog.value = newVal;
});

const handleOK = () => {

  showDialog.value = false;
  useEvent.modalTitle = '';
  useEvent.modalText = '';

  props.onConfirm();  //call function from parent component with props function


};


</script>

<style scoped>



</style>
