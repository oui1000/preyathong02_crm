/*
ตัวอย่างข้อมูลที่ใช้ในการสร้าง dropdown ในรูปแบบของ Array of Object
[
  { text: 'ยังไม่โทร', value: 0 },
  { text: 'โทรแล้ว', value: 1 },
]
  */
function readDate(docdate) {

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
}

function saveDate(docdate) {

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
};

function addDays(days) {

    //alert("inbox !!");
    var ms = new Date().getTime() + (86400000 * days);

    //alert(ms);

    var added = new Date(ms);

    var year = added.getFullYear() + 543;
    var month = (1 + added.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = added.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    //alert(year + '/' + month + '/' + day);

    return day + "/" + month + "/" + year;

}

  function getThaiMonth(){

    const thaiMonth = [
      { text: 'มกราคม', value: 1 },
      { text: 'กุมภาพันธ์', value: 2 },
      { text: 'มีนาคม', value: 3 },
      { text: 'เมษายน', value: 4 },
      { text: 'พฤษภาคม', value: 5 },
      { text: 'มิถุนายน', value: 6 },
      { text: 'กรกฏาคม', value: 7 },
      { text: 'สิงหาคม', value: 8 },
      { text: 'กันยายน', value: 9 },
      { text: 'ตุลาคม', value: 10 },
      { text: 'พฤศจิกายน', value: 11 },
      { text: 'ธันวาคม', value: 12 },
    ];

    return thaiMonth;

  }

  function getLast5years(){

    const year = new Date().getFullYear();
    const last5years = [];
    for(let i = year; i >= year - 5; i--){
      last5years.push({ text: i+543, value: i });
    }
    return last5years;
  }

  function getCurrentMonth(){
    const month = new Date().getMonth() + 1;
    return month;
  }

export { getThaiMonth , getLast5years ,getCurrentMonth , readDate, saveDate, addDays };
