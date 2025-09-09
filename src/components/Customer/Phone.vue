<template>
  <div>

    <button @click="callPhoneNumber">
      <v-icon>mdi-phone</v-icon><br>
      {{ props.phoneNumber }}
    </button>
  </div>
</template>

<script setup>
import parsePhoneNumber from 'libphonenumber-js'
import { defineProps } from 'vue'

const props = defineProps({
  phoneNumber: {
    type: String,
    required: true
  }
});

const callPhoneNumber=()=> {
    //TH = +66
    //sample phone number = 0819243650

    // const test_phone = "0819243650";
    // //for text
    // const phoneNumber = parsePhoneNumber(test_phone, 'TH')
    // if (phoneNumber) {
    //   console.log(phoneNumber.country === 'TH')
    //   console.log(phoneNumber.number === '+66819243650') // E.164 format ตัด 0 อยู่หน้าสุด แล้วเพิ่ม +66
    //   console.log(phoneNumber.isPossible() === true)
    //   console.log(phoneNumber.isValid() === true)
    //   // Note: `.getType()` requires `/max` metadata: see below for an explanation.
    //   console.log(phoneNumber.getType() === 'MOBILE')
    // }

    //const phoneNumber = parsePhoneNumber(props.phoneNumber, 'TH')
    // if (phoneNumber) {
    //   phoneNumber.country === 'TH'
    //   phoneNumber.number === '1234567890'
    //   phoneNumber.isPossible() === true
    //   phoneNumber.isValid() === true
    //   // Note: `.getType()` requires `/max` metadata: see below for an explanation.
    //   phoneNumber.getType() === 'TOLL_FREE'
    // }

    //สร้างตัวแปร phoneNumber ใหม่ แล้วใส่เบอร์โทรที่ได้จาก props.phoneNumber แล้วตัดเลข 0 ออก แล้วเพิ่ม +66 ไปด้านหน้า
    const phoneNumber = parsePhoneNumber(props.phoneNumber, 'TH')

    // alert(`Calling ${phoneNumber.number}`)

    // return;

      //window.location.href = 'tel:+1234567890';
      window.location.href = `tel:${phoneNumber.number}`;
}

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
}
</style>
