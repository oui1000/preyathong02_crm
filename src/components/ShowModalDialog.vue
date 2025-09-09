<template>
  <div class="text-center pa-4">
    <!-- <v-btn @click="useEvent.showModalDialog = true">
      {{useEvent.modalTitle}}
    </v-btn> -->

    <v-dialog
      v-model="useEvent.showModalDialog"
      width="auto"
    >
      <v-card
       color="primary"
        min-width="400"
        prepend-icon="mdi-update"
        :text="useEvent.modalText"
        :title="useEvent.modalTitle"
      >
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Ok"
            @click="useEvent.showModalDialog = false"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import {useEventStore} from '../stores/eventStore'; //pin store

const useEvent = useEventStore(); //pin store => useEventStore


</script>
