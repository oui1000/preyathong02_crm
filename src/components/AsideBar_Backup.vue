<template>
  <v-navigation-drawer
     v-model="drawer"
     color="primary"
     app

   >
   <!-- <v-avatar class="d-block text-center mx-auto mt-4 mb-16" size="60" >
      <v-icon size="60" x-large>mdi-calendar-check</v-icon>
   </v-avatar> -->

   <v-list flat class="mt-16">
     <v-list-item-group v-model="selectedItem">
       <v-list-item
         v-for="(item, i) in items"
         active-class="border"
         :ripple="false"
         :key="i"
         :value="item.value"
         @click="selectedItem = item.value"
       >
         <v-list-item-icon>
           <v-icon>{{ item.icon }}</v-icon>
         </v-list-item-icon>

       </v-list-item>

     </v-list-item-group>

   </v-list>

   <!-- <div style="position: absolute; bottom:20px; margin-left: auto; margin-right: auto; left: 0; right: 0; text-align: center;">

     <v-btn icon @click="" >
       <v-icon style="color:white">mdi-marker</v-icon>
     </v-btn>

     <v-btn icon @click="" style="color:white">
       <v-icon style="color:white">mdi-information-outline</v-icon>
     </v-btn>


   </div> -->

   </v-navigation-drawer>
</template>

<script>
export default {
 data () {
   return {
     drawer: true,
     rail: true,
     selectedItem: 3,
     items: [
       { title: 'Home', icon: 'mdi-home-city', value: 'home' },
       { title: 'My Account', icon: 'mdi-account', value: 'account' },
       { title: 'Users', icon: 'mdi-account-group-outline', value: 'users' },
     ],
   }
 },
}
</script>

<style scoped>
.border{
 width: 50px;
 margin-left: 12px;
 margin-right: 12px;
 background: #529dff;
 border-radius: 50% !important;
 text-decoration: none;
}
</style>
