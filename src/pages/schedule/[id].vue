<template>
  <div class="edit-saleorder">
    <v-container>

      <v-row>
        <v-col cols="12">
            <SchedueByDateDetail :rowid="id" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>

import SchedueByDateDetail from '@/components/Schedule/SchedueByDateDetail.vue';

import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id
 let dbame = '';

onMounted(async () => {



    // let id = id;

    console.log('page [d]=> id', id);



});

</script>

<style scoped>
.edit-saleorder {
  padding: 0px;
}
</style>
