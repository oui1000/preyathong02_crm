<template>

  <div>
    จำนวนนัดหมายวันนี้: {{ useEvent.events.filter(e => new Date(e.time.start).toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10)).length }} รายการ 
    สถานะ: 
    <span v-if="useEvent.dueStatus === 0">ยังไม่ได้โทร</span>
    <span v-else-if="useEvent.dueStatus === 1">โทรแล้ว</span>
    <span v-else>ไม่ทราบสถานะ</span>
  </div>

  <Qalendar
    :events="useEvent.events"
    :config="config"
    @edit-event="editEvent"
    @event-was-clicked="showEvent"
  />

  <ShowEditEventDialog
    :dialogEdit="dialogEdit"
    :event="useEvent.event"
    @update:dialogEdit="dialogEdit = $event"
  />
<!-- @update:dialogEdit emit ออกมาจาก component ลูก -->

  <!-- <v-dialog v-model="dialogEdit" max-width="500">
        <v-card>
          <v-container>
            <v-form @submit.prevent="editEvent">
              <v-text-field v-model="title"
                type="text"
                label="ชื่อเรื่อง (required)"></v-text-field>
              <v-text-field v-model="description"
                type="text"
                label="รายละเอียด"></v-text-field>
              <v-text-field v-model="start" type="date"
                label="วันที่เริ่ม (required)"></v-text-field>
              <v-text-field v-model="end" type="date"
                label="วันที่สิ้นสุด (required)"></v-text-field>
              <v-text-field v-model="color" type="color" label="สี (click to open color menu)"></v-text-field>
              <v-btn type="submit" color="success" class="mr-4" @click.stop="dialogEdit = false">
                บันทึกข้อมูล
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
  </v-dialog> -->

</template>

<script setup>

import { Qalendar } from "qalendar";
import { ref ,onMounted } from "vue";
import { useEventStore } from '../stores/eventStore'; //pin store
import ShowEditEventDialog from "./ShowEditEventDialog.vue";

    const useEvent = useEventStore(); //pin store => useEventStore

    let dialogEdit = ref(false);
   //let dialog = ref(false);

    // let title = ref('');
    // let description = ref('');
    // let start = ref('');
    // let end = ref('');
    // let color = ref('');

    const config = ref( {
            // see configuration section
            week: {
                // Takes the value 'sunday' or 'monday'
                // However, if startsOn is set to 'sunday' and nDays to 5, the week displayed will be Monday - Friday
                startsOn: 'monday',
                // Takes the values 5 or 7.
                nDays: 7,
                // Scroll to a certain hour on mounting a week. Takes any value from 0 to 23.
                // This option is not compatible with the 'dayBoundaries'-option, and will simply be ignored if custom day boundaries are set.
                scrollToHour: 5,
              },
            month: {
                // Hide leading and trailing dates in the month view (defaults to true when not set)
                showTrailingAndLeadingDates: false,
              },
              // Takes any valid locale that the browser understands. However, not all locales have been thorougly tested in Qalendar
              // If no locale is set, the preferred browser locale will be used
            locale: 'th-TH',
            style: {
                // When adding a custom font, please also set the fallback(s) yourself
                //fontFamily: 'Nunito', sans-serif,
                fontSize: "20px",
              },
              // if not set, the mode defaults to 'week'. The three available options are 'month', 'week' and 'day'
              // Please note, that only day and month modes are available for the calendar in mobile-sized wrappers (~700px wide or less, depending on your root font-size)
            defaultMode: 'month',
              // The silent flag can be added, to disable the development warnings. This will also bring a slight performance boost
            isSilent: true,
            showCurrentTime: true, // Display a line indicating the current time
            eventDialog: {
                isDisabled: true // Disable the event dialog
            },

    })

    // let events = ref(useEvent.events); //store data from store

    //component mounted
    onMounted(async () => {
      //await useEvent.fetchEvents('PT-0002'); //fetch data from store
      //events = ref(useEvent.events);
    });

    // let colors = ref([
    //   { name: 'red', value: '#ff0000' },
    //   { name: 'green', value: '#00ff00' },
    //   { name: 'blue', value: '#0000ff' },
    //   { name: 'yellow', value: '#ffff00' },
    //   { name: 'purple', value: '#800080' },
    //   { name: 'orange', value: '#ffa500' },
    //   { name: 'pink', value: '#ffc0cb' },
    //   { name: 'brown', value: '#a52a2a' },
    //   { name: 'black', value: '#000000' },
    //   { name: 'white', value: '#ffffff' },
    // ]);

    // const randomColorText = () => {
    //   const randomIndex = Math.floor(Math.random() * colors.value.length);
    //   return colors.value[randomIndex].value;
    // };

    // const randomColorName = () => {
    //   const randomIndex = Math.floor(Math.random() * colors.value.length);
    //   return colors.value[randomIndex].name;
    // };

    // const genEvents = () => {
    //   const currentMonth = new Date().getMonth();
    //   const currentYear = new Date().getFullYear();
    //   const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    //   events.value = [];

    //   for (let i = 0; i < 20; i++) {
    //     const day = Math.floor(Math.random() * daysInMonth) + 1;
    //     const startHour = Math.floor(Math.random() * 24);
    //     const endHour = startHour + Math.floor(Math.random() * 3) + 1;

    //     events.value.push({
    //       title: `นัดลูกค้าบริษัท-${i + 1}`,
    //       with: `Person ${i + 1}`,
    //       time: {
    //         start: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(startHour).padStart(2, '0')}:00`,
    //         end: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(endHour).padStart(2, '0')}:00`
    //       },
    //       color: randomColorName(),
    //       isEditable: false,
    //       id: Math.random().toString(36).substring(2, 9),
    //       description: `Description for event ${i + 1}`
    //     });
    //   }
    // };



    const showEvent = ({ clickedEvent, eventElement }) => {

      //console.log('click show event => ', clickedEvent);
      //console.log(clickedEvent.id);


      let id = clickedEvent.id; //get id from event

      let event = useEvent.events.find((event) => event.id === id);
      //แปลง event ให้เป็น object ธรรมดา
      let newEvent = JSON.parse(JSON.stringify(event));


       console.log('show event bf => ', newEvent);


      useEvent.event = newEvent;

      useEvent.event.time.start = new Date(useEvent.event.time.start).toISOString().slice(0, 10)
      useEvent.event.time.end = new Date( useEvent.event.time.end).toISOString().slice(0, 10)
      useEvent.event.time.teldate = new Date( useEvent.event.time.teldate).toISOString().slice(0, 10)
      useEvent.event.time.duedate = new Date(useEvent.event.time.duedate).toISOString().slice(0, 10)
      useEvent.event.time.calldate = new Date(useEvent.event.time.calldate).toISOString().slice(0, 10)


      setTimeout(() => {
        console.log('show event af => ',useEvent.event);
        useEvent.showEventDialog = true;
      }, 200);


    };

    const editEvent = () => {

      //console.log(event);

      setTimeout(() => {

        dialogEdit.value = false;

        console.log('edit event => ',dialogEdit);

      }, 500);

    }

    // const addEvent = () => {
    //   console.log('add event');
    //   alert('add event');
    //   dialogEdit = false;
    // }


</script>

<style>
  @import "qalendar/dist/style.css";
  .calendar-month__day-date {
    font-size: 1.4rem !important;
  }
  .calendar-month__event{
    font-size: 0.8rem !important;
  }
  .calendar-month__event-color{
    width: 30px !important;
    height: 30px !important;
  }
</style>
