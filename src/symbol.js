/*
 * @Date: 2022-02-21 19:11:24
 * @LastEditors: jimouspeng
 * @Description: Symbol 符号类型
 * @LastEditTime: 2022-02-21 19:26:57
 * @FilePath: \es6\src\symbol.js
 */
const first = Symbol() // Symbol 不支持new关键字调用
const second = Symbol('second') // Symbol('描述')
/**  全局符号注册表
 * Symbol.for(key)
 * 可以用来查找运行环境下全局符号注册表中的key值。
 * 如果存在这个Key, 那么返回该值；如果不存在，则用传入的key新建一个并在全局注册
 *
 * Symbol.keyFor(symbol)
 * 能够返回一个符号类型的符号值在添加到全局注册表时所关联的key
 */
const SyJimous = Symbol.for('jimous')
console.log(Symbol('jimous') === Symbol('jimous')) // false
console.log(SyJimous) // Symbol(jimous)
console.log(Symbol.for('jimous') === SyJimous) // true

console.log(Symbol.keyFor(SyJimous)) // jimous

console.log(Symbol.keyFor(Symbol())) // undefined

/** 即使描述相同，使用本地符号也不可能匹配全局注册中的符号值。这是因为本地符号值并不是全局注册的一部分 */
console.log(Symbol.keyFor(Symbol('jimous111'))) // undefined（Symbol('jimous111')是本地符号注册）
const jimous2 = Symbol.for('jimous2')
console.log(Symbol.keyFor(jimous2)) // jimous2
console.log(Symbol.keyFor(Symbol.for('jimous3'))) // jimous3
