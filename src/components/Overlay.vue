<!-- <template>
  <div class="d-flex justify-center" v-if="showOverlay">
    <v-btn>
      <v-icon>mdi-loading</v-icon>

      <v-overlay
        activator="parent"
        location-strategy="connected"
        scroll-strategy="block"
      >
        <v-card class="pa-2">
          Loading ...
        </v-card>
      </v-overlay>
    </v-btn>
  </div>
</template> -->

<template>
  <div>
    <v-icon>mdi-loading</v-icon>
    <v-overlay :value="eventStore.showOverlay">
      <slot></slot>
    </v-overlay>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useEventStore } from '@/stores/eventStore';

const eventStore = useEventStore();

const props = defineProps({
  showOverlay: {
    type: Boolean,
    default: false,
  },
});

// const showOverlay = ref(props.showOverlay);

watch(() =>eventStore.showOverlay, (newVal) => {
  eventStore.showOverlay = newVal;
});
</script>

<style>
/* Your styles here */
</style>
