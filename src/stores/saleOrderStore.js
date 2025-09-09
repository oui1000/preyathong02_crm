// Utilities
import { defineStore } from 'pinia'
import axios from 'axios';
// import { id } from 'vuetify/locale';
import { getCookie } from '../utils/cookieUtils';
import { readDate,saveDate } from '../utils/dateUtility';
import { ar } from 'vuetify/locale';



const BaseApiUrl = 'http://preyathong-02.ddns.net/pyt-01/service/crm'
const BaseApiUrl_Product = 'http://preyathong-02.ddns.net/pyt-01/service/inventory'
const BaseApiUrl_01 = 'http://preyathong-02.ddns.net/pyt-01/'
const BaseApiUrl_02 = 'http://preyathong-02.ddns.net/pyt-02/'

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
export const useSaleOrderStore = defineStore('saleorder', {
  // State
  state: () => ({
    province: [],
    area: [],
    LogOrders: [],
    deliveryNoTimeline : [],
    salemanOrders: [],
    saleorder: {
      docno : "",
      docdate : new Date().toISOString().slice(0, 10),
      nextduedate : new Date().toISOString().slice(0, 10),
      arcode : "",
      arname : "",
      paytype : 0,
      logisticcode : "01",
      logisticname : "",
      city : "",
      area : "",
      postcode : "",
      whcode : "",
      billtype : 1,
      mydescription : "",
      deliverydate : new Date().toISOString().slice(0, 10),
      rawInfomationBeforeSplit : "",
      salecode : "",
      databasename : "",
    },
    saleorderItems: [
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
    modalTitle : '',
    modalText : '',
    sale: {},
    user: {},
    event: {},
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

    /*
     this.saleorder.docno = result[0].item.docno;
            this.saleorder.docdate = new Date(result[0].item.docdate).toISOString().slice(0, 10);
            this.saleorder.deliverydate = result[0].item.deliverydate;

           this.saleorder.paytype =  parseInt(result[0].item.paytype);
            this.saleorder.logisticcode = result[0].item.logisticcode;
            this.saleorder.logisticname = result[0].item.logisticname;

            this.saleorder.tempdocno = docno;
            this.saleorder.arcode = result[0].item.arcode;
            this.saleorder.arname = result[0].item.arname;
            //this.saleorder.telephone = result[0].item.arcode;
            this.saleorder.whcode = result[0].item.whcode;
            this.saleorder.billtype = parseInt(result[0].item.billtype);
            this.saleorder.taxtype = parseInt(result[0].item.taxtype);
            this.saleorder.mydescription = result[0].item.mydescription;
            this.saleorder.revision = result[0].item.revision;
            this.saleorder.branchcode = result[0].item.branchcode;
            this.saleorder.quotationno = result[0].item.quotationno;
            this.saleorder.deliverymydescription = result[0].item.deliverymydescription;
            this.saleorder.deliverycontact = result[0].item.deliverycontact;
            this.saleorder.deliveryaddress = result[0].item.deliveryaddress;
            this.saleorder.deliveryday = result[0].item.deliveryday;
            this.saleorder.creditday = result[0].item.creditday || 0;
            this.saleorder.deliverydate = this.saleorder.docdate;
            this.saleorder.duedate = this.saleorder.docdate;
            //this.saleorder.salecode = this.sale.code
            this.saleorder.departcode = result[0].item.departcode;
            this.saleorder.projectcode = result[0].item.projectcode;
            this.saleorder.currencycode = result[0].item.currencycode;
            this.saleorder.exchangerate = result[0].item.exchangerate;
            this.saleorder.sumofitemamount = parseFloat(result[0].item.sumofitemamount);
            this.saleorder.discountword = result[0].item.discountword;
            this.saleorder.discountamount = parseFloat(result[0].item.discountamount);
            this.saleorder.beforetaxamount =  parseFloat(result[0].item.beforetaxamount);
            this.saleorder.taxrate = parseFloat(result[0].item.taxrate);
            this.saleorder.taxamount = result[0].item.taxamount;
            this.saleorder.totalamount = parseFloat(result[0].item.totalamount);
            this.saleorder.freeamount = parseFloat(result[0].item.freeamount);
            this.saleorder.netamount = parseFloat(result[0].item.totalamount) + parseFloat(result[0].item.freeamount);
            this.saleorder.iscompletesave = result[0].item.iscompletesave;
            this.saleorder.creatorcode = result[0].item.creatorcode;
            this.saleorder.printcount = result[0].item.printcount;
            this.saleorder.invoiceno = result[0].item.invoiceno;
            this.saleorder.cancelno = result[0].item.cancelno;
            this.saleorder.projectname = result[0].item.projectname;
            this.saleorder.requestno = result[0].item.requestno;

            this.saleorder.bookbankno = result[0].item.bookbankno;
            this.saleorder.deliverypoint = result[0].item.deliverypoint;
            this.saleorder.deliverypointname = result[0].item.deliverypointname;
            this.saleorder.deliverytelephone = result[0].item.deliverytelephone;
            this.saleorder.city = result[0].item.city;
            this.saleorder.area = result[0].item.area;
            this.saleorder.postcode = result[0].item.postcode;

            this.saleorder.city_name = result[0].item.city;
            this.saleorder.area_name = result[0].item.area;
    */

    clearText() {

      this.dbname = "db2";
      this.saleorder.docno = "";
      this.saleorder.docdate = new Date().toISOString().slice(0, 10);
      this.saleorder.nextduedate = new Date().toISOString().slice(0, 10);
      this.saleorder.deliverydate = new Date().toISOString().slice(0, 10);
      this.saleorder.duedate = new Date().toISOString().slice(0, 10); // วันครบกำหนดชำระ
      this.saleorder.arcode = "";
      this.saleorder.arname = "";
      this.saleorder.paytype = 0;
      this.saleorder.logisticcode = "01";
      this.saleorder.logisticname = "";
      this.saleorder.city = "";
      this.saleorder.area = "";
      this.saleorder.postcode = "";
      this.saleorder.whcode = "01";
      this.saleorder.billtype = 1;
      this.saleorder.mydescription = "";

      this.saleorder.rawInfomationBeforeSplit = "";
      //this.saleorder.salecode = "";
      this.saleorder.databasename = "";
      this.saleorder.taxtype = 1; // 1 = รวมในราคา, 0 = แยกภาษี
      this.saleorder.taxrate = 7; // 7% ภาษีมูลค่าเพิ่ม
      this.saleorder.bookbankno = "";
      this.saleorder.deliverypoint = "";
      this.saleorder.deliverypointname = "";
      this.saleorder.deliverytelephone = "";
      this.saleorder.city_name = "";
      this.saleorder.area_name = "";
      this.saleorder.postcode = "";
      this.saleorder.exchangerate = 1; // อัตราแลกเปลี่ยน
      this.saleorder.currencycode = ""; // รหัสสกุลเงิน
      this.saleorder.tempdocno = "";
      this.saleorder.printcount = 0;
      this.saleorder.creatorcode = userId;
      this.saleorder.deliverycontact = "";
      this.saleorder.deliveryaddress = "";
      this.saleorder.deliveryday = 0; // วันจัดส่ง
      this.saleorder.creditday = 0; // วันเครดิต

      this.saleorder.departcode = "";
      this.saleorder.projectcode = "";
      this.saleorder.projectname = "";
      this.saleorder.requestno = "";
      this.saleorder.invoiceno = "";
      this.saleorder.cancelno = "";
      this.saleorder.deliverymydescription = "";
      this.saleorder.deliverytelephone = "";
      this.saleorder.deliveryaddress = "";
      this.saleorder.deliveryday = 0;
      this.saleorder.sumofitemamount = 0;
      this.saleorder.discountword = "";
      this.saleorder.discountamount = 0;
      this.saleorder.beforetaxamount = 0;
      this.saleorder.taxamount = 0;
      this.saleorder.totalamount = 0;
      this.saleorder.freeamount = 0;
      this.saleorder.netamount = 0;
      this.saleorder.iscompletesave = 0; // 0 = ไม่สมบูรณ์, 1 = สมบูรณ์
      this.saleorder.revision = 0; // เวอร์ชันเริ่มต้น
      this.saleorder.branchcode = ""; // รหัสสาขา


      this.saleorderItems = [];
    },

     getDate(objDate) {
      if (!objDate) return null;
      const date = new Date(objDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // เดือนเริ่มจาก 0
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;

    },

     async fetchCustomerOrdersBySalecode(salecode) {
      console.log("fetchCustomerOrdersBySalecode =>", salecode);
      try {
        const response = await axios.post(`${BaseApiUrl_01}/service/logistic/monitor/my_log_tracking.php`, {
          actiontype: '37',
          item: {
            salecode: salecode,
            arcode : salecode, // ใช้เบอร์โทรศัพท์เป็นรหัสลูกค้า
          }
        });

        console.log("fetchCustomerOrdersBySalecode from server OK");
        // console.log(response);
        this.showOverlay = true;
        this.loader = true;
        let tempData = response.data;


        console.log("tempData =>", tempData);
        // console.log("tempData.length =>", tempData.length);

        this.LogOrders =  tempData;
        // this.countBill();
        setTimeout(() => {
          this.showOverlay = false;
          this.loader = false;
        }, 1000);
      } catch (error) {
        console.error('Error fetching customer orders:', error);
      }
    },

    async fetchCustomerOrdersByPhone(phone) {
      console.log("fetchCustomerOrdersByPhone =>", phone);
      try {
        const response = await axios.post(`${BaseApiUrl_01}/service/logistic/monitor/my_log_tracking.php`, {
          actiontype: '36',
          item: {
            phone: phone,
            arcode : phone, // ใช้เบอร์โทรศัพท์เป็นรหัสลูกค้า
          }
        });

        console.log("fetchCustomerOrdersByPhone from server OK");
        // console.log(response);
        this.showOverlay = true;
        this.loader = true;
        let tempData = response.data;


        console.log("tempData =>", tempData);
        // console.log("tempData.length =>", tempData.length);

        this.LogOrders =  tempData;
        // this.countBill();
        setTimeout(() => {
          this.showOverlay = false;
          this.loader = false;
        }, 1000);
      } catch (error) {
        console.error('Error fetching customer orders:', error);
      }
    },

     async fetchCustomerOrdersByDeliveryNo(deliveryNo) {
      console.log("fetchCustomerOrdersByDeliveryNo =>", deliveryNo);
      try {
        const response = await axios.post(`${BaseApiUrl_01}/service/logistic/monitor/my_log_tracking.php`, {
          actiontype: '35',
          item: {
            deliveryno: deliveryNo,
            arcode : deliveryNo, // ใช้เบอร์โทรศัพท์เป็นรหัสลูกค้า
          }
        });

        console.log("fetchCustomerOrdersByDeliveryNo from server OK");
        // console.log(response);
        this.showOverlay = true;
        this.loader = true;
        let tempData = response.data;


        console.log("tempData =>", tempData);
        // console.log("tempData.length =>", tempData.length);

        this.deliveryNoTimeline =  this.formatOrderTimeline(tempData);

        console.log("this.deliveryNoTimeline =>", this.deliveryNoTimeline);

        // this.countBill();
        setTimeout(() => {
          this.showOverlay = false;
          this.loader = false;
        }, 1000);
      } catch (error) {
        console.error('Error fetching customer orders:', error);
      }
    },

    formatOrderTimeline(timeline) {
      return timeline.map(item => {
        item.color = this.colors2[Math.floor(Math.random() * this.colors2.length)];
        switch (item.scantype) {
          case 'สร้างคำสั่ง':
            item.scantype = 'สร้างคำสั่งซื้อ';
            break;
          case 'Create order':
            item.scantype = 'ยืนยันคำสั่งซื้อ';
            break;
          case 'Arrival':
            item.scantype = 'ถึง';
            break;
          case 'Picked Up':
            item.scantype = 'ขนส่งมารับสินค้า';
            break;
          case 'Departure':
            item.scantype = 'เดินทางจาก';
            break;
          case 'On Delivery':
            item.scantype = 'อยู่ระหว่างนำจ่ายสินค้า';
            break;
          case 'Signature':
            item.scantype = 'รับสินค้า';
            break;
          case 'Return Confirmation':
            item.scantype = 'ตีกลับ / คืนสินค้า';
            break;
          case 'Return Signature':
            item.scantype = 'ตีกลับ / คืนสินค้า';
            break;
        }

        item.mydateTime = item.createdatetime.toString().substring(0, 16);
        item.mydate = item.mydateTime.substring(0, 10);
        item.mytime = item.mydateTime.substring(11, 16);

        //console.log("item =>", item);
        // var mytime = mydateTime.substring(11, 17);
        // var onlydate = mydateTime.substring(0, 10);

        //item.scantype = item.scantype || 'ไม่ระบุ';

        return item;
      });
    },

    async fetchCity() {
      this.showOverlay = true;
      this.loader = true;
      try {

        //  url += "/service/master/generic/myarea_jt.php";
        const response = await axios.post(`${BaseApiUrl_01}/service/master/generic/myarea_jt.php`, {
          item: {
          },
          userid : userId,
          actiontype: '1',
        });
        //console.log("getCity from server OK");
        //console.log(response);
        let result = response.data;
        if(result){
          setTimeout(() => {
            this.showOverlay = false;
            this.loader = false;
            //format data to province
            this.province = result.map((item,index) => ({
              id: index,
              value: item.city, //code
              text: item.province_th, //name
              color : this.colors2[Math.floor(Math.random() * this.colors2.length)]
            }));
          }, 500);
        }
      }
      catch (error) {
        console.error('Error fetching events:', error);
      }
    },

    async addEvent() {

          this.showOverlay = true;
          this.loader = true;

          let actiontype = '53';  //addnew

          //alert("actiontype: " + actiontype);

          // console.log(this.event);

          // return;

          let xBaseApiUrl = BaseApiUrl_01;
          if(this.saleorder.dbname=="db2"){
            xBaseApiUrl = BaseApiUrl_02;
          }

          this.event = {
                rowid: null,
                groupid: this.saleorder.arcode,
                title: this.saleorder.arname,
                start: this.saveDate(this.saleorder.nextduedate),
                duedate: this.saveDate(this.saleorder.nextduedate),
                teldate: this.saveDate(this.saleorder.docdate),
                remark: 'นัดหมายจาก ระบบ Upsale order : ' + this.saleorder.docno,
                docno : this.saleorder.arcode,
                statuscode : "01",
                statusname : "ลูกค้าใหม่ จาก upsale ",
                due_status : 0 ,
                salecode: this.saleorder.salecode,
                saleorderno : this.saleorder.docno,
              }

          // console.log("addEvent", this.event);

          // alert("addEvent: complete ");

          // return;


          try {
            const response = await axios.post(`${xBaseApiUrl}service/crm/monitor/my_crm_tele_sale_calenda.php`, {
              item: this.event,
              userid : this.saleorder.salecode,
              actiontype: actiontype,
            });

            //console.log("editEvent from server OK");

            //console.log(response);

            let result = response.data;

            this.showOverlay = false;
            this.loader = false;

            return result;


          } catch (error) {
            console.error('Error fetching events:', error);
          }
        },

    async fetchSaleOrderRunning() {

      this.showOverlay = true;
      this.loader = true;

      try {
        const response = await axios.post(`${BaseApiUrl_02}/service/sale/monitor/my_sale_order.php`, {
          item: {
            userid: userId,
            menucode: 'C4025',
            menutext: 'ใบสั่งขาย',
            doctype: 'IV',
          },
          userid : userId,
          actiontype: '6',
        });
        //console.log("fetchSaleOrderRunning from server OK");
        //console.log(response);
        let result = response.data;
        if(result){
          setTimeout(() => {
            this.showOverlay = false;
            this.loader = false;

            this.saleorder.docno = result[0].docno;
            this.saleorder.docdate = result[0].docdate;
            this.saleorder.deliverydate = result[0].docdate
            this.saleorder.dbname = "db2"
          }, 500);
        }
      } catch (error) {
          console.error('Error fetching fetchSaleOrderRunning:', error);
      }
    },

      async fetchSaleOrderRunning2() {

      this.showOverlay = true;
      this.loader = true;

      try {
        const response = await axios.post(`${BaseApiUrl_02}/service/sale/monitor/my_sale_order.php`, {
          item: {
            userid: userId,
            menucode: 'C4025',
            menutext: 'ใบสั่งขาย',
            doctype: 'IV',
          },
          userid : userId,
          actiontype: '6',
        });
        //console.log("fetchSaleOrderRunning from server OK");
        //console.log(response);
        let result = response.data;
        if(result){
          setTimeout(() => {
            this.showOverlay = false;
            this.loader = false;

            this.saleorder.docno = result[0].docno;
            this.saleorder.dbname = "db2"


            // looping set new docno in saleorderItems
            this.saleorderItems.forEach(item => {
              item.docno = result[0].docno;
            });

          }, 500);
        }
      } catch (error) {
          console.error('Error fetching fetchSaleOrderRunning:', error);
      }
    },

    async checkDuplicateDocno() {
      this.showOverlay = true;
      this.loader = true;

      try {
        const response = await axios.post(`${BaseApiUrl_02}/service/sale/monitor/my_sale_order.php`, {
          item: {
            userid: userId,
            menucode: 'C4025',
            menutext: 'ใบสั่งขาย',
            docno: this.saleorder.docno,
          },
          userid : userId,
          actiontype: '9',
        });
        //console.log("checkDuplicateDocno from server OK");
        //console.log(response);
        let result = response.data;

        this.showOverlay = false;
        this.loader = false;

        console.log("checkDuplicateDocno from server OK");

        console.log(result);


        let result2 = false;

        let xdocno = result[0].docno;
        if(xdocno == this.saleorder.docno){
          result2 = true; // มี docno ซ้ำ
        }

        return result;
      } catch (error) {
          console.error('Error checking duplicate docno:', error);
      }
    },

    async saveOrder() {


      // check new docno from duplicate  before save
      // console.log(this.saleorder.docno);
      // console.log(this.saleorderItems );

      // alert("savecomplete !!!");
      // return;


      this.showOverlay = true;
      this.loader = true;

      this.saleorder.rawsaleinfomation  = this.saleorder.rawInfomationBeforeSplit;
      this.saleorder.netdebtamount = this.saleorder.netamount;

      if (this.saleorder.docdate instanceof Date) {
        this.saleorder.docdate = this.getDate(this.saleorder.docdate);
      }
      if (this.saleorder.deliverydate instanceof Date) {
        this.saleorder.deliverydate = this.getDate(this.saleorder.deliverydate);
      }
      if (this.saleorder.duedate instanceof Date) {
        this.saleorder.duedate = this.getDate(this.saleorder.duedate);
      }
      if (this.saleorder.nextduedate instanceof Date) {
        this.saleorder.nextduedate = this.getDate(this.saleorder.nextduedate);
      }

      //convert date string to DD/MM/YYYY thai date format format for api
      this.saleorder.docdate = this.readDate(this.saleorder.docdate.toString());  //convert date to string DD/MM/YYYY
      this.saleorder.deliverydate =this.readDate(this.saleorder.deliverydate.toString());  //convert date to string DD/MM/YYYY
      this.saleorder.duedate = this.readDate(this.saleorder.duedate.toString());  //convert date to string DD/MM/YYYY
      this.saleorder.nextduedate = this.readDate(this.saleorder.nextduedate.toString());  //convert date to string DD/MM/YYYY


      try {
         const response = await axios.post(`${BaseApiUrl_02}/service/sale/monitor/my_sale_order.php`, {
          item: this.saleorder,
          items : this.saleorderItems,
          userid : userId,
          actiontype: '55',
        });

        console.log("save saleOrder from server OK");

        console.log(response.data);

        let result = response.data;

        this.showOverlay = false;
        this.loader = false;

        return result;

      } catch (error) {
        console.error('Error saveOrder:', error);
        return error
      }
    },

    async editOrder() {

       //alert("editOrder 111111");

      this.showOverlay = true;
      this.loader = true;

      this.saleorder.rawsaleinfomation  = "";
      this.saleorder.netdebtamount = this.saleorder.netamount;

      //convert date object to string format YYYY-MM-DD

      if (this.saleorder.docdate instanceof Date) {
        this.saleorder.docdate = this.getDate(this.saleorder.docdate);
      }
      if (this.saleorder.deliverydate instanceof Date) {
        this.saleorder.deliverydate = this.getDate(this.saleorder.deliverydate);
      }
      if (this.saleorder.duedate instanceof Date) {
        this.saleorder.duedate = this.getDate(this.saleorder.duedate);
      }
      if (this.saleorder.nextduedate instanceof Date) {
        this.saleorder.nextduedate = this.getDate(this.saleorder.nextduedate);
      }

      //convert date string to DD/MM/YYYY thai date format format for api
      this.saleorder.docdate = this.readDate(this.saleorder.docdate.toString());  //convert date to string DD/MM/YYYY
      this.saleorder.deliverydate =this.readDate(this.saleorder.deliverydate.toString());  //convert date to string DD/MM/YYYY
      this.saleorder.duedate = this.readDate(this.saleorder.duedate.toString());  //convert date to string DD/MM/YYYY
      this.saleorder.nextduedate = this.readDate(this.saleorder.nextduedate.toString());  //convert date to string DD/MM/YYYY


      // console.log("after editOrder", this.saleorder);


      // alert("nextduedate->"+this.saleorder.nextduedate);

      // return;


    let xBaseApiUrl = BaseApiUrl_01;
      if(this.saleorder.dbname=="db2"){
        xBaseApiUrl = BaseApiUrl_02;
      }

      // console.log("editOrder", this.saleorder);
      // console.log("editOrderItems", this.saleorderItems);


      try {
         const response = await axios.post(`${xBaseApiUrl}/service/sale/monitor/my_sale_order.php`, {
          item: this.saleorder,
          items : this.saleorderItems,
          userid : userId,
          actiontype: '1',
        });

        console.log("edit saleOrder from server OK");

        console.log(response.data);

        let result = response.data;

        this.showOverlay = false;
        this.loader = false;

        return result;

      } catch (error) {
        console.error('Error editOrder:', error);
        return error
      }
    },

    async changeNextDueDate() {

      this.showOverlay = true;
      this.loader = true;
      //console.log("changeNextDueDate", this.saleorder.nextduedate);
      if (this.saleorder.nextduedate instanceof Date) {
        this.saleorder.nextduedate = this.getDate(this.saleorder.nextduedate);
      }
      this.saleorder.nextduedate = this.readDate(this.saleorder.nextduedate.toString());  //convert date to string DD/MM/YYYY
      //console.log("changeNextDueDate", this.saleorder.nextduedate);

      let xBaseApiUrl = BaseApiUrl_01;
      if(this.saleorder.dbname=="db2"){
        xBaseApiUrl = BaseApiUrl_02;
      }

      try {
        const response = await axios.post(`${xBaseApiUrl}/service/sale/monitor/my_sale_order.php`, {
          item: this.saleorder,
          userid: userId,
          actiontype: '51',
        });

        console.log("changeNextDueDate from server OK");
        console.log(response.data);

        let result = response.data;

        this.showOverlay = false;
        this.loader = false;

        return result;

      } catch (error) {
        console.error('Error changeNextDueDate:', error);
        return error
      }
    },

    async deleteItemOrder(item) {

      this.showOverlay = true;
      this.loader = true;

      //console.log("deleteItemOrder", item);

      // Remove the item from saleorderItems
      this.saleorderItems = this.saleorderItems.filter(i => i.id !== item.id);

      this.saleorderItems = this.formatOrderItems(this.saleorderItems);

      this.showOverlay = false;
      this.loader = false;
    },

    async fetchSaleOrderByDocno(docno) {

      this.showOverlay = true;
      this.loader = true;
      this.saleorder.docno = docno;
      this.saleorder.salecode = this.sale.code;

      let xBaseApiUrl = BaseApiUrl_01;
      if(this.saleorder.dbname=="db2"){
        xBaseApiUrl = BaseApiUrl_02;
      }

      try {
        const response = await axios.post(`${xBaseApiUrl}/service/sale/monitor/my_sale_order.php`, {
          item: {
            userid: userId,
            menucode: 'C4025',
            menutext: 'ใบสั่งขาย',
            docno: docno,
          },
          userid : userId,
          actiontype: '3',
        });
        //console.log("fetchSaleOrderRunning from server OK");
        //console.log(response);
        let result = response.data;
        if(result){
          setTimeout(() => {
            this.showOverlay = false;
            this.loader = false;

            //this.saleorder = result[0].item;
            this.saleorderItems = this.formatOrderItems(result[0].items);

            this.saleorder.docno = result[0].item.docno;
            this.saleorder.docdate = new Date(result[0].item.docdate.toString().slice(0, 10)).toISOString().slice(0, 10);
            this.saleorder.duedate = this.saleorder.docdate;



            this.saleorder.deliverydate =  new Date(result[0].item.deliverydate.toString().slice(0, 10)).toISOString().slice(0, 10);

             console.log("from fetch data -> nextduedate->",result[0].item.nextduedate);

            if(result[0].item.nextduedate == null || result[0].item.nextduedate == undefined){
              this.saleorder.nextduedate = new Date().toISOString().slice(0, 10);
            } else {
              this.saleorder.nextduedate =  new Date(result[0].item.nextduedate.toString().slice(0, 10)).toISOString().slice(0, 10);
            }

              console.log("after  -> nextduedate->",this.saleorder.nextduedate);

           this.saleorder.paytype =  parseInt(result[0].item.paytype);
            this.saleorder.logisticcode = result[0].item.logisticcode;
            this.saleorder.logisticname = result[0].item.logisticname;

            //alert("docno->"+docno);

            this.saleorder.tempdocno = docno;
            this.saleorder.arcode = result[0].item.arcode;
            this.saleorder.arname = result[0].item.arname;
            //this.saleorder.telephone = result[0].item.arcode;
            this.saleorder.whcode = result[0].item.whcode;
            this.saleorder.billtype = parseInt(result[0].item.billtype);
            this.saleorder.taxtype = parseInt(result[0].item.taxtype);
            this.saleorder.mydescription = result[0].item.mydescription;
            this.saleorder.revision = result[0].item.revision;
            this.saleorder.branchcode = result[0].item.branchcode;
            this.saleorder.quotationno = result[0].item.quotationno;
            this.saleorder.deliverymydescription = result[0].item.deliverymydescription;
            this.saleorder.deliverycontact = result[0].item.deliverycontact;
            this.saleorder.deliveryaddress = result[0].item.deliveryaddress;
            this.saleorder.deliveryday = result[0].item.deliveryday;
            this.saleorder.creditday = result[0].item.creditday || 0;
            //this.saleorder.deliverydate = result[0].item.deliverydate;

            //this.saleorder.salecode = this.sale.code
            this.saleorder.departcode = result[0].item.departcode;
            this.saleorder.projectcode = result[0].item.projectcode;
            this.saleorder.currencycode = result[0].item.currencycode;
            this.saleorder.exchangerate = result[0].item.exchangerate;
            this.saleorder.sumofitemamount = parseFloat(result[0].item.sumofitemamount);
            this.saleorder.discountword = result[0].item.discountword;
            this.saleorder.discountamount = parseFloat(result[0].item.discountamount);
            this.saleorder.beforetaxamount =  parseFloat(result[0].item.beforetaxamount);
            this.saleorder.taxrate = parseFloat(result[0].item.taxrate);
            this.saleorder.taxamount = result[0].item.taxamount;
            this.saleorder.totalamount = parseFloat(result[0].item.totalamount);
            this.saleorder.freeamount = parseFloat(result[0].item.freeamount);
            this.saleorder.netamount = parseFloat(result[0].item.totalamount) + parseFloat(result[0].item.freeamount);
            this.saleorder.iscompletesave = result[0].item.iscompletesave;
            this.saleorder.creatorcode = result[0].item.creatorcode;
            this.saleorder.printcount = result[0].item.printcount;
            this.saleorder.invoiceno = result[0].item.invoiceno;
            this.saleorder.cancelno = result[0].item.cancelno;
            this.saleorder.projectname = result[0].item.projectname;
            this.saleorder.requestno = result[0].item.requestno;

            this.saleorder.bookbankno = result[0].item.bookbankno;
            this.saleorder.deliverypoint = result[0].item.deliverypoint;
            this.saleorder.deliverypointname = result[0].item.deliverypointname;
            this.saleorder.deliverytelephone = result[0].item.deliverytelephone;
            this.saleorder.city = result[0].item.city;
            this.saleorder.area = result[0].item.area;
            this.saleorder.postcode = result[0].item.postcode;

            this.saleorder.city_name = result[0].item.city;
            this.saleorder.area_name = result[0].item.area;

           console.log("fetchSaleOrderbyDocno",this.saleorder.city)


          }, 500);
        }
      } catch (error) {
          console.error('Error fetching fetchSaleOrderRunning:', error);
      }
    },

    async genTemphSaleOrder() {

      this.showOverlay = true;
      this.loader = true;

      this.saleorder.rawsaleinfomation = this.saleorder.rawInfomationBeforeSplit;


      try {
        const response = await axios.post(`${BaseApiUrl_02}/service/sale/monitor/my_sale_order.php`, {
          item: {
            userid: userId,
            menucode: 'C4025',
            menutext: 'ใบสั่งขาย',
            docno: this.saleorder.docno,
            strsalecode: this.saleorder.salecode,
            strsearch: this.saleorder.rawInfomationBeforeSplit,
          },
          userid : userId,
          actiontype: '43',
        });

        let result = response.data;

        console.log("genTemphSaleOrder from server OK");
        console.log(result);
        this.showOverlay = false;
        this.loader = false;

        return result;

        // if(result){
        //   setTimeout(() => {
        //     this.showOverlay = false;
        //     this.loader = false;

        //     this.saleorder.docno = result[0].docno;
        //     this.saleorder.docdate = result[0].docdate;
        //     this.saleorder.deliverydate = result[0].docdate
        //   }, 500);
        // }
      } catch (error) {
          console.error('Error fetching fetchSaleOrderRunning:', error);
      }
    },

    async fetchTempSaleOrderByDocno(docno) {

      this.showOverlay = true;
      this.loader = true;

      this.saleorder.temp_docno = docno;

      try {
        const response = await axios.post(`${BaseApiUrl_02}/service/sale/monitor/my_sale_order.php`, {
          item: {
            userid: userId,
            menucode: 'C4025',
            menutext: 'ใบสั่งขาย',
            docno: docno,
          },
          userid : userId,
          actiontype: '44',
        });
        //console.log("fetchSaleOrderRunning from server OK");
        //console.log(response);
        let result = response.data;
        if(result){
          setTimeout(() => {
            this.showOverlay = false;
            this.loader = false;

            //this.saleorder = result[0].item;
            this.saleorderItems = this.formatOrderItems(result[0].items);

            // this.saleorder.docno = result[0].docno;
            // this.saleorder.docdate = result[0].docdate;
            // this.saleorder.deliverydate = result[0].docdate

            /*
            {
            "docno": "ST012505280316097301",
            "revision": "0",
            "branchcode": "",
            "quotationno": "",
            "docdate": "2025-05-28 15:16:09.893",
            "taxtype": "1",
            "billtype": "1",
            "arcode": "0935233355",
            "arname": "4970คุณภานุพงศ์ สุขโชติ ",
            "mydescription": "***ถั่งเช่าใหม่ 2 // เขียว 1 // กาแฟดำกล่อง 1 // ปลายทาง 350฿ (แอน)",
            "deliverymydescription": "",
            "deliverycontact": "",
            "deliveryaddress": "152 ม.10 บ้านน้ำดำ ตำบลดอนทอง เมือง พิษณุโลก 65000",
            "deliveryday": "0",
            "deliverydate": "2025-05-28 15:16:09.893",
            "creditday": "0",
            "duedate": "2025-05-28 15:16:09.893",
            "salecode": "PTTE0009",
            "departcode": "",
            "projectcode": "",
            "whcode": "01",
            "currencycode": "",
            "exchangerate": "1.0000000000",
            "sumofitemamount": ".0000",
            "discountword": "",
            "discountamount": ".0000",
            "beforetaxamount": ".0000",
            "taxrate": "7.0000",
            "taxamount": ".0000",
            "totalamount": "350.0000",
            "netamount": "350.0000",
            "iscompletesave": "0",
            "creatorcode": "",
            "printcount": null,
            "invoiceno": "",
            "cancelno": "",
            "projectname": "",
            "requestno": "",
            "freeamount": ".0000",
            "bookbankno": "",
            "logisticcode": "01",
            "paytype": "1",
            "deliverypoint": "0935233355",
            "deliverypointname": "152 ม.10 บ้านน้ำดำ ตำบลดอนทอง เมือง พิษณุโลก 65000",
            "deliverytelephone": "0935233355",
            "city": "Phitsanulok",
            "area": "Mueang Phitsanulok",
            "postcode": "65000"
        }
            */
           this.saleorder.paytype =  parseInt(result[0].item.paytype);
            this.saleorder.logisticcode = result[0].item.logisticcode;
            this.saleorder.logisticname = result[0].item.logisticname;

            //this.saleorder.tempdocno = docno;
            this.saleorder.arcode = result[0].item.arcode;
            this.saleorder.arname = result[0].item.arname;
            //this.saleorder.telephone = result[0].item.arcode;
            this.saleorder.whcode = result[0].item.whcode;
            this.saleorder.billtype = parseInt(result[0].item.billtype);
            this.saleorder.taxtype = parseInt(result[0].item.taxtype);
            this.saleorder.mydescription = result[0].item.mydescription;
            this.saleorder.revision = result[0].item.revision;
            this.saleorder.branchcode = result[0].item.branchcode;
            this.saleorder.quotationno = result[0].item.quotationno;
            this.saleorder.deliverymydescription = result[0].item.deliverymydescription;
            this.saleorder.deliverycontact = result[0].item.deliverycontact;
            this.saleorder.deliveryaddress = result[0].item.deliveryaddress;
            this.saleorder.deliveryday = result[0].item.deliveryday;
            this.saleorder.creditday = result[0].item.creditday;
            this.saleorder.deliverydate = this.saleorder.docdate;
            this.saleorder.duedate = this.saleorder.docdate;
            this.saleorder.salecode = result[0].item.salecode;
            this.saleorder.departcode = result[0].item.departcode;
            this.saleorder.projectcode = result[0].item.projectcode;
            this.saleorder.currencycode = result[0].item.currencycode;
            this.saleorder.exchangerate = result[0].item.exchangerate;
            this.saleorder.sumofitemamount =parseFloat(result[0].item.sumofitemamount)
            this.saleorder.discountword = result[0].item.discountword;
            this.saleorder.discountamount = parseFloat(result[0].item.discountamount)
            this.saleorder.beforetaxamount = parseFloat(result[0].item.beforetaxamount)
            this.saleorder.taxrate = parseFloat(result[0].item.taxrate);
            this.saleorder.taxamount = parseFloat(result[0].item.taxamount)
            this.saleorder.totalamount = parseFloat(result[0].item.totalamount)
            this.saleorder.freeamount = parseFloat(result[0].item.freeamount)
            this.saleorder.netamount = parseFloat(result[0].item.totalamount) + parseFloat(result[0].item.freeamount);
            this.saleorder.iscompletesave = result[0].item.iscompletesave;
            this.saleorder.creatorcode = result[0].item.creatorcode;
            this.saleorder.printcount = result[0].item.printcount;
            this.saleorder.invoiceno = result[0].item.invoiceno;
            this.saleorder.cancelno = result[0].item.cancelno;
            this.saleorder.projectname = result[0].item.projectname;
            this.saleorder.requestno = result[0].item.requestno;

            this.saleorder.bookbankno = result[0].item.bookbankno;
            this.saleorder.deliverypoint = result[0].item.deliverypoint;
            this.saleorder.deliverypointname = result[0].item.deliverypointname;
            this.saleorder.deliverytelephone = result[0].item.deliverytelephone;
            this.saleorder.city = result[0].item.city;
            this.saleorder.area = result[0].item.area;
            this.saleorder.postcode = result[0].item.postcode;

             this.saleorder.city_name = result[0].item.city;
            this.saleorder.area_name = result[0].item.area;


          }, 500);
        }
      } catch (error) {
          console.error('Error fetching fetchSaleOrderRunning:', error);
      }
    },

    async fetchCustomerDeliveryAddress(arcode) {

      this.showOverlay = true;
      this.loader = true;


      // Find province_name from this.province using saleorder.city
      let provinceObj = this.province.find(item => item.value === this.saleorder.city);
      let province_name = provinceObj ? provinceObj.text : '';

      let districtObj = this.area.find(item => item.value === this.saleorder.area);
      let district_name = districtObj ? districtObj.text : '';

      try {
         const response = await axios.post(`${BaseApiUrl_01}/service/sale/monitor/my_sale_order.php`, {
          item: {
            arcode: arcode,

          },
          userid : userId,
          actiontype: '47',
        });

        console.log("fetchCustomerDeliveryAddress from server OK");

        console.log(response.data);

        let result = response.data;
        return result;

      } catch (error) {
        console.error('Error fetching fetchPostalCode:', error);
        return [];
      }
    },

    async fetchArea(city) {
      this.showOverlay = true;
      this.loader = true;
      try {
         const response = await axios.post(`${BaseApiUrl_01}/service/master/generic/myarea_jt.php`, {
          item: {
            city: city, //city code
          },
          userid : userId,
          actiontype: '2',
        });
        //console.log("getArea from server OK");
        //console.log(response);
        let result = response.data;
        if(result){
          setTimeout(() => {
            this.showOverlay = false;
            this.loader = false;
            //format data to area
            this.area = result.map((item,index) => ({
              id: index,
              value: item.area_en, //code
              text: item.area_th, //name
              color : this.colors2[Math.floor(Math.random() * this.colors2.length)]
            }));
          }, 500);
        }
      } catch (error) {
        console.error('Error fetching Area:', error);
      }
    },

     async fetchPostalCode() {

      this.showOverlay = true;
      this.loader = true;


      // Find province_name from this.province using saleorder.city
      let provinceObj = this.province.find(item => item.value === this.saleorder.city);
      let province_name = provinceObj ? provinceObj.text : '';

      let districtObj = this.area.find(item => item.value === this.saleorder.area);
      let district_name = districtObj ? districtObj.text : '';

      try {
         const response = await axios.post(`${BaseApiUrl_01}/service/master/generic/myarea_jt.php`, {
          item: {
            province_name: province_name, //city name
            district_name: district_name, //area name
          },
          userid : userId,
          actiontype: '3',
        });
        //console.log("getArea from server OK");

        console.log(response.data);

        let result = response.data;
        if(result){
          setTimeout(() => {
            this.showOverlay = false;
            this.loader = false;
            //format data to area
            this.saleorder.postcode = result[0].postcode; // Assuming the first result is the correct one
          }, 500);
        }
      } catch (error) {
        console.error('Error fetching fetchPostalCode:', error);
      }
    },

    async fetchCompaireZipCode() {

      this.showOverlay = true;
      this.loader = true;
      // Find province_name from this.province using saleorder.city
      // let provinceObj = this.province.find(item => item.value === this.saleorder.city);
      // let province_name = provinceObj ? provinceObj.text : '';
      // let districtObj = this.area.find(item => item.value === this.saleorder.area);
      // let district_name = districtObj ? districtObj.text : '';

      console.log("fetchCompaireZipCode");

        console.log(this.saleorder);

      try {
        const response = await axios.post(`${BaseApiUrl_01}/service/master/generic/myarea_jt.php`, {
          item: {
            province_name: this.saleorder.city, //city name
            district_name: this.saleorder.area, //area name
            postcode: this.saleorder.postcode, //postcode
          },
          userid : userId,
          actiontype: '3',
        });
        //console.log("getArea from server OK");
        console.log(response.data);
        let result = response.data;

        return result;
      }
      catch (error) {
        console.error('Error fetching fetchCompaireZipCode:', error);
        return [];
      }
    },


    //function add productItem to saleorderItems
    async addProductItemToSaleOrderItems() {

     //if productItem is empty return
      if(!this.productItem || !this.productItem.itemcode){
        return;
      }

      //get from api product detail by itemcode
       this.showOverlay = true;
      this.loader = true;



      try {
        const response = await axios.post(`${BaseApiUrl_02}/service/sale/monitor/my_sale_order.php`, {
          item: {
            userid: userId,
            menucode: 'C4025',
            menutext: 'ใบสั่งขาย',
            itemcode: this.productItem.itemcode,
          },
          userid : userId,
          actiontype: '61',
        });
        //console.log("fetchSaleOrderRunning from server OK");
        //console.log(response);
        let result = response.data;
        if(result){
          setTimeout(() => {
            this.showOverlay = false;
            this.loader = false;
            //add to saleorderItems
            let newItem = {
              id: this.saleorderItems.length,
              linenumber: this.saleorderItems.length + 1,
              docno: this.saleorder.docno,
              docdate: this.saleorder.docdate,
              taxtype: this.saleorder.taxtype,
              billtype: this.saleorder.billtype,
              taxrate: this.saleorder.taxrate,
              whcode: this.saleorder.whcode,
              shelfcode: this.saleorder.whcode,
              unitcode: result[0].unitcode,
              itemcode: result[0].itemcode,
              itemname: result[0].itemname,
              qty: 1,
              acc_qty: parseFloat(result[0].acc_qty) || 0,
              reserve_qty: parseFloat(result[0].reserve_qty) || 0,
              cansale_qty: (parseFloat(result[0].acc_qty) || 0) - (parseFloat(result[0].reserve_qty) || 0) - 1,
              cansale_status_text:
                ((parseFloat(result[0].acc_qty) || 0) - (parseFloat(result[0].reserve_qty) || 0)) > 0
              ? "ขายได้"
              : "สินค้าไม่พอขาย",
              price: parseFloat(result[0].price) || 0,
              amount: 0,
              discount: 0,
              taxamount: 0,
              netamount: 0,
              mydescription: "",
              projectcode: this.saleorder.projectcode,
              creatorcode: userId,
              ispromotion: 0,
              tnisparent: 0,
              tnparentcode: "",
              tnisset: 0,
              reflinenumber: 0,
              qt_reflinenumber: 0,
              tnparentid: 0,
              parentid: '',
              salecode : this.saleorder.salecode,
              uuid: '',
              arcode: this.saleorder.arcode,
              quotationno: '',
              confirmno: '',
              remainqty: 1,
            };
            this.saleorderItems.push(newItem);
            this.saleorderItems = this.formatOrderItems(this.saleorderItems);


            //clear productItem
            this.productItem = {id: null,
              title: '',
              itemcode: '',
              itemname: '',
              unitcode: '',
              color : ''};

          }, 500);
        }
      } catch (error) {
        console.error('Error adding product item to sale order items:', error);
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

    formatOrderItems(oldItems) {

      // Debug: log the input oldItems
      console.log("formatOrderItems input:", oldItems);

      const formattedItems = oldItems.map((item, index) => ({
        id: index,
        linenumber: index + 1,
        docno: this.saleorder.docno,
        docdate: this.saleorder.docdate,
        taxtype: this.saleorder.taxtype,
        billtype: this.saleorder.billtype,
        taxrate: this.saleorder.taxrate,
        whcode: this.saleorder.whcode,
        shelfcode: item.shelfcode,
        unitcode: item.unitcode,
        itemcode: item.itemcode,
        itemname: item.itemname,
        qty: parseInt(item.qty),
        acc_qty: parseFloat(item.acc_qty),
        reserve_qty: parseFloat(item.reserve_qty),
        cansale_qty: parseFloat(item.acc_qty || 0) - parseFloat(item.reserve_qty || 0) - parseFloat(item.qty || 0),
        cansale_status_text:
          (parseFloat(item.acc_qty) - parseFloat(item.reserve_qty)) > 0
        ? "ขายได้"
        : "สินค้าไม่พอขาย",
        price: parseFloat(item.price),
        amount: 0,
        discount: 0,
        taxamount: 0,
        netamount: 0,
        mydescription: item.mydescription || "",
        projectcode: this.saleorder.projectcode,
        creatorcode: userId,
        ispromotion: item.ispromotion || 0,
        tnisparent: item.tnisparent || 0,
        tnparentcode: item.tnparentcode || "",
        tnisset: item.tnisset || 0,
        reflinenumber: item.reflinenumber || 0,
        qt_reflinenumber: item.qt_reflinenumber || 0,
        tnparentid: item.tnparentid || 0,
        parentid: item.parentid || '',
        uuid: item.uuid || '',
        arcode: this.saleorder.arcode,
        quotationno: item.quotationno || '',
        confirmno: item.confirmno || '',
        remainqty: item.remainqty || item.qty,
      }));

      // Debug: log the output formattedItems
      console.log("formatOrderItems output:", formattedItems);

      return formattedItems;
    },

    async getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },

    readDate(docdate) {

      if (docdate == "") { return ""; }
      if (docdate == "null") { return ""; }
      if (docdate == null) { return ""; }

      docdate = docdate.substring(0, 10);

      var a = new Array();
      var xyear;
      a = docdate.split("-");
      if (parseInt(a[0]) < 2500) {
          xyear = parseInt(a[0]) + 543;
      }

      var xmonth = a[1];
      var xday = a[2];

      if (xmonth.length == 1) { xmonth = "0" + xmonth; }

      if (xday.length == 1) { xday = "0" + xday; }

      //var obj = a[0] + "/" + a[1] + "/" + xyear

      return (xday + "/" + xmonth + "/" + xyear);
    },
    saveDate(docdate) {
      if (docdate == "") { return ""; }

      docdate = docdate.substring(0, 10);

      var a = new Array();
      var xyear;
      a = docdate.split("/");
      if (parseInt(a[2]) > 2500) {
          xyear = parseInt(a[2]) - 543;
      }

      var xmonth = a[1];
      var xday = a[0];

      if (xmonth.length == 1) { xmonth = "0" + xmonth; }

      if (xday.length == 1) { xday = "0" + xday; }

      return (xyear + "-" + xmonth + "-" + xday);
    }
  } // actions
})
