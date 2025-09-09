<template>
  <v-card class="pa-4" outlined>

    <v-card-text>

      <v-row>

        <v-col cols="12" md="12">
          <v-textarea
            v-model="saleOrderStore.saleorder.rawInfomationBeforeSplit"
           rows="5"
           label="ที่อยู่(กระจายที่อยู่)"
           outlined></v-textarea>
        </v-col>
      </v-row>

       <v-row class="mt-0">

        <v-col cols="12" md="4" xl="2">
          <v-btn color="info" style="width:140px;" @click="confirmSplitAddress">
            <v-icon left>mdi-check</v-icon>กระจายที่อยู่
          </v-btn>
        </v-col>

      </v-row>

      <v-row class="mt-0">
        <v-col cols="12">
          <v-alert type="warning"
            v-model ="dialog3"
            text="split_error"
          outlined>
          </v-alert>
        </v-col>
      </v-row>

    </v-card-text>


    <v-row>
      <!-- <v-col cols="12" md="2">
        <label for="txtdocno" class="col-form-label">เลขที่เอกสาร</label>
      </v-col> -->
      <v-col cols="12" md="4" xl="2">
        <v-text-field v-model="saleOrderStore.saleorder.docno"
               type="text"

               label="เลขที่เอกสาร"
               >
               </v-text-field>
      </v-col>
      <!--

       readonly="readonly"

      <v-col cols="12" md="2">
        <label for="txtdocdate" class="col-form-label">วันที่เอกสาร</label>
      </v-col> -->
      <v-col cols="12" md="4" xl="2">
         <!-- <v-text-field v-model="saleOrderStore.saleorder.docdate"
               type="date"
               required

                class="requierd-text"
               label="วันที่สั่งสินค้า"></v-text-field> -->

        <v-date-input
          label="วันที่บิลขาย"
          v-model="docdate"
          @update:modelValue="onDocdateChange"
          readonly="readonly"

        >
      </v-date-input>
      </v-col>
    </v-row>

    <v-row>
      <!-- <v-col cols="12" md="2">
        <label for="combobilltype" class="col-form-label">ประเภทการขาย</label>
      </v-col> -->
      <v-col cols="12" md="4" xl="2">
        <v-select id="combobilltype"
         label="ประเภทการขาย"
        :items="billTypes"
        class="requierd-text"
        v-model = "saleOrderStore.saleorder.billtype"
        item-title = "text"
        item-value = "value"
        outlined></v-select>
      </v-col>
      <v-col cols="12" md="4" xl="2">
        <v-date-input
          label="วันที่นัดครั้งถัดไป"
          v-model="nextDuedate"
          @update:modelValue="onNextDuedateChange"
          class="requierd-text"
        >
        </v-date-input>
      </v-col>
    </v-row>

    <v-row>
      <!-- <v-col cols="12" md="2">
        <label for="txtarcode" class="col-form-label">รหัสลูกค้า</label>
      </v-col> -->
      <v-col cols="12" md="4" xl="2">
        <v-text-field
               type="text"
               v-model = "saleOrderStore.saleorder.arcode"
               readonly="readonly"
               label="รหัสลูกค้า">
               </v-text-field>
        <!-- <Phone :phoneNumber="saleOrderStore.saleorder.arcode"></Phone> -->
      </v-col>
      <!-- <v-col cols="12" md="2">
        <label for="txtarname" class="col-form-label">ชื่อลูกค้า</label>
      </v-col> -->
      <v-col cols="12" md="4" xl="4">
        <v-text-field
                v-model = "saleOrderStore.saleorder.arname"
               type="text"

               readonly="readonly"
               label="ชื่อลูกค้า">
               </v-text-field>
      </v-col>
    </v-row>

    <!-- <v-row>
      <v-col cols="12" md="2">
        <label for="txtdeliverypoint" class="col-form-label">รหัสที่ส่ง</label>
      </v-col>
      <v-col cols="12" md="4" xl="2">
        <v-text-field
        id="txtdeliverypoint"
        v-model="saleOrderStore.saleorder.deliverypoint"
        disabled outlined></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <label for="txtdeliverypointname" class="col-form-label">ชื่อสถานที่ส่งสินค้า</label>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
        id="txtdeliverypointname"
        v-model="saleOrderStore.saleorder.deliverypointname"
        outlined></v-text-field>
      </v-col>
    </v-row> -->

    <v-row>
      <!-- <v-col cols="12" md="2">
        <label for="txtdeliveryaddress" class="col-form-label">สถานที่ส่งสินค้า</label>
      </v-col> -->
      <v-col cols="12" md="10">
        <v-textarea
         id="txtdeliveryaddress"
         label="สถานที่ส่งสินค้า"
          class="requierd-text"
          :rules="[value => !!value || 'กรุณากรอกสถานที่ส่งสินค้า']"
          :counter="200"
          maxlength="200"
         readonly="readonly"
          v-model="saleOrderStore.saleorder.deliveryaddress"
        rows="3" outlined></v-textarea>
      </v-col>
    </v-row>

    <v-row>
      <!-- <v-col cols="12" md="2">
        <label for="txtdeliverytelephone" class="col-form-label">เบอร์โทร</label>
      </v-col> -->
      <v-col cols="12" md="2">
        <v-text-field
        id="txtdeliverytelephone"
        label="เบอร์โทร"
        v-model="saleOrderStore.saleorder.deliverytelephone"
        outlined></v-text-field>
      </v-col>
      <!-- <v-col cols="12" md="2">
        <label for="combosaleman" class="col-form-label">พนักงานขาย</label>
      </v-col> -->
      <v-col cols="12" md="4" xl="2">
        <v-select id="combosaleman"
        :items="eventStore.saleman"
         label="พนักงานขาย"
         readonly="readonly"
         class="requierd-text"
        item-title="name"
        item-value="code"
        v-model="saleOrderStore.saleorder.salecode"
        outlined></v-select>
      </v-col>
    </v-row>

    <v-row>
      <!-- <v-col cols="12" md="2">
        <label for="combopaytype" class="col-form-label">การชำระเงิน</label>
      </v-col> -->
      <v-col cols="12" md="4" xl="2">
        <v-select id="combopaytype"
        :items="payTypeItems"
          label="การชำระเงิน"
        v-model="saleOrderStore.saleorder.paytype"
        item-title="text"
        item-value="value"
        outlined></v-select>
      </v-col>
      <!-- <v-col cols="12" md="2">
        <label for="combobookbank" class="col-form-label">บัญชีที่รับโอน</label>
      </v-col> -->
      <v-col cols="12" md="4" xl="2">
        <v-select id="combobookbank"
         label="บัญชีที่รับโอน"
         readonly="readonly"
        :items="bankAccounts"
        outlined></v-select>
      </v-col>
      <!-- <v-col cols="12" md="2">
        <label for="txtamount" class="col-form-label">จำนวนเงิน</label>
      </v-col> -->
      <v-col cols="12" md="2" xl="2">
        <v-text-field
        id="txtamount"
         label="จำนวนเงิน"
         class="requierd-text"
        v-model="saleOrderStore.saleorder.totalamount"
        @update:modelValue="handleChangeTotalAmount"
        outlined></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div class="card-header " style="background-color: #4CAF50; color: white;">
            <label for="txtdocno" class="col-form-label">รายละเอียดการจัดส่ง</label>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <!-- <v-col cols="12" md="2">
        <label for="txtdocno" class="col-form-label">ขนส่ง</label>
      </v-col> -->
      <v-col cols="12" md="4" xl="2">
        <v-select id="combologistic"
         label="ขนส่ง"
        :items="logisticItems"
        v-model="saleOrderStore.saleorder.logisticcode"
        item-title="text"

        item-value="value"
        outlined></v-select>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4" xl="2">
        <v-select id="combocity"
        :items="saleOrderStore.province"
        label ="จังหวัด"
        v-model="saleOrderStore.saleorder.city"
        item-title="text"
        item-value="value"
        readonly
         @update:modelValue="handleChangeCity"
        outlined></v-select>
      </v-col>

      <v-col cols="12" md="4" xl="2">
        <v-select id="comboarea"
        :items="saleOrderStore.area"
        label ="อำเภอ"
        v-model="saleOrderStore.saleorder.area"
        item-title="text"
        item-value="value"
        readonly
         @update:modelValue="handleChangeArea"
        outlined></v-select>
      </v-col>

      <v-col cols="12" md="4" xl="2">
        <v-text-field
          id="txtpostcode"
          label="รหัสไปรษณีย์"
          readonly
          v-model="saleOrderStore.saleorder.postcode"
          outlined></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4" xl="2">
        <v-select id="combocity"
        :items="WarehouseItems"
        label ="คลังสินค้า"
        v-model="saleOrderStore.saleorder.whcode"
        item-title="text"
        item-value="value"
        readonly
        outlined></v-select>
      </v-col>

      <v-col cols="12" md="4" xl="2">
        <!-- <v-text-field v-model="saleOrderStore.saleorder.deliverydate"
               type="date"
               required
                class="requierd-text"
               label="คาดว่าจะแพ็คส่งสินค้า"></v-text-field> -->

        <v-date-input
          label="คาดว่าจะแพ็คส่งสินค้า"
          v-model="deliveryDate"
          @update:modelValue="onDeliveryDateChange"
          class="requierd-text"
        >
        </v-date-input>
      </v-col>


    </v-row>

    <!-- <v-row>
      <v-col cols="12" md="4" xl="2">
        <v-number-input
          v-model="value"
          label="จำนวน"
          min="1"
          max="100"
          step="1"
          variant="solo-filled"
          hide-input="false"
          control-variant="split"
        />
        <div>ค่าที่เลือก: {{ value }}</div>
      </v-col>
    </v-row> -->


    <v-row>
      <!-- <v-col cols="12" md="2">
        <label for="txtremark" class="col-form-label">หมายเหตุ</label>
      </v-col> -->
      <v-col cols="12" md="10">
        <v-textarea id="txtremark"
         label="หมายเหตุ"
         class="requierd-text"
        v-model ="saleOrderStore.saleorder.mydescription"
        rows="5" outlined></v-textarea>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="2">
        <button type="button"
          @click="showItemModal()"
        style="width:160px; background-color: #4CAF50; color: white; border: none; padding: 10px; border-radius: 5px;">
                                    <i class="fas fa-search-plus" aria-hidden="true">&nbsp;เลือกสินค้า</i>
                                </button>

      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="12">

          <v-data-table
                  v-model:search="search"
                  :headers="headers"
                  :items="saleOrderStore.saleorderItems"
                  :items-per-page="25"
                  hide-default-footer

                >
                  <template v-slot:header.stock>
                    <!-- <div class="text-end">Stock</div> -->
                  </template>

                  <template v-slot:item.itemname="{ item }">
                    <v-chip :color="getRandomColor()" class="text-start">
                      {{ item.itemname }}
                    </v-chip>
                  </template>

                  <template v-slot:item.qty="{ item }">

                    <v-number-input
                      :reverse="false"
                      control-variant="default"
                      :hide-input="false"
                      :inset="false"
                      variant="solo-filled"
                      v-model="item.qty"
                      label="จำนวน"
                      :min="1"
                      :max="9999"
                      :step="1"
                      @update:modelValue="val => {
                        // item.qty is already updated to val
                        // Calculate new cansale_qty
                        const acc = Number(item.acc_qty) || 0;
                        const reserve = Number(item.reserve_qty) || 0;
                        const old = Number(item.old_qty) || 0;
                        const qty = Number(val) || 0;
                        item.cansale_qty = acc - reserve + old - qty;
                        item.cansale_status_text = item.cansale_qty > 0 ? 'ขายได้' : 'สินค้าไม่พอขาย';
                      }"
                      class="text-center"
                      style="text-align: center;"
                    >
                      <!-- {{ item.qty }} -->
                    </v-number-input>

                    <!-- <div class="text-end">{{ item.qty > 0 ? new Intl.NumberFormat().format(item.qty) : '' }}</div> -->
                  </template>

                     <template v-slot:item.acc_qty="{ item }">
                    <div class="text-end">{{ item.acc_qty > 0 ? new Intl.NumberFormat().format(item.acc_qty) : '' }}</div>
                    </template>

                    <template v-slot:item.reserve_qty="{ item }">
                      <div class="text-end">{{ item.reserve_qty > 0 ? new Intl.NumberFormat().format(item.reserve_qty) : '' }}</div>
                    </template>

                    <template v-slot:item.cansale_qty="{ item }">
                      <div class="text-end">
                        {{ new Intl.NumberFormat().format(item.cansale_qty) }}
                      </div>
                    </template>

                    <template v-slot:item.cansale_status_text="{ item }">
                      <v-chip
                        :color="item.cansale_status_text === 'ขายได้' ? 'green' : 'red'"
                        dark
                        class="text-center"
                      >
                        {{ item.cansale_status_text }}
                      </v-chip>
                    </template>

                  <template v-slot:item.action="{ item, index }">
                    <v-btn icon color="red" @click="handleDeleteItem(item)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>

        </v-data-table>


      </v-col>
    </v-row>

    <v-row>
      <!-- <v-col cols="12" md="2">
        <label for="txtsumofitemamount" class="col-form-label">รวมจำนวนเงิน</label>
      </v-col> -->
      <v-col cols="12" md="2">
        <v-text-field
        id="txtamount"
         label="จำนวนเงินรวม"
         class="requierd-text"
        v-model="saleOrderStore.saleorder.totalamount"
        @update:modelValue="handleChangeTotalAmount"
        outlined></v-text-field>
      </v-col>
    </v-row>

     <v-row>
      <!-- <v-col cols="12" md="2">
        <label for="txtfreeamount" class="col-form-label">ค่าขนส่ง</label>
      </v-col> -->
      <v-col cols="12" md="2">
        <v-text-field
          id="txtfreeamount"
           label="ค่าขนส่ง"
          v-model="saleOrderStore.saleorder.freeamount"
          readonly
          outlined></v-text-field>
      </v-col>
    </v-row>

     <v-row>
      <!-- <v-col cols="12" md="2">
        <label for="txtnetamount" class="col-form-label">ยอดเงินที่ต้องชำระ</label>
      </v-col> -->
      <v-col cols="12" md="2">
        <v-text-field
          id="txtnetamount"
           label="ยอดเงินที่ต้องชำระ"
          color="primary"
          v-model="saleOrderStore.saleorder.netamount"
          readonly
           class="requierd-text"
          outlined></v-text-field>
      </v-col>
    </v-row>

    <v-row>
       <v-col cols="12" md="4" xl="2">
          <v-btn color="success" style="width:160px; padding: 15px; height: 45px; border-radius: 5; font-weight: 600;" @click="confirmSaveData">
            <v-icon left>mdi-check</v-icon>บันทึกข้อมูล
          </v-btn>
        </v-col>
    </v-row>

  </v-card>

  <ShowAddNewItem />

  <v-dialog
      v-model="dialog2"
       min-width="250"
       max-width="600"
    >
      <v-card title="ยืนยัน" color="orange">
        <template v-slot:text>
            <h2>
              ต้องการกระจายที่อยู่ใช่หรือไม่?
            </h2>
        </template>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn

            class="my-2"
            text="OK"
            width="120"
            @click="handleSplitAddress"
          ></v-btn>
          <v-btn
            text="Close"
            variant="text"
            @click="dialog2 = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

     <v-dialog
      v-model="dialog_save"
       min-width="250"
       max-width="600"
    >
      <v-card title="ยืนยัน" color="green">
        <template v-slot:text>
            <h2>
              ต้องการบันทึกข้อมูลใช่หรือไม่?
            </h2>
        </template>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn

            class="my-2"
            text="OK"
            width="120"
            @click="handleSaveData"
          ></v-btn>
          <v-btn
            text="Close"
            variant="text"
            @click="dialog_save = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

     <!-- <v-dialog
      v-model="dialog_delete_item"
       min-width="250"
       max-width="600"
    >
      <v-card title="ยืนยัน" color="green">
        <template v-slot:text>
            <h2>
              ต้องการบันทึกข้อมูลใช่หรือไม่?
            </h2>
        </template>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn

            class="my-2"
            text="OK"
            width="120"
            @click="handleSaveData"
          ></v-btn>
          <v-btn
            text="Close"
            variant="text"
            @click="dialog_delete_item = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->

    <v-dialog
      v-model="dialog_error"
       min-width="250"
       max-width="600"
    >
      <v-card title="Error" color="red">
        <template v-slot:text>
            <h4>
              {{ split_error }}
            </h4>
        </template>

        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn

            class="my-2"
            text="OK"
            width="120"
            @click="handleSplitAddress"
          ></v-btn> -->
          <v-btn
            text="Close"
            variant="text"
            @click="dialog_error = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

     <v-dialog
      v-model="dialog_complete"
       min-width="250"
       max-width="600"
    >
      <v-card title="complete" color="green">
        <template v-slot:text>
            <h4>
              {{ split_error }}
            </h4>
        </template>

        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn

            class="my-2"
            text="OK"
            width="120"
            @click="handleSplitAddress"
          ></v-btn> -->
          <v-btn
            text="Close"
            variant="text"
            @click="dialog_complete = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>

<script setup>
import { ref , watch ,onMounted } from 'vue';
import { defineProps } from 'vue';

import { useSaleOrderStore } from '@/stores/saleOrderStore'; //pin store
import ShowAddNewItem from '@/components/Sales/ShowAddNewItem.vue';
import { useEventStore } from '@/stores/eventStore';
import Phone from '@/components/Customer/Phone.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const saleOrderStore = useSaleOrderStore(); //pin store => saleOrderStoreStore
const eventStore = useEventStore(); //pin store => eventStore

const headers = [
    {
      title: 'รหัสสินค้า',
      align: 'start',
      sortable: false,
      value: 'itemcode',
    },
    { title: 'ชื่อสินค้า', value: 'itemname',align: 'start', },
    { title: 'หน่วยนับ', value: 'unitcode',align: 'start', },
    { title: 'จำนวนสั่ง', value: 'qty',align: 'end', },
    { title: 'จำนวนคงเหลือ', value: 'acc_qty',align: 'end', },
    { title: 'จำนวนค้างสั่ง', value: 'reserve_qty',align: 'end', },
    { title: 'จำนวนขายได้', value: 'cansale_qty',align: 'end', },
    { title: 'สถานะการขาย', value: 'cansale_status_text',align: 'center', },
    {
      title: 'Action',
      value: 'action',
      align: 'center',
      sortable: false,
    },
    // { title: 'ราคา/หน่วย', value: 'price',align: 'end', },
    // { title: 'ส่วนลด/หน่วย', value: 'discount',align: 'end', },
    // { title: 'จำนวนเงินรวม', value: 'amount',align: 'end', },
  ];

// const docno = ref('');
// const docdate = ref('');
const arcode = ref('');
const arname = ref('');
let split_error = ref('');

const dialog_error = ref(false);
const dialog_save = ref(false);
const dialog_complete = ref(false);

const docdate = ref(new Date(saleOrderStore.saleorder.docdate))
const nextDuedate = ref(new Date(saleOrderStore.saleorder.nextduedate));
const deliveryDate = ref(new Date(saleOrderStore.saleorder.deliverydate));


//formload
onMounted(async () => {

    //alert("แก้ไขสั่งขาย");

  await saleOrderStore.fetchAllProducts();
  await saleOrderStore.fetchCity();


    console.log('eventStore.saleman', eventStore.saleman);
    saleOrderStore.sale = eventStore.sale; // Set default salecode to first saleman
    saleOrderStore.saleorder.salecode = eventStore.sale.code

    saleOrderStore.clearText(); // Clear the text fields in the store
    saleOrderStore.fetchSaleOrderRunning();


});

watch(
  () => saleOrderStore.saleorder.nextduedate,
  (newVal) => {
    if (newVal) {
      nextDuedate.value = new Date(newVal)
    }
  }
)

watch(
  () => saleOrderStore.saleorder.docdate,
  (newVal) => {
    if (newVal) {
      docdate.value = new Date(newVal)
    }
  }
)

watch(
  () => saleOrderStore.saleorder.deliverydate,
  (newVal) => {
    if (newVal) {
      deliveryDate.value = new Date(newVal)
    }
  }
)

const onDocdateChange = async (newDate) => {
  //console.log('New date selected:', newDate);
  if (newDate) {
    saleOrderStore.saleorder.docdate = newDate;
    console.log('New date selected:',saleOrderStore.saleorder.docdate);

  }
}

const onNextDuedateChange = async (newDate) => {
  //console.log('New date selected:', newDate);
  if (newDate) {
    saleOrderStore.saleorder.nextduedate =  newDate
    console.log('New date selected:  nextduedate',saleOrderStore.saleorder.nextduedate);

  }
}

const onDeliveryDateChange = async (newDate) => {
  //console.log('New date selected:', newDate);
  if (newDate) {
    saleOrderStore.saleorder.deliverydate = newDate
    console.log('New date selected:',saleOrderStore.saleorder.deliverydate);

  }
}


const billTypes = ref([
 { text: 'สินค้าเงินสด', value: 0 },
 { text: 'สินค้าเงินเชื่อ', value: 1 },
 { text: 'บริการเงินสด', value: 2 },
 { text: 'บริการเงินเชื่อ', value: 3 },
 { text: 'เคลมสินค้า', value: 4 },
]);

const payTypeItems = ref([
 { text: 'โอนเข้าบัญชีธนาคาร', value: 0 },
 { text: 'COD', value: 1 },
]);

const logisticItems = ref([
 { text: 'J&T Express', value: '01' },
//  { text: 'Kerry Express', value: '02' },
//  { text: 'SCG Express', value: '03' },
//  { text: 'Flash Express', value: '04' },
//  { text: 'Nim Express', value: '05' },
//  { text: 'Thai Post', value: '06' },
]);

const WarehouseItems = ref([
 { text: 'คลัง สนง.ใหญ่', value: '01' },

]);

const handleDeleteItem = (item) => {
    // This function will handle the deletion of a sale order item
    console.log('Deleting item:', item);
    saleOrderStore.deleteItemOrder(item);
};

const handleChangeTotalAmount = async () => {
    // This function will handle the change in total amount
    console.log('Total amount changed:', saleOrderStore.saleorder.totalamount);
    saleOrderStore.saleorder.netamount = parseFloat(saleOrderStore.saleorder.totalamount) + parseFloat(saleOrderStore.saleorder.freeamount);

    // You can add any additional logic here if needed
    // For example, you might want to update some other state or perform a calculation
};

const handleChangeCity = async () => {
    console.log('combocity.value', saleOrderStore.saleorder.city);


    setTimeout(async() => {
      await saleOrderStore.fetchArea(saleOrderStore.saleorder.city);
    }, 1000);
};

const handleChangeArea= async () => {

    console.log('combocity.value', saleOrderStore.saleorder.area);


    setTimeout(async() => {
      await saleOrderStore.fetchPostalCode();
    }, 1000);
};

const getRandomColor = () => {
    const colors = ['primary',];
    return colors[Math.floor(Math.random() * colors.length)];
};

const confirmSaveData = async () => {
  // This function can be used to confirm the save data action
   console.log('Confirm save data action');

   /*
    var xx = checkrunning();
            if (xx === true) {
                //alert("เลขที่เอกสารซ้ำระบบจะ Running ให้ใหม่ คลิก Save อีกครั้ง");
                astring.showMessage2("เลขที่เอกสารซ้ำระบบจะ Running ให้ใหม่ คลิก Save อีกครั้ง", "1");
                getrunning();
                return false;
            }
   */

   // check dup docno ****
  //let isDuplicate = await saleOrderStore.checkDuplicateDocno();
  //   console.log('isDuplicate:', isDuplicate);
  //  if (isDuplicate) {
  //      console.log('Duplicate docno found');

  //    await saleOrderStore.fetchSaleOrderRunning2(); // Get a new running docno

  //     // split_error.value = "เลขที่เอกสารซ้ำ ระบบจะ Running ให้ใหม่ คลิก Save อีกครั้ง";
  //     // dialog_error.value = true; //show error dialog
  //     // return;

  //     setTimeout(() => {
  //       // split_error.value = "เลขที่เอกสารซ้ำ ระบบจะ Running ให้ใหม่ คลิก Save อีกครั้ง";
  //       // dialog_error.value = true; //show error dialog

  //       dialog_save.value= true; //show confirm dialog

  //     }, 1000);

  //  }else{
  //     dialog_save.value= true; //show confirm dialog
  //  }

   // ตรวจสอบว่าสินค้าใน saleorderItems ที่ groupcode !== '02' และ cansale_qty < 0 หรือไม่
  const invalidItems = saleOrderStore.saleorderItems.filter(
    item => item.groupcode !== '02' && Number(item.cansale_qty) < 0
  );
  if (invalidItems.length > 0) {
    const names = invalidItems.map(item => item.itemname).join(', ');
    alert(`สินค้าเหล่านี้มีจำนวนไม่พอขาย: ${names} กรุณาตรวจสอบ`);
    return;
  }

  dialog_save.value= true; //show confirm dialog


};

const handleSaveData = async () => {

  // This function will handle the save data logic
  console.log('Handling save data...');

  dialog_save.value = false;

  //alert("xxxx")

  // Call the myGenOrder2 function to process the order
  let result  = await saleOrderStore.saveOrder();

  //alert("result >>> " + result);

  if(result){
    if (result=="true") {

      //alert("บันทึกข้อมูลสั่งขายเรียบร้อยแล้ว");
      split_error.value = "บันทึกใบสั่งขายเรียบร้อยแล้ว";
      dialog_complete.value = true; //show complete dialog

       // after 1 second, close the dialog_complete add new appointment
      // setTimeout(async () => {
      //   let result2= await saleOrderStore.addEvent();
      //   if (result2) {
      //     console.log('Event added successfully');
      //   } else {
      //     console.error('Failed to add event');
      //   }
      // }, 1000); // Close the dialog after 1 second

      // setTimeout(async () => {
      //    await saleOrderStore.fetchSaleOrderByDocno(saleOrderStore.saleorder.docno); // Refresh the sale order data
      // }, 1000); // Close the dialog after 2 seconds

      setTimeout(async () => {

          //router.push('/new_sale_order');
          router.push('/sales'); // Redirect to the sales page

          //$router.back(); // Go back to the previous page

      }, 1000); // Close the dialog after 1 second

    } else {
      split_error.value = "error : " + result;
      dialog_error.value = true; //show error dialog
    }
  }

  //alert("แก้ไขข้อมูลสั่งขายเรียบร้อยแล้ว");

  // Close the dialog after processing

};

const confirmSplitAddress = () => {
  // This function can be used to confirm the split address action
   console.log('Confirm split address action');

   dialog2.value= true; //show confirm dialog
};

const handleSplitAddress = async () => {
  // This function will handle the split address logic
  console.log('Handling split address...');

  // Call the myGenOrder2 function to process the order
  await myGenOrder2();

  // Close the dialog after processing
  dialog2.value = false;
};

const myGenOrder2 = async () => {

  //alert("myGenOrder2")

   dialog3.value = false; //hide error dialog

    let xvalid = await ValidateCustomerInfomation();

        //$("#div_error_status").empty();

        if (xvalid == false) {
            return;
        }

        let strsearch = saleOrderStore.saleorder.rawInfomationBeforeSplit;

        let docno = saleOrderStore.saleorder.docno;

        if (strsearch === "") {
            return;
        }
        if (docno === "") {
            return;
        }

        await myGenOrder();

}

const myGenOrder = async ()=> {

        let strsearch = saleOrderStore.saleorder.rawInfomationBeforeSplit;

        //split ด้วย บรรทัดใหม่ trim ก่อน แล้วเพิ่มช่องว่างต่อท้ายทุกบรรทัด แล้วเอามาต่อกันใหม่ ก่อนส่งไป api
        let strsearch2 = strsearch.split("\n").map(function (x) {
            return x.trim() + " ";
        }).join("");

        saleOrderStore.saleorder.rawInfomationBeforeSplit = strsearch2; //update the store with the new value

        let docno = saleOrderStore.saleorder.docno;

        if (strsearch2 === "") {
            return;
        }
        if (docno === "") {
            return;
        }

        let data = await saleOrderStore.genTemphSaleOrder();

        //alert(data[0].status);

         if (data[0].status !== 'Success') {

                    //astring.showMessage2("Error  : " + data[0].status, 1);
                    split_error.value = "Error  : " + data[0].status;
                    dialog_error.value = true; //show error dialog
              return
          }

          if (data[0].nonitemcode !== '0') {


                    split_error.value =  "ไม่พบรหัสสินค้า จำนวน : " + data[0].nonitemcode + " รายการ กรุณาตรวจสอบ";
                    dialog_error.value = true; //show error dialog

                } else {

                   split_error.value = "";
                   dialog_error.value = false
          }



          await saleOrderStore.fetchTempSaleOrderByDocno(data[0].docno);


          setTimeout(async () => {

            console.log("form load ....... ",saleOrderStore.saleorder.city)

            await saleOrderStore.fetchArea(saleOrderStore.saleorder.city); // Fetch area based on city

          }, 1500);

          //จะใช้งานก็ต่อเมื่อ แก้ไขชื่อ จังหวัด / อำเภอ / รหัสไปรษณีย์ แล้วต้องการตรวจสอบรหัสไปรษณีย์ที่ถูกต้อง
          // let zipcode = await saleOrderStore.fetchCompaireZipCode();
          // await comPairZipcode(zipcode);



  }


  const comPairZipcode = async(data)=> {

          let my_zipcode = "";

                let found = false;

                if (data.length > 0) {

                    let xzipcode = saleOrderStore.saleorder.postcode;

                    for (let i = 0; i < data.length; i++) {

                        let p = data[i];

                        //console.log(p);

                        if (my_zipcode == "") {
                            my_zipcode = p.zip_code;
                        } else {
                            my_zipcode += "," + p.zip_code;
                        }


                        if (p.zip_code === xzipcode) {
                            found = true;
                            break;
                        }
                    }

                    if (!found) {

                        console.log(my_zipcode);

                        split_error.value = "รหัสไปรษณีย์ไม่ตรงกับเขตที่เลือก จังหวัด " + saleOrderStore.saleorder.city_name + " เขต/อำเภอ " + saleOrderStore.saleorder.area_name + " รหัสไปรษณีย์ตามที่ป้อนมา " + xzipcode + " รหัสไปรษณีย์ที่เขตนี้ " + my_zipcode ;

                        dialog_error.value = true; //show error dialog
                    }

                }
  }


 const ValidateCustomerInfomation = async ()=> {

        let rawInfomation = saleOrderStore.saleorder.rawInfomationBeforeSplit;

        /*
        ตัวอย่างข้อมูลชุดที่ 1

        FC4758ภานุพงศ์ สุขโชติ

        0935233355

        ร้านเสียบไฟโบ๋เหวิน 2 บ้านเลขที่ 6 หมู่ 14 ตำบลศรีดอนชัย
        อำเภอเชียงของ
        จังหวัดเชียงราย 57140

        FB : อรสา นามโยธา

        ***ถั่งเช่าใหม่ 3 // มะพร้าว 1 // ของขวัญ 1 // ปลายทาง 500฿ ไม่ลงคืนเงิน

        จะประกอบไปด้วย

        ชื่อลูกค้า
        เบอร์โทร ให้ใช้เบอร์โทรเป็นรหัสลูกค้าด้วย
        ที่อยู่
        ชื่อเฟสบุ๊ค
        รายการสินค้า และ จำนวนสั่งซื้อ และ ยอดเงินที่ต้องชำระ และ รายละเอียดเพิ่มเติม
        **********************************************************

        ตัวอย่างข้อมูลชุดที่ 2

        4970คุณภานุพงศ์ สุขโชติ
        0935233355
        152 ม.10 บ้านน้ำดำ ตำบลดอนทอง อำเภอเมือง จังหวัดพิษณุโลก 65000
        ***ถั่งเช่าใหม่ 2 // เขียว 1 // กาแฟดำกล่อง 1 // ปลายทาง 350฿ (แอน)

        ชื่อลูกค้า
        เบอร์โทร ให้ใช้เบอร์โทรเป็นรหัสลูกค้าด้วย
        ที่อยู่
        รายการสินค้า และ จำนวนสั่งซื้อ และ ยอดเงินที่ต้องชำระ และ รายละเอียดเพิ่มเติม

        */

        //let customerInfomation = rawInfomation.split("\n");

        let customerInfomation = rawInfomation.split("\n");

        //function เช็คว่ามีตัวอักษร ฿ หรือไม่ ถ้าไม่มีให้ return false
        let checkBaht = rawInfomation.includes("฿");

        //alert(checkBaht);
        console.log("checkBaht >>> " + checkBaht);
        if (checkBaht == false) {

            let salebilltype = saleOrderStore.saleorder.billtype;

            //alert(salebilltype);

            if (parseInt(salebilltype) < 4) {

                //console.log("กรุณาใส่ตัวอักษร ฿ ในช่องหมายเหตุ");

                split_error = "กรุณาใส่ตัวอักษร ฿ ตามด้วยจำนวนเงิน ในช่อง กระจายที่อยู่";
                dialog3.value = true; //show error dialog

                return false;
                //astring.showMessage2("กรุณาใส่ตัวอักษร ฿ ในช่องหมายเหตุ", 1);
            }
            //astring.showMessage2("ไม่มีตัวอักษร ฿ กรุณาตรวจสอบ", 1);

        }

        //console.log(customerInfomation); //ดู array ที่ได้

        /* array ที่ได้ ตามนี้
         [
            '4970คุณภานุพงศ์ สุขโชติ  ',
            '0935233355  ',
            '152 ม.10 บ้านน้ำดำ ตำบลดอนทอง อำเภอเมือง จังหวัดพิษณุโลก 65000 ',
            '***ถั่งเช่าใหม่ 2 // เขียว 1 // กาแฟดำกล่อง 1 // ปลายทาง 350฿ (แอน)'
           ]
        */

        //วน loop เช็ค array ถ้าข้อมูลว่าง ให้ลบ array นั้นออกไป
        for (let i = 0; i < customerInfomation.length; i++) {
            if (customerInfomation[i] == "") {
                customerInfomation.splice(i, 1);
            }
        }

        //console.log(customerInfomation); //ดู array ที่ได้


        let customerName = customerInfomation[0].trim();  // แน่นอน
        let customerPhone = customerInfomation[1].trim(); // แน่นอน


        //let customerFacebook = customerInfomation[8].trim; ไม่ validate
        //วน loop หา customerOrder มาจาก array ที่มีข้อมูลขึ้นต้นด้วย *
        let customerOrder = "";
        let mark_custumerOrder_index = 0;
        for (let i = 2; i < customerInfomation.length; i++) {
            if (customerInfomation[i].trim().startsWith("**")) {
                customerOrder = customerInfomation[i].trim();
                mark_custumerOrder_index = i;
                break;
            }
        }

        //หาที่อยู่ลูกค้า นับจาก mark_custumerOrder_index ถอยไปจนถึง array ตัวที่ 2 วน loop เอาข้อมูลมาต่อกัน
        //console.log("mark_custumerOrder_index >>> " + mark_custumerOrder_index);
        let customerAddress = "";
        for (let i = 2; i < mark_custumerOrder_index; i++) {

            //console.log("customerInfomation[i].trim() >>> '" + customerInfomation[i].trim()+ "'");

            //ถ้าเจอว่าข้อมูลเป็นตัวท้ายสุดเป็นตัวเลข แสดงว่าเป็น zipcode ให้เอามาต่อกัน  แล้วหยุดวน loop

            let lastChar = customerInfomation[i].trim().substr(customerInfomation[i].trim().length - 1);

            //console.log("lastChar >>> " + lastChar);

            if (lastChar.match(/^\d+$/)) {
                customerAddress += " " + customerInfomation[i].trim();
                break;
            }

            customerAddress += " " + customerInfomation[i].trim();
        }

        //onsole.log("customerAddress >>> " + customerAddress);


        //ตรวจาอบชื่อลูกค้า
        let customerNameStatus = await validateCustomerName(customerName);

        //console.log("customerNameStatus >>> " + customerNameStatus);

        if (customerNameStatus == false) {
            return false;
        }

        //ให้ทำ function validate เบอร์โทรว่าเป็นเบอร์โทรศัพท์หรือไม่ แล้วมีหลักการตรวจสอบเบอร์โทรศัพท์ด้วย ซึ่งจะเป็นเบอร์มือถือ มี 10 หลัก และเริ่มต้นด้วย 0 ตามด้วย 9 หลักต่อไป
        let customerPhoneStatus = await validatePhone(customerPhone);

        //console.log("customerPhoneStatus >>> " + customerPhoneStatus);

        if (customerPhone == false) {
            return false;
        }

        //ตรวจสอบที่อยู่ลูกค้า
        let customerAddressStatus = await validateCustomerAddress(customerPhone, customerAddress);
        if (customerAddressStatus == false) {
            return false;
        }

        return true;

    }

    const validateCustomerAddress= async(arcode, address) =>{

        //console.log("validateCustomerAddress >>> "  + address);


        //address จะต้องไม่เป็น null , undefined หรือ ว่างเปล่า
        if (address == null || address == undefined || address == "") {
            //astring.showMessage2("กรุณากรอกที่อยู่ลูกค้า", 1);
            split_error = "กรุณากรอกที่อยู่ลูกค้า";
            dialog3.value = true; //show error dialog
            return false;
        }

        //digit address จะต้องมากกว่า 10 ตัวอักษร
        if (address.length < 10) {
            //astring.showMessage2("ที่อยู่ลูกค้าต้องมากกว่า 10 ตัวอักษร", 1);
            split_error = "ที่อยู่ลูกค้าต้องมากกว่า 10 ตัวอักษร";
            dialog3.value = true; //show error dialog
            return false;
        }

        //trim address 5 dgit สุดท้าย  รหัสไปรษณีย์ ต้องเป็นตัวเลขเสมอ

        //console.log("zipcode >>> " + zipcode);

        let zipcode = address.substr(address.length - 5);
        zipcode = zipcode.trim();


        // console.log("zipcode >>> " + zipcode);
        // console.log("zipcode length >>> " + zipcode.length);

        //check length zipcode
        if (zipcode.length < 5) {
            //astring.showMessage2("รหัสไปรษณีย์ไม่ครบ หรือ ไม่ถูกต้อง กรุณาตรวจเช็ค", 1);
            split_error = "รหัสไปรษณีย์ไม่ครบ หรือ ไม่ถูกต้อง กรุณาตรวจเช็ค";
            dialog3.value = true; //show error dialog
            return false;
        }

        if (isNaN(zipcode)) {
            //astring.showMessage2("รหัสไปรษณีย์ไม่ครบ หรือ ไม่ถูกต้อง กรุณาตรวจเช็ค", 1);
            split_error = "รหัสไปรษณีย์ไม่ครบ หรือ ไม่ถูกต้อง กรุณาตรวจเช็ค";
            dialog3.value = true; //show error dialog
            return false;
        }

        //return true; // wait for api check again


        // ตรวจเช็คสถานที่ส่งที่เคยส่งมาก่อนหน้านี้หรือไม่ โดย distinct จากที่อยู่ลูกค้า จาก table saleorder แล้วเอาที่อยู่ล่าสุดไปเทียบกับที่อยู่ลูกค้าที่กรอกเข้ามาใหม่ .....  ถ้าไม่ตรงกับของเก่าเลย ให้เตือนว่า ที่อยู่ลูกค้าไม่ตรงกับที่อยู่ที่เคยส่งมาก่อนหน้านี้ ต้องการส่งไปที่ที่อยู่ใหม่หรือไม่
        let data = saleOrderStore.fetchCustomerDeliveryAddress(saleOrderStore.saleorder.arcode);

         //ถ้า array length จาก data มีค่ามากกว่า 0 แสดงว่ามีข้อมูลที่อยู่ที่เคยส่งมาก่อนหน้านี้
                if (data.length > 0) {
                    //วน loop เพื่อเช็คว่าที่อยู่ลูกค้าที่กรอกเข้ามาใหม่ ตรงกับที่อยู่ที่เคยส่งมาก่อนหน้านี้หรือไม่

                    let found = false;

                    for (i = 0; i < data.length; i++) {
                        let p = data[i];
                        //เช็คว่าที่อยู่ลูกค้าที่กรอกเข้ามาใหม่ ตรงกับที่อยู่ที่เคยส่งมาก่อนหน้านี้หรือไม่

                        //console.log(i + ".____pair address >>> " + address + "<==>" + p.deliveryaddress);

                        //rtrim  และ ltrim address เทียบกับ rtrim และ ltrim p.deliveryaddress
                        if (address.trim() == p.deliveryaddress.trim()) {
                            found = true;
                            break;
                        }


                        // if(address == p.deliveryaddress){
                        //     found = true;
                        //     break;
                        // }
                    }

                    //console.log("get delivery address  from server found >>> " + found);

                    if (found == false) {
                        //looping ที่อยู่ ใส่ div_error_status แสดงว่าที่อยู่ลูกค้าไม่ตรงกับที่อยู่ที่เคยส่งมาก่อนหน้านี้


                        let str = "<table class='table table-bordered table-sm'>";
                        str += "<tr>";
                        str += "<th>No.</th>";
                        str += "<th>ที่อยู่ที่เคยส่งมาก่อนหน้านี้</th>";
                        str += "</tr>";

                        for (i = 0; i < data.length; i++) {
                            let p = data[i];

                            let rowid = parseInt(i) + 1;


                            str += "<tr>";
                            str += "<td>" + rowid + "</td>";
                            str += "<td>" + p.deliveryaddress + "</td>";
                            str += "</tr>";


                        }

                        str += "</table>";

                        //ที่อยู่ที่ Gen ได้


                        let str2 = "<table class='table table-bordered table-sm'>";
                        str2 += "<tr>";
                        str2 += "<th>No.</th>";
                        str2 += "<th>ที่อยู่ที Gen ได้</th>";
                        str2 += "</tr>";
                        str2 += "<tr>";
                        str2 += "<td></td>";
                        str2 += "<td>" + address + "</td>";
                        str2 += "</tr>";
                        str2 += "</table>";


                        split_error = str + str2;
                        dialog3.value = true; //show error dialog
                    }

                    //ถ้าไม่ตรงกัน ให้แจ้งเตือนว่า ที่อยู่ลูกค้าไม่ตรงกับที่อยู่ที่เคยส่งมาก่อนหน้านี้ ต้องการส่งไปที่ที่อยู่ใหม่หรือไม่
                    if (found == false) {
                        cc = confirm("ที่อยู่ลูกค้าไม่ตรงกับที่อยู่ที่เคยส่งมาก่อนหน้านี้ ต้องการส่งไปที่ที่อยู่ใหม่หรือไม่");
                        if (!cc) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                } else {
                    return true;
                }

    }

  const validateCustomerName = async(customerName)=> {

        //console.log("valid customerName >>> " + customerName);

        //customerName จะต้องไม่เป็น null , undefined หรือ ว่างเปล่า
        if (customerName == null || customerName == undefined || customerName == "") {
            //astring.showMessage2("กรุณากรอกชื่อลูกค้า", 1);

            split_error = "กรุณากรอกชื่อลูกค้า";
            dialog3.value = true; //show error dialog

            return false;
        }

        //digit customerName จะต้องมากกว่า 5 ตัวอักษร
        if (customerName.length < 5) {
             //astring.showMessage2("ชื่อลูกค้าต้องมากกว่า 5 ตัวอักษร", 1);
            split_error = "ชื่อลูกค้าต้องมากกว่า 5 ตัวอักษร";
            dialog3.value = true; //show error dialog
            return false;
        }

        //เช็คว่าเป็นตัวอักษรหรือตัวเลขหรือไม่ หรือ ภาษาไทยหรือไม่
        // let re = /^[a-zA-Z0-9ก-๙]+$/;

        // let xxx = re.test(customerName);
        // console.log("re.test(customerName) >>> " + xxx);

        // if( xxx == false){
        //     astring.showMessage2("ชื่อลูกค้าต้องเป็นตัวอักษรหรือตัวเลขเท่านั้น", 1);
        //     return false;
        // }

        return true;
    }

  const validatePhone = async(phone) => {

        //console.log("valid phone >>> " + phone);


        //customerName จะต้องไม่เป็น null , undefined หรือ ว่างเปล่า
        if (phone == null || phone == undefined || phone == "") {
            //astring.showMessage2("กรุณากรอกเบอร์โทรศัพท์", 1);
             split_error = "กรุณากรอกเบอร์โทรศัพท์ ลูกค้า";
            dialog3.value = true; //show error dialog
            return false;
        }

        //digit customerName จะต้องมากกว่า 5 ตัวอักษร
        if (phone.length != 10) {
            //astring.showMessage2("เบอร์โทรศัพท์ต้อง 10 ตัวอักษร", 1);
            split_error = "เบอร์โทรศัพท์ต้อง 10 ตัวอักษร";
            dialog3.value = true; //show error dialog
            return false;
        }

        //เช็คว่าเป็นตัวเลขหรือไม่
        if (isNaN(phone)) {
            //astring.showMessage2("เบอร์โทรศัพท์ต้องเป็นตัวเลขเท่านั้น", 1);
            split_error = "เบอร์โทรศัพท์ต้องเป็นตัวเลขเท่านั้น";
            dialog3.value = true; //show error dialog
            return false;
        }

        //เบอร์โทร ต้องขึ้นต้น 0 เสมอ
        if (phone.charAt(0) != "0") {
            //astring.showMessage2("เบอร์โทรศัพท์ต้องขึ้นต้นด้วย 0", 1);
            split_error = "เบอร์โทรศัพท์ต้องขึ้นต้นด้วย 0";
            dialog3.value = true; //show error dialog
            return false;
        }

         dialog3.value = false; //hide error dialog
        return true;
  }


const props = defineProps({
 dialogEdit: {
   type: Boolean,
   default : false,
 },
 event: {
   type: Object,
   default: {},
 },
 docno: {
   type: String,
   default: '',
 },

});

const emit = defineEmits(['update:dialogEdit']);

const dialogEdit = ref(props.dialogEdit);

let dialog2 = ref(false);

let dialog3 = ref(false);

watch(() => props.dialogEdit, (newVal) => {
 dialogEdit.value = newVal;
});

const handleDialog2 = () => {
  dialog2.value = !dialog2.value;
};

const showItemModal = () => {

  saleOrderStore.showNewItemDialog = true;

};


const handleOnConfirm = async () => {

  dialog2.value = false;
  //save event to db
  await saleOrderStore.addEvent(saleOrderStore.saleorder);

  setTimeout(() => {
      saleOrderStore.showNewEventDialog = false;
      saleOrderStore.fetchEvents(saleOrderStore.sale.code);
  }, 1000);

};

const submitEvent = async () => {

//click แล้ว show confirm dialog เฉยๆ จากนั้นจะไปทำ editEvent รับค่าจาก confirmModalDialog อีกที

// console.log("submitEvent");



 //handleBtnSave();


};

</script>

<style scoped>
.requierd-text {
    background-color: pink !important;
}
.text-center {
    text-align: center;
}
</style>

