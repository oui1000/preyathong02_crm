<template>
  <div class="new-saleorder">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2>สร้างใบสั่งขายใหม่ (Preyathong-02)</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <SaleOrder @submit="handleSubmit" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>

import SaleOrder from '@/components/Sales/SaleOrder.vue';


</script>

<style scoped>
.new-saleorder {
  padding: 0px;
}
</style>
