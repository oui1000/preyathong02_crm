<template>

  <v-container>
    <v-row>
      <v-col cols="12" sm="10">
        <v-row>
          <v-col cols="12" sm="12">
            <UpsaleList />
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
import UpsaleList from '@/components/Upsale/UpsaleList.vue';
import Doctor from '@/components/Doctor.vue';

  //
</script>
