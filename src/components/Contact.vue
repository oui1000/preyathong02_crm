<template>
  <v-card color="white" class="rounded-lg mt-2" flat>
                <v-row>

                  <v-col cols="12" sm="3">
                    <v-card
                      color="transparent"
                      class="rounded-lg"
                      flat
                    >

                    <v-btn color="accent" class="withoutupercase"
                      :style="{ fontSize: '16px' }" width="100%" height="110"
                      @click="showAddnewEvent"
                      >
                        <v-icon left>fas fa-plus</v-icon>
                      เพิ่มนัดหมาย
                    </v-btn>

                      <!-- <span class="caption grey--text mt-n6">Phone Number</span>
                      <h5 class="black--text mb-7">+44 (0) 7887 665 588</h5>
                      <span class="caption grey--text">Card Number</span>
                      <h5 class="black--text">123456789</h5> -->
                    </v-card>
                  </v-col>
                  <v-col cols="12" sm="5" :style="{paddingTop:'20px; height:100%;'}" >
                    <v-card color="accent" class="rounded-lg" flat>

                        <v-select
                        v-model="useEvent.dueStatus"
                        :items="statusItems"
                        required
                        class="requierd-text"
                        item-title="text"
                        item-value="value"
                        label="สถานะการโทร"
                        height="110"
                        color="transparent"
                        :style="{ fontSize: '25px', marginTop: '30px' }"
                        @update:modelValue="handleChange"
                        ></v-select>
                    </v-card>
                  </v-col>

                  <v-col cols="12" sm="4">
                    <v-card color="yellow" class="rounded-lg px-2" flat>
                      <v-row>
                        <v-col cols="12" sm="12" class="mt-1" bgColor="secondary">
                          <v-avatar color="#DFEDFF" tile>
                            <v-img :src="useEvent.sale.img" />
                          </v-avatar>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <h6 class="white--text">{{useEvent.sale.title}}</h6>
                          <h4 class="white--text">{{useEvent.sale.subtitle}}</h4>
                        </v-col>
                        <!-- <v-col cols="12" sm="12" class="mt-3">
                          <v-row>
                            <v-col cols="12" sm="4">
                              <h6 class="grey--text text--lighten-4">Height</h6>
                              <h6 class="white--text">185</h6>
                            </v-col>
                            <v-col cols="12" sm="4">
                              <h6 class="grey--text text--lighten-4">Weight</h6>
                              <h6 class="white--text">83</h6>
                            </v-col>
                            <v-col cols="12" sm="4">
                              <h6 class="grey--text text--lighten-4">
                                Blood type
                              </h6>
                              <h6 class="white--text">AB+</h6>
                            </v-col>
                          </v-row>
                        </v-col> -->
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
  </v-card>

  <ShowAddNewEvent />



</template>

<script setup>
import { ref } from 'vue';
import ShowAddNewEvent from './ShowAddNewEvent.vue';
import ModalNesting from './ModalNesting.vue';
import { useEventStore } from '../stores/eventStore'; //pin store
const useEvent = useEventStore(); //pin store => useEventStore

const due_status = ref(0);

const statusItems = ref([
  { text: 'ยังไม่โทร', value: 0 },
  { text: 'โทรแล้ว', value: 1 },
]);

const handleChange = async () => {

  //alert("change status to " + useEvent.dueStatus);


  setTimeout(async() => {
    await useEvent.fetchEvents(useEvent.sale.code);
  }, 1000);
};

const showAddnewEvent=()=>{

  if(useEvent.sale.code == ''|| useEvent.sale.code == null || useEvent.sale.code == undefined){
    alert('กรุณาเลือกพนักงานขาย');
    return;
  }

  useEvent.event = {
    time: {
      start: new Date().toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0],
      calldate: new Date().toISOString().split('T')[0],
    },
    title: 'new',
    description: 'new',
    due_status: 0,
    docno:'',
    customerid: '',
    customername: '',
    creatorcode : useEvent.sale.code,
  };

  useEvent.showNewEventDialog = true;
}

</script>
