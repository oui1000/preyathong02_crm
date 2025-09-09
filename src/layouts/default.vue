<template class="layout">

<Overlay :showOverlay="showOverlay">
      <v-card>
        <v-card-title>Overlay Content</v-card-title>
        <v-card-text>This is the content inside the overlay.</v-card-text>
      </v-card>
</Overlay>

<ShowModalDialog />

<Loader  />

<AsideBar />
<AppBar />

  <v-main>

    <router-view />
  </v-main>

  <!-- <AppFooter /> -->

</template>

<script setup>
import { ref } from 'vue';

import AppBar from '@/components/AppBar.vue';
// import AppFooter from '@/components/AppFooter.vue';
import AsideBar from '@/components/AsideBar.vue';
import Overlay from '@/components/Overlay.vue';
import Loader from '@/components/Loader.vue';
import ShowModalDialog from '@/components/ShowModalDialog.vue';




</script>

<style>

.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: red;
}

.v-main{
  /* background-color: whitesmoke !important; */
  /* margin-top: 10 px !important;
  margin-bottom: 10 px !important; */
  padding-top: 0px !important;

}
/* Your styles here */
</style>
