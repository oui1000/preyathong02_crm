// Utilities
import { defineStore } from 'pinia'
import axios from 'axios';
// import { id } from 'vuetify/locale';
import { getCookie } from '../utils/cookieUtils';


const BaseApiUrl = 'http://preyathong-02.ddns.net/pyt-01/service/crm'

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
export const useEventStore = defineStore('event', {
  // State
  state: () => ({
    userId: userId,
    drawerState: true,
    railState : true,
    events: [],
    customerItems: [],
    customerItemsDistinct: [],
    commsionItems: [],
    lastCustomerOrderItems: [],
    CustomerOrderBillCount: 0,
    lastCustomerOrderDeliveryNo: [],
    upsaleOrders : [],
    salemanOrders : [],
    customer: {},
    event: {
      time : {
        calldate : new Date().toISOString().slice(0, 10),
        start : new Date().toISOString().slice(0, 10),
        end: new Date().toISOString().slice(0, 10),
        teldate : new Date().toISOString().slice(0, 10),
        duedate : new Date().toISOString().slice(0, 10),
      }
    },
    dueStatus: 0,
    showOverlay: false,
    loader : false,
    showEventDialog : false,
    showNewEventDialog : false,
    showModalDialog : false,
    showConfirmModalDialog : false,
    modalTitle : '',
    modalText : '',
    saleman: [],
    activeEvent: null,
    sale: {},
    user: {},
    xmonth : 0,
    xyear : 0,
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
    }
  }),
  // Actions หรือ methods ที่เป็นฟังก์ชันที่ใช้ในการเปลี่ยนแปลงค่าใน state
  actions: {

    // handle xmonth , xyear change from sale_com mission
    async handleXmonthChange(xmonth,xyear){
      this.xmonth = xmonth;
      this.xyear = xyear;

      if(userId == undefined){
        alert('กรุณาเลือกพนักงานขาย');
        return
      }

      //alert(`fetchEvents called with userId: ${userId}`);
      //this.sale = this.saleman.find(sale => sale.title === userId);
      let salecode = this.sale.code.toString();

      //console.log('fetchEvents called with userId:',this.sale);
      this.showOverlay = true;
      this.loader = true;

      console.log('handleXmonthChange: >> ',this.xmonth);

      console.log("salecode:"+ salecode);

      try {
        const response = await axios.post(`${BaseApiUrl}/monitor/my_crm_tele_sale_calenda.php`, {
          item: {
            salecode: salecode,
            xmonth: this.xmonth,
            xyear: this.xyear,
          },
          actiontype: '43',
        });




        this.commsionItems = response.data.commissions;


        setTimeout(() => {
          this.showOverlay = false;
          this.loader = false;
          //return  this.saleman
        }, 500);

      } catch (error) {
        console.error('Error fetching commissions:', error);
      }

    },

    async handleXyearChange(xmonth,xyear){
      this.xmonth = xmonth;
      this.xyear = xyear;

      if(userId == undefined){
        alert('กรุณาเลือกพนักงานขาย');
        return
      }


      let salecode = this.sale.code.toString();

      //console.log('fetchEvents called with userId:',this.sale);
      this.showOverlay = true;
      this.loader = true;

      try {
        const response = await axios.post(`${BaseApiUrl}/monitor/my_crm_tele_sale_calenda.php`, {
          item: {
            salecode: salecode,
            xmonth: this.xmonth,
            xyear: this.xyear,
          },
          actiontype: '43',
        });




        this.commsionItems = response.data.commissions;


        setTimeout(() => {
          this.showOverlay = false;
          this.loader = false;
          //return  this.saleman
        }, 500);

      } catch (error) {
        console.error('Error fetching commissions:', error);
      }
    },
    getDate(objDate) {
      if (!objDate) return null;
      const date = new Date(objDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // เดือนเริ่มจาก 0
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;

    },

    async addEvent(event) {

      this.showOverlay = true;
      this.loader = true;

      let actiontype = '33';  //addnew


       let calldate = ''
       if (this.event.time.calldate instanceof Date) {
          calldate = this.getDate(this.event.time.calldate);
      }else {
          calldate = this.event.time.calldate;
      }
      let start = ''
      if (this.event.time.end instanceof Date) {
          start = this.getDate(this.event.time.end);
      }else {
          start = this.event.time.end;
      }
      let end = ''
      if (this.event.time.end instanceof Date) {
          end = this.getDate(this.event.time.end);
      }else {
          end = this.event.time.end;
      }


      try {
        const response = await axios.post(`${BaseApiUrl}/monitor/my_crm_tele_sale_calenda.php`, {
          item: {
            rowid: null,
            groupid: this.event.customerid,
            title: this.customer.title,
            start: start,
            duedate: end,
            teldate: calldate,
            remark: this.event.description,
            docno : this.event.customerid,
            statuscode : "01",
            statusname : "ลูกค้าเก่า-ยังสั่งสินค้าอยู่",
            due_status : this.event.due_status,
            salecode: this.sale.code,
            databasename : this.event.databasename
          },
          userid : this.sale.code,
          actiontype: actiontype,
        });

        //console.log("editEvent from server OK");

        //console.log(response);

        let result = response.data;

        if(result){

          setTimeout(() => {



            this.showOverlay = false;
            this.loader = false;

            this.modalTitle = 'บันทึกข้อมูล';
            this.modalText = 'บันทึกข้อมูลสำเร็จ';

            this.showModalDialog = true;

            //this.showEventDialog = false;

          }, 500);
        }

      } catch (error) {
        console.error('Error fetching events:', error);
      }
    },
    async removeEvent(event) {

      this.showOverlay = true;
      this.loader = true;

      let actiontype = '41';  //delete

      //alert('actiontype: ' + actiontype);


      try {
        const response = await axios.post(`${BaseApiUrl}/monitor/my_crm_tele_sale_calenda.php`, {
          item: {
            rowid: this.event.rowid,
            groupid: this.event.customerid,
            title: this.event.title,
            start: this.event.time.end,
            duedate: this.event.time.end,
            teldate: this.event.time.calldate,
            remark: this.event.description,
            docno : this.event.customerid,
            databasename : this.event.databasename,
            statuscode : "01",
            statusname : "ลูกค้าเก่า-ยังสั่งสินค้าอยู่",
            due_status : this.event.due_status,
          },
          userid : this.sale.code,
          actiontype: actiontype,
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
    async editEvent(event) {

      this.showOverlay = true;
      this.loader = true;

      let actiontype = '39';  //edit

      // alert('actiontype: ' + actiontype);

      console.log(this.event);

      // alert("แก้ไขข้อมูลการโทรขาย : id",this.event.rowid);

      // return;

      // //เช็คกว่า this.event.time.newduedate มีค่าเป็น Date เป็น undefined หรือ null หรือไม่
      // if (this.event.time.newduedate instanceof Date) {
      //   //this.event.time.end = this.getDate(this.event.time.newduedate);
      // } else if (this.event.time.newduedate === undefined || this.event.time.newduedate === null) {
      //   this.event.time.newduedate = this.getDate(this.event.time.newduedate);
      // }

      let calldate = ''
       if (this.event.time.calldate instanceof Date) {
          calldate = this.getDate(this.event.time.calldate);
      }else {
          calldate = this.event.time.calldate;
      }
      let start = ''
      if (this.event.time.end instanceof Date) {
          start = this.getDate(this.event.time.end);
      }else {
          start = this.event.time.end;
      }
      let end = ''
      if (this.event.time.end instanceof Date) {
          end = this.getDate(this.event.time.end);
      }else {
          end = this.event.time.end;
      }

      let newduedate = ''
      if (this.event.time.newduedate instanceof Date) {
          newduedate = this.getDate(this.event.time.newduedate);
      }else {
          newduedate = this.event.time.newduedate;
      }

      // alert(newduedate);

      // return // debug before submit

      try {
        const response = await axios.post(`${BaseApiUrl}/monitor/my_crm_tele_sale_calenda.php`, {
          item: {
            rowid: this.event.rowid,
            groupid: this.event.customerid,
            title: this.event.title,
            start: start,
            duedate: end,
            teldate: calldate,
            remark: this.event.description,
            docno : this.event.customerid,
            databasename : this.event.databasename,
            statuscode : "01",
            statusname : "ลูกค้าเก่า-ยังสั่งสินค้าอยู่",
            due_status : this.event.due_status,
            newduedate: newduedate
          },
          userid : this.sale.code,
          actiontype: actiontype,
        });

        //console.log("editEvent from server OK");

        //console.log(response);


        let result = response.data;

        if(result){

          setTimeout(() => {



            this.showOverlay = false;
            this.loader = false;

            this.modalTitle = 'แก้ไขข้อมูล';
            this.modalText = 'แก้ไขข้อมูลสำเร็จ';

            if(actiontype == '33'){
              this.modalTitle = 'บันทึกข้อมูล';
              this.modalText = 'บันทึกข้อมูลสำเร็จ';
            }

            this.showModalDialog = true;

            //this.showEventDialog = false;

          }, 500);
        }



      } catch (error) {
        console.error('Error fetching events:', error);
      }

    },
    async fetchEvents(userId) {

      //alert(userId)

      if(userId == undefined){
        alert('กรุณาเลือกพนักงานขาย');
        return
      }

      //alert(`fetchEvents called with userId: ${userId}`);
      this.sale = this.saleman.find(sale => sale.title === userId);

      //console.log('fetchEvents called with userId:',this.sale);

      //console.log('fetchEvents called with userId:',this.sale);
      this.showOverlay = true;
      this.loader = true;

      try {
        const response = await axios.post(`${BaseApiUrl}/monitor/my_crm_tele_sale_calenda.php`, {
          item: {
            salecode: userId.toString(),
            due_status: this.dueStatus,
          },
          actiontype: '35',
        });



        let tempEvents = response.data.events;
        this.customerItems = this.formatCustomers(response.data.customers);
        this.customerItemsDistinct = response.data.arcode_distinct;
        this.events = this.formatEvents(tempEvents,userId);
        //this.events = tempEvents;
        this.commsionItems = response.data.commissions;
        //return this.events

        setTimeout(() => {
          this.showOverlay = false;
          this.loader = false;
          return  this.saleman
        }, 500);

      } catch (error) {
        console.error('Error fetching events:', error);
      }
    },
    async fetchSaleCode() {

      this.user.id = userId;

      try {


        const response = await axios.post(`${BaseApiUrl}/monitor/my_crm_tele_sale_calenda.php`, {
          actiontype: '37',
          item : {
            userid : userId
          }

        });

        // console.log("from server OK");

        // console.log(userId);

        //console.log(response);
        this.showOverlay = true;
        this.loader = true;

        let tempSalecode = response.data;

        const images = ['p1.png', 'p2.jpg', 'p3.jpg', 'p4.jpg', 'p5.jpg', 'p6.jpg', 'p7.jpg'];

        this.saleman = tempSalecode.map(title => ({
          img: images[Math.floor(Math.random() * images.length)],
          subtitle: title.name,
          title: title.code,
          code: title.code,
          name: title.name,
        }));

        //PT-GM-01

        if (userId.startsWith('PTT') || userId.startsWith('TS')) {
          this.saleman = this.saleman.filter(sale => sale.code === userId);

          this.sale = this.saleman[0];

          setTimeout(() => {
             this.fetchEvents(userId);
          }, 1000);

        }

        setTimeout(() => {
          this.showOverlay = false;
          this.loader = false;
        }, 1500);

        return  this.saleman


      } catch (error) {
        console.error('Error fetching events:', error);
      }

    },
    fetchEventsTest() {

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

      this.events = [];

      for (let i = 0; i < 20; i++) {
        const day = Math.floor(Math.random() * daysInMonth) + 1;
        const startHour = Math.floor(Math.random() * 24);
        const endHour = startHour + Math.floor(Math.random() * 3) + 1;

        this.events.push({
          title: `นัดลูกค้าบริษัท-${i + 1}`,
          with: `Person ${i + 1}`,
          time: {
            start: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(startHour).padStart(2, '0')}:00`,
            end: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(endHour).padStart(2, '0')}:00`
          },
          color: this.randomColorName(),
          isEditable: false,
          id: Math.random().toString(36).substring(2, 9),
          description: `Description for event ${i + 1}`
        });
      }

      return this.events
    },
    fetchEvent(id) {
      this.event = this.events.find(event => event.id === id)
      return this.event
    },
    async fetchLastCustomerOrder(customerID) {

      //alert("get last customer order");

      try {


        const response = await axios.post(`${BaseApiUrl}/monitor/my_crm_tele_sale_calenda.php`, {
          actiontype: '45',
          item : {
            arcode : customerID
          }

        });

        // console.log("from server OK");

        // console.log(userId);

        //console.log(response);
        this.showOverlay = true;
        this.loader = true;

        let tempData = response.data;

        this.lastCustomerOrderItems = [];


        // echo json_encode(array("last_order"=>$lastorder,"bill_count"=>$bill_count,"last_10_deliveryno"=>$lastdelivery));
        this.lastCustomerOrderItems = tempData.last_order
        this.CustomerOrderBillCount = tempData.bill_count.bill_count;
        this.lastCustomerOrderDeliveryNo = tempData.last_10_deliveryno;

        console.log("lastCustomerOrderItems:", this.lastCustomerOrderItems);
        console.log("CustomerOrderBillCount:", this.CustomerOrderBillCount);
        console.log("lastCustomerOrderDeliveryNo:", this.lastCustomerOrderDeliveryNo);

        setTimeout(() => {
          this.showOverlay = false;
          this.loader = false;
        }, 1500);



      } catch (error) {
        console.error('Error fetching events:', error);
      }

    },
    async fetchSaleManOrders() {

      //alert("fetchSaleManOrders");

      try {


        const response = await axios.post(`${BaseApiUrl}/monitor/my_crm_tele_sale_calenda.php`, {
          actiontype: '47',
          item : {
            salecode : this.sale.title
          }

        });

        // console.log("from server OK");

        // console.log(userId);

        //console.log(response);
        this.showOverlay = true;
        this.loader = true;

        let tempData = response.data;

        this.salemanOrders =  tempData;

        setTimeout(() => {
          this.showOverlay = false;
          this.loader = false;
        }, 1500);



      } catch (error) {
        console.error('Error fetching events:', error);
      }

    },
    randomColorText(){
      const randomIndex = Math.floor(Math.random() * this.colors.length);
      return this.colors[randomIndex].value
    },
    randomColorName(){
      const randomIndex = Math.floor(Math.random() * this.colors.length);
      return this.colors[randomIndex].name;
    },
    formatEvents(events, salecode) {
      const uniqueEvents = events.reduce((acc, event) => {
      const key = `${event.groupid}-${event.start}`;
      if (!acc[key]) {
        acc[key] = event;
      }
      return acc;
      }, {});

      return Object.values(uniqueEvents).map(event => {
      return {
        title: event.title,
        with: 'with ' + salecode,
        time: {
        start: event.start,
        end: event.end,
        calldate: event.currentdate,
        teldate: new Date(event.currentdate).toISOString().slice(0, 10),
        duedate : new Date(event.end).toISOString().slice(0, 10),
        },
        id: event.rowid,
        rowid: event.rowid,
        customerid: event.groupid,
        customername: event.title,
        customeraddress: event.araddress,
        databasename : event.databasename,
        color: this.randomColorName(),
        isEditable: false,
        description: event.description,
        due_status: parseInt(event.due_status, 10),
        oldduedate : event.oldduedate,
        currentdate : event.currentdate

      };
      });
    }    ,
    formatCustomers(customers){
      return customers.map(customer => {
        return {
          id : customer.code,
          customerid : customer.code,
          customername : customer.title,
          title: customer.title,
          telephone : customer.code,
          address : customer.address,
          databasename : customer.databasename,
          color: this.colors2[Math.floor(Math.random() * this.colors2.length)]
        }
      })
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }
  },
})
