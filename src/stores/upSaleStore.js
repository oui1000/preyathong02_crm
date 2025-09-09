// Utilities
import { defineStore } from 'pinia'
import axios from 'axios';
// import { id } from 'vuetify/locale';
import { getCookie } from '../utils/cookieUtils';
import { parse } from 'vue/compiler-sfc';



const BaseApiUrl = 'http://preyathong-02.ddns.net/pyt-01/service/crm'
const BaseApiUrl_Product = 'http://preyathong-02.ddns.net/pyt-01/service/inventory'
const BaseApiCRMAdminUrl = 'http://preyathong-02.ddns.net/crm-admin/service/upsale'

//const BaseApiUrl = 'http://localhost:8087/pyt-01/service/crm'


//let userId = "sa"
let userId = getCookie('userid');

if(userId == undefined){
  userId = 'sa'
}

//userId = 'admin'

console.log('User ID:', userId); // For debugging purposes

/*
store ง่ายๆ มี state / actions หรือ functions ที่เป็นฟังก์ชันที่ใช้ในการเปลี่ยนแปลงค่าใน state
*/
export const useUpSaleStore = defineStore('upsale', {
  // State
  state: () => ({
    selectedAll: false,
    select_tel_status_all: false,
    select_upsale_status_all: false,
    countBillTel : 0,
    countUpsaleComplete : 0,
    upSaleDate: new Date().toISOString().slice(0, 10),
    upSaleOrders: [],
    LogOrders : [],
    saleInvoice: {
      docno : "",
      deliveryno : "",
      docdate : new Date().toISOString().slice(0, 10),
      arcode : "",
      arname : "",
      paytype : 0,
      logisticcode : "01",
      logisticname : "",
      remark : "",
      totalamount : 0,
      salecode : "",
      salename : "",
    },
    saleInvoiceItems: [
      // {
      //   id: 0,
      //   docno : "",
      //   docdate : new Date().toISOString().slice(0, 10),
      //   whcode : "",
      //   shelfcode : "",
      //   linenumber: 0,
      //   itemcode: "",
      //   itemname: "",
      //   qty: 0,
      //   price: 0,
      //   amount: 0,
      //   discount: 0,
      //   taxamount: 0,
      //   netamount: 0,
      // }
    ],
    productItems: [],
    productItem: {
      id: 0,
      itemcode: "",
      itemname: "",
      unitcode: "",
    },
    showOverlay: false,
    loader : false,
    showItemDialog : false,
    showNewItemDialog : false,
    showModalDialog : false,
    showConfirmModalDialog : false,
    showCompleteModalDialog : false,
    showErrorModalDialog : false,
    modalTitle : '',
    modalText : '',
    sale: {},
    user: {},
    colors : [
      { name: 'red', value: '#ff0000' },
      { name: 'green', value: '#00ff00' },
      { name: 'blue', value: '#0000ff' },
      { name: 'yellow', value: '#ffff00' },
      { name: 'purple', value: '#800080' },
      { name: 'orange', value: '#ffa500' },
      { name: 'pink', value: '#ffc0cb' },
      { name: 'brown', value: '#a52a2a' },
      { name: 'black', value: '#000000' },
      // { name: 'white', value: '#ffffff' },
    ],
    colors2 : ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
    modalString : {
      confirmSave: 'ต้องการบันทึกข้อมูลหรือไม่',
      confirmEdit: 'ต้องการแก้ไขข้อมูลหรือไม่',
      confirmDelete: 'ต้องการลบข้อมูลหรือไม่',
      saveComplete: 'บันทึกข้อมูลสำเร็จ',
      editComplete: 'แก้ไขข้อมูลสำเร็จ',
      deleteComplete: 'ลบข้อมูลสำเร็จ',
      errorFromServer: 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์',
    }
  }),
  // Actions หรือ methods ที่เป็นฟังก์ชันที่ใช้ในการเปลี่ยนแปลงค่าใน state
  actions: {

    countBill() {
       this.countBillTel = this.upSaleOrders.filter(order => order.is_tel_status === true).length;
      this.countUpsaleComplete = this.upSaleOrders.filter(order => order.is_upsale_status === true).length;
      console.log("countBillTel =>", this.countBillTel);
      console.log("countUpsaleComplete =>", this.countUpsaleComplete);

      if(this.countBillTel === this.upSaleOrders.length){
        this.select_tel_status_all = true;
      }else {
        this.select_tel_status_all = false;
      }
      if(this.countUpsaleComplete === this.upSaleOrders.length){
        this.select_upsale_status_all = true;
      }else {
        this.select_upsale_status_all = false;
      }
      console.log("select_tel_status_all =>", this.select_tel_status_all);
      console.log("select_upsale_status_all =>", this.select_upsale_status_all);
    },

     async UpdateUpsaleStatus() {

      this.showOverlay = true;
      this.loader = true;

      let itemsForApi = await this.formatUpsaleOrdersApi(this.upSaleOrders);

      try {
        const response = await axios.post(`${BaseApiCRMAdminUrl}/monitor/my_upsale_split_order_to_saleman.php`, {
          actiontype: '4',
          item : {
            salecode : this.sale.salecode,
            docdate: this.upSaleDate,
          },
          items : itemsForApi
        });

        let result = response.data;
        if(result){
          console.log("from server OK", result);

          this.upSaleOrders = await this.formatUpsaleOrdersForDisplay(this.upSaleOrders);
          this.countBill();

          return result;
        }
      } catch (error) {
        console.error('Error updating upsale status:', error);
      } finally {
        this.showOverlay = false;
        this.loader = false;
      }
    },

    async fetchUpsaleBySalecode(salecode,docdate) {

        console.log("fetchUpsaleBySalecode =>", salecode, docdate);
        // ปัญหานี้เกิดจาก Timezone offset ของ JavaScript Date
        // เมื่อใช้ new Date('YYYY-MM-DD') แล้ว toISOString() จะคืนค่า UTC ซึ่งอาจลบวันออกไป 1 วันถ้า Timezone +7
        // วิธีแก้: ใช้ docdate ตรง ๆ หรือแปลงเป็น local date string แทน

        // วิธีที่ 1: ใช้ docdate ตรง ๆ (ถ้า docdate เป็น 'YYYY-MM-DD')
       //his.upSaleDate = docdate;

        // หรือ วิธีที่ 2: แปลงเป็น local date (ถ้าต้องการ)

        this.upSaleDate = this.getDate(docdate);

        console.log("upSaleDate =>", this.upSaleDate);



        try {

          this.sale.salecode = salecode;

          const response = await axios.post(`${BaseApiUrl}/monitor/my_crm_tele_sale_calenda.php`, {
            actiontype: '49',
            item : {
              salecode : salecode,
              docdate: this.upSaleDate
            }

          });

          // console.log("from server OK");

          // console.log(userId);

          //console.log(response);
          this.showOverlay = true;
          this.loader = true;

          let tempData = response.data;

          this.upSaleOrders =  await this.formatUpsaleOrdersForDisplay(tempData);

          this.countBill();

          setTimeout(() => {
            this.showOverlay = false;
            this.loader = false;
          }, 1000);



        } catch (error) {
          console.error('Error fetching events:', error);
        }

    },
    async formatUpsaleOrdersForDisplay(orders) {

      /*
      data from api จะเป็น
      create table tnt_upsale_order_don_split_by_date
      (
        rowid int identity(1,1),
        databasename varchar(50),
        roworder int default 0,
        docno varchar(30),
        docdate date,
        salecode varchar(50),
        deliveryno varchar(30),
        arcode varchar(30),
        arname varchar(200),
        remark varchar(255),
        totalamount money default 0,
        is_assign int default 0,
        is_tel_status int default 0,
        is_upsale_status int default 0,
        createdatetime datetime default getdate()
      )

       is_tel_status จาก api จะเป็น '1' หรือ '0'
       แต่ใน Vue เราต้องการให้เป็น boolean (true/false)

        is_upsale_status จาก api จะเป็น '1' หรือ '0'
        แต่ใน Vue เราต้องการให้เป็น boolean (true/false)
      */

    return orders.map((order, index) => {

      order.id = index; // เพิ่ม id ให้กับแต่ละ order
      order.is_selected = false; // เพิ่ม is_selected ให้กับแต่ละ order

      let x_is_tel_status = false
      if (order.is_tel_status === '1' || order.is_tel_status === 1) {
        x_is_tel_status = true;
      }
      order.is_tel_status = x_is_tel_status;

      let x_is_upsale_status = false
      if (order.is_upsale_status === '1' || order.is_upsale_status === 1) {
        x_is_upsale_status = true;
      }
      order.is_upsale_status = x_is_upsale_status;

      return order;
        }).sort((a, b) => {
          if (a.docno < b.docno) return -1;
          if (a.docno > b.docno) return 1;
          return 0;
        });
    },
    async formatUpsaleOrdersApi(orders) {

      /*
      data from api จะเป็น
      create table tnt_upsale_order_don_split_by_date
      (
        rowid int identity(1,1),
        databasename varchar(50),
        roworder int default 0,
        docno varchar(30),
        docdate date,
        salecode varchar(50),
        deliveryno varchar(30),
        arcode varchar(30),
        arname varchar(200),
        remark varchar(255),
        totalamount money default 0,
        is_assign int default 0,
        is_tel_status int default 0,
        is_upsale_status int default 0,
        createdatetime datetime default getdate()
      )

       is_tel_status จาก api จะเป็น '1' หรือ '0'
       แต่ใน Vue เราต้องการให้เป็น boolean (true/false)

        is_upsale_status จาก api จะเป็น '1' หรือ '0'
        แต่ใน Vue เราต้องการให้เป็น boolean (true/false)
      */

    return orders.map((order, index) => {

      order.id = index; // เพิ่ม id ให้กับแต่ละ order
      order.is_selected = false; // เพิ่ม is_selected ให้กับแต่ละ order

      let x_is_tel_status = 0
      if (order.is_tel_status === '1' || order.is_tel_status === 1 || order.is_tel_status === true) {
        x_is_tel_status = 1;
      }else{
        x_is_tel_status = 0;
      }
      order.is_tel_status = x_is_tel_status;

      let x_is_upsale_status = 0
      if (order.is_upsale_status === '1' || order.is_upsale_status === 1 || order.is_upsale_status === true) {
        x_is_upsale_status = 1;
      }else{
        x_is_upsale_status = 0;
      }
      order.is_upsale_status = x_is_upsale_status;

      return order;
    });
    },
    // toggleSelect(item){

    //   console.log("toggleSelect =>", item);

    //    this.upSaleOrders.forEach(order => {
    //      if (parseInt(order.rowid) === parseInt(item.rowid)) {

    //       if(order.is_selected == true){
    //         order.is_selected = true;
    //         order.selected = true;
    //       }else {
    //         order.is_selected = false;
    //         order.selected = false;
    //       }

    //       console.log("order.is_selected =>", order.is_selected);

    //      }
    //    });
    // },
    // toggleSelectAll() {

    //   console.log("before toggleSelectAll =>", this.selectedAll);
    //   console.log("upSaleOrders brfore =>", this.upSaleOrders);

    //   if(this.selectedAll==false){
    //     this.upSaleOrders.forEach(order => {
    //       order.is_selected = false;
    //       order.selected = false;
    //     });
    //   }else {
    //     this.upSaleOrders.forEach(order => {
    //       order.is_selected = true;
    //       order.selected = true;
    //     });
    //   }

    //      console.log("upSaleOrders after =>", this.upSaleOrders);
    // },
    async toggleSelectTelStatusAll() {
      console.log("before toggleSelectTelStatusAll =>", this.select_tel_status_all);
      console.log("upSaleOrders brfore =>", this.upSaleOrders);
       this.upSaleOrders.forEach(order => {
        order.is_tel_status = this.select_tel_status_all;
        if(this.select_tel_status_all === false){
          order.is_upsale_status = false; // ถ้าไม่เลือกโทร จะไม่เลือก upsale ด้วย
        }
      });
      console.log("upSaleOrders after =>", this.upSaleOrders);
      this.countBill();
    },
    async toggleSelectUpsaleStatusAll() {

      console.log("before select_upsale_status_all =>", this.select_upsale_status_all);
      console.log("upSaleOrders brfore =>", this.upSaleOrders);

      this.upSaleOrders.forEach(order => {
        order.is_upsale_status = this.select_upsale_status_all;
         if(this.select_upsale_status_all === true && order.is_tel_status === false){
          order.is_tel_status = true; // ถ้าไม่เลือกโทร จะไม่เลือก upsale ด้วย
        }
      });

      console.log("upSaleOrders after =>", this.upSaleOrders);
      this.countBill();
    },
    async toggleSelectTelStatus(item) {

      console.log("toggleSelectTelStatus =>", item);

      let xitem = this.upSaleOrders.filter(order => parseInt(order.rowid) === parseInt(item.rowid));

      if (xitem && xitem[0]) {

        if (xitem[0].is_tel_status === false) {
            xitem[0].is_upsale_status = false;
        }
      }

      if (xitem) {
        console.log("xitem =>", xitem[0]);
      }
      this.countBill();


      console.log(this.upSaleOrders);

    },
    async toggleSelectUpsaleStatus(item) {
       console.log("toggleSelectUpsaleStatus =>", item);

      let xitem = this.upSaleOrders.filter(order => parseInt(order.rowid) === parseInt(item.rowid));

       if (xitem && xitem[0]) {

        if (xitem[0].is_upsale_status === true && xitem[0].is_tel_status === false) {
          // ถ้าเลือก upsale แต่ยังไม่โทร ให้เปลี่ยนสถานะ is_tel_status เป็น true
            xitem[0].is_tel_status = true;
        }
      }

      if (xitem) {
        console.log("xitem =>", xitem[0]);
      }
      this.countBill();
    },
    // async changeDonTel(){

    //   this.upSaleOrders.forEach(order => {

    //     if(order.is_selected=="0" || order.is_selected==0){
    //       order.is_selected = false;
    //     }
    //     if(order.is_selected=="1" || order.is_selected==1){
    //       order.is_selected = true;
    //     }

    //     if (order.is_selected) {
    //       order.is_tel_status = 1;
    //     }
    //   });

    //   console.log("changeDonTel =>", this.upSaleOrders);



    // },
    // changeUpsaleComplete(){
    //   this.upSaleOrders.forEach(order => {

    //     if(order.is_selected=="0" || order.is_selected==0){
    //       order.is_selected = false;
    //     }
    //     if(order.is_selected=="1" || order.is_selected==1){
    //       order.is_selected = true;
    //     }

    //     if (order.is_selected) {
    //       order.is_upsale_status = 1;
    //     }
    //   });
    // },
    // changeNotel(){
    //   this.upSaleOrders.forEach(order => {

    //     if(order.is_selected=="0" || order.is_selected==0){
    //       order.is_selected = false;
    //     }
    //     if(order.is_selected=="1" || order.is_selected==1){
    //       order.is_selected = true;
    //     }

    //     if (order.is_selected) {
    //       order.is_tel_status = 0;
    //     }
    //   });
    // },
    // changeUpsaleNotComplete(){
    //   this.upSaleOrders.forEach(order => {

    //     if(order.is_selected=="0" || order.is_selected==0){
    //       order.is_selected = false;
    //     }
    //     if(order.is_selected=="1" || order.is_selected==1){
    //       order.is_selected = true;
    //     }

    //     if (order.is_selected) {
    //       order.is_upsale_status = 0;
    //     }
    //   });
    // },

    /* <button @click="useUpsale.changeDonTel" class="button">
      <v-icon>mdi-check</v-icon><br>
       เปลี่ยนสถานะโทรแล้ว
    </button>

    <button @click="useUpsale.changeUpsaleComplete" class="button">
      <v-icon>mdi-check</v-icon><br>
       เปลี่ยนสถานะ Upsale Complete
    </button>

     <button @click="useUpsale.changeNotel" class="button2">
      <v-icon>mdi-cancel</v-icon><br>
       เปลี่ยนสถานะยังไม่โทร
    </button>

    <button @click="useUpsale.changeUpsaleNotComplete" class="button2">
      <v-icon>mdi-cancel</v-icon><br>
       เปลี่ยนสถานะ Upsale ไม่ Complete
    </button>
*/

     getDate(objDate) {
      if (!objDate) return null;
      const date = new Date(objDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // เดือนเริ่มจาก 0
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;

    },

    //function add productItem to saleorderItems
    async addProductItemToSaleOrderItems() {

      // console.log("ItemCode =>",this.saleorderItems[0].itemcode);

      // if(this.saleorderItems[0].itemcode = ""){
      //   //delete first item in saleorderItems
      //   this.saleorderItems = [];
      // }

      this.productItem.qty = 1;
      this.productItem.price = 0;
      this.productItem.amount = 0;
      this.productItem.discount = 0;
      this.productItem.taxamount = 0;
      this.productItem.netamount = 0;
      this.productItem.docno = this.saleorder.docno;
      this.productItem.docdate = this.saleorder.docdate;
      this.productItem.whcode = this.saleorder.whcode;
      this.productItem.shelfcode = this.saleorder.shelfcode;
      this.productItem.linenumber = this.saleorderItems.length + 1;
      this.saleorderItems.push(this.productItem);
    },

    // functio AddnewOrder
    async addNewOrder(event) {
      this.showOverlay = true;
      this.loader = true;

      try {

      } catch (error) {

      }

    }
    //function save Order
    ,
    //function edit Order
    async editOrder(event) {

      this.showOverlay = true;
      this.loader = true;

      try {

      } catch (error) {

      }

    },
    //function delete Order
    async deleteOrder(event) {
      this.showOverlay = true;
      this.loader = true;
      try {
        const response = await axios.post(`${BaseApiUrl}/monitor/my_crm_tele_sale_calenda.php`, {
          item: {
            rowid: this.event.id,
            groupid: this.event.customerid,
            title: this.event.title,
            start: this.event.time.end,
            duedate: this.event.time.end,
            teldate: this.event.time.calldate,
            remark: this.event.description,
            docno : this.event.customerid,
            statuscode : "01",
            statusname : "ลูกค้าเก่า-ยังสั่งสินค้าอยู่",
            due_status : this.event.due_status,
          },
          userid : this.sale.code,
          actiontype: '41',
        });
        //console.log("editEvent from server OK");
        //console.log(response);
        let result = response.data;
        if(result){
          setTimeout(() => {
            this.showOverlay = false;
            this.loader = false;
            this.modalTitle = "ลบข้อมูล";
            this.modalText =  this.modalString.deleteComplete
            this.showModalDialog = true;
          }, 500);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    },

    //function get all Products
    async fetchAllProducts() {
      this.showOverlay = true;
      this.loader = true;
      try {
        const response = await axios.post(`${BaseApiUrl_Product}/master/my_item_stock.php`, {
          item: {
          },
          userid : userId,
          actiontype: '51',
        });
        //console.log("getAllProducts from server OK");
        //console.log(response);
        let result = response.data;
        if(result){
          setTimeout(() => {
            this.showOverlay = false;
            this.loader = false;

            //format data to productItems
            this.productItems = result.map((item,index) => ({
              id: index,
              title: item.name1,
              itemcode: item.code,
              itemname: item.name1,
              unitcode: item.unitcode,
              color : this.colors2[Math.floor(Math.random() * this.colors2.length)]
            }));

          }, 500);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    },

    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }
  },
})
