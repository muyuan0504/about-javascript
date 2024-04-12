/** 对象的特殊操作符： toString  valueOf  toPrimitive
 *
 * 加法处理会优先valueOf
 * 字符串场景优先调用了toString
 */

const user = {
    toString() {
        return 'jimous'
    },
    valueOf() {
        return 999
    },
    // *** 如果对象 提供了Symbol.toPrimitive，那么一定会使用Symbol.toPrimitive的返回值
    // [Symbol.toPrimitive]() {
    //     return 1
    // },
}

console.log(user + 1, user + '1') // 加法处理
const info = {}
info[user] = '999' // 字符串场景
console.log(info)
