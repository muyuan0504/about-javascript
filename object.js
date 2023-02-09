const user = {
    toString() {
        return 'jimous';
    },
    valueOf() {
        return 999;
    },
    [Symbol.toPrimitive]() {
        return 1;
    },
};

// ** 对于valueOf vs toS

// 加法处理会优先valueOf
console.log(user + 1, user + '1');

// 字符串场景优先调用了toString
const info = {};
info[user] = '999';

console.log(info);

// *** 如果对象 提供了Symbol.toPrimitive，那么一定会使用Symbol.toPrimitive的返回值

// label标签: break & continue 跳出多重循环 -> label语句：语句前面加一个标识符 + ':'

// outloop: for (let i = 0; i < 5; i++) {
//     console.log('outloop:', i);
//     for (let j = 0; j < 4; j++) {
//         console.log('innerloop', j);
//         if (i == 2) {
//             break outloop;
//         }
//     }
// }

outloop: for (let i = 0; i < 5; i++) {
    console.log('outloop:', i);
    for (let j = 0; j < 4; j++) {
        if (j == 2) {
            continue outloop;
        }
        console.log('innerloop', j);
    }
}
