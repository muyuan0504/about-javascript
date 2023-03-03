// console.log('base64: ', btoa('你好'));         // 直接对unicode字符编码会报错

const encodeStr = encodeURIComponent('你好');     // 先转义再编码
const basecode = btoa(encodeStr);
console.log(encodeStr, 'base64: ', basecode);     // %E4%BD%A0%E5%A5%BD base64:  JUU0JUJEJUEwJUU1JUE1JUJE

const encodebasecode = atob(basecode);
console.log(encodebasecode);                      // %E4%BD%A0%E5%A5%BD
console.log(decodeURIComponent(encodebasecode));  // 你好
