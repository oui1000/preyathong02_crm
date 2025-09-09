<template>

  <v-container>
    <v-row>
      <v-col cols="12" sm="10">
        <v-row>
          <v-col cols="12" sm="12">
            <SaleOrderList />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="2" style="border-left: 1px solid #e0e0e0; ">
       <Doctor />
      </v-col>
    </v-row>
  </v-container>

</template>

<script setup>
import SaleOrderList from '@/components/Sales/SaleOrderList.vue';
import Doctor from '@/components/Doctor.vue';

  //
</script>
