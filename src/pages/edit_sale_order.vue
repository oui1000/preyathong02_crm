<template>
  <div class="edit-saleorder">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2>แก้ไขใบสั่งขาย (Sale Order)</h2>
        </v-col>
      </v-row>
      <!-- <v-row>
        <v-col cols="12">
          <SaleOrderEdit @submit="handleSubmit" />
        </v-col>
      </v-row> -->
    </v-container>
  </div>
</template>

<script setup>

import SaleOrderEdit from '@/components/Sales/SaleOrderEdit.vue';

import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id

</script>

<style scoped>
.edit-saleorder {
  padding: 0px;
}
</style>
