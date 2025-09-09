<script setup>
import { ref } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiBellBadgeOutline } from '@mdi/js';
import {useEventStore} from '../stores/eventStore'

const path = ref(mdiBellBadgeOutline);

const eventStore = useEventStore();
const drawer = ref(eventStore.drawerState);

const toggleDrawer = () => {
  eventStore.drawerState = !eventStore.drawerState;
  drawer.value = eventStore.drawerState;
};

 const gotologin = () => {

      //var url = "http://localhost:8087";

      let url ="http://preyathong-02.ddns.net";
      url += "/topmenu.html?userid=" + eventStore.userId + "&cachebuster=" + new Date().getTime();

      //alert(url);

      window.location = url;
    }

</script>

<style>
.menu-icon {
  cursor: pointer;



}
</style>


<template>
     <v-app-bar color="primary" app dark flat >

      <v-app-bar-nav-icon
         class="menu-icon"
        @click="toggleDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-app-bar-nav-icon>

      <v-btn icon @click="gotologin">
         Back

      </v-btn>

        <!-- <h4 class="black--text ml-3">WORK-CRM</h4> -->

      <v-spacer></v-spacer>

        <!-- <h4 class="blue--text text--lighten-2">Appointments history</h4> -->


      <v-icon x-small color="#2784FF" class="ml-2 mr-2"
        >fas fa-caret-down</v-icon
      >
      <!-- <v-btn color="accent" class="withoutupercase">

         version : 1.0006
      </v-btn> -->

    <!-- <v-badge dot overlap color="green" class="ml-3 mr-2" dark>
      <v-avatar tile color="secondary">
          <svg-icon type="mdi" style="color:red"  :path="path"></svg-icon>
      </v-avatar>

      </v-badge> -->

      <!-- <v-avatar tile color="secondary" style="border-radius: 50%;">
          <v-img src="/p7.jpg"  />
      </v-avatar> -->
      <h4 class="black--text ml-3 pr-1 mr-1">WORK-CRM</h4>


    </v-app-bar>
</template>
