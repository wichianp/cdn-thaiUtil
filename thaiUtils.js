/** 
***********************************************
 * THAI UTILITY JS
 * Version: 1.0
 * รองรับ Google Apps Script / Web App
 ************************************************ 
 */

const ThaiUtil = (() => {
/* ==============================
     1) แปลงเลขอารบิก → เลขไทย
  ============================== */
  function toThaiNumber(input) {
    if (input === null || input === undefined) return '';
    const thDigits = ['๐','๑','๒','๓','๔','๕','๖','๗','๘','๙'];
    return input.toString().replace(/\d/g, d => thDigits[d]);
  }


  /* ==============================
     2) เดือนภาษาไทย
  ============================== */
  const MONTHS_FULL = [
    "มกราคม","กุมภาพันธ์","มีนาคม","เมษายน",
    "พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม",
    "กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"
  ];

  const MONTHS_SHORT = [
    "ม.ค.","ก.พ.","มี.ค.","เม.ย.",
    "พ.ค.","มิ.ย.","ก.ค.","ส.ค.",
    "ก.ย.","ต.ค.","พ.ย.","ธ.ค."
  ];


 /* ==============================
     3) วันที่ไทย (เต็ม)
     เช่น วันพฤหัสบดี ที่ ๑๒ กุมภาพันธ์ พ.ศ. ๒๕๖๙
  ============================== */
  function formatThaiDateFull(date) {
    const d = new Date(date);

    const DAYS = [
      "วันอาทิตย์","วันจันทร์","วันอังคาร",
      "วันพุธ","วันพฤหัสบดี","วันศุกร์","วันเสาร์"
    ];

    const dayName = DAYS[d.getDay()];
    const day = toThaiNumber(d.getDate());
    const month = MONTHS_FULL[d.getMonth()];
    const year = toThaiNumber(d.getFullYear() + 543);

    return `${dayName} ที่ ${day} ${month} พ.ศ. ${year}`;
  }

  /* ==============================
     4) วันที่ไทย (กลาง)
     เช่น ๑๒ กุมภาพันธ์ พ.ศ. ๒๕๖๙
  ============================== */
  function formatThaiDateMiddle(date) {
    const d = new Date(date);

    const day = toThaiNumber(d.getDate());
    const month = MONTHS_FULL[d.getMonth()];
    const year = toThaiNumber(d.getFullYear() + 543);

    return `${day} ${month} พ.ศ. ${year}`;
  }


  /* ==============================
     5) วันที่ไทย (ราชการสั้น)
     เช่น ๑๒ ก.พ. ๒๕๖๙
  ============================== */
  function formatThaiDateShort(date) {
    const d = new Date(date);

    const day = toThaiNumber(d.getDate());
    const month = MONTHS_SHORT[d.getMonth()];
    const year = toThaiNumber(d.getFullYear() + 543);

    return `${day} ${month} ${year}`;
  }


  /* ==============================
     6) จำนวนเงิน → รูปแบบเลขไทย
     เช่น ๑,๒๐๐.๐๐
  ============================== */
  function formatThaiCurrency(amount) {
    if (!amount && amount !== 0) return '';

    const formatted = Number(amount).toLocaleString('th-TH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    return toThaiNumber(formatted);
  }


  /* ==============================
     7) จำนวนเงิน → ข้อความภาษาไทย
     เช่น หนึ่งพันสองร้อยบาทถ้วน
  ============================== */
  function bahtText(num) {

    if (isNaN(num)) return '';

    const numberText = [
      '', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า',
      'หก', 'เจ็ด', 'แปด', 'เก้า'
    ];

    const positionText = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน'];

    function convertInteger(number) {
      let result = '';
      const digits = number.toString().split('').reverse();

      for (let i = 0; i < digits.length; i++) {
        const digit = parseInt(digits[i]);
        if (digit === 0) continue;

        if (i === 0 && digit === 1 && digits.length > 1) {
          result = 'เอ็ด' + result;
        } else if (i === 1 && digit === 2) {
          result = 'ยี่' + positionText[i] + result;
        } else if (i === 1 && digit === 1) {
          result = positionText[i] + result;
        } else {
          result = numberText[digit] + positionText[i] + result;
        }
      }
      return result;
    }

    num = parseFloat(num).toFixed(2);
    const [integer, decimal] = num.split('.');

    let baht = '';
    let intNum = parseInt(integer);

    if (intNum === 0) {
      baht = 'ศูนย์';
    } else {
      baht = convertInteger(intNum);
    }

    baht += 'บาท';

    if (decimal === '00') {
      baht += 'ถ้วน';
    } else {
      baht += convertInteger(parseInt(decimal)) + 'สตางค์';
    }

    return baht;
  }


  /* ==============================
     PUBLIC API
  ============================== */
  return {
    toThaiNumber,
    formatThaiDateFull,
    formatThaiDateMiddle,
    formatThaiDateShort,
    formatThaiCurrency,
    bahtText
  };

})();
