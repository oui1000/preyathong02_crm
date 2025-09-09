<template>

    <v-row>
        <v-col cols="12" sm="8" class="d-flex align-center">
              <v-icon icon="mdi-truck"></v-icon> &nbsp; {{PageLabel}} {{props.deliveryno }}
            </v-col>
         <!-- <v-col>
            <v-text-field
              v-model="search"
              density="compact"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="solo-filled"
              flat
              hide-details
              single-line
            ></v-text-field>
         </v-col> -->
      </v-row>

      <v-row>
        <v-col cols="12" sm="4">
          <v-btn color="primary" @click="$router.back()">
            <v-icon left>mdi-arrow-left</v-icon>
            กลับ
          </v-btn>
        </v-col>
      </v-row>

       <v-row>
        <v-col cols="12" sm="12" md="12">
          <v-alert
            v-if="saleOrderStore.deliveryNoTimeline.length !== 0"
            type="warning"
            class="text-center"
          >
             {{saleOrderStore.deliveryNoTimeline[0].arname}}
              {{saleOrderStore.deliveryNoTimeline[0].mydescription
              ? ' - ' + saleOrderStore.deliveryNoTimeline[0].mydescription : ''}}
          </v-alert>
        </v-col>
       </v-row>


   <v-timeline align="start" side="end">

    <v-timeline-item
      v-for="(item, index) in saleOrderStore.deliveryNoTimeline"
      :key="index"
      :dot-color="getRandomColor()"
      size="small"
      class="mb-2"
    >
      <div class="d-flex">
        <div>
           <strong class="me-4">{{item.scantype}}</strong>
        </div>

        <div>
          <strong  class="me-4">  {{ item.district }} // {{   item.province }}</strong>
          <div class="text-caption">
           {{ item.mydate }}  {{   item.mytime }}
          </div>
          <!-- <div class="text-caption">
            {{ item.remark.length > 0 ? item.remark : 'ไม่มีหมายเหตุ' }}
          </div> -->
          <!-- <div class="text-caption">
            จำนวนเงิน : {{ item.totalamount }}
          </div> -->
        </div>
      </div>
    </v-timeline-item>

    <!--
    var mydistrict = item.district;
        if(item.scantype=='Create order' || item.scantype=='กำลังแพ็ค'){
            mydistrict = 'พิษณุโลก';
        }

        var myprovince = item.province;
        if(item.scantype=='Create order' || item.scantype=='กำลังแพ็ค'){
            myprovince = 'พิษณุโลก';
        }


        var mydateTime = item.createdatetime.toString().substring(0, 16);
        var mytime = mydateTime.substring(11, 17);
        var onlydate = mydateTime.substring(0, 10);
        var thaiDate = d.readDate(onlydate);


      var remark = item.remark;
      var from_j_t = "สถานะมาจาก J&T";
    -->

    <!-- <v-timeline-item
      dot-color="pink"
      size="small"
    >
      <div class="d-flex">
        <strong class="me-4">5pm</strong>
        <div>
          <strong>New Icon</strong>
          <div class="text-caption">
            Mobile App
          </div>
        </div>
      </div>
    </v-timeline-item> -->

    <!-- <v-timeline-item
      dot-color="teal-lighten-3"
      size="small"
    >
      <div class="d-flex">
        <strong class="me-4">3-4pm</strong>
        <div>
          <strong>Design Stand Up</strong>
          <div class="text-caption mb-2">
            Hangouts
          </div>
        </div>
      </div>
    </v-timeline-item>

    <v-timeline-item
      dot-color="pink"
      size="small"
    >
      <div class="d-flex">
        <strong class="me-4">12pm</strong>
        <div>
          <strong>Lunch break</strong>
        </div>
      </div>
    </v-timeline-item>

    <v-timeline-item
      dot-color="teal-lighten-3"
      size="small"
    >
      <div class="d-flex">
        <strong class="me-4">9-11am</strong>
        <div>
          <strong>Finish Home Screen</strong>
          <div class="text-caption">
            Web App
          </div>
        </div>
      </div>
    </v-timeline-item> -->
  </v-timeline>
</template>

<script setup>

  import { ref } from 'vue';
  import { defineProps } from 'vue';
  import { useEventStore } from '@/stores/eventStore';
  import { useRouter } from 'vue-router';

import { useSaleOrderStore } from '@/stores/saleOrderStore';

import { getThaiMonth, getLast5years,getCurrentMonth } from '@/utils/dateUtility';

import { onMounted } from 'vue';

const saleOrderStore = useSaleOrderStore();

const props = defineProps({
 deliveryno: {
   type: String,
   default: '',
 },

});

// let hideUpsaleTable = ref(false);
// hideUpsaleTable.value = props.rowid.includes('upsale') ? true : false;

// let hideBydateTable = ref(false);
// hideBydateTable.value = props.rowid.includes('bydate') ? true : false;

const PageLabel = ref('สถานะการขนส่งสินค้าเลขที่ : ');

onMounted(async () => {

  //console.log('Component has been mounted');

   let deliveryno = props.deliveryno;
  console.log('props.deliveryno', props.deliveryno);
  console.log('deliveryno', deliveryno);

  await saleOrderStore.fetchCustomerOrdersByDeliveryNo(deliveryno);



});



  const getRandomColor = () => {
    const colors = ['pink', 'green', 'red', 'yellow', 'blue', 'purple', 'orange', 'cyan', 'teal', 'indigo'];
    return colors[Math.floor(Math.random() * colors.length)];
  };



</script>

<style scoped>
button {
  background-color: #4CAF50;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: dashed;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  width: 120px;
}
</style>

