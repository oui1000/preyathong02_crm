<template>
  <v-container>
    <v-date-picker
      v-model="selectedDate"
      @update:modelValue="onDateChange"
    />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: null,
    };
  },
  methods: {
    onDateChange(newDate) {
      console.log("Selected date:", newDate);
      // Handle the date change logic here
    },
  },
};
</script>
