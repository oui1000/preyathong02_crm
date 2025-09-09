<template>
  <div class="edit-saleorder">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2>แก้ไขใบสั่งขาย ({{ id.split("@@")[1] }})</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
            <SaleOrderEdit :docno="id" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>

import SaleOrderEdit from '@/components/Sales/SaleOrderEdit.vue';

import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id
//  let dbame = '';

// onMounted(async () => {



//     let objDocno = id.docno.toString().split('@@');
//     let docno = objDocno[0]; // Get the first part of the docno
//     dbame = objDocno[1]; // Get the second part of the docno



// });

</script>

<style scoped>
.edit-saleorder {
  padding: 0px;
}
</style>
