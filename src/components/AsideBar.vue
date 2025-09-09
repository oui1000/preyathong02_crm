<template class="aside-bar">
      <v-navigation-drawer
        v-model="eventStore.drawerState"
        :rail="eventStore.reailState"
        permanent
        @click="eventStore.reailState = false"
        color="primary"
      >

      <!--  :prepend-avatar="`p${Math.floor(Math.random() * 7) + 1}.jpg`" -->

      <v-list-item
          :prepend-avatar="`p${Math.floor(Math.random() * 7) + 1}.jpg`"
          :title="eventStore.user.id"
          nav
        >
          <!-- <template v-slot:append>
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="handleRailChange"
            ></v-btn>
          </template> -->
        </v-list-item>

        <v-divider></v-divider>


      <v-list density="compact" nav>
        <v-list-item-group v-model="selectedItem">

          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :prepend-icon="item.icon"
            :title="item.title"
            :value="item.value"
            :to="item.link"
          >
          </v-list-item>

        </v-list-item-group>

      </v-list>

      <div style="position: absolute; bottom:20px; margin-left: auto; margin-right: auto; left: 0; right: 0; text-align: center;">

        <v-btn icon @click="" color="accent" size="small">
          <v-icon >mdi-marker</v-icon>
        </v-btn>


      </div>

      </v-navigation-drawer>
</template>

<script setup>
import { ref ,onMounted } from 'vue';
import {useEventStore} from '../stores/eventStore'
import { useRoute } from 'vue-router'

const eventStore = useEventStore()
const route = useRoute()

const drawer = ref(eventStore.drawerState);
const rail = ref(eventStore.reailState);
const selectedItem = ref(3);
const items = [
  { title: '1. ปฏิทิน-นัดหมาย', icon: 'mdi-home-city', value: 'home', link: '/' },
  { title: '2. ค่าคอมมิชชั่น', icon: 'mdi-chart-line', value: 'commission', link: '/salecom' },
  { title: '3. รายชื่อลูกค้า', icon: 'mdi-account-group-outline', value: 'users', link : '/customers' },
  { title: '4. ใบสั่งขาย', icon: 'mdi-cart-outline', value: 'users', link : '/sales' },
  { title: '5. Up sale', icon: 'mdi-plus', value: 'upsale', link : '/upsale' },
  { title: '6. เช็คสถานะ Order', icon: 'mdi-order-bool-descending', value: 'users', link : '/order_status' },
  { title: '7. นัดหมาย-ตามวันที่', icon: 'mdi-calendar', value: 'schedule', link: '/schedule' },
];

onMounted(() => {

  //alert("Mounted");

  if (window.matchMedia('(max-width: 1024px)').matches) {
    eventStore.railState = true;
    eventStore.drawerState = false;
  } else {
    eventStore.railState = false;
  }
});

import { watch } from 'vue';

// watch(
//   () => eventStore.railState,
//   (newVal, oldVal) => {
//     // You can handle rail state changes here
//     console.log('Rail state changed:', oldVal, '->', newVal);
//     rail.value = newVal;
//   }
// );

watch(
  () => route.fullPath,
  () => {
    // ใช้ media query ตรวจสอบขนาดหน้าจอ
    if (window.matchMedia('(max-width: 1024px)').matches) {
      // rail.value = false; // mobile และ ipad
      // drawer.value = false; // ปิด drawer
      eventStore.railState = false; // ปิด rail
      eventStore.drawerState = false; // ปิด drawer

    } else {

      console.log("Rail state is true");

      // rail.value = true; // ใหญ่กว่า ipad
      // drawer.value = true; // เปิด drawer
      //eventStore.railState = true; // เปิด rail
      eventStore.drawerState = true; // เปิด drawer
    }
  }
)

// const handleDrawerChange = () => {
//   drawer.value = !drawer.value;
// };

const handleRailChange = () => {

  //alert("Rail state changed");

  eventStore.railState = true; // เปิด rail
  rail.value = true; // เปิด rail
  // rail.value = eventStore.railState;
  // if (eventStore.railState) {
  //   eventStore.drawerState = false; // ปิด drawer เมื่อ rail เปิด
  // } else {
  //   eventStore.drawerState = true; // เปิด drawer เมื่อ rail ปิด
  // }

};

</script>

<style scoped>

  .v-navigation-drawer {

    /* Portrait ipad */
    @media only screen
      and (min-device-width: 834px)
      and (max-device-width: 834px)
      and (orientation: portrait)
      and (-webkit-min-device-pixel-ratio: 2) {

    }

    /* Landscape ipad */
    @media only screen
      and (min-width: 1112px)
      and (max-width: 1112px)
      and (orientation: landscape)
      and (-webkit-min-device-pixel-ratio: 2)
    {

    }

    /* background-color: blueviolet !important; */
  }

  .v-list-item-title{
      color: white !important;
      font-weight: 600 !important;
  }

   .v-list-item__content{
     color: white !important;
     font-weight: 600 !important;
  }
  .v-list-item-icon{
    font-size: small;
  }

  .v-list-item {
    color: white !important;
    font-weight: 600 !important;
  }
</style>
