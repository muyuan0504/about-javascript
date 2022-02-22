/*
 * @Date: 2022-02-22 11:17:13
 * @LastEditors: jimouspeng
 * @Description: 对象的内置API改进
 * @LastEditTime: 2022-02-22 11:43:38
 * @FilePath: \es6\src\object-newapi.js
 */
console.log('ES6-object----------------------------------------------------------------------------------------start')

/**Object.assign 扩展对象
 * Object.assign(target, sources)
 * 同属性sources会覆盖target的原有属性值，不同属性会当做新属性赋值给target
 * 【注意】
 * Object.assign只会遍历自身可数的属性，其中包括字符串和符号属性
 * Object并不会递归对象，值为对象的属性会直接赋给target,而不会被递归赋值
 */
const a = { a: 2, c: 3, [Symbol('jimous')]: '12', d: { e: 1, f: 2 } }
const b = { a: 1, b: 2, [Symbol('jimous')]: 'jimous', d: { e: 2, g: 5 } }
Object.assign(a, b)
console.log(a) // {a: 1, c: 3, b: 2, d: {e: 2, g: 5}, Symbol(jimous): '12', Symbol(jimous): 'jimous'} |a.d.f丢失|
console.log(b) // {a: 1, b: 2, d: {e: 2, g: 5}, Symbol(jimous): 'jimous'}
// 使用对象扩展更加简洁
const c = { ...b }
b.a = 666
console.log(b)
console.log(c) // {a: 1, b: 2, d: {e: 2, g: 5}, Symbol(jimous): 'jimous'}

/** Object.is进行对象比较
 * 大部分情况下 Object.is(a, b) 等价于 a === b
 * 当NaN和NaN比较，严格相等运算符会返回false, 但是Object.is会返回true
 */
console.log(Object.is(NaN, NaN), 'NaN') // true 'NaN'
console.log(NaN === NaN, NaN == NaN) // false false

/** Object.setPrototypeOf： 设置一个对象的原型引用另一个对象
 * 相比于使用__proto__设置原型，更推荐使用Object.setPrototypeOf
 * 【注意】
 * 该API的使用可能会导致很多性能问题，需认真考虑
 * 使用该API修改对象的原型是很耗费性能的操作。(基于现代js引擎优化属性访问的特性，任何浏览器和js引擎中修改对象的原型都是一个很慢的操作。)
 */
// ES5 Object.create创建一个新的对象，新的对象以传入的原型参数为原型，但是该API只适用于创建新的对象，使用Object.setPrototypeOf可以改变已有对象的原型
const baseCat = { type: 'cat', legs: 4 }
const cat = Object.create(baseCat)
cat.name = 'moon'
console.log(cat, cat.type) // {name: 'moon'} 'cat'

const cat2 = Object.setPrototypeOf({ name: 'moon2' }, baseCat)
console.log(cat2, 'cat2') // {name: 'moon2'} 'cat2'

console.log('es6-object----------------------------------------------------------------------------------------end')
