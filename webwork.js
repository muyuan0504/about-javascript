/*
 * @Author: jimouspeng
 * @Date: 2023-03-02 11:23:54
 * @Description: 
 * @FilePath: \es6\webwork,js
 */
var i = 0;

function timedCount() {
    i = i + 1;
    postMessage(i);
    setTimeout('timedCount()', 500);
}

timedCount();
