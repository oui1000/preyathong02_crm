<template>
  <div class="pa-4 text-center">
    <!-- <v-btn
      :disabled="dialog"
      color="primary"
      icon="mdi-refresh"
      text="Start loading"
      @click="dialog = true"
    ></v-btn> -->

    <v-dialog
      v-model="useEvent.loader"
      max-width="320"
      persistent
    >
      <v-list
        class="py-2"
        color="primary"
        elevation="12"
        rounded="lg"
      >
        <v-list-item
          prepend-icon="$vuetify-outline"
          title="Refreshing Application..."
        >
          <template v-slot:prepend>
            <div class="pe-4">
              <v-icon color="primary" size="x-large"></v-icon>
            </div>
          </template>

          Loading ...

          <template v-slot:append>
            <v-progress-circular
              color="primary"
              indeterminate="disable-shrink"
              size="16"
              width="2"
            ></v-progress-circular>
          </template>
        </v-list-item>
      </v-list>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import {useEventStore} from '../stores/eventStore'
const useEvent = useEventStore()

// const dialog = ref(false)

watch(useEvent.loader, (val) => {
  if (!val) return

  setTimeout(() => (useEvent.loader = false), 4000)
})
</script>
